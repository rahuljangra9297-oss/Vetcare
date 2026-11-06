// Vetcare AI OS - Multi-Species Symptom Matrix, Weighted Differential Diagnosis & Clinical Triage Engine (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. COMPREHENSIVE MULTI-SPECIES SYMPTOM DICTIONARY
  const SYMPTOM_DEFINITIONS = [
    // ------------------------------------------------------------------------
    // GENERAL & SYSTEMIC
    // ------------------------------------------------------------------------
    {
      id: "sym-high-fever",
      nameEn: "High Fever (>103.5°F / >39.7°C)",
      nameHi: "तेज बुखार (103.5°F से अधिक)",
      system: "General/Systemic",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine", "feline", "avian"],
      isCardinal: false
    },
    {
      id: "sym-subnormal-temp",
      nameEn: "Subnormal Temperature / Hypothermia (<100°F)",
      nameHi: "शरीर का सामान्य से ठंडा पड़ना / हाइपोथर्मिया",
      system: "General/Systemic",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine", "feline"],
      isCardinal: true
    },
    {
      id: "sym-lethargy-anorexia",
      nameEn: "Severe Depression, Dullness & Complete Anorexia",
      nameHi: "अत्यधिक सुस्ती, कमजोरी व चारा-पानी का पूर्ण त्याग",
      system: "General/Systemic",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine", "feline", "avian"],
      isCardinal: false
    },
    {
      id: "sym-sudden-death",
      nameEn: "Peracute Sudden Death with Zero Prior Warning",
      nameHi: "बिना लक्षण दिखे अचानक सामूहिक या एकाएक मृत्यु",
      system: "General/Systemic",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "avian"],
      isCardinal: true
    },
    {
      id: "sym-dehydration",
      nameEn: "Severe Dehydration, Sunken Eyes & Loss of Skin Turgor",
      nameHi: "गंभीर निर्जलीकरण, धंसी हुई आंखें व त्वचा के खिंचाव का खत्म होना",
      system: "General/Systemic",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine", "feline", "avian"],
      isCardinal: false
    },
    {
      id: "sym-progressive-emaciation",
      nameEn: "Progressive Emaciation, Cachexia & Starry Dry Coat",
      nameHi: "लगातार वजन घटना, हड्डियों का ढांचा बनना व रूखे खड़े बाल",
      system: "General/Systemic",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine", "feline"],
      isCardinal: false
    },

    // ------------------------------------------------------------------------
    // GASTROINTESTINAL & ABDOMINAL
    // ------------------------------------------------------------------------
    {
      id: "sym-ruminal-bloat",
      nameEn: "Ruminal Bloat / Left Flank Tympany",
      nameHi: "बायीं कोख का गंभीर अफारा / पेट में गैस भरना",
      system: "Gastrointestinal",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine"],
      isCardinal: true
    },
    {
      id: "sym-watery-diarrhea",
      nameEn: "Profuse Watery / Mucoid Diarrhea (Scours)",
      nameHi: "पतले पानी जैसे बदबूदार दस्त",
      system: "Gastrointestinal",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine", "feline", "avian"],
      isCardinal: false
    },
    {
      id: "sym-hemorrhagic-stool",
      nameEn: "Frank Blood in Stool / Hemorrhagic Enteritis",
      nameHi: "मल में ताजा खून या कत्थई रंग का खूनी दस्त",
      system: "Gastrointestinal",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "canine", "feline", "avian"],
      isCardinal: true
    },
    {
      id: "sym-impaction-constipation",
      nameEn: "Omasal/Colonic Impaction, Constipation & Absence of Dung",
      nameHi: "गोबर का पूरी तरह बंद होना / सूखा कड़ा गांठदार गोबर",
      system: "Gastrointestinal",
      applicableSpecies: ["bovine", "bubaline", "equine"],
      isCardinal: true
    },
    {
      id: "sym-colic-pain",
      nameEn: "Visceral Colic Pain, Looking at Flank, Violent Rolling & Pawing",
      nameHi: "पेट में तीव्र मरोड़ व दर्द, कोख की ओर देखना, छटपटाना व जमीन कुरेदना",
      system: "Gastrointestinal",
      applicableSpecies: ["equine", "bovine", "bubaline"],
      isCardinal: true
    },
    {
      id: "sym-vomiting",
      nameEn: "Intractable / Projectile Vomiting & Frothy Bile",
      nameHi: "लगातार सफेद झागदार या पीले पित्त की उल्टी",
      system: "Gastrointestinal",
      applicableSpecies: ["canine", "feline"],
      isCardinal: true
    },

    // ------------------------------------------------------------------------
    // RESPIRATORY
    // ------------------------------------------------------------------------
    {
      id: "sym-dyspnea",
      nameEn: "Severe Dyspnea, Labored Respiration & Abdominal Breathing",
      nameHi: "सांस लेने में भारी कठिनाई व पेट से जोर लगाकर सांस लेना",
      system: "Respiratory",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine", "feline", "avian"],
      isCardinal: false
    },
    {
      id: "sym-respiratory-stridor",
      nameEn: "Grunting, Snoring & Upper Airway Stertorous Sound",
      nameHi: "सांस लेते समय घरघराहट, खर्राटेदार आवाज व कराहना",
      system: "Respiratory",
      applicableSpecies: ["bovine", "bubaline", "caprine", "equine", "avian"],
      isCardinal: true
    },
    {
      id: "sym-cough",
      nameEn: "Paroxysmal Dry or Moist Hacking Cough",
      nameHi: "लगातार सूखी या बलगमदार खांसी",
      system: "Respiratory",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine", "feline", "avian"],
      isCardinal: false
    },
    {
      id: "sym-mucopurulent-nasal",
      nameEn: "Bilateral Thick Mucopurulent Nasal Discharge",
      nameHi: "दोनों नथुनों से गाढ़ा मवाद जैसा पीला-सफेद स्राव",
      system: "Respiratory",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine", "feline", "avian"],
      isCardinal: false
    },
    {
      id: "sym-open-mouth-panting",
      nameEn: "Open-Mouth Breathing with Extended Neck & Tongue Out",
      nameHi: "गर्दन आगे तानकर मुंह खोलकर हांफना व जीभ बाहर निकालना",
      system: "Respiratory",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine", "feline", "avian"],
      isCardinal: false
    },

    // ------------------------------------------------------------------------
    // DERMATOLOGICAL & CUTANEOUS
    // ------------------------------------------------------------------------
    {
      id: "sym-skin-nodules",
      nameEn: "Circumscribed Cutaneous Nodules (Lumpy Skin 2-5cm)",
      nameHi: "त्वचा पर गोल उभरी हुई कठोर गांठें (लंपी स्किन लीजन्स)",
      system: "Dermatological",
      applicableSpecies: ["bovine", "bubaline"],
      isCardinal: true
    },
    {
      id: "sym-pox-scabs",
      nameEn: "Papules, Vesicles, Crusts & Wart-like Scabs on Comb/Teats",
      nameHi: "चेचक के दाने, पानी भरे छाले व पपड़ीदार खुरंड",
      system: "Dermatological",
      applicableSpecies: ["bovine", "caprine", "ovine", "avian"],
      isCardinal: true
    },
    {
      id: "sym-alopecia-pruritus",
      nameEn: "Severe Alopecia, Intense Pruritus, Crusts & Lichenification",
      nameHi: "बालों का झड़ना, असहनीय खुजली व त्वचा का चमड़े जैसा मोटा होना",
      system: "Dermatological",
      applicableSpecies: ["canine", "feline", "bovine", "bubaline", "caprine"],
      isCardinal: false
    },
    {
      id: "sym-submandibular-edema",
      nameEn: "Dependent Submandibular Edema ('Bottle Jaw') & Brisket Swelling",
      nameHi: "निचले जबड़े के नीचे पानी भर जाना (बॉटल जॉ) व गलकंबल में सूजन",
      system: "Dermatological",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine"],
      isCardinal: true
    },
    {
      id: "sym-comb-cyanosis",
      nameEn: "Cyanosis, Dark Purplish Comb & Petechiae on Shanks",
      nameHi: "मुर्गियों की कलगी का नीला-काला पड़ना व पैरों पर खून के चकत्ते",
      system: "Dermatological",
      applicableSpecies: ["avian"],
      isCardinal: true
    },

    // ------------------------------------------------------------------------
    // MUSCULOSKELETAL & LOCOMOTOR
    // ------------------------------------------------------------------------
    {
      id: "sym-acute-lameness",
      nameEn: "Acute Severe Lameness & Non-Weight Bearing on Extremities",
      nameHi: "अचानक पैर पर वजन न देना व गंभीर लंगड़ापन",
      system: "Musculoskeletal",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine", "feline"],
      isCardinal: false
    },
    {
      id: "sym-crepitant-swelling",
      nameEn: "Hot, Painful Swelling with Crepitation under Pressure (Black Quarter)",
      nameHi: "जांघ या कंधे पर गर्म सूजन व दबाने पर हवा की चरचराहट की आवाज",
      system: "Musculoskeletal",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine"],
      isCardinal: true
    },
    {
      id: "sym-sternal-recumbency",
      nameEn: "Sternal/Lateral Recumbency with Inability to Rise ('Downer Cow')",
      nameHi: "बैठ जाना, गर्दन मोड़कर कोख पर रखना व उठने में पूर्ण असमर्थता",
      system: "Musculoskeletal",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine"],
      isCardinal: true
    },
    {
      id: "sym-muscle-tremors",
      nameEn: "Involuntary Muscle Tremors, Chorea, Hyperesthesia & Spasms",
      nameHi: "मांसपेशियों का अनियंत्रित फड़कना, तेज कंपन व अकड़न",
      system: "Musculoskeletal",
      applicableSpecies: ["bovine", "bubaline", "equine", "canine", "feline"],
      isCardinal: false
    },
    {
      id: "sym-split-leg",
      nameEn: "Asymmetric Split-Leg Paralysis Posture (One Leg Forward, One Back)",
      nameHi: "एक पैर आगे और दूसरा पैर पीछे फैलाकर बैठने की पक्षाघात मुद्रा",
      system: "Musculoskeletal",
      applicableSpecies: ["avian"],
      isCardinal: true
    },

    // ------------------------------------------------------------------------
    // REPRODUCTIVE & UROGENITAL
    // ------------------------------------------------------------------------
    {
      id: "sym-red-urine",
      nameEn: "Port-Wine / Coffee-Colored / Bloody Urine (Hemoglobinuria)",
      nameHi: "गहरे लाल या कॉफी के रंग का पेशाब आना (लाल पेशाब)",
      system: "Reproductive/Urogenital",
      applicableSpecies: ["bovine", "bubaline", "canine", "equine"],
      isCardinal: true
    },
    {
      id: "sym-abortion",
      nameEn: "Spontaneous Third-Trimester Abortion & Expulsion of Fetus",
      nameHi: "अंतिम तिमाही में अचानक गर्भपात होना / बच्चा फेंकना",
      system: "Reproductive/Urogenital",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine"],
      isCardinal: true
    },
    {
      id: "sym-vaginal-prolapse",
      nameEn: "Vaginal or Complete Uterine Prolapse (Inversion)",
      nameHi: "योनि या गर्भाशय का बाहर निकल आना (फूल / पीछा दिखाना)",
      system: "Reproductive/Urogenital",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine"],
      isCardinal: true
    },
    {
      id: "sym-stranguria-dysuria",
      nameEn: "Stranguria, Anuria, Painful Straining & Frequent Dribbling",
      nameHi: "पेशाब रुक जाना, बूंद-बूंद आना या पेशाब करते समय असहनीय दर्द व चीखना",
      system: "Reproductive/Urogenital",
      applicableSpecies: ["bovine", "caprine", "canine", "feline", "equine"],
      isCardinal: true
    },

    // ------------------------------------------------------------------------
    // UDDER & MAMMARY GLAND
    // ------------------------------------------------------------------------
    {
      id: "sym-hard-swollen-quarter",
      nameEn: "Indurated, Hot, Painful, Swollen Quarter (Acute Mastitis)",
      nameHi: "थन का अत्यधिक सूज जाना, लाल होना व पत्थर जैसा सख्त हो जाना",
      system: "Udder/Mammary",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine"],
      isCardinal: true
    },
    {
      id: "sym-clotted-serous-milk",
      nameEn: "Abnormal Milk: Flakes, Clots, Yellowish Whey or Watery Secretion",
      nameHi: "दूध का फटना, दही जैसे थक्के, पीले छीछड़े या पानी जैसा पतला दूध",
      system: "Udder/Mammary",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine"],
      isCardinal: true
    },
    {
      id: "sym-blood-in-milk",
      nameEn: "Frank Blood or Pinkish Discoloration in Milk",
      nameHi: "दूध में ताजा खून आना या दूध का गुलाबी रंग होना",
      system: "Udder/Mammary",
      applicableSpecies: ["bovine", "bubaline"],
      isCardinal: true
    },

    // ------------------------------------------------------------------------
    // HEAD, EYES & ORAL CAVITY
    // ------------------------------------------------------------------------
    {
      id: "sym-frothy-salivation",
      nameEn: "Copious Ropy / Frothy Salivation Dripping from Mouth",
      nameHi: "मुंह से लगातार गाढ़ी, झागदार या तारदार लार टपकना",
      system: "Head/Eyes/Oral",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine"],
      isCardinal: true
    },
    {
      id: "sym-oral-ulcers",
      nameEn: "Vesicles, Ruptured Blisters & Ulcers on Tongue, Gums & Dental Pad",
      nameHi: "जीभ, मसूड़ों व तालु पर फफोले, छाले व कच्चा लाल घाव",
      system: "Head/Eyes/Oral",
      applicableSpecies: ["bovine", "bubaline", "caprine", "ovine", "feline"],
      isCardinal: true
    },
    {
      id: "sym-corneal-opacity",
      nameEn: "Corneal Opacity ('Blue Eye'), Lacrimation & Photophobia",
      nameHi: "आंख की पुतली पर नीला-सफेद धुंधलापन व लगातार पानी बहना",
      system: "Head/Eyes/Oral",
      applicableSpecies: ["bovine", "bubaline", "canine", "feline"],
      isCardinal: true
    },
    {
      id: "sym-third-eyelid-protrusion",
      nameEn: "Prolapse / Protrusion of Third Eyelid (Nictitating Membrane)",
      nameHi: "आंख की तीसरी पलक का अचानक बाहर की ओर गिरना / दिखना",
      system: "Head/Eyes/Oral",
      applicableSpecies: ["equine", "canine", "feline", "bovine"],
      isCardinal: true
    },
    {
      id: "sym-torticollis",
      nameEn: "Torticollis, Neck Twisting, Star Gazing & Circling",
      nameHi: "गर्दन का टेढ़ा मुड़ना, आसमान की ओर देखना व गोल चक्कर काटना",
      system: "Head/Eyes/Oral",
      applicableSpecies: ["avian", "canine"],
      isCardinal: true
    }
  ];

  // 3. MASTER RUMINANT/BUILT-IN CLINICAL KNOWLEDGE REPOSITORY
  // Ensures robust differential inference for cattle/buffaloes/goats even prior to external files loading.
  const BUILTIN_RUMINANT_DISEASES = [
    {
      id: "bovine-hs",
      nameEn: "Haemorrhagic Septicaemia / HS (Pasteurellosis)",
      nameHi: "गलघोंटू रोग (एच.एस. / गले की भयंकर सूजन व घुर्र-घुर्र की आवाज)",
      species: ["bovine", "bubaline"],
      category: "Bacterial Hyperacute",
      tempRange: { minF: 104.0, maxF: 107.0, normalF: 101.5 },
      cardinalSymptoms: [
        "sym-high-fever",
        "sym-submandibular-edema",
        "sym-respiratory-stridor",
        "sym-dyspnea",
        "sym-frothy-salivation",
        "sym-sudden-death"
      ],
      secondarySymptoms: [
        "sym-lethargy-anorexia",
        "sym-open-mouth-panting"
      ],
      urgency: "CRITICAL"
    },
    {
      id: "bovine-bq",
      nameEn: "Black Quarter / BQ (Clostridial Myonecrosis)",
      nameHi: "ब्लैक क्वार्टर / लंगड़ा बुखार (पुट्ठा सूजन व दबाने पर चरचराहट)",
      species: ["bovine", "bubaline", "caprine", "ovine"],
      category: "Clostridial Myotoxic",
      tempRange: { minF: 104.0, maxF: 106.5, normalF: 101.5 },
      cardinalSymptoms: [
        "sym-high-fever",
        "sym-crepitant-swelling",
        "sym-acute-lameness",
        "sym-sudden-death"
      ],
      secondarySymptoms: [
        "sym-lethargy-anorexia",
        "sym-muscle-tremors",
        "sym-sternal-recumbency"
      ],
      urgency: "CRITICAL"
    },
    {
      id: "bovine-fmd",
      nameEn: "Foot and Mouth Disease / FMD (Aphthovirus)",
      nameHi: "खुरपका-मुँहपका रोग / एफ.एम.डी. (लार टपकना, मुँह व खुरों में छाले)",
      species: ["bovine", "bubaline", "caprine", "ovine"],
      category: "Viral Epitheliotropic",
      tempRange: { minF: 103.5, maxF: 106.0, normalF: 101.5 },
      cardinalSymptoms: [
        "sym-high-fever",
        "sym-frothy-salivation",
        "sym-oral-ulcers",
        "sym-acute-lameness"
      ],
      secondarySymptoms: [
        "sym-lethargy-anorexia",
        "sym-pox-scabs"
      ],
      urgency: "HIGH"
    },
    {
      id: "bovine-lsd",
      nameEn: "Lumpy Skin Disease / LSD (Capripoxvirus)",
      nameHi: "लंपी स्किन डिजीज (त्वचा पर 2-5 सेमी की कठोर गांठें व बुखार)",
      species: ["bovine", "bubaline"],
      category: "Poxviral Cutaneous",
      tempRange: { minF: 103.0, maxF: 106.0, normalF: 101.5 },
      cardinalSymptoms: [
        "sym-high-fever",
        "sym-skin-nodules",
        "sym-submandibular-edema",
        "sym-corneal-opacity"
      ],
      secondarySymptoms: [
        "sym-lethargy-anorexia",
        "sym-mucopurulent-nasal",
        "sym-acute-lameness"
      ],
      urgency: "HIGH"
    },
    {
      id: "bovine-milk-fever",
      nameEn: "Milk Fever / Hypocalcemia (Parturient Paresis)",
      nameHi: "मिल्क फीवर / प्रसूति पक्षाघात (कैल्शियम कमी, ठंडा बदन व बैठ जाना)",
      species: ["bovine", "bubaline"],
      category: "Metabolic Emergency",
      tempRange: { minF: 96.5, maxF: 99.8, normalF: 101.5 },
      cardinalSymptoms: [
        "sym-subnormal-temp",
        "sym-sternal-recumbency",
        "sym-impaction-constipation",
        "sym-muscle-tremors"
      ],
      secondarySymptoms: [
        "sym-lethargy-anorexia",
        "sym-ruminal-bloat"
      ],
      urgency: "CRITICAL"
    },
    {
      id: "bovine-mastitis",
      nameEn: "Clinical Mastitis (Streptococcal/Staphylococcal/Coliform)",
      nameHi: "तीव्र थनैला रोग (थन में भयंकर सूजन, दर्द व दूध में थक्के/खून)",
      species: ["bovine", "bubaline", "caprine", "ovine"],
      category: "Mammary Infectious",
      tempRange: { minF: 102.0, maxF: 105.0, normalF: 101.5 },
      cardinalSymptoms: [
        "sym-hard-swollen-quarter",
        "sym-clotted-serous-milk",
        "sym-blood-in-milk"
      ],
      secondarySymptoms: [
        "sym-high-fever",
        "sym-lethargy-anorexia"
      ],
      urgency: "HIGH"
    },
    {
      id: "bovine-theileriosis",
      nameEn: "Bovine Tropical Theileriosis (Theileria annulata)",
      nameHi: "थायलेरिया रोग (लसिका ग्रंथियों की भयंकर सूजन, तेज बुखार व पीलिया)",
      species: ["bovine", "bubaline"],
      category: "Protozoan Hemoparasitic",
      tempRange: { minF: 104.0, maxF: 107.0, normalF: 101.5 },
      cardinalSymptoms: [
        "sym-high-fever",
        "sym-submandibular-edema",
        "sym-corneal-opacity",
        "sym-progressive-emaciation"
      ],
      secondarySymptoms: [
        "sym-lethargy-anorexia",
        "sym-dyspnea",
        "sym-watery-diarrhea"
      ],
      urgency: "HIGH"
    },
    {
      id: "bovine-babesiosis",
      nameEn: "Bovine Babesiosis / Redwater (Babesia bigemina)",
      nameHi: "बबेसियोसिस / बबेसिया रोग (गहरा लाल/कॉफी पेशाब, तेज बुखार व रक्ताल्पता)",
      species: ["bovine", "bubaline"],
      category: "Protozoan Hemoparasitic",
      tempRange: { minF: 104.0, maxF: 106.5, normalF: 101.5 },
      cardinalSymptoms: [
        "sym-high-fever",
        "sym-red-urine",
        "sym-progressive-emaciation"
      ],
      secondarySymptoms: [
        "sym-lethargy-anorexia",
        "sym-muscle-tremors",
        "sym-watery-diarrhea"
      ],
      urgency: "CRITICAL"
    },
    {
      id: "bovine-bloat",
      nameEn: "Acute Frothy / Free-Gas Ruminal Tympany",
      nameHi: "तीव्र झागदार या गैसीय अफारा (दम घुटना व बायीं कोख का फूलना)",
      species: ["bovine", "bubaline", "caprine", "ovine"],
      category: "Digestive Emergency",
      tempRange: { minF: 101.0, maxF: 102.5, normalF: 101.5 },
      cardinalSymptoms: [
        "sym-ruminal-bloat",
        "sym-dyspnea",
        "sym-open-mouth-panting",
        "sym-colic-pain"
      ],
      secondarySymptoms: [
        "sym-frothy-salivation",
        "sym-respiratory-stridor"
      ],
      urgency: "CRITICAL"
    },
    {
      id: "bovine-anthrax",
      nameEn: "Anthrax / Splenic Fever (Bacillus anthracis - Zoonosis)",
      nameHi: "एंथ्रेक्स / गिल्टी रोग (अचानक मृत्यु व प्राकृतिक छिद्रों से काला खून)",
      species: ["bovine", "bubaline", "caprine", "ovine"],
      category: "Bacterial Zoonotic Fatal",
      tempRange: { minF: 104.5, maxF: 107.5, normalF: 101.5 },
      cardinalSymptoms: [
        "sym-sudden-death",
        "sym-high-fever",
        "sym-submandibular-edema",
        "sym-hemorrhagic-stool"
      ],
      secondarySymptoms: [
        "sym-dyspnea",
        "sym-ruminal-bloat"
      ],
      urgency: "CRITICAL"
    }
  ];

  // 4. SYMPTOM MATRIX CONTROLLER & ENGINE IMPLEMENTATION
  const MatrixEngine = {
    symptoms: SYMPTOM_DEFINITIONS,
    ruminantDiseases: BUILTIN_RUMINANT_DISEASES
  };

  /**
   * Returns flat array of all registered symptoms.
   */
  MatrixEngine.getAllSymptoms = function () {
    return SYMPTOM_DEFINITIONS.slice();
  };

  /**
   * Filters symptoms by anatomical/physiological system.
   */
  MatrixEngine.getSymptomsBySystem = function (systemKey) {
    if (!systemKey || typeof systemKey !== "string") return [];
    const key = systemKey.trim().toLowerCase();
    return SYMPTOM_DEFINITIONS.filter(function (sym) {
      return sym.system.toLowerCase().indexOf(key) !== -1;
    });
  };

  /**
   * Filters symptoms applicable to a target animal species.
   */
  MatrixEngine.getSymptomsBySpecies = function (species) {
    if (!species || typeof species !== "string") return [];
    const targetSp = species.trim().toLowerCase();
    return SYMPTOM_DEFINITIONS.filter(function (sym) {
      if (!Array.isArray(sym.applicableSpecies)) return false;
      return sym.applicableSpecies.indexOf(targetSp) !== -1;
    });
  };

  /**
   * Aggregates disease pools for a given species from all loaded clinical modules.
   */
  MatrixEngine._getDiseasesForSpecies = function (species) {
    const sp = (species || "").trim().toLowerCase();
    let diseasePool = [];

    // Check built-in ruminant repository
    if (["bovine", "bubaline", "caprine", "ovine"].indexOf(sp) !== -1) {
      diseasePool = diseasePool.concat(
        BUILTIN_RUMINANT_DISEASES.filter(function (d) {
          return d.species.indexOf(sp) !== -1;
        })
      );
    }

    // Check dynamically loaded species databases
    const Clinical = window.VetcareApp.ClinicalData;
    if (sp === "equine" && Array.isArray(Clinical.Equine)) {
      diseasePool = diseasePool.concat(Clinical.Equine);
    } else if (sp === "canine" && Array.isArray(Clinical.Canine)) {
      diseasePool = diseasePool.concat(Clinical.Canine);
    } else if (sp === "feline" && Array.isArray(Clinical.Feline)) {
      diseasePool = diseasePool.concat(Clinical.Feline);
    } else if (sp === "avian" && Array.isArray(Clinical.Avian)) {
      diseasePool = diseasePool.concat(Clinical.Avian);
    }

    return diseasePool;
  };

  /**
   * Scans for life-threatening clinical red flags and immediate triage directives.
   */
  MatrixEngine.detectClinicalRedFlags = function (species, selectedSymptomIds, bodyTempF) {
    const sp = (species || "bovine").trim().toLowerCase();
    const symptoms = Array.isArray(selectedSymptomIds) ? selectedSymptomIds : [];
    const temp = bodyTempF ? parseFloat(bodyTempF) : null;
    const redFlags = [];

    const has = function (symId) {
      return symptoms.indexOf(symId) !== -1;
    };

    // 1. Ruminant Red Flags
    if (["bovine", "bubaline", "caprine", "ovine"].indexOf(sp) !== -1) {
      if (has("sym-sudden-death") && (has("sym-hemorrhagic-stool") || has("sym-submandibular-edema"))) {
        redFlags.push({
          level: "EMERGENCY_BIOHAZARD",
          alertHi: "अति-घातक चेतावनी: एंथ्रेक्स (Anthrax / Splenic Fever) की प्रबल आशंका! मृत पशु का पोस्टमार्टम कतई न करें। शव को चूना डालकर 8 फीट गहरा दफनाएं।",
          alertEn: "CRITICAL BIOHAZARD: Suspected Anthrax! Never open or necropsy the carcass. Notify State Veterinary Director immediately."
        });
      }
      if ((temp && temp >= 104.0 || has("sym-high-fever")) && (has("sym-respiratory-stridor") || has("sym-submandibular-edema"))) {
        redFlags.push({
          level: "CRITICAL_AIRWAY",
          alertHi: "आपातकाल: गलघोंटू (Haemorrhagic Septicaemia / HS) का तीव्र हमला! श्वास नली अवरुद्ध होने से कुछ ही घंटों में मृत्यु का खतरा। तुरंत Ceftiofur/Oxytetracycline व कोर्टिकोस्टेरॉइड दें।",
          alertEn: "ACUTE EMERGENCY: Suspected Haemorrhagic Septicaemia (HS). High risk of imminent suffocation. Administer immediate IV antibiotics and NSAIDs."
        });
      }
      if (has("sym-crepitant-swelling") && (has("sym-acute-lameness") || has("sym-high-fever"))) {
        redFlags.push({
          level: "CRITICAL_MYONECROSIS",
          alertHi: "आपातकाल: ब्लैक क्वार्टर (Black Quarter / BQ / लंगड़ा बुखार) का संकेत! सूजन में गैस व चरचराहट। तुरंत उच्च खुराक पेनिसिलिन व स्थानीय एंटीसेप्टिक चीरा लगाएं।",
          alertEn: "EMERGENCY: Suspected Black Quarter (BQ). Severe clostridial myonecrosis. Immediate high-dose Penicillin therapy required."
        });
      }
      if (has("sym-subnormal-temp") && has("sym-sternal-recumbency")) {
        redFlags.push({
          level: "CRITICAL_METABOLIC",
          alertHi: "मेटाबोलिक आपातकाल: मिल्क फीवर (Milk Fever / Hypocalcemia)! शरीर ठंडा पड़ चुका है। तुरंत 450 मिली कैल्शियम बोरो Roman ग्लुकोनेट (CBG) धीमी गति से IV दें।",
          alertEn: "METABOLIC EMERGENCY: Milk Fever (Severe Hypocalcemia). Administer warm Calcium Borogluconate (CBG) slow IV with heart monitoring."
        });
      }
      if (has("sym-ruminal-bloat") && (has("sym-dyspnea") || has("sym-open-mouth-panting"))) {
        redFlags.push({
          level: "CRITICAL_ASPHYXIA",
          alertHi: "आपातकाल: तीव्र दम घोंटू अफारा (Acute Ruminal Tympany)! डायफ्राम पर अत्यधिक दबाव। तुरंत ट्रोकार-कैनुला अथवा स्टमक ट्यूब से गैस निकालें।",
          alertEn: "EMERGENCY: Asphyxiating Ruminal Tympany. Immediate trocharization or stomach tube decompression required to prevent heart failure."
        });
      }
      if (has("sym-red-urine") && (temp && temp >= 104.0 || has("sym-high-fever"))) {
        redFlags.push({
          level: "CRITICAL_HEMOLYSIS",
          alertHi: "रक्त-परजीवी आपातकाल: बबेसियोसिस (Babesiosis / Redwater)! तीव्र लाल रक्त कोशिका विनाश। तुरंत Berenil (Diminazene) 3.5 mg/kg deep IM दें।",
          alertEn: "HEMOPARASITIC EMERGENCY: Acute Babesiosis. Immediate Diminazene Aceturate therapy and supportive fluids required."
        });
      }
    }

    // 2. Equine Red Flags
    if (sp === "equine") {
      if (has("sym-third-eyelid-protrusion") || (has("sym-muscle-tremors") && has("sym-sternal-recumbency"))) {
        redFlags.push({
          level: "CRITICAL_NEUROTOXIC",
          alertHi: "अश्व आपातकाल: धनुस्तंभ (Tetanus / Lockjaw) की पुष्टि! तीसरी पलक बाहर आना व आरी-घोड़ा मुद्रा। तुरंत 50,000 IU TAT सीरम, पेनिसिलिन व शांत अंधेरा कमरा दें।",
          alertEn: "CRITICAL EMERGENCY: Equine Tetanus (Clostridium tetani). Administer high-dose Tetanus Antitoxin, Penicillin G, and dark silent isolation."
        });
      }
      if (has("sym-colic-pain")) {
        redFlags.push({
          level: "CRITICAL_SURGICAL",
          alertHi: "अश्व आपातकाल: गंभीर उदरशूल (Equine Colic)! आंतों में मरोड़ या रुकावट। स्टमक ट्यूब से गैस्ट्रिक रिफ्लक्स जांचें; तुरंत Flunixin Meglumine IV व Xylazine दें।",
          alertEn: "SURGICAL EMERGENCY: Acute Equine Colic. Pass nasogastric tube to prevent stomach rupture; Flunixin Meglumine IV indicated."
        });
      }
    }

    // 3. Canine Red Flags
    if (sp === "canine") {
      if (has("sym-hemorrhagic-stool") && has("sym-vomiting")) {
        redFlags.push({
          level: "CRITICAL_VIREMIA",
          alertHi: "श्वान आपातकाल: पार्वोवायरस (Canine Parvovirus Enteritis)! घातक खूनी दस्त व उल्टी। मौखिक दवा व पानी पूर्णतः बंद करें; तुरंत आक्रामक IV DNS/RL ड्रिप व Ondansetron शुरू करें।",
          alertEn: "CRITICAL EMERGENCY: Canine Parvovirus Enteritis. Strictly NPO; immediate aggressive IV fluid resuscitation and broad-spectrum IV antibiotics."
        });
      }
      if (has("sym-frothy-salivation") && (has("sym-muscle-tremors") || has("sym-lethargy-anorexia"))) {
        redFlags.push({
          level: "FATAL_ZOONOSIS",
          alertHi: "घातक जुनोटिक चेतावनी: संभावित रेबीज (Rabies Suspect)! मुंह से लार, लटकता जबड़ा या आक्रामकता। पशु को नंगे हाथों से न छुएं; तुरंत क्वारंटाइन करें।",
          alertEn: "FATAL ZOONOSIS: Suspected Rabies. Do not handle without protective gear. Immediate strict isolation and municipal notification required."
        });
      }
    }

    // 4. Feline Red Flags
    if (sp === "feline") {
      if (has("sym-stranguria-dysuria") && (has("sym-subnormal-temp") || has("sym-colic-pain"))) {
        redFlags.push({
          level: "CRITICAL_UROLOGICAL",
          alertHi: "बिल्ली आपातकाल: पेशाब बंद (Blocked Cat / FLUTD)! मूत्राशय पत्थर जैसा कड़ा। 24-48 घंटे में यूरिया/पोटेशियम से हृदय गति रुकने का खतरा; तुरंत यूरिनरी कैथेटर लगाएं।",
          alertEn: "UROLOGICAL EMERGENCY: Obstructed Male Cat (FLUTD). Risk of fatal hyperkalemic cardiac arrest. Immediate urethral de-obstruction required."
        });
      }
    }

    // 5. Avian Red Flags
    if (sp === "avian") {
      if (has("sym-comb-cyanosis") && has("sym-sudden-death")) {
        redFlags.push({
          level: "REGULATORY_ZOONOSIS",
          alertHi: "राष्ट्रीय जैव-सुरक्षा आपातकाल: बर्ड फ्लू (Avian Influenza H5N1)! कलगी का नीलापन व सामूहिक मृत्यु। उपचार पूर्णतः निषिद्ध है; तुरंत पशुपालन विभाग को सूचित करें।",
          alertEn: "REGULATORY BIOHAZARD: Suspected Avian Influenza (HPAI). Treatment strictly prohibited. Immediate flock quarantine and official notification mandated."
        });
      }
    }

    return redFlags;
  };

  /**
   * INFERENCE ALGORITHM: Evaluates symptoms and computes weighted differential diagnoses.
   *
   * @param {Object} params
   *   - species: 'bovine' | 'bubaline' | 'caprine' | 'ovine' | 'equine' | 'canine' | 'feline' | 'avian'
   *   - selectedSymptomIds: Array of symptom ID strings
   *   - bodyTempF: Optional number (e.g. 104.5)
   *   - isPregnant: Optional boolean
   * @returns {Object} Output inference containing sorted differential matches, triage flags, and input summary.
   */
  MatrixEngine.evaluateSymptoms = function (params) {
    if (!params || typeof params !== "object") {
      return { error: "Invalid parameters supplied to evaluateSymptoms" };
    }

    const species = (params.species || "bovine").trim().toLowerCase();
    const selectedIds = Array.isArray(params.selectedSymptomIds) ? params.selectedSymptomIds : [];
    const bodyTempF = params.bodyTempF ? parseFloat(params.bodyTempF) : null;
    const isPregnant = Boolean(params.isPregnant);

    const diseasePool = MatrixEngine._getDiseasesForSpecies(species);
    const redFlags = MatrixEngine.detectClinicalRedFlags(species, selectedIds, bodyTempF);
    const matches = [];

    // Helper map of selected symptoms for fast lookup
    const selectedMap = {};
    selectedIds.forEach(function (id) {
      selectedMap[id] = true;
    });

    for (let i = 0; i < diseasePool.length; i++) {
      const disease = diseasePool[i];
      let score = 0;
      let maxPossibleScore = 0;
      let matchedCount = 0;
      const unmatchedCardinal = [];

      // 1. Evaluate Cardinal / Hallmark Symptoms (Weight: 3x)
      if (Array.isArray(disease.cardinalSymptoms)) {
        for (let c = 0; c < disease.cardinalSymptoms.length; c++) {
          const cardSym = disease.cardinalSymptoms[c];
          maxPossibleScore += 30;

          // Check if this symptom item is an ID or raw string (from existing Equine/Canine/etc DBs)
          let isHit = false;
          if (typeof cardSym === "string") {
            if (selectedMap[cardSym]) {
              isHit = true;
            } else {
              // Fuzzy check for string-based databases (Equine, Canine, Feline, Avian)
              const cardLower = cardSym.toLowerCase();
              for (let s = 0; s < selectedIds.length; s++) {
                const sObj = SYMPTOM_DEFINITIONS.find(item => item.id === selectedIds[s]);
                if (sObj) {
                  const enKeyword = sObj.nameEn.toLowerCase();
                  if (cardLower.indexOf(sObj.id.replace("sym-", "")) !== -1 ||
                      cardLower.indexOf(enKeyword.split(" ")[0].toLowerCase()) !== -1) {
                    isHit = true;
                    break;
                  }
                }
              }
            }
          }

          if (isHit) {
            score += 30;
            matchedCount++;
          } else {
            unmatchedCardinal.push(cardSym);
          }
        }
      }

      // 2. Evaluate Secondary Symptoms (Weight: 1x)
      if (Array.isArray(disease.secondarySymptoms)) {
        for (let sc = 0; sc < disease.secondarySymptoms.length; sc++) {
          const secSym = disease.secondarySymptoms[sc];
          maxPossibleScore += 10;
          if (selectedMap[secSym]) {
            score += 10;
            matchedCount++;
          }
        }
      }

      // If disease doesn't define secondarySymptoms explicitly, provide baseline normalization
      if (maxPossibleScore === 0) {
        maxPossibleScore = 90;
      }

      // 3. Temperature Correlation Multiplier
      if (bodyTempF !== null && disease.tempRange) {
        maxPossibleScore += 20;
        const minT = disease.tempRange.minF || 100.0;
        const maxT = disease.tempRange.maxF || 103.0;

        if (bodyTempF >= minT && bodyTempF <= maxT) {
          score += 20; // Perfect physiological range match
        } else if (bodyTempF > maxT && (minT > 103.0 || disease.category.toLowerCase().indexOf("fever") !== -1 || disease.category.toLowerCase().indexOf("bacterial") !== -1)) {
          score += 15; // High febrile infectious consistency
        } else if (bodyTempF < 100.0 && disease.id.indexOf("milk-fever") !== -1) {
          score += 20; // Classic hypocalcemic subnormal correlation
        } else {
          score = Math.max(0, score - 10); // Temperature divergence penalty
        }
      }

      // 4. Pregnancy Correlation
      if (isPregnant) {
        if (selectedMap["sym-abortion"] && disease.id.indexOf("brucellosis") !== -1) {
          score += 25;
        }
        if (selectedMap["sym-vaginal-prolapse"]) {
          score += 20;
        }
      }

      // Calculate confidence percentage
      const rawPct = maxPossibleScore > 0 ? (score / maxPossibleScore) * 100 : 0;
      const matchConfidence = Math.min(99, Math.round(rawPct));

      // Filter: only include matches with at least 15% confidence or at least 1 cardinal match
      if (matchConfidence >= 15 || matchedCount > 0) {
        let urgency = disease.urgency || "MODERATE";
        if (matchConfidence >= 65 || redFlags.length > 0) {
          urgency = "CRITICAL";
        } else if (matchConfidence >= 40) {
          urgency = "HIGH";
        }

        matches.push({
          diseaseId: disease.id,
          nameEn: disease.nameEn || disease.name || disease.id,
          nameHi: disease.nameHi || "अज्ञात नैदानिक प्रोफाइल",
          category: disease.category || "General",
          matchConfidence: matchConfidence,
          matchedSymptomsCount: matchedCount,
          unmatchedKeySymptoms: unmatchedCardinal.slice(0, 3),
          urgencyLevel: urgency
        });
      }
    }

    // Sort descending by match confidence
    matches.sort(function (a, b) {
      return b.matchConfidence - a.matchConfidence;
    });

    return {
      species: species,
      totalSymptomsEvaluated: selectedIds.length,
      bodyTempInputF: bodyTempF,
      isPregnantInput: isPregnant,
      redFlags: redFlags,
      hasEmergencyRedFlags: redFlags.length > 0,
      differentialMatches: matches.slice(0, 5) // Return top 5 high-probability differentials
    };
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.SymptomMatrix = MatrixEngine;

})();
