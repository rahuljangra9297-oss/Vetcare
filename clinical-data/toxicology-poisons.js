// Vetcare AI OS - Veterinary Toxicology Database, Poisoning Protocols & Emergency Antidote Regimens (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. COMPREHENSIVE VETERINARY TOXICOLOGY DOSSIERS (10 CRITICAL EMERGENCY CONDITIONS)
  const POISON_REGISTRY = [
    // ========================================================================
    // 1. CYANIDE / PRUSSIC ACID / HCN TOXICITY (सायनाइड विषाक्तता)
    // ========================================================================
    {
      id: "tox-cyanide-hcn",
      nameEn: "Cyanide / Hydrocyanic Acid (HCN) / Prussic Acid Poisoning",
      nameHi: "सायनाइड / प्रूसिक एसिड विषाक्तता (कच्ची चरी / ज्वार विषाक्तता)",
      toxinClass: "Cellular Asphyxiant / Mitochondrial Cytochrome Oxidase Inhibitor",
      commonSources: [
        "Immature, stunted, wilted, or drought-stressed Sorghum / Jowar (चरी) under 45-60 days height (<2.5 feet)",
        "Sudan grass, Johnson grass (Sorghum halepense)",
        "Linseed / Flaxseed cake (excessive unboiled drenching)",
        "Cassava / Tapioca peel and leaves"
      ],
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine"],
      cardinalSigns: [
        "Pathognomonic bright cherry-red colored venous blood (ऑक्सीजन से भरपूर चमकीला लाल खून)",
        "Sudden gasping, extreme dyspnea, and open-mouth breathing (तीव्र दम घुटना)",
        "Frothing at the mouth with bitter almond odor on breath (मुंह से झाग व कड़वे बादाम जैसी महक)",
        "Violent muscle tremors, staggering gait, collapse into lateral recumbency within 15-30 minutes",
        "Opisthotonos, dilated pupils, mydriasis, terminal convulsions, and asphyxial death"
      ],
      pathognomonicIndicator: "Bright cherry-red venous blood that fails to darken upon exposure to air; bitter almond breath odor.",
      antidotes: [
        {
          drugName: "Sodium Nitrite 3% Solution",
          concentration: "30 mg/ml (3% w/v in sterile water)",
          doseMgPerKg: 15.0,
          calculatedVolumeDescription: "0.5 ml per kg body weight (approx 100-150 ml for a 300-400 kg cow) slow IV.",
          route: "IV",
          notes: "STEP 1: Inject slowly IV. Converts hemoglobin to methemoglobin, which binds free cyanide to form non-toxic cyanmethemoglobin."
        },
        {
          drugName: "Sodium Thiosulfate 20% Solution",
          concentration: "200 mg/ml (20% w/v in sterile water)",
          doseMgPerKg: 500.0,
          calculatedVolumeDescription: "2.5 ml per kg body weight (approx 500-750 ml for adult cattle) IV immediately following sodium nitrite.",
          route: "IV",
          notes: "STEP 2: Injected immediately after Sodium Nitrite. Rhodanese enzyme uses thiosulfate to convert cyanmethemoglobin into non-toxic thiocyanate excreted in urine."
        }
      ],
      universalFirstAid: [
        "Drench 1 to 2 liters of liquid paraffin or 500 ml vinegar diluted in water orally to inhibit further ruminal microbial beta-glucosidase breakdown of dhurrin.",
        "Administer 100% supplemental oxygen therapy if available."
      ],
      strictlyContraindicated: [
        "NEVER elevate the animal's head vertically during recumbency (induces fatal regurgitation aspiration).",
        "NEVER graze ruminants on young stunted jowar after sudden rains until plants attain at least 50% flowering stage."
      ]
    },

    // ========================================================================
    // 2. NITRATE & NITRITE TOXICITY (नाइट्रेट व नाइट्राइट विषाक्तता)
    // ========================================================================
    {
      id: "tox-nitrate-nitrite",
      nameEn: "Nitrate & Nitrite Poisoning",
      nameHi: "नाइट्रेट व नाइट्राइट विषाक्तता (चॉकलेट रंग का खून / यूरिया खाद का बहाव)",
      toxinClass: "Oxidative Hemoglobin Toxin / Methemoglobinemia Inducer",
      commonSources: [
        "Drought-stressed, heavily nitrogen-fertilized crops (Green oats, immature maize, sorghum)",
        "Nitrate accumulator weeds (Amaranthus / Chaulai, Chenopodium / Bathua)",
        "Stagnant agricultural runoff water contaminated with chemical nitrogenous fertilizers (Urea/DAP)"
      ],
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine"],
      cardinalSigns: [
        "Pathognomonic chocolate-brown colored blood that fails to turn red upon atmospheric oxygen exposure (चॉकलेट जैसे भूरे रंग का गाढ़ा खून)",
        "Severe, rapid cyanosis of mucous membranes (gums, tongue, and vulva appear blue-grey)",
        "Extreme dyspnea, rapid shallow panting without airway obstruction",
        "Tachycardia (>110 bpm in cattle), weak thready pulse, and hypothermia",
        "Frequent urination, ataxia, progressive weakness, collapse, and terminal coma"
      ],
      pathognomonicIndicator: "Distinct dark chocolate-brown or muddy appearance of drawn blood; blue-grey cyanotic mucous membranes.",
      antidotes: [
        {
          drugName: "Methylene Blue 1% Solution",
          concentration: "10 mg/ml (1% sterile solution in normal saline)",
          doseMgPerKg: 2.0, // Up to 4.0-8.8 mg/kg in severe bovine crises
          calculatedVolumeDescription: "0.2 to 0.4 ml per kg body weight (approx 100-150 ml for a 400 kg cow) slow IV.",
          route: "IV",
          notes: "SPECIFIC ANTIDOTE: Reduces methemoglobin back to functional ferrous hemoglobin via the NADPH-dependent methemoglobin reductase enzyme pathway. Inject slowly over 5-10 minutes. Repeat once after 2 hours if blood remains chocolate-colored."
        }
      ],
      universalFirstAid: [
        "Drench 10 to 20 liters of cold water mixed with 1-2 liters of 5% acetic acid/vinegar into the rumen via stomach tube to suppress bacterial reduction of nitrate to nitrite.",
        "Administer Vitamin C (Ascorbic acid 10-20 mg/kg IV) as an adjunctive physiological antioxidant."
      ],
      strictlyContraindicated: [
        "NEVER administer Methylene Blue in excessive doses (>15-20 mg/kg); overdose paradoxically acts as an oxidant, exacerbating methemoglobinemia and Heinz body anemia.",
        "NEVER give high-potassium IV fluids during acute nitrite crisis."
      ]
    },

    // ========================================================================
    // 3. UREA / AMMONIA / NPN TOXICITY (यूरिया विषाक्तता)
    // ========================================================================
    {
      id: "tox-urea-ammonia",
      nameEn: "Urea & Non-Protein Nitrogen (NPN) Toxicity (Ammonia Poisoning)",
      nameHi: "यूरिया / अमोनिया विषाक्तता (अचानक पेट फूलना, मुंह से अमोनिया गंध व छटपटाहट)",
      toxinClass: "Neuro-metabolic Ruminal Hyperammonemia / Encephalopathy",
      commonSources: [
        "Accidental consumption of agricultural fertilizer urea bags or fertilizer washings",
        "Feeding un-aerated freshly opened 4% urea-treated straw",
        "Overdose in concentrate feed mixtures without adequate soluble carbohydrates",
        "Feeding urea to young calves under 6 months of age"
      ],
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine"],
      cardinalSigns: [
        "Hyperacute onset within 20 to 60 minutes of ingestion",
        "Severe ruminal bloat / tympany accompanied by sharp pungent ammonia odor from the breath and belch (मुंह व गोबर से तीखी अमोनिया गैस की गंध)",
        "Profuse frothy ropy salivation, vigorous chewing movements, and teeth grinding",
        "Violent muscle tremors, abdominal kicking, hyperesthesia, bellowing, and mania",
        "Rumen fluid pH skyrockets above 8.0 (normal 6.2 - 6.8)",
        "Severe extensor spasms, tetany, circulatory collapse, and death within 1-3 hours"
      ],
      pathognomonicIndicator: "Pungent ammonia gas smell from mouth and ruminal fluid with rumen pH testing highly alkaline (>8.0).",
      antidotes: [
        {
          drugName: "5% Acetic Acid / Commercial White Vinegar",
          concentration: "5% Acetic Acid Solution",
          doseMgPerKg: 0.0,
          calculatedVolumeDescription: "2 to 5 Liters for adult cattle/buffalo (0.5 to 1.0 Liter for sheep/goats) diluted in 20 to 30 Liters of ICE-COLD WATER.",
          route: "Oral",
          notes: "LIFE-SAVING FIRST-LINE THERAPY: Infuse directly into the rumen via stomach tube. Acetic acid lowers rumen pH, converting free absorbable lipophilic Ammonia (NH3) into non-absorbable polar Ammonium ions (NH4+). Ice-cold water halts bacterial urease enzyme activity."
        }
      ],
      universalFirstAid: [
        "Pass a large-bore stomach tube immediately to relieve life-threatening ruminal gas pressure.",
        "Infuse 20 to 30 liters of cold water followed by the vinegar drench. Repeat with half dose after 2 hours if tremors persist.",
        "Administer Calcium Borogluconate (CBG 200-300 ml IV) to alleviate concurrent hypocalcemic muscle tetany."
      ],
      strictlyContraindicated: [
        "CRITICAL: ABSOLUTELY NEVER DRENCH WARM WATER (warmth exponentially accelerates bacterial urease enzyme, releasing fatal ammonia surges within minutes).",
        "NEVER drench chemical neutralizers without confirming the animal is capable of swallowing, to prevent fatal pulmonary aspiration."
      ]
    },

    // ========================================================================
    // 4. ORGANOPHOSPHATE & CARBAMATE POISONING (कीटनाशक विषाक्तता)
    // ========================================================================
    {
      id: "tox-organophosphates",
      nameEn: "Organophosphate & Carbamate Insecticide Toxicity",
      nameHi: "ऑर्गेनोफॉस्फेट / कीटनाशक दवा विषाक्तता (मुंह से लार, पुतली सिकुड़ना व कंपन)",
      toxinClass: "Acetylcholinesterase (AChE) Inhibitor / Cholinergic Toxin",
      commonSources: [
        "Accidental ingestion or dipping tank over-concentration: Chlorpyrifos, Malathion, Monocrotophos, Dichlorvos (DDVP), Diazinon",
        "Crop spray drift drifting onto livestock pasture grasses"
      ],
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine"],
      cardinalSigns: [
        "Pathognomonic SLUD / DUMBELLS Syndrome: Salivation, Lacrimation, Urination, Defecation (मुंह से अत्यधिक लार, आंखों से पानी, पेशाब व दस्त)",
        "Pinpoint constricted pupils (Miosis - पुतली का अत्यधिक सिकुड़ जाना)",
        "Pronounced generalized muscle twitching, fasciculations of the face, tongue, and flanks",
        "Severe bronchial constriction, audible wheezing, pulmonary edema, and respiratory distress",
        "Severe bradycardia (heart rate plunging <40 bpm in cattle, <60 in dogs)"
      ],
      pathognomonicIndicator: "Extreme pinpoint miosis, continuous copious ropy salivation (SLUD), and widespread muscular twitching.",
      antidotes: [
        {
          drugName: "Atropine Sulfate",
          concentration: "1 mg/ml (or 0.6 mg/ml)",
          doseMgPerKg: 0.25, // 0.2 to 0.5 mg/kg for OP crisis
          calculatedVolumeDescription: "Administer 1/4th of the calculated dose SLOWLY IV, and the remaining 3/4th SC or IM. Adult cattle: approx 100-150 ml; Dogs: 2-5 ml.",
          route: "IV",
          notes: "PHYSIOLOGICAL ANTIDOTE: Competitively blocks muscarinic acetylcholine receptors. Titrate to effect: Repeat every 15-30 minutes until full atropinization is achieved (cessation of salivation, bronchial drying, and pupil dilation). Maintain for 24-48 hours."
        },
        {
          drugName: "Pralidoxime Chloride (2-PAM)",
          concentration: "500 mg/vial reconstituted to 50 mg/ml",
          doseMgPerKg: 20.0,
          calculatedVolumeDescription: "0.4 ml per kg body weight (approx 15-20 mg/kg) via slow IV infusion over 15 minutes.",
          route: "IV",
          notes: "CHEMICAL CHOLINESTERASE REACTIVATOR: Administer within the first 24 hours before irreversible enzyme 'aging' occurs. CONTRAINDICATED in pure Carbamate poisoning."
        }
      ],
      universalFirstAid: [
        "Dermal decontamination: If caused by dipping or spray, scrub the entire skin coat with warm water and alkaline soap (detergent) immediately to prevent further transdermal absorption.",
        "Oral ingestion: Administer Activated Charcoal slurry (1-2 g/kg) with Magnesium Sulfate (Epsom salts 0.5 g/kg) to adsorb remaining enteric toxins."
      ],
      strictlyContraindicated: [
        "NEVER administer 2-PAM in pure Carbamate (Carbaryl, Methomyl) toxicity (increases toxicity).",
        "NEVER administer morphine, theophylline, phenothiazines (Acepromazine), or succinylcholine (potentiates neuromuscular paralysis)."
      ]
    },

    // ========================================================================
    // 5. PYRETHROID / PERMETHRIN TOXICITY IN CATS (बिल्ली में पर्मेथ्रिन विषाक्तता)
    // ========================================================================
    {
      id: "tox-permethrin-feline",
      nameEn: "Feline Permethrin / Synthetic Pyrethroid Toxicity",
      nameHi: "बिल्ली में पर्मेथ्रिन विषाक्तता (कुत्तों का टिक-स्पॉट लगाने से होने वाले झटके)",
      toxinClass: "Voltage-Gated Sodium Channel Neurotoxin",
      commonSources: [
        "Accidental application of canine spot-on flea/tick treatments containing concentrated (45-65%) Permethrin to cats",
        "Grooming or close physical contact with dogs recently treated with permethrin spot-ons"
      ],
      targetSpecies: ["feline"],
      cardinalSigns: [
        "Rapid onset within 1 to 6 hours of exposure",
        "Pathognomonic localized ear twitching, facial tremors, and frantic paw shaking",
        "Progressive, violent, generalized whole-body muscle tremors resembling a shivering vibrating cat",
        "Severe, life-threatening hyperthermia (>105°F / >40.5°C) due to continuous muscular heat generation",
        "Hypersalivation (ptyalism), mydriasis, ataxia, generalized tonic-clonic seizures, and death"
      ],
      pathognomonicIndicator: "Continuous violent whole-body muscle tremor activity in a cat following topical flea medication application.",
      antidotes: [
        {
          drugName: "Intravenous Lipid Emulsion (ILE 20%)",
          concentration: "20% Sterile Lipid Emulsion (Intralipid / Lipovenous)",
          doseMgPerKg: 0.0,
          calculatedVolumeDescription: "Initial bolus of 1.5 to 2.0 ml/kg IV over 15 minutes, followed by a constant rate infusion (CRI) of 0.25 to 0.5 ml/kg/min for 30-60 minutes.",
          route: "IV",
          notes: "'LIPID SINK' RESCUE: Permethrin is highly lipophilic; the circulating intravascular lipid droplets sequester the toxin away from peripheral neural membranes, leading to rapid clinical recovery."
        },
        {
          drugName: "Methocarbamol / Diazepam (Muscle Relaxants)",
          concentration: "Methocarbamol 100 mg/ml or Diazepam 5 mg/ml",
          doseMgPerKg: 55.0, // Methocarbamol: 55-100 mg/kg IV slow; Diazepam: 0.5-1.0 mg/kg IV
          calculatedVolumeDescription: "Methocarbamol 0.5 to 1.0 ml/kg IV slow push, titrated to suppress tremors without inducing respiratory depression.",
          route: "IV",
          notes: "Primary centrally acting muscle relaxant to abate violent muscular tremors and halt fatal hyperthermia."
        }
      ],
      universalFirstAid: [
        "DERMAL BATHING: Bathe the cat immediately in lukewarm water using mild liquid dishwashing soap (e.g., Dawn or liquid handwash) to strip the oily permethrin vehicle off the skin.",
        "Active cooling: Use fans and room-temperature wetting to lower body temperature; discontinue cooling once body temp reaches 102.5°F to prevent hypothermic bounce."
      ],
      strictlyContraindicated: [
        "CRITICAL: ABSOLUTELY NEVER ADMINISTER ATROPINE (Permethrin is not an organophosphate; Atropine worsens tachycardia and tremors).",
        "NEVER bathe with hot water (hot water causes cutaneous vasodilation and accelerates systemic absorption).",
        "NEVER use organophosphates or dips on cats."
      ]
    },

    // ========================================================================
    // 6. SNAKE ENVENOMATION (सर्पदंश / विषैला सांप)
    // ========================================================================
    {
      id: "tox-snake-envenomation",
      nameEn: "Ophitoxemia / Snake Envenomation (Viperid vs Elapid)",
      nameHi: "सर्पदंश / विषैले सांप का काटना (वाइपर / कोबरा / करैत विषैला दंश)",
      toxinClass: "Complex Metalloproteinases / Phospholipase A2 / Neurotoxins",
      commonSources: [
        "Russell's Viper & Saw-scaled Viper (Vasculotoxic / Hemotoxic / Cytotoxic)",
        "Spectacled Cobra & Common Krait (Neurotoxic / Neuromuscular Blocker)",
        "Bites typically occur on the muzzle, face, or lower legs during pasture grazing"
      ],
      targetSpecies: ["bovine", "bubaline", "equine", "canine", "caprine"],
      cardinalSigns: [
        "VASCLOTOXIC (Viper): Massive, rapidly spreading local edema, intense pain, continuous oozing of un-clotted blood from paired fang marks, hematuria, tissue necrosis",
        "NEUROTOXIC (Cobra/Krait): Minimal local swelling; rapid bilateral ptosis, dropped lower jaw, continuous drooling, progressive ascending flaccid motor paralysis, respiratory failure",
        "Pathognomonic 20-minute Whole Blood Clotting Test (20WBCT): Blood drawn into a clean dry glass tube fails to clot after 20 minutes (indicates hemotoxic venom consumption coagulopathy)"
      ],
      pathognomonicIndicator: "Paired puncture fang marks with localized bleeding/edema and failure of blood to clot in a glass test tube (20WBCT positive).",
      antidotes: [
        {
          drugName: "Polyvalent Anti-Snake Venom Serum (ASV)",
          concentration: "Lyophilized vial neutralizes Cobra, Krait, Russell's Viper, and Saw-scaled Viper venoms",
          doseMgPerKg: 0.0,
          calculatedVolumeDescription: "Large Animals (Cattle/Horse): 4 to 8 vials reconstituted in 500-1000 ml Normal Saline IV infusion over 30-60 mins. Small Animals (Dogs): 2 to 4 vials.",
          route: "IV",
          notes: "SPECIFIC DEFINITIVE ANTIDOTE: Administer as early as possible. Pre-treat with Pheniramine Maleate (Avil) and Dexamethasone/Hydrocortisone IV 10 minutes prior to prevent acute anaphylactoid serum reaction."
        },
        {
          drugName: "Neostigmine Methylsulfate + Atropine (Elapid Neurotoxic Protocol)",
          concentration: "Neostigmine 0.5 mg/ml + Atropine 1 mg/ml",
          doseMgPerKg: 0.04,
          calculatedVolumeDescription: "Administer Atropine (0.04 mg/kg) followed by Neostigmine (0.04 mg/kg) IM/IV.",
          route: "IM",
          notes: "Blocks acetylcholinesterase, overcoming post-synaptic neuromuscular blockade caused by Cobra venom ('Neostigmine challenge test')."
        }
      ],
      universalFirstAid: [
        "Keep the animal strictly calm, immobilized, and resting; movement accelerates lymphatic venom dissemination.",
        "Perform tracheostomy in animals with severe facial/pharyngeal swelling causing mechanical asphyxiation.",
        "Administer Broad-Spectrum Antibiotic (Ceftriaxone or Amoxicillin) to counter severe secondary anaerobic mouth flora inoculated by the snake."
      ],
      strictlyContraindicated: [
        "STRICT PROHIBITION: NEVER APPLY ARTERIAL TOURNIQUETS (causes ischemic gangrene, tissue necrosis, and explosive toxic shock upon release).",
        "NEVER incise, suck, cut, or cauterize the bite site with potassium permanganate or battery acid.",
        "Avoid NSAIDs (Meloxicam, Flunixin) in viper bites (aggravates fatal consumptive coagulopathy)."
      ]
    },

    // ========================================================================
    // 7. AFLATOXICOSIS & MYCOTOXICOSIS (एफ्लाटॉक्सिन / फफूंद विषाक्तता)
    // ========================================================================
    {
      id: "tox-aflatoxicosis",
      nameEn: "Aflatoxicosis & Feed Mycotoxicosis",
      nameHi: "एफ्लाटॉक्सिन / फफूंद विषाक्तता (उल्ली लगा दाना / यकृत खराबी व पीलिया)",
      toxinClass: "Hepatotoxic / Carcinogenic Difuranocoumarin (Aspergillus flavus & parasiticus)",
      commonSources: [
        "Moldy, damp, improperly stored groundnut cake (मूंगफली की खल), cottonseed cake, maize grain, or moist commercial feed (>14% moisture)",
        "Musty, fungal-infested straw and silage"
      ],
      targetSpecies: ["bovine", "bubaline", "avian", "canine"],
      cardinalSigns: [
        "Dramatic, unresolving drop in herd milk production and feed refusal",
        "Icterus / Jaundice: Yellowish discoloration of sclera, gums, and unpigmented skin",
        "Severe immunosuppression resulting in recurrent vaccine failures and mastitis spikes",
        "Ascites (fluid accumulation in the abdomen) and dependent brisket edema",
        "Hemorrhagic enteritis, rectal prolapse, and fatty degenerate liver on necropsy"
      ],
      pathognomonicIndicator: "Yellowish hepatic icterus, severe ascites, and milk drop correlated with moldy musty feed consumption.",
      antidotes: [
        {
          drugName: "Hydrated Sodium Calcium Aluminosilicate (HSCAS) / Activated Charcoal",
          concentration: "Feed Grade Toxin Binder Powder",
          doseMgPerKg: 1000.0,
          calculatedVolumeDescription: "1.0 to 2.0 g per kg body weight orally as a slurry; or mix HSCAS at 0.5% to 1.0% (5-10 kg per ton) of total feed.",
          route: "Oral",
          notes: "Broad-spectrum chemical adsorption: Binds aflatoxin B1 molecules tightly in the gastrointestinal lumen, preventing systemic portal absorption."
        },
        {
          drugName: "Silymarin (Milk Thistle Extract) + Choline Chloride + B-Complex",
          concentration: "Standardized Liver Protectant Suspension",
          doseMgPerKg: 20.0,
          calculatedVolumeDescription: "Administer 100-200 ml orally twice daily for adult cattle for 10-14 days.",
          route: "Oral",
          notes: "Restores intracellular hepatic glutathione, stabilizes hepatocyte cell membranes, and stimulates liver tissue regeneration."
        }
      ],
      universalFirstAid: [
        "IMMEDIATELY WITHDRAW AND CONDEMN THE SUSPECT MOLDY FEED BATCH.",
        "Supplement diet with high biological value proteins, Vitamin E (1000 IU/day), Selenium, and Vitamin C.",
        "Administer Vitamin K1 (Phytomenadione) if coagulopathy and hemorrhagic enteritis are present."
      ],
      strictlyContraindicated: [
        "NEVER dilute or mix moldy feed with fresh feed (fungal spores and toxins remain fully active).",
        "NEVER feed damp, caked groundnut cake to lactating dairy animals (Aflatoxin B1 is metabolized into carcinogenic Aflatoxin M1 excreted directly in milk)."
      ]
    },

    // ========================================================================
    // 8. DATURA & BELLADONNA ALKALOID POISONING (धतूरा विषाक्तता)
    // ========================================================================
    {
      id: "tox-datura-belladonna",
      nameEn: "Datura & Belladonna Alkaloid Toxicity (Tropane Alkaloids)",
      nameHi: "धतूरा विषाक्तता (पुतली का फैलना, सूखा मुंह व अत्यधिक प्यास)",
      toxinClass: "Anticholinergic / Muscarinic Receptor Antagonist (Hyoscyamine, Scopolamine, Atropine)",
      commonSources: [
        "Accidental contamination of green fodder with Datura stramonium / Datura fastuosa seeds or leaves",
        "Atropa belladonna (Deadly nightshade)"
      ],
      targetSpecies: ["bovine", "bubaline", "equine", "caprine"],
      cardinalSigns: [
        "Pathognomonic extreme bilateral pupillary dilation (Mydriasis - पुतली का पूरा फैल जाना)",
        "Completely dry, parched mouth, dry muzzle, and agonizing intense thirst (अत्यधिक प्यास व सूखा मुंह)",
        "Tachycardia with a bounding pounding pulse, tachypnea, and hyperthermia",
        "Ruminal atony, cessation of bowel movements, and severe gaseous bloat / tympany",
        "Restlessness, muscle twitching, delirium, blindness, staggering, and terminal paralysis"
      ],
      pathognomonicIndicator: "Extreme, non-responsive pupillary dilation (mydriasis) combined with bone-dry mucous membranes and ruminal atony.",
      antidotes: [
        {
          drugName: "Physostigmine Salicylate / Neostigmine Methylsulfate",
          concentration: "Neostigmine 0.5 mg/ml or Physostigmine 1 mg/ml",
          doseMgPerKg: 0.04,
          calculatedVolumeDescription: "0.04 mg/kg (approx 15-20 ml for adult cattle) administered strictly via SLOW IV or SC route.",
          route: "IV",
          notes: "REVERSIBLE CHOLINESTERASE INHIBITOR: Overcomes anticholinergic blockade by massively increasing acetylcholine levels at synapses. Reverse mydriasis and restores ruminal peristalsis."
        }
      ],
      universalFirstAid: [
        "Gastric / Ruminal Lavage: Administer Activated Charcoal slurry (1-2 g/kg) mixed with 0.1% weak Potassium Permanganate (Lal Dawai) solution to chemically oxidize alkaloids.",
        "Drench generous cold water to quench intense thirst and drench magnesium sulfate saline cathartics to clear seeds from the GI tract."
      ],
      strictlyContraindicated: [
        "CRITICAL: ABSOLUTELY NEVER ADMINISTER ATROPINE (Datura contains natural atropine; giving Atropine guarantees rapid death).",
        "Avoid sudden loud noises or bright lights (exacerbates central manic delirium)."
      ]
    },

    // ========================================================================
    // 9. LEAD & HEAVY METAL POISONING (सीसा / लेड विषाक्तता)
    // ========================================================================
    {
      id: "tox-lead-poisoning",
      nameEn: "Plumbism / Acute & Chronic Lead Poisoning",
      nameHi: "लेड (सीसा) विषाक्तता (अंधापन, सिर दीवार से टकराना व दौरे)",
      toxinClass: "Heavy Metal Neurotoxicant / Sulfhydryl Enzyme Inhibitor",
      commonSources: [
        "Licking or chewing discarded lead-acid automotive/inverter batteries in farm dumping grounds",
        "Flaking lead-based paints, red lead primers on gates, plumber's lead pipes",
        "Used automotive motor oil and grease"
      ],
      targetSpecies: ["bovine", "bubaline", "canine", "avian"],
      cardinalSigns: [
        "Sudden bilateral functional blindness (amaurosis) with normal pupillary light reflexes (अचानक अंधापन)",
        "Pathognomonic 'Head Pressing': Animal persistently presses its forehead against walls, fences, or posts (दीवार से सिर दबाकर खड़े रहना)",
        "Frenzied bellowing, mania, blind charging, champing of jaws with frothy saliva",
        "Continuous fine muscle tremors of the face, neck, and ears progressing to tetanic convulsions",
        "Severe abdominal colic, diarrhea, and grinding of teeth (bruxism)"
      ],
      pathognomonicIndicator: "Sudden central blindness with persistent head-pressing against walls and frenzied bellowing.",
      antidotes: [
        {
          drugName: "Calcium Disodium EDTA (Ca-EDTA)",
          concentration: "100 mg/ml (10% sterile solution)",
          doseMgPerKg: 75.0,
          calculatedVolumeDescription: "75 mg/kg per day divided into 2-3 daily doses, diluted in 5% Dextrose, administered via slow IV drip for 4 to 5 consecutive days.",
          route: "IV",
          notes: "PRIMARY HEAVY METAL CHELATOR: Forms stable, water-soluble lead chelates excreted safely through the kidneys. Monitor renal parameters."
        },
        {
          drugName: "Thiamine Hydrochloride (Vitamin B1)",
          concentration: "100 mg/ml",
          doseMgPerKg: 15.0,
          calculatedVolumeDescription: "10 to 15 mg/kg (approx 30-50 ml for adult cattle) IM/IV twice daily for 7 days.",
          route: "IM",
          notes: "HIGH-DOSE THIAMINE PROTOCOL: Reduces tissue lead deposition, crosses the blood-brain barrier, and resolves cerebral polioencephalomalacia necrosis."
        }
      ],
      universalFirstAid: [
        "Administer Magnesium Sulfate (Epsom salts @ 0.5-1.0 g/kg orally in water) to precipitate soluble lead into insoluble, non-absorbable Lead Sulfate in the gut.",
        "Control violent convulsions with Diazepam (0.5 mg/kg IV) or Xylazine."
      ],
      strictlyContraindicated: [
        "NEVER use Disodium EDTA (Na2-EDTA); must strictly use Calcium Disodium EDTA (Ca-EDTA) to prevent fatal acute hypocalcemic tetany.",
        "Do not slaughter lead-poisoned animals for meat (lead residues persist in liver, kidneys, and bone for years)."
      ]
    },

    // ========================================================================
    // 10. RODENTICIDE & STRYCHNINE POISONING (चूहे मारने की दवा)
    // ========================================================================
    {
      id: "tox-rodenticides",
      nameEn: "Rodenticide Poisoning (Anticoagulants vs Zinc Phosphide vs Strychnine)",
      nameHi: "चूहे मारने की दवा विषाक्तता (खूनी स्राव / फॉस्फीन गैस / स्ट्राइकिन झटके)",
      toxinClass: "Anticoagulant (Vitamin K Antagonist) / Phosphine Gas / Glycine Antagonist",
      commonSources: [
        "Brodifacoum, Bromadiolone, Warfarin cakes (Anticoagulants)",
        "Zinc Phosphide black powder (सल्फास / काला पाउडर - releases fatal Phosphine gas)",
        "Strychnine laced meat baits"
      ],
      targetSpecies: ["canine", "feline", "bovine"],
      cardinalSigns: [
        "ANTICOAGULANT TYPE: Massive spontaneous internal hemorrhage, epistaxis (nosebleeds), hematuria, hematomas, pale gums, profound lethargy after 2-5 days of bait ingestion",
        "ZINC PHOSPHIDE TYPE: Severe abdominal pain, garlic/rotten fish odor from vomitus, acute vomiting, pulmonary edema, rapid shock",
        "STRYCHNINE TYPE: Severe tetanic extensor convulsions ('sawhorse posture') triggered instantaneously by minor touch, sound, or light while animal remains conscious"
      ],
      pathognomonicIndicator: "Anticoagulants: Uncontrolled multi-site bleeding with prolonged PT/aPTT. Zinc Phosphide: Rotten fish/acetylene breath odor. Strychnine: Touch-triggered tetanic spasms.",
      antidotes: [
        {
          drugName: "Vitamin K1 (Phytomenadione - For Anticoagulants)",
          concentration: "10 mg/ml (or 50 mg tabs)",
          doseMgPerKg: 3.5, // 2.5 to 5.0 mg/kg
          calculatedVolumeDescription: "Administer 2.5 to 5.0 mg/kg SC with a small gauge needle initially, then transition to oral tablets given with a fatty meal for 21 to 28 CONSECUTIVE DAYS.",
          route: "SC",
          notes: "SPECIFIC ANTIDOTE FOR ANTICOAGULANT RODENTICIDES: Restores active clotting factors II, VII, IX, and X. Never inject IV (triggers fatal anaphylaxis)."
        },
        {
          drugName: "Diazepam + Methocarbamol (For Strychnine Spasms)",
          concentration: "Diazepam 5 mg/ml",
          doseMgPerKg: 1.0,
          calculatedVolumeDescription: "1.0 to 2.0 mg/kg IV slow push, repeated to effect to control violent muscle tetany.",
          route: "IV",
          notes: "Centrally suppresses spinal interneuronal excitation. Keep patient in an absolute sound-proof, dark, padded cage."
        }
      ],
      universalFirstAid: [
        "Zinc Phosphide: Lavage stomach with 5% Sodium Bicarbonate solution (neutralizes gastric acid, halting release of phosphine gas). NEVER give acidic liquids.",
        "Anticoagulants: Transfuse Fresh Whole Blood or Fresh Frozen Plasma (FFP 10-20 ml/kg) immediately if clinical hemorrhagic shock is present."
      ],
      strictlyContraindicated: [
        "CRITICAL: NEVER INJECT VITAMIN K1 INTRAVENOUSLY (causes fatal acute anaphylactic shock).",
        "NEVER administer Vitamin K3 (Menadione); Vitamin K3 is 100% ineffective for anticoagulant rodenticides and causes fatal hemolytic anemia in dogs.",
        "Avoid emetics if animal is already convulsing or exhibiting respiratory distress."
      ]
    }
  ];

  // 3. TOXICOLOGY ENGINE IMPLEMENTATION
  const ToxicologyEngine = {
    registry: POISON_REGISTRY
  };

  /**
   * Fetches a single toxicology record by unique ID.
   */
  ToxicologyEngine.getToxicityById = function (id) {
    if (!id || typeof id !== "string") return null;
    const cleanId = id.trim().toLowerCase();
    const list = ToxicologyEngine.registry || [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].id.toLowerCase() === cleanId) return list[i];
    }
    return null;
  };

  /**
   * AUTOMATED EMERGENCY ANTIDOTE DOSAGE CALCULATOR:
   * Computes precise volumes (ml or liters) of specific antidotes based on animal body weight.
   *
   * @param {string} toxinId - Poison ID (e.g., 'tox-cyanide-hcn', 'tox-organophosphates')
   * @param {number} bodyWeightKg - Live animal weight in kg
   * @param {string} species - Animal species
   */
  ToxicologyEngine.calculateAntidoteDose = function (toxinId, bodyWeightKg, species) {
    const toxin = ToxicologyEngine.getToxicityById(toxinId);
    if (!toxin) {
      return { error: "Poisoning record with ID '" + toxinId + "' not found." };
    }

    const wt = parseFloat(bodyWeightKg);
    if (isNaN(wt) || wt <= 0) {
      return { error: "Invalid body weight provided: " + bodyWeightKg };
    }

    const sp = (species || "bovine").trim().toLowerCase();
    const calculatedAntidotes = [];

    for (let i = 0; i < toxin.antidotes.length; i++) {
      const ant = toxin.antidotes[i];
      let doseVolumeResult = "";
      let totalMgDose = null;

      if (toxin.id === "tox-cyanide-hcn") {
        if (ant.drugName.indexOf("Sodium Nitrite") !== -1) {
          totalMgDose = wt * 15.0; // 15 mg/kg
          const ml = totalMgDose / 30.0; // 3% = 30 mg/ml
          doseVolumeResult = ml.toFixed(1) + " ml of 3% Sodium Nitrite SLOW IV.";
        } else if (ant.drugName.indexOf("Sodium Thiosulfate") !== -1) {
          totalMgDose = wt * 500.0; // 500 mg/kg
          const ml = totalMgDose / 200.0; // 20% = 200 mg/ml
          doseVolumeResult = ml.toFixed(1) + " ml of 20% Sodium Thiosulfate IV.";
        }
      } else if (toxin.id === "tox-nitrate-nitrite") {
        totalMgDose = wt * 2.0; // 2 mg/kg
        const ml = totalMgDose / 10.0; // 1% = 10 mg/ml
        doseVolumeResult = ml.toFixed(1) + " ml of 1% Methylene Blue SLOW IV over 10 minutes.";
      } else if (toxin.id === "tox-urea-ammonia") {
        const liters = (sp === "caprine" || sp === "ovine" || wt < 100) ? 0.75 : 3.5;
        const waterLiters = (sp === "caprine" || sp === "ovine" || wt < 100) ? 5 : 25;
        doseVolumeResult = liters + " Liters of 5% Acetic Acid / Vinegar mixed in " + waterLiters + " Liters of ICE-COLD WATER via stomach tube.";
      } else if (toxin.id === "tox-organophosphates") {
        if (ant.drugName.indexOf("Atropine") !== -1) {
          totalMgDose = wt * 0.25; // 0.25 mg/kg
          const ml = totalMgDose / 1.0; // 1 mg/ml
          const ivPortion = (ml * 0.25).toFixed(1);
          const scPortion = (ml * 0.75).toFixed(1);
          doseVolumeResult = ml.toFixed(1) + " ml total (" + ivPortion + " ml SLOW IV, remainder " + scPortion + " ml SC/IM). Repeat every 15 mins to effect.";
        } else if (ant.drugName.indexOf("Pralidoxime") !== -1) {
          totalMgDose = wt * 20.0; // 20 mg/kg
          const ml = totalMgDose / 50.0; // 50 mg/ml
          doseVolumeResult = ml.toFixed(1) + " ml of 2-PAM reconstituted solution via slow IV infusion.";
        }
      } else if (toxin.id === "tox-permethrin-feline") {
        if (ant.drugName.indexOf("Intravenous Lipid") !== -1) {
          const bolusMl = (wt * 1.5).toFixed(1);
          doseVolumeResult = bolusMl + " ml of 20% Lipid Emulsion IV bolus over 15 mins, then CRI @ 0.5 ml/kg/hr.";
        } else if (ant.drugName.indexOf("Methocarbamol") !== -1) {
          const ml = ((wt * 55.0) / 100.0).toFixed(1);
          doseVolumeResult = ml + " ml of Methocarbamol (100mg/ml) SLOW IV push to stop tremors.";
        }
      } else if (toxin.id === "tox-snake-envenomation") {
        if (ant.drugName.indexOf("Anti-Snake Venom") !== -1) {
          const vials = (sp === "canine" || sp === "feline") ? "2 to 3 Vials" : "4 to 6 Vials";
          doseVolumeResult = vials + " of Polyvalent ASV reconstituted in 500 ml Normal Saline IV drip over 45 minutes.";
        } else {
          doseVolumeResult = ant.calculatedVolumeDescription;
        }
      } else if (toxin.id === "tox-rodenticides") {
        if (ant.drugName.indexOf("Vitamin K1") !== -1) {
          totalMgDose = wt * 3.5; // 3.5 mg/kg
          const ml = totalMgDose / 10.0; // 10 mg/ml
          doseVolumeResult = ml.toFixed(1) + " ml of Vitamin K1 (10mg/ml) strictly SC with fine needle. Transition to oral tabs for 28 days.";
        } else {
          doseVolumeResult = ant.calculatedVolumeDescription;
        }
      } else if (toxin.id === "tox-lead-poisoning") {
        if (ant.drugName.indexOf("EDTA") !== -1) {
          totalMgDose = wt * 75.0; // 75 mg/kg
          const ml = totalMgDose / 100.0; // 100 mg/ml
          doseVolumeResult = ml.toFixed(1) + " ml of 10% Ca-EDTA divided into 2 daily doses in 5% Dextrose IV drip.";
        } else {
          const ml = ((wt * 15.0) / 100.0).toFixed(1);
          doseVolumeResult = ml + " ml of Thiamine (100mg/ml) IM/IV twice daily.";
        }
      } else {
        doseVolumeResult = ant.calculatedVolumeDescription;
      }

      calculatedAntidotes.push({
        drugName: ant.drugName,
        route: ant.route,
        exactDoseInstructions: doseVolumeResult,
        clinicalNotes: ant.notes
      });
    }

    return {
      toxinId: toxin.id,
      nameEn: toxin.nameEn,
      nameHi: toxin.nameHi,
      species: sp,
      bodyWeightKg: wt,
      pathognomonicIndicator: toxin.pathognomonicIndicator,
      calculatedAntidotes: calculatedAntidotes,
      universalFirstAid: toxin.universalFirstAid,
      strictlyContraindicated: toxin.strictlyContraindicated
    };
  };

  /**
   * RAPID EMERGENCY SIGN-TO-POISON MATCHER:
   * Matches urgent clinical queries to identify suspect toxin in under 1 second.
   *
   * @param {string} signQuery - Search phrase (e.g., 'chocolate blood', 'cherry red', 'SLUD', 'ammonia')
   * @param {string} species - Optional species filter
   */
  ToxicologyEngine.diagnoseByEmergencySigns = function (signQuery, species) {
    if (!signQuery || typeof signQuery !== "string") return [];
    const q = signQuery.trim().toLowerCase();
    const sp = species ? species.trim().toLowerCase() : null;
    const matches = [];

    const registry = ToxicologyEngine.registry;

    for (let i = 0; i < registry.length; i++) {
      const tox = registry[i];

      // Species compatibility check
      if (sp && Array.isArray(tox.targetSpecies) && tox.targetSpecies.indexOf(sp) === -1) {
        continue;
      }

      let matched = false;
      let matchHighlight = "";

      // Check pathognomonic indicator
      if (tox.pathognomonicIndicator && tox.pathognomonicIndicator.toLowerCase().indexOf(q) !== -1) {
        matched = true;
        matchHighlight = "PATHOGNOMONIC MATCH: " + tox.pathognomonicIndicator;
      }

      // Check cardinal signs
      if (!matched && Array.isArray(tox.cardinalSigns)) {
        for (let j = 0; j < tox.cardinalSigns.length; j++) {
          if (tox.cardinalSigns[j].toLowerCase().indexOf(q) !== -1) {
            matched = true;
            matchHighlight = "CARDINAL SIGN: " + tox.cardinalSigns[j];
            break;
          }
        }
      }

      // Check common sources
      if (!matched && Array.isArray(tox.commonSources)) {
        for (let k = 0; k < tox.commonSources.length; k++) {
          if (tox.commonSources[k].toLowerCase().indexOf(q) !== -1) {
            matched = true;
            matchHighlight = "SOURCE IDENTIFIED: " + tox.commonSources[k];
            break;
          }
        }
      }

      // Check names
      if (!matched && (tox.nameEn.toLowerCase().indexOf(q) !== -1 || tox.nameHi.indexOf(q) !== -1)) {
        matched = true;
        matchHighlight = "NAME MATCH: " + tox.nameEn;
      }

      if (matched) {
        matches.push({
          toxinId: tox.id,
          nameEn: tox.nameEn,
          nameHi: tox.nameHi,
          matchHighlight: matchHighlight,
          pathognomonicIndicator: tox.pathognomonicIndicator,
          primaryAntidote: tox.antidotes[0] ? tox.antidotes[0].drugName : "Supportive care",
          urgency: "CRITICAL EMERGENCY"
        });
      }
    }

    return matches;
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.Toxicology = ToxicologyEngine;

})();
