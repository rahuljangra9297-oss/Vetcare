/**
 * Vetcare AI OS - Clinical & Smart Dairy Assistant
 * Core Application Engine & Controller (app.js)
 * 
 * Features:
 * - Defensive data handling & null-safe rendering (Khata, OPD, Inventory, Search)
 * - Modern Google Gemini API (gemini-2.0-flash / gemini-2.5-flash) Integration
 * - 60-Minute Active Clinical Session Timer
 * - Dual-Bank UPI Gateway (SBI & PNB) with Dynamic QR Code Generation
 * - 3-Way Clinical Diagnosis Engine (Matrix, Rapid Search, Directory)
 * - Shaeffer's Animal Weight & Drug Dosage Calculator
 * - Smart Breeding (A.I.) & Ration Balancer
 */

// =============================================================================
// 1. GLOBAL STATE & MASTER CONFIGURATION
// =============================================================================
const DEFAULT_CONFIG = {
  adminPin: "9297",
  payeeName: "Rahul Jangra",
  monthlyPrice: 199,
  annualPrice: 1499,
  sbiUpi: "rahuljangra9297@oksbi",
  sbiAccount: "405901000123",
  sbiIfsc: "SBIN0001234",
  pnbUpi: "rahuljangra9297-1@okicici",
  pnbAccount: "01230001009876",
  pnbIfsc: "PUNB0123400",
  appTitle: "Vetcare",
  logoUrl: "",
  appTagline: "पशु स्वास्थ्य निदान, 3-स्तरीय क्लिनिकल डिसीजन इंजन एवं संपूर्ण स्मार्ट डेयरी समाधान",
  adminWhatsApp: "9876543210"
};

let AppConfig = { ...DEFAULT_CONFIG };
let currentRole = "FARMER";
let activeDiagnosisMode = "SYMPTOMS";
let activeBank = "SBI";
let selectedPlan = "MONTHLY";
let sessionSecondsRemaining = 3600; // 60-Minute Session
let sessionTimerInterval = null;

let matrixSelected = {
  temp: null,
  cardinal: "ALL",
  secondary: []
};

// Safe helper for strings to avoid undefined.toLowerCase() crashes
const safeLower = (val) => (val === undefined || val === null ? "" : String(val)).toLowerCase().trim();
const safeStr = (val) => (val === undefined || val === null ? "" : String(val)).trim();

// =============================================================================
// 2. EVIDENCE-BASED CLINICAL DATABASE (22+ DISEASES)
// =============================================================================
const CORE_DISEASE_DB = [
  {
    id: "HS",
    nameHindi: "गलघोंटू (Hemorrhagic Septicemia - HS)",
    category: "BACTERIAL",
    cardinal: "NECK_SWELLING",
    temp: "HIGH",
    keywords: ["गलघोंटू", "hs", "pasteurella", "गले में सूजन", "घुर-घुर", "तेज बुखार"],
    desc: "पाश्चुरेला मल्टोसीडा जीवाणु जनित अति-घातक संक्रामक रोग। गले, जबड़े के नीचे गर्म दर्दनाक सूजन, जीभ बाहर लटकना और सांस में घुर-घुर की तेज आवाज।",
    farmerRemedy: "देसी प्राथमिक उपचार: 100ml सरसों के तेल में 10g कपूर और 25g पिसी हल्दी पकाकर गुनगुना लेप गले की सूजन पर लगाएं। पशु को हवादार स्थान पर रखें। तुरंत चिकित्सक बुलाएं।",
    doctorRx: "1. Inj. Ceftiofur Sodium (1 mg/kg) I/M अथवा Inj. Enrofloxacin (5 mg/kg) I/M\n2. Inj. Flunixin Meglumine (2.2 mg/kg) I/V या Inj. Melonex Plus 15-20 ml I/M\n3. Inj. Dexamethasone 5-10 ml I/M (गाभिन में Inj. Isoflupredone 10 ml)\n4. Inj. Avil (Pheniramine) 10 ml I/M\n5. Dextrose Saline 5% (1-2 Ltr) I/V यदि निर्जलीकरण हो।"
  },
  {
    id: "BQ",
    nameHindi: "लंगड़ा बुखार / चरचरा (Black Quarter - BQ)",
    category: "BACTERIAL",
    cardinal: "GAS_SWELLING",
    temp: "HIGH",
    keywords: ["bq", "लंगड़ा", "चर्र-चर्र", "पुट्ठे में सूजन", "गैस सूजन", "clostridium"],
    desc: "क्लॉस्ट्रिडियम शोवेई जनित रोग। पुट्ठे, कंधे व जांघ की भारी मांसपेशियों में गैस भरी सूजन जिसे दबाने पर चर्र-चर्र (crepitation) ध्वनि आती है।",
    farmerRemedy: "देसी प्राथमिक उपचार: सूजन पर गर्म सेंक करें (नीम पत्ती पानी)। पशु को चलने न दें। तुरंत एलोपैथिक एंटीबायोटिक आवश्यक है।",
    doctorRx: "1. Inj. Procaine / Benzathine Penicillin (40 लाख IU) अथवा Amoxicillin + Sulbactam (4.5g) I/M\n2. Inj. Melonex Plus 15-20 ml I/M\n3. Inj. Tribivet / Belamyl 10 ml I/M\n4. सूजन वाली जगह पर छोटे चीरे लगाकर 3% H2O2 से एंटीसेप्टिक फ्लशिंग।"
  },
  {
    id: "FMD",
    nameHindi: "खुरपका-मुंहपका (Foot and Mouth Disease - FMD)",
    category: "VIRAL",
    cardinal: "MOUTH_BLISTERS",
    temp: "HIGH",
    keywords: ["fmd", "खुरपका", "मुंहपका", "छाले", "तारदार लार", "लंगड़ाना", "picorna"],
    desc: "अति-संक्रामक पिकोर्ना विषाणु जनित रोग। मुंह, जीभ, मसूड़ों और खुरों के बीच दर्दनाक छाले, तारदार टपकती लार और लंगड़ापन।",
    farmerRemedy: "देसी उपचार: मुंह को 1% पोटाश (KMNO4) या फिटकरी पानी से धोएं। शहद + पिसा सुहागा (टंकण भस्म) छालों पर लगाएं। खुरों को नीम काढ़ा या फिनाइल पानी से धोएं।",
    doctorRx: "1. सेकेण्डरी संक्रमण रोकथाम: Inj. Intacef (Ceftriaxone 3g) I/M 3 दिन\n2. Inj. Melonex Plus 15 ml I/M\n3. Inj. Avil 10 ml I/M\n4. Inj. Tribivet (B-Complex) 10 ml I/M\n5. खुरों पर D-Mag / Topicure एंटीसेप्टिक स्प्रे।"
  },
  {
    id: "MASTITIS",
    nameHindi: "थनैल रोग (Mastitis)",
    category: "BACTERIAL",
    cardinal: "UDDER_HARD",
    temp: "NORMAL",
    keywords: ["थनैल", "mastitis", "अयन सूजन", "दूध में खून", "छिछड़े", "थन कड़ा", "staph"],
    desc: "स्तन ग्रंथि व थन की सूजन। दूध में गाढ़े छिछड़े, थक्के, खून या पानी जैसा स्राव। अयन गर्म, लाल और छूने पर अत्यंत दर्दनाक।",
    farmerRemedy: "देसी उपचार: 250g एलोवेरा गूदा + 50g हल्दी + 15g खाने का चूना पीसकर चिकना लेप बनाएं। थन का पूरा दूध खाली करके दिन में 3 बार लेप लगाएं।",
    doctorRx: "1. Inj. Intacef Tazo (3375 mg) अथवा Inj. Cefoperazone 3g I/M या I/V\n2. Intramammary Infusion (उदा. Mastilep / Pendistrin SH) थन खाली करके चढ़ाएं\n3. Inj. Melonex Plus 15 ml I/M\n4. Inj. Serratiopeptidase 10 ml\n5. Trisodium Citrate पाउडर 30g ओरल दैनिक 4 दिन।"
  },
  {
    id: "MILK_FEVER",
    nameHindi: "मिल्क फीवर / हाइपोकैल्सीमिया (Milk Fever)",
    category: "METABOLIC",
    cardinal: "STERNAL_RECUMBENCY",
    temp: "SUB",
    keywords: ["मिल्क फीवर", "hypocalcemia", "गर्दन मोड़ना", "ठंडा शरीर", "calcium deficiency"],
    desc: "ब्याने के 24-72 घंटे भीतर सीरम कैल्शियम में तीव्र गिरावट। पशु का तापमान सब-नॉर्मल (<100°F), कान ठंडे और गर्दन सीने पर मोड़कर बैठना।",
    farmerRemedy: "सावधानी: पशु को मुंह से जबरन कोई तरल न पिलाएं (Drenching Pneumonia का खतरा)। शरीर को कंबल या बोरी से ढकें। तुरंत कैल्शियम ड्रिप जरूरी है।",
    doctorRx: "1. Calcium Borogluconate 25% (CBG / Mifex) 450 ml (300 ml धीमी गति से I/V + 150 ml S/C)\n2. I/V देते समय दिल की धड़कन (Auscultation) पर लगातार नजर रखें\n3. Inj. Tonophosphan 10 ml I/M\n4. Inj. Tribivet 10 ml I/M\n5. चेतना आने पर Cal-Up / Ostovet Gel 300g ओरल।"
  },
  {
    id: "KETOSIS",
    nameHindi: "कीटोसिस / एसीटोनेमिया (Ketosis)",
    category: "METABOLIC",
    cardinal: "SWEET_BREATH",
    temp: "NORMAL",
    keywords: ["कीटोसिस", "ketosis", "मीठी गंध", "सूखा भूसा", "energy deficit"],
    desc: "ऊर्जा व ग्लूकोज की कमी से रक्त में कीटोन बॉडीज का बढ़ना। सांस, दूध और मूत्र से मीठी एसीटोन जैसी गंध, केवल सूखा चारा खाना।",
    farmerRemedy: "देसी उपचार: 250g गुड़ + 50ml मीठा तेल + 25g पिसी सौंठ गुनगुने पानी में मिलाकर 5 दिन दें। दाने में चोकर की मात्रा बढ़ाएं।",
    doctorRx: "1. Dextrose 20% या 25% (1000 ml) I/V\n2. Inj. Isoflupredone acetate 10 ml I/M\n3. Propylene Glycol 200 ml ओरल दिन में दो बार 4 दिन तक\n4. Inj. Tribivet 10 ml I/M\n5. Bolus Niacinamide 2 गोली रोज।"
  },
  {
    id: "BLOAT",
    nameHindi: "अफारा / रूमिनल टिम्पनी (Bloat / Tympany)",
    category: "METABOLIC",
    cardinal: "LEFT_FLANK_DRUM",
    temp: "NORMAL",
    keywords: ["अफारा", "bloat", "पेट फूलना", "ढोलक", "गैस", "tympany"],
    desc: "रूमेन में अत्यधिक गैस व झाग का संचय। बायां कोख (Left Flank) ढोलक की तरह तन जाना, मुंह से जीभ बाहर निकलना और बेचैनी।",
    farmerRemedy: "देसी उपचार: 50ml तारपीन का तेल + 300ml सरसों का तेल + 20g हींग घोलकर नाल से दें। मुंह में लकड़ी की खपच्ची बांधें ताकि मुंह से लार गिरे और डकार आए।",
    doctorRx: "1. बाएं फ्लैंक से Trocar & Cannula द्वारा आपातकालीन गैस निकासी\n2. Bloatosil / Tympol suspension 100 ml ओरल\n3. Inj. Spasmovet (Dicyclomine) 10-15 ml I/M\n4. Inj. Belamyl 10 ml I/M\n5. Rumen booster sachets (Bioboost / Himalayan Batisa)."
  },
  {
    id: "THEILERIOSIS",
    nameHindi: "थायलेरियासिस (Theileriosis - Tick Fever)",
    category: "PROTOZOAL",
    cardinal: "LYMPH_SWELLING",
    temp: "HIGH",
    keywords: ["theileria", "थायलेरिया", "लिम्फ नोड सूजन", "चिचड़ी बुखार", "tick fever"],
    desc: "हाइलोमा चिचड़ी जनित इंट्रा-सेलुलर प्रोटोजोआ रोग। प्री-स्कैपुलर लिम्फ नोड में सूजन, तेज बुखार (105-107°F), एनीमिया और आंखों में पीलापन।",
    farmerRemedy: "देसी देखभाल: पशु को धूप से बचाएं। गिलोय का काढ़ा और गुड़ का पानी दें। चिचड़ियों के खात्मे हेतु बाड़े में चूना छिड़कें।",
    doctorRx: "1. Inj. Buparvaquone (Butalex / Zubion) 2.5 mg/kg (1 ml/20 kg) Deep I/M सिंगल डोज\n2. Inj. Oxytetracycline LA (20 mg/kg) I/M\n3. Inj. Melonex Plus 15 ml I/M\n4. Inj. Feritas (Iron Sorbitol) 10 ml I/M\n5. Flumethrin 1% pour-on चिचड़ी नियंत्रण हेतु।"
  },
  {
    id: "BABESIOSIS",
    nameHindi: "बबेशियोसिस / लाल पेशाब (Babesiosis / Red Water)",
    category: "PROTOZOAL",
    cardinal: "RED_URINE",
    temp: "HIGH",
    keywords: ["बबेशिया", "लाल पेशाब", "कॉफी पेशाब", "चिचड़ी", "red water", "babesia"],
    desc: "आरबीसी परजीवी जनित रोग। कॉफी या गहरे लाल रंग का पेशाब (Haemoglobinuria), 105°F+ बुखार, गंभीर एनीमिया और तेज नाड़ी।",
    farmerRemedy: "देसी देखभाल: पशु को पूर्ण आराम दें। गुड़, पालक व मेथी का पानी दें। बिना चिकित्सक के देरी न करें।",
    doctorRx: "1. Inj. Diminazene Aceturate (Berenil) 3.5-5 mg/kg Deep I/M\n2. Inj. Melonex Plus 15 ml I/M\n3. Dextrose Normal Saline (DNS) 1000-2000 ml I/V\n4. Inj. Feritas (Iron) 10 ml I/M\n5. Inj. Tribivet 10 ml I/M।"
  },
  {
    id: "ANAPLASMOSIS",
    nameHindi: "एनाप्लास्मोसिस (Anaplasmosis / Gall Sickness)",
    category: "PROTOZOAL",
    cardinal: "SEVERE_JAUNDICE",
    temp: "HIGH",
    keywords: ["anaplasma", "पीलिया", "एनाप्लास्मा", "jaundice", "कब्ज"],
    desc: "रक्त परजीवी रोग जिसमें लाल पेशाब नहीं होता, परंतु अत्यधिक पीलिया, सूखा कड़ा गोबर, तेज बुखार और श्लेष्मा झिल्लियों का पीला पड़ना दिखाई देता है।",
    farmerRemedy: "देसी देखभाल: गन्ने का रस या 250g गुड़ पानी में घोलकर दें। लीवर टॉनिक प्राथमिक रूप से दें।",
    doctorRx: "1. Inj. Oxytetracycline LA (20 mg/kg) Deep I/M अथवा Inj. Doxycycline\n2. Inj. Melonex Plus 15 ml I/M\n3. Inj. Belamyl 10 ml I/M\n4. Liver Extract Inj. (Liv-52 / Brotone) 10 ml I/M\n5. Laxative Drench (Liquid Paraffin / Magnesium Sulphate)।"
  },
  {
    id: "PPR",
    nameHindi: "पीपीआर / बकरी प्लेग (PPR - Peste des Petits Ruminants)",
    category: "VIRAL",
    cardinal: "MOUTH_EROSION_DIARRHEA",
    temp: "HIGH",
    keywords: ["ppr", "बकरी प्लेग", "दस्त", "मुंह में छाले", "goat plague", "morbillivirus"],
    desc: "भेड़-बकरियों का जानलेवा विषाणु रोग। मुंह में छाले, बदबूदार दस्त, आंखों व नाक से गाढ़ा मवाद जैसा स्राव और गंभीर डिहाइड्रेशन।",
    farmerRemedy: "देसी उपचार: बकरियों को ORS का घोल, चावल की मांड और सौंफ का पानी लगातार पिलाएं। मुंह के छाले हल्दी-शहद से साफ करें।",
    doctorRx: "1. Inj. Enrofloxacin (Enrocin) 2.5 ml I/M या Ceftriaxone 500 mg I/M\n2. Inj. Melonex Plus 3 ml I/M\n3. Inj. Avil 2 ml I/M\n4. DNS / RL Subcutaneously या धीमी I/V ड्रिप\n5. Neblon / Diaroak पाउडर 15g ओरल।"
  },
  {
    id: "ET",
    nameHindi: "फिड़किया / एंटरोटॉक्सिमिया (Enterotoxemia - ET)",
    category: "BACTERIAL",
    cardinal: "OPISTHOTONOS",
    temp: "NORMAL",
    keywords: ["फिड़किया", "enterotoxemia", "et", "दाना खाने बाद", "सिर पीछे खींचना", "pulpy kidney"],
    desc: "क्लॉस्ट्रिडियम परफ्रिन्जेंस टाइप डी जनित रोग। नए हरे चारे या अधिक दाना खाने के बाद बकरियों व भेड़ों में अचानक सिर पीछे खींचना, आक्षेप और त्वरित मृत्यु।",
    farmerRemedy: "देसी उपचार: दाना तुरंत बंद करें। मीठा सोडा (Sodium Bicarbonate) 10g गुनगुने पानी में पिलाएं।",
    doctorRx: "1. अति-तीव्र रोग में तुरंत Inj. Crystalline Penicillin 10-20 लाख IU I/M\n2. Inj. Dexamethasone 2 ml I/M\n3. Inj. Spasmovet 3 ml I/M\n4. Activated Charcoal 20g drench\n5. पूर्व-बचाव हेतु वार्षिक ET वैक्सीनेशन।"
  },
  {
    id: "ANTHRAX",
    nameHindi: "एंथ्रेक्स / गिल्टी रोग (Anthrax / Splenic Fever)",
    category: "BACTERIAL",
    cardinal: "TAR_BLOOD",
    temp: "HIGH",
    keywords: ["एंथ्रेक्स", "गिल्टी रोग", "काला खून", "anthrax", "bacillus", "zoonotic"],
    desc: "बैसिलस एंथ्रासिस जनित अति-घातक जूनोटिक रोग। प्राकृतिक छेदों (नाक, गुदा, योनि) से बिना जमा हुआ गाढ़ा काला तार जैसा खून रिसना। शव को चीरना सख्त मना है।",
    farmerRemedy: "सख्त चेतावनी: शव को कतई न काटें/चीरें। शव को 6 फीट गहरे गड्ढे में चूने के साथ दफनाएं। मानव में संक्रमण का भारी खतरा।",
    doctorRx: "1. प्रारंभिक अवस्था में: Inj. Procaine Penicillin (60-80 लाख IU) Deep I/M\n2. Inj. Streptomycin 5g I/M\n3. Inj. Flunixin Meglumine 15 ml I/V\n4. संबंधित क्षेत्र में तुरंत आपातकालीन रिंग वैक्सीनेशन और क्वारंटाइन।"
  },
  {
    id: "SURRA",
    nameHindi: "सर्रा रोग (Surra / Trypanosomiasis)",
    category: "PROTOZOAL",
    cardinal: "CIRCLING_HEAD_PRESSING",
    temp: "HIGH",
    keywords: ["surra", "सर्रा", "चक्कर काटना", "दीवार से सिर", "trypanosoma", "tabanid fly"],
    desc: "ट्रिपैनोसोमा इवान्साई जनित प्रोटोजोआ रोग (डंस मक्खी वाहक)। गोल चक्कर काटना, दीवार से सिर सटाकर खड़े रहना, रुक-रुक कर बुखार और आंखों में मोतियाबिंद जैसा धुंधलापन।",
    farmerRemedy: "देसी देखभाल: पशु को सुरक्षित बांधें ताकि गिरने पर चोट न लगे। मक्खी नियंत्रण हेतु नीम का धुआं करें।",
    doctorRx: "1. Inj. Quinapyramine Sulfate + Chloride (Triquin) 1 vial (2.5g) S/C\n2. अथवा Inj. Diminazene Aceturate (Berenil) 7 mg/kg Deep I/M\n3. Inj. Tribivet 15 ml I/M\n4. Inj. Melonex 15 ml I/M\n5. Mannitol 20% I/V यदि मस्तिष्क में सूजन (Cerebral edema) हो।"
  },
  {
    id: "RABIES",
    nameHindi: "रेबीज / जलतंक (Rabies / Hydrophobia)",
    category: "VIRAL",
    cardinal: "HYDROPHOBIA_BELL",
    temp: "NORMAL",
    keywords: ["रेबीज", "rabies", "रंभाना", "पागल कुत्ता", "लाड़ टपकना", "lyssavirus"],
    desc: "रेबीज विषाणु जनित 100% घातक न्यूरोट्रोपिक रोग। अस्वाभाविक लगातार रंभाना, अत्यधिक लार गिरना, आक्रामकता या पक्षाघात और पानी पीने में असमर्थता।",
    farmerRemedy: "सावधानी: पशु को अलग सुरक्षित बाड़े में बंद करें। लार के संपर्क में आने से बचें। यदि लार लगी हो तो साबुन से 15 मिनट धोएं और स्वयं ARV टीका लगवाएं।",
    doctorRx: "1. लक्षण प्रकट होने के उपरांत कोई उपचार संभव नहीं (No Clinical Cure)\n2. कुत्ते के काटने पर तुरंत: घाव को बहते पानी व कार्बोलिक साबुन से 15 मिनट धोएं\n3. Post-Bite Prophylaxis: Anti-Rabies Vaccine (Raksharab) दिन 0, 3, 7, 14, 28 पर S/C या I/M।"
  },
  {
    id: "COLIC",
    nameHindi: "उदरशूल / पेट दर्द (Colic)",
    category: "METABOLIC",
    cardinal: "ROLLING_PAWING",
    temp: "NORMAL",
    keywords: ["colic", "पेट दर्द", "जमीन पर लोटना", "लात मारना", "उदरशूल"],
    desc: "आंतों में ऐंठन, गैस या रुकावट। पेट की ओर मुड़कर देखना, पिछले पैरों से पेट पर लात मारना, जमीन पर लोटना और उठना-बैठना।",
    farmerRemedy: "देसी उपचार: 50g अजवाइन + 25g काला नमक + 10g हींग गुनगुने पानी में पीसकर नाल से पिलाएं। पेट पर गुनगुने पानी की सिकाई करें।",
    doctorRx: "1. Inj. Spasmovet / Melonex Plus (Dicyclomine + Paracetamol) 15-20 ml I/M\n2. Inj. Analgin (Novalgin) 15 ml I/M\n3. Inj. Belamyl 10 ml I/M\n4. Liquid Paraffin 500 ml + Castor Oil 100 ml ओरल (यदि कब्ज हो)।"
  },
  {
    id: "ROP",
    nameHindi: "जेर रुकना (Retention of Placenta - ROP)",
    category: "METABOLIC",
    cardinal: "HANGING_PLACENTA",
    temp: "NORMAL",
    keywords: ["rop", "जेर रुकना", "placenta", "ब्याने के बाद", "सड़ांध"],
    desc: "प्रसव के 8-12 घंटे बाद भी गर्भाशय से जेर का स्वतः बाहर न निकलना। बदबूदार स्राव और बाद में गर्भाशय संक्रमण का खतरा।",
    farmerRemedy: "देसी उपचार: 250g गुड़ + 50g सौंठ + 25g अजवाइन + 50g बांस की पत्तियां पानी में उबालकर गुनगुना काढ़ा पिलाएं। जेर पर वजन न बांधें।",
    doctorRx: "1. जबरन हाथ से न खींचें।\n2. Intrauterine Pessaries: Utrovet / Furea 4 बोलस गर्भाशय में रखें\n3. Inj. Replanta / Utrasafe liquid 100 ml ओरल\n4. Inj. Intacef 3g I/M संक्रमण रोकने हेतु\n5. Inj. Melonex Plus 15 ml I/M।"
  },
  {
    id: "PROLAPSE",
    nameHindi: "प्रोलैप्स / फूल दिखाना (Uterine/Vaginal Prolapse)",
    category: "METABOLIC",
    cardinal: "PROTRUDING_MASS",
    temp: "NORMAL",
    keywords: ["prolapse", "फूल दिखाना", "कांच निकलना", "गर्भाशय बाहर", "ब्याने से पहले"],
    desc: "प्रसव पूर्व या प्रसव उपरांत योनि या पूरे गर्भाशय का मांसल भाग बाहर निकल आना। बैठने पर जोर लगाना।",
    farmerRemedy: "देसी प्राथमिक उपचार: बाहर निकले अंग को 1% पोटाश या ठंडे पानी से साफ करें। साफ गीले सूती कपड़े से ढकें। पशु का पिछला हिस्सा ऊंचा रखें।",
    doctorRx: "1. Epidural Anesthesia: 2% Lignocaine Hydrochloride (5-8 ml) Sacrococcygeal space में\n2. अंग को धोकर, बर्फ से सूजन कम करके भीतर री-पोजिशन करें\n3. Buhner's / Rope Truss Suturing\n4. Inj. Progesterone 750 mg (यदि प्रसव पूर्व हो) अथवा Inj. Oxytocin (यदि प्रसव पश्चात हो)\n5. Inj. Melonex Plus 15 ml I/M।"
  },
  {
    id: "PNEUMONIA",
    nameHindi: "निमोनिया / फेफड़ों की सूजन (Pneumonia)",
    category: "BACTERIAL",
    cardinal: "DYSPNEA_WHEEZING",
    temp: "HIGH",
    keywords: ["निमोनिया", "pneumonia", "खांसी", "छाती में घुर-घुर", "dyspnea", "wheezing"],
    desc: "फेफड़ों में संक्रमण। तेज बुखार, बलगमयुक्त कष्टकारी खांसी, छाती में स्टेथोस्कोप लगाने पर घुर-घुर या सीटी जैसी आवाज (rales) और नाक से स्राव।",
    farmerRemedy: "देसी उपचार: नीलगिरी (Eucalyptus) तेल की भाप दें। 20g अदरक रस + 20g शहद + 5g काली मिर्च का चूर्ण दिन में दो बार चटाएं।",
    doctorRx: "1. Inj. Marbofloxacin (Marbocyl) 2 mg/kg I/M अथवा Ceftiofur Sodium 1g I/M\n2. Inj. Melonex Plus 15 ml I/M\n3. Inj. Deriphyllin 10 ml I/M सांस की रुकावट खोलने हेतु\n4. Inj. Avil 10 ml I/M\n5. Muco-shed / Resposan syrup 50 ml ओरल।"
  },
  {
    id: "FOOT_ROT",
    nameHindi: "खुर सड़न (Foot Rot / Interdigital Necrobacillosis)",
    category: "BACTERIAL",
    cardinal: "FOOT_ROT_SMELL",
    temp: "NORMAL",
    keywords: ["foot rot", "खुर सड़न", "खुर में मवाद", "दुर्गंध", "लंगड़ाना"],
    desc: "फ्यूसोबैक्टीरियम नेक्रोफोरम जनित खुरों के बीच सड़ांध। खुरों की क्लेफ्ट में घाव, तीव्र दुर्गंधयुक्त स्राव और गंभीर लंगड़ापन।",
    farmerRemedy: "देसी उपचार: खुरों को 5% नीला थोथा (Copper Sulphate) के घोल में 5 मिनट रखें। हल्दी और नीम तेल का पेस्ट घाव में भरें। बाड़ा सूखा रखें।",
    doctorRx: "1. घाव की डिब्राइडमेंट (सफाई) व मृत ऊतकों को काटना\n2. Inj. Oxytetracycline LA 20 ml Deep I/M\n3. Inj. Melonex Plus 15 ml I/M\n4. Topicure Spray खुरों के बीच दिन में दो बार\n5. Zinc Sulphate 5g सप्लीमेंट दैनिक।"
  },
  {
    id: "SCOURS",
    nameHindi: "बछड़ों का सफेद दस्त (Calf Scours / Colibacillosis)",
    category: "BACTERIAL",
    cardinal: "MOUTH_EROSION_DIARRHEA",
    temp: "HIGH",
    keywords: ["scours", "दस्त", "calf diarrhea", "ई कोलाई", "बछड़ा दस्त"],
    desc: "ई. कोलाई या रोटावायरस जनित नवजात बछड़ों का गंभीर दस्त। सफेद या पीले रंग का पानी जैसा पतला दस्त, डिहाइड्रेशन और आंखें धंस जाना।",
    farmerRemedy: "देसी उपचार: इलेक्ट्रोल / ORS घोल 1 लीटर पानी में घोलकर थोड़ा-थोड़ा बार-बार पिलाएं। छाछ में भुना जीरा व बेलगिरी चूर्ण दें।",
    doctorRx: "1. Inj. Amikacin (Amika-vet) 5-7 mg/kg I/M अथवा Inj. Enrofloxacin\n2. Inj. Spasmovet 2 ml I/M\n3. DNS + Sodium Bicarbonate 500 ml धीमी गति से I/V\n4. Bolus Streptomagma / Neblon 1/2 गोली ओरल\n5. Gut probiotic suspension।"
  },
  {
    id: "WOODEN_TONGUE",
    nameHindi: "लकड़ी जैसी जीभ (Wooden Tongue / Actinobacillosis)",
    category: "BACTERIAL",
    cardinal: "MOUTH_BLISTERS",
    temp: "NORMAL",
    keywords: ["wooden tongue", "actinobacillus", "कठोर जीभ", "जीभ सूजन"],
    desc: "एक्टिनोबैसिलस लिग्नियरेसी जनित रोग। जीभ अत्यंत कठोर, सूजी हुई व लकड़ी जैसी बन जाती है जिससे पशु चारा चबाने व निगलने में असमर्थ होता है।",
    farmerRemedy: "देसी देखभाल: पशु को मुलायम दलिया या मांड दें। मुंह को गुनगुने नमक-पानी से धोएं।",
    doctorRx: "1. Sodium Iodide 10% (1g / 15kg वजन) I/V ड्रिप (सावधानी: 7 दिन बाद दोहराएं)\n2. Inj. Streptomycin 5g + Penicillin I/M 5 दिन\n3. Inj. Melonex Plus 15 ml I/M\n4. Potassium Iodide 5-10g ओरल दैनिक 10 दिन।"
  }
];

// =============================================================================
// 3. BREEDING & FEED DATA
// =============================================================================
const BREEDING_DATA = {
  heatSigns: [
    { title: "प्रारंभिक मद (Early Heat - 0 से 6 घंटे)", desc: "पशु बेचैन होता है, बार-बार रंभाता है, अन्य पशुओं पर चढ़ने की कोशिश करता है परंतु स्वयं किसी को चढ़ने नहीं देता। योनि हल्की लाल होती है।" },
    { title: "सटीक मद (Mid / Standing Heat - 6 से 18 घंटे) ⭐ सर्वोत्तम समय", desc: "पशु खड़ा रहता है जब दूसरा पशु उस पर चढ़ता है (Standing Reflex)। योनि से कांच जैसा साफ, पारदर्शी, गाढ़ा तार लटकता है। कृत्रिम गर्भाधान (A.I.) का सबसे सफल समय!" },
    { title: "मद समापन (Late Heat - 18 से 24 घंटे)", desc: "पशु शांत होने लगता है। डिस्चार्ज गाढ़ा हो जाता है। सुबह मद में आई गाय/भैंस को शाम को और शाम को मद में आई को अगली सुबह सीमन डलवाएं (AM-PM Rule)।" }
  ],
  dischargeTypes: [
    { type: "कांच जैसा बिल्कुल पारदर्शी लंबा तार", status: "✅ स्वस्थ मद (A.I. हेतु 100% उपयुक्त)", note: "यह पूर्ण रूप से ओव्यूलेशन का सूचक है। तुरंत A.I. करवाएं।" },
    { type: "मटमैला, मवादयुक्त या सफेद दूधिया डिस्चार्ज", status: "❌ गर्भाशय संक्रमण (Endometritis / Metritis)", note: "इस समय A.I. न करवाएं। पहले गर्भाशय की Intrauterine सफाई व उपचार करवाएं।" },
    { type: "हल्का खूनी तार (A.I. के 2 दिन बाद)", status: "ℹ️ मेट-एस्ट्रस ब्लीडिंग (सामान्य शारीरिक क्रिया)", note: "यह ओव्यूलेशन हो जाने का सामान्य संकेत है। घबराने की आवश्यकता नहीं है।" }
  ],
  repeatBreederSolutions: [
    "मद चक्र के 10-12वें घंटे पर ही A.I. करवाएं और आवश्यकता पड़ने पर 12 घंटे बाद दूसरी A.I. (डबल सीमन) करवाएं।",
    "A.I. करवाने के तुरंत बाद Inj. Receptal / Buserelin Acetate (2.5 ml - 5 ml) I/M लगवाएं ताकि अंडाशय से अंडा समय पर छूटे।",
    "पशु को लगातार 20 दिन तक Chelated Mineral Mixture (50g) और Vitamin A, D3, E, Biotin सप्लीमेंट दें।",
    "यदि गर्भाशय में हल्का भी संक्रमण हो तो मद के समय Ceftiofur / Gentamicin Intrauterine इन्फ्यूजन करवाएं।"
  ]
};

// =============================================================================
// 4. SESSION COUNTDOWN TIMER & INIT
// =============================================================================
function initSessionTimer() {
  if (sessionTimerInterval) clearInterval(sessionTimerInterval);
  sessionSecondsRemaining = 3600; // 60 minutes
  
  sessionTimerInterval = setInterval(() => {
    sessionSecondsRemaining--;
    if (sessionSecondsRemaining <= 0) {
      clearInterval(sessionTimerInterval);
      alert("सुरक्षा चेतावनी: आपका 60 मिनट का क्लिनिकल सत्र समाप्त हो गया है। पृष्ठ पुनः लोड किया जा रहा है।");
      window.location.reload();
    }
  }, 1000);
}

// Global initialization
window.addEventListener("DOMContentLoaded", () => {
  loadConfigFromStorage();
  applyBrandingSettings();
  initSessionTimer();
  renderBreedingTab();
  applyMatrixFilters();
  renderKhataList();
  renderInventoryList();
});

// =============================================================================
// 5. CONFIGURATION & BRANDING STORAGE
// =============================================================================
function loadConfigFromStorage() {
  const saved = localStorage.getItem("vetcare_master_config");
  if (saved) {
    try {
      AppConfig = { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    } catch (e) {
      console.error("Config JSON Parse Error", e);
      AppConfig = { ...DEFAULT_CONFIG };
    }
  }
}

function applyBrandingSettings() {
  // App Titles
  const pageTitleTag = document.getElementById("pageTitleTag");
  if (pageTitleTag) pageTitleTag.textContent = `${AppConfig.appTitle} | Clinical & Smart Dairy Assistant`;

  const gatewayAppTitle = document.getElementById("gatewayAppTitle");
  if (gatewayAppTitle) gatewayAppTitle.textContent = AppConfig.appTitle;

  const appHeaderTitle = document.getElementById("appHeaderTitle");
  if (appHeaderTitle) appHeaderTitle.textContent = AppConfig.appTitle;

  const gatewayTagline = document.getElementById("gatewayTagline");
  if (gatewayTagline) gatewayTagline.textContent = AppConfig.appTagline;

  const footerAppBranding = document.getElementById("footerAppBranding");
  if (footerAppBranding) footerAppBranding.textContent = `${AppConfig.appTitle} Clinical Assistant • सुरक्षित और सत्यापित प्रणाली`;

  // Logo Handling
  if (AppConfig.logoUrl) {
    const gatewayBox = document.getElementById("gatewayLogoBox");
    if (gatewayBox) gatewayBox.innerHTML = `<img src="${AppConfig.logoUrl}" class="w-full h-full object-cover" alt="Logo" />`;
    const headerBox = document.getElementById("headerLogoBox");
    if (headerBox) headerBox.innerHTML = `<img src="${AppConfig.logoUrl}" class="w-full h-full object-cover" alt="Logo" />`;
  }
}

// =============================================================================
// 6. ROLE SWITCHING & MODAL CONTROLS
// =============================================================================
function selectRole(role) {
  currentRole = role;
  const gateway = document.getElementById("screenGateway");
  const mainApp = document.getElementById("screenMainApp");
  const roleBadge = document.getElementById("currentUserRoleBadge");

  if (gateway) gateway.classList.add("hidden");
  if (mainApp) mainApp.classList.remove("hidden");

  // Toggle Doctor Specific Tabs
  const navRx = document.getElementById("navRx");
  const navRecords = document.getElementById("navRecords");
  const navInventory = document.getElementById("navInventory");
  const navAI = document.getElementById("navAI");
  const navFinanceLabel = document.getElementById("navFinanceLabel");
  const finTitle = document.getElementById("financeTitle");
  const finCreditLabel = document.getElementById("finCreditLabel");

  if (role === "DOCTOR") {
    if (roleBadge) roleBadge.textContent = "🩺 अधिकृत पशु चिकित्सक (Veterinary Doctor)";
    if (navRx) navRx.classList.remove("hidden");
    if (navRx) navRx.classList.add("flex");
    if (navRecords) navRecords.classList.remove("hidden");
    if (navRecords) navRecords.classList.add("flex");
    if (navInventory) navInventory.classList.remove("hidden");
    if (navInventory) navInventory.classList.add("flex");
    if (navAI) navAI.classList.remove("hidden");
    if (navAI) navAI.classList.add("flex");
    if (navFinanceLabel) navFinanceLabel.textContent = "क्लिनिक खाता";
    if (finTitle) finTitle.innerHTML = "<span>📊</span> डॉक्टर क्लिनिक एवं किसान खाता बही";
    if (finCreditLabel) finCreditLabel.textContent = "कुल प्राप्त फीस (Collected)";
    switchTab("diagnosis");
  } else {
    if (roleBadge) roleBadge.textContent = "👨‍🌾 स्मार्ट पशुपालक (Dairy Farmer)";
    if (navRx) { navRx.classList.add("hidden"); navRx.classList.remove("flex"); }
    if (navRecords) { navRecords.classList.add("hidden"); navRecords.classList.remove("flex"); }
    if (navInventory) { navInventory.classList.add("hidden"); navInventory.classList.remove("flex"); }
    if (navAI) { navAI.classList.add("hidden"); navAI.classList.remove("flex"); }
    if (navFinanceLabel) navFinanceLabel.textContent = "दूध खाता";
    if (finTitle) finTitle.innerHTML = "<span>📊</span> पशुपालक दूध व खर्च खाता बही";
    if (finCreditLabel) finCreditLabel.textContent = "कुल दूध बिक्री आय (Income)";
    switchTab("diagnosis");
  }

  applyMatrixFilters();
}

function returnToGateway() {
  const gateway = document.getElementById("screenGateway");
  const mainApp = document.getElementById("screenMainApp");
  if (gateway) gateway.classList.remove("hidden");
  if (mainApp) mainApp.classList.add("hidden");
}

function openDoctorDeclarationModal() {
  const m = document.getElementById("modalDoctorDeclaration");
  if (m) m.style.display = "flex";
}

function closeDoctorDeclarationModal() {
  const m = document.getElementById("modalDoctorDeclaration");
  if (m) m.style.display = "none";
}

function acceptDoctorDeclaration() {
  closeDoctorDeclarationModal();
  selectRole("DOCTOR");
}

// Navigation Tabs Switcher
function switchTab(targetTab) {
  const tabs = ["diagnosis", "breeding", "feed", "rx", "records", "ai", "finance", "inventory", "helpdesk"];
  tabs.forEach(t => {
    const view = document.getElementById("view" + t.charAt(0).toUpperCase() + t.slice(1));
    const navBtn = document.getElementById("nav" + t.charAt(0).toUpperCase() + t.slice(1));
    if (view) {
      if (t === targetTab) {
        view.classList.remove("hidden");
      } else {
        view.classList.add("hidden");
      }
    }
    if (navBtn) {
      if (t === targetTab) {
        navBtn.classList.add("active-nav-tab");
        navBtn.classList.remove("text-slate-400");
      } else {
        navBtn.classList.remove("active-nav-tab");
        navBtn.classList.add("text-slate-400");
      }
    }
  });

  if (targetTab === "records") renderSavedRecords();
  if (targetTab === "finance") renderKhataList();
  if (targetTab === "inventory") renderInventoryList();
}

// =============================================================================
// 7. 3-WAY CLINICAL DIAGNOSIS ENGINE
// =============================================================================
function setDiagnosisMode(mode) {
  activeDiagnosisMode = mode;
  const btn1 = document.getElementById("btnDiagMode1");
  const btn2 = document.getElementById("btnDiagMode2");
  const btn3 = document.getElementById("btnDiagMode3");

  const pMatrix = document.getElementById("panelDiagMatrix");
  const pHybrid = document.getElementById("panelDiagHybrid");
  const pDirectory = document.getElementById("panelDiagDirectory");

  [btn1, btn2, btn3].forEach(b => {
    if (b) {
      b.classList.remove("bg-blue-600", "text-white");
      b.classList.add("text-slate-600");
    }
  });

  if (pMatrix) pMatrix.classList.add("hidden");
  if (pHybrid) pHybrid.classList.add("hidden");
  if (pDirectory) pDirectory.classList.add("hidden");

  if (mode === "SYMPTOMS") {
    if (btn1) { btn1.classList.add("bg-blue-600", "text-white"); btn1.classList.remove("text-slate-600"); }
    if (pMatrix) pMatrix.classList.remove("hidden");
    applyMatrixFilters();
  } else if (mode === "HYBRID") {
    if (btn2) { btn2.classList.add("bg-blue-600", "text-white"); btn2.classList.remove("text-slate-600"); }
    if (pHybrid) pHybrid.classList.remove("hidden");
    handleAppSearch();
  } else if (mode === "DIRECTORY") {
    if (btn3) { btn3.classList.add("bg-blue-600", "text-white"); btn3.classList.remove("text-slate-600"); }
    if (pDirectory) pDirectory.classList.remove("hidden");
    filterByTag("ALL");
  }
}

function resetSymptomMatrix() {
  matrixSelected = { temp: null, cardinal: "ALL", secondary: [] };
  document.querySelectorAll(".m-chip").forEach(el => el.classList.remove("chip-active"));
  document.querySelectorAll(".s-chip").forEach(el => el.classList.remove("chip-active"));
  const selCard = document.getElementById("selCardinalSign");
  if (selCard) selCard.value = "ALL";
  applyMatrixFilters();
}

function toggleMatrixParam(type, val, element) {
  if (type === "temp") {
    if (matrixSelected.temp === val) {
      matrixSelected.temp = null;
      if (element) element.classList.remove("chip-active");
    } else {
      matrixSelected.temp = val;
      document.querySelectorAll(".m-chip").forEach(el => el.classList.remove("chip-active"));
      if (element) element.classList.add("chip-active");
    }
  }
  applyMatrixFilters();
}

function toggleSecSymptom(key, element) {
  const idx = matrixSelected.secondary.indexOf(key);
  if (idx > -1) {
    matrixSelected.secondary.splice(idx, 1);
    if (element) element.classList.remove("chip-active");
  } else {
    matrixSelected.secondary.push(key);
    if (element) element.classList.add("chip-active");
  }
  applyMatrixFilters();
}

function applyMatrixFilters() {
  const selCard = document.getElementById("selCardinalSign");
  if (selCard) matrixSelected.cardinal = selCard.value;

  // Calculate Weighted Match Score for each disease
  const scored = CORE_DISEASE_DB.map(dis => {
    let score = 0;

    // 1. Cardinal Sign Check (Weight: 40%)
    if (matrixSelected.cardinal !== "ALL") {
      if (dis.cardinal === matrixSelected.cardinal) {
        score += 40;
      }
    } else {
      score += 15; // baseline neutral
    }

    // 2. Temperature Weight (Weight: 20%)
    if (matrixSelected.temp) {
      if (dis.temp === matrixSelected.temp) {
        score += 20;
      }
    } else {
      score += 10;
    }

    // 3. Secondary Multi-Symptom Matching (Weight: 40%)
    if (matrixSelected.secondary.length > 0) {
      let matchedCount = 0;
      matrixSelected.secondary.forEach(s => {
        const textToSearch = safeLower(dis.desc) + " " + safeLower(dis.keywords.join(" "));
        if (s === "OFF_FEED" && (textToSearch.includes("चारा") || textToSearch.includes("भूख"))) matchedCount++;
        if (s === "DULLNESS" && (textToSearch.includes("सुस्त") || textToSearch.includes("कमजोरी"))) matchedCount++;
        if (s === "DIARRHEA" && (textToSearch.includes("दस्त") || textToSearch.includes("गोबर"))) matchedCount++;
        if (s === "CONSTIPATION" && (textToSearch.includes("कब्ज") || textToSearch.includes("सूखा"))) matchedCount++;
        if (s === "SALIVATION" && (textToSearch.includes("लार") || textToSearch.includes("मुंह"))) matchedCount++;
        if (s === "MILK_DROP" && (textToSearch.includes("दूध") || textToSearch.includes("अयन"))) matchedCount++;
        if (s === "LIMPING" && (textToSearch.includes("लंगड़ा") || textToSearch.includes("खुर"))) matchedCount++;
      });
      score += Math.min(40, (matchedCount / matrixSelected.secondary.length) * 40);
    } else {
      score += 15;
    }

    return { ...dis, matchPercent: Math.round(score) };
  });

  scored.sort((a, b) => b.matchPercent - a.matchPercent);

  const matchScoreText = document.getElementById("matchScoreText");
  const matchCountBadge = document.getElementById("matchCountBadge");
  if (matchScoreText) {
    matchScoreText.textContent = `वैज्ञानिक क्लिनिकल संभावना शीर्ष रोग: ${scored[0]?.nameHindi.split("(")[0]} (${scored[0]?.matchPercent}%)`;
  }
  if (matchCountBadge) {
    matchCountBadge.textContent = `${scored.length} रोग विश्लेषित`;
  }

  renderDiseaseCards(scored);
}

function handleAppSearch() {
  const inputEl = document.getElementById("unifiedSearchInput");
  const query = safeLower(inputEl ? inputEl.value : "");

  const results = CORE_DISEASE_DB.filter(d => {
    const name = safeLower(d.nameHindi);
    const desc = safeLower(d.desc);
    const kw = (d.keywords || []).map(safeLower).join(" ");
    return name.includes(query) || desc.includes(query) || kw.includes(query);
  });

  renderDiseaseCards(results);
}

function filterByTag(tag, element) {
  document.querySelectorAll(".q-chip").forEach(el => {
    el.classList.remove("bg-blue-600", "text-white");
    el.classList.add("bg-slate-100", "text-slate-700");
  });

  if (element) {
    element.classList.add("bg-blue-600", "text-white");
    element.classList.remove("bg-slate-100", "text-slate-700");
  }

  if (tag === "ALL") {
    renderDiseaseCards(CORE_DISEASE_DB);
  } else {
    const filtered = CORE_DISEASE_DB.filter(d => d.category === tag);
    renderDiseaseCards(filtered);
  }
}

function renderDiseaseCards(diseases) {
  const container = document.getElementById("diseaseSearchResults");
  if (!container) return;

  if (!diseases || diseases.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-slate-400 bg-white rounded-3xl border border-slate-200">
        <p class="text-3xl mb-1">🔍</p>
        <p class="text-xs font-semibold">कोई रोग या लक्षण मेल नहीं खाया। कृपया अन्य शब्द या लक्षण चुनें।</p>
      </div>`;
    return;
  }

  let html = "";
  diseases.forEach(d => {
    const isDoctor = currentRole === "DOCTOR";
    const percentBadge = d.matchPercent ? `
      <span class="text-[10px] font-black px-2 py-0.5 rounded-full ${d.matchPercent >= 65 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">
        संभावना: ${d.matchPercent}%
      </span>` : "";

    html += `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 transition hover:shadow-sm">
        <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md border border-slate-200">${d.category}</span>
              ${percentBadge}
            </div>
            <h3 class="text-sm sm:text-base font-black text-slate-900 mt-1">${d.nameHindi}</h3>
          </div>
          ${isDoctor ? `
            <button onclick="copyToRx('${d.nameHindi}', '${encodeURIComponent(d.doctorRx)}')" class="shrink-0 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-2.5 py-1.5 rounded-xl border border-blue-200 transition">
              + OPD पर्ची में जोड़ें
            </button>` : ""}
        </div>

        <p class="text-xs text-slate-600 leading-relaxed font-medium">${d.desc}</p>

        <!-- FARMER DESI REMEDIES HUB -->
        <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-950 space-y-1">
          <strong class="font-bold text-emerald-900 flex items-center gap-1">
            <span>🌿</span> पशुपालक देसी व सुरक्षित प्राथमिक उपचार:
          </strong>
          <p class="leading-relaxed">${d.farmerRemedy}</p>
        </div>

        <!-- CLINICAL DOCTOR RX (ALLOPATHIC) -->
        ${isDoctor ? `
          <div class="bg-blue-50/70 border border-blue-200 rounded-2xl p-3 text-xs text-blue-950 space-y-1.5 font-mono">
            <strong class="font-bold text-blue-900 flex items-center gap-1 font-sans">
              <span>🩺</span> वेटरनरी क्लिनिकल इंजेक्शन व एलोपैथिक प्रोटोकॉल:
            </strong>
            <pre class="whitespace-pre-wrap font-sans text-xs text-slate-800 leading-relaxed">${d.doctorRx}</pre>
          </div>` : ""}
      </div>
    `;
  });

  container.innerHTML = html;
}

function copyToRx(diseaseName, encodedRx) {
  const diagInput = document.getElementById("opdDiagnosis");
  const medInput = document.getElementById("opdMedicine");
  if (diagInput) diagInput.value = diseaseName;
  if (medInput) medInput.value = decodeURIComponent(encodedRx);
  switchTab("rx");
}

// =============================================================================
// 8. BREEDING & BALANCED FEED CALCULATOR
// =============================================================================
function renderBreedingTab() {
  const heatBox = document.getElementById("heatSignsContainer");
  const disBox = document.getElementById("dischargeContainer");
  const repList = document.getElementById("repeatBreederList");

  if (heatBox) {
    heatBox.innerHTML = BREEDING_DATA.heatSigns.map(h => `
      <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl">
        <strong class="text-rose-700 block text-xs font-bold">${h.title}</strong>
        <p class="text-[11px] text-slate-600 mt-0.5 leading-relaxed">${h.desc}</p>
      </div>
    `).join("");
  }

  if (disBox) {
    disBox.innerHTML = BREEDING_DATA.dischargeTypes.map(d => `
      <div class="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl">
        <strong class="text-slate-900 block text-xs font-bold">${d.type}</strong>
        <span class="text-[10px] text-emerald-700 font-bold block">${d.status}</span>
        <p class="text-[11px] text-slate-600 mt-0.5">${d.note}</p>
      </div>
    `).join("");
  }

  if (repList) {
    repList.innerHTML = BREEDING_DATA.repeatBreederSolutions.map(s => `<li>${s}</li>`).join("");
  }
}

// Daily Ration Balancer
function calculateDailyRation() {
  const wInput = document.getElementById("feedWeight");
  const mInput = document.getElementById("feedMilk");
  const weight = parseFloat(wInput ? wInput.value : 400) || 400;
  const milk = parseFloat(mInput ? mInput.value : 10) || 10;

  // Dry Matter (DM) Requirement = ~2.5% to 3.0% of Body Weight
  const totalDM = weight * 0.028;

  // Concentrated Grain (दाना): 1.5 kg maintenance + 0.4 kg per litre milk
  const grainKg = 1.5 + (milk * 0.4);

  // Green Fodder (हरा चारा): approx 5-6% of Body Weight
  const greenKg = Math.round(weight * 0.05);

  // Dry Fodder (सूखा भूसा): balance roughage
  const dryKg = Math.max(3, Math.round((totalDM - (grainKg * 0.9) - (greenKg * 0.2)) / 0.9));

  const resCard = document.getElementById("rationResultCard");
  const resGrain = document.getElementById("resFeedGrain");
  const resGreen = document.getElementById("resFeedGreen");
  const resDry = document.getElementById("resFeedDry");

  if (resGrain) resGrain.textContent = `${grainKg.toFixed(1)} kg`;
  if (resGreen) resGreen.textContent = `${greenKg} kg`;
  if (resDry) resDry.textContent = `${dryKg} kg`;
  if (resCard) resCard.classList.remove("hidden");
}

// Shaeffer's Weight Formula & Drug Dosage (Clinical Utility)
function calculateShaefferWeight(heartGirthInches, lengthInches) {
  // Weight in lbs = (Girth^2 * Length) / 300
  // Weight in kg = lbs * 0.453592
  const lbs = (Math.pow(heartGirthInches, 2) * lengthInches) / 300;
  return Math.round(lbs * 0.453592);
}

function calculateDosageInMl(weightKg, doseMgPerKg, drugConcentrationMgPerMl) {
  if (!drugConcentrationMgPerMl || drugConcentrationMgPerMl <= 0) return 0;
  const totalMg = weightKg * doseMgPerKg;
  return (totalMg / drugConcentrationMgPerMl).toFixed(1);
}

// =============================================================================
// 9. DIGITAL OPD PRESCRIPTION & WHATSAPP ENGINE
// =============================================================================
function clearRxField() {
  const med = document.getElementById("opdMedicine");
  if (med) med.value = "";
}

function calculateDue() {
  const tot = parseFloat(document.getElementById("opdTotalFee")?.value || 0) || 0;
  const paid = parseFloat(document.getElementById("opdPaidFee")?.value || 0) || 0;
  const due = Math.max(0, tot - paid);
  const dueEl = document.getElementById("opdDueFee");
  if (dueEl) dueEl.value = due;
}

function captureGPSLocation() {
  const gpsInput = document.getElementById("opdGPS");
  const btn = document.getElementById("btnGPS");

  if (!navigator.geolocation) {
    alert("आपके ब्राउज़र में GPS की सुविधा उपलब्ध नहीं है।");
    return;
  }

  if (btn) btn.textContent = "⌛ खोज रहा...";
  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude.toFixed(5);
      const lng = pos.coords.longitude.toFixed(5);
      if (gpsInput) gpsInput.value = `${lat}, ${lng}`;
      if (btn) btn.textContent = "📍 दर्ज है";
    },
    err => {
      if (btn) btn.textContent = "📍 GPS";
      alert("GPS लोकेशन प्राप्त करने की अनुमति नहीं मिली: " + err.message);
    },
    { timeout: 10000 }
  );
}

function getOPDFormData() {
  return {
    id: "OPD-" + Date.now(),
    date: new Date().toLocaleDateString("hi-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    farmerName: safeStr(document.getElementById("opdFarmerName")?.value),
    farmerPhone: safeStr(document.getElementById("opdFarmerPhone")?.value),
    village: safeStr(document.getElementById("opdVillage")?.value),
    animal: safeStr(document.getElementById("opdAnimal")?.value),
    tag: safeStr(document.getElementById("opdTag")?.value),
    gps: safeStr(document.getElementById("opdGPS")?.value),
    pregnancy: safeStr(document.getElementById("opdPregnancy")?.value),
    diagnosis: safeStr(document.getElementById("opdDiagnosis")?.value),
    medicine: safeStr(document.getElementById("opdMedicine")?.value),
    totalFee: parseFloat(document.getElementById("opdTotalFee")?.value || 0) || 0,
    paidFee: parseFloat(document.getElementById("opdPaidFee")?.value || 0) || 0,
    dueFee: parseFloat(document.getElementById("opdDueFee")?.value || 0) || 0
  };
}

function validateOPDData(d) {
  if (!d.farmerName) {
    alert("कृपया किसान का नाम दर्ज करें!");
    return false;
  }
  if (!d.farmerPhone || d.farmerPhone.length < 10) {
    alert("कृपया किसान का 10 अंकों का वैध मोबाइल नंबर दर्ज करें!");
    return false;
  }
  if (!d.diagnosis) {
    alert("कृपया पहचाना गया रोग या प्रोविजनल निदान दर्ज करें!");
    return false;
  }
  return true;
}

function saveOfflineCaseDirectly() {
  const data = getOPDFormData();
  if (!validateOPDData(data)) return;

  const records = JSON.parse(localStorage.getItem("vetcare_opd_records") || "[]");
  records.unshift(data);
  localStorage.setItem("vetcare_opd_records", JSON.stringify(records));

  // If there's an outstanding due, automatically sync to Khata
  if (data.dueFee > 0) {
    const khata = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
    khata.unshift({
      id: "KH-" + Date.now(),
      farmerName: data.farmerName,
      phone: data.farmerPhone,
      village: data.village,
      amount: data.dueFee,
      type: "DUE",
      note: `ओपीडी फीस बकाया (${data.animal} - ${data.diagnosis})`,
      date: data.date
    });
    localStorage.setItem("vetcare_khata_records", JSON.stringify(khata));
    renderKhataList();
  }

  alert("✅ केस रिकॉर्ड सफलता से सुरक्षित कर लिया गया!");
  renderSavedRecords();
}

function dispatchWhatsAppRx() {
  const data = getOPDFormData();
  if (!validateOPDData(data)) return;

  saveOfflineCaseDirectly();

  let message = `*📋 डिजिटल पशु चिकित्सा पर्ची (VETCARE PRESCRIPTION)*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📅 *दिनांक:* ${data.date}\n`;
  message += `👨‍🌾 *किसान:* ${data.farmerName} ${data.village ? '(' + data.village + ')' : ''}\n`;
  message += `🐄 *पशु:* ${data.animal} | *टैग:* ${data.tag || 'N/A'}\n`;
  message += `🩺 *स्थिति:* ${data.pregnancy}\n`;
  if (data.gps) message += `📍 *लोकेशन:* https://maps.google.com/?q=${data.gps}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🔬 *निदान (Diagnosis):* *${data.diagnosis}*\n\n`;
  message += `💊 *उपचार व दवाएं (Rx Injections):*\n${data.medicine || 'परामर्श अनुसार दवा लें।'}\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *कुल फीस:* ₹${data.totalFee} | *जमा:* ₹${data.paidFee} | *बकाया:* ₹${data.dueFee}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `⚠️ _नोट: यह एक अधिकृत डिजिटल पर्ची है। पशु चिकित्सक के परामर्श अनुसार ही दवा दें।_\n`;
  message += `*Vetcare AI Clinical OS*`;

  const phoneSanitized = data.farmerPhone.replace(/\D/g, "");
  const targetNumber = phoneSanitized.startsWith("91") && phoneSanitized.length === 12 ? phoneSanitized : `91${phoneSanitized}`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
}

function printCurrentOPDSlip() {
  const data = getOPDFormData();
  const printArea = document.getElementById("printableSlipArea");
  if (!printArea) return;

  printArea.innerHTML = `
    <div style="border: 2px solid #000; padding: 20px; font-family: sans-serif; max-width: 650px; margin: 0 auto;">
      <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px;">
        <h2 style="margin: 0; font-size: 20px;">VETCARE CLINICAL OPD PRESCRIPTION</h2>
        <p style="margin: 4px 0; font-size: 12px;">पशु चिकित्सालय एवं सचल क्लिनिकल सेवा</p>
      </div>
      <table style="width: 100%; font-size: 12px; margin-top: 15px; border-collapse: collapse;">
        <tr>
          <td><strong>पर्ची क्र.:</strong> ${data.id}</td>
          <td style="text-align: right;"><strong>दिनांक:</strong> ${data.date}</td>
        </tr>
        <tr>
          <td><strong>किसान का नाम:</strong> ${data.farmerName}</td>
          <td style="text-align: right;"><strong>फोन:</strong> ${data.farmerPhone}</td>
        </tr>
        <tr>
          <td><strong>गाँव:</strong> ${data.village || 'N/A'}</td>
          <td style="text-align: right;"><strong>पशु / टैग:</strong> ${data.animal} / ${data.tag || 'N/A'}</td>
        </tr>
        <tr>
          <td colspan="2"><strong>गर्भावस्था स्थिति:</strong> ${data.pregnancy}</td>
        </tr>
      </table>
      <div style="margin: 15px 0; padding: 10px; background: #f4f4f4; border: 1px solid #ddd;">
        <strong>प्रोविजनल निदान (Provisional Diagnosis):</strong> ${data.diagnosis}
      </div>
      <div style="min-height: 140px; border: 1px solid #ccc; padding: 10px; font-family: monospace; font-size: 12px;">
        <strong>Rx (औषधि एवं इंजेक्शन विवरण):</strong><br><br>
        <pre style="white-space: pre-wrap; font-family: sans-serif;">${data.medicine || 'यथा आवश्यक'}</pre>
      </div>
      <div style="margin-top: 15px; font-size: 12px; display: flex; justify-content: space-between;">
        <span><strong>कुल फीस:</strong> ₹${data.totalFee}</span>
        <span><strong>जमा:</strong> ₹${data.paidFee}</span>
        <span><strong>बकाया:</strong> ₹${data.dueFee}</span>
      </div>
      <div style="margin-top: 35px; display: flex; justify-content: space-between; font-size: 11px;">
        <span>हस्ताक्षर पशुपालक</span>
        <span>अधिकृत पशु चिकित्सक हस्ताक्षर एवं मुहर</span>
      </div>
    </div>
  `;

  window.print();
}

// =============================================================================
// 10. SAVED RECORDS CONTROLLER (DEFENSIVE SEARCH)
// =============================================================================
function handleRecordSearch() {
  const query = safeLower(document.getElementById("searchRecordsInput")?.value);
  renderSavedRecords(query);
}

function renderSavedRecords(query = "") {
  const listContainer = document.getElementById("recordsList");
  const badge = document.getElementById("recordTotalBadge");
  if (!listContainer) return;

  const records = JSON.parse(localStorage.getItem("vetcare_opd_records") || "[]");
  if (badge) badge.textContent = `${records.length} केस सुरक्षित`;

  // Safe Defensive Search Filtering
  const filtered = records.filter(r => {
    if (!r) return false;
    const name = safeLower(r.farmerName || r.name);
    const phone = safeStr(r.farmerPhone || r.phone);
    const village = safeLower(r.village);
    const diag = safeLower(r.diagnosis);
    return name.includes(query) || phone.includes(query) || village.includes(query) || diag.includes(query);
  });

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="text-center py-6 text-slate-400 bg-white rounded-2xl border border-slate-200">
        <p class="text-xs">कोई सुरक्षित केस रिकॉर्ड नहीं मिला।</p>
      </div>`;
    return;
  }

  listContainer.innerHTML = filtered.map(r => `
    <div class="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2 text-xs">
      <div class="flex justify-between items-start">
        <div>
          <strong class="text-sm font-bold text-slate-900">${r.farmerName || 'अज्ञात'}</strong>
          <span class="text-slate-500 block text-[11px]">${r.farmerPhone || ''} ${r.village ? '• ' + r.village : ''}</span>
        </div>
        <span class="text-[10px] text-slate-400">${r.date || ''}</span>
      </div>
      <div class="bg-slate-50 p-2 rounded-xl text-slate-700">
        <span class="font-bold text-blue-700">${r.animal || 'पशु'}</span>: ${r.diagnosis || 'निदान नहीं'}
      </div>
      <div class="flex justify-between items-center text-[11px] pt-1 border-t border-slate-100">
        <span>फीस: ₹${r.totalFee || 0} (बकाया: <strong class="text-rose-600">₹${r.dueFee || 0}</strong>)</span>
        <button onclick="deleteOPDRecord('${r.id}')" class="text-rose-600 font-bold hover:underline">हटाएं ✕</button>
      </div>
    </div>
  `).join("");
}

function deleteOPDRecord(id) {
  if (!confirm("क्या आप वाकई यह केस रिकॉर्ड हटाना चाहते हैं?")) return;
  let records = JSON.parse(localStorage.getItem("vetcare_opd_records") || "[]");
  records = records.filter(r => r.id !== id);
  localStorage.setItem("vetcare_opd_records", JSON.stringify(records));
  renderSavedRecords();
}

// =============================================================================
// 11. PASHUPALAK KHATA BAHI (LEDGER ENGINE - CRITICAL FIX APPLIED)
// =============================================================================
function openNewKhataModal() {
  const m = document.getElementById("modalNewKhata");
  if (m) m.style.display = "flex";
}

function closeNewKhataModal() {
  const m = document.getElementById("modalNewKhata");
  if (m) m.style.display = "none";
}

function saveNewKhataRecord() {
  const name = safeStr(document.getElementById("khataFarmerName")?.value);
  const phone = safeStr(document.getElementById("khataFarmerPhone")?.value);
  const amt = parseFloat(document.getElementById("khataAmount")?.value || 0);
  const type = document.getElementById("khataType")?.value || "DUE";
  const note = safeStr(document.getElementById("khataNote")?.value);

  if (!name) {
    alert("कृपया किसान का नाम दर्ज करें!");
    return;
  }
  if (!amt || amt <= 0) {
    alert("कृपया मान्य राशि (₹) दर्ज करें!");
    return;
  }

  const khata = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
  khata.unshift({
    id: "KH-" + Date.now(),
    farmerName: name,
    phone: phone,
    village: "",
    amount: amt,
    type: type,
    note: note || (type === "DUE" ? "उधारी / बकाया" : "जमा / भुगतान"),
    date: new Date().toLocaleDateString("hi-IN", { day: "2-digit", month: "short", year: "numeric" })
  });

  localStorage.setItem("vetcare_khata_records", JSON.stringify(khata));
  closeNewKhataModal();
  renderKhataList();

  // Reset inputs
  const elName = document.getElementById("khataFarmerName");
  const elPhone = document.getElementById("khataFarmerPhone");
  const elAmt = document.getElementById("khataAmount");
  const elNote = document.getElementById("khataNote");
  if (elName) elName.value = "";
  if (elPhone) elPhone.value = "";
  if (elAmt) elAmt.value = "";
  if (elNote) elNote.value = "";
}

/**
 * Defensive Khata Rendering Fix:
 * Resolves Uncaught TypeError: Cannot read properties of undefined (reading 'toLowerCase')
 */
function renderKhataList() {
  const khata = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
  
  // Safe detection of both potential search elements
  const searchInput = document.getElementById("searchKhataInput") || document.getElementById("khata-search-input");
  const query = safeLower(searchInput ? searchInput.value : "");

  let totalCredit = 0;
  let totalDebit = 0;

  // Defensive filtering without crashing on undefined or null properties
  const filtered = khata.filter(item => {
    if (!item) return false;
    const name = safeLower(item.farmerName || item.name);
    const village = safeLower(item.village);
    const phone = safeStr(item.phone || item.mobile);
    const note = safeLower(item.note || item.details);
    return name.includes(query) || village.includes(query) || phone.includes(query) || note.includes(query);
  });

  // Calculate totals from entire khata
  khata.forEach(k => {
    if (!k) return;
    const val = parseFloat(k.amount) || 0;
    if (k.type === "PAID" || k.type === "CREDIT") {
      totalCredit += val;
    } else {
      totalDebit += val;
    }
  });

  const finCredit = document.getElementById("finCredit");
  const finDebit = document.getElementById("finDebit");
  const listContainer = document.getElementById("finDueList");

  if (finCredit) finCredit.textContent = `₹${totalCredit.toLocaleString('en-IN')}`;
  if (finDebit) finDebit.textContent = `₹${totalDebit.toLocaleString('en-IN')}`;

  if (!listContainer) return;

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="text-center py-6 text-slate-400 bg-white rounded-2xl border border-slate-200">
        <p class="text-xs">खाता में कोई लेन-देन दर्ज नहीं है।</p>
      </div>`;
    return;
  }

  listContainer.innerHTML = filtered.map(k => {
    const isDue = (k.type === "DUE" || k.type === "DEBIT");
    return `
      <div class="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
        <div class="space-y-0.5">
          <div class="flex items-center gap-1.5">
            <strong class="text-xs sm:text-sm font-bold text-slate-900">${k.farmerName || 'किसान'}</strong>
            <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${isDue ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}">
              ${isDue ? 'बकाया' : 'जमा'}
            </span>
          </div>
          <p class="text-[11px] text-slate-500">${k.phone ? k.phone + ' • ' : ''}${k.note || ''}</p>
          <span class="text-[10px] text-slate-400 block">${k.date || ''}</span>
        </div>
        <div class="text-right space-y-1">
          <span class="text-sm sm:text-base font-black ${isDue ? 'text-rose-600' : 'text-emerald-600'}">
            ${isDue ? '-' : '+'}₹${(k.amount || 0).toLocaleString('en-IN')}
          </span>
          <div>
            <button onclick="deleteKhataItem('${k.id}')" class="text-[10px] text-slate-400 hover:text-rose-600 font-bold">हटाएं ✕</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function deleteKhataItem(id) {
  if (!confirm("क्या आप यह खाता प्रविष्टि हटाना चाहते हैं?")) return;
  let khata = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
  khata = khata.filter(k => k.id !== id);
  localStorage.setItem("vetcare_khata_records", JSON.stringify(khata));
  renderKhataList();
}

// =============================================================================
// 12. DRUG & SEMEN STRAW INVENTORY STOCK CONTROLLER
// =============================================================================
let activeInventoryCat = "ALL";

function openNewInventoryItemModal() {
  const m = document.getElementById("modalNewInventory");
  if (m) m.style.display = "flex";
}

function closeNewInventoryModal() {
  const m = document.getElementById("modalNewInventory");
  if (m) m.style.display = "none";
}

function filterInventoryCategory(cat, element) {
  activeInventoryCat = cat;
  document.querySelectorAll(".inv-chip").forEach(c => {
    c.classList.remove("bg-blue-600", "text-white");
    c.classList.add("bg-slate-100", "text-slate-700");
  });
  if (element) {
    element.classList.add("bg-blue-600", "text-white");
    element.classList.remove("bg-slate-100", "text-slate-700");
  }
  renderInventoryList();
}

function saveNewInventoryItem() {
  const name = safeStr(document.getElementById("invItemName")?.value);
  const cat = document.getElementById("invItemCategory")?.value || "INJECTION";
  const qty = parseInt(document.getElementById("invItemStock")?.value || 0, 10);
  const minAlert = parseInt(document.getElementById("invItemMinAlert")?.value || 3, 10);
  const unit = safeStr(document.getElementById("invItemUnit")?.value) || "vials";

  if (!name) {
    alert("कृपया दवा या सीमन का नाम दर्ज करें!");
    return;
  }

  const items = JSON.parse(localStorage.getItem("vetcare_inventory_items") || "[]");
  items.unshift({
    id: "INV-" + Date.now(),
    name: name,
    category: cat,
    quantity: qty,
    minAlert: minAlert,
    unit: unit
  });

  localStorage.setItem("vetcare_inventory_items", JSON.stringify(items));
  closeNewInventoryModal();
  renderInventoryList();

  const elName = document.getElementById("invItemName");
  const elQty = document.getElementById("invItemStock");
  if (elName) elName.value = "";
  if (elQty) elQty.value = "";
}

function updateInventoryQty(id, delta) {
  let items = JSON.parse(localStorage.getItem("vetcare_inventory_items") || "[]");
  const idx = items.findIndex(i => i.id === id);
  if (idx > -1) {
    items[idx].quantity = Math.max(0, (items[idx].quantity || 0) + delta);
    localStorage.setItem("vetcare_inventory_items", JSON.stringify(items));
    renderInventoryList();
  }
}

function deleteInventoryItem(id) {
  if (!confirm("क्या आप यह स्टॉक आइटम हटाना चाहते हैं?")) return;
  let items = JSON.parse(localStorage.getItem("vetcare_inventory_items") || "[]");
  items = items.filter(i => i.id !== id);
  localStorage.setItem("vetcare_inventory_items", JSON.stringify(items));
  renderInventoryList();
}

function renderInventoryList() {
  const container = document.getElementById("inventoryItemsContainer");
  const alertBadge = document.getElementById("lowStockAlertBadge");
  if (!container) return;

  const items = JSON.parse(localStorage.getItem("vetcare_inventory_items") || "[]");
  let hasLowStock = false;

  const filtered = items.filter(i => {
    if (!i) return false;
    if (activeInventoryCat === "ALL") return true;
    return i.category === activeInventoryCat;
  });

  items.forEach(i => {
    if (i && i.quantity <= i.minAlert) hasLowStock = true;
  });

  if (alertBadge) {
    if (hasLowStock) alertBadge.classList.remove("hidden");
    else alertBadge.classList.add("hidden");
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-6 text-slate-400 bg-white rounded-2xl border border-slate-200">
        <p class="text-xs">कोई इन्वेंट्री स्टॉक आइटम दर्ज नहीं है।</p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(i => {
    const isLow = i.quantity <= i.minAlert;
    return `
      <div class="bg-white border ${isLow ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'} rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
        <div>
          <div class="flex items-center gap-1.5">
            <strong class="text-xs sm:text-sm font-bold text-slate-900">${i.name}</strong>
            <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">${i.category}</span>
            ${isLow ? '<span class="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded">न्यूनतम स्टॉक!</span>' : ''}
          </div>
          <p class="text-[11px] text-slate-500 mt-0.5">अलर्ट सीमा: ${i.minAlert} ${i.unit}</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <button onclick="updateInventoryQty('${i.id}', -1)" class="px-2.5 py-1 text-slate-700 font-bold hover:bg-slate-200">-</button>
            <span class="px-3 py-1 text-xs font-black ${isLow ? 'text-rose-600' : 'text-slate-800'}">${i.quantity}</span>
            <button onclick="updateInventoryQty('${i.id}', 1)" class="px-2.5 py-1 text-slate-700 font-bold hover:bg-slate-200">+</button>
          </div>
          <span class="text-[10px] text-slate-400">${i.unit}</span>
          <button onclick="deleteInventoryItem('${i.id}')" class="text-slate-400 hover:text-rose-600 text-xs ml-1">✕</button>
        </div>
      </div>
    `;
  }).join("");
}

// =============================================================================
// 13. LIVE GOOGLE GEMINI AI CLINICAL CONSULTANT
// =============================================================================
function openAIKeyModal() {
  const m = document.getElementById("modalAIKey");
  const input = document.getElementById("inputGeminiKey");
  if (m) m.style.display = "flex";
  if (input) input.value = localStorage.getItem("vetcare_gemini_key") || "";
}

function closeAIKeyModal() {
  const m = document.getElementById("modalAIKey");
  if (m) m.style.display = "none";
}

function saveGeminiKey() {
  const input = document.getElementById("inputGeminiKey");
  const key = safeStr(input ? input.value : "");
  if (!key) {
    alert("कृपया मान्य Gemini API कुंजी दर्ज करें!");
    return;
  }
  localStorage.setItem("vetcare_gemini_key", key);
  closeAIKeyModal();
  alert("✅ Gemini API Key सुरक्षित कर दी गई है!");
}

function sendCaseToAIConsultant() {
  const animal = document.getElementById("opdAnimal")?.value || "पशु";
  const diag = document.getElementById("opdDiagnosis")?.value || "";
  const rx = document.getElementById("opdMedicine")?.value || "";

  const prompt = `${animal} का केस: प्रोविजनल निदान - ${diag}। प्रयुक्त दवाएं - ${rx}। कृपया इस केस का गहन क्लिनिकल रिव्यू, संभावित ड्रग इंटरेक्शन और आधुनिक सपोर्टिव थैरेपी सुझाएं।`;
  
  const aiInput = document.getElementById("aiInputPrompt");
  if (aiInput) aiInput.value = prompt;
  switchTab("ai");
}

async function runAIConsultant() {
  const apiKey = localStorage.getItem("vetcare_gemini_key");
  if (!apiKey) {
    openAIKeyModal();
    return;
  }

  const promptInput = document.getElementById("aiInputPrompt");
  const outputArea = document.getElementById("aiOutputArea");
  const runBtn = document.getElementById("btnRunAI");
  const userText = safeStr(promptInput ? promptInput.value : "");

  if (!userText) {
    alert("कृपया पशु के लक्षण या केस विवरण दर्ज करें!");
    return;
  }

  if (runBtn) {
    runBtn.disabled = true;
    runBtn.innerHTML = `<span>⏳ AI सर्जन विश्लेषण कर रहा है...</span>`;
  }
  if (outputArea) {
    outputArea.classList.remove("hidden");
    outputArea.innerHTML = "विश्लेषण जारी है, कृपया प्रतीक्षा करें...";
  }

  const systemInstruction = `You are a Senior Veterinary Clinical Consultant. 
Provide an evidence-based clinical opinion in clean, professional Hindi with English drug names. 
Structure your response into:
1. प्रोविजनल विभेदक निदान (Differential Diagnosis)
2. आपातकालीन इंजेक्शन प्रोटोकॉल (Emergency Injections with exact dosage & route)
3. सहायक व पोषक चिकित्सा (Supportive & Fluid Therapy)
4. पशुपालक को सावधानियां एवं परहेज (Farmer Cautions).`;

  // Modern models supported: gemini-2.0-flash, gemini-2.5-flash
  const modelsToTry = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash"];
  let success = false;
  let lastError = "";

  for (const model of modelsToTry) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              { text: `${systemInstruction}\n\nकेस विवरण: ${userText}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1200
        }
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiReply) {
        if (outputArea) outputArea.textContent = aiReply;
        success = true;
        break;
      }
    } catch (err) {
      lastError = err.message;
      console.warn(`Failed with ${model}:`, err);
    }
  }

  if (!success && outputArea) {
    outputArea.innerHTML = `<span class="text-rose-600 font-bold">⚠️ AI विश्लेषण विफल:</span> ${lastError}<br><br>कृपया अपनी API Key जांचें अथवा कुछ समय बाद प्रयास करें।`;
  }

  if (runBtn) {
    runBtn.disabled = false;
    runBtn.innerHTML = `<span>✨ AI से क्लिनिकल रिपोर्ट मांगें</span>`;
  }
}

// =============================================================================
// 14. DUAL-BANK UPI PAYMENT GATEWAY & QR ENGINE
// =============================================================================
function openPremiumPaymentModal() {
  const m = document.getElementById("modalPremiumPayment");
  if (m) m.style.display = "flex";
  updatePaymentUI();
}

function closePremiumPaymentModal() {
  const m = document.getElementById("modalPremiumPayment");
  if (m) m.style.display = "none";
}

function selectPaymentPlan(plan) {
  selectedPlan = plan;
  const btnM = document.getElementById("btnPlanMonthly");
  const btnA = document.getElementById("btnPlanAnnual");

  if (plan === "MONTHLY") {
    if (btnM) { btnM.classList.add("bg-blue-600", "text-white"); btnM.classList.remove("text-slate-700"); }
    if (btnA) { btnA.classList.remove("bg-blue-600", "text-white"); btnA.classList.add("text-slate-700"); }
  } else {
    if (btnA) { btnA.classList.add("bg-blue-600", "text-white"); btnA.classList.remove("text-slate-700"); }
    if (btnM) { btnM.classList.remove("bg-blue-600", "text-white"); btnM.classList.add("text-slate-700"); }
  }
  updatePaymentUI();
}

function switchBankTab(bank) {
  activeBank = bank;
  const tabSBI = document.getElementById("btnTabSBI");
  const tabPNB = document.getElementById("btnTabPNB");

  if (bank === "SBI") {
    if (tabSBI) { tabSBI.classList.add("bg-blue-50", "text-blue-700", "font-bold"); tabSBI.classList.remove("bg-slate-50", "text-slate-600"); }
    if (tabPNB) { tabPNB.classList.remove("bg-blue-50", "text-blue-700", "font-bold"); tabPNB.classList.add("bg-slate-50", "text-slate-600"); }
  } else {
    if (tabPNB) { tabPNB.classList.add("bg-blue-50", "text-blue-700", "font-bold"); tabPNB.classList.remove("bg-slate-50", "text-slate-600"); }
    if (tabSBI) { tabSBI.classList.remove("bg-blue-50", "text-blue-700", "font-bold"); tabSBI.classList.add("bg-slate-50", "text-slate-600"); }
  }
  updatePaymentUI();
}

function updatePaymentUI() {
  const price = selectedPlan === "MONTHLY" ? AppConfig.monthlyPrice : AppConfig.annualPrice;
  const upiId = activeBank === "SBI" ? AppConfig.sbiUpi : AppConfig.pnbUpi;
  const acct = activeBank === "SBI" ? AppConfig.sbiAccount : AppConfig.pnbAccount;
  const ifsc = activeBank === "SBI" ? AppConfig.sbiIfsc : AppConfig.pnbIfsc;

  const dispPayee = document.getElementById("dispPayeeName");
  const dispUPI = document.getElementById("dispUPIId");
  const dispAcct = document.getElementById("dispAccountNumber");
  const dispIFSC = document.getElementById("dispIFSC");
  const dispDirectAmt = document.getElementById("directUPIAmount");
  const qrImg = document.getElementById("dynamicQRImage");
  const btnDirect = document.getElementById("btnDirectUPILink");

  if (dispPayee) dispPayee.textContent = AppConfig.payeeName;
  if (dispUPI) dispUPI.textContent = upiId;
  if (dispAcct) dispAcct.textContent = acct;
  if (dispIFSC) dispIFSC.textContent = ifsc;
  if (dispDirectAmt) dispDirectAmt.textContent = price;

  // Real UPI URI
  const payeeEncoded = encodeURIComponent(AppConfig.payeeName);
  const upiUri = `upi://pay?pa=${upiId}&pn=${payeeEncoded}&am=${price}&cu=INR&tn=Vetcare_Premium_${selectedPlan}`;
  if (btnDirect) btnDirect.href = upiUri;

  // Dynamic QR Code generation via reliable API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUri)}`;
  if (qrImg) qrImg.src = qrUrl;
}

function sendPaymentProofWhatsApp() {
  const price = selectedPlan === "MONTHLY" ? AppConfig.monthlyPrice : AppConfig.annualPrice;
  const bank = activeBank;
  const message = `नमस्ते एडमिन, मैंने Vetcare ${selectedPlan} प्लान (₹${price}) हेतु ${bank} खाते पर भुगतान किया है। कृपया मेरा प्रीमियम सक्रिय करें।\n(स्क्रीनशॉट संलग्न है)`;

  const url = `https://api.whatsapp.com/send?phone=91${AppConfig.adminWhatsApp}&text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function escalateToAdminWhatsApp() {
  const url = `https://api.whatsapp.com/send?phone=91${AppConfig.adminWhatsApp}&text=${encodeURIComponent("नमस्ते Vetcare सपोर्ट टीम, मुझे ऐप के संदर्भ में सहायता चाहिए।")}`;
  window.open(url, "_blank");
}

// =============================================================================
// 15. SUPER ADMIN CONTROL ROOM & DATA BACKUP
// =============================================================================
function openAdminPinModal() {
  const m = document.getElementById("modalAdminPIN");
  const pinInput = document.getElementById("inputAdminPIN");
  const err = document.getElementById("pinErrorMessage");
  if (m) m.style.display = "flex";
  if (pinInput) pinInput.value = "";
  if (err) err.classList.add("hidden");
}

function closeAdminPinModal() {
  const m = document.getElementById("modalAdminPIN");
  if (m) m.style.display = "none";
}

function verifyAdminPIN() {
  const pinInput = document.getElementById("inputAdminPIN");
  const err = document.getElementById("pinErrorMessage");
  const entered = safeStr(pinInput ? pinInput.value : "");

  if (entered === AppConfig.adminPin) {
    closeAdminPinModal();
    openAdminDashboard();
  } else {
    if (err) err.classList.remove("hidden");
  }
}

function openAdminDashboard() {
  const m = document.getElementById("modalAdminDashboard");
  if (m) m.style.display = "flex";

  // Pre-fill Admin Controls
  const cPayee = document.getElementById("cfgPayeeName");
  const cMon = document.getElementById("cfgMonthlyPrice");
  const cAnn = document.getElementById("cfgAnnualPrice");
  const cSbiUpi = document.getElementById("cfgSbiUpi");
  const cSbiAcc = document.getElementById("cfgSbiAccount");
  const cSbiIfsc = document.getElementById("cfgSbiIfsc");
  const cPnbUpi = document.getElementById("cfgPnbUpi");
  const cPnbAcc = document.getElementById("cfgPnbAccount");
  const cPnbIfsc = document.getElementById("cfgPnbIfsc");
  const cAppTitle = document.getElementById("cfgAppTitle");
  const cLogoUrl = document.getElementById("cfgLogoUrl");
  const cTagline = document.getElementById("cfgAppTagline");
  const cAdminWa = document.getElementById("cfgAdminWhatsApp");
  const cAdminPin = document.getElementById("cfgAdminPIN");

  if (cPayee) cPayee.value = AppConfig.payeeName;
  if (cMon) cMon.value = AppConfig.monthlyPrice;
  if (cAnn) cAnn.value = AppConfig.annualPrice;
  if (cSbiUpi) cSbiUpi.value = AppConfig.sbiUpi;
  if (cSbiAcc) cSbiAcc.value = AppConfig.sbiAccount;
  if (cSbiIfsc) cSbiIfsc.value = AppConfig.sbiIfsc;
  if (cPnbUpi) cPnbUpi.value = AppConfig.pnbUpi;
  if (cPnbAcc) cPnbAcc.value = AppConfig.pnbAccount;
  if (cPnbIfsc) cPnbIfsc.value = AppConfig.pnbIfsc;
  if (cAppTitle) cAppTitle.value = AppConfig.appTitle;
  if (cLogoUrl) cLogoUrl.value = AppConfig.logoUrl;
  if (cTagline) cTagline.value = AppConfig.appTagline;
  if (cAdminWa) cAdminWa.value = AppConfig.adminWhatsApp;
  if (cAdminPin) cAdminPin.value = AppConfig.adminPin;

  refreshAdminMetrics();
  switchAdminTab("PAYMENT");
}

function closeAdminDashboard() {
  const m = document.getElementById("modalAdminDashboard");
  if (m) m.style.display = "none";
}

function switchAdminTab(tab) {
  const panels = ["Payment", "Branding", "Support", "Metrics"];
  panels.forEach(p => {
    const el = document.getElementById("adminPanel" + p);
    if (el) el.classList.add("hidden");
    const btn = document.getElementById("tabBtnAdmin" + p.slice(0, 4));
    if (btn) {
      btn.classList.remove("border-blue-600", "text-blue-600");
      btn.classList.add("border-transparent");
    }
  });

  const activePanel = document.getElementById("adminPanel" + tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase());
  const activeBtn = document.getElementById("tabBtnAdmin" + tab.slice(0, 4).charAt(0).toUpperCase() + tab.slice(1, 4).toLowerCase());

  if (activePanel) activePanel.classList.remove("hidden");
  if (activeBtn) {
    activeBtn.classList.add("border-blue-600", "text-blue-600");
    activeBtn.classList.remove("border-transparent");
  }

  if (tab === "METRICS") refreshAdminMetrics();
}

function refreshAdminMetrics() {
  const opdRecords = JSON.parse(localStorage.getItem("vetcare_opd_records") || "[]");
  const khataRecords = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
  const invItems = JSON.parse(localStorage.getItem("vetcare_inventory_items") || "[]");

  let totalDue = 0;
  khataRecords.forEach(k => {
    if (k && (k.type === "DUE" || k.type === "DEBIT")) totalDue += (parseFloat(k.amount) || 0);
  });

  let lowStockCount = 0;
  invItems.forEach(i => {
    if (i && i.quantity <= i.minAlert) lowStockCount++;
  });

  const mOPD = document.getElementById("metricTotalOPD");
  const mDue = document.getElementById("metricTotalDues");
  const mLow = document.getElementById("metricLowStock");

  if (mOPD) mOPD.textContent = opdRecords.length;
  if (mDue) mDue.textContent = `₹${totalDue.toLocaleString('en-IN')}`;
  if (mLow) mLow.textContent = lowStockCount;
}

function saveAllAdminSettings() {
  AppConfig.payeeName = safeStr(document.getElementById("cfgPayeeName")?.value) || AppConfig.payeeName;
  AppConfig.monthlyPrice = parseFloat(document.getElementById("cfgMonthlyPrice")?.value) || AppConfig.monthlyPrice;
  AppConfig.annualPrice = parseFloat(document.getElementById("cfgAnnualPrice")?.value) || AppConfig.annualPrice;
  AppConfig.sbiUpi = safeStr(document.getElementById("cfgSbiUpi")?.value) || AppConfig.sbiUpi;
  AppConfig.sbiAccount = safeStr(document.getElementById("cfgSbiAccount")?.value) || AppConfig.sbiAccount;
  AppConfig.sbiIfsc = safeStr(document.getElementById("cfgSbiIfsc")?.value) || AppConfig.sbiIfsc;
  AppConfig.pnbUpi = safeStr(document.getElementById("cfgPnbUpi")?.value) || AppConfig.pnbUpi;
  AppConfig.pnbAccount = safeStr(document.getElementById("cfgPnbAccount")?.value) || AppConfig.pnbAccount;
  AppConfig.pnbIfsc = safeStr(document.getElementById("cfgPnbIfsc")?.value) || AppConfig.pnbIfsc;
  AppConfig.appTitle = safeStr(document.getElementById("cfgAppTitle")?.value) || AppConfig.appTitle;
  AppConfig.logoUrl = safeStr(document.getElementById("cfgLogoUrl")?.value);
  AppConfig.appTagline = safeStr(document.getElementById("cfgAppTagline")?.value) || AppConfig.appTagline;
  AppConfig.adminWhatsApp = safeStr(document.getElementById("cfgAdminWhatsApp")?.value) || AppConfig.adminWhatsApp;
  AppConfig.adminPin = safeStr(document.getElementById("cfgAdminPIN")?.value) || AppConfig.adminPin;

  localStorage.setItem("vetcare_master_config", JSON.stringify(AppConfig));
  applyBrandingSettings();
  updatePaymentUI();

  alert("✅ समस्त एडमिन सेटिंग्स सफलतापूर्वक अपडेट कर दी गई हैं!");
  closeAdminDashboard();
}

function exportDataBackupJSON() {
  const backup = {
    config: AppConfig,
    opdRecords: JSON.parse(localStorage.getItem("vetcare_opd_records") || "[]"),
    khataRecords: JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]"),
    inventory: JSON.parse(localStorage.getItem("vetcare_inventory_items") || "[]"),
    exportDate: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Vetcare_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function clearDemoDataOnly() {
  if (!confirm("क्या आप समस्त परीक्षण (Demo) डेटा रीसेट करना चाहते हैं?")) return;
  localStorage.removeItem("vetcare_opd_records");
  localStorage.removeItem("vetcare_khata_records");
  localStorage.removeItem("vetcare_inventory_items");
  renderSavedRecords();
  renderKhataList();
  renderInventoryList();
  refreshAdminMetrics();
  alert("परीक्षण डेटा रीसेट कर दिया गया है।");
}
