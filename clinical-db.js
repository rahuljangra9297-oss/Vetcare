// Vetcare AI OS - Master Clinical Database (2026 Production)
// Architecture: Principal Veterinary Pharmacologist, Immunologist & Database Architect
// Target Platforms: Clinical Decision Support System (CDSS), PWA OS, Doctor Field OPD, Smart Dairy

(function (root) {
  "use strict";

  /* =========================================================================
     1. EXHAUSTIVE VACCINATION KNOWLEDGE BASE (window.VETCARE_VACCINATION_DB)
     National Livestock Vaccination Protocols, Indian Subcontinent Field Standard
     ========================================================================= */
  const VACCINATION_DB = [
    {
      id: "vax_hs",
      diseaseNameHi: "गलघोंटू (Hemorrhagic Septicemia)",
      diseaseNameEn: "Hemorrhagic Septicemia (HS)",
      vaccineName: "HS Alum Precipitated Vaccine / Oil Adjuvant (Raksha-HS)",
      targetSpecies: ["गाय", "भैंस"],
      targetAge: "6 माह एवं उससे अधिक आयु के सभी गोवंशीय व महीषवंशीय पशु",
      routeAndDose: "5 ml S/C (Alum) या 2-3 ml Deep I/M (Oil Adjuvant)",
      idealSeason: "मई - जून (मानसून आगमन से पूर्व अनिवार्य)",
      boosterFrequency: "वार्षिक (प्रतिवर्ष वर्षा ऋतु से पहले)",
      clinicalBenefits: "पाश्चुरेला मल्टोसीडा (Pasteurella multocida Type B:2) जनित गंभीर गले की सूजन, तीव्र श्वसन अवरोध व आकस्मिक मृत्यु से 95%+ सुरक्षा।",
      precautions: "अंतिम माह की गाभिन अवस्था में अत्यधिक तनाव से बचाएं। बीमार अथवा ज्वरग्रस्त पशु को कभी न लगाएं। कोल्ड चेन (2-8°C) अनिवार्य।"
    },
    {
      id: "vax_bq",
      diseaseNameHi: "लंगड़ा बुखार / चरचरा (Black Quarter)",
      diseaseNameEn: "Black Quarter (BQ)",
      vaccineName: "BQ Polyvalent Vaccine (Raksha-BQ / Formalin Inactivated)",
      targetSpecies: ["गाय", "भैंस", "भेड़"],
      targetAge: "6 माह से 3 वर्ष की आयु के हृष्ट-पुष्ट पशु (सर्वाधिक संवेदनशील आयु)",
      routeAndDose: "5 ml Subcutaneous (त्वचा के नीचे गर्दन क्षेत्र में)",
      idealSeason: "मई - जून (मानसून पूर्व टीकाकरण)",
      boosterFrequency: "वार्षिक (प्रतिवर्ष वर्षा ऋतु पूर्व)",
      clinicalBenefits: "क्लॉस्ट्रिडियम शोवेई (Clostridium chauvoei) के विषाक्त स्पोर्स जनित पुट्ठे/कंधे की घातक गैस सूजन व चर्र-चर्र गैंग्रीन से संपूर्ण बचाव।",
      precautions: "सुई बिल्कुल विसंक्रमित (Sterile) हो। 3 वर्ष से अधिक आयु के वयस्क मवेशियों में सापेक्षिक प्राकृतिक प्रतिरोधक क्षमता विकसित हो जाती है।"
    },
    {
      id: "vax_fmd",
      diseaseNameHi: "खुरपका-मुंहपका (FMD)",
      diseaseNameEn: "Foot and Mouth Disease (FMD)",
      vaccineName: "FMD Inactivated Trivalent/Quadrivalent (O, A, Asia-1) (Raksha-Ovac)",
      targetSpecies: ["गाय", "भैंस", "भेड़", "बकरी", "सूअर"],
      targetAge: "4 माह की आयु से प्रारंभ",
      routeAndDose: "गाय/भैंस: 2 ml Deep I/M या S/C; भेड़/बकरी: 1 ml Deep I/M",
      idealSeason: "वर्ष में दो बार: प्रथम चक्र (सितंबर-अक्टूबर), द्वितीय चक्र (फरवरी-मार्च)",
      boosterFrequency: "प्रथम टीकाकरण के 3-4 सप्ताह बाद बूस्टर, तत्पश्चात प्रत्येक 6 माह पर",
      clinicalBenefits: "पिकोर्ना विषाणु जनित मुंह-खुर के छालों, अयन क्षति, दुग्ध उत्पादन के स्थायी पतन एवं बछड़ों में मायोकार्डाइटिस (हार्ट फेलियर) से पूर्ण रक्षा।",
      precautions: "टीका लगने के उपरांत 12-24 घंटे तक हल्का शारीरिक ज्वर एवं दुग्ध उत्पादन में 1-2 दिन का अस्थायी उतार-चढ़ाव स्वाभाविक है।"
    },
    {
      id: "vax_lsd",
      diseaseNameHi: "लंपी स्किन रोग (Lumpy Skin Disease)",
      diseaseNameEn: "Lumpy Skin Disease (LSD)",
      vaccineName: "Heterologous Goat Pox Vaccine (Uttarkashi Strain) / Lumpi-ProVacInd",
      targetSpecies: ["गाय", "भैंस"],
      targetAge: "4 माह से ऊपर के समस्त गोवंशीय पशु",
      routeAndDose: "3 ml Subcutaneous (Goat Pox 10x dose for cattle) या 1 ml (Lumpi-ProVacInd)",
      idealSeason: "फरवरी - अप्रैल (मच्छर, मक्खी व चिचड़ी के प्रसार काल से पूर्व)",
      boosterFrequency: "वार्षिक (प्रतिवर्ष एक बार)",
      clinicalBenefits: "कैप्रिपॉक्स वायरस जनित त्वचा पर कठोर गांठें, पैरों में भीषण शोफ (edema), न्यूमोनिया एवं अंधापन उत्पन्न करने वाली महामारी से ठोस सुरक्षा।",
      precautions: "सक्रिय रूप से गांठों से पीड़ित गोवंश को कभी न लगाएं। केवल स्वस्थ गोवंश को ही झुंड प्रतिरक्षा (Herd Immunity) हेतु लगाएं।"
    },
    {
      id: "vax_brucella",
      diseaseNameHi: "ब्रुसेलोसिस (Brucellosis / संक्रामक गर्भपात)",
      diseaseNameEn: "Brucellosis (Contagious Bovine Abortion)",
      vaccineName: "Brucella abortus Cotton Strain-19 (Live Attenuated) या RB-51",
      targetSpecies: ["गाय", "भैंस (केवल मादा बछड़ियां)"],
      targetAge: "4 से 8 माह की केवल मादा बछड़ियां (Calfhood Vaccination Only)",
      routeAndDose: "2 ml Subcutaneous (गर्दन के किनारे)",
      idealSeason: "वर्ष में कभी भी, जब बछड़ी निर्धारित 4-8 माह की आयु सीमा में हो",
      boosterFrequency: "जीवनकाल में केवल एक बार (Once in a lifetime)",
      clinicalBenefits: "गर्भावस्था के अंतिम त्रैमास (6-9 माह) में संक्रामक गर्भपात, जेर रुकने (ROP), मेट्राइटिस एवं मनुष्यों में माल्टा फीवर (Zoonosis) का स्थाई उन्मूलन।",
      precautions: "अत्यंत महत्वपूर्ण: नर नर-बछड़ों अथवा 8 माह से बड़ी या गाभिन गायों में कभी न लगाएं। मनुष्यों में संक्रमण का खतरा रहता है अतः ग्लव्स पहनकर लगाएं।"
    },
    {
      id: "vax_ppr",
      diseaseNameHi: "पीपीआर (बकरी प्लेग / Peste des Petits Ruminants)",
      diseaseNameEn: "Peste des Petits Ruminants (PPR)",
      vaccineName: "PPR Live Attenuated Cell Culture Vaccine (Sungri 96 Strain)",
      targetSpecies: ["बकरी", "भेड़"],
      targetAge: "3-4 माह की आयु के मेमने व बकरियां",
      routeAndDose: "1 ml Subcutaneous (गर्दन अथवा जांघ के भीतरी ढीले हिस्से में)",
      idealSeason: "नवंबर - दिसंबर अथवा ग्रीष्म ऋतु पूर्व",
      boosterFrequency: "प्रत्येक 3 वर्ष में एक बार (3 Years Solid Immunity)",
      clinicalBenefits: "मोरबिलीवायरस जनित मुंह में सड़ांधयुक्त छाले, फेफड़ों का गंभीर न्यूमोनिया और बदबूदार खूनी दस्त से होने वाली 90% उच्च मृत्यु दर की पूर्ण रोकथाम।",
      precautions: "पुनर्गठित (Reconstituted) वैक्सीन को बर्फ के बीच रखें तथा 2 घंटे के भीतर उपयोग कर लें। ब्याने के अंतिम 15 दिन में न लगाएं।"
    },
    {
      id: "vax_et",
      diseaseNameHi: "फिड़किया रोग (Enterotoxemia / Pulpy Kidney)",
      diseaseNameEn: "Enterotoxemia (ET)",
      vaccineName: "Enterotoxemia Vaccine (Clostridium perfringens Type D Inactivated Toxoid)",
      targetSpecies: ["भेड़", "बकरी", "गाय-भैंस के छोटे कटड़े"],
      targetAge: "2 माह एवं उससे अधिक आयु के पशु",
      routeAndDose: "भेड़/बकरी: 2 ml Subcutaneous; बड़े पशु: 5 ml S/C",
      idealSeason: "जुलाई - अगस्त (नई घास व अधिक दाना चरने के मौसम से ठीक पहले)",
      boosterFrequency: "वार्षिक (प्रथम टीकाकरण के 14 दिन बाद प्राथमिक बूस्टर अनिवार्य)",
      clinicalBenefits: "क्लोस्ट्रीडियम के एप्सिलॉन टॉक्सिन (Epsilon Toxin) द्वारा आंतों के विषाक्त अवशोषण, मस्तिष्क क्षति (Opisthotonos) व आकस्मिक मृत्यु से सुरक्षा।",
      precautions: "अचानक चारा परिवर्तन या उच्च प्रोटीन/अनाज आहार देने से पहले प्रतिरक्षा स्तर स्थापित होना आवश्यक है।"
    },
    {
      id: "vax_anthrax",
      diseaseNameHi: "एंथ्रेक्स / जहरी बुखार (Splenic Fever)",
      diseaseNameEn: "Anthrax",
      vaccineName: "Anthrax Spore Vaccine (Living Attenuated Sterne Strain 34F2)",
      targetSpecies: ["गाय", "भैंस", "भेड़", "बकरी", "घोड़ा"],
      targetAge: "6 माह से ऊपर के समस्त पशु (केवल स्थानिक / Endemic क्षेत्रों में)",
      routeAndDose: "गाय/भैंस: 1 ml Subcutaneous; भेड़/बकरी: 0.5 ml S/C",
      idealSeason: "मानसून पूर्व (अप्रैल - मई)",
      boosterFrequency: "वार्षिक (केवल उन क्षेत्रों में जहां पिछले वर्षों में एंथ्रेक्स की पुष्टि हुई हो)",
      clinicalBenefits: "बैसिलस एंथ्रासिस जनित आकस्मिक मृत्यु, प्लीहा (Tarry Blood) विस्फारण एवं मनुष्यों में प्राणघातक संक्रमण की अचूक रोकथाम।",
      precautions: "वैक्सीनेशन के 15 दिन पूर्व अथवा उपरांत किसी भी प्रकार की एंटीबायोटिक (विशेषतः पेनिसिलिन) न दें, अन्यथा वैक्सीन के स्पोर नष्ट हो जाएंगे।"
    },
    {
      id: "vax_rabies",
      diseaseNameHi: "रेबीज / हलक जाना (Rabies)",
      diseaseNameEn: "Rabies Post & Pre-Exposure Prophylaxis",
      vaccineName: "Inactivated Rabies Veterinary Vaccine (Nobivac Rabies / Raksharab)",
      targetSpecies: ["गाय", "भैंस", "कुत्ता", "बिल्ली", "भेड़", "बकरी", "घोड़ा"],
      targetAge: "पागल कुत्ते/सियार द्वारा काटने के तुरंत बाद (Any age)",
      routeAndDose: "1 ml Subcutaneous अथवा Intramuscular (गले की पेशी में)",
      idealSeason: "काटने के पश्चात तत्काल (Post-Bite Prophylaxis Day 0, 3, 7, 14, 28)",
      boosterFrequency: "पोस्ट-बाइट रेजिमेन: 0, 3, 7, 14 व 28वें दिन। प्री-एक्सपोजर: वार्षिक।",
      clinicalBenefits: "न्यूरोट्रोपिक लिसावायरस जनित 100% प्राणघातक एन्सेफेलोमाइलाइटिस से पूर्ण बचाव यदि लक्षण प्रकट होने से पहले कोर्स पूर्ण हो जाए।",
      precautions: "यदि पशु में रंभाने, लार टपकने या पक्षाघात के नैदानिक लक्षण प्रकट हो चुके हों तो वैक्सीन का कोई प्रभाव नहीं होता; तुरंत आइसोलेट करें।"
    },
    {
      id: "vax_theileria",
      diseaseNameHi: "थायलेरियासिस (Theileriosis)",
      diseaseNameEn: "Bovine Theileriosis",
      vaccineName: "Theileria annulata Schizont Cell Culture Vaccine (Rakshavac-T)",
      targetSpecies: ["विदेशी (HF/Jersey) एवं संकर (Crossbred) गायें तथा उच्च दुग्ध उत्पादक बछड़ियां"],
      targetAge: "2 माह से अधिक आयु की संकर बछड़ियां व गायें",
      routeAndDose: "3 ml Subcutaneous (गर्दन क्षेत्र)",
      idealSeason: "फरवरी - मार्च (चिचड़ियों की सक्रियता बढ़ने से पूर्व)",
      boosterFrequency: "जीवनकाल में एक बार अथवा उच्च स्थानिक दबाव में प्रत्येक 3 वर्ष",
      clinicalBenefits: "हाइलोमा चिचड़ी जनित भीषण ज्वर, लिम्फ नोड सूजन, लाल रक्त कणिकाओं के विनाश एवं घातक एनीमिया से 90%+ सुरक्षा।",
      precautions: "वैक्सीन तरल नाइट्रोजन (-196°C) में सुरक्षित रहती है; थॉइंग (Thawing) प्रोटोकॉल का शत-प्रतिशत पालन अनिवार्य।"
    }
  ];

  /* =========================================================================
     2. DUAL DRUG PRICING & CLASSIFICATION (window.VETCARE_MEDICINES_DB)
     Ethical (Branded) vs Generic Field Equivalence, Precise Pharmacology & Safety
     ========================================================================= */
  const MEDICINES_DB = [
    {
      id: "med_ceftriaxone_3g",
      salt: "Ceftriaxone Sodium Sterile 3000 mg",
      category: "Antibiotic (3rd Gen Cephalosporin)",
      ethicalBrand: { name: "Inj. Intacef 3g", company: "Intas Pharmaceuticals", approxMrp: 410 },
      genericOption: { name: "Inj. Ceftriaxone 3g (KVS / Jan Aushadhi Vet)", approxMrp: 165 },
      doseRate: "5-10 mg/kg शारीरिक भार (वयस्क गोवंश: 3 ग्राम)",
      route: "Deep IM / Slow IV (Reconstitute with Sterile Water)",
      pregnancySafe: true,
      indications: "तीव्र गलघोंटू (HS), जटिल थनैल (Mastitis), ब्रोंकोन्यूमोनिया, गर्भाशय शोथ, सर्जरी उपरांत संक्रमण।",
      contraindications: "सेफालोस्पोरिन वर्ग से अतिसंवेदनशीलता; कैल्शिययुक्त IV फ्लुइड्स (Ringer Lactate) के साथ एक ही कैनुला में न मिलाएं।"
    },
    {
      id: "med_ceftiofur_1g",
      salt: "Ceftiofur Sodium Sterile Powder 1000 mg",
      category: "Antibiotic (Advanced 3rd Gen Cephalosporin)",
      ethicalBrand: { name: "Inj. Xceft 1g / Excenel", company: "Zoetis / Intas", approxMrp: 520 },
      genericOption: { name: "Inj. Ceftiofur Sodium 1g (Generic Vet)", approxMrp: 230 },
      doseRate: "1.1 - 2.2 mg/kg शारीरिक भार (500 kg पशु हेतु 1 ग्राम दैनिक)",
      route: "Deep Intramuscular (IM) Only",
      pregnancySafe: true,
      indications: "मिल्क विथड्रॉल शून्य (Zero Milk Withdrawal) हेतु सर्वोत्तम। तीव्र रेस्पिरेटरी इन्फेक्शन, ब्रोंकाइटिस, एक्यूट मेट्राइटिस, इंटरडिजिटल नेक्रोबैसिलोसिस (खुर सड़न)।",
      contraindications: "इंट्रावेनस (IV) मार्ग से कभी न दें। पुनर्गठन के 24 घंटे के भीतर इस्तेमाल करें।"
    },
    {
      id: "med_enrofloxacin_100",
      salt: "Enrofloxacin Injection 100 mg/ml (10%)",
      category: "Antibiotic (Fluoroquinolone)",
      ethicalBrand: { name: "Inj. Fortivir / Enrocin 100ml", company: "Virbac / Zydus AH", approxMrp: 380 },
      genericOption: { name: "Inj. Enrofloxacin 10% 100ml (Generic)", approxMrp: 160 },
      doseRate: "5 mg/kg शारीरिक भार (1 ml प्रति 20 kg शारीरिक भार)",
      route: "Deep IM / Slow IV / SC",
      pregnancySafe: true,
      indications: "कोलीबैसिलोसिस, बछड़ों के सफेद दस्त, मायकोप्लाज्मोसिस, तीव्र यूरीनरी ट्रैक्ट इन्फेक्शन, साल्मोनेलोसिस।",
      contraindications: "बढ़ते हुए छोटे पिल्लों/घोड़ों के जोड़ों के कार्टिलेज को क्षति पहुंचा सकता है। तेजी से IV न लगाएं।"
    },
    {
      id: "med_amoxicillin_sulbactam",
      salt: "Amoxicillin Sodium 3000 mg + Sulbactam Sodium 1500 mg (4.5g)",
      category: "Antibiotic (Beta-lactamase Inhibitor Combo)",
      ethicalBrand: { name: "Inj. Moxikind-CV 4.5g", company: "Mankind Pharma (Vetmankind)", approxMrp: 460 },
      genericOption: { name: "Inj. Amoxicillin-Sulbactam 4.5g (Generic Vet)", approxMrp: 195 },
      doseRate: "7-10 mg/kg शारीरिक भार (वयस्क पशु 350-450 kg: 4.5 g वायल)",
      route: "Deep IM / Slow IV",
      pregnancySafe: true,
      indications: "रेजिस्टेंट जीवाणु संक्रमण, गंभीर नैक्रोटिक थनैल, लंगड़ा बुखार (BQ), मेट्राइटिस, गहरे घाव व पोस्ट-ऑपरेटिव सेप्सिस।",
      contraindications: "पेनिसिलिन एलर्जी। पुनर्गठन के उपरांत तुरंत उपयोग करें, घोल अधिक समय तक स्थिर नहीं रहता।"
    },
    {
      id: "med_oxytetracycline_la",
      salt: "Oxytetracycline Dihydrate 200 mg/ml (Long Acting 20%)",
      category: "Antibiotic (Broad Spectrum Tetracycline)",
      ethicalBrand: { name: "Inj. Terramycin LA 30ml / Oxyvet LA", company: "Zoetis / Cargill", approxMrp: 180 },
      genericOption: { name: "Inj. Oxytetracycline LA 20% 30ml (Generic)", approxMrp: 85 },
      doseRate: "20 mg/kg शारीरिक भार (1 ml प्रति 10 kg भार; 72 घंटे तक प्रभावी)",
      route: "Deep Intramuscular (एक ही स्थान पर 10-15 ml से अधिक न लगाएं)",
      pregnancySafe: false,
      indications: "एनाप्लास्मोसिस, थायलेरियासिस, क्लिनिकल न्यूमोनिया, खुर सड़न, वुडन टंग, एक्टिनोमाइकोसिस।",
      contraindications: "गर्भावस्था के अंतिम त्रैमास में निषेध (भ्रूण की हड्डियों व दांतों का विरंजन एवं विकृति)। IV कभी न दें।"
    },
    {
      id: "med_meloxicam_paracetamol",
      salt: "Meloxicam 5 mg/ml + Paracetamol 150 mg/ml",
      category: "NSAID (Preferential COX-2 Inhibitor & Antipyretic)",
      ethicalBrand: { name: "Inj. Melonex Plus 100ml", company: "Intas Pharmaceuticals", approxMrp: 290 },
      genericOption: { name: "Inj. Meloxi-Para 100ml (Generic Vet)", approxMrp: 130 },
      doseRate: "Meloxicam 0.5 mg/kg + Paracetamol 15 mg/kg (वयस्क पशु: 15-20 ml)",
      route: "Deep Intramuscular (IM) Only",
      pregnancySafe: true,
      indications: "उच्च शारीरिक तापमान, तीव्र दर्द, थन की सूजन, जोड़ों का दर्द, खुरपका-मुंहपका में खुरों की पीड़ा व लंगड़ाहट।",
      contraindications: "गंभीर निर्जलीकरण (Dehydration) अथवा गुर्दे की विफलता (Renal Failure) में पहले पर्याप्त IV फ्लूइड दें।"
    },
    {
      id: "med_flunixin_meglumine",
      salt: "Flunixin Meglumine Injection 50 mg/ml",
      category: "Potent NSAID (Anti-Endotoxic & Visceral Analgesic)",
      ethicalBrand: { name: "Inj. Megludyne 20ml / Finadyne", company: "Virbac / MSD Animal Health", approxMrp: 240 },
      genericOption: { name: "Inj. Flunixin 50mg/ml 20ml (Generic Vet)", approxMrp: 110 },
      doseRate: "1.1 - 2.2 mg/kg शारीरिक भार (1-2 ml प्रति 45 kg भार)",
      route: "Slow IV (सर्वोत्तम) अथवा Deep IM",
      pregnancySafe: true,
      indications: "कोलिक (गंभीर उदर शूल), एंडोटॉक्सिक शॉक (तीव्र थनैल व गलघोंटू का सेप्टीसीमिया), तीव्र श्वसन संकट, मस्कुलोस्केलेटल पीड़ा।",
      contraindications: "गैस्ट्रिक अल्सरेशन; अन्य NSAIDs (उदा. Meloxicam) के साथ एक साथ कभी न लगाएं।"
    },
    {
      id: "med_buparvaquone",
      salt: "Buparvaquone Injection 50 mg/ml",
      category: "Antiprotozoal (Hydroxynaphthoquinone)",
      ethicalBrand: { name: "Inj. Butalex 20ml / Zubion 20ml", company: "MSD Animal Health / Intas", approxMrp: 1350 },
      genericOption: { name: "Inj. Buparvaquone 50mg/ml 20ml (Generic)", approxMrp: 680 },
      doseRate: "2.5 mg/kg शारीरिक भार (1 ml प्रति 20 kg शारीरिक भार - सिंगल डोज़)",
      route: "Deep Intramuscular (गर्दन की मांसपेशियों में विभाजित करके लगाएं)",
      pregnancySafe: true,
      indications: "थायलेरियासिस (Theileria annulata / T. parva) का अचूक प्राथमिक उपचार (जीवन रक्षक दवा)।",
      contraindications: "IV या SC कभी न दें। गंभीर मामलों में 48 घंटे बाद ही दूसरी खुराक पर विचार करें।"
    },
    {
      id: "med_diminazene",
      salt: "Diminazene Aceturate 70 mg/ml + Phenazone 375 mg/ml",
      category: "Antiprotozoal (Diamidine Derivative)",
      ethicalBrand: { name: "Inj. Berenil RTU 30ml / Babenil", company: "MSD Animal Health / Carus", approxMrp: 210 },
      genericOption: { name: "Inj. Diminazene RTU 30ml (Generic Vet)", approxMrp: 95 },
      doseRate: "3.5 - 5.0 mg/kg शारीरिक भार (1 ml प्रति 15-20 kg शारीरिक भार)",
      route: "Deep Intramuscular Only",
      pregnancySafe: true,
      indications: "बबेशियोसिस (Babesia bigemina - लाल पेशाब), ट्रिपैनोसोमियासिस (सर्रा रोग)।",
      contraindications: "ऊंटों में अत्यंत संवेदनशीलता (विषाक्तता का खतरा)। ओवरडोज़ से केंद्रीय तंत्रिका तंत्र के दौरे पड़ सकते हैं।"
    },
    {
      id: "med_isoflupredone",
      salt: "Isoflupredone Acetate Sterile Suspension 2 mg/ml",
      category: "Corticosteroid (Glucocorticoid - Low Mineralocorticoid)",
      ethicalBrand: { name: "Inj. Predef 2x 10ml / Isoflud", company: "Zoetis / Intas", approxMrp: 260 },
      genericOption: { name: "Inj. Isoflupredone 2mg/ml 10ml (Generic)", approxMrp: 120 },
      doseRate: "10-20 mg कुल मात्रा (वयस्क पशु: 5 से 10 ml)",
      route: "Deep IM / Intra-articular",
      pregnancySafe: true,
      indications: "गर्भावस्था में सुरक्षित स्टेरॉयड! गोजातीय कीटोसिस (Bovine Ketosis), तीव्र एलर्जी, आर्थराइटिस, थनैल शोफ में एंटी-इन्फ्लेमेटरी।",
      contraindications: "अनियंत्रित जीवाणु संक्रमण में बिना शक्तिशाली एंटीबायोटिक के न दें। डेक्सामेथासोन की भांति गर्भपात नहीं कराता।"
    },
    {
      id: "med_calcium_borogluconate",
      salt: "Calcium Borogluconate 25% w/v + Magnesium & Phosphorus (Mifex/CBG)",
      category: "Metabolic Mineral Infusion",
      ethicalBrand: { name: "Inj. Mifex 450ml / Calborol", company: "MSD Animal Health / Cargill", approxMrp: 320 },
      genericOption: { name: "Inj. Calcium Borogluconate 450ml (Generic Vet)", approxMrp: 150 },
      doseRate: "450 ml कुल मात्रा (वयस्क गाय/भैंस)",
      route: "Slow Intravenous (250-300 ml IV) + Subcutaneous (150 ml SC)",
      pregnancySafe: true,
      indications: "मिल्क फीवर (हाइपोकैल्सीमिया), ब्याने के उपरांत सुस्ती व पक्षाघात (Downer Cow Syndrome), ईक्लैम्पसिया।",
      contraindications: "IV देते समय स्टेथॉस्कोप से हृदय गति निरंतर सुनें। यदि एरिथिमिया (अनियमित धड़कन) हो तो तुरंत बहाव रोकें।"
    },
    {
      id: "med_ivermectin_1",
      salt: "Ivermectin Injection 10 mg/ml (1% w/v)",
      category: "Antiparasitic (Macrocyclic Lactone Endectocide)",
      ethicalBrand: { name: "Inj. Neomec 10ml / Hitek 10ml", company: "Intas / Virbac", approxMrp: 110 },
      genericOption: { name: "Inj. Ivermectin 1% 10ml (Generic Vet)", approxMrp: 45 },
      doseRate: "0.2 mg/kg शारीरिक भार (1 ml प्रति 50 kg शारीरिक भार)",
      route: "Subcutaneous (SC) Only (गर्दन की त्वचा उठाकर लगाएं)",
      pregnancySafe: true,
      indications: "आंतरिक कृमि (पेट के गोल कीड़े) एवं बाह्य परजीवी (चिचड़ी, जूं, पिस्सू, मेंज/माइट्स) का 28 दिनों तक निवारण।",
      contraindications: "IM अथवा IV कभी न दें। दुधारू पशुओं में मिल्क विथड्रॉल का ध्यान रखें।"
    },
    {
      id: "med_tonophosphan",
      salt: "Sodium Salt of 4-dimethylamino-2-methylphenyl-phosphinic acid (Tolfaen/Organic Phosphorus)",
      category: "Metabolic Tonic & Phosphorus Supplement",
      ethicalBrand: { name: "Inj. Tonophosphan 30ml / Phosvet", company: "MSD Animal Health / Virbac", approxMrp: 290 },
      genericOption: { name: "Inj. Organic Phosphorus 30ml (Generic Vet)", approxMrp: 130 },
      doseRate: "5-10 ml प्रति अल्टरनेट डे (3 से 5 बार)",
      route: "IM / IV / SC",
      pregnancySafe: true,
      indications: "पोस्ट-पार्टुरिएंट हीमोग्लोबिन्यूरिया (ब्याने बाद फास्फोरस कमी से लाल पेशाब), रिपीट ब्रीडिंग, मेटाबोलिक कमजोरी।",
      contraindications: "अति-संवेदनशीलता रहित सुरक्षित मेटाबोलिक उत्प्रेरक।"
    },
    {
      id: "med_buserelin",
      salt: "Buserelin Acetate 0.0042 mg/ml (Synthetic GnRH Analogue)",
      category: "Reproductive Hormone",
      ethicalBrand: { name: "Inj. Receptal 10ml / Gynarich", company: "MSD Animal Health / Intas", approxMrp: 490 },
      genericOption: { name: "Inj. Buserelin Acetate 10ml (Generic Vet)", approxMrp: 240 },
      doseRate: "5 ml (20 mcg Buserelin) ए.आई. के समय अथवा सिस्टिक ओवरी हेतु",
      route: "Intramuscular (IM) Only",
      pregnancySafe: false,
      indications: "रिपीट ब्रीडिंग समाधान, ओव्यूलेशन (अण्डोत्सर्ग) सुनिश्चित करना, फॉलिक्युलर सिस्ट, गर्भाधान दर में 25-30% वृद्धि।",
      contraindications: "सक्रिय गर्भावस्था के दौरान उपयोग न करें। ल्यूटियल सिस्ट में पहले PGF2alpha की आवश्यकता होती है।"
    },
    {
      id: "med_cloprostenol",
      salt: "Cloprostenol Sodium 250 mcg/ml (Synthetic PGF2-alpha Analogue)",
      category: "Luteolytic Hormone",
      ethicalBrand: { name: "Inj. Pragma 2ml / Vetmate", company: "Intas / Cargill", approxMrp: 220 },
      genericOption: { name: "Inj. Cloprostenol 2ml (Generic Vet)", approxMrp: 95 },
      doseRate: "2 ml (500 mcg Cloprostenol) सिंगल डोज़",
      route: "Deep Intramuscular (IM) Only",
      pregnancySafe: false,
      indications: "पायोमेट्रा (गर्भाशय में मवाद), ममीफाइड भ्रूण, कॉर्पस ल्यूटियम नष्ट कर मद चक्र (Heat) में लाना, ल्यूटियल सिस्ट।",
      contraindications: "गाभिन पशु में 100% गर्भपात कराता है! अस्थमा या श्वसन अवरोध से ग्रस्त पशु में सावधानी बरतें।"
    }
  ];

  /* =========================================================================
     3. ORGAN-BASED SYMPTOM MATRIX (window.VETCARE_SYMPTOMS_BY_ORGAN)
     Diagnostic Weightage (0.0 to 1.0) & Differential Pointers
     ========================================================================= */
  const SYMPTOMS_BY_ORGAN = {
    eyes: [
      { id: "eye_corneal_opacity", nameHi: "आंख की पुतली पर सफेद जाला / धुंधलापन", weight: 0.9, differentials: ["PINK_EYE", "THEILERIOSIS", "MALIGNANT_CATARRHAL_FEVER"] },
      { id: "eye_lacrimation", nameHi: "आंखों से लगातार पानी व कीचड़ बहना", weight: 0.6, differentials: ["FMD", "BRD_PNEUMONIA", "PINK_EYE"] },
      { id: "eye_conjunctival_pallor", nameHi: "आंखों की झिल्ली का बिल्कुल सफेद पड़ना (गंभीर एनीमिया)", weight: 0.85, differentials: ["BABESIOSIS", "ANAPLASMOSIS", "HAEMONCHOSIS", "FASCIOLIASIS"] },
      { id: "eye_petechiae", nameHi: "आंख की झिल्ली पर खून के लाल चकत्ते", weight: 0.8, differentials: ["THEILERIOSIS", "TRYPANOSOMIASIS", "SEPTICEMIA"] },
      { id: "eye_sunken", nameHi: "आंखों का गड्ढे में धंस जाना (भीषण निर्जलीकरण)", weight: 0.75, differentials: ["CALF_SCOURS", "PPR", "ACUTE_ENTERITIS"] }
    ],
    skin: [
      { id: "skin_firm_nodules", nameHi: "त्वचा पर कठोर गोल उभरी गांठें (Nodules)", weight: 0.95, differentials: ["LUMPY_SKIN_DISEASE", "PSEUDO_LUMPY", "DERMATOPHILOSIS"] },
      { id: "skin_crepitus", nameHi: "त्वचा के नीचे गैस का उभार - दबाने पर चर्र-चर्र की आवाज़", weight: 1.0, differentials: ["BLACK_QUARTER", "MALIGNANT_EDEMA"] },
      { id: "skin_crusts_alopecia", nameHi: "बाल झड़ना, पपड़ी जमना एवं तीव्र खुजली", weight: 0.7, differentials: ["MANGE_SCABIES", "RINGWORM", "LICE_INFESTATION"] },
      { id: "skin_submandibular_edema", nameHi: "जबड़े के नीचे पानी जैसी नर्म ठंडी सूजन (बॉटल जॉ)", weight: 0.9, differentials: ["FASCIOLIASIS", "AMPHISTOMIASIS", "HAEMONCHOSIS", "JOHNE_DISEASE"] },
      { id: "skin_hot_painful_throat", nameHi: "गले व सीने के बीच अत्यंत गर्म व दर्दनाक कठोर सूजन", weight: 0.95, differentials: ["HEMORRHAGIC_SEPTICEMIA"] }
    ],
    udder: [
      { id: "udder_hard_swollen", nameHi: "अयन/थन में पत्थर जैसा कड़ापन, अत्यधिक लालिमा व जलन", weight: 0.95, differentials: ["MASTITIS_ACUTE", "PERIPARTURIENT_EDEMA"] },
      { id: "udder_blood_clots_milk", nameHi: "दूध में खून, मवाद या गाढ़े पीले छिछड़े (Flakes/Clots)", weight: 0.9, differentials: ["MASTITIS_CLINICAL", "UDDER_TRAUMA"] },
      { id: "udder_cold_gangrene", nameHi: "थन का नीला/काला पड़ना, ठंडा होना एवं सड़ांधयुक्त रिसाव", weight: 1.0, differentials: ["GANGRENOUS_MASTITIS"] },
      { id: "udder_tea_water_secretion", nameHi: "दूध की जगह चाय जैसा भूरा या सीरम जैसा पानी आना", weight: 0.85, differentials: ["COLIFORM_MASTITIS", "LEPTOSPIROSIS"] }
    ],
    urine: [
      { id: "urine_dark_coffee_red", nameHi: "गहरे लाल, कत्थई या कॉफी रंग का पेशाब (हीमोग्लोबिन्यूरिया)", weight: 0.95, differentials: ["BABESIOSIS", "POST_PARTURIENT_HEMOGLOBINURIA", "LEPTOSPIROSIS"] },
      { id: "urine_frank_blood", nameHi: "पेशाब में थक्कों सहित ताजा लाल खून गिरना (हीमैट्यूरिया)", weight: 0.9, differentials: ["ENZOOTIC_HEMATURIA", "CYSTITIS", "PYELONEPHRITIS"] },
      { id: "urine_sweet_ketone_odor", nameHi: "पेशाब व सांस से मीठे फलों/एसीटोन जैसी गंध", weight: 0.85, differentials: ["KETOSIS"] },
      { id: "urine_scanty_painful", nameHi: "रुक-रुक कर दर्द के साथ बूंद-बूंद पेशाब होना", weight: 0.8, differentials: ["UROLITHIASIS", "URINARY_CALCULI"] }
    ],
    dung: [
      { id: "dung_profuse_watery_foul", nameHi: "अत्यधिक बदबूदार फव्वारे जैसे पतले दस्त", weight: 0.85, differentials: ["PPR", "SALMONELLOSIS", "COLIBACILLOSIS"] },
      { id: "dung_blood_mucus", nameHi: "गोबर में आंव, चिपचिपा श्लेष्म एवं ताजे खून की धार", weight: 0.9, differentials: ["COCCIDIOSIS", "DYSENTERY", "ENTEROTOXEMIA"] },
      { id: "dung_pipestream_chronic", nameHi: "लगातार कई हफ्तों से बिना बदबू का पाइप-स्ट्रीम दस्त व दुर्बलता", weight: 0.9, differentials: ["JOHNE_DISEASE"] },
      { id: "dung_hard_mucus_coated", nameHi: "गोबर अत्यंत सूखा, कड़ा, गांठदार व काली झिल्ली युक्त", weight: 0.75, differentials: ["SIMPLE_INDIGESTION", "INTESTINAL_OBSTRUCTION", "SURRA"] }
    ],
    temperature: [
      { id: "temp_hyperpyrexia", nameHi: "तीव्र ज्वर (105°F - 107°F)", weight: 0.85, differentials: ["THEILERIOSIS", "BABESIOSIS", "HEMORRHAGIC_SEPTICEMIA", "EPHEMERAL_FEVER"] },
      { id: "temp_subnormal", nameHi: "तापमान सामान्य से काफी नीचे गिरना (<100°F) व शरीर ठंडा होना", weight: 0.95, differentials: ["MILK_FEVER", "ACUTE_ENDOTOXIC_SHOCK", "SEVERE_DEHYDRATION"] },
      { id: "temp_biphasic", nameHi: "उतार-चढ़ाव वाला रुक-रुक कर आने वाला बुखार", weight: 0.7, differentials: ["TRYPANOSOMIASIS", "BRUCELLOSIS"] }
    ],
    rumen: [
      { id: "rumen_left_flank_drum", nameHi: "बायां पेट ढोलक की भांति अत्यधिक फूलना एवं सांस फूलना", weight: 0.95, differentials: ["BLOAT_TYMPANY", "FROTHY_BLOAT", "CHOKE_ESOPHAGEAL"] },
      { id: "rumen_atony_doughy", nameHi: "रूमेन की गतिशीलता बिल्कुल शून्य, पेट छूने पर आटे जैसा धंसना", weight: 0.8, differentials: ["ACID_INDIGESTION", "VAGUS_INDIGESTION", "SIMPLE_INDIGESTION"] },
      { id: "rumen_splashing_sound", nameHi: "बाएं पेट को हिलाने पर छप-छप पानी की आवाज़ आना", weight: 0.85, differentials: ["LACTIC_ACIDOSIS", "ABOMASAL_DISPLACEMENT"] }
    ],
    respiration: [
      { id: "resp_stridor_grunting", nameHi: "घुर्र-घुर्र की खर्राटेदार आवाज़, मुंह खोलकर जीभ बाहर निकाल हांफना", weight: 0.9, differentials: ["HEMORRHAGIC_SEPTICEMIA", "PNEUMONIA_BRD"] },
      { id: "resp_painful_cough", nameHi: "दर्दनाक सूखी अथवा बलगमयुक्त लगातार खांसी", weight: 0.75, differentials: ["BRONCHOPNEUMONIA", "DICTYOCAULIASIS_LUNGWORM", "TUBERCULOSIS"] }
    ],
    locomotion: [
      { id: "loco_severe_lameness", nameHi: "खुरों में छाले/घाव के कारण लंगड़ा कर चलना", weight: 0.8, differentials: ["FMD", "FOOT_ROT", "LAMINITIS"] },
      { id: "loco_sternal_s_curve", nameHi: "गर्दन को मोड़कर पुट्ठे पर रखकर बैठना (S-Shaped Sternal Recumbency)", weight: 0.95, differentials: ["MILK_FEVER"] },
      { id: "loco_stiffness_sawhorse", nameHi: "लकड़ी के घोड़े की भांति कठोर अकड़न, पूंछ उठी रहना व तीसरा पपोटा गिरना", weight: 1.0, differentials: ["TETANUS"] }
    ],
    nervous: [
      { id: "nerv_circling_head_press", nameHi: "एक ही दिशा में गोल चक्कर काटना अथवा दीवार से सिर दबाना", weight: 0.9, differentials: ["TRYPANOSOMIASIS_SURRA", "LISTERIOSIS", "NERVOUS_KETOSIS"] },
      { id: "nerv_aggression_bellowing", nameHi: "आक्रामक व्यवहार, असामान्य रंभाना, काल्पनिक मक्खियों को काटना", weight: 0.95, differentials: ["RABIES", "LEAD_POISONING"] }
    ]
  };

  /* =========================================================================
     4. FARMER ORGAN-BASED HOME REMEDIES (window.VETCARE_FARMER_ORGAN_REMEDIES)
     Strictly Zero Injections - Safe, Time-Tested Ayurvedic & Herbal Protocols
     ========================================================================= */
  const FARMER_ORGAN_REMEDIES = {
    uterus: {
      titleHi: "गर्भाशय शोधक एवं जेर निकासी देसी काढ़ा",
      targetConditions: "ब्याने के बाद जेर (ROP) अटकना, मैला छांटना, गर्भाशय की सफाई",
      ingredients: [
        "पुराना देसी गुड़: 500 ग्राम",
        "अजवाइन: 50 ग्राम",
        "सोंठ (सूखी अदरक): 25 ग्राम",
        "हल्दी पाउडर: 25 ग्राम",
        "मेथी दाना: 50 ग्राम",
        "काले तिल: 50 ग्राम",
        "बांस के ताजे पत्ते (उपलब्ध हों तो): 200 ग्राम"
      ],
      preparationMethod: "2.5 लीटर पानी में गुड़ को छोड़कर अन्य सभी औषधियों को कूटकर डालें। धीमी आंच पर तब तक पकाएं जब तक पानी आधा (1.25 लीटर) न रह जाए। अंत में गुड़ घोलकर गुनगुना करें।",
      dosageInstructions: "ब्याने के 2 घंटे के भीतर प्रथम खुराक गुनगुनी पिलाएं। यदि जेर न गिरे तो 6-6 घंटे के अंतराल पर 2 बार और दें। गर्भाशय की पूर्ण सफाई हेतु 3 दिन तक सुबह एक बार दें।",
      safetyWarning: "जेर पर ईंट, पत्थर या भारी वजन कभी न बांधें। गर्भाशय में हाथ डालकर जबरन जेर खींचने का प्रयास कदापि न करें, इससे रक्तस्राव व गर्भाशय फटने का खतरा रहता है।"
    },
    udder: {
      titleHi: "थनैल सूजन नाशक एलोवेरा-हल्दी-चूना दिव्य लेप",
      targetConditions: "अयन/थन की गर्म दर्दनाक सूजन, कड़ापन, दूध में छिछड़े आना",
      ingredients: [
        "ताजा घृतकुमारी (एलोवेरा) का गूदा: 250 ग्राम",
        "शुद्ध हल्दी पाउडर: 50 ग्राम",
        "खाने वाला चूना (Calcium Hydroxide): 15 ग्राम"
      ],
      preparationMethod: "एलोवेरा के गूदे, हल्दी और चूने को मिक्सी या सिलबट्टे पर अच्छी तरह पीसकर चटनी जैसा महीन लाल-पीला चिकना लेप तैयार करें। लेप में थोड़ा पानी मिलाकर पतला घोल बनाएं।",
      dosageInstructions: "प्रभावित थन से सारा खराब दूध पूरी तरह निचोड़कर सुरक्षित गड्ढे में फेंक दें। इसके बाद पूरे अयन व थनों पर नीचे से ऊपर की ओर लेप लगाएं। दिन में 4 से 5 बार यह प्रक्रिया दोहराएं।",
      safetyWarning: "यदि थन से बदबूदार लाल खून आ रहा हो, थन ठंडा पड़ चुका हो या पशु चारा छोड़कर बैठ गया हो, तो बिना समय गंवाए पंजीकृत पशु चिकित्सक को बुलाएं।"
    },
    digestion: {
      titleHi: "गंभीर अफारा (पेट फूलना) व गैस निवारक त्वरित मिश्रण",
      targetConditions: "बायां पेट ढोलक जैसा फूलना, सांस लेने में तकलीफ, बेचैनी",
      ingredients: [
        "मीठा तेल (अलसी अथवा सरसों का तेल): 300 मिली",
        "तारपीन का शुद्ध वानस्पतिक तेल (Oil of Turpentine): 40 मिली",
        "शुद्ध हींग: 10 ग्राम (पीसकर भुनी हुई)",
        "अजवाइन चूर्ण: 30 ग्राम",
        "काला नमक: 30 ग्राम"
      ],
      preparationMethod: "सरसों के तेल को हल्का गुनगुना करें। इसमें पिसी हुई हींग, अजवाइन और काला नमक अच्छी तरह घोलें। सबसे अंत में तारपीन का तेल मिलाकर एकसार करें।",
      dosageInstructions: "नाल (Drenching Bottle) की सहायता से पशु की जीभ पकड़े बिना, धीरे-धीरे मुंह के किनारे से पिलाएं। पशु को लगातार टहलाएं तथा मुंह में लकड़ी की छोटी खपच्ची बांधें ताकि झागदार लार बाहर गिरे।",
      safetyWarning: "पशु का मुंह ऊपर की ओर अत्यधिक न उठाएं तथा जीभ कभी न पकड़ें, अन्यथा तेल सांस की नली (Trachea) में जाकर ड्रेंचिंग न्यूमोनिया से पशु की तत्काल जान ले सकता है।"
    },
    hooves: {
      titleHi: "खुर सड़न व खुरपका (FMD) खुर-शोधन काढ़ा व मरहम",
      targetConditions: "खुरों के बीच घाव, कीड़े (Maggots), सड़न व तीव्र लंगड़ाहट",
      ingredients: [
        "नीला थोथा (कॉपर सल्फेट): 20 ग्राम (धोने हेतु)",
        "नीम के ताजे पत्ते: 500 ग्राम",
        "कपूर की टिकिया: 20 ग्राम",
        "सरसों का शुद्ध तेल: 200 मिली"
      ],
      preparationMethod: "धोने हेतु: 10 लीटर गुनगुने पानी में 20 ग्राम नीला थोथा घोलकर 0.2% घोल बनाएं। मरहम हेतु: सरसों के तेल में नीम के पत्तों को काला होने तक पकाएं, तेल छानकर उसमें कपूर का पाउडर घोलें।",
      dosageInstructions: "पहले खुरों के घावों को नीले थोथे के पानी से अच्छी तरह धोकर मैल व रेत साफ करें। फिर नीम-कपूर का तेल घाव पर लगाकर साफ सूती पट्टी बांधें। दिन में 2 बार करें।",
      safetyWarning: "नीले थोथे का गाढ़ा घोल न बनाएं, यह जहरीला होता है। सुनिश्चित करें कि पशु इस पानी को पीने न पाए।"
    },
    skin: {
      titleHi: "चर्म रोग, खाज-खुजली (Mange) व चिचड़ी निवारक गंधक तेल",
      targetConditions: "त्वचा पर पपड़ी, बाल झड़ना, जूं, चिचड़ी व तीव्र खुजली",
      ingredients: [
        "गंधक आंवलासार (Sulfur powder): 50 ग्राम",
        "करंज अथवा नीम का शुद्ध तेल: 500 मिली",
        "कपूर चूर्ण: 25 ग्राम"
      ],
      preparationMethod: "करंज या नीम के तेल में पिसी हुई गंधक को धूप में रखकर या हल्की आंच पर अच्छी तरह मिलाएं। ठंडा होने पर कपूर का पाउडर मिलाकर कांच की बोतल में सुरक्षित रखें।",
      dosageInstructions: "पशु को नीम के पानी से नहलाकर सुखा लें। इसके बाद प्रभावित त्वचा पर यह तेल दस्ताने पहनकर मालिश करें। 5 दिन तक लगातार लगाएं, फिर 2 दिन छोड़कर दोहराएं।",
      safetyWarning: "आंखों, मुंह और थनों के छिद्रों पर यह तेल न लगाएं। यदि त्वचा पर खुले गहरे घाव हों तो गंधक लगाने से बचें।"
    }
  };

  /* =========================================================================
     5. BREEDING, REPEAT BREEDER & MILK MAXIMIZER DATA
     ========================================================================= */
  const BREEDING_DATA = {
    heatCycleStages: [
      {
        stage: "प्रो-एस्ट्रस (Proestrus - मद पूर्व काल)",
        duration: "2 से 3 दिन",
        symptoms: "पशु बेचैन होता है, बार-बार पेशाब करता है, अन्य पशुओं को सूंघता है व उनके ऊपर चढ़ने का प्रयास करता है, लेकिन स्वयं किसी को अपने ऊपर चढ़ने नहीं देता।",
        farmerAction: "सीमन डलवाने का समय अभी नहीं हुआ है। केवल निगरानी रखें और समय नोट करें।"
      },
      {
        stage: "एस्ट्रस / पीक हीट (Estrus - वास्तविक मद काल)",
        duration: "18 से 24 घंटे (भैंसों में 12-18 घंटे)",
        symptoms: "पशु रंभाता है, भूख कम हो जाती है, दूध उत्पादन घटता है, योनि से शीशे जैसा पारदर्शी लंबा तार (Discharge) गिरता है। पशु 'स्टैंडिंग हीट' में आता है (अन्य पशु के चढ़ने पर स्थिर खड़ा रहता है)।",
        farmerAction: "यह सीमन (A.I.) करवाने का सबसे उपयुक्त समय है। 'AM-PM नियम' का कड़ाई से पालन करें।"
      },
      {
        stage: "मेट-एस्ट्रस (Metestrus - मद उपरांत काल)",
        duration: "3 से 4 दिन",
        symptoms: "अण्डोत्सर्ग (Ovulation) संपन्न होता है। कई गायों में मद समाप्त होने के 24-48 घंटे बाद योनि से हल्का खूनी स्राव (Metestrous Bleeding) दिखाई देता है।",
        farmerAction: "खूनी तार दिखना सामान्य है, इसका अर्थ है कि मद चक्र पूर्ण हुआ। यदि सीमन नहीं करवाया तो 19-21 दिन बाद पुनः निगरानी रखें।"
      },
      {
        stage: "डाई-एस्ट्रस (Diestrus - शांति काल)",
        duration: "12 से 15 दिन",
        symptoms: "गर्भाशय पर कॉर्पस ल्यूटियम (CL) सक्रिय रहता है और प्रोजेस्टेरोन हार्मोन स्रावित होता है ताकि गर्भ ठहर सके। पशु पूरी तरह शांत रहता है।",
        farmerAction: "पशु को संतुलित आहार दें, अचानक चारा न बदलें एवं अनावश्यक तनाव से बचाएं।"
      }
    ],
    aiGoldenRule: {
      ruleName: "वैज्ञानिक AM - PM नियम (The Golden AM-PM Rule)",
      descriptionHi: "यदि पशु सुबह (AM) पहली बार स्थिर मद (तार दिखाना/खड़ा होना) में दिखा है, तो उसी दिन शाम (PM) को सीमन लगवाएं। यदि पशु शाम (PM) को पहली बार मद में दिखा है, तो अगली सुबह (AM) सीमन लगवाएं।",
      successTips: [
        "तार की जांच: योनि स्राव बिल्कुल कांच जैसा पारदर्शी व लचीला होना चाहिए। यदि तार मटमैला, सफेद, पीला या मवादयुक्त हो तो सीमन न लगवाएं, पहले गर्भाशय का उपचार कराएं।",
        "भैंसों में साइलेंट हीट (गूंगा मद): भैंसें अक्सर रात में बोलती हैं। सुबह उनकी योनि से गिरे तार व गर्भाशय की गर्मी की जांच कुशल डॉक्टर से कराएं।",
        "सीमन स्ट्रा की थॉइंग: स्ट्रा को 37°C गुनगुने पानी में ठीक 30 सेकंड रखें और 2 मिनट के भीतर ए.आई. गन लोड करके गर्भाशय ग्रीवा (Mid-cervix) में स्थापित करें।"
      ]
    },
    repeatBreederProtocol: {
      titleHi: "बार-बार फिरने (Repeat Breeding) का 4-चरणीय वैज्ञानिक समाधान",
      causes: "सब-क्लिनिकल एंडोमेट्राइटिस (भीतरी गर्भाशय सूजन), ओव्यूलेशन में देरी (Delayed Ovulation), प्रोजेस्टेरोन की कमी, असंतुलित आहार/मिनरल डेफिशिएंसी।",
      steps: [
        {
          stepNo: 1,
          nameHi: "गर्भाशय संक्रमण निवारण (Intrauterine Therapy)",
          detail: "मद काल के दौरान जब सर्विक्स खुला हो, तब Lixen IU (Cephapirin) या 30-50 ml 5% Betadine + Metronidazole घोल 3 दिनों तक गर्भाशय में डलवाएं। उस चक्र में सीमन न लगाएं।"
        },
        {
          stepNo: 2,
          nameHi: "अण्डोत्सर्ग सुनिश्चित करना (Ovulation Trigger)",
          detail: "अगले चक्र में जब पारदर्शी तार आए, तब सीमन (A.I.) डलवाने के ठीक समय पर 5 ml Inj. Receptal (Buserelin Acetate) अथवा Inj. Gynarich मांसपेशियों में लगाएं।"
        },
        {
          stepNo: 3,
          nameHi: "भ्रूण स्थापना एवं ल्यूटियल सपोर्ट (Post-AI Luteal Support)",
          detail: "सीमन डलवाने के 5वें एवं 12वें दिन 500 mg Inj. Hydroxyprogesterone Hexanoate (Duraprogen) I/M लगाएं अथवा 12वें दिन पुनः 2.5 ml Receptal लगाएं ताकि भ्रूण सुरक्षित रहे।"
        },
        {
          stepNo: 4,
          nameHi: "सूक्ष्म पोषक तत्व एवं चीलेटेड मिनरल्स (Nutritional Balancing)",
          detail: "पशु को प्रतिदिन 50 ग्राम Chelated Agrimin Forte / Minfa Gold एवं 2 गोली CoFeCu (कॉपर, कोबाल्ट, आयरन) 30 दिनों तक लगातार खिलाएं।"
        }
      ]
    }
  };

  const MILK_BOOSTER_DATA = {
    titleHi: "वैज्ञानिक दुग्ध संवर्धन एवं पीक लैक्टेशन प्रबंधन",
    principles: [
      {
        factor: "ऊर्जा घनत्व एवं बाईपास फैट (Bypass Fat)",
        importance: "उच्च दुधारू गाय-भैंस ब्याने के प्रारंभिक 90 दिनों में 'ऋणात्मक ऊर्जा संतुलन' (Negative Energy Balance) में रहती हैं।",
        recommendation: "प्रतिदिन 100 से 150 ग्राम रुमेन-प्रोटेक्टेड बाईपास फैट (उदा. Golden Fat / Megalac) दाने में मिलाकर दें। इससे दूध का फैट % बढ़ता है और पशु का वजन नहीं घटता।"
      },
      {
        factor: "बाईपास प्रोटीन (Bypass Protein - RUP)",
        importance: "साधारण प्रोटीन रूमेन में ही अमोनिया बनकर नष्ट हो जाता है। बाईपास प्रोटीन सीधे छोटी आंत में पचकर दूध उत्पादन को चरम पर ले जाता है।",
        recommendation: "दाने में 25-30% रोस्टेड सोयाबीन, बिनौला खल या फॉर्मलडिहाइड-ट्रीटेड सरसों खल शामिल करें।"
      },
      {
        factor: "रूमेन बफरिंग (Acidosis Prevention)",
        importance: "अधिक दाना खाने से पेट में तेजाबियत बनती है जिससे भूख घटती है और दूध गिर जाता है।",
        recommendation: "प्रतिदिन 50-70 ग्राम मीठा सोडा (Sodium Bicarbonate) तथा 20 ग्राम मैग्नीशियम ऑक्साइड दाने में अनिवार्य रूप से मिलाएं।"
      },
      {
        factor: "हर्बल गैलेक्टागॉग्स (Herbal Milk Maximizers)",
        importance: "प्रोलैक्टिन व ऑक्सीटोसिन हार्मोन के प्राकृतिक स्राव को उत्तेजित करते हैं।",
        recommendation: "शतावरी चूर्ण 50 ग्राम + जीवंती 20 ग्राम + मेथी दाना 100 ग्राम (उबालकर) + सौंफ 25 ग्राम का मिश्रण प्रतिदिन शाम को 20 दिनों तक दें।"
      }
    ],
    dailyStandardRation: {
      formulaHi: "400 kg शारीरिक भार + 10 लीटर दूध देने वाली भैंस का दैनिक संतुलित राशन",
      feedComponents: {
        maintenanceGrain: "1.5 kg संतुलित पशुआहार",
        productionGrain: "4.0 kg (प्रति 2.5 लीटर दूध पर 1 kg अतिरिक्त दाना)",
        greenFodder: "20 से 25 kg बरसीम, मक्का या जई (हरा चारा)",
        dryRoughage: "4 से 5 kg गेहूं का भूसा या कुट्टी (सूखा चारा)",
        mineralMixture: "50 ग्राम चीलेटेड मिनरल मिक्सचर",
        saltAndSoda: "30 ग्राम सादा नमक + 40 ग्राम मीठा सोडा"
      }
    }
  };

  /* =========================================================================
     6. MASTER 48+ CLINICAL DISEASE DIRECTORY (window.VETCARE_DISEASE_DB)
     5-Tier Treatment Architect & 4-Stage Clinical Progression
     ========================================================================= */
  const DISEASE_DB = [
    {
      id: "HS",
      nameHindi: "गलघोंटू (Hemorrhagic Septicemia)",
      nameEn: "Hemorrhagic Septicemia (HS)",
      category: "BACTERIAL",
      cardinalSign: "NECK_SWELLING",
      temp: "HIGH",
      affectedSpecies: ["भैंस", "गाय"],
      pathogen: "Pasteurella multocida (Serotype B:2)",
      organSystem: "Respiratory & Systemic Hemolymphatic",
      transmission: "दूषित चारा-पानी, एरोसोल ड्रॉपलेट्स, अत्यधिक आर्द्रता व मानसून तनाव",
      symptoms: [
        "105°F - 107°F तीव्र शारीरिक ज्वर",
        "गले, जबड़े के नीचे व छाती (Dewlap) में गर्म, लाल, दर्दनाक शोफ सूजन",
        "सांस लेते समय अत्यंत कष्ट व खर्राटेदार घुर्र-घुर्र की आवाज़",
        "मुंह से तारदार लार गिरना, आंखें लाल व सूजी हुई",
        "तीव्र सेप्टीसीमिया एवं 12 से 24 घंटे में घुटन से मृत्यु"
      ],
      stages: {
        stage1: "तीव्र ज्वर (106°F), सुस्ती, चारा पूर्णतः छोड़ना, नाक से सीरस रिसाव।",
        stage2: "गले के नीचे गर्म कठोर सूजन उभरना, जीभ फूलना, लार टपकना।",
        stage3: "सांस में अत्यधिक घरघराहट (Stridor), मुंह खोलकर सांस लेना, गर्दन खींचना।",
        stage4: "पशु का गिर जाना (Recumbency), हाइपोक्सिया, जीभ नीली पड़ना एवं आकस्मिक अंत।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: 100 मिली सरसों के तेल में 10 ग्राम कपूर और 25 ग्राम हल्दी पकाकर गले की सूजन पर हल्का गुनगुना लेप करें। पशु को बिल्कुल खुला और हवादार स्थान दें। किसी भी प्रकार की नाल (Drench) न पिलाएं क्योंकि सांस अवरुद्ध होने से तुरंत मृत्यु हो सकती है। तत्काल आपातकालीन डॉक्टर बुलाएं।",
      clinicalRx: {
        tier1: "Inj. Ceftiofur Sodium (Xceft) 1-2 mg/kg I/M अथवा Inj. Cefquinome (Cobactan) 1 mg/kg I/M",
        tier2: "Inj. Enrofloxacin (Fortivir) 5 mg/kg Slow IV/IM अथवा Inj. Oxytetracycline LA 20 mg/kg Deep IM",
        tier3: "Inj. Flunixin Meglumine (Megludyne) 2.2 mg/kg IV (गले का शोफ घटाने हेतु सर्वोत्तम)",
        tier4: "Inj. Isoflupredone Acetate 10-20 mg IM (गाभिन में) अथवा Inj. Dexamethasone 10 ml IM (अगाभिन में) + Inj. Chlorpheniramine Maleate (Avil) 10 ml IM",
        tier5: "Normal Saline (NSS) 2-3 लीटर IV (Dextrose अत्यधिक न दें, यदि बैक्टीरियल लोड उच्च हो) + Inj. Tribivet 10 ml IM"
      },
      pregnancySafetyNotes: "गाभिन पशुओं में Dexamethasone निषेध है (गर्भपात प्रेरक)। केवल Isoflupredone अथवा Melonex Plus का प्रयोग करें। Ceftiofur पूर्णतः सुरक्षित है।",
      withdrawalPeriod: "दूध: 7 दिन, मांस: 28 दिन",
      prevention: "मानसून से पूर्व (मई-जून) वार्षिक HS वैक्सीन का 100% टीकाकरण अनिवार्य।"
    },
    {
      id: "BQ",
      nameHindi: "लंगड़ा बुखार / चरचरा (Black Quarter)",
      nameEn: "Black Quarter (BQ)",
      category: "BACTERIAL",
      cardinalSign: "GAS_SWELLING",
      temp: "HIGH",
      affectedSpecies: ["गाय", "भैंस", "भेड़"],
      pathogen: "Clostridium chauvoei",
      organSystem: "Musculoskeletal & Systemic",
      transmission: "मिट्टी में उपस्थित सुप्त बीजाणु (Spores) का चारे के साथ अंतर्ग्रहण या गहरे घाव",
      symptoms: [
        "अचानक तेज बुखार (104-106°F) एवं पशु का भीषण लंगड़ाना",
        "पुट्ठे, जांघ या कंधे की भारी पेशियों में दर्दनाक, गर्म सूजन",
        "सूजन वाले स्थान को हाथ से दबाने पर सूखी पत्तियों जैसी चर्र-चर्र (Crepitation) की स्पष्ट आवाज़",
        "कुछ घंटों में सूजन का ठंडा, दर्दरहित व काला पड़ जाना (गैंग्रीन)",
        "मांसपेशी से काला झागदार दुर्गंधयुक्त स्राव निकलना"
      ],
      stages: {
        stage1: "अचानक लंगड़ाहट, शारीरिक ज्वर, एक पैर पर भार न देना।",
        stage2: "कंधे या पुट्ठे पर गर्म दर्दनाक उभार, चलने में असमर्थता।",
        stage3: "सूजन में गैस बनना, त्वचा दबाने पर चर्र-चर्र आवाज़, त्वचा का काला पड़ना।",
        stage4: "टॉक्सिमिया, हाइपोथर्मिया, अंगों का पक्षाघात एवं 24-48 घंटे में मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: सूजन वाले स्थान को गर्म पानी व नीम के काढ़े से धीरे-धीरे सेकें। पशु को चलने-फिरने न दें, छाया में रखें। घरेलू उपायों के भरोसे न रहें, यह रोग बिना पेनिसिलिन के शत-प्रतिशत प्राणघातक है।",
      clinicalRx: {
        tier1: "Inj. Procaine Penicillin 20,000-40,000 IU/kg IM (प्रारंभिक 24 घंटे में जीवन रक्षक) अथवा Inj. Amoxicillin-Sulbactam 4.5g IV/IM",
        tier2: "Inj. Oxytetracycline (Terramycin) 10 mg/kg IV या IM",
        tier3: "Inj. Melonex Plus (Meloxicam + Paracetamol) 15-20 ml IM",
        tier4: "सूजन के गैंग्रिनस भाग पर विसंक्रमित सर्जिकल चीरे (Fasciotomy) लगाकर 3% हाइड्रोजन पेरोक्साइड (H2O2) से एरोबिक फ्लशिंग",
        tier5: "Inj. Tribivet (B-Complex) 10 ml IM + Dextrose Saline 5% 2 लीटर IV"
      },
      pregnancySafetyNotes: "पेनिसिलिन व एमोक्सीसिलिन गर्भावस्था में पूर्णतः सुरक्षित हैं। उच्च ज्वर व टॉक्सिन से गर्भपात रोकने हेतु तुरंत NSAID दें।",
      withdrawalPeriod: "दूध: 5 दिन, मांस: 21 दिन",
      prevention: "मानसून पूर्व BQ पॉलीवैलेंट वैक्सीन 5 ml S/C लगाएं।"
    },
    {
      id: "FMD",
      nameHindi: "खुरपका-मुंहपका (Foot and Mouth Disease)",
      nameEn: "Foot and Mouth Disease (FMD)",
      category: "VIRAL",
      cardinalSign: "MOUTH_BLISTERS",
      temp: "HIGH",
      affectedSpecies: ["गाय", "भैंस", "भेड़", "बकरी", "सूअर"],
      pathogen: "Aphthovirus (Picornaviridae - Type O, A, Asia-1)",
      organSystem: "Integumentary, Epithelial & Cardiac",
      transmission: "अति-संक्रामक एरोसोल, दूषित लार, पानी, चारा एवं श्रमिकों के आवागमन से",
      symptoms: [
        "प्रारंभिक तेज बुखार (104-106°F) एवं दुग्ध उत्पादन में अचानक 80% गिरावट",
        "मुंह, मसूड़ों, जीभ व ओंठों पर पानी भरे फफोले जो फूटकर लाल घाव बनाते हैं",
        "मुंह से रस्सियों की भांति निरंतर चिपचिपी लार टपकना व चप-चप की आवाज़ (Smacking)",
        "खुरों के बीच (Interdigital cleft) गहरे दर्दनाक छाले, पशु का लंगड़ाना व पैर झटकना",
        "छोटे बछड़ों में बिना लक्षण दिल का दौरा (Tiger Heart Disease) व आकस्मिक मृत्यु"
      ],
      stages: {
        stage1: "तीव्र ज्वर, भूख बंद, पशु उदास, दूध उत्पादन में तीव्र गिरावट।",
        stage2: "जीभ व खुरों में छालों का बनना, अत्यधिक तारदार लार गिरना।",
        stage3: "छालों का फटना, जीभ की चमड़ी उतरना, खुरों में कीड़े (Maggots) पड़ना।",
        stage4: "दीर्घकालिक प्रभाव: हांफना (Panting), बाल बढ़ना, गर्मी न सह पाना (Endocrine panters)।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: मुंह के छालों को 1% फिटकरी (Alum) या पोटाश (KMNO4) के हल्के गुलाबी पानी से दिन में 3 बार धोएं। छालों पर शुद्ध शहद में पिसा हुआ सुहागा मिलाकर लगाएं। खुरों को फिनाइल या नीम के पानी से धोकर कपूर-नीम का तेल लगाएं ताकि कीड़े न पड़ें। पशु को दलिया, खीर या मुलायम हरा चारा दें।",
      clinicalRx: {
        tier1: "द्वितीयक जीवाणु संक्रमण रोकथाम: Inj. Ceftriaxone (Intacef) 3g IM/IV 3-5 दिन",
        tier2: "Inj. Enrofloxacin 10% 15-20 ml IM",
        tier3: "Inj. Melonex Plus 15-20 ml IM दैनिक (दर्द व मुंह की सूजन निवारण)",
        tier4: "Inj. Avil 10 ml IM + Inj. Conciplex / Tribivet 10 ml IM",
        tier5: "खुरों पर D-Mag / Topicure स्प्रे का छिड़काव + Vit-A ओरल सिरप (Masticare / Intavita H) 10 ml दैनिक"
      },
      pregnancySafetyNotes: "रोग का तनाव व तेज बुखार गर्भपात करा सकता है अतः बुखार नियंत्रण (NSAID) सर्वोपरि है। सेफ्ट्रिआक्सोन गाभिन में सुरक्षित है।",
      withdrawalPeriod: "एंटीबायोटिक अनुसार दूध: 4 दिन, मांस: 14 दिन",
      prevention: "FMD वैक्सीन (Raksha-Ovac) वर्ष में दो बार (सितंबर व मार्च) अवश्य लगवाएं।"
    },
    {
      id: "LSD",
      nameHindi: "लंपी स्किन रोग (Lumpy Skin Disease)",
      nameEn: "Lumpy Skin Disease (LSD)",
      category: "VIRAL",
      cardinalSign: "SKIN_NODULES",
      temp: "HIGH",
      affectedSpecies: ["गाय", "भैंस (अपेक्षाकृत कम)"],
      pathogen: "Capripoxvirus (Neethling Strain)",
      organSystem: "Dermatological, Lymphatic & Respiratory",
      transmission: "मच्छर, डांसर मक्खी (Stomoxys), चिचड़ी (Ticks) के काटने से",
      symptoms: [
        "105°F से 106°F तक भीषण बुखार जो कई दिनों तक बना रहता है",
        "पूरी देह की त्वचा पर 2 से 5 सेमी की कठोर, गोल उभरी हुई गांठें (Nodules)",
        "पैरों, सीने व अयन में गंभीर पानी भरी सूजन (Edema), लंगड़ाहट",
        "आंखों व नाक से मवाद जैसा गाढ़ा स्राव, श्वसन मार्ग में गांठों से निमोनिया",
        "गांठों का पककर गहरे गड्ढेनुमा घावों (Sit-fast) में बदलना"
      ],
      stages: {
        stage1: "तीव्र ज्वर, आंख-नाक से पानी, पैरों में हल्की सूजन, चारा कम करना।",
        stage2: "गर्दन, पीठ व पेट पर कठोर गांठों का तेजी से उभरना, लिम्फ नोड्स में भारी सूजन।",
        stage3: "गांठों का फटना, खुले अल्सर बनना, द्वितीयक मैगट (कीड़े) संक्रमण, अत्यधिक लंगड़ाहट।",
        stage4: "गांठों का सूखना अथवा श्वसन अवरोध, न्यूमोनिया व सेप्सिस से मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: 50 ग्राम हल्दी + 50 ग्राम नीम के पत्ते + 25 ग्राम काली मिर्च + 50 ग्राम देसी खांड/गुड़ पीसकर लड्डू बनाएं और दिन में 2 बार खिलाएं। खुले घावों पर नीम का तेल, हल्दी व कपूर मिलाकर लगाएं। नीम की पत्तियों का धुआं करके मक्खी-मच्छरों से पशु का बचाव करें।",
      clinicalRx: {
        tier1: "द्वितीयक संक्रमण एवं सेप्सिस रोकथाम: Inj. Ceftiofur Sodium 1g IM अथवा Inj. Amoxicillin-Sulbactam 4.5g IM 5 दिन",
        tier2: "Inj. Oxytetracycline LA 20 mg/kg Deep IM (स्किन घाव सुखाने हेतु)",
        tier3: "Inj. Melonex Plus 15-20 ml IM दैनिक",
        tier4: "Inj. Pheniramine Maleate (Avil) 10 ml IM + Inj. Ivermectin 1% 1 ml/50kg SC (घाव में कीड़े रोकने व प्रतिरक्षा हेतु)",
        tier5: "Inj. Levamisole 2.5 mg/kg SC (इम्यूनोमॉड्यूलेटर के रूप में) + Masticare / Vit-H सप्लीमेंट"
      },
      pregnancySafetyNotes: "रोग से ग्रस्त गाभिन गायों में गर्भपात की अत्यधिक संभावना रहती है। स्टेरॉयड का प्रयोग बिल्कुल न करें। घाव प्रबंधन व NSAID पर ध्यान दें।",
      withdrawalPeriod: "दूध: 5 दिन, मांस: 28 दिन",
      prevention: "गोट पॉक्स वैक्सीन (Goat Pox Vaccine) 3 ml S/C वार्षिक टीकाकरण।"
    },
    {
      id: "MASTITIS_ACUTE",
      nameHindi: "तीव्र थनैल रोग (Acute Clinical Mastitis)",
      nameEn: "Acute Clinical Mastitis",
      category: "BACTERIAL",
      cardinalSign: "UDDER_HARD",
      temp: "HIGH",
      affectedSpecies: ["गाय", "भैंस", "बकरी"],
      pathogen: "Staphylococcus aureus, Streptococcus uberis, E. coli",
      organSystem: "Mammary Glands (Exocrine)",
      transmission: "दूषित फर्श, अस्वच्छ हाथ, मिल्किंग मशीन का अनुचित दबाव, थन की चोट",
      symptoms: [
        "प्रभावित थन व अयन में पत्थर जैसा कड़ापन, अत्यधिक लालिमा, गर्मी व पीड़ा",
        "दूध के स्वरूप में पतन: गाढ़े पीले थक्के, खून, छिछड़े अथवा बदबूदार सीरम जैसा स्राव",
        "पशु को थन छूने न देना, लात मारना एवं अयन में सूजन के कारण पैर फैलाकर खड़ा होना",
        "ई-कोलाई थनैल में एंडोटॉक्सिक शॉक: तापमान अचानक गिरना (<100°F), डिहाइड्रेशन",
        "समय पर उपचार न मिलने पर थन का स्थायी रूप से सूख जाना या टूटकर गिरना"
      ],
      stages: {
        stage1: "दूध के रंग में हल्का परिवर्तन, बारीक छिछड़े, अयन में मामूली गर्माहट।",
        stage2: "पूरा क्वार्टर (Quarter) कठोर, सूजा हुआ व दर्दनाक, दूध बंद होकर पानी आना।",
        stage3: "तीव्र प्रणालीगत विषाक्तता (Toxemia), ज्वर अथवा हाइपोथर्मिया, पशु का बैठ जाना।",
        stage4: "गैंग्रीनस थनैल: थन का नीला-काला पड़ना, ठंडा होना एवं सड़ांधयुक्त रिसाव।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: 250 ग्राम एलोवेरा गूदा + 50 ग्राम हल्दी + 15 ग्राम चूना पीसकर थन पर नीचे से ऊपर लेप लगाएं। प्रभावित थन का खराब दूध हर 2 घंटे पर पूरी तरह निचोड़कर नष्ट करें। थन पर कभी गर्म पानी न डालें (बर्फ या ठंडे पानी की पट्टी बांधें)। 50 ग्राम मीठा सोडा (Sodium Bicarbonate) पानी में घोलकर 3 दिन पिलाएं।",
      clinicalRx: {
        tier1: "Inj. Cefoperazone (Cefomast) 3g IV/IM अथवा Inj. Intacef Tazo (Ceftriaxone + Tazobactam) 3375 mg IV/IM",
        tier2: "Inj. Marbofloxacin (Marbomet) 2-8 mg/kg IM/IV अथवा Inj. Amikacin 10 mg/kg IM",
        tier3: "Inj. Flunixin Meglumine 2.2 mg/kg IV (सर्वोत्तम एंटी-एंडोटॉक्सिक) अथवा Inj. Melonex 15 ml IM",
        tier4: "Intramammary Infusion: Ceftiofur / Cefoperazone (उदा. Mastilep / Ubrolexin) थन पूर्णतः खाली करके चढ़ाएं + Inj. Serratiopeptidase (चोट व थक्के गलाने हेतु)",
        tier5: "Trisodium Citrate पाउडर 30 ग्राम दैनिक ओरल + Dextrose Saline 5% 2 लीटर IV (यदि सेप्टीसीमिया हो)"
      },
      pregnancySafetyNotes: "गाभिन अवस्था में थनैल होने पर स्टेरॉयड (Dexamethasone) युक्त इंट्रा-मैमरी ट्यूब न डालें। सेफोपेराजोन व एमोक्सीक्लेव सुरक्षित हैं।",
      withdrawalPeriod: "दूध: ट्यूब अनुसार 72-96 घंटे, मांस: 14 दिन",
      prevention: "दूध निकालने के बाद थनों को 0.5% पोविडोन आयोडीन के घोल में डुबोएं (Post-milking teat dip)।"
    },
    {
      id: "MILK_FEVER",
      nameHindi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever)",
      nameEn: "Milk Fever (Parturient Paresis)",
      category: "METABOLIC",
      cardinalSign: "STERNAL_RECUMBENCY",
      temp: "SUB",
      affectedSpecies: ["गाय (विशेषकर संकर व जर्सी)", "भैंस"],
      pathogen: "रक्त में आयनाइज्ड कैल्शियम का स्तर गिरना (<5 mg/dl) - मेटाबोलिक विकार",
      organSystem: "Neuromuscular & Endocrine",
      transmission: "असंक्रामक; ब्याने के समय कोलोस्ट्रम (खीस) के साथ अत्यधिक कैल्शियम का निष्कासन",
      symptoms: [
        "ब्याने के 24 से 72 घंटे के भीतर पशु का अचानक लड़खड़ाना व बैठ जाना",
        "गर्दन को मोड़कर पुट्ठे पर रखकर बैठना (S-Shaped curve recumbency)",
        "शारीरिक तापमान सामान्य से काफी कम (97°F - 100°F), कान, थन व पैर बिल्कुल ठंडे",
        "आंखों की पुतलियों का फैलना (Dilated Pupils), थूथन का सूखा होना",
        "रूमेन की गति बंद, गोबर-पेशाब रुकना एवं समय पर उपचार न मिलने पर कोमा व मृत्यु"
      ],
      stages: {
        stage1: "उत्तेजना, बेचैनी, मांसपेशियों में कंपन, सिर हिलाना, पैर पटकना।",
        stage2: "पशु का बैठ जाना (Sternal Recumbency), गर्दन मोड़ना, शरीर ठंडा पड़ना, सुस्ती।",
        stage3: "पशु का करवट के बल लेट जाना (Lateral Recumbency), अचेतावस्था, कोमा एवं श्वसन बंद।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: चेतावनी: मिल्क फीवर में पशु को मुंह से कभी भी तेल, नाल या पानी जबरन न पिलाएं! निगलने की मांसपेशियां लकवाग्रस्त होने से नाल फेफड़ों में जाकर तत्काल मौत हो सकती है। पशु के शरीर व कानों पर सूखी बोरी रगड़ें और ढककर गर्म रखें। पशु को छाती के बल बैठाकर रखें, करवट न होने दें। तुरंत डॉक्टर से कैल्शियम ड्रिप लगवाएं।",
      clinicalRx: {
        tier1: "Inj. Calcium Borogluconate 25% (Mifex / Calborol) 450 ml (250-300 ml अत्यंत धीमी गति से IV + 150 ml SC)",
        tier2: "हृदय गति की लगातार निगरानी: यदि हृदय की धड़कन तेज या अनियमित हो तो IV बहाव तुरंत रोकें",
        tier3: "Inj. Tonophosphan (Organic Phosphorus) 10-15 ml IM/IV (फास्फोरस तालमेल हेतु)",
        tier4: "Inj. Tribivet / Belamyl 10 ml IM (तंत्रिका उत्तेजना हेतु) + Inj. Dexona 5 ml IM (केवल होश में लाने हेतु)",
        tier5: "पशु के खड़े होने के बाद: Cal-Up / Ostovet Gel 300 ग्राम ओरल जेल (निगलने का रिफ्लेक्स आने पर ही दें)"
      },
      pregnancySafetyNotes: "ब्याने से पूर्व अंतिम माह में आहार में अत्यधिक कैल्शियम न दें, इससे पैराथायरॉयड ग्रंथि निष्क्रिय हो जाती है। ब्याने के तुरंत बाद ही कैल्शियम दें।",
      withdrawalPeriod: "शून्य (मेटाबोलिक मिनरल)",
      prevention: "ब्याने के अंतिम 3 सप्ताह में एनियोनिक लवण (DCAD आहार) दें तथा ब्याने के तुरंत बाद ओरल कैल्शियम जेल पिलाएं।"
    },
    {
      id: "KETOSIS",
      nameHindi: "कीटोसिस / एसीटोनेमिया (Ketosis)",
      nameEn: "Bovine Ketosis (Acetonemia)",
      category: "METABOLIC",
      cardinalSign: "SWEET_BREATH",
      temp: "NORMAL",
      affectedSpecies: ["उच्च दुग्ध उत्पादक गाय", "भैंस"],
      pathogen: "ग्लूकोज की कमी व शरीर की चर्बी का अत्यधिक टूटना (कीटोन बॉडीज का संचय)",
      organSystem: "Hepatic & Metabolic",
      transmission: "असंक्रामक; ब्याने के 2 से 8 सप्ताह बाद ऊर्जा की भारी कमी (Negative Energy Balance)",
      symptoms: [
        "सांस, पेशाब व दूध से पके मीठे फलों या नेल पॉलिश (एसीटोन) जैसी स्पष्ट गंध आना",
        "पशु का दाना, खल व चोकर खाने से पूरी तरह इनकार करना, केवल सूखा भूसा खाना",
        "दुग्ध उत्पादन में नाटकीय रूप से भारी गिरावट एवं शरीर का तेजी से सूखना (वजन घटना)",
        "गोबर सूखा, काला, चमकदार और आंवयुक्त होना",
        "नर्वस कीटोसिस: दीवार से सिर टकराना, खुद की चमड़ी चाटना, अंधों की तरह चलना"
      ],
      stages: {
        stage1: "दूध में कमी, हल्का वजन घटना, दाना खाने में आनाकानी।",
        stage2: "भूख में विचित्र विकृति (Depraved Appetite), एसीटोन की स्पष्ट गंध, सुस्ती।",
        stage3: "नर्वस लक्षण: उत्तेजना, काल्पनिक चीजें चाटना, लड़खड़ाना, अत्यधिक लार।",
        stage4: "यकृत में वसा का संचय (Fatty Liver Syndrome) एवं दीर्घकालिक दुर्बलता।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: 250 ग्राम पुराना गुड़ + 50 ग्राम मीठा सोडा 1 लीटर पानी में घोलकर 5 दिन तक पिलाएं। पशु को उच्च गुणवत्ता वाला दाना दें। दाने में 100 ग्राम भुना हुआ मक्का या आटा शामिल करें। पशु को भूखा कभी न रखें।",
      clinicalRx: {
        tier1: "Inj. Dextrose 20% or 25% 1000 ml - 1500 ml IV तीव्र गति से (रक्त ग्लूकोज स्तर तुरंत बढ़ाने हेतु)",
        tier2: "Inj. Isoflupredone Acetate 10-20 mg IM (ग्लूकोनियोजेनेसिस उत्तेजित करने हेतु सर्वोत्तम सुरक्षित कॉर्टिकोस्टेरॉयड)",
        tier3: "Propylene Glycol (उदा. Ketocare / N-Sure liquid) 200 ml ओरल दिन में दो बार 4 दिन तक",
        tier4: "Inj. Tribivet (B-Complex with B12) 15 ml IM/IV + Inj. Tonophosphan 10 ml IM",
        tier5: "Niacinamide (Vitamin B3) बोलस (10 ग्राम दैनिक) + रूमेन बफरिंग हेतु सोडियम बाइकार्बोनेट"
      },
      pregnancySafetyNotes: "आइसोफ्लूप्रेडोन गर्भावस्था में सुरक्षित है। डेक्सामेथासोन से बचें यदि पशु पुनः गाभिन हो गया हो।",
      withdrawalPeriod: "शून्य (मेटाबोलिक घटक)",
      prevention: "ब्याने के समय पशु न तो अत्यधिक मोटा हो और न ही अत्यंत कमजोर; दाने में प्रोपलीन ग्लाइकोल जोड़ें।"
    },
    {
      id: "BLOAT",
      nameHindi: "अफारा / टिम्पनी (Bloat / Tympany)",
      nameEn: "Ruminal Tympany (Bloat)",
      category: "METABOLIC",
      cardinalSign: "LEFT_FLANK_DRUM",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस", "भेड़", "बकरी"],
      pathogen: "रूमेन में अत्यधिक गैस या झाग (Froth) का निष्कासन न हो पाना (डकार अवरोध)",
      organSystem: "Digestive (Ruminant Forestomachs)",
      transmission: "असंक्रामक; अत्यधिक गीला बरसीम/लेग्यूम चरना, सड़ा दाना खाना या अन्नप्रणाली में रुकावट",
      symptoms: [
        "बायां पेट (Left Paralumbar Fossa) ढोलक की भांति अत्यधिक फूलकर ऊपर उठ जाना",
        "बाएं पेट को थपथपाने पर ढोल जैसी गूंजती हुई टिमपैनिक आवाज़ आना",
        "अत्यधिक बेचैनी, बार-बार उठना-बैठना, पेट की ओर लात मारना",
        "मुंह खोलकर जीभ बाहर निकाल हांफना, अत्यधिक लार टपकना व आंखें फटी रहना",
        "डायाफ्राम पर दबाव के कारण फेफड़े पिचकना, दम घुटना और अचानक गिरकर मौत"
      ],
      stages: {
        stage1: "बायां पेट हल्का फूला, बार-बार डकार लेने का प्रयास, हल्का तनाव।",
        stage2: "बायां पेट रीढ़ की हड्डी से भी ऊपर उठ जाना, सांस फूलना, मुंह से लार।",
        stage3: "तीव्र संकट: जीभ बाहर, नीली श्लेष्मा, हृदय गति 120+, खड़े रहने में असमर्थ।",
        stage4: "कार्डियोरेस्पिरेटरी फेलियर एवं 30 मिनट के भीतर एस्फिक्सिया से मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: 300 मिली सरसों का तेल + 40 मिली तारपीन का तेल + 10 ग्राम हींग + 30 ग्राम काला नमक मिलाकर धीरे-धीरे पिलाएं। पशु का अगला हिस्सा (आगे के पैर) ऊंचे चबूतरे पर रखें ताकि फेफड़ों पर दबाव कम हो। मुंह में दोनों तरफ लकड़ी की खपच्ची रस्सी से बांधें ताकि पशु लगातार जीभ चलाए और लार गिरने से झाग टूटे। पशु को जबरन दौड़ाएं नहीं, धीरे-धीरे टहलाएं।",
      clinicalRx: {
        tier1: "झागदार अफारा (Frothy Bloat): Bloatosil / Tympol / Antispasmin liquid 100 ml ओरल स्टमक ट्यूब से",
        tier2: "अति-आपातकालीन स्थिति में: Trocar and Cannula द्वारा बाएं फ्लैंक के मध्य में छेद करके गैस की त्वरित निकासी",
        tier3: "Inj. Spasmo-vet (Dicyclomine) 10-15 ml IM (उदर शूल व ऐंठन शांत करने हेतु)",
        tier4: "Inj. Belamyl 10 ml IM + Inj. Dexona 5 ml IV (यदि पशु शॉक में जा रहा हो)",
        tier5: "गैस निकलने के उपरांत: Rumen booster bolus (Himalayan Batisa / Bioboost) 2-2 बोलस सुबह-शाम"
      },
      pregnancySafetyNotes: "अत्यधिक दबाव से गर्भपात हो सकता है; गैस निकासी तत्काल करें। एंटीस्पास्मोडिक दवाएं सुरक्षित हैं।",
      withdrawalPeriod: "शून्य",
      prevention: "भूखे पशु को ओस वाली गीली बरसीम या अत्यधिक दाना एक साथ न चरने दें; सूखा भूसा मिलाकर दें।"
    },
    {
      id: "THEILERIOSIS",
      nameHindi: "थायलेरियासिस / चिचड़ी बुखार (Theileriosis)",
      nameEn: "Bovine Theileriosis",
      category: "PROTOZOAL",
      cardinalSign: "LYMPH_SWELLING",
      temp: "HIGH",
      affectedSpecies: ["संकर गोवंश (Crossbred)", "विदेशी गायें (HF/Jersey)", "भैंस"],
      pathogen: "Theileria annulata (रक्त परजीवी)",
      organSystem: "Hemic, Lymphatic & Reticuloendothelial",
      transmission: "हाइलोमा (Hyalomma anatolicum) चिचड़ियों के काटने से",
      symptoms: [
        "105°F - 107°F तक अत्यधिक तीव्र ज्वर जो साधारण एंटीबायोटिक से नहीं उतरता",
        "कंधे के आगे की लिम्फ नोड (Prescapular Lymph Node) में कठोर, बड़ी सूजन",
        "आंखों की श्लेष्मा झिल्ली पर खून के बारीक धब्बे (Petechiae) व गंभीर पीलिया",
        "तीव्र सांस फूलना (Pulmonary Edema) एवं फेफड़ों से घुर-घुर पानी जैसी आवाज़",
        "गंभीर रक्ताल्पता (Anemia), दुर्बलता व अंत में खूनी दस्त"
      ],
      stages: {
        stage1: "तीव्र ज्वर, भूख बंद, लिम्फ नोड में सूजन का प्रारंभ, दूध शून्य होना।",
        stage2: "आंखों से पानी, लिम्फ नोड अमरूद के आकार जैसी, एनीमिया व पीलिया।",
        stage3: "पल्मोनरी शोफ, नाक से सफेद झाग, अत्यधिक तेज हांफना, लेटने में कष्ट।",
        stage4: "अत्यधिक रक्ताल्पता (Hb < 4 g/dl), हाइपोक्सिया एवं कार्डियक अरेस्ट।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: चिचड़ियों को हाथ से खींचकर न नोचें, इससे वे अंडे छोड़ देती हैं। पशु को बिल्कुल ठंडे, हवादार स्थान पर रखें और माथे पर ठंडे पानी की पट्टी रखें। नीम के पत्तों को पानी में उबालकर पूरे शरीर पर पोछा लगाएं। गुड़ व गिलोय का काढ़ा पिलाएं। बिना विशिष्ट इंजेक्शन के यह बीमारी ठीक नहीं हो सकती, तुरंत जांच कराएं।",
      clinicalRx: {
        tier1: "Inj. Buparvaquone (Butalex / Zubion) 2.5 mg/kg (1 ml/20 kg) Deep IM सिंगल डोज़ गर्दन में (जीवन रक्षक)",
        tier2: "Inj. Oxytetracycline LA 20 mg/kg Deep IM (स्किजोंट अवस्था को नष्ट करने हेतु सहायक)",
        tier3: "Inj. Melonex Plus 15-20 ml IM दैनिक (ज्वर नियंत्रण)",
        tier4: "Inj. Feritas (Iron Sorbitol Citric Acid) 10 ml Deep IM (एनीमिया सुधार हेतु अल्टरनेट डे)",
        tier5: "Inj. Furosemide (Lasix) 5-10 ml IM/IV (यदि फेफड़ों में पानी/Pulmonary edema हो) + चिचड़ी नाशक Flumethrin Pour-on"
      },
      pregnancySafetyNotes: "बुपारवाक्वोन गर्भावस्था में सुरक्षित है। उच्च बुखार व एनीमिया से भ्रूण की रक्षा हेतु तुरंत रक्त परजीवी रोधी दवा दें।",
      withdrawalPeriod: "दूध: 48 घंटे, मांस: 42 दिन",
      prevention: "गोशाला में चिचड़ी नियंत्रण (Amitraz/Deltamethrin स्प्रे) एवं Rakshavac-T वैक्सीन।"
    },
    {
      id: "BABESIOSIS",
      nameHindi: "बबेशियोसिस / लाल पेशाब (Babesiosis / Red Water)",
      nameEn: "Bovine Babesiosis (Tick Fever)",
      category: "PROTOZOAL",
      cardinalSign: "RED_URINE",
      temp: "HIGH",
      affectedSpecies: ["गाय", "भैंस"],
      pathogen: "Babesia bigemina / Babesia bovis",
      organSystem: "Erythrocytes (RBCs) & Renal System",
      transmission: "बूफिलस (Rhipicephalus microplus) चिचड़ी के काटने से",
      symptoms: [
        "पेशाब का रंग गहरा लाल, कत्थई अथवा बिल्कुल डार्क कॉफी जैसा होना (Hemoglobinuria)",
        "प्रारंभिक अवस्था में 105°F - 106°F अत्यधिक तीव्र ज्वर",
        "लाल रक्त कणिकाओं (RBCs) का तेजी से टूटना, आंखें व मसूड़े बिल्कुल सफेद पड़ना",
        "हृदय की अत्यंत तीव्र धड़कन जो 2 फीट दूर से भी स्टेथॉस्कोप के बिना सुनी जा सकती है (Water-hammer pulse)",
        "पीलिया, अत्यधिक निर्जलीकरण, लड़खड़ाहट व मृत्यु"
      ],
      stages: {
        stage1: "तीव्र ज्वर, भूख बंद, सुस्ती, चिचड़ियों का शरीर पर पाया जाना।",
        stage2: "पेशाब का रंग हल्का लाल से गहरा कत्थई होना, हीमोग्लोबिन टूटना।",
        stage3: "भीषण रक्ताल्पता (Hb < 3 g/dl), आंखें सफेद/पीली, तेज धड़कन, दुर्बलता।",
        stage4: "गुर्दे फेल होना (Anuria/Uremia), हाइपोक्सिक शॉक एवं मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: पशु को तत्काल धूप से हटाकर ठंडी छांव में बांधें। ठंडा पानी व गुड़ का पतला शरबत थोड़ी-थोड़ी देर में पिलाएं ताकि ऊर्जा मिले। कोई भी तीखी नाल या खटाई न दें। ध्यान रहे: यह पेशाब में खून नहीं बल्कि टूटी हुई नसें (हीमोग्लोबिन) हैं, जो केवल बेरेनिल इंजेक्शन से ही रुकेगी।",
      clinicalRx: {
        tier1: "Inj. Diminazene Aceturate (Berenil RTU / Babenil) 3.5 - 5.0 mg/kg (1 ml/15-20 kg) Deep IM",
        tier2: "Inj. Imidocarb Dipropionate (Imizocarb) 1.2 mg/kg SC (वैकल्पिक अचूक औषधि)",
        tier3: "Inj. Melonex Plus 15-20 ml IM",
        tier4: "Dextrose Saline 5% 2-3 लीटर IV अत्यंत धीमी गति से (गुर्दों को हीमोग्लोबिन ब्लॉकेज से बचाने हेतु)",
        tier5: "Inj. Feritas (Iron) 10 ml IM + Inj. Tribivet 10 ml IM + सोडियम एसिड फॉस्फेट पाउडर ओरल"
      },
      pregnancySafetyNotes: "डिमिनैजीन गर्भावस्था में अपेक्षाकृत सुरक्षित है, किंतु तीव्र एनीमिया स्वयं गर्भपात का बड़ा कारण बन सकता है।",
      withdrawalPeriod: "दूध: 3 दिन, मांस: 21 दिन",
      prevention: "चिचड़ी नाशक दवाओं (Ivermectin SC अथवा Flumethrin Pour-on) का नियमित प्रयोग।"
    },
    {
      id: "ANAPLASMOSIS",
      nameHindi: "एनाप्लास्मोसिस / पीलिया बुखार (Anaplasmosis)",
      nameEn: "Bovine Anaplasmosis (Gall Sickness)",
      category: "PROTOZOAL",
      cardinalSign: "SEVERE_JAUNDICE",
      temp: "HIGH",
      affectedSpecies: ["गाय", "भैंस", "भेड़", "बकरी"],
      pathogen: "Anaplasma marginale (इंट्रा-एरिथ्रोसाइटिक रिकेट्सिया)",
      organSystem: "Reticuloendothelial & Hepatobiliary",
      transmission: "चिचड़ी, मक्खी अथवा गैर-विसंक्रमित सुइयों/ए.आई. गन द्वारा",
      symptoms: [
        "लगातार बना रहने वाला तेज बुखार (104-105°F)",
        "अत्यधिक गहरा पीलिया: आंखें, योनि झिल्ली व थन बिल्कुल नींबू जैसे पीले पड़ना",
        "महत्वपूर्ण विभेदक लक्षण: पेशाब कभी लाल नहीं होता (No Hemoglobinuria), पेशाब गहरा पीला होता है",
        "कब्ज, गोबर अत्यंत सूखा, कड़ा व काली झिल्ली से ढका हुआ",
        "गंभीर दुर्बलता, सांस फूलना, आक्रामकता व लड़खड़ाहट"
      ],
      stages: {
        stage1: "ज्वर, दूध में भारी गिरावट, सुस्ती, चारा आधा करना।",
        stage2: "श्लेष्मा झिल्लियों का पीला पड़ना, एनीमिया, कब्ज, गोबर में सूखापन।",
        stage3: "गंभीर पीलिया, हल्का सा चलने पर भी अत्यधिक हांफना, दिल की तेज धड़कन।",
        stage4: "ऑक्सीजन की कमी से मस्तिष्क विकार, गिर जाना एवं मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: 250 ग्राम गन्ने का सिरका या गन्ने का रस + 100 ग्राम ग्लूकोज पाउडर दिन में दो बार पिलाएं। गिलोय का काढ़ा और पपीते के पत्तों का रस 100 मिली पिलाएं। पशु को भारी सूखा भूसा न दें, दलिया व हरा चारा दें। गोबर पतला करने हेतु 250 ग्राम मैग्नीशियम सल्फेट (सेंधा नमक) पिलाएं।",
      clinicalRx: {
        tier1: "Inj. Oxytetracycline LA 20% (Terramycin LA) 20 mg/kg (1 ml/10 kg) Deep IM (72 घंटे बाद पुनः दोहराएं)",
        tier2: "Inj. Imidocarb Dipropionate 2.5 mg/kg SC (अचूक वैकल्पिक चिकित्सा)",
        tier3: "Inj. Melonex Plus 15-20 ml IM",
        tier4: "Inj. Belamyl (B-Complex with Liver Extract) 10-15 ml IM (यकृत पुनरुद्धार हेतु अत्यंत आवश्यक)",
        tier5: "Inj. Feritas 10 ml IM + Liv-52 / Belamyl Liquid 50 ml ओरल दैनिक"
      },
      pregnancySafetyNotes: "ऑक्सीटेट्रासाइक्लिन LA गर्भावस्था के अंतिम त्रैमास में हड्डियों पर प्रभाव डाल सकता है, किंतु मातृ जीवन रक्षा हेतु अनिवार्य होने पर इम्यूडोकार्ब प्राथमिकता दें।",
      withdrawalPeriod: "दूध: 7 दिन, मांस: 28 दिन",
      prevention: "एक सुई का प्रयोग कई पशुओं में न करें; वेक्टर चिचड़ियों का उन्मूलन रखें।"
    },
    {
      id: "PPR",
      nameHindi: "पीपीआर / बकरी प्लेग (Peste des Petits Ruminants)",
      nameEn: "Peste des Petits Ruminants (PPR)",
      category: "VIRAL",
      cardinalSign: "MOUTH_EROSION_DIARRHEA",
      temp: "HIGH",
      affectedSpecies: ["बकरी", "भेड़"],
      pathogen: "Morbillivirus (Paramyxoviridae)",
      organSystem: "Digestive, Respiratory & Immune System",
      transmission: "बीमार बकरी के छींकने, सीधे संपर्क, दूषित बर्तन व पानी से",
      symptoms: [
        "105°F - 106°F तीव्र ज्वर, बकरियों का झुंड में एक-दूसरे से सटकर कांपना",
        "मुंह, होंठ, मसूड़ों व जीभ पर बदबूदार सफेद परतदार छाले (Necrotic Stomatitis)",
        "आंखों व नाक से पहले पानी, फिर गाढ़ा मवाद जैसा स्राव जो सूखकर पपड़ी बनता है",
        "तीव्र, बदबूदार, फव्वारे जैसे पतले दस्त जिनमें खून व आंतों की झिल्ली होती है",
        "गंभीर न्यूमोनिया, खांसना, डिहाइड्रेशन एवं 80-90% तक उच्च मृत्यु दर"
      ],
      stages: {
        stage1: "अचानक तेज बुखार, सुस्ती, आंखें लाल, नाक बहना, चारा छोड़ना।",
        stage2: "मुंह के भीतर छाले, अत्यधिक सड़ांधयुक्त दुर्गंध, लार टपकना।",
        stage3: "भीषण पानी जैसे दस्त, पेट में दर्द, सांस लेने में घरघराहट, वजन घटना।",
        stage4: "अत्यधिक निर्जलीकरण, हाइपोथर्मिया, आंखें गड्ढे में धंसना व अंत।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: बीमार बकरियों को तुरंत स्वस्थ बकरियों से अलग करें। मुंह के छालों को बोरिक एसिड (2%) या फिटकरी के पानी से धोकर ग्लिसरीन में हल्दी मिलाकर लगाएं। ORS का घोल (नमक + चीनी + पानी) दिन में कई बार थोड़ी-थोड़ी मात्रा में पिलाएं ताकि शरीर में पानी की कमी न हो। चावल की मांड या बेल का शरबत दें।",
      clinicalRx: {
        tier1: "द्वितीयक संक्रमण व न्यूमोनिया रोकथाम: Inj. Ceftriaxone 500mg-1g IM/IV अथवा Inj. Enrofloxacin 5 mg/kg IM",
        tier2: "Inj. Oxytetracycline 10 mg/kg IM 3-5 दिन",
        tier3: "Inj. Melonex Plus 2-3 ml IM (बकरी डोज़)",
        tier4: "Inj. Avil 2-3 ml IM + Ringer Lactate (RL) / DNS 250-500 ml IV (डिहाइड्रेशन निवारण)",
        tier5: "Antidiarrheal suspension (उदा. Neblon / Diarid) 20-30 ml ओरल + B-Complex syrup"
      },
      pregnancySafetyNotes: "उच्च ज्वर व दस्त से गाभिन बकरियों में गर्भपात सामान्य है। फ्लूइड थेरेपी व सुरक्षित एंटीबायोटिक अनिवार्य हैं।",
      withdrawalPeriod: "दूध: 4 दिन, मांस: 14 दिन",
      prevention: "3-4 माह की आयु में PPR वैक्सीन 1 ml S/C लगाएं (3 वर्ष की पक्की सुरक्षा)।"
    },
    {
      id: "ENTEROTOXEMIA",
      nameHindi: "फिड़किया रोग (Enterotoxemia / Pulpy Kidney)",
      nameEn: "Enterotoxemia (Pulpy Kidney Disease)",
      category: "BACTERIAL",
      cardinalSign: "OPISTHOTONOS",
      temp: "NORMAL",
      affectedSpecies: ["भेड़", "बकरी", "गाय-भैंस के छोटे बच्चे"],
      pathogen: "Clostridium perfringens Type D (Epsilon Toxin)",
      organSystem: "Enteric, Neurological & Renal",
      transmission: "अचानक अत्यधिक हरा चारा, नई फसल, अधिक अनाज खाने से आंतों में बैक्टीरिया का विस्फोट",
      symptoms: [
        "हृष्ट-पुष्ट अच्छे मेमनों/बकरियों का बिना लक्षण दिखाए अचानक जमीन पर गिरना",
        "गर्दन पीछे की ओर मुड़ जाना, दांत किटकिटाना व मुंह से झाग निकलना (Opisthotonos)",
        "पैरों को साइकिल की भांति हवा में तेजी से चलाना (Paddling movements)",
        "पेट में भयंकर मरोड़, आंखें फटी रहना, कुछ ही घंटों में अचेतावस्था व मौत",
        "शव परीक्षण में गुर्दे बिल्कुल पिलपिले (मक्खन जैसे) पाए जाना"
      ],
      stages: {
        stage1: "सुस्ती, झुंड से अलग चलना, पेट में दर्द के हल्के लक्षण।",
        stage2: "अचानक जमीन पर गिरना, मांसपेशियों में तीव्र ऐंठन, आंखें घूमना।",
        stage3: "गर्दन कमान की भांति पीछे खिंचना, सांस फूलना, झागदार लार।",
        stage4: "टॉक्सिक शॉक, कोमा एवं लक्षण दिखने के 2-6 घंटे के भीतर आकस्मिक अंत।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: अचानक दाना या हरा चारा बिल्कुल बंद करें। 50 मिली मीठा सोडा (Sodium Bicarbonate) पानी में घोलकर तुरंत पिलाएं ताकि आंतों की तेजाबियत कम हो। पेट पर ठंडा पानी डालें। रोग की गति इतनी तेज होती है कि घरेलू नुस्खों का समय प्रायः नहीं मिलता; तुरंत डॉक्टर को बुलाएं।",
      clinicalRx: {
        tier1: "Inj. Crystalline Penicillin 20,000 IU/kg IV/IM (तत्काल टॉक्सिन उत्पादन रोकने हेतु)",
        tier2: "Inj. Amoxicillin-Sulbactam 300-500 mg IM (बकरी डोज़)",
        tier3: "Inj. Spasmo-vet (Dicyclomine) 2-4 ml IM (भीषण मरोड़ शांत करने हेतु)",
        tier4: "Inj. Dexamethasone 2-4 ml IV/IM (टॉक्सिक शॉक व मस्तिष्क शोफ निवारण)",
        tier5: "Sodium Bicarbonate 5% 100-250 ml IV + Activated Charcoal (अंगार चूर्ण) 50g ओरल"
      },
      pregnancySafetyNotes: "अंतिम अवस्था में स्टेरॉयड जीवन रक्षक है। प्राथमिक ध्यान टॉक्सिन न्यूट्रलाइजेशन पर होना चाहिए।",
      withdrawalPeriod: "दूध: 3 दिन, मांस: 14 दिन",
      prevention: "मानसून पूर्व ET वैक्सीन 2 ml S/C लगाएं; अचानक अधिक अनाज कभी न खिलाएं।"
    },
    {
      id: "ANTHRAX",
      nameHindi: "एंथ्रेक्स / जहरी बुखार (Anthrax / Splenic Fever)",
      nameEn: "Anthrax (Malignant Carbuncle)",
      category: "BACTERIAL",
      cardinalSign: "TAR_BLOOD",
      temp: "HIGH",
      affectedSpecies: ["गाय", "भैंस", "भेड़", "बकरी", "घोड़ा", "मनुष्य (Zoonotic)"],
      pathogen: "Bacillus anthracis (बीजाणु उत्पादक जीवाणु)",
      organSystem: "Systemic Vascular & Reticuloendothelial",
      transmission: "मिट्टी से स्पोर्स का अंतर्ग्रहण, सांस द्वारा अथवा घाव के माध्यम से",
      symptoms: [
        "अति-तीव्र रूप: शाम को बिल्कुल स्वस्थ पशु का सुबह मृत मिलना",
        "मृत्यु के तुरंत बाद प्राकृतिक छिद्रों (नाक, मुंह, गुदा, योनि) से काला, बिना जमा हुआ खून रिसना (Tarry Unclotted Blood)",
        "शव में मृत्यु उपरांत अकड़न (Rigor Mortis) का बिल्कुल न आना",
        "शरीर का पेट तेजी से ढोलक की भांति फूल जाना",
        "जीवित अवस्था में तीव्र ज्वर (107°F), दम फूलना, खूनी दस्त व जीभ बाहर निकलना"
      ],
      stages: {
        stage1: "तीव्र ज्वर (107°F), भयंकर कंपन, बेचैनी, तेज सांस।",
        stage2: "श्लेष्मा से खून का रिसाव, मुंह-गुदा से झागयुक्त खूनी स्राव।",
        stage3: "आकस्मिक पतन, आक्षेप (Convulsions) एवं दम घुटना।",
        stage4: "मृत्यु: शव से कभी न जमने वाला डामर जैसा काला खून रिसना।"
      },
      farmerRemedies: "सख्त वैधानिक चेतावनी: एंथ्रेक्स के संदिग्ध शव का कभी भी पोस्टमार्टम (चीरा) न करें! हवा के संपर्क में आते ही इसके जीवाणु अमर बीजाणु (Spores) बना लेते हैं जो जमीन में 50 वर्ष तक जीवित रहते हैं। शव को 6-8 फीट गहरे गड्ढे में चूना व नमक डालकर सुरक्षित दफनाएं। पशुपालक शव को सीधे न छुएं, यह मनुष्यों में फैलने वाला घातक रोग है।",
      clinicalRx: {
        tier1: "प्रारंभिक अवस्था में जीवन रक्षक: Inj. Crystalline Penicillin 50 लाख IU IV + Inj. Procaine Penicillin 40 लाख IU IM",
        tier2: "Inj. Oxytetracycline LA 20 mg/kg Slow IV/IM अथवा Inj. Ciprofloxacin 5 mg/kg IV",
        tier3: "Inj. Melonex Plus 15-20 ml IM",
        tier4: "एंथ्रेक्स एंटी-सीरम (उपलब्ध होने पर) 100-150 ml IV",
        tier5: "पूरे बाड़े का 5% फॉर्मेलिन अथवा 10% कास्टिक सोडा के घोल से निर्जंतुकीकरण"
      },
      pregnancySafetyNotes: "रोग 100% प्राणघातक है। पेनिसिलिन गर्भावस्था में सुरक्षित है। पशु व मानव जीवन रक्षा ही एकमात्र लक्ष्य है।",
      withdrawalPeriod: "दूध व मांस का उपभोग पूर्णतः वर्जित (शव नष्ट करें)",
      prevention: "स्थानिक क्षेत्रों में प्रतिवर्ष मानसून पूर्व Anthrax Spore Vaccine 1 ml S/C लगाएं।"
    },
    {
      id: "SURRA",
      nameHindi: "सर्रा रोग (Trypanosomiasis / Surra)",
      nameEn: "Trypanosomiasis (Surra)",
      category: "PROTOZOAL",
      cardinalSign: "CIRCLING_HEAD_PRESSING",
      temp: "HIGH",
      affectedSpecies: ["ऊंट", "घोड़ा", "भैंस", "गाय", "कुत्ता"],
      pathogen: "Trypanosoma evansi (फ्लेजलेटेड रक्त परजीवी)",
      organSystem: "Central Nervous System & Hemolymphatic",
      transmission: "तबैनाइड्स (Tabanus) एवं स्टॉमोक्सिस (Stomoxys) डांसर मक्खियों के काटने से",
      symptoms: [
        "उतार-चढ़ाव वाला रुक-रुक कर आने वाला बुखार (Intermittent Fever)",
        "तंत्रिका तंत्र के गंभीर लक्षण: गोल चक्कर काटना (Circling), दीवार से सिर दबाना",
        "आंखों में अंधापन, पुतलियों का स्थिर होना, अत्यधिक रंभाना व पागलपन",
        "पैरों में कमजोरी, लड़खड़ाकर चलना, पुट्ठे की मांसपेशियों का सूखना",
        "पेट के नीचे, अंडकोष अथवा अयन में पानी भरी सूजन (Edema)"
      ],
      stages: {
        stage1: "रुक-रुक कर ज्वर, सुस्ती, आंखों से पानी, खून की कमी का प्रारंभ।",
        stage2: "शरीर सूखना, पेट के नीचे सूजन, दुर्बलता, काम करने में असमर्थता।",
        stage3: "नर्वस चरण: चक्कर काटना, उत्तेजना, दृष्टिहीनता, सिर पीटना।",
        stage4: "पैरों का पक्षाघात, जमीन पर गिरकर तड़पना एवं अंत।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: मक्खियों से बचाव हेतु बाड़े में नीम व गूगल का धुआं करें। आंखों पर ठंडे पानी के छींटे मारें। गिलोय, नीम व त्रिफला का काढ़ा 100 मिली बनाकर पिलाएं। तंत्रिका तंत्र के लक्षण प्रकट होते ही तत्काल प्रयोगशाला में खून की जांच (Wet blood film) करवाएं।",
      clinicalRx: {
        tier1: "Inj. Quinapyramine Sulfate + Chloride (Triquin / Antrycide Pro-salt) 4.4 mg/kg (2.5g प्रति 350-400 kg) Subcutaneous Only",
        tier2: "Inj. Diminazene Aceturate (Berenil) 7-10 mg/kg Deep IM (सर्रा हेतु उच्च खुराक)",
        tier3: "Inj. Melonex Plus 15-20 ml IM",
        tier4: "Inj. Mannitol 20% 500 ml IV (मस्तिष्क शोफ व सिर टकराना रोकने हेतु)",
        tier5: "Inj. Tribivet (Neurotropic B-vitamins) 15 ml IM + Inj. Feritas 10 ml IM"
      },
      pregnancySafetyNotes: "क्विनापिरामीन से कभी-कभार कंपकंपी या गर्भपात का जोखिम रहता है; इंजेक्शन को विभाजित करके तथा एट्रोपिन की सुई तैयार रखकर लगाएं।",
      withdrawalPeriod: "दूध: 7 दिन, मांस: 30 दिन",
      prevention: "मक्खी-मच्छर नियंत्रण तथा वर्षा ऋतु पूर्व Triquin Pro-salt का निवारक इंजेक्शन।"
    },
    {
      id: "RABIES",
      nameHindi: "रेबीज / हलक जाना (Rabies / Hydrophobia)",
      nameEn: "Bovine Rabies",
      category: "VIRAL",
      cardinalSign: "HYDROPHOBIA_BELL",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस", "कुत्ता", "बिल्ली", "भेड़", "बकरी", "मनुष्य"],
      pathogen: "Lyssavirus (Rhabdoviridae)",
      organSystem: "Central Nervous System (Encephalomyelitis)",
      transmission: "पागल कुत्ते, सियार या लोमड़ी के काटने अथवा लार के घाव में लगने से",
      symptoms: [
        "असामान्य रूप से निरंतर रंभाना (विचित्र भारी या दबी हुई आवाज़ में चिल्लाना)",
        "मुंह से रस्सियों की भांति अत्यधिक झागदार लार टपकना",
        "गले का पक्षाघात: पानी व चारा निगलने में असमर्थ, डराने वाली आंखें",
        "अत्यधिक आक्रामकता (Furious Form) अथवा बिल्कुल सुस्त होकर गिर जाना (Dumb Form)",
        "काल्पनिक वस्तुओं को सींग मारना, दीवार से लड़ना, 3-5 दिन में पक्षाघात व 100% मृत्यु"
      ],
      stages: {
        stage1: "स्वभाव में बदलाव, उत्तेजना, कान खड़े रहना, घाव की जगह को चाटना।",
        stage2: "लगातार रंभाना, लार का अत्यधिक स्राव, पानी से डरना या पीने में असमर्थता।",
        stage3: "आक्रामक प्रहार, अंधापन, सींग मारना, लड़खड़ाकर गिरना।",
        stage4: "पिछले धड़ का पक्षाघात, कोमा एवं श्वसन तंत्र रुकने से निश्चित अंत।"
      },
      farmerRemedies: "अत्यंत महत्वपूर्ण सुरक्षा चेतावनी: रेबीज का लक्षण प्रकट होने के बाद दुनिया में कोई इलाज नहीं है। पशु के मुंह में हाथ कदापि न डालें (किसान अक्सर समझते हैं कि गले में कुछ अटक गया है)। इसकी लार में प्राणघातक वायरस होता है। यदि लार मनुष्य के कटे हुए अंग पर लग जाए तो तुरंत साबुन के बहते पानी से 15 मिनट धोएं और सरकारी अस्पताल में एंटी-रेबीज वैक्सीन लगवाएं। पशु को अलग बांधें।",
      clinicalRx: {
        tier1: "लक्षण दिखने के उपरांत कोई दवा काम नहीं करती; केवल प्रशामक (Sedation): Inj. Xylazine 0.05-0.1 mg/kg IM (मानव सुरक्षा हेतु)",
        tier2: "कुत्ते के काटने के तुरंत बाद (लक्षण पूर्व) पोस्ट-एक्सपोजर प्रोफिलैक्सिस: Inj. Raksharab 1 ml IM (Day 0, 3, 7, 14, 28)",
        tier3: "घाव की तत्काल 10 मिनट तक डिटर्जेंट साबुन व पानी से धुलाई",
        tier4: "घाव के भीतर Anti-Rabies Immunoglobulin (ERIG/RIG) का इनफिल्ट्रेशन",
        tier5: "Inj. Tetanus Toxoid 5 ml IM"
      },
      pregnancySafetyNotes: "कुत्ते के काटने पर पोस्ट-बाइट रेबीज वैक्सीन गाभिन पशुओं में 100% सुरक्षित और अनिवार्य है।",
      withdrawalPeriod: "दूध व मांस का सेवन पूर्णतः निषिद्ध",
      prevention: "आवारा कुत्तों से मवेशियों का बचाव; पालतू कुत्तों का नियमित टीकाकरण।"
    },
    {
      id: "COLIC",
      nameHindi: "पेट दर्द / उदर शूल (Bovine Colic)",
      nameEn: "Abdominal Pain (Colic)",
      category: "METABOLIC",
      cardinalSign: "ROLLING_PAWING",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस", "बछड़े", "घोड़े"],
      pathogen: "आंतों में ऐंठन, गैस, कब्ज, आंतों में रुकावट (Intussusception) अथवा पथरी",
      organSystem: "Gastrointestinal & Urogenital",
      transmission: "असंक्रामक; दूषित चारा, अचानक सूखा आहार, प्लास्टिक/रस्सी खाना या पानी की कमी",
      symptoms: [
        "पशु का बार-बार अपने पेट की ओर मुड़कर देखना व जीभ से छूना",
        "पिछले पैरों से पेट पर लात मारना, जमीन को खुरों से खोदना (Pawing)",
        "बार-बार उठना-बैठना, जमीन पर लोटना व बेचैनी से कराहना",
        "गोबर व पेशाब रुकना या केवल थोड़ा-थोड़ा चिकना म्यूकस गिरना",
        "पसीना आना, दिल की धड़कन तेज होना व सांस फूलना"
      ],
      stages: {
        stage1: "बेचैनी, बार-बार पूंछ हिलाना, दाना छोड़ना, पेट की तरफ देखना।",
        stage2: "पैर से पेट मारना, उठ-बैठ करना, जमीन पर लोटना, कराहना।",
        stage3: "आंतों की गतिशीलता बिल्कुल बंद, पेट फूलना, डिहाइड्रेशन।",
        stage4: "आंतों का फटना अथवा टॉक्सिक शॉक एवं पतन।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: 50 ग्राम अजवाइन + 20 ग्राम सोंठ + 10 ग्राम हींग + 50 ग्राम काला नमक 500 मिली गुनगुने पानी में घोलकर पिलाएं। पेट के दोनों तरफ सूखी बोरी से धीरे-धीरे मालिश करें। यदि गोबर न आ रहा हो तो 500 मिली मीठा तेल (सरसों का) पिलाएं। पशु को लगातार जमीन पर जोर-जोर से लोटने न दें, इससे आंतों में मरोड़ (Volvulus) आने का खतरा रहता है।",
      clinicalRx: {
        tier1: "Inj. Spasmo-vet / Spasmonil (Dicyclomine + Paracetamol) 15-20 ml IM",
        tier2: "Inj. Flunixin Meglumine (Megludyne) 2.2 mg/kg IV (गंभीर उदर शूल में चमत्कारी राहत)",
        tier3: "Inj. Belamyl 10 ml IM + Inj. Atropine Sulfate 15-30 ml SC (यदि अति-गतिशीलता/डायरिया जनित दर्द हो)",
        tier4: "Liquid Paraffin 1-2 लीटर + 250g Magnesium Sulfate ओरल (यदि कब्ज या आंतों में सूखा गोबर फंसा हो)",
        tier5: "Ringer Lactate (RL) 2-3 लीटर IV (इलेक्ट्रोलाइट संतुलन हेतु)"
      },
      pregnancySafetyNotes: "गर्भावस्था में अत्यधिक दर्द स्वयं गर्भाशय संकुचन पैदा कर सकता है। डाइसाइक्लोमाइन व मेग्लुडाइन गाभिन में सुरक्षित हैं।",
      withdrawalPeriod: "शून्य",
      prevention: "स्वच्छ पानी प्रचुर मात्रा में दें; प्लास्टिक व अखाद्य वस्तुओं से चारे को बचाएं।"
    },
    {
      id: "ROP",
      nameHindi: "जेर रुकना (Retention of Placenta - ROP)",
      nameEn: "Retention of Fetal Membranes (ROP)",
      category: "METABOLIC",
      cardinalSign: "HANGING_PLACENTA",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस"],
      pathogen: "गर्भाशय संकुचन की कमी, कैल्शियम/सेलेनियम डेफिशिएंसी अथवा संक्रमण",
      organSystem: "Reproductive (Uterine Myometrium)",
      transmission: "असंक्रामक; ब्याने के कष्टप्रद प्रसव (Dystocia), जुड़वां बच्चे या ब्रुसेलोसिस के उपरांत",
      symptoms: [
        "प्रसव के 8 से 12 घंटे बीत जाने पर भी जेर (Placenta) का स्वतः बाहर न निकलना",
        "योनि से बदबूदार, सड़े हुए मांसल अंगों का बाहर लटकना",
        "24-48 घंटे बाद जेर का सड़ना, गंभीर दुर्गंध, मक्खियां भिनभिनाना",
        "संक्रमण बढ़ने पर पशु को तेज बुखार (104°F), सुस्ती व दूध का पूरी तरह सूख जाना",
        "सड़न गर्भाशय में फैलकर तीव्र मेट्राइटिस व सेप्टीसीमिया उत्पन्न करना"
      ],
      stages: {
        stage1: "ब्याने के 8-12 घंटे बाद: जेर लटक रही है, पशु शांत है।",
        stage2: "24 घंटे बाद: जेर से तीखी दुर्गंध आना, योनि से गंदा रिसाव, हल्का तनाव।",
        stage3: "48-72 घंटे: तेज बुखार, दूध गिरना, चारा छोड़ना, सेप्टिक मेट्राइटिस।",
        stage4: "टॉक्सिमिया, परिटोनाइटिस एवं भविष्य में स्थायी बांझपन।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: 500 ग्राम पुराना गुड़ + 50 ग्राम अजवाइन + 25 ग्राम हल्दी + 50 ग्राम सोंठ को 2 लीटर पानी में उबालकर गुनगुना काढ़ा दिन में 2 बार पिलाएं। बांस के ताजे पत्ते (200g) खिलाएं। सख्त हिदायत: जेर पर पत्थर, ईंट की रोड़ी कभी न बांधें और न ही हाथ डालकर जबरन नोचें। इससे गर्भाशय के बटन (Cotyledons) छिल जाते हैं और जानलेवा ब्लीडिंग हो सकती है।",
      clinicalRx: {
        tier1: "गर्भाशय संकुचन हेतु (प्रारंभिक 24 घंटे में): Inj. Oxytocin 30-50 IU IM/Slow IV अथवा Inj. Valethamate Bromide (Epidosin) 5-10 ml IM",
        tier2: "Inj. PGF2-alpha (Cloprostenol - Pragma/Vetmate) 2 ml IM (24-48 घंटे बाद गर्भाशय खाली करने हेतु सर्वोत्तम)",
        tier3: "संक्रमण नियंत्रण: Inj. Ceftriaxone 3g IM अथवा Inj. Enrofloxacin 15 ml IM 3 दिन",
        tier4: "Inj. Melonex Plus 15 ml IM + Inj. Calcium Borogluconate 200 ml SC (मायोमीट्रियल टोन हेतु)",
        tier5: "Cleanex / Exapar liquid 100 ml ओरल दिन में दो बार + 3 दिन बाद Intrauterine Lixen IU"
      },
      pregnancySafetyNotes: "ऑक्सीटोसिन व PGF2alpha केवल प्रसव के पश्चात ही दें। सेफ्ट्रिआक्सोन पूर्णतः सुरक्षित है।",
      withdrawalPeriod: "दूध: 4 दिन, मांस: 14 दिन",
      prevention: "गर्भावस्था के अंतिम 2 माह में विटामिन ई व सेलेनियम (Reproplus bolus) खिलाएं।"
    },
    {
      id: "PROLAPSE",
      nameHindi: "प्रोलैप्स / पांछा / फूल बाहर आना (Uterine / Vaginal Prolapse)",
      nameEn: "Vaginal / Uterine Prolapse",
      category: "METABOLIC",
      cardinalSign: "PROTRUDING_MASS",
      temp: "NORMAL",
      affectedSpecies: ["भैंस", "गाय"],
      pathogen: "एस्ट्रोजन अधिकता, कैल्शियम की कमी, अत्यधिक जोर लगाना व ढलान वाला फर्श",
      organSystem: "Reproductive (Cervico-vaginal / Uterine)",
      transmission: "असंक्रामक; ब्याने से पूर्व (Vaginal) अथवा ब्याने के तुरंत बाद (Uterine Prolapse)",
      symptoms: [
        "ब्याने से पूर्व बैठने पर योनि से लाल-गुलाबी गेंद जैसा मांसल भाग बाहर निकलना",
        "ब्याने के तुरंत बाद पूरे गर्भाशय का लाल मखमली थैले (बटनों सहित) की भांति बाहर लटकना",
        "बाहर निकले अंग पर गोबर, मिट्टी, भूसा चिपकना एवं खून रिसना",
        "पशु का दर्द के मारे निरंतर नाभि पर जोर लगाना व कराहना",
        "अंग में सूजन, रक्त संचरण रुकने से उसका नीला-काला पड़ना व फटने पर त्वरित मृत्यु"
      ],
      stages: {
        stage1: "पशु के बैठने पर थोड़ा सा फूल दिखना, खड़े होने पर अंदर चला जाना।",
        stage2: "खड़े होने पर भी अंग बाहर रहना, योनि झिल्ली में सूजन व सूखापन।",
        stage3: "पूर्ण गर्भाशय प्रोलैप्स (बटनों सहित), ब्लीडिंग, अंग का सूजकर भारी होना।",
        stage4: "अंग में गैंग्रीन, मूत्राशय दबने से पेशाब बंद, सेप्टिक शॉक एवं पतन।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: बाहर निकले अंग को तुरंत साफ पॉलीथिन या सूती गीली चादर से ढकें ताकि मिट्टी व गोबर न लगे। अंग को कभी सूखा न रहने दें, उस पर ठंडा बर्फ का पानी या पोटाश का हल्का घोल डालें। पशु के पिछले हिस्से को आगे के हिस्से से 1 फीट ऊंचा रखें (ढलान में आगे बांधें)। अंग को जोर से न दबाएं। तुरंत डॉक्टर बुलाकर इसे सही स्थान पर बैठाएं।",
      clinicalRx: {
        tier1: "एपिड्यूरल एनेस्थीसिया (Epidural Anesthesia): 2% Lignocaine Hydrochloride 5-8 ml (1st-2nd Intercoccygeal space) जोर लगाना तुरंत बंद करने हेतु",
        tier2: "अंग की सफाई व शोफ घटाना: ठंडे 1% Alum (फिटकरी) के पानी से धोएं + 500g पिसी चीनी या मैग्नीशियम सल्फेट छिड़कें (ऑस्मोटिक सूजन निवारण)",
        tier3: "अंग को सावधानीपूर्वक अंदर बैठाकर Buhner's Suture (बूहनेर टांके) लगाना",
        tier4: "Inj. Calcium Borogluconate 450 ml (IV + SC) (मायोमीट्रियल टोन हेतु अनिवार्य)",
        tier5: "Inj. Amoxicillin-Sulbactam 4.5g IM + Inj. Melonex Plus 15 ml IM + Prolapsin bolus"
      },
      pregnancySafetyNotes: "ब्याने से पूर्व प्रोलैप्स होने पर सावधानीपूर्वक रीपोजिशन करें ताकि भ्रूण सुरक्षित रहे। टांके ब्याने के समय काटने होते हैं।",
      withdrawalPeriod: "दूध: 4 दिन, मांस: 21 दिन",
      prevention: "बाड़े का फर्श पीछे से ऊंचा न रखें; ब्याने के अंतिम माह में मिनरल मिक्सचर व चूने का पानी दें।"
    },
    {
      id: "PNEUMONIA",
      nameHindi: "निमोनिया / ब्रोंकोनिमोनिया (Pneumonia / BRD)",
      nameEn: "Bovine Respiratory Disease (Pneumonia)",
      category: "BACTERIAL",
      cardinalSign: "DYSPNEA_WHEEZING",
      temp: "HIGH",
      affectedSpecies: ["बछड़े/कटड़े", "गाय", "भैंस", "भेड़", "बकरी"],
      pathogen: "Pasteurella, Mannheimia haemolytica, Mycoplasma, BRSV Virus",
      organSystem: "Lower Respiratory Tract (Bronchi & Alveoli)",
      transmission: "सर्दी लगना, अत्यधिक सीलन, धूल, अमोनिया गैस व कमजोर प्रतिरक्षा",
      symptoms: [
        "लगातार बना रहने वाला तेज बुखार (104°F - 105.5°F)",
        "दर्दनाक, गहरी, सूखी अथवा बलगमयुक्त घुरघुराहट भरी खांसी",
        "सांस लेने की गति अत्यंत तेज, पसलियां चलना, सीने से सीटी (Wheezing) जैसी आवाज़",
        "नाक से पहले सफेद, फिर गाढ़ा पीला मवाद जैसा बदबूदार बलगम बहना",
        "चारा-पानी छोड़ना, सिर नीचे झुकाकर सुस्त खड़े रहना व दुर्बलता"
      ],
      stages: {
        stage1: "हल्की खांसी, छींकना, सीरस नाक स्राव, शारीरिक तापमान 104°F।",
        stage2: "गहरी लगातार खांसी, पसलियों का तेज चलना, सांस में घरघराहट।",
        stage3: "मवादयुक्त नाक स्राव, फेफड़ों में पानी (Consolidation), हांफना।",
        stage4: "श्वसन विफलता, हाइपोक्सिया, जीभ नीली पड़ना एवं पतन।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: पशु को सीलन व सीधी ठंडी हवा से बचाएं, गर्म बोरी पहनाएं। गर्म पानी में नीलगिरी (Eucalyptus) का तेल या विक्स डालकर दिन में 2 बार भाप (Steam) दें। 50 ग्राम अदरक + 20 ग्राम काली मिर्च + 50 ग्राम तुलसी के पत्ते + 100 ग्राम गुड़ का काढ़ा बनाकर गुनगुना पिलाएं। छाती पर सरसों के तेल में कपूर पकाकर मालिश करें।",
      clinicalRx: {
        tier1: "Inj. Florfenicol (Nuflor) 20-40 mg/kg IM/SC (निमोनिया हेतु स्वर्ण मानक औषधि) अथवा Inj. Enrofloxacin 5 mg/kg IM",
        tier2: "Inj. Ceftiofur Sodium 1-2 mg/kg IM 3-5 दिन",
        tier3: "Inj. Flunixin Meglumine 2.2 mg/kg IV (फेफड़ों की सूजन व फाइब्रिन घटाने हेतु)",
        tier4: "Inj. Bromhexine Hydrochloride (Mucolytic) 20-30 ml IM (बलगम पतला कर बाहर निकालने हेतु)",
        tier5: "Inj. Tribivet 10 ml IM + Inj. Avil 10 ml IM + Caf-lon / Resposan powder ओरल"
      },
      pregnancySafetyNotes: "फ्लोरफेनिकॉल व सेफ्टिओफर गाभिन पशुओं में सुरक्षित हैं। कॉर्टिकोस्टेरॉयड देने से बचें।",
      withdrawalPeriod: "दूध: 5 दिन, मांस: 28 दिन",
      prevention: "बाड़े में वेंटिलेशन उत्तम रखें ताकि अमोनिया गैस न बने; बछड़ों को जन्म के 2 घंटे में खीस पिलाएं।"
    },
    {
      id: "FOOT_ROT",
      nameHindi: "खुर सड़न (Foot Rot / Infectious Pododermatitis)",
      nameEn: "Infectious Pododermatitis (Foot Rot)",
      category: "BACTERIAL",
      cardinalSign: "FOOT_ROT_SMELL",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस", "भेड़", "बकरी"],
      pathogen: "Fusobacterium necrophorum & Dichelobacter nodosus",
      organSystem: "Integumentary & Musculoskeletal (Digits)",
      transmission: "कीचड़ भरे गंदे बाड़े, पत्थरों से खुरों में खरोंच व जीवाणु का प्रवेश",
      symptoms: [
        "अचानक एक या अधिक पैरों में भीषण लंगड़ाहट, पैर को जमीन पर न रखना",
        "खुर के दोनों पोरों के बीच (Interdigital space) तीव्र सड़ांधयुक्त तीखी दुर्गंध",
        "खुर के जोड़ के ऊपर की त्वचा में अत्यधिक सूजन, लालिमा व गर्माहट",
        "खुर के भीतर मवाद भरी दरारें एवं चमड़ी का गलकर सफेद-पीला पड़ना",
        "दर्द के कारण चरने न जाना, दूध में भारी गिरावट व वजन घटना"
      ],
      stages: {
        stage1: "खुर के बीच की त्वचा लाल, हल्की सूजन, चलने में मामूली लंगड़ाहट।",
        stage2: "सड़ांधयुक्त दुर्गंध, त्वचा का फटना, मवाद आना, लंगड़ाहट में वृद्धि।",
        stage3: "सूजन का खुर के जोड़ (Coronet) तक फैलना, खुर का खोल ढीला होना।",
        stage4: "गहरे स्नायु व जोड़ों में संक्रमण (Septic Arthritis) एवं स्थायी लंगड़ापन।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: खुर को कीचड़ से निकालकर साफ पानी से धोएं। 5% कॉपर सल्फेट (नीला थोथा) या पोटाश के घोल से खुर के घाव को साफ करें। नीम के तेल में पिसा हुआ कपूर व हल्दी मिलाकर खुर के बीच भरें और साफ पट्टी बांधें। पशु को 5 दिन तक सूखे व पक्के फर्श पर ही रखें।",
      clinicalRx: {
        tier1: "Inj. Ceftiofur Sodium 1.1 - 2.2 mg/kg IM 3 दिन (खुर संक्रमण हेतु अत्यधिक प्रभावी)",
        tier2: "Inj. Oxytetracycline LA 20 mg/kg Deep IM (सिंगल डोज़)",
        tier3: "Inj. Melonex Plus 15-20 ml IM दैनिक 3 दिन",
        tier4: "स्थानीय उपचार: घाव से मृत ऊतक (Debridement) हटाकर Pododerm / Topicure स्प्रे का छिड़काव",
        tier5: "Zinc Sulfate पाउडर 10 ग्राम दैनिक आहार में (खुरों की मजबूती हेतु) + Footbath (10% Zinc/Copper Sulfate)"
      },
      pregnancySafetyNotes: "सेफ्टिओफर व मेलोक्सीकैम पूर्ण सुरक्षित हैं। टेट्रासाइक्लिन से अंतिम माह में बचें।",
      withdrawalPeriod: "दूध: शून्य (Ceftiofur), मांस: 4 दिन",
      prevention: "बाड़े में कीचड़ व जलभराव न होने दें; प्रवेश द्वार पर 5% कॉपर सल्फेट का फुटबाथ बनाएं।"
    },
    {
      id: "CALF_SCOURS",
      nameHindi: "बछड़ों के सफेद/पीले दस्त (Calf Scours / Enteritis)",
      nameEn: "Neonatal Calf Diarrhea",
      category: "BACTERIAL",
      cardinalSign: "WATERY_SCOURS",
      temp: "HIGH",
      affectedSpecies: ["नवजात गोवंश व महिषवंशीय बछड़े (1 से 30 दिन)"],
      pathogen: "Enterotoxigenic E. coli (ETEC), Rotavirus, Coronavirus, Cryptosporidium",
      organSystem: "Gastrointestinal & Systemic Hydration",
      transmission: "गंदे थन, अस्वच्छ बर्तन, जन्म उपरांत पर्याप्त खीस (Colostrum) न मिलना",
      symptoms: [
        "सफेद, मटमैले, पीले या हरे रंग के अत्यधिक बदबूदार पानी जैसे पतले दस्त",
        "बछड़े की आंखों का भीतर गड्ढों में धंस जाना (भीषण निर्जलीकरण)",
        "दूध पीने से बिल्कुल मना करना, मुंह व कान ठंडे पड़ना",
        "त्वचा का लचीलापन समाप्त होना (चमड़ी खींचने पर वापस न जाना - Skin tenting > 3 sec)",
        "अत्यधिक कमजोरी, खड़े न हो पाना, कोमा एवं 24 घंटे में एसिडोसिस से मृत्यु"
      ],
      stages: {
        stage1: "दस्त का प्रारंभ, पूंछ व जांघों पर गोबर लगना, दूध कम पीना।",
        stage2: "पानी जैसे दस्त, सुस्ती, आंखें हल्की धंसी हुई, हल्का ज्वर।",
        stage3: "खड़े न हो पाना (Recumbent), शरीर ठंडा (<100°F), त्वचा में खिंचाव खत्म।",
        stage4: "हाइपोवोलेमिक शॉक, मेटाबोलिक एसिडोसिस, हाइपोग्लाइसीमिया एवं मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: मां का दूध 12 घंटे के लिए बंद करें (दूध आंतों में सड़ांध बढ़ाता है)। जीवन रक्षक घोल (ORS): 1 लीटर गुनगुने उबले पानी में 1 चम्मच नमक + 4 चम्मच चीनी/ग्लूकोज + आधा चम्मच मीठा सोडा घोलें। यह घोल 200-300 मिली हर 2 घंटे में निप्पल या बोतल से पिलाएं। बछड़े को सूखी पराली पर रखें और गर्म बोरी से ढकें।",
      clinicalRx: {
        tier1: "Inj. Enrofloxacin 5 mg/kg IM अथवा Inj. Amikacin 7-10 mg/kg IM/IV",
        tier2: "Inj. Cefotaxime 10 mg/kg IM/IV",
        tier3: "Inj. Melonex Plus 1-2 ml IM (एंटरोटॉक्सिन सूजन व दर्द निवारण)",
        tier4: "फ्लूइड थेरेपी (सर्वाधिक महत्वपूर्ण): Dextrose Normal Saline (DNS) 500-1000 ml Slow IV + 10 ml 7.5% Sodium Bicarbonate",
        tier5: "Oral Electrolyte sachet (Electrocare-Vet) + Kaolin-Pectin सस्पेंशन 20-30 ml ओरल"
      },
      pregnancySafetyNotes: "लागू नहीं (नवजात बछड़े)।",
      withdrawalPeriod: "मांस: 28 दिन",
      prevention: "जन्म के 1 घंटे के भीतर शरीर भार का 10% खीस (Colostrum) अवश्य पिलाएं।"
    },
    {
      id: "COCCIDIOSIS",
      nameHindi: "खूनी पेचिश / कॉक्सीडियोसिस (Bovine Coccidiosis)",
      nameEn: "Coccidiosis (Red Dysentery)",
      category: "PROTOZOAL",
      cardinalSign: "BLOOD_IN_DUNG",
      temp: "NORMAL",
      affectedSpecies: ["1 माह से 1 वर्ष के बछड़े", "भेड़", "बकरी"],
      pathogen: "Eimeria bovis / Eimeria zuernii (आंतों के प्रोटोजोआ)",
      organSystem: "Gastrointestinal (Cecum & Colon Epithelium)",
      transmission: "गोबर से दूषित पानी, चारा, बाड़े का गीला फर्श चाटने से ऊसिस्ट का अंतर्ग्रहण",
      symptoms: [
        "गोबर के साथ गहरा लाल ताजा खून, खून के बड़े थक्के व चिपचिपी आंव (Mucus) आना",
        "शौच करते समय अत्यधिक दर्द, बार-बार जोर लगाना (Tenesmus) व कराहना",
        "गुदा का बाहर की ओर निकला रहना (Partial Rectal Prolapse) जोर लगाने के कारण",
        "शरीर का तेजी से सूखना, आंखें अंदर धंसना, खुरदरे बाल व तीव्र रक्ताल्पता",
        "कमजोरी से बछड़े का बैठ जाना व उठने में असमर्थ होना"
      ],
      stages: {
        stage1: "गोबर पतला, हल्का मटमैला, चारा कम करना, पेट में हल्का तनाव।",
        stage2: "गोबर में खून की धारियां, बार-बार जोर लगाना, गुदा में सूजन।",
        stage3: "केवल काला-लाल खून व आंतों की चमड़ी गिरना, गंभीर एनीमिया।",
        stage4: "आंतों का छिद्रण (Perforation), सेप्टीसीमिया, पतन व मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: बछड़े को तुरंत सूखे, साफ व धूप वाले स्थान पर शिफ्ट करें। छाछ (मट्ठा) 250 मिली में 10 ग्राम पिसा हुआ जीरा व 5 ग्राम हल्दी मिलाकर दिन में 2 बार पिलाएं। बेल के फल का गूदा 50 ग्राम पीसकर पानी में दें। चावल की मांड पिलाएं। साधारण दस्त की दवा न दें, इसमें सल्फा समूह की विशिष्ट दवा ही कारगर होती है।",
      clinicalRx: {
        tier1: "Inj. Sulfadimidine 33.3% 100 mg/kg (प्रारंभिक दिन 30-40 ml/100kg IV/SC, तत्पश्चात आधी खुराक 3 दिन)",
        tier2: "Amprolium Powder (उदा. Coccicure) 10-20 mg/kg ओरल 5 दिन तक लगातार",
        tier3: "Inj. Melonex Plus 2-4 ml IM (ऐंठन व दर्द निवारण)",
        tier4: "Inj. Botropase / Inj. Ethamsylate 2-5 ml IM/IV (आंतों का आंतरिक रक्तस्राव रोकने हेतु)",
        tier5: "Inj. Belamyl 3-5 ml IM + DNS 500 ml IV (रक्ताल्पता व निर्जलीकरण सुधार)"
      },
      pregnancySafetyNotes: "बछड़ों का रोग है। सल्फा दवाएं गाभिन वयस्क पशुओं में भी आवश्यकता पड़ने पर सुरक्षित हैं यदि पर्याप्त पानी मिले।",
      withdrawalPeriod: "दूध: 5 दिन, मांस: 14 दिन",
      prevention: "बाड़े को बिल्कुल सूखा रखें; अमोनिया आधारित डिसइन्फेक्टेंट से फर्श साफ करें।"
    },
    {
      id: "FASCIOLIASIS",
      nameHindi: "यकृत कृमि रोग / लीवर फ्लूक (Liver Fluke / Fascioliasis)",
      nameEn: "Fascioliasis (Liver Fluke)",
      category: "PARASITIC",
      cardinalSign: "BOTTLE_JAW",
      temp: "NORMAL",
      affectedSpecies: ["भेड़", "बकरी", "भैंस", "गाय"],
      pathogen: "Fasciola gigantica / Fasciola hepatica (पत्तीनुमा चपटे कृमि)",
      organSystem: "Hepatic & Biliary Ducts",
      transmission: "तालाबों/नहरों के किनारे घोंघों (Lymnaea snails) द्वारा छोड़े गए सिस्ट चरने से",
      symptoms: [
        "निचले जबड़े के नीचे पानी जैसी नर्म, ठंडी, दर्दरहित सूजन (बॉटल जॉ - Bottle Jaw)",
        "लगातार बना रहने वाला पतला दस्त जो साधारण दवाओं से ठीक नहीं होता",
        "अत्यधिक कमजोरी, मसूड़े व आंखें बिल्कुल सफेद (गंभीर रक्ताल्पता)",
        "ऊन का झड़ना (भेड़ों में), खुरदरी त्वचा, पेट का लटक जाना (Pot-belly)",
        "यकृत सिरोसिस, पित्त नली का कड़ा होना (Pipe-stem liver) एवं पतन"
      ],
      stages: {
        stage1: "तीव्र रूप (Acute): यकृत में किशोर कृमियों का प्रवेश, आंतरिक रक्तस्राव, अचानक सुस्ती।",
        stage2: "क्रॉनिक रूप: धीरे-धीरे वजन घटना, दूध गिरना, हल्का पीलापन।",
        stage3: "बॉटल जॉ सूजन उभरना, भीषण एनीमिया, लगातार पतला गोबर।",
        stage4: "यकृत विफलता, कैशिक्सिया (अस्थिपंजर बनना) एवं मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: तालाबों, पोखरों व जलभराव वाले किनारों पर पशुओं को चरने बिल्कुल न भेजें। 100 मिली गिलोय का काढ़ा + 20 ग्राम त्रिफला चूर्ण गुड़ में मिलाकर 7 दिन दें। 50 ग्राम भुना हुआ जीरा व अजवाइन खिलाएं। बिना फ्लूक-नाशक पेट के कीड़े की दवा (एंथेलमिंटिक) दिए सूजन नहीं जाएगी।",
      clinicalRx: {
        tier1: "Triclabendazole (Fasinex) 12 mg/kg ओरल (किशोर व वयस्क दोनों फ्लूक पर 100% प्रभावी)",
        tier2: "Oxyclozanide + Levamisole सस्पेंशन (उदा. Nilzan / Levanide) 10-15 mg/kg ओरल",
        tier3: "Inj. Closantel 10% 10-15 mg/kg SC (दीर्घकालिक सुरक्षा हेतु)",
        tier4: "Inj. Feritas (Iron) 10 ml Deep IM अल्टरनेट डे (रक्त निर्माण हेतु)",
        tier5: "Inj. Belamyl (B-Complex with Liver Extract) 10 ml IM + लिवर टॉनिक (Liv-52) 50 ml दैनिक"
      },
      pregnancySafetyNotes: "ट्राइक्लाबेन्डाजोल व ऑक्सीक्लोजनाइड गर्भावस्था में सुरक्षित हैं। एल्बेंडाजोल पहले माह में न दें।",
      withdrawalPeriod: "दूध: 7 दिन, मांस: 28 दिन",
      prevention: "जलस्रोतों पर कॉपर सल्फेट छिड़ककर घोंघों (Snails) का जैविक नियंत्रण; नियमित डीवर्मिंग।"
    },
    {
      id: "MANGE",
      nameHindi: "खाज-खुजली / पपड़ी रोग (Mange / Scabies)",
      nameEn: "Sarcoptic / Psoroptic Mange",
      category: "PARASITIC",
      cardinalSign: "SKIN_CRUSTS",
      temp: "NORMAL",
      affectedSpecies: ["भैंस", "गाय", "ऊंट", "बकरी", "कुत्ता"],
      pathogen: "Sarcoptes scabiei / Psoroptes ovis (सूक्ष्म चमड़ी के घुन/माइट्स)",
      organSystem: "Integumentary (Epidermis & Dermis)",
      transmission: "संक्रमित पशु के सीधे संपर्क, खंभे/दीवार से रगड़ने या बिछावन से",
      symptoms: [
        "अत्यधिक तीव्र खुजली, पशु का दीवार, खूंटे या पेड़ से देह को पागलों की तरह रगड़ना",
        "आंखों, गर्दन, पूंछ की जड़ व जांघों पर बालों का उड़ना (गंजापन - Alopecia)",
        "त्वचा का अत्यधिक मोटा, खुरदरा, झुर्रीदार और पत्थर जैसा सख्त होना",
        "त्वचा पर भूरी-सफेद पपड़ी (Crusts) जमना एवं रगड़ने से खून रिसना",
        "खुजली के कारण चैन से न बैठना, चारा न खाना एवं अत्यंत दुर्बल होना"
      ],
      stages: {
        stage1: "बारीक दाने, हल्की खुजली, गर्दन व चेहरे के बालों का हल्का उड़ना।",
        stage2: "तीव्र खुजली, त्वचा पर मोटी पपड़ी जमना, घाव व खून निकलना।",
        stage3: "त्वचा हाथी की चमड़ी जैसी मोटी व सिलवटों वाली (Leather-like hide) होना।",
        stage4: "गंभीर तनाव, भूख बंद, द्वितीयक सेप्सिस एवं दुर्बलता से मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: 500 मिली नीम या करंज के तेल में 50 ग्राम गंधक (Sulfur) और 20 ग्राम कपूर मिलाकर धूप में रखें। पशु को साबुन से नहलाकर सूती कपड़े से सुखाएं, फिर यह तेल पूरे शरीर पर मालिश करें। खूंटे व बाड़े की दीवारों पर चूना छिड़कें ताकि माइट्स नष्ट हों। यह तेल 5 दिन लगातार लगाएं।",
      clinicalRx: {
        tier1: "Inj. Ivermectin 1% (Neomec / Hitek) 0.2 mg/kg (1 ml प्रति 50 kg) Subcutaneous Only (14 दिन बाद दूसरी खुराक)",
        tier2: "Inj. Doramectin (Dectomax) 0.2 mg/kg SC (अधिक समय तक असरदार)",
        tier3: "Inj. Chlorpheniramine Maleate (Avil) 10 ml IM (तीव्र खुजली व एलर्जी शांत करने हेतु)",
        tier4: "Amitraz Liquid 12.5% (Taktic / Ridtiks) 2 ml प्रति लीटर पानी में घोलकर पूरे शरीर पर पोछा (घावों पर न लगाएं)",
        tier5: "Inj. Vit-A, D3, E, H (Intavita H) 5 ml IM त्वचा के नए ऊतक निर्माण हेतु"
      },
      pregnancySafetyNotes: "आइवरमेक्टिन गर्भावस्था में सुरक्षित है। एमिट्राज का प्रयोग करते समय मुंह पर छींकने न दें।",
      withdrawalPeriod: "दूध: 7 दिन, मांस: 28 दिन",
      prevention: "बाड़े में नए पशु को अलग रखकर 14 दिन क्वारंटाइन करें; नियमित परजीवी नियंत्रण।"
    },
    {
      id: "TETANUS",
      nameHindi: "धनुस्तंभ / टिटनेस (Tetanus / Lockjaw)",
      nameEn: "Tetanus (Lockjaw)",
      category: "BACTERIAL",
      cardinalSign: "SAWHORSE_STANCE",
      temp: "NORMAL",
      affectedSpecies: ["घोड़ा", "गाय", "भैंस", "बकरी", "भेड़"],
      pathogen: "Clostridium tetani (न्यूरोटॉक्सिन - टिटैनोस्पास्मिन)",
      organSystem: "Central Nervous System & Motor Endplates",
      transmission: "गहरे घाव, जंग लगे लोहे की चोट, बधियाकरण या प्रसव के समय गंदगी से स्पोर्स का प्रवेश",
      symptoms: [
        "लकड़ी के घोड़े की भांति संपूर्ण शरीर का अकड़ जाना (Sawhorse posture)",
        "जबड़ा बिल्कुल भिंच जाना (Lockjaw) - मुंह खोलने में पूर्ण असमर्थता",
        "तीसरा पपोटा (Third Eyelid / Nictitating Membrane) आंख के ऊपर चढ़ जाना (विशेषकर सिर उठाने पर)",
        "पूंछ का ऊपर की ओर अकड़कर उठा रहना, कान सीधे व कड़े होना",
        "हल्की सी आवाज़, रोशनी या स्पर्श से भीषण कंपकंपी व ऐंठन (Hyperesthesia)"
      ],
      stages: {
        stage1: "चलने में अकड़न, जबड़ा हल्का सख्त, तीसरा पपोटा झलकना।",
        stage2: "जबड़ा पूरी तरह बंद, गर्दन व पीठ सीधी अकड़ी हुई, कान खड़े रहना।",
        stage3: "सॉ-हॉर्स मुद्रा, जमीन पर गिरना, पैर बिल्कुल सीधे तने रहना।",
        stage4: "सांस की मांसपेशियों का पक्षाघात, घुटन (Asphyxia) एवं पतन।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: पशु को बिल्कुल शांत, अंधेरे व ध्वनि-रहित कमरे में रखें जहां कोई शोरगुल न हो। घाव की तलाश करें (खुर में कील या प्रसव चोट)। घाव को तुरंत 3% हाइड्रोजन पेरोक्साइड (H2O2) से गहरा धोएं ताकि हवा (ऑक्सीजन) पहुंचे, क्योंकि यह बैक्टीरिया हवा की अनुपस्थिति में पनपता है। जबरन मुंह से कुछ न पिलाएं।",
      clinicalRx: {
        tier1: "Tetanus Antitoxin (TAT): 50,000 से 1,00,000 IU IV/IM तत्काल (टॉक्सिन निष्प्रभावी करने हेतु)",
        tier2: "Inj. Crystalline Penicillin 30,000 IU/kg IV/IM हर 6 घंटे पर 3 दिन",
        tier3: "Inj. Diazepam (Calmpose) 0.5 mg/kg IV अथवा Inj. Chlorpromazine (Siquil) 1 mg/kg IM (ऐंठन शांत करने हेतु)",
        tier4: "Inj. Flunixin Meglumine 2.2 mg/kg IV",
        tier5: "घाव की विस्तृत सर्जिकल डिब्राइडमेंट + Dextrose Saline 5% IV (पशु चारा-पानी न लेने पर)"
      },
      pregnancySafetyNotes: "पेनिसिलिन सुरक्षित है। मांसपेशियों की तीव्र ऐंठन गर्भपात करा सकती है अतः शामक (Sedation) आवश्यक है।",
      withdrawalPeriod: "दूध: 4 दिन, मांस: 14 दिन",
      prevention: "किसी भी चोट, सर्जरी या बधियाकरण के समय Tetanus Toxoid (TT) 5 ml IM अवश्य लगाएं।"
    },
    {
      id: "IBR",
      nameHindi: "आईबीआर (Infectious Bovine Rhinotracheitis - IBR)",
      nameEn: "Infectious Bovine Rhinotracheitis (IBR / Red Nose)",
      category: "VIRAL",
      cardinalSign: "RED_NOSE",
      temp: "HIGH",
      affectedSpecies: ["गाय", "भैंस"],
      pathogen: "Bovine Herpesvirus 1 (BoHV-1)",
      organSystem: "Upper Respiratory & Reproductive Tract",
      transmission: "संक्रमित वीर्य (Semen), श्वसन एरोसोल व जननांग स्राव",
      symptoms: [
        "थूथन व नथुनों का अत्यधिक लाल व सूजा हुआ होना (Red Nose Disease)",
        "तेज बुखार (104-106°F), आंखों से मवाद जैसा पानी बहना व सफेद जाला",
        "गंभीर श्वसन कष्ट, तेज बलगमयुक्त खांसी व नाक पर स्यूडोमेम्ब्रेन की परत",
        "गाभिन गायों में 5 से 8 माह की गर्भावस्था में संक्रामक गर्भपात (Abortion Storm)",
        "संक्रामक फुंसियां: योनि व शिश्न पर दाने व छाले (IPPV)"
      ],
      stages: {
        stage1: "तीव्र ज्वर, छींकना, थूथन लाल होना, आंखों से अत्यधिक पानी।",
        stage2: "नाक पर सफेद झिल्ली जमना, सांस लेने में कष्ट, खांसना।",
        stage3: "प्रजनन रूप: योनि में छाले अथवा 6-8 माह पर अचानक गर्भपात।",
        stage4: "द्वितीयक न्यूमोनिया अथवा अव्यक्त (Latent) रूप धारण करना।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: थूथन व आंखों को गुनगुने बोरिक एसिड (2%) के पानी से साफ करें। नाक के भीतर शुद्ध घी या तिल का तेल लगाएं ताकि सूखापन न रहे। 50 ग्राम तुलसी + 20 ग्राम सोंठ + 25 ग्राम हल्दी का काढ़ा बनाकर पिलाएं। संक्रमित पशु के वीर्य से प्राकृतिक गर्भाधान न कराएं।",
      clinicalRx: {
        tier1: "द्वितीयक जीवाणु संक्रमण रोकथाम: Inj. Ceftiofur Sodium 1-2 mg/kg IM 5 दिन",
        tier2: "Inj. Oxytetracycline LA 20 mg/kg Deep IM",
        tier3: "Inj. Flunixin Meglumine 2.2 mg/kg IV",
        tier4: "Inj. Avil 10 ml IM + Inj. Intavita H (Vit-A 2.5 लाख IU) IM (उपकला ऊतक सुधार)",
        tier5: "आंखों में Ciprofloxacin आई ड्रॉप्स दिन में 3 बार + ब्रोंकोडायलेटर ओरल"
      },
      pregnancySafetyNotes: "वायरस स्वयं गर्भपात कराता है; सेफ्टिओफर व फ्लुनिक्सिन द्वारा भ्रूण को बचाने का प्रयास किया जाता है।",
      withdrawalPeriod: "दूध: 3 दिन, मांस: 14 दिन",
      prevention: "प्रमाणित IBR-मुक्त सीमन का प्रयोग एवं IBR इनएक्टिवेटेड वैक्सीन का टीकाकरण।"
    },
    {
      id: "ACID_INDIGESTION",
      nameHindi: "अम्लीय अपच / दाना धसका (Grain Overload / Rumen Acidosis)",
      nameEn: "Acute Ruminal Acidosis (Lactic Acidosis)",
      category: "METABOLIC",
      cardinalSign: "DOUGHY_RUMEN",
      temp: "SUB",
      affectedSpecies: ["गाय", "भैंस", "भेड़", "बकरी"],
      pathogen: "अत्यधिक गेहूं, चावल, आटा या सड़ा गुड़ खाने से रूमेन में लैक्टिक एसिड का संचय (pH < 5.0)",
      organSystem: "Forestomachs & Systemic Acid-Base",
      transmission: "असंक्रामक; गलती से खुला अनाज का भंडार चर जाना",
      symptoms: [
        "बायां पेट छूने पर बिल्कुल आटे जैसा ढीला (Doughy Rumen) लगना, गतिशीलता शून्य",
        "अत्यधिक बदबूदार खट्टे, पीले-भूरे रंग के पतले दस्त जिनमें बिना पचा अनाज दिखता है",
        "शारीरिक तापमान सामान्य से नीचे गिरना (98-100°F) व शरीर ठंडा पड़ना",
        "पशु का लड़खड़ाना, अंधों की तरह चलना, सिर को दीवार या छाती पर टेकना",
        "रूमेन में छप-छप पानी बोलना, गंभीर निर्जलीकरण एवं लैमिनाइटिस (खुरों में दर्द)"
      ],
      stages: {
        stage1: "अनाज खाने के 6-12 घंटे बाद: सुस्ती, पेट फूलना, चारा छोड़ना।",
        stage2: "खट्टे पानी जैसे दस्त, रूमेन गति बंद, शरीर ठंडा होना, लड़खड़ाहट।",
        stage3: "पशु का बैठ जाना, आंखें अंदर धंसना, यूरिन बंद होना, गंभीर एसिडोसिस।",
        stage4: "रूमेनाइटिस, यकृत में फोड़े (Liver Abscess), सेप्टिक शॉक एवं पतन।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: जैसे ही पता चले कि पशु अधिक अनाज खा गया है, तुरंत 100-150 ग्राम मीठा सोडा (Sodium Bicarbonate) 1 लीटर ठंडे पानी में घोलकर नाल से पिलाएं। अगले 48 घंटे तक दाना, रोटी, चोकर बिल्कुल न दें। केवल सूखा भूसा दें। यदि संभव हो तो स्टमक ट्यूब से पेट का खट्टा पानी बाहर निकलवाएं (Rumen Lavage)।",
      clinicalRx: {
        tier1: "Inj. Sodium Bicarbonate 5% or 7.5% 500-1000 ml Slow IV (सिस्टेमिक एसिडोसिस निष्प्रभावी करने हेतु)",
        tier2: "Rumen Buffering: 200 ग्राम Sodium Bicarbonate + 50 ग्राम Magnesium Hydroxide ओरल पानी में",
        tier3: "Inj. Flunixin Meglumine 2.2 mg/kg IV (एंडोटॉक्सिन व खुरों का लैमिनाइटिस दर्द रोकने हेतु)",
        tier4: "Inj. Tribivet (Thiamine / Vit-B1) 20 ml IM/IV (मस्तिष्क क्षति व पोलियोएन्सेफेलोमलेशिया रोकने हेतु अनिवार्य)",
        tier5: "Rumenotomy (पेट चीरकर सड़ा अनाज बाहर निकालना) यदि अनाज की मात्रा 15-20 kg से अधिक हो"
      },
      pregnancySafetyNotes: "एसिडोसिस व एंडोटॉक्सीमिया से गर्भपात का भारी खतरा रहता है; सोडियम बाइकार्बोनेट व फ्लूइड्स तुरंत दें।",
      withdrawalPeriod: "शून्य",
      prevention: "अनाज के भंडारों को हमेशा सुरक्षित ताला लगाकर रखें; दाने की मात्रा धीरे-धीरे बढ़ाएं।"
    },
    {
      id: "PPH",
      nameHindi: "ब्याने बाद लाल पेशाब (Post-Parturient Hemoglobinuria - PPH)",
      nameEn: "Post-Parturient Hemoglobinuria (PPH)",
      category: "METABOLIC",
      cardinalSign: "COFFEE_URINE_AFTERSINK",
      temp: "NORMAL",
      affectedSpecies: ["भैंस (सर्वाधिक संवेदनशील)", "उच्च दुग्ध उत्पादक संकर गायें"],
      pathogen: "रक्त में अकार्बनिक फास्फोरस का स्तर अत्यधिक गिरना (<1.5 mg/dl) - पोषण न्यूनता",
      organSystem: "Erythrocyte Metabolism & Renal",
      transmission: "असंक्रामक; ब्याने के 2 से 4 सप्ताह बाद, बरसीम, गोभी या क्रूसीफेरस चारा अधिक चरने से",
      symptoms: [
        "ब्याने के 15-30 दिन बाद पेशाब का रंग पहले लाल, फिर गहरा कॉफी या डार्क कोका-कोला जैसा होना",
        "महत्वपूर्ण विभेदक लक्षण: बबेशियोसिस के विपरीत इसमें ज्वर (बुखार) बिल्कुल नहीं होता (Temp 101°F)",
        "शरीर में अत्यधिक खून की कमी, आंखें व अयन बिल्कुल सफेद पड़ना",
        "दूध उत्पादन अचानक आधा होना, भूख कम लगना व कमजोर होना",
        "सांस फूलना, दिल की धड़कन तेज होना लेकिन पेशाब में कोई थक्के न होना"
      ],
      stages: {
        stage1: "पेशाब हल्का लाल, शारीरिक ताप सामान्य, दूध में 30% कमी।",
        stage2: "पेशाब गहरा कत्थई/कॉफी रंग, हीमोग्लोबिन टूटना, भूख आधी।",
        stage3: "गंभीर एनीमिया (Hb < 4 g/dl), हल्का चलने पर हांफना, कमजोरी।",
        stage4: "अत्यधिक रक्ताल्पता से हृदय की विफलता एवं 3-5 दिन में मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: तुरंत बरसीम व राई घास खिलाना बंद करें, केवल गेहूं का सूखा भूसा व मक्के का दाना दें। 200 ग्राम सोडियम एसिड फास्फेट पाउडर (या 250 ग्राम पिसा हुआ अमचूर/सौंफ) पानी में घोलकर तुरंत पिलाएं। 500 मिली मीठा तेल (सरसों) में 100 ग्राम गुड़ मिलाकर दें। कोई भी एंटीबायोटिक दवा जबरन न लगवाएं।",
      clinicalRx: {
        tier1: "Inj. Sodium Acid Phosphate 40.3% w/v (Urimin / Phosvet) 60-80g (150-200 ml IV ड्रिप में + 100 ml SC)",
        tier2: "Inj. Tonophosphan (Tolfenpyrad organic phosphorus) 15-20 ml IM/IV",
        tier3: "Inj. Feritas (Iron) 10 ml Deep IM + Inj. Vit-B12 10 ml IM",
        tier4: "गंभीर मामलों में (Hb < 4 g/dl): Whole Blood Transfusion (ताजा स्वस्थ गोजातीय रक्त 3-4 लीटर IV)",
        tier5: "Inj. Vit-C (Ascorbic acid) 20 ml IV/IM (RBCs की झिल्ली सुदृढ़ करने हेतु)"
      },
      pregnancySafetyNotes: "रोग प्रायः ब्याने के बाद होता है। फास्फोरस सप्लीमेंट्स पूर्णतः सुरक्षित हैं।",
      withdrawalPeriod: "शून्य",
      prevention: "सर्दियों में अधिक बरसीम के साथ गेहूं का भूसा व 50 ग्राम मिनरल मिक्सचर प्रतिदिन दें।"
    },
    {
      id: "DOWNER_COW",
      nameHindi: "डाउटर काउ सिंड्रोम (Downer Cow Syndrome)",
      nameEn: "Downer Cow Syndrome",
      category: "METABOLIC",
      cardinalSign: "ALERT_DOWNER",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस"],
      pathogen: "लंबे समय तक लेटे रहने से मांसपेशियों में इस्केमिक नेक्रोसिस, मायोपैथी व नर्व डैमेज",
      organSystem: "Musculoskeletal & Peripheral Nerves (Obturator/Sciatic)",
      transmission: "असंक्रामक; अनुचित मिल्क फीवर उपचार, प्रसव के समय पेल्विक तंत्रिका खिंचना या फिसलन",
      symptoms: [
        "पशु सजग और सतर्क (Alert) है, चारा-पानी खा रहा है, लेकिन पिछले पैरों से उठने में असमर्थ",
        "कैल्शियम की बोतल चढ़ाने के बाद भी पशु का खड़े न हो पाना",
        "पिछले पैरों को पीछे फैलाकर मेंढक की भांति बैठना (Frog-leg posture)",
        "पैरों में संवेदनशीलता कम होना, पिंच करने पर हल्का सा खींचना",
        "लंबे समय तक पड़े रहने से छाती व पुट्ठों पर गहरे बेडसोर (घाव) बनना"
      ],
      stages: {
        stage1: "मिल्क फीवर उपचार के 24 घंटे बाद भी पशु सतर्क अवस्था में लेटा रहना।",
        stage2: "उठने का प्रयास करना परंतु पिछला धड़ न उठा पाना, रेंगना (Creeper cow)।",
        stage3: "मांसपेशियों का कड़ा होना, पुट्ठे में सूजन, संवेदनशीलता घटना।",
        stage4: "मायोकार्डियल क्षति, गहरे घाव, डिप्रेशन एवं यूरेमिया से अंत।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: पशु को हर 3 घंटे पर एक करवट से दूसरी करवट पलटें ताकि रक्त संचरण बना रहे। पशु के नीचे 1 फीट मोटी सूखी पराली या रेत का बिस्तर बिछाएं ताकि पक्के फर्श से नसों पर दबाव न पड़े। पुट्ठों और जांघों पर सरसों के तेल में सोंठ व कपूर पकाकर दिन में 3 बार मालिश करें। गाय लिफ्ट (Cow Lifter) की मदद से दिन में 2 बार 15 मिनट खड़ा करने का प्रयास करें।",
      clinicalRx: {
        tier1: "Inj. Tonophosphan 15 ml IM/IV + Inj. Mifex 200 ml SC (फास्फोरस व मैग्नीशियम सपोर्ट)",
        tier2: "Inj. Melonex Plus 15-20 ml IM (मांसपेशी शोफ व नर्व सूजन निवारण)",
        tier3: "Inj. Neurokind Plus / Tribivet 15 ml IM (उच्च खुराक बी-कॉम्प्लेक्स न्यूरोप्रोटेक्शन)",
        tier4: "Inj. Vitamin E & Selenium (Reproplus/Selenium-E) 10 ml Deep IM (मांसपेशी पुनरुद्धार)",
        tier5: "Inj. Isoflupredone 10 mg IM (केवल एक बार नर्व शॉक हटाने हेतु) + पेल्विक स्लिंग फिजियोथेरेपी"
      },
      pregnancySafetyNotes: "प्रसव उपरांत होता है। न्यूरोट्रोपिक दवाएं व NSAID सुरक्षित हैं।",
      withdrawalPeriod: "दूध: 3 दिन, मांस: 14 दिन",
      prevention: "प्रसव कक्ष में फिसलन रहित फर्श रखें; मिल्क फीवर का उपचार बिना 1 घंटे की देरी किए कराएं।"
    },
    {
      id: "PINK_EYE",
      nameHindi: "आंख में जाला / सफेद मोतिया (Infectious Keratoconjunctivitis / Pink Eye)",
      nameEn: "Infectious Bovine Keratoconjunctivitis (Pinkeye)",
      category: "BACTERIAL",
      cardinalSign: "CORNEAL_OPACITY",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस", "भेड़", "बकरी"],
      pathogen: "Moraxella bovis",
      organSystem: "Ophthalmic (Cornea & Conjunctiva)",
      transmission: "मक्खियों (Musca autumnalis), धूल, परागकण व सीधी तेज धूप से",
      symptoms: [
        "आंख से लगातार पानी बहना, आंख बंद रखना व तेज धूप न सह पाना (Photophobia)",
        "आंख की पुतली के मध्य में छोटा छाला (Ulcer) बनना जो धीरे-धीरे फैलता है",
        "पूरी पुतली का दूधिया सफेद या नीला-धुंधला पड़ जाना (Corneal Opacity)",
        "आंख की झिल्लियों में तीव्र लालिमा व सूजन, मवाद का कीचड़ बहना",
        "गंभीर मामलों में पुतली का फट जाना (Corneal Rupture) एवं स्थायी अंधापन"
      ],
      stages: {
        stage1: "आंखों से पानी, लालिमा, बार-बार पलकें झपकाना, धूप में आंख बंद करना।",
        stage2: "पुतली के केंद्र में सफेद धब्बा उभरना, कॉर्नियल शोफ।",
        stage3: "पूरी आंख पर सफेद जाला फैलना, मवाद का स्राव, दृष्टिहीनता।",
        stage4: "अल्सर गहरा होना, पुतली का बाहर उभरना अथवा फटना।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: पशु को तत्काल अंधेरे या छायादार कमरे में बांधें ताकि धूप न लगे। आंख को दिन में 3 बार गुनगुने बोरिक एसिड (2%) के पानी से साफ कॉटन द्वारा धोएं। आंख में कभी भी पिसा हुआ नमक, कांच या तीखी दवा न फूंकें! शुद्ध शहद में हल्का सा कपूर मिलाकर आंख के किनारे लगाने से प्रारंभिक अवस्था में लाभ होता है। मक्खियों से बचाव करें।",
      clinicalRx: {
        tier1: "Inj. Oxytetracycline LA 20 mg/kg Deep IM (कॉर्निया के आंसुओं में उच्च सांद्रता हेतु अचूक)",
        tier2: "Subconjunctival Injection: 1 ml Penicillin + 0.5 ml Dexamethasone आंख के ऊपरी पपोटे के भीतर (विशेषज्ञ डॉक्टर द्वारा)",
        tier3: "Inj. Melonex Plus 10-15 ml IM (तीव्र दर्द व सूजन निवारण)",
        tier4: "स्थानीय आई ड्रॉप्स: Ciprofloxacin / Moxifloxacin Eye Drops दिन में 4-6 बार",
        tier5: "Inj. Intavita H (Vit-A) 5 ml IM (कॉर्निया की मरम्मत हेतु)"
      },
      pregnancySafetyNotes: "लोकल आई ड्रॉप्स व सेफ्टिओफर सुरक्षित हैं। सब-कंजंक्टाइवल डेक्सामेथासोन की अत्यंत सूक्ष्म मात्रा सुरक्षित है।",
      withdrawalPeriod: "दूध: 7 दिन (Oxytetracycline LA), मांस: 28 दिन",
      prevention: "बाड़े में मक्खी नियंत्रण तथा धूल से बचाव।"
    },
    {
      id: "BLUE_TONGUE",
      nameHindi: "नीली जीभ रोग (Bluetongue Disease)",
      nameEn: "Bluetongue",
      category: "VIRAL",
      cardinalSign: "CYANOTIC_TONGUE",
      temp: "HIGH",
      affectedSpecies: ["भेड़ (अत्यधिक संवेदनशील)", "बकरी", "गाय-भैंस"],
      pathogen: "Bluetongue Virus (Orbivirus)",
      organSystem: "Vascular Endothelium & Mucocutaneous",
      transmission: "क्यूलीकॉइड्स (Culicoides midges) छोटे डंक मारने वाले मच्छरों द्वारा",
      symptoms: [
        "105°F - 106°F तेज बुखार, डिप्रेशन एवं चारा बंद",
        "मुंह, मसूड़ों व होंठों पर सूजन, जीभ का सूजकर गहरा नीला/बैंगनी (Cyanotic) पड़ना",
        "मुंह व नथुनों से खून व मवादयुक्त बदबूदार स्राव, होठों पर पपड़ी",
        "खुर के कोरोनरी बैंड (Coronary Band) पर लालिमा व तीव्र दर्द, घुटनों के बल चलना",
        "गर्दन की मांसपेशियों में ऐंठन व फेफड़ों में पानी भरने से मृत्यु"
      ],
      stages: {
        stage1: "तीव्र ज्वर, आंख-नाक से स्राव, होठों व चेहरे पर सूजन।",
        stage2: "मुंह में अल्सर, जीभ का नीला पड़ना, अत्यधिक लार, सांस में कष्ट।",
        stage3: "खुरों में सूजन (Coronitis), भयंकर लंगड़ाहट, घुटनों के बल रेंगना।",
        stage4: "वजन का भारी पतन, न्यूमोनिया एवं मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: बीमार भेड़ों को धूप व मच्छरों से बचाकर छांव में रखें। मुंह के छालों को फिटकरी के पानी से धोएं और शहद लगाएं। भेड़ों को दलिया या नरम पत्तियां दें। शाम के समय बाड़े के चारों ओर नीम की सूखी पत्तियों व गंधक का धुआं करें ताकि क्यूलीकॉइड्स मच्छर भाग जाएं।",
      clinicalRx: {
        tier1: "द्वितीयक संक्रमण रोकथाम: Inj. Ceftiofur Sodium 1-2 mg/kg IM अथवा Inj. Enrofloxacin 5 mg/kg IM",
        tier2: "Inj. Oxytetracycline 10 mg/kg IM 3 दिन",
        tier3: "Inj. Melonex Plus 2-3 ml IM (भेड़ डोज़)",
        tier4: "Inj. Avil 2 ml IM + Ringer Lactate 250-500 ml IV",
        tier5: "खुरों पर Topicure स्प्रे + B-Complex सिरप ओरल"
      },
      pregnancySafetyNotes: "यह वायरस भ्रूण में विकृति (Hydranencephaly) उत्पन्न कर सकता है। सुरक्षित एंटीबायोटिक व फ्लुइड्स दें।",
      withdrawalPeriod: "मांस: 14 दिन",
      prevention: "मानसून उपरांत कीट नियंत्रण तथा पेंटावैलेंट ब्लू टंग वैक्सीन।"
    },
    {
      id: "SHEEP_POX",
      nameHindi: "भेड़-बकरी चेचक (Sheep Pox & Goat Pox)",
      nameEn: "Sheep Pox / Goat Pox",
      category: "VIRAL",
      cardinalSign: "POX_VESICLES",
      temp: "HIGH",
      affectedSpecies: ["भेड़", "बकरी"],
      pathogen: "Capripoxvirus (GTPV / SPPV)",
      organSystem: "Cutaneous, Respiratory & Mucous Membranes",
      transmission: "सीधे संपर्क, एरोसोल ड्रॉपलेट्स, सूखी पपड़ियों की धूल व मच्छरों से",
      symptoms: [
        "105°F - 106°F तीव्र ज्वर, भूख बंद, आंख-नाक से पानी",
        "बिना बाल वाले अंगों (चेहरा, होंठ, थन, जांघ के भीतर, पूंछ के नीचे) पर लाल चकत्ते",
        "चकत्तों का फफोलों (Papules) में बदलना जो पककर गहरे घाव व पपड़ी (Scabs) बनते हैं",
        "फेफड़ों में चेचक के दाने बनने से गंभीर न्यूमोनिया व सांस फूलना",
        "मेमनों में 50% से अधिक उच्च मृत्यु दर"
      ],
      stages: {
        stage1: "तीव्र ज्वर, आंखें लाल, नथुने बंद, सुस्ती।",
        stage2: "त्वचा पर लाल दानों का उभरना जो 2 दिन में कठोर पेप्यूल्स बनते हैं।",
        stage3: "दानों का पकना, फटना, स्राव बहना एवं बदबूदार पपड़ी जमना।",
        stage4: "न्यूमोनिया, सेकेंडरी सेप्सिस एवं मेमनों की आकस्मिक मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: बीमार बकरियों को तुरंत अलग करें। दानों व घावों पर नीम के पत्तों का काढ़ा बनाकर धोएं। पपड़ियों पर हल्दी व नीम का तेल लगाएं। बाड़े में कली का चूना छिड़कें। बकरियों को गुनगुने पानी में थोड़ा गुड़ व अजवाइन मिलाकर पिलाएं ताकि ऊर्जा बनी रहे।",
      clinicalRx: {
        tier1: "Inj. Enrofloxacin 5 mg/kg IM अथवा Inj. Amoxicillin 10 mg/kg IM 5 दिन",
        tier2: "Inj. Ceftriaxone 500mg-1g IM",
        tier3: "Inj. Melonex Plus 2-3 ml IM",
        tier4: "Inj. Avil 2 ml IM + Inj. Vit-A (Intavita) 2 ml IM (त्वचा व फेफड़ों की झिल्ली सुधार)",
        tier5: "Topicure स्प्रे घावों पर + मुँह के छालों हेतु B-Complex सप्लीमेंट"
      },
      pregnancySafetyNotes: "गाभिन बकरियों में गर्भपात का खतरा रहता है। स्टेरॉयड का प्रयोग न करें।",
      withdrawalPeriod: "मांस: 14 दिन",
      prevention: "Goat Pox / Sheep Pox Tissue Culture Vaccine 1 ml S/C वार्षिक।"
    },
    {
      id: "UREA_TOXICITY",
      nameHindi: "यूरिया विषाक्तता (Urea Toxicity / Ammonia Poisoning)",
      nameEn: "Urea Poisoning (Ammonia Toxicosis)",
      category: "TOXICOLOGICAL",
      cardinalSign: "FROTHY_BLOAT_TREMORS",
      temp: "SUB",
      affectedSpecies: ["गाय", "भैंस", "भेड़", "बकरी"],
      pathogen: "यूरिया खाद का आकस्मिक अंतर्ग्रहण या यूरिया उपचारित चारे में असंतुलन (रूमेन pH > 8.0)",
      organSystem: "Nervous, Respiratory & Forestomachs",
      transmission: "असंक्रामक; खेत में रखी यूरिया खाद की बोरी या घोल पी जाना",
      symptoms: [
        "यूरिया खाने के 15 से 30 मिनट के भीतर अत्यधिक तीव्र बेचैनी व पेट दर्द",
        "मुंह से अत्यधिक झागदार लार गिरना व दांत किटकिटाना",
        "मांसपेशियों में भयंकर कंपन, अकड़न व लड़खड़ाकर गिर पड़ना",
        "सांस लेने में भारी कष्ट, हांफना, बायां पेट तेजी से फूलना (गैस)",
        "दौरे पड़ना, बार-बार पेशाब व गोबर निकलना एवं 1-2 घंटे में दम घुटने से मृत्यु"
      ],
      stages: {
        stage1: "10-20 मिनट: बेचैनी, लार टपकना, पेट में मरोड़, डकारें।",
        stage2: "मांसपेशियों में तीव्र कंपन, आंखों की पुतलियां फैलना, लड़खड़ाहट।",
        stage3: "जमीन पर गिरना, पैर पटकना, मुंह से अत्यधिक झाग, सांस फूलना।",
        stage4: "कोमा, दिल व सांस का रुकना एवं 1 घंटे में आकस्मिक मृत्यु।"
      },
      farmerRemedies: "अति-आपातकालीन देसी उपचार (समय अत्यंत महत्वपूर्ण): बिना 1 मिनट गंवाए तुरंत 2 से 4 लीटर शुद्ध सिरका (Vinegar / Acetic acid) या 2-3 लीटर खट्टा गन्ने का सिरका या 4-5 लीटर छाछ में 1 किलो बर्फ का ठंडा पानी मिलाकर नाल से पिलाएं। सिरके का एसिड रूमेन के अमोनिया को बांधकर अमोनियम आयन बना देता है जो रक्त में नहीं घुलता। 5 लीटर बर्फ का ठंडा पानी पेट में डालें।",
      clinicalRx: {
        tier1: "रूमेन न्यूट्रलाइजेशन: 5% Acetic Acid (सिरका) 2-4 लीटर + ठंडा पानी 5-10 लीटर स्टमक ट्यूब से",
        tier2: "Dextrose 5% or 10% 2-3 लीटर IV (लीवर व मस्तिष्क को अमोनिया से बचाने हेतु)",
        tier3: "Inj. Spasmo-vet (Dicyclomine) 15 ml IM (ऐंठन शांत करने हेतु)",
        tier4: "Inj. Dexona 10 ml IV (श्वसन संकट व शॉक निवारण)",
        tier5: "Inj. Tribivet (Thiamine) 20 ml IV/IM (मस्तिष्क क्षति रोकने हेतु)"
      },
      pregnancySafetyNotes: "अमोनिया का तीव्र विष तुरंत जानलेवा है; प्राथमिक लक्ष्य सिरका व फ्लूइड द्वारा जीवन रक्षा है।",
      withdrawalPeriod: "शून्य",
      prevention: "यूरिया खाद को पशुओं की पहुंच से दूर रखें; यूरिया-उपचारित चारा विशेषज्ञों की देखरेख में ही बनाएं।"
    },
    {
      id: "CYANIDE_POISONING",
      nameHindi: "कच्ची ज्वार विषाक्तता (Cyanide / HCN / Prussic Acid Poisoning)",
      nameEn: "Hydrocyanic Acid (HCN) Poisoning",
      category: "TOXICOLOGICAL",
      cardinalSign: "CHERRY_RED_BLOOD",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस", "भेड़", "बकरी"],
      pathogen: "सूखाग्रस्त छोटी अपरिपक्व ज्वार/चरी (Sorghum) में धुरिन (Dhurrin) ग्लूकोसाइड का टूटना",
      organSystem: "Cellular Respiration (Cytochrome Oxidase)",
      transmission: "असंक्रामक; बरसात से पहले की छोटी (1-2 फीट) बिना फूल वाली प्यासी ज्वार चरने से",
      symptoms: [
        "कच्ची ज्वार चरने के 10 से 15 मिनट के भीतर पशु का हांफने लगना",
        "मुंह से झाग निकलना, आंखें फटी रहना व अत्यधिक बेचैनी",
        "खून का रंग बिल्कुल चमकीला चेरी जैसा लाल (Bright Cherry-Red Blood) होना",
        "मांसपेशियों में कंपन, लड़खड़ाना, पशु का गिर पड़ना व गर्दन पीछे खींचना",
        "कोशिकाओं द्वारा ऑक्सीजन न ले पाने से दम घुटना और कुछ ही मिनटों में मृत्यु"
      ],
      stages: {
        stage1: "चारा चरने के तुरंत बाद: अत्यधिक तेज सांस, लार, बेचैनी।",
        stage2: "मांसपेशियों में ऐंठन, पल्स तेज व कमजोर, पुतलियां फैलना।",
        stage3: "जमीन पर गिरकर आक्षेप (दौरे), मुंह खोलकर दम घुटने जैसा हांफना।",
        stage4: "श्वसन पक्षाघात, दिल रुकना एवं 15-30 मिनट में मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: पशु को तुरंत ज्वार के खेत से बाहर निकालें। 500 ग्राम साधारण चीनी/गुड़ 1 लीटर पानी में घोलकर तुरंत पिलाएं (शर्करा सायनाइड को कुछ हद तक बांधती है)। सिर पर ठंडा पानी डालें। यह अति-तीव्र विष है, घरेलू नुस्खों का समय बहुत कम होता है; तुरंत पशु चिकित्सक से सायनाइड एंटीडोट की नस में सुई लगवाएं।",
      clinicalRx: {
        tier1: "विशिष्ट एंटीडोट (Specific Antidote Combo): 1% Sodium Nitrite (3g/100ml) 10-20 ml IV + 25% Sodium Thiosulfate (25g/100ml) 50-100 ml IV तुरंत",
        tier2: "Sodium Thiosulfate 25% 100-200 ml IV (अकेले भी अत्यंत सुरक्षित व प्रभावी)",
        tier3: "Inj. Dexona 10 ml IV + Inj. Coramine / Nikethamide (श्वसन उत्तेजक) 5-10 ml IM",
        tier4: "Dextrose 20% 1 लीटर IV",
        tier5: "रूमेन में 50g Sodium Thiosulfate ओरल पानी में घोलकर दें"
      },
      pregnancySafetyNotes: "सायनाइड अत्यधिक प्राणघातक है; एंटीडोट तत्काल दें, यह मातृ व भ्रूण जीवन की एकमात्र रक्षा है।",
      withdrawalPeriod: "शून्य",
      prevention: "कम से कम 3-4 फीट ऊंची और फूल आने वाली ज्वार ही खिलाएं; छोटी प्यासी ज्वार कभी न चरने दें।"
    },
    {
      id: "NITRATE_POISONING",
      nameHindi: "हरा चारा विषाक्तता / नाइट्रेट विषाक्तता (Nitrate / Nitrite Poisoning)",
      nameEn: "Nitrate / Nitrite Toxicity",
      category: "TOXICOLOGICAL",
      cardinalSign: "CHOCOLATE_BROWN_BLOOD",
      temp: "SUB",
      affectedSpecies: ["गाय", "भैंस", "भेड़", "बकरी"],
      pathogen: "अधिक यूरिया/नाइट्रोजन युक्त खेतों की हरी चरी, जई चरना (रक्त में मेथेमोग्लोबिन बनना)",
      organSystem: "Erythrocytes & Tissue Oxygenation",
      transmission: "असंक्रामक; अत्यधिक बादलों वाले मौसम में उगी तेजी से बढ़ी हरी फसल चरना",
      symptoms: [
        "रक्त का रंग चमकीले लाल की जगह बिल्कुल गहरा चॉकलेट भूरा (Chocolate-Brown Blood) होना",
        "सांस लेने में भारी कष्ट, मुंह खोलकर हांफना व जीभ नीली-भूरी पड़ना",
        "कमजोरी, लड़खड़ाहट, मांसपेशियों में कंपन व शरीर का तापमान गिरना",
        "बार-बार पेशाब आना, आंखें फटी रहना व हृदय की गति तेज होना",
        "गाभिन पशुओं में ऑक्सीजन की कमी से कुछ दिनों बाद अचानक गर्भपात होना"
      ],
      stages: {
        stage1: "सुस्ती, तेज सांस, नब्ज तेज, चारा छोड़ना।",
        stage2: "हांफना, लार टपकना, लड़खड़ाना, श्लेष्मा झिल्लियों का भूरा पड़ना।",
        stage3: "जमीन पर गिरना, सिर पीछे मोड़ना, रक्त का रंग चॉकलेट जैसा।",
        stage4: "एस्फिक्सिया, आक्षेप एवं दम घुटने से आकस्मिक अंत।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: संदिग्ध चारा तुरंत हटाएं। 250 ग्राम ग्लूकोज पाउडर पानी में घोलकर पिलाएं। पशु को बिल्कुल शांत छांव में रखें और अनावश्यक न चलाएं क्योंकि शरीर में ऑक्सीजन की भारी कमी है। तुरंत डॉक्टर को बुलाकर मिथाइलीन ब्लू का इंजेक्शन नस में लगवाएं।",
      clinicalRx: {
        tier1: "विशिष्ट जीवन रक्षक एंटीडोट: Inj. Methylene Blue 1% w/v (1 to 2 mg/kg or 1-2 ml/10 kg) Slow IV Only (चॉकलेट रक्त को तुरंत सामान्य करता है)",
        tier2: "Inj. Ascorbic Acid (Vitamin C) 10-20 ग्राम IV (शक्तिशाली एंटीऑक्सीडेंट)",
        tier3: "Inj. Dextrose 20% 1-2 लीटर IV",
        tier4: "Inj. Dexona 10 ml IV (शॉक निवारण हेतु)",
        tier5: "रूमेन में ठंडा पानी 5-10 लीटर स्टमक ट्यूब से (बैक्टीरियल रिडक्शन धीमा करने हेतु)"
      },
      pregnancySafetyNotes: "मिथाइलीन ब्लू की सटीक खुराक जीवन रक्षक है। नाइट्रेट विषाक्तता से बचे पशुओं में भी बाद में गर्भपात की निगरानी रखें।",
      withdrawalPeriod: "शून्य",
      prevention: "अधिक नाइट्रोजन खाद वाले खेतों से चारा काटकर पहले धूप में सुखाएं; खाली पेट पशु को न खिलाएं।"
    },
    {
      id: "TRP",
      nameHindi: "सूजा रोग / हार्डवेयर बीमारी (Traumatic Reticuloperitonitis - TRP)",
      nameEn: "Traumatic Reticuloperitonitis (TRP / Hardware Disease)",
      category: "METABOLIC",
      cardinalSign: "GRUNTING_ELBOW_ABDUCTION",
      temp: "HIGH",
      affectedSpecies: ["गाय (विशेष रूप से)", "भैंस"],
      pathogen: "चारे के साथ लोहे की कील, तार या सुई निगलना जो रेटिकुलम की दीवार को भेद देती है",
      organSystem: "Reticulum, Peritoneum & Pericardium",
      transmission: "असंक्रामक; बिनोले, भूसे या कुट्टी में लोहे के तार/कील की मिलावट",
      symptoms: [
        "पशु का कूबड़ निकाल कर (Arched Back) अकड़कर खड़ा होना और चलने में अत्यधिक दर्द",
        "कोहनी को बाहर की ओर फैलाकर खड़ा होना (Abduction of Elbows)",
        "पेट के निचले हिस्से (Xiphoid) को दबाने पर दर्द से जोर से कराहना (Grunt)",
        "हल्का लगातार बुखार (103°F), दूध का अचानक गिरना व रूमेन की गति कम होना",
        "यदि कील दिल तक पहुंच जाए (TRP to Traumatic Pericarditis): गले व सीने में पानी भरी भीषण सूजन"
      ],
      stages: {
        stage1: "कील का रेटिकुलम को छेदना, अचानक दूध कम होना, हल्का बुखार, कराहना।",
        stage2: "लोकल पेरिटोनाइटिस, कूबड़ निकालना, चलने में आनाकानी, सूखा गोबर।",
        stage3: "कील का डायाफ्राम पार कर पेरिकार्डियम में घुसना, दिल की धड़कन में घुर-घुर पानी की आवाज़ (Washing machine murmur)।",
        stage4: "कंजेस्टिव हार्ट फेलियर, गले में भारी शोफ एवं मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: पशु के आगे के पैर 6 इंच से 1 फीट ऊंचे चबूतरे पर बांधें ताकि गुरुत्वाकर्षण के कारण कील आगे दिल की तरफ न खिसके। कुट्टी मशीन व चारे के खुर्रों पर चुंबक (Magnets) लगाएं ताकि लोहे के तार हट सकें। पशु को भारी सूखा चारा न दें, पतला दलिया दें। पेट पर मालिश बिल्कुल न करें।",
      clinicalRx: {
        tier1: "रूमेन चुंबक (Rumen Magnet) ओरल गन द्वारा पेट में स्थापित करना (कील को पकड़ने हेतु)",
        tier2: "Inj. Ceftriaxone 3g IM/IV अथवा Inj. Amoxicillin-Sulbactam 4.5g IM 5-7 दिन",
        tier3: "Inj. Melonex Plus 15-20 ml IM दैनिक",
        tier4: "Inj. Belamyl 10 ml IM + Dextrose Saline 2 लीटर IV",
        tier5: "Rumenotomy (शल्य चिकित्सा द्वारा पेट खोलकर कील बाहर निकालना) यदि चुंबक से आराम न मिले"
      },
      pregnancySafetyNotes: "गाभिन पशुओं में पेट का दबाव बढ़ने पर कील दिल में घुसने का खतरा अधिक होता है। सेफ्ट्रिआक्सोन सुरक्षित है।",
      withdrawalPeriod: "दूध: 4 दिन, मांस: 14 दिन",
      prevention: "बछड़ियों को 1 वर्ष की आयु में रूमेन मैगनेट खिलाएं; निर्माण स्थलों के पास मवेशी न चराएं।"
    },
    {
      id: "METRITIS",
      nameHindi: "गर्भाशय शोथ / मैला छांटना (Metritis / Endometritis / Pyometra)",
      nameEn: "Bovine Metritis Complex",
      category: "BACTERIAL",
      cardinalSign: "PURULENT_DISCHARGE",
      temp: "HIGH",
      affectedSpecies: ["गाय", "भैंस"],
      pathogen: "Trueperella pyogenes, Fusobacterium necrophorum, E. coli",
      organSystem: "Reproductive Tract (Endometrium & Myometrium)",
      transmission: "कष्टप्रद प्रसव (Dystocia), अस्वच्छ हाथों से जेर निकालना, दूषित वीर्य या ए.आई.",
      symptoms: [
        "योनि से अत्यधिक बदबूदार, सफेद, पीला मवाद जैसा या गंदा लाल मैला (Discharge) लगातार गिरना",
        "पशु का बार-बार पूंछ उठाना, पीठ की कमान बनाना व पेशाब की तरह जोर लगाना",
        "तीव्र मेट्राइटिस में तेज बुखार (104°F), दूध का सूख जाना व भूख बंद होना",
        "पायोमेट्रा: गर्भाशय में कई लीटर मवाद भर जाना, पेट का बड़ा होना, पशु का मद (Heat) में न आना",
        "बार-बार सीमन डलवाने पर भी गर्भ न ठहरना (बांझपन)"
      ],
      stages: {
        stage1: "प्रसव के 1-3 दिन: बदबूदार लाल-भूरा लोचिया, हल्का ज्वर।",
        stage2: "7-14 दिन: सेप्टिक मेट्राइटिस, मवादयुक्त स्राव, दूध का गिरना।",
        stage3: "21 दिन बाद: क्रॉनिक एंडोमेट्राइटिस, सफेद मवाद की लकीरें, रिपीट ब्रीडिंग।",
        stage4: "पायोमेट्रा: गर्भाशय का मवाद से फूलना, स्थायी एनेस्ट्रस (मदहीनता)।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: 500 ग्राम पुराना गुड़ + 50 ग्राम अजवाइन + 25 ग्राम हल्दी + 25 ग्राम सोंठ का काढ़ा ब्याने के बाद 5 दिन तक लगातार दें। योनि के बाहरी हिस्से को पोटाश के हल्के पानी से धोकर साफ रखें। बाड़े को सूखा रखें। जब तक मैला गिरना पूरी तरह बंद न हो जाए और शीशे जैसा पारदर्शी तार न आए, तब तक सीमन (A.I.) कदापि न करवाएं।",
      clinicalRx: {
        tier1: "Inj. PGF2-alpha (Cloprostenol - Pragma / Vetmate) 2 ml Deep IM (सर्विक्स खोलकर मवाद बाहर फेंकने हेतु रामबाण)",
        tier2: "Inj. Ceftiofur Sodium 1g IM अथवा Inj. Amoxicillin-Sulbactam 4.5g IM 3-5 दिन",
        tier3: "Inj. Melonex Plus 15-20 ml IM",
        tier4: "Intrauterine Infusion: Lixen IU (Cephapirin) 1 वायल अथवा Metricure गर्भाशय में छोड़ें (PGF2a के 48 घंटे बाद)",
        tier5: "Cleanex / Exapar liquid 100 ml ओरल 5 दिन + यूट्रीन टॉनिक"
      },
      pregnancySafetyNotes: "PGF2alpha गाभिन पशु में 100% गर्भपात कराता है; अतः सुनिश्चित करें कि पशु खाली (Non-pregnant) हो।",
      withdrawalPeriod: "दूध: 3 दिन, मांस: 14 दिन",
      prevention: "प्रसव के समय स्वच्छता रखें; कभी भी अप्रशिक्षित व्यक्ति से जबरन जेर न खिंचवाएं।"
    },
    {
      id: "BRUCELLOSIS",
      nameHindi: "ब्रुसेलोसिस / संक्रामक गर्भपात (Brucellosis / Bang's Disease)",
      nameEn: "Bovine Brucellosis (Contagious Abortion)",
      category: "BACTERIAL",
      cardinalSign: "THIRD_TRIMESTER_ABORTION",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस", "भेड़", "बकरी", "मनुष्य (Zoonotic)"],
      pathogen: "Brucella abortus / Brucella melitensis",
      organSystem: "Reproductive (Placentome & Fetal Tissues)",
      transmission: "गर्भपात के स्राव, दूषित दूध, जेर अथवा वीर्य के सीधे संपर्क से",
      symptoms: [
        "गर्भावस्था के अंतिम त्रैमास (विशेष रूप से 6 से 8 माह) में अचानक गर्भपात होना",
        "गर्भपात के पश्चात जेर का बुरी तरह अटक जाना (Retention of Placenta)",
        "गर्भपात के बाद गर्भाशय का गंभीर संक्रमण, बार-बार फिरना व बांझपन",
        "नर पशुओं (सांड/झोटे) के अंडकोषों में भारी सूजन व कड़ापन (Orchitis)",
        "मनुष्यों में संचरण: पशुपालक व डॉक्टरों में रुक-रुक कर आने वाला माल्टा बुखार (Undulant Fever)"
      ],
      stages: {
        stage1: "बैक्टीरिया का लिम्फ नोड्स व गर्भाशय प्लेसेंटा में स्थापित होना।",
        stage2: "प्लेसेंटाइटिस, कोटिलेडन्स का चमड़े जैसा मोटा व सड़ा होना।",
        stage3: "6-8 माह पर मृत भ्रूण का अचानक बाहर गिरना (Abortion)।",
        stage4: "क्रॉनिक कैरियर अवस्था, दूध में जीवाणु का निरंतर विसर्जन।"
      },
      farmerRemedies: "सख्त स्वास्थ्य चेतावनी: यदि गाय-भैंस 6-8 माह पर बच्चा फेंक दे, तो उस मृत भ्रूण व जेर को नंगे हाथों से कभी न छुएं! ग्लव्स पहनकर भ्रूण व जेर को गड्ढे में चूना डालकर दबाएं। उस स्थान को फिनाइल व ब्लीचिंग पाउडर से धोएं। उस पशु का कच्चा दूध कभी न पिएं (उबालकर ही पिएं), अन्यथा यह बीमारी मनुष्य में आ जाती है जिसका इलाज बहुत कठिन है। सरकारी डॉक्टर से खून की जांच (RBPT) करवाएं।",
      clinicalRx: {
        tier1: "नोट: पशुओं में ब्रुसेलोसिस का कोई 100% सफल इलाज नहीं है (वाहक बने रहते हैं); नियंत्रण हेतु: Inj. Oxytetracycline LA 20 mg/kg IM (सप्ताह में दो बार 3 सप्ताह)",
        tier2: "Streptomycin 10-15 mg/kg IM + Chlortetracycline 2g दैनिक आहार में (विशेषज्ञ परामर्श अनुसार)",
        tier3: "Inj. Melonex Plus 15 ml IM",
        tier4: "गर्भाशय सफाई हेतु PGF2alpha (Pragma) 2 ml IM + Intrauterine Lixen IU",
        tier5: "पॉजिटिव पाए जाने पर झुंड से अलग (Culling/Isolation) करना ही सर्वोत्तम नीति है"
      },
      pregnancySafetyNotes: "ब्रुसेलोसिस ग्रसित पशु भविष्य में भी संक्रमण फैलाते हैं। मनुष्य सुरक्षा सर्वोपरि है।",
      withdrawalPeriod: "दूध का उपभोग बिना पाश्चुरीकरण निषिद्ध",
      prevention: "4 से 8 माह की मादा बछड़ियों में Brucella Cotton Strain-19 अथवा RB-51 का टीका जीवन में एक बार लगवाएं।"
    },
    {
      id: "ACTINOBACILLOSIS",
      nameHindi: "लकड़ी जैसी कठोर जीभ (Wooden Tongue / Actinobacillosis)",
      nameEn: "Actinobacillosis (Wooden Tongue)",
      category: "BACTERIAL",
      cardinalSign: "WOODEN_TONGUE",
      temp: "HIGH",
      affectedSpecies: ["गाय", "भैंस", "भेड़"],
      pathogen: "Actinobacillus lignieresii",
      organSystem: "Soft Tissues of Oral Cavity & Tongue",
      transmission: "सूखे कटीले भूसे से जीभ में खरोंच व जीवाणु का अंतर्ग्रहण",
      symptoms: [
        "जीभ का अत्यधिक सूज जाना, कड़ा होना और लकड़ी के तख्ते की भांति पत्थर जैसा सख्त होना",
        "जीभ मुंह से बाहर लटकी रहना, पशु का चारा चबाने व निगलने में असमर्थ होना",
        "मुंह से निरंतर तारदार लार गिरना, वजन का तेजी से घटना",
        "जबड़े के नीचे की लिम्फ नोड्स में कठोर फोड़े बनना जिनसे गाढ़ा पीला मवाद निकलना",
        "जीभ पर छोटे-छोटे पीले दाने व अल्सर दिखाई देना"
      ],
      stages: {
        stage1: "जीभ में सूजन, चारा धीरे चबाना, मुंह से हल्का पानी गिरना।",
        stage2: "जीभ का कठोर होना, मुंह से बाहर निकलना, निगलने में असमर्थता।",
        stage3: "जबड़े के नीचे फोड़े बनना, मवाद रिसना, भूख से कंकाल बनना।",
        stage4: "गंभीर दुर्बलता, निर्जलीकरण एवं भुखमरी से मृत्यु।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: पशु को कटीला सूखा भूसा बिल्कुल न दें। नरम हरा चारा, दलिया, आटे की लपसी या उबला हुआ दाना दें। मुंह को गुनगुने फिटकरी के पानी से धोएं। जीभ पर शहद व ग्लिसरीन लगाएं। इस बीमारी में पोटेशियम आयोडाइड की दवा ही एकमात्र अचूक इलाज है, डॉक्टर से तुरंत संपर्क करें।",
      clinicalRx: {
        tier1: "Sodium Iodide 10% or 20% solution (1g/15 kg or 30-40g प्रति वयस्क गाय) Slow IV सिंगल डोज़ (चमत्कारी प्रभाव)",
        tier2: "Potassium Iodide पाउडर 6 से 10 ग्राम ओरल दैनिक 10-14 दिन तक (जब तक त्वचा पर रूसी/आंसू न आने लगें - Iodism)",
        tier3: "Inj. Streptomycin 10-20 mg/kg IM अथवा Inj. Oxytetracycline LA 20 mg/kg Deep IM",
        tier4: "Inj. Melonex Plus 15-20 ml IM (दर्द व सूजन घटाने हेतु)",
        tier5: "Inj. Belamyl 10 ml IM + Dextrose Saline 2 लीटर IV (पोषण सपोर्ट)"
      },
      pregnancySafetyNotes: "सोडियम आयोडाइड की उच्च खुराक से गाभिन पशुओं में गर्भपात हो सकता है; अतः गर्भावस्था में पेनिसिलिन/स्ट्रेप्टोमाइसिन को प्राथमिकता दें।",
      withdrawalPeriod: "दूध: 7 दिन, मांस: 28 दिन",
      prevention: "भूसे में से कांटे व नुकीली चीजें अलग करें; चारे को भिगोकर नरम करके खिलाएं।"
    },
    {
      id: "ACTINOMYCOSIS",
      nameHindi: "जबड़े की हड्डी की सूजन (Lumpy Jaw / Actinomycosis)",
      nameEn: "Actinomycosis (Lumpy Jaw)",
      category: "BACTERIAL",
      cardinalSign: "LUMPY_JAW_BONE",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस"],
      pathogen: "Actinomyces bovis",
      organSystem: "Skeletal (Mandible & Maxilla Bones)",
      transmission: "दांत बदलते समय या नुकीले चारे से मसूड़ों में चोट के रास्ते हड्डी में प्रवेश",
      symptoms: [
        "निचले जबड़े की हड्डी पर अत्यंत कठोर, अचल, पत्थर जैसी सूजन (Immobile Bone Swelling)",
        "सूजन हड्डी से जुड़ी होती है (चमड़ी के नीचे हिलती नहीं है)",
        "समय बीतने पर हड्डी में छेद होकर मवाद की नालियां (Fistulous tracts) बनना",
        "मवाद में बारीक पीले दाने (Sulfur Granules) स्पष्ट दिखाई देना",
        "जबड़े की विकृति, दांत ढीले पड़ना, चारा चबाने में दर्द व धीरे-धीरे सूखना"
      ],
      stages: {
        stage1: "जबड़े की हड्डी पर छोटा कठोर उभार, दर्द रहित, सामान्य चारा खाना।",
        stage2: "उभार का बड़ा होना, हड्डी में विकृति, दांतों का टेढ़ा होना।",
        stage3: "त्वचा का फटना, नालियों से पीले दानों युक्त मवाद रिसना।",
        stage4: "चबाने में पूर्ण असमर्थता, हड्डी का मधुमक्खी के छत्ते जैसा खोखला होना।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: फोड़े के मुंह को नीम के गुनगुने काढ़े से साफ रखें। मवाद निकलने वाले छिद्रों में 5% पोविडोन आयोडीन का घोल सिरिंज से भरें। पशु को बिल्कुल नरम, पीसा हुआ दाना व गीली सानी दें ताकि चबाने में जोर न पड़े। प्रारंभिक अवस्था में ही इलाज कराएं, हड्डी पूरी तरह विकृत होने के बाद इलाज कठिन हो जाता है।",
      clinicalRx: {
        tier1: "Inj. Streptomycin 10-15 mg/kg IM + Inj. Procaine Penicillin 20,000 IU/kg IM लगातार 7-14 दिन",
        tier2: "Sodium Iodide 10% (30-40g IV) प्रारंभिक दिन + Potassium Iodide 8g ओरल दैनिक 14 दिन",
        tier3: "Inj. Oxytetracycline LA 20 mg/kg Deep IM (सप्ताह में दो बार)",
        tier4: "Inj. Melonex Plus 15 ml IM",
        tier5: "Fistula की टिंचर आयोडीन से डीप कैवियरी फ्लशिंग + लिवर टॉनिक"
      },
      pregnancySafetyNotes: "पेनिसिलिन सुरक्षित है। आयोडाइड की उच्च खुराक से गाभिन पशुओं में बचें।",
      withdrawalPeriod: "दूध: 5 दिन, मांस: 30 दिन",
      prevention: "चारे से कटीले तार, कीलें व बबूल के कांटे अलग करें।"
    },
    {
      id: "BEF",
      nameHindi: "अढैया बुखार / तीन दिन की बीमारी (Bovine Ephemeral Fever / Three-Day Sickness)",
      nameEn: "Bovine Ephemeral Fever (Three-Day Sickness)",
      category: "VIRAL",
      cardinalSign: "STIFFNESS_SHIVERING",
      temp: "HIGH",
      affectedSpecies: ["गाय", "भैंस"],
      pathogen: "Bovine Ephemeral Fever Virus (Ephemerovirus / Rhabdoviridae)",
      organSystem: "Systemic Musculoskeletal & Vascular",
      transmission: "क्यूलीकॉइड्स (Culicoides) मच्छरों व डांस मक्खियों के काटने से (मानसून उपरांत)",
      symptoms: [
        "अचानक अत्यधिक तेज बुखार (105°F - 107°F) व पूरे शरीर में भीषण कंपकंपी",
        "पशु का चारों पैरों में भारी अकड़न के साथ लंगड़ाना, एक पैर से दूसरे पर भार बदलना",
        "आंखों व नाक से पानी, मुंह से तारदार लार टपकना व भारी सांस लेना",
        "दूध उत्पादन में अचानक 70-80% की भारी गिरावट",
        "दूसरे दिन पशु का जमीन पर बैठ जाना, परंतु तीसरे-चौथे दिन स्वतः ठीक होने लगना"
      ],
      stages: {
        stage1: "तीव्र ज्वर (106°F), कंपकंपी, आंख-नाक से स्राव, दूध शून्य।",
        stage2: "गंभीर अकड़न, जोड़ों में सूजन, चलने से इनकार, बैठ जाना।",
        stage3: "तीसरे दिन: बुखार का अचानक सामान्य होना, भूख लौटना।",
        stage4: "पुनर्प्राप्ति (Recovery) अथवा अनुचित देखभाल से डाउटर काउ में बदलना।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: पशु को धूप से हटाकर पंखे या ठंडी छांव में रखें और माथे पर ठंडे पानी की पट्टी रखें। 50 ग्राम सोंठ + 50 ग्राम अजवाइन + 100 ग्राम गुड़ का काढ़ा दिन में 2 बार पिलाएं। जोड़ों पर तारपीन व सरसों के तेल की हल्की मालिश करें। जबरन नाल न पिलाएं क्योंकि निगलने की नसों में अस्थायी सूजन रहती है। 3 दिन में पशु सामान्यतः ठीक हो जाता है।",
      clinicalRx: {
        tier1: "Inj. Flunixin Meglumine (Megludyne) 2.2 mg/kg Slow IV/IM (बुखार व मस्कुलोस्केलेटल अकड़न में जादुई असर)",
        tier2: "Inj. Melonex Plus 15-20 ml IM दैनिक 3 दिन",
        tier3: "Inj. Calcium Borogluconate (Mifex) 200-300 ml SC/IV (हाइपोकैल्सीमिया जनित बैठने से रोकने हेतु)",
        tier4: "Inj. Ceftriaxone 3g IM (केवल द्वितीयक फेफड़ों के संक्रमण से बचाव हेतु)",
        tier5: "Inj. Tribivet 10 ml IM + Inj. Avil 10 ml IM"
      },
      pregnancySafetyNotes: "फ्लुनिक्सिन व मेलोक्सीकैम सुरक्षित हैं। तीसरे त्रैमास में उच्च ज्वर से गर्भपात रोकने हेतु NSAID तुरंत दें।",
      withdrawalPeriod: "दूध: 3 दिन, मांस: 7 दिन",
      prevention: "मच्छर-मक्खी रोधी स्प्रे तथा बाड़े में जलभराव का निवारण।"
    },
    {
      id: "CCPP",
      nameHindi: "सीसीपीपी / संक्रामक प्लूरोन्यूमोनिया (Contagious Caprine Pleuropneumonia - CCPP)",
      nameEn: "Contagious Caprine Pleuropneumonia (CCPP)",
      category: "BACTERIAL",
      cardinalSign: "PLEURITIC_PAIN_COUGH",
      temp: "HIGH",
      affectedSpecies: ["केवल बकरियां (Goats Only)"],
      pathogen: "Mycoplasma capricolum subsp. capripneumoniae (Mccp)",
      organSystem: "Respiratory (Lungs, Pleura & Thoracic Cavity)",
      transmission: "संक्रमित बकरी के खांसने व छींकने के सीधे एरोसोल ड्रॉपलेट्स से",
      symptoms: [
        "105°F - 106°F तीव्र ज्वर, बकरियों का खांसना व अत्यधिक सुस्ती",
        "सांस लेते समय सीने में तीव्र दर्द (Pleuritic Pain), कराहना व जीभ बाहर निकलना",
        "नाक से गाढ़ा, झागदार, पीला बलगम बहना व सांस की अत्यधिक तेज गति",
        "फेफड़ों की झिल्ली में पानी भरना (Pleural Effusion) व थपथपाने पर दर्द होना",
        "बकरियों का सिर खींचकर मुंह खोलकर सांस लेना एवं 70% तक उच्च मृत्यु दर"
      ],
      stages: {
        stage1: "तीव्र बुखार, सूखी दर्दनाक खांसी, सुस्ती, चारा छोड़ना।",
        stage2: "गाढ़ा नाक स्राव, पसलियों का तेज चलना, मुंह खोलकर सांस लेना।",
        stage3: "फेफड़ों में तरल जमना, सांस लेते समय घरघराहट व कराहना।",
        stage4: "फेफड़ों का हेपेटाइजेशन (यकृत जैसा कठोर होना) एवं घुटन से अंत।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: बीमार बकरियों को तुरंत अलग हवादार व सूखे कमरे में रखें। गुनगुने पानी में नीलगिरी तेल की भाप दें। 20 ग्राम सोंठ + 10 ग्राम काली मिर्च + 20 ग्राम तुलसी + 50 ग्राम गुड़ का काढ़ा दिन में 2 बार पिलाएं। छाती पर सरसों का गर्म तेल लगाएं। माइकोप्लाज्मा पर साधारण पेनिसिलिन काम नहीं करती, टायलोसिन या टेट्रासाइक्लिन की तुरंत सुई लगवाएं।",
      clinicalRx: {
        tier1: "Inj. Tylosin Tartrate (Tylosin) 10-15 mg/kg IM 3-5 दिन (माइकोप्लाज्मा हेतु अचूक औषधि)",
        tier2: "Inj. Oxytetracycline LA 20 mg/kg Deep IM सिंगल डोज़ अथवा Inj. Enrofloxacin 5 mg/kg IM",
        tier3: "Inj. Melonex Plus 2-3 ml IM (बकरी डोज़)",
        tier4: "Inj. Avil 2 ml IM + Inj. Bromhexine 2-3 ml IM (बलगम ढीला करने हेतु)",
        tier5: "Dextrose Saline 250 ml Slow IV (यदि अत्यधिक दुर्बल हो)"
      },
      pregnancySafetyNotes: "टायलोसिन गर्भावस्था में सुरक्षित है। उच्च बुखार नियंत्रण अनिवार्य है।",
      withdrawalPeriod: "दूध: 4 दिन, मांस: 14 दिन",
      prevention: "CCPP इनएक्टिवेटेड वैक्सीन 0.5 ml S/C वार्षिक टीकाकरण।"
    },
    {
      id: "HYPOMAGNESEMIC_TETANY",
      nameHindi: "घास टिटेनी / मैग्नीशियम न्यूनता (Grass Tetany / Hypomagnesemia)",
      nameEn: "Hypomagnesemic Tetany (Grass Tetany)",
      category: "METABOLIC",
      cardinalSign: "EXCITEMENT_CONVULSIONS",
      temp: "NORMAL",
      affectedSpecies: ["उच्च दुग्ध उत्पादक गायें", "भैंस", "भेड़"],
      pathogen: "रक्त में मैग्नीशियम का स्तर 1.0 mg/dl से कम होना (पोषण मेटाबोलिक विकार)",
      organSystem: "Neuromuscular Transmission",
      transmission: "असंक्रामक; अत्यधिक पोटाश/नाइट्रोजन युक्त हरी नई घास चरना (जो मैग्नीशियम अवशोषण रोकती है)",
      symptoms: [
        "पशु का अचानक अत्यधिक उत्तेजित, आक्रामक व बेचैन हो जाना (Madness)",
        "सिर व कान सीधे खड़े रहना, आंखों की पुतलियों का तेजी से फड़कना",
        "चलते समय अत्यधिक लड़खड़ाहट, ठोकर खाना और अचानक गिर पड़ना",
        "जमीन पर गिरकर पूरे शरीर में भयंकर झटके (दौरे/Convulsions) आना",
        "दांत किटकिटाना, मुंह से झाग निकलना, दिल की अत्यंत तेज धड़कन व मृत्यु"
      ],
      stages: {
        stage1: "उत्तेजना, सतर्क कान, आंखें चौड़ी, हल्का कांपना, चारा छोड़ना।",
        stage2: "लड़खड़ाती चाल, मांसपेशियों में अकड़न, छूने पर चौंकना।",
        stage3: "जमीन पर गिरना, टेटेनिक दौरे, सिर पीछे खिंचना, पैडलिंग।",
        stage4: "श्वसन अवरोध, दिल की धड़कन 150+, कोमा एवं 1-2 घंटे में पतन।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: उत्तेजित पशु को बिल्कुल न छेड़ें और न ही शोर मचाएं, हल्की सी आवाज़ से भी दौरे पड़ सकते हैं। 100 ग्राम मैग्नीशियम सल्फेट (Epsom Salt / सेंधा नमक) 500 मिली पानी में घोलकर नाल से धीरे-धीरे पिलाएं। नई हरी घास चरना तुरंत बंद कराएं और सूखा भूसा दें। तुरंत डॉक्टर से मैग्नीशियम ड्रिप लगवाएं।",
      clinicalRx: {
        tier1: "Inj. Mifex / Calborol with Magnesium (Calcium Borogluconate + Magnesium hypophosphite) 400 ml (200 ml Slow IV + 200 ml SC)",
        tier2: "Magnesium Sulfate 20% solution 150-200 ml Subcutaneous Only (हृदय की सुरक्षा हेतु SC मार्ग सर्वोत्तम)",
        tier3: "Inj. Diazepam (Calmpose) 0.5 mg/kg IV अथवा Xylazine (दौरे तुरंत शांत करने हेतु)",
        tier4: "Inj. Tonophosphan 10 ml IM + Inj. Tribivet 10 ml IM",
        tier5: "दैनिक मैग्नीशियम ऑक्साइड (MgO) पाउडर 50 ग्राम दाने में मिलाकर 30 दिन दें"
      },
      pregnancySafetyNotes: "मैग्नीशियम IV देते समय हृदय की धड़कन निरंतर जांचें; अत्यधिक तेज गति से कार्डियक अरेस्ट हो सकता है।",
      withdrawalPeriod: "शून्य",
      prevention: "वसंत ऋतु में नई घास पर छोड़ने से पहले पशुओं को मैग्नीशियम युक्त मिनरल मिक्सचर दें।"
    },
    {
      id: "SIMPLE_INDIGESTION",
      nameHindi: "साधारण अपच / पेट जाम (Simple Indigestion / Rumen Atony)",
      nameEn: "Simple Indigestion",
      category: "METABOLIC",
      cardinalSign: "ANOREXIA_HARD_DUNG",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस", "भेड़", "बकरी"],
      pathogen: "रूमेन के माइक्रोफ्लोरा (सूक्ष्मजीवों) का संतुलन बिगड़ना, फफूंदयुक्त या अचानक बदला चारा",
      organSystem: "Digestive (Rumen & Reticulum)",
      transmission: "असंक्रामक; सड़ा-गला चारा, अत्यधिक सूखा भूसा खाना या पानी की कमी",
      symptoms: [
        "पशु का अचानक चारा-दाना खाने में भारी अरुचि (भूख बंद होना)",
        "जुगाली (Rumination) का बिल्कुल बंद होना या बहुत धीमी होना",
        "गोबर की मात्रा कम होना, गोबर अत्यंत सूखा, कड़ा, गांठदार व गहरे रंग का होना",
        "बाएं पेट की गति (Rumen Motility) 2 मिनट में 0 से 1 बार होना (सामान्य: 3 बार)",
        "दूध उत्पादन में 20 से 40% की गिरावट, किंतु कोई बुखार न होना"
      ],
      stages: {
        stage1: "दाना छोड़ना, केवल थोड़ा हरा चारा खाना, सुस्ती।",
        stage2: "जुगाली पूर्णतः बंद, गोबर सूखा व चिकनी झिल्लीदार, रूमेन सुस्त।",
        stage3: "पेट हल्का सा फूलना, आंतों में आवाजें न आना, दूध में गिरावट।",
        stage4: "पुनर्प्राप्ति (उपचार से 24-48 घंटे में) अथवा क्रॉनिक अपच में बदलना।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: 50 ग्राम अजवाइन + 50 ग्राम सौंफ + 25 ग्राम सोंठ + 25 ग्राम काला नमक + 100 ग्राम गुड़ कूटकर दिन में 2 बार खिलाएं। 500 ग्राम स्वस्थ गाय का ताजा गोबर या जुगाली का झाग (Rumen Liquor Cud) 1 लीटर गुनगुने पानी में घोलकर छानें और बीमार पशु को पिलाएं (यह स्वस्थ रूमेन बैक्टीरिया तुरंत स्थापित करता है)। 250 ग्राम सरसों का तेल दें।",
      clinicalRx: {
        tier1: "Rumenotorics & Ecbolics: Inj. Neostigmine Methylsulfate 2.5-5 mg SC अथवा Inj. Tonophosphan 10 ml IM",
        tier2: "Himalayan Batisa / Ruchamax powder 50 ग्राम दिन में दो बार गुड़ में",
        tier3: "Inj. Belamyl (B-Complex with Liver Extract) 10-15 ml IM (भूख व यकृत उत्तेजना हेतु)",
        tier4: "Live Yeast Culture bolus (Bioboost / Yea-Sacc) 2-2 बोलस सुबह-शाम 3 दिन",
        tier5: "Magnesium Sulfate (सेंधा नमक) 200 ग्राम + Sodium Bicarbonate 50 ग्राम ओरल पानी में"
      },
      pregnancySafetyNotes: "नियोस्टिग्माइन की अत्यधिक खुराक गर्भाशय संकुचन करा सकती है; अतः गाभिन पशुओं में केवल हर्बल पाचक चूर्ण व बी-कॉम्प्लेक्स दें।",
      withdrawalPeriod: "शून्य",
      prevention: "पशु आहार में अचानक बदलाव न करें; फफूंदयुक्त या सड़ा चारा कभी न खिलाएं।"
    },
    {
      id: "CORNEAL_OPACITY",
      nameHindi: "कॉर्नियल ओपेसिटी / आंख की पुतली का सफेद होना",
      nameEn: "Bovine Corneal Opacity",
      category: "BACTERIAL",
      cardinalSign: "CORNEAL_CLOUDING",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस"],
      pathogen: "Moraxella bovis, Theileria annulata का परिणाम अथवा चोट/खरोंच",
      organSystem: "Ophthalmic (Corneal Stroma)",
      transmission: "मक्खियां, धूल, काश/सरकंडे की खरोंच अथवा रक्त परजीवी संक्रमण के बाद",
      symptoms: [
        "आंख की पारदर्शी पुतली (Cornea) का दूधिया सफेद, नीला अथवा अपारदर्शी हो जाना",
        "आंख से निरंतर पानी बहना, पलकों का सूज जाना व रोशनी से बचना",
        "आंख के केंद्र में छोटा गड्ढा (Ulcer) अथवा खून की बारीक नसों का जाल उभरना",
        "एक या दोनों आंखों से दिखाई न देना, ठोकरें खाना",
        "उचित समय पर इलाज न मिलने पर स्थायी मोतिया अथवा आंख का फूटना"
      ],
      stages: {
        stage1: "आंख में चोट या लाली, लगातार पानी गिरना, पलकें भींचना।",
        stage2: "पुतली पर नीली-सफेद धुंध छाना, कॉर्नियल शोफ।",
        stage3: "पूरी पुतली का संगमरमर जैसा सफेद होना, अंधापन।",
        stage4: "घाव भरना (Scar tissue) अथवा कॉर्नियल छिद्रण।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: आंख को दिन में 3 बार गुनगुने बोरिक एसिड (2%) के पानी से साफ करें। आंख में कभी भी नमक, फिटकरी, मिर्च या मिट्टी का तेल न डालें, इससे आंख तुरंत फूट जाती है। शुद्ध शहद 1 बूंद सलाई से दिन में 2 बार आंख के कोने में लगाएं। पशु को बिल्कुल छांव में रखें और आंखों पर सीधी धूप न पड़ने दें।",
      clinicalRx: {
        tier1: "Subconjunctival Injection: Inj. Gentamicin (40 mg) + Inj. Dexamethasone (1 mg) 1 ml ऊपरी कंजंक्टाइवा के नीचे (अचूक परिणाम)",
        tier2: "Moxifloxacin 0.5% Eye Drops दिन में 4 से 6 बार लगातार 7 दिन",
        tier3: "Inj. Melonex Plus 10-15 ml IM (दर्द व आंख की लाली निवारण)",
        tier4: "Inj. Intavita H (Vitamin A) 5 ml IM (कॉर्नियल उपकला के तीव्र पुनर्निर्माण हेतु)",
        tier5: "Inj. Placentrex 2-4 ml Subconjunctival / IM (पुराने जाले को गलाने हेतु)"
      },
      pregnancySafetyNotes: "सब-कंजंक्टाइवल मार्ग से दी गई डेक्सामेथासोन की अत्यंत सूक्ष्म मात्रा गर्भपात नहीं कराती; सुरक्षित है।",
      withdrawalPeriod: "शून्य",
      prevention: "बाड़े में मक्खी नियंत्रण रखें; चारे के नुकीले तिनकों से आंखों की रक्षा करें।"
    },
    {
      id: "FOOT_ABSCESS",
      nameHindi: "खुर का फोड़ा / इंटरडिजिटल फाइब्रोमा (Foot Abscess / Interdigital Fibroma)",
      nameEn: "Foot Abscess & Interdigital Hyperplasia",
      category: "BACTERIAL",
      cardinalSign: "FOOT_ABSCESS_LAMENESS",
      temp: "NORMAL",
      affectedSpecies: ["गाय", "भैंस"],
      pathogen: "Trueperella pyogenes, Fusobacterium necrophorum",
      organSystem: "Musculoskeletal & Podal Tissues",
      transmission: "खुर के तलवे में कंकड़, कील धंसना अथवा अत्यधिक गीले फर्श से दरारें",
      symptoms: [
        "पशु का गंभीर रूप से लंगड़ाना, प्रभावित पैर को बिल्कुल जमीन पर न टेकना",
        "खुर के पोरों के बीच अथवा एड़ी (Heel bulb) पर अत्यधिक गर्म, दर्दनाक उभार",
        "खुर की खुरचनी (Hoof tester) से दबाने पर एक निश्चित बिंदु पर अत्यधिक छटपटाना",
        "फोड़ा पकने पर कोरोनरी बैंड या तलवे से गाढ़ा, बदबूदार सफेद-पीला मवाद रिसना",
        "दर्द के मारे खड़े न होना, दूध गिरना व चारा कम खाना"
      ],
      stages: {
        stage1: "खुर में कंकड़ धंसना, हल्का लंगड़ापन, तलवे में गर्माहट।",
        stage2: "खुर के भीतर मवाद का संचय, अत्यधिक दर्द, पैर हवा में उठाना।",
        stage3: "फोड़े का मुंह बनना, कोरोनरी बैंड से मवाद का फटना।",
        stage4: "गहरे स्नायु में संक्रमण (Deep Sepsis) अथवा खुर का विकृत होना।"
      },
      farmerRemedies: "देसी प्राथमिक उपचार: खुर को अच्छी तरह धोकर तलवे में फंसे कंकड़, कील या तार की जांच करें। 1 बाल्टी गुनगुने गर्म पानी में 100 ग्राम मैग्नीशियम सल्फेट (सेंधा नमक) घोलें और खुर को उसमें 15 मिनट डुबोकर रखें (यह सूजन खींचता है और फोड़ा पकाता है)। फोड़े का मुंह खुलने पर नीम-कपूर का तेल लगाकर पट्टी बांधें। पशु को सूखे फर्श पर रखें।",
      clinicalRx: {
        tier1: "सर्जिकल ड्रेनेज: खुर के तलवे के काले बिंदु को हुफ नाइफ से सावधानीपूर्वक तराश कर मवाद की निकासी (तुरंत दर्द से मुक्ति)",
        tier2: "Inj. Ceftriaxone 3g IM अथवा Inj. Amoxicillin-Sulbactam 4.5g IM 3-5 दिन",
        tier3: "Inj. Melonex Plus 15-20 ml IM",
        tier4: "कैविटी के भीतर टिंचर आयोडीन व कॉटन की टाइट ड्रेसिंग (Bandage)",
        tier5: "Inj. Tetanus Toxoid 5 ml IM (कील जनित टिटनेस से बचाव हेतु)"
      },
      pregnancySafetyNotes: "सेफ्ट्रिआक्सोन व मेलोक्सीकैम पूर्णतः सुरक्षित हैं। टिटनेस का टीका अवश्य लगाएं।",
      withdrawalPeriod: "दूध: 4 दिन, मांस: 14 दिन",
      prevention: "बाड़े के रास्तों से नुकीले पत्थर व कीलें हटाएं; खुरों की नियमित ट्रिमिंग कराएं।"
    }
  ];

  /* =========================================================================
     7. EXPORT ARCHITECTURE TO GLOBAL WINDOW SCOPE
     Production Validation, Cross-Module Integrity & Immutability Protection
     ========================================================================= */
  if (typeof root !== "undefined") {
    root.VETCARE_VACCINATION_DB = Object.freeze(VACCINATION_DB);
    root.VETCARE_MEDICINES_DB = Object.freeze(MEDICINES_DB);
    root.VETCARE_SYMPTOMS_BY_ORGAN = Object.freeze(SYMPTOMS_BY_ORGAN);
    root.VETCARE_FARMER_ORGAN_REMEDIES = Object.freeze(FARMER_ORGAN_REMEDIES);
    root.VETCARE_BREEDING_DATA = Object.freeze(BREEDING_DATA);
    root.VETCARE_MILK_BOOSTER_DATA = Object.freeze(MILK_BOOSTER_DATA);
    root.VETCARE_DISEASE_DB = Object.freeze(DISEASE_DB);
  }

})(typeof window !== "undefined" ? window : global);
