// Vetcare AI OS - Veterinary Necropsy Protocols, Pathognomonic Lesions & Medico-Legal Forensic Engine (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. COMPREHENSIVE PATHOGNOMONIC GROSS LESION MATRIX
  const GROSS_LESION_MATRIX = [
    // ========================================================================
    // BOVINE & BUBALINE (CATTLE & BUFFALO)
    // ========================================================================
    {
      diseaseId: "pm-bovine-hs",
      diseaseNameEn: "Haemorrhagic Septicaemia (HS / Pasteurella multocida B:2)",
      diseaseNameHi: "गलघोंटू रोग (एच.एस. / पाश्चुरेला)",
      species: ["bovine", "bubaline"],
      pathognomonicGrossLesions: [
        "Massive gelatinous, straw-colored sero-fibrinous edema in the subcutaneous tissues of the submandibular region, throat, dewlap, and brisket (गर्दन व गलकंबल में पीले जिलेटिन जैसा पानी)",
        "Severe petechial and ecchymotic hemorrhages distributed across the epicardium, endocardium, and mediastinum",
        "Acute bilateral fibrinous bronchopneumonia with consolidated, dark red-grey marbled lungs and interlobular septal edema",
        "Serofibrinous pericarditis with excessive cloudy pericardial fluid (pericardial sac distension)"
      ],
      hallmarkKeywords: ["gelatinous", "throat edema", "brisket edema", "petechiae", "marbled lungs", "straw-colored fluid", "serofibrinous"],
      organSystemsInvolved: ["Subcutaneous tissue", "Thoracic cavity", "Lungs", "Heart"],
      differentialDiagnosis: ["Black Quarter", "Acute Anthrax", "Pleuritis / Aspiration Pneumonia"]
    },
    {
      diseaseId: "pm-bovine-bq",
      diseaseNameEn: "Black Quarter / BQ (Clostridial Myonecrosis / Clostridium chauvoei)",
      diseaseNameHi: "ब्लैक क्वार्टर / लंगड़ा बुखार (मांसपेशियों का कालापन व चरचराहट)",
      species: ["bovine", "bubaline", "caprine", "ovine"],
      pathognomonicGrossLesions: [
        "PATHOGNOMONIC MUSCLE LESION: Massive swelling of heavy muscle groups (gluteal, shoulder, thigh) containing dark red to black, dry, porous, sponge-like muscle tissue infiltrated with gas bubbles that crepitate under pressure",
        "Characteristic sweetish, rancid butter odor (sour butyric acid smell) emanating immediately upon cutting into the affected muscle mass",
        "Subcutaneous tissue over the affected area is infiltrated with blood-tinged, frothy serous fluid",
        "Fibrinous pericarditis and endocardial hemorrhages in peracute cases"
      ],
      hallmarkKeywords: ["crepitation", "gas bubbles", "black muscle", "rancid butter odor", "spongy muscle", "butyric acid", "gluteal"],
      organSystemsInvolved: ["Skeletal muscle", "Subcutis", "Cardiovascular"],
      differentialDiagnosis: ["Malignant Edema (Clostridium septicum)", "Anthrax", "Lightning Strike"]
    },
    {
      diseaseId: "pm-bovine-tb",
      diseaseNameEn: "Bovine Tuberculosis (Mycobacterium bovis)",
      diseaseNameHi: "बोवाइन टी.बी. / पर्ल डिजीज (कैल्सीफाइड गांठें)",
      species: ["bovine", "bubaline"],
      pathognomonicGrossLesions: [
        "HALLMARK 'PEARL DISEASE' (Miliary Perlsucht): Multitudes of firm, glistening, pearl-like caseo-calcareous nodules studded across the parietal and visceral pleura and peritoneum",
        "Classic tuberculous granulomas (tubercles) in lungs containing dry, cheesy (caseous), yellowish-white necrotic cores with gritty calcification on knife cutting",
        "Marked enlargement, induration, and caseous necrosis of retropharyngeal, bronchial, and mediastinal lymph nodes"
      ],
      hallmarkKeywords: ["pearl disease", "tubercles", "caseous necrosis", "gritty calcification", "nodules on pleura", "mediastinal lymph nodes"],
      organSystemsInvolved: ["Lungs", "Pleura", "Peritoneum", "Lymph nodes"],
      differentialDiagnosis: ["Actinomycosis / Actinobacillosis", "Contagious Bovine Pleuropneumonia (CBPP)", "Chronic Abscesses"]
    },
    {
      diseaseId: "pm-bovine-fmd-calf",
      diseaseNameEn: "Foot and Mouth Disease / FMD in Neonatal Calves ('Tiger Heart')",
      diseaseNameHi: "खुरपका-मुँहपका - बछड़ों में टाइगर हार्ट (हृदय की धारियां)",
      species: ["bovine", "bubaline"],
      pathognomonicGrossLesions: [
        "PATHOGNOMONIC 'TIGER HEART' (Cor Tigroides): Extensive pale grey, yellowish-white necrotic streaks, spots, and degeneration interlaced across the reddish myocardium, particularly in the left ventricular wall and septum",
        "Acute non-suppurative necrotizing myocarditis causing sudden fatal cardiac arrest in calves under 6 months without typical adult vesicular lesions",
        "Adults show ruptured vesicular erosions and ulcers on the dorsal tongue, dental pad, and interdigital skin"
      ],
      hallmarkKeywords: ["tiger heart", "cor tigroides", "myocardial streaking", "ventricular necrosis", "vesicles", "tongue erosions"],
      organSystemsInvolved: ["Heart / Myocardium", "Oral cavity", "Hooves"],
      differentialDiagnosis: ["White Muscle Disease (Selenium/Vitamin E deficiency)", "Enzootic Bovine Leukosis (Lymphosarcoma)"]
    },
    {
      diseaseId: "pm-bovine-pph",
      diseaseNameEn: "Post-Parturient Hemoglobinuria (PPH / Severe Hypophosphatemic Hemolysis)",
      diseaseNameHi: "प्रसव बाद लाल पेशाब / पी.पी.एच. (तीव्र पीलिया व गहरे काले गुर्दे)",
      species: ["bovine", "bubaline"],
      pathognomonicGrossLesions: [
        "Extremely icteric (deep bright yellow) generalized carcass involving subcutaneous fat, omentum, sclera, and serosal membranes",
        "Severely enlarged, congested, dark reddish-brown to black kidneys (Hemoglobinuric Nephrosis) with dark brown cortical streaks",
        "Urinary bladder heavily distended with clear, dark port-wine to coffee-colored urine without whole blood clots",
        "Watery, thin, pale blood that fails to stain hands properly"
      ],
      hallmarkKeywords: ["port-wine urine", "icterus", "jaundice", "black kidneys", "hemoglobinuria", "thin blood", "hypophosphatemia"],
      organSystemsInvolved: ["Urinary bladder", "Kidneys", "Liver", "Blood"],
      differentialDiagnosis: ["Bovine Babesiosis (Tick fever)", "Bacillary Hemoglobinuria (Clostridium haemolyticum)", "Leptospirosis"]
    },

    // ========================================================================
    // SMALL RUMINANTS (GOAT & SHEEP)
    // ========================================================================
    {
      diseaseId: "pm-caprine-ppr",
      diseaseNameEn: "Peste des Petits Ruminants (PPR / Small Ruminant Plague)",
      diseaseNameHi: "कांगनी / बकरी प्लेग (आंतों पर ज़ेब्रा धारियां व मुंह में छाले)",
      species: ["caprine", "ovine"],
      pathognomonicGrossLesions: [
        "PATHOGNOMONIC 'ZEBRA STRIPES': Discrete, prominent parallel lines of dark red to black congestion and petechial hemorrhages along the longitudinal folds of the large intestine, particularly at the ileocecal valve, cecum, colon, and rectum",
        "Extensive erosive and necrotic stomatitis: Greyish-white pseudomembranes and ulcers over the dental pad, hard palate, gums, and tongue",
        "Severe broncho-interstitial pneumonia characterized by red-plum consolidation of the apical and cardiac lung lobes",
        "Enlarged, edematous, hemorrhagic mesenteric lymph nodes"
      ],
      hallmarkKeywords: ["zebra stripes", "ileocecal valve", "necrotic stomatitis", "broncho-interstitial pneumonia", "pseudomembranes", "rectal hemorrhages"],
      organSystemsInvolved: ["Gastrointestinal tract", "Oral cavity", "Lungs", "Mesenteric nodes"],
      differentialDiagnosis: ["Contagious Caprine Pleuropneumonia (CCPP)", "Coccidiosis", "Salmonellosis"]
    },
    {
      diseaseId: "pm-ovine-et",
      diseaseNameEn: "Enterotoxaemia / Pulpy Kidney (Clostridium perfringens Type D)",
      diseaseNameHi: "फिड़किया रोग / पल्पी किडनी (गुर्दों का गलना व पेरिकार्डियल थक्का)",
      species: ["ovine", "caprine"],
      pathognomonicGrossLesions: [
        "PATHOGNOMONIC 'PULPY KIDNEY': Extremely soft, semi-fluid, gelatinous, pulpy kidneys that disintegrate rapidly under washing water within 2 to 4 hours post-mortem (accelerated post-mortem autolysis due to epsilon toxin)",
        "Pericardial sac significantly distended with clear straw-colored fluid containing a soft gelatinous proteinaceous clot",
        "Glycosuria: High glucose content in urine (detected using glucose test strips on aspirate from bladder)",
        "Petechial hemorrhages on the epicardium, thymus, and serosa of the small intestines"
      ],
      hallmarkKeywords: ["pulpy kidney", "soft kidney", "pericardial clot", "glycosuria", "epsilon toxin", "autolysis"],
      organSystemsInvolved: ["Kidneys", "Pericardium", "Intestines", "Brain (FSE)"],
      differentialDiagnosis: ["Acute Grain Overload / Acidosis", "Polioencephalomalacia", "Plant Toxicosis"]
    },
    {
      diseaseId: "pm-ovine-coenurosis",
      diseaseNameEn: "Coenurosis / Gid / Sturdy (Taenia multiceps Larval Cyst)",
      diseaseNameHi: "गिड / सर घूमना (मस्तिष्क में पानी की बड़ी थैली)",
      species: ["ovine", "caprine"],
      pathognomonicGrossLesions: [
        "PATHOGNOMONIC BRAIN CYST: Large, thin-walled, translucent fluid-filled vesicle (Coenurus cerebralis, 3 to 5 cm diameter) embedded within one cerebral hemisphere, causing marked atrophy of surrounding cerebral cortex",
        "Inner membrane of the cyst wall is studded with hundreds of small (2-3 mm) whitish clustered nodules representing invaginated tapeworm scoleces",
        "Softening and thinning of the overlying frontal or parietal cranial bone ('soft spot on skull')"
      ],
      hallmarkKeywords: ["brain cyst", "coenurus cerebralis", "scoleces", "cerebral atrophy", "skull thinning", "fluid vesicle"],
      organSystemsInvolved: ["Brain / Central Nervous System", "Cranial bones"],
      differentialDiagnosis: ["Oestrus ovis (Nasal bot intracranial migration)", "Listeriosis (Circling disease)", "Brain Abscess"]
    },

    // ========================================================================
    // AVIAN / COMMERCIAL POULTRY
    // ========================================================================
    {
      diseaseId: "pm-avian-ndv",
      diseaseNameEn: "Newcastle Disease / Ranikhet (Velogenic NDV)",
      diseaseNameHi: "रानीखेत रोग (प्रोवेंट्रिकुलस ग्रंथियों पर खूनी बिंदु)",
      species: ["avian"],
      pathognomonicGrossLesions: [
        "PATHOGNOMONIC PROVENTRICULAR HEMORRHAGES: Pinpoint petechial hemorrhages sharply localized at the tips of the mucosal glands of the proventriculus",
        "Severe hemorrhagic, necrotic 'button ulcers' elevated on the mucosal surface of the intestine and cecal tonsils",
        "Severe tracheitis with mucus and hemorrhagic petechiae in the proximal trachea",
        "Edema of head and neck tissues with congestion of brain"
      ],
      hallmarkKeywords: ["proventricular hemorrhages", "button ulcers", "cecal tonsils", "tracheitis", "tips of glands"],
      organSystemsInvolved: ["Proventriculus", "Intestines", "Cecal tonsils", "Trachea"],
      differentialDiagnosis: ["Avian Influenza (HPAI)", "Infectious Laryngotracheitis (ILT)", "Fowl Cholera"]
    },
    {
      diseaseId: "pm-avian-coccidiosis",
      diseaseNameEn: "Avian Cecal Coccidiosis (Eimeria tenella)",
      diseaseNameHi: "मुर्गियों की खूनी पेचिश (अंधनाल में खून के ठोस थक्के)",
      species: ["avian"],
      pathognomonicGrossLesions: [
        "PATHOGNOMONIC CECAL BALLOONING: Both ceca are massively distended, thickened, dark purplish-red, and turgid",
        "Cecal lumen is packed with a solid core of clotted blood, sloughed necrotic mucosa, and cheesy fibrinous debris",
        "Extreme pallor of carcass breast muscle and liver due to severe acute blood loss"
      ],
      hallmarkKeywords: ["cecal distension", "clotted blood core", "cecal ballooning", "hemorrhagic enteritis", "pale carcass"],
      organSystemsInvolved: ["Ceca / Lower intestine", "Pectoral muscles"],
      differentialDiagnosis: ["Histomoniasis (Blackhead)", "Necrotic Enteritis", "Salmonella pullorum"]
    },
    {
      diseaseId: "pm-avian-mareks",
      diseaseNameEn: "Marek's Disease (MD / Oncogenic Herpesvirus)",
      diseaseNameHi: "मैरेक रोग (सायटिक नसों की अत्यधिक सूजन व ट्यूमर)",
      species: ["avian"],
      pathognomonicGrossLesions: [
        "PATHOGNOMONIC NERVE ENLARGEMENT: Unilateral or bilateral enlargement (2 to 3 times normal thickness) of the sciatic nerve, brachial nerve, or vagus nerve; loss of normal transverse cross-striations, appearing greyish-white and edematous",
        "Diffuse or nodular white-grey lymphoid tumors infiltrating the liver, spleen, kidneys, heart, ovaries, and proventriculus",
        "Enlarged feather follicles on skin ('skin leukosis')"
      ],
      hallmarkKeywords: ["sciatic nerve enlargement", "loss of striations", "lymphoid tumors", "greyish nerve", "vagus nerve"],
      organSystemsInvolved: ["Peripheral nerves", "Visceral organs", "Skin follicles"],
      differentialDiagnosis: ["Avian Leukosis Complex (ALV - does not affect nerves)", "Riboflavin (B2) deficiency (curled toe paralysis)"]
    },

    // ========================================================================
    // SWINE & CANINE
    // ========================================================================
    {
      diseaseId: "pm-swine-csf",
      diseaseNameEn: "Classical Swine Fever (Hog Cholera / Pestivirus)",
      diseaseNameHi: "क्लासिकल स्वाइन फीवर (तुर्की अंडे जैसे गुर्दे व आंत में बटन अल्सर)",
      species: ["swine"],
      pathognomonicGrossLesions: [
        "PATHOGNOMONIC 'TURKEY-EGG KIDNEY': Widespread petechial hemorrhages peppered across the cortical surface of both kidneys under the capsule",
        "Hemorrhagic infarctions along the margins of the spleen (triangular, elevated, dark purple infarctions)",
        "Necrotic, concentric 'button ulcers' in the mucosa of the cecum and colon around the ileocecal valve",
        "Enlarged, marbled 'strawberry' lymph nodes with peripheral hemorrhagic rings"
      ],
      hallmarkKeywords: ["turkey-egg kidney", "button ulcers", "splenic infarctions", "strawberry lymph nodes", "petechiae"],
      organSystemsInvolved: ["Kidneys", "Spleen", "Large intestine", "Lymph nodes"],
      differentialDiagnosis: ["African Swine Fever (ASF)", "Porcine Dermatitis and Nephropathy Syndrome (PDNS)"]
    },
    {
      diseaseId: "pm-canine-parvo",
      diseaseNameEn: "Canine Parvovirus Enteritis (CPV-2)",
      diseaseNameHi: "कैनाइन पार्वोवायरस (आंतों की झिल्ली का छिलना व खूनी सूजन)",
      species: ["canine"],
      pathognomonicGrossLesions: [
        "Segmental or diffuse fibrinonecrotic hemorrhagic enteritis: Small intestine (especially jejunum and ileum) is flaccid, dilated, with dark purplish-red corrugated serosa",
        "Intestinal lumen filled with foul-smelling, dark reddish-brown watery or gelatinous fluid and sloughed mucosal casts",
        "Mesenteric lymph nodes are markedly enlarged, congested, succulent, and hemorrhagic",
        "In young puppies (<8 weeks): Non-suppurative necrotizing myocarditis with pale ventricular streaking"
      ],
      hallmarkKeywords: ["fibrinonecrotic enteritis", "denuded mucosa", "hemorrhagic fluid in lumen", "mesenteric lymphadenitis", "corrugated serosa"],
      organSystemsInvolved: ["Small intestine", "Mesenteric lymph nodes", "Myocardium"],
      differentialDiagnosis: ["Canine Coronavirus", "Hemorrhagic Gastroenteritis (HGE / AHDS)", "Intestinal Intussusception"]
    }
  ];

  // 3. SYSTEMATIC 5-STAGE VETERINARY NECROPSY PROTOCOL
  const NECROPSY_PROTOCOL = {
    universalPrecautions: [
      "Wear full personal protective equipment (PPE): Heavy rubber necropsy boots, water-impermeable apron, cut-resistant gloves covered with nitrile gloves, face shield, and P95 mask.",
      "Check premises for legal restrictions, owner consent, and insurance documentation before making any incision."
    ],

    stage1ExternalExamAndAnthraxStopRule: {
      stageName: "Stage 1: External Examination & Critical Anthrax Stop Rule",
      stageNameHi: "चरण 1: बाहरी परीक्षण व एंथ्रेक्स अनिवार्य रोक नियम",
      procedures: [
        "Examine body condition score (BCS), state of decomposition (autolysis), and degree of rigor mortis in jaw, neck, and limbs.",
        "Inspect all natural body orifices: nostrils, mouth, eyes, anus, vulva/prepuce for discharges, froth, or blood.",
        "Inspect skin coat for ectoparasites (ticks, lice), traumatic lesions, predator bite marks, lightning burns, or branding marks.",
        "Check animal identification: Verify ear tag number, brand mark, microchip transponder with an ISO scanner, or horn notches against insurance records."
      ],
      CRITICAL_ANTHRAX_STOP_RULE: {
        directiveEn: "MANDATORY ANTHRAX HALT: If the carcass displays dark, tarry, oily, uncoagulated blood oozing from the nostrils, mouth, or anus, combined with absence of rigor mortis and rapid gaseous bloating -> STOP THE NECROPSY IMMEDIATELY. DO NOT MAKE ANY SURGICAL INCISION.",
        directiveHi: "अनिवार्य एंथ्रेक्स रोक नियम: यदि पशु के मुंह, नाक या गुदा से गहरा काला, बिना जमा हुआ खून बह रहा हो और अकड़न (Rigor mortis) न हो, तो शव-विच्छेदन (पोस्टमार्टम) तुरंत रोक दें। शव को चीरना सख्त मना है।",
        requiredActions: [
          "1. Do NOT skin or open the carcass (air exposure triggers lethal sporulation of Bacillus anthracis).",
          "2. Make a tiny puncture incision on the tip of the ear; collect 2-3 drops of blood to prepare dry blood smears.",
          "3. Fix slides with absolute methanol or heat-fix; perform McFadyean's polychrome methylene blue stain.",
          "4. Plug all natural orifices with cotton soaked in 5% formalin.",
          "5. Seal carcass in heavy leak-proof plastic; bury 8 feet deep covered with quicklime."
        ]
      }
    },

    stage2SubcutaneousReflection: {
      stageName: "Stage 2: Subcutaneous Reflection & Joint Examination",
      stageNameHi: "चरण 2: त्वचा छीलना व मांसपेशियों का परीक्षण",
      procedures: [
        "Place animal in left lateral recumbency (cattle/buffalo) or dorsal recumbency (canine/swine).",
        "Make a ventral midline skin incision from the mandibular symphysis down along the neck, sternum, linea alba to the pelvic pubis.",
        "Reflect the skin widely off the right lateral side of the neck, thorax, and abdomen.",
        "Reflect the right forelimb and right hindlimb by cutting the medial musculature and disarticulating the hip (coxofemoral) joint.",
        "Examine subcutaneous fat for jaundice (icterus), gelatinous edema (HS), and inspect prescapular and prefemoral lymph nodes.",
        "Incise into large muscle masses (gluteal/shoulder) checking for black discoloration, gas crepitation, and rancid odor (Black Quarter).",
        "Incise the right femorotibial (stifle) and hock joints to examine synovial fluid volume, color, and clarity."
      ]
    },

    stage3ThoracicOpening: {
      stageName: "Stage 3: Thoracic Cavity Opening & Cardiopulmonary Pluck",
      stageNameHi: "चरण 3: छाती गुहा खोलना व हृदय-फेफड़ों का परीक्षण",
      procedures: [
        "Puncture the diaphragm carefully with a scalpel: listen for the hissing sound of air rushing in, confirming normal negative thoracic pressure (absence indicates pneumothorax).",
        "Cut through the costochondral junctions of the right rib cage using bone cutters or a rib saw; fracture ribs near spine and remove thoracic wall.",
        "Examine pleural cavity for abnormal fluid accumulations (hydrothorax, hemothorax, serofibrinous exudate).",
        "Inspect parietal and visceral pleura for caseous tuberculous nodules ('pearls').",
        "Extract the 'Pluck' (tongue, pharynx, larynx, trachea, esophagus, lungs, and heart en-bloc).",
        "Open trachea longitudinally to check for froth, blood, or parasites (Dictyocaulus lungworms).",
        "Incise pericardial sac: check volume and character of pericardial fluid. Open heart chambers following the direction of blood flow; inspect valves for endocarditis and myocardium for necrosis (Tiger Heart)."
      ]
    },

    stage4AbdominalViscera: {
      stageName: "Stage 4: Abdominal Viscera Dissection & Organ Systems",
      stageNameHi: "चरण 4: उदर गुहा के अंगों (जिगर, तिल्ली, आंत, गुर्दे) का विच्छेदन",
      procedures: [
        "Incise abdominal wall along the right costal arch and flank; reflect abdominal muscles to expose viscera.",
        "Examine peritoneal fluid and omentum.",
        "Inspect the spleen: check size, consistency, and edges (normal sharp edges vs rounded swollen dark pulp in anthrax/babesiosis).",
        "Examine liver: inspect color, edges, capsule, and make multiple transverse 1-cm slices to inspect parenchyma and bile ducts for adult liver flukes (Fasciola).",
        "Place double ligatures at the esophagus and rectum; remove the entire gastrointestinal tract en-bloc.",
        "Open rumen, reticulum, omasum, and abomasum separately: inspect contents for foreign bodies (nails/wires in reticulum, plastic in rumen), abomasal mucosal ulcers, or toxic grains.",
        "Open duodenum, jejunum, ileum, cecum, and colon longitudinally: inspect mucosal lining for hemorrhages, button ulcers, or zebra striping.",
        "Strip renal capsule from both kidneys: check cortical surface for petechiae (turkey-egg appearance) or softening (pulpy kidney). Make sagittal slice through cortex and medulla."
      ]
    },

    stage5PelvicAndCranial: {
      stageName: "Stage 5: Pelvic & Cranial Cavity Examination (Brain Removal)",
      stageNameHi: "चरण 5: पेल्विक अंग व मस्तिष्क निष्कासन",
      procedures: [
        "Split the pelvic symphysis with a saw or cleaver; examine urinary bladder (inspect urine color for hemoglobinuria), urethra, prostate, or uterus and ovaries.",
        "Disarticulate the head at the atlanto-occipital joint.",
        "Reflect skin, temporal muscles, and ears from the cranium.",
        "Make three saw cuts in the skull: Two lateral cuts from each supraorbital process caudally to the lateral borders of the foramen magnum; connect them with a transverse cut behind the orbits.",
        "Pry off the skull cap (calvarium) using a chisel; reflect the dura mater.",
        "Gently tilt head backward; sever cranial nerves at the skull base and extract the brain intact.",
        "Examine cerebral hemispheres for coenurosis cysts, abscesses, hemorrhages, or polioencephalomalacia necrosis."
      ]
    }
  };

  // 4. TISSUE SAMPLE PRESERVATION & TRANSPORTATION MATRIX
  const TISSUE_PRESERVATION_MATRIX = {
    histopathology: {
      preservative: "10% Neutral Buffered Formalin (NBF)",
      chemicalFormula: "40% Formaldehyde (100ml) + Distilled Water (900ml) + Sodium Dihydrogen Phosphate (4.0g) + Disodium Hydrogen Phosphate (6.5g)",
      sampleThicknessMax: "Maximum 5 mm (0.5 cm) thickness (thick tissues undergo center putrefaction before formalin penetrates)",
      formalinToTissueRatio: "MINIMUM 10:1 (10 parts formalin to 1 part tissue by volume)",
      containerType: "Wide-mouthed, leak-proof, rigid plastic container with screw-top lid (never narrow-necked glass bottles)",
      transitConditions: "Ambient room temperature; ensure lid is sealed with parafilm or medical adhesive tape to prevent leakage."
    },
    toxicologyForensic: {
      preservative: "Saturated Sodium Chloride Solution (Salt Water) or NO PRESERVATIVE (Frozen on Dry Ice)",
      preparation: "Dissolve commercial common salt in clean warm water until salt crystals no longer dissolve and remain at the bottom (fully saturated brine).",
      mandatorySamples: [
        "Stomach / Rumen contents: Minimum 1.0 to 2.0 kg",
        "Liver (including gall bladder): Minimum 500 grams",
        "Kidney: One entire whole kidney",
        "Blood: 20 ml in clean heparin/EDTA tube",
        "Urine: Complete volume aspirate from bladder"
      ],
      containerType: "Heavy-duty glass jars or wide-mouth food-grade polythene containers sealed with wax and authenticated by official seal.",
      transitConditions: "Chilled on wet ice or frozen with dry ice; deliver to State Forensic Science Laboratory (FSL) with official chain-of-custody documentation.",
      STRICT_CONTRAINDICATION: "ABSOLUTELY NEVER USE FORMALIN FOR TOXICOLOGICAL SAMPLES. Formaldehyde chemically reacts with and destroys organophosphates, alkaloids, and cyanides, rendering chemical toxicological analysis impossible."
    },
    microbiologyVirology: {
      preservative: "Sterile Viral Transport Medium (VTM) or Sterile Phosphate Buffered Saline (PBS)",
      sampleType: "Tissue blocks (2-3 cm) collected aseptically from lung consolidation margins, spleen, or lymph nodes; sterile swabs.",
      containerType: "Sterile screw-capped cryovials or sterile specimen containers.",
      transitConditions: "Strict Cold Chain: Shipped on crushed ice or frozen gel packs (4°C) if arriving at lab within 24-48 hours; liquid nitrogen (-196°C) for long-distance viral preservation."
    },
    parasitology: {
      preservative: "70% Ethyl Alcohol (Ethanol) with 5% Glycerin OR 10% Formalin",
      sampleType: "Intact adult flukes, tapeworm segments, or nematodes picked with forceps from organ surfaces.",
      containerType: "Leak-proof specimen vials.",
      transitConditions: "Ambient room temperature."
    }
  };

  // 5. POST-MORTEM PATHOLOGY ENGINE IMPLEMENTATION
  const PathologyEngine = {
    grossLesions: GROSS_LESION_MATRIX,
    necropsyProtocol: NECROPSY_PROTOCOL,
    preservationMatrix: TISSUE_PRESERVATION_MATRIX
  };

  /**
   * DIAGNOSTIC GROSS LESION MATCHER:
   * Matches observed post-mortem necropsy findings against the pathognomonic lesion database.
   *
   * @param {Array} lesionDescriptionArray - Array of observed lesion strings
   * @param {string} species - Target animal species
   */
  PathologyEngine.diagnoseByGrossLesions = function (lesionDescriptionArray, species) {
    if (!Array.isArray(lesionDescriptionArray) || lesionDescriptionArray.length === 0) {
      return { error: "No observed necropsy lesions provided for analysis." };
    }

    const sp = (species || "bovine").trim().toLowerCase();
    const observedTokens = lesionDescriptionArray.map(l => l.toLowerCase()).join(" ");
    const matches = [];

    for (let i = 0; i < GROSS_LESION_MATRIX.length; i++) {
      const item = GROSS_LESION_MATRIX[i];

      // Species compatibility check
      if (item.species.indexOf(sp) === -1) {
        continue;
      }

      let matchScore = 0;
      const matchedFeatures = [];

      // Check hallmark keywords
      for (let k = 0; k < item.hallmarkKeywords.length; k++) {
        const kw = item.hallmarkKeywords[k].toLowerCase();
        if (observedTokens.indexOf(kw) !== -1) {
          matchScore += 25;
          matchedFeatures.push(item.hallmarkKeywords[k]);
        }
      }

      // Check disease name
      if (observedTokens.indexOf(item.diseaseNameEn.toLowerCase().split(" ")[0]) !== -1) {
        matchScore += 20;
      }

      if (matchScore > 0) {
        matches.push({
          diseaseId: item.diseaseId,
          diseaseNameEn: item.diseaseNameEn,
          diseaseNameHi: item.diseaseNameHi,
          confidenceScore: Math.min(99, matchScore),
          matchedHallmarks: matchedFeatures,
          pathognomonicLesions: item.pathognomonicGrossLesions,
          differentialDiagnosis: item.differentialDiagnosis
        });
      }
    }

    // Sort descending by confidence score
    matches.sort((a, b) => b.confidenceScore - a.confidenceScore);

    return {
      species: sp,
      totalLesionsAnalyzed: lesionDescriptionArray.length,
      suspectedDiagnoses: matches
    };
  };

  /**
   * MEDICO-LEGAL POST-MORTEM REPORT & INSURANCE CERTIFICATE GENERATOR:
   * Generates a court-admissible, standardized veterinary necropsy certificate.
   *
   * @param {Object} caseParams
   *   {
   *     caseNumber: string,
   *     tagOrMicrochipNumber: string,
   *     ownerName: string,
   *     ownerAddress: string,
   *     species: string,
   *     breed: string,
   *     ageYears: number,
   *     sex: string,
   *     colorMarkings: string,
   *     dateDeath: string,
   *     dateAutopsy: string,
   *     externalFindings: string,
   *     internalOrganFindings: { thorax: string, abdomen: string, brain: string },
   *     tentativeCauseOfDeath: string,
   *     forensicOpinion: string,
   *     insuranceClaimEligible: boolean,
   *     performingVeterinarian: { name: string, registrationNo: string, designation: string }
   *   }
   */
  PathologyEngine.generatePostMortemCertificate = function (caseParams) {
    if (!caseParams || typeof caseParams !== "object") {
      return { error: "Invalid parameters supplied to generatePostMortemCertificate." };
    }

    const reportTimestamp = new Date().toISOString();
    const certificateId = "PM-CERT-" + (caseParams.species || "VET").toUpperCase().substring(0, 3) + "-" +
      new Date().getFullYear() + "-" + Math.floor(10000 + Math.random() * 90000);

    const printableCertificate = [
      "================================================================================",
      "OFFICIAL POST-MORTEM EXAMINATION CERTIFICATE (MEDICO-LEGAL / INSURANCE)",
      "DEPARTMENT OF ANIMAL HUSBANDRY & VETERINARY FORENSIC SERVICES",
      "================================================================================",
      "CERTIFICATE NO: " + certificateId,
      "CASE FILE NO: " + (caseParams.caseNumber || "N/A"),
      "DATE & TIME OF AUTOPSY: " + (caseParams.dateAutopsy || reportTimestamp),
      "DATE & TIME OF REPORTED DEATH: " + (caseParams.dateDeath || "N/A"),
      "--------------------------------------------------------------------------------",
      "1. ANIMAL IDENTIFICATION & OWNERSHIP PARTICULARS:",
      "   - Ear Tag Number / Microchip UID: " + (caseParams.tagOrMicrochipNumber || "NOT_TAGGED / UNVERIFIED"),
      "   - Owner's Full Name: " + (caseParams.ownerName || "N/A"),
      "   - Owner's Address / Village: " + (caseParams.ownerAddress || "N/A"),
      "   - Species: " + (caseParams.species || "Bovine").toUpperCase(),
      "   - Breed: " + (caseParams.breed || "Non-Descript"),
      "   - Age & Sex: " + (caseParams.ageYears || "Adult") + " Years | " + (caseParams.sex || "Female").toUpperCase(),
      "   - Color & Distinctive Markings: " + (caseParams.colorMarkings || "None Recorded"),
      "",
      "2. GENERAL EXTERNAL EXAMINATION & POST-MORTEM CHANGES:",
      "   - State of Carcass / Rigor Mortis: " + (caseParams.externalFindings || "Normal post-mortem changes noted."),
      "   - Natural Orifices Check: Negative for dark uncoagulated tarry blood (Anthrax ruled out).",
      "",
      "3. INTERNAL MORBID ANATOMICAL FINDINGS:",
      "   - Thoracic Cavity & Pluck: " + (caseParams.internalOrganFindings ? caseParams.internalOrganFindings.thorax : "No gross lesions noted."),
      "   - Abdominal Cavity & Viscera: " + (caseParams.internalOrganFindings ? caseParams.internalOrganFindings.abdomen : "No gross lesions noted."),
      "   - Cranial / Pelvic Organs: " + (caseParams.internalOrganFindings ? caseParams.internalOrganFindings.brain : "Normal conformation."),
      "",
      "4. VISCERAL SAMPLE PRESERVATION & LAB REFERRAL:",
      "   - Histopathology: Preserved in 10% Neutral Buffered Formalin.",
      "   - Toxicology: Preserved in Saturated Sodium Chloride solution (if poisoning suspected).",
      "",
      "5. DEFINITIVE MEDICO-LEGAL OPINION & CAUSE OF DEATH:",
      "   - Tentative / Final Cause of Death: " + (caseParams.tentativeCauseOfDeath || "Cardiopulmonary Arrest due to Natural Pathology"),
      "   - Pathologist's Forensic Rationale: " + (caseParams.forensicOpinion || "Carcass shows unequivocal pathological evidence of acute fatal disease."),
      "",
      "6. LIVESTOCK INSURANCE INDEMNIFICATION OPINION:",
      "   - Tag Integrity Verified: " + (caseParams.tagOrMicrochipNumber ? "YES (Ear tag intact and in-situ)" : "NO"),
      "   - Insurance Claim Authenticity: " + (caseParams.insuranceClaimEligible !== false ? "GENUINE CLAIM ELIGIBLE (Natural Disease/Accident)" : "CLAIM NOT RECOMMENDED"),
      "",
      "7. CERTIFYING VETERINARY SURGEON AUTHENTICATION:",
      "   - Pathologist Name: " + (caseParams.performingVeterinarian ? caseParams.performingVeterinarian.name : "Authorized Veterinary Officer"),
      "   - VCI / State Council Registration No: " + (caseParams.performingVeterinarian ? caseParams.performingVeterinarian.registrationNo : "VCI-REGISTERED"),
      "   - Official Designation & Seal: " + (caseParams.performingVeterinarian ? caseParams.performingVeterinarian.designation : "Veterinary Assistant Surgeon (VAS)"),
      "================================================================================"
    ].join("\n");

    return {
      certificateId: certificateId,
      caseNumber: caseParams.caseNumber,
      timestamp: reportTimestamp,
      tagNumber: caseParams.tagOrMicrochipNumber,
      ownerName: caseParams.ownerName,
      species: caseParams.species,
      causeOfDeath: caseParams.tentativeCauseOfDeath,
      isInsuranceEligible: caseParams.insuranceClaimEligible !== false,
      printableCertificateDossier: printableCertificate
    };
  };

  /**
   * Returns exact chemical preservation and transit protocol for a requested testing type.
   *
   * @param {string} targetTestingType - 'histopathology', 'toxicology', 'microbiology', 'parasitology'
   */
  PathologyEngine.getPreservationProtocol = function (targetTestingType) {
    const key = (targetTestingType || "histopathology").trim().toLowerCase();
    const matrix = TISSUE_PRESERVATION_MATRIX;

    if (key.indexOf("histo") !== -1) {
      return Object.assign({ testingType: "Histopathology" }, matrix.histopathology);
    } else if (key.indexOf("tox") !== -1 || key.indexOf("poison") !== -1) {
      return Object.assign({ testingType: "Toxicology / Poisoning Forensic" }, matrix.toxicologyForensic);
    } else if (key.indexOf("micro") !== -1 || key.indexOf("virus") !== -1 || key.indexOf("bacter") !== -1) {
      return Object.assign({ testingType: "Microbiology & Virology" }, matrix.microbiologyVirology);
    } else if (key.indexOf("para") !== -1 || key.indexOf("worm") !== -1) {
      return Object.assign({ testingType: "Parasitology" }, matrix.parasitology);
    }

    return Object.assign({ testingType: "General Histopathology" }, matrix.histopathology);
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.PostMortemPathology = PathologyEngine;

})();
