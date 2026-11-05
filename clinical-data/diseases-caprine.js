// Vetcare AI OS - Caprine (Goat) Clinical Disease Database, Symptom Matrices & Rx Regimens (2026 Production)

(function (window) {
  'use strict';

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. COMPREHENSIVE CAPRINE DISEASE REGISTRY (8 MAJOR CONDITIONS)
  var CAPRINE_DISEASE_REGISTRY = [
    {
      id: 'caprine-peste-des-petits-ruminants',
      name: 'Peste des Petits Ruminants (PPR)',
      nameHi: 'बकरी प्लेग (कांगनी / संक्रामक मुख-आंत्र शोथ)',
      etiology: 'Small Ruminant Morbillivirus (Paramyxoviridae)',
      category: 'Viral',
      tempRange: { minF: 104.0, maxF: 106.5, normalF: 103.0 },
      cardinalSymptoms: [
        'Sudden, soaring fever (104-106.5°F) with extreme depression and shivering / तेज बुखार, सुस्ती व कंपकंपी',
        'Serous to thick mucopurulent ocular and nasal discharge crusting nostrils and matting eyelids / आंख-नाक से गाढ़ा मवाद जैसा स्राव',
        'Severe necrotic ulcerative stomatitis: gray cheesy deposits on gums, dental pad, and tongue with foul breath / मुंह, मसूड़ों व जीभ पर सफेद छाले व बदबूदार सांस',
        'Profuse, dark, watery, foul-smelling diarrhea with blood and mucus (severe dehydration) / काला, बदबूदार, खून मिला दस्त व पानी की भयंकर कमी',
        'Dyspnea with harsh coughing due to secondary viral/bacterial bronchopneumonia / खांसी, घुर्र-घुर्र व सांस लेने में अत्यधिक कष्ट'
      ],
      differentialDiagnosis: [
        'Contagious Caprine Pleuropneumonia (CCPP - No diarrhea or oral erosions)',
        'Coccidiosis (No stomatitis or high fever)',
        'Contagious Ecthyma / Orf (Proliferative scabs on lips, no systemic diarrhea)',
        'Blue Tongue'
      ],
      firstLineDrugs: [
        {
          genericName: 'Ceftiofur Sodium',
          brandExample: 'Xyrofur / Tiofur (250 mg / 500 mg vial)',
          doseMgPerKg: 2.2,
          route: 'IM',
          frequency: 'OD',
          durationDays: 4,
          pregnancySafe: true,
          notes: 'Prevents fatal secondary Pasteurella and Mannheimia bronchopneumonia and systemic septicemia.'
        },
        {
          genericName: 'Enrofloxacin 10%',
          brandExample: 'Floxidin / Baytril',
          doseMgPerKg: 5.0,
          route: 'IM',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: false,
          notes: 'Effective broad-spectrum coverage against secondary gut and pulmonary bacterial invaders.'
        },
        {
          genericName: 'Meloxicam',
          brandExample: 'Melonex (5 mg/ml)',
          doseMgPerKg: 0.5,
          route: 'IM',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Reduces severe pyrexia, oral pain, and pulmonary consolidation.'
        }
      ],
      supportiveCare: [
        'Aggressive rehydration: Dextrose Normal Saline (DNS) 500 ml to 1000 ml slow IV or warm oral electrolyte solutions (ORS) with 2% sodium bicarbonate',
        'Oral ulcer care: Rinse mouth with 0.1% Potassium Permanganate (KMnO4) followed by topical Boroglycerine paint',
        'Antidiarrheal: Kaolin-Pectin + Bismuth subnitrate (Neblon / Diaroak powder 15g orally BD)',
        'Vitamin A, D3, E + B-Complex (Belamyl 2-3 ml IM) to stimulate mucosal epithelial healing'
      ],
      contraindications: [
        'LETHAL DANGER: NEVER administer Dexamethasone or Corticosteroids (causes profound immunosuppression, viral flare-up, and 100% mortality).',
        'Do NOT withhold fluids or oral water in diarrheic goats.'
      ],
      desiNuskhe: [
        'बबूल छाल व अनार काढ़ा: 50g बबूल की छाल, 30g अनार का छिलका और 15g मेथी दाना 1 लीटर पानी में उबालकर आधा रहने पर 50g मिश्री मिलाकर दिन में दो बार पिलाएं (दस्त रोकता है)।'
      ],
      preventionAndVaccination: [
        'Live attenuated PPR Vaccine (Sungri 96 strain): 1 ml SC to all kids at 3-4 months of age; confers solid lifetime immunity (at least 3-4 years).',
        'Strict 21-day quarantine of newly purchased goats prior to herd introduction.'
      ]
    },
    {
      id: 'caprine-enterotoxaemia',
      name: 'Enterotoxaemia (Pulpy Kidney Disease)',
      nameHi: 'फिड़किया (विष-ज्वर / आंतों की विषाक्तता)',
      etiology: 'Clostridium perfringens type D (Epsilon protoxin activated by intestinal trypsin following sudden dietary shift to lush pasture or grain engorgement)',
      category: 'Infectious Bacterial',
      tempRange: { minF: 100.5, maxF: 103.0, normalF: 103.0 },
      cardinalSymptoms: [
        'Peracute sudden death in best-conditioned, fastest-growing kids/goats without prior symptoms / झुंड के सबसे स्वस्थ बकरे-बकरियों की अचानक मौत',
        'Neurological seizures: Opisthotonos (star-gazing with head pulled over back), violent convulsions / गर्दन का पीछे मुड़ जाना, चक्कर आना व झटके लगना',
        'Continuous paddling of limbs, teeth grinding, frothing at mouth, and bleating in agony / पैरों को हवा में चलाना, मुंह से झाग व दर्द से मिमियाना',
        'Pasty, greenish-yellow, fetid diarrhea in subacute forms with severe abdominal colic / हरा-पीला बदबूदार पतला दस्त व पेट दर्द',
        'Rapid post-mortem decomposition: soft, pulpy, mushy kidneys and glycosuria / मृत्यु के बाद गुर्दे का गलकर कीचड़ जैसा होना'
      ],
      differentialDiagnosis: [
        'Polioencephalomalacia (Cerebrocortical Necrosis - Thiamine deficiency)',
        'Tetanus (Rigid spastic paralysis, lockjaw)',
        'Acute Lead or Organophosphate Poisoning',
        'Rabies'
      ],
      firstLineDrugs: [
        {
          genericName: 'Procaine Penicillin G + Benzylpenicillin',
          brandExample: 'Pronapen (20 Lakh IU)',
          doseMgPerKg: 30000, // IU/kg
          route: 'IM',
          frequency: 'BD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'High-dose penicillin arrests further proliferation of vegetative clostridial bacilli in the intestinal lumen.'
        },
        {
          genericName: 'Clostridium perfringens Type D Antitoxin',
          brandExample: 'Specific Hyperimmune Antiserum',
          doseMgPerKg: 0, // 500 to 1000 IU total
          route: 'SC',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Administer immediately at onset of early clinical signs to neutralize circulating free epsilon toxin.'
        },
        {
          genericName: 'Sodium Bicarbonate 8.4%',
          brandExample: 'Soda Bicarb Oral Powder',
          doseMgPerKg: 100.0, // 5g to 10g total
          route: 'Oral',
          frequency: 'OD',
          durationDays: 2,
          pregnancySafe: true,
          notes: 'Neutralizes severe ruminal and systemic metabolic acidosis.'
        }
      ],
      supportiveCare: [
        'Activated Charcoal powder (1g to 2g per kg body weight as oral slurry) to adsorb intestinal toxins',
        'Thiamine Hydrochloride (Vitamin B1 10 mg/kg IM/IV) to mitigate brain edema and neurotoxicity',
        'Flunixin Meglumine (1.1 mg/kg IV) to combat severe toxemic shock and intestinal spasms',
        'Isolate herd immediately from grain concentrates or lush clover fields; feed dry grass straw'
      ],
      contraindications: [
        'NEVER feed grain rations, concentrates, or wet succulent legumes during an active ET outbreak.',
        'DO NOT delay therapy; enterotoxaemia is fatal within 2 to 6 hours once recumbency occurs.'
      ],
      desiNuskhe: [
        'लकड़ी का कोयला व मीठा सोडा: 50g बारीक पिसा लकड़ी का कोयला, 10g मीठा सोडा और 200g खट्टी छाछ (मट्ठा) मिलाकर तुरंत नाल से पिलाएं (आंतों के विष को सोखता है)।'
      ],
      preventionAndVaccination: [
        'Alum Precipitated Enterotoxaemia (ET) Vaccine: 2.5 ml SC annually in May-June before monsoon; booster 3 weeks later in young kids.',
        'Avoid sudden changes in diet; gradually introduce rich green fodder or concentrates over a 2-week period.'
      ]
    },
    {
      id: 'caprine-contagious-caprine-pleuropneumonia',
      name: 'Contagious Caprine Pleuropneumonia (CCPP)',
      nameHi: 'संक्रामक फेफड़ा रोग (बकरी न्यूमोनिया / फेफड़े की सूजन)',
      etiology: 'Mycoplasma capricolum subsp. capripneumoniae (Mccp)',
      category: 'Mycoplasmal',
      tempRange: { minF: 104.0, maxF: 106.5, normalF: 103.0 },
      cardinalSymptoms: [
        'Violent, painful, frequent coughing spells aggravated by movement / लगातार सूखी व दर्दनाक खांसी',
        'Marked respiratory distress: grunting on expiration, mouth open, head and neck extended / गर्दन तानकर मुंह से सांस लेना व कराहना',
        'Unilateral or bilateral serous to purulent nasal discharge with frothy salivation / नाक से पीला-सफेद स्राव व मुंह से लार',
        'Animal stands with abducted elbows, reluctant to move, with hollow flanks / कोहनी फैलाकर खड़े रहना व चलने से इनकार',
        'Auscultation reveals severe pleural friction rubs, moist rales, and lung consolidation / फेफड़ों में घड़घड़ाहट व रगड़ की आवाज'
      ],
      differentialDiagnosis: [
        'PPR (Distinguished by absence of diarrhea and mouth ulcers in CCPP)',
        'Pasteurellosis (Mannheimia haemolytica)',
        'Dictyocaulus filaria (Lungworm infestation)',
        'Caseous Lymphadenitis (Thoracic form)'
      ],
      firstLineDrugs: [
        {
          genericName: 'Tylosin Tartrate',
          brandExample: 'Tylosin / Tylon (200 mg/ml)',
          doseMgPerKg: 10.0,
          route: 'IM',
          frequency: 'BD',
          durationDays: 4,
          pregnancySafe: true,
          notes: 'HIGHLY SPECIFIC FOR MYCOPLASMA: Excellent lung tissue distribution. Drug of choice.'
        },
        {
          genericName: 'Oxytetracycline Long Acting (LA)',
          brandExample: 'Terramycin LA (200 mg/ml)',
          doseMgPerKg: 20.0,
          route: 'IM',
          frequency: 'OD',
          durationDays: 2,
          pregnancySafe: false,
          notes: 'Administer deep IM; repeat once after 72 hours. Highly effective if given early in incubation.'
        },
        {
          genericName: 'Florfenicol',
          brandExample: 'Nuflor (300 mg/ml)',
          doseMgPerKg: 20.0,
          route: 'IM',
          frequency: 'OD',
          durationDays: 2,
          pregnancySafe: false,
          notes: 'Administer every 48 hours for 2 doses; broad spectrum against resistant Mycoplasma and secondary Pasteurella.'
        }
      ],
      supportiveCare: [
        'Flunixin Meglumine (1.1 mg/kg IV) or Meloxicam (0.5 mg/kg IM) to suppress intense pleuritic pain and reduce pyrexia',
        'Bromhexine Hydrochloride (0.5 mg/kg IM) as a systemic mucolytic to break up thick bronchial exudate',
        'Warm, draft-free, well-ventilated housing; avoid overcrowding and dusty bedding',
        'Steam inhalation with Eucalyptus oil and camphor'
      ],
      contraindications: [
        'CRITICAL PHARMACOLOGICAL FACT: Penicillins, Ampicillin, and Cephalosporins are 100% INEFFECTIVE (Mycoplasmas lack a bacterial peptidoglycan cell wall).',
        'Avoid exposing coughing goats to cold rain or nighttime drafts.'
      ],
      desiNuskhe: [
        'अडूसा (वासा), अदरक व तुलसी काढ़ा: 50g वासा (अडूसा) पत्तियां, 20g अदरक, 20 तुलसी पत्र और 10 काली मिर्च 1 लीटर पानी में उबालकर आधा रहने पर 50g गुड़ मिलाकर सुबह-शाम 5 दिन पिलाएं।'
      ],
      preventionAndVaccination: [
        'Inactivated Saponin-Adjuvanted CCPP Vaccine: 1 ml SC annually in endemic areas.',
        'Strict biosecurity; slaughter or cull chronic carrier goats with encapsulated lung lesions.'
      ]
    },
    {
      id: 'caprine-goat-pox',
      name: 'Goat Pox (Variola Caprina)',
      nameHi: 'बकरी चेचक (माता रोग / चेचक)',
      etiology: 'Capripoxvirus (Poxviridae) - Highly contagious viral disease causing high mortality in young kids',
      category: 'Viral',
      tempRange: { minF: 104.0, maxF: 106.0, normalF: 103.0 },
      cardinalSymptoms: [
        'Initial phase: sudden pyrexia (104-106°F), anorexia, and swollen congested conjunctiva / अचानक तेज बुखार व आंखें लाल होना',
        'Cutaneous lesions: circumscribed red papules developing into hard nodules, vesicles, and dark crusty scabs on hairless skin / मुंह, थन, अंडकोष व जांघों पर लाल फफोले व चेचक के खुरंड',
        'Distribution concentrated on muzzle, lips, ears, eyelids, udder, scrotum, and under the tail / थूथन, होठों, कानों व अयन पर चेचक के दाने',
        'Internal lesions: lung pox nodules causing severe respiratory distress and coughing in young kids / फेफड़ों में दाने निकलने से सांस फूलना व मौत',
        'Ocular keratitis, mucopurulent nasal discharge, and swollen prescapular lymph nodes / आंखों में सफेदी व नाक से गाढ़ा मवाद बहना'
      ],
      differentialDiagnosis: [
        'Contagious Ecthyma / Orf (Lesions restricted to lips/muzzle, no high fever or generalized pox)',
        'PPR',
        'Demodectic Mange',
        'Pemphigus'
      ],
      firstLineDrugs: [
        {
          genericName: 'Ceftiofur Sodium',
          brandExample: 'Xyrofur 500 mg',
          doseMgPerKg: 2.2,
          route: 'IM',
          frequency: 'OD',
          durationDays: 4,
          pregnancySafe: true,
          notes: 'Controls secondary pyogenic bacterial infection of necrotic skin ulcers and pulmonary nodules.'
        },
        {
          genericName: 'Meloxicam',
          brandExample: 'Melonex (5 mg/ml)',
          doseMgPerKg: 0.5,
          route: 'IM',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Relieves cutaneous pain, udder tenderness, and reduces fever.'
        }
      ],
      supportiveCare: [
        'Wash erupting lesions with 1% Potassium Permanganate (लाल दवा) solution twice daily',
        'Apply Topical Povidone-Iodine 5% ointment + Zinc oxide paste on raw ulcerated nodules',
        'Chlorpheniramine Maleate (CPM 3 ml IM) to reduce intense cutaneous pruritus and allergic edema',
        'Vitamin A, D3, E and Zinc oral syrup to accelerate epidermal epithelial regeneration'
      ],
      contraindications: [
        'STRICT CONTRAINDICATION: Do NOT use Corticosteroids (Dexamethasone) under any circumstances (induces catastrophic systemic viremia and rapid death).',
        'Do NOT forcibly peel or scratch off dry pox scabs.'
      ],
      desiNuskhe: [
        'नीम, हल्दी व कपूर लेप: 100g ताजी नीम की पत्ती, 25g कच्ची हल्दी और 10g कपूर को पीसकर सरसों के तेल में हल्का गर्म करके घावों पर दिन में दो बार लगाएं। गोशाला में नीम का धुआं करें।'
      ],
      preventionAndVaccination: [
        'Live Attenuated Goat Pox Vaccine (Uttarkashi strain): 1 ml SC annually to all animals above 3 months of age.',
        'Immediate quarantine of infected goats; burn and bury all shed scabs and contaminated bedding.'
      ]
    },
    {
      id: 'caprine-contagious-ecthyma-orf',
      name: 'Contagious Ecthyma (Orf / Sore Mouth)',
      nameHi: 'खुरंड रोग (मुँह के छाले / ओरफ / संक्रामक मुँहपका)',
      etiology: 'Parapoxvirus (Poxviridae) - Highly contagious zoonotic virus producing localized proliferative pustular lesions',
      category: 'Viral',
      tempRange: { minF: 102.5, maxF: 103.5, normalF: 103.0 },
      cardinalSymptoms: [
        'Eruption of papules and pustules rapidly developing into thick, brown, proliferative warty crusts and scabs on lips and muzzle / होठों, थूथन व मुंह के कोनों पर मोटे, खुरदुरे मस्से जैसे खुरंड',
        'Crusts coalesce around oral commissures, making suckling or grazing intensely painful / होठों पर घाव से मुंह खोलने व चरने में असमर्थता',
        'Severe weight loss, emaciation, and starvation, especially in nursing young kids / दर्द के कारण दूध न पीना व बच्चों का सूखना',
        'Transfer of lesions to doe’s teats and udder via nursing kids, leading to secondary mastitis / बच्चों से मां के थनों पर घाव फैलना व थनैला होना',
        'ZOONOTIC TRANSMISSION: Animal handlers develop painful, solitary, weeping papules on fingers and forearms / इंसानों के हाथों पर दर्दनाक फफोले'
      ],
      differentialDiagnosis: [
        'Goat Pox (Generalized over entire body with systemic pyrexia)',
        'Foot and Mouth Disease (Vesicles on tongue and feet, ropy salivation)',
        'Blue Tongue'
      ],
      firstLineDrugs: [
        {
          genericName: 'Procaine Penicillin G',
          brandExample: 'Pronapen (20 Lakh IU)',
          doseMgPerKg: 20000, // IU/kg
          route: 'IM',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Given parenterally to arrest secondary Staphylococcal and Streptococcal infection of open oral fissures.'
        },
        {
          genericName: 'Oxytetracycline Topical Spray',
          brandExample: 'Topicure / Oxy-Spray',
          doseMgPerKg: 0,
          route: 'Topical',
          frequency: 'BD',
          durationDays: 5,
          pregnancySafe: true,
          notes: 'Apply directly over scabs after gentle cleaning.'
        }
      ],
      supportiveCare: [
        'Bottle-feed or tube-feed weak kids with warm goat milk, thin boiled porridge, or sattu gruel',
        'Gently clean lip crusts with warm 0.1% Potassium Permanganate (KMnO4) wash',
        'Apply 5% Boric acid in pure Glycerine over lips and gums thrice daily to soften painful scabs',
        'Meloxicam (0.5 mg/kg IM) to mitigate oral pain and restore feeding drive'
      ],
      contraindications: [
        'HUMAN ZOONOTIC WARNING: Handlers MUST wear thick rubber gloves when treating or feeding infected goats (causes painful human Orf lesions).',
        'Do NOT forcefully scrape bleeding raw scabs.'
      ],
      desiNuskhe: [
        'देशी घी, हल्दी व कपूर मलहम: 50ml शुद्ध देशी घी में 15g बारीक पिसी हल्दी और 5g देशी कपूर मिलाकर पेस्ट बनाएं। होठों के खुरंडों पर दिन में 3-4 बार लगाएं (पपड़ी को तुरंत नर्म कर घाव भरता है)।'
      ],
      preventionAndVaccination: [
        'Autogenous live scab scarification vaccine on inner thigh in heavily infected closed flocks.',
        'Segregate infected kids and dams; disinfect milk feeding bottles and buckets thoroughly with boiling water.'
      ]
    },
    {
      id: 'caprine-coenurosis-gid',
      name: 'Coenurosis (Gid / Sturdy / Circling Disease)',
      nameHi: 'गिड (चक्कर रोग / सिर में गांठ / मस्तिष्क परजीवी रोग)',
      etiology: 'Coenurus cerebralis (intermediate larval metacestode stage of the canine tapeworm Taenia multiceps encysted in the brain or spinal cord)',
      category: 'Parasitic/Helminth',
      tempRange: { minF: 102.0, maxF: 103.0, normalF: 103.0 },
      cardinalSymptoms: [
        'Compulsive, continuous, unidirectional circling movements (turning toward the side of the brain cyst) / एक ही दिशा में गोल-गोल चक्कर काटना',
        'Persistent abnormal head tilt, head pressing against fences or walls, and staggering uncoordinated gait / सिर टेढ़ा रखना व दीवारों से सिर दबाकर खड़ा होना',
        'Unilateral or bilateral blindness (amaurosis) with dilated unresponsive pupils; stumbling over objects / अंधापन, खंभों से टकराना व पुतली का फैलना',
        'Softening and localized thinning of the cranial skull bones directly overlying the cyst (skull yields to thumb pressure) / सिर की खोपड़ी की हड्डी का गलना व अंगूठे से दबना',
        'Progressive emaciation, recumbency, convulsions, and terminal paralysis / वजन गिरना, लकवा व अंततः मृत्यु'
      ],
      differentialDiagnosis: [
        'Listeriosis (Bacterial encephalitis - exhibits high fever and facial nerve paralysis)',
        'Polioencephalomalacia (B1 deficiency - bilateral, responds to thiamine)',
        'Brain Abscess (Trueperella pyogenes)',
        'Nervous Ketosis'
      ],
      firstLineDrugs: [
        {
          genericName: 'Praziquantel',
          brandExample: 'Distocide / Prazichek (50 mg tab)',
          doseMgPerKg: 50.0,
          route: 'Oral',
          frequency: 'OD',
          durationDays: 4,
          pregnancySafe: true,
          notes: 'Potent cestodicidal agent capable of crossing the blood-brain barrier; highly effective in early migratory stage.'
        },
        {
          genericName: 'Albendazole',
          brandExample: 'Albomar / Valbazen 2.5%',
          doseMgPerKg: 25.0, // High-dose cysticidal protocol
          route: 'Oral',
          frequency: 'OD',
          durationDays: 14,
          pregnancySafe: false,
          notes: 'Long-term high-dose therapy with fatty meal. STRICTLY CONTRAINDICATED IN FIRST TRIMESTER OF PREGNANCY.'
        }
      ],
      supportiveCare: [
        'Surgical Trephination: Locate softened focal area on skull bone under local lignocaine anesthesia; drill trephine hole, aspirate fluid with syringe, and gently pull out intact parasitic cyst',
        'Dexamethasone (1-2 mg IM) only in NON-PREGNANT goats to curb cerebral inflammation post-treatment',
        'Vitamin B1 (Thiamine 10 mg/kg IM) for neuronal protection',
        'Keep animal in dark, quiet, cushioned stall to prevent skull trauma during circling'
      ],
      contraindications: [
        'AVOID ALBENDAZOLE IN EARLY PREGNANCY (potent teratogen causing fetal bone malformations and abortion).',
        'Do NOT accidentally puncture or rupture the cyst during extraction (fluid spillage causes fatal anaphylaxis).'
      ],
      desiNuskhe: [
        'सुरक्षित शांत कक्ष: गिड पीड़ित बकरी को अंधेरे व शांत कमरे में रखें जहां चोट न लगे। प्राकृतिक रूप से कोई भी घरेलू नुस्खा खोपड़ी के अंदर बैठे परजीवी सिस्ट को खत्म नहीं कर सकता; तुरंत विशेषज्ञ शल्य-चिकित्सा आवश्यक है।'
      ],
      preventionAndVaccination: [
        'Regular deworming of shepherd and farm dogs every 3 months with Praziquantel (5 mg/kg) to eliminate adult Taenia multiceps.',
        'NEVER feed raw heads, skulls, or brains of dead goats to dogs; bury heads deeply with quicklime.'
      ]
    },
    {
      id: 'caprine-haemonchosis-barbers-pole',
      name: 'Haemonchosis (Barber’s Pole Worm Infection)',
      nameHi: 'पेट के कीड़े (बॉटल जॉ / रक्ताल्पता / खून चूसक कीड़े)',
      etiology: 'Haemonchus contortus (highly pathogenic blood-sucking nematode inhabiting the abomasal mucosa)',
      category: 'Parasitic/Helminth',
      tempRange: { minF: 102.0, maxF: 103.5, normalF: 103.0 },
      cardinalSymptoms: [
        'Profound, life-threatening anemia: conjunctival mucous membranes become porcelain chalky white (FAMACHA Score 4 or 5) / आंखों की झिल्ली का बिल्कुल सफेद पड़ना (खून की भारी कमी)',
        'Submandibular Edema ("Bottle Jaw"): soft, fluid-filled, non-inflammatory cold swelling beneath lower jaw / जबड़े के नीचे पानी भरी लटकती सूजन (बॉटल जॉ)',
        'Absence of diarrhea: animal passes normal hard dry fecal pellets while becoming severely anemic / दस्त नहीं होते; सामान्य गोबर के बावजूद बकरी कमजोर होती है',
        'Extreme exercise intolerance: falls behind herd, stumbles, collapses, panting heavily on mild exertion / थोड़ा चलने पर बैठ जाना व हांफना',
        'Dry, brittle fleece, poor hair coat, severe hypoproteinemia, and sudden death / बाल झड़ना, सुस्ती व अचानक मृत्यु'
      ],
      differentialDiagnosis: [
        'Fasciolosis (Liver Fluke - Fasciola gigantica)',
        'Johne’s Disease (Paratuberculosis - intractable diarrhea present)',
        'Chronic Malnutrition / Starvation',
        'Coccidiosis'
      ],
      firstLineDrugs: [
        {
          genericName: 'Closantel 15%',
          brandExample: 'Zyclos / Flukex / Closal (150 mg/ml)',
          doseMgPerKg: 10.0,
          route: 'Oral',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'DRUG OF CHOICE: Uncouples oxidative phosphorylation in blood-feeding adult and immature L4 larvae. Persistent protective activity for 4-6 weeks.'
        },
        {
          genericName: 'Levamisole Hydrochloride',
          brandExample: 'Vermisol / Nilverm',
          doseMgPerKg: 7.5,
          route: 'Oral',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Paralyzes worm neuromuscular junction. Highly effective but requires strictly accurate body weight measurement.'
        },
        {
          genericName: 'Moxidectin / Ivermectin',
          brandExample: 'Cydectin 0.1% / Neomec',
          doseMgPerKg: 0.2,
          route: 'SC',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Broad spectrum against nematodes and concurrent ectoparasitic lice/mites.'
        }
      ],
      supportiveCare: [
        'Iron Dextran (Ferritas 3 ml to 5 ml deep IM alternate days for 3 doses) to drive red blood cell synthesis',
        'Oral Hematinic Syrup (Feritas / Sharkoferrol 10 ml daily for 15 days) with Copper, Cobalt, and Vitamin B12',
        'High-protein supplemental feed (cracked pulses, mustard cake, bypass protein) to replenish depleted serum albumin',
        'Whole blood transfusion (250 ml to 500 ml from healthy goat) if PCV is critically below 10%'
      ],
      contraindications: [
        'NARROW SAFETY MARGIN: NEVER overdose Levamisole in emaciated, severely anemic goats (causes salivation, muscle tremors, respiratory collapse, and death).',
        'Avoid blanket herd deworming (accelerates anthelmintic resistance); use selective FAMACHA scoring.'
      ],
      desiNuskhe: [
        'कद्दू व पपीता बीज चूर्ण: 50g कद्दू के बीज (Pumpkin seeds) और 20g पपीते के सूखे बीज का बारीक चूर्ण 50g गुड़ में मिलाकर सुबह भूखे पेट खिलाएं (प्राकृतिक कृमिनाशक)।'
      ],
      preventionAndVaccination: [
        'FAMACHA Chart Clinical Scoring: Examine lower eyelid conjunctival mucous membranes monthly; deworm ONLY animals showing score 4 (pale) or 5 (white).',
        'Rotational grazing: Rest infected pastures for at least 6 to 8 weeks during monsoon to allow infective L3 larvae to desiccate.'
      ]
    },
    {
      id: 'caprine-pregnancy-toxaemia',
      name: 'Pregnancy Toxaemia (Twin Lamb Disease / Ketosis in Does)',
      nameHi: 'गर्भावस्था विषाक्तता (बकरी कीटोसिस / दोहरे बच्चे वाली बीमारी)',
      etiology: 'Severe maternal energy deficiency and acute hypoglycemia during the final 4-6 weeks of gestation in does carrying multiple fetuses (twins or triplets), driven by high fetal glucose demand and reduced rumen volume',
      category: 'Metabolic',
      tempRange: { minF: 99.0, maxF: 102.5, normalF: 103.0 },
      cardinalSymptoms: [
        'Occurs exclusively in late-pregnant does carrying large multiple fetuses (80% into gestation) / ब्याने से 2-4 हफ्ते पहले दोहरे बच्चों वाली बकरियों में होना',
        'Initial phase: separates from flock, dull, sluggish, lags behind, stands motionless with head low / झुंड से अलग होकर सुस्त खड़े रहना व सिर झुकाना',
        'Progressive neurological signs: apparent blindness, wandering aimlessly, tremors of muzzle and ears / अंधापन, होठों का फड़कना व दीवारों से टकराना',
        'Characteristic sweetish, sickly, pungent acetone odor in breath and urine / सांस और पेशाब में एसीटोन (मीठी) गंध',
        'Sternal recumbency, coma, fetal death, toxemia, and death within 3 to 5 days if untreated / बैठ जाना, कोमा में जाना व बच्चों की पेट में मौत'
      ],
      differentialDiagnosis: [
        'Caprine Hypocalcemia (Milk Fever in Goats)',
        'Polioencephalomalacia (CCN)',
        'Listeriosis',
        'Lead Poisoning'
      ],
      firstLineDrugs: [
        {
          genericName: 'Dextrose Injection 20% or 50%',
          brandExample: 'Dextrose 25% / 50% (500 ml)',
          doseMgPerKg: 100.0, // ml total volume (approx 100-200 ml)
          route: 'IV',
          frequency: 'BD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'EMERGENCY GLUCOSE: Infuse 100 ml to 200 ml slow IV to immediately reverse lethal neuroglycopenic brain damage.'
        },
        {
          genericName: 'Propylene Glycol (1,2-Propanediol)',
          brandExample: 'Propyl-G / Ketocheck Liquid',
          doseMgPerKg: 0, // 60 ml to 100 ml oral dose
          route: 'Oral',
          frequency: 'BD',
          durationDays: 4,
          pregnancySafe: true,
          notes: 'Absorbed across rumen wall as direct glucose precursor for hepatic gluconeogenesis.'
        },
        {
          genericName: 'Dexamethasone Sodium Phosphate',
          brandExample: 'Dexona (4 mg/ml)',
          doseMgPerKg: 0.3, // 10 mg to 15 mg total IM
          route: 'IM',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: false,
          notes: 'EMERGENCY CAUTION: Administered deliberately in term does (day 140+) to INDUCE IMMEDIATE PARTURITION / ABORTION. Removing fetuses saves the doe\'s life.'
        }
      ],
      supportiveCare: [
        'Thiamine Hydrochloride (Vitamin B1 10 mg/kg IM) and Vitamin B12 to support neuronal metabolism',
        'Sodium Bicarbonate (5g to 10g in warm water orally) to buffer severe ketoacidosis',
        'Calcium Borogluconate 25% (30-50 ml SC) as concurrent hypocalcemia occurs in 40% of cases',
        'Caesarean section under local infiltration if near term and doe does not respond to medical therapy within 24 hours'
      ],
      contraindications: [
        'DO NOT delay glucose or propylene glycol treatment (irreversible cerebral necrosis develops within 48 hours).',
        'Do NOT subject heavily pregnant does to sudden starvation, shearing, or stressful transport.'
      ],
      desiNuskhe: [
        'गुड़, अजवाइन व सोंठ शीरा: 150g शुद्ध गुड़, 10g सौंठ और 10g अजवाइन को 250ml गुनगुने पानी में घोलकर दिन में तीन बार पिलाएं (तुरंत ऊर्जा प्रदान करता है)।'
      ],
      preventionAndVaccination: [
        'Energy-dense concentrate feeding: Supply 250g to 400g daily of cracked maize, barley, and bypass fat to twin-bearing does during the final 6 weeks of gestation.',
        'Avoid both under-nutrition (BCS < 2.5) and excessive obesity (BCS > 4.0) in late pregnancy.'
      ]
    }
  ];

  // 3. ATTACH REGISTRY TO NAMESPACE
  window.VetcareApp.ClinicalData.Caprine = CAPRINE_DISEASE_REGISTRY;

  // 4. HELPER SEARCH & CLINICAL QUERY METHODS
  var CaprineEngine = {
    getAllDiseases: function () {
      return CAPRINE_DISEASE_REGISTRY.slice();
    },

    getDiseaseById: function (id) {
      if (!id || typeof id !== 'string') return null;
      var cleanId = id.trim().toLowerCase();
      for (var i = 0; i < CAPRINE_DISEASE_REGISTRY.length; i++) {
        if (CAPRINE_DISEASE_REGISTRY[i].id.toLowerCase() === cleanId) {
          return CAPRINE_DISEASE_REGISTRY[i];
        }
      }
      return null;
    },

    searchDiseasesBySymptom: function (symptomQuery) {
      if (!symptomQuery || typeof symptomQuery !== 'string') return [];
      var query = symptomQuery.trim().toLowerCase();

      return CAPRINE_DISEASE_REGISTRY.filter(function (disease) {
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

      return CAPRINE_DISEASE_REGISTRY.filter(function (disease) {
        return disease.category.toLowerCase() === cleanCat;
      });
    },

    getFamachaProtocol: function () {
      return {
        score1: { color: 'Optimal Red', action: 'No deworming needed; robust packed cell volume (PCV > 28%)' },
        score2: { color: 'Acceptable Red-Pink', action: 'No deworming needed; PCV 23-27%' },
        score3: { color: 'Borderline Pink', action: 'Monitor closely; deworm only if pregnant, kid, or high flock burden (PCV 18-22%)' },
        score4: { color: 'Dangerous Pale Pink', action: 'DEWORM IMMEDIATELY with Closantel or Levamisole (PCV 13-17%)' },
        score5: { color: 'Fatal Porcelain White', action: 'EMERGENCY: Immediate deworming + Iron Dextran + Blood transfusion (PCV < 12%)' }
      };
    }
  };

  // Expose Helper Engine
  window.VetcareApp.ClinicalData.CaprineHelper = CaprineEngine;

  console.log(
    '[Vetcare ClinicalData] Caprine (Goat) Clinical Database Loaded: ' +
    CAPRINE_DISEASE_REGISTRY.length +
    ' validated dossiers (2026 Production).'
  );

})(window);
