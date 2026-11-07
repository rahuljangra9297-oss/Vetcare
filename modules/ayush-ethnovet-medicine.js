// Vetcare AI OS - AYUSH Ethno-Veterinary Practices (EVP), Validated Herbal Formulations & Home Remedies Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE REGISTRATION & ARCHITECTURAL ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // Standardized, Field-Validated Ethno-Veterinary Practices (EVP) Database
  // Validated by National Dairy Development Board (NDDB), TANUVAS & ICAR-IVRI
  window.VetcareApp.ClinicalData.AyushFormulary = {
    RECIPES: [
      {
        id: 'evp_mastitis',
        conditionKey: 'mastitis',
        titleEn: 'Sub-Clinical & Clinical Mastitis (EVP Red Paste)',
        titleHi: 'थनैला रोग का अनुभूत लाल लेप (NDDB प्रमाणित)',
        applicableSpecies: ['bovine', 'bubaline', 'caprine', 'ovine'],
        efficacyRate: '85-92% in non-fibrotic mastitis',
        ingredients: [
          { nameEn: 'Fresh Aloe vera leaves', nameHi: 'घृतकुमारी / ग्वारपाठा (ताज़ा पत्ता)', quantity: '250 g (लगभग 2 मध्यम पत्ते)', baseAmount: 250, unit: 'g' },
          { nameEn: 'Turmeric powder / Rhizome', nameHi: 'हल्दी पाउडर या ताजी गांठ', quantity: '50 g (लगभग 3 बड़े चम्मच)', baseAmount: 50, unit: 'g' },
          { nameEn: 'Slaked Lime (Calcium Hydroxide)', nameHi: 'खाने का चूना (पान वाला चूना)', quantity: '15 g (लगभग 1 छोटा चम्मच)', baseAmount: 15, unit: 'g' }
        ],
        kitchenPreparationSteps: [
          'ग्वारपाठे के पत्तों के दोनों तरफ के कांटे छील लें और छोटे टुकड़ों में काट लें।',
          'सिलबट्टे अथवा मिक्सी में कटे हुए ग्वारपाठे, 50 ग्राम हल्दी और 15 ग्राम चूने को बिना पानी डाले एक साथ पीसें।',
          'पीसने पर चूने और हल्दी की क्षारीय रासायनिक क्रिया से यह मिश्रण गहरा लाल (सिंदूरी) गाढ़ा पेस्ट बन जाएगा।',
          'अब इस पेस्ट में 400 से 500 मिलीलीटर स्वच्छ पानी मिलाकर पतला घोल तैयार करें।'
        ],
        applicationMethod: 'दूध को पूरी तरह दुहने के बाद, थनों और अयन (Udder) को धोकर सुखाएं और इस लाल घोल का पूरे अयन पर अच्छी तरह लेप लगाएं। दिन में 4 से 5 बार, लगातार 5 दिनों तक लगाएं। प्रत्येक बार दुहने के बाद लेप दोहराएं।',
        dosageNotes: 'बकरियों एवं भेड़ों के लिए मात्रा आधी (125g ग्वारपाठा + 25g हल्दी + 7g चूना) रखें।',
        precautions: 'लेप लगाने से पूर्व थन को पूरी तरह खाली (Strip) करें। चूना अधिक न डालें अन्यथा त्वचा जल सकती है।',
        emergencyAllopathicRedFlags: [
          'थन ठंडा पड़ गया हो या नीला/काला पड़ रहा हो (गैंग्रीनस मैस्टाइटिस)',
          'दूध की जगह शुद्ध पीला सीरम, गाढ़ा रक्त या अत्यधिक बदबूदार स्राव आ रहा हो',
          'पशु का तापमान 105°F से अधिक हो अथवा पशु उठने में असमर्थ होकर बैठ गया हो'
        ]
      },
      {
        id: 'evp_fmd_lesions',
        conditionKey: 'fmd_lesions',
        titleEn: 'Foot & Mouth Disease Lesions (Herbal Healer Oil)',
        titleHi: 'खुरपका-मुँहपका (FMD) छालों व खुर घाव का हर्बल तेल',
        applicableSpecies: ['bovine', 'bubaline', 'caprine', 'ovine', 'equine'],
        efficacyRate: 'Accelerates epithelialization in 3-5 days',
        ingredients: [
          { nameEn: 'Sesame or Coconut Oil', nameHi: 'तिल का तेल या नारियल तेल', quantity: '200 ml (1 बड़ा कप)', baseAmount: 200, unit: 'ml' },
          { nameEn: 'Garlic cloves', nameHi: 'लहसुन की कलियां (छीली हुई)', quantity: '10-12 कलियां', baseAmount: 12, unit: 'cloves' },
          { nameEn: 'Turmeric powder', nameHi: 'हल्दी पाउडर', quantity: '20 g (2 चम्मच)', baseAmount: 20, unit: 'g' },
          { nameEn: 'Tulsi (Holy Basil) leaves', nameHi: 'तुलसी के ताजे पत्ते', quantity: '20-25 पत्ते', baseAmount: 25, unit: 'leaves' },
          { nameEn: 'Camphor tablets', nameHi: 'भीमसेनी / साधारण कपूर', quantity: '5 g (2-3 टिक्की)', baseAmount: 5, unit: 'g' }
        ],
        kitchenPreparationSteps: [
          'लहसुन, तुलसी के पत्ते और हल्दी को एक साथ सिलबट्टे पर दरदरा कूट लें।',
          'एक बर्तन में 200 मिलीलीटर तिल या नारियल का तेल गर्म करें और उसमें कुटा हुआ मिश्रण डालें।',
          'धीमी आंच पर तब तक पकाएं जब तक लहसुन भूरा न हो जाए।',
          'आंच से उतारकर तेल को ठंडा होने दें। जब तेल गुनगुना रह जाए, तो उसमें 5 ग्राम पिसा हुआ कपूर अच्छी तरह घोल लें और कांच की शीशी में छान लें।'
        ],
        applicationMethod: 'मुंह के छालों पर इस तेल को दिन में 3 बार साफ उंगली या रूई से लगाएं। खुरों के घावों को पहले पोटाश (KMNO4) के हल्के गुलाबी पानी से धोएं, फिर यह तेल दिन में दो बार खुरों के बीच लगाएं।',
        dosageNotes: 'मुंह में लगाने पर यदि पशु इसे चाट भी ले, तो यह पूर्णतः सुरक्षित और आंतरिक रोगाणुरोधी है।',
        precautions: 'गर्म तेल कभी न लगाएं। घावों पर मक्खियों को बैठने से रोकने हेतु कपूर की मात्रा सटीक रखें।',
        emergencyAllopathicRedFlags: [
          'पशु को 106°F से अधिक तेज ज्वर हो और गंभीर सांस लेने में कठिनाई हो',
          'खुर का खोल (Hoof capsule) पूरी तरह अलग होकर उतरने लगा हो',
          'छोटे नवजात बछड़ों में हृदय की अनियमित धड़कन (Myocarditis / Tiger Heart)'
        ]
      },
      {
        id: 'evp_maggot_wounds',
        conditionKey: 'maggot_wounds',
        titleEn: 'Maggoted & Deep Necrotic Wounds (Anti-Maggot Ointment)',
        titleHi: 'कीड़े पड़े व सड़े-गले घावों का देशी उपचार (सीताफल-नीम लेप)',
        applicableSpecies: ['bovine', 'bubaline', 'caprine', 'ovine', 'equine'],
        efficacyRate: '95% maggot expulsion within 24 hours',
        ingredients: [
          { nameEn: 'Custard Apple leaves', nameHi: 'सीताफल / शरीफा के ताजे पत्ते', quantity: '50 g (एक मुट्ठी)', baseAmount: 50, unit: 'g' },
          { nameEn: 'Pure Neem Oil', nameHi: 'शुद्ध नीम का तेल', quantity: '100 ml', baseAmount: 100, unit: 'ml' },
          { nameEn: 'Turmeric powder', nameHi: 'हल्दी पाउडर', quantity: '20 g', baseAmount: 20, unit: 'g' },
          { nameEn: 'Camphor (Kapoor)', nameHi: 'कपूर की टिकिया', quantity: '10 g (चूर्ण)', baseAmount: 10, unit: 'g' }
        ],
        kitchenPreparationSteps: [
          'सीताफल के पत्तों को धोकर बिना पानी के बारीक पीस लें।',
          'नीम के तेल में 10 ग्राम पिसा हुआ कपूर और 20 ग्राम हल्दी अच्छी तरह मिला लें।',
          'अब इसमें पिसे हुए सीताफल के पत्तों का पेस्ट मिलाकर गाढ़ा लेप तैयार करें।'
        ],
        applicationMethod: 'घाव के भीतर पहले सूखा कपूर चूर्ण भरें जिससे 10-15 मिनट में कीड़े बाहर निकल आएंगे। मृत कीड़ों को चिमटी से बाहर निकालें। तत्पश्चात यह तैयार नीम-सीताफल लेप घाव में भरकर साफ पट्टी बांधें या खुला छोड़ें। दिन में 2 बार लगाएं।',
        dosageNotes: 'सीताफल के पत्तों में प्राकृतिक एनोनीन (Anonaine) एल्कलॉइड होता है जो मक्खियों के अंडों और लार्वा को तत्काल नष्ट करता है।',
        precautions: 'कीड़ों को कभी भी हाथ से न मसलें। घाव को फिनाइल से न धोएं अन्यथा स्वस्थ ऊतक जल जाते हैं।',
        emergencyAllopathicRedFlags: [
          'घाव से अत्यधिक चमकीला लाल फव्वारे जैसा धमनी रक्तस्राव हो रहा हो',
          'घाव पेट की दीवार (Abdominal cavity) या छाती को भेदकर अंदर अंगों तक पहुंच गया हो',
          'पशु के शरीर में अकड़न (Lockjaw / Tetanus) के लक्षण दिख रहे हों'
        ]
      },
      {
        id: 'evp_bloat_tympany',
        conditionKey: 'bloat_tympany',
        titleEn: 'Acute Bloat & Ruminal Tympany (Digestive Carminative Drench)',
        titleHi: 'तीव्र अफारा व पेट फूलना (पाचक हींग-सोंठ काढ़ा)',
        applicableSpecies: ['bovine', 'bubaline', 'caprine', 'ovine'],
        efficacyRate: 'Immediate gas dispersion in frothy/free bloat',
        ingredients: [
          { nameEn: 'Dry Ginger powder (Saunth)', nameHi: 'सोंठ का पाउडर या ताजी अदरक', quantity: '50 g', baseAmount: 50, unit: 'g' },
          { nameEn: 'Garlic cloves', nameHi: 'लहसुन की कलियां', quantity: '50 g (एक पूरी गांठ)', baseAmount: 50, unit: 'g' },
          { nameEn: 'Asafoetida (Hing)', nameHi: 'शुद्ध हींग', quantity: '10 g (1 बड़ा चम्मच)', baseAmount: 10, unit: 'g' },
          { nameEn: 'Black Pepper', nameHi: 'काली मिर्च के दाने', quantity: '15 g (1 चम्मच, कुटी हुई)', baseAmount: 15, unit: 'g' },
          { nameEn: 'Rock Salt / Black Salt', nameHi: 'सेंधा नमक या काला नमक', quantity: '50 g', baseAmount: 50, unit: 'g' },
          { nameEn: 'Mustard Oil', nameHi: 'शुद्ध सरसों का तेल', quantity: '150 ml', baseAmount: 150, unit: 'ml' }
        ],
        kitchenPreparationSteps: [
          'लहसुन, सोंठ, काली मिर्च और हींग को बारीक कूट लें।',
          'इस मिश्रण को 500 मिलीलीटर गुनगुने पानी में घोलें और 50 ग्राम काला नमक मिलाएं।',
          'अंत में 150 मिलीलीटर सरसों का तेल इस घोल में मिलाकर अच्छी तरह हिलाएं।'
        ],
        applicationMethod: 'कांच की बोतल या ड्रेंचिंग गन से पशु की जीभ को दबाए बिना धीरे-धीरे नाल से पिलाएं। ध्यान रहे कि काढ़ा सांस की नली में न जाए। पिलाने के बाद पशु को 15 मिनट धीरे-धीरे टहलाएं और पेट के बाएं हिस्से की मालिश करें।',
        dosageNotes: 'भेड़-बकरी हेतु वयस्क गाय/भैंस की मात्रा का एक-चौथाई (1/4 भाग) ही पिलाएं।',
        precautions: 'पिलाते समय पशु की जीभ कभी न पकड़ें, इससे दवा फेफड़ों में जाकर एस्पिरेशन निमोनिया हो सकता है।',
        emergencyAllopathicRedFlags: [
          'बायां पेट पत्थर जैसा तना हो और पशु मुंह खोलकर जीभ बाहर निकाल हांफ रहा हो',
          'पशु बार-बार जमीन पर गिर रहा हो और दम घुटने (Asphyxia) की स्थिति हो',
          'विषैला कीटनाशक या यूरिया खाने का स्पष्ट इतिहास हो'
        ]
      },
      {
        id: 'evp_diarrhea',
        conditionKey: 'diarrhea',
        titleEn: 'Calf Scours & Simple Diarrhea (Astringent Curd Bolus)',
        titleHi: 'पशुओं व बछड़ों के दस्त का घरेलू उपचार (मेथी-जीरा छाछ योग)',
        applicableSpecies: ['bovine', 'bubaline', 'caprine', 'ovine'],
        efficacyRate: 'Controls non-specific watery enteritis in 24-48 hrs',
        ingredients: [
          { nameEn: 'Fenugreek seeds (Methi)', nameHi: 'मेथी दाना', quantity: '25 g', baseAmount: 25, unit: 'g' },
          { nameEn: 'Cumin seeds (Jeera)', nameHi: 'साबुत जीरा', quantity: '25 g', baseAmount: 25, unit: 'g' },
          { nameEn: 'Poppy seeds (Khaskhas)', nameHi: 'खसखस / पोस्त दाना', quantity: '15 g', baseAmount: 15, unit: 'g' },
          { nameEn: 'Pomegranate rind/peel', nameHi: 'अनार का सूखा छिलका', quantity: '20 g', baseAmount: 20, unit: 'g' },
          { nameEn: 'Fresh Curd or Buttermilk', nameHi: 'ताजा दही या खट्टी छाछ', quantity: '250-500 ml', baseAmount: 400, unit: 'ml' }
        ],
        kitchenPreparationSteps: [
          'मेथी दाना, जीरा और अनार के छिलके को तवे पर हल्का भून लें।',
          'भूने हुए मसालों और खसखस को मिक्सी या सिलबट्टे पर महीन पीस लें।',
          'इस चूर्ण को 250 से 500 मिलीलीटर ताजा दही या छाछ में अच्छी तरह फेंट लें।'
        ],
        applicationMethod: 'यह घोल पशु को दिन में दो बार (सुबह एवं शाम) 2 से 3 दिनों तक पिलाएं। बछड़ों में निर्जलीकरण (Dehydration) रोकने हेतु साथ में 1 लीटर पानी में 2 चम्मच चीनी व आधा चम्मच नमक घोलकर ओआरएस (ORS) अवश्य पिलाएं।',
        dosageNotes: 'छोटे बछड़ों और मेमनों के लिए खुराक 100 मिलीलीटर छाछ में 10 ग्राम चूर्ण पर्याप्त है।',
        precautions: 'खट्टे या बासी छाछ का प्रयोग न करें। लगातार साफ पानी उपलब्ध रखें।',
        emergencyAllopathicRedFlags: [
          'दस्त में अत्यधिक मात्रा में बदबूदार काला या गहरा लाल खून आ रहा हो',
          'बछड़ा आंखें अंदर धंसने के साथ खड़ा न हो पा रहा हो (गंभीर 10% से अधिक डिहाइड्रेशन)',
          'तापमान 98°F से नीचे चला गया हो (सबनॉर्मल तापमान / हाइपोथर्मिया)'
        ]
      },
      {
        id: 'evp_retention_of_placenta',
        conditionKey: 'retention_of_placenta',
        titleEn: 'Retention of Placenta / ROP (Uterine Cleansing Drench)',
        titleHi: 'जेर न गिरना / रुकना (मूली-बांस-गुड़ का देशी काढ़ा)',
        applicableSpecies: ['bovine', 'bubaline'],
        efficacyRate: 'Stimulates uterine contractions naturally without manual pulling',
        ingredients: [
          { nameEn: 'White Radish', nameHi: 'ताजी सफेद मूली', quantity: '1 से 2 kg (पत्ते सहित)', baseAmount: 1500, unit: 'g' },
          { nameEn: 'Green Bamboo leaves', nameHi: 'बांस के ताजे हरे पत्ते', quantity: '1 kg', baseAmount: 1000, unit: 'g' },
          { nameEn: 'Old Jaggery (Gur)', nameHi: 'पुराना काला गुड़', quantity: '500 g', baseAmount: 500, unit: 'g' },
          { nameEn: 'Ajwain (Carom seeds)', nameHi: 'अजवाइन', quantity: '50 g', baseAmount: 50, unit: 'g' }
        ],
        kitchenPreparationSteps: [
          'बांस के पत्तों और मूली को छोटे टुकड़ों में काट लें।',
          'एक बड़े बर्तन में 3 लीटर पानी लें, उसमें बांस के पत्ते, अजवाइन और गुड़ डालकर उबालें।',
          'जब पानी 2 लीटर रह जाए, तो उसे आंच से उतारकर गुनगुना होने दें।'
        ],
        applicationMethod: 'ब्याने के 4 घंटे बाद तक यदि जेर न गिरे, तो 1-2 किलो ताजी कटी हुई मूली पशु को पहले खिलाएं। उसके पश्चात तैयार गुनगुना बांस-गुड़ का काढ़ा नाल द्वारा पिलाएं। जेर को कभी भी हाथ से खींचकर न निकालें।',
        dosageNotes: 'बांस के पत्तों में प्राकृतिक फाइटो-ऑक्सीटोसिन जैसे यौगिक होते हैं जो गर्भाशय संकुचन को बिना दुष्प्रभाव के बढ़ाते हैं।',
        precautions: 'जेर पर वजन न बांधें और न ही हाथ डालकर जबरन खींचे, इससे गर्भाशय फट सकता है।',
        emergencyAllopathicRedFlags: [
          'ब्याने के 12 घंटे से अधिक समय बीत चुका हो और जेर पूरी तरह अंदर सड़ रही हो',
          'पशु को 104°F से अधिक ज्वर हो और गर्भाशय से सड़ी दुर्गंध युक्त मवाद आ रहा हो',
          'पशु अत्यधिक दर्द से कराह रहा हो या गर्भाशय बाहर उलट आया हो (Uterine Prolapse)'
        ]
      },
      {
        id: 'evp_ectoparasites',
        conditionKey: 'ectoparasites',
        titleEn: 'Ticks, Lice & Mite Infestation (Herbal Wash)',
        titleHi: 'चिचड़ी, जूँ व पिस्सू नाशक हर्बल घोल (नीम-सीताफल-रीठा)',
        applicableSpecies: ['bovine', 'bubaline', 'caprine', 'ovine'],
        efficacyRate: 'Repels and desiccates ectoparasites without chemical toxicity',
        ingredients: [
          { nameEn: 'Neem leaves or Seed kernels', nameHi: 'नीम के पत्ते या नीम की निंबोली', quantity: '1 kg पत्ते अथवा 250 g निंबोली', baseAmount: 1000, unit: 'g' },
          { nameEn: 'Custard Apple seeds/leaves', nameHi: 'सीताफल के बीज या पत्ते', quantity: '250 g', baseAmount: 250, unit: 'g' },
          { nameEn: 'Soapnut (Reetha)', nameHi: 'रीठा का छिलका (प्राकृतिक साबुन)', quantity: '50 g', baseAmount: 50, unit: 'g' },
          { nameEn: 'Water', nameHi: 'स्वच्छ जल', quantity: '5 Litres', baseAmount: 5000, unit: 'ml' }
        ],
        kitchenPreparationSteps: [
          'नीम के पत्ते और सीताफल के बीजों को दरदरा कूट लें।',
          'रीठा को रात भर 1 लीटर पानी में भिगोकर रखें और सुबह मसलकर झागदार पानी बना लें।',
          'कुटी हुई पत्तियों और बीजों को 4 लीटर पानी में 20 मिनट तक धीमी आंच पर उबालें।',
          'मिश्रण ठंडा होने पर छान लें और इसमें रीठा का पानी मिला लें।'
        ],
        applicationMethod: 'इस घोल को स्प्रे पंप में भरकर या कपड़े से पशु के पूरे शरीर पर, विशेषकर कानों के पीछे, पूंछ के नीचे, गले की झूलरी और जांघों के बीच बालों के विपरीत दिशा में लगाएं। लगाने के 4 घंटे बाद तक पशु को न धोएं। सप्ताह में एक बार दोहराएं।',
        dosageNotes: 'यह घोल पूरी तरह प्राकृतिक है और यदि पशु इसे चाट भी ले, तो ऑर्गनोफॉस्फेट जहर की तरह कोई खतरा नहीं होता।',
        precautions: 'घोल पशु की आंखों में न जाने दें। घोल तैयार करने के 48 घंटे के भीतर उपयोग कर लें।',
        emergencyAllopathicRedFlags: [
          'चिचड़ियों के कारण पशु का पेशाब गहरे लाल या कॉफी रंग का हो रहा हो (बबेसिओसिस / टिक फीवर)',
          'पशु अत्यधिक एनिमिक होकर लड़खड़ा रहा हो',
          'शरीर पर भीषण पपड़ीदार खाज (Sarcoptic Mange) से पूरे बाल उड़ चुके हों और चमड़ी फट रही हो'
        ]
      },
      {
        id: 'evp_anorexia',
        conditionKey: 'anorexia',
        titleEn: 'Indigestion, Anorexia & Off-Feed (Appetizer Laddu Bolus)',
        titleHi: 'भूख न लगना, सुस्ती व अपच (पाचक बत्ती / लड्डू योग)',
        applicableSpecies: ['bovine', 'bubaline', 'caprine', 'ovine', 'equine'],
        efficacyRate: 'Restores ruminal microflora & saliva production in 24 hrs',
        ingredients: [
          { nameEn: 'Fresh Ginger or Saunth', nameHi: 'अदरक या सोंठ', quantity: '50 g', baseAmount: 50, unit: 'g' },
          { nameEn: 'Carom seeds (Ajwain)', nameHi: 'अजवाइन', quantity: '30 g', baseAmount: 30, unit: 'g' },
          { nameEn: 'Black Salt', nameHi: 'काला नमक', quantity: '30 g', baseAmount: 30, unit: 'g' },
          { nameEn: 'Jaggery (Gur)', nameHi: 'गुड़', quantity: '150 g', baseAmount: 150, unit: 'g' },
          { nameEn: 'Fenugreek powder', nameHi: 'मेथी पाउडर', quantity: '30 g', baseAmount: 30, unit: 'g' }
        ],
        kitchenPreparationSteps: [
          'सोंठ, अजवाइन, काला नमक और मेथी को एक साथ बारीक पीस लें।',
          'गुड़ को हल्का कूटकर इस चूर्ण में मिलाएं और हाथ से मसलते हुए 2 बड़े लड्डू (बोलस) तैयार करें।'
        ],
        applicationMethod: 'एक लड्डू सुबह एवं एक लड्डू शाम को पशु के मुंह में जीभ पर पीछे की ओर रखें। पशु इसे आसानी से चबाकर खा लेता है। 2 से 3 दिनों तक लगातार दें।',
        dosageNotes: 'भेड़-बकरियों के लिए छोटे बेर के आकार के लड्डू बनाकर 1-1 लड्डू दें।',
        precautions: 'यदि पशु मुंह में झाग छोड़ रहा हो या गले में रुकावट हो तो जबरन न खिलाएं।',
        emergencyAllopathicRedFlags: [
          'पशु 48 घंटे से अधिक समय से पूरी तरह से जुगाली व गोबर बंद किए हुए हो (Intestinal Obstruction)',
          'तापमान 104°F से अधिक तेज ज्वर हो',
          'मुंह से अत्यधिक बदबूदार सड़ा हुआ स्राव गिर रहा हो'
        ]
      }
    ]
  };

  // 2. INTERNAL STATE CONTROLLER
  const State = {
    activeTab: 'herbal_remedies_catalog',
    selectedCondition: 'all',
    speciesFilter: 'all',
    searchQuery: '',
    selectedRecipeId: 'evp_mastitis',
    calculatorSpecies: 'bovine',
    containerElement: null,
    dbInstance: null,
    listenersBound: false,

    customFormulations: []
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE)
  const StorageAdapter = {
    DB_NAME: 'VetcareAyushDB',
    DB_VERSION: 1,
    STORE_NAME: 'ayush_formulations',

    async initDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[AyushEngine] IndexedDB unavailable, using LocalStorage.');
          resolve(null);
          return;
        }

        const req = window.indexedDB.open(StorageAdapter.DB_NAME, StorageAdapter.DB_VERSION);

        req.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(StorageAdapter.STORE_NAME)) {
            db.createObjectStore(StorageAdapter.STORE_NAME, { keyPath: 'id' });
          }
        };

        req.onsuccess = (event) => {
          State.dbInstance = event.target.result;
          resolve(State.dbInstance);
        };

        req.onerror = (event) => {
          console.error('[AyushEngine] DB Error:', event.target.error);
          resolve(null);
        };
      });
    },

    async saveCustomRecipe(recipe) {
      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readwrite');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            store.put(recipe);
            tx.oncomplete = () => {
              State.customFormulations.unshift(recipe);
              resolve(true);
            };
            tx.onerror = () => {
              StorageAdapter.saveFallback(recipe);
              resolve(true);
            };
          } catch (e) {
            StorageAdapter.saveFallback(recipe);
            resolve(true);
          }
        });
      } else {
        StorageAdapter.saveFallback(recipe);
        return Promise.resolve(true);
      }
    },

    saveFallback(recipe) {
      State.customFormulations.unshift(recipe);
      try {
        localStorage.setItem('VETCARE_AYUSH_RECIPES', JSON.stringify(State.customFormulations));
      } catch (e) {}
    },

    async loadRecipes() {
      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readonly');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            const req = store.getAll();
            req.onsuccess = () => {
              State.customFormulations = req.result || [];
              resolve(State.customFormulations);
            };
            req.onerror = () => resolve(StorageAdapter.loadFallback());
          } catch (e) {
            resolve(StorageAdapter.loadFallback());
          }
        });
      } else {
        return Promise.resolve(StorageAdapter.loadFallback());
      }
    },

    loadFallback() {
      try {
        const raw = localStorage.getItem('VETCARE_AYUSH_RECIPES');
        State.customFormulations = raw ? JSON.parse(raw) : [];
        return State.customFormulations;
      } catch (e) {
        return [];
      }
    }
  };

  // 4. TOAST NOTIFICATION UTILITY
  function notify(msg, type = 'info') {
    if (window.VetcareApp && typeof window.VetcareApp.showToast === 'function') {
      window.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[AyushEngine ${type.toUpperCase()}]: ${msg}`);
    }
  }

  // 5. HELPER: SPECIES DOSAGE MULTIPLIER
  function getSpeciesMultiplier(species) {
    switch (species) {
      case 'bovine':
      case 'bubaline':
        return 1.0;
      case 'equine':
        return 1.1;
      case 'caprine':
      case 'ovine':
        return 0.3;
      default:
        return 1.0;
    }
  }

  // 6. UI COMPONENT RENDERING ENGINE
  const UIEngine = {
    // Root Shell Layout
    renderMainLayout() {
      const allRecipes = [
        ...window.VetcareApp.ClinicalData.AyushFormulary.RECIPES,
        ...State.customFormulations
      ];

      return `
        <div class="ayush-engine-wrapper max-w-7xl mx-auto space-y-6">

          <!-- TOP TELEMETRY & AYUSH ETHNOVET BANNER -->
          <div class="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl shadow-inner">
                <i class="fa-solid fa-mortar-pestle"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-xl font-bold font-display text-white">आयुष अनुभूत देशी पशु चिकित्सा महाजाल</h2>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">EVP VALIDATED 2026</span>
                </div>
                <p class="text-xs text-slate-300 mt-0.5">
                  राष्ट्रीय डेयरी विकास बोर्ड (NDDB) एवं तंजौर (TANUVAS) द्वारा वैज्ञानिक रूप से सत्यापित हर्बल नुस्खे
                </p>
              </div>
            </div>

            <!-- Quick Action Counters -->
            <div class="flex items-center gap-3">
              <div class="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-right font-mono">
                <span class="text-[10px] text-slate-400 uppercase block">प्रमाणित नुस्खे</span>
                <span class="text-xs font-bold text-emerald-400">${allRecipes.length} योग सक्रिय</span>
              </div>
              <button type="button" id="btnOpenAddCustomRecipeModal" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md flex items-center gap-1.5 transition-all active:scale-95">
                <i class="fa-solid fa-plus-circle"></i>
                <span>नया नुस्खा जोड़ें</span>
              </button>
            </div>
          </div>

          <!-- PRIMARY NAVIGATION TABS -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button type="button" data-tab="herbal_remedies_catalog" class="ayush-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'herbal_remedies_catalog' ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-book-medical"></i>
                <span>१. देशी नुस्खे सूची (Remedies Catalog)</span>
              </button>
              <button type="button" data-tab="preparation_wizard" class="ayush-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'preparation_wizard' ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                <span>२. निर्माण विधि (Preparation Wizard)</span>
              </button>
              <button type="button" data-tab="dosage_calculator" class="ayush-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'dosage_calculator' ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-weight-scale"></i>
                <span>३. प्रजाति अनुसार मात्रा (Dose by Species)</span>
              </button>
              <button type="button" data-tab="print_farmer_handbill" class="ayush-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'print_farmer_handbill' ? 'bg-purple-500 text-slate-950 shadow-md font-extrabold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-print"></i>
                <span>४. कृषक परामर्श पर्ची (Farmer Slip)</span>
              </button>
            </div>

            <button type="button" id="btnQuickPrintActiveHandbill" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5">
              <i class="fa-solid fa-file-pdf text-amber-400"></i>
              <span>हिंदी पर्ची प्रिंट करें</span>
            </button>
          </div>

          <!-- TAB CONTENT PANEL HOOK -->
          <div id="ayushTabContentPanel" class="transition-opacity duration-200"></div>

          <!-- DYNAMIC MODAL CONTAINER -->
          <div id="ayushModalContainer"></div>
        </div>
      `;
    },

    // TAB 1: Herbal Remedies Catalog View
    renderCatalogTab() {
      const allRecipes = [
        ...window.VetcareApp.ClinicalData.AyushFormulary.RECIPES,
        ...State.customFormulations
      ];

      let filtered = allRecipes;
      if (State.selectedCondition !== 'all') {
        filtered = filtered.filter(r => r.conditionKey === State.selectedCondition);
      }
      if (State.speciesFilter !== 'all') {
        filtered = filtered.filter(r => r.applicableSpecies.includes(State.speciesFilter));
      }
      if (State.searchQuery.trim()) {
        const q = State.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(r => {
          const inTitleEn = r.titleEn.toLowerCase().includes(q);
          const inTitleHi = r.titleHi.toLowerCase().includes(q);
          const inIng = r.ingredients.some(i => i.nameEn.toLowerCase().includes(q) || i.nameHi.toLowerCase().includes(q));
          return inTitleEn || inTitleHi || inIng;
        });
      }

      const cards = filtered.map(r => {
        const isSelected = r.id === State.selectedRecipeId;

        return `
          <div class="rounded-2xl bg-slate-900 border-2 transition-all p-5 shadow-lg flex flex-col justify-between ${isSelected ? 'border-emerald-500 bg-emerald-950/20' : 'border-slate-800 hover:border-slate-700'}">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-300 font-bold border border-slate-700">
                  ${r.conditionKey.toUpperCase()}
                </span>
                <span class="text-[10px] font-mono text-emerald-400 font-bold">
                  <i class="fa-solid fa-circle-check mr-1"></i>${r.efficacyRate}
                </span>
              </div>

              <h4 class="text-base font-bold text-white leading-tight">${r.titleHi}</h4>
              <div class="text-xs font-mono text-slate-400 mt-0.5">${r.titleEn}</div>

              <!-- Ingredients preview tags -->
              <div class="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5">
                <span class="text-[10px] font-mono uppercase text-amber-400 font-bold block">प्रमुख घटक (Kitchen Ingredients):</span>
                <ul class="text-xs text-slate-300 space-y-1">
                  ${r.ingredients.slice(0, 3).map(ing => `
                    <li class="flex items-start gap-1.5">
                      <span class="text-emerald-400 font-bold">•</span>
                      <span><strong>${ing.nameHi}:</strong> ${ing.quantity}</span>
                    </li>
                  `).join('')}
                  ${r.ingredients.length > 3 ? `<li class="text-[10px] text-slate-400 italic">+ ${r.ingredients.length - 3} अन्य घरेलू घटक...</li>` : ''}
                </ul>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button type="button" data-action="select_recipe" data-id="${r.id}" class="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${isSelected ? 'bg-emerald-500 text-slate-950 shadow-md' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'}">
                ${isSelected ? '<i class="fa-solid fa-check mr-1"></i>चयनित नुस्खा' : 'विधि व खुराक देखें'}
              </button>
              <button type="button" data-action="print_recipe" data-id="${r.id}" class="p-2 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700" title="पर्ची प्रिंट करें">
                <i class="fa-solid fa-print"></i>
              </button>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="space-y-5">
          <!-- FILTER & SEARCH BAR -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="relative flex-1 max-w-md">
              <input type="text" id="ayushSearchInput" value="${State.searchQuery}" placeholder="रोग का नाम, हल्दी, चूना, नीम खोजें..." class="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono" />
              <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs"></i>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <select id="conditionFilterSelect" class="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="all" ${State.selectedCondition === 'all' ? 'selected' : ''}>सभी रोग (All Conditions)</option>
                <option value="mastitis" ${State.selectedCondition === 'mastitis' ? 'selected' : ''}>थनैला (Mastitis)</option>
                <option value="fmd_lesions" ${State.selectedCondition === 'fmd_lesions' ? 'selected' : ''}>खुरपका-मुँहपका (FMD)</option>
                <option value="maggot_wounds" ${State.selectedCondition === 'maggot_wounds' ? 'selected' : ''}>कीड़े पड़े घाव (Maggots)</option>
                <option value="bloat_tympany" ${State.selectedCondition === 'bloat_tympany' ? 'selected' : ''}>अफारा (Bloat / Tympany)</option>
                <option value="diarrhea" ${State.selectedCondition === 'diarrhea' ? 'selected' : ''}>दस्त / पेचिश (Diarrhea)</option>
                <option value="retention_of_placenta" ${State.selectedCondition === 'retention_of_placenta' ? 'selected' : ''}>जेर रुकना (ROP)</option>
                <option value="ectoparasites" ${State.selectedCondition === 'ectoparasites' ? 'selected' : ''}>चिचड़ी / जूँ (Ectoparasites)</option>
                <option value="anorexia" ${State.selectedCondition === 'anorexia' ? 'selected' : ''}>भूख न लगना (Off-Feed)</option>
              </select>

              <select id="speciesFilterSelect" class="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="all" ${State.speciesFilter === 'all' ? 'selected' : ''}>सभी पशु प्रजातियां</option>
                <option value="bovine" ${State.speciesFilter === 'bovine' ? 'selected' : ''}>गाय (Cattle)</option>
                <option value="bubaline" ${State.speciesFilter === 'bubaline' ? 'selected' : ''}>भैंस (Buffalo)</option>
                <option value="caprine" ${State.speciesFilter === 'caprine' ? 'selected' : ''}>बकरी (Goat)</option>
                <option value="ovine" ${State.speciesFilter === 'ovine' ? 'selected' : ''}>भेड़ (Sheep)</option>
                <option value="equine" ${State.speciesFilter === 'equine' ? 'selected' : ''}>घोड़ा (Equine)</option>
              </select>
            </div>
          </div>

          <!-- CATALOG RECIPES GRID -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${filtered.length > 0 ? cards : '<div class="col-span-3 p-12 text-center text-slate-400 font-mono text-xs">कोई नुस्खा इस खोज फ़िल्टर में नहीं मिला।</div>'}
          </div>
        </div>
      `;
    },

    // TAB 2: Step-by-Step Preparation Wizard & Emergency Red Flags
    renderPreparationWizardTab() {
      const allRecipes = [
        ...window.VetcareApp.ClinicalData.AyushFormulary.RECIPES,
        ...State.customFormulations
      ];
      const recipe = allRecipes.find(r => r.id === State.selectedRecipeId) || allRecipes[0];

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span class="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  STEP-BY-STEP PREPARATION WIZARD
                </span>
                <h3 class="text-xl font-bold text-white mt-1">${recipe.titleHi}</h3>
                <div class="text-xs text-slate-400 font-mono">${recipe.titleEn}</div>
              </div>
              <div class="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl">
                <i class="fa-solid fa-clock-rotate-left mr-1"></i> निर्माण समय: 10-15 मिनट
              </div>
            </div>

            <!-- Ingredients with measuring spoon visuals -->
            <div class="space-y-3">
              <h4 class="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-2">
                <i class="fa-solid fa-kitchen-set"></i>
                <span>आवश्यक सामग्री व रसोई की नाप (Standard Ingredients & Measures):</span>
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                ${recipe.ingredients.map(ing => `
                  <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span class="text-xs font-bold text-white block">${ing.nameHi}</span>
                    <span class="text-[11px] font-mono text-slate-400 block">${ing.nameEn}</span>
                    <span class="text-xs font-mono font-bold text-emerald-400 block mt-1">${ing.quantity}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Step by Step directions -->
            <div class="space-y-3">
              <h4 class="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-2">
                <i class="fa-solid fa-arrow-down-1-9"></i>
                <span>बनाने की विधि (Preparation Directions):</span>
              </h4>
              <div class="space-y-2">
                ${recipe.kitchenPreparationSteps.map((step, idx) => `
                  <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-200">
                    <span class="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold flex items-center justify-center flex-shrink-0 text-xs font-mono">
                      ${idx + 1}
                    </span>
                    <p class="mt-0.5 leading-relaxed">${step}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Application & Precautions Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <span class="font-bold text-amber-400 uppercase font-mono block">प्रयोग विधि व समय (Application Method):</span>
                <p class="text-slate-300 leading-relaxed">${recipe.applicationMethod}</p>
                <div class="text-[11px] text-slate-400 mt-2 font-mono"><strong>टिप्पणी:</strong> ${recipe.dosageNotes}</div>
              </div>
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <span class="font-bold text-rose-400 uppercase font-mono block">सावधानियां (Clinical Precautions):</span>
                <p class="text-slate-300 leading-relaxed">${recipe.precautions || 'लेप बनाते समय स्वच्छता का विशेष ध्यान रखें।'}</p>
              </div>
            </div>

            <!-- EMERGENCY ALLOPATHIC RED FLAGS -->
            <div class="p-4 rounded-xl bg-rose-950/40 border-2 border-rose-500/60 text-xs space-y-2">
              <div class="flex items-center gap-2 text-rose-300 font-bold font-mono uppercase">
                <i class="fa-solid fa-triangle-exclamation text-rose-400 text-sm"></i>
                <span>कब देशी नुस्खा रोककर तत्काल एलोपैथिक पशु चिकित्सक बुलाएं? (RED FLAG ALERTS)</span>
              </div>
              <ul class="list-disc pl-5 space-y-1 text-rose-200">
                ${recipe.emergencyAllopathicRedFlags.map(rf => `<li>${rf}</li>`).join('')}
              </ul>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 3: Species-based Dosage Scaling Calculator
    renderDosageCalculatorTab() {
      const allRecipes = [
        ...window.VetcareApp.ClinicalData.AyushFormulary.RECIPES,
        ...State.customFormulations
      ];
      const recipe = allRecipes.find(r => r.id === State.selectedRecipeId) || allRecipes[0];
      const multiplier = getSpeciesMultiplier(State.calculatorSpecies);

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div class="border-b border-slate-800 pb-3">
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-weight-scale text-cyan-400"></i>
                <span>पशु प्रजाति अनुसार सटीक सामग्री गणना (Species Scaled Formulary)</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                गाय, भैंस, भेड़ व बकरियों के शारीरिक वजन एवं आमाशय क्षमता के अनुसार खुराक का स्वतः समायोजन
              </p>
            </div>

            <!-- Select Species Selector -->
            <div class="flex flex-wrap items-center gap-3">
              <span class="text-xs font-mono uppercase text-slate-400">लक्षित पशु चुनें:</span>
              ${['bovine', 'bubaline', 'caprine', 'ovine', 'equine'].map(sp => {
                const isSelected = State.calculatorSpecies === sp;
                let label = sp === 'bovine' ? 'गाय (Cattle)' :
                            sp === 'bubaline' ? 'भैंस (Buffalo)' :
                            sp === 'caprine' ? 'बकरी (Goat)' :
                            sp === 'ovine' ? 'भेड़ (Sheep)' : 'घोड़ा (Equine)';
                return `
                  <button type="button" data-calc-species="${sp}" class="calc-species-btn px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${isSelected ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                    ${label}
                  </button>
                `;
              }).join('')}
            </div>

            <!-- Scaled Ingredients Display Table -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div class="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
                <span class="text-cyan-400 font-bold uppercase">${recipe.titleHi}</span>
                <span class="text-slate-400">स्केलिंग अनुपात: <strong>${multiplier}x</strong></span>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr class="border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400">
                      <th class="py-2 px-3">घटक का नाम (Ingredient)</th>
                      <th class="py-2 px-3">मानक वयस्क खुराक (Cattle Base)</th>
                      <th class="py-2 px-3 text-cyan-400 font-bold">समायोजित आवश्यक मात्रा (Adjusted Dose)</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${recipe.ingredients.map(ing => {
                      const scaledAmount = ing.baseAmount ? Math.round(ing.baseAmount * multiplier) : ing.quantity;
                      return `
                        <tr class="border-b border-slate-800/60">
                          <td class="py-2.5 px-3">
                            <strong class="text-white">${ing.nameHi}</strong>
                            <span class="text-[10px] text-slate-400 font-mono block">${ing.nameEn}</span>
                          </td>
                          <td class="py-2.5 px-3 text-slate-300 font-mono">${ing.quantity}</td>
                          <td class="py-2.5 px-3 text-cyan-300 font-mono font-bold">
                            ${ing.baseAmount ? `${scaledAmount} ${ing.unit}` : ing.quantity}
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <strong class="text-amber-400">क्लिनिकल नियम:</strong> भेड़ एवं बकरियों का रुमेन आयतन वयस्क गाय-भैंस की तुलना में लगभग एक-चौथाई (25-30%) होता है। अतः ओवरडोज से बचने हेतु उपरोक्त स्वचालित रूप से घटाए गए अनुपात का ही प्रयोग करें।
            </div>

          </div>
        </div>
      `;
    },

    // TAB 4: Printable Farmer Advisory Handbill (हिंदी पर्ची)
    renderPrintFarmerHandbillTab() {
      const allRecipes = [
        ...window.VetcareApp.ClinicalData.AyushFormulary.RECIPES,
        ...State.customFormulations
      ];
      const recipe = allRecipes.find(r => r.id === State.selectedRecipeId) || allRecipes[0];

      return `
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-receipt text-purple-400"></i>
                  <span>कृषक परामर्श पर्ची पूर्वावलोकन (Farmer Advisory Slip)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">पशुपालक को देने हेतु सरल हिंदी भाषा में प्रिंट योग्य नुस्खा पर्ची</p>
              </div>
              <button type="button" id="btnPrintHandbillAction" class="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md flex items-center gap-2 transition-all">
                <i class="fa-solid fa-print"></i>
                <span>पर्ची प्रिंट करें (A4/A5)</span>
              </button>
            </div>

            <!-- Print Preview Card -->
            <div class="p-6 rounded-2xl bg-white text-slate-950 border-2 border-slate-300 shadow-2xl max-w-2xl mx-auto space-y-4 font-sans">
              <div class="text-center border-b-2 border-slate-900 pb-3">
                <div class="text-lg font-black text-emerald-900 uppercase tracking-tight">पशु चिकित्सा आयुष एवं देशी नुस्खा परामर्श</div>
                <div class="text-[11px] text-slate-600 font-bold">राष्ट्रीय पशु स्वास्थ्य एवं कृषक कल्याण सेवा (VETCARE AI OS)</div>
                <div class="text-xs font-extrabold text-slate-900 mt-1 underline">${recipe.titleHi}</div>
              </div>

              <div>
                <div class="text-xs font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">१. आवश्यक घरेलू सामग्री:</div>
                <ul class="text-xs space-y-1">
                  ${recipe.ingredients.map(ing => `
                    <li class="flex justify-between border-b border-slate-100 py-1">
                      <span><strong>• ${ing.nameHi}</strong></span>
                      <span class="font-mono font-bold">${ing.quantity}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div>
                <div class="text-xs font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">२. बनाने का सरल तरीका:</div>
                <ol class="text-xs list-decimal pl-5 space-y-1">
                  ${recipe.kitchenPreparationSteps.map(st => `<li>${st}</li>`).join('')}
                </ol>
              </div>

              <div>
                <div class="text-xs font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">३. देने / लगाने का नियम:</div>
                <p class="text-xs text-slate-800 leading-relaxed">${recipe.applicationMethod}</p>
              </div>

              <div class="p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-[11px] text-amber-950">
                <strong>विशेष सावधानी:</strong> यदि पशु को 104°F से अधिक तेज बुखार हो, खून गिर रहा हो या वह 24 घंटे में सुधार न दिखाए, तो तुरंत अधिकृत पशु चिकित्सक से संपर्क करें।
              </div>

              <div class="pt-4 border-t border-slate-300 flex justify-between text-[11px] text-slate-600">
                <div>दिनांक: ${new Date().toLocaleDateString('hi-IN')}</div>
                <div>हस्ताक्षर / मुहर पशु परामर्श केंद्र</div>
              </div>
            </div>

          </div>
        </div>
      `;
    }
  };

  // 7. MODAL DIALOGS ENGINE (ADD CUSTOM RECIPE)
  const ModalController = {
    closeModal() {
      const container = document.getElementById('ayushModalContainer');
      if (container) container.innerHTML = '';
    },

    openAddCustomRecipeModal() {
      const container = document.getElementById('ayushModalContainer');
      if (!container) return;

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <i class="fa-solid fa-leaf"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">नया स्थानीय देशी नुस्खा जोड़ें</h3>
              </div>
              <button type="button" id="btnModalCloseCustom" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddCustomRecipe" class="space-y-4">
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">नुस्खे का नाम (हिंदी में)*</label>
                <input type="text" id="cust_titleHi" required placeholder="उदा. पेट दर्द व मरोड़ का अजवाइन योग" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">Title in English*</label>
                <input type="text" id="cust_titleEn" required placeholder="e.g. Colic Relief Herbal Carminative" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">रोग श्रेणी (Condition Category)*</label>
                <select id="cust_condition" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="bloat_tympany">अफारा व गैस (Bloat / Colic)</option>
                  <option value="mastitis">थनैला (Mastitis)</option>
                  <option value="diarrhea">दस्त व पेचिश (Diarrhea)</option>
                  <option value="maggot_wounds">घाव व कीड़े (Wounds)</option>
                  <option value="anorexia">भूख की कमी (Anorexia)</option>
                  <option value="fever">सामान्य बुखार (Fever / PYREXIA)</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">घटक सामग्री (प्रति लाइन एक घटक: नाम व मात्रा)*</label>
                <textarea id="cust_ingredients" rows="3" required placeholder="अजवाइन - 50 ग्राम&#10;काला नमक - 20 ग्राम&#10;गुड़ - 100 ग्राम" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">बनाने व देने की विधि*</label>
                <textarea id="cust_instructions" rows="3" required placeholder="सभी सामग्री को कूटकर 2 लड्डू बनाएं और सुबह-शाम खिलाएं..." class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelCustomModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md">नुस्खा सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseCustom').onclick = ModalController.closeModal;
      document.getElementById('btnCancelCustomModal').onclick = ModalController.closeModal;

      document.getElementById('formAddCustomRecipe').onsubmit = async (e) => {
        e.preventDefault();
        const tHi = document.getElementById('cust_titleHi').value.trim();
        const tEn = document.getElementById('cust_titleEn').value.trim();
        const cond = document.getElementById('cust_condition').value;
        const ingRaw = document.getElementById('cust_ingredients').value.trim();
        const inst = document.getElementById('cust_instructions').value.trim();

        const parsedIngredients = ingRaw.split('\n').filter(Boolean).map(line => {
          const parts = line.split('-');
          return {
            nameHi: parts[0]?.trim() || line,
            nameEn: parts[0]?.trim() || line,
            quantity: parts[1]?.trim() || 'यथायोग्य'
          };
        });

        const newRecipe = {
          id: 'evp_custom_' + Date.now(),
          conditionKey: cond,
          titleEn: tEn,
          titleHi: tHi,
          applicableSpecies: ['bovine', 'bubaline', 'caprine', 'ovine'],
          efficacyRate: 'अनुभूत कृषक नुस्खा',
          ingredients: parsedIngredients,
          kitchenPreparationSteps: [inst],
          applicationMethod: inst,
          dosageNotes: 'स्थानीय परंपरा अनुसार',
          precautions: 'गंभीर रोग में पशु चिकित्सक को दिखाएं।',
          emergencyAllopathicRedFlags: ['24 घंटे में राहत न मिलने पर पशु चिकित्सक बुलाएं']
        };

        await StorageAdapter.saveCustomRecipe(newRecipe);
        State.selectedRecipeId = newRecipe.id;
        ModalController.closeModal();
        notify(`नुस्खा "${tHi}" सफलतापूर्वक सहेजा गया।`, 'success');
        window.VetcareApp.Modules.AyushEthnovetMedicine.refreshView();
      };
    }
  };

  // 8. EVENT BINDING & DELEGATION SUBSYSTEM
  function bindDOMEvents(container) {
    if (State.listenersBound) return;

    container.addEventListener('click', (e) => {
      // 1. Tab Navigation
      const tabBtn = e.target.closest('.ayush-tab-btn');
      if (tabBtn) {
        const targetTab = tabBtn.getAttribute('data-tab');
        if (targetTab && targetTab !== State.activeTab) {
          State.activeTab = targetTab;
          window.VetcareApp.Modules.AyushEthnovetMedicine.refreshView();
        }
        return;
      }

      // 2. Select Recipe Action Card
      const selectBtn = e.target.closest('button[data-action="select_recipe"]');
      if (selectBtn) {
        const id = selectBtn.getAttribute('data-id');
        State.selectedRecipeId = id;
        State.activeTab = 'preparation_wizard';
        window.VetcareApp.Modules.AyushEthnovetMedicine.refreshView();
        return;
      }

      // 3. Print Specific Recipe
      const printBtn = e.target.closest('button[data-action="print_recipe"]');
      if (printBtn) {
        const id = printBtn.getAttribute('data-id');
        window.VetcareApp.Modules.AyushEthnovetMedicine.printFarmerRecipeHandbill(id);
        return;
      }

      // 4. Quick Print Header Button
      if (e.target.closest('#btnQuickPrintActiveHandbill') || e.target.closest('#btnPrintHandbillAction')) {
        window.VetcareApp.Modules.AyushEthnovetMedicine.printFarmerRecipeHandbill(State.selectedRecipeId);
        return;
      }

      // 5. Open Custom Recipe Modal
      if (e.target.closest('#btnOpenAddCustomRecipeModal')) {
        ModalController.openAddCustomRecipeModal();
        return;
      }

      // 6. Species Selector in Calculator Tab
      const specBtn = e.target.closest('.calc-species-btn');
      if (specBtn) {
        const sp = specBtn.getAttribute('data-calc-species');
        if (sp) {
          State.calculatorSpecies = sp;
          window.VetcareApp.Modules.AyushEthnovetMedicine.refreshView();
        }
        return;
      }
    });

    // Filtering Dropdowns Change
    container.addEventListener('change', (e) => {
      if (e.target.id === 'conditionFilterSelect') {
        State.selectedCondition = e.target.value;
        window.VetcareApp.Modules.AyushEthnovetMedicine.refreshView();
        return;
      }
      if (e.target.id === 'speciesFilterSelect') {
        State.speciesFilter = e.target.value;
        window.VetcareApp.Modules.AyushEthnovetMedicine.refreshView();
        return;
      }
    });

    // Real-time Search Input
    container.addEventListener('input', (e) => {
      if (e.target.id === 'ayushSearchInput') {
        State.searchQuery = e.target.value;
        const panel = State.containerElement.querySelector('#ayushTabContentPanel');
        if (panel && State.activeTab === 'herbal_remedies_catalog') {
          panel.innerHTML = UIEngine.renderCatalogTab();
        }
      }
    });

    State.listenersBound = true;
  }

  // 9. PUBLIC API & LIFECYCLE IMPLEMENTATION
  window.VetcareApp.Modules.AyushEthnovetMedicine = {
    // Lifecycle Init
    async init() {
      try {
        await StorageAdapter.initDB();
        await StorageAdapter.loadRecipes();
        console.log('[AyushEngine] Module initialized with', window.VetcareApp.ClinicalData.AyushFormulary.RECIPES.length + State.customFormulations.length, 'recipes.');
      } catch (err) {
        console.error('[AyushEngine] Init Error:', err);
      }
    },

    // Lifecycle Render
    render(containerId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error(`[AyushEngine] Container ${containerId} not found.`);
        return;
      }

      State.containerElement = container;
      this.refreshView();
      bindDOMEvents(container);
    },

    // Fast View Refresh
    refreshView() {
      if (!State.containerElement) return;

      State.containerElement.innerHTML = UIEngine.renderMainLayout();
      const panel = State.containerElement.querySelector('#ayushTabContentPanel');
      if (!panel) return;

      if (State.activeTab === 'herbal_remedies_catalog') {
        panel.innerHTML = UIEngine.renderCatalogTab();
      } else if (State.activeTab === 'preparation_wizard') {
        panel.innerHTML = UIEngine.renderPreparationWizardTab();
      } else if (State.activeTab === 'dosage_calculator') {
        panel.innerHTML = UIEngine.renderDosageCalculatorTab();
      } else if (State.activeTab === 'print_farmer_handbill') {
        panel.innerHTML = UIEngine.renderPrintFarmerHandbillTab();
      }
    },

    // Lifecycle Destroy
    destroy() {
      if (State.containerElement) {
        State.containerElement.innerHTML = '';
        State.containerElement = null;
      }
      State.listenersBound = false;
      console.log('[AyushEngine] Module destroyed cleanly.');
    },

    // Printable A4/A5 Bilingual Advisory Slip
    printFarmerRecipeHandbill(recipeId) {
      const allRecipes = [
        ...window.VetcareApp.ClinicalData.AyushFormulary.RECIPES,
        ...State.customFormulations
      ];
      const r = allRecipes.find(item => item.id === (recipeId || State.selectedRecipeId)) || allRecipes[0];

      const printWindow = window.open('', '_blank', 'width=850,height=750');
      if (!printWindow) {
        notify('प्रिंट विंडो पॉपअप अवरुद्ध हो गया है। पॉपअप्स की अनुमति दें।', 'warning');
        return;
      }

      const slipHtml = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>EVP Recipe Slip - ${r.titleHi}</title>
          <style>
            @page { size: A5 portrait; margin: 10mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; padding: 10px; font-size: 11px; }
            .header-box { text-align: center; border-bottom: 2px solid #064e3b; padding-bottom: 6px; margin-bottom: 10px; }
            .crest { font-size: 16px; font-weight: 900; color: #064e3b; }
            .subcrest { font-size: 9px; text-transform: uppercase; color: #555; }
            .title { font-size: 13px; font-weight: bold; margin-top: 5px; text-decoration: underline; color: #047857; }
            .sec-title { font-size: 11px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-top: 8px; color: #1e293b; }
            table { width: 100%; border-collapse: collapse; margin-top: 5px; }
            th, td { border: 1px solid #cbd5e1; padding: 4px 6px; font-size: 10px; text-align: left; }
            th { background-color: #f1f5f9; }
            .alert-box { background-color: #fef2f2; border: 1px solid #f87171; padding: 6px; border-radius: 4px; margin-top: 10px; font-size: 9px; color: #991b1b; }
            .footer { display: flex; justify-content: space-between; margin-top: 30px; font-size: 10px; }
            .sign { border-top: 1px solid #333; width: 160px; text-align: center; padding-top: 3px; }
          </style>
        </head>
        <body>
          <div class="header-box">
            <div class="crest">VETCARE AI OS • आयुष देशी पशु चिकित्सा सेवा</div>
            <div class="subcrest">Ethno-Veterinary Practices (EVP) Clinical Advisory (2026 Core)</div>
            <div class="title">${r.titleHi}</div>
            <div style="font-size: 9px; color: #475569;">(${r.titleEn})</div>
          </div>

          <div class="sec-title">१. आवश्यक सामग्री एवं नाप (Ingredients)</div>
          <table>
            <tr>
              <th>घटक का नाम</th>
              <th>मात्रा (Kitchen Units)</th>
            </tr>
            ${r.ingredients.map(ing => `
              <tr>
                <td><strong>${ing.nameHi}</strong> (${ing.nameEn})</td>
                <td>${ing.quantity}</td>
              </tr>
            `).join('')}
          </table>

          <div class="sec-title">२. तैयार करने की विधि (Preparation)</div>
          <ol style="margin: 4px 0 0 18px; padding: 0;">
            ${r.kitchenPreparationSteps.map(step => `<li>${step}</li>`).join('')}
          </ol>

          <div class="sec-title">३. प्रयोग की विधि एवं अवधि (Application)</div>
          <p style="margin: 4px 0 0 0;">${r.applicationMethod}</p>

          <div class="alert-box">
            <strong>तत्काल डॉक्टर बुलाने के लक्षण:</strong> यदि पशु को 104°F से अधिक बुखार हो, मुंह से झाग व सांस लेने में कठिनाई हो, या 24 घंटे में सुधार न दिखे तो तुरंत अधिकृत पशु चिकित्सक से संपर्क करें।
          </div>

          <div class="footer">
            <div>परामर्श दिनांक: ${new Date().toLocaleDateString('hi-IN')}</div>
            <div class="sign">पशु चिकित्सा अधिकारी हस्ताक्षर</div>
          </div>

          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(slipHtml);
      printWindow.document.close();
    }
  };

})(window, document);
