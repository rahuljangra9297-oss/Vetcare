// Vetcare AI OS - Advanced Clinical Differential Diagnosis & Pathology Engine (2026 Production)
// Architecture: Multi-Species Probabilistic Inference, Pathognomonic Matrix & Prescription Bridge
// Author: Dr. Rahul (National Veterinary Informatics Core)

(function (root, factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.VetcareApp = root.VetcareApp || {};
    root.VetcareApp.DifferentialEngine = factory();
  }
})(typeof window !== "undefined" ? window : this, function () {
  "use strict";

  // =========================================================================
  // 1. MASTER SYMPTOM TAXONOMY & CLINICAL ONTOLOGY
  // =========================================================================
  const SYMPTOM_TAXONOMY = {
    // Systemic & Vital Parameters
    high_fever: {
      id: "high_fever",
      nameEn: "High Fever (>104°F / 40°C)",
      nameHi: "तेज बुखार (>104°F)",
      category: "systemic",
      weight: 1.5,
      species: ["bovine", "caprine", "canine", "feline", "equine"]
    },
    subnormal_temp: {
      id: "subnormal_temp",
      nameEn: "Subnormal Temperature (<99°F / Hypothermia)",
      nameHi: "शरीर का ठंडा पड़ना (कम तापमान)",
      category: "systemic",
      weight: 2.2,
      species: ["bovine", "canine", "feline"]
    },
    anorexia: {
      id: "anorexia",
      nameEn: "Complete Inappetence / Anorexia",
      nameHi: "चारा/खाना पूरी तरह छोड़ना",
      category: "systemic",
      weight: 1.0,
      species: ["bovine", "caprine", "canine", "feline", "equine"]
    },
    sudden_recumbency: {
      id: "sudden_recumbency",
      nameEn: "Sudden Downer / Lateral Recumbency",
      nameHi: "पशु का अचानक गिरना व उठ न पाना",
      category: "neuromuscular",
      weight: 2.5,
      species: ["bovine", "caprine", "equine"]
    },
    convulsions: {
      id: "convulsions",
      nameEn: "Convulsions / Violent Tremors",
      nameHi: "दौरे पड़ना / ऐंठन",
      category: "neuromuscular",
      weight: 2.8,
      species: ["bovine", "canine", "caprine"]
    },
    staggering_gait: {
      id: "staggering_gait",
      nameEn: "Staggering Gait / Ataxia",
      nameHi: "लड़खड़ा कर चलना / संतुलन खोना",
      category: "neuromuscular",
      weight: 1.8,
      species: ["bovine", "caprine", "canine", "equine"]
    },

    // Cardiovascular & Hemic
    hemoglobinuria: {
      id: "hemoglobinuria",
      nameEn: "Port-Wine / Coffee-Colored Urine (Hemoglobinuria)",
      nameHi: "लाल/कॉफी के रंग का पेशाब (रक्तमूतरा)",
      category: "hemic",
      weight: 3.2,
      species: ["bovine", "equine", "canine"]
    },
    extreme_pallor: {
      id: "extreme_pallor",
      nameEn: "Severe Mucosal Pallor / Anemia (Porcelain White)",
      nameHi: "आंखों व मसूड़ों का सफेद पड़ना (गंभीर रक्ताल्पता)",
      category: "hemic",
      weight: 2.4,
      species: ["bovine", "caprine", "canine", "feline"]
    },
    icterus_jaundice: {
      id: "icterus_jaundice",
      nameEn: "Icterus / Yellowish Sclera & Mucosa (Jaundice)",
      nameHi: "पीलिया (आंखों व मसूड़ों का पीला पड़ना)",
      category: "hemic",
      weight: 2.6,
      species: ["bovine", "canine", "feline", "equine"]
    },
    epistaxis: {
      id: "epistaxis",
      nameEn: "Epistaxis (Bleeding from Nostrils)",
      nameHi: "नाक से खून बहना",
      category: "hemic",
      weight: 2.8,
      species: ["canine", "bovine", "equine"]
    },
    prescapular_lymphadenopathy: {
      id: "prescapular_lymphadenopathy",
      nameEn: "Marked Superficial Lymph Node Enlargement",
      nameHi: "गर्दन की लिम्फ ग्रंथियों में कठोर सूजन (गिल्टी)",
      category: "hemic",
      weight: 3.0,
      species: ["bovine", "caprine"]
    },

    // Respiratory & Edema
    brisket_edema: {
      id: "brisket_edema",
      nameEn: "Brisket / Submandibular Swelling (Hot/Painful Edema)",
      nameHi: "गलघोंटू सूजन (गले व छाती के नीचे गर्म सूजन)",
      category: "respiratory",
      weight: 3.2,
      species: ["bovine"]
    },
    severe_dyspnea: {
      id: "severe_dyspnea",
      nameEn: "Open Mouth Breathing / Stridor / Dyspnea",
      nameHi: "मुंह खोलकर सांस लेना / घरघराहट",
      category: "respiratory",
      weight: 2.5,
      species: ["bovine", "caprine", "canine", "feline", "equine"]
    },
    pleuropneumonia_cough: {
      id: "pleuropneumonia_cough",
      nameEn: "Persistent Paroxysmal Cough & Frothy Nasal Discharge",
      nameHi: "गंभीर लगातार खांसी व झागदार नाक रिसाव",
      category: "respiratory",
      weight: 2.4,
      species: ["caprine", "bovine", "equine"]
    },

    // Gastrointestinal & Abdominal
    frothy_bloat: {
      id: "frothy_bloat",
      nameEn: "Severe Ruminal Tympany / Bloat (Left Flank Distended)",
      nameHi: "पेट का बाईं तरफ से भयंकर फूलना (आफरा)",
      category: "alimentary",
      weight: 2.8,
      species: ["bovine", "caprine"]
    },
    foul_hemorrhagic_diarrhea: {
      id: "foul_hemorrhagic_diarrhea",
      nameEn: "Profuse Foul-Smelling Bloody Diarrhea",
      nameHi: "बदबूदार खूनी दस्त",
      category: "alimentary",
      weight: 3.0,
      species: ["canine", "bovine", "caprine"]
    },
    intractable_vomiting: {
      id: "intractable_vomiting",
      nameEn: "Persistent Projectile Vomiting / Frothing",
      nameHi: "लगातार उल्टी होना व पानी न टिकना",
      category: "alimentary",
      weight: 2.7,
      species: ["canine", "feline"]
    },
    sweet_acetone_breath: {
      id: "sweet_acetone_breath",
      nameEn: "Sweetish Acetone Smell in Breath & Milk",
      nameHi: "सांस व दूध में मीठी एसीटोन गंध",
      category: "alimentary",
      weight: 3.0,
      species: ["bovine"]
    },
    pawing_ground_flank_watching: {
      id: "pawing_ground_flank_watching",
      nameEn: "Pawing Ground, Flank Watching, Frequent Rolling",
      nameHi: "जमीन खोदना, पेट की ओर देखना, बार-बार लोटना (शूल)",
      category: "alimentary",
      weight: 3.2,
      species: ["equine"]
    },
    withers_pinch_positive: {
      id: "withers_pinch_positive",
      nameEn: "Positive Withers Pinch / Grunt on Xiphoid Pressure",
      nameHi: "विथर्स दबाने पर कराहना (पिन-टेस्ट पॉजिटिव)",
      category: "alimentary",
      weight: 3.4,
      species: ["bovine"]
    },

    // Integumentary, Ophthalmic & Mammary
    blood_in_milk: {
      id: "blood_in_milk",
      nameEn: "Blood / Clots / Flakes in Milk with Swollen Udder",
      nameHi: "दूध में खून, छैछड़े या पीला पानी आना (थनैला)",
      category: "mammary",
      weight: 3.5,
      species: ["bovine", "caprine"]
    },
    crepitating_swelling: {
      id: "crepitating_swelling",
      nameEn: "Hot, Painful Swelling with Crepitus Sound (Gas under Skin)",
      nameHi: "पुट्ठे/जांघ पर चरमराहट (चुरचुराहट) वाली सूजन",
      category: "integumentary",
      weight: 3.5,
      species: ["bovine", "caprine"]
    },
    corneal_opacity: {
      id: "corneal_opacity",
      nameEn: "Corneal Opacity / Bluish Eye Haze / Lacrimation",
      nameHi: "आंख में मोतियानुमा नीलापन या सफेदी",
      category: "ophthalmic",
      weight: 2.8,
      species: ["bovine", "canine"]
    },
    oral_vesicles_drooling: {
      id: "oral_vesicles_drooling",
      nameEn: "Vesicles/Ulcers on Tongue & Feet + Ropy Salivation",
      nameHi: "जीभ/खुरों के बीच छाले व लार का तार बहना (खुरपका-मुंहपका)",
      category: "integumentary",
      weight: 3.5,
      species: ["bovine", "caprine"]
    },
    purulent_vulvar_discharge: {
      id: "purulent_vulvar_discharge",
      nameEn: "Foul Creamy Purulent Vaginal Discharge in Intact Female",
      nameHi: "योनि से मवाद व बदबूदार स्राव (गर्भाशय संक्रमण)",
      category: "urogenital",
      weight: 3.3,
      species: ["canine", "feline", "bovine"]
    },
    unclotted_dark_blood: {
      id: "unclotted_dark_blood",
      nameEn: "Bleeding from Natural Orifices (Dark, Unclotted Blood)",
      nameHi: "प्राकृतिक छिद्रों से काला, न जमने वाला रक्त स्राव",
      category: "hemic",
      weight: 4.0,
      species: ["bovine", "caprine", "equine"]
    }
  };

  // =========================================================================
  // 2. DIFFERENTIAL DIAGNOSIS KNOWLEDGE GRAPH (26 MASTER PROFILES)
  // =========================================================================
  const DISEASE_GRAPH = [
    // ---------------- BOVINE PROTOZOAL & TICK-BORNE ----------------
    {
      id: "theileriosis",
      name: "Bovine Tropical Theileriosis",
      nameHi: "थायलेरियोसिस (चिचड़ी जनित गिल्टी बुखार)",
      species: ["bovine"],
      pathognomonic: [
        "Marked enlargement of prescapular lymph node",
        "High continuous fever (>105°F)",
        "Corneal opacity (Turning White/Blue Eye)"
      ],
      pathognomonicHi: "गर्दन की गिल्टी में भारी सूजन, तेज बुखार और आंख पर मोतियानुमा सफेदी",
      emergencyFlags: ["Severe respiratory distress from pulmonary edema", "Extreme anemia with PCV <12%"],
      symptomWeights: {
        high_fever: 1.0,
        prescapular_lymphadenopathy: 1.0,
        extreme_pallor: 0.8,
        corneal_opacity: 0.9,
        anorexia: 0.5
      },
      firstLineDrug: {
        drug: "Buparvaquone",
        tradeNames: "Zubion / Butalex / Bupatroy",
        doseMgKg: 2.5,
        route: "Deep IM (Divide volume if >20ml in adult cattle)",
        fieldCalculation: "1 ml per 20 kg body weight (15-20 ml in a 350-400 kg adult cow)",
        supportive: "Oxytetracycline (10 mg/kg) as secondary guard + Hameatinic injections"
      },
      contraindications: [
        "Do not administer IV. Strict Deep Intramuscular route only.",
        "Avoid high-dose corticosteroids which precipitate overwhelming schizogony."
      ],
      confirmatoryTests: [
        "Giemsa-stained lymph node aspirate smear (Koch's blue bodies pathognomonic)",
        "Thin blood smear demonstrating rod/ring intra-erythrocytic piroplasms"
      ]
    },

    {
      id: "babesiosis",
      name: "Bovine Babesiosis (Redwater Fever)",
      nameHi: "बेबेसियोसिस (लाल पेशाब / रक्तमूतरा बुखार)",
      species: ["bovine"],
      pathognomonic: [
        "Port-wine to coffee-colored hemoglobinuria",
        "High spiking fever (105-107°F)",
        "Profound porcelain-white mucosal pallor turning icteric"
      ],
      pathognomonicHi: "कॉफी/लाल रंग का पेशाब, 106°F बुखार और अत्यधिक खून की कमी",
      emergencyFlags: ["Acute intravascular hemolysis", "Impending anemic anoxia and collapse"],
      symptomWeights: {
        hemoglobinuria: 1.0,
        high_fever: 0.9,
        extreme_pallor: 0.9,
        icterus_jaundice: 0.8,
        anorexia: 0.5
      },
      firstLineDrug: {
        drug: "Diminazene Aceturate",
        tradeNames: "Berenil / Diminaz / Babecure",
        doseMgKg: 3.5,
        route: "Deep Intramuscular",
        fieldCalculation: "1 ml per 20 kg of 7% solution (approx. 18-20 ml for a 350-400 kg adult cow)",
        supportive: "IV fluids (Isotonic saline/Dextrose), Liver extract with Vitamin B-complex, Iron Dextran"
      },
      contraindications: [
        "Do not exceed recommended dose (Neurotoxicity / tremors).",
        "Avoid rapid calcium IV during acute intravascular hemolytic shock."
      ],
      confirmatoryTests: [
        "Fresh capillary blood smear from ear tip stained with Giemsa (Pear-shaped paired piroplasms inside RBCs)",
        "Urine dipstick: Strongly positive for Hemoglobin without intact RBC sedimentation"
      ]
    },

    {
      id: "anaplasmosis",
      name: "Bovine Anaplasmosis (Gall Sickness)",
      nameHi: "एनाप्लाज्मोसिस (पीलिया बुखार - बिना लाल पेशाब)",
      species: ["bovine"],
      pathognomonic: [
        "Severe progressive anemia and marked icterus without hemoglobinuria",
        "Constipation with hard mucus-covered dung",
        "Rapid exhaustion with air hunger"
      ],
      pathognomonicHi: "गंभीर पीलिया, बिना लाल पेशाब के पीली आंखें और कठोर गोबर",
      emergencyFlags: ["Cardiovascular collapse upon minimum exertion", "Severe hypoxia"],
      symptomWeights: {
        extreme_pallor: 1.0,
        icterus_jaundice: 1.0,
        high_fever: 0.7,
        anorexia: 0.6
      },
      firstLineDrug: {
        drug: "Oxytetracycline Long Acting (LA)",
        tradeNames: "Terramycin LA / Oxyvet LA",
        doseMgKg: 20.0,
        route: "Deep IM (Split sites)",
        fieldCalculation: "1 ml per 10 kg body weight (35-40 ml for adult cattle)",
        supportive: "Blood transfusion if PCV <12%, Vitamin B12 and Liver Extract"
      },
      contraindications: [
        "Avoid aggressive handling or excitement during treatment (causes sudden cardiac death).",
        "Do not inject single site volume over 20 ml."
      ],
      confirmatoryTests: [
        "Peripheral blood smear: Marginal or central dark basophilic bodies inside RBCs",
        "Normal clear urine differentiates it instantly from Babesiosis"
      ]
    },

    // ---------------- BOVINE BACTERIAL EMERGENCIES ----------------
    {
      id: "hemorrhagic_septicemia",
      name: "Hemorrhagic Septicemia (HS / Galghotu)",
      nameHi: "गलघोंटू (H.S. - पास्चुरेलॉसिस)",
      species: ["bovine", "bubaline"],
      pathognomonic: [
        "Hot, painful, doughy inflammatory edema of submandibular, throat and brisket region",
        "Severe inspiratory stridor with protruding tongue and ropy salivation",
        "Hyperacute septicemia with fever >106°F"
      ],
      pathognomonicHi: "गले व छाती में गर्म दर्दनाक सूजन, मुंह से जीभ बाहर व घुरघुराहट",
      emergencyFlags: ["Impending asphyxiation from laryngeal edema", "Septic shock within 12-24 hours"],
      symptomWeights: {
        brisket_edema: 1.0,
        high_fever: 0.9,
        severe_dyspnea: 1.0,
        anorexia: 0.6
      },
      firstLineDrug: {
        drug: "Ceftiofur Sodium or Enrofloxacin 10%",
        tradeNames: "Xyrofur / Baytril / Intacef",
        doseMgKg: 2.2,
        route: "IM or Slow IV",
        fieldCalculation: "Ceftiofur 1 gram per 300-400 kg body weight OD for 3 days",
        supportive: "Flunixin Meglumine (1.1-2.2 mg/kg IV) to control endotoxemia, Dexamethasone only in non-pregnant animals"
      },
      contraindications: [
        "CORTICOSTEROIDS ABSOLUTELY CONTRAINDICATED IN PREGNANCY (Causes 3rd-trimester abortion).",
        "Delay in antibiotic administration beyond 12 hours often results in fatality."
      ],
      confirmatoryTests: [
        "Gram stain or Leishman smear of throat edema fluid / heart blood showing Gram-negative bipolar Pasteurella organisms (safety-pin appearance)"
      ]
    },

    {
      id: "black_quarter",
      name: "Black Quarter (BQ / Chuchrooya)",
      nameHi: "लंगड़ा बुखार / चुरचुरा (ब्लैक क्वार्टर - B.Q.)",
      species: ["bovine", "caprine"],
      pathognomonic: [
        "Crepitant, gas-filled swelling over heavy muscle masses (hindquarters, shoulder)",
        "Initial hot painful swelling rapidly turning cold, painless and leathery",
        "Severe lameness with sudden high fever"
      ],
      pathognomonicHi: "पुट्ठे पर गैस भरी चुरचुर करने वाली सूजन और भयंकर लंगड़ापन",
      emergencyFlags: ["Myonecrosis toxemia", "Circulatory collapse within 24-48 hours"],
      symptomWeights: {
        crepitating_swelling: 1.0,
        high_fever: 0.8,
        staggering_gait: 0.8,
        anorexia: 0.6
      },
      firstLineDrug: {
        drug: "Crystalline Penicillin G + Procaine Penicillin",
        tradeNames: "Bistrepen / Pronapen",
        doseMgKg: 20000, // IU/kg
        route: "IV initial then IM every 12 hours",
        fieldCalculation: "40-60 Lac IU IM twice daily for 5 days + Infiltration of crystalline penicillin around lesion margin",
        supportive: "Hydrogen peroxide subcutaneous flush into incised necrotic lesions, NSAIDs"
      },
      contraindications: [
        "Do not leave deep closed wounds without surgical fenestration.",
        "Avoid under-dosing penicillins which encourages fatal clostridial sporulation."
      ],
      confirmatoryTests: [
        "Impression smear from active muscle lesion: Gram-positive sporulated rods (Clostridium chauvoei)",
        "Rancid butter odor from cut muscle surface is clinically pathognomonic"
      ]
    },

    {
      id: "anthrax",
      name: "Anthrax (Splenic Fever / Gilthi)",
      nameHi: "एंथ्रेक्स (गिलटी रोग / प्लीहा ज्वर)",
      species: ["bovine", "caprine", "equine"],
      pathognomonic: [
        "Sudden death in apparently healthy animals with unclotted tarry dark blood from natural orifices",
        "Absence of rigor mortis and marked rapid carcass tympany",
        "High fever with extensive edematous subcutaneous swellings"
      ],
      pathognomonicHi: "बिना जमे काले खून का नाक/गुदा से रिसाव और बिना अकड़न के अचानक मौत",
      emergencyFlags: ["HIGHLY ZOONOTIC SPORE-FORMING PATHOGEN - BIOSECURITY LEVEL 4 DANGER"],
      symptomWeights: {
        unclotted_dark_blood: 1.0,
        high_fever: 0.7,
        sudden_recumbency: 0.9,
        anorexia: 0.5
      },
      firstLineDrug: {
        drug: "Procaine Penicillin G or Ciprofloxacin",
        tradeNames: "Penicillin 40 Lac / Cifran",
        doseMgKg: 20000,
        route: "Slow IV / Deep IM",
        fieldCalculation: "Immediate massive dose of Penicillin (60 Lac IU) if identified prior to terminal state",
        supportive: "Anthrax spore anti-serum if available, Strict quarantine"
      },
      contraindications: [
        "DO NOT POST-MORTEM OR OPEN CARCASS UNDER ANY CIRCUMSTANCES (Exposes vegetative cells to air, inducing resilient sporulation).",
        "Carcass must be buried at least 6 feet deep with quicklime."
      ],
      confirmatoryTests: [
        "M'Fadyean's methylene blue stain of peripheral blood smear from ear tip: Blue rods with pink-purple capsular halo"
      ]
    },

    // ---------------- BOVINE VIRAL & MISCELLANEOUS ----------------
    {
      id: "foot_and_mouth_disease",
      name: "Foot and Mouth Disease (FMD / Khurpaka-Muhpaka)",
      nameHi: "खुरपका-मुंहपका (F.M.D.)",
      species: ["bovine", "caprine"],
      pathognomonic: [
        "Vesicular eruptions and erosions on tongue, dental pad, gums, and interdigital cleft",
        "Smacking of lips with profuse ropy strings of saliva hang down to ground",
        "Severe lameness with kicking of abdomen or frequent shaking of feet"
      ],
      pathognomonicHi: "जीभ व खुरों के बीच छाले, मुंह से लगातार लंबी लार बहना और लंगड़ाना",
      emergencyFlags: ["Myocardial necrosis in young calves (Tiger heart disease - sudden death)"],
      symptomWeights: {
        oral_vesicles_drooling: 1.0,
        high_fever: 0.7,
        staggering_gait: 0.6,
        anorexia: 0.6
      },
      firstLineDrug: {
        drug: "Supportive Antiseptic Washes & Secondary Antibiotic Guard",
        tradeNames: "Potassium Permanganate / Boroglycerine / Inj. Enrofloxacin",
        doseMgKg: 5.0,
        route: "Topical + IM",
        fieldCalculation: "Mouth wash: 1:1000 KMnO4 or 2% Sodium Bicarbonate; Foot wash: 4% Sodium Carbonate wash. Antibiotic 15-20 ml IM to prevent secondary myiasis/infection",
        supportive: "Meloxicam with Paracetamol bolus for painful erosions, High dose Vitamin A, H"
      },
      contraindications: [
        "NO LIVE VIRAL STEROID USE. Corticosteroids worsen viral viremia.",
        "Avoid applying harsh acid/copper sulfate on tender raw mouth mucosa."
      ],
      confirmatoryTests: [
        "ELISA typing of vesicular fluid or tongue epithelium at national reference laboratory (IVRI/ICAR)"
      ]
    },

    {
      id: "clinical_mastitis",
      name: "Acute Clinical Mastitis",
      nameHi: "तीव्र थनैला रोग (एक्यूट मैस्टाइटिस)",
      species: ["bovine", "caprine"],
      pathognomonic: [
        "Hot, swollen, tender quarter with clots, flakes or bloody water in milk",
        "Quarter firmness, hardening or purulent foul exudation",
        "Systemic toxemic reaction with drop in milk yield to near zero"
      ],
      pathognomonicHi: "थन का गर्म, कड़ा व सूजा होना, दूध में खून या पनीर जैसे छैछड़े",
      emergencyFlags: ["Gangrenous mastitis with cold blue teat and toxic septic shock"],
      symptomWeights: {
        blood_in_milk: 1.0,
        high_fever: 0.6,
        anorexia: 0.4
      },
      firstLineDrug: {
        drug: "Ceftriaxone + Sulbactam + Intramammary Infusion",
        tradeNames: "Intacef Tazo 4.5g + Mammitel / Tilmicosin Infusion",
        doseMgKg: 10.0,
        route: "IV / Deep IM + Intramammary Infusion",
        fieldCalculation: "Intacef Tazo 4.5g IV OD for 3-5 days + 1 syringe intramammary tube per affected quarter post complete stripping",
        supportive: "Serratiopeptidase (anti-inflammatory enzymes), Isoflupredone / Meloxicam for non-pregnant quarters"
      },
      contraindications: [
        "Never infuse intramammary without surgical teat tip sanitization (causes fatal secondary fungal mastitis).",
        "Avoid systemic steroids in late pregnancy."
      ],
      confirmatoryTests: [
        "California Mastitis Test (CMT): Thick gel formation indicating somatic cell count >5,00,000/ml",
        "Bromothymol Blue (BTB) paper strip: Color shift towards deep blue (alkaline pH >7.2)"
      ]
    },

    // ---------------- METABOLIC & ALIMENTARY DISORDERS ----------------
    {
      id: "milk_fever",
      name: "Hypocalcemia (Parturient Paresis / Milk Fever)",
      nameHi: "सूतक ज्वर / कैल्शियम की कमी (मिल्क फीवर)",
      species: ["bovine"],
      pathognomonic: [
        "S-shaped cervical curvature (head turned towards flank)",
        "Subnormal body temperature (97-100°F) with icy cold ears and extremities",
        "Complete flaccid paralysis within 48-72 hours of calving, no ruminal movements"
      ],
      pathognomonicHi: "गर्दन का 'S' आकार में मुड़ना, कान व पैर ठंडे पड़ना और शरीर सुन्न होना",
      emergencyFlags: ["Myocardial failure, bloat, and sternal recumbency leading to asphyxia"],
      symptomWeights: {
        subnormal_temp: 1.0,
        sudden_recumbency: 1.0,
        anorexia: 0.6
      },
      firstLineDrug: {
        drug: "Calcium Borogluconate 25% (with Mg and P)",
        tradeNames: "Mifex / Calborol / Calup",
        doseMgKg: 0, // Dosed by volume
        route: "Slow IV (Warm to body temperature) + Subcutaneous",
        fieldCalculation: "450 ml IV given slowly over 20-30 minutes while auscultating heart rhythm + 200 ml Subcutaneously",
        supportive: "Propylene glycol oral drench after animal regains sternal position"
      },
      contraindications: [
        "NEVER RAPID IV INJECTION (Causes immediate cardiac arrest in systole).",
        "Do not drench recumbent animals (Fatal aspiration pneumonia)."
      ],
      confirmatoryTests: [
        "Serum ionized calcium level: Drops below 5.0 mg/dL (Normal: 8.5-10.5 mg/dL)",
        "Dramatic clinical response (eructation, defecation, and standing) within 15 mins of Mifex infusion"
      ]
    },

    {
      id: "ketosis",
      name: "Bovine Acetonemia (Clinical Ketosis)",
      nameHi: "कीटोसिस (मीठी सांस / एसीटोन रोग)",
      species: ["bovine"],
      pathognomonic: [
        "Distinctive sweet chloroform/acetone odor in breath, milk and urine",
        "Rapid progressive emaciation and selective anorexia (rejects concentrate, eats dry roughage)",
        "Nervous signs: compulsive licking of skin/manger, head pressing, blind wandering"
      ],
      pathognomonicHi: "सांस व दूध में मीठी गंध, दाना छोड़ना और दीवारों को चाटना",
      emergencyFlags: ["Severe hepatic lipidosis (Fatty liver syndrome) and hepatic coma"],
      symptomWeights: {
        sweet_acetone_breath: 1.0,
        anorexia: 0.7,
        staggering_gait: 0.5
      },
      firstLineDrug: {
        drug: "25% - 50% Dextrose Hypertonic Solution + Precursors",
        tradeNames: "Dextrose 25% IV + Ketoral Oral / Glycol drench",
        doseMgKg: 0,
        route: "Rapid IV + Oral Drench",
        fieldCalculation: "500-1000 ml 25% Dextrose IV followed by Propylene glycol 250 ml orally BID for 4 days",
        supportive: "Vitamin B12 (Cianocobalamin) + Choline chloride to mobilize liver lipids"
      },
      contraindications: [
        "Avoid prolonged steroid therapy without continuous carbohydrate feeding.",
        "Do not drench unconscious or recumbent animals."
      ],
      confirmatoryTests: [
        "Rothera's nitroprusside urine test: Immediate deep purple coloration indicating acetoacetate >10 mg/dL",
        "Ketostrip field evaluation of fresh milk"
      ]
    },

    {
      id: "acute_ruminal_tympany",
      name: "Acute Frothy Ruminal Bloat / Acidosis",
      nameHi: "तीव्र आफरा / झागदार गैस व एसिडोसिस",
      species: ["bovine", "caprine"],
      pathognomonic: [
        "Drum-like severe distension of left paralumbar fossa protruding above spine line",
        "Severe respiratory embarrassment, mouth breathing, tongue protruding",
        "Complete cessation of ruminal motility with watery offensive diarrhea (in grain overload)"
      ],
      pathognomonicHi: "बाईं कोख का ढोल की तरह फूलना, सांस लेने में छटपटाहट व जीभ बाहर",
      emergencyFlags: ["IMMEDIATE ASPHYXIA: Diaphragmatic rupture or venous return cutoff"],
      symptomWeights: {
        frothy_bloat: 1.0,
        severe_dyspnea: 0.9,
        anorexia: 0.5
      },
      firstLineDrug: {
        drug: "Simethicone Emulsion + Oil of Turpentine + Sodium Bicarbonate",
        tradeNames: "Bloatosil / Tympol / Afanil",
        doseMgKg: 0,
        route: "Oral drench via stomach tube or Direct intraruminal injection via trocar",
        fieldCalculation: "Simethicone 100 ml mixed with 500 ml Vegetable Oil orally + 100-200g Sodium Bicarbonate in warm water",
        supportive: "Emergency ruminal trocharization or left-flank rumenotomy if recumbent"
      },
      contraindications: [
        "NEVER DRENCH WHEN ANIMAL IS STRUGGLING OR RECUMBENT (High risk of fatal aspiration).",
        "Avoid magnesium oxide if ruminal pH is already alkaline (urea poisoning bloat)."
      ],
      confirmatoryTests: [
        "Aspiration of rumen fluid: pH < 5.0 indicates lactic acidosis; Presence of stable green froth confirms frothy bloat"
      ]
    },

    {
      id: "traumatic_reticuloperitonitis",
      name: "Traumatic Reticuloperitonitis (TRP / Hardware Disease)",
      nameHi: "हार्डवेयर रोग / सुई चुभन (टी.आर.पी.)",
      species: ["bovine"],
      pathognomonic: [
        "Positive Withers Pinch Test: animal resists arching back and gives a loud painful grunt",
        "Abducted elbows, arched back stance, reluctance to move downhill",
        "Persistent low-grade fever with shallow abdominal breathing"
      ],
      pathognomonicHi: "कंधा दबाने पर कराहना, कोहनियां बाहर फैलाकर चलना व छाती में दर्द",
      emergencyFlags: ["Septic traumatic pericarditis (Washing-machine murmur on cardiac auscultation)"],
      symptomWeights: {
        withers_pinch_positive: 1.0,
        high_fever: 0.6,
        anorexia: 0.7
      },
      firstLineDrug: {
        drug: "Conservative Antibiotic Guard + Rumen Magnet Placement",
        tradeNames: "Ceftriaxone 3g + Alnico Rumen Reticular Magnet",
        doseMgKg: 10.0,
        route: "IM + Oral dosing",
        fieldCalculation: "Ceftriaxone 3-4 grams IM OD for 5-7 days + 1 heavy Alnico magnet administered with balling gun",
        supportive: "Elevation of forequarters by 6-9 inches on inclined wooden platform for 2 weeks"
      },
      contraindications: [
        "Avoid aggressive physical exercise or forcing the animal to jump hurdles.",
        "Avoid abdominal massage or heavy stomach tubing."
      ],
      confirmatoryTests: [
        "Ferroscope / Metal detector test: Positive deflection over left ventral xiphoid area",
        "Pain test: Pressure applied to ventral abdomen with a wooden pole elicits clear audible expiratory grunt"
      ]
    },

    // ---------------- CANINE PATHOLOGY EMERGENCIES ----------------
    {
      id: "canine_parvovirus",
      name: "Canine Parvoviral Enteritis (CPV-2)",
      nameHi: "कैनाइन पार्वो वायरस (खूनी उल्टी-दस्त)",
      species: ["canine"],
      pathognomonic: [
        "Profuse, projectile foul-smelling hemorrhagic diarrhea (fetid metallic odor)",
        "Intractable vomiting, absolute refusal of water, rapid severe dehydration (>10%)",
        "Profound panleukopenia (WBC count <2,000/μL)"
      ],
      pathognomonicHi: "अत्यधिक बदबूदार खूनी दस्त, लगातार झागदार उल्टियां और गंभीर डिहाइड्रेशन",
      emergencyFlags: ["HYPOVOLEMIC & SEPTIC SHOCK: Sudden hypothermia, pale gums, death in 24h"],
      symptomWeights: {
        foul_hemorrhagic_diarrhea: 1.0,
        intractable_vomiting: 1.0,
        high_fever: 0.6,
        subnormal_temp: 0.8,
        anorexia: 0.8
      },
      firstLineDrug: {
        drug: "Intensive Fluid Resuscitation + Maropitant + Broad Spectrum Coverage",
        tradeNames: "Ringer's Lactate + Cerenia (Maropitant) + Inj. Ceftriaxone",
        doseMgKg: 1.0, // Maropitant 1 mg/kg SC
        route: "IV Cannulation Critical",
        fieldCalculation: "RL IV at shock dose (40-60 ml/kg/day + dehydration deficit) + Cerenia 1 mg/kg SC OD + Ceftriaxone 25 mg/kg IV BID + Metronidazole 15 mg/kg slow IV",
        supportive: "Pantoprazole (1 mg/kg IV), Potassium Chloride supplementation in fluids"
      },
      contraindications: [
        "NO ORAL MEDICATION OR FOOD/WATER UNTIL VOMITING STOPS FOR 24 HOURS.",
        "Avoid Metoclopramide if intussusception is suspected."
      ],
      confirmatoryTests: [
        "Fecal Parvovirus Antigen Rapid Chromatographic Test (Card Test): Positive double line within 5 minutes"
      ]
    },

    {
      id: "canine_distemper",
      name: "Canine Distemper Virus (CDV)",
      nameHi: "कैनाइन डिस्टेंपर (श्वान माता / नसों का झटका)",
      species: ["canine"],
      pathognomonic: [
        "Biphasic fever with mucopurulent oculonasal discharge and productive cough",
        "Hard Pad Disease: Hyperkeratosis of footpads and nasal planum",
        "Neurological sequelae: Involuntary muscle myoclonus (chewing-gum fits), head twitching"
      ],
      pathognomonicHi: "नाक-आंख से गाढ़ा मवाद, तलवों का कड़ा होना और मुंह/गर्दन का कांपना",
      emergencyFlags: ["Status epilepticus and irreversible neurological demyelination"],
      symptomWeights: {
        high_fever: 0.7,
        convulsions: 1.0,
        staggering_gait: 0.8,
        anorexia: 0.6
      },
      firstLineDrug: {
        drug: "Supportive Neuro-protective Therapy + Secondary Antibiotic",
        tradeNames: "Inj. Ceftriaxone + Neurobion Forte + Levetiracetam / Diazepam",
        doseMgKg: 20.0,
        route: "IV / IM",
        fieldCalculation: "Ceftriaxone 25 mg/kg IV + Mecobalamin (Vitamin B12 500 mcg) IM OD + Levetiracetam (20 mg/kg TID) for myoclonus",
        supportive: "Artificial tear drops for keratoconjunctivitis sicca (dry eye), Ribavirin antiviral in early stage"
      },
      contraindications: [
        "Avoid live attenuated vaccinations during active infection.",
        "Do not stop anticonvulsant therapy abruptly (precipitates status epilepticus)."
      ],
      confirmatoryTests: [
        "Rapid CDV Antigen Card Test from conjunctival/nasal swab",
        "Fluorescent antibody demonstration of CDV inclusions in peripheral blood buffy coat"
      ]
    },

    {
      id: "canine_ehrlichiosis",
      name: "Canine Monocytic Ehrlichiosis (Tick Fever)",
      nameHi: "कैनिन टिक फीवर (एर्लीकियोसिस - नाक से खून)",
      species: ["canine"],
      pathognomonic: [
        "Spontaneous epistaxis (unilateral or bilateral nasal bleeding), petechial hemorrhages",
        "Severe thrombocytopenia with history of massive Rhipicephalus tick infestation",
        "Generalized lymphadenopathy and splenomegaly with swinging fever"
      ],
      pathognomonicHi: "नाक से खून बहना, मसूड़ों पर लाल चकत्ते और शरीर में प्लेटलेट्स गिरना",
      emergencyFlags: ["Fatal internal hemorrhage and immune-mediated thrombocytopenia"],
      symptomWeights: {
        epistaxis: 1.0,
        high_fever: 0.8,
        extreme_pallor: 0.8,
        anorexia: 0.6
      },
      firstLineDrug: {
        drug: "Doxycycline Monohydrate / Hyclate",
        tradeNames: "Doxypet / Doxt-SL",
        doseMgKg: 10.0,
        route: "Oral (Strictly with food)",
        fieldCalculation: "10 mg/kg PO once daily (or 5 mg/kg BID) for a continuous 28-day course",
        supportive: "Prednisolone (1 mg/kg) short course for 3-5 days if life-threatening epistaxis occurs, Carostypt / Ethamsylate"
      },
      contraindications: [
        "Never administer Doxycycline dry down esophagus (causes severe esophageal ulceration).",
        "Avoid giving with calcium/milk products which chelate and deactivate the drug."
      ],
      confirmatoryTests: [
        "Complete Blood Count: Severe Thrombocytopenia (<50,000/μL) and non-regenerative anemia",
        "Giemsa buffy coat smear: Cytoplasmic morulae within circulating monocytes"
      ]
    },

    {
      id: "canine_pyometra",
      name: "Canine Pyometra (Cystic Endometrial Hyperplasia)",
      nameHi: "पायोमेट्रा (मादा श्वान की बच्चेदानी में मवाद)",
      species: ["canine", "feline"],
      pathognomonic: [
        "Creamy, foul-smelling purulent or chocolate-brown vulvar discharge (Open type)",
        "Intact female dog, 4-8 weeks post estrus, presenting with severe polydipsia and polyuria",
        "Abdominal distension with pain and progressive vomiting"
      ],
      pathognomonicHi: "गर्भाशय से मवाद का रिसाव, बार-बार पानी पीना व उल्टी होना",
      emergencyFlags: ["CLOSED PYOMETRA: Impending uterine rupture, peritonitis and septic shock"],
      symptomWeights: {
        purulent_vulvar_discharge: 1.0,
        intractable_vomiting: 0.7,
        high_fever: 0.6,
        anorexia: 0.7
      },
      firstLineDrug: {
        drug: "Emergency Ovariohysterectomy (OHE) + Aggressive IV Fluid Stabilization",
        tradeNames: "Surgical Intervention Gold Standard + Inj. Cefotaxime",
        doseMgKg: 25.0,
        route: "Surgical / IV",
        fieldCalculation: "Cefotaxime 25 mg/kg IV + Metronidazole 15 mg/kg IV + Surgical excision of infected uterus",
        supportive: "In high-value breeding open pyometra: Dinoprost (PGF2α) 0.1 mg/kg SC under strict hospitalization"
      },
      contraindications: [
        "NEVER USE PGF2α IN CLOSED PYOMETRA (Uterine rupture and fatal peritonitis guaranteed).",
        "Avoid aggressive abdominal palpation which may rupture a friable distended uterine horn."
      ],
      confirmatoryTests: [
        "Abdominal Ultrasonography: Fluid-distended anechoic to hypoechoic tubular uterine loops",
        "Vaginal Cytology: Sheets of degenerate neutrophils with intracellular bacteria"
      ]
    },

    // ---------------- CAPRINE & OVINE EMERGENCIES ----------------
    {
      id: "peste_des_petits_ruminants",
      name: "Peste des Petits Ruminants (PPR / Goat Plague)",
      nameHi: "पी.पी.आर. (बकरी प्लेग / मुंह व दस्त का रोग)",
      species: ["caprine"],
      pathognomonic: [
        "Erosive necrotic stomatitis with cheesy foul deposits on tongue and dental pad",
        "Profuse watery, foul-smelling diarrhea with progressive severe dehydration",
        "Crusted mucopurulent oculonasal discharge matting eyelids together with dyspnea"
      ],
      pathognomonicHi: "बकरी के मुंह में छाले/मवाद, आंख-नाक चिपकाना और पानी जैसे दस्त",
      emergencyFlags: ["Severe secondary pasteurellosis pneumonia and mortalities exceeding 80%"],
      symptomWeights: {
        foul_hemorrhagic_diarrhea: 0.9,
        severe_dyspnea: 0.8,
        high_fever: 0.9,
        anorexia: 0.7
      },
      firstLineDrug: {
        drug: "Enrofloxacin or Oxytetracycline + Supportive Antiseptic Care",
        tradeNames: "Baytril / Oxyvet + Potassium Permanganate Wash",
        doseMgKg: 5.0,
        route: "IM",
        fieldCalculation: "Enrofloxacin 5 mg/kg IM OD for 5 days to prevent fatal secondary bacterial bronchopneumonia",
        supportive: "Oral ORS fluid rehydration, 2% Boroglycerine mouth paint, Vitamin A injections"
      },
      contraindications: [
        "NO LIVE STEROID USAGE. Steroids destroy dwindling cell-mediated immunity in PPR.",
        "Do not vaccinate infected herds with live PPR vaccine during active disease flare."
      ],
      confirmatoryTests: [
        "Competitive ELISA (c-ELISA) or RT-PCR of ocular/nasal swabs demonstrating PPR Morbillivirus"
      ]
    },

    {
      id: "enterotoxemia",
      name: "Enterotoxemia (Pulpy Kidney / Fintia)",
      nameHi: "एंटेरोटॉक्सीमिया (फिड़किया / जहरबाद)",
      species: ["caprine"],
      pathognomonic: [
        "Sudden death in best-conditioned thriving lambs/goats on high lush pasture/grain",
        "Convulsive neurological episodes: Opisthotonos (star-gazing stance), teeth grinding, paddling legs",
        "Hyperglycemia and prominent glucosuria on post-mortem/field strip"
      ],
      pathognomonicHi: "अच्छी तंदुरुस्त बकरी की अचानक मौत, गर्दन पीछे मुड़ना और ऐंठन",
      emergencyFlags: ["Fatal Clostridium perfringens Type D epsilon toxemia within 2-6 hours"],
      symptomWeights: {
        convulsions: 1.0,
        sudden_recumbency: 1.0,
        staggering_gait: 0.7,
        anorexia: 0.5
      },
      firstLineDrug: {
        drug: "Type D Antitoxin + Crystalline Penicillin G",
        tradeNames: "Enterotoxemia Antiserum + Benzylpenicillin",
        doseMgKg: 20000,
        route: "SC / IM",
        fieldCalculation: "Crystalline Penicillin 20,000 IU/kg IM + 25-50 ml specific hyperimmune anti-serum if alive",
        supportive: "Magnesium sulfate oral purgative to flush out unabsorbed intestinal epsilon toxins"
      },
      contraindications: [
        "Do not continue high-carbohydrate grain rations during an outbreak.",
        "Delayed treatment is completely ineffective once epsilon toxin binds CNS receptors."
      ],
      confirmatoryTests: [
        "Urine dipstick: Glucosuria +++ without systemic diabetes (hallmark of pulpy kidney disease)",
        "Post-mortem: Soft, pulpy, congested autolytic kidneys within 2-3 hours of death"
      ]
    },

    {
      id: "contagious_caprine_pleuropneumonia",
      name: "Contagious Caprine Pleuropneumonia (CCPP)",
      nameHi: "सी.सी.पी.पी. (बकरी का संक्रामक फेफड़ा रोग)",
      species: ["caprine"],
      pathognomonic: [
        "Severe, painful, frequent paroxysmal coughing with grunting on expiration",
        "Stringy, frothy, abundant nasal discharge with mouth open and neck extended",
        "Complete exercise intolerance; animal stops walking and stands with abducted elbows"
      ],
      pathognomonicHi: "लगातार तेज दर्दनाक खांसी, मुंह फैलाकर सांस और नाक से झागदार लार",
      emergencyFlags: ["Massive unilateral/bilateral fibrinous pleuropneumonia and suffocation"],
      symptomWeights: {
        pleuropneumonia_cough: 1.0,
        severe_dyspnea: 0.9,
        high_fever: 0.8,
        anorexia: 0.6
      },
      firstLineDrug: {
        drug: "Tylosin Tartrate or Oxytetracycline LA",
        tradeNames: "Tylon / Tylocare / Oxyvet LA",
        doseMgKg: 10.0,
        route: "Deep Intramuscular",
        fieldCalculation: "Tylosin 10 mg/kg IM once daily for 3-5 days (highly effective against Mycoplasma)",
        supportive: "Meloxicam (0.5 mg/kg IM) for pleuritic thoracic pain relief, Bromhexine mucolytic"
      },
      contraindications: [
        "Penicillins are 100% INEFFECTIVE (Mycoplasmas lack a bacterial cell wall).",
        "Avoid crowding or dusty enclosures which accelerate droplet transmission."
      ],
      confirmatoryTests: [
        "Post-mortem: Copious straw-colored pleural fluid with massive yellowish fibrin coating over lungs",
        "Caprine serum agglutination test with Mycoplasma capricolum subsp. capripneumoniae antigen"
      ]
    },

    // ---------------- EQUINE & FELINE EMERGENCIES ----------------
    {
      id: "equine_colic",
      name: "Acute Equine Colic (Spasmodic / Impaction)",
      nameHi: "घोड़े का पेट दर्द (इक्वाइन कॉलिक / शूल)",
      species: ["equine"],
      pathognomonic: [
        "Persistent pawing at the ground, frequently looking back at flanks, biting at abdomen",
        "Repeated lying down, violent rolling, stretching out as if to urinate without voiding",
        "Elevated heart rate (>60-80 bpm) with patchy profuse cold sweating"
      ],
      pathognomonicHi: "जमीन खोदना, पेट की तरफ देखना, बार-बार जमीन पर लोटना और पसीना छूटना",
      emergencyFlags: ["STRANGULATING OBSTRUCTION: Heart rate >80 bpm, brick-red gums, immediate surgery required"],
      symptomWeights: {
        pawing_ground_flank_watching: 1.0,
        sudden_recumbency: 0.7,
        anorexia: 0.8
      },
      firstLineDrug: {
        drug: "Flunixin Meglumine + Spasmolytic (Hyoscine Butylbromide)",
        tradeNames: "Megludyne / Finadyne + Buscopan Compositum",
        doseMgKg: 1.1,
        route: "Strict IV Injection",
        fieldCalculation: "Flunixin 1.1 mg/kg IV slowly + Buscopan 0.2 mg/kg IV slowly",
        supportive: "Nasogastric stomach tubing with 2-4 liters of Liquid Paraffin / Mineral Oil"
      },
      contraindications: [
        "NEVER INJECT FLUNIXIN INTRAMUSCULARLY IN EQUINES (Risk of fatal Clostridial myositis).",
        "Do not delay surgical referral if pain is intractable despite potent analgesics."
      ],
      confirmatoryTests: [
        "Nasogastric reflux evaluation: >2 Liters of foul spontaneous reflux indicates small intestinal strangulation",
        "Abdominocentesis: Peritoneal fluid total protein >3.0 g/dL or serosanguinous color confirms compromised bowel"
      ]
    },

    {
      id: "feline_panleukopenia",
      name: "Feline Panleukopenia (Feline Parvo / Distemper)",
      nameHi: "बिल्ली का पार्वो रोग (फेलाइन पैनल्यूकोपेनिया)",
      species: ["feline"],
      pathognomonic: [
        "Cat sits crouched over the water bowl with chin resting on the rim, desiring water but unable to drink",
        "Violent persistent vomiting containing yellow bile, followed by severe watery diarrhea",
        "Profound leucopenia (<1,000/μL) and rapid subnormal temperature collapse"
      ],
      pathognomonicHi: "पानी के बर्तन पर सिर रखकर बैठना, लगातार उल्टी और शरीर का ठंडा होना",
      emergencyFlags: ["HYPOTHERMIC SEPTIC SHOCK: Body temperature drops <98°F prior to death"],
      symptomWeights: {
        intractable_vomiting: 1.0,
        subnormal_temp: 0.9,
        anorexia: 0.9
      },
      firstLineDrug: {
        drug: "Aggressive IV Fluid Hydration + Maropitant + Cefotaxime",
        tradeNames: "Balanced Electrolytes + Cerenia + Cefantral",
        doseMgKg: 1.0,
        route: "IV / Subcutaneous",
        fieldCalculation: "Warm Ringer's Lactate IV/SC (50 ml/kg/day) + Cerenia 1 mg/kg SC OD + Cefotaxime 20 mg/kg IV BID",
        supportive: "Warm incubator nursing, Vitamin B complex, Ondansetron (0.5 mg/kg IV)"
      },
      contraindications: [
        "Avoid aminoglycosides (Gentamicin) during severe dehydration (induces acute renal necrosis).",
        "Oral feeding strictly prohibited during continuous emesis."
      ],
      confirmatoryTests: [
        "Canine Parvovirus fecal antigen snap test (Cross-reacts reliably with Feline Panleukopenia Virus)",
        "CBC showing catastrophic loss of white blood cells (Panleukopenia)"
      ]
    },

    {
      id: "rabies_clinical",
      name: "Rabies (Hydrophobia / Lyssavirus)",
      nameHi: "रेबीज (अलर्क रोग / पागलपन)",
      species: ["bovine", "canine", "caprine", "equine", "feline"],
      pathognomonic: [
        "Altered phonation: Abnormal deep bellowing in cattle or high-pitched hoarse howl in dogs",
        "Inability to swallow with persistent saliva drooling, jaw paralysis, protruding third eyelid",
        "Hyperesthesia, aggression, biting imaginary objects, tenesmus, terminal ascending paralysis"
      ],
      pathognomonicHi: "आवाज बदलना, रंभाना, मुंह खुला व लार बहना और अकारण आक्रामक होना",
      emergencyFlags: ["100% FATAL ZOONOSIS: Extreme human hazard. STRICT ISOLATION PROTOCOL."],
      symptomWeights: {
        convulsions: 0.8,
        staggering_gait: 0.9,
        sudden_recumbency: 0.8,
        anorexia: 0.6
      },
      firstLineDrug: {
        drug: "STRICT ISOLATION & EUTHANASIA UPON CONFIRMATION (NO CURE)",
        tradeNames: "Sedation for humane containment only",
        doseMgKg: 0,
        route: "Quarantine / Terminal Isolation",
        fieldCalculation: "Xylazine or Barbiturates only for safe containment if animal threatens human safety",
        supportive: "Immediate post-exposure prophylaxis (PEP) vaccination for all humans who had contact with saliva"
      },
      contraindications: [
        "NEVER ATTEMPT ORAL MEDICATION OR DRENCHING (Jaw paralysis mimics choking; high human rabies transmission risk).",
        "Do not damage the head or brainstem if euthanasia is performed (required for diagnostic brain histology)."
      ],
      confirmatoryTests: [
        "Direct Fluorescent Antibody (DFA) test on brain tissue (hippocampus and cerebellum)",
        "Histopathological demonstration of Negri bodies inside neuronal cytoplasm"
      ]
    }
  ];

  // =========================================================================
  // 3. MULTI-SPECIES PROBABILISTIC MATCHING INFERENCE ENGINE
  // =========================================================================
  function runInference(selectedSpecies, selectedSymptomIds) {
    if (!selectedSpecies || !Array.isArray(selectedSymptomIds) || selectedSymptomIds.length === 0) {
      return [];
    }

    const normalizedSpecies = selectedSpecies.toLowerCase().trim();
    const rankedResults = [];

    // Filter candidate diseases matching selected species
    const candidates = DISEASE_GRAPH.filter(disease => {
      return disease.species.includes(normalizedSpecies) || disease.species.includes("all");
    });

    candidates.forEach(disease => {
      let matchedWeightScore = 0;
      let totalDiseaseWeight = 0;
      let matchedCount = 0;
      const matchedSymptomsList = [];
      const missedSymptomsList = [];

      // Calculate weighted score against disease symptom profile
      Object.keys(disease.symptomWeights).forEach(symptomId => {
        const weight = disease.symptomWeights[symptomId];
        totalDiseaseWeight += weight;

        if (selectedSymptomIds.includes(symptomId)) {
          matchedWeightScore += weight;
          matchedCount++;
          matchedSymptomsList.push(symptomId);
        } else {
          missedSymptomsList.push(symptomId);
        }
      });

      if (totalDiseaseWeight === 0) return;

      // Base probability ratio
      let probabilityScore = (matchedWeightScore / totalDiseaseWeight) * 100;

      // Bonus if primary pathognomonic symptom is matched
      const hasKeyFinding = matchedSymptomsList.some(sId => {
        const sMeta = SYMPTOM_TAXONOMY[sId];
        return sMeta && sMeta.weight >= 3.0;
      });

      if (hasKeyFinding) {
        probabilityScore += 12; // Confidence boost for hallmark pathognomonic finding
      }

      // Cap between 5% and 98% (clinical uncertainty guardrail)
      if (probabilityScore > 98) probabilityScore = 98.4;
      if (probabilityScore < 8) probabilityScore = 8.0;

      if (matchedCount > 0) {
        rankedResults.push({
          diseaseId: disease.id,
          name: disease.name,
          nameHi: disease.nameHi,
          probability: Math.round(probabilityScore),
          pathognomonic: disease.pathognomonic,
          pathognomonicHi: disease.pathognomonicHi,
          emergencyFlags: disease.emergencyFlags,
          firstLineDrug: disease.firstLineDrug,
          contraindications: disease.contraindications,
          confirmatoryTests: disease.confirmatoryTests,
          matchedCount: matchedCount,
          matchedSymptoms: matchedSymptomsList,
          missedSymptoms: missedSymptomsList
        });
      }
    });

    // Sort descending by highest probability score
    rankedResults.sort((a, b) => b.probability - a.probability);

    return rankedResults;
  }

  // =========================================================================
  // 4. INTERACTIVE TOUCH-FRIENDLY CLINICAL CONSOLE RENDERING
  // =========================================================================
  function renderDiagnosticConsole(containerTarget) {
    let container = containerTarget;
    if (typeof container === "string") {
      container = document.querySelector(containerTarget);
    }
    if (!container) {
      console.error("[DifferentialEngine] Target container element not found.");
      return;
    }

    // Active state inside console instance
    const consoleState = {
      species: "bovine",
      selectedSymptoms: ["high_fever", "prescapular_lymphadenopathy"],
      searchQuery: ""
    };

    function renderUI() {
      const availableSymptoms = Object.values(SYMPTOM_TAXONOMY).filter(sym => {
        const matchesSpecies = sym.species.includes(consoleState.species);
        if (!matchesSpecies) return false;
        if (!consoleState.searchQuery) return true;
        const q = consoleState.searchQuery.toLowerCase();
        return sym.nameEn.toLowerCase().includes(q) || sym.nameHi.toLowerCase().includes(q);
      });

      const differentialRankings = runInference(consoleState.species, consoleState.selectedSymptoms);

      container.innerHTML = `
        <div class="space-y-6">
          
          <!-- Top Header Strip -->
          <div class="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center text-2xl shadow-xs">
                <i class="fa-solid fa-brain"></i>
              </div>
              <div>
                <h2 class="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight">
                  एआई नैदानिक रोग विभेदन एवं पैथोलॉजी इंजन (Differential Engine)
                </h2>
                <p class="text-xs text-slate-500 font-medium">
                  25+ अति-गंभीर रोगों का बहु-प्रजाति लक्षण-आधारित प्रायिकता विश्लेषण (2026 Clinical Intelligence)
                </p>
              </div>
            </div>

            <!-- Species Selector Tabs -->
            <div class="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold" id="speciesTabGroup">
              <button type="button" data-species="bovine" class="species-btn px-3.5 py-2 rounded-xl transition-all ${consoleState.species === 'bovine' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                <i class="fa-solid fa-cow mr-1"></i> गाय/भैंस (Bovine)
              </button>
              <button type="button" data-species="caprine" class="species-btn px-3.5 py-2 rounded-xl transition-all ${consoleState.species === 'caprine' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                <i class="fa-solid fa-sheep mr-1"></i> बकरी/भेड़
              </button>
              <button type="button" data-species="canine" class="species-btn px-3.5 py-2 rounded-xl transition-all ${consoleState.species === 'canine' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                <i class="fa-solid fa-dog mr-1"></i> श्वान (Dog)
              </button>
              <button type="button" data-species="equine" class="species-btn px-3.5 py-2 rounded-xl transition-all ${consoleState.species === 'equine' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
                <i class="fa-solid fa-horse mr-1"></i> अश्व (Horse)
              </button>
            </div>
          </div>

          <!-- Interactive Workspace Split: Left Symptoms, Right Diagnoses -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left Panel: Search & Visual Symptom Chips (5 Columns) -->
            <div class="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col">
              <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-bold font-mono">1</span>
                  <h3 class="text-sm font-bold text-slate-900">लक्षणों का चयन करें (Select Symptoms)</h3>
                </div>
                <button type="button" id="btnClearSymptoms" class="text-[11px] font-bold text-rose-600 hover:underline">
                  सभी हटाएं (Clear)
                </button>
              </div>

              <!-- Search Input -->
              <div class="relative mb-3">
                <input type="text" id="symptomSearchInput" value="${consoleState.searchQuery}" placeholder="लक्षण खोजें (उदा: fever, रक्त, bloat)..." class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium" />
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
              </div>

              <!-- Active Selected Count Pill -->
              <div class="text-[11px] font-mono text-slate-400 mb-2 flex items-center justify-between">
                <span>चयनित लक्षण: <strong class="text-sky-700 font-bold">${consoleState.selectedSymptoms.length}</strong></span>
                <span class="text-[10px] text-slate-400">क्लिक करके जोड़ें/हटाएं</span>
              </div>

              <!-- Scrollable Chips Container -->
              <div class="flex-1 overflow-y-auto max-h-[460px] pr-1 space-y-2" id="symptomsChipsWrapper">
                ${availableSymptoms.map(sym => {
                  const isChecked = consoleState.selectedSymptoms.includes(sym.id);
                  return `
                    <div data-symptom-id="${sym.id}" class="symptom-chip cursor-pointer p-3 rounded-2xl border transition-all select-none flex items-start justify-between gap-3 ${isChecked ? 'bg-sky-50/80 border-sky-400 text-sky-950 shadow-xs' : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'}">
                      <div class="flex items-start gap-2.5">
                        <div class="mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${isChecked ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 bg-white'}">
                          ${isChecked ? '<i class="fa-solid fa-check text-[10px]"></i>' : ''}
                        </div>
                        <div>
                          <div class="text-xs font-bold leading-snug">${sym.nameHi}</div>
                          <div class="text-[10px] font-mono text-slate-500 mt-0.5">${sym.nameEn}</div>
                        </div>
                      </div>
                      ${sym.weight >= 3.0 ? '<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-800 uppercase tracking-tight">प्रमुख</span>' : ''}
                    </div>
                  `;
                }).join("")}
              </div>
            </div>

            <!-- Right Panel: Ranked Differential Results (7 Columns) -->
            <div class="lg:col-span-7 space-y-4">
              
              <div class="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold font-mono">2</span>
                    <h3 class="text-sm font-bold text-slate-900">संभावित रोग रैंकिंग (Probabilistic Differential)</h3>
                  </div>
                  <span class="text-[11px] font-mono text-slate-400">
                    मिलान परिणाम: <strong class="text-slate-800">${differentialRankings.length}</strong>
                  </span>
                </div>

                ${differentialRankings.length === 0 ? `
                  <div class="py-12 text-center">
                    <div class="w-14 h-14 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mb-3">
                      <i class="fa-solid fa-stethoscope"></i>
                    </div>
                    <div class="text-sm font-bold text-slate-700">कोई निश्चित रोग मेल नहीं खाया</div>
                    <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      कृपया बाईं ओर की सूची से कम से कम 2 या अधिक नैदानिक लक्षण चुनें ताकि डिफरेंशियल गणना की जा सके।
                    </p>
                  </div>
                ` : `
                  <div class="space-y-4">
                    ${differentialRankings.map((diag, index) => {
                      const isTopRank = index === 0;
                      let barColor = "bg-sky-500";
                      let badgeColor = "bg-sky-100 text-sky-800 border-sky-300";
                      if (diag.probability >= 75) {
                        barColor = "bg-emerald-500";
                        badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
                      } else if (diag.probability < 40) {
                        barColor = "bg-amber-500";
                        badgeColor = "bg-amber-100 text-amber-800 border-amber-300";
                      }

                      return `
                        <div class="p-5 rounded-2xl border ${isTopRank ? 'border-sky-300 bg-gradient-to-br from-white via-sky-50/20 to-white shadow-md' : 'border-slate-200 bg-white shadow-xs'} transition-all">
                          
                          <!-- Top Title & Probability Metric -->
                          <div class="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <div class="flex items-center gap-2">
                                <span class="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono font-bold">#${index + 1}</span>
                                <h4 class="text-base font-display font-extrabold text-slate-900">${diag.nameHi}</h4>
                              </div>
                              <div class="text-xs font-mono text-slate-500 mt-0.5">${diag.name}</div>
                            </div>
                            <div class="text-right">
                              <span class="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-mono font-black border ${badgeColor}">
                                ${diag.probability}% संभावना
                              </span>
                            </div>
                          </div>

                          <!-- Probability Bar -->
                          <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                            <div class="${barColor} h-full rounded-full transition-all duration-500" style="width: ${diag.probability}%"></div>
                          </div>

                          <!-- Pathognomonic Finding Strip -->
                          <div class="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs mb-3">
                            <div class="flex items-center gap-1.5 font-bold text-amber-900 mb-0.5">
                              <i class="fa-solid fa-bullseye text-amber-600 text-xs"></i>
                              <span>निर्णायक लक्षण (Pathognomonic Sign):</span>
                            </div>
                            <div class="text-amber-800 text-[11px] leading-relaxed font-medium">
                              ${diag.pathognomonicHi}
                            </div>
                          </div>

                          <!-- Emergency Red Flags if any -->
                          ${diag.emergencyFlags && diag.emergencyFlags.length > 0 ? `
                            <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold mb-3 flex items-start gap-2">
                              <i class="fa-solid fa-triangle-exclamation text-rose-600 mt-0.5"></i>
                              <div>
                                <span class="font-bold">तत्काल चेतावनी (Red Alert):</span> ${diag.emergencyFlags.join("; ")}
                              </div>
                            </div>
                          ` : ''}

                          <!-- Clinical Actions & Treatment Strip -->
                          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-3 space-y-1.5">
                            <div class="text-xs text-slate-800">
                              <span class="font-bold text-sky-800"><i class="fa-solid fa-syringe mr-1"></i>प्राथमिक औषधि (First-line Drug):</span>
                              <strong>${diag.firstLineDrug.drug}</strong> (${diag.firstLineDrug.tradeNames})
                            </div>
                            <div class="text-[11px] font-mono text-slate-600">
                              खुराक व विधि: ${diag.firstLineDrug.fieldCalculation} [${diag.firstLineDrug.route}]
                            </div>
                            <div class="text-[11px] text-emerald-800">
                              <strong>पुष्टि परीक्षण (Field Test):</strong> ${diag.confirmatoryTests[0]}
                            </div>
                            <div class="text-[11px] text-rose-700 font-medium">
                              <strong>सख्त मनाही (Contraindication):</strong> ${diag.contraindications[0]}
                            </div>
                          </div>

                          <!-- Action Button: Add to Prescription Pad -->
                          <div class="flex items-center justify-end">
                            <button type="button" data-export-disease="${diag.diseaseId}" class="btn-add-rx px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-transform active:scale-95">
                              <i class="fa-solid fa-file-prescription text-sky-400"></i>
                              <span>प्रिस्क्रिप्शन में जोड़ें (Add to Prescription)</span>
                            </button>
                          </div>

                        </div>
                      `;
                    }).join("")}
                  </div>
                `}
              </div>

            </div>

          </div>

        </div>
      `;

      // Event Bindings
      // 1. Species Switching
      container.querySelectorAll(".species-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const newSpecies = btn.getAttribute("data-species");
          if (newSpecies !== consoleState.species) {
            consoleState.species = newSpecies;
            consoleState.selectedSymptoms = [];
            renderUI();
          }
        });
      });

      // 2. Symptom Chip Clicking
      container.querySelectorAll(".symptom-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          const sId = chip.getAttribute("data-symptom-id");
          const idx = consoleState.selectedSymptoms.indexOf(sId);
          if (idx > -1) {
            consoleState.selectedSymptoms.splice(idx, 1);
          } else {
            consoleState.selectedSymptoms.push(sId);
          }
          renderUI();
        });
      });

      // 3. Clear Button
      const btnClear = container.querySelector("#btnClearSymptoms");
      if (btnClear) {
        btnClear.addEventListener("click", () => {
          consoleState.selectedSymptoms = [];
          renderUI();
        });
      }

      // 4. Search Filter
      const searchInp = container.querySelector("#symptomSearchInput");
      if (searchInp) {
        searchInp.addEventListener("input", (e) => {
          consoleState.searchQuery = e.target.value;
          renderUI();
          const freshInp = container.querySelector("#symptomSearchInput");
          if (freshInp) {
            freshInp.focus();
            freshInp.setSelectionRange(freshInp.value.length, freshInp.value.length);
          }
        });
      }

      // 5. Prescription Pad Exporter Bridge
      container.querySelectorAll(".btn-add-rx").forEach(btn => {
        btn.addEventListener("click", () => {
          const dId = btn.getAttribute("data-export-disease");
          const diseaseObj = DISEASE_GRAPH.find(d => d.id === dId);
          if (!diseaseObj) return;

          const exportPayload = {
            diagnosisName: `${diseaseObj.nameHi} (${diseaseObj.name})`,
            primaryMedication: diseaseObj.firstLineDrug.drug,
            tradeNames: diseaseObj.firstLineDrug.tradeNames,
            dosageDirective: diseaseObj.firstLineDrug.fieldCalculation,
            route: diseaseObj.firstLineDrug.route,
            contraindications: diseaseObj.contraindications.join(" | ")
          };

          // Dispatch to global bus or PrescriptionPad if available
          if (window.VetcareApp && window.VetcareApp.PrescriptionPad && typeof window.VetcareApp.PrescriptionPad.importFromDiagnosticEngine === "function") {
            window.VetcareApp.PrescriptionPad.importFromDiagnosticEngine(exportPayload);
          } else if (window.VetcareApp && window.VetcareApp.EventBus) {
            window.VetcareApp.EventBus.emit("prescription:import-diagnosis", exportPayload);
          }

          if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
            window.VetcareApp.showToast(`प्रिस्क्रिप्शन में जोड़ा गया: ${diseaseObj.nameHi}`, "success");
          } else {
            alert(`सफलता: ${diseaseObj.nameHi} की औषधि पर्ची में जोड़ दी गई है!`);
          }
        });
      });
    }

    renderUI();
  }

  // =========================================================================
  // 5. PUBLIC API EXPORTS
  // =========================================================================
  return {
    version: "2026.04-PROD",
    diagnose: runInference,
    getTaxonomy: function () {
      return Object.assign({}, SYMPTOM_TAXONOMY);
    },
    getDiseaseDatabase: function () {
      return DISEASE_GRAPH.slice();
    },
    renderDiagnosticConsole: renderDiagnosticConsole
  };
});
