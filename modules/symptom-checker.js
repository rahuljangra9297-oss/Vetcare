// Vetcare AI OS - Master Ovine (Sheep) Diseases, Clinical Protocols & Therapeutics Database (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  /**
   * Master Ovine (Sheep) Clinical Database
   * Standardized under ISO-VET 2026, WOAH/OIE Terrestrial Animal Health Standards & Small Ruminant Clinical Practice Guidelines.
   */
  window.VetcareApp.ClinicalData.DiseasesOvine = [
    // =========================================================================
    // 1. ENTEROTOXAEMIA (PULPY KIDNEY DISEASE)
    // =========================================================================
    {
      id: "ovine-enterotoxaemia",
      name: "Enterotoxaemia (Pulpy Kidney Disease)",
      nameHi: "फिड़किया रोग / पल्पी किडनी (एंटरोटॉक्सीमिया)",
      category: "Bacterial",
      pathogen: "Clostridium perfringens Type D (Epsilon protoxin activated by intestinal trypsin)",
      morbidityMortality: {
        morbidityRate: "10% to 30% in high-risk flocks",
        mortalityRate: "95% to 100% in untreated clinical cases"
      },
      cardinalSymptoms: [
        "Sudden peracute death in the fastest-growing, best-conditioned lambs (सबसे स्वस्थ व मोटे मेमनों में अचानक मृत्यु)",
        "Severe opisthotonos with head retracted over the back (सिर का पीछे की ओर मुड़ना व धनुषाकार मुद्रा)",
        "Frothing at the mouth with champing of jaws and teeth grinding (मुंह से अत्यधिक झागदार लार व दांत पीसना)",
        "Violent clonic convulsions and paddling movements of legs (पैरों का पैडल की तरह चलना व भयंकर आक्षेप)",
        "Terminal pasty green diarrhea prior to collapse (मृत्यु से ठीक पूर्व हल्का हरा व पतला दस्त)"
      ],
      pathognomonicLesions: [
        "Rapid post-mortem kidney autolysis: Kidneys become soft, mushy, and butter-like ('Pulpy Kidney') within 2-4 hours of death",
        "Severe glycosuria: Urine glucose test dipstick reveals ++++ (1000-2000 mg/dL glucosuria)",
        "Focal Symmetrical Encephalomalacia (FSE) in internal capsule and basal ganglia",
        "Straw-colored hydropericardium containing gelatinous proteinaceous clots"
      ],
      treatmentRegimen: [
        {
          drug: "Procaine Penicillin G",
          dose: "20,000 to 30,000 IU/kg (approx. 1 to 1.5 mL/15 kg body weight)",
          route: "Intramuscular (IM)",
          frequency: "Every 24 hours for 3-5 days in subacute cases"
        },
        {
          drug: "Clostridium perfringens Type D Hyperimmune Antiserum",
          dose: "20 to 50 mL per sheep",
          route: "Subcutaneous (SC) or slow Intravenous (IV)",
          frequency: "Immediate single rescue emergency dose"
        },
        {
          drug: "Activated Charcoal & Kaolin Suspension",
          dose: "1 to 2 g/kg orally in warm water",
          route: "Oral drench (PO)",
          frequency: "Single dose to adsorb unabsorbed intestinal epsilon toxin"
        }
      ],
      supportiveCare: "Stop all concentrate grain, corn, and lush clover feeding immediately. Transition flock onto coarse dry grass hay. Administer oral warm rehydration fluids with sodium bicarbonate.",
      preventionVaccination: "Multi-component Clostridial vaccine (Enterotoxaemia / 8-in-1 vaccine). Ewes vaccinated 4-6 weeks prior to lambing to ensure high-titer colostral antibodies. Lambs vaccinated at 4-6 weeks of age with booster 3-4 weeks later; annual pre-monsoon booster.",
      isZoonotic: false,
      isNotifiable: false
    },

    // =========================================================================
    // 2. SHEEP POX (VARIOLA OVINA)
    // =========================================================================
    {
      id: "ovine-sheep-pox",
      name: "Sheep Pox (Variola Ovina)",
      nameHi: "भेड़ चेचक / माता रोग (शीप पॉक्स)",
      category: "Viral",
      pathogen: "Capripoxvirus (Double-stranded DNA virus, highly resistant in dry scabs)",
      morbidityMortality: {
        morbidityRate: "50% to 80% in naive flocks",
        mortalityRate: "Up to 50% in adult sheep; up to 85% in young suckling lambs"
      },
      cardinalSymptoms: [
        "Biphasic high fever up to 105.0°F - 107.0°F (40.5°C - 41.7°C) (अत्यधिक तीव्र ज्वर)",
        "Characteristic cutaneous eruptive lesions: Macules -> Papules (hard nodules) -> Necrotic scabs on unwoolled skin (त्वचा पर चेचक के दाने)",
        "Pock lesions clustered on lips, muzzle, nostrils, vulva, scrotum, and inner thighs (थूथन, ओंठ व जांघों पर विशिष्ट दाने)",
        "Severe mucopurulent oculonasal discharge and blepharoconjunctivitis (आंख-नाक से गाढ़ा मवाद जैसा स्राव)",
        "Extreme dyspnea, coughing, and respiratory distress due to lung pocks (फेफड़ों में दाने बनने से गंभीर सांस फूलना)"
      ],
      pathognomonicLesions: [
        "Firm, raised, circular reddish-gray nodules (pocks) throughout the lung parenchyma",
        "Gelatinous subcutaneous edema surrounding cutaneous pocks with central crater-like umbilication",
        "Ulcerative erosions and diptheritic membranes across the abomasal mucosa and turbinates"
      ],
      treatmentRegimen: [
        {
          drug: "Oxytetracycline Long-Acting (LA 200 mg/mL)",
          dose: "20 mg/kg (1 mL/10 kg body weight)",
          route: "Deep Intramuscular (IM)",
          frequency: "Single injection; repeat in 72 hours if respiratory signs persist (prevents secondary bacterial pneumonia)"
        },
        {
          drug: "Meloxicam",
          dose: "0.5 mg/kg (approx. 1 mL/10 kg body weight)",
          route: "Subcutaneous (SC) or IM",
          frequency: "Every 24 hours for 3 days to control fever and pain"
        },
        {
          drug: "Potassium Permanganate (1:1000) or Povidone-Iodine 5%",
          dose: "Topical application on ruptured pock lesions",
          route: "Topical rinse",
          frequency: "Twice daily to prevent fly strike (myiasis) and secondary bacterial sepsis"
        }
      ],
      supportiveCare: "Provide soft, green succulent forage and warm electrolyte-energy drench (molasses + dextrose). House affected animals in shaded, well-ventilated dry pens. Isolate infected sheep immediately.",
      preventionVaccination: "Live attenuated Sheep Pox vaccine (0.5 mL SC in ear tip or tail fold) administered annually to all sheep > 3 months of age before summer/monsoon. Strict quarantine of new stock for 21 days.",
      isZoonotic: false,
      isNotifiable: true
    },

    // =========================================================================
    // 3. BLUE TONGUE DISEASE
    // =========================================================================
    {
      id: "ovine-blue-tongue",
      name: "Blue Tongue Disease",
      nameHi: "नीली जीभ रोग (ब्लीटंग संलक्षण)",
      category: "Viral",
      pathogen: "Orbivirus (Reoviridae family; 29 distinct serotypes transmitted biological by Culicoides midges)",
      morbidityMortality: {
        morbidityRate: "30% to 70% during peak midge activity",
        mortalityRate: "20% to 50% in European/fine-wool breeds; lower in indigenous breeds"
      },
      cardinalSymptoms: [
        "High undulating fever (105.0°F - 107.0°F) with rapid emaciation (तीव्र बुखार व कमजोरी)",
        "Severe edema and swelling of the head, lips, muzzle, tongue, and throat (चेहरे, ओंठों व गले में पानी की सूजन)",
        "Hyperemic, cyanotic, and swollen tongue protruding from the mouth ('Blue Tongue') (सूजी हुई नीली-बैंगनी जीभ)",
        "Coronitis with distinct red-purple band at the hoof-coronet junction causing severe lameness (खुरों में सूजन व लंगड़ापन)",
        "Sheep grazing on their knees or standing with arched backs due to acute pododermatitis (घुटनों के बल चलकर चरना)"
      ],
      pathognomonicLesions: [
        "Pathognomonic focal hemorrhage and necrosis at the base of the pulmonary artery",
        "Severe sublingual, intermandibular, and facial edema",
        "Focal papillary muscle necrosis and petechiae in the left ventricular myocardium",
        "Skeletal muscle necrosis with Zenker's degeneration, especially in cervical muscles (torticollis)"
      ],
      treatmentRegimen: [
        {
          drug: "Flunixin Meglumine",
          dose: "1.1 to 2.2 mg/kg (approx. 1 to 2 mL/45 kg body weight)",
          route: "Intravenous (IV) or slow Intramuscular (IM)",
          frequency: "Every 24 hours for 3 days (potent anti-inflammatory for coronitis and edema)"
        },
        {
          drug: "Ceftiofur Sodium",
          dose: "1.1 to 2.2 mg/kg (approx. 1 mL/25 kg body weight)",
          route: "Subcutaneous (SC) or IM",
          frequency: "Every 24 hours for 3-5 days (prevents fatal secondary Pasteurella bronchopneumonia)"
        },
        {
          drug: "Dexamethasone Sodium Phosphate",
          dose: "0.1 mg/kg IV/IM (ONLY in non-pregnant ewes)",
          route: "Intravenous (IV) or IM",
          frequency: "Single dose in life-threatening laryngeal edema"
        }
      ],
      supportiveCare: "Strict shelter from direct sunlight (photophobia management). Provide soft gruel, crushed barley mash, and fresh leafy greens. Avoid moving animals on stony ground to prevent hoof horn avulsion.",
      preventionVaccination: "Inactivated or modified live polyvalent Blue Tongue vaccine administered 1 month prior to the monsoon season. Vector control: Insecticide spraying of sheep pens with Deltamethrin (0.005%); smoke smoldering at dusk; housing sheep indoors from twilight to dawn.",
      isZoonotic: false,
      isNotifiable: true
    },

    // =========================================================================
    // 4. CONTAGIOUS FOOT ROT
    // =========================================================================
    {
      id: "ovine-foot-rot",
      name: "Contagious Foot Rot",
      nameHi: "संक्रामक खुर सड़न (फुट रोट / खुरपका)",
      category: "Bacterial",
      pathogen: "Dichelobacter nodosus (produces keratolytic proteases) synergistic with Fusobacterium necrophorum",
      morbidityMortality: {
        morbidityRate: "40% to 80% in wet, warm pasture seasons",
        mortalityRate: "Under 2% (severe economic losses via weight loss, reduced wool, and poor fecundity)"
      },
      cardinalSymptoms: [
        "Severe, acute, non-weight-bearing lameness often affecting multiple limbs (तीव्र लंगड़ापन)",
        "Characteristic sickening, foul, necrotic odor emanating from interdigital spaces (खुरों से सड़ी हुई बदबू)",
        "Maceration and moist grayish-white exudate in the interdigital skin cleft (खुरों के बीच सफेद मवाद व छाल)",
        "Underrunning and separation of the hard hoof horn from the sensitive vascular laminae (खुर की सींग का उखड़ना)",
        "Sheep grazing while kneeling on carpal joints ('Kneeling Sheep') (घुटनों के बल चरना)"
      ],
      pathognomonicLesions: [
        "Complete detachment and underrunning of the sole and wall starting from the axial margin of the heel",
        "Liquefactive necrosis of the sensitive laminae without extensive deep tissue abscessation",
        "Characteristic pungent keratolytic odor unique to Dichelobacter nodosus"
      ],
      treatmentRegimen: [
        {
          drug: "Procaine Penicillin G + Dihydrostreptomycin",
          dose: "Penicillin 20,000 IU/kg + Streptomycin 20 mg/kg (1 mL/10 kg body weight)",
          route: "Intramuscular (IM)",
          frequency: "Single high-dose injection or repeat in 48 hours"
        },
        {
          drug: "Oxytetracycline Long-Acting (LA)",
          dose: "20 mg/kg (1 mL/10 kg body weight)",
          route: "Deep Intramuscular (IM)",
          frequency: "Single injection (highly curative in early under-running stages)"
        },
        {
          drug: "Zinc Sulfate 10% or Copper Sulfate 5% Foot Bath",
          dose: "Walk-through or stand-in foot bath (minimum 10-15 minutes soak)",
          route: "Topical immersion",
          frequency: "Twice weekly for 3 consecutive weeks"
        }
      ],
      supportiveCare: "Aggressive surgical hoof trimming (paring away loose detached horn to expose anaerobic bacteria to oxygen). Move flock to clean, dry, elevated pasture that has remained ungrazed for at least 14 days (bacteria survives < 10 days on pasture).",
      preventionVaccination: "Commercial Dichelobacter nodosus fimbrial vaccine. Quarantine all introduced sheep for 28 days with foot inspection and footbathing. Cull chronic carrier sheep with permanently deformed claws.",
      isZoonotic: false,
      isNotifiable: false
    },

    // =========================================================================
    // 5. COENUROSIS (GID / STURDY)
    // =========================================================================
    {
      id: "ovine-coenurosis",
      name: "Coenurosis (Gid / Sturdy / Turnsick)",
      nameHi: "गिड रोग / चक्कर रोग (मस्तिष्क सिस्ट / कोएन्यूरोसिस)",
      category: "Parasitic",
      pathogen: "Coenurus cerebralis (metacestode larval stage of the canine tapeworm Taenia multiceps)",
      morbidityMortality: {
        morbidityRate: "5% to 15% in flocks pastured with untreated guard dogs",
        mortalityRate: "100% in untreated progressive clinical cases"
      },
      cardinalSymptoms: [
        "Unilateral, compulsive circling in tight circles towards the affected side (एक ही दिशा में गोल-गोल चक्कर काटना)",
        "Persistent head tilt, abnormal high-stepping gait, and stumbling ataxia (सिर एक तरफ झुकना व लड़खड़ाहट)",
        "Unilateral or bilateral central blindness with absent menace response (एक आंख या दोनों से अंधापन)",
        "Compulsive head pressing against walls, posts, or feed troughs (दीवारों से सिर दबाकर खड़ा होना)",
        "Softening and thinning of the cranial skull bones over the cyst site ('Parchment-like' soft skull) (खोपड़ी की हड्डी का नरम पड़ना)"
      ],
      pathognomonicLesions: [
        "Large, translucent, unilocular fluid-filled cyst (5 to 10 cm) located within the cerebral cortex or cerebellum",
        "Inner membrane studded with hundreds of invaginated white tapeworm scolices arranged in clusters",
        "Severe local pressure atrophy of cerebral gyri with thinning of overlying frontal or parietal bone"
      ],
      treatmentRegimen: [
        {
          drug: "Surgical Trephination (Cystectomy)",
          dose: "Local infiltration of Lignocaine 2% (2-4 mL) -> Trephine opening -> Needle aspiration and complete extraction of intact cyst wall",
          route: "Surgical intervention",
          frequency: "Curative definitive procedure under aseptic field surgery"
        },
        {
          drug: "Albendazole Micronized 2.5%",
          dose: "25 mg/kg body weight (approx. 1 mL/1 kg orally)",
          route: "Oral drench (PO)",
          frequency: "Once daily for 7 consecutive days (effective only during early oncosphere migration)"
        },
        {
          drug: "Praziquantel",
          dose: "50 to 100 mg/kg",
          route: "Oral (PO)",
          frequency: "Once daily for 5 days in early non-cystic neural migration"
        }
      ],
      supportiveCare: "House in padded, dark, quiet pens to prevent self-trauma during circling. Hand-feed and hydrate recumbent sheep. Administer Dexamethasone (0.2 mg/kg IM) to mitigate perilesional cerebral edema.",
      preventionVaccination: "Strict deworming of all farm, shepherd, and guard dogs with Praziquantel (5 mg/kg orally) every 6-8 weeks. Absolutely prohibit dogs from scavenging or consuming raw sheep heads, brains, or discarded offal.",
      isZoonotic: true,
      isNotifiable: false
    },

    // =========================================================================
    // 6. FASCIOLOSIS (LIVER FLUKE DISEASE)
    // =========================================================================
    {
      id: "ovine-fasciolosis",
      name: "Fasciolosis (Liver Fluke Disease)",
      nameHi: "यकृत कृमि रोग / फैसियोलोसिस (लीवर फ्लूक)",
      category: "Parasitic",
      pathogen: "Fasciola gigantica and Fasciola hepatica (Snail intermediate host: Lymnaea spp.)",
      morbidityMortality: {
        morbidityRate: "30% to 75% in canal-irrigated or marshy lowland zones",
        mortalityRate: "Acute: up to 40% sudden deaths; Chronic: 10% to 25% due to cachexia"
      },
      cardinalSymptoms: [
        "Submandibular edema forming a fluid-filled dependent swelling ('Bottle Jaw') (जबड़े के नीचे पानी की थैली / बॉटल जॉ)",
        "Profound pallor of conjunctiva and mucous membranes reflecting severe anemia (आंखों की श्लेष्मा का सफेद पड़ना)",
        "Progressive emaciation, weakness, and dry, brittle wool that sheds easily ('Wool Break') (अत्यधिक कमजोरी व ऊन का झड़ना)",
        "Acute form: Sudden collapse, abdominal pain, and death due to massive parenchymal hemorrhage (अचानक मृत्यु)",
        "Ascites, fluid distension of the ventral abdomen, and chronic unthriftiness (पेट में पानी भरना)"
      ],
      pathognomonicLesions: [
        "Acute: Traumatic hemorrhagic hepatitis with numerous dark-red migratory tracks and subcapsular hematomas",
        "Chronic: 'Pipe-stem' liver with marked fibrosis, calcification, and thickening of the bile ducts",
        "Thickened bile ducts packed with hundreds of flat, leaf-shaped adult flukes",
        "Abundant clear, yellowish or blood-tinged transudate in the peritoneal cavity"
      ],
      treatmentRegimen: [
        {
          drug: "Triclabendazole (Fasinex 5%)",
          dose: "10 to 12 mg/kg body weight (approx. 2 to 2.4 mL/10 kg orally)",
          route: "Oral drench (PO)",
          frequency: "Drug of choice: kills all stages from 1-week-old immatures to adult flukes; repeat in 8-10 weeks"
        },
        {
          drug: "Closantel 5%",
          dose: "10 mg/kg (approx. 2 mL/10 kg body weight)",
          route: "Oral drench (PO) or Subcutaneous (SC)",
          frequency: "Effective against flukes > 6 weeks old and adult flukes + Haemonchus"
        },
        {
          drug: "Iron Dextran Injection",
          dose: "500 mg elemental iron per sheep (approx. 5 mL of 100 mg/mL)",
          route: "Deep Intramuscular (IM)",
          frequency: "Single dose to accelerate erythropoiesis in severe anemia"
        }
      ],
      supportiveCare: "High-protein diet supplemented with cottonseed cake, mineral blocks, Vitamin B12, and cobalt. Restrict grazing on wet marshlands, stream banks, and standing water edges.",
      preventionVaccination: "Strategic deworming schedule: Post-monsoon treatment (September/October) to kill acquired flukes, and pre-summer treatment (February/March) to reduce pasture egg contamination. Snail control via pasture drainage and copper sulfate application.",
      isZoonotic: true,
      isNotifiable: false
    },

    // =========================================================================
    // 7. CONTAGIOUS AGALACTIA
    // =========================================================================
    {
      id: "ovine-contagious-agalactia",
      name: "Contagious Agalactia",
      nameHi: "संक्रामक अगालैक्टिया (स्तन, जोड़ व आंख संलक्षण)",
      category: "Bacterial",
      pathogen: "Mycoplasma agalactiae (occasionally M. mycoides subsp. capri)",
      morbidityMortality: {
        morbidityRate: "30% to 60% in lactating dairy flocks",
        mortalityRate: "10% to 20% in adult sheep; up to 40% in suckling lambs due to starvation"
      },
      cardinalSymptoms: [
        "Classical clinical triad: Mastitis (Agalactia) + Arthritis + Keratoconjunctivitis (थनैला, जोड़ों का दर्द व आंख आना)",
        "Sudden, catastrophic drop in milk yield progressing to complete cessation of lactation (दूध का अचानक बंद होना)",
        "Milk changes to yellowish-green, watery, or curdy fluid containing gray clots (दूध का रंग बदलकर मवाद जैसा होना)",
        "Painful swelling of carpal, tarsal, and stifle joints with severe shifting lameness (घुटनों व जोड़ों में सूजन व लंगड़ापन)",
        "Keratitis with corneal cloudiness, central ulceration, and temporary blindness (आंखों में सफेदी, घाव व अंधापन)"
      ],
      pathognomonicLesions: [
        "Catarrhal to interstitial mastitis with rapid parenchymal atrophy and widespread fibrosis of the mammary gland",
        "Serofibrinous to purulent synovia in swollen joints with erosion of articular cartilage",
        "Corneal vascularization, pannus formation, and purulent anterior uveitis"
      ],
      treatmentRegimen: [
        {
          drug: "Tylosin Tartrate (200 mg/mL)",
          dose: "10 mg/kg body weight (1 mL/20 kg body weight)",
          route: "Intramuscular (IM)",
          frequency: "Every 12 to 24 hours for 3-5 consecutive days"
        },
        {
          drug: "Enrofloxacin 10%",
          dose: "5 mg/kg body weight (1 mL/20 kg body weight)",
          route: "Subcutaneous (SC) or IM",
          frequency: "Every 24 hours for 5 days"
        },
        {
          drug: "Ciprofloxacin 0.3% Eye Drops",
          dose: "2 to 3 drops per affected eye",
          route: "Ophthalmic instillation",
          frequency: "Three times daily for 5-7 days for keratitis"
        }
      ],
      supportiveCare: "Milking infected ewes last; boil and discard milk safely. Provide soft bedding to recumbent sheep. Supply artificial milk replacer to suckling lambs orphaned by agalactia.",
      preventionVaccination: "Formalin-inactivated aluminum hydroxide gel Mycoplasma agalactiae vaccine administered to pregnant ewes 4-6 weeks before lambing. Eliminate chronic carrier ewes shedding mycoplasma from milk or joints.",
      isZoonotic: false,
      isNotifiable: true
    },

    // =========================================================================
    // 8. PREGNANCY TOXAEMIA (TWIN LAMB DISEASE)
    // =========================================================================
    {
      id: "ovine-pregnancy-toxaemia",
      name: "Pregnancy Toxaemia (Twin Lamb Disease)",
      nameHi: "गर्भावस्था विषाक्तता / ट्विन लैम्ब कीटोसिस",
      category: "Metabolic",
      pathogen: "Severe negative energy balance, profound hypoglycemia, and hyperketonemia in late-pregnant ewes carrying twins/triplets",
      morbidityMortality: {
        morbidityRate: "5% to 25% in multiple-bearing ewes during the final 4-6 weeks of gestation",
        mortalityRate: "70% to 90% if untreated before ewe becomes recumbent"
      },
      cardinalSymptoms: [
        "Isolation from flock, sluggish demeanor, and reluctance to follow the shepherd (झुंड से अलग-थलग खड़ा होना)",
        "Apparent central blindness: Ewe walks into fences, trees, and obstacles without flinching (स्पष्ट अंधापन)",
        "Sweet, sickly, pungent acetone/ketone breath odor detectable on muzzle (मुंह से मीठे सिरके या एसीटोन जैसी महक)",
        "Muscle tremors of the muzzle, twitching of ears, and champing of jaws (थूथन व कानों में कंपकंपी)",
        "Sternal recumbency with head turned into the flank, progressing to coma and death (बैठ जाना, कोमा व मृत्यु)"
      ],
      pathognomonicLesions: [
        "Enlarged, friable, pale yellow-orange fatty liver with rounded margins (severe hepatic lipidosis)",
        "Presence of multiple fetuses (twins, triplets) in the gravid uterus",
        "Marked acetonuria / glucosuria on urine dipstick; profound serum beta-hydroxybutyrate (BHBA > 3.0 mmol/L)"
      ],
      treatmentRegimen: [
        {
          drug: "Propylene Glycol (Pure Pharmaceutical Grade)",
          dose: "60 to 100 mL orally per ewe",
          route: "Oral drench (PO)",
          frequency: "Twice daily for 3-5 days (provides immediate gluconeogenic substrate)"
        },
        {
          drug: "Dextrose 50% Injection",
          dose: "50 to 100 mL warmed to body temperature",
          route: "Slow Intravenous (IV) bolus",
          frequency: "Immediate emergency bolus, followed by 5% Dextrose infusion"
        },
        {
          drug: "Dexamethasone Sodium Phosphate",
          dose: "15 to 20 mg total per ewe (approx. 3-4 mL of 5 mg/mL)",
          route: "Intramuscular (IM)",
          frequency: "Single dose: Induces emergency parturition/abortion within 24-48 hours to remove fetal glucose drain"
        },
        {
          drug: "Recombinant Human Regular Insulin",
          dose: "0.4 IU/kg body weight",
          route: "Subcutaneous (SC)",
          frequency: "Once daily combined with dextrose therapy to suppress peripheral lipolysis and ketogenesis"
        }
      ],
      supportiveCare: "House in warm, sheltered, draft-free pen. Provide warm water containing 50 g molasses or dextrose. Perform emergency Caesarean section if ewe is valuable and close to term (> 140 days gestation).",
      preventionVaccination: "Ultrasound scanning of ewes at 50-70 days of gestation to identify twin/triplet pregnancies. Formulate high-energy concentrate feeding (0.5 to 1.0 kg/head/day containing bypass protein and cereals) during the final 6 weeks of gestation. Avoid sudden feed transitions, shearing stress, or cold fasting.",
      isZoonotic: false,
      isNotifiable: false
    }
  ];

  // ===========================================================================
  // 9. HELPER SEARCH & RETRIEVAL API METHODS
  // ===========================================================================
  /**
   * Fetches an ovine disease record by its exact unique ID.
   * @param {string} id - Disease ID (e.g., 'ovine-enterotoxaemia')
   * @returns {object|null}
   */
  window.VetcareApp.ClinicalData.getOvineDiseaseById = function (id) {
    if (!id) return null;
    const cleanId = String(id).toLowerCase().trim();
    const list = window.VetcareApp.ClinicalData.DiseasesOvine;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id.toLowerCase() === cleanId) {
        return list[i];
      }
    }
    return null;
  };

  /**
   * Fuzzy searches ovine diseases across English name, Hindi name, pathogen, and symptoms.
   * @param {string} query - Search term in English or Hindi
   * @returns {Array<object>}
   */
  window.VetcareApp.ClinicalData.searchOvineDiseases = function (query) {
    if (!query) return window.VetcareApp.ClinicalData.DiseasesOvine.slice();
    const q = String(query).toLowerCase().trim();
    return window.VetcareApp.ClinicalData.DiseasesOvine.filter(function (d) {
      if (d.name.toLowerCase().indexOf(q) !== -1) return true;
      if (d.nameHi.toLowerCase().indexOf(q) !== -1) return true;
      if (d.pathogen.toLowerCase().indexOf(q) !== -1) return true;
      if (d.category.toLowerCase().indexOf(q) !== -1) return true;
      const matchSymptom = d.cardinalSymptoms.some(function (s) {
        return s.toLowerCase().indexOf(q) !== -1;
      });
      if (matchSymptom) return true;
      return false;
    });
  };

  /**
   * Filters ovine diseases by their diagnostic category.
   * @param {string} category - 'Bacterial' | 'Viral' | 'Parasitic' | 'Metabolic'
   * @returns {Array<object>}
   */
  window.VetcareApp.ClinicalData.getOvineDiseasesByCategory = function (category) {
    if (!category) return [];
    const cat = String(category).toLowerCase().trim();
    return window.VetcareApp.ClinicalData.DiseasesOvine.filter(function (d) {
      return d.category.toLowerCase() === cat;
    });
  };

  // Seal the clinical database to protect clinical data integrity at runtime
  Object.freeze(window.VetcareApp.ClinicalData.DiseasesOvine);

  if (window.VetcareApp.showToast) {
    window.VetcareApp.showToast("भेड़ रोग एवं नैदानिक डेटाबेस सक्रिय (Ovine Diseases Loaded)", "success");
  }
})();

// ============================================================================
// Vetcare AI OS - Interactive Symptom Checker, Differential Diagnostic Inference & Triage UI Module (2026 Production)
// ============================================================================

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE & MODULE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};

  /**
   * Master Interactive Clinical Symptom Checker & Triage Workspace
   * Delivers reactive multi-species differential diagnosis inference, statutory bio-alert handling,
   * contraindication auditing, and cross-module electronic prescription dispatching.
   */
  window.VetcareApp.Modules.SymptomChecker = {
    // -------------------------------------------------------------------------
    // 2. INTERNAL STATE MANAGEMENT
    // -------------------------------------------------------------------------
    state: {
      selectedSpecies: "bovine",
      selectedSystem: "all",
      selectedSymptoms: [],
      patientMetadata: {
        ageGroup: "adult",
        lactating: false,
        pregnant: false,
        recentCalvingDays: null,
        tempStatus: "normal" // 'normal' | 'high_fever' | 'subnormal'
      },
      searchResults: [],
      currentContainerId: null,
      isInitialized: false
    },

    // -------------------------------------------------------------------------
    // 3. MASTER SPECIES & SYSTEM TAXONOMIES
    // -------------------------------------------------------------------------
    speciesCatalog: [
      { id: "bovine", labelEn: "Cattle (Cow)", labelHi: "गाय (गोवंश)", icon: "fa-cow" },
      { id: "bubaline", labelEn: "Buffalo", labelHi: "भैंस (महिषवंश)", icon: "fa-shield-cat" },
      { id: "caprine", labelEn: "Goat", labelHi: "बकरी (अजा)", icon: "fa-seedling" },
      { id: "ovine", labelEn: "Sheep", labelHi: "भेड़ (मेष)", icon: "fa-cloud" },
      { id: "equine", labelEn: "Horse", labelHi: "घोड़ा (अश्व)", icon: "fa-horse" },
      { id: "canine", labelEn: "Dog", labelHi: "कुत्ता (श्वान)", icon: "fa-dog" },
      { id: "feline", labelEn: "Cat", labelHi: "बिल्ली (मार्जार)", icon: "fa-cat" },
      { id: "avian", labelEn: "Poultry", labelHi: "मुर्गी / पक्षी", icon: "fa-dove" }
    ],

    organSystems: [
      { id: "all", labelEn: "All Systems", labelHi: "समस्त अंग तंत्र", icon: "fa-cubes" },
      { id: "systemic", labelEn: "Systemic & Fever", labelHi: "सामान्य व ज्वर", icon: "fa-temperature-high" },
      { id: "digestive", labelEn: "Digestive & Ruminal", labelHi: "पाचन व रूमेन", icon: "fa-utensils" },
      { id: "respiratory", labelEn: "Respiratory", labelHi: "श्वसन तंत्र", icon: "fa-lungs" },
      { id: "locomotor", labelEn: "Locomotor & Hoof", labelHi: "गति व खुर", icon: "fa-shoe-prints" },
      { id: "urogenital", labelEn: "Urogenital & Urine", labelHi: "मूत्र व जनन", icon: "fa-droplet" },
      { id: "neurological", labelEn: "Neurological", labelHi: "तंत्रिका तंत्र", icon: "fa-brain" },
      { id: "dermatological", labelEn: "Skin & Pocks", labelHi: "त्वचा व चकत्ते", icon: "fa-hand-dots" },
      { id: "mammary", labelEn: "Udder & Milk", labelHi: "अयन व दुग्ध", icon: "fa-bucket" }
    ],

    // -------------------------------------------------------------------------
    // 4. MASTER BILINGUAL SYMPTOM DICTIONARY
    // -------------------------------------------------------------------------
    symptomDictionary: [
      // Systemic & Fever
      { id: "high_fever", en: "High Fever (> 104°F / 40°C)", hi: "तेज बुखार (> 104°F)", system: "systemic", species: ["all"] },
      { id: "subnormal_temp", en: "Subnormal Temperature (< 100°F)", hi: "शरीर का ठंडा पड़ना (< 100°F)", system: "systemic", species: ["all"] },
      { id: "sudden_death", en: "Peracute Sudden Death", hi: "आकस्मिक / अचानक मृत्यु", system: "systemic", species: ["all"] },
      { id: "anorexia_dullness", en: "Anorexia & Severe Depression", hi: "भूख न लगना व अत्यधिक सुस्ती", system: "systemic", species: ["all"] },
      { id: "bottle_jaw", en: "Submandibular Edema (Bottle Jaw)", hi: "जबड़े के नीचे पानी की थैली (बॉटल जॉ)", system: "systemic", species: ["bovine", "bubaline", "caprine", "ovine"] },
      { id: "swollen_lymph_nodes", en: "Swollen Superficial Lymph Nodes", hi: "कंधे/जांघ की गिल्टी में सूजन", system: "systemic", species: ["bovine", "bubaline", "caprine", "ovine"] },
      { id: "pale_white_mucosa", en: "Chalky Pale Mucosa (Severe Anemia)", hi: "मसूड़ों/आंखों का सफेद पड़ना (रक्ताल्पता)", system: "systemic", species: ["all"] },
      { id: "jaundice_icterus", en: "Yellow Icteric Gums/Mucosa", hi: "पीलिया (पीली आंखें व मसूड़े)", system: "systemic", species: ["all"] },

      // Digestive & Ruminal
      { id: "frothy_bloat", en: "Frothy Bloat (Pasture Tympany)", hi: "झागदार अफारा (हरी घास जनित)", system: "digestive", species: ["bovine", "bubaline", "caprine", "ovine"] },
      { id: "free_gas_bloat", en: "Free Gas Bloat (Left Flank Distension)", hi: "गैस का अफारा (बाईं कोख फूलना)", system: "digestive", species: ["bovine", "bubaline", "caprine", "ovine"] },
      { id: "choke_salivation", en: "Esophageal Choke with Heavy Salivation", hi: "गले में आलू/चारा अटकना व लार बहना", system: "digestive", species: ["bovine", "bubaline", "equine"] },
      { id: "pipe_stream_diarrhea", en: "Chronic Watery Pipe-Stream Diarrhea", hi: "फव्वारे जैसा पुराना पतला दस्त", system: "digestive", species: ["bovine", "bubaline"] },
      { id: "foul_bloody_diarrhea", en: "Foul Fetid Bloody Diarrhea (Scours)", hi: "सड़ी बदबूदार खूनी दस्त", system: "digestive", species: ["canine", "feline", "bovine"] },
      { id: "strawberry_jam_stool", en: "Strawberry Jam Bloody Gelatinous Stool", hi: "स्ट्रॉबेरी जैम जैसा खूनी मल", system: "digestive", species: ["canine"] },
      { id: "projectile_vomiting", en: "Intractable Projectile Vomiting", hi: "तेज फव्वारे जैसी लगातार उल्टी", system: "digestive", species: ["canine", "feline"] },
      { id: "colic_kicking_belly", en: "Visceral Colic (Kicking at Abdomen)", hi: "पेट दर्द / पेट पर लात मारना", system: "digestive", species: ["equine", "bovine", "bubaline"] },

      // Respiratory
      { id: "stertorous_dyspnea", en: "Stertorous Grunting Breathing", hi: "घरघराहट भरी कष्टकारी सांस", system: "respiratory", species: ["bovine", "bubaline", "canine"] },
      { id: "hot_throat_edema", en: "Hot Painful Submandibular Throat Edema", hi: "गले के नीचे गर्म दर्दनाक सूजन (गलघोंटू)", system: "respiratory", species: ["bovine", "bubaline"] },
      { id: "goose_honk_cough", en: "Harsh Dry 'Goose-Honk' Paroxysmal Cough", hi: "हंस जैसी सूखी तीखी खांसी (केनल कफ)", system: "respiratory", species: ["canine"] },
      { id: "expiratory_wheezing", en: "Expiratory Wheezing & Open-Mouth Breathing", hi: "सीटी जैसी सांस व मुंह खोलकर हांफना", system: "respiratory", species: ["feline"] },
      { id: "mucopurulent_nasal_discharge", en: "Thick Mucopurulent Nasal Discharge", hi: "नाक से गाढ़ा मवाद जैसा स्राव", system: "respiratory", species: ["all"] },

      // Locomotor & Hoof
      { id: "downer_cow_recumbency", en: "Downer / Sternal Recumbency Unable to Rise", hi: "बैठने के बाद उठने में पूर्ण असमर्थ", system: "locomotor", species: ["bovine", "bubaline"] },
      { id: "s_shaped_neck", en: "S-Shaped Neck Curvature / Kinked Neck", hi: "गर्दन का 'S' आकार में मुड़ना (दुग्ध ज्वर)", system: "locomotor", species: ["bovine", "bubaline"] },
      { id: "split_legs_abduction", en: "Split Legs / Inability to Adduct Limbs", hi: "पिछले पैर फिसलकर फैल जाना (स्प्लिट लेग्स)", system: "locomotor", species: ["bovine", "bubaline"] },
      { id: "foot_rot_lameness", en: "Foul Hoof Rot / Grazing on Knees", hi: "खुर सड़न, दुर्गंध व घुटनों के बल चरना", system: "locomotor", species: ["ovine", "caprine", "bovine"] },
      { id: "coronitis_hoof_band", en: "Red Coronary Band Swelling (Bluetongue)", hi: "खुर के मुकुट पर लाल-बैंगनी पट्टी व सूजन", system: "locomotor", species: ["ovine"] },

      // Urogenital & Urine
      { id: "coffee_red_urine", en: "Dark Red / Coffee-Colored Urine", hi: "कॉफी या गहरे लाल रंग का पेशाब", system: "urogenital", species: ["bovine", "bubaline", "equine"] },
      { id: "blood_clots_in_urine", en: "Gross Blood Clots in Clear Urine", hi: "पेशाब में साबुत खून के थक्के (रक्तमेह)", system: "urogenital", species: ["bovine"] },
      { id: "sweet_acetone_breath", en: "Sweet Sickly Ketone Acetone Breath", hi: "मुंह से मीठे सिरके या एसीटोन की महक", system: "urogenital", species: ["bovine", "ovine", "caprine"] },
      { id: "recent_dystocia", en: "History of Severe Calving Dystocia", hi: "कठिन प्रसव या बछड़ा खींचने का इतिहास", system: "urogenital", species: ["bovine", "bubaline", "equine"] },

      // Neurological
      { id: "circling_one_direction", en: "Compulsive Circling in One Direction", hi: "एक ही दिशा में गोल चक्कर काटना (गिड)", system: "neurological", species: ["ovine", "caprine"] },
      { id: "opisthotonos_stargazing", en: "Opisthotonos (Head Retracted to Back)", hi: "सिर पीछे की ओर खिंचना व आक्षेप", system: "neurological", species: ["ovine", "caprine", "bovine"] },
      { id: "pinpoint_pupils", en: "Pinpoint Miosis with Muscle Twitching", hi: "सुई के छेद जैसी पुतलियां (कीटनाशक जहर)", system: "neurological", species: ["canine", "feline"] },
      { id: "chewing_gum_fits", en: "Rhythmic 'Chewing-Gum' Jaw Champing", hi: "जबड़ा चबाने जैसी गति / डिस्टेंपर दौरे", system: "neurological", species: ["canine"] },
      { id: "dropped_jaw_salivation", en: "Dropped Paralytic Jaw & Voice Change", hi: "निचला जबड़ा लटक जाना व आवाज बदलना", system: "neurological", species: ["canine", "bovine"] },
      { id: "apparent_blindness_sturdy", en: "Apparent Blindness / Walking into Walls", hi: "दीवारों से टकराना व स्पष्ट अंधापन", system: "neurological", species: ["ovine", "caprine"] },

      // Dermatological
      { id: "crusted_pock_papules", en: "Eruptive Pocks & Papules on Lips/Udder", hi: "थूथन, ओंठ व अयन पर चेचक के दाने", system: "dermatological", species: ["ovine", "caprine", "bovine"] },
      { id: "pinna_crusting_scabies", en: "Ear Margin Crusts with Pedal Scratch Reflex", hi: "कान के किनारों पर पपड़ी व खुजलाने की ऐंठन", system: "dermatological", species: ["canine"] },
      { id: "white_skin_photosensitization", en: "Sunburn / Sloughing Exclusively on White Skin", hi: "केवल सफेद बालों वाली त्वचा का धूप में झुलसना", system: "dermatological", species: ["bovine", "ovine", "equine"] },
      { id: "hard_footpad_hyperkeratosis", en: "Thickened Hard Pads on Paws and Nose", hi: "नाक व पंजों का पत्थर जैसा सख्त होना", system: "dermatological", species: ["canine"] },

      // Mammary & Milk
      { id: "hard_swollen_hot_teat", en: "Hard, Hot, Swollen Quarter (Mastitis)", hi: "थन का पत्थर जैसा कड़ा व सूज जाना", system: "mammary", species: ["bovine", "bubaline", "caprine", "ovine"] },
      { id: "watery_yellow_serous_milk", en: "Watery Yellow Serous Milk with Clots", hi: "दूध की जगह पीला पानी व थक्के आना", system: "mammary", species: ["bovine", "bubaline"] },
      { id: "blood_in_milk", en: "Blood-Stained Pink or Red Milk", hi: "दूध में खून का आना (गुलाबी/लाल दूध)", system: "mammary", species: ["bovine", "bubaline"] },
      { id: "complete_loss_of_milk", en: "Complete Agalactia with Joint Arthritis", hi: "दूध का पूर्ण बंद होना व जोड़ों में सूजन", system: "mammary", species: ["ovine", "caprine"] }
    ],

    // -------------------------------------------------------------------------
    // 5. LIFECYCLE METHODS: INIT, RENDER, DESTROY
    // -------------------------------------------------------------------------
    init: function () {
      this.state.isInitialized = true;
      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("सिंड्रोमिक लक्षण चेकर मॉड्यूल तैयार (Symptom Checker Ready)", "info");
      }
    },

    destroy: function () {
      if (this.state.currentContainerId) {
        const container = document.getElementById(this.state.currentContainerId);
        if (container) container.innerHTML = "";
      }
      this.clearFilters();
      this.state.isInitialized = false;
    },

    render: function (containerId) {
      this.state.currentContainerId = containerId;
      const root = document.getElementById(containerId);
      if (!root) {
        console.error("Vetcare SymptomChecker: Target container ID not found:", containerId);
        return;
      }

      // Build complete HTML layout
      root.innerHTML = this.buildWorkspaceHtml();
      this.bindUiEvents();
      this.runDiagnosticInference();
    },

    // -------------------------------------------------------------------------
    // 6. DYNAMIC UI DOM BUILDER
    // -------------------------------------------------------------------------
    buildWorkspaceHtml: function () {
      const s = this.state;
      return (
        '<div class="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">' +
          
          // Workspace Header
          '<div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">' +
            '<div>' +
              '<div class="flex items-center gap-2.5 mb-1.5">' +
                '<span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>' +
                '<span class="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-extrabold">CLINICAL TRIAGE & DIFFERENTIAL MATRIX 2026</span>' +
                '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">AI-ASSISTED</span>' +
              '</div>' +
              '<h2 class="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">' +
                '<i class="fa-solid fa-stethoscope text-emerald-400"></i>' +
                '<span>लक्षण आधारित विभेदक निदान कंसोल (Symptom Checker)</span>' +
              '</h2>' +
              '<p class="text-xs sm:text-sm text-slate-400 mt-1">' +
                'पशु प्रजाति, शारीरिक प्रणाली व विशिष्ट लक्षणों का चयन करें; सिस्टम स्वचालित रूप से सांख्यिकीय रोग संभावनाओं व आपातकालीन चेतावनियों की गणना करेगा।' +
              '</p>' +
            '</div>' +
            '<div class="flex items-center gap-2 self-stretch md:self-auto justify-end">' +
              '<button id="scBtnClearFilters" type="button" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-2 transition-all">' +
                '<i class="fa-solid fa-rotate-left text-amber-400"></i>' +
                '<span>रीसेट (Clear)</span>' +
              '</button>' +
              '<button id="scBtnExportReport" type="button" class="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 flex items-center gap-2 transition-all">' +
                '<i class="fa-solid fa-print"></i>' +
                '<span>रिपोर्ट प्रिंट करें (Export)</span>' +
              '</button>' +
            '</div>' +
          '</div>' +

          // SPECIES SELECTOR CAROUSEL
          '<div>' +
            '<label class="block text-xs font-mono uppercase text-slate-400 font-bold mb-2.5 flex items-center gap-2">' +
              '<i class="fa-solid fa-paw text-emerald-400"></i>' +
              '<span>पशु प्रजाति चयन करें (Select Patient Species):</span>' +
            '</label>' +
            '<div id="scSpeciesChipsContainer" class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">' +
              this.speciesCatalog.map(sp => {
                const isActive = sp.id === s.selectedSpecies;
                const activeClasses = isActive
                  ? "bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-400/50"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850 hover:border-slate-700";
                return (
                  '<button type="button" data-species="' + sp.id + '" class="sc-species-chip px-3 py-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ' + activeClasses + '">' +
                    '<i class="fa-solid ' + sp.icon + ' text-lg ' + (isActive ? 'text-white' : 'text-emerald-400') + '"></i>' +
                    '<span class="text-xs font-bold leading-tight">' + sp.labelHi.split(" ")[0] + '</span>' +
                    '<span class="text-[10px] font-mono text-slate-400 ' + (isActive ? 'text-emerald-100' : '') + '">' + sp.labelEn + '</span>' +
                  '</button>'
                );
              }).join("") +
            '</div>' +
          '</div>' +

          // VITALS & CLINICAL STATUS TOGGLE STRIP
          '<div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">' +
            // Temperature status
            '<div>' +
              '<label class="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 font-bold">शारीरिक तापमान (Rectal Temp):</label>' +
              '<div class="grid grid-cols-3 gap-1.5 text-xs font-bold">' +
                '<button type="button" data-temp="subnormal" class="sc-temp-btn py-1.5 px-2 rounded-lg border text-center transition-all ' + (s.patientMetadata.tempStatus === 'subnormal' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-800 text-slate-300 border-slate-700') + '">ठंडा (<100°)</button>' +
                '<button type="button" data-temp="normal" class="sc-temp-btn py-1.5 px-2 rounded-lg border text-center transition-all ' + (s.patientMetadata.tempStatus === 'normal' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-slate-300 border-slate-700') + '">सामान्य</button>' +
                '<button type="button" data-temp="high_fever" class="sc-temp-btn py-1.5 px-2 rounded-lg border text-center transition-all ' + (s.patientMetadata.tempStatus === 'high_fever' ? 'bg-rose-600 text-white border-rose-400 animate-pulse' : 'bg-slate-800 text-slate-300 border-slate-700') + '">तेज (>104°)</button>' +
              '</div>' +
            '</div>' +

            // Recent calving / Post-partum toggle
            '<div>' +
              '<label class="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 font-bold">ताजा ब्यांत (Fresh Calving < 30d):</label>' +
              '<button type="button" id="scToggleCalved" class="w-full py-1.5 px-3 rounded-lg border text-xs font-bold flex items-center justify-between transition-all ' + (s.patientMetadata.recentCalvingDays !== null ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-400 border-slate-700') + '">' +
                '<span>' + (s.patientMetadata.recentCalvingDays !== null ? 'हाँ (हाल ही में ब्यांत हुई है)' : 'नहीं / अप्रयुक्त') + '</span>' +
                '<i class="fa-solid ' + (s.patientMetadata.recentCalvingDays !== null ? 'fa-circle-check text-white' : 'fa-circle text-slate-600') + '"></i>' +
              '</button>' +
            '</div>' +

            // Lactation status
            '<div>' +
              '<label class="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 font-bold">दुग्धावस्था (Lactating):</label>' +
              '<button type="button" id="scToggleLactating" class="w-full py-1.5 px-3 rounded-lg border text-xs font-bold flex items-center justify-between transition-all ' + (s.patientMetadata.lactating ? 'bg-teal-600 text-white border-teal-400' : 'bg-slate-800 text-slate-400 border-slate-700') + '">' +
                '<span>' + (s.patientMetadata.lactating ? 'दुधारू (Lactating Cow/Ewe)' : 'सूखा / नर पशु') + '</span>' +
                '<i class="fa-solid ' + (s.patientMetadata.lactating ? 'fa-bucket text-white' : 'fa-circle text-slate-600') + '"></i>' +
              '</button>' +
            '</div>' +

            // Age category
            '<div>' +
              '<label class="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 font-bold">आयु वर्ग (Age Group):</label>' +
              '<select id="scAgeSelect" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500">' +
                '<option value="adult" ' + (s.patientMetadata.ageGroup === 'adult' ? 'selected' : '') + '>वयस्क (Adult)</option>' +
                '<option value="neonate" ' + (s.patientMetadata.ageGroup === 'neonate' ? 'selected' : '') + '>नवजात / बछड़ा / मेमना (Neonate/Young)</option>' +
                '<option value="geriatric" ' + (s.patientMetadata.ageGroup === 'geriatric' ? 'selected' : '') + '>वृद्ध पशु (Geriatric / Senior)</option>' +
              '</select>' +
            '</div>' +
          '</div>' +

          // ORGAN SYSTEM ACCORDION BAR
          '<div>' +
            '<div class="flex items-center justify-between mb-2">' +
              '<label class="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">' +
                '<i class="fa-solid fa-filter text-amber-400"></i>' +
                '<span>शारीरिक प्रणाली अनुसार फिल्टर (Filter by Body System):</span>' +
              '</label>' +
              '<span class="text-[11px] font-mono text-emerald-400 font-bold">' + s.selectedSymptoms.length + ' लक्षण चयनित</span>' +
            '</div>' +
            '<div id="scSystemChipsContainer" class="flex flex-wrap gap-2">' +
              this.organSystems.map(sys => {
                const isSysActive = sys.id === s.selectedSystem;
                const sysClasses = isSysActive
                  ? "bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md shadow-amber-950/40"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800";
                return (
                  '<button type="button" data-system="' + sys.id + '" class="sc-system-chip px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ' + sysClasses + '">' +
                    '<i class="fa-solid ' + sys.icon + ' text-xs"></i>' +
                    '<span>' + sys.labelHi + '</span>' +
                  '</button>'
                );
              }).join("") +
            '</div>' +
          '</div>' +

          // INTERACTIVE SYMPTOM SEARCH & AUTOCOMPLETE
          '<div class="space-y-3">' +
            '<div class="relative">' +
              '<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">' +
                '<i class="fa-solid fa-magnifying-glass text-sm"></i>' +
              '</div>' +
              '<input type="text" id="scSymptomSearchInput" placeholder="लक्षण खोजें (उदा. लाल पेशाब, अफारा, लंगड़ापन, उच्च ज्वर, खूनी दस्त, ऐंठन)..." autocomplete="off" class="w-full bg-slate-900 border-2 border-slate-700 hover:border-slate-600 focus:border-emerald-500 rounded-2xl pl-10 pr-24 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner" />' +
              '<button type="button" id="scBtnQuickAddTop" class="absolute right-2 top-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow">' +
                'जोड़ें (Add)' +
              '</button>' +
              // Dropdown suggestions
              '<div id="scSearchDropdown" class="absolute left-0 right-0 top-full mt-2 bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto hidden"></div>' +
            '</div>' +

            // Selected Symptoms Multi-Tag Bar
            '<div id="scSelectedTagsContainer" class="flex flex-wrap gap-2 min-h-[38px] p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800 items-center">' +
              (s.selectedSymptoms.length === 0
                ? '<span class="text-xs text-slate-500 font-mono italic px-2">कोई लक्षण चयनित नहीं है। नीचे त्वरित सूची से क्लिक करें या ऊपर खोजें।</span>'
                : s.selectedSymptoms.map(symId => {
                    const symObj = this.symptomDictionary.find(x => x.id === symId);
                    const label = symObj ? symObj.hi : symId;
                    return (
                      '<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">' +
                        '<i class="fa-solid fa-check text-[10px]"></i>' +
                        '<span>' + label + '</span>' +
                        '<button type="button" data-removesym="' + symId + '" class="sc-remove-sym-btn text-emerald-400 hover:text-rose-400 p-0.5 ml-1 transition-colors">' +
                          '<i class="fa-solid fa-xmark text-xs"></i>' +
                        '</button>' +
                      '</span>'
                    );
                  }).join("")) +
            '</div>' +

            // Quick Pick Symptom Buttons (Filtered by current species & system)
            '<div class="pt-1">' +
              '<span class="text-[11px] font-mono uppercase text-slate-400 font-bold block mb-1.5">त्वरित लक्षण चयन (Quick Pick Symptoms):</span>' +
              '<div id="scQuickPicksContainer" class="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">' +
                this.getFilteredSymptoms().map(sym => {
                  const isChecked = s.selectedSymptoms.includes(sym.id);
                  const btnClass = isChecked
                    ? "bg-emerald-600/30 text-emerald-200 border-emerald-500/60 font-bold"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700";
                  return (
                    '<button type="button" data-symid="' + sym.id + '" class="sc-quick-sym-btn px-2.5 py-1.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center gap-1.5 ' + btnClass + '">' +
                      '<i class="fa-solid ' + (isChecked ? 'fa-square-check text-emerald-400' : 'fa-square text-slate-600') + '"></i>' +
                      '<span>' + sym.hi + '</span>' +
                    '</button>'
                  );
                }).join("") +
              '</div>' +
            '</div>' +
          '</div>' +

          // RESULTS SECTION CONTAINER
          '<div id="scResultsContainer" class="pt-4 border-t border-slate-800 space-y-4">' +
            // Rendered dynamically by runDiagnosticInference()
          '</div>' +

        '</div>'
      );
    },

    // -------------------------------------------------------------------------
    // 7. EVENT BINDING & INTERACTIVITY
    // -------------------------------------------------------------------------
    bindUiEvents: function () {
      const self = this;
      const root = document.getElementById(this.state.currentContainerId);
      if (!root) return;

      // Species Chips
      root.querySelectorAll(".sc-species-chip").forEach(btn => {
        btn.addEventListener("click", function () {
          const sp = this.getAttribute("data-species");
          self.state.selectedSpecies = sp;
          self.render(self.state.currentContainerId);
        });
      });

      // System Chips
      root.querySelectorAll(".sc-system-chip").forEach(btn => {
        btn.addEventListener("click", function () {
          const sys = this.getAttribute("data-system");
          self.state.selectedSystem = sys;
          self.render(self.state.currentContainerId);
        });
      });

      // Temperature buttons
      root.querySelectorAll(".sc-temp-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const t = this.getAttribute("data-temp");
          self.state.patientMetadata.tempStatus = t;
          self.render(self.state.currentContainerId);
        });
      });

      // Calved toggle
      const btnCalved = root.querySelector("#scToggleCalved");
      if (btnCalved) {
        btnCalved.addEventListener("click", function () {
          self.state.patientMetadata.recentCalvingDays = (self.state.patientMetadata.recentCalvingDays === null) ? 15 : null;
          self.render(self.state.currentContainerId);
        });
      }

      // Lactating toggle
      const btnLactating = root.querySelector("#scToggleLactating");
      if (btnLactating) {
        btnLactating.addEventListener("click", function () {
          self.state.patientMetadata.lactating = !self.state.patientMetadata.lactating;
          self.render(self.state.currentContainerId);
        });
      }

      // Age select
      const ageSel = root.querySelector("#scAgeSelect");
      if (ageSel) {
        ageSel.addEventListener("change", function () {
          self.state.patientMetadata.ageGroup = this.value;
          self.runDiagnosticInference();
        });
      }

      // Reset Button
      const btnClear = root.querySelector("#scBtnClearFilters");
      if (btnClear) {
        btnClear.addEventListener("click", function () {
          self.clearFilters();
        });
      }

      // Export Report Button
      const btnExport = root.querySelector("#scBtnExportReport");
      if (btnExport) {
        btnExport.addEventListener("click", function () {
          self.exportReport();
        });
      }

      // Quick Pick Symptom Buttons
      root.querySelectorAll(".sc-quick-sym-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const sId = this.getAttribute("data-symid");
          self.toggleSymptom(sId);
        });
      });

      // Remove Selected Tag Buttons
      root.querySelectorAll(".sc-remove-sym-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const sId = this.getAttribute("data-removesym");
          self.removeSymptom(sId);
        });
      });

      // Search Input & Autocomplete Dropdown
      const searchInput = root.querySelector("#scSymptomSearchInput");
      const dropdown = root.querySelector("#scSearchDropdown");

      if (searchInput && dropdown) {
        searchInput.addEventListener("input", function () {
          const val = this.value.trim().toLowerCase();
          if (val.length < 1) {
            dropdown.classList.add("hidden");
            dropdown.innerHTML = "";
            return;
          }

          const matches = self.symptomDictionary.filter(sym => {
            return sym.en.toLowerCase().includes(val) || sym.hi.toLowerCase().includes(val);
          });

          if (matches.length === 0) {
            dropdown.innerHTML = '<div class="p-3 text-xs text-slate-400 italic">कोई मेल खाता लक्षण नहीं मिला।</div>';
            dropdown.classList.remove("hidden");
            return;
          }

          dropdown.innerHTML = matches.map(m => {
            return (
              '<div data-dropsym="' + m.id + '" class="sc-dropdown-item px-4 py-2.5 hover:bg-slate-800 text-xs text-slate-200 border-b border-slate-800 last:border-b-0 cursor-pointer flex items-center justify-between">' +
                '<div>' +
                  '<span class="font-bold text-white">' + m.hi + '</span>' +
                  '<span class="text-slate-400 ml-2 font-mono text-[11px]">(' + m.en + ')</span>' +
                '</div>' +
                '<i class="fa-solid fa-plus text-emerald-400"></i>' +
              '</div>'
            );
          }).join("");

          dropdown.classList.remove("hidden");

          dropdown.querySelectorAll(".sc-dropdown-item").forEach(item => {
            item.addEventListener("click", function () {
              const dId = this.getAttribute("data-dropsym");
              self.addSymptom(dId);
              searchInput.value = "";
              dropdown.classList.add("hidden");
            });
          });
        });

        // Close dropdown when clicked outside
        document.addEventListener("click", function (e) {
          if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add("hidden");
          }
        });
      }
    },

    // -------------------------------------------------------------------------
    // 8. SYMPTOM FILTERING & SELECTION LOGIC
    // -------------------------------------------------------------------------
    getFilteredSymptoms: function () {
      const sp = this.state.selectedSpecies;
      const sys = this.state.selectedSystem;

      return this.symptomDictionary.filter(sym => {
        const speciesMatch = sym.species.includes("all") || sym.species.includes(sp);
        const systemMatch = (sys === "all") || (sym.system === sys);
        return speciesMatch && systemMatch;
      });
    },

    toggleSymptom: function (symId) {
      const idx = this.state.selectedSymptoms.indexOf(symId);
      if (idx > -1) {
        this.state.selectedSymptoms.splice(idx, 1);
      } else {
        this.state.selectedSymptoms.push(symId);
      }
      this.render(this.state.currentContainerId);
    },

    addSymptom: function (symId) {
      if (!this.state.selectedSymptoms.includes(symId)) {
        this.state.selectedSymptoms.push(symId);
        this.render(this.state.currentContainerId);
      }
    },

    removeSymptom: function (symId) {
      this.state.selectedSymptoms = this.state.selectedSymptoms.filter(x => x !== symId);
      this.render(this.state.currentContainerId);
    },

    clearFilters: function () {
      this.state.selectedSymptoms = [];
      this.state.selectedSystem = "all";
      this.state.patientMetadata = {
        ageGroup: "adult",
        lactating: false,
        pregnant: false,
        recentCalvingDays: null,
        tempStatus: "normal"
      };
      if (this.state.currentContainerId) {
        this.render(this.state.currentContainerId);
      }
      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("सभी फिल्टर रीसेट किए गए (Filters Cleared)", "info");
      }
    },

    // -------------------------------------------------------------------------
    // 9. CLINICAL INFERENCE & MATCHING ENGINE
    // -------------------------------------------------------------------------
    runDiagnosticInference: function () {
      const s = this.state;
      const resContainer = document.getElementById("scResultsContainer");
      if (!resContainer) return;

      const syms = s.selectedSymptoms;
      const species = s.selectedSpecies;
      const meta = s.patientMetadata;

      // If no symptoms selected, show encouraging prompt
      if (syms.length === 0) {
        resContainer.innerHTML = (
          '<div class="text-center py-12 px-4 rounded-2xl bg-slate-900/40 border border-slate-800">' +
            '<div class="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500 text-2xl mb-3">' +
              '<i class="fa-solid fa-list-check"></i>' +
            '</div>' +
            '<h3 class="text-base font-bold text-slate-300">नैदानिक विश्लेषण हेतु कम से कम 1 या अधिक लक्षण चुनें</h3>' +
            '<p class="text-xs text-slate-500 max-w-md mx-auto mt-1">ऊपर दिए गए लक्षणों पर क्लिक करें। Vetcare AI OS सिंड्रोमिक निर्णय मैट्रिक्स द्वारा तुरंत सटीक संभावित रोगों की गणना करेगा।</p>' +
          '</div>'
        );
        return;
      }

      // 1. Cross-reference with DifferentialDiagnostics engine if available
      let inferredResults = [];
      let statNotifiableAlerts = [];
      let criticalContraindications = [];

      // Check Ovine diseases if species is sheep
      if (species === "ovine" && window.VetcareApp.ClinicalData && window.VetcareApp.ClinicalData.DiseasesOvine) {
        window.VetcareApp.ClinicalData.DiseasesOvine.forEach(dis => {
          let score = 0;
          let matchedSymptoms = [];

          // Keyword check
          syms.forEach(symKey => {
            const symObj = this.symptomDictionary.find(x => x.id === symKey);
            const enKey = symObj ? symObj.en.toLowerCase() : symKey;
            const hiKey = symObj ? symObj.hi : symKey;

            const matches = dis.cardinalSymptoms.some(cs => {
              const lower = cs.toLowerCase();
              return lower.includes(enKey) || lower.includes(hiKey) || lower.includes(symKey);
            });

            if (matches) {
              score += 25;
              matchedSymptoms.push(symObj ? symObj.hi : symKey);
            }
          });

          // Metadata modifiers
          if (meta.tempStatus === "high_fever" && (dis.id === "ovine-sheep-pox" || dis.id === "ovine-blue-tongue")) {
            score += 20;
          }
          if (meta.tempStatus === "normal" && dis.id === "ovine-foot-rot") {
            score += 15;
          }
          if (meta.pregnant && dis.id === "ovine-pregnancy-toxaemia") {
            score += 35;
          }

          if (score > 0) {
            const confidence = Math.min(Math.max(score, 15), 98);
            inferredResults.push({
              id: dis.id,
              nameEn: dis.name,
              nameHi: dis.nameHi,
              confidence: confidence,
              matchedSymptoms: matchedSymptoms,
              category: dis.category,
              isNotifiable: dis.isNotifiable,
              pathognomonicTestHi: dis.pathognomonicLesions[0] || "विशिष्ट पैथोलॉजी परीक्षण",
              treatmentSummaryHi: dis.treatmentRegimen[0] ? (dis.treatmentRegimen[0].drug + " (" + dis.treatmentRegimen[0].dose + ")") : "सपोर्टिव थेरेपी",
              rawObject: dis
            });

            if (dis.isNotifiable) {
              statNotifiableAlerts.push(dis.name + " (" + dis.nameHi + ")");
            }
          }
        });
      }

      // Check Bovine/Bubaline/Canine DifferentialDiagnostics syndromic matrix
      if (window.VetcareApp.ClinicalData && window.VetcareApp.ClinicalData.DifferentialDiagnostics) {
        const diffEngine = window.VetcareApp.ClinicalData.DifferentialDiagnostics;
        const allSyndromes = diffEngine.getAllSyndromes();

        allSyndromes.forEach(syn => {
          if (syn.species.includes(species)) {
            const diffResult = diffEngine.differentiateSyndrome(syn.syndromeKey, syms, species, {
              temperatureF: meta.tempStatus === "high_fever" ? 105.5 : meta.tempStatus === "subnormal" ? 98.0 : 101.5
            });

            if (diffResult && diffResult.topRankedDiagnosis && diffResult.topRankedDiagnosis.matchedFeaturesCount > 0) {
              diffResult.differentialRanking.forEach(dr => {
                if (dr.matchedFeaturesCount > 0) {
                  inferredResults.push({
                    id: dr.diseaseId,
                    nameEn: dr.nameEn,
                    nameHi: dr.nameHi,
                    confidence: dr.probabilityPercent,
                    matchedSymptoms: dr.matchedFeaturesList,
                    category: "Differential Matrix",
                    isNotifiable: dr.nameEn.includes("Anthrax") || dr.nameEn.includes("Rabies") || dr.nameEn.includes("Foot"),
                    pathognomonicTestHi: dr.confirmatoryDiagnosticTestHi,
                    treatmentSummaryHi: dr.recommendedFirstLineTherapyHi,
                    rawObject: dr
                  });

                  if (dr.nameEn.includes("Anthrax") || dr.nameEn.includes("Rabies")) {
                    statNotifiableAlerts.push(dr.nameEn + " (" + dr.nameHi + ")");
                  }
                }
              });
            }
          }
        });
      }

      // Deduplicate results by nameEn
      const uniqueResults = [];
      const seen = new Set();
      inferredResults.forEach(item => {
        if (!seen.has(item.nameEn)) {
          seen.add(item.nameEn);
          uniqueResults.push(item);
        }
      });

      // Sort by match confidence descending
      uniqueResults.sort((a, b) => b.confidence - a.confidence);
      this.state.searchResults = uniqueResults;

      // 2. Render Results DOM
      let resultsHtml = "";

      // STATUTORY NOTIFIABLE BIO-ALERT BANNER
      if (statNotifiableAlerts.length > 0) {
        const uniqueNotifiable = Array.from(new Set(statNotifiableAlerts));
        resultsHtml += (
          '<div class="p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 text-rose-200 flex items-start gap-3 shadow-xl shadow-rose-950/50 animate-pulse">' +
            '<i class="fa-solid fa-triangle-exclamation text-2xl text-rose-400 mt-0.5"></i>' +
            '<div>' +
              '<h4 class="font-display font-black text-sm uppercase text-white tracking-wider">वैधानिक अधिसूचित संक्रामक रोग चेतावनी (STATUTORY NOTIFIABLE DISEASE BIO-ALERT)</h4>' +
              '<p class="text-xs text-rose-200 mt-0.5 leading-relaxed">' +
                'लक्षण प्रोफाइल के अनुसार निम्नलिखित राष्ट्रीय अधिसूचित रोगों का संदेह है: <strong>' + uniqueNotifiable.join(", ") + '</strong>। ' +
                'पशु को तत्काल पृथक करें, जैव-सुरक्षा लागू करें तथा जिला पशुपालन विभाग/नोडल अधिकारी को अनिवार्य सूचित करें।' +
              '</p>' +
            '</div>' +
          '</div>'
        );
      }

      // Contraindication Checks (e.g. Paracetamol in Felines)
      if (species === "feline") {
        criticalContraindications.push("मार्जार प्रजाति में पैरासिटामोल (Acetaminophen) 100% जानलेवा व वर्जित है।");
      }
      if (criticalContraindications.length > 0) {
        resultsHtml += (
          '<div class="p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/60 text-amber-200 text-xs flex items-center gap-2.5">' +
            '<i class="fa-solid fa-shield-virus text-base text-amber-400"></i>' +
            '<span><strong>क्लिनिकल सुरक्षा गार्डरेल:</strong> ' + criticalContraindications.join(" ") + '</span>' +
          '</div>'
        );
      }

      // Header summary of match count
      resultsHtml += (
        '<div class="flex items-center justify-between pb-1">' +
          '<h3 class="text-sm font-mono font-bold uppercase text-slate-300 flex items-center gap-2">' +
            '<i class="fa-solid fa-chart-pie text-emerald-400"></i>' +
            '<span>अनुमानित विभेदक निदान परिणाम (' + uniqueResults.length + ' संभावित रोग पाए गए):</span>' +
          '</h3>' +
          '<span class="text-xs text-slate-500 font-mono">Sorted by Clinical Confidence</span>' +
        '</div>'
      );

      if (uniqueResults.length === 0) {
        resultsHtml += (
          '<div class="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">' +
            '<i class="fa-solid fa-circle-question text-3xl text-slate-600 mb-2"></i>' +
            '<div class="text-sm font-bold text-slate-300">वर्तमान चयनों हेतु कोई सीधा रोग मेल नहीं खाया।</div>' +
            '<div class="text-xs text-slate-500 mt-1">कृपया अतिरिक्त लक्षण जोड़ें या शारीरिक तापमान/प्रणाली फिल्टर को समायोजित करें।</div>' +
          '</div>'
        );
      } else {
        resultsHtml += '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
        uniqueResults.forEach((res, idx) => {
          let badgeClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
          let badgeLabel = "LOW RISK";
          let progressColor = "bg-emerald-500";

          if (res.confidence >= 80) {
            badgeClass = "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse";
            badgeLabel = "CRITICAL / HIGH MATCH";
            progressColor = "bg-rose-500";
          } else if (res.confidence >= 55) {
            badgeClass = "bg-amber-500/20 text-amber-300 border-amber-500/40";
            badgeLabel = "MODERATE MATCH";
            progressColor = "bg-amber-500";
          }

          resultsHtml += (
            '<div class="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-920 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg relative overflow-hidden group">' +
              // Top strip
              '<div>' +
                '<div class="flex items-center justify-between gap-2 mb-2">' +
                  '<span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-black uppercase border ' + badgeClass + '">' +
                    badgeLabel +
                  '</span>' +
                  '<span class="text-xs font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">' +
                    res.confidence + '% Match' +
                  '</span>' +
                '</div>' +

                // Progress bar
                '<div class="w-full bg-slate-800 h-1.5 rounded-full mb-3 overflow-hidden">' +
                  '<div class="' + progressColor + ' h-full rounded-full" style="width: ' + res.confidence + '%"></div>' +
                '</div>' +

                '<h4 class="text-base font-display font-black text-white group-hover:text-emerald-300 transition-colors">' +
                  res.nameHi +
                '</h4>' +
                '<div class="text-xs font-mono text-slate-400 mb-2.5">' + res.nameEn + '</div>' +

                // Matched features pills
                (res.matchedSymptoms && res.matchedSymptoms.length > 0
                  ? '<div class="text-[11px] text-slate-300 mb-2.5"><span class="text-slate-500 font-mono">मेल खाते लक्षण: </span>' +
                      res.matchedSymptoms.slice(0, 4).map(m => '<span class="inline-block px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 text-[10px] mr-1 mb-1 font-semibold">' + m + '</span>').join("") +
                    '</div>'
                  : '') +

                // Crucial Diagnostic Clue
                '<div class="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 mb-3">' +
                  '<div class="text-[10px] font-mono uppercase text-emerald-400 font-bold mb-0.5 flex items-center gap-1">' +
                    '<i class="fa-solid fa-microscope text-[10px]"></i>' +
                    '<span>पुष्टि हेतु निर्णायक परीक्षण (Differentiating Clue):</span>' +
                  '</div>' +
                  '<p class="text-[11px] leading-relaxed text-slate-300">' + res.pathognomonicTestHi + '</p>' +
                '</div>' +

                // Primary Therapy Summary
                '<div class="text-[11px] text-slate-300 mb-4">' +
                  '<span class="text-slate-400 font-bold"><i class="fa-solid fa-pills text-amber-400 mr-1"></i>प्राथमिक उपचार: </span>' +
                  '<span>' + res.treatmentSummaryHi + '</span>' +
                '</div>' +
              '</div>' +

              // Action Buttons
              '<div class="pt-3 border-t border-slate-800/80 flex items-center gap-2">' +
                '<button type="button" data-selectdx="' + encodeURIComponent(JSON.stringify(res)) + '" class="sc-btn-send-rx flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95">' +
                  '<i class="fa-solid fa-file-prescription"></i>' +
                  '<span>पर्चा बनाएं (Send to Rx)</span>' +
                '</button>' +
                '<button type="button" data-viewproto="' + encodeURIComponent(JSON.stringify(res)) + '" class="sc-btn-view-proto px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-all">' +
                  '<i class="fa-solid fa-book-medical text-amber-400"></i>' +
                  '<span>विवरण</span>' +
                '</button>' +
              '</div>' +

            '</div>'
          );
        });
        resultsHtml += '</div>';
      }

      resContainer.innerHTML = resultsHtml;

      // Bind result action buttons
      resContainer.querySelectorAll(".sc-btn-send-rx").forEach(btn => {
        btn.addEventListener("click", function () {
          const raw = JSON.parse(decodeURIComponent(this.getAttribute("data-selectdx")));
          self.dispatchPrescriptionEvent(raw);
        });
      });

      resContainer.querySelectorAll(".sc-btn-view-proto").forEach(btn => {
        btn.addEventListener("click", function () {
          const raw = JSON.parse(decodeURIComponent(this.getAttribute("data-viewproto")));
          self.displayProtocolModal(raw);
        });
      });
    },

    // -------------------------------------------------------------------------
    // 10. INTER-MODULE DISPATCH & MODAL VIEW
    // -------------------------------------------------------------------------
    dispatchPrescriptionEvent: function (diagnosisObject) {
      const payload = {
        diseaseId: diagnosisObject.id,
        diseaseName: diagnosisObject.nameEn,
        diseaseNameHi: diagnosisObject.nameHi,
        species: this.state.selectedSpecies,
        confidence: diagnosisObject.confidence,
        rawRecord: diagnosisObject.rawObject
      };

      // 1. Emit via EventBus if available
      if (window.VetcareApp.Core && window.VetcareApp.Core.EventBus && typeof window.VetcareApp.Core.EventBus.emit === "function") {
        window.VetcareApp.Core.EventBus.emit("diagnosis:selected", payload);
      }

      // 2. Dispatch global DOM CustomEvent
      window.dispatchEvent(new CustomEvent("vetcare:diagnosis:selected", { detail: payload }));

      // 3. Direct module linkage if Doctor OPD module exists
      if (window.VetcareApp.Doctor && typeof window.VetcareApp.Doctor.populateDiagnosis === "function") {
        window.VetcareApp.Doctor.populateDiagnosis(payload);
      }

      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("रोग '" + diagnosisObject.nameHi + "' प्रिस्क्रिप्शन मॉड्यूल में प्रेषित!", "success");
      }
    },

    displayProtocolModal: function (diag) {
      let content = "<strong>रोग:</strong> " + diag.nameHi + " (" + diag.nameEn + ")<br/><br/>";
      content += "<strong>पुष्टि परीक्षण:</strong> " + diag.pathognomonicTestHi + "<br/><br/>";
      content += "<strong>उपचार:</strong> " + diag.treatmentSummaryHi;

      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("विस्तृत प्रोटोकॉल खोला गया: " + diag.nameHi, "info");
      }
      alert(diag.nameHi + " (" + diag.nameEn + ")\n\nपुष्टि परीक्षण:\n" + diag.pathognomonicTestHi + "\n\nउपचार संक्षेप:\n" + diag.treatmentSummaryHi);
    },

    // -------------------------------------------------------------------------
    // 11. CLINICAL REPORT EXPORT & PRINT
    // -------------------------------------------------------------------------
    exportReport: function () {
      const s = this.state;
      const dateStr = new Date().toLocaleString("hi-IN");

      let reportText = "===========================================================\n";
      reportText += "VETCARE AI OS - नैदानिक सिंड्रोमिक परामर्श रिपोर्ट (CLINICAL TRIAGE REPORT)\n";
      reportText += "दिनांक एवं समय: " + dateStr + "\n";
      reportText += "===========================================================\n\n";

      reportText += "1. रोगी विवरण (PATIENT METADATA):\n";
      reportText += "  - प्रजाति (Species): " + s.selectedSpecies.toUpperCase() + "\n";
      reportText += "  - आयु वर्ग (Age Group): " + s.patientMetadata.ageGroup + "\n";
      reportText += "  - तापमान स्थिति: " + s.patientMetadata.tempStatus + "\n";
      reportText += "  - दुग्धावस्था: " + (s.patientMetadata.lactating ? "हाँ (Lactating)" : "नहीं") + "\n";
      reportText += "  - हाल ही में ब्यांत: " + (s.patientMetadata.recentCalvingDays ? "हाँ (< 30 दिन)" : "नहीं") + "\n\n";

      reportText += "2. दर्ज किए गए लक्षण (OBSERVED CLINICAL SYMPTOMS):\n";
      if (s.selectedSymptoms.length === 0) {
        reportText += "  (कोई लक्षण चयनित नहीं)\n";
      } else {
        s.selectedSymptoms.forEach((symId, idx) => {
          const symObj = this.symptomDictionary.find(x => x.id === symId);
          reportText += "  " + (idx + 1) + ". " + (symObj ? symObj.hi + " (" + symObj.en + ")" : symId) + "\n";
        });
      }
      reportText += "\n";

      reportText += "3. अनुशंसित विभेदक निदान (TOP DIFFERENTIAL DIAGNOSES):\n";
      if (s.searchResults.length === 0) {
        reportText += "  (कोई स्पष्ट मेल नहीं)\n";
      } else {
        s.searchResults.slice(0, 5).forEach((res, idx) => {
          reportText += "  [" + (idx + 1) + "] " + res.nameHi + " (" + res.nameEn + ") - " + res.confidence + "% Match\n";
          reportText += "      पुष्टि परीक्षण: " + res.pathognomonicTestHi + "\n";
          reportText += "      प्राथमिक उपचार: " + res.treatmentSummaryHi + "\n\n";
        });
      }

      reportText += "===========================================================\n";
      reportText += "हस्ताक्षर अधिकृत पशु चिकित्सक (Veterinary Surgeon Signature)\n";
      reportText += "Vetcare AI OS Core Engine v2.6.4 (2026 Production)\n";

      // Trigger print in new tab or popup
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write("<pre style='font-family: monospace; padding: 20px; font-size: 13px; line-height: 1.6;'>" + reportText + "</pre>");
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      } else {
        alert(reportText);
      }
    }
  };

  // Auto-register lifecycle hook
  if (window.VetcareApp.showToast) {
    window.VetcareApp.showToast("इंटरैक्टिव सिम्पटम चेकर UI मॉड्यूल सक्रिय (Symptom Checker Loaded)", "success");
  }
})();
