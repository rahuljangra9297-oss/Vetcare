// Vetcare AI OS - Multi-Species Preventive Vaccination Schedules, Cold Chain Protocols & Booster Reminders (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. MASTER MULTI-SPECIES IMMUNIZATION SCHEDULES (COMPREHENSIVE ZERO-PLACEHOLDER DOSSIERS)
  const MASTER_VACCINE_REGISTRY = [
    // ------------------------------------------------------------------------
    // BOVINE & BUBALINE (CATTLE & BUFFALO) PROTOCOLS
    // ------------------------------------------------------------------------
    {
      vaccineId: "bovine-fmd",
      diseaseName: "Foot and Mouth Disease (FMD / Aphthovirus)",
      diseaseNameHi: "खुरपका-मुँहपका रोग (एफ.एम.डी.)",
      species: ["bovine", "bubaline"],
      primaryAgeDays: 120,
      primaryAgeText: "4 Months (120 Days)",
      boosterIntervalDays: 30,
      revaccinationCycleMonths: 6,
      doseVolume: "2.0 ml or 3.0 ml (as per manufacturer/oil adjuvant formulation)",
      route: "SC",
      coldChainStorage: "2°C to 8°C (Cold Chain mandatory). Protect from direct light. NEVER FREEZE.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Do not vaccinate sick, emaciated, or clinically febrile animals (Body Temp >102.5°F).",
        "Avoid heavy vaccination stress in the advanced final month of pregnancy.",
        "Never administer during an active clinical FMD outbreak to avoid incubation shock."
      ],
      governmentProgram: "National Animal Disease Control Programme (NADCP / DAHD-GoI)",
      notes: "Trivalent inactivated vaccine containing O, A, and Asia-1 serotypes. Routine mass immunization carried out bi-annually (Pre-monsoon and Winter rounds)."
    },
    {
      vaccineId: "bovine-hs",
      diseaseName: "Haemorrhagic Septicaemia (HS / Pasteurella multocida B:2)",
      diseaseNameHi: "गलघोंटू रोग (एच.एस.)",
      species: ["bovine", "bubaline"],
      primaryAgeDays: 180,
      primaryAgeText: "6 Months (180 Days)",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 12,
      doseVolume: "2.0 ml (Alum precipitated) / 3.0 ml (Oil adjuvant)",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Shake thoroughly before administration. Do not freeze.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Do not vaccinate animals with severe parasitic debility or active respiratory disease.",
        "Avoid injecting unconstituted or frozen vaccine emulsions."
      ],
      governmentProgram: "Livestock Health & Disease Control (LH&DC) State Mandatory Campaign",
      notes: "Pre-monsoon immunization is strictly mandatory during May-June before rain onset. Oil adjuvant provides immunity for 12 months; alum precipitated provides 6 months."
    },
    {
      vaccineId: "bovine-bq",
      diseaseName: "Black Quarter (BQ / Clostridium chauvoei)",
      diseaseNameHi: "ब्लैक क्वार्टर / लंगड़ा बुखार (बी.क्यू.)",
      species: ["bovine", "bubaline"],
      primaryAgeDays: 180,
      primaryAgeText: "6 Months (180 Days)",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 12,
      doseVolume: "2.0 ml (Formalin-killed anaculture)",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Do not freeze.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Do not vaccinate calves under 3 months of age (maternal antibody interference).",
        "Do not administer to clinically sick or immunosuppressed animals."
      ],
      governmentProgram: "National Livestock Health & Disease Control (LH&DC)",
      notes: "Annual pre-monsoon vaccination (May-June). Highly vulnerable in young, fast-growing crossbred cattle aged 6 months to 2 years."
    },
    {
      vaccineId: "bovine-brucellosis",
      diseaseName: "Brucellosis (Brucella abortus Cotton Strain 19 / S19)",
      diseaseNameHi: "संक्रामक गर्भपात / ब्रुसेलोसिस (ब्रुवैक्स एस-19)",
      species: ["bovine", "bubaline"],
      primaryAgeDays: 120,
      primaryAgeText: "4 to 8 Months of Age (Female Calves Only)",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 0,
      doseVolume: "2.0 ml (Live attenuated lyophilized)",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Reconstitute with chilled diluent; use within 2 hours. Keep on ice.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "STRICT PROHIBITION: ABSOLUTELY NEVER VACCINATE MALE ANIMALS (induces permanent orchitis, epididymitis, and sterility).",
        "STRICT PROHIBITION: NEVER VACCINATE ADULT OR PREGNANT FEMALES (triggers violent acute abortion and permanent seropositivity).",
        "ZOONOTIC DANGER: Accidental self-injection in humans causes severe undulant fever (Malta fever)."
      ],
      governmentProgram: "National Brucellosis Control Programme (NADCP 100% Female Calfhood)",
      notes: "ONCE IN A LIFETIME VACCINATION. Only administered to female calves between 4 to 8 months of age. Ear-tagged with specialized 12-digit INAPH blue tag."
    },
    {
      vaccineId: "bovine-lsd",
      diseaseName: "Lumpy Skin Disease (Goat Pox Strain / Homologous LSD Vaccine)",
      diseaseNameHi: "लंपी त्वचा रोग (एल.एस.डी.)",
      species: ["bovine", "bubaline"],
      primaryAgeDays: 120,
      primaryAgeText: "4 Months of Age",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 12,
      doseVolume: "3.0 ml (Goat pox 10^3.5 TCID50 equivalent heterologous) or 1.0 ml homologous",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Store freeze-dried powder strictly refrigerated.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Do not vaccinate animals actively displaying cutaneous lumpy nodules.",
        "Avoid vaccinating cows within 15 days before or after parturition."
      ],
      governmentProgram: "Emergency Livestock Disease Containment Protocol (DAHD-GoI)",
      notes: "Annual revaccination recommended in pre-summer vector season (February-March) to halt fly and mosquito-borne transmission."
    },
    {
      vaccineId: "bovine-theileriosis",
      diseaseName: "Bovine Theileriosis (Theileria annulata Schizont Cell-Culture Vaccine)",
      diseaseNameHi: "थायलेरिया रोग (रकटाणु-परजीवी टीका)",
      species: ["bovine", "bubaline"],
      primaryAgeDays: 60,
      primaryAgeText: "2 Months (60 Days) and Above in Crossbreds",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 36,
      doseVolume: "3.0 ml (Cryopreserved in Liquid Nitrogen)",
      route: "SC",
      coldChainStorage: "Stored in Liquid Nitrogen container (-196°C). Thaw at 37°C in water bath; inject within 30 minutes.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Do not vaccinate exotic or crossbred calves suffering from acute clinical illness, tick fever, or severe anemia (PCV <20%).",
        "Do not vaccinate pregnant animals in advanced gestation."
      ],
      governmentProgram: "State Dairy Federation Special Crossbred Immunization Initiative",
      notes: "Crucial for all crossbred (HF / Jersey cross) and exotic dairy cattle. Provides durable cell-mediated immunity for up to 3 years."
    },

    // ------------------------------------------------------------------------
    // CAPRINE & OVINE (GOAT & SHEEP) PROTOCOLS
    // ------------------------------------------------------------------------
    {
      vaccineId: "caprine-ppr",
      diseaseName: "Peste des Petits Ruminants (PPR / Goat Plague / Morbillivirus)",
      diseaseNameHi: "बकरी प्लेग / पी.पी.आर. रोग",
      species: ["caprine", "ovine"],
      primaryAgeDays: 90,
      primaryAgeText: "3 to 4 Months (90-120 Days)",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 36,
      doseVolume: "1.0 ml (Live attenuated Sungri-96 strain)",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Reconstitute with chilled sterile normal saline; utilize within 2 hours. Protect from sunlight.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Do not vaccinate pregnant does/ewes in the final month of gestation.",
        "Do not administer to kids/lambs under 3 months possessing high maternal antibodies."
      ],
      governmentProgram: "PPR Eradication Programme (PPR-EP / DAHD 100% Central Assistance)",
      notes: "Delivers robust life-long or minimum 3-year herd immunity. Essential pillar of the Global PPR Eradication Campaign."
    },
    {
      vaccineId: "caprine-et",
      diseaseName: "Enterotoxaemia (ET / Pulpy Kidney / Clostridium perfringens Type D)",
      diseaseNameHi: "फिड़किया रोग / एंटरोटॉक्सीमिया (ई.टी.)",
      species: ["caprine", "ovine"],
      primaryAgeDays: 120,
      primaryAgeText: "4 Months of Age",
      boosterIntervalDays: 21,
      revaccinationCycleMonths: 12,
      doseVolume: "2.0 ml (Formalin-killed alum-precipitated toxoid)",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Shake well before use. Do not freeze.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Do not vaccinate animals showing signs of acute diarrhea or ruminal acid indigestion.",
        "Do not skip the mandatory 21-day primary booster in first-time vaccinated young lambs."
      ],
      governmentProgram: "State Sheep and Wool Development Board Annual Pre-Monsoon Drive",
      notes: "Annual pre-monsoon vaccination (May-June). Highly recommended prior to moving sheep to rich, lush green post-rain pastures."
    },
    {
      vaccineId: "caprine-pox",
      diseaseName: "Goat Pox & Sheep Pox (Capripoxvirus)",
      diseaseNameHi: "बकरी व भेड़ चेचक (पॉक्स रोग)",
      species: ["caprine", "ovine"],
      primaryAgeDays: 90,
      primaryAgeText: "3 Months (90 Days)",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 12,
      doseVolume: "1.0 ml (Live attenuated Uttarkashi / Romanian strain)",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Reconstitute with chilled diluent; consume within 2 hours.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Avoid vaccinating in flocks during active widespread pox outbreak (use strict quarantine instead).",
        "Do not administer to kids under 2 months of age."
      ],
      governmentProgram: "State Animal Husbandry Department Annual Livestock Protection",
      notes: "Annual vaccination during November-December prior to peak winter viral surge."
    },
    {
      vaccineId: "caprine-ccpp",
      diseaseName: "Contagious Caprine Pleuropneumonia (CCPP / Mycoplasma capricolum subsp. capripneumoniae)",
      diseaseNameHi: "संक्रामक बकरी फेफड़ा रोग (सी.सी.पी.पी.)",
      species: ["caprine"],
      primaryAgeDays: 90,
      primaryAgeText: "3 Months (90 Days)",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 12,
      doseVolume: "1.0 ml (Inactivated saponin-adjuvanted bacterin)",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Do not freeze.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Do not inject intramuscularly; administer strictly subcutaneous in the lower side of the neck.",
        "Do not vaccinate moribund or severely coughing goats."
      ],
      governmentProgram: "Regional Targeted Endemic Control Protocol",
      notes: "Annual pre-winter booster essential in migratory and high-density hill goat flocks."
    },
    {
      vaccineId: "ovine-bluetongue",
      diseaseName: "Bluetongue (Orbivirus Culicoides-borne Infection)",
      diseaseNameHi: "भेड़ का नीली जीभ रोग (ब्लू टंग)",
      species: ["ovine"],
      primaryAgeDays: 120,
      primaryAgeText: "4 Months of Age",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 12,
      doseVolume: "1.0 ml or 2.0 ml (Pentavalent inactivated adjuvant vaccine)",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Protect from sunlight. Do not freeze.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Avoid vaccinating ewes during tupping/breeding season or early gestation (teratogenic risk with live strains).",
        "Do not vaccinate in mid-summer heat stress."
      ],
      governmentProgram: "State Inter-State Border Vector Containment Scheme",
      notes: "Annual pre-monsoon vaccination (August-September) coinciding with high midge (Culicoides) vector proliferation."
    },

    // ------------------------------------------------------------------------
    // EQUINE (HORSES, MULES, DONKEYS) PROTOCOLS
    // ------------------------------------------------------------------------
    {
      vaccineId: "equine-tetanus",
      diseaseName: "Equine Tetanus Toxoid (Clostridium tetani)",
      diseaseNameHi: "अश्व धनुस्तंभ टीका (टिटनेस टॉक्सॉइड)",
      species: ["equine"],
      primaryAgeDays: 120,
      primaryAgeText: "3 to 4 Months of Age in Foals",
      boosterIntervalDays: 30,
      revaccinationCycleMonths: 12,
      doseVolume: "1.0 ml (Purified aluminum hydroxide adsorbed toxoid)",
      route: "IM",
      coldChainStorage: "2°C to 8°C. Never freeze (freezing precipitates adjuvant).",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Do not confuse with Tetanus Antitoxin (TAT). Toxoid is for active prophylaxis; Antitoxin is for immediate post-wound passive therapy.",
        "Do not administer intravenously."
      ],
      governmentProgram: "Equine Stud Farm & Working Equid Welfare Core Protocol",
      notes: "MANDATORY FOAL SCHEDULE: Primary at 4 months, booster at 5 months, then annual booster. Pregnant broodmares must receive a mandatory booster 4-6 weeks prior to foaling to ensure colostral immunity."
    },
    {
      vaccineId: "equine-influenza",
      diseaseName: "Equine Influenza (EIV / H3N8 Florida Clades 1 & 2)",
      diseaseNameHi: "अश्व फ्लू टीका (एक्वाइन इन्फ्लूएंजा)",
      species: ["equine"],
      primaryAgeDays: 180,
      primaryAgeText: "6 Months of Age",
      boosterIntervalDays: 35,
      revaccinationCycleMonths: 6,
      doseVolume: "1.0 ml (Inactivated / recombinant canarypox vectored)",
      route: "IM",
      coldChainStorage: "2°C to 8°C. Shake well before injecting.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Do not exercise or vigorously train racehorses/sport equids for 48 hours post-vaccination.",
        "Do not vaccinate horses actively showing high fever and catarrhal cough."
      ],
      governmentProgram: "Turf Authorities of India / FEI Mandatory Biosecurity Passport Protocol",
      notes: "Racehorses and show jumpers require mandatory boosters every 6 months as per international equestrian standards. Broodmares boosted 4-6 weeks pre-foaling."
    },
    {
      vaccineId: "equine-rabies",
      diseaseName: "Equine Rabies (Inactivated Lyssavirus)",
      diseaseNameHi: "अश्व रेबीज टीका (एंटी-रेबीज वैक्सीन)",
      species: ["equine"],
      primaryAgeDays: 90,
      primaryAgeText: "3 Months (90 Days) and Above",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 12,
      doseVolume: "1.0 ml or 2.0 ml (Cell-culture inactivated adjuvant vaccine)",
      route: "IM",
      coldChainStorage: "2°C to 8°C. Protect from freezing.",
      mandatoryPreDewormingDays: 14,
      contraindications: [
        "Do not vaccinate an equid showing neurological symptoms or suspected direct bite from a rabid vector (quarantine strictly instead)."
      ],
      governmentProgram: "National Rabies Control Programme (NRCP Zoonosis Core)",
      notes: "Highly recommended in endemic zones for working equines and thoroughbred stud farm populations exposed to feral canine vectors."
    },

    // ------------------------------------------------------------------------
    // CANINE (DOG) PROTOCOLS
    // ------------------------------------------------------------------------
    {
      vaccineId: "canine-core-dhppil",
      diseaseName: "Canine 6-in-1 / 7-in-1 Core Vaccine (DHPPiL: Distemper, Hepatitis, Parvo, Parainfluenza, Leptospirosis)",
      diseaseNameHi: "कैनाइन कोर टीका / 7-इन-1 (डिस्टेंपर, पार्वो, हेपेटाइटिस, लेप्टोस्पायरा)",
      species: ["canine"],
      primaryAgeDays: 45,
      primaryAgeText: "6 Weeks (42-45 Days) of Age",
      boosterIntervalDays: 21,
      revaccinationCycleMonths: 12,
      doseVolume: "1.0 ml (Lyophilized cake reconstituted with liquid Lepto diluent)",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Reconstitute gently; administer within 30 minutes. Never freeze.",
      mandatoryPreDewormingDays: 7,
      contraindications: [
        "Do not vaccinate puppies suffering from active vomiting, diarrhea, or fever.",
        "Do not vaccinate puppies under 6 weeks of age (maternal antibody neutralization).",
        "Avoid concurrent systemic corticosteroid or immunosuppressive therapy."
      ],
      governmentProgram: "Standard Small Animal Companion Core Immunization Protocol (WSAVA Approved)",
      notes: "PUPPY CORE REGIMEN: 1st Dose at 6 weeks, 2nd Dose at 9 weeks, 3rd Dose at 12-14 weeks, followed by mandatory annual or triennial adult boosters."
    },
    {
      vaccineId: "canine-rabies",
      diseaseName: "Canine Anti-Rabies Vaccine (ARV / Inactivated Tissue-Culture Lyssavirus)",
      diseaseNameHi: "रेबीज रोधी टीका (ए.आर.वी.)",
      species: ["canine"],
      primaryAgeDays: 90,
      primaryAgeText: "12 Weeks (3 Months / 90 Days)",
      boosterIntervalDays: 365,
      revaccinationCycleMonths: 12,
      doseVolume: "1.0 ml (High potency inactivated cell-culture >2.5 IU/dose)",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Shake vigorously before use. Do not freeze.",
      mandatoryPreDewormingDays: 7,
      contraindications: [
        "ABSOLUTELY NEVER VACCINATE A DOG DISPLAYING OVERT CLINICAL SIGNS OF RABIES (fatal zoonotic risk; strictly isolate instead).",
        "Do not vaccinate puppies younger than 12 weeks for legal registration (maternal antibody blockage)."
      ],
      governmentProgram: "National Rabies Control Programme (NRCP) / Municipal Animal Birth Control (ABC-ARV)",
      notes: "STATUTORY REQUIREMENT: 1st Dose at 12 weeks (3 months), 1st Booster at 1 year of age, followed by strictly annual revaccination."
    },
    {
      vaccineId: "canine-kennel-cough",
      diseaseName: "Kennel Cough / Canine Infectious Respiratory Complex (Bordetella bronchiseptica + CPiV)",
      diseaseNameHi: "कैनाइन केनेल कफ टीका (संक्रामक श्वसन खांसी)",
      species: ["canine"],
      primaryAgeDays: 56,
      primaryAgeText: "8 Weeks (56 Days) of Age",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 12,
      doseVolume: "0.5 ml Intranasal (or 1.0 ml SC injectable)",
      route: "Intranasal",
      coldChainStorage: "2°C to 8°C. Do not freeze.",
      mandatoryPreDewormingDays: 7,
      contraindications: [
        "Do not administer oral/parenteral antibiotics effective against Bordetella within 7 days prior to or 14 days after intranasal live vaccination."
      ],
      governmentProgram: "Elective Lifestyle / Boarding Kennel Biosecurity Protocol",
      notes: "Intranasal vaccine delivers rapid local mucosal IgA immunity within 48-72 hours. Essential for dogs visiting boarding kennels, dog shows, or daycare."
    },
    {
      vaccineId: "canine-coronavirus",
      diseaseName: "Canine Coronavirus (CCoV Inactivated Enteric Vaccine)",
      diseaseNameHi: "कैनाइन कोरोना टीका (आंत्रशोथ सुरक्षा)",
      species: ["canine"],
      primaryAgeDays: 56,
      primaryAgeText: "8 Weeks of Age",
      boosterIntervalDays: 21,
      revaccinationCycleMonths: 12,
      doseVolume: "1.0 ml",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Do not freeze.",
      mandatoryPreDewormingDays: 7,
      contraindications: [
        "Not recommended as a universal core shot by WSAVA; indicated primarily in high-density commercial breeding kennels with history of co-infections."
      ],
      governmentProgram: "Elective Small Animal Practice Protocol",
      notes: "Often combined with commercial 8-in-1 / 9-in-1 puppy vaccinations."
    },

    // ------------------------------------------------------------------------
    // FELINE (CAT) PROTOCOLS
    // ------------------------------------------------------------------------
    {
      vaccineId: "feline-core-tricat",
      diseaseName: "Feline Core Tricat / FVRCP (Feline Panleukopenia, Viral Rhinotracheitis, Calicivirus)",
      diseaseNameHi: "फेलाइन ट्राइकैट कोर टीका (पार्वो-ल्यूकोपेनिया, फ्लू, कैलीसी)",
      species: ["feline"],
      primaryAgeDays: 56,
      primaryAgeText: "8 Weeks (56 Days) of Age",
      boosterIntervalDays: 28,
      revaccinationCycleMonths: 12,
      doseVolume: "1.0 ml (Modified live / inactivated freeze-dried cake)",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Administer immediately after reconstitution. Never freeze.",
      mandatoryPreDewormingDays: 7,
      contraindications: [
        "Do not vaccinate sick, febrile, or severely stressed kittens.",
        "Avoid interscapular neck injections: Administer strictly in distal lateral limbs (e.g., right front leg) to manage Feline Injection-Site Sarcoma (FISS) protocols."
      ],
      governmentProgram: "Standard Feline Practitioner Core Protocol (AAFP / WSAVA Guidelines)",
      notes: "KITTEN SCHEDULE: 1st Dose at 8 weeks, 2nd Dose at 12 weeks, 3rd Dose at 16 weeks, followed by annual booster. Administer low on the right front leg."
    },
    {
      vaccineId: "feline-rabies",
      diseaseName: "Feline Anti-Rabies Vaccine (Purevax Recombinant / Inactivated Tissue Culture)",
      diseaseNameHi: "बिल्ली रेबीज टीका (एंटी-रेबीज)",
      species: ["feline"],
      primaryAgeDays: 90,
      primaryAgeText: "12 Weeks (3 Months / 90 Days)",
      boosterIntervalDays: 365,
      revaccinationCycleMonths: 12,
      doseVolume: "1.0 ml (Recombinant canarypox-vectored or adjuvant-free preferred)",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Do not freeze.",
      mandatoryPreDewormingDays: 7,
      contraindications: [
        "Do not vaccinate cats displaying clinical aggression, salivation, or neurological distress.",
        "Inject strictly in the distal right hind limb as per AAFP injection site guidelines."
      ],
      governmentProgram: "National Rabies Control Programme (NRCP Companion Core)",
      notes: "Primary dose at 12 weeks, booster at 1 year, revaccinate annually. Administer strictly subcutaneously as distal as possible in the lower right hind leg."
    },
    {
      vaccineId: "feline-felv",
      diseaseName: "Feline Leukemia Virus (FeLV Recombinant / Inactivated)",
      diseaseNameHi: "फेलाइन ल्यूकेमिया वायरस टीका (एफ.ई.एल.वी.)",
      species: ["feline"],
      primaryAgeDays: 56,
      primaryAgeText: "8 Weeks of Age",
      boosterIntervalDays: 28,
      revaccinationCycleMonths: 12,
      doseVolume: "1.0 ml",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Protect from light.",
      mandatoryPreDewormingDays: 7,
      contraindications: [
        "MANDATORY SCREENING: Test cat for FeLV antigen (SNAP ELISA) prior to initial vaccination; vaccinating already FeLV-positive cats is medically non-beneficial.",
        "Administer strictly in the distal left hind limb."
      ],
      governmentProgram: "AAFP Recommended Core for all Kittens and Outdoor Cats",
      notes: "Highly recommended for all kittens under 1 year of age and all outdoor cats. Administer low in the left rear leg."
    },

    // ------------------------------------------------------------------------
    // AVIAN / COMMERCIAL POULTRY PROTOCOLS
    // ------------------------------------------------------------------------
    {
      vaccineId: "avian-mareks",
      diseaseName: "Marek's Disease (MD / HVT Serotype 3 + Rispens CVI988)",
      diseaseNameHi: "मुर्गियों का मैरेक रोग टीका (हैचरी डे-1)",
      species: ["avian"],
      primaryAgeDays: 1,
      primaryAgeText: "Day 1 (Hatchery Day-Old Chicks)",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 0,
      doseVolume: "0.2 ml per chick",
      route: "SC",
      coldChainStorage: "Liquid Nitrogen Ampoules (-196°C). Thaw in 37°C water bath for 60 seconds; reconstitute with specialized dye diluent and use within 90 minutes.",
      mandatoryPreDewormingDays: 0,
      contraindications: [
        "Do not vaccinate weak, dehydrated, or unhealed-navel chicks.",
        "Never allow reconstituted cell-associated vaccine to warm above room temperature or stay un-injected beyond 2 hours."
      ],
      governmentProgram: "Commercial Industrial Poultry Hatchery Mandatory Standard",
      notes: "Administered at the commercial hatchery via automated in-ovo injection on 18th day of incubation, or 0.2 ml Subcutaneously in the nape of the neck on Day 1."
    },
    {
      vaccineId: "avian-nd-f",
      diseaseName: "Newcastle Disease / Ranikhet F-Strain or B1 (Lentogenic)",
      diseaseNameHi: "रानीखेत एफ-स्ट्रेन टीका (प्राथमिक खुराक)",
      species: ["avian"],
      primaryAgeDays: 5,
      primaryAgeText: "Day 5 to 7 of Age",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 0,
      doseVolume: "1 drop (approx 0.03 ml per chick)",
      route: "Eye Drop",
      coldChainStorage: "2°C to 8°C. Reconstitute with sterile chilled colored diluent. Keep on ice packs during shed administration.",
      mandatoryPreDewormingDays: 0,
      contraindications: [
        "Do not vaccinate chicks suffering from acute chilling, mycoplasma, or high ammonia airsacculitis.",
        "Turn off drinking water line chlorinators 24 hours prior if administering via water."
      ],
      governmentProgram: "National Poultry Disease Surveillance Protocol",
      notes: "Primary mucosal immunization. Instill 1 drop directly into one eye; ensure chick blinks and swallows before release."
    },
    {
      vaccineId: "avian-ibd-live",
      diseaseName: "Infectious Bursal Disease (IBD / Gumboro Intermediate / Georgia Strain)",
      diseaseNameHi: "गम्बोरो रोग टीका (आई.बी.डी. प्राथमिक)",
      species: ["avian"],
      primaryAgeDays: 14,
      primaryAgeText: "Day 14 (12 to 14 Days)",
      boosterIntervalDays: 14,
      revaccinationCycleMonths: 0,
      doseVolume: "1 oral dose via clean skim-milk stabilized water",
      route: "Drinking Water",
      coldChainStorage: "2°C to 8°C. Do not freeze diluent.",
      mandatoryPreDewormingDays: 0,
      contraindications: [
        "Do not use chlorinated water (neutralizes vaccine virus).",
        "Do not expose water pipes to direct sunlight during administration."
      ],
      governmentProgram: "Commercial Broiler & Layer Farm Mandatory Health Standard",
      notes: "Thirst the birds for 1-2 hours beforehand. Dissolve 2g skimmed milk powder per liter of water as a virus stabilizer. Ensure flock consumes all vaccine water within 90 minutes."
    },
    {
      vaccineId: "avian-nd-lasota",
      diseaseName: "Newcastle Disease LaSota Strain Booster",
      diseaseNameHi: "रानीखेत लासोटा बूस्टर टीका",
      species: ["avian"],
      primaryAgeDays: 21,
      primaryAgeText: "Day 21 (21 to 24 Days)",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 2,
      doseVolume: "1 dose via stabilized drinking water",
      route: "Drinking Water",
      coldChainStorage: "2°C to 8°C. Protect from sunlight.",
      mandatoryPreDewormingDays: 0,
      contraindications: [
        "Do not administer water sanitizers, chlorine, or acidifiers on vaccination day."
      ],
      governmentProgram: "Standard Commercial Poultry Flocks Core Program",
      notes: "Crucial secondary booster to solidify humoral antibodies for broiler flocks until marketing age."
    },
    {
      vaccineId: "avian-ibd-booster",
      diseaseName: "Infectious Bursal Disease (IBD Intermediate Plus Booster)",
      diseaseNameHi: "गम्बोरो बूस्टर टीका",
      species: ["avian"],
      primaryAgeDays: 28,
      primaryAgeText: "Day 28 of Age",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 0,
      doseVolume: "1 dose via clean drinking water",
      route: "Drinking Water",
      coldChainStorage: "2°C to 8°C.",
      mandatoryPreDewormingDays: 0,
      contraindications: [
        "Avoid if flock is actively immunosuppressed or showing high mortality."
      ],
      governmentProgram: "High-Challenge Commercial Zone Protocol",
      notes: "Ensures comprehensive bursal lymphoid protection in high-density poultry corridors."
    },
    {
      vaccineId: "avian-fowl-pox",
      diseaseName: "Fowl Pox Live Chick-Embryo Origin Vaccine",
      diseaseNameHi: "मुर्गी चेचक टीका (फाउल पॉक्स विंग-वेब विधि)",
      species: ["avian"],
      primaryAgeDays: 45,
      primaryAgeText: "Week 6 to 8 (42 to 50 Days)",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 12,
      doseVolume: "1 stab (approx 0.01 ml on double-grooved pronged needle)",
      route: "Wing Web",
      coldChainStorage: "2°C to 8°C. Store freeze-dried powder refrigerated.",
      mandatoryPreDewormingDays: 7,
      contraindications: [
        "Do not vaccinate broilers under 4 weeks.",
        "Avoid touching eye conjunctiva or mouth with the vaccine applicator."
      ],
      governmentProgram: "Commercial Layer and Breeder Replacement Pullet Standard",
      notes: "WING-WEB PUNCTURE METHOD: Pierce the unfeathered skin fold of the wing web avoiding bone and blood vessels. Inspect flock 7-10 days post-vaccination for scab formation ('vaccine take')."
    },
    {
      vaccineId: "avian-nd-r2b",
      diseaseName: "Newcastle Disease R2B Mukteswar Strain (Mesogenic Layer Booster)",
      diseaseNameHi: "रानीखेत आर2बी / मुक्तेश्वर स्ट्रेन टीका",
      species: ["avian"],
      primaryAgeDays: 112,
      primaryAgeText: "Week 16 to 18 (112 to 126 Days)",
      boosterIntervalDays: null,
      revaccinationCycleMonths: 0,
      doseVolume: "0.5 ml per bird",
      route: "SC",
      coldChainStorage: "2°C to 8°C. Reconstitute with cold sterile diluent; keep chilled on ice.",
      mandatoryPreDewormingDays: 7,
      contraindications: [
        "ABSOLUTELY CONTRAINDICATED in young birds (<8-10 weeks of age); can cause neurotropic post-vaccine paralysis.",
        "Do not vaccinate birds in peak egg production."
      ],
      governmentProgram: "Commercial Egg Layer and Breeder Replacement Flock Standard",
      notes: "Administered strictly prior to point-of-lay (16-18 weeks) to confer powerful, durable humoral immunity throughout the 72-week egg-laying cycle."
    }
  ];

  // 3. VACCINATION CONTROLLER & UTILITY ENGINE
  const VaccinationEngine = {
    registry: MASTER_VACCINE_REGISTRY
  };

  /**
   * Returns all vaccination protocols configured for a target species.
   */
  VaccinationEngine.getScheduleBySpecies = function (species) {
    if (!species || typeof species !== "string") return [];
    const target = species.trim().toLowerCase();
    return MASTER_VACCINE_REGISTRY.filter(function (vac) {
      return Array.isArray(vac.species) && vac.species.indexOf(target) !== -1;
    });
  };

  /**
   * Helper: Formats a Date object to YYYY-MM-DD.
   */
  function formatDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  /**
   * Calculates the exact upcoming due date for a primary dose or booster.
   *
   * @param {string|Date} dobOrLastDoseDate - Base date (Date of Birth or Last Vaccination Date)
   * @param {string} vaccineId - Unique vaccine identifier
   * @param {boolean} isBooster - True if calculating a subsequent booster; false for primary dose
   * @returns {Object} Output containing target due date and descriptive schedule metadata.
   */
  VaccinationEngine.calculateNextVaccinationDate = function (dobOrLastDoseDate, vaccineId, isBooster) {
    const vac = MASTER_VACCINE_REGISTRY.find(function (v) {
      return v.vaccineId === vaccineId;
    });

    if (!vac) {
      return { error: "Vaccine with ID '" + vaccineId + "' not found in registry." };
    }

    const baseDate = new Date(dobOrLastDoseDate);
    if (isNaN(baseDate.getTime())) {
      return { error: "Invalid date provided: " + dobOrLastDoseDate };
    }

    const dueDate = new Date(baseDate.getTime());

    if (isBooster) {
      if (vac.boosterIntervalDays) {
        dueDate.setDate(dueDate.getDate() + vac.boosterIntervalDays);
      } else if (vac.revaccinationCycleMonths && vac.revaccinationCycleMonths > 0) {
        dueDate.setMonth(dueDate.getMonth() + vac.revaccinationCycleMonths);
      } else {
        return {
          vaccineId: vac.vaccineId,
          diseaseName: vac.diseaseName,
          status: "ONCE_IN_LIFETIME",
          message: "This vaccination does not require periodic booster revaccination."
        };
      }
    } else {
      // Primary Dose: calculate based on Age in Days from DOB
      dueDate.setDate(dueDate.getDate() + vac.primaryAgeDays);
    }

    return {
      vaccineId: vac.vaccineId,
      diseaseName: vac.diseaseName,
      diseaseNameHi: vac.diseaseNameHi,
      calculatedDueDate: formatDateISO(dueDate),
      dueDateTimestamp: dueDate.getTime(),
      isBooster: Boolean(isBooster),
      route: vac.route,
      doseVolume: vac.doseVolume,
      coldChainStorage: vac.coldChainStorage,
      mandatoryPreDewormingDays: vac.mandatoryPreDewormingDays
    };
  };

  /**
   * Validates whether an animal is currently eligible to receive a specific vaccine.
   *
   * @param {Object} animalProfile
   *   - species: string (e.g. 'bovine', 'canine')
   *   - ageDays: number
   *   - bodyTempF: number (e.g. 101.5)
   *   - isPregnant: boolean
   *   - isMale: boolean
   *   - isSick: boolean
   *   - lastDewormedDaysAgo: number or null
   *   - vaccineId: string
   */
  VaccinationEngine.validateVaccinationEligibility = function (animalProfile) {
    if (!animalProfile || typeof animalProfile !== "object") {
      return { eligible: false, reasons: ["Invalid animal profile provided."] };
    }

    const vac = MASTER_VACCINE_REGISTRY.find(function (v) {
      return v.vaccineId === animalProfile.vaccineId;
    });

    if (!vac) {
      return { eligible: false, reasons: ["Target vaccine not found: " + animalProfile.vaccineId] };
    }

    const reasons = [];
    const warnings = [];
    const ageDays = Number(animalProfile.ageDays) || 0;
    const bodyTempF = Number(animalProfile.bodyTempF) || 101.5;

    // 1. Minimum Age Check
    if (ageDays < vac.primaryAgeDays) {
      reasons.push("Underage: Animal is " + ageDays + " days old. Minimum required age is " + vac.primaryAgeDays + " days (" + vac.primaryAgeText + ").");
    }

    // 2. Health & Sickness Check
    if (animalProfile.isSick === true) {
      reasons.push("Immunosuppression Alert: Animal is recorded as clinically sick. Vaccines should only be administered to healthy animals.");
    }

    // 3. Body Temperature Check
    const febrileThreshold = (vac.species.indexOf("avian") !== -1) ? 108.5 : 103.0;
    if (bodyTempF >= febrileThreshold) {
      reasons.push("Febrile State: Body temperature is " + bodyTempF + "°F (Threshold: " + febrileThreshold + "°F). Vaccinating during pyrexia causes vaccine failure.");
    }

    // 4. Pregnancy Contraindications
    if (animalProfile.isPregnant === true) {
      if (vac.vaccineId === "bovine-brucellosis") {
        reasons.push("CRITICAL ABORTION RISK: Brucellosis S19 vaccine is strictly contraindicated in pregnant animals.");
      }
      if (vac.vaccineId.indexOf("pox") !== -1 || vac.vaccineId === "ovine-bluetongue") {
        warnings.push("Pregnancy Caution: Live attenuated vaccine in gestation; administer only under direct veterinary supervision.");
      }
    }

    // 5. Gender Specific Checks
    if (vac.vaccineId === "bovine-brucellosis" && animalProfile.isMale === true) {
      reasons.push("STRICT MALE CONTRAINDICATION: Brucellosis S19 vaccine is strictly forbidden in male bulls/calves (causes chronic orchitis and permanent sterility).");
    }

    // 6. Pre-Vaccination Deworming Protocol
    const dewormedDays = animalProfile.lastDewormedDaysAgo;
    if (dewormedDays === null || dewormedDays === undefined || dewormedDays > 90) {
      warnings.push("Deworming Deficit: Animal was not dewormed in the last 90 days. For optimal seroconversion, deworming is recommended 14 days prior to vaccination.");
    } else if (dewormedDays < 3) {
      warnings.push("Recent Deworming: Dewormed only " + dewormedDays + " days ago. Ensure the animal has fully stabilized.");
    }

    return {
      vaccineId: vac.vaccineId,
      diseaseName: vac.diseaseName,
      eligible: reasons.length === 0,
      reasons: reasons,
      warnings: warnings
    };
  };

  /**
   * Scans a list of patient records and identifies vaccines due within a specified timeframe.
   *
   * @param {Array} animalRecordsList
   *   Array of records: [{ animalId, tagNo, species, dob, lastVaccinations: { [vaccineId]: "YYYY-MM-DD" } }]
   * @param {number} withinDays - Default 30 days
   * @returns {Array} Array of structured alerts sorted by urgency.
   */
  VaccinationEngine.getUpcomingAlerts = function (animalRecordsList, withinDays) {
    if (!Array.isArray(animalRecordsList)) return [];
    const thresholdDays = (typeof withinDays === "number" && withinDays >= 0) ? withinDays : 30;
    const now = new Date();
    const todayTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const alerts = [];

    animalRecordsList.forEach(function (animal) {
      if (!animal.species || !animal.dob) return;
      const applicableVaccines = VaccinationEngine.getScheduleBySpecies(animal.species);
      const dobDate = new Date(animal.dob);
      if (isNaN(dobDate.getTime())) return;

      applicableVaccines.forEach(function (vac) {
        const lastGiven = (animal.lastVaccinations && animal.lastVaccinations[vac.vaccineId]) ?
                          animal.lastVaccinations[vac.vaccineId] : null;

        let nextDueDate = null;
        let isBooster = false;

        if (lastGiven) {
          // If already vaccinated, calculate booster/cycle due date
          const calc = VaccinationEngine.calculateNextVaccinationDate(lastGiven, vac.vaccineId, true);
          if (calc && calc.calculatedDueDate) {
            nextDueDate = new Date(calc.calculatedDueDate);
            isBooster = true;
          }
        } else {
          // If never vaccinated, calculate primary dose due date based on DOB
          const calc = VaccinationEngine.calculateNextVaccinationDate(animal.dob, vac.vaccineId, false);
          if (calc && calc.calculatedDueDate) {
            nextDueDate = new Date(calc.calculatedDueDate);
            isBooster = false;
          }
        }

        if (nextDueDate && !isNaN(nextDueDate.getTime())) {
          const diffMs = nextDueDate.getTime() - todayTimestamp;
          const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

          // Include if due within threshold or already overdue
          if (diffDays <= thresholdDays) {
            let status = "DUE_SOON";
            if (diffDays < 0) {
              status = "OVERDUE";
            } else if (diffDays <= 7) {
              status = "IMMINENT";
            }

            alerts.push({
              animalId: animal.animalId || "UNKNOWN",
              tagNo: animal.tagNo || "NO_TAG",
              species: animal.species,
              vaccineId: vac.vaccineId,
              diseaseName: vac.diseaseName,
              diseaseNameHi: vac.diseaseNameHi,
              dueDate: formatDateISO(nextDueDate),
              daysRemaining: diffDays,
              isBooster: isBooster,
              status: status,
              route: vac.route,
              doseVolume: vac.doseVolume,
              coldChainStorage: vac.coldChainStorage
            });
          }
        }
      });
    });

    // Sort alerts: most overdue first, then imminent, then due soon
    alerts.sort(function (a, b) {
      return a.daysRemaining - b.daysRemaining;
    });

    return alerts;
  };

  // Expose engine to public namespace
  window.VetcareApp.ClinicalData.Vaccination = VaccinationEngine;

})();
