// Vetcare AI OS - Doctor Clinical Diagnosis, 5-Tier Treatment & Case Intake (2026 Production)

(function () {
  'use strict';

  // =========================================================================
  // 1. STATE & CASE INTAKE REPOSITORY
  // =========================================================================
  let activePatientCase = null;
  let selectedSymptomsState = {};
  let currentDiagnosedDiseaseId = null;

  // LocalStorage keys
  const STORAGE_KEY_ACTIVE_CASE = 'vetcare_active_patient_case';
  const STORAGE_KEY_CASES_LIST = 'vetcare_doctor_cases_history';

  // =========================================================================
  // 2. CLINICAL LAB SCREENING REFERENCE MATRIX (DIFFERENTIAL & CONFIRMATORY)
  // =========================================================================
  const CLINICAL_LAB_TESTS = [
    {
      id: "LAB_01",
      testName: "रक्त स्मीयर जांच (Blood Smear - Giemsa Stain)",
      sampleType: "ईडीटीए रक्त / कान की नस से रक्त की बूंद (Peripheral Blood)",
      differentialRole: "बबेसिओसिस (Babesia), थाइलेरिया (Theileria), एनाप्लाज्मा (Anaplasma) एवं सर्रा (Trypanosoma) प्रोटोजोआ की सूक्ष्मदर्शीय पहचान व विभेदन।",
      estimatedMrp: "₹150 - ₹200",
      turnaroundTime: "25 - 30 मिनट"
    },
    {
      id: "LAB_02",
      testName: "कैलिफ़ोर्निया मैस्टाइटिस टेस्ट (CMT Reagent Test)",
      sampleType: "प्रत्येक थन का ताजा दूध (Fore-milk)",
      differentialRole: "अदृश्य (Subclinical) व तीव्र थनैला का त्वरित निदान; सोमैटिक सेल काउंट (SCC) की वृद्धि का स्तर (Gel formation) 1+, 2+, 3+ मापना।",
      estimatedMrp: "₹50 - ₹80",
      turnaroundTime: "3 - 5 मिनट"
    },
    {
      id: "LAB_03",
      testName: "मूत्र 10-पैरामीटर स्ट्रिप जांच (Urine 10-Para Strip)",
      sampleType: "ताजा मध्य-धारा मूत्र (Midstream Urine)",
      differentialRole: "हेमाट्यूरिया (रक्त) बनाम हीमोग्लोबिन्यूरिया (कॉफी रंग लाल पानी), मूत्र कीटोन (Ketosis), प्रोटीन (Nephritis) व मूत्र pH का स्पष्टीकरण।",
      estimatedMrp: "₹60 - ₹100",
      turnaroundTime: "2 मिनट"
    },
    {
      id: "LAB_04",
      testName: "रूमेन द्रव परीक्षण (Rumen Fluid pH & Protozoal Motility)",
      sampleType: "रूमेन तरल (Stomach Tube / Trocar aspirate)",
      differentialRole: "अम्लीय अपच (Lactic Acidosis, pH < 5.5) बनाम क्षारीय अपच (Alkalosis, pH > 7.5) व रूमेन माइक्रोफ्लोरा की गतिशीलता का मूल्यांकन।",
      estimatedMrp: "₹100 - ₹150",
      turnaroundTime: "15 मिनट"
    },
    {
      id: "LAB_05",
      testName: "गोबर फ्लोटेशन व सेडिमेंटेशन (Faecal Ova Examination)",
      sampleType: "ताजा गोबर (Fresh dung 10g)",
      differentialRole: "लिवर फ्लूक (Fasciola), एम्फिस्टोम (Paramphistomum), राउंडवॉर्म व कोक्सीडिया के अंडों की गणना व विभेदक पहचान।",
      estimatedMrp: "₹80 - ₹120",
      turnaroundTime: "20 - 30 मिनट"
    },
    {
      id: "LAB_06",
      testName: "पूर्ण रक्त गणना (Complete Blood Count - CBC with PCV)",
      sampleType: "EDTA होल ब्लड (2 ml)",
      differentialRole: "गंभीर सेप्टीसीमिया (न्यूट्रोफिलिया), वायरल संक्रमण (ल्यूकोपेनिया), एनीमिया व पैक्ड सेल वॉल्यूम (PCV) का सटीक मापन।",
      estimatedMrp: "₹300 - ₹400",
      turnaroundTime: "2 घंटे"
    }
  ];

  // =========================================================================
  // 3. MASTER CLINICAL 5-TIER TREATMENT & DISEASE KNOWLEDGE MATRIX
  // =========================================================================
  const CLINICAL_DISEASES_REGISTRY = [
    {
      id: "DIS_BABESIA",
      nameHi: "बबेसिओसिस / लाल पेशाब (Bovine Babesiosis / Red Water)",
      symptomsKey: ["fever_high", "urine_red", "mucosa_pale", "ticks", "resp_fast"],
      tempRange: "104°F - 107°F",
      cardinalSign: "कॉफी या गहरे लाल रंग का पेशाब (हीमोग्लोबिन्यूरिया), तेज बुखार व गंभीर रक्ताल्पता।",
      contraindications: ["Dexamethasone (Causes immunosuppression and acute shock)"],
      tier1Parenteral: [
        {
          sn: 1,
          drugName: "Diminazene Aceturate (7%)",
          brandEthical: "Berenil RTU (MSD) / Inj. Nilzene",
          genericAlt: "Inj. Dimina-Vet / Babenil",
          mrpEthical: "₹290 (30ml)",
          mrpGeneric: "₹135 (30ml)",
          dosageRoute: "3.5 mg/kg (1 ml प्रति 20 kg) Deep I/M (केवल एक बार)",
          pregnancySafety: "✅ सुरक्षित (Safe with strict weight-based dosage)"
        },
        {
          sn: 2,
          drugName: "Pheniramine Maleate (Antihistaminic)",
          brandEthical: "Inj. Avil (Sanofi) / Cadilistin",
          genericAlt: "Inj. Pheniramine Vet",
          mrpEthical: "₹95 (100ml)",
          mrpGeneric: "₹45 (100ml)",
          dosageRoute: "10 ml Deep I/M",
          pregnancySafety: "✅ पूर्ण सुरक्षित (Safe)"
        },
        {
          sn: 3,
          drugName: "Mecobalamin + Pyridoxine + Nicotinamide",
          brandEthical: "Inj. Tribivet (Intas) / Neuroxin",
          genericAlt: "Inj. B-Complex Vet",
          mrpEthical: "₹185 (100ml)",
          mrpGeneric: "₹85 (100ml)",
          dosageRoute: "10 - 15 ml I/M",
          pregnancySafety: "✅ पूर्ण सुरक्षित (Safe)"
        },
        {
          sn: 4,
          drugName: "Ferric Hydroxide Polymaltose Complex",
          brandEthical: "Inj. Feritas (Intas) / Imferon",
          genericAlt: "Inj. Iron Dextran Vet",
          mrpEthical: "₹240 (50ml)",
          mrpGeneric: "₹110 (50ml)",
          dosageRoute: "5 - 10 ml Deep I/M (Z-Track technique)",
          pregnancySafety: "✅ सुरक्षित (Safe in all trimesters)"
        },
        {
          sn: 5,
          drugName: "Meloxicam + Paracetamol",
          brandEthical: "Inj. Melonex Plus (Intas)",
          genericAlt: "Inj. Melokem Plus",
          mrpEthical: "₹280 (100ml)",
          mrpGeneric: "₹115 (100ml)",
          dosageRoute: "15 - 20 ml I/M (0.5 mg/kg)",
          pregnancySafety: "✅ सुरक्षित (Safe with adequate hydration)"
        }
      ],
      tier2Oral: [
        { bolusName: "Sharkoferol / Feritas Bolus", salt: "Iron, Cobalt, Copper & Vitamins", dose: "2 बोलस प्रतिदिन 10 दिन", note: "हीमोग्लोबिन निर्माण हेतु" },
        { bolusName: "Rume-Up / Biosacc Bolus", salt: "Live Yeast & Trace Minerals", dose: "2 बोलस सुबह-शाम 5 दिन", note: "रूमेन माइक्रोफ्लोरा पुनर्बहाली" }
      ],
      tier3Ayurvedic: [
        { name: "गिलोय व चिरायता क्वाथ", ingredients: "गिलोय तना 50g, चिरायता 25g, गुड़ 100g", dose: "दिन में दो बार 5 दिन", note: "प्राकृतिक रक्तशोधक व ज्वरनाशक" }
      ],
      tier4Homeopathic: [
        { remedy: "Crotalus Horridus 200C", indication: "तीव्र आंतरिक रक्तस्राव व हीमोग्लोबिन्यूरिया", dose: "15 बूंदें जीभ पर हर 2 घंटे में" },
        { remedy: "Arnica Montana 200C", indication: "कैपिलरी क्षति व थकावट", dose: "10 बूंदें दिन में 3 बार" }
      ],
      tier5Supportive: [
        "पशु को पूर्ण छायादार ठंडे स्थान पर रखें, सीधे धूप से बचाएं।",
        "अत्यधिक मात्रा में ठंडा पानी एक साथ न पिलाएं, थोड़ा-थोड़ा इलेक्ट्रोलाइट्स युक्त पानी दें।",
        "रक्तस्त्राव के समय सख्त तूड़ा न दें, मुलायम हरा चारा व दलिया दें।"
      ]
    },
    {
      id: "DIS_THEILERIA",
      nameHi: "थाइलेरियोसिस / टिक फीवर (Bovine Theileriosis / Turning Sickness)",
      symptomsKey: ["fever_high", "lymph_swollen", "mucosa_pale", "ticks", "lacrimation", "resp_fast"],
      tempRange: "105°F - 107°F",
      cardinalSign: "कंधे के आगे प्री-स्कैपुलर लिम्फ नोड्स में भारी सूजन, आंखों से पानी, तेज बुखार व पीलिया।",
      contraindications: ["Over-dosage of NSAIDs without gastric protectant"],
      tier1Parenteral: [
        {
          sn: 1,
          drugName: "Buparvaquone (50 mg/ml)",
          brandEthical: "Inj. Butalex (MSD) / Zubion (Zydus)",
          genericAlt: "Inj. Bupa-Vet / Theiler-Kill",
          mrpEthical: "₹1,450 (20ml)",
          mrpGeneric: "₹920 (20ml)",
          dosageRoute: "2.5 mg/kg (1 ml प्रति 20 kg) केवल गर्दन में Deep I/M (एक खुराक, यदि आवश्यक हो तो 48 घंटे बाद दोहराएं)",
          pregnancySafety: "✅ सुरक्षित (Safe in pregnancy)"
        },
        {
          sn: 2,
          drugName: "Oxytetracycline 200 mg/ml (Long Acting)",
          brandEthical: "Inj. Terramycin LA (Zoetis) / Oxytetracycline LA",
          genericAlt: "Inj. Oxy-Vet LA",
          mrpEthical: "₹340 (100ml)",
          mrpGeneric: "₹140 (100ml)",
          dosageRoute: "20 mg/kg (1 ml प्रति 10 kg) Deep I/M",
          pregnancySafety: "⚠️ सावधानी (Avoid repeated high dose in 1st trimester)"
        },
        {
          sn: 3,
          drugName: "Flunixin Meglumine (Anti-inflammatory)",
          brandEthical: "Inj. Megludyne (Virbac) / Finadyne",
          genericAlt: "Inj. Flunixin Vet",
          mrpEthical: "₹380 (100ml)",
          mrpGeneric: "₹160 (100ml)",
          dosageRoute: "2.2 mg/kg (1 ml प्रति 45 kg) I/V या I/M",
          pregnancySafety: "✅ सुरक्षित (Safe; avoid near full-term parturition)"
        },
        {
          sn: 4,
          drugName: "Iron Dextran + Vitamin B12",
          brandEthical: "Inj. Imferon / Feritas",
          genericAlt: "Inj. Fer-Dextran Vet",
          mrpEthical: "₹240 (50ml)",
          mrpGeneric: "₹110 (50ml)",
          dosageRoute: "10 ml I/M",
          pregnancySafety: "✅ सुरक्षित (Safe)"
        }
      ],
      tier2Oral: [
        { bolusName: "Liv-52 / Brotone Liver Tonic", salt: "Herbal Hepato-protectant", dose: "50 ml सुबह-शाम 10 दिन", note: "यकृत की सुरक्षा व पीलिया निवारण" },
        { bolusName: "RBC-Up Syrup", salt: "Chelated Iron & Copper", dose: "50 ml प्रतिदिन 7 दिन", note: "आरबीसी काउंट बढ़ाने हेतु" }
      ],
      tier3Ayurvedic: [
        { name: "पुनर्नवा व भूमि आंवला स्वरस", ingredients: "पुनर्नवा 50g, भूमि आंवला 50g, कालमेघ 20g", dose: "दिन में दो बार", note: "लिवर व स्प्लीन की सूजन कम करने हेतु" }
      ],
      tier4Homeopathic: [
        { remedy: "China Officinalis 200C", indication: "तीव्र रक्त क्षय व शरीर में तरल की कमी", dose: "10 बूंदें दिन में 3 बार" },
        { remedy: "Carduus Marianus Q (Mother Tincture)", indication: "यकृत क्षति व पीलिया लक्षण", dose: "20 बूंदें पानी में मिलाकर दिन में 3 बार" }
      ],
      tier5Supportive: [
        "चिचड़ियों (Ticks) के समूल नाश हेतु पशु बाड़े में Butox (Deltamethrin 12.5 mg/ml) का 2 ml/L पानी में छिड़काव करें।",
        "पशु को धूप से बचाएं व सुपाच्य ग्लूकोज-मिश्रित दलिया खिलाएं।"
      ]
    },
    {
      id: "DIS_MASTITIS_ACUTE",
      nameHi: "तीव्र जीवाणु थनैला (Acute Clinical Mastitis)",
      symptomsKey: ["udder_swollen", "udder_hot", "milk_flakes", "milk_blood", "fever_high"],
      tempRange: "103°F - 105°F",
      cardinalSign: "अयन (लेवटी) में पत्थर जैसी कठोर, गर्म व दर्दनाक सूजन, दूध में खून, छिछड़े या मवाद आना।",
      contraindications: ["Dexamethasone in pregnant cows (WILL INDUCE ABORTION in 3rd trimester)"],
      tier1Parenteral: [
        {
          sn: 1,
          drugName: "Ceftiofur Sodium (3rd Gen Cephalosporin)",
          brandEthical: "Inj. Xyrofur 1g (Intas) / Naxcel",
          genericAlt: "Inj. Ceftrochem 1g",
          mrpEthical: "₹450 (1g vial)",
          mrpGeneric: "₹185 (1g vial)",
          dosageRoute: "1.1 - 2.2 mg/kg I/M (1g प्रति 400-500 kg भैंस) लगातार 3 दिन",
          pregnancySafety: "✅ पूर्ण सुरक्षित (Safe in all trimesters & zero milk discard)"
        },
        {
          sn: 2,
          drugName: "Isoflupredone Acetate (Glucocorticoid)",
          brandEthical: "Inj. Predef 2X (Zoetis) / Repose",
          genericAlt: "Inj. Isopred 10ml",
          mrpEthical: "₹220 (10ml)",
          mrpGeneric: "₹95 (10ml)",
          dosageRoute: "10 - 20 mg (5 - 10 ml) Deep I/M (एकल खुराक, अयन की तीव्र सूजन घटाने हेतु)",
          pregnancySafety: "⚠️ उच्च सावधानी (Relatively safer than Dexa, but strictly avoid in advanced 3rd trimester)"
        },
        {
          sn: 3,
          drugName: "Serratiopeptidase + Meloxicam",
          brandEthical: "Inj. Melonex Plus / Flunitas",
          genericAlt: "Inj. Melocam-P",
          mrpEthical: "₹280 (100ml)",
          mrpGeneric: "₹120 (100ml)",
          dosageRoute: "15 - 20 ml I/M",
          pregnancySafety: "✅ सुरक्षित (Safe)"
        },
        {
          sn: 4,
          drugName: "Intramammary Infusion (Cloxacillin + Ampicillin)",
          brandEthical: "Pendistrin-SH (Zydus) / Tilox Infusion",
          genericAlt: "Mammi-Clox Tube",
          mrpEthical: "₹90 प्रति ट्यूब",
          mrpGeneric: "₹45 प्रति ट्यूब",
          dosageRoute: "प्रभावित थन को पूरा खाली कर 1 ट्यूब चढ़ाएं (दिन में दो बार)",
          pregnancySafety: "✅ पूर्ण सुरक्षित (Safe - Local absorption)"
        }
      ],
      tier2Oral: [
        { bolusName: "Mastilep / Mastikare Powder", salt: "Trisodium Citrate, Vit A, D3, E, Selenium", dose: "1 पाउच (50g) प्रतिदिन 5 दिन", note: "अयन का pH 6.5 पर रीसेट करने हेतु" },
        { bolusName: "Serratiopeptidase 60mg Bolus", salt: "Proteolytic Enzyme", dose: "2 बोलस सुबह-शाम 3 दिन", note: "थन की कठोर गांठ व फाइब्रिन गलाने हेतु" }
      ],
      tier3Ayurvedic: [
        { name: "एलोवेरा, हल्दी व बुझा चूना लेप (TDU नुस्खा)", ingredients: "घृतकुमारी 250g, ताजी हल्दी 50g, खाने का चूना 10g", dose: "पेस्ट बनाकर पूरे अयन पर दिन में 4 बार लेप करें", note: "सूजन व लाली 24 घंटे में कम करता है" }
      ],
      tier4Homeopathic: [
        { remedy: "Phytolacca Decandra 200C + Belladonna 200C", indication: "पत्थर जैसा कठोर गर्म थन व दर्द", dose: "15-15 बूंदें जीभ पर हर 3 घंटे में" },
        { remedy: "Silicea 200C", indication: "थन में मवाद व रेशेदार गांठ", dose: "10 बूंदें सुबह-शाम 5 दिन" }
      ],
      tier5Supportive: [
        "प्रभावित थन से हर 2 घंटे में खराब स्राव पूरी तरह बाहर निकालें (Frequent stripping)।",
        "गर्म या ठंडे पानी की सिकाई: शुरुआत में बर्फ/ठंडा पानी, 24 घंटे बाद गुनगुने पानी में फिटकरी डालकर सिकाई।",
        "फर्श को सूखा व जीवाणुरहित रखें।"
      ]
    },
    {
      id: "DIS_KETOSIS",
      nameHi: "कीटोसिस / एसिटोनेमिया (Bovine Ketosis / Acetonemia)",
      symptomsKey: ["feed_off", "milk_drop", "sweet_breath", "constipation", "nervous_signs"],
      tempRange: "99.5°F - 101.5°F (Normal/Subnormal)",
      cardinalSign: "सांस, पेशाब व दूध से मीठी एसीटोन गंध, केवल सूखा तूड़ा खाना पर दाना-खल बिल्कुल न छूना।",
      contraindications: ["Dextrose 5% (Too diluted; use 25% or 50% only)", "Excessive starvation"],
      tier1Parenteral: [
        {
          sn: 1,
          drugName: "Dextrose (25% or 50% High Density)",
          brandEthical: "Inj. Dex-50 (500ml) / Dextrose 25%",
          genericAlt: "Inj. Dextrose 25% Vet",
          mrpEthical: "₹180 (500ml)",
          mrpGeneric: "₹85 (500ml)",
          dosageRoute: "500 - 1000 ml Slow I/V (गर्म करके शरीर के तापमान पर)",
          pregnancySafety: "✅ पूर्ण सुरक्षित (Safe)"
        },
        {
          sn: 2,
          drugName: "Isoflupredone Acetate (10mg/5ml)",
          brandEthical: "Inj. Predef 2X (Zoetis)",
          genericAlt: "Inj. Isopred 10ml",
          mrpEthical: "₹220 (10ml)",
          mrpGeneric: "₹95 (10ml)",
          dosageRoute: "10 - 20 mg I/M (ग्लूकोनियोजेनेसिस उत्तेजित करने हेतु)",
          pregnancySafety: "⚠️ सावधानी (Do not administer in pregnant cows; indicated mainly in post-partum period)"
        },
        {
          sn: 3,
          drugName: "Vitamin B1 + B6 + B12 (High Potency)",
          brandEthical: "Inj. Tribivet (Intas) / Neuroxin",
          genericAlt: "Inj. B-Complex Vet",
          mrpEthical: "₹185 (100ml)",
          mrpGeneric: "₹85 (100ml)",
          dosageRoute: "15 ml I/M या ड्रिप में मिलाकर",
          pregnancySafety: "✅ पूर्ण सुरक्षित (Safe)"
        },
        {
          sn: 4,
          drugName: "Phosphorus + Vitamin B12",
          brandEthical: "Inj. Tonophosphan (MSD) / Urimin",
          genericAlt: "Inj. Tono-Vet",
          mrpEthical: "₹360 (30ml)",
          mrpGeneric: "₹160 (30ml)",
          dosageRoute: "10 ml I/M वैकल्पिक दिन पर",
          pregnancySafety: "✅ पूर्ण सुरक्षित (Safe)"
        }
      ],
      tier2Oral: [
        { bolusName: "Propylene Glycol / Glycerol Liquid", salt: "Gluconeogenic Precursor", dose: "200 ml सुबह-शाम 3 दिन, फिर 100 ml 2 दिन", note: "रक्त शर्करा को तेजी से सामान्य करता है" },
        { bolusName: "Ketolact / E-Booster Liquid", salt: "Cobalt, Nicotinamide, Choline, Propylene Glycol", dose: "100 ml प्रतिदिन 5 दिन", note: "यकृत व रूमेन मेटाबॉलिज्म संवर्धन" }
      ],
      tier3Ayurvedic: [
        { name: "गुड़, सोंठ व अजवाइन पाचक पेड़ा", ingredients: "पुराना गुड़ 300g, सोंठ 50g, अजवाइन 50g, खाने की ग्लिसरीन 50ml", dose: "प्रतिदिन 4 दिन", note: "रूमेन में ऊर्जा व किण्वन संतुलन" }
      ],
      tier4Homeopathic: [
        { remedy: "Nux Vomica 200C", indication: "दाना न खाना, कब्ज व पाचन तंत्र की सुस्ती", dose: "15 बूंदें दिन में 3 बार" },
        { remedy: "Lycopodium 200C", indication: "यकृत दुर्बलता व वजन में तीव्र गिरावट", dose: "10 बूंदें दिन में दो बार" }
      ],
      tier5Supportive: [
        "दाना आहार में अचानक परिवर्तन न करें; मक्के का दलिया व आसानी से पचने वाला कार्बोहाइड्रेट दें।",
        "यीस्ट कल्चर (Saccharomyces cerevisiae 25g/day) आहार में जोड़ें ताकि रूमेन जीवाणु सक्रिय रहें।"
      ]
    },
    {
      id: "DIS_MILK_FEVER",
      nameHi: "मिल्क फीवर / हाइपोकैल्सीमिया (Hypocalcemia / Parturient Paresis)",
      symptomsKey: ["downer_cow", "neck_s_curve", "cold_extremities", "pupils_dilated", "temp_subnormal"],
      tempRange: "96°F - 100°F (Subnormal)",
      cardinalSign: "ब्याने के 24-72 घंटे में गर्दन को छाती की ओर मोड़कर 'S' आकार में बैठ जाना, कान व सींग ठंडे पड़ना।",
      contraindications: ["Oral drenching in unconscious/sternal cow (Severe risk of aspiration pneumonia)", "Rapid intravenous calcium injection (Risk of fatal cardiac arrest)"],
      tier1Parenteral: [
        {
          sn: 1,
          drugName: "Calcium Borogluconate (25%) + Mag + Phos + Dextrose",
          brandEthical: "Inj. Mifex (Novartis/Elanco) / Calborol",
          genericAlt: "Inj. Calci-Vet Forte (450ml)",
          mrpEthical: "₹310 (450ml)",
          mrpGeneric: "₹145 (450ml)",
          dosageRoute: "450 ml कुल: 250 ml अत्यंत धीमी गति से I/V (हृदय गति मॉनिटर करते हुए) एवं 200 ml गर्दन की दोनों तरफ S/C",
          pregnancySafety: "✅ जीवन रक्षक (Life saving - Indicated strictly post-calving)"
        },
        {
          sn: 2,
          drugName: "Phosphorus & Vitamin B12",
          brandEthical: "Inj. Tonophosphan (MSD)",
          genericAlt: "Inj. Phospha-Vet",
          mrpEthical: "₹360 (30ml)",
          mrpGeneric: "₹160 (30ml)",
          dosageRoute: "10 - 15 ml I/M या ड्रिप में",
          pregnancySafety: "✅ पूर्ण सुरक्षित (Safe)"
        },
        {
          sn: 3,
          drugName: "Vitamin E + Sodium Selenite",
          brandEthical: "Inj. Repanto / E-Care Se",
          genericAlt: "Inj. Selen-Vet",
          mrpEthical: "₹210 (10ml)",
          mrpGeneric: "₹95 (10ml)",
          dosageRoute: "10 ml Deep I/M",
          pregnancySafety: "✅ सुरक्षित (Safe)"
        }
      ],
      tier2Oral: [
        { bolusName: "Oral Calcium Gel (Ionic Calcium)", salt: "Calcium Chloride & Propionate Gel", dose: "1 बोतल (300g) होश में आने के बाद, दूसरी 12 घंटे बाद", note: "पुनः बैठने (Relapse) से रोकने हेतु" }
      ],
      tier3Ayurvedic: [
        { name: "गुड़ व चूने का निथरा जल", ingredients: "पुराना गुड़ 250g, चूने का निथरा हुआ पानी 200ml, सोंठ 25g", dose: "पूर्ण चेतना में आने के बाद पिलाएं", note: "शरीर में प्राकृतिक गर्मी व कैल्शियम अवशोषण" }
      ],
      tier4Homeopathic: [
        { remedy: "Calcarea Phosphorica 200C", indication: "हड्डियों व सीरम में कैल्शियम का असंतुलन", dose: "15 बूंदें जीभ पर दिन में 3 बार" },
        { remedy: "Causticum 200C", indication: "पैरों की नसों की दुर्बलता व उठने में असमर्थता", dose: "10 बूंदें दिन में 3 बार" }
      ],
      tier5Supportive: [
        "कैल्शियम आई.वी. चढ़ाते समय स्टेथोस्कोप से हृदय की धड़कन लगातार सुनें; धड़कन अनियमित होते ही ड्रिप रोकें।",
        "ब्याने के बाद पहले 48 घंटे में थनों से पूरा दूध एक साथ न दुहें, केवल बछड़े के पीने भर का दूध निकालें।"
      ]
    },
    {
      id: "DIS_HS",
      nameHi: "गलघोंटू रोग / एच.एस. (Haemorrhagic Septicaemia)",
      symptomsKey: ["fever_high", "neck_swelling", "stridor_sound", "tongue_protruding", "resp_fast"],
      tempRange: "105°F - 107°F",
      cardinalSign: "गले व जबड़े के नीचे गर्म दर्दनाक सूजन, सांस लेते समय घर्र-घर्र की आवाज, मुंह से जीभ बाहर निकलना।",
      contraindications: ["Delaying antibiotic therapy (Fatal within 12 hours)"],
      tier1Parenteral: [
        {
          sn: 1,
          drugName: "Ceftiofur Sodium 1g OR Oxytetracycline LA 200mg/ml",
          brandEthical: "Inj. Xyrofur 1g (Intas) / Terramycin LA",
          genericAlt: "Inj. Ceftrochem 1g / Oxy-Vet LA",
          mrpEthical: "₹450 (1g) / ₹340 (100ml)",
          mrpGeneric: "₹185 (1g) / ₹140 (100ml)",
          dosageRoute: "Ceftiofur 1g प्रति 400kg I/M OR Oxytetracycline LA 20 mg/kg Deep I/M",
          pregnancySafety: "✅ Ceftiofur सुरक्षित (Ceftiofur is Pregnancy Safe; OTC cautious)"
        },
        {
          sn: 2,
          drugName: "Flunixin Meglumine (Endotoxin neutralizer)",
          brandEthical: "Inj. Megludyne (Virbac)",
          genericAlt: "Inj. Flunixin Vet",
          mrpEthical: "₹380 (100ml)",
          mrpGeneric: "₹160 (100ml)",
          dosageRoute: "2.2 mg/kg I/V अत्यंत लाभकारी (फेफड़ों व गले की सूजन घटाता है)",
          pregnancySafety: "✅ सुरक्षित (Safe)"
        },
        {
          sn: 3,
          drugName: "Dexamethasone Sodium Phosphate",
          brandEthical: "Inj. Dexona (Zydus)",
          genericAlt: "Inj. Dexa-Vet",
          mrpEthical: "₹120 (100ml)",
          mrpGeneric: "₹55 (100ml)",
          dosageRoute: "10 ml I/V या I/M (आपातकालीन श्वासावरोध रोकने हेतु)",
          pregnancySafety: "❌ अत्यंत असुरक्षित (WILL CAUSE ABORTION in 3rd trimester - Use Isoflupredone if pregnant!)"
        }
      ],
      tier2Oral: [
        { bolusName: "Serratiopeptidase Bolus", salt: "Anti-edematous enzyme", dose: "2 बोलस दिन में दो बार 3 दिन", note: "गले की सूजन घटाने हेतु" }
      ],
      tier3Ayurvedic: [
        { name: "कपूर व अजवाइन की भाप / धूनी", ingredients: "कपूर 10g, अजवाइन 25g की धीमी धूनी", dose: "बाड़े में श्वास सुगमता हेतु", note: "कंजेशन दूर करने में सहायक" }
      ],
      tier4Homeopathic: [
        { remedy: "Aconitum Napellus 1M", indication: "अति-तीव्र अवस्था, बेचैनी व तेज बुखार", dose: "10 बूंदें हर 1 घंटे में 3 बार" },
        { remedy: "Belladonna 200C", indication: "गले में लालिमा व गर्म सूजन", dose: "15 बूंदें हर 2 घंटे में" }
      ],
      tier5Supportive: [
        "बीमार पशु को स्वस्थ झुंड से तुरंत अलग करें।",
        "गले पर ठंडे पानी की धार डालें और यदि दम घुट रहा हो तो आपातकालीन ट्रेकियोस्टोमी (Tracheostomy) की तैयारी रखें।"
      ]
    }
  ];

  // =========================================================================
  // 4. SHAEFFER'S BODY WEIGHT & DRUG DOSAGE CALCULATOR
  // =========================================================================
  window.calculateShaefferWeight = function () {
    const girthInches = parseFloat(document.getElementById('inputHeartGirth')?.value) || 0;
    const lengthInches = parseFloat(document.getElementById('inputBodyLength')?.value) || 0;

    const resultBox = document.getElementById('calcWeightResult');
    const autoWeightInput = document.getElementById('caseAnimalWeight');

    if (girthInches <= 0 || lengthInches <= 0) {
      if (resultBox) resultBox.innerHTML = '<span class="text-rose-600 font-bold">कृपया सीने का घेरा (Girth) व लंबाई (Length) इंच में दर्ज करें।</span>';
      return 0;
    }

    // Shaeffer's Formula: Weight in lbs = (Girth^2 * Length) / 300
    // Weight in kg = Weight in lbs * 0.45359237
    const weightLbs = (Math.pow(girthInches, 2) * lengthInches) / 300;
    const weightKg = Math.round(weightLbs * 0.45359237);

    if (resultBox) {
      resultBox.innerHTML = `
        <div class="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 font-bold flex items-center justify-between">
          <span>अनुमानित वजन (Shaeffer's Weight):</span>
          <span class="text-base font-black text-emerald-700">${weightKg} किग्रा (${Math.round(weightLbs)} lbs)</span>
        </div>
      `;
    }

    if (autoWeightInput) {
      autoWeightInput.value = weightKg;
    }

    // Refresh inline dosage calculation if drug selected
    window.calculateDrugDosage();
    return weightKg;
  };

  window.calculateDrugDosage = function () {
    const weightKg = parseFloat(document.getElementById('caseAnimalWeight')?.value) || 
                     parseFloat(document.getElementById('calcDoseWeightInput')?.value) || 0;
    const drugSelector = document.getElementById('selectDosageDrug');
    const customMgPerKg = parseFloat(document.getElementById('customDoseMgKg')?.value) || 0;
    const customConcMgMl = parseFloat(document.getElementById('customConcMgMl')?.value) || 0;
    const outDisplay = document.getElementById('calcDoseOutputArea');

    if (!outDisplay) return;

    if (weightKg <= 0) {
      outDisplay.innerHTML = `<span class="text-slate-400">वजन दर्ज करें ताकि सटीक ml डोज़ की गणना हो सके।</span>`;
      return;
    }

    let drugName = "कस्टम दवा";
    let doseMgKg = customMgPerKg;
    let concMgMl = customConcMgMl;

    const selectedDrugVal = drugSelector ? drugSelector.value : 'CUSTOM';

    // Standard pre-sets
    if (selectedDrugVal === 'CEFTIOFUR') {
      drugName = "Ceftiofur Sodium (1g vial)";
      doseMgKg = 1.5; // mg/kg
      concMgMl = 50;  // 1g diluted in 20ml = 50mg/ml
    } else if (selectedDrugVal === 'MELOXICAM') {
      drugName = "Meloxicam (Melonex 5mg/ml)";
      doseMgKg = 0.5;
      concMgMl = 5;
    } else if (selectedDrugVal === 'DIMINAZENE') {
      drugName = "Diminazene Aceturate (Berenil 70mg/ml)";
      doseMgKg = 3.5;
      concMgMl = 70;
    } else if (selectedDrugVal === 'BUPARVAQUONE') {
      drugName = "Buparvaquone (Butalex 50mg/ml)";
      doseMgKg = 2.5;
      concMgMl = 50;
    } else if (selectedDrugVal === 'OXYTETRA_LA') {
      drugName = "Oxytetracycline LA (200mg/ml)";
      doseMgKg = 20.0;
      concMgMl = 200;
    } else if (selectedDrugVal === 'FLUNIXIN') {
      drugName = "Flunixin Meglumine (50mg/ml)";
      doseMgKg = 2.2;
      concMgMl = 50;
    }

    if (doseMgKg <= 0 || concMgMl <= 0) {
      outDisplay.innerHTML = `<span class="text-amber-700">कृपया खुराक दर (mg/kg) व सांद्रता (mg/ml) दर्ज करें।</span>`;
      return;
    }

    // Formula: ml = (Weight * DoseRate) / Concentration
    const totalMg = weightKg * doseMgKg;
    const totalMl = (totalMg / concMgMl).toFixed(1);

    outDisplay.innerHTML = `
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs space-y-1">
        <div class="flex items-center justify-between text-blue-900 font-bold">
          <span>${drugName}</span>
          <span class="text-sm font-black text-blue-700">${totalMl} ml</span>
        </div>
        <p class="text-[10px] text-slate-600">
          वजन: ${weightKg}kg × खुराक दर: ${doseMgKg} mg/kg = कुल एक्टिव घटक: ${totalMg.toFixed(1)} mg (सांद्रता: ${concMgMl} mg/ml)
        </p>
      </div>
    `;
  };

  // =========================================================================
  // 5. CASE INTAKE REGISTRATION WORKFLOW
  // =========================================================================
  window.saveCaseIntakeAndDiagnose = function () {
    const caseNo = document.getElementById('caseNumberInput')?.value.trim() || ('CAS-' + Date.now().toString().slice(-6));
    const ownerName = document.getElementById('caseOwnerName')?.value.trim();
    const ownerMobile = document.getElementById('caseOwnerMobile')?.value.trim();
    const village = document.getElementById('caseOwnerVillage')?.value.trim();
    const species = document.getElementById('caseAnimalSpecies')?.value || 'गाय';
    const breed = document.getElementById('caseAnimalBreed')?.value.trim() || 'देशी/मिश्रित';
    const age = document.getElementById('caseAnimalAge')?.value.trim() || 'वयस्क';
    const weight = parseFloat(document.getElementById('caseAnimalWeight')?.value) || 0;
    const gender = document.getElementById('caseAnimalGender')?.value || 'मादा (Female)';
    const pregnancy = document.getElementById('caseAnimalPregnancy')?.value || 'खाली (Non-Pregnant)';

    if (!ownerName || !ownerMobile) {
      alert('कृपया पशुपालक का नाम और 10-अंकीय मोबाइल नंबर अवश्य भरें!');
      return;
    }

    activePatientCase = {
      caseNo,
      ownerName,
      ownerMobile,
      village,
      species,
      breed,
      age,
      weight,
      gender,
      pregnancy,
      intakeTimestamp: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY_ACTIVE_CASE, JSON.stringify(activePatientCase));

    // Also push to history
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem(STORAGE_KEY_CASES_LIST)) || [];
    } catch (e) { history = []; }
    history.unshift(activePatientCase);
    localStorage.setItem(STORAGE_KEY_CASES_LIST, JSON.stringify(history.slice(0, 50)));

    alert(`✅ केस सफलतापूर्वक सुरक्षित!\nकेस सं: ${caseNo}\nपशु: ${species} (${breed}) • गर्भावस्था: ${pregnancy}\n\nअब नीचे लक्षण चयन व 5-स्तरीय उपचार देखें।`);

    // Pre-populate Digital OPD Pad if available
    const opdFarmerName = document.getElementById('opdFarmerName');
    const opdFarmerPhone = document.getElementById('opdFarmerPhone');
    const opdVillage = document.getElementById('opdVillage');
    const opdAnimal = document.getElementById('opdAnimal');
    const opdPregnancy = document.getElementById('opdPregnancy');

    if (opdFarmerName) opdFarmerName.value = ownerName;
    if (opdFarmerPhone) opdFarmerPhone.value = ownerMobile;
    if (opdVillage) opdVillage.value = village;
    if (opdAnimal) opdAnimal.value = species;
    if (opdPregnancy) opdPregnancy.value = pregnancy;

    renderActiveCaseBanner();
    window.runDoctorProbabilityDiagnosis();
  };

  function renderActiveCaseBanner() {
    const bannerBox = document.getElementById('activeCaseSummaryBanner');
    if (!bannerBox) return;

    if (!activePatientCase) {
      bannerBox.innerHTML = `
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center justify-between">
          <span>⚠️ कोई सक्रिय केस पंजीकृत नहीं है। कृपया ऊपर केस विवरण भरें।</span>
        </div>
      `;
      return;
    }

    const isPreg = activePatientCase.pregnancy.includes('गाभिन');
    const pregBadge = isPreg 
      ? `<span class="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full border border-rose-300">🤰 ${activePatientCase.pregnancy}</span>`
      : `<span class="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-full">${activePatientCase.pregnancy}</span>`;

    bannerBox.innerHTML = `
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-3 sm:p-4 text-xs space-y-2">
        <div class="flex items-center justify-between border-b border-blue-200/60 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-lg">🩺</span>
            <div>
              <span class="font-black text-slate-900 text-sm">${activePatientCase.ownerName} (${activePatientCase.village || 'गाँव दर्ज नहीं'})</span>
              <span class="text-slate-500 font-mono text-[10px] ml-2">#${activePatientCase.caseNo}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            ${pregBadge}
            <span class="font-bold text-blue-700">${activePatientCase.species} • ${activePatientCase.weight ? activePatientCase.weight + ' kg' : 'वजन अप्रविष्ट'}</span>
          </div>
        </div>
        <div class="text-[11px] text-slate-600 flex flex-wrap gap-4">
          <span>📱 मो: ${activePatientCase.ownerMobile}</span>
          <span>🧬 नस्ल: ${activePatientCase.breed}</span>
          <span>🎂 आयु: ${activePatientCase.age}</span>
          <span>⚧ लिंग: ${activePatientCase.gender}</span>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 6. OFFLINE SYMPTOM CHECKLIST & PROBABILITY DIAGNOSIS ENGINE
  // =========================================================================
  window.handleSymptomCheckboxChange = function (symptomKey, isChecked) {
    if (isChecked) {
      selectedSymptomsState[symptomKey] = true;
    } else {
      delete selectedSymptomsState[symptomKey];
    }
    window.runDoctorProbabilityDiagnosis();
  };

  window.runDoctorProbabilityDiagnosis = function () {
    const resultsContainer = document.getElementById('diseaseSearchResults');
    if (!resultsContainer) return;

    const activeKeys = Object.keys(selectedSymptomsState);

    if (activeKeys.length === 0) {
      // Default: render top clinical diseases with neutral ranking
      renderRankedDiseasesList(CLINICAL_DISEASES_REGISTRY.map(d => ({ ...d, score: 0 })));
      return;
    }

    // Compute probability score based on matching cardinal keys
    const scoredList = CLINICAL_DISEASES_REGISTRY.map(dis => {
      let matchedCount = 0;
      dis.symptomsKey.forEach(k => {
        if (selectedSymptomsState[k]) matchedCount++;
      });
      const probability = Math.round((matchedCount / dis.symptomsKey.length) * 100);
      return {
        ...dis,
        matchedCount,
        score: probability
      };
    });

    // Sort descending by score
    scoredList.sort((a, b) => b.score - a.score);
    renderRankedDiseasesList(scoredList);
  };

  function renderRankedDiseasesList(list) {
    const container = document.getElementById('diseaseSearchResults');
    if (!container) return;

    container.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-black text-slate-900 flex items-center gap-1.5">
            <i class="fa-solid fa-chart-pie text-blue-600"></i>
            <span>क्लिनिकल रोग संभावना एवं 5-स्तरीय प्रोटोकॉल (Diagnosis & 5-Tier Treatment)</span>
          </h3>
          <span class="text-[10px] text-slate-500 font-bold">लक्षणों के आधार पर लाइव मिलान</span>
        </div>

        <div class="space-y-3">
          ${list.map(disease => {
            const isMatch = disease.score > 0;
            const scoreColor = disease.score >= 60 ? 'bg-emerald-600 text-white' : (disease.score >= 30 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700');
            return `
              <div class="bg-white border-2 ${isMatch ? 'border-blue-400 shadow-sm' : 'border-slate-200'} rounded-3xl p-4 sm:p-5 space-y-3 transition">
                <div class="flex items-start justify-between gap-3 border-b border-slate-100 pb-2.5">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-black text-slate-900">${disease.nameHi}</span>
                      <span class="text-[10px] font-mono text-slate-400">(${disease.id})</span>
                    </div>
                    <p class="text-[11px] text-slate-600 mt-0.5"><strong>कार्डिनल पहचान:</strong> ${disease.cardinalSign}</p>
                  </div>
                  <div class="text-right shrink-0">
                    <span class="text-[10px] font-bold px-2 py-1 rounded-xl ${scoreColor}">
                      संभावना: ${disease.score}%
                    </span>
                    <span class="block text-[9px] text-slate-400 mt-1 font-mono">तापमान: ${disease.tempRange}</span>
                  </div>
                </div>

                <!-- BUTTON TO EXPAND 5-TIER PROTOCOL -->
                <div class="flex items-center justify-between pt-1">
                  <span class="text-[10px] text-slate-500 font-semibold">
                    ${disease.tier1Parenteral.length} इंजेक्शन • बोलस • हर्बल • होम्योपैथी • देसी
                  </span>
                  <button 
                    type="button" 
                    onclick="window.render5TierTreatment('${disease.id}')" 
                    class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-xl text-xs transition shadow-xs flex items-center gap-1 active:scale-98"
                  >
                    <span>🔬 5-स्तरीय उपचार तालिका खोलें</span>
                    <i class="fa-solid fa-angle-right"></i>
                  </button>
                </div>

                <!-- INLINE CONTAINER FOR 5-TIER TABLE -->
                <div id="tierContainer_${disease.id}" class="hidden pt-3 border-t border-slate-100 space-y-4"></div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 7. 5-TIER CLINICAL PROTOCOL RENDERER WITH LOUD PREGNANCY CONTRAINDICATION
  // =========================================================================
  window.render5TierTreatment = function (diseaseId) {
    const targetDiv = document.getElementById(`tierContainer_${diseaseId}`);
    if (!targetDiv) return;

    // Toggle collapse if already open
    if (!targetDiv.classList.contains('hidden') && currentDiagnosedDiseaseId === diseaseId) {
      targetDiv.classList.add('hidden');
      currentDiagnosedDiseaseId = null;
      return;
    }

    currentDiagnosedDiseaseId = diseaseId;
    targetDiv.classList.remove('hidden');

    const disease = CLINICAL_DISEASES_REGISTRY.find(d => d.id === diseaseId);
    if (!disease) return;

    // Pregnancy Contraindication Alert Logic
    let pregnancyWarningHtml = '';
    const isPregnant = activePatientCase && activePatientCase.pregnancy && activePatientCase.pregnancy.includes('गाभिन');

    if (isPregnant) {
      pregnancyWarningHtml = `
        <div class="bg-rose-600 text-white p-3.5 sm:p-4 rounded-2xl shadow-md border-2 border-rose-800 space-y-1.5 animate-pulse">
          <div class="flex items-center gap-2 font-black text-xs sm:text-sm">
            <i class="fa-solid fa-triangle-exclamation text-amber-300 text-lg"></i>
            <span>⚠️ वैधानिक चेतावनी: पशु ${activePatientCase.pregnancy} घोषित है!</span>
          </div>
          <p class="text-[11px] text-rose-100 leading-relaxed">
            इस अवस्था में <strong>Dexamethasone, उच्च खुराक Corticosteroids, Prostaglandin (PGF2α)</strong> अथवा गर्भाशय संकुचक दवाएं कदापि न दें (गर्भपात का 100% खतरा)। नीचे दी गई तालिका में गर्भावस्था सुरक्षा कॉलम अवश्य जांचें।
          </p>
        </div>
      `;
    }

    // TIER 1: PARENTERAL TABLE
    const tier1Rows = disease.tier1Parenteral.map(row => {
      const isUnsafe = row.pregnancySafety.includes('असुरक्षित') || row.pregnancySafety.includes('CAUTION') || row.pregnancySafety.includes('सावधानी');
      const safeClass = isUnsafe ? 'text-rose-700 font-bold bg-rose-50' : 'text-emerald-800 font-medium bg-emerald-50';
      return `
        <tr class="border-b border-slate-200 hover:bg-slate-50 text-[11px]">
          <td class="p-2 text-center font-mono font-bold">${row.sn}</td>
          <td class="p-2 font-bold text-slate-900">${row.drugName}</td>
          <td class="p-2 font-semibold text-blue-800">${row.brandEthical}</td>
          <td class="p-2 text-slate-600">${row.genericAlt}</td>
          <td class="p-2 font-mono text-slate-800">${row.mrpEthical}</td>
          <td class="p-2 font-mono text-emerald-700 font-bold">${row.mrpGeneric}</td>
          <td class="p-2 font-bold text-purple-900">${row.dosageRoute}</td>
          <td class="p-2 text-[10px] ${safeClass} rounded-lg">${row.pregnancySafety}</td>
        </tr>
      `;
    }).join('');

    // TIER 2: ORAL BOLUS TABLE
    const tier2Rows = disease.tier2Oral.map((row, i) => `
      <tr class="border-b border-slate-100 text-[11px]">
        <td class="p-2 font-mono">${i + 1}</td>
        <td class="p-2 font-bold text-blue-900">${row.bolusName}</td>
        <td class="p-2 text-slate-700">${row.salt}</td>
        <td class="p-2 font-bold text-purple-800">${row.dose}</td>
        <td class="p-2 text-slate-500">${row.note}</td>
      </tr>
    `).join('');

    // TIER 3: AYURVEDIC
    const tier3Html = disease.tier3Ayurvedic.map(ay => `
      <div class="bg-amber-50/60 border border-amber-200 rounded-xl p-3 text-[11px] space-y-1">
        <div class="font-bold text-amber-900">🌿 ${ay.name}</div>
        <p class="text-slate-700"><strong>घटक:</strong> ${ay.ingredients}</p>
        <p class="text-emerald-800 font-semibold"><strong>खुराक:</strong> ${ay.dose} (${ay.note})</p>
      </div>
    `).join('');

    // TIER 4: HOMEOPATHIC
    const tier4Html = disease.tier4Homeopathic.map(hom => `
      <div class="bg-purple-50/60 border border-purple-200 rounded-xl p-3 text-[11px] space-y-1">
        <div class="font-bold text-purple-900">💧 ${hom.remedy}</div>
        <p class="text-slate-700"><strong>लक्षण संकेत:</strong> ${hom.indication}</p>
        <p class="text-purple-800 font-semibold"><strong>खुराक:</strong> ${hom.dose}</p>
      </div>
    `).join('');

    // TIER 5: SUPPORTIVE
    const tier5Html = disease.tier5Supportive.map(sup => `
      <li class="text-[11px] text-slate-700 leading-relaxed">${sup}</li>
    `).join('');

    targetDiv.innerHTML = `
      <div class="space-y-4 pt-2">
        ${pregnancyWarningHtml}

        <!-- 1-CLICK OPD SLIP COPY BUTTON -->
        <div class="flex justify-end">
          <button 
            type="button" 
            onclick="window.copyTreatmentToOpdField('${disease.id}')" 
            class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-xl text-xs transition flex items-center gap-1.5 shadow-xs"
          >
            <i class="fa-solid fa-copy"></i>
            <span>यह 5-स्तरीय पर्ची डिजिटल OPD पैड में ट्रांसफर करें</span>
          </button>
        </div>

        <!-- TIER 1 TABLE -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-black text-blue-900 flex items-center gap-1.5">
              <span>💉 टियर 1: पैरेंट्रल एलोपैथिक इंजेक्शन (Parenteral Injections Table)</span>
            </h4>
            <span class="text-[10px] text-slate-500">एथिकल बनाम जेनेरिक तुलनात्मक MRP</span>
          </div>

          <div class="overflow-x-auto border border-slate-200 rounded-2xl bg-white">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold text-[10px] border-b border-slate-200 uppercase">
                  <th class="p-2 text-center">क्र.</th>
                  <th class="p-2">दवा / साल्ट</th>
                  <th class="p-2">एथिकल ब्रांड</th>
                  <th class="p-2">जेनेरिक विकल्प</th>
                  <th class="p-2">एथिकल MRP</th>
                  <th class="p-2">जेनेरिक MRP</th>
                  <th class="p-2">खुराक व रूट</th>
                  <th class="p-2">गर्भावस्था सुरक्षा</th>
                </tr>
              </thead>
              <tbody>
                ${tier1Rows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- TIER 2 TABLE -->
        <div class="space-y-1.5">
          <h4 class="text-xs font-black text-indigo-900 flex items-center gap-1.5">
            <span>💊 टियर 2: ओरल बोलस व टॉनिक (Oral Bolus & Tonics)</span>
          </h4>
          <div class="overflow-x-auto border border-slate-200 rounded-2xl bg-white">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold text-[10px] border-b border-slate-200">
                  <th class="p-2">क्र.</th>
                  <th class="p-2">बोलस / सिरप नाम</th>
                  <th class="p-2">सक्रिय घटक</th>
                  <th class="p-2">खुराक व अवधि</th>
                  <th class="p-2">उपयोग उद्देश्य</th>
                </tr>
              </thead>
              <tbody>
                ${tier2Rows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- TIER 3 & 4 GRID -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <!-- TIER 3 -->
          <div class="space-y-1.5 bg-white border border-slate-200 p-3.5 rounded-2xl">
            <h4 class="text-xs font-black text-amber-900 flex items-center gap-1.5">
              <span>🌿 टियर 3: आयुर्वेदिक व हर्बल क्वाथ (Ayurvedic Formulations)</span>
            </h4>
            <div class="space-y-2">
              ${tier3Html}
            </div>
          </div>

          <!-- TIER 4 -->
          <div class="space-y-1.5 bg-white border border-slate-200 p-3.5 rounded-2xl">
            <h4 class="text-xs font-black text-purple-900 flex items-center gap-1.5">
              <span>💧 टियर 4: होम्योपैथिक विशिष्ट उपचार (Homeopathic Remedies)</span>
            </h4>
            <div class="space-y-2">
              ${tier4Html}
            </div>
          </div>
        </div>

        <!-- TIER 5 -->
        <div class="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-1.5">
          <h4 class="text-xs font-black text-slate-800 flex items-center gap-1.5">
            <span>🛡️ टियर 5: सहायक व नर्सिंग देखभाल (Supportive & Desi Management)</span>
          </h4>
          <ul class="list-disc pl-4 space-y-1">
            ${tier5Html}
          </ul>
        </div>
      </div>
    `;
  };

  window.copyTreatmentToOpdField = function (diseaseId) {
    const disease = CLINICAL_DISEASES_REGISTRY.find(d => d.id === diseaseId);
    if (!disease) return;

    const opdDiagnosis = document.getElementById('opdDiagnosis');
    const opdMedicine = document.getElementById('opdMedicine');

    if (opdDiagnosis) {
      opdDiagnosis.value = disease.nameHi;
    }

    if (opdMedicine) {
      let rxText = `=== Rx Prescriptions (5-Tier Protocol) ===\n\n`;
      rxText += `[TIER 1 - INJECTIONS]:\n`;
      disease.tier1Parenteral.forEach((inj, i) => {
        rxText += `${i + 1}. Inj. ${inj.brandEthical} (${inj.drugName}) - ${inj.dosageRoute}\n`;
      });

      rxText += `\n[TIER 2 - ORAL BOLUS]:\n`;
      disease.tier2Oral.forEach((b, i) => {
        rxText += `${i + 1}. Bolus ${b.bolusName} - ${b.dose}\n`;
      });

      rxText += `\n[TIER 3 & 4 - AYURVEDIC/HOMEOPATHY]:\n`;
      disease.tier3Ayurvedic.forEach(a => {
        rxText += `• ${a.name}: ${a.dose}\n`;
      });
      disease.tier4Homeopathic.forEach(h => {
        rxText += `• Homeo: ${h.remedy} - ${h.dose}\n`;
      });

      opdMedicine.value = rxText;
    }

    alert('✅ 5-स्तरीय क्लिनिकल पर्ची डिजिटल OPD पैड में ट्रांसफर कर दी गई है!\nकृपया ऊपर "ओपीडी" टैब पर क्लिक करके पर्ची की समीक्षा व व्हाट्सएप डिस्पैच करें।');
    if (typeof window.switchTab === 'function') {
      window.switchTab('rx');
    }
  };

  // =========================================================================
  // 8. GEMINI 3.8 FLASH AI SECOND OPINION GATEWAY
  // =========================================================================
  window.requestDoctorAISecondOpinion = async function () {
    const apiKey = localStorage.getItem('vetcare_gemini_api_key') || '';
    if (!apiKey) {
      if (typeof window.openAIKeyModal === 'function') {
        window.openAIKeyModal();
      } else {
        alert('कृपया पहले अपनी Gemini API Key दर्ज करें!');
      }
      return;
    }

    const aiOut = document.getElementById('aiOutputArea');
    const btn = document.getElementById('btnRunAI');

    const symptomsList = Object.keys(selectedSymptomsState).join(', ') || 'सामान्य अस्वस्थता, चारा बंद';
    const animalCaseInfo = activePatientCase 
      ? `पशु: ${activePatientCase.species} (${activePatientCase.breed}), आयु: ${activePatientCase.age}, वजन: ${activePatientCase.weight}kg, गर्भावस्था स्थिति: ${activePatientCase.pregnancy}`
      : 'पशु विवरण: वयस्क मुर्राह भैंस, वजन 450kg, ताजा ब्याही';

    const customPrompt = document.getElementById('aiInputPrompt')?.value.trim();

    if (aiOut) {
      aiOut.classList.remove('hidden');
      aiOut.innerHTML = `
        <div class="flex items-center gap-2 text-purple-700 font-bold">
          <i class="fa-solid fa-spinner fa-spin"></i>
          <span>Gemini 3.8 Flash क्लिनिकल सेकेंड ओपिनियन विश्लेषित कर रहा है...</span>
        </div>
      `;
    }

    const fullClinicalPrompt = `
You are a Board-Certified Principal Veterinary Clinician & Veterinary Pharmacologist.
Provide a high-precision, evidence-based Differential Diagnosis and Critical Treatment Audit in Hindi & Hinglish for this clinical case:

[PATIENT CASE DATA]:
${animalCaseInfo}

[OBSERVED CARDINAL SYMPTOMS & SCREENING]:
${symptomsList}

[CLINICIAN FIELD NOTES / QUERY]:
${customPrompt || 'Evaluate differential diagnosis, rule-outs, contraindicated drugs during this pregnancy/lactation state, and precise fluid therapy.'}

Format response with:
1. 🩺 शीर्ष 3 विभेदक निदान (Top 3 Differential Diagnoses with % probability)
2. ⚠️ गर्भावस्था व टॉक्सिसिटी जोखिम (Pregnancy Contraindications & Drug-Drug Interactions)
3. 🧪 संस्तुत आपातकालीन पुष्टिकरण लैब टेस्ट (Recommended Immediate Lab Tests)
4. 💉 आदर्श साल्ट व खुराक प्रोटोकॉल (Evidence-Based Rational Pharmacology)
5. 🛡️ क्रिटिकल फ्लुइड व नर्सिंग केयर प्लान (Fluid Resuscitation & Intensive Care)
    `;

    const primaryUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
    const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
    const secondaryFallback = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    async function executeCall(url) {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullClinicalPrompt }] }],
          generationConfig: { temperature: 0.15, maxOutputTokens: 1800 }
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    }

    try {
      if (btn) { btn.disabled = true; btn.innerText = "⏳ विश्लेषण जारी..."; }
      let data;
      try {
        data = await executeCall(primaryUrl);
      } catch (e1) {
        try {
          data = await executeCall(fallbackUrl);
        } catch (e2) {
          data = await executeCall(secondaryFallback);
        }
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('प्रतिक्रिया रिक्त प्राप्त हुई।');

      if (aiOut) {
        aiOut.innerHTML = `
          <div class="space-y-2">
            <div class="flex items-center justify-between border-b border-purple-200 pb-2">
              <span class="font-bold text-purple-900 flex items-center gap-1.5">
                <i class="fa-solid fa-brain"></i> AI सेकेंड ओपिनियन व फार्माकोलॉजी समीक्षा (Gemini Flash)
              </span>
              <button onclick="document.getElementById('aiOutputArea').classList.add('hidden')" class="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            <div class="prose prose-sm max-w-none text-xs leading-relaxed font-sans text-slate-800 whitespace-pre-wrap">
${text}
            </div>
          </div>
        `;
      }
    } catch (err) {
      if (aiOut) {
        aiOut.innerHTML = `
          <div class="text-rose-700 font-bold p-2">
            AI विश्लेषण विफल: ${err.message || 'नेटवर्क या API Key त्रुटि'}। कृपया API Key की जांच करें।
          </div>
        `;
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<span>✨ AI से क्लिनिकल रिपोर्ट मांगें</span>`;
      }
    }
  };

  // Wire AI runner helper for UI button in index.html
  window.runAIConsultant = window.requestDoctorAISecondOpinion;

  // =========================================================================
  // 9. UI INJECTION: CASE INTAKE, LAB TESTS TABLE & SHAEFFER CALCULATOR
  // =========================================================================
  function renderDoctorWorkspaceHeaderAndIntake() {
    const diagPanel = document.getElementById('panelDiagMatrix');
    if (!diagPanel) return;

    diagPanel.innerHTML = `
      <div class="space-y-4">
        <!-- 1. CASE INTAKE CARD -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3.5 text-xs">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 class="text-sm font-black text-blue-700 flex items-center gap-1.5">
              <i class="fa-solid fa-id-card-clip"></i>
              <span>नया क्लिनिकल केस पंजीकरण (New Patient Case Intake)</span>
            </h2>
            <span class="text-[10px] text-slate-400 font-mono">OPD-EMR 2026</span>
          </div>

          <!-- Active Case Banner Container -->
          <div id="activeCaseSummaryBanner"></div>

          <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div>
              <label class="block text-slate-600 font-bold mb-1">केस नंबर (Case ID)</label>
              <input id="caseNumberInput" type="text" value="CAS-${Date.now().toString().slice(-6)}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-mono font-bold text-slate-800" />
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">पशुपालक का नाम *</label>
              <input id="caseOwnerName" type="text" placeholder="उदा. धर्मपाल जी" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" />
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">मोबाइल नंबर (10 अंक) *</label>
              <input id="caseOwnerMobile" type="tel" maxlength="10" placeholder="9876543210" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-mono font-bold" />
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">गाँव / शहर</label>
              <input id="caseOwnerVillage" type="text" placeholder="उदा. सालवन (करनाल)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" />
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div>
              <label class="block text-slate-600 font-bold mb-1">पशु प्रजाति (Species)</label>
              <select id="caseAnimalSpecies" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold">
                <option value="भैंस (Buffalo)">भैंस (Buffalo)</option>
                <option value="गाय (Cow)">गाय (Cow)</option>
                <option value="बकरी (Goat)">बकरी (Goat)</option>
                <option value="भेड़ (Sheep)">भेड़ (Sheep)</option>
                <option value="श्वान (Dog)">श्वान (Dog)</option>
                <option value="अश्व (Horse)">अश्व (Horse)</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">नस्ल (Breed)</label>
              <input id="caseAnimalBreed" type="text" placeholder="उदा. मुर्राह / साहीवाल" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" />
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">आयु (Age)</label>
              <input id="caseAnimalAge" type="text" placeholder="उदा. 4 वर्ष" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" />
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">वजन (किग्रा)</label>
              <input id="caseAnimalWeight" type="number" placeholder="उदा. 450" oninput="window.calculateDrugDosage()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-mono font-bold text-blue-700" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label class="block text-slate-600 font-bold mb-1">लिंग (Gender)</label>
              <select id="caseAnimalGender" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold">
                <option value="मादा (Female)">मादा (Female)</option>
                <option value="नर (Male)">नर (Male)</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-600 font-bold mb-1">गर्भावस्था स्थिति (Pregnancy Status) *</label>
              <select id="caseAnimalPregnancy" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold text-rose-700">
                <option value="खाली (Non-Pregnant)">खाली (Non-Pregnant)</option>
                <option value="गाभिन Trimester 1 (1-3 माह)">गाभिन Trimester 1 (1-3 माह)</option>
                <option value="गाभिन Trimester 2 (4-6 माह)">गाभिन Trimester 2 (4-6 माह)</option>
                <option value="गाभिन Trimester 3 (7-10 माह - अति-सावधानी)">गाभिन Trimester 3 (7-10 माह - अति-सावधानी)</option>
                <option value="ताजा ब्याही (दुधारू)">ताजा ब्याही (दुधारू)</option>
              </select>
            </div>
          </div>

          <button 
            type="button" 
            onclick="window.saveCaseIntakeAndDiagnose()" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-md transition active:scale-98 flex items-center justify-center gap-1.5"
          >
            <i class="fa-solid fa-floppy-disk"></i>
            <span>💾 केस सुरक्षित करें व डायग्नोसिस शुरू करें</span>
          </button>
        </div>

        <!-- 2. SHAEFFER'S WEIGHT & DOSAGE CALCULATOR DRAWER -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 text-xs">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 class="font-bold text-slate-900 flex items-center gap-1.5">
              <i class="fa-solid fa-calculator text-emerald-600"></i>
              <span>शेफ़र सूत्र वजन व सटीक ml डोज़ कैलकुलेटर (Shaeffer's Formula)</span>
            </h3>
            <span class="text-[10px] text-slate-400 font-mono">Wt = (Girth² × Length) / 300</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label class="block text-slate-600 font-semibold mb-1">सीने का घेरा (Heart Girth in Inches)</label>
              <input id="inputHeartGirth" type="number" step="0.5" placeholder="उदा. 75 इंच" oninput="window.calculateShaefferWeight()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
            </div>
            <div>
              <label class="block text-slate-600 font-semibold mb-1">शरीर की लंबाई (Length in Inches)</label>
              <input id="inputBodyLength" type="number" step="0.5" placeholder="उदा. 60 इंच" oninput="window.calculateShaefferWeight()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
            </div>
          </div>

          <div id="calcWeightResult"></div>

          <!-- DRUG VOLUME SELECTOR -->
          <div class="pt-2 border-t border-slate-100 space-y-2">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div class="sm:col-span-2">
                <label class="block text-slate-600 font-semibold mb-1">दवा चुनें (Pre-Set Pharmacology):</label>
                <select id="selectDosageDrug" onchange="window.calculateDrugDosage()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold outline-none">
                  <option value="CEFTIOFUR">Ceftiofur Sodium (Xyrofur 1g diluted in 20ml = 50mg/ml) @ 1.5 mg/kg</option>
                  <option value="MELOXICAM">Meloxicam (Melonex 5mg/ml) @ 0.5 mg/kg</option>
                  <option value="DIMINAZENE">Diminazene Aceturate (Berenil 70mg/ml) @ 3.5 mg/kg</option>
                  <option value="BUPARVAQUONE">Buparvaquone (Butalex 50mg/ml) @ 2.5 mg/kg</option>
                  <option value="OXYTETRA_LA">Oxytetracycline LA (200mg/ml) @ 20 mg/kg</option>
                  <option value="FLUNIXIN">Flunixin Meglumine (50mg/ml) @ 2.2 mg/kg</option>
                </select>
              </div>
              <div class="flex items-end">
                <button type="button" onclick="window.calculateDrugDosage()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl transition">
                  गणना करें ➔
                </button>
              </div>
            </div>

            <div id="calcDoseOutputArea"></div>
          </div>
        </div>

        <!-- 3. SYMPTOM CHECKLIST (MULTI-ORGAN) -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 text-xs">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 class="font-bold text-slate-900 flex items-center gap-1.5">
              <i class="fa-solid fa-list-check text-blue-600"></i>
              <span>मल्टी-ऑर्गन लक्षण चेकलिस्ट (Multi-Organ Symptom Matrix)</span>
            </h3>
            <button onclick="window.clearSelectedSymptoms()" class="text-[10px] text-rose-500 font-bold hover:underline">चयन साफ करें</button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <label class="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100">
              <input type="checkbox" onchange="window.handleSymptomCheckboxChange('fever_high', this.checked)" class="rounded text-blue-600" />
              <span class="font-medium">तेज बुखार (>104°F)</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100">
              <input type="checkbox" onchange="window.handleSymptomCheckboxChange('urine_red', this.checked)" class="rounded text-blue-600" />
              <span class="font-medium text-rose-700 font-bold">कॉफी/लाल पेशाब</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100">
              <input type="checkbox" onchange="window.handleSymptomCheckboxChange('udder_swollen', this.checked)" class="rounded text-blue-600" />
              <span class="font-medium">अयन में कठोर सूजन</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100">
              <input type="checkbox" onchange="window.handleSymptomCheckboxChange('milk_flakes', this.checked)" class="rounded text-blue-600" />
              <span class="font-medium">दूध में छिछड़े/खून</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100">
              <input type="checkbox" onchange="window.handleSymptomCheckboxChange('downer_cow', this.checked)" class="rounded text-blue-600" />
              <span class="font-medium">बैठ जाना (Downer)</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100">
              <input type="checkbox" onchange="window.handleSymptomCheckboxChange('neck_s_curve', this.checked)" class="rounded text-blue-600" />
              <span class="font-medium">गर्दन S-आकार मुड़ी</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100">
              <input type="checkbox" onchange="window.handleSymptomCheckboxChange('sweet_breath', this.checked)" class="rounded text-blue-600" />
              <span class="font-medium">मीठी एसीटोन गंध</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100">
              <input type="checkbox" onchange="window.handleSymptomCheckboxChange('ticks', this.checked)" class="rounded text-blue-600" />
              <span class="font-medium">शरीर पर चिचड़ियां (Ticks)</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100">
              <input type="checkbox" onchange="window.handleSymptomCheckboxChange('neck_swelling', this.checked)" class="rounded text-blue-600" />
              <span class="font-medium">गले में भारी सूजन</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100">
              <input type="checkbox" onchange="window.handleSymptomCheckboxChange('stridor_sound', this.checked)" class="rounded text-blue-600" />
              <span class="font-medium">घर्र-घर्र सांस आवाज</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100">
              <input type="checkbox" onchange="window.handleSymptomCheckboxChange('feed_off', this.checked)" class="rounded text-blue-600" />
              <span class="font-medium">दाना छोड़ना (Off-feed)</span>
            </label>
            <label class="flex items-center gap-2 p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl cursor-pointer border border-slate-100">
              <input type="checkbox" onchange="window.handleSymptomCheckboxChange('cold_extremities', this.checked)" class="rounded text-blue-600" />
              <span class="font-medium">कान व सींग ठंडे</span>
            </label>
          </div>
        </div>

        <!-- 4. CONFIRMATORY & SCREENING LAB TESTS TABLE -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 text-xs">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 class="font-bold text-slate-900 flex items-center gap-1.5">
              <i class="fa-solid fa-vial-virus text-purple-600"></i>
              <span>पुष्टिकरण व विभेदक लैब जांच मार्गदर्शिका (Confirmatory & Screening Lab Tests)</span>
            </h3>
            <span class="text-[10px] text-slate-400">विभेदक निदान स्पष्टीकरण</span>
          </div>

          <div class="overflow-x-auto border border-slate-200 rounded-2xl bg-white">
            <table class="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold text-[10px] border-b border-slate-200 uppercase">
                  <th class="p-2.5">क्र.सं.</th>
                  <th class="p-2.5">टेस्ट का नाम</th>
                  <th class="p-2.5">नमूने का प्रकार</th>
                  <th class="p-2.5">पुष्टिकरण / अंतर स्पष्टीकरण</th>
                  <th class="p-2.5">अनुमानित MRP</th>
                  <th class="p-2.5">रिपोर्ट समय</th>
                </tr>
              </thead>
              <tbody>
                ${CLINICAL_LAB_TESTS.map((test, idx) => `
                  <tr class="border-b border-slate-100 hover:bg-slate-50">
                    <td class="p-2.5 font-mono font-bold text-center">${idx + 1}</td>
                    <td class="p-2.5 font-bold text-blue-900">${test.testName}</td>
                    <td class="p-2.5 text-slate-600">${test.sampleType}</td>
                    <td class="p-2.5 text-slate-800">${test.differentialRole}</td>
                    <td class="p-2.5 font-mono text-emerald-700 font-bold">${test.estimatedMrp}</td>
                    <td class="p-2.5 text-purple-700 font-semibold">${test.turnaroundTime}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    renderActiveCaseBanner();
  }

  window.clearSelectedSymptoms = function () {
    selectedSymptomsState = {};
    const boxes = document.querySelectorAll('#panelDiagMatrix input[type="checkbox"]');
    boxes.forEach(b => b.checked = false);
    window.runDoctorProbabilityDiagnosis();
  };

  // =========================================================================
  // 10. DOCTOR WORKSPACE BOOTSTRAPPING & ROLE INITIALIZATION
  // =========================================================================
  window.initDoctorDashboard = function () {
    // Hide farmer workspace, show doctor workspace
    const farmerWorkspace = document.getElementById('farmer-workspace');
    if (farmerWorkspace) farmerWorkspace.style.display = 'none';

    const doctorWorkspace = document.getElementById('doctor-workspace');
    if (doctorWorkspace) doctorWorkspace.style.display = 'block';

    // Show Doctor Bottom Navs
    const navRx = document.getElementById('navRx');
    const navRecords = document.getElementById('navRecords');
    const navInventory = document.getElementById('navInventory');
    const navAI = document.getElementById('navAI');
    if (navRx) navRx.classList.remove('hidden');
    if (navRecords) navRecords.classList.remove('hidden');
    if (navInventory) navInventory.classList.remove('hidden');
    if (navAI) navAI.classList.remove('hidden');

    // Update Role Badge
    const roleBadge = document.getElementById('currentUserRoleBadge');
    if (roleBadge) {
      roleBadge.textContent = '🩺 Veterinary Practitioner (पशु चिकित्सा व्यवसायी)';
      roleBadge.className = 'text-[10px] sm:text-[11px] font-bold text-slate-600';
    }

    // Load active case from storage if exists
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ACTIVE_CASE);
      if (stored) {
        activePatientCase = JSON.parse(stored);
      }
    } catch (e) {
      activePatientCase = null;
    }

    renderDoctorWorkspaceHeaderAndIntake();
    window.runDoctorProbabilityDiagnosis();
  };

  // Immediate or DOM ready bootstrapping
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      const userStr = localStorage.getItem('vetcare_user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user && user.role === 'doctor') {
            window.initDoctorDashboard();
          }
        } catch (e) {}
      }
    });
  } else {
    const userStr = localStorage.getItem('vetcare_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.role === 'doctor') {
          window.initDoctorDashboard();
        }
      } catch (e) {}
    }
  }

})();
