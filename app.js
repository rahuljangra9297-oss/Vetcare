/**
 * ============================================================================
 * VETCARE AI OS - CLINICAL DECISION ENGINE & SMART DAIRY ASSISTANT
 * File: app.js (Production Build)
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. MASTER CONFIGURATION & VERIFIED FINANCIAL CONSTANTS
     ========================================================================== */
  const DEFAULT_CONFIG = {
    adminPin: "9297",
    payeeName: "Vetcare Services (Mr. Rahul)",
    monthlyPrice: 199,
    annualPrice: 1499,
    sbiUpi: "rahuljangra9297@oksbi",
    sbiAccount: "65204067585",
    sbiIfsc: "SBIN0013693",
    pnbUpi: "rahuljangra9297-1@okicici",
    pnbAccount: "6687001700015098",
    pnbIfsc: "PUNB0668700",
    appTitle: "Vetcare",
    logoUrl: "",
    appTagline: "पशु स्वास्थ्य निदान, 3-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान",
    adminWhatsApp: "9297000000"
  };

  /* ==========================================================================
     2. MULTI-LANGUAGE LOCALIZATION DICTIONARIES
     ========================================================================== */
  const I18N = {
    hi: {
      appTitle: "Vetcare",
      tagline: "पशु स्वास्थ्य निदान, 3-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान",
      roleFarmer: "👨‍🌾 स्मार्ट पशुपालक (Dairy Farmer)",
      roleDoctor: "🩺 अधिकृत पशु चिकित्सक (Veterinary Doctor)",
      sessionWarning: "⚠️ आपका 60-मिनट का क्लिनिकल सत्र समाप्त होने वाला है!"
    },
    en: {
      appTitle: "Vetcare",
      tagline: "Clinical Decision Support System, 3-Way Diagnosis & Smart Dairy Platform",
      roleFarmer: "👨‍🌾 Smart Dairy Farmer",
      roleDoctor: "🩺 Registered Vet Doctor",
      sessionWarning: "⚠️ Your 60-minute active clinical session is expiring soon!"
    },
    hinglish: {
      appTitle: "Vetcare",
      tagline: "Pashu Swasthya Nidan, 3-Way Clinical Decision Engine aur Smart Dairy Solution",
      roleFarmer: "👨‍🌾 Smart Pashupalak",
      roleDoctor: "🩺 Veterinary Doctor",
      sessionWarning: "⚠️ Aapka 60-minute session jaldi expire hone wala hai!"
    },
    pa: {
      appTitle: "ਵੈਟਕੇਅਰ (Vetcare)",
      tagline: "ਪਸ਼ੂ ਸਿਹਤ ਜਾਂਚ ਅਤੇ ਆਧੁਨਿਕ ਡੇਅਰੀ ਪ੍ਰਬੰਧਨ ਪ੍ਰਣਾਲੀ",
      roleFarmer: "👨‍🌾 ਸਮਾਰਟ ਪਸ਼ੂਪਾਲਕ",
      roleDoctor: "🩺 ਵੈਟਰਨਰੀ ਡਾਕਟਰ",
      sessionWarning: "⚠️ ਤੁਹਾਡਾ 60-ਮਿੰਟ ਦਾ ਸੈਸ਼ਨ ਜਲਦੀ ਸਮਾਪਤ ਹੋ ਰਿਹਾ ਹੈ!"
    },
    mr: {
      appTitle: "वेटकेअर (Vetcare)",
      tagline: "पशुवैद्यकीय निदान आणि आधुनिक दुग्ध व्यवसाय व्यवस्थापन",
      roleFarmer: "👨‍🌾 स्मार्ट पशुपालक",
      roleDoctor: "🩺 नोंदणीकृत पशुवैद्यक",
      sessionWarning: "⚠️ आपले ६० मिनिटांचे क्लिनिकल सत्र लवकरच समाप्त होत आहे!"
    },
    gu: {
      appTitle: "વેટકૅર (Vetcare)",
      tagline: "પશુ આરોગ્ય નિદાન અને સ્માર્ટ ડેરી સોલ્યુશન",
      roleFarmer: "👨‍🌾 સ્માર્ટ પશુપાલક",
      roleDoctor: "🩺 અધિકૃત વેટરનરી ડોક્ટર",
      sessionWarning: "⚠️ તમારો 60-મિનિટનો સમય ટૂંક સમયમાં સમાપ્ત થશે!"
    },
    bn: {
      appTitle: "ভেটকেয়ার (Vetcare)",
      tagline: "পশু চিকিৎসা সিদ্ধান্ত ও আধুনিক ডেইরি সহায়ক",
      roleFarmer: "👨‍🌾 স্মার্ট খামারি",
      roleDoctor: "🩺 নিবন্ধিত পশু সার্জন",
      sessionWarning: "⚠️ আপনার ৬০ মিনিটের ক্লিনিকাল সেশন শীঘ্রই শেষ হচ্ছে!"
    }
  };

  /* ==========================================================================
     3. 22+ CLINICAL EVIDENCE-BASED DISEASE PROFILES
     ========================================================================== */
  const CORE_DISEASE_DB = [
    {
      id: "HS",
      nameHindi: "गलघोंटू (Hemorrhagic Septicemia - HS)",
      category: "BACTERIAL",
      cardinal: "NECK_SWELLING",
      temp: "HIGH",
      keywords: ["गलघोंटू", "hs", "गले में सूजन", "घुर-घुर", "तेज बुखार", "swelling", "throat"],
      desc: "पाश्चुरेला मल्टोसीडा जीवाणु जनित अति-घातक रोग। गले, जबड़े व गर्दन के नीचे गर्म, दर्दनाक सूजन, मुंह से लार व घुर-घुर श्वास कष्ट।",
      farmerRemedy: "देसी प्राथमिक उपचार: 100 मिली गुनगुने सरसों के तेल में 15 ग्राम पिसा कपूर व 25 ग्राम हल्दी मिलाकर गले की सूजन पर हल्के हाथ से लेप करें। तुरंत चिकित्सक से एंटीबायोटिक लगवाएं।",
      doctorRx: "1. Inj. Ceftiofur Sodium (1.1-2.2 mg/kg) IM/SC अथवा Inj. Enrofloxacin (5 mg/kg) IM\n2. Inj. Flunixin Meglumine (2.2 mg/kg) IV slow अथवा Inj. Melonex Plus 15-20 ml IM\n3. Inj. Isoflupredone Acetate 10 ml IM (गाभिन हेतु सुरक्षित)\n4. Inj. Avil (Pheniramine) 10 ml IM\n5. Dextrose Normal Saline (5%) 1-2 L IV यदि टॉक्सेमिया या डिहाइड्रेशन हो।"
    },
    {
      id: "BQ",
      nameHindi: "लंगड़ा बुखार / चरचरा (Black Quarter - BQ)",
      category: "BACTERIAL",
      cardinal: "GAS_SWELLING",
      temp: "HIGH",
      keywords: ["bq", "लंगड़ा", "चर्र-चर्र", "पुट्ठे में सूजन", "गैस सूजन", "black quarter"],
      desc: "क्लॉस्ट्रिडियम शोवेई जनित विषैला जीवाणु रोग। पुट्ठे, कंधे या गर्दन की भारी मांसपेशियों में गैस भरी सूजन, दबाने पर चर्र-चर्र (Crepitation) की आवाज़।",
      farmerRemedy: "देसी प्राथमिक उपचार: सूजन वाले स्थान को गर्म पानी व नीम के काढ़े से सेकें। पशु को चलने न दें। तुरंत एलोपैथिक पेनिसिलिन अनिवार्य है।",
      doctorRx: "1. Inj. Procaine Penicillin (40-80 लाख IU) Deep IM अथवा Amoxicillin-Sulbactam (4.5g) IM\n2. Inj. Melonex Plus 15-20 ml Deep IM\n3. Inj. Belamyl / Tribivet (B-Complex) 10 ml IM\n4. सूजन के केंद्र पर चीरा (Incision) लगाकर 3% H2O2 व पोटाश घोल से गहरी सफाई करें।"
    },
    {
      id: "FMD",
      nameHindi: "खुरपका-मुंहपका (Foot and Mouth Disease - FMD)",
      category: "VIRAL",
      cardinal: "MOUTH_BLISTERS",
      temp: "HIGH",
      keywords: ["fmd", "खुरपका", "मुंहपका", "छाले", "तारदार लार", "लंगड़ाना"],
      desc: "पिकोर्ना विषाणु जनित तीव्र संक्रामक रोग। मुंह, जीभ, मसूड़ों व खुरों के बीच दर्दनाक छाले, कटी हुई त्वचा, चिपचिपी तारदार लार व लंगड़ापन।",
      farmerRemedy: "देसी उपचार: मुंह को 1% फिटकरी या पोटाश (लाल दवा) के हल्के पानी से धोएं। शुद्ध देशी घी या शहद में सुहागा भूनकर छालों पर लेप करें। खुरों को नीम-फिनाइल जल से स्वच्छ रखें।",
      doctorRx: "1. द्वितीयक जीवाणु संक्रमण रोकथाम: Inj. Ceftriaxone (Intacef 3g) IM 3 दिन\n2. Inj. Melonex Plus 15 ml IM\n3. Inj. Avil 10 ml IM\n4. Inj. Conciplex / Vitalim (Vit-A, D3, E, H) 5-10 ml IM\n5. खुरों पर D-Mag / Topicure स्प्रे दिन में 2 बार छिड़कें।"
    },
    {
      id: "MASTITIS",
      nameHindi: "थनैल रोग (Clinical Mastitis)",
      category: "BACTERIAL",
      cardinal: "UDDER_HARD",
      temp: "NORMAL",
      keywords: ["थनैल", "mastitis", "अयन सूजन", "दूध में खून", "छिछड़े", "थन कड़ा"],
      desc: "अयन व थनों में स्टैफिलोकोकस/स्ट्रेप्टोकोकस संक्रमण। दूध में गाढ़े छिछड़े, रक्त या पीला मवाद आना। अयन का अत्यधिक गर्म, कड़ा व सूजा होना।",
      farmerRemedy: "देसी उपचार: 250 ग्राम एलोवेरा गूदा + 50 ग्राम हल्दी + 15 ग्राम खाने का चूना पीसकर लेप बनाएं। थन का पूरा दूध खाली करके दिन में 3 बार लेप लगाएं।",
      doctorRx: "1. Inj. Intacef Tazo (3375 mg) IV/IM अथवा Inj. Marbofloxacin 10 ml IM\n2. Intramammary Infusion: Mastilep / Pendistrin-SH थन खाली करके चढ़ाएं\n3. Inj. Melonex Plus 15 ml IM\n4. Inj. Serratiopeptidase (एंटी-इन्फ्लेमेटरी एंजाइम) 10 ml IM\n5. Trisodium Citrate पाउडर (Mastiseptic) 30-50 ग्राम दैनिक 5 दिन।"
    },
    {
      id: "MILK_FEVER",
      nameHindi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever)",
      category: "METABOLIC",
      cardinal: "STERNAL_RECUMBENCY",
      temp: "SUB",
      keywords: ["मिल्क फीवर", "hypocalcemia", "गर्दन मोड़कर बैठना", "ठंडा शरीर", "कैल्शियम कमी"],
      desc: "प्रसवोपरांत सीरम कैल्शियम की तीव्र गिरावट। शरीर व कान ठंडे (<100°F), पशु अपनी गर्दन को कोख की ओर मोड़कर बैठ जाना (S-curve Recumbency)।",
      farmerRemedy: "सावधानी: पशु को कभी जबरन मुंह से नाल न पिलाएं (Choke/Drenching Pneumonia का खतरा)। पशु को गर्म बोरियों से ढकें और तुरंत डॉक्टर से कैल्शियम ड्रिप चढ़वाएं।",
      doctorRx: "1. Calcium Borogluconate 25% (CBG / Mifex 450 ml): 300 ml अत्यंत धीमी गति से IV + 150 ml S/C\n2. IV देते समय स्टेथोस्कोप से हृदय गति (Arrhythmia) अवश्य जांचें\n3. Inj. Tonophosphan 10-15 ml IM\n4. Inj. Tribivet 10 ml IM\n5. होश में आने पर Cal-Up / Ostovet Gel 300g ओरल दें।"
    },
    {
      id: "KETOSIS",
      nameHindi: "कीटोसिस / एसीटोनेमिया (Ketosis / Acetonemia)",
      category: "METABOLIC",
      cardinal: "SWEET_BREATH",
      temp: "NORMAL",
      keywords: ["कीटोसिस", "ketosis", "मीठी गंध", "सूखा भूसा", "दूध घटना"],
      desc: "नकारात्मक ऊर्जा संतुलन व हाइपोग्लाइसीमिया। सांस व दूध से मीठी एसीटोन जैसी गंध, पशु दाना छोड़कर केवल सूखा भूसा खाता है, दूध में तीव्र गिरावट।",
      farmerRemedy: "देसी उपचार: 250 ग्राम गुड़ + 50 मिली शुद्ध सरसों का तेल मिलाकर 5 दिन दें। दाने में चोकर व आसानी से पचने वाले कार्बोहाइड्रेट बढ़ाएं।",
      doctorRx: "1. 25% Dextrose Saline 1000 ml IV तेजी से चढ़ाएं\n2. Inj. Isoflupredone Acetate 10 ml IM (ग्लूकोनियोजेनेसिस उत्तेजक)\n3. Propylene Glycol 200 ml ओरल दिन में 2 बार 4 दिन तक\n4. Inj. Tribivet 10 ml IM\n5. Bolus Biosacc / Himalayan Batisa 2-2 गोली सुबह-शाम।"
    },
    {
      id: "BLOAT",
      nameHindi: "अफारा / रूमेन टिम्पनी (Bloat / Tympany)",
      category: "METABOLIC",
      cardinal: "LEFT_FLANK_DRUM",
      temp: "NORMAL",
      keywords: ["अफारा", "bloat", "पेट फूलना", "ढोलक", "गैस"],
      desc: "रूमेन में किण्वन गैस या झागदार तरल का तीव्र संचय। बायां पेट (Left Paralumbar Fossa) ढोलक की तरह फूल जाना, मुंह फाड़कर जीभ बाहर निकालना व सांस फूलना।",
      farmerRemedy: "देसी उपचार: 50 मिली तारपीन का तेल + 300 मिली मीठा सरसों का तेल + 15 ग्राम हींग मिलाकर नाल से पिलाएं। मुंह में आड़ी लकड़ी बांधें ताकि झागदार लार गिरे।",
      doctorRx: "1. Trocar & Cannula द्वारा बाएं फ्लैंक से आपातकालीन गैस निकासी (यदि तीव्र श्वास अवरोध हो)\n2. Bloatosil / Tympol Liquid 100 ml ओरल पेट नली द्वारा\n3. Inj. Spasmo-vet (Dicyclomine) 10-15 ml IM\n4. Inj. Belamyl 10 ml IM\n5. Himalayan Batisa / Rumen FS पाउडर 100 ग्राम ओरल।"
    },
    {
      id: "THEILERIOSIS",
      nameHindi: "थायलेरियासिस / चिचड़ी बुखार (Theileriosis)",
      category: "PROTOZOAL",
      cardinal: "LYMPH_SWELLING",
      temp: "HIGH",
      keywords: ["theileria", "थायलेरिया", "लिम्फ नोड सूजन", "चिचड़ी बुखार"],
      desc: "थायलेरिया एन्युलाटा जनित रक्त परजीवी रोग। कंधे/कान के आगे की लिम्फ नोड में भारी कठोर सूजन, 105-107°F बुखार, गंभीर रक्ताल्पता (एनीमिया) व पीलिया।",
      farmerRemedy: "देसी उपचार: चिचड़ियों को हाथ से न नोचें। नीम के उबले पानी में कपूर मिलाकर पूरे शरीर पर लगाएं। तुरंत डॉक्टर को बुलाएं।",
      doctorRx: "1. Inj. Buparvaquone (Butalex / Zubion) 2.5 mg/kg (1 ml/20kg) केवल Deep IM एक बार\n2. Inj. Oxytetracycline LA (20 mg/kg) Deep IM\n3. Inj. Melonex Plus 15 ml IM\n4. Inj. Feritas (Iron Sorbitol) 10 ml IM तीसरे दिन\n5. Flumethrin 1% Pour-on (20 ml) रीढ़ की हड्डी पर लगाएं।"
    },
    {
      id: "BABESIOSIS",
      nameHindi: "बबेशियोसिस / लाल पेशाब (Babesiosis / Red Water)",
      category: "PROTOZOAL",
      cardinal: "RED_URINE",
      temp: "HIGH",
      keywords: ["बबेशिया", "लाल पेशाब", "कॉफी पेशाब", "चिचड़ी", "red water"],
      desc: "बबेशिया बाइजेमिना जनित रक्त परजीवी रोग। आरबीसी टूटने से पेशाब गहरा लाल या कॉफी रंग का होना, तेज बुखार, एनीमिया व पीलिया।",
      farmerRemedy: "देसी उपचार: पशु को ठंडे शेड में रखें। ठंडा पानी, जौ का दलिया व गुड़ का शरबत दें। कोई भी देसी नुस्खा दवा का विकल्प नहीं है।",
      doctorRx: "1. Inj. Diminazene Aceturate (Berenil) 3.5-5 mg/kg Deep IM एकल डोज़\n2. Inj. Melonex Plus 15 ml IM\n3. Inj. Feritas (Iron) 10 ml IM\n4. Dextrose Saline 5% 1-2 L IV धीमे\n5. Inj. Tribivet 10 ml IM।"
    },
    {
      id: "ANAPLASMOSIS",
      nameHindi: "एनाप्लास्मोसिस (Anaplasmosis / Gall Sickness)",
      category: "PROTOZOAL",
      cardinal: "SEVERE_JAUNDICE",
      temp: "HIGH",
      keywords: ["एनाप्लास्मा", "पीलिया", "बिना लाल पेशाब", "anaplasma"],
      desc: "एनाप्लास्मा मार्जिनेल जनित रक्त रोग। श्लेष्म झिल्लियां नींबू जैसी पीली होना, तेज बुखार, खून की भारी कमी, लेकिन लाल पेशाब नहीं आता।",
      farmerRemedy: "देसी उपचार: गिलोय व आंवले का रस 50-50 मिली गुड़ में मिलाकर दें। पशु को छांव में रखें।",
      doctorRx: "1. Inj. Oxytetracycline LA (20 mg/kg) Deep IM (72 घंटे बाद दोहराएं)\n2. Inj. Melonex Plus 15 ml IM\n3. Inj. Belamyl 10 ml IM\n4. Inj. Feritas 10 ml IM\n5. Liv-52 Protec लिक्विड 50 ml ओरल दिन में 2 बार।"
    },
    {
      id: "PPR",
      nameHindi: "पीपीआर / बकरी प्लेग (PPR - Goat Plague)",
      category: "VIRAL",
      cardinal: "MOUTH_EROSION_DIARRHEA",
      temp: "HIGH",
      keywords: ["ppr", "बकरी प्लेग", "दस्त", "मुंह में छाले", "goat plague"],
      desc: "मोर्बिलीवाइरस जनित बकरियों व भेड़ों का अति-घातक रोग। तेज बुखार, आंखों-नाक से स्राव, मुंह में बदबूदार छाले व काले खूनी पतले दस्त।",
      farmerRemedy: "देसी उपचार: ओआरएस (ORS) घोल व उबले चावल का मांड बार-बार पिलाएं ताकि निर्जलीकरण न हो। मुंह के छालों पर बोरिक पाउडर व ग्लिसरीन लगाएं।",
      doctorRx: "1. Inj. Enrofloxacin 10% (1 ml/20kg) IM अथवा Ceftriaxone 500mg-1g IM\n2. Inj. Melonex 2-3 ml IM\n3. Inj. Avil 2 ml IM\n4. Dextrose Saline 5% (200-300 ml) SC/IV\n5. Bolus Neblon / Diaroak 1-1 गोली सुबह-शाम।"
    },
    {
      id: "ENTEROTOXEMIA",
      nameHindi: "फिड़किया रोग (Enterotoxemia / Pulpy Kidney)",
      category: "BACTERIAL",
      cardinal: "OPISTHOTONOS",
      temp: "NORMAL",
      keywords: ["फिड़किया", "et", "दाना खाने बाद मौत", "pulpy kidney"],
      desc: "क्लॉस्ट्रिडियम परफ्रिंजेंस टाइप डी का विषैला प्रभाव। अधिक हरा चारा या दाना खाने के बाद सिर पीछे मोड़ना, मरोड़ व अचानक मृत्यु।",
      farmerRemedy: "देसी उपचार: मीठा सोडा (Sodium Bicarbonate) 20-30 ग्राम पानी में घोलकर तुरंत पिलाएं। दाना पूर्णतः बंद करें।",
      doctorRx: "1. Inj. Procaine Penicillin 20 लाख IU IM\n2. Inj. Dexamethasone 2-3 ml IM (शॉक निवारण)\n3. Inj. Spasmo-vet 3 ml IM\n4. मैग्नीशियम सल्फेट (एप्सम साल्ट) 30-50 ग्राम पानी में घोलकर दें।"
    },
    {
      id: "ANTHRAX",
      nameHindi: "एंथ्रेक्स / गिल्टी रोग (Anthrax - Zoonotic ☣️)",
      category: "BACTERIAL",
      cardinal: "TAR_BLOOD",
      temp: "HIGH",
      keywords: ["एंथ्रेक्स", "काला खून", "गिल्टी", "anthrax", "zoonotic"],
      desc: "बैसिलस एंथ्रासिस जनित अति-घातक ज़ूनोटिक रोग। प्राकृतिक छेदों (नाक, मुंह, गुदा) से बिना जमा हुआ डामर जैसा काला रक्त रिसना। (शव चीरना सख्त मना है)।",
      farmerRemedy: "सख्त चेतावनी: शव का पोस्टमार्टम कदापि न करें। चूना डालकर 8 फीट गहरे गड्ढे में दफनाएं। यह इंसानों में भी फैलता है।",
      doctorRx: "1. Inj. Potassium / Procaine Penicillin (40 लाख IU प्रति 100kg) IM\n2. Inj. Streptopenicillin 5g IM\n3. Inj. Flunixin Meglumine 15 ml IV\n4. जिले के मुख्य पशु चिकित्सा अधिकारी (CVO) को तत्काल वैधानिक रिपोर्ट दें।"
    },
    {
      id: "SURRA",
      nameHindi: "सर्रा रोग (Trypanosomiasis / Surra)",
      category: "PROTOZOAL",
      cardinal: "CIRCLING_HEAD_PRESSING",
      temp: "HIGH",
      keywords: ["सर्रा", "surra", "चक्कर काटना", "दीवार से सिर टकराना"],
      desc: "ट्रिपैनोसोमा इवैन्साई प्रोटोजोआ जनित डांस-मक्खी जनित रोग। गोल चक्कर काटना, दीवार से सिर सटाना, रुक-रुक कर बुखार आना व अंधापन।",
      farmerRemedy: "देसी उपचार: गौशाला में नीम की पत्तियों का धुआं करें ताकि डांस मक्खियां भागें। पशु को टकराने से बचाएं।",
      doctorRx: "1. Inj. Quinapyramine Sulfate + Chloride (Triquin / Antrycide) 1 vial S/C\n2. Inj. Melonex Plus 15 ml IM\n3. Inj. Neurobion / Tribivet 10 ml IM\n4. 20% Dextrose 1000 ml IV (मस्तिष्क एडीमा नियंत्रण)।"
    },
    {
      id: "RABIES",
      nameHindi: "रेबीज / अलर्क रोग (Rabies / Hydrophobia)",
      category: "VIRAL",
      cardinal: "HYDROPHOBIA_BELL",
      temp: "HIGH",
      keywords: ["रेबीज", "rabies", "रंभाना", "पागल कुत्ता", "लार"],
      desc: "रैब्डोवाइरस जनित तंत्रिकीय घातक रोग। असामान्य रंभाना, अत्यधिक लार, आक्रामकता, किसी भी वस्तु को काटना व पक्षाघात।",
      farmerRemedy: "चेतावनी: पशु की लार को न छुएं। यह शत-प्रतिशत जानलेवा व ज़ूनोटिक है। पशु को मजबूत अलग बाड़े में रखें।",
      doctorRx: "1. कोई उपचारात्मक इलाज नहीं\n2. काटे जाने पर दिन 0, 3, 7, 14, 28 पर Anti-Rabies Vaccine (Raksharab) 1 ml SC अवश्य लगाएं\n3. उत्तेजना शांत करने हेतु Inj. Xylazine 2-3 ml IM।"
    },
    {
      id: "COLIC",
      nameHindi: "उदर शूल / पेट दर्द (Equine & Bovine Colic)",
      category: "METABOLIC",
      cardinal: "ROLLING_PAWING",
      temp: "NORMAL",
      keywords: ["colic", "पेट दर्द", "लोटना", "लात मारना", "कब्ज"],
      desc: "आंतों में ऐंठन, गैस या गोबर का बंध। पशु बार-बार पेट की ओर देखता है, पिछले पैरों से पेट को लात मारता है, बैठता-उठता है और जमीन पर लोटता है।",
      farmerRemedy: "देसी उपचार: 100 मिली मीठा तेल + 25 ग्राम अजवाइन + 10 ग्राम हींग का काढ़ा बनाकर गुनगुना पिलाएं। पशु को लगातार टहलाएं।",
      doctorRx: "1. Inj. Spasmo-vet (Dicyclomine) 15-20 ml IM अथवा Inj. Buscopan 10-15 ml IV/IM\n2. Inj. Melonex Plus 15 ml IM\n3. Liquid Paraffin 500-1000 ml पेट नली द्वारा बंध खोलने हेतु\n4. Dextrose Saline 5% 2000 ml IV।"
    },
    {
      id: "ROP",
      nameHindi: "जेर रुकना (Retention of Placenta - ROP)",
      category: "METABOLIC",
      cardinal: "HANGING_PLACENTA",
      temp: "NORMAL",
      keywords: ["जेर रुकना", "rop", "placenta", "ब्याने बाद जेर"],
      desc: "प्रसव के 8 से 12 घंटे बाद भी गर्भाशय से जेर का स्वतः बाहर न गिरना। संक्रमण होकर मेट्राइटिस होने का गंभीर जोखिम।",
      farmerRemedy: "देसी उपचार: 1 किलो उबले हुए देसी गुड़ में 50 ग्राम सोंठ, 25 ग्राम अजवाइन व 20 ग्राम कालीमिर्च मिलाकर गुनगुना खिलाएं। जेर पर भारी पत्थर कदापि न बांधें।",
      doctorRx: "1. Inj. Exapar / Utrovet लिक्विड 100 ml ओरल तुरंत\n2. Inj. Cloprostenol Sodium (Juramate) 2 ml IM अथवा Inj. Oxytocin 30-50 IU IM\n3. Inj. Intacef 3g IM 3 दिन\n4. Intrauterine Pessaries: Cleanex / Furea 4 बोलस गर्भाशय में रखें।"
    },
    {
      id: "PROLAPSE",
      nameHindi: "फूल दिखाना / कांच निकलना (Uterine/Vaginal Prolapse)",
      category: "METABOLIC",
      cardinal: "PROTRUDING_MASS",
      temp: "NORMAL",
      keywords: ["फूल दिखाना", "prolapse", "कांच निकलना", "गर्भाशय बाहर"],
      desc: "योनि या गर्भाशय का शरीर से बाहर उल्टा निकल आना। पशु का लगातार जोर लगाना, सूजन व संक्रमण।",
      farmerRemedy: "देसी उपचार: बाहर निकले अंग को 1% पोटाश (लाल दवा) के ठंडे पानी या बर्फ से धोएं। अंग को गंदे फर्श पर न लगने दें।",
      doctorRx: "1. Epidural Anesthesia: 2% Lignocaine (5-7 ml) 1st व 2nd Coccygeal कशेरुका के बीच दें\n2. बर्फ व ग्लिसरीन से सूजन कम कर अंग को धीरे-धीरे पुनः गर्भाशय में रिपोजिशन करें\n3. Buhner's Stitch या Rope Truss तकनीक से वल्वा आंशिक बांधें\n4. Inj. Intacef 3g IM + Inj. Melonex Plus 15 ml IM\n5. Inj. Progesterone 750 mg IM।"
    },
    {
      id: "PNEUMONIA",
      nameHindi: "निमोनिया / फेफड़ों की सूजन (Bovine Pneumonia)",
      category: "BACTERIAL",
      cardinal: "DYSPNEA_WHEEZING",
      temp: "HIGH",
      keywords: ["pneumonia", "निमोनिया", "खांसी", "सांस फूलना", "dyspnea"],
      desc: "फेफड़ों व श्वसन तंत्र का गंभीर प्रदाह। तेज बुखार (104-106°F), सीने से घुरघुराहट की आवाज़, बलगमयुक्त खांसी व नाक से गाढ़ा स्राव।",
      farmerRemedy: "देसी उपचार: नीलगिरी तेल या विक्स डालकर गर्म पानी की भाप दें। 50 ग्राम अदरक + 20 तुलसी पत्तों का काढ़ा शहद में मिलाकर दें।",
      doctorRx: "1. Inj. Enrofloxacin 10% (5 mg/kg) IM अथवा Ceftiofur Sodium 1g IM 3-5 दिन\n2. Inj. Melonex Plus 15 ml IM\n3. Inj. Deriphyllin (Bronchodilator) 10 ml IM\n4. Inj. Avil 10 ml IM\n5. Mucolite syrup 30 ml ओरल दिन में 2 बार।"
    },
    {
      id: "FOOT_ROT",
      nameHindi: "खुर सड़न (Foot Rot / Pododermatitis)",
      category: "BACTERIAL",
      cardinal: "FOOT_ROT_SMELL",
      temp: "NORMAL",
      keywords: ["foot rot", "खुर सड़न", "बदबूदार मवाद", "खुरों में कीड़े"],
      desc: "फ्यूजोबैक्टीरियम नेक्रोफोरम जनित खुरों की सड़न। खुरों के बीच अत्यधिक बदबूदार मवाद, ऊतकों का गलना व गंभीर लंगड़ापन।",
      farmerRemedy: "देसी उपचार: 5% नीला थोथा (कॉपर सल्फेट) या नीम-फिटकरी के घोल से खुरों की धुलाई करें। घाव पर कपूर मिला सरसों का तेल लगाएं।",
      doctorRx: "1. Inj. Oxytetracycline LA 20 ml Deep IM अथवा Ceftiofur 1g IM\n2. Inj. Melonex Plus 15 ml IM\n3. सड़े ऊतकों की डीब्रिडमेंट सफाई करें\n4. Copper sulfate पाउडर पट्टी बांधें\n5. Topicure / Scavon स्प्रे छिड़कें।"
    },
    {
      id: "LUMPY_SKIN",
      nameHindi: "लम्पी त्वचा रोग (Lumpy Skin Disease - LSD)",
      category: "VIRAL",
      cardinal: "LUMPY_NODULES",
      temp: "HIGH",
      keywords: ["lumpy", "लम्पी", "गांठें", "त्वचा रोग", "lsd"],
      desc: "कैप्रीपॉक्स विषाणु जनित संक्रामक रोग। त्वचा पर 2-5 सेमी की गोल कठोर गांठें, पैरों में सूजन, तेज बुखार व दूध में भारी गिरावट।",
      farmerRemedy: "देसी काढ़ा: 10 पान के पत्ते, 10 कालीमिर्च, 10 ग्राम हल्दी, 50 ग्राम गुड़ पीसकर लड्डू बनाकर दिन में 3 बार खिलाएं। नीम जल से नहलाएं।",
      doctorRx: "1. द्वितीयक संक्रमण रोकथाम: Inj. Intacef 3g IM 4 दिन\n2. Inj. Melonex Plus 15 ml IM\n3. Inj. Avil 10 ml IM\n4. Inj. Levamisole (Immunomodulator) 5 ml SC\n5. घावों पर Mupirocin मलहम या Scavon स्प्रे लगाएं।"
    },
    {
      id: "METRITIS",
      nameHindi: "गर्भाशय शोथ / बच्चेदानी का पकना (Acute Metritis)",
      category: "BACTERIAL",
      cardinal: "PURULENT_DISCHARGE",
      temp: "HIGH",
      keywords: ["गर्भाशय मवाद", "metritis", "सफेद मवाद", "बदबूदार पानी"],
      desc: "प्रसवोपरांत गर्भाशय का तीव्र जीवाणु संक्रमण। योनि से बदबूदार सफेद-पीला मवाद जैसा स्राव, भूख न लगना व दूध सूखना।",
      farmerRemedy: "देसी उपचार: 250 ग्राम शतावरी चूर्ण + 50 ग्राम हल्दी दूध में मिलाकर 7 दिन दें। गर्भाशय को साफ होने दें।",
      doctorRx: "1. Inj. Ceftiofur Sodium 1g IM 4 दिन अथवा Inj. Ciprofloxacin 30 ml IV\n2. Intrauterine: Metrogyl 100 ml + Gentamicin 10 ml अथवा Luprastil IU दवा\n3. Inj. Juramate (Cloprostenol 2 ml) IM मवाद बाहर निकालने हेतु\n4. Inj. Melonex Plus 15 ml IM\n5. Utrovet / Replanta Liquid 100 ml ओरल 5 दिन।"
    }
  ];

  /* ==========================================================================
     4. REPRODUCTIVE & BREEDING ADVISORY DATA
     ========================================================================== */
  const BREEDING_HEAT_DATA = [
    {
      stage: "प्रारंभिक मद (Early Heat - 0 से 6 घंटे)",
      sign: "पशु बेचैन रहता है, बार-बार रंभाता है, अन्य पशुओं पर चढ़ता है परंतु स्वयं किसी को चढ़ने नहीं देता।",
      action: "सीमन (A.I.) न करवाएं। यह समय बहुत जल्दी है।"
    },
    {
      stage: "सटीक मद (Standing Heat - 6 से 18 घंटे) ⭐ सर्वोत्तम समय",
      sign: "पशु खूंटे पर शांति से खड़ा रहता है जब दूसरे पशु उस पर चढ़ते हैं। योनि से शीशे जैसा स्वच्छ, पारदर्शी लंबा तार गिरता है।",
      action: "सुबह मद में दिखे तो शाम को, और शाम को दिखे तो अगली सुबह 12 घंटे बाद A.I. करवाएं (AM-PM Rule)।"
    },
    {
      stage: "उत्तर मद (Late Heat - 18 से 24 घंटे)",
      sign: "पशु अन्य पशुओं पर चढ़ना बंद कर देता है। योनि से तार गाढ़ा हो जाता है।",
      action: "यदि Standing Heat छूट गई हो, तभी आपातकालीन A.I. करवाएं, अन्यथा अगले चक्र की प्रतीक्षा करें।"
    }
  ];

  const DISCHARGE_DATA = [
    {
      type: "काँच जैसा बिल्कुल पारदर्शी और लम्बा तार",
      meaning: "स्वस्थ गर्भाशय व मद (Normal Estrogen Peak)। गर्भाधान हेतु 100% उपयुक्त समय।"
    },
    {
      type: "सफेद मवादयुक्त, बदबूदार या दही जैसा तार",
      meaning: "गर्भाशय में संक्रमण (Metritis/Endometritis)। सीमन न डलवाएं; पहले गर्भाशय की सफाई करवाएं।"
    },
    {
      type: "हल्का खूनी या भूरा डिस्चार्ज (Metestrus Bleeding)",
      meaning: "मद काल समाप्त हो चुका है। अगले 19-21 दिन बाद पुनः मद में आने की तारीख डायरी में दर्ज करें।"
    }
  ];

  const REPEAT_BREEDER_TIPS = [
    "सीमन कराने से 30 दिन पूर्व पेट के कीड़ों की दवा (Dewormer) दें और 50 ग्राम Chelated Mineral Mixture प्रतिदिन खिलाएं।",
    "सीमन डलवाने (A.I.) के तुरंत बाद डॉक्टर से Inj. Receptal / Buserelin (2.5 ml) IM लगवाएं ताकि अंडाशय से अंडा समय पर छूटे।",
    "यदि गर्भाशय में हल्का संक्रमण हो, तो A.I. कराने से एक चक्र पूर्व Lixen IU या Metricure गर्भाशय में डलवाएं।",
    "सीमन स्ट्रॉ को 37°C गुनगुने पानी में ठीक 30 सेकंड तक Thaw करवाएं और प्रशिक्षित पशु चिकित्सक से ही A.I. करवाएं।"
  ];

  /* ==========================================================================
     5. APPLICATION RUNTIME STATE
     ========================================================================== */
  let AppConfig = { ...DEFAULT_CONFIG };
  let currentLanguage = "hi";
  let currentRole = "FARMER";
  let activeDiagnosisMode = "SYMPTOMS";
  let activeBank = "SBI";
  let selectedPlan = "MONTHLY";
  let activeSessionTimer = null;
  let sessionSecondsLeft = 3600; // 60-Minute active session countdown timer

  let matrixSelected = {
    temp: null,
    cardinal: "ALL",
    secondary: []
  };

  /* ==========================================================================
     6. DYNAMIC GEMINI CLINICAL AI ENGINE (AUTO-DISCOVERY & ZERO 404)
     ========================================================================== */
  window.callGeminiClinicalAI = async function (promptText) {
    const apiKey = localStorage.getItem('vetcare_gemini_api_key');
    if (!apiKey) {
      alert("कृपया पहले '⚙️ AI Key' बटन दबाकर अपनी कुंजी दर्ज करें!");
      if (window.openAIKeyModal) window.openAIKeyModal();
      return null;
    }

    // 1. Direct call to active modern models
    const candidateModels = ['gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-2.0-flash-lite'];
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
        }
      } catch (e) {
        console.warn(`Model ${model} failed:`, e);
      }
    }

    // 2. Dynamic discovery fallback
    try {
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (listRes.ok) {
        const listData = await listRes.json();
        const validModel = listData.models?.find(m => 
          m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')
        );
        if (validModel) {
          const directUrl = `https://generativelanguage.googleapis.com/v1beta/${validModel.name}:generateContent?key=${apiKey}`;
          const finalRes = await fetch(directUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
          });
          if (finalRes.ok) {
            const finalData = await finalRes.json();
            const text = finalData.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) return text;
          }
        }
      }
    } catch (err) {
      console.error("Dynamic model discovery error:", err);
    }

    throw new Error("AI कनेक्शन में समस्या आई। कृपया अपनी API Key की अनुमति जांचें।");
  };

  window.runAIConsultant = async function () {
    const promptInput = document.getElementById('aiInputPrompt');
    const outputArea = document.getElementById('aiOutputArea');
    const runBtn = document.getElementById('btnRunAI');

    if (!promptInput || !outputArea) return;
    const query = promptInput.value.trim();
    if (!query) {
      alert("कृपया पशु के लक्षण, तापमान और केस विवरण दर्ज करें।");
      return;
    }

    const clinicalSystemPrompt = `You are Vetcare Senior Clinical Veterinary Surgeon and Pharmacologist.
Evaluate this animal clinical case:
"${query}"

Provide a structured, evidence-based Differential Diagnosis in Hindi (using English medical names for drugs):
1. सम्भावित प्राथमिक निदान (Differential Diagnoses with Likelihood %)
2. 5-स्तरीय एलोपैथिक उपचार तालिका (Tier 1: Antibiotic/Drug of Choice, Tier 2: NSAID, Tier 3: Steroid/Fluid, Tier 4: Supportive/B-Complex, Tier 5: Management)
3. गाभिन सुरक्षा चेतावनी (Pregnancy Safety Alert)
4. पशुपालक हेतु आवश्यक प्राथमिक सावधानियां।`;

    try {
      if (runBtn) {
        runBtn.disabled = true;
        runBtn.innerHTML = `<span>⏳ AI सर्जन विश्लेषण कर रहा है...</span>`;
      }
      outputArea.classList.remove('hidden');
      outputArea.innerHTML = `<div class="p-4 text-center text-purple-700 animate-pulse">🤖 Google Gemini AI क्लिनिकल एनालिसिस प्रोसेस कर रहा है, कृपया प्रतीक्षा करें...</div>`;

      const reply = await window.callGeminiClinicalAI(clinicalSystemPrompt);
      if (reply) {
        outputArea.innerHTML = formatAIClinicalMarkdown(reply);
      }
    } catch (error) {
      outputArea.innerHTML = `<div class="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-medium">⚠️ एरर: ${error.message}</div>`;
    } finally {
      if (runBtn) {
        runBtn.disabled = false;
        runBtn.innerHTML = `<span>✨ AI से क्लिनिकल रिपोर्ट मांगें</span>`;
      }
    }
  };

  function formatAIClinicalMarkdown(md) {
    let html = md
      .replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-purple-900 mt-3 mb-1 border-b pb-1">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-base font-black text-purple-950 mt-4 mb-1 border-b-2 border-purple-200 pb-1">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-lg font-black text-purple-950 mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-slate-900 font-bold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="text-slate-700">$1</em>')
      .replace(/\n/gim, '<br />');
    return `<div class="bg-white p-4 rounded-2xl border border-purple-200 shadow-sm leading-relaxed">${html}</div>`;
  }

  /* ==========================================================================
     7. 60-MINUTE SESSION COUNTDOWN ENGINE
     ========================================================================== */
  function startSessionTimer() {
    if (activeSessionTimer) clearInterval(activeSessionTimer);
    sessionSecondsLeft = 3600;

    activeSessionTimer = setInterval(() => {
      sessionSecondsLeft--;
      if (sessionSecondsLeft === 300) {
        const warning = (I18N[currentLanguage] && I18N[currentLanguage].sessionWarning) || I18N.hi.sessionWarning;
        showToast(warning);
      }
      if (sessionSecondsLeft <= 0) {
        clearInterval(activeSessionTimer);
        alert("सुरक्षा कारणों से आपकी 60-मिनट की क्लिनिकल सत्र अवधि समाप्त हो गई है। कृपया पुनः प्रवेश करें।");
        window.returnToGateway();
      }
    }, 1000);
  }

  /* ==========================================================================
     8. APP INITIALIZATION & LOCAL CONFIGURATION
     ========================================================================== */
  function initApp() {
    loadLocalConfigs();
    applyDynamicBranding();
    renderBreedingAdvisory();
    renderDiseaseResults(CORE_DISEASE_DB);
    renderKhataList();
    renderInventoryList();
    renderSavedOPDRecords();
    startSessionTimer();
  }

  function loadLocalConfigs() {
    try {
      const savedCfg = localStorage.getItem('vetcare_master_config');
      if (savedCfg) {
        AppConfig = { ...DEFAULT_CONFIG, ...JSON.parse(savedCfg) };
      }
      const savedRole = localStorage.getItem('vetcare_user_role');
      if (savedRole) {
        currentRole = savedRole;
      }
    } catch (e) {
      console.warn("Storage loading warning:", e);
    }
  }

  function applyDynamicBranding() {
    const pageTitleTag = document.getElementById('pageTitleTag');
    const gatewayAppTitle = document.getElementById('gatewayAppTitle');
    const appHeaderTitle = document.getElementById('appHeaderTitle');
    const gatewayTagline = document.getElementById('gatewayTagline');
    const footerAppBranding = document.getElementById('footerAppBranding');
    const gatewayLogoBox = document.getElementById('gatewayLogoBox');
    const headerLogoBox = document.getElementById('headerLogoBox');

    if (pageTitleTag) pageTitleTag.textContent = `${AppConfig.appTitle} | Clinical & Smart Dairy Assistant`;
    if (gatewayAppTitle) gatewayAppTitle.textContent = AppConfig.appTitle;
    if (appHeaderTitle) appHeaderTitle.textContent = AppConfig.appTitle;
    if (gatewayTagline) gatewayTagline.textContent = AppConfig.appTagline;
    if (footerAppBranding) footerAppBranding.textContent = `${AppConfig.appTitle} Clinical Assistant • सुरक्षित और सत्यापित प्रणाली`;

    if (AppConfig.logoUrl) {
      if (gatewayLogoBox) gatewayLogoBox.innerHTML = `<img src="${AppConfig.logoUrl}" alt="Logo" class="w-full h-full object-cover"/>`;
      if (headerLogoBox) headerLogoBox.innerHTML = `<img src="${AppConfig.logoUrl}" alt="Logo" class="w-full h-full object-cover"/>`;
    }

    const dispPlanMonthlyPrice = document.getElementById('dispPlanMonthlyPrice');
    const dispPlanAnnualPrice = document.getElementById('dispPlanAnnualPrice');
    if (dispPlanMonthlyPrice) dispPlanMonthlyPrice.textContent = `₹${AppConfig.monthlyPrice} / माह`;
    if (dispPlanAnnualPrice) dispPlanAnnualPrice.textContent = `₹${AppConfig.annualPrice} / वर्ष`;
  }

  /* ==========================================================================
     9. ROLE SWITCHING & MODAL CONTROLLERS
     ========================================================================== */
  window.selectRole = function (role) {
    currentRole = role;
    localStorage.setItem('vetcare_user_role', role);

    const gateway = document.getElementById('screenGateway');
    const mainApp = document.getElementById('screenMainApp');
    const badge = document.getElementById('currentUserRoleBadge');

    const navRx = document.getElementById('navRx');
    const navRecords = document.getElementById('navRecords');
    const navInventory = document.getElementById('navInventory');
    const navAI = document.getElementById('navAI');
    const navFinanceLabel = document.getElementById('navFinanceLabel');

    if (gateway) gateway.classList.add('hidden');
    if (mainApp) mainApp.classList.remove('hidden');

    if (role === 'DOCTOR') {
      if (badge) badge.innerHTML = `🩺 अधिकृत पशु चिकित्सक (Clinical Mode)`;
      if (navRx) navRx.classList.remove('hidden');
      if (navRecords) navRecords.classList.remove('hidden');
      if (navInventory) navInventory.classList.remove('hidden');
      if (navAI) navAI.classList.remove('hidden');
      if (navFinanceLabel) navFinanceLabel.textContent = "क्लिनिक खाता";
      window.switchTab('diagnosis');
    } else {
      if (badge) badge.innerHTML = `👨‍🌾 स्मार्ट पशुपालक (Dairy Farmer)`;
      if (navRx) navRx.classList.add('hidden');
      if (navRecords) navRecords.classList.add('hidden');
      if (navInventory) navInventory.classList.add('hidden');
      if (navAI) navAI.classList.add('hidden');
      if (navFinanceLabel) navFinanceLabel.textContent = "दूध खाता";
      window.switchTab('diagnosis');
    }

    renderDiseaseResults(CORE_DISEASE_DB);
    startSessionTimer();
  };

  window.openDoctorDeclarationModal = function () {
    const modal = document.getElementById('modalDoctorDeclaration');
    if (modal) modal.style.display = 'flex';
  };

  window.closeDoctorDeclarationModal = function () {
    const modal = document.getElementById('modalDoctorDeclaration');
    if (modal) modal.style.display = 'none';
  };

  window.acceptDoctorDeclaration = function () {
    window.closeDoctorDeclarationModal();
    window.selectRole('DOCTOR');
  };

  window.returnToGateway = function () {
    const gateway = document.getElementById('screenGateway');
    const mainApp = document.getElementById('screenMainApp');
    if (gateway) gateway.classList.remove('hidden');
    if (mainApp) mainApp.classList.add('hidden');
    if (activeSessionTimer) clearInterval(activeSessionTimer);
  };

  /* ==========================================================================
     10. TAB NAVIGATION CONTROLLER
     ========================================================================== */
  const TABS = ['diagnosis', 'breeding', 'feed', 'rx', 'records', 'ai', 'finance', 'inventory', 'helpdesk'];

  window.switchTab = function (targetTab) {
    TABS.forEach(tab => {
      const view = document.getElementById(`view${capitalize(tab)}`);
      const navBtn = document.getElementById(`nav${capitalize(tab)}`);
      if (view) {
        if (tab === targetTab) view.classList.remove('hidden');
        else view.classList.add('hidden');
      }
      if (navBtn) {
        if (tab === targetTab) {
          navBtn.classList.add('active-nav-tab');
          navBtn.classList.remove('text-slate-400');
        } else {
          navBtn.classList.remove('active-nav-tab');
          navBtn.classList.add('text-slate-400');
        }
      }
    });

    if (targetTab === 'finance') renderKhataList();
    if (targetTab === 'inventory') renderInventoryList();
    if (targetTab === 'records') renderSavedOPDRecords();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /* ==========================================================================
     11. 3-WAY CLINICAL DIAGNOSIS ENGINE (MATRIX, HYBRID, DIRECTORY)
     ========================================================================== */
  window.setDiagnosisMode = function (mode) {
    activeDiagnosisMode = mode;
    const btn1 = document.getElementById('btnDiagMode1');
    const btn2 = document.getElementById('btnDiagMode2');
    const btn3 = document.getElementById('btnDiagMode3');

    const panelMatrix = document.getElementById('panelDiagMatrix');
    const panelHybrid = document.getElementById('panelDiagHybrid');
    const panelDirectory = document.getElementById('panelDiagDirectory');

    [btn1, btn2, btn3].forEach(b => {
      if (b) {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-xs');
        b.classList.add('text-slate-600');
      }
    });

    if (panelMatrix) panelMatrix.classList.add('hidden');
    if (panelHybrid) panelHybrid.classList.add('hidden');
    if (panelDirectory) panelDirectory.classList.add('hidden');

    if (mode === 'SYMPTOMS') {
      if (btn1) {
        btn1.classList.add('bg-blue-600', 'text-white', 'shadow-xs');
        btn1.classList.remove('text-slate-600');
      }
      if (panelMatrix) panelMatrix.classList.remove('hidden');
      applyMatrixFilters();
    } else if (mode === 'HYBRID') {
      if (btn2) {
        btn2.classList.add('bg-blue-600', 'text-white', 'shadow-xs');
        btn2.classList.remove('text-slate-600');
      }
      if (panelHybrid) panelHybrid.classList.remove('hidden');
      window.handleAppSearch();
    } else if (mode === 'DIRECTORY') {
      if (btn3) {
        btn3.classList.add('bg-blue-600', 'text-white', 'shadow-xs');
        btn3.classList.remove('text-slate-600');
      }
      if (panelDirectory) panelDirectory.classList.remove('hidden');
      window.filterByTag('ALL');
    }
  };

  window.toggleMatrixParam = function (paramType, val, btn) {
    if (paramType === 'temp') {
      if (matrixSelected.temp === val) {
        matrixSelected.temp = null;
        btn.classList.remove('chip-active');
      } else {
        matrixSelected.temp = val;
        const parent = btn.parentElement;
        parent.querySelectorAll('.m-chip').forEach(c => c.classList.remove('chip-active'));
        btn.classList.add('chip-active');
      }
    }
    applyMatrixFilters();
  };

  window.toggleSecSymptom = function (symCode, btn) {
    const idx = matrixSelected.secondary.indexOf(symCode);
    if (idx > -1) {
      matrixSelected.secondary.splice(idx, 1);
      btn.classList.remove('chip-active');
    } else {
      matrixSelected.secondary.push(symCode);
      btn.classList.add('chip-active');
    }
    applyMatrixFilters();
  };

  window.resetSymptomMatrix = function () {
    matrixSelected = { temp: null, cardinal: 'ALL', secondary: [] };
    const selCardinal = document.getElementById('selCardinalSign');
    if (selCardinal) selCardinal.value = 'ALL';
    document.querySelectorAll('.m-chip, .s-chip').forEach(c => c.classList.remove('chip-active'));
    applyMatrixFilters();
  };

  function applyMatrixFilters() {
    const selCardinal = document.getElementById('selCardinalSign');
    if (selCardinal) matrixSelected.cardinal = selCardinal.value;

    const scored = CORE_DISEASE_DB.map(disease => {
      let score = 0;

      // 1. Cardinal Sign Weight (40%)
      if (matrixSelected.cardinal !== 'ALL') {
        if (disease.cardinal === matrixSelected.cardinal) {
          score += 40;
        }
      }

      // 2. Temperature Weight (20%)
      if (matrixSelected.temp) {
        if (disease.temp === matrixSelected.temp) {
          score += 20;
        }
      }

      // 3. Secondary General Symptoms Weight (Up to 40%)
      if (matrixSelected.secondary.length > 0) {
        const secWeight = 40 / matrixSelected.secondary.length;
        matrixSelected.secondary.forEach(sec => {
          const joinedKeywords = (disease.keywords || []).join(' ') + ' ' + disease.desc;
          if (
            (sec === 'OFF_FEED' && (joinedKeywords.includes('चारा') || joinedKeywords.includes('भूसा') || joinedKeywords.includes('सुस्ती'))) ||
            (sec === 'DULLNESS' && (joinedKeywords.includes('सुस्त') || joinedKeywords.includes('कमजोरी') || joinedKeywords.includes('गर्दन'))) ||
            (sec === 'DIARRHEA' && (joinedKeywords.includes('दस्त') || joinedKeywords.includes('गोबर') || joinedKeywords.includes('प्लेग'))) ||
            (sec === 'CONSTIPATION' && (joinedKeywords.includes('कब्ज') || joinedKeywords.includes('पेट दर्द') || joinedKeywords.includes('सूखा'))) ||
            (sec === 'SALIVATION' && (joinedKeywords.includes('लार') || joinedKeywords.includes('मुंह'))) ||
            (sec === 'MILK_DROP' && (joinedKeywords.includes('दूध') || joinedKeywords.includes('अयन') || joinedKeywords.includes('थनैल'))) ||
            (sec === 'LIMPING' && (joinedKeywords.includes('लंगड़ा') || joinedKeywords.includes('खुर') || joinedKeywords.includes('पैरों')))
          ) {
            score += secWeight;
          }
        });
      }

      if (matrixSelected.cardinal === 'ALL' && !matrixSelected.temp && matrixSelected.secondary.length === 0) {
        score = 80;
      }

      return { ...disease, matchScore: Math.min(Math.round(score), 99) };
    });

    const isFiltered = matrixSelected.cardinal !== 'ALL' || matrixSelected.temp || matrixSelected.secondary.length > 0;
    const sorted = isFiltered
      ? scored.filter(d => d.matchScore > 20).sort((a, b) => b.matchScore - a.matchScore)
      : scored;

    const countBadge = document.getElementById('matchCountBadge');
    const scoreText = document.getElementById('matchScoreText');
    if (countBadge) countBadge.textContent = `${sorted.length} रोग एक्टिव`;
    if (scoreText) {
      scoreText.textContent = isFiltered
        ? `क्लिनिकल प्रोबेबिलिटी मैट्रिक्स एक्टिव (${sorted.length} सम्भावित रोग)`
        : `लक्षण चुनें ➔ वेटेड क्लिनिकल संभावना (%) स्वतः गणना होगी`;
    }

    renderDiseaseResults(sorted);
  }

  window.handleAppSearch = function () {
    const query = (document.getElementById('unifiedSearchInput')?.value || '').toLowerCase().trim();
    if (!query) {
      renderDiseaseResults(CORE_DISEASE_DB);
      return;
    }

    const filtered = CORE_DISEASE_DB.filter(d => {
      const hay = (d.nameHindi + ' ' + d.desc + ' ' + (d.keywords || []).join(' ')).toLowerCase();
      return hay.includes(query);
    });

    renderDiseaseResults(filtered);
  };

  window.filterByTag = function (tag, btn) {
    if (btn) {
      document.querySelectorAll('.q-chip').forEach(c => {
        c.classList.remove('bg-blue-600', 'text-white', 'font-bold');
        c.classList.add('bg-slate-100', 'text-slate-700');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'font-bold');
      btn.classList.remove('bg-slate-100', 'text-slate-700');
    }

    if (tag === 'ALL') {
      renderDiseaseResults(CORE_DISEASE_DB);
    } else {
      const filtered = CORE_DISEASE_DB.filter(d => d.category === tag);
      renderDiseaseResults(filtered);
    }
  };

  function renderDiseaseResults(diseases) {
    const container = document.getElementById('diseaseSearchResults');
    if (!container) return;

    if (!diseases || diseases.length === 0) {
      container.innerHTML = `
        <div class="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-500 space-y-2">
          <span class="text-3xl block">🔍</span>
          <p class="font-bold text-sm text-slate-700">कोई संबंधित रोग रिकॉर्ड नहीं मिला।</p>
          <p class="text-xs">कृपया अन्य लक्षण चुनें या AI सर्जन से तुरंत सेकंड ओपिनियन लें।</p>
          <button onclick="window.switchTab('ai')" class="mt-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-xs">
            🤖 AI सर्जन से पूछें
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = diseases.map(d => {
      const badgeScore = d.matchScore !== undefined
        ? `<span class="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">संभावना: ${d.matchScore}%</span>`
        : `<span class="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">${d.category}</span>`;

      let contentBlock = '';
      if (currentRole === 'DOCTOR') {
        contentBlock = `
          <div class="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-1.5 font-mono text-xs">
            <div class="flex justify-between items-center text-blue-900 font-sans font-bold border-b border-blue-200 pb-1">
              <span>💉 5-स्तरीय अधिकृत एलोपैथिक उपचार (Doctor Rx):</span>
              <button onclick="window.populateRxFromDisease('${escapeStr(d.nameHindi)}', '${escapeStr(d.doctorRx)}')" class="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded shadow-xs hover:bg-blue-700 font-sans">
                + ओपीडी पर्ची में भरें
              </button>
            </div>
            <pre class="whitespace-pre-wrap text-slate-800 leading-relaxed font-sans text-xs">${d.doctorRx}</pre>
          </div>
          <div class="mt-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed font-sans">
            <strong>🌱 किसान हेतु प्राथमिक देसी सलाह:</strong> ${d.farmerRemedy}
          </div>
        `;
      } else {
        contentBlock = `
          <div class="mt-3 p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-2xl text-xs text-emerald-950 space-y-1.5 leading-relaxed font-sans">
            <h4 class="font-bold text-emerald-900 flex items-center gap-1.5">
              <span>🌿</span> सुरक्षित देसी प्राथमिक नुस्खा (Farmer Home Remedy):
            </h4>
            <p>${d.farmerRemedy}</p>
          </div>
          <div class="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-center justify-between">
            <span>⚠️ एलोपैथिक इंजेक्शन केवल अधिकृत पशु चिकित्सक की देखरेख में लगवाएं।</span>
            <button onclick="window.openDoctorDeclarationModal()" class="text-blue-700 underline font-bold text-[10px]">डॉक्टर मोड</button>
          </div>
        `;
      }

      return `
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-2 transition hover:shadow-md">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="text-sm sm:text-base font-black text-slate-900 leading-snug">${d.nameHindi}</h3>
              <p class="text-xs text-slate-500 mt-0.5">${d.desc}</p>
            </div>
            ${badgeScore}
          </div>
          ${contentBlock}
        </div>
      `;
    }).join('');
  }

  function escapeStr(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/\n/g, '\\n');
  }

  /* ==========================================================================
     12. DIGITAL OPD PRESCRIPTION & WHATSAPP GENERATOR
     ========================================================================== */
  window.populateRxFromDisease = function (diagName, rxPrescription) {
    window.switchTab('rx');
    const diagInput = document.getElementById('opdDiagnosis');
    const rxTextarea = document.getElementById('opdMedicine');
    if (diagInput) diagInput.value = diagName;
    if (rxTextarea) rxTextarea.value = rxPrescription;
  };

  window.clearRxField = function () {
    const rxTextarea = document.getElementById('opdMedicine');
    if (rxTextarea) rxTextarea.value = '';
  };

  window.captureGPSLocation = function () {
    const gpsInput = document.getElementById('opdGPS');
    const gpsBtn = document.getElementById('btnGPS');
    if (!navigator.geolocation) {
      alert("आपके डिवाइस में GPS सुविधा उपलब्ध नहीं है।");
      return;
    }

    if (gpsBtn) gpsBtn.textContent = "⏳...";
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        if (gpsInput) gpsInput.value = coords;
        if (gpsBtn) gpsBtn.textContent = "✅ सेट";
      },
      err => {
        alert("GPS लोकेशन प्राप्त नहीं हो सकी: " + err.message);
        if (gpsBtn) gpsBtn.textContent = "📍 GPS";
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  window.calculateDue = function () {
    const total = parseFloat(document.getElementById('opdTotalFee')?.value) || 0;
    const paid = parseFloat(document.getElementById('opdPaidFee')?.value) || 0;
    const due = Math.max(0, total - paid);
    const dueInput = document.getElementById('opdDueFee');
    if (dueInput) dueInput.value = due;
  };

  window.dispatchWhatsAppRx = function () {
    const data = getOPDFormData();
    if (!data.farmerName || !data.farmerPhone) {
      alert("कृपया किसान का नाम और 10-अंकों का मोबाइल नंबर भरें!");
      return;
    }
    if (!data.diagnosis) {
      alert("कृपया पहचाना गया रोग / प्रोविजनल निदान दर्ज करें!");
      return;
    }

    saveOPDRecordToLocal(data);

    if (data.due > 0) {
      saveKhataTransaction({
        farmerName: data.farmerName,
        farmerPhone: data.farmerPhone,
        amount: data.due,
        type: 'DUE',
        note: `OPD Rx: ${data.diagnosis}`,
        date: new Date().toLocaleDateString('en-IN')
      });
    }

    const waText = `*📋 ${AppConfig.appTitle.toUpperCase()} क्लिनिकल डिजिटल ओपीडी पर्ची*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*दिनांक:* ${new Date().toLocaleDateString('hi-IN')} ${new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}\n` +
      `*पशुपालक:* ${data.farmerName} (${data.village || 'ग्रामीण'})\n` +
      `*मोबाइल:* ${data.farmerPhone}\n` +
      `*मरीज पशु:* ${data.animal} (टैग: ${data.tag || 'N/A'})\n` +
      `*गर्भ स्थिति:* ${data.pregnancy}\n` +
      (data.gps ? `*GPS:* ${data.gps}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*🩺 प्रोविजनल निदान:* ${data.diagnosis}\n\n` +
      `*💊 सुझाई गई दवाएं व इंजेक्शन (Rx):*\n${data.medicines}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*कुल फीस:* ₹${data.totalFee} | *जमा:* ₹${data.paidFee} | *बकाया:* ₹${data.due}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `_नोट: यह पर्ची अधिकृत पशु चिकित्सक द्वारा प्रमाणित है। कृपया दवा का पूरा कोर्स समय पर पूर्ण करें।_`;

    const cleanPhone = data.farmerPhone.replace(/\D/g, '');
    const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(waText)}`, '_blank');
  };

  function getOPDFormData() {
    return {
      id: 'OPD-' + Date.now(),
      farmerName: document.getElementById('opdFarmerName')?.value.trim() || '',
      farmerPhone: document.getElementById('opdFarmerPhone')?.value.trim() || '',
      village: document.getElementById('opdVillage')?.value.trim() || '',
      animal: document.getElementById('opdAnimal')?.value || 'गाय (Cow)',
      tag: document.getElementById('opdTag')?.value.trim() || '',
      gps: document.getElementById('opdGPS')?.value.trim() || '',
      pregnancy: document.getElementById('opdPregnancy')?.value || 'खाली',
      diagnosis: document.getElementById('opdDiagnosis')?.value.trim() || '',
      medicines: document.getElementById('opdMedicine')?.value.trim() || '',
      totalFee: parseFloat(document.getElementById('opdTotalFee')?.value) || 0,
      paidFee: parseFloat(document.getElementById('opdPaidFee')?.value) || 0,
      due: parseFloat(document.getElementById('opdDueFee')?.value) || 0,
      timestamp: new Date().toISOString()
    };
  }

  window.saveOfflineCaseDirectly = function () {
    const data = getOPDFormData();
    if (!data.farmerName || !data.farmerPhone) {
      alert("कृपया किसान का नाम और मोबाइल नंबर भरें!");
      return;
    }
    saveOPDRecordToLocal(data);
    showToast("✅ केस रिकॉर्ड सफलतापूर्वक सुरक्षित हो गया!");
  };

  function saveOPDRecordToLocal(record) {
    try {
      const records = JSON.parse(localStorage.getItem('vetcare_opd_records') || '[]');
      records.unshift(record);
      localStorage.setItem('vetcare_opd_records', JSON.stringify(records));
      renderSavedOPDRecords();
    } catch (e) {
      console.error("OPD save error:", e);
    }
  }

  function renderSavedOPDRecords() {
    const container = document.getElementById('recordsList');
    const totalBadge = document.getElementById('recordTotalBadge');
    if (!container) return;

    const records = JSON.parse(localStorage.getItem('vetcare_opd_records') || '[]');
    if (totalBadge) totalBadge.textContent = `${records.length} केस सुरक्षित`;

    if (records.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-slate-400 bg-slate-50 border border-slate-200 rounded-2xl">कोई सुरक्षित ओपीडी केस नहीं मिला।</div>`;
      return;
    }

    container.innerHTML = records.map(r => `
      <div class="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2 shadow-xs">
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-bold text-slate-900 text-xs sm:text-sm">${r.farmerName} (${r.animal})</h4>
            <p class="text-[11px] text-slate-500">📞 ${r.farmerPhone} • 📍 ${r.village || 'N/A'}</p>
          </div>
          <span class="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200">
            ${new Date(r.timestamp).toLocaleDateString('hi-IN')}
          </span>
        </div>
        <div class="bg-slate-50 p-2 rounded-xl text-xs space-y-1">
          <p class="font-bold text-slate-800">🩺 ${r.diagnosis}</p>
          <pre class="font-sans text-slate-600 text-[11px] whitespace-pre-wrap">${r.medicines || 'कोई दवा विवरण नहीं'}</pre>
        </div>
        <div class="flex justify-between items-center text-[11px] pt-1 border-t border-slate-100">
          <span class="font-medium text-slate-500">फीस: ₹${r.totalFee} (बकाया: <strong class="text-rose-600">₹${r.due}</strong>)</span>
          <button onclick="window.resendWhatsAppRecord('${r.id}')" class="text-emerald-700 font-bold hover:underline flex items-center gap-1">
            <span>💬 पुनः व्हाट्सएप भेजें</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  window.resendWhatsAppRecord = function (id) {
    const records = JSON.parse(localStorage.getItem('vetcare_opd_records') || '[]');
    const r = records.find(item => item.id === id);
    if (!r) return;

    const waText = `*📋 ${AppConfig.appTitle.toUpperCase()} डिजिटल ओपीडी पर्ची (कॉपी)*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*पशुपालक:* ${r.farmerName} (${r.village || 'ग्रामीण'})\n` +
      `*मोबाइल:* ${r.farmerPhone}\n` +
      `*मरीज पशु:* ${r.animal}\n` +
      `*निदान:* ${r.diagnosis}\n` +
      `*दवाएं (Rx):*\n${r.medicines}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*बकाया राशि:* ₹${r.due}`;

    const cleanPhone = r.farmerPhone.replace(/\D/g, '');
    const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(waText)}`, '_blank');
  };

  window.handleRecordSearch = function () {
    const q = (document.getElementById('searchRecordsInput')?.value || '').toLowerCase().trim();
    const records = JSON.parse(localStorage.getItem('vetcare_opd_records') || '[]');
    const filtered = records.filter(r =>
      r.farmerName.toLowerCase().includes(q) ||
      r.farmerPhone.toLowerCase().includes(q) ||
      (r.village && r.village.toLowerCase().includes(q)) ||
      r.diagnosis.toLowerCase().includes(q)
    );

    const container = document.getElementById('recordsList');
    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-slate-400 bg-slate-50 border border-slate-200 rounded-2xl">कोई मेल खाता केस नहीं मिला।</div>`;
      return;
    }

    container.innerHTML = filtered.map(r => `
      <div class="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-1.5 shadow-xs">
        <div class="flex justify-between items-start">
          <h4 class="font-bold text-slate-900 text-xs sm:text-sm">${r.farmerName} (${r.animal})</h4>
          <span class="text-[10px] text-slate-400">${new Date(r.timestamp).toLocaleDateString('hi-IN')}</span>
        </div>
        <p class="text-[11px] text-slate-500">📞 ${r.farmerPhone} • 📍 ${r.village || 'N/A'}</p>
        <p class="text-xs font-semibold text-slate-800">🩺 ${r.diagnosis}</p>
        <p class="text-[11px] text-rose-600 font-bold">बकाया: ₹${r.due}</p>
      </div>
    `).join('');
  };

  window.printCurrentOPDSlip = function () {
    const data = getOPDFormData();
    const printArea = document.getElementById('printableSlipArea');
    if (!printArea) return;

    printArea.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5; color: #000;">
        <div style="border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; display: flex; justify-content: space-between;">
          <div>
            <h1 style="font-size: 22px; margin: 0; font-weight: bold;">${AppConfig.appTitle} Veterinary Clinic</h1>
            <p style="font-size: 11px; margin: 2px 0;">${AppConfig.appTagline}</p>
            <p style="font-size: 11px; margin: 2px 0;">हेल्पलाइन: ${AppConfig.adminWhatsApp}</p>
          </div>
          <div style="text-align: right; font-size: 12px;">
            <p style="margin: 0;"><strong>दिनांक:</strong> ${new Date().toLocaleDateString('hi-IN')}</p>
            <p style="margin: 2px 0;"><strong>पर्ची सं.:</strong> ${data.id}</p>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 12px;">
          <tr>
            <td style="padding: 4px 0;"><strong>किसान का नाम:</strong> ${data.farmerName}</td>
            <td style="padding: 4px 0;"><strong>मोबाइल:</strong> ${data.farmerPhone}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;"><strong>गाँव:</strong> ${data.village || 'N/A'}</td>
            <td style="padding: 4px 0;"><strong>पशु:</strong> ${data.animal} (टैग: ${data.tag || 'N/A'})</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;"><strong>गर्भ स्थिति:</strong> ${data.pregnancy}</td>
            <td style="padding: 4px 0;"><strong>GPS:</strong> ${data.gps || 'N/A'}</td>
          </tr>
        </table>

        <div style="border: 1px solid #ccc; padding: 10px; border-radius: 8px; margin-bottom: 15px;">
          <h3 style="margin: 0 0 5px 0; font-size: 13px;">🩺 प्रोविजनल रोग निदान (Diagnosis):</h3>
          <p style="margin: 0; font-weight: bold; font-size: 13px; color: #1e3a8a;">${data.diagnosis}</p>
        </div>

        <div style="border: 1px solid #ccc; padding: 10px; border-radius: 8px; margin-bottom: 15px;">
          <h3 style="margin: 0 0 8px 0; font-size: 13px;">💊 सुझाई गई दवाएं व इंजेक्शन (Rx Prescriptions):</h3>
          <pre style="font-family: inherit; margin: 0; white-space: pre-wrap; font-size: 12px;">${data.medicines || 'कोई दवा दर्ज नहीं।'}</pre>
        </div>

        <div style="border-top: 1px dashed #666; padding-top: 10px; display: flex; justify-content: space-between; font-size: 12px;">
          <div>
            <p style="margin: 2px 0;"><strong>कुल फीस:</strong> ₹${data.totalFee}</p>
            <p style="margin: 2px 0;"><strong>जमा राशि:</strong> ₹${data.paidFee}</p>
            <p style="margin: 2px 0; color: #b91c1c;"><strong>बकाया राशि:</strong> ₹${data.due}</p>
          </div>
          <div style="text-align: right; padding-top: 25px;">
            <p style="margin: 0; border-top: 1px solid #000; display: inline-block; padding-top: 4px;">अधिकृत पशु चिकित्सक हस्ताक्षर</p>
          </div>
        </div>
      </div>
    `;

    window.print();
  };

  window.sendCaseToAIConsultant = function () {
    const diag = document.getElementById('opdDiagnosis')?.value.trim() || '';
    const animal = document.getElementById('opdAnimal')?.value || '';
    const preg = document.getElementById('opdPregnancy')?.value || '';
    const rx = document.getElementById('opdMedicine')?.value.trim() || '';

    window.switchTab('ai');
    const aiInput = document.getElementById('aiInputPrompt');
    if (aiInput) {
      aiInput.value = `पशु: ${animal}, स्थिति: ${preg}\nप्रोविजनल लक्षण/रोग: ${diag}\nचल रही दवाएं: ${rx}\nकृपया क्लिनिकल विभेदक निदान और द्वितीय राय (Second Opinion) प्रदान करें।`;
      window.runAIConsultant();
    }
  };

  /* ==========================================================================
     13. SHAEFFER'S WEIGHT & DRUG DOSAGE CALCULATOR
     ========================================================================== */
  window.calculateShaefferWeight = function (heartGirthInches, lengthInches) {
    if (!heartGirthInches || !lengthInches) return 0;
    // Formula: Weight in lbs = (Heart Girth^2 * Length) / 300
    // Weight in kg = Weight in lbs / 2.20462
    const weightLbs = (Math.pow(heartGirthInches, 2) * lengthInches) / 300;
    return Math.round(weightLbs / 2.20462);
  };

  window.calculateDrugVolumeMl = function (bodyWeightKg, doseRateMgPerKg, concentrationMgPerMl) {
    if (!bodyWeightKg || !doseRateMgPerKg || !concentrationMgPerMl) return 0;
    const totalDoseMg = bodyWeightKg * doseRateMgPerKg;
    const volumeMl = totalDoseMg / concentrationMgPerMl;
    return parseFloat(volumeMl.toFixed(1));
  };

  /* ==========================================================================
     14. BALANCED DAIRY FEED CALCULATOR
     ========================================================================== */
  window.calculateDailyRation = function () {
    const weight = parseFloat(document.getElementById('feedWeight')?.value) || 400;
    const milk = parseFloat(document.getElementById('feedMilk')?.value) || 10;

    // Dry Matter (DM) = 2.8% of body weight
    const totalDM = weight * 0.028;

    // Concentrate (दाना): 1.5 kg maintenance + 0.4 kg per liter milk
    const grainKg = 1.5 + (milk * 0.4);

    // Roughage balance
    const roughageDM = Math.max(0, totalDM - (grainKg * 0.9));
    const dryFodderKg = (roughageDM * 0.35) / 0.9;
    const greenFodderKg = (roughageDM * 0.65) / 0.20;

    const card = document.getElementById('rationResultCard');
    const resGrain = document.getElementById('resFeedGrain');
    const resGreen = document.getElementById('resFeedGreen');
    const resDry = document.getElementById('resFeedDry');

    if (resGrain) resGrain.textContent = `${grainKg.toFixed(1)} kg`;
    if (resGreen) resGreen.textContent = `${greenFodderKg.toFixed(1)} kg`;
    if (resDry) resDry.textContent = `${dryFodderKg.toFixed(1)} kg`;
    if (card) card.classList.remove('hidden');
  };

  function renderBreedingAdvisory() {
    const heatContainer = document.getElementById('heatSignsContainer');
    const dischargeContainer = document.getElementById('dischargeContainer');
    const repeatList = document.getElementById('repeatBreederList');

    if (heatContainer) {
      heatContainer.innerHTML = BREEDING_HEAT_DATA.map(h => `
        <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <strong class="text-rose-700 block">${h.stage}</strong>
          <p class="text-slate-600">${h.sign}</p>
          <p class="text-[11px] font-bold text-emerald-800">➔ सलाह: ${h.action}</p>
        </div>
      `).join('');
    }

    if (dischargeContainer) {
      dischargeContainer.innerHTML = DISCHARGE_DATA.map(d => `
        <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <strong class="text-blue-900 block">${d.type}</strong>
          <p class="text-slate-600">${d.meaning}</p>
        </div>
      `).join('');
    }

    if (repeatList) {
      repeatList.innerHTML = REPEAT_BREEDER_TIPS.map(tip => `<li>${tip}</li>`).join('');
    }
  }

  /* ==========================================================================
     15. KHATA LEDGER & 1-CLICK WHATSAPP TAGADA
     ========================================================================== */
  window.openNewKhataModal = function () {
    const modal = document.getElementById('modalNewKhata');
    if (modal) modal.style.display = 'flex';
  };

  window.closeNewKhataModal = function () {
    const modal = document.getElementById('modalNewKhata');
    if (modal) modal.style.display = 'none';
  };

  window.saveNewKhataRecord = function () {
    const name = document.getElementById('khataFarmerName')?.value.trim();
    const phone = document.getElementById('khataFarmerPhone')?.value.trim();
    const amount = parseFloat(document.getElementById('khataAmount')?.value) || 0;
    const type = document.getElementById('khataType')?.value || 'DUE';
    const note = document.getElementById('khataNote')?.value.trim() || 'लेन-देन';

    if (!name || !phone || amount <= 0) {
      alert("कृपया नाम, मोबाइल और मान्य राशि दर्ज करें!");
      return;
    }

    saveKhataTransaction({
      farmerName: name,
      farmerPhone: phone,
      amount,
      type,
      note,
      date: new Date().toLocaleDateString('en-IN')
    });

    window.closeNewKhataModal();
    if (document.getElementById('khataFarmerName')) document.getElementById('khataFarmerName').value = '';
    if (document.getElementById('khataFarmerPhone')) document.getElementById('khataFarmerPhone').value = '';
    if (document.getElementById('khataAmount')) document.getElementById('khataAmount').value = '';
    if (document.getElementById('khataNote')) document.getElementById('khataNote').value = '';
  };

  function saveKhataTransaction(entry) {
    try {
      const khata = JSON.parse(localStorage.getItem('vetcare_khata_ledger') || '[]');
      khata.unshift({ ...entry, id: 'KHT-' + Date.now() });
      localStorage.setItem('vetcare_khata_ledger', JSON.stringify(khata));
      renderKhataList();
    } catch (e) {
      console.error("Khata save error:", e);
    }
  }

  function renderKhataList() {
    const container = document.getElementById('finDueList');
    const finCredit = document.getElementById('finCredit');
    const finDebit = document.getElementById('finDebit');
    const query = (document.getElementById('searchKhataInput')?.value || '').toLowerCase().trim();

    if (!container) return;

    const khata = JSON.parse(localStorage.getItem('vetcare_khata_ledger') || '[]');
    let totalCredit = 0;
    let totalDebit = 0;

    khata.forEach(item => {
      if (item.type === 'PAID') totalCredit += item.amount;
      if (item.type === 'DUE') totalDebit += item.amount;
    });

    if (finCredit) finCredit.textContent = `₹${totalCredit.toLocaleString('en-IN')}`;
    if (finDebit) finDebit.textContent = `₹${totalDebit.toLocaleString('en-IN')}`;

    const filtered = khata.filter(item =>
      item.farmerName.toLowerCase().includes(query) ||
      item.farmerPhone.toLowerCase().includes(query) ||
      (item.note && item.note.toLowerCase().includes(query))
    );

    if (filtered.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-slate-400 bg-slate-50 border border-slate-200 rounded-2xl">खाता बही में कोई प्रविष्टि नहीं है।</div>`;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const isDue = item.type === 'DUE';
      const badge = isDue
        ? `<span class="text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded text-[11px] font-bold">बकाया: ₹${item.amount}</span>`
        : `<span class="text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">जमा: ₹${item.amount}</span>`;

      const tagadaBtn = isDue ? `
        <button onclick="window.sendKhataWhatsAppTagada('${item.farmerPhone}', '${item.farmerName}', ${item.amount}, '${item.note}')" class="text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
          <span>💬 तगादा</span>
        </button>
      ` : '';

      return `
        <div class="bg-white border border-slate-200 rounded-2xl p-3 flex justify-between items-center shadow-xs">
          <div>
            <h4 class="font-bold text-slate-900 text-xs sm:text-sm">${item.farmerName}</h4>
            <p class="text-[11px] text-slate-500">📞 ${item.farmerPhone} • ${item.date} • ${item.note}</p>
          </div>
          <div class="flex items-center gap-2">
            ${badge}
            ${tagadaBtn}
          </div>
        </div>
      `;
    }).join('');
  }

  window.sendKhataWhatsAppTagada = function (phone, name, amount, note) {
    const waText = `*🔔 ${AppConfig.appTitle} - बकाया भुगतान स्मरण पत्र (Payment Reminder)*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `नमस्ते *${name}* जी,\n` +
      `आपके पशु उपचार/सेवाओं का *₹${amount}* का बकाया शेष है (${note})।\n\n` +
      `कृपया इस राशि का भुगतान करने का कष्ट करें।\n` +
      `*UPI द्वारा भुगतान हेतु:* ${AppConfig.sbiUpi}\n` +
      `धन्यवाद!\n*${AppConfig.payeeName}*`;

    const cleanPhone = phone.replace(/\D/g, '');
    const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(waText)}`, '_blank');
  };

  /* ==========================================================================
     16. DRUG & SEMEN STRAW INVENTORY SYSTEM
     ========================================================================== */
  const DEFAULT_INVENTORY = [
    { id: "INV-1", name: "Inj. Intacef Tazo (3375 mg)", category: "INJECTION", stock: 8, minAlert: 3, unit: "vials" },
    { id: "INV-2", name: "Inj. Melonex Plus (100 ml)", category: "INJECTION", stock: 2, minAlert: 3, unit: "vials" },
    { id: "INV-3", name: "Inj. Mifex / CBG (450 ml)", category: "INJECTION", stock: 5, minAlert: 2, unit: "bottles" },
    { id: "INV-4", name: "Murrah Buffalo Semen Straws (PT)", category: "SEMEN", stock: 15, minAlert: 5, unit: "straws" },
    { id: "INV-5", name: "HF Cow 100% Sorted Straws", category: "SEMEN", stock: 4, minAlert: 5, unit: "straws" },
    { id: "INV-6", name: "Bolus Fentas Plus", category: "BOLUS", stock: 20, minAlert: 6, unit: "strips" },
    { id: "INV-7", name: "Liv-52 Protec Liquid (1 L)", category: "TONIC", stock: 6, minAlert: 2, unit: "bottles" }
  ];

  window.openNewInventoryItemModal = function () {
    const modal = document.getElementById('modalNewInventory');
    if (modal) modal.style.display = 'flex';
  };

  window.closeNewInventoryModal = function () {
    const modal = document.getElementById('modalNewInventory');
    if (modal) modal.style.display = 'none';
  };

  window.saveNewInventoryItem = function () {
    const name = document.getElementById('invItemName')?.value.trim();
    const category = document.getElementById('invItemCategory')?.value || 'INJECTION';
    const stock = parseInt(document.getElementById('invItemStock')?.value, 10) || 0;
    const minAlert = parseInt(document.getElementById('invItemMinAlert')?.value, 10) || 3;
    const unit = document.getElementById('invItemUnit')?.value.trim() || 'units';

    if (!name) {
      alert("कृपया दवा या स्ट्रॉ का नाम दर्ज करें!");
      return;
    }

    try {
      const inv = JSON.parse(localStorage.getItem('vetcare_inventory_data') || 'null') || [...DEFAULT_INVENTORY];
      inv.unshift({ id: 'INV-' + Date.now(), name, category, stock, minAlert, unit });
      localStorage.setItem('vetcare_inventory_data', JSON.stringify(inv));
      window.closeNewInventoryModal();
      renderInventoryList();
      showToast("✅ नया स्टॉक आइटम जोड़ा गया!");
    } catch (e) {
      console.error("Inventory error:", e);
    }
  };

  window.adjustStock = function (id, delta) {
    try {
      const inv = JSON.parse(localStorage.getItem('vetcare_inventory_data') || 'null') || [...DEFAULT_INVENTORY];
      const item = inv.find(x => x.id === id);
      if (item) {
        item.stock = Math.max(0, item.stock + delta);
        localStorage.setItem('vetcare_inventory_data', JSON.stringify(inv));
        renderInventoryList();
      }
    } catch (e) {
      console.error("Stock adjustment error:", e);
    }
  };

  let activeInvCat = 'ALL';
  window.filterInventoryCategory = function (cat, btn) {
    activeInvCat = cat;
    if (btn) {
      document.querySelectorAll('.inv-chip').forEach(c => {
        c.classList.remove('bg-blue-600', 'text-white', 'font-bold');
        c.classList.add('bg-slate-100', 'text-slate-700');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'font-bold');
      btn.classList.remove('bg-slate-100', 'text-slate-700');
    }
    renderInventoryList();
  };

  function renderInventoryList() {
    const container = document.getElementById('inventoryItemsContainer');
    const alertBadge = document.getElementById('lowStockAlertBadge');
    if (!container) return;

    const inv = JSON.parse(localStorage.getItem('vetcare_inventory_data') || 'null') || [...DEFAULT_INVENTORY];
    let hasLowStock = false;

    const filtered = inv.filter(item => activeInvCat === 'ALL' || item.category === activeInvCat);

    container.innerHTML = filtered.map(item => {
      const isLow = item.stock <= item.minAlert;
      if (isLow) hasLowStock = true;

      return `
        <div class="bg-white border ${isLow ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'} rounded-2xl p-3 flex justify-between items-center shadow-xs">
          <div>
            <div class="flex items-center gap-1.5">
              <h4 class="font-bold text-slate-900 text-xs sm:text-sm">${item.name}</h4>
              ${isLow ? '<span class="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded pulse-danger">कम स्टॉक!</span>' : ''}
            </div>
            <p class="text-[11px] text-slate-500">श्रेणी: ${item.category} • न्यूनतम सीमा: ${item.minAlert} ${item.unit}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-bold ${isLow ? 'text-rose-600' : 'text-slate-800'}">${item.stock} ${item.unit}</span>
            <div class="flex items-center gap-1">
              <button onclick="window.adjustStock('${item.id}', -1)" class="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-slate-700 text-sm flex items-center justify-center">-</button>
              <button onclick="window.adjustStock('${item.id}', 1)" class="w-7 h-7 bg-blue-50 hover:bg-blue-100 rounded-lg font-bold text-blue-700 text-sm flex items-center justify-center">+</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (alertBadge) {
      if (hasLowStock) alertBadge.classList.remove('hidden');
      else alertBadge.classList.add('hidden');
    }
  }

  /* ==========================================================================
     17. MULTI-BANK PAYMENT GATEWAY & DUAL UPI CONFIG
     ========================================================================== */
  window.openPremiumPaymentModal = function () {
    const modal = document.getElementById('modalPremiumPayment');
    if (modal) {
      modal.style.display = 'flex';
      updatePaymentModalDisplay();
    }
  };

  window.closePremiumPaymentModal = function () {
    const modal = document.getElementById('modalPremiumPayment');
    if (modal) modal.style.display = 'none';
  };

  window.selectPaymentPlan = function (plan) {
    selectedPlan = plan;
    const btnM = document.getElementById('btnPlanMonthly');
    const btnA = document.getElementById('btnPlanAnnual');

    if (plan === 'MONTHLY') {
      if (btnM) { btnM.classList.add('bg-blue-600', 'text-white'); btnM.classList.remove('text-slate-700'); }
      if (btnA) { btnA.classList.remove('bg-blue-600', 'text-white'); btnA.classList.add('text-slate-700'); }
    } else {
      if (btnA) { btnA.classList.add('bg-blue-600', 'text-white'); btnA.classList.remove('text-slate-700'); }
      if (btnM) { btnM.classList.remove('bg-blue-600', 'text-white'); btnM.classList.add('text-slate-700'); }
    }
    updatePaymentModalDisplay();
  };

  window.switchBankTab = function (bank) {
    activeBank = bank;
    const tabSBI = document.getElementById('btnTabSBI');
    const tabPNB = document.getElementById('btnTabPNB');

    if (bank === 'SBI') {
      if (tabSBI) { tabSBI.classList.add('bg-blue-50', 'text-blue-700', 'font-bold'); tabSBI.classList.remove('bg-slate-50', 'text-slate-600', 'font-medium'); }
      if (tabPNB) { tabPNB.classList.remove('bg-blue-50', 'text-blue-700', 'font-bold'); tabPNB.classList.add('bg-slate-50', 'text-slate-600', 'font-medium'); }
    } else {
      if (tabPNB) { tabPNB.classList.add('bg-amber-50', 'text-amber-800', 'font-bold'); tabPNB.classList.remove('bg-slate-50', 'text-slate-600', 'font-medium'); }
      if (tabSBI) { tabSBI.classList.remove('bg-blue-50', 'text-blue-700', 'font-bold', 'bg-amber-50', 'text-amber-800'); tabSBI.classList.add('bg-slate-50', 'text-slate-600', 'font-medium'); }
    }
    updatePaymentModalDisplay();
  };

  function updatePaymentModalDisplay() {
    const amount = selectedPlan === 'MONTHLY' ? AppConfig.monthlyPrice : AppConfig.annualPrice;
    const isSBI = activeBank === 'SBI';
    const upi = isSBI ? AppConfig.sbiUpi : AppConfig.pnbUpi;
    const acc = isSBI ? AppConfig.sbiAccount : AppConfig.pnbAccount;
    const ifsc = isSBI ? AppConfig.sbiIfsc : AppConfig.pnbIfsc;

    const dispPayeeName = document.getElementById('dispPayeeName');
    const dispUPIId = document.getElementById('dispUPIId');
    const dispAccountNumber = document.getElementById('dispAccountNumber');
    const dispIFSC = document.getElementById('dispIFSC');
    const directUPIAmount = document.getElementById('directUPIAmount');
    const btnDirectUPILink = document.getElementById('btnDirectUPILink');
    const dynamicQRImage = document.getElementById('dynamicQRImage');

    if (dispPayeeName) dispPayeeName.textContent = AppConfig.payeeName;
    if (dispUPIId) dispUPIId.textContent = upi;
    if (dispAccountNumber) dispAccountNumber.textContent = acc;
    if (dispIFSC) dispIFSC.textContent = ifsc;
    if (directUPIAmount) directUPIAmount.textContent = amount;

    // Standard NPCI UPI URI
    const upiUri = `upi://pay?pa=${encodeURIComponent(upi)}&pn=${encodeURIComponent(AppConfig.payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Vetcare ${selectedPlan} Subscription`)}`;

    if (btnDirectUPILink) btnDirectUPILink.href = upiUri;

    if (dynamicQRImage) {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(upiUri)}`;
      dynamicQRImage.src = qrUrl;
    }
  }

  window.sendPaymentProofWhatsApp = function () {
    const amount = selectedPlan === 'MONTHLY' ? AppConfig.monthlyPrice : AppConfig.annualPrice;
    const waText = `*🧾 Vetcare प्रीमियम भुगतान सत्यापन (Proof of Payment)*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `प्लान: *${selectedPlan === 'MONTHLY' ? 'मासिक (₹' + amount + ')' : 'वार्षिक (₹' + amount + ')'}*\n` +
      `भुगतान बैंक: *${activeBank}*\n` +
      `खाता धारक: *${AppConfig.payeeName}*\n` +
      `कृपया मेरा प्रीमियम सब्सक्रिप्शन एक्टिवेट करें।\n` +
      `स्क्रीनशॉट / UTR संदर्भ संख्या संलग्न है।`;

    const fullPhone = AppConfig.adminWhatsApp.replace(/\D/g, '');
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(waText)}`, '_blank');
  };

  /* ==========================================================================
     18. SUPER ADMIN PIN & CONTROL DASHBOARD
     ========================================================================== */
  window.openAdminPinModal = function () {
    const modal = document.getElementById('modalAdminPIN');
    const pinInput = document.getElementById('inputAdminPIN');
    const err = document.getElementById('pinErrorMessage');
    if (pinInput) pinInput.value = '';
    if (err) err.classList.add('hidden');
    if (modal) modal.style.display = 'flex';
  };

  window.closeAdminPinModal = function () {
    const modal = document.getElementById('modalAdminPIN');
    if (modal) modal.style.display = 'none';
  };

  window.verifyAdminPIN = function () {
    const pinInput = document.getElementById('inputAdminPIN');
    const err = document.getElementById('pinErrorMessage');
    if (pinInput && pinInput.value.trim() === AppConfig.adminPin) {
      window.closeAdminPinModal();
      openAdminDashboard();
    } else {
      if (err) err.classList.remove('hidden');
    }
  };

  function openAdminDashboard() {
    const modal = document.getElementById('modalAdminDashboard');
    if (modal) {
      modal.style.display = 'flex';
      populateAdminInputs();
      updateAdminMetrics();
    }
  }

  window.closeAdminDashboard = function () {
    const modal = document.getElementById('modalAdminDashboard');
    if (modal) modal.style.display = 'none';
  };

  window.switchAdminTab = function (tab) {
    const tabs = ['Payment', 'Branding', 'Support', 'Metrics'];
    tabs.forEach(t => {
      const panel = document.getElementById(`adminPanel${t}`);
      const btn = document.getElementById(`tabBtnAdmin${t === 'Payment' ? 'Pay' : t === 'Branding' ? 'Brand' : t}`);
      if (panel) {
        if (t.toUpperCase() === tab) panel.classList.remove('hidden');
        else panel.classList.add('hidden');
      }
      if (btn) {
        if (t.toUpperCase() === tab) {
          btn.classList.add('border-blue-600', 'text-blue-600');
          btn.classList.remove('border-transparent', 'text-slate-600');
        } else {
          btn.classList.remove('border-blue-600', 'text-blue-600');
          btn.classList.add('border-transparent', 'text-slate-600');
        }
      }
    });
  };

  function populateAdminInputs() {
    setVal('cfgPayeeName', AppConfig.payeeName);
    setVal('cfgMonthlyPrice', AppConfig.monthlyPrice);
    setVal('cfgAnnualPrice', AppConfig.annualPrice);
    setVal('cfgSbiUpi', AppConfig.sbiUpi);
    setVal('cfgSbiAccount', AppConfig.sbiAccount);
    setVal('cfgSbiIfsc', AppConfig.sbiIfsc);
    setVal('cfgPnbUpi', AppConfig.pnbUpi);
    setVal('cfgPnbAccount', AppConfig.pnbAccount);
    setVal('cfgPnbIfsc', AppConfig.pnbIfsc);
    setVal('cfgAppTitle', AppConfig.appTitle);
    setVal('cfgLogoUrl', AppConfig.logoUrl);
    setVal('cfgAppTagline', AppConfig.appTagline);
    setVal('cfgAdminWhatsApp', AppConfig.adminWhatsApp);
    setVal('cfgAdminPIN', AppConfig.adminPin);
  }

  function setVal(id, v) {
    const el = document.getElementById(id);
    if (el) el.value = v !== undefined ? v : '';
  }

  window.saveAllAdminSettings = function () {
    AppConfig.payeeName = document.getElementById('cfgPayeeName')?.value.trim() || AppConfig.payeeName;
    AppConfig.monthlyPrice = parseFloat(document.getElementById('cfgMonthlyPrice')?.value) || AppConfig.monthlyPrice;
    AppConfig.annualPrice = parseFloat(document.getElementById('cfgAnnualPrice')?.value) || AppConfig.annualPrice;
    AppConfig.sbiUpi = document.getElementById('cfgSbiUpi')?.value.trim() || AppConfig.sbiUpi;
    AppConfig.sbiAccount = document.getElementById('cfgSbiAccount')?.value.trim() || AppConfig.sbiAccount;
    AppConfig.sbiIfsc = document.getElementById('cfgSbiIfsc')?.value.trim().toUpperCase() || AppConfig.sbiIfsc;
    AppConfig.pnbUpi = document.getElementById('cfgPnbUpi')?.value.trim() || AppConfig.pnbUpi;
    AppConfig.pnbAccount = document.getElementById('cfgPnbAccount')?.value.trim() || AppConfig.pnbAccount;
    AppConfig.pnbIfsc = document.getElementById('cfgPnbIfsc')?.value.trim().toUpperCase() || AppConfig.pnbIfsc;
    AppConfig.appTitle = document.getElementById('cfgAppTitle')?.value.trim() || AppConfig.appTitle;
    AppConfig.logoUrl = document.getElementById('cfgLogoUrl')?.value.trim() || '';
    AppConfig.appTagline = document.getElementById('cfgAppTagline')?.value.trim() || AppConfig.appTagline;
    AppConfig.adminWhatsApp = document.getElementById('cfgAdminWhatsApp')?.value.trim() || AppConfig.adminWhatsApp;

    const newPin = document.getElementById('cfgAdminPIN')?.value.trim();
    if (newPin && newPin.length === 4) {
      AppConfig.adminPin = newPin;
    }

    localStorage.setItem('vetcare_master_config', JSON.stringify(AppConfig));
    applyDynamicBranding();
    alert("✅ सभी मास्टर एडमिन सेटिंग्स सफलतापूर्वक सुरक्षित कर दी गईं!");
    window.closeAdminDashboard();
  };

  function updateAdminMetrics() {
    const opdRecords = JSON.parse(localStorage.getItem('vetcare_opd_records') || '[]');
    const khata = JSON.parse(localStorage.getItem('vetcare_khata_ledger') || '[]');
    const inv = JSON.parse(localStorage.getItem('vetcare_inventory_data') || 'null') || [...DEFAULT_INVENTORY];

    let totalDue = 0;
    khata.forEach(k => {
      if (k.type === 'DUE') totalDue += k.amount;
    });

    const lowCount = inv.filter(i => i.stock <= i.minAlert).length;

    const mTotalOPD = document.getElementById('metricTotalOPD');
    const mTotalDues = document.getElementById('metricTotalDues');
    const mLowStock = document.getElementById('metricLowStock');

    if (mTotalOPD) mTotalOPD.textContent = opdRecords.length;
    if (mTotalDues) mTotalDues.textContent = `₹${totalDue.toLocaleString('en-IN')}`;
    if (mLowStock) mLowStock.textContent = lowCount;
  }

  window.exportDataBackupJSON = function () {
    const exportBundle = {
      config: AppConfig,
      opd: JSON.parse(localStorage.getItem('vetcare_opd_records') || '[]'),
      khata: JSON.parse(localStorage.getItem('vetcare_khata_ledger') || '[]'),
      inventory: JSON.parse(localStorage.getItem('vetcare_inventory_data') || 'null') || DEFAULT_INVENTORY,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vetcare_Backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  window.clearDemoDataOnly = function () {
    if (confirm("क्या आप केवल टेस्ट रिकॉर्ड्स और लोकल डेटा रीसेट करना चाहते हैं?")) {
      localStorage.removeItem('vetcare_opd_records');
      localStorage.removeItem('vetcare_khata_ledger');
      localStorage.removeItem('vetcare_inventory_data');
      renderSavedOPDRecords();
      renderKhataList();
      renderInventoryList();
      updateAdminMetrics();
      alert("टेस्ट डेटा रीसेट कर दिया गया है।");
    }
  };

  /* ==========================================================================
     19. GEMINI API KEY MODAL CONTROLLER
     ========================================================================== */
  window.openAIKeyModal = function () {
    const modal = document.getElementById('modalAIKey');
    const keyInput = document.getElementById('inputGeminiKey');
    if (keyInput) keyInput.value = localStorage.getItem('vetcare_gemini_api_key') || '';
    if (modal) modal.style.display = 'flex';
  };

  window.closeAIKeyModal = function () {
    const modal = document.getElementById('modalAIKey');
    if (modal) modal.style.display = 'none';
  };

  window.saveGeminiKey = function () {
    const keyInput = document.getElementById('inputGeminiKey');
    if (keyInput) {
      const key = keyInput.value.trim();
      if (!key) {
        alert("कृपया वैध Gemini API Key दर्ज करें!");
        return;
      }
      localStorage.setItem('vetcare_gemini_api_key', key);
      window.closeAIKeyModal();
      showToast("✅ Gemini API Key सुरक्षित हो गई!");
    }
  };

  /* ==========================================================================
     20. HELPDESK & TOAST NOTIFICATIONS
     ========================================================================== */
  window.escalateToAdminWhatsApp = function () {
    const waText = `*नमस्ते Vetcare एडमिन!*\nमुझे ऐप उपयोग या प्रीमियम एक्टिवेशन में सहायता की आवश्यकता है। कृपया मार्गदर्शन करें।`;
    const fullPhone = AppConfig.adminWhatsApp.replace(/\D/g, '');
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(waText)}`, '_blank');
  };

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xl backdrop-blur-sm border border-slate-700 animate-bounce transition';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  /* ==========================================================================
     21. BOOTSTRAP EVENT LISTENER
     ========================================================================== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
