// Vetcare AI OS - Veterinary Public Health, One Health Zoonotic Disease Surveillance & Exposure Triage Engine (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. COMPREHENSIVE ZOONOTIC DISEASE DOSSIERS (8 HIGH-THREAT ONE HEALTH PATHOGENS)
  const ZOONOSES_REGISTRY = [
    // ========================================================================
    // 1. RABIES (रेबीज / जलांतक - 100% FATAL ZOONOSIS)
    // ========================================================================
    {
      id: "zoonosis-rabies",
      name: "Rabies / Hydrophobia",
      nameHi: "रेबीज / जलांतक / हाइड्रोफोबिया (100% प्राणघातक जुनोटिक रोग)",
      causativeAgent: "Rabies Lyssavirus (Rhabdoviridae family, bullet-shaped RNA virus)",
      primaryAnimalHosts: ["canine", "feline", "bovine", "bubaline", "equine", "bats", "wild carnivores"],
      humanTransmissionRoutes: [
        "Transdermal bite wounds or scratches inoculated with infectious saliva",
        "Salivary contamination of fresh pre-existing skin cuts, abrasions, or mucous membranes (eyes, mouth)",
        "Organ transplantation (corneal grafts - rare historical human-to-human transmission)"
      ],
      occupationalRiskGroups: [
        "Veterinarians and Veterinary Paravets",
        "Animal Control & Shelter Workers",
        "Dog Catchers & ABC Personnel",
        "Livestock Farmers & Handlers",
        "Abattoir Workers"
      ],
      signsInAnimals: [
        "Prodromal behavioral change: Friendly dogs turn solitary/aggressive; shy dogs turn abnormally affectionate",
        "Furious Rabies: Erratic rage, snapping at imaginary objects ('fly-snapping'), biting stones and iron cages, absence of fear",
        "Paralytic / Dumb Rabies: Lower motor neuron paralysis, 'dropped lower jaw', inability to close mouth, profuse salivation",
        "Altered bark phonation ('howling croup-like' vocal pitch), progressive ataxia, coma, and respiratory death within 10 days"
      ],
      signsInHumans: [
        "Prodromal itching, tingling, paresthesia, or severe burning pain radiating from the healed bite wound site",
        "Hydrophobia: Severe agonizing pharyngeal spasms when attempting to drink liquids, triggered even by the sound of water",
        "Aerophobia: Intense involuntary spasms triggered by a slight draft of ambient air on the skin",
        "Agitation, confusion, hallucinations, alternating with lucid intervals, progressing to autonomic instability, coma, and death"
      ],
      recommendedPpe: "Heavy kevlar-lined bite-proof gloves, polycarbonate face shield, safety goggles, protective fluid-resistant apron, catch pole with quick-release snare.",
      immediateFirstAid: "IMMEDIATE 15-MINUTE WOUND WASH: Flush the bite wound forcefully under running tap water with alkaline carbolic soap (e.g., Lifebuoy/detergent) continuously for at least 15 full minutes. Paint with 10% Povidone-Iodine. SUTURING THE WOUND IS STRICTLY FORBIDDEN.",
      diagnosticTestAnimal: "Post-mortem Direct Fluorescent Antibody Test (DFA / dFAT) on brainstem and cerebellum tissue (Gold Standard); Demonstration of intracytoplasmic Negri bodies on Seller's stain.",
      humanReferralUrgency: "EMERGENCY_STAT"
    },

    // ========================================================================
    // 2. BRUCELLOSIS (ब्रुसेलोसिस / माल्टा फीवर)
    // ========================================================================
    {
      id: "zoonosis-brucellosis",
      name: "Brucellosis / Malta Fever / Undulant Fever",
      nameHi: "ब्रुसेलोसिस / संक्रामक गर्भपात (माल्टा बुखार / लहरदार बुखार)",
      causativeAgent: "Brucella abortus (Cattle/Buffalo), Brucella melitensis (Goats/Sheep), Brucella suis (Pigs)",
      primaryAnimalHosts: ["bovine", "bubaline", "caprine", "ovine", "swine"],
      humanTransmissionRoutes: [
        "Ingestion of unpasteurized raw milk, cheese, butter, or unboiled cream",
        "Direct transdermal contact of abraded skin with infected fetal membranes, placenta, lochia, or aborted fetuses",
        "Inhalation of infectious aerosols in slaughterhouses or calving barns",
        "Accidental accidental conjunctival splash or needle-stick with live Brucella S19 / Rev-1 vaccine"
      ],
      occupationalRiskGroups: [
        "Veterinarians (performing manual dystocia relief or manual removal of placenta)",
        "Dairy Farm Milk Handlers",
        "Abattoir Workers & Meat Dressers",
        "Inseminators & Paravets",
        "Consumers of Raw Dairy Products"
      ],
      signsInAnimals: [
        "Abortion storms in late pregnancy (typically 7th to 8th month in cattle; 3rd to 4th month in goats)",
        "Severe retention of fetal membranes (ROP) with necrotic 'Moroccan leather' caruncles and dirty lochial metritis",
        "Orchitis, epididymitis, and testicular swelling in breeding bulls; hygroma of the knee joints"
      ],
      signsInHumans: [
        "Undulant fever (temperatures spiking in evening waves and remitting in morning)",
        "Drenching profuse nocturnal sweats with characteristic sour/musty odor",
        "Severe migratory arthralgia, lower back pain (sacroiliitis), severe muscular exhaustion, and chronic depression",
        "Unilateral epididymo-orchitis in men; endocarditis and osteomyelitis in chronic untreated cases"
      ],
      recommendedPpe: "Elbow-length obstetrical plastic gloves covered with nitrile examination gloves, fluid-resistant surgical gown, N95 respirator mask, protective eye goggles.",
      immediateFirstAid: "Wash skin thoroughly with soap and warm water immediately after handling calving secretions. If vaccine is accidentally inoculated or splashed into eyes, flush with eyewash and report to infectious disease specialist for 6-week Doxycycline + Rifampicin prophylaxis.",
      diagnosticTestAnimal: "Rose Bengal Plate Test (RBPT) / Serum Agglutination Test (SAT) on blood; Milk Ring Test (MRT) on bulk dairy tank milk; Brucella real-time PCR.",
      humanReferralUrgency: "HIGH_URGENT"
    },

    // ========================================================================
    // 3. ANTHRAX (एंथ्रेक्स / गिल्टी रोग - BLACK ESCHAR)
    // ========================================================================
    {
      id: "zoonosis-anthrax",
      name: "Anthrax / Splenic Fever / Woolsorter's Disease",
      nameHi: "एंथ्रेक्स / गिल्टी रोग (काला छाला / वूलसॉर्टर्स डिजीज)",
      causativeAgent: "Bacillus anthracis (Spore-forming Gram-positive encapsulated bacillus)",
      primaryAnimalHosts: ["bovine", "bubaline", "caprine", "ovine", "equine"],
      humanTransmissionRoutes: [
        "Cutaneous inoculation through minor skin abrasions while handling contaminated animal hides, hair, wool, or bone",
        "Inhalation of aerosolized bacterial spores during sorting of wool, hides, or processing bone meal (Woolsorter's disease)",
        "Ingestion of insufficiently cooked meat derived from infected dead livestock carcasses"
      ],
      occupationalRiskGroups: [
        "Tannery & Leather Workers",
        "Wool Sorters & Carpet Weavers",
        "Veterinarians & Livestock Producers",
        "Bone Meal Mill Workers"
      ],
      signsInAnimals: [
        "Peracute sudden death with zero prior symptoms during grazing",
        "Absence of rigor mortis (cadaver remains completely limp and flaccid)",
        "Dark, tarry, oily, non-clotting blood oozing from all natural body orifices (nostrils, mouth, anus, vulva)",
        "Rapid post-mortem gaseous abdominal ballooning and decomposition"
      ],
      signsInHumans: [
        "Cutaneous Anthrax (95% cases): Painless pruritic papule progressing rapidly to a fluid vesicle, rupturing into a PATHOGNOMONIC COAL-BLACK NECROTIC ESCHAR (Malignant Pustule) surrounded by gelatinous edema",
        "Inhalation Anthrax: Mild fever and cough progressing rapidly to acute severe dyspnea, cyanosis, substernal chest pain, hemorrhagic mediastinitis ('widened mediastinum' on X-ray), and rapid septic shock",
        "Gastrointestinal Anthrax: Severe abdominal pain, hematemesis, violent bloody diarrhea, and peritonitis"
      ],
      recommendedPpe: "Level-3 Protective Gear: Full coveralls (Tyvek), P100/N95 respirator mask, airtight chemical goggles, heavy rubber boots.",
      immediateFirstAid: "STRICT WARNING: DO NOT PERFORM POST-MORTEM ON THE ANIMAL. Wash exposed human skin immediately with chlorhexidine or soap and running water. Do not scrub harshly (prevents micro-abrasions). Report to medical facility for post-exposure prophylactic Ciprofloxacin or Doxycycline.",
      diagnosticTestAnimal: "Blood smear collected from the peripheral ear vein: Stained with polychrome methylene blue (McFadyean's reaction) demonstrating purple square-ended bacilli surrounded by pink-red capsular material.",
      humanReferralUrgency: "EMERGENCY_STAT"
    },

    // ========================================================================
    // 4. BOVINE TUBERCULOSIS (बोवाइन टी.बी.)
    // ========================================================================
    {
      id: "zoonosis-bovine-tb",
      name: "Bovine Tuberculosis (Zoonotic TB)",
      nameHi: "बोवाइन टी.बी. / पशु तपेदिक (माइकोबैक्टीरियम बोविस)",
      causativeAgent: "Mycobacterium bovis (Acid-fast, intracellular slow-growing mycobacterium)",
      primaryAnimalHosts: ["bovine", "bubaline", "caprine", "cervids", "wild mammals"],
      humanTransmissionRoutes: [
        "Ingestion of unpasteurized raw cow or buffalo milk and raw cheese products",
        "Aerosol inhalation in poorly ventilated, overcrowded barn sheds",
        "Direct aerosol or wound contamination in abattoirs during post-mortem lung palpation"
      ],
      occupationalRiskGroups: [
        "Dairy Farm Attendants",
        "Slaughterhouse Meat Inspectors & Dressers",
        "Veterinarians",
        "Rural Populations consuming unboiled farm milk"
      ],
      signsInAnimals: [
        "Chronic, progressive emaciation, wasting, and dull unkempt coat despite adequate feed intake",
        "Low-grade fluctuating fever, chronic intermittent dry hacking cough exacerbated by exercise",
        "Enlargement and induration of retropharyngeal, prescapular, or supramammary lymph nodes",
        "Post-mortem: 'Pearl Disease' (nodular caseous or calcified granulomas across pleura and peritoneum)"
      ],
      signsInHumans: [
        "Extrapulmonary Tuberculosis: Severe cervical lymphadenopathy (Scrofula / swollen neck nodes), gastrointestinal tuberculosis with abdominal pain and malabsorption",
        "Pulmonary TB: Chronic cough with hemoptysis (coughing blood), night sweats, unexplained weight loss, and fatigue",
        "Inherent natural resistance to Pyrazinamide (PZA) - creates clinical complications in standard human anti-tubercular regimens"
      ],
      recommendedPpe: "N95/FFP2 respirator mask, eye protection goggles, rubber gloves, and clean washable aprons in slaughterhouses.",
      immediateFirstAid: "Routinely BOIL ALL MILK for at least 5 minutes of continuous rolling boil before human consumption. If accidentally exposed to infected carcass fluids, wash with alcohol-based antiseptic.",
      diagnosticTestAnimal: "Single Intradermal Comparative Tuberculin Test (SICTT / Comparative Cervical Test) using Bovine and Avian PPD tuberculin; Bovigam Interferon-gamma release assay.",
      humanReferralUrgency: "HIGH_URGENT"
    },

    // ========================================================================
    // 5. LEPTOSPIROSIS (लेप्टोस्पायरोसिस / वेइल्स रोग)
    // ========================================================================
    {
      id: "zoonosis-leptospirosis",
      name: "Leptospirosis / Weil's Disease / Canicola Fever",
      nameHi: "लेप्टोस्पायरोसिस / वेइल्स रोग (संक्रामक पीलिया व गुर्दे की विफलता)",
      causativeAgent: "Leptospira interrogans (Pathogenic spirochetes: Icterohaemorrhagiae, Canicola, Grippotyphosa, Pomona, Hardjo)",
      primaryAnimalHosts: ["rodents", "canine", "bovine", "bubaline", "swine"],
      humanTransmissionRoutes: [
        "Direct contact of broken skin or mucous membranes with urine of infected carrier animals (rats, dogs, cattle)",
        "Wading, swimming, or working in stagnant floodwater, rice paddies, or canals contaminated with rodent urine",
        "Handling infected bovine aborted fetal tissues and uterine discharges"
      ],
      occupationalRiskGroups: [
        "Paddy / Rice Field Agricultural Workers",
        "Sewer & Drainage Workers",
        "Veterinarians & Small Animal Clinicians",
        "Flood Rescue Personnel",
        "Canine Kennel Handlers"
      ],
      signsInAnimals: [
        "Dogs: Acute oliguric renal failure, bright yellow icterus (jaundice), vomiting, hemorrhagic gastroenteritis, petechiae",
        "Cattle/Buffalo: 'Flaccid bag syndrome' (sudden milk drop with blood-tinged, yellow, colostrum-like thick milk), third-trimester abortion storms ('Lepto abortion')"
      ],
      signsInHumans: [
        "Anicteric Phase: Abrupt high fever, severe headache, rigorous chills, and INTENSE SEVERE CALF MUSCLE PAIN (Myalgia)",
        "PATHOGNOMONIC SIGN: BILATERAL CONJUNCTIVAL SUFFUSION (bright red engorgement of conjunctival blood vessels WITHOUT purulent discharge)",
        "Icteric Weil's Disease: Deep jaundice, acute oliguric renal failure, azotemia, pulmonary hemorrhage syndrome (coughing blood), and shock"
      ],
      recommendedPpe: "Waterproof rubber boots (gumboots), heavy water-impermeable nitrile gloves, protective waterproof apron, safety glasses.",
      immediateFirstAid: "Thoroughly scrub skin abrasions and splashes with soap and copious clean water. Disinfect clothing with 10% bleach. High-risk exposures should consult a physician for prophylactic oral Doxycycline (200 mg single weekly dose).",
      diagnosticTestAnimal: "Microscopic Agglutination Test (MAT - Gold Standard); Urine dark-field microscopy; Leptospira real-time PCR on blood and urine.",
      humanReferralUrgency: "HIGH_URGENT"
    },

    // ========================================================================
    // 6. CYSTICERCOSIS & ECHINOCOCCOSIS (फीताकृमि / हाइडैटिड सिस्ट)
    // ========================================================================
    {
      id: "zoonosis-tapeworm-cysts",
      name: "Cysticercosis & Echinococcosis / Hydatid Disease",
      nameHi: "न्यूरोसिस्टिसरकोसिस व हाइडैटिड रोग (मस्तिष्क व यकृत में परजीवी गांठें)",
      causativeAgent: "Taenia solium (Pork tapeworm), Taenia saginata (Beef tapeworm), Echinococcus granulosus (Hydatid tapeworm)",
      primaryAnimalHosts: ["swine", "bovine", "canine", "ovine"],
      humanTransmissionRoutes: [
        "NEUROCYSTICERCOSIS: Fecal-oral ingestion of microscopic Taenia solium eggs via water, raw vegetables, or unwashed hands of human tapeworm carriers",
        "HYDATID CYSTS: Accidental ingestion of Echinococcus granulosus eggs shed in the feces of infected domestic farm dogs",
        "TENIASIS: Ingestion of raw or undercooked measly pork ('Cysticercus cellulosae') or measly beef ('Cysticercus bovis')"
      ],
      occupationalRiskGroups: [
        "Rural Communities with poor sanitation and free-ranging pigs",
        "Dog Owners & Sheep Pastoralists",
        "Abattoir Workers & Meat Handlers",
        "Consumers of Raw / Rare Meat"
      ],
      signsInAnimals: [
        "Livestock (Intermediate hosts): Usually asymptomatic. Fluid-filled cystic vesicles embedded in skeletal muscles (heart, tongue, masseters, diaphragm).",
        "Dogs (Definitive hosts of Echinococcus): Harbors thousands of tiny 3-6 mm adult tapeworms in small intestine without overt illness."
      ],
      signsInHumans: [
        "Neurocysticercosis (NCC): Larvae encyst within human brain parenchyma, causing new-onset adult epileptic seizures, severe intracranial hypertension, headaches, and focal motor deficits",
        "Hydatidosis: Slowly expanding unilocular hydatid cysts in the liver (75%) and lungs (20%), causing right upper quadrant pain, hepatomegaly, bile duct obstruction, and fatal anaphylactic shock if the cyst ruptures"
      ],
      recommendedPpe: "Disposable gloves when handling dog feces, collecting fecal samples, or performing meat post-mortem inspections.",
      immediateFirstAid: "MANDATORY FOOD HYGIENE: Wash all raw vegetables and fruits thoroughly with clean potable water. Cook pork and beef to an internal core temperature of at least 71°C (160°F). Deworm all farm dogs quarterly with Praziquantel (5 mg/kg).",
      diagnosticTestAnimal: "Slaughterhouse meat inspection: Systematic deep incisions into masseter muscles, heart myocardium, and ventral tongue surface for cysticerci; Canine fecal flotation and copro-antigen ELISA for Echinococcus.",
      humanReferralUrgency: "HIGH_URGENT"
    },

    // ========================================================================
    // 7. GLANDERS (ग्लैंडर्स / फारसी रोग - SOLIPED ZOONOSIS)
    // ========================================================================
    {
      id: "zoonosis-glanders",
      name: "Glanders / Farcy",
      nameHi: "ग्लैंडर्स / फारसी रोग (अश्व जनित घातक गांठदार रोग)",
      causativeAgent: "Burkholderia mallei (Gram-negative non-motile aerobic bacillus)",
      primaryAnimalHosts: ["equine"],
      humanTransmissionRoutes: [
        "Direct cutaneous inoculation of infected nasal discharges or skin ulcer pus ('Farcy pipes') through minor cuts or abrasions",
        "Mucosal contamination via droplets entering eyes, nose, or mouth during close handling of sick horses or grooming gear",
        "Laboratory aerosol exposure (Tier-1 Select Agent / High containment pathogen)"
      ],
      occupationalRiskGroups: [
        "Equine Veterinarians & Handlers",
        "Grooms & Stable Hands",
        "Farriers & Horse Shoers",
        "Veterinary Diagnostic Microbiologists"
      ],
      signsInAnimals: [
        "Nasal Form: Stellate (star-shaped) mucosal ulcers on nasal septum, tenacious greenish-yellow discharge, indurated submandibular lymphadenopathy",
        "Farcy Form: Strings of swollen, beaded, nodular lymphatic vessels along legs ('Farcy buds') that ulcerate discharging oily pus",
        "Pulmonary Form: Tubercular nodules in lungs with chronic unresolving coughing and wasting"
      ],
      signsInHumans: [
        "Localized Cutaneous Form: Painful nodule at inoculation site, lymphangitis, regional adenopathy, and ulceration within 1-5 days",
        "Pulmonary Form: Pneumonia, pulmonary abscesses, pleural effusion, and chest pain",
        "Septicemic Form: High spiking fever, chills, widespread pustular skin eruptions, multi-organ abscessation, and >95% fatality if untreated"
      ],
      recommendedPpe: "Biosafety Level 3 precautions: N95 respirator, fluid-resistant coveralls, double nitrile gloves, splash-proof eye goggles.",
      immediateFirstAid: "IMMEDIATE ANIMAL ISOLATION. Wash human skin splashes with 70% alcohol or povidone-iodine. Do not lance Farcy buds. Report immediately to infectious disease hospital for prophylactic Ceftazidime, Doxycycline, or Meropenem.",
      diagnosticTestAnimal: "Mallein Intradermo-Palpebral Test (swelling and purulent conjunctivitis at 24-48 hours); Complement Fixation Test (CFT) / ELISA.",
      humanReferralUrgency: "EMERGENCY_STAT"
    },

    // ========================================================================
    // 8. HIGHLY PATHOGENIC AVIAN INFLUENZA (बर्ड फ्लू)
    // ========================================================================
    {
      id: "zoonosis-avian-flu",
      name: "Avian Influenza / Bird Flu (HPAI H5N1 / H7N9)",
      nameHi: "एवियन इन्फ्लूएंजा / बर्ड फ्लू (घातक पोल्ट्री श्वसन वायरस)",
      causativeAgent: "Influenza A Virus (H5N1, H5N6, H5N8, H7N9 high-pathogenicity strains)",
      primaryAnimalHosts: ["avian"],
      humanTransmissionRoutes: [
        "Direct inhalation of infectious aerosol droplets or dried feather/fecal dust in poultry sheds and live bird wet markets",
        "Direct manual contact with surfaces, water troughs, or cages contaminated with infected poultry feces or secretions",
        "Dressing, de-feathering, butchering, and handling sick or dead infected birds with bare hands"
      ],
      occupationalRiskGroups: [
        "Poultry Farm Attendants & Culled Depopulation Workers",
        "Live Bird Market Vendors & Butchers",
        "Veterinarians & Field Disease Surveillance Officers",
        "Backyard Poultry Keepers"
      ],
      signsInAnimals: [
        "Peracute catastrophic flock mortality reaching 90-100% within 24-48 hours",
        "Severe cyanosis and dark purplish-black discoloration of comb and wattles",
        "Edema of the head, face, and periorbital tissues; ecchymotic hemorrhages on unfeathered shanks and feet",
        "Profuse watery, fluorescent green diarrhea with respiratory gasping"
      ],
      signsInHumans: [
        "Rapid onset of high fever (>101°F / >38.5°C), sore throat, rhinorrhea, and severe myalgia",
        "Severe Acute Respiratory Distress Syndrome (ARDS): Rapidly progressive viral interstitial pneumonia, bilateral pulmonary consolidations, and multi-organ failure",
        "Case fatality rate in confirmed human H5N1 infections exceeds 50%"
      ],
      recommendedPpe: "Full Level-3 Biohazard PPE: Disposable particulate N95/FFP3 respirator mask, airtight chemical goggles, Tyvek impervious hooded coveralls, heavy nitrile gloves, rubber boots with boot covers.",
      immediateFirstAid: "STRICT WARNING: TREATMENT OF INFECTED BIRDS IS ILLEGAL. Quarantine flock immediately. If exposed without PPE, shower thoroughly with soap, decontaminate clothes, and monitor body temperature twice daily. Consult physician immediately for Oseltamivir (Tamiflu 75 mg BD) antiviral prophylaxis.",
      diagnosticTestAnimal: "Real-time Reverse Transcription Polymerase Chain Reaction (rRT-PCR) targeting Matrix (M) and Hemagglutinin (H5) genes; rapid antigen immunoassay.",
      humanReferralUrgency: "EMERGENCY_STAT"
    }
  ];

  // 3. WHO POST-EXPOSURE PROPHYLAXIS (PEP) FOR RABIES
  const WHO_RABIES_PEP_PROTOCOL = {
    categories: [
      {
        category: "Category I",
        descriptionEn: "Touching or feeding animals, animal licks on intact healthy skin, zero skin breach.",
        descriptionHi: "पशु को छूना या खाना खिलाना, सामान्य बिना कटी त्वचा को चाटना।",
        pepRequired: "NONE",
        actionEn: "Wash exposed skin thoroughly with soap and water. No vaccine or RIG required if history is reliable."
      },
      {
        category: "Category II",
        descriptionEn: "Minor scratches or abrasions without bleeding, or nibbling of uncovered skin.",
        descriptionHi: "बिना खून निकले हल्की खरोंच या त्वचा का हल्का छिलना।",
        pepRequired: "IMMEDIATE WOUND WASHING + ANTI-RABIES VACCINE (ARV)",
        actionEn: "Immediate 15-minute vigorous wound washing with soap and running water. Administer full course of Anti-Rabies Vaccine (ARV) on Days 0, 3, 7, 14, and 28. Rabies Immunoglobulin is not indicated unless the patient is immunocompromised."
      },
      {
        category: "Category III",
        descriptionEn: "Single or multiple transdermal bites or scratches with bleeding, licks on broken skin, contamination of mucous membranes with saliva, or any direct contact with bats.",
        descriptionHi: "खून निकलने वाले गहरे दांत के घाव, कटी त्वचा या आंख-मुंह पर लार लगना।",
        pepRequired: "WOUND WASHING + RABIES IMMUNOGLOBULIN (RIG) + ANTI-RABIES VACCINE (ARV)",
        actionEn: "1. VIGOROUS WOUND WASHING for 15 minutes continuously with soap and water. Paint with 10% Povidone-Iodine. SUTURING STRICTLY DELAYED/FORBIDDEN. 2. INFILTRATE RABIES IMMUNOGLOBULIN (RIG: Equine ERIG @ 40 IU/kg or Human HRIG @ 20 IU/kg) deep into and around ALL wound margins. 3. COMPLETE ARV REGIMEN on Days 0, 3, 7, 14, and 28."
      }
    ],

    vaccinationSchedules: {
      essenIntramuscular: "5-Dose Essen Regimen: 1.0 ml or 0.5 ml (as per brand) injected IM in the DELTOID MUSCLE (never gluteal) on Days 0, 3, 7, 14, and 28.",
      thaiRedCrossIntradermal: "Updated 2-Site Intradermal Regimen (2-2-2-0-2): 0.1 ml injected intradermally at two distinct anatomical sites (deltoids/thighs) on Days 0, 3, 7, and 28."
    },

    criticalRabiesDirectives: [
      "CRITICAL: ABSOLUTELY NEVER SUTURE BITE WOUNDS IMMEDIATELY. Suturing drives the neurotropic virus deeper into torn peripheral nerve endings. If essential for massive vascular reconstruction, apply loose sutures ONLY after thorough RIG infiltration.",
      "NEVER INJECT ARV INTO THE GLUTEAL REGION (GLUTEUS): Fat tissue in the buttocks impedes antigen presentation and is proven to cause fatal vaccine failures. Always use the Deltoid muscle in adults (anterolateral thigh in young children).",
      "RIG must be administered on Day 0, or at the latest within 7 days of the first vaccine dose (after Day 7, active antibody production commences)."
    ]
  };

  // 4. SAFE FOOD HYGIENE & RESIDUE SAFEGUARDS
  const FOOD_SAFETY_ONEHEALTH_GUIDANCE = {
    milkPasteurizationStandards: {
      domesticBoiling: "Continuous rolling boil for at least 3 to 5 minutes destroys Mycobacterium bovis, Brucella, Coxiella burnetii, and Salmonella.",
      htstCommercialPasteurization: "High-Temperature Short-Time: 72°C (161°F) for at least 15 continuous seconds followed by rapid chilling to <4°C.",
      ltltVatPasteurization: "Low-Temperature Long-Time: 63°C (145°F) for at least 30 continuous minutes."
    },
    meatCoreCookingTemperatures: {
      beefChevonMutton: "Cook to an internal core temperature of at least 71°C (160°F) measured with a meat thermometer.",
      pork: "Cook to an internal core temperature of at least 71°C (160°F) to ensure 100% thermal destruction of Cysticercus cellulosae and Trichinella spiralis.",
      poultry: "Cook chicken and duck meat to an internal core temperature of at least 74°C (165°F) to inactivate avian influenza viruses and Campylobacter."
    },
    abattoirHygieneDirectives: [
      "Never harvest or dress carcasses showing acute high fever, localized abscesses, or abnormal splenic enlargement.",
      "Thoroughly wash hands with soap and hot water after touching raw meat; sterilize cutting knives in boiling water (82°C) between carcasses.",
      "Use separate cutting boards for raw meat and ready-to-eat vegetables to prevent cross-contamination."
    ]
  };

  // 5. ONE HEALTH ENGINE IMPLEMENTATION
  const OneHealthEngine = {
    registry: ZOONOSES_REGISTRY,
    whoRabiesProtocol: WHO_RABIES_PEP_PROTOCOL,
    foodSafety: FOOD_SAFETY_ONEHEALTH_GUIDANCE
  };

  /**
   * Fetches full epidemiological profile of a zoonotic disease by ID.
   */
  OneHealthEngine.getZoonosisById = function (id) {
    if (!id || typeof id !== "string") return null;
    const cleanId = id.trim().toLowerCase();
    const list = ZOONOSES_REGISTRY || [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].id.toLowerCase() === cleanId) return list[i];
    }
    return null;
  };

  /**
   * HUMAN EXPOSURE RISK EVALUATOR & TRIAGE PATHWAY:
   * Assesses clinical exposure risk and generates immediate actionable First-Aid and Medical Referral notes.
   *
   * @param {string} suspectedZoonosisId - e.g., 'zoonosis-rabies', 'zoonosis-brucellosis'
   * @param {string} exposureType - 'bite_deep', 'scratch', 'saliva_contact', 'unpasteurized_milk', 'aborted_placenta_handling', 'splash_to_eye'
   * @param {boolean} animalVaccinationStatus - True if biting/source animal is certified fully vaccinated
   */
  OneHealthEngine.assessHumanExposure = function (suspectedZoonosisId, exposureType, animalVaccinationStatus) {
    const disease = OneHealthEngine.getZoonosisById(suspectedZoonosisId);
    if (!disease) {
      return { error: "Zoonotic pathogen ID '" + suspectedZoonosisId + "' not recognized." };
    }

    const exp = (exposureType || "bite_deep").trim().toLowerCase();
    const isVaccinated = Boolean(animalVaccinationStatus);

    let riskLevel = "MODERATE";
    let immediateActionStepsEn = [];
    let immediateActionStepsHi = [];
    let medicalReferralNote = "";

    // 1. Rabies Exposure Triage
    if (disease.id === "zoonosis-rabies") {
      if (exp === "bite_deep" || exp === "splash_to_eye" || (exp === "scratch" && !isVaccinated)) {
        riskLevel = "CRITICAL";
        immediateActionStepsEn = [
          "1. WASH WOUND IMMEDIATELY for 15 continuous minutes with running tap water and soap.",
          "2. Apply 10% Povidone-Iodine antiseptic. DO NOT BANDAGE TIGHTLY.",
          "3. STRICTLY DO NOT SUTURE THE BITE WOUND.",
          "4. PROCEED TO EMERGENCY HOSPITAL FOR RABIES IMMUNOGLOBULIN (RIG) & VACCINE."
        ];
        immediateActionStepsHi = [
          "1. घाव को तुरंत बहते नल के पानी और साबुन से लगातार 15 मिनट तक अच्छी तरह धोएं।",
          "2. 10% पोविडोन-आयोडीन (बीटाडीन) लगाएं। घाव को कसकर न बांधें।",
          "3. घाव पर तुरंत टांके (टांका लगाना) बिल्कुल सख्त मना है।",
          "4. तुरंत नजदीकी सरकारी अस्पताल जाकर रेबीज इम्यूनोग्लोबुलिन (RIG) व रेबीज का टीका लगवाएं।"
        ];
        medicalReferralNote = "URGENT ONE HEALTH REFERRAL: WHO Category III Rabies exposure. Patient requires immediate wound infiltration with Rabies Immunoglobulin (RIG 20-40 IU/kg) and initiation of the 5-dose intramuscular Anti-Rabies Vaccine series (Day 0).";
      } else {
        riskLevel = "HIGH";
        immediateActionStepsEn = [
          "Wash thoroughly with soap and water for 15 minutes.",
          "Proceed to health center for Anti-Rabies Vaccine (Day 0, 3, 7, 14, 28)."
        ];
        immediateActionStepsHi = [
          "साबुन और पानी से 15 मिनट तक धोएं।",
          "तुरंत अस्पताल जाकर एंटी-रेबीज वैक्सीन (Day 0, 3, 7, 14, 28) शुरू करवाएं।"
        ];
        medicalReferralNote = "WHO Category II Rabies Exposure. Administer prompt active vaccination series.";
      }
    }
    // 2. Brucellosis Exposure Triage
    else if (disease.id === "zoonosis-brucellosis") {
      if (exp === "aborted_placenta_handling" || exp === "unpasteurized_milk") {
        riskLevel = "HIGH";
        immediateActionStepsEn = [
          "1. Wash hands, forearms, and face thoroughly with warm water and disinfectant soap.",
          "2. If splashing occurred to eyes, flush with sterile eyewash for 15 minutes.",
          "3. Disinfect clothing with 0.5% bleach solution.",
          "4. Consult infectious disease physician regarding post-exposure Doxycycline prophylaxis."
        ];
        immediateActionStepsHi = [
          "1. हाथों और चेहरे को साबुन और गुनगुने पानी से तुरंत अच्छी तरह धोएं।",
          "2. आंखों में छींटे पड़े हों तो 15 मिनट तक साफ पानी से धोएं।",
          "3. कपड़ों को ब्लीच के घोल से कीटाणुरहित करें।",
          "4. डॉक्टर से मिलकर ब्रुसेलोसिस बचाव हेतु डॉक्सीसाइक्लिन दवा की सलाह लें।"
        ];
        medicalReferralNote = "Occupational Brucellosis Exposure: High risk of Brucella abortus/melitensis transmission via aborted placenta or raw milk. Baseline serology and 6-week Doxycycline + Rifampicin protocol indicated.";
      }
    }
    // 3. Anthrax Exposure Triage
    else if (disease.id === "zoonosis-anthrax") {
      riskLevel = "CRITICAL";
      immediateActionStepsEn = [
        "1. DO NOT TOUCH OR DISTURB THE ANIMAL CARCASS.",
        "2. Wash skin vigorously with soap and warm water; do not scrape skin.",
        "3. Seek immediate emergency medical care for oral Ciprofloxacin prophylaxis (500mg BD for 60 days)."
      ];
      immediateActionStepsHi = [
        "1. मृत पशु के शव को बिल्कुल न छुएं और न ही चीर-फाड़ करें।",
        "2. त्वचा को साबुन और पानी से धोएं, जोर से रगड़ें नहीं।",
        "3. तुरंत आपातकालीन अस्पताल जाकर सिप्रोफ्लोक्सासिन एंटीबायोटिक रोकथाम शुरू करवाएं।"
      ];
      medicalReferralNote = "Bacillus anthracis Exposure Alert: Patient exposed to suspected anthrax biological tissue. Post-exposure antimicrobial prophylaxis and public health tracking required.";
    }
    // 4. Default / General Zoonosis Exposure
    else {
      riskLevel = "HIGH";
      immediateActionStepsEn = [
        "Wash exposed skin or wound with antiseptic soap and water for 10 minutes.",
        "Seek medical evaluation at a hospital emergency department."
      ];
      immediateActionStepsHi = [
        "प्रभावित त्वचा या घाव को 10 मिनट तक साबुन और पानी से अच्छी तरह धोएं।",
        "तुरंत नजदीकी अस्पताल में डॉक्टर से संपर्क करें।"
      ];
      medicalReferralNote = "One Health Zoonotic Exposure Alert: Contact with suspected " + disease.name + ". Medical assessment recommended.";
    }

    return {
      zoonosisId: disease.id,
      nameEn: disease.name,
      nameHi: disease.nameHi,
      exposureType: exp,
      animalVaccinated: isVaccinated,
      riskLevel: riskLevel,
      humanReferralUrgency: disease.humanReferralUrgency,
      immediateActionStepsEn: immediateActionStepsEn,
      immediateActionStepsHi: immediateActionStepsHi,
      medicalReferralNote: medicalReferralNote
    };
  };

  /**
   * Returns WHO Post-Exposure Prophylaxis protocol for a specific bite wound category (I, II, or III).
   */
  OneHealthEngine.getRabiesPostExposureProtocol = function (biteCategory) {
    const catStr = (biteCategory || "Category III").trim();
    const matched = WHO_RABIES_PEP_PROTOCOL.categories.find(
      c => c.category.toLowerCase().indexOf(catStr.toLowerCase()) !== -1
    );

    return {
      categoryDetails: matched || WHO_RABIES_PEP_PROTOCOL.categories[2],
      vaccinationSchedules: WHO_RABIES_PEP_PROTOCOL.vaccinationSchedules,
      criticalDirectives: WHO_RABIES_PEP_PROTOCOL.criticalDirectives
    };
  };

  /**
   * Returns certified One Health food safety guidelines for milk and meat.
   */
  OneHealthEngine.getSafeFoodGuidance = function () {
    return Object.assign({}, FOOD_SAFETY_ONEHEALTH_GUIDANCE);
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.ZoonosesOneHealth = OneHealthEngine;

})();
