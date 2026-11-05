// Vetcare AI OS - Bovine Clinical Disease Database, Symptom Matrices & Rx Regimens (2026 Production)

(function (window) {
  'use strict';

  // 1. GLOBAL NAMESPACE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. COMPREHENSIVE BOVINE CLINICAL DOSSIERS (10 MAJOR DISEASES)
  var BOVINE_DISEASE_REGISTRY = [
    {
      id: 'bovine-haemorrhagic-septicaemia',
      name: 'Haemorrhagic Septicaemia (HS)',
      nameHi: 'गलघोंटू (घुर्रका)',
      etiology: 'Pasteurella multocida (B:2 serotype)',
      category: 'Infectious Bacterial',
      tempRange: { minF: 104.0, maxF: 107.5, normalF: 101.5 },
      cardinalSymptoms: [
        'Acute high fever (104-107°F) with profound toxemia and shivering / तीव्र बुखार व सुस्ती',
        'Warm, painful submandibular swelling extending to brisket / गले और गलकम्बल में कठोर सूजन',
        'Severe stertorous snoring breathing with open-mouth panting / घुर्र-घुर्र की आवाज के साथ सांस लेने में कठिनाई',
        'Profuse ropy salivation and congested mucous membranes / मुंह से लार गिरना एवं आंखें लाल होना',
        'Sudden collapse and mortality within 12-36 hours if untreated / 24 से 36 घंटे में मृत्यु का खतरा'
      ],
      differentialDiagnosis: [
        'Black Quarter (BQ)',
        'Anthrax',
        'Acute Bovine Respiratory Disease Complex (BRD)',
        'Snake Bite Envenomation'
      ],
      firstLineDrugs: [
        {
          genericName: 'Ceftiofur Sodium',
          brandExample: 'Xyrofur / Naxcel 1g',
          doseMgPerKg: 2.2,
          route: 'IM',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Standard therapeutic choice in lactating and pregnant cattle; zero milk withdrawal.'
        },
        {
          genericName: 'Oxytetracycline Hydrochloride',
          brandExample: 'Terramycin / Oxyvet LA (200 mg/ml)',
          doseMgPerKg: 10.0,
          route: 'IV',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: false,
          notes: 'Dilute in slow normal saline. Caution in advanced pregnancy.'
        },
        {
          genericName: 'Sulfadimidine Sodium 33.3%',
          brandExample: 'Sulpha-33 / Diadin IV',
          doseMgPerKg: 100.0,
          route: 'IV',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Administer loading dose 100 mg/kg slow IV, followed by 50 mg/kg for 2 consecutive days.'
        }
      ],
      supportiveCare: [
        'Meloxicam + Paracetamol (Melonex Plus) at 0.5 mg/kg IM OD for antipyresis and pain relief',
        'Dextrose Normal Saline (DNS 5%) 2 to 3 Litres slow IV to combat endotoxic shock',
        'Chlorpheniramine Maleate (CPM) 10 ml IM to minimize anaphylactoid edema',
        'Keep animal in shaded, well-ventilated dry stalls with elevated head posture'
      ],
      contraindications: [
        'STRICT WARNING: Do NOT use Dexamethasone or Betamethasone in pregnant animals (induces immediate third-trimester abortion).',
        'Avoid rapid intravenous infusion of Sulfonamides (causes cardiotoxic shock and collapse).'
      ],
      desiNuskhe: [
        'अलसी का तेल व कपूर लेप: 100ml अलसी तेल में 10g देशी कपूर मिलाकर गले की सूजन पर दिन में तीन बार हल्के हाथ से मालिश करें।',
        'हल्दी-लहसुन काढ़ा: 50g पिसा लहसुन, 30g कच्ची हल्दी और 25g काली मिर्च को 1 लीटर पानी में उबालकर आधा रहने पर 100g गुड़ मिलाकर गुनगुना पिलाएं।'
      ],
      preventionAndVaccination: [
        'Oil Adjuvant HS Vaccine (Alum Precipitated / Emulsified): 2 ml SC or 3 ml IM annually in May-June before monsoon onset.',
        'Immediate quarantine of suspected herds and disposal of nasal excretions with bleaching powder.'
      ]
    },
    {
      id: 'bovine-black-quarter',
      name: 'Black Quarter (BQ)',
      nameHi: 'लंगड़ा बुखार (चूड़ीमार / जहरबाद)',
      etiology: 'Clostridium chauvoei',
      category: 'Infectious Bacterial',
      tempRange: { minF: 104.5, maxF: 107.0, normalF: 101.5 },
      cardinalSymptoms: [
        'Severe acute lameness in hind or forelimb with high fever / पैर में अचानक लंगड़ापन व तेज बुखार',
        'Hot, painful swelling in heavy muscular areas (rump, thigh, shoulder) / जांघ या पुट्ठे के भारी मांस पर गर्म सूजन',
        'Swelling becomes cold, painless, with distinct dry crackling (crepitus) on pressing / दबाने पर चमड़े के नीचे चरचराहट की आवाज',
        'Skin over swelling turns dark, purplish-black, dry, and parchment-like / सूजन की चमड़ी काली व सूखी पड़ना',
        'Prostration, severe systemic toxemia, rapid death within 24-48 hours / अत्यधिक कमजोरी व विषाक्तता'
      ],
      differentialDiagnosis: [
        'Malignant Edema (Clostridium septicum)',
        'Anthrax',
        'Lightning Strike',
        'Fracture of Pelvis or Femur'
      ],
      firstLineDrugs: [
        {
          genericName: 'Procaine Penicillin G + Benzylpenicillin',
          brandExample: 'Pronapen / Penplast (40 Lakh IU)',
          doseMgPerKg: 30000, // IU/kg
          route: 'IM',
          frequency: 'BD',
          durationDays: 5,
          pregnancySafe: true,
          notes: 'Massive dose intramuscularly and multiple infiltration directly around the periphery of the crepitant muscle lesion.'
        },
        {
          genericName: 'Amoxicillin Sodium + Sulbactam Sodium',
          brandExample: 'Amoxirum Forte 3g / 4.5g',
          doseMgPerKg: 10.0,
          route: 'IM',
          frequency: 'BD',
          durationDays: 4,
          pregnancySafe: true,
          notes: 'High broad-spectrum efficacy against secondary vegetative clostridial multiplication.'
        }
      ],
      supportiveCare: [
        'Flunixin Meglumine at 1.1 to 2.2 mg/kg IV slow for intense musculoskeletal analgesia and anti-endotoxemia',
        'Multiple deep linear skin punctures over swelling with 3% Hydrogen Peroxide (H2O2) irrigation to create aerobic environment',
        'Normal Saline (0.9% NaCl) 3 Litres IV with Vitamin B-Complex to flush metabolic toxins',
        'Tetanus Toxoid (5 ml IM) as a complementary adjunct'
      ],
      contraindications: [
        'NEVER vigorously massage or rub the crepitating swelling (accelerates bacterial toxin dispersal into vascular system).',
        'Do NOT perform deep incisions without antibiotic umbrella.'
      ],
      desiNuskhe: [
        'नीम व फिटकरी लेप: नीम के पत्तों का गाढ़ा पेस्ट (200g) और 20g भुनी फिटकरी मिलाकर सूजन पर बाहरी लेप लगाएं।',
        'गिलोय व चिरायता काढ़ा: 50g गिलोय तना और 25g चिरायता 1 लीटर पानी में उबालकर छान लें और बुखार कम करने हेतु 100g गुड़ संग दिन में दो बार दें।'
      ],
      preventionAndVaccination: [
        'Formalin inactivated BQ Vaccine: 2 ml SC in young animals (above 6 months of age) annually prior to monsoon.',
        'Proper deep burial of carcasses with unslaked lime (quicklime) to prevent permanent pasture spore contamination.'
      ]
    },
    {
      id: 'bovine-foot-and-mouth-disease',
      name: 'Foot and Mouth Disease (FMD)',
      nameHi: 'खुरपका-मुँहपका (खुरहा / पर्टा)',
      etiology: 'Aphthovirus (Picornaviridae) - Serotypes O, A, Asia-1',
      category: 'Viral',
      tempRange: { minF: 103.5, maxF: 106.0, normalF: 101.5 },
      cardinalSymptoms: [
        'High pyrexia accompanied by rapid drop in milk yield / अचानक दूध सूखना व तेज बुखार',
        'Profuse ropy, stringy, mucoid salivation hanging from mouth / मुंह से तार जैसी चिपचिपी लार गिरना',
        'Characteristic lip-smacking and tongue-champing movements / मुंह बार-बार चलाना व चप-चप की आवाज',
        'Vesicles and erosive ulcers on dental pad, dorsum of tongue, and oral mucosa / जीभ, मसूड़ों और तालू पर दर्दनाक छाले व छिलन',
        'Painful blisters and open raw sores in interdigital cleft and coronary band leading to acute lameness / खुरों के बीच घाव व गंभीर लंगड़ापन'
      ],
      differentialDiagnosis: [
        'Bovine Viral Diarrhoea (BVD)',
        'Malignant Catarrhal Fever (MCF)',
        'Vesicular Stomatitis',
        'Rinderpest (Eradicated)'
      ],
      firstLineDrugs: [
        {
          genericName: 'Ceftiofur Sodium',
          brandExample: 'Ceftiokem / Xyrofur 1g',
          doseMgPerKg: 1.5,
          route: 'IM',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'No direct antiviral exists; administered strictly to prevent secondary bacterial septicemia, foot rot, and bronchopneumonia.'
        },
        {
          genericName: 'Enrofloxacin 10%',
          brandExample: 'Floxidin / Baytril',
          doseMgPerKg: 5.0,
          route: 'IM',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: false,
          notes: 'Alternative antibiotic for secondary infection control in non-pregnant heifers and dry cows.'
        }
      ],
      supportiveCare: [
        'Oral ulcer wash: 1% Potassium Permanganate (लाल दवा / KMnO4) or 2% Sodium Bicarbonate solution thrice daily',
        'Foot lesions: Clean with 2% Copper Sulfate (नीला थोथा) foot bath followed by Povidone Iodine 10% solution',
        'Meloxicam 0.5 mg/kg IM OD for 3 days to alleviate severe pedal pain and tongue inflammation',
        'B-Complex with Liver extract (Belamyl 10 ml IM) to accelerate mucosal epithelial regeneration'
      ],
      contraindications: [
        'DO NOT apply concentrated acids or toxic insecticides (like Phenyl or Dichlorvos) directly on mouth ulcers.',
        'Avoid forceful hard roughage feeding (dry straw or sorghum); feed soft green grass, boiled porridge, or sattu.'
      ],
      desiNuskhe: [
        'शहद व हल्दी मुख लेप: 50g शुद्ध मधु (शहद) में 20g बारीक पिसी कच्ची हल्दी और 5g सुहागा (Borax) मिलाकर मुंह के छालों पर दिन में 3-4 बार लेप करें।',
        'तिल तेल व कपूर खुर उपचार: 200ml तिल के तेल में 15g देशी कपूर और 20ml नीम का तेल मिलाकर खुरों के घावों में भरें (मक्खी व कीड़े बैठने से रोकता है)।'
      ],
      preventionAndVaccination: [
        'Inactivated Oil-Adjuvanted FMD Trivalent Vaccine (NADCP): 2 ml deep IM every 6 months to all bovines above 4 months.',
        'Strict farm quarantine; isolate in-contact animals and disinfect floors with 4% Sodium Carbonate (Washing Soda).'
      ]
    },
    {
      id: 'bovine-lumpy-skin-disease',
      name: 'Lumpy Skin Disease (LSD)',
      nameHi: 'लंपी त्वचा रोग (गांठदार त्वचा बीमारी)',
      etiology: 'Capripoxvirus (Neethling strain)',
      category: 'Viral',
      tempRange: { minF: 104.0, maxF: 106.5, normalF: 101.5 },
      cardinalSymptoms: [
        'Sharp spike in body temperature (104-106°F) lasting 3 to 7 days / लगातार तेज बुखार',
        'Sudden eruption of firm, circumscribed cutaneous nodules (2 to 5 cm) all over body / पूरे शरीर पर 2 से 5 सेमी की गोल कठोर गांठें',
        'Severe edema of legs, brisket, and ventral abdomen / पैरों, गलकम्बल और अंडकोष/अयन में भारी पानी भरी सूजन',
        'Enlargement of superficial lymph nodes (prescapular and precrural) / कंधों और जांघों के पास की ग्रंथियों का फूलना',
        'Purulent ocular and nasal discharge, ulcerative keratitis, and rapid drop in lactation / आंखों व नाक से गाढ़ा स्राव व दूध में भारी कमी'
      ],
      differentialDiagnosis: [
        'Pseudo-Lumpy Skin Disease (Bovine Herpesvirus-2)',
        'Demodectic Mange',
        'Urticaria / Allergic plaques',
        'Onchocerciasis'
      ],
      firstLineDrugs: [
        {
          genericName: 'Ceftiofur Sodium',
          brandExample: 'Excenel / Tiofur 1g',
          doseMgPerKg: 2.0,
          route: 'IM',
          frequency: 'OD',
          durationDays: 5,
          pregnancySafe: true,
          notes: 'Prevents necrotic bacterial ulceration, fly-blown maggots (myiasis), and secondary lung consolidation.'
        },
        {
          genericName: 'Ivermectin 1%',
          brandExample: 'Neomec / Ivomec',
          doseMgPerKg: 0.2, // 1 ml per 50 kg
          route: 'SC',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Administer single subcutaneous injection to control tick/fly vectors and inhibit subcutaneous maggot infestation.'
        }
      ],
      supportiveCare: [
        'Meloxicam (0.5 mg/kg IM OD) or Tolfenamic Acid (2 mg/kg IM alternate day) for anti-inflammatory relief',
        'Chlorpheniramine Maleate (Anistamin 10 ml IM) once daily for 4 days',
        'Spray open necrotic skin lesions with Topical Oxytetracycline + Gentian Violet + Permethrin spray (Topicure / D-Mag)',
        'Vitamin A, D3, E and Biotin injections (Intavita / Multistar) to restore dermal epithelial integrity'
      ],
      contraindications: [
        'CRITICAL CONTRAINDICATION: Corticosteroids (Dexamethasone, Prednisolone) are strictly FORBIDDEN; causes severe immunosuppression and multi-organ viral replication.',
        'Avoid sudden scrubbing or rupturing of firm intact cutaneous nodules.'
      ],
      desiNuskhe: [
        'पान पत्ता व काली मिर्च लड्डू: 10 ताजे पान के पत्ते, 15g साबुत काली मिर्च, 15g सेंधा नमक और 50g गुड़ को पीसकर लड्डू बनाकर दिन में तीन बार 3 दिन तक खिलाएं।',
        'नीम-हल्दी धूमन व लेप: गोशाला में प्रतिदिन शाम को सूखी नीम पत्तियों का धुआं करें। फटी हुई गांठों पर नीम पत्ती का रस, कच्ची हल्दी और नारियल तेल का गाढ़ा लेप लगाएं।'
      ],
      preventionAndVaccination: [
        'Homologous Lumpi-ProVacInd or Heterologous Goat Pox Vaccine (Uttarkashi strain) at 1 ml SC annually.',
        'Vector control: Deltamethrin 1.25% EC barn spray (2 ml/L water) or Flumethrin pour-on to eradicate biting flies (Stomoxys) and ticks.'
      ]
    },
    {
      id: 'bovine-clinical-mastitis',
      name: 'Bovine Mastitis (Clinical & Subclinical)',
      nameHi: 'थनैला रोग (स्तनदाह / गाद आना)',
      etiology: 'Staphylococcus aureus, Streptococcus agalactiae, Escherichia coli',
      category: 'Infectious Bacterial',
      tempRange: { minF: 101.5, maxF: 105.0, normalF: 101.5 },
      cardinalSymptoms: [
        'Hard, swollen, hot, reddened, and extremely painful quarter / थन में अत्यधिक सूजन, लाली, कड़ापन व असहनीय दर्द',
        'Physical alteration in milk: clots, flakes, blood, yellowish serum, or foul-smelling watery fluid / दूध में छिल्ले, खून, पीप या पानी जैसा पतलापन',
        'Animal refuses milking, kicks violently on touching udder / थन छूने पर लात मारना व दूध न उतारना',
        'In coliform toxic mastitis: high fever, sunken eyes, severe recumbency, and septic shock / विषाक्त थनैले में तेज बुखार व पशु का बैठ जाना',
        'Positive California Mastitis Test (CMT) or Bromothymol Blue test / सीएमटी परीक्षण में जेल बनना'
      ],
      differentialDiagnosis: [
        'Physiological Postpartum Udder Edema',
        'Udder Hematoma / Direct Trauma',
        'Teat Papillomatosis (Warts)',
        'Blackquarter of Udder'
      ],
      firstLineDrugs: [
        {
          genericName: 'Cefquinome Sulfate 2.5%',
          brandExample: 'Cobactan 2.5% / Cefquik',
          doseMgPerKg: 1.0,
          route: 'IM',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: '4th generation cephalosporin with excellent udder tissue penetration; ideal for broad-spectrum parenteral therapy.'
        },
        {
          genericName: 'Amoxicillin Sodium + Cloxacillin Sodium',
          brandExample: 'Intamox / Masticlox 3g / 4g',
          doseMgPerKg: 10.0,
          route: 'IM',
          frequency: 'BD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Penicillinase-resistant formulation effective against Beta-lactamase producing Staphylococci.'
        },
        {
          genericName: 'Intramammary Infusion (Cloxacillin + Ampicillin)',
          brandExample: 'Mammitel / Tilox / Pendistrin-SH',
          doseMgPerKg: 0, // Tube formulation
          route: 'Intramammary',
          frequency: 'OD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Milk out the affected quarter completely, disinfect teat orifice with spirit swab, infuse full syringe, and pinch teat base while massaging upward.'
        }
      ],
      supportiveCare: [
        'Trisodium Citrate oral powder: 30g to 50g daily in water for 5 days to restore normal alkaline pH (6.8) and milk citric acid buffer',
        'Serratiopeptidase + Meloxicam bolus (Mel-Flan / Serakind) 2 bolus BD orally to dissolve fibrinous clots in teat cistern',
        'Frequent hand stripping of infected quarter every 2 hours during daytime to evacuate bacterial toxins',
        'Cold water splashing on udder during acute phase; switch to warm magnesium sulfate fomentation only after heat subsides'
      ],
      contraindications: [
        'NEVER use hot water fomentation in acute hyperemic mastitis (accelerates inflammation and gangrene).',
        'DO NOT leave residual milk or antibiotics inside the teat canal without proper stripping.'
      ],
      desiNuskhe: [
        'घृतकुमारी व हल्दी लेप: 250g ताजे एलोवेरा का गूदा, 50g शुद्ध हल्दी पाउडर और 15g खाने वाला चूना (Lime) को थोड़ा पानी मिलाकर मिक्सी में पीसें (चूने से लेप लाल रंग का हो जाएगा)। इस लेप को थन पर दिन में 4-5 बार लगाएं।'
      ],
      preventionAndVaccination: [
        'Post-milking teat dipping in 0.5% Povidone-Iodine with 10% Glycerine immediately after each milking.',
        'Dry Cow Therapy (DCT): Infuse long-acting dry cow intramammary tube (e.g., Cepravin Dry Cow) at the time of drying off.'
      ]
    },
    {
      id: 'bovine-milk-fever-hypocalcaemia',
      name: 'Milk Fever (Hypocalcaemia / Parturient Paresis)',
      nameHi: 'दुग्ध ज्वर (प्रसवकालीन पक्षाघात / कैल्शियम की कमी)',
      etiology: 'Acute depression of ionized serum calcium (< 5.0 mg/dL) at or within 72 hours of calving',
      category: 'Metabolic',
      tempRange: { minF: 96.0, maxF: 100.5, normalF: 101.5 },
      cardinalSymptoms: [
        'SUBNORMAL TEMPERATURE (96-100°F); cold extremities, icy ears, and cold muzzle / शरीर व कानों का ठंडा पड़ना (बुखार नहीं, तापमान सामान्य से कम)',
        'Classic S-shaped lateral kinking of the neck with head turned back toward the flank / गर्दन का मुड़कर पेट की तरफ टिक जाना (S-आकार)',
        'Sternal recumbency progressing to lateral collapse with dull glazed eyes and dry muzzle / पशु का बैठ जाना और खड़े होने में पूर्ण असमर्थता',
        'Complete cessation of rumination, loss of anal reflex, ruminal bloat, and pupil dilation / पुतली फैलना, गोबर-पेशाब रुकना व हल्का अफारा',
        'Muscle fasciculations, head tremors, and staggering uncoordinated gait prior to recumbency / प्रारंभिक अवस्था में मांसपेशियों में कंपकंपी'
      ],
      differentialDiagnosis: [
        'Maternal Obstetrical Paralysis (Sciatic / Obturator nerve injury)',
        'Acute Toxic Mastitis (Coliform shock)',
        'Hypomagnesaemic Tetany (Grass Staggers)',
        'Acute Ketosis'
      ],
      firstLineDrugs: [
        {
          genericName: 'Calcium Borogluconate 25% with Magnesium & Phosphorus',
          brandExample: 'Mifex / Calborol / Mifecag (450 ml bottle)',
          doseMgPerKg: 1.0, // ml/kg equivalent (approx 450 ml total for 400kg cow)
          route: 'IV',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'CRITICAL: Warm bottle to body temperature. Infuse first 250 ml SLOWLY intravenous (over 15-20 mins) while monitoring heart rate; administer remaining 200 ml subcutaneously.'
        },
        {
          genericName: 'Ionic Oral Calcium Gel',
          brandExample: 'Calfomin Gel / Cal-Up Gel / Intacal Gel (300g)',
          doseMgPerKg: 0, // 1 tube orally
          route: 'Oral',
          frequency: 'BD',
          durationDays: 2,
          pregnancySafe: true,
          notes: 'Administer one tube 6 hours post-recovery to prevent rebound hypocalcemia. Animal MUST have swallow reflex.'
        }
      ],
      supportiveCare: [
        'Toldimphos Sodium (Tonophosphan 10 ml IV) to replenish concurrent hypophosphataemia',
        'Vitamin D3 (Cholecalciferol 10 Million IU IM) to stimulate intestinal calcium binding protein synthesis',
        'Prop animal into sternal recumbency using straw bales to avoid tympany and regurgitation',
        'Cover animal with warm blankets and massage legs vigorously'
      ],
      contraindications: [
        'LETHAL DANGER: NEVER infuse Calcium Borogluconate rapidly IV (induces ventricular fibrillation and immediate cardiac arrest). Stop infusion immediately if arrhythmias occur.',
        'DO NOT drench oral calcium liquids or gels if the cow is comatose or lacks swallowing reflex (fatal pulmonary aspiration).'
      ],
      desiNuskhe: [
        'गुड़ व अजवाइन सोंठ हलवा: गाय खड़े होने के बाद 500g पुराना गुड़, 50g सौंठ पाउडर, 50g अजवाइन और 100g देसी घी में भुना हुआ दलिया खिलाएं।'
      ],
      preventionAndVaccination: [
        'Negative Dietary Cation-Anion Difference (DCAD) diet with bio-available anionic salts 3 weeks prior to calving.',
        'Avoid high calcium legumes (alfalfa/berseem) during the late dry period; administer oral calcium bolus at calving.'
      ]
    },
    {
      id: 'bovine-ketosis-acetonaemia',
      name: 'Bovine Ketosis (Acetonemia)',
      nameHi: 'कीटोसिस (दुर्बलता रोग / मीठा पेशाब)',
      etiology: 'Negative energy balance leading to high lipolysis and accumulation of blood ketone bodies (BHBA, acetoacetate, acetone)',
      category: 'Metabolic',
      tempRange: { minF: 100.5, maxF: 102.0, normalF: 101.5 },
      cardinalSymptoms: [
        'Characteristic sweetish, sickly, pungent chloroform/acetone odor in breath, milk, and urine / सांस, दूध और पेशाब में एसीटोन (नेलपॉलिश जैसी) गंध',
        'Rapid, severe drop in milk production and precipitous loss of body weight / दूध में अचानक भारी गिरावट व पशु का तेजी से सूखना',
        'Selective anorexia: refuses concentrates and grain, eats only coarse roughage or dry hay / दाना-बांटा खाने से इनकार करना केवल सूखी घास खाना',
        'Firm, dry, mucus-coated feces ("horse-like" droppings) / सूखा, कड़ा, लीद जैसा गोबर',
        'Nervous form (in 15% cases): compulsive licking of objects, head pressing, circling, staggering, and bellowing / पागलों जैसा व्यवहार, खूंटा चाटना'
      ],
      differentialDiagnosis: [
        'Displaced Abomasum (LDA / RDA)',
        'Traumatic Reticuloperitonitis (TRP / Hardware disease)',
        'Hepatic Lipidosis (Fatty Liver Syndrome)',
        'Subacute Ruminal Acidosis (SARA)'
      ],
      firstLineDrugs: [
        {
          genericName: 'Dextrose Injection 20% or 50%',
          brandExample: 'Dexona D-25 / Dextrose 50% (500 ml)',
          doseMgPerKg: 500.0, // ml total volume
          route: 'IV',
          frequency: 'OD',
          durationDays: 2,
          pregnancySafe: true,
          notes: 'Infuse 500 ml to 1000 ml slow IV to provide immediate free blood glucose and shut down hepatic ketogenesis.'
        },
        {
          genericName: 'Propylene Glycol (1,2-Propanediol)',
          brandExample: 'Propyl-G / Ketocheck Liquid',
          doseMgPerKg: 0, // 250 ml to 300 ml oral dose
          route: 'Oral',
          frequency: 'BD',
          durationDays: 3,
          pregnancySafe: true,
          notes: 'Acts as potent gluconeogenic precursor absorbed directly across ruminal epithelium into liver.'
        },
        {
          genericName: 'Isoflupredone Acetate',
          brandExample: 'Predef 2X (2 mg/ml)',
          doseMgPerKg: 0.04, // 10-20 mg total
          route: 'IM',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: false,
          notes: 'Strong glucocorticoid that mobilizes amino acids for hepatic gluconeogenesis. CAUTION: Will induce abortion in pregnant cows.'
        }
      ],
      supportiveCare: [
        'Vitamin B-Complex containing Cyanocobalamin (Vit B12) 10 ml IM daily to stimulate metabolic propionate utilization',
        'Sodium Bicarbonate 100g orally daily to stabilize ruminal fluid pH',
        'Cobalt Sulfate 1g orally daily as cofactor for endogenous Vitamin B12 microbial synthesis',
        'Choline Chloride + Methionine feed additives for hepatoprotection and VLDL export'
      ],
      contraindications: [
        'DO NOT use Glucocorticoids (Isoflupredone/Dexamethasone) in pregnant animals.',
        'Avoid feeding poor quality moldy silage high in butyric acid.'
      ],
      desiNuskhe: [
        'गुड़ व मीठा सोडा पेय: 500g शुद्ध गुड़ और 50g मीठा सोडा (Sodium Bicarb) 2 लीटर गुनगुने पानी में घोलकर 4 दिन तक रोज सुबह-शाम पिलाएं।'
      ],
      preventionAndVaccination: [
        'Prevent overconditioning in dry period (target Body Condition Score BCS: 3.25 to 3.5 at calving).',
        'Incorporate rumen-protected bypass fat (100g/day) and Niacin (6g/day) in transition rations.'
      ]
    },
    {
      id: 'bovine-theileriosis',
      name: 'Bovine Theileriosis (Tropical Theileriosis)',
      nameHi: 'थाइलेरियासिस (टिक ज्वर / गिल्टी रोग)',
      etiology: 'Theileria annulata (transmitted by Hyalomma anatolicum ticks)',
      category: 'Protozoan/Tick-borne',
      tempRange: { minF: 104.0, maxF: 107.0, normalF: 101.5 },
      cardinalSymptoms: [
        'Persistent high undulating fever (104-107°F) unresponsive to standard antipyretics / लगातार तेज बुखार जो साधारण दवाओं से न उतरे',
        'Prominent bilateral swelling of superficial lymph nodes, especially prescapular / कंधे के आगे की गिल्टियों (लिम्फ नोड्स) में भारी सूजन',
        'Progressive marked anemia with pale to icteric (jaundice) mucous membranes / गंभीर खून की कमी व आंखों में पीलापन/सफेदी',
        'Petechial and ecchymotic hemorrhages on conjunctiva and third eyelid / आंख की झिल्ली पर खून के लाल धब्बे',
        'Terminal respiratory distress, pulmonary edema with froth from nostrils / अंतिम अवस्था में फेफड़ों में पानी भरना व मुंह से झाग'
      ],
      differentialDiagnosis: [
        'Bovine Babesiosis (Redwater)',
        'Anaplasmosis (Gall Sickness)',
        'Trypanosomiasis (Surra)',
        'Enzootic Bovine Leukosis'
      ],
      firstLineDrugs: [
        {
          genericName: 'Buparvaquone',
          brandExample: 'Butalex / Zubion / Zunex (50 mg/ml)',
          doseMgPerKg: 2.5, // 1 ml per 20 kg
          route: 'IM',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Specific curative drug. Inject deep intramuscularly in neck muscles. May repeat after 48-72 hours in severe relapsing cases.'
        },
        {
          genericName: 'Oxytetracycline Long Acting (LA)',
          brandExample: 'Terramycin LA (200 mg/ml)',
          doseMgPerKg: 20.0,
          route: 'IM',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: false,
          notes: 'Effective against intra-erythrocytic piroplasms if administered early during incubation/schizogony.'
        }
      ],
      supportiveCare: [
        'Iron Dextran (Ferritas 10 ml deep IM alternate days) to stimulate active erythropoiesis',
        'Furosemide (Lasix 5-10 ml IM) only if acute pulmonary edema with frothing is detected',
        'Whole blood transfusion (3 to 4 Litres from healthy donor) if Packed Cell Volume (PCV) drops below 12%',
        'Liver Extract with Vitamin B12 (Livogen / Belamyl 10 ml IM alternate days)'
      ],
      contraindications: [
        'NEVER force animal to walk or exercise under direct sunlight (causes acute anoxic heart failure).',
        'DO NOT use live attenuated vaccine during active clinical disease.'
      ],
      desiNuskhe: [
        'पुनर्नवा व गिलोय लिवर काढ़ा: 50g पुनर्नवा पंचांग और 50g ताजा गिलोय कूटकर 1 लीटर पानी में उबालें। 250ml रहने पर छानकर 50g मिश्री संग दिन में दो बार पिलाएं।'
      ],
      preventionAndVaccination: [
        'Attenuated cell culture vaccine (Rakshavac-T): 3 ml SC once in life for crossbred calves above 2 months.',
        'Rigid tick control: Flumethrin 1% pour-on (Pour-On Bayticol) along spine or Deltamethrin sprays every 3 weeks.'
      ]
    },
    {
      id: 'bovine-babesiosis-redwater',
      name: 'Bovine Babesiosis (Redwater Fever)',
      nameHi: 'बबेसियोसिस (लाल पेशाब / टिक फीवर)',
      etiology: 'Babesia bigemina / Babesia bovis (transmitted by Rhipicephalus microplus ticks)',
      category: 'Protozoan/Tick-borne',
      tempRange: { minF: 104.5, maxF: 107.5, normalF: 101.5 },
      cardinalSymptoms: [
        'Passing of dark burgundy, reddish-brown, or coffee-colored urine (Hemoglobinuria) / गहरे लाल, कत्थई या कॉफी जैसे रंग का पेशाब',
        'Urine produces persistent thick reddish froth upon voiding / पेशाब करने पर झाग बनना जो काफी देर तक न टूटे',
        'Sudden, soaring body temperature (105-107.5°F) with rapid heart rate / अचानक 107 डिग्री तक तेज बुखार व दिल की तेज धड़कन',
        'Severe intravascular hemolysis: mucous membranes turn porcelain white, then deeply jaundiced / आंखों व मसूड़ों का सफेद होकर पीला पड़ जाना',
        'Pipe-stem explosive diarrhea in early phase, followed by dry, hard, bile-stained feces / प्रारंभिक पतले दस्त के बाद कड़ा सूखा गोबर'
      ],
      differentialDiagnosis: [
        'Post-Parturient Hemoglobinuria (PPH - Hypophosphatemia)',
        'Bacillary Hemoglobinuria (Red Water - Clostridium haemolyticum)',
        'Leptospirosis',
        'Chronic Copper Poisoning'
      ],
      firstLineDrugs: [
        {
          genericName: 'Diminazene Aceturate',
          brandExample: 'Berenil / Nilzane / Babenil (70 mg/ml)',
          doseMgPerKg: 3.5, // 3.5 to 5.0 mg/kg deep IM
          route: 'IM',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Specific drug of choice. Dissolve granules fresh. Strict dose calculation required to avoid neurotoxicity.'
        },
        {
          genericName: 'Imidocarb Dipropionate',
          brandExample: 'Imizol (120 mg/ml)',
          doseMgPerKg: 1.2,
          route: 'SC',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Single subcutaneous dose clears piroplasms and provides chemoprophylaxis for 4 weeks.'
        }
      ],
      supportiveCare: [
        'Dextrose 5% or DNS (2 to 3 Litres slow IV) to promote renal perfusion and prevent acute tubular necrosis from free hemoglobin',
        'Phosphorus injection (Sodium Acid Phosphate / Tonophosphan 15 ml IV)',
        'Hematinics: Iron Dextran 10 ml IM and Vitamin B12 to drive reticulocytosis',
        'Blood transfusion if PCV is critically below 10%'
      ],
      contraindications: [
        'OVERDOSE WARNING: Overdosing Diminazene causes severe ataxia, convulsions, and fatal brain stem necrosis. Always compute dose by exact body weight.',
        'DO NOT use heavy diuretics in severely dehydrated animals with hemoglobinuria.'
      ],
      desiNuskhe: [
        'गन्ना रस व धनिया काढ़ा: 2 लीटर ताजे गन्ने का रस अथवा 100g पिसा हुआ सूखा धनिया 500g मिश्री के साथ 2 लीटर ठंडे पानी में घोलकर पिलाएं (गुर्दे को साफ रखता है)।'
      ],
      preventionAndVaccination: [
        'Strategic Acaricide dipping/spraying: Amitraz 12.5% EC (2 ml/L) or Ivermectin SC at 28-day intervals during high tick burden months.',
        'Maintain endemic stability in indigenous breeds; quarantine crossbred stock entering infected pastures.'
      ]
    },
    {
      id: 'bovine-ruminal-tympany-bloat',
      name: 'Ruminal Tympany (Bloat / Gaseous & Frothy)',
      nameHi: 'अफारा (आध्मान / पेट फूलना)',
      etiology: 'Frothy bloat (legume pastures, barseem, alfalfa) or Free-gas bloat (esophageal obstruction/choke, vagal nerve dysfunction)',
      category: 'Digestive',
      tempRange: { minF: 101.0, maxF: 102.5, normalF: 101.5 },
      cardinalSymptoms: [
        'Severe, visible ballooning and distension of the left paralumbar fossa / बाईं कोख का गुब्बारे की तरह फूल जाना',
        'Tense, tight drum-like (tympanic) resonance upon percussion of the left flank / बाईं कोख को थपथपाने पर ढोल जैसी आवाज',
        'Dyspnea with mouth-breathing, extended head, and protruding tongue / सांस लेने में भयंकर कष्ट, मुंह खोलकर जीभ बाहर निकालना',
        'Extreme discomfort: kicks at belly, treads with hind feet, frequently lies down and gets up / पेट पर लात मारना, बेचैनी व उठना-बैठना',
        'Cyanotic (bluish-purple) conjunctiva; risk of fatal asphyxiation from pressure on diaphragm / दम घुटने से आंखें नीली पड़ना व मौत का खतरा'
      ],
      differentialDiagnosis: [
        'Esophageal Choke / Obstruction (Potato, Turnip, Plastic foreign body)',
        'Traumatic Reticuloperitonitis (TRP)',
        'Hypocalcemia (Milk Fever ruminal stasis)',
        'Abomasal Torsion'
      ],
      firstLineDrugs: [
        {
          genericName: 'Simethicone + Dill Oil',
          brandExample: 'Bloatosil / Tympol / Afanil (100 ml bottle)',
          doseMgPerKg: 0, // 100 ml single dose
          route: 'Oral',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Lowers surface tension of bubbles in frothy bloat, coalescing froth into free gas for normal eructation.'
        },
        {
          genericName: 'Oil of Turpentine (Pure Medicinal)',
          brandExample: 'Turpentine Oil B.P.',
          doseMgPerKg: 0, // 30 ml to 60 ml mixed with 500 ml vegetable oil
          route: 'Oral',
          frequency: 'OD',
          durationDays: 1,
          pregnancySafe: true,
          notes: 'Direct anti-fermentation agent and carminative. Mix thoroughly in 500 ml Mustard or Linseed oil.'
        }
      ],
      supportiveCare: [
        'Passage of wide-bore Rumen Stomach Tube through mouth gag to immediately evacuate free gas pocket',
        'Emergency trocharization: Insert Trocar and Cannula or 14-gauge needle at the center of left paralumbar fossa if animal is suffocating',
        'Tie a wooden bit / stick crosswise in the mouth (gag) to stimulate continuous chewing and salivation (saliva has natural anti-foaming mucins)',
        'Keep animal standing with front quarters elevated on an inclined mound or ramp'
      ],
      contraindications: [
        'FATAL DROWNING HAZARD: NEVER forcefully drench oils or bloat mixtures while holding the cow’s head high in the air (causes fatal aspiration into trachea/lungs).',
        'DO NOT administer ruminal stimulants (like Neostigmine) if complete physical esophageal choke is suspected.'
      ],
      desiNuskhe: [
        'सरसों तेल, हींग व काला नमक: 250ml शुद्ध सरसों का तेल, 15g भुनी असली हींग, 50g काला नमक और 25g सोंठ पाउडर मिलाकर गुनगुना करके धीरे-धीरे पिलाएं।'
      ],
      preventionAndVaccination: [
        'Never turn hungry cattle directly onto wet, lush legume pastures (barseem, alfalfa) heavy with morning dew.',
        'Feed dry roughage or wheat straw (2-3 kg) before feeding succulent green fodder or concentrate mash.'
      ]
    }
  ];

  // 3. ATTACH REGISTRY TO NAMESPACE
  window.VetcareApp.ClinicalData.Bovine = BOVINE_DISEASE_REGISTRY;

  // 4. HELPER SEARCH & CLINICAL QUERY METHODS
  var BovineEngine = {
    getAllDiseases: function () {
      return BOVINE_DISEASE_REGISTRY.slice();
    },

    getDiseaseById: function (id) {
      if (!id || typeof id !== 'string') return null;
      var cleanId = id.trim().toLowerCase();
      for (var i = 0; i < BOVINE_DISEASE_REGISTRY.length; i++) {
        if (BOVINE_DISEASE_REGISTRY[i].id.toLowerCase() === cleanId) {
          return BOVINE_DISEASE_REGISTRY[i];
        }
      }
      return null;
    },

    searchDiseasesBySymptom: function (symptomQuery) {
      if (!symptomQuery || typeof symptomQuery !== 'string') return [];
      var query = symptomQuery.trim().toLowerCase();

      return BOVINE_DISEASE_REGISTRY.filter(function (disease) {
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

      return BOVINE_DISEASE_REGISTRY.filter(function (disease) {
        return disease.category.toLowerCase() === cleanCat;
      });
    },

    getPregnancyContraindicatedDrugs: function (diseaseId) {
      var disease = BovineEngine.getDiseaseById(diseaseId);
      if (!disease) return [];

      return disease.firstLineDrugs.filter(function (drug) {
        return drug.pregnancySafe === false;
      });
    }
  };

  // Expose Helper Engine
  window.VetcareApp.ClinicalData.BovineHelper = BovineEngine;

  console.log(
    '[Vetcare ClinicalData] Bovine Clinical Database Loaded: ' +
    BOVINE_DISEASE_REGISTRY.length +
    ' validated dossiers (2026 Production).'
  );

})(window);
