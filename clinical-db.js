/**
 * Vetcare AI OS - Master Clinical Knowledge Database
 * Production-Ready Veterinary Evidence-Based Clinical Decision Support Data
 * Comprehensive Diagnostic & Therapeutic Protocol for 10 Endemic Ruminant Diseases
 */

window.VETCARE_DISEASE_DB = [
  /* =========================================================================
     1. सर्रा (BOVINE SURRA / TRYPANOSOMIASIS)
     ========================================================================= */
  {
    id: "SURRA",
    names: {
      english: "Bovine Surra (Trypanosomiasis)",
      hindi: "सर्रा रोग",
      local: ["तीबरसा (तीन साल रहने वाला)", "गलतिया", "मक्खी बुखार", "चक्री रोग"]
    },
    category: "PROTOZOAL",
    cardinalSign: "CIRCLING_HEAD_PRESSING",
    tempCategory: "HIGH",
    temperatureRangeF: "103.5 - 106.0 °F (Intermittent Pyrexia)",
    keywords: ["surra", "trypanosoma", "circling", "head pressing", "तीबरसा", "सर्रा", "चक्कर काटना", "अंधापन", "tabanus"],
    overview: "ट्रिपैनोसोमा इवान्साई (Trypanosoma evansi) प्रोटोजोआ परजीवी द्वारा उत्पन्न घातक रक्त रोग। यह मुख्य रूप से डाँस मक्खी (Tabanus) एवं स्टॉमोक्सिस (Stomoxys) के दंश से फैलता है। तंत्रिका तंत्र (CNS) विकृति, गोल-गोल चक्कर काटना, दीवारों से माथा टिकाना और रुक-रुक कर तेज बुखार इसके प्रमुख लक्षण हैं।",
    confirmatoryLabTests: [
      {
        testName: "Wet Blood Film (WBF) Examination",
        sampleType: "ताजा परिधीय रक्त (कान की नस से पेरीफेरल ब्लड)",
        approxMRP: 120,
        significance: "माइक्रोस्कोप के 40x पर जीवित ट्रिपैनोसोम परजीवियों की तेज लहरदार गति (Snake-like motility) दिखाई देती है।"
      },
      {
        testName: "Giemsa / Leishman Stained Blood Smear",
        sampleType: "हवा में सुखाई गई पतली रक्त स्मीयर",
        approxMRP: 150,
        significance: "लंबा, नुकीला फ्लैजेलम और स्पष्ट किनेटोप्लास्ट युक्त मोनोमॉर्फिक ट्रिपोमैस्टिगोट्स की प्रत्यक्ष पुष्टि।"
      },
      {
        testName: "Card Agglutination Test for Trypanosomiasis (CATT)",
        sampleType: "सीरम (Serum)",
        approxMRP: 450,
        significance: "तीव्र एवं छिपे हुए (subclinical) मामलों में अत्यधिक संवेदनशील सेरोलॉजिकल निदान।"
      }
    ],
    injectionsTable: [
      {
        category: "विशिष्ट एंटीप्रोटोजोअल (ड्रग ऑफ चॉइस)",
        salt: "Quinapyramine Sulfate + Quinapyramine Chloride (Curative + Prophylactic)",
        brands: ["Triquin (MSD)", "Antrycide Pro-salt", "Quinaspur"],
        approxMRP: 280,
        doseRoute: "4.4 mg/kg कुल खुराक (3 g शीशी को 15 ml आसुत जल में घोलें; 1 ml प्रति 40 kg भार) - strictly Subcutaneous (S/C) गर्दन के क्षेत्र में",
        pregnancySafety: "CAUTION (गर्भ के अंतिम चरण में सावधानीपूर्वक, बिना उत्तेजना के लगाएं)"
      },
      {
        category: "वैकल्पिक एंटीप्रोटोजोअल",
        salt: "Diminazene Aceturate (7% with Phenazone)",
        brands: ["Berenil RTU (MSD)", "Diminasan", "Bazenil"],
        approxMRP: 320,
        doseRoute: "3.5 - 7.0 mg/kg (1 ml per 15-20 kg शरीर भार) - Deep Intramuscular (I/M)",
        pregnancySafety: "SAFE (सावधानी के साथ सुरक्षित)"
      },
      {
        category: "न्यूरोप्रोटेक्टिव एवं एनाल्जेसिक",
        salt: "Flunixin Meglumine",
        brands: ["Megludyne (Virbac)", "Flunix", "Finadyne"],
        approxMRP: 240,
        doseRoute: "1.1 - 2.2 mg/kg (2 ml per 45 kg) I/V या I/M, दैनिक 2-3 दिन",
        pregnancySafety: "SAFE (गर्भावस्था के सभी चरणों में सुरक्षित)"
      },
      {
        category: "न्यूरोट्रॉपिक विटामिन कॉम्प्लेक्स",
        salt: "Mecobalamin + Pyridoxine + Nicotinamide + D-Panthenol",
        brands: ["Neurobion Forte Vet", "Tribivet (Intas)", "Mecovet"],
        approxMRP: 160,
        doseRoute: "10 - 15 ml I/M अथवा slow I/V लगातार 5 दिन",
        pregnancySafety: "SAFE"
      },
      {
        category: "एंटीहिस्टामिनिक",
        salt: "Chlorpheniramine Maleate (CPM)",
        brands: ["Avil (MSD)", "Cadistin", "Anistamin"],
        approxMRP: 85,
        doseRoute: "10 ml I/M",
        pregnancySafety: "SAFE"
      }
    ],
    oralSupplements: [
      {
        name: "हेमेटिनिक एवं आयरन टॉनिक",
        brands: ["Sharkoferrol (Pfizer)", "Feritas Oral", "RBC-Up"],
        dose: "50 ग्राम दैनिक सुबह-शाम गुड़ में मिलाकर",
        pregnancySafety: "SAFE",
        purpose: "परजीवी द्वारा नष्ट किए गए लाल रक्त कणों (RBC) और गंभीर हीमोग्लोबिन की कमी को दूर करना।"
      },
      {
        name: "लिवर टॉनिक",
        brands: ["Liv.52 Protec (Himalaya)", "Brotone", "Livoferol"],
        dose: "50 मिली दिन में दो बार 10 दिन",
        pregnancySafety: "SAFE",
        purpose: "परजीवी टॉक्सिन्स से यकृत के हेपेटोसाइट्स की रिकवरी और भूख सुधार।"
      }
    ],
    ayurvedicHerbal: [
      {
        name: "Restobal Liquid (Himalaya)",
        keyIngredients: "Withania somnifera (अश्वगंधा), Ocimum sanctum (तुलसी)",
        approxMRP: 220,
        dose: "50 मिली दैनिक 7 दिन",
        indication: "न्यूरोलॉजिकल तनाव कम करना और शरीर की प्रतिरोधक क्षमता बढ़ाना।"
      },
      {
        name: "Ruchamax Powder",
        keyIngredients: "Zingiber officinale (सोंठ), Picrorhiza kurroa (कुटकी)",
        approxMRP: 110,
        dose: "30-40 ग्राम दैनिक गुड़ के साथ",
        indication: "मस्तिष्क आघात के बाद रूमेन की सुस्त गतिशीलता एवं भूख को पुनर्जीवित करना।"
      }
    ],
    homeopathicRemedies: [
      {
        remedy: "Belladonna 200C",
        potency: "200C",
        approxMRP: 95,
        dose: "15 बूँदें जीभ पर हर 2 घंटे में (तीव्र उत्तेजना व चक्कर अवस्था में)",
        indication: "मस्तिष्क में रक्त जमाव, दीवारों से सिर मारना, पुतलियों का फैलना।"
      },
      {
        remedy: "Arsenicum Album 200C",
        potency: "200C",
        approxMRP: 95,
        dose: "15 बूँदें दिन में तीन बार",
        indication: "आंतरायिक दुर्बल करने वाला बुखार, अत्यधिक कमजोरी, रक्तक्षीणता (Anemia)।"
      }
    ],
    desiHomeRemedies: [
      {
        remedyName: "त्रिकटु ऊर्जावर्धक मस्तिष्क लेप एवं काढ़ा",
        ingredients: "सोंठ (सूखा अदरक) 50g, काली मिर्च 20g, पीपल 20g, पुराना गुड़ 250g, गाय का देसी घी 100g",
        preparation: "त्रिकटु चूर्ण को कूटकर गुड़ और पिघले हुए घी में मिलाकर छोटे-छोटे पेड़े बनाएं।",
        dosage: "दिन में 2 बार 5 दिन तक मुंह में रखें।",
        precautions: "पशु बेहोश या कोमा में हो तो कभी नाल से जबरदस्ती न पिलाएं (Drenching Pneumonia का खतरा)।"
      }
    ],
    shedBiosecurity: [
      "तबेले में डाँस व अश्व मक्खियों (Tabanus Flies) के नियंत्रण हेतु सायपरमेथ्रिन (Cypermethrin 10% EC) 2 ml प्रति लीटर पानी में मिलाकर दीवारों, खिड़कियों और नालियों में छिड़कें।",
      "मक्खियों के प्रजनन को रोकने के लिए बाड़े में गीला गोबर व सड़ा चारा एकत्रित न होने दें; चूने का सूखा पाउडर फर्श पर बुरकें।",
      "रोगग्रस्त पशु को स्वस्थ पशुओं से तुरंत कम से कम 50 मीटर दूर जालीदार शेड में क्वारंटाइन करें।"
    ],
    clinicalCourse: {
      prognosis: "GUARDED (यदि तंत्रिका लक्षण जैसे अंधापन व चक्कर शुरू हो चुके हों तो प्रोग्नोसिस संदेहास्पद, शुरुआती अवस्था में रिकवरी 90%)",
      recoveryDaysMin: 5,
      recoveryDaysMax: 21,
      redFlags: ["दोनों आंखों से पूर्ण अंधापन", "अचानक गिरकर आक्षेप (Convulsions) आना", "लगातार सिर को दीवार से दबाए रखना और अनियंत्रित दांत पीसना"]
    },
    pregnancyContraindications: {
      isSteroidContraindicated: true,
      contraindicatedDrugs: [
        "Dexamethasone Sodium Phosphate (तीसरी तिमाही में गर्भाशय संकुचन कर भ्रूण निष्कासन/गर्भपात का 100% जोखिम)",
        "Isoflupredone Acetate (उच्च खुराक में गर्भपात का संभावित जोखिम)"
      ],
      safeAlternatives: ["Flunixin Meglumine 2.2 mg/kg I/V", "Meloxicam + Paracetamol I/M"],
      clinicalWarning: "गर्भित पशु में तंत्रिका सूजन कम करने के नाम पर कभी भी कोर्टिकोस्टेरॉयड न लगाएं, केवल फ्लूनिक्सिन मेग्लूमाइन का प्रयोग करें।"
    }
  },

  /* =========================================================================
     2. गलघोंटू (HEMORRHAGIC SEPTICEMIA - HS)
     ========================================================================= */
  {
    id: "HS",
    names: {
      english: "Hemorrhagic Septicemia (HS)",
      hindi: "गलघोंटू",
      local: ["घुर्रका", "घोटू", "कण्ठसूज", "गलाघोंट", "नावे"]
    },
    category: "BACTERIAL",
    cardinalSign: "NECK_SWELLING",
    tempCategory: "HIGH",
    temperatureRangeF: "104.5 - 107.0 °F (Extreme Hyperpyrexia)",
    keywords: ["hs", "galghotu", "pasteurella", "neck swelling", "घुर्रका", "घुर-घुर", "गलघोंटू", "गले में सूजन", "सांस फूलना"],
    overview: "पाश्चुरेला मल्टोसीडा (Pasteurella multocida Type B:2) जीवाणु जनित अति-घातक, आक्रामक एवं संक्रामक रोग। मानसून के समय जलभराव एवं तनाव से ग्रसित भैंसों व गायों में तीव्र गति से फैलता है। गले, निचले जबड़े व गलकंबल (dewlap) में गर्म, अत्यंत दर्दनाक सूजन तथा श्वासनली अवरोध से घुर-घुर की आवाज आना इसके पहचान चिह्न हैं।",
    confirmatoryLabTests: [
      {
        testName: "Methylene Blue / Leishman Stained Smear",
        sampleType: "गंभीर सूजन का एस्पिरेट या जुगुलर वेनस ब्लड",
        approxMRP: 150,
        significance: "सुरक्षा पिन की आकृति वाले विशिष्ट द्विध्रुवीय जीवाणु (Bipolar Organisms) का स्पष्ट दिखना।"
      },
      {
        testName: "Blood Agar Culture & Antimicrobial Sensitivity (ABST)",
        sampleType: "विसंक्रमित सिरिंज से लिया गया एडिमा फ्लुइड",
        approxMRP: 600,
        significance: "बिना हीमोलिसिस के सूक्ष्म, गोल बलगमी कॉलोनियों का विकास एवं उपयुक्त एंटीबायोटिक का चयन।"
      }
    ],
    injectionsTable: [
      {
        category: "तृतीय पीढ़ी सेफलोस्पोरिन (प्रथम विकल्प)",
        salt: "Ceftiofur Sodium",
        brands: ["Xyrofur (Intas)", "Excenel (Zoetis)", "Tiofur"],
        approxMRP: 460,
        doseRoute: "1.1 - 2.2 mg/kg (1 g प्रति 450 kg) Deep I/M प्रतिदिन 3 दिन",
        pregnancySafety: "SAFE (गर्भावस्था में पूर्णतः निरापद)"
      },
      {
        category: "ब्रॉड स्पेक्ट्रम फ्लोरोक्विनोलोन (द्वितीय विकल्प)",
        salt: "Enrofloxacin (100 mg/ml)",
        brands: ["Fortivir (Virbac)", "Floxidin", "Enrocin"],
        approxMRP: 220,
        doseRoute: "5.0 mg/kg (1 ml per 20 kg) Deep I/M अथवा slow I/V",
        pregnancySafety: "SAFE"
      },
      {
        category: "शक्तिशाली एंटी-इंफ्लेमेटरी (एडिमा घटाने हेतु)",
        salt: "Flunixin Meglumine",
        brands: ["Megludyne (Virbac)", "Flunitas"],
        approxMRP: 240,
        doseRoute: "2.2 mg/kg (10 ml per 250 kg) slow I/V",
        pregnancySafety: "SAFE"
      },
      {
        category: "श्वसन नलिका विस्फारक व एंटीहिस्टामिनिक",
        salt: "Chlorpheniramine Maleate",
        brands: ["Avil (MSD)", "Zeet Vet"],
        approxMRP: 85,
        doseRoute: "10 - 15 ml I/M",
        pregnancySafety: "SAFE"
      },
      {
        category: "सहायक कॉर्टिकोस्टेरॉयड (केवल गैर-गर्भित में श्वासरोध रोकने)",
        salt: "Dexamethasone Sodium Phosphate",
        brands: ["Dexona (Zydus)", "Decdan"],
        approxMRP: 45,
        doseRoute: "5 - 10 ml I/M or I/V (Strictly Non-Pregnant)",
        pregnancySafety: "UNSAFE (गर्भपात का अत्यंत उच्च खतरा)"
      }
    ],
    oralSupplements: [
      {
        name: "इलेक्ट्रोलाइट व बफर थेरेपी",
        brands: ["Electral Energy", "Microlyte Powder"],
        dose: "100 ग्राम 2 लीटर गुनगुने पानी में घोलकर नाल से (यदि निगलने में सक्षम हो)",
        pregnancySafety: "SAFE",
        purpose: "तीव्र सेप्टीसीमिया एवं लार बहने से हुए इलेक्ट्रोलाइट असंतुलन की भरपाई।"
      }
    ],
    ayurvedicHerbal: [
      {
        name: "Kaf-Go / Resposan Powder",
        keyIngredients: "Glycyrrhiza glabra (मुलेठी), Adhatoda vasica (वासा), Kantakari",
        approxMRP: 140,
        dose: "40 ग्राम गुनगुने पानी या शहद के साथ दिन में दो बार",
        indication: "श्वासनली के अवरोधक गाढ़े बलगम को पतला कर बाहर निकालना।"
      }
    ],
    homeopathicRemedies: [
      {
        remedy: "Crotalus Horridus 200C",
        potency: "200C",
        approxMRP: 110,
        dose: "15 बूँदें प्रति 1 घंटे में जीभ पर 4 खुराकें",
        indication: "तीव्र सेप्टिक सेप्टीसीमिया, रक्त का पतला होना और तेजी से फैलती गले की सूजन।"
      },
      {
        remedy: "Aconitum Napellus 1M",
        potency: "1M",
        approxMRP: 110,
        dose: "10 बूँदें शुरुआत में हर 30 मिनट पर (3 बार)",
        indication: "अचानक 106°F बुखार आना, तीव्र बेचैनी और गले में जलन।"
      }
    ],
    desiHomeRemedies: [
      {
        remedyName: "हल्दी-कपूर-सरसों तेल बाह्य सेक लेप",
        ingredients: "कच्ची पिसी हल्दी 100g, शुद्ध भीमसेनी कपूर 20g, सरसों का तेल 250ml",
        preparation: "सरसों के तेल को गुनगुना गरम करें, उसमें हल्दी और पिसा कपूर मिलाकर गले और जबड़े की सूजन पर हल्के हाथ से मालिश करें।",
        dosage: "दिन में 2 से 3 बार बाह्य लेप लगाएं।",
        precautions: "श्वासनली पर दबाव न डालें। यदि पशु हांफ रहा हो तो मुंह में जबरन कोई तरल न डालें।"
      }
    ],
    shedBiosecurity: [
      "संक्रमित पशु के थूक, लार और स्राव से दूषित सानी-पानी को गहरे गड्ढे में दबाकर ऊपर से ब्लीचिंग पाउडर डालें।",
      "बाड़े में सोडियम हाइपोक्लोराइट (1-2%) या 4% फॉर्मेलिन का स्प्रे करें।",
      "मानसून आगमन से पूर्व (मई-जून) सभी स्वस्थ पशुओं में HS एलम प्रेसिपिटेटेड वैक्सीन (Alum Adsorbed / Oil Adjuvant Vaccine) 5 ml S/C अनिवार्य रूप से लगवाएं।"
    ],
    clinicalCourse: {
      prognosis: "GRAVE (यदि सूजन श्वासनली को दबा दे और जीभ बाहर लटक जाए तो मृत्यु दर 80-90%; 12-24 घंटे के भीतर तत्काल एंटीबायोटिक मिलने पर सुधार संभव)",
      recoveryDaysMin: 4,
      recoveryDaysMax: 10,
      redFlags: ["जीभ सूजकर मुंह से बाहर निकल आना", "फेफड़ों से घरघराहट के साथ सांस रुकना", "तापमान का अचानक 106°F से गिरकर सब-नॉर्मल (98°F) होना जो सेप्टिक शॉक का संकेत है"]
    },
    pregnancyContraindications: {
      isSteroidContraindicated: true,
      contraindicatedDrugs: ["Dexamethasone Sodium Phosphate", "Betamethasone"],
      safeAlternatives: ["Isoflupredone Acetate (5-10 mg I/M यदि अति-आवश्यक हो)", "Flunixin Meglumine (पसंदीदा)"],
      clinicalWarning: "गर्भित पशुओं में गले की सूजन घटाने के लिए कभी डेक्सामेथासोन न दें, यह तत्काल गर्भपात (Abortion) करा देगा।"
    }
  },

  /* =========================================================================
     3. लंगड़िया (BLACK QUARTER - BQ)
     ========================================================================= */
  {
    id: "BQ",
    names: {
      english: "Black Quarter (BQ / Symptomatic Anthrax)",
      hindi: "लंगड़ा बुखार / चरचरा",
      local: ["जहरबाद", "सुजका", "एकहंगा", "चर्रैया", "काला बादी"]
    },
    category: "BACTERIAL",
    cardinalSign: "GAS_SWELLING",
    tempCategory: "HIGH",
    temperatureRangeF: "104.0 - 106.5 °F (High Grade Fever)",
    keywords: ["bq", "black quarter", "clostridium chauvoei", "crepitating swelling", "लंगड़िया", "चर्र-चर्र", "जहरबाद", "पुट्ठा सूजन"],
    overview: "क्लॉस्ट्रिडियम शोवेई (Clostridium chauvoei) बीजाणु-उत्पादक अवायवीय (anaerobic) जीवाणु जनित अति-तीव्र रोग। यह मुख्य रूप से 6 माह से 2 वर्ष के स्वस्थ, मोटे-ताजे बछड़े-बछड़ियों के भारी पुट्ठे और कंधे के मांसल भागों को प्रभावित करता है। सूजन वाले स्थान को दबाने पर गैस के बुलबुलों की चर्र-चर्र (crepitus) ध्वनि और गंभीर लंगड़ापन इसका विशिष्ट लक्षण है।",
    confirmatoryLabTests: [
      {
        testName: "Gram Staining of Muscle Exudate",
        sampleType: "सूजन के केंद्र से एस्पिरेट किया गया गहरा बदबूदार सीरम",
        approxMRP: 150,
        significance: "ग्राम-पॉजिटिव, गोल सिरों वाली छड़ें (Rods), जो एकल या जोड़ों में मध्य/उपकेंद्रिक बीजाणुओं (Spores) सहित दिखती हैं।"
      },
      {
        testName: "Fluorescent Antibody Technique (FAT)",
        sampleType: "मांसपेशी ऊतक बायोप्सी / स्मीयर",
        approxMRP: 750,
        significance: "क्लॉस्ट्रिडियम शोवेई एंटीजन के लिए विशिष्ट एवं 100% सटीक फ्लोरोसेंट पुष्टि।"
      }
    ],
    injectionsTable: [
      {
        category: "उच्च क्षमता पेनिसिलिन (ड्रग ऑफ चॉइस)",
        salt: "Benzylpenicillin Sodium (Crystalline) + Procaine Penicillin",
        brands: ["Bistrepen (Zydus)", "Pronapen", "Procaine Penicillin G"],
        approxMRP: 180,
        doseRoute: "20,000 - 40,000 IU/kg (40 लाख IU प्रति 150 kg) - आधी खुराक सूजन के चारों ओर स्थानीय रूप से एवं आधी गहरी I/M हर 12 घंटे में",
        pregnancySafety: "SAFE"
      },
      {
        category: "वैकल्पिक पेनिसिलिन + बीटा-लैक्टामेज इन्हिबिटर",
        salt: "Amoxicillin + Sulbactam",
        brands: ["Vetmox Plus (Pfizer)", "Amoxirum Forte", "Sulbactam-Amox"],
        approxMRP: 390,
        doseRoute: "10 mg/kg (3 g प्रति 300 kg) I/M or I/V हर 24 घंटे में 4 दिन",
        pregnancySafety: "SAFE"
      },
      {
        category: "एनाल्जेसिक एवं एंटीपायरेटिक",
        salt: "Meloxicam + Paracetamol",
        brands: ["Melonex Plus (Intas)", "Zobid-M", "Artis-M"],
        approxMRP: 120,
        doseRoute: "15 - 20 ml Deep I/M लगातार 3 दिन",
        pregnancySafety: "SAFE"
      },
      {
        category: "विटामिन बी-कॉम्प्लेक्स एवं लिवर एक्सट्रैक्ट",
        salt: "Vitamin B-Complex + Liver Extract",
        brands: ["Belamyl (Zydus)", "Tribivet", "Liposol"],
        approxMRP: 95,
        doseRoute: "10 ml Deep I/M",
        pregnancySafety: "SAFE"
      }
    ],
    oralSupplements: [
      {
        name: "टॉक्सिन बाइंडर व रूमेन एक्टिवेटर",
        brands: ["Toxiroak Gold", "Antidote Powder"],
        dose: "50 ग्राम दिन में दो बार गुनगुने पानी में",
        pregnancySafety: "SAFE",
        purpose: "अवायवीय जीवाणु टॉक्सिन के अवशोषण को धीमा करना।"
      }
    ],
    ayurvedicHerbal: [
      {
        name: "Himax Ointment / Scavon Spray",
        keyIngredients: "Camphor, Eucalyptus oil, Neem oil",
        approxMRP: 130,
        dose: "चीरा लगे घाव पर दिन में 2 बार छिड़कें",
        indication: "मक्खी के लार्वा (Maggots) को रोकना और जीवाणुरोधी आवरण देना।"
      }
    ],
    homeopathicRemedies: [
      {
        remedy: "Anthracinum 200C",
        potency: "200C",
        approxMRP: 125,
        dose: "15 बूँदें प्रति 2 घंटे में",
        indication: "मांसपेशियों का काला पड़ना, सड़न युक्त असहनीय दर्द और सेप्टिक टॉक्सिमिया।"
      },
      {
        remedy: "Carbo Vegetabilis 200C",
        potency: "200C",
        approxMRP: 95,
        dose: "15 बूँदें दिन में 3 बार",
        indication: "त्वचा के नीचे गैस का जमाव, अंगों का ठंडा पड़ना और पतन (Collapse) की स्थिति।"
      }
    ],
    desiHomeRemedies: [
      {
        remedyName: "एंटीसेप्टिक हाइड्रोजन पेरोक्साइड ड्रेनेज व नीम काढ़ा धावन",
        ingredients: "हाइड्रोजन पेरोक्साइड (H2O2 3%) 200ml, ताजा नीम की पत्तियां 500g, 2 लीटर पानी",
        preparation: "नीम की पत्तियों को पानी में उबालकर काढ़ा बनाएं। सर्जन द्वारा सूजन के निचले हिस्से में चीरा लगाकर अवायवीय वातावरण समाप्त करने हेतु H2O2 से फ्लश करें, फिर नीम के काढ़े से धोएं।",
        dosage: "दिन में एक बार केवल अनुभवी चिकित्सक की देखरेख में।",
        precautions: "बिना सर्जिकल विशेषज्ञता के अनियंत्रित चीरा न लगाएं।"
      }
    ],
    shedBiosecurity: [
      "मृत शव को कभी खुले में न चीरें (बीजाणु मिट्टी में 20+ वर्षों तक जीवित रहते हैं); शव को 6 फीट गहरे गड्ढे में कली चूना (Quicklime) डालकर दफनाएं।",
      "संक्रमित बाड़े की ऊपरी मिट्टी (Topsoil) को 6 इंच तक छीलकर बाहर फेंकें और सतह पर 10% फॉर्मेलिन स्प्रे करें।",
      "हर वर्ष वर्षा ऋतु पूर्व सभी 6 माह से 2 वर्ष आयु के गोवंश को BQ वैक्सीन (Polyvalent Clostridial Vaccine) 5 ml S/C लगाएं।"
    ],
    clinicalCourse: {
      prognosis: "GRAVE (बीमारी का आक्रमण अत्यंत तीव्र होता है; 24-48 घंटों में मृत्यु संभव। शुरुआती 12 घंटों में उच्च खुराक पेनिसिलिन मिलने पर ही बचाव संभव)",
      recoveryDaysMin: 7,
      recoveryDaysMax: 20,
      redFlags: ["सूजन वाली त्वचा का सूखकर चमड़े जैसा कड़ा व ठंडा हो जाना", "पशु का जमीन पर गिरकर दोबारा खड़े न हो पाना", "शरीर का तापमान अचानक 97°F तक गिर जाना"]
    },
    pregnancyContraindications: {
      isSteroidContraindicated: true,
      contraindicatedDrugs: ["Dexamethasone", "Hydrocortisone"],
      safeAlternatives: ["Meloxicam", "Flunixin Meglumine"],
      clinicalWarning: "बीक्यू रोग में प्रतिरक्षा तंत्र को दबाने वाले किसी भी स्टेरॉयड का प्रयोग जीवाणु जनित गैंग्रीन को तेजी से फैलाकर पशु की तत्काल मृत्यु का कारण बन सकता है।"
    }
  },

  /* =========================================================================
     4. तीव्र आफरा (ACUTE BLOAT / TYMPANY)
     ========================================================================= */
  {
    id: "BLOAT",
    names: {
      english: "Acute Ruminal Tympany (Bloat)",
      hindi: "तीव्र आफरा / पेट फूलना",
      local: ["अफारा", "पेट फूलवा", "ढोलक", "पेट की हवा"]
    },
    category: "METABOLIC",
    cardinalSign: "LEFT_FLANK_DRUM",
    tempCategory: "NORMAL",
    temperatureRangeF: "101.0 - 102.5 °F (Usually Normal; Subnormal in severe shock)",
    keywords: ["bloat", "tympany", "left flank", "frothy bloat", "rumen distension", "अफारा", "आफरा", "बायां पेट फूलना", "ढोल बजना"],
    overview: "प्रथम आमाशय (Rumen) में किण्वन गैसों (CO2 एवं CH4) का असामान्य संचय। यह अत्यधिक हरा बरसीम/लूसर्न खाने (झागदार आफरा) अथवा श्वासनली/ग्रासनली में आलू, शकरकंद आदि फंसने (मुक्त गैस आफरा) से होता है। बायाँ कोख (Left paralumbar fossa) ढोलक की तरह ऊपर उठ जाता है, डायाफ्राम पर दबाव से सांस फूलने लगती है और श्वासावरोध (Asphyxia) से मृत्यु हो सकती है।",
    confirmatoryLabTests: [
      {
        testName: "Stomach Tube Passage & Rumen Sound Auscultation",
        sampleType: "रूमेन सामग्री / गैस निकास परीक्षण",
        approxMRP: 100,
        significance: "बाएं फ्लैंक पर अंगुली से ठोकने पर स्पष्ट टिम्पैनिक 'पिंग' (Drum sound) और ट्यूब डालने पर मुक्त गैस बनाम झागदार तरल का विभेदन।"
      },
      {
        testName: "Rumen Fluid pH Analysis",
        sampleType: "रूमेन फ्लुइड (Stomach tube द्वारा)",
        approxMRP: 80,
        significance: "एसिडोसिस जनित आफरे में pH < 5.5; सामान्य झागदार आफरे में pH 6.0 - 6.8।"
      }
    ],
    injectionsTable: [
      {
        category: "एंटीस्पास्मोडिक एवं विसरल एनाल्जेसिक",
        salt: "Dicyclomine Hydrochloride + Paracetamol",
        brands: ["Spasmo-Vet", "Spasmonil Vet", "Biovet Spas"],
        approxMRP: 90,
        doseRoute: "10 - 15 ml Deep I/M",
        pregnancySafety: "SAFE"
      },
      {
        category: "रूमेन गतिशीलता उत्प्रेरक",
        salt: "Vitamin B1 + B6 + B12",
        brands: ["Tribivet (Intas)", "Belamyl", "Neuroxin-12"],
        approxMRP: 140,
        doseRoute: "10 ml I/M",
        pregnancySafety: "SAFE"
      },
      {
        category: "हृदय-श्वसन संबलन",
        salt: "Mephentermine Sulfate",
        brands: ["Termin (Neon)", "Mephentine"],
        approxMRP: 160,
        doseRoute: "3 - 5 ml I/M or slow I/V (यदि दम घुटने से बीपी गिर रहा हो)",
        pregnancySafety: "CAUTION"
      }
    ],
    oralSupplements: [
      {
        name: "एंटी-फोमिंग एवं कार्मिनेटिव सस्पेंशन (ड्रग ऑफ चॉइस)",
        brands: ["Bloatosil (Carus)", "Tympol Powder", "Tymposan Liquid"],
        dose: "100 मिली Bloatosil सीधे मुंह से नाल द्वारा, गंभीर स्थिति में 2 घंटे बाद दोहराएं",
        pregnancySafety: "SAFE",
        purpose: "झाग के सतही तनाव (Surface tension) को तोड़कर फंसी गैस को मुक्त करना।"
      },
      {
        name: "लाइव यीस्ट एवं माइक्रोबियल कल्चर",
        brands: ["Biosacc Bolus", "Ecotas", "Proviacc"],
        dose: "2 बोलस सुबह-शाम 3 दिन",
        pregnancySafety: "SAFE",
        purpose: "आफरे के बाद रूमेन के नष्ट हुए माइक्रोफ्लोरा (फर्मेंटेशन) को पुनः जीवित करना।"
      }
    ],
    ayurvedicHerbal: [
      {
        name: "Himalayan Batisa (Indian Herbs)",
        keyIngredients: "Hing, Sonth, Kala Namak, Ajwain",
        approxMRP: 80,
        dose: "100 ग्राम गुड़ और सरसों तेल में मिलाकर दें",
        indication: "पाचन अग्नि प्रदीप्त करना और गैस निष्कासन।"
      },
      {
        name: "Gas-O-Vet Liquid",
        keyIngredients: "Ferula foetida (हींग), Trachyspermum ammi (अजवाइन)",
        approxMRP: 110,
        dose: "100 मिली गुनगुने पानी में",
        indication: "आंतों की ऐंठन और गैस का तत्काल निवारण।"
      }
    ],
    homeopathicRemedies: [
      {
        remedy: "Nux Vomica 200C",
        potency: "200C",
        approxMRP: 95,
        dose: "15 बूँदें हर 30 मिनट पर (3 खुराक)",
        indication: "अत्यधिक दाना खाने से रुका हुआ अपच, पेट में मरोड़ और गोबर न होना।"
      },
      {
        remedy: "Carbo Vegetabilis 1M",
        potency: "1M",
        approxMRP: 110,
        dose: "10 बूँदें प्रति 15 मिनट में जीभ पर",
        indication: "ऊपरी पेट का अत्यधिक फूलना, सांस न ले पाना, ठंडा पसीना और नीली जीभ।"
      }
    ],
    desiHomeRemedies: [
      {
        remedyName: "पारंपरिक हींग-तारपीन-मीठा तेल वायु विदारक मिश्रण",
        ingredients: "शुद्ध हींग (Asafoetida) 15-20g, तारपीन का तेल (Turpentine Oil) 30-50ml, सरसों का मीठा तेल 300ml",
        preparation: "हींग को थोड़े गर्म पानी में घिसकर सरसों के तेल में मिलाएं, अंत में तारपीन का तेल मिलाकर अच्छी तरह हिलाएं।",
        dosage: "नाल से धीरे-धीरे पशु की जीभ पकड़े बिना पिलाएं।",
        precautions: "तारपीन का तेल 50ml से अधिक न डालें (गुर्दे पर असर संभव)। पशु के फेफड़ों में न जाने पाए।"
      }
    ],
    shedBiosecurity: [
      "पशु के मुंह में आड़ा लकड़ी का डंडा (bit) रस्सी से बांधें जिससे वह लगातार जुगाली जैसी चबाने की क्रिया करे और अधिक लार निकले (लार प्राकृतिक एंटी-फोमिंग एजेंट है)।",
      "बरसीम, अल्फाल्फा या गीला चारा खिलाने से पहले हमेशा सूखा भूसा (Dry Roughage) 2-3 किलो खिलाएं।",
      "अति-आपातकालीन जीवन रक्षक: यदि पशु गिर जाए और दम घुटने लगे तो बाएं कोख के केंद्र में Trocar & Cannula अथवा 16G लंबी सुई 90° पर चुभोकर तत्काल गैस बाहर निकालें।"
    ],
    clinicalCourse: {
      prognosis: "FAVORABLE TO GUARDED (समय पर गैस निकासी पर 95% रिकवरी; चोक या देर होने पर श्वासावरोध से 2 घंटे में मृत्यु संभव)",
      recoveryDaysMin: 1,
      recoveryDaysMax: 3,
      redFlags: ["जीभ नीली पड़ जाना (Cyanosis)", "आंखें फटी रह जाना और मुंह खोलकर हांफते हुए जमीन पर गिरना", "बाएं पेट की त्वचा अत्यधिक खिंचकर पत्थर जैसी सख्त होना"]
    },
    pregnancyContraindications: {
      isSteroidContraindicated: false,
      contraindicatedDrugs: ["Heavy Purgatives (उदा. मैग्नीशियम सल्फेट 500g से अधिक देने पर गर्भाशय पर खिंचाव)"],
      safeAlternatives: ["Bloatosil", "Liquid Paraffin (200-300 ml)"],
      clinicalWarning: "गर्भित पशु में ट्रोकार कैन्युला का प्रयोग केवल अत्यधिक जीवन-संकट के क्षण में ही अत्यधिक सावधानी से करें।"
    }
  },

  /* =========================================================================
     5. मिल्क फीवर (HYPOCALCEMIA / DOWNER COW)
     ========================================================================= */
  {
    id: "MILK_FEVER",
    names: {
      english: "Milk Fever (Hypocalcemia / Parturient Paresis)",
      hindi: "मिल्क फीवर / प्रसव कालीन पक्षाघात",
      local: ["सूतिका ज्वर", "कैलसियम टूटना", "गर्दन मुड़ना", "पछाड़"]
    },
    category: "METABOLIC",
    cardinalSign: "STERNAL_RECUMBENCY",
    tempCategory: "SUB",
    temperatureRangeF: "96.0 - 99.5 °F (Severe Subnormal Hypothermia)",
    keywords: ["milk fever", "hypocalcemia", "calcium", "sternal recumbency", "downer cow", "मिल्क फीवर", "गर्दन मोड़ना", "सूतिका ज्वर", "ठंडे कान"],
    overview: "ब्याने के 24 से 72 घंटों के भीतर रक्त सीरम में आयनित कैल्शियम (Ionic Calcium) का स्तर तेजी से (< 5 mg/dL) गिर जाने से उत्पन्न तीव्र उपापचयी रोग। इसमें 'फीवर' नाम होने के बावजूद शरीर का तापमान सामान्य से काफी कम हो जाता है। कान और सींग ठंडे पड़ जाते हैं, पशु अपनी गर्दन को मोड़कर अपनी कोख (flank) पर रखकर बैठ जाता है (Sternal recumbency) और उठने में असमर्थ हो जाता है।",
    confirmatoryLabTests: [
      {
        testName: "Serum Total & Ionized Calcium Level",
        sampleType: "रक्त सीरम (Clot Activator Tube)",
        approxMRP: 300,
        significance: "सामान्य स्तर 8.5-10.5 mg/dL; मिल्क फीवर में गिरकर 3.0-6.0 mg/dL रह जाता है।"
      },
      {
        testName: "Sulkowitch Urine Calcium Test",
        sampleType: "मूत्र (Urine)",
        approxMRP: 150,
        significance: "मूत्र में कैल्शियम अवक्षेपण का अभाव तात्कालिक फील्ड स्तर पर हाइपोकैल्सीमिया की पुष्टि करता है।"
      }
    ],
    injectionsTable: [
      {
        category: "कैल्शियम-मैग्नीशियम-फास्फोरस ग्लूकोनेट (ड्रग ऑफ चॉइस)",
        salt: "Calcium Borogluconate 25% + Magnesium & Phosphorus",
        brands: ["Mifex (Novartis/Elanco)", "Calborol", "Calcivet"],
        approxMRP: 380,
        doseRoute: "450 ml कुल मात्रा: 300 ml अत्यंत धीमी गति से नस में (Slow I/V) शरीर के तापमान पर गुनगुना करके + 150 ml चमड़ी के नीचे (S/C) तीन अलग स्थानों पर",
        pregnancySafety: "SAFE (प्रसव उपरांत हेतु विशिष्ट)"
      },
      {
        category: "अकार्बनिक फास्फोरस आपूर्ति",
        salt: "Toldimphos Sodium (200 mg/ml)",
        brands: ["Tonophosphan (MSD)", "Phosvet", "Alphos"],
        approxMRP: 290,
        doseRoute: "10 - 15 ml I/M or Slow I/V",
        pregnancySafety: "SAFE"
      },
      {
        category: "न्यूरो-मस्कुलर रीस्टोरेटर",
        salt: "Mecobalamin + Pyridoxine + Nicotinamide",
        brands: ["Tribivet (Intas)", "Neurobion"],
        approxMRP: 140,
        doseRoute: "10 ml I/M",
        pregnancySafety: "SAFE"
      },
      {
        category: "हार्ट टॉनिक व पेरिफेरल वैसोडाइलेटर",
        salt: "Caffeine and Sodium Benzoate",
        brands: ["Inj. Cardiovet", "Caf-Vet"],
        approxMRP: 120,
        doseRoute: "5 - 10 ml I/M (यदि नाड़ी अत्यंत कमजोर और मंद हो)",
        pregnancySafety: "SAFE"
      }
    ],
    oralSupplements: [
      {
        name: "आयनिक कैल्शियम जेल (चमत्कारिक त्वरित अवशोषण)",
        brands: ["Cal-Up Gel (Intas)", "Ostovet Gel", "Transcal Gel"],
        dose: "300 ग्राम की एक पूरी ट्यूब पशु के होश में आने और निगलने की क्षमता बहाल होने पर मुंह में पीछे लगाएं; 24 घंटे बाद दोहराएं",
        pregnancySafety: "SAFE",
        purpose: "रक्त में लगातार कैल्शियम स्तर बनाए रखना ताकि रिलैप्स (पुनः गिरना) न हो।"
      }
    ],
    ayurvedicHerbal: [
      {
        name: "Ayucal D Liquid",
        keyIngredients: "Cissus quadrangularis (हड़जोड़), प्राकृतिक हर्बल कैल्शियम",
        approxMRP: 180,
        dose: "100 मिली प्रतिदिन 10 दिन",
        indication: "हड्डियों से प्राकृतिक कैल्शियम मोबिलाइजेशन तेज करना।"
      }
    ],
    homeopathicRemedies: [
      {
        remedy: "Calcarea Phosphorica 30X / 200C",
        potency: "200C",
        approxMRP: 95,
        dose: "20 गोलियां या 15 बूँदें दिन में 3 बार",
        indication: "कैल्शियम चयापचय में सुधार और मांसपेशियों की शक्ति लौटाना।"
      },
      {
        remedy: "Cuprum Metallicum 200C",
        potency: "200C",
        approxMRP: 95,
        dose: "15 बूँदें प्रति 2 घंटे में",
        indication: "हाइपोकैल्सीमिया जनित मांसपेशियों में ऐंठन, कंपकंपी और गर्दन का मुड़ना।"
      }
    ],
    desiHomeRemedies: [
      {
        remedyName: "उष्णता वर्धक गुड़-सोंठ-अजवाइन ऊर्जा घोल (केवल होश में)",
        ingredients: "पुराना गुड़ 500g, सोंठ पाउडर 50g, अजवाइन 50g, जीरा 50g, मेथी 50g",
        preparation: "2 लीटर पानी में उबालकर काढ़ा बनाएं, गुनगुना होने पर पिलाएं।",
        dosage: "पशु के खड़े होने के बाद दिन में 2 बार दें।",
        precautions: "सख्त चेतावनी: जब तक पशु अपनी गर्दन सीधी न करे और कान हिलाना शुरू न करे, मुंह में कभी भी तरल न डालें, अन्यथा फेफड़ों में जाकर तत्काल मृत्यु हो जाएगी।"
      }
    ],
    shedBiosecurity: [
      "पशु के नीचे 6 इंच मोटी सूखी पुआल (सूखा धान का पुआल/भूसा) बिछाएं ताकि मांसपेशियों पर 'डाउनर सिंड्रोम' का दबाव न पड़े।",
      "पशु के दोनों पैरों को मोड़कर छाती के बल (Sternal Recumbency) सीधा बैठाएं और दोनों तरफ भूसे की बोरियां लगाएं ताकि पेट में गैस (Bloat) न बने।",
      "शरीर के तापमान को सामान्य करने हेतु पूरे शरीर पर सूखे जूट के बोरे लपेटें और कानों की तेल से मालिश करें।"
    ],
    clinicalCourse: {
      prognosis: "EXCELLENT IF TREATED EARLY (आई/वी कैल्शियम देने के 15-30 मिनट के भीतर 90% पशु गोबर-पेशाब कर खड़े हो जाते हैं; 24 घंटे उपेक्षित रहने पर डाउनर काउ सिंड्रोम व प्रोग्नोसिस खराब)",
      recoveryDaysMin: 1,
      recoveryDaysMax: 3,
      redFlags: ["I/V कैल्शियम देते समय हृदय गति का अनियमित या अत्यधिक तेज (Arrhythmia/Tachycardia) होना", "24 घंटे में दो बार कैल्शियम चढ़ाने के बाद भी न उठ पाना (Downer Cow Syndrome)", "आंखों की पुतलियों का स्थिर व फैल जाना"]
    },
    pregnancyContraindications: {
      isSteroidContraindicated: true,
      contraindicatedDrugs: ["Glucocorticoids (Dexamethasone) - ग्लूकोज बढ़ा सकते हैं पर कैल्शियम अवशोषण बाधित करते हैं"],
      safeAlternatives: ["Slow IV Calcium Borogluconate", "Oral Calcium Gels"],
      clinicalWarning: "Mifex I/V देते समय स्टेथोस्कोप से हृदय की धड़कन लगातार सुनें। यदि धड़कन छूटे या अनियंत्रित हो तो सुई तुरंत बंद करें (हार्ट फेलियर का खतरा)।"
    }
  },

  /* =========================================================================
     6. थनैला (ACUTE CLINICAL MASTITIS)
     ========================================================================= */
  {
    id: "MASTITIS",
    names: {
      english: "Acute Clinical Mastitis",
      hindi: "तीव्र थनैला रोग",
      local: ["गारद", "थनसूज", "हणवा", "छेछड़ा रोग", "स्तन प्रदाह"]
    },
    category: "BACTERIAL",
    cardinalSign: "UDDER_HARD",
    tempCategory: "NORMAL",
    temperatureRangeF: "101.5 - 104.0 °F (Elevated in systemic toxic coliform mastitis)",
    keywords: ["mastitis", "udder swelling", "flakes", "clots", "blood in milk", "थनैल", "थनैला", "अयन सूजन", "दूध में खून", "दूध में छिछड़े"],
    overview: "अयन (Udder) एवं स्तनों का अत्यधिक दर्दनाक जीवाणु संक्रमण (Staphylococcus aureus, Streptococcus agalactiae, E. coli आदि)। थन लाल, गर्म, सूजकर पत्थर जैसा कड़ा हो जाता है; दूध का रंग बदलकर पीला मटमैला पानी, खून अथवा थक्केदार (flakes/clots) हो जाता है। समय पर सही उपचार न होने पर थन स्थाई रूप से बेकार (fibrosed/blind teats) हो जाता है।",
    confirmatoryLabTests: [
      {
        testName: "California Mastitis Test (CMT)",
        sampleType: "चारों थनों का अलग-अलग दूध",
        approxMRP: 120,
        significance: "सोमैटिक सेल काउंट (SCC) अधिक होने पर जेल का गाढ़ा बनना जो सब-क्लिनिकल व क्लिनिकल थनैला तुरंत दर्शाता है।"
      },
      {
        testName: "Milk Culture & Antibiotic Sensitivity Test (ABST)",
        sampleType: "विसंक्रमित शीशी में थन साफ करके लिया गया मध्य-धारा दूध",
        approxMRP: 550,
        significance: "संक्रमणकारी विशिष्ट जीवाणु की पहचान एवं 100% सटीक एंटीबायोटिक का निर्धारण।"
      },
      {
        testName: "Milk pH Bromothymol Blue Paper Test",
        sampleType: "दूध की बूंदें",
        approxMRP: 50,
        significance: "दूध का क्षारीय (pH > 6.8) होना थनैला प्रदाह की पुष्टि करता है।"
      }
    ],
    injectionsTable: [
      {
        category: "अति-उच्च क्षमता सेफलोस्पोरिन + बीटा-लैक्टामेज इन्हिबिटर",
        salt: "Ceftriaxone Sodium + Tazobactam Sodium",
        brands: ["Intacef Tazo 3.375g (Intas)", "Tazomac", "Ceftroguard"],
        approxMRP: 480,
        doseRoute: "10 mg/kg (3.375 g प्रति 350-400 kg) Deep I/M or I/V प्रतिदिन 3-5 दिन",
        pregnancySafety: "SAFE"
      },
      {
        category: "वैकल्पिक शक्तिशाली फ्लोरोक्विनोलोन (कोलीफॉर्म/ई-कोलाई में)",
        salt: "Marbofloxacin (10%)",
        brands: ["Marbomet (Intas)", "Forcyl (Vetoquinol)", "Marbocare"],
        approxMRP: 520,
        doseRoute: "2 - 8 mg/kg (Single shot 8 mg/kg I/M or 2 mg/kg daily 3 days)",
        pregnancySafety: "SAFE"
      },
      {
        category: "गैर-स्टेरॉयडल प्रदाह नाशक एवं एंटी-टॉक्सिक",
        salt: "Flunixin Meglumine",
        brands: ["Megludyne (Virbac)", "Flunitas"],
        approxMRP: 240,
        doseRoute: "2.2 mg/kg (10 ml per 250 kg) Slow I/V 3 दिन",
        pregnancySafety: "SAFE"
      },
      {
        category: "फाइब्रिन एवं सूजन घोलक एंजाइम",
        salt: "Serratiopeptidase",
        brands: ["Fibrosin (Cadila)", "Bioserra Injection", "Serravet"],
        approxMRP: 160,
        doseRoute: "10 ml Deep I/M 3 दिन",
        pregnancySafety: "SAFE"
      },
      {
        category: "इंट्रामैमरी इन्फ्यूजन (थनों के भीतर चढ़ाने वाली ट्यूब)",
        salt: "Cefoperazone Sodium (250 mg)",
        brands: ["Cephatabs LC", "Mastilep Infusion", "Pendistrin-SH"],
        approxMRP: 110,
        doseRoute: "प्रभावित थन को पूर्णतः खाली करके, थनमुख साफ कर 1 ट्यूब पूरी चढ़ाएं और ऊपर की ओर मालिश करें, दिन में 1 बार 3 दिन",
        pregnancySafety: "SAFE"
      }
    ],
    oralSupplements: [
      {
        name: "ट्राइसोडियम साइट्रेट व विटामिन कॉम्प्लेक्स",
        brands: ["Masticare Sachet", "Mastiket Powder", "Mammitel"],
        dose: "1 पाउच (50-60 ग्राम) प्रतिदिन गुड़ में मिलाकर लगातार 5 दिन",
        pregnancySafety: "SAFE",
        purpose: "दूध के pH को सामान्य अम्लीय स्तर (6.5) पर लाना और ऊतकों का पुनर्निर्माण।"
      }
    ],
    ayurvedicHerbal: [
      {
        name: "Mastilep Gel (Ayurvet)",
        keyIngredients: "Paederia foetida, Eucalyptus oil, Cedrus deodara",
        approxMRP: 140,
        dose: "दूध दुहने के बाद पूरे अयन और थन पर दिन में 2-3 बार लेप करें",
        indication: "अयन की सूजन, कड़ापन और दर्द दूर करना।"
      }
    ],
    homeopathicRemedies: [
      {
        remedy: "Phytolacca Decandra 200C",
        potency: "200C",
        approxMRP: 95,
        dose: "15 बूँदें दिन में 4 बार",
        indication: "थन का पत्थर जैसा कड़ापन, छूने पर असहनीय दर्द और दूध में खून के रेशे।"
      },
      {
        remedy: "Silicea 30C",
        potency: "30C",
        approxMRP: 95,
        dose: "15 बूँदें दिन में 3 बार",
        indication: "थन से मवाद या दुर्गंधयुक्त गाढ़े छीछड़े आना, थन की गांठें घोलना।"
      }
    ],
    desiHomeRemedies: [
      {
        remedyName: "राष्ट्रीय डेयरी विकास बोर्ड (NDDB) सिद्ध घृतकुमारी-हल्दी-चूना लेप",
        ingredients: "ग्वारपाठा (Aloe vera) गूदा 250g, पिसी हल्दी 50g, खाने का चूना (Chuna/Calcium hydroxide) 15g",
        preparation: "तीनों को मिक्सी या सिलबट्टे पर पीसकर चिकना गाढ़ा लाल-नारंगी पेस्ट बनाएं। इसमें 50 ml पानी मिलाकर थोड़ा पतला करें।",
        dosage: "प्रभावित थन को अच्छी तरह खाली करके पूरे अयन पर दिन में 3-4 बार 5 दिन तक लगाएं।",
        precautions: "दुहने से पहले थनों को गुनगुने पानी से धोकर पोंछें ताकि चूना दूध में न मिले।"
      }
    ],
    shedBiosecurity: [
      "दूध दूहने के तुरंत बाद पशु को 45 मिनट तक बैठने न दें (चारा डालकर खड़ा रखें) क्योंकि दुहने के बाद टीट स्फिंक्टर छिद्र 30-45 मिनट तक खुले रहते हैं।",
      "मिल्किंग के बाद 0.5% पोवीडोन आयोडीन घोल में थन को डुबोएं (Post-milking Teat Dip)।",
      "बीमार थन का दूध हमेशा अंत में दूहें और उस दूध को जमीन पर गिराने के बजाय फिनाइल डालकर नष्ट करें।"
    ],
    clinicalCourse: {
      prognosis: "FAVORABLE IF TREATED IN <24 HOURS (देरी होने पर थन में फाइब्रोसिस गांठ बन जाती है और उस क्वार्टर का दूध हमेशा के लिए सूख जाता है)",
      recoveryDaysMin: 3,
      recoveryDaysMax: 10,
      redFlags: ["थन का ठंडा पड़कर नीला/काला होना (Gangrenous Mastitis - तत्काल विच्छेदन आवश्यक)", "पशु का अत्यधिक कांपना और सेप्टिक शॉक में जाना", "दूध की जगह शुद्ध बदबूदार रक्त रिसना"]
    },
    pregnancyContraindications: {
      isSteroidContraindicated: true,
      contraindicatedDrugs: ["Isoflupredone Acetate", "Dexamethasone"],
      safeAlternatives: ["Serratiopeptidase Enzymes", "Flunixin Meglumine"],
      clinicalWarning: "गाभिन पशुओं में थन की सूजन घटाने हेतु कभी भी डेक्सामेथासोन या अन्य अबोर्टीफेशियेंट स्टेरॉयड का प्रयोग न करें।"
    }
  },

  /* =========================================================================
     7. खुरपका-मुँहपका (FOOT-AND-MOUTH DISEASE - FMD)
     ========================================================================= */
  {
    id: "FMD",
    names: {
      english: "Foot and Mouth Disease (FMD)",
      hindi: "खुरपका-मुँहपका रोग",
      local: ["खुरपका", "मुंहपका", "रोहा", "खुरहा", "मुंहखुर"]
    },
    category: "VIRAL",
    cardinalSign: "MOUTH_BLISTERS",
    tempCategory: "HIGH",
    temperatureRangeF: "104.0 - 106.0 °F (Initial High Spike)",
    keywords: ["fmd", "aphthovirus", "blisters", "mouth ulcers", "salivation", "खुरपका", "मुँहपका", "लार टपकना", "छाले", "खुरों में घाव"],
    overview: "पिकॉर्नावायरस कुल के एपथोवायरस (Aphthovirus - टाइप O, A, Asia-1) जनित वायु-जनित, अति-संक्रामक विषाणु रोग। मुंह, मसूड़ों, जीभ, होंठ, थन तथा खुरों के बीच (interdigital space) में अत्यंत दर्दनाक पानी भरे छाले (vesicles) बनते हैं जो फूटकर गहरे घाव बन जाते हैं। मुंह से लगातार चिपचिपी, तारदार लार का लटकना और तीव्र लंगड़ापन इसके हॉलमार्क लक्षण हैं।",
    confirmatoryLabTests: [
      {
        testName: "Antigen Detection Enzyme-Linked Immunosorbent Assay (Ag-ELISA)",
        sampleType: "बिना फूटे छालों की झिल्ली (Vesicular Epithelium)",
        approxMRP: 600,
        significance: "विषाणु सीरोटाइप (O, A, अथवा Asia-1) की सटीक पुष्टि।"
      },
      {
        testName: "Reverse Transcription Polymerase Chain Reaction (RT-PCR)",
        sampleType: "ओरोफैरिंजियल फ्लुइड (Probang sample) या लार",
        approxMRP: 1200,
        significance: "विषाणु आरएनए (Viral RNA) का अत्यंत संवेदनशील मॉलिक्यूलर निर्धारण।"
      }
    ],
    injectionsTable: [
      {
        category: "द्वितीयक जीवाणु संक्रमण रोधी ब्रॉड स्पेक्ट्रम एंटीबायोटिक",
        salt: "Ceftriaxone Sodium",
        brands: ["Intacef 3g (Intas)", "Monocef O Vet", "Zocef"],
        approxMRP: 220,
        doseRoute: "7 - 10 mg/kg (3 g प्रति 350 kg) Deep I/M लगातार 3-5 दिन",
        pregnancySafety: "SAFE"
      },
      {
        category: "दर्द, प्रदाह व बुखार निवारक",
        salt: "Meloxicam + Paracetamol",
        brands: ["Melonex Plus (Intas)", "Zobid-M"],
        approxMRP: 120,
        doseRoute: "15 - 20 ml Deep I/M प्रतिदिन 3 दिन",
        pregnancySafety: "SAFE"
      },
      {
        category: "एंटीहिस्टामिनिक एवं उपकला पुनर्निर्माण",
        salt: "Chlorpheniramine Maleate",
        brands: ["Avil (MSD)", "Cadistin"],
        approxMRP: 85,
        doseRoute: "10 ml I/M",
        pregnancySafety: "SAFE"
      },
      {
        category: "उपकला ऊतक हीलिंग विटामिन",
        salt: "Vitamin A + D3 + E + H (Biotin)",
        brands: ["Inj. Intavita H (Intas)", "M录v脂t"],
        approxMRP: 290,
        doseRoute: "5 ml Deep I/M सप्ताह में दो बार",
        pregnancySafety: "SAFE"
      }
    ],
    oralSupplements: [
      {
        name: "इम्यूनोमॉड्यूलेटर एवं एंटीवायरल सप्लीमेंट",
        brands: ["Restobal Liquid", "Immuplus Liquid"],
        dose: "50 मिली दिन में दो बार 7 दिन",
        pregnancySafety: "SAFE",
        purpose: "वायरस के विरुद्ध रोग प्रतिरोधक क्षमता को तीव्र करना।"
      }
    ],
    ayurvedicHerbal: [
      {
        name: "Scavon Spray / D-Mag Spray",
        keyIngredients: "Eucalyptus, Turpentine oil, Neem, Camphor",
        approxMRP: 160,
        dose: "खुरों के घावों पर दिन में 3 बार छिड़कें",
        indication: "मक्खियों को दूर रखना, कीड़े (maggots) पड़ने से बचाना और घाव सुखाना।"
      },
      {
        name: "Tannic Acid / Boroglycerine Paint",
        keyIngredients: "Suhaga (Borax) 10g + Glycerine 90g",
        approxMRP: 80,
        dose: "मुंह के छालों पर दिन में 3-4 बार नर्म कपड़े से लगाएं",
        indication: "मुंह के छालों का दर्द शांत करना और लार बहाव रोकना।"
      }
    ],
    homeopathicRemedies: [
      {
        remedy: "Variolinum 200C",
        potency: "200C",
        approxMRP: 110,
        dose: "15 बूँदें सुबह-शाम 5 दिन",
        indication: "विषाणु जनित छालों के प्रसार को रोकना।"
      },
      {
        remedy: "Mercurius Solubilis 200C",
        potency: "200C",
        approxMRP: 95,
        dose: "15 बूँदें दिन में 3 बार",
        indication: "मुंह से अत्यधिक तारदार बदबूदार लार गिरना, मसूड़ों व जीभ पर छाले।"
      }
    ],
    desiHomeRemedies: [
      {
        remedyName: "लाल दवा (पोटाश) मुख प्रक्षालन एवं सुहागा-शहद लेप",
        ingredients: "पोटेशियम परमैंगनेट (KMnO4) 1g, 1000ml पानी (हल्का गुलाबी घोल), भुना हुआ सुहागा (टंकण भस्म) 20g, शुद्ध शहद 100g",
        preparation: "गुलाबी पानी से मुंह व खुरों को दिन में 2 बार धोएं। सुहागा और शहद मिलाकर मुंह के छालों पर लगाएं।",
        dosage: "दिन में 2-3 बार घावों पर लगाएं।",
        precautions: "पोटाश का घोल गहरा जामुनी न बनाएं (जलने का खतरा); केवल हल्का गुलाबी बनाएं।"
      }
    ],
    shedBiosecurity: [
      "बाड़े के मुख्य द्वार पर फुट-बाथ (Foot-bath) बनाएं जिसमें 4% वाशिंग सोडा (Sodium Carbonate) अथवा 2% कास्टिक सोडा का घोल भरा हो।",
      "छोटे बछड़े-बछड़ियों को संक्रमित मां का दूध कभी न पीने दें (मायोकार्डिटिस / 'टाइगर हार्ट' से बछड़ों की आकस्मिक मृत्यु हो जाती है)।",
      "छह-छह माह के अंतराल पर पूरे पशु समूह में नियमित FMD टीकाकरण (Oil Adjuvanted Vaccine 2-3 ml Deep I/M) सुनिश्चित करें।"
    ],
    clinicalCourse: {
      prognosis: "FAVORABLE FOR SURVIVAL, POOR FOR PRODUCTION (वयस्क पशुओं में मृत्यु दर कम 2-5% है, किंतु दूध उत्पादन में स्थाई भारी गिरावट, बांझपन व पैंटिंग/हांफना सिंड्रोम होता है)",
      recoveryDaysMin: 10,
      recoveryDaysMax: 25,
      redFlags: ["दूध पीते छोटे बछड़े का बिना लक्षण अचानक गिरकर मर जाना (Tiger Heart Disease)", "खुर का खोल (Hoof capsule) उखड़कर अलग हो जाना", "गर्मी सहन न कर पाना और लगातार हांफते रहना (Endocrine Panters syndrome)"]
    },
    pregnancyContraindications: {
      isSteroidContraindicated: true,
      contraindicatedDrugs: ["All Glucocorticoids (Dexamethasone, Prednisolone) - वायरस गुणन बढ़ाते हैं और गर्भपात करते हैं"],
      safeAlternatives: ["Meloxicam + Paracetamol", "Chlorpheniramine Maleate"],
      clinicalWarning: "FMD में स्टेरॉयड देने से पशु की प्राकृतिक एंटीबॉडी बनने की प्रक्रिया पूरी तरह नष्ट हो जाती है।"
    }
  },

  /* =========================================================================
     8. बबेसियोसिस / लाल पेशाब (BABESIOSIS / REDWATER)
     ========================================================================= */
  {
    id: "BABESIOSIS",
    names: {
      english: "Bovine Babesiosis (Redwater Fever / Tick Fever)",
      hindi: "बबेसियोसिस / लाल पेशाब रोग",
      local: ["रक्तमूतरा", "लालिमूतर", "चिचड़ी बुखार", "कॉफी पेशाब"]
    },
    category: "PROTOZOAL",
    cardinalSign: "RED_URINE",
    tempCategory: "HIGH",
    temperatureRangeF: "105.0 - 107.5 °F (Extremely High Continuous Fever)",
    keywords: ["babesiosis", "redwater", "babesia bigemina", "hemoglobinuria", "बबेसियोसिस", "लाल पेशाब", "कॉफी रंग", "चिचड़ी बुखार", "रक्तमूतरा"],
    overview: "बबेशिया बाइजेमिना (Babesia bigemina) अथवा बबेशिया बोविस इंट्रा-एरिथ्रोसाइटिक प्रोटोजोआ परजीवी द्वारा जनित जानलेवा रोग, जो रीपीसेफैलस (बूफिलस) माइक्रोप्लस चिचड़ी (Ticks) द्वारा फैलता है। परजीवी लाल रक्त कोशिकाओं (RBCs) को बड़े पैमाने पर तोड़ते हैं, जिससे हीमोग्लोबिन मूत्र में उत्सर्जित होने लगता है और पेशाब गहरा लाल, चेरी रेड अथवा डार्क कॉफी रंग का हो जाता है।",
    confirmatoryLabTests: [
      {
        testName: "Giemsa Stained Thin Blood Smear Examination",
        sampleType: "कान की नोक या पूंछ के सिरे से पेरीफेरल कैपिलरी ब्लड",
        approxMRP: 150,
        significance: "आरबीसी (RBC) के भीतर नाशपाती के आकार के दोहरे परजीवी (Paired Pyriform Merozoites) तीव्र कोण पर जुड़े दिखाई देते हैं।"
      },
      {
        testName: "Packed Cell Volume (PCV) & Hemoglobin (Hb)",
        sampleType: "EDTA एंटीकोग्युलेटेड होल ब्लड",
        approxMRP: 180,
        significance: "पीसीवी का सामान्य 30-35% से गिरकर < 15% और हीमोग्लोबिन का < 5 g/dL रह जाना गंभीर हीमोलिसिस दर्शाता है।"
      },
      {
        testName: "Urine Dipstick Test for Hemoglobinuria",
        sampleType: "ताजा मूत्र",
        approxMRP: 80,
        significance: "बिना तलछट (centrifugation) के संपूर्ण मूत्र का एक समान गहरा लाल/भूरा रहना (हीमोग्लोबिन्यूरिया बनाम हीमेचुरिया का विभेदन)।"
      }
    ],
    injectionsTable: [
      {
        category: "विशिष्ट एंटी-बबेशियल (ड्रग ऑफ चॉइस)",
        salt: "Diminazene Aceturate (7% with Phenazone)",
        brands: ["Berenil RTU (MSD)", "Bazenil", "Diminasan"],
        approxMRP: 320,
        doseRoute: "3.5 - 5.0 mg/kg (1 ml प्रति 15-20 kg) - Deep Intramuscular (I/M) दो अलग-अलग स्थानों पर बांटकर लगाएं",
        pregnancySafety: "SAFE (सावधानी के साथ सुरक्षित)"
      },
      {
        category: "दीर्घकालिक वैकल्पिक एंटी-बबेशियल",
        salt: "Imidocarb Dipropionate (120 mg/ml)",
        brands: ["Imizol", "Imidopet"],
        approxMRP: 850,
        doseRoute: "1.2 mg/kg (1 ml per 100 kg) Subcutaneous (S/C)",
        pregnancySafety: "CAUTION"
      },
      {
        category: "दर्द एवं तेज बुखार निवारक",
        salt: "Meloxicam + Paracetamol",
        brands: ["Melonex Plus (Intas)", "Zobid-M"],
        approxMRP: 120,
        doseRoute: "15 - 20 ml Deep I/M",
        pregnancySafety: "SAFE"
      },
      {
        category: "आयरन इंजेक्शन (गंभीर रक्ताल्पता हेतु)",
        salt: "Iron Sorbitol Citric Acid Complex",
        brands: ["Inj. Feritas (Intas)", "Imferon Vet"],
        approxMRP: 190,
        doseRoute: "10 ml Deep I/M (तीसरे दिन लगाएं, तीव्र हीमोलिसिस के दौरान तुरंत न दें)",
        pregnancySafety: "SAFE"
      },
      {
        category: "रक्त मात्रा पुनर्स्थापक तरल (IV फ्लूइड्स)",
        salt: "Dextrose Normal Saline (DNS 5%)",
        brands: ["DNS Infusion"],
        approxMRP: 75,
        doseRoute: "2 - 3 लीटर Slow I/V (गुर्दे को हीमोग्लोबिन से जाम होने से बचाने हेतु)",
        pregnancySafety: "SAFE"
      }
    ],
    oralSupplements: [
      {
        name: "हेमेटिनिक एवं आरबीसी जनरेटर",
        brands: ["Sharkoferrol Vet", "RBC-Up Syrup"],
        dose: "50 मिली दिन में दो बार 15 दिन",
        pregnancySafety: "SAFE",
        purpose: "तीव्र हीमोलिटिक संकट के बाद हीमोग्लोबिन का तीव्र पुनर्निर्माण।"
      }
    ],
    ayurvedicHerbal: [
      {
        name: "Liv.52 DS Liquid",
        keyIngredients: "Himsra, Kasani, Mandur Bhasma",
        approxMRP: 210,
        dose: "50 मिली दिन में दो बार 10 दिन",
        indication: "हीमोग्लोबिन टूटने से उत्पन्न पीलिया (Jaundice) और लिवर क्षति से बचाव।"
      }
    ],
    homeopathicRemedies: [
      {
        remedy: "Crotalus Horridus 200C",
        potency: "200C",
        approxMRP: 110,
        dose: "15 बूँदें प्रति 2 घंटे में जीभ पर",
        indication: "रक्त वाहिकाओं के भीतर आरबीसी का टूटना, पेशाब में रक्त व अत्यधिक कमजोरी।"
      },
      {
        remedy: "Phosphorus 200C",
        potency: "200C",
        approxMRP: 95,
        dose: "15 बूँदें दिन में 3 बार",
        indication: "लाल-भूरा पेशाब, पीलिया युक्त श्लेष्मा झिल्ली और यकृत प्रदाह।"
      }
    ],
    desiHomeRemedies: [
      {
        remedyName: "शीतल इलेक्ट्रोलाइट मिश्री-गोंद कतीरा कायाकल्प शरबत",
        ingredients: "गोंद कतीरा 50g (रात को भिगोया हुआ), धागे वाली मिश्री 200g, कच्चा नारियल पानी 1 लीटर, सोंठ 10g",
        preparation: "फूले हुए गोंद कतीरे को मिश्री और नारियल पानी में घोलकर गाढ़ा शरबत बनाएं।",
        dosage: "दिन में 2 बार नाल से धीरे-धीरे पिलाएं।",
        precautions: "यह सहायक पोषण है, बेरेनिल इंजेक्शन का विकल्प नहीं है।"
      }
    ],
    shedBiosecurity: [
      "चिचड़ियों (Ticks) का समूल विनाश: फ्लुमेथ्रिन (Flumethrin 1% Pour-on) 1 ml प्रति 10 kg शरीर भार पीठ की रीढ़ पर गर्दन से पूंछ तक डालें।",
      "बाड़े की दीवारों की दरारों में छिपी चिचड़ियों को मारने हेतु ब्लो-लैंप (Flame gun) से आग का सेक दें या डेल्टामेथ्रिन का छिड़काव करें।",
      "संक्रमित क्षेत्रों से लाए गए नए पशुओं को 21 दिन तक अलग रखें और चिचड़ी मुक्त करें।"
    ],
    clinicalCourse: {
      prognosis: "FAVORABLE IF TREATED BEFORE PCV DROPS BELOW 12% (यदि मूत्र का रंग कॉफी जैसा काला हो जाए और पीलिया गहरा हो तो प्रोग्नोसिस संदेहास्पद)",
      recoveryDaysMin: 4,
      recoveryDaysMax: 14,
      redFlags: ["पेशाब का रंग लाल से बदलकर बिल्कुल गहरा काला-कॉफी हो जाना", "आंखों व मसूड़ों का सफेद (Porcelain white) होकर गहरा पीला पड़ना", "पशु का खड़े-खड़े लड़खड़ाकर गिर जाना (Anoxic Anoxia)"]
    },
    pregnancyContraindications: {
      isSteroidContraindicated: true,
      contraindicatedDrugs: ["Dexamethasone Sodium Phosphate", "Betamethasone"],
      safeAlternatives: ["Meloxicam (Melonex)", "Flunixin Meglumine"],
      clinicalWarning: "लाल पेशाब में कभी भी डेक्सामेथासोन न लगाएं, यह इम्युनिटी गिराकर परजीवी की संख्या कई गुना बढ़ा देता है और गर्भपात कराता है।"
    }
  },

  /* =========================================================================
     9. कीटोशिस (KETOSIS / ACETONEMIA)
     ========================================================================= */
  {
    id: "KETOSIS",
    names: {
      english: "Bovine Ketosis (Acetonemia)",
      hindi: "कीटोशिस / एसीटोनेमिया",
      local: ["कीटो", "दूध का सूखना", "मीठा पेशाब", "घास-भूसा खाना-दाना छोड़ना"]
    },
    category: "METABOLIC",
    cardinalSign: "SWEET_BREATH",
    tempCategory: "NORMAL",
    temperatureRangeF: "101.0 - 102.5 °F (Usually Normal)",
    keywords: ["ketosis", "acetonemia", "sweet breath", "acetone", "bhba", "कीटोशिस", "कीटोसिस", "मीठी गंध", "भूसा खाना दाना छोड़ना", "दूध घटना"],
    overview: "अधिक दूध देने वाली गायों-भैंसों में ब्याने के 2 से 8 सप्ताह के भीतर ऊर्जा की भारी नकारात्मक कमी (Negative Energy Balance) से उत्पन्न चयापचय रोग। ग्लूकोज की कमी के कारण शरीर वसा (Adipose fat) को तेजी से पिघलाता है जिससे रक्त में कीटोन बॉडीज (BHBA, एसीटोएसिटिक एसिड, एसीटोन) जमा हो जाती हैं। सांस व दूध से मीठी मीठी (sweet chloroform/fruity) गंध आती है, पशु दाना खाना बंद करके केवल सूखा भूसा खाता है।",
    confirmatoryLabTests: [
      {
        testName: "Rothera's Nitroprusside Test",
        sampleType: "ताजा दूध अथवा मूत्र",
        approxMRP: 100,
        significance: "कीटोन बॉडीज की उपस्थिति में रिंग पर गहरा बैंगनी/जामुनी (Permanganate color) रंग तत्काल उभरना।"
      },
      {
        testName: "Blood Beta-Hydroxybutyrate (BHBA) Strip Test",
        sampleType: "कान से एक बूंद ताजा रक्त (Handheld Ketometer)",
        approxMRP: 250,
        significance: "सबक्लिनिकल कीटोशिस > 1.2 - 1.4 mmol/L; क्लिनिकल कीटोशिस > 3.0 mmol/L।"
      }
    ],
    injectionsTable: [
      {
        category: "अति-सांद्रित ग्लूकोज थेरेपी (ड्रग ऑफ चॉइस)",
        salt: "Dextrose 20% or 25% or 50% Infusion",
        brands: ["Dextrose 25%", "D50 Infusion"],
        approxMRP: 120,
        doseRoute: "500 - 1000 ml Rapid I/V (नस में तेजी से चढ़ाएं)",
        pregnancySafety: "SAFE"
      },
      {
        category: "ग्लूकोनियोजेनिक कोर्टिकोस्टेरॉयड (यकृत में ग्लूकोज निर्माण हेतु)",
        salt: "Isoflupredone Acetate (2 mg/ml)",
        brands: ["Predef 2X (Zoetis)", "Isoflud"],
        approxMRP: 290,
        doseRoute: "10 - 20 mg (5 - 10 ml) Deep I/M सिंगल शॉट",
        pregnancySafety: "CAUTION (गर्भित में अंतिम तिमाही में न दें, ब्यांत के बाद पूर्ण सुरक्षित)"
      },
      {
        category: "विटामिन बी12 एवं प्रोपियोनेट उत्प्रेरक",
        salt: "Mecobalamin + Pyridoxine + Nicotinamide",
        brands: ["Tribivet (Intas)", "Neurobion Vet"],
        approxMRP: 140,
        doseRoute: "10 ml I/M लगातार 3 दिन",
        pregnancySafety: "SAFE"
      },
      {
        category: "फास्फोरस संबलन",
        salt: "Toldimphos Sodium",
        brands: ["Tonophosphan (MSD)", "Phosvet"],
        approxMRP: 290,
        doseRoute: "10 ml I/M",
        pregnancySafety: "SAFE"
      }
    ],
    oralSupplements: [
      {
        name: "ग्लूकोज पूर्ववर्ती प्रोपिलीन ग्लाइकोल (परम आवश्यक)",
        brands: ["Ener-G Liquid", "Ketomalt", "Propysol Liquid"],
        dose: "200 - 250 मिली दिन में दो बार 3 दिन, फिर 100 मिली 3 दिन",
        pregnancySafety: "SAFE",
        purpose: "यकृत में सीधे जाकर प्रोपियोनिक एसिड द्वारा ग्लूकोज का प्राकृतिक निर्माण।"
      },
      {
        name: "नियासिन (विटामिन B3) एवं यीस्ट बोलस",
        brands: ["Niacin Bolus", "Biosacc Gold"],
        dose: "2 बोलस प्रतिदिन 5 दिन",
        pregnancySafety: "SAFE",
        purpose: "वसा टूटने की गति को नियंत्रित करना और भूख खोलना।"
      }
    ],
    ayurvedicHerbal: [
      {
        name: "Ruchamax + Liv.52 Powder",
        keyIngredients: "Picrorhiza kurroa, Zingiber officinale, Andrographis paniculata",
        approxMRP: 160,
        dose: "50 ग्राम पाउडर गुड़ में सानकर दिन में 2 बार",
        indication: "रूमेन के पीएच को स्थिर कर दाना-चारा खाने की इच्छा जगाना।"
      }
    ],
    homeopathicRemedies: [
      {
        remedy: "Lycopodium Clavatum 200C",
        potency: "200C",
        approxMRP: 95,
        dose: "15 बूँदें दिन में 3 बार",
        indication: "भूख का विचित्र व्यवहार, दाना छोड़कर केवल सूखा भूसा खाना, दाहिना पेट फूलना।"
      },
      {
        remedy: "Chelidonium Majus 30C",
        potency: "30C",
        approxMRP: 95,
        dose: "15 बूँदें दिन में 3 बार",
        indication: "यकृत में वसा का जमाव (Fatty Liver) और सुस्ती।"
      }
    ],
    desiHomeRemedies: [
      {
        remedyName: "पारंपरिक गुड़-सरसों तेल ऊर्जा लापसी",
        ingredients: "पुराना देसी गुड़ 250g, शुद्ध सरसों का तेल 100ml, गेहूं का दलिया 500g",
        preparation: "दलिया पकाकर उसमें गुड़ और कच्चा सरसों का तेल अच्छी तरह घोंट लें।",
        dosage: "गुनगुना करके दिन में एक बार 5 दिन खिलाएं।",
        precautions: "तेल की मात्रा 100ml से अधिक न करें, अन्यथा रूमेन फर्मेंटेशन सुस्त हो सकता है।"
      }
    ],
    shedBiosecurity: [
      "ब्याने के बाद उच्च उत्पादक पशु के राशन में अचानक भारी बदलाव न करें; दाने की मात्रा धीरे-धीरे बढ़ाएं।",
      "पशु को अत्यधिक मोटा (Over-conditioned - BCS > 4.0) न होने दें; शुष्क काल (Dry period) में संतुलित राशन दें।",
      "ताजा स्वच्छ पानी 24 घंटे उपलब्ध रखें ताकि कीटोन बॉडीज का गुर्दे द्वारा निष्कासन निर्बाध हो सके।"
    ],
    clinicalCourse: {
      prognosis: "EXCELLENT (ग्लूकोज ड्रिप व प्रोपिलीन ग्लाइकोल शुरू करते ही 24 से 48 घंटे में दूध व भूख में सुधार)",
      recoveryDaysMin: 2,
      recoveryDaysMax: 7,
      redFlags: ["नर्वस कीटोसिस: पशु का अपने पैरों को चाटना, खूंटे को चबाना और पागलों जैसा आक्रामक व्यवहार करना", "तीव्र वजन ह्रास (प्रतिदिन 3-5 किलो वजन घटना)", "यकृत का पूरी तरह वसायुक्त होकर फेल होना (Hepatic Lipidosis)"]
    },
    pregnancyContraindications: {
      isSteroidContraindicated: true,
      contraindicatedDrugs: ["Dexamethasone Sodium Phosphate", "Betamethasone (यदि गलती से अंतिम तिमाही में कीटोशिस हो)"],
      safeAlternatives: ["Propylene Glycol Oral", "Dextrose 25% I/V"],
      clinicalWarning: "ब्याने से पूर्व यदि कीटोसिस के लक्षण दिखें तो डेक्सामेथासोन कभी न दें; ब्याने के बाद Predef-2X सुरक्षित रूप से दिया जा सकता है।"
    }
  },

  /* =========================================================================
     10. फिड़किया (ENTEROTOXEMIA / PULPY KIDNEY)
     ========================================================================= */
  {
    id: "ENTEROTOXEMIA",
    names: {
      english: "Enterotoxemia (Pulpy Kidney Disease)",
      hindi: "फिड़किया / आंत्रविषाक्तता",
      local: ["गुर्दा गलनी", "फड़किया", "विषकिया", "अचानक मौत"]
    },
    category: "BACTERIAL",
    cardinalSign: "OPISTHOTONOS",
    tempCategory: "HIGH",
    temperatureRangeF: "103.5 - 105.5 °F (Terminal Subnormal)",
    keywords: ["enterotoxemia", "pulpy kidney", "clostridium perfringens", "opisthotonos", "फिड़किया", "फड़किया", "तारे देखना", "अचानक मौत", "बकरी"],
    overview: "क्लॉस्ट्रिडियम परफ्रिंजेंस टाइप डी (Clostridium perfringens Type D) जीवाणु द्वारा आंतों में उत्पन्न अत्यधिक शक्तिशाली एप्सिलॉन टॉक्सिन (Epsilon Toxin) जनित तीव्रतम संक्रामक रोग। यह भेड़, बकरी और बछड़ों में अत्यधिक पौष्टिक नया हरा चारा या अचानक अधिक दाना खाने से होता है। सिर को ऊपर-पीछे खींचना (Opisthotonos/Star-gazing), दांत किटकिटाना, आक्षेप (Convulsions) और कुछ ही घंटों में आकस्मिक मृत्यु इसके लक्षण हैं।",
    confirmatoryLabTests: [
      {
        testName: "Post-Mortem Kidney Softening & Glucosuria Test",
        sampleType: "मृत्यु के तुरंत बाद गुर्दा ऊतक एवं मूत्राशय का मूत्र",
        approxMRP: 150,
        significance: "मृत्यु के 1-2 घंटे में गुर्दों का जेली जैसा पिलपिला गल जाना (Pulpy Kidney) और यूरिन ग्लूकोज टेस्ट का 3+ से 4+ पॉजिटिव आना।"
      },
      {
        testName: "Epsilon Toxin Detection by ELISA",
        sampleType: "छोटी आंत (Ileum) की सामग्री",
        approxMRP: 650,
        significance: "क्लॉस्ट्रिडियल एप्सिलॉन प्रोटॉक्सिन/टॉक्सिन की अचूक प्रयोगशाला पुष्टि।"
      }
    ],
    injectionsTable: [
      {
        category: "विशिष्ट एंटी-टॉक्सिन (तीव्र अवस्था में जीवन रक्षक)",
        salt: "Clostridium perfringens Type D Clostridial Antitoxin",
        brands: ["ET Antitoxin (IVRI / Private Biologicals)"],
        approxMRP: 450,
        doseRoute: "10 - 20 ml Subcutaneous (S/C) or slow I/V तत्काल",
        pregnancySafety: "SAFE"
      },
      {
        category: "उच्च क्षमता जीवाणुरोधी एंटीबायोटिक",
        salt: "Oxytetracycline Dihydrate (Long Acting 200 mg/ml)",
        brands: ["Terramycin LA (Pfizer)", "Oxytetracycline LA"],
        approxMRP: 140,
        doseRoute: "20 mg/kg (1 ml per 10 kg) Deep I/M",
        pregnancySafety: "CAUTION"
      },
      {
        category: "वैकल्पिक पेनिसिलिन थेरेपी",
        salt: "Crystalline Penicillin G Sodium",
        brands: ["Penicillin G Injection"],
        approxMRP: 90,
        doseRoute: "20,000 IU/kg I/V or I/M हर 8 घंटे में",
        pregnancySafety: "SAFE"
      },
      {
        category: "आक्षेप एवं तंत्रिका शामक",
        salt: "Diazepam Injection",
        brands: ["Calmpose (Ranbaxy)", "Valium"],
        approxMRP: 65,
        doseRoute: "0.5 - 1.0 mg/kg Slow I/V or I/M (आक्षेप रोकने हेतु)",
        pregnancySafety: "CAUTION"
      },
      {
        category: "एनाल्जेसिक एवं एंटी-टॉक्सिक",
        salt: "Flunixin Meglumine",
        brands: ["Megludyne (Virbac)"],
        approxMRP: 240,
        doseRoute: "2.2 mg/kg Slow I/V or I/M",
        pregnancySafety: "SAFE"
      }
    ],
    oralSupplements: [
      {
        name: "सक्रिय चारकोल एवं टॉक्सिन अवशोषक",
        brands: ["Toxisorb Susp", "Acti-Char Powder"],
        dose: "1-2 ग्राम प्रति किलो शरीर भार पानी में घोलकर नाल से",
        pregnancySafety: "SAFE",
        purpose: "आंतों में स्वतंत्र एप्सिलॉन टॉक्सिन को अपने भीतर सोखकर मल द्वारा बाहर निकालना।"
      }
    ],
    ayurvedicHerbal: [
      {
        name: "Neblon Powder / Diaroak",
        keyIngredients: "Holarrhena antidysenterica (कुटज), Punica granatum (अनार छिलका)",
        approxMRP: 90,
        dose: "15-20 ग्राम दिन में 2 बार छाछ के साथ",
        indication: "आंतों के रक्तस्राव और श्लेष्मयुक्त दस्त को नियंत्रित करना।"
      }
    ],
    homeopathicRemedies: [
      {
        remedy: "Nux Vomica 1M",
        potency: "1M",
        approxMRP: 110,
        dose: "10 बूँदें प्रति 30 मिनट में 3 बार",
        indication: "दाना खाने के बाद अचानक पेट में असहनीय दर्द, आक्षेप और मरोड़।"
      },
      {
        remedy: "Cuprum Metallicum 200C",
        potency: "200C",
        approxMRP: 95,
        dose: "10 बूँदें हर 1 घंटे में",
        indication: "गर्दन का पीछे मुड़ना (Star gazing), जबड़े भिंचना और हिंसक झटके।"
      }
    ],
    desiHomeRemedies: [
      {
        remedyName: "आपातकालीन मीठा सोडा-फिटकरी आंत्र प्रशामक घोल",
        ingredients: "मीठा सोडा (Sodium Bicarbonate) 30g, भुनी पिसी फिटकरी 5g, ठंडी ताजी छाछ 250ml",
        preparation: "छाछ में मीठा सोडा और भुनी फिटकरी मिलाकर तुरंत पिलाएं।",
        dosage: "एकल खुराक (Single emergency dose)।",
        precautions: "यदि पशु बेहोश हो और झटके ले रहा हो तो कभी नाल न दें।"
      }
    ],
    shedBiosecurity: [
      "बरसात के मौसम में या फसल कटाई के बाद भेड़ों/बकरियों को अचानक नए गेहूं/चने के खेतों में चरने न छोड़ें।",
      "राशन में दाने या दलिया की मात्रा अचानक न बढ़ाएं; बदलाव को 7-10 दिनों में धीरे-धीरे लागू करें।",
      "प्रतिवर्ष मानसून पूर्व (मई-जून) सभी भेड़-बकरियों को 'Enterotoxemia Vaccine' (ETV) 2.5 ml S/C अवश्य लगाएं; 15 दिन बाद बूस्टर डोज दें।"
    ],
    clinicalCourse: {
      prognosis: "GRAVE (रोग इतनी तेजी से बढ़ता है कि 70% मामलों में इलाज का समय ही नहीं मिलता और पशु 2 से 6 घंटे में दम तोड़ देता है)",
      recoveryDaysMin: 3,
      recoveryDaysMax: 8,
      redFlags: ["सिर आसमान की ओर खिंच जाना और आंखें उलट जाना (Star-gazing posture)", "मुंह से झागदार लार और हरे पतले दस्त के साथ चीखना", "पैरों का साइकिल की तरह तेजी से चलना (Paddling movements)"]
    },
    pregnancyContraindications: {
      isSteroidContraindicated: true,
      contraindicatedDrugs: ["Dexamethasone Sodium Phosphate", "Betamethasone"],
      safeAlternatives: ["Flunixin Meglumine", "Clostridial Antitoxin"],
      clinicalWarning: "फिड़किया में स्टेरॉयड कभी न दें; क्लॉस्ट्रिडियल आंत्रविषाक्तता में स्टेरॉयड आंतों की दीवार को तेजी से नेक्रोटिक बनाकर मृत्यु त्वरित कर देता है।"
    }
  }
];
