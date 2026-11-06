// Vetcare AI OS - Master Veterinary Drug Formulary, Multi-Species Dosages & Safety Contraindications (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. MASTER VETERINARY DRUG FORMULARY (30 COMPREHENSIVE ZERO-PLACEHOLDER DOSSIERS)
  window.VetcareApp.ClinicalData.Drugs = [
    // ------------------------------------------------------------------------
    // ANTIMICROBIALS & ANTIBIOTICS
    // ------------------------------------------------------------------------
    {
      id: "enrofloxacin-10",
      genericName: "Enrofloxacin",
      category: "Antibiotic",
      commonBrands: ["Meriquin 10%", "Enrocin 100mg/ml", "Baytril 10%", "Fortivir 100"],
      standardConcentration: "100 mg/ml (10% Solution)",
      concentrationMgPerMl: 100.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 5.0, route: "IM", defaultFrequency: "OD", durationDays: 4 },
        bubaline: { doseMgPerKg: 5.0, route: "IM", defaultFrequency: "OD", durationDays: 4 },
        caprine: { doseMgPerKg: 5.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        ovine: { doseMgPerKg: 5.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        equine: { doseMgPerKg: 5.0, route: "IV", defaultFrequency: "OD", durationDays: 5 },
        canine: { doseMgPerKg: 5.0, route: "SC", defaultFrequency: "OD", durationDays: 5 },
        feline: { doseMgPerKg: 2.5, route: "SC", defaultFrequency: "OD", durationDays: 3 },
        avian: { doseMgPerKg: 10.0, route: "Oral", defaultFrequency: "Continuous", durationDays: 5 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe in pregnant ruminants at labeled therapeutic doses. Use cautiously during late organogenesis.",
      withdrawalPeriod: { milkDays: 4, meatDays: 14 },
      adverseEffectsAndWarnings: [
        "CONTRAINDICATED in growing puppies (<12-18 months) due to irreversible articular cartilage arthropathy.",
        "CRITICAL IN FELINES: Do not exceed 5 mg/kg/day; higher doses induce acute, irreversible retinal degeneration and permanent blindness.",
        "Rapid IV administration can precipitate acute hypotensive collapse and central nervous seizures."
      ],
      storage: "Store below 25°C protected from direct sunlight. Do not freeze."
    },
    {
      id: "ceftriaxone-tazobactam",
      genericName: "Ceftriaxone Sodium + Tazobactam Sodium",
      category: "Antibiotic",
      commonBrands: ["Intacef Tazo 3.375g/4.5g", "Cef-Tazo Vet", "Zocef-Tazo", "M-Ceft Tazo"],
      standardConcentration: "Reconstituted Solution (Approx 250 mg/ml combined)",
      concentrationMgPerMl: 250.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 8.0, route: "IM", defaultFrequency: "OD", durationDays: 4 },
        bubaline: { doseMgPerKg: 8.0, route: "IM", defaultFrequency: "OD", durationDays: 4 },
        caprine: { doseMgPerKg: 10.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        ovine: { doseMgPerKg: 10.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        equine: { doseMgPerKg: 15.0, route: "IV", defaultFrequency: "BD", durationDays: 5 },
        canine: { doseMgPerKg: 25.0, route: "IV", defaultFrequency: "BD", durationDays: 5 },
        feline: { doseMgPerKg: 25.0, route: "SC", defaultFrequency: "BD", durationDays: 5 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Pregnancy Category B. Fully safe throughout all trimesters of pregnancy in cattle, buffaloes, and dogs.",
      withdrawalPeriod: { milkDays: 3, meatDays: 7 },
      adverseEffectsAndWarnings: [
        "Reconstitute only with Sterile Water for Injection; use immediately within 2 hours.",
        "Deep IM injection can cause localized muscle pain and transient swelling at the injection site.",
        "Do not infuse simultaneously with calcium-containing intravenous solutions (e.g., Ringer's Lactate or Calcium Borogluconate) to prevent particulate micro-precipitation."
      ],
      storage: "Store unconstituted dry powder below 25°C. Discard reconstituted solution after 12 hours if refrigerated."
    },
    {
      id: "oxytetracycline-la",
      genericName: "Oxytetracycline Dihydrate (Long Acting)",
      category: "Antibiotic",
      commonBrands: ["Terramycin LA 200mg/ml", "Zycort-LA", "Oxytet-LA", "Alamycin LA"],
      standardConcentration: "200 mg/ml (20% Long Acting Formulation)",
      concentrationMgPerMl: 200.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 20.0, route: "IM", defaultFrequency: "Stat", durationDays: 3 },
        bubaline: { doseMgPerKg: 20.0, route: "IM", defaultFrequency: "Stat", durationDays: 3 },
        caprine: { doseMgPerKg: 20.0, route: "IM", defaultFrequency: "Stat", durationDays: 3 },
        ovine: { doseMgPerKg: 20.0, route: "IM", defaultFrequency: "Stat", durationDays: 3 },
        canine: { doseMgPerKg: 10.0, route: "SC", defaultFrequency: "OD", durationDays: 4 }
      },
      pregnancySafe: false,
      pregnancyWarning: "CONTRAINDICATED in late pregnancy: Chelates fetal calcium, causing permanent enamel hypoplasia, yellow-brown tooth discoloration, and stunted long-bone growth.",
      withdrawalPeriod: { milkDays: 7, meatDays: 28 },
      adverseEffectsAndWarnings: [
        "Do NOT administer intravenously as a rapid bolus (causes acute collapse due to systemic calcium binding and cardiac arrest).",
        "Deep IM only: Do not inject more than 10 to 15 ml at a single anatomical injection site in cattle.",
        "High localized tissue irritancy; avoid in horses due to severe risk of disrupting gut microflora and triggering fatal enterocolitis."
      ],
      storage: "Store below 25°C protected from light. Darkening of solution does not necessarily indicate loss of potency."
    },
    {
      id: "amoxicillin-sulbactam",
      genericName: "Amoxicillin Sodium + Sulbactam Sodium",
      category: "Antibiotic",
      commonBrands: ["Amoxinsol 3g/4.5g", "Clavam-Vet", "Bactoclav Vet", "Vetmox-Plus"],
      standardConcentration: "Reconstituted 300 mg/ml combined",
      concentrationMgPerMl: 300.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 8.0, route: "IM", defaultFrequency: "OD", durationDays: 4 },
        bubaline: { doseMgPerKg: 8.0, route: "IM", defaultFrequency: "OD", durationDays: 4 },
        caprine: { doseMgPerKg: 10.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        ovine: { doseMgPerKg: 10.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        canine: { doseMgPerKg: 20.0, route: "SC", defaultFrequency: "BD", durationDays: 5 },
        feline: { doseMgPerKg: 20.0, route: "SC", defaultFrequency: "BD", durationDays: 5 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe throughout pregnancy and lactation. Drug of choice for respiratory and reproductive infections in pregnant stock.",
      withdrawalPeriod: { milkDays: 3, meatDays: 10 },
      adverseEffectsAndWarnings: [
        "Contraindicated in animals with a verified history of severe beta-lactam hypersensitivity.",
        "NEVER administer orally to rabbits, guinea pigs, or hamsters (triggers fatal Clostridial enterotoxemia).",
        "Reconstitute gently and inspect for complete clarity prior to injection."
      ],
      storage: "Store dry vials below 25°C. Use reconstituted solution immediately."
    },
    {
      id: "procaine-penicillin-g",
      genericName: "Procaine Penicillin G",
      category: "Antibiotic",
      commonBrands: ["Depocillin (300,000 IU/ml)", "Penstir 30%", "Vet-Pen LA", "Bistrepen"],
      standardConcentration: "300,000 IU/ml (Approx 300 mg/ml)",
      concentrationMgPerMl: 300.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 20.0, route: "IM", defaultFrequency: "OD", durationDays: 5 },
        bubaline: { doseMgPerKg: 20.0, route: "IM", defaultFrequency: "OD", durationDays: 5 },
        caprine: { doseMgPerKg: 20.0, route: "IM", defaultFrequency: "OD", durationDays: 5 },
        ovine: { doseMgPerKg: 20.0, route: "IM", defaultFrequency: "OD", durationDays: 5 },
        equine: { doseMgPerKg: 22.0, route: "IM", defaultFrequency: "BD", durationDays: 7 },
        canine: { doseMgPerKg: 20.0, route: "IM", defaultFrequency: "OD", durationDays: 5 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe in pregnancy. Highly indicated for clostridial infections, tetanus, and strangles.",
      withdrawalPeriod: { milkDays: 6, meatDays: 21 },
      adverseEffectsAndWarnings: [
        "FATAL WARNING: ABSOLUTELY NEVER ADMINISTER INTRAVENOUSLY (IV). Accidental IV injection causes immediate violent seizures, acute central nervous system excitement, collapse, and instant death from procaine toxicity.",
        "Always aspirate before injection to verify no vascular entry.",
        "Shake well before use to ensure uniform microcrystalline suspension."
      ],
      storage: "Keep refrigerated between 2°C and 8°C. Do not freeze."
    },
    {
      id: "gentamicin-sulfate",
      genericName: "Gentamicin Sulfate",
      category: "Antibiotic",
      commonBrands: ["Genticyn 40mg/ml / 100mg/ml", "Gentavet", "Garacin 100"],
      standardConcentration: "100 mg/ml (10% Solution)",
      concentrationMgPerMl: 100.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 5.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        bubaline: { doseMgPerKg: 5.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        caprine: { doseMgPerKg: 5.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        equine: { doseMgPerKg: 6.6, route: "IV", defaultFrequency: "OD", durationDays: 5 },
        canine: { doseMgPerKg: 6.0, route: "SC", defaultFrequency: "OD", durationDays: 4 },
        feline: { doseMgPerKg: 5.0, route: "SC", defaultFrequency: "OD", durationDays: 3 }
      },
      pregnancySafe: false,
      pregnancyWarning: "CONTRAINDICATED in pregnancy: Crosses the placental barrier causing significant fetal nephrotoxicity and congenital ototoxicity (deafness).",
      withdrawalPeriod: { milkDays: 3, meatDays: 45 },
      adverseEffectsAndWarnings: [
        "NEPHROTOXIC AND OTOTOXIC: Never administer to dehydrated, hypovolemic, or azotemic animals.",
        "Once-daily (OD) dosing provides equivalent efficacy with significantly lower nephrotoxic risk compared to divided doses.",
        "Ensure patient has unlimited access to clean drinking water throughout the treatment course."
      ],
      storage: "Store below 25°C. Protect from light."
    },
    {
      id: "tylosin-tartrate",
      genericName: "Tylosin Tartrate",
      category: "Antibiotic",
      commonBrands: ["Tylosin-200 (200mg/ml)", "Tylovet", "Tylon 20%"],
      standardConcentration: "200 mg/ml (20% Solution)",
      concentrationMgPerMl: 200.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 10.0, route: "IM", defaultFrequency: "OD", durationDays: 4 },
        bubaline: { doseMgPerKg: 10.0, route: "IM", defaultFrequency: "OD", durationDays: 4 },
        caprine: { doseMgPerKg: 10.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        ovine: { doseMgPerKg: 10.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        avian: { doseMgPerKg: 25.0, route: "Oral", defaultFrequency: "Continuous", durationDays: 5 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Considered safe in pregnancy. Useful for Mycoplasma, foot rot, and contagious caprine pleuropneumonia (CCPP).",
      withdrawalPeriod: { milkDays: 4, meatDays: 14 },
      adverseEffectsAndWarnings: [
        "FATAL WARNING IN EQUINES: NEVER administer Tylosin to horses or equids; triggers catastrophic, fatal necrotizing typhlocolitis.",
        "Do not administer via the IV route in ruminants (causes severe thrombophlebitis and cardiac collapse).",
        "Deep IM only; maximum 10 ml per injection site in adult cattle."
      ],
      storage: "Store below 25°C protected from freezing."
    },
    {
      id: "metronidazole-infusion",
      genericName: "Metronidazole",
      category: "Antibiotic",
      commonBrands: ["Metrogyl IV (5mg/ml / 500mg/100ml)", "Metrovirus", "Aristogyl"],
      standardConcentration: "5 mg/ml (0.5% Ready-to-Use Infusion)",
      concentrationMgPerMl: 5.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 15.0, route: "IV", defaultFrequency: "OD", durationDays: 3 },
        bubaline: { doseMgPerKg: 15.0, route: "IV", defaultFrequency: "OD", durationDays: 3 },
        caprine: { doseMgPerKg: 10.0, route: "IV", defaultFrequency: "BD", durationDays: 3 },
        equine: { doseMgPerKg: 20.0, route: "Oral", defaultFrequency: "TDS", durationDays: 5 },
        canine: { doseMgPerKg: 12.0, route: "IV", defaultFrequency: "BD", durationDays: 5 },
        feline: { doseMgPerKg: 10.0, route: "IV", defaultFrequency: "BD", durationDays: 5 }
      },
      pregnancySafe: false,
      pregnancyWarning: "CONTRAINDICATED during the first trimester of pregnancy due to documented teratogenic and mutagenic risks.",
      withdrawalPeriod: { milkDays: 4, meatDays: 14 },
      adverseEffectsAndWarnings: [
        "Administer strictly by SLOW intravenous drip infusion over 20-30 minutes; rapid bolus induces acute neurotoxicity, nystagmus, and ataxia.",
        "High cumulative doses in dogs and cats produce severe neurotoxicity (vestibular syndrome, head tilt, generalized stiffness). Reversible with Diazepam.",
        "Do not refrigerate (precipitates crystals at low temperatures)."
      ],
      storage: "Store at 20°C to 25°C. Keep bottle in outer carton to protect from light."
    },
    {
      id: "trimethoprim-sulfadiazine",
      genericName: "Trimethoprim + Sulfadiazine",
      category: "Antibiotic",
      commonBrands: ["Biotrim 48% (400mg + 80mg/ml)", "Tribrissen 48%", "Sulprim 480"],
      standardConcentration: "480 mg/ml (Combined Active 48% Solution)",
      concentrationMgPerMl: 480.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 24.0, route: "IM", defaultFrequency: "OD", durationDays: 4 },
        bubaline: { doseMgPerKg: 24.0, route: "IM", defaultFrequency: "OD", durationDays: 4 },
        caprine: { doseMgPerKg: 24.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        ovine: { doseMgPerKg: 24.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        equine: { doseMgPerKg: 24.0, route: "Oral", defaultFrequency: "BD", durationDays: 5 },
        canine: { doseMgPerKg: 30.0, route: "SC", defaultFrequency: "OD", durationDays: 5 }
      },
      pregnancySafe: false,
      pregnancyWarning: "Use with extreme caution in pregnancy. Interferes with folate metabolism; can lead to neural tube defects and cleft palate in early gestation.",
      withdrawalPeriod: { milkDays: 4, meatDays: 14 },
      adverseEffectsAndWarnings: [
        "In canines, prolonged therapy (>10-14 days) can trigger irreversible Keratoconjunctivitis Sicca (Dry Eye Syndrome).",
        "Risk of crystalluria and hematuria in dehydrated patients; maintain generous hydration.",
        "Intramuscular injections cause transient burning sensations and localized muscular inflammation."
      ],
      storage: "Store below 25°C. Protect from direct sunlight."
    },

    // ------------------------------------------------------------------------
    // NON-STEROIDAL ANTI-INFLAMMATORY DRUGS (NSAIDs) & ANALGESICS
    // ------------------------------------------------------------------------
    {
      id: "meloxicam-5",
      genericName: "Meloxicam",
      category: "NSAID",
      commonBrands: ["Melonex 5mg/ml", "Melovet", "Zobid-M 5mg", "Mobicam Vet"],
      standardConcentration: "5 mg/ml Solution",
      concentrationMgPerMl: 5.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 0.5, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        bubaline: { doseMgPerKg: 0.5, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        caprine: { doseMgPerKg: 0.5, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        ovine: { doseMgPerKg: 0.5, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        equine: { doseMgPerKg: 0.6, route: "IV", defaultFrequency: "OD", durationDays: 3 },
        canine: { doseMgPerKg: 0.2, route: "SC", defaultFrequency: "OD", durationDays: 3 },
        feline: { doseMgPerKg: 0.05, route: "SC", defaultFrequency: "OD", durationDays: 1 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Relatively safe in late pregnancy compared to flunixin or corticosteroids. However, avoid prolonged high-dose use immediately prior to parturition (may delay labor onset).",
      withdrawalPeriod: { milkDays: 3, meatDays: 15 },
      adverseEffectsAndWarnings: [
        "Preferential COX-2 inhibitor with superior gastric safety in ruminants.",
        "IN CATS: Extreme caution required. Do not exceed 0.05 mg/kg once daily for a maximum of 2-3 days; overdose causes acute renal papillary necrosis.",
        "Do NOT co-administer concurrently with systemic corticosteroids or other NSAIDs."
      ],
      storage: "Store below 30°C. Protect from light."
    },
    {
      id: "flunixin-meglumine",
      genericName: "Flunixin Meglumine",
      category: "NSAID",
      commonBrands: ["Megludyne 50mg/ml", "Finadyne 50", "Flunixin-Vet", "Zobid-F"],
      standardConcentration: "50 mg/ml Solution",
      concentrationMgPerMl: 50.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 2.2, route: "IV", defaultFrequency: "OD", durationDays: 3 },
        bubaline: { doseMgPerKg: 2.2, route: "IV", defaultFrequency: "OD", durationDays: 3 },
        caprine: { doseMgPerKg: 1.1, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        ovine: { doseMgPerKg: 1.1, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        equine: { doseMgPerKg: 1.1, route: "IV", defaultFrequency: "OD", durationDays: 3 },
        canine: { doseMgPerKg: 1.0, route: "IV", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe in pregnant cattle and buffaloes for toxic mastitis and respiratory distress. Avoid in late pregnant mares unless treating life-threatening colic.",
      withdrawalPeriod: { milkDays: 2, meatDays: 7 },
      adverseEffectsAndWarnings: [
        "CRITICAL IN EQUINES: NEVER ADMINISTER VIA INTRAMUSCULAR (IM) ROUTE; triggers catastrophic Clostridial myonecrosis / gas gangrene.",
        "Gold standard for anti-endotoxic visceral analgesia in bovine coliform mastitis and equine colic.",
        "Avoid prolonged treatment exceeding 3-5 days in dehydrated patients due to risk of gastric ulceration and renal damage."
      ],
      storage: "Store below 25°C. Do not freeze."
    },
    {
      id: "tolfenamic-acid",
      genericName: "Tolfenamic Acid",
      category: "NSAID",
      commonBrands: ["Maxxtol 80mg/ml (8%)", "Tolfedine 4%", "Tolfen-80"],
      standardConcentration: "80 mg/ml (8% Solution)",
      concentrationMgPerMl: 80.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 2.0, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        bubaline: { doseMgPerKg: 2.0, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        caprine: { doseMgPerKg: 2.0, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        ovine: { doseMgPerKg: 2.0, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        canine: { doseMgPerKg: 4.0, route: "SC", defaultFrequency: "OD", durationDays: 3 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe in pregnant dairy ruminants. Excellent safety index with zero abortifacient activity.",
      withdrawalPeriod: { milkDays: 1, meatDays: 8 },
      adverseEffectsAndWarnings: [
        "Exceptional short milk-withdrawal profile (zero to 24 hours in many clinical settings), making it ideal for high-yielding dairy animals.",
        "Potent antipyretic for acute respiratory disease and acute clinical mastitis.",
        "Inject deep IM in the neck musculature; do not exceed 20 ml per single site in adult cattle."
      ],
      storage: "Store protected from light below 25°C."
    },
    {
      id: "ketoprofen-10",
      genericName: "Ketoprofen",
      category: "NSAID",
      commonBrands: ["Ketovet 100mg/ml", "Neoprofen 10%", "Ketofen 100"],
      standardConcentration: "100 mg/ml (10% Solution)",
      concentrationMgPerMl: 100.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 3.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        bubaline: { doseMgPerKg: 3.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        caprine: { doseMgPerKg: 3.0, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        equine: { doseMgPerKg: 2.2, route: "IV", defaultFrequency: "OD", durationDays: 3 },
        canine: { doseMgPerKg: 2.0, route: "SC", defaultFrequency: "OD", durationDays: 2 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe in pregnant ruminants. Does not provoke uterine contractions or embryonic loss at therapeutic dosages.",
      withdrawalPeriod: { milkDays: 0, meatDays: 4 },
      adverseEffectsAndWarnings: [
        "ZERO MILK WITHDRAWAL in multiple international food-safety jurisdictions.",
        "Dual inhibitor of both Cyclooxygenase (COX) and Lipoxygenase (LOX) pathways, delivering intense musculoskeletal analgesia.",
        "Avoid rapid IV bolus in equines; inject slowly over 1-2 minutes."
      ],
      storage: "Store below 25°C. Protect from direct heat and light."
    },
    {
      id: "paracetamol-large-animal",
      genericName: "Paracetamol (Acetaminophen)",
      category: "NSAID",
      commonBrands: ["Pyrigesic-Vet 150mg/ml", "Paravet Inj", "Calpol-Vet 3g Bolus"],
      standardConcentration: "150 mg/ml Solution (or 3g Bolus)",
      concentrationMgPerMl: 150.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 15.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        bubaline: { doseMgPerKg: 15.0, route: "IM", defaultFrequency: "OD", durationDays: 3 },
        caprine: { doseMgPerKg: 15.0, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        ovine: { doseMgPerKg: 15.0, route: "IM", defaultFrequency: "OD", durationDays: 2 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Completely safe in all stages of pregnancy in large animals. Reliable first-choice antipyretic.",
      withdrawalPeriod: { milkDays: 1, meatDays: 3 },
      adverseEffectsAndWarnings: [
        "FATAL WARNING IN FELINES: ABSOLUTELY CONTRAINDICATED IN CATS. Cats lack hepatic glucuronyl transferase; even micro-doses trigger fatal methemoglobinemia, severe cyanosis, facial edema, and acute hepatic necrosis.",
        "Use with caution in dogs (toxic at standard human dosages).",
        "Provides strong central antipyresis with minimal peripheral anti-inflammatory potency."
      ],
      storage: "Store at controlled room temperature below 30°C."
    },

    // ------------------------------------------------------------------------
    // CORTICOSTEROIDS (CRITICAL SAFETY CLASSIFICATION)
    // ------------------------------------------------------------------------
    {
      id: "dexamethasone-sodium",
      genericName: "Dexamethasone Sodium Phosphate",
      category: "Corticosteroid",
      commonBrands: ["Dexona 4.4mg/ml", "Dexavet", "Decadron-Vet", "Dexa-4"],
      standardConcentration: "4.4 mg/ml Solution (equivalent to 4.0 mg/ml base)",
      concentrationMgPerMl: 4.4,
      speciesDosages: {
        bovine: { doseMgPerKg: 0.1, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 0.1, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        caprine: { doseMgPerKg: 0.1, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        ovine: { doseMgPerKg: 0.1, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        equine: { doseMgPerKg: 0.05, route: "IV", defaultFrequency: "Stat", durationDays: 1 },
        canine: { doseMgPerKg: 0.2, route: "SC", defaultFrequency: "OD", durationDays: 2 }
      },
      pregnancySafe: false,
      pregnancyWarning: "CRITICAL ABORTIFACIENT WARNING: ABSOLUTELY CONTRAINDICATED in the 3rd trimester of pregnancy in cattle, buffaloes, sheep, goats, and mares. Induces immediate premature luteolysis, cervical relaxation, and violent abortion within 24-72 hours.",
      withdrawalPeriod: { milkDays: 3, meatDays: 8 },
      adverseEffectsAndWarnings: [
        "STEROID RED ALERT: Induces massive milk drop in lactating dairy cattle (25-50% temporary production suppression).",
        "HIGH RISK OF LAMINITIS in equines: Do not administer repeated doses in horses prone to founder.",
        "Immunosuppressive: Never administer in systemic viremias, active fungal infections, or unmanaged bacterial sepsis without concurrent antibiotic coverage."
      ],
      storage: "Store below 25°C. Protect from light. Do not freeze."
    },
    {
      id: "isoflupredone-acetate",
      genericName: "Isoflupredone Acetate",
      category: "Corticosteroid",
      commonBrands: ["Predef 2X (2mg/ml)", "Isofludex", "Flucort 2mg"],
      standardConcentration: "2 mg/ml Sterile Suspension",
      concentrationMgPerMl: 2.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 0.03, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 0.03, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        equine: { doseMgPerKg: 0.02, route: "IM", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: true,
      pregnancyWarning: "RELATIVELY PREGNANCY-SAFE IN RUMINANTS: Unlike Dexamethasone, labeled therapeutic doses (10-20 mg total per cow) do NOT precipitate premature parturition or abortion, making it the corticosteroid of choice for bovine ketosis.",
      withdrawalPeriod: { milkDays: 0, meatDays: 7 },
      adverseEffectsAndWarnings: [
        "Gold standard glucocorticoid for primary Bovine Ketosis / Acetonemia (stimulates massive hepatic gluconeogenesis).",
        "POTENT MINERALOCORTICOID ACTIVITY: Repeated high doses cause severe hypokalemia ('Downer Cow Syndrome'). Co-administer potassium chloride if repeated.",
        "Shake well before administration."
      ],
      storage: "Store below 25°C. Do not freeze."
    },
    {
      id: "prednisolone-acetate",
      genericName: "Prednisolone Acetate",
      category: "Corticosteroid",
      commonBrands: ["Prednisolone 10mg/ml Inj", "Omnacortil-Vet", "Wysolone-Vet"],
      standardConcentration: "10 mg/ml Aqueous Suspension",
      concentrationMgPerMl: 10.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 0.3, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        bubaline: { doseMgPerKg: 0.3, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        caprine: { doseMgPerKg: 0.3, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        canine: { doseMgPerKg: 1.0, route: "Oral", defaultFrequency: "OD", durationDays: 5 },
        feline: { doseMgPerKg: 1.5, route: "Oral", defaultFrequency: "OD", durationDays: 5 }
      },
      pregnancySafe: false,
      pregnancyWarning: "CONTRAINDICATED in pregnant stock: Prolonged use causes fetal malformations in early gestation and can trigger abortion in late gestation.",
      withdrawalPeriod: { milkDays: 3, meatDays: 10 },
      adverseEffectsAndWarnings: [
        "Intermediate-acting glucocorticoid with approximately 4 times the anti-inflammatory potency of hydrocortisone.",
        "In dogs and cats, taper dose gradually when discontinuing after >7 days of therapy to prevent iatrogenic secondary hypoadrenocorticism.",
        "Causes marked polyuria, polydipsia, and polyphagia."
      ],
      storage: "Store between 15°C and 25°C. Protect from freezing and light."
    },

    // ------------------------------------------------------------------------
    // ANTHELMINTICS & ECTOPARASITICIDES
    // ------------------------------------------------------------------------
    {
      id: "ivermectin-1-percent",
      genericName: "Ivermectin",
      category: "Anthelmintic",
      commonBrands: ["Neomec 10mg/ml (1%)", "Ivomec 1%", "Hitek 1%", "Iverpet 10mg"],
      standardConcentration: "10 mg/ml (1% Injectable Solution)",
      concentrationMgPerMl: 10.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 0.2, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 0.2, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        caprine: { doseMgPerKg: 0.2, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        ovine: { doseMgPerKg: 0.2, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        canine: { doseMgPerKg: 0.2, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        feline: { doseMgPerKg: 0.2, route: "SC", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe throughout all stages of pregnancy in cattle, buffaloes, sheep, and goats at the standard dose of 1 ml per 50 kg body weight.",
      withdrawalPeriod: { milkDays: 28, meatDays: 28 },
      adverseEffectsAndWarnings: [
        "ADMINISTER STRICTLY SUBCUTANEOUSLY (SC). Intramuscular or intravenous administration can induce acute neuromuscular collapse.",
        "CRITICAL MDR1 CANINE WARNING: STRICTLY CONTRAINDICATED in Herding Breeds (Collies, Australian Shepherds, Shetland Sheepdogs) carrying the ABCB1 / MDR1 gene mutation; triggers fatal neurotoxicity, coma, and respiratory arrest.",
        "DO NOT use in lactating dairy animals producing milk for immediate human consumption due to extended 28-day milk residue persistence."
      ],
      storage: "Store below 30°C protected from direct sunlight."
    },
    {
      id: "albendazole-suspension",
      genericName: "Albendazole",
      category: "Anthelmintic",
      commonBrands: ["Albomar 25mg/ml (2.5%)", "Valbazen", "Albezole 3g Bolus"],
      standardConcentration: "25 mg/ml Suspension (or 3.0 g Bolus)",
      concentrationMgPerMl: 25.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 7.5, route: "Oral", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 7.5, route: "Oral", defaultFrequency: "Stat", durationDays: 1 },
        caprine: { doseMgPerKg: 7.5, route: "Oral", defaultFrequency: "Stat", durationDays: 1 },
        ovine: { doseMgPerKg: 7.5, route: "Oral", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: false,
      pregnancyWarning: "TERATOGENIC RED ALERT: STRICTLY CONTRAINDICATED during the 1st trimester of pregnancy (first 45 days of gestation in cows/buffaloes and first 30 days in ewes/does). Induces embryonic death, craniofacial malformations, and skeletal defects.",
      withdrawalPeriod: { milkDays: 4, meatDays: 14 },
      adverseEffectsAndWarnings: [
        "Broad-spectrum benzimidazole active against gastrointestinal roundworms, lungworms, tapeworms, and adult liver flukes (Fasciola gigantica dose: 10-15 mg/kg).",
        "Shake oral suspension thoroughly before administering.",
        "Do not overdose in sheep during breeding/tupping season."
      ],
      storage: "Store in a cool dry place below 25°C."
    },
    {
      id: "fenbendazole",
      genericName: "Fenbendazole",
      category: "Anthelmintic",
      commonBrands: ["Panacur 150mg/ml / 3g Bolus", "Fentas 1.5g/3g", "Fenzol-Vet"],
      standardConcentration: "150 mg/ml Suspension (or 3.0 g Bolus)",
      concentrationMgPerMl: 150.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 7.5, route: "Oral", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 7.5, route: "Oral", defaultFrequency: "Stat", durationDays: 1 },
        caprine: { doseMgPerKg: 7.5, route: "Oral", defaultFrequency: "Stat", durationDays: 1 },
        ovine: { doseMgPerKg: 7.5, route: "Oral", defaultFrequency: "Stat", durationDays: 1 },
        equine: { doseMgPerKg: 7.5, route: "Oral", defaultFrequency: "Stat", durationDays: 1 },
        canine: { doseMgPerKg: 50.0, route: "Oral", defaultFrequency: "OD", durationDays: 3 },
        feline: { doseMgPerKg: 50.0, route: "Oral", defaultFrequency: "OD", durationDays: 3 }
      },
      pregnancySafe: true,
      pregnancyWarning: "GOLD STANDARD PREGNANCY-SAFE DEWORMER: Completely safe throughout ALL stages of gestation (1st, 2nd, and 3rd trimesters). Zero teratogenic, embryotoxic, or abortifacient properties.",
      withdrawalPeriod: { milkDays: 0, meatDays: 8 },
      adverseEffectsAndWarnings: [
        "Drug of choice for deworming pregnant cattle, buffaloes, sheep, and goats.",
        "Zero milk-withholding period in many veterinary formulations.",
        "In dogs and cats, administer for 3 consecutive days to clear Giardia and Ascarid infestations."
      ],
      storage: "Store at room temperature below 30°C."
    },
    {
      id: "closantel-15",
      genericName: "Closantel",
      category: "Anthelmintic",
      commonBrands: ["Zycloz 15% (150mg/ml)", "Closavet 150", "Flukex-15"],
      standardConcentration: "150 mg/ml (15% Injectable / Oral Solution)",
      concentrationMgPerMl: 150.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 5.0, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 5.0, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        caprine: { doseMgPerKg: 10.0, route: "Oral", defaultFrequency: "Stat", durationDays: 1 },
        ovine: { doseMgPerKg: 10.0, route: "Oral", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe in pregnant ruminants at labeled therapeutic doses. Excellent for controlling acute liver rot (Fascioliasis) and Barber's pole worm (Haemonchus contortus).",
      withdrawalPeriod: { milkDays: 28, meatDays: 28 },
      adverseEffectsAndWarnings: [
        "Exceptional persistent efficacy: Binds tightly to plasma albumin, providing sustained protective blood levels for over 30 days.",
        "OVERDOSE WARNING: Overdosing can cause irreversible blindness, optic nerve degeneration, and pupil dilation.",
        "Do NOT administer to lactating dairy animals producing milk for commercial human consumption."
      ],
      storage: "Store below 25°C protected from light."
    },
    {
      id: "levamisole-hydrochloride",
      genericName: "Levamisole Hydrochloride",
      category: "Anthelmintic",
      commonBrands: ["Levasol 75mg/ml (7.5%)", "Vermisol-Vet", "Helmonil 30%"],
      standardConcentration: "75 mg/ml (7.5% Solution)",
      concentrationMgPerMl: 75.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 7.5, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 7.5, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        caprine: { doseMgPerKg: 7.5, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        ovine: { doseMgPerKg: 7.5, route: "SC", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe in pregnant ruminants. Avoid handling stressed animals in late third trimester.",
      withdrawalPeriod: { milkDays: 3, meatDays: 7 },
      adverseEffectsAndWarnings: [
        "Narrow safety margin: Overdose triggers cholinergic signs (salivation, muscle tremors, hyperventilation, and frequent urination).",
        "Atropine is the physiological antidote for accidental toxicity.",
        "Possesses unique non-specific cell-mediated immunostimulatory properties."
      ],
      storage: "Store in a cool place below 25°C. Do not freeze."
    },
    {
      id: "triclabendazole",
      genericName: "Triclabendazole",
      category: "Anthelmintic",
      commonBrands: ["Fasinex 10% (100mg/ml)", "Flukicide-100", "Tricla-Vet"],
      standardConcentration: "100 mg/ml (10% Oral Suspension)",
      concentrationMgPerMl: 100.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 12.0, route: "Oral", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 12.0, route: "Oral", defaultFrequency: "Stat", durationDays: 1 },
        caprine: { doseMgPerKg: 10.0, route: "Oral", defaultFrequency: "Stat", durationDays: 1 },
        ovine: { doseMgPerKg: 10.0, route: "Oral", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe throughout all stages of pregnancy in cattle, buffaloes, sheep, and goats.",
      withdrawalPeriod: { milkDays: 14, meatDays: 28 },
      adverseEffectsAndWarnings: [
        "GOLD STANDARD FASCIOLICIDE: Highly active against ALL developmental stages of Fasciola hepatica and Fasciola gigantica (early immatures from 1-6 weeks old, immatures, and mature adult flukes).",
        "Administer only via oral drench; shake suspension thoroughly prior to administration.",
        "Maintain appropriate quarantine when introducing treated animals to snail-inhabited pastures."
      ],
      storage: "Store below 30°C. Protect from freezing."
    },

    // ------------------------------------------------------------------------
    // ANTIPROTOZOALS & HEMOPARASITICIDES
    // ------------------------------------------------------------------------
    {
      id: "diminazene-aceturate",
      genericName: "Diminazene Aceturate",
      category: "Antiprotozoal",
      commonBrands: ["Berenil 70mg/ml (7%)", "Diminavet 7%", "Babinil RTU"],
      standardConcentration: "70 mg/ml (7% Ready-to-Use Solution)",
      concentrationMgPerMl: 70.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 3.5, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 3.5, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        caprine: { doseMgPerKg: 3.5, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        ovine: { doseMgPerKg: 3.5, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        canine: { doseMgPerKg: 3.5, route: "IM", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: false,
      pregnancyWarning: "Use with caution in pregnant ruminants. Reserve for confirmed acute clinical Babesiosis or Trypanosomiasis where the maternal life is endangered.",
      withdrawalPeriod: { milkDays: 3, meatDays: 21 },
      adverseEffectsAndWarnings: [
        "DRUG OF CHOICE FOR BABESIOSIS (Babesia bigemina / B. canis).",
        "FATAL WARNING IN DOGS & CAMELS: Strict weight-based dosing is mandatory. Overdosing precipitates catastrophic central nervous system hemorrhagic necrosis (cerebellar and midbrain hemorrhages, seizures, and death).",
        "Administer strictly via deep intramuscular route in large muscle masses."
      ],
      storage: "Store protected from light below 25°C."
    },
    {
      id: "buparvaquone",
      genericName: "Buparvaquone",
      category: "Antiprotozoal",
      commonBrands: ["Zubion 50mg/ml (5%)", "Butalex 5%", "Theilerizol"],
      standardConcentration: "50 mg/ml (5% Solution)",
      concentrationMgPerMl: 50.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 2.5, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 2.5, route: "IM", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe in pregnant cattle and buffaloes. Untreated Theileriosis causes 100% abortion; immediate Buparvaquone administration is essential.",
      withdrawalPeriod: { milkDays: 2, meatDays: 42 },
      adverseEffectsAndWarnings: [
        "GOLD STANDARD CURATIVE AGENT FOR THEILERIOSIS (Theileria annulata). Dose is 1 ml per 20 kg body weight.",
        "Administer strictly via deep intramuscular injection in the neck musculature. Never give intravenously.",
        "In advanced cases, a second dose may be administered 48-72 hours later at the opposite side of the neck."
      ],
      storage: "Store below 25°C. Protect from light."
    },
    {
      id: "quinapyramine-prosalt",
      genericName: "Quinapyramine Sulfate + Quinapyramine Chloride",
      category: "Antiprotozoal",
      commonBrands: ["Triquin (1.5g + 1.0g vial)", "Antrycide Pro-Salt", "Surracure"],
      standardConcentration: "Reconstituted 10% Suspension (100 mg/ml combined)",
      concentrationMgPerMl: 100.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 4.0, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 4.0, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        equine: { doseMgPerKg: 3.5, route: "SC", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe in pregnant stock. Surra (Trypanosoma evansi) induces rapid fetal abortion; immediate treatment is life-saving.",
      withdrawalPeriod: { milkDays: 7, meatDays: 28 },
      adverseEffectsAndWarnings: [
        "ADMINISTER STRICTLY SUBCUTANEOUSLY (SC). Intravenous administration induces immediate fatal curare-like neuromuscular paralysis and cardiac arrest.",
        "Divide dose and inject at two separate subcutaneous sites in large animals.",
        "Provides both immediate therapeutic clearance (sulfate) and up to 3 months of sustained prophylactic protection (chloride)."
      ],
      storage: "Store dry powder below 25°C. Use reconstituted suspension immediately."
    },

    // ------------------------------------------------------------------------
    // ANTISPASMODICS, EMERGENCY ANTIDOTES & METABOLIC THERAPY
    // ------------------------------------------------------------------------
    {
      id: "atropine-sulfate",
      genericName: "Atropine Sulfate",
      category: "Emergency/Metabolic",
      commonBrands: ["Atropine-Vet 1mg/ml", "Tropine 0.6mg/ml", "Atro-Med"],
      standardConcentration: "1 mg/ml Solution",
      concentrationMgPerMl: 1.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 0.2, route: "IV", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 0.2, route: "IV", defaultFrequency: "Stat", durationDays: 1 },
        caprine: { doseMgPerKg: 0.2, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        ovine: { doseMgPerKg: 0.2, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        equine: { doseMgPerKg: 0.04, route: "IV", defaultFrequency: "Stat", durationDays: 1 },
        canine: { doseMgPerKg: 0.2, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        feline: { doseMgPerKg: 0.04, route: "SC", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe for emergency use in pregnancy. In life-threatening organophosphate poisoning, atropinization takes absolute clinical priority.",
      withdrawalPeriod: { milkDays: 1, meatDays: 3 },
      adverseEffectsAndWarnings: [
        "ANTIDOTE FOR ORGANOPHOSPHATE & CARBAMATE POISONING: Titrate dose until full atropinization is achieved (dry mouth, dilated pupils, heart rate elevation).",
        "In OP poisoning, administer 1/3rd of the calculated dose slowly IV, and remaining 2/3rd SC/IM.",
        "CONTRAINDICATED in equine colic (triggers severe paralytic ileus)."
      ],
      storage: "Store below 25°C. Protect from light."
    },
    {
      id: "hyoscine-dipyrone",
      genericName: "Hyoscine N-Butylbromide + Dipyrone (Metamizole)",
      category: "Emergency/Metabolic",
      commonBrands: ["Spasmo-vet (4mg + 500mg/ml)", "Buscopan Compositum", "Spasmocid"],
      standardConcentration: "Combined (4 mg Hyoscine + 500 mg Dipyrone per ml)",
      concentrationMgPerMl: 504.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 0.2, route: "IV", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 0.2, route: "IV", defaultFrequency: "Stat", durationDays: 1 },
        caprine: { doseMgPerKg: 0.2, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        ovine: { doseMgPerKg: 0.2, route: "IM", defaultFrequency: "Stat", durationDays: 1 },
        equine: { doseMgPerKg: 0.2, route: "IV", defaultFrequency: "Stat", durationDays: 1 },
        canine: { doseMgPerKg: 0.2, route: "SC", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe in pregnant stock for acute visceral spasmodic relief (spasmodic colic, bloat, acute diarrhea cramps).",
      withdrawalPeriod: { milkDays: 2, meatDays: 9 },
      adverseEffectsAndWarnings: [
        "Rapidly relieves intense smooth muscle spasms of the gastrointestinal and urogenital tracts.",
        "Administer slowly over 2-3 minutes when using the intravenous route.",
        "May cause transient tachycardia and mild dryness of the oral mucosa."
      ],
      storage: "Store below 25°C. Protect from freezing and light."
    },
    {
      id: "pheniramine-maleate",
      genericName: "Pheniramine Maleate",
      category: "Antihistamine",
      commonBrands: ["Avil-Vet 22.75mg/ml", "Pheniramine Inj", "Cadavil"],
      standardConcentration: "22.75 mg/ml Solution",
      concentrationMgPerMl: 22.75,
      speciesDosages: {
        bovine: { doseMgPerKg: 0.5, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        bubaline: { doseMgPerKg: 0.5, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        caprine: { doseMgPerKg: 0.5, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        ovine: { doseMgPerKg: 0.5, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        equine: { doseMgPerKg: 0.5, route: "IM", defaultFrequency: "OD", durationDays: 2 },
        canine: { doseMgPerKg: 1.0, route: "IM", defaultFrequency: "OD", durationDays: 2 }
      },
      pregnancySafe: true,
      pregnancyWarning: "Safe throughout all stages of pregnancy. Essential first-line antihistamine for acute allergic reactions, bee stings, and bloat.",
      withdrawalPeriod: { milkDays: 1, meatDays: 2 },
      adverseEffectsAndWarnings: [
        "Rapid IV administration can precipitate extreme central nervous excitement, tremors, and violent ataxia; inject strictly via deep IM route.",
        "May produce mild sedation and dry mucous membranes.",
        "Excellent supportive adjunct in ruminal bloat, laminitis, and allergic dermatitis."
      ],
      storage: "Store below 25°C protected from light."
    },
    {
      id: "calcium-borogluconate",
      genericName: "Calcium Borogluconate (CBG)",
      category: "Emergency/Metabolic",
      commonBrands: ["Mifex (450ml)", "Calborol 450ml", "CBG-Vet", "Calci-Master"],
      standardConcentration: "25% w/v Calcium Borogluconate + Magnesium + Phosphorus",
      concentrationMgPerMl: 250.0,
      speciesDosages: {
        bovine: { doseMgPerKg: 250.0, route: "IV", defaultFrequency: "Stat", durationDays: 1 },
        bubaline: { doseMgPerKg: 250.0, route: "IV", defaultFrequency: "Stat", durationDays: 1 },
        caprine: { doseMgPerKg: 250.0, route: "SC", defaultFrequency: "Stat", durationDays: 1 },
        ovine: { doseMgPerKg: 250.0, route: "SC", defaultFrequency: "Stat", durationDays: 1 }
      },
      pregnancySafe: true,
      pregnancyWarning: "INDICATED IN PARTURITION: The gold standard life-saving therapy for periparturient Hypocalcemia (Milk Fever / Parturient Paresis) occurring at or around calving.",
      withdrawalPeriod: { milkDays: 0, meatDays: 0 },
      adverseEffectsAndWarnings: [
        "CRITICAL CARDIAC WARNING: ADMINISTER SLOWLY BY INTRAVENOUS ROUTE OVER AT LEAST 15 TO 20 MINUTES WITH CONTINUOUS CARDIAC AUSCULTATION. Rapid infusion induces fatal cardiac arrest (bradycardia progressing to ventricular fibrillation).",
        "Warm bottle to animal body temperature (38°C) before infusion.",
        "Standard adult cattle/buffalo protocol: Infuse 250-300 ml slowly IV and remaining 150 ml divided subcutaneously (SC)."
      ],
      storage: "Store below 25°C. Do not use if particulate crystallization or turbidity is present."
    }
  ];

  // 3. SEARCH, FILTERING & DOSAGE CALCULATION ENGINE
  const ClinicalData = window.VetcareApp.ClinicalData;

  ClinicalData.getDrugById = function (id) {
    if (!id || typeof id !== "string") return null;
    const cleanId = id.trim().toLowerCase();
    const list = ClinicalData.Drugs || [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].id.toLowerCase() === cleanId) {
        return list[i];
      }
    }
    return null;
  };

  ClinicalData.searchDrugs = function (query) {
    if (!query || typeof query !== "string") return [];
    const q = query.trim().toLowerCase();
    const list = ClinicalData.Drugs || [];
    const results = [];

    for (let i = 0; i < list.length; i++) {
      const drug = list[i];
      let matched = false;

      // Generic name check
      if (drug.genericName && drug.genericName.toLowerCase().indexOf(q) !== -1) {
        matched = true;
      }
      // Category check
      if (!matched && drug.category && drug.category.toLowerCase().indexOf(q) !== -1) {
        matched = true;
      }
      // Brands check
      if (!matched && Array.isArray(drug.commonBrands)) {
        for (let j = 0; j < drug.commonBrands.length; j++) {
          if (drug.commonBrands[j].toLowerCase().indexOf(q) !== -1) {
            matched = true;
            break;
          }
        }
      }

      if (matched) {
        results.push(drug);
      }
    }
    return results;
  };

  ClinicalData.getDrugsByCategory = function (category) {
    if (!category || typeof category !== "string") return [];
    const targetCat = category.trim().toLowerCase();
    const list = ClinicalData.Drugs || [];
    const results = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].category && list[i].category.toLowerCase() === targetCat) {
        results.push(list[i]);
      }
    }
    return results;
  };

  ClinicalData.getPregnancySafeDrugs = function (species) {
    const list = ClinicalData.Drugs || [];
    const results = [];
    const cleanSpecies = species ? species.trim().toLowerCase() : null;

    for (let i = 0; i < list.length; i++) {
      const drug = list[i];
      if (drug.pregnancySafe === true) {
        if (!cleanSpecies) {
          results.push(drug);
        } else if (drug.speciesDosages && drug.speciesDosages[cleanSpecies]) {
          results.push(drug);
        }
      }
    }
    return results;
  };

  ClinicalData.calculateDoseVolume = function (drugId, weightKg, species, customDoseMg) {
    const drug = ClinicalData.getDrugById(drugId);
    if (!drug) {
      return {
        error: "Drug not found with identifier: " + drugId
      };
    }

    const wt = parseFloat(weightKg);
    if (isNaN(wt) || wt <= 0) {
      return {
        error: "Invalid body weight provided: " + weightKg
      };
    }

    const sp = species ? species.trim().toLowerCase() : "bovine";
    const speciesInfo = (drug.speciesDosages && drug.speciesDosages[sp]) ? drug.speciesDosages[sp] : null;

    let targetDoseMg = 0;
    if (customDoseMg !== null && customDoseMg !== undefined && !isNaN(parseFloat(customDoseMg))) {
      targetDoseMg = parseFloat(customDoseMg);
    } else if (speciesInfo && speciesInfo.doseMgPerKg) {
      targetDoseMg = speciesInfo.doseMgPerKg * wt;
    } else {
      return {
        error: "No dosage regimen specified for species: " + sp + ". Provide customDoseMg parameter."
      };
    }

    let calculatedVolumeMl = null;
    if (drug.concentrationMgPerMl && drug.concentrationMgPerMl > 0) {
      calculatedVolumeMl = targetDoseMg / drug.concentrationMgPerMl;
    }

    return {
      drugId: drug.id,
      genericName: drug.genericName,
      species: sp,
      weightKg: wt,
      doseMg: Number(targetDoseMg.toFixed(2)),
      doseMl: calculatedVolumeMl !== null ? Number(calculatedVolumeMl.toFixed(2)) : "N/A (Dry powder / oral solid / solution)",
      route: speciesInfo ? speciesInfo.route : "Clinical Discretion",
      frequency: speciesInfo ? speciesInfo.defaultFrequency : "OD",
      durationDays: speciesInfo ? speciesInfo.durationDays : "1-3",
      pregnancySafe: drug.pregnancySafe,
      warning: drug.pregnancySafe ? "SAFE: Clinically approved for pregnant stock." : drug.pregnancyWarning
    };
  };

})();
