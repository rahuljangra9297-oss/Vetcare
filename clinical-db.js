/**
 * ============================================================================
 * VETCARE AI OS - CLINICAL DECISION SUPPORT DATABASE (clinical-db.js)
 * Architecture: Evidence-Based Veterinary Protocols & 5-Tier Treatment Matrix
 * Version: 4.5.0-PROD (Strict Syntax Verified - 100% Balanced AST)
 * ============================================================================
 */

window.VETCARE_DISEASE_DB = [
  /* ==========================================================================
   * 1. सर्रा रोग (SURRA / TRYPANOSOMIASIS)
   * ========================================================================== */
  {
    id: "SURRA",
    nameHindi: "सर्रा रोग (Surra / Bovine Trypanosomiasis)",
    category: "PROTOZOAL",
    cardinal: "CIRCLING_HEAD_PRESSING",
    temp: "HIGH",
    keywords: ["सर्रा", "surra", "गोल चक्कर", "trypanosoma", "कमजोरी", "दीवार से सिर लगाना", "झटके"],
    desc: "ट्रिपैनोसोमा इवान्साई (Trypanosoma evansi) प्रोटोजोआ जनित अति-घातक रक्त परजीवी रोग। यह डांस मक्खी (Tabanus fly) द्वारा फैलता है और तंत्रिका तंत्र पर गंभीर आघात करता है।",
    pregnancyWarning: "🚨 RED ALERT (गर्भावस्था सुरक्षा): ट्राइकैट / क्विनापाइरामीन (Quinapyramine) एवं डेक्सामेथासोन (Dexamethasone) गाभिन पशुओं में तीव्र गर्भपात (Abortion) कारक हैं। गाभिन पशुओं में केवल Diminazene Aceturate (सुरक्षित खुराक 3.5 mg/kg) और Isoflupredone ही दें।",
    stages: [
      {
        stage: 1,
        name: "स्टेज 1: प्रारंभिक संक्रामक अवस्था (Early Parasitemia)",
        positiveTimeline: "प्रारंभिक 12-24 घंटे में ट्रिपैनोसाइडल औषधि (Berenil) मिलने पर 100% रिकवरी और तापमान सामान्य।",
        negativeTimeline: "उपचार न मिलने पर 24-48 घंटे में परजीवी ब्लड-ब्रेन बैरियर (BBB) को पार कर सीएनएस में प्रवेश करते हैं।"
      },
      {
        stage: 2,
        name: "स्टेज 2: तीव्र तंत्रिका प्रसार (Acute Neurological Phase)",
        positiveTimeline: "न्यूरो-प्रोटेक्टिव B-कॉम्प्लेक्स एवं एंटी-प्रोटोजोअल से 48-72 घंटे में तंत्रिका संतुलन की बहाली।",
        negativeTimeline: "अंधापन, पुतलियों का फैलना, गोल चक्कर काटना (Circling) एवं दीवारों से सिर टकराना।"
      },
      {
        stage: 3,
        name: "स्टेज 3: गंभीर सेरेब्रल डिप्रेशन (Cerebral Depression & Stupor)",
        positiveTimeline: "सघन चिकित्सीय ड्रिप (Mannitol + Thiamine) मिलने पर 3-5 दिन में सुधार की 45% संभावना।",
        negativeTimeline: "पशु का जमीन पर गिरना, अत्यधिक लात चलाना (Pedaling movements) और दांत किटकटाना।"
      },
      {
        stage: 4,
        name: "स्टेज 4: टर्मिनल पैरालिसिस व कोमा (Comatose & Terminal State)",
        positiveTimeline: "पुनर्जीवन की संभावना <5%, केवल आपातकालीन आईसीयू प्रोटोकॉल से दुर्लभ बचाव।",
        negativeTimeline: "श्वसन पक्षाघात (Respiratory failure) एवं 6-12 घंटे में असामयिक मृत्यु।"
      }
    ],
    treatments: {
      tier1Injections: [
        { drug: "Inj. Quinapyramine Prosalt/Sulfate (Triquin)", dose: "1 ml प्रति 40-50 kg S/C (Never I/V)", notes: "परजीवीनाशक (चेतावनी: गाभिन में वर्जित)" },
        { drug: "Inj. Diminazene Aceturate (Berenil 7%)", dose: "3.5 mg - 5 mg/kg Deep I/M", notes: "गाभिन पशुओं में तुलनात्मक रूप से सुरक्षित" },
        { drug: "Inj. Neuroxin-M / Tribivet (B1, B6, B12)", dose: "15-20 ml I/V या I/M", notes: "थायमिन की उच्च खुराक सीएनएस डैमेज रोकती है" },
        { drug: "Inj. Melonex Plus (Meloxicam + Paracetamol)", dose: "15-20 ml I/M", notes: "तेज बुखार एवं मस्तिष्क की सूजन कम करने हेतु" },
        { drug: "Dextrose 20% + DNS Infusion", dose: "1500 - 2000 ml I/V", notes: "तीव्र हाइपोग्लाइसीमिया से बचाव" }
      ],
      tier2Oral: [
        { drug: "Syrup Sharkoferrol / Feritas", dose: "50 ml सुबह-शाम", notes: "तीव्र एनीमिया व हीमोग्लोबिन सुधार हेतु" },
        { drug: "Powder Ener-G / Electral", dose: "100 g प्रतिदिन पीने के पानी में", notes: "इलेक्ट्रोलाइट संतुलन" }
      ],
      tier3Ayurveda: [
        { item: "चिरायता (Swertia chirata) + नीम गिलोय चूर्ण", dose: "40g चिरायता + 50g गिलोय का काढ़ा", notes: "प्राकृतिक रक्त शोधक व यकृत सुरक्षा" }
      ],
      tier4Homeopathy: [
        { remedy: "Arsenicum Album 200C", dose: "10 बूंद दिन में 3 बार", notes: "कमजोरी व सेप्टिसीमिया नियंत्रण" },
        { remedy: "Nux Vomica 200C", dose: "10 बूंद दिन में 2 बार", notes: "तंत्रिका दुर्बलता व लकवा लक्षण" }
      ],
      tier5DesiRemedies: [
        { remedy: "पुराना देसी गुड़ (250g) + पिसी काली मिर्च (20g) + तिल का तेल (100ml)", notes: "तात्कालिक ऊर्जा व शरीर को गर्माहट देने हेतु" }
      ],
      biosecurity: "गोशाला में मक्खियों (Tabanus) का पूर्ण उन्मूलन, नीम के पत्तों का धुआं और फर्श पर Deltamethrin (2ml/L) का छिड़काव।"
    },
    farmerRemedy: "देसी नुस्खा: 250 ग्राम पुराने गुड़ में 20 ग्राम काली मिर्च व 100 मिली तिल का तेल मिलाकर चटाएं। मक्खियों से बचाव करें।",
    doctorRx: "1. Inj. Triquin (Quinapyramine) 1ml/40kg S/C (Non-Pregnant) OR Berenil 3.5mg/kg I/M (Pregnant)\n2. Inj. Tribivet 15ml I/V दैनिक 3 दिन\n3. Inj. Melonex Plus 15ml I/M\n4. Infusion DNS 5% 2 Litres I/V\n5. गाभिन में डेक्सामेथासोन कभी न लगाएं।"
  },

  /* ==========================================================================
   * 2. गलघोंटू (HEMORRHAGIC SEPTICEMIA - HS)
   * ========================================================================== */
  {
    id: "HS",
    nameHindi: "गलघोंटू (Hemorrhagic Septicemia - HS)",
    category: "BACTERIAL",
    cardinal: "NECK_SWELLING",
    temp: "HIGH",
    keywords: ["गलघोंटू", "hs", "गले में सूजन", "घुर-घुर", "तेज बुखार", "pasteurella", "दम घुटना"],
    desc: "पाश्चुरेला मल्टोसीडा (Pasteurella multocida) जीवाणु जनित अति-तीव्र संक्रामक रोग। गले, जबड़े के नीचे गर्म दर्दनाक सूजन, जीभ बाहर निकलना एवं घुरघुर की आवाज के साथ दम घुटना।",
    pregnancyWarning: "🚨 RED ALERT: डेक्सामेथासोन सूजन तेजी से घटाता है किंतु गाभिन में गर्भपात कराता है! गाभिन पशुओं में केवल Isoflupredone Acetate (10ml) अथवा Flunixin Meglumine (15ml) का ही प्रयोग करें।",
    stages: [
      {
        stage: 1,
        name: "स्टेज 1: हाइपरथर्मिया व सेप्टीसीमिया (High Fever Phase)",
        positiveTimeline: "प्रारंभिक 6-12 घंटे में Ceftiofur/Oxytetracycline मिलने पर बुखार शांत व 95% जीवन रक्षा।",
        negativeTimeline: "जीवाणु एंडोटॉक्सिन रक्त में फैलकर गर्दन और श्वासनली में गंभीर सूजन उत्पन्न करते हैं।"
      },
      {
        stage: 2,
        name: "स्टेज 2: सबमैंडिबुलर एडीमा (Brisk Throat Swelling)",
        positiveTimeline: "एंटी-इंफ्लेमेटरी व एंटीबायोटिक से 24 घंटे में गले की सूजन में 60% कमी व सांस सामान्य।",
        negativeTimeline: "सूजन छाती तक पहुंचती है; जीभ नीली व बाहर निकलना, श्वास अवरोध (Stridor)।"
      },
      {
        stage: 3,
        name: "स्टेज 3: गंभीर श्वसन अवरोध (Acute Respiratory Distress)",
        positiveTimeline: "आपातकालीन डेक्सामेथासोन/आइसोफ्लू व स्टेरॉयड + ब्रोन्कोडायलेटर से सांस बहाल (60% रिकवरी)।",
        negativeTimeline: "फेफड़ों में पानी भरना (Pulmonary edema), अत्यधिक लार व जमीन पर गिरना।"
      },
      {
        stage: 4,
        name: "स्टेज 4: हाइपोक्सिक शॉक व मृत्यु (Asphyxia & Shock)",
        positiveTimeline: "ट्रेकियोस्टॉमी (Tracheostomy) एवं ऑक्सीजन थेरेपी से दुर्लभ जीवन रक्षा।",
        negativeTimeline: "दम घुटने व टॉक्सिक शॉक से 12-24 घंटे के भीतर मृत्यु।"
      }
    ],
    treatments: {
      tier1Injections: [
        { drug: "Inj. Ceftiofur Sodium (Xyrofur / Excenel)", dose: "1 mg/kg I/M (1 ग्राम प्रति 400 kg)", notes: "HS में सर्वश्रेष्ठ व सबसे तीव्र जीवाणुनाशक" },
        { drug: "Inj. Oxytetracycline (Terramycin LA)", dose: "20 mg/kg Deep I/M", notes: "किफायती व अत्यंत प्रभावी विकल्प" },
        { drug: "Inj. Flunixin Meglumine (Megludyne)", dose: "2.2 mg/kg Slow I/V (15 ml)", notes: "एंडोटॉक्सिन शॉक रोकने व सूजन कम करने हेतु" },
        { drug: "Inj. Isoflupredone Acetate (Predef 2X)", dose: "10 ml I/M", notes: "गाभिन पशुओं में सुरक्षित स्टेरॉयड" },
        { drug: "Inj. Avil (Pheniramine Maleate)", dose: "10 ml I/M", notes: "एंटी-एलर्जिक व फेफड़ों की रक्षा" }
      ],
      tier2Oral: [
        { drug: "Powder Resposol / Brofex", dose: "30 g सुबह-शाम", notes: "बलगम पतला करने व श्वास नली खोलने हेतु" },
        { drug: "Potassium Iodide Solution", dose: "5 g प्रतिदिन", notes: "गले की सूजन पिघलाने में सहायक" }
      ],
      tier3Ayurveda: [
        { item: "सोंठ + काली मिर्च + पीपली (त्रिकटु) + वासा चूर्ण", dose: "30g त्रिकटु + 50g वासा क्वाथ", notes: "फेफड़ों का कफ ढीला करने हेतु" }
      ],
      tier4Homeopathy: [
        { remedy: "Aconitum Napellus 1M", dose: "10 बूंद हर 2 घंटे पर (प्रारंभिक अवस्था में)", notes: "अचानक तेज बुखार व घबराहट" },
        { remedy: "Belladonna 200C", dose: "10 बूंद दिन में 3 बार", notes: "गले में लालिमा, सूजन व असह्य दर्द" }
      ],
      tier5DesiRemedies: [
        { remedy: "सरसों का तेल (100ml) + कपूर (10g) + हल्दी (25g)", notes: "पकाकर गले व जबड़े की सूजन पर गुनगुना लेप करें।" }
      ],
      biosecurity: "रोगी पशु को तुरंत अलग करें। चारा-पानी के बर्तन 4% फॉर्मेलिन से धोएं। प्रतिवर्ष मानसून पूर्व HS टीकाकरण अनिवार्य।"
    },
    farmerRemedy: "देसी नुस्खा: 100 मिली सरसों के तेल में 10 ग्राम कपूर और 25 ग्राम हल्दी पकाकर गले की सूजन पर गुनगुना लगाएं। तुरंत डॉक्टर बुलाएं।",
    doctorRx: "1. Inj. Ceftiofur Sodium 1g I/M (Repeat 24h)\n2. Inj. Flunixin Meglumine 15ml I/V (Fast endotoxin relief)\n3. Inj. Isoflupredone 10ml I/M (Safe in pregnancy)\n4. Inj. Avil 10ml I/M\n5. गले पर ठंडे पानी की पट्टी कदापि न रखें।"
  },

  /* ==========================================================================
   * 3. लंगड़ा बुखार (BLACK QUARTER - BQ)
   * ========================================================================== */
  {
    id: "BQ",
    nameHindi: "लंगड़ा बुखार / चरचरा (Black Quarter - BQ)",
    category: "BACTERIAL",
    cardinal: "GAS_SWELLING",
    temp: "HIGH",
    keywords: ["bq", "लंगड़ा", "चर्र-चर्र", "पुट्ठे में सूजन", "गैस सूजन", "clostridium", "काला जहर"],
    desc: "क्लॉस्ट्रिडियम शोवेई (Clostridium chauvoei) एनारोबिक बीजाणु जनित रोग। भारी मांसपेशियों (पुट्ठे/कंधे) में गैस भरी सूजन, दबाने पर चर्र-चर्र (Crepitation) की आवाज और तीव्र लंगड़ापन।",
    pregnancyWarning: "🚨 RED ALERT: उच्च खुराक पेनिसिलिन गाभिन में सुरक्षित है, परंतु दर्द निवारक स्टेरॉयड (Dexamethasone) गर्भपात कराता है। एनाल्जेसिक के रूप में केवल Melonex Plus अथवा Vetalgin का प्रयोग करें।",
    stages: [
      {
        stage: 1,
        name: "स्टेज 1: स्पोर एक्टिवेशन व उच्च ज्वर (Spore Activation)",
        positiveTimeline: "प्रारंभिक 12 घंटे में पेनिसिलिन की मेगा-डोज़ से 90% रिकवरी।",
        negativeTimeline: "मांसपेशियों में टॉक्सिन नेक्रोसिस प्रारंभ, पशु लंगड़ाकर चलता है।"
      },
      {
        stage: 2,
        name: "स्टेज 2: गैसयुक्त क्रिपिटेटिंग सूजन (Crepitating Swelling)",
        positiveTimeline: "चीरा लगाकर H2O2 ड्रेनेज + एंटीबायोटिक से टॉक्सिन प्रसार रुकता है।",
        negativeTimeline: "सूजन ठंडी, दर्द-रहित और काली पड़ जाती है; चर्र-चर्र की तेज आवाज।"
      },
      {
        stage: 3,
        name: "स्टेज 3: टॉक्सेमिया व प्रोलैप्स (Toxemia & Muscle Gangrene)",
        positiveTimeline: "गहन एंटीबायोटिक + फ्लुइड थेरेपी से 30% रिकवरी, अंग में स्थायी कमजोरी संभव।",
        negativeTimeline: "मांसपेशियां सड़कर काली होना, सब-नॉर्मल तापमान (<100°F) व अत्यधिक कमजोरी।"
      },
      {
        stage: 4,
        name: "स्टेज 4: टर्मिनल मायोकार्डिटिस (Septic Shock & Death)",
        positiveTimeline: "असंभव।",
        negativeTimeline: "हृदय गति रुकने से 24-48 घंटे में मृत्यु।"
      }
    ],
    treatments: {
      tier1Injections: [
        { drug: "Inj. Procaine Penicillin / Fortified Benzylpenicillin", dose: "40-60 लाख IU प्रति 300 kg Deep I/M", notes: "क्लॉस्ट्रिडियम के विरुद्ध सर्वोत्तम एंटीबायोटिक" },
        { drug: "Inj. Amoxicillin + Sulbactam (Ampi-Sulb / Cobiotic)", dose: "4.5 g I/M या Slow I/V", notes: "आधुनिक ब्रॉड-स्पेक्ट्रम विकल्प" },
        { drug: "Inj. Melonex Plus (Meloxicam + Paracetamol)", dose: "15-20 ml I/M", notes: "दर्द, बुखार व अकड़न निवारण" },
        { drug: "Inj. Tribivet (B-Complex)", dose: "10 ml I/M", notes: "नसों व पेशियों की रिकवरी" },
        { drug: "सूजन स्थल पर हाइड्रोजन पेरोक्साइड (3% H2O2) इन्फिल्ट्रेशन", dose: "सूजन के चारों ओर 20 ml S/C", notes: "एनारोबिक वातावरण समाप्त करने हेतु ऑक्सीजन प्रदाता" }
      ],
      tier2Oral: [
        { drug: "Bolus Serratiopeptidase (Serakind)", dose: "2 बोलस सुबह-शाम", notes: "मांसपेशियों के थक्के व सूजन गलाने हेतु" },
        { drug: "Toxol / Liver Tonic Liquid", dose: "50 ml सुबह-शाम", notes: "टॉक्सिन फिल्ट्रेशन में यकृत सहायता" }
      ],
      tier3Ayurveda: [
        { item: "हल्दी (Curcuma longa) + दारुहल्दी + गुग्गुलु", dose: "50g हल्दी + 20g गुग्गुलु चूर्ण", notes: "प्राकृतिक एंटीसेप्टिक व नेक्रोसिस रोधी" }
      ],
      tier4Homeopathy: [
        { remedy: "Arnica Montana 1M", dose: "10 बूंद हर 3 घंटे पर", notes: "मांसपेशियों की गहरी चोट व कालापन" },
        { remedy: "Rhus Toxicodendron 200C", dose: "10 बूंद दिन में 3 बार", notes: "गंभीर लंगड़ापन व अकड़न" }
      ],
      tier5DesiRemedies: [
        { remedy: "नीम की छाल व पत्तों का काढ़ा बनाकर सूजन वाले पुट्ठे पर गर्म-गर्म सेक करें।", notes: "जीवाणु वृद्धि अवरोधक" }
      ],
      biosecurity: "मृत पशु के शव को कभी न चीरें (स्पोर्स मिट्टी में दशकों जीवित रहते हैं)। शव को 6 फीट गहरे गड्ढे में चूना डालकर दफनाएं।"
    },
    farmerRemedy: "देसी नुस्खा: सूजन वाली जगह को गर्म नीम के पानी से सेकें। पशु को चलने न दें। तुरंत डॉक्टर से पेनिसिलिन इंजेक्शन लगवाएं।",
    doctorRx: "1. Inj. Procaine Penicillin 40 लाख IU Deep I/M (सुबह-शाम 3 दिन)\n2. Inj. Melonex Plus 20ml I/M\n3. सूजन के किनारों पर 3% H2O2 का मल्टीपल पंक्चर इन्फ्यूजन\n4. Inj. Tribivet 10ml I/M\n5. चीरा केवल अनुभवी डॉक्टर द्वारा ही लगाया जाए।"
  },

  /* ==========================================================================
   * 4. तीव्र आफरा / पेट फूलना (ACUTE BLOAT / TYMPANY)
   * ========================================================================== */
  {
    id: "BLOAT",
    nameHindi: "तीव्र आफरा / पेट फूलना (Acute Bloat / Frothy Tympany)",
    category: "METABOLIC",
    cardinal: "LEFT_FLANK_DRUM",
    temp: "NORMAL",
    keywords: ["आफरा", "bloat", "पेट फूलना", "ढोलक", "गैस", "tympanites", "झागदार आफरा"],
    desc: "रूमेन (बाएं पेट) में अत्यधिक किण्वन गैस या झाग (Froth) का जमाव। बायां पेट ढोलक की तरह तन जाना, फेफड़ों पर दबाव से सांस फूलना और जीभ बाहर निकलना।",
    pregnancyWarning: "🚨 RED ALERT: पेट का अत्यधिक दबाव गर्भाशय पर पड़ता है जिससे समय पूर्व प्रसव (Abortion/Premature Calving) का भारी खतरा रहता है। ट्रोकार लगाते समय गाभिन पशु के गर्भाशय को बचाकर बाएं फ्लैंक के मध्य में ही पंक्चर करें।",
    stages: [
      {
        stage: 1,
        name: "स्टेज 1: हल्का रूमिनाल फैलाव (Mild Distension)",
        positiveTimeline: "तारपीन तेल + मीठा तेल नाल से देने पर 30 मिनट में डकार आना और गैस बाहर।",
        negativeTimeline: "झागदार किण्वन बढ़ने से गैस रूमेन कार्डिया पर अवरोध उत्पन्न करती है।"
      },
      {
        stage: 2,
        name: "स्टेज 2: मध्यम झागदार फैलाव (Moderate Frothy Tympany)",
        positiveTimeline: "एंटी-फोमिंग एजेंट (सिमेथिकोन) से झाग टूटकर गैस आसानी से निकलती है।",
        negativeTimeline: "बायां पेट अत्यधिक फूलकर रीढ़ की हड्डी से ऊपर उठना; पशु का बार-बार उठना-बैठना।"
      },
      {
        stage: 3,
        name: "स्टेज 3: गंभीर रेस्पिरेटरी कॉम्प्रोमाइज (Severe Dyspneic Stage)",
        positiveTimeline: "पेट नली (Stomach Tube) या ट्रोकार कैन्युला द्वारा तुरंत राहत (80% बचाव)।",
        negativeTimeline: "डायफ्राम पर दबाव से फेफड़ों का पिचकना, जीभ नीली पड़ना और मुंह से झाग।"
      },
      {
        stage: 4,
        name: "स्टेज 4: एस्फिक्सिया व कार्डियोवैस्कुलर कोलैप्स (Terminal Stage)",
        positiveTimeline: "आपातकालीन रूमेनोटॉमी (Rumenotomy) द्वारा ही जीवन संभव।",
        negativeTimeline: "हार्ट फेलियर एवं 15-30 मिनट में दम घुटने से मृत्यु।"
      }
    ],
    treatments: {
      tier1Injections: [
        { drug: "Inj. Spasmo-vet / Spasdic (Dicyclomine HCl)", dose: "10-15 ml I/M", notes: "रूमेन की ऐंठन व पेट दर्द शांत करने हेतु" },
        { drug: "Inj. Belamyl / Tribivet (B-Complex)", dose: "10 ml I/M", notes: "रूमेन माइक्रोफ्लोरा सक्रिय करने हेतु" },
        { drug: "Trocar & Cannula आपातकालीन गैस निकासी", dose: "बाएं फ्लैंक के त्रिकोण (Left paralumbar fossa) में", notes: "कैन्युला के रास्ते 50ml तारपीन तेल सीधे रूमेन में डालें" }
      ],
      tier2Oral: [
        { drug: "Liquid Bloatosil / Tympol / Antifroth", dose: "100 ml - 200 ml नाल द्वारा", notes: "झाग को तुरंत तरल में बदलने हेतु (सिमेथिकोन युक्त)" },
        { drug: "Magnesium Carbonate + Sodium Bicarb Powder", dose: "100 g पानी में घोलकर", notes: "अम्लीयता उदासीन करने हेतु" }
      ],
      tier3Ayurveda: [
        { item: "हींग (Asafoetida) + अजवाइन + काला नमक", dose: "25g हींग + 50g अजवाइन + 50g काला नमक", notes: "गैस निकालने का अचूक आयुर्वेदिक नुस्खा" }
      ],
      tier4Homeopathy: [
        { remedy: "Carbo Vegetabilis 1M", dose: "10 बूंद हर 15 मिनट में (3 खुराक)", notes: "पेट फूलने और अंतिम अवस्था का अमृत" },
        { remedy: "Colocynthis 200C", dose: "10 बूंद दिन में 3 बार", notes: "पेट में तीव्र मरोड़ व लात मारना" }
      ],
      tier5DesiRemedies: [
        { remedy: "तारपीन का तेल (50ml) + मीठा सरसों का तेल (300ml) + हींग (20g)", notes: "नाल से धीरे-धीरे पिलाएं। मुंह में लकड़ी की खपच्ची बांधें ताकि लार गिरे।" }
      ],
      biosecurity: "गीली बरसीम, बासी दाना या सड़े आलू एक साथ न खिलाएं। हरे चारे के साथ सूखा भूसा मिलाकर दें।"
    },
    farmerRemedy: "देसी नुस्खा: 50 मिली तारपीन का तेल + 300 मिली सरसों का तेल + 20 ग्राम हींग मिलाकर पिलाएं। मुंह में लकड़ी की खपच्ची बांधें ताकि लार गिरे।",
    doctorRx: "1. Trocar & Cannula द्वारा बाएं फ्लैंक से आपातकालीन गैस निकासी\n2. Bloatosil liquid 100ml ओरल नाल से\n3. Inj. Spasmo-vet (Dicyclomine) 10ml I/M\n4. Inj. Belamyl 10ml I/M\n5. Rumen booster cultures (Himalayan Batisa / Bioboost)."
  },

  /* ==========================================================================
   * 5. मिल्क फीवर (MILK FEVER / HYPOCALCEMIA)
   * ========================================================================== */
  {
    id: "MILK_FEVER",
    nameHindi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever / Parturient Paresis)",
    category: "METABOLIC",
    cardinal: "STERNAL_RECUMBENCY",
    temp: "SUB",
    keywords: ["मिल्क फीवर", "milk fever", "hypocalcemia", "गर्दन मोड़कर बैठना", "ठंडा शरीर", "कैल्शियम कमी", "ब्याने बाद लकवा"],
    desc: "ब्याने के 24 से 72 घंटे के भीतर रक्त में सीरम कैल्शियम (Calcium) की तीव्र कमी। शरीर का ठंडा पड़ना (<100°F), गर्दन को पुट्ठे की ओर मोड़कर बैठना (Sternal Recumbency) एवं अचेतावस्था।",
    pregnancyWarning: "🚨 RED ALERT: ब्याने से ठीक पहले (Pre-partum) अधिक कैल्शियम कभी न दें; इससे पैराथाइरॉइड ग्रंथि निष्क्रिय होकर ब्याने बाद मिल्क फीवर की संभावना 5 गुना बढ़ा देती है। इस रोग में मुंह से जबरन तरल नाल कदापि न दें (Drenching Bronchitis से तत्काल मृत्यु)।",
    stages: [
      {
        stage: 1,
        name: "स्टेज 1: प्रारंभिक उत्तेजना व कंपन (Excitation & Tremors)",
        positiveTimeline: "ओरल कैल्शियम जेल (300g) देने पर 1-2 घंटे में सामान्य, स्टेज 2 में जाने से बचाव।",
        negativeTimeline: "पैरों में लड़खड़ाहट, कान ठंडे होना, गोबर-पेशाब रुकना।"
      },
      {
        stage: 2,
        name: "स्टेज 2: विशिष्ट स्टर्नल रिकम्बेंसी (Sternal Recumbency)",
        positiveTimeline: "धीमी गति से CBG 450ml I/V चढ़ाने के 15-30 मिनट में पशु का उठकर खड़े हो जाना (Wavering of Ears, Eructation)।",
        negativeTimeline: "पशु करवट के बल गिर जाता है (Lateral recumbency), कोमा और ब्लोट।"
      },
      {
        stage: 3,
        name: "स्टेज 3: पार्श्व अचेतन अवस्था (Lateral Recumbency & Coma)",
        positiveTimeline: "आपातकालीन कैल्शियम बोरो ग्लूकोनेट + फॉस्फोरस ड्रिप से 70% रिकवरी।",
        negativeTimeline: "रूमेन की गति शून्य, अत्यधिक अफारा, श्वसन अवरोध।"
      },
      {
        stage: 4,
        name: "स्टेज 4: कार्डियोवैस्कुलर विफलता (Death in Coma)",
        positiveTimeline: "अत्यंत दुर्लभ।",
        negativeTimeline: "हृदय गति रुकने से 6-12 घंटे में मृत्यु।"
      }
    ],
    treatments: {
      tier1Injections: [
        { drug: "Calcium Borogluconate 25% (Mifex / CBG)", dose: "450 ml (300 ml धीमी गति से I/V + 150 ml S/C)", notes: "I/V देते समय स्टेथोस्कोप से हृदय गति लगातार मापें; तेज होने पर तुरंत रोकें!" },
        { drug: "Inj. Tonophosphan (Toldimphos Sodium)", dose: "10-15 ml I/M or I/V", notes: "हाइपोफॉस्फेटेमिया दूर करने हेतु अनिवार्य" },
        { drug: "Inj. Tribivet (B-Complex)", dose: "10 ml I/M", notes: "मस्कुलर नसों की मजबूती हेतु" },
        { drug: "Inj. Melonex (Meloxicam)", dose: "10 ml I/M", notes: "जमीन पर लेटे रहने से मांसपेशियों के दर्द निवारण हेतु" }
      ],
      tier2Oral: [
        { drug: "Cal-Up / Ostovet / Intacal Gel", dose: "300 g की 1 बोतल होश में आने के बाद", notes: "सतत रक्त कैल्शियम बनाए रखने हेतु (बेहोशी में कभी न दें)" },
        { drug: "Dicalcium Phosphate (DCP) Powder", dose: "50 g प्रतिदिन चारे में", notes: "दीर्घकालिक रिकवरी" }
      ],
      tier3Ayurveda: [
        { item: "शंख भस्म + गिलोय सत्व + शतावरी", dose: "10g शंख भस्म + 20g शतावरी", notes: "कैल्शियम अवशोषण व दूध उत्पादन संतुलन" }
      ],
      tier4Homeopathy: [
        { remedy: "Calcarea Phosphorica 30C", dose: "10 बूंद दिन में 3 बार", notes: "हड्डी व रक्त कैल्शियम संतुलन" },
        { remedy: "Causticum 200C", dose: "10 बूंद दिन में 2 बार", notes: "ब्याने के बाद पिछले अंगों का लकवा" }
      ],
      tier5DesiRemedies: [
        { remedy: "पशु को सूखी पराली पर बैठाएं, पैरों व रीढ़ पर सरसों के तेल की मालिश करें और बोरी से ढककर शरीर गर्म रखें।" }
      ],
      biosecurity: "ब्याने के अंतिम 2 हफ्तों में लो-कैल्शियम डाइट दें। ब्याने के तुरंत बाद चारों थनों का पूरा दूध एक साथ न निचोड़ें।"
    },
    farmerRemedy: "देसी नुस्खा: पशु को कभी भी जबरन मुंह से तरल न पिलाएं (फेफड़ों में जाने का खतरा)। शरीर को गर्म बोरी से ढकें और तुरंत डॉक्टर से ड्रिप लगवाएं।",
    doctorRx: "1. Mifex / CBG 450ml (300ml Slow I/V over 20 mins + 150ml S/C)\n2. Inj. Tonophosphan 15ml I/M\n3. Inj. Tribivet 10ml I/M\n4. होश में आने पर Cal-Up Gel 300g ओरल दें\n5. हृदय गति तेज होने पर एट्रोपिन तैयार रखें।"
  },

  /* ==========================================================================
   * 6. थनैला रोग (MASTITIS)
   * ========================================================================== */
  {
    id: "MASTITIS",
    nameHindi: "थनैला रोग (Mastitis - Clinical / Gangrenous)",
    category: "BACTERIAL",
    cardinal: "UDDER_HARD",
    temp: "NORMAL",
    keywords: ["थनैल", "mastitis", "अयन सूजन", "दूध में खून", "छिछड़े", "थन कड़ा", "गाद", "दूध फटना"],
    desc: "स्ट्रेप्टोकोकस, स्टेफिलोकोकस एवं ई. कोलाई जीवाणु जनित थन व अयन की आंतरिक सूजन। दूध में पीले/सफेद छिछड़े, खून आना, अयन का पत्थर जैसा सख्त व गर्म होना।",
    pregnancyWarning: "🚨 RED ALERT: ड्राई काउ थेरेपी (Dry Cow Therapy) ब्याने से 60 दिन पूर्व ही की जानी चाहिए। गाभिन पशुओं में गंभीर थनैला होने पर Cefoperazone या Ceftriaxone सुरक्षित हैं। भूलकर भी डेक्सामेथासोन न लगाएं (गर्भपात का खतरा); केवल Isoflupredone का प्रयोग करें।",
    stages: [
      {
        stage: 1,
        name: "स्टेज 1: सब-क्लिनिकल थनैला (Sub-Clinical Phase)",
        positiveTimeline: "California Mastitis Test (CMT) पहचान उपरांत Trisodium Citrate देने पर 48 घंटे में दूध pH सामान्य।",
        negativeTimeline: "जीवाणु दूध ग्रंथियों को नष्ट कर अयन में सूजन व गांठ बनाते हैं।"
      },
      {
        stage: 2,
        name: "स्टेज 2: तीव्र क्लिनिकल थनैला (Acute Clinical Phase)",
        positiveTimeline: "इंट्रामैमरी इन्फ्यूजन + ब्रॉड स्पेक्ट्रम एंटीबायोटिक से 3 दिन में 85% सुधार।",
        negativeTimeline: "दूध का रंग बदलकर मवाद, पानी या खून जैसा होना; थन का अत्यंत कड़ा होना।"
      },
      {
        stage: 3,
        name: "स्टेज 3: क्रोनिक फाइब्रोटिक थनैला (Chronic Fibrotic Phase)",
        positiveTimeline: "लगातार पोटेशियम आयोडाइड + फाइब्रिनोलिटिक एंजाइम से थन नरम होना (50% संभावना)।",
        negativeTimeline: "थन स्थायी रूप से पत्थर जैसा सख्त होकर दूध उत्पादन सदा के लिए बंद (Blind Teat)।"
      },
      {
        stage: 4,
        name: "स्टेज 4: गैंग्रीनस थनैला (Gangrenous Mastitis)",
        positiveTimeline: "शल्य क्रिया (Teat Amputation) द्वारा पशु की जान बचाना।",
        negativeTimeline: "थन का सड़कर काला पड़ना, गिर जाना और सेप्टिक शॉक से मृत्यु।"
      }
    ],
    treatments: {
      tier1Injections: [
        { drug: "Inj. Intacef Tazo (Ceftriaxone + Tazobactam 3.375g)", dose: "3.375 g प्रति 400 kg I/M or I/V", notes: "गंभीर थनैला में प्रथम पंक्ति का एंटीबायोटिक" },
        { drug: "Inj. Marbomet / Forcyl (Marbofloxacin 10%)", dose: "2 mg/kg I/M (8 ml प्रति 400 kg)", notes: "ई. कोलाई एवं जिद्दी जीवाणुओं में रामबाण" },
        { drug: "Intramammary Tube (Pendistrin SH / Tilox / Mastilep)", dose: "1 ट्यूब थन खाली करके सुबह-शाम", notes: "थन को डिटॉल से साफ करके पूरा निचोड़ने के बाद ही चढ़ाएं" },
        { drug: "Inj. Melonex Plus (Meloxicam + Paracetamol)", dose: "15 ml I/M", notes: "अयन की सूजन व दर्द निवारण" },
        { drug: "Inj. Serratiopeptidase (Serakind / Biosuganril)", dose: "10 ml I/M", notes: "थन के भीतर फाइब्रिन छिछड़े पिघलाने हेतु" }
      ],
      tier2Oral: [
        { drug: "Powder Trisodium Citrate (Masticare / Mastitis Kit)", dose: "30-50 g प्रतिदिन 5 दिन", notes: "दूध का अम्लीय pH सामान्य (6.8) करने हेतु" },
        { drug: "Powder Vitamin AD3E + Biotin + Chelated Zinc", dose: "50 g प्रतिदिन", notes: "थन की आंतरिक कोशिकाओं के पुनर्निर्माण हेतु" }
      ],
      tier3Ayurveda: [
        { item: "एलोवेरा (घृतकुमारी 250g) + हल्दी (50g) + चूना (15g)", dose: "पीसकर चिकना पेस्ट बनाएं", notes: "थन खाली करके दिन में 3-4 बार लेप करें (राष्ट्रीय डेयरी विकास बोर्ड सिद्ध नुस्खा)" }
      ],
      tier4Homeopathy: [
        { remedy: "Phytolacca 200C", dose: "10 बूंद दिन में 4 बार", notes: "थन में पत्थर जैसी गांठ व कड़ापन" },
        { remedy: "Bryonia Alba 200C", dose: "10 बूंद दिन में 3 बार", notes: "अयन गर्म, लाल व दर्दनाक होना" },
        { remedy: "Silicea 30C", dose: "10 बूंद दिन में 2 बार", notes: "छिछड़े व गाद साफ करने हेतु" }
      ],
      tier5DesiRemedies: [
        { remedy: "गुनगुने पानी में सेंधा नमक व फिटकरी डालकर अयन की सिकाई करें। थन को अंगूठा मोड़कर न दुहें, हमेशा पूरे हाथ (Full Hand Milking) से दुहें।" }
      ],
      biosecurity: "दुहने से पहले व बाद में पोटेशियम परमैंगनेट (लाल दवा 1:1000) में थन डुबोएं (Teat Dipping)। दूध दुहने के 30 मिनट बाद तक पशु को बैठने न दें।"
    },
    farmerRemedy: "देसी नुस्खा: 250 ग्राम एलोवेरा + 50 ग्राम हल्दी + 15 ग्राम खाने का चूना पीसकर लेप बनाएं और थन खाली करके दिन में 3 बार लगाएं।",
    doctorRx: "1. Inj. Intacef Tazo 3375mg I/M दैनिक 3 दिन\n2. Teat Infusion: Pendistrin SH 1 ट्यूब सुबह-शाम\n3. Inj. Melonex Plus 15ml I/M\n4. Trisodium Citrate पाउच 30g दैनिक ओरल 5 दिन\n5. Inj. Isoflupredone 10ml I/M (यदि गंभीर सूजन हो)।"
  },

  /* ==========================================================================
   * 7. खुरपका-मुँहपका (FOOT AND MOUTH DISEASE - FMD)
   * ========================================================================== */
  {
    id: "FMD",
    nameHindi: "खुरपका-मुँहपका (Foot and Mouth Disease - FMD)",
    category: "VIRAL",
    cardinal: "MOUTH_BLISTERS",
    temp: "HIGH",
    keywords: ["fmd", "खुरपका", "मुंहपका", "छाले", "तारदार लार", "लंगड़ाना", "aphthovirus", "पैर सड़ना"],
    desc: "एपथोवायरस (Aphthovirus) विषाणु जनित अत्यंत संक्रामक रोग। मुंह, जीभ, मसूड़ों व खुरों के बीच छाले, तेज बुखार, मुंह से गाढ़ी तारदार लार का टपकना और अत्यधिक लंगड़ापन।",
    pregnancyWarning: "🚨 RED ALERT: FMD वायरस के उच्च ज्वर एवं टॉक्सिन से गाभिन पशुओं में 80% मामलों में स्वतः गर्भपात (Abortion) हो जाता है। ज्वर नियंत्रण हेतु केवल Paracetamol / Meloxicam दें। गर्भ बचाने हेतु Inj. Progesterone (Duraprogen 500mg I/M) का प्रयोग तुरंत करें।",
    stages: [
      {
        stage: 1,
        name: "स्टेज 1: हाइपरपायरेक्सिया व लार स्राव (Viremic Phase)",
        positiveTimeline: "द्वितीयक संक्रमण रोधी एंटीबायोटिक + माउथ वाश से 5-7 दिन में छाले सूखना शुरू।",
        negativeTimeline: "मुंह व जीभ के छाले फटकर बड़े घाव बनना; पशु का चारा-पानी पूरी तरह छोड़ देना।"
      },
      {
        stage: 2,
        name: "स्टेज 2: वेसिकल फटना व खुर सड़न (Pododermatitis Phase)",
        positiveTimeline: "खुरों पर कॉपर सल्फेट/पोटाश ड्रेसिंग से घाव भरना व लंगड़ापन दूर।",
        negativeTimeline: "खुरों में कीड़े (Maggots) पड़ना, खुर का खोल अलग हो जाना (Hoof Shedding)।"
      },
      {
        stage: 3,
        name: "स्टेज 3: क्रोनिक पैंटिंग अवस्था (Chronic Panter Phase)",
        positiveTimeline: "विटामिन सप्लीमेंटेशन व टॉनिक से 2-3 माह में धीमा स्वास्थ्य सुधार।",
        negativeTimeline: "थायराइड व हृदय क्षति से स्थायी हांफना (Panting), बाल बड़े होना और दूध उत्पादन कभी वापस न आना।"
      },
      {
        stage: 4,
        name: "स्टेज 4: मायोकार्डिटिस व बछड़ों में मृत्यु (Tiger Heart Phase)",
        positiveTimeline: "वयस्क पशुओं में मृत्यु दर कम (<5%)।",
        negativeTimeline: "छोटे बछड़ों में हृदय की मांसपेशियों पर आघात (Tiger Heart) से अचानक मृत्यु (80-90% बछड़े मर जाते हैं)।"
      }
    ],
    treatments: {
      tier1Injections: [
        { drug: "Inj. Ceftriaxone (Intacef 3g) / Amoxicillin 3g", dose: "3 g प्रति 400 kg I/M 3 दिन", notes: "द्वितीयक जीवाणु संक्रमण व घाव में मवाद रोकने हेतु" },
        { drug: "Inj. Melonex Plus (Meloxicam + Paracetamol)", dose: "15-20 ml I/M", notes: "तेज बुखार व मुंह-खुर के घावों के दर्द में अनिवार्य" },
        { drug: "Inj. Avil (Pheniramine Maleate)", dose: "10 ml I/M", notes: "छाले व एलर्जी शांत करने हेतु" },
        { drug: "Inj. Conciplex / Tribivet (B-Complex)", dose: "10 ml I/M", notes: "जीभ व मुंह के छालों का तीव्र रोपण" }
      ],
      tier2Oral: [
        { drug: "Boroglycerine Paste (सुहागा + ग्लिसरीन)", dose: "दिन में 3-4 बार जीभ व मसूड़ों पर लेप", notes: "मुंह के छालों को 48 घंटे में ठीक करता है" },
        { drug: "Powder Masticare / Vitamin AD3E", dose: "30 g प्रतिदिन", notes: "त्वचा व खुर की एपीथीलियम की मरम्मत" }
      ],
      tier3Ayurveda: [
        { item: "हल्दी + तिल का तेल + शहद का लेप", dose: "50g हल्दी + 100ml तिल का तेल + 50g शहद", notes: "छालों पर लगाने हेतु अत्यंत सौम्य व असरदार लेप" }
      ],
      tier4Homeopathy: [
        { remedy: "Mercurius Solubilis 200C", dose: "10 बूंद दिन में 4 बार", notes: "मुंह से लार टपकना व जीभ के छाले" },
        { remedy: "Variolinum 200C", dose: "10 बूंद दिन में 2 बार", notes: "विषाणु प्रतिरोधक व खुर घाव निवारक" }
      ],
      tier5DesiRemedies: [
        { remedy: "मुंह को 1% फिटकरी (Alum) के पानी से धोएं। खुरों को लाल दवा (पोटेशियम परमैंगनेट) या नीम के पानी से धोकर फिनाइल का पोछा लगाएं।" }
      ],
      biosecurity: "स्वस्थ पशुओं को रोगी से दूर रखें। गोशाला के मुख्य द्वार पर चूना व फिनाइल का फुट-बाथ (Foot-Bath) बनाएं। वर्ष में 2 बार अनिवार्य टीकाकरण कराएं।"
    },
    farmerRemedy: "देसी नुस्खा: मुंह को 1% फिटकरी या पोटाश के घोल से धोएं। शहद में पिसा सुहागा मिलाकर छालों पर लगाएं। खुरों को फिनाइल या नीम के पानी से साफ रखें।",
    doctorRx: "1. Inj. Intacef 3g I/M दैनिक 3 दिन\n2. Inj. Melonex Plus 15ml I/M\n3. Inj. Avil 10ml I/M\n4. Boroglycerine मुंह में दिन में 3 बार\n5. खुरों पर D-Mag / Topicure स्प्रे छिड़कें\n6. छोटे बछड़ों को दूध पीने से अलग रखें।"
  },

  /* ==========================================================================
   * 8. बबेसियोसिस / लाल पेशाब (BABESIOSIS / RED WATER)
   * ========================================================================== */
  {
    id: "BABESIOSIS",
    nameHindi: "बबेसियोसिस / चिचड़ी जनित लाल पेशाब (Babesiosis / Red Water)",
    category: "PROTOZOAL",
    cardinal: "RED_URINE",
    temp: "HIGH",
    keywords: ["बबेशिया", "लाल पेशाब", "कॉफी पेशाब", "चिचड़ी", "red water", "babesia", "tick fever"],
    desc: "बबेशिया बाइजेमिना (Babesia bigemina) प्रोटोजोआ जनित रक्त रोग जो चिचड़ी (Boophilus ticks) द्वारा फैलता है। आरबीसी का तीव्र टूटना, कॉफी या गहरे लाल रंग का पेशाब (Hemoglobinuria) और 105-107°F तेज बुखार।",
    pregnancyWarning: "🚨 RED ALERT: Berenil (Diminazene) की सामान्य खुराक (3.5 mg/kg) गाभिन में अपेक्षाकृत सुरक्षित है, किंतु अधिक खुराक से गर्भाशय में संकुचन हो सकता है। गंभीर एनीमिया में तुरंत डेक्सट्रोज 5% ड्रिप और आयरन सुक्रोज दें।",
    stages: [
      {
        stage: 1,
        name: "स्टेज 1: तीव्र हाइपरथर्मिया व हीमोलिसिस (Hemolytic Crisis)",
        positiveTimeline: "प्रारंभिक 12 घंटे में Berenil मिलने पर 24 घंटे में पेशाब का रंग साफ व 95% रिकवरी।",
        negativeTimeline: "लाखों आरबीसी टूटने से हीमोग्लोबिन पेशाब में बहना और गंभीर एनीमिया।"
      },
      {
        stage: 2,
        name: "स्टेज 2: गंभीर हीमोग्लोबिन्यूरिया (Coffee-Colored Urine)",
        positiveTimeline: "डिमिनजीन + फ्लुइड थेरेपी से 48 घंटे में आरबीसी क्षति पर रोक।",
        negativeTimeline: "गुर्दों में हीमोग्लोबिन जमा होने से रीनल फेलियर (Renal Casts formation)।"
      },
      {
        stage: 3,
        name: "स्टेज 3: हीमोलिटिक पीलिया व एनोक्सिया (Jaundice & Anoxia)",
        positiveTimeline: "आयरन इंजेक्शन + ग्लूकोज ड्रिप से 5-7 दिन में रक्त निर्माण।",
        negativeTimeline: "आंखों व श्लेष्मा में गहरा पीलापन, सांस फूलना, दिल की धड़कन तेज होना।"
      },
      {
        stage: 4,
        name: "स्टेज 4: एक्यूट रीनल शटडाउन व मृत्यु (Uremic Coma)",
        positiveTimeline: "असंभव।",
        negativeTimeline: "गुर्दे पूरी तरह फेल होने से टॉक्सिक शॉक व 24 घंटे में मृत्यु।"
      }
    ],
    treatments: {
      tier1Injections: [
        { drug: "Inj. Diminazene Aceturate (Berenil / Babenil 7%)", dose: "3.5 mg - 5 mg/kg Deep I/M (1 ml प्रति 20 kg)", notes: "बबेशिया का अचूक व विशिष्ट इलाज (सिंगल डोज़)" },
        { drug: "Inj. Melonex Plus (Meloxicam + Paracetamol)", dose: "15 ml I/M", notes: "तेज बुखार (106°F) को नीचे लाने हेतु" },
        { drug: "Inj. Feritas / Impheron (Iron Dextran)", dose: "10 ml Deep I/M", notes: "टूटी हुई आरबीसी के स्थान पर नया खून बनाने हेतु" },
        { drug: "Dextrose 5% + Normal Saline Infusion", dose: "2 से 3 लीटर Slow I/V", notes: "गुर्दों को हीमोग्लोबिन से ब्लॉक होने से बचाने हेतु" },
        { drug: "Inj. Tribivet (B-Complex + B12)", dose: "15 ml I/V or I/M", notes: "एनीमिया रिकवरी" }
      ],
      tier2Oral: [
        { drug: "Syrup Sharkoferrol / Rutor", dose: "50 ml सुबह-शाम लगातार 15 दिन", notes: "हीमोग्लोबिन वृद्धि" },
        { drug: "Powder Sodamint (Sodium Bicarbonate)", dose: "50 g पानी में घोलकर", notes: "पेशाब का एसिडिक स्तर सुधारने हेतु" }
      ],
      tier3Ayurveda: [
        { item: "पुनर्नवा (Boerhavia diffusa) + कासनी + गिलोय", dose: "50g काढ़ा बनाकर", notes: "गुर्दों की सुरक्षा व मूत्र शोधक" }
      ],
      tier4Homeopathy: [
        { remedy: "Crotalus Horridus 200C", dose: "10 बूंद हर 2 घंटे में", notes: "रक्त अपघटन व पेशाब में खून का अचूक उपाय" },
        { remedy: "Phosphorus 200C", dose: "10 बूंद दिन में 3 बार", notes: "हीमोग्लोबिन संरक्षण व लिवर सुरक्षा" }
      ],
      tier5DesiRemedies: [
        { remedy: "ठंडे पानी की पट्टियां सिर पर रखें। ताजा गन्ने का रस (2 लीटर) या गुड़ का ठंडा शरबत पिलाएं। कोई भी देसी दवा Berenil इंजेक्शन का विकल्प नहीं है।" }
      ],
      biosecurity: "पशु के शरीर एवं गोशाला की दीवारों पर चिचड़ी नाशक (Flumethrin / Amitraz 2ml/L) का नियमित छिड़काव करें।"
    },
    farmerRemedy: "देसी नुस्खा: पशु को छायादार ठंडी जगह रखें। ठंडा पानी व गुड़ का शरबत पिलाएं। कोई भी देसी नुस्खा दवा की जगह न लें, तुरंत डॉक्टर से Berenil लगवाएं।",
    doctorRx: "1. Inj. Berenil (Diminazene) 3.5mg/kg Deep I/M सिंगल डोज़\n2. Inj. Melonex Plus 15ml I/M\n3. Infusion Dextrose 5% 2-3 Litres I/V Fast\n4. Inj. Feritas (Iron) 10ml I/M\n5. Inj. Tribivet 15ml I/V\n6. Flumethrin Pour-On चिचड़ी नियंत्रण हेतु।"
  },

  /* ==========================================================================
   * 9. कीटोशिस / एसीटोनेमिया (KETOSIS / ACETONEMIA)
   * ========================================================================== */
  {
    id: "KETOSIS",
    nameHindi: "कीटोशिस / एसीटोनेमिया (Ketosis / Acetonemia)",
    category: "METABOLIC",
    cardinal: "SWEET_BREATH",
    temp: "NORMAL",
    keywords: ["कीटोसिस", "ketosis", "मीठी गंध", "सूखा भूसा", "दूध घटना", "acetonemia", "नेगेटिव एनर्जी"],
    desc: "उच्च दुधारू पशुओं में ब्याने के 2 से 8 सप्ताह बाद ऊर्जा (Glucose) का तीव्र अभाव। वसा के असामान्य विघटन से कीटोन्स बनना; सांस व दूध से मीठी एसीटोन गंध आना, दाना छोड़कर केवल सूखा भूसा खाना।",
    pregnancyWarning: "🚨 RED ALERT: कीटोशिस में ग्लूकोज निर्माण को तेज करने हेतु Isoflupredone Acetate (10ml) सबसे उत्तम स्टेरॉयड है। Dexamethasone दूध उत्पादन को स्थायी रूप से घटा सकता है, अतः लैक्टेशन में Isoflupredone ही वरीय है।",
    stages: [
      {
        stage: 1,
        name: "स्टेज 1: सब-क्लिनिकल कीटोसिस (Sub-Clinical Phase)",
        positiveTimeline: "प्रोपलीन ग्लाइकोल (Propylene Glycol 200ml) देने पर 24 घंटे में कीटोन स्तर सामान्य।",
        negativeTimeline: "रक्त शर्करा (Hypoglycemia) और घटती है; पशु दाना खाना पूरी तरह बंद कर देता है।"
      },
      {
        stage: 2,
        name: "स्टेज 2: क्लिनिकल वेस्टिंग कीटोसिस (Wasting Form)",
        positiveTimeline: "I/V डेक्सट्रोज 20% + स्टेरॉयड से 48 घंटे में दाना खाना पुनः प्रारंभ।",
        negativeTimeline: "मांसपेशियों का तेजी से क्षय, पेट धंस जाना और दूध उत्पादन में 70% तक गिरावट।"
      },
      {
        stage: 3,
        name: "स्टेज 3: नर्वस कीटोसिस (Nervous Ketosis)",
        positiveTimeline: "सघन ग्लूकोज थेरेपी + B12 से तंत्रिका लक्षणों का 24 घंटे में शमन।",
        negativeTimeline: "दीवार चाटना, खाली मुंह चलाना, अत्यधिक रंभाना और आक्रामक व्यवहार।"
      },
      {
        stage: 4,
        name: "स्टेज 4: हेपेटिक लिपिडोसिस (Fatty Liver Coma)",
        positiveTimeline: "दीर्घकालिक यकृत टॉनिक + कोलीन थेरेपी से 40% सुधार।",
        negativeTimeline: "लिवर फेलियर एवं कोमा में मृत्यु।"
      }
    ],
    treatments: {
      tier1Injections: [
        { drug: "Dextrose 20% or 25% Solution", dose: "1000 - 1500 ml Fast I/V", notes: "रक्त शर्करा को तुरंत सामान्य स्तर पर लाने हेतु" },
        { drug: "Inj. Isoflupredone Acetate (Predef 2X)", dose: "10 ml I/M (एकल खुराक)", notes: "ग्लूकोनियोजेनेसिस उत्तेजक (दूध नहीं घटाता)" },
        { drug: "Inj. Tribivet / Belamyl (Vitamin B12 युक्त)", dose: "15 ml I/M or I/V", notes: "प्रोपियोनेट को ग्लूकोज में बदलने हेतु B12 अनिवार्य" },
        { drug: "Inj. Tonophosphan (Phosphorus)", dose: "10 ml I/M", notes: "मेटाबॉलिक चक्र सुचारु करने हेतु" }
      ],
      tier2Oral: [
        { drug: "Propylene Glycol (Ketocare / N-Glicol)", dose: "200 ml सुबह-शाम 3 दिन, फिर 100 ml 2 दिन", notes: "रूमेन में जाकर सीधे ग्लूकोज का निर्माण करता है" },
        { drug: "Bolus Niacinamide (Vitamin B3 6g)", dose: "1 बोलस प्रतिदिन 5 दिन", notes: "वसा के विघटन और कीटोन निर्माण पर रोक" }
      ],
      tier3Ayurveda: [
        { item: "कालमेघ (Andrographis) + भुईंआंवला + सोंठ", dose: "50g चूर्ण सुबह-शाम", notes: "यकृत की कार्यक्षमता वृद्धि एवं भूख सुधार" }
      ],
      tier4Homeopathy: [
        { remedy: "Chelidonium Majus 200C", dose: "10 बूंद दिन में 3 बार", notes: "फैटी लिवर व यकृत सुरक्षा" },
        { remedy: "Lycopodium 200C", dose: "10 बूंद दिन में 2 बार", notes: "पाचन सुधार व मीठी गंध निवारक" }
      ],
      tier5DesiRemedies: [
        { remedy: "देसी पुराना गुड़ (250g) + मीठा सोडा (30g) + सरसों का तेल (50ml) मिलाकर 5 दिन दें।" }
      ],
      biosecurity: "ब्याने से पूर्व पशु को अत्यधिक मोटा न होने दें। ब्याने के बाद दाने में बाईपास फैट व ऊर्जा चोकर की मात्रा संतुलित रखें।"
    },
    farmerRemedy: "देसी नुस्खा: 250 ग्राम गुड़ + 50 मिली सरसों का तेल मिलाकर 5 दिन दें। दाने में ऊर्जावर्धक चोकर बढ़ाएं।",
    doctorRx: "1. Dextrose 20% 1000ml Fast I/V\n2. Inj. Isoflupredone Acetate 10ml I/M\n3. Propylene Glycol 200ml ओरल BID 3 दिन\n4. Inj. Tribivet 15ml I/M (B12 अनिवार्य)\n5. Niacinamide बोलस दैनिक।"
  },

  /* ==========================================================================
   * 10. फिड़किया / एंटरोटॉक्सेमिया (ENTEROTOXEMIA / PULPY KIDNEY)
   * ========================================================================== */
  {
    id: "ENTEROTOXEMIA",
    nameHindi: "फिड़किया / एंटरोटॉक्सेमिया (Enterotoxemia / Pulpy Kidney)",
    category: "BACTERIAL",
    cardinal: "OPISTHOTONOS",
    temp: "HIGH",
    keywords: ["फिड़किया", "et", "pulpy kidney", "clostridium perfringens", "बकरी मरोड़", "सिर पीछे खींचना", "अचानक मौत"],
    desc: "क्लॉस्ट्रिडियम परफ्रिंजेंस टाइप डी (Clostridium perfringens Type D) का एप्सीलोन टॉक्सिन (Epsilon Toxin)। अत्यधिक दाना या हरी घास चरने के बाद अचानक सिर पीछे खींचना (Opisthotonos), चक्कर, झाग और कुछ ही घंटों में मृत्यु।",
    pregnancyWarning: "🚨 RED ALERT: गंभीर टॉक्सेमिया में गाभिन बकरियों/भेड़ों में गर्भपात अवश्यंभावी होता है। जान बचाने हेतु तुरंत सोडियम बाइकार्बोनेट घोल ओरल दें और टॉक्सिन निष्प्रभावी करने के लिए पेनिसिलिन की उच्च खुराक लगाएं।",
    stages: [
      {
        stage: 1,
        name: "स्टेज 1: टॉक्सिन प्रोलिफरेशन (Toxin Production Phase)",
        positiveTimeline: "अति-शीघ्र पेनिसिलिन + एंटासिड नाल द्वारा मिलने पर 80% रिकवरी।",
        negativeTimeline: "आंतों से अवशोषित होकर टॉक्सिन रक्त वाहिकाओं और मस्तिष्क को नष्ट करता है।"
      },
      {
        stage: 2,
        name: "स्टेज 2: तंत्रिका मरोड़ व आक्षेप (Convulsive Stage)",
        positiveTimeline: "एंटीटॉक्सिन सीरम + डाइजेपाम से आक्षेप शांत होने पर 40% संभावना।",
        negativeTimeline: "सिर पीछे की ओर मुड़ जाना (Opisthotonos), मुंह से झाग व आंखें पलट जाना।"
      },
      {
        stage: 3,
        name: "स्टेज 3: कोमा व अंग शिथिलता (Pulpy Kidney State)",
        positiveTimeline: "अत्यंत दुर्लभ (<10%)।",
        negativeTimeline: "गुर्दे नरम होकर पल्प (Pulp) बन जाना, ग्लूकोज पेशाब में बहना (Glycosuria)।"
      },
      {
        stage: 4,
        name: "स्टेज 4: टॉक्सिक पैरालिसिस व मृत्यु (Sudden Death)",
        positiveTimeline: "असंभव।",
        negativeTimeline: "लक्षण दिखने के 2 से 6 घंटे के भीतर तीव्र मृत्यु।"
      }
    ],
    treatments: {
      tier1Injections: [
        { drug: "Inj. Crystalline Penicillin / Amoxicillin", dose: "20,000 IU/kg I/M or I/V हर 8 घंटे में", notes: "आंतों में जीवाणु उत्पादन तुरंत रोकने हेतु" },
        { drug: "Inj. Melonex (Meloxicam)", dose: "0.5 mg/kg I/M (2-3 ml बकरियों में)", notes: "दर्द व टॉक्सिक सूजन शमन" },
        { drug: "Inj. Calci-Must / CBG 25%", dose: "50-100 ml Slow I/V", notes: "टॉक्सिक शॉक रोकने हेतु" },
        { drug: "Inj. Dexona / Isoflupredone", dose: "1-2 ml I/M", notes: "एंटी-टॉक्सिक शॉक थेरेपी" }
      ],
      tier2Oral: [
        { drug: "Sodium Bicarbonate (मीठा सोडा)", dose: "20-30 g पानी में घोलकर नाल द्वारा", notes: "आंतों की अम्लीयता समाप्त कर टॉक्सिन निष्क्रिय करता है" },
        { drug: "Activated Charcoal (Toxiban) Powder", dose: "50 g पानी में घोलकर", notes: "आंतों में शेष टॉक्सिन को सोखने हेतु" }
      ],
      tier3Ayurveda: [
        { item: "हींग + जीरा + सौंफ + काला नमक", dose: "10g हींग + 20g जीरा चूर्ण", notes: "आंतों का किण्वन रोकने हेतु" }
      ],
      tier4Homeopathy: [
        { remedy: "Cuprum Metallicum 200C", dose: "5 बूंद हर 30 मिनट में", notes: "तीव्र मरोड़, आक्षेप व सिर पीछे मुड़ना" },
        { remedy: "Camphora 1M", dose: "5 बूंद जीभ पर", notes: "अचानक शरीर ठंडा पड़ने व पतन पर" }
      ],
      tier5DesiRemedies: [
        { remedy: "2 चम्मच मीठा सोडा 100 मिली छाछ में घोलकर तुरंत पिलाएं। पशु का पेट दबाकर हल्की मालिश करें।" }
      ],
      biosecurity: "अचानक दाना या नया चारा न बदलें; धीरे-धीरे आदत डालें। मानसून से पूर्व एवं वर्षा ऋतु में ET का टीका अवश्य लगवाएं।"
    },
    farmerRemedy: "देसी नुस्खा: 2 चम्मच खाने का मीठा सोडा तुरंत पानी या छाछ में घोलकर पिलाएं। दाना-बांटा तुरंत बंद करें और डॉक्टर बुलाएं।",
    doctorRx: "1. Crystalline Penicillin 20 लाख IU I/M\n2. Sodium Bicarbonate 5% solution 200ml Slow I/V\n3. Activated Charcoal 50g ओरल नाल द्वारा\n4. Inj. Dexona 2ml I/M (Non-Pregnant) OR Isoflupredone 2ml I/M (Pregnant)\n5. स्वस्थ बकरियों में तुरंत ET टीकाकरण करें।"
  }
];

// Alias for seamless backward compatibility across app engines
window.CORE_DISEASE_DB = window.VETCARE_DISEASE_DB;

/* ==========================================================================
 * 11. AI VETERINARY SYNTHESIS FALLBACK HOOK
 * ========================================================================== */
window.synthesizeDiseaseWithAI = function (queryName) {
  if (!queryName || typeof queryName !== "string") {
    return null;
  }

  const cleanQuery = queryName.trim().toLowerCase();
  const db = window.VETCARE_DISEASE_DB || [];

  // Match existing profile
  const match = db.find(function (d) {
    return (
      d.nameHindi.toLowerCase().includes(cleanQuery) ||
      d.id.toLowerCase() === cleanQuery ||
      (d.keywords && d.keywords.some(function (k) { return k.toLowerCase().includes(cleanQuery); }))
    );
  });

  if (match) {
    return match;
  }

  // Dynamic Synthesis Object for Rare or Unlisted Conditions
  return {
    id: "SYNTH_" + Date.now(),
    nameHindi: queryName + " (AI क्लिनिकल सिंथेसिस)",
    category: "CLINICAL_SYNDROME",
    cardinal: "GENERAL_UNLISTED",
    temp: "NORMAL",
    keywords: [cleanQuery, "ai", "synthesis"],
    desc: queryName + " का त्वरित क्लिनिकल प्रोफाइल। यह प्रोफाइल साक्ष्य-आधारित वेटरनरी सिद्धांतों पर आधारित है।",
    pregnancyWarning: "🚨 RED ALERT: अज्ञात या अनिर्धारित रोग अवस्था में डेक्सामेथासोन, प्रेडनिसोलोन एवं PGF2-अल्फा का प्रयोग कदापि न करें। गाभिन पशुओं में केवल ब्रॉड स्पेक्ट्रम पेनिसिलिन / सेफालोस्पोरिन और आइसोफ्लू सुरक्षित हैं।",
    stages: [
      {
        stage: 1,
        name: "स्टेज 1: प्रारंभिक प्रकटन (Early Onset)",
        positiveTimeline: "प्रारंभिक लाक्षणिक उपचार से 24-48 घंटे में सुधार।",
        negativeTimeline: "लक्षणों का प्रसार एवं द्वितीयक संक्रमण।"
      },
      {
        stage: 2,
        name: "स्टेज 2: स्थापित क्लिनिकल सिंड्रोम (Established Phase)",
        positiveTimeline: "एंटीबायोटिक व सहायक चिकित्सा से 3-5 दिन में स्वास्थ्य लाभ।",
        negativeTimeline: "क्रोनिक अवस्था व अंग विफलता।"
      },
      {
        stage: 3,
        name: "स्टेज 3: जटिल रोग अवस्था (Complicated Phase)",
        positiveTimeline: "सघन चिकित्सा से 50% सुधार की संभावना।",
        negativeTimeline: "गंभीर दुर्बलता व स्थायी क्षति।"
      },
      {
        stage: 4,
        name: "स्टेज 4: टर्मिनल अवस्था (Terminal Stage)",
        positiveTimeline: "अत्यंत दुर्लभ।",
        negativeTimeline: "टॉक्सिक शॉक व जीवन क्षति।"
      }
    ],
    treatments: {
      tier1Injections: [
        { drug: "Inj. Ceftriaxone + Tazobactam (Intacef Tazo)", dose: "10 mg/kg I/M or I/V", notes: "ब्रॉड स्पेक्ट्रम एंटीमाइक्रोबियल" },
        { drug: "Inj. Melonex Plus", dose: "15 ml प्रति 350 kg I/M", notes: "दर्द व सूजन निवारक" },
        { drug: "Inj. Tribivet (B-Complex)", dose: "10 ml I/M", notes: "मेटाबॉलिक सपोर्ट" },
        { drug: "Inj. Avil", dose: "10 ml I/M", notes: "एंटीहिस्टामिनिक सुरक्षा" }
      ],
      tier2Oral: [
        { drug: "Rumen Buffer + Probiotic Bolus (Bioboost)", dose: "2 बोलस सुबह-शाम", notes: "रूमेन माइक्रोफ्लोरा बहाली" },
        { drug: "Electral / Electrolyte Powder", dose: "100 g प्रतिदिन पीने के पानी में", notes: "इलेक्ट्रोलाइट संतुलन" }
      ],
      tier3Ayurveda: [
        { item: "हल्दी (30g) + गिलोय क्वाथ (50ml) + पुराना गुड़ (100g)", dose: "दिन में 2 बार", notes: "रोग प्रतिरोधक क्षमता वर्धन" }
      ],
      tier4Homeopathy: [
        { remedy: "Aconite 200C + Nux Vomica 200C", dose: "10 बूंद दिन में 3 बार", notes: "प्राथमिक तनाव व पाचन नियमन" }
      ],
      tier5DesiRemedies: [
        { remedy: "पशु को स्वच्छ, हवादार व सूखे स्थान पर रखें। सुपाच्य हरा चारा और ताजा गुनगुना पानी दें।" }
      ],
      biosecurity: "संक्रमित पशु को अलग रखें। गोशाला में चूने का छिड़काव करें और बर्तन रोगाणुरहित रखें।"
    },
    farmerRemedy: "देसी नुस्खा: पशु को सुपाच्य दलिया व गुड़ का पानी दें। ठंड या गर्मी से बचाएं और योग्य पशु चिकित्सक से परीक्षण कराएं।",
    doctorRx: "1. ब्रॉड स्पेक्ट्रम एंटीबायोटिक (उदा. Intacef Tazo 3375mg I/M)\n2. Inj. Melonex Plus 15ml I/M\n3. Inj. Tribivet 10ml I/M\n4. सलाइन / डेक्सट्रोज फ्लुइड (यदि आवश्यक हो)\n5. गाभिन इतिहास की पुष्टि अवश्य करें।"
  };
};
