// Vetcare AI OS - Equine (Horse/Mule/Donkey) Clinical Disease Database, Symptom Matrices & Rx Regimens (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. EQUINE CLINICAL DATABASE DOSSIERS (COMPREHENSIVE ZERO-PLACEHOLDER SPECIFICATION)
  window.VetcareApp.ClinicalData.Equine = [
    {
      id: "equine-colic",
      name: "Equine Colic (Spasmodic, Impaction & Tympanic Enteropathy)",
      nameHi: "अश्व उदरशूल (घोड़े का गंभीर पेट दर्द / आंतों में रुकावट व अफरा)",
      category: "Gastrointestinal Emergency",
      tempRange: {
        minF: 99.0,
        maxF: 101.5,
        normalF: 100.0
      },
      cardinalSymptoms: [
        "Pawing at the ground, frequent lying down and violent rolling (जमीन को खुरों से कुरेदना, बार-बार लेटना व छटपटाना)",
        "Turning head to look, bite, or kick at the flank region (गर्दन मोड़कर बार-बार पेट या कोख की तरफ देखना व लात मारना)",
        "Repeated posturing to urinate without voiding urine (पेशाब करने की बार-बार असफल मुद्रा बनाना)",
        "Absence or hypermotility of borborygmi sounds on abdominal auscultation (स्टैथोस्कोप से सुनने पर आंतों की गड़गड़ाहट का रुकना अथवा अत्यधिक होना)",
        "Tachycardia >60 bpm indicating severe ischemic visceral pain (हृदय गति 60 प्रति मिनट से अधिक - तीव्र आंत दर्द का संकेत)",
        "Sweating profusely, patchy or generalized, with flare nostrils and elevated respiratory rate (अत्यधिक पसीना आना, नथुने फूलना व तेज सांस लेना)",
        "Dry, mucus-covered, or completely absent fecal output (मल त्याग रुक जाना या सूखा लसलसा मल आना)"
      ],
      differentialDiagnosis: [
        "Large Colon Impaction",
        "Strangulating Lipoma",
        "Nephrosplenic Entrapment",
        "Tympanic Cecal Flatulence",
        "Right Dorsal Colitis",
        "Anterior Enteritis",
        "Gastric Ulcer Syndrome (EGUS)"
      ],
      firstLineDrugs: [
        {
          genericName: "Flunixin Meglumine",
          brandExample: "Megludyne / Finadyne 50mg/ml",
          doseMgPerKg: 1.1,
          route: "IV",
          frequency: "OD",
          durationDays: 2,
          pregnancySafe: true,
          notes: "Potent visceral analgesic of choice in equines. Never inject intramuscularly (IM) due to catastrophic risk of Clostridial myositis/gas gangrene."
        },
        {
          genericName: "Hyoscine N-Butylbromide + Dipyrone",
          brandExample: "Buscopan Compositum (20mg + 2.5g / vial)",
          doseMgPerKg: 0.2,
          route: "IV",
          frequency: "Stat",
          durationDays: 1,
          pregnancySafe: true,
          notes: "Antispasmodic of choice for spasmodic and gas colic. Relaxes gastrointestinal smooth muscle sphincters within 10-15 minutes."
        },
        {
          genericName: "Xylazine Hydrochloride",
          brandExample: "Xylaxin 100mg/ml",
          doseMgPerKg: 0.4,
          route: "IV",
          frequency: "Stat",
          durationDays: 1,
          pregnancySafe: false,
          notes: "Alpha-2 agonist sedative for diagnostic rectal palpation and critical pain relief. Lowers head; may cause transient ataxia. Use caution in late pregnancy."
        },
        {
          genericName: "Liquid Paraffin (White Mineral Oil USP)",
          brandExample: "Liquid Paraffin Technical / Laxavet",
          doseMgPerKg: 8.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 2,
          pregnancySafe: true,
          notes: "Administer 2 to 4 Liters per 450 kg horse ONLY via confirmed nasogastric stomach tube. Lubricates pelvic flexure impactions. NEVER drench via bottle (fatal aspiration pneumonia risk)."
        },
        {
          genericName: "Magnesium Sulfate (Epsom Salt)",
          brandExample: "Magnesium Sulfate Pulv",
          doseMgPerKg: 0.75,
          route: "Oral",
          frequency: "OD",
          durationDays: 1,
          pregnancySafe: true,
          notes: "Osmotic cathartic. Dissolve 300-400g in 6 liters warm water and infuse via stomach tube for cecal or colonic impactions."
        }
      ],
      supportiveCare: [
        "Pass a calibrated nasogastric stomach tube immediately to decompress gastric distension (prevents fatal spontaneous stomach rupture).",
        "Withhold all solid feed, grain, and concentrates entirely until normal fecal passage and active gut sounds resume.",
        "Initiate aggressive balanced electrolyte IV fluid therapy (Ringer's Lactate at 10-20 ml/kg/hr) to rehydrate fecal mass and correct hypovolemic shock.",
        "Hand-walk the horse slowly on soft ground for 15-20 minutes every 2 hours to stimulate intestinal peristalsis and discourage violent rolling."
      ],
      contraindications: [
        "CRITICAL: Never administer Flunixin Meglumine or any NSAID by the Intramuscular (IM) route in horses due to Clostridial myonecrosis.",
        "CRITICAL: Never drench liquid paraffin, oil, or electrolytes with an oral bottle; always use a verified nasogastric stomach tube.",
        "Never administer repeated doses of atropine (induces irreversible paralytic ileus).",
        "Avoid high-dose long-term Phenylbutazone in dehydrated horses (triggers fatal right dorsal colitis and renal papillary necrosis)."
      ],
      desiNuskhe: [
        {
          name: "अजवाइन, हींग व सेंधा नमक पाचक काढ़ा (Spasmodic Colic Warm Carminative Drench)",
          ingredients: "Ajwain (Trachyspermum ammi) 50g, Pure Hing (Asafoetida) 10g, Rock Salt (Sendha Namak) 50g, Ginger Juice (Adrak Ras) 50ml, Warm Water 500ml.",
          preparation: "Grind Ajwain and Hing into fine powder. Boil in 750ml water until reduced to 500ml. Strain through muslin cloth, dissolve rock salt, and mix ginger juice.",
          administration: "Administer warm through a dosing syringe very slowly in mild spasmodic/gas colic. Aids flatus release and eases abdominal cramps."
        },
        {
          name: "ईसबगोल भूसी व अलसी का लुआब (Psyllium & Flaxseed Mucilage for Sand/Impaction Relief)",
          ingredients: "Psyllium Husk (Isabgol) 150g, Flaxseed (Alsi) 100g, Warm Water 4 Liters.",
          preparation: "Boil flaxseeds in 2 liters water to extract thick mucilage. Mix with psyllium husk and remaining lukewarm water right before feeding.",
          administration: "Offer via oral drenching tube or feed bucket OD for 3-5 days to mobilize impacted sand and fecaliths from the ventral colon."
        }
      ],
      preventionAndVaccination: [
        "Maintain strict routine feeding schedules; avoid abrupt changes in concentrate or hay types.",
        "Ensure round-the-clock access to fresh, clean, non-frozen water; increase water intake in winter by adding trace salt.",
        "Execute scheduled quarterly anthelmintic rotation (Ivermectin, Praziquantel, Pyrantel Pamoate) to eliminate Strongylus vulgaris larvae.",
        "Perform bi-annual dental examinations and floating of sharp enamel points to ensure complete mastication of forage.",
        "Never feed chopped straw or concentrate immediately following vigorous exercise."
      ]
    },
    {
      id: "equine-strangles",
      name: "Strangles / Equine Distemper (Streptococcus equi subsp. equi)",
      nameHi: "अश्व कंठमाला / स्ट्रेंगल्स (गले की गिल्टियों का मवादयुक्त संक्रामक रोग)",
      category: "Infectious Bacterial",
      tempRange: {
        minF: 102.5,
        maxF: 105.8,
        normalF: 100.0
      },
      cardinalSymptoms: [
        "Acute high fever 103-106°F with depression and anorexia (अचानक तेज बुखार, सुस्ती और चारा छोड़ना)",
        "Bilateral copious mucopurulent nasal discharge (दोनों नथुनों से गाढ़ा, पीला-सफेद मवाद बहना)",
        "Severe swelling and painful hot abscessation of submandibular and retropharyngeal lymph nodes (जबड़े के नीचे व गले की लसिका ग्रंथियों में गर्म, दर्दनाक सूजन व गिल्टी पकना)",
        "Extended head and neck posture to relieve severe upper airway obstruction (गले में दर्द व सांस लेने में कठिनाई के कारण गर्दन आगे की ओर खींचना)",
        "Stridor, stertorous breathing, and profound dysphagia (खर्राटेदार भारी सांस व पानी निगलने में असमर्थता / नाक से पानी वापस आना)",
        "Spontaneous rupture of abscesses discharging thick creamy yellow pus (गिल्टियों का फूटकर गाढ़ा पीला मवाद निकलना)"
      ],
      differentialDiagnosis: [
        "Equine Viral Arteritis (EVA)",
        "Equine Influenza (H3N8)",
        "Equine Herpesvirus-4 (EHV-4) Rhinopneumonitis",
        "Rhodococcus equi (in foals)",
        "Pharyngeal foreign body"
      ],
      firstLineDrugs: [
        {
          genericName: "Procaine Penicillin G",
          brandExample: "Depocillin / Penstrip (300,000 IU/ml)",
          doseMgPerKg: 22.0,
          route: "IM",
          frequency: "BD",
          durationDays: 7,
          pregnancySafe: true,
          notes: "22,000 IU/kg deep IM. Inject ONLY in early stage before node induration or in complicated/metastatic 'Bastard Strangles'. Fatal if injected IV."
        },
        {
          genericName: "Ceftiofur Sodium",
          brandExample: "Naxcel / Xyrofur 1g vial",
          doseMgPerKg: 2.2,
          route: "IM",
          frequency: "OD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Alternative broad-spectrum cephalosporin when penicillin resistance or severe pharyngeal cellulitis is present."
        },
        {
          genericName: "Flunixin Meglumine",
          brandExample: "Megludyne 50mg/ml",
          doseMgPerKg: 1.1,
          route: "IV",
          frequency: "OD",
          durationDays: 3,
          pregnancySafe: true,
          notes: "Potent antipyretic and anti-inflammatory to encourage voluntary eating and reduce pharyngeal swelling."
        },
        {
          genericName: "Povidone Iodine 10% Solution",
          brandExample: "Betadine Antiseptic Solution",
          doseMgPerKg: 0.0,
          route: "Topical",
          frequency: "BD",
          durationDays: 7,
          pregnancySafe: true,
          notes: "Dilute 1:10 in warm sterile saline for daily intra-cavity flushing of ruptured submandibular abscesses until healthy granulation forms."
        }
      ],
      supportiveCare: [
        "Apply hot wet compresses, ichthammol 20% ointment, or warm flaxseed poultices over indurated lymph nodes to accelerate pointing and maturation.",
        "Lance mature, soft, fluctuant abscesses with a sterile scalpel blade (vertical incision) and flush with dilute povidone-iodine.",
        "Provide soft, soaked, warm mash feed and grass pellets placed at floor level to facilitate drainage from pharyngeal pouches.",
        "Perform emergency tracheostomy in cases of critical asphyxiating bilateral retropharyngeal lymphadenopathy ('Strangles' choke)."
      ],
      contraindications: [
        "DO NOT administer penicillin if submandibular abscesses are already mature, fluctuant, or draining; antibiotics delay suppuration and trigger Bastard Strangles.",
        "FATAL: NEVER administer Procaine Penicillin intravenously (triggers acute CNS procaine toxicity, violent seizures, and immediate death).",
        "Avoid cold drafts, damp bedding, and working the animal during acute febrile stage."
      ],
      desiNuskhe: [
        {
          name: "हल्दी, अलसी व कत्था गर्म पुल्टिस (Turmeric & Flaxseed Suppurative Poultice)",
          ingredients: "Flaxseed meal (Alsi Churna) 200g, Turmeric Powder (Haldi) 50g, Catechu (Katha) 20g, Mustard Oil 50ml, Warm Water.",
          preparation: "Cook flaxseed meal and turmeric in water with mustard oil until a thick paste forms. Stir in Katha powder.",
          administration: "Apply lukewarm directly over the hard throat swellings twice daily and bandage loosely. Induces rapid ripening and natural drainage of abscesses."
        },
        {
          name: "नीम-फिटकरी लिक्विड वाश (Antiseptic Neem & Alum Abscess Flush)",
          ingredients: "Fresh Neem Leaves 100g, Alum (Fitkari) 10g, Clean Water 2 Liters.",
          preparation: "Boil neem leaves in water for 20 minutes until reduced by half. Dissolve crushed fitkari into the warm decoction and strain.",
          administration: "Flush the ruptured or lanced abscess cavities thoroughly once daily using a catheter-tipped syringe."
        }
      ],
      preventionAndVaccination: [
        "Equilis StrepE modified live mucosal vaccine (submucosal lip vaccination) or Equine Strangles Protein sub-unit vaccine where endemic.",
        "Enforce strict 21-day quarantine for all new equines entering the stud farm, livery yard, or stable.",
        "Perform nasopharyngeal swab PCR and guttural pouch endoscopy on convalescent horses to detect asymptomatic 'silent' chondroid carriers.",
        "Disinfect all tack, feed buckets, water troughs, and trailers using Virkon-S 1% or Chlorhexidine."
      ]
    },
    {
      id: "equine-tetanus",
      name: "Equine Tetanus / Lockjaw (Clostridium tetani Neurotoxicosis)",
      nameHi: "अश्व धनुस्तंभ / टेटनस (जबड़ा जाम, तीसरी पलक का प्रोलैप्स व मांसपेशियों का अकड़ना)",
      category: "Clostridial Neurotoxic",
      tempRange: {
        minF: 100.0,
        maxF: 103.0,
        normalF: 100.0
      },
      cardinalSymptoms: [
        "Pathognomonic protrusion/prolapse of the third eyelid (nictitating membrane) elicited by tapping the face or startling (आंख की तीसरी पलक का बार-बार बाहर आना)",
        "Erect, stiff, and immobile ears turned backwards with flared nostrils ('Alert' or anxious facial expression) (कानों का पीछे की ओर बिल्कुल सीधा व कठोर हो जाना)",
        "Trismus ('Lockjaw') with extreme inability to open the mouth or masticate feed (जबड़ा पूरी तरह जाम हो जाना, दांत भिंच जाना)",
        "Rigid, stiff-legged 'Sawhorse' stance with tail elevated and extended neck (चारों पैरों को लकड़ी की तरह फैलाकर 'आरी-घोड़ा' मुद्रा में खड़े होना)",
        "Violent generalized tetanic muscle spasms triggered by sudden light, touch, or sound (धीमी सी आवाज, रोशनी या स्पर्श से पूरे शरीर में भयानक झटके लगना)",
        "Profuse sweating, severe dyspnea, and hyperpyrexia due to sustained violent muscular contraction (मांसपेशियों के अत्यधिक खिंचाव से तेज पसीना व सांस फूलना)"
      ],
      differentialDiagnosis: [
        "Hypocalcemic Tetany (Lactation Tetany)",
        "Strychnine Poisoning",
        "Acute Laminitis (all 4 feet)",
        "Cerebral Trauma / Meningitis",
        "Rabies (Paralytic/Furious form)"
      ],
      firstLineDrugs: [
        {
          genericName: "Equine Tetanus Antitoxin (TAT)",
          brandExample: "TAT Equine Serum (10,000 - 50,000 IU/vial)",
          doseMgPerKg: 100.0,
          route: "IV",
          frequency: "Stat",
          durationDays: 2,
          pregnancySafe: true,
          notes: "Administer 30,000 to 50,000 IU IV slowly, plus 10,000 IU injected locally around the site of the infected puncture wound to neutralize unbound toxin."
        },
        {
          genericName: "Procaine Penicillin G",
          brandExample: "Depocillin / Vet-Pen 300,000 IU/ml",
          doseMgPerKg: 30.0,
          route: "IM",
          frequency: "BD",
          durationDays: 10,
          pregnancySafe: true,
          notes: "30,000 IU/kg deep IM BD for 10-14 days to eradicate vegetative Clostridium tetani bacilli at the nidus. Never inject IV."
        },
        {
          genericName: "Metronidazole",
          brandExample: "Metrogyl IV 500mg/100ml / Flagyl Pulv",
          doseMgPerKg: 20.0,
          route: "Oral",
          frequency: "TDS",
          durationDays: 7,
          pregnancySafe: true,
          notes: "Excellent tissue penetration into deep anaerobic necrotic puncture wounds. Often combined with or preferred over penicillin."
        },
        {
          genericName: "Diazepam",
          brandExample: "Calmpose / Valium 5mg/ml",
          doseMgPerKg: 0.1,
          route: "IV",
          frequency: "TDS",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Potent central muscle relaxant to abate violent tetanic spasms and prevent respiratory arrest."
        },
        {
          genericName: "Acepromazine Maleate",
          brandExample: "ACP / PromAce 10mg/ml",
          doseMgPerKg: 0.05,
          route: "IM",
          frequency: "TDS",
          durationDays: 5,
          pregnancySafe: false,
          notes: "Long-acting phenothiazine tranquilizer to lower peripheral sensitivity to sound, touch, and visual stimuli."
        }
      ],
      supportiveCare: [
        "House in an isolated, dark, completely silent, heavily padded stall with fresh thick bedding to prevent self-mutilation.",
        "Plug both external auditory ear canals firmly with cotton wool soaked in liquid paraffin to minimize acoustic reflex spasms.",
        "Locate, aggressively debride, open, and expose the primary puncture wound or hoof sole abscess; irrigate with 3% Hydrogen Peroxide.",
        "Provide parenteral nutrition or feed slurry / electrolytes via stomach tube if lockjaw prevents swallowing; insert sling if animal goes recumbent."
      ],
      contraindications: [
        "CRITICAL: Never administer Lincomycin, Clindamycin, Tylosin, or Erythromycin in adult equines (causes fatal necrotizing typhlocolitis).",
        "NEVER inject Procaine Penicillin G intravenously.",
        "Never disturb the horse unnecessarily with loud footsteps, flashlights, or sudden tactile stimulation.",
        "Avoid using high doses of Acepromazine in breeding stallions due to risk of persistent penile paralysis (priapism)."
      ],
      desiNuskhe: [
        {
          name: "काली मिर्च, लहसुन व तिल का तेल घाव लेप (Deep Puncture Wound Anaerobic Disinfectant)",
          ingredients: "Garlic cloves (Lahsun) 50g, Black Pepper (Kali Mirch) 10g, Pure Sesame Oil (Til Ka Tel) 100ml, Camphor (Kapur) 5g.",
          preparation: "Crush garlic and black pepper; fry gently in sesame oil until charred black. Strain warm oil and dissolve camphor.",
          administration: "Flush and pack deep penetrating hoof nail wounds, solar punctures, or harness galls thoroughly to eliminate anaerobic bacterial sporulation."
        },
        {
          name: "सौंफ, अश्वगंधा व मुलेठी शामक पेय (Herbal Neuro-Relaxant Slurry)",
          ingredients: "Ashwagandha root powder 50g, Mulethi (Glycyrrhiza glabra) 30g, Saunf (Fennel) 50g, Jaggery (Gur) 100g, Warm Water 1 Liter.",
          preparation: "Boil ingredients into a smooth decoction; strain through a fine mesh.",
          administration: "Administer via oral dosing catheter very gently to calm agitated horses suffering from early tetanic stiffness."
        }
      ],
      preventionAndVaccination: [
        "Tetanus Toxoid Vaccine (2 doses 4-6 weeks apart starting at 4-6 months of age; annual booster thereafter).",
        "Mandatory Tetanus Toxoid booster to all pregnant mares 4-6 weeks prior to foaling to confer colostral immunity to the foal.",
        "Administer prophylactic Tetanus Antitoxin (1,500 - 3,000 IU SC/IM) immediately following any puncture wound, surgical castration, or parturition.",
        "Keep stables, paddocks, and training tracks scrupulously free from old rusty nails, wire fences, and sharp metal debris."
      ]
    },
    {
      id: "equine-glanders",
      name: "Glanders / Farcy (Burkholderia mallei Infection)",
      nameHi: "ग्लैंडर्स / फारसी रोग (घातक संक्रामक जुनोटिक रोग - गांठदार नाड़ी व नाक से स्राव)",
      category: "Zoonotic / Regulatory",
      tempRange: {
        minF: 101.5,
        maxF: 104.5,
        normalF: 100.0
      },
      cardinalSymptoms: [
        "Nasal Form: Deep, punched-out, stellate (star-shaped) ulcers on nasal septal mucosa (नाक के परदे पर तारे के आकार के गहरे अल्सर व घाव)",
        "Unilateral or bilateral tenacious, yellowish-green purulent nasal discharge (एक या दोनों नथुनों से गाढ़ा पीला-हरा लसलसा मवाद बहना)",
        "Enlarged, hard, nodular, and non-painful submandibular lymph nodes adherent to the jaw bone (जबड़े की हड्डी से चिपकी हुई पत्थर जैसी सख्त गिल्टियां)",
        "Farcy Form: Cutaneous nodules ('Farcy buds') along the course of lymphatic vessels that break down into oily ulcers ('Farcy pipes') (त्वचा पर मोतियों जैसी गांठें, जो फूटकर तेल जैसा चिपचिपा मवाद छोड़ती हैं)",
        "Severe, progressive emaciation, chronic cough, and intermittent unresolving pyrexia (लगातार वजन घटना, सूखी खांसी व रुक-रुक कर तेज बुखार)",
        "Swelling and hard cord-like thickening of lymphatic vessels, especially in hind limbs (खासकर पिछले पैरों की नसों में सूजन व मोटी रस्सी जैसी गांठदार नाड़ी)"
      ],
      differentialDiagnosis: [
        "Strangles (Streptococcus equi)",
        "Epizootic Lymphangitis (Histoplasma capsulatum var. farciminosum)",
        "Ulcerative Lymphangitis (Corynebacterium pseudotuberculosis)",
        "Equine Viral Arteritis",
        "Rhodococcus equi pulmonary nodules"
      ],
      firstLineDrugs: [
        {
          genericName: "Mallein Intradermo-Palpebral Diagnostic Antigen",
          brandExample: "PPD Mallein National Diagnostic Reagent",
          doseMgPerKg: 0.1,
          route: "SC",
          frequency: "Stat",
          durationDays: 1,
          pregnancySafe: true,
          notes: "Official diagnostic test: 0.1 ml injected into the lower eyelid dermis. Positive reaction: Marked, painful blepharospasm and severe purulent conjunctivitis at 24-48 hours."
        },
        {
          genericName: "REGULATORY DIRECTIVE: Treatment Prohibited",
          brandExample: "National Glanders and Farcy Act Protocol",
          doseMgPerKg: 0.0,
          route: "IV",
          frequency: "Stat",
          durationDays: 0,
          pregnancySafe: false,
          notes: "STRICT WARNING: Treatment of Burkholderia mallei in horses is illegal and forbidden under WOAH and National Biosecurity Laws due to permanent carrier status and extreme fatal zoonotic lethality to humans."
        },
        {
          genericName: "Sulfadiazine + Trimethoprim (Experimental / Stabilization)",
          brandExample: "Tribrissen / Biotrim 48% Susp",
          doseMgPerKg: 24.0,
          route: "Oral",
          frequency: "BD",
          durationDays: 30,
          pregnancySafe: false,
          notes: "For human post-exposure prophylaxis or authorized military/quarantine containment only. Not permitted for clinical equine field therapy."
        }
      ],
      supportiveCare: [
        "IMMEDIATE STATUTORY ACTION: Notify State Veterinary Authorities and the Department of Animal Husbandry within 1 hour.",
        "Impose immediate total quarantine of the premise; restrict all movement of equines within an 8-km containment radius.",
        "Confirmed positive equines must be humanely euthanized in accordance with national biosecurity guidelines to stop zoonotic transmission.",
        "Deep carcass burial (minimum 8 feet deep covered with quicklime) or complete high-temperature incineration."
      ],
      contraindications: [
        "STRICTLY FORBIDDEN: Never attempt field therapy, lancing of farcy buds, or flushing of nasal discharges without Level-3 PPE.",
        "Never move exposed or untested equines to fairs, polo events, or public roads.",
        "Avoid handling suspect discharges with bare hands; Burkholderia mallei causes 95% fatal septicemic glanders in humans."
      ],
      desiNuskhe: [
        {
          name: "जैव-सुरक्षा चूना व फिनाइल डिसइंफेक्शन (Biosecurity Soil & Barn Sterilization)",
          ingredients: "Quicklime (Bujha Hua Chuna) 10kg, Bleaching Powder (Chlorinated Lime) 2kg, Water.",
          preparation: "Mix quicklime and bleaching powder in water to create a heavy white slurry.",
          administration: "Coat all stable floors, stall walls, feed mangers, and burying pits heavily to destroy persistent soil contamination."
        }
      ],
      preventionAndVaccination: [
        "There is NO safe or commercially licensed vaccine available anywhere globally for Glanders.",
        "Mandatory pre-movement Mallein screening and Complement Fixation Test (CFT) / ELISA certification for all equines before inter-state transit.",
        "Regular 6-monthly serological surveillance of all working horses, tonga ponies, mules, and stud farms.",
        "Strict isolation and biosecure destruction of all shared watering troughs and harness gear in outbreak areas."
      ]
    },
    {
      id: "equine-laminitis",
      name: "Equine Laminitis / Founder (Acute & Chronic Pododermatitis Aseptica)",
      nameHi: "अश्व लैमिनाइटिस / खुर प्रदाह (खुर की हड्डियों में सूजन, जलन व गंभीर लंगड़ापन)",
      category: "Orthopaedic / Hoof",
      tempRange: {
        minF: 99.0,
        maxF: 101.5,
        normalF: 100.0
      },
      cardinalSymptoms: [
        "Rocking-back stance: Shifting weight to hindquarters with front feet extended forward (वजन पिछले पैरों पर डालना व आगे के पैरों को सीधा आगे फैलाना)",
        "Bounding, throbbing digital arterial pulse palpable at the abaxial sesamoid bones (खुर के ऊपर डिजिटल धमनी में अत्यधिक तेज व गर्म धड़कन महसूस होना)",
        "Hoof wall and coronary band abnormally hot to touch (खुर की बाहरी दीवार व कोरोनरी बैंड का छूने पर बहुत गर्म होना)",
        "Marked reluctance to move; walking on heels with short, stilted, painful strides (चलने में अत्यधिक असमर्थता, लंगड़ाना व एड़ी के बल छोटे कदम रखना)",
        "Severe agonizing response to hoof testers placed over the toe region of the sole (खुर परीक्षक यंत्र लगाने पर खुर के अगले हिस्से में असहनीय दर्द)",
        "Dropping of sole, prominent seedy toe, and dorsal hoof rings in chronic founder (खुर का चपटा होना, तली का नीचे धंसना व खुर पर आड़ी धारियां पड़ना)"
      ],
      differentialDiagnosis: [
        "Bilateral Sole Abscess / Gravel",
        "Navicular Syndrome (Podotrochleosis)",
        "Fracture of Third Phalanx (P3 / Coffin Bone)",
        "Severe Bilateral Pleuritis",
        "Tetanus (early generalized stiff gait)"
      ],
      firstLineDrugs: [
        {
          genericName: "Flunixin Meglumine",
          brandExample: "Finadyne / Megludyne 50mg/ml",
          doseMgPerKg: 1.1,
          route: "IV",
          frequency: "BD",
          durationDays: 4,
          pregnancySafe: true,
          notes: "Essential for anti-endotoxic and intense anti-inflammatory inhibition in acute laminar ischemia. Administer strictly IV."
        },
        {
          genericName: "Acepromazine Maleate",
          brandExample: "ACP Injection 10mg/ml",
          doseMgPerKg: 0.04,
          route: "IM",
          frequency: "TDS",
          durationDays: 4,
          pregnancySafe: false,
          notes: "Alpha-1 adrenergic antagonist. Induces peripheral digital vasodilation to restore microvascular blood flow to starved epidermal laminae."
        },
        {
          genericName: "Pentoxifylline",
          brandExample: "Trental 400mg tabs / Trental IV",
          doseMgPerKg: 8.5,
          route: "Oral",
          frequency: "TDS",
          durationDays: 14,
          pregnancySafe: true,
          notes: "Hemorheologic agent. Reduces blood viscosity, prevents microthrombi formation, and enhances digital erythrocyte deformability."
        },
        {
          genericName: "DMSO (Dimethyl Sulfoxide 99%)",
          brandExample: "DMSO Medical Grade",
          doseMgPerKg: 1000.0,
          route: "IV",
          frequency: "OD",
          durationDays: 3,
          pregnancySafe: false,
          notes: "Potent free radical scavenger: 1.0 g/kg diluted as a 10% solution in 5% Dextrose/Saline IV slow drip to prevent ischemic reperfusion injury."
        }
      ],
      supportiveCare: [
        "CONTINUOUS DIGITAL CRYOTHERAPY: Immerse feet from mid-cannon bone down in ice-water slurry boots continuously for 48-72 hours in the developmental/acute phase.",
        "Deep bedding: Provide 12 to 18 inches of soft, clean, dry sand or fine wood shavings to distribute sole pressure evenly.",
        "Apply biomechanical frog-support pads (high-density foam or Styrofoam taped to the caudal two-thirds of the foot) to unload the fragile dorsal laminar wall.",
        "Immediately withhold all grains, lush green grass pasture, mollassed concentrates, and high-sugar feeds; feed solely soaked mature meadow hay."
      ],
      contraindications: [
        "CRITICAL: ABSOLUTELY NEVER administer Corticosteroids (Dexamethasone, Prednisolone, Triamcinolone) in horses; triggers or exacerbates fatal acute laminitis.",
        "DO NOT force the horse to walk or exercise during the acute stage; forced movement tears the compromised laminae and rotates P3 downwards.",
        "Avoid nerve blocks (abaxial sesamoid blocks) for pain relief unless immediate radiography is underway (masking pain causes catastrophic P3 sole penetration)."
      ],
      desiNuskhe: [
        {
          name: "ठंडी गीली मुल्तानी मिट्टी व कपूर लेप (Cooling Multani Mitti & Camphor Hoof Pack)",
          ingredients: "Fuller's Earth (Multani Mitti) 500g, Natural Camphor (Kapur) 20g, Rose Water or Cold Water.",
          preparation: "Soak Multani Mitti in cold water to form a dense clay paste. Powder the camphor and blend thoroughly.",
          administration: "Pack the entire sole cavity and crown of the hoof wall twice daily. Keeps the hoof capsule cool and draws out localized inflammatory heat."
        },
        {
          name: "मेथी व दालचीनी पाउडर रक्त-शर्करा शामक (Fenugreek & Cinnamon Metabolic Balancer)",
          ingredients: "Fenugreek Seed Powder (Methi Dana) 50g, Ceylon Cinnamon Powder (Dalchini) 15g.",
          preparation: "Finely grind whole methi seeds and pure cinnamon; mix thoroughly.",
          administration: "Feed mixed in soaked wheat bran or beet pulp twice daily. Increases insulin sensitivity in pasture/grain-overload induced founder."
        }
      ],
      preventionAndVaccination: [
        "Prevent carbohydrate and grain engorgement: Keep feed store rooms locked with childproof industrial latches at all times.",
        "Restrict access to lush spring pasture grass rich in non-structural carbohydrates (fructans), especially on sunny mornings.",
        "Treat retained placenta (afterbirth) in post-foaling mares immediately within 3-6 hours (metritis-endotoxemia laminitis cascade).",
        "Perform regular physiological corrective trimming every 4-6 weeks to maintain low heel and breakover alignment."
      ]
    },
    {
      id: "equine-influenza",
      name: "Equine Influenza (Equine Influenza Virus A/equi-2 H3N8)",
      nameHi: "अश्व फ्लू / संक्रामक जुकाम व खांसी (तीव्र श्वसन वायरल संक्रमण)",
      category: "Viral Respiratory",
      tempRange: {
        minF: 102.0,
        maxF: 106.0,
        normalF: 100.0
      },
      cardinalSymptoms: [
        "Sudden onset high fever (103°F to 106°F) with a typical biphasic peak (अचानक तेज बुखार 103-106°F और शरीर का तपना)",
        "Loud, dry, harsh, hacking paroxysmal cough that echoes across stables (गंभीर, सूखी, तेज गूंजने वाली बार-बार उठने वाली खांसी)",
        "Serous to watery profuse bilateral nasal discharge, becoming mucopurulent with secondary bacterial infection (शुरुआत में नाक से पतला पानी, बाद में गाढ़ा मवाद जैसा स्राव)",
        "Profound lethargy, stiff muscular movement, shivering, and total inappetence (अत्यधिक कमजोरी, बदन में अकड़न, कंपकंपी व भूख न लगना)",
        "Conjunctivitis, chemosis, photophobia, and marked lacrimation (आंखें लाल होना, सूजन आना, रोशनी से डर व लगातार पानी बहना)",
        "Mild swelling and tenderness of submandibular lymph nodes without abscessation (जबड़े के नीचे की ग्रंथियों में हल्का दर्द व सूजन)"
      ],
      differentialDiagnosis: [
        "Equine Herpesvirus-1 and 4 (EHV-1/4)",
        "Equine Viral Arteritis (EVA)",
        "Strangles (Streptococcus equi)",
        "Equine Rhinitis Viruses (A and B)",
        "Pleuropneumonia"
      ],
      firstLineDrugs: [
        {
          genericName: "Flunixin Meglumine",
          brandExample: "Megludyne / Finadyne 50mg/ml",
          doseMgPerKg: 1.1,
          route: "IV",
          frequency: "OD",
          durationDays: 3,
          pregnancySafe: true,
          notes: "Primary antipyretic to relieve high fever, reduce tracheal inflammation, and restore voluntary hydration."
        },
        {
          genericName: "Procaine Penicillin G",
          brandExample: "Depocillin 300,000 IU/ml",
          doseMgPerKg: 22.0,
          route: "IM",
          frequency: "BD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Indicated ONLY if fever persists >4 days or nasal discharge becomes thick and purulent (secondary Streptococcus zooepidemicus bronchopneumonia)."
        },
        {
          genericName: "Bromhexine Hydrochloride",
          brandExample: "Bisolvon / Brofex 4mg/ml",
          doseMgPerKg: 0.3,
          route: "IM",
          frequency: "BD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Mucolytic expectorant. Liquefies thick tracheobronchial secretions and restores ciliary mucociliary clearance."
        },
        {
          genericName: "Ascorbic Acid (Vitamin C)",
          brandExample: "Vitamax C 250mg/ml",
          doseMgPerKg: 10.0,
          route: "IV",
          frequency: "OD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Antioxidant support to accelerate respiratory epithelial mucosal regeneration."
        }
      ],
      supportiveCare: [
        "ABSOLUTE COMPLETE REST RULE: 1 full week of stall rest for every 1 day of fever (minimum 3 weeks total rest). Exercising causes fatal alveolar denudation.",
        "Provide dust-free, well-ventilated, airy stables; damp down wood shavings bedding or switch to shredded paper.",
        "Soak all hay and grass pellets in warm water for 20 minutes before feeding to prevent inhalation of fungal spores and dust.",
        "Perform warm menthol/eucalyptus steam inhalations using a nose bag twice daily to soothe the tracheal lining."
      ],
      contraindications: [
        "DO NOT work, gallop, train, or transport horses during or immediately following influenza infection (leads to chronic heaves/RAO).",
        "FATAL: Never administer Lincomycin, Clindamycin, Tylosin, or Tilmicosin in horses.",
        "Never administer Procaine Penicillin intravenously.",
        "Avoid indiscriminate use of heavy corticosteroids during acute viral replication."
      ],
      desiNuskhe: [
        {
          name: "अदरक, तुलसी व मुलेठी श्वसन काढ़ा (Ginger, Holy Basil & Licorice Respiratory Elixir)",
          ingredients: "Fresh Ginger (Adrak) 100g, Fresh Tulsi leaves 50 leaves, Licorice root (Mulethi) 40g, Black Pepper (Kali Mirch) 10g, Pure Honey 100ml.",
          preparation: "Crush ginger, tulsi, mulethi, and kali mirch. Boil in 1.5 liters water down to 500ml. Cool to room temperature and stir in raw honey.",
          administration: "Drench 250ml twice daily with a large dosing syringe. Coats the inflamed pharynx and calms acute paroxysmal coughing spasms."
        },
        {
          name: "नीलगिरी व अजवाइन भाप (Eucalyptus & Ajwain Bronchodilator Steam)",
          ingredients: "Eucalyptus Oil (Nilgiri Tel) 15ml, Ajwain seeds 50g, Boiling Water 5 Liters.",
          preparation: "Place boiling water in a bucket, add crushed ajwain and drops of eucalyptus oil.",
          administration: "Hold bucket safely near the horse's muzzle inside a loose burlap sack to allow the soothing vapors to penetrate congested airways."
        }
      ],
      preventionAndVaccination: [
        "Equine Influenza Vaccine (Inactivated or recombinant canarypox vectored H3N8 Florida sublineage clades 1 and 2).",
        "Vaccination schedule: Primary course at 6 months, booster at 7 months, second booster at 12-14 months, and mandatory 6-monthly boosters for racehorses/show jumpers.",
        "Enforce strict biosecurity: Disinfect horse trailers, feed boxes, and wash bays with potassium peroxymonosulfate (Virkon 1%).",
        "Immediately isolate any newly arrived coughing horse in a dedicated perimeter quarantine stable for 14 days."
      ]
    },
    {
      id: "equine-trypanosomiasis",
      name: "Equine Trypanosomiasis / Surra (Trypanosoma evansi Parasitemia)",
      nameHi: "अश्व सर्रा / तीबरसा (प्रोटोजोआ जनित पीलिया, रक्तहीनता, पिछले पैरों का पक्षाघात व पीला पेशाब)",
      category: "Protozoan",
      tempRange: {
        minF: 101.5,
        maxF: 105.5,
        normalF: 100.0
      },
      cardinalSymptoms: [
        "Intermittent, paroxysmal, fluctuating fever spikes matching waves of blood parasitemia (लहरदार रुक-रुक कर आने वाला तेज बुखार)",
        "Progressive, profound emaciation, muscle wasting, and rough, dry 'starry coat' despite good appetite (लगातार वजन गिरना, कमजोरी व रोएं खड़े होना)",
        "Marked dependent, pitting edema of the sheath, scrotum, ventral abdomen, and lower limbs (अंडकोष, पेट के निचले हिस्से व पैरों में पानी भर जाना / गड्ढेदार सूजन)",
        "Pale, icteric (yellowish) conjunctiva with multiple petechial hemorrhages (आंखों व मसूड़ों का पीला पड़ना व खून के छोटे लाल धब्बे दिखना)",
        "Progressive posterior ataxia, swaying gait, and partial hindquarter paralysis (पिछले पैरों में लड़खड़ाहट, कमजोरी व कमर का बैठ जाना)",
        "Dark yellow to bloody urine, severe anemia, and sudden terminal recumbency (गहरा पीला या लाल पेशाब, खून की भारी कमी व बैठ जाना)"
      ],
      differentialDiagnosis: [
        "Equine Infectious Anemia (Swamp Fever)",
        "Equine Piroplasmosis (Babesia caballi / Theileria equi)",
        "Equine Herpesvirus-1 Myeloencephalopathy (EHM)",
        "Chronic Liver Failure",
        "Purpura Hemorrhagica"
      ],
      firstLineDrugs: [
        {
          genericName: "Quinapyramine Sulfate + Quinapyramine Chloride",
          brandExample: "Triquin / Antrycide Pro-Salt (1.5g + 1.0g vial)",
          doseMgPerKg: 4.0,
          route: "SC",
          frequency: "Stat",
          durationDays: 1,
          pregnancySafe: true,
          notes: "Curative and prophylactic agent of choice: 0.025 ml/kg of 10% reconstituted suspension injected strictly Subcutaneously (SC) in divided doses on both sides of neck. Never inject IV."
        },
        {
          genericName: "Diminazene Diaceturate",
          brandExample: "Berenil / Diminavet 7% Solution",
          doseMgPerKg: 3.5,
          route: "IM",
          frequency: "Stat",
          durationDays: 1,
          pregnancySafe: false,
          notes: "Deep IM. High therapeutic efficacy, but narrow safety margin in equines (causes local pain and potential neurologic reactions in donkeys/mules; monitor closely)."
        },
        {
          genericName: "Iron Dextran Complex",
          brandExample: "Imferon / Feroset 100mg/ml",
          doseMgPerKg: 5.0,
          route: "IM",
          frequency: "OD",
          durationDays: 3,
          pregnancySafe: true,
          notes: "Hematinic for rapid correction of severe hemolytic microcytic anemia. Inject deep IM using Z-track technique."
        },
        {
          genericName: "B-Complex + Liver Extract + Vitamin B12",
          brandExample: "Belamyl / Tonophosphan",
          doseMgPerKg: 0.05,
          route: "IM",
          frequency: "BD",
          durationDays: 7,
          pregnancySafe: true,
          notes: "Promotes erythropoiesis, treats neurologic exhaustion, and supports compromised hepatic parenchyma."
        }
      ],
      supportiveCare: [
        "House in a fly-proof, mesh-screened stall to eliminate biting vectors (Tabanus and Stomoxys flies).",
        "Provide daily high-energy, protein-rich diets with molasses, mineral-vitamin supplements, and soaked crushed oats.",
        "Administer IV Ringer's Lactate and 5% Dextrose infusion to treat hypoglycemia and toxic cachexia.",
        "Apply soft padded support and turn recumbent horses every 3 hours to prevent decubital pressure sores."
      ],
      contraindications: [
        "CRITICAL: Never administer Quinapyramine salts intravenously (induces fatal curare-like neuromuscular collapse and cardiac arrest).",
        "Do not administer Diminazene Diaceturate repeatedly in short intervals due to profound neurotoxicity in equids.",
        "Corticosteroids are contraindicated during active parasitemia as they trigger fulminant trypanosomal proliferation."
      ],
      desiNuskhe: [
        {
          name: "गिलोय, आंवला व पुनर्नवा यकृत-रक्तवर्धक काढ़ा (Giloy, Amla & Punarnava Hematinic Brew)",
          ingredients: "Giloy stems (Tinospora cordifolia) 100g, Dried Amla (Emblica officinalis) 50g, Punarnava root 50g, Jaggery (Gur) 150g, Water 2 Liters.",
          preparation: "Crush the herbs and boil in 2 liters water down to 750ml. Dissolve jaggery in the strained warm decoction.",
          administration: "Administer 350ml orally every morning for 14 days. Rebuilds depleted hemoglobin, relieves ventral edema, and protects the liver."
        },
        {
          name: "नीम तेल व कपूर मक्खी भगाने वाला स्प्रे (Neem Oil & Camphor Tabanid Fly Repellent)",
          ingredients: "Pure Neem Oil 250ml, Camphor (Kapur) 25g, Citronella Oil 10ml, Liquid Soap 10ml, Water 1 Liter.",
          preparation: "Dissolve camphor in warm neem oil. Add citronella and liquid soap, then shake vigorously with water.",
          administration: "Spray or wipe over the legs, belly, and neck twice daily during high fly season to block mechanical transmission by horse flies."
        }
      ],
      preventionAndVaccination: [
        "There is no functional vaccine available for Trypanosoma evansi due to extensive variant surface glycoprotein (VSG) gene switching.",
        "Execute vector control: Eliminate stagnant water pools near stables; spray walls with Deltamethrin 1.25% or Cypermethrin.",
        "Prophylactic mass administration of Quinapyramine prosalt (3-5 mg/kg SC) every 3 months during monsoon fly breeding seasons.",
        "Routine wet blood film, Giemsa smear, and Card Agglutination Test for Trypanosomiasis (CATT) screening."
      ]
    },
    {
      id: "equine-habronemiasis",
      name: "Cutaneous Habronemiasis / Summer Sores (Habronema & Draschia Granuloma)",
      nameHi: "अश्व समर सोर / बरसाती घाव (मक्खियों के लार्वा जनित अत्यधिक मांस बढ़ जाने वाले घाव)",
      category: "Parasitic Cutaneous",
      tempRange: {
        minF: 99.0,
        maxF: 100.8,
        normalF: 100.0
      },
      cardinalSymptoms: [
        "Rapidly expanding, non-healing, exuberant ulcerated granulomatous lesions ('Proud Flesh') (घाव पर अत्यधिक लाल, उभरा हुआ व न भरने वाला मांस का बढ़ना)",
        "Lesions prominently localized on the medial canthus of the eye, urethral process/sheath, and distal extremities (आंख के भीतरी कोने, शिश्न/लिंग के मुहाने व पैरों के निचले हिस्सों पर घाव)",
        "Greasy, reddish-brown granular discharge containing tiny calcified whitish-yellow gritty granules (घाव से लाल-भूरा चिपचिपा पानी व चूने जैसी छोटी सफेद-पीली कंक्रीट की गांठें निकलना)",
        "Intense, agonizing pruritus causing relentless self-mutilation, biting, and rubbing (अत्यधिक खुजली के कारण घोड़े का घाव को दांतों से काटना व दीवार से रगड़ना)",
        "Persistent lacrimation, severe blepharospasm, and conjunctival granulation in ocular habronemiasis (आंख में होने पर लगातार आंसू बहना, आंख बंद रखना व लाल मांस की गांठ)",
        "Dysuria, foul discharge, or mechanical obstruction during urination when the urethral process is involved (मूत्र त्याग में रुकावट या शिश्न से बदबूदार स्राव आना)"
      ],
      differentialDiagnosis: [
        "Equine Sarcoid (Fibroblastic form)",
        "Exuberant Granulation Tissue ('Proud Flesh')",
        "Squamous Cell Carcinoma (SCC)",
        "Pythiosis (Swamp Cancer)",
        "Botryomycosis (Staphylococcal pseudomycetoma)"
      ],
      firstLineDrugs: [
        {
          genericName: "Ivermectin 1.87% Oral Paste",
          brandExample: "Eqvalan / Bimectin / Vetmectin Paste",
          doseMgPerKg: 0.2,
          route: "Oral",
          frequency: "Stat",
          durationDays: 1,
          pregnancySafe: true,
          notes: "0.2 mg/kg PO. Rapidly kills both the gastric adult worms and migrating cutaneous Habronema / Draschia larvae within tissues. Repeat dose after 2 weeks."
        },
        {
          genericName: "Moxidectin 2% Oral Gel",
          brandExample: "Equest Gel",
          doseMgPerKg: 0.4,
          route: "Oral",
          frequency: "Stat",
          durationDays: 1,
          pregnancySafe: true,
          notes: "Highly lipophilic macrocyclic lactone alternative with extended tissue persistence to clear refractory larval burdens."
        },
        {
          genericName: "Triamcinolone Acetonide",
          brandExample: "Kenacort 10mg/ml / Tricort",
          doseMgPerKg: 0.02,
          route: "SC",
          frequency: "OD",
          durationDays: 2,
          pregnancySafe: false,
          notes: "Intralesional infiltration (0.5 to 1.0 ml directly into granuloma base) to arrest severe eosinophilic hypersensitivity reaction. Use strictly with caution."
        },
        {
          genericName: "Topical Ivermectin + DMSO + Corticosteroid Compound Dressing",
          brandExample: "Custom Equine Extemporaneous Ointment",
          doseMgPerKg: 0.0,
          route: "Topical",
          frequency: "BD",
          durationDays: 14,
          pregnancySafe: true,
          notes: "Mix 10 ml Ivermectin injectable (1%) + 50 ml DMSO 90% + 10 mg Dexamethasone/Triamcinolone + 50g Furacin ointment. Apply topically directly to lesions under bandage."
        }
      ],
      supportiveCare: [
        "Surgically debulk and curette exuberant proud flesh down to healthy tissue margins under regional anesthesia before applying topical therapy.",
        "Flush lesions with warm sterile saline; apply clean non-stick dressing and supportive pressure bandaging changed every 48 hours.",
        "Fit horse with protective fly masks and leg wraps to physically prevent houseflies (Musca domestica) and stable flies from feeding on lesions.",
        "Compost or remove manure piles daily to destroy the primary larval breeding ground of intermediate fly vectors."
      ],
      contraindications: [
        "CRITICAL: Do NOT administer systemic corticosteroids in horses prone to or with a history of Laminitis.",
        "Never apply caustic powders (e.g., pure unslaked lime or copper sulfate crystals) without anesthesia; causes deep tissue necrosis and permanent disfigurement.",
        "Avoid leaving moist, weeping wounds unbandaged during daylight fly-feeding hours."
      ],
      desiNuskhe: [
        {
          name: "कपूर, नीला थोथा व गंधक रोगाणुरोधक लेप (Camphor, Purified Blue Vitriol & Sulphur Healing Paste)",
          ingredients: "Camphor (Kapur) 20g, Shuddha Nila Thotha (Purified Copper Sulfate) 5g, Sulphur (Gandhak) 20g, Pure Vaseline or Ghee 100g.",
          preparation: "Triturate purified copper sulfate and sulphur into ultra-fine powder. Incorporate powdered camphor into warm petroleum jelly or Desi Ghee.",
          administration: "Smear over the debulked wound margins once daily. Shrinks exuberant proud flesh, kills fly maggots/larvae, and promotes edge epithelization."
        },
        {
          name: "नीम व करंज तेल घाव रक्षक मलहम (Neem & Karanja Larvicidal Barrier)",
          ingredients: "Neem Oil 50ml, Karanja Oil (Pongamia pinnata) 50ml, Turmeric (Haldi) 20g, Beeswax 30g.",
          preparation: "Melt beeswax gently; blend in neem oil, karanja oil, and turmeric powder until smooth ointment forms.",
          administration: "Apply around wound edges and eyes daily. Serves as a waterproof biological barrier against fly oviposition."
        }
      ],
      preventionAndVaccination: [
        "No commercial vaccine exists; control relies entirely on interrupting the parasite-fly life cycle.",
        "Regular whole-herd anthelmintic deworming with Ivermectin or Moxidectin at spring onset and late autumn.",
        "Aggressive stable fly control: Install automated fly misting systems (Pyrethrins), predatory parasitic wasps, and fly traps.",
        "Immediately cleanse, treat, and bandage any minor harness gall, wire cut, or tick bite to prevent fly attraction."
      ]
    }
  ];

  // 3. CLINICAL SEARCH & RETRIEVAL HELPER METHODS
  window.VetcareApp.ClinicalData.getDiseaseById = function (id) {
    if (!id || typeof id !== "string") return null;
    const cleanId = id.trim().toLowerCase();
    const list = window.VetcareApp.ClinicalData.Equine || [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].id.toLowerCase() === cleanId) {
        return list[i];
      }
    }
    return null;
  };

  window.VetcareApp.ClinicalData.searchDiseasesBySymptom = function (symptomQuery) {
    if (!symptomQuery || typeof symptomQuery !== "string") return [];
    const query = symptomQuery.trim().toLowerCase();
    const list = window.VetcareApp.ClinicalData.Equine || [];
    const results = [];

    for (let i = 0; i < list.length; i++) {
      const disease = list[i];
      let matched = false;

      // Check symptoms
      if (Array.isArray(disease.cardinalSymptoms)) {
        for (let j = 0; j < disease.cardinalSymptoms.length; j++) {
          if (disease.cardinalSymptoms[j].toLowerCase().indexOf(query) !== -1) {
            matched = true;
            break;
          }
        }
      }

      // Check disease name (both English & Hindi)
      if (!matched && disease.name && disease.name.toLowerCase().indexOf(query) !== -1) {
        matched = true;
      }
      if (!matched && disease.nameHi && disease.nameHi.toLowerCase().indexOf(query) !== -1) {
        matched = true;
      }

      // Check differential diagnoses
      if (!matched && Array.isArray(disease.differentialDiagnosis)) {
        for (let k = 0; k < disease.differentialDiagnosis.length; k++) {
          if (disease.differentialDiagnosis[k].toLowerCase().indexOf(query) !== -1) {
            matched = true;
            break;
          }
        }
      }

      if (matched) {
        results.push(disease);
      }
    }
    return results;
  };

  window.VetcareApp.ClinicalData.getDiseasesByCategory = function (category) {
    if (!category || typeof category !== "string") return [];
    const targetCat = category.trim().toLowerCase();
    const list = window.VetcareApp.ClinicalData.Equine || [];
    const results = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].category && list[i].category.toLowerCase() === targetCat) {
        results.push(list[i]);
      }
    }
    return results;
  };

})();
