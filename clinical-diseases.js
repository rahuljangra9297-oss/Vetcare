// Vetcare AI OS - Doctor Exhaustive 48+ Diseases DB (Part 2)

(function (root) {
  "use strict";

  root.VETCARE_DISEASE_DB = (root.VETCARE_DISEASE_DB || []).concat([
    // =========================================================================
    // CATEGORY 1: BACTERIAL DISEASES (1 to 15)
    // =========================================================================
    {
      id: "DIS_HS",
      nameHi: "गलघोंटू (Hemorrhagic Septicemia)",
      nameEn: "Hemorrhagic Septicemia",
      category: "BACTERIAL",
      tempRange: "105.0°F - 107.5°F (Hyperpyrexia)",
      cardinalSigns: ["SKIN_DEW_LAP_EDEMA", "RESP_GRUNTING_MOAN", "RESP_OPEN_MOUTH"],
      labTests: [
        { sNo: 1, testName: "Methylene Blue / Leishman Blood Smear", sampleType: "Peripheral ear vein blood", approxMrp: 150, tat: "20 Mins", confirms: "Gram-negative bipolar staining coccobacilli (Pasteurella multocida)" },
        { sNo: 2, testName: "Pasteurella multocida KMT1 PCR", sampleType: "Whole blood in EDTA", approxMrp: 1800, tat: "24 Hours", confirms: "Specific P. multocida Serotype B:2" }
      ],
      stages: [
        { stage: 1, signs: "Pyrexia (105-106°F), dullness, congested conjunctiva, refusal to feed.", recovery: "90% with prompt bactericidal cephalosporin", deterioration: "Progresses to submandibular edema in 6h" },
        { stage: 2, signs: "Hot, painful edematous swelling of dewlap and brisket; stridor and grunting.", recovery: "60% with intensive anti-inflammatory therapy", deterioration: "Airway occlusion and tongue cyanosis" },
        { stage: 3, signs: "Severe air hunger, open-mouth panting, frothy drooling, cyanotic mucous membranes.", recovery: "20% very grave prognosis", deterioration: "Endotoxemic shock and alveolar consolidation" },
        { stage: 4, signs: "Sternal/lateral recumbency, subnormal temperature (<98°F), suffocation and death.", recovery: "<5% Moribund state", deterioration: "Fatal asphyxia within 2-4 hours" }
      ],
      treatment: {
        injections: [
          { name: "Ceftiofur Sodium 1g", salt: "Ceftiofur Sodium", ethicalBrand: "Xyrofur 1g (Intas)", genericOption: "Ceftio-Vet 1g", mrpEthical: 440, mrpGeneric: 185, dose: "2.2 mg/kg I/M BID", route: "Intramuscular (I/M)", pregnancySafe: true, purpose: "Rapid bactericidal clearance of Pasteurella" },
          { name: "Flunixin Meglumine", salt: "Flunixin Meglumine 50mg/ml", ethicalBrand: "Megludyne 50ml (Virbac)", genericOption: "Flunivet 50ml", mrpEthical: 510, mrpGeneric: 210, dose: "2.2 mg/kg I/V", route: "Slow Intravenous (I/V)", pregnancySafe: true, purpose: "Neutralizes fatal endotoxin cascade and resolves laryngeal edema" },
          { name: "Isoflupredone Acetate", salt: "Isoflupredone Acetate 2mg/ml", ethicalBrand: "Isoflud 10ml (Zydus)", genericOption: "Isopred 10ml", mrpEthical: 225, mrpGeneric: 95, dose: "10 mg (5 ml) Deep I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Rapid corticosteroid suppression of upper airway edema without inducing abortion" },
          { name: "Pheniramine Maleate", salt: "Pheniramine Maleate 22.75mg/ml", ethicalBrand: "Avil Vet 100ml (MSD)", genericOption: "Cadistin Vet 100ml", mrpEthical: 120, mrpGeneric: 45, dose: "10 ml Deep I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Antihistaminic support" }
        ],
        oral: [{ name: "Potassium Iodide Solution (5g daily) post-recovery for residual throat fibrosis" }],
        ayurvedic: [{ name: "Kaf-Kuthar Ras with honey", dose: "20g BID" }],
        homeopathic: [{ name: "Belladonna 200C & Arsenicum Album 200C", dose: "10 pills hourly during acute distress" }],
        desiRemedies: [{ name: "Warm mustard oil and camphor external massage on dewlap" }]
      }
    },
    {
      id: "DIS_BQ",
      nameHi: "लंगड़ा बुखार / चरचरा (Black Quarter)",
      nameEn: "Black Quarter",
      category: "BACTERIAL",
      tempRange: "104.5°F - 106.5°F",
      cardinalSigns: ["SKIN_CREPITATING_SWELLING", "NERV_POSTERIOR_PARALYSIS"],
      labTests: [
        { sNo: 1, testName: "Muscle Aspirate Smear (Gram Stain)", sampleType: "Aspirate from crepitant swelling", approxMrp: 120, tat: "20 Mins", confirms: "Gram-positive rods with subterminal spores (Clostridium chauvoei)" },
        { sNo: 2, testName: "Fluorescent Antibody Test (FAT)", sampleType: "Necrotic muscle tissue", approxMrp: 1200, tat: "24 Hours", confirms: "Pathognomonic C. chauvoei antigens" }
      ],
      stages: [
        { stage: 1, signs: "Sudden hyperthermia (105°F), refusal to move, acute lameness in one hind leg.", recovery: "70% if high-dose penicillin started immediately", deterioration: "Gas gangrene in thigh muscle within 6h" },
        { stage: 2, signs: "Hot, tense, painful swelling over gluteal or shoulder muscle mass.", recovery: "40% with aggressive parenterals", deterioration: "Tissue necrosis and crepitation" },
        { stage: 3, signs: "Swelling becomes cold, insensitive, and exhibits distinct parchment-like crepitation under skin.", recovery: "15% guarded prognosis", deterioration: "Profound clostridial toxemia" },
        { stage: 4, signs: "Hypothermia, prostration, lateral recumbency, severe toxemic shock and death.", recovery: "<2%", deterioration: "Death within 12-24 hours" }
      ],
      treatment: {
        injections: [
          { name: "Crystalline Penicillin G Sodium", salt: "Benzylpenicillin Sodium 40 Lakh IU", ethicalBrand: "Penicillin G 40L (Alembic)", genericOption: "Pendistrin 40L", mrpEthical: 135, mrpGeneric: 58, dose: "30,000 IU/kg (Half IV, half IM every 12h)", route: "I/V and Deep I/M", pregnancySafe: true, purpose: "Rapid bactericidal clearance of vegetative Clostridia" },
          { name: "Oxytetracycline LA", salt: "Oxytetracycline Dihydrate 200mg/ml", ethicalBrand: "Terramycin LA 30ml (Zoetis)", genericOption: "Oxysteclin LA 30ml", mrpEthical: 260, mrpGeneric: 98, dose: "20 mg/kg Deep I/M", route: "Deep I/M", pregnancySafe: false, purpose: "Broad spectrum extended tissue coverage" },
          { name: "Meloxicam + Paracetamol", salt: "Meloxicam + Paracetamol", ethicalBrand: "Melonex Plus 100ml (Intas)", genericOption: "Melonat Plus 100ml", mrpEthical: 220, mrpGeneric: 85, dose: "15-20 ml Deep I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Analgesia and antipyresis" }
        ],
        oral: [{ name: "Activated Charcoal (500g) in water as oral antitoxin binder" }],
        ayurvedic: [{ name: "Triphala Guggulu (10 tablets BID)" }],
        homeopathic: [{ name: "Anthracinum 200C & Lachesis 200C", dose: "10 drops every 2 hours" }],
        desiRemedies: [{ name: "Strictly avoid incision into swelling to avoid ground sporulation" }]
      }
    },
    {
      id: "DIS_MASTITIS_ACUTE",
      nameHi: "तीव्र थनैला रोग (Acute Clinical Mastitis)",
      nameEn: "Acute Clinical Mastitis",
      category: "BACTERIAL",
      tempRange: "103.5°F - 105.5°F",
      cardinalSigns: ["UDDER_HOT_HARD", "UDDER_CLOTS_BLOOD", "UDDER_WATERY_SECRETION"],
      labTests: [
        { sNo: 1, testName: "California Mastitis Test (CMT)", sampleType: "Fore-milk paddle sample", approxMrp: 50, tat: "5 Mins", confirms: "Gel formation correlates with SCC >2,000,000 cells/ml" },
        { sNo: 2, testName: "Milk ABST & Culture", sampleType: "Aseptic quarter milk", approxMrp: 650, tat: "48 Hours", confirms: "Identifies Staph, Strep, or Coliforms and antibiotic sensitivity" }
      ],
      stages: [
        { stage: 1, signs: "Subclinical to mild: Microscopic clots in strip cup, mild teat edema, milk yield drop.", recovery: "95% with intramammary infusion", deterioration: "Parenchymal invasion in 12h" },
        { stage: 2, signs: "Quarter acutely swollen, red, hot, exquisitely painful; milk contains flakes, clots and yellowish serum.", recovery: "80% gland salvage", deterioration: "Vascular thrombosis" },
        { stage: 3, signs: "Severe mastitis: Teat becomes purple, cold, secretions become foul bloody or purulent; systemic toxemia.", recovery: "40% quarter loss likely", deterioration: "Gangrenous sloughing" },
        { stage: 4, signs: "Septic/gangrenous mastitis: Quarter black, cold, sloughing off; cow recumbent in endotoxic shock.", recovery: "Survival 30%, quarter lost", deterioration: "Fatal endotoxemia" }
      ],
      treatment: {
        injections: [
          { name: "Ceftriaxone + Tazobactam 3375mg", salt: "Ceftriaxone + Tazobactam", ethicalBrand: "Intacef Tazo 3.375g (Intas)", genericOption: "Tazo-Ceff 3.375g", mrpEthical: 495, mrpGeneric: 195, dose: "10 mg/kg I/M or slow I/V", route: "I/M or I/V", pregnancySafe: true, purpose: "Broad spectrum bactericidal penetration into mammary parenchyma" },
          { name: "Flunixin Meglumine", salt: "Flunixin Meglumine 50mg/ml", ethicalBrand: "Megludyne 50ml (Virbac)", genericOption: "Flunivet 50ml", mrpEthical: 510, mrpGeneric: 210, dose: "2.2 mg/kg slow I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Counters coliform endotoxins and acute inflammatory udder pain" },
          { name: "Serratiopeptidase + Chymotrypsin", salt: "Serratiopeptidase enzyme", ethicalBrand: "Serakind Vet (Mankind)", genericOption: "Enzyvet 10ml", mrpEthical: 180, mrpGeneric: 75, dose: "10 ml I/M", route: "Intramuscular (I/M)", pregnancySafe: true, purpose: "Lyses intraluminal fibrin clots to open blocked milk ducts" }
        ],
        oral: [
          { name: "Trisodium Citrate Powder (30g daily for 7 days) to normalize alkaline milk pH" },
          { name: "Vitamin E and Selenium Powder (1 sachet daily for 10 days)" }
        ],
        ayurvedic: [{ name: "Mastilep Gel external application after stripping" }],
        homeopathic: [{ name: "Phytolacca 200C & Bryonia 200C", dose: "10 pills TID" }],
        desiRemedies: [{ name: "Aloe vera (250g) + Turmeric (50g) + Slaked lime (15g) paste applied externally 4 times daily" }]
      }
    },
    {
      id: "DIS_MASTITIS_SUBCLINICAL",
      nameHi: "छिपा हुआ / क्रोनिक थनैला (Subclinical / Chronic Fibrous Mastitis)",
      nameEn: "Subclinical and Chronic Fibrous Mastitis",
      category: "BACTERIAL",
      tempRange: "101.5°F - 102.5°F (Afebrile)",
      cardinalSigns: ["UDDER_FIBROSIS"],
      labTests: [
        { sNo: 1, testName: "Somatic Cell Count (SCC) / California Mastitis Test", sampleType: "Quarter milk", approxMrp: 50, tat: "5 Mins", confirms: "SCC >500,000 cells/ml indicates subclinical mastitis" },
        { sNo: 2, testName: "Electrical Conductivity Test", sampleType: "Milk", approxMrp: 100, tat: "Immediate", confirms: "Elevated sodium/chloride conductivity" }
      ],
      stages: [
        { stage: 1, signs: "No visible signs on udder or milk, 15-20% silent reduction in milk yield.", recovery: "90% with targeted intramammary treatment", deterioration: "Gradual glandular induration" },
        { stage: 2, signs: "Intermittent flakes in morning fore-milk, mild teat base thickening.", recovery: "70% with dry cow therapy", deterioration: "Ductal scar tissue" },
        { stage: 3, signs: "Permanent palpable hard cord or stone-like fibrous mass in udder quarter.", recovery: "30% fibrosis irreversible", deterioration: "Permanent blind quarter (quarter atrophy)" },
        { stage: 4, signs: "Complete cessation of secretion or watery non-dairy fluid; permanent agalactia in quarter.", recovery: "0% secretory tissue dead", deterioration: "Permanent ablation" }
      ],
      treatment: {
        injections: [
          { name: "Amoxicillin + Sulbactam 3g", salt: "Amoxicillin + Sulbactam", ethicalBrand: "Amoxirum Forte 3g (Virbac)", genericOption: "Sulbacillin 3g", mrpEthical: 360, mrpGeneric: 145, dose: "10 mg/kg I/M daily for 3 days", route: "Deep I/M", pregnancySafe: true, purpose: "Clears subclinical bacterial reservoir (Staph aureus / Strep agalactiae)" }
        ],
        oral: [{ name: "Trisodium Citrate (30g) + Potassium Iodide (3g) daily for 10 days to resolve early fibrosis" }],
        ayurvedic: [{ name: "Fibrovet Powder (50g daily for 15 days)" }],
        homeopathic: [{ name: "Silicea 200C & Calcarea Fluorica 200C", dose: "10 pills BID for 21 days for fibrous indurations" }],
        desiRemedies: [{ name: "Regular post-milking teat dip in 0.5% Povidone iodine solution" }]
      }
    },
    {
      id: "DIS_BRUCELLOSIS",
      nameHi: "ब्रुसेलोसिस / संक्रामक गर्भपात (Bovine Brucellosis)",
      nameEn: "Bovine Brucellosis",
      category: "BACTERIAL",
      tempRange: "101.5°F - 103.0°F (Mild low-grade fever)",
      cardinalSigns: ["UDDER_FIBROSIS", "NERV_POSTERIOR_PARALYSIS"],
      labTests: [
        { sNo: 1, testName: "Rose Bengal Plate Test (RBPT)", sampleType: "Serum", approxMrp: 150, tat: "15 Mins", confirms: "Rapid agglutination indicates anti-Brucella antibodies" },
        { sNo: 2, testName: "Standard Tube Agglutination Test (STAT)", sampleType: "Serum", approxMrp: 300, tat: "24 Hours", confirms: "Diagnostic titer >1:40 IU/ml" },
        { sNo: 3, testName: "Brucella abortus PCR", sampleType: "Aborted fetal cotyledon / Stomach fluid", approxMrp: 2200, tat: "48 Hours", confirms: "Definitive DNA identification" }
      ],
      stages: [
        { stage: 1, signs: "Silent bacteremia, mild fluctuating pyrexia, regional lymphadenopathy.", recovery: "Incurable intracellular infection", deterioration: "Trophoblast colonization" },
        { stage: 2, signs: "Placentitis, late gestation abortion strictly between 7th and 9th month of pregnancy.", recovery: "Uterine evacuation occurs", deterioration: "Retention of placenta and metritis" },
        { stage: 3, signs: "Retention of placenta, necrotic cotyledons, severe chronic endometritis, repeat breeding.", recovery: "Symptomatic control only", deterioration: "Hygroma of knee joints" },
        { stage: 4, signs: "Chronic carrier state, hygroma in carpal joints, intermittent shedding of bacteria in milk.", recovery: "0% (Lifelong shedder)", deterioration: "Severe zoonotic hazard to humans" }
      ],
      treatment: {
        injections: [
          { name: "Streptomycin Sulfate 5g", salt: "Streptomycin Sulfate", ethicalBrand: "Ambistryn-S 5g (Piramal)", genericOption: "Strep-Vet 5g", mrpEthical: 140, mrpGeneric: 60, dose: "15 mg/kg I/M BID for 14 days", route: "Deep I/M", pregnancySafe: false, purpose: "Suppresses systemic bacteremia (cannot eradicate intracellular organism)" },
          { name: "Long Acting Oxytetracycline LA", salt: "Oxytetracycline LA 200mg/ml", ethicalBrand: "Terramycin LA 30ml (Zoetis)", genericOption: "Oxysteclin LA 30ml", mrpEthical: 260, mrpGeneric: 98, dose: "20 mg/kg Deep I/M every 72 hours (3 shots)", route: "Deep I/M", pregnancySafe: false, purpose: "Reduces bacterial shedding in uterine discharge" }
        ],
        oral: [],
        ayurvedic: [{ name: "Uterine cleansing herbal drench post-abortion" }],
        homeopathic: [{ name: "Sabina 200C & Thuja 200C", dose: "10 pills BID" }],
        desiRemedies: [{ name: "CRITICAL ZOONOSIS: Burn aborted fetus and placenta immediately. Wear rubber gloves and goggles." }]
      }
    },
    {
      id: "DIS_ANTHRAX",
      nameHi: "एंथ्रेक्स / जहरी बुखार (Anthrax / Splenic Fever)",
      nameEn: "Anthrax",
      category: "BACTERIAL",
      tempRange: "106.0°F - 108.0°F (Terminal Subnormal)",
      cardinalSigns: ["RESP_FROTHY_DISCHARGE", "SKIN_PETECHIAE"],
      labTests: [
        { sNo: 1, testName: "Polychrome Methylene Blue (McFadyean's Staining)", sampleType: "Peripheral ear vein blood smear", approxMrp: 200, tat: "15 Mins", confirms: "Square-ended blue bacilli surrounded by pink-purple capsule (Bacillus anthracis)" },
        { sNo: 2, testName: "Ascoli's Thermoprecipitation Test", sampleType: "Tissue extract", approxMrp: 900, tat: "4 Hours", confirms: "Anthrax thermostable antigen" }
      ],
      stages: [
        { stage: 1, signs: "Peracute / Acute: Sudden hyperpyrexia (107°F), extreme shivering, colic, rapid collapse.", recovery: "50% if megadose Penicillin given at first fever spike", deterioration: "Widespread endothelial damage" },
        { stage: 2, signs: "Severe dyspnea, edema of throat and brisket, passage of bloody feces and hematuria.", recovery: "10% very grave", deterioration: "Capillary breakdown" },
        { stage: 3, signs: "Moribund, convulsive seizures, uncoagulated tarry dark blood oozing from mouth, nostrils, anus, vulva.", recovery: "0%", deterioration: "Terminal collapse" },
        { stage: 4, signs: "Death without rigor mortis; carcass bloats rapidly; incomplete rigor mortis.", recovery: "0% FATAL", deterioration: "Environmental sporulation if opened" }
      ],
      treatment: {
        injections: [
          { name: "Crystalline Benzylpenicillin G Sodium", salt: "Penicillin G Sodium 1 Crore IU", ethicalBrand: "Penicillin G 10MIU (Alembic)", genericOption: "Benzylpen 10M", mrpEthical: 290, mrpGeneric: 135, dose: "40,000 IU/kg slow I/V every 6 hours", route: "Slow I/V", pregnancySafe: true, purpose: "Immediate bactericidal destruction of vegetative B. anthracis" },
          { name: "Oxytetracycline Injection", salt: "Oxytetracycline HCl 100mg/ml", ethicalBrand: "Oxyvet 100ml (Zydus)", genericOption: "Oxytet 100ml", mrpEthical: 190, mrpGeneric: 75, dose: "10 mg/kg slow I/V", route: "Slow I/V", pregnancySafe: false, purpose: "Synergistic antibiotic action" }
        ],
        oral: [],
        ayurvedic: [],
        homeopathic: [{ name: "Anthracinum 1M & Crotalus Horridus 200C" }],
        desiRemedies: [{ name: "STRICT STATUTORY LAW: Never open the carcass. Bury 6 feet deep covered with quicklime." }]
      }
    },
    {
      id: "DIS_TB",
      nameHi: "क्षय रोग / टीबी (Bovine Tuberculosis)",
      nameEn: "Bovine Tuberculosis",
      category: "BACTERIAL",
      tempRange: "102.0°F - 104.0°F (Low fluctuating evening rise)",
      cardinalSigns: ["RESP_PAROXYSMAL_COUGH", "EYE_PALLOR"],
      labTests: [
        { sNo: 1, testName: "Single Intradermal Tuberculin Test (SID)", sampleType: "Bovine PPD in mid-neck / caudal fold", approxMrp: 350, tat: "72 Hours", confirms: "Skin thickness increase >4mm confirms delayed-type hypersensitivity" },
        { sNo: 2, testName: "Acid-Fast Staining (Ziehl-Neelsen)", sampleType: "Tracheal aspirate / Sputum", approxMrp: 150, tat: "1 Hour", confirms: "Slender red acid-fast bacilli (Mycobacterium bovis)" }
      ],
      stages: [
        { stage: 1, signs: "Subclinical infection: Gradual loss of condition, sluggishness, caprice appetite.", recovery: "Treatment illegal / not advised (Zoonotic)", deterioration: "Granuloma expansion" },
        { stage: 2, signs: "Chronic dry hacking cough provoked by exercise or cold air, enlargement of retropharyngeal lymph nodes.", recovery: "Incurable", deterioration: "Lung cavitation" },
        { stage: 3, signs: "Severe dyspnea, wheezing respiration, emaciation (walking skeleton), prominent tuberculous mastitis.", recovery: "0%", deterioration: "Miliary generalization" },
        { stage: 4, signs: "Extreme cachexia, extreme weakness, terminal respiratory failure, death.", recovery: "0%", deterioration: "Fatal termination" }
      ],
      treatment: {
        injections: [], // Treatment strictly prohibited under national veterinary eradication protocols to prevent MDR-TB
        oral: [],
        ayurvedic: [],
        homeopathic: [],
        desiRemedies: [{ name: "ZOONOTIC DANGER: Unpasteurized milk transmits M. bovis to children. Segregate and cull positive reactors." }]
      }
    },
    {
      id: "DIS_JD",
      nameHi: "जोन्स रोग / पैराट्यूबरकुलोसिस (Johne's Disease)",
      nameEn: "Johne's Disease / Paratuberculosis",
      category: "BACTERIAL",
      tempRange: "101.0°F - 102.5°F (Afebrile)",
      cardinalSigns: ["DUNG_PIPE_STEM", "EYE_PALLOR"],
      labTests: [
        { sNo: 1, testName: "Acid-Fast Fecal Staining (Ziehl-Neelsen)", sampleType: "Rectal pinch / Fecal smear", approxMrp: 200, tat: "1 Hour", confirms: "Intracellular clumps of acid-fast bacilli in epithelioid cells (M. avium subsp. paratuberculosis - MAP)" },
        { sNo: 2, testName: "MAP Antibody Serum ELISA", sampleType: "Serum", approxMrp: 850, tat: "24 Hours", confirms: "High optical density confirms clinical paratuberculosis" }
      ],
      stages: [
        { stage: 1, signs: "Silent carrier phase: Multiplies in ileal macrophages for 2-5 years without symptoms.", recovery: "Incurable", deterioration: "Transmural ileitis" },
        { stage: 2, signs: "Intermittent painless diarrhea unresponsive to anthelmintics, slight drop in butterfat yield.", recovery: "Arrested temporarily only", deterioration: "Intestinal corrugation" },
        { stage: 3, signs: "Chronic continuous 'pipe-stream' diarrhea (no tenesmus), severe emaciation (wasp-waisted appearance).", recovery: "0%", deterioration: "Total malabsorption and protein loss" },
        { stage: 4, signs: "Submandibular edema (bottle jaw), extreme cachexia, inability to rise, death from starvation.", recovery: "0%", deterioration: "Fatal dehydration & exhaustion" }
      ],
      treatment: {
        injections: [
          { name: "Amino Acid + B-Complex Infusion", salt: "Parenteral amino acids", ethicalBrand: "Duphalyte 500ml (Zoetis)", genericOption: "Amynin 500ml", mrpEthical: 460, mrpGeneric: 215, dose: "500 ml slow I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Palliative nutritional support only (NO KNOWN CURE)" }
        ],
        oral: [{ name: "Chalk and Kaolin astringent powder to temporarily thicken fecal stream" }],
        ayurvedic: [],
        homeopathic: [{ name: "Johneinum 1M (Palliative trial)" }],
        desiRemedies: [{ name: "Isolate confirmed shedders; clean calving pens to avoid neonatal infection" }]
      }
    },
    {
      id: "DIS_LISTERIOSIS",
      nameHi: "लिस्टेरियोसिस / चक्कर रोग (Listeriosis / Circling Disease)",
      nameEn: "Listeriosis",
      category: "BACTERIAL",
      tempRange: "104.0°F - 105.8°F",
      cardinalSigns: ["NERV_CIRCLING_HEADPRESS", "NERV_OPISTHOTONOS"],
      labTests: [
        { sNo: 1, testName: "CSF Cytology and Protein Analysis", sampleType: "Lumbosacral CSF tap", approxMrp: 600, tat: "2 Hours", confirms: "Marked mononuclear pleocytosis and elevated protein" },
        { sNo: 2, testName: "Brainstem Impression Smear / Culture", sampleType: "Medulla oblongata tissue", approxMrp: 850, tat: "48 Hours", confirms: "Small Gram-positive microaerophilic rods (Listeria monocytogenes)" }
      ],
      stages: [
        { stage: 1, signs: "Depression, anorexia, fever (105°F), unilateral facial paralysis (drooping ear and lip, ptosis).", recovery: "75% with high-dose penicillin across BBB", deterioration: "Brainstem microabscesses form" },
        { stage: 2, signs: "Compulsive circling in one direction, head pressing against solid objects, strabismus.", recovery: "45% with intensive care", deterioration: "Cranial nerve V, VII, IX, XII destruction" },
        { stage: 3, signs: "Inability to swallow (pseudorabies appearance), drooling, recumbency, violent paddling of limbs.", recovery: "15% guarded", deterioration: "Bulbar paralysis" },
        { stage: 4, signs: "Coma, respiratory failure, tetanic seizures, death.", recovery: "<5%", deterioration: "Fatal within 24-72 hours" }
      ],
      treatment: {
        injections: [
          { name: "Procaine Penicillin G 40 Lakh IU", salt: "Procaine Penicillin G", ethicalBrand: "Fortified Procaine Penicillin (Alembic)", genericOption: "Pendistrin 40L", mrpEthical: 135, mrpGeneric: 58, dose: "40,000 IU/kg I/M every 12 hours for 7-10 days", route: "Deep I/M", pregnancySafe: true, purpose: "Penetrates blood-brain barrier to eliminate Listeria in brainstem" },
          { name: "Dexamethasone Sodium Phosphate", salt: "Dexamethasone 4.4mg/ml", ethicalBrand: "Dexona Vet 100ml (Zydus)", genericOption: "Dexavet 100ml", mrpEthical: 125, mrpGeneric: 48, dose: "0.1 mg/kg I/V", route: "Intravenous (I/V)", pregnancySafe: false, purpose: "Reduces cerebral and medullary microabscess edema" },
          { name: "Thiamine HCl (Vitamin B1)", salt: "Thiamine HCl 100mg/ml", ethicalBrand: "Tribivet 100ml (Intas)", genericOption: "B1-Vet 100ml", mrpEthical: 185, mrpGeneric: 72, dose: "10-20 mg/kg I/M or slow I/V", route: "I/M or I/V", pregnancySafe: true, purpose: "Prevents secondary polioencephalomalacia and neuro-necrosis" }
        ],
        oral: [],
        ayurvedic: [],
        homeopathic: [{ name: "Cicuta Virosa 200C & Belladonna 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Immediately stop feeding spoiled or poorly fermented silage (pH >5.0)" }]
      }
    },
    {
      id: "DIS_ENTEROTOXEMIA",
      nameHi: "फिड़किया / आंत्रविषरक्तता (Enterotoxemia / Pulpy Kidney)",
      nameEn: "Enterotoxemia",
      category: "BACTERIAL",
      tempRange: "103.5°F - 105.0°F (Early) then Subnormal",
      cardinalSigns: ["NERV_OPISTHOTONOS", "DUNG_WATERY_FOUL"],
      labTests: [
        { sNo: 1, testName: "Urine Glucose Strip Test (Glucosuria)", sampleType: "Urine", approxMrp: 50, tat: "1 Min", confirms: "Massive glucosuria (3+ or 4+) pathognomonic for C. perfringens Type D epsilon toxin" },
        { sNo: 2, testName: "Epsilon Toxin ELISA", sampleType: "Small intestinal contents", approxMrp: 1100, tat: "4 Hours", confirms: "Confirms Clostridium perfringens Type D toxin" }
      ],
      stages: [
        { stage: 1, signs: "Animal sluggish after carbohydrate gorge (fresh green lush pasture or grain), dull, abdominal pain.", recovery: "60% if detected and rumen purged", deterioration: "Massive toxin release in ileum" },
        { stage: 2, signs: "Champing of jaws, frothing at mouth, diarrhea with green-yellow mucus, teeth grinding.", recovery: "30% guarded", deterioration: "Endothelial vascular leakage in brain" },
        { stage: 3, signs: "Violent opisthotonos (head retracted over spine), nystagmus, clonic convulsions, paddling of limbs.", recovery: "5%", deterioration: "Cerebral and pulmonary edema" },
        { stage: 4, signs: "Coma and death within 1-2 hours in sheep/calves. Kidneys soften to jelly-like pulp post-mortem.", recovery: "0%", deterioration: "Fatal collapse" }
      ],
      treatment: {
        injections: [
          { name: "Procaine Penicillin G 40 Lakh IU", salt: "Penicillin G", ethicalBrand: "Procaine Penicillin (Alembic)", genericOption: "Pendistrin", mrpEthical: 135, mrpGeneric: 58, dose: "20,000 IU/kg I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Halts proliferation of vegetative Clostridia in intestine" },
          { name: "Flunixin Meglumine", salt: "Flunixin Meglumine 50mg/ml", ethicalBrand: "Megludyne 50ml (Virbac)", genericOption: "Flunivet 50ml", mrpEthical: 510, mrpGeneric: 210, dose: "2.2 mg/kg I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Counters vascular permeability and toxic shock" }
        ],
        oral: [{ name: "Magnesium Sulfate (Epsom Salt 200g in 1L warm water) to rapidly evacuate toxic gut contents" }],
        ayurvedic: [],
        homeopathic: [{ name: "Nux Vomica 200C & Belladonna 200C" }],
        desiRemedies: [{ name: "Withhold all concentrate feeds and lush legumes; feed dry coarse wheat straw" }]
      }
    },
    {
      id: "DIS_CALF_SCOURS",
      nameHi: "बछड़ों में सफेद दस्त (Colibacillosis / Calf Scours)",
      nameEn: "Colibacillosis / White Scours",
      category: "BACTERIAL",
      tempRange: "102.5°F - 104.5°F (Subnormal <100°F in terminal shock)",
      cardinalSigns: ["DUNG_WATERY_FOUL", "EYE_SUNKEN", "SKIN_COLD_EXTREMITIES"],
      labTests: [
        { sNo: 1, testName: "Fecal Gram Staining", sampleType: "Fresh diarrheic feces", approxMrp: 100, tat: "15 Mins", confirms: "Overwhelming Gram-negative bacilli (E. coli)" },
        { sNo: 2, testName: "K99 / F5 ETEC Rapid Lateral Flow Antigen Test", sampleType: "Feces", approxMrp: 450, tat: "10 Mins", confirms: "Enterotoxigenic E. coli K99 pili confirmation" }
      ],
      stages: [
        { stage: 1, signs: "Calf listless, refuses suckling bottle, feces pasty and yellowish-white.", recovery: "95% with immediate oral electrolyte therapy", deterioration: "Secretory diarrhea within 6h" },
        { stage: 2, signs: "Profuse watery, foul-smelling white or pale-yellow diarrhea; soiled tail, hindquarters.", recovery: "80% with systemic antibiotics and fluids", deterioration: "Massive dehydration" },
        { stage: 3, signs: "Severe dehydration (>8%), sunken eyes, skin tenting >5 seconds, cold mouth and ears, severe weakness.", recovery: "40-50% guarded prognosis", deterioration: "Metabolic acidosis shock" },
        { stage: 4, signs: "Lateral recumbency, subnormal temperature (<98°F), weak thready pulse, coma and death.", recovery: "<10%", deterioration: "Fatal hyperkalemic cardiac arrest" }
      ],
      treatment: {
        injections: [
          { name: "Gentamicin Sulfate 40mg/ml", salt: "Gentamicin Sulfate", ethicalBrand: "Gentacip Vet 100ml (Cipla)", genericOption: "Genta-Vet 100ml", mrpEthical: 170, mrpGeneric: 70, dose: "4-5 mg/kg I/M or slow I/V", route: "I/M or I/V", pregnancySafe: true, purpose: "Bactericidal eradication of enterotoxigenic E. coli" },
          { name: "Dextrose Normal Saline (DNS)", salt: "0.9% NaCl + 5% Dextrose", ethicalBrand: "DNS Vet 500ml (Albert David)", genericOption: "DNS Infusion", mrpEthical: 90, mrpGeneric: 40, dose: "1-2 Liters warm slow I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Rapid blood volume expansion and correction of hypovolemia" },
          { name: "Sodium Bicarbonate 7.5%", salt: "Sodium Bicarbonate", ethicalBrand: "Sodabicarb 7.5% (Zydus)", genericOption: "Sodium Bicarb", mrpEthical: 175, mrpGeneric: 72, dose: "50-100 ml slow I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Reverses life-threatening systemic lactic acidosis" }
        ],
        oral: [
          { name: "WHO Formula Oral Rehydration Salts (ORS) (1-2 liters dissolved in warm water TID)" },
          { name: "Neomycin Sulfate + Kaolin Pectin suspension (15 ml orally BID)" }
        ],
        ayurvedic: [{ name: "Kutaja Ghan Vati (2 tablets crushed in curd BID)" }],
        homeopathic: [{ name: "Podophyllum 30C & Arsenicum Album 30C", dose: "5 drops hourly" }],
        desiRemedies: [{ name: "Pomegranate peel decoction mixed with fresh buttermilk" }]
      }
    },
    {
      id: "DIS_FOOT_ROT",
      nameHi: "खुर सड़न (Foot Rot / Interdigital Necrobacillosis)",
      nameEn: "Foot Rot / Interdigital Phlegmon",
      category: "BACTERIAL",
      tempRange: "103.0°F - 104.5°F",
      cardinalSigns: ["NERV_POSTERIOR_PARALYSIS", "SKIN_NODULES"],
      labTests: [
        { sNo: 1, testName: "Deep Interdigital Exudate Gram Stain", sampleType: "Swab from deep necrotic fissure", approxMrp: 120, tat: "20 Mins", confirms: "Filamentous Gram-negative Fusobacterium necrophorum and Dichelobacter nodosus" }
      ],
      stages: [
        { stage: 1, signs: "Mild interdigital erythema and edema, slight lameness, animal holding foot up.", recovery: "95% with footbaths and single long-acting antibiotic", deterioration: "Necrotic fissure develops" },
        { stage: 2, signs: "Deep fissure formation between claws with foul-smelling gray necrotic core; severe symmetrical pastern swelling.", recovery: "85% complete resolution", deterioration: "Deep flexor tendon infection" },
        { stage: 3, signs: "Severe non-weight bearing lameness, purulent sinus tracts draining above coronet, loss of body weight.", recovery: "40% claw amputation may be required", deterioration: "Suppurative arthritis of pedal joint" },
        { stage: 4, signs: "Permanent ankylosing arthritis, separation of horny claw wall, chronic recumbency, culling.", recovery: "10% salvage only", deterioration: "Permanent culling" }
      ],
      treatment: {
        injections: [
          { name: "Oxytetracycline LA 200mg/ml", salt: "Oxytetracycline LA", ethicalBrand: "Terramycin LA 30ml (Zoetis)", genericOption: "Oxysteclin LA 30ml", mrpEthical: 260, mrpGeneric: 98, dose: "20 mg/kg Deep I/M", route: "Deep I/M", pregnancySafe: false, purpose: "High sustained tissue levels against F. necrophorum" },
          { name: "Meloxicam + Paracetamol", salt: "Meloxicam + Paracetamol", ethicalBrand: "Melonex Plus 100ml (Intas)", genericOption: "Melonat Plus 100ml", mrpEthical: 220, mrpGeneric: 85, dose: "15-20 ml Deep I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Relieves severe distal limb pain" }
        ],
        oral: [{ name: "Zinc Sulfate & Biotin Supplement (10g daily) to strengthen new claw horn growth" }],
        ayurvedic: [{ name: "Jatyadi Taila applied directly into interdigital fissure" }],
        homeopathic: [{ name: "Silicea 200C & Hepar Sulphuris 200C", dose: "10 pills BID" }],
        desiRemedies: [{ name: "5% Copper Sulfate (Tutia) footbath; keep cattle on clean dry concrete floor" }]
      }
    },
    {
      id: "DIS_TETANUS",
      nameHi: "धनुस्तंभ / टिटनेस (Tetanus / Lockjaw)",
      nameEn: "Tetanus",
      category: "BACTERIAL",
      tempRange: "101.5°F - 103.5°F (Normal to moderate)",
      cardinalSigns: ["NERV_OPISTHOTONOS", "NERV_POSTERIOR_PARALYSIS"],
      labTests: [
        { sNo: 1, testName: "Clinical Haw Flashing Test", sampleType: "Direct forehead tap reflex", approxMrp: 0, tat: "Immediate", confirms: "Bilateral flash prolapse of third eyelid pathognomonic for tetanospasmin" },
        { sNo: 2, testName: "Deep Wound Smear (Gram Stain)", sampleType: "Aspirate from puncture wound / hoof tract", approxMrp: 120, tat: "20 Mins", confirms: "Drumstick sporulated rods (Clostridium tetani)" }
      ],
      stages: [
        { stage: 1, signs: "Stiff gait, erect ears, anxious facial expression, tail elevated, slow chewing.", recovery: "70% with immediate antitoxin administration", deterioration: "Generalized spasticity in 24h" },
        { stage: 2, signs: "Sawhorse stance, trismus (locked jaw), bilateral 3rd eyelid prolapse upon clapping sound or visual stimulus.", recovery: "40% with intensive sedation and nursing", deterioration: "Spasms triggered by noise/light" },
        { stage: 3, signs: "Violent tetanic muscle spasms, opisthotonos, lateral recumbency with all four limbs rigidly extended, bloat.", recovery: "10-15% very grave", deterioration: "Diaphragm tetanic paralysis" },
        { stage: 4, signs: "Asphyxiation due to persistent respiratory muscle rigidity, cardiac exhaustion and death.", recovery: "<2%", deterioration: "Fatal within 24-48 hours" }
      ],
      treatment: {
        injections: [
          { name: "Tetanus Antitoxin (TAT)", salt: "Equine Tetanus Immunoglobulin 50,000 IU", ethicalBrand: "TAT 10,000 IU (Serum Institute)", genericOption: "Anti-Tetanus Serum", mrpEthical: 980, mrpGeneric: 450, dose: "50,000 IU I/V + 50,000 IU S/C around wound", route: "I/V and S/C", pregnancySafe: true, purpose: "Neutralizes circulating unbound tetanospasmin neurotoxin" },
          { name: "Crystalline Penicillin G 40 Lakh IU", salt: "Penicillin G Sodium", ethicalBrand: "Penicillin G 40L (Alembic)", genericOption: "Pendistrin 40L", mrpEthical: 135, mrpGeneric: 58, dose: "30,000 IU/kg slow I/V every 6 hours", route: "Slow I/V", pregnancySafe: true, purpose: "Kills vegetative C. tetani in anaerobic wound tissue" },
          { name: "Diazepam Injection 5mg/ml", salt: "Diazepam", ethicalBrand: "Calmpose 2ml (Ranbaxy)", genericOption: "Diazepam Vet", mrpEthical: 65, mrpGeneric: 25, dose: "0.2-0.5 mg/kg slow I/V as needed", route: "Slow I/V", pregnancySafe: true, purpose: "Centrally acting muscle relaxant to relieve fatal spasms" }
        ],
        oral: [],
        ayurvedic: [],
        homeopathic: [{ name: "Hypericum 1M & Ledum Palustre 1M", dose: "10 drops hourly" }],
        desiRemedies: [{ name: "House animal in dark, soundproof, deeply bedded stall; thoroughly debride wound with 3% H2O2" }]
      }
    },
    {
      id: "DIS_ACTINOMYCOSIS",
      nameHi: "लम्पी जॉ / जबड़े की हड्डी का नासूर (Actinomycosis / Lumpy Jaw)",
      nameEn: "Actinomycosis / Lumpy Jaw",
      category: "BACTERIAL",
      tempRange: "101.5°F - 102.5°F (Afebrile)",
      cardinalSigns: ["SKIN_NODULES", "RESP_GRUNTING_MOAN"],
      labTests: [
        { sNo: 1, testName: "Pus Smear for Sulfur Granules", sampleType: "Aspirated pus from jaw swelling", approxMrp: 150, tat: "30 Mins", confirms: "Yellow sulfur granules revealing Gram-positive branching filamentous Actinomyces bovis" }
      ],
      stages: [
        { stage: 1, signs: "Painless, hard, immovable bony enlargement on horizontal ramus of mandible or maxilla.", recovery: "80% resolution with early parenteral iodine & penicillin", deterioration: "Bone rarefaction and marrow destruction" },
        { stage: 2, signs: "Bony mass expands, facial distortion, loose and painful teeth, drooling, difficulty chewing cud.", recovery: "40% arrested progression", deterioration: "Skin ulceration and sinus formation" },
        { stage: 3, signs: "Multiple discharging fistulous tracts draining honey-like pus with gritty yellow sulfur granules.", recovery: "15% salvage only", deterioration: "Severe emaciation from starvation" },
        { stage: 4, signs: "Severe mandibular osteomyelitis, loss of teeth, inability to masticate, death from starvation.", recovery: "0%", deterioration: "Permanent culling" }
      ],
      treatment: {
        injections: [
          { name: "Sodium Iodide 20% Solution", salt: "Sodium Iodide", ethicalBrand: "Sodium Iodide 20% 500ml", genericOption: "Sodi-Iodide 500ml", mrpEthical: 350, mrpGeneric: 160, dose: "1g per 14kg body weight (Slow I/V single dose; repeat in 14 days)", route: "Slow I/V strictly", pregnancySafe: false, purpose: "Resolves granulomatous tissue and mobilizes osteolytic barrier" },
          { name: "Streptomycin + Procaine Penicillin", salt: "Streptomycin + Penicillin", ethicalBrand: "Dicrysticin 5g (Zydus)", genericOption: "Strep-Pen 5g", mrpEthical: 210, mrpGeneric: 90, dose: "10 mg/kg Streptomycin Deep I/M daily for 14 days", route: "Deep I/M", pregnancySafe: true, purpose: "Synergistic bactericidal action against A. bovis" }
        ],
        oral: [{ name: "Potassium Iodide Powder (6-10g daily orally for 2-3 weeks until signs of iodism appear)" }],
        ayurvedic: [{ name: "Kanchnar Guggulu (10 tablets BID)" }],
        homeopathic: [{ name: "Hekla Lava 3X & Silicea 200C", dose: "5g Hekla Lava powder daily" }],
        desiRemedies: [{ name: "Remove sharp awns, coarse dry crop residues and thorns from roughage" }]
      }
    },
    {
      id: "DIS_ACTINOBACILLOSIS",
      nameHi: "लकड़ी जैसी जीभ / वुडन टंग (Actinobacillosis / Wooden Tongue)",
      nameEn: "Actinobacillosis / Wooden Tongue",
      category: "BACTERIAL",
      tempRange: "102.0°F - 104.0°F",
      cardinalSigns: ["RESP_FROTHY_DISCHARGE", "SKIN_NODULES"],
      labTests: [
        { sNo: 1, testName: "Crushed Granule Smear (Gram Stain)", sampleType: "Biopsy / Aspirated pus from tongue lesion", approxMrp: 150, tat: "30 Mins", confirms: "Gram-negative pleomorphic rods (Actinobacillus lignieresii) with club-shaped radiating rosettes" }
      ],
      stages: [
        { stage: 1, signs: "Profuse salivation, slow chewing, tip of tongue swollen and painful to palpation.", recovery: "95% rapid reversal with parenteral iodine & ceftriaxone", deterioration: "Lingual induration" },
        { stage: 2, signs: "Tongue becomes hard, thick, and immobile ('wooden tongue'); protrudes between teeth; inability to grasp feed.", recovery: "80% complete recovery", deterioration: "Ulceration on dorsal lingual groove" },
        { stage: 3, signs: "Severe ulceration on dorsum of tongue, firm nodules in submandibular lymph nodes with purulent drainage.", recovery: "50% resolution", deterioration: "Permanent lingual architectural scarring" },
        { stage: 4, signs: "Severe cachexia, pharyngeal lymph node enlargement causing choking and dyspnea, death from inanition.", recovery: "20%", deterioration: "Death from starvation" }
      ],
      treatment: {
        injections: [
          { name: "Sodium Iodide 20% Solution", salt: "Sodium Iodide", ethicalBrand: "Sodium Iodide 20% 500ml", genericOption: "Sodi-Iodide 500ml", mrpEthical: 350, mrpGeneric: 160, dose: "70 mg/kg slow I/V as single dose", route: "Slow I/V", pregnancySafe: false, purpose: "Rapid resolution of soft tissue granulomatous infiltration" },
          { name: "Ceftriaxone Sodium 3g", salt: "Ceftriaxone Sodium", ethicalBrand: "Intacef 3g (Intas)", genericOption: "Ceff 3g", mrpEthical: 380, mrpGeneric: 145, dose: "10 mg/kg I/M daily for 5 days", route: "Deep I/M", pregnancySafe: true, purpose: "Bactericidal eradication of Gram-negative A. lignieresii" }
        ],
        oral: [{ name: "Potassium Iodide Powder (5g daily in feed for 7 days)" }],
        ayurvedic: [{ name: "Triphala Kwath lingual wash" }],
        homeopathic: [{ name: "Mercurius Solubilis 200C & Kali Iodatum 30C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Wash oral cavity with warm 1% Alum water; feed soft gruel/dalia" }]
      }
    },

    // =========================================================================
    // CATEGORY 2: VIRAL DISEASES (16 to 23)
    // =========================================================================
    {
      id: "DIS_FMD",
      nameHi: "खुरपका-मुँहपका (Foot-and-Mouth Disease)",
      nameEn: "Foot-and-Mouth Disease",
      category: "VIRAL",
      tempRange: "104.0°F - 106.5°F",
      cardinalSigns: ["RESP_FROTHY_DISCHARGE", "SKIN_NODULES", "NERV_POSTERIOR_PARALYSIS"],
      labTests: [
        { sNo: 1, testName: "Antigen Typing ELISA (O, A, Asia-1)", sampleType: "Vesicular fluid / Epithelial flap", approxMrp: 1200, tat: "24 Hours", confirms: "Identifies specific FMDV serotype" },
        { sNo: 2, testName: "RT-PCR for FMDV RNA", sampleType: "Oral swab / Vesicular epithelium", approxMrp: 2000, tat: "24 Hours", confirms: "Aphthovirus genomic detection" }
      ],
      stages: [
        { stage: 1, signs: "Pyrexia (105°F), extreme dullness, smacking of lips, ropy saliva dripping, shivering.", recovery: "Virtually 100% survival in adult cattle", deterioration: "Vesicle eruption within 24h" },
        { stage: 2, signs: "Vesicles rupture on tongue, dental pad, gums and coronary band, leaving raw red bleeding ulcers.", recovery: "Secondary bacterial infections common", deterioration: "Sloughing of hooves, severe lameness" },
        { stage: 3, signs: "Severe mastitis, abortion in pregnant cows, myocardial necrosis ('tiger heart') death in young calves.", recovery: "Adults survive with heat intolerance", deterioration: "Permanent endocrine panting syndrome" },
        { stage: 4, signs: "Chronic 'Pantor' syndrome: rough coat, overgrown hooves, heat intolerance, permanent 50% milk drop.", recovery: "Permanent sequela", deterioration: "Severe economic loss" }
      ],
      treatment: {
        injections: [
          { name: "Ceftriaxone Sodium 3g", salt: "Ceftriaxone Sodium", ethicalBrand: "Intacef 3g (Intas)", genericOption: "Ceff 3g", mrpEthical: 380, mrpGeneric: 145, dose: "10 mg/kg I/M daily for 3-5 days", route: "Deep I/M", pregnancySafe: true, purpose: "Prevents secondary bacterial invasion in denuded oral and foot ulcers" },
          { name: "Flunixin Meglumine", salt: "Flunixin Meglumine 50mg/ml", ethicalBrand: "Megludyne 50ml (Virbac)", genericOption: "Flunivet 50ml", mrpEthical: 510, mrpGeneric: 210, dose: "2.2 mg/kg slow I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Analgesic to permit chewing and control pyrexia" },
          { name: "Pheniramine Maleate", salt: "Pheniramine Maleate 22.75mg/ml", ethicalBrand: "Avil Vet 100ml (MSD)", genericOption: "Cadistin Vet 100ml", mrpEthical: 120, mrpGeneric: 45, dose: "10 ml Deep I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Antiallergic support" }
        ],
        oral: [{ name: "Sodium bicarbonate and potassium chlorate mouth gargle" }],
        ayurvedic: [{ name: "Honey + Borax (Suhaga) paste applied on tongue", dose: "Apply 3 times daily" }],
        homeopathic: [{ name: "Variolinum 200C, Merc Sol 200C & Rhus Tox 200C", dose: "10 pills TID" }],
        desiRemedies: [{ name: "Wash mouth with 1% Alum (Fitkari) or 0.1% KMnO4; wash hooves with neem water" }]
      }
    },
    {
      id: "DIS_LSD",
      nameHi: "लंपी स्किन रोग (Lumpy Skin Disease)",
      nameEn: "Lumpy Skin Disease",
      category: "VIRAL",
      tempRange: "104.5°F - 107.0°F",
      cardinalSigns: ["SKIN_NODULES", "SKIN_DEW_LAP_EDEMA", "RESP_GRUNTING_MOAN"],
      labTests: [
        { sNo: 1, testName: "Real-Time PCR for Capripoxvirus", sampleType: "Skin nodule biopsy / Scabs", approxMrp: 1800, tat: "24 Hours", confirms: "Definitive Lumpy Skin Disease Virus (LSDV) DNA" }
      ],
      stages: [
        { stage: 1, signs: "High fever (105-106°F), watery ocular and nasal discharge, enlargement of prescapular lymph nodes.", recovery: "85% if treated symptomatically", deterioration: "Cutaneous nodule eruption" },
        { stage: 2, signs: "Firm, round, raised nodules (20-50mm) across entire body, dewlap and udder; severe brisket edema.", recovery: "70% with wound management", deterioration: "Necrosis of center of nodules ('sit-fasts')" },
        { stage: 3, signs: "Nodules slough leaving deep craters, secondary myiasis (maggots), respiratory stridor, pneumonia.", recovery: "50% slow recovery (months)", deterioration: "Asphyxia or septic shock" },
        { stage: 4, signs: "Permanent deep skin scars, chronic brisket edema, orchitis/infertility in bulls, extreme emaciation.", recovery: "Salvage only", deterioration: "Permanent culling" }
      ],
      treatment: {
        injections: [
          { name: "Enrofloxacin 10% Injection", salt: "Enrofloxacin 100mg/ml", ethicalBrand: "Floxidin 10% 100ml (Virbac)", genericOption: "Enrovet 100ml", mrpEthical: 310, mrpGeneric: 120, dose: "5 mg/kg Deep I/M for 3-5 days", route: "Deep I/M", pregnancySafe: false, purpose: "Controls secondary bacterial pneumonia and necrotic wound infection" },
          { name: "Meloxicam + Paracetamol", salt: "Meloxicam + Paracetamol", ethicalBrand: "Melonex Plus 100ml (Intas)", genericOption: "Melonat Plus 100ml", mrpEthical: 220, mrpGeneric: 85, dose: "15-20 ml Deep I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Reduces high fever and leg/dewlap edema" },
          { name: "Ivermectin 1% S/C", salt: "Ivermectin 10mg/ml", ethicalBrand: "Neomec 10ml (Intas)", genericOption: "Ivervet 10ml", mrpEthical: 155, mrpGeneric: 55, dose: "1 ml per 50kg S/C single shot", route: "Subcutaneous", pregnancySafe: true, purpose: "Prevents myiasis (maggots) in open sloughed crater lesions" }
        ],
        oral: [{ name: "Vitamin A, D3, E and Zinc oral syrup to accelerate dermal re-epithelialization" }],
        ayurvedic: [{ name: "National Herbal Formulation (Black pepper, cumin, turmeric, betel leaves, jaggery)", dose: "Laddus BID for 7 days" }],
        homeopathic: [{ name: "Thuja Occidentalis 200C & Variolinum 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Apply neem oil + camphor + turmeric on open crater wounds to repel flies" }]
      }
    },
    {
      id: "DIS_PPR",
      nameHi: "बकरी प्लेग / पीपीआर (Peste des Petits Ruminants)",
      nameEn: "Peste des Petits Ruminants",
      category: "VIRAL",
      tempRange: "104.0°F - 106.5°F",
      cardinalSigns: ["DUNG_WATERY_FOUL", "RESP_PAROXYSMAL_COUGH", "EYE_LACRIMATION"],
      labTests: [
        { sNo: 1, testName: "Immunocapture ELISA for PPR Antigen", sampleType: "Nasal/Ocular swab / Fecal suspension", approxMrp: 900, tat: "24 Hours", confirms: "PPR Morbillivirus nucleoprotein detection" },
        { sNo: 2, testName: "RT-PCR for PPRV", sampleType: "Mesenteric lymph node / Spleen", approxMrp: 2200, tat: "48 Hours", confirms: "Sungri 96 lineage amplification" }
      ],
      stages: [
        { stage: 1, signs: "Sudden high fever (105°F), sneezing, serous eye and nasal discharge, dullness.", recovery: "80% with immediate antibiotics and supportive therapy", deterioration: "Oral necrosis begins" },
        { stage: 2, signs: "Cheesy white necrotic plaques inside mouth and gums; severe halitosis, encrusted nostrils.", recovery: "40% guarded", deterioration: "Severe enteritis" },
        { stage: 3, signs: "Profuse foul-smelling diarrhea, severe dehydration, dyspnea, hypothermia, death.", recovery: "10-20%", deterioration: "Mortality up to 90% in naive flocks" },
        { stage: 4, signs: "Hypothermia (<98°F), severe sunken eyes, lateral recumbency and death within 5-10 days.", recovery: "<5%", deterioration: "Death from dehydration and viral pneumonia" }
      ],
      treatment: {
        injections: [
          { name: "Oxytetracycline LA 200mg/ml", salt: "Oxytetracycline LA", ethicalBrand: "Terramycin LA 30ml (Zoetis)", genericOption: "Oxysteclin LA 30ml", mrpEthical: 260, mrpGeneric: 98, dose: "20 mg/kg Deep I/M (1ml/10kg goat)", route: "Deep I/M", pregnancySafe: false, purpose: "Controls secondary bacterial pneumonia (Pasteurella multocida)" },
          { name: "Meloxicam Injection", salt: "Meloxicam 5mg/ml", ethicalBrand: "Melonex 30ml (Intas)", genericOption: "Melonat 30ml", mrpEthical: 85, mrpGeneric: 32, dose: "0.5 mg/kg I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Antipyretic and anti-inflammatory" },
          { name: "Ringers Lactate + 5% Dextrose", salt: "Electrolyte Infusion", ethicalBrand: "RL Vet 500ml", genericOption: "RL Infusion", mrpEthical: 95, mrpGeneric: 40, dose: "250-500 ml slow I/V or S/C", route: "Slow I/V or S/C", pregnancySafe: true, purpose: "Rehydrates from acute fluid loss in severe diarrhea" }
        ],
        oral: [{ name: "Kaolin-pectin suspension (15 ml orally BID) to protect denuded gut mucosa" }],
        ayurvedic: [{ name: "Tulsi + Ginger + Honey decoction for cough", dose: "15 ml BID" }],
        homeopathic: [{ name: "Mercurius Corrosivus 30C & Arsenicum Album 30C", dose: "5 drops hourly" }],
        desiRemedies: [{ name: "Wash oral ulcers with 5% boroglycerine; feed boiled cooling rice gruel" }]
      }
    },
    {
      id: "DIS_RABIES",
      nameHi: "रेबीज / अलर्क रोग (Bovine Rabies)",
      nameEn: "Bovine Rabies",
      category: "VIRAL",
      tempRange: "102.0°F - 104.0°F (Terminal variable)",
      cardinalSigns: ["NERV_AGGRESSION_HYDRO", "RESP_FROTHY_DISCHARGE", "NERV_POSTERIOR_PARALYSIS"],
      labTests: [
        { sNo: 1, testName: "Direct Fluorescent Antibody (DFA) on Brain Tissue", sampleType: "Hippocampus / Cerebellum (Post-mortem)", approxMrp: 1500, tat: "12 Hours", confirms: "Gold standard Lyssavirus antigen detection" },
        { sNo: 2, testName: "Sellers Stain for Negri Bodies", sampleType: "Brain impression smear", approxMrp: 300, tat: "1 Hour", confirms: "Intracytoplasmic eosinophilic Negri bodies" }
      ],
      stages: [
        { stage: 1, signs: "Prodromal: Animal alert, anxious, separation from herd, hyperesthesia at bite site.", recovery: "0% once clinical signs appear", deterioration: "Progresses within 24-48 hours" },
        { stage: 2, signs: "Furious/Excitative: Aimless continuous bellowing (hoarse voice), attacking inanimate objects, tenesmus, drooling.", recovery: "0% FATAL", deterioration: "Ascending paralysis" },
        { stage: 3, signs: "Dumb/Paralytic: Inability to swallow (frothing at mouth, choking appearance), knuckling of fetlocks, recumbency, death.", recovery: "0%", deterioration: "Death within 3-6 days" },
        { stage: 4, signs: "Complete flaccid paralysis, respiratory arrest, coma and death.", recovery: "0%", deterioration: "Fatal termination" }
      ],
      treatment: {
        injections: [], // STRICT MEDICAL LAW: Rabies is 100% fatal once clinical. No treatment permitted. Euthanasia / Isolation only.
        oral: [],
        ayurvedic: [],
        homeopathic: [],
        desiRemedies: [{ name: "CRITICAL ALERT: Never put hands in mouth to clear suspected choke! Zoonotic bite hazard." }]
      }
    },
    {
      id: "DIS_BVD",
      nameHi: "बोवाइन वायरल डायरिया (Bovine Viral Diarrhea)",
      nameEn: "Bovine Viral Diarrhea / Mucosal Disease",
      category: "VIRAL",
      tempRange: "103.5°F - 105.0°F",
      cardinalSigns: ["DUNG_WATERY_FOUL", "EYE_LACRIMATION"],
      labTests: [
        { sNo: 1, testName: "BVDV Antigen Capture ELISA (Ear Notch)", sampleType: "Ear notch skin biopsy / Serum", approxMrp: 650, tat: "24 Hours", confirms: "Identifies Persistently Infected (PI) carrier animals" },
        { sNo: 2, testName: "RT-PCR for Pestivirus", sampleType: "Whole blood in EDTA", approxMrp: 2200, tat: "48 Hours", confirms: "Detects BVDV Type 1 or Type 2 RNA" }
      ],
      stages: [
        { stage: 1, signs: "Acute transient BVD: Mild fever, transient diarrhea, leukopenia, mild drop in milk, rapid recovery.", recovery: "90% resolution in non-pregnant adults", deterioration: "Immunosuppression facilitates secondary BRD" },
        { stage: 2, signs: "In-utero infection: Abortions, mummification, cerebellar hypoplasia in calves, or birth of PI calves.", recovery: "Permanent defect in calf", deterioration: "Lifelong shedding" },
        { stage: 3, signs: "Mucosal Disease (in PI animals): Explosive bloody diarrhea, severe ulcerations from mouth to anus, 100% mortality.", recovery: "0% in Mucosal Disease", deterioration: "Fatal within 1-2 weeks" },
        { stage: 4, signs: "Severe dehydration, emaciation, sloughing of coronary band, death from pan-mucosal ulceration.", recovery: "0%", deterioration: "Fatal mucosal erosion" }
      ],
      treatment: {
        injections: [
          { name: "Ceftiofur Sodium 1g", salt: "Ceftiofur Sodium", ethicalBrand: "Xyrofur 1g (Intas)", genericOption: "Ceftio-Vet 1g", mrpEthical: 440, mrpGeneric: 185, dose: "1-2 mg/kg I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Controls secondary bacterial pneumonia and enteritis" },
          { name: "Multivitamin + Liver Extract (Belamyl)", salt: "B-Complex + Liver extract", ethicalBrand: "Belamyl 100ml (Zydus)", genericOption: "B-Vet Complex", mrpEthical: 185, mrpGeneric: 70, dose: "10 ml I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Supportive immune revitalization" }
        ],
        oral: [{ name: "Astringent kaolin-pectin electrolytes orally" }],
        ayurvedic: [],
        homeopathic: [{ name: "Mercurius Solubilis 200C & Arsenicum Album 200C" }],
        desiRemedies: [{ name: "Identify and immediately cull Persistently Infected (PI) animals to save the herd" }]
      }
    },
    {
      id: "DIS_EPHEMERAL_FEVER",
      nameHi: "तीन दिनी बुखार / ढाईया (Bovine Ephemeral Fever)",
      nameEn: "Bovine Ephemeral Fever",
      category: "VIRAL",
      tempRange: "105.0°F - 107.0°F (Biphasic)",
      cardinalSigns: ["NERV_POSTERIOR_PARALYSIS", "RESP_GRUNTING_MOAN", "EYE_LACRIMATION"],
      labTests: [
        { sNo: 1, testName: "RT-PCR for Ephemerovirus RNA", sampleType: "Whole blood in EDTA (Buffy coat)", approxMrp: 2000, tat: "24 Hours", confirms: "Detects Rhabdovirus viral genome" }
      ],
      stages: [
        { stage: 1, signs: "Sudden spike in body temperature (106°F), shivering, watery eyes and nose, acute drop in milk yield.", recovery: "Spontaneous rapid recovery within 3 days", deterioration: "Transient muscle stiffness" },
        { stage: 2, signs: "Stiffness in all four limbs, shifting lameness, reluctance to move, grunting respiration.", recovery: "98% with NSAIDs", deterioration: "Sternal recumbency (Downer stage)" },
        { stage: 3, signs: "Sternal recumbency mimicking milk fever; spontaneous recovery usually begins on Day 3.", recovery: "99% recovery unless aspiration occurs", deterioration: "Prolonged recumbency risk" },
        { stage: 4, signs: "Full recovery on day 3-4, or secondary downer syndrome from ischemic muscle damage if neglected.", recovery: "90%", deterioration: "Decubitus ulcers" }
      ],
      treatment: {
        injections: [
          { name: "Ketoprofen 100mg/ml", salt: "Ketoprofen", ethicalBrand: "Neoprofen 100ml (Vetcare)", genericOption: "Ketovet 100ml", mrpEthical: 375, mrpGeneric: 150, dose: "3 mg/kg I/M or slow I/V", route: "I/M or I/V", pregnancySafe: true, purpose: "Potent suppression of cytokine storm and joint pain" },
          { name: "Calcium Borogluconate 25% (Mifex)", salt: "Calcium Borogluconate", ethicalBrand: "Mifex 450ml (Elanco)", genericOption: "Calci-Vet 450ml", mrpEthical: 310, mrpGeneric: 135, dose: "300 ml slow I/V + 150 ml S/C", route: "I/V & S/C", pregnancySafe: true, purpose: "Reverses acute hypocalcemia caused by ephemerovirus" }
        ],
        oral: [{ name: "High-energy drench (Glycerol / Jaggery syrup 500ml daily)" }],
        ayurvedic: [{ name: "Maha Rasnadi Kwath", dose: "50ml BID for joint stiffness" }],
        homeopathic: [{ name: "Rhus Toxicodendron 200C & Bryonia 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Do NOT drench recumbent animals forcefully; turn cow side-to-side every 4 hours" }]
      }
    },
    {
      id: "DIS_COWPOX",
      nameHi: "काउपॉक्स / थन के फफोले (Cowpox & Pseudo-Cowpox)",
      nameEn: "Cowpox and Pseudo-Cowpox",
      category: "VIRAL",
      tempRange: "101.5°F - 102.5°F (Afebrile / Mild fever)",
      cardinalSigns: ["UDDER_HOT_HARD", "SKIN_NODULES"],
      labTests: [
        { sNo: 1, testName: "PCR of Teat Scab Material", sampleType: "Teat lesion scab", approxMrp: 1800, tat: "48 Hours", confirms: "Parapoxvirus (horseshoe rings) vs Orthopoxvirus" }
      ],
      stages: [
        { stage: 1, signs: "Small red papules on the teats and udder; pain and resistance during milking.", recovery: "98% with antiseptic management", deterioration: "Vesicles rupture into ring sores" },
        { stage: 2, signs: "Characteristic horseshoe-shaped or circular scabs on teats; secondary mastitis due to retained milk.", recovery: "90% complete healing in 3-5 weeks", deterioration: "Risk of milker transmission" },
        { stage: 3, signs: "Granulation of teat lesions, painful cracking of teat orifice, secondary bacterial mastitis.", recovery: "80%", deterioration: "Teat canal occlusion" },
        { stage: 4, signs: "Complete epithelial regeneration with slight scarring; milk yield restored.", recovery: "95%", deterioration: "Minimal" }
      ],
      treatment: {
        injections: [],
        oral: [],
        ayurvedic: [{ name: "Aloe vera + Turmeric + Virgin coconut oil ointment", dose: "Apply after milking" }],
        homeopathic: [{ name: "Thuja 200C & Dulcamara 200C", dose: "10 pills BID" }],
        desiRemedies: [{ name: "Dip teats in 0.5% chlorhexidine; milk infected cows last using rubber gloves" }]
      }
    },
    {
      id: "DIS_IBR",
      nameHi: "संक्रामक बोवाइन राइनोट्रैकेइटिस (IBR / Red Nose)",
      nameEn: "Infectious Bovine Rhinotracheitis",
      category: "VIRAL",
      tempRange: "104.0°F - 106.5°F",
      cardinalSigns: ["RESP_PAROXYSMAL_COUGH", "EYE_LACRIMATION", "RESP_FROTHY_DISCHARGE"],
      labTests: [
        { sNo: 1, testName: "IBR gB / gE Antibody ELISA", sampleType: "Serum / Bulk milk", approxMrp: 750, tat: "24 Hours", confirms: "Differentiates wild infection from marker-vaccinated cattle" },
        { sNo: 2, testName: "PCR for Bovine Herpesvirus-1 (BHV-1)", sampleType: "Nasal swab / Aborted fetus lung", approxMrp: 2100, tat: "24 Hours", confirms: "Detects BHV-1 viral DNA" }
      ],
      stages: [
        { stage: 1, signs: "Severe rhinotracheitis: Fiery red nasal mucosa ('Red Nose'), serous nasal/ocular discharge, fever.", recovery: "85% uncomplicated recovery", deterioration: "Pustular diphtheritic membranes form" },
        { stage: 2, signs: "Deep paroxysmal cough, dyspnea, drop in milk yield, infectious pustular vulvovaginitis (IPV).", recovery: "70% with supportive antibiotic cover", deterioration: "Abortion storm in herd" },
        { stage: 3, signs: "Secondary Mannheimia bronchopneumonia, late term abortions, lifelong latent nerve carrier status.", recovery: "50% resolution of pneumonia", deterioration: "Fatal fibrinous pleuropneumonia" },
        { stage: 4, signs: "Latent trigeminal ganglia carrier state, reactivation during transport or calving stress.", recovery: "Carrier for life", deterioration: "Intermittent shedding" }
      ],
      treatment: {
        injections: [
          { name: "Ceftiofur Sodium 1g", salt: "Ceftiofur Sodium", ethicalBrand: "Xyrofur 1g (Intas)", genericOption: "Ceftio-Vet 1g", mrpEthical: 440, mrpGeneric: 185, dose: "1-2 mg/kg I/M BID", route: "Deep I/M", pregnancySafe: true, purpose: "Prevents fatal secondary Mannheimia / Pasteurella pneumonia" },
          { name: "Flunixin Meglumine", salt: "Flunixin Meglumine 50mg/ml", ethicalBrand: "Megludyne 50ml (Virbac)", genericOption: "Flunivet 50ml", mrpEthical: 510, mrpGeneric: 210, dose: "2.2 mg/kg I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Resolves severe tracheal inflammation and pyrexia" }
        ],
        oral: [{ name: "Mucolytic Bromhexine powder (20g daily in feed) to liquefy tracheobronchial exudates" }],
        ayurvedic: [{ name: "Vasaka (Adhatoda vasica) syrup for bronchodilation", dose: "50ml BID" }],
        homeopathic: [{ name: "Aconitum Napellus 200C & Bryonia 200C" }],
        desiRemedies: [{ name: "Eucalyptus oil steam inhalation in enclosed stalls" }]
      }
    },

    // =========================================================================
    // CATEGORY 3: PROTOZOAL & RICKETTSIAL DISEASES (24 to 28)
    // =========================================================================
    {
      id: "DIS_SURRA",
      nameHi: "सर्रा रोग (Trypanosomiasis / Surra)",
      nameEn: "Bovine Trypanosomiasis / Surra",
      category: "PROTOZOAL",
      tempRange: "103.0°F - 106.0°F (Intermittent paroxysms)",
      cardinalSigns: ["NERV_CIRCLING_HEADPRESS", "SKIN_DEW_LAP_EDEMA", "EYE_LACRIMATION", "NERV_AGGRESSION_HYDRO"],
      labTests: [
        { sNo: 1, testName: "Wet Blood Film (Direct Examination)", sampleType: "Fresh warm ear vein blood", approxMrp: 100, tat: "10 Mins", confirms: "Rapidly darting flagellated trypanosomes between RBCs (Trypanosoma evansi)" },
        { sNo: 2, testName: "Card Agglutination Test (CATT/T. evansi)", sampleType: "Serum", approxMrp: 450, tat: "15 Mins", confirms: "Serological antibody detection" }
      ],
      stages: [
        { stage: 1, signs: "Intermittent recurring fever, petechiae on conjunctiva, dependent edema of brisket, sheath and legs.", recovery: "90% with Quinapyramine / Diminazene", deterioration: "Parasite crosses blood-brain barrier" },
        { stage: 2, signs: "Progressive emaciation despite feeding, anemia, keratitis, blindness, circling movements.", recovery: "50% guarded", deterioration: "Severe cerebral trypanosomiasis" },
        { stage: 3, signs: "Maniacal running, bellowing, head pressing against wall, convulsions, paralysis of hindquarters, death.", recovery: "<10%", deterioration: "Fatal within 12-48 hours" },
        { stage: 4, signs: "Terminal coma, profound hypothermia, death.", recovery: "0%", deterioration: "Fatal termination" }
      ],
      treatment: {
        injections: [
          { name: "Quinapyramine Sulfate + Chloride (Triquin)", salt: "Quinapyramine salts 2.5g", ethicalBrand: "Triquin 2.5g (MSD)", genericOption: "Suramin Pro 2.5g", mrpEthical: 440, mrpGeneric: 210, dose: "4.4 mg/kg (Reconstitute with 15ml WFI, give 1ml/40kg S/C)", route: "Strictly Subcutaneous", pregnancySafe: true, purpose: "Curative and provides 6 months chemoprophylaxis" },
          { name: "Diminazene Aceturate 70mg/ml", salt: "Diminazene Aceturate", ethicalBrand: "Berenil RTU 30ml (MSD)", genericOption: "Diminavet 30ml", mrpEthical: 275, mrpGeneric: 105, dose: "3.5-7.0 mg/kg Deep I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Effective alternative trypanocide" },
          { name: "Neurotropic B1, B6, B12 (Tribivet)", salt: "B-Vitamins", ethicalBrand: "Tribivet 100ml (Intas)", genericOption: "Neuro-Vet 100ml", mrpEthical: 185, mrpGeneric: 72, dose: "10 ml Deep I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Repairs parasite-damaged myelin sheaths" }
        ],
        oral: [{ name: "High calorie glucose + jaggery drenches" }],
        ayurvedic: [{ name: "Ashwagandha + Shatavari powder (50g daily)" }],
        homeopathic: [{ name: "Arsenicum Album 200C & Nux Vomica 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Spray cattle sheds with Cypermethrin to kill Tabanus (horse flies)" }]
      }
    },
    {
      id: "DIS_BABESIOSIS",
      nameHi: "बबेशियोसिस / चिचड़ी वाला लाल पेशाब (Babesiosis / Redwater)",
      nameEn: "Bovine Babesiosis",
      category: "PROTOZOAL",
      tempRange: "105.0°F - 107.0°F",
      cardinalSigns: ["URINE_COFFEE_RED", "EYE_PALLOR", "EYE_JAUNDICE"],
      labTests: [
        { sNo: 1, testName: "Thin Blood Smear (Giemsa)", sampleType: "Peripheral ear vein blood", approxMrp: 150, tat: "20 Mins", confirms: "Paired piriform intra-erythrocytic piroplasms meeting at acute angle (Babesia bigemina)" }
      ],
      stages: [
        { stage: 1, signs: "High fever (105-106°F), accelerated pulse (audible heart sounds), dullness, refusal to feed.", recovery: "95% with immediate Diminazene", deterioration: "Massive intravascular hemolysis begins" },
        { stage: 2, signs: "Port-wine / coffee-colored urine (Hemoglobinuria), pale to yellow conjunctiva (severe icterus).", recovery: "70% with fluids & antiprotozoals", deterioration: "Kidney tubular blockage by hemoglobin" },
        { stage: 3, signs: "Severe anemia (PCV <12%), pipe-stem diarrhea or dark hard dung, hypothermia, death.", recovery: "25% requires whole blood transfusion", deterioration: "Fatal anemic anoxia" },
        { stage: 4, signs: "Anuric renal failure, severe icteric coma, death.", recovery: "<5%", deterioration: "Fatal uremia" }
      ],
      treatment: {
        injections: [
          { name: "Diminazene Aceturate 70mg/ml", salt: "Diminazene Aceturate", ethicalBrand: "Berenil RTU 30ml (MSD)", genericOption: "Diminavet 30ml", mrpEthical: 275, mrpGeneric: 105, dose: "3.5-5.0 mg/kg (1ml per 20kg)", route: "Strictly Deep I/M only", pregnancySafe: true, purpose: "Rapid lysis of intra-erythrocytic Babesia parasites" },
          { name: "Dextrose 5% + Normal Saline (DNS)", salt: "Dextrose Normal Saline", ethicalBrand: "DNS Vet 1000ml (Albert David)", genericOption: "DNS Infusion", mrpEthical: 110, mrpGeneric: 45, dose: "2-3 Liters slow I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Maintains glomerular filtration to prevent anuric renal failure" },
          { name: "Toldimphos Sodium 200mg/ml (Tonophosphan)", salt: "Toldimphos Sodium", ethicalBrand: "Tonophosphan 30ml (MSD)", genericOption: "Uro-Phos 30ml", mrpEthical: 295, mrpGeneric: 115, dose: "10-15 ml I/M or slow I/V", route: "I/M or I/V", pregnancySafe: true, purpose: "Supports erythrocyte membrane integrity and ATP synthesis" },
          { name: "Meloxicam + Paracetamol", salt: "Meloxicam + Paracetamol", ethicalBrand: "Melonex Plus 100ml (Intas)", genericOption: "Melonat Plus 100ml", mrpEthical: 220, mrpGeneric: 85, dose: "15-20 ml I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Controls high fever" }
        ],
        oral: [{ name: "Hematinic mixtures (Liver extract + Iron + B12) 100ml daily for 10 days" }],
        ayurvedic: [{ name: "Raktastambhak Kwath & Punarnavadi Mandur", dose: "30g daily" }],
        homeopathic: [{ name: "Crotalus Horridus 200C & Phosphorus 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Rhipicephalus (Boophilus) microplus tick eradication on cattle and premises" }]
      }
    },
    {
      id: "DIS_THEILERIOSIS",
      nameHi: "थायलेरियासिस (Tropical Theileriosis)",
      nameEn: "Bovine Theileriosis",
      category: "PROTOZOAL",
      tempRange: "105.0°F - 107.0°F",
      cardinalSigns: ["SKIN_NODULES", "RESP_GRUNTING_MOAN", "EYE_LACRIMATION", "EYE_PALLOR"],
      labTests: [
        { sNo: 1, testName: "Lymph Node Biopsy / Aspirate Smear", sampleType: "Prescapular lymph node aspirate", approxMrp: 200, tat: "30 Mins", confirms: "Pathognomonic Koch's blue bodies (macroschizonts) in lymphoblasts" },
        { sNo: 2, testName: "Thin Blood Smear (Giemsa)", sampleType: "Peripheral ear vein blood", approxMrp: 150, tat: "30 Mins", confirms: "Pleomorphic piroplasms (ring/rod/comma) inside RBCs" }
      ],
      stages: [
        { stage: 1, signs: "High fever (105-106°F), prominent bilateral swelling of prescapular lymph nodes, serous lacrimation.", recovery: "90% with single dose Buparvaquone", deterioration: "Erythrocytic invasion begins" },
        { stage: 2, signs: "Severe anemia, pale to icteric conjunctiva, corneal opacity (blue eye), petechial hemorrhages.", recovery: "60-70% with intensive hematinics", deterioration: "Pulmonary edema onset" },
        { stage: 3, signs: "Severe respiratory distress (froth at mouth/nostrils), open-mouth panting, hypothermia, recumbency, death.", recovery: "15-20% very grave", deterioration: "Fatal pulmonary edema within 24h" },
        { stage: 4, signs: "Asphyxiation from tracheal froth, hypothermia (<98°F), death.", recovery: "<5%", deterioration: "Fatal termination" }
      ],
      treatment: {
        injections: [
          { name: "Buparvaquone 50mg/ml", salt: "Buparvaquone", ethicalBrand: "Butalex 20ml (MSD)", genericOption: "Buparvet / Zubion 20ml", mrpEthical: 1280, mrpGeneric: 580, dose: "2.5 mg/kg body weight (1ml/20kg)", route: "Strictly Deep I/M in neck (Repeat in 48h if severe)", pregnancySafe: true, purpose: "Specific curative schizonticide and piroplasmicide" },
          { name: "Oxytetracycline LA 200mg/ml", salt: "Oxytetracycline LA", ethicalBrand: "Terramycin LA 30ml (Zoetis)", genericOption: "Oxysteclin LA 30ml", mrpEthical: 260, mrpGeneric: 98, dose: "20 mg/kg Deep I/M", route: "Deep I/M", pregnancySafe: false, purpose: "Synergistic anti-theilerial and covers secondary infections" },
          { name: "Furosemide 50mg/ml (Lasix)", salt: "Furosemide", ethicalBrand: "Lasix Vet 10ml (Sanofi)", genericOption: "Salix 10ml", mrpEthical: 80, mrpGeneric: 30, dose: "1 mg/kg I/V or I/M", route: "I/V or I/M", pregnancySafe: true, purpose: "Relieves life-threatening pulmonary edema" }
        ],
        oral: [{ name: "Hematinic syrup (Ferrous sulfate + Copper + Cobalt + B12) 50ml daily for 15 days" }],
        ayurvedic: [{ name: "Punarnava Mandur & Giloy Satva", dose: "20g BID" }],
        homeopathic: [{ name: "China 200C & Arsenicum Album 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Strict Hyalomma tick control using Amitraz (12.5%) or Flumethrin pour-on" }]
      }
    },
    {
      id: "DIS_ANAPLASMOSIS",
      nameHi: "एनाप्लास्मोसिस / पीलिया बुखार (Anaplasmosis / Gall Sickness)",
      nameEn: "Bovine Anaplasmosis",
      category: "PROTOZOAL",
      tempRange: "104.0°F - 106.0°F",
      cardinalSigns: ["EYE_JAUNDICE", "EYE_PALLOR", "DUNG_HARD_DRY_MUCUS"],
      labTests: [
        { sNo: 1, testName: "Thin Blood Smear (Giemsa)", sampleType: "Peripheral ear vein blood", approxMrp: 150, tat: "20 Mins", confirms: "Small dense spherical marginal bodies on periphery of RBCs (Anaplasma marginale)" }
      ],
      stages: [
        { stage: 1, signs: "Pyrexia (104-105°F), gradual drop in milk yield, sluggishness, loss of appetite.", recovery: "90% with Oxytetracycline LA", deterioration: "Extravascular hemolysis in spleen" },
        { stage: 2, signs: "Severe pallor turning to deep lemon-yellow icterus (jaundice); NO RED URINE (urine is brown/clear).", recovery: "65% with supportive therapy", deterioration: "Constipation with hard mucus-coated dung" },
        { stage: 3, signs: "Extreme weakness, aggressive behavior due to cerebral anoxia, collapse, death.", recovery: "20-30%", deterioration: "Fatal anemic crisis" },
        { stage: 4, signs: "Severe hypothermia, profound cachexia, death.", recovery: "<5%", deterioration: "Fatal termination" }
      ],
      treatment: {
        injections: [
          { name: "Oxytetracycline LA 200mg/ml", salt: "Oxytetracycline LA", ethicalBrand: "Terramycin LA 30ml (Zoetis)", genericOption: "Oxysteclin LA 30ml", mrpEthical: 260, mrpGeneric: 98, dose: "20 mg/kg Deep I/M (Repeat in 72 hours)", route: "Deep I/M", pregnancySafe: false, purpose: "Drug of choice to kill intra-erythrocytic Anaplasma" },
          { name: "Vitamin B-Complex with Liver Extract (Belamyl)", salt: "B-Complex + Liver extract", ethicalBrand: "Belamyl 100ml (Zydus)", genericOption: "B-Vet Complex", mrpEthical: 185, mrpGeneric: 70, dose: "10 ml Deep I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Hepatoprotective and appetite stimulation" }
        ],
        oral: [{ name: "Liquid paraffin / Magnesium sulfate (200g) to relieve severe constipation" }],
        ayurvedic: [{ name: "Arogyavardhini Vati & Bhringraj Swaras", dose: "20ml BID" }],
        homeopathic: [{ name: "Chelidonium 200C & China 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Control tabanid biting flies and ticks; strictly use new needle for every animal" }]
      }
    },
    {
      id: "DIS_COCCIDIOSIS",
      nameHi: "खूनी पेचिश / आंत्रशोथ (Bovine Coccidiosis)",
      nameEn: "Bovine Coccidiosis",
      category: "PROTOZOAL",
      tempRange: "102.5°F - 104.0°F",
      cardinalSigns: ["DUNG_BLOODY_MUCOID", "EYE_PALLOR"],
      labTests: [
        { sNo: 1, testName: "Fecal Flotation for Oocysts", sampleType: "Fresh feces", approxMrp: 150, tat: "30 Mins", confirms: "Sporulated oocysts of Eimeria bovis / E. zuernii" }
      ],
      stages: [
        { stage: 1, signs: "Watery diarrhea, mild tenesmus, decreased feed intake in young calves (3-12 months).", recovery: "95% with amprolium/sulfa", deterioration: "Epithelial denudation of cecum/colon" },
        { stage: 2, signs: "Severe dysentery: Feces contains frank dark blood clots, fibrin casts, and mucous; arched back.", recovery: "75% with supportive therapy", deterioration: "Anemia and rectal prolapse" },
        { stage: 3, signs: "Severe tenesmus leading to rectal prolapse, dehydration, subnormal temperature, death.", recovery: "30-40%", deterioration: "Fatal shock within 2-4 days" },
        { stage: 4, signs: "Severe emaciation, recumbency, death from blood loss.", recovery: "10%", deterioration: "Fatal termination" }
      ],
      treatment: {
        injections: [
          { name: "Sulfadimidine Sodium 33.3% w/v", salt: "Sulfadimidine Sodium", ethicalBrand: "Sulphatan 100ml (Zydus)", genericOption: "Sulfa-Vet 100ml", mrpEthical: 165, mrpGeneric: 68, dose: "100 mg/kg slow I/V or I/M (30ml/100kg)", route: "Slow I/V or I/M", pregnancySafe: true, purpose: "Inhibits coccidial schizogony in cecal mucosa" },
          { name: "Ethamsylate Injection 125mg/ml", salt: "Ethamsylate", ethicalBrand: "Dicynene Vet 10ml", genericOption: "Hemostop 10ml", mrpEthical: 140, mrpGeneric: 55, dose: "10 mg/kg I/M or I/V", route: "I/M or I/V", pregnancySafe: true, purpose: "Hemostatic: Stops intestinal capillary bleeding" }
        ],
        oral: [
          { name: "Amprolium 20% Powder (10 mg/kg orally daily for 5 consecutive days)" },
          { name: "Electrolytes and Kaolin drench (500 ml twice daily)" }
        ],
        ayurvedic: [{ name: "Kutajarishta & Bilwadi Churna", dose: "30ml BID" }],
        homeopathic: [{ name: "Mercurius Corrosivus 200C & Hamamelis 200C", dose: "10 drops hourly in acute bleeding" }],
        desiRemedies: [{ name: "Pomegranate rind + green bael fruit boiled in buttermilk" }]
      }
    },

    // =========================================================================
    // CATEGORY 4: METABOLIC DISEASES (29 to 36)
    // =========================================================================
    {
      id: "DIS_MILK_FEVER",
      nameHi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever / Parturient Paresis)",
      nameEn: "Milk Fever / Hypocalcemia",
      category: "METABOLIC",
      tempRange: "96.5°F - 99.5°F (Pronounced Hypothermia)",
      cardinalSigns: ["NERV_STERNAL_RECUMBENCY", "SKIN_COLD_EXTREMITIES", "RUMEN_ATONY"],
      labTests: [
        { sNo: 1, testName: "Serum Total Calcium Estimation", sampleType: "Serum", approxMrp: 180, tat: "1 Hour", confirms: "Serum Ca <6.0 mg/dl (Normal: 8.5-10.5 mg/dl)" }
      ],
      stages: [
        { stage: 1, signs: "Excitement, restlessness, muscle tremors of head and limbs, reluctance to walk, stiff hind legs.", recovery: "98% with oral calcium gel / IV", deterioration: "Recumbency within 2-4 hours" },
        { stage: 2, signs: "Sternal recumbency with characteristic 'S-shape' kink in neck turned into flank; cold muzzle, ears and horns.", recovery: "90% prompt recovery upon slow IV calcium", deterioration: "Coma and bloating" },
        { stage: 3, signs: "Lateral recumbency, flaccid paralysis, complete coma, tympany, pulse impalpable, death.", recovery: "50% guarded (risk of heart failure during infusion)", deterioration: "Fatal cardiac collapse within hours" },
        { stage: 4, signs: "Complete circulatory collapse, ruminal tympany, death.", recovery: "0%", deterioration: "Fatal termination" }
      ],
      treatment: {
        injections: [
          { name: "Calcium Borogluconate 25% + Mg + P + Dextrose (Mifex)", salt: "Calcium Borogluconate", ethicalBrand: "Mifex 450ml (Elanco)", genericOption: "Calci-Vet 450ml", mrpEthical: 310, mrpGeneric: 135, dose: "450 ml (300ml slow I/V warmed to body temp + 150ml S/C)", route: "Slow I/V under cardiac auscultation", pregnancySafe: true, purpose: "Immediately restores extracellular calcium pool" },
          { name: "Toldimphos Sodium 200mg/ml (Tonophosphan)", salt: "Toldimphos Sodium", ethicalBrand: "Tonophosphan 30ml (MSD)", genericOption: "Uro-Phos 30ml", mrpEthical: 295, mrpGeneric: 115, dose: "10-15 ml slow I/V or I/M", route: "I/V or I/M", pregnancySafe: true, purpose: "Corrects associated acute hypophosphatemia" }
        ],
        oral: [{ name: "Ionic Calcium Gel (Ostovet / Cal-Up Gel 300g orally once swallowing reflex restored)" }],
        ayurvedic: [],
        homeopathic: [{ name: "Calcarea Phosphorica 30X & Carbo Vegetabilis 200C" }],
        desiRemedies: [{ name: "Keep cow propped up in sternal position with straw bales; NEVER drench liquids while cow is down!" }]
      }
    },
    {
      id: "DIS_KETOSIS",
      nameHi: "कीटोसिस / एसीटोनेमिया (Bovine Ketosis / Acetonemia)",
      nameEn: "Bovine Ketosis",
      category: "METABOLIC",
      tempRange: "101.0°F - 102.5°F (Normal / Afebrile)",
      cardinalSigns: ["URINE_KETONE_SWEET", "DUNG_HARD_DRY_MUCUS", "NERV_CIRCLING_HEADPRESS"],
      labTests: [
        { sNo: 1, testName: "Urine Rothera's Nitroprusside Test", sampleType: "Fresh urine", approxMrp: 50, tat: "2 Mins", confirms: "Deep purple ring confirms Acetoacetic acid (>10 mg/dl)" },
        { sNo: 2, testName: "Blood Beta-hydroxybutyrate (BHB) Strip Meter", sampleType: "Whole blood droplet", approxMrp: 150, tat: "1 Min", confirms: "Blood BHB >1.4 mmol/L confirms clinical ketosis" }
      ],
      stages: [
        { stage: 1, signs: "Wasting form: Gradual loss of appetite (refuses grain, eats only dry straw); milk yield plummets.", recovery: "95% with glucose and propylene glycol", deterioration: "Rapid body fat mobilization" },
        { stage: 2, signs: "Peculiar sweet chloroform-like acetone odor in breath, milk and urine; hollow flanks, hard dung.", recovery: "85% complete recovery", deterioration: "Fatty liver degeneration" },
        { stage: 3, signs: "Nervous form: Licking own skin, chewing bars, wandering aimlessly, delirium, head pressing.", recovery: "70% with glucocorticoid cover", deterioration: "Irreversible hepatic lipidosis" },
        { stage: 4, signs: "Severe recumbency, hepatic failure, death.", recovery: "30%", deterioration: "Fatal hepatic lipidosis" }
      ],
      treatment: {
        injections: [
          { name: "Dextrose Injection 20% or 25% (Hypertonic)", salt: "Dextrose", ethicalBrand: "Dextrose 20% 1000ml (Albert David)", genericOption: "Dextrose 20% Vet", mrpEthical: 145, mrpGeneric: 58, dose: "1000-2000 ml rapid slow drip I/V", route: "Intravenous strictly", pregnancySafe: true, purpose: "Instantly suppresses hepatic gluconeogenesis and ketogenesis" },
          { name: "Isoflupredone Acetate 2mg/ml", salt: "Isoflupredone Acetate", ethicalBrand: "Isoflud 10ml (Zydus)", genericOption: "Isopred 10ml", mrpEthical: 225, mrpGeneric: 95, dose: "10-20 mg (5-10 ml) Deep I/M", route: "Deep I/M strictly", pregnancySafe: true, purpose: "Potent glucogenic action without causing abortion" }
        ],
        oral: [
          { name: "Propylene Glycol (99%) oral drench (200 ml orally BID for 2 days, then 100 ml daily for 3 days)" },
          { name: "Niacinamide (Vitamin B3) Powder (12 grams daily in feed for 10 days)" }
        ],
        ayurvedic: [],
        homeopathic: [{ name: "Nux Vomica 200C & Lycopodium 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Feed 500g boiled jaggery (Gur) + 100g mustard oil daily for 5 days" }]
      }
    },
    {
      id: "DIS_BLOAT",
      nameHi: "तीव्र आफरा / टिम्पनी (Acute Ruminal Tympany / Bloat)",
      nameEn: "Acute Ruminal Tympany / Bloat",
      category: "METABOLIC",
      tempRange: "101.5°F - 103.0°F",
      cardinalSigns: ["RUMEN_LEFT_DRUM", "RESP_OPEN_MOUTH", "RUMEN_COLIC_SIGNS"],
      labTests: [
        { sNo: 1, testName: "Stomach Tube Rumen Fluid Passage", sampleType: "Ruminal gas/fluid", approxMrp: 0, tat: "Immediate", confirms: "Free gas release confirms secondary bloat; failure to release gas confirms frothy bloat" }
      ],
      stages: [
        { stage: 1, signs: "Mild distention of left paralumbar fossa, discomfort, kicking at belly, cessation of feeding.", recovery: "95% with antifoaming drench", deterioration: "Froth accumulation" },
        { stage: 2, signs: "Left flank distended like a tight drum above level of spine, respiratory rate increases, groaning.", recovery: "80% with stomach tube and dimethicone", deterioration: "Intra-abdominal pressure spikes" },
        { stage: 3, signs: "Severe dyspnea, open-mouth breathing with tongue protruding, cyanosis of mucous membranes, staggering.", recovery: "40% emergency trocarization needed", deterioration: "Suffocation in 15-30 minutes" },
        { stage: 4, signs: "Collapse, severe anoxia, rupture of diaphragm or cardiac arrest, sudden death.", recovery: "<5%", deterioration: "Fatal asphyxiation" }
      ],
      treatment: {
        injections: [
          { name: "Spasmolytic: Dicyclomine + Paracetamol", salt: "Dicyclomine HCl + Paracetamol", ethicalBrand: "Spasmo-Vet 30ml", genericOption: "Spasmo-Vet", mrpEthical: 110, mrpGeneric: 45, dose: "10-15 ml Deep I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Relieves violent visceral ruminal and reticular spasms" }
        ],
        oral: [
          { name: "Simethicone / Dimethicone Emulsion (Bloatosil / Tympol 100ml orally in 500ml water)" },
          { name: "Pure Turpentine Oil (30-50 ml) mixed in 300 ml edible mustard oil" }
        ],
        ayurvedic: [{ name: "Hingwashtak Churna (50g) in warm water" }],
        homeopathic: [{ name: "Colocynthis 200C & Carbo Vegetabilis 200C" }],
        desiRemedies: [{ name: "EMERGENCY: Place wooden gag in mouth to stimulate salivation; puncture with Trocar & Cannula in mid-left paralumbar fossa if suffocating" }]
      }
    },
    {
      id: "DIS_DOWNER_COW",
      nameHi: "डाउ操र काउ सिंड्रोम (Downer Cow Syndrome)",
      nameEn: "Downer Cow Syndrome",
      category: "METABOLIC",
      tempRange: "100.5°F - 102.0°F",
      cardinalSigns: ["NERV_STERNAL_RECUMBENCY", "RUMEN_ATONY"],
      labTests: [
        { sNo: 1, testName: "Serum Creatine Kinase (CK) and AST", sampleType: "Serum", approxMrp: 450, tat: "2 Hours", confirms: "Massive elevation of CK (>10,000 U/L) indicates severe ischemic muscle necrosis" },
        { sNo: 2, testName: "Serum Potassium & Phosphorus", sampleType: "Serum", approxMrp: 350, tat: "2 Hours", confirms: "Identifies persistent hypokalemia or hypophosphatemia" }
      ],
      stages: [
        { stage: 1, signs: "Cow alert, eats and drinks, but unable to stand despite 2 successful calcium infusions.", recovery: "50-60% with intensive physical therapy", deterioration: "Pressure ischemic necrosis of thigh muscles" },
        { stage: 2, signs: "Crawling ('creeper cow'), hind limbs extended backward; sciatic / obturator nerve injury.", recovery: "25% with hydrotherapy/slings", deterioration: "Myoglobinuria and decubital sepsis" },
        { stage: 3, signs: "Extensive pressure bedsores on stifle and hocks, loss of alertness, mastitis, anorexia.", recovery: "10%", deterioration: "Systemic septicemia" },
        { stage: 4, signs: "Lateral recumbency, severe toxemia, terminal exhaustion, death.", recovery: "0%", deterioration: "Euthanasia recommended" }
      ],
      treatment: {
        injections: [
          { name: "Toldimphos Sodium (Tonophosphan)", salt: "Toldimphos Sodium 200mg/ml", ethicalBrand: "Tonophosphan 30ml (MSD)", genericOption: "Uro-Phos 30ml", mrpEthical: 295, mrpGeneric: 115, dose: "15 ml slow I/V daily for 5 days", route: "Slow I/V", pregnancySafe: true, purpose: "Resolves intracellular ATP depletion and hypophosphatemia" },
          { name: "Neurotropic B-Vitamins (Tribivet)", salt: "B1 + B6 + B12", ethicalBrand: "Tribivet 100ml (Intas)", genericOption: "Neuro-Vet 100ml", mrpEthical: 185, mrpGeneric: 72, dose: "10 ml I/M daily", route: "Deep I/M", pregnancySafe: true, purpose: "Regenerates compressed obturator and sciatic nerves" },
          { name: "Potassium Chloride Infusion", salt: "Potassium Chloride 15% (diluted in 5L saline)", ethicalBrand: "Potclor Ampoules", genericOption: "KCl Vet", mrpEthical: 120, mrpGeneric: 45, dose: "20-30g KCl slow IV drip over 4 hours", route: "Very slow I/V under ECG", pregnancySafe: true, purpose: "Corrects refractory downer hypokalemia" }
        ],
        oral: [{ name: "High protein drench + Oral Potassium Chloride (50g daily for 3 days)" }],
        ayurvedic: [],
        homeopathic: [{ name: "Causticum 200C & Arnica Montana 200C", dose: "10 pills TID" }],
        desiRemedies: [{ name: "Provide 1 foot deep sand/straw bedding; turn side every 3 hours; use inflatable cow-lift sling" }]
      }
    },
    {
      id: "DIS_GRASS_TETANY",
      nameHi: "घास की टिटेनी / हाइपोमैग्नीसीमिया (Grass Tetany / Hypomagnesemia)",
      nameEn: "Grass Tetany / Hypomagnesemic Tetany",
      category: "METABOLIC",
      tempRange: "103.0°F - 105.0°F (Elevated during violent convulsions)",
      cardinalSigns: ["NERV_AGGRESSION_HYDRO", "NERV_OPISTHOTONOS"],
      labTests: [
        { sNo: 1, testName: "Serum Magnesium Concentration", sampleType: "Serum", approxMrp: 200, tat: "1 Hour", confirms: "Serum Mg <1.0 mg/dl (Normal: 1.8-3.0 mg/dl)" },
        { sNo: 2, testName: "CSF Magnesium (Post-mortem)", sampleType: "CSF", approxMrp: 350, tat: "2 Hours", confirms: "CSF Mg <1.2 mg/dl confirms death from grass tetany" }
      ],
      stages: [
        { stage: 1, signs: "Restlessness, nervous ear twitching, exaggerated response to sounds, stiff unsteady gait.", recovery: "90% with subcutaneous magnesium sulfate", deterioration: "Convulsions within hours" },
        { stage: 2, signs: "Frenzied galloping, bellowing, aggression, rapid blinking, blindness, frothing.", recovery: "60% prompt I/V calcium-magnesium", deterioration: "Violent tetanic seizure" },
        { stage: 3, signs: "Sudden collapse, violent clonic-tonic convulsions, paddling limbs, severe opisthotonos, loud heart sounds.", recovery: "25% very grave", deterioration: "Respiratory paralysis" },
        { stage: 4, signs: "Coma and death from cardiac fibrillation or respiratory muscle asphyxiation.", recovery: "<5%", deterioration: "Fatal within 30-60 minutes" }
      ],
      treatment: {
        injections: [
          { name: "Magnesium Sulfate 20% + Calcium Borogluconate", salt: "Mg Sulfate + Ca Borogluconate", ethicalBrand: "Mifex 450ml (Elanco)", genericOption: "Calci-Vet 450ml", mrpEthical: 310, mrpGeneric: 135, dose: "450 ml slow I/V over 20 minutes under heart monitoring", route: "Slow I/V", pregnancySafe: true, purpose: "Restores neuromuscular membrane stability" },
          { name: "Magnesium Sulfate 25% Subcutaneous", salt: "Magnesium Sulfate Sterile Sol.", ethicalBrand: "MgSO4 25% 200ml", genericOption: "MgSO4 Vet", mrpEthical: 120, mrpGeneric: 50, dose: "200-300 ml Subcutaneous (S/C) at multiple sites", route: "Subcutaneous", pregnancySafe: true, purpose: "Provides sustained release of magnesium" },
          { name: "Diazepam 5mg/ml", salt: "Diazepam", ethicalBrand: "Calmpose 2ml (Ranbaxy)", genericOption: "Diazepam Vet", mrpEthical: 65, mrpGeneric: 25, dose: "0.2-0.5 mg/kg slow I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Controls violent convulsive seizures" }
        ],
        oral: [{ name: "Magnesium Oxide (Causmag) 50g daily in concentrate feed as preventative" }],
        ayurvedic: [],
        homeopathic: [{ name: "Magnesium Phosphoricum 30X & Cuprum Metallicum 200C" }],
        desiRemedies: [{ name: "Avoid grazing on lush, heavily fertilized green pastures in early spring without roughage" }]
      }
    },
    {
      id: "DIS_PPH",
      nameHi: "ब्याने के बाद लाल पेशाब / पीपीएच (Post-Parturient Hemoglobinuria)",
      nameEn: "Post-Parturient Hemoglobinuria (PPH)",
      category: "METABOLIC",
      tempRange: "101.5°F - 102.5°F (Normal / Afebrile)",
      cardinalSigns: ["URINE_COFFEE_RED", "EYE_PALLOR"],
      labTests: [
        { sNo: 1, testName: "Serum Inorganic Phosphorus Estimation", sampleType: "Serum", approxMrp: 180, tat: "1 Hour", confirms: "Extreme hypophosphatemia (<1.5 mg/dl, normal: 4.5-7.0 mg/dl)" },
        { sNo: 2, testName: "Blood Smear for Blood Protozoa", sampleType: "Peripheral ear vein blood", approxMrp: 150, tat: "20 Mins", confirms: "Negative for Babesia (rules out tick red water)" }
      ],
      stages: [
        { stage: 1, signs: "Occurs 2-4 weeks post-calving (especially high-yielding buffaloes): Anorexia, milk drop, mild pallor.", recovery: "95% with immediate intravenous phosphorus", deterioration: "Massive RBC lysis" },
        { stage: 2, signs: "Urine turns dark brown, coffee-colored or port-wine (Hemoglobinuria); tachycardia, extreme pallor of eyes.", recovery: "75% with supportive hematinics", deterioration: "Anemic anoxia" },
        { stage: 3, signs: "Severe anemia (PCV <10%), dyspnea, jaundice, weak thready pulse, sternal recumbency.", recovery: "30% requires blood transfusion", deterioration: "Cardiac failure" },
        { stage: 4, signs: "Prostration, severe hypothermia, death from anemic anoxia.", recovery: "<5%", deterioration: "Fatal anoxia within 24-48 hours" }
      ],
      treatment: {
        injections: [
          { name: "Sodium Acid Phosphate 40.3% w/v (Urimin)", salt: "Sodium Acid Phosphate", ethicalBrand: "Urimin 100ml (Virbac)", genericOption: "Phos-Vet 100ml", mrpEthical: 260, mrpGeneric: 110, dose: "60-80g (150-200ml) slow I/V in 1L saline, repeat in 12h", route: "Slow I/V and S/C", pregnancySafe: true, purpose: "Restores erythrocyte ATP and halts acute intravascular hemolysis" },
          { name: "Toldimphos Sodium 200mg/ml (Tonophosphan)", salt: "Toldimphos Sodium", ethicalBrand: "Tonophosphan 30ml (MSD)", genericOption: "Uro-Phos 30ml", mrpEthical: 295, mrpGeneric: 115, dose: "15-20 ml Deep I/M daily for 3 days", route: "Deep I/M", pregnancySafe: true, purpose: "Sustained organic phosphorus replenishment" },
          { name: "Copper Glycinate Injection", salt: "Copper Glycinate 100mg", ethicalBrand: "Cuprate 2ml", genericOption: "Copper-Vet", mrpEthical: 120, mrpGeneric: 50, dose: "2 ml S/C single shot", route: "Subcutaneous", pregnancySafe: true, purpose: "Corrects associated molybdenum-induced hypocuprosis" }
        ],
        oral: [{ name: "Dicalcium Phosphate (DCP) Powder (100g orally twice daily for 7 days)" }],
        ayurvedic: [],
        homeopathic: [{ name: "Phosphorus 200C & Ferrum Phosphoricum 30X", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Stop feeding cruciferous plants (cabbage, mustard, raya, turnip leaves) which contain hemolytic S-methylcysteine sulfoxide" }]
      }
    },
    {
      id: "DIS_ACIDOSIS",
      nameHi: "रूमेन एसिडोसिस / दाना अपच (Acute Ruminal Lactic Acidosis)",
      nameEn: "Acute Ruminal Lactic Acidosis / Grain Overload",
      category: "METABOLIC",
      tempRange: "98.0°F - 101.0°F (Normal to Subnormal)",
      cardinalSigns: ["RUMEN_FLUID_SPLASH", "RUMEN_ATONY", "DUNG_WATERY_FOUL"],
      labTests: [
        { sNo: 1, testName: "Rumen Fluid pH Measurement", sampleType: "Aspirated rumen liquor", approxMrp: 20, tat: "1 Min", confirms: "Rumen pH <5.0 confirms severe lactic acidosis (Normal: 6.2-6.8)" },
        { sNo: 2, testName: "Microscopic Rumen Protozoal Motility", sampleType: "Rumen liquor", approxMrp: 50, tat: "10 Mins", confirms: "Total death/absence of ciliate protozoa" }
      ],
      stages: [
        { stage: 1, signs: "Ingestion of massive quantity of grain/flour 6-12h prior; restless, off-feed, mild colic, full rumen.", recovery: "90% with oral antacids and gastric lavage", deterioration: "Lactate fermentation accelerates" },
        { stage: 2, signs: "Severe depression, staggering gait, complete rumen atony with fluid splashing sound, watery sweet-sour diarrhea.", recovery: "70% with systemic alkalinizers", deterioration: "Severe dehydration and hyperosmolality" },
        { stage: 3, signs: "Sternal recumbency mimicking milk fever, sunken eyes (>8% dehydration), severe groaning, anuria.", recovery: "30% requires rumenotomy / intensive IV buffers", deterioration: "Chemical rumenitis and mycotic invasion" },
        { stage: 4, signs: "Coma, profound hypothermia (<97°F), total circulatory collapse, death.", recovery: "<5%", deterioration: "Fatal within 24-48 hours" }
      ],
      treatment: {
        injections: [
          { name: "Sodium Bicarbonate 7.5% Hypertonic", salt: "Sodium Bicarbonate 7.5% w/v", ethicalBrand: "Sodabicarb 7.5% 500ml (Zydus)", genericOption: "Sodium Bicarb 500ml", mrpEthical: 175, mrpGeneric: 72, dose: "1000-2000 ml slow I/V drip", route: "Slow I/V strictly", pregnancySafe: true, purpose: "Directly neutralizes systemic D-lactic metabolic acidosis" },
          { name: "Thiamine HCl (Vitamin B1)", salt: "Thiamine HCl 100mg/ml", ethicalBrand: "Tribivet 100ml (Intas)", genericOption: "B1-Vet 100ml", mrpEthical: 185, mrpGeneric: 72, dose: "10-20 mg/kg I/M or I/V", route: "I/M or I/V", pregnancySafe: true, purpose: "Cofactor for lactate metabolism; prevents polioencephalomalacia" },
          { name: "Flunixin Meglumine", salt: "Flunixin Meglumine 50mg/ml", ethicalBrand: "Megludyne 50ml (Virbac)", genericOption: "Flunivet 50ml", mrpEthical: 510, mrpGeneric: 210, dose: "2.2 mg/kg I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Protects against systemic endotoxemia from dying Gram-negative bacteria" }
        ],
        oral: [
          { name: "Magnesium Hydroxide / Magnesium Carbonate (300-500g in 5L warm water via stomach tube)" },
          { name: "Activated Charcoal (500g) as toxin adsorbent" }
        ],
        ayurvedic: [],
        homeopathic: [{ name: "Nux Vomica 200C & Carbo Vegetabilis 200C", dose: "10 drops hourly" }],
        desiRemedies: [{ name: "Rumenotomy to manually evacuate grain; or siphon out rumen contents and cud-transplant 5L fresh rumen liquor from healthy cow" }]
      }
    },
    {
      id: "DIS_PICA",
      nameHi: "पाइका / अखाद्य चीजें खाना (Pica / Allophagia)",
      nameEn: "Pica / Phosphorus Deficiency",
      category: "METABOLIC",
      tempRange: "101.0°F - 102.5°F (Normal / Afebrile)",
      cardinalSigns: ["DUNG_HARD_DRY_MUCUS"],
      labTests: [
        { sNo: 1, testName: "Serum Inorganic Phosphorus", sampleType: "Serum", approxMrp: 180, tat: "1 Hour", confirms: "Serum P <3.5 mg/dl" },
        { sNo: 2, testName: "Fecal Egg Count (FEC)", sampleType: "Feces", approxMrp: 100, tat: "30 Mins", confirms: "Rules out concurrent heavy gastrointestinal parasitism" }
      ],
      stages: [
        { stage: 1, signs: "Depraved appetite: Licking walls, mangers, soil; chewing wood, bones, leather, plastic bags.", recovery: "98% with mineral balancing and deworming", deterioration: "Foreign body ingestion" },
        { stage: 2, signs: "Rough hair coat, stiff gait, crepitus in joints ('osteomalacia'), drop in milk yield, anoestrus.", recovery: "85% with phosphorus supplementation", deterioration: "Reticular impaction with plastics" },
        { stage: 3, signs: "Chronic unthriftiness, spontaneous bone fractures, rumen impaction with plastic/cloth (Bezoars).", recovery: "40% surgical rumenotomy needed", deterioration: "Complete rumen blockage" },
        { stage: 4, signs: "Severe cachexia, starvation, botulism toxicity from chewing decomposing bones, death.", recovery: "10%", deterioration: "Fatal botulism or impaction" }
      ],
      treatment: {
        injections: [
          { name: "Toldimphos Sodium 200mg/ml (Tonophosphan)", salt: "Toldimphos Sodium", ethicalBrand: "Tonophosphan 30ml (MSD)", genericOption: "Uro-Phos 30ml", mrpEthical: 295, mrpGeneric: 115, dose: "10-15 ml Deep I/M every alternate day (5 doses)", route: "Deep I/M", pregnancySafe: true, purpose: "Rapid organic phosphorus saturation" },
          { name: "Vitamin A, D3, E Injection", salt: "Vit A, D3, E", ethicalBrand: "Intavita NH (Intas)", genericOption: "ADE-Vet 10ml", mrpEthical: 160, mrpGeneric: 65, dose: "5 ml Deep I/M once weekly", route: "Deep I/M", pregnancySafe: true, purpose: "Optimizes bone mineral remodeling and calcium-phosphorus utilization" }
        ],
        oral: [
          { name: "Chelated Mineral Mixture (Agrimin Forte / Minfa Gold 50g daily in feed permanently)" },
          { name: "Dicalcium Phosphate (DCP) (50g daily) + Common Salt (30g daily)" }
        ],
        ayurvedic: [],
        homeopathic: [{ name: "Calcarea Phosphorica 30X & Alumina 200C", dose: "10 pills BID" }],
        desiRemedies: [{ name: "Broad-spectrum deworming with Albendazole/Ivermectin; keep garbage and plastics away from pens" }]
      }
    },

    // =========================================================================
    // CATEGORY 5: TOXICOLOGY & POISONING (37 to 41)
    // =========================================================================
    {
      id: "DIS_CYANIDE",
      nameHi: "जहरीली ज्वार विषाक्तता (HCN / Cyanide Poisoning)",
      nameEn: "Hydrocyanic Acid (HCN) / Cyanide Poisoning",
      category: "TOXICOLOGY",
      tempRange: "101.0°F - 102.5°F (Normal to Subnormal)",
      cardinalSigns: ["RESP_OPEN_MOUTH", "RESP_FROTHY_DISCHARGE", "NERV_OPISTHOTONOS"],
      labTests: [
        { sNo: 1, testName: "Picrate Paper Strip Test", sampleType: "Rumen contents / Suspect Sorghum plant", approxMrp: 50, tat: "10 Mins", confirms: "Yellow sodium picrate paper turns brick-red within 5 mins confirms free HCN" }
      ],
      stages: [
        { stage: 1, signs: "Occurs within 10-20 mins of grazing young drought-stressed Sorghum (Jowar <2ft tall): Tremors, excitement.", recovery: "90% with immediate specific antidotes", deterioration: "Cellular anoxia within minutes" },
        { stage: 2, signs: "Severe air hunger, deep rapid open-mouth gasping, frothing at lips, bright 'cherry-red' mucous membranes.", recovery: "60% prompt IV antidotes", deterioration: "Inhibition of cytochrome oxidase" },
        { stage: 3, signs: "Violent convulsions, animal falls on side, dilated pupils, opisthotonos, involuntary urination and defecation.", recovery: "20% very grave", deterioration: "Cellular histotoxic anoxia" },
        { stage: 4, signs: "Coma, respiratory failure, cardiac arrest; venous blood remains bright cherry-red upon post-mortem.", recovery: "<2%", deterioration: "Death in 15-45 minutes" }
      ],
      treatment: {
        injections: [
          { name: "Sodium Nitrite 3% w/v", salt: "Sodium Nitrite", ethicalBrand: "Cyanidote-1 100ml", genericOption: "Sodi-Nitrite 3%", mrpEthical: 210, mrpGeneric: 90, dose: "3 grams in 100 ml sterile water (approx 10-20 mg/kg) slow I/V", route: "Slow I/V strictly", pregnancySafe: true, purpose: "Converts hemoglobin to methemoglobin, which binds free cyanide to form cyanomethemoglobin" },
          { name: "Sodium Thiosulfate 20% w/v", salt: "Sodium Thiosulfate", ethicalBrand: "Cyanidote-2 250ml", genericOption: "Sodi-Thiosulfate 20%", mrpEthical: 250, mrpGeneric: 110, dose: "30-40 grams in 200 ml water (approx 500 mg/kg) slow I/V immediately following nitrite", route: "Slow I/V", pregnancySafe: true, purpose: "Enzyme rhodanese converts cyanomethemoglobin to non-toxic thiocyanate excreted in urine" }
        ],
        oral: [{ name: "Drench 1 kg Jaggery (Gur) in 2L water to bind unabsorbed glucosides in rumen" }],
        ayurvedic: [],
        homeopathic: [{ name: "Hydrocyanic Acid 30C & Camphora 200C" }],
        desiRemedies: [{ name: "NEVER feed sorghum (chari) under 2-3 feet height, stunted by drought, or immediately after first rains" }]
      }
    },
    {
      id: "DIS_UREA_TOX",
      nameHi: "यूरिया विषाक्तता (Urea / NPN Toxicity)",
      nameEn: "Urea / Non-Protein Nitrogen (NPN) Toxicosis",
      category: "TOXICOLOGY",
      tempRange: "101.5°F - 103.5°F",
      cardinalSigns: ["RESP_FROTHY_DISCHARGE", "NERV_OPISTHOTONOS", "RUMEN_LEFT_DRUM"],
      labTests: [
        { sNo: 1, testName: "Rumen Fluid pH Measurement", sampleType: "Aspirated rumen fluid", approxMrp: 20, tat: "1 Min", confirms: "Rumen pH >8.0 and strong ammonia odor pathognomonic for urea toxicity" },
        { sNo: 2, testName: "Blood Ammonia Level", sampleType: "Whole blood in heparin on ice", approxMrp: 400, tat: "1 Hour", confirms: "Blood ammonia >1.0 mg/dl" }
      ],
      stages: [
        { stage: 1, signs: "Occurs 20-40 mins after accidental urea fertilizer ingestion: Uneasiness, muscle tremors of face and neck.", recovery: "80% with immediate large-volume cold water & vinegar", deterioration: "Ammonia absorption spikes" },
        { stage: 2, signs: "Excessive salivation, tooth grinding, severe bloat, violent abdominal pain, kicking at belly, incoordination.", recovery: "50% prompt acidification", deterioration: "Hyperammonemic encephalopathy" },
        { stage: 3, signs: "Severe dyspnea, violent tetanic spasms, violent struggling, animal falls on side, shivering, bellowing.", recovery: "15% very grave", deterioration: "Circulatory collapse" },
        { stage: 4, signs: "Terminal convulsions, pulmonary edema, cardiac arrest and death within 1 to 3 hours.", recovery: "<2%", deterioration: "Fatal within 1-3 hours" }
      ],
      treatment: {
        injections: [
          { name: "Normal Saline (0.9% NaCl)", salt: "Normal Saline 1000ml", ethicalBrand: "NS Vet 1000ml", genericOption: "NS Infusion", mrpEthical: 90, mrpGeneric: 40, dose: "3-5 Liters I/V drip", route: "Rapid I/V", pregnancySafe: true, purpose: "Promotes renal clearance of ammonium ions" },
          { name: "Diazepam Injection 5mg/ml", salt: "Diazepam", ethicalBrand: "Calmpose 2ml (Ranbaxy)", genericOption: "Diazepam Vet", mrpEthical: 65, mrpGeneric: 25, dose: "0.2-0.5 mg/kg slow I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Controls violent muscular spasms" }
        ],
        oral: [
          { name: "Household Vinegar (5% Acetic acid) (2 to 3 Liters) diluted in 10-20 Liters of ice-cold water drenched via stomach tube immediately (lowers rumen pH to <7.0 to convert absorbable NH3 into unabsorbable NH4+ ions)" }
        ],
        ayurvedic: [],
        homeopathic: [],
        desiRemedies: [{ name: "Immediately pump 20-30 liters of cold water into rumen to dilute ammonia and slow down urease enzyme" }]
      }
    },
    {
      id: "DIS_NITRATE_TOX",
      nameHi: "नाइट्रेट विषाक्तता (Nitrate & Nitrite Poisoning)",
      nameEn: "Nitrate and Nitrite Poisoning",
      category: "TOXICOLOGY",
      tempRange: "100.5°F - 102.5°F (Normal to Subnormal)",
      cardinalSigns: ["RESP_OPEN_MOUTH", "RESP_FROTHY_DISCHARGE", "EYE_PALLOR"],
      labTests: [
        { sNo: 1, testName: "Diphenylamine Field Test", sampleType: "Maternal serum / Aqueous humor / Suspect plant", approxMrp: 50, tat: "5 Mins", confirms: "Intense deep blue color confirms nitrate/nitrite presence" },
        { sNo: 2, testName: "Blood Chocolate-Brown Color Inspection", sampleType: "Venous blood exposed to air", approxMrp: 0, tat: "Immediate", confirms: "Blood remains dark chocolate-brown (Methemoglobin) and fails to turn red on oxygenation" }
      ],
      stages: [
        { stage: 1, signs: "Occurs after feeding heavily nitrogenous fertilized green oats/maize: Accelerated respiration, weakness.", recovery: "90% with Methylene Blue", deterioration: "Methemoglobinemia reaches >50%" },
        { stage: 2, signs: "Severe air hunger, open-mouth panting, dark muddy/chocolate-brown mucous membranes, rapid weak pulse.", recovery: "70% immediate IV antidote", deterioration: "Tissue anoxia" },
        { stage: 3, signs: "Staggering gait, tremors, subnormal temperature, recumbency, abortions in pregnant animals.", recovery: "25% very grave", deterioration: "Anoxic asphyxiation" },
        { stage: 4, signs: "Coma, convulsions, respiratory arrest, death within 1 to 4 hours.", recovery: "<2%", deterioration: "Fatal methemoglobinemia" }
      ],
      treatment: {
        injections: [
          { name: "Methylene Blue 1% Solution", salt: "Methylene Blue Sterile Inj.", ethicalBrand: "Methylene Blue 1% 100ml", genericOption: "M-Blue Vet 1%", mrpEthical: 280, mrpGeneric: 120, dose: "4 to 9 mg/kg (Approx 100-200 ml of 1% sol per adult cow) slow I/V", route: "Slow I/V strictly (Do not extravasate)", pregnancySafe: true, purpose: "Activates methemoglobin reductase enzyme to convert chocolate methemoglobin back to functioning hemoglobin" },
          { name: "Ascorbic Acid (Vitamin C) Injection", salt: "Ascorbic Acid 250mg/ml", ethicalBrand: "Ascovet 30ml", genericOption: "Vit-C Vet", mrpEthical: 140, mrpGeneric: 60, dose: "10-20 ml slow I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Secondary chemical reducing agent" }
        ],
        oral: [{ name: "Drench 500g Mineral oil / Liquid paraffin to coat intestinal wall and reduce further nitrate absorption" }],
        ayurvedic: [],
        homeopathic: [],
        desiRemedies: [{ name: "Avoid grazing crops stressed by drought or overcast cloudy days that accumulate excessive nitrates" }]
      }
    },
    {
      id: "DIS_ORGANOPHOSPHATE",
      nameHi: "कीटनाशक / ओ.पी. विषाक्तता (Organophosphate Poisoning)",
      nameEn: "Organophosphate & Carbamate Toxicity",
      category: "TOXICOLOGY",
      tempRange: "101.0°F - 103.0°F",
      cardinalSigns: ["RESP_FROTHY_DISCHARGE", "DUNG_WATERY_FOUL", "NERV_OPISTHOTONOS"],
      labTests: [
        { sNo: 1, testName: "Whole Blood Cholinesterase (AChE) Assay", sampleType: "Whole blood in heparin", approxMrp: 600, tat: "2 Hours", confirms: "Inhibition of AChE >75% diagnostic for organophosphate poisoning" }
      ],
      stages: [
        { stage: 1, signs: "Muscarinic signs appear rapidly (SLUDGE): Salivation, Lacrimation, Urination, Defecation, GI cramping.", recovery: "90% with aggressive atropinization", deterioration: "Nicotinic hyperstimulation" },
        { stage: 2, signs: "Severe miosis (pin-point pupils), continuous watery diarrhea, tenesmus, loud tracheal rales, muscle fasciculations.", recovery: "70% with Atropine + 2-PAM", deterioration: "Bronchoconstriction and pulmonary edema" },
        { stage: 3, signs: "Nicotinic signs: Generalized muscular twitching, weakness, sawhorse posture, cyanosis, open-mouth panting.", recovery: "30% guarded", deterioration: "Diaphragmatic muscle paralysis" },
        { stage: 4, signs: "Central nervous respiratory center depression, asphyxiation due to drowned lungs (bronchorrhea), death.", recovery: "<5%", deterioration: "Fatal within 1-6 hours" }
      ],
      treatment: {
        injections: [
          { name: "Atropine Sulfate Injection 1mg/ml", salt: "Atropine Sulfate", ethicalBrand: "Atro-Vet 100ml (Harson)", genericOption: "Atropine 100ml", mrpEthical: 98, mrpGeneric: 38, dose: "0.2 to 0.5 mg/kg (Give 1/4th dose slow I/V until pupils dilate and salivation stops; give 3/4th dose S/C. Repeat every 30-60 mins as needed)", route: "1/4 I/V, 3/4 S/C", pregnancySafe: true, purpose: "Blocks muscarinic acetylcholine receptors to halt fatal bronchorrhea and bradycardia" },
          { name: "Pralidoxime Chloride (2-PAM)", salt: "Pralidoxime Chloride 1g vial", ethicalBrand: "Neopam 1g (Neon)", genericOption: "PAM-Vet 1g", mrpEthical: 450, mrpGeneric: 210, dose: "20 to 40 mg/kg slow I/V infusion in 500ml normal saline (Must give within 24h before enzyme aging occurs)", route: "Slow I/V infusion", pregnancySafe: true, purpose: "Reactivates phosphorylated acetylcholinesterase enzyme at neuromuscular junctions" }
        ],
        oral: [{ name: "Activated Charcoal (500g in 2L water) orally to bind ingested pesticide in gut" }],
        ayurvedic: [],
        homeopathic: [{ name: "Belladonna 200C & Nux Vomica 200C" }],
        desiRemedies: [{ name: "Wash animal body with alkaline soap and cold water if poisoning was due to dermal pour-on/dip" }]
      }
    },
    {
      id: "DIS_SNAKE_BITE",
      nameHi: "सर्पदंश / सांप का काटना (Snake Bite Envenomation)",
      nameEn: "Snake Bite Envenomation",
      category: "TOXICOLOGY",
      tempRange: "100.5°F - 103.0°F",
      cardinalSigns: ["RESP_FROTHY_DISCHARGE", "SKIN_PETECHIAE", "NERV_POSTERIOR_PARALYSIS"],
      labTests: [
        { sNo: 1, testName: "20-Minute Whole Blood Clotting Test (20WBCT)", sampleType: "Fresh whole blood in clean dry glass tube", approxMrp: 20, tat: "20 Mins", confirms: "Failure of blood to clot after 20 mins confirms Viperine hemotoxic venom" }
      ],
      stages: [
        { stage: 1, signs: "Sudden onset: Two puncture fang marks seen on muzzle or leg; rapid painful swelling and bleeding.", recovery: "80% with polyvalent anti-snake venom", deterioration: "Systemic venom dissemination" },
        { stage: 2, signs: "Viper bite: Massive hemorrhagic swelling, continuous oozing of uncoagulated blood from bite; Cobra: Drooling, ptosis.", recovery: "50% with intensive ICU care", deterioration: "Coagulopathy or neuro-paralysis" },
        { stage: 3, signs: "Hematuria, epistaxis (bleeding from nose), flaccid tongue paralysis, respiratory dyspnea, recumbency.", recovery: "25% very grave", deterioration: "Respiratory or renal failure" },
        { stage: 4, signs: "Asphyxiation from ascending paralysis (Elapid) or generalized hypovolemic shock (Viper), death.", recovery: "<5%", deterioration: "Fatal within 1-12 hours" }
      ],
      treatment: {
        injections: [
          { name: "Lyophilized Polyvalent Anti-Snake Venom Serum (ASVS)", salt: "Equine Anti-Snake Venom (Cobra, Krait, Russell's Viper, Saw-scaled Viper)", ethicalBrand: "ASVS 10ml vial (Serum Institute / Bharat Serums)", genericOption: "Polyvalent ASVS", mrpEthical: 950, mrpGeneric: 650, dose: "2 to 4 vials reconstituted in 500ml Normal Saline given slow I/V drip; repeat in 4 hours if bleeding persists", route: "Slow I/V drip", pregnancySafe: true, purpose: "Neutralizes circulating free venom toxins" },
          { name: "Dexamethasone Sodium Phosphate", salt: "Dexamethasone 4.4mg/ml", ethicalBrand: "Dexona Vet 100ml (Zydus)", genericOption: "Dexavet 100ml", mrpEthical: 125, mrpGeneric: 48, dose: "0.1 mg/kg I/V", route: "I/V", pregnancySafe: false, purpose: "Prevents acute anaphylaxis to horse serum and reduces muzzle swelling" },
          { name: "Neostigmine Methylsulfate (For Cobra bites)", salt: "Neostigmine 0.5mg/ml", ethicalBrand: "Neostigmine Ampoules", genericOption: "Neostig-Vet", mrpEthical: 75, mrpGeneric: 30, dose: "0.04 mg/kg S/C every 2 hours with Atropine", route: "Subcutaneous", pregnancySafe: true, purpose: "Reverses curare-like postsynaptic neurotoxicity" },
          { name: "Tetanus Toxoid 5ml", salt: "Tetanus Toxoid", ethicalBrand: "Toxoid Inj", genericOption: "TT Vet", mrpEthical: 40, mrpGeneric: 15, dose: "5 ml I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Prophylaxis against clostridial spores in snake fangs" }
        ],
        oral: [],
        ayurvedic: [],
        homeopathic: [{ name: "Lachesis 200C & Crotalus Horridus 200C", dose: "10 drops every 15 minutes" }],
        desiRemedies: [{ name: "Do NOT tie tight tourniquet; do not make incisions; keep animal completely calm to prevent rapid venom circulation" }]
      }
    },

    // =========================================================================
    // CATEGORY 6: GYNECOLOGICAL & OBSTETRIC CONDITIONS (42 to 46)
    // =========================================================================
    {
      id: "DIS_PROLAPSE",
      nameHi: "बच्चेदानी / फूल बाहर आना (Uterine & Vaginal Prolapse)",
      nameEn: "Uterine and Vaginal Prolapse",
      category: "GYNAE",
      tempRange: "101.5°F - 103.5°F",
      cardinalSigns: ["NERV_STERNAL_RECUMBENCY"],
      labTests: [
        { sNo: 1, testName: "Visual & Digital Cervical / Cotyledon Inspection", sampleType: "Externalized reproductive mass", approxMrp: 0, tat: "Immediate", confirms: "Presence of doughnut-shaped cotyledons confirms uterine prolapse vs smooth vaginal eversion" }
      ],
      stages: [
        { stage: 1, signs: "First degree vaginal prolapse: Intermittent protrusion of pink vaginal mucosa only while lying down.", recovery: "95% with posterior elevation and mineral therapy", deterioration: "Mass becomes permanently exteriorized" },
        { stage: 2, signs: "Second degree: Vaginal wall and cervix permanently outside vulva, edematous, dry, contaminated with dung.", recovery: "85% with manual reduction and Buhner retention suture", deterioration: "Urinary bladder entrapment" },
        { stage: 3, signs: "Complete Uterine Prolapse: Entire gravid uterine horn inside-out hanging to hocks with attached cotyledons; heavy bleeding.", recovery: "60% with epidural anesthesia and sterile reduction", deterioration: "Vascular rupture and shock" },
        { stage: 4, signs: "Uterine gangrene, laceration of uterine artery, internal fatal hemorrhage, hypovolemic shock, death.", recovery: "<15%", deterioration: "Fatal hemorrhage within hours" }
      ],
      treatment: {
        injections: [
          { name: "Lignocaine HCl 2% (Epidural Anesthesia)", salt: "Lignocaine HCl 20mg/ml", ethicalBrand: "Xylocaine 2% 30ml (Zydus)", genericOption: "Ligno-Vet 2%", mrpEthical: 65, mrpGeneric: 28, dose: "5 to 8 ml in 1st intercoccygeal space", route: "Epidural strictly", pregnancySafe: true, purpose: "Abolishes violent expulsive abdominal straining to allow manual repositioning" },
          { name: "Calcium Borogluconate 25% (Mifex)", salt: "Calcium Borogluconate", ethicalBrand: "Mifex 450ml (Elanco)", genericOption: "Calci-Vet 450ml", mrpEthical: 310, mrpGeneric: 135, dose: "450 ml slow I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Restores myometrial tone to prevent recurrence" },
          { name: "Ceftriaxone + Tazobactam 3375mg", salt: "Ceftriaxone + Tazobactam", ethicalBrand: "Intacef Tazo 3.375g (Intas)", genericOption: "Tazo-Ceff 3.375g", mrpEthical: 495, mrpGeneric: 195, dose: "10 mg/kg I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Prevents septic peritonitis from contaminated endometrium" }
        ],
        oral: [{ name: "Chelated Calcium + Phosphorus tonic (500ml daily for 5 days)" }],
        ayurvedic: [],
        homeopathic: [{ name: "Sepia 200C & Podophyllum 200C", dose: "10 pills TID" }],
        desiRemedies: [{ name: "Wash organ with cold 1% Alum water and apply pure sugar or ice bags to rapidly reduce severe edema before manual reduction" }]
      }
    },
    {
      id: "DIS_ROP",
      nameHi: "जेर का रुकना (Retention of Placenta / ROP)",
      nameEn: "Retention of Fetal Membranes / ROP",
      category: "GYNAE",
      tempRange: "101.5°F - 104.0°F",
      cardinalSigns: ["URINE_TURBID_PUS"],
      labTests: [
        { sNo: 1, testName: "Visual / Manual Examination at 12 Hours Postpartum", sampleType: "Vaginal speculum / Vulvar inspection", approxMrp: 0, tat: "Immediate", confirms: "Placenta unexpelled >12 hours after fetal delivery confirms ROP" }
      ],
      stages: [
        { stage: 1, signs: "Membranes hanging from vulva 8-12 hours postpartum; no systemic illness; cow ruminating normally.", recovery: "90% with ecbolics and herbal uterine tonics", deterioration: "Decomposition begins" },
        { stage: 2, signs: "12-24 hours: Putrefaction begins, foul reddish-brown liquid draining down hocks, tail switching, mild fever.", recovery: "80% with systemic antibiotic cover", deterioration: "Septic metritis develops" },
        { stage: 3, signs: "24-48 hours: Severe putrid odor, flies attracted, anorexia, drop in milk yield, fever (104°F), tenesmus.", recovery: "60% resolution of infection", deterioration: "Septicemia and endotoxemia" },
        { stage: 4, signs: "Acute septic metritis with toxemia, peritonitis, laminitis, chronic subfertility or death.", recovery: "30%", deterioration: "Permanent sterility" }
      ],
      treatment: {
        injections: [
          { name: "Ceftiofur Sodium 1g", salt: "Ceftiofur Sodium", ethicalBrand: "Xyrofur 1g (Intas)", genericOption: "Ceftio-Vet 1g", mrpEthical: 440, mrpGeneric: 185, dose: "1-2 mg/kg I/M daily for 3 days", route: "Deep I/M", pregnancySafe: true, purpose: "Systemic broad-spectrum antibiotic to prevent metritis and septicemia" },
          { name: "Flunixin Meglumine", salt: "Flunixin Meglumine 50mg/ml", ethicalBrand: "Megludyne 50ml (Virbac)", genericOption: "Flunivet 50ml", mrpEthical: 510, mrpGeneric: 210, dose: "2.2 mg/kg I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Relieves toxic shock and uterine inflammation" }
        ],
        oral: [{ name: "Herbal Uterine Ecbolic Drench (Exapar / Uterotone 100ml BID for 5 days)" }],
        ayurvedic: [{ name: "Bamboo leaves (500g) + Ajwain (50g) + Jaggery (400g) boiled decoction" }],
        homeopathic: [{ name: "Secale Cornutum 200C & Pulsatilla 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "NEVER forcefully pull placenta by hand; manual removal damages cotyledons and leads to permanent sterility" }]
      }
    },
    {
      id: "DIS_DYSTOCIA",
      nameHi: "ब्याने में रुकावट / बच्चा फंसना (Bovine Dystocia)",
      nameEn: "Bovine Dystocia / Difficult Calving",
      category: "GYNAE",
      tempRange: "101.5°F - 103.0°F",
      cardinalSigns: ["NERV_STERNAL_RECUMBENCY"],
      labTests: [
        { sNo: 1, testName: "Per-Vaginal Obstetrical Examination", sampleType: "Birth canal inspection", approxMrp: 0, tat: "Immediate", confirms: "Identifies presentation, position, posture, fetal viability, or pelvic stenosis" }
      ],
      stages: [
        { stage: 1, signs: "Water bag ruptured >2 hours ago, regular severe straining but no fetal parts appearing at vulva.", recovery: "95% calf and dam survival with prompt correction", deterioration: "Uterine inertia and dryness" },
        { stage: 2, signs: "Fetal head or limbs wedged in pelvic canal; dry birth canal, maternal exhaustion, tachycardia.", recovery: "75% with traction under epidural and lubrication", deterioration: "Fetal death within 2-4 hours" },
        { stage: 3, signs: "Fetus dead, emphysematous, swollen; uterus tightly contracted around fetus; dam recumbent.", recovery: "40% dam survival (Fetotomy / C-Section)", deterioration: "Uterine rupture and septic shock" },
        { stage: 4, signs: "Uterine tear, evisceration of intestines, fatal internal hemorrhage, septic peritonitis, death.", recovery: "<5%", deterioration: "Fatal termination" }
      ],
      treatment: {
        injections: [
          { name: "Lignocaine 2% Epidural", salt: "Lignocaine HCl 20mg/ml", ethicalBrand: "Xylocaine 2% 30ml", genericOption: "Ligno-Vet 2%", mrpEthical: 65, mrpGeneric: 28, dose: "5 to 7 ml in 1st intercoccygeal space", route: "Epidural", pregnancySafe: true, purpose: "Stops straining to permit safe obstetrical mutation and retropulsion" },
          { name: "Ceftriaxone + Tazobactam 3375mg", salt: "Ceftriaxone + Tazobactam", ethicalBrand: "Intacef Tazo 3.375g (Intas)", genericOption: "Tazo-Ceff 3.375g", mrpEthical: 495, mrpGeneric: 195, dose: "10 mg/kg I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Covers genital tract trauma and prevents metritis" },
          { name: "Flunixin Meglumine", salt: "Flunixin Meglumine 50mg/ml", ethicalBrand: "Megludyne 50ml (Virbac)", genericOption: "Flunivet 50ml", mrpEthical: 510, mrpGeneric: 210, dose: "2.2 mg/kg I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Relieves severe maternal pain and soft tissue trauma" }
        ],
        oral: [],
        ayurvedic: [],
        homeopathic: [{ name: "Caulophyllum 200C & Pulsatilla 200C", dose: "10 pills hourly to aid cervical dilation" }],
        desiRemedies: [{ name: "Pump 5 to 10 liters of warm sterile liquid paraffin or boiled carboxymethylcellulose (CMC) into uterus for lubrication" }]
      }
    },
    {
      id: "DIS_METRITIS",
      nameHi: "गर्भाशय शोथ (Acute Septic Metritis & Endometritis)",
      nameEn: "Acute Septic Metritis and Endometritis",
      category: "GYNAE",
      tempRange: "103.5°F - 105.5°F",
      cardinalSigns: ["URINE_TURBID_PUS"],
      labTests: [
        { sNo: 1, testName: "Transrectal Palpation / Ultrasonography", sampleType: "Uterine horn scanning", approxMrp: 300, tat: "10 Mins", confirms: "Fluid-filled enlarged flaccid uterine horn with thickened wall" },
        { sNo: 2, testName: "Metricheck Device Vaginal Discharge Scoring", sampleType: "Vaginal mucus", approxMrp: 50, tat: "Immediate", confirms: "Score 3: >50% purulent or foul reddish lochial exudate" }
      ],
      stages: [
        { stage: 1, signs: "Occurs 1-10 days postpartum: Fetid watery red-brown uterine lochia, elevated temperature (104°F), milk drop.", recovery: "85% with parenteral Ceftiofur", deterioration: "Bacterial toxin absorption" },
        { stage: 2, signs: "Septic metritis: Complete anorexia, sunken eyes, arched back, foul-smelling purulent discharge, dehydration.", recovery: "65% with intensive systemic therapy", deterioration: "Salpingitis and peritonitis" },
        { stage: 3, signs: "Chronic endometritis: Cow appears clinically normal but discharges cloudy pus during estrus (White vaginal discharge).", recovery: "75% with intrauterine infusions", deterioration: "Permanent subfertility" },
        { stage: 4, signs: "Salpingitis, bilateral bursal adhesions, permanent occlusive sterility, culling.", recovery: "10%", deterioration: "Permanent barrenness" }
      ],
      treatment: {
        injections: [
          { name: "Ceftiofur Sodium 1g", salt: "Ceftiofur Sodium", ethicalBrand: "Xyrofur 1g (Intas)", genericOption: "Ceftio-Vet 1g", mrpEthical: 440, mrpGeneric: 185, dose: "1-2 mg/kg I/M daily for 3-5 days", route: "Deep I/M", pregnancySafe: true, purpose: "Drug of choice for Trueperella pyogenes and anaerobes (No milk withdrawal)" },
          { name: "Flunixin Meglumine", salt: "Flunixin Meglumine 50mg/ml", ethicalBrand: "Megludyne 50ml (Virbac)", genericOption: "Flunivet 50ml", mrpEthical: 510, mrpGeneric: 210, dose: "2.2 mg/kg I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Counters toxic lochial absorption and reduces fever" }
        ],
        oral: [{ name: "Uterine cleansing herbal syrups (Utrovet / Replanta 100ml BID for 7 days)" }],
        ayurvedic: [{ name: "Neem bark + Turmeric + Ajwain boiled decoction (1L daily orally)" }],
        homeopathic: [{ name: "Sepia 200C & Pulsatilla 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Do NOT infuse caustic antiseptics into freshly calved uterus (causes severe chemical necrosis)" }]
      }
    },
    {
      id: "DIS_PYOMETRA",
      nameHi: "बंद पायोमेट्रा / बच्चेदानी में मवाद (Bovine Pyometra)",
      nameEn: "Bovine Pyometra (Closed / Open)",
      category: "GYNAE",
      tempRange: "101.5°F - 102.5°F (Usually Afebrile)",
      cardinalSigns: ["URINE_TURBID_PUS"],
      labTests: [
        { sNo: 1, testName: "Transrectal Ultrasonography", sampleType: "Uterine horn scan", approxMrp: 400, tat: "10 Mins", confirms: "Massive uterine distension with speckled echogenic fluid and persistent Corpus Luteum (CL)" }
      ],
      stages: [
        { stage: 1, signs: "Persistent Corpus Luteum prevents estrus; cow assumed to be pregnant, but fails to calve.", recovery: "90% with single PGF2a injection", deterioration: "Uterus accumulates 2-10L pus" },
        { stage: 2, signs: "Uterus fills with several liters of creamy white or green pus; cervix tightly closed; no systemic signs.", recovery: "80% complete evacuation in 48-72h", deterioration: "Endometrial destruction" },
        { stage: 3, signs: "Open pyometra: Intermittent discharging of large quantities of foul creamy pus while recumbent.", recovery: "60% fertility restored", deterioration: "Endometrial fibrosis" },
        { stage: 4, signs: "Permanent cystic glandular endometrial hyperplasia, complete loss of caruncles, irreversible sterility.", recovery: "20%", deterioration: "Permanent barren cow" }
      ],
      treatment: {
        injections: [
          { name: "Cloprostenol Sodium 250mcg/ml (Pragma)", salt: "Cloprostenol (PGF2-alpha)", ethicalBrand: "Pragma 2ml (Intas)", genericOption: "Cloprost-Vet 2ml", mrpEthical: 235, mrpGeneric: 105, dose: "500 mcg (2 ml) I/M strictly (Repeat in 11-14 days)", route: "Intramuscular strictly", pregnancySafe: false, purpose: "Induces rapid luteolysis of CL, opening cervix and triggering massive uterine evacuation" },
          { name: "Ceftiofur Sodium 1g", salt: "Ceftiofur Sodium", ethicalBrand: "Xyrofur 1g (Intas)", genericOption: "Ceftio-Vet 1g", mrpEthical: 440, mrpGeneric: 185, dose: "1g I/M daily for 3 days", route: "Deep I/M", pregnancySafe: true, purpose: "Eliminates secondary bacterial proliferation" }
        ],
        oral: [],
        ayurvedic: [],
        homeopathic: [{ name: "Pulsatilla 1M & Hepar Sulphuris 200C", dose: "10 pills BID" }],
        desiRemedies: [{ name: "Never artificially inseminate (A.I.) during initial pus evacuation; wait for next clean cycle" }]
      }
    },

    // =========================================================================
    // CATEGORY 7: SURGICAL & TRAUMATIC CONDITIONS (47 to 49)
    // =========================================================================
    {
      id: "DIS_TRP",
      nameHi: "हार्डवेयर रोग / सुई चुभना (Traumatic Reticuloperitonitis / TRP)",
      nameEn: "Traumatic Reticuloperitonitis / Hardware Disease",
      category: "SURGICAL",
      tempRange: "102.5°F - 104.0°F",
      cardinalSigns: ["RESP_GRUNTING_MOAN", "RUMEN_ATONY", "SKIN_DEW_LAP_EDEMA"],
      labTests: [
        { sNo: 1, testName: "Withers Pinch & Pole Test", sampleType: "Clinical physical test", approxMrp: 0, tat: "Immediate", confirms: "Reluctance to depress back accompanied by audible grunt confirms ventral peritonitis" },
        { sNo: 2, testName: "Ferroscopy (Metal Detector Test)", sampleType: "Reticular region scanning", approxMrp: 100, tat: "5 Mins", confirms: "Detection of ferromagnetic wire or nail in reticulum" }
      ],
      stages: [
        { stage: 1, signs: "Sharp metal foreign body (wire/nail) penetrates reticular wall: Sudden anorexia, acute milk drop, arched back.", recovery: "80% with rumen magnet & conservative antibiotic therapy", deterioration: "Foreign body migrates forward" },
        { stage: 2, signs: "Localized reticuloperitonitis: Grunting during defecation or turning, abduction of elbows, spontaneous groaning.", recovery: "60% medical or surgical rumenotomy", deterioration: "Diaphragm penetration" },
        { stage: 3, signs: "Traumatic pericarditis: Wire penetrates pericardial sac; muffling of heart sounds, splashing 'washing machine' murmur.", recovery: "10% very grave", deterioration: "Congestive heart failure" },
        { stage: 4, signs: "Massive brisket edema ('bottle jaw'), engorged jugular veins (jugular pulse), severe dyspnea, death.", recovery: "0%", deterioration: "Fatal cardiac tamponade" }
      ],
      treatment: {
        injections: [
          { name: "Ceftriaxone + Tazobactam 3375mg", salt: "Ceftriaxone + Tazobactam", ethicalBrand: "Intacef Tazo 3.375g (Intas)", genericOption: "Tazo-Ceff 3.375g", mrpEthical: 495, mrpGeneric: 195, dose: "10 mg/kg I/M daily for 5-7 days", route: "Deep I/M", pregnancySafe: true, purpose: "High-level broad-spectrum control of mixed anaerobic peritonitis" },
          { name: "Flunixin Meglumine", salt: "Flunixin Meglumine 50mg/ml", ethicalBrand: "Megludyne 50ml (Virbac)", genericOption: "Flunivet 50ml", mrpEthical: 510, mrpGeneric: 210, dose: "2.2 mg/kg I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Potent visceral analgesia and anti-inflammatory" }
        ],
        oral: [{ name: "Orally administer a heavy permanent ceramic / Alnico Rumen Magnet via balling gun" }],
        ayurvedic: [],
        homeopathic: [{ name: "Arnica Montana 200C & Bryonia 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Keep cattle on a wooden ramp with forequarters elevated 6 to 9 inches to allow gravity to pull foreign body back into reticulum" }]
      }
    },
    {
      id: "DIS_HORN_FRACTURE",
      nameHi: "सींग का टूटना / साइनस संक्रमण (Horn Core Fracture & Sinusitis)",
      nameEn: "Horn Core Fracture and Frontal Sinusitis",
      category: "SURGICAL",
      tempRange: "101.5°F - 103.5°F",
      cardinalSigns: ["RESP_FROTHY_DISCHARGE"],
      labTests: [
        { sNo: 1, testName: "Visual & Sinus Percussion Examination", sampleType: "Frontal bone tap", approxMrp: 0, tat: "Immediate", confirms: "Dull percussion note over frontal sinus and epistaxis from ipsilateral nostril confirms sinus fracture" }
      ],
      stages: [
        { stage: 1, signs: "Acute avulsion of horn sheath or complete horn fracture: Profuse arterial bleeding from horn core.", recovery: "95% with immediate hemostasis and bandaging", deterioration: "Flies and maggots invade" },
        { stage: 2, signs: "Exposed vascular horn core, secondary bacterial invasion of frontal sinus, unilateral nasal discharge.", recovery: "85% with surgical amputation & sinus lavage", deterioration: "Purulent frontal sinusitis" },
        { stage: 3, signs: "Frontal sinusitis: Foul-smelling purulent nasal discharge, head tilted to one side, myiasis (maggot infestation).", recovery: "65% with surgical trephining", deterioration: "Cranial osteomyelitis" },
        { stage: 4, signs: "Extension of infection to meninges and brain cavity, neurological delirium, death.", recovery: "15%", deterioration: "Fatal meningitis" }
      ],
      treatment: {
        injections: [
          { name: "Procaine Penicillin G 40 Lakh IU", salt: "Penicillin G", ethicalBrand: "Fortified Procaine Penicillin (Alembic)", genericOption: "Pendistrin 40L", mrpEthical: 135, mrpGeneric: 58, dose: "20,000 IU/kg Deep I/M for 5 days", route: "Deep I/M", pregnancySafe: true, purpose: "Protects exposed cranial sinus bone from osteomyelitis" },
          { name: "Meloxicam + Paracetamol", salt: "Meloxicam + Paracetamol", ethicalBrand: "Melonex Plus 100ml (Intas)", genericOption: "Melonat Plus 100ml", mrpEthical: 220, mrpGeneric: 85, dose: "15-20 ml Deep I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Relieves excruciating horn and sinus fracture pain" },
          { name: "Ivermectin 1% S/C", salt: "Ivermectin 10mg/ml", ethicalBrand: "Neomec 10ml (Intas)", genericOption: "Ivervet 10ml", mrpEthical: 155, mrpGeneric: 55, dose: "1 ml/50kg S/C", route: "Subcutaneous", pregnancySafe: true, purpose: "Prevents/destroys Chrysomya maggots in open horn wound" }
        ],
        oral: [],
        ayurvedic: [{ name: "Jatyadi Taila sterile gauze packing" }],
        homeopathic: [{ name: "Arnica Montana 200C & Calendula 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "Apply Tourniquet (figure-of-eight rope) around horn base; apply ferric chloride or hot cautery to stop bleeding; apply tar-soaked water-repellent cap" }]
      }
    },
    {
      id: "DIS_UROLITHIASIS",
      nameHi: "पेशाब का पथरी रोग / पेट में पानी (Bovine Urolithiasis / Water Belly)",
      nameEn: "Bovine Urolithiasis / Water Belly",
      category: "SURGICAL",
      tempRange: "101.5°F - 103.0°F (Subnormal in terminal rupture)",
      cardinalSigns: ["URINE_ANURIA", "RUMEN_COLIC_SIGNS"],
      labTests: [
        { sNo: 1, testName: "Transrectal / Per-Cutaneous Bladder Palpation", sampleType: "Caudal abdominal palpation", approxMrp: 0, tat: "Immediate", confirms: "Massively distended turgid urinary bladder confirms urethral calculus blockage" },
        { sNo: 2, testName: "Serum Creatinine and Blood Urea Nitrogen (BUN)", sampleType: "Serum", approxMrp: 250, tat: "1 Hour", confirms: "Massive post-renal azotemia (Creatinine >8.0 mg/dl)" }
      ],
      stages: [
        { stage: 1, signs: "Partial obstruction: Restlessness, frequent tail swishing, kicking at belly, pulsing urethra, dribbling bloody urine.", recovery: "85% with urinary acidifiers and antispasmodics", deterioration: "Complete calculus impaction" },
        { stage: 2, signs: "Complete obstruction: Anuria, severe colic, arched back, mineral crystals precipitated on prepuce hair.", recovery: "60% with tube cystostomy surgery", deterioration: "Bladder pressure exceeds limits" },
        { stage: 3, signs: "Rupture of urinary bladder: Sudden relief of colic pain, bilateral pear-shaped ventral abdominal distension ('Water Belly').", recovery: "35% emergency surgical drainage & repair", deterioration: "Severe uremic toxemia" },
        { stage: 4, signs: "Uremic poisoning: Depression, ammonia odor on breath, subnormal temperature, hypothermia, death.", recovery: "<5%", deterioration: "Fatal uremia within 24-48 hours" }
      ],
      treatment: {
        injections: [
          { name: "Spasmolytic: Dicyclomine HCl", salt: "Dicyclomine HCl 10mg/ml", ethicalBrand: "Spasmo-Vet 30ml", genericOption: "Spasmo-Vet", mrpEthical: 110, mrpGeneric: 45, dose: "10-15 ml Deep I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Relieves intense urethral sphincter spasm around calculus" },
          { name: "Ceftriaxone Sodium 3g", salt: "Ceftriaxone Sodium", ethicalBrand: "Intacef 3g (Intas)", genericOption: "Ceff 3g", mrpEthical: 380, mrpGeneric: 145, dose: "10 mg/kg I/M", route: "Deep I/M", pregnancySafe: true, purpose: "Prevents necrotic cystitis and pyelonephritis" },
          { name: "Flunixin Meglumine", salt: "Flunixin Meglumine 50mg/ml", ethicalBrand: "Megludyne 50ml (Virbac)", genericOption: "Flunivet 50ml", mrpEthical: 510, mrpGeneric: 210, dose: "2.2 mg/kg I/V", route: "Slow I/V", pregnancySafe: true, purpose: "Relieves severe visceral urethral pain" }
        ],
        oral: [
          { name: "Ammonium Chloride Powder (30-50g daily for 7 days orally as urinary acidifier to dissolve struvite stones)" },
          { name: "Potassium Citrate solution" }
        ],
        ayurvedic: [{ name: "Cystone tablets (10 tablets BID) / Pashanbhed Churna (30g daily)" }],
        homeopathic: [{ name: "Cantharis 200C & Berberis Vulgaris 200C", dose: "10 drops TID" }],
        desiRemedies: [{ name: "SURGICAL EMERGENCY: Perform Tube Cystostomy (Foley catheter placement into bladder via left flank) or urethrostomy" }]
      }
    }
  ]);

})(typeof window !== "undefined" ? window : global);

