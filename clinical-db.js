const CLINICAL_DATABASE = [
  {
    id: 1,
    name: "गलाघोंटू (H.S. / Haemorrhagic Septicaemia)",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Pasteurella multocida)",
    category: "HIGH",
    temp: "104-107°F",
    traits: {
      temp: "HIGH",
      eyes: "RED",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "OFF",
      cardinalSign: "NECK_SWELLING"
    },
    cardinal: "गले व जबड़े के नीचे गर्म, अत्यंत दर्दनाक सूजन, जीभ बाहर लटकना, घर्र-घर्र की श्वसन ध्वनि।",
    symptoms: "अचानक तेज़ बुखार, मुंह से गाढ़ी लार, हांफना, सुस्ती व चारा-पानी पूर्णतः बंद।",
    rx: "Inj. Marbofloxacin (2 mg/kg) / Ceftiofur Sodium (1.1-2.2 mg/kg IM) + Inj. Meloxicam-Paracetamol + Inj. Pheniramine Maleate.",
    pregnancy: "Safe (सुरक्षित) - स्टेरॉयड (Dexamethasone/Isoflupredone) से बचें।"
  },
  {
    id: 2,
    name: "लंगड़ा बुखार (Black Quarter / B.Q.)",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Clostridium chauvoei)",
    category: "HIGH",
    temp: "104-106°F",
    traits: {
      temp: "HIGH",
      eyes: "NORMAL",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "OFF",
      cardinalSign: "GAS_SWELLING"
    },
    cardinal: "पुट्ठे या कंधे की भारी मांसपेशियों में गैस भरी सूजन (दबाने पर स्पष्ट चर्र-चर्र / Crepitation की ध्वनि)।",
    symptoms: "एक पैर से गंभीर लंगड़ापन, सूजन छूने पर आरंभ में गर्म फिर ठंडी व संवेदनहीन, पशु का बैठ जाना।",
    rx: "Inj. Benzylpenicillin High Dose (10,000-20,000 IU/kg) / Oxytetracycline LA + Inj. Melonex + सूजन पर बर्फ/ठंडी पट्टी।",
    pregnancy: "Safe (पेनिसिलिन व ऑक्सीटेट्रासाइक्लिन अनुशंसित डोज़ में सुरक्षित)।"
  },
  {
    id: 3,
    name: "खुरपका-मुँहपका (FMD / Foot & Mouth)",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Aphthovirus / Picornaviridae)",
    category: "HIGH",
    temp: "104-105°F",
    traits: {
      temp: "HIGH",
      eyes: "NORMAL",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "OFF",
      cardinalSign: "MOUTH_BLISTERS"
    },
    cardinal: "जीभ, मसूड़ों व खुरों के मध्य छाले (Vesicles), मुंह से रस्सी जैसी चिपचिपी लार का लगातार गिरना।",
    symptoms: "लंगड़ाना, जुगाली व चारा बंद, खड़े होने में अत्यधिक कष्ट, थनों पर घाव।",
    rx: "मुंह में Boric Acid + Glycerin पेस्ट; खुरों को Potassium Permanganate (लाल दवा 1:1000) से धोएं + Inj. Ceftriaxone + Inj. Flunixin Meglumine.",
    pregnancy: "Safe (सहायक उपचार सुरक्षित)।"
  },
  {
    id: 4,
    name: "थनैल / मेस्टाइटिस (Mastitis)",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Staphylococcus / Streptococcus / E. coli)",
    category: "NORMAL",
    temp: "101.5-103°F",
    traits: {
      temp: "NORMAL",
      eyes: "NORMAL",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "NORMAL",
      cardinalSign: "UDDER_HARD"
    },
    cardinal: "अयन/थन में कड़ापन, अयन छूने पर गर्म व लाल, दूध में खून, छिछड़े या मवाद का आना।",
    symptoms: "दूध का फटना या पानी जैसा पतला होना, दूध निकालने पर पशु का लात मारना, दूध उत्पादन में भारी गिरावट।",
    rx: "Intramammary Infusion (Cloxacillin/Cephalosporin) + Inj. Enrofloxacin/Ceftiofur + Inj. Serratiopeptidase + Inj. Meloxicam.",
    pregnancy: "Safe (स्थानीय थन ट्यूब व सेफ्टियोफ़र सुरक्षित)।"
  },
  {
    id: 5,
    name: "दुग्ध ज्वर / मिल्क फीवर (Milk Fever)",
    etiologyType: "METABOLIC",
    etiologyName: "उपापचयी विकार (Hypocalcemia / कैल्शियम की तीव्र कमी)",
    category: "SUB",
    temp: "<100°F (अल्प तापमान)",
    traits: {
      temp: "SUB",
      eyes: "NORMAL",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "OFF",
      cardinalSign: "STERNAL_RECUMBENCY"
    },
    cardinal: "ब्याने के 24-48 घंटे के भीतर गर्दन मोड़कर 'S' आकार में सीने के बल बैठना, कान व खुर ठंडे पड़ना।",
    symptoms: "मांसपेशियों में कंपन, पुतलियों का फैलना, उठने में पूर्ण असमर्थता, सुस्ती।",
    rx: "Inj. Calcium Borogluconate (Mifex / Calborol) 450ml (आधा धीमे I/V + आधा S/C) तुरंत दें + गर्म कंबल से शरीर ढकें।",
    pregnancy: "Safe (ब्याने के तुरंत बाद आपातकालीन जीवनरक्षक)।"
  },
  {
    id: 6,
    name: "कीटोसिस (Ketosis / Acetonemia)",
    etiologyType: "METABOLIC",
    etiologyName: "उपापचयी विकार (Negative Energy Balance)",
    category: "NORMAL",
    temp: "101.5°F",
    traits: {
      temp: "NORMAL",
      eyes: "NORMAL",
      urine: "NORMAL",
      dung: "HARD",
      appetite: "OFF",
      cardinalSign: "SWEET_BREATH"
    },
    cardinal: "दूध, पेशाब व सांस से विशिष्ट मीठी एसीटोन गंध, पशु द्वारा दाना छोड़कर केवल सूखा भूसा खाना।",
    symptoms: "दूध उत्पादन में अचानक तीव्र गिरावट, वजन घटना, कब्ज़, कभी-कभी पागलों जैसी हरकतें।",
    rx: "Inj. 20-50% Dextrose 500ml-1000ml I/V + Oral Propylene Glycol 200ml BID + Inj. Vitamin B-Complex (Belamyl).",
    pregnancy: "⚠️ लाल चेतावनी: गाभिन पशुओं में Isoflupredone / Dexamethasone गर्भपात करा सकता है, स्टेरॉयड न दें।"
  },
  {
    id: 7,
    name: "अफारा / ब्लोट (Tympanitis / Bloat)",
    etiologyType: "METABOLIC",
    etiologyName: "पाचन विकार (Rumen Tympany / गैस भराव)",
    category: "NORMAL",
    temp: "101-102°F",
    traits: {
      temp: "NORMAL",
      eyes: "NORMAL",
      urine: "NORMAL",
      dung: "HARD",
      appetite: "BLOAT",
      cardinalSign: "LEFT_FLANK_DRUM"
    },
    cardinal: "बायाँ पेट ढोलक की भांति फूलना, उंगली मारने पर खोखली 'टिन-टिन' ध्वनि।",
    symptoms: "सांस लेने में कष्ट, मुंह खोलकर हांफना, बेचैनी व पेट पर बार-बार लात मारना।",
    rx: "Oral Tympanol / Bloatosil (100ml) + 250ml सरसों तेल + 30ml तारपीन तेल। अति-गंभीर स्थिति में Trocar & Cannula से बाएँ पेट से गैस निकालें।",
    pregnancy: "Safe (तेल व कार्मिनेटिव सुरक्षित)।"
  },
  {
    id: 8,
    name: "थायलेरियासिस (Theileriosis)",
    etiologyType: "PROTOZOAL",
    etiologyName: "रक्त परजीवी (Theileria annulata)",
    category: "HIGH",
    temp: "105-107°F",
    traits: {
      temp: "HIGH",
      eyes: "PALE_YELLOW",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "OFF",
      cardinalSign: "LYMPH_SWELLING"
    },
    cardinal: "कंधे के आगे या जांघ की लिम्फ ग्रंथियों में कठोर सूजन, अत्यधिक तेज़ लगातार बुखार।",
    symptoms: "आँखों व श्लेष्मा में पीलापन/खून की भारी कमी, सांस तेज चलना, कमजोरी, चिचड़ी (Ticks) का इतिहास।",
    rx: "Inj. Buparvaquone (Zubion) 2.5 mg/kg Deep IM एकल खुराक + Supportive Iron Tonic/Belamyl + Inj. Melonex.",
    pregnancy: "Safe (सख्त निगरानी में एकल डोज़)।"
  },
  {
    id: 9,
    name: "बबेशियोसिस / लाल पेशाब (Babesiosis / Red Water)",
    etiologyType: "PROTOZOAL",
    etiologyName: "रक्त परजीवी (Babesia bigemina)",
    category: "HIGH",
    temp: "105-107°F",
    traits: {
      temp: "HIGH",
      eyes: "PALE_YELLOW",
      urine: "RED_COFFEE",
      dung: "NORMAL",
      appetite: "OFF",
      cardinalSign: "RED_URINE"
    },
    cardinal: "कॉफी या गहरे लाल रंग का पेशाब (Haemoglobinuria), तेज़ बुखार, गंभीर रक्ताल्पता।",
    symptoms: "दिल की धड़कन दूर से सुनाई देना (Pounding Heart), पीलिया, अत्यधिक दुर्बलता, श्लेष्मा झिल्लियों का सफेद-फीका पड़ना।",
    rx: "Inj. Diminazene Aceturate (Berenil) 3.5-5 mg/kg Deep IM + Inj. Belamyl + Inj. Pheniramine + Ringer Lactate ड्रिप।",
    pregnancy: "Safe (सावधानीपूर्वक सटीक डोज़ दें)।"
  },
  {
    id: 10,
    name: "एनाप्लास्मोसिस (Anaplasmosis / Gall Sickness)",
    etiologyType: "PROTOZOAL",
    etiologyName: "रक्त परजीवी (Anaplasma marginale)",
    category: "HIGH",
    temp: "104-106°F",
    traits: {
      temp: "HIGH",
      eyes: "YELLOW",
      urine: "YELLOW",
      dung: "HARD",
      appetite: "OFF",
      cardinalSign: "SEVERE_JAUNDICE"
    },
    cardinal: "अत्यधिक तीव्र पीलिया (मसूड़े, आँखें व योनि श्लेष्मा गहरे पीले), पेशाब पीला (लाल नहीं), सख्त सूखा गोबर।",
    symptoms: "तेज़ बुखार, भूख गायब, गंभीर कब्ज़, दुर्बलता, चिचड़ियों का संक्रमण।",
    rx: "Inj. Oxytetracycline Long Acting (LA 20 mg/kg Deep IM) + Inj. Iron/Belamyl + Liver Extract Tonic + Dextrose Saline.",
    pregnancy: "Safe (Oxytetracycline LA अनुशंसित डोज़ में सुरक्षित)।"
  },
  {
    id: 11,
    name: "पीपीआर / बकरी प्लेग (PPR in Goat & Sheep)",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Morbillivirus)",
    category: "HIGH",
    temp: "104-106°F",
    traits: {
      temp: "HIGH",
      eyes: "RED",
      urine: "NORMAL",
      dung: "DIARRHEA",
      appetite: "OFF",
      cardinalSign: "MOUTH_EROSION_DIARRHEA"
    },
    cardinal: "मुंह के अंदर व्यापक छाले, आंखों व नाक से गाढ़ा मवाद जैसा स्राव, अत्यंत बदबूदार पानी जैसा दस्त।",
    symptoms: "तेज़ बुखार, निमोनिया के लक्षण (खांसी व हांफना), डिहाइड्रेशन, तेजी से मृत्यु दर।",
    rx: "Inj. Enrofloxacin LA / Ceftiofur + Inj. Meloxicam + ORS/Electrolyte घोल + मुँह में ग्लिसरीन लेप + Antidiarrheal Bolus.",
    pregnancy: "Safe (सेफ्टियोफ़र व ओआरएस सुरक्षित)।"
  },
  {
    id: 12,
    name: "आंत्रविषाक्तता / फिड़किया (Enterotoxaemia / ET)",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Clostridium perfringens Type D)",
    category: "HIGH",
    temp: "104°F",
    traits: {
      temp: "HIGH",
      eyes: "NORMAL",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "OFF",
      cardinalSign: "OPISTHOTONOS"
    },
    cardinal: "अत्यधिक दाना चरने के बाद बकरियों का चक्कर खाकर गिरना, सिर पीछे की ओर खींचना, झाग निकलना।",
    symptoms: "पेट दर्द, दांत किटकिटाना, कोमा व कुछ ही घंटों में अचानक मृत्यु।",
    rx: "High dose Inj. Benzyl Penicillin + Clostridium Perfringens Type D Anti-toxin + Oral Sodium Bicarbonate (मीठा सोडा).",
    pregnancy: "Safe (पेनिसिलिन सुरक्षित)।"
  },
  {
    id: 13,
    name: "गिल्टी रोग / एंथ्रेक्स (Anthrax)",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Bacillus anthracis - ज़ूनोटिक)",
    category: "HIGH",
    temp: "106-108°F",
    traits: {
      temp: "HIGH",
      eyes: "RED",
      urine: "NORMAL",
      dung: "BLOODY",
      appetite: "OFF",
      cardinalSign: "TAR_BLOOD"
    },
    cardinal: "नाक, मुंह, योनि व गुदा से बिना जमा हुआ तारकोल जैसा काला खून रिसना, कठोर अकड़न न होना।",
    symptoms: "अत्यधिक उग्र बुखार, बेचैनी, दम घुटना और अचानक आकस्मिक मृत्यु। (ज़ूनोटिक - शव कभी न चीरें!)।",
    rx: "High dose Penicillin + Streptomycin (प्रारंभिक अवस्था में)। सरकारी पशु चिकित्सालय को तत्काल सूचित करना अनिवार्य।",
    pregnancy: "N/A (अति-घातक रोग)।"
  },
  {
    id: 14,
    name: "सर्रा / तिबरसा (Surra / Trypanosomiasis)",
    etiologyType: "PROTOZOAL",
    etiologyName: "रक्त परजीवी (Trypanosoma evansi)",
    category: "HIGH",
    temp: "103-106°F",
    traits: {
      temp: "HIGH",
      eyes: "PALE",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "OFF",
      cardinalSign: "CIRCLING_HEAD_PRESSING"
    },
    cardinal: "गोल-गोल चक्कर काटना, दीवारों व खूंटे से सिर टकराना, रुक-रुक कर आने वाला बुखार, अंधापन।",
    symptoms: "लगातार रंभाना, अत्यधिक लार, पैरों में लड़खड़ाहट, धीरे-धीरे अत्यधिक दुर्बलता व वजन घटना।",
    rx: "Inj. Quinapyramine sulfate & chloride (Triquin) 4.4 mg/kg S/C अथवा Inj. Diminazene (Berenil) + 20% Dextrose ड्रिप।",
    pregnancy: "Safe (Triquin सावधानी से सटीक वजन अनुसार दें)।"
  },
  {
    id: 15,
    name: "रेबीज / अलर्क रोग (Rabies)",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Lyssavirus - 100% प्राणघातक)",
    category: "NORMAL",
    temp: "101.5-103°F",
    traits: {
      temp: "NORMAL",
      eyes: "RED",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "OFF",
      cardinalSign: "HYDROPHOBIA_BELL"
    },
    cardinal: "अत्यधिक उत्तेजना, पागलपन, बिना कारण रंभाना, पानी से भय, मुंह से लार टपकना, पिछले अंगों में लकवा।",
    symptoms: "पशु का आक्रामक होना, खूंटे पर सिर मारना, खाने-पीने में असमर्थता।",
    rx: "कोई उपचारात्मक इलाज नहीं। केवल पागल कुत्ते के काटने पर तत्काल पोस्ट-बाइट एंटी-रेबीज वैक्सीन (Day 0, 3, 7, 14, 28) बचाव है।",
    pregnancy: "Safe (एंटी-रेबीज टीका गर्भ में भी सुरक्षित है)।"
  },
  {
    id: 16,
    name: "सूअर ज्वर (Classical Swine Fever)",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Pestivirus)",
    category: "HIGH",
    temp: "105-107°F",
    traits: {
      temp: "HIGH",
      eyes: "RED",
      urine: "NORMAL",
      dung: "DIARRHEA",
      appetite: "OFF",
      cardinalSign: "PURPLE_SKIN"
    },
    cardinal: "कान, पेट, थूथन व भीतरी जांघों पर बैंगनी-लाल रंग के रक्तस्रावी धब्बे (Purpura/Petechiae)।",
    symptoms: "तेज़ बुखार, आंखों से चिपचिपा कीचड़, लड़खड़ाती चाल, दस्त व उल्टी।",
    rx: "Inj. Amoxicillin / Ceftiofur + Inj. Paracetamol + B-Complex + Fluid Therapy.",
    pregnancy: "Safe (टीकाकरण ही मुख्य बचाव है)।"
  },
  {
    id: 17,
    name: "माता रोग / शीप पॉक्स (Sheep & Goat Pox)",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Capripoxvirus)",
    category: "HIGH",
    temp: "104-106°F",
    traits: {
      temp: "HIGH",
      eyes: "RED",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "OFF",
      cardinalSign: "SKIN_POX_SCABS"
    },
    cardinal: "चेहरे, थूथन, अयन व बिना ऊन वाली त्वचा पर फुंसियाँ (Nodules), जो बाद में पपड़ी (Scabs) बन जाती हैं।",
    symptoms: "तेज़ बुखार, आंखों-नाक से स्राव, सांस लेने में कष्ट, मेमनों में उच्च मृत्यु दर।",
    rx: "Inj. Ceftriaxone + Inj. Meloxicam + त्वचा पर घावों हेतु Betadine / Antiseptic स्प्रे + Soft Feed.",
    pregnancy: "Safe (एंटीबायोटिक व दर्द निवारक सुरक्षित)।"
  },
  {
    id: 18,
    name: "उदर शूल / पेट दर्द (Colic in Equine/Cattle)",
    etiologyType: "METABOLIC",
    etiologyName: "पाचन अवरोध (Spasm / Impaction)",
    category: "NORMAL",
    temp: "101°F",
    traits: {
      temp: "NORMAL",
      eyes: "NORMAL",
      urine: "SCANTY",
      dung: "HARD",
      appetite: "OFF",
      cardinalSign: "ROLLING_PAWING"
    },
    cardinal: "पशु का बार-बार अपने पेट की ओर देखना, खुरों से ज़मीन खोदना, उठना-बैठना और ज़मीन पर लोटना।",
    symptoms: "अत्यधिक पसीना आना, बेचैनी, गोबर व पेशाब बंद होना, पेट फूलना।",
    rx: "Inj. Flunixin Meglumine (1.1 mg/kg IV) + Inj. Spasmo-vet (Dicyclomine) + कब्ज़ की स्थिति में 1-2 लीटर Liquid Paraffin नाल से।",
    pregnancy: "⚠️ चेतावनी: गर्भवती पशु में अधिक दर्द निवारक व पेट के खिंचाव से सावधानी बरतें।"
  },
  {
    id: 19,
    name: "जेर रुकना (Retention of Placenta - ROP)",
    etiologyType: "METABOLIC",
    etiologyName: "प्रसवोत्तर विकार (Uterine Atony)",
    category: "NORMAL",
    temp: "101.5-103°F",
    traits: {
      temp: "NORMAL",
      eyes: "NORMAL",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "NORMAL",
      cardinalSign: "HANGING_PLACENTA"
    },
    cardinal: "प्रसव के 8 से 12 घंटे बीत जाने के बाद भी जेर (Placenta) का गर्भाशय से बाहर न निकलना और लटकना।",
    symptoms: "बदबूदार लाल-भूरा स्राव, भूख में कमी, दूध घटना, बेचैनी, जोर लगाना।",
    rx: "Oral Exapar / Replanta liquid 100ml दिन में दो बार + Inj. Ceftiofur Sodium + Inj. Oxytocin / PGF2-alpha (चिकित्सक देखरेख में)। कभी भी हाथ से जबरन न खींचें।",
    pregnancy: "Safe (ब्याने के तुरंत बाद लागू)।"
  },
  {
    id: 20,
    name: "गर्भाशय / योनि बाहर आना (Prolapse)",
    etiologyType: "METABOLIC",
    etiologyName: "प्रजनन विकार (Hormonal / Hypocalcemia)",
    category: "NORMAL",
    temp: "101.5°F",
    traits: {
      temp: "NORMAL",
      eyes: "NORMAL",
      urine: "SCANTY",
      dung: "NORMAL",
      appetite: "NORMAL",
      cardinalSign: "PROTRUDING_MASS"
    },
    cardinal: "ब्याने से पूर्व या प्रसव के बाद योनि अथवा गर्भाशय का लाल मांसल भाग शरीर से बाहर लटकना।",
    symptoms: "पशु का लगातार जोर लगाना, पेशाब करने में कष्ट, अंग पर सूजन, गंदगी व घाव।",
    rx: "Acriflavin / लाल दवा के गुनगुने पानी से अंग को धोएं, धीरे-धीरे अंदर धकेलें, Buhner's Suture लगाएं + Inj. Epidural Lignocaine 2% + Inj. Meloxicam.",
    pregnancy: "Safe (सटीक सर्जिकल प्रक्रिया व संक्रमण रोकथाम अनिवार्य)।"
  },
  {
    id: 21,
    name: "निमोनिया (Bovine Pneumonia)",
    etiologyType: "BACTERIAL",
    etiologyName: "श्वसन जीवाणु/विषाणु (Pasteurella / Mycoplasma)",
    category: "HIGH",
    temp: "104-106°F",
    traits: {
      temp: "HIGH",
      eyes: "NORMAL",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "OFF",
      cardinalSign: "DYSPNEA_WHEEZING"
    },
    cardinal: "तेज़-तेज़ सांस चलना (हांफना), छाती पर कान लगाने पर सायं-सायं/घर्र-घर्र की ध्वनि, लगातार सूखी या बलगमी खांसी।",
    symptoms: "नाक से गाढ़ा मवाद जैसा स्राव, सिर आगे बढ़ाकर सांस लेना, चारा न खाना, तेज़ बुखार।",
    rx: "Inj. Tylosin (10 mg/kg) / Florfenicol / Ceftiofur + Inj. Meloxicam + Mucolytic (Bromhexine) + भाप देना।",
    pregnancy: "Safe (Ceftiofur व Paracetamol गर्भावस्था में पूरी तरह सुरक्षित)।"
  },
  {
    id: 22,
    name: "खुर सड़न (Foot Rot in Cattle & Sheep)",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Fusobacterium necrophorum)",
    category: "NORMAL",
    temp: "102-103°F",
    traits: {
      temp: "NORMAL",
      eyes: "NORMAL",
      urine: "NORMAL",
      dung: "NORMAL",
      appetite: "NORMAL",
      cardinalSign: "FOOT_ROT_SMELL"
    },
    cardinal: "खुरों के विभाजन (Interdigital Cleft) में सड़ांध, अत्यधिक दुर्गंधयुक्त मवाद, खुर के किनारे सूजन।",
    symptoms: "पशु का पैर ऊपर उठाकर रखना, चलने में अत्यधिक पीड़ा, लंगड़ापन, चारा कम चरना।",
    rx: "Inj. Long-Acting Oxytetracycline (20 mg/kg IM) + खुरों को 5% Copper Sulphate अथवा Zinc Sulphate के घोल से धोकर एंटीबायोटिक मरहम लगाएं।",
    pregnancy: "Safe (स्थानीय उपचार व अनुशंसित एंटीबायोटिक सुरक्षित)।"
  }
];
