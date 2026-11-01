// Vetcare AI OS - Master Clinical Engine (Part 1: Core, Drugs, Vax & Farmer DB)

(function (root) {
  "use strict";

  /* =========================================================================
     1. ORGAN-BASED SYMPTOMS MATRIX (window.VETCARE_SYMPTOMS_BY_ORGAN)
     ========================================================================= */
  root.VETCARE_SYMPTOMS_BY_ORGAN = {
    eyes: [
      { id: "EYE_LACRIMATION", hi: "आंखों से लगातार पानी/आंसू बहना", en: "Excessive lacrimation", significance: "Catarrhal inflammation, foreign body or early systemic pyrexia" },
      { id: "EYE_CORNEAL_OPACITY", hi: "आंख की पुतली पर सफेदी/धुंधलापन (Blue Eye)", en: "Corneal opacity / Keratitis", significance: "Characteristic of Theileriosis, Moraxella or advanced trauma" },
      { id: "EYE_JAUNDICE", hi: "आंख के श्लेष्म का गहरा पीला होना (Icterus)", en: "Icteric / Yellow sclera & conjunctiva", significance: "Hepatic breakdown or intravascular hemolysis (Anaplasmosis/Babesiosis)" },
      { id: "EYE_PALLOR", hi: "आंख के श्लेष्म का चीनी मिट्टी जैसा सफेद होना (Severe Anemia)", en: "Porcelain white conjunctiva", significance: "Critical erythrocyte loss (Haemonchosis, Babesiosis, acute hemorrhage)" },
      { id: "EYE_CONGESTION", hi: "आंखों का गहरा लाल व रक्त संकुलित होना (Congested)", en: "Deeply injected / Congested episcleral vessels", significance: "High fever, toxemia, acute septicemia (HS, Anthrax)" },
      { id: "EYE_SUNKEN", hi: "आंखों का गड्ढे में धंस जाना (Severe Dehydration)", en: "Enophthalmos / Sunken eyeballs", significance: "Fluid loss >8-10% of body weight (Calf scours, severe enteritis)" },
      { id: "EYE_THIRD_EYELID_PROLAPSE", hi: "तीसरी पलक का बाहर झपकना/दिखना (Haw Flash)", en: "Protrusion of nictitating membrane", significance: "Tetanospasmin neurotoxicity (Tetanus pathognomonic sign)" }
    ],
    skin_coat: [
      { id: "SKIN_NODULES", hi: "त्वचा पर 10-50 मिमी की कठोर गोल गांठें (Nodules)", en: "Firm circumscribed cutaneous nodules", significance: "Lumpy Skin Disease (Capripox), Urticaria, or Hypoderma" },
      { id: "SKIN_CREPITATING_SWELLING", hi: "कंधे/पुट्ठे पर छूने पर चर्र-चर्र बोलने वाली गैसदार सूजन", en: "Crepitant emphysematous muscular swelling", significance: "Clostridial myonecrosis (Black Quarter / Clostridium chauvoei)" },
      { id: "SKIN_DEW_LAP_EDEMA", hi: "गलकंबल, जबड़े व सीने के नीचे गर्म दर्दनाक सूजन", en: "Submandibular, brisket and dewlap edema", significance: "Pasteurellosis (HS) or Congestive Heart Failure / TRP" },
      { id: "SKIN_TICKS", hi: "शरीर, कान व जांघों पर अत्यधिक किलनी/चिचड़ी (Ticks)", en: "Heavy tick infestation (Hyalomma / Rhipicephalus)", significance: "Vector risk for Theileria, Babesia, and Anaplasma" },
      { id: "SKIN_PETECHIAE", hi: "त्वचा व श्लेष्मा पर पिन के आकार के लाल रक्तबिंदु धब्बे", en: "Petechial and ecchymotic hemorrhages", significance: "Purpura hemorrhagica, septicemia, severe thrombocytopenia" },
      { id: "SKIN_COLD_EXTREMITIES", hi: "कान, सींग, पैर व थन का बर्फ जैसा ठंडा पड़ना", en: "Hypothermia of ears, horns and distal limbs", significance: "Peripheral vasoconstriction in circulatory shock or Milk Fever" },
      { id: "SKIN_ALOPECIA_CRUSTS", hi: "बाल झड़ना, त्वचा पर पपड़ीदार खुरंड व खुजली (Scabs)", en: "Alopecia with thick crusting and pruritus", significance: "Sarcoptic / Psoroptic Mange or Dermatophytosis (Ringworm)" }
    ],
    udder_teats: [
      { id: "UDDER_HOT_HARD", hi: "अयन/थन अत्यंत गर्म, लाल, कठोर एवं असहनीय दर्द", en: "Udder swollen, hot, hyperemic and acutely tender", significance: "Acute parenchymatous mastitis (Staph, Strep, Coliform)" },
      { id: "UDDER_COLD_GANGRENOUS", hi: "थन नीला-काला, ठंडा, सुन्न एवं दुर्गंधयुक्त सीरम रिसाव", en: "Cyanotic, cold, anesthetic gangrenous mastitis", significance: "Staphylococcus aureus alpha-toxin or Clostridial necrosis" },
      { id: "UDDER_CLOTS_BLOOD", hi: "दूध में गाढ़े छिछड़े, थक्के, मवाद या ताजा खून आना", en: "Milk containing clots, flakes, purulent shreds or blood", significance: "Active alveolar vascular and epithelial breakdown" },
      { id: "UDDER_WATERY_SECRETION", hi: "दूध बंद होकर केवल पानी जैसा पतला पीला सीरम आना", en: "Serous, straw-colored watery milk secretion", significance: "Severe acute coliform mastitis (E. coli / Klebsiella)" },
      { id: "UDDER_FIBROSIS", hi: "थन के अंदर स्थायी पत्थर जैसी कठोर गांठ (Fibrosis)", en: "Chronic parenchymal induration / corded teat canal", significance: "End-stage chronic mastitis with loss of secretory tissue" },
      { id: "UDDER_TEAT_CRACKS", hi: "थन पर दर्दनाक चीरे, दरारें या फफोले (Teat erosions)", en: "Teat fissures, papules, vesicular erosions", significance: "FMD, Cowpox, Pseudo-cowpox or severe milking trauma" }
    ],
    urine: [
      { id: "URINE_COFFEE_RED", hi: "गहरे कॉफी, वाइन या लाल-भूरे रंग का पेशाब (Hemoglobinuria)", en: "Port-wine / Dark reddish-brown urine (Hemoglobinuria)", significance: "Intravascular hemolysis (Babesiosis, Post-parturient Hemoglobinuria)" },
      { id: "URINE_FRANK_BLOOD", hi: "पेशाब में ताजा थक्केदार लाल खून आना (Hematuria)", en: "Frank whole blood and clots in urine (Hematuria)", significance: "Enzootic hematuria (Bracken fern toxicity), Cystitis, Pyelonephritis" },
      { id: "URINE_ANURIA", hi: "पेशाब पूरी तरह बंद होना या दर्द के साथ बूंद-बूंद टपकना", en: "Complete anuria, stranguria, or constant dribbling", significance: "Urolithiasis (water belly / urethral calculus), ruptured bladder" },
      { id: "URINE_KETONE_SWEET", hi: "पेशाब व सांस से मीठी क्लोरोफॉर्म सदृश गंध (Acetone)", en: "Sweetish fruity chloroform odor of acetone", significance: "Negative energy balance, lipolysis, Ketosis (Acetonemia)" },
      { id: "URINE_TURBID_PUS", hi: "पेशाब मटमैला, गाढ़ा और मवादयुक्त होना (Pyuria)", en: "Cloudy urine with mucus flakes, sediment and pus", significance: "Corynebacterium renale (Contagious Bovine Pyelonephritis)" }
    ],
    dung: [
      { id: "DUNG_WATERY_FOUL", hi: "अत्यधिक बदबूदार, पीला या भूरा पिचकारी जैसा दस्त", en: "Profuse projectile watery fetid diarrhea", significance: "Salmonellosis, Colibacillosis, acute intestinal enterotoxemia" },
      { id: "DUNG_BLOODY_MUCOID", hi: "गोबर में ताजा लाल खून के थक्के, आंव व आंत की झिल्ली", en: "Dysentery with mucus shreds and frank blood clots", significance: "Coccidiosis (Eimeria), acute BVD mucosal disease, Coronaviral enteritis" },
      { id: "DUNG_TAR_BLACK", hi: "डामर जैसा काला, चिपचिपा व बदबूदार गोबर (Melena)", en: "Tarry black sticky feces (Melena)", significance: "Bleeding in upper GI tract (Abomasal ulcer, severe hemorrhagic abomasitis)" },
      { id: "DUNG_PIPE_STEM", hi: "बिना जोर लगाए लगातार पतली नाली की तरह बहता गोबर", en: "Continuous homogenous pipe-stream watery diarrhea", significance: "Johne's Disease (Paratuberculosis / MAP infection)" },
      { id: "DUNG_HARD_DRY_MUCUS", hi: "सूखा, काला, कड़ा गोबर जिस पर सफेद कफ/श्लेष्म की परत हो", en: "Scanty, hard, dry fecal balls coated with mucus glaze", significance: "Omasal impaction, Simple indigestion, dehydration, acute Anaplasmosis" }
    ],
    temperature: [
      { id: "TEMP_HYPERPYREXIA", hi: "अति तीव्र ज्वर (105.0°F - 108.0°F)", en: "Hyperpyrexia (>105.0°F)", significance: "Hyper-acute bacterial/protozoal invasion (HS, Anthrax, Theileria, Babesia)" },
      { id: "TEMP_MODERATE_FEVER", hi: "मध्यम ज्वर (103.0°F - 104.8°F)", en: "Moderate pyrexia (103.0°F - 104.8°F)", significance: "Systemic viral response (FMD, LSD, BEF) or local focal abscesses" },
      { id: "TEMP_NORMAL", hi: "सामान्य शारीरिक तापमान (101.0°F - 102.5°F)", en: "Euthermic / Normal range (101.0°F - 102.5°F)", significance: "Metabolic or mechanical non-inflammatory conditions" },
      { id: "TEMP_SUBNORMAL", hi: "निम्न तापमान / शरीर का ठंडा पड़ना (<100.0°F)", en: "Hypothermia / Subnormal temperature (<100.0°F)", significance: "Circulatory collapse, Milk Fever, terminal septic/endotoxic shock" }
    ],
    rumen_abdomen: [
      { id: "RUMEN_LEFT_DRUM", hi: "बायाँ पेट (कोख) ढोलक की भांति अत्यधिक फूला व तना हुआ", en: "Severe left paralumbar fossa distention (Tympany)", significance: "Primary frothy bloat (legumes) or secondary obstructive free-gas bloat" },
      { id: "RUMEN_ATONY", hi: "रूमेन की चाल/हलचल पूर्णतया बंद होना (0/2 min)", en: "Complete ruminal hypomotility or total atony", significance: "Vagus indigestion, metabolic acidosis, hypocalcemia, peritonitis" },
      { id: "RUMEN_FLUID_SPLASH", hi: "बाईं कोख हिलाने पर पेट में पानी की छप-छप आवाज़ (Splashing)", en: "Fluid sloshing on succussion / ballottement", significance: "Lactic acidosis (Grain overload), abomasal volvulus" },
      { id: "RUMEN_COLIC_SIGNS", hi: "पेट की ओर लात मारना, बार-बार उठना-बैठना व कराहना", en: "Belly kicking, groaning, treading, rolling (Visceral Colic)", significance: "Intestinal intussusception, acute bloat, renal calculi, torsion" }
    ],
    respiration: [
      { id: "RESP_GRUNTING_MOAN", hi: "सांस छोड़ते समय घुर-घुर की तेज आवाज व दर्द भरी कराह (Grunt)", en: "Expiratory grunting, stridor and moaning", significance: "Painful thoracic pleuritis, Reticuloperitonitis (TRP), tracheal edema" },
      { id: "RESP_OPEN_MOUTH", hi: "गर्दन फैलाकर जीभ बाहर निकाल हांफना (Air Hunger)", en: "Orthopneic stance with open-mouth panting", significance: "Severe hypoxia, pulmonary edema, consolidated pneumonia, heat stroke" },
      { id: "RESP_FROTHY_DISCHARGE", hi: "नाक व मुंह से प्रचुर झागदार या खून मिला स्राव", en: "Frothy, blood-tinged or mucopurulent nasal discharge", significance: "Acute pulmonary edema, aspiration pneumonia, terminal asphyxia" },
      { id: "RESP_PAROXYSMAL_COUGH", hi: "लगातार सूखी या बलगमयुक्त कष्टकारी खांसी", en: "Deep paroxysmal, painful or moist cough", significance: "Bovine Respiratory Disease (BRD), Dictyocaulus (Lungworm), IBR" }
    ],
    nervous_locomotion: [
      { id: "NERV_STERNAL_RECUMBENCY", hi: "गर्दन मोड़कर पुट्ठों पर बैठना व खड़ा न हो पाना (S-Curve)", en: "Sternal recumbency with lateral head tuck into flank", significance: "Hypocalcemia (Milk Fever pathognomonic posture)" },
      { id: "NERV_OPISTHOTONOS", hi: "सिर पीछे की ओर मुड़ना, गर्दन अकड़ना व दांत पीसना", en: "Opisthotonos, star-gazing posture and jaw champing", significance: "Polioencephalomalacia (B1 deficiency), Enterotoxemia, Lead toxicity" },
      { id: "NERV_CIRCLING_HEADPRESS", hi: "एक ही दिशा में गोल घूमना व दीवार से सिर टकराना", en: "Unilateral circling and compulsive head pressing", significance: "Listeriosis, Surra (Trypanosomiasis), Coenurosis, hepatic encephalopathy" },
      { id: "NERV_AGGRESSION_HYDRO", hi: "बिना कारण आक्रामक होना, रंभाना व काल्पनिक वस्तुओं पर झपटना", en: "Furious delirium, aimless bellowing, exaggerated tenesmus", significance: "Bovine Rabies, nervous acetonemia, hypomagnesemic tetany" },
      { id: "NERV_POSTERIOR_PARALYSIS", hi: "पिछले पैरों की दुर्बलता, लड़खड़ाहट व उठने में असमर्थ (Paraplegia)", en: "Posterior ataxia, knuckling of fetlocks, paraplegia", significance: "Maternal obstetrical paralysis (Obturator nerve), Spinal trauma" }
    ]
  };

  /* =========================================================================
     2. COMPREHENSIVE VETERINARY DRUGS PHARMACOPEIA (window.VETCARE_MEDICINES_DB)
     ========================================================================= */
  root.VETCARE_MEDICINES_DB = [
    {
      id: "DRUG_CEFTIOFUR_SODIUM",
      salt: "Ceftiofur Sodium Sterile Powder (1000 mg/vial)",
      category: "Antibiotic",
      ethicalBrand: { name: "Xyrofur 1 gm", company: "Intas Pharmaceuticals", approxMrp: 440.00 },
      genericOption: { name: "Ceftio-Vet 1 gm", approxMrp: 185.00 },
      doseRate: "1.1 to 2.2 mg/kg body weight (1 to 2 ml reconstituted per 50 kg)",
      route: "Intramuscular (I/M) or Subcutaneous (S/C)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "Zero days (0 hours)", meat: "4 days" },
      indications: ["Acute Hemorrhagic Septicemia (HS)", "Bovine Respiratory Disease (BRD)", "Acute Interdigital Necrobacillosis (Foot Rot)", "Acute Postpartum Metritis"],
      contraindications: ["Known hypersensitivity to cephalosporins or beta-lactam antibiotics", "Do not administer intravenously in rapid bolus"]
    },
    {
      id: "DRUG_CEFTRIAXONE_TAZOBACTAM",
      salt: "Ceftriaxone Sodium (3000 mg) + Tazobactam Sodium (375 mg)",
      category: "Antibiotic",
      ethicalBrand: { name: "Intacef Tazo 3375 mg", company: "Intas Pharmaceuticals", approxMrp: 495.00 },
      genericOption: { name: "Tazo-Ceff 3.375 gm", approxMrp: 195.00 },
      doseRate: "7 to 10 mg/kg body weight (Reconstitute with 20 ml sterile WFI)",
      route: "Intramuscular (I/M) or Slow Intravenous (I/V)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "7 days (14 milkings)", meat: "28 days" },
      indications: ["Severe Acute Clinical & Toxic Mastitis", "Bronchopneumonia & Pleuritis", "Septic Metritis & Pyometra", "Post-operative prophylaxis in laparotomy/C-section"],
      contraindications: ["Concurrent administration with calcium-containing intravenous infusions (causes precipitate crystals in lungs and kidneys)"]
    },
    {
      id: "DRUG_ENROFLOXACIN",
      salt: "Enrofloxacin Injectable Solution 100 mg/ml (10%)",
      category: "Antibiotic",
      ethicalBrand: { name: "Floxidin 10% (100 ml)", company: "Virbac Animal Health", approxMrp: 310.00 },
      genericOption: { name: "Enrocin 10% (100 ml)", approxMrp: 120.00 },
      doseRate: "5 mg/kg body weight (5 ml per 100 kg body weight)",
      route: "Deep Intramuscular (I/M) or Slow Intravenous (I/V)",
      pregnancySafe: false,
      withdrawalPeriod: { milk: "84 hours (7 milkings)", meat: "14 days" },
      indications: ["Colibacillosis & Severe Calf Scours", "Contagious Bovine Pleuropneumonia", "Mycoplasmal Mastitis & Arthritis", "Secondary bacterial infections in Viral diseases"],
      contraindications: ["Growing young calves (induces articular cartilage arthropathy)", "Late gestation in dairy cows", "Horses and dogs in skeletal growth phase"]
    },
    {
      id: "DRUG_OXYTETRACYCLINE_LA",
      salt: "Oxytetracycline Dihydrate (Long Acting) 200 mg/ml",
      category: "Antibiotic",
      ethicalBrand: { name: "Terramycin LA (30 ml)", company: "Zoetis Animal Health", approxMrp: 260.00 },
      genericOption: { name: "Oxysteclin LA (30 ml)", approxMrp: 98.00 },
      doseRate: "20 mg/kg body weight (1 ml per 10 kg body weight single shot)",
      route: "Strictly Deep Intramuscular (Deep I/M) at multiple divided sites",
      pregnancySafe: false,
      withdrawalPeriod: { milk: "10 days (20 milkings)", meat: "28 days" },
      indications: ["Anaplasmosis (Gall Sickness)", "Pneumonic Pasteurellosis", "Black Quarter (early stages)", "Infectious Bovine Keratoconjunctivitis (Pink Eye)"],
      contraindications: ["Pregnancy (causes skeletal retardation & permanent yellow-brown tooth staining)", "Severe hepatic or renal insufficiency", "Never administer I/V in LA formulation"]
    },
    {
      id: "DRUG_AMOXICILLIN_SULBACTAM",
      salt: "Amoxicillin Sodium (2000 mg) + Sulbactam Sodium (1000 mg)",
      category: "Antibiotic",
      ethicalBrand: { name: "Amoxirum Forte 3 gm", company: "Virbac Animal Health", approxMrp: 360.00 },
      genericOption: { name: "Sulbacillin 3 gm", approxMrp: 145.00 },
      doseRate: "7 to 10 mg/kg body weight every 24 hours for 3 consecutive days",
      route: "Intramuscular (I/M) or Slow Intravenous (I/V)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "60 hours", meat: "14 days" },
      indications: ["Staphylococcal & Streptococcal Mastitis", "Wound infections and surgical site sepsis", "Navel Ill & Joint Ill in calves", "Acute Actinobacillosis"],
      contraindications: ["Animals exhibiting known penicilloyl protein hypersensitivity"]
    },
    {
      id: "DRUG_PROCAINE_PENICILLIN_G",
      salt: "Procaine Penicillin G (20 Lakh IU) + Penicillin G Sodium (20 Lakh IU)",
      category: "Antibiotic",
      ethicalBrand: { name: "Fortified Procaine Penicillin 40 Lakh IU", company: "Alembic Pharmaceuticals", approxMrp: 135.00 },
      genericOption: { name: "Pendistrin 40 Lakh IU", approxMrp: 58.00 },
      doseRate: "10,000 to 20,000 IU/kg body weight every 24 hours for 5 days",
      route: "Strictly Deep Intramuscular (Deep I/M only)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "72 hours", meat: "10 days" },
      indications: ["Black Quarter (Clostridium chauvoei)", "Tetanus (Clostridium tetani) early bactericidal eradication", "Subacute Anthrax cover", "Streptococcal adenitis"],
      contraindications: ["NEVER administer Intravenously (procaine induces fatal grand mal seizures and acute cardiac arrest)", "Accidental intravascular puncture"]
    },
    {
      id: "DRUG_GENTAMICIN_SULFATE",
      salt: "Gentamicin Sulfate Injection 40 mg/ml",
      category: "Antibiotic",
      ethicalBrand: { name: "Gentacip Vet (100 ml)", company: "Cipla Animal Health", approxMrp: 170.00 },
      genericOption: { name: "Genta-Vet 100 ml", approxMrp: 70.00 },
      doseRate: "4 to 5 mg/kg body weight once daily or 2 mg/kg every 12 hours",
      route: "Intramuscular (I/M), Slow I/V or Intrauterine infusion",
      pregnancySafe: false,
      withdrawalPeriod: { milk: "7 days", meat: "45 days" },
      indications: ["Gram-negative neonatal enteritis and septicemia", "Colibacillosis", "Chronic purulent endometritis (as intrauterine drench with normal saline)"],
      contraindications: ["Dehydrated calves with elevated blood urea nitrogen (BUN)", "Pre-existing renal damage (potent nephrotoxic and ototoxic agent)"]
    },
    {
      id: "DRUG_MARBOFLOXACIN",
      salt: "Marbofloxacin 100 mg/ml (10% w/v)",
      category: "Antibiotic",
      ethicalBrand: { name: "Forcyl 10% (50 ml)", company: "Vetoquinol India", approxMrp: 720.00 },
      genericOption: { name: "Marbovet 10% (50 ml)", approxMrp: 320.00 },
      doseRate: "Single injection of 8 mg/kg (2 ml/25 kg) or daily 2 mg/kg for 3-5 days",
      route: "Intramuscular (I/M), Subcutaneous (S/C) or I/V",
      pregnancySafe: false,
      withdrawalPeriod: { milk: "48 hours (after 8 mg/kg single shot)", meat: "6 days" },
      indications: ["Acute severe E. coli Mastitis with profound toxemia", "Mannheimia haemolytica pneumonia", "Histophilus somni infections"],
      contraindications: ["Horses, juvenile calves with cartilage development", "Severe central nervous system disorders"]
    },
    {
      id: "DRUG_CEFOPERAZONE_INTRAMAMMARY",
      salt: "Cefoperazone Sodium 250 mg per 10 ml syringe",
      category: "Antibiotic",
      ethicalBrand: { name: "Pathocef Intramammary Infusion", company: "Zoetis Animal Health", approxMrp: 110.00 },
      genericOption: { name: "Cefomast 250 mg Infusion", approxMrp: 55.00 },
      doseRate: "One single 10 ml syringe infused per infected quarter after complete milk stripping",
      route: "Intramammary teat canal infusion",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "96 hours (8 milkings)", meat: "2 days" },
      indications: ["Clinical and Subclinical Mastitis during active lactation", "Pseudomonas, Klebsiella and Streptococcal udder parenchymal clearing"],
      contraindications: ["Infusion into teat without surgical scrubbing of teat sphincter (introduces fungal spores)", "Never inject parentally"]
    },
    {
      id: "DRUG_MELOXICAM_PARACETAMOL",
      salt: "Meloxicam (5 mg/ml) + Paracetamol (150 mg/ml)",
      category: "NSAID",
      ethicalBrand: { name: "Melonex Plus (100 ml)", company: "Intas Pharmaceuticals", approxMrp: 220.00 },
      genericOption: { name: "Melonat Plus (100 ml)", approxMrp: 85.00 },
      doseRate: "0.5 mg/kg Meloxicam basis (15 to 20 ml per 400 kg adult cattle)",
      route: "Strictly Deep Intramuscular (Deep I/M)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "5 days", meat: "15 days" },
      indications: ["Acute hyperthermia (>104°F) in systemic infections", "Musculoskeletal lameness and arthritis", "Acute udder inflammation pain", "Post-surgical pain management"],
      contraindications: ["Severe abomasal ulceration", "Dehydrated shock without concurrent fluid resuscitation", "Concurrent steroid therapy"]
    },
    {
      id: "DRUG_FLUNIXIN_MEGLUMINE",
      salt: "Flunixin Meglumine 50 mg/ml (equivalent to 5% active flunixin)",
      category: "NSAID",
      ethicalBrand: { name: "Megludyne (50 ml)", company: "Virbac Animal Health", approxMrp: 510.00 },
      genericOption: { name: "Flunivet (50 ml)", approxMrp: 210.00 },
      doseRate: "1.1 to 2.2 mg/kg body weight (1 to 2 ml per 45 kg body weight)",
      route: "Slow Intravenous (I/V preferred) or Deep I/M",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "36 hours", meat: "7 days" },
      indications: ["Endotoxemic shock from Coliform mastitis / Metritis", "Acute visceral abdominal colic and bloat pain", "Severe tracheal edema in HS", "Bovine Respiratory Disease (BRD)"],
      contraindications: ["Hypovolemic renal failure", "Do not administer intra-arterially", "Use with caution in late third trimester near parturition"]
    },
    {
      id: "DRUG_KETOPROFEN",
      salt: "Ketoprofen Injection 100 mg/ml (10%)",
      category: "NSAID",
      ethicalBrand: { name: "Neoprofen (100 ml)", company: "Vetcare / Provimi", approxMrp: 375.00 },
      genericOption: { name: "Ketovet (100 ml)", approxMrp: 150.00 },
      doseRate: "3 mg/kg body weight (3 ml per 100 kg body weight) once daily for 3 days",
      route: "Deep Intramuscular (I/M) or Slow Intravenous (I/V)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "Zero hours (0 days) - Highly preferred in lactating dairy cattle", meat: "4 days" },
      indications: ["Acute laminitis and foot rot pain in high-yielding dairy cows", "Post-parturient downer cow pain", "Bovine Ephemeral Fever (BEF) stiffness"],
      contraindications: ["Concurrent administration with other NSAIDs or anticoagulants", "Severe renal impairment"]
    },
    {
      id: "DRUG_TOLFENAMIC_ACID",
      salt: "Tolfenamic Acid 40 mg/ml (4% w/v)",
      category: "NSAID",
      ethicalBrand: { name: "Tolfedine (100 ml)", company: "Vetoquinol India", approxMrp: 480.00 },
      genericOption: { name: "Tolfe-Vet (100 ml)", approxMrp: 210.00 },
      doseRate: "2 mg/kg (1 ml per 20 kg) I/M repeated once after 48 hours; or single IV 4 mg/kg",
      route: "Intramuscular (I/M) in neck or Slow I/V",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "24 hours", meat: "7 days" },
      indications: ["Acute mastitis pain relief", "Severe pulmonary inflammation in acute pasteurellosis", "Post-operative orthopedic interventions"],
      contraindications: ["Cardiac failure", "Abomasal erosion diathesis"]
    },
    {
      id: "DRUG_ISOFLUPREDONE_ACETATE",
      salt: "Isoflupredone Acetate Sterile Suspension 2 mg/ml",
      category: "Hormone",
      ethicalBrand: { name: "Isoflud (10 ml)", company: "Zydus Animal Health", approxMrp: 225.00 },
      genericOption: { name: "Isopred (10 ml)", approxMrp: 95.00 },
      doseRate: "10 to 20 mg total adult dose (5 to 10 ml total intramuscular injection)",
      route: "Strictly Deep Intramuscular (Deep I/M only)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "7 days", meat: "7 days" },
      indications: ["Primary Bovine Ketosis (potent gluconeogenic corticosteroid)", "Severe laryngeal/pharyngeal edema in HS (non-abortifacient steroid)", "Toxic shock and musculoskeletal myositis"],
      contraindications: ["Concurrent untreated active systemic mycotic infections", "Never administer I/V", "Avoid in animals with profound hypokalemia without potassium supplements"]
    },
    {
      id: "DRUG_DEXAMETHASONE_SODIUM",
      salt: "Dexamethasone Sodium Phosphate 4.4 mg/ml",
      category: "Hormone",
      ethicalBrand: { name: "Dexona Vet (100 ml)", company: "Zydus Animal Health", approxMrp: 125.00 },
      genericOption: { name: "Dexavet (100 ml)", approxMrp: 48.00 },
      doseRate: "0.05 to 0.1 mg/kg (5 to 10 ml total adult cow dose)",
      route: "Intramuscular (I/M) or Rapid Intravenous (I/V)",
      pregnancySafe: false,
      withdrawalPeriod: { milk: "72 hours", meat: "8 days" },
      indications: ["Immediate anaphylactic drug shock and bee/wasp sting reactions", "Non-pregnant cattle with acute laryngeal suffocation", "Induction of elective parturition (late 3rd trimester)"],
      contraindications: ["STRICTLY CONTRAINDICATED IN PREGNANCY (induces instant abortion in 3rd trimester)", "Corneal ulcers (leads to eye perforation)", "Chronic diabetes mellitus"]
    },
    {
      id: "DRUG_PHENIRAMINE_MALEATE",
      salt: "Pheniramine Maleate Injection 22.75 mg/ml",
      category: "Supportive & Fluids",
      ethicalBrand: { name: "Avil Vet (100 ml)", company: "Intervet / MSD Animal Health", approxMrp: 120.00 },
      genericOption: { name: "Cadistin Vet (100 ml)", approxMrp: 45.00 },
      doseRate: "0.5 mg/kg body weight (5 to 10 ml per adult cattle)",
      route: "Deep Intramuscular (Deep I/M only)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "48 hours", meat: "3 days" },
      indications: ["Allergic dermatitis, urticaria, insect stings and pruritus", "Serum sickness, vaccine reactions and histamine toxicity", "Bloat and ruminal atony adjunctive therapy", "Retained placenta detox cover"],
      contraindications: ["Intravenous bolus injection (induces intense central nervous excitation and fatal tremors)"]
    },
    {
      id: "DRUG_DIMINAZENE_ACETURATE",
      salt: "Diminazene Aceturate (70 mg/ml) + Phenazone / Antipyrine (375 mg/ml)",
      category: "Antiprotozoal",
      ethicalBrand: { name: "Berenil RTU (30 ml)", company: "Intervet / MSD Animal Health", approxMrp: 275.00 },
      genericOption: { name: "Diminavet (30 ml)", approxMrp: 105.00 },
      doseRate: "3.5 to 5.0 mg/kg body weight (1 ml per 20 kg body weight)",
      route: "Strictly Deep Intramuscular (Deep I/M only, divide if volume >20 ml)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "20 days", meat: "28 days" },
      indications: ["Bovine Babesiosis (Babesia bigemina / B. bovis Red Water)", "Trypanosoma evansi (Surra) curative treatment"],
      contraindications: ["NEVER administer Intravenously (fatal collapse)", "Do not overdose; toxic signs include salivation, ataxia, convulsions", "Camels are hypersensitive"]
    },
    {
      id: "DRUG_BUPARVAQUONE",
      salt: "Buparvaquone Injection 50 mg/ml",
      category: "Antiprotozoal",
      ethicalBrand: { name: "Butalex (20 ml)", company: "MSD Animal Health", approxMrp: 1280.00 },
      genericOption: { name: "Buparvet / Zubion (20 ml)", approxMrp: 580.00 },
      doseRate: "2.5 mg/kg body weight (1 ml per 20 kg body weight as single dose)",
      route: "Strictly Deep Intramuscular (Deep I/M in the neck musculature)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "14 days", meat: "42 days" },
      indications: ["Acute Theileriosis (Theileria annulata / East Coast Fever)", "Advanced theileriosis with pulmonary involvement (repeat after 48h if severe)"],
      contraindications: ["Never administer I/V or S/C", "Concurrent immunization with attenuated vaccines within 14 days"]
    },
    {
      id: "DRUG_QUINAPYRAMINE_SALTS",
      salt: "Quinapyramine Sulfate (1.5 gm) + Quinapyramine Chloride (1.0 gm) per vial",
      category: "Antiprotozoal",
      ethicalBrand: { name: "Triquin 2.5 gm vial", company: "MSD Animal Health", approxMrp: 440.00 },
      genericOption: { name: "Suramin Pro 2.5 gm", approxMrp: 210.00 },
      doseRate: "4.4 mg/kg (Reconstitute 2.5 gm vial with 15 ml sterile water; give 1 ml per 40 kg)",
      route: "Strictly Subcutaneous (S/C) behind shoulder fold",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "14 days", meat: "28 days" },
      indications: ["Curative treatment and 6-month chemoprophylaxis of Trypanosoma evansi (Surra) in endemic cattle, buffaloes and equines"],
      contraindications: ["Never administer I/M or I/V (causes violent local sloughing and severe fatal systemic toxicity)", "Weak, starved or severely dehydrated animals"]
    },
    {
      id: "DRUG_CALCIUM_BOROGLUCONATE_MIFEX",
      salt: "Calcium Borogluconate 25% w/v + Magnesium Hypophosphite + Dextrose",
      category: "Metabolic & Calcium",
      ethicalBrand: { name: "Mifex 450 ml Infusion", company: "Novartis / Elanco", approxMrp: 310.00 },
      genericOption: { name: "Calci-Vet 450 ml", approxMrp: 135.00 },
      doseRate: "450 ml per 400 kg cow (300 ml slow I/V warmed to body temp + 150 ml S/C)",
      route: "Slow Intravenous (I/V) under cardiac monitoring + Subcutaneous (S/C)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "Zero days (0 hours)", meat: "Zero days" },
      indications: ["Parturient Paresis (Milk Fever) in dairy cows and buffaloes", "Acute hypocalcemic tetany, uterine inertia, eclampsia"],
      contraindications: ["Rapid I/V infusion without auscultation (causes fatal ventricular fibrillation and systolic cardiac arrest)", "Hypercalcemia"]
    },
    {
      id: "DRUG_TOLDIMPHOS_SODIUM",
      salt: "Toldimphos Sodium 200 mg/ml (Organic Phosphorus 20%)",
      category: "Metabolic & Calcium",
      ethicalBrand: { name: "Tonophosphan Vet (30 ml)", company: "MSD Animal Health", approxMrp: 295.00 },
      genericOption: { name: "Uro-Phos (30 ml)", approxMrp: 115.00 },
      doseRate: "10 to 15 ml (2 to 3 gm Toldimphos) daily for 3-5 consecutive days",
      route: "Deep Intramuscular (I/M), Slow I/V or Subcutaneous",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "Zero days", meat: "Zero days" },
      indications: ["Post-Parturient Hemoglobinuria (PPH) in freshly calved buffaloes", "Pica (eating bones/mud)", "Downer cow syndrome supportive therapy", "Anoestrus and repeat breeding"],
      contraindications: ["Pre-existing hyperphosphatemia or acute renal shutdown"]
    },
    {
      id: "DRUG_VITAMIN_B_COMPLEX_LIVER",
      salt: "Thiamine (B1) 10mg + Riboflavin (B2) 3mg + Niacinamide 100mg + B12 10mcg + Liver Extract",
      category: "Supportive & Fluids",
      ethicalBrand: { name: "Belamyl (100 ml)", company: "Zydus Animal Health", approxMrp: 185.00 },
      genericOption: { name: "B-Vet Complex (100 ml)", approxMrp: 70.00 },
      doseRate: "10 ml for cattle/buffalo; 2 to 5 ml for sheep/goat every 24-48 hours",
      route: "Strictly Deep Intramuscular (Deep I/M only)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "Zero days", meat: "Zero days" },
      indications: ["General anorexia, off-feed, rumen microflora revival", "Hepatopathy, toxic jaundice, convalescence after severe blood protozoa", "Anemia support"],
      contraindications: ["Intravenous administration (causes anaphylactoid shock)"]
    },
    {
      id: "DRUG_NEUROTROPIC_B_VITAMINS",
      salt: "Thiamine (B1) 100mg + Pyridoxine (B6) 50mg + Cyanocobalamin (B12) 1000mcg per ml",
      category: "Supportive & Fluids",
      ethicalBrand: { name: "Tribivet (100 ml)", company: "Intas Pharmaceuticals", approxMrp: 185.00 },
      genericOption: { name: "Neuro-Vet (100 ml)", approxMrp: 72.00 },
      doseRate: "10 ml daily for cattle and buffaloes; 3 to 5 ml for small ruminants",
      route: "Intramuscular (I/M) or Slow Intravenous (I/V)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "Zero days", meat: "Zero days" },
      indications: ["Polioencephalomalacia (Cerebrocortical Necrosis)", "Nervous acetonemia in ketosis", "Peripheral motor neuropathy and radial/obturator paralysis", "Post-tetanic neural damage"],
      contraindications: ["Known allergy to cyanocobalamin or cobalt"]
    },
    {
      id: "DRUG_IVERMECTIN_1_PERCENT",
      salt: "Ivermectin 10 mg/ml (1% w/v injectable)",
      category: "Anthelmintic",
      ethicalBrand: { name: "Neomec (10 ml)", company: "Intas Pharmaceuticals", approxMrp: 155.00 },
      genericOption: { name: "Ivervet (10 ml)", approxMrp: 55.00 },
      doseRate: "0.2 mg/kg body weight (1 ml per 50 kg body weight single injection)",
      route: "Strictly Subcutaneous (S/C) into loose skin of neck or behind shoulder",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "28 days (STRICTLY PROHIBITED in lactating dairy cattle producing milk for human consumption)", meat: "35 days" },
      indications: ["Sarcoptic, Psoroptic and Chorioptic Mange", "Tick and sucking lice infestations", "Gastrointestinal nematodes (Haemonchus, Ostertagia)", "Warble fly larvae (Hypoderma)"],
      contraindications: ["NEVER administer Intramuscularly or Intravenously", "Lactating dairy cattle whose milk is drawn for human use", "Collie-breed dogs"]
    },
    {
      id: "DRUG_ALBENDAZOLE_SUSPENSION",
      salt: "Albendazole Micronized Oral Suspension 25 mg/ml (2.5%)",
      category: "Anthelmintic",
      ethicalBrand: { name: "Albomar (1000 ml)", company: "Virbac Animal Health", approxMrp: 410.00 },
      genericOption: { name: "Alben-Vet (1000 ml)", approxMrp: 175.00 },
      doseRate: "Roundworms/Tapeworms: 7.5 mg/kg (3 ml/10 kg); Liver Flukes: 10 mg/kg (4 ml/10 kg)",
      route: "Oral drench strictly",
      pregnancySafe: false,
      withdrawalPeriod: { milk: "72 hours (3 days)", meat: "14 days" },
      indications: ["Gastrointestinal roundworms, lungworms, tapeworms (Moniezia)", "Chronic Fasciola hepatica / F. gigantica (Liver Flukes)"],
      contraindications: ["STRICTLY CONTRAINDICATED in the 1st trimester of pregnancy (first 45 days in cattle: teratogenic and causes embryonic death)"]
    },
    {
      id: "DRUG_OXYCLOZANIDE_LEVAMISOLE",
      salt: "Oxyclozanide 3% w/v + Levamisole HCl 1.5% w/v Oral Suspension",
      category: "Anthelmintic",
      ethicalBrand: { name: "Nilzan Drench (1000 ml)", company: "Virbac Animal Health", approxMrp: 535.00 },
      genericOption: { name: "Oxylev Drench (1000 ml)", approxMrp: 235.00 },
      doseRate: "10 to 15 mg/kg Oxyclozanide + 7.5 mg/kg Levamisole (Approx 100 ml per 300 kg adult cow)",
      route: "Oral drench strictly",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "48 hours", meat: "14 days" },
      indications: ["Paramphistomiasis (Amphistomes / Rumen Flukes)", "Fascioliasis (Adult liver flukes)", "Dictyocaulus viviparus (Bovine lungworms)", "Non-specific immunostimulation"],
      contraindications: ["Concurrent organophosphate (OP) dip or pour-on treatment within 14 days", "Severe hepatic exhaustion"]
    },
    {
      id: "DRUG_CLOPROSTENOL_SODIUM",
      salt: "Cloprostenol Sodium 250 mcg/ml (Prostaglandin F2-alpha analogue)",
      category: "Hormone",
      ethicalBrand: { name: "Pragma (2 ml)", company: "Intas Pharmaceuticals", approxMrp: 235.00 },
      genericOption: { name: "Cloprost-Vet (2 ml)", approxMrp: 105.00 },
      doseRate: "500 mcg total dose (2 ml single intramuscular injection)",
      route: "Strictly Intramuscular (I/M only)",
      pregnancySafe: false,
      withdrawalPeriod: { milk: "Zero hours (0 days)", meat: "24 hours" },
      indications: ["Luteal cysts and Persistent Corpus Luteum", "Subestrus / Unobserved heat synchronization", "Chronic Pyometra and Endometritis evacuation", "Mummified / Macerated fetus expulsion", "Induction of abortion in unwanted mating"],
      contraindications: ["STRICTLY CONTRAINDICATED in pregnant animals unless therapeutic abortion is intended (instant luteolysis)", "Animals suffering from severe bronchospasm or spastic airways"]
    },
    {
      id: "DRUG_BUSERELIN_ACETATE",
      salt: "Buserelin Acetate 0.0042 mg/ml (equivalent to 4 mcg Buserelin/ml)",
      category: "Hormone",
      ethicalBrand: { name: "Receptal (10 ml)", company: "MSD Animal Health", approxMrp: 610.00 },
      genericOption: { name: "GnRH-Vet (10 ml)", approxMrp: 275.00 },
      doseRate: "2.5 to 5.0 ml (10 to 20 mcg Buserelin) at Artificial Insemination or day 11-12 post-AI",
      route: "Intramuscular (I/M) or Slow I/V",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "Zero days", meat: "Zero days" },
      indications: ["Follicular cysts and cystic ovarian degeneration", "Delayed ovulation and anovulation", "Improvement of conception rate at A.I.", "Prevention of early embryonic mortality (luteotropic support on Day 12)"],
      contraindications: ["Refractory ovarian hypoplasia or juvenile ovaries with no follicular waves"]
    },
    {
      id: "DRUG_SYNTHETIC_OXYTOCIN",
      salt: "Synthetic Oxytocin Injection 10 IU/ml",
      category: "Hormone",
      ethicalBrand: { name: "Syntocinon Vet (10 IU)", company: "Novartis / Sandoz", approxMrp: 48.00 },
      genericOption: { name: "Oxytocin Vet (10 IU)", approxMrp: 20.00 },
      doseRate: "20 to 40 IU (2 to 4 ml) I/M for adult cattle/buffalo; 5 to 10 IU for sheep/goat",
      route: "Intramuscular (I/M) or very slow Intravenous infusion in glucose drip",
      pregnancySafe: false,
      withdrawalPeriod: { milk: "Zero hours", meat: "Zero days" },
      indications: ["Primary uterine inertia during active stage 2 labor (cervix must be fully dilated)", "Retention of Placenta (ROP) within first 2 to 6 hours postpartum", "Facilitation of milk let-down in agalactia from stress"],
      contraindications: ["STRICTLY CONTRAINDICATED when cervix is closed or in mechanical dystocia (causes fatal uterine rupture)", "Tetanic uterine contractions"]
    },
    {
      id: "DRUG_ATROPINE_SULFATE",
      salt: "Atropine Sulfate Injection 1 mg/ml",
      category: "Supportive & Fluids",
      ethicalBrand: { name: "Atro-Vet (100 ml)", company: "Harson Laboratories", approxMrp: 98.00 },
      genericOption: { name: "Atropine 100 ml", approxMrp: 38.00 },
      doseRate: "Organophosphate toxicity: 0.2 to 0.5 mg/kg (1/4th dose slow IV, 3/4th dose S/C)",
      route: "1/4th dose slow I/V, remainder Subcutaneous (S/C) or I/M",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "3 days", meat: "3 days" },
      indications: ["Specific antidote for Organophosphate (OP) and Carbamate pesticide poisoning", "Antisialagogue in excessive salivation/choking", "Sinus bradycardia and partial AV heart block"],
      contraindications: ["Glaucoma", "Paralytic ileus and severe ruminal bloat (unless reversing life-threatening cholinergic crisis)"]
    },
    {
      id: "DRUG_SODIUM_BICARBONATE_7_5",
      salt: "Sodium Bicarbonate Injection 7.5% w/v Hypertonic Infusion (500 ml)",
      category: "Rumen Buffer",
      ethicalBrand: { name: "Sodabicarb 7.5% (500 ml)", company: "Claris / Zydus", approxMrp: 175.00 },
      genericOption: { name: "Sodium Bicarb 7.5% (500 ml)", approxMrp: 72.00 },
      doseRate: "500 to 1000 ml slow I/V based on severity of rumen pH drop and base deficit",
      route: "Strictly Slow Intravenous (Slow I/V only)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "Zero days", meat: "Zero days" },
      indications: ["Acute Lactic Acidosis (Grain Overload / carbohydrate engorgement)", "Severe metabolic acidosis secondary to diarrheal dehydration", "Hyperkalemia"],
      contraindications: ["Metabolic or respiratory alkalosis", "Hypocalcemia (alkalosis triggers acute tetany)", "Extravascular perivascular injection causes tissue necrosis"]
    },
    {
      id: "DRUG_DEXTROSE_20_PERCENT",
      salt: "Dextrose Hypertonic Infusion 20% w/v (1000 ml)",
      category: "Metabolic & Calcium",
      ethicalBrand: { name: "Dextrose 20% Vet (1000 ml)", company: "Albert David / Aculife", approxMrp: 145.00 },
      genericOption: { name: "Dextrose 20% (1000 ml)", approxMrp: 58.00 },
      doseRate: "1000 to 2000 ml slow I/V infusion warmed to body temperature",
      route: "Strictly Intravenous (I/V only)",
      pregnancySafe: true,
      withdrawalPeriod: { milk: "Zero days", meat: "Zero days" },
      indications: ["Clinical Ketosis (Acetonemia) in high-yielding dairy cows", "Severe hypoglycemic exhaustion", "Hepatic glycogen depletion support in toxemia", "Downer cow shock"],
      contraindications: ["Hyperglycemia", "Never administer Subcutaneously or Intramuscularly (induces sterile abscesses and massive sloughing)"]
    }
  ];

  /* =========================================================================
     3. EXHAUSTIVE VACCINATION KNOWLEDGE BASE (window.VETCARE_VACCINATION_DB)
     ========================================================================= */
  root.VETCARE_VACCINATION_DB = [
    {
      id: "VAX_HS",
      vaccineName: "Hemorrhagic Septicemia Alum Precipitated / Oil Adjuvant Vaccine",
      diseaseHi: "गलघोंटू (Hemorrhagic Septicemia - Pasteurella multocida B:2)",
      diseaseEn: "Hemorrhagic Septicemia (HS)",
      targetSpecies: ["गाय (Cattle)", "भैंस (Buffalo)"],
      idealAge: "6 माह या उससे अधिक (6 months and above)",
      season: "मई - जून (Pre-monsoon strictly before rains)",
      route: "Alum Precipitated: Subcutaneous (S/C); Oil Adjuvant: Deep Intramuscular (Deep I/M)",
      dose: "Alum Vaccine: 5 ml S/C; Oil Adjuvant Vaccine: 2 to 3 ml Deep I/M",
      boosterFrequency: "वार्षिक (Annual revaccination pre-monsoon)",
      immunityDuration: "Alum Vaccine: 6 माह; Oil Adjuvant Vaccine: 12 माह",
      precautions: "पशु को बुखार या कृमि संक्रमण न हो। टीकाकरण से 15 दिन पूर्व कृमिनाशक (Deworming) अवश्य दें। गाभिन के अंतिम 15 दिनों में अनावश्यक तनाव से बचें।",
      contraindications: ["बीमार, कमजोर या अत्यधिक ज्वरग्रस्त पशु", "6 माह से छोटे बछड़े जिनके मातृक एंटीबॉडीज (Maternal immunity) मौजूद हों"]
    },
    {
      id: "VAX_BQ",
      vaccineName: "Black Quarter Formalin Inactivated Aluminum Hydroxide Gel Adjuvant Vaccine",
      diseaseHi: "लंगड़ा बुखार / चरचरा (Clostridium chauvoei)",
      diseaseEn: "Black Quarter (BQ)",
      targetSpecies: ["गाय (Cattle)", "भैंस (Buffalo)", "भेड़-बकरी"],
      idealAge: "6 माह या उससे अधिक (मुख्यतः 6 माह से 3 वर्ष के युवा पशु)",
      season: "मई - जून (मानसून पूर्व)",
      route: "Subcutaneous (S/C) in mid-neck region",
      dose: "5 ml Subcutaneously in cattle & buffaloes; 2 ml for sheep/goat",
      boosterFrequency: "वार्षिक (Annual revaccination pre-monsoon)",
      immunityDuration: "10 से 12 माह",
      precautions: "सुई साफ और विसंक्रमित हो। 3 वर्ष से अधिक आयु के मवेशियों में यह रोग अत्यंत दुर्लभ है।",
      contraindications: ["सक्रिय बीक्यू प्रकोप वाले बाड़े में लक्षण दिखा रहे पशुओं को न लगाएं", "गर्भावस्था के अंतिम माह में अत्यधिक भागदौड़ न कराएं"]
    },
    {
      id: "VAX_FMD",
      vaccineName: "Foot and Mouth Disease Trivalent Inactivated Oil Adjuvant Vaccine (O, A, Asia-1)",
      diseaseHi: "खुरपका-मुँहपका (FMD Aphthovirus)",
      diseaseEn: "Foot-and-Mouth Disease (FMD)",
      targetSpecies: ["गाय", "भैंस", "भेड़", "बकरी", "सूअर"],
      idealAge: "4 माह की उम्र पर प्रथम टीका (Primary)",
      season: "फरवरी - मार्च और अगस्त - सितंबर (Bi-annual cycles under NADCP)",
      route: "Deep Intramuscular (Deep I/M in neck region) or Subcutaneous as per manufacturer",
      dose: "गाय व भैंस: 2 ml Deep I/M; भेड़ व बकरी: 1 ml Deep I/M",
      boosterFrequency: "प्रथम टीके के 1 माह बाद पहला बूस्टर; तत्पश्चात प्रति 6 माह पर नियमित बूस्टर",
      immunityDuration: "लगभग 6 माह",
      precautions: "कोल्ड चेन (+2°C to +8°C) का कड़ाई से पालन करें। टीके को कभी फ्रीज/बर्फ न जमने दें। वैक्सीन शीशी को लगाने से पहले अच्छी तरह हिलाएं।",
      contraindications: ["4 माह से छोटे बछड़े", "अति-दुर्बल या तीव्र संक्रामक बीमारी से ग्रस्त पशु"]
    },
    {
      id: "VAX_LSD_GOAT_POX",
      vaccineName: "Heterologous Live Attenuated Goat Pox Vaccine (Uttarkashi Strain) / Lumpi-ProVacInd",
      diseaseHi: "लंपी स्किन रोग (Lumpy Skin Disease - Capripoxvirus)",
      diseaseEn: "Lumpy Skin Disease (LSD)",
      targetSpecies: ["गाय (Cattle)"],
      idealAge: "4 माह व उससे अधिक उम्र के बछड़े व गायें",
      season: "मार्च - अप्रैल (मच्छर, डास मक्खी व किलनी सीजन से पूर्व)",
      route: "Subcutaneous (S/C) in the side of neck",
      dose: "Goat Pox Vaccine: 3 ml S/C (10x dose for cattle); Homologous Lumpi-ProVacInd: 1 ml S/C",
      boosterFrequency: "वार्षिक (Annual booster vaccination)",
      immunityDuration: "कम से कम 1 वर्ष",
      precautions: "प्रभावित क्षेत्रों में रिंग वैक्सीनेशन (Ring Vaccination) रणनीति अपनाएं। वैक्सीन को खोलने के 2 घंटे के भीतर उपयोग कर लें।",
      contraindications: ["सक्रिय लंपी स्किन के नोड्यूल दिखा रहे संक्रमित पशु", "भैंसों में सामान्यतः रोग प्रतिरोधक क्षमता होने से टीकाकरण अनिवार्य नहीं है"]
    },
    {
      id: "VAX_BRUCELLOSIS",
      vaccineName: "Brucella abortus Cotton Strain 19 Live Vaccine / RB51 Rough Mutant",
      diseaseHi: "ब्रुसेलोसिस / संक्रामक गर्भपात (Brucella abortus)",
      diseaseEn: "Bovine Brucellosis",
      targetSpecies: ["केवल 4 से 8 माह की मादा बछड़ियां (Female Calves strictly)"],
      idealAge: "4 से 8 माह की उम्र (strictly between 4 to 8 months of age)",
      season: "वर्ष भर (उम्र के अनुरूप कभी भी)",
      route: "Subcutaneous (S/C) in neck",
      dose: "2 ml Subcutaneously (Reduced dose 3-5 x 10^9 organisms)",
      boosterFrequency: "जीवन में केवल एक बार (Once in a lifetime - NO BOOSTER EVER)",
      immunityDuration: "आजीवन सुरक्षा (Lifelong protection against abortion)",
      precautions: "कठोर वैधानिक चेतावनी: यह जूनोटिक टीका है! टीकाकर्मी दस्ताने व चश्मा पहनें। यदि टीका कर्मी की आंख या त्वचा में लग जाए तो तुरंत डॉक्टर से डॉक्सीसाइक्लिन लें।",
      contraindications: ["STRICTLY PROHIBITED in male calves (induces permanent orchitis)", "STRICTLY PROHIBITED in adult or pregnant cows (causes immediate abortion)", "Female calves >8 months age"]
    },
    {
      id: "VAX_PPR",
      vaccineName: "PPR Live Attenuated Cell Culture Vaccine (Sungri 96 Strain)",
      diseaseHi: "बकरी प्लेग / पीपीआर (Peste des Petits Ruminants)",
      diseaseEn: "Peste des Petits Ruminants (PPR)",
      targetSpecies: ["बकरी (Goat)", "भेड़ (Sheep)"],
      idealAge: "4 माह की उम्र पर",
      season: "जनवरी - फरवरी (प्रजनन सीजन से पूर्व)",
      route: "Subcutaneous (S/C) in lateral neck or inner flank",
      dose: "1 ml Subcutaneously",
      boosterFrequency: "प्रति 3 वर्ष में एक बार (Once in 3 years)",
      immunityDuration: "कम से कम 3 वर्ष (Often lifelong)",
      precautions: "घोलने के लिए दिए गए कोल्ड डाइल्युएंट का ही प्रयोग करें। धूप से बचाएं। 2 घंटे में समाप्त करें।",
      contraindications: ["4 माह से छोटे मेमने", "अंतिम माह की गाभिन बकरियां"]
    },
    {
      id: "VAX_ET",
      vaccineName: "Enterotoxemia Multi-component Clostridial Aluminum Hydroxide Adjuvant Vaccine",
      diseaseHi: "फिड़किया / आंत्रविषरक्तता (Clostridium perfringens Type D)",
      diseaseEn: "Enterotoxemia (Pulpy Kidney)",
      targetSpecies: ["भेड़ (Sheep)", "बकरी (Goat)", "गाय के बछड़े"],
      idealAge: "3 से 4 माह की उम्र पर",
      season: "मई - जून (नई मानसूनी घास व दाना चरने से पूर्व)",
      route: "Subcutaneous (S/C)",
      dose: "2.5 ml Subcutaneously for sheep/goat; 5 ml for cattle",
      boosterFrequency: "प्राथमिक टीके के 2-3 सप्ताह बाद बूस्टर; फिर वार्षिक",
      immunityDuration: "1 वर्ष",
      precautions: "अचानक अत्यधिक कार्बोहाइड्रेट (अनाज/हरी घास) खिलाने से पूर्व टीकाकरण चक्र पूरा होना चाहिए।",
      contraindications: ["तीव्र पेट दर्द या दस्त से ग्रस्त पशु"]
    },
    {
      id: "VAX_ANTHRAX",
      vaccineName: "Anthrax Spore Vaccine (Sterne Strain 34F2 Live Inactivated Spore Susp.)",
      diseaseHi: "एंथ्रेक्स / प्लीहा ज्वर / जहरी बुखार (Bacillus anthracis)",
      diseaseEn: "Anthrax",
      targetSpecies: ["गाय", "भैंस", "भेड़", "बकरी", "घोड़ा"],
      idealAge: "6 माह व उससे अधिक (केवल स्थानिक / Endemic क्षेत्रों में)",
      season: "अप्रैल - मई (गर्मी के मौसम में)",
      route: "Subcutaneous (S/C) strictly",
      dose: "गाय व भैंस: 1 ml S/C; भेड़ व बकरी: 0.5 ml S/C",
      boosterFrequency: "वार्षिक (केवल घोषित स्थानिक रेड-जोन क्षेत्रों में)",
      immunityDuration: "10 से 12 माह",
      precautions: "टीका लगाने के 10 दिन पूर्व और 10 दिन बाद तक पशु को कोई भी एंटीबायोटिक (विशेषकर पेनिसिलिन) न दें, अन्यथा टीका निष्प्रभावी हो जाएगा।",
      contraindications: ["गैर-स्थानिक सुरक्षित क्षेत्र (Non-endemic zones)", "सक्रिय प्रकोप में मृत पशुओं के पास टीकाकरण न करें"]
    }
  ];

  /* =========================================================================
     4. SMART FARMER CURATED SIMPLE PROFILES (window.VETCARE_FARMER_DISEASE_DB)
     ========================================================================= */
  root.VETCARE_FARMER_DISEASE_DB = [
    {
      id: "farmer_repeat_breeding",
      nameHi: "रिपीट ब्रीडिंग (बार-बार फिरना / ग्याभिन न ठहरना)",
      affectedOrgan: "बच्चेदानी (गर्भाशय व अंडाशय)",
      causes: "बच्चेदानी में हल्का गुप्त संक्रमण (Subclinical Endometritis), संतुलित आहार व मिनरल की कमी (फास्फोरस, कॉपर, जिंक), सीमन डलवाने का गलत समय या कमजोर अंडा।",
      effects: "गाय-भैंस हर 21 दिन में फिर से गर्मी/मद में आ जाती है। कृत्रिम गर्भाधान (A.I.) का खर्च बढ़ता है और दूध उत्पादन चक्र लेट होने से भारी आर्थिक नुकसान होता है।",
      currentStatusSigns: "पशु बार-बार मद के पूरे लक्षण दिखाता है, डिस्चार्ज शीशे जैसा या कभी-कभी हल्का मैला आता है, परंतु 3 बार से अधिक सीमन कराने पर भी खाली रह जाता है।",
      stagesTimeline: [
        { stage: "शुरुआती चरण (1-2 बार फिरना)", signs: "मद चक्र सामान्य 21 दिन पर आता है, पशु स्वस्थ दिखता है।", action: "तुरंत मिनरल मिक्सचर शुरू करें और मद शुरू होने के 12-18 घंटे के बीच ही सीमन करवाएं।" },
        { stage: "दीर्घकालिक बांझपन चरण (3 से अधिक बार फिरना)", signs: "मद चक्र अनियमित (15 या 28 दिन), पेशाब के साथ तार में कभी-कभी सफेद कफ दिखना।", action: "गर्भाशय में संक्रमण की जांच कराएं और डॉक्टर से गर्भाशय की आंतरिक धुलाई कराएं।" }
      ],
      desiTreatment: [
        {
          name: "अंकुरित गेहूं, सौंफ व हल्दी का गर्भाशय शोधक नुस्खा",
          ingredients: "अंकुरित देशी गेहूं (250 ग्राम), पिसी सौंफ (50 ग्राम), पुराना गुड़ (100 ग्राम), शुद्ध हल्दी (20 ग्राम)।",
          preparation: "गेहूं को अंकुरित करें। उसमें सौंफ, हल्दी व गुड़ कूटकर मिलाएं। रोजाना सुबह खाली पेट लगातार 15 दिन तक खिलाएं।",
          precautions: "यदि डिस्चार्ज में पीला मवाद दिख रहा हो तो पहले डॉक्टर से गर्भाशय की दवा डलवाएं।"
        },
        {
          name: "एलोवेरा (घृतकुमारी) आंतरिक शोधन",
          ingredients: "ताजा एलोवेरा का गूदा (200 ग्राम), थोड़ी हल्दी (15 ग्राम)।",
          preparation: "एलोवेरा के कांटे छीलकर गूदे में हल्दी मिलाकर मद में आने के 3 दिन पहले से लगातार 7 दिन तक सुबह खाली पेट खिलाएं।",
          precautions: "यदि पशु गाभिन ठहर जाए तो एलोवेरा कदापि न दें (यह गर्भाशय संकुचन करता है)।"
        }
      ],
      essentialAdvisory: "यदि 3 बार प्राकृतिक या सीमन कराने पर भी पशु न रुके, तो किसी नीम-हकीम के चक्कर में न पड़ें। तुरंत अधिकृत वेटरनरी डॉक्टर से बच्चेदानी व अंडाशय की पीडी (Pregnancy Diagnosis/Gynec Rectal Exam) करवाएं।"
    },
    {
      id: "farmer_rop",
      nameHi: "जेर का रुकना (Retention of Placenta - ROP)",
      affectedOrgan: "बच्चेदानी (गर्भाशय)",
      causes: "ब्याने के समय कमजोरी, शरीर में कैल्शियम या विटामिन-ई व सेलेनियम की कमी, जुड़वा बच्चे होना या समय से पहले प्रसव।",
      effects: "बच्चेदानी में भयंकर सड़न पैदा होती है, तेज बुखार चढ़ता है, दूध सूख जाता है और भविष्य में बांझपन का 90% खतरा बढ़ जाता है।",
      currentStatusSigns: "ब्याने के 8 से 12 घंटे बीत जाने के बाद भी जेर बाहर न गिरना और योनि मार्ग से नीचे की ओर लटकती रहना।",
      stagesTimeline: [
        { stage: "प्राथमिक चरण (प्रसव के 6-12 घंटे)", signs: "जेर का कुछ भाग बाहर लटक रहा है, पशु सामान्य जुगाली कर रहा है।", action: "पारंपरिक बांस काढ़े का प्रयोग करें, हाथ से खींचने की गलती बिल्कुल न करें।" },
        { stage: "सड़न व संक्रमण चरण (18-24 घंटे बाद)", signs: "जेर से सड़े मांस की भयंकर दुर्गंध, मक्खियां भिनभिनाना, चारा छोड़ना व हल्का बुखार।", action: "तत्काल वेटरनरी डॉक्टर को बुलाकर गर्भाशय की सुरक्षित सफाई व एंटीबायोटिक उपचार कराएं।" }
      ],
      desiTreatment: [
        {
          name: "बांस पत्ता, अजवाइन व सोंठ का पारंपरिक काढ़ा",
          ingredients: "हरे बांस के ताजे पत्ते (500 ग्राम), अजवाइन (50 ग्राम), सोंठ (50 ग्राम), पुराना गुड़ (400 ग्राम), मेथी दाना (50 ग्राम)।",
          preparation: "3 लीटर पानी में सभी सामग्री कूटकर डालें। धीमी आंच पर उबालें जब तक पानी आधा (1.5 लीटर) न रह जाए। गुनगुना रहने पर ब्याने के 4 से 6 घंटे के भीतर पशु को पिलाएं।",
          precautions: "जेर पर ईंट, पत्थर या भारी वजन कभी न बांधें। न ही बलपूर्वक खींचें, इससे गर्भाशय पलट सकता है या रक्तस्राव से पशु मर सकता है।"
        }
      ],
      essentialAdvisory: "यदि ब्याने के 12 घंटे बाद भी जेर न गिरे, तो किसी अनाड़ी व्यक्ति से गर्भाशय में हाथ न डलवाएं। अनाड़ी हाथ डालने से गर्भाशय के बटन (Cotyledons) छिल जाते हैं। तुरंत अधिकृत डॉक्टर को बुलाएं।"
    },
    {
      id: "farmer_mastitis",
      nameHi: "थनैला रोग (थन की सूजन / Mastitis)",
      affectedOrgan: "थन एवं अयन (Udder & Teats)",
      causes: "दूध दुहने के बाद फर्श पर मौजूद गंदगी व जीवाणुओं का खुले थन के छेद से भीतर घुसना, थन पर चोट लगना, अंगूठा दबाकर गलत तरीके से दुहना।",
      effects: "दूध फटना, छिछड़े आना, थन का हमेशा के लिए मारा जाना (सूखना) और पशु का मूल्य कौड़ियों के भाव हो जाना।",
      currentStatusSigns: "थन में लाली, सूजन, अयन पत्थर जैसा कड़ा व छूने पर बहुत गर्म, दूध में पीले थक्के, पानी या खून आना, पशु का लात मारना।",
      stagesTimeline: [
        { stage: "शुरुआती अवस्था (Subclinical to Mild)", signs: "दूध की पहली धार में बारीक जालीदार छिछड़े, थन में हल्की गर्माहट।", action: "तुरंत थन का पूरा दूध खाली करें और एलोवेरा-हल्दी-चूना लेप लगाएं।" },
        { stage: "गंभीर अवस्था (Acute Clinical)", signs: "थन बिल्कुल पत्थर जैसा कठोर, दूध की जगह पीला पानी या खून, पशु को 104°F बुखार।", action: "बिना 1 घंटे की देरी के डॉक्टर से नस में इंजेक्शन व थन में ट्यूब डलवाएं।" }
      ],
      desiTreatment: [
        {
          name: "प्रसिद्ध एलोवेरा, हल्दी व चूना लेप (NDDB प्रमाणित)",
          ingredients: "ताजा एलोवेरा का गूदा (250 ग्राम), शुद्ध पिसी हल्दी (50 ग्राम), खाने वाला चूना (15 ग्राम)।",
          preparation: "तीनों को सिलबट्टे या मिक्सी में अच्छी तरह पीसकर लाल रंग का गाढ़ा पेस्ट बनाएं। इसमें थोड़ा पानी मिलाकर पतला करें। थन का पूरा दूध अच्छी तरह निकालकर दिन में 3 से 4 बार पूरे अयन पर लेप लगाएं।",
          precautions: "दूध निकालने से पहले थन को गुनगुने पानी से अच्छी तरह धो लें। यह लेप लगातार 5 दिन तक लगाएं।"
        },
        {
          name: "कागजी नींबू का रस उपचार",
          ingredients: "कागजी नींबू (4 से 5 नग)।",
          preparation: "रस निकालकर 250 मिली सादे पानी में घोलकर दिन में दो बार 3 दिन तक पिलाएं। यह थन के बढ़े हुए खारेपन (pH) को सामान्य करता है।",
          precautions: "पुराने पथरीले थनैला में केवल नींबू के भरोसे न बैठें।"
        }
      ],
      essentialAdvisory: "यदि थन से खून आ रहा हो, थन नीला-काला पड़ रहा हो या छूने पर ठंडा महसूस हो, तो यह गैंग्रीन थनैला है! तुरंत डॉक्टर को बुलाएं, 24 घंटे में थन हमेशा के लिए गलकर गिर सकता है।"
    },
    {
      id: "farmer_milk_fever",
      nameHi: "मिल्क फीवर (दुग्ध ज्वर / कैल्शियम की अचानक कमी)",
      affectedOrgan: "संपूर्ण शरीर (मांसपेशियां, तंत्रिकाएं व रक्त)",
      causes: "ब्याने के तुरंत बाद अधिक दूध देने वाली गाय-भैंसों में दूध के साथ शरीर का बहुत सारा कैल्शियम अचानक बाहर निकल जाना।",
      effects: "मांसपेशियां सुन्न हो जाती हैं, पशु उठने में असमर्थ होकर बैठ जाता है और समय पर इलाज न मिले तो 12-24 घंटे में मौत हो जाती है।",
      currentStatusSigns: "नाम 'फीवर' है परंतु शरीर बर्फ की भांति ठंडा हो जाता है, पशु गर्दन मोड़कर अपनी कोख (पुट्ठे) पर रखकर बैठ जाता है, कान लटक जाते हैं।",
      stagesTimeline: [
        { stage: "प्रथम चरण (चलने में लड़खड़ाहट)", signs: "पैरों में कंपकंपी, पिछले पैरों का कांपना, कान ठंडे होना, बेचैनी।", action: "तुरंत ओरल कैल्शियम जेल मुंह से चटाएं और पशु को सहारा दें।" },
        { stage: "द्वितीय व तृतीय चरण (गर्दन मोड़कर बैठना व कोमा)", signs: "पशु पूरी तरह बैठ जाता है, गर्दन 'S' आकार में मुड़ जाती है, आंखें पथरा जाती हैं, गोबर-पेशाब बंद।", action: "मुंह से कुछ भी न पिलाएं! तुरंत डॉक्टर से नस (I/V) में कैल्शियम की बोतल लगवाएं।" }
      ],
      desiTreatment: [
        {
          name: "शरीर को गर्माहट व सहारा (आपातकालीन प्राथमिक उपचार)",
          ingredients: "सूखी पराली/सूखा बिछावन, टाट की सूती बोरियां, सरसों तेल व लहसुन।",
          preparation: "पशु को सूखी पराली पर सीने के बल बैठाएं (Sternal position)। पूरे शरीर पर सूती बोरियां ढकें। लहसुन मिले गुनगुने सरसों तेल से कानों व खुरों की तेज मालिश करें।",
          precautions: "सख्त चेतावनी: बैठे हुए या अचेत पशु को कभी भी नाल या बोतल से तेल, काढ़ा या पानी न पिलाएं! तरल फेफड़ों में जाकर पशु की तुरंत दम घुटने से मौत हो जाती है।"
        }
      ],
      essentialAdvisory: "मिल्क फीवर एक शुद्ध आपातकालीन (Medical Emergency) रोग है! देसी नुस्खे केवल डॉक्टर के आने तक शरीर को गर्म रखने के लिए हैं। पशु को बचाने के लिए 1 घंटे के भीतर नस में कैल्शियम (Mifex) चढ़वाना अनिवार्य है।"
    },
    {
      id: "farmer_ketosis",
      nameHi: "कीटोशिस (दूध व सांस से मीठी गंध आना / ऊर्जा की कमी)",
      affectedOrgan: "लीवर (यकृत) एवं रूमेन",
      causes: "ब्याने के 2 से 8 सप्ताह बाद अधिक दूध देने वाले पशुओं में शरीर की आवश्यकता के अनुसार ग्लूकोज/ऊर्जा न मिलना, केवल सूखा तूड़ा खिलाना।",
      effects: "दूध का उत्पादन अचानक आधा रह जाता है, पशु बहुत तेजी से सूखकर कंकाल बन जाता है और लीवर में चर्बी जम जाती है।",
      currentStatusSigns: "पशु दाना, चोकर व खली खाना पूरी तरह छोड़ देता है और केवल गंदा सूखा भूसा खाता है। मुंह, सांस और पेशाब से नेलपॉलिश/क्लोरोफॉर्म जैसी मीठी गंध आती है।",
      stagesTimeline: [
        { stage: "पाचन संबंधी कीटोशिस", signs: "दाना न खाना, सूखा काला गोबर, दूध में भारी गिरावट, सुस्ती।", action: "तुरंत गुड़ व मीठा तेल देना शुरू करें और सुपाच्य दलिया दें।" },
        { stage: "नर्वस (पागलपन) कीटोशिस", signs: "दीवार से सिर दबाकर खड़े रहना, हवा में जीभ लहराना, लड़खड़ाना, अंधापन।", action: "तत्काल डॉक्टर द्वारा नस में 20% ग्लूकोज की बोतलें चढ़वाना अनिवार्य।" }
      ],
      desiTreatment: [
        {
          name: "गुड़, आटा व सरसों तेल का ऊर्जा मिश्रण",
          ingredients: "पुराना देशी गुड़ (500 ग्राम), गेहूं का आटा (250 ग्राम), मीठा सरसों का तेल (100 मिली)।",
          preparation: "गुड़ का गाढ़ा घोल बनाएं। उसमें आटा व सरसों का तेल अच्छी तरह फेंटकर पेड़ा बनाएं और रोजाना शाम को लगातार 5 से 7 दिन तक खिलाएं।",
          precautions: "अत्यधिक तेल एक साथ न दें, इससे पशु को दस्त लग सकते हैं।"
        }
      ],
      essentialAdvisory: "यदि पशु दाना पूरी तरह छोड़ दे और गोबर बहुत सूखा व कड़ा आने लगे, तो तुरंत डॉक्टर से प्रोपलीन ग्लाइकोल (Propylene glycol) व ग्लूकोज ड्रिप लगवाएं।"
    },
    {
      id: "farmer_bloat",
      nameHi: "तीव्र आफरा (पेट फूलना / गैस भरना / Bloat)",
      affectedOrgan: "पेट (रूमेन - बाईं कोख)",
      causes: "ओस वाली गीली बरसीम, लूसर्न, सड़ा-गला दाना, अधिक मात्रा में कच्चा आटा खा लेना जिससे रूमेन में झागदार गैस फंस जाती है।",
      effects: "फूला हुआ बायां पेट फेफड़ों और डायाफ्राम को दबा देता है, जिससे सांस लेने की जगह नहीं बचती और पशु की तड़पकर दम घुटने से मौत हो जाती है।",
      currentStatusSigns: "पशु की बाईं कोख ढोल की तरह फूल जाती है, थपथपाने पर 'ढब-ढब' की आवाज आती है, मुंह खोलकर जीभ बाहर निकाल हांफता है, बेचैन होकर लात मारता है।",
      stagesTimeline: [
        { stage: "हल्का आफरा", signs: "बाईं कोख में उभार, पशु बार-बार उठता-बैठता है, डकार बंद।", action: "तारपीन तेल, हींग व मीठे तेल का देसी घोल तुरंत नाल से दें।" },
        { stage: "गंभीर आपातकाल (दम घुटना)", signs: "जीभ पूरी बाहर, आंखें फटी हुई, लड़खड़ाकर गिरना, सांस रुकना।", action: "बाईं कोख के त्रिकोण में सुई या कैनुला चुभोकर तुरंत गैस बाहर निकालें।" }
      ],
      desiTreatment: [
        {
          name: "तारपीन तेल, सरसों तेल व हींग का आपातकालीन घोल",
          ingredients: "तारपीन का शुद्ध तेल (30 से 50 मिली), मीठा सरसों का तेल (250 से 300 मिली), असली हींग (10 ग्राम), काला नमक (30 ग्राम)।",
          preparation: "हींग को पीसकर गुनगुने सरसों के तेल में घोलें। उसमें तारपीन का तेल और काला नमक मिलाएं। नाल द्वारा सावधानीपूर्वक पशु को धीरे-धीरे पिलाएं।",
          precautions: "पशु का मुंह बहुत ऊंचा न उठाएं। मुंह में आड़ी लकड़ी या रस्सी बांध दें ताकि पशु उसे चबाता रहे; इससे लार गिरेगी और डकार आकर गैस निकलेगी।"
        }
      ],
      essentialAdvisory: "यदि दवा देने के 15-20 मिनट के भीतर गैस न निकले और पशु जमीन पर गिरकर हांफने लगे, तो बिना देरी किए डॉक्टर से बाईं कोख में ट्रोकार-कैनुला लगवाएं।"
    },
    {
      id: "farmer_hs",
      nameHi: "गलघोंटू (घुरका / नाविक ज्वर / Hemorrhagic Septicemia)",
      affectedOrgan: "गला, सांस नली, फेफड़े एवं रक्त",
      causes: "पाश्चुरेला जीवाणु का संक्रमण, जो विशेषकर बरसात के मौसम में गंदे गड्ढों का पानी पीने या अत्यधिक ठंड/गर्मी के तनाव से फैलता है।",
      effects: "गले में गर्म, दर्दनाक सूजन से श्वासनली पूरी तरह बंद हो जाती है और पशु 12 से 24 घंटे में दम घुटकर मर जाता है।",
      currentStatusSigns: "अत्यंत तेज बुखार (105-107°F), गले व जबड़े के नीचे भारी गर्म सूजन, सांस लेते समय घुर-घुर की तेज आवाज, मुंह से राल टपकना।",
      stagesTimeline: [
        { stage: "प्राथमिक ज्वर चरण", signs: "पशु सुस्त, आंखें लाल, तेज बुखार (106°F), हल्का घुरघुर।", action: "बिना 1 घंटे की भी देरी किए डॉक्टर से एंटीबायोटिक इंजेक्शन लगवाएं।" },
        { stage: "श्वास अवरोध चरण", signs: "गले में भारी सूजन, जीभ बाहर, सांस रुकना, आंखें फटना।", action: "जीवन रक्षा अत्यंत कठिन; तुरंत आपातकालीन एंटीबायोटिक व स्टेरॉयड आवश्यक।" }
      ],
      desiTreatment: [
        {
          name: "गले की सिकाई व कपूर-सरसों तेल लेप (केवल प्राथमिक राहत)",
          ingredients: "सरसों का तेल (100 मिली), भीमसेनी कपूर (10 ग्राम), तारपीन तेल (10 मिली)।",
          preparation: "गुनगुने सरसों तेल में कपूर घोलकर गले की सूजन पर हल्के हाथ से मालिश करें।",
          precautions: "सख्त चेतावनी: गलघोंटू में केवल देसी इलाज से पशु कभी नहीं बच सकता! यह केवल डॉक्टर के रास्ते में होने तक की प्राथमिक राहत है।"
        }
      ],
      essentialAdvisory: "गलघोंटू एक अति-घातक संक्रामक छूत का रोग है! तुरंत अधिकृत पशु चिकित्सक को बुलाएं। बीमार पशु को अन्य स्वस्थ पशुओं से तुरंत अलग बांधें और स्वस्थ पशुओं में तुरंत गलघोंटू का टीका लगवाएं।"
    },
    {
      id: "farmer_fmd",
      nameHi: "खुरपका-मुँहपका (मुंह-खुर की बीमारी / FMD)",
      affectedOrgan: "मुंह, जीभ, मसूड़े, खुरों के बीच की जगह एवं थन",
      causes: "अत्यधिक संक्रामक वायरस, जो हवा, चारे, पानी और बीमार पशु के संपर्क से बहुत तेजी से फैलता है।",
      effects: "पशु कई हफ्तों तक चारा नहीं खा पाता, दूध का उत्पादन हमेशा के लिए घट जाता है, पैर गलने से लंगड़ा हो जाता है और छोटे बछड़े दिल का दौरा पड़ने से मर जाते हैं।",
      currentStatusSigns: "तेज बुखार, मुंह से चिपचिपी राल (तारदार लार) का लगातार टपकना, होठों को चप-चप करना, जीभ व मसूड़ों पर फफोले व छाले, खुरों के बीच घाव, पैर पटकना।",
      stagesTimeline: [
        { stage: "छाले फूटने की अवस्था", signs: "मुंह व खुरों के फफोले फूटकर लाल घाव बनना, पशु का दाना-चारा छोड़ना।", action: "मुंह को फिटकरी पानी से और खुरों को नीम-फिनाइल से दिन में 3 बार धोएं।" },
        { stage: "जख्म व कीड़े पड़ने की अवस्था", signs: "खुरों के घाव में कीड़े (मैगट्स) पड़ना, खुर का खोल छूटने की नौबत।", action: "घाव पर कपूर-नीम तेल लगाएं और डॉक्टर से एंटीबायोटिक इंजेक्शन लगवाएं।" }
      ],
      desiTreatment: [
        {
          name: "मुंह के छालों हेतु फिटकरी व सुहागा-शहद लेप",
          ingredients: "पोटेशियम एलम (फिटकरी) 10 ग्राम, भुना हुआ सुहागा (बोरेक्स) 10 ग्राम, शुद्ध शहद (50 ग्राम)।",
          preparation: "1 लीटर हल्के गुनगुने पानी में फिटकरी घोलकर मुंह धोएं। धोने के बाद शहद में सुहागा मिलाकर जीभ व छालों पर लेप करें।",
          precautions: "पशु को चारा बारीक काटकर दलिया या ठंडी कांजी के रूप में दें।"
        },
        {
          name: "खुरों के घाव हेतु नीम व हल्दी का मरहम",
          ingredients: "उबले नीम के पत्तों का अर्क, हल्दी पाउडर (50 ग्राम), सरसों का तेल (100 मिली), कपूर (10 ग्राम)।",
          preparation: "नीम के पानी से खुर धोकर उस पर हल्दी, कपूर व सरसों तेल का लेप लगाएं ताकि मक्खी न बैठे।",
          precautions: "पशु को कीचड़ या गोबर में खड़ा न होने दें; सूखी रेतीली जगह बांधें।"
        }
      ],
      essentialAdvisory: "एफएमडी वायरस जनित है। घावों में कीड़े पड़ने, निमोनिया और थनैला से बचाने के लिए डॉक्टर से एंटीबायोटिक व दर्द निवारक इंजेक्शन का 3 दिन का कोर्स जरूर करवाएं।"
    },
    {
      id: "farmer_lsd",
      nameHi: "लंपी स्किन रोग (गांठदार त्वचा रोग / LSD)",
      affectedOrgan: "त्वचा, लिम्फ ग्रंथियां, पैर एवं आंखें",
      causes: "कैप्रिपॉक्स वायरस, जो मुख्य रूप से डास मक्खी, मच्छर और किलनी (चिचड़ी) के काटने से एक पशु से दूसरे में फैलता है।",
      effects: "खाल खराब होना, पैरों में भयंकर सूजन से लंगड़ापन, दूध का भारी नुकसान, बांझपन और फेफड़ों में गांठें बनने से निमोनिया।",
      currentStatusSigns: "तेज बुखार (105-106°F), पूरे शरीर पर 2 से 5 सेमी की कठोर गोल गांठें (Nodules), पैरों व गलकंबल में पानी की सूजन, आंख-नाक से पानी।",
      stagesTimeline: [
        { stage: "गांठें उभरने का चरण", signs: "तेज बुखार के साथ शरीर पर कठोर गिल्टियां उभरना, चारा कम करना।", action: "इम्यूनिटी बढ़ाने का हर्बल काढ़ा दें और मक्खी-मच्छर से बचाव करें।" },
        { stage: "गांठें फूटने व घाव बनने का चरण", signs: "गांठें फूटकर गहरे गड्ढे बनना, मवाद आना, पैरों में भारी सूजन।", action: "घावों पर नीम-हल्दी-कपूर तेल लगाएं और डॉक्टर से दवा लें।" }
      ],
      desiTreatment: [
        {
          name: "राष्ट्रीय स्वीकृत हर्बल इम्यूनिटी लड्डू (NDDB Formulated)",
          ingredients: "साबुत काली मिर्च (20 ग्राम), जीरा (20 ग्राम), हल्दी पाउडर (50 ग्राम), गिलोय के टुकड़े (50 ग्राम), तुलसी पत्ते (मुट्ठी भर), पुराना गुड़ (100 ग्राम)।",
          preparation: "सभी मसालों को कूटकर गुड़ में मिलाकर 2 बड़े लड्डू बनाएं। रोजाना सुबह-शाम 5 से 7 दिन तक खिलाएं।",
          precautions: "गाभिन पशु को गिलोय और हल्दी की मात्रा आधी कर दें।"
        },
        {
          name: "फूटी गांठों के घाव हेतु हर्बल मरहम",
          ingredients: "नीम का शुद्ध तेल (100 मिली), कपूर की 5 टिकिया (10 ग्राम), हल्दी पाउडर (20 ग्राम)।",
          preparation: "नीम तेल में कपूर और हल्दी मिलाकर दिन में दो बार फूटी हुई गांठों पर लगाएं।",
          precautions: "आंखों के अंदर यह तेल न जाने दें।"
        }
      ],
      essentialAdvisory: "यदि पशु के पैरों में अत्यधिक सूजन आ जाए जिससे वह खड़ा न हो सके, या सांस लेते समय गले से घुरघुर की आवाज आए, तो तुरंत डॉक्टर से संपर्क करें।"
    },
    {
      id: "farmer_surra",
      nameHi: "सर्रा रोग (मक्खी जनित दौरा रोग / Trypanosomiasis)",
      affectedOrgan: "रक्त एवं केंद्रीय तंत्रिका तंत्र (मस्तिष्क)",
      causes: "ट्रिपैनोसोमा प्रोटोजोआ, जो बरसात के बाद बड़ी डास मक्खियों (Tabanus flies) के काटने से खून में फैलता है।",
      effects: "खून का तेजी से टूटना, भयंकर रक्ताल्पता (Anemia), अंधापन, पागलों जैसे दौरे और अंततः मृत्यु।",
      currentStatusSigns: "रुक-रुक कर आने वाला तेज बुखार, गोल-गोल चक्कर काटना, दीवार से सिर टकराकर खड़े रहना, आंखों से पानी बहना व पुतली का सफेद होना, रात में अंधापन।",
      stagesTimeline: [
        { stage: "रक्त परजीवी चरण", signs: "रुक-रुक कर बुखार, आंखों से पानी, पेट व अंडकोष/अयन के नीचे पानी की सूजन।", action: "तुरंत खून की जांच कराएं और डॉक्टर से दवा लगवाएं।" },
        { stage: "मस्तिष्कीय तंत्रिका चरण (दौरे पड़ना)", signs: "पशु पागलों की तरह भागता है, गोल चक्कर काटता है, दांत पीसता है व गिर जाता है।", action: "बिना 1 घंटे की देरी के आपातकालीन इंजेक्शन न लगने पर पशु मर जाएगा।" }
      ],
      desiTreatment: [
        {
          name: "खून व ताकत बढ़ाने हेतु देशी शरबत (केवल सहायक)",
          ingredients: "पुराना देशी गुड़ (250 ग्राम), मेथी दाना (50 ग्राम), सोंठ (25 ग्राम), आंवला चूर्ण (50 ग्राम)।",
          preparation: "पानी में उबालकर काढ़ा बनाएं और ठंडा करके पिलाएं ताकि रक्त की कमी में कुछ सहारा मिले।",
          precautions: "कठोर चेतावनी: सर्रा रोग किसी भी देसी दवा, झाड़-फूंक या काढ़े से कभी ठीक नहीं होता! इसके लिए ट्राईक्विन (Triquin) या बेरेनिल (Berenil) इंजेक्शन अनिवार्य है।"
        }
      ],
      essentialAdvisory: "दीवार से सिर टकराने या गोल चक्कर काटने के लक्षण दिखते ही तुरंत पशु चिकित्सक को बुलाएं। यदि 24 घंटे में सही इंजेक्शन न लगा, तो पशु का दिमाग पूरी तरह नष्ट हो जाएगा।"
    },
    {
      id: "farmer_babesiosis",
      nameHi: "बबेशियोसिस (चिचड़ी वाला लाल पेशाब / Red Water)",
      affectedOrgan: "लाल रक्त कोशिकाएं (RBC) एवं गुर्दे (Kidneys)",
      causes: "संक्रमित चिचड़ी (किलनी/Ticks) के काटने से बबेशिया परजीवी का खून में जाना, जो खून के लाल कणों को फोड़ देता है।",
      effects: "खून बिल्कुल पानी बन जाता है, पेशाब के रास्ते खून बहने लगता है और 48 घंटे में पशु की कमजोरी से मौत हो जाती है।",
      currentStatusSigns: "तेज बुखार (105-106°F), पेशाब का रंग कॉफी, कोका-कोला या गहरा लाल होना, दिल की तेज धड़कन जो दूर से सुनाई दे, आंखें पीली/सफेद।",
      stagesTimeline: [
        { stage: "तेज बुखार व लाल पेशाब", signs: "पशु हांफता है, पेशाब का रंग गहरा लाल होता है, चारा छोड़ देता है।", action: "तुरंत डॉक्टर को बुलाएं; यह मिनटों का खेल है।" },
        { stage: "गंभीर एनीमिया व कोमा", signs: "पेशाब का रंग हल्का होना पर आंखें बिल्कुल सफेद पड़ जाना, पशु का गिर जाना।", action: "रक्त चढ़ाने (Blood Transfusion) व ग्लूकोज ड्रिप की आवश्यकता।" }
      ],
      desiTreatment: [
        {
          name: "शीतलता व ऊर्जा प्राथमिक सहायता (केवल सहायक)",
          ingredients: "गन्ने का ताजा रस (1 लीटर) या मिश्री व ग्लूकोज का ठंडा पानी, सिर पर ठंडा पानी।",
          preparation: "पशु को ठंडे छायादार स्थान पर बांधें। सिर पर ठंडा पानी डालें और गन्ने का रस या मिश्री का पानी पिलाएं।",
          precautions: "लाल पेशाब में कोई भी देसी नुस्खा बीमारी के कीटाणु को नहीं मार सकता; समय बिल्कुल बर्बाद न करें।"
        }
      ],
      essentialAdvisory: "लाल पेशाब देखते ही तुरंत डॉक्टर से बेरेनिल (Berenil) का सही डोज में इंजेक्शन लगवाएं। 24 घंटे की देरी का मतलब पशु की निश्चित मौत है।"
    },
    {
      id: "farmer_theileriosis",
      nameHi: "थायलेरियासिस (चिचड़ी बुखार / गिल्टियों की सूजन)",
      affectedOrgan: "लिम्फ ग्रंथियां (गिल्टियां), फेफड़े एवं रक्त",
      causes: "संक्रमित किलनी के काटने से थायलेरिया परजीवी का खून में प्रवेश, जो विशेषकर संकर (HF व जर्सी) गायों को बहुत तेजी से पकड़ता है।",
      effects: "फेफड़ों में पानी भरना, अत्यधिक खून की कमी और इलाज में देरी होने पर 80% मृत्यु दर।",
      currentStatusSigns: "लगातार तेज बुखार (105-107°F) जो पेरासिटामोल से नहीं उतरता, कंधे के आगे की गिल्टी (Prescapular lymph node) सूजकर अमरूद जैसी बड़ी होना, आंख की पुतली पर नीलापन।",
      stagesTimeline: [
        { stage: "गिल्टी सूजन व तेज बुखार", signs: "कंधे के पास कठोर गांठ, लगातार 106°F बुखार, आंख से पानी।", action: "तुरंत बुपारवाक्वोन (Buparvaquone) इंजेक्शन हेतु डॉक्टर को बुलाएं।" },
        { stage: "फेफड़ों में पानी व झागदार सांस", signs: "नाक से सफेद झाग, लगातार हांफना, आंखें सफेद व पीली होना।", action: "अत्यंत नाजुक स्थिति; सघन आईसीयू चिकित्सा आवश्यक।" }
      ],
      desiTreatment: [
        {
          name: "चिचड़ी नियंत्रण हेतु नीम व कपूर स्प्रे",
          ingredients: "नीम का गाढ़ा काढ़ा (1 लीटर), कपूर (20 ग्राम), नीलगिरी का तेल (10 मिली)।",
          preparation: "मिलाकर पशु के शरीर पर और बाड़े की दीवारों की दरारों में छिड़कें ताकि किलनी खत्म हों।",
          precautions: "बीमार गाय को धूप में कभी न बांधें।"
        }
      ],
      essentialAdvisory: "क्रॉस-ब्रीड गायों में थायलेरिया का एकमात्र पक्का इलाज बुपारवाक्वोन (Butalex) इंजेक्शन है। लक्षण दिखते ही तत्काल डॉक्टर से संपर्क करें।"
    },
    {
      id: "farmer_calf_scours",
      nameHi: "बछड़ों में सफेद दस्त (Calf Scours / सफेद पेचिश)",
      affectedOrgan: "पाचन तंत्र (आंतें)",
      causes: "जन्म के 2 घंटे के भीतर पर्याप्त खीस (Colostrum) न मिलना, गंदे बर्तनों से दूध पिलाना या ई-कोलाई बैक्टीरिया का संक्रमण।",
      effects: "2-3 दिन में बछड़े के शरीर का पूरा पानी निकल जाता है, गुर्दे काम करना बंद कर देते हैं और बछड़ा मर जाता है।",
      currentStatusSigns: "सफेद, पीला या मटमैला पानी जैसा पिचकारी दस्त, अत्यंत बदबूदार गोबर, बछड़े का सुस्त होकर जमीन पर लेटे रहना, दूध न पीना।",
      stagesTimeline: [
        { stage: "दस्त की शुरुआत", signs: "बछड़ा दूध छोड़ देता है, आंखें सुस्त, पूंछ पर पीला-सफेद गोबर चिपका होना।", action: "दूध देना तुरंत बंद करें और हर 2 घंटे में ओआरएस पानी पिलाएं।" },
        { stage: "गंभीर निर्जलीकरण (Dehydration)", signs: "त्वचा खींचने पर मुड़ी रह जाना, आंखें गड्ढे में धंसना, पैर ठंडे पड़ना।", action: "तत्काल डॉक्टर से नस द्वारा ड्रिप व एंटीबायोटिक लगवाएं।" }
      ],
      desiTreatment: [
        {
          name: "जीवन रक्षक नमक-चीनी-सोडा घोल (Home-made ORS)",
          ingredients: "उबला हुआ ठंडा पानी (1 लीटर), चीनी (20 ग्राम / 4 चम्मच), सादा नमक (3 ग्राम / आधा चम्मच), मीठा खाने का सोडा (2 ग्राम)।",
          preparation: "घोल बनाकर बछड़े को दिन में 4 से 5 बार 250 से 500 मिली थोड़ा-थोड़ा करके पिलाएं।",
          precautions: "दस्त की अवस्था में बछड़े को गाढ़ा दूध कदापि न पिलाएं। दूध आंतों में पचता नहीं है और सड़ांध बढ़ाता है।"
        }
      ],
      essentialAdvisory: "यदि बछड़े के कान व पैर ठंडे पड़ जाएं और वह सिर न उठा सके, तो घरेलू उपाय छोड़ तुरंत डॉक्टर से नस में ड्रिप (DNS) चढ़वाएं।"
    },
    {
      id: "farmer_coccidiosis",
      nameHi: "खूनी दस्त / आंत्रशोथ (Coccidiosis / पेचिश)",
      affectedOrgan: "आंतें (Intestines)",
      causes: "कॉकसीडिया प्रोटोजोआ परजीवी, जो गंदे पानी, सड़े चारे या नम कीचड़ वाले बाड़े के माध्यम से बछड़ों के पेट में जाता है।",
      effects: "आंतों की भीतरी चमड़ी छिल जाती है, खून की भारी कमी होती है और बछड़ा सूखकर कमजोर हो जाता है।",
      currentStatusSigns: "पतले बदबूदार दस्त जिसमें काला या गहरा लाल थक्केदार खून व आंव (म्यूकस) आती है, पशु दस्त करते समय बहुत जोर लगाता है।",
      stagesTimeline: [
        { stage: "शुरुआती पेचिश", signs: "गोबर में हल्का खून व आंव, बछड़े की पीठ धनुष की तरह मुड़ना।", action: "तुरंत छाछ व अनार छिलके का काढ़ा दें और ओआरएस पिलाएं।" },
        { stage: "गंभीर खूनी दस्त व कांच निकलना", signs: "केवल खून व छिछड़े गिरना, जोर लगाने से गुदा (कांच) बाहर आना।", action: "डॉक्टर द्वारा सल्फा दवाएं व खून रोकने वाले इंजेक्शन अनिवार्य।" }
      ],
      desiTreatment: [
        {
          name: "अनार छिलका, कच्चा बेल व छाछ का कषाय",
          ingredients: "अनार के सूखे छिलके (50 ग्राम), कच्चा बेल का गूदा (50 ग्राम), खट्टी छाछ (500 मिली), मेथी पाउडर (20 ग्राम)।",
          preparation: "छिलके व बेल को कूटकर छाछ में मिलाएं। दिन में दो बार बछड़े को पिलाएं। यह आंतों के घाव को भरता है।",
          precautions: "बाड़े के फर्श को सूखा रखें और चूने का छिड़काव करें।"
        }
      ],
      essentialAdvisory: "यदि दस्त में लाल खून आ रहा हो, तो तुरंत डॉक्टर से सल्फा बोलस या इंजेक्शन लगवाएं। समय पर दवा न मिलने पर बछड़ा 2 दिन में मर सकता है।"
    },
    {
      id: "farmer_foot_rot",
      nameHi: "खुर सड़न (खुरों का गलना / Foot Rot)",
      affectedOrgan: "खुरों के बीच की चमड़ी व ऊतक",
      causes: "बरसात में लगातार कीचड़ व गोबर में खड़े रहना, खुर में कंकड़ चुभने से सड़न पैदा करने वाले बैक्टीरिया का घुसना।",
      effects: "पशु एक या दो पैरों से बहुत गंभीर लंगड़ाता है, चरने नहीं जा पाता, सूख जाता है और दूध 60% घट जाता है।",
      currentStatusSigns: "खुरों के बीच में तेज दुर्गंधयुक्त मवाद, चीरा जैसा घाव, खुर के चारों ओर सूजन व छूने पर असहनीय दर्द, पैर झटकना।",
      stagesTimeline: [
        { stage: "शुरुआती सूजन व लंगड़ापन", signs: "खुर के बीच लाली, हल्का लंगड़ाना, पैर को बार-बार जमीन पर पटकना।", action: "खुर धोकर तूतिया (नीला थोथा) के पानी में पैर डुबोएं।" },
        { stage: "गंभीर सड़न व मवाद", signs: "सड़े मांस जैसी भयंकर दुर्गंध, खुर के जोड़ सूजना, मवाद बहना।", action: "खुर की तराशी करवाएं और डॉक्टर से एंटीबायोटिक इंजेक्शन लगवाएं।" }
      ],
      desiTreatment: [
        {
          name: "तूतिया (नीला थोथा) फुट-बाथ",
          ingredients: "तूतिया / कॉपर सल्फेट (50 ग्राम), साफ पानी (5 लीटर)।",
          preparation: "तूतिया को पानी में अच्छी तरह घोलें। उसमें पशु के संक्रमित पैर को 5 मिनट तक डुबोकर रखें।",
          precautions: "तूतिया अत्यंत विषैला होता है; ध्यान रहे पशु इस पानी को कदापि न पिए।"
        },
        {
          name: "कपूर, हल्दी व तारपीन लेप",
          ingredients: "हल्दी पाउडर (25 ग्राम), कपूर (10 ग्राम), तारपीन का तेल (30 मिली)।",
          preparation: "पेस्ट बनाकर खुरों के बीच के घाव में अच्छी तरह भरें और साफ सूती कपड़े से पट्टी बांध दें।",
          precautions: "पशु को गीली जमीन व दलदल से दूर सूखे पक्के स्थान पर बांधें।"
        }
      ],
      essentialAdvisory: "यदि खुर की सूजन ऊपर घुटने तक चढ़ जाए, तो इन्फेक्शन जोड़ में घुस चुका है। तुरंत डॉक्टर से एंटीबायोटिक व दर्द निवारक इंजेक्शन लगवाएं।"
    },
    {
      id: "farmer_prolapse",
      nameHi: "बच्चेदानी या फूल बाहर आना (पीछा दिखाना / Prolapse)",
      affectedOrgan: "योनि एवं गर्भाशय (Vagina / Uterus)",
      causes: "शरीर में कैल्शियम व फास्फोरस की भारी कमी, हार्मोन का असंतुलन, पशु को पीछे ढलान वाले स्थान पर बांधना, ब्याने के समय अत्यधिक जोर लगना।",
      effects: "बाहर निकले अंग पर चोट लगना, गोबर-मिट्टी लगने से सड़न, सेप्टीसीमिया और कुछ ही घंटों में पशु की तड़पकर मौत।",
      currentStatusSigns: "बैठने पर योनि से लाल रंग का फुटबॉल या तरबूज जैसा मांसल गोला बाहर निकलना, जो खड़े होने पर कभी अंदर जाता है या बाहर ही रह जाता है।",
      stagesTimeline: [
        { stage: "शुरुआती पीछा (बैठने पर हल्का दिखना)", signs: "पशु बैठता है तो छोटा गोला दिखता है, खड़े होते ही अंदर चला जाता है।", action: "पशु को पीछे से ऊंचा बांधें, मिनरल मिक्सचर दें और बर्फ की सिकाई करें।" },
        { stage: "पूर्ण प्रोलैप्स (स्थायी बाहर लटकना)", signs: "पूरा गर्भाशय बाहर लटक गया है, खून रिस रहा है, पशु दर्द से छटपटा रहा है।", action: "अंग को साफ गीले कपड़े से ढकें और तुरंत डॉक्टर को बुलाकर अंदर करवाएं।" }
      ],
      desiTreatment: [
        {
          name: "बर्फ व फिटकरी पानी से सूजन कम करना (आपातकालीन प्राथमिक उपचार)",
          ingredients: "बर्फ के टुकड़े, 1% फिटकरी का ठंडा घोल, साफ सूती सफेद चादर।",
          preparation: "बाहर निकले अंग को ठंडे फिटकरी पानी से धोएं और बर्फ की सिकाई करें ताकि अंग सिकुड़कर छोटा हो जाए। फिर उसे साफ गीली चादर में लपेटकर सहारा देकर रखें।",
          precautions: "अंग को जमीन, गोबर या मिट्टी में न रगड़ने दें। खुरदरे हाथों से जबरन अंदर धकेलने की कोशिश न करें।"
        }
      ],
      essentialAdvisory: "फूल बाहर आने पर बिना समय गंवाए अधिकृत वेटरनरी डॉक्टर को बुलाएं ताकि एनेस्थीसिया देकर अंग को सुरक्षित अंदर करवाकर टांके (Truss/Buhner suture) लगवाए जा सकें।"
    },
    {
      id: "farmer_metritis",
      nameHi: "गर्भाशय शोथ (बच्चेदानी में मैला या पीब आना / Metritis)",
      affectedOrgan: "बच्चेदानी (गर्भाशय)",
      causes: "ब्याने के समय गंदे हाथ डालना, जेर रुकने पर अनाड़ी व्यक्ति द्वारा खींचना या सीमन के समय संक्रमण।",
      effects: "बच्चेदानी में स्थायी सूजन आ जाती है, पशु कभी ग्याभिन नहीं ठहरता और दूध उत्पादन आधा रह जाता है।",
      currentStatusSigns: "योनि मार्ग से सफेद, पीला, कत्थई या बदबूदार मवाद/छिछड़े गिरना, विशेषकर जब पशु बैठता है या जुगाली करता है।",
      stagesTimeline: [
        { stage: "तीव्र मेट्राइटिस (ब्याने के 1-2 सप्ताह बाद)", signs: "तेज बदबूदार लाल-भूरा स्राव, हल्का बुखार, दूध घटना।", action: "तुरंत गर्भाशय धुलाई व एंटीबायोटिक उपचार करवाएं।" },
        { stage: "पुरानी (क्रोनिक) पीब", signs: "पशु स्वस्थ दिखता है पर गर्मी (मद) में शीशे जैसी साफ तार के बजाय मवाद गिरता है।", action: "डॉक्टर द्वारा गर्भाशय में 3 दिन लगातार एंटीबायोटिक दवा भरवाएं।" }
      ],
      desiTreatment: [
        {
          name: "नीम छाल, हल्दी व अजवाइन का आंतरिक शोधक काढ़ा",
          ingredients: "देशी नीम की छाल (100 ग्राम), हल्दी गांठ (50 ग्राम), अजवाइन (30 ग्राम), पुराना गुड़ (200 ग्राम)।",
          preparation: "2 लीटर पानी में पकाएं। 1 लीटर रहने पर छानकर 7 दिन तक रोजाना सुबह खाली पेट पिलाएं।",
          precautions: "बच्चेदानी के अंदर कोई भी देसी तेल, काढ़ा या राख सिरिंज से न डालें; इससे भयंकर संक्रमण फैल सकता है।"
        }
      ],
      essentialAdvisory: "मवाद आने की स्थिति में पशु को सीमन कभी न लगवाएं, सीमन पूरी तरह खराब हो जाएगा। पहले डॉक्टर से गर्भाशय में 3 दिन लगातार एंटीबायोटिक भरवाकर सफाई कराएं।"
    },
    {
      id: "farmer_indigestion",
      nameHi: "कब्ज, बदहजमी व रूमेन अक्रियता (Simple Indigestion)",
      affectedOrgan: "पेट (रूमेन - पहला अमाशय)",
      causes: "अचानक नया चारा खिलाना, फफूंद लगा तूड़ा, सूखा भूसा अधिक व पानी कम मिलना, प्लास्टिक खा लेना।",
      effects: "जुगाली बंद हो जाती है, पेट में चारा सड़ने लगता है और दूध उत्पादन अचानक गिर जाता है।",
      currentStatusSigns: "पशु जुगाली पूरी तरह बंद कर देता है, गोबर कड़ा, सूखा और काले रंग का आता है, पेट पर कान लगाने पर हलचल की आवाज नहीं आती।",
      stagesTimeline: [
        { stage: "हल्की सुस्ती", signs: "दाना छोड़ना, कम जुगाली, सूखा गोबर।", action: "पाचक पाचक मसाला व हींग दें।" },
        { stage: "पूर्ण रूमेन जाम", signs: "दो दिन से गोबर न आना, पेट में हल्का दर्द, आंखें सुस्त।", action: "सेंधा नमक, मैग्नीशियम सल्फेट जुलाब व रूमेन टॉनिक दें।" }
      ],
      desiTreatment: [
        {
          name: "पाचक संजीवनी मसाला पेड़ा",
          ingredients: "सोंठ (50 ग्राम), अजवाइन (50 ग्राम), काला नमक (50 ग्राम), जीरा (50 ग्राम), असली हींग (10 ग्राम), पुराना गुड़ (250 ग्राम)।",
          preparation: "सभी मसालों को बारीक कूटकर गुड़ में मिलाकर बड़ा पेड़ा बनाएं और सुबह-शाम 3 दिन तक खिलाएं।",
          precautions: "यदि पशु को बुखार हो तो पहले बुखार की दवा दें।"
        },
        {
          name: "सेंधा नमक व मीठा तेल जुलाब",
          ingredients: "मैग्नीशियम सल्फेट / सेंधा नमक (250 ग्राम), सरसों का तेल (200 मिली), गुनगुना पानी (1 लीटर)।",
          preparation: "घोलकर एक बार में पिलाएं ताकि आंतों में जमा सूखा गोबर बाहर निकल सके।",
          precautions: "पतले दस्त वाले पशु को यह जुलाब कभी न दें।"
        }
      ],
      essentialAdvisory: "यदि पाचक मसाला देने के 24 घंटे बाद भी पशु जुगाली शुरू न करे या बाईं कोख में गैस भरने लगे, तो डॉक्टर से रूमेन की जांच कराएं।"
    },
    {
      id: "farmer_maggot_wound",
      nameHi: "कीड़ेदार घाव (घाव में कीड़े पड़ना / Maggot Wound)",
      affectedOrgan: "त्वचा, सींग की जड़, खुर, नाभि या योनि",
      causes: "किसी भी सामान्य चोट या कटे पर मक्खी द्वारा अंडे देना, जिससे 24 घंटे में सैकड़ों रेंगने वाले कीड़े (मैगट्स) बन जाते हैं।",
      effects: "कीड़े जीवित मांस को अंदर तक खा जाते हैं, जिससे गहरा नासूर बन जाता है और सेप्टिक फैल जाता है।",
      currentStatusSigns: "घाव से सड़े मांस की भयंकर बदबू, खून-मवाद का रिसाव, घाव के अंदर सफेद कीड़ों का रेंगते हुए दिखाई देना।",
      stagesTimeline: [
        { stage: "शुरुआती कीड़े पड़ना", signs: "घाव में गड्ढा बनना, सफेद कीड़े रेंगना, पशु का छटपटाना।", action: "तारपीन तेल व कपूर की बत्ती ठूंसकर कीड़े मारें।" },
        { stage: "गहरा नासूर", signs: "हड्डी तक गहरा छेद हो जाना, खून बहना, पशु का खाना छोड़ना।", action: "कीड़े पूरी तरह निकालकर एंटीबायोटिक व घाव भरने वाला स्प्रे लगाएं।" }
      ],
      desiTreatment: [
        {
          name: "तारपीन का तेल व कपूर की बत्ती (कीड़े मारने का अचूक नुस्खा)",
          ingredients: "तारपीन का तेल (50 मिली), कपूर की 5-6 टिकिया, साफ रूई की बत्ती।",
          preparation: "तारपीन तेल में कपूर घोलें। रूई को इसमें भिगोकर घाव के गहरे छेद के अंदर ठूंस दें और 10 मिनट के लिए छोड़ दें। भाप से सारे कीड़े तड़पकर बाहर गिर जाएंगे।",
          precautions: "कीड़ों को चिमटी से चुन-चुनकर निकालें और फिनाइल वाले पानी में डालकर नष्ट करें।"
        },
        {
          name: "सीताफल (शरीफा) के पत्तों का रस",
          ingredients: "सीताफल के ताजे पत्ते (मुट्ठी भर)।",
          preparation: "पत्तों को पीसकर रस घाव में निचोड़ें; यह प्राकृतिक रूप से कीड़ों को तुरंत मार देता है।",
          precautions: "घाव को खुला न छोड़ें, उस पर हमेशा मक्खी-रोधी तेल या स्प्रे लगाएं।"
        }
      ],
      essentialAdvisory: "यदि कीड़े सिर की हड्डी या सींग के अंदर तक घुस चुके हों, तो स्वयं उपचार न करें; डॉक्टर से साइनस की सफाई करवाएं।"
    },
    {
      id: "farmer_navel_ill",
      nameHi: "बछड़ों में नाभि पकना (Navel Ill / Joint Ill)",
      affectedOrgan: "नाभि (Umbilicus) एवं जोड़ (घुटने/कोहनी)",
      causes: "जन्म के समय नाभि नाल को गंदे धागे या जंग लगे ब्लेड से काटना या उस पर टिंचर आयोडीन न लगाना।",
      effects: "नाभि में मवाद पड़ जाता है और वही जहर खून के रास्ते जोड़ों में पहुंचकर घुटने सुजा देता है, जिससे बछड़ा लंगड़ा हो जाता है।",
      currentStatusSigns: "नाभि पर कठोर, गर्म सूजन, छूने पर बछड़े का दर्द से चिल्लाना, नाभि से मवाद या खून रिसना, बाद में घुटनों में सूजन।",
      stagesTimeline: [
        { stage: "नाभि सूजन", signs: "नाभि का आकार बढ़ना, मवाद टपकना, हल्का बुखार।", action: "नाभि की पोविडोन आयोडीन से सफाई व हल्दी लेप।" },
        { stage: "जोड़ों में संक्रमण (जॉइंट इल)", signs: "घुटनों व कोहनी के जोड़ों में बड़ी सूजन, बछड़ा खड़ा नहीं हो पाता।", action: "दीर्घकालिक एंटीबायोटिक चिकित्सा की आवश्यकता।" }
      ],
      desiTreatment: [
        {
          name: "आयोडीन-हल्दी एंटीसेप्टिक पट्टी",
          ingredients: "पोविडोन आयोडीन लोशन (5%), शुद्ध पिसी हल्दी, साफ रूई।",
          preparation: "नाभि को अच्छी तरह आयोडीन से धोकर साफ करें और हल्दी का गाढ़ा लेप लगाएं।",
          precautions: "नाभि पर कभी भी गोबर या चूल्हे की राख न लगाएं।"
        }
      ],
      essentialAdvisory: "यदि बछड़े के घुटनों में सूजन आ जाए या नाभि से लगातार बदबूदार मवाद बहे, तो डॉक्टर से एंटीबायोटिक इंजेक्शन का कोर्स करवाएं।"
    },
    {
      id: "farmer_hcn_poisoning",
      nameHi: "जहरीली ज्वार विषाक्तता (HCN / धुरिन पॉइजनिंग)",
      affectedOrgan: "रक्त, श्वसन तंत्र एवं मस्तिष्क",
      causes: "सूखे के मौसम में 2 फीट से छोटी कच्ची ज्वार (चरी) या नई फूटी हुई ज्वार खिलाना, जिसमें धुरिन नामक साइनाइड जहर होता है।",
      effects: "खून में ऑक्सीजन का पहुंचना बंद हो जाता है, पशु का दम घुटता है और 15 से 30 मिनट में तड़पकर मौत हो जाती है।",
      currentStatusSigns: "ज्वार खाने के तुरंत बाद पशु का कांपना, आंखें फटना, मुंह से झाग निकलना, तेज सांस फूलना और जमीन पर गिरकर पैर पटकना।",
      stagesTimeline: [
        { stage: "अति-तीव्र विषाक्तता (पहले 15 मिनट)", signs: "लड़खड़ाना, अत्यधिक बेचैनी, तेज सांस, पेशाब निकल जाना।", action: "तुरंत नस में साइनाइड-विरोधी इंजेक्शन अनिवार्य।" },
        { stage: "अंतिम अवस्था", signs: "दौरे पड़ना, आंख की पुतलियां फैलना, सांस बंद होना।", action: "तत्काल आपातकालीन चिकित्सा।" }
      ],
      desiTreatment: [
        {
          name: "गुड़ व शीरे का प्राथमिक घोल (केवल जहर सोखने हेतु)",
          ingredients: "गाढ़ा देशी गुड़ (1 किलोग्राम) पानी में घुला हुआ।",
          preparation: "तुरंत पशु के मुंह में उड़ेलें ताकि गुड़ का शर्करा अंश साइनाइड के प्रभाव को कुछ हद तक धीमा कर सके।",
          precautions: "बेहोश पशु को कभी न पिलाएं। याद रखें: यह केवल डॉक्टर के पहुंचने तक 10-15 मिनट का समय बढ़ाने हेतु है।"
        }
      ],
      essentialAdvisory: "ज्वार का जहर अत्यंत तेज होता है! डॉक्टर को तुरंत फोन करें और कहें कि 'सोडियम थायोसल्फेट' (Sodium thiosulfate) का इंजेक्शन लेकर तुरंत पहुंचे।"
    },
    {
      id: "farmer_dystocia",
      nameHi: "ब्याने में कठिनाई (बच्चा फंसना / Dystocia)",
      affectedOrgan: "प्रसव मार्ग (श्रोणि, गर्भाशय एवं योनि)",
      causes: "बच्चे का आकार बहुत बड़ा होना, बच्चे के पैर या सिर मुड़े होना, या गाय की पेल्विस हड्डी संकरी होना।",
      effects: "समय पर सहायता न मिलने पर बच्चे और मां दोनों की तड़पकर मौत हो सकती है।",
      currentStatusSigns: "पानी की थैली फटने के 2 घंटे बाद भी बच्चा बाहर न आना, केवल एक पैर या पूंछ बाहर दिखना, गाय का थककर लेट जाना।",
      stagesTimeline: [
        { stage: "जोर लगाना", signs: "पशु लगातार जोर लगा रहा है, पर बच्चा आगे नहीं खिसक रहा।", action: "तुरंत पशु चिकित्सक को बुलाएं, स्थिति का परीक्षण कराएं।" },
        { stage: "थकान व संवेदनहीनता", signs: "पशु का दर्द बंद होना, बच्चे की हलचल बंद होना।", action: "आपातकालीन प्रसूति सहायता या सिजेरियन ऑपरेशन आवश्यक।" }
      ],
      desiTreatment: [
        {
          name: "प्रसव मार्ग को चिकना करना (केवल प्राथमिक मदद)",
          ingredients: "मीठा उबला हुआ ठंडा सरसों का तेल (500 मिली) या नीम का काढ़ा।",
          preparation: "हाथों को साबुन से अच्छी तरह धोकर और नाखून काटकर, सरसों का तेल योनि मार्ग के अंदर लगाएं ताकि सूखापन दूर हो और चिकनाई बने।",
          precautions: "अनाड़ी व्यक्ति बच्चे के पैरों को रस्सी या ट्रैक्टर से बांधकर कभी न खींचे; इससे गर्भाशय फट जाता है और गाय तुरंत मर जाती है।"
        }
      ],
      essentialAdvisory: "जल-थैली फूटने के 1 घंटे के भीतर यदि सामान्य प्रसव न हो, तो बिना किसी स्थानीय नीम-हकीम के तुरंत अधिकृत वेटरनरी डॉक्टर को बुलाएं।"
    },
    {
      id: "farmer_ephemeral_fever",
      nameHi: "तीन दिनी बुखार / ढाईया (Bovine Ephemeral Fever)",
      affectedOrgan: "जोड़, मांसपेशियां एवं रक्त वाहिकाएं",
      causes: "मच्छर व मक्खियों द्वारा फैलने वाला विषाणु जो अचानक जोड़ों में गंभीर सूजन पैदा करता है।",
      effects: "पशु 3 दिन के लिए पूरी तरह लंगड़ा या बैठ जाता है, दूध अस्थायी रूप से लगभग शून्य हो जाता है।",
      currentStatusSigns: "अचानक भयंकर तेज बुखार (105-107°F), चारों पैरों में अकड़न, चलने से पूरी तरह इनकार, आंखों-नाक से प्रचुर पानी।",
      stagesTimeline: [
        { stage: "तेज बुखार व अकड़न (दिन 1-2)", signs: "पशु कांपता है, पैर पटकता है या बैठ जाता है, जुगाली बंद।", action: "बुखार व सूजन की दवाएं दिलवाएं।" },
        { stage: "सुधार व रिकवरी (दिन 3-4)", signs: "तीसरे दिन बुखार उतरता है और पशु लड़खड़ाकर उठने लगता है।", action: "हल्का सुपाच्य चारा व गुड़ का दलिया दें।" }
      ],
      desiTreatment: [
        {
          name: "सोंठ, गिलोय व अजवाइन काढ़ा",
          ingredients: "गिलोय डंठल (50 ग्राम), सोंठ (30 ग्राम), अजवाइन (20 ग्राम), पुराना गुड़ (150 ग्राम)।",
          preparation: "1 लीटर पानी में उबालकर आधा करें। दिन में दो बार गुनगुना पिलाएं। यह जोड़ों के दर्द व अकड़न में बहुत राहत देता है।",
          precautions: "बैठे हुए पशु को दिन में दो बार करवट बदलवाएं ताकि सुन्न न पड़े।"
        }
      ],
      essentialAdvisory: "यद्यपि यह 3 दिन में ठीक होने वाला रोग है, परंतु तेज बुखार व दर्द के कारण पशु को डॉक्टर से दर्द निवारक इंजेक्शन दिलाना आवश्यक है।"
    }
  ];

  /* =========================================================================
     5. INITIALIZE EMPTY DOCTOR DISEASE DB & FALLBACK HOOK
     ========================================================================= */
  root.VETCARE_DISEASE_DB = root.VETCARE_DISEASE_DB || [];

})(typeof window !== "undefined" ? window : global);
