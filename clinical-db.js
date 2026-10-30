// ==================== VETCARE MASTER CLINICAL DATABASE ====================
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
      { sno: 1, category: "एंटीबायोटिक (1st Line)", generic: "Ceftiofur Sodium (1g)", ethical: "Xyrofur (Intas, ₹450) / Excenel", dose: "1.1-2.2 mg/kg", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 2, category: "एंटीबायोटिक (वैकल्पिक)", generic: "Marbofloxacin 10%", ethical: "Forocid (₹380) / Marbomet", dose: "2 mg/kg", route: "IM / SC", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 3, category: "NSAID", generic: "Meloxicam + Paracetamol", ethical: "Melonex Plus (Intas, ₹110)", dose: "15-20 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" },
      { sno: 4, category: "एंटीहिस्टामिनिक", generic: "Pheniramine Maleate", ethical: "Avil (Sanofi, ₹85)", dose: "10 ml", route: "IM", pregSafe: "✅ सुरक्षित (Safe)" }
    ],

    oralSupplements: [
      { name: "बोवाइन कफ सिरप / ब्रोंकोडाइलेटर", formulation: "Menthol + Eucalyptus Liquid (Respocare / Brof-VT)", dose: "50 ml दिन में दो बार", note: "सांस नली की सूजन व घर्र-घर्र ध्वनि शांत करने हेतु।" },
      { name: "इम्यूनिटी व लिवर टॉनिक", formulation: "Liv-52 Protec / Belamyl Liquid", dose: "50 ml प्रतिदिन 7 दिन तक", note: "एंटीबायोटिक के तनाव से लिवर को सुरक्षित रखने हेतु।" }
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

    pregnancy: "✅ अधिकांश एंटीबायोटिक सुरक्षित। स्टेरॉयड (Dexamethasone) गाभिन पशु में कभी न लगाएं।"
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

    pregnancy: "✅ पेनिसिलिन व अनुशंसित दर्द निवारक सुरक्षित हैं।"
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
      { sno: 1, category: "एंटीबायोटिक", generic: "Ceftriaxone Sodium (3-4g)", ethical: "Intacef (Intas, ₹220)", dose: "10 mg/kg", route: "IM / IV", pregSafe: "✅ सुरक्षित (Safe)" },
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

    pregnancy: "✅ एंटीबायोटिक व स्थानीय उपचार पूर्ण सुरक्षित।"
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

    pregnancy: "✅ स्थानीय थन ट्यूब व सेफ्टियोफ़र पूर्ण सुरक्षित।"
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

    pregnancy: "✅ ब्याने के तुरंत बाद आपातकालीन सुरक्षित।"
  }
];

// ==================== BREEDING & FEED DATA ====================
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
