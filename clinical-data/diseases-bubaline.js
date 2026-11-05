// Vetcare AI OS - Bubaline (Buffalo) Clinical Disease Database, Symptom Matrices & Rx Regimens (2026 Production)

(function (window) {
  'use strict';

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. COMPREHENSIVE BUBALINE DISEASE REGISTRY (8 MAJOR CONDITIONS)
  var BUBALINE_DISEASE_REGISTRY = [
    {
      id: 'bubaline-post-parturient-haemoglobinuria',
      name: 'Post-Parturient Haemoglobinuria (PPH)',
      nameHi: 'ब्याने के बाद लाल पेशाब (लहू मूतना / फास्फोरस कमी)',
      etiology: 'Acute severe hypophosphataemia (< 1.5 - 2.0 mg/dL inorganic phosphorus) in high-yielding dairy buffaloes 2-4 weeks post-calving, triggered by cruciferous plants (turnip, mustard cake) or berseem heavy feeding',
      category: 'Metabolic & Mineral Deficiency',
      tempRange: { minF: 99.5, maxF: 101.5, normalF: 101.0 },
      cardinalSymptoms: [
        'Voiding of dark red, port-wine, brown, or coffee-colored urine / गहरे लाल या कॉफी जैसे रंग का पेशाब',
        'Persistent thick red foam on urine surface that does not dissipate / पेशाब पर गहरा झाग जो देर तक न टूटे',
        'NORMAL OR SUBNORMAL TEMPERATURE (99.5-101.0°F); absence of initial fever / बुखार का अभाव (तापमान सामान्य या कम)',
        'Severe intravascular hemolysis: porcelain white mucous membranes turning icteric (jaundice) / आंखों व मसूड़ों का सफेद होकर पीला पड़ जाना',
        'Tachycardia with pounding heart sounds (audible from a distance), marked weakness, and sudden milk drop / दिल की तेज धड़कन, अत्यधिक कमजोरी व दूध सूखना'
      ],
      differentialDiagnosis: [
        'Bovine / Bubaline Babesiosis (Tick fever with soaring fever 105-107°F)',
        'Bacillary Hemoglobinuria (Clostridium haemolyticum)',
        'Leptospirosis (Associated with abortion and jaundice)',
        'Hematuria (Intact RBCs in urine from urinary calculi or cystitis)'
      ],
      firstLineDrugs: [
        {
          genericName: 'Sodium Acid Phosphate (Inorganic Phosphorus)',
          brandExample: 'Urimin / Tonophosphan / Nova-Phos (40.3% w/v)',
          doseMgPerKg: 100.0, // 60g to 80g total in sterile water
          route: 'IV',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'CRITICAL DRUG: Dissolve 60g in 500 ml sterile distilled water; administer slow IV initial dose, followed by 30g SC or IM twice daily for 3 days.'
        },
        {
          genericName: 'Tranexamic Acid',
          brandExample: 'Pause / Texakind / Trapic (100 mg/ml)',
          doseMgPerKg: 10.0, // 10-15 ml total
          route: 'IV',
          frequency: 'BD',
          durationDays: 2,
          pregnancySafe: true,
          notes: 'Potent antifibrinolytic agent that arrests ongoing capillary erythrocyte leakage.'
        },
        {
          genericName: 'Copper Glycinate',
          brandExample: 'Cuprate / Neo-Cuprex',
          doseMgPerKg: 0, // 2 ml to 4 ml deep SC
          route: 'SC',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Single subcutaneous dose; copper deficiency impairs red blood cell superoxide dismutase, triggering fragility.'
        }
      ],
      supportiveCare: [
        'Whole blood transfusion (4 to 5 Litres from a healthy non-lactating buffalo) if Packed Cell Volume (PCV) drops below 12%',
        'Dextrose 5% or 20% (1000 ml slow IV) to maintain renal filtration and prevent acute tubular necrosis from free hemoglobin',
        'Iron Dextran (Ferritas 10 ml deep IM) and Vitamin B12 to drive emergency bone marrow reticulocytosis',
        'Strict stall rest; minimize physical movement or agitation to prevent anoxic collapse'
      ],
      contraindications: [
        'FATAL CONTRAINDICATION: DO NOT administer Calcium Borogluconate without verified hypocalcemia (Calcium binds and rapidly precipitates circulating free phosphorus, causing immediate death).',
        'DO NOT administer Diminazene Aceturate (Berenil) empirically without positive blood smear confirmation of Babesia.'
      ],
      desiNuskhe: [
        'कॉफी व मीठा सोडा योग: 100g शुद्ध कॉफी पाउडर, 100g मीठा सोडा (Sodium Bicarbonate), 250ml सरसों का तेल और 500g पुराना गुड़ 1 लीटर पानी में घोलकर दिन में दो बार पिलाएं (फास्फोरस अवशोषण बढ़ाता है)।'
      ],
      preventionAndVaccination: [
        'Daily dietary supplementation with Dicalcium Phosphate (DCP) 50g to 75g per buffalo throughout gestation and early lactation.',
        'Avoid exclusive rations of cruciferous fodder (cabbage leaves, turnip tops, sarson) or phosphorus-deficient lush berseem.'
      ]
    },
    {
      id: 'bubaline-uterine-torsion',
      name: 'Uterine Torsion in Buffaloes (Dystocia)',
      nameHi: 'गर्भाशय मरोड़ (पेट में बछड़ा घूमना / गर्भाशय में बल पड़ना)',
      etiology: 'Rotation of the gravid uterus on its longitudinal axis (most commonly 180° to 360° post-cervical right-sided / clockwise torsion) due to deep abdominal cavity, loose broad ligaments, and wallowing behavior in pregnant buffaloes',
      category: 'Obstetrical Emergency',
      tempRange: { minF: 100.5, maxF: 102.5, normalF: 101.0 },
      cardinalSymptoms: [
        'First or second stage of labor initiated with intermittent straining, followed by sudden cessation of progress / ब्याने के दर्द शुरू होकर रुक जाना',
        'Frequent manifestations of colic: kicking at belly, switching tail, looking towards flank, frequent crouching and urination / पेट दर्द के लक्षण, बार-बार उठना-बैठना',
        'Per-vaginal examination reveals severe twisting of vaginal walls with distinct spiral folds (corkscrew appearance) / योनि में हाथ डालने पर पेचदार बल (घुमाव) महसूस होना',
        'Inability to palpate or reach the cervix or fetal parts through the stenosed twisted birth canal / गर्भाशय मुंह (बच्चेदानी) तक हाथ न पहुंचना',
        'Tachycardia, tachypnea, progressive toxemia, and fetal death within 24 to 48 hours if uncorrected / समय पर इलाज न मिलने पर पेट में बच्चे की मृत्यु'
      ],
      differentialDiagnosis: [
        'Incomplete Cervical Dilation (Failure of cervix to dilate)',
        'Uterine Inertia (Primary or Secondary)',
        'Fetal Monster (Schistosomus reflexus / Hydrocephalus)',
        'Abdominal Hernia'
      ],
      firstLineDrugs: [
        {
          genericName: 'Lignocaine Hydrochloride 2%',
          brandExample: 'Xylocaine 2% / Lox 2%',
          doseMgPerKg: 0, // 5 ml to 7 ml epidural
          route: 'Epidural',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Administer at first intercoccygeal space (sacrococcygeal) to abolish violent abdominal straining during maternal rolling or manipulation.'
        },
        {
          genericName: 'Ceftiofur Sodium',
          brandExample: 'Xyrofur / Naxcel 1g',
          doseMgPerKg: 2.2,
          route: 'IM',
          frequency: 'OD',
          durationDays: 5,
          pregnancySafe: true,
          notes: 'Post-detorsion broad-spectrum coverage against bacterial endometritis and ischemic peritonitis.'
        },
        {
          genericName: 'Flunixin Meglumine',
          brandExample: 'Megludyne / Flunixine (50 mg/ml)',
          doseMgPerKg: 2.2,
          route: 'IV',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Potent visceral analgesic and anti-endotoxemic agent; relieves intense uterine ischemia pain.'
        }
      ],
      supportiveCare: [
        'Schaffer\'s Method of Rolling: Place buffalo on ground in lateral recumbency on the side of torsion. Place wooden plank (12 feet long, 10-12 inches wide) on upper flank; an assistant stands on plank while dam is rolled rapidly in the direction of the torsion to keep uterus stationary while dam\'s body turns',
        'Caesarean section (Laparohysterotomy) via ventrolateral or flank incision if torsion is irreducible, duration > 72 hours, or uterus is friable',
        'Ringer\'s Lactate (4 to 6 Litres slow IV) to combat circulatory dehydration and hypovolemia',
        'Calcium Borogluconate 25% (450 ml slow IV) AFTER detorsion to stimulate exhausted myometrial contractions'
      ],
      contraindications: [
        'LETHAL WARNING: NEVER administer Oxytocin, Prostaglandin F2-alpha, or ecbolics while the uterine torsion is uncorrected (causes catastrophic rupture of the twisted uterine wall and fatal internal hemorrhage).',
        'Do not roll the animal in the opposite direction of the torsion spiral folds.'
      ],
      desiNuskhe: [
        'प्रसव पश्चात सौंठ-गुड़ काढ़ा: गर्भाशय मरोड़ सही होने और बछड़ा बाहर आने के बाद 500g पुराना गुड़, 50g सौंठ, 50g अजवाइन और 100ml सरसों का तेल गुनगुना पिलाएं।'
      ],
      preventionAndVaccination: [
        'Avoid wallowing in deep ponds or steep canal banks during the 8th to 10th month of advanced pregnancy.',
        'Ensure flat, non-slippery earthen flooring in calving pens; avoid sudden jumping or transport over steep ramps.'
      ]
    },
    {
      id: 'bubaline-vagino-cervical-prolapse',
      name: 'Vagino-Cervical & Uterine Prolapse',
      nameHi: 'फूल दिखाना (पीछा दिखाना / शरीर बाहर आना / कांच निकलना)',
      etiology: 'Eversion and protrusion of vagina/cervix pre-partum due to high estrogen, relaxed pelvic ligaments, hypocalcemia, and steep slope; or complete uterine eversion post-partum due to tenesmus and placental retention',
      category: 'Obstetrical Emergency',
      tempRange: { minF: 100.0, maxF: 102.5, normalF: 101.0 },
      cardinalSymptoms: [
        'Protrusion of a smooth spherical mass from vulva while sitting/lying down, disappearing upon standing (Pre-partum Grade I/II) / बैठने पर योनि से लाल गोला बाहर आना जो खड़े होने पर अंदर चला जाए',
        'Mass remains permanently outside vulva, becomes swollen, dry, lacerated, contaminated with dung, and bleeding (Grade III) / शरीर का परमानेंट बाहर लटके रहना व गंदगी लगना',
        'In complete post-partum uterine prolapse: massive bifurcated everted mass hanging down to hocks studded with dark red maternal cotyledons / ब्याने के बाद पूरी बच्चेदानी (अंगूर जैसे गुच्छों सहित) बाहर लटकना',
        'Severe, continuous violent abdominal tenesmus (straining) and painful urination (dysuria) / पशु का लगातार जोर मारना व दर्द से कराहना',
        'Risk of irreversible circulatory necrosis, hypovolemic shock, and fatal sepsis if exposed > 12 hours / अंग में सड़न व रक्त स्राव से मृत्यु का खतरा'
      ],
      differentialDiagnosis: [
        'Vaginal Tumor (Fibroma / Leiomyoma)',
        'Urinary Bladder Eversion / Rupture',
        'Hematoma of Vaginal Wall'
      ],
      firstLineDrugs: [
        {
          genericName: 'Lignocaine Hydrochloride 2%',
          brandExample: 'Xylocaine 2%',
          doseMgPerKg: 0, // 5 ml epidural
          route: 'Epidural',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Administer low caudal epidural anesthesia to completely suppress tenesmus and permit painless manual reduction.'
        },
        {
          genericName: 'Oxytocin Injection',
          brandExample: 'Syntocinon / Pitocin',
          doseMgPerKg: 0, // 30 to 50 IU total
          route: 'IM',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'ADMINISTER ONLY AFTER COMPLETE REDUCTION of uterine prolapse to contract the uterus into pelvic cavity and prevent re-prolapse.'
        },
        {
          genericName: 'Amoxicillin + Cloxacillin Sodium',
          brandExample: 'Masticlox / Intamox 4g',
          doseMgPerKg: 10.0,
          route: 'IM',
          frequency: 'OD',
          durationDays: 5,
          pregnancySafe: true,
          notes: 'Prophylaxis against secondary gangrenous metritis and systemic peritonitis.'
        }
      ],
      supportiveCare: [
        'Clean exposed mass with ice-cold 0.1% Potassium Permanganate (KMnO4) or hypertonic saline solution to shrink edematous tissue',
        'Apply pure sterile White Sugar or powdered Magnesium Sulfate over mucosal surface to draw out fluid by osmosis',
        'Manual repositioning: Elevate hindquarters of buffalo. Use closed fists (not fingers) to gently invert and push mass forward past pelvic brim',
        'Insert retaining vulvar sutures: Modified Buhner\'s suture or Horizontal Mattress suture using sterile umbilical tape (remove suture before calving)'
      ],
      contraindications: [
        'NEVER use open fingertips or sharp instruments (causes catastrophic perforation of the friable uterine wall and rupture of middle uterine artery).',
        'DO NOT use strong caustic disinfectants (Phenyl, Lysol, or high concentrated Dettol) on exposed endometrium.'
      ],
      desiNuskhe: [
        'फिटकरी बर्फ धुलाई व अरंडी तेल: बर्फ मिले ठंडे पानी में 20g फिटकरी घोलकर बाहर निकले अंग को अच्छी तरह धोएं ताकि सूजन कम हो, फिर अरंडी का तेल लगाकर हाथ की मुट्ठी से धीरे-धीरे अंदर करें।'
      ],
      preventionAndVaccination: [
        'Ensure the calving floor is level or slightly elevated at the rear; avoid backward downward slopes in stalls.',
        'Supplement bioavailable Calcium, Phosphorus, Zinc, and Vitamin E daily to strengthen pelvic muscular tone.'
      ]
    },
    {
      id: 'bubaline-acute-haemorrhagic-septicaemia',
      name: 'Acute Haemorrhagic Septicaemia in Buffaloes',
      nameHi: 'गलघोंटू (घुर्रका / भैंसों का जानलेवा सांस रोग)',
      etiology: 'Pasteurella multocida (B:2 serotype) - Buffaloes possess much higher clinical susceptibility and shorter disease incubation than cattle',
      category: 'Infectious Bacterial',
      tempRange: { minF: 105.0, maxF: 108.0, normalF: 101.0 },
      cardinalSymptoms: [
        'Fulminant onset: high fever (105-108°F), marked shivering, and sudden collapse into lateral recumbency / अत्यंत तेज बुखार व अचानक गिर पड़ना',
        'Rapid development of massive, hot, painful, tense inflammatory edema of throat, dewlap, and brisket / गले, जबड़े और छाती पर भारी गर्म सूजन',
        'Severe respiratory distress with loud, stertorous, choking rattling noise (ghurr-ghurr) / घुर्र-घुर्र की भयानक आवाज के साथ सांस घुटने लगना',
        'Extruded swollen cyanotic tongue, wide open mouth, and profuse frothy ropy salivation / जीभ सूजकर मुंह से बाहर निकल आना व झागदार लार',
        'Hyperacute mortality: death occurs within 8 to 24 hours due to endotoxic shock and upper airway asphyxiation / 8 से 24 घंटे में दम घुटने से मौत'
      ],
      differentialDiagnosis: [
        'Black Quarter',
        'Anthrax',
        'Acute Organophosphate or Urea Poisoning',
        'Severe Anaphylaxis / Wasp Sting'
      ],
      firstLineDrugs: [
        {
          genericName: 'Ceftiofur Sodium',
          brandExample: 'Xyrofur / Tiofur 1g',
          doseMgPerKg: 2.2,
          route: 'IV',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Administer loading dose INTRAVENOUSLY for immediate bactericidal plasma concentrations in hyperacute buffalo cases.'
        },
        {
          genericName: 'Sulfadimidine Sodium 33.3%',
          brandExample: 'Diadin / Sulpha-33 (333 mg/ml)',
          doseMgPerKg: 100.0, // Initial loading dose
          route: 'IV',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Infuse slowly intravenous; highly effective against Pasteurella. Follow with 50 mg/kg for subsequent 2 days.'
        },
        {
          genericName: 'Flunixin Meglumine',
          brandExample: 'Megludyne (50 mg/ml)',
          doseMgPerKg: 2.2,
          route: 'IV',
          frequency: 'OD',
          durationDays: 2,
          pregnancySafe: true,
          notes: 'Crucial for immediate reversal of endotoxin-induced pulmonary edema and reduction of throat inflammation.'
        }
      ],
      supportiveCare: [
        'Emergency tracheostomy: insert sterile tracheostomy tube into middle third of trachea if buffalo is suffocating to death from throat edema',
        'Dextrose Normal Saline (DNS 5%) 3 to 4 Litres slow IV to support cardiac output',
        'Chlorpheniramine Maleate (CPM 15 ml IM) to counteract histamine release',
        'Keep animal propped up in sternal posture; cold water packs on poll and forehead'
      ],
      contraindications: [
        'NEVER use Dexamethasone or Corticosteroids in pregnant buffaloes (triggers immediate abortion).',
        'Avoid rapid IV injection of Sulfonamides (causes cardiac arrhythmias and fatal collapse).'
      ],
      desiNuskhe: [
        'फिटकरी भाप व कपूर तेल: 50g फिटकरी उबलते पानी में डालकर भाप दें। गले पर 100ml सरसों के तेल में 10g कपूर मिलाकर हल्के हाथ से लेप करें।'
      ],
      preventionAndVaccination: [
        'Annual vaccination with Oil Adjuvant HS Vaccine (2 ml SC) or Alum Precipitated Vaccine (3 ml IM) in May-June before rains.',
        'Strict isolation of sick animals; avoid letting buffaloes wallow in common village ponds during disease outbreaks.'
      ]
    },
    {
      id: 'bubaline-surra-trypanosomiasis',
      name: 'Surra (Trypanosomiasis / Tabanid Fly Fever)',
      nameHi: 'सर्रा रोग (मक्खी बुखार / तिबरसा / सुरा)',
      etiology: 'Trypanosoma evansi, protozoan flagellate transmitted mechanically by biting horseflies (Tabanus) and stable flies (Stomoxys); buffaloes serve as key natural reservoir host',
      category: 'Protozoan',
      tempRange: { minF: 103.0, maxF: 106.5, normalF: 101.0 },
      cardinalSymptoms: [
        'Intermittent, recurrent paroxysms of high fever (103-106°F) corresponding with protozoan parasitemia waves / लहरदार बुखार जो बार-बार चढ़ता-उतरता रहे',
        'Progressive marked emaciation, muscle wasting, and loss of condition despite normal or voracious appetite / भरपेट खाने के बावजूद भैंस का कंकाल बन जाना',
        'Dependent subcutaneous edema of legs, brisket, ventral sheath, and submandibular space / पैरों, पेट के निचले हिस्से और गलकम्बल में पानी भरना',
        'Corneal opacity (unilateral or bilateral milky cloudy eye keratitis) and excessive lacrimation / आंखों में सफेदी (मोतिया जैसा जाला) व पानी बहना',
        'Nervous signs in acute form: aimless circling, head-pressing against wall, madness, convulsions, and sudden death / पागलों की तरह चक्कर काटना व दीवार पर सिर मारना'
      ],
      differentialDiagnosis: [
        'Bovine Theileriosis (Lymph node swelling)',
        'Rabies (Aggressive behavior, hydrophobia)',
        'Listeriosis (Circling with cranial nerve paralysis)',
        'Lead Poisoning'
      ],
      firstLineDrugs: [
        {
          genericName: 'Quinapyramine Sulfate & Chloride',
          brandExample: 'Triquin / Antrycide Pro-Salt (2.5g vial)',
          doseMgPerKg: 4.4, // Combined salt
          route: 'SC',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'DRUG OF CHOICE: Reconstitute 2.5g vial in 15 ml sterile water; inject subcutaneously in 2 separate sites in neck. Curative and protective for 60 days.'
        },
        {
          genericName: 'Diminazene Aceturate',
          brandExample: 'Berenil / Nilzane (70 mg/ml)',
          doseMgPerKg: 7.0, // Higher dose for Trypanosomiasis
          route: 'IM',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Administer deep intramuscularly. Useful in quinapyramine-resistant strains.'
        },
        {
          genericName: 'Isometamidium Chloride',
          brandExample: 'Samorin / Trypamidium (1 mg/ml)',
          doseMgPerKg: 0.5,
          route: 'IM',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Deep intramuscular injection; powerful curative and prophylactic agent.'
        }
      ],
      supportiveCare: [
        'Dextrose 20% (1000 ml IV) to treat profound hypoglycemia induced by parasite consumption of blood glucose during parasitemic peaks',
        'Iron Dextran (10 ml IM) and Vitamin B12 to combat severe non-regenerative anemia',
        'Eye drops: Chloramphenicol with Hydrocortisone eye drops for corneal opacity once fever subsides',
        'Liver Extract (Livogen 10 ml IM alternate days)'
      ],
      contraindications: [
        'DO NOT inject Quinapyramine intravenous (induces fatal curare-like neuromuscular collapse and cardiac arrest).',
        'Massage injection site thoroughly to avoid sterile cold abscesses.'
      ],
      desiNuskhe: [
        'चिरायता, गिलोय व नीम काढ़ा: 50g चिरायता, 50g ताजा गिलोय और 20g नीम की छाल को 2 लीटर पानी में उबालें। आधा रहने पर 100g गुड़ मिलाकर 5 दिन सुबह-शाम पिलाएं।'
      ],
      preventionAndVaccination: [
        'Control of Tabanid biting flies: spray barn with Deltamethrin 1.25% EC (2 ml/L) or apply Flumethrin pour-on along dorsal spine.',
        'Prophylactic administration of Quinapyramine Pro-salt to all adult buffaloes prior to monsoon vector boom.'
      ]
    },
    {
      id: 'bubaline-deg-nala-disease',
      name: 'Deg Nala Disease (Paddy Straw Mycotoxicosis)',
      nameHi: 'डेग नाला रोग (पूँछ व कान गलना / धान पुआल फंगस विषाक्तता)',
      etiology: 'Ingestion of moldy, damp, fungus-infested paddy (rice) straw infected with Fusarium equiseti / Fusarium moniliforme producing trichothecene mycotoxins (T-2 toxin / diacetoxyscirpenol), exacerbated by high selenium soils',
      category: 'Toxic/Mycotoxin',
      tempRange: { minF: 100.0, maxF: 101.5, normalF: 101.0 },
      cardinalSymptoms: [
        'Swelling of the distal extremities: fetlock, pastern, coronary band, and lower legs / पैरों के निचले जोड़ों में दर्दनाक सूजन',
        'Development of cold dry gangrene of the tail tip, ear tips, and muzzle / पूँछ की नोक, कानों के किनारे व थूथन का ठंडा पड़ना व गलना',
        'Necrotic tissue turns dark, dry, mummified, and gradually sloughs off (amputation of tail tip) / पूँछ का अंतिम सिरा सड़कर कटकर गिर जाना',
        'Sloughing of hooves (Exungulation) in severe advanced cases, forcing animal to walk on knees / खुरों का ढीला होकर छूट जाना व घुटनों के बल चलना',
        'Marked emaciation, rough staring coat, recumbency, and starvation / अत्यधिक कमजोरी व उठने में असमर्थता'
      ],
      differentialDiagnosis: [
        'Ergot Poisoning (Claviceps purpurea)',
        'Chronic Selenium Toxicity (Alkali disease)',
        'Foot Rot (Fusobacterium necrophorum)',
        'Frostbite'
      ],
      firstLineDrugs: [
        {
          genericName: 'Degcure Mineral Mixture Formulation',
          brandExample: 'Specific Veterinary Antidote Compound',
          doseMgPerKg: 0, // Proprietary daily powder
          route: 'Oral',
          frequency: 'OD',
          durationDays: 14,
          pregnancySafe: true,
          notes: 'Daily mineral mixture formula: Ferrous Sulfate (21g), Copper Sulfate (3g), Cobalt Sulfate (0.3g), Zinc Sulfate (9g). Neutralizes mycotoxin-induced vascular pathology.'
        },
        {
          genericName: 'Sodium Thiosulfate',
          brandExample: 'Antidote Powder',
          doseMgPerKg: 50.0, // 20g to 30g total orally
          route: 'Oral',
          frequency: 'OD',
          durationDays: 7,
          pregnancySafe: true,
          notes: 'Acts as heavy mineral / selenium antagonist and internal detoxifier.'
        },
        {
          genericName: 'Pentoxifylline',
          brandExample: 'Trental / Flexital (400 mg tab)',
          doseMgPerKg: 8.0,
          route: 'Oral',
          frequency: 'BD',
          durationDays: 10,
          pregnancySafe: true,
          notes: 'Peripheral vasodilator; enhances microvascular erythrocyte deformability and restores capillary blood flow to extremities.'
        }
      ],
      supportiveCare: [
        'IMMEDIATE FEED WITHDRAWAL: Completely stop feeding paddy (rice) straw immediately; substitute with green maize, sorghum, or berseem',
        'Toxisorb / HSCAS (Hydrated Sodium Calcium Aluminosilicate) 30g daily in feed to bind residual gut mycotoxins',
        'Surgical debridement / aseptic amputation of necrotic gangrenous tail stump',
        'Apply Topical Povidone-Iodine + Boric acid + Glycerine dressing on raw distal wounds'
      ],
      contraindications: [
        'NEVER continue feeding suspected rice straw even in small quantities.',
        'Avoid making affected buffaloes stand in stagnant water, wet mud, or slushy wallows (leads to fatal ascending clostridial gangrene).'
      ],
      desiNuskhe: [
        'सरसों तेल, हल्दी व बोरिक एसिड लेप: 100ml सरसों के तेल में 25g कच्ची हल्दी पाउडर और 10g बोरिक एसिड मिलाकर पूँछ और खुरों के सड़े हुए घाव पर दिन में दो बार लगाएं।'
      ],
      preventionAndVaccination: [
        'Never feed blackened, damp, moldy, or musty-smelling paddy straw to buffaloes.',
        'Straw Ammoniation: Treat paddy straw with 4% urea or 1% washing soda (Sodium carbonate) to destroy fungal spores before stacking.'
      ]
    },
    {
      id: 'bubaline-pox',
      name: 'Buffalo Pox (BPXV)',
      nameHi: 'भैंस चेचक (थनों पर छाले व फफोले)',
      etiology: 'Buffalopox virus (BPXV - family Poxviridae, genus Orthopoxvirus); high zoonotic potential infecting dairy milkers',
      category: 'Viral',
      tempRange: { minF: 101.5, maxF: 104.0, normalF: 101.0 },
      cardinalSymptoms: [
        'Eruption of localized papules, vesicles, pustules, and dark brown scabs on teats, udder, and perineum / थनों और अयन पर लाल दाने, छाले व पपड़ी',
        'Teats become exquisitely painful, swollen, and cracked; buffalo violently resists milking / थन छूने पर लात मारना व दूध न निकालने देना',
        'Secondary occlusion of the teat canal leading to milk stasis and severe clinical mastitis / थन का छेद बंद होना व थनैला हो जाना',
        'Systemic generalized form (in calves): lesions on muzzle, lips, nostrils, and inner thighs / कटड़ों में मुंह और जांघों पर चेचक के दाने',
        'Milkers develop painful pustular lesions with lymphadenitis on fingers and hands (Zoonosis) / दूध निकालने वाले के हाथों पर दर्दनाक फफोले'
      ],
      differentialDiagnosis: [
        'Pseudocowpox (Milker\'s Nodule - Parapoxvirus)',
        'Bovine Herpes Mamillitis (BHV-2)',
        'Foot and Mouth Disease (Teat lesions)',
        'Teat Papillomatosis'
      ],
      firstLineDrugs: [
        {
          genericName: 'Ceftiofur Sodium',
          brandExample: 'Xyrofur 1g',
          doseMgPerKg: 1.5,
          route: 'IM',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Prevents secondary bacterial invasion (Staphylococcal / Streptococcal) of open teat ulcers.'
        },
        {
          genericName: 'Meloxicam',
          brandExample: 'Melonex (5 mg/ml)',
          doseMgPerKg: 0.5,
          route: 'IM',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Reduces severe teat inflammatory pain to permit hygienic milk removal.'
        }
      ],
      supportiveCare: [
        'Wash affected teats before and after milking with 1:1000 Potassium Permanganate (KMnO4) or 0.5% Povidone-Iodine solution',
        'Apply Boric Acid (5%) in pure Glycerine on teat lesions after milking to soften hard scabs',
        'Use sterile Teat Siphon or Cannula under strict asepsis if teat canal is occluded by pox scabs',
        'Milkers MUST wear disposable latex gloves to prevent cross-contamination and human infection'
      ],
      contraindications: [
        'DO NOT forcefully peel or tear dry pox scabs (causes deep bleeding fissures and permanent teat fistula).',
        'Unprotected milkers with open wounds must NOT handle infected animals.'
      ],
      desiNuskhe: [
        'नारियल तेल व कपूर मलहम: 100ml शुद्ध नारियल के तेल में 15g बारीक पिसा देशी कपूर और 20g हल्दी मिलाकर थनों पर दूध निकालने के बाद लेप करें।'
      ],
      preventionAndVaccination: [
        'Strict isolation of infected buffaloes; milk affected animals last and destroy contaminated cleaning cloths.',
        'Disinfect milking stalls and floors with 2% Sodium Hydroxide (Caustic Soda) or 1% Virkon-S.'
      ]
    },
    {
      id: 'bubaline-ruminal-omasal-impaction',
      name: 'Ruminal & Omasal Impaction (Dry Feces Obstruction)',
      nameHi: 'गोबर रुकना (पेट में बंद पड़ना / सूखा गोबर / ओमेसम रुकावट)',
      etiology: 'Ingestion of highly fibrous, unchopped, lignified dry roughage (mature wheat straw, paddy husk, bagasse) combined with water deprivation, lack of wallowing in winter, or heavy ingestion of mud/foreign bodies',
      category: 'Digestive',
      tempRange: { minF: 100.0, maxF: 101.5, normalF: 101.0 },
      cardinalSymptoms: [
        'Complete cessation of defecation or voiding of scanty, hard, ball-like, dark feces covered with thick gelatinous mucus / गोबर बंद होना या सूखा, कड़ा, लीद जैसा बदबूदार थोड़ा गोबर आना',
        'Bilateral enlargement of abdomen; rumen on left flank feels solid, firm, doughy to hard like stone upon deep palpation / बाईं कोख में हाथ दबाने पर पत्थर जैसा कड़ा पेट',
        'Complete absence of normal ruminal motility (0 contractions per 2 minutes) upon stethoscope auscultation / पेट में गुड़गुड़ाहट व रूमेन गति का पूर्ण रूप से बंद होना',
        'Persistent dull abdominal pain: grunting, teeth grinding, stretching body, and arching back / कराहना, दांत पीसना व पेट तान कर खड़ा रहना',
        'Progressive dehydration, sunken eyeballs, dry leathery muzzle, and weakness / आंखें अंदर धंसना, थूथन सूखना व गंभीर निर्जलीकरण'
      ],
      differentialDiagnosis: [
        'Intestinal Obstruction / Intussusception',
        'Traumatic Reticuloperitonitis (TRP / Hardware Disease)',
        'Left Displaced Abomasum (LDA)',
        'Peritonitis'
      ],
      firstLineDrugs: [
        {
          genericName: 'Liquid Paraffin (Heavy Mineral Oil)',
          brandExample: 'Liquid Paraffin Heavy B.P.',
          doseMgPerKg: 0, // 1.5 to 2.5 Litres total
          route: 'Oral',
          frequency: 'OD',
          durationDays: 2,
          pregnancySafe: true,
          notes: 'ADMINISTER VIA STOMACH TUBE ONLY: Lubricates impacted mass without being absorbed into circulation.'
        },
        {
          genericName: 'Magnesium Sulfate + Sodium Sulfate',
          brandExample: 'Epsom Salt (500g) + Glauber\'s Salt (250g)',
          doseMgPerKg: 0, // 750g total powder
          route: 'Oral',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Dissolve in 4 to 5 Litres of warm water; acts as powerful osmotic saline purgative drawing water into gut.'
        },
        {
          genericName: 'Live Yeast & Rumen Probiotic Bolus',
          brandExample: 'Biosacc / Yea-Sacc / Rumentas (2 bolus)',
          doseMgPerKg: 0,
          route: 'Oral',
          frequency: 'BD',
          durationDays: 5,
          pregnancySafe: true,
          notes: 'Restores collapsed cellulolytic ruminal microflora once impaction softens.'
        }
      ],
      supportiveCare: [
        'Normal Saline (0.9% NaCl) 4 to 6 Litres IV daily with 5% Dextrose to correct severe dehydration and hypovolemia',
        'B-Complex with Liver Extract (Belamyl 10 ml IM) to stimulate smooth muscle gastrointestinal motility',
        'Gentle manual evacuation of hard fecal balls from rectum with warm soapy water enema',
        'Rumenotomy (Surgical opening of rumen) if foreign bodies (plastic, polythene bags) or massive refractory impaction persists'
      ],
      contraindications: [
        'LETHAL DANGER: DO NOT administer Neostigmine, Pilocarpine, or violent cholinergic rumen stimulants while the impaction is bone dry (induces immediate fatal ruminal or omasal rupture).',
        'NEVER drench oils forcefully by mouth using a glass bottle with head pulled up (causes immediate fatal aspiration pneumonia).'
      ],
      desiNuskhe: [
        'अरंडी तेल, गुड़ व सोंठ काढ़ा: 500ml अरंडी का तेल (Castor oil), 250ml सरसों का तेल, 500g पुराना गुड़ और 50g सोंठ पाउडर 2 लीटर गुनगुने पानी में मिलाकर नलकी द्वारा धीरे-धीरे पिलाएं।'
      ],
      preventionAndVaccination: [
        'Ensure continuous ad-libitum access to fresh, clean drinking water; provide at least 80-100 liters/day for adult buffaloes.',
        'Never feed dry, unchaffed straw alone; always blend with at least 25-30% succulent green fodder.'
      ]
    }
  ];

  // 3. ATTACH REGISTRY TO NAMESPACE
  window.VetcareApp.ClinicalData.Bubaline = BUBALINE_DISEASE_REGISTRY;

  // 4. HELPER SEARCH & CLINICAL QUERY METHODS
  var BubalineEngine = {
    getAllDiseases: function () {
      return BUBALINE_DISEASE_REGISTRY.slice();
    },

    getDiseaseById: function (id) {
      if (!id || typeof id !== 'string') return null;
      var cleanId = id.trim().toLowerCase();
      for (var i = 0; i < BUBALINE_DISEASE_REGISTRY.length; i++) {
        if (BUBALINE_DISEASE_REGISTRY[i].id.toLowerCase() === cleanId) {
          return BUBALINE_DISEASE_REGISTRY[i];
        }
      }
      return null;
    },

    searchDiseasesBySymptom: function (symptomQuery) {
      if (!symptomQuery || typeof symptomQuery !== 'string') return [];
      var query = symptomQuery.trim().toLowerCase();

      return BUBALINE_DISEASE_REGISTRY.filter(function (disease) {
        var inName = disease.name.toLowerCase().indexOf(query) !== -1;
        var inNameHi = disease.nameHi.toLowerCase().indexOf(query) !== -1;
        var inEtiology = disease.etiology.toLowerCase().indexOf(query) !== -1;

        var inSymptoms = disease.cardinalSymptoms.some(function (sym) {
          return sym.toLowerCase().indexOf(query) !== -1;
        });

        return inName || inNameHi || inEtiology || inSymptoms;
      });
    },

    getDiseasesByCategory: function (category) {
      if (!category || typeof category !== 'string') return [];
      var cleanCat = category.trim().toLowerCase();

      return BUBALINE_DISEASE_REGISTRY.filter(function (disease) {
        return disease.category.toLowerCase() === cleanCat;
      });
    },

    getObstetricalEmergencies: function () {
      return BUBALINE_DISEASE_REGISTRY.filter(function (disease) {
        return disease.category === 'Obstetrical Emergency';
      });
    }
  };

  // Expose Helper Engine
  window.VetcareApp.ClinicalData.BubalineHelper = BubalineEngine;

  console.log(
    '[Vetcare ClinicalData] Bubaline (Buffalo) Clinical Database Loaded: ' +
    BUBALINE_DISEASE_REGISTRY.length +
    ' validated dossiers (2026 Production).'
  );

})(window);
