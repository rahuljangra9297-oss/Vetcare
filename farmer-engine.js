// Vetcare AI OS - Smart Farmer Diseases, Detailed Repeat Breeder & Ledger (2026 Production)

/**
 * ============================================================================
 * VETCARE AI OS — SMART FARMER CLINICAL ENGINE & DAIRY WORKSPACE (2026 LOCKED)
 * ============================================================================
 * Features:
 * 1. Organ-Based & Bilingual Disease Guide (Zero Allopathic Injections - 100% Certified EVM).
 * 2. Deep Repeat Breeder (बार-बार फिरना) Diagnostic & 3-Tier Natural Therapy Protocol.
 * 3. Daily Milk & Feed Expense Ledger with LocalStorage Persistence & WhatsApp Export.
 * 4. Central Services Launcher & Anti-Kickout Tab Controller.
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. ORGAN-BASED FARMER DISEASES DATABASE (100% ETHNO-VETERINARY MEDICINE)
  // ==========================================================================
  window.VETCARE_FARMER_DISEASES = [
    // ------------------------------------------------------------------------
    // A. बच्चेदानी व प्रजनन (Uterus & Reproduction)
    // ------------------------------------------------------------------------
    {
      id: "DIS_FARMER_01",
      nameHi: "रिपीट ब्रीडर (बार-बार फिरना)",
      nameEn: "Repeat Breeding (Delayed Conception)",
      organ: "बच्चेदानी व प्रजनन",
      causes: "हार्मोनल असंतुलन (Delayed Ovulation), गर्भाशय में अदृश्य मैला (Subclinical Metritis), सूक्ष्म खनिज (Chelated Minerals) की कमी व खराब सीमन गुणवत्ता।",
      symptoms: "पशु हर 18-21 दिन में सामान्य हीट में आता है, सीमन रखवाने के बावजूद गर्भ नहीं ठहरता, कभी-कभी हीट में मटमैला या हल्का पीला तार आता है।",
      stages: "1. प्रारंभिक चरण (हीट चक्र सामान्य): पशु समय पर बोलता है किंतु गर्भाधान विफल होता है।\n2. मध्य चरण (60-90 दिन): गर्भाशय एंडोमेट्रियम में हल्की सूजन।\n3. जीर्ण चरण (Chronic): ओवेरियन सिस्ट या ल्यूटियल अपर्याप्तता।",
      desiRemedy: {
        ingredients: "अंकुरित गेहूं 250 ग्राम, बारीक पिसी सौंफ 50 ग्राम, पुराना देसी गुड़ 100 ग्राम, एलोवेरा (ग्वारपाठा) का गूदा 150 ग्राम।",
        preparation: "अंकुरित गेहूं, सौंफ और गुड़ को मिलाकर सुबह खाली पेट लगातार 10 दिनों तक खिलाएं। साथ में एलोवेरा गूदा 5 दिन दें।",
        precautions: "गाभिन होने पर सौंफ व गुड़ तुरंत बंद करें। कृत्रिम गर्भाधान (A.I.) केवल तभी कराएं जब तार बिल्कुल कांच जैसा शीशेदार पारदर्शी हो।"
      },
      doctorRedAlert: "यदि पशु 3 बार ए.आई. के बाद भी खाली रह जाए, तो देसी नुस्खे रोकें। तुरंत डॉक्टर से गर्भाशय की धुलाई (Uterine Wash) करवाएं और ए.आई. के समय GnRH (Receptal 2.5ml) व 5वें दिन Progesterone इंजेक्शन लगवाएं।"
    },
    {
      id: "DIS_FARMER_02",
      nameHi: "जेर का रुकना (आंवल न गिरना)",
      nameEn: "Retention of Placenta (ROP)",
      organ: "बच्चेदानी व प्रजनन",
      causes: "ब्याने के 8 घंटे बाद भी जेर न गिरना, कैल्शियम/फास्फोरस की कमी, गर्भाशय में संकुचन की कमी (Uterine Inertia), समय पूर्व प्रसव।",
      symptoms: "योनि मार्ग से जेर लटकती दिखाई देना, बदबूदार गंध, पशु का सुस्त होना, दूध में अचानक गिरावट, हल्का बुखार।",
      stages: "• 0-6 घंटे: सामान्य प्रसव उपरांत अवधि।\n• 6-12 घंटे: जेर का आंशिक रुकावट चरण।\n• 12+ घंटे: सड़ांध व टॉक्सिमिया का गंभीर खतरा।",
      desiRemedy: {
        ingredients: "पुराना गुड़ 500 ग्राम, सोंठ (सूखा अदरक) 50 ग्राम, अजवाइन 50 ग्राम, मेथी दाना 50 ग्राम, हल्दी 50 ग्राम, तिल का तेल 100 ml।",
        preparation: "2 लीटर पानी में गुड़, अजवाइन, मेथी और सोंठ को अच्छी तरह उबालकर काढ़ा बनाएं। गुनगुना होने पर तिल का तेल व हल्दी मिलाकर ब्याने के 2 घंटे बाद पिलाएं।",
        precautions: "हाथ से कभी भी जबरदस्ती जेर न खींचें! इससे गर्भाशय छिलने और आजीवन बांझपन का खतरा रहता है।"
      },
      doctorRedAlert: "ब्याने के 12 घंटे बाद भी जेर न गिरे या पशु को 103°F से अधिक बुखार हो, तो तुरंत पशु चिकित्सक को बुलाएं।"
    },
    {
      id: "DIS_FARMER_03",
      nameHi: "फूल निकलना / पाछा (योनि भ्रंश)",
      nameEn: "Vaginal & Uterine Prolapse",
      organ: "बच्चेदानी व प्रजनन",
      causes: "एस्ट्रोजन हार्मोन का अधिक होना, शरीर में कैल्शियम व फास्फोरस की भारी कमी, बैठते समय पीछे की ओर ढलान वाला फर्श, कब्ज व जोर लगाना।",
      symptoms: "बैठने पर योनि मार्ग से लाल गेंद जैसा मांसल अंग बाहर आना, खड़े होने पर अंदर चला जाना। गंभीर स्थिति में खड़े रहने पर भी बाहर लटके रहना।",
      stages: "1st Degree: केवल बैठने पर थोड़ा सा फूल दिखना।\n2nd Degree: खड़े होने पर भी बाहर रहना।\n3rd Degree: पूर्ण गर्भाशय का बाहर आना (Uterine Inversion) - इमरजेंसी।",
      desiRemedy: {
        ingredients: "बबूल (कीकर) की गोंद 100 ग्राम, देसी घी 100 ग्राम, मिश्री 100 ग्राम, ताजा फिटकरी 10 ग्राम।",
        preparation: "गोंद को घी में भून लें। इसमें मिश्री मिलाकर 7 दिन तक सुबह दें। बाहर निकले भाग को 1% हल्के गुनगुने फिटकरी पानी या पोटेशियम परमैंगनेट (लाल दवा) से धोकर साफ करें।",
        precautions: "पशु का पिछला हिस्सा 4-6 इंच ऊंचा रखें। गोबर साफ रखें ताकि बाहर निकले भाग पर गंदगी न लगे।"
      },
      doctorRedAlert: "यदि फूल पर चोट लगकर खून बहने लगे या पेशाब बंद हो जाए, तो तुरंत डॉक्टर से ट्रस (Rope Truss) बंधवाएं या Buhner टांके लगवाएं।"
    },

    // ------------------------------------------------------------------------
    // B. अयन व थन (Udder & Teats)
    // ------------------------------------------------------------------------
    {
      id: "DIS_FARMER_04",
      nameHi: "थनैला रोग (एक्यूट मैस्टाइटिस)",
      nameEn: "Acute Bovine Mastitis",
      organ: "अयन व थन",
      causes: "अडर में स्ट्रेप्टोकोकस, स्टेफिलोकोकस या ई-कोलाई बैक्टीरिया का संक्रमण, गंदे फर्श पर बैठना, गलत मिल्किंग तकनीक।",
      symptoms: "अडर (लेवटी) में कठोर सूजन, थन छूने पर अत्यधिक गर्म व दर्द, दूध में पीले छिछड़े (Flakes), पानी जैसा दूध या खून आना।",
      stages: "1. सब-क्लिनिकल: दूध में छिपा हुआ जीवाणु, केवल स्ट्रिप कप टेस्ट में बदलाव।\n2. एक्यूट: थन में भारी सूजन व दर्द।\n3. क्रोनिक (फाइब्रोसिस): थन का पत्थर जैसा कठोर होना और दूध स्थायी बंद।",
      desiRemedy: {
        ingredients: "ताजा घृतकुमारी (एलोवेरा) 250 ग्राम, हल्दी चूर्ण 50 ग्राम, चूना (कैल्शियम हाइड्रोक्साइड) 15 ग्राम।",
        preparation: "एलोवेरा, हल्दी और चूने को सिलबट्टे या मिक्सी में पीसकर लाल-नारंगी लेप बनाएं। थन का पूरा खराब दूध निकालकर लेप को पूरे अडर पर दिन में 3-4 बार लगाएं।",
        precautions: "दूध निकालने के बाद 30 मिनट तक पशु को बैठने न दें ताकि थन का छेद (Teat Sphincter) प्राकृतिक रूप से बंद हो सके।"
      },
      doctorRedAlert: "दूध से बदबूदार लाल खून आने लगे, पशु चारा बंद कर दे या बुखार 105°F पहुंचे, तो तुरंत एंटीबायोटिक व सूजनरोधी इंजेक्शन हेतु डॉक्टर बुलाएं।"
    },
    {
      id: "DIS_FARMER_05",
      nameHi: "ब्याने के बाद लेवटी की सूजन (अडर एडिमा)",
      nameEn: "Physiological Udder Edema",
      organ: "अयन व थन",
      causes: "ब्याने के आसपास अडर में रक्त परिसंचरण में रुकावट, अत्यधिक प्रोटीन व नमक युक्त आहार, पहली ब्यांत की बछड़ियों में अधिक।",
      symptoms: "लेवटी पर दोनों तरफ पिलपिली सूजन, अंगुली दबाने पर गड्ढा पड़ना (Pitting Edema), दूध की धार बिल्कुल सामान्य होना (छिछड़े रहित)।",
      stages: "• ब्याने से 7 दिन पूर्व से ब्याने के 10 दिन बाद तक का प्राकृतिक प्रभाव।",
      desiRemedy: {
        ingredients: "सेंधा नमक 50 ग्राम, गुनगुना पानी 5 लीटर, सरसों का तेल 50 ml, कपूर 10 ग्राम।",
        preparation: "गुनगुने नमक के पानी से लेवटी की धीरे-धीरे सिकाई करें। बाद में सरसों के तेल में कपूर मिलाकर हल्के हाथों से ऊपर की ओर मालिश करें।",
        precautions: "यह संक्रामक थनैला नहीं है, अतः एंटीबायोटिक न लगाएं। पशु को हल्का व्यायाम (टहलाना) कराएं।"
      },
      doctorRedAlert: "यदि सूजन जांघों तक फैल जाए और पशु लंगड़ा कर चलने लगे तो डाईयूरेटिक (पेशाब बढ़ाने वाली) दवा हेतु डॉक्टर से सलाह लें।"
    },

    // ------------------------------------------------------------------------
    // C. पेट व पाचन (Digestive System)
    // ------------------------------------------------------------------------
    {
      id: "DIS_FARMER_06",
      nameHi: "तीव्र अफारा (पेट में गैस भरना)",
      nameEn: "Frothy & Free-Gas Bloat (Tympany)",
      organ: "पेट व पाचन",
      causes: "अत्यधिक गीला हरा बरसीम या दलहनी चारा खाना, सड़ा-गला दाना, प्लास्टिक या बाहरी वस्तु द्वारा भोजन नली (Esophagus) का अवरोध।",
      symptoms: "बाईं कोख (Left Flank) का ढोलक की तरह फूल जाना, थपथपाने पर ड्रम जैसी आवाज आना, मुंह खोलकर जीभ बाहर निकाल सांस लेना, बेचैनी।",
      stages: "• स्टेज 1: बाईं कोख में हल्का फुलाव, जुगाली बंद।\n• स्टेज 2: पेट का अत्यधिक तनाव, सांस फूलना।\n• स्टेज 3: दम घुटना, जमीन पर गिरना (अति आपातकालीन)।",
      desiRemedy: {
        ingredients: "मीठा सरसों का तेल 250-500 ml, तारपीन का तेल (Turpentine Oil) 20-30 ml, हींग 15 ग्राम, अजवाइन 50 ग्राम, काला नमक 50 ग्राम।",
        preparation: "सरसों के तेल में तारपीन का तेल, भुनी हुई हींग और पिसी अजवाइन-काला नमक मिलाकर नाल द्वारा सावधानीपूर्वक धीरे-धीरे पिलाएं।",
        precautions: "दवा पिलाते समय पशु की जीभ कभी न पकड़ें अन्यथा दवा फेफड़ों में जाकर ड्रेंचिंग निमोनिया से मृत्यु हो सकती है!"
      },
      doctorRedAlert: "यदि पशु सांस न ले पाए और आंखें फटी रह जाएं, तो बाईं कोख में ट्रोकार-कैनुला (Trocar & Cannula) लगाकर तुरंत गैस निकालने हेतु डॉक्टर को बुलाएं।"
    },
    {
      id: "DIS_FARMER_07",
      nameHi: "अपच, अरुचि व भूख बंद (हाजमा खराब)",
      nameEn: "Simple Indigestion & Anorexia",
      organ: "पेट व पाचन",
      causes: "चारे में अचानक बदलाव, फफूंद लगा दाना, अधिक मात्रा में सूखा भूसा खाना, पानी कम पीना, रूमेन माइक्रोफ्लोरा की निष्क्रियता।",
      symptoms: "पशु का जुगाली बंद करना, सूखा कड़ा या दुर्गंधयुक्त गोबर, पेट में गुड़गुड़ाहट की कमी, सुस्ती।",
      stages: "• 24-48 घंटे: रूमेन की गतिशीलता धीमी पड़ना।",
      desiRemedy: {
        ingredients: "लहसुन 50 ग्राम, अदरक 50 ग्राम, जीरा 50 ग्राम, काली मिर्च 20 ग्राम, गुड़ 200 ग्राम, छाछ (खट्टी लस्सी) 1 लीटर।",
        preparation: "मसालों को पीसकर गुड़ में मिला लें। इसकी दो पिन्नियां बनाकर सुबह-शाम खिलाएं और साथ में खट्टी छाछ पिलाएं।",
        precautions: "2 दिन तक भारी खल या दलिया बंद रखें, केवल हल्का हरा चारा व सुपाच्य घास दें।"
      },
      doctorRedAlert: "यदि 3 दिन तक गोबर बिल्कुल बंद हो जाए और पेट में दर्द के लक्षण दिखें तो आंतों में रुकावट (Intestinal Obstruction) की जांच करवाएं।"
    },

    // ------------------------------------------------------------------------
    // D. खुर व पैर (Hooves & Limbs)
    // ------------------------------------------------------------------------
    {
      id: "DIS_FARMER_08",
      nameHi: "खुरपका-मुंहपका (FMD)",
      nameEn: "Foot and Mouth Disease (FMD)",
      organ: "खुर व पैर",
      causes: "एपथोवायरस (Apthovirus) जनित अति संक्रामक विषाणु, दूषित हवा, पानी, व रोगी पशु के संपर्क से फैलाव।",
      symptoms: "105-106°F तेज बुखार, मुंह से तार की तरह लार टपकना, जीभ, मसूड़ों व खुरों के बीच छाले (Blisters), लंगड़ाकर चलना, दूध में भारी गिरावट।",
      stages: "• दिन 1-2: तेज बुखार व लार गिरना।\n• दिन 3-5: छालों का फटना व खुरों में कीड़े पड़ने का जोखिम।\n• दिन 6-10: रिकवरी चरण।",
      desiRemedy: {
        ingredients: "मुंह हेतु: सुहागा (बोरेक्स) 20 ग्राम भुना हुआ, शहद 50 ग्राम। खुरों हेतु: फिटकरी 1% घोल, नीम का तेल 100 ml, कपूर 10 ग्राम।",
        preparation: "मुंह के छालों पर भुना सुहागा शहद में मिलाकर लगाएं। खुरों को फिटकरी के पानी से धोकर नीम तेल व कपूर का मिश्रण लगाएं ताकि कीड़े न पड़ें।",
        precautions: "रोगी पशु को स्वस्थ पशुओं से अलग रखें। दूध को अच्छी तरह उबालकर ही उपयोग करें। नवजात बछड़ों को मां का दूध सीधे न पीने दें।"
      },
      doctorRedAlert: "यदि खुरों में मैगॉट्स (कीड़े) पड़ जाएं या बछड़ों में दिल की गति अनियंत्रित हो जाए तो तत्काल आपातकालीन उपचार लें।"
    },
    {
      id: "DIS_FARMER_09",
      nameHi: "खुर सड़न व लंगड़ापन (फुट रॉट)",
      nameEn: "Bovine Foot Rot (Interdigital Necrosis)",
      organ: "खुर व पैर",
      causes: "खुरों के बीच नमी, गोबर-कीचड़ में लगातार खड़े रहना, नुकीले पत्थरों से खुरों में घाव होकर फ्यूसोबैक्टीरियम का संक्रमण।",
      symptoms: "पैर जमीन पर न टेकना, खुरों के बीच तेज बदबूदार मवाद, खुर के चारों ओर सूजन, लंगड़ापन।",
      stages: "• प्रारंभिक: खुर की त्वचा लाल व दर्दनाक।\n• द्वितीय: त्वचा फटकर बदबूदार घाव बनना।",
      desiRemedy: {
        ingredients: "तूतिया (कॉपर सल्फेट / नीला थोथा) 50 ग्राम, चूना 50 ग्राम, नारियल या सरसों का तेल 150 ml।",
        preparation: "नीले थोथे और चूने को बारीक पीसकर तेल में मिलाकर मलहम बनाएं। खुर को पोटाश या फिटकरी पानी से धोकर सुखाएं और यह मलहम लगाकर साफ पट्टी बांधें।",
        precautions: "पशु को सूखे और पक्के फर्श पर बांधें। तूतिया जहरीला होता है, इसे पशु को चाटने न दें!"
      },
      doctorRedAlert: "यदि सूजन घुटने तक चढ़ जाए और पैर से खून बहने लगे तो डॉक्टर से एंटीबायोटिक व खुर की सर्जरी कराएं।"
    },

    // ------------------------------------------------------------------------
    // E. उपापचयी व संक्रामक (Metabolic & Infectious)
    // ------------------------------------------------------------------------
    {
      id: "DIS_FARMER_10",
      nameHi: "मिल्क फीवर (सूतक बुखार / कैल्शियम की कमी)",
      nameEn: "Hypocalcemia (Milk Fever)",
      organ: "उपापचयी व संक्रामक",
      causes: "ब्याने के तुरंत बाद दूध में भारी मात्रा में कैल्शियम निकल जाना, रक्त में कैल्शियम स्तर 8 mg/dl से घटकर 4-5 mg/dl होना।",
      symptoms: "ब्याने के 24-48 घंटे में पशु जमीन पर बैठ जाता है, गर्दन मोड़कर कोख की तरफ रखना (S-Shape Posture), कान व सींग ठंडे पड़ना, तापमान 98-99°F (सब-नॉर्मल)।",
      stages: "• स्टेज 1: लड़खड़ाहट व मांसपेशियों में कंपन।\n• स्टेज 2: जमीन पर बैठना, गर्दन मोड़ना (Sterna Recumbency)।\n• स्टेज 3: एक तरफ पसर जाना व बेहोशी (Coma)।",
      desiRemedy: {
        ingredients: "आयनिक कैल्शियम ओरल जेल (Oral Calcium Gel) 300 ग्राम वायल, मेथी दाना 100 ग्राम, पुराना गुड़ 250 ग्राम।",
        preparation: "यदि पशु होश में है और निगल सकता है, तो तुरंत ओरल कैल्शियम जेल धीरे-धीरे पिलाएं। ब्याने से 15 दिन पूर्व मेथी व गुड़ दें।",
        precautions: "यदि पशु अचेत है या गर्दन मोड़े लेटा है, तो मुंह से कुछ भी जबरदस्ती न पिलाएं, यह सांस की नली में जा सकता है!"
      },
      doctorRedAlert: "यह एक अति-आपातकालीन स्थिति है! बिना 1 मिनट गंवाए तुरंत वेटरनरी डॉक्टर को बुलाकर नस में कैल्शियम बोरोर्ग्लुकोनेट (Mifex 450ml IV) चढ़वाएं।"
    },
    {
      id: "DIS_FARMER_11",
      nameHi: "कीटोसिस (एसिटोनीमिया)",
      nameEn: "Bovine Ketosis (Negative Energy Balance)",
      organ: "उपापचयी व संक्रामक",
      causes: "ब्याने के 2 से 8 सप्ताह बाद ऊर्जा की भारी कमी, शरीर की चर्बी का तेजी से टूटना, रक्त में कीटोन बॉडीज का बढ़ना।",
      symptoms: "पशु का दाना व खल खाना बिल्कुल बंद कर देना, केवल सूखा भूसा खाना, दूध में अप्रत्याशित भारी गिरावट, सांस व दूध से मीठी फल जैसी गंध (Sweet Acetone Breath)।",
      stages: "• सब-क्लिनिकल: दूध में वसा/प्रोटीन अनुपात बिगड़ना।\n• क्लीनिकल: तीव्र वजन घटना व नर्वस लक्षण (दीवार चाटना)।",
      desiRemedy: {
        ingredients: "प्रोपलीन ग्लाइकोल (Propylene Glycol) 200 ml अथवा तरल ग्लूकोज / शहद 250 ग्राम, मीठा सोडा 50 ग्राम।",
        preparation: "प्रोपलीन ग्लाइकोल या शुद्ध शहद को पानी में घोलकर 4-5 दिन तक सुबह-शाम पिलाएं। ऊर्जा स्तर तुरंत सुधरता है।",
        precautions: "ब्याने से पूर्व पशु को न तो अत्यधिक मोटा होने दें और न ही अत्यधिक कमजोर रखें।"
      },
      doctorRedAlert: "यदि पशु अजीब हरकतें करे, पागलों की तरह दौड़े या दीवार से सिर टकराए (Nervous Ketosis), तो तुरंत 25% डेक्सट्रोज ड्रिप हेतु डॉक्टर बुलाएं।"
    },
    {
      id: "DIS_FARMER_12",
      nameHi: "लाल पेशाब (फास्फोरस की कमी / PPH)",
      nameEn: "Post-Parturient Hemoglobinuria (PPH)",
      organ: "उपापचयी व संक्रामक",
      causes: "ब्याने के 1-4 सप्ताह बाद रक्त में अकार्बनिक फास्फोरस की अत्यधिक कमी, क्रूसीफेरस चारा (सरसों/राई/गोभी) अधिक खिलाना।",
      symptoms: "पेशाब का रंग कॉफी या गहरे लाल रंग का होना, आंखें व मसूड़े पीले पड़ना (तीव्र एनीमिया), दूध सूख जाना, कमजोरी।",
      stages: "• दिन 1: हल्का भूरा-लाल पेशाब।\n• दिन 2-3: गहरा कॉफी रंग, खून में आरबीसी का टूटना।",
      desiRemedy: {
        ingredients: "सोडियम एसिड फास्फेट पाउडर 100 ग्राम अथवा डी-कैल्शियम फास्फेट (DCP) 100 ग्राम, आंवला चूर्ण 100 ग्राम, गुड़ 200 ग्राम।",
        preparation: "सोडियम एसिड फास्फेट को आंवला और गुड़ के साथ मिलाकर दिन में दो बार 5 दिन तक दें।",
        precautions: "सरसों, गोभी के पत्ते व शलजम तुरंत बंद करें। यह बबेसिओसिस (चिंचड़ी बुखार) से अलग है क्योंकि इसमें 106°F बुखार नहीं होता।"
      },
      doctorRedAlert: "यदि पेशाब का रंग गहरा काला हो जाए और पशु खड़ा न हो पाए, तो तुरंत डॉक्टर से उच्च क्षमता का फास्फोरस इंजेक्शन (Tonophosphan 30ml IV) लगवाएं।"
    }
  ];

  // ==========================================================================
  // 2. DETAILED REPEAT BREEDER DIRECTORY MODULE & CONTROLLER
  // ==========================================================================
  window.renderRepeatBreederGuide = function (targetContainerId) {
    var container = document.getElementById(targetContainerId || "repeatBreederSection");
    if (!container) {
      container = document.getElementById("viewBreeding");
    }
    if (!container) return;

    // Check if repeatBreederList exists inside viewBreeding to fill directly
    var listEl = document.getElementById("repeatBreederList");
    var heatContainer = document.getElementById("heatSignsContainer");
    var dischargeContainer = document.getElementById("dischargeContainer");

    if (listEl) {
      listEl.innerHTML = `
        <li>
          <strong class="text-amber-900">1. गर्भाशय की अदृश्य सूजन (Subclinical Metritis):</strong>
          अक्सर डिस्चार्ज साफ दिखता है किंतु अंदर सूक्ष्म जीवाणु होते हैं। 
          <em>समाधान:</em> देसी हल्दी 50g व घी 100g लगातार 5 दिन दें अथवा डॉक्टर से Lugol's Iodine या Cephapirin से गर्भाशय धुलवाएं।
        </li>
        <li>
          <strong class="text-amber-900">2. अंडा फूटने में देरी (Delayed Ovulation):</strong>
          टीका लगाने के समय अंडाशय से अंडा बाहर नहीं निकलता और सीमन निष्प्रभावी हो जाता है। 
          <em>समाधान:</em> ए.आई. (A.I.) करवाते समय Buserelin (Receptal 2.5 ml IM) का टीका लगवाएं।
        </li>
        <li>
          <strong class="text-amber-900">3. 10-दिवसीय अंकुरित गेहूं व सौंफ थेरेपी:</strong>
          प्रतिदिन सुबह 250 ग्राम अंकुरित गेहूं + 50 ग्राम बारीक पिसी सौंफ + 100 ग्राम गुड़ 10 दिन खिलाएं। यह नेचुरल विटामिन-ई और फाइटोएस्ट्रोजन का सर्वश्रेष्ठ स्रोत है।
        </li>
        <li>
          <strong class="text-amber-900">4. चिलेटेड मिनरल मिक्सचर व बायोटीन:</strong>
          नियमित रूप से 50 ग्राम अच्छी गुणवत्ता का मिनरल मिक्सचर (जिसमें Zinc, Copper, Selenium व Cobalt हो) दैनिक दाने में 30 दिन तक अनिवार्य रूप से दें।
        </li>
      `;
    }

    if (heatContainer) {
      heatContainer.innerHTML = `
        <div class="bg-blue-50/70 p-2.5 rounded-2xl border border-blue-100 space-y-1">
          <strong class="text-blue-900 block font-bold">⏱️ 12-घंटे का स्वर्णिम नियम (AM-PM Rule):</strong>
          <p class="text-[11px] text-slate-700 leading-relaxed">
            • यदि पशु <strong>सुबह</strong> रंभाना शुरू करे या पहली बार डोके करे, तो <strong>उसी दिन शाम</strong> को सीमन रखवाएं।<br>
            • यदि पशु <strong>शाम/रात</strong> को हीट में आए, तो <strong>अगली सुबह</strong> सीमन रखवाएं।
          </p>
        </div>
        <div class="bg-emerald-50/70 p-2.5 rounded-2xl border border-emerald-100 space-y-1">
          <strong class="text-emerald-900 block font-bold">🐂 सीमन रखने का सटीक चरम समय:</strong>
          <p class="text-[11px] text-slate-700 leading-relaxed">
            हीट शुरू होने के 12 से 18 घंटे के बीच जब डिस्चार्ज लंबा, लचीला व अटूट हो, तब गर्भाधान की संभावना 85% से अधिक होती है।
          </p>
        </div>
      `;
    }

    if (dischargeContainer) {
      dischargeContainer.innerHTML = `
        <div class="space-y-1.5">
          <div class="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
            <span class="font-bold block">1. शीशे जैसा साफ, पारदर्शी अटूट तार:</span>
            <span class="text-[11px]">✅ गर्भाशय 100% स्वस्थ है। तुरंत अच्छी नस्ल का प्रमाणित सीमन रखवाएं।</span>
          </div>
          <div class="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
            <span class="font-bold block">2. मटमैला, पीला या दही जैसा गाढ़ा तार:</span>
            <span class="text-[11px]">⚠️ गर्भाशय में संक्रमण (Metritis) है। सीमन न रखवाएं, पैसे बर्बाद होंगे। पहले डॉक्टर से इलाज कराएं।</span>
          </div>
          <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
            <span class="font-bold block">3. खून की हल्की लकीर (Metestrus Bleeding):</span>
            <span class="text-[11px]">ℹ️ हीट समाप्त हो चुकी है। इस तारीख को डायरी में नोट करें, ठीक 19-21 दिन बाद अगली हीट आएगी।</span>
          </div>
        </div>
      `;
    }
  };

  // ==========================================================================
  // 3. ORGAN-BASED & DIRECT NAME SEARCH CONTROLLER
  // ==========================================================================
  var currentOrganFilter = "ALL";
  var currentSearchQuery = "";

  window.renderFarmerDiseases = function (organFilter, searchQuery, containerId) {
    var container = document.getElementById(containerId || "diseaseSearchResults");
    if (!container) {
      container = document.getElementById("viewHelpdesk");
    }
    if (!container) return;

    if (organFilter !== undefined) currentOrganFilter = organFilter;
    if (searchQuery !== undefined) currentSearchQuery = searchQuery;

    // Filter Logic
    var list = window.VETCARE_FARMER_DISEASES.filter(function (d) {
      if (currentOrganFilter !== "ALL" && d.organ !== currentOrganFilter) {
        return false;
      }
      if (currentSearchQuery.trim() !== "") {
        var q = currentSearchQuery.toLowerCase().trim();
        var matchHi = d.nameHi.toLowerCase().indexOf(q) !== -1;
        var matchEn = d.nameEn.toLowerCase().indexOf(q) !== -1;
        var matchSymptoms = d.symptoms.toLowerCase().indexOf(q) !== -1;
        var matchCauses = d.causes.toLowerCase().indexOf(q) !== -1;
        var matchOrgan = d.organ.toLowerCase().indexOf(q) !== -1;
        if (!matchHi && !matchEn && !matchSymptoms && !matchCauses && !matchOrgan) {
          return false;
        }
      }
      return true;
    });

    var organTabs = [
      { id: "ALL", label: "सभी रोग (" + window.VETCARE_FARMER_DISEASES.length + ")" },
      { id: "बच्चेदानी व प्रजनन", label: "बच्चेदानी व प्रजनन" },
      { id: "अयन व थन", label: "अयन व थन" },
      { id: "पेट व पाचन", label: "पेट व पाचन" },
      { id: "खुर व पैर", label: "खुर व पैर" },
      { id: "उपापचयी व संक्रामक", label: "उपापचयी व संक्रामक" }
    ];

    var html = `
      <div class="space-y-4 text-xs">
        
        <!-- TOP TOOLBAR: SEARCH & ORGAN TABS -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
          <div class="flex flex-col sm:flex-row gap-2">
            <!-- Bilingual Search Input -->
            <div class="relative flex-1">
              <span class="absolute left-3.5 top-3 text-slate-400 text-xs"><i class="fa-solid fa-magnifying-glass"></i></span>
              <input
                id="farmerDiseaseSearchInput"
                type="text"
                value="${escapeHtml(currentSearchQuery)}"
                placeholder="रोग का नाम, अंग या लक्षण खोजें (उदा. थनैला, रिपीट, अफारा, Mastitis)..."
                oninput="window.handleFarmerDiseaseTyping(this.value)"
                class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-8 py-2.5 text-xs outline-none focus:border-emerald-600 font-medium text-slate-800"
              />
              ${currentSearchQuery ? `
                <button onclick="window.clearFarmerDiseaseSearch()" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs">✕</button>
              ` : ''}
            </div>
          </div>

          <!-- Organ Tabs Overflow Scroll -->
          <div class="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 text-[11px] font-bold">
            ${organTabs.map(function (tab) {
              var isActive = currentOrganFilter === tab.id;
              return `
                <button
                  type="button"
                  onclick="window.setFarmerOrganFilter('${escapeHtml(tab.id)}')"
                  class="px-3 py-1.5 rounded-xl transition whitespace-nowrap shrink-0 ${isActive ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}"
                >
                  ${escapeHtml(tab.label)}
                </button>
              `;
            }).join('')}
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span>उपलब्ध देसी उपचार: <strong class="text-slate-800">${list.length}</strong> रोग</span>
            <button onclick="window.resetFarmerDiseaseFilters()" class="text-emerald-700 hover:underline font-bold">
              🔄 रीसेट करें
            </button>
          </div>
        </div>

        <!-- DISEASE CARDS LIST -->
        ${list.length === 0 ? `
          <div class="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center space-y-2">
            <span class="text-4xl">🌿</span>
            <h3 class="text-sm font-bold text-slate-800">कोई संबंधित देसी उपचार नहीं मिला!</h3>
            <p class="text-xs text-slate-500">कृपया अपना कीवर्ड बदलें अथवा 'सभी रोग' टैब पर क्लिक करें।</p>
          </div>
        ` : `
          <div class="space-y-4">
            ${list.map(function (disease) { return renderSingleFarmerDiseaseCard(disease); }).join('')}
          </div>
        `}

      </div>
    `;

    container.innerHTML = html;
  };

  // Helper: Render Single Disease Card
  function renderSingleFarmerDiseaseCard(d) {
    return `
      <div class="bg-white border border-slate-200 hover:border-emerald-500 rounded-3xl p-4 sm:p-5 shadow-xs transition space-y-3.5 relative">
        
        <!-- CARD HEADER: ORGAN & TITLES -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              📍 प्रभावित अंग: ${escapeHtml(d.organ)}
            </span>
            <span class="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-lg">
              🌿 100% देसी नुस्खा (शून्य सुई)
            </span>
          </div>

          <div class="pt-1">
            <h3 class="text-base font-black text-slate-900 leading-tight">
              ${escapeHtml(d.nameHi)}
            </h3>
            <p class="text-xs font-mono font-medium text-slate-500">
              ${escapeHtml(d.nameEn)}
            </p>
          </div>
        </div>

        <!-- CAUSES & SYMPTOMS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1">
            <span class="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">मुख्य कारण (Root Cause):</span>
            <p class="text-slate-800 leading-relaxed text-[11.5px]">${escapeHtml(d.causes)}</p>
          </div>
          <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1">
            <span class="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">पहचान व लक्षण (Cardinal Signs):</span>
            <p class="text-slate-800 leading-relaxed text-[11.5px]">${escapeHtml(d.symptoms)}</p>
          </div>
        </div>

        <!-- STAGES TIMELINE -->
        <div class="p-3 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-1 text-xs">
          <span class="font-bold text-blue-900 block text-[11px] uppercase tracking-wider">बीमारी की अवस्थाएं (Timeline):</span>
          <p class="text-slate-700 whitespace-pre-line text-[11.5px] leading-relaxed pl-1">${escapeHtml(d.stages)}</p>
        </div>

        <!-- CERTIFIED DESI REMEDY BOX -->
        <div class="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-2 text-xs text-emerald-950">
          <div class="flex items-center gap-1.5 font-bold text-emerald-900">
            <span class="text-base">🥣</span>
            <span class="text-xs sm:text-sm">प्रमाणित घरेलू देसी नुस्खा व तैयारी:</span>
          </div>
          <div class="space-y-1.5 pl-1 leading-relaxed text-[11.5px]">
            <div><strong>सामग्री:</strong> ${escapeHtml(d.desiRemedy.ingredients)}</div>
            <div><strong>तैयारी व खुराक:</strong> ${escapeHtml(d.desiRemedy.preparation)}</div>
            <div class="text-emerald-800 font-medium"><strong>परहेज / सावधानी:</strong> ${escapeHtml(d.desiRemedy.precautions)}</div>
          </div>
        </div>

        <!-- RED ALERT: WHEN TO CALL DOCTOR -->
        <div class="p-3 bg-rose-50/80 rounded-2xl border border-rose-200 space-y-1 text-xs text-rose-950">
          <span class="font-bold text-rose-900 flex items-center gap-1">
            <i class="fa-solid fa-triangle-exclamation"></i> डॉक्टर को कब बुलाएं (Red Alert):
          </span>
          <p class="text-[11px] leading-relaxed pl-4 font-medium">${escapeHtml(d.doctorRedAlert)}</p>
        </div>

        <!-- WHATSAPP SHARE REMEDY -->
        <div class="pt-2 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onclick="window.shareFarmerRemedyWhatsApp('${escapeHtml(d.id)}')"
            class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-xl text-[11px] transition flex items-center gap-1.5 shadow-xs"
          >
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>नुस्खा व्हाट्सएप पर शेयर करें</span>
          </button>
        </div>

      </div>
    `;
  }

  // 1-Click WhatsApp Share for Desi Remedies
  window.shareFarmerRemedyWhatsApp = function (diseaseId) {
    var d = window.VETCARE_FARMER_DISEASES.find(function (item) { return item.id === diseaseId; });
    if (!d) return;

    var text =
      "🌿 *पशु रोग प्रमाणित देसी उपचार* 🐄\n\n" +
      "🔹 *रोग का नाम:* " + d.nameHi + " (" + d.nameEn + ")\n" +
      "📍 *अंग:* " + d.organ + "\n\n" +
      "⚠️ *पहचान व लक्षण:* " + d.symptoms + "\n\n" +
      "🥣 *देसी नुस्खा:* " + d.desiRemedy.ingredients + "\n" +
      "🥄 *तैयारी व खुराक:* " + d.desiRemedy.preparation + "\n\n" +
      "🚨 *डॉक्टर को कब बुलाएं:* " + d.doctorRedAlert + "\n\n" +
      "स्रोत: *Vetcare AI OS (स्मार्ट पशुपालक समाधान)*";

    var url = "https://wa.me/?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
  };

  // Filter Event Handlers
  window.handleFarmerDiseaseTyping = function (val) {
    currentSearchQuery = val;
    window.renderFarmerDiseases();
  };

  window.clearFarmerDiseaseSearch = function () {
    currentSearchQuery = "";
    var el = document.getElementById("farmerDiseaseSearchInput");
    if (el) el.value = "";
    window.renderFarmerDiseases();
  };

  window.setFarmerOrganFilter = function (organ) {
    currentOrganFilter = organ;
    window.renderFarmerDiseases();
  };

  window.resetFarmerDiseaseFilters = function () {
    currentOrganFilter = "ALL";
    currentSearchQuery = "";
    window.renderFarmerDiseases();
  };

  // ==========================================================================
  // 4. DAILY MILK & FEED EXPENSE LEDGER (LOCAL STORAGE PERSISTENCE)
  // ==========================================================================
  window.getMilkLedgerRecords = function () {
    try {
      var data = localStorage.getItem("vetcare_milk_ledger");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  };

  window.saveMilkLedgerRecords = function (records) {
    try {
      localStorage.setItem("vetcare_milk_ledger", JSON.stringify(records));
    } catch (e) {
      console.error("Ledger storage error:", e);
    }
  };

  window.renderMilkLedger = function (containerId) {
    var container = document.getElementById(containerId || "viewFinance");
    if (!container) return;

    var records = window.getMilkLedgerRecords();

    // Summary calculations
    var totalLiters = 0;
    var totalIncome = 0;
    var totalExpense = 0;

    records.forEach(function (r) {
      totalLiters += Number(r.liters || 0);
      totalIncome += Number(r.income || 0);
      totalExpense += Number(r.expense || 0);
    });

    var netProfit = totalIncome - totalExpense;

    var html = `
      <div class="space-y-4 text-xs">
        
        <!-- TOP FINANCES SUMMARY BANNER -->
        <div class="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 text-white rounded-3xl p-5 shadow-lg border border-slate-700">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-2xl">🥛</span>
                <h2 class="text-base sm:text-lg font-black tracking-tight">दैनिक दूध बिक्री व पशु आहार खाता-बही</h2>
              </div>
              <p class="text-xs text-slate-300 mt-1">
                दूध, फैट, दाना-चारा खर्च और शुद्ध दैनिक लाभ-हानि का डिजिटल लेखा-जोखा।
              </p>
            </div>
            <button
              type="button"
              onclick="window.exportLedgerWhatsAppSummary()"
              class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <i class="fa-brands fa-whatsapp text-sm"></i>
              <span>बहीखाता शेयर करें</span>
            </button>
          </div>

          <!-- SUMMARY STATS -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-slate-700/80 text-center">
            <div class="bg-white/10 rounded-2xl p-2 backdrop-blur-xs">
              <span class="text-[10px] text-slate-300 block font-medium">कुल दूध उत्पादन</span>
              <span class="text-sm sm:text-base font-black text-white">${totalLiters.toFixed(1)} ली.</span>
            </div>
            <div class="bg-emerald-500/20 rounded-2xl p-2 border border-emerald-400/30">
              <span class="text-[10px] text-emerald-200 block font-medium">कुल दूध आमदनी</span>
              <span class="text-sm sm:text-base font-black text-emerald-300">₹${totalIncome.toFixed(0)}</span>
            </div>
            <div class="bg-rose-500/20 rounded-2xl p-2 border border-rose-400/30">
              <span class="text-[10px] text-rose-200 block font-medium">कुल चारा व दवा खर्च</span>
              <span class="text-sm sm:text-base font-black text-rose-300">₹${totalExpense.toFixed(0)}</span>
            </div>
            <div class="bg-amber-500/20 rounded-2xl p-2 border border-amber-400/30">
              <span class="text-[10px] text-amber-200 block font-medium">शुद्ध बचत / लाभ</span>
              <span class="text-sm sm:text-base font-black ${netProfit >= 0 ? 'text-amber-300' : 'text-rose-400'}">₹${netProfit.toFixed(0)}</span>
            </div>
          </div>
        </div>

        <!-- NEW ENTRY INPUT FORM -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
          <h3 class="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
            <i class="fa-solid fa-plus-circle text-emerald-600"></i>
            <span>नई दूध बिक्री या खर्च प्रविष्टि जोड़ें:</span>
          </h3>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <label class="block text-[10px] font-bold text-slate-500 mb-1">दिनांक</label>
              <input id="ledgerDate" type="date" value="${new Date().toISOString().split('T')[0]}" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-medium" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-500 mb-1">समय (Shift)</label>
              <select id="ledgerShift" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold">
                <option value="सुबह (Morning)">सुबह (Morning)</option>
                <option value="शाम (Evening)">शाम (Evening)</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-500 mb-1">दूध (लीटर) *</label>
              <input id="ledgerLiters" type="number" step="0.5" placeholder="10" oninput="window.calcLedgerIncome()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold text-slate-900" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-500 mb-1">फैट % (Fat)</label>
              <input id="ledgerFat" type="number" step="0.1" placeholder="7.0" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 text-xs">
            <div>
              <label class="block text-[10px] font-bold text-slate-500 mb-1">दूध भाव (₹/लीटर) *</label>
              <input id="ledgerRate" type="number" placeholder="60" oninput="window.calcLedgerIncome()" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-500 mb-1">दूध कुल आय (₹)</label>
              <input id="ledgerIncome" type="number" readonly placeholder="0" class="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-2 outline-none font-black text-emerald-800" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-500 mb-1">दाना-चारा खर्च (₹)</label>
              <input id="ledgerExpense" type="number" placeholder="150" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 outline-none font-bold text-rose-700" />
            </div>
          </div>

          <button
            type="button"
            onclick="window.submitNewLedgerEntry()"
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-2xl shadow-xs transition active:scale-98 flex items-center justify-center gap-1.5"
          >
            <i class="fa-solid fa-floppy-disk"></i>
            <span>खाता-बही में सुरक्षित करें</span>
          </button>
        </div>

        <!-- RECENT ENTRIES TABLE -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-slate-900 text-xs sm:text-sm">हाल की प्रविष्टियां (${records.length})</h3>
            <button onclick="window.clearEntireLedger()" class="text-[10px] text-rose-600 hover:underline font-bold">
              🗑️ संपूर्ण बहीखाता खाली करें
            </button>
          </div>

          ${records.length === 0 ? `
            <div class="p-6 text-center text-slate-400 space-y-1">
              <i class="fa-solid fa-receipt text-3xl"></i>
              <p class="text-xs">कोई प्रविष्टि दर्ज नहीं है। ऊपर दिए गए फॉर्म से पहला रिकॉर्ड जोड़ें।</p>
            </div>
          ` : `
            <div class="overflow-x-auto no-scrollbar">
              <table class="w-full text-left text-[11px] border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                    <th class="p-2">दिनांक</th>
                    <th class="p-2">समय</th>
                    <th class="p-2">दूध</th>
                    <th class="p-2">फैट</th>
                    <th class="p-2">आय (₹)</th>
                    <th class="p-2">खर्च (₹)</th>
                    <th class="p-2">शुद्ध (₹)</th>
                    <th class="p-2 text-center">हटाएं</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium text-slate-800">
                  ${records.slice(-15).reverse().map(function (r) {
                    var net = Number(r.income || 0) - Number(r.expense || 0);
                    return `
                      <tr class="hover:bg-slate-50">
                        <td class="p-2 whitespace-nowrap">${escapeHtml(r.date)}</td>
                        <td class="p-2">${escapeHtml(r.shift)}</td>
                        <td class="p-2 font-bold">${escapeHtml(String(r.liters))}L</td>
                        <td class="p-2">${escapeHtml(String(r.fat || '-'))}%</td>
                        <td class="p-2 text-emerald-700 font-bold">₹${escapeHtml(String(r.income))}</td>
                        <td class="p-2 text-rose-600 font-bold">₹${escapeHtml(String(r.expense))}</td>
                        <td class="p-2 font-black ${net >= 0 ? 'text-emerald-800' : 'text-rose-700'}">₹${net}</td>
                        <td class="p-2 text-center">
                          <button onclick="window.deleteLedgerRecord('${escapeHtml(r.id)}')" class="text-rose-500 hover:text-rose-700 p-1">
                            <i class="fa-solid fa-trash-can text-xs"></i>
                          </button>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

      </div>
    `;

    container.innerHTML = html;
  };

  // Ledger Calculations & Handlers
  window.calcLedgerIncome = function () {
    var liters = parseFloat(document.getElementById("ledgerLiters")?.value || 0);
    var rate = parseFloat(document.getElementById("ledgerRate")?.value || 0);
    var incomeEl = document.getElementById("ledgerIncome");
    if (incomeEl) {
      incomeEl.value = Math.round(liters * rate);
    }
  };

  window.submitNewLedgerEntry = function () {
    var date = document.getElementById("ledgerDate")?.value;
    var shift = document.getElementById("ledgerShift")?.value;
    var liters = parseFloat(document.getElementById("ledgerLiters")?.value || 0);
    var fat = parseFloat(document.getElementById("ledgerFat")?.value || 0);
    var rate = parseFloat(document.getElementById("ledgerRate")?.value || 0);
    var income = parseFloat(document.getElementById("ledgerIncome")?.value || 0);
    var expense = parseFloat(document.getElementById("ledgerExpense")?.value || 0);

    if (!liters || liters <= 0 || !rate || rate <= 0) {
      alert("कृपया दूध की मात्रा (लीटर) और भाव (₹/लीटर) अवश्य भरें!");
      return;
    }

    var newEntry = {
      id: "LEDGER_" + Date.now(),
      date: date,
      shift: shift,
      liters: liters,
      fat: fat,
      rate: rate,
      income: income,
      expense: expense
    };

    var records = window.getMilkLedgerRecords();
    records.push(newEntry);
    window.saveMilkLedgerRecords(records);

    // Reset inputs
    document.getElementById("ledgerLiters").value = "";
    document.getElementById("ledgerIncome").value = "";
    document.getElementById("ledgerExpense").value = "";

    window.renderMilkLedger();
  };

  window.deleteLedgerRecord = function (id) {
    if (!confirm("क्या आप इस प्रविष्टि को हटाना चाहते हैं?")) return;
    var records = window.getMilkLedgerRecords().filter(function (r) { return r.id !== id; });
    window.saveMilkLedgerRecords(records);
    window.renderMilkLedger();
  };

  window.clearEntireLedger = function () {
    if (!confirm("⚠️ क्या आप पूरा बहीखाता मिटाना चाहते हैं? यह क्रिया पूर्ववत नहीं होगी।")) return;
    localStorage.removeItem("vetcare_milk_ledger");
    window.renderMilkLedger();
  };

  window.exportLedgerWhatsAppSummary = function () {
    var records = window.getMilkLedgerRecords();
    if (records.length === 0) {
      alert("शेयर करने के लिए कोई रिकॉर्ड उपलब्ध नहीं है।");
      return;
    }

    var totalL = 0, totalInc = 0, totalExp = 0;
    records.forEach(function (r) {
      totalL += Number(r.liters || 0);
      totalInc += Number(r.income || 0);
      totalExp += Number(r.expense || 0);
    });

    var text =
      "📊 *मेरी डेयरी खाता-बही रिपोर्ट (Vetcare AI OS)* 🥛\n\n" +
      "📅 कुल दर्ज दिन: " + records.length + " प्रविष्टियां\n" +
      "🥛 कुल दूध उत्पादन: " + totalL.toFixed(1) + " लीटर\n" +
      "💰 कुल दूध बिक्री आय: ₹" + totalInc.toFixed(0) + "\n" +
      "🌾 कुल दाना-चारा खर्च: ₹" + totalExp.toFixed(0) + "\n" +
      "✨ *शुद्ध डेयरी लाभ: ₹" + (totalInc - totalExp).toFixed(0) + "*\n\n" +
      "सत्यापित डेयरी रिपोर्ट • Vetcare AI OS";

    var url = "https://wa.me/?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
  };

  // ==========================================================================
  // 5. CENTRAL SERVICES LAUNCHER & TAB CONTROLLER
  // ==========================================================================
  window.renderFarmerServicesLauncher = function () {
    var container = document.getElementById("services-launcher-container");
    if (!container) return;

    var html = `
      <div class="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-3xl p-4 sm:p-5 shadow-md mb-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🌾</span>
            <div>
              <h2 class="text-sm sm:text-base font-black">स्मार्ट पशुपालक सेवा केंद्र (Services Launcher)</h2>
              <p class="text-[11px] text-emerald-200">देसी उपचार, सीमन बुल डायरेक्टरी, सरकारी योजनाएं व डेयरी हिसाब</p>
            </div>
          </div>
          <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">1-क्लिक एक्सेस</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <button onclick="window.openFarmerService('repeat_breeder')" class="bg-white/10 hover:bg-white/20 p-2.5 rounded-2xl border border-white/10 transition active:scale-95 space-y-1">
            <span class="text-xl block">🔄</span>
            <span class="font-bold block text-[11px]">रिपीट ब्रीडर हल</span>
          </button>
          <button onclick="window.openFarmerService('diseases')" class="bg-white/10 hover:bg-white/20 p-2.5 rounded-2xl border border-white/10 transition active:scale-95 space-y-1">
            <span class="text-xl block">🌿</span>
            <span class="font-bold block text-[11px]">25+ देसी नुस्खे</span>
          </button>
          <button onclick="window.openFarmerService('bulls')" class="bg-white/10 hover:bg-white/20 p-2.5 rounded-2xl border border-white/10 transition active:scale-95 space-y-1">
            <span class="text-xl block">🐂</span>
            <span class="font-bold block text-[11px]">बुल व सीमन बैंक</span>
          </button>
          <button onclick="window.openFarmerService('schemes')" class="bg-white/10 hover:bg-white/20 p-2.5 rounded-2xl border border-white/10 transition active:scale-95 space-y-1">
            <span class="text-xl block">🏛️</span>
            <span class="font-bold block text-[11px]">सरकारी योजनाएं</span>
          </button>
          <button onclick="window.openFarmerService('ledger')" class="bg-white/10 hover:bg-white/20 p-2.5 rounded-2xl border border-white/10 transition active:scale-95 space-y-1">
            <span class="text-xl block">🥛</span>
            <span class="font-bold block text-[11px]">खाता बही (दूध)</span>
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  };

  window.openFarmerService = function (serviceId) {
    if (typeof window.switchTab === "function") {
      if (serviceId === "repeat_breeder") {
        window.switchTab("breeding");
        window.renderRepeatBreederGuide();
      } else if (serviceId === "diseases") {
        window.switchTab("feed"); // or helpdesk tab
        window.renderFarmerDiseases();
      } else if (serviceId === "bulls") {
        window.switchTab("breeding");
        if (typeof window.renderBullDirectory === "function") {
          window.renderBullDirectory();
        }
      } else if (serviceId === "schemes") {
        if (typeof window.renderGovtSchemes === "function") {
          window.renderGovtSchemes();
        }
      } else if (serviceId === "ledger") {
        window.switchTab("finance");
        window.renderMilkLedger();
      }
    }
  };

  // Safe HTML Escaping
  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Auto-Initialization Observer
  function autoInitFarmerEngine() {
    window.renderRepeatBreederGuide();
    window.renderFarmerDiseases();
    window.renderMilkLedger();
    window.renderFarmerServicesLauncher();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInitFarmerEngine);
  } else {
    autoInitFarmerEngine();
  }

})();
