// Vetcare AI OS - Statutory Notifiable Diseases, Outbreak Reporting & Veterinary Epidemiology Regulatory Engine (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. STATUTORY NOTIFIABLE ANIMAL DISEASES DIRECTORY (10 CRITICAL REGULATORY DOSSIERS)
  const NOTIFIABLE_REGISTRY = [
    // ========================================================================
    // 1. FOOT AND MOUTH DISEASE (एफ.एम.डी. / खुरपका-मुँहपका)
    // ========================================================================
    {
      id: "notifiable-fmd",
      name: "Foot and Mouth Disease (FMD / Aphthovirus)",
      nameHi: "खुरपका-मुँहपका रोग (एफ.एम.डी.)",
      causativeAgent: "Aphthovirus (Picornaviridae family, Serotypes O, A, Asia-1 in India)",
      governingAct: "The Prevention and Control of Infectious and Contagious Diseases in Animals Act, 2009 (Act No. 27 of 2009, India)",
      reportingTimeLimitHours: 24,
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine", "swine"],
      mandatoryLegalAction: [
        "Immediate statutory reporting to District Magistrate (DM) and Chief Veterinary Officer (CVO) within 24 hours.",
        "Declaration of 'Infected Area' within a 3-km radius under Section 6 of Act 27 of 2009.",
        "Immediate total ban on movement of all cloven-hoofed animals, raw milk, beef, pork, and unsterilized fodder out of the infected zone.",
        "Immediate closure of all local livestock markets (Pashu Haats / Fairs) within a 10-km surveillance radius.",
        "Establishment of 2% Sodium Hydroxide (Caustic Soda) or 1% Virkon-S vehicle disinfection check-posts on all public transit roads."
      ],
      containmentRadiiKm: {
        infectedZoneKm: 3.0,
        surveillanceZoneKm: 10.0
      },
      referenceDiagnosticLabs: [
        "ICAR-Directorate of Foot and Mouth Disease (DFMD), International Centre for FMD (ICFMD), Arugul, Bhubaneswar",
        "ICAR-Indian Veterinary Research Institute (IVRI), Mukteswar / Izatnagar",
        "Designated Regional Disease Diagnostic Laboratories (RDDLs: Jalandhar, Kolkata, Pune, Bengaluru, Guwahati)"
      ],
      sampleCollectionRules: "Epithelial flaps from unruptured or freshly ruptured vesicles on the tongue, dental pad, or feet (minimum 1 gram). Place in sterile transport medium composed of equal volumes of glycerol and 0.04 M phosphate buffer (pH 7.2-7.6) containing antibiotics. Transport strictly on wet ice or cold chain at 4°C within 48 hours. DO NOT FREEZE EPITHELIAL SAMPLES."
    },

    // ========================================================================
    // 2. ANTHRAX (एंथ्रेक्स / गिल्टी रोग / प्लीहा ज्वर - STRICTLY NO AUTOPSY)
    // ========================================================================
    {
      id: "notifiable-anthrax",
      name: "Anthrax / Splenic Fever (Bacillus anthracis)",
      nameHi: "एंथ्रेक्स / गिल्टी रोग / प्लीहा ज्वर (अति-घातक जुनोटिक रोग)",
      causativeAgent: "Bacillus anthracis (Spore-forming Gram-positive encapsulated bacillus)",
      governingAct: "The Prevention and Control of Infectious and Contagious Diseases in Animals Act, 2009 (Schedule Disease & Zoonosis Hazard)",
      reportingTimeLimitHours: 12,
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine"],
      mandatoryLegalAction: [
        "STATUTORY NOTIFICATION WITHIN 12 HOURS to District Magistrate, Chief Veterinary Officer, and Chief Medical Officer (Health).",
        "STRICT LEGAL PROHIBITION OF NECROPSY: Under no circumstances shall the carcass be opened, skinned, or autopsied.",
        "Immediate cordoning of the death site; incineration or deep burial of the intact carcass covered with 200 kg unslaked quicklime at minimum 8 feet depth.",
        "Immediate ring vaccination of all cattle, buffalo, sheep, and goats within a 5-km radius with Anthrax Spore Vaccine (Sterne Strain 34F2).",
        "Quarantine of the affected pasture for at least 60 days; grazing strictly prohibited."
      ],
      containmentRadiiKm: {
        infectedZoneKm: 5.0,
        surveillanceZoneKm: 15.0
      },
      referenceDiagnosticLabs: [
        "State Veterinary Biologicals / Disease Investigation Laboratories",
        "ICAR-Indian Veterinary Research Institute (IVRI), Izatnagar, Bareilly",
        "National Centre for Disease Control (NCDC), Zoonosis Division, New Delhi"
      ],
      sampleCollectionRules: "DO NOT OPEN CARCASS. Collect blood strictly from the peripheral ear vein or tip of the tail using a sterile syringe and needle, or prepare thin blood smears directly from the ear vein incision. Fix smears immediately by passing through flame 3 times or soaking in absolute methanol. Dispatch in airtight, sealed, labeled slide boxes under biohazard triple-packaging."
    },

    // ========================================================================
    // 3. HIGHLY PATHOGENIC AVIAN INFLUENZA (बर्ड फ्लू)
    // ========================================================================
    {
      id: "notifiable-hpai",
      name: "Highly Pathogenic Avian Influenza (HPAI / Bird Flu)",
      nameHi: "एवियन इन्फ्लूएंजा / बर्ड फ्लू (घातक पोल्ट्री श्वसन वायरस)",
      causativeAgent: "Influenza A virus (H5N1, H5N8, H5N6, H7N9 - Orthomyxoviridae)",
      governingAct: "Action Plan for Prevention, Control & Containment of Avian Influenza (DAHD, Ministry of Fisheries, Animal Husbandry & Dairying, GoI)",
      reportingTimeLimitHours: 12,
      targetSpecies: ["avian"],
      mandatoryLegalAction: [
        "IMMEDIATE STATUTORY REPORTING WITHIN 12 HOURS to State Animal Husbandry Department and Joint Secretary (Livestock Health), DAHD-GoI.",
        "Declaration of 0 to 1 km radius as 'Infected Zone' (Stamping-Out / Depopulation Zone).",
        "Declaration of 1 to 10 km radius as 'Surveillance Zone'.",
        "MANDATORY MASS CULLING: Humane depopulation and destruction of all domestic poultry, eggs, feed, and litter within the 1-km Infected Zone under Level-3 PPE.",
        "Complete shutdown of live-bird wet markets, poultry processing units, and transport of poultry products within a 10-km radius for minimum 90 days.",
        "Payment of statutory economic compensation to poultry farmers as per Government of India notified rates."
      ],
      containmentRadiiKm: {
        infectedZoneKm: 1.0,
        surveillanceZoneKm: 10.0
      },
      referenceDiagnosticLabs: [
        "ICAR-National Institute of High Security Animal Diseases (NIHSAD), Anand Nagar, Bhopal (National Referral Apex Lab)",
        "Regional Disease Diagnostic Laboratories (RDDL Jalandhar, Kolkata, Bangalore, Pune, Guwahati)"
      ],
      sampleCollectionRules: "Collect tracheal and cloacal swabs from sick birds using sterile Dacron/polyester swabs placed in Viral Transport Medium (VTM) with antibiotics and antimycotics (pH 7.0-7.4). Collect fresh lung, spleen, and brain tissues from freshly dead birds in sterile containers. Dispatch immediately in liquid nitrogen dry shippers or on crushed ice under Category A UN 2814 Infectious Substance Triple-Packaging. DO NOT USE CALCIUM ALGINATE SWABS."
    },

    // ========================================================================
    // 4. AFRICAN SWINE FEVER (अफ्रीकी स्वाइन बुखार)
    // ========================================================================
    {
      id: "notifiable-asf",
      name: "African Swine Fever (ASF / Asfarviridae)",
      nameHi: "अफ्रीकी स्वाइन बुखार (सूअरों का घातक रक्तस्रावी बुखार)",
      causativeAgent: "African Swine Fever Virus (ASFV / Genus Asfivirus, large double-stranded DNA virus)",
      governingAct: "National Action Plan for Control, Containment and Eradication of African Swine Fever in India (DAHD-GoI)",
      reportingTimeLimitHours: 24,
      targetSpecies: ["swine"],
      mandatoryLegalAction: [
        "Immediate statutory reporting to CVO and District Administration.",
        "Declaration of 1 km radius around the epicenter as 'Infected Zone'; 1-10 km radius as 'Surveillance Zone'.",
        "Mandatory culling of 100% domestic pigs within the 1-km Infected Zone; complete ban on swine slaughter and pork sales.",
        "Deep burial of culled swine in pits covered with quicklime; disinfection of piggeries with 2% Caustic Soda.",
        "Total ban on inter-state and inter-district transit of live pigs and processed pork products."
      ],
      containmentRadiiKm: {
        infectedZoneKm: 1.0,
        surveillanceZoneKm: 10.0
      },
      referenceDiagnosticLabs: [
        "ICAR-National Institute of High Security Animal Diseases (NIHSAD), Bhopal",
        "North Eastern Regional Disease Diagnostic Laboratory (NERDDL), Guwahati",
        "ICAR-National Research Centre on Pig (NRC on Pig), Rani, Guwahati"
      ],
      sampleCollectionRules: "Whole EDTA blood (5-10 ml) from live febrile pigs. For dead pigs: Spleen, tonsils, gastrohepatic lymph nodes, and kidney tissues. Refrigerate at 4°C for transit; dispatch within 48 hours under UN 2814 triple-packaging."
    },

    // ========================================================================
    // 5. PESTE DES PETITS RUMINANTS (पी.पी.आर. / बकरी प्लेग)
    // ========================================================================
    {
      id: "notifiable-ppr",
      name: "Peste des Petits Ruminants (PPR / Small Ruminant Plague)",
      nameHi: "कांगनी / बकरी प्लेग / पी.पी.आर. रोग",
      causativeAgent: "Small Ruminant Morbillivirus (Paramyxoviridae family)",
      governingAct: "National PPR Eradication Programme (PPR-EP / DAHD 100% Central Assistance) under Act 27 of 2009",
      reportingTimeLimitHours: 24,
      targetSpecies: ["caprine", "ovine"],
      mandatoryLegalAction: [
        "Notification to Veterinary Assistant Surgeon (VAS) and CVO within 24 hours.",
        "Immediate isolation of all coughing sheep and goats with diarrhea and stomatitis.",
        "Ring vaccination of all healthy small ruminants within 5 km of the outbreak using live-attenuated Sungri-96 PPR vaccine.",
        "Suspension of sheep and goat trading in local weekly livestock markets for 30 days."
      ],
      containmentRadiiKm: {
        infectedZoneKm: 3.0,
        surveillanceZoneKm: 10.0
      },
      referenceDiagnosticLabs: [
        "ICAR-Indian Veterinary Research Institute (IVRI), Mukteswar / Izatnagar",
        "ICAR-Central Institute for Research on Goats (CIRG), Makhdoom, Mathura",
        "Designated State Disease Diagnostic Laboratories (SDDLs)"
      ],
      sampleCollectionRules: "Nasal, ocular, and oral swabs in sterile viral transport medium. Whole blood in heparin/EDTA collected during acute febrile stage. Mesenteric lymph nodes and lung tissue from freshly dead animals shipped on wet ice."
    },

    // ========================================================================
    // 6. GLANDERS (ग्लैंडर्स / फारसी रोग - EQUINE ZOONOSIS)
    // ========================================================================
    {
      id: "notifiable-glanders",
      name: "Glanders / Farcy (Burkholderia mallei)",
      nameHi: "ग्लैंडर्स / फारसी रोग (अश्व जनित घातक संक्रामक रोग)",
      causativeAgent: "Burkholderia mallei (Gram-negative non-motile bacillus)",
      governingAct: "The Glanders and Farcy Act, 1899 (Act No. XIII of 1899) and National Action Plan for Glanders",
      reportingTimeLimitHours: 12,
      targetSpecies: ["equine"],
      mandatoryLegalAction: [
        "Immediate statutory reporting within 12 hours to District Magistrate and Chief Veterinary Officer.",
        "STRICT LEGAL BAN ON TREATMENT: Under national and international biosecurity laws, medical treatment of equines infected with Burkholderia mallei is strictly illegal due to permanent carrier state and fatal human zoonotic transmission.",
        "MANDATORY HUMANE EUTHANASIA: All sero-positive equines must be humanely euthanized by authorized veterinarians.",
        "Deep carcass burial in 8-foot pits lined with quicklime; disinfection of stables with 2% Virkon-S.",
        "Immediate movement ban on all equids (horses, mules, donkeys) within a 25-km surveillance zone."
      ],
      containmentRadiiKm: {
        infectedZoneKm: 5.0,
        surveillanceZoneKm: 25.0
      },
      referenceDiagnosticLabs: [
        "ICAR-National Research Centre on Equines (NRCE), Hisar, Haryana (National Referral Apex Lab)",
        "Regional Disease Diagnostic Laboratories (RDDLs)"
      ],
      sampleCollectionRules: "Serum samples (5 ml) collected under sterile conditions for Complement Fixation Test (CFT) and ELISA. Swabs from unruptured farcy buds or nasal ulcers collected with Level-3 PPE. Ship on cold chain strictly."
    },

    // ========================================================================
    // 7. LUMPY SKIN DISEASE (लंपी त्वचा रोग)
    // ========================================================================
    {
      id: "notifiable-lsd",
      name: "Lumpy Skin Disease (LSD / Capripoxvirus)",
      nameHi: "लंपी त्वचा रोग (गांठदार त्वचा रोग / एल.एस.डी.)",
      causativeAgent: "Lumpy Skin Disease Virus (Neethling strain, Capripoxvirus genus)",
      governingAct: "Advisory & SOP for Lumpy Skin Disease Control (DAHD, GoI, 2022-2024)",
      reportingTimeLimitHours: 24,
      targetSpecies: ["bovine", "bubaline"],
      mandatoryLegalAction: [
        "Reporting to CVO and entry into the National Animal Disease Referral System (NADRS) portal.",
        "Immediate isolation of cattle displaying cutaneous nodules into vector-proof (mosquito-netted) sheds.",
        "Mass vector control: Spraying sheds with 1.25% Deltamethrin to eliminate biting stable flies (Stomoxys) and ticks.",
        "Emergency Ring Vaccination: Heterologous Goat Pox vaccine (10^3.5 TCID50) administered to all healthy cattle within a 5-km radius.",
        "Prohibition of interstate cattle trade and transit from affected districts."
      ],
      containmentRadiiKm: {
        infectedZoneKm: 5.0,
        surveillanceZoneKm: 10.0
      },
      referenceDiagnosticLabs: [
        "ICAR-National Institute of High Security Animal Diseases (NIHSAD), Bhopal",
        "ICAR-National Research Centre on Equines (NRCE), Hisar",
        "ICAR-Indian Veterinary Research Institute (IVRI), Izatnagar"
      ],
      sampleCollectionRules: "Skin lesion biopsy or scab tissue (minimum 2-3 dried crusts) collected in sterile dry vials without preservatives. Whole EDTA blood collected during the early febrile stage. Keep at 4°C during transit."
    },

    // ========================================================================
    // 8. HAEMORRHAGIC SEPTICAEMIA (एच.एस. / गलघोंटू)
    // ========================================================================
    {
      id: "notifiable-hs",
      name: "Haemorrhagic Septicaemia (HS / Pasteurellosis)",
      nameHi: "गलघोंटू रोग (एच.एस. / पाश्चुरेला मल्टीसिडा)",
      causativeAgent: "Pasteurella multocida (Serotype B:2 in India / Asian serotype)",
      governingAct: "The Prevention and Control of Infectious and Contagious Diseases in Animals Act, 2009",
      reportingTimeLimitHours: 24,
      targetSpecies: ["bovine", "bubaline"],
      mandatoryLegalAction: [
        "Reporting to local Veterinary Dispensary and CVO within 24 hours.",
        "Immediate emergency antibiotic therapy for in-contact animals displaying pyrexia (>103°F).",
        "Emergency ring vaccination of all healthy animals in surrounding villages with Alum-precipitated or Oil-adjuvant HS vaccine.",
        "Carcass disposal under quicklime; disinfection of sheds with 1% Virkon-S or bleaching powder."
      ],
      containmentRadiiKm: {
        infectedZoneKm: 3.0,
        surveillanceZoneKm: 10.0
      },
      referenceDiagnosticLabs: [
        "State Disease Diagnostic Laboratories (SDDLs)",
        "ICAR-Indian Veterinary Research Institute (IVRI), Izatnagar, Bareilly"
      ],
      sampleCollectionRules: "Blood smears prepared from the peripheral ear vein of dead animals; heart blood swabs collected post-mortem in sterile tubes; bone marrow (intact long bone like metacarpus) if carcass is decomposing. Ship on wet ice."
    },

    // ========================================================================
    // 9. BRUCELLOSIS (ब्रूसीलोसिस / संक्रामक गर्भपात)
    // ========================================================================
    {
      id: "notifiable-brucellosis",
      name: "Bovine & Caprine Brucellosis",
      nameHi: "ब्रूसीलोसिस / संक्रामक गर्भपात (माल्टा बुखार)",
      causativeAgent: "Brucella abortus (Cattle/Buffalo) & Brucella melitensis (Goats/Sheep)",
      governingAct: "National Animal Disease Control Programme (NADCP) for Brucellosis under Act 27 of 2009",
      reportingTimeLimitHours: 48,
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine"],
      mandatoryLegalAction: [
        "Reporting of herd abortion storms (>3 abortions in 30 days) to CVO.",
        "Isolation of aborting animals for 30 days; thorough disinfection of calving pens with 2% Virkon-S.",
        "Safe incineration or deep burial of aborted fetuses and placenta; strictly prohibit dogs from feeding on afterbirth.",
        "Tagging and registration on NDLM / INAPH portal; voluntary segregation of sero-positive breeding stock.",
        "Enforcement of 100% calfhood vaccination of female calves (4-8 months) with Brucella abortus Cotton Strain 19."
      ],
      containmentRadiiKm: {
        infectedZoneKm: 3.0,
        surveillanceZoneKm: 10.0
      },
      referenceDiagnosticLabs: [
        "ICAR-National Institute of Veterinary Epidemiology and Disease Informatics (NIVEDI), Bengaluru",
        "ICAR-IVRI, Izatnagar, Bareilly",
        "State Veterinary Biologicals / Disease Diagnostic Units"
      ],
      sampleCollectionRules: "Serum samples (5 ml) in plain sterile vacutainers for Rose Bengal Plate Test (RBPT) and ELISA. Aborted fetal stomach content (aspirated with sterile syringe), fetal abomasum, liver, spleen, and cotyledon tissue shipped on dry ice. Wear Level-2 PPE during collection."
    },

    // ========================================================================
    // 10. RABIES (रेबीज / जलांतक - 100% FATAL ZOONOSIS)
    // ========================================================================
    {
      id: "notifiable-rabies",
      name: "Rabies (Canine & Livestock Lyssavirus Encephalomyelitis)",
      nameHi: "रेबीज / जलांतक (घातक वायरल मस्तिष्क ज्वर)",
      causativeAgent: "Rabies Lyssavirus (Rhabdoviridae family)",
      governingAct: "National Action Plan for Dog Mediated Rabies Elimination (NAPRE) & Notifiable Zoonosis Status (GoI)",
      reportingTimeLimitHours: 12,
      targetSpecies: ["canine", "feline", "bovine", "bubaline", "equine"],
      mandatoryLegalAction: [
        "MANDATORY REPORTING WITHIN 12 HOURS to Municipal Health Authority, CVO, and District Health Officer.",
        "Immediate secure isolation of suspected biting animals under mandatory 10-day veterinary quarantine.",
        "Post-exposure prophylaxis (PEP) alert issued immediately to all human bite victims (Category III wound wash + RIG + ARV).",
        "Mass vaccination of all community street dogs in a 3-km radius under the Animal Birth Control (ABC-ARV) program.",
        "STRICT BAN ON POST-MORTEM IN OPEN FIELD: Brain tissue extraction performed strictly inside bio-containment facility by authorized officers."
      ],
      containmentRadiiKm: {
        infectedZoneKm: 3.0,
        surveillanceZoneKm: 5.0
      },
      referenceDiagnosticLabs: [
        "National Institute of Mental Health and Neurosciences (NIMHANS), WHO Collaborating Centre for Rabies, Bengaluru",
        "Central Research Institute (CRI), Kasauli, Himachal Pradesh",
        "Veterinary College Diagnostic Pathology Referral Centers"
      ],
      sampleCollectionRules: "Brain tissue (cerebellum, hippocampus, and brainstem) collected post-mortem. Ship on wet ice/glycerol saline under UN 2814 biohazard triple-packaging. DO NOT FIX IN FORMALIN IF PERFORMING DIRECT FLUORESCENT ANTIBODY TEST (dFAT)."
    }
  ];

  // 3. EPIDEMIOLOGICAL OUTBREAK REPORT GENERATOR & CALCULATION ENGINE
  const NotifiableEngine = {
    registry: NOTIFIABLE_REGISTRY
  };

  /**
   * Fast check returning whether a disease is legally notifiable.
   */
  NotifiableEngine.isDiseaseNotifiable = function (diseaseNameOrId) {
    if (!diseaseNameOrId || typeof diseaseNameOrId !== "string") return false;
    const q = diseaseNameOrId.trim().toLowerCase();
    return NOTIFIABLE_REGISTRY.some(function (d) {
      return (
        d.id.toLowerCase() === q ||
        d.name.toLowerCase().indexOf(q) !== -1 ||
        d.nameHi.indexOf(q) !== -1
      );
    });
  };

  /**
   * Fetches full statutory regulatory profile of a notifiable disease by ID.
   */
  NotifiableEngine.getNotifiableDiseaseById = function (id) {
    if (!id || typeof id !== "string") return null;
    const cleanId = id.trim().toLowerCase();
    for (let i = 0; i < NOTIFIABLE_REGISTRY.length; i++) {
      if (NOTIFIABLE_REGISTRY[i].id.toLowerCase() === cleanId) {
        return NOTIFIABLE_REGISTRY[i];
      }
    }
    return null;
  };

  /**
   * Returns list of all registered notifiable diseases under statutory law.
   */
  NotifiableEngine.getAllNotifiableDiseases = function () {
    return NOTIFIABLE_REGISTRY.slice();
  };

  /**
   * CALCULATES CONTAINMENT ZONES & RESTRICTION PERIMETERS:
   * Generates exact radial boundaries and enforcement directives for an epicenter.
   *
   * @param {Object} epicenterGps - { lat: number, lng: number }
   * @param {string} diseaseId - Notifiable disease ID
   */
  NotifiableEngine.calculateContainmentZones = function (epicenterGps, diseaseId) {
    const disease = NotifiableEngine.getNotifiableDiseaseById(diseaseId);
    if (!disease) {
      return { error: "Notifiable disease ID '" + diseaseId + "' not recognized." };
    }

    const lat = epicenterGps && typeof epicenterGps.lat === "number" ? epicenterGps.lat : null;
    const lng = epicenterGps && typeof epicenterGps.lng === "number" ? epicenterGps.lng : null;

    const infectedRadius = disease.containmentRadiiKm.infectedZoneKm;
    const surveillanceRadius = disease.containmentRadiiKm.surveillanceZoneKm;

    return {
      diseaseId: disease.id,
      diseaseName: disease.name,
      diseaseNameHi: disease.nameHi,
      epicenterCoordinates: { latitude: lat, longitude: lng },
      containmentZoning: {
        infectedZone: {
          radiusKm: infectedRadius,
          descriptionEn: "0 to " + infectedRadius + " km Radius from Epicenter (Infected / Stamping-Out Zone)",
          descriptionHi: "0 से " + infectedRadius + " किमी परिधि (संक्रमित क्षेत्र - पूर्ण लॉकडाउन)",
          enforcementDirectives: [
            "Total ban on entry and exit of susceptible animals.",
            "Complete closure of dairy pooling points and local weekly livestock markets.",
            "Establishment of 24/7 police-veterinary joint containment check-posts.",
            "Daily house-to-house clinical surveillance by designated veterinary teams."
          ]
        },
        surveillanceZone: {
          radiusKm: surveillanceRadius,
          descriptionEn: infectedRadius + " to " + surveillanceRadius + " km Radius from Epicenter (Buffer / Surveillance Zone)",
          descriptionHi: infectedRadius + " से " + surveillanceRadius + " किमी परिधि (निगरानी क्षेत्र - सतर्कता क्षेत्र)",
          enforcementDirectives: [
            "Active clinical disease monitoring and reporting of any new febrile or sick cases.",
            "Emergency ring vaccination of all eligible healthy animals.",
            "Intensive vector control and chemical disinfection of all transit routes."
          ]
        }
      }
    };
  };

  /**
   * OFFICIAL OUTBREAK REPORT GENERATOR (NADRS / NDLM / WOAH COMPLIANT):
   * Generates an official statutory epidemiological outbreak dossier.
   *
   * @param {Object} reportParams
   *   {
   *     diseaseId: string,
   *     village: string,
   *     block: string,
   *     district: string,
   *     state: string,
   *     gpsCoords: { lat: number, lng: number },
   *     speciesAffected: string,
   *     totalSusceptible: number,
   *     totalMorbidity: number,
   *     totalMortality: number,
   *     suspectedIndexCaseDate: string,
   *     vaccinationHistory: string,
   *     reportingVeterinarian: { name: string, registrationNo: string, designation: string }
   *   }
   */
  NotifiableEngine.generateOutbreakDossier = function (reportParams) {
    if (!reportParams || typeof reportParams !== "object") {
      return { error: "Invalid parameters supplied to generateOutbreakDossier." };
    }

    const disease = NotifiableEngine.getNotifiableDiseaseById(reportParams.diseaseId);
    if (!disease) {
      return { error: "Invalid or unregistered notifiable disease ID: " + reportParams.diseaseId };
    }

    const susceptible = parseInt(reportParams.totalSusceptible, 10) || 1;
    const morbidity = parseInt(reportParams.totalMorbidity, 10) || 0;
    const mortality = parseInt(reportParams.totalMortality, 10) || 0;

    // Mathematical Epidemiological Rates
    const morbidityRatePercent = Number(((morbidity / susceptible) * 100.0).toFixed(2));
    const mortalityRatePercent = Number(((mortality / susceptible) * 100.0).toFixed(2));
    const caseFatalityRatePercent = morbidity > 0 ? Number(((mortality / morbidity) * 100.0).toFixed(2)) : 0.0;

    // Report Metadata
    const reportTimestamp = new Date().toISOString();
    const dossierRefNumber = "NADRS-" + reportParams.district.substring(0, 3).toUpperCase() + "-" +
      new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);

    const zones = NotifiableEngine.calculateContainmentZones(reportParams.gpsCoords, disease.id);

    // Standardized Official Printable Document Output
    const printableOfficialText = [
      "================================================================================",
      "OFFICIAL STATUTORY OUTBREAK REPORT - EPIDEMIOLOGICAL EMERGENCY ALERT",
      "ISSUED UNDER THE PREVENTION & CONTROL OF INFECTIOUS DISEASES IN ANIMALS ACT, 2009",
      "================================================================================",
      "DOSSIER REFERENCE NO: " + dossierRefNumber,
      "DATE & TIME OF REPORT: " + reportTimestamp,
      "EMERGENCY CODE: CODE_RED_CRITICAL_OUTBREAK",
      "--------------------------------------------------------------------------------",
      "1. DISEASE CLASSIFICATION & LEGAL DIRECTIVE:",
      "   - Disease Name: " + disease.name + " (" + disease.nameHi + ")",
      "   - Causative Agent: " + disease.causativeAgent,
      "   - Governing Statute: " + disease.governingAct,
      "   - Mandatory Reporting Deadline: " + disease.reportingTimeLimitHours + " Hours",
      "",
      "2. OUTBREAK GEOGRAPHICAL LOCATION & JURISDICTION:",
      "   - Village: " + (reportParams.village || "N/A"),
      "   - Block / Tehsil: " + (reportParams.block || "N/A"),
      "   - District: " + (reportParams.district || "N/A"),
      "   - State: " + (reportParams.state || "N/A"),
      "   - GPS Coordinates: Lat " + (reportParams.gpsCoords && reportParams.gpsCoords.lat ? reportParams.gpsCoords.lat : "N/A") +
        ", Lng " + (reportParams.gpsCoords && reportParams.gpsCoords.lng ? reportParams.gpsCoords.lng : "N/A"),
      "",
      "3. EPIDEMIOLOGICAL METRICS & ATTACK RATES:",
      "   - Species Affected: " + (reportParams.speciesAffected || "Livestock").toUpperCase(),
      "   - Total Population at Risk (Susceptible): " + susceptible,
      "   - Confirmed Active Cases (Morbidity): " + morbidity + " (" + morbidityRatePercent + "% Attack Rate)",
      "   - Total Deaths Recorded (Mortality): " + mortality + " (" + mortalityRatePercent + "% Mortality Rate)",
      "   - Case Fatality Rate (CFR): " + caseFatalityRatePercent + "%",
      "   - Suspected Index Case Date: " + (reportParams.suspectedIndexCaseDate || "Unknown"),
      "   - Pre-Outbreak Vaccination History: " + (reportParams.vaccinationHistory || "None Recorded"),
      "",
      "4. CONTAINMENT BOUNDARIES (STATUTORY QUARANTINE ZONES):",
      "   - INFECTED ZONE (0 to " + disease.containmentRadiiKm.infectedZoneKm + " km): TOTAL LOCKDOWN. Complete movement ban on animals, milk, and fodder.",
      "   - SURVEILLANCE ZONE (" + disease.containmentRadiiKm.infectedZoneKm + " to " + disease.containmentRadiiKm.surveillanceZoneKm + " km): Active clinical surveillance & mandatory ring vaccination.",
      "",
      "5. STATUTORY ORDERS FOR FIELD VETERINARIANS & MAGISTRACY:",
      disease.mandatoryLegalAction.map((action, idx) => "   [" + (idx + 1) + "] " + action).join("\n"),
      "",
      "6. DESIGNATED NATIONAL/REGIONAL REFERRAL LABORATORIES:",
      disease.referenceDiagnosticLabs.map((lab, idx) => "   [" + (idx + 1) + "] " + lab).join("\n"),
      "",
      "7. DIAGNOSTIC SAMPLE SUBMISSION PROTOCOL:",
      "   " + disease.sampleCollectionRules,
      "",
      "8. REPORTING OFFICER AUTHENTICATION:",
      "   - Officer Name: " + (reportParams.reportingVeterinarian ? reportParams.reportingVeterinarian.name : "Designated Veterinary Officer"),
      "   - Registration No: " + (reportParams.reportingVeterinarian ? reportParams.reportingVeterinarian.registrationNo : "VCI/State Registered"),
      "   - Designation: " + (reportParams.reportingVeterinarian ? reportParams.reportingVeterinarian.designation : "Veterinary Assistant Surgeon (VAS)"),
      "================================================================================"
    ].join("\n");

    return {
      dossierRefNumber: dossierRefNumber,
      status: "CODE_RED_CRITICAL_OUTBREAK",
      timestamp: reportTimestamp,
      diseaseInfo: {
        id: disease.id,
        name: disease.name,
        nameHi: disease.nameHi,
        causativeAgent: disease.causativeAgent,
        governingAct: disease.governingAct
      },
      location: {
        village: reportParams.village,
        block: reportParams.block,
        district: reportParams.district,
        state: reportParams.state,
        coordinates: reportParams.gpsCoords
      },
      epidemiologicalStats: {
        totalSusceptible: susceptible,
        totalMorbidity: morbidity,
        totalMortality: mortality,
        morbidityRatePercent: morbidityRatePercent,
        mortalityRatePercent: mortalityRatePercent,
        caseFatalityRatePercent: caseFatalityRatePercent,
        suspectedIndexCaseDate: reportParams.suspectedIndexCaseDate
      },
      containmentZones: zones.containmentZoning,
      statutoryOrders: disease.mandatoryLegalAction,
      designatedReferralLabs: disease.referenceDiagnosticLabs,
      sampleCollectionProtocol: disease.sampleCollectionRules,
      printableDossierText: printableOfficialText
    };
  };

  /**
   * Retrieves step-by-step reporting guidelines for field veterinarians.
   */
  NotifiableEngine.getReportingGuidelines = function (diseaseId) {
    const disease = NotifiableEngine.getNotifiableDiseaseById(diseaseId);
    if (!disease) return null;

    return {
      diseaseName: disease.name,
      statutoryDeadlineHours: disease.reportingTimeLimitHours,
      hierarchyOfNotification: [
        "1. Immediate telephone alert to Chief Veterinary Officer (CVO) within " + disease.reportingTimeLimitHours + " hours.",
        "2. Flash telegraphic/electronic alert to District Magistrate (DM) under Section 4 of Act 27 of 2009.",
        "3. Real-time data entry on National Animal Disease Referral System (NADRS / NDLM) portal.",
        "4. Submission of diagnostic samples under cold-chain to nearest Regional Disease Diagnostic Laboratory (RDDL)."
      ],
      legalObligationNotice: "Failure of a registered veterinary practitioner to report a scheduled notifiable disease constitutes an offense punishable by law under Section 4(2) of the Prevention and Control of Infectious and Contagious Diseases in Animals Act, 2009."
    };
  };

  /**
   * Retrieves packaging, preservative, and transit guidelines for diagnostic samples.
   */
  NotifiableEngine.getLaboratorySubmissionProtocols = function (diseaseId) {
    const disease = NotifiableEngine.getNotifiableDiseaseById(diseaseId);
    if (!disease) return null;

    return {
      diseaseName: disease.name,
      sampleCollectionProtocol: disease.sampleCollectionRules,
      designatedReferralLabs: disease.referenceDiagnosticLabs,
      universalPackagingStandard: "UN 2814 Biological Substance Category A (Triple-Packaging): Primary leak-proof receptacle -> Secondary crush-proof absorbent container -> Rigid outer shipping package with biohazard label and dry ice/gel packs."
    };
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.NotifiableReporting = NotifiableEngine;

})();
