// Vetcare AI OS - Master Database (2026 Production)
// Principal Veterinary Pharmacologist & Database Architect Grade
// Evidence-Based Veterinary Clinical Database & Pharmacopeia

(function (root) {
  "use strict";

  /* =========================================================================
     1. COMPREHENSIVE VETERINARY DRUGS PHARMACOPEIA (dual pricing, 35+ core drugs)
     ========================================================================= */
  const MEDICINES_DB = [
    {
      id: "med_ceftiofur_1g",
      salt: "Ceftiofur Sodium Sterile Powder 1g",
      category: "Antibiotic",
      ethicalBrand: { name: "Xyrofur 1g / Naxcel", company: "Intas / Zoetis", approxMrp: 460 },
      genericOption: { name: "Ceftiofur Sodium Inj 1g (KVS/Vet Generic)", approxMrp: 185 },
      doseRate: "1.1 to 2.2 mg/kg body weight, SID for 3 to 5 days",
      route: "Intramuscular (I/M) / Subcutaneous (S/C)",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 0 hours, Meat: 4 days",
      indications: "तीव्र गलघोंटू (HS), ब्रोंकोप्यूमोनिया, प्रसवोत्तर तीव्र मेट्राइटिस एवं एक्यूट इंटरडिजिटल नेक्रोबैसिलोसिस (खुर सड़न)।",
      contraindications: "सेफालोस्पोरिन या बीटा-लैक्टम प्रतिसंवेदनशील पशुओं में वर्जित।"
    },
    {
      id: "med_enrofloxacin_100ml",
      salt: "Enrofloxacin Injection 100 mg/ml (10%)",
      category: "Antibiotic",
      ethicalBrand: { name: "Baytril 10% / Fortivir", company: "Bayer / Virbac", approxMrp: 380 },
      genericOption: { name: "Enrocin / Enro Vet 100ml", approxMrp: 160 },
      doseRate: "5 mg/kg body weight (5 ml प्रति 100 kg वजन), SID 3-5 दिन",
      route: "Deep Intramuscular (I/M) / Slow I/V",
      pregnancySafe: false,
      withdrawalPeriod: "Milk: 7 days (84 hours), Meat: 14 days",
      indications: "गंभीर थनैला (Coliform Mastitis), एंटेराइटिस, बछड़ों में निमोनिया एवं सेकेंडरी बैक्टीरियल संक्रमण।",
      contraindications: "गर्भावस्था की पहली तिमाही में अत्यधिक प्रयोग से बचें; बढ़ते नवजात बछड़ों में आर्टिकुलर कार्टिलेज विकृति की संभावना।"
    },
    {
      id: "med_ceftriaxone_tazo_4500",
      salt: "Ceftriaxone Sodium + Tazobactam Sodium (3000 mg + 500 mg / 4000 mg + 500 mg)",
      category: "Antibiotic",
      ethicalBrand: { name: "Intacef Tazo 4.5g", company: "Intas Pharmaceuticals", approxMrp: 495 },
      genericOption: { name: "Cef-Tazo Vet 4.5g (Generic)", approxMrp: 210 },
      doseRate: "10 mg/kg body weight (Ceftriaxone घटक अनुसार) प्रत्येक 24 घंटे",
      route: "Intramuscular (I/M) / Intravenous (I/V)",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 3 days, Meat: 7 days",
      indications: "जटिल थनैला (Acute Clinical Mastitis), ब्रोंकोप्यूमोनिया, पाइमेट्रा, गंभीर पेरिटोनिटिस व सेप्टीसीमिया।",
      contraindications: "गंभीर वृक्क विफलता (Severe Renal Failure) में डोज़ दर समायोजित करें।"
    },
    {
      id: "med_amoxicillin_sulbactam_4500",
      salt: "Amoxicillin Sodium + Sulbactam Sodium 4.5g (3000 mg + 1500 mg)",
      category: "Antibiotic",
      ethicalBrand: { name: "Amoxirum Forte 4.5g", company: "Virbac Animal Health", approxMrp: 430 },
      genericOption: { name: "Moxvet-S 4.5g (Generic)", approxMrp: 175 },
      doseRate: "7-10 mg/kg body weight, SID/BID 3 दिन",
      route: "Intramuscular (I/M) / Intravenous (I/V)",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 60 hours, Meat: 8 days",
      indications: "लंगड़ा बुखार (BQ), गलघोंटू, घाव संक्रमण, यूटराइन इन्फेक्शन व प्रसव उपरांत सेप्सिस।",
      contraindications: "पेनिसिलिन से अतिसंवेदनशील पशुओं में एनाफिलेक्सिस का जोखिम।"
    },
    {
      id: "med_oxytetracycline_la",
      salt: "Oxytetracycline 2-Pyrrolidone formulation 200 mg/ml (Long Acting)",
      category: "Antibiotic",
      ethicalBrand: { name: "Terramycin / Oxy-LA 100ml", company: "Zoetis / Zydus", approxMrp: 310 },
      genericOption: { name: "Oxytetracycline LA 100ml (Jan Aushadhi Vet)", approxMrp: 130 },
      doseRate: "20 mg/kg body weight (1 ml प्रति 10 kg) एकल खुराक, 72 घंटे प्रभाव",
      route: "Deep Intramuscular (एक स्थान पर 10-15 ml से अधिक न लगाएं)",
      pregnancySafe: false,
      withdrawalPeriod: "Milk: 7 days, Meat: 21 days",
      indications: "एनाप्लास्मोसिस, थायलेरियासिस (द्वितीयक), संक्रामक केराटाइटिस (Pink Eye), काउपॉक्स व फुट-रॉट।",
      contraindications: "अंतिम गर्भावस्था में दांतों/हड्डियों के विरुपण का खतरा; तीव्र हेपेटिक या रीनल रोग।"
    },
    {
      id: "med_procaine_penicillin",
      salt: "Procaine Penicillin G 20,00,000 IU + Penicillin G Sodium 20,00,000 IU (Fortified)",
      category: "Antibiotic",
      ethicalBrand: { name: "Pronapen / Bistrepen 40 Lac", company: "Pfizer / Zydus", approxMrp: 85 },
      genericOption: { name: "Fortified Procaine Penicillin 40L", approxMrp: 38 },
      doseRate: "10,000 to 20,000 IU/kg body weight, SID 3-5 दिन",
      route: "Strictly Deep Intramuscular (I/M)",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 3 days, Meat: 5 days",
      indications: "लंगड़ा बुखार (Black Quarter - BQ), टेटनस प्रोफाइलैक्सिस, स्ट्रेप्टोकोकल थनैला व नेक्रोटिक घाव।",
      contraindications: "कदापि शिरा मार्ग (I/V) से न दें। पेनिसिलिन एलर्जी।"
    },
    {
      id: "med_gentamicin_100ml",
      salt: "Gentamicin Sulphate Injection 40 mg/ml or 100 mg/ml",
      category: "Antibiotic",
      ethicalBrand: { name: "Gentacin / Garasent 100ml", company: "Virbac / MSD", approxMrp: 125 },
      genericOption: { name: "Gentamicin Inj 100ml (Generic)", approxMrp: 55 },
      doseRate: "4-5 mg/kg body weight, SID या विभाजित खुराकों में",
      route: "Intramuscular (I/M) / Slow I/V / Intrauterine",
      pregnancySafe: false,
      withdrawalPeriod: "Milk: 4 days, Meat: 30 days",
      indications: "ग्राम-नेगेटिव एंटरिक संक्रमण, एस्चेरिचिया कोलाई सेप्टीसीमिया, मेट्राइटिस (इंट्रा-यूटराइन)।",
      contraindications: "नेफ्रोटॉक्सिक व ओटोटॉक्सिक; निर्जलित पशुओं (Dehydration) में पूर्णतः वर्जित।"
    },
    {
      id: "med_meloxicam_paracetamol",
      salt: "Meloxicam (5 mg/ml) + Paracetamol (150 mg/ml) Injection",
      category: "NSAID",
      ethicalBrand: { name: "Melonex Plus 100ml", company: "Intas Pharmaceuticals", approxMrp: 215 },
      genericOption: { name: "Melox-P Vet 100ml (Generic)", approxMrp: 95 },
      doseRate: "0.5 mg/kg Meloxicam (15-20 ml प्रति 350-400 kg गाय/भैंस)",
      route: "Deep Intramuscular (I/M)",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 2 days, Meat: 5 days",
      indications: "तीव्र ज्वर (104-106°F), थनैला की सूजन, लंगड़ापन, चोट, मस्कुलोस्केलेटल दर्द व प्रसव उपरांत दर्द।",
      contraindications: "गैस्ट्रिक अल्सर, निर्जलीकरण, हाइपोवोल्मिया या रीनल इनसफिशिएंसी।"
    },
    {
      id: "med_flunixin_meglumine",
      salt: "Flunixin Meglumine Injection 50 mg/ml",
      category: "NSAID",
      ethicalBrand: { name: "Megludyne / Finadyne 100ml", company: "Virbac / MSD Animal Health", approxMrp: 540 },
      genericOption: { name: "Flunixin Vet 100ml", approxMrp: 240 },
      doseRate: "1.1 to 2.2 mg/kg body weight (2 ml प्रति 45 kg), SID 1-3 दिन",
      route: "Intravenous (I/V Preferable) / Intramuscular (I/M)",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 36 hours, Meat: 4 days",
      indications: "एंडोटॉक्सिक शॉक, तीव्र पेट दर्द (Colic), एक्यूट पल्मोनरी सिंड्रोम, टॉक्सिक थनैला।",
      contraindications: "इंट्रा-आर्टेरियल इंजेक्शन कदापि न दें; नेफ्रोटॉक्सिसिटी के कारण डिहाइड्रेटेड पशुओं में सावधानी।"
    },
    {
      id: "med_ketoprofen_100ml",
      salt: "Ketoprofen Injection 100 mg/ml (10%)",
      category: "NSAID",
      ethicalBrand: { name: "Ketovet / Ketofen 100ml", company: "Merial / Boehringer", approxMrp: 320 },
      genericOption: { name: "Ketoprofen Inj 100ml (Generic)", approxMrp: 140 },
      doseRate: "3 mg/kg body weight (1 ml प्रति 33 kg वजन) SID 3 दिन",
      route: "Intramuscular (I/M) / Intravenous (I/V)",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 0 hours, Meat: 4 days",
      indications: "ब्याने के तुरंत बाद का प्रसव दर्द, अर्थराइटिस, सूजन, सुरक्षित एंटीपायरेटिक।",
      contraindications: "सक्रिय गैस्ट्रोइंटेस्टाइनल रक्तस्राव एवं थक्कारोधी दवाओं के साथ उपयोग न करें।"
    },
    {
      id: "med_tolfenamic_acid",
      salt: "Tolfenamic Acid Injection 40 mg/ml or 80 mg/ml",
      category: "NSAID",
      ethicalBrand: { name: "Maxxtol 100ml", company: "Ceva / Intas", approxMrp: 440 },
      genericOption: { name: "Tolfa Vet 100ml", approxMrp: 195 },
      doseRate: "2 mg/kg body weight (1 ml/20kg for 4% solution) रिपीट 48 घंटे बाद",
      route: "Deep Intramuscular (I/M) / Slow I/V",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 24 hours, Meat: 7 days",
      indications: "तीव्र रेस्पिरेटरी डिसीज (BRD), एक्यूट मास्टाइटिस में सूजन एवं प्रोस्टाग्लैंडीन अवरोधन।",
      contraindications: "कार्डियक, हेपेटिक या रीनल डैमेज वाले पशुओं में प्रतिबंधित।"
    },
    {
      id: "med_diminazene_aceturate",
      salt: "Diminazene Aceturate (70 mg/ml) + Phenazone / Antipyrine (375 mg/ml)",
      category: "Antiprotozoal",
      ethicalBrand: { name: "Berenil RTU 30ml / 90ml", company: "MSD Animal Health", approxMrp: 290 },
      genericOption: { name: "Diminazene Inj 30ml (Generic)", approxMrp: 120 },
      doseRate: "3.5 mg/kg body weight (1 ml प्रति 20 kg); ट्रिपैनोसोमा में 7 mg/kg तक",
      route: "Deep Intramuscular (I/M strictly, gluteal region)",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 3 days, Meat: 21 days",
      indications: "बबेशियोसिस (Babesiosis / लाल पेशाब) एवं सर्रा रोग (Trypanosomiasis)।",
      contraindications: "ओवरडोज से सीएनएस विषाक्तता (अटेक्सिया, कंपकंपी) हो सकती है; ऊंटों में संवेदनशीलता।"
    },
    {
      id: "med_buparvaquone",
      salt: "Buparvaquone Injection 50 mg/ml",
      category: "Antiprotozoal",
      ethicalBrand: { name: "Butalex 20ml / Zubion", company: "Virbac / Intas", approxMrp: 1450 },
      genericOption: { name: "Buparva Vet 20ml (Generic)", approxMrp: 680 },
      doseRate: "2.5 mg/kg body weight (1 ml प्रति 20 kg शरीर भार), एकल खुराक",
      route: "Strictly Deep Intramuscular in neck muscles",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 48 hours, Meat: 42 days",
      indications: "थायलेरियासिस (Theileria annulata - पूर्वी तटीय बुखार / टिक्स जनित रोग)।",
      contraindications: "शिरा मार्ग (I/V) या त्वचा के नीचे (S/C) कदापि न दें; एक जगह 10 ml से अधिक न लगाएं।"
    },
    {
      id: "med_quinapyramine_salts",
      salt: "Quinapyramine Sulphate + Methylsulphate (Triquin Powder)",
      category: "Antiprotozoal",
      ethicalBrand: { name: "Triquin 2.5g / Antrycide Pro-salt", company: "MSD / Virbac", approxMrp: 240 },
      genericOption: { name: "Quina-S Vet 2.5g", approxMrp: 95 },
      doseRate: "Curative: 3 to 5 mg/kg; 2.5g vial dissolved in 15 ml sterile water (1 ml per 30-40 kg)",
      route: "Subcutaneous (S/C) exclusively",
      pregnancySafe: false,
      withdrawalPeriod: "Meat: 21 days, Milk: 5 days",
      indications: "सर्रा रोग (Trypanosoma evansi - Surra) का पूर्ण उन्मूलन एवं रोगनिरोधक सुरक्षा।",
      contraindications: "इंट्रावीनस कदापि न लगाएं। अतिसंवेदनशीलता, कंपकंपी या गिरना हो सकता है।"
    },
    {
      id: "med_buserelin_acetate",
      salt: "Buserelin Acetate Injection 0.0042 mg/ml (GnRH Analogue)",
      category: "Hormone",
      ethicalBrand: { name: "Gynarich 5ml / Receptal", company: "Intas / MSD Animal Health", approxMrp: 280 },
      genericOption: { name: "Buserelin Vet 5ml", approxMrp: 130 },
      doseRate: "गाय/भैंस: 2.5 से 5 ml (10-20 mcg); ए.आई. के समय अथवा पुटीय अंडाशय (Cystic Ovary) में",
      route: "Intramuscular (I/M) / Intravenous",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: Nil, Meat: Nil",
      indications: "ओव्यूलेशन प्रेरण, डिंबग्रंथि पुटी (Follicular Cyst), विलंबित ओव्यूलेशन, रिपीट ब्रीडर सिंड्रोम।",
      contraindications: "संक्रमित गर्भाशय (Pyometra) में जब तक मवाद न निकले तब तक ओव्यूलेशन उत्प्रेरण न करें।"
    },
    {
      id: "med_cloprostenol_sodium",
      salt: "Cloprostenol Sodium Injection 250 mcg/ml (PGF2-alpha Analogue)",
      category: "Hormone",
      ethicalBrand: { name: "Pragma 2ml / Lutalyse / Iliren", company: "Intas / Zoetis", approxMrp: 210 },
      genericOption: { name: "Cloprostenol Vet 2ml", approxMrp: 90 },
      doseRate: "500 mcg (2 ml) एकल खुराक",
      route: "Intramuscular (I/M)",
      pregnancySafe: false,
      withdrawalPeriod: "Milk: Nil, Meat: 24 hours",
      indications: "मद चक्र समकालन (Estrus Synchronization), ममीकृत भ्रूण निष्कासन, ल्यूटियल सिस्ट, पाइमेट्रा निकासी।",
      contraindications: "गाभिन पशुओं में पूर्णतः वर्जित (गर्भपात कारक); अस्थमा पीड़ित ऑपरेटर सावधानी से बरतें।"
    },
    {
      id: "med_hydroxyprogesterone",
      salt: "Hydroxyprogesterone Caproate Injection 250 mg/ml or 750 mg/3ml",
      category: "Hormone",
      ethicalBrand: { name: "Proluton Depot / Duraprogen", company: "Zydus / Cadila", approxMrp: 260 },
      genericOption: { name: "Prog-Caproate 3ml", approxMrp: 110 },
      doseRate: "250 से 500 mg I/M प्रत्येक 7 से 10 दिन पर गर्भ सुरक्षा हेतु",
      route: "Deep Intramuscular (I/M)",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: Nil, Meat: 48 hours",
      indications: "आदतन गर्भपात (Habitual Abortion), गर्भाशय ग्रीवा दुर्बलता, प्रारंभिक भ्रूण मृत्यु से बचाव।",
      contraindications: "प्रसव प्रारंभ होने के समय या मृत भ्रूण उपस्थिति में न दें।"
    },
    {
      id: "med_calcium_borogluconate_cbg",
      salt: "Calcium Borogluconate 25% + Magnesium & Phosphorus (Mifex Formulation)",
      category: "Metabolic & Calcium",
      ethicalBrand: { name: "Mifex 450ml / Calborol", company: "Novartis / Elanco", approxMrp: 295 },
      genericOption: { name: "CBG with Mg & P 450ml", approxMrp: 140 },
      doseRate: "250 से 450 ml; 2/3 भाग धीमी गति से I/V + 1/3 भाग S/C",
      route: "Intravenous (Slow I/V warmed to body temp) & Subcutaneous",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: Nil, Meat: Nil",
      indications: "मिल्क फीवर (Hypocalcemia), एक्लम्पसिया, डाउपर काउ सिंड्रोम, प्रसव उपरांत दुर्बलता।",
      contraindications: "तीव्र गति से शिरा में चढ़ाने पर कार्डियक अरेस्ट (Cardiac Arrest) की संभावना; ऑस्कल्टेशन अनिवार्य।"
    },
    {
      id: "med_toldimphos_sodium",
      salt: "Toldimphos Sodium 200 mg/ml Injection (Organic Phosphorus)",
      category: "Metabolic & Calcium",
      ethicalBrand: { name: "Tonophosphan 30ml", company: "Intervet / MSD Animal Health", approxMrp: 220 },
      genericOption: { name: "Phospho-Vet 30ml (Generic)", approxMrp: 90 },
      doseRate: "10 ml प्रति 300-400 kg शरीर भार, I/M या धीमी I/V, 3-5 दिन",
      route: "Intramuscular (I/M) / Slow I/V / Subcutaneous",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: Nil, Meat: Nil",
      indications: "पोस्ट-पार्टुरिएंट हीमोग्लोबिन्यूरिया (PPH), रिपीट ब्रीडिंग, रिकेट्स, मेटाबोलिक दुर्बलता।",
      contraindications: "हाइपरफॉस्फेटेमिया में वर्जित।"
    },
    {
      id: "med_tribivet_b_complex",
      salt: "Vitamin B1 (Thiamine 33.3mg) + B6 (Pyridoxine 16.6mg) + B12 (Cyanocobalamin 83.3mcg) per ml",
      category: "Supportive & Fluids",
      ethicalBrand: { name: "Tribivet 100ml", company: "Intas Pharmaceuticals", approxMrp: 185 },
      genericOption: { name: "Neuro-B Vet 100ml", approxMrp: 80 },
      doseRate: "10 ml बड़े पशुओं में, 3-5 ml छोटे पशुओं में, दैनिक 3-5 दिन",
      route: "Intramuscular (I/M) / Slow I/V",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: Nil, Meat: Nil",
      indications: "पोलियोएन्सेफेलोमलेशिया (PEM), नर्वस विकार, सर्रा, कीटोसिस एवं रूमेन अक्रियता।",
      contraindications: "विशिष्ट प्रतिषेध नहीं; अनुशंसित मात्रा में पूर्णतः सुरक्षित।"
    },
    {
      id: "med_belamyl_liver_extract",
      salt: "Highly Purified Liver Extract + Vitamin B-Complex with Choline Chloride",
      category: "Supportive & Fluids",
      ethicalBrand: { name: "Belamyl 100ml", company: "Zydus AH", approxMrp: 190 },
      genericOption: { name: "Liv-Vet Complex 100ml", approxMrp: 85 },
      doseRate: "5 to 10 ml I/M वैकल्पिक दिनों में",
      route: "Deep Intramuscular (I/M) strictly",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: Nil, Meat: Nil",
      indications: "हेपेटाइटिस, भूख न लगना (Off-feed), डिबिल्टी, एनीमिया, दीर्घावधि एंटीबायोटिक उपचार के बाद।",
      contraindications: "कदापि शिरा मार्ग (I/V) से न दें।"
    },
    {
      id: "med_dextrose_25_500ml",
      salt: "Dextrose Anhydrous 25% w/v Hypertonic Solution",
      category: "Supportive & Fluids",
      ethicalBrand: { name: "Dextrose 25% 500ml Vet", company: "Claris / Wockhardt", approxMrp: 65 },
      genericOption: { name: "D25 Infusion 500ml", approxMrp: 32 },
      doseRate: "500 से 1000 ml I/V आवश्यकतानुसार",
      route: "Intravenous (I/V) under aseptic condition",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: Nil, Meat: Nil",
      indications: "कीटोसिस (Ketosis), हाइपोग्लाइसीमिया, तीव्र कमजोरी, हेपेटिक ग्लाइकोजन क्षरण।",
      contraindications: "गंभीर डिहाइड्रेशन जिसमें इलेक्ट्रोलाइट लॉस हो (पहले आइसोटोनिक फ्लूइड दें)।"
    },
    {
      id: "med_ringers_lactate_rl",
      salt: "Compound Sodium Lactate Injection (Ringer's Lactate) IP",
      category: "Supportive & Fluids",
      ethicalBrand: { name: "RL Vet Infusion 1000ml", company: "Baxter / Parenteral Drugs", approxMrp: 85 },
      genericOption: { name: "RL Infusion 1000ml (Generic)", approxMrp: 40 },
      doseRate: "10 से 20 ml/kg body weight (2 से 5 लीटर तीव्र डिहाइड्रेशन में)",
      route: "Intravenous (I/V) Infusion",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: Nil, Meat: Nil",
      indications: "अतिसार (Diarrhea), डिहाइड्रेशन, लैक्टिक एसिडोसिस रहित हाइपोवोल्मिया, शॉक, टॉक्सिमिया।",
      contraindications: "गंभीर रूमेन लैक्टिक एसिडोसिस में सोडियम बाइकार्बोनेट युक्त तरल प्राथमिकता है।"
    },
    {
      id: "med_albendazole_susp",
      salt: "Albendazole Micronized Suspension 25 mg/ml (2.5%)",
      category: "Anthelmintic",
      ethicalBrand: { name: "Albomar 1000ml / Valbazen", company: "Virbac / Pfizer", approxMrp: 440 },
      genericOption: { name: "Alben-Vet 1000ml", approxMrp: 190 },
      doseRate: "Roundworms: 5-7.5 mg/kg (60-90 ml per 300kg); Liver Flukes: 10 mg/kg (120 ml per 300kg)",
      route: "Oral Drench",
      pregnancySafe: false,
      withdrawalPeriod: "Milk: 3 days, Meat: 14 days",
      indications: "पेट के कीड़े (Nematodes), फीताकृमि (Tapeworms) एवं वयस्क लिवर फ्लूक (Fasciola)।",
      contraindications: "गर्भावस्था के प्रथम 45 दिनों में भ्रूणीय विकृति (Teratogenic) के जोखिम हेतु वर्जित।"
    },
    {
      id: "med_fenbendazole_3000",
      salt: "Fenbendazole Bolus 3000 mg",
      category: "Anthelmintic",
      ethicalBrand: { name: "Panacur 3g", company: "MSD Animal Health", approxMrp: 95 },
      genericOption: { name: "Fen-Vet 3g Bolus", approxMrp: 42 },
      doseRate: "5 to 7.5 mg/kg body weight (1 बोलस प्रति 400-500 kg पशु)",
      route: "Oral Bolus",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: Nil (or 24 hrs), Meat: 8 days",
      indications: "गाभिन पशुओं में सुरक्षित कृमिनाशक; फेफड़ों के कीड़े, आंतों के गोलकृमि व सिस्ट।",
      contraindications: "अतिसंवेदनशीलता का अभाव; निर्धारित खुराक में अत्यंत सुरक्षित।"
    },
    {
      id: "med_ivermectin_inj",
      salt: "Ivermectin Injection 10 mg/ml (1% w/v)",
      category: "Anthelmintic",
      ethicalBrand: { name: "Hitek 10ml / Neomec 10ml", company: "Virbac / Intas", approxMrp: 135 },
      genericOption: { name: "Iver-Vet 1% 10ml", approxMrp: 55 },
      doseRate: "0.2 mg/kg body weight (1 ml प्रति 50 kg शरीर भार), एकल खुराक",
      route: "Strictly Subcutaneous (S/C)",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 28 days (दूधारू पशुओं में सावधानी), Meat: 28 days",
      indications: "अंतः व बाह्य परजीवी: जूं, चिचड़ी, खुरपका उपरांत मैगट घाव, आंतों के कीड़े।",
      contraindications: "कदापि शिरा या मांसपेशी मार्ग से न दें। लेक्टेटिंग पशुओं में जहां दूध मानव उपभोग में तुरंत जाए।"
    },
    {
      id: "med_levamisole_oxyclozanide",
      salt: "Levamisole HCl (1.5% or 3%) + Oxyclozanide (3% or 6%) Suspension",
      category: "Anthelmintic",
      ethicalBrand: { name: "Nilzan 1000ml", company: "Virbac Animal Health", approxMrp: 580 },
      genericOption: { name: "Oxy-Leva Vet 1000ml", approxMrp: 260 },
      doseRate: "Oxyclozanide 10-15 mg/kg + Levamisole 5-7.5 mg/kg (Approx 15-20 ml per 50 kg)",
      route: "Oral Drench",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 3 days, Meat: 14 days",
      indications: "लिवर फ्लूक (Fascioliasis), एम्फिस्टोमियासिस एवं फेफड़े तथा पेट के कीड़े।",
      contraindications: "अंगूर/ऑर्गेनोफॉस्फेट्स के साथ 14 दिन तक न दें; अतिसार पीड़ित पशु में इलेक्ट्रोलाइट्स दें।"
    },
    {
      id: "med_amitraz_liquid",
      salt: "Amitraz Liquid Solution 12.5% w/v E.C.",
      category: "Ectoparasiticide",
      ethicalBrand: { name: "Taktic 50ml / Ridmange", company: "MSD / Virbac", approxMrp: 195 },
      genericOption: { name: "Ami-Tick 50ml", approxMrp: 85 },
      doseRate: "2 to 4 ml प्रति 1 लीटर स्वच्छ पानी में घोलकर बाह्य छिड़काव/स्प्रे",
      route: "External Wash / Spray (Do not inject)",
      pregnancySafe: true,
      withdrawalPeriod: "Meat: 7 days, Milk: 48 hours",
      indications: "चिचड़ी (Ticks), जूं (Lice), मेंज (Mange - Sarcoptic/Psoroptic) का पूर्ण सफाया।",
      contraindications: "घोड़ों में पूर्णतः वर्जित (इम्पैक्शन कोलिक कारक); पशु को चाटने न दें जब तक सूख न जाए।"
    },
    {
      id: "med_deltamethrin_liquid",
      salt: "Deltamethrin Liquid 1.25% w/v",
      category: "Ectoparasiticide",
      ethicalBrand: { name: "Butox 50ml / 250ml", company: "MSD Animal Health", approxMrp: 145 },
      genericOption: { name: "Delta-Vet 50ml", approxMrp: 65 },
      doseRate: "2 ml प्रति 1 लीटर पानी में मिलाकर पशु आवास व शरीर पर छिड़काव",
      route: "Topical Bath / Spray",
      pregnancySafe: true,
      withdrawalPeriod: "Meat: 3 days, Milk: 24 hours",
      indications: "चिचड़ी, मक्खी, पिस्सू, जुएं नियंत्रण व बाह्य परजीवी रोगनिरोध।",
      contraindications: "मछली पालन तालाबों के निकट न बहाएं (मछलियों के लिए अत्यधिक विषैला)।"
    },
    {
      id: "med_himalayan_batisa",
      salt: "Herbal Rumenotoric, Carminative, Prebiotic Feed Supplement Formula",
      category: "Rumen Buffer & Digestive",
      ethicalBrand: { name: "Himalayan Batisa / Bioboost Bolus", company: "Indian Herbs / Zydus", approxMrp: 110 },
      genericOption: { name: "Rumen Booster Powder 100g", approxMrp: 45 },
      doseRate: "50-100 ग्राम गुड़ के साथ मिलाकर दिन में दो बार अथवा 2-4 बोलस प्रतिदिन",
      route: "Oral Electuary / Bolus",
      pregnancySafe: true,
      withdrawalPeriod: "Nil",
      indications: "एनोरेक्सिया (भूख न लगना), रूमेन अक्रियता, अपच, बदहजमी, जुगाली बंद होना।",
      contraindications: "गंभीर इसोफेजियल चोक में जब तक रुकावट दूर न हो।"
    },
    {
      id: "med_sodium_bicarbonate",
      salt: "Sodium Bicarbonate Powder IP (Rumen Buffer)",
      category: "Rumen Buffer & Digestive",
      ethicalBrand: { name: "Bufzone / Sodabicarb 500g", company: "Intas / Standard Pharma", approxMrp: 65 },
      genericOption: { name: "Meetha Soda IP 500g", approxMrp: 30 },
      doseRate: "50 से 100 ग्राम ओरल गुनगुने पानी में; गंभीर एसिडोसिस में 5% सॉल्यूशन I/V",
      route: "Oral Drench / Intravenous (as sterile infusion)",
      pregnancySafe: true,
      withdrawalPeriod: "Nil",
      indications: "रूमेन लैक्टिक एसिडोसिस (Grain Overload - दाना धप पड़ना), खट्टी डकारें, पीएच गिरना।",
      contraindications: "रूमेन एल्केलोसिस (यूरिया पॉइजनिंग) में पूर्णतः वर्जित।"
    },
    {
      id: "med_propylene_glycol",
      salt: "Propylene Glycol Liquid (Glucogenic Precursor)",
      category: "Metabolic & Calcium",
      ethicalBrand: { name: "Ketofast / Gluco-Vet 500ml", company: "Virbac / Zydus", approxMrp: 310 },
      genericOption: { name: "Propylene Glycol Tech 500ml", approxMrp: 140 },
      doseRate: "200 ml दिन में दो बार 2 दिन, फिर 100 ml दैनिक 3 दिन",
      route: "Oral Drench",
      pregnancySafe: true,
      withdrawalPeriod: "Nil",
      indications: "क्लिनिकल व सब-क्लिनिकल कीटोसिस, ग्लूकोज की कमी, ब्याने बाद ऊर्जा संकट।",
      contraindications: "फेफड़ों में जाने (Aspiration) से बचाएं; पशु की गर्दन स्वाभाविक स्थिति में रखकर पिलाएं।"
    },
    {
      id: "med_dicyclomine_spasmo",
      salt: "Dicyclomine Hydrochloride (10 mg/ml) + Pitofenone + Fenpiverinium",
      category: "NSAID",
      ethicalBrand: { name: "Spasmo-Vet 30ml / Baralgan", company: "Intas / Sanofi Vet", approxMrp: 110 },
      genericOption: { name: "Dicyclo-Vet 30ml", approxMrp: 48 },
      doseRate: "10 से 15 ml बड़े पशुओं में, 2-3 ml बछड़े/भेड़/बकरी में",
      route: "Intramuscular (I/M) strictly",
      pregnancySafe: true,
      withdrawalPeriod: "Meat: 3 days, Milk: 48 hours",
      indications: "पेट दर्द (Spasmodic Colic), आंतों में मरोड़, मूत्रमार्ग का संकुचन व डायरिया क्रैम्प्स।",
      contraindications: "रूमेनल एटोनी (Rumen Atony) व ग्लूकोमा में लंबे समय तक न दें।"
    },
    {
      id: "med_isoflupredone_acetate",
      salt: "Isoflupredone Acetate Sterile Suspension 2 mg/ml (Corticosteroid)",
      category: "Supportive & Fluids",
      ethicalBrand: { name: "Predef 2X 10ml / Vetacortyl", company: "Zoetis / Virbac", approxMrp: 165 },
      genericOption: { name: "Isoflu-Vet 10ml", approxMrp: 75 },
      doseRate: "10 से 20 mg (5 से 10 ml) एकल खुराक I/M",
      route: "Deep Intramuscular (I/M)",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 72 hours, Meat: 7 days",
      indications: "गाभिन पशुओं में सुरक्षित स्टेरॉयड; कीटोसिस, मस्कुलोस्केलेटल सूजन, एनाफिलेक्सिस।",
      contraindications: "अनियंत्रित बैक्टीरियल संक्रमण में बिना एंटीबायोटिक कवर के न दें।"
    },
    {
      id: "med_chlorpheniramine_maleate",
      salt: "Chlorpheniramine Maleate Injection 10 mg/ml (Antihistaminic)",
      category: "Supportive & Fluids",
      ethicalBrand: { name: "Avil 100ml / Zeet Vet", company: "Sanofi / Alembic", approxMrp: 130 },
      genericOption: { name: "CPM Vet 100ml", approxMrp: 55 },
      doseRate: "0.5 mg/kg body weight (10 ml प्रति बड़े पशु में), IM",
      route: "Intramuscular (I/M)",
      pregnancySafe: true,
      withdrawalPeriod: "Milk: 24 hours, Meat: 3 days",
      indications: "एलर्जिक प्रतिक्रियाएं, दवा रिएक्शन, कीड़े का काटना, पल्मोनरी एडिमा, थनैला सपोर्ट।",
      contraindications: "सीएनएस डिप्रेशन; सुस्ती उत्पन्न कर सकता है।"
    }
  ];

  /* =========================================================================
     2. VACCINATION KNOWLEDGE BASE (All Core Livestock Vaccines)
     ========================================================================= */
  const VACCINATION_DB = [
    {
      id: "vac_hs_alum",
      diseaseName: "गलघोंटू (Hemorrhagic Septicemia - HS)",
      species: ["गाय", "भैंस"],
      targetAge: "6 माह व उससे अधिक उम्र के सभी पशु",
      season: "मानसून पूर्व (मई - जून)",
      route: "Subcutaneous (S/C)",
      dose: "Alum precipitated: 5 ml; Oil Adjuvant: 2-3 ml",
      boosterFrequency: "वार्षिक (प्रतिवर्ष वर्षा ऋतु से पूर्व)"
    },
    {
      id: "vac_bq",
      diseaseName: "लंगड़ा बुखार (Black Quarter - BQ)",
      species: ["गाय", "भैंस (मुख्यतः युवा पशु 6 माह से 2 वर्ष)"],
      targetAge: "6 माह से ऊपर",
      season: "मानसून पूर्व (मई - जून)",
      route: "Subcutaneous (S/C)",
      dose: "5 ml per animal",
      boosterFrequency: "वार्षिक (प्रतिवर्ष नियमित)"
    },
    {
      id: "vac_fmd_oil",
      diseaseName: "खुरपका-मुंहपका (Foot and Mouth Disease - FMD)",
      species: ["गाय", "भैंस", "भेड़", "बकरी", "सूअर"],
      targetAge: "4 माह की उम्र से प्रारंभ",
      season: "वर्ष में दो बार (सितंबर-अक्टूबर एवं फरवरी-मार्च)",
      route: "Deep Intramuscular (I/M)",
      dose: "Cattle/Buffalo: 2-3 ml; Sheep/Goat: 1 ml",
      boosterFrequency: "प्राथमिक टीकाकरण के 1 माह बाद बूस्टर, फिर प्रत्येक 6 माह पर"
    },
    {
      id: "vac_lsd_goatpox",
      diseaseName: "गांठदार त्वचा रोग (Lumpy Skin Disease - LSD)",
      species: ["गाय", "भैंस"],
      targetAge: "4 माह से ऊपर के स्वस्थ पशु",
      season: "ग्रीष्म ऋतु (मच्छर-मक्खी प्रसार से पूर्व, मार्च-अप्रैल)",
      route: "Subcutaneous (S/C)",
      dose: "Goat Pox Vaccine (Uttarkashi strain) 1 ml (Homologous / Heterologous)",
      boosterFrequency: "वार्षिक"
    },
    {
      id: "vac_brucellosis_s19",
      diseaseName: "ब्रूसीलोसिस (Brucellosis - S19 / RB51)",
      species: ["केवल मादा गोवंश एवं भैंस की बछड़ियां"],
      targetAge: "4 से 8 माह की आयु की मादा बछड़ी (Calfhood vaccination)",
      season: "वर्षभर (उम्र अनुसार)",
      route: "Subcutaneous (S/C)",
      dose: "2 ml (Cotton Strain 19 / RB51)",
      boosterFrequency: "जीवन में केवल एक बार (नर पशुओं एवं 8 माह से बड़े पशुओं में वर्जित)"
    },
    {
      id: "vac_ppr_goat",
      diseaseName: "पीपीआर - बकरी प्लेग (Peste des Petits Ruminants)",
      species: ["भेड़", "बकरी"],
      targetAge: "3 माह की आयु से ऊपर",
      season: "शरद ऋतु या शीत ऋतु प्रारंभ (अक्टूबर-नवंबर)",
      route: "Subcutaneous (S/C)",
      dose: "1 ml per animal",
      boosterFrequency: "प्रत्येक 3 वर्ष में एक बार (Long lasting immunity)"
    },
    {
      id: "vac_enterotoxaemia_et",
      diseaseName: "फिड़किया / आंत्रविषक्तता (Enterotoxaemia - ET)",
      species: ["भेड़", "बकरी"],
      targetAge: "4 माह से ऊपर",
      season: "नई घास/मानसून से पूर्व (मई-जून)",
      route: "Subcutaneous (S/C)",
      dose: "2.5 ml per animal",
      boosterFrequency: "वार्षिक (पहला टीका लगने के 2-3 सप्ताह बाद बूस्टर)"
    },
    {
      id: "vac_anthrax_spore",
      diseaseName: "एंथ्रेक्स (Anthrax Spore Vaccine - Sterne Strain)",
      species: ["गाय", "भैंस", "भेड़", "बकरी", "घोड़ा"],
      targetAge: "6 माह से ऊपर (केवल स्थानिक/एंडेमिक क्षेत्रों में)",
      season: "गर्मी के अंत में (जुलाई)",
      route: "Subcutaneous (S/C)",
      dose: "Cattle/Horse: 1 ml; Sheep/Goat: 0.5 ml",
      boosterFrequency: "वार्षिक (केवल प्रकोप प्रवण इलाकों में)"
    },
    {
      id: "vac_rabies_inactivated",
      diseaseName: "रेबीज (Rabies Cell Culture Vaccine - Raksharab)",
      species: ["गाय", "भैंस", "कुत्ता", "बिल्ली", "घोड़ा"],
      targetAge: "3 माह बाद (या काटने के तुरंत बाद पोस्ट-बाइट)",
      season: "वर्षभर आवश्यकतानुसार",
      route: "Subcutaneous (S/C) / Intramuscular",
      dose: "1 ml per dose (Post-bite schedule: Day 0, 3, 7, 14, 28, 90)",
      boosterFrequency: "प्रोफाइलैक्टिक: वार्षिक"
    },
    {
      id: "vac_theileriosis_rakshavac",
      diseaseName: "थायलेरियासिस (Rakshavac-T - Theileria annulata Schizont)",
      species: ["क्रॉस-ब्रीड एवं विदेशी गायें"],
      targetAge: "2 माह से अधिक उम्र के बछड़े व गायें",
      season: "चिचड़ी के मौसम से पूर्व (फरवरी-मार्च)",
      route: "Subcutaneous (S/C)",
      dose: "3 ml per animal",
      boosterFrequency: "जीवन में एक बार या 3 वर्ष बाद"
    }
  ];

  /* =========================================================================
     3. MASTER 48+ DISEASE DIRECTORY (Evidence-based, 5-tier therapies)
     ========================================================================= */
  const DISEASE_DB = [
    {
      id: "DIS_01_HS",
      nameHindi: "गलघोंटू (Hemorrhagic Septicemia)",
      nameEnglish: "Hemorrhagic Septicemia (Pasteurellosis)",
      category: "Bacterial",
      organAffected: "Respiratory & Subcutaneous Neck",
      cardinalSigns: "गले, जबड़े और गलकंबल में गर्म, कठोर व दर्दनाक सूजन, तेज बुखार (105-107°F), सांस लेते समय घुर्र-घुर्र की आवाज एवं जीभ बाहर निकलना।",
      temperatureExpected: "105.0 - 107.0 °F",
      labTests: [
        { testName: "रक्त स्मीयर जांच (Blood Smear)", sample: "पेरिफेरल ब्लड", expectedResult: "Gram-ve, बाइपोलर स्टेनिंग वाले Pasteurella multocida बेसिली" },
        { testName: "एडिमैटस फ्लुइड कल्चर", sample: "गले की सूजन का स्राव", expectedResult: "शुद्ध बैक्टीरियल कॉलोनी विकास" }
      ],
      treatments: {
        injections: [
          "Inj. Ceftiofur Sodium 1g: 1-2 mg/kg body wt I/M SID 3 दिन",
          "Inj. Flunixin Meglumine (Megludyne): 2.2 mg/kg I/V तुरंत",
          "Inj. Isoflupredone Acetate 10ml I/M (गाभिन में सुरक्षित)",
          "Inj. Avil (Chlorpheniramine) 10ml I/M"
        ],
        oral: ["Bolus Melonex Plus 2 बोलस बीडी", "Electrolyte पानी निरंतर"],
        ayurveda: ["हल्दी चूर्ण 50g + काली मिर्च 10g + शुद्ध घी 100g दिन में दो बार"],
        homeopathy: ["Belladonna 200C + Arsenicum Album 200C (प्रत्येक 2 घंटे पर 10 बूंद)"],
        desiRemedy: "100 ग्राम सरसों का तेल + 15 ग्राम देशी कपूर + 25 ग्राम हल्दी गर्म करके गले की सूजन पर गुनगुना लेप करें।"
      },
      stages: {
        incubation: "1 से 3 दिन",
        prodromal: "सुस्ती, चारा छोड़ना, हल्का तापमान वृद्धि (103°F)",
        clinical: "अति-तीव्र सूजन, डिस्पेनिया (श्वसन कष्ट), घुर्राहट, 106°F तापमान",
        convalescent: "उपचार उपरांत 5-7 दिनों में श्वसन सामान्य, सूजन का मंद अवशोषण"
      }
    },
    {
      id: "DIS_02_BQ",
      nameHindi: "लंगड़ा बुखार / चरचरा (Black Quarter)",
      nameEnglish: "Black Quarter (Clostridial Myositis)",
      category: "Bacterial",
      organAffected: "Musculoskeletal (Heavy Musculature)",
      cardinalSigns: "पुट्ठे, कंधे या जांघ की भारी मांसपेशियों में गर्म दर्दनाक सूजन जो बाद में ठंडी और सुन्न हो जाती है; दबाने पर चर्र-चर्र (Crepitation) की ध्वनि।",
      temperatureExpected: "104.5 - 106.0 °F",
      labTests: [
        { testName: "मसल एस्पिरेट माइक्रोस्कोपी", sample: "सूजन का काला बदबूदार स्राव", expectedResult: "Clostridium chauvoei ग्राम पॉजिटिव स्पोर-युक्त छड़" },
        { testName: "फ्लोरोसेंट एंटीबॉडी टेस्ट (FAT)", sample: "मांसपेशी बायोप्सी", expectedResult: "विशिष्ट एंटीजन फ्लोरेसेंस" }
      ],
      treatments: {
        injections: [
          "Inj. Procaine Penicillin 40 Lac IU I/M BID 5 दिन",
          "सूजन के चारों ओर पेरी-फोकल क्रिस्टलीय पेनिसिलिन इन्फिल्ट्रेशन",
          "Inj. Melonex Plus 15-20ml I/M दर्द व बुखार निवारणार्थ",
          "Inj. Tribivet 10ml I/M तंत्रिका व ऊतक पुनरुद्धार हेतु"
        ],
        oral: ["पेनिसिलिन V बोलस (उपलब्धता पर) या सल्फा बोलस"],
        ayurveda: ["नीम पत्र क्वाथ + त्रिफला क्वाथ से घाव प्रक्षालन"],
        homeopathy: ["Arnica Montana 200C + Rhus Tox 200C"],
        desiRemedy: "नीम के काढ़े में फिटकरी डालकर सिकाई करें; चीरा लगाकर 3% हाइड्रोजन परॉक्साइड से सफाई (वायुरोधी बैक्टीरिया नष्ट करने हेतु)।"
      },
      stages: {
        incubation: "1 से 5 दिन",
        prodromal: "पशु का अचानक लंगड़ाना, उच्च ज्वर, कंपकंपी",
        clinical: "मांसपेशियों में गैस युक्त चर्र-चर्र सूजन, त्वचा का काला पड़ना",
        convalescent: "गंभीर मामलों में ऊतक नेक्रोसिस उपरांत स्वस्थ होने में 2-3 सप्ताह"
      }
    },
    {
      id: "DIS_03_FMD",
      nameHindi: "खुरपका-मुंहपका (Foot and Mouth Disease)",
      nameEnglish: "Foot and Mouth Disease (Aphtae Epizooticae)",
      category: "Viral",
      organAffected: "Oral Mucosa, Feet & Teats",
      cardinalSigns: "जीभ, मसूड़ों व तालु पर फफोले (वेसिकल्स), मुंह से लगातार तारदार चिपचिपी लार टपकना, खुरों के बीच छाले व अत्यधिक लंगड़ापन।",
      temperatureExpected: "104.0 - 105.5 °F (शुरुआती 48 घंटे)",
      labTests: [
        { testName: "RT-PCR", sample: "वेसिकुलर फ्लूइड या उपकला ऊतक", expectedResult: "Picorna Aphthovirus आरएनए पॉजिटिव" },
        { testName: "एंटीजन डिटेक्शन ELISA", sample: "ओरल स्वैब", expectedResult: "Serotype O, A, or Asia-1 की पुष्टि" }
      ],
      treatments: {
        injections: [
          "Inj. Intacef (Ceftriaxone) 3g I/M SID 3 दिन (द्वितीयक संक्रमण रोक)",
          "Inj. Melonex Plus 15ml I/M (तीव्र दर्द व सूजन नियंत्रण)",
          "Inj. Avil 10ml I/M",
          "Inj. Conciplex / Tribivet 10ml I/M (म्यूकोसा हीलिंग)"
        ],
        oral: ["Masticare powder / Vitamin A, D3, E supplements 10-15 दिन"],
        ayurveda: ["हल्दी, घी और बोरिक एसिड का पेस्ट मुंह में लेप करें"],
        homeopathy: ["Mercurius Solubilis 200C + Variolinum 200C"],
        desiRemedy: "मुंह को 1% फिटकरी अथवा पोटाश (KMNO4) के हल्के गुलाबी पानी से दिन में 3 बार धोएं। खुरों को फिनाइल पानी से साफ कर नारियल तेल में कपूर मिलाकर लगाएं।"
      },
      stages: {
        incubation: "2 से 8 दिन",
        prodromal: "तेज बुखार, सुस्ती, दूध उत्पादन में अचानक 80% गिरावट",
        clinical: "छालों का फटना, कच्चा लाल घाव, लार का लच्छेदार गिरना, खुर घाव",
        convalescent: "पैनटिंग सिंड्रोम (गर्मी न सह पाना), खुर विकृति, स्वस्थ होने में 15-30 दिन"
      }
    },
    {
      id: "DIS_04_MASTITIS_ACUTE",
      nameHindi: "तीव्र थनैला रोग (Acute Clinical Mastitis)",
      nameEnglish: "Acute Clinical Mastitis",
      category: "Bacterial",
      organAffected: "Mammary Glands (Udder)",
      cardinalSigns: "अयन/थन में अत्यधिक लालिमा, गर्म दर्दनाक सूजन, पत्थर जैसा कड़ापन; दूध का रंग बदलकर पीला पानी, रक्त या गाढ़े थक्के (छिछड़े) बन जाना।",
      temperatureExpected: "103.5 - 105.0 °F",
      labTests: [
        { testName: "कैलिफोर्निया मास्टाइटिस टेस्ट (CMT)", sample: "दूध का नमूना", expectedResult: "गाढ़ा जिलेटिन जेल बनना (+++)" },
        { testName: "मिल्क कल्चर व एंटीबायोटिक सेंसिटिविटी (ABST)", sample: "असेप्टिक मिल्क", expectedResult: "Staph. aureus, Strep. agalactiae या E. coli संवर्धन" }
      ],
      treatments: {
        injections: [
          "Inj. Intacef Tazo 4.5g I/V or I/M SID 3-5 दिन",
          "Inj. Flunixin Meglumine 15ml I/V (टॉक्सिन और दर्द निवारण)",
          "Inj. Serratiopeptidase (फाइब्रिनोलायटिक)",
          "इंट्रामैमरी ट्यूब: Pendistrin SH अथवा Cefoperazone ट्यूब थन खाली करके चढ़ाएं"
        ],
        oral: ["Trisodium Citrate पाउडर 30g दैनिक 5 दिन (दूध का pH सामान्य करने)", "विटामिन E व सेलेनियम बोलस"],
        ayurveda: ["एलोवेरा 250g + हल्दी 50g + चूना 15g पेस्ट दिन में 3 बार अयन पर"],
        homeopathy: ["Phytolacca 200C + Bryonia Alba 200C + Silicea 30C"],
        desiRemedy: "नीम के गर्म पानी से अयन की धीरे-धीरे सिकाई करें। सारा दूषित दूध निकाल कर जमीन में गहरा गाड़ दें।"
      },
      stages: {
        incubation: "12 से 48 घंटे",
        prodromal: "दूध में छोटे छिछड़े, थन के आधार पर हल्की गर्मी",
        clinical: "पूरा क्वार्टर सूज कर कठोर, दूध बंद, केवल बदबूदार सीरम या रक्त",
        convalescent: "फाइब्रोसिस का जोखिम; समय पर इलाज से 7-10 दिन में सुधार"
      }
    },
    {
      id: "DIS_05_SUBCLINICAL_MASTITIS",
      nameHindi: "अव्यक्त / छुपा थनैला (Subclinical Mastitis)",
      nameEnglish: "Subclinical Mastitis",
      category: "Bacterial",
      organAffected: "Mammary Epithelium",
      cardinalSigns: "अयन पर कोई बाह्य सूजन या लक्षण नहीं, परंतु दूध उत्पादन में 15-30% कमी, स्वाद खारा एवं सोमैटिक सेल काउंट (SCC) में भारी वृद्धि।",
      temperatureExpected: "सामान्य (101.5 - 102.5 °F)",
      labTests: [
        { testName: "सोमैटिक सेल काउंट (SCC)", sample: "दूध", expectedResult: "> 5,00,000 सेल्स प्रति मिलीलीटर" },
        { testName: "इलेक्ट्रिकल कंडक्टिविटी टेस्ट", sample: "क्वार्टर मिल्क", expectedResult: "उच्च विद्युत चालकता (> 6.5 mS/cm)" }
      ],
      treatments: {
        injections: ["Inj. Levamisole 5 ml S/C (इम्यूनोमॉड्यूलेटर के रूप में एकल खुराक)"],
        oral: ["Trisodium Citrate 30g दैनिक 7 दिन", "पॉवडर Masticare / Mastilep 50g बीडी"],
        ayurveda: ["शतावरी चूर्ण 50g + अश्वगंधा 30g दूध ग्रंथियों की शक्ति हेतु"],
        homeopathy: ["Thuja 200C + Calcarea Fluorica 6X"],
        desiRemedy: "प्रत्येक दुहने के बाद थनों को 0.5% पोविडोन आयोडीन घोल में डुबोएं (Post-milking teat dip)।"
      },
      stages: {
        incubation: "परिवर्तनशील (हफ्तों से महीनों)",
        prodromal: "अस्पष्ट दूध गिरावट",
        clinical: "लगातार सब-ऑप्टिमल फैट/एसएनएफ, छिपी हुई आर्थिक क्षति",
        convalescent: "ड्राई काउ थेरेपी उपरांत अगले ब्यात में पूर्ण मुक्ति"
      }
    },
    {
      id: "DIS_06_MILK_FEVER",
      nameHindi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever)",
      nameEnglish: "Parturient Hypocalcemia (Milk Fever)",
      category: "Metabolic",
      organAffected: "Neuromuscular & Skeletal Muscle",
      cardinalSigns: "ब्याने के 24-72 घंटे में पशु का बैठ जाना, गर्दन को अपनी कोख की ओर मोड़कर रखना (S-curved posture), शरीर व कान बिल्कुल ठंडे, थर्मामीटर से कम ताप।",
      temperatureExpected: "सब-नॉर्मल (< 99.0 - 100.0 °F)",
      labTests: [
        { testName: "सीरम कुल कैल्शियम", sample: "सीरम / क्लॉट ब्लड", expectedResult: "< 5.5 mg/dL (सामान्य: 8.5-10.5 mg/dL)" },
        { testName: "सीरम इनऑर्गेनिक फास्फोरस", sample: "सीरम", expectedResult: "अक्सर साथ में हाइपोफॉस्फेटेमिया (< 3.0 mg/dL)" }
      ],
      treatments: {
        injections: [
          "Calcium Borogluconate 25% (Mifex) 450ml: 300ml धीमी I/V (हार्ट रेट मॉनिटर करें) + 150ml S/C",
          "Inj. Tonophosphan 10ml I/M (फास्फोरस सपोर्ट)",
          "Inj. Tribivet 10ml I/M"
        ],
        oral: ["होश में आने के बाद Cal-Up / Ostovet Gel 300g ट्यूब प्रति 12 घंटे 2 बार"],
        ayurveda: ["सहजन (Moringa) पत्ती चूर्ण 100g दैनिक ब्याने के बाद"],
        homeopathy: ["Calcarea Phosphorica 30C + Belladonna 30C"],
        desiRemedy: "चेतावनी: अचेत या बैठे पशु को जबरन तरल नाल कदापि न दें (ड्रेंचिंग निमोनिया का खतरा)। पशु को पुआल पर बैठाएं व पैरों की मालिश करें।"
      },
      stages: {
        incubation: "ब्याने के तुरंत पूर्व या 48 घंटे बाद",
        prodromal: "मांसपेशियों में कंपकंपी, पिछले पैरों में लड़खड़ाहट, कान ठंडे",
        clinical: "स्टर्नल रिकम्बेंसी (गर्दन मोड़कर बैठना), आंख की पुतली फैली हुई, अचेतनता",
        convalescent: "कैल्शियम चढ़ाने के 20 मिनट में गोबर करना, पेशाब व उठकर खड़े होना"
      }
    },
    {
      id: "DIS_07_KETOSIS",
      nameHindi: "कीटोसिस / एसीटोनेमिया (Ketosis)",
      nameEnglish: "Acetonemia / Bovine Ketosis",
      category: "Metabolic",
      organAffected: "Hepatic & Energy Metabolism",
      cardinalSigns: "सांस, मूत्र व दूध से मीठी मीठी एसीटोन (क्लोरोफॉर्म जैसी) महक, दाना खाने से पूर्ण इंकार पर केवल सूखा भूसा खाना, अचानक दूध सूखना और तीव्र वजन घटना।",
      temperatureExpected: "सामान्य (101.0 - 102.5 °F)",
      labTests: [
        { testName: "मूत्र रोथेरा टेस्ट (Rothera's Test)", sample: "मूत्र", expectedResult: "गहरा बैंगनी रिंग (+++ कीटोन बॉडीज)" },
        { testName: "रक्त बीटा-हाइड्रॉक्सीब्यूटायरेट (BHBA)", sample: "होल ब्लड", expectedResult: "> 1.4 mmol/L (सब-क्लिनिकल), > 3.0 mmol/L (क्लिनिकल)" }
      ],
      treatments: {
        injections: [
          "Dextrose 25% 1000ml I/V (शीघ्र ऊर्जा आपूर्ति)",
          "Inj. Isoflupredone Acetate 10ml I/M (ग्लूकोनियोजेनेसिस प्रेरण)",
          "Inj. Tribivet 10ml I/M (विटामिन B12 कोएंजाइम हेतु)",
          "Inj. Belamyl 10ml I/M (लिवर सुरक्षा)"
        ],
        oral: ["Propylene Glycol 200ml बीडी 2 दिन, फिर 100ml ओडी 3 दिन", "Niacinamide (Vitamin B3) बोलस 6g दैनिक"],
        ayurveda: ["कालमेघ चूर्ण 30g + कुटकी 10g लिवर उत्तेजन हेतु"],
        homeopathy: ["Lycopodium 200C + Chelidonium Majus 30C"],
        desiRemedy: "250 ग्राम गुड़ + 50 मिली सरसों का तेल + 20 ग्राम सोंठ मिलाकर दिन में दो बार 4 दिन तक खिलाएं।"
      },
      stages: {
        incubation: "ब्याने के 2 से 6 सप्ताह बाद (पीक लेक्टेशन)",
        prodromal: "दाना खाने में नखरे, दूध में हल्की गिरावट, रूमेन गति मंद",
        clinical: "मीठी सांस, सूखी लीद, अत्यधिक दुर्बलता, कभी-कभी पागलों जैसी नर्वस हरकतें",
        convalescent: "ग्लूकोज थेरेपी के 48 घंटे में दाना खाना पुनः प्रारंभ"
      }
    },
    {
      id: "DIS_08_BLOAT",
      nameHindi: "अफारा / आध्मान (Bloat / Tympany)",
      nameEnglish: "Ruminal Tympany (Frothy & Free-gas Bloat)",
      category: "Metabolic",
      organAffected: "Rumen & Reticulum",
      cardinalSigns: "बायाँ पेट ढोलक की भांति अत्यधिक फूल जाना, बाएं फ्लैंक पर थपकी मारने पर खोखली टिमपैनिक ध्वनि, सांस लेने में अत्यंत कष्ट, जीभ बाहर निकालना व बेचैनी।",
      temperatureExpected: "सामान्य अथवा नर्वस बेचैनी से हल्का बढ़ा (102.0 - 103.5 °F)",
      labTests: [
        { testName: "रूमेन फ्लुइड एस्पिरेशन व पीएच", sample: "रूमेन द्रव", expectedResult: "झागदार हरा द्रव, पीएच 5.5 - 6.0 (लेग्यूम ब्लोट में)" }
      ],
      treatments: {
        injections: [
          "Inj. Spasmo-Vet (Dicyclomine) 15ml I/M (ऐंठन निवारण)",
          "Inj. Belamyl 10ml I/M",
          "आपातकाल में बाएं फ्लैंक पर ट्रोकार एवं कैनुला (Trocar & Cannula) चुभोकर गैस निकालें"
        ],
        oral: [
          "Tympol / Bloatosil liquid 100ml सीधे नाल द्वारा",
          "लिक्विड पैराफिन या वनस्पति तेल 300-500ml (झाग तोड़ने हेतु)"
        ],
        ayurveda: ["हिंग्वाष्टक चूर्ण 50g + काला नमक 50g गुनगुने पानी में"],
        homeopathy: ["Colocynthis 200C + Carbo Vegetabilis 200C + Nux Vomica 200C"],
        desiRemedy: "50 मिली शुद्ध तारपीन का तेल + 300 मिली मीठा (सरसों) तेल + 15 ग्राम शुद्ध हींग अच्छी तरह मिलाकर पिलाएं। मुंह में आड़ी लकड़ी बांधें।"
      },
      stages: {
        incubation: "आहार खाने के 30 मिनट से 4 घंटे भीतर",
        prodromal: "बार-बार उठना-बैठना, पेट की तरफ देखना, लात मारना",
        clinical: "बायां फ्लैंक कशेरुकाओं से ऊपर फूलना, सायनोसिस (जीभ नीली पड़ना), घुटन",
        convalescent: "गैस निष्कासन के उपरांत रूमेन टॉनिक से 2-3 दिन में सामान्यीकरण"
      }
    },
    {
      id: "DIS_09_THEILERIOSIS",
      nameHindi: "थायलेरियासिस / चिचड़ी बुखार (Theileriosis)",
      nameEnglish: "Bovine Theileriosis (Theileria annulata)",
      category: "Protozoal",
      organAffected: "Lymph Nodes & Red Blood Cells",
      cardinalSigns: "कंधे के आगे की लिम्फ नोड (Prescapular Lymph Node) में कठोर सूजन, लगातार तेज बुखार (105-106°F), सांस तेज चलना, आंखों में पीलापन/खून के धब्बे व रक्तहीनता।",
      temperatureExpected: "105.0 - 106.5 °F",
      labTests: [
        { testName: "लिम्फ नोड बायोप्सी स्मीयर (Giemsa)", sample: "लिम्फ नोड एस्पिरेट", expectedResult: "लिम्फोसाइट्स में कोच के नीले पिंड (Koch's Blue Bodies - Schizonts)" },
        { testName: "ब्लड स्मीयर जांच", sample: "पेरिफेरल ब्लड", expectedResult: "आरबीसी के अंदर अंगूठी (Signet Ring) जैसे पिरोप्लाज्म" }
      ],
      treatments: {
        injections: [
          "Inj. Buparvaquone (Butalex / Zubion) 2.5 mg/kg (1 ml/20kg) Deep I/M एकल खुराक",
          "Inj. Oxytetracycline LA (20 mg/kg) I/M (द्वितीयक रोगाणु व सपोर्ट)",
          "Inj. Melonex Plus 15ml I/M",
          "Inj. Feritas (Iron Sorbitol) 10ml I/M (एनीमिया सुधार हेतु)"
        ],
        oral: ["टॉनिक Sharkoferrol / Ferikind 50ml दैनिक", "Shark Liver Oil"],
        ayurveda: ["पुनर्नवा मंडूर 20g + गिलोय क्वाथ 100ml रक्तवर्द्धन हेतु"],
        homeopathy: ["China 200C + Ferrum Metallicum 30C"],
        desiRemedy: "पशु के शरीर से सभी चिचड़ियां हटाएं। नीम की पत्तियों के उबले पानी से नहलाएं। चिचड़ी नियंत्रण हेतु आवास पर साइपरमेथ्रिन छिड़कें।"
      },
      stages: {
        incubation: "10 से 21 दिन (चिचड़ी काटने के बाद)",
        prodromal: "तेज ज्वर, प्रेस्कैपुलर नोड्स का बढ़ना, भूख न लगना",
        clinical: "अत्यधिक रक्ताल्पता, सांस फूलना, खाँसी, आंखों से पानी, पीलिया",
        convalescent: "उपचार के 48 घंटे में बुखार उतरना; हीमोग्लोबिन सुधार में 3-4 सप्ताह"
      }
    },
    {
      id: "DIS_10_BABESIOSIS",
      nameHindi: "बबेशियोसिस / लाल पेशाब (Babesiosis / Red Water)",
      nameEnglish: "Bovine Babesiosis (Tick Fever / Redwater)",
      category: "Protozoal",
      organAffected: "Erythrocytes (RBCs) & Kidneys",
      cardinalSigns: "गहरा लाल या कॉफी के रंग का पेशाब (Hemoglobinuria), तेज बुखार (105-106°F), श्लेष्मा झिल्लियों का पहले पीला और फिर सफेद पड़ जाना, तेज धड़कन।",
      temperatureExpected: "105.0 - 106.5 °F",
      labTests: [
        { testName: "गीमसा ब्लड स्मीयर", sample: "कान की नस का रक्त (Capillary Blood)", expectedResult: "RBCs में नाशपाती के आकार के जोड़े परजीवी (Babesia bigemina)" },
        { testName: "मूत्र जांच", sample: "मूत्र", expectedResult: "हीमोग्लोबिन्यूरिया पॉजिटिव, आरबीसी अनुपस्थित (इंट्रावैस्कुलर हेमोलिसिस)" }
      ],
      treatments: {
        injections: [
          "Inj. Diminazene Aceturate (Berenil) 3.5 mg/kg Deep I/M gluteal region",
          "Inj. Melonex Plus 15ml I/M",
          "Inj. Feritas / Imferon 10ml I/M",
          "Dextrose Normal Saline (DNS) 2-3 लीटर I/V (किडनी फ्लशिंग हेतु)"
        ],
        oral: ["विटामिन C चूर्ण 10g दैनिक", "अमोनियम क्लोराइड (मूत्र अम्लीकरण)"],
        ayurveda: ["गिलोय रस 100ml + आंवला चूर्ण 50g दैनिक"],
        homeopathy: ["Crotalus Horridus 200C + Phosphorus 200C"],
        desiRemedy: "पशु को ठंडे स्थान पर रखें। ताजे गन्ने का रस या मिश्री-गुड़ का ठंडा पानी पिलाएं। शारीरिक श्रम बिल्कुल न कराएं।"
      },
      stages: {
        incubation: "7 से 14 दिन",
        prodromal: "105°F बुखार, रूंआं खड़ा होना, सुस्ती",
        clinical: "कॉफी रंग का पेशाब, गंभीर हेमोलिटिक एनीमिया, पीलिया",
        convalescent: "बेरेनिल के 24 घंटे में पेशाब का रंग साफ होना; रिकवरी 10-15 दिन"
      }
    },
    {
      id: "DIS_11_ANAPLASMOSIS",
      nameHindi: "एनाप्लास्मोसिस / पीलिया बुखार (Anaplasmosis)",
      nameEnglish: "Bovine Anaplasmosis (Gall Sickness)",
      category: "Bacterial",
      organAffected: "RBCs, Liver & Gall Bladder",
      cardinalSigns: "अत्यधिक पीलिया (आंखों, योनि व मसूड़ों में गहरा पीलापन), गंभीर एनीमिया, तेज बुखार, परंतु पेशाब कभी लाल नहीं होता (No Hemoglobinuria); सूखा कठोर गोबर।",
      temperatureExpected: "104.0 - 105.5 °F",
      labTests: [
        { testName: "ब्लड स्मीयर स्टेनिंग", sample: "पेरिफेरल ब्लड", expectedResult: "आरबीसी की परिधि पर गहरे बिंदु (Anaplasma marginale Bodies)" },
        { testName: "सीरम बिलीरुबिन", sample: "सीरम", expectedResult: "अनकॉन्जुगेटेड एवं कॉन्जुगेटेड दोनों बिलीरुबिन में तीव्र वृद्धि" }
      ],
      treatments: {
        injections: [
          "Inj. Oxytetracycline LA 20 mg/kg (1 ml/10kg) Deep I/M (48-72 घंटे बाद रिपीट)",
          "Inj. Melonex Plus 15ml I/M",
          "Inj. Belamyl 10ml I/M (लिवर स्टिमुलेशन)",
          "Inj. Feritas 10ml I/M"
        ],
        oral: ["Liv-52 liquid 100ml बीडी", "लिक्विड पैराफिन 300ml (कब्ज निवारण हेतु)"],
        ayurveda: ["भूमि आंवला (Phyllanthus niruri) पंचांग 50g पीसकर पिलाएं"],
        homeopathy: ["Chelidonium Majus 200C + Chionanthus 30C"],
        desiRemedy: "250 ग्राम गिलोय का काढ़ा + 50 ग्राम हल्दी + 100 ग्राम पुराना गुड़ दिन में दो बार दें। हरे चारे की मात्रा बढ़ाएं।"
      },
      stages: {
        incubation: "3 से 6 सप्ताह",
        prodromal: "हल्का ज्वर, दूध में मंद गिरावट, सुस्ती",
        clinical: "तीव्र पीलिया, अत्यधिक रक्ताल्पता, सांस का तेज चलना, शुष्क गोबर",
        convalescent: "ऑक्सीटेट्रासाइक्लिन से परजीवी दमन; रक्त बनने में 4-6 सप्ताह"
      }
    },
    {
      id: "DIS_12_TRYPANOSOMIASIS",
      nameHindi: "सर्रा रोग (Surra / Trypanosomiasis)",
      nameEnglish: "Trypanosomiasis (Surra)",
      category: "Protozoal",
      organAffected: "Central Nervous System & Blood",
      cardinalSigns: "चक्कर काटना, दीवार से सिर टिका कर खड़े रहना, पागलों जैसी हरकतें, रुक-रुक कर आने वाला बुखार (Intermittent Fever), पेट के निचले हिस्से व अंडकोष में सूजन।",
      temperatureExpected: "103.0 - 106.0 °F (रुक-रुक कर ज्वर)",
      labTests: [
        { testName: "वेट ब्लड फिल्म (Wet Blood Mount)", sample: "ताजा कैपिलरी रक्त", expectedResult: "आरबीसी के मध्य तेजी से छटपटाते हुए Trypanosoma evansi" },
        { testName: "गीमसा ब्लड स्मीयर", sample: "थिन/थिक ब्लड स्मीयर", expectedResult: "लंबे फ्लैगेलेटेड ट्रिपैनोसोम प्रोटोजोआ" }
      ],
      treatments: {
        injections: [
          "Inj. Triquin (Quinapyramine Sulphate + Methylsulphate) 2.5g घोल बनाकर S/C strictly",
          "Inj. Tribivet (B1, B6, B12) 15ml I/M तंत्रिका क्षति से बचाव हेतु",
          "Inj. Melonex Plus 15ml I/M",
          "Inj. Dextrose 25% 500ml I/V (हाइपोग्लाइसीमिया निवारण)"
        ],
        oral: ["Sharkoferrol tonic 50ml दैनिक", "भूख वर्धक पाचन चूर्ण"],
        ayurveda: ["शंखपुष्पी व ब्राह्मी चूर्ण 30g तंत्रिका शक्ति हेतु"],
        homeopathy: ["Arsenicum Album 200C + Nux Vomica 200C"],
        desiRemedy: "मक्खियों (Tabanus Flies) से बचाव करें। पशु को अंधेरे, शांत व हवादार कमरे में रखें ताकि दौरे न आएं।"
      },
      stages: {
        incubation: "1 से 2 सप्ताह",
        prodromal: "रुक-रुक कर बुखार, आंखों से अत्यधिक आंसू, सुस्ती",
        clinical: "गोल-गोल घूमना, अंधापन, उत्तेजना, एनसारका (निचले अंगों में जलभराव)",
        convalescent: "समय पर ट्राइक्विन मिलने पर 1 सप्ताह में नर्वस लक्षण शांत"
      }
    },
    {
      id: "DIS_13_LUMPY_SKIN_DISEASE",
      nameHindi: "गांठदार त्वचा रोग (Lumpy Skin Disease - LSD)",
      nameEnglish: "Lumpy Skin Disease (Neethling Poxvirus)",
      category: "Viral",
      organAffected: "Integumentary & Lymphatic System",
      cardinalSigns: "संपूर्ण शरीर की त्वचा पर 2 से 5 सेमी व्यास की गोल कठोर गांठें (Nodules), पैरों व गलकंबल में भारी सूजन, तेज बुखार, नाक व आंख से स्राव और लंगड़ापन।",
      temperatureExpected: "104.0 - 106.0 °F",
      labTests: [
        { testName: "रियल-टाइम पीसीआर (qPCR)", sample: "त्वचा की पपड़ी या नोड्यूल बायोप्सी", expectedResult: "Capripoxvirus DNA पॉजिटिव पुष्टि" }
      ],
      treatments: {
        injections: [
          "Inj. Ceftiofur Sodium 1g I/M SID 3-5 दिन (द्वितीयक बैक्टीरियल घाव रोकने)",
          "Inj. Melonex Plus 15ml I/M दर्द व सूजन हेतु",
          "Inj. Avil 10ml I/M",
          "Inj. Ivermectin 10ml S/C (मैगट से बचाव व इम्यून सपोर्ट)"
        ],
        oral: ["विटामिन C (Ascorbic acid) पाउडर 10g दैनिक", "Masticare powder / Zinc supplements"],
        ayurveda: ["हल्दी, काली मिर्च, तुलसी, दालचीनी, गुड़ का काढ़ा दिन में दो बार"],
        homeopathy: ["Variolinum 200C + Thuja Occidentalis 200C + Silicea 200C"],
        desiRemedy: "घावों पर नीम तेल + कपूर + हल्दी का गाढ़ा लेप लगाएं। मक्खियों से बचाव हेतु कपूर का धुआं करें।"
      },
      stages: {
        incubation: "4 से 14 दिन",
        prodromal: "तेज ज्वर (105°F), लिम्फ नोड्स में भारी सूजन, आंख-नाक से स्राव",
        clinical: "त्वचा पर सैकड़ों कठोर गांठें, नोड्यूल्स का फटना, अल्सर, पैरों में सूजन",
        convalescent: "पपड़ी (Scabs) गिरना; पूर्ण त्वचा स्वस्थ होने में 1 से 3 माह"
      }
    },
    {
      id: "DIS_14_ANTHRAX",
      nameHindi: "एंथ्रेक्स / गिल्टी रोग (Anthrax)",
      nameEnglish: "Anthrax (Splenic Fever)",
      category: "Bacterial",
      organAffected: "Spleen & Systemic Circulation",
      cardinalSigns: "अचानक बिना लक्षण के आकस्मिक मृत्यु; प्राकृतिक छिद्रों (नाक, मुंह, गुदा, योनि) से बिना जमा हुआ डामर जैसा काला रक्त रिसना; शव में अकड़न (Rigor Mortis) न होना।",
      temperatureExpected: "106.0 - 107.5 °F (मृत्यु से चंद घंटे पूर्व)",
      labTests: [
        { testName: "पॉलीक्रोम मेथिलीन ब्लू स्टेनिंग (M'Fadyean Test)", sample: "कान की नस का रक्त स्मीयर", expectedResult: "गुलाबी कैप्सूल से घिरे चौकोर छोर वाले नीले बेसिली (Bacillus anthracis)" }
      ],
      treatments: {
        injections: [
          "अति-आपातकाल (यदि जीवित हो): Inj. Procaine Penicillin 40-80 Lac IU I/V & I/M BID",
          "Inj. Oxytetracycline 10 mg/kg I/V",
          "Inj. Anthrax Anti-serum (यदि उपलब्ध हो)"
        ],
        oral: ["सख्त वर्जित (पशु चंद घंटों में दम तोड़ देता है)"],
        ayurveda: ["लागू नहीं"],
        homeopathy: ["Anthracinum 200C (केवल प्रोफिलैक्सिस हेतु)"],
        desiRemedy: "चेतावनी: एंथ्रेक्स पीड़ित पशु के शव को कभी न चीरें (No Post-mortem)। 6-8 फीट गहरे गड्ढे में चूना डालकर गाड़ें।"
      },
      stages: {
        incubation: "1 से 3 दिन",
        prodromal: "अत्यधिक तेज बुखार, बेचैनी, तेज श्वास",
        clinical: "ऐंठन, लड़खड़ाहट, पतन, छिद्रों से काला रक्त, तीव्र मृत्यु (Peracute death)",
        convalescent: "प्रायः मृत्यु दर 90-95%"
      }
    },
    {
      id: "DIS_15_ENTEROTOXAEMIA",
      nameHindi: "फिड़किया / आंत्रविषक्तता (Enterotoxaemia - ET)",
      nameEnglish: "Enterotoxaemia (Pulpy Kidney Disease)",
      category: "Bacterial",
      organAffected: "Intestines, Kidneys & Brain",
      cardinalSigns: "अचानक अत्यधिक दाना या हरी घास खाने बाद बकरी/भेड़ का जमीन पर गिरना, सिर पीछे की ओर खींचना (Opisthotonos), झागदार मुंह व पेट दर्द से चीखना।",
      temperatureExpected: "103.0 - 105.0 °F (बाद में सब-नॉर्मल)",
      labTests: [
        { testName: "इंटेस्टाइनल कंटेंट स्मीयर", sample: "इलियम सामग्री", expectedResult: "विशाल संख्या में Clostridium perfringens Type D ग्राम+ रॉड्स" },
        { testName: "मूत्र ग्लूकोज जांच (Glucosuria)", sample: "मूत्र", expectedResult: "तीव्र ग्लाइकोसुरिया (+++ शुगर)" }
      ],
      treatments: {
        injections: [
          "Inj. Clostridium perfringens Type D Antitoxin (यदि उपलब्ध हो)",
          "Inj. Crystalline Penicillin 20 Lac IU I/V + I/M",
          "Inj. Spasmo-Vet 5ml I/M",
          "Inj. Dexamethasone 2ml I/M (शॉक निवारण हेतु)"
        ],
        oral: ["Activated Charcoal पाउडर 50g + Kaolin पानी में घोलकर"],
        ayurveda: ["ईसबगोल की भूसी 30g छाछ के साथ"],
        homeopathy: ["Belladonna 200C + Nux Vomica 200C"],
        desiRemedy: "तुरंत दाना-बांटा बंद करें। मीठा सोडा 10 ग्राम + हींग 2 ग्राम गुनगुने पानी में नाल से दें।"
      },
      stages: {
        incubation: "कुछ घंटे से 1 दिन",
        prodromal: "झुंड से अलग होना, सुस्ती, हल्का अफारा",
        clinical: "दौरे पड़ना, सिर पीछे मुड़ना, दांत पीसना, तीव्र मृत्यु (2-12 घंटे)",
        convalescent: "बचे हुए पशुओं में किडनी नरम (Pulpy) हो जाती है"
      }
    },
    {
      id: "DIS_16_PPR",
      nameHindi: "पीपीआर / बकरी प्लेग (PPR)",
      nameEnglish: "Peste des Petits Ruminants (Goat Plague)",
      category: "Viral",
      organAffected: "Gastrointestinal & Respiratory Tract",
      cardinalSigns: "मुंह के अंदर गंदे बदबूदार छाले व सफेद परत, आंखों व नाक से गाढ़ा मवाद जैसा स्राव, तेज बुखार (105°F), अत्यंत बदबूदार काले-हरे पतले दस्त एवं निमोनिया।",
      temperatureExpected: "104.5 - 106.0 °F",
      labTests: [
        { testName: "सैंडविच ELISA / RT-PCR", sample: "ओरल व नेजल स्वैब", expectedResult: "Morbillivirus PPRV एंटीजन पॉजिटिव" }
      ],
      treatments: {
        injections: [
          "Inj. Enrofloxacin (5 mg/kg) I/M SID 4 दिन (सेकेंडरी बैक्टीरिया रोकने)",
          "Inj. Melonex Plus 2-3ml I/M",
          "Inj. Avil 2ml I/M",
          "Dextrose Normal Saline 200-500ml I/V or S/C (डिहाइड्रेशन से बचाव)"
        ],
        oral: ["Bolus Biotrim (Sulphadiazine + Trimethoprim) 1/2 बोलस बीडी", "Oral ORS निरंतर"],
        ayurveda: ["मुलेठी चूर्ण 10g + शहद मुंह के छालों हेतु"],
        homeopathy: ["Mercurius Corrosivus 200C + Arsenicum Album 200C"],
        desiRemedy: "मुंह को सुहागा (Borax) भुना हुआ शहद में मिलाकर दिन में 3 बार साफ करें। बकरी को ठंड से बचाएं।"
      },
      stages: {
        incubation: "3 से 6 दिन",
        prodromal: "अचानक 106°F बुखार, आंखें लाल, स्राव बहना",
        clinical: "मुंह में सड़ांध, नेक्रोटिक छाले, अतिसार, निर्जलीकरण, सांस फूलना",
        convalescent: "बचने वाले पशुओं में आजीवन प्रतिरक्षा, स्वस्थ होने में 2-3 सप्ताह"
      }
    },
    {
      id: "DIS_17_BRUCELLOSIS",
      nameHindi: "ब्रूसीलोसिस / संक्रामक गर्भपात (Brucellosis)",
      nameEnglish: "Brucellosis (Bangs Disease / Contagious Abortion)",
      category: "Bacterial",
      organAffected: "Pregnant Uterus & Placenta",
      cardinalSigns: "गर्भावस्था के अंतिम त्रैमास (विशेषकर 7वें से 9वें माह) में अचानक गर्भपात, जेर का बुरी तरह अटक जाना (ROP), भूरे-पीले बदबूदार स्राव व बांझपन।",
      temperatureExpected: "सामान्य अथवा गर्भपात के समय हल्का बढ़ा (102.5 - 103.5 °F)",
      labTests: [
        { testName: "रोज बंगाल प्लेट टेस्ट (RBPT)", sample: "सीरम", expectedResult: "एंटीजन एग्ग्लूटिनेशन क्लंपिंग (+++)" },
        { testName: "मिल्क रिंग टेस्ट (MRT)", sample: "कच्चा मिश्रित दूध", expectedResult: "दूध की मलाई पर नीली रिंग बनना" }
      ],
      treatments: {
        injections: [
          "क्लिनिकल इरेडिकेशन कठिन; आर्थिक पशुओं में: Inj. Streptomycin 1g + Oxytetracycline LA 20 mg/kg",
          "हार्मोनल एवं सपोर्टिव चिकित्सा"
        ],
        oral: ["गर्भाशय शोधक काढ़े (Uterine tonics) निरंतर"],
        ayurveda: ["लोध्र, अशोक छाल व शतावरी क्वाथ"],
        homeopathy: ["Sabina 200C + Sepia 200C"],
        desiRemedy: "सावधानी: यह रोग जूनोटिक (इंसानों में फैलने वाला) है। गर्भपात भ्रूण व जेर को दस्ताने पहनकर चूने के साथ दफनाएं।"
      },
      stages: {
        incubation: "2 सप्ताह से 5 माह",
        prodromal: "अयन का समय से पहले विकसित होना, योनि से स्राव",
        clinical: "7-8 माह पर गर्भपात, कोटिलेडन्स का नेक्रोटिक पीला चमड़े जैसा होना",
        convalescent: "पशु आजीवन वाहक (Carrier) बन सकता है"
      }
    },
    {
      id: "DIS_18_EPHEMERAL_FEVER",
      nameHindi: "तीन दिनी बुखार / अकड़हा (Bovine Ephemeral Fever)",
      nameEnglish: "Bovine Ephemeral Fever (Three-day Sickness)",
      category: "Viral",
      organAffected: "Joints, Muscles & Vascular Endothelium",
      cardinalSigns: "अचानक तेज बुखार (105-106°F), चारों पैरों में बारी-बारी तेज अकड़न व लंगड़ापन, पशु का जमीन पर बैठ जाना, आंखों से पानी व 3 दिन में स्वतः ठीक होना।",
      temperatureExpected: "104.5 - 106.0 °F (Biphasic fever)",
      labTests: [
        { testName: "रक्त परीक्षण (Hematology)", sample: "EDTA रक्त", expectedResult: "गंभीर न्यूट्रोफिलिया एवं तीव्र लिंफोपेनिया" }
      ],
      treatments: {
        injections: [
          "Inj. Melonex Plus 20ml I/M SID 3 दिन (दर्द व सूजन रोधी)",
          "Inj. Megludyne (Flunixin) 15ml I/V",
          "Inj. Mifex 450ml I/V (अस्थायी हाइपोकैल्सीमिया निवारण हेतु)",
          "Inj. Tribivet 10ml I/M"
        ],
        oral: ["कैल्शियम जेल 300g ट्यूब", "Paracetamol बोलस"],
        ayurveda: ["दशमूल क्वाथ 100ml जोड़ों के दर्द हेतु"],
        homeopathy: ["Rhus Tox 200C + Bryonia Alba 200C + Eupatorium Perf 200C"],
        desiRemedy: "पशु को गीली जमीन पर न रखें। पैरों की सिकाई करें। जबरन चलाने का प्रयास न करें।"
      },
      stages: {
        incubation: "2 से 4 दिन",
        prodromal: "अचानक तेज बुखार, दूध का पूर्णतः सूख जाना",
        clinical: "पैरों में असहनीय अकड़न, बैठ जाना, गर्दन झुकाना (3 दिन)",
        convalescent: "तीसरे-चौथे दिन चमत्कारिक रूप से उठकर खड़ा होना व चारा खाना"
      }
    },
    {
      id: "DIS_19_RABIES",
      nameHindi: "रेबीज / अलर्क रोग (Bovine Rabies)",
      nameEnglish: "Rabies (Hydrophobia / Dumb Rabies)",
      category: "Viral",
      organAffected: "Central Nervous System (Brain)",
      cardinalSigns: "असामान्य रंभाना (गले से कर्कश सीटी जैसी आवाज), लगातार लार टपकना, आक्रामकता या स्तब्धता (Dumb form), बार-बार पेशाब का प्रयास, पक्षाघात व मृत्यु।",
      temperatureExpected: "सामान्य अथवा उत्तेजना के समय हल्का बढ़ा (102.5 - 104.0 °F)",
      labTests: [
        { testName: "डायरेक्ट फ्लोरोसेंट एंटीबॉडी (dFAT)", sample: "मस्तिष्क ऊतक (Post-mortem)", expectedResult: "नेग्री बॉडीज (Negri Bodies) एवं वायरल एंटीजन की पुष्टि" }
      ],
      treatments: {
        injections: [
          "क्लिनिकल लक्षण प्रकट होने के बाद कोई उपचार संभव नहीं (100% प्राणघातक)",
          "काटने के तुरंत बाद (Day 0, 3, 7, 14, 28) पोस्ट-बाइट रैबीज वैक्सीन (Raksharab) अनिवार्य"
        ],
        oral: ["सख्त वर्जित (पशु निगलने में असमर्थ होता है)"],
        ayurveda: ["अनुपयुक्त"],
        homeopathy: ["Lyssin 200C / Hydrophobinum (केवल बचाव हेतु)"],
        desiRemedy: "पशु को तुरंत मजबूत लोहे की जंजीर से अन्य पशुओं व मनुष्यों से दूर बांधें। मुंह में हाथ डालने की गलती कदापि न करें।"
      },
      stages: {
        incubation: "2 सप्ताह से 6 माह (काटने के स्थान की दूरी अनुसार)",
        prodromal: "व्यवहार परिवर्तन, बेचैनी, आंखें चौड़ी",
        clinical: "फ्यूरियस या डम्ब रूप, रंभाना, लार, लकवा, सांस रुकना",
        convalescent: "लक्षण दिखने के 3 से 7 दिनों में अनिवार्य मृत्यु"
      }
    },
    {
      id: "DIS_20_TETANUS",
      nameHindi: "धनुस्तंभ / टेटनस (Tetanus)",
      nameEnglish: "Tetanus (Lockjaw)",
      category: "Bacterial",
      organAffected: "Neuromuscular Junctions",
      cardinalSigns: "पूरे शरीर में लकड़ी जैसा कड़ापन (Wooden Horse Posture), जबड़ा भिंच जाना (Lockjaw), तीसरी पलक का आंख के ऊपर बार-बार चढ़ना, कान खड़े व पूंछ सीधी।",
      temperatureExpected: "सामान्य अथवा मस्कुलर स्पाज्म के कारण बढ़ा हुआ (102.0 - 104.0 °F)",
      labTests: [
        { testName: "घाव स्मीयर जांच", sample: "गहरे घाव की खुरचन", expectedResult: "ड्रमस्टिक (Drumstick) के आकार के Clostridium tetani स्पोर्स" }
      ],
      treatments: {
        injections: [
          "Tetanus Antitoxin (TAT) 50,000 to 1,00,000 IU I/V & घाव के चारों ओर",
          "Inj. Crystalline Penicillin 40 Lac IU I/V QID 5 दिन",
          "Inj. Diazepam / Chlorpromazine (मांसपेशी ढीली करने व सिडेशन हेतु)",
          "Inj. Melonex 15ml I/M"
        ],
        oral: ["सख्त वर्जित (जबड़ा बंद होने के कारण)"],
        ayurveda: ["लागू नहीं"],
        homeopathy: ["Hypericum Perforatum 200C + Ledum Palustre 200C + Nux Vomica 200C"],
        desiRemedy: "मूल घाव को खोजें, उसे खोलकर 3% हाइड्रोजन परॉक्साइड और टिंचर आयोडीन से अच्छी तरह धोएं। पशु को शांत, अंधेरे कमरे में रखें।"
      },
      stages: {
        incubation: "5 दिन से 3 सप्ताह",
        prodromal: "हल्की अकड़न, तीसरी पलक का फड़कना",
        clinical: "लकड़ी का घोड़ा जैसी स्थिति, जबड़ा बंद, आवाज व रोशनी से तीव्र ऐंठन",
        convalescent: "गंभीर मामलों में श्वसन पक्षाघात से मृत्यु; रिकवरी में 4-6 सप्ताह"
      }
    },
    {
      id: "DIS_21_COLIC",
      nameHindi: "पेट दर्द / शूल (Bovine / Equine Colic)",
      nameEnglish: "Spasmodic & Impaction Colic",
      category: "Gastrointestinal",
      organAffected: "Abomasum, Caecum & Intestines",
      cardinalSigns: "पशु का बार-बार पेट की ओर लात मारना, उठना-बैठना, जमीन पर लोटना, पसीना आना, कराहना, पीठ ऊपर धनुष की भांति तानना व गोबर न करना।",
      temperatureExpected: "सामान्य (101.5 - 102.5 °F)",
      labTests: [
        { testName: "रेक्टल पाल्पेशन (गुदा परीक्षण)", sample: "रेक्टम", expectedResult: "आंतों में गैस, सूखा कठोर गोबर या डिस्टेंशन" }
      ],
      treatments: {
        injections: [
          "Inj. Spasmo-Vet (Dicyclomine) 15-20ml I/M (ऐंठन शूल में)",
          "Inj. Flunixin Meglumine 15ml I/V (तीव्र आंत दर्द शमन)",
          "Inj. Belamyl 10ml I/M",
          "DNS / RL 2 से 3 लीटर I/V (इंटेस्टाइनल हाइड्रेशन)"
        ],
        oral: ["लिक्विड पैराफिन 1 लीटर (इम्पैक्शन में)", "मैग्नीशियम सल्फेट (एप्सम साल्ट) 400g पानी में"],
        ayurveda: ["अजवाइन 50g + काला नमक 30g + हींग 10g का काढ़ा"],
        homeopathy: ["Colocynthis 200C + Magnesia Phosphorica 200C + Nux Vomica 200C"],
        desiRemedy: "गुनगुने पानी में साबुन का झाग बनाकर गुदा में एनीमा (Enema) दें ताकि अटका हुआ सूखा गोबर बाहर निकल सके।"
      },
      stages: {
        incubation: "अवरोध या स्पैज्म के कुछ घंटों में",
        prodromal: "बेचैनी, बार-बार पेशाब का झूठा प्रयास, पूंछ हिलाना",
        clinical: "तीव्र छटपटाहट, जमीन पर लोटना, दर्द से आंखें फटी होना",
        convalescent: "गोबर व गैस निष्कासन उपरांत तुरंत राहत"
      }
    },
    {
      id: "DIS_22_RETENTION_OF_PLACENTA",
      nameHindi: "जेर का अटकना (Retention of Placenta - ROP)",
      nameEnglish: "Retention of Fetal Membranes (RFM / ROP)",
      category: "Obstetric",
      organAffected: "Post-partum Uterus & Cotyledons",
      cardinalSigns: "प्रसव के 8 से 12 घंटे बीत जाने के उपरांत भी जेर का गर्भाशय से बाहर न गिरना; योनि से बदबूदार सड़ा हुआ मांसल झिल्लीदार टुकड़ा लटकना।",
      temperatureExpected: "सामान्य अथवा गर्भाशय संक्रमण होने पर बढ़ा (102.5 - 104.0 °F)",
      labTests: [
        { testName: "योनि एवं गर्भाशय परीक्षण", sample: "वेजाइनल डिस्चार्ज", expectedResult: "नेक्रोटिक प्लेसेंटल ऊतक व प्यूट्रीफाइड दुर्गंध" }
      ],
      treatments: {
        injections: [
          "Inj. Cloprostenol (Pragma) 2ml I/M (गर्भाशय संकुचन हेतु)",
          "Inj. Amoxicillin-Sulbactam 4.5g I/M SID 3 दिन (मेट्राइटिस रोकथाम)",
          "Inj. Melonex Plus 15ml I/M",
          "Inj. Tonophosphan 10ml I/M + Calcium Borogluconate 200ml S/C"
        ],
        oral: ["Uterotone / Exapar liquid 100ml बीडी 5 दिन", "गुड़ व सोंठ काढ़ा"],
        ayurveda: ["उलटकंबल (Abroma augusta) छाल रस 100ml"],
        homeopathy: ["Sepia 200C + Pulsatilla 200C + Secale Cornutum 30C"],
        desiRemedy: "1 किलो बांस के ताजे पत्ते उबालकर 250 ग्राम गुड़ मिलाकर पिलाएं। कभी भी जबरन हाथ डालकर जेर न खींचें (रक्तस्राव व गर्भाशय फटने का खतरा)।"
      },
      stages: {
        incubation: "प्रसव उपरांत 8-12 घंटे",
        prodromal: "जेर का आधा लटकना, पूंछ बार-बार उठाना",
        clinical: "सड़न, बदबूदार मवाद, दूध घटना, सेप्टिक मेट्राइटिस का जोखिम",
        convalescent: "दवाओं द्वारा गर्भाशय की सफाई उपरांत 7-10 दिन में सुधार"
      }
    },
    {
      id: "DIS_23_PROLAPSE",
      nameHindi: "फूल दिखाना / प्रोलैप्स (Uterine / Vaginal Prolapse)",
      nameEnglish: "Vaginal / Uterine Prolapse",
      category: "Obstetric",
      organAffected: "Cervix, Vagina & Gravid Uterus",
      cardinalSigns: "बैठने पर योनि मार्ग से लाल-गुलाबी फुटबॉल जैसा मांसल अंग बाहर आना (Vaginal) अथवा ब्याने के तुरंत बाद पूरा गर्भाशय उल्टे थैले जैसा बाहर लटक जाना (Uterine)।",
      temperatureExpected: "सामान्य अथवा आघात/शॉक में सब-नॉर्मल (99.0 - 102.5 °F)",
      labTests: [
        { testName: "प्रत्यक्ष क्लिनिकल निरीक्षण", sample: "प्रोलेप्सड मास", expectedResult: "कोटिलेडन्स युक्त गर्भाशय या वेजाइनल म्यूकोसा" }
      ],
      treatments: {
        injections: [
          "एपीड्यूरल एनेस्थीसिया: 2% Lignocaine Hydrochloride 5-8 ml (दर्द व जोर लगाना बंद करने)",
          "Inj. Intacef Tazo 4.5g I/M (गंभीर संक्रमण निवारण)",
          "Inj. Melonex 15ml I/M",
          "Inj. Mifex 450ml I/V (मांसपेशियों की टोन बढ़ाने हेतु)"
        ],
        oral: ["Pro-Cal gel", "कब्ज निवारक चोकर दलिया"],
        ayurveda: ["लोध्र व माजूफल चूर्ण संकुचन हेतु"],
        homeopathy: ["Sepia 200C + Podophyllum 200C + Lilium Tigrinum 30C"],
        desiRemedy: "बाहर निकले अंग को ठंडे फिटकरी या बर्फ के पानी से धोएं। ऊपर चीनी/बूरा छिड़कें (एडिमा कम करने)। अंग को वापस अंदर करके रस्सी का छींका (Truss) बांधें।"
      },
      stages: {
        incubation: "प्रसव पूर्व अंतिम माह अथवा प्रसव के 24 घंटे भीतर",
        prodromal: "बैठने पर योनि से हल्का उभार, लगातार जोर मारना (Tenismus)",
        clinical: "संपूर्ण गर्भाशय बाहर, म्यूकोसा का फटना, गंदगी व संक्रमण",
        convalescent: "उचित रिपोजिशन व टांके (Buhner's suture) से 10-14 दिन में स्वस्थ"
      }
    },
    {
      id: "DIS_24_DOWNER_COW",
      nameHindi: "डाउपर काउ सिंड्रोम (Downer Cow Syndrome)",
      nameEnglish: "Downer Cow Syndrome",
      category: "Metabolic",
      organAffected: "Musculoskeletal & Pelvic Nerves",
      cardinalSigns: "कैल्शियम की दो बोतल चढ़ाने के बाद भी पशु का उठने में असमर्थ होना; पशु सचेत रहता है, चारा-पानी खाता है परंतु पिछले पैरों में दुर्बलता से खड़ा नहीं हो पाता।",
      temperatureExpected: "सामान्य (101.0 - 102.5 °F)",
      labTests: [
        { testName: "सीरम क्रिएटिन काइनेज (CK)", sample: "सीरम", expectedResult: "मांसपेशियों के डैमेज के कारण तीव्र वृद्धि (> 5000 IU/L)" },
        { testName: "सीरम पोटेशियम व फास्फोरस", sample: "सीरम", expectedResult: "हाइपोकैलिमिया या हाइपोफॉस्फेटेमिया" }
      ],
      treatments: {
        injections: [
          "Inj. Tonophosphan 15ml I/V & I/M",
          "Inj. Tribivet (B1, B6, B12) 15ml I/M दैनिक 7 दिन",
          "Inj. Melonex 15ml I/M (इस्केमिक मसल पेन रोकने)",
          "Mifex 200ml S/C (कैल्शियम बैलेंस)"
        ],
        oral: ["Potassium Chloride 50g दैनिक", "विटामिन ई एवं सेलेनियम पाउडर"],
        ayurveda: ["अश्वगंधा चूर्ण 50g + कौंच बीज 30g तंत्रिका शक्ति हेतु"],
        homeopathy: ["Causticum 200C + Arnica 200C + Conium 200C"],
        desiRemedy: "पशु को हर 4-6 घंटे में एक करवट से दूसरी करवट पलटें। नीचे मोटा पुआल या बालू रेत बिछाएं। काउ-लिफ्टर (Cow Lifter) से दिन में दो बार सहारा देकर खड़ा करें।"
      },
      stages: {
        incubation: "मिल्क फीवर या प्रसव आघात के 24-48 घंटे बाद",
        prodromal: "उठने की असफल चेष्टा, घुटनों के बल चलना",
        clinical: "क्रीपर या अलर्ट डाउपर स्थिति, पिछले पैरों में पक्षाघात",
        convalescent: "सघन नर्सिंग केयर से 1 से 3 सप्ताह में रिकवरी"
      }
    },
    {
      id: "DIS_25_PNEUMONIA_BRD",
      nameHindi: "श्वसन तंत्र संक्रमण / निमोनिया (Bovine Respiratory Disease)",
      nameEnglish: "Bronchopneumonia / Calf Pneumonia",
      category: "Bacterial",
      organAffected: "Lungs, Bronchi & Trachea",
      cardinalSigns: "तेज सांस चलना (हांफना), सीने से घुर्र-घुर्र या सीटी जैसी आवाज (Wheezing/Rales), बलगमयुक्त खांसी, नाक से पीला मवाद जैसा स्राव व तेज बुखार।",
      temperatureExpected: "104.0 - 105.5 °F",
      labTests: [
        { testName: "चेस्ट ऑस्कल्टेशन (स्टेथोस्कोप)", sample: "फेफड़े (Thorax)", expectedResult: "क्रेपिटेशन, ब्रोंकियल सांस ध्वनि व फ्रिक्शन रब" },
        { testName: "नेजल स्वैब कल्चर", sample: "गहरा नेजल स्राव", expectedResult: "Mannheimia haemolytica / Pasteurella संवर्धन" }
      ],
      treatments: {
        injections: [
          "Inj. Ceftiofur Sodium 1g I/M SID 4 दिन अथवा Inj. Enrofloxacin 10%",
          "Inj. Flunixin Meglumine 15ml I/V (फेफड़ों की सूजन व फाइब्रिन कम करने)",
          "Inj. Avil 10ml I/M",
          "Inj. Mucolite / Bromhexine 10ml I/M (बलगम पतला करने)"
        ],
        oral: ["Kaf-Go / Pulmo-Care सिरप 50ml बीडी", "विटामिन A टॉनिक"],
        ayurveda: ["अडूसा (वासा) पत्र रस 50ml + पिप्पली चूर्ण 10g + शहद"],
        homeopathy: ["Antimonium Tartaricum 200C + Bryonia Alba 200C"],
        desiRemedy: "पशु बाड़े में नीलगिरी (Eucalyptus) तेल या अजवाइन और कपूर की भाप (Steam) दें। पशु को ठंडी हवा के झोंकों से बचाएं।"
      },
      stages: {
        incubation: "2 से 7 दिन",
        prodromal: "सूखी खांसी, नाक से पानी, भूख न लगना",
        clinical: "हांफना, बलगमयुक्त घुर्राहट, पसलियां चलना, सिर आगे खींचकर सांस लेना",
        convalescent: "एंटीबायोटिक उपचार से 7-10 दिनों में फेफड़े सामान्य"
      }
    },
    {
      id: "DIS_26_CALF_SCOURS",
      nameHindi: "बछड़ों में सफेद अतिसार (Calf Scours / Colibacillosis)",
      nameEnglish: "Calf Scours (E. coli / Rotaviral Diarrhea)",
      category: "Bacterial",
      organAffected: "Neonatal Intestines & Systemic Hydration",
      cardinalSigns: "नवजात बछड़ों में पानी जैसा सफेद-पीला बदबूदार दस्त, आंखें अंदर धंस जाना, त्वचा की लोच (Skin Turgor) खत्म होना, शरीर ठंडा पड़ना व दूध पीने से मना करना।",
      temperatureExpected: "103.0 - 104.5 °F (गंभीर डिहाइड्रेशन में सब-नॉर्मल < 100°F)",
      labTests: [
        { testName: "फेकल स्मीयर व कल्चर", sample: "मल (Feces)", expectedResult: "E. coli (K99+ एंटीजन) अथवा रोटावायरस संवर्धन" }
      ],
      treatments: {
        injections: [
          "Inj. Amikacin (5 mg/kg) I/M or Enrofloxacin 2.5 ml I/M",
          "Inj. Melonex 1.5ml I/M",
          "Inj. Tribivet 2ml I/M",
          "Dextrose Normal Saline 500-1000ml I/V या S/C (जीवन रक्षक)"
        ],
        oral: ["Bolus Biotrim 1/2 बोलस बीडी", "Electral / ORS घोल 1-2 लीटर दिनभर"],
        ayurveda: ["बेलगिरी चूर्ण 15g + ईसबगोल 10g छाछ में घोलकर"],
        homeopathy: ["Podophyllum 200C + Arsenicum Album 200C + Veratrum Album 30C"],
        desiRemedy: "मां का दूध तुरंत आधा करें। ओआरएस का पानी हर 2 घंटे पर पिलाएं। 1 चम्मच चायपत्ती का उबला पानी ठंडा करके उसमें आधा नींबू निचोड़कर दें।"
      },
      stages: {
        incubation: "12 से 36 घंटे",
        prodromal: "दूध न पीना, पेट में गुड़गुड़ाहट, सुस्ती",
        clinical: "तीव्र दस्त, गंभीर डिहाइड्रेशन, उठने में असमर्थ, ठंडा शरीर",
        convalescent: "फ्लूइड थेरेपी से 3-5 दिन में आंतों का पुनरुद्धार"
      }
    },
    {
      id: "DIS_27_FOOT_ROT",
      nameHindi: "खुर सड़न / पूति खुर (Foot Rot)",
      nameEnglish: "Infectious Pododermatitis (Foot Rot)",
      category: "Bacterial",
      organAffected: "Interdigital Skin & Hoof Matrix",
      cardinalSigns: "दोनों खुरों के बीच की चमड़ी का फटना, अत्यधिक दुर्गंधयुक्त मवाद, खुर में भयंकर सूजन व दर्द, पशु का पैर ऊपर उठाकर चलना व चरने न जाना।",
      temperatureExpected: "102.5 - 104.0 °F",
      labTests: [
        { testName: "स्मीयर माइक्रोस्कोपी", sample: "खुर के बीच का मवाद", expectedResult: "Fusobacterium necrophorum एवं Dichelobacter nodosus रॉड्स" }
      ],
      treatments: {
        injections: [
          "Inj. Ceftiofur Sodium 1g I/M SID 3 दिन अथवा Oxytetracycline LA 15ml I/M",
          "Inj. Melonex Plus 15ml I/M (अति-दर्द व सूजन निवारण)",
          "Inj. Avil 10ml I/M"
        ],
        oral: ["Zinc Sulphate बोलस (खुर की हीलिंग हेतु)"],
        ayurveda: ["नीम तेल + करंज तेल + गंधक मलहम"],
        homeopathy: ["Silicea 200C + Hepar Sulphuris 200C"],
        desiRemedy: "खुर को 5% कॉपर सल्फेट (नीला थोथा) या पोटाश के घोल से धोएं। सड़े ऊतक काटकर साफ करें। उस पर बोरिक एसिड व नेफथलीन पाउडर बांधें।"
      },
      stages: {
        incubation: "3 से 5 दिन",
        prodromal: "खुर के बीच हल्की लाली, लंगड़ाहट प्रारंभ",
        clinical: "गहरा नेक्रोटिक अल्सर, दुर्गंधित स्राव, खुर का विकृत होना",
        convalescent: "एंटीबायोटिक व ड्रेसिंग से 10-15 दिन में खुर का स्वस्थ होना"
      }
    },
    {
      id: "DIS_28_GRASS_TETANY",
      nameHindi: "घास की टिटैनी / हाइपोमैग्नीसीमिया (Grass Tetany)",
      nameEnglish: "Hypomagnesemic Tetany (Grass Tetany)",
      category: "Metabolic",
      organAffected: "Neuromuscular Synapses",
      cardinalSigns: "हरी रसीली घास चरने के बाद अचानक अत्यधिक उत्तेजना, आंखों की पुतलियां फड़कना, कान खड़े, मांसपेशियों में तीव्र मरोड़ व जमीन पर गिरकर झटके आना।",
      temperatureExpected: "सामान्य अथवा ऐंठन के कारण अत्यधिक बढ़ा (103.0 - 105.0 °F)",
      labTests: [
        { testName: "सीरम मैग्नीशियम", sample: "सीरम / विट्रियस ह्यूमर", expectedResult: "< 1.0 mg/dL (सामान्य: 1.8 - 2.4 mg/dL)" }
      ],
      treatments: {
        injections: [
          "Magnesium Sulphate 20% solution (100-200ml S/C strictly)",
          "Inj. Mifex (Calcium with Magnesium) 400ml अत्यंत धीमी गति से I/V",
          "Inj. Diazepam 5-10ml I/M (ऐंठन शांत करने हेतु)"
        ],
        oral: ["Magnesium Oxide 50g दैनिक दाने में मिलाकर"],
        ayurveda: ["लागू नहीं"],
        homeopathy: ["Cuprum Metallicum 200C + Cicuta Virosa 200C"],
        desiRemedy: "अचानक रसीली नाइट्रोजन/पोटैशियम युक्त घास बंद करें। पशु को सूखा भूसा और चोकर खिलाएं।"
      },
      stages: {
        incubation: "रसीले चारे के 2 से 7 दिन बाद",
        prodromal: "कान फड़कना, सतर्क दृष्टि, चलने में अकड़न",
        clinical: "कन्वल्शन (झटके), पैडलिंग मूवमेंट (हवा में पैर मारना), कोमा",
        convalescent: "मैग्नीशियम इंजेक्शन के 30 मिनट में ऐंठन से मुक्ति"
      }
    },
    {
      id: "DIS_29_POST_PARTURIENT_HEMOGLOBINURIA",
      nameHindi: "ब्याने के बाद लाल पेशाब (PPH)",
      nameEnglish: "Post-Parturient Hemoglobinuria (PPH)",
      category: "Metabolic",
      organAffected: "RBC Fragility & Phosphorus Metabolism",
      cardinalSigns: "ब्याने के 2 से 4 सप्ताह बाद बिना बुखार के कॉफी या गहरा लाल पेशाब आना, गंभीर रक्ताल्पता (एनीमिया), दूध का सूखना व पीलिया (चिचड़ी रहित)।",
      temperatureExpected: "सामान्य (101.0 - 102.5 °F)",
      labTests: [
        { testName: "सीरम अकार्बनिक फास्फोरस", sample: "सीरम", expectedResult: "< 1.5 - 2.0 mg/dL (गंभीर हाइपोफॉस्फेटेमिया)" },
        { testName: "ब्लड स्मीयर", sample: "रक्त", expectedResult: "हेमोपैरासाइट्स (बबेशिया) पूर्णतः अनुपस्थित" }
      ],
      treatments: {
        injections: [
          "Inj. Tonophosphan (Toldimphos Sodium) 15-20ml I/V एवं 10ml I/M 4 दिन",
          "Sodium Acid Phosphate 60-80g आई/वी ड्रिप में घोलकर धीमी गति से",
          "Inj. Feritas 10ml I/M",
          "DNS 2 लीटर I/V"
        ],
        oral: ["Sodium Acid Phosphate पाउडर 60g बीडी 5 दिन", "Sharcoferrol tonic"],
        ayurveda: ["आंवला 50g + गिलोय 50g दैनिक"],
        homeopathy: ["Phosphorus 200C + China 200C"],
        desiRemedy: "250 ग्राम पिसा हुआ उड़द का आटा + 50 ग्राम मीठा सोडा + 100 ग्राम गुड़ की कांजी बनाकर पिलाएं। बरसीम व क्रूसीफेरी हरा चारा तुरंत बंद करें।"
      },
      stages: {
        incubation: "ब्याने के 15 से 30 दिन बाद",
        prodromal: "दूध घटना, हल्का पीलापन, सुस्ती",
        clinical: "गहरा कॉफी पेशाब, 10-15% पैक्ड सेल वॉल्यूम (PCV), अत्यधिक कमजोरी",
        convalescent: "फास्फोरस थेरेपी के 3 दिन में पेशाब सामान्य; रिकवरी 15 दिन"
      }
    },
    {
      id: "DIS_30_ACIDOSIS",
      nameHindi: "रूमेन अम्लता / दाना धप पड़ना (Lactic Acidosis)",
      nameEnglish: "Acute Rumen Lactic Acidosis (Grain Overload)",
      category: "Metabolic",
      organAffected: "Rumen Microflora & Systemic pH",
      cardinalSigns: "अत्यधिक गेहूं, चावल या दाना खाने के बाद रूमेन में पानी भर जाना (Splashy Rumen), खट्टा बदबूदार पतला दस्त, तापमान गिरना, लड़खड़ाहट व डिहाइड्रेशन।",
      temperatureExpected: "सब-नॉर्मल (< 100.0 °F) अथवा सामान्य",
      labTests: [
        { testName: "रूमेन फ्लुइड pH जांच", sample: "रूमेन द्रव", expectedResult: "pH 4.0 - 5.0 (तीव्र लैक्टिक एसिडोसिस), प्रोटोजोआ मृत" }
      ],
      treatments: {
        injections: [
          "Sodium Bicarbonate 5% sterile solution I/V (एसिडोसिस रिवर्स करने)",
          "Inj. Tribivet (Thiamine B1) 15ml I/V (लैक्टिक एसिड मेटाबॉलिज्म)",
          "Inj. Flunixin Meglumine 15ml I/V (टॉक्सिन शॉक रोकने)",
          "Inj. Belamyl 10ml I/M"
        ],
        oral: ["Sodium Bicarbonate (मीठा सोडा) 100-150g गुनगुने पानी में", "Antacid suspension (Magnesium hydroxide) 500ml"],
        ayurveda: ["सौंफ 50g + मिश्री 50g का शरबत"],
        homeopathy: ["Nux Vomica 200C + Carbo Veg 200C + Antimonium Crudum 200C"],
        desiRemedy: "आपातकाल में रूमेन लैवाज (Stomach Tube डालकर पानी भरना व दाना बाहर निकालना)। स्वस्थ पशु का 2 लीटर रूमेन द्रव (Rumen Cud) छानकर पिलाएं।"
      },
      stages: {
        incubation: "अनाज खाने के 6 से 12 घंटे बाद",
        prodromal: "सुस्ती, जुगाली बंद, पेट में छप-छप पानी की आवाज",
        clinical: "खट्टा दस्त, लड़खड़ाहट, जमीन पर बैठना, गंभीर निर्जलीकरण, कोमा",
        convalescent: "रूमेन फ्लोरा पुनर्स्थापना (Cud Transfaunation) से 4-7 दिन में सुधार"
      }
    },
    {
      id: "DIS_31_ALKALOSIS",
      nameHindi: "रूमेन क्षारीयता / यूरिया विषाक्तता (Rumen Alkalosis)",
      nameEnglish: "Rumen Alkalosis (Urea Toxicity)",
      category: "Metabolic",
      organAffected: "Rumen & Nervous System",
      cardinalSigns: "यूरिया या अत्यधिक सड़ा हुआ प्रोटीन खाने के बाद तेज बेचैनी, मुंह से अत्यधिक झागदार लार, मांसपेशियों में कंपकंपी, तेज सांस, रूमेन का pH 8 से ऊपर जाना।",
      temperatureExpected: "सामान्य अथवा मस्कुलर ट्रेमर्स से बढ़ा (102.5 - 104.0 °F)",
      labTests: [
        { testName: "रूमेन फ्लुइड pH", sample: "रूमेन द्रव", expectedResult: "pH > 7.5 - 8.5 (अत्यधिक क्षारीय), अमोनिया गंध" }
      ],
      treatments: {
        injections: [
          "Inj. Spasmo-Vet 15ml I/M",
          "Inj. Tribivet 10ml I/M",
          "Calcium Borogluconate 200ml S/C (टेटेनी से बचाव)",
          "DNS 2-3 लीटर I/V"
        ],
        oral: ["सिरका (Acetic acid 5%) 1 से 2 लीटर + 2-3 लीटर ठंडा पानी तुरंत ओरल drench"],
        ayurveda: ["नींबू रस 500ml पानी में घोलकर"],
        homeopathy: ["Aceticum Acidum 200C + Camphora 200C"],
        desiRemedy: "तुरंत 1 से 2 बोतल जामुन या गन्ने का सिरका ठंडे पानी में मिलाकर नाल से पिलाएं ताकि रूमेन की अमोनिया न्यूट्रलाइज हो सके।"
      },
      stages: {
        incubation: "यूरिया खाने के 15 से 45 मिनट भीतर (अति-तीव्र)",
        prodromal: "बेचैनी, डकार आना, मांसपेशियों में कंपकंपी",
        clinical: "झागदार लार, पेट फूलना, चक्कर, सांस का रुकना, पतन",
        convalescent: "सिरका समय पर मिलने पर 2-4 घंटे में संकट मुक्त"
      }
    },
    {
      id: "DIS_32_IBR",
      nameHindi: "संक्रामक गोजातीय राइनोट्रैकाइटिस (IBR)",
      nameEnglish: "Infectious Bovine Rhinotracheitis (Red Nose)",
      category: "Viral",
      organAffected: "Upper Respiratory Tract & Conjunctiva",
      cardinalSigns: "नाक के नथुने अंदर से अत्यधिक लाल (Red Nose), नाक व आंखों से गंभीर मवाद जैसा स्राव बहना, तेज बुखार (105°F), श्वसन कष्ट, खाँसी व गर्भपात।",
      temperatureExpected: "104.5 - 106.0 °F",
      labTests: [
        { testName: "पीसीआर (PCR) / ELISA", sample: "नेजल स्वैब / सीरम", expectedResult: "Bovine Herpesvirus-1 (BHV-1) पॉजिटिव पुष्टि" }
      ],
      treatments: {
        injections: [
          "Inj. Ceftiofur Sodium 1g I/M SID 4 दिन (सेकेंडरी बैक्टीरिया रोकथाम)",
          "Inj. Flunixin Meglumine 15ml I/V (श्वसन सूजन निवारण)",
          "Inj. Avil 10ml I/M",
          "Inj. Conciplex / Vit-A 10ml I/M"
        ],
        oral: ["विटामिन C चूर्ण 10g दैनिक", "Kaf-Go सिरप 50ml बीडी"],
        ayurveda: ["तुलसी, वासा व मुलेठी का काढ़ा शहद मिलाकर"],
        homeopathy: ["Aconitum Napellus 200C + Euphrasia 200C"],
        desiRemedy: "नाक के लाल नथुनों पर ग्लिसरीन व बोरिक एसिड का लेप करें। आंखों को बोरिक लोशन से धोएं।"
      },
      stages: {
        incubation: "3 से 7 दिन",
        prodromal: "अचानक तेज बुखार, आंख-नाक से पानी, डिप्रेशन",
        clinical: "नथुनों पर नेक्रोटिक झिल्ली, रेड नोज, डिस्पेनिया, गर्भपात",
        convalescent: "वायरल चरण 10-14 दिन; पशु में वायरस आजीवन सुप्त (Latent) रहता है"
      }
    },
    {
      id: "DIS_33_ACTINOMYCOSIS",
      nameHindi: "जबड़े की हड्डी का रोग / लंपी जॉ (Actinomycosis)",
      nameEnglish: "Actinomycosis (Lumpy Jaw)",
      category: "Bacterial",
      organAffected: "Mandible & Maxilla Bones",
      cardinalSigns: "निचले जबड़े की हड्डी पर पत्थर जैसी अत्यंत कठोर, दर्दहीन, अचल सूजन; बाद में छिद्र बनकर पीला चिपचिपा मवाद निकलना जिसमें सल्फर जैसे दाने (Sulphur Granules) हों।",
      temperatureExpected: "सामान्य (101.5 - 102.5 °F)",
      labTests: [
        { testName: "मवाद का सूक्ष्मदर्शी परीक्षण", sample: "सल्फर ग्रेन्यूल्स", expectedResult: "ग्राम पॉजिटिव फिलामेंटस रॉड्स व क्लब-शेप बैक्टीरिया (Actinomyces bovis)" }
      ],
      treatments: {
        injections: [
          "Inj. Streptomycin 2.5g to 5g I/M SID 10-14 दिन",
          "Inj. Sodium Iodide 10% solution (1g per 12kg) I/V एकल खुराक, 10 दिन बाद दोहराएं",
          "Inj. Melonex 15ml I/M"
        ],
        oral: ["Potassium Iodide 5-10g दैनिक मुख से 2 सप्ताह (आयोडीन विषाक्तता तक)"],
        ayurveda: ["कचनार गुग्गुलु 5 बोलस बीडी (अस्थि विद्रधि हेतु)"],
        homeopathy: ["Hekla Lava 3X / 6X + Silicea 200C + Symphytum 200C"],
        desiRemedy: "खुले फिस्टुला को टिंचर आयोडीन में भिगोई गॉज पट्टी से पैक करें। कठोर चारा बंद कर दलिया दें।"
      },
      stages: {
        incubation: "महीनों में धीरे-धीरे विकसित",
        prodromal: "जबड़े पर छोटी कठोर गिल्टी, चबाने में हल्का संकोच",
        clinical: "हड्डी का विरुपण, दांत हिलना, मवाद के फिस्टुला, वजन घटना",
        convalescent: "हड्डी की विकृति स्थाई रह सकती है; संक्रमण शांत होने में 1 माह"
      }
    },
    {
      id: "DIS_34_ACTINOBACILLOSIS",
      nameHindi: "काष्ठ जीभ / लकड़ी जैसी जीभ (Wooden Tongue)",
      nameEnglish: "Actinobacillosis (Wooden Tongue)",
      category: "Bacterial",
      organAffected: "Tongue & Soft Tissues of Pharynx",
      cardinalSigns: "जीभ का सूजकर लकड़ी की भांति सख्त व मोटी हो जाना, जीभ मुंह से बाहर लटकना, छूने पर कड़ापन, मुंह से निरंतर लार बहना व चारा चबाने में असमर्थता।",
      temperatureExpected: "सामान्य अथवा हल्का बढ़ा (102.0 - 103.5 °F)",
      labTests: [
        { testName: "बायोप्सी एवं मवाद स्मीयर", sample: "जीभ का स्राव", expectedResult: "Gram-negative pleomorphic bacilli (Actinobacillus lignieresii)" }
      ],
      treatments: {
        injections: [
          "Inj. Sodium Iodide 10% (1g/12kg body wt) I/V अत्यंत धीमी गति से",
          "Inj. Oxytetracycline LA 20 mg/kg I/M SID 3-5 दिन",
          "Inj. Melonex Plus 15ml I/M"
        ],
        oral: ["Potassium Iodide पाउडर 5g दैनिक ओरल 10 दिन"],
        ayurveda: ["त्रिफला व हल्दी का लेप जीभ पर"],
        homeopathy: ["Mercurius Bin Iodatus 30C + Kali Iodatum 200C"],
        desiRemedy: "जीभ को 1% फिटकरी के गुनगुने पानी से दिन में दो बार साफ करें। पशु को मुलायम दलिया व हरा चारा काटकर खिलाएं।"
      },
      stages: {
        incubation: "1 से 3 सप्ताह",
        prodromal: "लार गिरना, जीभ हिलाने में संकोच",
        clinical: "जीभ का कठोर काठ बनना, अल्सर, मुंह बंद न हो पाना, भुखमरी",
        convalescent: "सोडियम आयोडाइड चिकित्सा के 48 घंटे में जीभ मुलायम होना शुरू"
      }
    },
    {
      id: "DIS_35_TRP_HARDWARE",
      nameHindi: "हार्डवेयर रोग / सुई चुभना (TRP)",
      nameEnglish: "Traumatic Reticuloperitonitis (TRP / Hardware Disease)",
      category: "Mechanical",
      organAffected: "Reticulum, Peritoneum & Pericardium",
      cardinalSigns: "लोहे की तार या कील निगलने से रेटिकुलम में छेद; पशु का पीठ सिकोड़कर धनुष जैसा खड़ा होना, कोहनी बाहर फैलाना, दबाव देने पर दर्द से कराहना (Grunt test positive)।",
      temperatureExpected: "102.5 - 104.0 °F (पेरिटोनिटिस में)",
      labTests: [
        { testName: "विदर्स पिंच टेस्ट (Withers Pinch Test)", sample: "पीठ की त्वचा दबाना", expectedResult: "पशु का पीठ नीचे झुकाने से इंकार व कराहना (Grunt)" },
        { testName: "मेटल डिटेक्टर जांच", sample: "रेटिकुलर क्षेत्र", expectedResult: "विदेशी धातु वस्तु की उपस्थिति का बीप संकेत" }
      ],
      treatments: {
        injections: [
          "Inj. Ceftriaxone-Tazobactam 4.5g I/M SID 5 दिन (पेरिटोनिटिस नियंत्रण)",
          "Inj. Melonex 15ml I/M",
          "Inj. Belamyl 10ml I/M",
          "सर्जरी: रूमिनोटॉमी (Ruminotomy) द्वारा धातु निकालना"
        ],
        oral: ["पेट में चुंबक (Rumen Magnet) निगलवाना", "लिक्विड पैराफिन"],
        ayurveda: ["लागू नहीं"],
        homeopathy: ["Arnica Montana 200C + Hepar Sulph 200C + Silicea (चेतावनी: सिलिशिया न दें यदि धातु फंसी हो)"],
        desiRemedy: "पशु के अगले पैरों को पिछले पैरों की तुलना में 6 से 8 इंच ऊंचे चबूतरे पर बांधें ताकि धातु फेफड़ों व दिल की ओर न चुभे।"
      },
      stages: {
        incubation: "तार चुभने के 24-48 घंटे बाद",
        prodromal: "अचानक दूध घटना, हल्का अफारा, चलने में सतर्कता",
        clinical: "कराहना, आर्च्ड बैक (धनुषाकार पीठ), जुगुलर पल्स, पेरीकार्डाइटिस",
        convalescent: "रूमिनोटॉमी अथवा चुंबक द्वारा 1-2 सप्ताह में स्थिरीकरण"
      }
    },
    {
      id: "DIS_36_METRITIS_PYOMETRA",
      nameHindi: "गर्भाशय शोध / मवाद पड़ना (Metritis / Pyometra)",
      nameEnglish: "Septic Metritis & Pyometra",
      category: "Obstetric",
      organAffected: "Uterine Endometrium & Myometrium",
      cardinalSigns: "योनि से लगातार बदबूदार सफेद, पीला या मटमैला मवाद बहना, बार-बार पूंछ उठाना, भूख न लगना, दूध में कमी व बार-बार मद (Heat) में न आना।",
      temperatureExpected: "102.5 - 104.0 °F (एक्यूट मेट्राइटिस में); पायोमेट्रा में सामान्य",
      labTests: [
        { testName: "रेक्टल पाल्पेशन", sample: "गर्भाशय", expectedResult: "गर्भाशय के सींगों का असमान आकार, द्रव से भरा होना, डोनट जैसी अनुभूति" },
        { testName: "यूटराइन डिस्चार्ज साइटोलॉजी", sample: "मवाद", expectedResult: "अत्यधिक न्यूट्रोफिल्स व बैक्टीरिया" }
      ],
      treatments: {
        injections: [
          "Inj. Cloprostenol (Pragma) 2ml I/M (सर्विक्स खोलने व मवाद निकालने हेतु)",
          "Inj. Ceftriaxone-Tazobactam 4.5g I/M SID 3-5 दिन",
          "Inj. Melonex Plus 15ml I/M",
          "इंट्रा-यूटराइन: Utrovet / Lixen IU (Cephalexin) गर्भाशय खाली होने के बाद"
        ],
        oral: ["Uterotone liquid 100ml बीडी 5 दिन", "Sepia बोलस"],
        ayurveda: ["उलटकंबल, लोध्र व नीम छाल का काढ़ा"],
        homeopathy: ["Pulsatilla 200C + Sepia 200C + Silicea 30C"],
        desiRemedy: "250 ग्राम पुराना गुड़ + 50 ग्राम अजवाइन + 20 ग्राम सोंठ + 25 ग्राम हल्दी का काढ़ा 5 दिन तक रोज सुबह खाली पेट पिलाएं।"
      },
      stages: {
        incubation: "प्रसव के 5 दिन से 4 सप्ताह भीतर",
        prodromal: "योनि से मटमैला बदबूदार पानी रिसना",
        clinical: "प्रचुर मवाद, कॉर्पस ल्यूटियम का बना रहना (पायोमेट्रा), बांझपन",
        convalescent: "पीजीएफ2-अल्फा से मवाद निकासी उपरांत 2-3 चक्रों में गर्भाशय शुद्ध"
      }
    },
    {
      id: "DIS_37_REPEAT_BREEDING",
      nameHindi: "बार-बार फिरना (Repeat Breeding Syndrome)",
      nameEnglish: "Repeat Breeding Syndrome",
      category: "Reproductive",
      organAffected: "Ovaries, Oviduct & Endometrium",
      cardinalSigns: "गाय/भैंस का प्रत्येक 21 दिन पर नियमित मद में आना, स्वस्थ दिखना, अच्छी गुणवत्ता के सीमन से ए.आई. के बावजूद गर्भधारण न होना (3 या अधिक बार)।",
      temperatureExpected: "सामान्य (101.5 - 102.5 °F)",
      labTests: [
        { testName: "गर्भाशय स्राव जांच (White Side Test)", sample: "मद की तार (Cervical Mucus)", expectedResult: "5% NaOH से गर्म करने पर पीला रंग (सब-क्लिनिकल एंडोमेट्राइटिस)" },
        { testName: "ट्रांस-रेक्टल अल्ट्रासोनोग्राफी (USG)", sample: "अंडाशय व गर्भाशय", expectedResult: "ओव्यूलेशन विफलता या ल्यूटियल अपर्याप्तता" }
      ],
      treatments: {
        injections: [
          "ए.आई. (A.I.) के समय: Inj. Buserelin Acetate (Gynarich / Receptal) 2.5ml I/M",
          "ए.आई. के 4-6 दिन बाद: Inj. Duraprogen (Hydroxyprogesterone) 500mg I/M",
          "यदि सब-क्लिनिकल मेट्राइटिस हो: मद में Inj. Gentamicin 4ml Intrauterine"
        ],
        oral: ["Chelated Mineral Mixture 50g दैनिक", "Bolus Fertisule / CoFeCu"],
        ayurveda: ["शिवलिंगी बीज चूर्ण 10g + पुत्रजीवक 10g दैनिक"],
        homeopathy: ["Folliculinum 200C + Pulsatilla 200C + Aletris Farinosa Q"],
        desiRemedy: "सीमन डलवाने के सही समय का पालन: 'सुबह मद में आए तो शाम को सीमन, शाम को आए तो अगली सुबह (AM-PM Rule)'। मद की तार शीशे जैसी पारदर्शी होनी चाहिए।"
      },
      stages: {
        incubation: "प्रत्येक 18-24 दिन पर पुनरावृत्ति",
        prodromal: "सामान्य मद लक्षण परंतु गर्भाशय में सूक्ष्म सूजन",
        clinical: "निषेचन विफलता अथवा प्रारंभिक भ्रूण मृत्यु (Early Embryonic Death)",
        convalescent: "हार्मोनल व खनिज चिकित्सा उपरांत सफल गर्भधारण"
      }
    },
    {
      id: "DIS_38_FOLLICULAR_CYST",
      nameHindi: "पुटीय अंडाशय / कामोन्माद (Follicular Cyst)",
      nameEnglish: "Cystic Ovarian Disease (Nymphomania)",
      category: "Reproductive",
      organAffected: "Graafian Follicles (Ovary)",
      cardinalSigns: "गाय का बार-बार या लगातार मद के लक्षण दिखाना (Nymphomania), सांड की भांति दूसरे पशुओं पर चढ़ना, रंभाना, पुट्ठे के लिगामेंट्स ढीले पड़ जाना व पूंछ उठी रहना।",
      temperatureExpected: "सामान्य (101.5 - 102.5 °F)",
      labTests: [
        { testName: "रेक्टल पाल्पेशन / USG", sample: "अंडाशय", expectedResult: "अंडाशय पर 2.5 सेमी से बड़ा, पतली दीवार वाला पुटीय पिंड (> 10 दिन तक स्थायी)" }
      ],
      treatments: {
        injections: [
          "Inj. Buserelin Acetate (GnRH) 5ml (20 mcg) I/M एकल खुराक अथवा",
          "Inj. Chorionic Gonadotrophin (hCG / Chorulon) 3000 to 5000 IU I/V",
          "9 दिन बाद: Inj. Cloprostenol 2ml I/M (ल्यूटिनाइज्ड सिस्ट को तोड़ने)"
        ],
        oral: ["Minfa Gold / Chelated खनिज मिश्रण 50g दैनिक"],
        ayurveda: ["अशोक छाल क्वाथ 100ml"],
        homeopathy: ["Platinum Metallicum 200C + Apis Mellifica 200C + Lachesis 200C"],
        desiRemedy: "पुटी को हाथ से दबाकर फोड़ने (Manual Rupture) की गलती कदापि न करें (रक्तस्राव व ओवेरियन एडहेशन का खतरा)। संतुलित मिनरल दें।"
      },
      stages: {
        incubation: "ब्याने के 30 से 60 दिन बाद",
        prodromal: "मद चक्र का अनियमित होना (कम अंतराल पर मद)",
        clinical: "लगातार हीट में रहना, नम्फोमेनिया, पेल्विक लिगामेंट्स का धंसना",
        convalescent: "जीएनआरएच चिकित्सा के 10-14 दिन में सामान्य चक्र बहाली"
      }
    },
    {
      id: "DIS_39_LUTEAL_CYST",
      nameHindi: "ल्यूटियल सिस्ट / मदहीनता (Luteal Cyst)",
      nameEnglish: "Luteal Cyst (Cystic Corpora Lutea)",
      category: "Reproductive",
      organAffected: "Corpus Luteum (Ovary)",
      cardinalSigns: "गाय या भैंस का लंबे समय तक मद (Heat) में बिल्कुल न आना (Anoestrus), शांत रहना, अंडाशय पर मोटी दीवार वाली पुटी का स्थायी रूप से बने रहना।",
      temperatureExpected: "सामान्य (101.5 - 102.5 °F)",
      labTests: [
        { testName: "रेक्टल अल्ट्रासाउंड (USG)", sample: "अंडाशय", expectedResult: "मोटी ल्यूटिनाइज्ड दीवार (> 3mm) वाली गुहा युक्त सिस्ट" },
        { testName: "दूध प्रोजेस्टेरोन परीक्षण", sample: "दूध", expectedResult: "लगातार उच्च प्रोजेस्टेरोन स्तर (> 5 ng/ml)" }
      ],
      treatments: {
        injections: [
          "Inj. Cloprostenol Sodium (PGF2-alpha - Pragma / Lutalyse) 2ml I/M",
          "48 से 72 घंटे में सिस्ट घुलकर पशु सामान्य मद में आएगा",
          "मद आने पर: Inj. Receptal 2.5ml I/M ए.आई. के समय"
        ],
        oral: ["Bolus Cyclomin / Janova 2 बोलस दैनिक 2 दिन"],
        ayurveda: ["कपासिया (बिनौला) गिरी + सौंठ"],
        homeopathy: ["Sepia 200C + Pulsatilla 200C"],
        desiRemedy: "अंकुरित गेहूं 250 ग्राम प्रतिदिन 10 दिन तक खिलाएं (विटामिन E प्राकृतिक स्रोत)।"
      },
      stages: {
        incubation: "प्रसव उपरांत 2 से 4 माह",
        prodromal: "समय पर मद में न आना",
        clinical: "पूर्ण मदहीनता (True Anoestrus), गर्भाशय में शिथिलता",
        convalescent: "पीजीएफ2-अल्फा इंजेक्शन के 3-4 दिन में मद प्राकट्य"
      }
    },
    {
      id: "DIS_40_RINGWORM",
      nameHindi: "दाद / रिंगवर्म (Ringworm / Dermatophytosis)",
      nameEnglish: "Dermatophytosis (Ringworm)",
      category: "Fungal",
      organAffected: "Skin, Hair Follicles (Face & Neck)",
      cardinalSigns: "आंखों के चारों ओर, चेहरे व गर्दन पर गोल-गोल, बिना बालों वाले, सफेद-भूरे पपड़ीदार चकत्ते (Asbestos-like crusts); खुजली नगण्य या हल्की होना।",
      temperatureExpected: "सामान्य (101.5 - 102.5 °F)",
      labTests: [
        { testName: "KOH माउंट माइक्रोस्कोपी", sample: "चकत्ते के बाल व त्वचा खुरचन", expectedResult: "10% KOH में फंगल हाइफी व आर्थ्रोस्पोर्स की उपस्थिति" },
        { testName: "वुड्स लैंप परीक्षण", sample: "संक्रमित त्वचा", expectedResult: "हरा प्रतिदीप्ति फ्लोरेसेंस (Microsporum में)" }
      ],
      treatments: {
        injections: [
          "Inj. Ivermectin 1ml/50kg S/C (सपोर्ट हेतु)",
          "Inj. Conciplex / Vit-A 10ml I/M (उपकला पुनर्जनन हेतु)"
        ],
        oral: ["Griseofulvin पाउडर (गंभीर बछड़ों में)"],
        ayurveda: ["नीम तेल + शुद्ध गंधक + कपूर मलहम"],
        homeopathy: ["Tellurium 200C + Chrysarobinum 30C + Bacillinum 200C"],
        desiRemedy: "चकत्तों की पपड़ी को साबुन पानी से रगड़कर साफ करें। उस पर टिंचर आयोडीन या सैलिसिलिक एसिड मलहम दिन में दो बार लगाएं।"
      },
      stages: {
        incubation: "1 से 4 सप्ताह",
        prodromal: "बालों का झड़ना, गोल छोटे चकत्ते",
        clinical: "एस्बेस्टस जैसी मोटी राख रंग की पपड़ी, चकत्तों का विस्तार",
        convalescent: "पपड़ी हटना, 4-8 सप्ताह में नए बालों का उगना"
      }
    },
    {
      id: "DIS_41_MANGE",
      nameHindi: "खाज-खुजली / मेंज (Mange / Scabies)",
      nameEnglish: "Mange (Sarcoptic / Psoroptic Acariasis)",
      category: "Parasitic",
      organAffected: "Epidermis & Dermis",
      cardinalSigns: "गर्दन, पूंछ के आधार व जांघों पर असहनीय खुजली, पशु का खंभों से रगड़ना, त्वचा का चमड़े जैसा मोटा, झुर्रीदार व बालों से रहित हो जाना; पपड़ी जमना।",
      temperatureExpected: "सामान्य (101.5 - 102.5 °F)",
      labTests: [
        { testName: "गहरी त्वचा खुरचन (Deep Skin Scraping)", sample: "रक्त निकलने तक खुरचन", expectedResult: "10% KOH में Sarcoptes scabiei अथवा Psoroptes माइट्स" }
      ],
      treatments: {
        injections: [
          "Inj. Ivermectin 1% (1 ml per 50 kg) Subcutaneous strictly, 14 दिन बाद दोहराएं",
          "Inj. Avil 10ml I/M (असहनीय खुजली शमन)"
        ],
        oral: ["सल्फर युक्त चूर्ण"],
        ayurveda: ["करंज तेल (Karanj oil) + कपूर बाह्य मालिश"],
        homeopathy: ["Psorinum 200C + Sulphur 200C + Graphites 200C"],
        desiRemedy: "अमित्रराज (Amitraz 12.5%) 2-4 मिली प्रति लीटर पानी में घोलकर पूरे शरीर पर ब्रश से लगाएं। पशु को चाटने न दें। 7 दिन बाद दोहराएं।"
      },
      stages: {
        incubation: "10 से 14 दिन",
        prodromal: "हल्की खुजली, छोटे लाल दाने",
        clinical: "गंभीर खाल का मोटा होना, फटना, असहनीय खुजली से जख्म",
        convalescent: "माइट्स खात्मे के उपरांत 3-4 सप्ताह में त्वचा का कोमल होना"
      }
    },
    {
      id: "DIS_42_LIVER_FLUKE",
      nameHindi: "लिवर फ्लूक / यकृत पर्णकृमि (Fascioliasis)",
      nameEnglish: "Fascioliasis (Liver Fluke Disease)",
      category: "Parasitic",
      organAffected: "Liver, Bile Ducts & Portal System",
      cardinalSigns: "जबड़े के नीचे पानी की थैली जैसी लटकती सूजन (Bottle Jaw / Submandibular Edema), पुराना पतला दस्त, अत्यधिक कमजोरी, पीलिया व वजन घटना (विशेषकर नहर किनारे चरने वाले पशु)।",
      temperatureExpected: "सामान्य (101.5 - 102.5 °F)",
      labTests: [
        { testName: "गोबर अवसादन परीक्षण (Sedimentation)", sample: "ताजा गोबर", expectedResult: "सुनहरे-भूरे रंग के ढक्कनदार (Operculated) Fasciola gigantica अंडे" },
        { testName: "सीरम एल्ब्यूमिन व बिलीरुबिन", sample: "सीरम", expectedResult: "गंभीर हाइपोएल्ब्यूमिनेमिया (< 2.0 g/dL)" }
      ],
      treatments: {
        injections: [
          "Inj. Closantel (10 mg/kg) S/C अथवा Nitroxynil (10 mg/kg) S/C",
          "Inj. Feritas 10ml I/M (एनीमिया रिकवरी)",
          "Inj. Belamyl 10ml I/M (लिवर फंक्शन बहाली)"
        ],
        oral: ["Oxyclozanide + Levamisole (Nilzan) 15-20ml प्रति 50kg मुख द्वारा", "Triclabendazole 12 mg/kg"],
        ayurveda: ["वायविडंग (Vidanga) 30g + कालमेघ 30g चूर्ण"],
        homeopathy: ["Lycopodium 200C + Chelidonium Majus 30C"],
        desiRemedy: "पशु को तालाब/नहर के दलदली किनारों पर न चरने दें (घोंघे/Snails मध्यस्थ पोषक हैं)। ताजी हरी घास सुखाकर खिलाएं।"
      },
      stages: {
        incubation: "सिस्ट निगलने के 6 से 12 सप्ताह बाद",
        prodromal: "धीमी कमजोरी, भूख में अनियमितता",
        clinical: "बॉटल जॉ (जबड़े नीचे सूजन), एनीमिया, पीलापन, जलशोथ",
        convalescent: "फ्लूसाइड दवा के बाद 2-3 सप्ताह में बॉटल जॉ का अवशोषण"
      }
    },
    {
      id: "DIS_43_AMPHISTOMIASIS",
      nameHindi: "पेट के पिठुए कृमि (Amphistomiasis)",
      nameEnglish: "Paramphistomosis (Immature Amphistomiasis)",
      category: "Parasitic",
      organAffected: "Duodenum & Rumen Papillae",
      cardinalSigns: "अपरिपक्व कृमियों द्वारा ग्रहणी में छेद; भयंकर बदबूदार पानी जैसा खूनी दस्त, जबड़े के नीचे सूजन (Bottle jaw), निर्जलीकरण व बिना बुखार पशु का बैठ जाना।",
      temperatureExpected: "सामान्य अथवा सब-नॉर्मल (< 101.0 °F)",
      labTests: [
        { testName: "गोबर सूक्ष्मदर्शी जांच", sample: "पतला दस्त", expectedResult: "हजारों की संख्या में गुलाबी रंग के अपरिपक्व एम्फिस्टोम कृमि तैरते हुए" }
      ],
      treatments: {
        injections: [
          "Inj. Melonex 15ml I/M",
          "Inj. Tribivet 10ml I/M",
          "Dextrose Normal Saline 2 से 3 लीटर I/V (गंभीर डिहाइड्रेशन रोकने)"
        ],
        oral: ["Oxyclozanide drench (Nilzan) 15 mg/kg body weight (3 दिन बाद पुनः दोहराएं)"],
        ayurveda: ["कुटज छाल क्वाथ 100ml दस्त रोकने हेतु"],
        homeopathy: ["Merc Cor 200C + Cinchona 200C"],
        desiRemedy: "चावल की कांजी में नमक व ईसबगोल की भूसी मिलाकर दिन में 3 बार पिलाएं। घोंघा नियंत्रण हेतु कॉपर सल्फेट का छिड़काव।"
      },
      stages: {
        incubation: "3 से 6 सप्ताह",
        prodromal: "हल्की सुस्ती, भूख में कमी",
        clinical: "अति-तीव्र दस्त, गंभीर रक्ताल्पता, हाइपोप्रोटीनीमिया, बोतल जबड़ा",
        convalescent: "ऑक्सीक्लोजेनाइड से कृमि निष्कासन उपरांत 10-15 दिन में सामान्य"
      }
    },
    {
      id: "DIS_44_TAPEWORM",
      nameHindi: "फीताकृमि संक्रमण (Cestodiasis / Monieziasis)",
      nameEnglish: "Monieziasis (Tapeworm Infection in Calves)",
      category: "Parasitic",
      organAffected: "Small Intestines (Calves & Lambs)",
      cardinalSigns: "बछड़ों व मेमनों के गोबर में सफेद चावल के दाने या फीते जैसे खंड (Proglottids) निकलना, पेट मटके जैसा फूलना (Pot-bellied), सूखा खुरदुरा रूंआं व वृद्धि रुकना।",
      temperatureExpected: "सामान्य (101.5 - 102.5 °F)",
      labTests: [
        { testName: "गोबर परीक्षण", sample: "गोबर", expectedResult: "Moniezia expansa / benedeni के त्रिकोणीय या चौकोर अंडे" }
      ],
      treatments: {
        injections: ["Inj. Tribivet 5ml I/M", "Inj. Belamyl 5ml I/M"],
        oral: [
          "Albendazole 10% suspension (7.5 to 10 mg/kg) मुख द्वारा अथवा",
          "Praziquantel / Niclosamide bolus (100 mg/kg)"
        ],
        ayurveda: ["पलाश के बीज (Palash beej) चूर्ण 10g खाली पेट"],
        homeopathy: ["Cina 200C + Teucrium 200C + Granatum Q"],
        desiRemedy: "कद्दू के बीज (Pumpkin seeds) पीसकर 50 ग्राम सुबह खाली पेट 3 दिन तक दें (प्राकृतिक फीताकृमि नाशक)।"
      },
      stages: {
        incubation: "माइट्स खाने के 30 से 45 दिन बाद",
        prodromal: "धीमी वृद्धि, अपच",
        clinical: "गोबर में फीते के टुकड़े, मटका पेट, डायरिया, आंतों में रुकावट",
        convalescent: "कृमिनाशक के 24 घंटे में फीताकृमि का पूर्ण निष्कासन"
      }
    },
    {
      id: "DIS_45_HAEMONCHOSIS",
      nameHindi: "तार कृमि / पेट के गोलकृमि (Haemonchosis)",
      nameEnglish: "Haemonchosis (Barber's Pole Worm)",
      category: "Parasitic",
      organAffected: "Abomasum & Blood Stream",
      cardinalSigns: "भेड़, बकरियों व बछड़ों में अत्यधिक रक्ताल्पता (आंखों व मसूड़ों का सफेद कागज जैसा होना), जबड़े नीचे सूजन, बिना दस्त के भीषण दुर्बलता व अचानक मौत।",
      temperatureExpected: "सामान्य (101.5 - 102.5 °F)",
      labTests: [
        { testName: "FAMACHA आई कलर चार्ट स्कोर", sample: "आंख की निचली कंजंक्टिवा", expectedResult: "स्कोर 4 या 5 (गंभीर रक्ताल्पता - सफेद म्यूकोसा)" },
        { testName: "फेकल एग काउंट (McMaster)", sample: "गोबर", expectedResult: "> 2000 EPG (Eggs Per Gram - Haemonchus contortus)" }
      ],
      treatments: {
        injections: [
          "Inj. Closantel 10% (10 mg/kg) S/C strictly",
          "Inj. Ivermectin 1ml/50kg S/C",
          "Inj. Feritas 5-10ml I/M (आयरन थेरेपी)"
        ],
        oral: ["Levamisole drench 7.5 mg/kg अथवा Fenbendazole 10 mg/kg"],
        ayurveda: ["बायबिडंग चूर्ण 20g + नीम पत्ती काढ़ा"],
        homeopathy: ["Ferrum Metallicum 200C + China 200C"],
        desiRemedy: "चराई का समय बदलें (सुबह ओस के समय घास पर कीड़े ऊपर चढ़ते हैं, धूप निकलने के बाद ही चराएं)।"
      },
      stages: {
        incubation: "लार्वा चरने के 14 से 21 दिन बाद",
        prodromal: "कमजोरी, ऊन/बाल झड़ना",
        clinical: "सफेद आंखें, जबड़े नीचे पानी की थैली, गंभीर रक्ताल्पता, मृत्यु",
        convalescent: "डिवर्मिंग के उपरांत आयरन व प्रोटीन से 1 माह में स्वास्थ्य लाभ"
      }
    },
    {
      id: "DIS_46_NITRATE_TOXICITY",
      nameHindi: "नाइट्रेट-नाइट्राइट विषाक्तता (Nitrate Toxicity)",
      nameEnglish: "Nitrate / Nitrite Poisoning",
      category: "Toxic",
      organAffected: "Hemoglobin (Methemoglobinemia)",
      cardinalSigns: "अत्यधिक यूरिया खाद युक्त हरा चारा (जई/बाजरा) खाने के बाद रक्त का रंग चॉकलेट जैसा भूरा होना (Chocolate brown blood), दम घुटना, कंपकंपी व अचानक गिरना।",
      temperatureExpected: "सामान्य अथवा सब-नॉर्मल (< 101.0 °F)",
      labTests: [
        { testName: "रक्त रंग दृश्य परीक्षण", sample: "जुगुलर रक्त", expectedResult: "हवा में रखने पर भी रक्त का रंग चॉकलेटी भूरा (Methemoglobin)" }
      ],
      treatments: {
        injections: [
          "एंटीडोट: Methylene Blue 1% solution (1 to 2 mg/kg body weight) I/V अत्यंत धीमी गति से",
          "Inj. Dextrose 25% 1000ml I/V",
          "Inj. Ascorbic Acid (Vitamin C) 10-20ml I/V (एंटीऑक्सीडेंट रिडक्शन)"
        ],
        oral: ["Mineral oil 1 लीटर ओरल (अवशोषण धीमा करने)"],
        ayurveda: ["लागू नहीं"],
        homeopathy: ["Carbo Veg 200C + Camphora 200C"],
        desiRemedy: "पशु को तुरंत छाया में लिटाएं। किसी भी प्रकार का संदेहास्पद चारा तुरंत हटा दें। ताजा ठंडा पानी उपलब्ध कराएं।"
      },
      stages: {
        incubation: "चारा खाने के 1 से 4 घंटे भीतर (अति-तीव्र)",
        prodromal: "तेज सांस, लार गिरना, बेचैनी",
        clinical: "सायनोसिस, चॉकलेटी रक्त, अनियंत्रित कंपकंपी, एस्फिक्सिया (दम घुटना)",
        convalescent: "मेथिलीन ब्लू इंजेक्शन के 15-30 मिनट में चमत्कारिक सुधार"
      }
    },
    {
      id: "DIS_47_CYANIDE_TOXICITY",
      nameHindi: "धुरिन / साइनाइड विषाक्तता (Cyanide / HCN Toxicity)",
      nameEnglish: "Hydrocyanic Acid (HCN) / Prussic Acid Toxicity",
      category: "Toxic",
      organAffected: "Cellular Cytochrome Oxidase & Respiration",
      cardinalSigns: "सूखे के बाद नई फूटी कच्ची ज्वार (Chari) खाने के 15 मिनट में रक्त का रंग सुर्ख चेरी लाल (Cherry-red blood) होना, सांस फूलना, मुंह से बादाम जैसी गंध, आंखें फटी रहना व मौत।",
      temperatureExpected: "सामान्य अथवा सब-नॉर्मल",
      labTests: [
        { testName: "पिकरेट पेपर टेस्ट (Guignard Test)", sample: "रूमेन सामग्री", expectedResult: "पीला पेपर गहरा ईंट जैसा लाल होना (HCN गैस की पुष्टि)" }
      ],
      treatments: {
        injections: [
          "विशिष्ट एंटीडोट: Sodium Nitrite 3% (1 ml/5kg) I/V तत्पश्चात Sodium Thiosulphate 25% (1.5 ml/kg) I/V",
          "Inj. Coramine / Nikethamide (श्वसन उत्तेजक)",
          "Inj. Dextrose 25% 500ml I/V"
        ],
        oral: ["Sodium Thiosulphate 30-50g ओरल पानी में"],
        ayurveda: ["लागू नहीं"],
        homeopathy: ["Hydrocyanicum Acidum 30C"],
        desiRemedy: "500 ग्राम पुराना गुड़ तुरंत पानी में घोलकर पिलाएं (गुड़ का ग्लूकोज साइनाइड को साइनोहाइड्रिन में बदलकर विषैला प्रभाव घटाता है)।"
      },
      stages: {
        incubation: "कच्ची ज्वार चरने के 10 से 30 मिनट भीतर",
        prodromal: "अत्यधिक उत्तेजना, पुतलियों का फैलना, लार",
        clinical: "चेरी लाल रक्त, हांफना, आक्षेप (दौरे), श्वासावरोध, 1-2 घंटे में पतन",
        convalescent: "एंटीडोट मिलने पर तुरंत स्वस्थ; अन्यथा 90% मृत्यु दर"
      }
    },
    {
      id: "DIS_48_CCPP",
      nameHindi: "संक्रामक बकरी फुफ्फुस शोथ (CCPP)",
      nameEnglish: "Contagious Caprine Pleuropneumonia (CCPP)",
      category: "Bacterial",
      organAffected: "Lungs & Pleural Cavity (Goats)",
      cardinalSigns: "बकरियों में लगातार दर्दनाक सूखी खाँसी, सांस लेते समय घुर्र-घुर्र की स्पष्ट आवाज, नाक से गाढ़ा पीला स्राव, मुंह खोलकर हांफना व अत्यधिक उच्च ज्वर (105-107°F)।",
      temperatureExpected: "105.0 - 107.0 °F",
      labTests: [
        { testName: "प्लूरल फ्लूइड पीसीआर", sample: "छाती का द्रव (Pleural Fluid)", expectedResult: "Mycoplasma capricolum subsp. capripneumoniae पुष्टि" }
      ],
      treatments: {
        injections: [
          "Inj. Tylosin Tartrate (10 mg/kg) I/M SID 3-5 दिन अथवा",
          "Inj. Oxytetracycline LA 20 mg/kg I/M (एकल खुराक)",
          "Inj. Melonex Plus 2-3ml I/M",
          "Inj. Avil 2ml I/M"
        ],
        oral: ["Kaf-Go सिरप 20ml बीडी"],
        ayurveda: ["कंटोकारी क्वाथ 30g + अडूसा रस"],
        homeopathy: ["Bryonia Alba 200C + Phosphorus 200C"],
        desiRemedy: "संक्रमित बकरियों को तुरंत स्वस्थ रेवड़ से अलग करें। बाड़े में अजवाइन व नीम का धुआं करें।"
      },
      stages: {
        incubation: "6 से 14 दिन",
        prodromal: "तेज बुखार, सुस्ती, चारा छोड़ना",
        clinical: "दर्दनाक खाँसी, जीभ बाहर निकाल कर सांस लेना, प्लूरल रिसाव",
        convalescent: "माइकोप्लाज्मा रोधी दवा से 7-10 दिन में फेफड़े सामान्य"
      }
    },
    {
      id: "DIS_49_SWINE_FEVER",
      nameHindi: "स्वाइन फीवर / शूकर ज्वर (Classical Swine Fever)",
      nameEnglish: "Classical Swine Fever (Hog Cholera)",
      category: "Viral",
      organAffected: "Reticuloendothelial & Vasculature (Swine)",
      cardinalSigns: "सूअरों में तेज बुखार (106-107°F), कान, पेट, जांघों व थूथन की त्वचा पर बैंगनी-लाल चकत्ते (Cyanotic purple skin), आंखों से मवाद, कब्ज के बाद दस्त व लड़खड़ाहट।",
      temperatureExpected: "105.5 - 107.5 °F",
      labTests: [
        { testName: "एंटीजन डिटेक्शन ELISA / RT-PCR", sample: "होल ब्लड / टॉन्सिल ऊतक", expectedResult: "Pestivirus RNA पॉजिटिव" }
      ],
      treatments: {
        injections: [
          "विशिष्ट एंटीवायरल उपचार अनुपलब्ध; सहायक: Inj. Ceftiofur 3 mg/kg I/M",
          "Inj. Paracetamol + Melonex I/M",
          "Inj. Tribivet 5ml I/M"
        ],
        oral: ["इलेक्ट्रोलाइट व विटामिन C पानी में निरंतर"],
        ayurveda: ["नीम, गिलोय व चिरायता का काढ़ा"],
        homeopathy: ["Baptisia Tinctoria 200C + Crotalus Horridus 200C"],
        desiRemedy: "आवास को 2% कास्टिक सोडा (Sodium Hydroxide) के घोल से रोगाणुमुक्त करें। बीमार सूअर को तुरंत अलग करें।"
      },
      stages: {
        incubation: "3 से 9 दिन",
        prodromal: "अत्यधिक तेज ज्वर, एक दूसरे के ऊपर चढ़कर सोना (Huddling)",
        clinical: "बैंगनी त्वचा, ल्यूकोपेनिया, अंधापन, ऐंठन, मृत्यु (80-90%)",
        convalescent: "क्रॉनिक मामलों में बटन अल्सर (Button Ulcers in Colon)"
      }
    },
    {
      id: "DIS_50_HYDROGEN_CYANIDE_WEED",
      nameHindi: "गाजर घास / खरपतवार विषाक्तता (Parthenium Dermatitis & Toxicity)",
      nameEnglish: "Parthenium Weed Toxicity",
      category: "Toxic",
      organAffected: "Skin, Liver & Kidney Function",
      cardinalSigns: "गाजर घास चरने से थूथन, अयन व पेट के नीचे भीषण खुजली, छाले, त्वचा की पपड़ी उखड़ना, अत्यधिक लार बहना, कड़वा दूध व लिवर की क्षति।",
      temperatureExpected: "सामान्य अथवा द्वितीयक संक्रमण में हल्का बढ़ा",
      labTests: [
        { testName: "सीरम ट्रांसएमिनेज (AST, ALT)", sample: "सीरम", expectedResult: "हेपेटोटॉक्सिसिटी के कारण उच्च लिवर एंजाइम्स" }
      ],
      treatments: {
        injections: [
          "Inj. Isoflupredone Acetate 10ml I/M (एलर्जी व शोथ निवारण)",
          "Inj. Avil 10ml I/M दैनिक 4 दिन",
          "Inj. Belamyl 10ml I/M (लिवर सुरक्षा)"
        ],
        oral: ["Liv-52 liquid 100ml बीडी", "Toxiroak / Toxibind पाउडर"],
        ayurveda: ["मंजिष्ठा क्वाथ 50ml रक्तशोधन हेतु"],
        homeopathy: ["Rhus Tox 200C + Mezereum 200C"],
        desiRemedy: "पशु चरागाह से गाजर घास को उखाड़कर नष्ट करें। प्रभावित त्वचा पर नारियल तेल में कपूर व कत्था मिलाकर लगाएं।"
      },
      stages: {
        incubation: "घास चरने के 2 से 5 दिन बाद",
        prodromal: "मुंह व थूथन पर लाली, दूध का स्वाद कड़वा होना",
        clinical: "एलोपेसिया (बाल उड़ना), त्वचा में दरारें, डिप्रेशन, वजन घटना",
        convalescent: "चारा बदलने व लिवर टॉनिक से 2-3 सप्ताह में रिकवरी"
      }
    }
  ];

  /* =========================================================================
     4. ORGAN-BASED SYMPTOM MATRIX (Systematic Clinical Navigation)
     ========================================================================= */
  const SYMPTOMS_BY_ORGAN = {
    respiratory: {
      labelHindi: "श्वसन तंत्र (फेफड़े, गला व नाक)",
      symptoms: [
        { code: "DYSPNEA_STRIDOR", nameHindi: "गले में सूजन व घुर्र-घुर्र की आवाज (Stridor)", cardinalFor: ["DIS_01_HS"] },
        { code: "COUGH_WHEEZE", nameHindi: "बलगमयुक्त खांसी, हांफना व सीने में घरघराहट", cardinalFor: ["DIS_25_PNEUMONIA_BRD", "DIS_48_CCPP"] },
        { code: "RED_NOSE_DISCHARGE", nameHindi: "नथुने अंदर से लाल व मवाद जैसा स्राव", cardinalFor: ["DIS_32_IBR"] },
        { code: "CHERRY_RED_ASPHYXIA", nameHindi: "चेरी लाल रक्त व तीव्र घुटन (सुर्ख जीभ)", cardinalFor: ["DIS_47_CYANIDE_TOXICITY"] }
      ]
    },
    digestive_rumen: {
      labelHindi: "पाचन तंत्र (रूमेन, आमाशय व आंतें)",
      symptoms: [
        { code: "DRUM_TYMPANY", nameHindi: "बायाँ पेट ढोलक की तरह फूलना (अफारा / Bloat)", cardinalFor: ["DIS_08_BLOAT"] },
        { code: "SWEET_BREATH_OFFFEED", nameHindi: "सांस से मीठी गंध व सूखा भूसा खाना (कीटोसिस)", cardinalFor: ["DIS_07_KETOSIS"] },
        { code: "SPLASHY_SOUR_SCOURS", nameHindi: "दाना खाने बाद पेट में छप-छप पानी व खट्टा दस्त", cardinalFor: ["DIS_30_ACIDOSIS"] },
        { code: "COLIC_KICKING", nameHindi: "पेट की ओर लात मारना व जमीन पर लोटना (शूल)", cardinalFor: ["DIS_21_COLIC"] },
        { code: "FOUL_DIARRHEA_CALF", nameHindi: "नवजात बछड़े में सफेद-पीला बदबूदार दस्त", cardinalFor: ["DIS_26_CALF_SCOURS"] },
        { code: "BOTTLE_JAW_EDEMA", nameHindi: "जबड़े के नीचे पानी की थैली जैसी लटकती सूजन", cardinalFor: ["DIS_42_LIVER_FLUKE", "DIS_43_AMPHISTOMIASIS"] },
        { code: "HARDWARE_GRUNT", nameHindi: "धनुषाकार पीठ, चलने में सतर्कता व कराहना", cardinalFor: ["DIS_35_TRP_HARDWARE"] }
      ]
    },
    mammary_udder: {
      labelHindi: "अयन व थन (Mammary Glands)",
      symptoms: [
        { code: "HOT_HARD_SWELLING", nameHindi: "थन में पत्थर जैसा कड़ापन, गर्म सूजन व दर्द", cardinalFor: ["DIS_04_MASTITIS_ACUTE"] },
        { code: "CLOTS_BLOOD_MILK", nameHindi: "दूध में खून, गाढ़े छिछड़े अथवा पीला सीरम", cardinalFor: ["DIS_04_MASTITIS_ACUTE"] },
        { code: "DROP_YIELD_HIGH_SCC", nameHindi: "दूध में बिना सूजन 20% कमी व स्वाद खारा", cardinalFor: ["DIS_05_SUBCLINICAL_MASTITIS"] }
      ]
    },
    reproductive_genital: {
      labelHindi: "प्रजनन एवं गर्भाशय (Reproductive / Obstetric)",
      symptoms: [
        { code: "STERNAL_COLD_BODY", nameHindi: "ब्याने बाद गर्दन मोड़कर बैठना व शरीर ठंडा पड़ना", cardinalFor: ["DIS_06_MILK_FEVER"] },
        { code: "HANGING_PLACENTA", nameHindi: "प्रसव के 8-12 घंटे बाद भी जेर बाहर लटकना", cardinalFor: ["DIS_22_RETENTION_OF_PLACENTA"] },
        { code: "PROTRUDING_ORGAN", nameHindi: "योनि या गर्भाशय का मांसल भाग बाहर निकलना", cardinalFor: ["DIS_23_PROLAPSE"] },
        { code: "PURULENT_DISCHARGE", nameHindi: "योनि से बदबूदार मवाद बहना (पायोमेट्रा)", cardinalFor: ["DIS_36_METRITIS_PYOMETRA"] },
        { code: "REPEAT_CONCEPTION_FAIL", nameHindi: "3 या अधिक बार सीमन उपरांत गर्भ न ठहरना", cardinalFor: ["DIS_37_REPEAT_BREEDING"] },
        { code: "NYMPHOMANIA_BULLING", nameHindi: "लगातार मद में रहना व सांड जैसी हरकतें", cardinalFor: ["DIS_38_FOLLICULAR_CYST"] },
        { code: "LATE_TERM_ABORTION", nameHindi: "अंतिम तिमाही (7-9 माह) में संक्रामक गर्भपात", cardinalFor: ["DIS_17_BRUCELLOSIS"] }
      ]
    },
    musculoskeletal_hoof: {
      labelHindi: "अस्थि, मांसपेशी व खुर (Musculoskeletal & Locomotor)",
      symptoms: [
        { code: "CREPITUS_GAS_SWELLING", nameHindi: "मांसल पुट्ठे में गैस भरी सूजन (चर्र-चर्र आवाज)", cardinalFor: ["DIS_02_BQ"] },
        { code: "INTERDIGITAL_FOUL_PUS", nameHindi: "खुरों के बीच सड़ांध, दुर्गंधयुक्त मवाद व लंगड़ाहट", cardinalFor: ["DIS_27_FOOT_ROT"] },
        { code: "WOODEN_HORSE_LOCKJAW", nameHindi: "पूरा शरीर लकड़ी जैसा कड़ा व जबड़ा भिंच जाना", cardinalFor: ["DIS_20_TETANUS"] },
        { code: "ALERT_DOWNER_CREEPER", nameHindi: "कैल्शियम बाद भी न उठ पाना (सचेत डाउनर)", cardinalFor: ["DIS_24_DOWNER_COW"] },
        { code: "THREE_DAY_STIFFNESS", nameHindi: "अचानक जोड़ों में तीव्र अकड़न (3 दिनी बुखार)", cardinalFor: ["DIS_18_EPHEMERAL_FEVER"] },
        { code: "LUMPY_JAW_BONE", nameHindi: "निचले जबड़े की हड्डी पर पत्थर जैसी अचल सूजन", cardinalFor: ["DIS_33_ACTINOMYCOSIS"] },
        { code: "WOODEN_HARD_TONGUE", nameHindi: "जीभ का सूजकर लकड़ी जैसी सख्त हो जाना", cardinalFor: ["DIS_34_ACTINOBACILLOSIS"] }
      ]
    },
    nervous_system: {
      labelHindi: "तंत्रिका तंत्र एवं मस्तिष्क (Nervous & Behavioral)",
      symptoms: [
        { code: "CIRCLING_HEAD_PRESSING", nameHindi: "दीवार से सिर दबाना व गोल चक्कर काटना (सर्रा)", cardinalFor: ["DIS_12_TRYPANOSOMIASIS"] },
        { code: "ABNORMAL_BELLOWING_SALIVA", nameHindi: "गले से असामान्य रंभाना, लार व पक्षाघात", cardinalFor: ["DIS_19_RABIES"] },
        { code: "OPISTHOTONOS_CONVULSION", nameHindi: "सिर पीछे की ओर खींचना व तीव्र मरोड़", cardinalFor: ["DIS_15_ENTEROTOXAEMIA"] },
        { code: "GRASS_TETANY_TWITCHING", nameHindi: "हरी घास बाद आंखें फड़कना व आक्षेप (दौरे)", cardinalFor: ["DIS_28_GRASS_TETANY"] }
      ]
    },
    circulatory_hemic: {
      labelHindi: "रक्त एवं परिसंचरण तंत्र (Circulatory & Blood)",
      symptoms: [
        { code: "RED_COFFEE_URINE_FEVER", nameHindi: "कॉफी/लाल पेशाब व 105°F तेज बुखार (बबेशिया)", cardinalFor: ["DIS_10_BABESIOSIS"] },
        { code: "RED_URINE_NO_FEVER", nameHindi: "ब्याने बाद बिना बुखार कॉफी रंग का पेशाब (PPH)", cardinalFor: ["DIS_29_POST_PARTURIENT_HEMOGLOBINURIA"] },
        { code: "PRESUDO_LYMPH_SWELLING", nameHindi: "कंधे की लिम्फ नोड में सूजन व रक्तहीनता", cardinalFor: ["DIS_09_THEILERIOSIS"] },
        { code: "SEVERE_JAUNDICE_NO_HEMOGLOBINURIA", nameHindi: "अत्यधिक पीलिया बिना लाल पेशाब के (एनाप्लाज्मा)", cardinalFor: ["DIS_11_ANAPLASMOSIS"] },
        { code: "TAR_BLOOD_NO_CLOT", nameHindi: "प्राकृतिक छेदों से काला बिना जमा खून रिसना", cardinalFor: ["DIS_14_ANTHRAX"] },
        { code: "CHOCOLATE_BROWN_BLOOD", nameHindi: "चॉकलेटी भूरा रक्त व तेज घुटन (नाइट्रेट विष)", cardinalFor: ["DIS_46_NITRATE_TOXICITY"] }
      ]
    },
    integumentary_skin: {
      labelHindi: "त्वचा, बाल व श्लेष्मा (Skin & Mucosa)",
      symptoms: [
        { code: "FMD_VESICLES_DROOLING", nameHindi: "मुंह व खुरों में छाले तथा तारदार लार टपकना", cardinalFor: ["DIS_03_FMD"] },
        { code: "LUMPY_NODULES_SKIN", nameHindi: "शरीर पर 2-5 सेमी की गोल कठोर गांठें (नोड्यूल)", cardinalFor: ["DIS_13_LUMPY_SKIN_DISEASE"] },
        { code: "ASBESTOS_CIRCULAR_CRUSTS", nameHindi: "आंखों व गर्दन पर गोल राख जैसी पपड़ी (दाद)", cardinalFor: ["DIS_40_RINGWORM"] },
        { code: "INTENSE_PRURITUS_THICK_SKIN", nameHindi: "असहनीय खुजली व चमड़ी का हाथी जैसा मोटा होना", cardinalFor: ["DIS_41_MANGE"] },
        { code: "PURPLE_SKIN_CYANOSIS_SWINE", nameHindi: "कान व पेट पर बैंगनी-लाल चकत्ते (स्वाइन फीवर)", cardinalFor: ["DIS_49_SWINE_FEVER"] },
        { code: "ORAL_EROSION_GOAT_DIARRHEA", nameHindi: "बकरी के मुंह में बदबूदार छाले व काला दस्त", cardinalFor: ["DIS_16_PPR"] }
      ]
    }
  };

  /* =========================================================================
     5. FARMER HOME REMEDIES (Scientific Traditional Herbal Formulations)
     ========================================================================= */
  const FARMER_ORGAN_REMEDIES = [
    {
      condition: "थनैल रोग (Mastitis) - प्रारंभिक सूजन व छिछड़े",
      organSystem: "Mammary / Udder",
      recipe: "घृतकुमारी (Aloe vera) गूदा 250 ग्राम + शुद्ध हल्दी पाउडर 50 ग्राम + खाने का चूना 15 ग्राम।",
      preparationMethod: "एलोवेरा, हल्दी और चूने को सिलबट्टे पर अच्छी तरह पीसकर लाल-नारंगी रंग का चिकना पेस्ट बनाएं। इसमें 50 मिली नारियल या तिल का तेल मिलाएं।",
      dosageAdministration: "दूध को पूर्णतः दुहकर बाहर निकालने के उपरांत पूरे अयन व थन पर दिन में 3 से 4 बार अच्छी तरह लेप करें। 5 दिन तक जारी रखें।",
      precautions: "थन के अंदर लेप न डालें। यदि थन से मवाद या खून आ रहा हो तो तुरंत पशु चिकित्सक से एंटीबायोटिक लगवाएं।"
    },
    {
      condition: "अफारा / पेट में गैस (Tympany / Bloat)",
      organSystem: "Digestive / Rumen",
      recipe: "सरसों या अलसी का तेल 300 मिली + शुद्ध तारपीन का तेल (Turpentine oil) 40 मिली + शुद्ध हींग 15 ग्राम + काला नमक 30 ग्राम।",
      preparationMethod: "हींग को तवे पर हल्का भूनकर पीस लें। इसे काले नमक व तारपीन के तेल के साथ सरसों के तेल में अच्छी तरह फेंटकर इमल्शन बनाएं।",
      dosageAdministration: "नाल (Drenching bottle) द्वारा पशु की जीभ पकड़े बिना धीरे-धीरे एक बार में पिलाएं। आवश्यकता पड़ने पर 4 घंटे बाद दोहराएं।",
      precautions: "पशु की गर्दन ज्यादा ऊंची न उठाएं ताकि तेल श्वासनली में न जाए। मुंह में लकड़ी की खपच्ची बांधें ताकि लार गिरे और डकार आए।"
    },
    {
      condition: "खुरपका-मुंहपका (FMD) - मुंह व जीभ के छाले",
      organSystem: "Oral Mucosa",
      recipe: "भुना हुआ सुहागा (Borax powder) 20 ग्राम + शुद्ध शहद 100 ग्राम + नारियल तेल 50 मिली।",
      preparationMethod: "सुहागे को तवे पर खील होने तक भूनें, फिर बारीक पीसकर शहद और नारियल तेल में मिलाकर गाढ़ा मलहम तैयार करें।",
      dosageAdministration: "मुंह को 1% फिटकरी के पानी से धोने के बाद साफ सूती कपड़े से जीभ व मसूड़ों के छालों पर दिन में 3 बार हल्के हाथ से लगाएं।",
      precautions: "पशु को कठोर सूखा भूसा न दें। मुलायम हरी घास अथवा आटे की पतली लपसी बनाकर खिलाएं।"
    },
    {
      condition: "ब्याने के बाद जेर की रुकावट (Retention of Placenta - ROP)",
      organSystem: "Reproductive / Uterus",
      recipe: "हरे बांस की ताजी पत्तियां 1 किग्रा + पुराना गुड़ 300 ग्राम + अजवाइन 50 ग्राम + सोंठ 30 ग्राम।",
      preparationMethod: "बांस की पत्तियों को 3 लीटर पानी में तब तक उबालें जब तक पानी 1.5 लीटर न रह जाए। फिर उसमें गुड़, सोंठ और कुटी अजवाइन मिलाएं।",
      dosageAdministration: "गुनगुना काढ़ा प्रसव के 6-8 घंटे बाद एक बार में पिलाएं। 6 घंटे बाद पुनः दोहरा सकते हैं।",
      precautions: "लटकती जेर पर भारी ईंट या पत्थर न बांधें और न ही हाथ से जबरन खींचे, अन्यथा गर्भाशय बाहर आ सकता है।"
    },
    {
      condition: "सांस की घुर्राहट, खांसी व सर्दी-जुकाम (Respiratory Relief)",
      organSystem: "Respiratory",
      recipe: "अडूसा (वासा) की पत्तियां 50 ग्राम + तुलसी पत्ते 25 ग्राम + काली मिर्च 10 ग्राम + अदरक/सोंठ 25 ग्राम + गुड़ 150 ग्राम।",
      preparationMethod: "सभी औषधियों को कूटकर 1 लीटर पानी में काढ़ा बनाएं। जब आधा लीटर बचे तो उसमें गुड़ घोल लें।",
      dosageAdministration: "दिन में दो बार सुबह-शाम 4 से 5 दिनों तक गुनगुना पिलाएं।",
      precautions: "पशु बाड़े को सीलन व ठंडी हवा से बचाएं। रात में कपूर व नीम के पत्तों का हल्का धुआं करें।"
    },
    {
      condition: "कीड़े लगे घाव एवं मैगट्स (Maggoted Wounds)",
      organSystem: "Integumentary / Skin",
      recipe: "शुद्ध तारपीन का तेल 50 मिली + नीम का तेल 100 मिली + देशी कपूर 25 ग्राम + सीताफल (शरीफा) के पत्तों का रस 30 मिली।",
      preparationMethod: "कपूर को तारपीन के तेल में घोलें और नीम के तेल तथा सीताफल पत्र रस के साथ अच्छी तरह मिला लें।",
      dosageAdministration: "रुई के फाहे से घाव के अंदर तक भरें ताकि कीड़े (मैगट्स) घुटकर बाहर गिर जाएं। ऊपर से नीम तेल की पट्टी बांधें।",
      precautions: "घाव को फिनाइल से न धोएं। कीड़ों को चिमटी से निकाल कर जला दें ताकि पुनः संक्रमण न फैले।"
    },
    {
      condition: "दस्त एवं खूनी पेचिश (Calf & Adult Diarrhea)",
      organSystem: "Digestive / Intestines",
      recipe: "कच्चे बेल की गिरी 100 ग्राम (बछड़े में 30 ग्राम) + ईसबगोल की भूसी 30 ग्राम + जीरा पाउडर 20 ग्राम + ताजा छाछ 500 मिली।",
      preparationMethod: "बेलगिरी को पीसकर जीरा और ईसबगोल के साथ ताजी मीठी छाछ में अच्छी तरह घोल लें।",
      dosageAdministration: "दिन में दो बार 2 से 3 दिन तक खाली पेट पिलाएं।",
      precautions: "दस्त में पानी व नमक की कमी पूरी करने हेतु ओआरएस (ORS) का गुनगुना घोल साथ में निरंतर पिलाते रहें।"
    },
    {
      condition: "पशु की कमजोरी एवं भूख न लगना (Anorexia / Off-feed)",
      organSystem: "Digestive / Rumen Flora",
      recipe: "अजवाइन 50 ग्राम + काला नमक 40 ग्राम + सोंठ 30 ग्राम + जीरा 30 ग्राम + हींग 5 ग्राम + पुराना गुड़ 250 ग्राम।",
      preparationMethod: "सभी सूखे मसालों को बारीक पीसकर गुड़ में अच्छी तरह कूटकर बड़े-बड़े लड्डू (पिंडी) बना लें।",
      dosageAdministration: "एक-एक लड्डू सुबह और शाम को पशु की जीभ पर रगड़कर खिलाएं। 3 से 5 दिन तक दें।",
      precautions: "यदि पशु को तेज बुखार हो तो पहले बुखार की दवा दें; केवल अपच होने पर ही यह पाचक नुस्खा कारगर है।"
    }
  ];

  /* =========================================================================
     6. PUBLIC API ATTACHMENT TO WINDOW OBJECT
     ========================================================================= */
  if (typeof root !== "undefined") {
    root.VETCARE_MEDICINES_DB = MEDICINES_DB;
    root.VETCARE_VACCINATION_DB = VACCINATION_DB;
    root.VETCARE_DISEASE_DB = DISEASE_DB;
    root.VETCARE_SYMPTOMS_BY_ORGAN = SYMPTOMS_BY_ORGAN;
    root.VETCARE_FARMER_ORGAN_REMEDIES = FARMER_ORGAN_REMEDIES;

    // Helper Utility Methods for Clinical Operations
    root.VetcareDB = {
      getMedicineById: function (id) {
        return MEDICINES_DB.find(function (m) { return m.id === id; }) || null;
      },
      getMedicinesByCategory: function (category) {
        return MEDICINES_DB.filter(function (m) { return m.category.toLowerCase() === category.toLowerCase(); });
      },
      getDiseaseById: function (id) {
        return DISEASE_DB.find(function (d) { return d.id === id; }) || null;
      },
      searchDiseases: function (query) {
        if (!query) return DISEASE_DB;
        var q = query.toLowerCase().trim();
        return DISEASE_DB.filter(function (d) {
          return d.nameHindi.toLowerCase().indexOf(q) !== -1 ||
                 d.nameEnglish.toLowerCase().indexOf(q) !== -1 ||
                 d.cardinalSigns.toLowerCase().indexOf(q) !== -1 ||
                 d.organAffected.toLowerCase().indexOf(q) !== -1;
        });
      },
      getVaccinesForSpecies: function (speciesName) {
        var s = speciesName.toLowerCase();
        return VACCINATION_DB.filter(function (v) {
          return v.species.some(function (sp) { return sp.toLowerCase().indexOf(s) !== -1; });
        });
      },
      getRemediesByOrgan: function (organQuery) {
        var q = organQuery.toLowerCase();
        return FARMER_ORGAN_REMEDIES.filter(function (r) {
          return r.organSystem.toLowerCase().indexOf(q) !== -1 ||
                 r.condition.toLowerCase().indexOf(q) !== -1;
        });
      }
    };
  }

})(typeof window !== "undefined" ? window : globalThis);
