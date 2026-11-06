// Vetcare AI OS - Veterinary Antimicrobial Stewardship (AMS), AMR Prevention & WHO/WOAH Prescription Auditing Engine (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. WHO / WOAH / NAP-AMR VETERINARY DRUG STEWARDSHIP TIERS
  const STEWARDSHIP_TIERS = {
    TIER_1_ACCESS: {
      tierKey: "tier-1-access",
      tierNameEn: "Tier 1: Access / First-Line Empirical Antimicrobials",
      tierNameHi: "श्रेणी 1: प्राथमिक स्वीकृत एंटीबायोटिक्स (एक्सेस वर्ग)",
      clinicalIntent: "First-choice empirical therapy for common bacterial infections. Possesses lower resistance selection pressure while delivering proven clinical efficacy.",
      regulatoryStatus: "Unrestricted for approved veterinary indications with proper diagnostic evaluation.",
      drugs: [
        {
          drugId: "procaine-penicillin",
          genericName: "Procaine Penicillin G",
          class: "Natural Penicillins",
          spectrum: "Gram-positive, Clostridia, Erysipelothrix, Tetanus, Strangles",
          amrRisk: "Low",
          withdrawalDays: { bovine: { milk: 6, meat: 21 }, ovine: { milk: 6, meat: 21 }, equine: { milk: 0, meat: 28 } }
        },
        {
          drugId: "amoxicillin",
          genericName: "Amoxicillin Trihydrate",
          class: "Aminopenicillins",
          spectrum: "Gram-positive and non-beta-lactamase Gram-negative",
          amrRisk: "Low",
          withdrawalDays: { bovine: { milk: 3, meat: 10 }, caprine: { milk: 3, meat: 10 } }
        },
        {
          drugId: "ampicillin",
          genericName: "Ampicillin Sodium",
          class: "Aminopenicillins",
          spectrum: "Broad-spectrum parenteral penicillin",
          amrRisk: "Low",
          withdrawalDays: { bovine: { milk: 3, meat: 7 }, bubaline: { milk: 3, meat: 7 } }
        },
        {
          drugId: "oxytetracycline",
          genericName: "Oxytetracycline / Oxytetracycline LA",
          class: "Tetracyclines",
          spectrum: "Broad-spectrum, Mycoplasma, Anaplasma, Chlamydia, Rickettsia",
          amrRisk: "Low to Moderate",
          withdrawalDays: { bovine: { milk: 7, meat: 28 }, caprine: { milk: 7, meat: 28 }, ovine: { milk: 7, meat: 28 } }
        },
        {
          drugId: "trimethoprim-sulfa",
          genericName: "Trimethoprim + Sulfadiazine / Sulfamethoxazole",
          class: "Potentiated Sulfonamides",
          spectrum: "Broad-spectrum respiratory, enteric, and urinary pathogens",
          amrRisk: "Moderate",
          withdrawalDays: { bovine: { milk: 4, meat: 14 }, caprine: { milk: 4, meat: 14 }, equine: { milk: 0, meat: 14 } }
        },
        {
          drugId: "cephalexin",
          genericName: "Cephalexin",
          class: "1st Generation Cephalosporins",
          spectrum: "Gram-positive, Staphylococcus pseudintermedius (Canine Pyoderma)",
          amrRisk: "Low",
          withdrawalDays: { canine: { milk: 0, meat: 0 }, feline: { milk: 0, meat: 0 } }
        }
      ]
    },

    TIER_2_WATCH: {
      tierKey: "tier-2-watch",
      tierNameEn: "Tier 2: Watch / Second-Line Antimicrobials (Critically Important)",
      tierNameHi: "श्रेणी 2: द्वितीयक निगरानी एंटीबायोटिक्स (वॉच वर्ग)",
      clinicalIntent: "Critically important antimicrobials with higher risk of selecting for multi-drug resistant (MDR) mutants. USE STRICTLY AS SECOND-LINE THERAPY when Tier 1 fails, or when antimicrobial susceptibility testing (AST) culture confirms susceptibility.",
      regulatoryStatus: "Restricted. Requires documented failure of first-line agents or laboratory culture confirmation.",
      drugs: [
        {
          drugId: "enrofloxacin",
          genericName: "Enrofloxacin",
          class: "Fluoroquinolones (Highest Priority Critically Important - HPCIA)",
          spectrum: "Gram-negative bacteremia, Mycoplasma, severe respiratory infections",
          amrRisk: "Very High",
          withdrawalDays: { bovine: { milk: 4, meat: 14 }, caprine: { milk: 4, meat: 14 }, canine: { milk: 0, meat: 0 } },
          warning: "Never use as first-choice empirical therapy. High selection pressure for DNA gyrase mutations (ESBL and CRE co-selection)."
        },
        {
          drugId: "marbofloxacin",
          genericName: "Marbofloxacin",
          class: "Fluoroquinolones",
          spectrum: "Deep refractory pyoderma, complicated Gram-negative UTIs",
          amrRisk: "Very High",
          withdrawalDays: { canine: { milk: 0, meat: 0 }, feline: { milk: 0, meat: 0 }, bovine: { milk: 3, meat: 7 } },
          warning: "Reserved for culture-proven resistant Gram-negative infections."
        },
        {
          drugId: "ceftriaxone",
          genericName: "Ceftriaxone Sodium",
          class: "3rd Generation Cephalosporins (HPCIA)",
          spectrum: "Extended broad-spectrum Gram-negative coverage, sepsis",
          amrRisk: "Very High",
          withdrawalDays: { bovine: { milk: 4, meat: 7 }, bubaline: { milk: 4, meat: 7 }, canine: { milk: 0, meat: 0 } },
          warning: "Critically important human-veterinary shared molecule. High driver of Extended-Spectrum Beta-Lactamase (ESBL) dissemination."
        },
        {
          drugId: "ceftiofur",
          genericName: "Ceftiofur Sodium / Ceftiofur Crystalline Free Acid",
          class: "3rd Generation Veterinary Cephalosporins",
          spectrum: "Bovine Respiratory Disease (Mannheimia, Pasteurella), Acute Interdigital Necrobacillosis",
          amrRisk: "High",
          withdrawalDays: { bovine: { milk: 0, meat: 4 }, bubaline: { milk: 0, meat: 4 } },
          warning: "Although has zero milk withdrawal, widespread empirical overuse in mastitis is a leading driver of community ESBL resistance."
        },
        {
          drugId: "gentamicin",
          genericName: "Gentamicin Sulfate",
          class: "Aminoglycosides",
          spectrum: "Severe Gram-negative sepsis, Pseudomonas, equine intra-articular infections",
          amrRisk: "High",
          withdrawalDays: { bovine: { milk: 3, meat: 45 }, equine: { milk: 0, meat: 45 } },
          warning: "High nephrotoxic and ototoxic potential. Banned in food animals in several jurisdictions due to persistent 18-month renal residues."
        },
        {
          drugId: "tylosin",
          genericName: "Tylosin Tartrate",
          class: "Macrolides",
          spectrum: "Mycoplasmosis, swine dysentery, bovine foot rot",
          amrRisk: "Moderate to High",
          withdrawalDays: { bovine: { milk: 4, meat: 14 }, avian: { milk: 0, meat: 5 } },
          warning: "Cross-resistance with human macrolides (Azithromycin/Erythromycin)."
        }
      ]
    },

    TIER_3_RESERVE: {
      tierKey: "tier-3-reserve",
      tierNameEn: "Tier 3: Reserve / Last-Resort Companion Animal Antimicrobials",
      tierNameHi: "श्रेणी 3: रिजर्व / अंतिम उपाय एंटीबायोटिक्स (केवल गैर-खाद्य साथी पशु)",
      clinicalIntent: "Strictly reserved for life-threatening, documented multi-drug resistant (MDR) infections in non-food companion animals (dogs and cats) where all other classes have failed on culture. STRICTLY FORBIDDEN IN ALL FOOD-PRODUCING ANIMALS.",
      regulatoryStatus: "Mandatory Culture & Sensitivity testing required prior to prescription.",
      drugs: [
        {
          drugId: "cefovecin",
          genericName: "Cefovecin Sodium (Convenia)",
          class: "3rd Generation Cephalosporin (Ultra-Long Acting)",
          spectrum: "Deep skin infections, severe wound trauma in cats and dogs",
          amrRisk: "Extreme",
          withdrawalDays: { canine: { milk: 0, meat: 0 }, feline: { milk: 0, meat: 0 } },
          warning: "Single SC injection persists in tissues for up to 65 days at sub-MIC levels, exerting massive prolonged selection pressure for cephalosporin resistance."
        },
        {
          drugId: "piperacillin-tazobactam",
          genericName: "Piperacillin + Tazobactam (Pip-Tazo)",
          class: "Antipseudomonal Extended Penicillin + Inhibitor",
          spectrum: "Refractory Pseudomonas aeruginosa, life-threatening septic shock in small animal ICU",
          amrRisk: "Extreme",
          withdrawalDays: { canine: { milk: 0, meat: 0 }, feline: { milk: 0, meat: 0 } },
          warning: "Human critical care reserve molecule. Use in veterinary medicine is heavily restricted."
        },
        {
          drugId: "amikacin",
          genericName: "Amikacin Sulfate",
          class: "Aminoglycosides (High Potency)",
          spectrum: "Gentamicin-resistant Gram-negative bacteremia in companion animals and foals",
          amrRisk: "High",
          withdrawalDays: { canine: { milk: 0, meat: 0 }, feline: { milk: 0, meat: 0 }, equine: { milk: 0, meat: 60 } },
          warning: "Must strictly monitor peak and trough serum concentrations to avoid acute tubular necrosis."
        }
      ]
    },

    TIER_4_STRICTLY_BANNED: {
      tierKey: "tier-4-banned",
      tierNameEn: "Tier 4: Strictly Prohibited / Banned in Food Animals (Legal Red Flag)",
      tierNameHi: "श्रेणी 4: खाद्य उत्पादक पशुओं में पूर्णतः प्रतिबंधित व गैर-कानूनी औषधियां",
      clinicalIntent: "ABSOLUTELY PROHIBITED BY LAW from use in all food-producing animals (cattle, buffalo, sheep, goat, pig, poultry, fish). Use in food animals constitutes a criminal regulatory violation and severe public health hazard.",
      regulatoryStatus: "PROHIBITED / BANNED UNDER INDIAN DRUGS & COSMETICS ACT / WOAH / FDA.",
      drugs: [
        {
          drugId: "colistin-polymyxin",
          genericName: "Colistin (Polymyxin E)",
          bannedInSpecies: ["bovine", "bubaline", "caprine", "ovine", "avian", "swine"],
          legalCitation: "Ministry of Health & Family Welfare, Govt. of India Notification G.S.R. 520(E) under Section 26A of Drugs & Cosmetics Act 1940: Complete ban on manufacturing, sale, and distribution of Colistin and its formulations for food-producing animals, poultry, and aqua.",
          publicHealthRationale: "Colistin is the last-resort reserve antibiotic in human critical care for pan-drug resistant (PDR) and Carbapenem-Resistant Enterobacteriaceae (CRE). Agricultural overuse driven by the plasmid-mediated mcr-1 gene renders human medicine defenseless."
        },
        {
          drugId: "chloramphenicol",
          genericName: "Chloramphenicol",
          bannedInSpecies: ["bovine", "bubaline", "caprine", "ovine", "avian", "swine", "equine"],
          legalCitation: "Global Food Safety Ban / FSSAI & FDA Food Animal Prohibition",
          publicHealthRationale: "Chloramphenicol residues in meat, milk, or eggs trigger idiosyncratic, non-dose dependent, irreversible and fatal Aplastic Anemia in consuming humans."
        },
        {
          drugId: "nitrofurans",
          genericName: "Nitrofurans (Furazolidone, Furaltadone, Nitrofurazone)",
          bannedInSpecies: ["bovine", "bubaline", "caprine", "ovine", "avian", "swine"],
          legalCitation: "Govt of India Gazette Notification / Global Food Safety Ban",
          publicHealthRationale: "Metabolites (AOZ, AMOZ, AHD, SEM) bind permanently to tissues and are proven mutagens, genotoxic agents, and human carcinogens."
        },
        {
          drugId: "carbapenems",
          genericName: "Carbapenems (Meropenem, Imipenem, Doripenem, Ertapenem)",
          bannedInSpecies: ["bovine", "bubaline", "caprine", "ovine", "avian", "swine", "equine"],
          legalCitation: "WHO / WOAH Global Reserve Preservation Protocol",
          publicHealthRationale: "Highest reserve line of defense against multidrug-resistant human hospital infections. Veterinary use in food production is universally condemned."
        },
        {
          drugId: "glycopeptides",
          genericName: "Glycopeptides (Vancomycin, Teicoplanin)",
          bannedInSpecies: ["bovine", "bubaline", "caprine", "ovine", "avian", "swine"],
          legalCitation: "WHO Critically Important Antimicrobial Protocol",
          publicHealthRationale: "Essential human reserve for Methicillin-Resistant Staphylococcus aureus (MRSA). Historical use of avoparcin in livestock drove Vancomycin-Resistant Enterococci (VRE) outbreaks globally."
        }
      ]
    }
  };

  // 3. EMPIRICAL FIRST-LINE ANTIMICROBIAL SELECTION MATRIX
  const EMPIRICAL_FIRST_LINE_GUIDANCE = {
    "cond-bovine-respiratory": {
      conditionNameEn: "Bovine Respiratory Disease (BRD / Pneumonia)",
      conditionNameHi: "श्वसन रोग / निमोनिया",
      recommendedTier1: ["oxytetracycline", "procaine-penicillin"],
      watchTier2Alternatives: ["ceftiofur", "enrofloxacin"],
      clinicalRationale: "Oxytetracycline LA achieves high therapeutic concentrations in pulmonary consolidation. Reserve 3rd-generation cephalosporins (Ceftiofur) exclusively for acute non-responsive cases."
    },
    "cond-clinical-mastitis": {
      conditionNameEn: "Acute Clinical Mastitis",
      conditionNameHi: "तीव्र थनैला रोग",
      recommendedTier1: ["amoxicillin", "ampicillin"],
      watchTier2Alternatives: ["ceftriaxone", "enrofloxacin"],
      clinicalRationale: "First-line therapy should consist of intramammary beta-lactams (Cephapirin/Amoxicillin) combined with systemic parenteral ampicillin. Systemic 3rd-gen cephalosporins are heavily overprescribed and must be reserved for toxic coliform mastitis."
    },
    "cond-acute-metritis": {
      conditionNameEn: "Acute Post-Partum Metritis",
      conditionNameHi: "प्रसव बाद गर्भाशय संक्रमण (मेट्राइटिस)",
      recommendedTier1: ["procaine-penicillin", "ampicillin", "oxytetracycline"],
      watchTier2Alternatives: ["ceftiofur"],
      clinicalRationale: "Systemic Penicillin or Ampicillin penetrates the deep vascularized post-calving myometrium effectively. Avoid intra-uterine irritants."
    },
    "cond-canine-pyoderma": {
      conditionNameEn: "Canine Superficial & Deep Pyoderma",
      conditionNameHi: "कुत्तों में त्वचा संक्रमण (पायोडर्मा)",
      recommendedTier1: ["cephalexin", "amoxicillin"],
      watchTier2Alternatives: ["enrofloxacin", "marbofloxacin"],
      clinicalRationale: "Staphylococcus pseudintermedius is highly susceptible to 1st-generation cephalosporins (Cephalexin 25-30 mg/kg BD). NEVER prescribe fluoroquinolones empirically for uncomplicated skin infections."
    },
    "cond-canine-uti": {
      conditionNameEn: "Canine / Feline Uncomplicated Urinary Tract Infection",
      conditionNameHi: "मूत्र मार्ग संक्रमण (यूटीआई)",
      recommendedTier1: ["amoxicillin", "trimethoprim-sulfa"],
      watchTier2Alternatives: ["enrofloxacin"],
      clinicalRationale: "Amoxicillin achieves astronomical concentrations in urine (10-20x serum level), making it highly curative for E. coli cystitis. Fluoroquinolones are strictly indicated only in pyelonephritis or prostatitis."
    },
    "cond-calf-scours": {
      conditionNameEn: "Calf Scours / Enteritis (Non-viral)",
      conditionNameHi: "बछड़ों के दस्त",
      recommendedTier1: ["trimethoprim-sulfa", "amoxicillin"],
      watchTier2Alternatives: ["enrofloxacin"],
      clinicalRationale: "ORAL REHYDRATION THERAPY IS THE PRIMARY LIFESAVING MEASURE. Antibiotics are indicated only if systemic bacteremia/fever is present. Overusing enrofloxacin destroys remaining commensal microflora."
    }
  };

  // 4. ANTIMICROBIAL STEWARDSHIP ENGINE IMPLEMENTATION
  const StewardshipEngine = {
    tiers: STEWARDSHIP_TIERS,
    empiricalGuidelines: EMPIRICAL_FIRST_LINE_GUIDANCE
  };

  /**
   * Helper: Identifies which tier a given drugId belongs to.
   */
  StewardshipEngine.getDrugTier = function (drugId) {
    if (!drugId || typeof drugId !== "string") return null;
    const cleanId = drugId.trim().toLowerCase();

    // Check Tier 4 Banned
    const bannedDrugs = STEWARDSHIP_TIERS.TIER_4_STRICTLY_BANNED.drugs;
    for (let i = 0; i < bannedDrugs.length; i++) {
      if (bannedDrugs[i].drugId.indexOf(cleanId) !== -1 || cleanId.indexOf(bannedDrugs[i].drugId) !== -1) {
        return {
          tier: "TIER_4_BANNED",
          tierKey: STEWARDSHIP_TIERS.TIER_4_STRICTLY_BANNED.tierKey,
          tierNameEn: STEWARDSHIP_TIERS.TIER_4_STRICTLY_BANNED.tierNameEn,
          drugInfo: bannedDrugs[i]
        };
      }
    }

    // Check Tier 3 Reserve
    const reserveDrugs = STEWARDSHIP_TIERS.TIER_3_RESERVE.drugs;
    for (let i = 0; i < reserveDrugs.length; i++) {
      if (reserveDrugs[i].drugId.indexOf(cleanId) !== -1 || cleanId.indexOf(reserveDrugs[i].drugId) !== -1) {
        return {
          tier: "TIER_3_RESERVE",
          tierKey: STEWARDSHIP_TIERS.TIER_3_RESERVE.tierKey,
          tierNameEn: STEWARDSHIP_TIERS.TIER_3_RESERVE.tierNameEn,
          drugInfo: reserveDrugs[i]
        };
      }
    }

    // Check Tier 2 Watch
    const watchDrugs = STEWARDSHIP_TIERS.TIER_2_WATCH.drugs;
    for (let i = 0; i < watchDrugs.length; i++) {
      if (watchDrugs[i].drugId.indexOf(cleanId) !== -1 || cleanId.indexOf(watchDrugs[i].drugId) !== -1) {
        return {
          tier: "TIER_2_WATCH",
          tierKey: STEWARDSHIP_TIERS.TIER_2_WATCH.tierKey,
          tierNameEn: STEWARDSHIP_TIERS.TIER_2_WATCH.tierNameEn,
          drugInfo: watchDrugs[i]
        };
      }
    }

    // Check Tier 1 Access
    const accessDrugs = STEWARDSHIP_TIERS.TIER_1_ACCESS.drugs;
    for (let i = 0; i < accessDrugs.length; i++) {
      if (accessDrugs[i].drugId.indexOf(cleanId) !== -1 || cleanId.indexOf(accessDrugs[i].drugId) !== -1) {
        return {
          tier: "TIER_1_ACCESS",
          tierKey: STEWARDSHIP_TIERS.TIER_1_ACCESS.tierKey,
          tierNameEn: STEWARDSHIP_TIERS.TIER_1_ACCESS.tierNameEn,
          drugInfo: accessDrugs[i]
        };
      }
    }

    return null;
  };

  /**
   * Returns complete list of drugs prohibited by law in food animals.
   */
  StewardshipEngine.getProhibitedDrugsList = function () {
    return STEWARDSHIP_TIERS.TIER_4_STRICTLY_BANNED.drugs.slice();
  };

  /**
   * PRESCRIPTION AUDITING & STEWARDSHIP VALIDATION ENGINE:
   * Rigorously audits antimicrobial prescriptions against WHO/WOAH standards and Indian legal bans.
   *
   * @param {string} drugId - Drug identifier (e.g., 'colistin', 'enrofloxacin', 'oxytetracycline')
   * @param {string} conditionId - Diagnostic condition key (e.g., 'cond-bovine-respiratory')
   * @param {string} species - Animal species e.g. 'bovine', 'canine', 'avian'
   * @param {boolean} isCultureConfirmed - True if culture & antimicrobial susceptibility testing (AST) confirms susceptibility
   * @param {Array} previousFailedDrugs - Array of drugIds that failed prior clinical therapy
   * @param {number} durationDays - Planned course duration in days
   */
  StewardshipEngine.auditPrescription = function (drugId, conditionId, species, isCultureConfirmed, previousFailedDrugs, durationDays) {
    if (!drugId) {
      return { approved: false, warningLevel: "VIOLATION", message: "No antimicrobial drug specified for audit." };
    }

    const sp = (species || "bovine").trim().toLowerCase();
    const isFoodAnimal = ["bovine", "bubaline", "caprine", "ovine", "avian", "swine"].indexOf(sp) !== -1;
    const tierResult = StewardshipEngine.getDrugTier(drugId);
    const duration = parseInt(durationDays, 10) || 5;
    const failedList = Array.isArray(previousFailedDrugs) ? previousFailedDrugs : [];
    const hasPriorFailure = failedList.length > 0;

    // 1. TIER 4: ABSOLUTE PROHIBITION CHECK (CRITICAL LEGAL RED FLAG)
    if (tierResult && tierResult.tier === "TIER_4_BANNED") {
      const bannedDrug = tierResult.drugInfo;
      if (isFoodAnimal && bannedDrug.bannedInSpecies.indexOf(sp) !== -1) {
        return {
          approved: false,
          tier: "TIER_4_STRICTLY_BANNED",
          warningLevel: "CRITICAL_BAN",
          legalAlert: "LEGAL BAN VIOLATION: Prescribing " + bannedDrug.genericName + " in food-producing animals (" + sp + ") is strictly prohibited by law.",
          statutoryCitation: bannedDrug.legalCitation,
          publicHealthRationale: bannedDrug.publicHealthRationale,
          message: "PRESCRIPTION REJECTED: Colistin and prohibited reserve antimicrobials are legally banned in livestock and poultry. Prescribing this molecule carries severe legal penalties under the Drugs & Cosmetics Act and drives untreatable superbug transmission to humans.",
          recommendedAlternatives: ["oxytetracycline", "amoxicillin", "trimethoprim-sulfa"]
        };
      }
    }

    // 2. TIER 3: RESERVE COMPANION-ONLY CHECK
    if (tierResult && tierResult.tier === "TIER_3_RESERVE") {
      if (isFoodAnimal) {
        return {
          approved: false,
          tier: "TIER_3_RESERVE",
          warningLevel: "VIOLATION",
          message: "PRESCRIPTION REJECTED: Tier 3 Reserve molecules (Cefovecin, Pip-Tazo, Amikacin) are strictly forbidden in food-producing animals. Reserve antimicrobials are legally restricted to companion animals.",
          recommendedAlternatives: ["procaine-penicillin", "oxytetracycline", "amoxicillin"]
        };
      }
      if (!isCultureConfirmed && !hasPriorFailure) {
        return {
          approved: false,
          tier: "TIER_3_RESERVE",
          warningLevel: "VIOLATION",
          message: "STEWARDSHIP VIOLATION: Tier 3 Reserve antimicrobials cannot be prescribed empirically. Mandatory laboratory Culture & Antimicrobial Susceptibility Testing (AST) documentation is required.",
          recommendedAlternatives: ["cephalexin", "amoxicillin"]
        };
      }
    }

    // 3. TIER 2: WATCH SECOND-LINE AUDIT
    if (tierResult && tierResult.tier === "TIER_2_WATCH") {
      if (!isCultureConfirmed && !hasPriorFailure) {
        const guideline = conditionId ? EMPIRICAL_FIRST_LINE_GUIDANCE[conditionId] : null;
        const suggested = guideline ? guideline.recommendedTier1 : ["oxytetracycline", "amoxicillin", "procaine-penicillin"];

        return {
          approved: true, // Conditionally approved with heavy warning
          tier: "TIER_2_WATCH",
          warningLevel: "CAUTION",
          message: "STEWARDSHIP WARNING (Second-Line Overuse): You are prescribing a Tier 2 Watch Antimicrobial (" + tierResult.drugInfo.genericName + ") as initial empirical therapy without culture confirmation. Consider initiating therapy with a Tier 1 Access drug.",
          stewardshipAdvisory: tierResult.drugInfo.warning || "Fluoroquinolones and 3rd-generation cephalosporins drive community-wide ESBL and CRE resistance.",
          recommendedAlternatives: suggested
        };
      }
    }

    // 4. SUBTHERAPEUTIC DURATION AUDIT (AMR MUTATION PRESSURE)
    if (duration < 3) {
      return {
        approved: true,
        tier: tierResult ? tierResult.tier : "TIER_1_ACCESS",
        warningLevel: "CAUTION",
        message: "AMR RISK WARNING: Planned treatment duration is only " + duration + " day(s). Antibiotic courses shorter than 3-5 days lead to subtherapeutic drug exposure, selecting for resistant bacterial sub-populations. Ensure complete clinical course.",
        recommendedAlternatives: []
      };
    }

    // 5. FIRST-LINE TIER 1 APPROVAL
    return {
      approved: true,
      tier: tierResult ? tierResult.tier : "TIER_1_ACCESS",
      warningLevel: "NONE",
      message: "PRESCRIPTION APPROVED: Conforms with WHO, WOAH, and National Action Plan on AMR (NAP-AMR) guidelines. Rational first-line access antimicrobial selection.",
      recommendedAlternatives: []
    };
  };

  /**
   * WITHDRAWAL PERIOD AUDITING ENGINE:
   * Returns mandatory statutory milk and meat withdrawal periods to safeguard the human food chain.
   */
  StewardshipEngine.getWithdrawalSafety = function (drugId, species) {
    const sp = (species || "bovine").trim().toLowerCase();
    const tierResult = StewardshipEngine.getDrugTier(drugId);

    if (!tierResult || !tierResult.drugInfo || !tierResult.drugInfo.withdrawalDays) {
      return {
        drugId: drugId,
        species: sp,
        hasStatutoryWithdrawal: false,
        message: "Withdrawal data not cataloged or drug is non-absorbable/topical. Exercise standard caution."
      };
    }

    const wdTable = tierResult.drugInfo.withdrawalDays;
    const spData = wdTable[sp] || wdTable.bovine || { milk: 3, meat: 14 };

    return {
      drugId: drugId,
      genericName: tierResult.drugInfo.genericName,
      species: sp,
      hasStatutoryWithdrawal: true,
      milkWithdrawalDays: spData.milk || 0,
      meatWithdrawalDays: spData.meat || 0,
      farmerWarningEn: "STATUTORY FOOD SAFETY ADVISORY: Milk from this animal MUST BE COMPLETELY WITHHELD from human consumption, sale, or dairy pooling during the entire treatment period PLUS a mandatory " + (spData.milk || 0) + " DAYS following the final dose. Meat withdrawal: " + (spData.meat || 0) + " days.",
      farmerWarningHi: "खाद्य सुरक्षा चेतावनी: इस पशु का दूध उपचार के दौरान और अंतिम इंजेक्शन के बाद कम से कम " + (spData.milk || 0) + " दिनों तक डेयरी या बाजार में बेचना व घर में पीना सख्त मना है। मांस निकासी अवधि: " + (spData.meat || 0) + " दिन।"
    };
  };

  /**
   * CLINIC / FARM AMR COMPLIANCE SCORE CALCULATOR:
   * Computes an institutional stewardship index (0 to 100 score) based on prescription history.
   *
   * @param {Array} prescriptionHistoryArray - Array of { drugId, species, isCultureConfirmed }
   */
  StewardshipEngine.calculateAmrRiskScore = function (prescriptionHistoryArray) {
    if (!Array.isArray(prescriptionHistoryArray) || prescriptionHistoryArray.length === 0) {
      return { score: 100, rating: "EXCELLENT", message: "No antimicrobial prescriptions on record." };
    }

    let score = 100;
    let tier1Count = 0;
    let tier2UnculturedCount = 0;
    let tier3Count = 0;
    let tier4Count = 0;

    prescriptionHistoryArray.forEach(function (rx) {
      const tierObj = StewardshipEngine.getDrugTier(rx.drugId);
      const isFood = ["bovine", "bubaline", "caprine", "ovine", "avian"].indexOf((rx.species || "bovine").toLowerCase()) !== -1;

      if (!tierObj) return;

      if (tierObj.tier === "TIER_4_BANNED" && isFood) {
        tier4Count++;
        score = 0; // INSTANT ZERO FOR BANNED MOLECULES IN FOOD ANIMALS
      } else if (tierObj.tier === "TIER_3_RESERVE") {
        tier3Count++;
        score -= 20;
      } else if (tierObj.tier === "TIER_2_WATCH" && !rx.isCultureConfirmed) {
        tier2UnculturedCount++;
        score -= 5;
      } else if (tierObj.tier === "TIER_1_ACCESS") {
        tier1Count++;
      }
    });

    score = Math.max(0, Math.min(100, score));

    let rating = "GOOD (AMR Compliant)";
    if (score < 40) {
      rating = "CRITICAL / POOR (High AMR Selection Risk)";
    } else if (score < 75) {
      rating = "FAIR / WATCH (Overusing Second-Line Drugs Empirically)";
    } else if (score >= 90) {
      rating = "EXCELLENT (Gold Standard Stewardship)";
    }

    return {
      stewardshipScore: score,
      rating: rating,
      totalPrescriptionsAudited: prescriptionHistoryArray.length,
      breakdown: {
        tier1AccessCount: tier1Count,
        tier2WatchUnculturedCount: tier2UnculturedCount,
        tier3ReserveCount: tier3Count,
        tier4IllegalBannedCount: tier4Count
      },
      auditFeedback: tier4Count > 0
        ? "CRITICAL REGULATORY VIOLATION: Banned substances detected in food-producing animal prescriptions."
        : tier2UnculturedCount > tier1Count
          ? "ACTION REQUIRED: Shift empirical prescribing from Tier 2 Watch drugs (Enrofloxacin, Ceftriaxone) to Tier 1 Access drugs (Penicillins, Tetracyclines)."
          : "Stewardship protocols aligned with National Action Plan on Antimicrobial Resistance."
    };
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.AntimicrobialStewardship = StewardshipEngine;

})();
