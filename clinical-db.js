// ==================== VETCARE MASTER CLINICAL & KNOWLEDGE DATABASE ====================
const CLINICAL_DATABASE = [
  {
    id: 1,
    name: "गलाघोंटू (H.S. / Haemorrhagic Septicaemia)",
    localName: "घुर्रका, गलघोंटू, नाविक ज्वर",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Pasteurella multocida)",
    category: "HIGH",
    temp: "104-107°F",
    traits: { temp: "HIGH", eyes: "RED", urine: "NORMAL", dung: "NORMAL", cardinalSign: "NECK_SWELLING" },
    cardinal: "गले व जबड़े के नीचे गर्म, अत्यंत दर्दनाक सूजन, जीभ बाहर लटकना, घर्र-घर्र की तीव्र श्वसन ध्वनि।",
    onSiteConfirm: "गले की सूजन छूने पर तीव्र वेदना, घर्र-घर्र श्वसन और अचानक 105°F+ बुखार से तुरंत पुष्टि करें।",
    injections: [
      { sno: 1, category: "एंटीबायोटिक (1st Line)", generic: "Ceftiofur Sodium (1g)", ethical: "Xyrofur (Intas, ₹450) / Excenel", dose: "1.1-2.2 mg/kg", route: "IM (गहरी मांसपेशी)", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "एंटीबायोटिक (वैकल्पिक)", generic: "Marbofloxacin 10%", ethical: "Forocid / Marbomet (₹380)", dose: "2 mg/kg", route: "IM / SC", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 3, category: "NSAID", generic: "Meloxicam + Paracetamol", ethical: "Melonex Plus (Intas, ₹110)", dose: "15-20 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 4, category: "एंटीहिस्टामिनिक", generic: "Pheniramine Maleate", ethical: "Avil (Sanofi, ₹85)", dose: "10 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "बोवाइन कफ सिरप / ब्रोंकोडाइलेटर", formulation: "Menthol + Eucalyptus Liquid (Respocare)", dose: "50 ml दिन में दो बार", note: "सांस नली की सूजन व घर्र-घर्र ध्वनि शांत करने हेतु।" },
      { name: "इम्यूनिटी व लिवर टॉनिक", formulation: "Liv-52 Protec / Belamyl Liquid", dose: "50 ml प्रतिदिन", note: "दवाओं के तनाव से लिवर को सुरक्षित रखने हेतु।" }
    ],
    homeopathy: [
      { drug: "Aconitum Napellus 200C", indication: "प्रारंभिक अवस्था में अचानक तेज़ बुखार व बेचैनी", dose: "10-15 बूंदें जीभ पर हर 2 घंटे में" },
      { drug: "Belladonna 200C", indication: "गले में लालिमा, गर्म सूजन व सांस कष्ट", dose: "10-15 बूंदें दिन में 4 बार" },
      { drug: "Arsenicum Album 200C", indication: "गले से घर्र-घर्र आवाज व अत्यधिक दुर्बलता", dose: "10-15 बूंदें दिन में 3 बार" }
    ],
    homeRemedies: [
      { remedy: "हल्दी व सरसों तेल की सिकाई", method: "100 मिली सरसों तेल में 25 ग्राम हल्दी और 5 ग्राम कपूर गुनगुना करें। गले की सूजन पर दिन में दो बार हल्के हाथ से मालिश करें।" },
      { remedy: "काली मिर्च व अदरक का काढ़ा", method: "10 ग्राम काली मिर्च, 20 ग्राम अदरक और 50 ग्राम पुराना गुड़ 500 मिली पानी में उबालें। गुनगुना रहने पर दिन में दो बार पिलाएं।" }
    ],
    stages: { s1: "अचानक तेज़ बुखार (106°F) व चारा बंद", s2: "गले के नीचे गर्म दर्दनाक सूजन व घर्र-घर्र सांस", s3: "जीभ बाहर निकलना व दम घुटने से मृत्यु" },
    trajectories: { positive: "प्रारंभिक 6 घंटे में Ceftiofur लगने पर 24-48 घंटे में पूर्ण सुधार।", negative: "विलंब होने पर 12-24 घंटे के भीतर श्वास अवरोध से मृत्यु।" },
    pregnancy: "✅ अधिकांश एंटीबायोटिक सुरक्षित। स्टेरॉयड (Dexamethasone) गाभिन पशु में कभी न लगाएं।",
    labTest: { name: "Blood Smear (Leishman/Giemsa stain for bipolar organisms)", cost: "₹150-250" },
    redFlags: "गले की सूजन का तेजी से छाती तक फैलना और दम घुटना।"
  },
  {
    id: 2,
    name: "लंगड़ा बुखार (Black Quarter / B.Q.)",
    localName: "जहरबाद, लंगड़िया, चरचरा",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Clostridium chauvoei)",
    category: "HIGH",
    temp: "104-106°F",
    traits: { temp: "HIGH", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", cardinalSign: "GAS_SWELLING" },
    cardinal: "पुट्ठे या कंधे की भारी मांसपेशियों में गैस भरी सूजन, दबाने पर स्पष्ट चर्र-चर्र (Crepitation) ध्वनि।",
    onSiteConfirm: "सूजन को दबाने पर गैस बुलबुलों जैसी चर्र-चर्र आवाज और आरंभ में गर्म तथा बाद में ठंडी, सुन्न सूजन।",
    injections: [
      { sno: 1, category: "एंटीबायोटिक (1st Choice)", generic: "Procaine / Benzylpenicillin High Dose", ethical: "Procaine Penicillin 40 Lac (Alembic, ₹120)", dose: "10,000-20,000 IU/kg", route: "IM (सूजन के चारों ओर)", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "एंटीबायोटिक (वैकल्पिक)", generic: "Oxytetracycline Long Acting (LA)", ethical: "Terramycin LA (Zoetis, ₹245)", dose: "20 mg/kg", route: "Deep IM", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 3, category: "NSAID", generic: "Meloxicam", ethical: "Melonex (Intas, ₹95)", dose: "15 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "एंटीऑक्सीडेंट बोलस", formulation: "Vitamin E + Selenium Bolus (Evat-H)", dose: "1 बोलस प्रतिदिन 5 दिन तक", note: "मांसपेशियों के उत्तकों को सड़न से बचाने हेतु।" }
    ],
    homeopathy: [
      { drug: "Anthracinum 200C", indication: "काले जहरबाद व मांसपेशियों की सड़न में", dose: "10 बूंदें दिन में 3 बार" },
      { drug: "Rhus Toxicodendron 200C", indication: "गंभीर लंगड़ापन व अकड़न में", dose: "10 बूंदें दिन में 4 बार" }
    ],
    homeRemedies: [
      { remedy: "बर्फ की सिकाई व सिरका लेप", method: "प्रारंभिक सूजन पर बर्फ या ठंडे पानी की पट्टी रखें। ऊपर से सिरका और सेंधा नमक का लेप लगाएं।" }
    ],
    stages: { s1: "अचानक एक पैर से तेज लंगड़ापन व तेज़ बुखार", s2: "पुट्ठे पर चर्र-चर्र बोलने वाली सूजन", s3: "सूजन का काला व ठंडा पड़ जाना और पशु का बैठ जाना" },
    trajectories: { positive: "पहले 12 घंटे में पेनिसिलिन के स्थानीय इंजेक्शन से बचाव संभव।", negative: "टॉक्सिमिया के कारण 24-48 घंटे में मृत्यु दर 90% से अधिक।" },
    pregnancy: "✅ पेनिसिलिन व अनुशंसित दर्द निवारक सुरक्षित हैं।",
    labTest: { name: "Muscle Exudate Smear (Gram-positive rods with spores)", cost: "₹200" },
    redFlags: "सूजन वाली त्वचा का सूखकर चमड़े जैसा कड़ा व ठंडा हो जाना।"
  },
  {
    id: 3,
    name: "खुरपका-मुँहपका (FMD / Foot & Mouth)",
    localName: "खुरपका, मुंहपका, खुरहा, रपका",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Aphthovirus)",
    category: "HIGH",
    temp: "104-105°F",
    traits: { temp: "HIGH", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", cardinalSign: "MOUTH_BLISTERS" },
    cardinal: "मुंह, जीभ, मसूड़ों व खुरों के बीच छाले, मुंह से रस्सी जैसी गाढ़ी लार गिरना और लंगड़ाना।",
    onSiteConfirm: "जीभ पर फटे हुए छाले, खुरों के मध्य मवाद/घाव और लार का लगातार टपकना।",
    injections: [
      { sno: 1, category: "एंटीबायोटिक (सैकेंडरी इन्फेक्शन)", generic: "Ceftriaxone Sodium (3-4g)", ethical: "Intacef (Intas, ₹220)", dose: "10 mg/kg", route: "IM / IV", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "NSAID", generic: "Flunixin Meglumine", ethical: "Finadyne (MSD, ₹380)", dose: "1.1-2.2 mg/kg", route: "IV / IM", pregSafe: "⚠️ सावधानी (Caution)" },
      { sno: 3, category: "विटामिन सप्लीमेंट", generic: "Vitamin B-Complex + Liver Extract", ethical: "Belamyl (Zydus, ₹95)", dose: "10 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "माउथ अल्सर पेस्ट", formulation: "Boric Acid Powder + Pure Glycerin", dose: "दिन में 3 बार मुंह में लेप करें", note: "पशु को चारा-घास खाने में तुरंत राहत देता है।" }
    ],
    homeopathy: [
      { drug: "Mercurius Solubilis 200C", indication: "मुंह में छाले व अत्यधिक लार टपकने पर", dose: "15 बूंदें दिन में 4 बार" },
      { drug: "Hypericum 200C", indication: "खुरों के घाव व नसों के तेज दर्द में", dose: "15 बूंदें दिन में 3 बार" }
    ],
    homeRemedies: [
      { remedy: "लाल दवा से खुर प्रक्षालन", method: "1 लीटर हल्के गुनगुने पानी में चुटकी भर लाल दवा (1:1000) घोलें और खुरों के घाव धोएं।" },
      { remedy: "शहद व देशी घी का मुंह लेप", method: "बराबर मात्रा में शहद और देशी गाय का घी मिलाकर मुंह के छालों पर लगाएं।" }
    ],
    stages: { s1: "तेज़ बुखार व मुंह से पानी जैसी लार टपकना", s2: "जीभ व खुरों के बीच फफोले फूटना व लंगड़ापन", s3: "घावों में कीड़े पड़ना व थनों पर छाले" },
    trajectories: { positive: "घावों की उचित एंटीसेप्टिक ड्रेसिंग से 7-10 दिन में सुधार।", negative: "दूध का स्थायी रूप से गिरना और हांफने की बीमारी (Pantor) विकसित होना।" },
    pregnancy: "✅ एंटीबायोटिक व स्थानीय उपचार पूर्ण सुरक्षित।",
    labTest: { name: "RT-PCR / ELISA Test (Serotyping O, A, Asia-1)", cost: "₹800-1200" },
    redFlags: "छोटे बछड़ों में अचानक दिल का दौरा (Tiger Heart disease) पड़ना।"
  },
  {
    id: 4,
    name: "थनैल / मेस्टाइटिस (Mastitis)",
    localName: "थनैला, गार, अयन सूजन",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Staph / Strep / E. coli)",
    category: "NORMAL",
    temp: "101.5-103°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", cardinalSign: "UDDER_HARD" },
    cardinal: "थन या अयन में पत्थर जैसा कड़ापन, छूने पर गर्म व लाल, दूध में खून, पीले छिछड़े या पानी आना।",
    onSiteConfirm: "स्ट्रिप कप टेस्ट में दूध में थक्के/छिछड़े और थन छूने पर पशु द्वारा लात मारना।",
    injections: [
      { sno: 1, category: "इंट्रा-मेमरी ट्यूब", generic: "Cefoperazone / Cloxacillin Infusion", ethical: "Pendistrin-SH / Mastilep (₹90)", dose: "1 ट्यूब प्रति प्रभावित थन", route: "Intramammary", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "एंटीबायोटिक (सिस्टेमिक)", generic: "Ceftiofur / Enrofloxacin", ethical: "Xyrofur (Intas, ₹450)", dose: "1 mg/kg", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 3, category: "एंजाइम", generic: "Serratiopeptidase + Meloxicam", ethical: "Melonex Plus / Serakind", dose: "15 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "मेस्टाइटिस बफर पाउडर", formulation: "Trisodium Citrate + Vitamins (MastiKit)", dose: "1 पाउच प्रतिदिन 4 दिन तक", note: "दूध का pH सामान्य करने व सूजन सुखाने हेतु।" }
    ],
    homeopathy: [
      { drug: "Phytolacca Decandra 200C", indication: "थन में पत्थर जैसा कड़ापन व गांठें", dose: "15 बूंदें हर 3 घंटे में" },
      { drug: "Silicea 200C", indication: "दूध में मवाद व पुराने थनैल में", dose: "15 बूंदें दिन में दो बार" }
    ],
    homeRemedies: [
      { remedy: "एलोवेरा, हल्दी व चूना लेप", method: "200 ग्राम एलोवेरा गूदा, 50 ग्राम हल्दी पाउडर और 10 ग्राम बुझा हुआ चूना मिलाकर पेस्ट बनाएं। अयन पर लगाएं।" }
    ],
    stages: { s1: "दूध में बारीक छिछड़े व हल्का खारापन", s2: "थन में तीव्र सूजन, लाली व दूध में मवाद/खून", s3: "थन का सड़ना (गैंग्रीनस) या स्थायी रूप से बंद होना" },
    trajectories: { positive: "तत्काल इंट्रा-मेमरी ट्यूब व सिस्टेमिक दवा से 3 दिन में दूध सामान्य।", negative: "थन का स्थायी रूप से सूखना या क्वार्टर मारा जाना।" },
    pregnancy: "✅ स्थानीय थन ट्यूब व सेफ्टियोफ़र पूर्ण सुरक्षित।",
    labTest: { name: "California Mastitis Test (CMT) / Somatic Cell Count", cost: "₹100" },
    redFlags: "थन की त्वचा का नीला-काला पड़ना और बदबूदार खूनी पानी आना।"
  },
  {
    id: 5,
    name: "दुग्ध ज्वर / मिल्क फीवर (Milk Fever)",
    localName: "प्रसव मूर्छा, कैल्शियम गिरावट",
    etiologyType: "METABOLIC",
    etiologyName: "उपापचयी विकार (Hypocalcemia)",
    category: "SUB",
    temp: "<100°F (अल्प तापमान)",
    traits: { temp: "SUB", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", cardinalSign: "STERNAL_RECUMBENCY" },
    cardinal: "ब्याने के 24-48 घंटे बाद पशु का गर्दन मोड़कर बैठना, कान व पैर ठंडे पड़ना और उठने में असमर्थता।",
    onSiteConfirm: "कम शारीरिक तापमान (<100°F), पुतलियों का फैलना और सीने के बल लेटना।",
    injections: [
      { sno: 1, category: "कैल्शियम (I/V)", generic: "Calcium Borogluconate 25% + Mg + P", ethical: "Mifex / Calborol (₹320)", dose: "450 ml (आधा धीमे IV + आधा SC)", route: "IV + SC", pregSafe: "✅ ब्याने बाद जीवनरक्षक" }
    ],
    oralSupplements: [
      { name: "ओरल कैल्शियम जेल", formulation: "Ionic Calcium Gel (Cal-Up / Ostovet Gel)", dose: "1 बॉटल तुरंत व 12 घंटे बाद", note: "दोबारा कैल्शियम गिरने से रोकने हेतु।" }
    ],
    homeopathy: [
      { drug: "Calcarea Phosphorica 200C", indication: "कैल्शियम संतुलन सुधारने हेतु", dose: "15 बूंदें दिन में 3 बार" }
    ],
    homeRemedies: [
      { remedy: "गर्म कंबल व सरसों तेल मालिश", method: "पशु के कान व खुरों पर गर्म सरसों तेल की मालिश करें और शरीर को कंबल से ढककर रखें।" }
    ],
    stages: { s1: "मांसपेशियों में कंपकंपी, दांत किटकिटाना व बेचैनी", s2: "गर्दन मोड़कर सीने के बल बैठना (S-curve) व सुस्ती", s3: "पार्श्व शयन (करवट लेट जाना), कोमा व श्वसन विफलता" },
    trajectories: { positive: "Mifex ड्रिप चढ़ते ही 30-45 मिनट में गोबर/पेशाब करना व खड़े होना।", negative: "उपचार न मिलने पर ब्लोट, कार्डियक अरेस्ट और मृत्यु।" },
    pregnancy: "✅ ब्याने के तुरंत बाद आपातकालीन सुरक्षित।",
    labTest: { name: "Serum Ionized Calcium Level (<5 mg/dl confirms)", cost: "₹300" },
    redFlags: "आई/वी कैल्शियम अत्यधिक तेज़ गति से चढ़ाने पर दिल का अचानक रुकना।"
  },
  {
    id: 6,
    name: "कीटोसिस (Ketosis / Acetonemia)",
    localName: "कीटो विकार, दाना अरुचि",
    etiologyType: "METABOLIC",
    etiologyName: "उपापचयी विकार (Negative Energy Balance)",
    category: "NORMAL",
    temp: "101.5°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "NORMAL", dung: "HARD", cardinalSign: "SWEET_BREATH" },
    cardinal: "दूध व सांस से विशिष्ट मीठी एसीटोन गंध, पशु द्वारा दाना छोड़कर केवल सूखा भूसा खाना।",
    onSiteConfirm: "पेशाब की जांच में कीटोन स्ट्रिप का गहरा बैंगनी होना और दाना खाने से पूर्ण मनाही।",
    injections: [
      { sno: 1, category: "ऊर्जा ग्लूकोज (I/V)", generic: "20% - 50% Dextrose Injection", ethical: "Dextrose 25% (₹85)", dose: "500-1000 ml IV", route: "Slow IV", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "विटामिन सप्लीमेंट", generic: "Vitamin B-Complex with Choline", ethical: "Belamyl / Tribivet (₹110)", dose: "10 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "ग्लूकोजेनिक प्रिकर्सर", formulation: "Propylene Glycol Liquid (E-Booster / Ketocare)", dose: "200 ml दिन में दो बार", note: "रक्त में ग्लूकोज स्तर को लगातार बनाए रखने हेतु।" }
    ],
    homeopathy: [
      { drug: "Lycopodium 200C", indication: "भूख की तीव्र कमी व पाचन विकार", dose: "10 बूंदें दिन में 3 बार" }
    ],
    homeRemedies: [
      { remedy: "पुराना गुड़ व मीठा सोडा", method: "250 ग्राम पुराना गुड़ और 50 ग्राम मीठा सोडा 1 लीटर पानी में घोलकर 4 दिन तक पिलाएं।" }
    ],
    stages: { s1: "दाना चरने में अरुचि व दूध में दैनिक गिरावट", s2: "सूखा कड़ा गोबर, तीव्र कमजोरी व एसीटोन गंध", s3: "नर्वस कीटोसिस (दीवार चाटना, पागलों जैसी हरकतें)" },
    trajectories: { positive: "आई/वी डेक्सट्रोज व प्रोपलीन ग्लाइकोल से 48 घंटे में दाना खाना शुरू।", negative: "गंभीर दुर्बलता व स्थायी फैटी लिवर सिंड्रोम।" },
    pregnancy: "⚠️ गाभिन पशुओं में Isoflupredone / Dexamethasone स्टेरॉयड कभी न दें (गर्भपात जोखिम)।",
    labTest: { name: "Rothera's Test (Urine Ketone Dipstick)", cost: "₹50" },
    redFlags: "पशु का अंधेपन जैसा व्यवहार करना और खूंटे पर सिर टकराना।"
  },
  {
    id: 7,
    name: "अफारा / ब्लोट (Tympanitis / Bloat)",
    localName: "आफरा, पेट फूलना, गैस भराव",
    etiologyType: "METABOLIC",
    etiologyName: "पाचन विकार (Frothy / Free Gas Bloat)",
    category: "NORMAL",
    temp: "101-102°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "NORMAL", dung: "HARD", cardinalSign: "LEFT_FLANK_DRUM" },
    cardinal: "बायाँ पेट ढोलक की भांति फूलना, थपथपाने पर खोखली 'टिन-टिन' आवाज और सांस लेने में भारी कष्ट।",
    onSiteConfirm: "बाएं पेट (Left Paralumbar Fossa) का अत्यधिक उभरना व मुंह खोलकर हांफते हुए जीभ बाहर निकालना।",
    injections: [
      { sno: 1, category: "एंटी-स्पास्मोडिक", generic: "Dicyclomine / Hyoscine", ethical: "Spasmovet (₹75)", dose: "15 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "एंटी-फ्रोथिंग एजेंट", formulation: "Simethicone + Dill Oil Emulsion (Tympanol / Bloatosil)", dose: "100 ml एकल खुराक", note: "पेट में झाग व गैस के बुलबुले फोड़ने हेतु।" }
    ],
    homeopathy: [
      { drug: "Carbo Vegetabilis 200C", indication: "पेट में अत्यधिक गैस व सांस घुटने पर", dose: "15 बूंदें हर 30 मिनट में" },
      { drug: "Nux Vomica 200C", indication: "दाना चरने के बाद अपच व पेट रुकावट", dose: "15 बूंदें हर 2 घंटे में" }
    ],
    homeRemedies: [
      { remedy: "सरसों तेल व हींग-तारपीन मिश्रण", method: "250 मिली सरसों तेल में 10 ग्राम भुनी हींग, 20 ग्राम काला नमक और 25 मिली तारपीन का तेल मिलाकर नाल से धीरे-धीरे पिलाएं।" }
    ],
    stages: { s1: "बाएं पेट का हल्का उभार व बेचैनी", s2: "बाएं पेट का ढोलक जैसा फूलना व सांस कष्ट", s3: "फेफड़ों पर अत्यधिक दबाव से दम घुटना व पशु का गिरना" },
    trajectories: { positive: "एंटी-फ्रोथ सिरप या ट्रोकार कैन्युला से गैस निकलते ही तुरंत राहत।", negative: "सांस रुकने व हृदय पर दबाव से 1-2 घंटे में आकस्मिक मृत्यु।" },
    pregnancy: "✅ सरसों तेल व टिम्पैनॉल पूरी तरह सुरक्षित हैं।",
    labTest: { name: "Rumen Fluid pH Analysis (Acidic in grain bloat <5.5)", cost: "₹100" },
    redFlags: "पशु का आंखें पलटकर सांस के लिए तड़पना (आपातकाल: तुरंत ट्रोकार कैन्युला लगाएं)।"
  },
  {
    id: 8,
    name: "थायलेरियासिस (Theileriosis)",
    localName: "चिचड़ी बुखार, गिल्टी सूजन",
    etiologyType: "PROTOZOAL",
    etiologyName: "रक्त परजीवी (Theileria annulata)",
    category: "HIGH",
    temp: "105-107°F",
    traits: { temp: "HIGH", eyes: "PALE_YELLOW", urine: "NORMAL", dung: "NORMAL", cardinalSign: "LYMPH_SWELLING" },
    cardinal: "कंधे के आगे या जांघ की लिम्फ ग्रंथियों में कठोर सूजन, अत्यधिक तेज़ लगातार बुखार (106°F)।",
    onSiteConfirm: "प्रीस्कैपुलर लिम्फ नोड का टेनिस बॉल जैसा बढ़ना, आंखों में पीलिया व रक्ताल्पता।",
    injections: [
      { sno: 1, category: "विशिष्ट एंटी-प्रोटोजोअल", generic: "Buparvaquone (50mg/ml)", ethical: "Zubion (Virbac, ₹1150) / Butalex", dose: "2.5 mg/kg (1ml/20kg)", route: "Deep IM (गर्दन पर)", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "NSAID", generic: "Meloxicam", ethical: "Melonex (₹95)", dose: "15 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 3, category: "आयरन सप्लीमेंट", generic: "Iron Dextran", ethical: "Imferon (₹180)", dose: "10 ml", route: "Deep IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "हेमेटिनिक टॉनिक", formulation: "Ferrous Gluconate + Copper + Cobalt (Sharkoferrol)", dose: "50 ml प्रतिदिन", note: "हीमोग्लोबिन व लाल रक्त कोशिकाएं बढ़ाने हेतु।" }
    ],
    homeopathy: [
      { drug: "Crotalus Horridus 200C", indication: "रक्त विनाश व तेज बुखार में", dose: "10 बूंदें दिन में 3 बार" }
    ],
    homeRemedies: [
      { remedy: "गिलोय व नीम का काढ़ा", method: "50 ग्राम ताजा गिलोय तना और 20 नीम की पत्तियां 1 लीटर पानी में उबालकर 250 मिली रहने पर छानकर रोज पिलाएं।" }
    ],
    stages: { s1: "लगातार तेज बुखार (105-107°F) व चारा बंद", s2: "कंधे की ग्रंथियों में सख्त सूजन व रक्ताल्पता", s3: "आंखों में कॉर्नियल ओपेसिटी (सफेद मोतिया) व गंभीर दुर्बलता" },
    trajectories: { positive: "Buparvaquone की एकल खुराक से 48 घंटे में बुखार उतरना व ग्रंथि सामान्य होना।", negative: "गंभीर एनीमिया व पल्मोनरी एडिमा से मृत्यु।" },
    pregnancy: "✅ Buparvaquone गर्भावस्था में एकल खुराक के रूप में सुरक्षित है।",
    labTest: { name: "Lymph Node Biopsy / Blood Smear (Koch's blue bodies / Piroplasms)", cost: "₹250" },
    redFlags: "सांस में अत्यधिक खरखराहट और फेफड़ों में पानी भरना।"
  },
  {
    id: 9,
    name: "बबेशियोसिस / लाल पेशाब (Babesiosis / Red Water)",
    localName: "रक्त मूतना, लाल पेशाब, ताव",
    etiologyType: "PROTOZOAL",
    etiologyName: "रक्त परजीवी (Babesia bigemina)",
    category: "HIGH",
    temp: "105-107°F",
    traits: { temp: "HIGH", eyes: "PALE_YELLOW", urine: "RED_COFFEE", dung: "NORMAL", cardinalSign: "RED_URINE" },
    cardinal: "कॉफी या गहरे लाल रंग का पेशाब (Haemoglobinuria), तेज़ बुखार, गंभीर रक्ताल्पता।",
    onSiteConfirm: "पेशाब का रंग कॉफी जैसा काला-लाल होना और दिल की धड़कन दूर से सुनाई देना (Pounding Heart)।",
    injections: [
      { sno: 1, category: "एंटी-बबेशियल", generic: "Diminazene Aceturate (7%)", ethical: "Berenil (MSD, ₹130)", dose: "3.5 - 5 mg/kg", route: "Deep IM", pregSafe: "✅ सुरक्षित (सावधानी से)" },
      { sno: 2, category: "सपोर्टिव आई/वी ड्रिप", generic: "Dextrose Normal Saline (DNS)", ethical: "DNS 5% (₹70)", dose: "1000-2000 ml IV", route: "Slow IV", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 3, category: "एंटी-एलर्जिक", generic: "Pheniramine Maleate", ethical: "Avil (₹85)", dose: "10 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "रक्तवर्धक टॉनिक", formulation: "Iron + Vitamin B12 + Folic Acid Liquid", dose: "50 ml दिन में दो बार", note: "नष्ट हुई लाल रक्त कोशिकाओं की पूर्ति हेतु।" }
    ],
    homeopathy: [
      { drug: "Phosphorus 200C", indication: "पेशाब में लाल रंग/खून आने की सर्वोत्तम औषधि", dose: "15 बूंदें हर 4 घंटे में" }
    ],
    homeRemedies: [
      { remedy: "गोंद कतीरा व मिश्री का शरबत", method: "50 ग्राम गोंद कतीरा रात को भिगोएं। सुबह 100 ग्राम पिसी मिश्री व 1 लीटर ठंडे पानी में घोलकर पिलाएं।" }
    ],
    stages: { s1: "अचानक 106°F बुखार व दिल की तेज धड़कन", s2: "कॉफी रंग का पेशाब व श्लेष्मा झिल्लियों का सफेद पड़ना", s3: "गंभीर पीलिया, आक्षेप व किडनी विफलता" },
    trajectories: { positive: "Berenil इंजेक्शन के 12-24 घंटे बाद पेशाब का रंग साफ होना शुरू।", negative: "किडनी फेलियर व अत्यधिक खून की कमी से 48 घंटे में मृत्यु।" },
    pregnancy: "⚠️ Berenil की सही डोज़ दें; ओवरडोज़ से नर्वस लक्षण हो सकते हैं।",
    labTest: { name: "Blood Smear Examination (Pear-shaped intra-erythrocytic piroplasms)", cost: "₹200" },
    redFlags: "पेशाब का रंग अत्यधिक गाढ़ा काला होना और पशु का लड़खड़ाकर गिरना।"
  },
  {
    id: 10,
    name: "एनाप्लास्मोसिस (Anaplasmosis / Gall Sickness)",
    localName: "पीलिया बुखार, पित्त रोग",
    etiologyType: "PROTOZOAL",
    etiologyName: "रक्त परजीवी (Anaplasma marginale)",
    category: "HIGH",
    temp: "104-106°F",
    traits: { temp: "HIGH", eyes: "YELLOW", urine: "YELLOW", dung: "HARD", cardinalSign: "SEVERE_JAUNDICE" },
    cardinal: "अत्यधिक तीव्र पीलिया (मसूड़े, आँखें व योनि श्लेष्मा गहरे पीले), पेशाब पीला (लाल नहीं), सख्त सूखा गोबर।",
    onSiteConfirm: "गहरा पीला पेशाब (बिना लाल रंग के), आंख की झिल्ली अत्यधिक पीली और गंभीर कब्ज़।",
    injections: [
      { sno: 1, category: "विशिष्ट एंटीबायोटिक", generic: "Oxytetracycline LA (200mg/ml)", ethical: "Terramycin LA (Zoetis, ₹245)", dose: "20 mg/kg", route: "Deep IM (दो जगह)", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "लिवर एक्सट्रैक्ट", generic: "Liver Extract + Vitamin B-Complex", ethical: "Belamyl (₹95)", dose: "10 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "हर्बल लिवर प्रोटेक्टिव टॉनिक", formulation: "Liv-52 Liquid / Tefroli", dose: "50 ml दिन में दो बार", note: "पित्त व लिवर की सूजन उतारने हेतु।" }
    ],
    homeopathy: [
      { drug: "Chelidonium Majus 200C", indication: "गंभीर पीलिया व लिवर विकारों में", dose: "15 बूंदें दिन में 3 बार" }
    ],
    homeRemedies: [
      { remedy: "मूली के पत्तों का रस व ग्लूकोज", method: "500 मिली मूली के पत्तों का ताजा रस निकालकर उसमें 100 ग्राम ग्लूकोज पाउडर मिलाकर 5 दिन पिलाएं।" }
    ],
    stages: { s1: "तेज बुखार व चारा खाना बंद", s2: "गंभीर पीलिया, कब्ज़ व वजन का तेजी से घटना", s3: "अत्यधिक रक्ताल्पता व दुर्बलता से मृत्यु" },
    trajectories: { positive: "Oxytetracycline LA से 3 दिन में बुखार उतरना व 1 सप्ताह में पीलिया कम होना।", negative: "लिवर विफलता के कारण पशु का कंकाल बन जाना।" },
    pregnancy: "✅ Oxytetracycline LA अनुशंसित डोज़ में सुरक्षित है।",
    labTest: { name: "Giemsa Stained Blood Smear (Marginal dots in RBCs)", cost: "₹200" },
    redFlags: "सख्त सूखा गोबर आना पूरी तरह बंद हो जाना और पेट में दर्द।"
  },
  {
    id: 11,
    name: "पीपीआर / बकरी प्लेग (PPR in Goat & Sheep)",
    localName: "बकरी प्लेग, मुंहपका दस्त",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Morbillivirus)",
    category: "HIGH",
    temp: "104-106°F",
    traits: { temp: "HIGH", eyes: "RED", urine: "NORMAL", dung: "DIARRHEA", cardinalSign: "MOUTH_EROSION_DIARRHEA" },
    cardinal: "मुंह के अंदर व्यापक छाले, आंखों व नाक से गाढ़ा मवाद जैसा स्राव, अत्यंत बदबूदार पानी जैसा दस्त।",
    onSiteConfirm: "मुंह खोलने पर सड़े हुए छाले, चिपचिपी आंखें और तीव्र बदबूदार काले-हरे पतले दस्त।",
    injections: [
      { sno: 1, category: "एंटीबायोटिक (सैकेंडरी निमोनिया रोक)", generic: "Ceftiofur Sodium / Enrofloxacin", ethical: "Xyrofur (₹450) / Enrocin", dose: "1.1-2.2 mg/kg", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "NSAID", generic: "Meloxicam", ethical: "Melonex (₹95)", dose: "2-3 ml (बकरी हेतु)", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "इलेक्ट्रोलाइट व ओआरएस घोल", formulation: "Oral Rehydration Salts (Electral / Ener-G)", dose: "1-2 लीटर दिनभर में थोड़ा-थोड़ा", note: "दस्त से पानी की कमी पूरी करने हेतु।" }
    ],
    homeopathy: [
      { drug: "Mercurius Corrosivus 200C", indication: "बदबूदार दस्त व मुंह के छालों में", dose: "5 बूंदें दिन में 4 बार" }
    ],
    homeRemedies: [
      { remedy: "ग्लिसरीन व सुहागा लेप", method: "10 ग्राम भुना सुहागा (टंकण भस्म) 50 ग्राम ग्लिसरीन में मिलाकर मुंह के छालों पर दिन में 3 बार लगाएं।" }
    ],
    stages: { s1: "अचानक 105°F बुखार व नाक से पानी", s2: "मुंह में छाले, खांसी व बदबूदार दस्त", s3: "अत्यधिक निर्जलीकरण व सांस न ले पाने से मृत्यु" },
    trajectories: { positive: "सहायक एंटीबायोटिक व ओआरएस से 5-7 दिन में सुधार।", negative: "झुंड में 80-90% बकरियों की 3 दिन में मौत।" },
    pregnancy: "✅ सेफ्टियोफ़र व ओआरएस गर्भावस्था में सुरक्षित हैं।",
    labTest: { name: "Competitive ELISA / RT-PCR for PPRV", cost: "₹500" },
    redFlags: "नाक का मवाद से पूरी तरह बंद होना और मुंह से हांफना।"
  },
  {
    id: 12,
    name: "आंत्रविषाक्तता / फिड़किया (Enterotoxaemia / ET)",
    localName: "फिड़किया, दाना जहरबाद",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Clostridium perfringens Type D)",
    category: "HIGH",
    temp: "104°F",
    traits: { temp: "HIGH", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", cardinalSign: "OPISTHOTONOS" },
    cardinal: "अत्यधिक दाना चरने के बाद बकरियों का चक्कर खाकर गिरना, सिर पीछे की ओर खींचना, झाग निकलना।",
    onSiteConfirm: "हरे चारे या दाने के अत्यधिक सेवन का इतिहास और सिर पीछे गर्दन मोड़कर तड़पना (Opisthotonos)।",
    injections: [
      { sno: 1, category: "एंटीबायोटिक", generic: "High Dose Benzyl Penicillin", ethical: "Penicillin 40 Lac (₹120)", dose: "20,000 IU/kg", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "एंटी-एसिडोसिस बफर", formulation: "Sodium Bicarbonate Powder (मीठा सोडा)", dose: "20-30 ग्राम पानी में घोलकर", note: "पेट के अम्लीय जहर को बेअसर करने हेतु।" }
    ],
    homeopathy: [
      { drug: "Nux Vomica 200C", indication: "अत्यधिक दाना खाने के बाद विषाक्तता", dose: "5 बूंदें हर 1 घंटे में" }
    ],
    homeRemedies: [
      { remedy: "मीठा सोडा व गुनगुना पानी", method: "30 ग्राम मीठा सोडा 250 मिली गुनगुने पानी में मिलाकर तुरंत पिलाएं।" }
    ],
    stages: { s1: "पेट में तीव्र मरोड़ व दांत किटकिटाना", s2: "चक्कर खाकर गिरना व पैर पटकना", s3: "कोमा व 2-4 घंटे में आकस्मिक मृत्यु" },
    trajectories: { positive: "प्रारंभिक 1 घंटे में पेनिसिलिन व मीठा सोडा मिलने पर जान बच सकती है।", negative: "प्रायः डॉक्टर के पहुंचने से पूर्व ही मृत्यु।" },
    pregnancy: "✅ पेनिसिलिन सुरक्षित है।",
    labTest: { name: "Urine Glucosuria Test (Sugar in urine is diagnostic)", cost: "₹50" },
    redFlags: "सिर को रीढ़ की हड्डी से सटाकर उल्टी दिशा में खींचना।"
  },
  {
    id: 13,
    name: "गिल्टी रोग / एंथ्रेक्स (Anthrax)",
    localName: "गिल्टी, तिल्ली बुखार, जहरी बुखार",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Bacillus anthracis - ज़ूनोटिक)",
    category: "HIGH",
    temp: "106-108°F",
    traits: { temp: "HIGH", eyes: "RED", urine: "NORMAL", dung: "BLOODY", cardinalSign: "TAR_BLOOD" },
    cardinal: "नाक, मुंह, योनि व गुदा से बिना जमा हुआ तारकोल जैसा काला खून रिसना, कठोर अकड़न न होना।",
    onSiteConfirm: "मृत्यु के बाद शव में अकड़न (Rigor Mortis) न होना और प्राकृतिक छेदों से काला खून बहना। (शव कभी न चीरें!)",
    injections: [
      { sno: 1, category: "एंटीबायोटिक (आपातकालीन)", generic: "High Dose Penicillin G + Streptomycin", ethical: "Dicrysticin (₹140)", dose: "30,000 IU/kg", route: "IM / IV", pregSafe: "⚠️ अति-घातक" }
    ],
    oralSupplements: [
      { name: "कोई ओरल दवा नहीं", formulation: "ज़ूनोटिक रोग - तुरंत सरकारी सूचना दें", dose: "N/A", note: "मानव में संक्रमण का भारी खतरा।" }
    ],
    homeopathy: [
      { drug: "Anthracinum 1M", indication: "रोकथाम व प्रारंभिक संदेह में", dose: "10 बूंदें एकल खुराक" }
    ],
    homeRemedies: [
      { remedy: "कोई घरेलू उपचार नहीं", method: "शव को 6 फीट गहरे गड्ढे में चूना डालकर दफनाएं। रक्त को कभी न छुएं।" }
    ],
    stages: { s1: "अत्यधिक उग्र बुखार (107°F) व हांफना", s2: "प्राकृतिक छिद्रों से काला रक्त रिसना", s3: "अचानक आकस्मिक पतन व मृत्यु" },
    trajectories: { positive: "अत्यंत प्रारंभिक अवस्था में हाई-डोज़ पेनिसिलिन से ही संभव।", negative: "100% प्राणघातक यदि लक्षण विकसित हो जाएं।" },
    pregnancy: "N/A (अति-घातक आपातकाल)",
    labTest: { name: "Polychrome Methylene Blue Stained Smear (M'Fadyean's reaction)", cost: "₹300" },
    redFlags: "प्राकृतिक छेदों से निकलने वाले खून का थक्का न जमना।"
  },
  {
    id: 14,
    name: "सर्रा / तिबरसा (Surra / Trypanosomiasis)",
    localName: "सर्रा, तिबरसा, घुमरिया",
    etiologyType: "PROTOZOAL",
    etiologyName: "रक्त परजीवी (Trypanosoma evansi)",
    category: "HIGH",
    temp: "103-106°F",
    traits: { temp: "HIGH", eyes: "PALE", urine: "NORMAL", dung: "NORMAL", cardinalSign: "CIRCLING_HEAD_PRESSING" },
    cardinal: "गोल-गोल चक्कर काटना, दीवारों व खूंटे से सिर टकराना, रुक-रुक कर आने वाला बुखार, अंधापन।",
    onSiteConfirm: "पशु का गोल चक्कर काटना, खूंटे पर अंधों की तरह सिर मारना और रुक-रुक कर आने वाला बुखार।",
    injections: [
      { sno: 1, category: "एंटी-ट्रिपैनोसोमल", generic: "Quinapyramine Sulfate & Chloride", ethical: "Triquin (Intas, ₹340)", dose: "4.4 mg/kg (0.025 ml/kg)", route: "SC (चमड़ी में)", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "ऊर्जा ग्लूकोज", generic: "20% Dextrose", ethical: "Dextrose 20% (₹85)", dose: "1000 ml IV", route: "Slow IV", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "नर्व टॉनिक", formulation: "Mecobalamin + Vitamin B-Complex Liquid", dose: "30 ml प्रतिदिन", note: "मस्तिष्क की नसों को ठीक करने हेतु।" }
    ],
    homeopathy: [
      { drug: "Cicuta Virosa 200C", indication: "गोल चक्कर काटने व सिर टकराने में", dose: "10 बूंदें दिन में 3 बार" }
    ],
    homeRemedies: [
      { remedy: "ग्लूकोज व ठंडा पानी", method: "सिर पर ठंडे पानी की धार डालें और 200 ग्राम ग्लूकोज पानी में घोलकर पिलाएं।" }
    ],
    stages: { s1: "रुक-रुक कर तेज बुखार आना व कमजोरी", s2: "गोल चक्कर काटना व दीवारों से सिर टकराना", s3: "अंधापन, लकवा व मृत्यु" },
    trajectories: { positive: "Triquin के सब-क्यूट इंजेक्शन के 24 घंटे में परजीवी नष्ट।", negative: "मस्तिष्क क्षति से पशु का गिरकर मर जाना।" },
    pregnancy: "✅ Triquin सटीक वजन अनुसार सुरक्षित है।",
    labTest: { name: "Wet Blood Film (Motile flagellates under 40x)", cost: "₹150" },
    redFlags: "लगातार अंधाधुंध चक्कर काटना और आंखों की पुतली का स्थिर होना।"
  },
  {
    id: 15,
    name: "रेबीज / अलर्क रोग (Rabies)",
    localName: "बावला, पागलपन, जलभीति",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Lyssavirus - 100% घातक)",
    category: "NORMAL",
    temp: "101.5-103°F",
    traits: { temp: "NORMAL", eyes: "RED", urine: "NORMAL", dung: "NORMAL", cardinalSign: "HYDROPHOBIA_BELL" },
    cardinal: "अत्यधिक उत्तेजना, पागलपन, बिना कारण लगातार रंभाना, पानी से डर, लार गिरना, पिछले अंगों का लकवा।",
    onSiteConfirm: "कुत्ते के काटने का इतिहास, आवाज का भारी हो जाना, मुंह से लगातार लार और पानी से चौंकना।",
    injections: [
      { sno: 1, category: "कोई उपचारात्मक इंजेक्शन नहीं", generic: "केवल पोस्ट-बाइट वैक्सीन (Day 0,3,7,14,28)", ethical: "Raksharab / Nobivac Rabies (₹80)", dose: "1 ml", route: "SC / IM", pregSafe: "✅ टीका सुरक्षित" }
    ],
    oralSupplements: [
      { name: "कोई ओरल दवा नहीं", formulation: "पशु को आइसोलेट करें", dose: "N/A", note: "लार को कभी न छुएं, यह जानलेवा है।" }
    ],
    homeopathy: [
      { drug: "Hydrophobinum (Lyssin) 200C", indication: "रोकथाम हेतु (उपचारात्मक नहीं)", dose: "विशेषज्ञ परामर्श अनुसार" }
    ],
    homeRemedies: [
      { remedy: "घाव को साबुन से धोना (बाइट उपरांत तुरंत)", method: "कुत्ते के काटने के तुरंत बाद घाव को 15 मिनट तक बहते पानी और साबुन से रगड़कर धोएं।" }
    ],
    stages: { s1: "स्वभाव में बदलाव व काटने के घाव पर खुजली", s2: "उत्तेजना, लगातार अजीब रंभाना व लार टपकना", s3: "पिछले धड़ का लकवा व श्वसन विफलता" },
    trajectories: { positive: "लक्षण दिखने के बाद कोई इलाज नहीं।", negative: "लक्षण दिखने के 3 से 7 दिन के भीतर 100% मृत्यु निश्चित।" },
    pregnancy: "✅ एंटी-रेबीज टीका गर्भ में भी पूर्ण सुरक्षित है।",
    labTest: { name: "Brain Impression Smear (Negri bodies in Hippocampus - Post-mortem)", cost: "सरकारी" },
    redFlags: "मुंह खोलकर रस्सी जैसी लार बहाना और बिना कारण हर वस्तु पर झपटना।"
  },
  {
    id: 16,
    name: "सूअर ज्वर (Classical Swine Fever)",
    localName: "सूअर बुखार, रक्त चकत्ते",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Pestivirus)",
    category: "HIGH",
    temp: "105-107°F",
    traits: { temp: "HIGH", eyes: "RED", urine: "NORMAL", dung: "DIARRHEA", cardinalSign: "PURPLE_SKIN" },
    cardinal: "कान, पेट, थूथन व भीतरी जांघों पर बैंगनी-लाल रंग के रक्तस्रावी धब्बे (Purpura/Petechiae)।",
    onSiteConfirm: "कानों और पेट की त्वचा का बैंगनी पड़ना, तेज बुखार और लड़खड़ाती चाल।",
    injections: [
      { sno: 1, category: "सपोर्टिव एंटीबायोटिक", generic: "Ceftriaxone / Amoxicillin", ethical: "Intacef (₹220)", dose: "10 mg/kg", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "विटामिन सी व इलेक्ट्रोलाइट्स", formulation: "Ascorbic Acid + Minerals", dose: "प्रतिदिन पानी में", note: "रक्तस्राव रोकने हेतु।" }
    ],
    homeopathy: [
      { drug: "Crotalus Horridus 200C", indication: "त्वचा पर बैंगनी चकत्ते व बुखार", dose: "5 बूंदें दिन में 3 बार" }
    ],
    homeRemedies: [
      { remedy: "साफ बाड़ा व दलिया", method: "संक्रमित सूअरों को तुरंत अलग करें और हल्का सुपाच्य आहार दें।" }
    ],
    stages: { s1: "अत्यधिक तेज बुखार व सुस्ती", s2: "त्वचा पर बैंगनी चकत्ते, दस्त व उल्टी", s3: "आक्षेप व 5-10 दिन में मृत्यु" },
    trajectories: { positive: "टीकाकरण ही एकमात्र बचाव है।", negative: "फार्म में 90% तक मृत्यु दर।" },
    pregnancy: "✅ टीका सुरक्षित है।",
    labTest: { name: "Antigen ELISA / RT-PCR", cost: "₹600" },
    redFlags: "कानों के किनारों का काला पड़कर सड़ना।"
  },
  {
    id: 17,
    name: "माता रोग / शीप पॉक्स (Sheep & Goat Pox)",
    localName: "माता, चेचक, शीतला",
    etiologyType: "VIRAL",
    etiologyName: "विषाणु (Capripoxvirus)",
    category: "HIGH",
    temp: "104-106°F",
    traits: { temp: "HIGH", eyes: "RED", urine: "NORMAL", dung: "NORMAL", cardinalSign: "SKIN_POX_SCABS" },
    cardinal: "चेहरे, थूथन, अयन व बिना ऊन वाली त्वचा पर फुंसियाँ (Nodules), जो बाद में पपड़ी (Scabs) बन जाती हैं।",
    onSiteConfirm: "मुंह व थन की त्वचा पर गोल कठोर फुंसियां और पपड़ियां।",
    injections: [
      { sno: 1, category: "एंटीबायोटिक (घाव संक्रमण रोक)", generic: "Ceftriaxone Sodium", ethical: "Intacef (₹220)", dose: "10 mg/kg", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "घाव भरने वाला टॉनिक", formulation: "Zinc + Vitamin A-D3-E Liquid", dose: "15 ml प्रतिदिन", note: "त्वचा की नई कोशिकाएं बनाने हेतु।" }
    ],
    homeopathy: [
      { drug: "Variolinum 200C", indication: "चेचक व माता की प्रमुख औषधि", dose: "10 बूंदें दिन में 3 बार" },
      { drug: "Thuja Occidentalis 200C", indication: "त्वचा की फुंसियां व पपड़ी सुखाने हेतु", dose: "10 बूंदें दिन में 2 बार" }
    ],
    homeRemedies: [
      { remedy: "नीम पानी व नारियल तेल-कपूर लेप", method: "नीम के उबले पानी से फुंसियां धोएं और नारियल तेल में कपूर मिलाकर पपड़ियों पर लगाएं।" }
    ],
    stages: { s1: "तेज बुखार व नाक-आंख से पानी", s2: "त्वचा पर लाल दाने व फफोले बनना", s3: "पपड़ी जमना व निमोनिया से मृत्यु" },
    trajectories: { positive: "एंटीबायोटिक व नीम लेप से 2 सप्ताह में घाव ठीक होना।", negative: "मेमनों में आंतरिक पॉक्स व 50% मृत्यु दर।" },
    pregnancy: "✅ एंटीबायोटिक व स्थानीय लेप पूर्ण सुरक्षित।",
    labTest: { name: "PCR / Serological Neutralization", cost: "₹500" },
    redFlags: "फुंसियों का आंतरिक श्वसन तंत्र में फैलना और सांस रुकना।"
  },
  {
    id: 18,
    name: "उदर शूल / पेट दर्द (Colic in Equine/Cattle)",
    localName: "शूल, पेट दर्द, ऐंठन",
    etiologyType: "METABOLIC",
    etiologyName: "पाचन अवरोध (Spasm / Impaction)",
    category: "NORMAL",
    temp: "101°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "SCANTY", dung: "HARD", cardinalSign: "ROLLING_PAWING" },
    cardinal: "पशु का बार-बार अपने पेट की ओर देखना, खुरों से ज़मीन खोदना, उठना-बैठना और ज़मीन पर लोटना।",
    onSiteConfirm: "पशु का बेचैन होकर जमीन पर लोटना, बार-बार उठना-बैठना और पेट पर लात मारना।",
    injections: [
      { sno: 1, category: "तीव्र दर्द निवारक", generic: "Flunixin Meglumine", ethical: "Finadyne (MSD, ₹380)", dose: "1.1 mg/kg", route: "IV (धीमे)", pregSafe: "⚠️ सावधानी (Caution)" },
      { sno: 2, category: "एंटी-स्पास्मोडिक", generic: "Dicyclomine + Pitofenone", ethical: "Spasmo-Vet (₹75)", dose: "15 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "लैक्सेटिव लुब्रिकेंट", formulation: "Liquid Paraffin (तरल पैराफिन)", dose: "500 - 1000 ml नाल से", note: "सूखे गोबर की रुकावट को चिकना कर बाहर निकालने हेतु।" }
    ],
    homeopathy: [
      { drug: "Colocynthis 200C", indication: "पेट दर्द में दोहरा होकर झुकने व लोटने पर", dose: "15 बूंदें हर 30 मिनट में" },
      { drug: "Magnesium Phosphorica 200C", indication: "पेट की नसों में ऐंठन व मरोड़ में", dose: "15 बूंदें गुनगुने पानी में" }
    ],
    homeRemedies: [
      { remedy: "अजवाइन, सोंठ व हींग का गुनगुना काढ़ा", method: "50 ग्राम अजवाइन, 20 ग्राम सोंठ और 10 ग्राम हींग 1 लीटर पानी में उबालकर गुनगुना पिलाएं।" }
    ],
    stages: { s1: "बेचैनी, पूंछ हिलाना व बार-बार पेट देखना", s2: "खुरों से जमीन खोदना, पसीना आना व लोटना", s3: "आंतों का मुड़ना (Volvulus) व शॉक" },
    trajectories: { positive: "Flunixin IV व पैराफिन से 2-4 घंटे में गोबर आना व शांति।", negative: "आंत फटने से 12 घंटे में मृत्यु।" },
    pregnancy: "⚠️ गर्भवती पशुओं में अधिक दर्द निवारक से बचें।",
    labTest: { name: "Rectal Examination (Impaction detection)", cost: "क्लिनिकल" },
    redFlags: "शरीर से अत्यधिक पसीना छूटना और आंखें अंदर धंसना।"
  },
  {
    id: 19,
    name: "जेर रुकना (Retention of Placenta - ROP)",
    localName: "जेर अटकना, मैली न गिरना",
    etiologyType: "METABOLIC",
    etiologyName: "प्रसवोत्तर विकार (Uterine Atony)",
    category: "NORMAL",
    temp: "101.5-103°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", cardinalSign: "HANGING_PLACENTA" },
    cardinal: "प्रसव के 8 से 12 घंटे बीत जाने के बाद भी जेर (Placenta) का गर्भाशय से बाहर न निकलना और लटकना।",
    onSiteConfirm: "योनि से जेर की झिल्लियों का लटकना और बदबू आना।",
    injections: [
      { sno: 1, category: "एंटीबायोटिक (संक्रमण रोक)", generic: "Ceftiofur Sodium (1g)", ethical: "Xyrofur (₹450)", dose: "1 g", route: "IM", pregSafe: "✅ प्रसवोपरांत सुरक्षित" },
      { sno: 2, category: "हार्मोन (गर्भाशय संकुचन)", generic: "PGF2-Alpha / Oxytocin", ethical: "Pragma / Vetmate (₹180)", dose: "2 ml", route: "IM", pregSafe: "⚠️ केवल ब्याने के बाद" }
    ],
    oralSupplements: [
      { name: "हर्बल यूटेराइन टॉनिक", formulation: "Exapar / Replanta Liquid", dose: "100 ml दिन में दो बार", note: "गर्भाशय से जेर को प्राकृतिक रूप से गिराने हेतु।" }
    ],
    homeopathy: [
      { drug: "Pulsatilla 200C", indication: "रुकी हुई जेर को बाहर निकालने की सर्वोत्तम दवा", dose: "15 बूंदें हर 2 घंटे में" },
      { drug: "Secale Cornutum 200C", indication: "गर्भाशय की शिथिलता व संकुचन बढ़ाने में", dose: "15 बूंदें दिन में 3 बार" }
    ],
    homeRemedies: [
      { remedy: "बांस की पत्तियां, अजवाइन व पुराना गुड़", method: "500 ग्राम ताजी बांस की पत्तियां, 50 ग्राम अजवाइन और 250 ग्राम पुराना गुड़ 2 लीटर पानी में उबालकर गुनगुना पिलाएं।" }
    ],
    stages: { s1: "ब्याने के 8 घंटे बाद भी जेर लटकना", s2: "जेर का सड़ना, बदबू व हल्का बुखार", s3: "मेट्राइटिस, टॉक्सिमिया व दूध का स्थायी नुकसान" },
    trajectories: { positive: "हर्बल काढ़े व PGF2 से 24 घंटे में जेर का स्वतः गिरना।", negative: "हाथ से जबरन खींचने पर गर्भाशय में रक्तस्राव व बांझपन।" },
    pregnancy: "✅ ब्याने के तुरंत बाद लागू।",
    labTest: { name: "Vaginal Speculum Examination", cost: "क्लिनिकल" },
    redFlags: "योनि से अत्यधिक सड़ी हुई बदबू और 104°F+ बुखार।"
  },
  {
    id: 20,
    name: "गर्भाशय / योनि बाहर आना (Prolapse)",
    localName: "फूल निकलना, पीछा दिखाना, शरीर दिखाना",
    etiologyType: "METABOLIC",
    etiologyName: "प्रजनन विकार (Hormonal / Hypocalcemia)",
    category: "NORMAL",
    temp: "101.5°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "SCANTY", dung: "NORMAL", cardinalSign: "PROTRUDING_MASS" },
    cardinal: "ब्याने से पूर्व या प्रसव के बाद योनि अथवा गर्भाशय का लाल मांसल भाग शरीर से बाहर लटकना।",
    onSiteConfirm: "पशु के बैठने पर योनि से लाल गोलाकार या कोटिलेडॉन युक्त अंग का बाहर दिखना।",
    injections: [
      { sno: 1, category: "लोकल एनेस्थीसिया (दर्द निवारण)", generic: "Lignocaine Hydrochloride 2%", ethical: "Xylocaine 2% (₹45)", dose: "5-10 ml Epidural", route: "Epidural Space", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "कैल्शियम आई/वी", generic: "Calcium Borogluconate", ethical: "Mifex (₹320)", dose: "450 ml IV", route: "Slow IV", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "प्रोलैप्स कंट्रोल पाउडर", formulation: "Herbal Prolapse Powder (Prolap-Vet / Fula-Care)", dose: "50 ग्राम प्रतिदिन 5 दिन", note: "गर्भाशय की मांसपेशियों को शक्ति देने हेतु।" }
    ],
    homeopathy: [
      { drug: "Sepia 200C", indication: "गर्भाशय शिथिलता व प्रोलैप्स की प्रमुख औषधि", dose: "15 बूंदें दिन में 3 बार" },
      { drug: "Podophyllum 200C", indication: "बैठने पर पीछा दिखाने की स्थिति में", dose: "15 बूंदें दिन में 2 बार" }
    ],
    homeRemedies: [
      { remedy: "फिटकरी व लाल दवा का ठंडा पानी", method: "1 बाल्टी ठंडे पानी में 50 ग्राम पिसी फिटकरी घोलें। बाहर निकले अंग को अच्छी तरह धोकर सूजन कम करें।" }
    ],
    stages: { s1: "बैठने पर टेनिस बॉल जितना अंग दिखना", s2: "खड़े होने पर भी पूरा अंग बाहर लटकना व सूजन", s3: "अंग पर घाव, गंदगी व पेशाब का पूर्ण बंद होना" },
    trajectories: { positive: "एपिड्यूरल देकर अंग अंदर बिठाने व रस्सी (Truss) बांधने से पूर्ण ठीक।", negative: "अंग में गैंग्रीन व पेशाब की थैली फटने से मृत्यु।" },
    pregnancy: "✅ ब्याने पूर्व होने पर प्रोजेस्टेरोन सपोर्ट व सतर्कता अनिवार्य।",
    labTest: { name: "Clinical Visual Examination", cost: "क्लिनिकल" },
    redFlags: "अंग का काला पड़ जाना और उसमें से अत्यधिक खून रिसना।"
  },
  {
    id: 21,
    name: "निमोनिया (Bovine Pneumonia)",
    localName: "फेफड़े की सूजन, सायं-सायं रोग",
    etiologyType: "BACTERIAL",
    etiologyName: "श्वसन जीवाणु/विषाणु (Pasteurella / Mycoplasma)",
    category: "HIGH",
    temp: "104-106°F",
    traits: { temp: "HIGH", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", cardinalSign: "DYSPNEA_WHEEZING" },
    cardinal: "तेज़-तेज़ सांस चलना (हांफना), छाती पर कान लगाने पर सायं-सायं/घर्र-घर्र ध्वनि, लगातार सूखी या बलगमी खांसी।",
    onSiteConfirm: "स्टेथॉस्कोप से छाती में घर्षण ध्वनि (Rales/Crackles), नाक से गाढ़ा स्राव और 104°F+ बुखार।",
    injections: [
      { sno: 1, category: "श्वसन एंटीबायोटिक (1st Line)", generic: "Ceftiofur Sodium / Florfenicol", ethical: "Xyrofur (₹450) / Nuflor", dose: "1.1-2.2 mg/kg", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "NSAID", generic: "Meloxicam + Paracetamol", ethical: "Melonex Plus (₹110)", dose: "15 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "म्यूकोलिटिक एक्सपेक्टोरेंट", formulation: "Bromhexine Hydrochloride + Menthol", dose: "30 ml दिन में दो बार", note: "फेफड़ों से बलगम व कफ को पतला कर बाहर निकालने हेतु।" }
    ],
    homeopathy: [
      { drug: "Bryonia Alba 200C", indication: "सूखी दर्दनाक खांसी व हिलने-डुलने पर दर्द", dose: "15 बूंदें दिन में 4 बार" },
      { drug: "Antimonium Tartaricum 200C", indication: "छाती में घर्र-घर्र बलगम किंतु कफ न निकलना", dose: "15 बूंदें दिन में 3 बार" }
    ],
    homeRemedies: [
      { remedy: "तारपीन तेल व नीलगिरी की भाप", method: "गर्म उबलते पानी की बाल्टी में 10 मिली तारपीन का तेल और नीलगिरी तेल डालें। पशु को बोरी ओढ़ाकर भाप दिलाएं।" }
    ],
    stages: { s1: "हल्की खांसी, नाक बहना व तेज़ बुखार", s2: "सांस लेते समय पसलियों का चलना व घर्र-घर्र ध्वनि", s3: "सिर आगे खींचकर मुंह से सांस लेना व फेफड़ों में मवाद" },
    trajectories: { positive: "Ceftiofur व भाप से 3-4 दिन में फेफड़े साफ।", negative: "फेफड़ों का फाइब्रोसिस व स्थायी दमा।" },
    pregnancy: "✅ Ceftiofur व Paracetamol गर्भावस्था में पूर्ण सुरक्षित हैं।",
    labTest: { name: "Chest Auscultation / Bronchoalveolar Lavage", cost: "क्लिनिकल" },
    redFlags: "नाक से झागदार खून आना और पशु का मुंह खोलकर हांफना।"
  },
  {
    id: 22,
    name: "खुर सड़न (Foot Rot in Cattle & Sheep)",
    localName: "खुर सड़न, खुरहा मवाद",
    etiologyType: "BACTERIAL",
    etiologyName: "जीवाणु (Fusobacterium necrophorum)",
    category: "NORMAL",
    temp: "102-103°F",
    traits: { temp: "NORMAL", eyes: "NORMAL", urine: "NORMAL", dung: "NORMAL", cardinalSign: "FOOT_ROT_SMELL" },
    cardinal: "खुरों के विभाजन (Interdigital Cleft) में सड़ांध, अत्यधिक दुर्गंधयुक्त मवाद, खुर के किनारे सूजन।",
    onSiteConfirm: "खुरों के बीच सड़ी हुई बदबूदार मवाद, गंभीर लंगड़ापन और खुर का ऊपर उठा रहना।",
    injections: [
      { sno: 1, category: "एंटीबायोटिक (1st Line)", generic: "Oxytetracycline Long Acting (LA)", ethical: "Terramycin LA (₹245)", dose: "20 mg/kg", route: "Deep IM", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "NSAID", generic: "Meloxicam", ethical: "Melonex (₹95)", dose: "15 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],
    oralSupplements: [
      { name: "बायोटिन व जिंक सप्लीमेंट", formulation: "Biotin + Zinc Chelate Powder", dose: "20 ग्राम प्रतिदिन", note: "खुरों के हॉर्न को मजबूत बनाने व घाव भरने हेतु।" }
    ],
    homeopathy: [
      { drug: "Silicea 200C", indication: "खुरों से मवाद निकालने व घाव सुखाने में", dose: "15 बूंदें दिन में 2 बार" },
      { drug: "Hepar Sulphur 200C", indication: "अत्यधिक दर्द व सड़न संक्रमण में", dose: "15 बूंदें दिन में 3 बार" }
    ],
    homeRemedies: [
      { remedy: "तूतिया (कॉपर सल्फेट) का फुटबाथ", method: "10 लीटर पानी में 500 ग्राम नीला तूतिया (Copper Sulphate) घोलें। खुरों को इस घोल में 10 मिनट डुबोकर रखें।" }
    ],
    stages: { s1: "खुरों के बीच हल्की लाली व लंगड़ापन", s2: "गंभीर सड़ांध, दुर्गंधयुक्त मवाद व सूजन", s3: "संक्रमण का खुर की हड्डियों (Joints) तक पहुंचना" },
    trajectories: { positive: "Terramycin LA व तूतिया फुटबाथ से 5 दिन में पूर्ण आराम।", negative: "खुर का स्थायी रूप से खराब होना व पशु का बैठ जाना।" },
    pregnancy: "✅ स्थानीय उपचार व अनुशंसित एंटीबायोटिक सुरक्षित।",
    labTest: { name: "Pus Swab Smear Examination", cost: "₹150" },
    redFlags: "खुर की हड्डी बाहर दिखना और बदबूदार काला स्राव।"
  }
];

// ==================== SMART FARMER BREEDING & FEED DATA ====================
const BREEDING_GUIDE_DATA = {
  heatSigns: [
    { stage: "प्रारंभिक मद (Early Heat)", signs: "बेचैनी, बार-बार रंभाना, अन्य पशुओं पर चढ़ने का प्रयास, दूध में अचानक गिरावट।", action: "निगरानी रखें, अभी सीमन न डलवाएं।" },
    { stage: "उत्कृष्ट मद (Peak Heat - सर्वोत्तम समय)", signs: "खूंटे पर शांत खड़े रहना (Standing Heat), योनि से कांच जैसा साफ़ पारदर्शी लंबा तार गिरना।", action: "⭐ सीमन (A.I.) करवाने का 100% सही समय (मद दिखने के 12 से 18 घंटे बाद)।" },
    { stage: "अंतिम मद (Late Heat)", signs: "पशु शांत होना, योनि से गाढ़ा या हल्का खूनी स्राव आना।", action: "समय निकल चुका है, अगले 21 दिन बाद चक्र की निगरानी रखें।" }
  ],
  dischargeTypes: [
    { type: "कांच जैसा साफ़ पारदर्शी तार", meaning: "गर्भाशय पूर्ण स्वस्थ है। गर्भ ठहरने की 95% संभावना।", safe: true },
    { type: "सफेद मटमैला या मवाद जैसा डिस्चार्ज", meaning: "गर्भाशय में संक्रमण (Metritis)। पहले डॉक्टर से गर्भाशय धुलवाएं (IU Infusion), सीमन न डालें।", safe: false },
    { type: "पीला या दुर्गंधयुक्त स्राव", meaning: "गंभीर बच्चेदानी का इंफेक्शन। तुरंत डॉक्टर से इलाज कराएं।", safe: false }
  ],
  repeatBreederSolutions: [
    "1. हमेशा कांच जैसा साफ़ तार डिस्चार्ज आने पर ही A.I. करवाएं।",
    "2. सीमन डलवाने के बाद पशु को 2 घंटे तक बैठने न दें और छायादार शांत स्थान पर रखें।",
    "3. आहार में प्रतिदिन 50 ग्राम अच्छी कंपनी का कीलेटेड मिनरल मिक्सचर अनिवार्य रूप से दें।",
    "4. कृमिनाशक (डीवर्मिंग) दवा हर 3 महीने में बदलते हुए साल्ट से दें।"
  ]
};
