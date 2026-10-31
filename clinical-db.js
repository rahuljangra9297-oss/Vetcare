/**
 * Vetcare AI OS - Master Clinical Veterinary Disease Database
 * File: clinical-db.js
 * 
 * Comprehensive Pharmacological & Diagnostic Directory
 * Covering: Cattle, Buffalo, Sheep, and Goats across India
 * 
 * Standards:
 * - 48 Master Clinical Profiles
 * - 5-Tier Scientific Evidence-Based Treatment
 * - Pregnancy Steroid Contraindication Registry (IVC Safety Standard)
 * - Stage-wise Pathological Trajectory Engine (Stages 1 to 4)
 */

window.VETCARE_DISEASE_DB = [
  // ==========================================================================
  // 1. जीवाणु जनित रोग (BACTERIAL DISEASES)
  // ==========================================================================
  {
    id: "hs",
    nameHi: "गलघोंटू (Hemorrhagic Septicemia - HS)",
    nameEn: "Hemorrhagic Septicemia",
    category: "bacterial",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "105.0 - 107.5°F",
    cardinalSigns: [
      "गले, जबड़े के नीचे एवं गलकंबल में गर्म, अत्यंत दर्दनाक सूजन",
      "सांस लेते समय घर्र-घर्र (Stridor) की तीव्र कष्टप्रद आवाज",
      "मुंह से प्रचुर तारदार लार एवं जीभ का बाहर निकलकर नीला पड़ना"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक अवस्था (Prodromal Stage)",
        signs: "अचानक तेज बुखार (105°F+), कंपकंपी, सुस्ती, चारा छोड़ना, आंखें लाल होना।",
        positiveRecovery: "त्वरित एंटीबायोटिक से तापमान 12 घंटे में सामान्य हो सकता है।",
        negativeDeterioration: "गले में सूजन का तेजी से फैलाव और श्वास दर में वृद्धि।"
      },
      {
        stage: 2,
        title: "मध्यम अवस्था (Respiratory Distress)",
        signs: "गले व सबमैंडिबुलर क्षेत्र में शोफ (Edema), मुंह खोलकर सांस लेना, लार गिरना।",
        positiveRecovery: "एंटी-इंफ्लेमेटरी व एंटीबायोटिक से सूजन व घर्र-घर्र में कमी।",
        negativeDeterioration: "श्वास अवरोध के कारण जीभ बाहर लटकना व सायनोसिस।"
      },
      {
        stage: 3,
        title: "गंभीर अवस्था (Septicemic Shock)",
        signs: "पशु का बैठ जाना, श्वास नली में भारी अवरोध, नब्ज अत्यंत कमजोर व तेज।",
        positiveRecovery: "इंटेंसिव आई/वी थेरेपी एवं कोर्टिकोस्टेरॉयड सपोर्ट से धीमी रिकवरी।",
        negativeDeterioration: "हाइपोक्सिया और एंडोटॉक्सिक शॉक का प्रारंभ।"
      },
      {
        stage: 4,
        title: "अंतिम/क्रिटिकल अवस्था (Terminal Stage)",
        signs: "कोमा, पुतलियों का फैलना, हाइपोथर्मिया और दम घुटने (Asphyxia) से मृत्यु।",
        positiveRecovery: "पुनर्जीवन की संभावना 5% से कम।",
        negativeDeterioration: "हार्ट फेलियर व तीव्र पल्मोनरी एडिमा से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Ceftiofur Sodium", dose: "2.2 mg/kg", route: "I/M", days: "3-5 दिन" },
        { name: "Inj. Flunixin Meglumine", dose: "2.2 mg/kg", route: "I/V या I/M", days: "2-3 दिन" },
        { name: "Inj. Isoflupredone Acetate (गाभिन में सुरक्षित)", dose: "10-20 mg कुल डोज़", route: "I/M", days: "एकल खुराक" },
        { name: "Inj. Avil (Chlorpheniramine)", dose: "0.5 mg/kg (10-15 ml)", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "Bolus Serratiopeptidase + Paracetamol", dose: "2 बोलस", frequency: "दिन में दो बार" }
      ],
      ayurvedic: [
        { name: "कफ-कुठार रस व वासा स्वरस", dose: "30 ml दिन में दो बार" }
      ],
      homeopathic: [
        { name: "Belladonna 200C + Arsenic Alb 200C", potency: "200C", drops: "15 बूंदें हर 2 घंटे पर" }
      ],
      desiRemedies: [
        "100 मिली तिल/सरसों के तेल में 10 ग्राम कपूर, 25 ग्राम हल्दी और लहसुन पकाकर गुनगुना लेप गले पर लगाएं।",
        "गिलोय और अडूसा के पत्तों का काढ़ा बनाकर 200 मिली दिन में दो बार पिलाएं।"
      ],
      biosecurity: [
        "रोगी पशु को तुरंत सूखे, हवादार व अलग स्थान पर क्वारंटाइन करें।",
        "वर्षा ऋतु से पूर्व प्रतिवर्ष HS वैक्सीन (अलम प्रिसिपिटेटेड) अवश्य लगवाएं।"
      ]
    }
  },
  {
    id: "bq",
    nameHi: "लंगड़िया / चरचरा (Black Quarter - BQ)",
    nameEn: "Black Quarter",
    category: "bacterial",
    species: ["गाय", "भैंस", "भेड़"],
    tempRange: "104.0 - 106.0°F",
    cardinalSigns: [
      "कंधे या पुट्ठे के भारी मांसल भागों में गर्म व दर्दनाक सूजन",
      "सूजन को हाथ से दबाने पर गैस भरी चर्र-चर्र (Crepitant Swelling) की आवाज",
      "गंभीर लंगड़ापन, बाद में सूजन का ठंडा एवं संवेदनहीन (Cold & Insensitive) हो जाना"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक अवस्था",
        signs: "तीव्र ज्वर, कंपकंपी, पिछले या अगले पैर से अचानक लंगड़ाना, मांस में कठोरता।",
        positiveRecovery: "पेनिसिलिन की उच्च खुराक से 24 घंटे में लंगड़ेपन में सुधार।",
        negativeDeterioration: "मांसपेशी में तेजी से गैस और दुर्गंधयुक्त सूजन बनना।"
      },
      {
        stage: 2,
        title: "मध्यम अवस्था (Crepitation Phase)",
        signs: "सूजन का फैलना, दबाने पर गैस के बुलबुलों की चर्र-चर्र ध्वनि, पशु का उठ न पाना।",
        positiveRecovery: "मांसपेशियों के नेक्रोसिस का रुकना और बुखार उतरना।",
        negativeDeterioration: "सूजन केंद्र का ठंडा पड़ना और चमड़ी का काला/सूखा होना।"
      },
      {
        stage: 3,
        title: "गंभीर अवस्था (Toxemic Phase)",
        signs: "मांसपेशियों का परिगलन (Gangrene), गहरा अवसाद, शरीर का तापमान अचानक गिरना।",
        positiveRecovery: "गहन सर्जिकल ड्रेनेज व उच्च एंटीबायोटिक से अत्यंत धीमी रिकवरी।",
        negativeDeterioration: "क्लॉस्ट्रिडियल टॉक्सिन का रक्तप्रवाह में प्रसार।"
      },
      {
        stage: 4,
        title: "अंतिम अवस्था",
        signs: "अत्यधिक विषाक्तता, प्रोस्ट्रेशन, पैर फैलाकर लेटना, 24-48 घंटे में मृत्यु।",
        positiveRecovery: "संभावना नगण्य।",
        negativeDeterioration: "सिस्टमिक टॉक्सेमिया से हृदय गति रुकना।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Procaine Penicillin", dose: "40,000 IU/kg", route: "Deep I/M", days: "5 दिन" },
        { name: "Inj. Amoxicillin + Sulbactam", dose: "10-15 mg/kg (4.5 gm)", route: "I/M", days: "3-5 दिन" },
        { name: "Inj. Melonex Plus (Meloxicam + Para)", dose: "0.5 mg/kg (15-20 ml)", route: "I/M", days: "3 दिन" },
        { name: "Inj. Tribivet (B1, B6, B12)", dose: "10 ml", route: "I/M", days: "5 दिन" }
      ],
      oral: [
        { name: "Potassium Iodide पाउडर", dose: "5 ग्राम", frequency: "दिन में एक बार 5 दिन" }
      ],
      ayurvedic: [
        { name: "त्रिफला व गुग्गुलु काढ़ा", dose: "50 ml दिन में दो बार" }
      ],
      homeopathic: [
        { name: "Arnica Montana 200C + Crotalus Horridus 200C", potency: "200C", drops: "20 बूंदें दिन में 4 बार" }
      ],
      desiRemedies: [
        "गर्म पानी में फिटकरी और नीम की पत्तियां उबालकर सूजन वाले स्थान की सिकाई करें।",
        "सूजन पर चीरा केवल अधिकृत पशु चिकित्सक द्वारा लगाकर 3% हाइड्रोजन पेरोक्साइड (H2O2) से फ्लश करवाएं।"
      ],
      biosecurity: [
        "मृत पशु के शव को कभी न चीरें; उसे 6 फीट गहरे गड्ढे में चूना डालकर दफनाएं।",
        "मानसून से ठीक पहले BQ पॉलीवैलेंट वैक्सीन का टीकाकरण अनिवार्य रूप से कराएं।"
      ]
    }
  },
  {
    id: "mastitis",
    nameHi: "थनैला (Clinical & Sub-clinical Mastitis)",
    nameEn: "Bovine Mastitis",
    category: "bacterial",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "102.0 - 104.5°F",
    cardinalSigns: [
      "अयन (Udder) और थन में गर्म, लाल, कठोर एवं अत्यंत दर्दनाक सूजन",
      "दूध के रंग व भौतिक स्वरूप में बदलाव: रक्त, पीला सीरम, मवाद या दही जैसे छिछड़े आना",
      "दूध दोहने पर पशु का लात मारना, दर्द के मारे थन को हाथ न लगाने देना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "सब-क्लिनिकल अवस्था (Sub-Clinical)",
        signs: "बाहरी लक्षण नहीं, लेकिन दूध में सोमैटिक सेल काउंट (SCC) अधिक व pH क्षारीय।",
        positiveRecovery: "इंट्रामैमरी इन्फ्यूजन और ट्राइसोडियम साइट्रेट से 3 दिन में पूर्ण सामान्य।",
        negativeDeterioration: "क्लिनिकल थनैला में रूपांतरण व दूध में थक्के आना।"
      },
      {
        stage: 2,
        title: "एक्यूट अवस्था (Acute Clinical)",
        signs: "थन में लालिमा, सूजन, दूध में छिछड़े/रक्त, हल्का बुखार व अयन में कड़ापन।",
        positiveRecovery: "सख्त एंटीबायोटिक व सूजनरोधी दवा से 72 घंटे में दूध सामान्य।",
        negativeDeterioration: "थन में स्थायी गांठ बनना व दूध का पूरी तरह बंद होना।"
      },
      {
        stage: 3,
        title: "गंभीर अवस्था (Severe Toxic Mastitis)",
        signs: "पूरे अयन में कड़ापन, पशु सुस्त, चारा बंद, दूध की जगह बदबूदार पीला पानी।",
        positiveRecovery: "सिस्टमिक थेरेपी व लगातार ड्रेनेज से थन बचाया जा सकता है।",
        negativeDeterioration: "थन का नेक्रोसिस और गैंग्रीनस थनैला का रूप लेना।"
      },
      {
        stage: 4,
        title: "क्रोनिक/गैंग्रीनस अवस्था (Chronic/Fibrotic)",
        signs: "थन का पत्थर जैसा कड़ा होना (Fibrosis) अथवा सड़कर काला पड़ना और गिरना।",
        positiveRecovery: "संक्रमित क्वार्टर का दूध हमेशा के लिए सूख जाना (Blind Teat)।",
        negativeDeterioration: "टॉक्सिक शॉक एवं सेप्टीसीमिया से संपूर्ण पशु की जान को खतरा।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Intacef Tazo (Ceftriaxone + Tazobactam)", dose: "3375 mg (10 mg/kg)", route: "I/M या I/V", days: "3-4 दिन" },
        { name: "Inj. Melonex Plus", dose: "15-20 ml", route: "I/M", days: "3 दिन" },
        { name: "Inj. Serratiopeptidase (Fibrolytic)", dose: "10 ml", route: "I/M", days: "3 दिन" },
        { name: "Inj. Tribivet (B-Complex)", dose: "10 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "Powder Trisodium Citrate (Masti-Kit)", dose: "30-50 ग्राम", frequency: "दिन में एक बार 5 दिन" },
        { name: "Bolus Bioboost / Rumen FS", dose: "2 बोलस", frequency: "दिन में दो बार" }
      ],
      ayurvedic: [
        { name: "Mastilep Gel (बाह्य लेप)", dose: "प्रत्येक दोहन के बाद थन पर लेप करें" }
      ],
      homeopathic: [
        { name: "Phytolacca 200C + Bryonia 200C + Silicea 30C", potency: "200C/30C", drops: "20 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "250 ग्राम एलोवेरा का ताजा गूदा + 50 ग्राम हल्दी + 15 ग्राम खाने वाला चूना सिलबट्टे पर बारीक पीसकर लेप बनाएं। दिन में 3-4 बार थन खाली करके लगाएं।",
        "नीम के पत्तों के गुनगुने पानी से थन को धोकर अच्छी तरह सुखाएं।"
      ],
      biosecurity: [
        "दूध दोहने के बाद कम से कम 30 मिनट तक पशु को बैठने न दें (Teat canal खुली रहती है)।",
        "दोहन से पहले और बाद में पोटैशियम परमैंगनेट (1:1000) या आयोडीन टीट डिप का प्रयोग करें।"
      ]
    }
  },
  {
    id: "brucellosis",
    nameHi: "ब्रुसेलोसिस (Brucellosis / संक्रामक गर्भपात)",
    nameEn: "Bovine Brucellosis (Bang's Disease)",
    category: "bacterial",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "101.5 - 103.0°F",
    cardinalSigns: [
      "गर्भावस्था के अंतिम त्रैमास (6 से 9वें महीने) में अचानक गर्भपात",
      "गर्भपात के बाद जेर का रुकना (Retention of Placenta) एवं गर्भाशय शोथ",
      "नर पशुओं में अंडकोष में सूजन (Orchitis) एवं वीर्य की गुणवत्ता नष्ट होना"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "संक्रमण एवं प्रसार अवस्था",
        signs: "हल्का ज्वर, सुस्ती, लिम्फ नोड्स में हल्की सूजन, कोई स्पष्ट बाह्य लक्षण नहीं।",
        positiveRecovery: "एंटीबायोटिक से जीवाणु भार में कमी, परंतु उन्मूलन कठिन।",
        negativeDeterioration: "जीवाणु का गर्भाशय और प्लेसेंटा में स्थापित होना।"
      },
      {
        stage: 2,
        title: "प्लेसेंटाइटिस अवस्था",
        signs: "प्लेसेंटा में नेक्रोसिस, भ्रूण को रक्त आपूर्ति में बाधा, हल्का योनि स्राव।",
        positiveRecovery: "समय पर पहचान से भ्रूण क्षति कम करने का प्रयास।",
        negativeDeterioration: "भ्रूण की अंतर्गर्भाशयी मृत्यु।"
      },
      {
        stage: 3,
        title: "गर्भपात अवस्था (Abortion Crisis)",
        signs: "6-8 माह में मृत या कमजोर बच्चे का जन्म, जेर का बुरी तरह चिपक जाना।",
        positiveRecovery: "गर्भाशय शोधन और सपोर्टिव एंटीबायोटिक से गर्भाशय की रक्षा।",
        negativeDeterioration: "गंभीर एंडोमेट्राइटिस एवं स्थायी बांझपन।"
      },
      {
        stage: 4,
        title: "क्रोनिक वाहक अवस्था (Carrier State)",
        signs: "दूध व योनि स्राव के माध्यम से जीवाणु का निरंतर उत्सर्जन, झुंड में संक्रमण फैलाना।",
        positiveRecovery: "उपचार से केवल लक्षण दबते हैं, पशु वाहक बना रहता है।",
        negativeDeterioration: "मानव में माल्टा फीवर (Undulant Fever) का भीषण खतरा।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Streptomycin + Penicillin", dose: "1 gm/100kg", route: "I/M", days: "7-14 दिन" },
        { name: "Inj. Oxytetracycline LA", dose: "20 mg/kg", route: "Deep I/M", days: "प्रत्येक 72 घंटे पर 3 बार" },
        { name: "Inj. Belamyl", dose: "10 ml", route: "I/M", days: "7 दिन" }
      ],
      oral: [
        { name: "Bolus Utrovet / Replanta", dose: "2 बोलस", frequency: "दिन में दो बार 5 दिन" }
      ],
      ayurvedic: [
        { name: "अशोकारिष्ट + लोध्रासव", dose: "50 ml दिन में दो बार" }
      ],
      homeopathic: [
        { name: "Sepia 200C + Sabina 30C", potency: "200C", drops: "15 बूंदें दिन में दो बार" }
      ],
      desiRemedies: [
        "गर्भपात के पश्चात गर्भाशय शुद्धि हेतु 250 ग्राम पुराना गुड़, 25 ग्राम अजवाइन, 20 ग्राम सोंठ और 10 ग्राम काली मिर्च का काढ़ा 5 दिन पिलाएं।",
        "गर्भपात अवशेषों को चूना डालकर तुरंत गहरा दफनाएं।"
      ],
      biosecurity: [
        "ज़ूनोटिक रोग (इंसानों में फैलने वाला): मृत भ्रूण व जेर को नंगे हाथों से कभी न छुएं, ग्लव्स पहनें।",
        "4-8 माह की मादा बछड़ियों में Brucella abortus (Strain 19 या RB51) का टीका अवश्य लगवाएं।"
      ]
    }
  },
  {
    id: "anthrax",
    nameHi: "एंथ्रेक्स / गिल्टी रोग (Anthrax / Splenic Fever)",
    nameEn: "Bovine Anthrax",
    category: "bacterial",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "106.0 - 108.0°F",
    cardinalSigns: [
      "प्राकृतिक छिद्रों (गुदा, योनि, नाक, मुंह) से काला, बिना जमा हुआ तारकोल जैसा रक्त बहना",
      "अचानक बिना किसी पूर्व लक्षण के कुछ ही घंटों में पशु की आकस्मिक मृत्यु (Apoplectic death)",
      "मृत्यु उपरांत शव का अकड़ना नहीं (Absence of Rigor Mortis) एवं पेट का तेजी से फूलना"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "पेरी-एक्यूट अवस्था",
        signs: "अचानक अत्यधिक तेज बुखार (107°F), बेचैनी, लड़खड़ाहट, सांस फूलना।",
        positiveRecovery: "इस अवस्था में पहचान होने पर मेगा-डोज पेनिसिलिन से 30% जीवन रक्षा संभव।",
        negativeDeterioration: "कुछ ही घंटों में पशु का गिरना।"
      },
      {
        stage: 2,
        title: "एक्यूट अवस्था (Septicemic)",
        signs: "खूनी दस्त, पेशाब में खून, गले और पेट में शोथयुक्त सूजन, श्लेष्मा झिल्ली में रक्तस्राव।",
        positiveRecovery: "आई/वी पेनिसिलिन और एंटी-एंथ्रेक्स सीरम से आंशिक सुधार की उम्मीद।",
        negativeDeterioration: "कोमा और व्यापक आंतरिक रक्तस्राव।"
      },
      {
        stage: 3,
        title: "टर्मिनल अवस्था",
        signs: "प्राकृतिक छिद्रों से काला, बिना थक्के वाला खून रिसना, ऐंठन।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "कार्डियोरेस्पिरेटरी अरेस्ट से मृत्यु।"
      },
      {
        stage: 4,
        title: "मृत्यु उपरांत (Post-Mortem Reality)",
        signs: "शव में अकड़न न होना, प्लीहा (Spleen) का कई गुना बढ़कर जैम जैसा काला होना।",
        positiveRecovery: "लागू नहीं।",
        negativeDeterioration: "वायु संपर्क में आने पर बीजाणु (Spores) बनना जो मिट्टी में 50 वर्ष जीवित रहते हैं।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Fortified Procaine Penicillin", dose: "40,000-80,000 IU/kg", route: "I/V व I/M", days: "5 दिन" },
        { name: "Inj. Oxytetracycline", dose: "10 mg/kg", route: "धीमी I/V", days: "5 दिन" },
        { name: "Anti-Anthrax Serum", dose: "100-200 ml", route: "I/V", days: "आपातकालीन एकल खुराक" }
      ],
      oral: [],
      ayurvedic: [],
      homeopathic: [
        { name: "Anthracinum 1M + Crotalus Horridus 200C", potency: "1M", drops: "आपदा रोकथाम हेतु" }
      ],
      desiRemedies: [
        "एंथ्रेक्स में कोई भी देसी नुस्खा या झाड़-फूंक सख्त वर्जित एवं जानलेवा है।"
      ],
      biosecurity: [
        "अति-संक्रामक व घातक ज़ूनोसिस! मृत पशु का पोस्टमार्टम कतई न करें।",
        "शव को बिना चीर-फाड़ 8 फीट गहरे गड्ढे में प्रचुर चूना या कास्टिक सोडा डालकर दफनाएं।"
      ]
    }
  },
  {
    id: "tuberculosis",
    nameHi: "टीबी / क्षय रोग (Bovine Tuberculosis)",
    nameEn: "Bovine Tuberculosis",
    category: "bacterial",
    species: ["गाय", "भैंस", "बकरी"],
    tempRange: "102.0 - 103.5°F (अनियमित)",
    cardinalSigns: [
      "महीनों चलने वाली सूखी, दर्दनाक खांसी जो सुबह के समय अथवा दौड़ने पर बढ़ जाती है",
      "अच्छा चारा-दाना खाने के बावजूद पशु का निरंतर सूखना व दुर्बल होना (Progressive Emaciation)",
      "गले एवं छाती की लिम्फ ग्रंथियों का बढ़कर कठोर व गांठदार हो जाना"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक सुप्त अवस्था",
        signs: "हल्की सुस्ती, अनियमित हल्का बुखार, कार्यक्षमता व दूध में मामूली कमी।",
        positiveRecovery: "एंटी-ट्यूबरकुलर औषधियों से प्रसार पर आंशिक नियंत्रण।",
        negativeDeterioration: "फेफड़ों में ट्यूबरकल्स (गांठों) का निर्माण।"
      },
      {
        stage: 2,
        title: "पल्मोनरी अवस्था",
        signs: "बार-बार सूखी खांसी, सांस लेने में तकलीफ, फेफड़ों से सीटी जैसी आवाज (Wheezing)।",
        positiveRecovery: "उचित पोषण से लक्षण कुछ समय के लिए दब सकते हैं।",
        negativeDeterioration: "गांठों का पकना और कैविटेशन होना।"
      },
      {
        stage: 3,
        title: "उन्नत/प्रसार अवस्था",
        signs: "पसलियां दिखने लगना, आंखें अंदर धंसना, खुरदुरी त्वचा, लिम्फ नोड्स में गांठें।",
        positiveRecovery: "रिकवरी अत्यंत दुर्लभ, आर्थिक दृष्टि से अनुत्पादक।",
        negativeDeterioration: "आंतों और अयन (थन) में जीवाणु का प्रसार।"
      },
      {
        stage: 4,
        title: "मिलियरी टीबी (Miliary TB / Cachexia)",
        signs: "अत्यधिक कमजोरी, लगातार दस्त, दूध के माध्यम से जीवाणु उत्सर्जन, अंततः मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "मानव में कच्चा दूध पीने से टीबी फैलने का गंभीर स्रोत।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Streptomycin", dose: "10-20 mg/kg", route: "I/M", days: "दीर्घकालिक (पशु चिकित्सा प्रोटोकॉल अनुसार)" },
        { name: "Inj. Isoniazid + Rifampicin", dose: "विशेषज्ञ परामर्श अनुसार", route: "I/M", days: "विशेषज्ञ देखरेख" }
      ],
      oral: [
        { name: "Isoniazid (INH) टैबलेट्स", dose: "10 mg/kg", frequency: "दैनिक" }
      ],
      ayurvedic: [
        { name: "वासवलेह + च्यवनप्राश", dose: "50 ग्राम दैनिक फेफड़ों की शक्ति हेतु" }
      ],
      homeopathic: [
        { name: "Tuberculinum 200C + Drosera 30C", potency: "200C", drops: "10 बूंदें सप्ताह में एक बार" }
      ],
      desiRemedies: [
        "हल्दी, काली मिर्च और अडूसा के पत्तों का काढ़ा शहद मिलाकर दें (केवल खांसी से राहत हेतु)।"
      ],
      biosecurity: [
        "ट्यूबरकुलिन टेस्ट (CIDT) द्वारा पॉजिटिव पाए गए पशुओं को तुरंत झुंड से अलग करें।",
        "टीबी पीड़ित गाय का दूध बिना अच्छी तरह उबाले मनुष्यों अथवा बछड़ों को कभी न पिलाएं।"
      ]
    }
  },
  {
    id: "johnes_disease",
    nameHi: "जोहनी रोग / पैराट्यूबरकुलोसिस (Johne's Disease - JD)",
    nameEn: "Johne's Disease (Paratuberculosis)",
    category: "bacterial",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "101.5 - 102.5°F (सामान्य)",
    cardinalSigns: [
      "बिना किसी बुखार या पेट दर्द के हफ्तों चलने वाले पुराने, पतले, दुर्गंधयुक्त दस्त",
      "पशु की भूख सामान्य रहने के बावजूद शरीर का कंकाल बन जाना (Severe Wasting)",
      "जबड़े के नीचे ठंडी, दर्दहीन पानी भरी सूजन (Bottle Jaw / Submandibular Edema)"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "मौन संक्रमण (Silent Infection)",
        signs: "2 वर्ष से कम उम्र के बछड़े-बछड़ियों में संक्रमण, बाह्य रूप से पूर्ण स्वस्थ।",
        positiveRecovery: "पहचान अत्यंत कठिन।",
        negativeDeterioration: "इंटेस्टाइनल म्यूकोसा में माइकोबैक्टीरियम का गुणन।"
      },
      {
        stage: 2,
        title: "सब-क्लिनिकल अवस्था",
        signs: "वयस्क अवस्था में दूध उत्पादन में 15-20% की कमी, वजन न बढ़ना।",
        positiveRecovery: "सपोर्टिव थेरेपी से कुछ समय उत्पादन बना रहता है।",
        negativeDeterioration: "मल के साथ जीवाणु का भारी उत्सर्जन।"
      },
      {
        stage: 3,
        title: "क्लिनिकल अवस्था",
        signs: "रुक-रुक कर अथवा लगातार पतले दस्त, जो किसी एंटीबायोटिक या कृमिनाशक से ठीक नहीं होते।",
        positiveRecovery: "असाध्य; कोई स्थायी इलाज उपलब्ध नहीं।",
        negativeDeterioration: "आंतों की दीवार का नालीदार (Corrugated) व मोटा होना।"
      },
      {
        stage: 4,
        title: "अंतिम अवस्था (Advanced Cachexia)",
        signs: "जबड़े के नीचे बॉटल जॉ, हड्डियां निकलना, अत्यधिक निर्जलीकरण एवं मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "कुपोषण और प्रोटीन की अत्यधिक हानि से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Belamyl (B-Complex)", dose: "10 ml", route: "I/M", days: "5 दिन (सपोर्टिव)" }
      ],
      oral: [
        { name: "Clofazimine / Dapsone", dose: "प्रायोगिक/विशेषज्ञ निर्देशानुसार", frequency: "दैनिक" },
        { name: "इलेक्ट्रोलाइट व मिनरल मिक्सचर", dose: "50 ग्राम", frequency: "दैनिक" }
      ],
      ayurvedic: [
        { name: "कुटजारिष्ट + बेल चूर्ण", dose: "50 ml दिन में दो बार (दस्त रोकने के प्रयास हेतु)" }
      ],
      homeopathic: [
        { name: "Arsenic Alb 200C + Hydrastis 30C", potency: "200C", drops: "15 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "भूने जीरे, बेलगिरी और ईसबगोल की भूसी छाछ में मिलाकर पिलाएं (केवल अस्थायी राहत हेतु)।"
      ],
      biosecurity: [
        "जोहनी रोग का कोई पक्का इलाज नहीं है; संक्रमित पशु को झुंड से अलग (Cull) करना ही एकमात्र बचाव है।",
        "नवजात बछड़ों को संक्रमित मां के गोबर और गंदे थनों के संपर्क से पूरी तरह दूर रखें।"
      ]
    }
  },
  {
    id: "listeriosis",
    nameHi: "लिस्टीरियोसिस / चक्कर रोग (Listeriosis / Circling Disease)",
    nameEn: "Bovine Listeriosis",
    category: "bacterial",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "104.0 - 106.0°F",
    cardinalSigns: [
      "पशु का केवल एक ही दिशा में गोल-गोल चक्कर काटना (Unilateral Circling)",
      "चेहरे का एकतरफा पक्षाघात (Facial Paralysis): एक कान लटकना, एक तरफ की पलक न झपकना व जीभ लटकना",
      "दीवार या खूंटे से सिर दबाकर खड़े रहना (Head Pressing) एवं अत्यधिक लार गिरना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक न्यूरोलॉजिकल अवस्था",
        signs: "तेज बुखार, अवसाद, झुंड से अलग खड़े रहना, सिर को एक तरफ झुकाना।",
        positiveRecovery: "शुरुआती 24 घंटे में उच्च खुराक एंटीबायोटिक से 60% रिकवरी।",
        negativeDeterioration: "कपाल तंत्रिकाओं (Cranial Nerves) में सूजन।"
      },
      {
        stage: 2,
        title: "सर्कलिंग अवस्था",
        signs: "लगातार एक ही तरफ चक्कर काटना, अंधापन, मुंह से निवाला नीचे गिरना।",
        positiveRecovery: "एंटीबायोटिक व डेक्सामेथासोन से तंत्रिका सूजन में कमी।",
        negativeDeterioration: "मस्तिष्क के तने (Brainstem) का व्यापक संक्रमण।"
      },
      {
        stage: 3,
        title: "पैरालिटिक अवस्था",
        signs: "पशु का जमीन पर गिर पड़ना, पैरों को साइकिल की तरह चलाना (Paddling movements)।",
        positiveRecovery: "गहन नर्सिंग से बहुत धीमी व आंशिक रिकवरी।",
        negativeDeterioration: "निगलने की क्षमता पूरी तरह नष्ट होना।"
      },
      {
        stage: 4,
        title: "कोमा अवस्था",
        signs: "अचेतावस्था, सांस लेने में अनियमितता, 48-72 घंटे में रेस्पिरेटरी फेलियर से मृत्यु।",
        positiveRecovery: "नगण्य।",
        negativeDeterioration: "मस्तिष्क मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Oxytetracycline", dose: "10-15 mg/kg", route: "धीमी I/V", days: "5-7 दिन" },
        { name: "Inj. Penicillin G Sodium", dose: "40,000 IU/kg", route: "I/V", days: "5 दिन" },
        { name: "Inj. Dexamethasone (गाभिन में न दें)", dose: "0.2 mg/kg", route: "I/M", days: "2 दिन सूजन घटाने हेतु" },
        { name: "Inj. Neuroxin-12 / Tribivet", dose: "15 ml", route: "I/M", days: "7 दिन" }
      ],
      oral: [
        { name: "Dextrose 20% + इलेक्ट्रोलाइट्स", dose: "नाल द्वारा जबरन न दें (फेफड़ों में जाने का डर)" }
      ],
      ayurvedic: [
        { name: "ब्राह्मी व शंखपुष्पी स्वरस", dose: "30 ml दिन में दो बार" }
      ],
      homeopathic: [
        { name: "Cicuta Virosa 200C + Belladonna 200C", potency: "200C", drops: "15 बूंदें दिन में 4 बार" }
      ],
      desiRemedies: [
        "पशु को मुलायम बिछावन पर रखें और सिर को ऊंचा सहारा दें।",
        "खराब, फफूंद लगा या कम सड़ा हुआ साइलेज (Spoiled Silage pH > 5.5) तुरंत बंद करें।"
      ],
      biosecurity: [
        "साइलेज बनाते समय एनारोबिक किण्वन सही रखें; अम्लीय साइलेज (pH < 4.5) में यह जीवाणु नहीं पनपता।",
        "ज़ूनोटिक रोग: तंत्रिका तंत्र संक्रमित पशु के मस्तिष्क व स्राव को सीधे न छुएं।"
      ]
    }
  },
  {
    id: "enterotoxemia",
    nameHi: "फिड़किया / आंत्रविष (Enterotoxemia - ET)",
    nameEn: "Pulpy Kidney Disease",
    category: "bacterial",
    species: ["भेड़", "बकरी", "गाय", "भैंस"],
    tempRange: "103.0 - 105.0°F (अंतिम अवस्था में कम)",
    cardinalSigns: [
      "अत्यधिक दाना या नया हरा चारा खाने के बाद स्वस्थ हृष्ट-पुष्ट पशु की अचानक मृत्यु",
      "सिर को पीछे की ओर खींचना (Opisthotonos), दांत किटकिटाना एवं झागदार लार",
      "पशु का जमीन पर गिरकर पैरों को तेजी से चलाना एवं पेट में तीव्र मरोड़"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "टॉक्सिन उत्पादन अवस्था",
        signs: "आंतों में क्लॉस्ट्रिडियम परफ्रिन्जेंस टाइप D द्वारा एप्सिलॉन टॉक्सिन का भारी स्राव।",
        positiveRecovery: "समय पर एंटीटॉक्सिन देने पर जान बच सकती है।",
        negativeDeterioration: "टॉक्सिन का आंतों से रक्त में अवशोषण।"
      },
      {
        stage: 2,
        title: "न्यूरोटॉक्सिक अवस्था",
        signs: "चक्कर आना, लड़खड़ाहट, अंधापन, पेट दर्द से जमीन पर लोटना।",
        positiveRecovery: "उच्च खुराक पेनिसिलिन व टॉक्सिन न्यूट्रलाइजेशन से सुधार।",
        negativeDeterioration: "मस्तिष्क व गुर्दों की रक्त नलिकाओं का फटना।"
      },
      {
        stage: 3,
        title: "कन्वल्शन अवस्था",
        signs: "गंभीर ऐंठन, सिर पीठ की ओर मुड़ना, सांस लेने में घरघराहट, कोमा।",
        positiveRecovery: "अत्यंत कठिन (10% से कम)।",
        negativeDeterioration: "गुर्दों का गलना (Pulpy Kidney)।"
      },
      {
        stage: 4,
        title: "मृत्यु अवस्था",
        signs: "लक्षण दिखने के 2 से 12 घंटे के भीतर पशु की मृत्यु।",
        positiveRecovery: "लागू नहीं।",
        negativeDeterioration: "टॉक्सिक शॉक से रेस्पिरेटरी अरेस्ट।"
      }
    ],
    treatment: {
      injections: [
        { name: "Clostridium perfringens Type D Antitoxin", dose: "50-100 ml", route: "I/V या S/C", days: "तत्काल एकल खुराक" },
        { name: "Inj. Crystalline Penicillin", dose: "50,000 IU/kg", route: "I/V", days: "2 दिन" },
        { name: "Inj. Spasmovet (Dicyclomine)", dose: "5-10 ml", route: "I/M", days: "दर्द हेतु" },
        { name: "Inj. Dextrose 5% + Sodium Bicarb", dose: "I/V ड्रिप", route: "I/V", days: "एसिडोसिस निवारण हेतु" }
      ],
      oral: [
        { name: "एक्टिवेटेड चारकोल (Activated Charcoal)", dose: "1-2 ग्राम/किग्रा", frequency: "पानी में घोलकर तुरंत" },
        { name: "Magnesium Sulfate (दलिया/सॉल्ट)", dose: "50-100 ग्राम", frequency: "पेट खाली करने हेतु" }
      ],
      ayurvedic: [
        { name: "हिंग्वाष्टक चूर्ण + मीठा सोडा", dose: "30 ग्राम छाछ में" }
      ],
      homeopathic: [
        { name: "Nux Vomica 200C + Cuprum Met 200C", potency: "200C", drops: "10 बूंदें हर 30 मिनट पर" }
      ],
      desiRemedies: [
        "तुरंत 100 ग्राम मीठा सोडा (Sodium Bicarbonate) ठंडे पानी में घोलकर नाल से दें।",
        "अनाज व दाना तुरंत पूरी तरह बंद कर दें, केवल सूखा भूसा दें।"
      ],
      biosecurity: [
        "मौसम बदलने या नया दाना शुरू करने से पूर्व भेड़ों-बकरियों में ET वैक्सीन अनिवार्य रूप से लगाएं।",
        "अनाज या हरे चारे की मात्रा अचानक न बढ़ाएं; धीरे-धीरे 10-15 दिनों में आदत डालें।"
      ]
    }
  },
  {
    id: "calf_scours",
    nameHi: "बछड़ों में दस्त (Calf Scours / Colibacillosis)",
    nameEn: "Calf Scours (Colibacillosis)",
    category: "bacterial",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "102.5 - 104.0°F (निर्जलीकरण में कम)",
    cardinalSigns: [
      "नवजात बछड़े में सफेद, पीला अथवा हरा अत्यंत पतला, बदबूदार दस्त",
      "आंखें अंदर धंसना, त्वचा का लचीलापन समाप्त होना (Skin Tent Test > 4 सेकंड)",
      "मुंह का ठंडा पड़ना, खड़े होने में असमर्थता एवं दूध पीने की अनिच्छा"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक दस्त अवस्था",
        signs: "पूंछ और पिछले पैरों पर पतला गोबर लगना, हल्का बुखार, सुस्ती, दूध कम पीना।",
        positiveRecovery: "ओआरएस और ओरल एंटीबायोटिक से 24 घंटे में पूर्ण सुधार।",
        negativeDeterioration: "शरीर से जल व इलेक्ट्रोलाइट्स का भारी ह्रास।"
      },
      {
        stage: 2,
        title: "मध्यम डिहाइड्रेशन (6-8% निर्जलीकरण)",
        signs: "आंखें धंसना, मुंह सूखना, कमजोरी, बछड़ा अधिकांश समय लेटा रहता है।",
        positiveRecovery: "इलेक्ट्रोलाइट ड्रिप और एंटीबायोटिक से त्वरित पुनर्जीवन।",
        negativeDeterioration: "मेटाबॉलिक एसिडोसिस का प्रारंभ।"
      },
      {
        stage: 3,
        title: "गंभीर डिहाइड्रेशन (10-12% निर्जलीकरण)",
        signs: "कान व पैर ठंडे, बछड़ा उठ नहीं पाता (Recumbent), चूसने की क्षमता खत्म।",
        positiveRecovery: "आई/वी रिंगर लैक्टेट + बाईकार्बोनेट से ही जीवन संभव।",
        negativeDeterioration: "हाइपोवोलेमिक शॉक।"
      },
      {
        stage: 4,
        title: "टॉक्सिक शॉक अवस्था",
        signs: "कोमा, सांस धीमी, नब्ज गायब, तापमान 98°F से कम, मृत्यु।",
        positiveRecovery: "संभावना 10% से कम।",
        negativeDeterioration: "कार्डियक अरेस्ट।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Enrofloxacin", dose: "5 mg/kg (2-3 ml)", route: "I/M", days: "3 दिन" },
        { name: "Inj. Ringer's Lactate (RL) + DNS", dose: "500-1000 ml", route: "धीमी I/V", days: "तुरंत डिहाइड्रेशन अनुसार" },
        { name: "Inj. Melonex (Meloxicam)", dose: "0.5 mg/kg (1-2 ml)", route: "I/M", days: "दर्द व सूजन में" },
        { name: "Inj. Tribivet", dose: "2-3 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "ORS घोल (Oral Rehydration Solution)", dose: "1-2 लीटर", frequency: "दिन में 3-4 बार थोड़ा-थोड़ा" },
        { name: "Bolus Neblon / Diarest", dose: "1/2 बोलस", frequency: "दिन में दो बार" }
      ],
      ayurvedic: [
        { name: "कुटज घनवटी + बेल पाउडर", dose: "1-2 गोली दिन में दो बार" }
      ],
      homeopathic: [
        { name: "Podophyllum 30C + Arsenic Alb 30C + Carbo Veg 30C", potency: "30C", drops: "5 बूंदें हर 2 घंटे पर" }
      ],
      desiRemedies: [
        "1 लीटर उबले गुनगुने पानी में 1 मुट्ठी चीनी (या गुड़) और आधा चम्मच नमक घोलकर बार-बार पिलाएं।",
        "मेथी का दाना और ईसबगोल की भूसी का पानी बनाकर दें।"
      ],
      biosecurity: [
        "जन्म के 1 घंटे के भीतर बछड़े को मां का पहला गाढ़ा दूध (Colostrum/खीस) उसके वजन का 10% अवश्य पिलाएं।",
        "बछड़े की नाभि (Navel Cord) को टिंचर आयोडीन (7%) में डुबोकर साफ रखें ताकि Navel Ill न हो।"
      ]
    }
  },
  {
    id: "foot_rot",
    nameHi: "खुर सड़न (Foot Rot / Interdigital Necrobacillosis)",
    nameEn: "Bovine Foot Rot",
    category: "bacterial",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "102.5 - 104.0°F",
    cardinalSigns: [
      "दोनों खुरों के बीच की चमड़ी में सड़न, गहरा घाव एवं अत्यंत दुर्गंधयुक्त मवाद",
      "पशु का गंभीर रूप से लंगड़ाना, पैर को जमीन पर टिकाने से बचना",
      "खुर की कोरोनरी बैंड के ऊपर गर्म, लाल व दर्दनाक सूजन"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "इंटरडिजिटल डर्मेटाइटिस",
        signs: "खुरों के बीच लाली, हल्का गीलापन, पशु का पैर बार-बार झटका देना।",
        positiveRecovery: "सफाई और टॉपिकल स्प्रे से 3 दिन में ठीक।",
        negativeDeterioration: "जीवाणु (Fusobacterium necrophorum) का गहराई में प्रवेश।"
      },
      {
        stage: 2,
        title: "अल्सरेशन एवं नेक्रोसिस",
        signs: "खुरों के बीच गहरा दरारनुमा घाव, सड़ांध, सफेद-पीला मवाद, लंगड़ापन।",
        positiveRecovery: "एंटीबायोटिक व ड्रेसिंग से 5-7 दिन में सुधार।",
        negativeDeterioration: "संक्रमण का खुर के जोड़ों (Joint Capsule) तक फैलना।"
      },
      {
        stage: 3,
        title: "डीप सेप्टिक आर्थराइटिस",
        signs: "खुर के जोड़ सूजकर विकृत होना, पशु का बिल्कुल न चल पाना, दूध में भारी गिरावट।",
        positiveRecovery: "लंबे एंटीबायोटिक कोर्स से आंशिक राहत, स्थायी खुर विकृति संभव।",
        negativeDeterioration: "टेंडन और हड्डियों का नेक्रोसिस।"
      },
      {
        stage: 4,
        title: "क्रोनिक डिफॉर्मिटी",
        signs: "खुर का अलग होना, गंभीर कुपोषण, पशु का हमेशा लेटे रहना।",
        positiveRecovery: "सर्जिकल विच्छेदन (Amputation of claw) ही अंतिम उपाय।",
        negativeDeterioration: "द्वितीयक सेप्टीसीमिया से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Oxytetracycline LA", dose: "20 mg/kg", route: "Deep I/M", days: "प्रत्येक 72 घंटे पर 2 बार" },
        { name: "Inj. Ceftiofur Sodium", dose: "1-2 mg/kg", route: "I/M", days: "3-5 दिन" },
        { name: "Inj. Melonex Plus", dose: "15-20 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "Zinc Sulfate पाउडर", dose: "2-3 ग्राम", frequency: "दैनिक खुर की हीलिंग हेतु" }
      ],
      ayurvedic: [
        { name: "Topicure Spray / Lorexane Cream", dose: "घाव पर दिन में 2 बार छिड़कें" }
      ],
      homeopathic: [
        { name: "Silicea 200C + Hepar Sulph 200C", potency: "200C", drops: "15 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "खुर को पोटाश (पोटेशियम परमैंगनेट) या 5% कॉपर सल्फेट के घोल से धोकर साफ करें।",
        "घाव में कपूर, फिनाइल और नीम का तेल मिलाकर भरें तथा सूती पट्टी बांधें।"
      ],
      biosecurity: [
        "पशुओं के बाड़े को सूखा और कीचड़-मुक्त रखें; दलदली जमीन पर खुर सड़न तेजी से फैलती है।",
        "भेड़-बकरियों के बाड़े के निकास पर 5% कॉपर सल्फेट या 10% जिंक सल्फेट का फुटबाथ (Footbath) लगाएं।"
      ]
    }
  },
  {
    id: "tetanus",
    nameHi: "धनुस्तंभ / टिटनेस (Tetanus / Lockjaw)",
    nameEn: "Bovine Tetanus",
    category: "bacterial",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "101.5 - 104.0°F (ऐंठन से बढ़ता है)",
    cardinalSigns: [
      "जबड़े का पूरी तरह लॉक हो जाना (Trismus / Lockjaw), पशु का मुंह न खोल पाना",
      "तीसरी पलक का आंखों के ऊपर बार-बार चढ़ना (Prolapse of Third Eyelid / Nictitating Membrane)",
      "पूरे शरीर का लकड़ी के तख्ते की तरह अकड़ जाना (Wooden Horse Posture) एवं पूंछ का ऊपर तनना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक अकड़न अवस्था",
        signs: "हल्की चाल में अकड़न, कान खड़े रहना, चेहरे पर तनाव, डराने पर तीसरी पलक का बाहर आना।",
        positiveRecovery: "शुरुआती टिटनेस सीरम और पेनिसिलिन से 50% जीवन रक्षा संभव।",
        negativeDeterioration: "मांसपेशियों में स्पाज्म का तेजी से फैलना।"
      },
      {
        stage: 2,
        title: "लॉकजॉ अवस्था",
        signs: "जबड़ा पूरी तरह बंद, लार गिरना, भोजन चबाने में असमर्थ, कान व पूंछ सीधी तनी रहना।",
        positiveRecovery: "गहन शामक (Sedatives) एवं एंटीटॉक्सिन से अत्यंत धीमी रिकवरी।",
        negativeDeterioration: "हल्की आवाज या रोशनी से पूरे शरीर में भयानक ऐंठन।"
      },
      {
        stage: 3,
        title: "जनरलाइज्ड टेटनी (Wooden Posture)",
        signs: "पशु चार पैरों पर लकड़ी के घोड़े की भांति अकड़कर खड़ा रहता है, गिर जाने पर उठ नहीं पाता।",
        positiveRecovery: "संभावना 15-20%।",
        negativeDeterioration: "श्वसन मांसपेशियों का अकड़ जाना।"
      },
      {
        stage: 4,
        title: "टर्मिनल एस्फिक्सिया",
        signs: "लगातार ऐंठन, डायफ्राम का पक्षाघात, तेज पसीना, दम घुटने से मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "एस्फिक्सिया व हार्ट फेलियर।"
      }
    ],
    treatment: {
      injections: [
        { name: "Tetanus Antitoxin (TAT)", dose: "50,000 - 100,000 IU", route: "I/V व S/C", days: "तत्काल एकल खुराक" },
        { name: "Inj. Crystalline / Procaine Penicillin", dose: "40,000 IU/kg", route: "I/M", days: "7-10 दिन" },
        { name: "Inj. Chlorpromazine / Diazepam", dose: "0.5-1.0 mg/kg", route: "I/M", days: "मांसपेशी शिथिल करने हेतु" },
        { name: "Inj. Neuroxin-12", dose: "10-15 ml", route: "I/M", days: "7 दिन" }
      ],
      oral: [
        { name: "मुंह से कुछ भी न दें (सांस की नली में जाने का भारी खतरा)" }
      ],
      ayurvedic: [],
      homeopathic: [
        { name: "Hypericum 1M + Ledum Pal 200C + Nux Vomica 200C", potency: "1M/200C", drops: "15 बूंदें दिन में 4 बार" }
      ],
      desiRemedies: [
        "घाव ढूंढकर 3% हाइड्रोजन पेरोक्साइड (H2O2) और टिंचर आयोडीन से अच्छी तरह खोलकर साफ करें।",
        "पशु को पूर्ण अंधकारमय, शांत एवं गद्देदार कमरे में रखें; तेज आवाज और रोशनी से दूर रखें।"
      ],
      biosecurity: [
        "बधियाकरण (Castration), सींग दागने या सर्जरी के समय Tetanus Toxoid का टीका पहले अवश्य लगवाएं।",
        "जंग लगे लोहे के तारों, कीलों या पुराने औजारों से लगे घाव को तुरंत डिटॉल/H2O2 से धोएं।"
      ]
    }
  },
  {
    id: "actinomycosis",
    nameHi: "एक्टिनोमाइकोसिस / जबड़े की गांठ (Lumpy Jaw)",
    nameEn: "Actinomycosis (Lumpy Jaw)",
    category: "bacterial",
    species: ["गाय", "भैंस"],
    tempRange: "101.5 - 102.5°F (सामान्य)",
    cardinalSigns: [
      "निचले जबड़े की हड्डी (Mandible) में पत्थर जैसी अत्यधिक कठोर, दर्दहीन सूजन",
      "सूजन से हड्डी का गलना एवं त्वचा पर सुराख बनकर दानेदार (Sulfur Granules) मवाद बहना",
      "दांतों का ढीला होकर टेढ़ा होना, जुगाली न कर पाना एवं अत्यधिक लार गिरना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक ओस्टाइटिस",
        signs: "जबड़े पर छोटी, कठोर गांठ, जिसे छूने पर दर्द नहीं होता, खाने में कोई खास बाधा नहीं।",
        positiveRecovery: "पोटैशियम आयोडाइड और स्ट्रेप्टोमाइसिन से गांठ का बढ़ना रुक जाता है।",
        negativeDeterioration: "हड्डी में जीवाणु का जाल फैलना।"
      },
      {
        stage: 2,
        title: "फिस्टुला निर्माण",
        signs: "गांठ का बड़ा होना, त्वचा फटकर पीला चिपचिपा मवाद निकलना जिसमें सल्फर जैसे कण हों।",
        positiveRecovery: "लंबे उपचार से मवाद सूखना और घाव भरना।",
        negativeDeterioration: "हड्डी का स्थायी छत्तेदार (Rarefying Osteomyelitis) विरूपण।"
      },
      {
        stage: 3,
        title: "दांतों का विस्थापन",
        signs: "दांत हिलना, चबाने में भयंकर कठिनाई, मुंह से दुर्गंध, चारा मुंह से गिरना।",
        positiveRecovery: "रोग थम सकता है, परंतु हड्डी का आकार सामान्य नहीं होता।",
        negativeDeterioration: "पशु का तेजी से वजन गिरना।"
      },
      {
        stage: 4,
        title: "कैशेक्सिया अवस्था",
        signs: "गंभीर दुर्बलता, खाना-पीना असंभव, जबड़े की हड्डी का विकराल रूप।",
        positiveRecovery: "आर्थिक रूप से अनुपयोगी।",
        negativeDeterioration: "भूख और कमजोरी से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Streptomycin", dose: "1 gm/100kg", route: "I/M", days: "7-14 दिन" },
        { name: "Inj. Sodium Iodide 20%", dose: "1 gm/30kg (धीमी गति)", route: "I/V", days: "सप्ताह में एक बार 3 बार" },
        { name: "Inj. Procaine Penicillin", dose: "30,000 IU/kg", route: "गांठ के चारों ओर सब-क्यूटेनियस", days: "5 दिन" }
      ],
      oral: [
        { name: "Potassium Iodide पाउडर", dose: "6-10 ग्राम दैनिक", frequency: "14 दिन (आयोडीन विषाक्तता के लक्षण दिखने तक)" }
      ],
      ayurvedic: [
        { name: "कचनार गुग्गुलु", dose: "10 गोली दिन में दो बार" }
      ],
      homeopathic: [
        { name: "Hekla Lava 3X + Silicea 200C", potency: "3X/200C", drops: "20 बूंदें दिन में 3 बार (हड्डी की गांठ हेतु उत्तम)" }
      ],
      desiRemedies: [
        "गांठ के छिद्रों को टिंचर आयोडीन से अच्छी तरह धोकर साफ करें।",
        "पशु को केवल मुलायम, सुपाच्य दलिया और कटा हुआ हरा चारा दें; कड़ा सूखा भूसा न दें।"
      ],
      biosecurity: [
        "कंटीला सूखा चारा, बबूल के कांटे या तेज धारदार घास न खिलाएं, जिससे मुंह के अंदर छाले बनकर जीवाणु हड्डी में न घुसे।",
        "मवाद के स्राव को अन्य पशुओं के चारे-पानी के बर्तनों से दूर रखें।"
      ]
    }
  },
  {
    id: "actinobacillosis",
    nameHi: "एक्टिनोबैसिलोसिस / लकड़ी जैसी जीभ (Wooden Tongue)",
    nameEn: "Actinobacillosis (Wooden Tongue)",
    category: "bacterial",
    species: ["गाय", "भैंस", "भेड़"],
    tempRange: "102.5 - 104.0°F",
    cardinalSigns: [
      "जीभ का सूजकर पत्थर या लकड़ी की तरह अत्यंत कठोर (Wooden Tongue) हो जाना",
      "जीभ का मुंह से बाहर लटकना, पशु का जीभ हिलाने व चारा अंदर खींचने में पूरी तरह असमर्थ होना",
      "मुंह से निरंतर गाढ़ी लार टपकना एवं निचले जबड़े की सॉफ्ट टिश्यू में दर्दनाक सूजन"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "एक्यूट ग्लोसाइटिस",
        signs: "जीभ पर लाली, दर्द, सूजन, पशु चारा मुंह में लेता है पर चबा नहीं पाता, लार गिरना।",
        positiveRecovery: "सोडियम आयोडाइड आई/वी से 48 घंटे में जीभ मुलायम होने लगती है।",
        negativeDeterioration: "जीभ में ग्रेनुलोमा और फाइब्रोसिस बनना।"
      },
      {
        stage: 2,
        title: "कठोरता अवस्था (Induration)",
        signs: "जीभ कठोर होकर बाहर निकलना, जीभ की सतह पर अल्सर, लिम्फ नोड्स में सूजन।",
        positiveRecovery: "एंटीबायोटिक + आयोडाइड से 7-10 दिन में 80% रिकवरी।",
        negativeDeterioration: "जीभ का स्थायी संकुचन।"
      },
      {
        stage: 3,
        title: "अल्सरयुक्त अवस्था",
        signs: "जीभ के किनारों से मवाद निकलना, वजन में भारी गिरावट, गंभीर निर्जलीकरण।",
        positiveRecovery: "धीमी रिकवरी; जबरन दलिया पिलाने की आवश्यकता।",
        negativeDeterioration: "गले की ग्रंथियों में संक्रमण फैलकर सांस रुकना।"
      },
      {
        stage: 4,
        title: "क्रोनिक स्टार्वेशन",
        signs: "पशु का कंकाल बनना, पानी न पी पाना, निर्जलीकरण व कमजोरी से मृत्यु।",
        positiveRecovery: "अत्यंत कठिन।",
        negativeDeterioration: "मल्टीपल ऑर्गन फेलियर।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Sodium Iodide (20% Sol)", dose: "1 gm/30kg (धीमी I/V)", route: "I/V", days: "7 दिन बाद पुनः 1 बार" },
        { name: "Inj. Oxytetracycline", dose: "10 mg/kg", route: "I/M या I/V", days: "5 दिन" },
        { name: "Inj. Melonex Plus", dose: "15 ml", route: "I/M", days: "3 दिन जीभ का दर्द घटाने हेतु" }
      ],
      oral: [
        { name: "Potassium Iodide पाउडर", dose: "5-8 ग्राम", frequency: "दैनिक 10 दिन" }
      ],
      ayurvedic: [
        { name: "त्रिफला काढ़े से मुंह की धुलाई", dose: "दिन में 2 बार" }
      ],
      homeopathic: [
        { name: "Mercurius Sol 200C + Kali Iodatum 200C", potency: "200C", drops: "15 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "पिटकरी के 1% गुनगुने घोल से पशु की जीभ और मुंह को दिन में तीन बार साफ करें।",
        "जीभ पर ग्लिसरीन में हल्दी और बोरिक पाउडर मिलाकर लगाएं।"
      ],
      biosecurity: [
        "मुंह की श्लेष्मा को छीलने वाले कांटेदार झाड़-झंखाड़ को चारे से पूरी तरह अलग करें।",
        "रोग की पहली अवस्था में ही उपचार शुरू करें; देर करने पर जीभ हमेशा के लिए सिकुड़ जाती है।"
      ]
    }
  },

  // ==========================================================================
  // 2. विषाणु जनित रोग (VIRAL DISEASES)
  // ==========================================================================
  {
    id: "fmd",
    nameHi: "खुरपका-मुँहपका (Foot and Mouth Disease - FMD)",
    nameEn: "Foot and Mouth Disease (FMD)",
    category: "viral",
    species: ["गाय", "भैंस", "भेड़", "बकरी", "सूअर"],
    tempRange: "104.0 - 106.5°F",
    cardinalSigns: [
      "मुंह, मसूड़ों, जीभ, होंठों एवं खुरों के बीच छाले (Vesicles) पड़ना जो फूटकर घाव बन जाते हैं",
      "मुंह से प्रचुर मात्रा में चिपचिपी, तारदार लार (Ropy Salivation) का जमीन तक लटकना",
      "पैरों में अत्यधिक दर्द के कारण पशु का लंगड़ाना, पैर पटकना एवं दूध में 80-90% की भारी गिरावट"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक ज्वर अवस्था",
        signs: "अचानक तेज बुखार (105°F+), सुस्ती, चारा छोड़ना, मुंह बंद रखना व होठों से चप-चप की आवाज।",
        positiveRecovery: "सपोर्टिव केयर से जटिलताएं रुकती हैं।",
        negativeDeterioration: "जीभ व खुरों पर फफोलों का तेजी से उभरना।"
      },
      {
        stage: 2,
        title: "वेसिकुलर अवस्था (छालों का फूटना)",
        signs: "जीभ की ऊपरी त्वचा का छिलना (Denuded areas), खुरों में घाव, भीषण लार गिरना, लंगड़ाना।",
        positiveRecovery: "मुंह व खुर की एंटीसेप्टिक ड्रेसिंग से घाव 7-10 दिन में भरना शुरू।",
        negativeDeterioration: "घावों में कीड़े (Maggots) पड़ना और सेकेंडरी बैक्टीरियल संक्रमण।"
      },
      {
        stage: 3,
        title: "जटिलता अवस्था (Complications)",
        signs: "खुर का खोल उतरना (Sloughing of hooves), थनों पर छाले होकर थनैला होना, बछड़ों की मृत्यु।",
        positiveRecovery: "एंटीबायोटिक कवर से पशु धीरे-धीरे संभलता है।",
        negativeDeterioration: "छोटे बछड़ों में हृदय की पेशियों का नष्ट होना (Tiger Heart Disease)।"
      },
      {
        stage: 4,
        title: "पोस्ट-एफएमडी सीक्वेले (Pantor State)",
        signs: "पशु का हमेशा हांफना (Panting), बाल बड़े व खुरदुरे होना, गर्मी न सह पाना, दूध कभी वापस न आना।",
        positiveRecovery: "थायरॉयड व मेटाबॉलिक सपोर्ट से आंशिक सुधार।",
        negativeDeterioration: "स्थायी शारीरिक अक्षमता।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Intacef (Ceftriaxone)", dose: "10 mg/kg (3 gm)", route: "I/M", days: "3-5 दिन (सेकेंडरी इन्फेक्शन रोकने)" },
        { name: "Inj. Melonex Plus", dose: "15-20 ml", route: "I/M", days: "3-4 दिन दर्द व बुखार हेतु" },
        { name: "Inj. Avil", dose: "10 ml", route: "I/M", days: "3 दिन" },
        { name: "Inj. Conciplex / Tribivet", dose: "10 ml", route: "I/M", days: "5 दिन" }
      ],
      oral: [
        { name: "Masti-Kit / Immunomodulator पाउडर", dose: "दैनिक", frequency: "रोग प्रतिरोधक क्षमता हेतु" }
      ],
      ayurvedic: [
        { name: "Topicure Spray (खुरों हेतु)", dose: "दिन में 2 बार छिड़कें" }
      ],
      homeopathic: [
        { name: "Variolinum 200C + Merc Sol 200C + Rhus Tox 200C", potency: "200C", drops: "20 बूंदें दिन में 4 बार" }
      ],
      desiRemedies: [
        "मुंह के छालों को 1% फिटकरी (Alum) या पोटैशियम परमैंगनेट (लाल दवा) के हल्के पानी से धोएं।",
        "शहद में पिसा हुआ तूतिया (नीला थोथा भुना हुआ) या सुहागा मिलाकर जीभ व होठों के छालों पर दिन में 3 बार लगाएं।",
        "खुरों के घाव में फिनाइल युक्त पानी या तारपीन का तेल व कपूर लगाएं ताकि कीड़े न पड़ें।"
      ],
      biosecurity: [
        "अति-संक्रामक हवा से फैलने वाला रोग: रोगी पशु को तुरंत बिल्कुल अलग बाड़े में रखें।",
        "वर्ष में दो बार (मानसून से पहले और सर्दी के अंत में) पूरे झुंड में FMD वैक्सीन अनिवार्य रूप से लगाएं।"
      ]
    }
  },
  {
    id: "lsd",
    nameHi: "लंपी स्किन रोग (Lumpy Skin Disease - LSD)",
    nameEn: "Lumpy Skin Disease (LSD)",
    category: "viral",
    species: ["गाय", "भैंस"],
    tempRange: "104.0 - 106.0°F",
    cardinalSigns: [
      "पूरे शरीर की त्वचा पर 2 से 5 सेमी व्यास की गोल, उभरी हुई कठोर गांठें (Nodules) बनना",
      "पैरों, छाती एवं अंडकोष/अयन में भारी पानी भरी सूजन (Edema) जिससे चलने में असमर्थता",
      "आंखों व नाक से पानी व गाढ़ा स्राव बहना एवं त्वचा की गांठों का सूखकर खुरंड (Sitfast) बनना"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक वायरल अवस्था",
        signs: "तेज बुखार (105°F+), आंख-नाक से पानी, चारा छोड़ना, दूध में भारी गिरावट, सुस्ती।",
        positiveRecovery: "सपोर्टिव एंटीबायोटिक व इम्युनोबूस्टर से गांठों की संख्या सीमित रहती है।",
        negativeDeterioration: "त्वचा पर अचानक सैकड़ों गांठों का उभरना।"
      },
      {
        stage: 2,
        title: "नोड्यूलर अवस्था (गांठों का बनना)",
        signs: "सिर, गर्दन, थन व पैरों पर कठोर गांठें, पैरों में भारी सूजन, लंगड़ाना।",
        positiveRecovery: "एंटी-इंफ्लेमेटरी व नीम लेप से सूजन में कमी।",
        negativeDeterioration: "गांठों का अल्सर में बदलना और घाव से मवाद रिसना।"
      },
      {
        stage: 3,
        title: "अल्सरेटिव एवं नेक्रोटिक अवस्था",
        signs: "गांठों के बीच में गड्ढे बनना (Sitfast), घावों में मक्खियों द्वारा कीड़े पड़ना, सांस में घुरघुराहट।",
        positiveRecovery: "एंटीसेप्टिक स्प्रे व घाव की नियमित ड्रेसिंग से धीमी हीलिंग।",
        negativeDeterioration: "फेफड़ों और श्वास नली में नोड्यूल्स बनने से निमोनिया।"
      },
      {
        stage: 4,
        title: "दीर्घकालिक रिकवरी अवस्था",
        signs: "त्वचा पर स्थायी निशान, अत्यधिक दुर्बलता, पैरों की पुरानी सूजन, दूध वापस आने में महीनों लगना।",
        positiveRecovery: "संतुलित आहार व लिवर टॉनिक से धीरे-धीरे स्वास्थ्य लाभ।",
        negativeDeterioration: "गंभीर सेकेंडरी बैक्टीरियल निमोनिया से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Ceftiofur Sodium / Enrofloxacin", dose: "1-2 mg/kg या 5 mg/kg", route: "I/M", days: "5 दिन" },
        { name: "Inj. Melonex Plus", dose: "15-20 ml", route: "I/M", days: "3-5 दिन दर्द व बुखार हेतु" },
        { name: "Inj. Avil (Pheniramine Maleate)", dose: "10-15 ml", route: "I/M", days: "5 दिन" },
        { name: "Inj. Ivermectin (कीड़े व परजीवी रोकथाम)", dose: "1 ml/50kg", route: "S/C", days: "एकल खुराक" }
      ],
      oral: [
        { name: "विटामिन-सी (Ascorbic Acid) + जिंक टैबलेट्स", dose: "10 ग्राम", frequency: "दैनिक 10 दिन" },
        { name: "लिवर टॉनिक (Liv-52 / Brotone)", dose: "50 ml", frequency: "दिन में दो बार" }
      ],
      ayurvedic: [
        { name: "गिलोय, तुलसी, दालचीनी, काली मिर्च व हल्दी का काढ़ा", dose: "100 ml दिन में दो बार" }
      ],
      homeopathic: [
        { name: "Variolinum 200C + Thuja 200C + Merc Sol 200C", potency: "200C", drops: "20 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "25 ग्राम हल्दी, 50 ग्राम नीम की पत्तियां, 20 ग्राम काली मिर्च, 50 ग्राम गुड़ और 1 मुट्ठी तुलसी पत्ते पीसकर लड्डू बनाकर रोज खिलाएं।",
        "नीम की पत्तियों को पानी में उबालकर फिटकरी मिलाकर उस पानी से पशु के शरीर के घावों को धोएं।",
        "घाव पर कपूर, नारियल तेल और हल्दी मिलाकर लगाएं।"
      ],
      biosecurity: [
        "मक्खी, मच्छर व चिचड़ियों का तुरंत नियंत्रण करें (साइपरमेथ्रिन स्प्रे बाड़े में करें)।",
        "गोट पॉक्स (Goat Pox) वैक्सीन की 3ml डोज़ सभी स्वस्थ गोवंश में बचाव हेतु लगाएं।"
      ]
    }
  },
  {
    id: "ppr",
    nameHi: "पीपीआर / बकरी प्लेग (Pest des Petits Ruminants - PPR)",
    nameEn: "Peste des Petits Ruminants (Goat Plague)",
    category: "viral",
    species: ["बकरी", "भेड़"],
    tempRange: "104.0 - 106.0°F",
    cardinalSigns: [
      "मुंह, मसूड़ों और जीभ पर गंभीर छाले एवं सड़न जिससे अत्यधिक दुर्गंध आना",
      "गंभीर, काला-भूरा, चिपचिपा, अत्यंत बदबूदार खूनी दस्त (Profuse Foul Diarrhea)",
      "आंखों व नाक से मवाद जैसा गाढ़ा स्राव बहना जिससे आंखें चिपक जाना एवं निमोनिया"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "ज्वर व कैटरल अवस्था",
        signs: "अचानक तेज बुखार, आंख-नाक से पानी, छींकना, सुस्ती, चारा पूरी तरह बंद।",
        positiveRecovery: "प्रारंभिक अवस्था में एंटीबायोटिक व सपोर्टिव केयर से जीवन रक्षा।",
        negativeDeterioration: "मुंह के अंदर व्यापक नेक्रोटिक छालों का बनना।"
      },
      {
        stage: 2,
        title: "ओरल व निमोनिक अवस्था",
        signs: "मुंह से लार, मसूड़े सफेद पड़कर छिलना, खांसी, तेजी से सांस लेना, आंखें मवाद से बंद।",
        positiveRecovery: "सख्त नर्सिंग व फ्लुइड से रिकवरी की उम्मीद।",
        negativeDeterioration: "गंभीर खूनी दस्त की शुरुआत।"
      },
      {
        stage: 3,
        title: "डायरिया व डिहाइड्रेशन अवस्था",
        signs: "अत्यधिक बदबूदार पतले दस्त, निर्जलीकरण, शरीर का तापमान अचानक गिरना, जबड़े गीले।",
        positiveRecovery: "आई/वी फ्लुइड्स व एंटी-डायरियल से 30% बकरियां बच सकती हैं।",
        negativeDeterioration: "हाइपोथर्मिया और इलेक्ट्रोलाइट इम्बैलेंस।"
      },
      {
        stage: 4,
        title: "टर्मिनल अवस्था",
        signs: "कोमा, सांस में घुरघुर, गंभीर निर्जलीकरण, 5 से 10 दिनों में 80-90% बकरियों की मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "हाइपोवोलेमिक शॉक से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Enrofloxacin (10%)", dose: "5 mg/kg (1-2 ml)", route: "I/M", days: "3-5 दिन" },
        { name: "Inj. Melonex (Meloxicam)", dose: "0.5 mg/kg (1-2 ml)", route: "I/M", days: "3 दिन" },
        { name: "Inj. Ringer's Lactate + Dextrose 5%", dose: "200-500 ml", route: "धीमी I/V", days: "दैनिक निर्जलीकरण अनुसार" },
        { name: "Inj. Tribivet", dose: "2 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "ORS घोल बार-बार", dose: "500 ml", frequency: "दिन में 4-5 बार" },
        { name: "Bolus Neblon / Diarest", dose: "1/2 बोलस", frequency: "दिन में दो बार" }
      ],
      ayurvedic: [
        { name: "कुटजारिष्ट + वासा स्वरस", dose: "15 ml दिन में दो बार" }
      ],
      homeopathic: [
        { name: "Arsenic Alb 200C + Merc Cor 200C", potency: "200C", drops: "5 बूंदें हर 3 घंटे पर" }
      ],
      desiRemedies: [
        "मुंह के छालों को बोरिक एसिड पाउडर और ग्लिसरीन मिलाकर दिन में तीन बार साफ करें।",
        "मेथी का पानी और ईसबगोल की भूसी ओआरएस के साथ मिलाकर थोड़ी-थोड़ी मात्रा में पिलाएं।"
      ],
      biosecurity: [
        "संक्रामक बकरी प्लेग: नई बकरियों को झुंड में मिलाने से पहले 21 दिन क्वारंटाइन रखें।",
        "सभी बकरियों में 3 माह की उम्र के बाद PPR वैक्सीन अवश्य लगवाएं (3 वर्ष की सुरक्षा)।"
      ]
    }
  },
  {
    id: "rabies",
    nameHi: "रेबीज / अलक (Rabies / Hydrophobia)",
    nameEn: "Bovine Rabies",
    category: "viral",
    species: ["गाय", "भैंस", "भेड़", "बकरी", "कुत्ता"],
    tempRange: "101.5 - 103.5°F (परिवर्तनशील)",
    cardinalSigns: [
      "असामान्य व आक्रामक व्यवहार, पागल की तरह रंभाना (Altered Bellowing/Hoarse Sound)",
      "मुंह से अत्यधिक झागदार लार गिरना, निगलने में असमर्थता (गलघोंटू या गले में हड्डी फंसे जैसा भ्रम)",
      "पिछले धड़ का लड़खड़ाहट भरा पक्षाघात (Posterior Paresis) एवं 3 से 7 दिन में अनिवार्य मृत्यु"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक प्रोड्रॉमल अवस्था",
        signs: "पशु का बेचैन होना, कान अलर्ट रखना, हल्की आहट पर चौंकना, कामेच्छा जैसे लक्षण।",
        positiveRecovery: "लक्षण प्रकट होने के बाद रिकवरी 0% (असाध्य)।",
        negativeDeterioration: "मस्तिष्क के न्यूरॉन्स में वायरस का प्रसार।"
      },
      {
        stage: 2,
        title: "उग्र रूप (Furious Form)",
        signs: "अत्यधिक रंभाना, खूंटे को तोड़ना, अन्य जानवरों पर झपटना, दीवार से सिर टकराना, लार गिरना।",
        positiveRecovery: "कोई उपचार संभव नहीं।",
        negativeDeterioration: "तंत्रिका तंत्र का तीव्र परिगलन।"
      },
      {
        stage: 3,
        title: "शांत/गूंगा रूप (Dumb Form)",
        signs: "निचले जबड़े का लटक जाना, निगलने में पूरी तरह असमर्थ, गले में कुछ फंसे जैसा मुंह चलाना।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "शरीर के पिछले हिस्से का पक्षाघात।"
      },
      {
        stage: 4,
        title: "पैरालिटिक अवस्था व मृत्यु",
        signs: "जमीन पर गिर जाना, कोमा, ऐंठन, सांस की नसों का पक्षाघात, 4-7 दिनों में 100% मृत्यु।",
        positiveRecovery: "लागू नहीं।",
        negativeDeterioration: "रेस्पिरेटरी अरेस्ट से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "लक्षण दिखने के बाद कोई इलाज नहीं है (100% Fatal Disease)", dose: "उपचार वर्जित", route: "N/A", days: "N/A" }
      ],
      oral: [
        { name: "मुंह में हाथ कतई न डालें (लार में रेबीज वायरस होता है)" }
      ],
      ayurvedic: [],
      homeopathic: [
        { name: "Hydrophobinum / Lyssin 200C", potency: "200C", drops: "केवल काटने के तुरंत बाद बचाव हेतु" }
      ],
      desiRemedies: [
        "कुत्ते या जंगली जानवर के काटने के तुरंत बाद घाव को बहते पानी और कपड़े धोने वाले साबुन (Carbolic Soap) से 15 मिनट तक लगातार रगड़कर धोएं।"
      ],
      biosecurity: [
        "100% घातक ज़ूनोसिस! संदिग्ध पशु के मुंह में हाथ डालने की भूल कभी न करें।",
        "कुत्ते के काटने पर तुरंत दिन 0, 3, 7, 14, 28 पर Post-Exposure Rabies Vaccine (ARV) पशु को लगवाएं।"
      ]
    }
  },
  {
    id: "bvd",
    nameHi: "बोवाइन वायरल डायरिया (Bovine Viral Diarrhea - BVD)",
    nameEn: "Bovine Viral Diarrhea (BVD)",
    category: "viral",
    species: ["गाय", "भैंस"],
    tempRange: "104.0 - 106.0°F",
    cardinalSigns: [
      "मुंह, तालू और मसूड़ों पर दर्दनाक छाले व कटाव (Oral Erosions)",
      "लगातार बदबूदार खूनी व श्लेष्मयुक्त दस्त (Severe Mucosal Diarrhea)",
      "गाभिन पशुओं में गर्भपात, विकृत बछड़ों का जन्म अथवा स्थायी संक्रमित (PI) बछड़े"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "तीव्र वायरल अवस्था",
        signs: "तेज बुखार, अवसाद, आंख-नाक से स्राव, ल्यूकोपेनिया (श्वेत रक्त कणों में भारी कमी)।",
        positiveRecovery: "सपोर्टिव केयर से 7-10 दिन में सुधार संभव।",
        negativeDeterioration: "म्यूकोसल डिजीज (Mucosal Disease) का रूप लेना।"
      },
      {
        stage: 2,
        title: "म्यूकोसल अवस्था",
        signs: "मुंह के अंदर गहरे छाले, अत्यधिक लार, खुरों के बीच छाले, लंगड़ापन।",
        positiveRecovery: "एंटीबायोटिक से सेकेंडरी इन्फेक्शन रोकथाम।",
        negativeDeterioration: "आंतों की दीवार का नष्ट होना।"
      },
      {
        stage: 3,
        title: "गंभीर दस्त अवस्था",
        signs: "खून व आंतों की झिल्ली युक्त बदबूदार दस्त, तेजी से वजन गिरना, निर्जलीकरण।",
        positiveRecovery: "आई/वी इलेक्ट्रोलाइट्स से आंशिक रिकवरी।",
        negativeDeterioration: "परसिस्टेंटली इन्फेक्टेड (PI) पशुओं में मृत्यु दर 100%।"
      },
      {
        stage: 4,
        title: "क्रोनिक अवस्था / मृत्यु",
        signs: "अत्यधिक दुर्बलता, प्रतिरक्षा प्रणाली का पूरी तरह ध्वस्त होना, मृत्यु।",
        positiveRecovery: "कठिन।",
        negativeDeterioration: "मल्टी-ऑर्गन फेलियर।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Ceftriaxone", dose: "10 mg/kg", route: "I/M", days: "5 दिन" },
        { name: "Inj. Melonex Plus", dose: "15 ml", route: "I/M", days: "3 दिन" },
        { name: "Inj. Ringer's Lactate + DNS", dose: "2-3 लीटर", route: "I/V", days: "निर्जलीकरण अनुसार" },
        { name: "Inj. Tribivet + Belamyl", dose: "10 ml", route: "I/M", days: "5 दिन" }
      ],
      oral: [
        { name: "इलेक्ट्रोलाइट व प्रोबायोटिक पाउडर", dose: "50 ग्राम", frequency: "दैनिक" }
      ],
      ayurvedic: [
        { name: "गिलोय व बेल चूर्ण", dose: "30 ग्राम दैनिक" }
      ],
      homeopathic: [
        { name: "Baptisia 200C + Merc Cor 200C", potency: "200C", drops: "15 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "चावल का मांड़ और छाछ में भुना जीरा मिलाकर पिलाएं ताकि आंतों की जलन शांत हो।"
      ],
      biosecurity: [
        "झुंड से परसिस्टेंटली इन्फेक्टेड (PI) पशुओं की पहचान (ELISA/PCR टेस्ट) कर तुरंत निष्कासित करें।",
        "प्रजनन हेतु वीर्य प्रमाणित BVD-मुक्त सांड का ही उपयोग करें।"
      ]
    }
  },
  {
    id: "ephemeral_fever",
    nameHi: "तीन दिनी बुखार / अकड़हा (Bovine Ephemeral Fever / 3-Day Sickness)",
    nameEn: "Bovine Ephemeral Fever",
    category: "viral",
    species: ["गाय", "भैंस"],
    tempRange: "104.0 - 107.0°F (अति तीव्र ज्वर)",
    cardinalSigns: [
      "अचानक 106°F+ बुखार और 24 घंटे में चारों पैरों में भयंकर अकड़न व लंगड़ापन",
      "पशु का दर्द के कारण जमीन पर बैठ जाना और उठने में पूरी तरह असमर्थ होना",
      "गर्दन व जोड़ों में सूजन, आंखों व नाक से पानी बहना, और 3 दिन बाद अचानक चमत्कारिक सुधार"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "एक्यूट ज्वर अवस्था (दिन 1)",
        signs: "अचानक 106°F बुखार, तेज कंपकंपी, दूध उत्पादन शून्य होना, आंखें सूजकर लाल होना।",
        positiveRecovery: "NSAID देने से दर्द व बुखार में तुरंत कमी।",
        negativeDeterioration: "पैरों और जोड़ों में भयंकर जकड़न।"
      },
      {
        stage: 2,
        title: "मस्कुलोस्केलेटल अवस्था (दिन 2)",
        signs: "पशु का लड़खड़ाना या बैठ जाना, जोड़ों में सूजन, गर्दन घुमाने में दर्द से कराहना।",
        positiveRecovery: "सपोर्टिव थेरेपी से 48 घंटे में पशु उठने का प्रयास करता है।",
        negativeDeterioration: "हाइपोकैल्सीमिया जैसी स्थिति बनना।"
      },
      {
        stage: 3,
        title: "रिकवरी अवस्था (दिन 3)",
        signs: "बुखार सामान्य होना, अकड़न का तेजी से घटना, पशु का उठकर चारा खाना शुरू करना।",
        positiveRecovery: "95% पशु बिना किसी स्थायी नुकसान के 72 घंटे में ठीक हो जाते हैं।",
        negativeDeterioration: "भारी वजन वाले पशुओं में लंबे समय तक बैठे रहने से डाउनर काउ बनना।"
      },
      {
        stage: 4,
        title: "पोस्ट-फीवर अवस्था",
        signs: "हल्की कमजोरी, दूध का स्तर 1-2 सप्ताह में वापस आना।",
        positiveRecovery: "पूर्ण स्वस्थ।",
        negativeDeterioration: "जबरन नाल पिलाने से एस्पिरेशन निमोनिया होना (यदि किया गया हो)।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Flunixin Meglumine", dose: "2.2 mg/kg (15-20 ml)", route: "I/V या I/M", days: "2-3 दिन (सर्वोत्तम प्रभाव)" },
        { name: "Inj. Melonex Plus", dose: "15-20 ml", route: "I/M", days: "3 दिन" },
        { name: "Inj. Calcium Borogluconate (CBG)", dose: "200-300 ml", route: "धीमी I/V", days: "अकड़न कम करने हेतु एकल खुराक" },
        { name: "Inj. Tribivet", dose: "10 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "Paracetamol बोलस", dose: "2 बोलस", frequency: "दिन में दो बार" }
      ],
      ayurvedic: [
        { name: "महावातविध्वंसन रस", dose: "5-5 गोली दिन में दो बार" }
      ],
      homeopathic: [
        { name: "Rhus Tox 200C + Bryonia 200C + Eupatorium Perf 200C", potency: "200C", drops: "15 बूंदें दिन में 4 बार" }
      ],
      desiRemedies: [
        "अकड़े हुए जोड़ों व पुट्ठों पर सरसों के तेल में लहसुन व अजवाइन पकाकर मालिश करें।",
        "पशु को जबरन नाल द्वारा कुछ न पिलाएं (निगलने की मांसपेशियां अकड़ी होती हैं, दवा फेफड़ों में जा सकती है)।"
      ],
      biosecurity: [
        "यह रोग मच्छरों एवं क्यूलिकोइड्स मक्खियों से फैलता है; बाड़े में मच्छरदानी व धुआं करें।",
        "बरसात के मौसम के बाद कीटनाशक फॉगिंग अनिवार्य रूप से करें।"
      ]
    }
  },
  {
    id: "cowpox_goatpox",
    nameHi: "चेचक व माता रोग (Cowpox / Goat Pox / Sheeppox)",
    nameEn: "Pox Diseases (Cowpox & Goat Pox)",
    category: "viral",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "103.0 - 105.5°F",
    cardinalSigns: [
      "थनों, मुंह, पलकों एवं बिना बाल वाली त्वचा पर पहले लाल दाने (Macule) फिर छाले (Vesicle) व खुरंड बनना",
      "थनों पर घाव के कारण दूध दोहने में असहनीय दर्द, थनैला रोग का भारी खतरा",
      "भेड़-बकरियों में आंतरिक अंगों (फेफड़ों) में पॉक्स लीजन्स बनने से तेज निमोनिया व मृत्यु"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "इरिथेमेटस अवस्था",
        signs: "बुखार, त्वचा पर लाल चकत्ते (Macules) बनना, भूख में कमी।",
        positiveRecovery: "सपोर्टिव केयर से 2 सप्ताह में ठीक।",
        negativeDeterioration: "दानों का फफोलों में बदलना।"
      },
      {
        stage: 2,
        title: "वेसिकुलर व पस्टुलर अवस्था",
        signs: "दानों में पानी व मवाद भरना (Pustules), बीच में गड्ढा होना (Umbilicated pock)।",
        positiveRecovery: "एंटीसेप्टिक लेप से घाव सूखना।",
        negativeDeterioration: "घावों का फटना और मक्खियां लगना।"
      },
      {
        stage: 3,
        title: "क्रस्ट/स्कैब अवस्था",
        signs: "फफोले सूखकर काले-भूरे खुरंड (Scabs) बनना, थनों से खून आना।",
        positiveRecovery: "खुरंड गिरकर स्वस्थ त्वचा आना।",
        negativeDeterioration: "थनों के छिद्र बंद होना और थनैला।"
      },
      {
        stage: 4,
        title: "सिस्टमिक शीप/गोट पॉक्स",
        signs: "भेड़-बकरियों में फेफड़ों व आंतों में पॉक्स लीजन्स, सांस रुकना, 50% मृत्यु दर।",
        positiveRecovery: "गहन एंटीबायोटिक कवर से जीवन रक्षा।",
        negativeDeterioration: "पल्मोनरी अरेस्ट से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Enrofloxacin / Ceftriaxone", dose: "5 mg/kg या 10 mg/kg", route: "I/M", days: "3-5 दिन" },
        { name: "Inj. Melonex Plus", dose: "10-15 ml", route: "I/M", days: "3 दिन" },
        { name: "Inj. Avil", dose: "10 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "विटामिन ए, डी3, ई व एच (Vimeral)", dose: "10 ml", frequency: "दैनिक त्वचा हीलिंग हेतु" }
      ],
      ayurvedic: [
        { name: "नीम तेल + हल्दी लेप", dose: "थनों व त्वचा पर दिन में 2 बार" }
      ],
      homeopathic: [
        { name: "Thuja 200C + Antimonium Tart 200C + Silicea 30C", potency: "200C", drops: "15 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "थनों पर ग्लिसरीन में बोरिक एसिड पाउडर मिलाकर लगाएं ताकि त्वचा मुलायम रहे और दोहते समय फटे नहीं।",
        "नीम की पत्तियों के काढ़े से घावों की रोजाना धुलाई करें।"
      ],
      biosecurity: [
        "भेड़-बकरियों में प्रतिवर्ष Goat Pox / Sheep Pox वैक्सीन अवश्य लगाएं।",
        "दूध दोहने वाला व्यक्ति हाथ अच्छी तरह साबुन से धोए (काउ पॉक्स मनुष्यों में फैल सकता है)।"
      ]
    }
  },
  {
    id: "ibr",
    nameHi: "आईबीआर (Infectious Bovine Rhinotracheitis - IBR)",
    nameEn: "Infectious Bovine Rhinotracheitis (Red Nose)",
    category: "viral",
    species: ["गाय", "भैंस"],
    tempRange: "104.5 - 107.0°F",
    cardinalSigns: [
      "नाक की अंदरूनी श्लेष्मा का अत्यंत लाल व शोथयुक्त होना (Red Nose Disease)",
      "नाक व आंखों से प्रचुर स्राव, पलकों पर सफेद धब्बे (Corneal Opacity / conjunctivitis)",
      "गाभिन गायों में गर्भावस्था के किसी भी चरण में अचानक गर्भपात एवं योनि पर दाने (IPV)"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "रेस्पिरेटरी अवस्था",
        signs: "अत्यधिक तेज बुखार, नाक पर भयानक लाली, तेज सांस, खांसी, लार गिरना।",
        positiveRecovery: "सपोर्टिव केयर से 7-10 दिन में श्वास लक्षण सामान्य।",
        negativeDeterioration: "संक्रमण का श्वास नली से फेफड़ों में फैलना।"
      },
      {
        stage: 2,
        title: "नेक्रोटिक राइनो-ट्रेकाइटिस",
        signs: "नाक में सफेद-पीली झिल्ली (Diphtheritic membrane) बनना, सांस में घरघराहट।",
        positiveRecovery: "एंटीबायोटिक से सेकेंडरी निमोनिया पर नियंत्रण।",
        negativeDeterioration: "गंभीर डिस्पेनिया।"
      },
      {
        stage: 3,
        title: "जनन अंग अवस्था (IPV/IPB)",
        signs: "योनि और शिश्न पर लाल दाने व अल्सर, संभोग से कतराना, गाभिन में गर्भपात।",
        positiveRecovery: "लोकल एंटीसेप्टिक वॉश से जनन अंग सामान्य।",
        negativeDeterioration: "भ्रूण की मृत्यु।"
      },
      {
        stage: 4,
        title: "सुप्त अवस्था (Latent Carrier)",
        signs: "तनाव या स्टेरॉयड देने पर वायरस का पुनः सक्रिय होना, जीवन भर वाहक रहना।",
        positiveRecovery: "लागू नहीं।",
        negativeDeterioration: "वीर्य द्वारा अन्य मादाओं में संक्रमण प्रसार।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Ceftiofur Sodium", dose: "2.2 mg/kg", route: "I/M", days: "3-5 दिन" },
        { name: "Inj. Flunixin Meglumine", dose: "2.2 mg/kg", route: "I/V", days: "2-3 दिन" },
        { name: "Inj. Avil", dose: "10 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "विटामिन-सी + विटामिन-ए टॉनिक", dose: "दैनिक", frequency: "म्यूकोसा हीलिंग हेतु" }
      ],
      ayurvedic: [
        { name: "वासावलेह + सितोपलादि चूर्ण", dose: "30 ग्राम दिन में दो बार" }
      ],
      homeopathic: [
        { name: "Euphrasia 200C + Aconite 200C + Kali Bichrom 200C", potency: "200C", drops: "15 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "भाप देना: गर्म पानी में नीलगिरी (Eucalyptus) का तेल या विक्स डालकर पशु को भाप दिलाएं।",
        "आंखों में गुनगुने बोरिक एसिड लोशन (2%) की बूंदें डालें।"
      ],
      biosecurity: [
        "संक्रमित सांडों के वीर्य का उपयोग AI में कतई न करें; सीमन स्टेशन पर IBR मुक्त सांड ही रखें।",
        "झुंड में आईबीआर वैक्सीन का नियमित टीकाकरण सुनिश्चित करें।"
      ]
    }
  },

  // ==========================================================================
  // 3. रक्त परजीवी रोग (PROTOZOAL & HEMOPARASITIC DISEASES)
  // ==========================================================================
  {
    id: "surra",
    nameHi: "सर्रा / तीबरसा (Surra / Trypanosomiasis)",
    nameEn: "Bovine Trypanosomiasis (Surra)",
    category: "protozoal",
    species: ["ऊंट", "घोड़ा", "गाय", "भैंस", "कुत्ता"],
    tempRange: "103.0 - 106.0°F (रुक-रुक कर आने वाला बुखार)",
    cardinalSigns: [
      "रुक-रुक कर आने वाला तेज बुखार (Intermittent Fever) जो सामान्य एंटीबायोटिक से नहीं उतरता",
      "तंत्रिका संबंधी लक्षण: गोल-गोल चक्कर काटना, दीवार से सिर टकराना, आंखों से अंधापन (Corneal Opacity)",
      "शरीर के निचले हिस्सों (पेट, अंडकोष, पैरों) में पानी भरी सूजन एवं भारी एनीमिया"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "पैरासाइटेमिक अवस्था",
        signs: "रुक-रुक कर तेज बुखार (105°F), सुस्ती, आंखों से आंसू, दूध में अचानक 50% कमी।",
        positiveRecovery: "ट्रिपैनोसाइड दवा से 24 घंटे में परजीवी रक्त से समाप्त।",
        negativeDeterioration: "परजीवी का केंद्रीय तंत्रिका तंत्र (CNS) में प्रवेश।"
      },
      {
        stage: 2,
        title: "एनीमिक व एडिमा अवस्था",
        signs: "आंखों व मसूड़ों का पीला/सफेद पड़ना, पेट व पैरों में सूजन, तेजी से वजन गिरना।",
        positiveRecovery: "आयरन टॉनिक व दवा से रक्त कणों में सुधार।",
        negativeDeterioration: "मस्तिष्क के न्यूरॉन्स में सूजन।"
      },
      {
        stage: 3,
        title: "न्यूरोलॉजिकल अवस्था (उन्मत्त रूप)",
        signs: "दीवार से सिर टकराना, पागलों की तरह भागना या चक्कर काटना, अंधापन, दांत पीसना।",
        positiveRecovery: "संभावना 30% (यदि मस्तिष्क क्षति स्थायी न हुई हो)।",
        negativeDeterioration: "कोमा और पक्षाघात।"
      },
      {
        stage: 4,
        title: "टर्मिनल कोमा",
        signs: "पशु का जमीन पर गिरकर गर्दन पीछे मोड़ना, ऐंठन, सांस रुकने से मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "कार्डियोरेस्पिरेटरी अरेस्ट।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Quinapyramine Sulfate + Prosalt (Triquin / Suratec)", dose: "4.4 mg/kg (2.5 gm/vial)", route: "S/C strictly", days: "एकल खुराक (उपचार व बचाव)" },
        { name: "Inj. Diminazene Aceturate (Berenil)", dose: "3.5 - 7 mg/kg", route: "Deep I/M", days: "एकल खुराक (वैकल्पिक)" },
        { name: "Inj. Melonex Plus", dose: "15 ml", route: "I/M", days: "2 दिन" },
        { name: "Inj. Feritas / Imferon (Iron Sorbitol)", dose: "10 ml", route: "I/M", days: "एनीमिया सुधार हेतु अल्टरनेट डेज" }
      ],
      oral: [
        { name: "Sharkferrol / Ferikind सिरप", dose: "50 ml", frequency: "दैनिक 15 दिन" }
      ],
      ayurvedic: [
        { name: "पुनर्नवारिष्ट + लोहासव", dose: "50 ml दिन में दो बार" }
      ],
      homeopathic: [
        { name: "China 200C + Arsenic Alb 200C", potency: "200C", drops: "15 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "100 ग्राम पुराना गुड़, 10 ग्राम हल्दी और 10 ग्राम काली मिर्च मिलाकर रोज दें।",
        "पशु को पूर्ण आराम दें और धूप से बचाकर ठंडी छांव में रखें।"
      ],
      biosecurity: [
        "सर्रा रोग Tabanus (डंस) और Stomoxys मक्खियों द्वारा फैलता है; बरसात में मक्खी नियंत्रण अनिवार्य है।",
        "संक्रमित क्षेत्रों में मानसून से पूर्व Quinapyramine Prosalt का प्रिवेंटिव टीका लगवाएं।"
      ]
    }
  },
  {
    id: "babesiosis",
    nameHi: "बबेसियोसिस / लाल पेशाब (Babesiosis / Red Water Disease)",
    nameEn: "Bovine Babesiosis (Tick Fever)",
    category: "protozoal",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "105.0 - 107.0°F (अति तीव्र ज्वर)",
    cardinalSigns: [
      "पेशाब का रंग गहरा लाल, कॉफी या वाइन जैसा होना (Hemoglobinuria)",
      "तेज बुखार (106°F+) के साथ आरबीसी (लाल रक्त कण) का तेजी से टूटना और भयंकर एनीमिया",
      "शरीर पर भारी संख्या में चिचड़ियां (Boophilus microplus Ticks) चिपकी होना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "तीव्र हेमोलिटिक अवस्था",
        signs: "अचानक 106°F बुखार, पेशाब का रंग कॉफी जैसा लाल, सांस फूलना, दिल की धड़कन तेज।",
        positiveRecovery: "बेरेनिल का इंजेक्शन लगते ही 24 घंटे में पेशाब का रंग सामान्य होने लगता है।",
        negativeDeterioration: "आरबीसी की व्यापक क्षति (Packed Cell Volume < 15%)।"
      },
      {
        stage: 2,
        title: "एनीमिक व पीलिया अवस्था",
        signs: "श्लेष्मा झिल्ली का पीला/सफेद पड़ना (Jaundice), लड़खड़ाहट, तेज कमजोरी।",
        positiveRecovery: "आयरन और डेक्सट्रोज ड्रिप से तेजी से सुधार।",
        negativeDeterioration: "मस्तिष्क में परजीवी जमने से नर्वस लक्षण (Cerebral Babesiosis)।"
      },
      {
        stage: 3,
        title: "सेरेब्रल / रीनल अवस्था",
        signs: "दीवार से सिर टकराना, दांत पीसना, पेशाब बंद होना, गुर्दों का फेल होना।",
        positiveRecovery: "संभावना 25-30%।",
        negativeDeterioration: "हाइपोक्सिक ऑर्गन फेलियर।"
      },
      {
        stage: 4,
        title: "टर्मिनल शॉक",
        signs: "तापमान का तेजी से गिरना (<99°F), गंभीर हाइपोथर्मिया, मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "कार्डियक अरेस्ट।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Diminazene Aceturate (Berenil / Babenil)", dose: "3.5 - 5 mg/kg (8-10 ml/100kg)", route: "Deep I/M", days: "एकल खुराक (सर्वोत्तम प्रभाव)" },
        { name: "Inj. Imidocarb Dipropionate (Imizol)", dose: "1.2 - 3 mg/kg", route: "S/C", days: "एकल खुराक (वैकल्पिक)" },
        { name: "Inj. Melonex Plus", dose: "15 ml", route: "I/M", days: "2 दिन" },
        { name: "Inj. Feritas / Imferon (Iron)", dose: "10 ml", route: "I/M", days: "एनीमिया दूर करने हेतु 3 दिन" },
        { name: "Inj. Dextrose Saline 5%", dose: "1-2 लीटर", route: "I/V", days: "गुर्दों की सुरक्षा हेतु" }
      ],
      oral: [
        { name: "Sharkferrol सिरप", dose: "50 ml", frequency: "दिन में दो बार 10 दिन" }
      ],
      ayurvedic: [
        { name: "पुनर्नवा मंडूर + लोहासव", dose: "50 ml दिन में दो बार" }
      ],
      homeopathic: [
        { name: "Crotalus Horridus 200C + Phosphorus 200C + China 200C", potency: "200C", drops: "15 बूंदें हर 2 घंटे पर" }
      ],
      desiRemedies: [
        "पशु को ठंडा, छायादार स्थान दें और गुड़ का ठंडा शर्बत पिलाएं।",
        "चिचड़ियों को हाथ से खींचकर न निकालें; नीम के काढ़े या फ्लूमेथ्रिन से नष्ट करें।"
      ],
      biosecurity: [
        "चिचड़ी (Ticks) का खात्मा ही एकमात्र पक्का बचाव है (Flumethrin / Amitraz pour-on लगाएं)।",
        "संकर (Crossbred) और विदेशी नस्ल की गायों में चिचड़ी नियंत्रण पर विशेष ध्यान दें।"
      ]
    }
  },
  {
    id: "theileriosis",
    nameHi: "थाइलेरियोसिस / चिचड़ी बुखार (Bovine Theileriosis)",
    nameEn: "Bovine Theileriosis",
    category: "protozoal",
    species: ["गाय", "भैंस"],
    tempRange: "105.0 - 106.5°F",
    cardinalSigns: [
      "कंधे के आगे की लिम्फ ग्रंथि (Pre-scapular Lymph Node) में कठोर, बड़ी सूजन",
      "लगातार तेज बुखार (105°F+) जो सामान्य एंटीबायोटिक्स से बिल्कुल नहीं उतरता",
      "गंभीर एनीमिया, आंखों की पुतलियों पर सफेद धब्बे (Corneal Opacity / White Eyes) व सांस फूलना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "लिम्फोपोलिफेरेटिव अवस्था",
        signs: "प्रीस्कैपुलर लिम्फ नोड में सूजन, तेज बुखार, आंख-नाक से स्राव, चारा बंद।",
        positiveRecovery: "बुपरवाक्वोन (Buparvaquone) की सही समय पर सिंगल डोज़ से 90% रिकवरी।",
        negativeDeterioration: "परजीवी का एरिथ्रोसाइट्स (RBCs) में प्रवेश।"
      },
      {
        stage: 2,
        title: "एनीमिक अवस्था",
        signs: "आंखों व मसूड़ों का सफेद पड़ना, सांस तेज चलना, पुतलियों पर सफेदी, कमजोरी।",
        positiveRecovery: "ऑक्सीटेट्रासाइक्लिन व आयरन सपोर्ट से हीमोग्लोबिन में सुधार।",
        negativeDeterioration: "फेफड़ों में पानी भरना (Pulmonary Edema)।"
      },
      {
        stage: 3,
        title: "पल्मोनरी एडिमा अवस्था",
        signs: "नाक से सफेद झाग निकलना, मुंह खोलकर सांस लेना, पेट में सूजन, बैठने में लाचार।",
        positiveRecovery: "गहन आईसीयू केयर व ड्यूरेटिक्स से जीवन रक्षा।",
        negativeDeterioration: "गंभीर हाइपोक्सिया।"
      },
      {
        stage: 4,
        title: "टर्मिनल एस्फिक्सिया",
        signs: "फेफड़ों में पानी भरने से दम घुटना, अचेतावस्था, मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "एस्फिक्सिया से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Buparvaquone (Butalex / Zubion)", dose: "2.5 mg/kg (1 ml/20kg)", route: "Deep I/M गर्दन में", days: "एकल खुराक (जीवन रक्षक)" },
        { name: "Inj. Oxytetracycline LA", dose: "20 mg/kg", route: "Deep I/M", days: "सपोर्टिव हेतु" },
        { name: "Inj. Melonex Plus", dose: "15 ml", route: "I/M", days: "3 दिन" },
        { name: "Inj. Feritas / Imferon", dose: "10 ml", route: "I/M", days: "एनीमिया दूर करने हेतु" },
        { name: "Inj. Lasix (Furosemide - यदि पल्मोनरी एडिमा हो)", dose: "5-10 ml", route: "I/M", days: "सावधानीपूर्वक" }
      ],
      oral: [
        { name: "Sharkferrol सिरप", dose: "50 ml", frequency: "दिन में दो बार 15 दिन" }
      ],
      ayurvedic: [
        { name: "पुनर्नवा मंडूर + आरोग्यवर्धिनी वटी", dose: "5-5 गोली दिन में दो बार" }
      ],
      homeopathic: [
        { name: "China 200C + Arsenic Alb 200C + Ceanothus 30C", potency: "200C/30C", drops: "15 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "नीम की पत्तियों का काढ़ा बनाकर पशु के पूरे शरीर पर लगाएं ताकि चिचड़ियां तुरंत भागें।",
        "गुड़, हल्दी और सोंठ का लड्डू बनाकर खिलाएं।"
      ],
      biosecurity: [
        "संकर गोवंश में Hyalomma चिचड़ियों का समूल नाश करें।",
        "संकर बछड़ियों में 2 माह की उम्र के बाद Rakshavac-T (Theileria Vaccine) अवश्य लगवाएं।"
      ]
    }
  },
  {
    id: "anaplasmosis",
    nameHi: "एनाप्लास्मोसिस / पीलिया बुखार (Anaplasmosis / Gall Sickness)",
    nameEn: "Bovine Anaplasmosis",
    category: "protozoal",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "103.5 - 105.5°F",
    cardinalSigns: [
      "गंभीर पीलिया (Severe Jaundice): आंखें, मसूड़े व थन की त्वचा का नींबू जैसा गहरा पीला पड़ना",
      "बिना लाल पेशाब के अत्यधिक खून की कमी (Severe Anemia without Hemoglobinuria)",
      "सूखा, कठोर, काले रंग का गोबर आना जिस पर बलगम व खून लगा होना (Severe Constipation)"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक ज्वर अवस्था",
        signs: "बुखार, भूख बंद, सुस्ती, जुगाली बंद, दूध में 70% तक की भारी गिरावट।",
        positiveRecovery: "ऑक्सीटेट्रासाइक्लिन से 48 घंटे में आरबीसी का विनाश रुक जाता है।",
        negativeDeterioration: "आरबीसी की इंट्रासेल्युलर क्षति और पीलिया।"
      },
      {
        stage: 2,
        title: "पीलिया अवस्था (Jaundice Phase)",
        signs: "आंखों व योनि की श्लेष्मा का पीला पड़ना, सांस फूलना, नब्ज तेज, सूखा गोबर।",
        positiveRecovery: "लिवर सपोर्ट व एंटीबायोटिक से धीरे-धीरे पीलिया कम होना।",
        negativeDeterioration: "ऑक्सीजन ले जाने की क्षमता 70% तक कम होना।"
      },
      {
        stage: 3,
        title: "हाइपोक्सिक अवस्था",
        signs: "हल्का सा चलने पर गिर पड़ना, अत्यधिक आक्रामकता (मस्तिष्क में ऑक्सीजन कमी से), लड़खड़ाहट।",
        positiveRecovery: "रक्त आधान (Blood Transfusion) व सघन देखभाल से 40% जीवन रक्षा।",
        negativeDeterioration: "मायोकार्डियल हाइपोक्सिया।"
      },
      {
        stage: 4,
        title: "कोमा व मृत्यु",
        signs: "पशु का लेटे रहना, सांस में अत्यधिक तकलीफ, कार्डियक अरेस्ट से मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "मल्टीपल ऑर्गन फेलियर।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Oxytetracycline LA", dose: "20 mg/kg", route: "Deep I/M", days: "72 घंटे बाद पुनः 1 बार" },
        { name: "Inj. Imidocarb Dipropionate", dose: "3 mg/kg", route: "S/C", days: "एकल खुराक (वैकल्पिक)" },
        { name: "Inj. Belamyl (B-Complex + Liver Extract)", dose: "10-15 ml", route: "I/M", days: "5 दिन (अति आवश्यक)" },
        { name: "Inj. Feritas (Iron)", dose: "10 ml", route: "I/M", days: "अल्टरनेट डेज" }
      ],
      oral: [
        { name: "Liv-52 / Brotone लिक्विड", dose: "100 ml", frequency: "दिन में दो बार 10 दिन" },
        { name: "Liquid Paraffin (कब्ज खोलने हेतु)", dose: "500 ml", frequency: "एकल खुराक" }
      ],
      ayurvedic: [
        { name: "आरोग्यवर्धिनी वटी + पुनर्नवा चूर्ण", dose: "10 गोली + 30 ग्राम दैनिक" }
      ],
      homeopathic: [
        { name: "Chelidonium 200C + Phosphorus 200C + China 200C", potency: "200C", drops: "15 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "गन्ने का रस, ग्लूकोज का पानी या पुराना गुड़ खूब पिलाएं ताकि लिवर को ऊर्जा मिले।",
        "मूली के पत्तों का रस 250 मिली दिन में दो बार पिलाएं।"
      ],
      biosecurity: [
        "चिचड़ी (Ticks) और खून चूसने वाली मक्खियों का रासायनिक नियंत्रण करें।",
        "एक सुई (Needle) का उपयोग कई पशुओं में न करें (एनाप्लाज्मा सुई द्वारा तेजी से फैलता है)।"
      ]
    }
  },
  {
    id: "coccidiosis",
    nameHi: "कोक्सीडियोसिस / खूनी दस्त (Coccidiosis / Red Dysentery)",
    nameEn: "Bovine & Caprine Coccidiosis",
    category: "protozoal",
    species: ["बछड़े", "भेड़", "बकरी", "गाय", "भैंस"],
    tempRange: "102.0 - 104.0°F",
    cardinalSigns: [
      "पतले दस्त के साथ ताजा गाढ़ा खून, थक्के एवं आंतों की श्लेष्मा (Mucus) आना",
      "गोबर करते समय अत्यधिक मरोड़ व जोर लगाना (Tenesmus) जिससे कांच (Prolapse) निकल आना",
      "गंभीर डिहाइड्रेशन, पेट दर्द से पीठ को ऊपर उठाना एवं पिछले पैरों का दुर्बल होना"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक आंत्र शोथ",
        signs: "गोबर में गीलापन, हल्का बुखार, सुस्ती, चारा कम खाना, पेट में मरोड़।",
        positiveRecovery: "सल्फा दवाओं से 48 घंटे में दस्त में सुधार।",
        negativeDeterioration: "आंतों के म्यूकोसा का व्यापक क्षरण।"
      },
      {
        stage: 2,
        title: "खूनी पेचिश अवस्था",
        signs: "काले या लाल खूनी दस्त, गोबर करते समय जोर लगाना, गुदा का बाहर आना।",
        positiveRecovery: "एंटी-कोक्सीडियल व हेमोस्टैटिक दवा से रक्तस्राव बंद होना।",
        negativeDeterioration: "गंभीर एनीमिया और आंतों का अल्सर।"
      },
      {
        stage: 3,
        title: "डिहाइड्रेशन व दुर्बलता",
        signs: "आंखें धंसना, पशु का खड़ा न हो पाना, अत्यधिक प्यास, शरीर ठंडा पड़ना।",
        positiveRecovery: "आई/वी फ्लूइड्स से जीवन रक्षा संभव।",
        negativeDeterioration: "हाइपोवोलेमिया।"
      },
      {
        stage: 4,
        title: "टर्मिनल अवस्था",
        signs: "कोमा, आंतों में गैंग्रीन, 7-10 दिनों में बछड़ों/मेमनों की मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "शॉक से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Sulfa / Trimethoprim + Sulfamethoxazole", dose: "15-24 mg/kg", route: "धीमी I/V या I/M", days: "3-5 दिन" },
        { name: "Inj. Botropase / Chrome (खून रोकने हेतु)", dose: "2-5 ml", route: "I/M", days: "2 दिन" },
        { name: "Inj. Melonex (दर्द कम करने हेतु)", dose: "0.5 mg/kg", route: "I/M", days: "2 दिन" }
      ],
      oral: [
        { name: "Amprolium पाउडर (Amprosol)", dose: "10 mg/kg", frequency: "दैनिक 5 दिन (सर्वोत्तम कोक्सीडियोस्टैट)" },
        { name: "Bolus Sulpha-D", dose: "1 बोलस प्रति 50kg", frequency: "दिन में दो बार 3 दिन" }
      ],
      ayurvedic: [
        { name: "कुटज घनवटी + बेल पाउडर", dose: "दैनिक" }
      ],
      homeopathic: [
        { name: "Merc Cor 200C + Ipecac 200C", potency: "200C", drops: "10 बूंदें दिन में 4 बार" }
      ],
      desiRemedies: [
        "अनार के छिलके का काढ़ा और ईसबगोल की भूसी छाछ में मिलाकर पिलाएं।",
        "कत्था (खैर) 5 ग्राम पानी में घोलकर पिलाएं (खून रोकने हेतु)।"
      ],
      biosecurity: [
        "बाड़े को सूखा रखें; सीलन व गंदे फर्श पर कोक्सीडिया के ओओसिस्ट (Oocysts) तेजी से पनपते हैं।",
        "छोटे बछड़ों और मेमनों के दाने-पानी के बर्तनों को गोबर के संपर्क से पूरी तरह दूर रखें।"
      ]
    }
  },

  // ==========================================================================
  // 4. उपापचयी व पोषण संबंधी रोग (METABOLIC & NUTRITIONAL DISEASES)
  // ==========================================================================
  {
    id: "milk_fever",
    nameHi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever / Hypocalcemia)",
    nameEn: "Milk Fever (Hypocalcemia)",
    category: "metabolic",
    species: ["गाय", "भैंस", "बकरी"],
    tempRange: "97.0 - 100.0°F (शरीर का तापमान सामान्य से कम / Hypothermia)",
    cardinalSigns: [
      "ब्याने के 24 से 72 घंटे के भीतर पशु का गर्दन मोड़कर पेट पर रखकर बैठना (S-Shape Curve / Sternal Recumbency)",
      "पशु के कान, पैर और पूरे शरीर का छूने पर असामान्य रूप से ठंडा लगना (Cold Extremities)",
      "आंखों की पुतलियों का फैलना (Dilated Pupils), सुस्ती, गोबर-पेशाब का बंद होना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक उत्तेजना अवस्था",
        signs: "हल्की बेचैनी, सिर हिलाना, दांत पीसना, पिछले पैरों में कंपकंपी, लड़खड़ाहट।",
        positiveRecovery: "ओरल कैल्शियम जेल देने से तुरंत सुधार, पशु बैठने से बच जाता है।",
        negativeDeterioration: "मांसपेशियों की शक्ति समाप्त होना और पशु का गिरना।"
      },
      {
        stage: 2,
        title: "स्टर्नल रिकम्बेंसी (विशिष्ट अवस्था)",
        signs: "पशु का बैठ जाना, गर्दन मोड़कर पुट्ठे पर रखना, शरीर ठंडा, गोबर-पेशाब बंद।",
        positiveRecovery: "आई/वी कैल्शियम ड्रिप लगते ही 15-30 मिनट में कान गर्म होना, गोबर करना व खड़े होना।",
        negativeDeterioration: "पशु का करवट के बल गिरना।"
      },
      {
        stage: 3,
        title: "लेटरल रिकम्बेंसी (कोमा अवस्था)",
        signs: "पशु का जमीन पर करवट के बल फैल जाना, पेट में भारी अफारा, बेहोशी, अत्यंत धीमी नब्ज।",
        positiveRecovery: "अत्यंत सावधानीपूर्वक धीमी कैल्शियम ड्रिप से जीवन रक्षा संभव।",
        negativeDeterioration: "हार्ट फेलियर और ब्लोट से दम घुटना।"
      },
      {
        stage: 4,
        title: "मृत्यु अवस्था",
        signs: "कोमा, रेस्पिरेटरी फेलियर, कार्डियक अरेस्ट, 6-12 घंटे में मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Calcium Borogluconate 25% (CBG / Mifex)", dose: "450 ml (300ml धीमी I/V + 150ml S/C)", route: "I/V व S/C", days: "एकल खुराक (अति धीमी I/V)" },
        { name: "Inj. Tonophosphan (Phosphorus)", dose: "10-15 ml", route: "I/M", days: "2 दिन" },
        { name: "Inj. Tribivet (B-Complex)", dose: "10 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "कैल्शियम जेल (Cal-Up / Ostovet Gel)", dose: "300 ग्राम", frequency: "होश में आने पर 12 घंटे के अंतराल पर 2 ट्यूब" }
      ],
      ayurvedic: [],
      homeopathic: [
        { name: "Calcarea Phos 200C + Belladonna 200C", potency: "200C", drops: "20 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "पशु के कान और पैरों की सूखी गर्म बोरी से तेजी से मालिश करें ताकि रक्त संचार बढ़े।",
        "बेहोशी की हालत में कभी भी नाल द्वारा मुंह से कुछ न पिलाएं (फेफड़ों में जाने का खतरा)।"
      ],
      biosecurity: [
        "ब्याने से 15 दिन पूर्व आहार में अधिक कैल्शियम न दें (नेगेटिव कैल्शियम बैलेंस रखें ताकि पैराथायरॉयड ग्रंथि सक्रिय रहे)।",
        "ब्याने के तुरंत बाद पहली बाल्टी में कैल्शियम जेल व ऊर्जा टॉनिक दें।"
      ]
    }
  },
  {
    id: "ketosis",
    nameHi: "कीटोशिस / एसीटोनमिया (Bovine Ketosis / Acetonemia)",
    nameEn: "Bovine Ketosis",
    category: "metabolic",
    species: ["गाय", "भैंस"],
    tempRange: "101.5°F (सामान्य)",
    cardinalSigns: [
      "पशु की सांस, ताजे निकाले दूध एवं पेशाब से मीठी एसीटोन (Fruity / Sweetish Chloroform) जैसी गंध",
      "पशु का दाना-बांटा छोड़कर केवल सूखा भूसा खाना (Depraved Selective Appetite)",
      "दूध उत्पादन में अचानक 50-70% की भारी गिरावट एवं तेजी से पेट पिचकना (Rapid Emaciation)"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "सब-क्लिनिकल अवस्था",
        signs: "दूध में हल्की गिरावट, दूध में फैट% बढ़ना पर SNF घटना, ब्लड कीटोन > 1.2 mmol/L।",
        positiveRecovery: "प्रोपलीन ग्लाइकोल पिलाने से 2 दिन में पूर्ण रिकवरी।",
        negativeDeterioration: "क्लिनिकल कीटोसिस में रूपांतरण।"
      },
      {
        stage: 2,
        title: "वेस्टिंग फॉर्म (Wasting Form)",
        signs: "भूख की विचित्रता (दाना बंद, भूसा चालू), सांस से मीठी गंध, आंखें अंदर धंसना।",
        positiveRecovery: "डेक्सट्रोज आई/वी और कॉर्टिकोस्टेरॉयड से 48 घंटे में दाना खाना शुरू।",
        negativeDeterioration: "नर्वस कीटोसिस का रूप लेना।"
      },
      {
        stage: 3,
        title: "नर्वस फॉर्म (Nervous Ketosis)",
        signs: "दीवार चाटना, अंधापन, अपने पैरों को लगातार चाटना, गोल-गोल घूमना, आक्रामकता।",
        positiveRecovery: "सघन ग्लूकोज थेरेपी से 24 घंटे में तंत्रिका लक्षण शांत।",
        negativeDeterioration: "गंभीर हेपेटिक लिपिडोसिस (फैटी लिवर)।"
      },
      {
        stage: 4,
        title: "क्रोनिक लिवर फेलियर",
        signs: "अत्यधिक कमजोरी, स्थायी लिवर क्षति, पशु का उठ न पाना।",
        positiveRecovery: "अत्यंत धीमी रिकवरी।",
        negativeDeterioration: "लिवर फेलियर से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Dextrose 20% या 25%", dose: "1000 - 1500 ml", route: "तेज I/V", days: "2-3 दिन" },
        { name: "Inj. Isoflupredone Acetate (Predef 2X)", dose: "10-20 mg", route: "I/M", days: "एकल खुराक (ग्लूकोनियोजेनेसिस हेतु)" },
        { name: "Inj. Tribivet (B1, B6, B12)", dose: "15 ml", route: "I/M", days: "5 दिन" }
      ],
      oral: [
        { name: "Propylene Glycol (प्रोपलीन ग्लाइकोल)", dose: "200-250 ml", frequency: "दिन में दो बार 4 दिन (सर्वोत्तम ओरल इलाज)" },
        { name: "Niacinamide बोलस", dose: "1 बोलस", frequency: "दिन में एक बार 5 दिन" }
      ],
      ayurvedic: [
        { name: "लिवर टॉनिक (Liv-52)", dose: "100 ml दिन में दो बार" }
      ],
      homeopathic: [
        { name: "Lycopodium 200C + Chelidonium 200C", potency: "200C", drops: "15 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "250 ग्राम पुराना गुड़ + 50 मिली कच्ची घानी सरसों का तेल पानी में मिलाकर 5 दिन पिलाएं।",
        "पशु को ऊर्जा युक्त दलिया (गेहूं, मक्का, चोकर) धीरे-धीरे देना शुरू करें।"
      ],
      biosecurity: [
        "ब्याने के समय पशु अत्यधिक मोटा (Over-conditioned BCS > 4) या अत्यधिक दुबला न हो।",
        "ब्याने के बाद उच्च उत्पादक गायों को ट्रांजिशन फीड व पर्याप्त बाईपास फैट/एनर्जी सप्लीमेंट दें।"
      ]
    }
  },
  {
    id: "acute_bloat",
    nameHi: "तीव्र आफरा / रूमेन टिम्पनी (Acute Bloat / Tympanites)",
    nameEn: "Acute Bloat (Tympany)",
    category: "metabolic",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "101.5°F (सामान्य या सांस फूलने से हल्का बढ़ा)",
    cardinalSigns: [
      "बाएं पेट (Left Paralumbar Fossa) का ढोलक की भांति फूलकर ऊपर उठ जाना",
      "हाथ से थपथपाने पर पेट से ढोल जैसी गूंजती आवाज (Drum-like Tympanitic Sound)",
      "भीषण छटपटाहट, मुंह खोलकर जीभ बाहर निकाल हांफना एवं दम घुटने से आंखों का फटना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक गैसीय फैलाव",
        signs: "बायां पेट हल्का फूला, बेचैनी, बार-बार उठना-बैठना, जुगाली बंद, पूंछ हिलाना।",
        positiveRecovery: "तारपीन तेल व पाचक दवा से 1 घंटे में डकार आकर पेट सामान्य।",
        negativeDeterioration: "रूमेन के दबाव से डायफ्राम का फेफड़ों पर चढ़ना।"
      },
      {
        stage: 2,
        title: "मध्यम संकट अवस्था",
        signs: "बायां पेट पूरी तरह तना, सांस लेने में तकलीफ, मुंह से झागदार लार, आंखें लाल।",
        positiveRecovery: "पेट नली (Stomach Tube) या एंटी-ब्लोट लिक्विड से राहत।",
        negativeDeterioration: "हार्ट और फेफड़ों पर असहनीय दबाव।"
      },
      {
        stage: 3,
        title: "गंभीर आपातकाल (Severe Asphyxia)",
        signs: "जीभ बाहर लटकना, सायनोसिस (जीभ नीली पड़ना), लड़खड़ाकर गिरना, पशु का कराहना।",
        positiveRecovery: "ट्रोकार एवं कैन्युला (Trocar & Cannula) द्वारा तुरंत गैस निकासी से जीवन रक्षा।",
        negativeDeterioration: "फेफड़ों के फटने या दम घुटने से अचानक मृत्यु।"
      },
      {
        stage: 4,
        title: "टर्मिनल अवस्था",
        signs: "पशु का जमीन पर गिरना, पुतलियां फैलना, कार्डियक अरेस्ट, कुछ ही मिनटों में मृत्यु।",
        positiveRecovery: "लागू नहीं।",
        negativeDeterioration: "दम घुटने से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Spasmovet / Melonex", dose: "10-15 ml", route: "I/M", days: "आंतों के दर्द में" },
        { name: "Inj. Belamyl", dose: "10 ml", route: "I/M", days: "सपोर्टिव" }
      ],
      oral: [
        { name: "Tympol / Bloatosil लिक्विड", dose: "100 ml", frequency: "तुरंत नाल से (सर्वोत्तम एंटी-फोमिंग)" },
        { name: "मीठा तेल (सरसों) + तारपीन का तेल", dose: "300 ml + 30-50 ml", frequency: "तुरंत नाल से" }
      ],
      ayurvedic: [
        { name: "Himalayan Batisa / Pachak चूर्ण", dose: "50-100 ग्राम गुड़ में" }
      ],
      homeopathic: [
        { name: "Carbo Veg 200C + Colocynth 200C + Nux Vomica 200C", potency: "200C", drops: "20 बूंदें हर 15 मिनट पर" }
      ],
      desiRemedies: [
        "50 ग्राम शुद्ध हींग, 50 मिली तारपीन का तेल और 300 मिली सरसों का तेल मिलाकर नाल से तुरंत पिलाएं।",
        "पशु के मुंह में लकड़ी की खपच्ची (Bit) आड़ी बांधें ताकि पशु मुंह चलाए और डकार के साथ गैस निकले।",
        "पशु के अगले पैरों को ऊंचे स्थान पर खड़ा करें ताकि फेफड़ों पर दबाव कम पड़े।"
      ],
      biosecurity: [
        "अति-आपातकाल में बाएं फ्लैंक के ठीक बीच में Trocar & Cannula अथवा 16G सुई चुभोकर गैस निकालें।",
        "पशु को भूखे पेट अत्यधिक गीला बरसीम, लूसर्न या सड़ा-गला दाना कभी न खाने दें।"
      ]
    }
  },
  {
    id: "downer_cow",
    nameHi: "डाउनेर काऊ सिंड्रोम (Downer Cow Syndrome)",
    nameEn: "Downer Cow Syndrome",
    category: "metabolic",
    species: ["गाय", "भैंस"],
    tempRange: "100.5 - 102.0°F (सामान्य)",
    cardinalSigns: [
      "मिल्क फीवर का सफल उपचार (कैल्शियम थेरेपी) होने के बाद भी पशु का खड़े न हो पाना",
      "पशु का पूर्ण सचेत रहना, चारा-पानी सामान्य रूप से खाना परंतु पिछले पैरों में खड़े होने की ताकत न होना",
      "जमीन पर लगातार बैठे रहने से पुट्ठों व घुटनों पर बड़े घाव (Pressure Sores / Decubitus Ulcers) बन जाना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "पोस्ट-कैल्शियम डाउनर",
        signs: "पशु सचेत, गोबर-पेशाब चालू, चारा खा रहा है पर पिछले पैरों पर वजन नहीं ले पाता।",
        positiveRecovery: "सपोर्टिव स्लिंग व नसों के टॉनिक से 48 घंटे में खड़े होने की संभावना।",
        negativeDeterioration: "मांसपेशियों में इस्केमिक नेक्रोसिस का प्रारंभ।"
      },
      {
        stage: 2,
        title: "इस्केमिक मायोपैथी अवस्था",
        signs: "बैठने से पिछले पैरों की नसों व भारी मांसपेशियों में रक्त प्रवाह रुकना, पैरों का सुन्न होना।",
        positiveRecovery: "बार-बार करवट बदलने और मालिश से रिकवरी।",
        negativeDeterioration: "ऑब्ट्यूरेटर व सियाटिक नर्व का स्थायी डैमेज।"
      },
      {
        stage: 3,
        title: "क्रोनिक डाउनर अवस्था",
        signs: "हड्डी के उभारों पर गहरे सड़न वाले घाव, रेंगने का प्रयास (Creeper cow), हताशा।",
        positiveRecovery: "वाटर बाथ फ्लोटेशन टैंक या मैकेनिकल हॉइस्ट से 20% सुधार।",
        negativeDeterioration: "गंभीर मायोसाइटिस और सेप्टीसीमिया।"
      },
      {
        stage: 4,
        title: "टर्मिनल अवस्था",
        signs: "पशु का पूरी तरह हताश होकर खाना छोड़ना, अंततः सेप्टीसीमिया से मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "यूथेनेशिया या मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Tonophosphan (Sodium Acid Phosphate)", dose: "15-20 ml", route: "I/M या I/V", days: "5 दिन (फास्फोरस संबल)" },
        { name: "Inj. Neuroxin-12 / Mecovet (Mecobalamin)", dose: "10-15 ml", route: "I/M", days: "7 दिन (नसों की हीलिंग)" },
        { name: "Inj. Melonex Plus", dose: "15 ml", route: "I/M", days: "3 दिन दर्द निवारण हेतु" },
        { name: "Inj. Mifex (Calcium)", dose: "200 ml", route: "S/C", days: "वैकल्पिक सहारा" }
      ],
      oral: [
        { name: "पोटेशियम क्लोराइड (KCl) पाउडर", dose: "50 ग्राम", frequency: "दैनिक (हाइपोकैलिमिया निवारण)" },
        { name: "विटामिन ई + सेलेनियम पाउडर", dose: "20 ग्राम", frequency: "दैनिक" }
      ],
      ayurvedic: [
        { name: "महाविषगर्भ तेल", dose: "पैरों व रीढ़ की हड्डी पर मालिश" }
      ],
      homeopathic: [
        { name: "Causticum 200C + Arnica 200C + Rhus Tox 200C", potency: "200C", drops: "20 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "पशु को दिन में 4-5 बार करवट बदलवाएं ताकि एक ही तरफ का रक्त प्रवाह न रुके।",
        "पैरों और पुट्ठों पर गर्म सरसों के तेल में कपूर और लहसुन पकाकर तेज मालिश करें।",
        "पशु के नीचे 6 इंच मोटा सूखा भूसा या रेत का मुलायम बिछावन रखें।"
      ],
      biosecurity: [
        "गाय को उठाने के लिए काउ-लिफ्टर (Cow Lifter/Sling) का प्रयोग अत्यंत सावधानी से करें, ज्यादा देर न लटकाएं।",
        "मिल्क फीवर का इलाज पहले ही घंटे में करें ताकि पशु डाउनर बनने से बच सके।"
      ]
    }
  },
  {
    id: "grass_tetany",
    nameHi: "ग्रास टेटनी / मैग्नीशियम कमी (Grass Tetany / Hypomagnesemia)",
    nameEn: "Grass Tetany (Hypomagnesemic Tetany)",
    category: "metabolic",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "102.0 - 105.0°F (ऐंठन से बढ़ता है)",
    cardinalSigns: [
      "रक्त में मैग्नीशियम की कमी से अचानक भयानक ऐंठन, मांसपेशियों में फड़कन व कंपकंपी",
      "पशु का अत्यधिक आक्रामक व पागल जैसा व्यवहार, बिना वजह दौड़ना, आंखें फाड़कर देखना",
      "जमीन पर गिरकर दांत पीसना, कानों का फड़कना एवं साइकिल की तरह पैर चलाना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक अति-संवेदनशीलता",
        signs: "पशु का चौंकना, कान पीछे तानना, सिर ऊंचा रखना, झुंड से अलग चलना, हल्की आहट पर भड़कना।",
        positiveRecovery: "तुरंत ओरल मैग्नीशियम जेल या घोल देने से 1 घंटे में शांति।",
        negativeDeterioration: "मांसपेशियों के अनियंत्रित संकुचन की शुरुआत।"
      },
      {
        stage: 2,
        title: "कन्वल्शन अवस्था",
        signs: "लड़खड़ाहट, जमीन पर गिरना, पूरे शरीर में भयानक झटके, दांत पीसना, झागदार लार।",
        positiveRecovery: "धीमी आई/वी मैग्नीशियम-कैल्शियम ड्रिप से 30 मिनट में ऐंठन बंद।",
        negativeDeterioration: "कार्डियक अतालता (Arrhythmia)।"
      },
      {
        stage: 3,
        title: "कोमा अवस्था",
        signs: "दिल की धड़कन 150+ प्रति मिनट, सांस अत्यंत तेज, आंखों की पुतलियां स्थिर।",
        positiveRecovery: "संभावना 30% (दिल की धड़कन रुकने का भारी खतरा)।",
        negativeDeterioration: "हार्ट फेलियर।"
      },
      {
        stage: 4,
        title: "मृत्यु अवस्था",
        signs: "लक्षण दिखने के 1 से 4 घंटे में रेस्पिरेटरी अरेस्ट से मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Magnesium Sulfate 20% + Calcium Borogluconate", dose: "400-500 ml", route: "धीमी I/V (हृदय गति जांचते हुए) + S/C", days: "एकल खुराक" },
        { name: "Inj. Diazepam / Spasmovet", dose: "5-10 ml", route: "I/M", days: "ऐंठन रोकने हेतु" }
      ],
      oral: [
        { name: "Magnesium Oxide (मैग्नीशिया पाउडर)", dose: "50-100 ग्राम", frequency: "दैनिक 7 दिन" }
      ],
      ayurvedic: [],
      homeopathic: [
        { name: "Mag Phos 200C + Cuprum Met 200C", potency: "200C", drops: "15 बूंदें हर 30 मिनट पर" }
      ],
      desiRemedies: [
        "पशु को शांत व अंधेरे स्थान पर रखें, कोई भी तेज आवाज या हलचल न करें।",
        "सेंधा नमक और मिनरल मिक्सचर चारे में मिलाकर दें।"
      ],
      biosecurity: [
        "अत्यधिक नाइट्रोजन और पोटाश खाद लगे नए रसीले हरे चारे पर पशु को अचानक अकेला न चरने दें।",
        "हरे चारे के साथ सूखा भूसा और मैग्नीशियम सप्लीमेंट अवश्य दें।"
      ]
    }
  },
  {
    id: "pph",
    nameHi: "पीपीएच / ब्याने बाद लाल पेशाब (Post-Parturient Hemoglobinuria - PPH)",
    nameEn: "Post-Parturient Hemoglobinuria (PPH)",
    category: "metabolic",
    species: ["भैंस", "गाय"],
    tempRange: "101.5°F (सामान्य - बुखार बिल्कुल नहीं होता)",
    cardinalSigns: [
      "ब्याने के 15 से 45 दिन के भीतर पेशाब का रंग कॉफी, कोका-कोला या गहरा लाल होना",
      "शरीर का तापमान बिल्कुल सामान्य रहना (बुखार न होना इसे बबेसियोसिस से अलग करता है)",
      "फास्फोरस की भारी कमी से लाल रक्त कणों का फटना, अत्यधिक कमजोरी एवं पीलिया"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक फास्फोरस ह्रास",
        signs: "पेशाब का रंग हल्का लाल/भूरा, दूध में कमी, सुस्ती, चारा थोड़ा कम खाना।",
        positiveRecovery: "सोडियम एसिड फास्फेट के इंजेक्शन से 24-48 घंटे में पेशाब का रंग साफ।",
        negativeDeterioration: "आरबीसी का तीव्र गति से लिसिस (Intravascular Hemolysis)।"
      },
      {
        stage: 2,
        title: "गंभीर हीमोग्लोबिन्यूरिया",
        signs: "पेशाब का रंग गहरा कॉफी जैसा, आंखें पीली पड़ना (Jaundice), सांस फूलना, नब्ज तेज।",
        positiveRecovery: "आई/वी फास्फोरस व एंटी-ऑक्सीडेंट से 3-4 दिन में रिकवरी।",
        negativeDeterioration: "हीमोग्लोबिन स्तर 4 gm/dL से नीचे गिरना।"
      },
      {
        stage: 3,
        title: "एनीमिक एनोक्सिया",
        signs: "पशु का गिर पड़ना, हृदय की तेज धड़कन (Jumping Heart Sound), अत्यधिक दुर्बलता।",
        positiveRecovery: "रक्त आधान (Blood Transfusion 3-4 लीटर) से ही जीवन संभव।",
        negativeDeterioration: "गंभीर ऊतक हाइपोक्सिया।"
      },
      {
        stage: 4,
        title: "टर्मिनल अवस्था",
        signs: "कोमा, सांस उखड़ना, दिल की विफलता से मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Sodium Acid Phosphate (Tonophosphan / Urumin)", dose: "60-80 ml (आधा I/V + आधा S/C)", route: "I/V व S/C", days: "3-4 दिन (रामबाण उपचार)" },
        { name: "Inj. Feritas / Imferon (Iron)", dose: "10 ml", route: "I/M", days: "अल्टरनेट डेज" },
        { name: "Inj. Vitamin C (Ascorbic Acid)", dose: "20 ml", route: "I/V", days: "आरबीसी की झिल्ली मजबूत करने हेतु" },
        { name: "Inj. Tribivet", dose: "10 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "Dicalcium Phosphate (DCP) पाउडर", dose: "100 ग्राम", frequency: "दैनिक 10 दिन" },
        { name: "सोडा बाईकार्ब (मीठा सोडा)", dose: "100 ग्राम", frequency: "एसिडोसिस रोकने हेतु" }
      ],
      ayurvedic: [],
      homeopathic: [
        { name: "Phosphorus 200C + Crotalus Horridus 200C", potency: "200C", drops: "20 बूंदें दिन में 4 बार" }
      ],
      desiRemedies: [
        "100 मिली तिल का तेल और 250 ग्राम पुराना गुड़ पानी में घोलकर 5 दिन पिलाएं।",
        "पशु को बरसीम, क्रूसिफेरी (सरसों, राई, गोभी) का हरा चारा कतई न दें (ये हीमोलिसिस बढ़ाते हैं)।"
      ],
      biosecurity: [
        "ताजा ब्याही उच्च उत्पादक भैंसों को आहार में मिनरल मिक्सचर (फास्फोरस युक्त) नियमित दें।",
        "ब्याने के बाद केवल बरसीम चारे पर निर्भर न रहें; साथ में सूखा भूसा और दाना अवश्य दें।"
      ]
    }
  },
  {
    id: "rumen_acidosis",
    nameHi: "रूमेन एसिडोसिस / दाना अपच (Rumen Acidosis / Grain Overload)",
    nameEn: "Lactic Acidosis (Grain Overload)",
    category: "metabolic",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "98.0 - 101.0°F (गंभीर स्थिति में तापमान कम)",
    cardinalSigns: [
      "अचानक अत्यधिक अनाज, आटा, चावल, रोटी या गुड़ खाने का पक्का इतिहास",
      "पेट से गड़गड़ाहट की आवाज (Fluid Splashing Sound) एवं खट्टा, बदबूदार मटमैला पानी जैसा दस्त",
      "पशु का सुस्त होकर बैठना, पेट में मरोड़, लड़खड़ाहट एवं रूमेन की गति (Motility) पूरी तरह शून्य होना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक अम्लीय किण्वन",
        signs: "रूमेन pH 5.0 से नीचे गिरना, बेचैनी, सुस्ती, चारा छोड़ना, दांत पीसना।",
        positiveRecovery: "मीठा सोडा ओरल पिलाने से 6 घंटे में सुधार।",
        negativeDeterioration: "लैक्टिक एसिड का रक्त में अवशोषण।"
      },
      {
        stage: 2,
        title: "सिस्टमिक एसिडोसिस",
        signs: "रूमेन pH < 4.5, पतला खट्टा दस्त, आंखें धंसना, निर्जलीकरण, पैर ठंडे।",
        positiveRecovery: "आई/वी सोडियम बाईकार्बोनेट व रूमेन लैवेज से जीवन रक्षा।",
        negativeDeterioration: "रूमेन म्यूकोसा का जलना (Chemical Rumenitis)।"
      },
      {
        stage: 3,
        title: "टॉक्सिक डिहाइड्रेशन",
        signs: "पशु का लेट जाना, उठने में असमर्थ, शरीर ठंडा, शॉक, पेशाब पूरी तरह बंद।",
        positiveRecovery: "संभावना 30% (सघन आई/वी चिकित्सा से)।",
        negativeDeterioration: "मल्टी-ऑर्गन डैमेज और फंगल रूमेनाइटिस।"
      },
      {
        stage: 4,
        title: "टर्मिनल शॉक",
        signs: "कोमा, गंभीर हाइपोथर्मिया, रीनल फेलियर, 24-48 घंटे में मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Sodium Bicarbonate 5% (1.4%)", dose: "1-2 लीटर", route: "धीमी I/V", days: "एसिडोसिस समाप्त करने हेतु तुरंत" },
        { name: "Inj. Ringer's Lactate कतई न दें (यह लैक्टिक एसिडोसिस बढ़ाता है)", dose: "निषेध", route: "N/A", days: "N/A" },
        { name: "Inj. Tribivet (B1 - Thiamine अति आवश्यक)", dose: "15-20 ml", route: "I/M", days: "3 दिन (पोलियोएन्सेफेलोमैलेशिया रोकने)" },
        { name: "Inj. Melonex (दर्दनिवारक)", dose: "15 ml", route: "I/M", days: "2 दिन" }
      ],
      oral: [
        { name: "मीठा सोडा (Sodium Bicarbonate)", dose: "150-250 ग्राम ठंडे पानी में", frequency: "तुरंत नाल से" },
        { name: "Magnesium Hydroxide / Antacid सस्पेंशन", dose: "300-500 ml", frequency: "नाल से" },
        { name: "रूमेन माइक्रोफ्लोरा बोलस (Bioboost)", dose: "4 बोलस", frequency: "एसिडिटी शांत होने पर" }
      ],
      ayurvedic: [],
      homeopathic: [
        { name: "Nux Vomica 200C + Carbo Veg 200C + Antim Crud 200C", potency: "200C", drops: "20 बूंदें हर घंटे पर" }
      ],
      desiRemedies: [
        "तुरंत 200 ग्राम मीठा सोडा 1 लीटर ठंडे पानी में घोलकर पिलाएं।",
        "गंभीर स्थिति में पेट नली (Stomach Tube) से रूमेन का सारा खट्टा पानी बाहर निकालें (Rumen Lavage)।",
        "दाना, अनाज, आटा तुरंत पूरी तरह बंद रखें; केवल सूखा भूसा दें।"
      ],
      biosecurity: [
        "दाना, गेहूं, चावल और पशु आहार को हमेशा ताले में बंद कमरे में रखें ताकि पशु खुला छूटकर न खा सके।",
        "आहार में अनाज की मात्रा धीरे-धीरे 2 सप्ताह में बढ़ाएं, अचानक नहीं।"
      ]
    }
  },
  {
    id: "pica",
    nameHi: "पाइका / अखाद्य वस्तुएं खाना (Pica / Depraved Appetite)",
    nameEn: "Pica (Depraved Appetite)",
    category: "metabolic",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "101.5°F (सामान्य)",
    cardinalSigns: [
      "पशु का असामान्य व अखाद्य वस्तुएं जैसे मिट्टी, पत्थर, प्लास्टिक, चमड़ा, लकड़ी या कपड़े चबाना",
      "दीवारों और खूंटों को चाटना, अन्य जानवरों का पेशाब पीना",
      "फास्फोरस, सोडियम अथवा सूक्ष्म खनिजों की पुरानी कमी से दूध उत्पादन व चमक में कमी"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक चाटने की अवस्था",
        signs: "दीवार चाटना, खूंटा चबाना, मिट्टी सूंघना।",
        positiveRecovery: "नमक व मिनरल मिक्सचर देने से 1 सप्ताह में पूर्ण सुधार।",
        negativeDeterioration: "हार्डवेयर और प्लास्टिक निगलना।"
      },
      {
        stage: 2,
        title: "सक्रिय पाइका अवस्था",
        signs: "प्लास्टिक की थैलियां, जूते, पत्थर खाना, हड्डियां चबाना, बाल झड़ना।",
        positiveRecovery: "फास्फोरस इंजेक्शन व संतुलित आहार से आदत छूटना।",
        negativeDeterioration: "रूमेन में प्लास्टिक का गोला (Phytobezoar) बनना।"
      },
      {
        stage: 3,
        title: "जटिलता अवस्था (रूमेन रुकावट)",
        signs: "भूख बंद, बार-बार हल्का अफारा, गोबर कम आना, आंतों में रुकावट।",
        positiveRecovery: "रूमेनोटोमी सर्जरी द्वारा प्लास्टिक निकालने पर जीवन रक्षा।",
        negativeDeterioration: "रूमेन इम्पैक्शन।"
      },
      {
        stage: 4,
        title: "अंतिम अवस्था",
        signs: "पूर्ण रूमेन रुकावट, कंकाल बनना, पेरिटोनिटिस, अंततः मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "स्टार्वेशन व सेप्सिस से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Tonophosphan (Sodium Acid Phosphate)", dose: "10-15 ml", route: "I/M", days: "सप्ताह में दो बार (3 सप्ताह)" },
        { name: "Inj. Neuroxin-12", dose: "10 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "एग्रोमिन / चेलेटेड मिनरल मिक्सचर", dose: "50-100 ग्राम", frequency: "दैनिक नियमित आहार में" },
        { name: "सादा नमक (Sodium Chloride)", dose: "30-50 ग्राम", frequency: "दैनिक आहार में अनिवार्य" }
      ],
      ayurvedic: [],
      homeopathic: [
        { name: "Alumina 200C + Calcarea Carb 200C + Silicea 200C", potency: "200C", drops: "15 बूंदें दिन में दो बार" }
      ],
      desiRemedies: [
        "बाड़े में सेंधा नमक का बड़ा ढेला बांधकर लटका दें ताकि पशु उसे जब चाहे चाट सके।",
        "पशु को कृमिनाशक दवा (Albendazole / Ivermectin) अवश्य दें (पेट के कीड़ों से भी पाइका होता है)।"
      ],
      biosecurity: [
        "बाड़े व चारागाह को प्लास्टिक थैलियों, तारों व नुकीली वस्तुओं से पूरी तरह मुक्त रखें।",
        "पशु आहार में दैनिक 50 ग्राम मिनरल मिक्सचर और 30 ग्राम सादा नमक कभी बंद न करें।"
      ]
    }
  },

  // ==========================================================================
  // 5. विषाक्तता (TOXICOLOGY & POISONING)
  // ==========================================================================
  {
    id: "hcn_poisoning",
    nameHi: "कच्ची चरी विषाक्तता / साइनाइड (HCN / Cyanide Poisoning)",
    nameEn: "Cyanide (HCN / Prussic Acid) Poisoning",
    category: "toxicology",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "101.5°F (सामान्य या शॉक में कम)",
    cardinalSigns: [
      "कच्ची, छोटी, सूखे से प्रभावित चरी (ज्वार), सूडान घास या अलसी खाने के 15-30 मिनट में भयंकर लक्षण",
      "रक्त का रंग अत्यंत चमकीला चेरी जैसा लाल (Bright Cherry-Red Blood) होना",
      "भयानक सांस फूलना (Air Hunger), पुतलियों का फैलना, ऐंठन एवं 1 घंटे में दम घुटकर मृत्यु"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "अति-तीव्र श्वासावरोध अवस्था",
        signs: "चारा खाने के तुरंत बाद बेचैनी, तेज सांस, पुतलियां फैलना, लड़खड़ाहट, लार बहना।",
        positiveRecovery: "तुरंत एंटीडोट (सोडियम थायोसल्फेट + नाइट्राइट) देने पर 5 मिनट में चमत्कारिक जीवन रक्षा।",
        negativeDeterioration: "सेल्युलर एंजाइम साइटोक्रोम ऑक्सीडेज का पूरी तरह ब्लॉक होना।"
      },
      {
        stage: 2,
        title: "कन्वल्शन अवस्था",
        signs: "पशु का गिर पड़ना, सिर पीछे की ओर मुड़ना, भयानक झटके, जीभ बाहर, आंखें स्थिर।",
        positiveRecovery: "तत्काल आई/वी एंटीडोट से 70% रिकवरी।",
        negativeDeterioration: "सेल्युलर एस्फिक्सिया (ऑक्सीजन होते हुए भी कोशिकाएं सांस नहीं ले पातीं)।"
      },
      {
        stage: 3,
        title: "कोमा अवस्था",
        signs: "अचेत अवस्था, दिल की धड़कन अनियमित व धीमी, सांस उखड़ना।",
        positiveRecovery: "संभावना 20%।",
        negativeDeterioration: "मस्तिष्क मृत्यु।"
      },
      {
        stage: 4,
        title: "मृत्यु",
        signs: "दम घुटने से 15 से 45 मिनट के भीतर मृत्यु।",
        positiveRecovery: "लागू नहीं।",
        negativeDeterioration: "मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Sodium Nitrite (3% Sol) + Sodium Thiosulfate (25% Sol)", dose: "1 gm Sodium Nitrite + 25 gm Sodium Thiosulfate (100-200 ml पानी में)", route: "धीमी I/V", days: "विशिष्ट एंटीडोट (जीवन रक्षक)" },
        { name: "Inj. Methylene Blue 1%", dose: "1-2 mg/kg", route: "धीमी I/V", days: "वैकल्पिक एंटीडोट" }
      ],
      oral: [
        { name: "Sodium Thiosulfate पाउडर (हाइपो)", dose: "30-50 ग्राम पानी में", frequency: "रूमेन में शेष साइनाइड नष्ट करने हेतु" }
      ],
      ayurvedic: [],
      homeopathic: [
        { name: "Hydrocyanic Acid 200C", potency: "200C", drops: "आपातकालीन स्थिति में" }
      ],
      desiRemedies: [
        "तुरंत 500 ग्राम पुराना गुड़ या शीरा 1 लीटर पानी में घोलकर नाल से पिलाएं (गुड़ का ग्लूकोज साइनाइड से जुड़कर साइनोहाइड्रिन बनाता है जो कम विषैला होता है)।",
        "पशु को ताजी हवादार जगह पर रखें।"
      ],
      biosecurity: [
        "कम बारिश या सूखे से पीड़ित 2 फीट से छोटी कच्ची ज्वार (चरी) पशुओं को कतई न खिलाएं।",
        "ज्वार में फूल आने के बाद ही कटाई करें; काटने के बाद धूप में सुखाकर खिलाने से HCN उड़ जाता है।"
      ]
    }
  },
  {
    id: "urea_toxicity",
    nameHi: "यूरिया विषाक्तता (Urea Toxicity / Ammonia Poisoning)",
    nameEn: "Urea / Non-Protein Nitrogen (NPN) Toxicity",
    category: "toxicology",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "101.5 - 103.0°F",
    cardinalSigns: [
      "यूरिया युक्त चारा या खाद की बोरी चाटने के 20 से 60 मिनट में अचानक भीषण लक्षण",
      "मुंह से प्रचुर मात्रा में गाढ़ी झागदार लार, दांत पीसना एवं पेट में असहनीय दर्द व मरोड़",
      "मांसपेशियों में भयंकर कंपकंपी, पिछले पैरों का लड़खड़ाना, सांस फूलना एवं रूमेन का फूलना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "हाइपर-अमोनिया अवस्था",
        signs: "बेचैनी, अत्यधिक लार, कान व चेहरे की मांसपेशियों में फड़कन, तेज सांस, बार-बार पेशाब।",
        positiveRecovery: "तुरंत ठंडा सिरका (Vinegar) व पानी पिलाने से 100% जीवन रक्षा।",
        negativeDeterioration: "अमोनिया का रक्त में अवशोषण एवं रूमेन pH 8.0 से ऊपर जाना।"
      },
      {
        stage: 2,
        title: "न्यूरोलॉजिकल उत्तेजना",
        signs: "लड़खड़ाना, गिर पड़ना, सिर पीछे खींचना, सांस में घुरघुर, गंभीर आफरा।",
        positiveRecovery: "सिरका + आई/वी सेलाइन से 60% रिकवरी।",
        negativeDeterioration: "सेंट्रल नर्वस सिस्टम का गंभीर अवसाद।"
      },
      {
        stage: 3,
        title: "कन्वल्शन व सायनोसिस",
        signs: "लगातार ऐंठन, जीभ बाहर, सांस रुक-रुक कर आना, दिल की धड़कन तेज।",
        positiveRecovery: "संभावना 20%।",
        negativeDeterioration: "श्वसन पक्षाघात।"
      },
      {
        stage: 4,
        title: "टर्मिनल अवस्था",
        signs: "कोमा, रेस्पिरेटरी अरेस्ट, 1 से 2 घंटे के भीतर मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Normal Saline (0.9% NaCl)", dose: "2-3 लीटर", route: "I/V", days: "अमोनिया डाइल्यूट करने हेतु" },
        { name: "Inj. Spasmovet / Melonex", dose: "15 ml", route: "I/M", days: "पेट दर्द कम करने हेतु" }
      ],
      oral: [
        { name: "सिरका (5% Acetic Acid / Vinegar)", dose: "2 से 4 लीटर", frequency: "तुरंत 20-30 लीटर ठंडे पानी के साथ नाल से (अचूक एंटीडोट)" }
      ],
      ayurvedic: [],
      homeopathic: [],
      desiRemedies: [
        "घर में उपलब्ध कोई भी सिरका (गन्ने, जामुन या सिंथेटिक सिरका) तुरंत 2 से 3 लीटर ठंडे पानी में घोलकर फौरन पिलाएं (एसिटिक एसिड अमोनिया को अमोनियम एसीटेट में बदल देता है जो अवशोषित नहीं होता)।",
        "यदि सिरका न मिले तो 1-2 किलोग्राम नींबू का रस या खट्टी छाछ ठंडे पानी में मिलाकर तुरंत पिलाएं।"
      ],
      biosecurity: [
        "यूरिया खाद की बोरियों को पशुओं की पहुंच से दूर हमेशा ताले में रखें।",
        "यूरिया उपचारित भूसा बनाते समय 100 किग्रा भूसे में 4 किग्रा से अधिक यूरिया कभी न मिलाएं और अच्छी तरह सुखाकर खिलाएं।"
      ]
    }
  },
  {
    id: "nitrate_poisoning",
    nameHi: "नाइट्रेट/नाइट्राइट विषाक्तता (Nitrate / Nitrite Poisoning)",
    nameEn: "Nitrate / Nitrite Toxicity",
    category: "toxicology",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "100.5 - 101.5°F (अंतिम अवस्था में कम)",
    cardinalSigns: [
      "रक्त का रंग गहरा चॉकलेट या भूरा (Chocolate Brown Blood) हो जाना",
      "अत्यधिक नाइट्रोजन खाद लगे चारे या खरपतवार (जंगली चौलाई/बाथू) खाने का इतिहास",
      "गंभीर श्वासावरोध (Dyspnea), नीली श्लेष्मा (Cyanosis) एवं गाभिन पशुओं में अचानक गर्भपात"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "मेथेमोग्लोबिनेमिया अवस्था",
        signs: "तेज सांस, सुस्ती, मुंह खोलकर सांस लेना, नब्ज तेज व कमजोर, लार गिरना।",
        positiveRecovery: "मिथाइलीन ब्लू का इंजेक्शन लगते ही 15 मिनट में रक्त पुनः लाल और पशु सामान्य।",
        negativeDeterioration: "हीमोग्लोबिन का मेथेमोग्लोबिन में रूपांतरण (>50%)।"
      },
      {
        stage: 2,
        title: "हाइपोक्सिक सायनोसिस",
        signs: "मसूड़े व जीभ भूरी/नीली पड़ना, लड़खड़ाना, अत्यधिक कमजोरी, आंखें बाहर आना।",
        positiveRecovery: "आई/वी एंटीडोट से त्वरित जीवन रक्षा।",
        negativeDeterioration: "ऑक्सीजन परिवहन क्षमता पूरी तरह ठप होना।"
      },
      {
        stage: 3,
        title: "कन्वल्शन अवस्था",
        signs: "पशु का गिर पड़ना, जमीन पर सिर पटकना, ऐंठन, हाइपोथर्मिया।",
        positiveRecovery: "संभावना 30%।",
        negativeDeterioration: "मस्तिष्क हाइपोक्सिया।"
      },
      {
        stage: 4,
        title: "टर्मिनल अवस्था",
        signs: "कोमा, सांस उखड़ना, 1-3 घंटे में मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "एस्फिक्सिया से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Methylene Blue (1-2% Sol)", dose: "1-2 mg/kg (9 mg/kg तक)", route: "धीमी I/V", days: "विशिष्ट एंटीडोट (मेथेमोग्लोबिन को पुनः हीमोग्लोबिन बनाता है)" },
        { name: "Inj. Dextrose 5%", dose: "1 लीटर", route: "I/V", days: "सपोर्टिव" }
      ],
      oral: [
        { name: "Mineral Oil / Liquid Paraffin", dose: "1 लीटर", frequency: "आंतों से अवशोषण रोकने हेतु" }
      ],
      ayurvedic: [],
      homeopathic: [],
      desiRemedies: [
        "ठंडे पानी में 250 ग्राम ग्लूकोज घोलकर पिलाएं।",
        "पशु को पूर्ण विश्राम दें, दौड़ाएं बिल्कुल नहीं (ऑक्सीजन की मांग न बढ़ने दें)।"
      ],
      biosecurity: [
        "सूखे या ओलावृष्टि के तुरंत बाद अत्यधिक यूरिया लगे हरे चारे की कटाई न करें।",
        "नाइट्रेट संचयी खरपतवारों (जैसे जंगली चौलाई, पिगवीड, लैम्ब्सक्वार्टर) को बाड़े में न उगने दें।"
      ]
    }
  },
  {
    id: "op_poisoning",
    nameHi: "कीटनाशक / ऑर्गनोफॉस्फेट विषाक्तता (Organophosphate / OP Poisoning)",
    nameEn: "Organophosphate & Carbamate Poisoning",
    category: "toxicology",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "101.5°F (सामान्य या शॉक में कम)",
    cardinalSigns: [
      "SLUDGE लक्षण: अत्यधिक लार (Salivation), आंसू (Lacrimation), पेशाब (Urination), दस्त (Diarrhea), पेट दर्द व उल्टी",
      "आंखों की पुतलियों का अत्यंत सिकुड़कर पिन के छेद जैसा छोटा होना (Pin-point Pupils)",
      "मांसपेशियों में तीव्र फड़कन (Muscle Fasciculations) एवं फेफड़ों में पानी भरकर सांस फूलना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 3,
        title: "मस्कैरेनिक अवस्था (SLUDGE Phase)",
        signs: "प्रचुर लार, नाक व आंखों से पानी, पेट में गुड़गुड़ाहट, बार-बार पतला दस्त, पुतली सिकुड़ना।",
        positiveRecovery: "एट्रोपिन सल्फेट की उच्च खुराक से 10 मिनट में लार व स्राव सूख जाते हैं।",
        negativeDeterioration: "एसिटाइलकोलीन का तंत्रिकाओं में घातक जमाव।"
      },
      {
        stage: 2,
        title: "निकोटीनिक अवस्था (Muscle Twitches)",
        signs: "चेहरे, गर्दन व पुट्ठों की मांसपेशियों का तेजी से फड़कना, कंपन, कमजोरी, सांस में घरघराहट।",
        positiveRecovery: "2-PAM (प्रालिडोक्सिम) + एट्रोपिन से पूर्ण एंजाइम री-एक्टिवेशन।",
        negativeDeterioration: "श्वास मांसपेशियों का पक्षाघात।"
      },
      {
        stage: 3,
        title: "सीएनएस डिप्रेशन व ब्रोंकोस्पाज्म",
        signs: "फेफड़ों में अत्यधिक स्राव से दम घुटना, जमीन पर गिरना, ऐंठन, कोमा।",
        positiveRecovery: "गहन एट्रोपिनिनाइजेशन से जीवन रक्षा।",
        negativeDeterioration: "रेस्पिरेटरी अरेस्ट।"
      },
      {
        stage: 4,
        title: "टर्मिनल अवस्था",
        signs: "दम घुटने और कार्डियक अरेस्ट से मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Atropine Sulfate", dose: "0.2 - 0.5 mg/kg (1/3rd I/V + 2/3rd S/C या I/M)", route: "I/V व S/C", days: "विशिष्ट एंटीडोट (मुंह सूखने व पुतली फैलने तक हर 15 मिनट पर दोहराएं)" },
        { name: "Inj. Pralidoxime (2-PAM)", dose: "20-40 mg/kg", route: "धीमी I/V", days: "एंजाइम री-एक्टीवेटर (24 घंटे के भीतर दें)" }
      ],
      oral: [
        { name: "Activated Charcoal (एक्टिवेटेड चारकोल)", dose: "1-2 ग्राम/किग्रा पानी में", frequency: "आंतों से जहर सोखने हेतु तुरंत" },
        { name: "Magnesium Sulfate (सॉल्ट)", dose: "200-300 ग्राम", frequency: "पेट साफ करने हेतु" }
      ],
      ayurvedic: [],
      homeopathic: [],
      desiRemedies: [
        "यदि कीटनाशक दवा त्वचा पर गिरी हो तो पशु को तुरंत साबुन और प्रचुर ठंडे पानी से अच्छी तरह धोएं।",
        "मुंह से कोई तैलीय चीज (दूध या तेल) कतई न दें (यह जहर के अवशोषण को और बढ़ा देता है)।"
      ],
      biosecurity: [
        "खेतों में कीटनाशक छिड़कने वाले स्प्रे पंप को पशुओं के पीने के पानी के टैंक या नालियों में न धोएं।",
        "कीटनाशक छिड़के गए खेतों में पशुओं को कम से कम 21 दिन तक चरने न दें।"
      ]
    }
  },
  {
    id: "snake_bite",
    nameHi: "सर्पदंश (Snake Bite / Envenomation)",
    nameEn: "Snake Bite (Ophitoxaemia)",
    category: "toxicology",
    species: ["गाय", "भैंस", "भेड़", "बकरी", "कुत्ता"],
    tempRange: "100.5 - 102.0°F (शॉक में कम)",
    cardinalSigns: [
      "थूथन (Muzzle), होंठ, पैर या गर्दन पर सांप के दो दांतों के निशान (Fang Marks) एवं तीव्र सूजन",
      "वाइपर दंश: काटने के स्थान से न जमने वाला खून रिसना एवं व्यापक रक्तस्राव (Vasculotoxic)",
      "कोबरा/करैत दंश: जीभ बाहर निकलना, निगलने में असमर्थता, पुतलियां फैलना व पक्षाघात (Neurotoxic)"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "लोकल बाइट अवस्था",
        signs: "काटने के स्थान पर भयंकर सूजन, दर्द, खून रिसना, बेचैनी, तेज नब्ज।",
        positiveRecovery: "एंटी-स्नेक वेनम (ASV) की तुरंत आई/वी ड्रिप से 95% जीवन रक्षा।",
        negativeDeterioration: "विष का सिस्टमिक सर्कुलेशन में प्रसार।"
      },
      {
        stage: 2,
        title: "सिस्टमिक टॉक्सिसिटी अवस्था",
        signs: "वाइपर: नाक-मुंह व पेशाब में खून; कोबरा: लड़खड़ाना, जीभ बाहर, लार गिरना, सांस फूलना।",
        positiveRecovery: "एएसवी की अतिरिक्त खुराक से विष न्यूट्रलाइजेशन।",
        negativeDeterioration: "कोएगुलोपैथी या न्यूरोपैरालिसिस।"
      },
      {
        stage: 3,
        title: "पैरालिटिक / हेमरेजिक शॉक",
        signs: "पशु का गिर जाना, सांस लेने में अत्यंत कष्ट, रक्तचाप गिरना, बेहोशी।",
        positiveRecovery: "आईसीयू सपोर्ट व नियोस्टिग्मीन से रिकवरी की उम्मीद।",
        negativeDeterioration: "डायफ्राम का पक्षाघात।"
      },
      {
        stage: 4,
        title: "टर्मिनल अवस्था",
        signs: "सांस रुकना (न्यूरोटॉक्सिक) अथवा आंतरिक अंगों से अत्यधिक रक्तस्राव से मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Polyvalent Anti-Snake Venom Serum (ASV)", dose: "2-4 वायल (20-40 ml)", route: "धीमी I/V (Normal Saline में घोलकर)", days: "एकमात्र विशिष्ट एंटीडोट (तुरंत)" },
        { name: "Inj. Neostigmine + Atropine (कोबरा दंश में)", dose: "0.04 mg/kg", route: "I/M", days: "न्यूरोमस्कुलर रिकवरी हेतु" },
        { name: "Inj. Dexamethasone / Hydrocortisone", dose: "10-20 ml", route: "I/V", days: "एनाफाइलेक्सिस व सूजन रोकने" },
        { name: "Inj. Tetanus Toxoid (TT)", dose: "5 ml", route: "I/M", days: "एकल खुराक अनिवार्य" }
      ],
      oral: [],
      ayurvedic: [],
      homeopathic: [
        { name: "Lachesis 200C + Golondrina 200C + Ledum Pal 200C", potency: "200C", drops: "15 बूंदें हर 15 मिनट पर (सपोर्टिव)" }
      ],
      desiRemedies: [
        "दंश के स्थान पर ब्लेड से चीरा न लगाएं और न ही मुंह से जहर चूसें।",
        "पशु को शांत रखें, दौड़ाएं बिल्कुल नहीं ताकि जहर तेजी से न फैले; दंश वाले अंग को स्थिर रखें।"
      ],
      biosecurity: [
        "बाड़े में चूहे न पनपने दें (चूहों के पीछे ही सांप आते हैं) और बाड़े के आसपास घास-झाड़ियां साफ रखें।",
        "बरसात के मौसम में बाड़े के कोनों में कार्बोलिक एसिड या सल्फर पाउडर छिड़कें।"
      ]
    }
  },

  // ==========================================================================
  // 6. प्रसूति व प्रजनन समस्याएं (OBSTETRICAL & GYNECOLOGICAL)
  // ==========================================================================
  {
    id: "prolapse",
    nameHi: "बच्चेदानी बाहर आना / प्रोलैप्स (Uterine & Vaginal Prolapse)",
    nameEn: "Uterine & Vaginal Prolapse",
    category: "gynae",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "101.5°F (इन्फेक्शन होने पर 103°F+)",
    cardinalSigns: [
      "ब्याने से पहले या तुरंत बाद योनि या गर्भाशय का लाल-गुलाबी मांसल द्रव्यमान बाहर लटकना",
      "पशु का दर्द के मारे लगातार जोर लगाना (Straining) एवं गोबर-पेशाब में रुकावट",
      "बाहर निकले अंग में सूजन, मिट्टी लगना, चोट व नेक्रोसिस होने से अंग का काला पड़ना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक वेजाइनल प्रोलैप्स",
        signs: "बैठने पर योनि का छोटा सा भाग बाहर आना, खड़े होने पर अंदर चले जाना।",
        positiveRecovery: "सफाई व मिनरल सप्लीमेंट से 100% ठीक।",
        negativeDeterioration: "लगातार जोर लगाने से पूरा गर्भाशय बाहर आना।"
      },
      {
        stage: 2,
        title: "पूर्ण वेजाइनल / सर्विकल प्रोलैप्स",
        signs: "खड़े होने पर भी योनि व सर्विक्स बाहर लटकी रहना, अंग में सूजन।",
        positiveRecovery: "एपीड्यूरल एनेस्थीसिया देकर अंदर बैठाने व सीवन (Buhner's Stitch) से ठीक।",
        negativeDeterioration: "अंग का सूखना और फटना।"
      },
      {
        stage: 3,
        title: "पूर्ण यूटेराइन प्रोलैप्स (ब्याने के बाद)",
        signs: "पूरी बच्चेदानी उल्टी होकर बाहर, जिस पर लाल अंगूर जैसे कोटिलेडन्स चिपके होना।",
        positiveRecovery: "धोकर, सूजन घटाकर सुरक्षित अंदर चढ़ाने से जीवन रक्षा।",
        negativeDeterioration: "यूटेराइन आर्टरी फटने से भयंकर आंतरिक रक्तस्राव।"
      },
      {
        stage: 4,
        title: "सेप्टिक गैंग्रीनस प्रोलैप्स",
        signs: "बच्चेदानी का सड़कर काला पड़ना, कुत्तों या कौवों द्वारा नोचना, सेप्टिक शॉक।",
        positiveRecovery: "अंग विच्छेदन (Hysterectomy) ही अंतिम विकल्प।",
        negativeDeterioration: "रक्तस्राव व सेप्टीसीमिया से मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Epidural Anesthesia (Lignocaine 2%)", dose: "5-10 ml (प्रथम इंटरकोक्सीजियल स्पेस में)", route: "Epidural", days: "जोर लगाना रोकने हेतु तुरंत" },
        { name: "Inj. Intacef (Ceftriaxone)", dose: "3 gm", route: "I/M", days: "5 दिन" },
        { name: "Inj. Melonex Plus", dose: "15 ml", route: "I/M", days: "3 दिन" },
        { name: "Inj. Calcium Borogluconate (CBG)", dose: "450 ml", route: "धीमी I/V", days: "मांसपेशी टोन बढ़ाने हेतु" }
      ],
      oral: [
        { name: "Prolap-H / Utrovet पाउडर", dose: "100 ग्राम", frequency: "दैनिक 7 दिन" }
      ],
      ayurvedic: [
        { name: "लोध्र, माजूफल व फिटकरी का लेप", dose: "सूजन घटाने हेतु बाह्य" }
      ],
      homeopathic: [
        { name: "Sepia 200C + Podophyllum 200C + Arnica 200C", potency: "200C", drops: "20 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "बच्चेदानी को ठंडे पोटाश के हल्के पानी या बर्फ के पानी से अच्छी तरह धोकर साफ करें।",
        "सूजन कम करने के लिए अंग पर 500 ग्राम पिसी चीनी या ग्लिसरीन बुरकें (Osmotic De-edema)।",
        "साफ सूती कपड़े या प्लास्टिक शीट पर अंग को रखकर धीरे-धीरे अंदर धकेलें और पीछे खुर खूंटे से ऊंचे रखें।"
      ],
      biosecurity: [
        "पशु के बैठने का स्थान पीछे से ढलान वाला न हो; आगे से नीचा और पीछे से ऊंचा रखें।",
        "आहार में कैल्शियम, फास्फोरस व विटामिन-ई की कमी न होने दें।"
      ]
    }
  },
  {
    id: "rfm_rop",
    nameHi: "जेर का रुकना (Retention of Placenta - ROP/RFM)",
    nameEn: "Retention of Fetal Membranes (ROP)",
    category: "gynae",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "101.5°F (इन्फेक्शन होने पर 103.5°F+)",
    cardinalSigns: [
      "ब्याने के 8 से 12 घंटे बीत जाने के बाद भी जेर (Placenta) का गर्भाशय से बाहर न गिरना",
      "योनि से सड़ी हुई, बदबूदार जेर के टुकड़ों का लटकना एवं मवाद रिसना",
      "पशु का चारा कम करना, दूध में गिरावट एवं गर्भाशय में सड़न से बुखार चढ़ना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक रुकावट (8-12 घंटे)",
        signs: "जेर का कुछ हिस्सा बाहर लटकना, पशु सामान्य, हल्का जोर लगाना।",
        positiveRecovery: "हार्मोनल/आयुर्वेदिक दवाओं से 24 घंटे में जेर सुरक्षित बाहर।",
        negativeDeterioration: "जीवाणुओं का गर्भाशय में सड़न पैदा करना।"
      },
      {
        stage: 2,
        title: "प्यूट्रीफैक्शन अवस्था (24-48 घंटे)",
        signs: "जेर से भीषण बदबू आना, भूरा-काला स्राव, हल्का बुखार, दूध घटना।",
        positiveRecovery: "सिस्टमिक एंटीबायोटिक व यूटेराइन क्लींजर से गर्भाशय की सफाई।",
        negativeDeterioration: "टॉक्सिन्स का गर्भाशय दीवार से रक्त में अवशोषण।"
      },
      {
        stage: 3,
        title: "सेप्टिक मेट्राइटिस अवस्था",
        signs: "तेज बुखार (104°F), डिहाइड्रेशन, भूख बंद, दूध का सूख जाना, आंखें धंसना।",
        positiveRecovery: "गहन एंटीबायोटिक व फ्लुइड थेरेपी से जीवन रक्षा।",
        negativeDeterioration: "एंडोटॉक्सिक शॉक और लेमिनाइटिस।"
      },
      {
        stage: 4,
        title: "क्रोनिक एंडोमेट्राइटिस / बांझपन",
        signs: "लगातार मवाद आना, जेर का अंदर ही सड़कर निकलना, स्थायी बांझपन (Repeat Breeding)।",
        positiveRecovery: "गर्भाशय धुलाई (IU Infusion) से धीमी रिकवरी।",
        negativeDeterioration: "अनुत्पादक बांझपन।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Cloprostenol (PGF2 Alpha - Pragma/Vetmate)", dose: "2 ml (500 mcg)", route: "I/M", days: "एकल खुराक गर्भाशय संकुचन हेतु" },
        { name: "Inj. Intacef (Ceftriaxone)", dose: "3 gm", route: "I/M", days: "3-5 दिन (बुखार/इन्फेक्शन में)" },
        { name: "Inj. Melonex Plus", dose: "15 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "Liquid Replanta / Utrovet / Exapar", dose: "100-200 ml", frequency: "दिन में दो बार 3-5 दिन (अचूक यूटेराइन टॉनिक)" }
      ],
      ayurvedic: [],
      homeopathic: [
        { name: "Secale Cornutum 200C + Pulsatilla 200C + Sabina 200C", potency: "200C", drops: "20 बूंदें दिन में 4 बार" }
      ],
      desiRemedies: [
        "250 ग्राम पुराना गुड़, 25 ग्राम अजवाइन, 25 ग्राम सोंठ और 10 ग्राम मेथी 1 लीटर पानी में उबालकर गुनगुना पिलाएं।",
        "हाथ डालकर जेर को जबरदस्ती कतई न खींचें (इससे कोटिलेडन्स छिल जाते हैं, भयंकर रक्तस्राव व बांझपन होता है)।",
        "लटकती हुई जेर पर ईंट या पत्थर न बांधें; नीचे से अतिरिक्त लटकते हिस्से को काट दें ताकि गंदगी न लगे।"
      ],
      biosecurity: [
        "गर्भावस्था के अंतिम दिनों में आहार में विटामिन-ई व सेलेनियम की कमी न होने दें।",
        "ब्याने के स्थान को स्वच्छ, सूखा और रोगाणुरहित रखें।"
      ]
    }
  },
  {
    id: "dystocia",
    nameHi: "डिस्टोकिया / कठिन प्रसव (Dystocia / Difficult Calving)",
    nameEn: "Bovine Dystocia",
    category: "gynae",
    species: ["गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "101.5 - 103.0°F",
    cardinalSigns: [
      "प्रसव पीड़ा (Labor Pains) शुरू होने के 2-4 घंटे बाद भी बच्चे का बाहर न आना",
      "बच्चे के अंगों (पैर या सिर) का असामान्य दिशा में मुड़ा होना (Malpresentation / Malposture)",
      "पशु का अत्यधिक थककर निढाल हो जाना एवं योनि से बदबूदार सूखापन दिखना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "प्रारंभिक प्रसव रुकावट",
        signs: "जल की थैली (Water Bag) फूटने के 2 घंटे बाद भी पैर न दिखना, बेचैनी।",
        positiveRecovery: "हाथ में लुब्रिकेंट लगाकर तुरंत सही पोजीशन करने से सामान्य जन्म।",
        negativeDeterioration: "गर्भाशय का पानी सूखना।"
      },
      {
        stage: 2,
        title: "सूखा प्रसव (Uterine Inertia)",
        signs: "गर्भाशय तरल पूरी तरह सूखना, बच्चा जन्म नली में फंसना, पशु का जोर लगाना बंद करना।",
        positiveRecovery: "तरल पैराफिन/लुब्रिकेंट डालकर बच्चे को खींचने से जीवन रक्षा।",
        negativeDeterioration: "भ्रूण का दम घुटना।"
      },
      {
        stage: 3,
        title: "भ्रूण मृत्यु व इम्पैक्शन",
        signs: "बच्चे की जीभ सूजकर बाहर आना, धड़कन बंद, सर्विक्स संकुचित होना।",
        positiveRecovery: "भ्रूण-विच्छेदन (Fetotomy) या सिजेरियन (C-Section) से मां की जान बचाना।",
        negativeDeterioration: "गर्भाशय का फटना (Uterine Rupture)।"
      },
      {
        stage: 4,
        title: "सेप्टिक शॉक",
        signs: "बच्चा सड़ना (Fetal Maceration/Emphysema), मां का कोमा में जाना, मृत्यु।",
        positiveRecovery: "अत्यंत कठिन।",
        negativeDeterioration: "मां की मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Epidural Anesthesia (Lignocaine 2%)", dose: "5-8 ml", route: "Epidural", days: "अवांछित जोर रोकने व दर्द निवारण" },
        { name: "Inj. Dextrose 5% + Ringer's Lactate", dose: "2-3 लीटर", route: "I/V", days: "मां को ऊर्जा व पुनर्जीवन हेतु" },
        { name: "Inj. Melonex Plus", dose: "15 ml", route: "I/M", days: "दर्द व सूजन में" },
        { name: "Inj. Intacef (Ceftriaxone)", dose: "3 gm", route: "I/M", days: "3-5 दिन सेप्सिस रोकने" }
      ],
      oral: [],
      ayurvedic: [],
      homeopathic: [
        { name: "Caulophyllum 200C + Pulsatilla 200C", potency: "200C", drops: "15 बूंदें हर 30 मिनट पर (सर्विक्स खोलने हेतु)" }
      ],
      desiRemedies: [
        "योनि और गर्भाशय में 1 से 2 लीटर साफ गुनगुना मीठा तेल (सरसों) या लिक्विड पैराफिन डालें ताकि चिकनाहट बने।",
        "ट्रैक्टर या भारी बल से बच्चे को कभी न खींचें (इससे गर्भाशय व पेल्विस टूट जाती है)।"
      ],
      biosecurity: [
        "छोटी नस्ल की बछड़ियों में अत्यधिक बड़े सांड के वीर्य से AI न कराएं (Feto-pelvic disproportion से बचाव)।",
        "यदि बच्चा 2 घंटे में सही न हो तो तुरंत अधिकृत वेटरनरी सर्जन को बुलाएं।"
      ]
    }
  },
  {
    id: "metritis_pyometra",
    nameHi: "गर्भाशय शोथ व मवाद (Metritis & Pyometra)",
    nameEn: "Bovine Metritis & Pyometra",
    category: "gynae",
    species: ["गाय", "भैंस"],
    tempRange: "102.5 - 104.5°F (पायोमेट्रा में सामान्य)",
    cardinalSigns: [
      "योनि से निरंतर सफेद, पीला, गाढ़ा अत्यंत दुर्गंधयुक्त मवाद (Pus Discharge) बहना",
      "पशु का बार-बार मद (Heat) में आना पर गर्भधारण न होना (Repeat Breeder)",
      "रेक्टल जांच में गर्भाशय का अत्यधिक बड़ा, भारी एवं मवाद से भरा थैला महसूस होना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "एक्यूट प्यूपरल मेट्राइटिस",
        signs: "ब्याने के 10-14 दिन में तेज बुखार, बदबूदार मटमैला स्राव, भूख बंद, दूध का गिरना।",
        positiveRecovery: "सिस्टमिक एंटीबायोटिक से 5 दिन में पूर्ण ठीक।",
        negativeDeterioration: "क्रोनिक एंडोमेट्राइटिस में बदलना।"
      },
      {
        stage: 2,
        title: "क्रोनिक एंडोमेट्राइटिस",
        signs: "पशु सामान्य दिखता है, पर मद में आने पर कांच जैसे तार के बजाय मवाद गिरता है।",
        positiveRecovery: "इंट्रा-यूटेराइन इन्फ्यूजन से गर्भाशय की शुद्धि।",
        negativeDeterioration: "सर्विक्स बंद होकर पायोमेट्रा बनना।"
      },
      {
        stage: 3,
        title: "क्लोज्ड पायोमेट्रा (Closed Pyometra)",
        signs: "सर्विक्स बंद, गर्भाशय में कई लीटर मवाद जमा, कॉर्पस ल्यूटियम (CL) का स्थायी होना।",
        positiveRecovery: "PGF2 Alpha इंजेक्शन से 48 घंटे में सर्विक्स खुलकर मवाद का निष्कासन।",
        negativeDeterioration: "गर्भाशय दीवार का पतला होकर फटना।"
      },
      {
        stage: 4,
        title: "स्थायी बांझपन",
        signs: "एंडोमेट्रियल ग्रंथियों का विनाश (Fibrosis), पशु का कभी गाभिन न ठहरना।",
        positiveRecovery: "अत्यंत कठिन।",
        negativeDeterioration: "अनुत्पादक पशु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Pragma / Vetmate (Cloprostenol - PGF2 Alpha)", dose: "2 ml (500 mcg)", route: "I/M", days: "सर्विक्स खोलने व मवाद निकालने हेतु (सर्वोत्तम)" },
        { name: "Inj. Intacef Tazo", dose: "3375 mg", route: "I/M", days: "3-5 दिन" },
        { name: "Inj. Melonex Plus", dose: "15 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [
        { name: "Utrovet / Replanta लिक्विड", dose: "100 ml", frequency: "दिन में दो बार 5 दिन" }
      ],
      ayurvedic: [],
      homeopathic: [
        { name: "Pulsatilla 200C + Sepia 200C + Silicea 200C", potency: "200C", drops: "20 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "मवाद पूरी तरह निकल जाने के बाद ही अधिकृत डॉक्टर से गर्भाशय में एंटीबायोटिक (IU Infusion) रखवाएं।",
        "गर्म हल्दी व अजवाइन का काढ़ा गुड़ मिलाकर पिलाएं।"
      ],
      biosecurity: [
        "ब्याने के समय अस्वच्छ हाथों या गंदे औजारों का प्रयोग कतई न करें।",
        "कृत्रिम गर्भाधान (A.I.) हमेशा स्वच्छ, कीटाणुरहित शीथ और प्रशिक्षित कार्यकर्ता से ही कराएं।"
      ]
    }
  },

  // ==========================================================================
  // 7. शल्य चिकित्सा आपात स्थितियां (SURGICAL EMERGENCIES)
  // ==========================================================================
  {
    id: "trp_hardware",
    nameHi: "टीआरपी / हार्डवेयर रोग (Traumatic Reticuloperitonitis - TRP)",
    nameEn: "Traumatic Reticuloperitonitis (Hardware Disease)",
    category: "surgical",
    species: ["गाय", "भैंस"],
    tempRange: "102.5 - 104.0°F (प्रारंभ में तेज)",
    cardinalSigns: [
      "चारे के साथ सुई, कील, तार या लोहे का टुकड़ा निगलने से दूसरे पेट (Reticulum) का छिदना",
      "पशु का पीठ को कूबड़ की तरह ऊपर उठाकर खड़ा होना (Arched Back Posture) एवं चलने में कराहना",
      "विथर्स पिंच टेस्ट (Withers Pinch Test): पीठ दबाने पर दर्द के मारे नीचे न झुकना व ग्रंट (कराहा) करना"
    ],
    contraindicatedSteroids: true,
    stages: [
      {
        stage: 1,
        title: "एक्यूट रेटिकुलाइटिस",
        signs: "अचानक दूध गिरना, पेट दर्द, पीठ में कूबड़, चारा बंद, हल्का बुखार।",
        positiveRecovery: "रूमेन मैग्नेट (Rumen Magnet) व एंटीबायोटिक से कील रुकने पर सुधार।",
        negativeDeterioration: "कील का डायफ्राम को भेदकर दिल की थैली की ओर बढ़ना।"
      },
      {
        stage: 2,
        title: "लोकल पेरिटोनिटिस",
        signs: "रूमेन की गति बंद, हल्का रुक-रुक कर आफरा, दाहिने-बाएं मुड़ने में भीषण दर्द।",
        positiveRecovery: "रूमेनोटोमी सर्जरी (Rumenotomy) से कील निकालने पर 85% रिकवरी।",
        negativeDeterioration: "पेरिकार्डियम का छिदना।"
      },
      {
        stage: 3,
        title: "ट्रॉमेटिक पेरिकार्डाइटिस (TP)",
        signs: "दिल की थैली में मवाद, गर्दन की जुगलर नस का रस्सी जैसा फूलना (Jugular Pulsation), छाती में पानी।",
        positiveRecovery: "संभावना 10% से कम।",
        negativeDeterioration: "हार्ट फेलियर और कार्डियक टैम्पोनेड।"
      },
      {
        stage: 4,
        title: "कन्जेस्टिव हार्ट फेलियर",
        signs: "छाती व गलकंबल में भयंकर पानी भरी सूजन, सांस में घुरघुर, मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Intacef Tazo", dose: "3375 mg", route: "I/M", days: "5-7 दिन" },
        { name: "Inj. Melonex Plus", dose: "15-20 ml", route: "I/M", days: "5 दिन" },
        { name: "Inj. Belamyl", dose: "10 ml", route: "I/M", days: "5 दिन" }
      ],
      oral: [
        { name: "रूमेन मैग्नेट (Rumen Magnet)", dose: "1 मैग्नेट विशेष गन द्वारा पेट में उतारें", frequency: "लोहे को पकड़ने हेतु तुरंत" }
      ],
      ayurvedic: [],
      homeopathic: [
        { name: "Arnica 200C + Silicea 200C + Hepar Sulph 200C", potency: "200C", drops: "20 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "पशु के अगले पैरों को ईंटों या चबूतरे पर 6-8 इंच ऊंचा रखें ताकि कील आगे दिल की ओर न धंसे।",
        "पशु को बिल्कुल न चलाएं, पूर्ण विश्राम दें।"
      ],
      biosecurity: [
        "चारा काटने वाली कुट्टी मशीन (Chaff Cutter) के मुंह पर शक्तिशाली मैग्नेट लगाएं।",
        "निर्माण स्थल, कील, तार व लोहे के कचरे को पशुओं के चरने के स्थान से पूरी तरह दूर रखें।"
      ]
    }
  },
  {
    id: "horn_fracture",
    nameHi: "सींग टूटना व कैंसर (Horn Fracture / Horn Core Cancer)",
    nameEn: "Horn Fracture & Horn Cancer",
    category: "surgical",
    species: ["गाय", "भैंस"],
    tempRange: "101.5°F (इन्फेक्शन में 103°F)",
    cardinalSigns: [
      "आपसी लड़ाई या दुर्घटना में सींग का उखड़ना व सींग की जड़ से फव्वारे जैसा तीव्र रक्तस्राव",
      "सींग के खोखले साइनस से मवाद रिसना, बदबू आना एवं नाक से खून व मवाद गिरना",
      "हॉर्न कैंसर: सींग का आधार से टेढ़ा होना, सींग का हिलना व फूलगोभी जैसा खूनी मांस बढ़ना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "एक्यूट फ्रैक्चर व रक्तस्राव",
        signs: "सींग का खोल उतरना, गंभीर रक्तस्राव, पशु का सिर हिलाना व दर्द से छटपटाना।",
        positiveRecovery: "टूर्निकेट, टिंचर बेंजोइन और टाइट बैंडेज से रक्तस्राव तुरंत बंद।",
        negativeDeterioration: "फ्रंटल साइनस में मवाद और कीड़े पड़ना।"
      },
      {
        stage: 2,
        title: "साइनुसाइटिस अवस्था",
        signs: "सींग के छेद से दुर्गंधयुक्त मवाद, नाक से मवाद गिरना, सिर में दर्द से दीवार से टेकना।",
        positiveRecovery: "पोटाश वॉश, मैगट नाशक दवा और एंटीबायोटिक से घाव भरना।",
        negativeDeterioration: "हड्डी का स्थायी संक्रमण।"
      },
      {
        stage: 3,
        title: "हॉर्न कोर कैंसर",
        signs: "सींग का झुक जाना, बदबूदार फूलगोभी जैसा मांस बढ़ना, खून रिसना।",
        positiveRecovery: "सींग का जड़ से सर्जिकल विच्छेदन (Amputation of Horn) से ही जीवन रक्षा।",
        negativeDeterioration: "मेटास्टेसिस।"
      },
      {
        stage: 4,
        title: "टर्मिनल अवस्था",
        signs: "कैंसर का मस्तिष्क और लिम्फ नोड्स में फैलना, गंभीर दुर्बलता, मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Cornual Nerve Block (Lignocaine 2%)", dose: "5-10 ml", route: "Local Nerve Block", days: "दर्दमुक्त सर्जरी/ड्रेसिंग हेतु" },
        { name: "Inj. Botropase / Chrome", dose: "5 ml", route: "I/M", days: "रक्तस्राव रोकने हेतु तुरंत" },
        { name: "Inj. Intacef (Ceftriaxone)", dose: "3 gm", route: "I/M", days: "5 दिन" },
        { name: "Inj. Melonex Plus", dose: "15 ml", route: "I/M", days: "3 दिन" },
        { name: "Inj. Tetanus Toxoid (TT)", dose: "5 ml", route: "I/M", days: "एकल खुराक" }
      ],
      oral: [],
      ayurvedic: [
        { name: "Topicure Spray / Scavon Cream", dose: "घाव पर मक्खी दूर रखने हेतु" }
      ],
      homeopathic: [
        { name: "Arnica 200C + Calendula 200C + Symphytum 200C", potency: "200C", drops: "20 बूंदें दिन में 3 बार" }
      ],
      desiRemedies: [
        "रक्तस्राव रोकने के लिए सींग के आधार पर 8 के आकार में रस्सी कसकर बांधें (Tourniquet)।",
        "घाव पर टिंचर बेंजोइन (Tincture Benzoin) या फिटकरी का पाउडर बुरककर साफ गॉज से '8' आकृति की टाइट पट्टी बांधें।",
        "यदि कीड़े पड़ गए हों तो तारपीन का तेल (Turpentine Oil) डालकर कीड़े निकालें।"
      ],
      biosecurity: [
        "लड़ाकू पशुओं के सींगों के नुकीले सिरों को ब्लंट (गोल) करवाएं।",
        "सींग के खुले घाव पर मक्खियां कतई न बैठने दें ताकि मैगट्स न पड़ें।"
      ]
    }
  },
  {
    id: "hernia",
    nameHi: "हर्निया (Hernia - Umbilical & Ventral)",
    nameEn: "Bovine Hernia (Umbilical, Ventral, Scrotal)",
    category: "surgical",
    species: ["बछड़े", "गाय", "भैंस", "भेड़", "बकरी"],
    tempRange: "101.5°F (गैंग्रीन होने पर तेज)",
    cardinalSigns: [
      "नाभि (Umbilicus) या पेट के निचले हिस्से में नरम, दर्दहीन, लटकती हुई थैलीनुमा सूजन",
      "रिड्यूसिबल हर्निया: हाथ से दबाने पर सूजन का पेट के अंदर चले जाना और हर्निया रिंग महसूस होना",
      "स्ट्रैंगुलेटेड हर्निया: आंत फंसने पर सूजन का अत्यंत कठोर, गर्म व दर्दनाक होना एवं गोबर बंद होना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "रिड्यूसिबल हर्निया (Reducible)",
        signs: "नाभि पर गोल थैली, दबाने पर आंतें अंदर चली जाती हैं, पशु को कोई दर्द नहीं।",
        positiveRecovery: "हर्निया क्लैंप या छोटी उम्र में सर्जिकल हर्नियोरैफी से 100% सफल।",
        negativeDeterioration: "हर्निया रिंग का बढ़ना।"
      },
      {
        stage: 2,
        title: "इर्रिड्यूसिबल हर्निया (Adhesion)",
        signs: "आंतें थैली की दीवार से चिपक जाना, दबाने पर अंदर न जाना, पर आंत में रुकावट नहीं।",
        positiveRecovery: "सर्जरी द्वारा चिपकाव हटाकर रिंग बंद करना।",
        negativeDeterioration: "आंतों का ट्विस्ट होना।"
      },
      {
        stage: 3,
        title: "स्ट्रैंगुलेटेड हर्निया (आपातकाल)",
        signs: "सूजन का पत्थर जैसा कड़ा व गर्म होना, असहनीय पेट दर्द, उल्टी/गोबर बंद, बेचैनी।",
        positiveRecovery: "तुरंत आपातकालीन सर्जरी द्वारा आंत की जीवन रक्षा।",
        negativeDeterioration: "आंतों में रक्त प्रवाह रुककर गैंग्रीन बनना।"
      },
      {
        stage: 4,
        title: "आंत फटना व पेरिटोनिटिस",
        signs: "आंतों का फटना, सेप्टिक पेरिटोनिटिस, शॉक, पशु की मृत्यु।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "मृत्यु।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Intacef", dose: "3 gm (बछड़ों में 1 gm)", route: "I/M", days: "सर्जरी पश्चात 5 दिन" },
        { name: "Inj. Melonex Plus", dose: "10-15 ml", route: "I/M", days: "3 दिन" }
      ],
      oral: [],
      ayurvedic: [],
      homeopathic: [
        { name: "Nux Vomica 200C + Calcarea Fluor 200C", potency: "200C", drops: "15 बूंदें दिन में दो बार (शुरुआती छोटे हर्निया में)" }
      ],
      desiRemedies: [
        "छोटे बछड़ों में नाभि हर्निया पर हर्निया बेल्ट या चौड़ी सूती पट्टी कसकर बांधें।",
        "हर्निया का एकमात्र पक्का व स्थायी समाधान वेटरनरी सर्जन द्वारा हर्नियोरैफी (Herniorrhaphy) सर्जरी है।"
      ],
      biosecurity: [
        "जन्म के समय बछड़े की नाभि को पेट के पास से कभी जोर से न खींचें; 2 इंच छोड़कर धागा बांधकर काटें।",
        "नाभि पर संक्रमण न होने दें ताकि नाभि की मांसपेशियां ढीली होकर हर्निया न बने।"
      ]
    }
  },
  {
    id: "teat_obstruction",
    nameHi: "थन में गांठ या रुकावट (Teat Obstruction / Teat Spider)",
    nameEn: "Teat Obstruction (Spider Teat / Hard Milker)",
    category: "surgical",
    species: ["गाय", "भैंस"],
    tempRange: "101.5°F (थनैला होने पर तेज)",
    cardinalSigns: [
      "थन में दूध भरा होने पर भी थन की नली से दूध की धार न निकलना या अत्यंत पतली निकलना",
      "थन को टटोलने पर थन की नली (Teat Canal) के भीतर मटर के दाने जैसी सख्त गांठ महसूस होना",
      "दूध निकालते समय पशु का दर्द से लात मारना एवं अयन का पूरा दूध न निकल पाने से थनैला होना"
    ],
    contraindicatedSteroids: false,
    stages: [
      {
        stage: 1,
        title: "हार्ड मिल्कर (Hard Milker)",
        signs: "दूध की धार पतली आना, दोहने में बहुत जोर लगना, थन के मुंह पर हल्का कड़ापन।",
        positiveRecovery: "टीट डाइलेटर व वैसलीन से नियमित फैलाने पर राहत।",
        negativeDeterioration: "थन नलिका में रेशेदार गांठ (Fibrous Spider) बनना।"
      },
      {
        stage: 2,
        title: "पार्शियल ऑब्स्ट्रक्शन (Teat Spider)",
        signs: "थन नलिका के बीच में मटर जैसी गांठ, दूध रुक-रुक कर आना, दूध अयन में रुकना।",
        positiveRecovery: "टीट ट्यूमर एक्सट्रैक्टर (Teat Tumor Extractor) द्वारा गांठ निकालने से पूर्ण धार।",
        negativeDeterioration: "पूर्ण रुकावट।"
      },
      {
        stage: 3,
        title: "कम्प्लीट टीट ब्लॉक",
        signs: "थन पत्थर जैसा फूलना, दूध की एक बूंद न निकलना, थन में गंभीर सूजन व दर्द।",
        positiveRecovery: "सर्जिकल टीट साइफन व सर्जरी द्वारा धार खोलना।",
        negativeDeterioration: "संक्रमण से अयन में सेप्टिक थनैला होना।"
      },
      {
        stage: 4,
        title: "क्वार्टर का सूखना (Blind Quarter)",
        signs: "क्वार्टर का दूध हमेशा के लिए सूख जाना, थन का अनुपयोगी होना।",
        positiveRecovery: "असंभव।",
        negativeDeterioration: "क्वार्टर की स्थायी क्षति।"
      }
    ],
    treatment: {
      injections: [
        { name: "Inj. Melonex Plus", dose: "15 ml", route: "I/M", days: "2 दिन" },
        { name: "Inj. Serratiopeptidase (गांठ घुलाने हेतु)", dose: "10 ml", route: "I/M", days: "3-5 दिन" },
        { name: "Inj. Intacef Tazo", dose: "3375 mg", route: "I/M", days: "थनैला से बचाव हेतु 3 दिन" }
      ],
      oral: [],
      ayurvedic: [],
      homeopathic: [
        { name: "Silicea 200C + Thuja 200C + Phytolacca 200C", potency: "200C", drops: "15 बूंदें दिन में 3 बार (गांठ घुलाने में प्रसिद्ध)" }
      ],
      desiRemedies: [
        "थन में सुई, साइकिल की तीली या गंदी तार कतई न डालें (इससे थन हमेशा के लिए बर्बाद हो जाता है)।",
        "दोहन के बाद थन पर शुद्ध ग्लिसरीन या सरसों तेल में कपूर मिलाकर हल्के हाथ से मालिश करें।"
      ],
      biosecurity: [
        "दूध दोहते समय अंगूठा मोड़कर थन न दबाएं (Knuckling बंद करें); हमेशा पूरे हाथ से (Full Hand Milking) दोहें।",
        "सर्जरी अधिकृत पशु चिकित्सक द्वारा रोगाणुरहित टीट साइफन व टीट नाइफ से ही करवाएं।"
      ]
    }
  }
];

// ============================================================================
// HELPER QUERY FUNCTIONS
// ============================================================================

/**
 * Get disease profile by unique ID
 * @param {string} id - The unique disease identifier
 * @returns {object|null} - Disease profile or null
 */
window.getVetcareDiseaseById = function(id) {
  if (!id) return null;
  const cleanId = id.toString().trim().toLowerCase();
  return window.VETCARE_DISEASE_DB.find(d => d.id.toLowerCase() === cleanId) || null;
};

/**
 * Search disease database with defensive null checking across names, symptoms, and keywords
 * @param {string} query - Search term in Hindi or English
 * @returns {Array} - Array of matching disease objects
 */
window.searchVetcareDiseases = function(query) {
  const q = (query || "").toString().trim().toLowerCase();
  if (!q) return window.VETCARE_DISEASE_DB;

  return window.VETCARE_DISEASE_DB.filter(d => {
    const nameHi = (d.nameHi || "").toLowerCase();
    const nameEn = (d.nameEn || "").toLowerCase();
    const category = (d.category || "").toLowerCase();
    const signs = (d.cardinalSigns || []).join(" ").toLowerCase();
    const species = (d.species || []).join(" ").toLowerCase();

    return nameHi.includes(q) ||
           nameEn.includes(q) ||
           category.includes(q) ||
           signs.includes(q) ||
           species.includes(q);
  });
};
