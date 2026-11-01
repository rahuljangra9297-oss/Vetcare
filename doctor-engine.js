// Vetcare AI OS - Veterinary Practitioner Clinical Engine (2026 Restored)

/**
 * ============================================================================
 * VETCARE AI OS: VETERINARY PRACTITIONER CLINICAL ENGINE (doctor-engine.js)
 * Master Production Engine for Qualified Veterinary Surgeons & Practitioners
 * Integrates Multi-Organ Symptom Matrix, Shaeffer Weight-Dose Calculator,
 * Comprehensive 30+ Drug Pharmacopeia, Confirmatory Lab Diagnostics, and Gemini AI.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// CRITICAL FIX: SELF-CONTAINED ORGAN DATA (NEVER FREEZE UI FALLBACK)
// ----------------------------------------------------------------------------
window.VETCARE_SYMPTOMS_BY_ORGAN = window.VETCARE_SYMPTOMS_BY_ORGAN || {
  eyes: [
    "सामान्य गुलाबी",
    "रक्त-संकुल लाल (Congested / Scleral Injection)",
    "सफेद/फीका (Severe Pallor / Anemic)",
    "पीलिया पीला (Icteric / Jaundice)",
    "नीला/सियानोटिक (Cyanotic / Hypoxia)",
    "आंखों से अत्यधिक पानी व कॉर्नियल अपारदर्शिता (Opacity/Ulcer)"
  ],
  skin: [
    "सामान्य",
    "गांठदार सूजन (Lumps / LSD Nodules)",
    "खुरदुरी/रूखी व बाल झड़ना (Alopecia / Mange)",
    "चकत्ते/छाले/घाव (Erythema / Pox Lesions)",
    "खुजली व अत्यधिक चिचड़ी/जूँ (Ectoparasites / Ticks)",
    "पुट्ठे या कंधे पर गैस भरी चर्र-चर्र सूजन (Crepitant Swelling)"
  ],
  udder: [
    "सामान्य",
    "गर्म, लाल व दर्दनाक सूजा हुआ (Acute Mastitis)",
    "गांठ/कड़ापन व रेशेदार ऊतक (Chronic Fibrosis)",
    "दूध में खून, छिछड़े या मवाद (Blood / Clots / Pus)",
    "दूध का पानी जैसा मटमैला होना (Watery Secretion)",
    "थन का ठंडा व काला पड़ना (Gangrenous Mastitis)"
  ],
  urine: [
    "सामान्य पारदर्शी/हल्का पीला",
    "लाल/कॉफी जैसा (Hemoglobinuria / Babesiosis / PPH)",
    "गहरा पीला/भूरा (Bilirubinuria / Jaundice)",
    "मटमैला, झागदार व बदबूदार (Pyuria / Cystitis)",
    "रुक-रुक कर दर्द के साथ बूंद-बूंद पेशाब (Stranguria / Urolithiasis)"
  ],
  dung: [
    "सामान्य बंधा हुआ",
    "पतला बदबूदार पानी जैसा दस्त (Profuse Watery Diarrhea)",
    "खूनी आंवयुक्त श्लेष्मा दस्त (Hemorrhagic Enteritis / Coccidiosis)",
    "सूखा, सख्त काला व आंवलिप्त (Constipation / Impaction)",
    "अपचित दाना व खट्टा झागदार गोबर (Rumen Acidosis)",
    "गोबर का पूर्ण बंद होना (Complete Intestinal Obstruction)"
  ],
  temp: [
    "हाइपोथर्मिया (<100°F - Subnormal)",
    "सामान्य (101.0 - 102.5°F)",
    "मध्यम ज्वर (103.0 - 104.5°F)",
    "अति-तीव्र ज्वर (>105.0°F - Hyperpyrexia)"
  ],
  rumen: [
    "सामान्य (2-3 गति प्रति 2 मिनट)",
    "सुस्त जुगाली व मंद गति (Rumen Hypomotility)",
    "पूर्ण बंद व शांत रूमेन (Complete Rumen Atony)",
    "बाएं पेट में ढोलक जैसी झागदार गैस (Frothy / Gaseous Tympany)",
    "रूमेन में कठोर आटा जैसी भरावन (Impaction)"
  ],
  respiration: [
    "सामान्य (15-30 सांस/मिनट)",
    "तेज हाँफना व जीभ बाहर (Tachypnea / Hyperventilation)",
    "घरघराहट, घुर-घुर आवाज़ व बलगमी खांसी (Stertorous Rales)",
    "मुंह खोलकर दर्दनाक सांस व गर्दन फैलाना (Severe Dyspnea)"
  ]
};

// ----------------------------------------------------------------------------
// COMPREHENSIVE CLINICAL DISEASE MASTER DATABASE (22+ PROFILES)
// ----------------------------------------------------------------------------
window.VETCARE_DISEASE_DB = window.VETCARE_DISEASE_DB || [
  {
    id: "HS",
    nameHindi: "गलघोंटू (Hemorrhagic Septicemia - HS)",
    category: "BACTERIAL",
    cardinal: "गले व सब-मैंडिबुलर क्षेत्र में अत्यधिक गर्म, दर्दनाक सूजन व सांस में घुर-घुर घरघराहट",
    tempWeight: "HIGH",
    organMatches: {
      temp: "अति-तीव्र ज्वर (>105.0°F - Hyperpyrexia)",
      respiration: "घरघराहट, घुर-घुर आवाज़ व बलगमी खांसी (Stertorous Rales)",
      eyes: "रक्त-संकुल लाल (Congested / Scleral Injection)",
      rumen: "पूर्ण बंद व शांत रूमेन (Complete Rumen Atony)",
      dung: "सामान्य बंधा हुआ"
    },
    confirmatoryTests: [
      {
        testName: "गंभीर रक्त लेप (Methylene Blue / Leishman Smear)",
        sampleType: "परिधीय रक्त (Ear Vein Blood)",
        approxMrp: 150,
        turnaround: "20-30 मिनट",
        conclusion: "द्वि-ध्रुवीय जीवाणु (Pasteurella multocida Bipolar Organisms)"
      },
      {
        testName: "कल्चर एवं एंटीबायोटिक संवेदनशीलता (ABST)",
        sampleType: "गले का एस्पिरेट या रक्त",
        approxMrp: 650,
        turnaround: "48-72 घंटे",
        conclusion: "विशिष्ट पाश्चुरेला वृद्धि व संवेदनशील एंटीबायोटिक की पुष्टि"
      }
    ],
    recommendedDrugs: ["CEFTIOFUR", "FLUNIXIN", "DEXAMETHASONE", "PHENIRAMINE"]
  },
  {
    id: "BQ",
    nameHindi: "लंगड़ा बुखार / चरचरा (Black Quarter - BQ)",
    category: "BACTERIAL",
    cardinal: "कंधे या पुट्ठे के भारी मांसल भाग में गैस भरी सूजन व दबाने पर क्रिपिटेंट (चर्र-चर्र) ध्वनि",
    tempWeight: "HIGH",
    organMatches: {
      temp: "अति-तीव्र ज्वर (>105.0°F - Hyperpyrexia)",
      skin: "पुट्ठे या कंधे पर गैस भरी चर्र-चर्र सूजन (Crepitant Swelling)",
      rumen: "सुस्त जुगाली व मंद गति (Rumen Hypomotility)",
      eyes: "रक्त-संकुल लाल (Congested / Scleral Injection)"
    },
    confirmatoryTests: [
      {
        testName: "सूजन द्रव ग्राम-स्टेनिंग (Gram Staining of Aspirate)",
        sampleType: "मांसपेशी सूजन का एस्पिरेट",
        approxMrp: 180,
        turnaround: "30 मिनट",
        conclusion: "ग्राम-पॉजिटिव स्पोर-धारी रॉड (Clostridium chauvoei)"
      },
      {
        testName: "फ्लोरोसेंट एंटीबॉडी टेस्ट (FAT)",
        sampleType: "मांसपेशी ऊतक स्मीयर",
        approxMrp: 850,
        turnaround: "24 घंटे",
        conclusion: "क्लॉस्ट्रिडियम प्रतिजनों का विशिष्ट प्रतिदीप्ति परीक्षण"
      }
    ],
    recommendedDrugs: ["PROCAINE_PENICILLIN", "AMOX_SULB", "MELOX_PARA", "B_COMPLEX"]
  },
  {
    id: "FMD",
    nameHindi: "खुरपका-मुंहपका (Foot & Mouth Disease - FMD)",
    category: "VIRAL",
    cardinal: "मुंह, मसूड़ों, जीभ व खुरों के मध्य वेसिकल (छाले), अत्यधिक तारदार चिपचिपी लार व लंगड़ापन",
    tempWeight: "HIGH",
    organMatches: {
      temp: "अति-तीव्र ज्वर (>105.0°F - Hyperpyrexia)",
      eyes: "आंखों से अत्यधिक पानी व कॉर्नियल अपारदर्शिता (Opacity/Ulcer)",
      respiration: "तेज हाँफना व जीभ बाहर (Tachypnea / Hyperventilation)",
      skin: "चकत्ते/छाले/घाव (Erythema / Pox Lesions)"
    },
    confirmatoryTests: [
      {
        testName: "FMDV एंटीजन डिटेक्शन ELISA (Ag-ELISA)",
        sampleType: "छालों का छिलका या तरल (Vesicular Epithelium)",
        approxMrp: 950,
        turnaround: "12-24 घंटे",
        conclusion: "FMD वायरस सीरोटाइप (O, A, Asia-1) की सटीक पुष्टि"
      },
      {
        testName: "रिवर्स ट्रांसक्रिप्टेज़ PCR (RT-PCR)",
        sampleType: "मुंह की लार या लिम्फ द्रव",
        approxMrp: 1500,
        turnaround: "24-48 घंटे",
        conclusion: "वायरल आरएनए जीनोम की संवेदनशील आणविक पहचान"
      }
    ],
    recommendedDrugs: ["CEFTRIAXONE_SULB", "MELOX_PARA", "PHENIRAMINE", "IVERMECTIN"]
  },
  {
    id: "MASTITIS_ACUTE",
    nameHindi: "तीव्र थनैल (Acute Clinical Mastitis)",
    category: "BACTERIAL",
    cardinal: "अयन में तीव्र गर्माहट, कड़ापन, दूध का रंग बदलना (पीला, खूनी, छिछड़ेयुक्त) व छूने पर असहनीय दर्द",
    tempWeight: "MODERATE",
    organMatches: {
      temp: "मध्यम ज्वर (103.0 - 104.5°F)",
      udder: "दूध में खून, छिछड़े या मवाद (Blood / Clots / Pus)",
      eyes: "सामान्य गुलाबी",
      rumen: "सुस्त जुगाली व मंद गति (Rumen Hypomotility)"
    },
    confirmatoryTests: [
      {
        testName: "कैलिफोर्निया मैस्टाइटिस टेस्ट (CMT Reagent Gel Test)",
        sampleType: "प्रत्येक थन का दूध (Quarter Milk)",
        approxMrp: 100,
        turnaround: "2 मिनट (ऑन-स्पॉट)",
        conclusion: "सोमैटिक सेल काउंट >5 लाख/मिली पर गाढ़े जेल का निर्माण"
      },
      {
        testName: "दूध संवर्धन एवं संवेदनशीलता (Milk Culture & ABST)",
        sampleType: "असेप्टिक दूध नमूना",
        approxMrp: 500,
        turnaround: "48 घंटे",
        conclusion: "जीवाणु प्रजाति (Staph/Strep/E. coli) एवं उपयुक्त एंटीबायोटिक निर्धारण"
      }
    ],
    recommendedDrugs: ["CEFTIOFUR", "INTRAMAMMARY_TUBE", "MELOX_PARA", "ISOFLUPREDONE"]
  },
  {
    id: "MILK_FEVER",
    nameHindi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever)",
    category: "METABOLIC",
    cardinal: "ब्याने के 24-72 घंटे बाद गर्दन मोड़कर बैठना (Sternal Recumbency), ठंडे कान व उप-सामान्य तापमान",
    tempWeight: "SUB",
    organMatches: {
      temp: "हाइपोथर्मिया (<100°F - Subnormal)",
      eyes: "सफेद/फीका (Severe Pallor / Anemic)",
      rumen: "पूर्ण बंद व शांत रूमेन (Complete Rumen Atony)",
      dung: "सूखा, सख्त काला व आंवलिप्त (Constipation / Impaction)",
      respiration: "सामान्य (15-30 सांस/मिनट)"
    },
    confirmatoryTests: [
      {
        testName: "सीरम कुल कैल्शियम स्तर (Serum Total Calcium)",
        sampleType: "रक्त सीरम (Clot Activator Tube)",
        approxMrp: 250,
        turnaround: "2-4 घंटे",
        conclusion: "सीरम कैल्शियम स्तर <5.0 mg/dL (गंभीर हाइपोकैल्सीमिया)"
      },
      {
        testName: "सीरम मैग्नीशियम व फास्फोरस प्रोफाइल",
        sampleType: "रक्त सीरम",
        approxMrp: 400,
        turnaround: "4 घंटे",
        conclusion: "सहवर्ती हाइपोफॉस्फेटेमिया या हाइपोमैग्नेसीमिया की जांच"
      }
    ],
    recommendedDrugs: ["CALCIUM_BOROGLUCONATE", "TOLDIMPHOS", "B_COMPLEX"]
  },
  {
    id: "KETOSIS",
    nameHindi: "कीटोसिस / एसीटोनेमिया (Ketosis / Acetonemia)",
    category: "METABOLIC",
    cardinal: "सांस व दूध से मीठी एसीटोन गंध, दाना छोड़कर केवल सूखा भूसा खाना, अचानक तीव्र दूध गिरावट",
    tempWeight: "NORMAL",
    organMatches: {
      temp: "सामान्य (101.0 - 102.5°F)",
      eyes: "सामान्य गुलाबी",
      rumen: "सुस्त जुगाली व मंद गति (Rumen Hypomotility)",
      dung: "सूखा, सख्त काला व आंवलिप्त (Constipation / Impaction)"
    },
    confirmatoryTests: [
      {
        testName: "मूत्र कीटोन डिपस्टिक टेस्ट (Rothera's Nitroprusside Test)",
        sampleType: "ताजा मूत्र (Fresh Urine)",
        approxMrp: 80,
        turnaround: "1 मिनट (ऑन-स्पॉट)",
        conclusion: "एसिटोएसीटेट की उपस्थिति पर गहरा बैंगनी रंग (+3 से +4)"
      },
      {
        testName: "रक्त बीटा-हाइड्रॉक्सीब्यूटायरेट (Blood BHB Strip Test)",
        sampleType: "होल कैपिलरी रक्त",
        approxMrp: 200,
        turnaround: "30 सेकंड",
        conclusion: "रक्त BHB >1.4 mmol/L (सबक्लिनिकल), >3.0 mmol/L (क्लिनिकल)"
      }
    ],
    recommendedDrugs: ["DEXTROSE_25", "ISOFLUPREDONE", "B_COMPLEX"]
  },
  {
    id: "THEILERIOSIS",
    nameHindi: "थायलेरियासिस (Bovine Theileriosis / Tick Fever)",
    category: "PROTOZOAL",
    cardinal: "कंधे व जांघ की प्री-स्कैपुलर लिम्फ नोड में अत्यधिक कठोर सूजन, 105°F+ ज्वर व गंभीर रक्ताल्पता",
    tempWeight: "HIGH",
    organMatches: {
      temp: "अति-तीव्र ज्वर (>105.0°F - Hyperpyrexia)",
      eyes: "सफेद/फीका (Severe Pallor / Anemic)",
      skin: "खुजली व अत्यधिक चिचड़ी/जूँ (Ectoparasites / Ticks)",
      respiration: "तेज हाँफना व जीभ बाहर (Tachypnea / Hyperventilation)"
    },
    confirmatoryTests: [
      {
        testName: "लिम्फ नोड बायोप्सी स्मीयर (Lymph Node Aspirate Giemsa)",
        sampleType: "प्री-स्कैपुलर नोड एस्पिरेट",
        approxMrp: 200,
        turnaround: "45 मिनट",
        conclusion: "लिम्फोसाइट्स के भीतर कॉख्स ब्लू बॉडीज (Koch's Blue Bodies) की उपस्थिति"
      },
      {
        testName: "रक्त स्मीयर गीम्सा स्टेन (Thin Blood Smear)",
        sampleType: "कान की नस का रक्त",
        approxMrp: 150,
        turnaround: "30 मिनट",
        conclusion: "आरबीसी में छल्ला/रॉड आकार के थायलेरिया पिरोप्लाज्म"
      }
    ],
    recommendedDrugs: ["BUPARVAQUONE", "OXYTETRACYCLINE_LA", "MELOX_PARA", "TOLDIMPHOS"]
  },
  {
    id: "BABESIOSIS",
    nameHindi: "बबेशियोसिस / लाल पेशाब (Babesiosis / Red Water)",
    category: "PROTOZOAL",
    cardinal: "तेज बुखार के साथ गहरे लाल या कॉफी रंग का पेशाब (हीमोग्लोबिनुरिया), गंभीर पीलिया व निर्जलीकरण",
    tempWeight: "HIGH",
    organMatches: {
      temp: "अति-तीव्र ज्वर (>105.0°F - Hyperpyrexia)",
      urine: "लाल/कॉफी जैसा (Hemoglobinuria / Babesiosis / PPH)",
      eyes: "पीलिया पीला (Icteric / Jaundice)",
      respiration: "तेज हाँफना व जीभ बाहर (Tachypnea / Hyperventilation)"
    },
    confirmatoryTests: [
      {
        testName: "रक्त स्मीयर गीम्सा स्टेनिंग (Giemsa Stained Blood Smear)",
        sampleType: "परिधीय रक्त (Ear Vein Blood)",
        approxMrp: 150,
        turnaround: "30 मिनट",
        conclusion: "आरबीसी में नाशपाती के आकार के युग्मित बबेशिया जीवाणु (Babesia bigemina)"
      },
      {
        testName: "मूत्र सेंट्रीफ्यूजेशन परीक्षण (Hemoglobinuria vs Hematuria)",
        sampleType: "ताजा मूत्र",
        approxMrp: 60,
        turnaround: "10 मिनट",
        conclusion: "सेंट्रीफ्यूज के बाद भी लाल सुपरनेटेंट (सच्चा हीमोग्लोबिनुरिया)"
      }
    ],
    recommendedDrugs: ["DIMINAZENE", "MELOX_PARA", "DEXTROSE_25", "B_COMPLEX"]
  },
  {
    id: "ANAPLASMOSIS",
    nameHindi: "एनाप्लास्मोसिस / पित्त ज्वर (Anaplasmosis / Gall Sickness)",
    category: "PROTOZOAL",
    cardinal: "अत्यधिक तेज पीलिया, सफेद/पीली श्लेष्मा झिल्ली, तेज ज्वर परंतु बिना लाल पेशाब के",
    tempWeight: "HIGH",
    organMatches: {
      temp: "अति-तीव्र ज्वर (>105.0°F - Hyperpyrexia)",
      eyes: "पीलिया पीला (Icteric / Jaundice)",
      urine: "गहरा पीला/भूरा (Bilirubinuria / Jaundice)",
      dung: "सूखा, सख्त काला व आंवलिप्त (Constipation / Impaction)"
    },
    confirmatoryTests: [
      {
        testName: "गीम्सा ब्लड स्मीयर (Thin Blood Smear)",
        sampleType: "परिधीय रक्त",
        approxMrp: 150,
        turnaround: "30 मिनट",
        conclusion: "आरबीसी की परिधि पर गहरे रंग के एनाप्लाज्मा मार्जिनेल बिंदु"
      },
      {
        testName: "सीरम बिलीरुबिन एवं लिवर प्रोफाइल",
        sampleType: "रक्त सीरम",
        approxMrp: 450,
        turnaround: "4 घंटे",
        conclusion: "अप्रत्यक्ष (Unconjugated) बिलीरुबिन में अत्यधिक वृद्धि"
      }
    ],
    recommendedDrugs: ["OXYTETRACYCLINE_LA", "MELOX_PARA", "B_COMPLEX", "TOLDIMPHOS"]
  },
  {
    id: "BLOAT_TYMPANY",
    nameHindi: "अफारा / तीव्र टिम्पनी (Frothy / Gaseous Bloat)",
    category: "METABOLIC",
    cardinal: "बायाँ पेट (Left Paralumbar Fossa) ढोलक की तरह फूलना, सांस लेने में अत्यंत कष्ट, जीभ बाहर लटकना",
    tempWeight: "NORMAL",
    organMatches: {
      temp: "सामान्य (101.0 - 102.5°F)",
      rumen: "बाएं पेट में ढोलक जैसी झागदार गैस (Frothy / Gaseous Tympany)",
      respiration: "मुंह खोलकर दर्दनाक सांस व गर्दन फैलाना (Severe Dyspnea)",
      eyes: "रक्त-संकुल लाल (Congested / Scleral Injection)"
    },
    confirmatoryTests: [
      {
        testName: "रूमेन नलिका परीक्षण (Stomach Tube / Trocar Gas Release)",
        sampleType: "रूमेन द्रव / गैस",
        approxMrp: 100,
        turnaround: "तात्कालिक क्लिनिकल",
        conclusion: "मुक्त गैस का दबाव अथवा झागदार बुलबुलेदार रूमेन द्रव निष्कासन"
      },
      {
        testName: "रूमेन द्रव pH परीक्षण (pH Litmus Strip)",
        sampleType: "रूमेन द्रव",
        approxMrp: 50,
        turnaround: "2 मिनट",
        conclusion: "pH 6.5 - 7.5 (सामान्य से क्षारीय) झागदार चारा अफारा में"
      }
    ],
    recommendedDrugs: ["DICYCLOMINE", "RUMEN_TORIC", "B_COMPLEX"]
  },
  {
    id: "RUMEN_ACIDOSIS",
    nameHindi: "अम्लीय अपच / दाना विषैलापन (Grain Overload / Acidosis)",
    category: "METABOLIC",
    cardinal: "अत्यधिक आटा/गेहूं/चावल खाने के बाद सुस्ती, खट्टा बदबूदार झागदार दस्त, लड़खड़ाहट, रूमेन का पानी जैसा भरना",
    tempWeight: "SUB",
    organMatches: {
      temp: "हाइपोथर्मिया (<100°F - Subnormal)",
      dung: "अपचित दाना व खट्टा झागदार गोबर (Rumen Acidosis)",
      rumen: "पूर्ण बंद व शांत रूमेन (Complete Rumen Atony)",
      eyes: "सफेद/फीका (Severe Pallor / Anemic)"
    },
    confirmatoryTests: [
      {
        testName: "रूमेन द्रव pH मापन (Rumen Fluid pH Measurement)",
        sampleType: "रूमेन एस्पिरेट (Rumenocentesis/Tube)",
        approxMrp: 100,
        turnaround: "5 मिनट",
        conclusion: "रूमेन pH <5.0 (गंभीर लैक्टिक एसिडोसिस व प्रोटोजोआ की मृत्यु)"
      },
      {
        testName: "रक्त गैस एवं इलेक्ट्रोलाइट (Blood Gas Analysis)",
        sampleType: "धमनी/शिरा रक्त",
        approxMrp: 800,
        turnaround: "1 घंटा",
        conclusion: "सिस्टमिक मेटाबॉलिक एसिडोसिस एवं बेस डेफिसिट"
      }
    ],
    recommendedDrugs: ["DEXTROSE_25", "B_COMPLEX", "RUMEN_TORIC", "PHENIRAMINE"]
  },
  {
    id: "ANTHRAX",
    nameHindi: "एंथ्रेक्स / गिल्टी रोग (Anthrax / Splenic Fever)",
    category: "BACTERIAL",
    cardinal: "अचानक बिना लक्षण मृत्यु, प्राकृतिक छिद्रों (नाक, गुदा, योनि) से बिना जमा हुआ काला कोलतार जैसा रक्त बहना",
    tempWeight: "HIGH",
    organMatches: {
      temp: "अति-तीव्र ज्वर (>105.0°F - Hyperpyrexia)",
      dung: "खूनी आंवयुक्त श्लेष्मा दस्त (Hemorrhagic Enteritis / Coccidiosis)",
      respiration: "मुंह खोलकर दर्दनाक सांस व गर्दन फैलाना (Severe Dyspnea)"
    },
    confirmatoryTests: [
      {
        testName: "पॉलीक्रोम मिथाइलीन ब्लू स्मीयर (McFadyean's Capsule Stain)",
        sampleType: "परिधीय रक्त स्मीयर (शव चीरना पूर्णतः वर्जित)",
        approxMrp: 200,
        turnaround: "20 मिनट",
        conclusion: "गुलाबी कैप्सूल से घिरे चौकोर छोर वाले बैसिलस (Bacillus anthracis)"
      },
      {
        testName: "एंथ्रेक्स एंटीजन रैपिड टेस्ट (Ascoli's Thermoprecipitin Test)",
        sampleType: "त्वचा/रक्त ऊतक सत्त",
        approxMrp: 700,
        turnaround: "1 घंटा",
        conclusion: "बैसिलस एंथ्रेसिस ऊतक प्रतिजन की पुष्टि"
      }
    ],
    recommendedDrugs: ["PROCAINE_PENICILLIN", "OXYTETRACYCLINE_LA", "FLUNIXIN"]
  },
  {
    id: "SURRA",
    nameHindi: "सर्रा / तीवरसा (Surra / Trypanosomiasis)",
    category: "PROTOZOAL",
    cardinal: "दीवार से सिर टिकाना, गोल चक्कर काटना (Circling), रुक-रुक कर चढ़ने-उतरने वाला ज्वर, गंभीर रक्ताल्पता",
    tempWeight: "HIGH",
    organMatches: {
      temp: "मध्यम ज्वर (103.0 - 104.5°F)",
      eyes: "सफेद/फीका (Severe Pallor / Anemic)",
      respiration: "तेज हाँफना व जीभ बाहर (Tachypnea / Hyperventilation)"
    },
    confirmatoryTests: [
      {
        testName: "ताजा गीला रक्त परीक्षण (Wet Blood Smear Motility)",
        sampleType: "ताजा परिधीय रक्त की बूंद",
        approxMrp: 100,
        turnaround: "10 मिनट",
        conclusion: "माइक्रोस्कोप के तहत तीव्र गतिमान ट्रिपैनोसोमा इवान्साई (Trypanosoma evansi)"
      },
      {
        testName: "कार्ड एग्ग्लूटिनेशन टेस्ट (CATT/T. evansi)",
        sampleType: "रक्त सीरम",
        approxMrp: 500,
        turnaround: "15 मिनट",
        conclusion: "विशिष्ट ट्रिपैनोसोम एंटीबॉडी का संपुंजन"
      }
    ],
    recommendedDrugs: ["DIMINAZENE", "B_COMPLEX", "TOLDIMPHOS"]
  },
  {
    id: "LSD",
    nameHindi: "लम्पी स्किन डिजीज (Lumpy Skin Disease - LSD)",
    category: "VIRAL",
    cardinal: "त्वचा पर 2-5 सेमी की उभरी हुई कठोर गांठें, पैरों में भारी पानी जैसी सूजन, लिम्फ नोड में सूजन व तेज बुखार",
    tempWeight: "HIGH",
    organMatches: {
      temp: "अति-तीव्र ज्वर (>105.0°F - Hyperpyrexia)",
      skin: "गांठदार सूजन (Lumps / LSD Nodules)",
      eyes: "आंखों से अत्यधिक पानी व कॉर्नियल अपारदर्शिता (Opacity/Ulcer)"
    },
    confirmatoryTests: [
      {
        testName: "कैपरीपॉक्स रियल-टाइम PCR (Capripoxvirus qPCR)",
        sampleType: "त्वचा गांठ की पपड़ी या बायोप्सी",
        approxMrp: 1600,
        turnaround: "24-48 घंटे",
        conclusion: "LSDV वायरल DNA की आणविक पुष्टि"
      },
      {
        testName: "एंटीबॉडी डिटेक्शन ELISA",
        sampleType: "रक्त सीरम",
        approxMrp: 850,
        turnaround: "24 घंटे",
        conclusion: "कैपरीपॉक्स विशिष्ट इम्युनोग्लोबुलिन की पहचान"
      }
    ],
    recommendedDrugs: ["CEFTRIAXONE_SULB", "MELOX_PARA", "PHENIRAMINE", "IVERMECTIN"]
  },
  {
    id: "PNEUMONIA_BRD",
    nameHindi: "बोवाइन न्यूमोनिया / श्वसन रोग (Pneumonia / BRD)",
    category: "BACTERIAL",
    cardinal: "छाती में तीव्र घरघराहट, सूखी व दर्दनाक बलगमी खांसी, नाक से पीला मवाद रिसना व पसलियों से तेज सांस",
    tempWeight: "HIGH",
    organMatches: {
      temp: "मध्यम ज्वर (103.0 - 104.5°F)",
      respiration: "घरघराहट, घुर-घुर आवाज़ व बलगमी खांसी (Stertorous Rales)",
      eyes: "आंखों से अत्यधिक पानी व कॉर्नियल अपारदर्शिता (Opacity/Ulcer)",
      rumen: "सुस्त जुगाली व मंद गति (Rumen Hypomotility)"
    },
    confirmatoryTests: [
      {
        testName: "नासा स्त्राव संवर्धन एवं ABST (Nasal Swab Culture)",
        sampleType: "गहरा नासा स्त्राव (Deep Nasal Swab)",
        approxMrp: 550,
        turnaround: "48 घंटे",
        conclusion: "Mannheimia haemolytica / Pasteurella spp. का पृथक्करण"
      },
      {
        testName: "छाती अल्ट्रासोनोग्राफी (Thoracic Ultrasound)",
        sampleType: "फुफ्फुस सतह इमेजिंग",
        approxMrp: 700,
        turnaround: "15 मिनट",
        conclusion: "फेफड़ों में कॉन्सोलिडेशन, प्लुरल इफ्यूजन व 'B-lines' की उपस्थिति"
      }
    ],
    recommendedDrugs: ["ENROFLOXACIN", "FLUNIXIN", "PHENIRAMINE", "B_COMPLEX"]
  },
  {
    id: "PPH",
    nameHindi: "ब्याने के बाद लाल पेशाब (Post-Parturient Hemoglobinuria - PPH)",
    category: "METABOLIC",
    cardinal: "ब्याने के 2 से 4 सप्ताह बाद बिना बुखार के कॉफी/गहरे लाल रंग का पेशाब, गंभीर रक्ताल्पता व सुस्ती",
    tempWeight: "NORMAL",
    organMatches: {
      temp: "सामान्य (101.0 - 102.5°F)",
      urine: "लाल/कॉफी जैसा (Hemoglobinuria / Babesiosis / PPH)",
      eyes: "सफेद/फीका (Severe Pallor / Anemic)",
      rumen: "सुस्त जुगाली व मंद गति (Rumen Hypomotility)"
    },
    confirmatoryTests: [
      {
        testName: "सीरम अकार्बनिक फास्फोरस (Serum Inorganic Phosphorus)",
        sampleType: "रक्त सीरम",
        approxMrp: 220,
        turnaround: "2 घंटे",
        conclusion: "सीरम फास्फोरस <1.5 mg/dL (गंभीर हाइपोफॉस्फेटेमिया)"
      },
      {
        testName: "रक्त स्मीयर हीमोग्लोबिन परीक्षण",
        sampleType: "होल ब्लड",
        approxMrp: 120,
        turnaround: "20 मिनट",
        conclusion: "हीमोग्लोबिन <5 g/dL व हीनज़ बॉडीज (Heinz Bodies) की उपस्थिति"
      }
    ],
    recommendedDrugs: ["SODIUM_ACID_PHOSPHATE", "TOLDIMPHOS", "B_COMPLEX"]
  },
  {
    id: "PPR",
    nameHindi: "पीपीआर / बकरी प्लेग (Peste des Petits Ruminants - PPR)",
    category: "VIRAL",
    cardinal: "मुंह व मसूड़ों में छालों से बदबू, अत्यधिक पानी जैसे बदबूदार दस्त, निमोनिया व आंखों-नाक से गाढ़ा मवाद",
    tempWeight: "HIGH",
    organMatches: {
      temp: "अति-तीव्र ज्वर (>105.0°F - Hyperpyrexia)",
      dung: "पतला बदबूदार पानी जैसा दस्त (Profuse Watery Diarrhea)",
      eyes: "आंखों से अत्यधिक पानी व कॉर्नियल अपारदर्शिता (Opacity/Ulcer)",
      respiration: "घरघराहट, घुर-घुर आवाज़ व बलगमी खांसी (Stertorous Rales)"
    },
    confirmatoryTests: [
      {
        testName: "PPRV रैपिड एंटीजन डिटेक्शन किट (Immunochromatography)",
        sampleType: "नेत्र/नासा स्त्राव अथवा मल",
        approxMrp: 400,
        turnaround: "15 मिनट",
        conclusion: "मॉर्बिलीवायरस विशिष्ट न्यूक्लियोप्रोटीन की पहचान"
      },
      {
        testName: "प्रतिस्पर्धी ELISA (c-ELISA)",
        sampleType: "रक्त सीरम",
        approxMrp: 900,
        turnaround: "24 घंटे",
        conclusion: "PPR विशिष्ट एंटीबॉडी स्तर की पुष्टि"
      }
    ],
    recommendedDrugs: ["ENROFLOXACIN", "MELOX_PARA", "PHENIRAMINE", "DEXTROSE_25"]
  },
  {
    id: "ENTEROTOXEMIA",
    nameHindi: "फिड़किया / आंत विषैलापन (Enterotoxemia / Pulpy Kidney)",
    category: "BACTERIAL",
    cardinal: "हरा दाना खाने के बाद अचानक चक्कर, सिर को पीछे की ओर खींचना (Opisthotonos), झागदार मुंह व तीव्र मृत्यु",
    tempWeight: "NORMAL",
    organMatches: {
      temp: "सामान्य (101.0 - 102.5°F)",
      respiration: "तेज हाँफना व जीभ बाहर (Tachypnea / Hyperventilation)",
      dung: "पतला बदबूदार पानी जैसा दस्त (Profuse Watery Diarrhea)"
    },
    confirmatoryTests: [
      {
        testName: "आंत सामग्री क्लॉस्ट्रिडियल टॉक्सिन ELISA",
        sampleType: "इलियम सामग्री (Ileal Contents)",
        approxMrp: 1100,
        turnaround: "24 घंटे",
        conclusion: "Clostridium perfringens Type D इप्सिलॉन टॉक्सिन की पुष्टि"
      },
      {
        testName: "मूत्र ग्लाइकोसुरिया परीक्षण (Urine Glucose Dipstick)",
        sampleType: "मूत्र नमूना",
        approxMrp: 60,
        turnaround: "1 मिनट",
        conclusion: "अत्यधिक ग्लूकोज निष्कासन (>2%), फिड़किया का पुख्ता संकेतक"
      }
    ],
    recommendedDrugs: ["PROCAINE_PENICILLIN", "DICYCLOMINE", "B_COMPLEX"]
  },
  {
    id: "COLIC_IMPACTION",
    nameHindi: "पेट दर्द / रूमेन-आंत संकुलन (Spasmodic / Impaction Colic)",
    category: "METABOLIC",
    cardinal: "बार-बार पेट की ओर देखना, पिछले पैरों से पेट पर लात मारना, जमीन पर लोटना, गोबर का पूर्ण बंद होना",
    tempWeight: "NORMAL",
    organMatches: {
      temp: "सामान्य (101.0 - 102.5°F)",
      dung: "गोबर का पूर्ण बंद होना (Complete Intestinal Obstruction)",
      rumen: "रूमेन में कठोर आटा जैसी भरावन (Impaction)",
      eyes: "रक्त-संकुल लाल (Congested / Scleral Injection)"
    },
    confirmatoryTests: [
      {
        testName: "गुदा परीक्षण (Per-Rectal Clinical Examination)",
        sampleType: "मैनुअल क्लिनिकल जांच",
        approxMrp: 0,
        turnaround: "तात्कालिक",
        conclusion: "कठोर संकुलित गोबर की गांठें, सीकम या आंतों का असामान्य फैलाव"
      },
      {
        testName: "उदर पेरिटोनियल द्रव विश्लेषण (Abdominocentesis)",
        sampleType: "पेरिटोनियल द्रव",
        approxMrp: 350,
        turnaround: "1 घंटा",
        conclusion: "प्रोटीन एवं न्यूट्रोफिल वृद्धि (आंतों की इस्केमिया/स्ट्रैंगुलेशन)"
      }
    ],
    recommendedDrugs: ["DICYCLOMINE", "FLUNIXIN", "B_COMPLEX"]
  },
  {
    id: "RETENTION_PLACENTA",
    nameHindi: "जेर का रुकना (Retention of Fetal Membranes - ROP)",
    category: "METABOLIC",
    cardinal: "प्रसव के 8 से 12 घंटे बाद भी योनि से बदबूदार सड़ी हुई जेर का लटकते रहना व सुस्ती",
    tempWeight: "NORMAL",
    organMatches: {
      temp: "सामान्य (101.0 - 102.5°F)",
      udder: "सामान्य",
      dung: "सामान्य बंधा हुआ"
    },
    confirmatoryTests: [
      {
        testName: "योनि एवं गर्भाशय प्रत्यक्ष परीक्षण (Vaginoscopy)",
        sampleType: "क्लिनिकल स्पेकुलम जांच",
        approxMrp: 0,
        turnaround: "तात्कालिक",
        conclusion: "गर्भाशय ग्रीवा में फंसी हुई प्लेसेंटल कॉटिलिडन्स की पुष्टि"
      },
      {
        testName: "गर्भाशय स्त्राव साइटोलॉजी",
        sampleType: "गर्भाशय लोचिया स्त्राव",
        approxMrp: 250,
        turnaround: "2 घंटे",
        conclusion: "डिजनरेटिव न्यूट्रोफिल्स एवं पुट्रीफेक्टिव जीवाणुओं का प्रसार"
      }
    ],
    recommendedDrugs: ["CLOPROSTENOL", "OXYTOCIN", "CEFTIOFUR", "MELOX_PARA"]
  },
  {
    id: "UTERINE_PROLAPSE",
    nameHindi: "गर्भाशय प्रोलैप्स / फूल दिखाना (Uterine / Vaginal Prolapse)",
    category: "METABOLIC",
    cardinal: "ब्याने के तुरंत बाद गर्भाशय का लाल मांसल भाग (कॉटिलिडन्स सहित) पूरा शरीर के बाहर निकल आना",
    tempWeight: "NORMAL",
    organMatches: {
      temp: "सामान्य (101.0 - 102.5°F)",
      eyes: "सफेद/फीका (Severe Pallor / Anemic)",
      rumen: "सुस्त जुगाली व मंद गति (Rumen Hypomotility)"
    },
    confirmatoryTests: [
      {
        testName: "दृश्य क्लिनिकल संरचनात्मक मूल्यांकन",
        sampleType: "बाहरी अंग का प्रत्यक्ष परीक्षण",
        approxMrp: 0,
        turnaround: "तात्कालिक",
        conclusion: "गर्भाशय के विशिष्ट मशरूम आकार के कॉटिलिडन्स की दृश्य पहचान"
      },
      {
        testName: "रक्त हीमेटोक्रिट (PCV) एवं सीरम कैल्शियम",
        sampleType: "होल ब्लड एवं सीरम",
        approxMrp: 300,
        turnaround: "1 घंटा",
        conclusion: "हाइपोकैल्सीमिया स्तर एवं आंतरिक रक्तस्राव की स्थिति का आकलन"
      }
    ],
    recommendedDrugs: ["CALCIUM_BOROGLUCONATE", "DICYCLOMINE", "CEFTRIAXONE_SULB"]
  },
  {
    id: "FOOT_ROT",
    nameHindi: "खुर सड़न / इन्फेक्शियस पोडोडर्मेटाइटिस (Foot Rot)",
    category: "BACTERIAL",
    cardinal: "खुरों के मध्य अत्यंत सड़ांधयुक्त दुर्गंध, गहरे नेक्रोटिक घाव, मवाद व एक पैर उठाकर लंगड़ाना",
    tempWeight: "NORMAL",
    organMatches: {
      temp: "सामान्य (101.0 - 102.5°F)",
      skin: "चकत्ते/छाले/घाव (Erythema / Pox Lesions)"
    },
    confirmatoryTests: [
      {
        testName: "खुर नेक्रोटिक मवाद स्मीयर ग्राम-स्टेन",
        sampleType: "खुर के बीच की मवाद",
        approxMrp: 150,
        turnaround: "25 मिनट",
        conclusion: "Fusobacterium necrophorum एवं Dichelobacter nodosus की पहचान"
      },
      {
        testName: "एनारोबिक बैक्टीरियल कल्चर",
        sampleType: "घाव एस्पिरेट",
        approxMrp: 600,
        turnaround: "72 घंटे",
        conclusion: "एनारोबिक संवर्धन द्वारा विशिष्ट रोगजनक पुष्टि"
      }
    ],
    recommendedDrugs: ["OXYTETRACYCLINE_LA", "MELOX_PARA", "IVERMECTIN"]
  }
];

// ----------------------------------------------------------------------------
// ADVANCED VETERINARY DRUGS PHARMACOPEIA (30+ CURATED FORMULATIONS)
// ----------------------------------------------------------------------------
window.VETCARE_PHARMACOPEIA = window.VETCARE_PHARMACOPEIA || [
  {
    code: "CEFTIOFUR",
    genericName: "Ceftiofur Sodium Sterile Powder",
    ethicalBrand: "Inj. Xyrofur 1g / Excenel Sterile Powder",
    category: "Antibiotics",
    type: "BOTH",
    doseRateMgPerKg: 1.5,
    concentrationMgPerMl: 50, // Reconstituted 1g in 20ml
    defaultRoute: "I/M",
    frequency: "दिन में एक बार (SID) 3-5 दिन",
    indications: "गलघोंटू (HS), तीव्र थनैल (Mastitis), ब्रोंकोन्यूमोनिया, मेट्राइटिस",
    withdrawalPeriod: "दूध: 0 दिन (शून्य विथड्रॉल), मांस: 4 दिन",
    pregnancySafe: "पूर्णतः सुरक्षित (Pregnancy Safe)",
    contraindications: "सेफालोस्पोरिन के प्रति अतिसंवेदनशीलता में न दें",
    approxMrp: 480
  },
  {
    code: "CEFTRIAXONE_SULB",
    genericName: "Ceftriaxone Sodium + Sulbactam Sodium (2:1)",
    ethicalBrand: "Inj. Intacef Tazo 3375mg / 4.5g (Intas)",
    category: "Antibiotics",
    type: "BOTH",
    doseRateMgPerKg: 10,
    concentrationMgPerMl: 150, // 3375mg dissolved in 20ml approx
    defaultRoute: "I/M or Slow I/V",
    frequency: "प्रत्येक 24 घंटे में, 3 दिन",
    indications: "गंभीर सेप्टीसीमिया, गैंग्रीनस थनैल, एफएमडी सेकेंडरी इन्फेक्शन, पेरिटोनाइटिस",
    withdrawalPeriod: "दूध: 7 दिन, मांस: 28 दिन",
    pregnancySafe: "सुरक्षित (Safe in all trimesters)",
    contraindications: "गंभीर रीनल फेल्योर में डोज़ घटाएं",
    approxMrp: 385
  },
  {
    code: "ENROFLOXACIN",
    genericName: "Enrofloxacin Injection 10% w/v",
    ethicalBrand: "Inj. Fortivir 100mg/ml / Baytril (Bayer)",
    category: "Antibiotics",
    type: "BOTH",
    doseRateMgPerKg: 5.0,
    concentrationMgPerMl: 100,
    defaultRoute: "Deep I/M or Slow I/V",
    frequency: "24 घंटे में एक बार, 3-5 दिन",
    indications: "कोलीबैसिलोसिस, ब्रोंकोन्यूमोनिया, माइकोप्लाज्मोसिस, दस्त, पीपीआर",
    withdrawalPeriod: "दूध: 4 दिन, मांस: 14 दिन",
    pregnancySafe: "सावधानी (गर्भावस्था की पहली तिमाही में बचें)",
    contraindications: "घोड़ों व नवजात पिल्लों में कार्टिलेज क्षति का खतरा",
    approxMrp: 185
  },
  {
    code: "AMOX_SULB",
    genericName: "Amoxicillin + Sulbactam for Injection",
    ethicalBrand: "Inj. Amoxirum Forte 4.5g (Virbac)",
    category: "Antibiotics",
    type: "BOTH",
    doseRateMgPerKg: 8.0,
    concentrationMgPerMl: 225, // 4.5g reconstituted in 20ml
    defaultRoute: "I/M or Slow I/V",
    frequency: "24 घंटे में एक बार, 3 दिन",
    indications: "लंगड़ा बुखार (BQ), मेट्राइटिस, निमोनिया, घाव व नरम ऊतक संक्रमण",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 14 दिन",
    pregnancySafe: "सुरक्षित (Pregnancy Safe)",
    contraindications: "पेनिसिलिन एलर्जी का इतिहास",
    approxMrp: 340
  },
  {
    code: "OXYTETRACYCLINE_LA",
    genericName: "Oxytetracycline Long Acting 200 mg/ml",
    ethicalBrand: "Inj. Terramycin LA (Zoetis) / Oxysteclin LA",
    category: "Antibiotics",
    type: "BOTH",
    doseRateMgPerKg: 20.0,
    concentrationMgPerMl: 200,
    defaultRoute: "Deep I/M (प्रति स्थान अधिकतम 15-20ml)",
    frequency: "एकल खुराक (72 घंटे तक प्रभावी)",
    indications: "एनाप्लास्मोसिस, खुर सड़न, थाइलेरियासिस सहायक, क्लैमाइडियोसिस",
    withdrawalPeriod: "दूध: 7 दिन, मांस: 21 दिन",
    pregnancySafe: "अंतिम तिमाही में हड्डियों व दांतों पर प्रभाव की संभावना",
    contraindications: "गंभीर यकृत व गुर्दे की खराबी",
    approxMrp: 210
  },
  {
    code: "PROCAINE_PENICILLIN",
    genericName: "Procaine Penicillin G + Penicillin G Sodium",
    ethicalBrand: "Inj. Dicrysticin-S 2.5g / Munomycin Forte (Zydus)",
    category: "Antibiotics",
    type: "BOTH",
    doseRateMgPerKg: 10.0,
    concentrationMgPerMl: 250, // reconstituted
    defaultRoute: "Strictly I/M Only",
    frequency: "प्रत्येक 24 घंटे में 3 दिन",
    indications: "एंथ्रेक्स, लंगड़ा बुखार (BQ), टिटनेस, स्ट्रेप्टोकोकल थनैल",
    withdrawalPeriod: "दूध: 4 दिन, मांस: 10 दिन",
    pregnancySafe: "सुरक्षित (Pregnancy Safe)",
    contraindications: "भूलकर भी I/V न दें (घातक एनाफिलेक्टिक शॉक)",
    approxMrp: 120
  },
  {
    code: "GENTAMICIN",
    genericName: "Gentamicin Sulphate Injection 40 mg/ml",
    ethicalBrand: "Inj. Gentacip / Gentabac 100ml",
    category: "Antibiotics",
    type: "GENERIC",
    doseRateMgPerKg: 4.0,
    concentrationMgPerMl: 40,
    defaultRoute: "I/M or Slow I/V",
    frequency: "प्रत्येक 12 घंटे या 24 घंटे में 3 दिन",
    indications: "ग्राम-नेगेटिव एंटराइटिस, गर्भाशय शोथ, सिस्टिटिस",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 40 दिन",
    pregnancySafe: "नेफ्रोटॉक्सिक व ओटोटॉक्सिक जोखिम - सावधानीपूर्वक",
    contraindications: "निर्जलीकरण व गुर्दा रोग में वर्जित",
    approxMrp: 95
  },
  {
    code: "INTRAMAMMARY_TUBE",
    genericName: "Cefoperazone Sodium Intramammary Infusion",
    ethicalBrand: "Pathocef / Mastilep Infusion Tube 10ml",
    category: "Antibiotics",
    type: "ETHICAL",
    doseRateMgPerKg: 0, // 1 tube per quarter
    concentrationMgPerMl: 25, // 250mg per 10ml
    defaultRoute: "Intramammary (थन में सीधे)",
    frequency: "प्रत्येक 12-24 घंटे में 2-3 खुराक",
    indications: "क्लिनिकल व सबक्लिनिकल थनैल (Mastitis Treatment)",
    withdrawalPeriod: "दूध: 4 दिन (उस थन का दूध फेंकें)",
    pregnancySafe: "सुरक्षित",
    contraindications: "थन कैनाल को क्षतिग्रस्त न करें",
    approxMrp: 145
  },
  {
    code: "MELOX_PARA",
    genericName: "Meloxicam (5mg) + Paracetamol (150mg) / ml",
    ethicalBrand: "Inj. Melonex Plus (Intas) / Melonac Plus",
    category: "NSAID",
    type: "BOTH",
    doseRateMgPerKg: 0.5, // based on Meloxicam
    concentrationMgPerMl: 5,
    defaultRoute: "Deep I/M",
    frequency: "24 घंटे में एक बार (आवश्यकतानुसार)",
    indications: "ज्वर (Fever), सूजन, दर्द, लंगड़ापन, थनैल दर्द, मस्कुलोस्केलेटल ऐंठन",
    withdrawalPeriod: "दूध: 2 दिन, मांस: 5 दिन",
    pregnancySafe: "सुरक्षित (Pregnancy Safe)",
    contraindications: "गंभीर गैस्ट्रिक अल्सर व निर्जलीकरण",
    approxMrp: 165
  },
  {
    code: "FLUNIXIN",
    genericName: "Flunixin Meglumine 50 mg/ml",
    ethicalBrand: "Inj. Megludyne (Virbac) / Finadyne (MSD)",
    category: "NSAID",
    type: "BOTH",
    doseRateMgPerKg: 2.2,
    concentrationMgPerMl: 50,
    defaultRoute: "Slow I/V or Deep I/M",
    frequency: "24 घंटे में एक बार, अधिकतम 3-5 दिन",
    indications: "एंडोटॉक्सिक शॉक, कोलिक (पेट दर्द), तीव्र श्वसन संकट, अत्यधिक सूजन",
    withdrawalPeriod: "दूध: 36 घंटे, मांस: 4 दिन",
    pregnancySafe: "सुरक्षित (अंतिम सप्ताहों में गर्भाशय शिथिलता से बचें)",
    contraindications: "गुर्दे की दुर्बलता व एक साथ दो NSAID का प्रयोग न करें",
    approxMrp: 310
  },
  {
    code: "KETOPROFEN",
    genericName: "Ketoprofen Injection 100 mg/ml",
    ethicalBrand: "Inj. Ketovet 100ml / Neoprofen",
    category: "NSAID",
    type: "BOTH",
    doseRateMgPerKg: 3.0,
    concentrationMgPerMl: 100,
    defaultRoute: "I/M or Slow I/V",
    frequency: "24 घंटे में एक बार 3 दिन",
    indications: "तीव्र ज्वर, गठिया, लंगड़ापन, ब्याने के बाद का दर्द",
    withdrawalPeriod: "दूध: 0 दिन (शून्य दूध विथड्रॉल), मांस: 4 दिन",
    pregnancySafe: "सुरक्षित",
    contraindications: "गंभीर हेपेटिक व रीनल डिसफंक्शन",
    approxMrp: 220
  },
  {
    code: "TOLFENAMIC_ACID",
    genericName: "Tolfenamic Acid 40 mg/ml",
    ethicalBrand: "Inj. Maxxtol 100ml (Intas) / Tolfedine",
    category: "NSAID",
    type: "BOTH",
    doseRateMgPerKg: 2.0,
    concentrationMgPerMl: 40,
    defaultRoute: "Deep I/M or Slow I/V",
    frequency: "48 घंटे में एक बार (दीर्घकालिक असर)",
    indications: "एक्यूट मैस्टाइटिस, ब्रोंकोन्यूमोनिया, एंडोटॉक्सेमिया",
    withdrawalPeriod: "दूध: 24 घंटे, मांस: 3 दिन",
    pregnancySafe: "सुरक्षित",
    contraindications: "कार्डियक फेल्योर",
    approxMrp: 295
  },
  {
    code: "DICYCLOMINE",
    genericName: "Dicyclomine HCl (10mg) + Diclofenac Sodium (25mg)",
    ethicalBrand: "Inj. Spasmo-vet (Ceva) / Spasmovet Plus",
    category: "NSAID",
    type: "BOTH",
    doseRateMgPerKg: 0.2,
    concentrationMgPerMl: 10,
    defaultRoute: "I/M Only",
    frequency: "दर्द होने पर तुरंत, 8-12 घंटे में दोहराएं",
    indications: "उदर शूल (पेट दर्द/Colic), आंतों की ऐंठन, प्रोलैप्स में जोर मारना",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 7 दिन",
    pregnancySafe: "सुरक्षित",
    contraindications: "ग्लूकोमा व मूत्र रुकावट में सावधानी",
    approxMrp: 130
  },
  {
    code: "BUPARVAQUONE",
    genericName: "Buparvaquone 50 mg/ml",
    ethicalBrand: "Inj. Butalex (MSD) / Zubion (Intas)",
    category: "Antiprotozoal",
    type: "BOTH",
    doseRateMgPerKg: 2.5,
    concentrationMgPerMl: 50,
    defaultRoute: "Deep I/M strictly (गर्दन की मांसपेशियों में)",
    frequency: "एकल खुराक (Single Dose), गंभीर मामलों में 48 घंटे बाद पुनरावृत्ति",
    indications: "थायलेरियासिस (Theileria annulata / orientalis)",
    withdrawalPeriod: "दूध: 48 घंटे, मांस: 42 दिन",
    pregnancySafe: "सुरक्षित (जीवन रक्षक औषधि)",
    contraindications: "I/V अथवा S/C मार्ग से कदापि न दें",
    approxMrp: 1350
  },
  {
    code: "DIMINAZENE",
    genericName: "Diminazene Aceturate (70mg) + Phenazone (375mg)",
    ethicalBrand: "Inj. Berenil RTU 30ml / Diminasan (MSD)",
    category: "Antiprotozoal",
    type: "BOTH",
    doseRateMgPerKg: 3.5,
    concentrationMgPerMl: 70,
    defaultRoute: "Deep I/M strictly",
    frequency: "एकल खुराक (आवश्यकता पड़ने पर 72 घंटे बाद)",
    indications: "बबेशियोसिस (लाल पेशाब), सर्रा (Trypanosoma evansi)",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 21 दिन",
    pregnancySafe: "सुरक्षित (निर्देशित डोज़ से अधिक न दें)",
    contraindications: "ऊंटों में विषाक्तता (ऊंट में वर्जित/सावधानी)",
    approxMrp: 260
  },
  {
    code: "IVERMECTIN",
    genericName: "Ivermectin 10 mg/ml (1% w/v)",
    ethicalBrand: "Inj. Neomec (Intas) / Ivomec (Boehringer)",
    category: "Anthelmintic",
    type: "BOTH",
    doseRateMgPerKg: 0.2,
    concentrationMgPerMl: 10,
    defaultRoute: "Strictly Subcutaneous (S/C त्वचा के नीचे)",
    frequency: "एकल खुराक (28-30 दिन बाद आवश्यकतानुसार पुनरावृत्ति)",
    indications: "चिचड़ी, जूँ, खाज-खुजली (Mange), आंतरिक गोलकृमि, नासिका कीड़े",
    withdrawalPeriod: "दूध: 28 दिन (दुधारू पशुओं में सावधानी), मांस: 35 दिन",
    pregnancySafe: "सुरक्षित (अत्यधिक ओवरडोज से बचें)",
    contraindications: "I/M या I/V मार्ग पूर्णतः वर्जित",
    approxMrp: 175
  },
  {
    code: "FENBENDAZOLE",
    genericName: "Fenbendazole Bolus 3000 mg",
    ethicalBrand: "Bolus Panacur 3g (MSD) / Fentas 3g (Intas)",
    category: "Anthelmintic",
    type: "BOTH",
    doseRateMgPerKg: 7.5,
    concentrationMgPerMl: 3000, // mg per bolus
    defaultRoute: "Oral (मुंह द्वारा)",
    frequency: "एकल खुराक प्रातः खाली पेट",
    indications: "पेट के कीड़े, फीताकृमि (Tapeworms), फेफड़ों के कृमि",
    withdrawalPeriod: "दूध: 0 दिन, मांस: 8 दिन",
    pregnancySafe: "100% गर्भावस्था सुरक्षित (सभी चरणों में)",
    contraindications: "कोई प्रमुख नहीं",
    approxMrp: 135
  },
  {
    code: "ALBENDAZOLE",
    genericName: "Albendazole Suspension 2.5% w/v",
    ethicalBrand: "Albomar 1000ml (Virbac) / Wormisole",
    category: "Anthelmintic",
    type: "GENERIC",
    doseRateMgPerKg: 7.5,
    concentrationMgPerMl: 25,
    defaultRoute: "Oral Drench",
    frequency: "एकल खुराक",
    indications: "गोलकृमि, फीताकृमि व लिवर फ्लूक (10 mg/kg पर)",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 14 दिन",
    pregnancySafe: "गर्भावस्था के प्रथम माह (first 30-45 days) में वर्जित",
    contraindications: "प्रारंभिक गाभिन पशुओं में टेराटोजेनिक जोखिम",
    approxMrp: 380
  },
  {
    code: "OXYCLOZANIDE_LEV",
    genericName: "Oxyclozanide (3%) + Levamisole HCl (1.5%) Liquid",
    ethicalBrand: "Nilzan 1000ml (Virbac) / Tremacid",
    category: "Anthelmintic",
    type: "BOTH",
    doseRateMgPerKg: 10.0,
    concentrationMgPerMl: 30, // based on Oxyclozanide
    defaultRoute: "Oral",
    frequency: "एकल खुराक",
    indications: "लिवर फ्लूक (Fasciola), पैराम्फिस्टोमम, फेफड़ों व आंत के कृमि",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 14 दिन",
    pregnancySafe: "सुरक्षित (गर्भावस्था में सुरक्षित कृमिनाशक)",
    contraindications: "अति-कमजोर व निर्जलित पशुओं में डोज़ कम करें",
    approxMrp: 490
  },
  {
    code: "CLOPROSTENOL",
    genericName: "Cloprostenol Sodium 250 mcg/ml (PGF2 alpha)",
    ethicalBrand: "Inj. Pragma (Intas) / Lutalyse / Vetmate",
    category: "Hormone",
    type: "BOTH",
    doseRateMgPerKg: 0.001, // 2ml flat (500mcg)
    concentrationMgPerMl: 0.25,
    defaultRoute: "Intramuscular (Deep I/M)",
    frequency: "एकल खुराक (मद चक्र नियमन हेतु 11 दिन पर पुनरावृत्ति)",
    indications: "मूक मद (Silent Heat), ल्यूटियल सिस्ट, पायोमेट्रा, जेर रुकावट (ROP)",
    withdrawalPeriod: "दूध: 0 दिन, मांस: 1 दिन",
    pregnancySafe: "अत्यंत खतरनाक - गाभिन पशु में गर्भपात कराता है (Abortifacient)",
    contraindications: "गाभिन पशुओं में कदापि न दें (जब तक गर्भपात उद्देश्य न हो)",
    approxMrp: 215
  },
  {
    code: "BUSERELIN",
    genericName: "Buserelin Acetate 0.0042 mg/ml (GnRH Analogue)",
    ethicalBrand: "Inj. Receptal 2.5ml / 10ml (MSD) / Gyarich",
    category: "Hormone",
    type: "ETHICAL",
    doseRateMgPerKg: 0, // 2.5ml to 5ml flat dose
    concentrationMgPerMl: 0.0042,
    defaultRoute: "I/M strictly",
    frequency: "A.I. के समय या ओव्यूलेशन सुधार हेतु",
    indications: "फॉलिक्युलर सिस्ट, रिपीट ब्रीडर, समय पर अंडोत्सर्ग (Ovulation)",
    withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
    pregnancySafe: "सुरक्षित (प्रारंभिक भ्रूण सुरक्षा हेतु प्रयुक्त)",
    contraindications: "कोई प्रमुख नहीं",
    approxMrp: 340
  },
  {
    code: "OXYTOCIN",
    genericName: "Oxytocin Injection IP 10 IU/ml",
    ethicalBrand: "Inj. Syntocinon / Pitocin (Veterinary IP)",
    category: "Hormone",
    type: "GENERIC",
    doseRateMgPerKg: 0, // 20-40 IU flat for large ruminants
    concentrationMgPerMl: 10,
    defaultRoute: "I/M or Slow I/V (with Dextrose)",
    frequency: "प्रसव पश्चात आवश्यकतानुसार",
    indications: "गर्भाशय जकड़न (Uterine Inertia), जेर निष्कासन, प्रसवोत्तर रक्तस्राव",
    withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
    pregnancySafe: "अपूर्ण खुले गर्भाशय मुंह में वर्जित (गर्भाशय फटने का खतरा)",
    contraindications: "गर्भाशय ग्रीवा बंद होने या असामान्य भ्रूण स्थिति में न दें",
    approxMrp: 45
  },
  {
    code: "CALCIUM_BOROGLUCONATE",
    genericName: "Calcium Borogluconate 25% + Mg + P + Dextrose",
    ethicalBrand: "Infusion Mifex 450ml (Novartis) / Calborol",
    category: "Fluids",
    type: "BOTH",
    doseRateMgPerKg: 0, // 450ml flat per 400kg animal
    concentrationMgPerMl: 250,
    defaultRoute: "Slow I/V (2/3) + Subcutaneous (1/3)",
    frequency: "हृदय गति की लगातार जांच करते हुए अत्यंत धीमी गति से दें",
    indications: "मिल्क फीवर (हाइपोकैल्सीमिया), डाउनर काउ सिंड्रोम, एक्लम्पसिया",
    withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
    pregnancySafe: "सुरक्षित (जीवन रक्षक)",
    contraindications: "तीव्र गति से I/V देने पर हृदय गति रुकना (Cardiac Arrest)",
    approxMrp: 310
  },
  {
    code: "DEXTROSE_25",
    genericName: "Dextrose 25% w/v Sterile Hypertonic Infusion",
    ethicalBrand: "Infusion Dex-25 500ml / Intalite-25",
    category: "Fluids",
    type: "GENERIC",
    doseRateMgPerKg: 0, // 500-1000ml flat
    concentrationMgPerMl: 250,
    defaultRoute: "Strictly Intravenous (I/V)",
    frequency: "आवश्यकतानुसार 1-2 बार",
    indications: "कीटोसिस, हाइपोग्लाइसीमिया, अत्यधिक दुर्बलता, यकृत सुरक्षा",
    withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
    pregnancySafe: "सुरक्षित",
    contraindications: "मांसपेशियों या त्वचा के नीचे न दें (ऊतक नेक्रोसिस)",
    approxMrp: 65
  },
  {
    code: "SODIUM_ACID_PHOSPHATE",
    genericName: "Sodium Acid Phosphate 400 mg/ml (Inorganic P)",
    ethicalBrand: "Inj. Alphos 30ml / Sodaphos / Tonophosphan-P",
    category: "Metabolic",
    type: "BOTH",
    doseRateMgPerKg: 10.0,
    concentrationMgPerMl: 400,
    defaultRoute: "Slow I/V or S/C",
    frequency: "दैनिक 2-3 दिन",
    indications: "ब्याने बाद लाल पेशाब (PPH), गंभीर हाइपोफॉस्फेटेमिया",
    withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
    pregnancySafe: "सुरक्षित",
    contraindications: "हाइपरफॉस्फेटेमिया",
    approxMrp: 160
  },
  {
    code: "TOLDIMPHOS",
    genericName: "Toldimphos Sodium 200 mg/ml (Organic Phosphorus)",
    ethicalBrand: "Inj. Tonophosphan (Intervet) / Urumin (Intas)",
    category: "Metabolic",
    type: "BOTH",
    doseRateMgPerKg: 5.0,
    concentrationMgPerMl: 200,
    defaultRoute: "Deep I/M or Slow I/V",
    frequency: "एक दिन छोड़कर 3-5 इंजेक्शन",
    indications: "मेटाबॉलिक विकार, रिपीट ब्रीडिंग, तंत्रिका दुर्बलता, रिकेट्स",
    withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
    pregnancySafe: "सुरक्षित",
    contraindications: "कोई नहीं",
    approxMrp: 280
  },
  {
    code: "ISOFLUPREDONE",
    genericName: "Isoflupredone Acetate 2 mg/ml Suspension",
    ethicalBrand: "Inj. Predef 2X (Zoetis) / Isoflud (Zydus)",
    category: "Corticosteroid",
    type: "BOTH",
    doseRateMgPerKg: 0.04,
    concentrationMgPerMl: 2,
    defaultRoute: "Deep I/M Only",
    frequency: "24-48 घंटे बाद पुनरावृत्ति",
    indications: "कीटोसिस, गंभीर थनैल, सेप्टिक शॉक, एलर्जी, मस्कुलोस्केलेटल दर्द",
    withdrawalPeriod: "दूध: 0 दिन, मांस: 7 दिन",
    pregnancySafe: "गाभिन पशुओं में सुरक्षित (ग्लूकोकोर्टिकोइड ऑफ चॉइस)",
    contraindications: "अंतिम तिमाही में डेक्सामेथासोन की तुलना में अत्यधिक सुरक्षित",
    approxMrp: 290
  },
  {
    code: "DEXAMETHASONE",
    genericName: "Dexamethasone Sodium Phosphate 4 mg/ml",
    ethicalBrand: "Inj. Dexona (Cadila) / Vetalog 4mg",
    category: "Corticosteroid",
    type: "BOTH",
    doseRateMgPerKg: 0.1,
    concentrationMgPerMl: 4,
    defaultRoute: "I/M or Slow I/V",
    frequency: "आपातकालीन स्थिति में एकल खुराक",
    indications: "एनाफिलेक्टिक शॉक, तीव्र एलर्जी, सांप का काटना, गैर-संक्रामक सूजन",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 8 दिन",
    pregnancySafe: "अत्यंत खतरनाक - अंतिम तिमाही में तत्काल गर्भपात कराता है",
    contraindications: "गाभिन पशुओं में बिल्कुल न दें",
    approxMrp: 60
  },
  {
    code: "PHENIRAMINE",
    genericName: "Pheniramine Maleate 22.75 mg/ml",
    ethicalBrand: "Inj. Avil 33ml (Intervet) / Chloril",
    category: "Antihistamine",
    type: "BOTH",
    doseRateMgPerKg: 0.5,
    concentrationMgPerMl: 22.75,
    defaultRoute: "Deep I/M",
    frequency: "प्रत्येक 12-24 घंटे में",
    indications: "दवा एलर्जी, कीट दंश, पित्ती (Urticaria), अफारे में हिस्टामिन रोध",
    withdrawalPeriod: "दूध: 1 दिन, मांस: 2 दिन",
    pregnancySafe: "सुरक्षित",
    contraindications: "अत्यधिक तेज I/V देने पर उत्तेजना व कंपन",
    approxMrp: 95
  },
  {
    code: "B_COMPLEX",
    genericName: "Vitamin B-Complex with Liver Extract & B12",
    ethicalBrand: "Inj. Belamyl (Zydus) / Tribivet (Intas)",
    category: "Metabolic",
    type: "BOTH",
    doseRateMgPerKg: 0.05, // 10ml flat for large ruminant
    concentrationMgPerMl: 10,
    defaultRoute: "Deep I/M Only",
    frequency: "दैनिक या एकान्तर दिवस, 3-5 दिन",
    indications: "भूख की कमी, रूमेन सुस्ती, एंटीबायोटिक थेरेपी के साथ, यकृत दुर्बलता",
    withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
    pregnancySafe: "पूर्णतः सुरक्षित",
    contraindications: "I/V मार्ग से न दें",
    approxMrp: 110
  },
  {
    code: "RUMEN_TORIC",
    genericName: "Live Yeast Culture + Cobalt + Rumen Buffers Bolus",
    ethicalBrand: "Bolus Bioboost (Intas) / Rumicare (Virbac)",
    category: "Metabolic",
    type: "BOTH",
    doseRateMgPerKg: 0, // 2 boli daily
    concentrationMgPerMl: 1,
    defaultRoute: "Oral (मुंह द्वारा)",
    frequency: "2 बोलस सुबह-शाम 3 दिन",
    indications: "एनोरेक्सिया, रूमेन माइक्रोफ्लोरा पुनर्जीवन, एसिडोसिस उपरांत",
    withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
    pregnancySafe: "सुरक्षित",
    contraindications: "कोई नहीं",
    approxMrp: 180
  },
  {
    code: "ATROPINE_SULPHATE",
    genericName: "Atropine Sulphate Injection 1 mg/ml",
    ethicalBrand: "Inj. Tropine 100ml / Atrosol IP",
    category: "Emergency",
    type: "GENERIC",
    doseRateMgPerKg: 0.04,
    concentrationMgPerMl: 1,
    defaultRoute: "1/4th I/V + 3/4th S/C or I/M",
    frequency: "आपातकाल में, पुतली फैलने तक दोहराएं",
    indications: "ऑर्गेनोफॉस्फोरस (कीटनाशक) विषाक्तता, अत्यधिक लार व ब्रैडीकार्डिया",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 3 दिन",
    pregnancySafe: "सावधानीपूर्वक (जीवन रक्षक होने पर)",
    contraindications: "ग्लूकोमा, टैचीकार्डिया (हार्ट रेट >120)",
    approxMrp: 85
  }
];

// Global runtime clinical state
window.currentClinicalCase = {
  photoBase64: null,
  activeCalculatedWeightKg: 400,
  activeDisease: null,
  activePrescriptionMedicines: []
};

// ----------------------------------------------------------------------------
// 1. MULTI-ORGAN SYMPTOM MATRIX CONTROLLER
// ----------------------------------------------------------------------------

/**
 * Injects organ symptom options safely into all multi-organ select elements.
 * Fallback-protected to guarantee the UI never freezes.
 */
window.populateSymptomDropdowns = function () {
  const organs = ["eyes", "skin", "udder", "urine", "dung", "temp", "rumen", "respiration"];

  organs.forEach(organ => {
    const elemId = "selOrgan" + organ.charAt(0).toUpperCase() + organ.slice(1);
    const selectElem = document.getElementById(elemId);

    if (selectElem) {
      const currentVal = selectElem.value;
      selectElem.innerHTML = `<option value="ALL">-- ${organ.toUpperCase()} (सामान्य या कोई भी) --</option>`;

      const symptomList = window.VETCARE_SYMPTOMS_BY_ORGAN[organ] || [];
      symptomList.forEach(symptom => {
        const opt = document.createElement("option");
        opt.value = symptom;
        opt.textContent = symptom;
        selectElem.appendChild(opt);
      });

      if (currentVal && symptomList.includes(currentVal)) {
        selectElem.value = currentVal;
      }
    }
  });
};

/**
 * Resets the Multi-Organ Matrix selections back to clean state.
 */
window.resetMultiOrganMatrix = function () {
  const organs = ["eyes", "skin", "udder", "urine", "dung", "temp", "rumen", "respiration"];
  organs.forEach(organ => {
    const elemId = "selOrgan" + organ.charAt(0).toUpperCase() + organ.slice(1);
    const elem = document.getElementById(elemId);
    if (elem) elem.value = "ALL";
  });

  const resultsContainer = document.getElementById("diseaseSearchResults");
  if (resultsContainer) {
    resultsContainer.innerHTML = `
      <div class="p-6 bg-slate-50 border border-slate-200 rounded-3xl text-center space-y-2">
        <span class="text-3xl">🧬</span>
        <h4 class="font-bold text-slate-800 text-sm">लक्षण मैट्रिक्स सक्रिय है</h4>
        <p class="text-xs text-slate-500 max-w-md mx-auto">
          कृपया ऊपर अंगों की स्थिति चुनें। सिस्टम सांख्यिकीय क्लिनिकल भार (Weight %) के आधार पर
          संभावित रोगों एवं पुष्टिकरण लैब परीक्षणों की सूची प्रस्तुत करेगा।
        </p>
      </div>`;
  }

  const matchBadge = document.getElementById("matchCountBadge");
  if (matchBadge) matchBadge.textContent = `${window.VETCARE_DISEASE_DB.length} रोग एक्टिव`;
};

/**
 * Calculates disease probabilities based on organ selections and renders
 * top matching clinical diseases with percentage confidence and confirmatory test tables.
 */
window.calculateDiseaseProbability = function () {
  const selectedSymptoms = {};
  let totalOrgansChosen = 0;

  const organs = ["eyes", "skin", "udder", "urine", "dung", "temp", "rumen", "respiration"];
  organs.forEach(organ => {
    const elemId = "selOrgan" + organ.charAt(0).toUpperCase() + organ.slice(1);
    const elem = document.getElementById(elemId);
    if (elem && elem.value !== "ALL") {
      selectedSymptoms[organ] = elem.value;
      totalOrgansChosen++;
    }
  });

  const resultsContainer = document.getElementById("diseaseSearchResults");
  if (!resultsContainer) return;

  if (totalOrgansChosen === 0) {
    window.resetMultiOrganMatrix();
    return;
  }

  const scoredDiseases = window.VETCARE_DISEASE_DB.map(disease => {
    let score = 0;
    let maxPossibleScore = 0;
    const matchesFound = [];

    // Temperature Weight (25% weight)
    if (selectedSymptoms.temp) {
      maxPossibleScore += 25;
      if (
        (disease.tempWeight === "HIGH" && selectedSymptoms.temp.includes("तीव्र")) ||
        (disease.tempWeight === "SUB" && selectedSymptoms.temp.includes("हाइपोथर्मिया")) ||
        (disease.tempWeight === "NORMAL" && selectedSymptoms.temp.includes("सामान्य")) ||
        (disease.tempWeight === "MODERATE" && selectedSymptoms.temp.includes("मध्यम"))
      ) {
        score += 25;
        matchesFound.push("तापमान साक्ष्य");
      }
    }

    // Individual Organ Specificity (75% distributed across chosen organs)
    const otherOrgans = ["eyes", "skin", "udder", "urine", "dung", "rumen", "respiration"];
    const weightPerOrgan = 75 / Math.max(1, (totalOrgansChosen - (selectedSymptoms.temp ? 1 : 0)));

    otherOrgans.forEach(organ => {
      if (selectedSymptoms[organ]) {
        maxPossibleScore += weightPerOrgan;
        if (disease.organMatches && disease.organMatches[organ]) {
          const diseaseSign = disease.organMatches[organ].toLowerCase();
          const chosenSign = selectedSymptoms[organ].toLowerCase();

          if (diseaseSign === chosenSign || diseaseSign.includes(chosenSign) || chosenSign.includes(diseaseSign.split(" ")[0])) {
            score += weightPerOrgan;
            matchesFound.push(organ);
          }
        }
      }
    });

    const probability = maxPossibleScore > 0 ? Math.min(99, Math.round((score / maxPossibleScore) * 100)) : 10;
    return {
      ...disease,
      computedScore: probability,
      matchHighlights: matchesFound
    };
  });

  // Sort descending by score
  scoredDiseases.sort((a, b) => b.computedScore - a.computedScore);

  const topMatches = scoredDiseases.filter(d => d.computedScore >= 35);
  const displayList = topMatches.length > 0 ? topMatches : scoredDiseases.slice(0, 3);

  const matchBadge = document.getElementById("matchCountBadge");
  if (matchBadge) {
    matchBadge.textContent = `${displayList.length} उच्च संभावना वाले रोग`;
  }

  // Render HTML Output
  let html = `<div class="space-y-4">`;

  displayList.forEach(disease => {
    const badgeColor =
      disease.computedScore >= 75
        ? "bg-rose-600 text-white"
        : disease.computedScore >= 50
        ? "bg-amber-600 text-white"
        : "bg-blue-600 text-white";

    html += `
      <div class="bg-white border-2 ${disease.computedScore >= 75 ? 'border-rose-300' : 'border-slate-200'} rounded-3xl p-5 shadow-sm space-y-4 transition hover:border-blue-400">
        <!-- Top Disease Banner -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-black uppercase px-2.5 py-0.5 rounded-full ${badgeColor}">
                संभावना: ${disease.computedScore}%
              </span>
              <span class="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                ${disease.category}
              </span>
            </div>
            <h3 class="text-base font-black text-slate-900 mt-1">${disease.nameHindi}</h3>
          </div>
          <button onclick="window.selectDiseaseForTreatment('${disease.id}')" class="text-xs bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1">
            <span>📋 प्रोटोकॉल लोड करें</span> ➔
          </button>
        </div>

        <!-- Cardinal Sign Display -->
        <div class="bg-rose-50/60 border border-rose-200 rounded-2xl p-3 text-xs text-rose-950">
          <strong class="text-rose-700 block mb-0.5">🚨 प्रमुख विशिष्ट लक्षण (Cardinal Sign):</strong>
          <span>${disease.cardinal}</span>
        </div>

        <!-- Confirmatory Lab Tests Table -->
        <div class="space-y-1.5">
          <h4 class="text-xs font-bold text-slate-800 flex items-center gap-1">
            <span>🔬</span> पुष्टिकरण प्रयोगशाला परीक्षण तालिका (Confirmatory Lab Diagnostics):
          </h4>
          <div class="overflow-x-auto rounded-2xl border border-slate-200">
            <table class="w-full text-left text-xs border-collapse">
              <thead class="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px]">
                <tr>
                  <th class="p-2.5 font-bold">क्र.सं.</th>
                  <th class="p-2.5 font-bold">टेस्ट का नाम</th>
                  <th class="p-2.5 font-bold">नमूने का प्रकार</th>
                  <th class="p-2.5 font-bold">अनुमानित MRP (₹)</th>
                  <th class="p-2.5 font-bold">रिपोर्ट समय</th>
                  <th class="p-2.5 font-bold">पुष्टिकरण निष्कर्ष</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                ${disease.confirmatoryTests.map((test, idx) => `
                  <tr class="hover:bg-slate-50/50">
                    <td class="p-2.5 font-bold text-slate-500">${idx + 1}</td>
                    <td class="p-2.5 font-semibold text-blue-900">${test.testName}</td>
                    <td class="p-2.5">${test.sampleType}</td>
                    <td class="p-2.5 font-bold text-emerald-700">₹${test.approxMrp}</td>
                    <td class="p-2.5 text-slate-500">${test.turnaround}</td>
                    <td class="p-2.5 text-rose-700 font-medium">${test.conclusion}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Action / Calculator Quick Anchor -->
        <div class="pt-1 flex flex-wrap gap-2 items-center justify-between text-xs">
          <span class="text-[11px] text-slate-400">प्रमाणित क्लिनिकल प्रोटोकॉल • Vetcare AI 2026</span>
          <button onclick="window.mountInlineCalculator('${disease.id}')" class="text-xs bg-emerald-50 text-emerald-700 border border-emerald-300 px-3 py-1.5 rounded-xl font-bold hover:bg-emerald-100 transition flex items-center gap-1">
            <span>⚖️ शेफर फॉर्मूला डोज़ कैलकुलेटर खोलें</span>
          </button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  resultsContainer.innerHTML = html;
};

// ----------------------------------------------------------------------------
// CLINICAL PHOTO ATTACHMENT CONTROLLER (BASE64 CANVAS COMPRESSION)
// ----------------------------------------------------------------------------

/**
 * Handles image upload/capture, resizes on HTML5 Canvas, and stores Base64 string.
 */
window.handleClinicalPhotoUpload = function (event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      // Compress to Max 800px width/height to protect LocalStorage capacity
      const maxDim = 800;
      let width = img.width;
      let height = img.height;

      if (width > height && width > maxDim) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      } else if (height > maxDim) {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.72);
      window.currentClinicalCase.photoBase64 = compressedBase64;
      window.renderPhotoPreviewUI(compressedBase64);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

/**
 * Renders the clinical photo thumbnail preview in the OPD view.
 */
window.renderPhotoPreviewUI = function (base64) {
  let previewBox = document.getElementById("opdPhotoPreviewBox");
  if (!previewBox) {
    const targetContainer = document.getElementById("opdDiagnosis")?.parentNode;
    if (targetContainer) {
      previewBox = document.createElement("div");
      previewBox.id = "opdPhotoPreviewBox";
      previewBox.className = "p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 text-xs";
      targetContainer.insertBefore(previewBox, document.getElementById("opdDiagnosis"));
    }
  }

  if (previewBox) {
    if (base64) {
      previewBox.innerHTML = `
        <div class="flex items-center gap-3">
          <img src="${base64}" alt="Clinical Lesion" class="w-12 h-12 object-cover rounded-xl border border-slate-300 shadow-xs" />
          <div>
            <strong class="text-slate-800 block text-xs">क्लिनिकल फोटो संलग्न (Photo Attached)</strong>
            <span class="text-[10px] text-emerald-600 font-bold">✓ रोगी केस पर्ची में सुरक्षित</span>
          </div>
        </div>
        <button onclick="window.removeClinicalPhoto()" class="text-rose-600 hover:text-rose-800 text-xs font-bold px-2 py-1 bg-rose-50 rounded-lg border border-rose-200">
          हटाएं ✕
        </button>
      `;
      previewBox.style.display = "flex";
    } else {
      previewBox.style.display = "none";
    }
  }
};

/**
 * Clears current clinical photo.
 */
window.removeClinicalPhoto = function () {
  window.currentClinicalCase.photoBase64 = null;
  const fileInput = document.getElementById("opdPhotoInput");
  if (fileInput) fileInput.value = "";
  window.renderPhotoPreviewUI(null);
};

// ----------------------------------------------------------------------------
// 2. EMBEDDED INLINE WEIGHT & DOSAGE CALCULATOR (SHAEFFER'S FORMULA)
// ----------------------------------------------------------------------------

/**
 * Shaeffer's Formula for Bovine Weight:
 * Weight (lbs) = (Heart Girth (inches)^2 * Body Length (inches)) / 300
 * Converted to Kilograms (1 lb = 0.453592 kg)
 */
window.calculateShaefferWeight = function (girthInches, lengthInches) {
  const g = parseFloat(girthInches);
  const l = parseFloat(lengthInches);

  if (isNaN(g) || isNaN(l) || g <= 0 || l <= 0) {
    return 400; // Standard Bovine Baseline default
  }

  const weightLbs = (Math.pow(g, 2) * l) / 300;
  const weightKg = Math.round(weightLbs * 0.45359237);
  return Math.max(25, weightKg);
};

/**
 * Computes exact volume (ml) based on live weight, drug rate (mg/kg), and concentration (mg/ml).
 */
window.calculateExactDoseMl = function (weightKg, doseRateMgPerKg, concentrationMgPerMl) {
  if (!concentrationMgPerMl || concentrationMgPerMl <= 0 || !doseRateMgPerKg) return 0;
  const totalMg = weightKg * doseRateMgPerKg;
  const volumeMl = totalMg / concentrationMgPerMl;
  return parseFloat(volumeMl.toFixed(1));
};

/**
 * Dynamically mounts the Shaeffer inline calculator into a dedicated UI container
 * or within the active disease card.
 */
window.mountInlineCalculator = function (diseaseId) {
  const disease = window.VETCARE_DISEASE_DB.find(d => d.id === diseaseId) || window.VETCARE_DISEASE_DB[0];
  window.currentClinicalCase.activeDisease = disease;

  let modal = document.getElementById("modalInlineCalc");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modalInlineCalc";
    modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl text-xs sm:text-sm">
      <div class="flex justify-between items-center border-b border-slate-100 pb-2.5">
        <div>
          <h3 class="font-black text-slate-900 flex items-center gap-1.5">
            <span>⚖️</span> शेफर फॉर्मूला एवं सटीक मिली डोज़ कैलकुलेटर
          </h3>
          <p class="text-[11px] text-blue-700 font-bold">${disease.nameHindi}</p>
        </div>
        <button onclick="document.getElementById('modalInlineCalc').style.display='none'" class="text-slate-400 hover:text-slate-600 font-bold text-base">✕</button>
      </div>

      <!-- Shaeffer Measurement Inputs -->
      <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 mb-1">सीना घेरा / Heart Girth (इंच):</label>
            <input type="number" id="calcGirth" value="68" oninput="window.updateLiveCalculations()" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-bold outline-none text-slate-800" />
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 mb-1">लंबाई / Body Length (इंच):</label>
            <input type="number" id="calcLength" value="56" oninput="window.updateLiveCalculations()" class="w-full bg-white border border-slate-200 rounded-xl p-2.5 font-bold outline-none text-slate-800" />
          </div>
        </div>

        <div class="flex items-center justify-between p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-950">
          <span class="text-xs font-bold">वैज्ञानिक गणना अनुसार पशु वजन:</span>
          <strong id="calcWeightDisp" class="text-sm font-black text-blue-800">388 Kg (855 Lbs)</strong>
        </div>
      </div>

      <!-- Live Recommended Drug List with Computed mL -->
      <div class="space-y-2">
        <h4 class="font-bold text-slate-800 text-xs flex items-center justify-between">
          <span>💉 रोग-विशिष्ट दवाएं एवं आवश्यक खुराक (Computed mL):</span>
          <span class="text-[10px] text-slate-400">1-Click से पर्ची में जोड़ें</span>
        </h4>
        <div id="calcDrugsList" class="space-y-2 max-h-60 overflow-y-auto no-scrollbar pr-1"></div>
      </div>

      <div class="pt-2 flex gap-2">
        <button onclick="window.injectAllCalculatedDosesToRx()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-md transition active:scale-98 flex items-center justify-center gap-1.5">
          <span>📝 संपूर्ण उपचार डिजिटल ओपीडी पर्ची में लोड करें</span> ➔
        </button>
      </div>
    </div>
  `;

  modal.style.display = "flex";
  window.updateLiveCalculations();
};

/**
 * Recomputes live weights and ml doses based on modal inputs.
 */
window.updateLiveCalculations = function () {
  const g = document.getElementById("calcGirth")?.value || 68;
  const l = document.getElementById("calcLength")?.value || 56;
  const weightKg = window.calculateShaefferWeight(g, l);
  window.currentClinicalCase.activeCalculatedWeightKg = weightKg;

  const dispElem = document.getElementById("calcWeightDisp");
  if (dispElem) {
    dispElem.textContent = `${weightKg} Kg (${Math.round(weightKg * 2.20462)} Lbs)`;
  }

  const disease = window.currentClinicalCase.activeDisease;
  const listContainer = document.getElementById("calcDrugsList");
  if (!listContainer || !disease) return;

  const drugCodes = disease.recommendedDrugs || [];
  const drugs = drugCodes.map(code => window.VETCARE_PHARMACOPEIA.find(d => d.code === code)).filter(Boolean);

  let html = "";
  drugs.forEach(drug => {
    let doseMl = window.calculateExactDoseMl(weightKg, drug.doseRateMgPerKg, drug.concentrationMgPerMl);
    if (drug.doseRateMgPerKg === 0) {
      doseMl = drug.concentrationMgPerMl === 1 ? "2 बोलस" : "1 बोतल (450ml)";
    } else {
      doseMl = `${doseMl} ml`;
    }

    html += `
      <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2 text-xs">
        <div>
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-slate-900">${drug.ethicalBrand.split("/")[0]}</span>
            <span class="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono">${drug.defaultRoute}</span>
          </div>
          <span class="text-[10px] text-slate-500 block">${drug.genericName} (${drug.doseRateMgPerKg} mg/kg)</span>
        </div>
        <div class="text-right">
          <span class="text-xs font-black text-emerald-700 block">${doseMl}</span>
          <span class="text-[10px] text-slate-400 font-sans">${drug.frequency.split(" ")[0]}</span>
        </div>
      </div>
    `;
  });

  listContainer.innerHTML = html;
};

/**
 * Transfers all calculated doses into the digital OPD Prescription text area.
 */
window.injectAllCalculatedDosesToRx = function () {
  const disease = window.currentClinicalCase.activeDisease;
  const weightKg = window.currentClinicalCase.activeCalculatedWeightKg || 400;
  if (!disease) return;

  const opdDiagInput = document.getElementById("opdDiagnosis");
  if (opdDiagInput) {
    opdDiagInput.value = `${disease.nameHindi} (अनुमानित भार: ${weightKg} Kg)`;
  }

  const drugCodes = disease.recommendedDrugs || [];
  const drugs = drugCodes.map(code => window.VETCARE_PHARMACOPEIA.find(d => d.code === code)).filter(Boolean);

  let rxText = `=== प्रमाणित क्लिनिकल Rx उपचार (पशु भार: ${weightKg} Kg) ===\n`;
  drugs.forEach((drug, i) => {
    let doseMl = window.calculateExactDoseMl(weightKg, drug.doseRateMgPerKg, drug.concentrationMgPerMl);
    let doseStr = drug.doseRateMgPerKg === 0 ? "निर्देशानुसार" : `${doseMl} ml`;
    rxText += `${i + 1}. ${drug.ethicalBrand} [${drug.genericName}]\n   डोज़: ${doseStr} | रूट: ${drug.defaultRoute} | आवृत्ति: ${drug.frequency}\n`;
  });

  const opdMedInput = document.getElementById("opdMedicine");
  if (opdMedInput) {
    opdMedInput.value = rxText;
  }

  const modal = document.getElementById("modalInlineCalc");
  if (modal) modal.style.display = "none";

  // Switch tab to Prescription if available
  if (typeof window.switchTab === "function") {
    window.switchTab("rx");
  }
};

/**
 * Direct selection hook from diagnosis card.
 */
window.selectDiseaseForTreatment = function (diseaseId) {
  window.mountInlineCalculator(diseaseId);
};

// ----------------------------------------------------------------------------
// 3. ADVANCED VETERINARY DRUGS PHARMACOPEIA (दवा ज्ञानकोश)
// ----------------------------------------------------------------------------

/**
 * Renders the pharmacopeia catalog with comprehensive filtering, search, and sorting.
 */
window.renderPharmacopeia = function (filterCategory = "ALL", filterType = "BOTH", searchQuery = "", sortBy = "NAME_ASC") {
  const container = document.getElementById("pharmacopeiaGrid");
  if (!container) return;

  let list = [...window.VETCARE_PHARMACOPEIA];

  // Category Filter
  if (filterCategory !== "ALL") {
    list = list.filter(item => item.category.toUpperCase() === filterCategory.toUpperCase());
  }

  // Type Filter (ETHICAL / GENERIC / BOTH)
  if (filterType !== "BOTH") {
    list = list.filter(item => item.type === filterType || item.type === "BOTH");
  }

  // Search Query
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(item =>
      item.genericName.toLowerCase().includes(q) ||
      item.ethicalBrand.toLowerCase().includes(q) ||
      item.indications.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (sortBy === "NAME_ASC") {
    list.sort((a, b) => a.genericName.localeCompare(b.genericName));
  } else if (sortBy === "NAME_DESC") {
    list.sort((a, b) => b.genericName.localeCompare(a.genericName));
  } else if (sortBy === "MRP_ASC") {
    list.sort((a, b) => a.approxMrp - b.approxMrp);
  } else if (sortBy === "MRP_DESC") {
    list.sort((a, b) => b.approxMrp - a.approxMrp);
  }

  // 0 RESULTS - UNLISTED DRUG AI FALLBACK TRIGGER
  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-6 bg-slate-50 border border-slate-200 rounded-3xl text-center space-y-3">
        <span class="text-3xl">💊</span>
        <h4 class="font-bold text-slate-800 text-sm">स्थानीय ज्ञानकोश में कोई दवा नहीं मिली</h4>
        <p class="text-xs text-slate-500 max-w-sm mx-auto">
          खोज: "${searchQuery}" स्थानीय डेटाबेस में सूचीबद्ध नहीं है। क्या आप Vetcare AI से इसका
          फार्माकोलॉजी प्रोफाइल प्राप्त करना चाहते हैं?
        </p>
        <button onclick="window.fetchUnlistedDrugAI('${encodeURIComponent(searchQuery)}')" class="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs shadow-md shadow-purple-600/20 transition flex items-center justify-center gap-1.5 mx-auto">
          <span>🤖 Gemini AI से दवा प्रोफाइल खोजें</span> ➔
        </button>
      </div>
    `;
    return;
  }

  let html = "";
  list.forEach(drug => {
    html += `
      <div class="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 transition flex flex-col justify-between">
        <div class="space-y-2">
          <div class="flex items-start justify-between gap-1.5">
            <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              ${drug.category}
            </span>
            <span class="text-xs font-black text-emerald-700 font-mono">₹${drug.approxMrp}</span>
          </div>

          <div>
            <h4 class="font-black text-slate-900 text-sm leading-snug">${drug.ethicalBrand}</h4>
            <p class="text-[11px] font-mono text-slate-500">${drug.genericName}</p>
          </div>

          <div class="p-2.5 bg-slate-50 rounded-xl space-y-1 text-[11px]">
            <div class="flex justify-between">
              <span class="text-slate-500">मानक खुराक:</span>
              <strong class="text-slate-800 font-mono">${drug.doseRateMgPerKg > 0 ? `${drug.doseRateMgPerKg} mg/kg` : 'विशिष्ट डोज़'} (${drug.defaultRoute})</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">विथड्रॉल अवधि:</span>
              <span class="text-slate-700 font-medium">${drug.withdrawalPeriod}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">गर्भावस्था:</span>
              <span class="font-bold ${drug.pregnancySafe.includes('खतरनाक') || drug.pregnancySafe.includes('वर्जित') ? 'text-rose-600' : 'text-emerald-700'}">${drug.pregnancySafe}</span>
            </div>
          </div>

          <p class="text-[11px] text-slate-600 line-clamp-2">
            <strong>प्रमुख उपयोग:</strong> ${drug.indications}
          </p>
        </div>

        <button onclick="window.appendDrugDirectlyToRx('${drug.code}')" class="w-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 mt-2">
          <span>+ ओपीडी पर्ची में जोड़ें</span>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
};

/**
 * Filter trigger invoked by search inputs or select elements.
 */
window.filterPharmacopeiaUI = function () {
  const cat = document.getElementById("pharmaCategorySelect")?.value || "ALL";
  const type = document.getElementById("pharmaTypeSelect")?.value || "BOTH";
  const q = document.getElementById("pharmaSearchInput")?.value || "";
  const sort = document.getElementById("pharmaSortSelect")?.value || "NAME_ASC";
  window.renderPharmacopeia(cat, type, q, sort);
};

/**
 * Appends a specific drug into the Rx prescription area.
 */
window.appendDrugDirectlyToRx = function (drugCode) {
  const drug = window.VETCARE_PHARMACOPEIA.find(d => d.code === drugCode);
  if (!drug) return;

  const rxArea = document.getElementById("opdMedicine");
  if (rxArea) {
    const entry = `• ${drug.ethicalBrand} [${drug.genericName}] - रूट: ${drug.defaultRoute} | डोज़: ${drug.doseRateMgPerKg} mg/kg (${drug.frequency})\n`;
    rxArea.value = (rxArea.value ? rxArea.value + "\n" : "") + entry;
  }

  // Switch to Rx tab
  if (typeof window.switchTab === "function") {
    window.switchTab("rx");
  }
};

/**
 * Unlisted Drug AI Fallback: Queries Google Gemini API for veterinary clinical pharmacology.
 */
window.fetchUnlistedDrugAI = async function (encodedDrugQuery) {
  const query = decodeURIComponent(encodedDrugQuery);
  const apiKey = localStorage.getItem("vetcare_gemini_key") || (window.AppConfig && window.AppConfig.geminiKey);

  if (!apiKey) {
    alert("कृपया पहले अपनी Gemini API Key दर्ज करें (हेडर में AI Key बटन से)!");
    if (typeof window.openAIKeyModal === "function") window.openAIKeyModal();
    return;
  }

  const container = document.getElementById("pharmacopeiaGrid");
  if (container) {
    container.innerHTML = `
      <div class="col-span-full p-8 bg-purple-50 border border-purple-200 rounded-3xl text-center space-y-3">
        <div class="inline-block animate-spin text-2xl">⏳</div>
        <h4 class="font-bold text-purple-900 text-sm">Gemini 3.8 / 1.5 Flash AI से औषधिय विश्लेषण जारी है...</h4>
        <p class="text-xs text-purple-700">असूचीबद्ध अणु: "${query}" का क्लिनिकल वेटरनरी फार्माकोलॉजी डेटा तैयार हो रहा है</p>
      </div>
    `;
  }

  const prompt = `Act as a Board-Certified Principal Veterinary Pharmacologist. Provide the complete clinical drug monograph in Hindi and English for the veterinary drug/molecule: "${query}".
Format the response clearly with:
1. जेनेरिक व प्रमुख भारतीय एथिकल ब्रांड नाम (Generic & Popular Indian Ethical Brands)
2. क्लिनिकल संकेत (Clinical Indications in Cattle/Buffalo/Goats)
3. सटीक खुराक व रूट (Precise Dose Rate in mg/kg, Route, Frequency)
4. गर्भावस्था सुरक्षा (Pregnancy Safety Profile)
5. विथड्रॉल अवधि (Milk & Meat Withdrawal Period)
6. प्रतिकूल प्रभाव व चेतावनी (Contraindications & Tox Alerts). Keep it clinically concise and authoritative.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 800 }
      })
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      throw new Error("AI से कोई परिणाम प्राप्त नहीं हुआ। कृपया स्पेलिंग जांचें।");
    }

    if (container) {
      container.innerHTML = `
        <div class="col-span-full bg-white border-2 border-purple-300 rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
          <div class="flex justify-between items-center border-b border-purple-100 pb-2">
            <span class="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
              🤖 Gemini AI क्लिनिकल मोनोग्राफ
            </span>
            <button onclick="window.renderPharmacopeia()" class="text-xs text-slate-500 font-bold hover:underline">
              ज्ञानकोश में वापस जाएं ✕
            </button>
          </div>
          <div class="text-xs leading-relaxed text-slate-800 whitespace-pre-wrap font-sans bg-purple-50/40 p-4 rounded-2xl border border-purple-200">
            ${reply}
          </div>
          <button onclick="window.appendCustomAITextToRx('${encodeURIComponent(query)}')" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition">
            + इस AI सारांश को पर्ची में जोड़ें
          </button>
        </div>
      `;
    }
  } catch (err) {
    if (container) {
      container.innerHTML = `
        <div class="col-span-full p-6 bg-rose-50 border border-rose-200 rounded-3xl text-center space-y-2 text-rose-800">
          <h4 class="font-bold text-sm">AI विश्लेषण त्रुटि</h4>
          <p class="text-xs">${err.message || 'नेटवर्क समस्या या अमान्य API Key'}</p>
          <button onclick="window.renderPharmacopeia()" class="text-xs text-blue-600 underline font-bold mt-2">पुनः प्रयास करें</button>
        </div>
      `;
    }
  }
};

/**
 * Appends custom AI pharmacology summary to Prescription.
 */
window.appendCustomAITextToRx = function (encodedDrug) {
  const drug = decodeURIComponent(encodedDrug);
  const rxArea = document.getElementById("opdMedicine");
  if (rxArea) {
    rxArea.value = (rxArea.value ? rxArea.value + "\n" : "") + `• Rx (AI Consult): ${drug} - क्लिनिकल खुराक अनुसार\n`;
  }
  if (typeof window.switchTab === "function") {
    window.switchTab("rx");
  }
};

// ----------------------------------------------------------------------------
// 4. MOUNTING & DOM INITIALIZATION HOOKS
// ----------------------------------------------------------------------------

/**
 * Builds the dedicated Doctor Pharmacopeia and Multi-Organ view containers
 * if they are not pre-rendered in index.html.
 */
window.initializeDoctorEngineDOM = function () {
  // Populate Organ Dropdowns safely
  window.populateSymptomDropdowns();

  // Attach photo input trigger if missing in Prescription View
  const rxSection = document.getElementById("viewRx");
  if (rxSection && !document.getElementById("opdPhotoInputWrapper")) {
    const photoWrapper = document.createElement("div");
    photoWrapper.id = "opdPhotoInputWrapper";
    photoWrapper.className = "flex items-center gap-2 pt-1 pb-1";
    photoWrapper.innerHTML = `
      <label class="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition">
        <span>📷 रोगी/घाव की फोटो जोड़ें</span>
        <input type="file" id="opdPhotoInput" accept="image/*" capture="environment" class="hidden" onchange="window.handleClinicalPhotoUpload(event)" />
      </label>
      <span class="text-[10px] text-slate-400">लाइव कैमरा या गैलरी (स्वतः कंप्रेस)</span>
    `;
    const targetAnchor = document.getElementById("opdDiagnosis");
    if (targetAnchor && targetAnchor.parentNode) {
      targetAnchor.parentNode.insertBefore(photoWrapper, targetAnchor);
    }
  }

  // Inject Pharmacopeia Tab into Doctor Navigation if not present
  const navBar = document.querySelector("nav");
  if (navBar && !document.getElementById("navPharma")) {
    const pharmaBtn = document.createElement("button");
    pharmaBtn.id = "navPharma";
    pharmaBtn.onclick = function () { window.switchTab("pharma"); };
    pharmaBtn.className = "hidden flex-col items-center text-slate-400 hover:text-slate-700 transition";
    pharmaBtn.innerHTML = `
      <span class="text-lg">📚</span>
      <span class="text-[10px] sm:text-xs mt-0.5">ज्ञानकोश</span>
    `;
    navBar.insertBefore(pharmaBtn, navBar.lastElementChild);
  }

  // Inject Pharmacopeia View Section if missing
  const mainElem = document.querySelector("main");
  if (mainElem && !document.getElementById("viewPharma")) {
    const pharmaSec = document.createElement("section");
    pharmaSec.id = "viewPharma";
    pharmaSec.className = "hidden space-y-4";
    pharmaSec.innerHTML = `
      <div class="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-5 text-white shadow-md space-y-2">
        <h2 class="text-base sm:text-lg font-bold flex items-center gap-1.5">
          <span>📚</span> पशु औषध ज्ञानकोश (Veterinary Pharmacopeia)
        </h2>
        <p class="text-xs text-indigo-100">
          30+ प्रमाणित एथिकल व जेनेरिक औषधियां, सटीक खुराक दर, विथड्रॉल अवधि व गर्भावस्था सुरक्षा
        </p>
      </div>

      <!-- Controls & Filter Toolbar -->
      <div class="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
          <input 
            type="text" 
            id="pharmaSearchInput" 
            placeholder="🔍 दवा, साल्ट या रोग खोजें..." 
            oninput="window.filterPharmacopeiaUI()"
            class="bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-slate-800"
          />
          <select id="pharmaCategorySelect" onchange="window.filterPharmacopeiaUI()" class="bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium">
            <option value="ALL">सभी वर्ग (All Categories)</option>
            <option value="Antibiotics">एंटीबायोटिक्स (Antibiotics)</option>
            <option value="NSAID">दर्द व सूजन नाशक (NSAIDs)</option>
            <option value="Antiprotozoal">प्रोटोजोआ नाशक (Antiprotozoal)</option>
            <option value="Anthelmintic">कृमिनाशक (Anthelmintic)</option>
            <option value="Hormone">हार्मोन (Reproductive Hormones)</option>
            <option value="Fluids">इलेक्ट्रोलाइट व ड्रिप (Fluids)</option>
            <option value="Metabolic">उपापचयी व टॉनिक (Metabolic)</option>
            <option value="Corticosteroid">कॉर्टिकोस्टेरॉइड (Steroids)</option>
          </select>
          <select id="pharmaTypeSelect" onchange="window.filterPharmacopeiaUI()" class="bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium">
            <option value="BOTH">एथिकल व जेनेरिक दोनों</option>
            <option value="ETHICAL">केवल एथिकल ब्रांड्स (Ethical)</option>
            <option value="GENERIC">केवल जेनेरिक साल्ट (Generic)</option>
          </select>
          <select id="pharmaSortSelect" onchange="window.filterPharmacopeiaUI()" class="bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium">
            <option value="NAME_ASC">क्रम: A से Z</option>
            <option value="NAME_DESC">क्रम: Z से A</option>
            <option value="MRP_ASC">मूल्य: कम से ज्यादा</option>
            <option value="MRP_DESC">मूल्य: ज्यादा से कम</option>
          </select>
        </div>
      </div>

      <!-- Drug Cards Container -->
      <div id="pharmacopeiaGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"></div>
    `;
    mainElem.appendChild(pharmaSec);
  }
};

// ----------------------------------------------------------------------------
// EXTENSION TO CORE APP SWITCHTAB TO RECOGNIZE PHARMACOPEIA
// ----------------------------------------------------------------------------
(function patchTabSwitching() {
  const origSwitchTab = window.switchTab;
  window.switchTab = function (tabKey) {
    if (typeof origSwitchTab === "function") {
      origSwitchTab(tabKey);
    }

    const pharmaSec = document.getElementById("viewPharma");
    const navPharma = document.getElementById("navPharma");

    if (pharmaSec) {
      if (tabKey === "pharma") {
        pharmaSec.classList.remove("hidden");
        if (navPharma) navPharma.classList.add("active-nav-tab");
        window.renderPharmacopeia();
      } else {
        pharmaSec.classList.add("hidden");
        if (navPharma) navPharma.classList.remove("active-nav-tab");
      }
    }
  };
})();

// Self-bootstrapping on DOM Load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", window.initializeDoctorEngineDOM);
} else {
  window.initializeDoctorEngineDOM();
}
