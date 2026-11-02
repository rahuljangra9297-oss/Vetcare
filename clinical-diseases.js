// Vetcare AI OS - Doctor Exhaustive 48+ Diseases DB (2026 Production)
(function (window) {
  'use strict';

  // Master Factory for Clinical Disease Profiles
  function createProfile(data) {
    return {
      id: data.id,
      nameHi: data.nameHi,
      nameEn: data.nameEn,
      category: data.category, // BACTERIAL, VIRAL, PROTOZOAL, METABOLIC, TOXICOLOGY, GYNAECOLOGICAL
      tempRange: data.tempRange || "101.5°F - 102.5°F (Normal)",
      cardinalSigns: data.cardinalSigns || [],
      labTests: data.labTests || [],
      stages: data.stages || [
        { stage: 1, signs: "प्रारंभिक बेचैनी, सुस्ती व चारा छोड़ने के लक्षण", recovery: "त्वरित हस्तक्षेप पर 24h में सामान्य", deterioration: "रोग का तीव्र प्रसार" },
        { stage: 2, signs: "विशिष्ट अंगीय लक्षण एवं तापमान में बदलाव", recovery: "48-72h में क्लिनिकल सुधार", deterioration: "टॉक्सिमिया व अंग विफलता" },
        { stage: 3, signs: "गंभीर डिहाइड्रेशन, लेट जाना एवं दर्द", recovery: "सघन आईवी चिकित्सा से नियंत्रित", deterioration: "कोमा या अंग आघात" },
        { stage: 4, signs: "अंतिम अवस्था, शॉक एवं विफलता", recovery: "अत्यंत संदेहास्पद (Guarded)", deterioration: "मृत्यु" }
      ],
      treatment: {
        injections: data.treatment?.injections || [],
        oral: data.treatment?.oral || [],
        ayurvedic: data.treatment?.ayurvedic || [],
        homeopathic: data.treatment?.homeopathic || [],
        desiRemedies: data.treatment?.desiRemedies || []
      }
    };
  }

  // Exhaustive 48+ Clinical Profiles Array
  const rawDiseases = [
    // ==========================================
    // 1. BACTERIAL DISEASES (1-14)
    // ==========================================
    createProfile({
      id: "DIS_HS",
      nameHi: "गलघोंटू (Hemorrhagic Septicemia)",
      nameEn: "Hemorrhagic Septicemia",
      category: "BACTERIAL",
      tempRange: "104.0°F - 107.0°F",
      cardinalSigns: ["तेज बुखार (105-107°F)", "गले व गलकंबल में गर्म, दर्दनाक सूजन", "सांस लेते समय घुरघुर की तीखी आवाज", "मुंह से लार व जीभ बाहर लटकना"],
      labTests: [
        { sNo: 1, testName: "Blood Smear (Leishman/Giemsa)", sampleType: "Peripheral Blood", approxMrp: 150, tat: "1 घंटा", confirms: "Pasteurella multocida बाइपोलर जीव" },
        { sNo: 2, testName: "Bacterial Culture & AST", sampleType: "Aspirated Fluid", approxMrp: 600, tat: "48 घंटे", confirms: "एंटीबायोटिक संवेदनशीलता" }
      ],
      stages: [
        { stage: 1, signs: "अचानक 105°F+ बुखार, सुस्ती, जुगाली बंद", recovery: "एंटीबायोटिक पर 24h में सुधार", deterioration: "गले में सूजन का उभरना" },
        { stage: 2, signs: "गले में सूजन, सांस में घरघराहट", recovery: "48-72h में सुरक्षित", deterioration: "सांस की नली पर दबाव" },
        { stage: 3, signs: "जीभ बाहर निकलना, भारी लार रिसना", recovery: "सघन स्टेरॉयड व आईवी से संभव", deterioration: "सांस रुकना (Asphyxia)" },
        { stage: 4, signs: "जमीन पर गिरना, नीली श्लेष्मा झिल्ली", recovery: "अत्यंत संदेहास्पद", deterioration: "दम घुटने से मृत्यु" }
      ],
      treatment: {
        injections: [
          { name: "Ceftiofur Sodium", salt: "Ceftiofur 1g", ethicalBrand: "Xyrofur 1g", genericOption: "Ceftiofur Inj 1g", mrpEthical: 480, mrpGeneric: 210, dose: "1-2 mg/kg IM", route: "IM", pregnancySafe: true, purpose: "प्राथमिक एंटीबायोटिक" },
          { name: "Flunixin Meglumine", salt: "Flunixin 50mg/ml", ethicalBrand: "Megludyne", genericOption: "Flunixin Inj", mrpEthical: 260, mrpGeneric: 110, dose: "2.2 mg/kg IV/IM", route: "IV/IM", pregnancySafe: true, purpose: "दर्द, सूजन व एंडोटॉक्सिन रोधी" },
          { name: "Isoflupredone Acetate", salt: "Isoflupredone 2mg/ml", ethicalBrand: "Predef 2X", genericOption: "Isoflupredone Inj", mrpEthical: 320, mrpGeneric: 150, dose: "10 ml IM", route: "IM", pregnancySafe: true, purpose: "गले की सूजन घटाना" },
          { name: "Chlorpheniramine Maleate", salt: "CPM 10mg/ml", ethicalBrand: "Avil Vet", genericOption: "CPM Inj", mrpEthical: 90, mrpGeneric: 45, dose: "10 ml IM", route: "IM", pregnancySafe: true, purpose: "एंटी-एलर्जिक" }
        ],
        oral: [{ name: "Amox-Clav Bolus", brand: "Moxikind-CV", approxMrp: 180, dose: "1 bolus BD", pregnancySafe: true, purpose: "फॉलो-अप एंटीबायोटिक" }],
        ayurvedic: [{ name: "श्वसन कल्प काढ़ा", ingredients: "अडूसा, तुलसी, सोंठ", approxMrp: 120, dose: "50 ml BD", purpose: "श्वसन मार्ग खोलना" }],
        homeopathic: [{ name: "Aconitum Napellus 200", dose: "10 बूंद", route: "जीभ पर", purpose: "अचानक तेज बुखार नियंत्रण" }],
        desiRemedies: [{ name: "हल्दी-कपूर लेप", ingredients: "हल्दी 50g, कपूर 10g, सरसों तेल", preparation: "गुनगुना करके गले की सूजन पर बाहरी लेप करें" }]
      }
    }),

    createProfile({
      id: "DIS_BQ",
      nameHi: "लंगड़ा बुखार / चरचरा (Black Quarter)",
      nameEn: "Black Quarter",
      category: "BACTERIAL",
      tempRange: "104.0°F - 106.0°F",
      cardinalSigns: ["पुट्ठे या कंधे के भारी मांस में गैस भरी सूजन", "सूजन दबाने पर चर्र-चर्र की स्पष्ट आवाज (Crepitation)", "तीव्र लंगड़ापन", "सूजन वाले स्थान का प्रारंभ में गर्म व बाद में ठंडा व सुन्न होना"],
      labTests: [
        { sNo: 1, testName: "Impression Smear Gram Stain", sampleType: "Aspirated Muscle Exudate", approxMrp: 150, tat: "1 घंटा", confirms: "Clostridium chauvoei ग्राम-पॉजिटिव छड़ें" },
        { sNo: 2, testName: "Fluorescent Antibody Test (FAT)", sampleType: "Muscle Tissue", approxMrp: 850, tat: "24 घंटे", confirms: "क्लॉस्ट्रिडियल एंटीजन" }
      ],
      stages: [
        { stage: 1, signs: "तेज बुखार, हल्का लंगड़ापन, चारा छोड़ना", recovery: "तुरंत पेनिसिलिन से 85% सुधार", deterioration: "मांसपेशियों में सूजन का उभार" },
        { stage: 2, signs: "कंधे/पुट्ठे में सूजन, चर्र-चर्र आवाज", recovery: "48 घंटे में रिकवरी संभव", deterioration: "सूजन का काला पड़ना व सुन्न होना" },
        { stage: 3, signs: "पशु का बैठ जाना, उठने में असमर्थ", recovery: "सघन चिकित्सा से संदेहास्पद", deterioration: "गंभीर टॉक्सीमिया" },
        { stage: 4, signs: "तापमान सामान्य से नीचे गिरना, कोमा", recovery: "असंभव प्रायः", deterioration: "मृत्यु" }
      ],
      treatment: {
        injections: [
          { name: "Procaine Penicillin", salt: "Penicillin G 40 Lac IU", ethicalBrand: "Pronapen", genericOption: "Procaine Penicillin Inj", mrpEthical: 160, mrpGeneric: 75, dose: "20,000-40,000 IU/kg IM", route: "IM", pregnancySafe: true, purpose: "क्लॉस्ट्रिडिया का पूर्ण विनाश" },
          { name: "Meloxicam + Paracetamol", salt: "Meloxicam 5mg + Para 150mg", ethicalBrand: "Melonex Plus", genericOption: "Meloxi-P Inj", mrpEthical: 180, mrpGeneric: 80, dose: "15-20 ml IM", route: "IM", pregnancySafe: true, purpose: "दर्द व बुखार मुक्ति" }
        ],
        oral: [{ name: "Himalayan Batisa", brand: "Indian Herbs", approxMrp: 80, dose: "50g OD", pregnancySafe: true, purpose: "रूमेन सक्रियता" }],
        ayurvedic: [{ name: "दशमूल क्वाथ", ingredients: "दशमूल जड़ी-बूटी", approxMrp: 140, dose: "100 ml BD", purpose: "वात शामक व सूजन रोधी" }],
        homeopathic: [{ name: "Rhus Tox 200", dose: "10 बूंद", route: "ओरल", purpose: "मांसपेशियों की अकड़न मुक्ति" }],
        desiRemedies: [{ name: "नीम छाल काढ़ा सेक", ingredients: "नीम की छाल व सेंधा नमक", preparation: "काढ़ा बनाकर सूजन वाले अंग पर गुनगुना सेक करें" }]
      }
    }),

    createProfile({
      id: "DIS_MASTITIS",
      nameHi: "क्लिनिकल थनैल रोग (Clinical Mastitis)",
      nameEn: "Clinical Mastitis",
      category: "BACTERIAL",
      tempRange: "102.5°F - 104.5°F",
      cardinalSigns: ["अयन (Udder) में कड़ापन, गर्माहट व लालिमा", "दूध में गाढ़े छिछड़े (Flakes), पीब या खून आना", "थन छूने पर अत्यधिक दर्द", "दूध का पानी जैसा पतला या बदबूदार होना"],
      labTests: [
        { sNo: 1, testName: "California Mastitis Test (CMT)", sampleType: "Milk Quarter Sample", approxMrp: 100, tat: "10 मिनट", confirms: "सोमैटिक सेल काउंट (SCC) वृद्धि" },
        { sNo: 2, testName: "Milk Culture & Sensitivity (ABST)", sampleType: "Sterile Fore-milk", approxMrp: 650, tat: "48 घंटे", confirms: "रोगजनक जीवाणु व सटीक एंटीबायोटिक" }
      ],
      stages: [
        { stage: 1, signs: "दूध में बारीक छिछड़े, अयन में हल्की गर्माहट", recovery: "इंट्रा-मेमरी ट्यूब से 24h में ठीक", deterioration: "अयन का कड़ा होना" },
        { stage: 2, signs: "थन में कठोर सूजन, दूध का रंग बदलना", recovery: "3 दिन में पूर्ण रिकवरी", deterioration: "थन में पस/खून का भरना" },
        { stage: 3, signs: "थन से पीला बदबूदार पानी या खून निकलना", recovery: "फाइब्रोसिस का खतरा, 7 दिन उपचार", deterioration: "थन का पूरी तरह मर जाना" },
        { stage: 4, signs: "गैंग्रीनस थनैल, थन का काला पड़कर सूखना", recovery: "थन स्थायी रूप से बेकार", deterioration: "सेप्टिसीमिया से मृत्यु" }
      ],
      treatment: {
        injections: [
          { name: "Cefoperazone + Sulbactam", salt: "Cefoperazone 3g + Sulbactam 1.5g", ethicalBrand: "Intacef Tazo 4.5g", genericOption: "Cefope-Sulbact 4.5g", mrpEthical: 520, mrpGeneric: 240, dose: "4.5g IV/IM", route: "IV/IM", pregnancySafe: true, purpose: "ब्रॉड-स्पेक्ट्रम जीवाणुनाशक" },
          { name: "Serratiopeptidase", salt: "Serratiopeptidase 30mg/vial", ethicalBrand: "Bioser", genericOption: "Serratio Inj", mrpEthical: 210, mrpGeneric: 95, dose: "1 vial IM", route: "IM", pregnancySafe: true, purpose: "फाइब्रिन व सूजन घोलना" },
          { name: "Intramammary Infusion", salt: "Cefuroxime / Cloxacillin", ethicalBrand: "Cobactan LC", genericOption: "Mastilep Tube", mrpEthical: 175, mrpGeneric: 85, dose: "1 tube प्रति प्रभावित थन", route: "Intramammary", pregnancySafe: true, purpose: "थन के अंदर प्रत्यक्ष जीवाणुनाश" }
        ],
        oral: [{ name: "Trisodium Citrate Powder", brand: "Mastirid / Masti-Kit", approxMrp: 220, dose: "30-50g दैनिक 5 दिन", pregnancySafe: true, purpose: "दूध का pH सामान्य करना" }],
        ayurvedic: [{ name: "एलोवेरा-हल्दी लेप", ingredients: "एलोवेरा 250g, हल्दी 50g, चूना 15g", approxMrp: 50, dose: "दिन में 3 बार लेप", purpose: "बाहरी सूजन व दर्द शमन" }],
        homeopathic: [{ name: "Phytolacca 200 + Belladonna 200", dose: "10-10 बूंद", route: "ओरल दिन में 4 बार", purpose: "अयन की कठोरता निवारण" }],
        desiRemedies: [{ name: "फिटकरी जल प्रक्षालन", ingredients: "पोटाश फिटकरी 25g, 2 लीटर गुनगुना जल", preparation: "दूध निकालने के बाद थनों को अच्छी तरह डुबोएं" }]
      }
    }),

    createProfile({
      id: "DIS_ANTHRAX",
      nameHi: "एंथ्रेक्स / गिल्टी रोग (Anthrax - Zoonotic)",
      nameEn: "Anthrax",
      category: "BACTERIAL",
      tempRange: "105.0°F - 108.0°F",
      cardinalSigns: ["अचानक तेज बुखार के साथ तीव्र मृत्यु (Sudden Peracute Death)", "प्राकृतिक छेदों (नाक, गुदा, योनि) से काला, बिना जमा हुआ खून रिसना (Tar-like non-clotting blood)", "मृत्यु उपरांत अकड़न (Rigor mortis) न होना", "शव को चीरना सख्त वर्जित (Spore Formation)"],
      labTests: [
        { sNo: 1, testName: "Polychrome Methylene Blue (M'Fadyean Reaction)", sampleType: "Ear vein smear", approxMrp: 200, tat: "30 मिनट", confirms: "Bacillus anthracis कैप्सूल" }
      ],
      treatment: {
        injections: [
          { name: "High-Dose Penicillin G", salt: "Crystalline Penicillin 100 Lac IU", ethicalBrand: "Penstrep / Megapen", genericOption: "Penicillin Inj", mrpEthical: 290, mrpGeneric: 120, dose: "40,000 IU/kg IV/IM", route: "IV", pregnancySafe: true, purpose: "तत्काल जीवाणुनाशक" },
          { name: "Oxytetracycline LA", salt: "OTC 200mg/ml", ethicalBrand: "Terramycin LA", genericOption: "Oxytetracycline LA", mrpEthical: 220, mrpGeneric: 90, dose: "20 mg/kg IM", route: "IM", pregnancySafe: false, purpose: "वैकल्पिक एंटीबायोटिक" }
        ],
        oral: [],
        ayurvedic: [],
        homeopathic: [{ name: "Anthracinum 1M", dose: "10 बूंद", route: "ओरल", purpose: "संक्रमण सुरक्षा" }],
        desiRemedies: [{ name: "गहरी दफन विधि", ingredients: "चूना 25kg", preparation: "शव को 6-8 फीट गहरे गड्ढे में चूना डालकर दफनाएं, पोस्टमार्टम न करें" }]
      }
    }),

    createProfile({
      id: "DIS_BRUCELLOSIS",
      nameHi: "ब्रूसीलोसिस / संक्रामक गर्भपात (Brucellosis)",
      nameEn: "Brucellosis",
      category: "BACTERIAL",
      tempRange: "102.0°F - 103.5°F",
      cardinalSigns: ["गर्भावस्था के अंतिम त्रैमास (6-9 माह) में अचानक गर्भपात", "जेर (Placenta) का रुकना व सड़ना", "नर पशुओं के अंडकोष में सूजन (Orchitis)", "जोड़ों में पानी भरना व गठिया"],
      labTests: [
        { sNo: 1, testName: "Rose Bengal Plate Test (RBPT)", sampleType: "Serum", approxMrp: 250, tat: "2 घंटे", confirms: "Brucella abortus एंटीबॉडी" },
        { sNo: 2, testName: "Standard Tube Agglutination (STAT)", sampleType: "Serum", approxMrp: 400, tat: "24 घंटे", confirms: "सटीक एंटीबॉडी टाइटर" }
      ],
      treatment: {
        injections: [
          { name: "Streptomycin + Penicillin", salt: "Streptopenicillin 2.5g", ethicalBrand: "Dicrysticin", genericOption: "Strepto-Pen Inj", mrpEthical: 140, mrpGeneric: 65, dose: "1 vial IM दैनिक 7 दिन", route: "IM", pregnancySafe: true, purpose: "जीवाणु दमन" },
          { name: "Long-acting Oxytetracycline", salt: "Oxytetracycline 200mg/ml", ethicalBrand: "Duramycin LA", genericOption: "OTC LA Inj", mrpEthical: 240, mrpGeneric: 110, dose: "20 mg/kg IM", route: "IM", pregnancySafe: false, purpose: "दीर्घकालिक जीवाणु नियंत्रण" }
        ],
        oral: [{ name: "Uterine Cleanser Liquid", brand: "Exapar", approxMrp: 220, dose: "100 ml BD", pregnancySafe: true, purpose: "गर्भाशय से दूषित स्राव निकालना" }],
        ayurvedic: [{ name: "गिलोय व अश्वगंधा चूर्ण", ingredients: "गिलोय 25g, अश्वगंधा 25g", approxMrp: 90, dose: "दैनिक आहार में", purpose: "प्रतिरोधक क्षमता वृद्धि" }],
        homeopathic: [{ name: "Sabina 30", dose: "10 बूंद", route: "ओरल", purpose: "गर्भाशय स्राव सामान्य करना" }],
        desiRemedies: [{ name: "गर्भपात अवशेष विसंक्रमण", ingredients: "नीम उबला पानी व फिनाइल", preparation: "गर्भपात अवशेषों को गहरा गाड़ें और फर्श विसंक्रमित करें" }]
      }
    }),

    createProfile({ id: "DIS_LISTERIOSIS", nameHi: "लिस्टिरियोसिस / चक्कर रोग (Circling Disease)", nameEn: "Listeriosis", category: "BACTERIAL", tempRange: "104.0°F - 105.5°F", cardinalSigns: ["एक ही दिशा में गोल-गोल चक्कर काटना", "गर्दन का एक तरफ मुड़ना (Head Tilt)", "चेहरे का पक्षाघात व कान लटकना", "साइलेज खाने का इतिहास"], labTests: [{ sNo: 1, testName: "CSF Cytology & Gram Stain", sampleType: "CSF", approxMrp: 600, tat: "4 घंटे", confirms: "Listeria monocytogenes" }] }),
    createProfile({ id: "DIS_ACTINOMYCOSIS", nameHi: "एक्टिनोमाइकोसिस / ढेलेदार जबड़ा (Lumpy Jaw)", nameEn: "Actinomycosis", category: "BACTERIAL", tempRange: "101.5°F - 102.5°F", cardinalSigns: ["निचले जबड़े की हड्डी में पत्थर जैसी कठोर सूजन", "हड्डी की विकृति व दांत उखड़ना", "गाढ़ा पीला मवाद व सल्फर कण (Sulfur granules)"] }),
    createProfile({ id: "DIS_ACTINOBACILLOSIS", nameHi: "एक्टिनोबैसिलोसिस / काठ जीभ (Wooden Tongue)", nameEn: "Actinobacillosis", category: "BACTERIAL", tempRange: "102.0°F - 103.5°F", cardinalSigns: ["जीभ का अत्यधिक कठोर व मोटा होकर बाहर लटकना", "चारा चबाने व निगलने में असमर्थता", "मुंह से झागदार लार टपकना"] }),
    createProfile({ id: "DIS_ENTEROTOXEMIA", nameHi: "फिड़किया / एंटरोटॉक्सीमिया (Enterotoxemia - Pulpy Kidney)", nameEn: "Enterotoxemia", category: "BACTERIAL", tempRange: "103.0°F - 105.0°F", cardinalSigns: ["भेड़-बकरियों में हरा दाना खाने के बाद अचानक मृत्यु", "सिर को पीछे मोड़ना (Opisthotonos)", "पैरों को साइकिल की तरह चलाना", "मृत्यु बाद गुर्दों का दलिया जैसा गलना"] }),
    createProfile({ id: "DIS_CALF_SCOURS", nameHi: "बछड़ों के सफेद दस्त (Calf Scours / Colibacillosis)", nameEn: "Calf Scours", category: "BACTERIAL", tempRange: "102.0°F - 104.0°F", cardinalSigns: ["नवजात बछड़ों में बदबूदार सफेद या पीले पतले दस्त", "आंखों का गड्ढे में धंसना व तीव्र निर्जलीकरण", "दूध पीने से इनकार व अत्यधिक दुर्बलता"] }),
    createProfile({ id: "DIS_FOOT_ROT", nameHi: "खुर सड़न (Foot Rot / Interdigital Necrobasillosis)", nameEn: "Foot Rot", category: "BACTERIAL", tempRange: "102.0°F - 103.5°F", cardinalSigns: ["खुरों के बीच सड़ी हुई बदबूदार दरार व मवाद", "तीव्र लंगड़ापन व पैर झटकना", "खुर का अलग होना"] }),
    createProfile({ id: "DIS_LEPTOSPIROSIS", nameHi: "लेप्टोस्पायरोसिस (Leptospirosis / Redwater)", nameEn: "Leptospirosis", category: "BACTERIAL", tempRange: "104.0°F - 106.0°F", cardinalSigns: ["गहरा लाल पेशाब (Hemoglobinuria)", "तीव्र पीलिया व रक्ताल्पता", "दूध का लाल या गाढ़ा थक्का बनना", "अचानक गर्भपात"] }),
    createProfile({ id: "DIS_TETANUS", nameHi: "धनुस्तंभ / टिटनेस (Tetanus)", nameEn: "Tetanus", category: "BACTERIAL", tempRange: "102.0°F - 104.0°F", cardinalSigns: ["लकड़ी के घोड़े जैसी मुद्रा (Wooden horse stance)", "तीसरी पलक (Nictitating membrane) का बाहर आना", "जबड़े का बंद होना (Lock-jaw)", "आवाज या रोशनी से मांसपेशियों में तेज ऐंठन"] }),
    createProfile({ id: "DIS_CBPP", nameHi: "संक्रामक बोवाइन प्लूरोन्यूमोनिया (CBPP)", nameEn: "Contagious Bovine Pleuropneumonia", category: "BACTERIAL", tempRange: "104.0°F - 106.0°F", cardinalSigns: ["दर्दनाक सूखी खांसी व हांफना", "छाती में घर्षण ध्वनि (Pleural friction rub)", "कोहनी बाहर फैलाकर खड़े होना"] }),

    // ==========================================
    // 2. VIRAL DISEASES (15-24)
    // ==========================================
    createProfile({
      id: "DIS_FMD",
      nameHi: "खुरपका-मुंहपका (Foot and Mouth Disease)",
      nameEn: "Foot and Mouth Disease",
      category: "VIRAL",
      tempRange: "104.0°F - 106.0°F",
      cardinalSigns: ["मुंह, जीभ, मसूड़ों व तालु पर दर्दनाक छाले (Vesicles)", "खुरों के बीच छाले व गंभीर लंगड़ापन", "मुंह से चिपचिपी तारदार लार गिरना (Ropy Salivation)", "चबाने पर मुंह से चप-चप की आवाज (Smacking of lips)"],
      labTests: [
        { sNo: 1, testName: "Antigen Detection ELISA / RT-PCR", sampleType: "Vesicular Fluid/Epithelium", approxMrp: 1200, tat: "24 घंटे", confirms: "FMDV सीरोटाइप (O, A, Asia-1)" }
      ],
      stages: [
        { stage: 1, signs: "105°F+ तेज बुखार, खाना बंद, उदासी", recovery: "लक्षण प्रबंधन से सामान्य", deterioration: "मुंह व खुरों में छाले उभरना" },
        { stage: 2, signs: "छालों का फटना, लाल घाव, लार बहना", recovery: "एंटीबायोटिक कवर पर 5 दिन में सुधार", deterioration: "खुरों में कीड़े (Maggots) पड़ना" },
        { stage: 3, signs: "खुर की खोल ढीली होना, दूध समाप्त", recovery: "15 दिन में घाव भरना", deterioration: "हार्ट अटैक (Tiger Heart in Calves)" },
        { stage: 4, signs: "दीर्घकालिक सांस फूलना (Pantor condition)", recovery: "स्थायी क्षमता ह्रास", deterioration: "कुपोषण से मृत्यु" }
      ],
      treatment: {
        injections: [
          { name: "Ceftriaxone Sodium", salt: "Ceftriaxone 3g", ethicalBrand: "Intacef 3g", genericOption: "Ceftriaxone Inj 3g", mrpEthical: 220, mrpGeneric: 90, dose: "3g IM", route: "IM", pregnancySafe: true, purpose: "द्वितीयक जीवाणु संक्रमण रोकना" },
          { name: "Flunixin Meglumine", salt: "Flunixin 50mg/ml", ethicalBrand: "Megludyne", genericOption: "Flunixin Inj", mrpEthical: 260, mrpGeneric: 110, dose: "15 ml IV/IM", route: "IM", pregnancySafe: true, purpose: "छालों का दर्द व जलन शांत करना" }
        ],
        oral: [{ name: "B-Complex + Choline Liver Tonic", brand: "Belamyl Oral / Stimuliv", approxMrp: 140, dose: "50 ml BD", pregnancySafe: true, purpose: "भूख व जिगर सुधार" }],
        ayurvedic: [{ name: "शहद-सुहागा मिश्रण", ingredients: "शहद 100g, भुना सुहागा 20g", approxMrp: 60, dose: "दिन में 3 बार मुंह में लेप", purpose: "मुंह के छाले तुरंत भरना" }],
        homeopathic: [{ name: "Merc Sol 200 + Variolinum 200", dose: "10-10 बूंद", route: "ओरल दिन में 3 बार", purpose: "तारदार लार व छाले ठीक करना" }],
        desiRemedies: [{ name: "पोटाश जल व हल्दी तेल", ingredients: "लाल दवा 0.1% घोल, हल्दी व तिल तेल", preparation: "मुंह को लाल दवा से धोएं, खुरों में हल्दी तेल लगाएं" }]
      }
    }),

    createProfile({
      id: "DIS_LSD",
      nameHi: "लम्पी स्किन डिजीज (Lumpy Skin Disease)",
      nameEn: "Lumpy Skin Disease",
      category: "VIRAL",
      tempRange: "104.0°F - 106.5°F",
      cardinalSigns: ["पूरे शरीर की त्वचा पर 2-5 सेमी की गोल कठोर गांठें (Nodules)", "पैरों, गलकंबल व अंडकोष में गंभीर सूजन (Edema)", "आंखों व नाक से पानी जैसा स्राव", "गांठों का पककर गहरा अल्सर बनना"],
      labTests: [
        { sNo: 1, testName: "Real-time PCR", sampleType: "Skin Scabs / EDTA Blood", approxMrp: 1500, tat: "24 घंटे", confirms: "Capripoxvirus DNA" }
      ],
      stages: [
        { stage: 1, signs: "तेज बुखार, आंखों से पानी, पैरों में सूजन", recovery: "रोग प्रतिरोधक उपचार से स्थिर", deterioration: "शरीर पर गांठें उभरना" },
        { stage: 2, signs: "कठोर गांठें, दूध में भारी गिरावट", recovery: "7-10 दिन में गांठें सूखना", deterioration: "गांठों का घाव में बदलना" },
        { stage: 3, signs: "घाव में मक्खियां व कीड़े पड़ना", recovery: "सक्रिय एंटीसेप्टिक ड्रेसिंग से ठीक", deterioration: "गंभीर निमोनिया" },
        { stage: 4, signs: "अत्यधिक कमजोरी, सांस फूलना, बैठ जाना", recovery: "संदेहास्पद", deterioration: "सेप्टिक शॉक" }
      ],
      treatment: {
        injections: [
          { name: "Enrofloxacin", salt: "Enrofloxacin 100mg/ml", ethicalBrand: "Floxidin LA", genericOption: "Enrocin Inj", mrpEthical: 280, mrpGeneric: 110, dose: "5-10 mg/kg IM", route: "IM", pregnancySafe: true, purpose: "त्वचा संक्रमण व निमोनिया से बचाव" },
          { name: "Ivermectin", salt: "Ivermectin 10mg/ml", ethicalBrand: "Neomec / Ivomec", genericOption: "Iverchem", mrpEthical: 120, mrpGeneric: 50, dose: "1 ml/50kg SC", route: "SC", pregnancySafe: true, purpose: "मक्खी व कीड़े नियंत्रण" },
          { name: "Pheniramine Maleate", salt: "Avil 22.75mg/ml", ethicalBrand: "Avil", genericOption: "Avil Generic", mrpEthical: 85, mrpGeneric: 40, dose: "10 ml IM", route: "IM", pregnancySafe: true, purpose: "खुजली व एलर्जी नियंत्रण" }
        ],
        oral: [{ name: "Toxol / Immunite Powder", brand: "Natural Remedies", approxMrp: 180, dose: "50g BD", pregnancySafe: true, purpose: "इम्युनिटी संवर्धन" }],
        ayurvedic: [{ name: "पान-कालीमिर्च-गुड़ लड्डू", ingredients: "पान के पत्ते 10, कालीमिर्च 10g, सेंधा नमक 10g, गुड़ 100g", approxMrp: 40, dose: "सुबह-शाम 5 दिन", purpose: "पारंपरिक एंटीवायरल टॉनिक" }],
        homeopathic: [{ name: "Thuja 200 + Silicea 200", dose: "10-10 बूंद", route: "ओरल", purpose: "त्वचा की गांठें सुखाना" }],
        desiRemedies: [{ name: "नीम-हल्दी-कपूर नीम स्प्रे", ingredients: "नीम तेल 100ml, कपूर 10g, हल्दी 20g", preparation: "घावों पर मक्खियां रोकने हेतु दिन में 2 बार छिड़कें" }]
      }
    }),

    createProfile({ id: "DIS_PPR", nameHi: "पीपीआर / बकरी प्लेग (Peste des Petits Ruminants)", nameEn: "Peste des Petits Ruminants", category: "VIRAL", tempRange: "104.0°F - 106.0°F", cardinalSigns: ["मुंह के अंदर लाल चकत्ते व छालों की सड़ांध", "आंख-नाक से गाढ़ा पीब जैसा स्राव", "अत्यधिक बदबूदार खूनी दस्त", "तीव्र निमोनिया व सांस में परेशानी"] }),
    createProfile({ id: "DIS_RABIES", nameHi: "रेबीज / अलर्क रोग (Rabies - Fatal Zoonotic)", nameEn: "Rabies", category: "VIRAL", tempRange: "102.5°F - 105.0°F", cardinalSigns: ["अकारण आक्रामक होना या अत्यधिक सुस्त होना (Furious/Dumb form)", "असामान्य आवाज में लगातार रंभाना", "पानी व भोजन निगलने में असमर्थता (Hydrophobia/Dysphagia)", "मुंह से झागदार लार व पक्षाघात के बाद 3-5 दिन में शत-प्रतिशत मृत्यु"] }),
    createProfile({ id: "DIS_BLUETONGUE", nameHi: "ब्लूटंग / नीली जीभ रोग (Bluetongue)", nameEn: "Bluetongue", category: "VIRAL", tempRange: "104.0°F - 106.0°F", cardinalSigns: ["जीभ का नीला पड़ना व सूजन (Cyanosis)", "खुरों के कोरोनरी बैंड में सूजन व लंगड़ापन", "चेहरे व होंठों पर एडिमा"] }),
    createProfile({ id: "DIS_BVD", nameHi: "बोवाइन वायरल डायरिया (Bovine Viral Diarrhea)", nameEn: "Bovine Viral Diarrhea", category: "VIRAL", tempRange: "103.5°F - 105.5°F", cardinalSigns: ["पाचन तंत्र में अल्सर व छालों के साथ दस्त", "दूध उत्पादन में अचानक भारी गिरावट", "गर्भपात व जन्मजात विकृतियां (PI Calves)"] }),
    createProfile({ id: "DIS_ROTA_CORONA", nameHi: "रोटा-कोरोना वायरल दस्त (Calf Viral Enteritis)", nameEn: "Rotavirus & Coronavirus Diarrhea", category: "VIRAL", tempRange: "101.5°F - 103.0°F", cardinalSigns: ["7-14 दिन के बछड़ों में पानी जैसे चमकदार पीले दस्त", "गंभीर इलेक्ट्रोलाइट ह्रास व कमजोरी"] }),
    createProfile({ id: "DIS_IBR", nameHi: "संक्रामक बोवाइन राइनोट्रैकिटिस (IBR)", nameEn: "Infectious Bovine Rhinotracheitis", category: "VIRAL", tempRange: "104.0°F - 107.0°F", cardinalSigns: ["नाक की श्लेष्मा का गहरा लाल होना (Red Nose)", "आंखों से अत्यधिक पानी व कंजंक्टिवाइटिस", "तीव्र श्वसन कष्ट"] }),
    createProfile({ id: "DIS_POX", nameHi: "काउपॉक्स / माता रोग (Cowpox / Sheeppox)", nameEn: "Pox Virus Infection", category: "VIRAL", tempRange: "103.0°F - 105.0°F", cardinalSigns: ["थनों या त्वचा पर फफोले, पपड़ी व गड्ढेदार घाव (Pustules)", "दूध निकालने में असहनीय दर्द"] }),
    createProfile({ id: "DIS_EPHEMERAL_FEVER", nameHi: "तीन दिनी बुखार (Three-Day Sickness / Ephemeral Fever)", nameEn: "Bovine Ephemeral Fever", category: "VIRAL", tempRange: "104.5°F - 107.0°F", cardinalSigns: ["अचानक तेज बुखार व मांसपेशियों में तीव्र कंपन", "जोड़ों में सूजन व 3 दिन का अस्थायी पक्षाघात", "72 घंटे बाद स्वतः सुधार"] }),

    // ==========================================
    // 3. PROTOZOAL & BLOOD PARASITES (25-30)
    // ==========================================
    createProfile({
      id: "DIS_THEILERIOSIS",
      nameHi: "थायलेरियासिस / चिचड़ी बुखार (Theileriosis)",
      nameEn: "Theileriosis",
      category: "PROTOZOAL",
      tempRange: "104.5°F - 107.0°F",
      cardinalSigns: ["कंधे (Prescapular) या जांघ की लिम्फ नोड्स में भारी कठोर सूजन", "लगातार तेज बुखार (105-107°F) जो सामान्य एंटीपायरेटिक से न उतरे", "आंखों की झिल्ली का पीला व सफेद (Punctate hemorrhages) होना", "तीव्र रक्ताल्पता (Anemia) व कमजोरी"],
      labTests: [
        { sNo: 1, testName: "Lymph Node Biopsy Smear (Giemsa)", sampleType: "Lymph Needle Aspirate", approxMrp: 200, tat: "1 घंटा", confirms: "कोच के नीले कण (Koch's Blue Bodies)" },
        { sNo: 2, testName: "Blood Smear Examination", sampleType: "Blood", approxMrp: 150, tat: "30 मिनट", confirms: "RBCs में Theileria annulata सिग्नेट रिंग्स" }
      ],
      stages: [
        { stage: 1, signs: "तेज बुखार, लिम्फ नोड में हल्की सूजन", recovery: "बुपरवाक्वोन से 95% पूर्ण सुधार", deterioration: "लिम्फ नोड का भारी होना" },
        { stage: 2, signs: "लिम्फ नोड अत्यधिक बड़ी, खून की कमी", recovery: "48-72h में रिकवरी", deterioration: "फेफड़ों में पानी (Pulmonary Edema)" },
        { stage: 3, signs: "नाक से झाग, सांस में तीव्र कष्ट, पीलिया", recovery: "सघन चिकित्सा से संदेहास्पद", deterioration: "दम घुटना" },
        { stage: 4, signs: "जमीन पर गिरना, अत्यधिक रक्ताल्पता", recovery: "रक्त चढ़ाने के बिना असंभव", deterioration: "मृत्यु" }
      ],
      treatment: {
        injections: [
          { name: "Buparvaquone", salt: "Buparvaquone 50mg/ml", ethicalBrand: "Butalex", genericOption: "Zubion / Bupavet", mrpEthical: 1250, mrpGeneric: 650, dose: "2.5 mg/kg Deep IM (1ml/20kg)", route: "Deep IM", pregnancySafe: true, purpose: "थायलेरिया परजीवी का पूर्ण विनाश" },
          { name: "Oxytetracycline LA", salt: "OTC LA 200mg/ml", ethicalBrand: "Terramycin LA", genericOption: "Oxytetracycline LA", mrpEthical: 220, mrpGeneric: 90, dose: "20 mg/kg IM", route: "IM", pregnancySafe: false, purpose: "शिज़ोंट्स वृद्धि पर रोक" },
          { name: "Iron Dextran", salt: "Elemental Iron 100mg/ml", ethicalBrand: "Imferon / Feritas", genericOption: "Iron Dextran", mrpEthical: 180, mrpGeneric: 80, dose: "10 ml Deep IM", route: "IM", pregnancySafe: true, purpose: "रक्ताल्पता दूर करना" }
        ],
        oral: [{ name: "Shark Liver Oil With Iron", brand: "Ferikind Pet / Sarbfer", approxMrp: 250, dose: "50 ml OD", pregnancySafe: true, purpose: "RBC संवर्धन" }],
        ayurvedic: [{ name: "पुनर्नवा व मंडूर भस्म", ingredients: "पुनर्नवादि मंडूर", approxMrp: 160, dose: "10g BD", purpose: "खून बढ़ाना व सूजन उतारना" }],
        homeopathic: [{ name: "China 200 + Ferrum Met 200", dose: "10-10 बूंद", route: "ओरल", purpose: "एनीमिया व दुर्बलता मुक्ति" }],
        desiRemedies: [{ name: "चिचड़ी नियंत्रण लेप", ingredients: "नीम तेल 200ml, कपूर 10g", preparation: "चिचड़ियों को मारने हेतु शरीर पर मालिश करें" }]
      }
    }),

    createProfile({
      id: "DIS_BABESIOSIS",
      nameHi: "बबेशियोसिस / लाल पेशाब (Babesiosis / Redwater)",
      nameEn: "Babesiosis",
      category: "PROTOZOAL",
      tempRange: "104.5°F - 107.0°F",
      cardinalSigns: ["कॉफी या गहरे लाल रंग का पेशाब (Hemoglobinuria)", "तेज बुखार (105-106°F) व दिल की तेज धड़कन", "RBC टूटने से गंभीर पीलिया व रक्ताल्पता", "चिचड़ी (Boophilus ticks) का प्रकोप"],
      labTests: [
        { sNo: 1, testName: "Giemsa Stained Blood Smear", sampleType: "Capillary/Ear Vein Blood", approxMrp: 150, tat: "30 मिनट", confirms: "RBCs में Babesia bigemina पाइरीफॉर्म जोड़े" }
      ],
      stages: [
        { stage: 1, signs: "तेज बुखार, हल्का लाल पेशाब, सुस्ती", recovery: "बेरेनिल से 24h में पेशाब साफ", deterioration: "पेशाब का गहरा कॉफी रंग होना" },
        { stage: 2, signs: "गहरा कॉफी पेशाब, हृदय की धड़कन तेज", recovery: "48 घंटे में सुधार", deterioration: "गंभीर एनीमिया व पीलिया" },
        { stage: 3, signs: "म्यूकस मेम्ब्रेन सफेद पड़ना, लड़खड़ाहट", recovery: "सघन आईवी व हिमेटिनिक्स आवश्यक", deterioration: "ऑक्सीजन की कमी से पतन" },
        { stage: 4, signs: "शॉक, हाइपोक्सिया, गिरना", recovery: "अत्यंत संदेहास्पद", deterioration: "हार्ट फेल्योर से मृत्यु" }
      ],
      treatment: {
        injections: [
          { name: "Diminazene Aceturate", salt: "Diminazene 70mg/ml", ethicalBrand: "Berenil RTU", genericOption: "Diminazene Inj", mrpEthical: 190, mrpGeneric: 90, dose: "3.5 - 5 mg/kg Deep IM", route: "Deep IM", pregnancySafe: true, purpose: "बबेशिया परजीवी खात्मा" },
          { name: "Pheniramine Maleate", salt: "Avil 22.75mg/ml", ethicalBrand: "Avil", genericOption: "CPM Inj", mrpEthical: 85, mrpGeneric: 40, dose: "10 ml IM", route: "IM", pregnancySafe: true, purpose: "बेरेनिल की विषाक्तता रोकना" },
          { name: "Vitamin B-Complex + B12", salt: "Thiamine, Riboflavin, Niacin, B12", ethicalBrand: "Tribivet", genericOption: "Belamyl", mrpEthical: 110, mrpGeneric: 50, dose: "10 ml IM", route: "IM", pregnancySafe: true, purpose: "नर्वस सिस्टम व लिवर सपोर्ट" }
        ],
        oral: [{ name: "RBC Booster Syrup", brand: "RBCure / Fercobs", approxMrp: 280, dose: "100 ml दैनिक", pregnancySafe: true, purpose: "हीमोग्लोबिन तेजी से बढ़ाना" }],
        ayurvedic: [{ name: "गन्ने का सिरका व गुड़ शरबत", ingredients: "गुड़ 250g, सिरका 50ml, पानी 2L", approxMrp: 40, dose: "दैनिक 2 बार", purpose: "तत्काल ऊर्जा व निर्जलीकरण बचाव" }],
        homeopathic: [{ name: "Crotalus Horridus 200", dose: "10 बूंद", route: "ओरल", purpose: "पेशाब में खून व हीमोलाइसिस रोकना" }],
        desiRemedies: [{ name: "छाछ व मिश्री घोल", ingredients: "ताजा खट्टी छाछ 2 लीटर, मिश्री 100g", preparation: "पिलाने से पेशाब की जलन शांत होती है" }]
      }
    }),

    createProfile({ id: "DIS_ANAPLASMOSIS", nameHi: "एनाप्लास्मोसिस / पीलिया बुखार (Anaplasmosis / Gall Sickness)", nameEn: "Anaplasmosis", category: "PROTOZOAL", tempRange: "104.0°F - 106.0°F", cardinalSigns: ["बिना लाल पेशाब के अत्यधिक पीलिया (Severe Jaundice)", "RBCs के किनारे पर परजीवी (Anaplasma marginale)", "कब्ज के साथ सख्त काला गोबर"] }),
    createProfile({ id: "DIS_SURRA", nameHi: "सर्रा रोग (Surra / Trypanosomiasis)", nameEn: "Trypanosomiasis", category: "PROTOZOAL", tempRange: "103.0°F - 106.0°F (Intermittent)", cardinalSigns: ["गोल चक्कर काटना व दीवार से सिर टकराना (Head Pressing)", "आंखों से अंधापन व पुतलियों का फैलना", "रुक-रुक कर तेज बुखार आना", "पेट व पैरों के नीचे सूजन"] }),
    createProfile({ id: "DIS_COCCIDIOSIS", nameHi: "खूनी पेचिश / कॉक्सीडियोसिस (Coccidiosis / Red Dysentery)", nameEn: "Coccidiosis", category: "PROTOZOAL", tempRange: "102.5°F - 104.0°F", cardinalSigns: ["गोबर में थक्केदार खून व श्लेष्मा आना", "शौच करते समय अत्यधिक जोर लगाना (Tenesmus)", "गुदा का बाहर निकलना"] }),
    createProfile({ id: "DIS_TRICHOMONIASIS", nameHi: "ट्राइकोमोनिएसिस (Bovine Trichomoniasis)", nameEn: "Trichomoniasis", category: "PROTOZOAL", tempRange: "101.5°F - 102.5°F", cardinalSigns: ["प्रारंभिक गर्भपात (2-4 माह)", "गर्भाशय में सफेद मवाद का संचय (Pyometra)", "बार-बार रिपीट ब्रीडिंग होना"] }),

    // ==========================================
    // 4. METABOLIC & DEFICIENCY (31-38)
    // ==========================================
    createProfile({
      id: "DIS_MILK_FEVER",
      nameHi: "मिल्क फीवर / प्रसवकालीन पक्षाघात (Milk Fever / Hypocalcemia)",
      nameEn: "Hypocalcemia",
      category: "METABOLIC",
      tempRange: "96.0°F - 100.0°F (Sub-normal)",
      cardinalSigns: ["शरीर का तापमान सामान्य से काफी कम (<100°F) व कान ठंडे होना", "गर्दन को मोड़कर पेट की तरफ रखकर बैठना (Sternal Recumbency 'S' Shape)", "आंखों की पुतलियों का फैलना व पुतली रिफ्लेक्स समाप्त", "पशु का खड़े होने में पूर्ण असमर्थ होना"],
      labTests: [
        { sNo: 1, testName: "Serum Total Calcium Test", sampleType: "Clotted Blood", approxMrp: 200, tat: "2 घंटे", confirms: "सीरम कैल्शियम स्तर < 5 mg/dL" }
      ],
      stages: [
        { stage: 1, signs: "हल्की लड़खड़ाहट, मांसपेशियों में कंपन, कान ठंडे", recovery: "ओरल कैल्शियम जेल से 1 घंटे में सामान्य", deterioration: "बैठ जाना" },
        { stage: 2, signs: "गर्दन मोड़कर बैठना, पुतली फैलना, जुगाली बंद", recovery: "आईवी कैल्शियम से 30 मिनट में खड़ा होना", deterioration: "एक तरफ गिरना (Lateral)" },
        { stage: 3, signs: "पूरी तरह लेट जाना, रूमेन बंद, कोमा", recovery: "धीमी गति आईवी से 80% रिकवरी", deterioration: "अफारा व सांस रुकना" },
        { stage: 4, signs: "कार्डियोवस्कुलर कोलैप्स, पल्स गायब", recovery: "अत्यंत संदेहास्पद", deterioration: "मृत्यु" }
      ],
      treatment: {
        injections: [
          { name: "Calcium Borogluconate 25%", salt: "CBG + Magnesium + Phosphorus", ethicalBrand: "Mifex / Calborol", genericOption: "CBG Inj 450ml", mrpEthical: 380, mrpGeneric: 180, dose: "450 ml (300ml धीमा IV + 150ml SC)", route: "IV/SC", pregnancySafe: true, purpose: "कैल्शियम स्तर तुरंत सामान्य करना" },
          { name: "Phosphorus + B12", salt: "Toldimphos Sodium 200mg/ml", ethicalBrand: "Tonophosphan", genericOption: "Phosphovet", mrpEthical: 260, mrpGeneric: 120, dose: "10 ml IM", route: "IM", pregnancySafe: true, purpose: "एटीपी संश्लेषण व मांसपेशी ताकत" }
        ],
        oral: [{ name: "Ionic Calcium Gel", brand: "Cal-Up Gel / Ostovet Gel", approxMrp: 240, dose: "1 ट्यूब (300g) होश आने पर", pregnancySafe: true, purpose: "रिलैप्स रोकना" }],
        ayurvedic: [],
        homeopathic: [{ name: "Calcarea Phos 30X", dose: "15 गोलियां", route: "ओरल", purpose: "कैल्शियम मेटाबॉलिज्म सुधार" }],
        desiRemedies: [{ name: "गर्म बोरी सेक", ingredients: "टाट की बोरी व कंबल", preparation: "पशु को ढककर रखें व पैरों की मालिश कर गर्माहट लाएं" }]
      }
    }),

    createProfile({
      id: "DIS_KETOSIS",
      nameHi: "कीटोसिस / एसीटोनेमिया (Ketosis / Acetonemia)",
      nameEn: "Ketosis",
      category: "METABOLIC",
      tempRange: "101.0°F - 102.5°F",
      cardinalSigns: ["सांस, मूत्र व दूध से मीठी एसीटोन (पके फल) जैसी गंध आना", "पशु दाना-चारा छोड़कर केवल सूखा भूसा खाना पसंद करता है", "दूध उत्पादन में अत्यधिक तीव्र गिरावट", "पागलपन के लक्षण (लकड़ी चबाना, गोल घूमना - Nervous Ketosis)"],
      labTests: [
        { sNo: 1, testName: "Rothera's Test (Urine Ketones)", sampleType: "Fresh Urine", approxMrp: 50, tat: "2 मिनट", confirms: "बैंगनी छल्ला (कीटोन बॉडीज की पुष्टि)" }
      ],
      stages: [
        { stage: 1, signs: "दाना न खाना, दूध कम होना", recovery: "प्रोपलीन ग्लाइकोल से 24h में ठीक", deterioration: "वजन में तेजी से गिरावट" },
        { stage: 2, signs: "मीठी सांस, सूखा भूसा खाना, सुस्ती", recovery: "48 घंटे में सामान्य", deterioration: "नर्वस लक्षण प्रकट होना" },
        { stage: 3, signs: "नर्वस कीटोसिस, दीवार चाटना, अंधापन", recovery: "आईवी डेक्सट्रोज व स्टेरॉयड से ठीक", deterioration: "अत्यधिक दुर्बलता" },
        { stage: 4, signs: "फैटी लिवर सिंड्रोम, उठने में असमर्थ", recovery: "कठिन व संदेहास्पद", deterioration: "लिवर फेल्योर" }
      ],
      treatment: {
        injections: [
          { name: "Dextrose 25% or 50%", salt: "Hypertonic Dextrose", ethicalBrand: "Dextrose 25%", genericOption: "D25 IV 500ml", mrpEthical: 90, mrpGeneric: 45, dose: "500-1000 ml IV Fast", route: "IV", pregnancySafe: true, purpose: "रक्त ग्लूकोज की तुरंत पूर्ति" },
          { name: "Isoflupredone Acetate", salt: "Isoflupredone 2mg/ml", ethicalBrand: "Predef 2X", genericOption: "Isoflupredone", mrpEthical: 320, mrpGeneric: 150, dose: "10 ml IM", route: "IM", pregnancySafe: true, purpose: "ग्लूकोनियोजेनेसिस उत्तेजित करना" }
        ],
        oral: [{ name: "Propylene Glycol Liquid", brand: "Ketosol / Ketomust", approxMrp: 350, dose: "200 ml BD 4 दिन", pregnancySafe: true, purpose: "ग्लूकोज पूर्ववर्ती (Precursor)" }],
        ayurvedic: [{ name: "गुड़ व अजवाइन काढ़ा", ingredients: "गुड़ 300g, अजवाइन 50g, सोंठ 20g", approxMrp: 50, dose: "दैनिक 1 बार", purpose: "ऊर्जा व पाचन सुधार" }],
        homeopathic: [{ name: "Lycopodium 200", dose: "10 बूंद", route: "ओरल", purpose: "लिवर क्रिया सुधार" }],
        desiRemedies: [{ name: "मीठा सोडा व गुड़", ingredients: "मीठा सोडा 50g, गुड़ 250g", preparation: "गुनगुने पानी में घोलकर 3 दिन पिलाएं" }]
      }
    }),

    createProfile({ id: "DIS_BLOAT", nameHi: "अफारा / रूमेनल टिम्पनी (Bloat / Ruminal Tympany)", nameEn: "Ruminal Tympany", category: "METABOLIC", tempRange: "101.5°F - 102.5°F", cardinalSigns: ["बायां पेट (Left Paralumbar Fossa) ढोलक की तरह फूलना", "सांस लेने में भारी कठिनाई व जीभ बाहर निकलना", "पेट में लात मारना व बार-बार उठना-बैठना", "बाएं पेट पर उंगली मारने पर ड्रम जैसी आवाज"] }),
    createProfile({ id: "DIS_DOWNER_COW", nameHi: "डाउनेर काउ सिंड्रोम (Downer Cow Syndrome)", nameEn: "Downer Cow Syndrome", category: "METABOLIC", tempRange: "100.5°F - 102.0°F", cardinalSigns: ["मिल्क फीवर के इलाज के बाद भी उठने में असमर्थता", "पशु का सतर्क व सजग होकर भोजन करना किंतु पिछले पैरों पर जोर न देना", "मांसपेशियों व नसों में खिंचाव व क्षति"] }),
    createProfile({ id: "DIS_PPH", nameHi: "ब्याने बाद का लाल पेशाब (Post-Parturient Hemoglobinuria)", nameEn: "Post-Parturient Hemoglobinuria", category: "METABOLIC", tempRange: "101.5°F - 102.5°F", cardinalSigns: ["ब्याने के 2-4 सप्ताह बाद बिना बुखार के लाल-कॉफी पेशाब", "फास्फोरस की भारी कमी से RBCs का टूटना", "गंभीर दुर्बलता व सांस फूलना"] }),
    createProfile({ id: "DIS_GRASS_TETANY", nameHi: "घास टिटैनी / हाइपोमैग्नीसीमिया (Grass Tetany)", nameEn: "Hypomagnesemia", category: "METABOLIC", tempRange: "102.0°F - 104.0°F", cardinalSigns: ["मैग्नीशियम की कमी से पूरे शरीर में ऐंठन व झटके", "उत्तेजना, आक्रामकता व दांत किटकिटाना", "तेज दौड़ना व अचानक गिरकर कांपना"] }),
    createProfile({ id: "DIS_RUMEN_ACIDOSIS", nameHi: "रूमेन एसिडोसिस / दाना अपच (Grain Overload / Acidosis)", nameEn: "Rumen Acidosis", category: "METABOLIC", tempRange: "99.0°F - 101.0°F", cardinalSigns: ["अत्यधिक आटा, चावल या दाना खाने के बाद रूमेन का रुकना", "खट्टा बदबूदार पतला दस्त", "रूमेन का pH 5 से नीचे गिरना", "गंभीर निर्जलीकरण"] }),
    createProfile({ id: "DIS_RICKETS", nameHi: "सूखा रोग / रिकेट्स (Rickets / Osteomalacia)", nameEn: "Rickets", category: "METABOLIC", tempRange: "Normal", cardinalSigns: ["बछड़ों में पैरों की हड्डियों का मुड़ना (Bow legs)", "जोड़ों में दर्द व सूजन", "दीवार या मिट्टी चाटना (Pica)"] }),

    // ==========================================
    // 5. TOXICOLOGY & POISONING (39-43)
    // ==========================================
    createProfile({
      id: "DIS_CYANIDE",
      nameHi: "सायनाइड / धतूरा / ज्वार विषाक्तता (HCN Poisoning)",
      nameEn: "Cyanide Toxicity",
      category: "TOXICOLOGY",
      tempRange: "Normal to Sub-normal",
      cardinalSigns: ["सूखे की कच्ची ज्वार या नई चरी खाने के बाद अचानक सांस फूलना", "रक्त का रंग चमकदार चेरी-लाल (Bright Cherry Red Blood) होना", "मुंह से अत्यधिक झाग व पुतलियों का फैलना", "दौरे पड़ना व 15-30 मिनट में मृत्यु"],
      labTests: [
        { sNo: 1, testName: "Picrate Paper Test (HCN)", sampleType: "Rumen Content", approxMrp: 150, tat: "15 मिनट", confirms: "पीला पेपर ईंट जैसा लाल होना" }
      ],
      treatment: {
        injections: [
          { name: "Sodium Thiosulfate + Sodium Nitrite", salt: "Anti-Cyanide Formulation", ethicalBrand: "Cyano-Kit Vet", genericOption: "Sodium Thiosulfate 20%", mrpEthical: 350, mrpGeneric: 180, dose: "Sodium Nitrite 3g + Sodium Thiosulfate 15g IV", route: "Slow IV", pregnancySafe: true, purpose: "विशिष्ट सायनाइड एंटीडोट" }
        ],
        oral: [],
        ayurvedic: [],
        homeopathic: [],
        desiRemedies: [{ name: "शीरा या गुड़ का गाढ़ा घोल", ingredients: "गुड़ 1kg, 2 लीटर पानी", preparation: "सायनाइड अवशोषण धीमा करने हेतु तुरंत पिलाएं" }]
      }
    }),

    createProfile({ id: "DIS_UREA", nameHi: "यूरिया विषाक्तता (Urea / Ammonia Toxicity)", nameEn: "Urea Poisoning", category: "TOXICOLOGY", tempRange: "Normal to High", cardinalSigns: ["यूरिया दाना खाने के 20 मिनट में पेट दर्द व बेचैनी", "मुंह से लार, पेट में अत्यधिक गैस (Bloat)", "मांसपेशियों में तीव्र कंपन व सांस अवरोध"] }),
    createProfile({ id: "DIS_NITRATE", nameHi: "नाइट्रेट-नाइट्राइट विषाक्तता (Nitrate Toxicity)", nameEn: "Nitrate Toxicity", category: "TOXICOLOGY", tempRange: "Sub-normal", cardinalSigns: ["रासायनिक खाद वाले खेत की घास खाने बाद चॉकलेट-भूरा रक्त (Chocolate Brown Blood)", "ऑक्सीजन की भारी कमी से नीली श्लेष्मा झिल्ली", "मिथाइलीन ब्लू 1-2% IV इसका सटीक तोड़"] }),
    createProfile({ id: "DIS_SNAKEBITE", nameHi: "सर्पदंश / सांप का काटना (Snake Envenomation)", nameEn: "Snake Envenomation", category: "TOXICOLOGY", tempRange: "Normal", cardinalSigns: ["थूथन या पैर पर दांतों के दो रक्तस्रावी निशान (Fang marks)", "काटने वाले अंग पर भीषण सूजन व खून न जमना (Viper)", "सांस का पक्षाघात व लार गिरना (Cobra/Krait)"] }),
    createProfile({ id: "DIS_ORGANOPHOSPHATE", nameHi: "कीटनाशक / ऑर्गनोफॉस्फेट विषाक्तता (OP Poisoning)", nameEn: "Organophosphate Toxicity", category: "TOXICOLOGY", tempRange: "Sub-normal", cardinalSigns: ["SLUDGE लक्षण: लार (Salivation), आंसू (Lacrimation), पेशाब (Urination), दस्त (Diarrhea)", "आंख की पुतली सुई जैसी बारीक (Pinpoint pupil) होना", "एट्रोपिन सल्फेट IV/SC इसका विशिष्ट मारक"] }),

    // ==========================================
    // 6. GYNAECOLOGY & OBSTETRICS (44-48+)
    // ==========================================
    createProfile({
      id: "DIS_PROLAPSE",
      nameHi: "गर्भाशय या फूल का बाहर आना (Uterine / Vaginal Prolapse)",
      nameEn: "Uterine Prolapse",
      category: "GYNAECOLOGICAL",
      tempRange: "101.5°F - 103.0°F",
      cardinalSigns: ["प्रसव के बाद योनि मार्ग से लाल-गुलाबी मांसल अंग का पूरा बाहर लटकना", "गर्भाशय पर बटन जैसी कॉटिलेडॉन्स (Caruncles) का दिखना", "पशु का लगातार जोर (Straining) लगाना", "अंग में सूजन, गंदगी व रक्तस्राव"],
      labTests: [],
      stages: [
        { stage: 1, signs: "बैठने पर हल्का योनि भाग बाहर दिखना", recovery: "खड़े होने पर अंदर जाना, आसान सुधार", deterioration: "अंग का बाहर ही रह जाना" },
        { stage: 2, signs: "गर्भाशय का पूर्ण बाहर लटकना, ताजा लाल", recovery: "धोकर चढ़ाने पर पूर्ण सफल", deterioration: "सूजन व घाव होना" },
        { stage: 3, signs: "अंग का काला/नीला पड़ना, तेज बदबू", recovery: "एंटीबायोटिक व सावधानीपूर्वक रिपोजिशन", deterioration: "गैंग्रीन" },
        { stage: 4, signs: "गर्भाशय का फटना, शॉक व भारी रक्तस्राव", recovery: "अंग काटना (Amputation) या मृत्यु", deterioration: "मृत्यु" }
      ],
      treatment: {
        injections: [
          { name: "Epidural Lignocaine 2%", salt: "Lignocaine HCl 20mg/ml", ethicalBrand: "Xylocaine 2%", genericOption: "Lignocaine Inj", mrpEthical: 60, mrpGeneric: 30, dose: "5-8 ml Epidural Space", route: "Epidural", pregnancySafe: true, purpose: "जोर लगाना व दर्द तत्काल रोकना" },
          { name: "Oxytocin", salt: "Oxytocin 10 IU/ml", ethicalBrand: "Syntocinon", genericOption: "Oxytocin Inj", mrpEthical: 45, mrpGeneric: 20, dose: "30-50 IU IM (रिपोजिशन के बाद)", route: "IM", pregnancySafe: false, purpose: "गर्भाशय का संकुचन व अपनी जगह टिकना" }
        ],
        oral: [{ name: "Prolapse Powder", brand: "Prolap-Nill / Reprovet", approxMrp: 180, dose: "50g BD", pregnancySafe: true, purpose: "आंतरिक बल व तनाव मुक्ति" }],
        ayurvedic: [{ name: "गूलर छाल व फिटकरी", ingredients: "गूलर छाल काढ़ा", approxMrp: 30, dose: "धोने हेतु", purpose: "अंग संकुचन" }],
        homeopathic: [{ name: "Sepia 200 + Podophyllum 200", dose: "10-10 बूंद", route: "ओरल", purpose: "अंग बाहर फेंकना रोकना" }],
        desiRemedies: [{ name: "बर्फ व चीनी प्रक्षालन", ingredients: "बर्फ, चीनी 500g, पोटाश जल", preparation: "पोटाश जल से धोएं, चीनी डालकर सूजन घटाएं फिर वापस अंदर धकेलें" }]
      }
    }),

    createProfile({ id: "DIS_ROP", nameHi: "जेर का रुकना (Retention of Placenta - ROP)", nameEn: "Retention of Placenta", category: "GYNAECOLOGICAL", tempRange: "101.5°F - 103.5°F", cardinalSigns: ["प्रसव के 8-12 घंटे बाद भी जेर का बाहर न गिरना", "योनि से सड़नयुक्त बदबूदार स्राव आना", "जबरन हाथ से खींचना सख्त मना (गर्भाशय क्षति का खतरा)"] }),
    createProfile({ id: "DIS_METRITIS", nameHi: "गर्भाशय शोथ / बच्चेदानी में पीब (Acute Septic Metritis)", nameEn: "Septic Metritis", category: "GYNAECOLOGICAL", tempRange: "103.5°F - 105.0°F", cardinalSigns: ["प्रसव के 1-2 सप्ताह बाद योनि से अत्यधिक दुर्गंधयुक्त लाल-भूरा मवाद निकलना", "तेज बुखार, भूख न लगना व दूध में भारी गिरावट", "टॉक्सीमिया व डिहाइड्रेशन"] }),
    createProfile({ id: "DIS_DYSTOCIA", nameHi: "कष्टप्रसव / बच्चा अटकना (Dystocia)", nameEn: "Dystocia", category: "GYNAECOLOGICAL", tempRange: "102.0°F - 104.0°F", cardinalSigns: ["पानी की थैली फटने के 2 घंटे बाद भी बच्चा बाहर न आना", "पशु का दर्द से कराहना व अत्यधिक जोर लगाना", "बच्चे के पैर या सिर का मुड़ जाना (Malpresentation)"] }),
    createProfile({ id: "DIS_PYOMETRA", nameHi: "पायोमेट्रा / गर्भाशय में पीब का भराव (Closed/Open Pyometra)", nameEn: "Pyometra", category: "GYNAECOLOGICAL", tempRange: "Normal to 103.0°F", cardinalSigns: ["गर्भाशय में भारी मात्रा में पीला मवाद जमा होना", "पशु का मद में न आना (CL बना रहना)", "PGF2alpha (Lutalyse/Juramate) इसका विशिष्ट उपचार"] })
  ];

  // Assign to Global Scope with Resilient Fallback
  window.VETCARE_DISEASE_DB = rawDiseases.filter(Boolean);

  // Global Helper Methods for Fast Lookup & Filtering
  window.getClinicalDiseaseById = function (id) {
    if (!id) return null;
    return window.VETCARE_DISEASE_DB.find(d => d.id === id) || null;
  };

  window.getClinicalDiseasesByCategory = function (category) {
    if (!category || category === "ALL") return window.VETCARE_DISEASE_DB;
    return window.VETCARE_DISEASE_DB.filter(d => d.category === category);
  };

  console.info(`[Vetcare Clinical DB] Successfully loaded ${window.VETCARE_DISEASE_DB.length} exhaustive disease profiles.`);
})(window);
