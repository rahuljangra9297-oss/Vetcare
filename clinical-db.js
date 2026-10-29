const CLINICAL_DATABASE = [
  {
    id: 1,
    name: "गलाघोंटू (H.S. / Haemorrhagic Septicaemia)",
    localName: "घुर्रका, गलसुआ, घोंटू",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Pasteurella multocida)",
    category: "HIGH",
    temp: "104-107°F",
    traits: { temp: "HIGH", eyes: "RED", urine: "NORMAL", dung: "NORMAL", appetite: "OFF", cardinalSign: "NECK_SWELLING" },
    cardinal: "गले व जबड़े के नीचे गर्म, अत्यंत दर्दनाक सूजन, जीभ बाहर लटकना, घर्र-घर्र की तीव्र श्वसन ध्वनि।",
    onSiteConfirm: "सूजन पर उंगली दबाने पर कड़ा दर्दनाक गड्ढा न बनना; जीभ का नीला-बैंगनी पड़ना; अत्यधिक लार टपकना।",
    stages: {
      s1: "प्रारंभिक (Stage 1): 105°F+ तेज़ बुखार, सुस्ती, चारा बंद, आंखों में तेज लालिमा।",
      s2: "तीव्र (Stage 2): गले में भारी गर्म सूजन, घरघराहट, जीभ बाहर, लार का रिसाव।",
      s3: "अति-गंभीर (Stage 3): दम घुटना, अचेत होकर गिरना, साइनोसिस (Cyanosis)।"
    },
    trajectories: {
      positive: "समय पर सटीक एंटीबायोटिक मिलने पर: 12 घंटे में बुखार सामान्य ➔ 24 घंटे में सूजन में 50% कमी ➔ 3-4 दिन में पूर्ण स्वास्थ्य लाभ।",
      negative: "उपचार में विलंब या अनुपचारित रहने पर: 18 से 36 घंटे के भीतर दम घुटने व सेप्टीसीमिया से 90%+ मृत्यु निश्चित।"
    },
    symptoms: "अत्यधिक तेज़ 106°F बुखार, मुंह से गाढ़ी चिपचिपी लार, हांफना, सुस्ती, चारा-पानी 100% बंद।",
    drugs: {
      generic: "Ceftiofur Sodium (2.2 mg/kg IM) अथवा Marbofloxacin (2 mg/kg IM) + Meloxicam-Paracetamol (15 ml IM) + Pheniramine (10 ml IM)।",
      ethical: "Xyrofur 1g (Intas, ₹450) / Forgast 1g (Virbac, ₹420) + Melonex Plus (Intas, ₹110) + Avil (Sanofi, ₹85)।",
      correctEffect: "पाश्चरेला जीवाणु की सेल-वॉल का तत्काल विनाश व एंडोटॉक्सिन का शमन।",
      hazardWrong: "गलत पेनिसिलिन या कम डोज़ देने पर जीवाणु प्रतिरोध और सांस रुकने से तत्काल मृत्यु।"
    },
    protocols: {
      doctor: "24 घंटे बाद Ceftiofur का द्वितीय टीका लगाएं; फेफड़ों में एडिमा की स्थिति में Furosemide सावधानी से दें।",
      farmer: "पशु को सूखी छांव में रखें; गले पर ठंडे पानी की पट्टी रखें; दलिया व गुनगुना पानी ही दें।"
    },
    labTest: { name: "Blood Smear (Leishman Stain)", sample: "Peripheral Blood (कान की नस से)", cost: "₹150 - ₹250", significance: "द्विध्रुवी (Bipolar organism) पाश्चरेला जीवाणु की पुष्टि।" },
    rxInjections: "Inj. Ceftiofur Sodium 1g IM + Inj. Melonex Plus 15ml IM + Inj. Avil 10ml IM।",
    rxOral: "Throat Electuary: ग्लिसरीन में 5% बोरिक एसिड मिलाकर जीभ पर लगाएं।",
    rxAyurved: "काली मिर्च (15g) + सोंठ (25g) + शहद (50g) दिन में दो बार जीभ पर चटाएं।",
    rxHome: "गले की सूजन पर तिल के तेल में कपूर मिलाकर हल्के हाथ से मालिश करें।",
    biosecurity: "रोगी पशु को तुरंत पृथक करें। बाड़े में 2% सोडियम हाइड्रोक्साइड छिड़कें।",
    pregnancy: "Safe (सुरक्षित) - डेक्सामेथासोन (Dexamethasone) स्टेरॉयड कतई न दें (गर्भपात जोखिम)।",
    recoveryDays: "न्यूनतम: 3 दिन | अधिकतम: 7 दिन",
    redFlags: "जीभ का पूरी तरह नीला पड़ना, हांफते हुए बैठ जाना।"
  },
  {
    id: 2,
    name: "लंगड़ा बुखार (Black Quarter / B.Q.)",
    localName: "जहरबाद, लंगड़िया, सुजवा",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Clostridium chauvoei)",
    category: "HIGH",
    temp: "104-106°F",
    traits: { temp: "HIGH", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", appetite: "OFF", cardinalSign: "GAS_SWELLING" },
    cardinal: "पुट्ठे या कंधे की भारी मांसपेशियों में गैस भरी सूजन (दबाने पर स्पष्ट चर्र-चर्र / Crepitation की ध्वनि)।",
    onSiteConfirm: "सूजन वाले हिस्से को दबाने पर कागज़ जैसी चर्र-चर्र आवाज़; चमड़ी छूने पर ठंडी व सुन्न लगना।",
    stages: {
      s1: "प्रारंभिक (Stage 1): तेज़ बुखार, एक पैर से गंभीर लंगड़ापन, पुट्ठे पर गर्म दर्दनाक गांठ।",
      s2: "तीव्र (Stage 2): सूजन का तेजी से फैलना, मांसपेशियों में गैस का भराव (Crepitation), सुन्न पड़ना।",
      s3: "अति-गंभीर (Stage 3): पशु का लेट जाना, शरीर ठंडा पड़ना, टॉक्सिमिया से मृत्यु।"
    },
    trajectories: {
      positive: "शुरुआती 12 घंटे में हाई-डोज़ पेनिसिलिन मिलने पर: 24 घंटे में लंगड़ापन कम ➔ 5-7 दिन में ऊतक पुनर्जनन।",
      negative: "अनुपचारित रहने पर: 24 से 48 घंटे के भीतर मांसपेशियों का काला सड़न (Myonecrosis) व 95% मृत्यु।"
    },
    symptoms: "एक पैर से गंभीर लंगड़ापन, सूजन आरंभ में गर्म व दर्दनाक बाद में ठंडी व संवेदनहीन, पशु का बैठ जाना।",
    drugs: {
      generic: "Benzylpenicillin Sodium (20,000-40,000 IU/kg IM) अथवा Oxytetracycline LA (20 mg/kg Deep IM) + Meloxicam (0.5 mg/kg)।",
      ethical: "Procaine Penicillin 40 Lac (Alembic, ₹120) / Terramycin LA (Zoetis, ₹240) + Melonex (Intas, ₹95)।",
      correctEffect: "क्लॉस्ट्रिडियम बीजाणुओं के प्रसार और अल्फा-टॉक्सिन उत्पादन का तत्काल अवरोध।",
      hazardWrong: "गलत एंटीबायोटिक चयन से गैस पूरे शरीर में फैलकर 24 घंटे में विषाक्तता फैलाती है।"
    },
    protocols: {
      doctor: "सूजन के चारों ओर रिंग-ब्लॉक के रूप में पेनिसिलिन इंजेक्ट करें; हाइड्रोजन पेरोक्साइड से टिशू ऑक्सीजन बढ़ाएं।",
      farmer: "सूजन पर बर्फ की पट्टी रखें; चीरा कभी न लगाएं; रोगी पशु के गोबर व चारे को जला दें।"
    },
    labTest: { name: "Muscle Exudate Smear (Gram Stain)", sample: "सूजन से निकाला गया स्राव", cost: "₹200 - ₹300", significance: "ग्राम-पॉजिटिव बीजाणुधारी क्लॉस्ट्रिडियम जीवाणु की पहचान।" },
    rxInjections: "Inj. Benzyl Penicillin 40 Lac IM BID + Inj. Melonex 15ml IM।",
    rxOral: "विटामिन B-Complex व लिवर टॉनिक 50ml प्रतिदिन 5 दिन तक।",
    rxAyurved: "हल्दी (50g) + चूना (5g) का गर्म लेप प्रारंभिक सूजन पर लगाएं।",
    rxHome: "सूजन वाले पुट्ठे पर ठंडे पानी या बर्फ की निरंतर सिकाई करें।",
    biosecurity: "शव को 6 फीट गहरे गड्ढे में चूना डालकर दफनाएं। मिट्टी को जीवाणुमुक्त करें।",
    pregnancy: "Safe (पेनिसिलिन व ऑक्सीटेट्रासाइक्लिन अनुशंसित डोज़ में गर्भ-सुरक्षित हैं)।",
    recoveryDays: "न्यूनतम: 5 दिन | अधिकतम: 10 दिन",
    redFlags: "मांसपेशियों का पूरी तरह काला व संवेदनहीन पड़ना।"
  },
  {
    id: 3,
    name: "खुरपका-मुँहपका (FMD / Foot & Mouth)",
    localName: "खुरपका, मुँहपका, रोड़ा, खुरहा",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Aphthovirus / Picornaviridae)",
    category: "HIGH",
    temp: "104-105°F",
    traits: { temp: "HIGH", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", appetite: "OFF", cardinalSign: "MOUTH_BLISTERS" },
    cardinal: "जीभ, मसूड़ों व खुरों के मध्य छाले (Vesicles), मुंह से लगातार तार जैसी चिपचिपी लार टपकना।",
    onSiteConfirm: "जीभ पर फटे हुए छालों का लाल कच्चा घाव; खुरों के बीच बदबूदार घाव व कीड़े (मैगट्स) पड़ने का खतरा।",
    stages: {
      s1: "प्रारंभिक (Stage 1): 105°F बुखार, मुंह व खुरों में गर्माहट, सुस्ती, दूध 50% गिरना।",
      s2: "तीव्र (Stage 2): छालों का फटना, लार की रस्सियां लटकना, लंगड़ाना, खाना छोड़ना।",
      s3: "क्रोनिक (Stage 3): खुर का खुरचना/उखड़ना, पेंटिंग (हांफना) सिंड्रोम, दूध स्थायी कम होना।"
    },
    trajectories: {
      positive: "सहायक एंटीबायोटिक व एंटीसेप्टिक धुलाई से: 5 दिन में छाले सूखना ➔ 14 दिन में लंगड़ाहट समाप्त।",
      negative: "उपेक्षा पर: खुरों में मैगट्स, थनों पर स्थायी घाव, छोटे बच्चों में मायोकार्डिटिस से आकस्मिक मृत्यु।"
    },
    symptoms: "गंभीर लंगड़ाहट, दाना-चारा न चबा पाना, खुरों में कीड़े पड़ने का खतरा, दूध उत्पादन 80% घटना।",
    drugs: {
      generic: "Ceftriaxone Sodium (10 mg/kg IM) + Flunixin Meglumine (1.1-2.2 mg/kg IV/IM) + Chlorpheniramine (10 ml)।",
      ethical: "Intacef 3g (Intas, ₹210) / Megludyne (Virbac, ₹160) + Zeet (Alembic, ₹65)।",
      correctEffect: "द्वितीयक जीवाणु संक्रमण रोकथाम व मुंह/पैर के तीव्र दर्द का तत्काल निवारण।",
      hazardWrong: "बिना एंटीसेप्टिक देखभाल के मक्खियां बैठने से खुरों में गहरे कीड़े पड़ना।"
    },
    protocols: {
      doctor: "दूध देने वाले पशुओं में थनैल रोकने हेतु इंट्रा-मेमरी ट्यूब सुरक्षित रखें; छोटे बछड़ों के दिल की धड़कन जांचें।",
      farmer: "पोटाश (लाल दवा 1:1000) से मुंह व पैर दिन में 3 बार धोएं; दलिया, शहद व मक्खन दें।"
    },
    labTest: { name: "Antigen Detection ELISA / RT-PCR", sample: "छालों का द्रव (Vesicular fluid)", cost: "₹400 - ₹800", significance: "FMD विषाणु सीरोटाइप (O, A, Asia-1) की पुष्टि।" },
    rxInjections: "Inj. Ceftriaxone 3g IM + Inj. Flunixin Meglumine 15ml IM + Inj. Zeet 10ml IM।",
    rxOral: "Boric acid + Glycerin पेस्ट बनाकर जीभ पर दिन में 3 बार लगाएं।",
    rxAyurved: "हल्दी पाउडर (25g) + देशी घी (50g) का लेप मुंह के छालों पर लगाएं।",
    rxHome: "खुरों के घावों पर नीम की छाल व पत्तियों को उबालकर ठंडे पानी से धुलाई करें।",
    biosecurity: "स्वस्थ पशुओं से अलग रखें। बाड़े के द्वार पर चूना व फिनाइल फुटपाथ बनाएं।",
    pregnancy: "Safe (सहायक एंटीबायोटिक व दर्द निवारक सुरक्षित हैं)।",
    recoveryDays: "न्यूनतम: 10 दिन | अधिकतम: 21 दिन",
    redFlags: "छोटे बछड़ों में दिल का दौरा (Tiger Heart disease) से अचानक मृत्यु।"
  },
  {
    id: 4,
    name: "थनैल / मेस्टाइटिस (Mastitis)",
    localName: "थनिला, गारगा, सरका, अयन सूजन",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Staphylococcus, Streptococcus, E. coli)",
    category: "NORMAL",
    temp: "101.5-103°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", appetite: "NORMAL", cardinalSign: "UDDER_HARD" },
    cardinal: "अयन/थन में कड़ापन व गांठें, अयन लाल व गर्म, दूध में खून, छिछड़े (Flakes) या पीले पानी का आना।",
    onSiteConfirm: "स्ट्रिप कप टेस्ट में दूध में थक्के/छिछड़े; प्रभावित थन को छूने पर पशु का दर्द से लात मारना।",
    stages: {
      s1: "सब-क्लिनिकल: बाहर से सूजन नहीं, लेकिन दूध में pH व सोमैटिक सेल काउंट अधिक।",
      s2: "क्लिनिकल: थन लाल व गर्म, दूध में छिछड़े/खून, दूध का फटना, अयन कड़ा।",
      s3: "गैंग्रिनस: थन नीला-काला पड़ना, ठंडा होना, दूध की जगह बदबूदार पीला पानी।"
    },
    trajectories: {
      positive: "तुरंत इंट्रा-मेमरी ट्यूब व सिस्टमिक दवा से: 48 घंटे में दूध साफ ➔ 5 दिन में अयन सामान्य।",
      negative: "अनुपचारित रहने पर: थन स्थायी रूप से बंद (Blind Teat) या पूरा अयन नष्ट होना।"
    },
    symptoms: "दूध दुहने पर दर्द से लात मारना, दूध का फटना, प्रभावित थन का दूध सूख जाना।",
    drugs: {
      generic: "Ceftiofur Sodium (1g IM) + Serratiopeptidase (10 ml IM) + Meloxicam (15 ml) + Intramammary Infusion।",
      ethical: "Xyrofur (Intas, ₹450) / Cflox TZ Teat Infusion (Intas, ₹85) + Melonex (Intas, ₹95)।",
      correctEffect: "अयन की ग्रंथियों में जीवाणु नाश, फाइब्रिन क्लॉट्स का पिघलाव व सूजन मुक्ति।",
      hazardWrong: "अधूरा दूध निकालकर ट्यूब चढ़ाने से संक्रमण का ऊपरी ऊतकों में स्थायी प्रसार।"
    },
    protocols: {
      doctor: "दूध का कल्चर व सेंसिटिविटी टेस्ट कराएं; थन को पूरा खाली करके ही इंट्रा-मेमरी ट्यूब डालें।",
      farmer: "दुहने के बाद 30 मिनट तक पशु को बैठने न दें; थनों को पोटाश पानी से धोएं।"
    },
    labTest: { name: "California Mastitis Test (CMT)", sample: "ताज़ा अयन दूध (Milk)", cost: "₹100 - ₹200", significance: "सोमैटिक सेल व जेल फॉर्मेशन से मेस्टाइटिस की सटीक पुष्टि।" },
    rxInjections: "Inj. Ceftiofur 1g IM + Inj. Serratiopeptidase 10ml IM + Inj. Melonex 15ml IM + Teat Tube।",
    rxOral: "Trisodium Citrate पाउडर 30 ग्राम प्रतिदिन लगातार 5 दिन तक दें।",
    rxAyurved: "घृतकुमारी (250g) + हल्दी (50g) + चूना (15g) पीसकर थन पर लेप करें।",
    rxHome: "दूध पूरी तरह निकालकर प्रभावित थन पर बर्फ की सिकाई करें।",
    biosecurity: "दूध निकालने के बाद थनों को 0.5% पोविडोन आयोडीन में डुबोएं (Teat Dip)।",
    pregnancy: "Safe (सेफ्टियोफ़र व स्थानीय ट्यूब पूरी तरह सुरक्षित हैं)।",
    recoveryDays: "न्यूनतम: 4 दिन | अधिकतम: 8 दिन",
    redFlags: "थन काला या बर्फ सा ठंडा पड़ना (Gangrenous Mastitis)।"
  },
  {
    id: 5,
    name: "दुग्ध ज्वर / मिल्क फीवर (Milk Fever)",
    localName: "सूतिका ज्वर, ब्याने की अकड़न, हाइपोकैल्सीमिया",
    etiologyType: "METABOLIC",
    etiologyName: "उपापचयी विकार (तीव्र कैल्शियम अल्पता - Hypocalcemia)",
    category: "SUB",
    temp: "<100°F (अल्प तापमान)",
    traits: { temp: "SUB", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", appetite: "OFF", cardinalSign: "STERNAL_RECUMBENCY" },
    cardinal: "प्रसव के 24-48 घंटे बाद गर्दन 'S' आकार में मोड़कर बैठना (Sternal Recumbency), कान व खुर बर्फ जैसे ठंडे।",
    onSiteConfirm: "गुदा का तापमान 98°F से कम; पुतलियां फैली हुई; सीने के बल बैठकर सिर को कोख की ओर मोड़ना।",
    stages: {
      s1: "स्टेज 1: मांसपेशियों में कंपन, लड़खड़ाहट, दांत किटकिटाना, उत्तेजना।",
      s2: "स्टेज 2: सीने के बल बैठना, गर्दन मोड़ना, कान ठंडे, जुगाली व गोबर बंद।",
      s3: "स्टेज 3: पूरी तरह करवट के बल लेट जाना (Lateral Recumbency), कोमा, मृत्यु।"
    },
    trajectories: {
      positive: "धीमी गति से IV कैल्शियम चढ़ने के 30 मिनट में: कान गर्म होना ➔ गोबर करना ➔ 1 घंटे में उठकर खड़े होना।",
      negative: "उपचार न मिलने पर: 12-24 घंटे में ब्लोट, कार्डियक अरेस्ट और निश्चित मृत्यु।"
    },
    symptoms: "शरीर का तापमान 97-99°F तक गिरना, पुतलियों का फैलना, मांसपेशियों में कंपन, उठने में असमर्थ।",
    drugs: {
      generic: "Calcium Borogluconate 25% with Mg & P (Mifex / Calborol) 450 ml (आधा धीमे IV + आधा SC)।",
      ethical: "Mifex 450ml (Novartis/Elanco, ₹340) / Calborol (Virbac, ₹320)।",
      correctEffect: "रक्त में आयनाइज्ड कैल्शियम का स्तर बहाल कर मांसपेशियों व तंत्रिकाओं का संकुचन शुरू करना।",
      hazardWrong: "कैल्शियम तेजी से IV देने पर हृदय गति रुकना (Cardiac Arrest)। स्टेथोस्कोप अनिवार्य।"
    },
    protocols: {
      doctor: "IV ड्रिप की गति अत्यंत धीमी (15-20 मिनट) रखें; हृदय की धड़कन पर निरंतर कान रखें।",
      farmer: "खड़े होने तक पशु को सीने के बल ही सहारा देकर बिठाएं, करवट न होने दें; सारा दूध एक साथ न दुहें।"
    },
    labTest: { name: "Serum Calcium Level", sample: "Serum (Clotted Blood)", cost: "₹300 - ₹500", significance: "सीरम कैल्शियम 8 mg/dl से घटकर <5 mg/dl होना।" },
    rxInjections: "Inj. Mifex 450ml (225ml Slow IV + 225ml SC) तुरंत लगाएं।",
    rxOral: "पशु के खड़े होने के बाद Ionic Calcium Gel (300 ग्राम) मुँह से दें।",
    rxAyurved: "मेथी दाना (100g) व गुड़ की राब बनाकर गुनगुनी अवस्था में पिलाएं।",
    rxHome: "पशु के शरीर को बोरियों या गर्म कंबलों से ढकें। पुट्ठों की सूखी मालिश करें।",
    biosecurity: "गाभिन पशु को प्रसव से पूर्व अत्यधिक कैल्शियम न दें। ब्याने बाद सारा दूध न दुहें।",
    pregnancy: "Safe (आपातकालीन जीवनरक्षक चिकित्सा)।",
    recoveryDays: "न्यूनतम: 6 घंटे | अधिकतम: 2 दिन",
    redFlags: "दिल की धड़कन अनियंत्रित होना, 3 दिन तक न उठ पाना (Downer Cow)।"
  },
  {
    id: 6,
    name: "कीटोसिस (Ketosis / Acetonemia)",
    localName: "कीटो-रोग, दुर्बलता ज्वर, भूसा रोग",
    etiologyType: "METABOLIC",
    etiologyName: "उपापचयी विकार (Negative Energy Balance)",
    category: "NORMAL",
    temp: "101.5°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "NORMAL", dung: "HARD", appetite: "OFF", cardinalSign: "SWEET_BREATH" },
    cardinal: "दूध व सांस से विशिष्ट मीठी क्लोरोफॉर्म/एसीटोन जैसी गंध, पशु द्वारा दाना छोड़कर केवल सूखा भूसा खाना।",
    onSiteConfirm: "पशु दाने को सूंघकर छोड़ देता है लेकिन सूखा भूसा खाता है; सांस से मीठी फल जैसी महक।",
    stages: {
      s1: "वेस्टिंग कीटोसिस: दूध घटना, तेजी से दुबला होना, सूखा कड़ा गोबर, सुस्ती।",
      s2: "नर्वस कीटोसिस: दीवारों को चाटना, गोल घूमना, अंधापन, पागलों जैसी उत्तेजना।"
    },
    trajectories: {
      positive: "IV ग्लूकोज व प्रोपलीन ग्लाइकोल से: 24 घंटे में भूख बहाल ➔ 4 दिन में दूध सामान्य।",
      negative: "अनुपचारित रहने पर: गंभीर फैटी लिवर, अत्यधिक दुर्बलता व स्थायी बांझपन।"
    },
    symptoms: "दूध में तीव्र गिरावट, तेज़ी से दुबला होना, कब्ज़, कभी-कभी दीवारों को चाटना या पागलों जैसी हरकतें।",
    drugs: {
      generic: "Dextrose 20-50% IV + Propylene Glycol Oral + Vitamin B-Complex (Belamyl) + Phosphorus (Tonavet)।",
      ethical: "Dexona Vet (Zydus, ₹45) / Belamyl (Cadila, ₹80) / Tonophosphan (MSD, ₹280)।",
      correctEffect: "रक्त शर्करा को बढ़ाकर कीटोन बॉडीज के निर्माण चक्र को ब्रेक करना।",
      hazardWrong: "गर्भवती पशु में Isoflupredone / Dexamethasone देने से तत्काल गर्भपात।"
    },
    protocols: {
      doctor: "यूरिन स्ट्रिप से कीटोन का स्तर जांचें; नर्वस फॉर्म में शांत करने वाली दवा साथ दें।",
      farmer: "दाना-चारा अचानक न बदलें; बाईपास फैट व मीठा गुड़ आहार में शामिल करें।"
    },
    labTest: { name: "Rothera's Test (Urine Ketone Dipstick)", sample: "ताज़ा मूत्र (Urine)", cost: "₹50 - ₹150", significance: "मूत्र में कीटोन बॉडीज (Acetoacetate) की त्वरित पुष्टि।" },
    rxInjections: "Inj. 25% Dextrose 1000ml IV + Inj. Belamyl 10ml IM + Inj. Tonavet 10ml IM।",
    rxOral: "Propylene Glycol (200 ml दिन में दो बार) 4 दिन तक मुँह से दें।",
    rxAyurved: "गुड़ (250g) + सोंठ (30g) + जीरा (25g) का काढ़ा बनाकर ऊर्जा हेतु दें।",
    rxHome: "आहार में तुरंत स्टार्च व पचने योग्य कार्बोहाइड्रेट शामिल करें।",
    biosecurity: "ब्याने के बाद उच्च ऊर्जा युक्त संतुलित आहार और मिनरल मिक्सचर दें।",
    pregnancy: "⚠️ लाल चेतावनी: गाभिन पशुओं में Isoflupredone / Dexamethasone गर्भपात करा सकता है, स्टेरॉयड न दें।",
    recoveryDays: "न्यूनतम: 3 दिन | अधिकतम: 6 दिन",
    redFlags: "तंत्रिका संबंधी लक्षण (Nervous Ketosis), सिर पटकना।"
  },
  {
    id: 7,
    name: "अफारा / ब्लोट (Tympanitis / Bloat)",
    localName: "आफरा, पेट फूलना, बादी, धोंकणी",
    etiologyType: "METABOLIC",
    etiologyName: "पाचन विकार (Rumen Fermentation Disorder)",
    category: "NORMAL",
    temp: "101-102°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "NORMAL", dung: "HARD", appetite: "OFF", cardinalSign: "LEFT_FLANK_DRUM" },
    cardinal: "बायाँ पेट (Left Paralumbar Fossa) ढोलक की तरह फूलना, थपथपाने पर खोखली ड्रम जैसी गूंज।",
    onSiteConfirm: "बाएं पेट पर उंगली मारने पर 'टिन-टिन' ढोलक जैसी गूंज; सांस में तकलीफ से जीभ बाहर निकलना।",
    stages: {
      s1: "हल्का आफरा: बायाँ पेट हल्का फूला, बेचैनी, बार-बार उठना-बैठना।",
      s2: "गंभीर आफरा: पेट अत्यधिक तना हुआ, मुंह से झाग, हांफना, आंखें बाहर आना।",
      s3: "अति-घातक: डायफ्राम पर दबाव से दम घुटना, फेफड़े फटना, गिरकर मृत्यु।"
    },
    trajectories: {
      positive: "एंटी-ब्लोट व तेल से: 30 मिनट में डकार आना ➔ 2 घंटे में पेट सामान्य।",
      negative: "अनुपचारित रहने पर: 1-2 घंटे के भीतर फेफड़े दबने से सांस घुटकर मृत्यु।"
    },
    symptoms: "सांस लेने में कष्ट, मुंह खोलकर जीभ बाहर निकालना, बेचैनी, बार-बार उठना-बैठना व पेट पर लात मारना।",
    drugs: {
      generic: "Dimethicone / Silica emulsion (Tympanol) + Spasmo-vet (Dicyclomine 15ml IM)। अति गंभीर में Trocar Cannula।",
      ethical: "Tympanol 100ml (Virbac, ₹85) / Bloatosil (Intas, ₹90) + Spasmovet (Cadila, ₹75)।",
      correctEffect: "झागदार बुलबुलों का सतही तनाव तोड़कर गैस को मुक्त करना।",
      hazardWrong: "सांस की नली में तेल चले जाना (Aspiration Pneumonia)। नाल बहुत सावधानी से दें।"
    },
    protocols: {
      doctor: "अति गंभीर स्थिति में बाएं पेट के त्रिकोण (Left Flank) में Trocar & Cannula से सीधे गैस निकालें।",
      farmer: "पशु के मुंह में लकड़ी का डंडा बांधें; पशु को आगे से ऊंचे स्थान पर खड़ा रखें।"
    },
    labTest: { name: "Rumen Fluid pH & Protozoal Motility", sample: "पेट का पानी (Rumen Liquor)", cost: "₹150 - ₹250", significance: "झागदार या गैसयुक्त आफरे और माइक्रोफ्लोरा असंतुलन की पुष्टि।" },
    rxInjections: "Inj. Spasmovet 15ml IM + Trocar Cannula (यदि दम घुट रहा हो)।",
    rxOral: "Tympanol 100ml + 250ml सरसों का तेल + 30ml तारपीन तेल मिलाकर दें।",
    rxAyurved: "हींग (10g) + काला नमक (50g) + अजवाइन (50g) गुनगुने पानी में दें।",
    rxHome: "पशु के मुंह में लकड़ी का डंडा बांधें ताकि लार व डकार से गैस निकले।",
    biosecurity: "ओस वाली गीली बरसीम या अधिक सड़ा-गला दाना पशु को एक साथ न चरने दें।",
    pregnancy: "Safe (सरसों तेल, हींग व कार्मिनेटिव मिश्रण पूरी तरह सुरक्षित हैं)।",
    recoveryDays: "न्यूनतम: 4 घंटे | अधिकतम: 2 दिन",
    redFlags: "नीली जीभ निकालकर पशु का सांस घुटने से गिर पड़ना।"
  },
  {
    id: 8,
    name: "थायलेरियासिस (Theileriosis)",
    localName: "बड़ी गिल्टी, चिचड़ी बुखार, थिलेरिया",
    etiologyType: "PROTOZOAL",
    etiologyName: "रक्त परजीवी (Theileria annulata)",
    category: "HIGH",
    temp: "105-107°F",
    traits: { temp: "HIGH", eyes: "PALE_YELLOW", urine: "NORMAL", dung: "NORMAL", appetite: "OFF", cardinalSign: "LYMPH_SWELLING" },
    cardinal: "कंधे के आगे (Prescapular) या जांघ की लिम्फ ग्रंथियों में भारी कड़ा उभार, अत्यधिक तेज़ 106°F बुखार।",
    onSiteConfirm: "कंधे के ठीक आगे लिम्फ नोड का सेब या गेंद जैसा कठोर फूल जाना; आंखों में पीलापन व पानी।",
    stages: {
      s1: "प्रारंभिक: 106°F लगातार बुखार, कंधे की गिल्टी में सूजन, आंखों से पानी।",
      s2: "तीव्र: गंभीर खून की कमी, सांस तेज चलना, कमजोरी, चिचड़ियों का संक्रमण।",
      s3: "अंतिम: फेफड़ों में पानी भरना (Pulmonary Edema), मुंह-नाक से झाग, मृत्यु।"
    },
    trajectories: {
      positive: "Buparvaquone की एकल खुराक से: 48 घंटे में बुखार सामान्य ➔ 7-10 दिन में लिम्फ नोड सामान्य।",
      negative: "अनुपचारित रहने पर: 7 से 12 दिन में फेफड़ों में झाग भरकर दम घुटने से मृत्यु।"
    },
    symptoms: "आँखों की झिल्ली में पीलापन व खून की कमी, सांस तेज़ चलना, आँखों से पानी, चिचड़ी का प्रकोप।",
    drugs: {
      generic: "Buparvaquone (2.5 mg/kg Deep IM single dose) + Oxytetracycline LA (20 mg/kg) + Meloxicam + Belamyl।",
      ethical: "Zubion (Virbac, ₹1150) / Butalex (MSD, ₹1280) + Melonex (Intas, ₹95)।",
      correctEffect: "थायलेरिया के शाइजॉन्ट्स व पिरोप्लाज्म्स के इलेक्ट्रॉन ट्रांसपोर्ट सिस्टम का पूर्ण खात्मा।",
      hazardWrong: "गलत इंजेक्शन जैसे Diminazene देने से थायलेरिया पर कोई असर नहीं होता और पशु मर जाता है।"
    },
    protocols: {
      doctor: "Buparvaquone केवल गर्दन की गहरी मांसपेशी में एक ही जगह लगाएं; फेफड़ों की सूजन में Frusemide दें।",
      farmer: "पशु के शरीर से सभी चिचड़ियां हटाएं; बाड़े में Butox का स्प्रे अनिवार्य करें।"
    },
    labTest: { name: "Lymph Node Biopsy / Giemsa Smear", sample: "लिम्फ नोड स्राव / कान का रक्त", cost: "₹250 - ₹400", significance: "कोच के नीले कण (Koch's Blue Bodies) की पुष्टि।" },
    rxInjections: "Inj. Zubion (Buparvaquone) 2.5 mg/kg Deep IM एकल खुराक + Inj. Belamyl 10ml IM।",
    rxOral: "Sharkoferrol Vet 50ml प्रतिदिन हीमोग्लोबिन सुधारने हेतु।",
    rxAyurved: "चिरायता (50g) + गिलोय का काढ़ा बुखार व प्रतिरोधक क्षमता हेतु।",
    rxHome: "पशु के शरीर पर मक्खन-नीम तेल का लेप लगाकर चिचड़ियां हटाएं।",
    biosecurity: "बाड़े में Butox (2ml/Ltr) का छिड़काव कर चिचड़ियों को पूरी तरह नष्ट करें।",
    pregnancy: "Safe (Buparvaquone अनुशंसित मात्रा में गर्भ-सुरक्षित है)।",
    recoveryDays: "न्यूनतम: 7 दिन | अधिकतम: 15 दिन",
    redFlags: "नाक से झागदार पानी निकलना (Pulmonary Edema)।"
  },
  {
    id: 9,
    name: "बबेशियोसिस / लाल पेशाब (Babesiosis / Red Water)",
    localName: "रत्ता, लाल पेशाब, टिक फीवर, झरना",
    etiologyType: "PROTOZOAL",
    etiologyName: "रक्त परजीवी (Babesia bigemina)",
    category: "HIGH",
    temp: "105-107°F",
    traits: { temp: "HIGH", eyes: "PALE_YELLOW", urine: "RED_COFFEE", dung: "NORMAL", appetite: "OFF", cardinalSign: "RED_URINE" },
    cardinal: "कॉफी या गहरे लाल रंग का पेशाब (Haemoglobinuria), तेज़ 106°F बुखार, दिल की तेज़ धड़कन (Pounding Heart)।",
    onSiteConfirm: "पेशाब कांच की शीशी में लेने पर बिल्कुल पारदर्शी लाल/कॉफी जैसा (खून के थक्के नहीं, बल्कि हीमोग्लोबिन)।",
    stages: {
      s1: "प्रारंभिक: 106°F बुखार, पेशाब का रंग हल्का लाल, दिल की धड़कन तेज।",
      s2: "तीव्र: गहरा कॉफी जैसा पेशाब, आंखें बिल्कुल सफेद-पीली, अत्यधिक कमजोरी।",
      s3: "अंतिम: गंभीर हाइपोक्सिया, लड़खड़ाहट, पीलिया, दिल फेल होने से मृत्यु।"
    },
    trajectories: {
      positive: "Diminazene के 12 घंटे बाद: पेशाब का रंग साफ ➔ 24 घंटे में बुखार खत्म ➔ 5 दिन में रक्त स्तर सुधार।",
      negative: "अनुपचारित रहने पर: 48-72 घंटे में खून का पानी बन जाना और दिल का दौरा।"
    },
    symptoms: "अत्यधिक रक्ताल्पता (आँखें सफेद-फीकी पड़ना), पीलिया, अत्यधिक दुर्बलता, पशु का लड़खड़ाना।",
    drugs: {
      generic: "Diminazene Aceturate (3.5 mg/kg Deep IM) + Pheniramine (10 ml) + Belamyl (10 ml) + RL ड्रिप।",
      ethical: "Berenil (MSD, ₹85) / Diminasan (Zydus, ₹90) + Avil (Sanofi, ₹85)।",
      correctEffect: "बबेशिया परजीवियों के डीएनए संश्लेषण को रोककर आरबीसी के विनाश को तुरंत थामना।",
      hazardWrong: "Diminazene की ओवरडोज़ देने से केंद्रीय तंत्रिका तंत्र पर दुष्प्रभाव व झटके लगना।"
    },
    protocols: {
      doctor: "पशु को तनाव न दें; डिहाइड्रेशन रोकने हेतु Ringer Lactate ड्रिप धीरे-धीरे चढ़ाएं।",
      farmer: "पशु के सिर पर ठंडा पानी डालें; भरपूर शीतल जल व ओआरएस पीने को दें।"
    },
    labTest: { name: "Giemsa Stained Blood Smear", sample: "Peripheral Blood (कान की नस से)", cost: "₹200 - ₹350", significance: "RBC में नाशपाती के आकार के युग्म (Paired Piroplasms)।" },
    rxInjections: "Inj. Berenil (Diminazene) 3.5 mg/kg Deep IM + Inj. Avil 10ml IM + Inj. Belamyl 10ml IM।",
    rxOral: "Feritas / Dexorange सिरप 50ml प्रतिदिन खून बढ़ाने हेतु।",
    rxAyurved: "गिलोय सत (10g) + मिश्री (50g) का घोल शरीर को शीतल करने हेतु।",
    rxHome: "पशु के सिर पर ठंडा पानी डालें। भरपूर शीतल जल व ओआरएस दें।",
    biosecurity: "बोफिलस चिचड़ी का रासायनिक कीटनाशकों से उन्मूलन करें।",
    pregnancy: "Safe (बेरेनिल सटीक डोज़ में सुरक्षित है, ओवरडोज़ से बचें)।",
    recoveryDays: "न्यूनतम: 4 दिन | अधिकतम: 8 दिन",
    redFlags: "पेशाब का रंग काला पड़ना व आंखें दूध जैसी सफेद होना।"
  },
  {
    id: 10,
    name: "एनाप्लास्मोसिस (Anaplasmosis / Gall Sickness)",
    localName: "पीलिया बुखार, पित्त रोग, सूखा पीलिया",
    etiologyType: "PROTOZOAL",
    etiologyName: "रक्त परजीवी (Anaplasma marginale)",
    category: "HIGH",
    temp: "104-106°F",
    traits: { temp: "HIGH", eyes: "YELLOW", urine: "YELLOW", dung: "HARD", appetite: "OFF", cardinalSign: "SEVERE_JAUNDICE" },
    cardinal: "अत्यधिक गहरा पीलिया (आँखें, मसूड़े व योनि श्लेष्मा गहरे पीले), पेशाब पीला (लाल नहीं), सख्त सूखा गोबर।",
    onSiteConfirm: "आंखों व मसूड़ों का हल्दी जैसा गहरा पीला होना; पेशाब केवल पीला होना (लाल नहीं); सख्त गोबर।",
    stages: {
      s1: "प्रारंभिक: 105°F बुखार, भूख गायब, सख्त सूखा गोबर, सुस्ती।",
      s2: "तीव्र: गंभीर पीलिया, आंखें व मसूड़े गहरे पीले, पेशाब गहरा पीला, आक्रामकता।",
      s3: "अंतिम: भयंकर दुर्बलता, सांस फूलना, कोमा व मृत्यु।"
    },
    trajectories: {
      positive: "ऑक्सीटेट्रासाइक्लिन LA से: 48 घंटे में बुखार गायब ➔ 10 दिन में पीलिया समाप्त।",
      negative: "अनुपचारित रहने पर: पित्त की अत्यधिक अधिकता और लिवर फेलियर से मृत्यु।"
    },
    symptoms: "तेज़ बुखार, भूख पूर्णतः बंद, गंभीर कब्ज़, आक्रामकता, अत्यधिक कमजोरी।",
    drugs: {
      generic: "Oxytetracycline LA (20 mg/kg Deep IM दो बार, 72 घंटे के अंतर पर) + Iron Dextran + Belamyl + Liv-52।",
      ethical: "Terramycin LA (Zoetis, ₹240) / Belamyl (Cadila, ₹80) + Liv-52 Vet (Himalaya, ₹180)।",
      correctEffect: "आरबीसी की परिधि पर स्थित एनाप्लाज्मा परजीवियों का खात्मा व लिवर सुरक्षा।",
      hazardWrong: "Diminazene (Berenil) देना बिल्कुल व्यर्थ है, क्योंकि यह एनाप्लाज्मा पर काम नहीं करता।"
    },
    protocols: {
      doctor: "सुई व सीरिंज हर पशु के लिए अलग उपयोग करें (रक्त संचरण से फैलता है)।",
      farmer: "कब्ज़ दूर करने हेतु हरा चारा, मीठा सोडा व चोकर की पतली राब दें।"
    },
    labTest: { name: "Thin Blood Smear (Giemsa)", sample: "Whole Blood (EDTA)", cost: "₹200 - ₹300", significance: "RBC की परिधि (Margin) पर गहरे बिंदु रूपी सूक्ष्मजीवी।" },
    rxInjections: "Inj. Terramycin LA 20 mg/kg Deep IM + Inj. Belamyl 10ml IM + Inj. Liv-52।",
    rxOral: "Liv-52 Vet 100ml प्रतिदिन + मीठा सोडा 50g कब्ज़ दूर करने हेतु।",
    rxAyurved: "पुनर्नवा चूर्ण (30g) + भुईं-आंवला (30g) लिवर सुरक्षा हेतु।",
    rxHome: "ईसबगोल की भूसी (50g) पानी में भिगोकर सख्त गोबर निकालने हेतु दें।",
    biosecurity: "सुई (Needles) का पुनः उपयोग न करें (रक्त द्वारा संचरण)।",
    pregnancy: "Safe (Oxytetracycline LA अनुशंसित डोज़ में सुरक्षित है)।",
    recoveryDays: "न्यूनतम: 7 दिन | अधिकतम: 14 दिन",
    redFlags: "गंभीर अनीमिया और पित्ताशय (Gall bladder) फटने का जोखिम।"
  },
  {
    id: 11,
    name: "पीपीआर / बकरी प्लेग (PPR in Goat & Sheep)",
    localName: "बकरी प्लेग, मुंह-पका दस्त, कटार",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Morbillivirus)",
    category: "HIGH",
    temp: "104-106°F",
    traits: { temp: "HIGH", eyes: "RED", urine: "NORMAL", dung: "DIARRHEA", appetite: "OFF", cardinalSign: "MOUTH_EROSION_DIARRHEA" },
    cardinal: "मुंह के अंदर व्यापक छाले व सड़न, आंखों-नाक से गाढ़ा मवाद, अत्यधिक बदबूदार पानी जैसा दस्त।",
    onSiteConfirm: "बकरी के मुंह में सड़ांध भरे सफेद-लाल छाले; आंखों से कीचड़; पिछले पैरों पर चिपका काला-हरा दस्त।",
    stages: {
      s1: "प्रारंभिक: 105°F बुखार, आंखें लाल, नाक से पानी, सुस्ती, दाना बंद।",
      s2: "तीव्र: मुंह में छाले, बदबूदार दस्त, खांसी व हांफना (Pneumo-enteritis)।",
      s3: "अंतिम: गंभीर डिहाइड्रेशन, शरीर सूखना, आंखें अंदर धंसना, 90% मृत्यु।"
    },
    trajectories: {
      positive: "प्रारंभिक स्टेज पर एंटीबायोटिक व ORS से: 4 दिन में दस्त बंद ➔ 10 दिन में रिकवरी।",
      negative: "अनुपचारित रहने पर: डिहाइड्रेशन व सेकेंडरी निमोनिया से पूरे रेवड़ का सफाया।"
    },
    symptoms: "तेज़ बुखार, निमोनिया (तेज़ सांस व खांसी), अत्यधिक डिहाइड्रेशन, मेमनों में 90% मृत्यु दर।",
    drugs: {
      generic: "Enrofloxacin LA (10 mg/kg IM) + Meloxicam (0.5 mg/kg IM) + Atropine (दस्त रोकने हेतु) + ORS।",
      ethical: "Enrocin 10% (Ranbaxy/Virbac, ₹95) + Melonex (Intas, ₹95) + Electral (FDC, ₹35)।",
      correctEffect: "द्वितीयक जीवाणुजनित निमोनिया व आंतों के अल्सर का नियंत्रण।",
      hazardWrong: "बिना इलेक्ट्रोलाइट्स/फ्लूइड के केवल कसैले पाउडर देने से डिहाइड्रेशन से मृत्यु।"
    },
    protocols: {
      doctor: "पानी की कमी पूरी करने हेतु गर्म DNS/RL ड्रिप Subcutaneous या धीमी IV दें।",
      farmer: "स्वस्थ बकरियों से तुरंत अलग करें; दिनभर में 2 लीटर ओआरएस घोल थोड़ा-थोड़ा पिलाएं।"
    },
    labTest: { name: "Competitive ELISA / RT-PCR", sample: "Ocular/Nasal Swab", cost: "₹400 - ₹700", significance: "पीपीआर विषाणु एंटीजन की पुष्टि।" },
    rxInjections: "Inj. Enrocin LA 10mg/kg IM + Inj. Melonex 3ml IM + Inj. Atropine 2ml SC।",
    rxOral: "Electral घोल 1-2 लीटर दिनभर में थोड़ा-थोड़ा पिलाएं + Kaolin सस्पेंशन।",
    rxAyurved: "बेलगिरी चूर्ण (20g) + कुटज चूर्ण (10g) छाछ में मिलाकर दें।",
    rxHome: "मुंह के छालों को फिटकरी के हल्के गुनगुने पानी से साफ करें।",
    biosecurity: "संक्रमित बकरियों को तुरंत अलग करें। प्रतिवर्ष स्वस्थ रेवड़ में PPR टीका लगवाएं।",
    pregnancy: "Safe (एंटीबायोटिक व हाइड्रेशन सुरक्षित हैं)।",
    recoveryDays: "न्यूनतम: 7 दिन | अधिकतम: 14 दिन",
    redFlags: "अत्यधिक डिहाइड्रेशन से आंखें अंदर धंस जाना व मुंह से झाग।"
  },
  {
    id: 12,
    name: "आंत्रविषाक्तता / फिड़किया (Enterotoxaemia / ET)",
    localName: "फिड़किया, गिल्टी पेट, डेलिया, टक्सिया",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Clostridium perfringens Type D)",
    category: "HIGH",
    temp: "104°F",
    traits: { temp: "HIGH", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", appetite: "OFF", cardinalSign: "OPISTHOTONOS" },
    cardinal: "अत्यधिक दाना खाने के बाद बकरियों का चक्कर खाकर गिरना, गर्दन पीछे खींचना (Opisthotonos), झाग निकलना।",
    onSiteConfirm: "अचानक अत्यधिक हरा चारा या दाना खाने का इतिहास; सिर पीछे खींचकर पैरों को साइकिल की तरह चलाना।",
    stages: {
      s1: "प्रारंभिक: सुस्ती, पेट दर्द, दांत किटकिटाना, बेचैनी।",
      s2: "तीव्र: चक्कर खाकर गिरना, सिर पीछे मुड़ना, मुंह से झाग, सांस में घरघराहट।",
      s3: "अंतिम: आक्षेप (Convulsions), कोमा और 2 घंटे के भीतर मृत्यु।"
    },
    trajectories: {
      positive: "प्रारंभिक 1 घंटे में पेनिसिलिन व मीठा सोडा मिलने पर: 60% बकरियों का बचना संभव।",
      negative: "देरी होने पर: एप्सिलॉन टॉक्सिन से गुर्दे व आंतें गल जाना (Pulpy Kidney) व 100% मृत्यु।"
    },
    symptoms: "पेट दर्द, दांत किटकिटाना, आंखें चढ़ जाना, कोमा व 2-4 घंटे में आकस्मिक मृत्यु।",
    drugs: {
      generic: "Benzyl Penicillin (40,000 IU/kg IM) + Type D Anti-toxin + Sodium Bicarbonate (मीठा सोडा)।",
      ethical: "Procaine Penicillin 40 Lac (Alembic, ₹120) + Baking Soda (Household)।",
      correctEffect: "आंतों में क्लॉस्ट्रिडियम जीवाणु के फैलाव पर तत्काल रोक।",
      hazardWrong: "आफरा समझकर तेल नाल से जबरन पिलाने से सांस की नली में जाकर तत्काल दम घुटना।"
    },
    protocols: {
      doctor: "आंतों में पीएच बढ़ाने हेतु मीठा सोडा तुरंत नाल से दिलवाएं; पेनिसिलिन उच्च मात्रा में दें।",
      farmer: "दाना-बांट तुरंत पूरी तरह बंद करें; केवल सूखी झाड़ियां या पत्तियां दें।"
    },
    labTest: { name: "Glucosuria Urine Test", sample: "मूत्र (Urine) / आंत का स्राव", cost: "₹100 - ₹200", significance: "मूत्र में भारी ग्लूकोज (Pulpy Kidney) की पुष्टि।" },
    rxInjections: "High dose Inj. Benzyl Penicillin 40 Lac IM + Inj. Spasmovet।",
    rxOral: "Sodium Bicarbonate (मीठा सोडा 15-20 ग्राम) पानी में घोलकर पिलाएं।",
    rxAyurved: "अदरक व पुदीना रस पेट की ऐंठन कम करने हेतु।",
    rxHome: "दाना पूरी तरह बंद करें, केवल सूखी पत्तियां या चारा दें।",
    biosecurity: "बरसात से पहले ET टीका अवश्य लगवाएं। अचानक दाने की मात्रा न बढ़ाएं।",
    pregnancy: "Safe (पेनिसिलिन सुरक्षित है)।",
    recoveryDays: "न्यूनतम: 1 दिन | अधिकतम: 3 दिन",
    redFlags: "बकरियों का उछल-कूद कर अचानक दम तोड़ देना।"
  },
  {
    id: 13,
    name: "गिल्टी रोग / एंथ्रेक्स (Anthrax)",
    localName: "तिल्ली रोग, जहरी बुखार, गिल्टी, प्लीहा ज्वर",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Bacillus anthracis - ज़ूनोटिक)",
    category: "HIGH",
    temp: "106-108°F",
    traits: { temp: "HIGH", eyes: "RED", urine: "NORMAL", dung: "BLOODY", appetite: "OFF", cardinalSign: "TAR_BLOOD" },
    cardinal: "प्राकृतिक छेदों (नाक, मुंह, गुदा) से बिना जमा हुआ तारकोल जैसा काला खून रिसना, शव में अकड़न न होना।",
    onSiteConfirm: "मृत्यु के बाद शव अकड़ता नहीं (No Rigor Mortis); गुदा व नाक से काला न जमने वाला खून रिसना।",
    stages: {
      s1: "पेरएक्यूट: पशु बिना लक्षण दिखाए चरते-चरते गिरकर मर जाता है।",
      s2: "एक्यूट: 107°F बुखार, दम घुटना, पेट फूलना, प्राकृतिक छेदों से काला खून।"
    },
    trajectories: {
      positive: "अति-प्रारंभिक अवस्था में पेनिसिलिन मिलने पर ही 20% बचने की संभावना।",
      negative: "95%+ मामलों में कुछ ही घंटों में मृत्यु; वातावरण में बीजाणु 50 वर्षों तक जीवित रहते हैं।"
    },
    symptoms: "107°F उग्र बुखार, सांस फूलना, पेट फूलना, बेचैनी व अचानक मृत्यु।",
    drugs: {
      generic: "Benzyl Penicillin (30,000 IU/kg IM) + Streptomycin (प्रारंभिक अवस्था में)।",
      ethical: "Dicrysticin-S 2.5g (Zydus, ₹95) / Penicillin 40 Lac (Alembic, ₹120)।",
      correctEffect: "एंथ्रेक्स बैसिली का विनाश।",
      hazardWrong: "पोस्टमार्टम करना सबसे बड़ा अपराध है (लाखों घातक बीजाणु हवा में फैल जाते हैं)।"
    },
    protocols: {
      doctor: "शव को कभी न चीरें; कान की नस से रक्त की बूंद लेकर स्लाइड बनाएं; प्रशासन को सूचित करें।",
      farmer: "शव को छुए बिना 6 फीट गहरे गड्ढे में 2 बोरी चूना डालकर दफनाएं।"
    },
    labTest: { name: "McFadyean's Reaction (Methylene Blue)", sample: "कान से रक्त की बूंद (चीरा न लगाएं)", cost: "₹200 - ₹400", significance: "कैप्सूल युक्त बैसिलस एंथ्रासिस की विशिष्ट पहचान।" },
    rxInjections: "Inj. Benzyl Penicillin + Inj. Streptomycin (केवल प्रारंभिक अवस्था में)।",
    rxOral: "लागू नहीं।",
    rxAyurved: "लागू नहीं।",
    rxHome: "शव को कभी न चीरें। 6 फीट गहरे गड्ढे में चूना डालकर गाड़ें।",
    biosecurity: "एंथ्रेक्स संभावित क्षेत्र में तत्काल पशु संगरोध और टीकाकरण लागू करें।",
    pregnancy: "N/A (प्राणघातक रोग)।",
    recoveryDays: "अति-दुर्लभ (मृत्यु दर 90%+)",
    redFlags: "काला खून रिसना और मनुष्यों में फैलने का जोखिम।"
  },
  {
    id: 14,
    name: "सर्रा / तिबरसा (Surra / Trypanosomiasis)",
    localName: "तिबरसा, सर्रा, मक्खी रोग, फेरा",
    etiologyType: "PROTOZOAL",
    etiologyName: "रक्त परजीवी (Trypanosoma evansi)",
    category: "HIGH",
    temp: "103-106°F",
    traits: { temp: "HIGH", eyes: "PALE", urine: "NORMAL", dung: "NORMAL", appetite: "OFF", cardinalSign: "CIRCLING_HEAD_PRESSING" },
    cardinal: "गोल-गोल चक्कर काटना, दीवारों व खूंटे से सिर दबाकर खड़े रहना, रुक-रुक कर आने वाला बुखार, अंधापन।",
    onSiteConfirm: "पशु का आंखें बंद कर खूंटे पर माथा टिकाना; गोल चक्कर काटना; रुक-रुक कर बुखार आना।",
    stages: {
      s1: "प्रारंभिक: रुक-रुक कर 104°F बुखार, आंखों से पानी, पैरों में सूजन, सुस्ती।",
      s2: "तीव्र: गोल-गोल घूमना, दीवारों से सिर टकराना, अंधापन, पागलों जैसी हरकतें।",
      s3: "क्रोनिक: कंकाल जैसा सूखना, पिछले पैरों का पक्षाघात (लकवा), मृत्यु।"
    },
    trajectories: {
      positive: "Triquin इंजेक्शन के 24 घंटे में: चक्कर काटना बंद ➔ 15 दिन में सामान्य वजन।",
      negative: "अनुपचारित रहने पर: मस्तिष्क की नसों में सूजन और लकवे से 100% मृत्यु।"
    },
    symptoms: "लगातार रंभाना, मुंह से झाग, आंखों से पानी, पिछले पैरों में पक्षाघात, कंकाल जैसा सूखना।",
    drugs: {
      generic: "Quinapyramine sulfate & chloride (4.4 mg/kg SC) अथवा Diminazene (5 mg/kg IM) + Dextrose 20%।",
      ethical: "Triquin 1.5g (Cadila, ₹220) / Antrycide Pro-salt (ICI, ₹250) + Berenil (MSD, ₹85)।",
      correctEffect: "ट्रिपैनोसोमा परजीवियों के ग्लाइकोलाइसिस और काइनेटोप्लास्ट का पूर्ण विनाश।",
      hazardWrong: "Triquin को भूलकर भी IV न लगाएं, केवल Subcutaneous लगाएं वरना शॉक से मृत्यु होगी।"
    },
    protocols: {
      doctor: "Triquin केवल चमड़ी के नीचे (SC) लगाएं; मस्तिष्क की सूजन में Mannitol या Dextrose IV दें।",
      farmer: "डंक मारने वाली मक्खियों (Tabanus) से बचाव हेतु बाड़े में नीम के पत्तों का धुआं करें।"
    },
    labTest: { name: "Wet Blood Film Examination", sample: "Peripheral Blood (बुखार के समय)", cost: "₹150 - ₹300", significance: "माइक्रोस्कोप में ट्रिपैनोसोमा की तीव्र गतिशीलता (Motility)।" },
    rxInjections: "Inj. Triquin (Quinapyramine) 4.4 mg/kg SC + Inj. Neurokind Plus 10ml IM + 20% Dextrose।",
    rxOral: "Mecobalamin टॉनिक नसों की कमजोरी दूर करने हेतु।",
    rxAyurved: "अश्वगंधा चूर्ण (30g) तांत्रिक दुर्बलता दूर करने हेतु।",
    rxHome: "सिर पर ठंडे पानी की धार डालें ताकि मस्तिष्क की सूजन कम हो।",
    biosecurity: "डंक मारने वाली मक्खियों का नियंत्रण बाड़े में धुआं व कीटनाशक से करें।",
    pregnancy: "Safe (Triquin सावधानी से सटीक वजन अनुसार दें)।",
    recoveryDays: "न्यूनतम: 7 दिन | अधिकतम: 21 दिन",
    redFlags: "पागलों जैसी हरकतें और अचानक गिरकर कोमा में चले जाना।"
  },
  {
    id: 15,
    name: "रेबीज / अलर्क रोग (Rabies)",
    localName: "अलर्क, पागलपन, जलभीति, बावला रोग",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Lyssavirus - 100% प्राणघातक)",
    category: "NORMAL",
    temp: "101.5-103°F",
    traits: { temp: "NORMAL", eyes: "RED", urine: "NORMAL", dung: "NORMAL", appetite: "OFF", cardinalSign: "HYDROPHOBIA_BELL" },
    cardinal: "अत्यधिक उत्तेजना, पागलपन, बिना कारण लगातार खोखली आवाज़ में रंभाना, लार टपकना, पिछले पैरों का लकवा।",
    onSiteConfirm: "पागल कुत्ते द्वारा काटने का इतिहास; खोखली गंभीर आवाज़ में रंभाना; पानी से भय; जीभ बाहर।",
    stages: {
      s1: "उत्तेजक अवस्था (Furious): लाठी या किसी भी वस्तु को काटना, लगातार रंभाना, लार बहना।",
      s2: "डम्ब अवस्था (Paralytic): जबड़ा लटकना, निगलने में असमर्थ, पिछले अंगों का लकवा, मृत्यु।"
    },
    trajectories: {
      positive: "काटने के तुरंत बाद पोस्ट-बाइट वैक्सीन (Day 0,3,7,14,28) लगने पर 100% बचाव।",
      negative: "लक्षण प्रकट होने के बाद: दुनिया में कोई इलाज नहीं, 3 से 7 दिन में 100% निश्चित मृत्यु।"
    },
    symptoms: "पानी व लाठी से भय, आक्रामकता, खूंटे पर सिर पटकना, चारा-पानी निगलने में असमर्थता।",
    drugs: {
      generic: "Anti-Rabies Inactivated Cell Culture Vaccine (1 ml SC/IM) पोस्ट-बाइट शिड्यूल पर।",
      ethical: "Raksharab (Indian Immunologicals, ₹75) / Nobivac Rabies (MSD, ₹95)।",
      correctEffect: "वायरस के केंद्रीय तंत्रिका तंत्र में पहुंचने से पहले एंटीबॉडी निर्माण द्वारा शमन।",
      hazardWrong: "लक्षण आने के बाद पशु के मुंह में हाथ डालना (मनुष्य में फैलने का 100% खतरा)।"
    },
    protocols: {
      doctor: "लक्षण आने पर पशु को अलग सुरक्षित बाड़े में बांधें; किसी को पास न जाने दें।",
      farmer: "काटे गए घाव को तुरंत बहते पानी और कपड़े धोने वाले साबुन से 15 मिनट तक धोएं।"
    },
    labTest: { name: "Direct Fluorescent Antibody (Post Mortem)", sample: "मस्तिष्क ऊतक", cost: "सरकारी लैब", significance: "नेग्री बॉडीज (Negri Bodies) की पुष्टि।" },
    rxInjections: "Post-bite Anti-Rabies Vaccine (Day 0, 3, 7, 14, 28) केवल काटने के तुरंत बाद।",
    rxOral: "लागू नहीं।",
    rxAyurved: "लागू नहीं।",
    rxHome: "काटे गए स्थान को तत्काल बहते नल के पानी और साबुन से 15 मिनट तक धोएं।",
    biosecurity: "लक्षण प्रकट होने पर पशु को सुरक्षित लोहे के पिंजरे/बाड़े में बांधें।",
    pregnancy: "Safe (एंटी-रेबीज टीका गर्भ में पूरी तरह सुरक्षित है)।",
    recoveryDays: "असाध्य (लक्षण आने के 3-7 दिन में निश्चित मृत्यु)",
    redFlags: "मनुष्यों में लार व काटने से 100% प्राणघातक संचरण।"
  },
  {
    id: 16,
    name: "सूअर ज्वर (Classical Swine Fever)",
    localName: "स्वाइन फीवर, सूअर माता, लाल चकत्ते रोग",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Pestivirus / Flaviviridae)",
    category: "HIGH",
    temp: "105-107°F",
    traits: { temp: "HIGH", eyes: "RED", urine: "NORMAL", dung: "DIARRHEA", appetite: "OFF", cardinalSign: "PURPLE_SKIN" },
    cardinal: "कान, थूथन, पेट व भीतरी जांघों पर बैंगनी-लाल रंग के रक्तस्रावी धब्बे (Button Ulcers / Purpura)।",
    onSiteConfirm: "कान के किनारों व पेट पर बैंगनी-नीले चकत्ते जो दबाने पर फीके नहीं पड़ते; सूअरों का एक-दूसरे पर चढ़कर ढेर लगना।",
    stages: {
      s1: "प्रारंभिक: 106°F बुखार, आंखें चिपचिपी, खाना बंद, आपस में सिमटना।",
      s2: "तीव्र: त्वचा पर बैंगनी धब्बे, उल्टी, दस्त, लड़खड़ाती चाल।",
      s3: "अंतिम: कोमा, आक्षेप व 80% मृत्यु।"
    },
    trajectories: {
      positive: "प्रारंभिक अवस्था में एंटीबायोटिक व ग्लूकोज से 30% सूअरों की जान बचाई जा सकती है।",
      negative: "अनुपचारित रहने पर: 7 से 14 दिन में पूरे फार्म के सूअरों की मृत्यु।"
    },
    symptoms: "तेज़ बुखार, आंखों से चिपचिपा कीचड़, लड़खड़ाती चाल, दस्त व उल्टी।",
    drugs: {
      generic: "Amoxicillin-Sulbactam (15 mg/kg IM) + Paracetamol + B-Complex + Fluid Therapy।",
      ethical: "Vetclox (Cadila, ₹110) + Melonex (Intas, ₹95)।",
      correctEffect: "द्वितीयक जीवाणु संक्रमण और ब्रोंकोनिमोनिया की रोकथाम।",
      hazardWrong: "लापरवाही से संक्रमित सूअर का मांस बेचना (पूरे जिले में वायरस फैल जाता है)।"
    },
    protocols: {
      doctor: "संक्रमित क्षेत्र में तत्काल क्वारंटाइन लागू कराएं।",
      farmer: "सूअरों के बाड़े में ब्लीचिंग पाउडर व चूने का छिड़काव करें।"
    },
    labTest: { name: "ELISA / RT-PCR", sample: "Tonsil Swab / Blood", cost: "₹350 - ₹600", significance: "CSF वायरल न्यूक्लिक एसिड की पुष्टि।" },
    rxInjections: "Inj. Amoxicillin-Sulbactam 15mg/kg IM + Inj. Paracetamol 10ml IM।",
    rxOral: "ORS व इलेक्ट्रोलाइट्स पानी में घोलकर दें।",
    rxAyurved: "गिलोय व नीम की छाल का काढ़ा।",
    rxHome: "सूअरों के बाड़े को सूखा रखें और गर्म बिछाली दें।",
    biosecurity: "नियमित वार्षिक CSF टीकाकरण ही एकमात्र सुरक्षा कवच है।",
    pregnancy: "Safe (सहायक दवाएं सुरक्षित हैं)।",
    recoveryDays: "न्यूनतम: 10 दिन | अधिकतम: 20 दिन",
    redFlags: "रेवड़ में 80% से अधिक सूअरों की आकस्मिक मृत्यु।"
  },
  {
    id: 17,
    name: "माता रोग / शीप पॉक्स (Sheep & Goat Pox)",
    localName: "माता, शीतला, बोदरी, चेचक",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Capripoxvirus)",
    category: "HIGH",
    temp: "104-106°F",
    traits: { temp: "HIGH", eyes: "RED", urine: "NORMAL", dung: "NORMAL", appetite: "OFF", cardinalSign: "SKIN_POX_SCABS" },
    cardinal: "चेहरे, होंठ, अयन व बिना ऊन वाली त्वचा पर गोल लाल फुंसियाँ, जो बाद में पपड़ी (Scabs) बन जाती हैं।",
    onSiteConfirm: "होंठों, थनों व जांघों पर लाल कड़े दाने और सूखती हुई काली पपड़ियां।",
    stages: {
      s1: "प्रारंभिक: तेज़ बुखार, आंखों-नाक से पानी, त्वचा पर लाल चकत्ते।",
      s2: "पेप्यूलर: कड़े दाने उभरना जो फफोले बनकर पपड़ी बनते हैं।",
      s3: "नोड्यूलर: फेफड़ों में पॉक्स घाव होने से दम घुटना व मृत्यु।"
    },
    trajectories: {
      positive: "एंटीबायोटिक व एंटीसेप्टिक स्प्रे से: 14 दिन में पपड़ी उतरना व घाव भरना।",
      negative: "अनुपचारित रहने पर: मेमनों में 50-80% मृत्यु और फेफड़ों का निमोनिया।"
    },
    symptoms: "तेज़ बुखार, आंखों व नाक से मवाद जैसा स्राव, निमोनिया, मेमनों में अत्यधिक मृत्यु।",
    drugs: {
      generic: "Ceftriaxone (10-15 mg/kg IM) + Meloxicam (0.5 mg/kg) + Pheniramine + Himax मरहम।",
      ethical: "Intacef 1g (Intas, ₹95) + Melonex (Intas, ₹95) + Himax Ointment (Indian Herbs, ₹70)।",
      correctEffect: "त्वचा के छालों में मवाद बनने और सेकेंडरी निमोनिया की रोकथाम।",
      hazardWrong: "पपड़ियों को हाथ से खुरचना (इससे घाव गहरे होते हैं और वायरस फैलता है)।"
    },
    protocols: {
      doctor: "मेमनों में निमोनिया की नियमित स्टेथोस्कोप से जांच करें।",
      farmer: "पपड़ियों पर नीम तेल या हिमैक्स लगाएं; बीमार बकरियों को अलग चराएं।"
    },
    labTest: { name: "PCR / Virus Neutralization", sample: "त्वचा पपड़ी (Skin Scabs)", cost: "₹300 - ₹500", significance: "कैप्रीपॉक्स वायरस की पुष्टि।" },
    rxInjections: "Inj. Ceftriaxone 1g IM + Inj. Melonex 3ml IM + Inj. Zeet 2ml IM।",
    rxOral: "घावों पर मक्खियां बैठने से रोकने हेतु हिमैक्स (Himax) मरहम लगाएं।",
    rxAyurved: "हल्दी व नीम के पत्तों का पेस्ट घावों पर लगाएं।",
    rxHome: "लाल दवा (Kmno4) के गुनगुने पानी से पपड़ियों को हल्के हाथ से धोएं।",
    biosecurity: "संक्रमित भेड़-बकरियों को अलग चराएं। वार्षिक पॉक्स टीका लगवाएं।",
    pregnancy: "Safe (सेफ्ट्रिएक्सोन व स्थानीय लेप सुरक्षित हैं)।",
    recoveryDays: "न्यूनतम: 14 दिन | अधिकतम: 28 दिन",
    redFlags: "फेफड़ों में पॉक्स घाव बनने से दम घुटना।"
  },
  {
    id: 18,
    name: "उदर शूल / पेट दर्द (Colic in Equine/Cattle)",
    localName: "शूल, पेट मरोड़, कुड़क, दर्द",
    etiologyType: "METABOLIC",
    etiologyName: "पाचन अवरोध (Spasmodic / Impaction Colic)",
    category: "NORMAL",
    temp: "101°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "SCANTY", dung: "HARD", appetite: "OFF", cardinalSign: "ROLLING_PAWING" },
    cardinal: "पशु का बार-बार अपने पेट की ओर देखना, खुरों से ज़मीन खोदना, उठना-बैठना और ज़मीन पर लोटना।",
    onSiteConfirm: "पशु का बेचैन होकर बार-बार पेट पर लात मारना, ज़मीन पर लोटना, पसीने से भीग जाना।",
    stages: {
      s1: "ऐंठन (Spasmodic): रुक-रुक कर पेट दर्द, बेचैनी, लात मारना।",
      s2: "अवरोध (Impaction): लगातार तीव्र दर्द, गोबर बंद, पेट फूलना।",
      s3: "टॉर्शन (Twist): आंत मुड़ना या फटना, शॉक, अचानक दर्द शांत होकर मृत्यु।"
    },
    trajectories: {
      positive: "Flunixin व लिक्विड पैराफिन से: 2 घंटे में ऐंठन बंद ➔ 6 घंटे में गोबर आना।",
      negative: "आंत मुड़ने पर: 12 घंटे में आंतों में गैंग्रीन और दर्दनाक मृत्यु।"
    },
    symptoms: "अत्यधिक पसीना आना, बेचैनी, गोबर व पेशाब रुकना, सांस तेज़ चलना।",
    drugs: {
      generic: "Flunixin Meglumine (1.1 mg/kg Slow IV) + Spasmovet (Dicyclomine 15ml) + Liquid Paraffin 1-2 Litre नाल से।",
      ethical: "Finadyne (MSD, ₹380) / Megludyne (Virbac, ₹160) + Spasmovet (Cadila, ₹75)।",
      correctEffect: "आंतों की ऐंठन व आंत की दीवार की सूजन का तत्काल शमन।",
      hazardWrong: "दर्द में बार-बार लोटने देना (इससे आंत के मुड़ने / Twist का खतरा बढ़ जाता है)।"
    },
    protocols: {
      doctor: "गुदा परीक्षण (Rectal Exam) कर आंतों में गोबर के कड़े गोले या टॉर्शन की जांच करें।",
      farmer: "पशु को लगातार धीरे-धीरे टहलाएं, ज़मीन पर लोटने न दें।"
    },
    labTest: { name: "Rectal Examination & Peritoneal Fluid Analysis", sample: "क्लिनिकल परीक्षण", cost: "₹100 - ₹200", significance: "आंतों के अवरोध या मरोड़ की पुष्टि।" },
    rxInjections: "Inj. Flunixin Meglumine 15ml Slow IV + Inj. Spasmovet 15ml IM।",
    rxOral: "सेंधा नमक (250g) + Liquid Paraffin 1 लीटर पानी में मिलाकर नाल द्वारा दें।",
    rxAyurved: "अजवाइन (100g) + हींग (10g) + सोंठ (50g) गुनगुने पानी में दें।",
    rxHome: "पशु को लगातार धीमी गति से टहलाएं, ज़मीन पर लोटने न दें।",
    biosecurity: "साफ व सुपाच्य चारा दें। अचानक सड़े-गले दाने या रेतीले चारे से बचाएं।",
    pregnancy: "⚠️ चेतावनी: गर्भवती पशु में गर्भाशय मरोड़ (Uterine Torsion) की जांच अवश्य करें।",
    recoveryDays: "न्यूनतम: 6 घंटे | अधिकतम: 3 दिन",
    redFlags: "आंतों का फटना या आंत का मुड़ जाना (Volvulus)।"
  },
  {
    id: 19,
    name: "जेर रुकना (Retention of Placenta - ROP)",
    localName: "जेर अटकना, आंवल न पड़ना, पुरैन",
    etiologyType: "METABOLIC",
    etiologyName: "प्रसवोत्तर विकार (Uterine Inertia / पोषण कमी)",
    category: "NORMAL",
    temp: "101.5-103°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", appetite: "NORMAL", cardinalSign: "HANGING_PLACENTA" },
    cardinal: "प्रसव के 8 से 12 घंटे बीत जाने के बाद भी जेर (Placenta) का गर्भाशय से बाहर न निकलना और बाहर लटकना।",
    onSiteConfirm: "योनि मार्ग से बदबूदार जेर का लटकना; पशु का हल्का जोर लगाना व दूध घटना।",
    stages: {
      s1: "शुरुआती 12 घंटे: जेर बाहर लटकती है, कोई गंध नहीं।",
      s2: "24-48 घंटे: जेर में सड़न, तीव्र बदबूदार मवाद जैसा रिसाव, हल्का बुखार।",
      s3: "72+ घंटे: गर्भाशय का गंभीर सेप्टीसीमिया (Metritis), भूख बंद, बांझपन।"
    },
    trajectories: {
      positive: "दवाओं द्वारा गर्भाशय संकुचन से: 24-36 घंटे में जेर का स्वतः गिरना व गर्भाशय शोधन।",
      negative: "जबरन हाथ से खींचने पर: गर्भाशय की ब्लीडिंग, संक्रमण, पायोमेट्रा व स्थायी बांझपन।"
    },
    symptoms: "बदबूदार लाल-भूरा स्राव, भूख में कमी, दूध घटना, बेचैनी, हल्का बुखार।",
    drugs: {
      generic: "Ceftiofur Sodium (1g IM) + PGF2-alpha (Dinoprost 5ml IM) + Replanta Liquid + Meloxicam।",
      ethical: "Xyrofur 1g (Intas, ₹450) / Lutalyse 5ml (Zoetis, ₹320) + Exapar (Ayurvet, ₹160)।",
      correctEffect: "मायोमेट्रियम का प्राकृतिक संकुचन और कोटिलेडन्स का गर्भाशय कारंकल्स से पृथक्करण।",
      hazardWrong: "हाथ डालकर जबरन जेर नोचना (कारंकल टूटने से जानलेवा रक्तस्राव)।"
    },
    protocols: {
      doctor: "हाथ से जबरन न निकालें; गर्भाशय में एंटीबायोटिक बोलस (Furea/Cleanex) रखें।",
      farmer: "लटकती हुई जेर पर कोई भारी पत्थर या वजन न बांधें; काढ़ा पिलाएं।"
    },
    labTest: { name: "Vaginal & Uterine Examination", sample: "योनि स्राव", cost: "₹100 - ₹200", significance: "गर्भाशय ग्रीवा बंद होने और संक्रमण की जांच।" },
    rxInjections: "Inj. Ceftiofur 1g IM + Inj. Lutalyse 5ml IM + Inj. Melonex 15ml IM।",
    rxOral: "Oral Exapar / Replanta liquid (100ml दिन में दो बार) 4 दिन तक दें।",
    rxAyurved: "बांस की पत्तियां (500g) + पुराना गुड़ (250g) उबालकर काढ़ा पिलाएं।",
    rxHome: "लटकती हुई जेर पर कोई भारी पत्थर या वजन न बांधें।",
    biosecurity: "गाभिन पशु को अंतिम माह में विटामिन-E व सेलेनियम युक्त मिनरल मिक्चर दें।",
    pregnancy: "Safe (ब्याने के तुरंत बाद लागू)।",
    recoveryDays: "न्यूनतम: 2 दिन | अधिकतम: 5 दिन",
    redFlags: "गर्भाशय सेप्टीसीमिया (Metritis) और बांझपन का स्थायी जोखिम।"
  },
  {
    id: 20,
    name: "गर्भाशय / योनि बाहर आना (Prolapse)",
    localName: "फूल दिखाना, पाछा निकलना, बेल पड़ना, शरीर दिखाना",
    etiologyType: "METABOLIC",
    etiologyName: "प्रजनन विकार (Hypocalcemia / हार्मोनल असंतुलन)",
    category: "NORMAL",
    temp: "101.5°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "SCANTY", dung: "NORMAL", appetite: "NORMAL", cardinalSign: "PROTRUDING_MASS" },
    cardinal: "ब्याने से पूर्व या बाद में योनि अथवा गर्भाशय का बड़ा लाल मांसल भाग शरीर से बाहर लटकना।",
    onSiteConfirm: "योनि से फुटबॉल या तरबूज जैसा लाल मांसल अंग बाहर लटकना; पशु का लगातार पेट पर जोर लगाना।",
    stages: {
      s1: "प्रथम चरण: बैठने पर योनि का छोटा भाग बाहर दिखना, खड़े होने पर अंदर जाना।",
      s2: "द्वितीय चरण: योनि व गर्भाशय ग्रीवा का स्थायी बाहर लटकना, सूजन व गंदगी।",
      s3: "तृतीय चरण: संपूर्ण गर्भाशय मय कोटिलेडन्स बाहर लटकना, खून रिसना, सड़न।"
    },
    trajectories: {
      positive: "एपिड्यूरल एनेस्थीसिया देकर साफ कर अंदर करने व टांके लगाने से: 3 दिन में सामान्य।",
      negative: "लापरवाही पर: मूत्राशय फटना, कीड़े पड़ना, अंग में गैंग्रीन और मृत्यु।"
    },
    symptoms: "पशु का बार-बार जोर लगाना, पेशाब रुकना, अंग पर सूजन, मिट्टी चिपकने से घाव व संक्रमण।",
    drugs: {
      generic: "Epidural Lignocaine 2% (5-8 ml) + Mifex (Calcium 450ml IV) + Ceftriaxone 3g + Buhner's Suture।",
      ethical: "Lox 2% (Neon, ₹45) + Mifex (Novartis, ₹340) + Intacef 3g (Intas, ₹210)।",
      correctEffect: "पेल्विक नर्व ब्लॉक से जोर लगाना बंद होना और गर्भाशय का अपनी जगह स्थापित होना।",
      hazardWrong: "गंदे हाथों या खुरदुरे कपड़े से अंग को अंदर धकेलना (गर्भाशय फटने का खतरा)।"
    },
    protocols: {
      doctor: "एपीड्यूरल एनेस्थीसिया देकर अंग को बर्फ/फिटकरी पानी से धोएं, अंदर कर बुहनर सुचर लगाएं।",
      farmer: "पशु के पिछले पैरों को आगे से 6 इंच ऊंचे स्थान पर रखें; अंग को गीले साफ कपड़े से ढकें।"
    },
    labTest: { name: "Clinical Severity Grading", sample: "शारीरिक परीक्षण", cost: "₹100", significance: "Vaginal बनाम Complete Uterine Prolapse का विभेदीकरण।" },
    rxInjections: "Inj. Lignocaine 2% (5-8ml Epidural) + Inj. Mifex 450ml IV + Inj. Intacef 3g IM।",
    rxOral: "Calpro Gel मुँह से दें ताकि पेल्विक मांसपेशियां मजबूत हों।",
    rxAyurved: "लाजवंती (छुईमुई 50g) + बबूल की छाल का काढ़ा पिलाएं।",
    rxHome: "अंग को फिटकरी के गुनगुने पानी से धोएं, बर्फ रखकर सूजन कम करें व घी लगाकर अंदर धकेलें।",
    biosecurity: "बाड़े की ढलान आगे से पीछे की ओर न रखें; पिछले पैर ऊंचे स्थान पर रखें।",
    pregnancy: "Safe (सटीक सर्जिकल प्रक्रिया व संक्रमण रोकथाम अनिवार्य)।",
    recoveryDays: "न्यूनतम: 3 दिन | अधिकतम: 7 दिन",
    redFlags: "अंग में कीड़े पड़ना, मूत्राशय फटना या आंत बाहर निकल आना।"
  },
  {
    id: 21,
    name: "निमोनिया (Bovine Pneumonia)",
    localName: "फेफड़ा सूजन, सांस की बीमारी, निमोनिया, धौंकनी",
    etiologyType: "BACTERIAL",
    etiologyName: "श्वसन जीवाणु (Pasteurella, Mannheimia, Mycoplasma)",
    category: "HIGH",
    temp: "104-106°F",
    traits: { temp: "HIGH", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", appetite: "OFF", cardinalSign: "DYSPNEA_WHEEZING" },
    cardinal: "तेज़-तेज़ सांस चलना (हांफना), छाती पर कान लगाने पर सायं-सायं/घर्र-घर्र ध्वनि, लगातार सूखी या बलगमी खांसी।",
    onSiteConfirm: "छाती पर स्टेथोस्कोप लगाने पर घरघराहट (Moist Rales); नाक से गाढ़ा पीला मवाद रिसना।",
    stages: {
      s1: "ब्रोंकाइटिस: सूखी खांसी, 104°F बुखार, नाक से पानी, भूख कम।",
      s2: "एक्सुडेटिव निमोनिया: बलगम वाली खांसी, छाती में सायं-सायं, हांफना, नाक से मवाद।",
      s3: "कंसॉलिडेशन: फेफड़ों का कड़ा पड़ना, गंभीर हाइपोक्सिया, जीभ बाहर, मृत्यु।"
    },
    trajectories: {
      positive: "Ceftiofur व ब्रोमहैक्सिन से: 48 घंटे में सांस सामान्य ➔ 5-7 दिन में फेफड़े साफ।",
      negative: "अनुपचारित रहने पर: फेफड़ों में फोड़े (Abscesses), फेफड़े जमना व दम घुटना।"
    },
    symptoms: "नाक से गाढ़ा मवाद जैसा स्राव, सिर आगे तानकर सांस लेना, 105°F बुखार, चारा न खाना।",
    drugs: {
      generic: "Ceftiofur Sodium (2.2 mg/kg IM) अथवा Tylosin (10 mg/kg IM) + Meloxicam (15 ml) + Bromhexine (10 ml)।",
      ethical: "Xyrofur 1g (Intas, ₹450) / Tylan 200 (Elanco, ₹580) + Melonex (Intas, ₹95)।",
      correctEffect: "श्वसन मार्ग के जीवाणुओं का खात्मा और जमे हुए गाढ़े कफ को पिघलाकर बाहर निकालना।",
      hazardWrong: "धुआं करना या बंद सीलन वाले कमरे में रखना (फेफड़ों में कार्बन जमने से स्थिति बदतर)।"
    },
    protocols: {
      doctor: "छाती के दोनों तरफ ऑस्कल्टेशन करें; गंभीर सांस फूलने पर डेक्सामेथासोन (केवल गैर-गाभिन में) दें।",
      farmer: "खौलते पानी में तारपीन का तेल डालकर बाल्टी से पशु को भाप (Steam) दिलाएं।"
    },
    labTest: { name: "Nasal Swab Culture & Antibiotic Sensitivity", sample: "नाक का स्राव (Nasal Swab)", cost: "₹250 - ₹500", significance: "जीवाणु प्रकार व एंटीबायोटिक संवेदनशीलता की जांच।" },
    rxInjections: "Inj. Ceftiofur 1g IM + Inj. Melonex 15ml IM + Inj. Bromhexine 10ml IM।",
    rxOral: "Kaf-Go / Bro-Fre syrup (50 ml दिन में दो बार) मुँह से।",
    rxAyurved: "अडूसा (वासा 50g) + तुलसी (20 पत्ते) + काली मिर्च का काढ़ा।",
    rxHome: "तारपीन के तेल की भाप बाल्टी में खौलते पानी में डालकर सुंघाएं।",
    biosecurity: "बाड़े में अमोनिया गैस व नमी न जमने दें। ठंडी हवा के सीधे झोंकों से बचाएं।",
    pregnancy: "Safe (Ceftiofur व Paracetamol गर्भावस्था में पूर्णतः सुरक्षित हैं)।",
    recoveryDays: "न्यूनतम: 5 दिन | अधिकतम: 10 दिन",
    redFlags: "फेफड़ों का पूरी तरह जम जाना (Consolidation) व दम घुटना।"
  },
  {
    id: 22,
    name: "खुर सड़न (Foot Rot in Cattle & Sheep)",
    localName: "खुर सड़न, सड़ांध, बदबूदार खुर, पाँव सड़न",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Fusobacterium necrophorum)",
    category: "NORMAL",
    temp: "102-103°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", appetite: "NORMAL", cardinalSign: "FOOT_ROT_SMELL" },
    cardinal: "खुरों के विभाजन (Interdigital Cleft) में गंभीर सड़ांध, अत्यधिक सड़ी दुर्गंधयुक्त मवाद, खुर के किनारे सूजन।",
    onSiteConfirm: "खुरों के बीच में सड़ी हुई अत्यंत तीखी दुर्गंध; खुर के जोड़ पर लाली व दर्दनाक सूजन।",
    stages: {
      s1: "प्रारंभिक: खुरों के बीच की चमड़ी लाल, हल्का लंगड़ापन, खुर गर्म।",
      s2: "सड़ांध: चमड़ी फटना, सफेद-पीला सड़ा मवाद, गंभीर लंगड़ापन, तीखी बदबू।",
      s3: "डीप सेप्सिस: संक्रमण खुर की हड्डियों व जोड़ों में फैलना, खुर का विकृत होना।"
    },
    trajectories: {
      positive: "कॉपर सल्फेट फुट-बाथ व ऑक्सीटेट्रासाइक्लिन से: 3 दिन में सड़ांध बंद ➔ 7 दिन में चाल सामान्य।",
      negative: "अनुपचारित रहने पर: खुर की हड्डी गलना (Osteomyelitis) और पशु का स्थायी अपंग होना।"
    },
    symptoms: "पशु का पैर ऊपर उठाकर खड़े रहना, चलने में अत्यधिक पीड़ा, लंगड़ापन, चरना कम कर देना।",
    drugs: {
      generic: "Oxytetracycline LA (20 mg/kg Deep IM) + Meloxicam (15 ml) + 5% Copper Sulphate Foot Bath।",
      ethical: "Terramycin LA (Zoetis, ₹240) + Melonex (Intas, ₹95) + Blue Vitriol (Local Chemistry, ₹60)।",
      correctEffect: "अवायवीय फ्यूसोबैक्टीरियम का समूल नाश और सड़े हुए ऊतकों का कड़ा होकर सूखना।",
      hazardWrong: "गीले कीचड़ वाले बाड़े में बांधे रखना (दवा लगाने के बाद भी बीमारी कभी ठीक नहीं होती)।"
    },
    protocols: {
      doctor: "खुर के सड़े हुए मृत ऊतकों (Necrotic tissue) को सावधानी से काटकर साफ करें।",
      farmer: "पशु को सूखे पक्के फर्श पर बांधें; पैर को दिन में दो बार तूतिया पानी में 5 मिनट रखें।"
    },
    labTest: { name: "Smear from Necrotic Foot Cleft", sample: "खुर की सड़ांध का मवाद", cost: "₹150 - ₹250", significance: "ग्राम-नेगेटिव अवायवीय जीवाणु की पुष्टि।" },
    rxInjections: "Inj. Terramycin LA 20 mg/kg Deep IM + Inj. Melonex 15ml IM।",
    rxOral: "Zinc Sulphate बोलस (खुरों की त्वचा मजबूत करने हेतु)।",
    rxAyurved: "कपूर (10g) को नीम के तेल (100ml) में घोलकर खुरों में लगाएं।",
    rxHome: "खुरों को 5% कॉपर सल्फेट (नीला थोथा / तुतिया) के गुनगुने पानी के फुट-बाथ में 5 मिनट रखें।",
    biosecurity: "बाड़े में कीचड़ व जलभराव न होने दें। खुरों को हमेशा सूखा रखें।",
    pregnancy: "Safe (स्थानीय फुट-बाथ व अनुशंसित दवाएं सुरक्षित हैं)।",
    recoveryDays: "न्यूनतम: 5 दिन | अधिकतम: 12 दिन",
    redFlags: "संक्रमण का खुर की हड्डियों व जोड़ों (Deep Joint Sepsis) तक फैलना।"
  }
];
