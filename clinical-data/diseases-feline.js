// Vetcare AI OS - Feline (Cat) Clinical Disease Database, Symptom Matrices & Rx Regimens (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. FELINE CLINICAL DATABASE DOSSIERS (COMPREHENSIVE ZERO-PLACEHOLDER SPECIFICATION)
  window.VetcareApp.ClinicalData.Feline = [
    {
      id: "feline-panleukopenia",
      name: "Feline Panleukopenia / Feline Parvo (Feline Parvovirus Enteritis)",
      nameHi: "फेलाइन पैनल्यूकोपेनिया / संक्रामक आंत्रशोथ (बिल्लियों का पार्वो वायरस / सफेद रक्त कोशिकाओं का क्षय)",
      category: "Viral Enteric",
      tempRange: {
        minF: 98.0,
        maxF: 105.0,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Pathognomonic posture: Crouching in sternal recumbency over the water bowl, hanging head, but unable to drink (पानी के कटोरे के ऊपर सिर झुकाकर बैठे रहना परंतु पानी पीने में असमर्थता)",
        "Profound panleukopenia with peripheral white blood cell count dropping dangerously below 1,000 /µL (श्वेत रक्त कोशिकाओं / WBC की जानलेवा कमी)",
        "Severe, watery, fetid, or hemorrhagic diarrhea leading to rapid fluid exhaustion (अत्यधिक बदबूदार, कभी-कभी खूनी पतले दस्त)",
        "Intractable, persistent vomiting of yellow bile or foamy gastric secretions (लगातार पीले पित्त व झागदार उल्टी होना)",
        "Terminal hypothermia (<99°F) signaling septic or endotoxic collapse (अंतिम चरण में शरीर का अत्यधिक ठंडा पड़ जाना)",
        "Kittens infected in utero or perinatally exhibit cerebellar hypoplasia, severe intention tremors, and ataxia (नवजात बिल्ली के बच्चों में सिर का कांपना व लड़खड़ाहट)"
      ],
      differentialDiagnosis: [
        "Feline Enteric Coronavirus (FECV)",
        "Salmonellosis",
        "Severe Intestinal Helminthiasis (Toxocara cati)",
        "Linear Gastrointestinal Foreign Body",
        "Acute Pancreatitis"
      ],
      firstLineDrugs: [
        {
          genericName: "Maropitant Citrate",
          brandExample: "Cerenia 10mg/ml",
          doseMgPerKg: 1.0,
          route: "SC",
          frequency: "OD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Primary NK-1 receptor antagonist antiemetic. Crucial to control severe dehydration and prevent reflux esophagitis. Store refrigerated to minimize injection discomfort."
        },
        {
          genericName: "Ondansetron Hydrochloride",
          brandExample: "Emeset 2mg/ml",
          doseMgPerKg: 0.5,
          route: "IV",
          frequency: "BD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Serotonin 5-HT3 receptor antagonist. Administer as a slow IV push for synergistic control of refractory vomiting alongside Maropitant."
        },
        {
          genericName: "Amoxicillin + Clavulanate Potassium",
          brandExample: "Augmentin / Clavam 300mg Inj",
          doseMgPerKg: 20.0,
          route: "IV",
          frequency: "BD",
          durationDays: 7,
          pregnancySafe: true,
          notes: "Broad-spectrum coverage to prevent life-threatening bacterial translocation and sepsis across the severely damaged, denuded intestinal mucosal barrier."
        },
        {
          genericName: "Pantoprazole Sodium",
          brandExample: "Pantocid 40mg vial",
          doseMgPerKg: 1.0,
          route: "IV",
          frequency: "OD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Proton pump inhibitor to suppress gastric acid secretion and accelerate gastroduodenal mucosal healing."
        }
      ],
      supportiveCare: [
        "AGGRESSIVE FLUID THERAPY: IV infusion of balanced isotonic crystalloids (Plasmalyte-A or Ringer's Lactate) calculated for deficit replacement plus maintenance.",
        "Potassium supplementation: Add 20-30 mEq/L KCl to IV fluids to counter severe hypokalemia caused by profuse vomiting and diarrhea.",
        "Whole blood or fresh plasma transfusion (10-15 ml/kg) in cats with severe leukopenia (<1,000 /µL), total protein <4.0 g/dL, or intractable hypovolemic shock.",
        "Keep cat warm using circulating warm-water heating blankets or thermal wraps; avoid direct unmonitored electric heating pads to prevent contact burns.",
        "Initiate early syringe micro-enteral nutrition with warmed liquid diets (e.g., Royal Canin Recovery liquid) as soon as vomiting is controlled for 12 hours."
      ],
      contraindications: [
        "FATAL: NEVER administer Paracetamol/Acetaminophen (cats lack glucuronyl transferase; causes fatal methemoglobinemia, cyanosis, and acute liver failure).",
        "NEVER administer Aminoglycosides (Gentamicin/Amikacin) in dehydrated or hypovolemic felines due to high risk of acute nephrotoxic tubular necrosis.",
        "Avoid oral medications while active vomiting is present (risk of aspiration pneumonia).",
        "NEVER administer Metoclopramide if intestinal intussusception or mechanical obstruction is suspected."
      ],
      desiNuskhe: [
        {
          name: "पतला उबला हुआ चिकन शोरबा व इलेक्ट्रोलाइट (Gentle Strained Chicken Broth Hydration)",
          ingredients: "Boneless chicken breast 100g, Clean water 1 Liter, Pinch of table salt (0.5g), Pinch of glucose (2g).",
          preparation: "Boil boneless chicken in water without spices, onions, or garlic until thoroughly cooked. Strain the broth and discard all fat layers. Cool to lukewarm.",
          administration: "Syringe-feed 3-5 ml very slowly every 2-3 hours ONLY after vomition has completely halted for 12-24 hours. Hydrates and provides bioavailable amino acids."
        },
        {
          name: "उबला हुआ चावल का मांड (Starch-Rich Rice Water Mucilage)",
          ingredients: "White polished rice 50g, Clean water 500ml.",
          preparation: "Boil rice until it forms a thick milky water. Strain through clean cheesecloth; cool to room temperature.",
          administration: "Syringe-feed 2-3 ml orally TID to provide gentle mucosal coating and easily absorbed carbohydrates during early recovery."
        }
      ],
      preventionAndVaccination: [
        "FVRCP Core Vaccination ('Tricat'): Primary vaccination at 8 weeks, booster at 12 weeks, third booster at 16 weeks, and booster at 1 year.",
        "Triennial revaccination with modified-live FPV vaccine in low-risk indoor cats; annual in high-density multi-cat shelters.",
        "Disinfect catteries, litter trays, and food bowls exclusively with 1:32 dilution of sodium hypochlorite (bleach) or potassium peroxymonosulfate (Virkon-S).",
        "FPV is extremely resilient in the environment and can remain infectious on fomites for over 12 months."
      ]
    },
    {
      id: "feline-fip",
      name: "Feline Infectious Peritonitis / FIP (Mutated Feline Coronavirus Systemic Vasculitis)",
      nameHi: "फेलाइन इन्फेक्शियस पेरिटोनाइटिस / एफ.आई.पी. (कोरोनावायरस जनित पेट में पानी भरना / सूखा या गीला पेरिटोनाइटिस)",
      category: "Viral Immune-mediated",
      tempRange: {
        minF: 101.5,
        maxF: 105.0,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Effusive ('Wet') Form: Progressive, painless abdominal distension with fluid wave ('pot-bellied' appearance) and/or pleural effusion causing dyspnea (पेट में गाढ़ा पीला पानी भरना व सांस फूलना)",
        "Pathognomonic effusion analysis: Straw-colored, highly viscous, clear to opalescent fluid with high total protein (>3.5 g/dL) and low A:G ratio (<0.4) (पेट के पानी का चिपचिपा, पीला व अत्यधिक प्रोटीन युक्त होना)",
        "Non-Effusive ('Dry') Form: Granulomatous lesions on internal organs, mesenteric lymphadenopathy, and chronic undulating antibiotic-resistant fever (आंतरिक अंगों में गांठें व लगातार न टूटने वाला बुखार)",
        "Ocular manifestations: Anterior uveitis, aqueous flare, keratic precipitates on ventral corneal endothelium, and hyphema (आंखों में धुंधलापन, खून उतरना व सूजन)",
        "Neurologic manifestations: Progressive ataxia, central vestibular syndrome, intention tremors, head tilt, and seizures (चलने में लड़खड़ाहट, सिर घूमना व दौरे पड़ना)",
        "Profound muscle wasting, unkempt coat, unresolving lethargy, and progressive icterus (मांसपेशियों का सूखना, पीलिया व वजन लगातार गिरना)"
      ],
      differentialDiagnosis: [
        "Lymphoma (Alimentary or Mediastinal)",
        "Congestive Heart Failure (Cardiomyopathy effusion)",
        "Bacterial Septic Peritonitis",
        "Mycobacteriosis / Toxoplasmosis",
        "Feline Leukemia Virus (FeLV)-associated disorders"
      ],
      firstLineDrugs: [
        {
          genericName: "GS-441524 (Nucleoside Analogue Antiviral)",
          brandExample: "GS-441524 FIP Solution (15mg/ml or 20mg/ml) / Oral Tabs",
          doseMgPerKg: 6.0,
          route: "SC",
          frequency: "OD",
          durationDays: 84,
          pregnancySafe: false,
          notes: "DEFINITIVE TARGETED ANTIVIRAL CURE. Administer 6-8 mg/kg SC OD for effusive/non-effusive FIP; increase to 10-12 mg/kg for ocular FIP, and 12-15 mg/kg for neurological FIP for 84 CONSECUTIVE DAYS (12 full weeks). High remission rate."
        },
        {
          genericName: "Remdesivir (GS-5734)",
          brandExample: "Covifor / Remdac 100mg vial",
          doseMgPerKg: 10.0,
          route: "IV",
          frequency: "OD",
          durationDays: 3,
          pregnancySafe: false,
          notes: "Initial emergency stabilization protocol: 10-15 mg/kg slow IV infusion OD for the first 3-5 days in critically ill cats before transitioning to oral or SC GS-441524."
        },
        {
          genericName: "Prednisolone",
          brandExample: "Predmet / Omnacortil 5mg tabs",
          doseMgPerKg: 1.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Short-course palliative anti-inflammatory to suppress immune-complex vasculitis and stimulate appetite during the initial 3-5 days of antiviral initiation. Taper rapidly."
        },
        {
          genericName: "Gabapentin (Pre-injection Anxiolytic/Analgesic)",
          brandExample: "Gabapin 50mg/100mg caps",
          doseMgPerKg: 10.0,
          route: "Oral",
          frequency: "Stat",
          durationDays: 84,
          pregnancySafe: true,
          notes: "Administer 50-100 mg/cat PO 90 minutes before SC GS-441524 injection. Alleviates intense stinging pain caused by the acidic (pH ~1.5) vehicle of the antiviral."
        }
      ],
      supportiveCare: [
        "Perform therapeutic thoracocentesis ONLY when pleural effusion causes acute respiratory distress; avoid complete drainage of peritoneal fluid as it accelerates severe hypoalbuminemia.",
        "Provide calorie-dense, highly palatable hepatic/convalescence wet canned diets (e.g., Hills a/d, Royal Canin Recovery).",
        "Monitor complete blood count, total protein, albumin-globulin (A:G) ratio, and serum amyloid A (SAA) every 4 weeks throughout the 84-day treatment cycle.",
        "Subcutaneous fluid support (balanced crystalloids) if mild dehydration is present, titrated carefully to avoid worsening body cavity effusions."
      ],
      contraindications: [
        "NEVER perform routine excessive paracentesis (repeatedly drawing all peritoneal fluid depletes essential proteins and electrolytes, accelerating cachexia).",
        "FATAL: NEVER administer Paracetamol/Acetaminophen.",
        "Do NOT administer high-dose long-term corticosteroids concurrently with GS-441524 (interferes with antiviral efficacy and viral clearance).",
        "NEVER use dog permethrin or organophosphate antiparasitic products on cats."
      ],
      desiNuskhe: [
        {
          name: "गर्म भाप व सौम्य सीने की मालिश (Warm Vapor & Pectoral Steam Care)",
          ingredients: "Clean hot water 2 Liters, Closed transport basket, Warm soft towel.",
          preparation: "Place steaming water container safely outside a wire cat carrier covered with a breathable towel to create a gentle warm mist tent.",
          administration: "Allow cat to rest in the vapor tent for 10-15 minutes twice daily. Eases secondary airway congestion in cats suffering from pleural effusion discomfort."
        },
        {
          name: "हल्का गर्म कद्दू व चिकन प्यूरी (Pureed Steamed Pumpkin & Chicken Digestive Slurry)",
          ingredients: "Boiled mashed pumpkin (Kaddu) 20g, Boiled minced chicken 50g, Warm water 30ml.",
          preparation: "Blend cooked pumpkin and chicken into an ultra-smooth, warm puree.",
          administration: "Syringe-feed 5-10 ml TID to provide easily digestible fiber and clean energy, preventing hepatic lipidosis in inappetent FIP patients."
        }
      ],
      preventionAndVaccination: [
        "Intranasal FIP vaccine (Primucell) has very limited efficacy and is generally not recommended by AAFP guidelines.",
        "Keep litter box hygiene pristine: Feline Enteric Coronavirus (FECV) is shed via the fecal-oral route; clean litter boxes at least twice daily.",
        "Maintain low-density housing: Limit multi-cat groups to 3-4 cats per household to decrease coronavirus viral load and stress-mediated viral mutation.",
        "Perform regular disinfection with quaternary ammonium compounds or diluted sodium hypochlorite."
      ]
    },
    {
      id: "feline-fvr",
      name: "Feline Viral Rhinotracheitis / FVR (Feline Herpesvirus-1 / FHV-1 Infection)",
      nameHi: "फेलाइन हर्पीसवायरस फ्लू / वायरल राइनोट्रेकिटिस (बिल्लियों का जुकाम, छींकें व कॉर्निया पर छाले)",
      category: "Viral Upper Respiratory",
      tempRange: {
        minF: 102.0,
        maxF: 105.5,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Violent, paroxysmal sneezing accompanied by profuse bilateral serous to mucopurulent oculonasal discharge (लगातार तेज छींकें आना व आंखों-नाक से गाढ़ा मवाद जैसा पानी बहना)",
        "Dendritic Corneal Ulcers: Pathognomonic branching linear corneal ulcers visible with fluorescein or rose bengal stain (आंख की पुतली पर पेड़ की डालियों जैसे अल्सर / छाले)",
        "Severe bilateral chemosis, conjunctivitis, photophobia, and blepharospasm with eyelids gummed shut (आंखों की झिल्लियों में भारी सूजन व पलकों का आपस में चिपक जाना)",
        "Complete anosmia (loss of smell) leading to total refusal to eat or drink (सूंघने की क्षमता खत्म होने से खाना-पीना पूरी तरह छोड़ देना)",
        "Severe hypersalivation and open-mouth breathing due to complete nasal passage obstruction (नाक बंद होने से मुंह खोलकर सांस लेना व लार टपकना)",
        "Recurrent reactivation: Virus remains permanently latent within the trigeminal ganglia, reactivating during stress or corticosteroid therapy (तनाव में बार-बार बीमारी का उभरना)"
      ],
      differentialDiagnosis: [
        "Feline Calicivirus (FCV - prominent oral ulcers)",
        "Chlamydia felis (severe chemosis, less sneezing)",
        "Mycoplasma felis",
        "Bordetella bronchiseptica",
        "Nasal Cryptococcosis / Polyps"
      ],
      firstLineDrugs: [
        {
          genericName: "Famciclovir",
          brandExample: "Famvir 250mg/500mg tabs",
          doseMgPerKg: 90.0,
          route: "Oral",
          frequency: "BD",
          durationDays: 14,
          pregnancySafe: true,
          notes: "GOLD STANDARD FHV-1 ANTIVIRAL. Administer 90 mg/kg PO BD (or TDS in severe ulcerative keratitis). Inhibits viral DNA polymerase, dramatically resolving ocular and nasal lesions."
        },
        {
          genericName: "Doxycycline Monohydrate (Liquid Formulation)",
          brandExample: "Vibramycin Oral Susp / Doxypet",
          doseMgPerKg: 5.0,
          route: "Oral",
          frequency: "BD",
          durationDays: 14,
          pregnancySafe: false,
          notes: "Antibiotic of choice for secondary bacterial invaders (Chlamydia felis, Mycoplasma). ALWAYS follow oral tablet/capsule with 5 ml water flush to prevent fatal esophageal stricture."
        },
        {
          genericName: "Cidofovir 0.5% Ophthalmic Solution",
          brandExample: "Compounded Cidofovir Eye Drops",
          doseMgPerKg: 0.0,
          route: "Topical",
          frequency: "BD",
          durationDays: 14,
          pregnancySafe: true,
          notes: "Topical antiviral eye drops. Apply 1 drop in affected eyes twice daily. Highly effective against active herpesviral corneal replication."
        },
        {
          genericName: "L-Lysine",
          brandExample: "Viralys Gel / Enisyl-F Paste",
          doseMgPerKg: 20.0,
          route: "Oral",
          frequency: "BD",
          durationDays: 30,
          pregnancySafe: true,
          notes: "Administer 250-500 mg/cat PO BD. Competes with L-Arginine for viral capsid incorporation, slowing herpesvirus replication cycles during flare-ups."
        }
      ],
      supportiveCare: [
        "STEAM NEBULIZATION: Place cat in a steamy bathroom or use an ultrasonic saline nebulizer for 15 minutes TID to liquefy and clear inspissated nasal crusted plugs.",
        "WARM HIGH-AROMA FOOD: Offer strongly aromatic warmed foods (e.g., canned tuna, mackerel, sardines in water) to stimulate eating despite temporary anosmia.",
        "Gently clean crusted ocular and nasal secretions using sterile saline or warm boric acid solution 3-4 times daily.",
        "Fluid therapy: Subcutaneous or IV balanced crystalloids to restore hydration if the cat refuses all fluid intake."
      ],
      contraindications: [
        "CRITICAL: ABSOLUTELY NEVER administer Topical Corticosteroid Eye Drops (Dexamethasone/Prednisolone) in FHV-1; triggers rapid, catastrophic corneal perforation and melting ulcers.",
        "FATAL: NEVER administer Paracetamol/Acetaminophen.",
        "NEVER dry-swallow Doxycycline capsules in cats (causes caustic chemical esophagitis and permanent cicatricial stricture).",
        "Avoid systemic steroids; reactivates dormant viral replication in the trigeminal ganglia."
      ],
      desiNuskhe: [
        {
          name: "अजवाइन व सेंधा नमक गर्म भाप (Ajwain & Saline Nasal Decongestant Vapor)",
          ingredients: "Ajwain seeds (Trachyspermum ammi) 10g, Rock salt 5g, Boiling water 1 Liter.",
          preparation: "Boil water with ajwain and salt. Position the steaming pot safely outside the cat's travel crate covered with a thin bedsheet.",
          administration: "Allow cat to inhale the warm herbal steam for 10 minutes BD. Naturally clears blocked nasal turbinates and eases breathing."
        },
        {
          name: "गुनगुना कैमोमाइल आई वाश (Lukewarm Chamomile Ocular Cleanser)",
          ingredients: "Organic Chamomile tea bag 1 bag, Sterile distilled water 200ml.",
          preparation: "Brew chamomile tea in boiling water for 10 minutes. Remove bag and let the liquid cool completely to lukewarm.",
          administration: "Soak sterile cotton balls to gently soften and wipe away thick crusts glueing the eyelids shut before applying prescribed eye drops."
        }
      ],
      preventionAndVaccination: [
        "Core Vaccination (FVRCP): Primary series starting at 8 weeks, repeated at 12 and 16 weeks, and revaccinated at 1 year.",
        "Subsequent boosters every 1 to 3 years based on lifestyle and exposure risk.",
        "Minimize household stress (Feliway feline facial pheromone diffusers, quiet hiding spaces) to prevent stress-induced viral recrudescence.",
        "Quarantine newly introduced cats for 14-21 days before co-mingling in multi-cat households."
      ]
    },
    {
      id: "feline-calicivirus",
      name: "Feline Calicivirus / FCV (Ulcerative Stomatitis & Limping Syndrome)",
      nameHi: "फेलाइन कैलीसीवायरस / एफ.सी.वी. (जीभ, तालु व होंठों के दर्दनाक छाले, मुंह से लार व लंगड़ापन)",
      category: "Viral Upper Respiratory",
      tempRange: {
        minF: 101.5,
        maxF: 104.5,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Pathognomonic painful oral ulcerations on the dorsal tongue surface, hard palate, and philtrum (जीभ, तालु व होंठों पर गहरे लाल दर्दनाक छाले)",
        "Profuse, ropy, foul-smelling hypersalivation (ptyalism) dripping continuously from the mouth (मुंह से लगातार गाढ़ी बदबूदार लार टपकना)",
        "Severe oral pain: Cat approaches food with interest, takes one bite, and screams or paws frantically at the mouth (चारा खाने की कोशिश पर मुंह में भयानक दर्द व चीखना)",
        "'Limping Kitten Syndrome': Acute, transient, shifting-leg lameness and severe joint pain due to immune-complex synovitis (अचानक जोड़ों में सूजन व लंगड़ाकर चलना)",
        "Serous to mucopurulent nasal discharge with milder sneezing compared to FHV-1 (नाक से पानी व छींकें)",
        "Virulent Systemic FCV (VS-FCV): Severe facial/paw edema, extensive cutaneous ulceration, high fever, and systemic hemorrhagic vasculitis (घातक स्ट्रेन में चेहरे पर सूजन व त्वचा पर छाले)"
      ],
      differentialDiagnosis: [
        "Feline Herpesvirus-1 (FHV-1)",
        "Feline Chronic Gingivostomatitis (FCGS)",
        "Chemical or Caustic Ingestion (Household cleaners)",
        "Uremic Stomatitis (Chronic Kidney Disease)",
        "Oral Squamous Cell Carcinoma"
      ],
      firstLineDrugs: [
        {
          genericName: "Buprenorphine Hydrochloride",
          brandExample: "Buprenex / Buprigesic 0.3mg/ml",
          doseMgPerKg: 0.02,
          route: "Oral",
          frequency: "TDS",
          durationDays: 5,
          pregnancySafe: true,
          notes: "EXCELLENT ORAL TRANSMUCOSAL (OTM) ANALGESIA. Squirt into the sublingual cheek pouch. Absorbed directly across the oral mucosa; provides profound analgesia for agonizing stomatitis pain."
        },
        {
          genericName: "Clindamycin Hydrochloride",
          brandExample: "Antirobe / Clindex 25mg/ml Liquid",
          doseMgPerKg: 11.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 10,
          pregnancySafe: true,
          notes: "Primary antibiotic for secondary anaerobic bacterial stomatitis and periodontitis. Flavored liquid form is preferred over dry pills."
        },
        {
          genericName: "Amoxicillin + Clavulanate Potassium",
          brandExample: "Clavam Oral Drops (62.5mg/ml)",
          doseMgPerKg: 15.0,
          route: "Oral",
          frequency: "BD",
          durationDays: 7,
          pregnancySafe: true,
          notes: "Effective alternative broad-spectrum antimicrobial to control secondary oral mucosal sepsis and prevent aspiration pneumonia."
        },
        {
          genericName: "Meloxicam (Feline Specific Formulation)",
          brandExample: "Metacam 0.5mg/ml Feline Oral Susp",
          doseMgPerKg: 0.05,
          route: "Oral",
          frequency: "OD",
          durationDays: 3,
          pregnancySafe: false,
          notes: "NSAID for acute synovitis and limping syndrome. Dose strictly at 0.05 mg/kg once daily for a maximum of 3 days ONLY in well-hydrated, normovolemic cats with normal renal parameters."
        }
      ],
      supportiveCare: [
        "Provide ultra-soft, smooth, pureed, and warmed foods (e.g., canned pate, warm baby food without onion/garlic powder, kitten milk replacer).",
        "Subcutaneous fluid therapy (Plasmalyte or Normal Saline 30-40 ml/kg) to counter dehydration caused by total reluctance to swallow liquids.",
        "Gentle oral lavaging with dilute Chlorhexidine Gluconate 0.12% oral rinse to reduce oral bacterial burden and fetid halitosis.",
        "Keep the chin and chest dry from drooling saliva to prevent secondary moist dermatitis and fur loss."
      ],
      contraindications: [
        "FATAL: NEVER administer Paracetamol/Acetaminophen (causes fatal cyanosis, hepatic necrosis, and death within hours).",
        "NEVER administer standard canine doses of Meloxicam or any human NSAIDs (Ibuprofen, Diclofenac, Aspirin); causes acute renal failure.",
        "Avoid dry crunchy kibble during active ulceration (inflicts excruciating mechanical pain and mucosal bleeding).",
        "Avoid unmonitored systemic corticosteroids in the presence of acute ulcerative viral lesions."
      ],
      desiNuskhe: [
        {
          name: "नारियल तेल व हल्दी सुखदायक लेप (Virgin Coconut Oil & Turmeric Soothing Paste)",
          ingredients: "Cold-pressed pure Virgin Coconut Oil 10ml, Organic Turmeric powder (Haldi) 1g.",
          preparation: "Mix turmeric into warm coconut oil to form a smooth yellow emollient.",
          administration: "Dab 0.5 ml gently around outer lips and gum margins twice daily. Coconut oil provides natural lauric acid antimicrobial properties and soothes raw ulcerated tissue."
        },
        {
          name: "मुलेठी व शहद का पानी (Licorice & Honey Oral Demulcent)",
          ingredients: "Mulethi root (Glycyrrhiza glabra) 5g, Pure raw honey 5ml, Boiled water 100ml.",
          preparation: "Boil crushed mulethi root in water down to 50ml. Strain and blend in pure honey.",
          administration: "Syringe 1-2 ml very gently onto the tongue twice daily. Coats inflamed oral ulcers and eases agonizing swallowing pain."
        }
      ],
      preventionAndVaccination: [
        "Core FVRCP Vaccination ('Tricat'): 8, 12, and 16 weeks of age, booster at 1 year, and triennial revaccination thereafter.",
        "Note: Calicivirus has high strain variability (RNA virus); vaccination prevents severe clinical systemic disease but may not prevent mild mucosal infection or carrier shedding.",
        "Disinfect enclosures with 1:32 dilution of bleach (quaternary ammonium compounds are ineffective against non-enveloped Calicivirus).",
        "Isolate recovering cats for at least 30 days as viral shedding can persist in oropharyngeal secretions."
      ]
    },
    {
      id: "feline-flutd",
      name: "Feline Lower Urinary Tract Disease / FLUTD (Feline Idiopathic Cystitis & Urethral Obstruction)",
      nameHi: "फेलाइन मूत्र मार्ग अवरोध / पथरी / सिस्टाइटिस (पेशाब का रुकना, दर्द, चीखना व पेशाब में खून)",
      category: "Urological Emergency",
      tempRange: {
        minF: 98.0,
        maxF: 102.5,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Severe Stranguria / Dysuria: Straining in the litter box, producing only tiny drops of blood-tinged urine or no urine at all (पेशाब करने में अत्यधिक जोर लगाना, बूंद-बूंद पेशाब आना या बिल्कुल न आना)",
        "Frequent, agonizing trips to the litter box accompanied by distress vocalization and crying (बार-बार लिटर बॉक्स में जाना और दर्द से चीखना)",
        "Persistent licking of the prepuce, penis, or genital area due to burning urethral inflammation (लिंग व जननांग को बार-बार चाटना)",
        "Periuria: Urinating outside the litter box on cool, smooth surfaces (tiles, bathtubs, sinks, clean laundry) (लिटर बॉक्स से बाहर ठंडी जगहों पर पेशाब करना)",
        "EMERGENCY 'BLOCKED CAT': Palpation of a severely distended, turgid, rock-hard, non-expressible urinary bladder (पेट के निचले हिस्से में पत्थर जैसा कड़ा, फूला हुआ मूत्राशय)",
        "Terminal uremic signs in obstructed male cats (>24-48 hrs): Severe hypothermia, bradycardia (heart rate <120 bpm due to hyperkalemic cardiotoxicity), vomiting, and coma (पेशाब रुकने से रक्त में पोटेशियम का जानलेवा स्तर, हृदय गति धीमी होना व बेहोशी)"
      ],
      differentialDiagnosis: [
        "Struvite / Calcium Oxalate Urolithiasis",
        "Urethral Matrix Mucus Plug (Plugged tomcat)",
        "Bacterial Cystitis / UTI (rare in young cats, common in elderly cats)",
        "Transitional Cell Carcinoma of Bladder",
        "Traumatic Bladder Rupture"
      ],
      firstLineDrugs: [
        {
          genericName: "Prazosin Hydrochloride",
          brandExample: "Minipress 0.5mg / 1mg tabs",
          doseMgPerKg: 0.05,
          route: "Oral",
          frequency: "BD",
          durationDays: 7,
          pregnancySafe: true,
          notes: "Alpha-1 adrenergic receptor antagonist. Relaxes smooth muscle in the internal urethral sphincter, preventing post-unblocking re-spasm and re-obstruction."
        },
        {
          genericName: "Buprenorphine Hydrochloride",
          brandExample: "Buprenex / Buprigesic 0.3mg/ml",
          doseMgPerKg: 0.02,
          route: "Oral",
          frequency: "TDS",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Crucial sublingual / oral transmucosal pain relief. Breaks the vicious cycle of bladder pain, neurogenic inflammation, and reflexive urethral spastic constriction."
        },
        {
          genericName: "Calcium Gluconate 10% Solution",
          brandExample: "Calcium Gluconate 10% Ampoule",
          doseMgPerKg: 100.0,
          route: "IV",
          frequency: "Stat",
          durationDays: 1,
          pregnancySafe: true,
          notes: "CRITICAL CARDIAC RESCUE IN BLOCKED CATS: Administer 1.0 to 1.5 ml/kg slow IV over 10 minutes with continuous ECG monitoring to protect the myocardium against fatal hyperkalemic arrhythmia."
        },
        {
          genericName: "Glucosamine + Chondroitin (Glycosaminoglycans - GAGs)",
          brandExample: "Cystease / Feluro Oral Susp",
          doseMgPerKg: 25.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 30,
          pregnancySafe: true,
          notes: "Replenishes the depleted protective mucosal urothelial glycosaminoglycan (GAG) barrier layer of the bladder wall in feline idiopathic cystitis (FIC)."
        }
      ],
      supportiveCare: [
        "EMERGENCY DE-OBSTRUCTION: Sedate cat (Ketamine + Midazolam or Alfaxalone), exteriorize penis, pass a 3.5 Fr lubricated Tomcat or slippery-sam catheter, and flush gently with sterile warm saline (hydropropulsion) to dislodge plugs.",
        "Secure indwelling urinary catheter attached to a sterile closed collection bag for 24-48 hours; monitor post-obstructive diuresis (massive urine output requiring aggressive IV fluid replacement).",
        "IV fluid resuscitation using 0.9% Normal Saline (contains no potassium) until hyperkalemia is corrected, then switch to balanced crystalloids.",
        "TRANSITION TO 100% WET CANNED FOOD: Feed therapeutic urinary dissolution diets (e.g., Royal Canin Urinary S/O, Hills c/d) exclusively; banish all dry kibble."
      ],
      contraindications: [
        "CRITICAL: NEVER forcefully squeeze a rock-hard, obstructed urinary bladder manually (triggers fatal bladder rupture and uroabdomen).",
        "FATAL: NEVER administer Fleet Enemas containing sodium phosphate (causes fatal hyperphosphatemic hypocalcemic tetany within minutes in cats).",
        "NEVER administer NSAIDs while the cat is obstructed, hypotensive, or azotemic (precipitates acute irreversible renal necrosis).",
        "Avoid antibiotics in initial non-obstructive FIC unless bacterial culture definitively confirms infection (over 95% of young FLUTD cases are sterile)."
      ],
      desiNuskhe: [
        {
          name: "आर्द्रता वृद्धि व जल स्रोत व्यवस्था (Environmental Hydration Enrichment)",
          ingredients: "Ceramic running water fountain, Fresh non-chlorinated spring water, Multiple shallow ceramic bowls.",
          preparation: "Place water bowls in quiet rooms away from food and litter boxes. Install an electric bubbling pet water fountain.",
          administration: "Encourages instinctive water drinking. Expanding urine volume lowers urinary specific gravity (<1.030) and prevents crystal precipitation."
        },
        {
          name: "गीले भोजन में गर्म पानी का समावेश (Warm Water Enriched Gravy Diet)",
          ingredients: "Wet canned prescription food 50g, Warm boiled water 50ml.",
          preparation: "Mix equal parts warm water into the wet canned food to create a rich, soupy consistency.",
          administration: "Feed warm TID. Ensures massive daily moisture consumption directly through meals, continuously flushing bladder sludge."
        }
      ],
      preventionAndVaccination: [
        "No vaccine is applicable for FLUTD/FIC.",
        "Follow the 'N + 1' litter box rule: Provide one more litter box than the total number of cats in the house, scooped twice daily.",
        "Stress reduction protocol: Utilize Feliway Classic (synthetic feline facial pheromone) diffusers to lower sympathetic tone and cortisol levels.",
        "Maintain cats at optimal body weight; obesity and physical inactivity are major proven predisposing factors for feline urolithiasis."
      ]
    },
    {
      id: "feline-felv",
      name: "Feline Leukemia Virus / FeLV (Gammaretrovirus Immunodeficiency & Neoplasia)",
      nameHi: "फेलाइन ल्यूकेमिया वायरस / एफ.ई.एल.वी. (बिल्लियों का रक्त कैंसर, गंभीर रक्ताल्पता व प्रतिरक्षा क्षय)",
      category: "Retroviral",
      tempRange: {
        minF: 101.5,
        maxF: 104.5,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Profound, refractory non-regenerative anemia (hematocrit/PCV <15%) with chalk-white pale gums and tongue (गंभीर रक्ताल्पता / मसूड़ों व जीभ का बिल्कुल सफेद पड़ना)",
        "Development of aggressive multicentric or mediastinal lymphoma causing dyspnea, pleural effusion, and Horner's syndrome (छाती व लिम्फ नोड्स में कैंसर की गांठें)",
        "Persistent, recurrent opportunistic infections (chronic stomatitis, non-healing bite abscesses, intractable respiratory infections) (बार-बार गंभीर संक्रमण होना)",
        "Progressive cachexia, severe unresolving weight loss, muscle wasting, and poor dull coat (लगातार वजन गिरना व हड्डियों का ढांचा बन जाना)",
        "Chronic unresolving or undulating fever without apparent primary bacterial etiology (लगातार बना रहने वाला बुखार)",
        "Myelosuppression leading to severe leukopenia, neutropenia, and thrombocytopenic petechial hemorrhages (अस्थि मज्जा के नष्ट होने से प्लेटलेट्स व सफेद रक्त कोशिकाओं की भारी कमी)"
      ],
      differentialDiagnosis: [
        "Feline Immunodeficiency Virus (FIV / Feline AIDS)",
        "Feline Infectious Peritonitis (Dry FIP)",
        "Hemotropic Mycoplasmosis (Mycoplasma haemofelis)",
        "Primary Immune-Mediated Hemolytic Anemia",
        "Aplastic Anemia"
      ],
      firstLineDrugs: [
        {
          genericName: "Zidovudine (AZT)",
          brandExample: "Retrovir 100mg caps / Oral Solution",
          doseMgPerKg: 5.0,
          route: "Oral",
          frequency: "BD",
          durationDays: 30,
          pregnancySafe: false,
          notes: "Reverse transcriptase inhibitor. Reduces plasma viremia, improves stomatitis, and enhances quality of life in FeLV-positive cats. Monitor PCV closely for bone marrow suppression."
        },
        {
          genericName: "Recombinant Feline Interferon-Omega (rFeIFN-ω)",
          brandExample: "Virbagen Omega 10 MU vial",
          doseMgPerKg: 1.0,
          route: "SC",
          frequency: "OD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Administer 1 MU/kg SC once daily on Days 0-4, Days 14-18, and Days 60-64. Modulates host immune response and significantly prolongs survival."
        },
        {
          genericName: "Doxycycline Monohydrate (Liquid Susp)",
          brandExample: "Vibramycin 50mg/5ml Liquid",
          doseMgPerKg: 5.0,
          route: "Oral",
          frequency: "BD",
          durationDays: 21,
          pregnancySafe: false,
          notes: "Essential for concurrent secondary opportunistic hemoplasma infections (Mycoplasma haemofelis) which frequently cause fatal hemolytic crises in FeLV cats."
        },
        {
          genericName: "Prednisolone",
          brandExample: "Wysolone / Omnacortil 5mg",
          doseMgPerKg: 2.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 14,
          pregnancySafe: false,
          notes: "Palliative therapy for FeLV-associated lymphoma (as part of COP or CHOP chemotherapy protocol) or secondary immune-mediated hemolytic anemia."
        }
      ],
      supportiveCare: [
        "Perform whole blood transfusion (cross-matched, FeLV/FIV negative donor) when PCV drops below 12-14% or clinical signs of hypoxemia develop.",
        "Keep strictly indoors to prevent acquiring external infections and to stop transmission to neighborhood cats via friendly mutual grooming ('the friendly cat disease').",
        "Maintain routine bi-annual veterinary examinations, complete blood counts, serum chemistry panels, and urinalysis.",
        "Feed exclusively high-quality, commercially cooked or canned food; ABSOLUTELY PROHIBIT raw meat or unpasteurized milk diets (high risk of fatal Salmonella, Listeria, and Toxoplasma)."
      ],
      contraindications: [
        "NEVER administer modified-live vaccines (MLV) to FeLV-positive cats (can cause fulminant vaccine-strain induced disease; use killed vaccines only).",
        "FATAL: NEVER administer Paracetamol/Acetaminophen.",
        "Avoid indiscriminate long-term high-dose immunosuppressive agents unless treating confirmed lymphoma or IMHA.",
        "Do NOT allow positive cats to roam outdoors or share food/water bowls with retrovirus-negative cats."
      ],
      desiNuskhe: [
        {
          name: "गिलोय व आंवला प्राकृतिक रस (Giloy & Amla Immune-Support Nectar)",
          ingredients: "Fresh Tinospora cordifolia (Giloy) juice 5ml, Fresh Indian Gooseberry (Amla) juice 2ml, Pure Honey 3ml, Clean water 10ml.",
          preparation: "Blend fresh giloy and amla juices, dissolve raw honey, and dilute with water.",
          administration: "Syringe 2 ml orally once daily. Safe herbal rasayana supporting macrophage activity and providing natural antioxidant bioflavonoids."
        },
        {
          name: "अश्वगंधा व बकरी का दूध (Ashwagandha & Goat's Milk Tonic)",
          ingredients: "Ashwagandha root powder (Withania somnifera) 1g, Fresh boiled pasteurized goat milk 50ml.",
          preparation: "Simmer ashwagandha powder in fresh goat's milk for 5 minutes; strain and cool to lukewarm.",
          administration: "Feed 10-15 ml orally OD. Goat's milk provides easily digestible medium-chain triglycerides while ashwagandha combats chronic wasting."
        }
      ],
      preventionAndVaccination: [
        "Recombinant or inactivated FeLV Vaccine (e.g., Purevax FeLV, Nobivac FeLV): Recommended as a core vaccine for all kittens at 8 and 12 weeks of age.",
        "Annual booster for adult cats having outdoor access or living in multi-cat environments with unknown retroviral status.",
        "Routine SNAP ELISA screening for FeLV antigen (p27 capsid protein) and FIV antibody prior to initial vaccination or introduction of any new cat.",
        "Strict isolation: Prevent outdoor roaming, fighting, and sharing of food bowls and litter boxes with untested felines."
      ]
    },
    {
      id: "feline-hepatic-lipidosis",
      name: "Feline Hepatic Lipidosis / FHL (Idiopathic Fatty Liver Syndrome)",
      nameHi: "फेलाइन फैटी लिवर सिंड्रोम (लंबे समय तक भूखे रहने से जिगर में अत्यधिक वसा जमना व गंभीर पीलिया)",
      category: "Metabolic Hepatic",
      tempRange: {
        minF: 98.5,
        maxF: 102.5,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Severe, bright yellow jaundice / icterus involving the sclera, oral mucosa, inner ear pinnae, and skin (आंखों, मसूड़ों व त्वचा का गहरा पीला पड़ जाना)",
        "History of absolute or partial anorexia for >2 to 7 days in a previously overweight or obese cat (मोटे बिल्ले का कई दिनों से खाना-पीना पूरी तरह छोड़ देना)",
        "Rapid, dramatic loss of body weight (often >25-30% of total mass) with marked loss of temporal and dorsal muscle mass (वजन में भारी गिरावट व सिर की मांसपेशियों का सूखना)",
        "Marked hepatomegaly palpable on abdominal examination (smooth, blunt-edged, enlarged non-painful liver) (जिगर का असामान्य रूप से बड़ा हो जाना)",
        "Persistent nausea, excessive hypersalivation (ptyalism), and vomiting of clear or bile-stained fluid (लगातार मतली, लार टपकना व उल्टी)",
        "Pathognomonic biochemical pattern: Dramatic elevation in serum Alkaline Phosphatase (ALP) with normal or only mildly elevated Gamma-Glutamyl Transferase (GGT) (रक्त जांच में ALP का अत्यधिक बढ़ना जबकि GGT सामान्य रहना)"
      ],
      differentialDiagnosis: [
        "Feline Cholangiohepatitis / Cholangitis Complex",
        "Acute Pancreatitis",
        "Hepatic Lymphoma",
        "FIP (Hepatic granulomatous form)",
        "Extrahepatic Bile Duct Obstruction (EHBO)"
      ],
      firstLineDrugs: [
        {
          genericName: "L-Carnitine",
          brandExample: "Carnitor 500mg tabs / Oral Solution",
          doseMgPerKg: 50.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 30,
          pregnancySafe: true,
          notes: "CRITICAL CO-FACTOR THERAPY: Administer 250-500 mg/cat PO OD via feeding tube. Essential carrier molecule required to transport fatty acids across the inner mitochondrial membrane for beta-oxidation, halting fatty liver progression."
        },
        {
          genericName: "S-Adenosylmethionine (SAMe) + Silybin",
          brandExample: "Denamarin / Samylin Feline Tabs",
          doseMgPerKg: 20.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 45,
          pregnancySafe: true,
          notes: "Potent hepatoprotective antioxidant. Replenishes severely depleted intracellular glutathione stores and halts hepatocyte necrosis."
        },
        {
          genericName: "Phytomenadione (Vitamin K1)",
          brandExample: "Inresa Vitamin K1 10mg/ml Inj",
          doseMgPerKg: 1.0,
          route: "SC",
          frequency: "Stat",
          durationDays: 3,
          pregnancySafe: true,
          notes: "Administer 1.0 mg/kg SC once daily for 3 doses prior to placing feeding tubes. Corrects severe coagulopathies resulting from impaired hepatic activation of clotting factors II, VII, IX, and X."
        },
        {
          genericName: "Maropitant Citrate",
          brandExample: "Cerenia 10mg/ml",
          doseMgPerKg: 1.0,
          route: "SC",
          frequency: "OD",
          durationDays: 5,
          pregnancySafe: true,
          notes: "Controls severe centrally mediated nausea and vomiting to permit aggressive enteral tube feeding without reflux."
        }
      ],
      supportiveCare: [
        "DEFINITIVE LIFE-SAVING INTERVENTION: Placement of an Esophagostomy tube (E-tube) or Nasoesophageal tube (NE-tube) for prolonged enteral nutritional support (typically required for 3 to 6 weeks).",
        "Strictly calculate Resting Energy Requirement: RER = 70 × (Body Weight in kg)^0.75. Start feeding diluted high-protein feline convalescence diet (e.g., Hills a/d, Royal Canin Recovery) at 25% RER on Day 1, gradually ramping up to 100% RER by Day 4.",
        "MONITOR FOR REFEEDING SYNDROME: Check serum Potassium and Phosphorus twice daily during the first 72 hours of re-feeding; severe hypophosphatemia causes fatal acute hemolytic anemia.",
        "Balanced IV crystalloid fluid therapy supplemented with potassium chloride and B-complex vitamins (especially Thiamine and Cobalamin)."
      ],
      contraindications: [
        "CRITICAL: NEVER attempt to force-feed an anorexic, nauseous cat with a syringe (triggers severe learned food aversion and induces fatal aspiration pneumonia).",
        "FATAL: NEVER administer Paracetamol/Acetaminophen.",
        "Avoid Diazepam or Cyproheptadine as primary appetite stimulants in confirmed hepatic lipidosis (unreliable, delays critical tube placement, and Diazepam can induce fulminant hepatic necrosis).",
        "Avoid glucose-heavy IV fluids without adequate electrolyte and thiamine supplementation (precipitates acute fatal refeeding syndrome)."
      ],
      desiNuskhe: [
        {
          name: "ई-ट्यूब हेतु गुनगुना छना हुआ उच्च-प्रोटीन घोल (E-Tube Compatible Smooth High-Protein Mash)",
          ingredients: "Boiled chicken breast 100g, Boiled egg yolk (Anda Zardi) 1 yolk, Pure warm water 150ml, Taurine powder 250mg.",
          preparation: "Puree in a high-speed blender until completely smooth and liquid. Pass through a fine mesh strainer to ensure zero lumps that could clog the feeding tube.",
          administration: "Warm to body temperature (38°C) and infuse slowly via esophagostomy tube over 15-20 minutes in 4-6 divided meals daily."
        },
        {
          name: "भूमि आंवला व मकोय यकृत सत्व (Bhumi Amla & Makoy Hepatic Extract)",
          ingredients: "Fresh Bhumi Amla (Phyllanthus niruri) 10g, Dried Makoy berries 10g, Clean water 100ml.",
          preparation: "Boil herbs gently down to 30ml; strain through a fine double-layered filter.",
          administration: "Administer 2 ml twice daily via the feeding tube. Renowned hepatoprotective traditional remedy accelerating the reduction of serum bilirubin."
        }
      ],
      preventionAndVaccination: [
        "No vaccine exists for metabolic fatty liver disease.",
        "NEVER place an obese or overweight cat on a 'crash starvation diet'; weight loss must be meticulously planned at a slow rate of only 0.5% to 1.5% of body weight per week.",
        "Investigate any episode of inappetence lasting longer than 48 hours immediately before irreversible triglycerides accumulate in hepatocytes.",
        "Minimize environmental changes, boarding stress, or abrupt unpalatable diet shifts in multi-cat households."
      ]
    },
    {
      id: "feline-toxoplasmosis",
      name: "Feline Toxoplasmosis (Toxoplasma gondii Zoonotic Intracellular Protozoosis)",
      nameHi: "फेलाइन टोक्सोप्लाज्मोसिस (परजीवी जनित फेफड़ों, आंखों व तंत्रिका तंत्र का संक्रमण - गर्भवती महिलाओं हेतु घातक जुनोटिक रोग)",
      category: "Zoonotic Protozoan",
      tempRange: {
        minF: 101.5,
        maxF: 105.0,
        normalF: 101.5
      },
      cardinalSymptoms: [
        "Severe, acute necrotizing interstitial pneumonia causing tachypnea, dyspnea, and cyanosis (फेफड़ों में गंभीर संक्रमण व सांस लेने में अत्यधिक तकलीफ)",
        "Ocular lesions: Severe anterior or posterior uveitis, aqueous flare, retinochoroiditis, and optic neuritis (आंखों में सूजन, धुंधलापन, रेटिना खराब होना व अंधापन)",
        "Central Nervous System (CNS) signs: Depression, ataxia, intention tremors, head pressing, hyperesthesia, and generalized seizures (मस्तिष्क संक्रमण से सिर दबाना, लड़खड़ाहट व दौरे)",
        "Persistent, fluctuating high fever with marked lethargy, weight loss, and generalized lymphadenopathy (लगातार तेज बुखार, कमजोरी व गिल्टियों का बढ़ना)",
        "Hepatomegaly with secondary jaundice/icterus, vomiting, and diarrhea in acute hepatic necrosis (जिगर में सूजन, पीलिया व उल्टी-दस्त)",
        "ASYMPTOMATIC INTESTINAL CARRIER: Healthy adult cats shed millions of infectious unsporulated oocysts in their feces for 1-3 weeks following primary infection with zero signs (स्वस्थ दिखने वाली बिल्लियां भी मल में संक्रामक अंडे छोड़ती हैं)"
      ],
      differentialDiagnosis: [
        "Feline Infectious Peritonitis (FIP - neurological/ocular)",
        "Feline Immunodeficiency Virus (FIV)",
        "Systemic Cryptococcosis (Cryptococcus neoformans)",
        "Mycobacteriosis",
        "Toxocariasis"
      ],
      firstLineDrugs: [
        {
          genericName: "Clindamycin Hydrochloride",
          brandExample: "Antirobe 25mg/ml Liquid / Clindex tabs",
          doseMgPerKg: 12.5,
          route: "Oral",
          frequency: "BD",
          durationDays: 28,
          pregnancySafe: true,
          notes: "TREATMENT OF CHOICE. Administer 10-12.5 mg/kg PO BD (or 25 mg/kg OD) for 28 FULL CONSECUTIVE DAYS. Readily penetrates the blood-brain barrier, ocular structures, and muscular cysts."
        },
        {
          genericName: "Trimethoprim + Sulfadiazine (TMS)",
          brandExample: "Bactrim / Tribrissen Oral Susp",
          doseMgPerKg: 15.0,
          route: "Oral",
          frequency: "BD",
          durationDays: 28,
          pregnancySafe: false,
          notes: "Alternative folic acid synthesis inhibitor regimen. Administer 15 mg/kg PO BD for 4 weeks. Monitor for anorexia and crystalluria."
        },
        {
          genericName: "Prednisolone Acetate 1% Ophthalmic Drops",
          brandExample: "Pred Forte 1% Eye Drops",
          doseMgPerKg: 0.0,
          route: "Topical",
          frequency: "TDS",
          durationDays: 14,
          pregnancySafe: true,
          notes: "Topical anti-inflammatory drops to prevent permanent blindness from severe anterior uveitis and retinochoroiditis. Rule out corneal ulcers with fluorescein stain first."
        },
        {
          genericName: "Folinic Acid (Leucovorin Calcium)",
          brandExample: "Leucovorin 15mg tabs",
          doseMgPerKg: 1.0,
          route: "Oral",
          frequency: "OD",
          durationDays: 28,
          pregnancySafe: true,
          notes: "Co-administered if pyrimethamine/sulfonamides are used to prevent drug-induced bone marrow suppression and megaloblastic anemia."
        }
      ],
      supportiveCare: [
        "CRITICAL ZOONOTIC WARNING FOR PREGNANT WOMEN: T. gondii causes severe fetal microcephaly, hydrocephalus, and spontaneous abortion. Pregnant women must NEVER clean litter boxes.",
        "Empty litter boxes daily: Freshly shed oocysts require 1 to 5 days to sporulate and become infectious to humans.",
        "Provide supplemental oxygen therapy in cats presenting with acute necrotizing protozoal broncho-interstitial pneumonia.",
        "Administer IV balanced crystalloids to correct dehydration and sustain visceral organ perfusion during acute systemic illness."
      ],
      contraindications: [
        "CRITICAL ZOONOSIS: NEVER allow pregnant women or immunocompromised individuals to handle cat feces, soil, or sick felines.",
        "FATAL: NEVER administer Paracetamol/Acetaminophen.",
        "NEVER feed raw, undercooked meat, uneviscerated rodents, or raw game to cats (primary mode of feline infection).",
        "Do NOT administer systemic corticosteroids without concurrent full-dose Clindamycin coverage (triggers catastrophic tachyzoite proliferation and fatal encephalitis)."
      ],
      desiNuskhe: [
        {
          name: "लिटर बॉक्स का दैनिक खौलता पानी शोधन (Daily Boiling Water Litter Box Sterilization)",
          ingredients: "Freshly boiling water 3 Liters, Heavy rubber gloves, Metal litter scoop.",
          preparation: "Discard all used cat litter into sealed plastic disposal bags immediately.",
          administration: "Scald the empty litter pan with freshly boiled bubbling water (>60°C) for 5 minutes daily. Destroys hardy sporulated oocysts which are totally resistant to common chemical disinfectants."
        },
        {
          name: "उबला हुआ सुरक्षित भोजन व सौम्य पाचक पेय (Safe Cooked Nutrition & Hydration Broth)",
          ingredients: "Thoroughly cooked boneless chicken 50g, Warm boiled water 100ml.",
          preparation: "Cook all meats at high core temperatures (>70°C for 15+ minutes) to ensure complete destruction of tissue bradyzoite cysts before serving.",
          administration: "Feed warm small portions to provide clean bioavailable protein while avoiding raw contamination risks."
        }
      ],
      preventionAndVaccination: [
        "No commercial vaccine exists for feline toxoplasmosis.",
        "Feed strictly commercially cooked canned or dry food; NEVER allow cats to eat raw meat, poultry organs, bones, or hunt live rodents.",
        "Keep domestic pet cats exclusively indoors to terminate the wildlife predation hunting cycle.",
        "Always wear gloves when gardening; wash hands thoroughly with soap and warm water after handling soil, raw vegetables, or outdoor sandboxes."
      ]
    }
  ];

  // 3. CLINICAL SEARCH & RETRIEVAL HELPER METHODS
  window.VetcareApp.ClinicalData.getDiseaseById = function (id) {
    if (!id || typeof id !== "string") return null;
    const cleanId = id.trim().toLowerCase();
    const list = window.VetcareApp.ClinicalData.Feline || [];
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
    const list = window.VetcareApp.ClinicalData.Feline || [];
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
    const list = window.VetcareApp.ClinicalData.Feline || [];
    const results = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].category && list[i].category.toLowerCase() === targetCat) {
        results.push(list[i]);
      }
    }
    return results;
  };

})();
