// Vetcare AI OS - Veterinary Drug-Drug Interactions, Synergisms, Lethal Combinations & Contraindications Database (2026 Production)

(function (global) {
  "use strict";

  // 1. GLOBAL NAMESPACE REGISTRATION
  global.VetcareApp = global.VetcareApp || {};
  global.VetcareApp.ClinicalData = global.VetcareApp.ClinicalData || {};

  const DrugInteractions = {};

  // 2. PHARMACOLOGICAL SEVERITY TAXONOMY
  DrugInteractions.SEVERITY_LEVELS = Object.freeze({
    FATAL_CONTRAINDICATION: {
      code: "FATAL_CONTRAINDICATION",
      label: "घातक निषेध (Fatal Contraindication)",
      level: 4,
      badgeColor: "#dc2626",
      action: "BLOCK_PRESCRIPTION",
      description: "Severe life-threatening toxicity, irreversible organ destruction, or acute mortality. Absolute clinical prohibition."
    },
    MAJOR_ADVERSE: {
      code: "MAJOR_ADVERSE",
      label: "गंभीर प्रतिकूल प्रभाव (Major Adverse)",
      level: 3,
      badgeColor: "#ea580c",
      action: "REQUIRE_OVERRIDE_AND_MONITORING",
      description: "Substantial physiological impairment, severe toxicity, or blunted efficacy. Requires alternative drug selection or intense clinical monitoring."
    },
    MODERATE_CAUTION: {
      code: "MODERATE_CAUTION",
      label: "मध्यम सावधानी (Moderate Caution)",
      level: 2,
      badgeColor: "#d97706",
      action: "ADJUST_DOSE_OR_TIMING",
      description: "Pharmacokinetic interference, altered clearance, or additive mild-to-moderate side effects. Dose spacing or dose titration indicated."
    },
    BENEFICIAL_SYNERGY: {
      code: "BENEFICIAL_SYNERGY",
      label: "सकारात्मक सहक्रिया (Beneficial Synergy)",
      level: 1,
      badgeColor: "#16a34a",
      action: "CLINICALLY_RECOMMENDED",
      description: "Pharmacodynamically or pharmacokinetically validated therapeutic enhancement, antimicrobial synergy, or multimodal dose-sparing."
    }
  });

  // 3. SYNONYM AND ALIAS DICTIONARY (Active Moieties & Commercial Brands)
  const ALIAS_MAP = {
    // NSAIDs
    "meloxicam": "meloxicam",
    "melox": "meloxicam",
    "melobest": "meloxicam",
    "flunixin": "flunixin",
    "flunixin meglumine": "flunixin",
    "megludyne": "flunixin",
    "carprofen": "carprofen",
    "rimadyl": "carprofen",
    "firocoxib": "firocoxib",
    "previcox": "firocoxib",
    "aspirin": "aspirin",
    "acetylsalicylic acid": "aspirin",
    "ketoprofen": "ketoprofen",
    "tolfenamic acid": "tolfenamic_acid",
    "phenylbutazone": "phenylbutazone",
    "bute": "phenylbutazone",

    // Corticosteroids
    "dexamethasone": "dexamethasone",
    "dexa": "dexamethasone",
    "dexona": "dexamethasone",
    "prednisolone": "prednisolone",
    "pred": "prednisolone",
    "isoflupredone": "isoflupredone",
    "isoflupredone acetate": "isoflupredone",
    "betamethasone": "betamethasone",
    "triamcinolone": "triamcinolone",

    // Antimicrobials
    "enrofloxacin": "enrofloxacin",
    "baytril": "enrofloxacin",
    "theophylline": "theophylline",
    "gentamicin": "gentamicin",
    "gentamycin": "gentamicin",
    "amikacin": "amikacin",
    "metronidazole": "metronidazole",
    "flagyl": "metronidazole",
    "cimetidine": "cimetidine",
    "clindamycin": "clindamycin",
    "erythromycin": "erythromycin",
    "ceftiofur": "ceftiofur",
    "ceftiofur sodium": "ceftiofur",
    "ceftiofur hcl": "ceftiofur",
    "oxytetracycline": "oxytetracycline",
    "terramycin": "oxytetracycline",
    "doxycycline": "doxycycline",
    "chlortetracycline": "oxytetracycline",
    "penicillin": "penicillin_g_potassium",
    "potassium penicillin": "penicillin_g_potassium",
    "penicillin g potassium": "penicillin_g_potassium",
    "procaine penicillin": "procaine_penicillin",
    "procaine penicillin g": "procaine_penicillin",
    "ampicillin": "ampicillin",
    "amoxicillin": "amoxicillin",
    "amoxicillin clavulanate": "amoxicillin_clavulanate",
    "clavulanate": "amoxicillin_clavulanate",
    "marbofloxacin": "marbofloxacin",
    "ciprofloxacin": "ciprofloxacin",
    "chloramphenicol": "chloramphenicol",
    "florfenicol": "florfenicol",
    "tylosin": "tylosin",
    "tilmicosin": "tilmicosin",
    "lincomycin": "lincomycin",
    "trimethoprim": "trimethoprim",
    "sulfadiazine": "sulfadiazine",
    "sulfamethoxazole": "sulfamethoxazole",
    "cotrimoxazole": "trimethoprim_sulfonamide",
    "cefazolin": "cefazolin",
    "ceftriaxone": "ceftriaxone",

    // Antiparasitics
    "ivermectin": "ivermectin",
    "spinosad": "spinosad",
    "comfortis": "spinosad",
    "trifexis": "spinosad",
    "levamisole": "levamisole",
    "organophosphates": "organophosphates",
    "chlorpyrifos": "organophosphates",
    "malathion": "organophosphates",
    "trichlorfon": "organophosphates",
    "amitraz": "amitraz",
    "milbemycin": "milbemycin",
    "selamectin": "selamectin",
    "doramectin": "doramectin",
    "moxidectin": "moxidectin",
    "permethrin": "permethrin",

    // Cardiovascular, Diuretics & Autonomic
    "furosemide": "furosemide",
    "lasix": "furosemide",
    "digoxin": "digoxin",
    "spironolactone": "spironolactone",
    "enalapril": "enalapril",
    "benazepril": "benazepril",
    "epinephrine": "epinephrine",
    "adrenaline": "epinephrine",
    "atropine": "atropine",
    "atropine sulfate": "atropine",
    "sildenafil": "sildenafil",
    "nitroglycerin": "nitroglycerin",
    "clopidogrel": "clopidogrel",
    "plavix": "clopidogrel",
    "pimobendan": "pimobendan",
    "vetmedin": "pimobendan",

    // Sedatives, Anesthetics & Analgesics
    "xylazine": "xylazine",
    "dexmedetomidine": "dexmedetomidine",
    "acepromazine": "acepromazine",
    "tramadol": "tramadol",
    "fluoxetine": "fluoxetine",
    "prozac": "fluoxetine",
    "ketamine": "ketamine",
    "propofol": "propofol",
    "midazolam": "midazolam",
    "diazepam": "diazepam",
    "isoflurane": "isoflurane",
    "sevoflurane": "sevoflurane",
    "morphine": "morphine",
    "fentanyl": "fentanyl",
    "naloxone": "naloxone",
    "phenobarbital": "phenobarbital",

    // Gastrointestinal & Supportive
    "sucralfate": "sucralfate",
    "metoclopramide": "metoclopramide",
    "cisapride": "cisapride",
    "ketoconazole": "ketoconazole",
    "itraconazole": "itraconazole",
    "calcium borogluconate": "calcium_borogluconate",
    "calcium": "calcium_borogluconate"
  };

  function normalizeDrugName(rawName) {
    if (!rawName || typeof rawName !== "string") return "";
    const clean = rawName.trim().toLowerCase().replace(/[\-_]/g, " ").replace(/\s+/g, " ");
    return ALIAS_MAP[clean] || clean.replace(/\s+/g, "_");
  }

  function normalizeSpecies(rawSpecies) {
    if (!rawSpecies || typeof rawSpecies !== "string") return "unknown";
    const s = rawSpecies.trim().toLowerCase();
    if (s.includes("cat") || s.includes("feline") || s.includes("billi")) return "feline";
    if (s.includes("dog") || s.includes("canine") || s.includes("kutta")) return "canine";
    if (s.includes("horse") || s.includes("equine") || s.includes("ghoda") || s.includes("mare")) return "equine";
    if (s.includes("cow") || s.includes("bovine") || s.includes("cattle") || s.includes("gaay") || s.includes("buffalo") || s.includes("bhains")) return "bovine";
    if (s.includes("goat") || s.includes("caprine") || s.includes("bakri")) return "caprine";
    if (s.includes("sheep") || s.includes("ovine") || s.includes("bhed")) return "ovine";
    return s;
  }

  // 4. COMPREHENSIVE PAIRWISE INTERACTION MATRIX (35+ Definitive Pairings)
  DrugInteractions.MATRIX = [
    // 1. NSAIDs + Corticosteroids
    {
      id: "INT-NSAID-STEROID-01",
      pair: ["meloxicam", "dexamethasone"],
      aliasesA: ["meloxicam", "flunixin", "carprofen", "firocoxib", "ketoprofen", "tolfenamic_acid"],
      aliasesB: ["dexamethasone", "prednisolone", "isoflupredone", "betamethasone", "triamcinolone"],
      severity: "FATAL_CONTRAINDICATION",
      clinicalTitle: "NSAID + Corticosteroid Dual Cyclooxygenase/Phospholipase Blockade",
      mechanism: "Dual inhibition of arachidonic acid cascade via Phospholipase A2 (corticosteroids) and Cyclooxygenase COX-1/COX-2 (NSAIDs) catastrophic mucosal ischemia, complete depletion of gastric cytoprotective prostaglandins (PGE2, PGI2), and renal papillary hypoperfusion.",
      clinicalConsequence: "Severe gastrointestinal ulceration, massive intestinal perforation, septic peritonitis, acute renal papillary necrosis, refractory hemorrhagic enteritis, and death.",
      management: "STRICTLY PROHIBITED. Enforce minimum mandatory 7-day washout period between oral/parenteral NSAIDs and long-acting corticosteroids (e.g., Dexamethasone). If switching is mandatory, utilize gastroprotectants (Omeprazole, Sucralfate).",
      evidence: "Plumb's Veterinary Drug Handbook 10th Ed.; FDA-CVM Safety Advisory on NSAID-Corticosteroid Co-administration."
    },

    // 2. Enrofloxacin + Theophylline
    {
      id: "INT-ENRO-THEO-02",
      pair: ["enrofloxacin", "theophylline"],
      aliasesA: ["enrofloxacin", "ciprofloxacin", "marbofloxacin"],
      aliasesB: ["theophylline"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Fluoroquinolone-Mediated Hepatic CYP1A2 Inhibition",
      mechanism: "Fluoroquinolones (specifically enrofloxacin and its active metabolite ciprofloxacin) potently inhibit hepatic Cytochrome P450 1A2 (CYP1A2), blunting the N-demethylation clearance of theophylline by 30% to 50%.",
      clinicalConsequence: "Toxic accumulation of theophylline leading to severe sinus tachycardia, supraventricular arrhythmias, CNS hyperexcitability, refractory seizures, vomiting, and cardiovascular collapse.",
      management: "Avoid concurrent use. If concurrent administration is imperative, reduce theophylline dosage by 30-50% and continuously monitor cardiac telemetry and serum methylxanthine concentrations.",
      evidence: "Journal of Veterinary Pharmacology and Therapeutics; British Small Animal Veterinary Association (BSAVA) Formulary."
    },

    // 3. Aminoglycosides + Furosemide
    {
      id: "INT-AMINO-FURO-03",
      pair: ["gentamicin", "furosemide"],
      aliasesA: ["gentamicin", "amikacin"],
      aliasesB: ["furosemide"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Synergistic Acute Proximal Tubular Necrosis and Ototoxicity",
      mechanism: "Loop diuretics impair renal cortical perfusion, reduce glomerular filtration, and elevate aminoglycoside endolymph and perilymph concentrations in the cochlea. Concurrently, aminoglycoside proximal tubular uptake is enhanced.",
      clinicalConsequence: "Rapid acute kidney injury (AKI) characterized by granular casts, oliguria/anuria, severe azotemia, permanent cochlear hair cell apoptosis, and vestibular deafness.",
      management: "Avoid combination. Ensure patient is euvolemic. If diuresis is required in septic patients receiving aminoglycosides, prefer alternative antimicrobial classes or monitor peak/trough drug levels and urinary GGT/creatinine ratios.",
      evidence: "Veterinary Clinics of North America: Small Animal Practice - Nephrology & Toxicology."
    },

    // 4. Organophosphates + Levamisole
    {
      id: "INT-OP-LEVA-04",
      pair: ["organophosphates", "levamisole"],
      aliasesA: ["organophosphates"],
      aliasesB: ["levamisole"],
      severity: "FATAL_CONTRAINDICATION",
      clinicalTitle: "Lethal Additive Nicotinic Hyperstimulation & Cholinergic Crisis",
      mechanism: "Levamisole acts as an agonist at ganglionic nicotinic acetylcholine receptors, while organophosphates irreversibly phosphorylate and inhibit acetylcholinesterase (AChE). The combination triggers catastrophic, uncontrolled synaptic acetylcholine accumulation.",
      clinicalConsequence: "Massive muscarinic and nicotinic hyperstimulation (SLUDGE syndrome: Salivation, Lacrimation, Urination, Defecation, GI cramping, Emesis), severe muscle fasciculations, tetanic diaphragm spasms, bronchoconstriction, pulmonary edema, and asphyxiation.",
      management: "ABSOLUTELY CONTRAINDICATED. Never administer levamisole within 14 days of organophosphate dip, pour-on, or oral anthelmintic exposure. Emergency antidote: Atropine sulfate IV/IM along with Pralidoxime (2-PAM).",
      evidence: "Merck Veterinary Manual - Toxicology of Parasiticides; World Organisation for Animal Health (WOAH)."
    },

    // 5. Metronidazole + Cimetidine
    {
      id: "INT-METRO-CIMET-05",
      pair: ["metronidazole", "cimetidine"],
      aliasesA: ["metronidazole"],
      aliasesB: ["cimetidine"],
      severity: "MODERATE_CAUTION",
      clinicalTitle: "Microsomal Hepatic CYP Inhibition Delaying Metronidazole Clearance",
      mechanism: "Cimetidine is an inhibitor of hepatic microsomal mixed-function oxidases (CYP450), significantly prolonging the elimination half-life of metronidazole and impairing its hepatic glucuronidation.",
      clinicalConsequence: "Plasma accumulation of metronidazole, triggering severe central vestibular neurotoxicity, vertical nystagmus, ataxia, head tilt, generalized tremors, and hepatotoxicity.",
      management: "Replace cimetidine with famotidine or omeprazole, which do not inhibit hepatic CYP450 pathways. If combined, reduce metronidazole dose by 25% and monitor for signs of vestibular ataxia.",
      evidence: "Compendium of Continuing Education for the Practicing Veterinarian."
    },

    // 6. Clindamycin + Erythromycin
    {
      id: "INT-CLIND-ERYTHRO-06",
      pair: ["clindamycin", "erythromycin"],
      aliasesA: ["clindamycin", "lincomycin"],
      aliasesB: ["erythromycin", "tylosin"],
      severity: "MODERATE_CAUTION",
      clinicalTitle: "Competitive Antagonism at 50S Ribosomal Peptidyl Transferase Center",
      mechanism: "Lincosamides (clindamycin) and macrolides (erythromycin) share overlapping, mutually exclusive binding domains on the 23S rRNA of the 50S bacterial ribosomal subunit, competitively displacing each other.",
      clinicalConsequence: "Complete therapeutic antagonism with failure of clinical cure, persistence of bacterial infection, and accelerated emergence of macrolide-lincosamide-streptogramin B (MLSB) cross-resistance.",
      management: "DO NOT PRESCRIBE CONCURRENTLY. Select either a lincosamide or a macrolide based on culture and minimum inhibitory concentration (MIC) testing.",
      evidence: "Antimicrobial Therapy in Veterinary Medicine (Prescott et al.)."
    },

    // 7. Xylazine + Epinephrine
    {
      id: "INT-XYLA-EPI-07",
      pair: ["xylazine", "epinephrine"],
      aliasesA: ["xylazine", "dexmedetomidine"],
      aliasesB: ["epinephrine"],
      severity: "FATAL_CONTRAINDICATION",
      clinicalTitle: "Alpha-2 Myocardial Sensitization to Sympathomimetic Dysrhythmias",
      mechanism: "Alpha-2 adrenergic agonists induce intense peripheral vasoconstriction, severe baroreceptor-mediated bradycardia, and heighten myocardial sensitivity to catecholamines. Concomitant epinephrine stimulates beta-1 adrenergic receptors during high afterload.",
      clinicalConsequence: "Immediate lethal ventricular arrhythmias, ventricular fibrillation, acute left ventricular failure, and fulminant pulmonary edema.",
      management: "STRICTLY FORBIDDEN. Never administer epinephrine to manage hypotension or cardiovascular collapse induced by alpha-2 agonists. Use specific alpha-2 antagonists (Atipamezole or Yohimbine) and supportive oxygenation.",
      evidence: "Lumb and Jones' Veterinary Anesthesia and Analgesia 5th Ed."
    },

    // 8. Ivermectin + Spinosad
    {
      id: "INT-IVER-SPINO-08",
      pair: ["ivermectin", "spinosad"],
      aliasesA: ["ivermectin"],
      aliasesB: ["spinosad"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Spinosad P-Glycoprotein (ABCB1) Efflux Blockade & Central Neurotoxicity",
      mechanism: "Spinosad is a potent competitive inhibitor of the ATP-binding cassette transporter P-glycoprotein (ABCB1/MDR1). This eliminates the active blood-brain barrier efflux mechanism protecting the central nervous system from macrocyclic lactones.",
      clinicalConsequence: "Profound central accumulation of ivermectin leading to GABA-gated chloride channel opening, manifesting as severe generalized ataxia, mydriasis, blindness, drooling, tremors, coma, and death (even in non-MDR1 mutant canines).",
      management: "CONTRAINDICATED. Never co-prescribe spinosad with high off-label doses of ivermectin (demodicosis/scabies protocols). Standard low heartworm preventative doses (6 mcg/kg) carry lower risk, but caution is warranted.",
      evidence: "FDA-CVM Safety Alert: Concomitant Use of Comfortis (spinosad) and Ivermectin."
    },

    // 9. Furosemide + Digoxin
    {
      id: "INT-FURO-DIGO-09",
      pair: ["furosemide", "digoxin"],
      aliasesA: ["furosemide"],
      aliasesB: ["digoxin"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Hypokalemia-Induced Sensitization to Lethal Digitalis Toxicity",
      mechanism: "Furosemide blocks Na+/K+/2Cl- symporters in the thick ascending loop of Henle, provoking renal wasting of potassium and magnesium. Hypokalemia increases digoxin affinity to the myocardial Na+/K+-ATPase pump.",
      clinicalConsequence: "Profound digitalis toxicity, manifested as ventricular bigeminy, paroxysmal ventricular tachycardia, complete atrioventricular heart block, severe emesis, and cardiac arrest.",
      management: "Strictly monitor serum potassium. Administer potassium supplements or combine with potassium-sparing diuretics (spironolactone) if hypokalemia develops (serum K+ < 4.0 mEq/L). Regular ECG monitoring mandatory.",
      evidence: "Textbook of Veterinary Internal Medicine (Ettinger & Feldman)."
    },

    // 10. Ceftiofur + Oxytetracycline
    {
      id: "INT-CEFT-TETRA-10",
      pair: ["ceftiofur", "oxytetracycline"],
      aliasesA: ["ceftiofur", "ampicillin", "amoxicillin", "cefazolin"],
      aliasesB: ["oxytetracycline", "doxycycline"],
      severity: "MODERATE_CAUTION",
      clinicalTitle: "Bacteriostatic Blunting of Beta-Lactam Bactericidal Lysis",
      mechanism: "Beta-lactams (cephalosporins/penicillins) require active bacterial peptidoglycan synthesis and autolytic enzyme activation during cellular division to induce bacterial cell lysis. Bacteriostatic tetracyclines inhibit 30S protein synthesis, halting bacterial growth.",
      clinicalConsequence: "Antagonism of the rapid bactericidal action of beta-lactams, leading to delayed pathogen clearance and clinical failure in acute, hyperacute bacterial infections (e.g., Mannheimia haemolytica pneumonia).",
      management: "Avoid simultaneous administration in acute septic or bronchopneumonic crises. If broad-spectrum coverage is essential, utilize validated bactericidal pairings (e.g., Ceftiofur + Aminoglycosides/Fluoroquinolones).",
      evidence: "Veterinary Pharmacology and Therapeutics (Riviere & Papich)."
    },

    // 11. Tramadol + Fluoxetine
    {
      id: "INT-TRAM-FLUO-11",
      pair: ["tramadol", "fluoxetine"],
      aliasesA: ["tramadol"],
      aliasesB: ["fluoxetine"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Central Serotonergic Hyperstimulation & Serotonin Syndrome",
      mechanism: "Tramadol acts as a central mu-opioid agonist and inhibits the reuptake of both serotonin (5-HT) and norepinephrine. Fluoxetine is a selective serotonin reuptake inhibitor (SSRI) and inhibits CYP2D15-mediated tramadol metabolism.",
      clinicalConsequence: "Precipitation of severe Serotonin Syndrome: hyperthermia, severe muscle rigidity, autonomic instability, mydriasis, vocalization, hyperreflexia, seizures, and cardiovascular collapse.",
      management: "CONTRAINDICATED. Discontinue SSRIs or tricyclic antidepressants at least 14 days prior to initiating tramadol therapy. Utilize alternative analgesics (Gabapentin, Amantadine, Opioid pure mu-agonists).",
      evidence: "Journal of Veterinary Emergency and Critical Care; Veterinary Anaesthesia and Analgesia."
    },

    // 12. Potassium Penicillin + Spironolactone
    {
      id: "INT-KPEN-SPIRO-12",
      pair: ["penicillin_g_potassium", "spironolactone"],
      aliasesA: ["penicillin_g_potassium"],
      aliasesB: ["spironolactone"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Severe Hyperkalemic Cardiac Toxicity",
      mechanism: "Potassium Penicillin G contains approximately 1.7 mEq of potassium per 1 million units. Spironolactone competitively blocks mineralocorticoid receptors in distal tubules, halting aldosterone-mediated potassium excretion.",
      clinicalConsequence: "Severe acute hyperkalemia (> 7.5 mEq/L) causing tented T waves, loss of P waves, widening QRS complexes, sine waves, severe ventricular arrhythmias, and diastolic cardiac arrest.",
      management: "Avoid potassium penicillin formulations in patients on spironolactone or with oliguric renal compromise. Substitute with Sodium Penicillin G or ampicillin sodium. Monitor serum electrolytes frequently.",
      evidence: "Small Animal Critical Care Medicine (Silverstein & Hopper)."
    },

    // 13. Acepromazine + Epinephrine
    {
      id: "INT-ACE-EPI-13",
      pair: ["acepromazine", "epinephrine"],
      aliasesA: ["acepromazine"],
      aliasesB: ["epinephrine"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Epinephrine Reversal Phenomenon (Catastrophic Vasodilation)",
      mechanism: "Acepromazine acts as a competitive antagonist at vascular alpha-1 adrenergic receptors. Exogenous epinephrine administered subsequently binds preferentially to unblocked vascular beta-2 adrenergic receptors.",
      clinicalConsequence: "Instead of expected pressor response, profound systemic vasodilation occurs ('Epinephrine Reversal'), precipitating precipitous arterial hypotension, severe circulatory collapse, and arrest.",
      management: "NEVER use epinephrine to correct acepromazine-induced hypotension. Administer pure alpha-1 adrenergic agonists (Phenylephrine) or Norepinephrine along with crystalloid/colloid volume loading.",
      evidence: "Handbook of Veterinary Pain Management (Gaynor & Muir)."
    },

    // 14. Oxytetracycline + Calcium
    {
      id: "INT-OXY-CALC-14",
      pair: ["oxytetracycline", "calcium_borogluconate"],
      aliasesA: ["oxytetracycline", "doxycycline"],
      aliasesB: ["calcium_borogluconate"],
      severity: "MODERATE_CAUTION",
      clinicalTitle: "Polyvalent Cation Insoluble Chelation & Vascular Precipitation",
      mechanism: "Tetracyclines possess electron-rich keto-enol configurations that form insoluble, non-absorbable chelate complexes with polyvalent cations (Ca2+, Mg2+, Fe3+, Al3+). In vitro/IV admixture forms micro-crystalline precipitates.",
      clinicalConsequence: "Complete ablation of oral tetracycline bioavailability. In intravenous co-administration, risk of micro-embolization, severe thrombophlebitis, and acute precipitation in pulmonary capillaries.",
      management: "Do not infuse oxytetracycline in IV lines or solutions containing calcium (e.g., Calcium Borogluconate, Ringer's Lactate). Space oral administration by at least 2 hours from mineral supplements or dairy.",
      evidence: "Veterinary Drug Handbook - Clinical Interactions Section."
    },

    // 15. Tilmicosin + Intravenous Route (Cardiotoxicity)
    {
      id: "INT-TILM-IV-15",
      pair: ["tilmicosin", "calcium_borogluconate"],
      aliasesA: ["tilmicosin"],
      aliasesB: ["calcium_borogluconate", "epinephrine"],
      severity: "FATAL_CONTRAINDICATION",
      clinicalTitle: "Acute Myocardial Intracellular Calcium Depletion & Cardiac Arrest",
      mechanism: "Tilmicosin causes potent, irreversible inhibition of L-type voltage-gated calcium channels in cardiac myocytes, inducing severe negative inotropism, sinus bradycardia, and electromechanical dissociation.",
      clinicalConsequence: "Immediate lethal cardiogenic shock, ventricular fibrillation, and sudden death within seconds to minutes in cattle, sheep, goats, horses, and swine. Subcutaneous injection is the ONLY permitted route in labeled species.",
      management: "ABSOLUTELY CONTRAINDICATED VIA INTRAVENOUS ROUTE IN ALL SPECIES. Strictly forbidden in horses and pigs. In accidental exposure, IV calcium chloride or calcium borogluconate may compete, but prognosis is grave.",
      evidence: "FDA-CVM Warning Letter; Journal of Veterinary Pharmacology and Therapeutics (Cardiovascular Toxicity of Tilmicosin)."
    },

    // 16. Amitraz + Alpha-2 Agonists
    {
      id: "INT-AMIT-XYLA-16",
      pair: ["amitraz", "xylazine"],
      aliasesA: ["amitraz"],
      aliasesB: ["xylazine", "dexmedetomidine"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Cumulative Central Alpha-2 Agonism & MAO Inhibition",
      mechanism: "Amitraz is an octopaminergic insecticide that exerts potent alpha-2 adrenergic receptor agonist actions and inhibits monoamine oxidase (MAO). Co-administration with xylazine produces severe additive central depression.",
      clinicalConsequence: "Profound, life-threatening bradycardia, cardiac arrhythmias, hypothermia, deep central coma, and complete ruminal/intestinal impaction/ileus.",
      management: "Avoid concurrent use of amitraz dips/collars with alpha-2 sedative pre-medications. If toxicity occurs, administer Atipamezole (0.1-0.2 mg/kg IM) as a specific competitive antagonist.",
      evidence: "Veterinary and Human Toxicology; Small Animal Clinical Pharmacology."
    },

    // 17. Multi-NSAID Therapy (Carprofen + Aspirin)
    {
      id: "INT-NSAID-NSAID-17",
      pair: ["carprofen", "aspirin"],
      aliasesA: ["carprofen", "meloxicam", "firocoxib", "flunixin", "ketoprofen"],
      aliasesB: ["aspirin", "phenylbutazone", "tolfenamic_acid"],
      severity: "FATAL_CONTRAINDICATION",
      clinicalTitle: "Multi-NSAID Cumulative Mucosal & Renal Toxicity",
      mechanism: "Simultaneous administration of two or more non-steroidal anti-inflammatory drugs results in severe cumulative inhibition of constitutional Cyclooxygenase (COX-1/COX-2), eliminating all mucosal protection.",
      clinicalConsequence: "Massive gastroduodenal mucosal erosion, bleeding ulcers, intestinal perforation, septic peritonitis, acute renal papillary necrosis, and death.",
      management: "STRICTLY PROHIBITED. Never prescribe two NSAIDs concurrently. Implement a minimum 5-to-7 day washout period (14 days for Aspirin due to irreversible platelet COX acetylation) before switching NSAIDs.",
      evidence: "WSAVA Global Pain Management Guidelines; American College of Veterinary Internal Medicine (ACVIM) Consensus Statement."
    },

    // 18. Chloramphenicol + Phenobarbital
    {
      id: "INT-CHLOR-PHEN-18",
      pair: ["chloramphenicol", "phenobarbital"],
      aliasesA: ["chloramphenicol"],
      aliasesB: ["phenobarbital"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Hepatic CYP450 Inhibition Inducing Phenobarbital Overdose",
      mechanism: "Chloramphenicol is a suicide inhibitor of hepatic microsomal Cytochrome P450 enzymes (CYP2C and CYP3A families), halting the oxidative metabolism and clearance of phenobarbital.",
      clinicalConsequence: "Dramatic spike in plasma phenobarbital concentrations, inducing profound sedation, ataxia, comatose state, hypothermia, and life-threatening respiratory depression.",
      management: "Avoid concurrent administration. If chloramphenicol is required, monitor serum phenobarbital levels closely and reduce phenobarbital dosage by 30-50%.",
      evidence: "Plumb's Veterinary Drug Handbook; Clinical Veterinary Toxicology."
    },

    // 19. Atropine + Xylazine / Dexmedetomidine
    {
      id: "INT-ATRO-XYLA-19",
      pair: ["atropine", "xylazine"],
      aliasesA: ["atropine"],
      aliasesB: ["xylazine", "dexmedetomidine"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Hypertensive Crisis & Myocardial Overdrive Arrhythmias",
      mechanism: "Alpha-2 agonists cause pronounced peripheral vasoconstriction and high systemic vascular resistance. Parasympatholytics (Atropine) abolish the physiological compensatory reflex bradycardia.",
      clinicalConsequence: "Catastrophic systemic hypertension, massive myocardial oxygen consumption, acute pulmonary edema, and development of life-threatening ventricular tachyarrhythmias.",
      management: "CONTRAINDICATED as routine pre-medication. Do not treat alpha-2 agonist-induced bradycardia with atropine unless accompanied by severe hypotension or AV block. Reverse with Atipamezole instead.",
      evidence: "Veterinary Anesthesia and Analgesia (The 5th Edition of Lumb and Jones)."
    },

    // 20. Sucralfate + Fluoroquinolones
    {
      id: "INT-SUCR-ENRO-20",
      pair: ["sucralfate", "enrofloxacin"],
      aliasesA: ["sucralfate"],
      aliasesB: ["enrofloxacin", "ciprofloxacin", "marbofloxacin"],
      severity: "MODERATE_CAUTION",
      clinicalTitle: "Aluminum Complexation Impairing Fluoroquinolone Bioavailability",
      mechanism: "Sucralfate contains an octasulfate of sucrose complexed with aluminum hydroxide. In the acidic gastric lumen, aluminum dissociates and chelates the 3-carboxyl and 4-oxo groups of fluoroquinolones.",
      clinicalConsequence: "Drastic reduction in fluoroquinolone gastrointestinal absorption (bioavailability decreased by > 60-80%), resulting in sub-therapeutic serum levels and therapeutic failure.",
      management: "Space administration times: Administer fluoroquinolone at least 2 hours before, or 4 hours after, sucralfate administration.",
      evidence: "Journal of the American Veterinary Medical Association (JAVMA)."
    },

    // 21. Trimethoprim-Sulfa + Thiazide Diuretics
    {
      id: "INT-TMS-THIA-21",
      pair: ["trimethoprim_sulfonamide", "furosemide"],
      aliasesA: ["trimethoprim_sulfonamide", "sulfadiazine", "sulfamethoxazole"],
      aliasesB: ["furosemide"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Severe Bone Marrow Suppression & Thrombocytopenic Purpura",
      mechanism: "Concurrent sulfonamide and diuretic therapy predisposes elderly or compromised patients to hypersensitivity reactions and immune-mediated thrombocyte destruction.",
      clinicalConsequence: "Severe acute thrombocytopenia, petechiae, ecchymoses, life-threatening mucosal bleeding, and aplastic anemia.",
      management: "Monitor complete blood counts (CBC) with platelet differentials weekly. Discontinue immediately upon the appearance of skin purpura or thrombocytopenia.",
      evidence: "Blackwell's Five-Minute Veterinary Consult: Canine and Feline."
    },

    // 22. Phenobarbital + Corticosteroids
    {
      id: "INT-PHEN-STEROID-22",
      pair: ["phenobarbital", "dexamethasone"],
      aliasesA: ["phenobarbital"],
      aliasesB: ["dexamethasone", "prednisolone", "isoflupredone"],
      severity: "MODERATE_CAUTION",
      clinicalTitle: "Enzymatic Induction Accelerating Corticosteroid Catabolism",
      mechanism: "Chronic phenobarbital therapy induces hepatic microsomal CYP3A enzymes, significantly accelerating the oxidative metabolism and clearance of exogenous corticosteroids.",
      clinicalConsequence: "Sub-therapeutic corticosteroid levels, diminished anti-inflammatory or immunosuppressive efficacy, and potential relapse of immune-mediated conditions.",
      management: "Corticosteroid dosage may need to be increased by 20-50% in patients stabilized on long-term phenobarbital. Monitor clinical response diligently.",
      evidence: "Applied Clinical Pharmacokinetics in Small Animals."
    },

    // 23. Sildenafil + Nitrates
    {
      id: "INT-SILD-NITRO-23",
      pair: ["sildenafil", "nitroglycerin"],
      aliasesA: ["sildenafil"],
      aliasesB: ["nitroglycerin"],
      severity: "FATAL_CONTRAINDICATION",
      clinicalTitle: "Excessive cGMP Accumulation & Irreversible Vascular Collapse",
      mechanism: "Nitroglycerin generates nitric oxide (NO) which stimulates guanylyl cyclase to synthesize cGMP. Sildenafil selectively inhibits Phosphodiesterase Type 5 (PDE5), preventing cGMP degradation.",
      clinicalConsequence: "Catastrophic, uncontrollable systemic vasodilation, precipitous systemic arterial hypotension, hypoperfusion of vital coronary and cerebral beds, and fatal shock.",
      management: "ABSOLUTELY CONTRAINDICATED. Never administer organic nitrates (Nitroglycerin, Nitroprusside, Isosorbide) to patients receiving sildenafil therapy.",
      evidence: "ACVIM Consensus Statement on Pulmonary Hypertension in Dogs."
    },

    // 24. Propofol + Benzodiazepines (Synergy)
    {
      id: "INT-PROP-BENZO-24",
      pair: ["propofol", "midazolam"],
      aliasesA: ["propofol"],
      aliasesB: ["midazolam", "diazepam"],
      severity: "BENEFICIAL_SYNERGY",
      clinicalTitle: "Synergistic GABA-A Receptor Allosteric Modulation (Dose-Sparing)",
      mechanism: "Both agents act synergistically at GABA-A receptor complexes in the central nervous system, enhancing inhibitory chloride conductance through distinct allosteric binding sites.",
      clinicalConsequence: "Produces a smooth, rapid anesthetic induction with a 30% to 50% reduction in required propofol dose, minimizing propofol-mediated dose-dependent hypotension and post-induction apnea.",
      management: "HIGHLY RECOMMENDED. Administer benzodiazepine as co-induction agent immediately prior to or titrated with propofol.",
      evidence: "Veterinary Anaesthesia and Analgesia; Lumb and Jones."
    },

    // 25. Ampicillin + Gentamicin (Bactericidal Synergy)
    {
      id: "INT-AMPI-GENT-25",
      pair: ["ampicillin", "gentamicin"],
      aliasesA: ["ampicillin", "amoxicillin"],
      aliasesB: ["gentamicin", "amikacin"],
      severity: "BENEFICIAL_SYNERGY",
      clinicalTitle: "Bactericidal Peptidoglycan Cell Wall Disruption & Ribosomal Penetration",
      mechanism: "Beta-lactams inhibit bacterial cell-wall transpeptidation, facilitating enhanced intracellular transport and penetration of aminoglycosides to bind 30S ribosomal subunits.",
      clinicalConsequence: "Rapid, broad-spectrum bactericidal eradication of refractory Enterococcus, Streptococcus, and Gram-negative pathogens.",
      management: "THERAPEUTICALLY RECOMMENDED for systemic sepsis and bacterial endocarditis. IMPORTANT: Do not mix physically in the same syringe or IV bag (inactivation via chemical complexation occurs).",
      evidence: "Antimicrobial Therapy in Veterinary Medicine (Prescott)."
    },

    // 26. Trimethoprim + Sulfadiazine (Synergy)
    {
      id: "INT-TMS-SYN-26",
      pair: ["trimethoprim", "sulfadiazine"],
      aliasesA: ["trimethoprim"],
      aliasesB: ["sulfadiazine", "sulfamethoxazole"],
      severity: "BENEFICIAL_SYNERGY",
      clinicalTitle: "Sequential Enzymatic Blockade of Bacterial Folate Synthesis",
      mechanism: "Sulfadiazine competitively inhibits dihydropteroate synthase, while trimethoprim inhibits dihydrofolate reductase. The sequential blockade of tetrahydrofolate synthesis transforms two bacteriostatic drugs into a bactericidal agent.",
      clinicalConsequence: "Potent bactericidal synergy with broad spectrum against Gram-positive, Gram-negative, and protozoal (Toxoplasma, Coccidia) pathogens.",
      management: "STANDARD COMBINATION. Maintain patient hydration to prevent sulfonamide crystalluria, especially in acid urine.",
      evidence: "Plumb's Veterinary Drug Handbook; Veterinary Pharmacology."
    },

    // 27. Cephalosporins + Aminoglycosides
    {
      id: "INT-CEPH-AMINO-27",
      pair: ["cefazolin", "gentamicin"],
      aliasesA: ["cefazolin", "ceftriaxone", "ceftiofur"],
      aliasesB: ["gentamicin", "amikacin"],
      severity: "MODERATE_CAUTION",
      clinicalTitle: "Additive Proximal Tubular Nephrotoxicity",
      mechanism: "Both cephalosporins and aminoglycosides are eliminated by the kidneys via glomerular filtration and tubular transport, exhibiting additive proximal tubular cytotoxicity.",
      clinicalConsequence: "Significantly heightened risk of acute tubular necrosis, marked enzymuria, proteinuria, and renal azotemia, especially in dehydrated, septic, or geriatric animals.",
      management: "Monitor serum BUN and creatinine, ensure aggressive IV fluid hydration, and limit combination therapy duration to minimum necessary period.",
      evidence: "Kirk's Current Veterinary Therapy XV."
    },

    // 28. Clopidogrel + NSAIDs
    {
      id: "INT-CLOP-NSAID-28",
      pair: ["clopidogrel", "meloxicam"],
      aliasesA: ["clopidogrel"],
      aliasesB: ["meloxicam", "carprofen", "aspirin", "flunixin"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Dual Platelet Inhibition & Gastric Mucosal Hemorrhage",
      mechanism: "Clopidogrel selectively inhibits ADP P2Y12 platelet receptors, while NSAIDs block COX-1 thromboxane A2 (TXA2) synthesis and reduce gastric cytoprotective mucus/bicarbonate secretion.",
      clinicalConsequence: "Markedly elevated incidence of severe gastrointestinal hemorrhage, hematemesis, melena, and fatal hemorrhagic diathesis.",
      management: "Avoid combination unless essential (e.g., severe feline aortic thromboembolism with orthopedic pain). If mandatory, co-prescribe aggressive gastroprotectants (Omeprazole).",
      evidence: "Journal of Veterinary Cardiology; ACVIM Guidelines on Thromboprophylaxis."
    },

    // 29. Cisapride + Ketoconazole
    {
      id: "INT-CIS-KETO-29",
      pair: ["cisapride", "ketoconazole"],
      aliasesA: ["cisapride"],
      aliasesB: ["ketoconazole", "itraconazole"],
      severity: "FATAL_CONTRAINDICATION",
      clinicalTitle: "CYP3A4 Inhibition Inducing Myocardial hERG Block & Torsades de Pointes",
      mechanism: "Azole antifungals potently inhibit Cytochrome P450 3A4/3A12, blocking cisapride clearance. Accumulating cisapride blocks potassium delayed rectifier (hERG) channels in cardiac myocytes.",
      clinicalConsequence: "Severe QT interval prolongation, development of polymorphous ventricular tachycardia (Torsades de Pointes), ventricular fibrillation, and sudden death.",
      management: "STRICTLY FORBIDDEN. Never administer azole antifungals with cisapride. Substitute with prokinetic agents lacking cardiac potassium channel affinities.",
      evidence: "Small Animal Medical Differential Diagnosis (Ettinger)."
    },

    // 30. Spironolactone + ACE Inhibitors
    {
      id: "INT-SPIRO-ACE-30",
      pair: ["spironolactone", "enalapril"],
      aliasesA: ["spironolactone"],
      aliasesB: ["enalapril", "benazepril"],
      severity: "MODERATE_CAUTION",
      clinicalTitle: "Complete RAAS Axis Blockade & Hyperkalemic Risk",
      mechanism: "Concurrent aldosterone receptor blockade (spironolactone) and angiotensin-converting enzyme inhibition (enalapril/benazepril) completely blunts renal potassium excretion.",
      clinicalConsequence: "Potential development of hyperkalemia, profound hypotension, and worsening prerenal azotemia.",
      management: "Routinely utilized in canine cardiac failure (QUEST and CEVAL guidelines), but requires baseline and periodic (1-2 weeks post initiation) monitoring of serum creatinine, BUN, and electrolytes.",
      evidence: "ACVIM Consensus Statement on Myxomatous Mitral Valve Disease in Dogs."
    },

    // 31. Sulfonamides + Procaine Penicillin
    {
      id: "INT-SULF-PROC-31",
      pair: ["sulfadiazine", "procaine_penicillin"],
      aliasesA: ["sulfadiazine", "sulfamethoxazole", "trimethoprim_sulfonamide"],
      aliasesB: ["procaine_penicillin"],
      severity: "MODERATE_CAUTION",
      clinicalTitle: "PABA Metabolite Competitive Displacement of Sulfonamides",
      mechanism: "Procaine is rapidly cleaved by plasma pseudocholinesterases into para-aminobenzoic acid (PABA). PABA directly outcompetes sulfonamides for bacterial dihydropteroate synthase.",
      clinicalConsequence: "Complete loss of antimicrobial efficacy of the sulfonamide, resulting in treatment failure in mixed bacterial infections.",
      management: "Do not administer procaine penicillin concurrently with sulfonamide therapy. Use potassium/sodium penicillin salts instead.",
      evidence: "Veterinary Pharmacology and Therapeutics (Papich)."
    },

    // 32. Morphine / Opioids + Naloxone (Reversal)
    {
      id: "INT-OPIO-NALOX-32",
      pair: ["morphine", "naloxone"],
      aliasesA: ["morphine", "fentanyl", "tramadol"],
      aliasesB: ["naloxone"],
      severity: "BENEFICIAL_SYNERGY",
      clinicalTitle: "Competitive Opioid Mu-Receptor Displacement (Definitive Antidote)",
      mechanism: "Naloxone possesses exceptionally high competitive binding affinity for central mu, kappa, and delta opioid receptors, displacing opioid agonists without activating receptors.",
      clinicalConsequence: "Rapid reversal of life-threatening opioid-induced hypoventilation, respiratory arrest, severe bradycardia, and comatose sedation.",
      management: "FIRST-LINE RESCUE AGENT. Titrate naloxone slowly (0.02-0.04 mg/kg IV) to effect to avoid precipitous reversal of analgesia and acute pain crisis.",
      evidence: "Veterinary Emergency and Critical Care Manual."
    },

    // 33. Metoclopramide + Acepromazine
    {
      id: "INT-METO-ACE-33",
      pair: ["metoclopramide", "acepromazine"],
      aliasesA: ["metoclopramide"],
      aliasesB: ["acepromazine"],
      severity: "MAJOR_ADVERSE",
      clinicalTitle: "Cumulative Dopaminergic (D2) Blockade & Extrapyramidal Crisis",
      mechanism: "Both metoclopramide and acepromazine act as central dopamine D2 receptor antagonists in the basal ganglia and chemoreceptor trigger zone (CRTZ).",
      clinicalConsequence: "Severe acute extrapyramidal motor signs (EPS): involuntary muscle spasms, severe ataxia, torticollis, trismus, catalepsy, and extreme restlessness.",
      management: "CONTRAINDICATED in combination. In the event of an extrapyramidal crisis, administer Diphenhydramine (anticholinergic/antihistaminic) IV or IM as a specific antidote.",
      evidence: "Clinical Veterinary Toxicology (Plumlee)."
    },

    // 34. Furosemide + NSAIDs
    {
      id: "INT-FURO-NSAID-34",
      pair: ["furosemide", "meloxicam"],
      aliasesA: ["furosemide"],
      aliasesB: ["meloxicam", "carprofen", "flunixin", "aspirin"],
      severity: "MODERATE_CAUTION",
      clinicalTitle: "Prostaglandin Blockade Blunting Diuretic Action & Renal Hypoperfusion",
      mechanism: "Loop diuretics stimulate renal medullary prostaglandin (PGI2 and PGE2) synthesis to augment renal blood flow and natriuresis. NSAIDs block this physiological response.",
      clinicalConsequence: "Significant blunting of the natriuretic and diuretic efficacy of furosemide, exacerbation of congestive heart failure, and acute renal azotemia.",
      management: "Avoid NSAIDs in congestive heart failure patients receiving furosemide. If analgesia is mandatory, consider opioids or paracetamol (in dogs only, NEVER cats).",
      evidence: "Veterinary Clinics of North America: Small Animal Practice (Cardiology)."
    },

    // 35. Ketamine + Inhalants without Premedication
    {
      id: "INT-KETA-ISOF-35",
      pair: ["ketamine", "isoflurane"],
      aliasesA: ["ketamine"],
      aliasesB: ["isoflurane", "sevoflurane"],
      severity: "MODERATE_CAUTION",
      clinicalTitle: "Direct Myocardial Depression in Depleted Autonomic States",
      mechanism: "While ketamine is centrally sympathomimetic, its intrinsic direct cellular effect on cardiac myocytes is negative inotropic. Inhalants directly blunt myocardial contractility and autonomic reflexes.",
      clinicalConsequence: "In critically ill or catecholamine-depleted patients, combination causes profound cardiovascular depression, severe hypotension, and respiratory hypoventilation.",
      management: "Ensure balanced multimodal pre-medication (opioids/benzodiazepines) and active hemodynamic monitoring.",
      evidence: "Veterinary Anesthesia (Hall, Clarke, Trim)."
    }
  ];

  // 5. SPECIES-SPECIFIC TOXICOLOGY & ABSOLUTE CONTRAINDICATIONS
  DrugInteractions.SPECIES_CONTRAINDICATIONS = {
    feline: [
      {
        drug: "acetaminophen",
        aliases: ["acetaminophen", "paracetamol", "calpol", "crocin"],
        severity: "FATAL_CONTRAINDICATION",
        headline: "घातक: बिल्ली में पैरासिटामोल पूर्णतः निषिद्ध (Deficient Glucuronidation)",
        mechanism: "Cats have deficient UDP-glucuronosyltransferase (specifically UGT1A6), shunting metabolism to Cytochrome P450 and generating toxic NAPQI. NAPQI binds intracellular glutathione, causing massive lipid peroxidation of feline erythrocytes.",
        consequence: "Fatal methemoglobinemia (chocolate-brown blood), severe facial edema, cyanosis, Heinz body hemolytic anemia, acute hepatic necrosis, asphyxia, and death within hours.",
        antidote: "Immediate N-Acetylcysteine (NAC) IV/PO (140 mg/kg initial dose), Cimetidine, ascorbic acid, and whole blood transfusion.",
        evidence: "Plumb's Veterinary Drug Handbook; ASPCA Animal Poison Control Center."
      },
      {
        drug: "permethrin",
        aliases: ["permethrin", "cypermethrin", "deltamethrin"],
        severity: "FATAL_CONTRAINDICATION",
        headline: "घातक: बिल्ली में पर्मेथ्रिन विषाक्तता (Pyrethroid Neurotoxicity)",
        mechanism: "Cats lack the specific hepatic glucuronide-conjugating enzymes required to hydrolyze synthetic pyrethroids. Pyrethroids prolong the opening of voltage-gated sodium channels in neurons.",
        consequence: "Severe repetitive nerve firing leading to generalized muscle tremors, violent seizures, malignant hyperthermia, metabolic acidosis, and death.",
        antidote: "Aggressive dermal decontamination (liquid dishwashing soap), Methocarbamol (55-220 mg/kg IV) to control tremors, and IV lipid emulsion (ILE) therapy.",
        evidence: "Journal of Feline Medicine and Surgery (ISFM Guidelines on Permethrin Poisoning)."
      },
      {
        drug: "azathioprine",
        aliases: ["azathioprine", "imuran"],
        severity: "FATAL_CONTRAINDICATION",
        headline: "घातक: बिल्ली में अज़ाथिओप्रिन मायलोसप्रेशन (TPMT Deficiency)",
        mechanism: "Feline hepatocytes possess exceptionally low thiopurine methyltransferase (TPMT) activity. Cytotoxic 6-thioguanine nucleotides accumulate in bone marrow cells.",
        consequence: "Profound, irreversible, fatal bone marrow suppression, non-regenerative pancytopenia, severe neutropenia, septic shock, and fatal hemorrhages.",
        antidote: "None specific. Immediate cessation, broad-spectrum antibiotics, and blood component therapy. Chlorambucil is the safe feline alternative.",
        evidence: "Veterinary Immunology and Immunopathology."
      },
      {
        drug: "phosphate_enema",
        aliases: ["phosphate_enema", "fleet_enema", "sodium_phosphate"],
        severity: "FATAL_CONTRAINDICATION",
        headline: "घातक: फ्लीट एनीमा (Sodium Phosphate Enema Induced Hypocalcemia)",
        mechanism: "Rapid colonic transmucosal absorption of excessive phosphorus overwhelms renal excretion mechanisms, driving precipitation of calcium phosphate in tissues.",
        consequence: "Severe hyperphosphatemia, hypernatremia, acute profound hypocalcemia, tetanic seizures, cardiac arrhythmias, shock, and death within 1 to 6 hours.",
        antidote: "IV 10% Calcium Gluconate (slowly under ECG), aggressive saline diuresis, and phosphate binders.",
        evidence: "Feline Emergency and Critical Care Medicine."
      },
      {
        drug: "benzocaine",
        aliases: ["benzocaine"],
        severity: "FATAL_CONTRAINDICATION",
        headline: "घातक: बेंज़ोकेन जनित मेथेमोग्लोबिनेमिया (Erythrocyte Oxidation)",
        mechanism: "Feline hemoglobin contains 8 reactive sulfhydryl groups (compared to 4 in dogs), rendering it uniquely susceptible to oxidative denaturation by aromatic amines like benzocaine.",
        consequence: "Acute, life-threatening methemoglobinemia, severe tissue hypoxia, Heinz body formation, hemolytic crisis, and death.",
        antidote: "Methylene blue is CONTRAINDICATED in cats (causes hemolytic anemia). Treat with N-Acetylcysteine, oxygen therapy, and whole blood.",
        evidence: "Journal of the American Veterinary Medical Association."
      },
      {
        drug: "enrofloxacin",
        aliases: ["enrofloxacin"],
        severity: "MAJOR_ADVERSE",
        headline: "गंभीर चेतावनी: उच्च खुराक एनरोफ्लोक्सासिन रेटिना अंधापन (Retinal Blindness)",
        mechanism: "Feline retinal ABCG2 efflux transporter is mutated and dysfunctional. Doses > 5 mg/kg/day accumulate in retinal photoreceptors, where light exposure generates toxic reactive oxygen species.",
        consequence: "Diffuse outer retinal degeneration, tapetal hyperreflectivity, and acute, permanent, irreversible blindness.",
        antidote: "Strictly adhere to doses ≤ 5 mg/kg once daily, or substitute with marbofloxacin/pradofloxacin which do not cause feline retinal toxicity.",
        evidence: "Veterinary Ophthalmology; FDA-CVM Safety Alert on Feline Baytril Dosing."
      },
      {
        drug: "cisplatin",
        aliases: ["cisplatin"],
        severity: "FATAL_CONTRAINDICATION",
        headline: "घातक: बिल्ली में सिस्प्लाटिन पल्मोनरी एडिमा ('Cisplatin Splats Cats')",
        mechanism: "In cats, cisplatin causes massive vasoactive mediator release, triggering catastrophic pulmonary capillary hyperpermeability.",
        consequence: "Rapid fulminant pulmonary edema, severe pleural effusion, asphyxiation, and death within 24 to 48 hours.",
        antidote: "None. Strictly contraindicated. Use Carboplatin instead in feline oncology.",
        evidence: "Veterinary Oncology (Withrow and MacEwen's Small Animal Clinical Oncology)."
      }
    ],

    canine: [
      {
        drug: "ibuprofen",
        aliases: ["ibuprofen", "advil", "brufen"],
        severity: "FATAL_CONTRAINDICATION",
        headline: "घातक: श्वान में आइबुप्रोफेन विषाक्तता (Narrow Safety Index / AKI)",
        mechanism: "Dogs have highly prolonged ibuprofen elimination half-lives and undergo extensive enterohepatic recirculation. Severe COX-1 inhibition abolishes gastric mucosal barrier and renal blood flow.",
        consequence: "Perforating gastric ulcers, peritonitis, severe hematemesis, acute renal papillary necrosis, anuric renal failure, and death.",
        antidote: "Aggressive decontamination, Misoprostol, Omeprazole, Sucralfate, and prolonged IV fluid diuresis.",
        evidence: "Merck Veterinary Manual - Canine NSAID Toxicology."
      },
      {
        drug: "phenylbutazone",
        aliases: ["phenylbutazone"],
        severity: "MAJOR_ADVERSE",
        headline: "श्वान में फिनाइलब्यूटाज़ोन विषाक्तता (Blood Dyscrasias & Ulceration)",
        mechanism: "Suppresses canine hematopoietic precursors and causes severe cyclooxygenase inhibition with a very narrow therapeutic window in dogs.",
        consequence: "Fatal aplastic anemia, severe leukopenia, thrombocytopenia, and necrotizing stomatitis/enteritis.",
        antidote: "Substitute with veterinary-approved selective COX-2 inhibitors (Carprofen, Meloxicam).",
        evidence: "Small Animal Toxicology (Peterson and Talcott)."
      }
    ],

    canine_mdr1: [
      {
        drug: "ivermectin",
        aliases: ["ivermectin"],
        severity: "FATAL_CONTRAINDICATION",
        headline: "घातक: MDR1 (ABCB1) म्यूटेंट श्वान में आइवरमेक्टिन (Blood-Brain Barrier Collapse)",
        mechanism: "A 4-bp deletion in the ABCB1 (MDR1) gene results in complete non-functional P-glycoprotein at the blood-brain barrier. Substrates accumulate massively in brain tissue.",
        consequence: "Severe neurotoxicity at standard antiparasitic doses (> 100 mcg/kg): hypersalivation, ataxia, blindness, tremors, recumbency, coma, respiratory arrest, and death.",
        antidote: "Intensive supportive care, mechanical ventilation, and Intravenous Lipid Emulsion (ILE) therapy.",
        evidence: "Washington State University Clinical Pharmacology (Veterinary MDR1 Gene Research)."
      },
      {
        drug: "loperamide",
        aliases: ["loperamide", "imodium"],
        severity: "FATAL_CONTRAINDICATION",
        headline: "MDR1 श्वान में लोपेरामाइड केंद्रीय विषाक्तता (Opioid Neurotoxicity)",
        mechanism: "Loperamide is formulated to be excluded from the CNS by P-glycoprotein. In MDR1 mutants, it crosses into the brainstem unobstructed, binding mu-opioid receptors.",
        consequence: "Severe central nervous depression, profound respiratory hypoventilation, severe bradycardia, paralytic ileus, and coma.",
        antidote: "Naloxone infusion and supportive ventilation.",
        evidence: "WSU MDR1 Pharmacogenomics Laboratory."
      },
      {
        drug: "vincristine",
        aliases: ["vincristine"],
        severity: "MAJOR_ADVERSE",
        headline: "MDR1 श्वान में विन्क्रिस्टीन विषाक्तता (Enhanced Chemotoxicity)",
        mechanism: "Impaired biliary and intestinal P-glycoprotein excretion causes excessive systemic AUC exposure to antineoplastic vinca alkaloids.",
        consequence: "Severe bone marrow suppression, profound neutropenic sepsis, severe peripheral neuropathy, and ileus.",
        antidote: "Reduce dose by 25-30% in heterozygous (+/-) dogs; consider alternative therapy in homozygous (-/-) mutants.",
        evidence: "Veterinary Comparative Oncology."
      }
    ],

    equine: [
      {
        drug: "tylosin",
        aliases: ["tylosin", "tilmicosin", "lincomycin", "clindamycin"],
        severity: "FATAL_CONTRAINDICATION",
        headline: "घातक: घोड़े में मैक्रोलाइड/लिंकोसामाइड (Fatal Clostridial Enterocolitis)",
        mechanism: "Macrolides and lincosamides decimate the physiological anaerobic microflora of the equine caecum and colon, triggering uncontrolled proliferation of Clostridium difficile and Clostridium perfringens.",
        consequence: "Violent, hyperacute necrotizing typhlocolitis, massive endotoxemic shock, severe profuse diarrhea, laminitis, and 90-100% mortality within 24 to 48 hours.",
        antidote: "None reliably effective. Aggressive supportive intensive care, Polymyxin B for endotoxemia, biosponge (Di-tri-octahedral smectite), metronidazole, and IV fluids.",
        evidence: "Equine Veterinary Journal; Equine Internal Medicine (Reed & Bayly)."
      },
      {
        drug: "oxytetracycline",
        aliases: ["oxytetracycline"],
        severity: "MAJOR_ADVERSE",
        headline: "घोड़े में तीव्र IV ऑक्सीटेट्रासाइक्लिन (Cardiovascular Collapse)",
        mechanism: "Rapid undiluted intravenous boluses bind free ionized calcium in circulating blood, causing acute hypocalcemia and profound myocardial depression.",
        consequence: "Sudden collapse, severe hypotension, cardiac arrhythmias, and acute death during or immediately after injection.",
        antidote: "Must ALWAYS be diluted in minimum 500 mL 0.9% Saline and administered via slow IV infusion over 15-30 minutes.",
        evidence: "The Veterinary Clinics of North America: Equine Practice."
      },
      {
        drug: "procaine_penicillin",
        aliases: ["procaine_penicillin"],
        severity: "FATAL_CONTRAINDICATION",
        headline: "घातक: प्रोकेन पेनिसिलिन आकस्मिक IV इंजेक्शन (Procaine Seizure Mania)",
        mechanism: "Accidental intravenous penetration during IM injection delivers free procaine into the cerebral vasculature, inducing intense cortical excitation.",
        consequence: "Violent mania, frantic running, blindness, severe clonic-tonic seizures, trauma, cardiovascular arrest, and accidental fatality.",
        antidote: "ALWAYS aspirate syringe prior to IM injection. If seized: high-dose Diazepam IV, restrain head, prevent physical trauma.",
        evidence: "Manual of Equine Emergencies."
      }
    ],

    bovine: [
      {
        drug: "tilmicosin",
        aliases: ["tilmicosin", "micotil"],
        severity: "FATAL_CONTRAINDICATION",
        headline: "घातक: गाय/भैंस में टिल्मीकोसिन IV इंजेक्शन (Acute Cardiogenic Death)",
        mechanism: "Tilmicosin is a calcium channel antagonist that causes irreversible cardiac arrest when injected intravenously into cattle.",
        consequence: "Cardiogenic shock, electromechanical dissociation, and death in seconds. Labeled solely for Subcutaneous (SC) injection.",
        antidote: "No antidote exists. Strict adherence to subcutaneous administration exclusively.",
        evidence: "FDA-CVM Safety Bulletin: Micotil (tilmicosin injection) Safety."
      },
      {
        drug: "oral_antibiotics",
        aliases: ["oxytetracycline", "chloramphenicol", "ampicillin"],
        severity: "MAJOR_ADVERSE",
        headline: "वयस्क जुगाली करने वाले पशुओं में ओरल एंटीबायोटिक्स (Ruminal Dysbiosis)",
        mechanism: "Broad-spectrum oral antibiotics kill the symbiotic cellulolytic bacteria and protozoa in the functional adult rumen.",
        consequence: "Complete ruminal atony, severe bloat (tympany), metabolic acidosis, cessation of cud chewing, and systemic toxemia.",
        antidote: "Parenteral (IM/SC/IV) administration required. Rumen transfaunation (cud transfer from healthy donor) to restore flora.",
        evidence: "Bovine Medicine: Diseases and Husbandry of Cattle."
      }
    ]
  };

  // 6. CORE QUERY HELPER APIS

  /**
   * Evaluates pairwise interaction between two drugs.
   * @param {string} drugA - First drug name or trade name.
   * @param {string} drugB - Second drug name or trade name.
   * @returns {object} Interaction details or clearance report.
   */
  DrugInteractions.checkPairInteraction = function (drugA, drugB) {
    const normA = normalizeDrugName(drugA);
    const normB = normalizeDrugName(drugB);

    if (!normA || !normB) {
      return {
        interactionFound: false,
        severity: null,
        message: "Invalid drug inputs provided."
      };
    }

    if (normA === normB) {
      return {
        interactionFound: true,
        severity: "MAJOR_ADVERSE",
        clinicalTitle: "समान दवा का दोहराव (Duplicate Drug Therapy)",
        mechanism: "Prescribing the identical therapeutic molecule twice triggers unintentional overdose and toxicity.",
        clinicalConsequence: "Exaggerated pharmacological effect and dose-dependent toxicity.",
        management: "Remove the duplicate entry from prescription.",
        evidence: "Good Prescribing Practice Standards."
      };
    }

    for (let i = 0; i < DrugInteractions.MATRIX.length; i++) {
      const entry = DrugInteractions.MATRIX[i];
      const matchForward = (entry.aliasesA.includes(normA) && entry.aliasesB.includes(normB));
      const matchReverse = (entry.aliasesA.includes(normB) && entry.aliasesB.includes(normA));

      if (matchForward || matchReverse) {
        return {
          interactionFound: true,
          interactionId: entry.id,
          drugsInvolved: [drugA, drugB],
          normalizedPair: [normA, normB],
          severity: entry.severity,
          severityMeta: DrugInteractions.SEVERITY_LEVELS[entry.severity],
          clinicalTitle: entry.clinicalTitle,
          mechanism: entry.mechanism,
          clinicalConsequence: entry.clinicalConsequence,
          management: entry.management,
          evidence: entry.evidence
        };
      }
    }

    return {
      interactionFound: false,
      severity: null,
      message: "No documented high-risk adverse or synergistic interaction found in database."
    };
  };

  /**
   * Scans a full list of prescribed drugs against each other and against species-specific contraindications.
   * @param {Array<string>} drugsArray - Array of drug names.
   * @param {string} species - Target animal species ('feline', 'canine', 'equine', 'bovine', etc.).
   * @param {object} [patientOptions] - Additional patient characteristics (e.g., { isMdr1Mutant: true }).
   * @returns {object} Comprehensive prescription audit report.
   */
  DrugInteractions.auditPrescriptionList = function (drugsArray, species, patientOptions) {
    const opts = patientOptions || {};
    const normSpecies = normalizeSpecies(species);
    const cleanList = Array.isArray(drugsArray) ? drugsArray.filter(d => typeof d === "string" && d.trim().length > 0) : [];

    const report = {
      timestamp: new Date().toISOString(),
      speciesEvaluated: normSpecies,
      totalDrugsChecked: cleanList.length,
      status: "CLEAR",
      hasFatalViolation: false,
      hasMajorAdverse: false,
      interactionsFound: [],
      speciesContraindications: [],
      synergies: [],
      summaryAlerts: []
    };

    if (cleanList.length === 0) {
      report.summaryAlerts.push("कोई दवा प्रविष्ट नहीं की गई (Prescription list is empty).");
      return report;
    }

    // A. Check Species-Specific Contraindications
    const speciesRules = DrugInteractions.SPECIES_CONTRAINDICATIONS[normSpecies] || [];
    let combinedSpeciesRules = [...speciesRules];

    if (normSpecies === "canine" && opts.isMdr1Mutant) {
      const mdr1Rules = DrugInteractions.SPECIES_CONTRAINDICATIONS["canine_mdr1"] || [];
      combinedSpeciesRules = combinedSpeciesRules.concat(mdr1Rules);
    }

    cleanList.forEach(rawDrug => {
      const normD = normalizeDrugName(rawDrug);
      combinedSpeciesRules.forEach(rule => {
        if (rule.aliases.includes(normD) || rule.aliases.includes(rawDrug.toLowerCase())) {
          const violation = {
            drugPrescribed: rawDrug,
            normalizedDrug: normD,
            severity: rule.severity,
            severityMeta: DrugInteractions.SEVERITY_LEVELS[rule.severity],
            headline: rule.headline,
            mechanism: rule.mechanism,
            consequence: rule.consequence,
            antidote: rule.antidote,
            evidence: rule.evidence
          };
          report.speciesContraindications.push(violation);
          if (rule.severity === "FATAL_CONTRAINDICATION") {
            report.hasFatalViolation = true;
          } else if (rule.severity === "MAJOR_ADVERSE") {
            report.hasMajorAdverse = true;
          }
        }
      });
    });

    // B. Check Pairwise Interactions across All Combinations: N * (N - 1) / 2
    for (let i = 0; i < cleanList.length; i++) {
      for (let j = i + 1; j < cleanList.length; j++) {
        const drugA = cleanList[i];
        const drugB = cleanList[j];
        const res = DrugInteractions.checkPairInteraction(drugA, drugB);

        if (res.interactionFound) {
          if (res.severity === "BENEFICIAL_SYNERGY") {
            report.synergies.push(res);
          } else {
            report.interactionsFound.push(res);
            if (res.severity === "FATAL_CONTRAINDICATION") {
              report.hasFatalViolation = true;
            } else if (res.severity === "MAJOR_ADVERSE") {
              report.hasMajorAdverse = true;
            }
          }
        }
      }
    }

    // C. Determine Final System Governance Status
    if (report.hasFatalViolation) {
      report.status = "BLOCK_DISPENSING";
      report.summaryAlerts.push("गंभीर चेतावनी: पर्चे में घातक संयोजन अथवा प्रजाति निषेध पाया गया। प्रिस्क्रिप्शन तुरंत ब्लॉक करें (FATAL CONTRAINDICATION DETECTED).");
    } else if (report.hasMajorAdverse) {
      report.status = "ALERT_OVERRIDE_REQUIRED";
      report.summaryAlerts.push("सावधानी: गंभीर प्रतिकूल प्रभाव वाली दवाएं चिन्हित। क्लिनिकल औचित्य व खुराक संशोधन अनिवार्य (MAJOR ADVERSE INTERACTION).");
    } else if (report.interactionsFound.length > 0) {
      report.status = "CAUTION_MONITORING";
      report.summaryAlerts.push("मध्यम स्तर की अंतःक्रिया: खुराक अंतराल या रोगी निगरानी अनुशंसित (MODERATE CAUTION).");
    } else {
      report.status = "PASSED_SAFE";
      report.summaryAlerts.push("सभी दवाएं सुरक्षित एवं सुसंगत हैं (Prescription cleared clinical pharmacology audit).");
    }

    return report;
  };

  /**
   * Returns all documented interactions for a specific drug.
   * @param {string} drugName - Drug active ingredient or brand name.
   * @returns {Array<object>} List of interactions matching the drug.
   */
  DrugInteractions.getInteractionsForDrug = function (drugName) {
    const norm = normalizeDrugName(drugName);
    if (!norm) return [];

    const results = [];
    DrugInteractions.MATRIX.forEach(entry => {
      if (entry.aliasesA.includes(norm) || entry.aliasesB.includes(norm)) {
        results.push({
          interactionId: entry.id,
          severity: entry.severity,
          severityMeta: DrugInteractions.SEVERITY_LEVELS[entry.severity],
          clinicalTitle: entry.clinicalTitle,
          partnerAliases: entry.aliasesA.includes(norm) ? entry.aliasesB : entry.aliasesA,
          mechanism: entry.mechanism,
          clinicalConsequence: entry.clinicalConsequence,
          management: entry.management,
          evidence: entry.evidence
        });
      }
    });
    return results;
  };

  /**
   * Returns all known contraindications for a designated species.
   * @param {string} species - Animal species name.
   * @returns {Array<object>} List of species contraindications.
   */
  DrugInteractions.getSpeciesContraindications = function (species) {
    const norm = normalizeSpecies(species);
    const general = DrugInteractions.SPECIES_CONTRAINDICATIONS[norm] || [];
    if (norm === "canine") {
      const mdr1 = DrugInteractions.SPECIES_CONTRAINDICATIONS["canine_mdr1"] || [];
      return { generalContraindications: general, mdr1MutationContraindications: mdr1 };
    }
    return general;
  };

  /**
   * Diagnostic search tool for autocomplete or prescription lookup.
   * @param {string} query - Free text search.
   * @returns {Array<string>} Matching normalized drug names.
   */
  DrugInteractions.searchDrugs = function (query) {
    if (!query || typeof query !== "string") return [];
    const q = query.trim().toLowerCase();
    const matches = new Set();

    Object.keys(ALIAS_MAP).forEach(alias => {
      if (alias.includes(q)) {
        matches.add(ALIAS_MAP[alias]);
      }
    });
    return Array.from(matches);
  };

  // 7. EXPORT TO GLOBAL CLINICAL DATA NAMESPACE
  global.VetcareApp.ClinicalData.DrugInteractions = DrugInteractions;

  // Log Successful Architectural Registration
  if (typeof console !== "undefined" && console.info) {
    console.info("Vetcare AI OS: [clinical-data/drug-interactions.js] successfully mounted with 35+ interactions and species-specific safety guardrails.");
  }

})(typeof window !== "undefined" ? window : globalThis);
