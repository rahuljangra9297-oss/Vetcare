// Vetcare AI OS - Avian & Commercial Poultry Clinical Disease Database, Water Medication & Flock Rx (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. AVIAN CLINICAL DATABASE DOSSIERS (COMPREHENSIVE ZERO-PLACEHOLDER SPECIFICATION)
  window.VetcareApp.ClinicalData.Avian = [
    {
      id: "avian-ranikhet",
      name: "Newcastle Disease / Ranikhet Disease (Avian Orthoavulavirus 1 / NDV)",
      nameHi: "रानीखेत रोग / न्यूकैसल डिजीज (मुर्गियों का अतिसंक्रामक तंत्रिका व श्वसन विकार)",
      category: "Viral Systemic",
      tempRange: {
        minF: 106.0,
        maxF: 110.0,
        normalF: 106.5
      },
      cardinalSymptoms: [
        "Pathognomonic nervous signs: Torticollis (severe neck twisting), star-gazing, circling, and backward walking (गर्दन का मुड़ना, आसमान की ओर देखना व गोल-गोल घूमना)",
        "Profuse, bright greenish-white watery diarrhea with soiled vent feathers (चमकीले हरे व सफेद रंग के पतले दस्त लगना)",
        "Severe respiratory distress: Gaspy rales, open-mouth breathing, coughing, and rattling tracheobronchial sounds (मुंह खोलकर हांफना, सांस लेने में खर्र-खर्र की आवाज)",
        "Dramatic, sudden drop in flock egg production (up to 100% loss) with thin-shelled, deformed, or shell-less eggs (अंडों के उत्पादन में अचानक भारी गिरावट व पतले छिलके वाले अंडे)",
        "Cyanosis and dark purplish discoloration of comb and wattles accompanied by facial edema (कलगी व गलकंबलों का नीला-बैंगनी पड़ना व चेहरे पर सूजन)",
        "High flock morbidity and peracute mortality reaching 90-100% in velogenic viscerotropic strains (झुंड में तेजी से फैलना व अत्यधिक मृत्यु दर)"
      ],
      differentialDiagnosis: [
        "Highly Pathogenic Avian Influenza (HPAI)",
        "Infectious Laryngotracheitis (ILT)",
        "Avian Encephalomyelitis (in young chicks)",
        "Infectious Coryza",
        "Vitamin E / Selenium Deficiency (Crazy Chick Disease)"
      ],
      firstLineDrugs: [
        {
          genericName: "Enrofloxacin 10% Oral Solution",
          brandExample: "Meriquin / Enrocin 10%",
          doseDrinkingWaterPer1000Birds: "150 ml per 1,000 commercial broilers (equivalent to 10 mg/kg body weight) mixed in 100 Liters drinking water",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 5,
          notes: "Essential to prevent secondary bacterial Escherichia coli septicemia and necrotic airsacculitis. Does not kill NDV directly."
        },
        {
          genericName: "Paracetamol + Vitamin C Soluble Powder",
          brandExample: "Pyrigesic-Vet / Calpol Poultry Mix",
          doseDrinkingWaterPer1000Birds: "150g per 1,000 birds in morning drinking water",
          route: "Drinking Water",
          frequency: "OD",
          durationDays: 3,
          notes: "Potent antipyretic and anti-stress therapy to lower flock hyperthermia and alleviate acute respiratory inflammation."
        },
        {
          genericName: "Vitamin E 50% + Sodium Selenite + Biotin",
          brandExample: "Sel-E-Vit / E-Care Se Powder",
          doseDrinkingWaterPer1000Birds: "100g per 1,000 birds in clean water",
          route: "Drinking Water",
          frequency: "OD",
          durationDays: 7,
          notes: "Essential immunostimulant and antioxidant to protect damaged nervous tissue and enhance flock humoral antibody recovery."
        },
        {
          genericName: "Emergency Revaccination: ND LaSota Strain",
          brandExample: "Indovax ND LaSota Live Vaccine",
          doseDrinkingWaterPer1000Birds: "1,000 doses diluted in 20-30 Liters of non-chlorinated water containing 2g/L skimmed milk powder",
          route: "Drinking Water",
          frequency: "OD",
          durationDays: 1,
          notes: "Administer ONLY in early outbreak phase (mortality <1%) via clean drinking water or coarse eye-drop spray to stimulate rapid local mucosal interferon response."
        }
      ],
      supportiveCare: [
        "Immediate strict flock biosecurity: Restrict external human visitors, vehicles, and egg crates; install footbaths with potassium peroxymonosulfate (Virkon-S 1%).",
        "Elevate shed temperature by 2-3°F for brooding chicks to offset hypothermia and cold stress during acute illness.",
        "Ensure round-the-clock cool, clean, non-chlorinated drinking water supplemented with balanced oral electrolytes (ORS).",
        "Flush automatic nipple drinker lines with hydrogen peroxide (3%) or citric acid during shed sanitation to remove biofilm."
      ],
      contraindications: [
        "NEVER consume, transport, or sell culled carcasses of birds that died from velogenic Newcastle Disease (must be incinerated or buried 6 feet deep).",
        "Avoid using water sanitizers (Chlorine/Bleach) in drinking water 24 hours before and 24 hours after live LaSota vaccination (inactivates vaccine virus).",
        "Do NOT administer nephrotoxic drugs (such as high-dose Gentamicin) during acute systemic dehydration."
      ],
      desiNuskhe: [
        {
          name: "हल्दी, अदरक व काली मिर्च का काढ़ा (Turmeric, Ginger & Black Pepper Respiratory Decoction)",
          ingredients: "Pure Turmeric powder (Haldi) 250g, Crushed fresh ginger (Adrak) 250g, Black pepper powder (Kali Mirch) 50g, Jaggery (Gur) 1 kg, Water 10 Liters.",
          preparation: "Boil crushed ginger, black pepper, and turmeric in 10 liters water down to 7 liters. Dissolve jaggery in the strained warm liquid.",
          administration: "Mix the 7-liter decoction into 100 Liters of drinking water for 1,000 birds OD for 3-5 days. Powerful natural antimicrobial, expectorant, and energy booster."
        },
        {
          name: "चूना व फिनाइल स्प्रे (Dry Slaked Lime & Phenol Floor Disinfection)",
          ingredients: "Dry slaked lime powder (Bujha Hua Chuna) 25kg, Pure Phenol crystals 500g.",
          preparation: "Mix dry lime powder with finely dispersed phenol in outdoor air.",
          administration: "Dust evenly over walking aisles and outside flock perimeter curtains twice weekly to prevent wild bird virus introduction."
        }
      ],
      preventionAndVaccination: [
        "Day 1 (Hatchery): ND live F-strain or C2 strain via eye-drop + ND killed oily emulsion (0.2 ml SC at hatchery neck).",
        "Day 5-7: ND LaSota or B1 strain live ocular eye-drop or drinking water vaccination.",
        "Day 18-21: ND LaSota Clone-30 booster in drinking water.",
        "Day 45-60 (Layers/Breeders): ND R2B (Mukteswar strain) 0.5 ml IM/SC booster.",
        "Every 6-8 weeks in commercial layers: Periodic LaSota booster via drinking water."
      ]
    },
    {
      id: "avian-gumboro",
      name: "Infectious Bursal Disease / IBD / Gumboro (Avian Birnavirus Immunosuppressive Enteropathy)",
      nameHi: "गम्बोरो रोग / संक्रामक बर्सा रोग (मुर्गियों की रोग प्रतिरोधक क्षमता का नाश व गुर्दों की सूजन)",
      category: "Viral Immunosuppressive",
      tempRange: {
        minF: 107.0,
        maxF: 110.5,
        normalF: 106.5
      },
      cardinalSymptoms: [
        "Pathognomonic vent-pecking behavior: Birds pecking vigorously at their own vents or flock-mates' vents (मुर्गियों का अपनी या दूसरों की गुदा / वेंट को नोंचना)",
        "Profuse, watery to mucoid yellowish-white diarrhea leaving heavily soiled, pasty cloacal vent feathers (सफेद-पीले रंग के पतले दस्त व गुदा के पंखों पर बीट चिपकना)",
        "Severe flock depression, trembling, ruffled plumage, prostration, and sitting on hocks with eyes closed (पंख फुलाकर, आंखें बंद कर कंपकंपी के साथ एक जगह बैठना)",
        "Gross post-mortem pathognomonic lesion: Severely enlarged, edematous, hemorrhagic or gelatinous Bursa of Fabricius (पोस्टमार्टम पर बर्सा थैली में खून व सूजन दिखना)",
        "Extensive paint-brush hemorrhages on thigh and pectoral breast musculature (जांघ व सीने की मांसपेशियों पर खून के लाल धब्बे दिखना)",
        "Severe nephrosis: Swollen, pale, urate-distended kidneys plugged with chalky white urate deposits (गुर्दों का सूज जाना व सफेद यूरिक एसिड से भर जाना)"
      ],
      differentialDiagnosis: [
        "Newcastle Disease (viscerotropic velogenic form)",
        "Avian Coccidiosis",
        "Chicken Infectious Anemia (CIA)",
        "Mycotoxicosis (Aflatoxin / Ochratoxin nephrotoxicosis)",
        "Acute Sulfonamide Drug Overdose"
      ],
      firstLineDrugs: [
        {
          genericName: "Potassium Citrate + Sodium Bicarbonate + Ammonium Chloride (Kidney Flusher)",
          brandExample: "Nephrotec Liquid / K-Flush Oral",
          doseDrinkingWaterPer1000Birds: "200 ml per 1,000 birds mixed in 50 Liters of drinking water",
          route: "Drinking Water",
          frequency: "OD",
          durationDays: 4,
          notes: "CRITICAL LIFE-SAVING INTERVENTION: Solubilizes inspissated urate crystals in occluded renal tubules and prevents acute fatal uremic nephrosis."
        },
        {
          genericName: "Oral Rehydration Electrolytes (ORS) + Dextrose Anhydrous",
          brandExample: "Electral-Vet / Agrolytes Powder",
          doseDrinkingWaterPer1000Birds: "250g per 1,000 birds in drinking water",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 4,
          notes: "Rapidly corrects massive metabolic acidosis, hypokalemia, and severe dehydration induced by osmotic cloacal diarrhea."
        },
        {
          genericName: "Vitamin E + Selenium + Vitamin C Immunostimulant",
          brandExample: "Immupet-Poultry / E-Care Se Powder",
          doseDrinkingWaterPer1000Birds: "150g per 1,000 birds in clean drinking water",
          route: "Drinking Water",
          frequency: "OD",
          durationDays: 5,
          notes: "Rebuilds damaged mucosal B-cell lineages and counters catastrophic immunosuppression."
        },
        {
          genericName: "Levamisole Hydrochloride (Low-Dose Immunomodulator)",
          brandExample: "Levasol 30% Soluble Powder",
          doseDrinkingWaterPer1000Birds: "2.5 mg/kg body weight (approx 15g per 1,000 birds) in single morning water",
          route: "Drinking Water",
          frequency: "OD",
          durationDays: 1,
          notes: "Used strictly at a low immunomodulatory dose on day 4 of outbreak to reactivate depressed T-lymphocyte cell-mediated immunity."
        }
      ],
      supportiveCare: [
        "WITHHOLD ALL NEPHROTOXIC MEDICATIONS IMMEDIATELY: Stop all sulfonamides, aminoglycosides (gentamicin, neomycin), and high-protein feed supplements.",
        "Reduce feed crude protein by 2-3% during the acute 4-day mortality peak to decrease the nitrogenous metabolic burden on swollen kidneys.",
        "Add Jaggery (Gur 2-3g/L) to drinking water to supply rapid calories, stimulate voluntary water intake, and produce gentle osmotic flushing.",
        "Ensure dry floor litter management: Rake litter frequently and top-dress with fresh dry wood shavings to prevent dampness."
      ],
      contraindications: [
        "CRITICAL: ABSOLUTELY NEVER administer Sulfonamide drugs (Sulfaclozine, Sulfaquinoxaline) during IBD; precipitates fatal irreversible renal tubular block.",
        "NEVER vaccinate a flock actively undergoing clinical IBD mortality (accelerates bursal lymphoid necrosis and causes mass death).",
        "Avoid using hard, highly saline borewell water during renal recovery."
      ],
      desiNuskhe: [
        {
          name: "गुड़ व अजवाइन का गुर्दा शोधक घोल (Jaggery & Ajwain Kidney Cleansing Flush)",
          ingredients: "Pure dark Jaggery (Desi Gur) 2 kg, Ajwain seeds (Carom seeds) 150g, Rock salt 50g, Clean water 20 Liters.",
          preparation: "Boil ajwain in 5 liters water for 15 minutes. Dissolve jaggery and rock salt thoroughly in the warm decoction; strain through cloth.",
          administration: "Mix into 100 Liters drinking water for 1,000 birds for 3 consecutive mornings. Flushes clogged kidneys, restores stamina, and provides clean energy."
        },
        {
          name: "धनिया व सौंफ मूत्रल पेय (Coriander & Fennel Diuretic Infusion)",
          ingredients: "Crushed Coriander seeds (Dhaniya) 200g, Fennel seeds (Saunf) 200g, Clean water 10 Liters.",
          preparation: "Soak coriander and fennel in 10 liters water overnight; boil gently in the morning for 10 minutes and strain.",
          administration: "Provide in drinking water to relieve severe renal colic and reduce visceral uric acid accumulation."
        }
      ],
      preventionAndVaccination: [
        "Day 12-14: IBD Intermediate or Intermediate Plus live vaccine (e.g., Georgia strain or MB strain) via drinking water or eye-drop.",
        "Day 22-24: IBD booster in drinking water for commercial broilers in high-challenge zones.",
        "Vaccinate breeder parent flocks with inactivated oily IBD vaccine at 16-18 weeks to ensure high maternal antibody (MDA) transfer to day-old chicks.",
        "IBD virus is notoriously stable in sheds and resistant to most disinfectants; decontaminate empty sheds with Formalin (40%) fumigation or Glutacide."
      ]
    },
    {
      id: "avian-coccidiosis",
      name: "Avian Coccidiosis (Eimeria tenella, E. necatrix & E. acervulina Enteritis)",
      nameHi: "मुर्गियों की खूनी पेचिश / कॉक्सीडियोसिस (आंतों का परजीवी संक्रमण, खूनी बीट व कमजोरी)",
      category: "Protozoan Parasitic",
      tempRange: {
        minF: 106.0,
        maxF: 108.5,
        normalF: 106.5
      },
      cardinalSymptoms: [
        "Pathognomonic cecal droppings: Fresh frank blood, bloody mucus, and dark reddish-brown clotted feces in floor litter (बीट में चमकीला लाल खून व खूनी मवाद आना)",
        "Hunched-up posture with drooping wings, ruffled unkempt feathers, and head tucked into the shoulders (पंख गिराकर, गर्दन सिकोड़कर गोल मटोल बनकर बैठना)",
        "Severe pallor of comb, wattles, and skin indicating rapid blood loss and severe microcytic anemia (कलगी व आंखों का पीला-सफेद पड़ना व खून की भारी कमी)",
        "Extreme anorexia and huddling together near heat sources despite adequate house temperature (चारा छोड़ना व ठंड लगने के कारण आपस में चिपककर बैठना)",
        "Dramatic loss of body weight, poor feed conversion ratio (FCR), and stunted flock uniformity (वजन न बढ़ना व मुर्गियों का आकार असमान होना)",
        "Gross necropsy: Severely ballooned, blood-distended ceca packed with core clotted blood (E. tenella) or 'salt-and-pepper' white/red mucosal spots (E. necatrix) (अंधनाल / सीकम का खून से सूज जाना)"
      ],
      differentialDiagnosis: [
        "Necrotic Enteritis (Clostridium perfringens)",
        "Ulcerative Enteritis (Clostridium colinum)",
        "Histomoniasis / Blackhead (in turkeys and chickens)",
        "Mycotoxicosis (Trichothecenes)",
        "Salmonella enterica (Pullorum disease in chicks)"
      ],
      firstLineDrugs: [
        {
          genericName: "Toltrazuril 2.5% Oral Solution",
          brandExample: "Baycox 2.5% / Toltranuril Oral",
          doseDrinkingWaterPer1000Birds: "28 ml per 100 kg body weight (approx 150-200 ml per 1,000 broilers) in 100 Liters drinking water",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 2,
          notes: "GOLD STANDARD COCCIDIOCIDE: 7 mg/kg body weight per day administered for 2 consecutive days (either continuous 24 hours or 8 hours daily). Kills all intracellular developmental stages (schizonts and gametocytes)."
        },
        {
          genericName: "Amprolium 20% Soluble Powder",
          brandExample: "Amprol-20 / Coccistop Powder",
          doseDrinkingWaterPer1000Birds: "250g per 1,000 birds in 100 Liters drinking water",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 5,
          notes: "Thiamine antagonist. Highly safe for both broilers and commercial layers with zero egg withdrawal period. Administer full dose for 5 days, followed by half dose for 7 days."
        },
        {
          genericName: "Sulfaclozine Sodium Monohydrate 30%",
          brandExample: "Esb3 30% / Clozin Powder",
          doseDrinkingWaterPer1000Birds: "150g per 1,000 birds in drinking water",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 3,
          notes: "Administer on '3-2-3' pulse schedule: 3 days medicated water, 2 days plain water, 3 days medicated water. Excellent for mixed Eimeria and concurrent E. coli infections."
        },
        {
          genericName: "Menadione Sodium Bisulfite (Vitamin K3)",
          brandExample: "Vit-K3 Soluble / Kapilin Mix",
          doseDrinkingWaterPer1000Birds: "20g per 1,000 birds in morning drinking water",
          route: "Drinking Water",
          frequency: "OD",
          durationDays: 5,
          notes: "Essential hemostatic cofactor. Accelerates prothrombin synthesis to rapidly arrest profuse cecal capillary bleeding."
        }
      ],
      supportiveCare: [
        "LITTER HYGIENE INTERVENTION: Immediately remove wet, caked litter around drinker lines; spread fresh dry sawdust or rice husk; treat floor with dry calcium carbonate.",
        "Add Vitamin A (50,000 IU/L) to drinking water to accelerate the regeneration of damaged enteric and cecal epithelial lining.",
        "Provide liver protective tonics containing choline chloride and silymarin to restore appetite and metabolize breakdown products.",
        "Check water flow rates on nipple drinkers; ensure birds are not deprived of water which increases concentrated litter pecking."
      ],
      contraindications: [
        "NEVER administer high doses of Vitamin B1 (Thiamine) concurrently with Amprolium (Thiamine directly neutralizes the coccidiostatic mode of action of Amprolium).",
        "Avoid continuous, non-stop Sulfonamide therapy exceeding 5 consecutive days (causes severe bone marrow hypoplasia, aplastic anemia, and renal damage).",
        "NEVER allow wet, damp, packed bedding in brooding sheds (warm damp litter is the ultimate incubator for sporulating infectious Eimeria oocysts)."
      ],
      desiNuskhe: [
        {
          name: "हल्दी, लहसुन व छाछ का आंत शोधक घोल (Turmeric, Garlic & Buttermilk Gut Restorer)",
          ingredients: "Fresh crushed Garlic (Lahsun) 250g, Pure Turmeric powder (Haldi) 250g, Fresh cultured Buttermilk (Chhachh) 5 Liters, Clean water 20 Liters.",
          preparation: "Blend crushed garlic and turmeric into buttermilk; dilute with water and strain.",
          administration: "Provide in drinking water for 1,000 birds OD for 3 days. Garlic allicin inhibits coccidial sporozoites, turmeric heals ulcers, and lactic acid bacteria lower gut pH."
        },
        {
          name: "अनारदाना व कत्था रक्तरोधी काढ़ा (Pomegranate Rind & Catechu Hemostatic Drench)",
          ingredients: "Dried Pomegranate rind (Anar chilka) 200g, Pure Catechu (Katha) 50g, Water 5 Liters.",
          preparation: "Boil pomegranate rind and katha in water for 20 minutes down to 3 liters; cool and strain.",
          administration: "Mix into 50 Liters drinking water. Tannins create a natural astringent protective coagulum over hemorrhagic cecal mucosa."
        }
      ],
      preventionAndVaccination: [
        "Broiler feed shuttle and rotation programs: Rotate chemical coccidiostats (Diclazuril, Nicarbazin) in starter feed and ionophore coccidiostats (Salinomycin, Maduramicin) in grower feed.",
        "Broiler Breeder / Layer vaccination: Live attenuated oocyst vaccine (e.g., Coccivac, Paracox) administered on Day 1 via hatchery coarse spray or eye drop.",
        "Maintain litter moisture strictly between 20% to 25%; moisture >30% causes catastrophic explosive oocyst sporulation within 24-48 hours.",
        "Flame-torch concrete floors between flock placements to thermally destroy hardy, thick-walled environmental oocysts."
      ]
    },
    {
      id: "avian-influenza",
      name: "Highly Pathogenic Avian Influenza / HPAI / Bird Flu (Influenza A H5N1 / H5N8 / H5N6)",
      nameHi: "अति-संक्रामक बर्ड फ्लू / एवियन इन्फ्लूएंजा (घातक जुनोटिक रोग - कलगी का नीलापन व अचानक सामूहिक मृत्यु)",
      category: "Viral Zoonotic",
      tempRange: {
        minF: 107.0,
        maxF: 111.0,
        normalF: 106.5
      },
      cardinalSymptoms: [
        "Peracute sudden catastrophic flock mortality (often 90-100% mortality within 24-48 hours with minimal prior illness) (बिना लक्षण दिखे कुछ ही घंटों में झुंड का साफ हो जाना)",
        "Deep cyanosis, dark purple-black discoloration, and severe necrosis of the comb, wattles, and unfeathered head skin (कलगी, गलकंबलों व चेहरे का अत्यधिक नीला-काला पड़ जाना)",
        "Pathognomonic subcutaneous ecchymotic hemorrhages and petechial blood spots on unfeathered shanks and feet (पैरों की नलियों / टांगों पर खून के लाल-बैंगनी चकत्ते पड़ना)",
        "Severe, grotesque subcutaneous edema of the head, neck, face, and periorbital tissues (सिर, चेहरे, आंखों के चारों तरफ व गर्दन में भारी पानी भर जाना / सूजन)",
        "Profuse watery, fluorescent green to pure white diarrhea and total flock anorexia (चमकीले हरे-सफेद दस्त व दाना-पानी पूरी तरह बंद)",
        "Severe respiratory suffocation, blood-tinged mucoid nasal discharge, open-mouth gasping, and terminal ataxia (मुंह व नाक से खूनी झागदार पानी बहना व दम घुटना)"
      ],
      differentialDiagnosis: [
        "Velogenic Viscerotropic Newcastle Disease (vvND)",
        "Infectious Laryngotracheitis (acute hemorrhagic form)",
        "Acute Fowl Cholera (Pasteurella multocida septicemia)",
        "Infectious Coryza (swollen head form)",
        "Acute Heat Stroke"
      ],
      firstLineDrugs: [
        {
          genericName: "TREATMENT IS STRICTLY PROHIBITED BY NATIONAL & INTERNATIONAL LAW",
          brandExample: "Statutory WOAH / DAHD National Action Plan Protocol",
          doseDrinkingWaterPer1000Birds: "Zero (No medication permitted)",
          route: "Oral",
          frequency: "OD",
          durationDays: 0,
          notes: "CRITICAL NOTIFIABLE ZOONOSIS: Medical treatment of suspected or confirmed HPAI birds is illegal. Attempting therapy creates extreme public health risk for human pandemic spillover."
        },
        {
          genericName: "Emergency Farm Quarantine & Depopulation Directive",
          brandExample: "National Emergency Disease Protocol",
          doseDrinkingWaterPer1000Birds: "Immediate humane stamping-out / culling under official supervision",
          route: "Oral",
          frequency: "Stat",
          durationDays: 1,
          notes: "Mandatory statutory notification within 1 hour to the District Animal Husbandry Officer and State Disease Diagnostic Laboratory. Humane culling of all poultry within a 1-km infected zone."
        }
      ],
      supportiveCare: [
        "IMMEDIATE HUMAN SAFETY: Farm workers must immediately don Full Level-3 PPE (N95/FFP3 respirators, eye goggles, impermeable protective coveralls, heavy rubber boots, double nitrile gloves).",
        "Seal all poultry shed ventilation exhaust curtains immediately to stop aerosol dispersion of virus to neighboring farms.",
        "Deep burial of culled birds and eggs in pits (minimum 8 feet deep, lined with a 4-inch layer of unslaked quicklime) followed by 5 feet soil backfill.",
        "Continuous vehicle disinfection: Spray all vehicle tires and undercarriages with 2% Virkon-S, 4% Sodium Carbonate (Washing Soda), or 1:30 Sodium Hypochlorite."
      ],
      contraindications: [
        "CRITICAL: NEVER attempt to administer antibiotics, home remedies, or fever medications to birds exhibiting suspected HPAI signs.",
        "NEVER salvage, slaughter, sell, dress, or transport sick or dead birds to commercial meat markets (fatal human infection risk).",
        "Do NOT allow wild migratory waterfowl (ducks, geese, gulls) access to poultry drinking water reservoirs or open feed storage sheds."
      ],
      desiNuskhe: [
        {
          name: "जैव-सुरक्षा चूना व ब्लीचिंग पाउडर सुरक्षा घेरा (Biosecurity Quicklime & Bleaching Perimeter Barrier)",
          ingredients: "Unslaked Quicklime (Bujha Hua Chuna) 50kg, Bleaching Powder (Chlorinated lime) 10kg.",
          preparation: "Mix dry quicklime and bleaching powder.",
          administration: "Lay down a continuous 2-foot wide solid chemical dry barrier strip around the entire perimeter fence of the poultry farm to block viral carriage."
        }
      ],
      preventionAndVaccination: [
        "Vaccination policy is strictly governed by national regulatory authorities (routinely prohibited in many jurisdictions to preserve disease-free export status, or strictly monitored killed oil-emulsion H5 vaccines used in controlled endemic zones).",
        "Install bird-proof wire netting (mesh size <2 cm) on all poultry shed windows and vents to prevent entry of wild birds, crows, and sparrows.",
        "Enforce strict vehicle wheel dips and mandatory shower-in / shower-out facilities for farm personnel.",
        "Source all day-old chicks exclusively from certified disease-free, high-biosecurity primary breeding hatcheries."
      ]
    },
    {
      id: "avian-fowl-pox",
      name: "Fowl Pox / Avian Pox (Avipoxvirus Cutaneous & Diphtheritic Wet Form)",
      nameHi: "मुर्गी चेचक / फाउल पॉक्स (कलगी पर खुरंडदार मस्से व गले में दम घोंटू पीली झिल्ली)",
      category: "Viral Cutaneous/Diphtheritic",
      tempRange: {
        minF: 106.0,
        maxF: 108.5,
        normalF: 106.5
      },
      cardinalSymptoms: [
        "Dry Cutaneous Form: Distinct wart-like nodular proliferative papules and scabbed crusts on unfeathered skin (comb, wattles, earlobes, and eyelids) (कलगी, गलकंबलों व आंखों के चारों तरफ मस्से व काले खुरंड बनना)",
        "Wet Diphtheritic Form: Thick, adherent, yellowish-white cheesy diphtheritic plaques and false membranes on the tongue, mouth roof, and larynx (मुंह के अंदर, जीभ व श्वासनली में गाढ़ी पीली झिल्ली जमना)",
        "Suffocating respiratory dyspnea: Birds stretching neck upward and gasping for air due to mechanical tracheal obstruction ('Wet Pox choke') (गले में झिल्ली फंसने से गर्दन ऊपर खींचकर दम घुटना)",
        "Ocular form: Eyelids swollen shut, severe conjunctivitis, caseous ocular discharge, and permanent blindness (आंखों में सूजन, मवाद भरना व आंखें बंद हो जाना)",
        "Sharp decline in feed intake due to excruciating oral lesions with concomitant drop in egg production (मुंह में घाव होने से चारा न खाना व अंडों में कमी)",
        "Slow flock spread over 4 to 8 weeks, with high mortality occurring exclusively in the wet diphtheritic form (झुंड में धीरे-धीरे फैलना परंतु गले के रूप में अत्यधिक मृत्यु)"
      ],
      differentialDiagnosis: [
        "Infectious Laryngotracheitis (ILT)",
        "Chronic Respiratory Disease (CRD with Coryza)",
        "Vitamin A Deficiency (Nutritional Roup / esophageal pustules)",
        "Candidiasis (Thrush / Crop Mycosis)",
        "Trichomoniasis (Canker in pigeons/poultry)"
      ],
      firstLineDrugs: [
        {
          genericName: "Tylosin Tartrate Soluble Powder",
          brandExample: "Tylon-200 / Tylovet Powder",
          doseDrinkingWaterPer1000Birds: "100g per 1,000 birds in 100 Liters drinking water",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 5,
          notes: "Essential to prevent secondary bacterial infection (Staphylococcus aureus and Mycoplasma) of open cutaneous nodules and ulcerated diphtheritic membranes."
        },
        {
          genericName: "Vitamin A Palmitate + Vitamin D3 + E",
          brandExample: "Vimeral / Groviplex Liquid",
          doseDrinkingWaterPer1000Birds: "100 ml per 1,000 birds in morning drinking water",
          route: "Drinking Water",
          frequency: "OD",
          durationDays: 10,
          notes: "HIGH-DOSE EPITHELIAL REPAIR: Vitamin A accelerates rapid sloughing of diphtheritic plaques and promotes rapid healing of damaged cutaneous epidermal layers."
        },
        {
          genericName: "Povidone Iodine 10% Solution + Glycerin (1:1 Ratio)",
          brandExample: "Betadine Antiseptic / Wokadine 10%",
          doseDrinkingWaterPer1000Birds: "Topical application on lesions of affected birds",
          route: "Oral",
          frequency: "OD",
          durationDays: 5,
          notes: "Mix equal parts 10% Povidone-iodine and pure Glycerin. Paint directly onto dry comb scabs and carefully swab over oral diphtheritic plaques using a sterile cotton tip."
        },
        {
          genericName: "Potassium Permanganate (Lal Dawai) Water Sanitizer",
          brandExample: "KMnO4 Technical Grade",
          doseDrinkingWaterPer1000Birds: "1g per 10 Liters drinking water (yielding a faint pale pink solution)",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 7,
          notes: "Mild oxidizing water antiseptic to prevent bird-to-bird horizontal transmission of virus shed into shared water bell drinkers."
        }
      ],
      supportiveCare: [
        "Carefully debride obstructing diphtheritic membranes from the larynx using smooth sterile forceps to instantly relieve acute asphyxiation.",
        "EXECUTE AGGRESSIVE MOSQUITO VECTOR CONTROL: Mosquitoes (Culex species) are the primary biological vectors transmitting fowl pox across pens.",
        "Spray shed walls, surrounding vegetation, and standing water with Deltamethrin 1.25% or Malathion to eliminate adult mosquitoes.",
        "Provide soft, soaked, easily swallowed mash feed; avoid coarse hard grains that scratch ulcerated oral tissues."
      ],
      contraindications: [
        "NEVER forcefully scrape off dry cutaneous scabs on the comb without softening them first (causes profuse bleeding, pain, and secondary fly strike).",
        "NEVER make Potassium Permanganate water deep purple or dark (causes severe caustic chemical burning of the crop and esophagus; must be faint pale pink).",
        "Do NOT ignore mosquito breeding in nearby waterlogged puddles or farm drainage trenches."
      ],
      desiNuskhe: [
        {
          name: "नीम तेल, कपूर व हल्दी मरहम (Neem Oil, Camphor & Turmeric Pox Balm)",
          ingredients: "Pure Cold-Pressed Neem Oil 100ml, Pure Turmeric powder (Haldi) 50g, Natural Camphor (Kapur) 10g, Pure Vaseline 100g.",
          preparation: "Dissolve powdered camphor in warm neem oil; blend in turmeric powder and petroleum jelly to form a thick antiseptic yellow ointment.",
          administration: "Apply generously over warty comb and wattle scabs once daily. Rapidly dries up pox nodules, repels mosquitoes, and speeds scab detachment."
        },
        {
          name: "फिटकरी व ग्लिसरीन मुंह लेप (Alum & Glycerin Throat Paint)",
          ingredients: "Purified Alum powder (Fitkari) 10g, Pure Glycerin 50ml.",
          preparation: "Dissolve fine alum powder into pure glycerin.",
          administration: "Dab inside the oral cavity onto white-yellow throat patches using a feather or cotton swab. Alum acts as a natural styptic and shrinks mucosal plaques."
        }
      ],
      preventionAndVaccination: [
        "Live Fowl Pox Vaccine (Pigeon Pox or Chick Embryo Origin Fowl Pox Strain): Administered at 6 to 8 weeks of age in layers and breeders.",
        "MANDATORY WING-WEB STAB METHOD: Dip the special double-grooved two-pronged needle into reconstituted vaccine and pierce directly through the unfeathered skin of the wing web (avoiding blood vessels).",
        "VACCINE 'TAKE' INSPECTION: Examine the inoculated wing web 7-10 days post-vaccination; presence of a distinct nodular swelling or scab ('take') confirms 100% successful immunization.",
        "Screen shed curtains with nylon insect mesh to physically prevent biting mosquito incursions."
      ]
    },
    {
      id: "avian-crd",
      name: "Chronic Respiratory Disease / CRD / Mycoplasmosis (Mycoplasma gallisepticum / MG Infection)",
      nameHi: "पुरानी सांस की बीमारी / सी.आर.डी. (माइकोप्लाज्मा जनित फेफड़ों व वायुकोशों की सूजन / घरघराहट)",
      category: "Mycoplasmal Respiratory",
      tempRange: {
        minF: 106.0,
        maxF: 108.0,
        normalF: 106.5
      },
      cardinalSymptoms: [
        "Loud, wet tracheal rales, persistent coughing, and sneezing audible throughout the shed, especially at night when quiet (रात के समय मुर्गियों में छींकें व घरघराहट / खर्र-खर्र की आवाज)",
        "Persistent, sticky, clear to mucopurulent nasal discharge with birds shaking their heads to clear nostrils (नाक से लसलसा पानी बहना व बार-बार सिर हिलाना)",
        "Severe conjunctivitis, foamy frothy bubbles in the inner eye canthus, and eyelid swelling (आंखों में झागदार बुलबुले आना, लालिमा व पलकों में सूजन)",
        "Severe, progressive drop in flock feed consumption, slow body weight gain, and drastic deterioration in flock FCR (चारा कम खाना, वजन न बढ़ना व एफ.सी.आर. खराब होना)",
        "Drop in commercial egg production (10-20% loss) with high embryo mortality during incubation (अंडों में गिरावट व चूजों का अंडे के अंदर मर जाना)",
        "Pathognomonic necropsy: Severe 'cheesy' caseous fibrino-purulent airsacculitis ('foamy air sacs' filled with yellow yogurt-like exudate) and pericarditis (पोस्टमार्टम पर वायुकोशों व दिल पर पीला मक्खन जैसा मवाद जमना)"
      ],
      differentialDiagnosis: [
        "Infectious Bronchitis (IB)",
        "Infectious Coryza (Avibacterium paragallinarum)",
        "Newcastle Disease (lentogenic/mild form)",
        "Avian Chlamydiosis / Ornithosis",
        "Aspergillosis (Brooder Pneumonia)"
      ],
      firstLineDrugs: [
        {
          genericName: "Tylosin Tartrate Soluble Powder",
          brandExample: "Tylocare / Tylovet-WS",
          doseDrinkingWaterPer1000Birds: "100g per 1,000 birds in 100 Liters drinking water (equivalent to 0.5g/L water)",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 4,
          notes: "ANTIBIOTIC OF CHOICE FOR MYCOPLASMA: Superior tissue penetration into the avascular respiratory air sac membranes. Treat for 3-5 consecutive days."
        },
        {
          genericName: "Tilmicosin 25% Oral Solution",
          brandExample: "Pulmotil / Tilmi-250",
          doseDrinkingWaterPer1000Birds: "80 ml per 1,000 birds (equivalent to 15-20 mg/kg body weight) in drinking water",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 3,
          notes: "Macrolide with extraordinary affinity for avian lung alveolar macrophages and respiratory epithelial tissue. Highly effective for persistent refractory CRD outbreaks."
        },
        {
          genericName: "Doxycycline Hyclate 50% + Colistin Sulfate Soluble Powder",
          brandExample: "Doxy-Col / Doxivet-Plus",
          doseDrinkingWaterPer1000Birds: "100g per 1,000 birds in 100 Liters drinking water",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 5,
          notes: "COMPLEX CRD (CCRD) REGIMEN: Doxycycline eradicates Mycoplasma gallisepticum while Colistin systematically destroys secondary invading Escherichia coli."
        },
        {
          genericName: "Bromhexine Hydrochloride + Menthol Solution",
          brandExample: "Resposol / Mucosol Oral",
          doseDrinkingWaterPer1000Birds: "50 ml per 1,000 birds in morning drinking water",
          route: "Drinking Water",
          frequency: "OD",
          durationDays: 5,
          notes: "Potent mucolytic and bronchodilator. Dissolves thick fibrinous tracheobronchial plugs and dramatically enhances macrolide antibiotic concentration in lung secretions."
        }
      ],
      supportiveCare: [
        "IMPROVE SHED VENTILATION: Ammonia gas levels must remain strictly below 15-20 ppm; high ammonia strips respiratory cilia and triggers instant CRD flare-ups.",
        "Perform eucalyptus or menthol spray misting inside the shed twice daily during evening hours to soothe congested respiratory passages.",
        "Avoid high dust levels: Keep floor litter conditioned; do not allow excessive bone-dry powdering of wood shavings or rice hulls.",
        "Provide continuous multi-vitamin supplementation (Vitamins A, D3, E, and B-Complex) to restore epithelial defenses."
      ],
      contraindications: [
        "NEVER administer Penicillins, Ampicillin, or Cephalosporins for Mycoplasma infections (Mycoplasmas totally lack a peptidoglycan cell wall; beta-lactams are 100% ineffective).",
        "Avoid heavy chlorine water sanitizers at the same time as water-administered macrolides (inactivates the drug).",
        "NEVER crowd birds beyond recommended floor density limits (causes poor air exchange and rapid aerosol spread)."
      ],
      desiNuskhe: [
        {
          name: "अदरक, लहसुन, तुलसी व नीलगिरी भाप (Ginger, Garlic, Basil & Eucalyptus Aerosol)",
          ingredients: "Fresh Ginger 250g, Fresh Garlic 250g, Fresh Tulsi (Holy Basil) leaves 100g, Eucalyptus oil 25ml, Water 10 Liters.",
          preparation: "Boil crushed ginger, garlic, and tulsi leaves in water for 30 minutes; cool slightly and stir in eucalyptus oil.",
          administration: "Spray fine mist over the heads of resting birds at night using a knapsack sprayer. Loosens mucus plugs and clears bronchial airways."
        },
        {
          name: "काली मिर्च व गुड़ का पाचक पेय (Black Pepper & Jaggery Bronchial Cleanser)",
          ingredients: "Finely ground Black Pepper (Kali Mirch) 100g, Dark Jaggery (Gur) 1 kg, Water 10 Liters.",
          preparation: "Boil black pepper powder in water with jaggery until completely dissolved.",
          administration: "Mix into 100 Liters drinking water for 1,000 birds for 3 consecutive mornings. Relieves tracheal chill and stimulates water and feed intake."
        }
      ],
      preventionAndVaccination: [
        "Source all day-old chicks exclusively from certified Mycoplasma-free (MG/MS negative) parent breeding stock (vertical egg-borne transmission is major route).",
        "Live MG Vaccines (e.g., F-strain, 6/85 strain, or ts-11 strain): Administered via fine eye-drop or coarse spray at 4 to 8 weeks in commercial layers and breeders.",
        "Administer inactivated MG oily emulsion vaccine at 16-18 weeks to confer long-term humoral protection throughout the commercial laying cycle.",
        "Maintain strict all-in/all-out single-age housing; never mix young pullets with older carrier layer flocks."
      ]
    },
    {
      id: "avian-coryza",
      name: "Infectious Coryza (Avibacterium paragallinarum Acute Sinusitis)",
      nameHi: "संक्रामक कोराइज़ा / मुर्गियों का नजला (चेहरे व आंखों की गंभीर सूजन, बदबूदार स्राव व छींकें)",
      category: "Bacterial Respiratory",
      tempRange: {
        minF: 106.0,
        maxF: 108.5,
        normalF: 106.5
      },
      cardinalSymptoms: [
        "Grotesque facial edema: Severe puffing and acute swelling of the face, infraorbital sinuses, and wattles ('Owl-head' appearance) (चेहरे, आंखों के नीचे के गड्ढों व गलकंबलों में भारी सूजन)",
        "Pathognomonic foul, putrid, sour halitosis odor emanating from the beak and shed (मुंह व नाक से सड़े हुए मवाद जैसी तेज बदबू आना)",
        "Bilateral copius serous to thick gelatinous nasal discharge gumming up nostrils (नाक से गाढ़ा बदबूदार पानी बहना जिससे नथुने बंद हो जाना)",
        "Severe conjunctivitis with eyelids completely swollen shut and thick caseous pus trapped under the eyelids (आंखें सूजकर पूरी तरह बंद हो जाना व अंदर पीला मवाद भरना)",
        "Sudden, catastrophic drop in commercial egg production (10% to 40% loss within 3-5 days) (अंडों के उत्पादन में अचानक भारी गिरावट)",
        "Rapid explosive horizontal spread through shared drinking water troughs throughout the entire poultry house (पानी के माध्यम से पूरी शेड में 48 घंटे में फैलना)"
      ],
      differentialDiagnosis: [
        "Chronic Respiratory Disease (CRD / Mycoplasma gallisepticum)",
        "Fowl Pox (Wet/Diphtheritic form)",
        "Infectious Laryngotracheitis (ILT)",
        "Swollen Head Syndrome (Avian Metapneumovirus)",
        "Vitamin A Deficiency"
      ],
      firstLineDrugs: [
        {
          genericName: "Enrofloxacin 10% Oral Solution",
          brandExample: "Meriquin / Enrocin 10%",
          doseDrinkingWaterPer1000Birds: "150 ml per 1,000 birds in 100 Liters drinking water",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 5,
          notes: "PRIMARY RAPID BACTERICIDAL AGENT: Rapidly clears Avibacterium paragallinarum from vascular infraorbital sinus tissues and restores feeding behavior."
        },
        {
          genericName: "Sulfamethoxazole + Trimethoprim Soluble Powder",
          brandExample: "Biotrim-Poultry / Co-Trimox Soluble",
          doseDrinkingWaterPer1000Birds: "100g per 1,000 birds in drinking water",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 5,
          notes: "Potent synergistic antifolate combination with high clinical efficacy against Coryza outbreaks. Administer for 5 consecutive days."
        },
        {
          genericName: "Oxytetracycline Hydrochloride Soluble Powder",
          brandExample: "Terramycin-WS / Oxyvet Powder",
          doseDrinkingWaterPer1000Birds: "200g per 1,000 birds in drinking water",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 5,
          notes: "Effective alternative broad-spectrum antibiotic to control sinus exudates and prevent secondary bacterial septicemia."
        },
        {
          genericName: "Citric Acid / Acetic Acid Drinking Water Acidifier",
          brandExample: "Acid-Pak 4-Way / Selko-pH",
          doseDrinkingWaterPer1000Birds: "1 ml per 1 Liter drinking water (target water pH 4.0 - 4.5)",
          route: "Drinking Water",
          frequency: "Continuous",
          durationDays: 7,
          notes: "Lowers drinking water pH to destroy fragile Avibacterium bacteria shed into water troughs, terminating horizontal flock transmission."
        }
      ],
      supportiveCare: [
        "FLUSH AND SANITIZE ALL WATER LINES: Avibacterium paragallinarum is primarily transmitted horizontally through contaminated drinking water troughs and open bell drinkers.",
        "Perform manual infraorbital sinus expression and flush eyes of severely affected birds with warm boric acid 2% solution to evacuate trapped cheesy plugs.",
        "Provide warm, highly aromatic, moist mash feed to encourage feeding while birds have temporary visual obstruction and anosmia.",
        "Prevent cold drafts and wet floor bedding; maintain uniform barn ambient temperatures."
      ],
      contraindications: [
        "NEVER introduce recovered, clinically normal carrier birds into a clean, unexposed flock (recovered birds remain lifelong latent carriers of Coryza).",
        "Avoid using hard alkaline drinking water (neutralizes therapeutic organic acidifiers and prolongs bacterial survival in drinkers).",
        "Do NOT allow multi-age flocks to share common airspace or open shared watering pipes."
      ],
      desiNuskhe: [
        {
          name: "फिटकरी व बोरिक एसिड आंख-नाक प्रक्षालन (Alum & Boric Acid Ophthalmic Lavage)",
          ingredients: "Purified Alum (Fitkari) 5g, Boric Acid powder 10g, Sterile boiled water 1 Liter.",
          preparation: "Dissolve alum and boric acid in boiling water; cool completely to room temperature and filter through cotton.",
          administration: "Gently flush swollen eyes and nostrils of blinded birds using a soft syringe. Dissolves cheesy plugs and eliminates putrid facial odor."
        },
        {
          name: "लहसुन, प्याज व सिरका जल रोगाणुनाशक (Garlic, Onion & Vinegar Water Sanitizer)",
          ingredients: "Crushed raw Garlic 250g, Crushed raw Onion 250g, Natural Apple Cider Vinegar or White Vinegar 500ml, Water 10 Liters.",
          preparation: "Soak crushed garlic and onion in vinegar for 4 hours; strain and add to water.",
          administration: "Mix into 100 Liters drinking water for 1,000 birds for 5 days. Lowers water pH and suppresses microbial transmission between birds."
        }
      ],
      preventionAndVaccination: [
        "Inactivated Trivalent Coryza Bacterin (containing serovars A, B, and C): Primary vaccination at 8 to 10 weeks SC in the lower neck.",
        "Booster vaccination with Coryza bacterin at 16 to 18 weeks (at least 3-4 weeks prior to the onset of egg production).",
        "Practice strict ALL-IN / ALL-OUT flock management: Never mix replacement pullets with older laying hens on the same premises.",
        "Depopulate completely, thoroughly clean, power-wash with hot water, and disinfect houses with glutaraldehyde between flock cycles."
      ]
    },
    {
      id: "avian-mareks",
      name: "Marek's Disease / MD (Gallid Alphaherpesvirus 2 / Oncogenic Neuro-Lymphomatosis)",
      nameHi: "मैरेक रोग / मुर्गियों का पक्षाघात (एक पैर आगे एक पैर पीछे पक्षाघात, ट्यूमर व अंधापन)",
      category: "Viral Oncogenic/Neurologic",
      tempRange: {
        minF: 106.0,
        maxF: 108.5,
        normalF: 106.5
      },
      cardinalSymptoms: [
        "Pathognomonic split-leg paralysis posture: One leg stretched straight forward and the other leg stretched stiffly backward (एक पैर आगे और दूसरा पैर पीछे फैलाकर पक्षाघात में बैठना)",
        "Wing paralysis / Drooping wings trailing along the ground due to brachial plexus neuropathy (पंखों का लटकना व जमीन पर घिसटना)",
        "Enlargement, loss of striations, and yellowish edema of major peripheral nerves (especially the Sciatic and Brachial nerves) (पोस्टमार्टम पर सायटिक व ब्रैकियल नसों का अत्यधिक मोटा व सूजा होना)",
        "Ocular Lymphomatosis ('Grey Eye' / Pearl Eye): Loss of normal golden iris pigment, pupil becoming irregular, pinpoint, or eccentric with blindness (आंखों की पुतली का भूरा-सफेद पड़ना व अंधापन)",
        "Visceral Lymphomas: Massive whitish-gray nodular tumor infiltrations in the liver, spleen, kidneys, heart, proventriculus, and ovaries (आंतरिक अंगों में सफेद गांठें / ट्यूमर का जमना)",
        "Cutaneous form ('Skin Leukosis'): Enlarged, reddened feather follicles with rough nodular scabs around the feather base (पंखों की जड़ों में गांठे व दाने उभरना)"
      ],
      differentialDiagnosis: [
        "Avian Leukosis Complex (ALV - retroviral, no nerve enlargement, older birds)",
        "Infectious Bursal Disease (IBD)",
        "Botulism / Limberneck (Clostridium botulinum neurotoxin)",
        "Riboflavin (Vitamin B2) Deficiency (Curled-toe paralysis)",
        "Avian Encephalomyelitis"
      ],
      firstLineDrugs: [
        {
          genericName: "THERE IS NO KNOWN CURATIVE TREATMENT",
          brandExample: "Palliative Supportive Care Only",
          doseDrinkingWaterPer1000Birds: "Zero (No curative medical intervention exists)",
          route: "Oral",
          frequency: "OD",
          durationDays: 0,
          notes: "Marek's Disease is an incurable, irreversible oncogenic herpesviral infection. Once clinical peripheral nerve paralysis or visceral tumors develop, birds never recover. Clinically paralyzed birds must be humanely culled."
        },
        {
          genericName: "Vitamin B-Complex + Choline + Methionine Supportive Liquid",
          brandExample: "Polybion-Vet / Groviplex",
          doseDrinkingWaterPer1000Birds: "150 ml per 1,000 birds in drinking water",
          route: "Drinking Water",
          frequency: "OD",
          durationDays: 7,
          notes: "Palliative flock support: Administered to unaffected flock mates to support peripheral nerve myelination and reduce generalized stress."
        },
        {
          genericName: "Vitamin E + Selenium + Vitamin C Antioxidant Mix",
          brandExample: "Sel-E-Vit / E-Care Se",
          doseDrinkingWaterPer1000Birds: "100g per 1,000 birds in clean drinking water",
          route: "Drinking Water",
          frequency: "OD",
          durationDays: 10,
          notes: "Cellular antioxidant support to boost host cell-mediated immune surveillance against viral oncogenesis."
        }
      ],
      supportiveCare: [
        "HUMANE CULLING OF PARALYZED BIRDS: Paralyzed birds cannot reach water nipples or feed troughs, resulting in slow dehydration and trampling by flock mates.",
        "EXHAUSTIVE DUST CONTROL: The MD virus matures exclusively in the feather follicle epithelium and is shed in astronomical quantities in shed dander and poultry dust.",
        "Vacuum and remove poultry dander using HEPA-filtered industrial vacuums; treat litter and shed surfaces with quaternary ammonium compounds.",
        "Keep young growing pullets strictly isolated from older adult bird dust and feather dander for the first 12-16 weeks of life."
      ],
      contraindications: [
        "NEVER skip Day-1 Hatchery Vaccination under any commercial circumstances (unvaccinated chicks exposed to field virus develop explosive 80% flock mortality).",
        "NEVER house day-old baby chicks in a poultry shed that has not been completely de-dusted and disinfected from a previous flock.",
        "Avoid keeping mixed-age birds in the same building."
      ],
      desiNuskhe: [
        {
          name: "शेड की धूल व पंखों का पूर्ण निष्कासन (Complete Shed Dander & Feather Decontamination)",
          ingredients: "Industrial vacuum or blower, High-pressure power washer, Bleach solution (1:30).",
          preparation: "Clear all old litter, cobwebs, and feather dander from walls, curtains, rafters, and fans.",
          administration: "Wash and soak all surfaces thoroughly with hypochlorite solution. Marek's virus can survive inside dried feather dander for over 12 months."
        },
        {
          name: "अश्वगंधा व गिलोय स्नायुवर्धक काढ़ा (Ashwagandha & Giloy Neuro-Support Tonic)",
          ingredients: "Ashwagandha root powder 250g, Giloy stem powder 250g, Water 5 Liters.",
          preparation: "Boil herbs in water for 20 minutes down to 3 liters; cool and strain.",
          administration: "Mix into 100 Liters drinking water for flock mates to support nerve vitality and alleviate environmental stress."
        }
      ],
      preventionAndVaccination: [
        "MANDATORY DAY-1 HATCHERY VACCINATION: Administer 0.2 ml Subcutaneously (SC) in the back of the neck at Day 1 of age at the hatchery, OR via automated in-ovo injection at 18 days of incubation.",
        "Vaccine strains: HVT (Herpesvirus of Turkeys - Serotype 3), SB-1 or 301B/1 (Serotype 2), and CVI988/Rispens (Serotype 1 - Gold standard for very virulent vvMDV challenge).",
        "Maintain cold-chain integrity: Live cell-associated Marek's vaccines must be stored in liquid nitrogen (-196°C) and used within 2 hours of thawing and reconstitution.",
        "Isolate young vaccinated chicks in pristine, dander-free brooding facilities for at least 2 weeks while solid vaccine immunity develops."
      ]
    }
  ];

  // 3. CLINICAL SEARCH & RETRIEVAL HELPER METHODS
  window.VetcareApp.ClinicalData.getDiseaseById = function (id) {
    if (!id || typeof id !== "string") return null;
    const cleanId = id.trim().toLowerCase();
    const list = window.VetcareApp.ClinicalData.Avian || [];
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
    const list = window.VetcareApp.ClinicalData.Avian || [];
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
    const list = window.VetcareApp.ClinicalData.Avian || [];
    const results = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].category && list[i].category.toLowerCase() === targetCat) {
        results.push(list[i]);
      }
    }
    return results;
  };

})();
