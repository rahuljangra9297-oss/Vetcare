// Vetcare AI OS - Farm Biosecurity Framework, Quarantine Systems & Chemical Disinfection Matrices (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. THREE-ZONE FARM BIOSECURITY ARCHITECTURE MATRIX
  const BIOSECURITY_ZONING_FRAMEWORK = {
    RED_ZONE: {
      zoneKey: "zone-red-dirty",
      nameEn: "Red Zone (Dirty Zone / Outer Perimeter)",
      nameHi: "लाल क्षेत्र (अशुद्ध बाहरी परिधि / बाहरी आवाजाही)",
      colorCode: "#dc2626",
      biosecurityLevel: "High Hazard Exposure",
      boundaryDefinition: "The outermost perimeter including public road access, main entry gates, vehicle parking areas, feed delivery unloading bays, manure collection storage pits, and the post-mortem / dead carcass disposal area.",
      mandatoryInfrastructure: [
        "Automated Vehicle Wheel-Wash Dip (minimum 30 cm depth, filled with 2% Caustic Soda or 1% Virkon-S) with high-pressure undercarriage sprayers.",
        "External Visitor Parking Station situated at least 50 meters outside the internal farm gates.",
        "Secure Carcass Disposal Pit / Incinerator situated downwind and downstream at the farthest corner of the property.",
        "Solid perimeter boundary fencing (minimum 2.0 meters height) to exclude feral dogs, wild boars, and stray cattle."
      ],
      accessAndSanitationRules: [
        "No external feed delivery trucks, livestock dealers' vehicles, or private cars are permitted beyond the Red Zone barrier.",
        "All incoming delivery vehicles must undergo a mandatory 15-minute wheel-dip contact immersion and tire pressure wash before gate entry.",
        "Personnel in the Red Zone must never cross directly into the Green Zone without passing through the Amber Zone changing facility."
      ]
    },

    AMBER_ZONE: {
      zoneKey: "zone-amber-buffer",
      nameEn: "Amber Zone (Buffer Zone / Personnel Transition)",
      nameHi: "पीला क्षेत्र (मध्यवर्ती संक्रमण क्षेत्र / स्वच्छता द्वार)",
      colorCode: "#d97706",
      biosecurityLevel: "Decontamination Barrier",
      boundaryDefinition: "The middle sanitary cordon separating the dirty perimeter from the clean livestock sheds. Encompasses farm offices, staff changing rooms, shower-in/shower-out modules, bulk milk storage chilling rooms, and clean feed godowns.",
      mandatoryInfrastructure: [
        "Danish Entry System / Shower-in & Shower-out facility with clean/dirty physical bench dividing barriers.",
        "Deep Footbath Disinfectant Dips (minimum 15 cm depth filled with 1% Virkon-S or 4% Formalin) outside every doorway.",
        "Dedicated Farm-Only Color-Coded Boots (Gumboots) and Coveralls (Overalls).",
        "Hand Sanitizer and UV-C sterilization chambers for mobile phones, personal tools, and veterinary equipment."
      ],
      accessAndSanitationRules: [
        "MANDATORY DANISH ENTRY: Workers must remove personal street footwear on the dirty side of the bench, swing legs over, wash hands with soap, and put on dedicated farm boots and sanitized coveralls.",
        "Footbaths must be refreshed daily or immediately when organic matter causes the solution to turn brown/turbid.",
        "Milk collection tankers must connect via external wall transfer pipes without the driver stepping into the clean animal yard."
      ]
    },

    GREEN_ZONE: {
      zoneKey: "zone-green-clean",
      nameEn: "Green Zone (Clean Zone / Herd Core)",
      nameHi: "हरा क्षेत्र (शुद्ध आंतरिक केंद्र / पशु आवास व दुग्धशाला)",
      colorCode: "#16a34a",
      biosecurityLevel: "Ultra-Clean Core (Protected Herd)",
      boundaryDefinition: "The biological core of the enterprise housing the resident livestock: milking herd barns, calf nursery sheds, maternity/calving pens, heifer lots, and the automated milking parlor.",
      mandatoryInfrastructure: [
        "Bird-proof wire mesh netting (mesh size <2 cm) on all shed windows and vents to exclude wild sparrows and crows.",
        "Individual pen isolation barriers to prevent nose-to-nose contact between different age cohorts.",
        "Separate dedicated tools (shovels, wheelbarrows, feeding pans) for each individual shed, clearly marked with permanent color bands.",
        "Fly and rodent control bait stations installed every 15 meters along the shed walls."
      ],
      accessAndSanitationRules: [
        "STRICTLY CONTROLLED ACCESS: Only designated, farm-attired animal attendants are allowed entry.",
        "Work sequence must strictly follow the age gradient: Clean/Youngest first (Calf Nursery -> Heifers -> Milking Herd -> Hospital Pen LAST).",
        "Sick or treated animals must be moved immediately into the quarantine/hospital shed situated on the perimeter of the Green Zone."
      ]
    }
  };

  // 3. CHEMICAL DISINFECTANT & SANITATION MATRIX (8 CERTIFIED FORMULATIONS)
  const DISINFECTANT_REGISTRY = [
    {
      id: "dis-virkon-s",
      tradeName: "Virkon-S (1% Solution)",
      activeChemical: "Potassium Peroxymonosulfate (21.4%) + Sodium Dodecylbenzene Sulfonate",
      chemicalClass: "Peroxygen / Oxidizing System",
      spectrum: "Broadest spectrum: Highly bactericidal, fungicidal, and kills non-enveloped resilient viruses (Foot and Mouth Disease, Circovirus, Parvovirus, Avian Influenza).",
      recommendedDilution: "1:100 (10 grams per 1 Liter clean water / 1% w/v solution). Reconstituted solution turns bright pink.",
      contactTimeMinutes: 10,
      organicLoadTolerance: "High (exceptional efficacy even in hard water and moderate organic debris).",
      idealApplications: "Vehicle wheel dips, boot wash footbaths, shed misting/fogging, livestock trailers, veterinary clinics.",
      hazardPrecautions: "Biodegradable, non-corrosive at working dilutions. Solution turns colorless when active ingredient is exhausted (visual indicator)."
    },
    {
      id: "dis-caustic-soda",
      tradeName: "Caustic Soda / Lye (Sodium Hydroxide - NaOH 2%)",
      activeChemical: "Sodium Hydroxide (NaOH 2% Solution)",
      chemicalClass: "Strong Alkali / Hydroxide",
      spectrum: "GOLD STANDARD FOR FOOT AND MOUTH DISEASE (FMD): Saponifies viral capsids and penetrates heavy organic manure crusts.",
      recommendedDilution: "2% w/v (200 grams dissolved in 10 Liters water; add chemical slowly to water, never water to chemical).",
      contactTimeMinutes: 30,
      organicLoadTolerance: "Extremely High (unrivaled power to dissolve manure, blood, and fat).",
      idealApplications: "FMD outbreak floor decontamination, concrete yards, heavy truck wheel dips during viral emergencies.",
      hazardPrecautions: "DANGER: HIGHLY CORROSIVE. Causes severe chemical skin burns and eye damage. Mandatory PPE: Face shield, rubber apron, heavy neoprene gloves. Corrosive to aluminum."
    },
    {
      id: "dis-sodium-hypochlorite",
      tradeName: "Household Bleach / Sodium Hypochlorite (0.5% - 1% Chlorine)",
      activeChemical: "Sodium Hypochlorite (NaOCl supplying 5,000 to 10,000 ppm available chlorine)",
      chemicalClass: "Chlorine Releasing Agent / Halogen",
      spectrum: "Rapid bactericidal, virucidal (enveloped viruses), and water sanitizer.",
      recommendedDilution: "Surfaces: 1:10 dilution of 5% domestic bleach (yields 0.5% / 5,000 ppm). Drinking Water: 2 to 5 ppm (2-4 ml per 1,000 L).",
      contactTimeMinutes: 10,
      organicLoadTolerance: "VERY LOW: Instantly neutralized and deactivated by soil, feces, blood, and organic matter. Surfaces must be pre-cleaned first.",
      idealApplications: "Pre-cleaned concrete surfaces, milk processing utensils, drinking water chlorination, laboratory benchtops.",
      hazardPrecautions: "NEVER mix with acids or ammonia (releases toxic, lethal Chlorine gas). Highly corrosive to metals."
    },
    {
      id: "dis-formalin-fumigant",
      tradeName: "Formalin (Formaldehyde 4% - 10% Solution)",
      activeChemical: "Formaldehyde Gas (HCHO generated from 37% Aqueous Formalin)",
      chemicalClass: "Aldehyde / Alkylating Agent",
      spectrum: "High-level sterilant: Spores, coccidia oocysts, all viruses and bacteria.",
      recommendedDilution: "Footbaths: 3% to 5% solution (interdigital dermatitis / foot rot). Shed Fumigation: 40 ml Formalin (37%) + 20 grams Potassium Permanganate per 100 cubic feet of shed space.",
      contactTimeMinutes: 120, // 2 hours minimum fumigation airtight
      organicLoadTolerance: "Moderate.",
      idealApplications: "Airtight poultry house terminal fumigation, commercial hatchery incubators, walk-through sheep footbaths.",
      hazardPrecautions: "EXTREME TOXICITY & CARCINOGEN: Irreversible eye, respiratory, and pulmonary mucosal damage. Mandatory Full-Face Respirator (Formaldehyde cartridges) and complete airtight shed sealing. Do not enter within 24 hours of fumigation."
    },
    {
      id: "dis-quicklime-chuna",
      tradeName: "Quicklime / Unslaked Lime (Calcium Oxide - CaO)",
      activeChemical: "Calcium Oxide (CaO) / Hydrated Slaked Lime (Ca(OH)2)",
      chemicalClass: "Alkali Oxide",
      spectrum: "Broad bactericidal, sporicidal, and environmental sanitizer. Creates intense local exothermic heat and extreme alkaline pH (>12.5).",
      recommendedDilution: "Dry Dusting: 500 grams per square meter over damp soil. Whitewash Slurry: 2 kg Quicklime slaked in 10 Liters water.",
      contactTimeMinutes: 60,
      organicLoadTolerance: "Extremely High.",
      idealApplications: "Carcass burial pits (covering dead animals), unpaved dirt walkways, muddy waterlogged paddock drying, barn whitewashing.",
      hazardPrecautions: "Exothermic reaction: Slaking unslaked lime releases boiling steam and intense heat. Causes severe respiratory dust irritation. Wear eye protection."
    },
    {
      id: "dis-glutaraldehyde-qac",
      tradeName: "Synergistic Glutaraldehyde + QAC (e.g., Omnicide / TH4+)",
      activeChemical: "Glutaraldehyde (15%) + Didecyl Dimethyl Ammonium Chloride (10%)",
      chemicalClass: "Combination Aldehyde + Quaternary Ammonium Compound",
      spectrum: "Non-corrosive broad-spectrum terminal disinfectant: African Swine Fever, Avian Influenza, Salmonella, Aspergillus.",
      recommendedDilution: "1:200 to 1:400 (2.5 ml to 5 ml per 1 Liter water). Ultra-low volume (ULV) cold fogging at 1:4 dilution.",
      contactTimeMinutes: 15,
      organicLoadTolerance: "High.",
      idealApplications: "Shed thermal fogging, automated misting gates, egg hatching trays, plastic calf hutches, pig farrowing crates.",
      hazardPrecautions: "Non-corrosive to galvanized steel and aluminum. Ensure ventilation before re-introducing livestock after fogging."
    },
    {
      id: "dis-potassium-permanganate",
      tradeName: "Potassium Permanganate (Lal Dawai / KMnO4)",
      activeChemical: "Potassium Permanganate Crystals",
      chemicalClass: "Oxidizing Agent",
      spectrum: "Mild antiseptic, bactericidal, astringent for oral and hoof lesions.",
      recommendedDilution: "1:1000 (1 gram per 1 Liter clean water; yields a FAINT PALE PINK solution).",
      contactTimeMinutes: 5,
      organicLoadTolerance: "Extremely Low: Turns dirty brown and loses 100% of efficacy within minutes of manure contamination.",
      idealApplications: "Traditional walk-through livestock footbaths, mouth wash in Foot and Mouth Disease (FMD) blisters, superficial wound irrigation.",
      hazardPrecautions: "Must be replaced daily. Solution is active ONLY while it retains its bright pink color; discard as soon as it turns amber or brown."
    },
    {
      id: "dis-povidone-iodine",
      tradeName: "Povidone-Iodine / Iodophor (1% - 2% Available Iodine)",
      activeChemical: "Polyvinylpyrrolidone-Iodine Complex (PVP-I)",
      chemicalClass: "Halogen / Iodophor",
      spectrum: "Bactericidal (Gram+ and Gram-), sporicidal, fungicidal, and virucidal.",
      recommendedDilution: "Post-Milking Teat Dip: 0.5% to 1% available iodine (ready-to-use). Surface Wash: 1:50 dilution.",
      contactTimeMinutes: 2,
      organicLoadTolerance: "Moderate.",
      idealApplications: "Post-milking barrier teat dip (gold standard for mastitis prevention), surgical site scrub, umbilical cord dipping in newborn calves.",
      hazardPrecautions: "Safe, non-irritating on healthy skin. Leaves brown protective film that stains fabric."
    }
  ];

  // 4. QUARANTINE PROTOCOLS (NEW STOCK & EMERGENCY OUTBREAK CONTAINMENT)
  const QUARANTINE_PROTOCOLS = {
    newStockQuarantine: {
      protocolName: "Standard Incoming Stock Quarantine (21 to 30 Days Isolation)",
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine"],
      minimumPhysicalSeparationMeters: 100, // 100 meters downwind from resident herd
      quarantineChecklist: [
        {
          day: 1,
          actionEn: "Intake Triage, Physical Exam & Isolation Drenching",
          actionHi: "प्रवेश जांच, तापमान व कीड़े मारने की दवा",
          details: "Perform full physical clinical examination (temperature, lungs, eyes, hooves). Drench broad-spectrum anthelmintic (Fenbendazole or Ivermectin SC) to eliminate resistant parasites. Spray with deltamethrin 1.25% for tick/lice control."
        },
        {
          day: 3,
          actionEn: "Nasal & Fecal Sampling",
          actionHi: "गोबर व नाक स्राव जांच",
          details: "Collect individual fecal samples for McMaster egg counts (FEC). Nasal swabs for respiratory viral screening if history suggests."
        },
        {
          day: 7,
          actionEn: "Statutory Serological & Intradermal Testing",
          actionHi: "ब्रुसेलोसिस व टीबी/जोनी रोग जांच",
          details: "Draw blood for Brucellosis screening (Rose Bengal Plate Test - RBPT / ELISA). Perform Single Intradermal Comparative Tuberculin Test (SICTT) and Johnin test for paratuberculosis."
        },
        {
          day: 14,
          actionEn: "Core Herd Immunization",
          actionHi: "फार्म के अनिवार्य टीकों का लगाना",
          details: "Administer primary doses of resident herd core vaccines: FMD, HS, BQ (or PPR and Enterotoxaemia in small ruminants). Never mix with herd prior to vaccine seroconversion."
        },
        {
          day: 21,
          actionEn: "Post-Vaccine Seroconversion Audit",
          actionHi: "अंतिम स्वास्थ्य जांच व द्वितीय डीवर्मिंग",
          details: "Inspect injection sites, verify complete absence of respiratory coughing, nasal discharge, or diarrhea. Administer second dose of dewormer if high initial worm egg count was detected."
        },
        {
          day: 28,
          actionEn: "Graduated Herd Integration",
          actionHi: "मुख्य झुंड में सुरक्षित प्रवेश",
          details: "Final temperature and health certification. Move into transition yard adjacent to main herd for 48 hours before full commingling to minimize social fighting."
        }
      ]
    },

    outbreakContainment: {
      fmd: {
        diseaseName: "Foot and Mouth Disease (FMD) Outbreak Lockdown",
        containmentRadiusKm: 5,
        lockdownDirectives: [
          "ABSOLUTE QUARANTINE LOCKDOWN: Cease all movement of cattle, buffalo, sheep, goats, pigs, and fresh fodder into or out of the farm.",
          "Cessation of Milk Transport: Milk from infected sheds must be boiled and destroyed or mixed with 2% Caustic Soda; strictly prohibited from dairy pooling.",
          "Establish perimeter disinfection corridor: Spray all walls and walkways with 2% Sodium Hydroxide (Caustic Soda) or 1% Virkon-S daily.",
          "Dedicated Attendants: Assign dedicated workers who sleep and eat near the isolation shed; workers are forbidden from entering healthy sheds.",
          "Emergency Ring Vaccination: Vaccinate all healthy cattle within a 5-km buffer zone surrounding the infected focus with trivalent FMD vaccine."
        ]
      },
      lsd: {
        diseaseName: "Lumpy Skin Disease (LSD) Vector-Proof Containment",
        containmentRadiusKm: 8,
        lockdownDirectives: [
          "TOTAL VECTOR ISOLATION: Move affected animals into fly-proof, mosquito-netted enclosures immediately.",
          "Aggressive Acaricidal Spraying: Spray all cattle and shed walls with Deltamethrin 1.25% or Cypermethrin twice weekly to eliminate biting flies (Stomoxys calcitrans) and ticks.",
          "Isolate infected animals for at least 28 days post-scab detachment (scabs remain infectious for months).",
          "Ring vaccination with heterologous Goat Pox vaccine (10^3.5 TCID50) in all surrounding herds."
        ]
      },
      hpai: {
        diseaseName: "Highly Pathogenic Avian Influenza (HPAI / Bird Flu) Stamping-Out",
        containmentRadiusKm: 10,
        lockdownDirectives: [
          "STATUTORY DIRECTIVE: Treatment strictly illegal. Immediate official notification to State Department of Animal Husbandry.",
          "Complete farm quarantine within a 1-km Infected Zone and 10-km Surveillance Zone.",
          "Humane depopulation / culling of all birds within 1 km under official veterinary supervision.",
          "Deep burial of culled poultry covered with quicklime or complete high-temperature incineration."
        ]
      }
    }
  };

  // 5. SAFE CARCASS BURIAL & ANTHRAX EMERGENCY PROTOCOL
  const CARCASS_DISPOSAL_STANDARDS = {
    standardBurialPit: {
      minimumDepthFeet: 8, // 8 feet (approx 2.4 meters)
      minimumTopSoilCoverFeet: 4, // 4 feet of compacted earth on top
      chemicalBedding: "Spread a continuous 4-inch (10 cm) layer of Quicklime (Calcium Oxide powder) along the floor of the pit before placing the carcass. Cover the entire carcass with another heavy layer of Quicklime before backfilling with soil.",
      siteSelectionCriteria: [
        "Situated at least 150 meters away from all drinking water wells, borewells, rivers, and natural drainage channels.",
        "Deep water table (pit floor must remain at least 4 feet above the seasonal high water table).",
        "Firm clay or heavy loam soil to minimize fluid leaching; avoid porous gravel or fractured limestone."
      ],
      scavengerProtection: "Compact the topsoil mound firmly and encircle the burial site with barbed wire fencing and thorn bushes to prevent wild dogs, jackals, and foxes from exhuming the grave."
    },

    anthraxFatalAlert: {
      pathogen: "Bacillus anthracis (Anthrax / Splenic Fever / गिल्टी रोग)",
      cardinalWarning: "FATAL ZOONOSIS: NEVER OPEN OR PERFORM POST-MORTEM EXAMINATION ON AN ANIMAL SUSPECTED OF DYING FROM ANTHRAX.",
      biologicalMechanism: "Vegetative Bacillus anthracis bacilli inside an intact carcass die rapidly within 48-72 hours due to anaerobic putrefactive bacteria. If the carcass is cut open, exposure of vegetative cells to atmospheric oxygen triggers explosive, indestructible bacterial SPORULATION. Anthrax spores survive in surrounding soil for over 50 to 70 YEARS, creating a permanent lethal death-trap for future grazing stock and humans.",
      clinicalHallmarks: [
        "Peracute sudden death with zero prior illness in grazing livestock",
        "Absence of rigor mortis (cadaver remains completely limp and flaccid)",
        "Incomplete clotted dark, tarry, oily blood oozing continuously from all natural orifices (mouth, nostrils, anus, vulva)",
        "Rapid post-mortem gaseous abdominal ballooning and cyanosis"
      ],
      mandatoryDisposalAction: "DO NOT CUT. Plug all body orifices (nostrils, mouth, anus) with cotton wool soaked in 5% Formalin. Disinfect carcass exterior with 5% Formalin. Encase carcass in heavy plastic wrap without puncturing. Dig burial pit minimum 8-10 feet deep, coat with 200 kg Quicklime, and bury intact. Alternatively, perform high-temperature incineration on site under official veterinary supervision."
    }
  };

  // 6. COMPUTATIONAL BIOSECURITY ENGINE IMPLEMENTATION
  const BiosecurityEngine = {
    zoning: BIOSECURITY_ZONING_FRAMEWORK,
    disinfectants: DISINFECTANT_REGISTRY,
    quarantine: QUARANTINE_PROTOCOLS,
    carcassDisposal: CARCASS_DISPOSAL_STANDARDS
  };

  /**
   * FARM BIOSECURITY AUDIT ENGINE:
   * Evaluates farm biosecurity compliance and computes an objective audit score (0-100%).
   *
   * @param {Object} auditParams
   *   {
   *     hasSecurePerimeterFencing: boolean,
   *     hasOperationalWheelDip: boolean,
   *     isWheelDipDisinfectantFresh: boolean,
   *     hasDanishEntryChangingRoom: boolean,
   *     usesDedicatedFarmBoots: boolean,
   *     enforcesNewStockQuarantine21Days: boolean,
   *     hasSeparateQuarantineShed100m: boolean,
   *     isWaterTestedPotable: boolean,
   *     hasBirdProofWireNetting: boolean,
   *     hasPestRodentControlProgram: boolean,
   *     maintainsVisitorRegistrationLog: boolean,
   *     hasApprovedCarcassDisposalPit: boolean
   *   }
   */
  BiosecurityEngine.calculateBiosecurityScore = function (auditParams) {
    const params = auditParams || {};
    let score = 0;
    const deficiencies = [];
    const actionPlan = [];

    // Criteria 1: Physical Boundary & Wheel Dip (20 Points)
    if (params.hasSecurePerimeterFencing) {
      score += 10;
    } else {
      deficiencies.push("Absence of secure outer perimeter fencing (High risk of stray animal & wildlife pathogen entry).");
      actionPlan.push("Erect continuous 2.0-meter chain-link or stone wall boundary around the Red Zone.");
    }

    if (params.hasOperationalWheelDip && params.isWheelDipDisinfectantFresh) {
      score += 10;
    } else {
      deficiencies.push("Vehicle wheel-wash dip is absent, empty, or contains exhausted/muddy disinfectant.");
      actionPlan.push("Construct automated wheel dip (minimum 30 cm deep) and charge daily with 2% Caustic Soda or 1% Virkon-S.");
    }

    // Criteria 2: Danish Entry & Personnel Sanitation (20 Points)
    if (params.hasDanishEntryChangingRoom) {
      score += 10;
    } else {
      deficiencies.push("Personnel enter animal sheds directly in street clothes and unwashed personal shoes.");
      actionPlan.push("Install a physical barrier bench (Danish Entry) in the Amber Zone dividing dirty street clothes from clean farm coveralls.");
    }

    if (params.usesDedicatedFarmBoots) {
      score += 10;
    } else {
      deficiencies.push("Lack of dedicated farm-only rubber boots and boot wash footbaths.");
      actionPlan.push("Provide color-coded gumboots for each shed and refresh footbaths daily with 1% Virkon-S.");
    }

    // Criteria 3: Quarantine Facilities & Herd Isolation (25 Points)
    if (params.enforcesNewStockQuarantine21Days) {
      score += 15;
    } else {
      deficiencies.push("CRITICAL BREACH: New stock are introduced directly into the resident milking herd without mandatory 21-day quarantine.");
      actionPlan.push("Institute mandatory 21 to 30 days isolation policy for all incoming purchased cattle, heifers, and breeding bulls.");
    }

    if (params.hasSeparateQuarantineShed100m) {
      score += 10;
    } else {
      deficiencies.push("Quarantine shed is situated too close to resident sheds (<100m), allowing aerosol viral cross-contamination.");
      actionPlan.push("Establish dedicated quarantine pens at least 100 meters downwind from the main animal barns.");
    }

    // Criteria 4: Feed, Water & Vector Control (20 Points)
    if (params.isWaterTestedPotable) {
      score += 5;
    } else {
      deficiencies.push("Drinking water supply is untested and lacks routine terminal chlorination.");
      actionPlan.push("Submit water samples for total coliform testing; install automated in-line chlorinator (target 2-3 ppm free chlorine).");
    }

    if (params.hasBirdProofWireNetting) {
      score += 8;
    } else {
      deficiencies.push("Animal feed mangers and sheds lack bird netting, allowing wild birds (sparrows/crows) to defecate in cattle feed.");
      actionPlan.push("Screen all barn openings and eaves with <2 cm wire mesh netting.");
    }

    if (params.hasPestRodentControlProgram) {
      score += 7;
    } else {
      deficiencies.push("Unmanaged rodent infestation (major reservoir for Leptospirosis and Salmonella).");
      actionPlan.push("Implement monthly tamper-proof anticoagulant rodenticide bait stations around feed godown perimeters.");
    }

    // Criteria 5: Visitor Protocols & Carcass Disposal (15 Points)
    if (params.maintainsVisitorRegistrationLog) {
      score += 5;
    } else {
      deficiencies.push("Unrestricted visitor access without registration or sanitary downtime declarations.");
      actionPlan.push("Institute strict visitor logbook with mandatory 48-hour livestock-free downtime rule.");
    }

    if (params.hasApprovedCarcassDisposalPit) {
      score += 10;
    } else {
      deficiencies.push("Improper dead animal carcass disposal (surface dumping invites scavenger exhumation and anthrax/blackleg dissemination).");
      actionPlan.push("Construct an 8-foot deep fenced burial pit stocked with quicklime, situated downwind at farm boundary.");
    }

    score = Math.max(0, Math.min(100, score));

    let rating = "ACCEPTABLE";
    if (score >= 85) {
      rating = "EXCELLENT (Biosecurity Certified)";
    } else if (score >= 65) {
      rating = "ACCEPTABLE (Minor Upgrades Required)";
    } else if (score >= 45) {
      rating = "VULNERABLE (High Epidemic Threat)";
    } else {
      rating = "CRITICAL_RISK (Extreme Disease Outbreak Vulnerability)";
    }

    return {
      biosecurityScorePercent: score,
      overallRating: rating,
      totalParametersAudited: 12,
      deficienciesIdentified: deficiencies,
      actionPlanPriorities: actionPlan
    };
  };

  /**
   * Retrieves full step-by-step quarantine schedule for species and scenario.
   *
   * @param {string} species - 'bovine', 'caprine', 'equine'
   * @param {string} situationType - 'new-stock' | 'fmd' | 'lsd' | 'hpai'
   */
  BiosecurityEngine.getQuarantineProtocol = function (species, situationType) {
    const sit = (situationType || "new-stock").trim().toLowerCase();

    if (sit === "new-stock") {
      return Object.assign({ targetSpecies: species }, QUARANTINE_PROTOCOLS.newStockQuarantine);
    } else if (QUARANTINE_PROTOCOLS.outbreakContainment[sit]) {
      return Object.assign({ targetSpecies: species }, QUARANTINE_PROTOCOLS.outbreakContainment[sit]);
    }

    return {
      message: "Standard 21-day physical isolation protocol applicable.",
      checklist: QUARANTINE_PROTOCOLS.newStockQuarantine.quarantineChecklist
    };
  };

  /**
   * RECOGNIZES PATHOGENS & SELECTS OPTIMAL CHEMICAL DISINFECTANT:
   * Computes recommended chemical agent, dilution, contact time, and hazard warnings.
   *
   * @param {string} pathogenType - 'fmd', 'anthrax', 'lsd', 'bacteria', 'general'
   * @param {string} surfaceType - 'concrete', 'dirt-soil', 'metal-equipment', 'skin-footbath'
   * @param {boolean} organicLoadPresent - True if heavy manure/feces present
   */
  BiosecurityEngine.recommendDisinfectant = function (pathogenType, surfaceType, organicLoadPresent) {
    const p = (pathogenType || "general").trim().toLowerCase();
    const s = (surfaceType || "concrete").trim().toLowerCase();
    const hasOrganic = Boolean(organicLoadPresent);

    let chosenId = "dis-virkon-s";

    if (p.indexOf("fmd") !== -1 || p.indexOf("foot-and-mouth") !== -1) {
      chosenId = (s === "metal-equipment") ? "dis-virkon-s" : "dis-caustic-soda";
    } else if (p.indexOf("anthrax") !== -1 || s.indexOf("soil") !== -1 || s.indexOf("dirt") !== -1) {
      chosenId = "dis-quicklime-chuna";
    } else if (s.indexOf("skin") !== -1 || s.indexOf("teat") !== -1) {
      chosenId = "dis-povidone-iodine";
    } else if (hasOrganic && s !== "metal-equipment") {
      chosenId = "dis-caustic-soda";
    } else {
      chosenId = "dis-virkon-s";
    }

    const matched = DISINFECTANT_REGISTRY.find(d => d.id === chosenId);

    return {
      recommendedDisinfectant: matched.tradeName,
      activeChemical: matched.activeChemical,
      recommendedDilution: matched.recommendedDilution,
      contactTimeMinutes: matched.contactTimeMinutes,
      organicLoadCompatibility: matched.organicLoadTolerance,
      hazardPrecautions: matched.hazardPrecautions,
      preparationDirective: "Ensure surfaces are pre-cleaned where possible; apply disinfectant until surfaces are thoroughly wet and maintain contact time."
    };
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.Biosecurity = BiosecurityEngine;

})();
