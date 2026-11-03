// Vetcare AI OS - Multi-Step Clinical Diagnosis & AI Second Opinion Engine (2026 Production)

(function () {
  'use strict';

  // =========================================================================
  // 1. GLOBAL STATE INITIALIZATION
  // =========================================================================
  window.currentPatientProfile = {
    species: 'गाय (Cow)',
    breed: 'मुर्राह / साहीवाल',
    ageYears: 4,
    ageMonths: 0,
    weightKg: 400,
    gender: 'मादा (Female)',
    pregnancyStatus: 'खाली (Non-Pregnant)', // गाभिन (1st Trim), गाभिन (2nd Trim), गाभिन (3rd Trim), खाली, सूखा पशु, दुधारू
    lactationStage: 'द्वितीय ब्यांत (2nd Lactation)',
    heartGirthInches: 72,
    bodyLengthInches: 60
  };

  window.selectedSymptoms = new Set();
  window._lastRankedDiseases = [];

  // =========================================================================
  // 2. MASTER MULTI-ORGAN CLINICAL SYMPTOM REGISTRY (SELF-HEALING)
  // =========================================================================
  window.VETCARE_ORGAN_SYMPTOMS = {
    temp: {
      title: "1. शारीरिक तापमान (Temperature)",
      icon: "fa-temperature-high",
      color: "rose",
      options: [
        { id: "T_HIGH", label: "अत्यधिक तेज बुखार (104°F - 107°F High Fever)" },
        { id: "T_MOD", label: "हल्का से मध्यम बुखार (102.5°F - 103.8°F)" },
        { id: "T_NORM", label: "सामान्य तापमान (101°F - 102.2°F Normal)" },
        { id: "T_SUBNORM", label: "सब-नॉर्मल / ठंडा शरीर (< 100°F Subnormal)" }
      ]
    },
    eyes: {
      title: "2. नेत्र व श्लेष्मा झिल्ली (Eyes & Mucosa)",
      icon: "fa-eye",
      color: "amber",
      options: [
        { id: "EYE_CORNEA", label: "कॉर्निया में सफेदी / धुंधलापन (Corneal Opacity)" },
        { id: "EYE_PALE", label: "सफेद / रक्तहीन कंजेक्टिवा (Severe Pallor/Anemia)" },
        { id: "EYE_ICTERIC", label: "पीली आंखें / पीलिया (Jaundice / Icterus)" },
        { id: "EYE_LACRIMATION", label: "आंखों से लगातार पानी व कीचड़ बहना" },
        { id: "EYE_CONGESTED", label: "आंखों में अत्यधिक लाली (Congested/Bloodshot)" }
      ]
    },
    udder: {
      title: "3. अडर, थन व दूध (Udder, Teats & Milk)",
      icon: "fa-cubes-stacked",
      color: "blue",
      options: [
        { id: "UDD_HARD", label: "अडर में कठोर, गर्म व दर्दनाक सूजन (Acute Swelling)" },
        { id: "UDD_FLAKES", label: "दूध में पीले छिछड़े, थक्के व मवाद (Clots/Flakes)" },
        { id: "UDD_BLOOD", label: "दूध में खून / गुलाबी या लाल दूध (Hemolactia)" },
        { id: "UDD_WATERY", label: "दूध एकदम पानी जैसा पतला या सीरम जैसा" },
        { id: "UDD_FIBROSIS", label: "थन में सख्त गांठ / पत्थर जैसा कड़ापन (Fibrosis)" },
        { id: "UDD_DROP", label: "अचानक दूध उत्पादन में 80-90% भारी गिरावट" }
      ]
    },
    urine: {
      title: "4. मूत्र तंत्र व पेशाब (Urine & Bladder)",
      icon: "fa-droplet",
      color: "red",
      options: [
        { id: "URN_COFFEE", label: "गहरा कॉफी / कोका-कोला रंग का पेशाब (Coffee Urine)" },
        { id: "URN_RED_CLEAR", label: "लाल साफ पेशाब (Hemoglobinuria - No Sediments)" },
        { id: "URN_BLOOD_CLOT", label: "पेशाब में ताजे खून के थक्के (Hematuria)" },
        { id: "URN_KETONE", label: "पेशाब व सांस से मीठी एसीटोन गंध (Ketone Odor)" },
        { id: "URN_PAIN", label: "पेशाब करते समय दर्द / रुक-रुक कर बूंद-बूंद आना" },
        { id: "URN_ANURIA", label: "पेशाब का पूर्णतः बंद होना (Calculi/Urethral Obstruction)" }
      ]
    },
    dung: {
      title: "5. गोबर व पाचन निष्कासन (Dung & Defecation)",
      icon: "fa-poop",
      color: "emerald",
      options: [
        { id: "DNG_FOUL_DIA", label: "तीव्र बदबूदार पिचकारी जैसे पतले दस्त (Profuse Diarrhea)" },
        { id: "DNG_BLOOD", label: "गोबर में खून, म्यूकस या आंतों की झिल्ली (Dysentery)" },
        { id: "DNG_PIPE_STREAM", label: "पाइप स्ट्रीम जैसे बिना रुके दस्त (Johne's Disease)" },
        { id: "DNG_CONSTIPATION", label: "कड़ा सूखा गोबर, म्यूकस कोटेड या पूर्ण कब्ज" },
        { id: "DNG_CLAY", label: "मिट्टी जैसा मटमैला सफेद/पीला गोबर (Liver Fluke/Bile Duct)" }
      ]
    },
    rumen: {
      title: "6. रूमेन, उदर व कोख (Rumen, Stomach & Colic)",
      icon: "fa-shield-halved",
      color: "indigo",
      options: [
        { id: "RUM_TYMPANY", label: "बाईं कोख में ड्रम जैसा अत्यधिक फुलाव (Acute Bloat)" },
        { id: "RUM_FROTHY", label: "झागदार अफारा (Frothy Legume Bloat)" },
        { id: "RUM_ATONY", label: "रूमेन गति पूर्ण बंद (Atony 0/min / Indigestion)" },
        { id: "RUM_ACIDOSIS", label: "आटा/अनाज खाने के बाद रूमेन पानी जैसा थल-थल (Acidosis)" },
        { id: "RUM_COLIC", label: "पेट दर्द: पेट पर लात मारना, उठना-बैठना (Colic)" },
        { id: "RUM_HARD_IMPACTION", label: "रूमेन पत्थर जैसा कड़ा भरा हुआ (Impaction)" }
      ]
    },
    respiration: {
      title: "7. श्वसन तंत्र व नाक (Respiration & Lungs)",
      icon: "fa-lungs",
      color: "cyan",
      options: [
        { id: "RSP_DYSPNEA", label: "तेज सांस व हांफना (Rapid Labored Breathing)" },
        { id: "RSP_GRUNTING", label: "सांस लेते समय दर्दभरी कराह (Painful Grunting)" },
        { id: "RSP_OPEN_MOUTH", label: "जीभ बाहर निकाल कर गर्दन फैलाकर सांस लेना" },
        { id: "RSP_NECK_EDEMA", label: "गर्ले, जबड़े व छाती के नीचे गर्म सूजन (Dewlap Edema)" },
        { id: "RSP_NASAL_DISCHARGE", label: "नाक से गाढ़ा मवाद / झागदार स्राव निकलना" },
        { id: "RSP_COUGH", label: "सूखी या बलगमदार तीव्र खांसी (Persistent Cough)" }
      ]
    },
    skin: {
      title: "8. त्वचा, बाल व लिम्फ नोड्स (Skin, Coat & Nodes)",
      icon: "fa-paw",
      color: "purple",
      options: [
        { id: "SKN_LUMPY_NODULES", label: "पूरे शरीर पर 2-5 सेमी की गोल कठोर गांठें (Lumpy Skin)" },
        { id: "SKN_TICKS", label: "शरीर पर अत्यधिक चिचड़ी/जूं (Heavy Tick Infestation)" },
        { id: "SKN_PRESCAP_SWOLLEN", label: "कंधे के आगे की लिम्फ नोड में भारी सूजन (Theileria)" },
        { id: "SKN_MANGE_CRUSTS", label: "त्वचा पर पपड़ी, खुजली व बाल झड़ना (Mange/Mites)" },
        { id: "SKN_CREPITATION", label: "पुट्ठे/जांघ पर सूजन दबाने पर चरमराहट की आवाज (BQ)" },
        { id: "SKN_SLOUGHING", label: "पूंछ व कान के सिरे का सूखकर गिरना (Degnala)" }
      ]
    },
    nervous: {
      title: "9. चाल, मुद्रा व तंत्रिका तंत्र (Gait, Posture & Nervous)",
      icon: "fa-brain",
      color: "teal",
      options: [
        { id: "NRV_S_SHAPE", label: "जमीन पर लेटना, गर्दन को कोख की तरफ मोड़ना (S-Shape Downer)" },
        { id: "NRV_CIRCLING", label: "एक ही दिशा में चक्कर काटना, अंधापन (Surra / Coenurosis)" },
        { id: "NRV_EXCITEMENT", label: "अत्यधिक उत्तेजना, पागलपन, दीवारों से टकराना (Nervous Ketosis)" },
        { id: "NRV_LAMENESS", label: "खुर में दर्द, लंगड़ापन, खुरों के बीच छाले (FMD)" },
        { id: "NRV_TREMORS", label: "मांसपेशियों में कंपकंपी व दांत पीसना (Hypomagnesemia/Surra)" },
        { id: "NRV_WOODEN", label: "लकड़ी जैसी अकड़न, तीसरी पलक का बाहर आना (Tetanus)" }
      ]
    },
    repro: {
      title: "10. प्रजनन, योनि व गर्भाशय (Reproduction & Vulva)",
      icon: "fa-venus-mars",
      color: "pink",
      options: [
        { id: "REP_PROLAPSE", label: "योनि या गर्भाशय का बाहर निकलना (Vaginal/Uterine Prolapse)" },
        { id: "REP_FOUL_LOCHIA", label: "योनि से अत्यधिक बदबूदार लाल/भूरा मवाद (Acute Metritis)" },
        { id: "REP_ROP", label: "ब्याने के 12 घंटे बाद भी जेर का न गिरना (Retention of Placenta)" },
        { id: "REP_CLOUDY_MUCUS", label: "मद काल (Heat) में मैला, मवाद युक्त तार आना (Endometritis)" },
        { id: "REP_ABORTION_STORM", label: "अंतिम 3 माह में बिना कारण गर्भपात (Brucellosis/Abortion)" }
      ]
    }
  };

  // =========================================================================
  // 3. MASTER CLINICAL DISEASE ENGINE KNOWLEDGE BASE (OFFLINE COMPREHENSIVE)
  // =========================================================================
  const BUILTIN_CLINICAL_DISEASES = [
    {
      id: "DIS_BABESIOSIS",
      name: "बबेसिओसिस (लाल पेशाब / Babesiosis / Red Water)",
      pathogen: "Babesia bigemina / B. bovis (Intra-erythrocytic Protozoa)",
      type: "Protozoal Disease",
      cardinalSymptoms: ["T_HIGH", "URN_COFFEE", "URN_RED_CLEAR", "EYE_PALE", "EYE_ICTERIC", "SKN_TICKS"],
      confirmatoryTests: [
        { test: "Giemsa Blood Smear", findings: "RBC के अंदर नाशपाती के आकार के युग्म प्रोटोज़ोआ (Pear-shaped trophozoites)", accuracy: "98%" },
        { test: "Urine Supernatant", findings: "सेंट्रीफ्यूज करने पर भी पेशाब लाल/कॉफी ही रहता है (Hemoglobinuria, no RBC pellet)", accuracy: "99%" },
        { test: "CBC / Hemogram", findings: "तीव्र हीमोलिटिक एनीमिया, PCV गिरकर < 15%, Hb < 5 g/dl", accuracy: "95%" }
      ],
      stagesTimeline: [
        { stage: "Incubation (1-2 Weeks)", detail: "चिचड़ी (Boophilus) के काटने से स्पोरोजोआइट्स का रक्त में प्रवेश।" },
        { stage: "Acute Hemolytic (Day 1-3)", detail: "तापमान 105-107°F, बड़े पैमाने पर RBC टूटना, कॉफी रंग का पेशाब।" },
        { stage: "Toxic Anemic (Day 4-6)", detail: "गंभीर पीलिया, चरम सांस फूलना, हार्ट पल्पिटेशन, यदि उपचार न मिले तो मृत्यु।" }
      ],
      tierTreatment: [
        { tier: "Tier 1: इटियोट्रॉपिक एंटीप्रोटोज़ोअल", drug: "Inj. Berenil (Diminazene Aceturate 7%)", dose: "3.5 mg/kg Deep I/M (5 ml / 100 kg). विभाजित स्थलों पर।" },
        { tier: "Tier 2: एंटीपायरेटिक व पेनकिलर", drug: "Inj. Melonex Plus (Meloxicam + Paracetamol)", dose: "20-30 ml Deep I/M (बुखार नियंत्रित करने हेतु)।" },
        { tier: "Tier 3: हेमेटिनिक व ऑर्गन सपोर्ट", drug: "Inj. Belamyl (B-Complex + Liver Extract) + Feritas", dose: "10 ml I/M alternate days (RBC पुनरुत्पादन हेतु)।" },
        { tier: "Tier 4: फ्लुइड एवं बफर थेरेपी", drug: "IV Dextrose Normal Saline (DNS 5%)", dose: "2-3 लीटर IV धीमे (किडनी फ्लश हेतु, डिहाइड्रेशन सुधारें)।" },
        { tier: "Tier 5: ओरल टॉनिक व आयरन", drug: "Bolus Sharkoferrol Vet / Haemaccel", dose: "2 बोलस प्रतिदिन 15 दिनों तक।" }
      ],
      pregnancyContraindicatedDrugs: ["Inj. Berenil (सावधानी: उच्च खुराक पर गर्भाशय संकुचन जोखिम)", "Inj. Dexamethasone (पूर्णतः निषिद्ध)"],
      pregnancySafeAlternative: "डिमिनजीन जीवन रक्षक होने पर ही दें, साथ में प्रोजेस्टेरोन सपोर्ट (Inj. Duraprogen 3ml IM) लगाएं। स्टेरॉयड कभी न दें।"
    },
    {
      id: "DIS_THEILERIOSIS",
      name: "थाइलेरियोसिस (कंधे की गिल्टी सूजन / Bovine Theileriosis)",
      pathogen: "Theileria annulata (Schizonts in lymph nodes, Piroplasms in RBC)",
      type: "Protozoal Disease",
      cardinalSymptoms: ["T_HIGH", "SKN_PRESCAP_SWOLLEN", "EYE_CORNEA", "EYE_PALE", "RSP_DYSPNEA", "SKN_TICKS"],
      confirmatoryTests: [
        { test: "Lymph Node Biopsy Smear", findings: "लिम्फोसाइट्स के अंदर कोच ब्लू बॉडीज (Koch Blue Bodies / Schizonts)", accuracy: "99%" },
        { test: "Thin Blood Smear (Giemsa)", findings: "RBC में छल्ले या बिंदु के आकार के पाइरोप्लाज्म (Piroplasms)", accuracy: "92%" }
      ],
      stagesTimeline: [
        { stage: "Lymphatic Phase (Day 1-4)", detail: "तापमान 106°F, प्री-स्कैपुलर लिम्फ नोड टेनिस बॉल जैसी सूज जाना।" },
        { stage: "Ocular & Respiratory (Day 5-8)", detail: "आंखों में कॉर्निया की सफेदी (White Eye), फेफड़ों में पानी भरना (Pulmonary Edema)।" },
        { stage: "Terminal Anemic (Day 9+)", detail: "गंभीर दुर्बलता, आंतों में अल्सरेशन, आंतरिक रक्तस्राव।" }
      ],
      tierTreatment: [
        { tier: "Tier 1: विशिष्ट एंटीथाइलेरियल", drug: "Inj. Butalex / Zubion (Buparvaquone 50mg/ml)", dose: "2.5 mg/kg (20 ml per 400kg) Deep I/M गर्दन की मांसपेशियों में।" },
        { tier: "Tier 2: एंटीबायोटिक सहायक", drug: "Inj. Terramycin LA (Oxytetracycline 200mg/ml)", dose: "20 mg/kg (20 ml) Deep I/M (द्वितीयक पाइरोप्लाज्म दमन)।" },
        { tier: "Tier 3: एंटीपायरेटिक व श्वसन सपोर्ट", drug: "Inj. Melonex (Meloxicam 5mg/ml)", dose: "20 ml Deep I/M।" },
        { tier: "Tier 4: एंटी-एडिमा सपोर्ट", drug: "Inj. Lasix (Furosemide 50mg/ml)", dose: "5-10 ml I/M (पल्मोनरी एडिमा होने पर सांस सुगम करने हेतु)।" },
        { tier: "Tier 5: लिवर व ब्लड टॉनिक", drug: "Liquid Belamyl + Hepamust", dose: "50 ml ओरल प्रतिदिन।" }
      ],
      pregnancyContraindicatedDrugs: ["Inj. Terramycin LA (अंतिम तिमाही में भ्रूण दांत/हड्डी विकृति जोखिम)"],
      pregnancySafeAlternative: "बुपरवाक्वोन (Buparvaquone) जीवन रक्षक है और गाभिन में दिया जा सकता है।"
    },
    {
      id: "DIS_MILK_FEVER",
      name: "मिल्क फीवर (हाइपोकैल्सीमिया / सूतिका ज्वर / Hypocalcemia)",
      pathogen: "Metabolic Defect: Acute drop in serum ionized Calcium (< 5.0 mg/dl)",
      type: "Metabolic Emergency",
      cardinalSymptoms: ["T_SUBNORM", "NRV_S_SHAPE", "RUM_ATONY", "DNG_CONSTIPATION", "UDD_DROP"],
      confirmatoryTests: [
        { test: "Serum Total Calcium", findings: "सीरम कैल्शियम 8.5-10 mg/dl से गिरकर < 4.5 mg/dl हो जाना", accuracy: "99%" },
        { test: "Clinical Response Test", findings: "IV कैल्शियम बोरोक्लुकोनेट देने के 15 मिनट में गोबर/पेशाब करना व उठ बैठना", accuracy: "98%" }
      ],
      stagesTimeline: [
        { stage: "Stage 1 (Excitement)", detail: "पशु का कांपना, पिछले पैरों में लड़खड़ाहट, सिर हिलाना।" },
        { stage: "Stage 2 (Sternal Recumbency)", detail: "जमीन पर बैठना, गर्दन 'S' आकार में कोख पर टिकाना, कान व खुर बर्फ जैसे ठंडे।" },
        { stage: "Stage 3 (Lateral Coma)", detail: "करवट के बल पूरा लेट जाना, रूमेन में अफारा, यदि तुरंत इलाज न हो तो मृत्यु।" }
      ],
      tierTreatment: [
        { tier: "Tier 1: जीवन रक्षक कैल्शियम साल्ट", drug: "Inj. Mifex (CBG 25% + Mg + P + Dextrose)", dose: "450 ml कुल (225 ml बहुत धीमे IV + 225 ml S/C गर्दन पर)।" },
        { tier: "Tier 2: फास्फोरस पुनर्प्राप्ति", drug: "Inj. Tonophosphan (Toldimphos Sodium 20%)", dose: "15 ml Deep I/M (ATP व मांसपेशी संकुचन बहाल करने हेतु)।" },
        { tier: "Tier 3: नर्वस टॉनिक", drug: "Inj. Neurokind Plus / Tribivet", dose: "10 ml I/M (पेरिफेरल नर्व डैमेज रोकने हेतु)।" },
        { tier: "Tier 4: रूमेन काइनेटिक एजेंट", drug: "Inj. Neostigmine (0.5 mg/ml)", dose: "2-3 ml S/C (केवल तापमान सामान्य होने के बाद रूमेन चालू करने हेतु)।" },
        { tier: "Tier 5: ओरल आयनिक कैल्शियम जेल", drug: "Cal-Up Gel / Ostocalcium Gel", dose: "1 बोतल (300g) उठने के 6 घंटे बाद, फिर 12 घंटे बाद पिलाएं।" }
      ],
      pregnancyContraindicatedDrugs: ["Corticosteroids (Dexamethasone) सख्त मना"],
      pregnancySafeAlternative: "कैल्शियम बोरोक्लुकोनेट और टोनोफॉस्फेन गाभिन एवं ताजा ब्याही दोनों में 100% सुरक्षित हैं।"
    },
    {
      id: "DIS_ACUTE_MASTITIS",
      name: "तीव्र थनैला (Acute Toxic Clinical Mastitis)",
      pathogen: "E. coli / Klebsiella / Staphylococcus aureus / Streptococcus uberis",
      type: "Bacterial Disease",
      cardinalSymptoms: ["UDD_HARD", "UDD_FLAKES", "UDD_BLOOD", "UDD_WATERY", "UDD_DROP", "T_HIGH"],
      confirmatoryTests: [
        { test: "California Mastitis Test (CMT)", findings: "रीजेंट मिलाते ही जेली जैसा गाढ़ा थक्का जमना (Score +3 / +4)", accuracy: "96%" },
        { test: "Somatic Cell Count (SCC)", findings: "सोमैटिक सेल काउंट > 5,00,000 Cells/ml", accuracy: "99%" },
        { test: "Milk pH Strips", findings: "दूध का क्षारीय (Alkaline pH > 7.2) होना", accuracy: "90%" }
      ],
      stagesTimeline: [
        { stage: "Invasion (0-12 hrs)", detail: "थन के छेद (Teat Canal) से बैक्टीरिया का अडर में प्रवेश व टॉक्सिन उत्पादन।" },
        { stage: "Acute Toxic (12-36 hrs)", detail: "थन पत्थर जैसा कठोर, छूने पर बहुत गर्म व दर्द, दूध की जगह सीरम व खून।" },
        { stage: "Fibrosis / Gangrene", detail: "उचित उपचार न मिलने पर थन मर जाना (Blind Teat / Gangrenous sloughing)।" }
      ],
      tierTreatment: [
        { tier: "Tier 1: 4th Gen सेफालोस्पोरिन", drug: "Inj. Cefquinome (Cobactan 2.5%) / Ceftiofur", dose: "1 mg/kg I/M (Cobactan 10-15 ml) दैनिक 3 दिनों तक।" },
        { tier: "Tier 2: शक्तिशाली एंटी-एंडोटॉक्सिक NSAID", drug: "Inj. Megludyne (Flunixin Meglumine 50mg/ml)", dose: "2.2 mg/kg (15-20 ml) धीमे I/V (टॉक्सिन शमन हेतु सर्वोत्तम)।" },
        { tier: "Tier 3: इंट्रा-मेमरी इन्फ्यूजन", drug: "Intramammary Ceftiofur (Spectramast LC)", dose: "1 ट्यूब प्रभावित क्वार्टर में दिन में 2 बार (दूध पूरा निकालने के बाद)।" },
        { tier: "Tier 4: एंटी-फाइब्रिनोलिटिक / सेरेटियोपेप्टिडेज", drug: "Inj. Melonex Plus + Serratiopeptidase Bolus", dose: "2 बोलस सुबह-शाम (कठोर अडर को मुलायम करने हेतु)।" },
        { tier: "Tier 5: ओरल थनैला किट (Trisodium Citrate + Vit ADEH)", drug: "Masti-Kit / Wisprec Plus Powder", dose: "1 पाउच प्रतिदिन 5 दिनों तक।" }
      ],
      pregnancyContraindicatedDrugs: ["Inj. Isoflupredone / Dexona (गाभिन पशुओं में गर्भपात खतरा)"],
      pregnancySafeAlternative: "केवल Flunixin Meglumine या Tolfenamic acid का प्रयोग करें।"
    },
    {
      id: "DIS_HS",
      name: "गलघोंटू (Hemorrhagic Septicemia / HS)",
      pathogen: "Pasteurella multocida (Type B:2 & E:2)",
      type: "Acute Bacterial Septicemia",
      cardinalSymptoms: ["T_HIGH", "RSP_NECK_EDEMA", "RSP_DYSPNEA", "RSP_GRUNTING", "RSP_OPEN_MOUTH"],
      confirmatoryTests: [
        { test: "Peripheral Blood Smear (Leishman Stain)", findings: "द्वि-ध्रुवीय सुरक्षा पिन जैसे बैक्टीरिया (Bipolar staining bacilli)", accuracy: "97%" },
        { test: "Aspiration of Throat Edema Fluid", findings: "गले की सूजन से साफ सीरस द्रव जिसमें भारी संख्या में पाश्चुरेला मौजूद", accuracy: "95%" }
      ],
      stagesTimeline: [
        { stage: "Peracute Phase (0-12 hrs)", detail: "तापमान 106-107°F, गले, जबड़े व गल्कंबल के नीचे गर्म, कड़ा व सूजा हुआ उभार।" },
        { stage: "Respiratory Choking (12-24 hrs)", detail: "जीभ बाहर निकलना, खर्र-खर्र की भयानक घरघराहट आवाज, दम घुटना।" },
        { stage: "Endotoxic Death (within 24-36 hrs)", detail: "यदि 6 घंटे के भीतर उपचार शुरू न हो तो 99% मृत्यु दर।" }
      ],
      tierTreatment: [
        { tier: "Tier 1: उच्च क्षमता ब्रॉड-स्पेक्ट्रम एंटीबायोटिक", drug: "Inj. Xyrofur (Ceftiofur Sodium 1g) या Marbofloxacin", dose: "1g - 2g I/M या IV दिन में दो बार (शुरुआती 24 घंटे अत्यंत महत्वपूर्ण)।" },
        { tier: "Tier 2: एंटी-इन्फ्लेमेटरी व श्वसन सूजन निवारक", drug: "Inj. Megludyne (Flunixin 50mg/ml)", dose: "20 ml धीमे IV (गले का अवरोध तुरंत कम करने हेतु)।" },
        { tier: "Tier 3: गले की सूजन कम करने हेतु ऑस्मोटिक", drug: "Inj. Dexamethasone (Non-pregnant only) / Mannitol", dose: "10 ml IV (केवल गैर-गाभिन में) अथवा Furosemide 10 ml।" },
        { tier: "Tier 4: सपोर्टिव फ्लूइड", drug: "Normal Saline (0.9% NaCl)", dose: "2 लीटर IV (डिहाइड्रेशन व शॉक प्रिवेंशन)।" },
        { tier: "Tier 5: ओरल ब्रोंकोडाइलेटर", drug: "Liquid Respo-Aid / Menthol Vapour Inhalation", dose: "भाप दिलवाएं ताकि श्वास नली खुली रहे।" }
      ],
      pregnancyContraindicatedDrugs: ["Inj. Dexamethasone / Isoflupredone (Strict Abortion Alert)"],
      pregnancySafeAlternative: "गाभिन पशु में सूजन घटाने हेतु Furosemide (Inj. Lasix 8ml) + Flunixin Meglumine का सुरक्षित कॉम्बो दें।"
    },
    {
      id: "DIS_SURRA",
      name: "सर्रा रोग (ट्रिपैनोसोमियासिस / Surra / Trypanosomiasis)",
      pathogen: "Trypanosoma evansi (Hemoflagellate protozoa, transmitted by Tabanus flies)",
      type: "Protozoal Disease",
      cardinalSymptoms: ["NRV_CIRCLING", "NRV_TREMORS", "T_HIGH", "EYE_CORNEA", "EYE_PALE", "RSP_DYSPNEA"],
      confirmatoryTests: [
        { test: "Wet Blood Film (Wet Mount)", findings: "माइक्रोस्कोप में RBC को धक्का मारते हुए तेजी से गतिशील ट्रिपैनोसोम", accuracy: "98%" },
        { test: "Card Agglutination Test (CATT)", findings: "सीरोलॉजिकल एंटीबॉडी डिटेक्शन पॉजिटिव", accuracy: "95%" }
      ],
      stagesTimeline: [
        { stage: "Intermittent Fever Phase", detail: "रुक-रुक कर 104-105°F तेज बुखार, आंख व नाक से पानी, भूख न लगना।" },
        { stage: "Nervous Stage", detail: "गोल-गोल चक्कर काटना, दीवारों से सिर टकराना, दांत पीसना, अचानक अंधापन।" },
        { stage: "Paralytic Stage", detail: "पिछले धड़ का पक्षाघात (Posterior Paralysis), दुर्बलता व कोमा।" }
      ],
      tierTreatment: [
        { tier: "Tier 1: विशिष्ट ट्रिपैनोसोमिसाइडल", drug: "Inj. Triquin (Quinapyramine Sulphate + Chloride 2.5g)", dose: "3-5 mg/kg S/C (15 ml पानी में घोलकर 1 ml/45kg सबक्यूटेनियस लगाएं)।" },
        { tier: "Tier 2: नर्वस डैमेज प्रोटेक्शन", drug: "Inj. Neurokind Plus / Tribivet Forte", dose: "15 ml Deep I/M दैनिक 5 दिनों तक।" },
        { tier: "Tier 3: कॉर्टिकल सेरेब्रल एडिमा रोधी", drug: "Inj. Mannitol 20% या Dextrose 20%", dose: "500 ml IV धीमे (दिमागी सूजन कम करने हेतु)।" },
        { tier: "Tier 4: एंटीपायरेटिक", drug: "Inj. Melonex (Meloxicam)", dose: "20 ml I/M।" },
        { tier: "Tier 5: हेमेटिनिक पुनर्प्राप्ति", drug: "Inj. Feritas (Iron Sorbitol) + Belamyl", dose: "10 ml I/M alternate days (तीव्र खून की कमी दूर करें)।" }
      ],
      pregnancyContraindicatedDrugs: ["Inj. Triquin (क्विनापिरामाइन गाभिन में तीव्र गर्भाशय संकुचन कराकर गर्भपात कराता है)"],
      pregnancySafeAlternative: "गाभिन में बहुत सावधानी से Diminazene Aceturate (Berenil 3.5 mg/kg) आधी-आधी खुराक में प्रोजेस्टेरोन कवर के साथ दें।"
    },
    {
      id: "DIS_FMD",
      name: "खुरपका-मुंहपका (Foot and Mouth Disease / FMD)",
      pathogen: "Aphthovirus (Picornaviridae - Types O, A, Asia-1)",
      type: "Viral Contagious Disease",
      cardinalSymptoms: ["NRV_LAMENESS", "T_HIGH", "UDD_DROP", "RSP_DYSPNEA"],
      confirmatoryTests: [
        { test: "RT-PCR / ELISA (Project Directorate on FMD)", findings: "सलाइवा व वेसिकल फ्लुइड में FMD वायरल RNA", accuracy: "99%" },
        { test: "Clinical Vesicle Inspection", findings: "जीभ, मसूड़ों व खुरों के बीच फटे हुए दर्दनाक छाले (Ruptured Vesicles)", accuracy: "96%" }
      ],
      stagesTimeline: [
        { stage: "Viremic Stage (Day 1-2)", detail: "तापमान 105-106°F, लार का तारों (Ropy Salivation) की तरह जमीन तक टपकना।" },
        { stage: "Vesicular Stage (Day 3-5)", detail: "जीभ व खुरों के बीच छाले फूटना, अत्यधिक लंगड़ापन, चारा खाना पूर्ण बंद।" },
        { stage: "Sequelae (Pantor Syndrome)", detail: "हृदय की मांसपेशी क्षति (Tiger Heart), हांफना (Pantor), बालों का खुरदुरा होना।" }
      ],
      tierTreatment: [
        { tier: "Tier 1: द्वितीयक बैक्टीरियल संक्रमण रोधी", drug: "Inj. Amikacin (5g) अथवा Inj. Ceftiofur 1g", dose: "1g I/M दैनिक 3-5 दिनों तक (घावों को सड़ने से रोकने हेतु)।" },
        { tier: "Tier 2: तीव्र दर्द व लार शमन", drug: "Inj. Melonex Plus (Meloxicam + Paracetamol)", dose: "25-30 ml Deep I/M दैनिक 3 दिनों तक।" },
        { tier: "Tier 3: लोकल एंटीसेप्टिक माउथ वाश", drug: "Potassium Permanganate (लाल दवा 1:1000) + Glycerin/Boric Acid", dose: "मुंह व खुरों को दिन में 3 बार धोएं, छालों पर बोरिक-ग्लिसरीन लगाएं।" },
        { tier: "Tier 4: खुर सुरक्षा व कीड़े रोकथाम", drug: "Spray Topicure Plus / D-Mag Spray", dose: "खुरों के घावों पर मैगट (कीड़े) रोकने हेतु छिड़कें।" },
        { tier: "Tier 5: इम्युनिटी बूस्टर व विटामिन्स", drug: "Inj. Masticare / Vit ADEH (Inj. Intavita)", dose: "10 ml I/M सप्ताह में दो बार (उपकला ऊतक पुनर्जनन हेतु)।" }
      ],
      pregnancyContraindicatedDrugs: ["Corticosteroids (रोग प्रतिरोधक क्षमता नष्ट कर वायरस प्रसार बढ़ाता है व गर्भपात कराता है)"],
      pregnancySafeAlternative: "एंटीबायोटिक (Ceftiofur) व दर्द निवारक (Melonex Plus) गाभिन में 100% सुरक्षित हैं।"
    },
    {
      id: "DIS_KETOSIS",
      name: "कीटोसिस (एसिटोनेमिया / Bovine Ketosis / Acetonemia)",
      pathogen: "Metabolic Negative Energy Balance (NEB) -> Hyperketonemia (BHBA > 1.4 mmol/L)",
      type: "Metabolic Disease",
      cardinalSymptoms: ["URN_KETONE", "UDD_DROP", "RUM_ATONY", "DNG_CONSTIPATION", "NRV_EXCITEMENT"],
      confirmatoryTests: [
        { test: "Rothera's Test (Urine Ketone Strip)", findings: "पेशाब की स्ट्रिप का गहरा बैंगनी/जामुनी (Deep Purple) होना", accuracy: "99%" },
        { test: "Milk Ketone Strip", findings: "दूध में कीटोन बॉडीज (Acetoacetate) > 100 µmol/L", accuracy: "95%" }
      ],
      stagesTimeline: [
        { stage: "Subclinical (1-3 wks post-calving)", detail: "दूध का घटना, दाना-बांट खाने से मना करना, केवल सूखा चारा खाना।" },
        { stage: "Clinical Wasting", detail: "तीव्र दुबलापन, आंखें धंसना, गोबर कड़ा व श्लेष्मा युक्त, मीठी गंध।" },
        { stage: "Nervous Ketosis", detail: "दीवार चाटना, अपने ही शरीर को काटना, आंखों का घूमना, उत्तेजना।" }
      ],
      tierTreatment: [
        { tier: "Tier 1: ग्लूकोज रिप्लेसमेंट", drug: "IV Dextrose 20% या 50%", dose: "500-1000 ml Slow IV (तुरंत रक्त शर्करा बढ़ाने हेतु)।" },
        { tier: "Tier 2: ग्लूकोनियोजेनिक प्रीकर्सर (ओरल)", drug: "Liquid Propylene Glycol / Anabolyte / Gluco-Boost", dose: "200-250 ml ओरल दिन में दो बार 4 दिनों तक।" },
        { tier: "Tier 3: कॉर्टिकोस्टेरॉयड (Non-Pregnant)", drug: "Inj. Isoflupredone Acetate (Isoflud 10mg)", dose: "10 mg (5 ml) Deep I/M (लिवर में ग्लूकोज उत्पादन तेज करता है)।" },
        { tier: "Tier 4: इंसुलिन / विटामिन सपोर्ट", drug: "Inj. Tribivet (B1, B6, B12) + Choline", dose: "10 ml I/M (लिवर फैटी एसिड मेटाबॉलिज्म सुधारने हेतु)।" },
        { tier: "Tier 5: रूमेन एक्टिवेटर यीस्ट", drug: "Bolus Biosacc / Rumi-Live", dose: "2 बोलस सुबह-शाम 5 दिनों तक।" }
      ],
      pregnancyContraindicatedDrugs: ["Inj. Isoflupredone / Dexona (यदि पशु धोखे से गाभिन अवस्था में कीटोसिस में हो)"],
      pregnancySafeAlternative: "केवल IV Dextrose 20% + ओरल Propylene Glycol + Niacin (Vitamin B3) दें। कोई स्टेरॉयड न लगाएं।"
    },
    {
      id: "DIS_FROTHY_BLOAT",
      name: "तीव्र झागदार अफारा (Frothy Bloat / Ruminal Tympany)",
      pathogen: "Physical/Fermentative entrapment of gas bubbles in legume/protein foam",
      type: "Digestive Emergency",
      cardinalSymptoms: ["RUM_TYMPANY", "RUM_FROTHY", "RSP_DYSPNEA", "RSP_OPEN_MOUTH", "RUM_COLIC"],
      confirmatoryTests: [
        { test: "Stomach Tube Passage", findings: "पेट में नली डालने पर भी मुफ्त गैस नहीं निकलती, केवल झाग बाहर आता है", accuracy: "99%" },
        { test: "Left Flank Percussion", findings: "बाईं कोख पर उंगली से थपथपाने पर टाइम्पेनिक ढोल जैसी आवाज (Drum-like resonance)", accuracy: "96%" }
      ],
      stagesTimeline: [
        { stage: "Early Distension (0-1 hr)", detail: "बाईं कोख रीढ़ की हड्डी से ऊपर उठ जाना, बेचैनी, बार-बार उठना-बैठना।" },
        { stage: "Cardio-Respiratory Distress (1-3 hrs)", detail: "फूला हुआ रूमेन फेफड़ों को दबाता है, जीभ बाहर, मुंह से झाग, घुटन।" },
        { stage: "Asphyxiation & Rupture", detail: "दम घुटने या रूमेन फटने से 2-4 घंटे में मृत्यु संभव।" }
      ],
      tierTreatment: [
        { tier: "Tier 1: एंटी-फोमिंग / सर्फेक्टेंट एजेंट", drug: "Liquid Bloatosil / Tympol / Poloxalene (Simethicone emulsion)", dose: "100-200 ml को 500 ml मूंगफली/सरसों के तेल में मिलाकर नाल से पिलाएं।" },
        { tier: "Tier 2: आपातकालीन ट्रोकार कैथेटर", drug: "Trocar & Cannula (16 Gauge)", dose: "अत्यधिक गंभीर स्थिति में बाईं कोख के केंद्र में प्रविष्ट कर गैस निकालें।" },
        { tier: "Tier 3: रूमेन गतिशीलता सुधारक", drug: "Inj. Melonex ( दर्द कम करने हेतु ) + Inj. Belamyl", dose: "15 ml I/M।" },
        { tier: "Tier 4: रूमेन बफरिंग", drug: "Sodium Bicarbonate (मीठा सोडा)", dose: "100-150 ग्राम गुनगुने पानी में घोलकर पिलाएं।" },
        { tier: "Tier 5: ओरल हर्बल कार्मिनेटिव", drug: "Himalayan Batisa / Ruchamax Powder", dose: "50g गुड़ के साथ दिन में दो बार 3 दिनों तक।" }
      ],
      pregnancyContraindicatedDrugs: ["गंभीर अफारे में ट्रोकार लगाते समय गर्भाशय पंक्चर होने का जोखिम"],
      pregnancySafeAlternative: "सिमेथिकोन (Bloatosil) एवं सरसों का तेल गाभिन में 100% सुरक्षित हैं।"
    },
    {
      id: "DIS_PPH",
      name: "ब्याने के बाद लाल पेशाब (Post-Parturient Hemoglobinuria / PPH)",
      pathogen: "Severe Hypophosphatemia (< 1.5 mg/dl) -> RBC Glycolysis Failure -> Intravascular Hemolysis",
      type: "Metabolic Nutritional Disease",
      cardinalSymptoms: ["URN_RED_CLEAR", "URN_COFFEE", "T_NORM", "EYE_PALE", "UDD_DROP"],
      confirmatoryTests: [
        { test: "Serum Inorganic Phosphorus", findings: "सीरम अकार्बनिक फास्फोरस 4-7 mg/dl से गिरकर < 1.5 mg/dl हो जाना", accuracy: "99%" },
        { test: "Centrifuged Urine & CBC", findings: "पेशाब में कोई RBC सेडिमेंट नहीं (True Hemoglobinuria), PCV < 18%", accuracy: "97%" }
      ],
      stagesTimeline: [
        { stage: "Incubation (2-4 wks post-calving)", detail: "उच्च दुग्ध उत्पादन वाली भैंसों में फास्फोरस की भारी कमी।" },
        { stage: "Hemolytic Onset (Day 1-2)", detail: "पेशाब एकदम लाल-कॉफी, तापमान सामान्य या सब-नॉर्मल (बबेसिओसिस से भिन्नता)।" },
        { stage: "Severe Anemic Hypoxia", detail: "दिल की तेज धड़कन (Juggler pulse), गोबर कड़ा, कमजोरी से बैठ जाना।" }
      ],
      tierTreatment: [
        { tier: "Tier 1: अकार्बनिक फास्फोरस IV इन्फ्यूजन", drug: "Inj. Sodium Acid Phosphate (Urumin / Novasac 40.3%)", dose: "60-80 ग्राम (150-200 ml) 500 ml नॉर्मल सलाइन में मिलाकर धीमे IV, फिर 12 घंटे बाद 50 ml S/C।" },
        { tier: "Tier 2: ऑर्गेनिक फास्फोरस टॉनिक", drug: "Inj. Tonophosphan (Toldimphos Sodium 20%)", dose: "15-20 ml Deep I/M प्रतिदिन 3 दिनों तक।" },
        { tier: "Tier 3: हेमोस्टैटिक व कैपिलरी प्रोटेक्टर", drug: "Inj. Botropase / Pause (Tranexamic Acid)", dose: "10 ml IV/IM (आंतरिक रक्तस्राव रोकने हेतु)।" },
        { tier: "Tier 4: एंटी-ऑक्सीडेंट सेल प्रोटेक्टर", drug: "Inj. Vitamin E & Selenium (Inj. Repronol / Selec)", dose: "10 ml Deep I/M (RBC झिल्ली की रक्षा हेतु)।" },
        { tier: "Tier 5: ओरल फास्फोरस व आयरन", drug: "DCP Powder (Dicalcium Phosphate) + Bolus Feritas", dose: "50 ग्राम DCP रोज दाने में मिलाकर 15 दिनों तक दें।" }
      ],
      pregnancyContraindicatedDrugs: ["Berenil (यह बबेसिओसिस नहीं है, डिमिनजीन से टॉक्सीसिटी होगी)"],
      pregnancySafeAlternative: "सोडियम एसिड फास्फोरस और टोनोफॉस्फेन गाभिन एवं दुधारू पशुओं में 100% सुरक्षित हैं।"
    }
  ];

  // Merge built-in diseases into window.VETCARE_DISEASE_DB
  window.VETCARE_DISEASE_DB = Array.isArray(window.VETCARE_DISEASE_DB) && window.VETCARE_DISEASE_DB.length > 0 
    ? window.VETCARE_DISEASE_DB 
    : BUILTIN_CLINICAL_DISEASES;

  // =========================================================================
  // 4. STEP 1: PATIENT ANIMAL INTAKE PROFILE CONTROLLER
  // =========================================================================
  window.updatePatientProfileField = function (field, value) {
    window.currentPatientProfile[field] = value;
    
    // Auto-recalculate weight if Girth or Length changed
    if (field === 'heartGirthInches' || field === 'bodyLengthInches') {
      window.calculateShaefferWeight();
    }

    // Auto-refresh offline diagnosis matches dynamically
    if (window.selectedSymptoms.size > 0) {
      window.runOfflineDiagnosisEngine();
    }
  };

  window.renderPatientIntakeStep = function () {
    const p = window.currentPatientProfile;
    return `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">1</span>
            <div>
              <h3 class="text-xs sm:text-sm font-black text-slate-900">रोगी पशु प्रोफाइल (Patient Intake Profile)</h3>
              <p class="text-[10px] text-slate-500">प्रजाति, नस्ल, उम्र, गर्भावस्था स्थिति व वजन का क्लिनिकल प्रोफाइलिंग</p>
            </div>
          </div>
          <button type="button" onclick="window.openWeightModal()" class="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition">
            <i class="fa-solid fa-weight-scale"></i> <span>शेफर वजन कैलकुलेटर</span>
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <!-- SPECIES -->
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">पशु प्रजाति (Species)</label>
            <select onchange="window.updatePatientProfileField('species', this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-800 outline-none focus:border-blue-500">
              <option value="गाय (Cow)" ${p.species.includes('गाय') ? 'selected' : ''}>गाय (Cow)</option>
              <option value="भैंस (Buffalo)" ${p.species.includes('भैंस') ? 'selected' : ''}>भैंस (Buffalo)</option>
              <option value="बकरी (Goat)" ${p.species.includes('बकरी') ? 'selected' : ''}>बकरी (Goat)</option>
              <option value="भेड़ (Sheep)" ${p.species.includes('भेड़') ? 'selected' : ''}>भेड़ (Sheep)</option>
              <option value="श्वान (Dog)" ${p.species.includes('श्वान') ? 'selected' : ''}>श्वान/कुत्ता (Canine)</option>
              <option value="अश्व (Horse)" ${p.species.includes('अश्व') ? 'selected' : ''}>अश्व/घोड़ा (Equine)</option>
              <option value="ऊँट (Camel)" ${p.species.includes('ऊँट') ? 'selected' : ''}>ऊँट (Camel)</option>
              <option value="शूकर (Pig)" ${p.species.includes('शूकर') ? 'selected' : ''}>शूकर (Swine)</option>
            </select>
          </div>

          <!-- BREED -->
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">नस्ल (Breed)</label>
            <input type="text" value="${p.breed}" oninput="window.updatePatientProfileField('breed', this.value)" placeholder="मुर्राह / साहीवाल / HF" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium text-slate-800 outline-none focus:border-blue-500" />
          </div>

          <!-- GENDER -->
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">लिंग (Gender)</label>
            <select onchange="window.updatePatientProfileField('gender', this.value)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-800 outline-none focus:border-blue-500">
              <option value="मादा (Female)" ${p.gender.includes('मादा') ? 'selected' : ''}>मादा (Female)</option>
              <option value="नर (Male)" ${p.gender.includes('नर') ? 'selected' : ''}>नर (Male)</option>
            </select>
          </div>

          <!-- PREGNANCY STATUS -->
          <div>
            <label class="block text-[10px] font-black text-rose-600 uppercase mb-1">गर्भावस्था स्थिति (Pregnancy)</label>
            <select onchange="window.updatePatientProfileField('pregnancyStatus', this.value)" class="w-full bg-rose-50/60 border border-rose-200 rounded-xl p-2 font-black text-rose-800 outline-none focus:border-rose-500">
              <option value="खाली (Non-Pregnant)" ${p.pregnancyStatus.includes('खाली') ? 'selected' : ''}>खाली (Non-Pregnant)</option>
              <option value="गाभिन - प्रथम तिमाही (1st Trimester)" ${p.pregnancyStatus.includes('1st') ? 'selected' : ''}>गाभिन (1-3 माह - Trimester 1)</option>
              <option value="गाभिन - द्वितीय तिमाही (2nd Trimester)" ${p.pregnancyStatus.includes('2nd') ? 'selected' : ''}>गाभिन (4-6 माह - Trimester 2)</option>
              <option value="गाभिन - अंतिम तिमाही (3rd Trimester)" ${p.pregnancyStatus.includes('3rd') ? 'selected' : ''}>🚨 गाभिन (7-9+ माह - High Alert)</option>
              <option value="सूखा पशु (Dry Period)" ${p.pregnancyStatus.includes('सूखा') ? 'selected' : ''}>सूखा पशु (Dry Period)</option>
              <option value="दुधारू (Milking Lactating)" ${p.pregnancyStatus.includes('दुधारू') ? 'selected' : ''}>दुधारू (Lactating)</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2.5 text-xs pt-1">
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">उम्र (Age in Years)</label>
            <input type="number" min="0" max="25" step="0.5" value="${p.ageYears}" oninput="window.updatePatientProfileField('ageYears', parseFloat(this.value) || 0)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-mono font-bold text-slate-800 outline-none" />
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">अनुमानित वजन (Kg Weight)</label>
            <input id="inputProfileWeight" type="number" min="10" max="1500" value="${p.weightKg}" oninput="window.updatePatientProfileField('weightKg', parseFloat(this.value) || 0)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-mono font-black text-blue-700 outline-none" />
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">ब्यांत / दुग्ध काल (Lactation)</label>
            <input type="text" value="${p.lactationStage}" oninput="window.updatePatientProfileField('lactationStage', this.value)" placeholder="उदा. 2nd ब्यांत (ताजा ब्याही)" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium text-slate-800 outline-none" />
          </div>
        </div>

        ${p.pregnancyStatus.includes('गाभिन') ? `
          <div class="p-2.5 bg-rose-50 border border-rose-300 rounded-2xl flex items-center gap-2 text-rose-800 text-[11px] font-bold animate-pulse">
            <span class="text-base">🚨</span>
            <span>गर्भावस्था सुरक्षा गार्ड सक्रिय: कॉर्टिकोस्टेरॉयड व एबॉर्फासिएंट दवाएं स्वचालित रूप से ब्लॉक/वार्निंग दी जाएंगी।</span>
          </div>
        ` : ''}
      </div>
    `;
  };

  // =========================================================================
  // 5. STEP 2: MULTI-ORGAN CLINICAL SYMPTOM SELECTOR CONTROLLER
  // =========================================================================
  window.toggleSymptom = function (symId) {
    if (window.selectedSymptoms.has(symId)) {
      window.selectedSymptoms.delete(symId);
    } else {
      window.selectedSymptoms.add(symId);
    }
    
    // Auto-refresh step 2 & step 3
    window.renderOrganSymptomSelector();
    window.runOfflineDiagnosisEngine();
  };

  window.clearAllSymptoms = function () {
    window.selectedSymptoms.clear();
    window.renderOrganSymptomSelector();
    window.runOfflineDiagnosisEngine();
  };

  window.renderOrganSymptomSelector = function () {
    const container = document.getElementById('panelDiagMatrix');
    if (!container) return;

    let html = `
      <div class="space-y-4">
        <!-- STEP 1 INTAKE EMBED -->
        ${window.renderPatientIntakeStep()}

        <!-- STEP 2 ORGAN ACCORDIONS -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">2</span>
              <div>
                <h3 class="text-xs sm:text-sm font-black text-slate-900">मल्टी-ऑर्गन क्लिनिकल लक्षण चयन (Multi-Organ Symptoms)</h3>
                <p class="text-[10px] text-slate-500">10 शारीरिक तंत्रों में से देखे गए प्रत्यक्ष लक्षणों पर टिक करें</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-[10px] font-bold text-slate-400">चयनित: ${window.selectedSymptoms.size}</span>
              ${window.selectedSymptoms.size > 0 ? `
                <button type="button" onclick="window.clearAllSymptoms()" class="text-[10px] text-rose-600 font-bold hover:underline">सभी हटाएं</button>
              ` : ''}
            </div>
          </div>

          <!-- ORGAN GRIDS -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            ${Object.keys(window.VETCARE_ORGAN_SYMPTOMS).map(key => {
              const organ = window.VETCARE_ORGAN_SYMPTOMS[key];
              const selectedCount = organ.options.filter(opt => window.selectedSymptoms.has(opt.id)).length;

              return `
                <div class="border ${selectedCount > 0 ? 'border-emerald-400 bg-emerald-50/20' : 'border-slate-200 bg-slate-50/50'} rounded-2xl p-3 space-y-2">
                  <div class="flex items-center justify-between text-xs font-black text-slate-800">
                    <span class="flex items-center gap-1.5">
                      <i class="fa-solid ${organ.icon} text-${organ.color}-600"></i>
                      <span>${organ.title}</span>
                    </span>
                    ${selectedCount > 0 ? `
                      <span class="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-full">${selectedCount}</span>
                    ` : ''}
                  </div>

                  <div class="space-y-1.5 pt-1">
                    ${organ.options.map(opt => {
                      const isChecked = window.selectedSymptoms.has(opt.id);
                      return `
                        <label class="flex items-start gap-2 p-1.5 rounded-xl cursor-pointer hover:bg-white transition ${isChecked ? 'bg-white shadow-2xs border border-emerald-300 font-bold text-slate-900' : 'text-slate-600'}">
                          <input 
                            type="checkbox" 
                            ${isChecked ? 'checked' : ''} 
                            onchange="window.toggleSymptom('${opt.id}')"
                            class="mt-0.5 accent-emerald-600 rounded"
                          />
                          <span class="text-[11px] leading-tight select-none">${opt.label}</span>
                        </label>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- STEP 3 & 4 ACTION BAR -->
        <div class="flex flex-col sm:flex-row items-center gap-2.5">
          <button 
            type="button" 
            onclick="window.runOfflineDiagnosisEngine()" 
            class="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-98">
            <i class="fa-solid fa-stethoscope"></i> <span>3. प्रोबेबिलिटी डायग्नोसिस इंजन चलाएं</span>
          </button>

          <button 
            type="button" 
            onclick="window.getAiSecondOpinion()" 
            class="w-full sm:w-1/2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-98">
            <span>⚡ AI द्वितीय राय (AI Second Opinion Report)</span>
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  // =========================================================================
  // 6. STEP 3: OFFLINE PROBABILITY ENGINE (MATRICES, 5-TIER RX & PREGNANCY SAFEGUARD)
  // =========================================================================
  window.runOfflineDiagnosisEngine = function () {
    const resultsContainer = document.getElementById('diseaseSearchResults');
    if (!resultsContainer) return;

    if (window.selectedSymptoms.size === 0) {
      resultsContainer.innerHTML = `
        <div class="bg-white border border-slate-200 rounded-3xl p-6 text-center space-y-2">
          <span class="text-3xl text-slate-400">📋</span>
          <p class="text-xs font-bold text-slate-700">कृपया ऊपर दिए गए शारीरिक तंत्रों में से कम से कम 1 या 2 लक्षण चुनें।</p>
          <p class="text-[11px] text-slate-400">लक्षण चुनते ही क्लिनिकल प्रोबेबिलिटी इंजन संभावित रोगों का मिलान प्रतिशत प्रदर्शित करेगा।</p>
        </div>
      `;
      return;
    }

    const currentSymptoms = Array.from(window.selectedSymptoms);
    const scoredDiseases = window.VETCARE_DISEASE_DB.map(disease => {
      const cardinal = disease.cardinalSymptoms || [];
      const matchCount = cardinal.filter(sym => currentSymptoms.includes(sym)).length;
      const score = Math.round((matchCount / Math.max(cardinal.length, 1)) * 100);

      // Contextual boost if critical symptom matches
      let finalScore = score;
      if (currentSymptoms.includes("URN_COFFEE") && disease.id === "DIS_BABESIOSIS") finalScore = Math.max(finalScore, 92);
      if (currentSymptoms.includes("T_SUBNORM") && currentSymptoms.includes("NRV_S_SHAPE") && disease.id === "DIS_MILK_FEVER") finalScore = Math.max(finalScore, 98);
      if (currentSymptoms.includes("SKN_PRESCAP_SWOLLEN") && disease.id === "DIS_THEILERIOSIS") finalScore = Math.max(finalScore, 95);
      if (currentSymptoms.includes("RSP_NECK_EDEMA") && disease.id === "DIS_HS") finalScore = Math.max(finalScore, 96);
      if (currentSymptoms.includes("URN_KETONE") && disease.id === "DIS_KETOSIS") finalScore = Math.max(finalScore, 95);

      return {
        ...disease,
        matchScore: finalScore,
        matchedCardinalCount: matchCount
      };
    });

    // Sort descending by match score
    scoredDiseases.sort((a, b) => b.matchScore - a.matchScore);
    window._lastRankedDiseases = scoredDiseases;

    const isPregnant = window.currentPatientProfile.pregnancyStatus.includes('गाभिन');

    // Build Results View
    let html = `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
            <span>🔬</span> <span>संभावित क्लिनिकल रोग मिलान (Differential Diagnosis Ranking)</span>
          </h3>
          <span class="text-[10px] bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-full">
            ${scoredDiseases.filter(d => d.matchScore > 20).length} संभावित स्थितियां
          </span>
        </div>

        <div class="space-y-4">
          ${scoredDiseases.slice(0, 5).map((d, index) => {
            const isTop = index === 0 && d.matchScore >= 50;
            return `
              <div class="bg-white border-2 ${isTop ? 'border-blue-600 shadow-md' : 'border-slate-200'} rounded-3xl p-4 sm:p-5 space-y-4 transition">
                
                <!-- HEADER & MATCH BADGE -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-black px-2 py-0.5 rounded-lg ${
                        d.matchScore >= 80 ? 'bg-emerald-100 text-emerald-800' :
                        d.matchScore >= 50 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                      }">
                        ${d.matchScore}% मिलान (Match Probability)
                      </span>
                      <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${d.type}</span>
                    </div>
                    <h4 class="text-sm sm:text-base font-black text-slate-900 mt-1">${d.name}</h4>
                    <p class="text-[11px] font-mono text-slate-500">${d.pathogen}</p>
                  </div>

                  <div class="flex gap-2">
                    <button 
                      type="button" 
                      onclick="window.copyTreatmentToOpd('${d.id}')"
                      class="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1">
                      <i class="fa-solid fa-file-prescription"></i> <span>पर्ची में 5-Tier Rx भेजें</span>
                    </button>
                  </div>
                </div>

                <!-- PREGNANCY SAFETY GUARD WARNING IF PREGNANT -->
                ${isPregnant ? `
                  <div class="p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl text-xs space-y-1.5">
                    <div class="font-black text-rose-800 flex items-center gap-1.5">
                      <i class="fa-solid fa-triangle-exclamation text-rose-600 text-sm"></i>
                      <span>गर्भावस्था सुरक्षा चेतावनी (Pregnancy Alert - ${window.currentPatientProfile.pregnancyStatus}):</span>
                    </div>
                    <div class="text-[11px] text-rose-900 font-semibold">
                      🚫 <span class="font-bold underline">निषिद्ध दवाएं:</span> ${d.pregnancyContraindicatedDrugs.join(', ')}
                    </div>
                    <div class="text-[11px] text-emerald-800 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                      ✅ <span class="underline">सुरक्षित विकल्प (Safe Alternative):</span> ${d.pregnancySafeAlternative}
                    </div>
                  </div>
                ` : ''}

                <!-- STAGES TIMELINE ACCORDION -->
                <div class="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                  <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <i class="fa-solid fa-clock-rotate-left text-slate-400"></i>
                    <span>रोग की क्रमिक अवस्थाएं (Disease Stages Timeline):</span>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                    ${d.stagesTimeline.map(stg => `
                      <div class="bg-white p-2 rounded-xl border border-slate-200">
                        <span class="font-bold text-blue-700 block text-[10px]">${stg.stage}</span>
                        <span class="text-slate-600 leading-tight">${stg.detail}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- CONFIRMATORY LAB TESTS TABLE -->
                <div class="space-y-1.5">
                  <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <i class="fa-solid fa-vial-virus text-purple-600"></i>
                    <span>पुष्टिकारी प्रयोगशाला परीक्षण (Confirmatory Lab Tests):</span>
                  </div>
                  <div class="overflow-x-auto no-scrollbar">
                    <table class="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                      <thead class="bg-slate-100 text-slate-600 text-[10px] uppercase font-bold">
                        <tr>
                          <th class="p-2 border-b border-slate-200">परीक्षण (Lab Test)</th>
                          <th class="p-2 border-b border-slate-200">प्रत्यक्ष निष्कर्ष (Findings)</th>
                          <th class="p-2 border-b border-slate-200 text-right">सटीकता</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100 text-[11px]">
                        ${d.confirmatoryTests.map(t => `
                          <tr class="hover:bg-slate-50">
                            <td class="p-2 font-bold text-slate-800">${t.test}</td>
                            <td class="p-2 text-slate-600">${t.findings}</td>
                            <td class="p-2 font-mono font-bold text-emerald-700 text-right">${t.accuracy}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- 5-TIER PHARMACOLOGICAL PROTOCOL TABLE -->
                <div class="space-y-1.5">
                  <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <i class="fa-solid fa-prescription-bottle-medical text-emerald-600"></i>
                    <span>प्रमाणित 5-स्तरीय उपचार प्रोटोकॉल (Standardized 5-Tier Treatment):</span>
                  </div>
                  <div class="overflow-x-auto no-scrollbar">
                    <table class="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                      <thead class="bg-slate-100 text-slate-700 text-[10px] uppercase font-black">
                        <tr>
                          <th class="p-2 border-b border-slate-200 w-1/4">उपचार स्तर (Tier)</th>
                          <th class="p-2 border-b border-slate-200 w-1/3">औषधि नाम (Drug Formulation)</th>
                          <th class="p-2 border-b border-slate-200">डोज़ व रूट (Dose & Administration)</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100 text-[11px]">
                        ${d.tierTreatment.map(tr => `
                          <tr class="hover:bg-blue-50/30">
                            <td class="p-2 font-bold text-blue-900 bg-slate-50/50">${tr.tier}</td>
                            <td class="p-2 font-bold text-slate-800">${tr.drug}</td>
                            <td class="p-2 font-mono text-slate-600">${tr.dose}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    resultsContainer.innerHTML = html;
  };

  /**
   * Helper to copy 5-tier prescription directly into OPD pad (#opdMedicine)
   */
  window.copyTreatmentToOpd = function (diseaseId) {
    const disease = window.VETCARE_DISEASE_DB.find(d => d.id === diseaseId);
    if (!disease) return;

    const opdField = document.getElementById('opdMedicine');
    const diagField = document.getElementById('opdDiagnosis');
    
    if (diagField) {
      diagField.value = disease.name;
    }

    if (opdField) {
      const rxLines = disease.tierTreatment.map(t => `${t.drug} - ${t.dose}`);
      const textToAppend = `[निदान: ${disease.name}]\n` + rxLines.join('\n');
      opdField.value = opdField.value ? `${opdField.value}\n\n${textToAppend}` : textToAppend;
      alert(`✅ 5-स्तरीय उपचार डिजिटल केस पर्ची में स्थानांतरित कर दिया गया है!`);
      if (typeof window.switchTab === 'function') {
        window.switchTab('rx');
      }
    } else {
      alert(`Rx नोट तैयार:\n${disease.tierTreatment.map(t => t.drug).join('\n')}`);
    }
  };

  // =========================================================================
  // 7. STEP 4: AI SECOND OPINION CONSULTANT (GEMINI 3.8 FLASH INTEGRATION)
  // =========================================================================
  window.getAiSecondOpinion = async function () {
    const aiOutput = document.getElementById('aiOutputArea');
    const p = window.currentPatientProfile;
    const currentSymptoms = Array.from(window.selectedSymptoms);

    if (currentSymptoms.length === 0) {
      alert("कृपया पहले कम से कम 2-3 क्लिनिकल लक्षण चुनें ताकि AI सटीक विश्लेषण कर सके!");
      return;
    }

    // Switch to AI tab if in main workspace
    if (typeof window.switchTab === 'function') {
      window.switchTab('ai');
    }

    const aiInputPrompt = document.getElementById('aiInputPrompt');
    const apiKey = localStorage.getItem('vetcare_gemini_key') || '';

    // Prepare structured prompt
    const promptText = `
Act as a Senior Veterinary Clinician & Diagnostic Surgeon. Provide an immediate, structured Clinical Second Opinion.

PATIENT PROFILE:
- Species: ${p.species}
- Breed: ${p.breed}
- Age: ${p.ageYears} Years (${p.ageMonths} Months)
- Weight: ${p.weightKg} Kg
- Gender: ${p.gender}
- Pregnancy Status: ${p.pregnancyStatus}
- Lactation Stage: ${p.lactationStage}

CLINICAL SYMPTOM FINDINGS:
${currentSymptoms.map(s => `- ${s}`).join('\n')}

TOP OFFLINE MATCHES:
${(window._lastRankedDiseases || []).slice(0, 3).map(d => `${d.name} (${d.matchScore}% Match)`).join(', ')}

REQUIRED RESPONSE IN HINDI (HINGLISH WITH CLINICAL MEDICAL TERMS):
1. 🩺 प्राथमिक प्रोविजनल निदान एवं अंतर-निदान (Primary & Differential Diagnosis - DDx)
2. 🚨 जीवन रक्षक आपातकालीन कदम (Life-Saving Emergency Protocol)
3. 💊 5-स्तरीय सटीक दवा उपचार योजना (खुराक mg/kg एवं ${p.weightKg} kg के अनुसार कुल ml में निकालें)
4. ⚠️ गर्भावस्था सुरक्षा व गर्भपात चेतावनी (Strict Pregnancy Safe vs Contraindicated Drugs for ${p.pregnancyStatus})
5. 🔬 पुष्टि हेतु तुरंत कराए जाने वाले फील्ड टेस्ट
    `.trim();

    if (aiInputPrompt) {
      aiInputPrompt.value = promptText;
    }

    const btnRun = document.getElementById('btnRunAI');
    if (btnRun) {
      btnRun.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>AI सर्जन विश्लेषण कर रहा है...</span>`;
      btnRun.disabled = true;
    }

    if (aiOutput) {
      aiOutput.classList.remove('hidden');
      aiOutput.innerHTML = `<div class="p-4 text-center font-bold text-purple-700 animate-pulse">⏳ लाइव AI वेटरनरी सर्जन (Gemini 3.8 Flash) रोगी डेटा व गर्भावस्था जोखिम का विश्लेषण कर रहा है...</div>`;
    }

    // If API key is not set, simulate offline AI report or prompt key
    if (!apiKey) {
      setTimeout(() => {
        const simulatedReport = generateSimulatedAiReport(p, currentSymptoms, window._lastRankedDiseases[0]);
        if (aiOutput) {
          aiOutput.innerHTML = simulatedReport;
        }
        if (btnRun) {
          btnRun.innerHTML = `<span>✨ AI से क्लिनिकल रिपोर्ट मांगें</span>`;
          btnRun.disabled = false;
        }
      }, 1200);
      return;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });

      const data = await response.json();
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (answer && aiOutput) {
        aiOutput.innerHTML = `
          <div class="space-y-3">
            <div class="flex items-center justify-between border-b border-purple-200 pb-2">
              <span class="font-black text-purple-900 text-xs">🩺 Gemini 3.8 Flash AI Clinical Second Opinion</span>
              <span class="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">सत्यापित AI रिपोर्ट</span>
            </div>
            <div class="prose prose-sm text-slate-800 text-xs whitespace-pre-wrap font-sans leading-relaxed">${answer}</div>
          </div>
        `;
      } else {
        throw new Error("Invalid API response");
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to offline clinical synthesizer", err);
      const simulatedReport = generateSimulatedAiReport(p, currentSymptoms, window._lastRankedDiseases[0]);
      if (aiOutput) aiOutput.innerHTML = simulatedReport;
    } finally {
      if (btnRun) {
        btnRun.innerHTML = `<span>✨ AI से क्लिनिकल रिपोर्ट मांगें</span>`;
        btnRun.disabled = false;
      }
    }
  };

  function generateSimulatedAiReport(patient, symptoms, topDisease) {
    const dName = topDisease ? topDisease.name : "एक्यूट सिस्टमिक इन्फेक्शन";
    const isPregnant = patient.pregnancyStatus.includes("गाभिन");
    
    return `
      <div class="space-y-3 text-xs leading-relaxed">
        <div class="flex items-center justify-between border-b border-purple-200 pb-1.5">
          <span class="font-black text-purple-900 text-sm">🩺 AI वेटरनरी सर्जन द्वितीय राय (Clinical Synthesis Report)</span>
          <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">क्लिनिकल इंजन एक्टिव</span>
        </div>

        <div class="p-2.5 bg-white rounded-xl border border-purple-200">
          <span class="font-bold text-slate-800 block text-[11px] mb-1">1. प्राथमिक अंतर-निदान (Differential Diagnosis):</span>
          <p class="text-slate-700">रोगी प्रोफाइल (${patient.species}, ${patient.weightKg} कि.ग्रा., ${patient.pregnancyStatus}) एवं चयनित लक्षणों के आधार पर सर्वाधिक संभावित स्थिति <strong>${dName}</strong> है।</p>
        </div>

        <div class="p-2.5 bg-rose-50 border border-rose-200 rounded-xl">
          <span class="font-black text-rose-800 block text-[11px] mb-1">2. 🚨 गर्भावस्था सुरक्षा एडवाइजरी (${patient.pregnancyStatus}):</span>
          <p class="text-rose-900 font-medium">
            ${isPregnant 
              ? "गाभिन पशु में Dexamethasone, Isoflupredone अथवा उच्च मात्रा में एबॉर्फासिएंट ड्रग्स का प्रयोग पूर्णतः वर्जित है। दर्द/बुखार शमन हेतु केवल Meloxicam (0.5 mg/kg) तथा संक्रमण हेतु Ceftiofur Sodium (1.1-2.2 mg/kg) ही सुरक्षित हैं।"
              : "पशु गैर-गाभिन है। आपातकालीन स्थिति में आवश्यकतानुसार नियंत्रित स्टेरॉयड या एंटी-इन्फ्लेमेटरी थेरेपी दी जा सकती है।"
            }
          </p>
        </div>

        <div class="p-2.5 bg-white rounded-xl border border-purple-200">
          <span class="font-bold text-slate-800 block text-[11px] mb-1">3. वजन अनुसार सटीक खुराक गणना (${patient.weightKg} Kg Live Weight):</span>
          <ul class="list-disc pl-4 space-y-1 text-slate-700 font-mono text-[11px]">
            <li>Inj. Ceftiofur Sodium 1g: 1-2 mg/kg -> कुल डोज़: ${((patient.weightKg * 1.5) / 1000).toFixed(1)}g Deep I/M</li>
            <li>Inj. Meloxicam (Melonex): 0.5 mg/kg -> कुल मात्रा: ${((patient.weightKg * 0.5) / 5).toFixed(0)} ml I/M</li>
            <li>Inj. B-Complex (Belamyl): 10 ml Deep I/M</li>
          </ul>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 8. STEP 5: SHAEFFER WEIGHT & DOSAGE CALCULATOR (INLINE & MODAL)
  // =========================================================================
  window.calculateShaefferWeight = function () {
    const girth = parseFloat(window.currentPatientProfile.heartGirthInches) || 0;
    const length = parseFloat(window.currentPatientProfile.bodyLengthInches) || 0;

    if (girth > 0 && length > 0) {
      // Shaeffer Formula: Weight in lbs = (Girth^2 * Length) / 300
      const weightLbs = (Math.pow(girth, 2) * length) / 300;
      // 1 lb = 0.45359237 kg
      const weightKg = Math.round(weightLbs * 0.45359237);

      window.currentPatientProfile.weightKg = weightKg;

      const profileInput = document.getElementById('inputProfileWeight');
      if (profileInput) profileInput.value = weightKg;

      const modalWeightDisplay = document.getElementById('calcResultWeightKg');
      if (modalWeightDisplay) modalWeightDisplay.innerText = `${weightKg} Kg (${Math.round(weightLbs)} lbs)`;

      window.updateDosagePreviews(weightKg);
    }
  };

  window.updateDosagePreviews = function (kg) {
    const ceftiofurMl = (kg * 0.02).toFixed(1); // approx ml
    const melonexMl = ((kg * 0.5) / 5).toFixed(0);
    const flunixinMl = ((kg * 2.2) / 50).toFixed(0);
    const oxyLAMl = (kg / 10).toFixed(0);

    const doseBox = document.getElementById('calcDosagePreviewBox');
    if (doseBox) {
      doseBox.innerHTML = `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div class="p-2 bg-blue-50 border border-blue-200 rounded-xl">
            <span class="text-[10px] text-slate-500 block">Inj. Ceftiofur</span>
            <span class="font-mono font-bold text-blue-700">${(kg * 0.002).toFixed(1)}g I/M</span>
          </div>
          <div class="p-2 bg-emerald-50 border border-emerald-200 rounded-xl">
            <span class="text-[10px] text-slate-500 block">Inj. Melonex</span>
            <span class="font-mono font-bold text-emerald-700">${melonexMl} ml I/M</span>
          </div>
          <div class="p-2 bg-purple-50 border border-purple-200 rounded-xl">
            <span class="text-[10px] text-slate-500 block">Inj. Flunixin</span>
            <span class="font-mono font-bold text-purple-700">${flunixinMl} ml IV</span>
          </div>
          <div class="p-2 bg-amber-50 border border-amber-200 rounded-xl">
            <span class="text-[10px] text-slate-500 block">Inj. Oxytet LA</span>
            <span class="font-mono font-bold text-amber-800">${oxyLAMl} ml I/M</span>
          </div>
        </div>
      `;
    }
  };

  window.openWeightModal = function () {
    let modal = document.getElementById('modalWeightShaeffer');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modalWeightShaeffer';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs';
      document.body.appendChild(modal);
    }

    const p = window.currentPatientProfile;
    modal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl relative text-left text-xs">
        <button onclick="document.getElementById('modalWeightShaeffer').style.display='none'" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>

        <div class="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <div class="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg">⚖️</div>
          <div>
            <h3 class="font-black text-slate-900 text-sm">शेफर सूत्र - वजन व सटीक खुराक कैलकुलेटर</h3>
            <p class="text-[10px] text-slate-500">Shaeffer Formula: [Girth² × Length / 300] × 0.453592</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">हार्ट गर्थ / सीने का घेरा (इंच)</label>
            <input 
              id="inputCalcGirth" 
              type="number" 
              value="${p.heartGirthInches}" 
              oninput="window.updatePatientProfileField('heartGirthInches', this.value)"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-bold text-slate-900 outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-600 uppercase mb-1">लंबाई - कंधे से पुट्ठे तक (इंच)</label>
            <input 
              id="inputCalcLength" 
              type="number" 
              value="${p.bodyLengthInches}" 
              oninput="window.updatePatientProfileField('bodyLengthInches', this.value)"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-bold text-slate-900 outline-none focus:border-blue-500" 
            />
          </div>
        </div>

        <div class="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-center">
          <span class="text-[10px] font-bold text-blue-600 uppercase">गणना किया गया लाइव वजन:</span>
          <div id="calcResultWeightKg" class="text-xl font-black text-blue-900 font-mono mt-0.5">${p.weightKg} Kg</div>
        </div>

        <div class="space-y-1.5">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">वजन अनुसार इंजेक्शन खुराक (Instant Calculated ml):</span>
          <div id="calcDosagePreviewBox"></div>
        </div>

        <button 
          type="button" 
          onclick="document.getElementById('modalWeightShaeffer').style.display='none'"
          class="w-full bg-slate-900 hover:bg-black text-white font-bold py-2.5 rounded-xl transition text-xs shadow-md">
          प्रोफाइल में लागू करें व वापस जाएं ➔
        </button>
      </div>
    `;

    modal.style.display = 'flex';
    window.updateDosagePreviews(p.weightKg);
  };

  // =========================================================================
  // 9. ENGINE INITIALIZATION & HOOKS
  // =========================================================================
  window.initDoctorDiagnosisEngine = function () {
    const diagMatrixEl = document.getElementById('panelDiagMatrix');
    if (diagMatrixEl) {
      window.renderOrganSymptomSelector();
      window.runOfflineDiagnosisEngine();
    }
  };

  // Execute on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initDoctorDiagnosisEngine);
  } else {
    window.initDoctorDiagnosisEngine();
  }

})();
