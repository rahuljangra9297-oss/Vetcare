// Vetcare AI OS - Multi-Species Deworming Protocols, Anthelmintic Rotation & FAMACHA Anaemia Scoring (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. MASTER ANTHELMINTIC CHEMICAL CLASSES & DRUG REGISTRY
  const ANTHELMINTIC_CLASSES = [
    {
      classId: "class-1-benzimidazoles",
      className: "Class 1: Benzimidazoles (White Drenches / BZ)",
      classNameHi: "वर्ग 1: बेंजिमिडाज़ोल (व्हाइट ड्रेंच / पेट के कीड़ों की दवा)",
      mechanismOfAction: "Selectively binds to nematode beta-tubulin, inhibiting microtubule polymerization and cellular transport, starving parasites of glucose.",
      spectrum: "Broad spectrum: Gastrointestinal nematodes, lungworms, tapeworms (Moniezia), and adult liver flukes (at elevated dosage).",
      resistanceRisk: "High worldwide resistance in Haemonchus contortus and equine cyathostomins. Must rotate annually.",
      drugs: [
        {
          drugId: "albendazole",
          genericName: "Albendazole",
          commonBrands: ["Albomar 2.5%", "Valbazen", "Albezole 3g Bolus"],
          standardStrength: "25 mg/ml (2.5% suspension) or 3.0 g Bolus",
          doseMgPerKg: {
            bovine: 7.5, // 10-15 mg/kg for Fasciola flukes
            bubaline: 7.5,
            caprine: 7.5, // 10 mg/kg for flukes
            ovine: 7.5,
            avian: 10.0
          },
          flukeDoseMgPerKg: 15.0,
          route: "Oral",
          withdrawalDays: { milk: 4, meat: 14 },
          pregnancySafety: {
            isSafe: false,
            firstTrimesterSafe: false,
            secondTrimesterSafe: true,
            thirdTrimesterSafe: true,
            warning: "STRICTLY CONTRAINDICATED in the 1st trimester of pregnancy (first 45 days in cattle/buffalo, first 30 days in sheep/goats). Induces embryonic death, craniofacial malformations, and skeletal cleft palate."
          }
        },
        {
          drugId: "fenbendazole",
          genericName: "Fenbendazole",
          commonBrands: ["Panacur 150mg/ml", "Panacur 3g Bolus", "Fentas", "Fenzol-Vet"],
          standardStrength: "150 mg/ml (15% Suspension) or 3.0 g Bolus",
          doseMgPerKg: {
            bovine: 7.5,
            bubaline: 7.5,
            caprine: 7.5,
            ovine: 7.5,
            equine: 7.5,
            canine: 50.0, // once daily for 3 days
            feline: 50.0
          },
          route: "Oral",
          withdrawalDays: { milk: 0, meat: 8 },
          pregnancySafety: {
            isSafe: true,
            firstTrimesterSafe: true,
            secondTrimesterSafe: true,
            thirdTrimesterSafe: true,
            warning: "GOLD STANDARD PREGNANCY-SAFE ANTHELMINTIC. Completely safe across 1st, 2nd, and 3rd trimesters in all species. Zero embryotoxic or teratogenic risk."
          }
        },
        {
          drugId: "triclabendazole",
          genericName: "Triclabendazole",
          commonBrands: ["Fasinex 10% (100mg/ml)", "Flukicide-100", "Tricla-Vet"],
          standardStrength: "100 mg/ml (10% Suspension)",
          doseMgPerKg: {
            bovine: 12.0,
            bubaline: 12.0,
            caprine: 10.0,
            ovine: 10.0
          },
          route: "Oral",
          withdrawalDays: { milk: 14, meat: 28 },
          pregnancySafety: {
            isSafe: true,
            firstTrimesterSafe: true,
            secondTrimesterSafe: true,
            thirdTrimesterSafe: true,
            warning: "Safe throughout pregnancy in ruminants. Uniquely active against all stages of Fasciola hepatica/gigantica (early immatures from 1-6 weeks, immatures, and adults)."
          }
        }
      ]
    },
    {
      classId: "class-2-imidazothiazoles",
      className: "Class 2: Imidazothiazoles & Tetrahydropyrimidines (Yellow Drenches / Clear)",
      classNameHi: "वर्ग 2: इमिडाज़ोथियाज़ोल व पाइरेंटेल (येलो ड्रेंच)",
      mechanismOfAction: "Nicotinic acetylcholine receptor (nAChR) agonist causing sustained muscular spastic paralysis and rapid expulsion of roundworms.",
      spectrum: "Gastrointestinal roundworms and lungworms. Ineffective against tapeworms and liver flukes.",
      resistanceRisk: "Moderate. Useful alternative for rotating against benzimidazole-resistant nematodes.",
      drugs: [
        {
          drugId: "levamisole",
          genericName: "Levamisole Hydrochloride",
          commonBrands: ["Levasol 75mg/ml (7.5%)", "Vermisol-Vet", "Helmonil"],
          standardStrength: "75 mg/ml (7.5% Injectable / Oral Solution)",
          doseMgPerKg: {
            bovine: 7.5,
            bubaline: 7.5,
            caprine: 7.5,
            ovine: 7.5,
            avian: 20.0
          },
          route: "SC",
          withdrawalDays: { milk: 3, meat: 7 },
          pregnancySafety: {
            isSafe: true,
            firstTrimesterSafe: true,
            secondTrimesterSafe: true,
            thirdTrimesterSafe: false,
            warning: "Avoid in the final month (late third trimester) of pregnancy due to muscarinic/nicotinic uterine smooth muscle stimulation risk. Do not overdose."
          }
        },
        {
          drugId: "pyrantel-pamoate",
          genericName: "Pyrantel Pamoate",
          commonBrands: ["Nemex", "Pyrantel Oral Paste", "Drontal Component"],
          standardStrength: "50 mg/ml (or 14.4 mg/ml base)",
          doseMgPerKg: {
            equine: 13.2, // 6.6 mg/kg base for nematodes, double for tapeworms
            canine: 14.4, // 5 mg/kg base
            feline: 14.4
          },
          route: "Oral",
          withdrawalDays: { milk: 0, meat: 7 },
          pregnancySafety: {
            isSafe: true,
            firstTrimesterSafe: true,
            secondTrimesterSafe: true,
            thirdTrimesterSafe: true,
            warning: "Extremely safe in pregnant and nursing bitches, queens, and mares. Poor systemic absorption limits toxicity to gut lumen."
          }
        }
      ]
    },
    {
      classId: "class-3-macrocyclic-lactones",
      className: "Class 3: Macrocyclic Lactones (Clear Drenches / Endectocides / ML)",
      classNameHi: "वर्ग 3: मैक्रोसाइक्लिक लैक्टोन (आइवरमेक्टिन / एंडेक्टोसाइड)",
      mechanismOfAction: "Opens glutamate-gated chloride channels, causing hyperpolarization of nerve and muscle cells, leading to flaccid paralysis and death.",
      spectrum: "Endectocide: Complete coverage against gastrointestinal roundworms, lungworms, sucking lice, mange mites, and cattle grubs (Warble fly). Ineffective against flukes and tapeworms.",
      resistanceRisk: "Growing resistance in Cooperia and Haemonchus. Preserve refugia strictly.",
      drugs: [
        {
          drugId: "ivermectin",
          genericName: "Ivermectin",
          commonBrands: ["Neomec 10mg/ml (1%)", "Ivomec", "Hitek 1%"],
          standardStrength: "10 mg/ml (1% Injectable Solution)",
          doseMgPerKg: {
            bovine: 0.2, // 1 ml per 50 kg body weight
            bubaline: 0.2,
            caprine: 0.2,
            ovine: 0.2,
            canine: 0.2,
            feline: 0.2
          },
          route: "SC",
          withdrawalDays: { milk: 28, meat: 28 },
          pregnancySafety: {
            isSafe: true,
            firstTrimesterSafe: false,
            secondTrimesterSafe: true,
            thirdTrimesterSafe: true,
            warning: "Safe in 2nd and 3rd trimesters in ruminants. Avoid around breeding and very early gestation. CRITICAL MDR1 CONTRAINDICATION: Strictly contraindicated in Collie, Shepherd, and Whippet dog breeds carrying ABCB1/MDR1 mutation."
          }
        },
        {
          drugId: "moxidectin",
          genericName: "Moxidectin",
          commonBrands: ["Cydectin 1%", "Equest Gel", "Advocate Component"],
          standardStrength: "10 mg/ml (1% Solution) or 2% Oral Gel",
          doseMgPerKg: {
            bovine: 0.2,
            caprine: 0.2,
            ovine: 0.2,
            equine: 0.4
          },
          route: "SC",
          withdrawalDays: { milk: 28, meat: 28 },
          pregnancySafety: {
            isSafe: true,
            firstTrimesterSafe: true,
            secondTrimesterSafe: true,
            thirdTrimesterSafe: true,
            warning: "Safe in pregnant ruminants and mares. Provides extended persistent activity (up to 4-6 weeks) against re-infection due to high lipophilicity."
          }
        }
      ]
    },
    {
      classId: "class-4-salicylanilides",
      className: "Class 4: Salicylanilides & Substituted Phenols (Flukicides)",
      classNameHi: "वर्ग 4: सैलिसिलानिलाइड व फ्लूकीसाइड (लिवर फ्लूक व चिचड़ी नाशक)",
      mechanismOfAction: "Uncouples oxidative phosphorylation in the mitochondria of parasites, depleting adenosine triphosphate (ATP) reserves.",
      spectrum: "Highly specialized against blood-feeding nematodes (Haemonchus contortus), adult and late-immature liver flukes (Fasciola), nasal bots (Oestrus ovis), and amphistomes.",
      resistanceRisk: "Low to moderate cross-resistance with Benzimidazoles. Highly effective tool for selective rotational therapy in fluke-endemic waterlogged belts.",
      drugs: [
        {
          drugId: "closantel",
          genericName: "Closantel",
          commonBrands: ["Zycloz 15% (150mg/ml)", "Closavet 150", "Flukex-15"],
          standardStrength: "150 mg/ml (15% Injectable / Oral Solution)",
          doseMgPerKg: {
            bovine: 5.0,
            bubaline: 5.0,
            caprine: 10.0,
            ovine: 10.0
          },
          route: "SC",
          withdrawalDays: { milk: 28, meat: 28 },
          pregnancySafety: {
            isSafe: true,
            firstTrimesterSafe: true,
            secondTrimesterSafe: true,
            thirdTrimesterSafe: true,
            warning: "Safe in pregnant stock. Exceptional persistent binding to plasma albumin delivers 4-8 weeks of residual prophylaxis against Haemonchus contortus."
          }
        },
        {
          drugId: "oxyclozanide",
          genericName: "Oxyclozanide",
          commonBrands: ["Zanil 3.4%", "Levanid Bolus", "Oxinil"],
          standardStrength: "34 mg/ml (3.4% Suspension) or combined bolus",
          doseMgPerKg: {
            bovine: 10.0,
            bubaline: 10.0,
            caprine: 15.0,
            ovine: 15.0
          },
          route: "Oral",
          withdrawalDays: { milk: 3, meat: 14 },
          pregnancySafety: {
            isSafe: true,
            firstTrimesterSafe: true,
            secondTrimesterSafe: true,
            thirdTrimesterSafe: true,
            warning: "Completely safe in pregnant and lactating dairy animals. Highly indicated for Paramphistomosis (Rumen flukes) and mature Fasciola."
          }
        }
      ]
    },
    {
      classId: "class-5-isoquinolines",
      className: "Class 5: Isoquinolines / Pyrazinoisoquinolines (Cestocides)",
      classNameHi: "वर्ग 5: आइसोक्विनोलिन (फीताकृमि / टेपवर्म नाशक)",
      mechanismOfAction: "Induces rapid influx of extracellular calcium ions across parasite tegument, causing severe tetanic contractions, tegumental vacuolization, and enzymatic digestion.",
      spectrum: "Solely active against Cestodes (Tapeworms: Echinococcus granulosus, Dipylidium caninum, Taenia species, Anoplocephala) and Trematodes (Schistosoma).",
      resistanceRisk: "Negligible resistance reported.",
      drugs: [
        {
          drugId: "praziquantel",
          genericName: "Praziquantel",
          commonBrands: ["Droncit 50mg", "Drontal Plus Component", "Prazipet"],
          standardStrength: "50 mg Tablets",
          doseMgPerKg: {
            canine: 5.0,
            feline: 5.0,
            equine: 1.5,
            caprine: 10.0,
            ovine: 10.0
          },
          route: "Oral",
          withdrawalDays: { milk: 1, meat: 3 },
          pregnancySafety: {
            isSafe: true,
            firstTrimesterSafe: true,
            secondTrimesterSafe: true,
            thirdTrimesterSafe: true,
            warning: "Safe in pregnant bitches, queens, mares, and ruminants. Critical zoonotic preventative against human Hydatid cyst disease caused by Echinococcus."
          }
        }
      ]
    }
  ];

  // 3. MULTI-SPECIES LIFE-STAGE PROTOCOLS
  const SPECIES_PROTOCOLS = [
    {
      species: "bovine",
      speciesNameHi: "गोवंश व महिषवंश (गाय व भैंस)",
      lifeStages: [
        {
          stageName: "Newborn Calf (10 to 14 Days)",
          targetParasite: "Toxocara (Neoascaris) vitulorum (Calf roundworm transmitted via colostrum/milk)",
          recommendedDrugId: "fenbendazole",
          alternativeDrugId: "piperazine",
          notes: "Crucial early deworming. Toxocara vitulorum leads to severe bloat, intestinal obstruction, clay-colored diarrhea, and high calf mortality."
        },
        {
          stageName: "Weaning Calves (30, 60 & 90 Days)",
          targetParasite: "Strongyloides, Ascarids, and early gastrointestinal strongyles",
          recommendedDrugId: "fenbendazole",
          alternativeDrugId: "albendazole",
          notes: "Monthly deworming until 6 months of age to ensure optimal growth and rumen papillae development."
        },
        {
          stageName: "Adult Dairy Cattle (Pre-Monsoon: May/June)",
          targetParasite: "Haemonchus contortus, Trichostrongylus, Oesophagostomum, Bunostomum",
          recommendedDrugId: "albendazole",
          alternativeDrugId: "ivermectin",
          notes: "Mass flock drenching before monsoon rains break hypobiotic larvae in abomasal mucosa and lowers pasture egg contamination."
        },
        {
          stageName: "Adult Dairy Cattle (Post-Monsoon: October/November)",
          targetParasite: "Fasciola gigantica (Liver fluke) & Paramphistomum (Rumen amphistomes)",
          recommendedDrugId: "oxyclozanide",
          alternativeDrugId: "triclabendazole",
          notes: "Mandatory in canal-irrigated, waterlogged, and riverine belts where snail intermediate hosts (Lymnaea) multiply."
        }
      ]
    },
    {
      species: "caprine",
      speciesNameHi: "बकरी व भेड़ (स्मॉल रूमिनेंट्स)",
      lifeStages: [
        {
          stageName: "Kids and Lambs (6 to 8 Weeks of Age)",
          targetParasite: "Nematodirus, Haemonchus, Moniezia tapeworms",
          recommendedDrugId: "fenbendazole",
          alternativeDrugId: "pyrantel-pamoate",
          notes: "First oral drench. Ensure accurate weight measurement; do not underdose."
        },
        {
          stageName: "Grazing Adults (Targeted Selective Treatment / TST)",
          targetParasite: "Haemonchus contortus (Barber's pole worm)",
          recommendedDrugId: "closantel",
          alternativeDrugId: "levamisole",
          notes: "Drench strictly according to FAMACHA Eye Conjunctiva Score. Treat only scores 3 (if condition is poor), 4, and 5. Leave healthy scores 1 and 2 untreated to preserve refugia."
        },
        {
          stageName: "Post-Monsoon Fluke Season (October)",
          targetParasite: "Fasciola and immature Amphistomes",
          recommendedDrugId: "oxyclozanide",
          alternativeDrugId: "triclabendazole",
          notes: "Essential for avoiding bottle jaw, acute ascites, and severe hypoproteinemia."
        }
      ]
    },
    {
      species: "equine",
      speciesNameHi: "अश्व (घोड़ा, खच्चर व गधा)",
      lifeStages: [
        {
          stageName: "Foals (2, 4, 6, 9 & 12 Months)",
          targetParasite: "Parascaris equorum (Large roundworm) & Strongyloides westeri",
          recommendedDrugId: "fenbendazole",
          alternativeDrugId: "pyrantel-pamoate",
          notes: "At 2 and 4 months: Benzimidazoles are primary choice (Parascaris shows high resistance to ivermectin). At 6 months: Include Ivermectin for Strongyles."
        },
        {
          stageName: "Adult Equine (Spring Drench - March/April)",
          targetParasite: "Cyathostomins (Small strongyles) & Large strongyles",
          recommendedDrugId: "moxidectin",
          alternativeDrugId: "ivermectin",
          notes: "Perform Fecal Egg Count (FEC) prior to drenching. Drench only high shedders (>200 eggs per gram)."
        },
        {
          stageName: "Adult Equine (Autumn Drench - October/November)",
          targetParasite: "Encysted Cyathostomins, Anoplocephala perfoliata (Tapeworms) & Gasterophilus bots",
          recommendedDrugId: "ivermectin",
          alternativeDrugId: "praziquantel",
          notes: "Administer Ivermectin + Praziquantel combination paste to eliminate tapeworms at the ileocecal junction (prevents ileocecal impaction colic)."
        }
      ]
    },
    {
      species: "canine",
      speciesNameHi: "श्वान (कुत्ता)",
      lifeStages: [
        {
          stageName: "Puppies (2, 4, 6 & 8 Weeks of Age)",
          targetParasite: "Toxocara canis & Ancylostoma caninum (Hookworms)",
          recommendedDrugId: "pyrantel-pamoate",
          alternativeDrugId: "fenbendazole",
          notes: "Mandatory bi-weekly deworming up to 8 weeks, then monthly until 6 months of age. Transplacental and transmammary transmission routes."
        },
        {
          stageName: "Adult Dogs (Quarterly / Every 3 Months)",
          targetParasite: "Toxocara, Ancylostoma, Trichuris vulpis (Whipworms), Dipylidium caninum & Echinococcus granulosus (Tapeworms)",
          recommendedDrugId: "praziquantel",
          alternativeDrugId: "fenbendazole",
          notes: "Standard protocol: Broad-spectrum combination tablet containing Praziquantel (50mg) + Pyrantel Pamoate (144mg) + Febantel (150mg) per 10 kg body weight (Drontal Plus)."
        }
      ]
    },
    {
      species: "feline",
      speciesNameHi: "बिल्ली (कैट्स)",
      lifeStages: [
        {
          stageName: "Kittens (3, 5, 7 & 9 Weeks of Age)",
          targetParasite: "Toxocara cati & Ancylostoma tubaeforme",
          recommendedDrugId: "pyrantel-pamoate",
          alternativeDrugId: "fenbendazole",
          notes: "Administer liquid suspension carefully via syringe. Repeat every 2 weeks until 2 months of age, then monthly until 6 months."
        },
        {
          stageName: "Adult Cats (Quarterly / Every 3 Months)",
          targetParasite: "Roundworms, Hookworms & Dipylidium caninum (Flea tapeworm)",
          recommendedDrugId: "praziquantel",
          alternativeDrugId: "fenbendazole",
          notes: "Praziquantel + Pyrantel embonate combination tablet (1 tablet per 4 kg body weight). Always treat concurrently for fleas."
        }
      ]
    },
    {
      species: "avian",
      speciesNameHi: "मुर्गीपालन (कमर्शियल लेयर व ब्रायलर / बैकयार्ड)",
      lifeStages: [
        {
          stageName: "Grower & Layer Pullets (Every 8 to 10 Weeks)",
          targetParasite: "Ascaridia galli (Large intestinal roundworm), Heterakis gallinarum (Cecal worm / vector of Blackhead), and Capillaria",
          recommendedDrugId: "albendazole",
          alternativeDrugId: "levamisole",
          notes: "Administer in morning drinking water after 2 hours of thirsting. Observe mandatory 3-day egg withdrawal period."
        }
      ]
    }
  ];

  // 4. FAMACHA EYE CONJUNCTIVAL ANAEMIA SCORING MATRIX
  const FAMACHA_SCALE = [
    {
      score: 1,
      classification: "Optimal",
      classificationHi: "उत्कृष्ट (कोई रक्ताल्पता नहीं)",
      mucousMembraneColor: "Cherry Red (गहरा लाल / चेरी लाल)",
      estimatedPcvRange: "PCV > 28%",
      clinicalAction: "DO NOT DEWORM (कृमिनाशक दवा न दें)",
      clinicalGuidance: "Robust hematocrit. Animal possesses strong natural resistance. Preserves essential refugia population of unselected worms on pasture."
    },
    {
      score: 2,
      classification: "Acceptable",
      classificationHi: "स्वीकार्य (सामान्य स्थिति)",
      mucousMembraneColor: "Red-Pink (लाल-गुलाबी)",
      estimatedPcvRange: "PCV 23% - 27%",
      clinicalAction: "DO NOT DEWORM (कृमिनाशक दवा न दें)",
      clinicalGuidance: "Normal healthy state. No intervention required unless animal is in peak lactation, advanced late pregnancy, or exhibiting poor body condition."
    },
    {
      score: 3,
      classification: "Borderline",
      classificationHi: "सीमांत (हल्की रक्ताल्पता)",
      mucousMembraneColor: "Pink (हल्का गुलाबी)",
      estimatedPcvRange: "PCV 18% - 22%",
      clinicalAction: "SELECTIVE DEWORMING (चयनात्मक उपचार)",
      clinicalGuidance: "Deworm ONLY if: (a) Young lamb/kid (<1 year), (b) Ewe/doe in late gestation or early lactation, (c) Body condition score (BCS) < 2.5, or (d) More than 20% of the flock scores 3 or higher."
    },
    {
      score: 4,
      classification: "Dangerous",
      classificationHi: "खतरनाक (गंभीर रक्ताल्पता)",
      mucousMembraneColor: "Pink-White (गुलाबी-सफेद / अत्यधिक फीका)",
      estimatedPcvRange: "PCV 13% - 17%",
      clinicalAction: "MANDATORY URGENT DEWORMING (अनिवार्य त्वरित दवा दें)",
      clinicalGuidance: "High parasite burden (Haemonchus contortus). Administer targeted anthelmintic immediately (Closantel or Levamisole). Supplement with oral iron, copper, cobalt, and Vitamin B12."
    },
    {
      score: 5,
      classification: "Severe Emergency",
      classificationHi: "अति-गंभीर आपातकाल (घातक रक्ताल्पता)",
      mucousMembraneColor: "Chalk White (पूर्णतः सफेद / चाक जैसा)",
      estimatedPcvRange: "PCV < 12%",
      clinicalAction: "EMERGENCY INTERVENTION (आपातकालीन उपचार व रक्त रक्षक)",
      clinicalGuidance: "Life-threatening hemorrhagic parasitemia. High risk of imminent mortality within 24-48 hours. Administer fast-acting anthelmintic immediately. Whole blood transfusion or parenteral iron dextran indicated."
    }
  ];

  // 5. ANTHELMINTIC ENGINE IMPLEMENTATION
  const DewormingEngine = {
    classes: ANTHELMINTIC_CLASSES,
    protocols: SPECIES_PROTOCOLS,
    famachaScale: FAMACHA_SCALE
  };

  /**
   * Evaluates pregnancy safety of an anthelmintic drug given species and trimester.
   *
   * @param {string} drugIdOrName - Identifier or generic name of drug
   * @param {number|string} trimester - 1, 2, or 3
   * @param {string} species - Target animal species
   * @returns {Object} Verdict, warnings, and alternative pregnancy-safe recommendation.
   */
  DewormingEngine.checkPregnancySafety = function (drugIdOrName, trimester, species) {
    if (!drugIdOrName) return { error: "Drug identifier required." };
    const query = drugIdOrName.trim().toLowerCase();
    const trimNum = parseInt(trimester, 10) || 1;
    const sp = species ? species.trim().toLowerCase() : "bovine";

    let matchedDrug = null;
    let matchedClass = null;

    for (let c = 0; c < ANTHELMINTIC_CLASSES.length; c++) {
      const cls = ANTHELMINTIC_CLASSES[c];
      for (let d = 0; d < cls.drugs.length; d++) {
        const drg = cls.drugs[d];
        if (drg.drugId.toLowerCase() === query || drg.genericName.toLowerCase().indexOf(query) !== -1) {
          matchedDrug = drg;
          matchedClass = cls;
          break;
        }
      }
      if (matchedDrug) break;
    }

    if (!matchedDrug) {
      return { error: "Anthelmintic drug '" + drugIdOrName + "' not found in clinical database." };
    }

    const safety = matchedDrug.pregnancySafety;
    let isPermitted = true;
    let alertMessage = "Safe for administration.";

    if (trimNum === 1 && !safety.firstTrimesterSafe) {
      isPermitted = false;
      alertMessage = "CRITICAL CONTRAINDICATION (1st Trimester): " + safety.warning;
    } else if (trimNum === 3 && !safety.thirdTrimesterSafe) {
      isPermitted = false;
      alertMessage = "LATE PREGNANCY WARNING (3rd Trimester): " + safety.warning;
    } else if (!safety.isSafe) {
      alertMessage = "PRECAUTIONARY WARNING: " + safety.warning;
    }

    return {
      drugId: matchedDrug.drugId,
      genericName: matchedDrug.genericName,
      chemicalClass: matchedClass.className,
      species: sp,
      trimester: trimNum,
      isPermitted: isPermitted,
      alertMessage: alertMessage,
      safeAlternative: isPermitted ? null : {
        drugId: "fenbendazole",
        genericName: "Fenbendazole (Panacur)",
        reason: "Fenbendazole is completely non-teratogenic and certified safe across all three trimesters of pregnancy."
      }
    };
  };

  /**
   * Returns clinical guidance, estimated PCV, and action plan for a FAMACHA score (1-5).
   *
   * @param {number|string} score - Value between 1 and 5
   */
  DewormingEngine.getFamachaGuidance = function (score) {
    const s = parseInt(score, 10);
    const result = FAMACHA_SCALE.find(item => item.score === s);
    if (!result) {
      return {
        error: "Invalid FAMACHA score: " + score + ". Must be an integer between 1 (Optimal) and 5 (Severe Emergency)."
      };
    }
    return Object.assign({}, result);
  };

  /**
   * Calculates precise dosage volume/bolus and withdrawal periods for an anthelmintic drug.
   *
   * @param {string} drugId - Drug identifier (e.g. 'fenbendazole', 'albendazole')
   * @param {number} weightKg - Body weight in kilograms
   * @param {string} species - Animal species
   * @param {boolean} isPregnant - Pregnancy status
   * @param {number} trimester - 1, 2, or 3
   */
  DewormingEngine.calculateDewormingDose = function (drugId, weightKg, species, isPregnant, trimester) {
    const wt = parseFloat(weightKg);
    if (isNaN(wt) || wt <= 0) {
      return { error: "Invalid body weight provided: " + weightKg };
    }

    const sp = species ? species.trim().toLowerCase() : "bovine";
    let targetDrug = null;

    for (let c = 0; c < ANTHELMINTIC_CLASSES.length; c++) {
      const cls = ANTHELMINTIC_CLASSES[c];
      for (let d = 0; d < cls.drugs.length; d++) {
        if (cls.drugs[d].drugId === drugId.trim().toLowerCase()) {
          targetDrug = cls.drugs[d];
          break;
        }
      }
      if (targetDrug) break;
    }

    if (!targetDrug) {
      return { error: "Anthelmintic drug ID '" + drugId + "' not recognized." };
    }

    // Check pregnancy safety if applicable
    let pregnancyCheck = null;
    if (isPregnant) {
      pregnancyCheck = DewormingEngine.checkPregnancySafety(targetDrug.drugId, trimester || 1, sp);
    }

    // Determine dose rate (mg/kg)
    let doseRate = 7.5; // default fallback
    if (typeof targetDrug.doseMgPerKg === "object" && targetDrug.doseMgPerKg[sp]) {
      doseRate = targetDrug.doseMgPerKg[sp];
    } else if (typeof targetDrug.doseMgPerKg === "number") {
      doseRate = targetDrug.doseMgPerKg;
    }

    const totalMg = wt * doseRate;

    // Formulation calculation
    let formulationAdvice = "";
    if (targetDrug.drugId === "albendazole") {
      // 25 mg/ml suspension
      const ml = totalMg / 25.0;
      formulationAdvice = ml.toFixed(1) + " ml of 2.5% Albendazole oral suspension (or " + (wt >= 300 ? "1 bolus of 3.0g" : "half bolus") + ").";
    } else if (targetDrug.drugId === "fenbendazole") {
      // 150 mg/ml suspension or 3.0g bolus
      const ml = totalMg / 150.0;
      formulationAdvice = ml.toFixed(1) + " ml of 15% Fenbendazole suspension (or " + (wt >= 350 ? "1 bolus of 3.0g" : "1 bolus of 1.5g") + ").";
    } else if (targetDrug.drugId === "ivermectin") {
      // 10 mg/ml (1 ml per 50 kg)
      const ml = totalMg / 10.0;
      formulationAdvice = ml.toFixed(1) + " ml strictly SUBCUTANEOUS (SC) injection.";
    } else if (targetDrug.drugId === "levamisole") {
      // 75 mg/ml (1 ml per 10 kg)
      const ml = totalMg / 75.0;
      formulationAdvice = ml.toFixed(1) + " ml strictly SUBCUTANEOUS (SC) injection.";
    } else if (targetDrug.drugId === "closantel") {
      // 150 mg/ml (1 ml per 30 kg SC or 1 ml per 15 kg oral)
      const ml = totalMg / 150.0;
      formulationAdvice = ml.toFixed(1) + " ml via " + targetDrug.route + " route.";
    } else if (targetDrug.drugId === "praziquantel") {
      // 50 mg tabs (1 tab per 10 kg in dogs)
      const tabs = totalMg / 50.0;
      formulationAdvice = tabs.toFixed(1) + " tablet(s) of 50 mg Praziquantel.";
    } else {
      formulationAdvice = totalMg.toFixed(1) + " mg active ingredient.";
    }

    return {
      drugId: targetDrug.drugId,
      genericName: targetDrug.genericName,
      species: sp,
      weightKg: wt,
      doseRateMgPerKg: doseRate,
      totalDoseMg: Number(totalMg.toFixed(2)),
      formulationInstruction: formulationAdvice,
      route: targetDrug.route,
      withdrawalDays: targetDrug.withdrawalDays,
      pregnancyCheck: pregnancyCheck
    };
  };

  /**
   * Predicts the next due date and recommends rotational chemical class to halt anthelmintic resistance.
   *
   * @param {string} species - Animal species
   * @param {number} ageMonths - Age in months
   * @param {string|Date} lastDewormingDate - ISO date string or Date
   * @param {string} lastDrugClassId - e.g., 'class-1-benzimidazoles'
   */
  DewormingEngine.predictNextDeworming = function (species, ageMonths, lastDewormingDate, lastDrugClassId) {
    const sp = species ? species.trim().toLowerCase() : "bovine";
    const age = parseFloat(ageMonths) || 12;
    const baseDate = lastDewormingDate ? new Date(lastDewormingDate) : new Date();

    if (isNaN(baseDate.getTime())) {
      return { error: "Invalid date format for lastDewormingDate." };
    }

    let intervalDays = 180; // Default 6 months for adult ruminants

    if (sp === "canine" || sp === "feline") {
      intervalDays = (age < 6) ? 30 : 90; // Monthly for pups, quarterly for adult pets
    } else if (sp === "bovine" || sp === "bubaline") {
      intervalDays = (age < 6) ? 30 : 180; // Monthly for calves, bi-annual for adult stock
    } else if (sp === "caprine" || sp === "ovine") {
      intervalDays = 90; // Quarterly evaluation via FAMACHA
    } else if (sp === "equine") {
      intervalDays = (age < 12) ? 60 : 180; // Bimonthly foals, bi-annual adults
    } else if (sp === "avian") {
      intervalDays = 60; // Every 8-10 weeks for layers
    }

    const nextDueDate = new Date(baseDate.getTime());
    nextDueDate.setDate(nextDueDate.getDate() + intervalDays);

    // Chemical class rotation logic
    const classSequence = [
      "class-1-benzimidazoles",
      "class-3-macrocyclic-lactones",
      "class-2-imidazothiazoles",
      "class-4-salicylanilides"
    ];

    let recommendedClass = ANTHELMINTIC_CLASSES[0];
    if (lastDrugClassId) {
      const idx = classSequence.indexOf(lastDrugClassId);
      if (idx !== -1) {
        const nextIdx = (idx + 1) % classSequence.length;
        const candidateClassId = classSequence[nextIdx];
        recommendedClass = ANTHELMINTIC_CLASSES.find(c => c.classId === candidateClassId) || ANTHELMINTIC_CLASSES[0];
      }
    }

    const y = nextDueDate.getFullYear();
    const m = String(nextDueDate.getMonth() + 1).padStart(2, "0");
    const d = String(nextDueDate.getDate()).padStart(2, "0");

    return {
      species: sp,
      ageMonths: age,
      lastDewormingDate: baseDate.toISOString().split("T")[0],
      intervalDaysApplied: intervalDays,
      predictedNextDueDate: y + "-" + m + "-" + d,
      rotationRule: "ANNUAL ROTATION OF CHEMICAL ACTION: To prevent selecting for resistant worm populations, switch chemical class from '" + (lastDrugClassId || "None") + "' to the recommended class below.",
      recommendedChemicalClass: {
        classId: recommendedClass.classId,
        className: recommendedClass.className,
        classNameHi: recommendedClass.classNameHi,
        representativeDrug: recommendedClass.drugs[0].genericName
      }
    };
  };

  /**
   * Retrieves life-stage deworming protocol for target species.
   */
  DewormingEngine.getProtocolBySpecies = function (species) {
    if (!species || typeof species !== "string") return null;
    const sp = species.trim().toLowerCase();
    const proto = SPECIES_PROTOCOLS.find(p => p.species === sp);
    return proto ? Object.assign({}, proto) : null;
  };

  // Expose engine to clinical data namespace
  window.VetcareApp.ClinicalData.Deworming = DewormingEngine;

})();
