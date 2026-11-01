window.VETCARE_DISEASE_DB = [
  {
    id: "HS",
    nameHi: "गलघोंटू (Hemorrhagic Septicemia - HS)",
    nameEn: "Hemorrhagic Septicemia",
    category: "BACTERIAL",
    tempRange: "अति-तीव्र ज्वर (>105°F)",
    cardinalSigns: "गले व जबड़े के नीचे गर्म, कड़ा व दर्दनाक सूजन; सांस लेते समय घुरघुर की तीव्र आवाज; मुंह से अत्यधिक लार टपकना एवं श्वास अवरोध।",
    pregnancyAlert: "चेतावनी: डेक्सामेथासोन (Dexamethasone) पूर्णतः वर्जित है (गर्भपात कारक)। केवल आइसोफ्लूप्रेडोन (Isoflupredone) का प्रयोग करें।",
    labTests: [
      { sNo: 1, testName: "रक्त लेप परीक्षण (Blood Smear Leishman/Gram Stain)", sampleType: "रक्त (Peripheral Blood)", approxMrp: 150, tat: "30 मिनट", confirms: "Pasteurella multocida (Bipolar coccobacilli)" },
      { sNo: 2, testName: "सीबीसी (Complete Blood Count)", sampleType: "ईडीटीए रक्त (Whole Blood EDTA)", approxMrp: 300, tat: "2 घंटे", confirms: "गंभीर ल्यूकोसाइटोसिस एवं न्यूट्रोफिलिया" },
      { sNo: 3, testName: "पीसीआर परीक्षण (Pasteurella specific PCR)", sampleType: "रक्त / ऊतक स्राव", approxMrp: 1200, tat: "24-48 घंटे", confirms: "P. multocida B:2 / E:2 सीरोटाइप पुष्टिकरण" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "एंटीबायोटिक", generic: "Ceftiofur Sodium", ethicalBrand: "Xyrofur / Naxcel 1g", approxMrp: 480, doseRoute: "1.1-2.2 mg/kg b.wt IM (1g प्रति 400kg)", pregnancySafety: "पूर्णतः सुरक्षित", purpose: "पाश्चुरेला जीवाणु का त्वरित जीवाणुनाशक खात्मा" },
        { sNo: 2, category: "एंटीबायोटिक (वैकल्पिक)", generic: "Enrofloxacin 10%", ethicalBrand: "Enrocin / Baytril", approxMrp: 280, doseRoute: "5 mg/kg b.wt IM/IV (15-20 ml)", pregnancySafety: "सावधानीपूर्वक सुरक्षित", purpose: "तीव्र जीवाणु रोधी क्रिया" },
        { sNo: 3, category: "एनएसएआईडी दर्द निवारक", generic: "Flunixin Meglumine", ethicalBrand: "Megludyne / Flunix", approxMrp: 290, doseRoute: "2.2 mg/kg b.wt IV (15-20 ml)", pregnancySafety: "सावधानी से सुरक्षित", purpose: "टॉक्सिमिया नियंत्रण, तेज बुखार व गले की सूजन में त्वरित कमी" },
        { sNo: 4, category: "स्टेरॉयड", generic: "Isoflupredone Acetate", ethicalBrand: "Predef 2X", approxMrp: 340, doseRoute: "10-20 mg IM (5-10 ml)", pregnancySafety: "गाभिन में सुरक्षित (डेक्सा वर्जित)", purpose: "गले के ऊपरी श्वास मार्ग की सूजन घटाकर सांस बहाल करना" },
        { sNo: 5, category: "एंटीहिस्टामिनिक", generic: "Chlorpheniramine Maleate", ethicalBrand: "Avil / Cadistin", approxMrp: 90, doseRoute: "10 ml Deep IM", pregnancySafety: "सुरक्षित", purpose: "एलर्जी एवं हिस्टामिनिक स्राव का शमन" }
      ],
      oral: [
        { name: "Serratiopeptidase Bolus", brand: "Serrata / Biosuganril", dose: "2 बोलस सुबह-शाम", duration: "3 दिन", purpose: "गले की कठोर फाइब्रिन सूजन का विघटन" },
        { name: "इलेक्ट्रोलाइट पाउडर", brand: "Electral Energy / Prolyte", dose: "50 ग्राम दिन में 2 बार पानी में", duration: "3 दिन", purpose: "निर्जलीकरण एवं एसिडोसिस रोकथाम" }
      ],
      ayurvedic: [
        { name: "कपूर-हल्दी मलहम", ingredients: "100ml सरसों तेल + 15g देशी कपूर + 25g हल्दी", dose: "गुनगुना करके गले की सूजन पर दिन में 3 बार बाह्य लेप", purpose: "स्थानीय रक्त संचार सुधार व सूजन शमन" }
      ],
      homeopathic: [
        { name: "Belladonna 200C + Arsenicum Album 200C", dose: "10-10 बूंद दिन में 4 बार जीभ पर", purpose: "तीव्र ज्वर व गले की घुटन में पूरक राहत" }
      ],
      desiRemedies: [
        { name: "सोंठ-हल्दी-कालीमिर्च काढ़ा", preparation: "20g हल्दी, 15g सोंठ, 10 नग कालीमिर्च को 500ml पानी में उबालकर 100g गुड़ मिलाकर गुनगुना पिलाएं (यदि निगलने में सक्षम हो)।", purpose: "गले की खराश व प्रतिरोधक क्षमता वृद्धि" }
      ]
    },
    stages: [
      { stage: 1, signs: "तापमान 105-107°F, सुस्ती, चारा पूर्ण बंद, आँखें लाल।", recovery: "तत्काल Ceftiofur व Flunixin से 95% पूर्ण स्वस्थ।", deterioration: "12 घंटे में सूजन गले से सीने तक फैलना।" },
      { stage: 2, signs: "गले में गर्म दर्दनाक सूजन, सांस में घुरघुर आवाज, मुंह से लार।", recovery: "आइसोफ्लूप्रेडोन व सघन एंटीबायोटिक से 70-80% रिकवरी।", deterioration: "श्वासनली दबना, जीभ का बाहर लटकना।" },
      { stage: 3, signs: "अत्यधिक श्वास कष्ट, पशु का मुंह खोलकर हांफना, ठंडे कान।", recovery: "आईवी फ्लुइड्स व ट्रेकियोस्टोमी सहारा से 30-40% रिकवरी।", deterioration: "ऑक्सीजन की भारी कमी, फेफड़ों में पानी भरना।" },
      { stage: 4, signs: "पार्श्व शयन, कोमा, सांस रुकना, सबटर्मिनल शॉक।", recovery: "प्रायः असाध्य (<5% उत्तरजीविता)।", deterioration: "एस्फिक्सिया व टॉक्सिक हार्ट फेल्योर से 24 घंटे में मृत्यु।" }
    ]
  },
  {
    id: "BQ",
    nameHi: "लंगड़ा बुखार / चरचरा (Black Quarter - BQ)",
    nameEn: "Black Quarter",
    category: "BACTERIAL",
    tempRange: "अति-तीव्र ज्वर (>105°F)",
    cardinalSigns: "पुट्ठे, कंधे या जांघ के भारी मांसल भाग में गैस भरी गर्म सूजन; हाथ फेरने या दबाने पर चर्र-चर्र (Crepitation) की आवाज; अत्यधिक लंगड़ापन।",
    pregnancyAlert: "पेनिसिलिन वर्ग गाभिन में पूर्णतः सुरक्षित है। एनएसएआईडी में मेलॉक्सिकैम का प्राथमिकता से प्रयोग करें।",
    labTests: [
      { sNo: 1, testName: "मांसपेशी स्राव स्मीयर (Gram Stain Smear)", sampleType: "सूजन से निकाला गया स्राव/सीरम", approxMrp: 180, tat: "45 मिनट", confirms: "Clostridium chauvoei (Gram-positive spore-forming rods)" },
      { sNo: 2, testName: "फ्लोरोसेंट एंटीबॉडी टेस्ट (FAT)", sampleType: "मांसपेशी बायोप्सी/स्राव", approxMrp: 850, tat: "24 घंटे", confirms: "क्लॉस्ट्रिडियम प्रतिजन की विशिष्ट पहचान" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "पेनिसिलिन एंटीबायोटिक", generic: "Procaine Penicillin + Benzylpenicillin", ethicalBrand: "Procaine Penicillin 40 Lac IU / Fortified Procaine", approxMrp: 180, doseRoute: "10,000-20,000 IU/kg Deep IM BID (प्रथम डोज़ के कुछ भाग सूजन के चारों ओर SC लगाएं)", pregnancySafety: "सुरक्षित", purpose: "क्लॉस्ट्रिडियल बीजाणुओं व जीवाणुओं का विनाश" },
        { sNo: 2, category: "एमोक्सीसिलीन समूह (वैकल्पिक)", generic: "Amoxicillin + Sulbactam", ethicalBrand: "Amoxirum Forte 4.5g", approxMrp: 380, doseRoute: "4.5g IM BID x 3-5 days", pregnancySafety: "सुरक्षित", purpose: "द्वितीयक व एनारोबिक संक्रमण दमन" },
        { sNo: 3, category: "दर्द व सूजन निवारक", generic: "Meloxicam + Paracetamol", ethicalBrand: "Melonex Plus", approxMrp: 140, doseRoute: "15-20 ml IM", pregnancySafety: "सुरक्षित", purpose: "तीव्र पेशीय दर्द व 105°F ज्वर में कमी" },
        { sNo: 4, category: "ऑक्सीजन थेरेपी / हाइड्रोजन पेरोक्साइड", generic: "Hydrogen Peroxide 3% Topical Wash", ethicalBrand: "Topical H2O2", approxMrp: 60, doseRoute: "सूजन वाले हिस्से पर चीरा लगाकर 3% H2O2 से फ्लशिंग", pregnancySafety: "सुरक्षित", purpose: "एनारोबिक जीवाणुओं को ऑक्सीजन देकर नष्ट करना" }
      ],
      oral: [
        { name: "Rumen Booster Bolus", brand: "Bioboost / Himalayan Batisa", dose: "2 बोलस सुबह-शाम", duration: "4 दिन", purpose: "माइक्रोफ्लोरा पुनर्जनन एवं भूख सुधार" }
      ],
      ayurvedic: [
        { name: "नीम छाल व फिटकरी का सेक", ingredients: "50g नीम की छाल, 20g फिटकरी पानी में उबालकर", dose: "सूजन के आसपास गुनगुना सेक", purpose: "जीवाणुरोधी बाह्य उपचार" }
      ],
      homeopathic: [
        { name: "Arnica Montana 200C + Rhus Tox 200C", dose: "10-10 बूंद दिन में 3 बार", purpose: "मांसपेशी दर्द व ऊतक टूटन में लाभ" }
      ],
      desiRemedies: [
        { name: "विश्राम व सूखा बिछावन", preparation: "रोगी पशु को पूर्ण विश्राम दें, चलने न दें, साफ सूखी रेत या भूसे पर रखें।", purpose: "मांसपेशियों के तनाव की रोकथाम" }
      ]
    },
    stages: [
      { stage: 1, signs: "तेज बुखार (105-106°F), पशु लंगड़ाता है, पुट्ठे पर गर्म व दर्दनाक सूजन।", recovery: "प्रारंभिक पेनिसिलिन थेरेपी से 80-90% बचाव संभव।", deterioration: "सूजन में एनारोबिक गैस का तेजी से बनना।" },
      { stage: 2, signs: "सूजन ठंडी पड़ना, दबाने पर स्पष्ट चर्र-चर्र की आवाज, त्वचा काली होना।", recovery: "स्थानीय चीरा, H2O2 फ्लशिंग व पेनिसिलिन से 45-60% रिकवरी।", deterioration: "मायोनेक्रोसिस एवं टॉक्सिमिया का प्रसार।" },
      { stage: 3, signs: "पशु का गिर जाना, तेज सांस, नाड़ी की गति अत्यंत मंद व अनियमित।", recovery: "अति-गंभीर स्थिति, सघन आईसीयू देखरेख में 20% रिकवरी।", deterioration: "कार्डियोटॉक्सिक शॉक व आंत शिथिलता।" },
      { stage: 4, signs: "शरीर का ठंडा होना (<99°F), अचेतावस्था, अंगों में ऐंठन।", recovery: "असाध्य।", deterioration: "क्लॉस्ट्रिडियल टॉक्सिन से 12-36 घंटे में मृत्यु।" }
    ]
  },
  {
    id: "FMD",
    nameHi: "खुरपका-मुंहपका (Foot and Mouth Disease - FMD)",
    nameEn: "Foot and Mouth Disease",
    category: "VIRAL",
    tempRange: "अति-तीव्र ज्वर (>105°F)",
    cardinalSigns: "मुंह के अंदर, जीभ, मसूड़ों व खुरों के बीच दर्दनाक छाले (Vesicles); मुंह से चिपचिपी तारदार लार का लटकना; पैरों को पटकना व तीव्र लंगड़ापन।",
    pregnancyAlert: "उच्च ज्वर से गर्भपात का तीव्र खतरा रहता है। पेरासिटामोल/मेलॉक्सिकैम अनिवार्य रूप से दें। एंटीबायोटिक केवल द्वितीयक संक्रमण रोकने हेतु दें।",
    labTests: [
      { sNo: 1, testName: "एंटीजन डिटेक्शन एलिसा (Antigen Capture ELISA)", sampleType: "छालों का तरल या जीभ का छिलका", approxMrp: 900, tat: "24 घंटे", confirms: "FMD वायरस सीरोटाइप (O, A, Asia-1)" },
      { sNo: 2, testName: "आरटी-पीसीआर (RT-PCR for Aphthovirus)", sampleType: "मुंह/खुर के छालों का स्वैब", approxMrp: 1500, tat: "24-48 घंटे", confirms: "वायरल आरएनए की सटीक पुष्टि" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "एंटीबायोटिक (द्वितीयक संक्रमण रोधी)", generic: "Ceftriaxone Sodium", ethicalBrand: "Intacef 3g", approxMrp: 290, doseRoute: "3-4g IM OD x 3-5 days", pregnancySafety: "सुरक्षित", purpose: "मुंह व खुर के छालों में मवाद व बैक्टीरियल सड़ांध रोकना" },
        { sNo: 2, category: "एंटीपायरेटिक व दर्द निवारक", generic: "Paracetamol + Meloxicam", ethicalBrand: "Melonex Plus", approxMrp: 140, doseRoute: "15-20 ml IM OD x 3 days", pregnancySafety: "सुरक्षित", purpose: "तेज बुखार घटाना व मुंह-खुर के घावों का दर्द कम करना" },
        { sNo: 3, category: "एंटीहिस्टामिनिक", generic: "Pheniramine Maleate", ethicalBrand: "Avil", approxMrp: 85, doseRoute: "10 ml IM", pregnancySafety: "सुरक्षित", purpose: "तारदार लार का गिरना कम करना व खुजली शमन" },
        { sNo: 4, category: "इम्यूनोबूस्टर व विटामिन", generic: "Vitamin A, D3, E & Biotin", ethicalBrand: "Masticare Injectable / Intavita NH", approxMrp: 260, doseRoute: "5-10 ml IM alternate day", pregnancySafety: "सुरक्षित", purpose: "श्लेष्मा झिल्ली व खुर के उपकला ऊतकों का तीव्र पुनर्जनन" }
      ],
      oral: [
        { name: "बोरो-ग्लिसरीन माउथ पेंट", brand: "Glycerine + Borax Powder", dose: "दिन में 3 बार मुंह व जीभ के छालों पर लगाना", duration: "5 दिन", purpose: "छालों की जलन शांत करना व भोजन बहाली" }
      ],
      ayurvedic: [
        { name: "हर्बल खुर स्प्रे", brand: "Topicure Spray / D-Mag Spray", dose: "खुरों के घावों पर दिन में 2-3 बार छिड़काव", purpose: "मक्खियों से बचाव व कीड़े (Maggots) पड़ने की रोकथाम" }
      ],
      homeopathic: [
        { name: "Variolinum 200C + Merc Sol 200C", dose: "10-10 बूंद दिन में 3 बार", purpose: "मुंह के छालों व लार स्राव में तेजी से सुधार" }
      ],
      desiRemedies: [
        { name: "फिटकरी व पोटाश (KMNO4) माउथ-फुट वाश", preparation: "1% फिटकरी या पोटाश के हल्के गुलाबी पानी से मुंह व खुरों को दिन में 2 बार धोएं। शहद में भुना सुहागा मिलाकर जीभ पर लगाएं।", purpose: "प्राकृतिक एंटीसेप्टिक घाव भराव" }
      ]
    },
    stages: [
      { stage: 1, signs: "105°F+ तेज बुखार, खाना-पीना बंद, मुंह बंद रखना व दानेदार लार।", recovery: "सहायक उपचार से 95% पशु 7-10 दिन में रिकवर।", deterioration: "मुंह व खुरों में बड़े छालों का फटना।" },
      { stage: 2, signs: "जीभ की ऊपरी चमड़ी उखड़ना, खुरों के बीच लाल घाव, पशु का 3 पैरों पर खड़ा होना।", recovery: "एंटीसेप्टिक ड्रेसिंग से 90% रिकवरी।", deterioration: "खुरों में कीड़े पड़ना व खुर का खोल (Hoof cap) उतरना।" },
      { stage: 3, signs: "दूध उत्पादन में 70-80% की तीव्र गिरावट, अत्यधिक कमजोरी, बाल खुरदुरे होना।", recovery: "विटामिन व टॉनिक से उत्पादन में आंशिक बहाली।", deterioration: "क्रोनिक पैंटिंग (Pantars) सिंड्रोम का विकास।" },
      { stage: 4, signs: "पैंटिंग सिंड्रोम (गर्मी न सह पाना, बाल लंबे होना), हृदय पेशी शोथ (मायोकार्डिटिस)।", recovery: "वयस्क बचते हैं परंतु उत्पादकता स्थायी कम।", deterioration: "छोटे बछड़ों में टाइगर हार्ट (Tiger Heart) मायोकार्डिटिस से अचानक मृत्यु।" }
    ]
  },
  {
    id: "MASTITIS_ACUTE",
    nameHi: "तीव्र क्लिनिकल थनैल (Acute Clinical Mastitis)",
    nameEn: "Acute Clinical Mastitis",
    category: "BACTERIAL",
    tempRange: "मध्यम ज्वर (103-104°F)",
    cardinalSigns: "प्रभावित थन व अयन में अत्यधिक कड़ापन, लाली व छूने पर असह्य दर्द; दूध में रक्त के थक्के, पीले-सफेद छिछड़े (Flakes) या बदबूदार पीला पानी।",
    pregnancyAlert: "इंट्रा-मेमरी ट्यूब चढ़ाते समय पूर्ण विसंक्रमण रखें। स्टेरॉयड का अयन में अधिक प्रयोग गाभिन में निषेध है। सेफ्ट्रियाक्सोन व पेनिसिलिन पूर्ण सुरक्षित हैं।",
    labTests: [
      { sNo: 1, testName: "कैलिफोर्निया मैस्टाइटिस टेस्ट (CMT)", sampleType: "प्रत्येक थन का दूध (2-2 ml)", approxMrp: 120, tat: "5 मिनट", confirms: "सोमैटिक सेल काउंट व सबक्लिनिकल/क्लिनिकल तीव्रता" },
      { sNo: 2, testName: "दूध कल्चर एवं एंटीबायोटिक संवेदनशीलता (ABST)", sampleType: "कीटाणुरहित दूध नमूना", approxMrp: 600, tat: "48 घंटे", confirms: "सटीक बैक्टीरिया (Staph/Strep/E.coli) एवं प्रभावी दवा" },
      { sNo: 3, testName: "मिल्क पीएच स्ट्रिप टेस्ट", sampleType: "ताजा दूध", approxMrp: 50, tat: "1 मिनट", confirms: "दूध का क्षारीय होना (pH >6.8 सूजन पुष्ट करता है)" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "उच्च गुणवत्ता सेफलोस्पोरिन", generic: "Ceftriaxone + Tazobactam", ethicalBrand: "Intacef Tazo 3375mg / 4500mg", approxMrp: 410, doseRoute: "3.375g - 4.5g IV/IM OD x 3 days", pregnancySafety: "पूर्ण सुरक्षित", purpose: "प्रतिरोधी स्टेफाइलोकोकस व कोलीफॉर्म जीवाणु का नाश" },
        { sNo: 2, category: "एंजाइम युक्त दर्द निवारक", generic: "Meloxicam + Serratiopeptidase", ethicalBrand: "Melonex Power / Zobid-M", approxMrp: 210, doseRoute: "15-20 ml IM OD x 3 days", pregnancySafety: "सुरक्षित", purpose: "अयन की सूजन, फाइब्रिन क्लॉट व दर्द का त्वरित निवारण" },
        { sNo: 3, category: "इंट्रामैमरी इन्फ्यूजन ट्यूब", generic: "Cefoperazone Sodium 250mg", ethicalBrand: "Pathocef / Mastilep Tube", approxMrp: 195, doseRoute: "1 ट्यूब थन खाली करके चढ़ाना OD x 3 days", pregnancySafety: "सुरक्षित", purpose: "सीधे थन के सिस्टर्न में जीवाणुनाशक सघन प्रभाव" },
        { sNo: 4, category: "सहयोगी विटामिन", generic: "Vitamin A, E & Selenium", ethicalBrand: "Repronol / Selephos", approxMrp: 240, doseRoute: "10 ml IM alternate day", pregnancySafety: "सुरक्षित", purpose: "अयन की उपकला कोशिकाओं की मरम्मत" }
      ],
      oral: [
        { name: "ट्राइसोडियम सिट्रेट पाउडर", brand: "Mastirid / Masticare Sachet", dose: "50 ग्राम रोज गुड़ में मिलाकर", duration: "5 दिन", purpose: "दूध का पीएच 6.5 पर लाना एवं थन में कैल्शियम आयन बहाली" },
        { name: "पोटेशियम आयोडाइड पाउडर", brand: "KI Powder", dose: "5 ग्राम दैनिक", duration: "4 दिन", purpose: "फाइब्रोसिस व कड़ेपन का अवशोषण" }
      ],
      ayurvedic: [
        { name: "हल्दी, एलोवेरा व चूना पेस्ट", ingredients: "250g एलोवेरा गूदा + 50g हल्दी पाउडर + 15g खाने का बुझा चूना", dose: "पीसकर चिकना लेप बनाएं, थन को धोकर दिन में 3 बार लगाएं", purpose: "सूजन व लाली का अचूक प्राकृतिक शमन" }
      ],
      homeopathic: [
        { name: "Phytolacca 200C + Bryonia 200C + Silicea 200C", dose: "10-10 बूंद दिन में 4 बार रोटी पर", purpose: "थन के पत्थर जैसे कड़ेपन व दूध में छिछड़ों का शमन" }
      ],
      desiRemedies: [
        { name: "बार-बार थन खाली करना (Frequent Milking)", preparation: "रोगी थन से हर 2 घंटे में दूषित दूध बाहर निकालें और जमीन पर न गिरने दें (बर्तन में फिनाइल डालकर नष्ट करें)।", purpose: "बैक्टीरियल टॉक्सिन का अयन से निष्कासन" }
      ]
    },
    stages: [
      { stage: 1, signs: "दूध में बारीक जाली या छिछड़े, थन छूने पर हल्का गर्म, दूध उत्पादन में मामूली कमी।", recovery: "प्रारंभिक सिट्रेट व एंटीबायोटिक से 98% थन पूरी तरह सुरक्षित।", deterioration: "थन का सूजकर कड़ा होना।" },
      { stage: 2, signs: "थन लाल, पत्थर जैसा कड़ा, दूध का रंग पीला पानी या मटमैला होना, तेज दर्द।", recovery: "इंट्रामैमरी ट्यूब व पैरेंट्रल एंटीबायोटिक से 85-90% रिकवरी।", deterioration: "दूध में खून व ऊतक के टुकड़े आना।" },
      { stage: 3, signs: "थन के क्वार्टर में फाइब्रोसिस (मकड़ी/गांठ) बनना, दूध की धार बारीक या बंद होना।", recovery: "सेराटियोपेप्टिडेस से 50-60% दूध उत्पादन बहाल।", deterioration: "क्वार्टर का हमेशा के लिए सूख जाना।" },
      { stage: 4, signs: "गैंग्रीनस मैस्टाइटिस (थन का नीला/काला पड़ना, ठंडा होना, दुर्गंधित स्राव, सीप्सिस)।", recovery: "अंग विच्छेदन (Sloughing); केवल पशु की जान बचाई जा सकती है।", deterioration: "टॉक्सिक शॉक सिंड्रोम से पशु की मृत्यु।" }
    ]
  },
  {
    id: "MILK_FEVER",
    nameHi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever / Hypocalcemia)",
    nameEn: "Parturient Paresis (Milk Fever)",
    category: "METABOLIC",
    tempRange: "हाइपोथर्मिया (<100°F)",
    cardinalSigns: "ब्याने के 24-72 घंटे के भीतर पशु का बैठ जाना; गर्दन को मोड़कर पेट की ओर रखना (S-Shaped Curve); शरीर, कान व सींग बिल्कुल ठंडे; पुतली फैली होना व रूमेन गति बंद।",
    pregnancyAlert: "यह रोग ताजा ब्याही गाय-भैंसों में होता है। अचेत पशु को कभी भी मुंह से नाल या तरल न पिलाएं (फेफड़ों में जाकर तत्काल मृत्यु का खतरा)। केवल आईवी कैल्शियम दें।",
    labTests: [
      { sNo: 1, testName: "सीरम टोटल कैल्शियम स्तर (Serum Calcium Level)", sampleType: "सीरम (Plain Blood Tube)", approxMrp: 220, tat: "1 घंटा", confirms: "कैल्शियम <5.0 mg/dl (सामान्य: 9-11 mg/dl)" },
      { sNo: 2, testName: "सीरम इनऑर्गेनिक फास्फोरस व मैग्नीशियम", sampleType: "सीरम", approxMrp: 350, tat: "2 घंटे", confirms: "सहवर्ती हाइपोफॉस्फेटिमिया / हाइपोमैग्नीसीमिया की जांच" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "कैल्शियम बोरोरोरासेट बोरोइन्फ्यूजन", generic: "Calcium Borogluconate 25% + Mag + Phos + Dextrose", ethicalBrand: "Mifex / Calborol 450ml", approxMrp: 340, doseRoute: "450 ml (300 ml धीमी गति से IV + 150 ml SC)", pregnancySafety: "सुरक्षित (ताजा ब्याही)", purpose: "रक्त में आयनाइज्ड कैल्शियम की तत्काल बहाली" },
        { sNo: 2, category: "फास्फोरस नियामक", generic: "Toldimphos Sodium", ethicalBrand: "Tonophosphan", approxMrp: 260, doseRoute: "10-15 ml IM/IV", pregnancySafety: "सुरक्षित", purpose: "मांसपेशियों की टोन व खड़े होने की क्षमता बढ़ाना" },
        { sNo: 3, category: "न्यूरो-विटामिन", generic: "Vitamin B1, B6, B12", ethicalBrand: "Tribivet / Belamyl", approxMrp: 130, doseRoute: "10 ml IM", pregnancySafety: "सुरक्षित", purpose: "दबी हुई तंत्रिकाओं (Obturator/Sciatic) को पोषण" }
      ],
      oral: [
        { name: "आयनिक ओरल कैल्शियम जेल", brand: "Cal-Up Gel / Ostovet Gel", dose: "1 पूरी बोतल (300g) होश में आने के बाद", duration: "12 घंटे बाद दूसरी बोतल", purpose: "रक्त कैल्शियम को लगातार 24 घंटे स्थिर रखना" }
      ],
      ayurvedic: [
        { name: "गुड़-सोंठ गुनगुना शर्बत", ingredients: "250g गुड़ + 30g सोंठ + 2 लीटर गुनगुना पानी", dose: "पशु के पूरी तरह खड़े होने व निगलने पर दें", purpose: "तात्कालिक ऊर्जा व शारीरिक गर्मी उत्पादन" }
      ],
      homeopathic: [
        { name: "Calcarea Phosphorica 200C + Cuprum Met 200C", dose: "10-10 बूंद हर 2 घंटे पर", purpose: "खनिज अवशोषण व मांसपेशियों की अकड़न में लाभ" }
      ],
      desiRemedies: [
        { name: "गर्म बोरी से मालिश व स्थिति बदलना", preparation: "पशु को सूखी पराली पर बिठाएं, पैरों व रीढ़ की हड्डी पर गर्म बोरी रगड़ें। हर 2 घंटे में करवट बदलें ताकि छाती न दबे।", purpose: "रक्त संचार बहाल रखना व डाउनर काउ से बचाव" }
      ]
    },
    stages: [
      { stage: 1, signs: "पशु बेचैन, कान ठंडे, चलते समय लड़खड़ाहट, सिर व जीभ में हल्का कंपन।", recovery: "ओरल कैल्शियम जेल से 95% पशु बिना बैठे ठीक हो जाते हैं।", deterioration: "पैरों की ताकत खत्म होना व बैठ जाना।" },
      { stage: 2, signs: "पशु जमीन पर सीने के बल बैठा है, गर्दन मोड़कर कोख पर रखी है, आंखें सूखी, गोबर बंद।", recovery: "Mifex IV चढ़ते ही 15-30 मिनट में 90% पशु खड़े हो जाते हैं।", deterioration: "करवट लेट जाना और कोमा में जाना।" },
      { stage: 3, signs: "पशु एक तरफ करवट लेट जाता है (Lateral Recumbency), रूमेन में अफारा, श्वसन मंद।", recovery: "आपातकालीन धीमी IV ड्रिप से 60-70% रिकवरी।", deterioration: "एस्पिरेशन निमोनिया व हार्ट फेल्योर।" },
      { stage: 4, signs: "डाउनर काउ सिंड्रोम (कैल्शियम सामान्य होने पर भी जांघ की नसें दबने से न उठ पाना)।", recovery: "गहन फिजियोथेरेपी व हार्नेस से 30-40% सफलता।", deterioration: "प्रेशर सोर्स, सेप्टीसीमिया व स्थायी विकलांगता से मृत्यु।" }
    ]
  },
  {
    id: "KETOSIS",
    nameHi: "कीटोसिस / एसीटोनेमिया (Bovine Ketosis)",
    nameEn: "Bovine Ketosis / Acetonemia",
    category: "METABOLIC",
    tempRange: "सामान्य (101-102.5°F)",
    cardinalSigns: "ब्याने के 2 से 8 सप्ताह बाद पशु का दाना-बांटा पूर्ण छोड़ देना परंतु केवल सूखा भूसा खाना; सांस, मूत्र व दूध से मीठी एसीटोन गंध; दूध उत्पादन में अत्यधिक गिरावट व तेजी से वजन घटना।",
    pregnancyAlert: "गाभिन गायों में गर्भावस्था कीटोसिस (Pregnancy Toxemia) होने पर भ्रूण संकट हो सकता है। आइसोफ्लूप्रेडोन का प्रयोग लैक्टेशन में सुरक्षित है।",
    labTests: [
      { sNo: 1, testName: "मूत्र कीटोन स्ट्रिप टेस्ट (Rothera's Nitroprusside Test)", sampleType: "मूत्र (Fresh Urine)", approxMrp: 60, tat: "2 मिनट", confirms: "बैंगनी रंग की रिंग कीटोनुरिया (Acetoacetate) पुष्ट करती है" },
      { sNo: 2, testName: "रक्त बीटा-हाइड्रॉक्सीब्यूटायरेट (Blood BHBA Strip)", sampleType: "रक्त (Capillary/Venous Blood)", approxMrp: 200, tat: "1 मिनट", confirms: "BHBA स्तर >1.4 mmol/L सबक्लिनिकल / >3.0 क्लिनिकल कीटोसिस" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "हाइपरटॉनिक ग्लूकोज ड्रिप", generic: "Dextrose 20% or 25%", ethicalBrand: "Dextrose 25% (1000 ml)", approxMrp: 160, doseRoute: "1000 ml Rapid IV", pregnancySafety: "सुरक्षित", purpose: "रक्त शर्करा की तत्काल पुनर्स्थापना एवं कीटोजेनेसिस पर रोक" },
        { sNo: 2, category: "ग्लूकोकोर्टिकोइड", generic: "Isoflupredone Acetate", ethicalBrand: "Predef 2X", approxMrp: 340, doseRoute: "10 mg (5 ml) IM Single Dose", pregnancySafety: "लैक्टेशन में सुरक्षित", purpose: "यकृत में ग्लूकोनियोजेनेसिस प्रक्रिया को उत्तेजित करना" },
        { sNo: 3, category: "बी-विटामिन टॉनिक", generic: "Vitamin B1, B6, B12 + Niacinamide", ethicalBrand: "Tribivet / Belamyl", approxMrp: 130, doseRoute: "10 ml IM daily x 3 days", pregnancySafety: "सुरक्षित", purpose: "यकृत में फैटी एसिड उपापचय सुधारना" }
      ],
      oral: [
        { name: "प्रोपलीन ग्लाइकोल / ग्लिसरॉल", brand: "Ketosol / Ketocheck Liquid", dose: "200 ml सुबह-शाम ओरल नाल से", duration: "4-5 दिन", purpose: "रूमेन में जाकर सीधा ग्लूकोज निर्माण का कच्चा माल बनना" },
        { name: "नियासिन (विटामिन B3) बोलस", brand: "Niacin Bolus", dose: "2 बोलस प्रतिदिन", duration: "5 दिन", purpose: "वसा के अत्यधिक टूटने (Lipolysis) को रोकना" }
      ],
      ayurvedic: [
        { name: "गुड़ व सरसों तेल मिश्रण", ingredients: "250g पुराना गुड़ + 50ml शुद्ध सरसों तेल", dose: "दिन में एक बार 5 दिन तक चाट के रूप में", purpose: "नेगेटिव एनर्जी बैलेंस की पूर्ति" }
      ],
      homeopathic: [
        { name: "Lycopodium 200C + Chelidonium 200C", dose: "10-10 बूंद दिन में 3 बार", purpose: "यकृत की कार्यप्रणाली सुधार व भूख वृद्धि" }
      ],
      desiRemedies: [
        { name: "गेहूं दलिया व चोकर घोल", preparation: "1 किग्रा गेहूं का दलिया पकाकर 100g गुड़ मिलाकर ठंडा करके खिलाएं।", purpose: "सुपाच्य ऊर्जा प्रदान करना" }
      ]
    },
    stages: [
      { stage: 1, signs: "दूध उत्पादन में 20-30% गिरावट, पशु कंसन्ट्रेट दाना छोड़ता है पर हरा/सूखा चारा खाता है।", recovery: "प्रोपलीन ग्लाइकोल से 95% पशु 3 दिन में सामान्य दाना खाने लगते हैं।", deterioration: "कीटोन बॉडीज का रक्त में बढ़ना।" },
      { stage: 2, signs: "सांस व दूध से तीखी मीठी गंध, आंखें धंसी हुई, गोबर सूखा व काला पपड़ीदार।", recovery: "IV डेक्सट्रोज व आइसोफ्लूप्रेडोन से 85-90% रिकवरी।", deterioration: "नर्वस कीटोसिस के लक्षण प्रकट होना।" },
      { stage: 3, signs: "नर्वस कीटोसिस (पशु दीवार से सिर टकराता है, गोल चक्कर काटता है, असामान्य रूप से चाटता है)।", recovery: "सघन ग्लूकोज व शामक दवाओं से 70% रिकवरी।", deterioration: "गंभीर हेपेटिक लिपिडोसिस (फैटी लिवर)।" },
      { stage: 4, signs: "गंभीर यकृत विफलता, पीलिया, अत्यधिक दुर्बलता, स्थायी लैक्टेशन फेल्योर।", recovery: "लंबे समय तक लिवर टॉनिक से 40% सुधार।", deterioration: "यकृत कोमा व मृत्यु।" }
    ]
  },
  {
    id: "BLOAT",
    nameHi: "अफारा / टिम्पनी (Bloat / Tympany)",
    nameEn: "Acute Bloat / Tympany",
    category: "METABOLIC",
    tempRange: "सामान्य (101-102.5°F)",
    cardinalSigns: "बायाँ पेट (Left Paralumbar Fossa) ढोलक की तरह अत्यधिक फूल जाना; थपथपाने पर टिमटिमाती ड्रम जैसी आवाज; सांस लेने में भयंकर कष्ट, मुंह खोलकर जीभ बाहर निकालना व बेचैनी।",
    pregnancyAlert: "गंभीर अफारे में गर्भाशय व फेफड़ों पर डायफ्राम का दबाव बढ़ता है, जिससे गर्भपात या दम घुटने का खतरा होता है। आपातकाल में ट्रोकार-कैनुला लगाना सुरक्षित है।",
    labTests: [
      { sNo: 1, testName: "रूमेन द्रव पीएच परीक्षण (Rumen Fluid pH)", sampleType: "रूमेन द्रव (Stomach Tube)", approxMrp: 80, tat: "5 मिनट", confirms: "झागदार अफारा (Frothy Bloat pH 5.5-6.0) या फ्री-गैस अफारा" },
      { sNo: 2, testName: "रूमेन प्रोटोजोआ गतिशीलता (Microscopic Motility)", sampleType: "ताजा रूमेन द्रव", approxMrp: 150, tat: "15 मिनट", confirms: "रूमेन माइक्रोफ्लोरा की जीवनक्षमता" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "एंटीस्पास्मोडिक व दर्द निवारक", generic: "Dicyclomine + Paracetamol", ethicalBrand: "Spasmo-vet / Spasman", approxMrp: 110, doseRoute: "10-15 ml IM", pregnancySafety: "सुरक्षित", purpose: "पेट की मरोड़ व आंतों की ऐंठन शांत करना" },
        { sNo: 2, category: "एंटीहिस्टामिनिक", generic: "Chlorpheniramine Maleate", ethicalBrand: "Avil", approxMrp: 85, doseRoute: "10 ml IM", pregnancySafety: "सुरक्षित", purpose: "रूमेन एटोनी घटाना व गैस रिलीज में सहयोग" },
        { sNo: 3, category: "बी-कॉम्प्लेक्स", generic: "Vitamin B1 (Thiamine) + B12", ethicalBrand: "Tribivet / Berin", approxMrp: 120, doseRoute: "10 ml IM", pregnancySafety: "सुरक्षित", purpose: "रूमेन नर्व सप्लाई को शक्ति प्रदान करना" }
      ],
      oral: [
        { name: "एंटी-फोमिंग / झागनाशक सिरप", brand: "Bloatosil / Tympol Liquid", dose: "100 ml सीधे मुंह से पिलाएं (गंभीर स्थिति में 100ml सरसों तेल में मिलाकर)", duration: "एकल डोज़ (आवश्यकतानुसार 4 घंटे बाद दोहराएं)", purpose: "गैस के झाग के सतही तनाव को तोड़कर मुक्त गैस बनाना" },
        { name: "रूमेन एक्टिवेटर पाउडर", brand: "Bioboost / Himalayan Batisa", dose: "50-100 ग्राम गुड़ में मिलाकर", duration: "3 दिन", purpose: "रूमेन की गतिशीलता व जुगाली पुनः शुरू करना" }
      ],
      ayurvedic: [
        { name: "हिंग्वाष्टक व मीठा तेल फॉर्मूला", ingredients: "25g शुद्ध हींग + 50ml तारपीन का तेल + 300ml मीठा (सरसों/अलसी) तेल", dose: "अच्छी तरह हिलाकर नाल से धीरे-धीरे पिलाएं", purpose: "पेट की गैस निकालना व किण्वन रोकना" }
      ],
      homeopathic: [
        { name: "Colocynthis 200C + Nux Vomica 200C + Carbo Veg 200C", dose: "10-10 बूंद हर 30 मिनट पर", purpose: "पेट की भयंकर गैस व बेचैनी में त्वरित राहत" }
      ],
      desiRemedies: [
        { name: "मुंह में लकड़ी की खपच्ची बांधना व पहाड़ी पर चढ़ाना", preparation: "मुंह में आड़ी लकड़ी बांधें ताकि पशु लगातार जीभ चलाए और लार गिरे; पशु का अगला हिस्सा ऊँचा रखें ताकि फेफड़ों पर दबाव घटे।", purpose: "डकार द्वारा गैस का प्राकृतिक निष्कासन" }
      ]
    },
    stages: [
      { stage: 1, signs: "बायाँ पेट हल्का फूला, पशु बार-बार उठ-बैठ रहा है, जुगाली धीमी।", recovery: "Tympol या हींग-तेल से 95% गैस 30 मिनट में रिलीज।", deterioration: "गैस का दबाव डायफ्राम पर बढ़ना।" },
      { stage: 2, signs: "बायाँ पेट पीठ की रेखा से ऊपर उठ जाना, पेट में तेज आवाज, सांस तेज।", recovery: "स्टमक ट्यूब या झागनाशक से 85% तुरंत राहत।", deterioration: "श्वास अवरोध व फेफड़ों का पिचकना।" },
      { stage: 3, signs: "मुंह खोलकर हांफना, नीली जीभ बाहर, आंखों में भय, नाड़ी अत्यंत तेज।", recovery: "आपातकालीन ट्रोकार-कैनुला (Trocar & Cannula) द्वारा बाएं कोख से गैस पंचर से 75% जीवन रक्षा।", deterioration: "कार्डियोरेस्पिरेटरी फेल्योर।" },
      { stage: 4, signs: "पशु का गिर पड़ना, श्वांस रुकना, आंतरिक रक्तवाहिकाओं का फटना।", recovery: "आपातकालीन रूमेनोटॉमी (<20% सफलता)।", deterioration: "एस्फिक्सिया (दम घुटने) से 15-30 मिनट में मृत्यु।" }
    ]
  },
  {
    id: "THEILERIOSIS",
    nameHi: "थायलेरियासिस (Theileriosis)",
    nameEn: "Bovine Theileriosis",
    category: "PROTOZOAL",
    tempRange: "अति-तीव्र ज्वर (>105°F)",
    cardinalSigns: "कंधे के आगे (Prescapular) या कान के पीछे की लिम्फ ग्रंथियों में कठोर सूजन; लगातार तेज बुखार (105-106°F); आँखों की श्लेष्मा झिल्ली का सफेद/पीला पड़ना (गंभीर एनीमिया) एवं पुतलियों पर धब्बे।",
    pregnancyAlert: "बुपरवाक्वोन (Buparvaquone) गाभिन पशुओं में अत्यंत सुरक्षित व जीवनरक्षक है। अत्यधिक एनीमिया में गर्भपात का खतरा रहता है अतः आयरन टॉनिक अवश्य दें।",
    labTests: [
      { sNo: 1, testName: "लिम्फ नोड बायोप्सी स्मीयर (Lymph Node Biopsy Giemsa)", sampleType: "सूजी लिम्फ नोड से सुई द्वारा निकाला गया द्रव", approxMrp: 200, tat: "30 मिनट", confirms: "Koch's Blue Bodies (शिज़ोंट्स) की पुष्टि" },
      { sNo: 2, testName: "रक्त स्मीयर परीक्षण (Thin Blood Smear)", sampleType: "कान की नस से परिधीय रक्त", approxMrp: 150, tat: "30 मिनट", confirms: "आरबीसी के भीतर Theileria annulata पिरोप्लाज्म" },
      { sNo: 3, testName: "हीमोग्लोबिन व पीसीवी (Hb & PCV)", sampleType: "ईडीटीए रक्त", approxMrp: 180, tat: "1 घंटा", confirms: "गंभीर नॉर्मोसाइटिक नॉर्मोक्रोमिक एनीमिया" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "विशिष्ट एंटीप्रोटोझोअल", generic: "Buparvaquone", ethicalBrand: "Butalex / Zubion 50mg/ml", approxMrp: 850, doseRoute: "2.5 mg/kg b.wt (1 ml प्रति 20 kg) Deep IM Single Dose", pregnancySafety: "पूर्ण सुरक्षित", purpose: "थायलेरिया परजीवियों (शिज़ोंट्स व पिरोप्लाज्म) का संपूर्ण खात्मा" },
        { sNo: 2, category: "सहयोगी एंटीबायोटिक", generic: "Oxytetracycline LA 200mg/ml", ethicalBrand: "Terramycin LA / Oxyvet LA", approxMrp: 260, doseRoute: "20 mg/kg IM (15-20 ml)", pregnancySafety: "सावधानी से सुरक्षित", purpose: "प्रोटोझोआ के गुणन पर रोक व द्वितीयक संक्रमण नियंत्रण" },
        { sNo: 3, category: "आयरन व आरबीसी बूस्टर", generic: "Iron Dextran Complex", ethicalBrand: "Feritas / Imferon", approxMrp: 220, doseRoute: "10 ml Deep IM alternate day", pregnancySafety: "सुरक्षित", purpose: "गंभीर एनीमिया व हीमोग्लोबिन स्तर में तेजी से सुधार" },
        { sNo: 4, category: "एनएसएआईडी", generic: "Meloxicam + Paracetamol", ethicalBrand: "Melonex Plus", approxMrp: 140, doseRoute: "15 ml IM", pregnancySafety: "सुरक्षित", purpose: "105°F बुखार व लिम्फ नोड दर्द में कमी" }
      ],
      oral: [
        { name: "लिवर टॉनिक व विटामिन B12 सिरप", brand: "Liv-52 Protec / Sharkoferrol", dose: "50 ml रोज गुड़ में मिलाकर", duration: "15 दिन", purpose: "यकृत सुदृढ़ीकरण एवं नई रक्त कोशिकाओं का निर्माण" }
      ],
      ayurvedic: [
        { name: "चिचड़ी नाशक नीम लेप", ingredients: "नीम का तेल 100ml + कपूर 10g", dose: "शरीर पर चिचड़ियों (Ticks) वाले स्थानों पर लगाना", purpose: "रोग फैलाने वाली Hyalomma चिचड़ियों का खात्मा" }
      ],
      homeopathic: [
        { name: "Crotalus Horridus 200C + China 200C", dose: "10-10 बूंद दिन में 3 बार", purpose: "रक्त क्षय, एनीमिया व अत्यधिक दुर्बलता में लाभ" }
      ],
      desiRemedies: [
        { name: "गन्ने का सिरका, गुड़ व सोंठ", preparation: "100ml गन्ने का सिरका + 100g पुराना गुड़ पानी में मिलाकर 5 दिन पिलाएं।", purpose: "पाचन सुधार व तिल्ली (Spleen) को संबल" }
      ]
    },
    stages: [
      { stage: 1, signs: "तेज बुखार (105-106°F), कंधे की लिम्फ नोड में सूजन, आंख से पानी आना।", recovery: "समय पर बुपरवाक्वोन (Butalex) से 90-95% पूर्ण स्वस्थ।", deterioration: "आरबीसी का टूटना व एनीमिया गहराना।" },
      { stage: 2, signs: "आँखें व मसूड़े सफेद पड़ना, सांस तेज चलना, चारा-पानी छोड़ना, गंभीर कमजोरी।", recovery: "बुपरवाक्वोन + फेरिटास आयरन से 75-80% रिकवरी।", deterioration: "फेफड़ों में पानी (पल्मोनरी एडीमा) भरना।" },
      { stage: 3, signs: "खांसी, नाक से झागदार स्राव, आंखों के कॉर्निया का सफेद होना (Corneal Opacity), पीलिया।", recovery: "सघन चिकित्सीय देखरेख व ऑक्सीजन से 40-50% रिकवरी।", deterioration: "हाइपोक्सिया व आंतरिक रक्तस्राव।" },
      { stage: 4, signs: "गंभीर हाइपोथर्मिया, हीमोग्लोबिन <4 g/dl, पशु का गिर पड़ना, अचेतन।", recovery: "रक्त आधान (Blood Transfusion) के बिना असंभव (<10%)।", deterioration: "एनीमिक एनोक्सिया से मृत्यु।" }
    ]
  },
  {
    id: "BABESIOSIS",
    nameHi: "बबेशियोसिस / लाल पेशाब (Babesiosis / Red Water)",
    nameEn: "Bovine Babesiosis (Red Water)",
    category: "PROTOZOAL",
    tempRange: "अति-तीव्र ज्वर (>105°F)",
    cardinalSigns: "गहरे लाल या कॉफी/कोल्ड-ड्रिंक के रंग का पेशाब आना (Hemoglobinuria); 105-106°F तेज बुखार; श्लेष्मा झिल्लियों का तेजी से पीला व सफेद पड़ना; दिल की धड़कन दूर से सुनाई देना (Pounding Heart Sound)।",
    pregnancyAlert: "डाइमिनाजीन (Diminazene) की अधिक डोज़ गाभिन में विषाक्तता कर सकती है। सटीक वजन मापकर 3.5 mg/kg ही दें। इमिडोकार्ब (Imidocarb) सुरक्षित विकल्प है।",
    labTests: [
      { sNo: 1, testName: "ब्लड स्मीयर जिम्सा स्टेन (Giemsa Stained Blood Smear)", sampleType: "कान की नस से परिधीय रक्त", approxMrp: 150, tat: "30 मिनट", confirms: "आरबीसी में Babesia bigemina (नाशपाती के आकार के युग्मित प्रोटोजोआ)" },
      { sNo: 2, testName: "यूरिन स्ट्रिप टेस्ट (Urine Hemoglobin vs RBC)", sampleType: "ताजा लाल मूत्र", approxMrp: 70, tat: "5 मिनट", confirms: "सच्चा हीमोग्लोबिनुरिया (सेंट्रीफ्यूज करने पर भी लाल रहना)" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "विशिष्ट बबेशियानाशक", generic: "Diminazene Aceturate", ethicalBrand: "Berenil / Babenil 7%", approxMrp: 190, doseRoute: "3.5 - 5 mg/kg Deep IM (1 ml प्रति 15-20 kg)", pregnancySafety: "सटीक डोज़ में सुरक्षित", purpose: "बबेशिया परजीवियों का रक्त से तीव्र विनाश" },
        { sNo: 2, category: "प्रीमियम एंटीप्रोटोझोअल (वैकल्पिक)", generic: "Imidocarb Dipropionate", ethicalBrand: "Imizol", approxMrp: 650, doseRoute: "1.2 mg/kg SC (1 ml प्रति 100 kg)", pregnancySafety: "सुरक्षित", purpose: "लंबी अवधि तक बबेशिया व एनाप्लाज्मा पर दोहरा नियंत्रण" },
        { sNo: 3, category: "फ्लुइड थेरेपी", generic: "Dextrose Saline 5% (DNS)", ethicalBrand: "DNS Infusion 1000ml", approxMrp: 120, doseRoute: "2-3 लीटर धीमा IV", pregnancySafety: "सुरक्षित", purpose: "गुर्दों (Kidneys) को हीमोग्लोबिन जमाव से बचाना व डिहाइड्रेशन दूर करना" },
        { sNo: 4, category: "आयरन बूस्टर", generic: "Iron Dextran", ethicalBrand: "Feritas", approxMrp: 220, doseRoute: "10 ml IM", pregnancySafety: "सुरक्षित", purpose: "टूटी हुई आरबीसी की भरपाई" }
      ],
      oral: [
        { name: "लिवर टॉनिक व हेमेटिनिक सिरप", brand: "Livoferol / Ferikind Pet/Vet", dose: "50 ml रोज", duration: "10 दिन", purpose: "यकृत कार्यप्रणाली सुधार एवं आरबीसी पुनर्जनन" }
      ],
      ayurvedic: [
        { name: "गिलोय व नीम काढ़ा", ingredients: "50g ताजा गिलोय + 20 नीम की पत्तियां 1 लीटर पानी में उबालकर आधा करें", dose: "दिन में 2 बार 5 दिन पिलाएं", purpose: "प्राकृतिक ज्वरनाशक व रक्त शोधक" }
      ],
      homeopathic: [
        { name: "Crotalus Horridus 200C + Phosphorus 200C", dose: "10-10 बूंद दिन में 4 बार", purpose: "लाल पेशाब (हीमोलाइसिस) रोकने में अत्यंत प्रभावी" }
      ],
      desiRemedies: [
        { name: "ठंडे पानी का छिड़काव व छाया", preparation: "पशु को ठंडे हवादार स्थान पर रखें, सिर पर ठंडा पानी डालें। भरपूर ताजा पानी व गुड़ का शर्बत पिलाएं।", purpose: "शारीरिक तापमान नियंत्रण व गुर्दा सुरक्षा" }
      ]
    },
    stages: [
      { stage: 1, signs: "105°F तेज बुखार, सुस्ती, पेशाब का रंग हल्का लाल या गुलाबी होना।", recovery: "बेरेनिल (Berenil) से 24 घंटे में 95% पेशाब का रंग साफ।", deterioration: "आरबीसी का व्यापक विनाश (Intravascular Hemolysis)।" },
      { stage: 2, signs: "पेशाब गहरा लाल/कॉफी जैसा, दिल की तेज धड़कन, आँखें अत्यधिक पीली व सफेद।", recovery: "बेरेनिल + DNS फ्लुइड से 80-85% पूर्ण स्वस्थ।", deterioration: "गुर्दे खराब होना (Renal Tubular Blockage)।" },
      { stage: 3, signs: "पेशाब बंद होना या बूंद-बूंद आना, गंभीर पीलिया, सांस फूलना, लड़खड़ाहट।", recovery: "डाययूरेटिक व आईवी फ्लुइड्स से 40-50% रिकवरी।", deterioration: "एक्यूट रीनल फेल्योर व यूरिया बढ़ना।" },
      { stage: 4, signs: "हाइपोथर्मिया, शरीर ठंडा पड़ना, सांस रुक-रुक कर आना, कोमा।", recovery: "अत्यंत संकटपूर्ण (<10%)।", deterioration: "रीनल फेल्योर व कार्डियक कोलैप्स से मृत्यु।" }
    ]
  },
  {
    id: "ANAPLASMOSIS",
    nameHi: "एनाप्लास्मोसिस / पीलिया बुखार (Anaplasmosis / Gall Sickness)",
    nameEn: "Bovine Anaplasmosis",
    category: "PROTOZOAL",
    tempRange: "मध्यम ज्वर (103-104°F)",
    cardinalSigns: "अत्यधिक गंभीर पीलिया (Mucous membranes are lemon yellow); आँखें, थन व योनि की झिल्ली गहरी पीली; बिना लाल पेशाब के गंभीर खून की कमी; गोबर सूखा, सख्त व काले रंग का।",
    pregnancyAlert: "ऑक्सीटेट्रासाइक्लिन (Oxytetracycline) उच्च डोज़ में गाभिन पशुओं में सावधानी से दी जानी चाहिए। अत्यधिक दुर्बल पशु में आईवी धीमी गति से दें।",
    labTests: [
      { sNo: 1, testName: "रक्त स्मीयर जिम्सा स्टेन (Thin Blood Smear)", sampleType: "परिधीय रक्त (Ear vein)", approxMrp: 150, tat: "30 मिनट", confirms: "आरबीसी की परिधि पर Anaplasma marginale मार्जिनल बॉडीज" },
      { sNo: 2, testName: "सीरम बिलीरुबिन टेस्ट (Serum Bilirubin Total & Direct)", sampleType: "सीरम", approxMrp: 200, tat: "2 घंटे", confirms: "अत्यधिक बढ़ा हुआ अनकन्जुगेटेड बिलीरुबिन (Hemolytic Jaundice)" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "विशिष्ट टेट्रासाइक्लिन एंटीबायोटिक", generic: "Oxytetracycline Long Acting (LA)", ethicalBrand: "Terramycin LA / Oxyvet LA 200mg/ml", approxMrp: 280, doseRoute: "20 mg/kg b.wt Deep IM (1 ml प्रति 10 kg), 72 घंटे बाद दोहराएं", pregnancySafety: "सावधानी से सुरक्षित", purpose: "एनाप्लाज्मा रिकेट्सिया का पूर्ण विनाश" },
        { sNo: 2, category: "एंटीप्रोटोझोअल (वैकल्पिक)", generic: "Imidocarb Dipropionate", ethicalBrand: "Imizol", approxMrp: 650, doseRoute: "2.5 mg/kg SC (2 ml प्रति 100 kg)", pregnancySafety: "सुरक्षित", purpose: "एनाप्लाज्मा उन्मूलन" },
        { sNo: 3, category: "आयरन व विटामिन B12", generic: "Iron Dextran Complex", ethicalBrand: "Feritas", approxMrp: 220, doseRoute: "10 ml IM alternate day", pregnancySafety: "सुरक्षित", purpose: "तीव्र एनीमिया व पीलिया से रिकवरी" },
        { sNo: 4, category: "लिवर अर्क इंजेक्शन", generic: "Liver Extract + Vitamin B-Complex", ethicalBrand: "Belamyl", approxMrp: 110, doseRoute: "10 ml IM daily x 5 days", pregnancySafety: "सुरक्षित", purpose: "यकृत की सूजन व बाइल रुकावट दूर करना" }
      ],
      oral: [
        { name: "हर्बल हेपाटोप्रोटेक्टिव सिरप", brand: "Liv-52 Vet / Livoferol", dose: "100 ml सुबह-शाम", duration: "10 दिन", purpose: "यकृत कोशिकाओं का विषहरण एवं बिलीरुबिन निष्कासन" },
        { name: "मैग्नीशियम सल्फेट (जमालघोटा/दस्त हेतु)", brand: "Epsom Salt (MgSO4)", dose: "150-200 ग्राम पानी में", duration: "एकल डोज़", purpose: "सख्त काले गोबर व आंतों की कब्ज का निवारण" }
      ],
      ayurvedic: [
        { name: "पुनर्नवा व भूमि-आंवला चूर्ण", ingredients: "30g भूमि आंवला + 30g पुनर्नवा + 50g गुड़", dose: "दिन में 2 बार 7 दिन तक", purpose: "यकृत व तिल्ली के विकारों में चमत्कारी लाभ" }
      ],
      homeopathic: [
        { name: "Chelidonium 200C + Carduus Marianus 200C", dose: "10-10 बूंद दिन में 3 बार", purpose: "गंभीर पीलिया व यकृत सुस्ती में अत्यंत लाभप्रद" }
      ],
      desiRemedies: [
        { name: "गन्ने का रस व मूली के पत्ते", preparation: "ताजा गन्ने का रस (2 लीटर) या मूली के पत्तों का रस (500ml) 5 दिन तक पिलाएं।", purpose: "नेचुरल ग्लूकोज व बिलीरुबिन फ्लशिंग" }
      ]
    },
    stages: [
      { stage: 1, signs: "हल्का बुखार (103-104°F), सुस्ती, चारा कम खाना, आँखों में पीलापन की शुरुआत।", recovery: "Oxytetracycline LA से 95% पूर्ण स्वस्थ।", deterioration: "एनीमिया व पीलिया का गहराना।" },
      { stage: 2, signs: "आँखें नींबू जैसी पीली, बिना लाल पेशाब के हीमोग्लोबिन 5 g/dl, गोबर सूखा काला।", recovery: "ऑक्सीटेट्रासाइक्लिन + लिवर टॉनिक से 80-85% रिकवरी।", deterioration: "ऑक्सीजन की कमी से चिड़चिड़ापन व आक्रामकता।" },
      { stage: 3, signs: "मस्तिष्क में ऑक्सीजन की कमी (Anoxic Mania - पशु का सींग मारना या गिरना), भयंकर कमजोरी।", recovery: "शांतिपूर्वक ड्रिप व देखरेख से 50% रिकवरी।", deterioration: "तनाव से हार्ट अटैक या सांस रुकना।" },
      { stage: 4, signs: "पशु उठने में असमर्थ, शरीर ठंडा, श्लेष्मा झिल्ली सफेद-पीली, निर्जलीकरण।", recovery: "रक्त चढ़ाए बिना केवल 15% संभावना।", deterioration: "कार्डियोवैस्कुलर कोलैप्स से मृत्यु।" }
    ]
  },
  {
    id: "SURRA",
    nameHi: "सर्रा रोग (Trypanosomiasis / Surra)",
    nameEn: "Bovine Trypanosomiasis (Surra)",
    category: "PROTOZOAL",
    tempRange: "मध्यम ज्वर (103-104°F)",
    cardinalSigns: "रुक-रुक कर आने वाला बुखार (Intermittent Fever); दीवार से सिर दबाकर खड़ा होना या गोल चक्कर काटना (Circling); आंखों से लगातार पानी व अंधापन (Opacity); पेट के निचले हिस्से व पैरों पर पानी जैसी सूजन (Edema)।",
    pregnancyAlert: "ट्राइपैनोसाइड दवाएं (जैसे Quinapyramine) की सही डोज़ दें। ओवरडोज़ से मांसपेशियों में कंपकंपी व गर्भपात संभव है।",
    labTests: [
      { sNo: 1, testName: "वेट ब्लड स्मीयर (Wet Blood Mount)", sampleType: "ताजा परिधीय रक्त की बूंद", approxMrp: 120, tat: "15 मिनट", confirms: "माइक्रोस्कोप में आरबीसी के बीच तेजी से तैरते Trypanosoma evansi" },
      { sNo: 2, testName: "कार्ड एग्ग्लूटिनेशन टेस्ट (CATT/T. evansi)", sampleType: "सीरम", approxMrp: 400, tat: "1 घंटा", confirms: "विशिष्ट एंटीबॉडीज द्वारा क्रोनिक सर्रा की पहचान" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "विशिष्ट ट्राइपैनोसाइड", generic: "Quinapyramine Sulfate + Chloride", ethicalBrand: "Triquin / Antrycide Pro-salt", approxMrp: 380, doseRoute: "4.4 mg/kg SC (दो अलग-अलग स्थानों पर लगाएं)", pregnancySafety: "सटीक डोज़ में सुरक्षित", purpose: "ट्रिपैनोसोमा परजीवियों का संपूर्ण खात्मा व 6 माह सुरक्षा" },
        { sNo: 2, category: "वैकल्पिक ट्राइपैनोसाइड", generic: "Diminazene Aceturate", ethicalBrand: "Berenil 7%", approxMrp: 190, doseRoute: "7-10 mg/kg Deep IM", pregnancySafety: "सुरक्षित", purpose: "एक्यूट सर्रा में तत्काल परजीवी विनाश" },
        { sNo: 3, category: "न्यूरो-टॉनिक", generic: "Mecobalamin + Pyridoxine + Nicotinamide", ethicalBrand: "Neurokind Plus / Tribivet", approxMrp: 140, doseRoute: "10 ml IM daily x 5 days", pregnancySafety: "सुरक्षित", purpose: "मस्तिष्क व तंत्रिका तंत्र की सूजन व क्षति निवारण" },
        { sNo: 4, category: "एडिमा निवारक डाययूरेटिक", generic: "Furosemide", ethicalBrand: "Lasix / Vetamph", approxMrp: 90, doseRoute: "5-10 ml IM (यदि पैरों व पेट पर भारी सूजन हो)", pregnancySafety: "सावधानीपूर्वक", purpose: "शरीर से अतिरिक्त तरल निकालना" }
      ],
      oral: [
        { name: "आयरन व टॉनिक सप्लीमेंट", brand: "Sharkoferrol / Feritas Syrup", dose: "50 ml रोज", duration: "15 दिन", purpose: "एनीमिया दूर करना व दुर्बलता मिटाना" }
      ],
      ayurvedic: [
        { name: "दंश मक्खी (Tabanus) निवारक धुआं", ingredients: "नीम के सूखे पत्ते, कपूर व लोबान का धुआं", dose: "पशुशाला में सुबह-शाम", purpose: "रोग फैलाने वाली डाँस/मक्खियों का भगाना" }
      ],
      homeopathic: [
        { name: "Arsenicum Album 200C + Nux Vomica 200C", dose: "10-10 बूंद दिन में 3 बार", purpose: "कमजोरी, रुक-रुक कर बुखार व बेचैनी में लाभ" }
      ],
      desiRemedies: [
        { name: "कालीमिर्च, घी व मिश्री", preparation: "15g पिसी कालीमिर्च + 100g देशी घी + 50g मिश्री मिलाकर 5 दिन दें।", purpose: "मस्तिष्क की दुर्बलता व नर्वस टोन में सुधार" }
      ]
    },
    stages: [
      { stage: 1, signs: "रुक-रुक कर बुखार (104°F), आंख से पानी, हल्का लंगड़ापन व सुस्ती।", recovery: "Triquin से 95% पूर्ण स्थायी रिकवरी।", deterioration: "परजीवियों का रक्त से मस्तिष्क की ओर बढ़ना।" },
      { stage: 2, signs: "एनीमिया, पेट व जांघों पर सूजन (Edema), वजन तेजी से घटना, दूध सूखना।", recovery: "एंटीप्रोटोझोअल + आयरन से 80-85% रिकवरी।", deterioration: "नर्वस सिस्टम का प्रभावित होना।" },
      { stage: 3, signs: "नर्वस लक्षण (दीवार से सिर टकराना, गोल चक्कर काटना, अंधापन, लड़खड़ाना)।", recovery: "तत्काल Triquin व न्यूरो-टॉनिक से 50-60% रिकवरी।", deterioration: "मस्तिष्क में स्थायी नेक्रोसिस।" },
      { stage: 4, signs: "लकवा (Paralysis), जमीन पर गिरकर पैर चलाना, आक्षेप (Convulsions)।", recovery: "असाध्य (<10%)।", deterioration: "केंद्रीय तंत्रिका तंत्र फेल्योर से मृत्यु।" }
    ]
  },
  {
    id: "LUMPY_SKIN",
    nameHi: "गांठदार त्वचा रोग (Lumpy Skin Disease - LSD)",
    nameEn: "Lumpy Skin Disease",
    category: "VIRAL",
    tempRange: "अति-तीव्र ज्वर (>105°F)",
    cardinalSigns: "सम्पूर्ण शरीर की त्वचा पर 2 से 5 सेमी की कठोर गोल गांठें (Nodules); पैरों व गलबल में पानी जैसी भारी सूजन; आंखों व नाक से गाढ़ा स्राव; दूध में अचानक भारी गिरावट।",
    pregnancyAlert: "गर्भवती गायों में तेज बुखार से गर्भपात की भारी आशंका। पैरासिटामोल नियमित दें। गोट पॉक्स वैक्सीन एक्टिव रोग वाले पशु को न लगाएं।",
    labTests: [
      { sNo: 1, testName: "पीसीआर परीक्षण (Real-time PCR for Capripoxvirus)", sampleType: "त्वचा की पपड़ी (Skin Scab) या गांठ का बायोप्सी द्रव", approxMrp: 1400, tat: "24-48 घंटे", confirms: "Lumpy Skin Disease Virus DNA की निश्चित पुष्टि" },
      { sNo: 2, testName: "सीबीसी (Complete Blood Count)", sampleType: "ईडीटीए रक्त", approxMrp: 250, tat: "2 घंटे", confirms: "ल्यूकोपेनिया के बाद द्वितीयक बैक्टीरियल ल्यूकोसाइटोसिस" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "एंटीबायोटिक (त्वचा घाव व निमोनिया रोधी)", generic: "Ceftiofur Sodium", ethicalBrand: "Xyrofur 1g / Naxcel", approxMrp: 480, doseRoute: "1g प्रति 400kg IM OD x 3-5 days", pregnancySafety: "पूर्ण सुरक्षित", purpose: "गांठों में मवाद पड़ना व द्वितीयक फेफड़ों का संक्रमण रोकना" },
        { sNo: 2, category: "एंटीपायरेटिक व दर्द निवारक", generic: "Meloxicam + Paracetamol", ethicalBrand: "Melonex Plus", approxMrp: 140, doseRoute: "15-20 ml IM OD x 3 days", pregnancySafety: "सुरक्षित", purpose: "105°F बुखार, त्वचा दर्द व पैरों की सूजन घटाना" },
        { sNo: 3, category: "एंटीहिस्टामिनिक", generic: "Pheniramine Maleate", ethicalBrand: "Avil", approxMrp: 85, doseRoute: "10 ml IM OD", pregnancySafety: "सुरक्षित", purpose: "त्वचा की एलर्जी, खुजली व स्राव नियंत्रण" },
        { sNo: 4, category: "त्वचा विटामिन व जिंक", generic: "Vitamin A, D3, E, H (Biotin) + Zinc", ethicalBrand: "Intavita NH / Hivit", approxMrp: 280, doseRoute: "5-10 ml IM alternate day (3 doses)", pregnancySafety: "सुरक्षित", purpose: "त्वचा के घावों का तीव्र भराव व पपड़ी छुड़ाना" }
      ],
      oral: [
        { name: "इम्यूनोबूस्टर सप्लीमेंट", brand: "Immuplus / Restobal Liquid", dose: "50 ml सुबह-शाम", duration: "10 दिन", purpose: "प्रतिरोधक क्षमता वृद्धि व वायरल लोड कम करना" }
      ],
      ayurvedic: [
        { name: "हर्बल घाव स्प्रे", brand: "Topicure Spray / Scavon Spray", dose: "फूटी हुई गांठों पर दिन में 3 बार छिड़काव", purpose: "कीड़े (Maggots) पड़ने से रोकना व घाव सुखाना" }
      ],
      homeopathic: [
        { name: "Variolinum 200C + Thuja 200C + Silicea 200C", dose: "10-10 बूंद दिन में 3 बार रोटी पर", purpose: "गांठों को पकाने, सुखाने व त्वचा पुनर्जनन में अत्यंत सिद्ध" }
      ],
      desiRemedies: [
        { name: "राष्ट्रीय डेयरी विकास बोर्ड (NDDB) प्रमाणित काढ़ा", preparation: "10 नग पान के पत्ते, 10g कालीमिर्च, 10g नमक को पीसकर गुड़ में मिलाकर पहली खुराक; बाद में हल्दी, लहसुन, नीम पत्ता का काढ़ा दिन में 2 बार दें।", purpose: "प्रतिरोधक क्षमता व त्वचा हीलिंग" }
      ]
    },
    stages: [
      { stage: 1, signs: "तेज बुखार (105-106°F), सुस्ती, आंखों व नाक से पानी, दूध में गिरावट।", recovery: "एंटीपायरेटिक व इम्यून बूस्टर से 90% रिकवरी।", deterioration: "शरीर पर छोटी-छोटी गांठों का उभरना।" },
      { stage: 2, signs: "पूरे शरीर पर दर्जनों कठोर गांठें, पैरों व गले में भारी पानी सूजन, लंगड़ाना।", recovery: "सेफ्टिओफर व मेलॉक्सिकैम से 80-85% गांठें बिना मवाद सूखेगी।", deterioration: "गांठों का नासूर बनना व घाव होना।" },
      { stage: 3, signs: "गांठों का फटना, खुले घाव, मक्खियों द्वारा कीड़े पड़ना, निमोनिया के लक्षण।", recovery: "नियमित एंटीसेप्टिक ड्रेसिंग व स्प्रे से 60-70% रिकवरी।", deterioration: "फेफड़ों में अल्सर व सेप्टीसीमिया।" },
      { stage: 4, signs: "गंभीर दुर्बलता, सांस लेने में कष्ट, मवादयुक्त सेप्सिस, खुरों के जोड़ खराब होना।", recovery: "लंबे उपचार (1-2 माह) से 40% पशु बचते हैं।", deterioration: "द्वितीयक निमोनिया व शॉक से मृत्यु।" }
    ]
  },
  {
    id: "PNEUMONIA_BRD",
    nameHi: "श्वसन तंत्र शोथ / निमोनिया (Bovine Respiratory Disease - BRD)",
    nameEn: "Bovine Respiratory Disease / Pneumonia",
    category: "BACTERIAL",
    tempRange: "अति-तीव्र ज्वर (>105°F)",
    cardinalSigns: "छाती व फेफड़ों से घुरघुराहट या सीटी जैसी आवाज (Wheezing/Rales); तेज हांफना व पसलियां चलना; नाक से गाढ़ा पीला-सफेद बलगम बहना; बार-बार कष्टदायक सूखी या बलगमयुक्त खांसी।",
    pregnancyAlert: "फ्लूनिक्सिन मेग्लुमाइन (Flunixin) फेफड़ों की सूजन में सर्वोत्तम है। फ्लोर्फेविकोल (Florfenicol) गाभिन में सुरक्षित है।",
    labTests: [
      { sNo: 1, testName: "नेजल स्वैब कल्चर एवं संवेदनशीलता (Nasal Swab ABST)", sampleType: "गहरे नाक का स्वैब", approxMrp: 500, tat: "48 घंटे", confirms: "Pasteurella / Mannheimia / Mycoplasma की पुष्टि" },
      { sNo: 2, testName: "थोरैसिक अल्ट्रासोनोग्राफी / चेस्ट एक्स-रे", sampleType: "फेफड़े व छाती का स्कैन", approxMrp: 800, tat: "1 घंटा", confirms: "फेफड़ों का कड़ा होना (Consolidation) व प्लूरल इफ्यूजन" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "विशिष्ट रेस्पिरेटरी एंटीबायोटिक", generic: "Florfenicol 300mg/ml", ethicalBrand: "Nuflor / Florcon", approxMrp: 520, doseRoute: "20 mg/kg IM (2 डोज़ 48 घंटे के अंतर पर) या 40 mg/kg SC एकल", pregnancySafety: "सुरक्षित", purpose: "फेफड़ों के ऊतकों में गहराई तक पहुंचकर जीवाणु विनाश" },
        { sNo: 2, category: "वैकल्पिक एंटीबायोटिक", generic: "Enrofloxacin 10%", ethicalBrand: "Enrocin / Baytril", approxMrp: 260, doseRoute: "5 mg/kg IM/SC", pregnancySafety: "सावधानीपूर्वक", purpose: "ब्रॉड-स्पेक्ट्रम श्वसन रोगाणु नियंत्रण" },
        { sNo: 3, category: "फेफड़ों की सूजन निवारक NSAID", generic: "Flunixin Meglumine", ethicalBrand: "Megludyne", approxMrp: 290, doseRoute: "2.2 mg/kg IV/IM OD x 3 days", pregnancySafety: "सुरक्षित", purpose: "फेफड़ों के वायुकोषों (Alveoli) की सूजन घटाना व सांस आसान करना" },
        { sNo: 4, category: "म्यूकोलाइटिक व ब्रोन्कोडायलेटर", generic: "Bromhexine Hydrochloride", ethicalBrand: "Brophill / Mucolit", approxMrp: 160, doseRoute: "10-15 ml IM", pregnancySafety: "सुरक्षित", purpose: "गाढ़े बलगम को पतला करके बाहर निकालना" }
      ],
      oral: [
        { name: "हर्बल कफ सिरप", brand: "Kafnol / Resposell Syrup", dose: "50 ml सुबह-शाम गुनगुने पानी में", duration: "5 दिन", purpose: "खांसी शांत करना व श्वासनली को आराम देना" }
      ],
      ayurvedic: [
        { name: "अजवाइन व यूकेलिप्टस भाप (Steam Inhalation)", ingredients: "10ml नीलगिरी (Eucalyptus) तेल + 20g अजवाइन उबलते पानी में", dose: "पशु के नथुनों पर बाल्टी से भाप दें (दिन में 2 बार)", purpose: "बंद नथुने खोलना व श्वसन नली को नम करना" }
      ],
      homeopathic: [
        { name: "Antimonium Tart 200C + Bryonia 200C + Aconite 200C", dose: "10-10 बूंद दिन में 4 बार", purpose: "छाती की घुरघुर आवाज व कष्टदायक खांसी में तुरंत राहत" }
      ],
      desiRemedies: [
        { name: "कालीमिर्च, तुलसी व अदरक काढ़ा", preparation: "10 नग कालीमिर्च + 20 तुलसी पत्र + 20g अदरक कूटकर 500ml पानी में उबालें, 100g गुड़ मिलाकर गुनगुना पिलाएं।", purpose: "प्राकृतिक कफ निष्कासक व फेफड़ा टॉनिक" }
      ]
    },
    stages: [
      { stage: 1, signs: "तापमान 104-105°F, नाक से साफ पानी, हल्की सूखी खांसी, सुस्ती।", recovery: "फ्लोरफेनिकोल से 95% पूर्ण स्वस्थ।", deterioration: "बलगम का गाढ़ा व पीला होना।" },
      { stage: 2, signs: "छाती से स्पष्ट घुरघुर आवाज, पसलियां चलना, गाढ़ा बलगम, चारा छोड़ना।", recovery: "एंटीबायोटिक + ब्रोम्हेक्सिन से 80-85% रिकवरी।", deterioration: "फेफड़ों का फाइब्रिनस निमोनिया में बदलना।" },
      { stage: 3, signs: "मुंह खोलकर सांस लेना, गर्दन आगे खींचना, अत्यधिक कमजोरी, फेफड़ों में पानी।", recovery: "सघन चिकित्सीय देखरेख से 50% रिकवरी।", deterioration: "प्लूरल गुहा में मवाद (Empyema) व नेक्रोसिस।" },
      { stage: 4, signs: "गंभीर हाइपोक्सिया, मुंह से झाग, शरीर का ठंडा होना, फेफड़ों का काम बंद करना।", recovery: "असाध्य (<15%)।", deterioration: "रेस्पिरेटरी फेल्योर व एस्फिक्सिया से मृत्यु।" }
    ]
  },
  {
    id: "ENTEROTOXEMIA",
    nameHi: "फिड़किया रोग (Enterotoxemia / Pulpy Kidney)",
    nameEn: "Enterotoxemia (Overeating Disease)",
    category: "BACTERIAL",
    tempRange: "मध्यम ज्वर (103-104°F)",
    cardinalSigns: "अचानक दाना या हरा चारा अधिक खाने के बाद पेट में मरोड़; सिर को पीछे की ओर मोड़ना (Opisthotonos); जमीन पर गिरकर पैरों को साइकिल की तरह चलाना व दांत पीसना; 2 से 6 घंटे में अचानक मृत्यु।",
    pregnancyAlert: "भेड़-बकरियों में अति-घातक है। गाभिन बकरियों में टीकाकरण द्वारा मेमनों को पैसिव इम्युनिटी मिलती है। आपातकाल में एंटीटॉक्सिन दें।",
    labTests: [
      { sNo: 1, testName: "मूत्र ग्लूकोज परीक्षण (Urine Glucosuria Test Strip)", sampleType: "ताजा मूत्र (कैथेटर या मरणोपरांत)", approxMrp: 50, tat: "2 मिनट", confirms: "गंभीर ग्लाइकोसुरिया (+++) फिड़किया रोग का विशिष्ट पैथोग्नोमोनिक चिन्ह है" },
      { sNo: 2, testName: "आंत सामग्री स्मीयर (Intestinal Smear Gram Stain)", sampleType: "छोटी आंत का स्राव", approxMrp: 150, tat: "30 मिनट", confirms: "Clostridium perfringens Type D की भारी संख्या" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "एंटीटॉक्सिन सीरम", generic: "Clostridium perfringens Type D Antitoxin", ethicalBrand: "ET Antitoxin", approxMrp: 350, doseRoute: "20-50 ml SC/IV (तत्काल उपलब्ध होने पर)", pregnancySafety: "सुरक्षित", purpose: "रक्त में घूम रहे एप्सिलॉन (Epsilon) टॉक्सिन का निष्प्रभावीकरण" },
        { sNo: 2, category: "पेनिसिलिन एंटीबायोटिक", generic: "Crystalline / Procaine Penicillin", ethicalBrand: "Penicillin G 20-40 Lac IU", approxMrp: 120, doseRoute: "20,000 IU/kg IM/IV", pregnancySafety: "सुरक्षित", purpose: "आंतों में क्लॉस्ट्रिडियम जीवाणु का विनाश" },
        { sNo: 3, category: "एंटीस्पास्मोडिक व शामक", generic: "Dicyclomine + Diazepam", ethicalBrand: "Spasmovet + Valium", approxMrp: 180, doseRoute: "बकरी: 2-3 ml IM", pregnancySafety: "सावधानीपूर्वक", purpose: "पेट के तेज दर्द व आक्षेप (दौरे) को शांत करना" }
      ],
      oral: [
        { name: "एक्टिवेटेड चारकोल पाउडर", brand: "Toxiroak / Toxisorb Powder", dose: "20-50 ग्राम पानी में घोलकर", duration: "एकल डोज़", purpose: "आंतों में बचे हुए टॉक्सिन्स का अवशोषण रोकना" },
        { name: "सोडियम बाइकार्बोनेट (मीठा सोडा)", brand: "Baking Soda", dose: "20-30 ग्राम पानी में", duration: "एकल खुराक", purpose: "रूमेन व आंतों के एसिडोसिस को तुरंत शांत करना" }
      ],
      ayurvedic: [
        { name: "सौंफ, हींग व पुदीना अर्क", ingredients: "5g हींग + 20g सौंफ + 10ml पुदीना सत्व", dose: "गुनगुने पानी में मिलाकर पिलाएं", purpose: "आंतों की मरोड़ व गैस शांत करना" }
      ],
      homeopathic: [
        { name: "Nux Vomica 200C + Cuprum Met 200C", dose: "5-5 बूंद हर 15 मिनट पर", purpose: "अचानक पेट मरोड़ व तंत्रिका आक्षेप में राहत" }
      ],
      desiRemedies: [
        { name: "दाना बंद व केवल सूखा चारा", preparation: "दाना, चोकर व हरा चारा तुरंत बंद करें। केवल सूखी घास व साफ पानी दें।", purpose: "आंतों में जीवाणुओं के किण्वन पर रोक" }
      ]
    },
    stages: [
      { stage: 1, signs: "पशु सुस्त, झुंड से अलग खड़ा होना, पेट में हल्का दर्द, लार गिरना।", recovery: "प्रारंभिक पेनिसिलिन व चारकोल से 70-80% रिकवरी।", deterioration: "टॉक्सिन का आंत से रक्त में तेजी से अवशोषण।" },
      { stage: 2, signs: "दांत किटकिटाना, पेट पर लात मारना, सिर पीछे खींचना, आंखों की पुतली फैलना।", recovery: "एंटीटॉक्सिन + सिडेशन से 40-50% रिकवरी।", deterioration: "ब्रेन एडीमा व किडनी नेक्रोसिस।" },
      { stage: 3, signs: "जमीन पर गिरकर साइकिल की तरह पैर चलाना, मुंह से झाग, शरीर में धनुष जैसी ऐंठन।", recovery: "अत्यंत गंभीर (<15% सफलता)।", deterioration: "पल्पी किडनी व टॉक्सिक कोमा।" },
      { stage: 4, signs: "कोमा, सांस उखड़ना, सबटर्मिनल पैरालिसिस।", recovery: "असाध्य।", deterioration: "टॉक्सिमिया से 1-4 घंटे में अचानक मृत्यु।" }
    ]
  },
  {
    id: "PPR",
    nameHi: "पीपीआर / बकरी प्लेग (Peste des Petits Ruminants - PPR)",
    nameEn: "Peste des Petits Ruminants (Goat Plague)",
    category: "VIRAL",
    tempRange: "अति-तीव्र ज्वर (>105°F)",
    cardinalSigns: "बकरी/भेड़ में 105°F+ तेज बुखार; मुंह के अंदर व मसूड़ों पर सफ़ेद छाले व सड़न; आंखों व नाक से गाढ़ा मवादयुक्त स्राव; 3 दिन बाद अत्यंत दुर्गंधयुक्त खूनी पतला दस्त व गंभीर निर्जलीकरण।",
    pregnancyAlert: "गाभिन बकरियों में तेज बुखार व दस्त से लगभग 100% गर्भपात हो जाता है। जीवित क्षीणित वैक्सीन (PPR Vaccine) स्वस्थ पशुओं में ही लगाएं।",
    labTests: [
      { sNo: 1, testName: "सैंडविच एलिसा (PPR Antigen Detection ELISA)", sampleType: "आंख/नाक का स्वैब या मसूड़े की खुरचन", approxMrp: 850, tat: "24 घंटे", confirms: "PPR मॉर्बिलीवायरस प्रतिजन की विशिष्ट पहचान" },
      { sNo: 2, testName: "आरटी-पीसीआर (RT-PCR for PPRV)", sampleType: "रक्त / ऊतक स्राव", approxMrp: 1400, tat: "48 घंटे", confirms: "PPR वायरल आरएनए की पुष्टि" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "एंटीबायोटिक (निमोनिया व दस्त रोधी)", generic: "Enrofloxacin 10%", ethicalBrand: "Enrocin / Baytril", approxMrp: 260, doseRoute: "बकरी: 2.5 - 5 ml IM OD x 3-5 days", pregnancySafety: "सावधानीपूर्वक", purpose: "द्वितीयक बैक्टीरियल निमोनिया व आंतों की सड़ांध रोकना" },
        { sNo: 2, category: "एंटीपायरेटिक व दर्द निवारक", generic: "Meloxicam + Paracetamol", ethicalBrand: "Melonex Plus", approxMrp: 140, doseRoute: "बकरी: 2-3 ml IM", pregnancySafety: "सुरक्षित", purpose: "105°F बुखार व मुंह-आंतों के दर्द में कमी" },
        { sNo: 3, category: "इलेक्ट्रोलाइट व डिहाइड्रेशन ड्रिप", generic: "Ringers Lactate (RL) + Dextrose", ethicalBrand: "RL 500ml", approxMrp: 95, doseRoute: "500 ml धीमा IV या SC", pregnancySafety: "सुरक्षित", purpose: "पतले दस्तों से हुए पानी व लवणों की तत्काल भरपाई" },
        { sNo: 4, category: "विटामिन ए व इम्युनिटी", generic: "Vitamin A, D3, E", ethicalBrand: "Intavita", approxMrp: 220, doseRoute: "2 ml IM", pregnancySafety: "सुरक्षित", purpose: "आंतों व फेफड़ों के उपकला ऊतकों का सुधार" }
      ],
      oral: [
        { name: "एंटीडायरियाल सिरप", brand: "Neblon / Diarest O Susp.", dose: "15-20 ml दिन में 2 बार", duration: "3-4 दिन", purpose: "पतले खूनी दस्त रोकना व आंतों की परत पर रक्षात्मक लेप" }
      ],
      ayurvedic: [
        { name: "मुंह के छालों हेतु ग्लिसरीन-फिटकरी पेंट", ingredients: "50ml ग्लिसरीन + 5g बारीक पिसी फिटकरी", dose: "दिन में 3 बार मुंह व जीभ पर रुई से लगाएं", purpose: "मुंह की दुर्गंध व छालों का प्राकृतिक उपचार" }
      ],
      homeopathic: [
        { name: "Arsenicum Album 200C + Merc Sol 200C", dose: "5-5 बूंद दिन में 4 बार", purpose: "दुर्गंधित दस्त, मुंह के छाले व अत्यधिक कमजोरी में राहत" }
      ],
      desiRemedies: [
        { name: "चावल की कांजी, बेलगिरी व छाछ", preparation: "पके चावल का मांड + 20g कच्चा बेलगिरी पाउडर + 100ml खट्टी छाछ मिलाकर दिन में 2 बार पिलाएं।", purpose: "आंतों को ठंडक व डिहाइड्रेशन से बचाव" }
      ]
    },
    stages: [
      { stage: 1, signs: "105-106°F बुखार, सुस्ती, आंख-नाक से पानी, मुंह के मसूड़ों पर लाली।", recovery: "सहायक एंटीबायोटिक से 80-85% बकरियां बच जाती हैं।", deterioration: "मुंह में सफेद छालों का बनना।" },
      { stage: 2, signs: "मुंह से सड़ी बदबू, चारा खाना बंद, होंठों पर पपड़ी, खांसी व हांफना।", recovery: "सघन चिकित्सीय देखरेख से 60-70% रिकवरी।", deterioration: "गंभीर पतले बदबूदार दस्त शुरू होना।" },
      { stage: 3, signs: "पानी जैसा खूनी दस्त, आंखें धंसना, त्वचा का लचीलापन खत्म (Dehydration), गंभीर निमोनिया।", recovery: "आईवी फ्लुइड्स व एंटीबायोटिक से 30-40% रिकवरी।", deterioration: "हाइपोवोलेमिक शॉक व सबटर्मिनल हाइपोथर्मिया।" },
      { stage: 4, signs: "तापमान सामान्य से नीचे गिरना (<100°F), अचेतावस्था, सांस में घरघराहट।", recovery: "प्रायः असाध्य (<10%)।", deterioration: "गंभीर निर्जलीकरण व सेप्सिस से मृत्यु।" }
    ]
  },
  {
    id: "METRITIS",
    nameHi: "गर्भाशय शोथ / बच्चेदानी में मवाद (Metritis / Endometritis)",
    nameEn: "Acute Metritis / Endometritis",
    category: "BACTERIAL",
    tempRange: "मध्यम ज्वर (103-104°F)",
    cardinalSigns: "ब्याने के 5 से 20 दिन बाद योनि से अत्यधिक बदबूदार लाल-भूरा या मवादयुक्त गाढ़ा स्राव बहना; पीठ को धनुष की तरह मोड़कर जोर लगाना (Straining); दूध में भारी कमी व बार-बार पूंछ उठाना।",
    pregnancyAlert: "यह स्थिति गैर-गर्भवती (ब्याही हुई) में होती है। भविष्य में गर्भधारण सुनिश्चित करने हेतु गर्भाशय का पूर्ण उपचार अनिवार्य है। जेर खींचकर कभी न निकालें।",
    labTests: [
      { sNo: 1, testName: "गर्भाशय स्राव माइक्रोबायोलॉजी (Uterine Swab Culture)", sampleType: "कैथेटर द्वारा गर्भाशय से लिया गया मवाद", approxMrp: 550, tat: "48 घंटे", confirms: "Trueperella pyogenes / E. coli एवं संवेदनशील एंटीबायोटिक" },
      { sNo: 2, testName: "एंडोमेट्रियल साइटोलॉजी (Endometrial Cytology)", sampleType: "साइटोब्रश द्वारा गर्भाशय कोशिकाएं", approxMrp: 350, tat: "2 घंटे", confirms: "न्यूट्रोफिल प्रतिशत (>18% सबक्लिनिकल/क्लिनिकल शोथ पुष्ट करता है)" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "सिस्टमिक सेफलोस्पोरिन एंटीबायोटिक", generic: "Ceftiofur Sodium", ethicalBrand: "Xyrofur 1g / Naxcel", approxMrp: 480, doseRoute: "1g प्रति 400kg IM OD x 3-5 days (दूध में कोई विथड्रॉल नहीं)", pregnancySafety: "सुरक्षित (ब्याही गाय)", purpose: "गर्भाशय की गहरी पेशी परतों में जीवाणु संक्रमण का नाश" },
        { sNo: 2, category: "ल्यूटियोलाइटिक हार्मोन", generic: "Cloprostenol Sodium (PGF2alpha)", ethicalBrand: "Pragma / Vetmate 2ml", approxMrp: 280, doseRoute: "2 ml (500 mcg) Deep IM (ब्याने के 15-20 दिन बाद)", pregnancySafety: "गाभिन में वर्जित (अबॉर्शन कराता है)", purpose: "गर्भाशय का संकुचन कराकर अंदर भरा सारा मवाद बाहर फेंकना" },
        { sNo: 3, category: "दर्द व शोथ निवारक", generic: "Meloxicam", ethicalBrand: "Melonex", approxMrp: 120, doseRoute: "15 ml IM OD x 3 days", pregnancySafety: "सुरक्षित", purpose: "गर्भाशय ग्रीवा व पेल्विक दर्द में राहत" }
      ],
      oral: [
        { name: "हर्बल यूटेराइन टॉनिक", brand: "Exapar / Utrovet Liquid", dose: "100 ml सुबह-शाम", duration: "5-7 दिन", purpose: "गर्भाशय की सफाई, लोचिया निष्कासन व सामान्य आकार में लाना" }
      ],
      ayurvedic: [
        { name: "हल्दी, अजवाइन व सोंठ काढ़ा", ingredients: "50g हल्दी + 30g अजवाइन + 30g सोंठ + 250g पुराना गुड़", dose: "1 लीटर पानी में उबालकर गुनगुना रोज सुबह 5 दिन दें", purpose: "गर्भाशय का प्राकृतिक शोधन व शक्ति" }
      ],
      homeopathic: [
        { name: "Pulsatilla 200C + Sepia 200C + Sabina 200C", dose: "10-10 बूंद दिन में 3 बार", purpose: "गर्भाशय से गंदे स्राव का निष्कासन व सामान्य चक्र बहाली" }
      ],
      desiRemedies: [
        { name: "सफाई व पूंछ की नियमित धुलाई", preparation: "योनि मार्ग के बाहरी हिस्से व पूंछ को पोटाश (लाल दवा) के पानी से रोज धोएं ताकि मक्खियां न बैठें।", purpose: "बाहरी जीवाणुओं के पुनः प्रवेश की रोकथाम" }
      ]
    },
    stages: [
      { stage: 1, signs: "ब्याने के 5 दिन बाद योनि से हल्का बदबूदार मटमैला पानी, हल्का बुखार (103°F)।", recovery: "Exapar व Ceftiofur से 95% गर्भाशय पूर्ण शुद्ध।", deterioration: "मवाद का गर्भाशय में भरना शुरू।" },
      { stage: 2, signs: "गाढ़ा मवादयुक्त दुर्गंधित स्राव, पशु पूंछ उठाकर जोर लगाता है, दूध में 30% कमी।", recovery: "PGF2alpha + सिस्टमिक एंटीबायोटिक से 85% रिकवरी।", deterioration: "क्रोनिक पायोमेट्रा में परिवर्तन।" },
      { stage: 3, signs: "पायोमेट्रा (बच्चेदानी में 2-5 लीटर मवाद जमा होना, बंद मुंह), मद चक्र पूर्ण बंद (Anestrus)।", recovery: "PGF2alpha के 11 दिन के अंतर पर दो इंजेक्शन से 70% मवाद निकासी।", deterioration: "गर्भाशय की दीवार का फाइब्रोटिक होना।" },
      { stage: 4, signs: "स्थायी बांझपन (Permanent Infertility), सेप्टिक पेरिटोनिटिस, अत्यधिक दुर्बलता।", recovery: "प्रजनन क्षमता बहाल होना अत्यंत कठिन (<25%)।", deterioration: "सिस्टमिक सेप्सिस।" }
    ]
  },
  {
    id: "ROP",
    nameHi: "जेर का रुकना (Retained Placenta / ROP)",
    nameEn: "Retention of Fetal Membranes (ROP)",
    category: "BACTERIAL",
    tempRange: "सामान्य (101-102.5°F)",
    cardinalSigns: "ब्याने के 8 से 12 घंटे बीत जाने पर भी जेर (Avar/Placenta) का बाहर न गिरना; योनि से जेर का झूलना व सड़न की तीव्र दुर्गंध आना; पशु का बार-बार जोर लगाना।",
    pregnancyAlert: "चेतावनी: जेर को कभी भी हाथ डालकर जबरन न खींचें! इससे गर्भाशय के कोटिलेडन्स छिल जाते हैं, भयंकर रक्तस्राव, संक्रमण व स्थायी बांझपन हो जाता है।",
    labTests: [
      { sNo: 1, testName: "क्लिनिकल योनि परीक्षण (Vaginal Speculum Examination)", sampleType: "योनि मार्ग का प्रत्यक्ष दृश्य", approxMrp: 100, tat: "10 मिनट", confirms: "ग्रीवा (Cervix) में जेर के फंसे होने की पुष्टि" },
      { sNo: 2, testName: "रेक्टल पाल्पेशन (Transrectal Palpation)", sampleType: "रेक्टल परीक्षण", approxMrp: 100, tat: "5 मिनट", confirms: "गर्भाशय एटोनी व कोटिलेडन्स का न छूटना" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "गर्भाशय संकुचन हार्मोन", generic: "Cloprostenol Sodium (PGF2a) या Dinoprost", ethicalBrand: "Vetmate / Lutalyse 2ml", approxMrp: 280, doseRoute: "2 ml IM (ब्याने के 24 घंटे बाद)", pregnancySafety: "केवल ब्याने के बाद", purpose: "गर्भाशय में प्राकृतिक संकुचन पैदा कर जेर को ढीला करना" },
        { sNo: 2, category: "कैल्शियम टॉनिक", generic: "Calcium Levulinate / Gluconate", ethicalBrand: "Cal-Up / Mifex", approxMrp: 280, doseRoute: "200-300 ml IV/SC", pregnancySafety: "सुरक्षित", purpose: "मांसपेशियों की थकान दूर कर गर्भाशय एटोनी दूर करना" },
        { sNo: 3, category: "एंटीबायोटिक (संक्रमण रोकथाम)", generic: "Oxytetracycline LA", ethicalBrand: "Terramycin LA 200mg/ml", approxMrp: 260, doseRoute: "15-20 ml IM", pregnancySafety: "सुरक्षित", purpose: "जेर सड़ने से होने वाले सेप्सिस व बुखार की रोकथाम" }
      ],
      oral: [
        { name: "हर्बल जेर निष्कासक काढ़ा/सिरप", brand: "Exapar Liquid / Replanta Powder", dose: "100-200 ml ब्याने के तुरंत बाद, 4 घंटे बाद दोहराएं", duration: "3-5 दिन", purpose: "गर्भाशय टोन बढ़ाकर 12-24 घंटे में प्राकृतिक जेर गिराना" }
      ],
      ayurvedic: [
        { name: "बांस के पत्ते व गुड़ का काढ़ा", ingredients: "250g ताजे बांस के पत्ते + 20g सोंठ + 250g गुड़", dose: "1 लीटर पानी में उबालकर आधा करें, ब्याने के 6 घंटे बाद पिलाएं", purpose: "परंपरागत व वैज्ञानिक रूप से गर्भाशय संकुचन में सिद्ध" }
      ],
      homeopathic: [
        { name: "Sepia 200C + Sabina 200C + Pulsatilla 200C", dose: "10-10 बूंद हर 2 घंटे पर", purpose: "बिना हाथ लगाए जेर को प्राकृतिक रूप से अलग करना" }
      ],
      desiRemedies: [
        { name: "प्याली बांधना (वजन लटकाना वर्जित)", preparation: "जेर पर ईंट या भारी वजन कभी न बांधें। झूलती जेर को जमीन से 6 इंच ऊपर काट दें ताकि गंदगी न चिपके।", purpose: "गर्भाशय फटने व प्रोलैप्स से बचाव" }
      ]
    },
    stages: [
      { stage: 1, signs: "प्रसव के 8-12 घंटे बाद जेर बाहर लटक रही है, पशु सामान्य है।", recovery: "Exapar + PGF2a से 90% जेर स्वतः 24 घंटे में गिर जाती है।", deterioration: "जेर में जीवाणु सड़न शुरू होना।" },
      { stage: 2, signs: "24-48 घंटे: जेर से दुर्गंध आना, योनि से गंदा स्राव, हल्का बुखार (103°F), दूध घटना।", recovery: "सिस्टमिक एंटीबायोटिक व यूटेराइन टॉनिक से 80% रिकवरी।", deterioration: "मेट्राइटिस व टॉक्सिमिया का फैलाव।" },
      { stage: 3, signs: "48-72 घंटे: जेर के टुकड़े सड़कर गिरना, पशु चारा छोड़ना, आंखें धंसना।", recovery: "सघन एंटीबायोटिक व गर्भाशय शोधन से 65% रिकवरी।", deterioration: "गंभीर सेप्टिक एंडोमेट्राइटिस।" },
      { stage: 4, signs: "सेप्टीसीमिया, लैमिनाइटिस (खुरों में सूजन से न चल पाना), स्थायी बांझपन।", recovery: "प्रजनन क्षमता गंभीर प्रभावित (<35%)।", deterioration: "टॉक्सिक शॉक से मृत्यु संभव।" }
    ]
  },
  {
    id: "PROLAPSE",
    nameHi: "प्रोलैप्स / फूल-पाछा दिखाना (Vaginal / Uterine Prolapse)",
    nameEn: "Utero-Vaginal Prolapse",
    category: "BACTERIAL",
    tempRange: "सामान्य (101-102.5°F)",
    cardinalSigns: "योनि (Vaginal) या ब्याने के तुरंत बाद गर्भाशय (Uterine) का बड़ा लाल मांसल गोला बाहर निकल आना; पशु का लगातार खड़े रहकर या बैठकर भयंकर जोर लगाना (Straining)।",
    pregnancyAlert: "ब्याने से पूर्व (Vaginal) में प्रोजेस्टेरोन की कमी व कैल्शियम कमी मुख्य है। ब्याने के बाद (Uterine) आपातकालीन स्थिति है - रक्तस्राव से तुरंत मृत्यु हो सकती है।",
    labTests: [
      { sNo: 1, testName: "क्लिनिकल परीक्षण (Physical Inspection of Prolapsed Mass)", sampleType: "बाहर निकला मांसल भाग", approxMrp: 100, tat: "तत्काल", confirms: "अंग की पहचान (योनि या पूर्ण गर्भाशय कोटिलेडन्स सहित)" },
      { sNo: 2, testName: "सीरम कैल्शियम व फास्फोरस परीक्षण", sampleType: "सीरम", approxMrp: 300, tat: "2 घंटे", confirms: "हाइपोकैल्सीमिया (कैल्शियम कमी से पेल्विक लिगामेंट्स ढीले होना)" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "एपिड्यूरल एनेस्थीसिया (जोर बंद करने हेतु)", generic: "Lignocaine Hydrochloride 2%", ethicalBrand: "Lox 2% / Xylocaine", approxMrp: 60, doseRoute: "5-8 ml (First intercoccygeal space में Epidural Injection)", pregnancySafety: "सुरक्षित", purpose: "पशु का जोर लगाना (Straining) तुरंत बंद करना व दर्द निवारण" },
        { sNo: 2, category: "कैल्शियम इन्फ्यूजन", generic: "Calcium Borogluconate (CBG)", ethicalBrand: "Mifex 450ml", approxMrp: 340, doseRoute: "450 ml (आधा IV + आधा SC)", pregnancySafety: "सुरक्षित", purpose: "पेल्विक मांसपेशियों व गर्भाशय टोन की मजबूती" },
        { sNo: 3, category: "ब्रॉड स्पेक्ट्रम एंटीबायोटिक", generic: "Amoxicillin + Sulbactam", ethicalBrand: "Amoxirum Forte 3g/4.5g", approxMrp: 360, doseRoute: "3-4.5g IM OD x 3-5 days", pregnancySafety: "सुरक्षित", purpose: "गंदे बाहर निकले अंग में सेप्सिस व पेरिटोनिटिस की रोकथाम" },
        { sNo: 4, category: "एंटीस्पास्मोडिक", generic: "Valethamate Bromide या Dicyclomine", ethicalBrand: "Epidosin / Spasmo-vet", approxMrp: 110, doseRoute: "10 ml IM", pregnancySafety: "सावधानीपूर्वक", purpose: "मांसपेशी खिंचाव व ऐंठन शांत करना" }
      ],
      oral: [
        { name: "प्रोलैप्स रोधी आयुर्वेदिक पाउडर", brand: "Prolap-H / Prolacure Powder", dose: "50-100 ग्राम रोज गुड़ में मिलाकर", duration: "7-10 दिन", purpose: "पेल्विक लिगामेंट्स को मजबूत करना व जोर रोकना" }
      ],
      ayurvedic: [
        { name: "फिटकरी-बर्फ पानी से अंग सिकोड़ना", ingredients: "2% फिटकरी का ठंडा बर्फ का पानी", dose: "बाहर निकले अंग को धोने व सूजन कम करने हेतु", purpose: "अंग का आकार सिकोड़कर अंदर चढ़ाने योग्य बनाना" }
      ],
      homeopathic: [
        { name: "Podophyllum 200C + Sepia 200C + Aletris Farinosa 200C", dose: "10-10 बूंद हर 2 घंटे पर", purpose: "गर्भाशय ढीलापन व बार-बार फूल दिखाने की प्रवृत्ति पर रोक" }
      ],
      desiRemedies: [
        { name: "अंग को साफ चादर पर रखना व पिछला हिस्सा ऊंचा करना", preparation: "अंग को गोबर-मिट्टी से बचाने हेतु साफ गीली चादर पर रखें। पशु को पीछे से 1 फीट ढलान पर खड़ा करें।", purpose: "अंग फटने व रक्तस्राव से सुरक्षा" }
      ]
    },
    stages: [
      { stage: 1, signs: "पशु के बैठने पर योनि का छोटा गोला (क्रिकेट गेंद जैसा) बाहर दिखना, खड़े होने पर अंदर जाना।", recovery: "कैल्शियम + Prolap-H पाउडर से 90% बिना टांके ठीक।", deterioration: "गोले का आकार बड़ा होना।" },
      { stage: 2, signs: "खड़े होने पर भी अंग बाहर रहना, सूजन, लाली व पशु का लगातार जोर लगाना।", recovery: "धोकर अंदर करने व बुहनेर टांके (Buhner's Suture) से 85% सफलता।", deterioration: "अंग का छिलना व खून बहना।" },
      { stage: 3, signs: "ब्याने के तुरंत बाद पूरा गर्भाशय बाहर गिरना (Uterine Prolapse), भारी रक्तस्राव, सदमा।", recovery: "एपिड्यूरल देकर 1 घंटे के भीतर रिपोजिशन करने पर 75% रिकवरी।", deterioration: "गर्भाशय की रक्तवाहिनियां फटना।" },
      { stage: 4, signs: "अंग में कीड़े पड़ना, गैंग्रीन (काला पड़ना), फटने से आंतों का बाहर आ जाना।", recovery: "अंग उच्छेदन (Hysterectomy - <15% उत्तरजीविता)।", deterioration: "आंतरिक रक्तस्राव व हाइपोवोलेमिक शॉक से मृत्यु।" }
    ]
  },
  {
    id: "RABIES",
    nameHi: "रेबीज / हलकना (Rabies / Hydrophobia)",
    nameEn: "Bovine Rabies",
    category: "VIRAL",
    tempRange: "मध्यम ज्वर (103-104°F)",
    cardinalSigns: "असामान्य आक्रामक व्यवहार, रंभाने की आवाज में भारी बदलाव (बैल जैसी भारी भोंपू आवाज); मुंह से झागदार लार गिरना; पानी या चारा निगलने में असमर्थ (Choking); बार-बार पेशाब करना व अंत में पक्षाघात।",
    pregnancyAlert: "चेतावनी: रेबीज 100% घातक व जानलेवा जूनोटिक रोग है। लक्षण प्रकट होने के बाद कोई उपचार संभव नहीं है। संक्रमित पशु की लार से दूर रहें और तुरंत रिपोर्ट करें।",
    labTests: [
      { sNo: 1, testName: "प्रत्यक्ष फ्लोरोसेंट एंटीबॉडी परीक्षण (dFAT)", sampleType: "मरणोपरांत मस्तिष्क ऊतक (Hippocampus/Cerebellum)", approxMrp: 1200, tat: "24 घंटे", confirms: "रेबीज वायरल एंटीजन की 100% पुष्टिकरण (गोल्ड स्टैंडर्ड)" },
      { sNo: 2, testName: "नेग्री बॉडीज हिस्टोपैथोलॉजी (Negri Bodies)", sampleType: "मस्तिष्क बायोप्सी", approxMrp: 600, tat: "48 घंटे", confirms: "न्यूरॉन्स में विशिष्ट इंट्रासाइटोप्लाज्मिक इनक्लूजन बॉडीज" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "पोस्ट-एक्सपोजर प्रोphylaxis (काटने के तुरंत बाद)", generic: "Inactivated Rabies Veterinary Vaccine", ethicalBrand: "Raksharab / Nobivac Rabies", approxMrp: 180, doseRoute: "1 ml SC/IM (दिन 0, 3, 7, 14, 28 पर 5 टीके अनिवार्य)", pregnancySafety: "गाभिन में पूर्ण सुरक्षित व अनिवार्य", purpose: "पागल कुत्ते के काटने पर लक्षण प्रकट होने से पूर्व 100% बचाव" },
        { sNo: 2, category: "शामक (केवल अलगाव में)", generic: "Xylazine Hydrochloride", ethicalBrand: "Xylaxin", approxMrp: 190, doseRoute: "0.05-0.1 mg/kg IM", pregnancySafety: "वर्जित", purpose: "उग्र व आक्रामक पशु को शांत रखकर बांधना" }
      ],
      oral: [
        { name: "कोई ओरल दवा न दें", brand: "कोई नहीं", dose: "हाथ मुंह में न डालें", duration: "शून्य", purpose: "मानव में संक्रमण फैलने से बचाना" }
      ],
      ayurvedic: [
        { name: "घाव की तत्काल साबुन से धुलाई", ingredients: "कारबोलिक साबुन (Lifebuoy) व बहता पानी", dose: "काटने के स्थान को 15 मिनट तक लगातार धोएं", purpose: "70% से अधिक वायरस को सतह पर ही नष्ट करना" }
      ],
      homeopathic: [
        { name: "Hydrophobinum 200C (केवल पोस्ट-बाइट रोकथाम)", dose: "10 बूंद काटने के तुरंत बाद", purpose: "पारंपरिक पूरक उपाय (वैक्सीन का विकल्प नहीं)" }
      ],
      desiRemedies: [
        { name: "आइसोलेशन व सुरक्षा", preparation: "पशु को मजबूत लोहे के खूंटे से अलग कमरे में बांधें। किसी भी व्यक्ति या अन्य पशु को संपर्क में न आने दें।", purpose: "मानव जीवन रक्षा" }
      ]
    },
    stages: [
      { stage: 1, signs: "व्यवहार में बदलाव, बार-बार पेशाब करना, कान खड़े रखना, हल्की लार।", recovery: "लक्षण आने के बाद 0% रिकवरी (असाध्य)।", deterioration: "उत्तेजना व रंभाना शुरू होना।" },
      { stage: 2, signs: "उग्र रूप (Furious Form): जोर-जोर से रंभाना, खूंटा तोड़ना, दीवारों पर सिर मारना, पानी न पी पाना।", recovery: "कोई उपचार नहीं।", deterioration: "पक्षाघात की शुरुआत।" },
      { stage: 3, signs: "मूक रूप (Dumb Form): मुंह खुला रहना, जीभ बाहर, लार का निरंतर गिरना, पिछले पैरों का लकवा।", recovery: "कोई उपचार नहीं।", deterioration: "पूर्ण पक्षाघात।" },
      { stage: 4, signs: "पशु का गिर पड़ना, कोमा, श्वसन तंत्र का पक्षाघात।", recovery: "असाध्य।", deterioration: "लक्षण शुरू होने के 3 से 7 दिन के भीतर 100% मृत्यु।" }
    ]
  },
  {
    id: "TETANUS",
    nameHi: "धनुस्तंभ / टिटनेस (Tetanus / Lockjaw)",
    nameEn: "Bovine Tetanus",
    category: "BACTERIAL",
    tempRange: "मध्यम ज्वर (103-104°F)",
    cardinalSigns: "जबड़े का पूरी तरह लॉक हो जाना (Lockjaw); तीसरी पलक (Nictitating Membrane) का आंख पर चढ़ना; संपूर्ण शरीर की लकड़ी जैसी कठोरता (Wooden Horse Posture); पूंछ का हवा में तन जाना।",
    pregnancyAlert: "टिटनेस टॉक्साइड (Tetanus Toxoid) गाभिन पशुओं में पूर्णतः सुरक्षित है। घाव की गहरी सफाई व हाइड्रोजन पेरोक्साइड फ्लशिंग अनिवार्य है।",
    labTests: [
      { sNo: 1, testName: "घाव स्मीयर ग्राम स्टेन (Gram Stain of Wound Exudate)", sampleType: "घाव की गहराई से स्राव", approxMrp: 150, tat: "30 मिनट", confirms: "Clostridium tetani (Drumstick shaped Gram-positive sporulating rods)" },
      { sNo: 2, testName: "क्लिनिकल तीसरी पलक फ्लिक टेस्ट (Third Eyelid Test)", sampleType: "शारीरिक परीक्षण", approxMrp: 50, tat: "तत्काल", confirms: "सिर उठाने पर तीसरी पलक का अचानक आंख पर झूलना" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "टिटनेस एंटीटॉक्सिन (TAT)", generic: "Tetanus Antitoxin (Equine)", ethicalBrand: "TAT 10,000 - 50,000 IU", approxMrp: 650, doseRoute: "20,000-50,000 IU IV/IM (तुरंत एकल डोज़)", pregnancySafety: "सुरक्षित", purpose: "रक्त में अप्रसारित टेटानोस्पास्मिन टॉक्सिन का निष्प्रभावीकरण" },
        { sNo: 2, category: "उच्च डोज़ पेनिसिलिन", generic: "Crystalline Penicillin G Sodium", ethicalBrand: "Penicillin G 40 Lac IU", approxMrp: 150, doseRoute: "20,000 IU/kg IV/IM QID x 5 days", pregnancySafety: "सुरक्षित", purpose: "घाव में जीवित टिटनेस जीवाणुओं का खात्मा" },
        { sNo: 3, category: "मांसपेशी शिथिलक व शामक", generic: "Diazepam / Chlorpromazine", ethicalBrand: "Valium / Largactil", approxMrp: 140, doseRoute: "बड़ा पशु: 10-20 ml IM", pregnancySafety: "सावधानीपूर्वक", purpose: "असह्य मांसपेशियों की अकड़न व आक्षेप शांत करना" }
      ],
      oral: [
        { name: "इलेक्ट्रोलाइट्स व तरल ग्लूकोज", brand: "Electral Energy", dose: "ओरल ट्यूब द्वारा (यदि जबड़ा हल्का खुले)", duration: "4 दिन", purpose: "डिहाइड्रेशन व भुखमरी से बचाव" }
      ],
      ayurvedic: [
        { name: "घाव की हाइड्रोजन पेरोक्साइड व पोटाश से सफाई", ingredients: "H2O2 3% + टिंचर आयोडीन", dose: "घाव को खुरचकर गहराई तक रोगाणुमुक्त करना", purpose: "एनारोबिक वातावरण समाप्त करना" }
      ],
      homeopathic: [
        { name: "Hypericum 200C + Nux Vomica 200C + Ledum Pal 200C", dose: "10-10 बूंद दिन में 4 बार", purpose: "तंत्रिका आघात, अकड़न व टेटैनिक स्पाज्म में राहत" }
      ],
      desiRemedies: [
        { name: "अंधेरे व शांत कमरे में रखना", preparation: "पशु को शोर-शराबे व तेज रोशनी से दूर बिल्कुल शांत व अंधेरे बाड़े में सूखी पराली पर रखें।", purpose: "रोशनी व आवाज से आने वाले दौरों की रोकथाम" }
      ]
    },
    stages: [
      { stage: 1, signs: "जबड़े में हल्का कड़ापन, चबाने में कठिनाई, तीसरी पलक का हल्का दिखना।", recovery: "TAT + पेनिसिलिन से 70-80% रिकवरी संभव।", deterioration: "शरीर की अकड़न का फैलना।" },
      { stage: 2, signs: "Lockjaw (जबड़ा पूर्ण बंद), कान खड़े, पूंछ तनी हुई, चाल लकड़ी जैसी कठोर।", recovery: "शामक दवाओं व गहन आईसीयू से 40-50% रिकवरी।", deterioration: "दौरे (Tetanic Spasms) पड़ना।" },
      { stage: 3, signs: "हल्की आवाज पर पूरे शरीर में भयंकर अकड़न, गिर पड़ना, सांस लेने में कष्ट।", recovery: "अत्यंत कठिन (<20% सफलता)।", deterioration: "श्वास पेशियों का पक्षाघात।" },
      { stage: 4, signs: "लगातार ऐंठन, हाइपरथर्मिया (108°F), रेस्पिरेटरी अरेस्ट।", recovery: "असाध्य।", deterioration: "दम घुटने व हार्ट फेल्योर से मृत्यु।" }
    ]
  },
  {
    id: "FOOT_ROT",
    nameHi: "खुर सड़न / पूति खुर (Foot Rot / Infectious Pododermatitis)",
    nameEn: "Infectious Pododermatitis (Foot Rot)",
    category: "BACTERIAL",
    tempRange: "मध्यम ज्वर (103-104°F)",
    cardinalSigns: "खुरों के बीच (Interdigital space) तीव्र सड़ांध व दुर्गंधयुक्त मवाद; खुर के ऊपर कोरोनरी बैंड में सूजन; पशु का एक पैर उठाकर खड़े रहना व अत्यधिक लंगड़ाना।",
    pregnancyAlert: "खुर की ड्रेसिंग व कॉपर सल्फेट फुट-बाथ गाभिन में पूर्ण सुरक्षित है। एंटीबायोटिक में एमोक्सीसिलीन या सेफ्टिओफर का प्रयोग सुरक्षित है।",
    labTests: [
      { sNo: 1, testName: "खुर स्राव स्मीयर ग्राम स्टेन (Gram Stain of Exudate)", sampleType: "खुरों के बीच से मवाद/स्राव", approxMrp: 120, tat: "30 मिनट", confirms: "Fusobacterium necrophorum एवं Dichelobacter nodosus" },
      { sNo: 2, testName: "अल्ट्रासाउंड / एक्स-रे (गंभीर मामलों में)", sampleType: "खुर का जोड़", approxMrp: 500, tat: "1 घंटा", confirms: "गहरी हड्डियों व जोड़ों में सेप्टिक आर्थराइटिस की जांच" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "लॉन्ग एक्टिंग एंटीबायोटिक", generic: "Oxytetracycline LA 200mg/ml", ethicalBrand: "Terramycin LA / Oxyvet LA", approxMrp: 260, doseRoute: "20 mg/kg Deep IM (1 ml प्रति 10 kg)", pregnancySafety: "सावधानीपूर्वक सुरक्षित", purpose: "फ्यूजोबैक्टीरियम जीवाणु का ऊतकों से विनाश" },
        { sNo: 2, category: "वैकल्पिक सेफलोस्पोरिन", generic: "Ceftiofur Sodium", ethicalBrand: "Xyrofur 1g", approxMrp: 480, doseRoute: "1g प्रति 400kg IM OD x 3 days", pregnancySafety: "सुरक्षित", purpose: "तीव्र जीवाणुनाशक प्रभाव बिना दूध रोके" },
        { sNo: 3, category: "दर्द व सूजन निवारक", generic: "Flunixin Meglumine या Meloxicam", ethicalBrand: "Melonex Plus", approxMrp: 140, doseRoute: "15 ml IM OD x 3 days", pregnancySafety: "सुरक्षित", purpose: "खुर के भयंकर दर्द व लंगड़ेपन में त्वरित राहत" }
      ],
      oral: [
        { name: "जिंक व बायोटीन सप्लीमेंट", brand: "Zinpro / Biotin Bolus", dose: "1 बोलस प्रतिदिन", duration: "15 दिन", purpose: "खुर के हॉर्न ऊतक को मजबूत करना व पुनरावृत्ति रोकना" }
      ],
      ayurvedic: [
        { name: "कॉपर सल्फेट (नीला थोथा) फुट बाथ", ingredients: "5% कॉपर सल्फेट (CuSO4) या 10% जिंक सल्फेट घोल", dose: "खुरों को 5 मिनट तक डुबोकर रखना (दिन में 1 बार)", purpose: "खुरों की सड़ांध का संपूर्ण खात्मा" },
        { name: "हर्बल एंटीसेप्टिक स्प्रे", brand: "Topicure Spray / Scavon", dose: "साफ खुर पर दिन में 2 बार", purpose: "मक्खियों व कीड़ों से सुरक्षा" }
      ],
      homeopathic: [
        { name: "Silicea 200C + Hepar Sulph 200C", dose: "10-10 बूंद दिन में 3 बार", purpose: "सड़ी मवाद को बाहर निकालकर घाव तेजी से भरना" }
      ],
      desiRemedies: [
        { name: "नीम तेल व कपूर मरहम", preparation: "100ml नीम का तेल + 20g बारीक पिसा देशी कपूर मिलाकर खुरों के बीच लगाएं और पट्टी बांधें।", purpose: "घाव शोधन व दर्द शमन" }
      ]
    },
    stages: [
      { stage: 1, signs: "खुरों के बीच लाली, हल्की सूजन, चलने में लंगड़ाना, कोई बदबू नहीं।", recovery: "कॉपर सल्फेट फुट-बाथ से 95% पशु 3 दिन में ठीक।", deterioration: "उपकला टूटना व मवाद पड़ना।" },
      { stage: 2, signs: "गंभीर सड़ांध, तीखी दुर्गंध, कोरोनरी बैंड तक सूजन, पशु 3 पैरों पर खड़ा।", recovery: "Oxytetracycline LA व ड्रेसिंग से 85-90% रिकवरी।", deterioration: "संक्रमण का खुर के गहरे जोड़ों में जाना।" },
      { stage: 3, signs: "खुर का खोल ढीला होना, जोड़ों में मवाद (Septic Arthritis), तेज बुखार।", recovery: "शल्य चिकित्सा (Debridement) से 60% रिकवरी।", deterioration: "हड्डी का सड़ना (Osteomyelitis)।" },
      { stage: 4, signs: "स्थायी विकलांगता, खुर का नष्ट होना, क्रोनिक दुर्बलता।", recovery: "डिजिट विच्छेदन (Claw Amputation - 50% सफलता)।", deterioration: "सिस्टमिक सेप्टीसीमिया।" }
    ]
  },
  {
    id: "PPH",
    nameHi: "फास्फोरस कमी लाल पेशाब (Post-Parturient Hemoglobinuria - PPH)",
    nameEn: "Post-Parturient Hemoglobinuria (PPH)",
    category: "METABOLIC",
    tempRange: "सामान्य (101-102.5°F)",
    cardinalSigns: "ब्याने के 2 से 4 सप्ताह बाद गहरे कॉफी/लाल रंग का पेशाब आना; कोई बुखार नहीं (तापमान सामान्य या कम); अत्यधिक कमजोरी; आंखों का सफेद पड़ना (गंभीर एनीमिया) व गोबर सूखा।",
    pregnancyAlert: "यह ताजा ब्याही अधिक दूध देने वाली भैंसों व गायों में होता है। बबेशिया से अलग पहचान जरूरी है (बबेशिया में 105°F बुखार होता है, PPH में बुखार नहीं होता)।",
    labTests: [
      { sNo: 1, testName: "सीरम इनऑर्गेनिक फास्फोरस स्तर (Serum Inorganic Phosphorus)", sampleType: "सीरम (Plain Tube)", approxMrp: 180, tat: "1 घंटा", confirms: "फास्फोरस <1.5 mg/dl (सामान्य: 4-7 mg/dl)" },
      { sNo: 2, testName: "ब्लड स्मीयर परीक्षण (Thin Blood Smear)", sampleType: "रक्त", approxMrp: 150, tat: "30 मिनट", confirms: "बबेशिया परजीवी की अनुपस्थिति (Negative for Hemoprotozoa)" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "अकार्बनिक फास्फोरस थेरेपी", generic: "Sodium Acid Phosphate 40.3%", ethicalBrand: "Urifos / Tonophosphan Forte", approxMrp: 280, doseRoute: "60-80g Sodium Acid Phosphate पाउडर को 500ml डिस्टिल्ड वाटर में घोलकर IV + 10 ml Tonophosphan IM", pregnancySafety: "सुरक्षित", purpose: "आरबीसी की झिल्ली को स्थिर कर हीमोलाइसिस तुरंत रोकना" },
        { sNo: 2, category: "सहयोगी फास्फोरस इंजेक्शन", generic: "Toldimphos Sodium", ethicalBrand: "Tonophosphan", approxMrp: 260, doseRoute: "15-20 ml IM/IV OD x 3 days", pregnancySafety: "सुरक्षित", purpose: "कोशिकीय ऊर्जा (ATP) उत्पादन बहाली" },
        { sNo: 3, category: "एंटीऑक्सीडेंट व आरबीसी रक्षक", generic: "Ascorbic Acid (Vitamin C)", ethicalBrand: "Redoxon / C-Vet", approxMrp: 140, doseRoute: "20-30 ml IV/IM", pregnancySafety: "सुरक्षित", purpose: "आरबीसी को ऑक्सीडेटिव स्ट्रेस से बचाना" },
        { sNo: 4, category: "आयरन व विटामिन B12", generic: "Iron Dextran", ethicalBrand: "Feritas", approxMrp: 220, doseRoute: "10 ml IM alternate day", pregnancySafety: "सुरक्षित", purpose: "गंभीर एनीमिया से उबरना" }
      ],
      oral: [
        { name: "सोडियम एसिड फास्फोरस पाउडर", brand: "Urifos Powder / Phos-Vet", dose: "60 ग्राम सुबह-शाम पानी में", duration: "4-5 दिन", purpose: "रक्त में फास्फोरस का स्तर बनाए रखना" }
      ],
      ayurvedic: [
        { name: "आंवला व गन्ने का गुड़ शर्बत", ingredients: "100g सूखा आंवला चूर्ण + 250g गुड़ + 2 लीटर पानी", dose: "दिन में 2 बार पिलाएं", purpose: "प्राकृतिक विटामिन सी व ऊर्जा संबल" }
      ],
      homeopathic: [
        { name: "Phosphorus 200C + China 200C", dose: "10-10 बूंद दिन में 4 बार", purpose: "लाल पेशाब रोकने व रक्त अल्पता सुधार में अचूक" }
      ],
      desiRemedies: [
        { name: "गोभी, बरसीम व क्रूसिफेरस चारे बंद करना", preparation: "सरसों, राया, गोभी व अत्यधिक बरसीम तुरंत बंद करें। सूखा गेहूं का भूसा व चोकर दें।", purpose: "ऑक्सीडेंट युक्त चारे का परित्याग" }
      ]
    },
    stages: [
      { stage: 1, signs: "पेशाब हल्का लाल/गुलाबी, दूध में कमी, तापमान सामान्य (101.5°F), जुगाली सामान्य।", recovery: "सोडियम एसिड फास्फेट IV से 95% पशु 24 घंटे में स्वस्थ।", deterioration: "आरबीसी का व्यापक टूटना।" },
      { stage: 2, signs: "पेशाब गहरा कॉफी जैसा, आंखें सफेद, दिल की धड़कन तेज, सांस फूलना।", recovery: "Urifos IV + ओरल फास्फेट से 80-85% रिकवरी।", deterioration: "हीमोग्लोबिन 4 g/dl से नीचे गिरना।" },
      { stage: 3, signs: "पशु का बैठ जाना, उठने में असमर्थ, कान ठंडे, पीलिया के लक्षण।", recovery: "रक्त आधान (Blood Transfusion) + IV से 50% रिकवरी।", deterioration: "एनीमिक एनोक्सिया।" },
      { stage: 4, signs: "गंभीर सांस कष्ट, कोमा, सबटर्मिनल कार्डियक अरेस्ट।", recovery: "असाध्य (<10%)।", deterioration: "ऑक्सीजन की कमी से मृत्यु।" }
    ]
  },
  {
    id: "CALF_SCOURS",
    nameHi: "बछड़ों का सफेद दस्त (Calf Scours / Colibacillosis)",
    nameEn: "Calf Scours / Colibacillosis",
    category: "BACTERIAL",
    tempRange: "मध्यम ज्वर (103-104°F)",
    cardinalSigns: "नवजात बछड़े/कटड़े (1 से 14 दिन) में सफेद, पीला या मटमैला पानी जैसा पतला दस्त; अत्यधिक दुर्गंध; आंखें अंदर धंस जाना व त्वचा का खिंचाव खत्म होना (Severe Dehydration); खड़े न हो पाना।",
    pregnancyAlert: "नवजात शिशु रोग है। गाय/भैंस को ब्याने से पूर्व संतुलित आहार व बछड़े को जन्म के 2 घंटे में खीस (Colostrum) पिलाना ही सर्वोत्तम रोकथाम है।",
    labTests: [
      { sNo: 1, testName: "मल कल्चर व संवेदनशीलता (Fecal Culture & ABST)", sampleType: "ताजा दस्त/मल का स्वैब", approxMrp: 450, tat: "24-48 घंटे", confirms: "E. coli (ETEC K99) / Salmonella / Rotavirus की पुष्टि" },
      { sNo: 2, testName: "रक्त इलेक्ट्रोलाइट व ग्लूकोज स्तर", sampleType: "रक्त", approxMrp: 200, tat: "1 घंटा", confirms: "गंभीर मेटाबॉलिक एसिडोसिस व हाइपोग्लाइसीमिया" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "एंटीबायोटिक", generic: "Amikacin Sulfate या Cefotaxime", ethicalBrand: "Amicin 250mg / Cefotax", approxMrp: 90, doseRoute: "बछड़ा: 5-7 mg/kg IM BID x 3 days", pregnancySafety: "सुरक्षित (बछड़ा)", purpose: "सिस्टमिक ई. कोली सेप्टीसीमिया का विनाश" },
        { sNo: 2, category: "आईवी इलेक्ट्रोलाइट व फ्लुइड्स", generic: "Ringers Lactate (RL) + 5% Dextrose", ethicalBrand: "RL + DNS (1:1 ratio)", approxMrp: 120, doseRoute: "1-2 लीटर धीमा IV (गर्म करके गुनगुना)", pregnancySafety: "सुरक्षित", purpose: "घातक निर्जलीकरण व एसिडोसिस की तत्काल भरपाई" },
        { sNo: 3, category: "एंटीस्पास्मोडिक व दर्द निवारक", generic: "Dicyclomine", ethicalBrand: "Spasmo-vet", approxMrp: 60, doseRoute: "बछड़ा: 2-3 ml IM", pregnancySafety: "सुरक्षित", purpose: "पेट मरोड़ शांत करना" }
      ],
      oral: [
        { name: "ओआरएस इलेक्ट्रोलाइट घोल", brand: "Electral / Prolyte Powder", dose: "1 पैकेट 1 लीटर उबले गुनगुने पानी में, 200ml हर 2 घंटे पर", duration: "3 दिन", purpose: "आंतों से पानी व लवणों का निरंतर अवशोषण" },
        { name: "एंटीडायरियाल बोलस/सस्पेंशन", brand: "Diarest O / Neblon Suspension", dose: "10-15 ml दिन में 2 बार", duration: "3 दिन", purpose: "दस्त रोकना व आंतों की परत की रक्षा" }
      ],
      ayurvedic: [
        { name: "कच्चे बेल का गूदा व ईसबगोल की भूसी", ingredients: "10g बेल गूदा + 5g ईसबगोल 100ml छाछ में", dose: "दिन में 2 बार पिलाएं", purpose: "प्राकृतिक ग्राही व दस्त रोधी" }
      ],
      homeopathic: [
        { name: "Podophyllum 200C + Arsenicum Album 200C + Chamomilla 200C", dose: "5-5 बूंद दिन में 4 बार", purpose: "सफेद पानी जैसे दस्त व पेट मरोड़ में रामबाण" }
      ],
      desiRemedies: [
        { name: "दूध की मात्रा आधी करना व गर्म रखना", preparation: "दस्त के दौरान मां का दूध आधा करें, गुनगुना ओआरएस घोल बढ़ाएं। बछड़े को गर्म सूखी बोरी पर रखें।", purpose: "अपच रोकना व शारीरिक गर्मी बनाए रखना" }
      ]
    },
    stages: [
      { stage: 1, signs: "बछड़ा सुस्त, पतला पीला दस्त, दूध पीने की इच्छा कम, आंखें सामान्य।", recovery: "ओआरएस + ओरल एंटीबायोटिक से 95% बछड़े 24 घंटे में ठीक।", deterioration: "पानी जैसे सफेद दस्त व डिहाइड्रेशन।" },
      { stage: 2, signs: "आंखें अंदर धंसी हुई, त्वचा चिपकना (Skin tenting >3 sec), खड़े होने में असमर्थ।", recovery: "IV फ्लुइड्स + एमिकैसिन से 80-85% रिकवरी।", deterioration: "एसिडोसिस व कोमा की शुरुआत।" },
      { stage: 3, signs: "पशु करवट लेट जाना, मुंह ठंडा, चूसने का रिफ्लेक्स पूर्ण बंद, गंभीर हाइपोथर्मिया।", recovery: "सघन आईवी बाईकार्बोनेट व डेक्सट्रोज से 40-50% रिकवरी।", deterioration: "सेप्टिक शॉक।" },
      { stage: 4, signs: "अचेत अवस्था, नाड़ी गायब, श्वांस मंद।", recovery: "अत्यंत संकटपूर्ण (<10%)।", deterioration: "इलेक्ट्रोलाइट असंतुलन व कार्डियक अरेस्ट से मृत्यु।" }
    ]
  },
  {
    id: "COCCIDIOSIS",
    nameHi: "खूनी पेचिश / कॉक्सीडियोसिस (Bovine Coccidiosis)",
    nameEn: "Bovine Coccidiosis (Red Diarrhea)",
    category: "PARASITIC",
    tempRange: "मध्यम ज्वर (103-104°F)",
    cardinalSigns: "बछड़ों या वयस्क पशुओं में खूनी आंवयुक्त बदबूदार पतला दस्त (Blood clots & mucus in dung); लगातार उठक-बैठक व पूंछ उठाकर दर्दनाक जोर लगाना (Tenesmus); गुदा मार्ग का बाहर दिखना।",
    pregnancyAlert: "एम्प्रोलियम (Amprolium) व सल्फा दवाएं गाभिन पशुओं में निर्धारित मात्रा में सुरक्षित हैं। अत्यधिक निर्जलीकरण में गर्भपात रोकने हेतु फ्लुइड थेरेपी दें।",
    labTests: [
      { sNo: 1, testName: "मल फ्लोटेशन परीक्षण (Fecal Flotation for Oocysts)", sampleType: "ताजा मल", approxMrp: 120, tat: "30 मिनट", confirms: "Eimeria bovis / Eimeria zuernii ओसिस्ट्स की भारी संख्या" },
      { sNo: 2, testName: "पीसीवी व कुल प्रोटीन (PCV & Total Protein)", sampleType: "रक्त", approxMrp: 180, tat: "1 घंटा", confirms: "रक्तस्राव जनित एनीमिया व हाइपोप्रोटीनेमिया" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "सल्फोनामाइड एंटीबैक्टीरियल/एंटीकॉक्सीडियल", generic: "Sulphadimidine Sodium 33.3%", ethicalBrand: "Vetoquinol Sulpha / Diadin", approxMrp: 180, doseRoute: "100 mg/kg IV/SC (30 ml प्रति 100 kg प्रथम दिन, फिर आधी मात्रा 3 दिन)", pregnancySafety: "सावधानीपूर्वक", purpose: "आंतों में कॉक्सीडिया परजीवी व द्वितीयक जीवाणुओं का नाश" },
        { sNo: 2, category: "रक्तस्राव रोधक (हीमोस्टैटिक)", generic: "Ethamsylate / Botropase", ethicalBrand: "Botropase / Pause", approxMrp: 140, doseRoute: "10 ml IM/IV", pregnancySafety: "सुरक्षित", purpose: "आंतों से हो रहे रक्तस्राव को तुरंत थामना" },
        { sNo: 3, category: "विटामिन K व B-Complex", generic: "Vitamin K3 + B-Complex", ethicalBrand: "K-Vet / Belamyl", approxMrp: 110, doseRoute: "10 ml IM", pregnancySafety: "सुरक्षित", purpose: "रक्त का थक्का जमाना व आंतों की मरम्मत" }
      ],
      oral: [
        { name: "विशिष्ट एंटीकॉक्सीडियल पाउडर/सॉल्यूशन", brand: "Amprolium Powder (Amprol 20%)", dose: "10 mg/kg b.wt पानी में घोलकर रोज", duration: "5 दिन", purpose: "कॉक्सीडिया के थियामिन उपापचय को रोककर खात्मा" }
      ],
      ayurvedic: [
        { name: "अनारदाना, बेलगिरी व ईसबगोल", ingredients: "50g अनार के छिलके का चूर्ण + 30g कच्चा बेल फल + 20g ईसबगोल", dose: "छाछ में मिलाकर दिन में 2 बार पिलाएं", purpose: "प्राकृतिक स्तंभक व खूनी आंव शांत करना" }
      ],
      homeopathic: [
        { name: "Merc Cor 200C + Ipecac 200C + Hamamelis 200C", dose: "10-10 बूंद दिन में 4 बार", purpose: "खूनी दस्त, भयंकर मरोड़ व गुदा जोर लगाने में चमत्कारी" }
      ],
      desiRemedies: [
        { name: "खट्टी छाछ व फिटकरी घोल", preparation: "500ml खट्टी छाछ में 5g भुनी फिटकरी मिलाकर पिलाएं। बाड़े को सूखा व चूना छिड़ककर रखें।", purpose: "आंतों की सड़ांध रोकना व ओसिस्ट्स नियंत्रण" }
      ]
    },
    stages: [
      { stage: 1, signs: "गोबर में हल्का खून व श्लेष्मा (आंव), हल्का बुखार, सुस्ती, चारा कम।", recovery: "एम्प्रोलियम व सल्फा से 95% पशु 48 घंटे में ठीक।", deterioration: "आंतों की दीवारों का व्यापक छिलना।" },
      { stage: 2, signs: "लगातार खूनी दस्त, खून के थक्के गिरना, पशु पूंछ उठाकर भयंकर जोर लगाता है।", recovery: "सल्फोनामाइड + हीमोस्टैटिक से 80-85% रिकवरी।", deterioration: "गंभीर एनीमिया व डिहाइड्रेशन।" },
      { stage: 3, signs: "कमजोरी से बैठ जाना, आंखें सफेद, गुदा का बाहर निकलना (Rectal Prolapse), निर्जलीकरण।", recovery: "आईवी फ्लुइड्स व रक्तस्राव नियंत्रण से 50-60% रिकवरी।", deterioration: "इंटेस्टाइनल परफोरेशन।" },
      { stage: 4, signs: "हाइपोथर्मिया, अत्यधिक रक्त क्षय, आंतों का फटना, अचेतावस्था।", recovery: "असाध्य (<15%)।", deterioration: "हाइपोवोलेमिक शॉक व सेप्सिस से मृत्यु।" }
    ]
  },
  {
    id: "FASCIOLIASIS",
    nameHi: "यकृत कृमि रोग / लिवर फ्लूक (Fascioliasis / Liver Fluke)",
    nameEn: "Fascioliasis (Liver Fluke Disease)",
    category: "PARASITIC",
    tempRange: "सामान्य (101-102.5°F)",
    cardinalSigns: "निचले जबड़े के नीचे पानी जैसी नरम सूजन (Bottle Jaw); पेट का लटक जाना व पानी भरना (Ascites); गंभीर एनीमिया (सफेद आंखें); क्रोनिक बदबूदार पतला दस्त व अत्यधिक दुर्बलता।",
    pregnancyAlert: "चेतावनी: एल्बेंडाजोल (Albendazole) गाभिन के प्रथम 45 दिनों में पूर्णतः वर्जित है (भ्रूण विकृति कारक)। ऑक्सीक्लोजनाइड (Oxyclozanide) गाभिन में 100% सुरक्षित है।",
    labTests: [
      { sNo: 1, testName: "मल अवसादन परीक्षण (Fecal Sedimentation Test)", sampleType: "ताजा गोबर", approxMrp: 120, tat: "30 मिनट", confirms: "Fasciola gigantica के भारी ऑपरकुलेटेड (Operculated) अंडे" },
      { sNo: 2, testName: "सीरम लिवर एंजाइम (GGT & AST)", sampleType: "सीरम", approxMrp: 300, tat: "2 घंटे", confirms: "बाइल डक्ट में क्षति व गंभीर हेपेटिक फाइब्रोसिस" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "लिवर फ्लूक नाशक इंजेक्शन", generic: "Nitroxynil 34%", ethicalBrand: "Fluconix-34 / Dovenix", approxMrp: 380, doseRoute: "10 mg/kg SC (1 ml प्रति 35 kg b.wt)", pregnancySafety: "सावधानीपूर्वक सुरक्षित", purpose: "वयस्क व अवयस्क फैसियोला यकृत कृमियों का संपूर्ण विनाश" },
        { sNo: 2, category: "आयरन व लिवर इंजेक्शन", generic: "Iron Dextran + Liver Extract", ethicalBrand: "Feritas + Belamyl", approxMrp: 280, doseRoute: "10 ml प्रत्येक IM सप्ताह में 2 बार", pregnancySafety: "सुरक्षित", purpose: "गंभीर एनीमिया व क्षतिग्रस्त यकृत की पुनर्स्थापना" }
      ],
      oral: [
        { name: "सुरक्षित ओरल फ्लूकनाशक", brand: "Zanil / Distodin (Oxyclozanide 3%)", dose: "10-15 mg/kg b.wt (100-150 ml ओरल)", duration: "एकल डोज़ (3 सप्ताह बाद दोहराएं)", purpose: "गर्भावस्था में 100% सुरक्षित फ्लूक व टेपवर्म का खात्मा" },
        { name: "ट्राईक्लाबेन्डाजोल (सभी अवस्थाओं हेतु)", brand: "Fasinex (Triclabendazole 5%)", dose: "12 mg/kg b.wt ओरल", duration: "एकल डोज़", purpose: "प्रारंभिक अवयस्क (Early immature) व वयस्क दोनों फ्लूक पर अचूक" }
      ],
      ayurvedic: [
        { name: "वायविडंग व कालमेघ चूर्ण", ingredients: "30g वायविडंग + 20g कालमेघ + 50g गुड़", dose: "दिन में 1 बार 5 दिन तक दें", purpose: "प्राकृतिक यकृत कृमिनाशक व लिवर टॉनिक" }
      ],
      homeopathic: [
        { name: "Lycopodium 200C + Chelidonium 200C + China 200C", dose: "10-10 बूंद दिन में 3 बार", purpose: "यकृत की सूजन, बॉटल जॉ व दुर्बलता में लाभ" }
      ],
      desiRemedies: [
        { name: "जलभराव वाले तालाबों से दूरी", preparation: "नहरों, गड्ढों व जलकुंभी वाले क्षेत्रों में पशुओं को न चरने दें (जहाँ घोंघे/Lymnaea snails रहते हैं)।", purpose: "संक्रमण चक्र का विच्छेद" }
      ]
    },
    stages: [
      { stage: 1, signs: "चारा कम खाना, हल्का पीलापन, सुस्ती, दूध उत्पादन में 20% गिरावट।", recovery: "Oxyclozanide से 95% फ्लूक समाप्त व पूर्ण स्वस्थ।", deterioration: "यकृत में कृमियों का सुरंग बनाना।" },
      { stage: 2, signs: "आंखें बिल्कुल सफेद, जबड़े के नीचे पानी जैसी सूजन (Bottle Jaw), पतला बदबूदार दस्त।", recovery: "फ्लूकनाशक + आयरन टॉनिक से 85% रिकवरी।", deterioration: "यकृत फाइब्रोसिस व पित्त नली का कड़ा होना।" },
      { stage: 3, signs: "पेट में भारी पानी (Ascites), हड्डियां दिखना, पशु का बैठ जाना, उठने में असमर्थ।", recovery: "सघन चिकित्सीय देखरेख व लिवर टॉनिक से 50% रिकवरी।", deterioration: "सिरोसिस व यकृत विफलता।" },
      { stage: 4, signs: "गंभीर दुर्बलता (Emaciation), हाइपोप्रोटीनेमिया, श्वांस कष्ट, अचेतन।", recovery: "असाध्य (<15%)।", deterioration: "हेपेटिक फेल्योर व आंतरिक रक्तस्राव से मृत्यु।" }
    ]
  },
  {
    id: "TRP_HARDWARE",
    nameHi: "हार्डवेयर रोग / सुई चुभना (Traumatic Reticuloperitonitis - TRP)",
    nameEn: "Traumatic Reticuloperitonitis (TRP / Hardware Disease)",
    category: "METABOLIC",
    tempRange: "मध्यम ज्वर (103-104°F)",
    cardinalSigns: "पशु का पीठ को ऊपर उठाकर धनुषाकार खड़ा होना (Arched Back); चलने में अत्यधिक दर्द, सीढ़ियां उतरने या मुड़ने में कराहना (Grunting); रेटिकुलम पर दबाव देने पर दर्द; जुगाली पूर्णतः बंद।",
    pregnancyAlert: "गर्भावस्था के अंतिम महीनों में गर्भाशय के दबाव से सुई/कील और गहराई में (हार्ट की ओर) धंस सकती है। तत्काल चुंबक (Rumen Magnet) खिलाना सुरक्षित है।",
    labTests: [
      { sNo: 1, testName: "विदर्स पिंच टेस्ट (Withers Pinch Test / Pain Test)", sampleType: "शारीरिक क्लिनिकल परीक्षण", approxMrp: 50, tat: "तत्काल", confirms: "पीठ दबाने पर पशु का नीचे न झुकना व दर्द से कराहना पुष्ट करता है" },
      { sNo: 2, testName: "मेटल डिटेक्टर परीक्षण (Ferroscope / Metal Detector)", sampleType: "रेटिकुलम पर मेटल स्कैनिंग", approxMrp: 200, tat: "10 मिनट", confirms: "रेटिकुलम में लोहे की कील/तार की भौतिक उपस्थिति" },
      { sNo: 3, testName: "पेरिटोनियल द्रव परीक्षण (Abdominocentesis)", sampleType: "पेट से निकाला गया द्रव", approxMrp: 350, tat: "1 घंटा", confirms: "फाइब्रिनस पेरिटोनिटिस व बढ़ा हुआ प्रोटीन/न्यूट्रोफिल्स" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "ब्रॉड स्पेक्ट्रम एंटीबायोटिक", generic: "Ceftriaxone + Tazobactam", ethicalBrand: "Intacef Tazo 3375mg", approxMrp: 395, doseRoute: "3.375g IV/IM OD x 5 days", pregnancySafety: "सुरक्षित", purpose: "रेटिकुलम छेद से पेट में फैले पेरिटोनिटिस का नियंत्रण" },
        { sNo: 2, category: "दर्द व सूजन निवारक", generic: "Meloxicam", ethicalBrand: "Melonex", approxMrp: 120, doseRoute: "15-20 ml IM OD x 3 days", pregnancySafety: "सुरक्षित", purpose: "पेट के स्थानीय दर्द व सूजन में राहत" },
        { sNo: 3, category: "बी-कॉम्प्लेक्स", generic: "Vitamin B-Complex", ethicalBrand: "Tribivet", approxMrp: 120, doseRoute: "10 ml IM", pregnancySafety: "सुरक्षित", purpose: "रूमेन गति व नर्व टोन सुधार" }
      ],
      oral: [
        { name: "रूमेन मैग्नेट (Rumen Magnet)", brand: "Stomach Magnet", dose: "1 शक्तिशाली चुंबक बोलस गन द्वारा पेट में उतारना", duration: "जीवनकाल में एक बार", purpose: "लोहे की कील/तार को पकड़कर रेटिकुलम की दीवार से अलग रखना" }
      ],
      ayurvedic: [
        { name: "इसबगोल भूसी व मीठा तेल", ingredients: "100g ईसबगोल + 200ml अलसी का तेल", dose: "दिन में 1 बार 3 दिन", purpose: "विदेशी वस्तु के चारों ओर चिकनाई व आंतों की रक्षा" }
      ],
      homeopathic: [
        { name: "Arnica 200C + Silicea 200C + Belladonna 200C", dose: "10-10 बूंद दिन में 3 बार", purpose: "आंतरिक जख्म, चुभन व मवाद रोकने में लाभ" }
      ],
      desiRemedies: [
        { name: "अगला हिस्सा ऊंचा रखना (Incline Platform)", preparation: "पशु को ऐसे फर्श पर बांधें जहाँ अगला हिस्सा 6 से 8 इंच ऊंचा हो, भारी चारा बंद करें।", purpose: "कील को आगे हृदय (Pericardium) की ओर धंसने से रोकना" }
      ]
    },
    stages: [
      { stage: 1, signs: "अचानक चारा छोड़ना, जुगाली बंद, तापमान 103.5°F, पीठ धनुषाकार, हल्का कराहना।", recovery: "रूमेन मैग्नेट + एंटीबायोटिक से 80-85% पशु ठीक हो जाते हैं।", deterioration: "कील का डायाफ्राम को छेदना।" },
      { stage: 2, signs: "क्रोनिक पेरिटोनिटिस, बार-बार हल्का अफारा (Vagus Indigestion), वजन घटना, सूखा गोबर।", recovery: "रूमेनोटॉमी सर्जरी (Rumenotomy) द्वारा कील निकालने पर 75% रिकवरी।", deterioration: "हार्ट की झिल्ली में छेद (Pericarditis)।" },
      { stage: 3, signs: "ट्रॉमैटिक पेरीकार्डिटिस (हार्ट की झिल्ली में मवाद, गलबल में पानी सूजन, जुगलर नस फूलना)।", recovery: "प्रायः असाध्य (शल्य चिकित्सा जटिल - <20%)।", deterioration: "कार्डियक टैम्पोनेड।" },
      { stage: 4, signs: "हार्ट फेल्योर, फेफड़ों में पानी, अत्यधिक कष्ट, नाड़ी गायब।", recovery: "असाध्य।", deterioration: "हार्ट की थैली फटने व सेप्सिस से मृत्यु।" }
    ]
  },
  {
    id: "ACIDOSIS",
    nameHi: "रूमेन एसिडोसिस / खट्टा पेट (Grain Overload / Rumen Acidosis)",
    nameEn: "Acute Rumen Lactic Acidosis",
    category: "METABOLIC",
    tempRange: "हाइपोथर्मिया (<100°F)",
    cardinalSigns: "अत्यधिक गेहूं, चावल, दाना या सड़े फल खाने के बाद पेट का पानी की तरह फूलना; खट्टा बदबूदार पतला दस्त; लड़खड़ाहट (शराबी जैसी चाल); तापमान सामान्य से कम (<100°F) व निर्जलीकरण।",
    pregnancyAlert: "गंभीर लैक्टिक एसिडोसिस से गर्भाशय में रक्त प्रवाह घटता है जिससे गर्भपात हो सकता है। सोडियम बाइकार्बोनेट आईवी तुरंत देना जीवनरक्षक है।",
    labTests: [
      { sNo: 1, testName: "रूमेन द्रव पीएच परीक्षण (Rumen Fluid pH Strip)", sampleType: "रूमेन द्रव (Stomach Tube)", approxMrp: 50, tat: "2 मिनट", confirms: "पीएच <5.0 (सामान्य 6.2 - 6.8) तीव्र लैक्टिक एसिडोसिस पुष्ट करता है" },
      { sNo: 2, testName: "माइक्रोस्कोपिक प्रोटोजोआ टेस्ट", sampleType: "रूमेन द्रव", approxMrp: 100, tat: "10 मिनट", confirms: "समस्त जीवित रूमेन प्रोटोजोआ की पूर्ण मृत्यु" }
    ],
    treatment: {
      injections: [
        { sNo: 1, category: "सिस्टमिक बफर ड्रिप", generic: "Sodium Bicarbonate 1.2% or 5%", ethicalBrand: "Soda Bicarb Infusion (1000-2000 ml)", approxMrp: 220, doseRoute: "2-3 लीटर धीमा IV (रक्त एसिडोसिस शांत करने हेतु)", pregnancySafety: "सुरक्षित", purpose: "रक्त के गंभीर एसिडोसिस को न्यूट्रलाइज करना" },
        { sNo: 2, category: "थियामिन (विटामिन B1) - अत्यंत अनिवार्य", generic: "Thiamine Hydrochloride (Vit B1)", ethicalBrand: "Tribivet / Berin", approxMrp: 140, doseRoute: "10-20 ml IM/IV BID (पोलियोएन्सेफेलोमलेशिया की रोकथाम हेतु)", pregnancySafety: "सुरक्षित", purpose: "मस्तिष्क को एसिडोसिस जनित नेक्रोसिस (PEM) से बचाना" },
        { sNo: 3, category: "एनएसएआईडी", generic: "Flunixin Meglumine", ethicalBrand: "Megludyne", approxMrp: 290, doseRoute: "15 ml IV", pregnancySafety: "सुरक्षित", purpose: "रूमेन दीवार में एंडोटॉक्सिन अवशोषण व दर्द रोकना" }
      ],
      oral: [
        { name: "मीठा सोडा (सोडियम बाइकार्बोनेट) ओरल", brand: "Baking Soda", dose: "150-250 ग्राम 2 लीटर गुनगुने पानी में घोलकर नाल से पिलाएं", duration: "6 घंटे बाद दोहराएं", purpose: "रूमेन का खट्टापन (एसिडिटी) तुरंत खत्म करना" },
        { name: "रूमेन माइक्रोफ्लोरा ट्रांसफ्यूनेशन (Cud Transfer)", brand: "ताजा रूमेन द्रव", dose: "स्वस्थ पशु के पेट से 2-5 लीटर जुगाली/द्रव लेकर रोगी को पिलाना", duration: "एकल खुराक", purpose: "मरे हुए रूमेन बैक्टीरिया को दोबारा जीवित करना" }
      ],
      ayurvedic: [
        { name: "सौंफ, धनिया व मुलेठी घोल", ingredients: "50g सौंफ + 50g धनिया पाउडर + 30g मुलेठी 1 लीटर पानी में", dose: "दिन में 2 बार", purpose: "पेट की जलन शांत करना व प्राकृतिक शीतलता" }
      ],
      homeopathic: [
        { name: "Nux Vomica 200C + Carbo Veg 200C + Antim Crud 200C", dose: "10-10 बूंद हर घंटे", purpose: "दाना ओवरलोड व खट्टे पतले दस्त में त्वरित सुधार" }
      ],
      desiRemedies: [
        { name: "रूमेन वॉश (Rumen Lavage / पेट की सफाई)", preparation: "मोटी स्टमक ट्यूब डालकर पेट में 10 लीटर गुनगुना पानी भरकर सारा खट्टा दाना बाहर खींच लें।", purpose: "जहरीले दाने को शरीर से बाहर निकालना" }
      ]
    },
    stages: [
      { stage: 1, signs: "दाना खाने के 6-12 घंटे बाद: सुस्ती, चारा बंद, पेट में छप-छप पानी की आवाज, हल्का अफारा।", recovery: "मीठा सोडा ओरल देने से 90% पशु 24 घंटे में स्वस्थ।", deterioration: "एसिड का रक्त में अवशोषण।" },
      { stage: 2, signs: "खट्टा बदबूदार पतला दस्त, लड़खड़ाहट, तापमान 99°F, डिहाइड्रेशन, रूमेन गति बंद।", recovery: "सोडा बाईकार्ब IV + थियामिन से 75-80% रिकवरी।", deterioration: "अंगों का काम बंद होना।" },
      { stage: 3, signs: "पशु का गिर जाना, आंखें अंदर धंसना, मस्तिष्क के लक्षण (अंधापन, सिर टकराना), शराबी चाल।", recovery: "सघन आईसीयू फ्लुइड्स व रूमेन वॉश से 40-50% रिकवरी।", deterioration: "रूमेनाइटिस व माइकोटिक अब्सैस।" },
      { stage: 4, signs: "कोमा, सांस उखड़ना, यूरिया बढ़ना, गंभीर शॉक।", recovery: "असाध्य (<15%)।", deterioration: "टॉक्सिक कार्डियोरेस्पिरेटरी फेल्योर से मृत्यु।" }
    ]
  }
];

window.VETCARE_SYMPTOMS_BY_ORGAN = {
  eyes: ["सामान्य गुलाबी", "रक्त-संकुल लाल", "सफेद/फीका (एनीमिक)", "पीलिया पीला", "नीला"],
  skin: ["सामान्य", "गांठदार सूजन (Lumps)", "खुरदुरी/रूखी", "चकत्ते/घाव", "खुजली/बाल झड़ना", "पुट्ठे/कंधे पर गैस सूजन (चर्र-चर्र)"],
  udder: ["सामान्य", "गर्म व सूजा हुआ", "गांठ/कड़ापन", "फाइब्रोसिस/मकड़ी", "दूध में खून/छीछड़े", "थन पर फफोले/घाव"],
  urine: ["सामान्य", "लाल/कॉफी जैसा (Hemoglobinuria)", "गहरा पीला", "मटमैला/झागदार", "रुक-रुक कर दर्द", "पेशाब में शर्करा (Glucosuria)"],
  dung: ["सामान्य", "पतला बदबूदार दस्त", "खूनी आंवयुक्त", "सूखा व सख्त काला", "अपचित दाना", "खट्टा पानी जैसा दस्त"],
  temp: ["हाइपोथर्मिया (<100°F)", "सामान्य (101-102.5°F)", "मध्यम ज्वर (103-104°F)", "अति-तीव्र ज्वर (>105°F)"],
  rumen: ["सामान्य 2-3 गति/2 मिनट", "सुस्त जुगाली", "पूर्ण बंद", "आफरा/झागदार", "पेट में छप-छप पानी"],
  nervous: ["सामान्य सजग", "गर्दन मोड़कर बैठना (S-Shape)", "दीवार से सिर दबाना/चक्कर काटना", "आक्रामक/उग्र रंभाना", "लकवा/पक्षाघात", "दांत किटकिटाना/दौरे"]
};

window.VETCARE_MEDICINES_DB = [
  {
    id: "MED01",
    salt: "Ceftiofur Sodium",
    ethicalBrand: "Xyrofur 1g / Naxcel",
    category: "Antibiotic",
    type: "ethical",
    approxMrp: 480,
    doseRate: "1.1 - 2.2 mg/kg b.wt (1g प्रति 400kg)",
    route: "IM / SC",
    pregnancySafe: true,
    indications: "गलघोंटू (HS), निमोनिया (BRD), एक्यूट मेट्राइटिस, खुर सड़न (Foot Rot)।",
    contraindications: "सेफलोस्पोरिन से अतिसंवेदनशीलता।",
    withdrawalPeriod: "दूध: 0 दिन (शून्य), मांस: 4 दिन"
  },
  {
    id: "MED02",
    salt: "Ceftriaxone Sodium + Tazobactam",
    ethicalBrand: "Intacef Tazo 3375mg / 4500mg",
    category: "Antibiotic",
    type: "ethical",
    approxMrp: 410,
    doseRate: "7 - 10 mg/kg b.wt",
    route: "IV / IM",
    pregnancySafe: true,
    indications: "तीव्र थनैल (Clinical Mastitis), गंभीर मेट्राइटिस, पेरिटोनिटिस, ब्रॉड स्पेक्ट्रम सेप्सिस।",
    contraindications: "गंभीर रीनल फेल्योर।",
    withdrawalPeriod: "दूध: 7 दिन, मांस: 28 दिन"
  },
  {
    id: "MED03",
    salt: "Enrofloxacin 10%",
    ethicalBrand: "Enrocin / Baytril",
    category: "Antibiotic",
    type: "ethical",
    approxMrp: 280,
    doseRate: "5 mg/kg b.wt (15-20 ml प्रति वयस्क पशु)",
    route: "IM / SC / Slow IV",
    pregnancySafe: true,
    indications: "कोलीफॉर्म मैस्टाइटिस, बछड़ों का सफेद दस्त, पीपीआर, श्वसन तंत्र संक्रमण।",
    contraindications: "बढ़ते हुए युवा पशुओं के कार्टिलेज पर प्रभाव (उच्च डोज़ में)।",
    withdrawalPeriod: "दूध: 4 दिन, मांस: 14 दिन"
  },
  {
    id: "MED04",
    salt: "Oxytetracycline Dihydrate (Long Acting 200mg/ml)",
    ethicalBrand: "Terramycin LA / Oxyvet LA",
    category: "Antibiotic",
    type: "ethical",
    approxMrp: 270,
    doseRate: "20 mg/kg b.wt Deep IM (1 ml प्रति 10 kg)",
    route: "Deep IM strictly",
    pregnancySafe: false,
    indications: "एनाप्लास्मोसिस, थायलेरियासिस, खुर सड़न, जेर रुकना (ROP)।",
    contraindications: "गर्भावस्था के अंतिम ट्राइमेस्टर में दांतों का पीलापन व हेपेटोटॉक्सिसिटी।",
    withdrawalPeriod: "दूध: 7 दिन, मांस: 28 दिन"
  },
  {
    id: "MED05",
    salt: "Amoxicillin Sodium + Sulbactam Sodium",
    ethicalBrand: "Amoxirum Forte 3g / 4.5g",
    category: "Antibiotic",
    type: "ethical",
    approxMrp: 380,
    doseRate: "7 - 10 mg/kg b.wt",
    route: "IM / IV",
    pregnancySafe: true,
    indications: "लंगड़ा बुखार (BQ), थनैल, घाव, सर्जरी पश्चात संक्रमण, मेट्राइटिस।",
    contraindications: "पेनिसिलिन एलर्जी।",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 14 दिन"
  },
  {
    id: "MED06",
    salt: "Flunixin Meglumine",
    ethicalBrand: "Megludyne / Flunix",
    category: "NSAID",
    type: "ethical",
    approxMrp: 290,
    doseRate: "2.2 mg/kg b.wt (15-20 ml)",
    route: "IV (सर्वोत्तम) / IM",
    pregnancySafe: true,
    indications: "एंडोटॉक्सिक शॉक, गलघोंटू, तीव्र निमोनिया, तेज बुखार व दर्द में तत्काल राहत।",
    contraindications: "गंभीर गैस्ट्रिक अल्सर, निर्जलीकरण व गुर्दा रोग।",
    withdrawalPeriod: "दूध: 2 दिन, मांस: 4 दिन"
  },
  {
    id: "MED07",
    salt: "Meloxicam + Paracetamol",
    ethicalBrand: "Melonex Plus",
    category: "NSAID",
    type: "ethical",
    approxMrp: 140,
    doseRoute: "Meloxicam 0.5 mg/kg + Paracetamol 15 mg/kg (15-20 ml IM)",
    route: "IM",
    pregnancySafe: true,
    indications: "उच्च ज्वर, थनैल, लंगड़ापन, चोट, सूजन, एफएमडी के दर्द निवारण हेतु।",
    contraindications: "गंभीर हिपेटिक दुर्बलता।",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 15 दिन"
  },
  {
    id: "MED08",
    salt: "Buparvaquone 50mg/ml",
    ethicalBrand: "Butalex / Zubion",
    category: "Antiprotozoal",
    type: "ethical",
    approxMrp: 850,
    doseRate: "2.5 mg/kg b.wt (1 ml प्रति 20 kg b.wt)",
    route: "Deep IM strictly in neck muscles",
    pregnancySafe: true,
    indications: "थायलेरियासिस (Theileria annulata) का विशिष्ट व अचूक उपचार।",
    contraindications: "IV रूट पूर्णतः वर्जित है।",
    withdrawalPeriod: "दूध: 48 घंटे, मांस: 42 दिन"
  },
  {
    id: "MED09",
    salt: "Diminazene Aceturate 70mg/ml",
    ethicalBrand: "Berenil / Babenil",
    category: "Antiprotozoal",
    type: "ethical",
    approxMrp: 190,
    doseRate: "3.5 - 5 mg/kg b.wt (1 ml प्रति 15-20 kg)",
    route: "Deep IM",
    pregnancySafe: true,
    indications: "बबेशियोसिस (लाल पेशाब) एवं ट्राइपैनोसोमियासिस (सर्रा)।",
    contraindications: "ऊंटों में विषाक्तता (ऊंटों में न दें), अधिक डोज़ से तंत्रिका विकार।",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 21 दिन"
  },
  {
    id: "MED10",
    salt: "Isoflupredone Acetate 2mg/ml",
    ethicalBrand: "Predef 2X",
    category: "Hormone",
    type: "ethical",
    approxMrp: 340,
    doseRate: "10-20 mg (5-10 ml IM)",
    route: "Deep IM",
    pregnancySafe: true,
    indications: "कीटोसिस, गलघोंटू में श्वास सूजन, थनैल, गाभिन पशुओं में सुरक्षित स्टेरॉयड।",
    contraindications: "वायरल संक्रमण की प्रारंभिक अवस्था बिना एंटीबायोटिक।",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 7 दिन"
  },
  {
    id: "MED11",
    salt: "Cloprostenol Sodium (PGF2a) 250mcg/ml",
    ethicalBrand: "Vetmate / Pragma 2ml",
    category: "Hormone",
    type: "ethical",
    approxMrp: 280,
    doseRate: "500 mcg (2 ml per animal)",
    route: "Deep IM",
    pregnancySafe: false,
    indications: "मद चक्र सिंक्रोनाइजेशन, पायोमेट्रा, जेर रुकना, सब-एस्ट्रस, परसिस्टेंट कॉर्पस ल्यूटियम।",
    contraindications: "गाभिन पशुओं में पूर्णतः वर्जित (गर्भपात कराता है)।",
    withdrawalPeriod: "शून्य दिन"
  },
  {
    id: "MED12",
    salt: "Calcium Borogluconate 25% with Mg, P, Dextrose",
    ethicalBrand: "Mifex 450ml / Calborol",
    category: "Supportive/Fluids",
    type: "ethical",
    approxMrp: 340,
    doseRate: "450 ml प्रति वयस्क पशु",
    route: "Slow IV (300 ml) + SC (150 ml)",
    pregnancySafe: true,
    indications: "मिल्क फीवर (हाइपोकैल्सीमिया), प्रोलैप्स, डाउनर काउ सिंड्रोम।",
    contraindications: "तेज गति से IV देना (हार्ट अटैक का खतरा)। स्टेथोस्कोप से हृदय गति जांचते रहें।",
    withdrawalPeriod: "शून्य दिन"
  },
  {
    id: "MED13",
    salt: "Oxyclozanide 3% + Levamisole 1.5%",
    ethicalBrand: "Zanil / Distodin Suspension",
    category: "Anthelmintic",
    type: "ethical",
    approxMrp: 220,
    doseRate: "Oxyclozanide 10-15 mg/kg b.wt",
    route: "Oral drench",
    pregnancySafe: true,
    indications: "लिवर फ्लूक (फैसियोला), पेट के कीड़े (Amphistomes) व फेफड़े के गोलकृमि।",
    contraindications: "गंभीर दुर्बल पशु में निर्जलीकरण की स्थिति।",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 14 दिन"
  },
  {
    id: "MED14",
    salt: "Albendazole 2.5% Suspension",
    ethicalBrand: "Albomar / Valbazen",
    category: "Anthelmintic",
    type: "generic",
    approxMrp: 120,
    doseRate: "7.5 - 10 mg/kg b.wt (60-90 ml प्रति 300kg)",
    route: "Oral drench",
    pregnancySafe: false,
    indications: "पेट के गोलकृमि, फीताकृमि (Tapeworms) व फ्लूक।",
    contraindications: "गर्भावस्था के प्रथम 45 दिनों में पूर्णतः वर्जित (Teratogenic)।",
    withdrawalPeriod: "दूध: 3 दिन, मांस: 14 दिन"
  },
  {
    id: "MED15",
    salt: "Ivermectin 1% w/v",
    ethicalBrand: "Neomec / Ivomec",
    category: "Anthelmintic",
    type: "ethical",
    approxMrp: 180,
    doseRate: "0.2 mg/kg b.wt (1 ml प्रति 50 kg)",
    route: "Subcutaneous (SC strictly)",
    pregnancySafe: true,
    indications: "बाहरी परजीवी (चिचड़ी, जूं, पिस्सू, दाद, मैंग) एवं आंतरिक गोलकृमि।",
    contraindications: "IV या IM कभी न दें।",
    withdrawalPeriod: "दूध: 28 दिन, मांस: 28 दिन"
  }
];

window.VETCARE_FARMER_ORGAN_REMEDIES = {
  uterus: {
    title: "बच्चेदानी व प्रजनन अंग (Uterus & Reproductive Care)",
    conditions: [
      {
        name: "ब्याने के बाद जेर (Avar) का न गिरना",
        signs: "ब्याने के 8 घंटे बाद भी जेर लटकना, जोर लगाना।",
        homeRemedy: "बांस के ताजे पत्ते (250 ग्राम) + 20 ग्राम सोंठ + 250 ग्राम पुराना गुड़ 1 लीटर पानी में उबालकर आधा करें और गुनगुना पिलाएं। जेर पर कभी ईंट या वजन न बांधें।"
      },
      {
        name: "योनि या बच्चेदानी बाहर निकलना (फूल/पाछा दिखाना)",
        signs: "बैठने पर लाल मांसल गोला बाहर दिखना।",
        homeRemedy: "बाहर निकले अंग को बर्फ या फिटकरी के ठंडे पानी से धीरे-धीरे धोकर सूजन कम करें। पशु के पिछले पैरों के नीचे 6 इंच ऊंचा टीला बनाएं ताकि जोर न लगे। सौंफ व मिश्री का शर्बत दें।"
      },
      {
        name: "बच्चेदानी की मैली/सफाई (मवाद व गंदा स्राव)",
        signs: "योनि से बदबूदार सफेद या लाल पानी गिरना।",
        homeRemedy: "50 ग्राम हल्दी + 30 ग्राम अजवाइन + 250 ग्राम गुड़ का काढ़ा बनाकर ब्याने के बाद 5 दिन तक लगातार सुबह खाली पेट पिलाएं।"
      }
    ]
  },
  udder: {
    title: "थन व अयन देखभाल (Udder & Teat Health)",
    conditions: [
      {
        name: "थनैल का कड़ापन व सूजन (Mastitis Initial)",
        signs: "थन गर्म, लाल, दूध में बारीक जाली या छिछड़े।",
        homeRemedy: "250 ग्राम ताजा एलोवेरा गूदा + 50 ग्राम हल्दी पाउडर + 15 ग्राम खाने का बुझा चूना - तीनों को मिक्सी/सिलबट्टे पर पीसकर गाढ़ा लेप बनाएं। थन को पूरा खाली करके दिन में 3 बार लगाएं।"
      },
      {
        name: "थन का फटना व चीरे (Cracked Teats)",
        signs: "दूध दुहते समय थन से खून आना व दर्द।",
        homeRemedy: "देशी गाय का घी (50 ग्राम) में 5 ग्राम देशी कपूर मिलाकर गुनगुना लेप दुहने के बाद लगाएं।"
      },
      {
        name: "दूध में खून आना",
        signs: "दूध का रंग गुलाबी या लाल होना।",
        homeRemedy: "100 ग्राम भुनी हुई फिटकरी को पीसकर 250 ग्राम ताजे दही में मिलाकर दिन में एक बार 3 दिन तक दें।"
      }
    ]
  },
  digestion: {
    title: "पेट, हाजमा व रूमेन (Digestion & Rumen)",
    conditions: [
      {
        name: "पेट फूलना / अफारा (Bloat)",
        signs: "बायाँ पेट ढोलक जैसा फूलना, सांस में तकलीफ।",
        homeRemedy: "50 मिली शुद्ध तारपीन का तेल + 300 मिली मीठा सरसों तेल + 20 ग्राम हींग मिलाकर नाल से पिलाएं। मुंह में लकड़ी की खपच्ची बांधें ताकि लार गिरे और डकार आए।"
      },
      {
        name: "अपच व जुगाली बंद होना (Indigestion)",
        signs: "चारा न खाना, जुगाली बंद, सूखा गोबर।",
        homeRemedy: "50 ग्राम काला नमक + 30 ग्राम अजवाइन + 30 ग्राम सोंठ + 10 ग्राम हींग + 100 ग्राम गुड़ का लड्डू बनाकर दिन में 2 बार खिलाएं।"
      },
      {
        name: "पतले दस्त व पेचिश (Diarrhea)",
        signs: "बदबूदार पतला गोबर, कमजोरी।",
        homeRemedy: "कच्चे बेल का गूदा (100 ग्राम) या चाय की सूखी पत्ती (50 ग्राम) को 1 लीटर छाछ में घोलकर दिन में 2 बार पिलाएं। चावल का मांड दें।"
      }
    ]
  },
  hooves: {
    title: "खुर व पैर (Hooves & Locomotion)",
    conditions: [
      {
        name: "खुरों की सड़ांध व दुर्गंध (Foot Rot)",
        signs: "खुरों के बीच मवाद, अत्यधिक लंगड़ाना।",
        homeRemedy: "खुरों को नीम के उबले गुनगुने पानी से साफ करें। 100 मिली नीम के तेल में 15 ग्राम कपूर मिलाकर खुरों के बीच रुई से लगाएं।"
      },
      {
        name: "मोच, सूजन व जोड़ों का दर्द",
        signs: "पैर पटकना, चलने में असमर्थता।",
        homeRemedy: "आक (मदार) के पत्तों पर सरसों का तेल और हल्दी लगाकर तवे पर गर्म करें और सूजन वाले जोड़ पर बांधें।"
      }
    ]
  },
  skin: {
    title: "त्वचा, बाल व बाहरी परजीवी (Skin & Coat)",
    conditions: [
      {
        name: "चिचड़ी, जूं व पिस्सू (Ticks & Lice)",
        signs: "पशु का दीवार से शरीर रगड़ना, खून की कमी।",
        homeRemedy: "सीताफल (शरीफा) के बीजों का चूर्ण या नीम के तेल (100ml) में 10 ग्राम कपूर मिलाकर पशु की त्वचा पर मालिश करें।"
      },
      {
        name: "दाद, खाज व पपड़ी (Mange / Ringworm)",
        signs: "गोल चक्ते, बाल उड़ना, सफेद पपड़ी।",
        homeRemedy: "गंधक (सल्फर) 10 ग्राम + सरसों का तेल 100 मिली + 10 ग्राम हल्दी का गाढ़ा पेस्ट बनाकर प्रभावित त्वचा पर लगाएं।"
      }
    ]
  }
};

window.VETCARE_BREEDING_DATA = {
  breeds: [
    {
      name: "मुर्राह भैंस (Murrah Buffalo)",
      origin: "हरियाणा (रोहतक, हिसार, जींद)",
      characteristics: "गहरा काला रंग (Jet Black), जलेबी जैसा मुड़ा हुआ सींग, छोटा मुख, भारी पूंछ का गुच्छा।",
      milkYield: "2000 - 3000 लीटर प्रति ब्यांत (वसा 7 - 8%)",
      aiRecommendation: "उच्च वंशावली सीमन (Progeny Tested Bull Semen >4000L dam yield) का ही उपयोग करें।"
    },
    {
      name: "नीली-रावी भैंस (Nili-Ravi)",
      origin: "पंजाब (फिरोजपुर, सतलुज घाटी)",
      characteristics: "पंच-कल्याणी (माथे पर सफेद टीका, चारों पैर सफेद, पूंछ का गुच्छा सफेद), बिल्ली जैसी आंखें।",
      milkYield: "1800 - 2500 लीटर प्रति ब्यांत",
      aiRecommendation: "शुद्ध नीली-रावी सीमन से क्रॉस-ब्रीडिंग से बचें।"
    },
    {
      name: "साहीवाल गाय (Sahiwal Cow)",
      origin: "पंजाब/पाकिस्तान सीमा (मोंटगोमरी)",
      characteristics: "लाल-भूरा रंग, भारी ढीली गलकंबल (Dewlap), छोटे सींग, शांत स्वभाव।",
      milkYield: "2500 - 3500 लीटर प्रति ब्यांत (A2 दूध)",
      aiRecommendation: "रोग प्रतिरोधक व गर्मी सहनशील, A2 जीनोटाइप प्रमाणित सीमन चुनें।"
    },
    {
      name: "गीर गाय (Gir Cow)",
      origin: "गुजरात (काठियावाड़, गीर जंगल)",
      characteristics: "उत्तल माथा (गुंबदनुमा), मुड़े हुए लटके कान (पत्ते जैसे), चितकबरा लाल-सफेद रंग।",
      milkYield: "2500 - 4000 लीटर प्रति ब्यांत",
      aiRecommendation: "ब्राजीलियन जीर या एनडीडीबी प्रमाणित उच्च उत्पादन वीर्य।"
    },
    {
      name: "थारपारकर गाय (Tharparkar)",
      origin: "राजस्थान (बाड़मेर, जैसलमेर, कच्छ)",
      characteristics: "सफेद या हल्का स्लेटी रंग, सूखा रोधी, अत्यधिक गर्मी सहनशील।",
      milkYield: "2000 - 2800 लीटर प्रति ब्यांत",
      aiRecommendation: "रेगिस्तानी व शुष्क क्षेत्रों के लिए सर्वोत्तम देशी नस्ल।"
    }
  ],
  repeatBreeder: {
    causes: [
      "खनिज लवणों (फास्फोरस, कॉपर, जिंक) की भारी कमी।",
      "बच्चेदानी में सबक्लिनिकल संक्रमण (हल्की मैली/एंडोमेट्राइटिस)।",
      "मद (Heat) की गलत पहचान या गलत समय पर सीमन (A.I.) कराना।",
      "अंडोत्सर्ग में देरी (Delayed Ovulation) या सिस्टिक ओवरी।",
      "खराब गुणवत्ता वाला वीर्य या अप्रशिक्षित ए.आई. कार्यकर्ता।"
    ],
    managementProtocol: [
      "1. डीवर्मिंग: सीमन कराने से 1 माह पूर्व अच्छी दवा (जैसे Oxyclozanide) से पेट के कीड़े साफ करें।",
      "2. मिनरल मिक्सचर: प्रतिदिन 50 ग्राम उच्च गुणवत्ता वाला कीलेटेड मिनरल मिक्सचर लगातार 2 माह दें।",
      "3. डिस्चार्ज जांच: मद के समय यदि पारदर्शी कांच जैसा तार गिरे तभी सीमन कराएं। यदि मटमैला या सफेद तार हो तो पहले गर्भाशय की सफाई कराएं।",
      "4. ए.आई. समय (AM-PM Rule): सुबह मद में आने पर शाम को सीमन कराएं; शाम को मद में आने पर अगली सुबह सीमन कराएं।"
    ]
  },
  aiTimingGuide: {
    rule: "AM - PM वैज्ञानिक नियम",
    earlyHeat: "लक्षण: रंभाना, अन्य पशुओं पर चढ़ना, योनि लाल होना। (सीमन का समय नहीं)",
    midHeat: "लक्षण: खड़ा रहना (Standing Heat), पारदर्शी तार गिरना। (सीमन का सर्वोत्तम समय - 12 से 18 घंटे बाद)",
    lateHeat: "लक्षण: शांत बैठना, तार का गाढ़ा होना। (सीमन कराने पर गर्भाधान की संभावना कम)"
  }
};

window.VETCARE_MILK_BOOSTER_DATA = {
  reasonsForDrop: [
    "सबक्लिनिकल थनैल (अयन में सूजन न दिखना पर दूध कम होना)।",
    "ऊर्जा व प्रोटीन की भारी कमी (Negative Energy Balance)।",
    "अत्यधिक गर्मी व उमस (Heat Stress)।",
    "रूमेन एसिडोसिस या असंतुलित दाना मिश्रण।",
    "पीने के साफ पानी की कमी (दूध में 87% पानी होता है)।"
  ],
  feedFormulationPer100Kg: [
    { ingredient: "अनाज (मक्का/जौ/गेहूं का दलिया)", percentage: "35% (35 kg)" },
    { ingredient: "खली (बिनौला/सरसों/सोयाबीन डीओसी)", percentage: "32% (32 kg)" },
    { ingredient: "चोकर (गेहूं चोकर/चना चूरी/राइस ब्रान)", percentage: "30% (30 kg)" },
    { ingredient: "कीलेटेड मिनरल मिक्सचर", percentage: "2% (2 kg)" },
    { ingredient: "सादा नमक", percentage: "1% (1 kg)" }
  ],
  galactagogues: [
    {
      name: "शतावरी व जीवंती टॉनिक",
      ingredients: "50 ग्राम शतावरी चूर्ण + 30 ग्राम जीवंती चूर्ण + 250 ग्राम गुड़",
      method: "ब्याने के 10 दिन बाद से प्रतिदिन शाम को 20 दिन तक दें। अयन की नलिकाओं को विकसित कर दूध बढ़ाता है।"
    },
    {
      name: "मेथी व सोंठ दलिया",
      ingredients: "100 ग्राम पिसी मेथी + 25 ग्राम सोंठ + 250 ग्राम गुड़ + 500 ग्राम गेहूं दलिया",
      method: "पकाकर गुनगुना रोज रात को खिलाएं। पाचन सुधारता है और दूध में वसा (Fat) बढ़ाता है।"
    },
    {
      name: "बाईपास फैट (Bypass Fat) फॉर्मूला",
      ingredients: "100 ग्राम वनस्पति बाईपास फैट (Fractionated Palm Fat)",
      method: "पीक लैक्टेशन (ब्याने के 15 से 90 दिन) के दौरान दाने में रोज मिलाएं। वजन गिरने से रोकता है।"
    }
  ]
};
