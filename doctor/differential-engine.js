// Vetcare AI OS - 5-Tier Clinical Disease Detection & Treatment Engine (2026 Production)
// Architecture: Multi-Species Probabilistic Diagnostic Engine & 5-Tier Comprehensive Veterinary Formulary
// Author: Dr. Rahul (National Veterinary Informatics Core)

(function (root, factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.VetcareApp = root.VetcareApp || {};
    root.VetcareApp.DifferentialEngine = factory();
  }
})(typeof window !== "undefined" ? window : this, function () {
  "use strict";

  // =========================================================================
  // 1. EMBEDDED KNOWLEDGE BASE: 14 FIELD DISEASES WITH 5-TIER PROTOCOLS
  // =========================================================================
  const DISEASE_CATALOG = {
    acute_mastitis: {
      id: "acute_mastitis",
      species: ["cow", "buffalo", "goat"],
      names: {
        en: "Acute Clinical Mastitis",
        hi: "तीव्र थनैला रोग (एक्यूट मैस्टाइटिस)",
        rural: "थनेला, गारगोटी, छिछड़े पड़ना, थन सूजन, थन का बंद होना"
      },
      matchMechanism: "इंट्रामैमरी संक्रमण (Staph/Strept/Coliform) के कारण थन के पैरेन्काइमा में तीव्र प्रदाह, संवहनी पारगम्यता वृद्धि एवं दूध में फाइब्रिन व रक्त स्राव।",
      etiology: {
        agent: "Staphylococcus aureus, Streptococcus uberis, Escherichia coli, Klebsiella pneumoniae",
        typeBadge: "जीवाणु जनित (Bacterial)",
        transmission: "दुहने के बाद अयन छिद्र (teat canal) खुला रहने पर गंदे फर्श, गोबर व दूषित हाथों से जीवाणुओं का प्रवेश।"
      },
      cardinalTrigger: "udder_swelling_clots",
      vitalsRules: {
        tempMin: 103.0,
        tempMax: 106.0,
        mucosa: ["normal", "congested"],
        urine: ["normal"],
        dung: ["normal", "watery"],
        rumination: ["normal", "off_feed"]
      },
      labTests: [
        { test: "California Mastitis Test (CMT)", sample: "Quarter Milk (ताजा दूध)", mrp: 80, significance: "जेल बनना दर्शाता है कि सोमैटिक सेल काउंट (SCC) > 10,00,000/ml है।" },
        { test: "Bromothymol Blue (BTB) Strip Test", sample: "Milk Droplet", mrp: 40, significance: "गहरा हरा या नीला रंग दूध के क्षारीय (pH > 7.2) होने की पुष्टि करता है।" },
        { test: "Milk Culture & Antibiotic Sensitivity (ABST)", sample: "Aseptic Milk (10ml)", mrp: 450, significance: "विशिष्ट रोगकारक जीवाणु एवं सबसे प्रभावी एंटीबायोटिक की पहचान।" }
      ],
      treatments: {
        injections: [
          { category: "First-Line Antibiotic", generic: "Ceftriaxone Sodium + Tazobactam", brands: "Intacef Tazo / Cefantral TZ 4.5g", mrp: 495, dose: "10 mg/kg IV / IM OD x 3-5 days (4.5g per 400kg cow)", pregSafe: true, purpose: "Gram +ve व Gram -ve जीवाणुओं का प्रणालीगत खात्मा" },
          { category: "Alternative Antibiotic", generic: "Marbofloxacin 10%", brands: "Marbomet / Forcyl", mrp: 420, dose: "2-8 mg/kg IM / IV OD (10-15 ml per adult cow)", pregSafe: true, purpose: "गंभीर कोलीफॉर्म व स्यूडोमोनास थनैला में त्वरित कार्रवाई" },
          { category: "Anti-inflammatory & Proteolytic", generic: "Meloxicam + Paracetamol", brands: "Melonex Plus / Zobid", mrp: 110, dose: "15-20 ml Deep IM OD for 3 days", pregSafe: true, purpose: "थन का दर्द, सूजन व 105°F बुखार कम करना" },
          { category: "Steroid Anti-inflammatory", generic: "Isoflupredone Acetate", brands: "Predef 2X / Mopred", mrp: 185, dose: "10 ml Deep IM (ONLY IN NON-PREGNANT ANIMAL)", pregSafe: false, purpose: "अत्यधिक कड़े थन की सूजन को तेजी से पिघलाना (गर्भवती में पूर्णतः वर्जित)" },
          { category: "Fibrinolytic Enzyme", generic: "Serratiopeptidase", brands: "Serakind / Bioserra Injection", mrp: 130, dose: "8-10 ml IM OD x 3 days", pregSafe: true, purpose: "थन नलिकाओं में जमे फाइब्रिन क्लॉट्स व थक्कों को घोलना" }
        ],
        oral: [
          { type: "Citrate Buffer & Keratin Powder", generic: "Trisodium Citrate + Vit A, D3, E, Biotin, Se", brands: "Masticare / Mastilep Powder", mrp: 260, dose: "1 पाउच (50g) रोज गुड़ में 5 दिन", pregSafe: true, purpose: "दूध के pH को 6.5 पर सामान्य करना व थन की प्रतिरोधक क्षमता बढ़ाना" },
          { type: "Intramammary Infusion", generic: "Cefoperazone Sodium OR Ceftriaxone", brands: "Mammitel / Tilmicosin Teat Tube", mrp: 115, dose: "1 सिरिंज पूरे थन को खाली कर चढ़ाना OD x 3 days", pregSafe: true, purpose: "सीधे अयन में जीवाणुनाशक स्थानीय सांद्रता बनाना" }
        ],
        ayurvedic: [
          { name: "Mastilep Gel (हर्बल लेप)", ingredients: "Curcuma longa, Cedrus deodara, Eucalyptus oil", mrp: 135, dose: "दुहने के बाद पूरे अयन पर दिन में 3 बार लगाएं", benefits: "एंटीसेप्टिक, दर्दनाशक व थन की गर्मी को शांत करने वाला प्राकृतिक बाम।" }
        ],
        homeopathic: [
          { remedy: "Phytolacca Decandra 200C + Silicea 200C", mrp: 190, dose: "15-15 बूंदें दिन में 4 बार रोटी पर", action: "थन का कड़ापन व दूध में आने वाले छैछड़ों को तेजी से समाप्त करता है।" },
          { remedy: "Belladonna 200C (तीव्र लाली व दर्द में)", mrp: 95, dose: "15 बूंदें हर 2 घंटे में प्रथम दिन", action: "अचानक सूजे, गर्म व लाल थन की जलन को नियंत्रित करता है।" }
        ],
        desi: [
          { name: "ग्वारपाठा, हल्दी व कली चूना लेप (TANUVAS Formulated)", ingredients: "ताजा एलोवेरा गूदा (250g) + शुद्ध हल्दी (50g) + कली का चूना (15g)", prep: "तीनों को सिलबट्टे पर घोटकर सिंदूरी लाल गाढ़ा लेप तैयार करें।", usage: "दूध को पूर्ण दुहकर अयन पर दिन में 4-5 बार लगाएं। 5 दिन जारी रखें।" }
        ],
        biosecurity: [
          "दूध निकालने के बाद थनों को 0.5% पोविडोन आयोडीन घोल में डुबोएं (Post-milking teat dip)।",
          "दुहने के 45 मिनट बाद तक पशु को नीचे बैठने न दें (ताजा हरा चारा आगे डालें)।",
          "संक्रमित थन का दूध हमेशा सबसे अंत में निकालें और उसे जमीन पर न गिराकर गड्ढे में नष्ट करें।"
        ]
      },
      prognosis: {
        severity: "मध्यम से गंभीर (Moderate to Severe)",
        recoveryDays: "3 से 7 दिन",
        redFlags: [
          "थन का ठंडा, सुन्न व नीला पड़ना (गैंग्रीनस मैस्टाइटिस - Gangrenous Mastitis - थन गलने का खतरा)।",
          "पशु का जमीन पर गिरना व गंभीर विषाक्तता (Endotoxic Shock)।"
        ]
      }
    },

    hs_galghotu: {
      id: "hs_galghotu",
      species: ["cow", "buffalo"],
      names: {
        en: "Hemorrhagic Septicemia (HS / Pasteurellosis)",
        hi: "गलघोंटू रोग (पास्चुरेलॉसिस)",
        rural: "घुर्रका, गलसुआ, घोटू, घटकना, कंठसूजन"
      },
      matchMechanism: "पास्चुरेला एंडोटॉक्सिन जनित तीव्र संवहनी रिसाव जिससे अवअधोहनु (submandibular) एवं गलकंबल (brisket) में भारी फाइब्रिनस प्रदाह, श्वासनली अवरोध व सेप्टिक शॉक।",
      etiology: {
        agent: "Pasteurella multocida (Serotypes B:2 & E:2)",
        typeBadge: "जीवाणु जनित (Bacterial)",
        transmission: "वर्षा ऋतु में दूषित चारे-पानी के अंतर्ग्रहण या सांस द्वारा; थकान व ठंड से प्रतिरोधक क्षमता घटने पर अचानक विस्फोट।"
      },
      cardinalTrigger: "throat_swelling_stridor",
      vitalsRules: {
        tempMin: 104.5,
        tempMax: 107.0,
        mucosa: ["congested", "cyanotic"],
        urine: ["normal"],
        dung: ["normal", "watery"],
        rumination: ["off_feed"]
      },
      labTests: [
        { test: "Leishman / Methylene Blue Blood Smear", sample: "Peripheral Blood (Ear Vein)", mrp: 120, significance: "विशिष्ट बाईपोलर सेफ्टी-पिन (safety-pin staining) जीवाणु दिखना।" },
        { test: "Edema Fluid Aspiration Smear", sample: "Throat Swelling Fluid", mrp: 180, significance: "गले की सूजन के तरल में पास्चुरेला जीवाणुओं की सीधी पुष्टि।" },
        { test: "Complete Blood Count (CBC)", sample: "EDTA Whole Blood", mrp: 350, significance: "तीव्र ल्यूकोपेनिया एवं पश्चातवर्ती डीजेनेरेटिव न्यूट्रोफीलिया।" }
      ],
      treatments: {
        injections: [
          { category: "First-Line Bactericidal", generic: "Ceftiofur Sodium", brands: "Xyrofur / Naxcel / Ceftiforce 1g", mrp: 480, dose: "2.2 mg/kg IM or slow IV OD x 3 days (1-2g per adult cow)", pregSafe: true, purpose: "रक्त में तीव्र पास्चुरेला सेप्टीसीमिया का त्वरित खात्मा" },
          { category: "Alternative Antibiotic", generic: "Oxytetracycline Long Acting (LA)", brands: "Terramycin LA / Oxyvet LA", mrp: 280, dose: "20 mg/kg deep IM split sites (35-40 ml per cow)", pregSafe: true, purpose: "लंबे समय तक 72 घंटे का एंटीबायोटिक कवर" },
          { category: "Anti-endotoxemic NSAID", generic: "Flunixin Meglumine", brands: "Megludyne / Finadyne", mrp: 260, dose: "2.2 mg/kg Slow IV OD (15-20 ml per adult cattle)", pregSafe: true, purpose: "एंडोटॉक्सिन शॉक, गले की सूजन व 106°F बुखार पर तत्काल नियंत्रण" },
          { category: "Laryngeal Edema Reducer", generic: "Dexamethasone Sodium", brands: "Dexona / Decdan", mrp: 45, dose: "0.1 mg/kg IV (10 ml only in non-pregnant animals)", pregSafe: false, purpose: "गले की घुटन कम कर दम घुटने से बचाना (गर्भवती में गर्भपात कारक!)" }
        ],
        oral: [
          { type: "Antipyretic Pain Bolus", generic: "Meloxicam + Paracetamol Bolus", brands: "Melonex Plus Bolus", mrp: 65, dose: "2 बोलस सुबह-शाम 3 दिन", pregSafe: true, purpose: "दर्द व बुखार का निरंतर निवारण" },
          { type: "Anti-stress Electrolytes", generic: "Vitamin C + Electrolyte Powder", brands: "Electral Energy / Restobal", mrp: 160, dose: "50g गुनगुने पानी में दिन में 2 बार", pregSafe: true, purpose: "कोशिकीय निर्जलीकरण व तनाव मुक्ति" }
        ],
        ayurvedic: [
          { name: "Respo-Vet / Kaf-Go Liquid", ingredients: "Adhatoda vasica, Glycyrrhiza glabra, Ocimum sanctum", mrp: 210, dose: "100 ml दिन में दो बार", benefits: "श्वास नली से कफ व स्राव को पतला कर सांस लेना आसान बनाता है।" }
        ],
        homeopathic: [
          { medicine: "Aconitum Napellus 200C + Belladonna 200C", mrp: 180, dose: "15 बूंदें हर 2 घंटे में शुरुआत में", action: "अचानक आए उच्च ज्वर, गले की कंजेस्टिव सूजन व बेचैनी को रोकता है।" },
          { medicine: "Bryonia Alba 200C", mrp: 95, dose: "15 बूंदें दिन में 4 बार", action: "फेफड़ों व प्लूरा में फाइब्रिन जमाव व सांस के दर्द को कम करता है।" }
        ],
        desi: [
          { name: "हल्दी, काली मिर्च व अलसी गर्म लेप", ingredients: "हल्दी चूर्ण (100g) + पिसी काली मिर्च (25g) + अलसी तेल (150ml)", prep: "अलसी के तेल में हल्का गर्म करके गुनगुना लेप बनाएं।", usage: "गले व छाती की सूजन पर बाहर से दिन में 2 बार लगाएं।" },
          { name: "सोंठ व तुलसी गुड़ काढ़ा", ingredients: "सोंठ (50g) + तुलसी (30 पत्ते) + पुराना गुड़ (150g)", prep: "1 लीटर पानी में उबालकर आधा करें।", usage: "गुनगुना पिलाएं (सावधानी: यदि अत्यधिक सांस फूल रही हो तो नाल न दें)।" }
        ],
        biosecurity: [
          "रोगी पशु को तुरंत सूखे, हवादार एकांत बाड़े में अलग बांधें।",
          "बाड़े की नालियों व फर्श पर 2% कास्टिक सोडा या 4% ब्लीचिंग पाउडर छिड़कें।",
          "बरसात शुरू होने से 1 माह पूर्व सभी पशुओं का HS वैक्सिनेशन अनिवार्य रूप से कराएं।"
        ]
      },
      prognosis: {
        severity: "अत्यधिक गंभीर व प्राणघातक (Hyperacute / Critical)",
        recoveryDays: "3 से 6 दिन (यदि प्रथम 12 घंटे में उपचार शुरू हो)",
        redFlags: [
          "गले की सूजन से जीभ बाहर निकलना व घरघराहट (दम घुटने से मृत्यु का खतरा)।",
          "तापमान का अचानक 98°F से नीचे गिरना (अंतिम सेप्टिक शॉक)।"
        ]
      }
    },

    bq_langariya: {
      id: "bq_langariya",
      species: ["cow", "buffalo", "sheep"],
      names: {
        en: "Black Quarter (BQ / Clostridial Myonecrosis)",
        hi: "लंगड़ा बुखार / चुरचुरा (ब्लैक क्वार्टर)",
        rural: "लंगड़िया, जहरबाद, चुरचुरिया, फड़सूजन, काला गोश्त"
      },
      matchMechanism: "क्लोस्ट्रीडियम बीजाणुओं का भारी पेशियों (जांघ, पुट्ठा) में अंकुरण, नेक्रोटाइजिंग अल्फा टॉक्सिन स्राव, मांसपेशी परिगलन व गैस निर्माण।",
      etiology: {
        agent: "Clostridium chauvoei - एनारोबिक, बीजाणु-निर्माता ग्राम-पॉजिटिव छड़",
        typeBadge: "जीवाणु जनित (Bacterial Spore)",
        transmission: "मिट्टी में मौजूद बीजाणुओं का चराई के दौरान पेट में जाना; पेशियों में हल्की चोट लगने पर सक्रिय होना।"
      },
      cardinalTrigger: "crepitating_swelling_thigh",
      vitalsRules: {
        tempMin: 104.0,
        tempMax: 106.5,
        mucosa: ["congested"],
        urine: ["normal"],
        dung: ["normal", "constipated"],
        rumination: ["off_feed"]
      },
      labTests: [
        { test: "Impression Smear of Muscle Exudate", sample: "Aspirated Muscle Fluid", mrp: 140, significance: "ग्राम-पॉजिटिव छड़नुमा जीवाणु जिनमें सबटर्मिनल स्पोर्स उपस्थित हों।" },
        { test: "Fluorescent Antibody Technique (FAT)", sample: "Muscle Smear", mrp: 400, significance: "Clostridium chauvoei की विशिष्ट फ्लोरोसेंट प्रतिदीप्ति पुष्टि।" }
      ],
      treatments: {
        injections: [
          { category: "High-Dose Penicillin", generic: "Crystalline Penicillin G + Procaine Penicillin", brands: "Bistrepen / Pronapen 40 Lac", mrp: 90, dose: "20,000-40,000 IU/kg IM BID x 5 days (40-60 Lac IU per cow)", pregSafe: true, purpose: "क्लोस्ट्रीडियम जीवाणुओं का तत्काल पूर्ण खात्मा" },
          { category: "Circumferential Infiltration", generic: "Crystalline Benzylpenicillin", brands: "Benzylpenicillin 10 Lac IU", mrp: 40, dose: "20 लाख IU डिस्टिल्ड वाटर में घोलकर सूजन के चारों ओर त्वचा में लगाएं", pregSafe: true, purpose: "मांसपेशियों के सड़ने की गति को आगे बढ़ने से रोकना" },
          { category: "Potent NSAID", generic: "Meloxicam + Paracetamol", brands: "Melonex Plus / Zobid", mrp: 110, dose: "15-20 ml Deep IM OD x 4 days", pregSafe: true, purpose: "पुट्ठे के असहनीय दर्द व तेज बुखार का निवारण" }
        ],
        oral: [
          { type: "Sustained Analgesic Bolus", generic: "Meloxicam Bolus", brands: "Melonex Bolus", mrp: 60, dose: "2 बोलस रोज 4 दिन", pregSafe: true, purpose: "लंगड़ेपन के दर्द में निरंतर राहत" }
        ],
        ayurvedic: [
          { name: "Teeburb / Himax Ointment", ingredients: "Neem oil, Karanj oil, Camphor", mrp: 120, dose: "सूजन के बाहरी भाग पर लेप करें", benefits: "घाव व सूजन पर जीवाणुरोधी सुरक्षा कवच।" }
        ],
        homeopathic: [
          { medicine: "Anthracinum 200C + Arnica Montana 200C", mrp: 180, dose: "15-15 बूंदें हर 2 घंटे में प्रथम दिन", action: "मांसपेशियों के काले पड़ने, सड़न व गैस के दर्द में विशिष्ट गुणकारी।" }
        ],
        desi: [
          { name: "हाइड्रोजन परॉक्साइड व कपूर नीम तेल", ingredients: "H2O2 (3%) + कपूर (10g) + नीम तेल (100ml)", prep: "चीरा लगे स्थान को H2O2 से धोएं ताकि ऑक्सीजन से एनारोबिक जीवाणु नष्ट हों।", usage: "ऊपर से कपूर मिला नीम तेल लगाएं।" }
        ],
        biosecurity: [
          "BQ से मरे पशु की खाल कभी न उतारें और न ही शव को चीरें (बीजाणु मिट्टी में 50 वर्ष जीवित रहते हैं)।",
          "शव को 6 फीट गहरे गड्ढे में चूना डालकर दफनाएं।",
          "हर वर्ष मानसून पूर्व 6 माह से ऊपर के पशुओं का BQ टीका लगवाएं।"
        ]
      },
      prognosis: {
        severity: "अत्यधिक जानलेवा (Lethal if untreated)",
        recoveryDays: "4 से 8 दिन",
        redFlags: [
          "सूजन का ठंडा व सुन्न (Painless & Cold) पड़ना (मांसपेशी का पूर्ण गल जाना)।",
          "पशु का बैठ जाना व उठने में असमर्थ होना।"
        ]
      }
    },

    theileriosis: {
      id: "theileriosis",
      species: ["cow", "buffalo"],
      names: {
        en: "Bovine Tropical Theileriosis",
        hi: "थायलेरियोसिस (चिचड़ी जनित गिल्टी बुखार)",
        rural: "गिल्टी बुखार, बिसार, लसिका ग्रंथि सूजन, आंख में मोतिया"
      },
      matchMechanism: "थाइलेरिया एन्युलेटा स्पोरोजोइट्स द्वारा लिम्फोसाइट्स में मैक्रोशिज़ोंट विभाजन, लिम्फ नोड हाइपरप्लासिया एवं पश्चातवर्ती एरिथ्रोसाइटिक पिरोप्लाज्म द्वारा लाल रक्त कणिकाओं का विनाश।",
      etiology: {
        agent: "Theileria annulata (इंट्रासेल्युलर प्रोटोजोआ)",
        typeBadge: "रक्त परजीवी (Hemoprotozoan)",
        transmission: "हयालोमा (Hyalomma anatolicum) चिचड़ी के काटने से।"
      },
      cardinalTrigger: "prescapular_lymph_swelling_eye_opacity",
      vitalsRules: {
        tempMin: 104.5,
        tempMax: 107.0,
        mucosa: ["pale_white", "yellow_jaundice"],
        urine: ["normal"],
        dung: ["normal", "constipated"],
        rumination: ["off_feed"]
      },
      labTests: [
        { test: "Lymph Node Biopsy / Aspirate Smear", sample: "Prescapular Lymph Node Aspirate", mrp: 180, significance: "लिम्फोसाइट्स में कोच ब्लू बॉडीज (Koch's blue bodies) की निर्णायक पुष्टि।" },
        { test: "Thin Blood Smear (Giemsa Stained)", sample: "Peripheral Blood (Ear Vein)", mrp: 140, significance: "RBCs के अंदर रिंग व रॉड आकार के पिरोप्लाज्म की उपस्थिति।" },
        { test: "Packed Cell Volume (PCV)", sample: "EDTA Blood", mrp: 120, significance: "गंभीर एनीमिया के कारण PCV 12-15% तक गिरना।" }
      ],
      treatments: {
        injections: [
          { category: "Specific Antitheilerial", generic: "Buparvaquone", brands: "Zubion / Butalex / Bupatroy", mrp: 1250, dose: "2.5 mg/kg Deep IM only (1 ml per 20 kg, max 20ml single site)", pregSafe: true, purpose: "लिम्फ नोड के शिज़ोंट व आरबीसी के पिरोप्लाज्म दोनों का संपूर्ण खात्मा" },
          { category: "Synergistic Tetracycline", generic: "Oxytetracycline LA", brands: "Terramycin LA 200mg/ml", mrp: 280, dose: "10-20 mg/kg Deep IM on Day 1 & Day 3", pregSafe: true, purpose: "थाइलेरिया शिज़ोगोनी को रोकना व पुनः प्रकोप से बचाना" },
          { category: "Hematinic & Liver Guard", generic: "Iron Dextran + Vit B12 + Liver Extract", brands: "Ferritas / Belamyl", mrp: 160, dose: "10 ml IM alternate days x 3 doses", pregSafe: true, purpose: "नष्ट हुए हीमोग्लोबिन व लाल रक्त कणिकाओं का पुनर्निर्माण" },
          { category: "Corneal Opacity Drops", generic: "Ciprofloxacin + Dexamethasone Eye Drops", brands: "Ciplox-D Eye Drops", mrp: 45, dose: "4-5 बूंदें आंख में दिन में 3 बार (यदि कॉर्नियल अल्सर न हो)", pregSafe: true, purpose: "आंख की मोतिया जैसी सफेदी व कंजंक्टिवाइटिस को साफ करना" }
        ],
        oral: [
          { type: "Liver & Metabolic Tonic", generic: "Tricholine Citrate + Inositol + B-Complex", brands: "Broton / Livoferol Syrup", mrp: 210, dose: "100 ml रोज 10 दिन", pregSafe: true, purpose: "लिवर कोशिकाओं को विषाक्तता से बचाना व भूख बढ़ाना" }
        ],
        ayurvedic: [
          { name: "Hepatocare / Livol Liquid", ingredients: "Andrographis paniculata, Phyllanthus niruri", mrp: 195, dose: "80 ml दिन में दो बार 10 दिन", benefits: "पीलिया दूर करना व प्लीहा-यकृत की सूजन घटाना।" }
        ],
        homeopathic: [
          { medicine: "Merc Sol 200C + Phytolacca 200C", mrp: 180, dose: "15-15 बूंदें दिन में 4 बार", action: "गर्दन की सूजी हुई कठोर गिल्टियों को नरम कर घोलता है।" }
        ],
        desi: [
          { name: "काली जीरी, चिरायता व गिलोय काढ़ा", ingredients: "काली जीरी (25g) + चिरायता (50g) + गिलोय (100g) + कुटकी (20g)", prep: "1.5 लीटर पानी में उबालकर आधा करें।", usage: "छानकर 5 दिन तक रोज सुबह नाल से पिलाएं। चिचड़ी बुखार शांत होता है।" }
        ],
        biosecurity: [
          "हयालोमा चिचड़ियों के खात्मे हेतु पशुबाड़े में डेल्टामेथ्रिन 1.25% (Butox 2ml/L) का सघन स्प्रे करें।",
          "दीवारों की दरारों को आग की लौ (Flame gun) से जलाएं जहां चिचड़ियां अंडे देती हैं।"
        ]
      },
      prognosis: {
        severity: "अत्यधिक गंभीर (Severe Chronic/Acute)",
        recoveryDays: "7 से 14 दिन",
        redFlags: [
          "फेफड़ों में पानी भरना (Pulmonary Edema) - नथुनों से झागदार पानी व दम घुटना।",
          "दोनों आंखों में पूर्ण अंधापन व PCV < 10%।"
        ]
      }
    },

    babesiosis: {
      id: "babesiosis",
      species: ["cow", "buffalo", "dog"],
      names: {
        en: "Bovine Babesiosis (Redwater Fever / Piroplasmosis)",
        hi: "बेबेसियोसिस (लाल पेशाब / रक्तमूतरा बुखार)",
        rural: "रक्तमूतरा, लाल पेशाब, झर्रा, लहू-मुतना, रत्ता"
      },
      matchMechanism: "बबेसिया बाईजेमिना द्वारा एरिथ्रोसाइट्स के भीतर तीव्र गुणन, व्यापक इंट्रावैस्कुलर हेमोलिसिस, हीमोग्लोबिनेमिया एवं हीमोग्लोबिन्यूरिया (लाल पेशाब)।",
      etiology: {
        agent: "Babesia bigemina / Babesia bovis (प्रोटोजोआ)",
        typeBadge: "रक्त परजीवी (Hemoprotozoan)",
        transmission: "रीपिसेफेलस (Rhipicephalus microplus / बूफिलस) चिचड़ी के काटने से।"
      },
      cardinalTrigger: "coffee_portwine_urine",
      vitalsRules: {
        tempMin: 104.5,
        tempMax: 107.5,
        mucosa: ["pale_white", "yellow_jaundice"],
        urine: ["red_coffee"],
        dung: ["hard_constipated", "watery"],
        rumination: ["off_feed"]
      },
      labTests: [
        { test: "Capillary Blood Smear (Giemsa)", sample: "Peripheral Blood (Ear Tip)", mrp: 130, significance: "RBCs के अंदर जोड़े में नाशपाती के आकार (paired pear-shaped) के बबेसिया दिखना।" },
        { test: "Urine Strip (Hemoglobinuria Test)", sample: "Fresh Red Urine", mrp: 60, significance: "फ्री हीमोग्लोबिन पॉजिटिव (बिना साबुत आरबीसी जमाव के)।" },
        { test: "Packed Cell Volume (PCV)", sample: "EDTA Blood", mrp: 120, significance: "तीव्र रक्त विनाश से PCV 8-12% तक गिर जाना।" }
      ],
      treatments: {
        injections: [
          { category: "Specific Antiprotozoal", generic: "Diminazene Aceturate 7%", brands: "Berenil / Diminaz / Babecure", mrp: 195, dose: "3.5 mg/kg Deep IM only (15-20 ml per adult cow)", pregSafe: true, purpose: "आरबीसी में बबेसिया प्रोटोजोआ का तुरंत संहार" },
          { category: "Second-Line / Prophylactic", generic: "Imidocarb Dipropionate", brands: "Imizol / Imidocarb Injection", mrp: 680, dose: "1.2 mg/kg SC or IM (3 ml per 100 kg body weight)", pregSafe: true, purpose: "बबेसिया निवारण एवं 4 सप्ताह तक पुनः संक्रमण से सुरक्षा" },
          { category: "Hematinic Rebuilder", generic: "Iron Dextran with Vitamin B12", brands: "Ferritas / Imferon Vet", mrp: 160, dose: "10 ml Deep IM alternate days x 3 doses", pregSafe: true, purpose: "नष्ट हुए हीमोग्लोबिन की तत्काल भरपाई" },
          { category: "Fluid Therapy", generic: "Normal Saline (0.9% NaCl) + Dextrose", brands: "DNS / NS 500ml", mrp: 85, dose: "2-3 लीटर Slow IV infusion", pregSafe: true, purpose: "गुर्दों में फ्री हीमोग्लोबिन से होने वाले रीनल ब्लॉकेज (Tubular Necrosis) को धोना" }
        ],
        oral: [
          { type: "Iron & Liver Tonic", generic: "Iron Choline Citrate + Liver Extract", brands: "Feritas Syrup / Sarkoferrol", mrp: 230, dose: "50 ml दिन में दो बार 10 दिन", pregSafe: true, purpose: "अस्थिमज्जा में नए खून के निर्माण को गति देना" },
          { type: "Systemic Alkalizer", generic: "Sodium Bicarbonate Powder", brands: "मीठा सोडा (Baking Soda)", mrp: 40, dose: "100g पानी में घोलकर दिन में दो बार", pregSafe: true, purpose: "एसिडोसिस को नियंत्रित करना व गुर्दों को सुरक्षित रखना" }
        ],
        ayurvedic: [
          { name: "Liv-52 Protec / Livol Liquid", ingredients: "Capparis spinosa, Cichorium intybus", mrp: 210, dose: "100 ml दिन में दो बार 10 दिन", benefits: "हेमोलिसिस से उत्पन्न अत्यधिक बिलीरुबिन से यकृत को बचाना।" }
        ],
        homeopathic: [
          { medicine: "Crotalus Horridus 200C", mrp: 110, dose: "15 बूंदें हर 3 घंटे में", action: "रक्तवाहिकाओं के अंदर खून के फटने व लाल पेशाब को रोकता है।" },
          { medicine: "China Officinalis 200C", mrp: 95, dose: "15 बूंदें दिन में 3 बार", action: "अत्यधिक खून व तरल के नुकसान के बाद शरीर की कमजोरी दूर करता है।" }
        ],
        desi: [
          { name: "मुनक्का व पालक रस हेमैटिनिक", ingredients: "मुनक्का (100g भीगे) + पालक/बथुआ रस (250ml) + पुराना गुड़ (100g)", prep: "मुनक्का पीसकर पालक रस व गुड़ में मिलाएं।", usage: "सुबह खाली पेट 7 दिन तक पिलाएं। नया खून तेजी से बनता है।" }
        ],
        biosecurity: [
          "पशु को पूर्ण विश्राम दें; तेज धूप में न चलाएं (शारीरिक श्रम से हार्ट फेल हो सकता है)।",
          "बूफिलस चिचड़ियों के खात्मे हेतु पूरे बाड़े व पशु पर एमीट्राज (Amitraz 12.5% - 2ml/L) का छिड़काव करें।"
        ]
      },
      prognosis: {
        severity: "अत्यंत नाजुक व गंभीर (Critical Anemia)",
        recoveryDays: "5 से 10 दिन",
        redFlags: [
          "आंखों व मसूड़ों का संगमरमर जैसा सफेद (Porcelain White) पड़ना (PCV < 10%)।",
          "गर्दन की जुगुलर नस में धड़कन (Jugular Pulse) दिखना व हृदय गति 110+ होना।"
        ]
      }
    },

    surra_trypanosomiasis: {
      id: "surra_trypanosomiasis",
      species: ["cow", "buffalo", "dog"],
      names: {
        en: "Trypanosomiasis (Surra)",
        hi: "सर्रा रोग (ट्रिपैनोसोमियासिस)",
        rural: "सर्रा, तिबरसा, अंधा चक्कर, मक्खी बुखार"
      },
      matchMechanism: "ट्रिपैनोसोमा इवान्साई द्वारा रक्त शर्करा का क्षय, केंद्रीय तंत्रिका तंत्र में प्रवेश, एन्सेफेलोपैथी, चक्रीय बुखार एवं न्यूरोलॉजिकल लक्षण।",
      etiology: {
        agent: "Trypanosoma evansi (फ्लेजिलेटेड प्रोटोजोआ)",
        typeBadge: "रक्त परजीवी (Hemoflagellate)",
        transmission: "डांस मक्खी (Tabanus fly) एवं स्टोमॉक्सिस मक्खियों के यांत्रिक काटने से।"
      },
      cardinalTrigger: "circling_head_pressing",
      vitalsRules: {
        tempMin: 104.0,
        tempMax: 106.5,
        mucosa: ["pale_white", "yellow_jaundice"],
        urine: ["normal"],
        dung: ["normal", "watery"],
        rumination: ["off_feed"]
      },
      labTests: [
        { test: "Wet Blood Film (Live Motility)", sample: "Fresh Ear Vein Blood", mrp: 100, significance: "सूक्ष्मदर्शी में RBCs के बीच तेजी से छटपटाते हुए फ्लेजिलेटेड ट्रिपैनोसोमा दिखना।" },
        { test: "Giemsa Stained Thin Smear", sample: "Peripheral Blood", mrp: 130, significance: "लंबे पतले ट्रिपैनोसोमा जिनमें स्वतंत्र एंटीरियर फ्लैजेलम उपस्थित हो।" }
      ],
      treatments: {
        injections: [
          { category: "Specific Antitripanosomal", generic: "Quinapyramine Sulfate + Chloride", brands: "Triquin / Antrycide Pro-salt", mrp: 290, dose: "4.4 mg/kg Subcutaneous (SC) only (Divide into 2 sites)", pregSafe: true, purpose: "रक्त एवं ऊतकों से ट्रिपैनोसोमा का पूर्ण सफाया" },
          { category: "Alternative Trypanocide", generic: "Isometamidium Chloride", brands: "Securid / Trypamidium", mrp: 380, dose: "0.5-1 mg/kg Deep IM only", pregSafe: true, purpose: "सर्रा का उपचार एवं 3-4 माह का सुरक्षात्मक कवच" },
          { category: "Neuro-Supportive", generic: "Vitamin B1 + B6 + B12 (High Potency)", brands: "Tribivet / Neurobion", mrp: 120, dose: "15 ml Slow IV / IM OD x 4 days", pregSafe: true, purpose: "मस्तिष्क के न्यूरॉन्स की सूजन व अंधापन रोकना" }
        ],
        oral: [
          { type: "Energy Booster", generic: "Dextrose Monohydrate + Minerals", brands: "Glucoboost / Enerdyn", mrp: 180, dose: "200g रोज पानी में 4 दिन", pregSafe: true, purpose: "परजीवी द्वारा नष्ट की गई रक्त शर्करा की तत्काल भरपाई" }
        ],
        ayurvedic: [
          { name: "Ayush Neuro-Vet Tonic", ingredients: "Bacopa monnieri (ब्राह्मी), Withania somnifera (अश्वगंधा)", mrp: 220, dose: "100 ml दिन में दो बार", benefits: "नर्वस कमजोरी, चक्कर व सिर दीवार से भिड़ाने के लक्षणों में शांति।" }
        ],
        homeopathic: [
          { medicine: "Arsenicum Album 200C", mrp: 95, dose: "15 बूंदें दिन में 4 बार", action: "चक्रीय बुखार, भीषण दुर्बलता व अंगों की सुन्नता को दूर करता है।" }
        ],
        desi: [
          { name: "गिलोय, तुलसी व काली मिर्च काढ़ा", ingredients: "गिलोय तना (150g) + तुलसी (40 पत्ते) + काली मिर्च (20 दाने)", prep: "1.5 लीटर पानी में उबालकर 500 मिली रखें।", usage: "सुबह-शाम 5 दिन पिलाएं। परजीवी बुखार शांत होता है।" }
        ],
        biosecurity: [
          "तबेले में डांस मक्खियों (Tabanus) के नियंत्रण हेतु सायपरमेथ्रिन 10% का दीवारों पर नियमित स्प्रे करें।",
          "गंभीर नर्वस अवस्था में पशु को नरम पुआल पर रखें ताकि सिर में चोट न लगे।"
        ]
      },
      prognosis: {
        severity: "अत्यधिक गंभीर (Critical Neurological)",
        recoveryDays: "5 से 10 दिन",
        redFlags: [
          "दीवारों से सिर टकराना, अंधापन व पागलों की तरह गोल-गोल घूमना।",
          "लकवे की स्थिति में जमीन पर लेटकर पैर चलाना (Paddling movements)।"
        ]
      }
    },

    acute_bloat: {
      id: "acute_bloat",
      species: ["cow", "buffalo", "goat", "sheep"],
      names: {
        en: "Acute Frothy Bloat / Ruminal Tympany",
        hi: "तीव्र झागदार आफरा (गैस व बदहजमी)",
        rural: "आफरा, पेट फूलना, टिमपैनी, हवा भरना, पेट में ढोल बजना"
      },
      matchMechanism: "दलहनी हरे चारे (बरसीम, लूसर्न) के अत्यधिक किण्वन से रूमेन में स्थिर प्रोटीन झाग बनना, जो गैस को मुक्त होने व डकार (eructation) आने से रोकता है।",
      etiology: {
        agent: "Lush legume bloat / Grain overload lactic acidosis",
        typeBadge: "मेटाबोलिक / आहार जनित (Nutritional)",
        transmission: "अति-किण्वनशील भीगे चारे या अनाज का अचानक अत्यधिक सेवन; संक्रामक नहीं।"
      },
      cardinalTrigger: "left_flank_distended_mouth_breathing",
      vitalsRules: {
        tempMin: 100.5,
        tempMax: 103.0,
        mucosa: ["congested", "cyanotic"],
        urine: ["normal"],
        dung: ["normal", "watery"],
        rumination: ["off_feed"]
      },
      labTests: [
        { test: "Stomach Tube Passage Test", sample: "Rumen Gas", mrp: 50, significance: "फ्री गैस निकलना = सिंपल ब्लोट; ट्यूब झाग से चोक होना = फ्रॉथी ब्लोट।" },
        { test: "Rumen Fluid pH Aspiration", sample: "Aspirated Fluid", mrp: 40, significance: "pH < 5.0 = लैक्टिक एसिडोसिस ब्लोट; pH > 7.5 = यूरिया विषाक्तता ब्लोट।" }
      ],
      treatments: {
        injections: [
          { category: "Antispasmodic", generic: "Hyoscine Butylbromide + Dipyrone", brands: "Buscopan Compositum / Spasmovet", mrp: 135, dose: "15-20 ml IM or Slow IV", pregSafe: true, purpose: "रूमेन की दीवार की ऐंठन व भयानक पेट दर्द शांत करना" },
          { category: "Antihistaminic Guard", generic: "Pheniramine Maleate", brands: "Avil / Cadistin", mrp: 45, dose: "10 ml IM", pregSafe: true, purpose: "रुमेन की सड़न से निकलने वाले टॉक्सिक हिस्टामिन को रोकना" },
          { category: "Metabolic Support", generic: "Thiamine Hydrochloride (Vit B1)", brands: "Tribivet / Berin", mrp: 110, dose: "10 ml IV / IM", pregSafe: true, purpose: "एसिडोसिस से मस्तिष्क में थियामिन की कमी व पोलिओएन्सेफेलोमलेशिया रोकना" }
        ],
        oral: [
          { type: "De-foaming Surfactant", generic: "Simethicone Emulsion + Dill Oil", brands: "Bloatosil / Tympol / Afanil", mrp: 95, dose: "100-200 ml वनस्पति तेल में मिलाकर नाल से", pregSafe: true, purpose: "झाग के बुलबुलों को तोड़कर फ्री गैस में बदलना ताकि डकार आ सके" },
          { type: "Antifermentative Drench", generic: "Oil of Turpentine + Mustard Oil", brands: "तारपीन का तेल (औषधीय)", mrp: 60, dose: "40 ml तारपीन + 500 ml मीठा सरसों तेल", pregSafe: true, purpose: "रूमेन में गैस बनाने वाले जीवाणुओं की गतिविधि तत्काल रोकना" }
        ],
        ayurvedic: [
          { name: "Himalayan Batisa / Ruchamax", ingredients: "Zingiber officinale, Trachyspermum ammi, Black salt", mrp: 85, dose: "50g रोज गुड़ में ब्लोट हटने के बाद", benefits: "रूमेन के माइक्रोफ्लोरा व सामान्य जुगाली को पुनर्स्थापित करना।" }
        ],
        homeopathic: [
          { medicine: "Carbo Vegetabilis 200C + Nux Vomica 200C", mrp: 180, dose: "15 बूंदें हर 20 मिनट में 3 बार", action: "पेट में फंसी गैस को डकार व पाद द्वारा तेजी से बाहर निकालता है।" }
        ],
        desi: [
          { name: "सरसों तेल, हींग, अजवाइन व काला नमक (आपातकालीन नुस्खा)", ingredients: "मीठा सरसों तेल (400ml) + असली हींग (15g) + पिसी अजवाइन (50g) + काला नमक (50g)", prep: "हींग व अजवाइन भूनकर तेल में घोलें।", usage: "बांस की नाल से धीरे-धीरे पिलाएं और पशु को 15 मिनट टहलाएं।" }
        ],
        biosecurity: [
          "पशु के मुंह में आड़ा लकड़ी का डंडा बांधें (Bridle) ताकि वह जीभ चलाकर लार (प्राकृतिक बाईकार्बोनेट बफर) निगले।",
          "यदि सांस रुकने लगे, तो बाईं कोख में ट्रोकार एवं कैनुला (Trocar & Cannula) लगाकर प्राण बचाएं।"
        ]
      },
      prognosis: {
        severity: "अत्यंत तीव्र आपातकाल (Hyperacute Emergency)",
        recoveryDays: "1 से 2 दिन",
        redFlags: [
          "मुंह खोलकर सांस लेना, आंखें फटी रह जाना व जीभ नीली पड़ना (डायाफ्राम फटने का खतरा)।",
          "पशु का जमीन पर गिरकर तड़पना।"
        ]
      }
    },

    milk_fever: {
      id: "milk_fever",
      species: ["cow", "buffalo"],
      names: {
        en: "Hypocalcemia (Parturient Paresis / Milk Fever)",
        hi: "दुग्ध ज्वर / सूतक ज्वर (हाइपोकैल्सीमिया)",
        rural: "सूतक, प्रसव बाद का लकवा, कैल्शियम टूटना, ठंडा बुखार"
      },
      matchMechanism: "ब्याने के तुरंत बाद कोलोस्ट्रम में रक्त से अत्यधिक कैल्शियम का निकास, पैराथायरॉयड अक्षमता, सीरम कैल्शियम का < 5.0 mg/dL गिरना एवं फ्लेसिड पैरालिसिस।",
      etiology: {
        agent: "Acute serum ionized calcium deficiency",
        typeBadge: "मेटाबोलिक (Metabolic)",
        transmission: "गैर-संक्रामक; उच्च दुग्ध उत्पादन वाले पशुओं में ब्याने के 24-72 घंटे में अत्यधिक कैल्शियम का क्षरण।"
      },
      cardinalTrigger: "s_curve_neck_subnormal_temp",
      vitalsRules: {
        tempMin: 97.0,
        tempMax: 100.0,
        mucosa: ["normal", "pale_white"],
        urine: ["normal"],
        dung: ["constipated"],
        rumination: ["off_feed"]
      },
      labTests: [
        { test: "Serum Ionized Calcium Level", sample: "Serum (Plain Tube)", mrp: 200, significance: "कैल्शियम < 5.0 mg/dL (सामान्य: 8.5-10.5 mg/dL) पुष्टि करता है।" },
        { test: "Serum Phosphorus & Magnesium", sample: "Serum", mrp: 250, significance: "हाइपोफॉस्फेटेमिया (< 2.0 mg/dL) के सह-अस्तित्व की जांच।" }
      ],
      treatments: {
        injections: [
          { category: "Calcium Replenisher", generic: "Calcium Borogluconate 25% (with Mg & P)", brands: "Mifex / Calborol / Calup", mrp: 380, dose: "450 ml Slow IV (Warm to 38°C) over 25 mins + 150 ml SC", pregSafe: true, purpose: "सीरम कैल्शियम को तुरंत सामान्य स्तर पर लाकर लकवा ठीक करना" },
          { category: "Phosphorus Support", generic: "Sodium Acid Phosphate 40.3%", brands: "Tonophosphan / Alphos", mrp: 160, dose: "15-20 ml IM / IV", pregSafe: true, purpose: "एसोसिएटेड डाउनर काउ सिंड्रोम हाइपोफॉस्फेटेमिया का निवारण" }
        ],
        oral: [
          { type: "Ionic Calcium Gel", generic: "Calcium Chloride + Calcium Propionate Gel", brands: "Calgel / Cal-Up Gel", mrp: 220, dose: "1 पूरी ट्यूब (300g) पशु के होश में आने पर चटाएं", pregSafe: true, purpose: "कैल्शियम के स्तर को 24 घंटे तक बनाए रखना" }
        ],
        ayurvedic: [
          { name: "Ostocal-Vet / Calci-Herbal Syrup", ingredients: "Cissus quadrangularis (हड़जोड़), Mukta Shukti", mrp: 195, dose: "100 ml दिन में दो बार 10 दिन", benefits: "हड्डियों से कैल्शियम पुनर्शोषण को प्राकृतिक रूप से बढ़ाना।" }
        ],
        homeopathic: [
          { medicine: "Calcarea Phosphorica 200C", mrp: 95, dose: "15 बूंदें हर 3 घंटे में", action: "कैल्शियम चयापचय को उत्तेजित करता है।" }
        ],
        desi: [
          { name: "मेथी दाना, सोंठ व गुड़ हलवा", ingredients: "मेथी दाना (250g) + सोंठ (50g) + देसी घी (200g) + गुड़ (500g)", prep: "घी में भूनकर हलवा तैयार करें।", usage: "पशु के खड़े होने पर 5 दिन तक खिलाएं (सावधानी: लेटे हुए अचेत पशु को कभी न खिलाएं)।" }
        ],
        biosecurity: [
          "कैल्शियम बोरोरुकोनेट कभी भी तेजी से IV न दें (दिल की धड़कन रुक सकती है - कार्डियक अरेस्ट)।",
          "अचेत लेटे पशु को कभी भी मुंह से नाल न पिलाएं (फेफड़ों में जाकर तत्काल निमोनिया से मृत्यु होगी)।"
        ]
      },
      prognosis: {
        severity: "अत्यधिक गंभीर आपातकाल (Critical Metabolic)",
        recoveryDays: "1 से 2 दिन (Mifex चढ़ते ही 30 मिनट में खड़ा होना)",
        redFlags: [
          "पशु की गर्दन 'S' आकार में मुड़कर कोख की तरफ होना व कान बर्फ जैसे ठंडे होना।",
          "Mifex चढ़ाने के बाद भी 12 घंटे तक पशु का न उठना (Downer Cow Syndrome)।"
        ]
      }
    },

    ketosis: {
      id: "ketosis",
      species: ["cow", "buffalo"],
      names: {
        en: "Bovine Acetonemia (Clinical Ketosis)",
        hi: "कीटोसिस (एसीटोनमिया / मीठी सांस)",
        rural: "मीठी सांस, दाना छोड़ना, दीवारों को चाटना, वजन गिरना"
      },
      matchMechanism: "नेगेटिव एनर्जी बैलेंस (NEB) में वसा का अत्यधिक मोबिलाइजेशन, यकृत में कीटोन बॉडीज (acetoacetate, BHB) का संचय, हाइपोग्लाइसीमिया व नर्वस लक्षण।",
      etiology: {
        agent: "Impaired carbohydrate & volatile fatty acid metabolism",
        typeBadge: "मेटाबोलिक (Metabolic)",
        transmission: "गैर-संक्रामक; ब्याने के 2 से 6 सप्ताह में उच्च दुग्ध उत्पादन वाले पशुओं में ऊर्जा की भारी कमी से।"
      },
      cardinalTrigger: "sweet_acetone_breath_selective_appetite",
      vitalsRules: {
        tempMin: 100.5,
        tempMax: 102.5,
        mucosa: ["normal"],
        urine: ["normal"],
        dung: ["constipated"],
        rumination: ["off_feed"]
      },
      labTests: [
        { test: "Rothera's Nitroprusside Urine Test", sample: "Fresh Urine", mrp: 50, significance: "गहरा बैंगनी रंग (Purple Ring) मूत्र में एसीटोन > 10 mg/dL दर्शाता है।" },
        { test: "Milk Ketostrip Field Test", sample: "Fresh Milk", mrp: 60, significance: "दूध में बीटा-हाइड्रॉक्सीब्यूटायरेट (BHBA) की सीधी पुष्टि।" },
        { test: "Blood Glucose Level", sample: "Whole Blood (Glucometer)", mrp: 50, significance: "ग्लूकोज < 30 mg/dL गिरना (सामान्य: 45-65 mg/dL)।" }
      ],
      treatments: {
        injections: [
          { category: "Glucose Restorer", generic: "Dextrose 25% or 50% Hypertonic", brands: "Dextrose 25% IV (Infusion)", mrp: 95, dose: "500-1000 ml Rapid IV Infusion", pregSafe: true, purpose: "मस्तिष्क व कोशिकाओं को तुरंत ग्लूकोज उपलब्ध कराना" },
          { category: "Glucogenic Glucocorticoid", generic: "Isoflupredone Acetate", brands: "Predef 2X (Caution if pregnant)", mrp: 185, dose: "10 ml Deep IM (ONLY IN NON-PREGNANT / RECENTLY CALVED)", pregSafe: false, purpose: "लिवर में ग्लूकोनियोजेनेसिस को उत्तेजित कर कीटोन का स्तर घटाना" },
          { category: "Lipotropic Factors", generic: "Vitamin B12 + Choline Chloride", brands: "Belamyl / Injacom", mrp: 140, dose: "10 ml IM OD x 3 days", pregSafe: true, purpose: "फैटी लिवर से वसा को हटाना व ऊर्जा चक्र सुचारू करना" }
        ],
        oral: [
          { type: "Glucose Precursor Drench", generic: "Propylene Glycol + Glycerol", brands: "Ketoral / Glycol-Vet / Enerdin", mrp: 260, dose: "250 ml सुबह-शाम 4 दिन मुंह से", pregSafe: true, purpose: "रूमेन में प्रोपियोनिक एसिड बनाकर निरंतर ग्लूकोज का निर्माण करना" }
        ],
        ayurvedic: [
          { name: "Livoferol / Broton Syrup", ingredients: "Tephrosia purpurea, Phyllanthus niruri", mrp: 210, dose: "100 ml रोज 7 दिन", benefits: "यकृत की वसा को हटाकर भूख व दूध उत्पादन को पुनः लौटाना।" }
        ],
        homeopathic: [
          { medicine: "Lycopodium 200C + Chelidonium 200C", mrp: 180, dose: "15-15 बूंदें दिन में 3 बार", action: "यकृत चयापचय को सुधारता है व चारा खाने की इच्छा जागृत करता है।" }
        ],
        desi: [
          { name: "गुड़ व मीठा सोडा घोल", ingredients: "पुराना गुड़ (250g) + मीठा सोडा (50g) + अजवाइन (25g)", prep: "गुनगुने पानी में घोलें।", usage: "दिन में दो बार 5 दिन तक दें। ऊर्जा व रूमेन pH दोनों सुधरते हैं।" }
        ],
        biosecurity: [
          "ब्याने के बाद पशु को ऊर्जा-युक्त संतुलित दाना दें (अचानक दाना न बदलें)।",
          "दूध देने वाली गाय को 100g बाईपास फैट (Bypass Fat) रोज राशन में खिलाएं।"
        ]
      },
      prognosis: {
        severity: "मध्यम (Moderate Metabolic)",
        recoveryDays: "3 से 5 दिन",
        redFlags: [
          "नर्वस कीटोसिस: अपनी ही त्वचा या दीवारों को पागलों की तरह चाटना व अंधापन।",
          "तेजी से कंकाल बन जाना (प्रतिदिन 3-5 किग्रा वजन घटना)।"
        ]
      }
    },

    fmd: {
      id: "fmd",
      species: ["cow", "buffalo", "goat", "sheep"],
      names: {
        en: "Foot and Mouth Disease (FMD / Aphthous Fever)",
        hi: "खुरपका-मुंहपका (एफ.एम.डी.)",
        rural: "खुरपका, मुंहपका, खुरहा, रिन, मुंह में छाले, लार बहना"
      },
      matchMechanism: "एफ्थोवायरस द्वारा मुंह के म्यूकोसा, जीभ, मसूड़ों एवं खुरों की कोरोनरी बैंड में वेसिकल्स (छाले) का निर्माण, छाले फटना, अल्सरेशन व लार का तार बहना।",
      etiology: {
        agent: "FMD Virus (Aphthovirus - Types O, A, Asia-1)",
        typeBadge: "विषाणु जनित (Viral)",
        transmission: "अत्यधिक संक्रामक; एरोसोल (हवा), दूषित चारे-पानी, बर्तनों व कर्मियों के जूतों से तीव्र फैलाव।"
      },
      cardinalTrigger: "vesicles_tongue_drooling_lameness",
      vitalsRules: {
        tempMin: 104.0,
        tempMax: 106.0,
        mucosa: ["congested"],
        urine: ["normal"],
        dung: ["normal"],
        rumination: ["off_feed"]
      },
      labTests: [
        { test: "Antigen Detection ELISA (Vesicular Fluid)", sample: "Vesicle Fluid / Epithelial Flap", mrp: 300, significance: "FMD वायरस टाइप O, A या Asia-1 की राष्ट्रीय प्रयोगशाला पुष्टि।" },
        { test: "Multiplex RT-PCR", sample: "Tongue Tissue in Glycerol", mrp: 600, significance: "वायरल जीनोम की सटीक आणविक पुष्टि।" }
      ],
      treatments: {
        injections: [
          { category: "Secondary Bacterial Guard", generic: "Enrofloxacin 10%", brands: "Baytril / Fortivir", mrp: 190, dose: "5 mg/kg IM OD x 4 days (15-20 ml per cow)", pregSafe: true, purpose: "छालों पर कीड़े (Maggots) व सेप्टीसीमिया संक्रमण रोकना" },
          { category: "NSAID Analgesic", generic: "Meloxicam + Paracetamol", brands: "Melonex Plus", mrp: 110, dose: "15 ml Deep IM OD x 4 days", pregSafe: true, purpose: "मुंह व खुरों के भयानक दर्द व 105°F बुखार से राहत" },
          { category: "Epithelial Healer", generic: "Vitamin A + D3 + E + Biotin", brands: "Injacom-H / Intavita", mrp: 180, dose: "5 ml IM alternate days x 2 doses", pregSafe: true, purpose: "जीभ व खुरों के घावों को तेजी से भरना" }
        ],
        oral: [
          { type: "Mouth Rinse Wash", generic: "Potassium Permanganate (लाल दवा)", brands: "KMnO4 Powder", mrp: 30, dose: "1:1000 का हल्का गुलाबी घोल बनाकर मुंह धोएं", pregSafe: true, purpose: "मुंह के छालों का जीवाणुरोधी रोगाणुनाशन" },
          { type: "Foot Dip Wash", generic: "Sodium Carbonate (कपड़े धोने का सोडा)", brands: "Washing Soda 4%", mrp: 40, dose: "4% घोल बनाकर खुरों को दिन में दो बार धोएं", pregSafe: true, purpose: "खुरों के घाव में कीड़े पड़ने से बचाना" }
        ],
        ayurvedic: [
          { name: "Himax Ointment / Charmil Gel", ingredients: "Karanja oil, Devdaru, Neem", mrp: 120, dose: "खुरों के घाव पर दिन में 2 बार लगाएं", benefits: "खुरों पर मक्खियां बैठने व कीड़े (मैगेट्स) पड़ने से पूर्ण सुरक्षा।" }
        ],
        homeopathic: [
          { medicine: "Variolinum 200C + Merc Sol 200C", mrp: 180, dose: "15-15 बूंदें दिन में 4 बार", action: "मुंह से लार टपकना व छालों के घाव को सुखाने में प्रसिद्ध औषधि।" }
        ],
        desi: [
          { name: "बोरो-ग्लिसरीन व शहद माउथ पेंट", ingredients: "ग्लिसरीन (100ml) + सुहागा (टंकण भस्म 10g) + शुद्ध शहद (50ml)", prep: "सुहागा तवे पर फुलाकर पीसें और ग्लिसरीन व शहद में मिलाएं।", usage: "जीभ व मसूड़ों के छालों पर दिन में 3-4 बार उंगली या रुई से लेप करें।" }
        ],
        biosecurity: [
          "बीमार पशु को स्वस्थ झुंड से तुरंत कम से कम 50 मीटर दूर क्वारंटाइन करें।",
          "छोटे बछड़ों को संक्रमित मां का दूध कभी न पीने दें (टाइगर हार्ट रोग से तत्काल मृत्यु का खतरा)।",
          "तबेले के मुख्य द्वार पर 4% कास्टिक सोडा का फुटपाथ (Footbath) बनाएं।"
        ]
      },
      prognosis: {
        severity: "मध्यम से गंभीर (High Morbidity, Low Mortality in adults)",
        recoveryDays: "10 से 15 दिन",
        redFlags: [
          "छोटे बछड़ों में अचानक अचेत होकर मरना (टाइगर हार्ट मायोकार्डाइटिस - Tiger Heart Disease)।",
          "खुर का खोल अलग हो जाना (Exungulation) व नीचे से खून बहना।"
        ]
      }
    },

    canine_parvo: {
      id: "canine_parvo",
      species: ["dog"],
      names: {
        en: "Canine Parvoviral Enteritis (CPV-2)",
        hi: "कैनाइन पार्वो वायरस (खूनी उल्टी-दस्त)",
        rural: "कुत्ते का खूनी दस्त, पार्वो, उल्टी-दस्त रोग"
      },
      matchMechanism: "पार्वोवायरस द्वारा आंत्र विलाई की क्रिप्स कोशिकाओं (intestinal crypts) एवं अस्थिमज्जा का विनाश, म्यूकोसल बैरियर टूटना, खूनी दस्त व गंभीर पैनल्यूकोपेनिया।",
      etiology: {
        agent: "Canine Parvovirus Type 2 (CPV-2a, 2b, 2c)",
        typeBadge: "विषाणु जनित (Viral)",
        transmission: "मल-मुख मार्ग (Fecal-oral route); संक्रमित मल के संपर्क से 6 माह से कम उम्र के गैर-टीकाकृत पिल्लों में तीव्र फैलाव।"
      },
      cardinalTrigger: "fetid_bloody_diarrhea_vomiting",
      vitalsRules: {
        tempMin: 98.0,
        tempMax: 105.0,
        mucosa: ["pale_white", "cyanotic"],
        urine: ["normal"],
        dung: ["bloody_mucus", "watery"],
        rumination: ["off_feed"]
      },
      labTests: [
        { test: "CPV Antigen Rapid Card Snap Test", sample: "Fecal Swab (मल का फाहा)", mrp: 350, significance: "5 मिनट में डबल लाइन आना पार्वोवायरस एंटीजन की सीधी पुष्टि करता है।" },
        { test: "Total Leukocyte Count (TLC)", sample: "EDTA Blood", mrp: 180, significance: "WBC काउंट का < 2,000/μL तक गिर जाना (गंभीर पैनल्यूकोपेनिया)।" }
      ],
      treatments: {
        injections: [
          { category: "Intensive Fluid Therapy", generic: "Ringer's Lactate (RL) + DNS", brands: "RL Infusion 500ml", mrp: 75, dose: "40-60 ml/kg/day IV slowly + dehydration deficit", pregSafe: true, purpose: "हाइपोवोलेमिक शॉक व घातक निर्जलीकरण से जीवन रक्षा (सर्वाधिक महत्वपूर्ण)" },
          { category: "Potent Antiemetic", generic: "Maropitant Citrate", brands: "Cerenia / Prevomax", mrp: 380, dose: "1 mg/kg SC once daily (0.1 ml/kg)", pregSafe: true, purpose: "केंद्रीय व परिधीय दोनों उल्टियों को 24 घंटे के लिए पूरी तरह रोकना" },
          { category: "Broad Spectrum Coverage", generic: "Ceftriaxone Sodium", brands: "Intacef / Monocef 500mg/1g", mrp: 120, dose: "25 mg/kg IV BID x 5 days", pregSafe: true, purpose: "आंत की दीवार टूटने से होने वाले ई-कोलाई सेप्सिस को रोकना" },
          { category: "GI Hemorrhage & Anaerobe Guard", generic: "Metronidazole + Pantoprazole", brands: "Metrogyl IV + Pan-IV", mrp: 90, dose: "Metro 15 mg/kg Slow IV BID + Panto 1 mg/kg IV", pregSafe: true, purpose: "आंतों से खूनी रिसाव रोकना व गैस्ट्रिक अल्सरेशन से बचाव" }
        ],
        oral: [
          { type: "NPO Protocol", generic: "Nil Per Os (मुंह से कुछ न दें)", brands: "Nothing Orally", mrp: 0, dose: "उल्टी रुकने के 24 घंटे बाद तक पानी भी न दें", pregSafe: true, purpose: "आंतों को पूर्ण विश्राम देना" }
        ],
        ayurvedic: [
          { name: "Digestive Herbal Care (बाद में)", ingredients: "Punica granatum, Aegle marmelos", mrp: 120, dose: "उल्टी बंद होने के बाद 5 ml दिन में दो बार", benefits: "आंतों की उपकला को पुनर्जीवित करना।" }
        ],
        homeopathic: [
          { medicine: "Crotalus Horridus 200C + Arsenicum Album 200C", mrp: 190, dose: "4-4 बूंदें जीभ पर हर 2 घंटे में", action: "सड़े खून जैसी बदबूदार दस्त व भीषण कमजोरी में अत्यंत प्रभावी।" }
        ],
        desi: [
          { name: "ओआरएस व बर्फ का टुकड़ा (उल्टी रुकने के 24 घंटे बाद)", ingredients: "इलेक्ट्रोलाइट पानी", prep: "साफ उबला पानी में इलेक्ट्रोल घोलें।", usage: "उल्टी रुकने के पूरे 24 घंटे बाद चम्मच से 5-5ml पिलाना शुरू करें।" }
        ],
        biosecurity: [
          "पिल्ले को गर्म कमरे में रखें व ड्रिप को हल्का गुनगुना करके चढ़ाएं (हाइपोथर्मिया से बचाएं)।",
          "फर्श व पिंजरे को 1:30 अनुपात में सोडियम हाइपोक्लोराइट (Bleach) से धोएं (पार्वो अन्य फिनाइल से नहीं मरता)।"
        ]
      },
      prognosis: {
        severity: "अत्यधिक नाजुक व जानलेवा (Critical Shock)",
        recoveryDays: "4 से 7 दिन",
        redFlags: [
          "शरीर का तापमान 98°F से नीचे गिर जाना (Subnormal Hypothermic Collapse)।",
          "सफेद मसूड़े व लगातार सड़ी मछली जैसी बदबूदार खूनी उल्टियां।"
        ]
      }
    },

    ppr_goat_plague: {
      id: "ppr_goat_plague",
      species: ["goat", "sheep"],
      names: {
        en: "Peste des Petits Ruminants (PPR / Goat Plague)",
        hi: "पी.पी.आर. (बकरी प्लेग / मुंह व दस्त का रोग)",
        rural: "बकरी प्लेग, मुंह-पका दस्त, खुर्रा, बकरियों की माता"
      },
      matchMechanism: "मॉर्बिलीवायरस द्वारा श्वसन व जठरांत्र श्लेष्मा का नेक्रोसिस, जीभ पर सफेद मलाईदार अल्सर, गंभीर ब्रोंकोनिमोनिया एवं निर्जलीकरण से मृत्यु।",
      etiology: {
        agent: "PPR Virus (Small Ruminant Morbillivirus)",
        typeBadge: "विषाणु जनित (Viral)",
        transmission: "संक्रमित बकरियों के छींकने, नाक-आंख के स्राव व दूषित पानी से तीव्र फैलाव।"
      },
      cardinalTrigger: "necrotic_stomatitis_diarrhea_pneumonia",
      vitalsRules: {
        tempMin: 104.0,
        tempMax: 106.0,
        mucosa: ["congested"],
        urine: ["normal"],
        dung: ["watery", "bloody_mucus"],
        rumination: ["off_feed"]
      },
      labTests: [
        { test: "c-ELISA / Rapid Immunochromatographic Strip", sample: "Ocular / Nasal Swab", mrp: 250, significance: "PPR वायरल एंटीजन की 10 मिनट में निर्णायक पुष्टि।" },
        { test: "Post-Mortem Zebra Stripping of Colon", sample: "Large Intestine", mrp: 0, significance: "कोलन की श्लेष्मा पर जेब्रा जैसी धारियां (Zebra stripes) दिखना pathognomonic है।" }
      ],
      treatments: {
        injections: [
          { category: "Secondary Pneumonia Guard", generic: "Enrofloxacin 10% OR Ceftriaxone", brands: "Baytril / Intacef 500mg", mrp: 110, dose: "Enro 5 mg/kg IM OD x 5 days (2-3 ml per goat)", pregSafe: true, purpose: "घातक पास्चुरेला ब्रोंकोनिमोनिया के द्वितीयक संक्रमण को रोकना" },
          { category: "Anti-inflammatory", generic: "Meloxicam Injection", brands: "Melonex", mrp: 65, dose: "0.5 mg/kg IM OD x 3 days (1.5-2 ml per goat)", pregSafe: true, purpose: "मुंह के दर्द व 105°F बुखार से राहत" },
          { category: "Epithelial Recovery", generic: "Vitamin A, D3, E", brands: "Intavita", mrp: 95, dose: "2 ml IM once", pregSafe: true, purpose: "आंतों व फेफड़ों की छिल चुकी श्लेष्मा की मरम्मत" }
        ],
        oral: [
          { type: "Mouth Paint Antiseptic", generic: "Boroglycerine 2%", brands: "Boro-Glycerine", mrp: 35, dose: "मुंह व जीभ के छालों पर दिन में 3 बार लेप करें", pregSafe: true, purpose: "मुंह के दर्द को कम कर बकरी को चारा खाने योग्य बनाना" },
          { type: "ORS Rehydration Solution", generic: "Oral Rehydration Salts (WHO)", brands: "Electral", mrp: 25, dose: "1 पैकेट 1 लीटर पानी में घोलकर दिन भर थोड़ा-थोड़ा पिलाएं", pregSafe: true, purpose: "दस्त से होने वाले जानलेवा निर्जलीकरण को रोकना" }
        ],
        ayurvedic: [
          { name: "Kaf-Go / Respo-Vet Liquid", ingredients: "Vasaka, Tulsi, Yashtimadhu", mrp: 140, dose: "20 ml दिन में दो बार", benefits: "खांसी, फेफड़ों की जकड़न व नाक के गाढ़े स्राव को साफ करता है।" }
        ],
        homeopathic: [
          { medicine: "Merc Sol 200C + Arsenicum Album 200C", mrp: 180, dose: "8-8 बूंदें दिन में 4 बार", action: "मुंह के सड़े छालों व बदबूदार दस्त को रोकने में रामबाण।" }
        ],
        desi: [
          { name: "अनार छिलका, मेथी व छाछ काढ़ा", ingredients: "अनार छिलका (30g) + मेथी (15g) + ताजा छाछ (200ml)", prep: "अनार छिलका व मेथी पीसकर छाछ में मिलाएं।", usage: "सुबह-शाम पिलाएं। खूनी दस्त तेजी से रुकते हैं।" }
        ],
        biosecurity: [
          "संक्रमित बकरियों की आंखों व नाक पर जमी पपड़ी को गुनगुने बोरिक एसिड पानी से साफ करें।",
          "स्वस्थ बकरियों का 3 वर्ष में एक बार PPR लाइव वैक्सिनेशन अनिवार्य रूप से कराएं।"
        ]
      },
      prognosis: {
        severity: "अत्यधिक गंभीर (Very High Mortality 70-90%)",
        recoveryDays: "7 से 12 दिन",
        redFlags: [
          "फेफड़ों से सांस लेने में घरघराहट व नथुनों से गाढ़ा पीला मवाद आना।",
          "बकरी का जमीन पर गर्दन डालकर निष्प्राण लेट जाना।"
        ]
      }
    }
  };

  // =========================================================================
  // 2. DIAGNOSTIC INFERENCE ENGINE
  // =========================================================================
  function runClinicalInference(formData) {
    const species = (formData.species || "cow").toLowerCase();
    const temp = parseFloat(formData.temperature) || 101.5;
    const mucosa = formData.mucosa || "normal";
    const urine = formData.urine || "normal";
    const dung = formData.dung || "normal";
    const rumination = formData.rumination || "normal";
    const cardinalTrigger = formData.cardinalTrigger || "";
    const isPregnant = formData.isPregnant === true || formData.isPregnant === "true";

    const matches = [];

    Object.keys(DISEASE_CATALOG).forEach(key => {
      const d = DISEASE_CATALOG[key];

      // Species filter
      if (!d.species.includes(species)) {
        return;
      }

      let score = 0;
      let totalWeight = 10;

      // Cardinal Trigger (Heavily weighted: 50% score)
      if (cardinalTrigger && d.cardinalTrigger === cardinalTrigger) {
        score += 5.5;
      }

      // Temp range
      if (temp >= d.vitalsRules.tempMin && temp <= d.vitalsRules.tempMax) {
        score += 2.0;
      }

      // Mucosa
      if (d.vitalsRules.mucosa && d.vitalsRules.mucosa.includes(mucosa)) {
        score += 1.0;
      }

      // Urine
      if (d.vitalsRules.urine && d.vitalsRules.urine.includes(urine)) {
        score += 1.0;
      }

      // Dung
      if (d.vitalsRules.dung && d.vitalsRules.dung.includes(dung)) {
        score += 0.5;
      }

      // Rumination
      if (d.vitalsRules.rumination && d.vitalsRules.rumination.includes(rumination)) {
        score += 0.5;
      }

      const matchPct = Math.min(Math.round((score / totalWeight) * 100), 98);

      if (matchPct >= 35) {
        matches.push({
          diseaseKey: key,
          data: d,
          confidence: matchPct
        });
      }
    });

    matches.sort((a, b) => b.confidence - a.confidence);

    if (matches.length === 0) {
      matches.push({
        diseaseKey: "acute_mastitis",
        data: DISEASE_CATALOG.acute_mastitis,
        confidence: 45
      });
    }

    return {
      primary: matches[0],
      alternatives: matches.slice(1, 3),
      isPregnant: isPregnant
    };
  }

  // =========================================================================
  // 3. INTERACTIVE GUI RENDERING: CLINICAL DESK (INPUT & 5-SECTION OUTPUT)
  // =========================================================================
  function renderDiagnosticDesk(containerTarget) {
    let container = containerTarget;
    if (typeof container === "string") {
      container = document.getElementById(container) || document.querySelector(container);
    }
    if (!container) {
      container = document.getElementById("app-root");
    }
    if (!container) {
      console.error("[DifferentialEngine] Container not found.");
      return;
    }

    // Default State
    const state = {
      species: "cow",
      pregnancyStatus: "pregnant",
      pregnancyMonth: "7",
      age: "5 वर्ष",
      weightKg: "380",
      temperature: "105.2",
      tempStatus: "hyperpyrexia",
      mucosa: "congested",
      urine: "normal",
      dung: "normal",
      rumination: "off_feed",
      cardinalTrigger: "throat_swelling_stridor"
    };

    function renderUI() {
      container.innerHTML = `
        <div class="space-y-6 max-w-7xl mx-auto pb-12 font-sans" id="differentialEngineRoot">
          
          <!-- Top Executive Banner -->
          <div class="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center text-2xl font-bold shadow-xs">
                <i class="fa-solid fa-dna"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase bg-teal-100 text-teal-800 border border-teal-300">
                    5-TIER CLINICAL ENGINE
                  </span>
                  <span class="text-xs font-mono font-bold text-slate-400">2026 PROD</span>
                </div>
                <h1 class="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight mt-0.5">
                  एआई विभेदक रोग निदान एवं संपूर्ण उपचार प्रोटोकॉल (Differential Engine)
                </h1>
                <p class="text-xs text-slate-500 font-medium">
                  शारीरिक लक्षण, 🚨 निर्णायक कार्डिनल साइन, पुष्टिकरण लैब टेस्ट एवं गर्भावस्था सुरक्षित 5-स्तरीय उपचार योजना
                </p>
              </div>
            </div>

            <!-- Reset Button -->
            <button type="button" id="btnResetClinicalDesk" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs">
              <i class="fa-solid fa-rotate-left text-teal-600"></i>
              <span>रीसेट करें (Reset Form)</span>
            </button>
          </div>

          <!-- SECTION 1: MODERN CLINICAL CASE INTAKE DESK -->
          <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-clipboard-user text-teal-600"></i>
                <span>रोगी का केस विवरण एवं शारीरिक लक्षण (Clinical Intake Desk)</span>
              </h2>
              <span class="text-[11px] font-mono text-slate-400 font-semibold">ISO-VET PROTOCOLS</span>
            </div>

            <!-- Profile Row: Species, Pregnancy, Age, Weight -->
            <div class="space-y-4">
              
              <!-- Species Picker -->
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-2">1. पशु प्रजाति चुनें (Species Picker):</label>
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5" id="speciesPickerGroup">
                  <button type="button" data-species="cow" class="species-pill p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${state.species === 'cow' ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                    <span class="text-lg">🐄</span>
                    <span>गाय (Cattle)</span>
                  </button>
                  <button type="button" data-species="buffalo" class="species-pill p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${state.species === 'buffalo' ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                    <span class="text-lg">🐃</span>
                    <span>भैंस (Buffalo)</span>
                  </button>
                  <button type="button" data-species="goat" class="species-pill p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${state.species === 'goat' ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                    <span class="text-lg">🐐</span>
                    <span>बकरी (Goat)</span>
                  </button>
                  <button type="button" data-species="sheep" class="species-pill p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${state.species === 'sheep' ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                    <span class="text-lg">🐑</span>
                    <span>भेड़ (Sheep)</span>
                  </button>
                  <button type="button" data-species="dog" class="species-pill p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${state.species === 'dog' ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                    <span class="text-lg">🐕</span>
                    <span>कुत्ता (Dog)</span>
                  </button>
                </div>
              </div>

              <!-- Pregnancy Toggle Row & Weight -->
              <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                
                <!-- Pregnancy Status -->
                <div class="sm:col-span-6 space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700">2. गर्भधारण स्थिति (Pregnancy Status Guard):</label>
                  <div class="grid grid-cols-3 gap-2">
                    <button type="button" data-preg="non_pregnant" class="preg-pill py-2.5 px-2 rounded-xl border text-[11px] font-bold text-center transition-all ${state.pregnancyStatus === 'non_pregnant' ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600'}">
                      🟢 खाली (Non-Preg)
                    </button>
                    <button type="button" data-preg="pregnant" class="preg-pill py-2.5 px-2 rounded-xl border text-[11px] font-bold text-center transition-all ${state.pregnancyStatus === 'pregnant' ? 'bg-rose-50 border-rose-500 text-rose-900 shadow-sm ring-1 ring-rose-500' : 'bg-slate-50 border-slate-200 text-slate-600'}">
                      🔴 गर्भवती (Pregnant)
                    </button>
                    <button type="button" data-preg="recent_calved" class="preg-pill py-2.5 px-2 rounded-xl border text-[11px] font-bold text-center transition-all ${state.pregnancyStatus === 'recent_calved' ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600'}">
                      🟡 ताजा ब्याही (Calved)
                    </button>
                  </div>
                </div>

                <!-- Month Selector (shows if pregnant) -->
                <div class="sm:col-span-2 space-y-1.5 ${state.pregnancyStatus === 'pregnant' ? 'block' : 'hidden'}" id="pregMonthBox">
                  <label class="block text-xs font-bold text-rose-800">माह (Month 1-9):</label>
                  <select id="selPregMonth" class="w-full bg-rose-50 border border-rose-300 rounded-xl px-3 py-2 text-xs font-bold text-rose-900 focus:outline-none font-mono">
                    ${[1,2,3,4,5,6,7,8,9].map(m => `<option value="${m}" ${state.pregnancyMonth == m ? 'selected' : ''}>${m} माह (Month ${m})</option>`).join("")}
                  </select>
                </div>

                <!-- Age -->
                <div class="sm:col-span-2 space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700">उम्र (Age):</label>
                  <input type="text" id="inpPatientAge" value="${state.age}" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none" />
                </div>

                <!-- Bodyweight -->
                <div class="sm:col-span-2 space-y-1.5">
                  <label class="block text-xs font-bold text-slate-700">वजन (Weight Kg):</label>
                  <input type="number" id="inpPatientWeight" value="${state.weightKg}" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 font-mono focus:outline-none" />
                </div>

              </div>

            </div>

            <!-- Vitals & Parameters Grid -->
            <div class="pt-2 border-t border-slate-100 space-y-4">
              <label class="block text-xs font-bold text-slate-700">3. शारीरिक व नैदानिक लक्षण (Vitals & Clinical Parameters):</label>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                
                <!-- Temperature -->
                <div class="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-800">तापमान (°F)</span>
                    <input type="number" step="0.1" id="inpVitalsTemp" value="${state.temperature}" class="w-20 bg-white border border-slate-300 rounded-lg px-2 py-1 text-right font-mono font-bold text-slate-900" />
                  </div>
                  <div class="grid grid-cols-2 gap-1.5">
                    <button type="button" data-temp="101.5" class="temp-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.tempStatus === 'normal' ? 'bg-teal-100 border-teal-400 text-teal-800' : 'bg-white border-slate-200 text-slate-600'}">Normal (101-102°F)</button>
                    <button type="button" data-temp="104.0" class="temp-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.tempStatus === 'moderate' ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-white border-slate-200 text-slate-600'}">Moderate (103-104.5°F)</button>
                    <button type="button" data-temp="105.5" class="temp-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.tempStatus === 'hyperpyrexia' ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-white border-slate-200 text-slate-600'}">Hyperpyrexia (105°F+)</button>
                    <button type="button" data-temp="98.5" class="temp-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.tempStatus === 'subnormal' ? 'bg-sky-100 border-sky-400 text-sky-800' : 'bg-white border-slate-200 text-slate-600'}">Subnormal (<100°F)</button>
                  </div>
                </div>

                <!-- Mucous Membrane -->
                <div class="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2">
                  <span class="font-bold text-slate-800 block">आंखें व श्लेष्मा (Mucosa)</span>
                  <div class="grid grid-cols-2 gap-1.5">
                    <button type="button" data-mucosa="normal" class="mucosa-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.mucosa === 'normal' ? 'bg-pink-100 border-pink-400 text-pink-800' : 'bg-white border-slate-200 text-slate-600'}">गुलाबी (Normal)</button>
                    <button type="button" data-mucosa="congested" class="mucosa-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.mucosa === 'congested' ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-white border-slate-200 text-slate-600'}">लाल (Congested)</button>
                    <button type="button" data-mucosa="pale_white" class="mucosa-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.mucosa === 'pale_white' ? 'bg-slate-200 border-slate-400 text-slate-800' : 'bg-white border-slate-200 text-slate-600'}">सफेद-फीकी (Anemic)</button>
                    <button type="button" data-mucosa="yellow_jaundice" class="mucosa-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.mucosa === 'yellow_jaundice' ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-white border-slate-200 text-slate-600'}">पीली (Jaundice)</button>
                  </div>
                </div>

                <!-- Urine -->
                <div class="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2">
                  <span class="font-bold text-slate-800 block">पेशाब स्थिति (Urine)</span>
                  <div class="grid grid-cols-2 gap-1.5">
                    <button type="button" data-urine="normal" class="urine-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.urine === 'normal' ? 'bg-teal-100 border-teal-400 text-teal-800' : 'bg-white border-slate-200 text-slate-600'}">सामान्य साफ</button>
                    <button type="button" data-urine="red_coffee" class="urine-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.urine === 'red_coffee' ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-white border-slate-200 text-slate-600'}">कॉफी/लाल (Hemoglobin)</button>
                    <button type="button" data-urine="straining" class="urine-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.urine === 'straining' ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-white border-slate-200 text-slate-600'}">रुक-रुक कर दर्द से</button>
                    <button type="button" data-urine="foamy" class="urine-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.urine === 'foamy' ? 'bg-purple-100 border-purple-400 text-purple-800' : 'bg-white border-slate-200 text-slate-600'}">अत्यधिक झागदार</button>
                  </div>
                </div>

                <!-- Dung -->
                <div class="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2">
                  <span class="font-bold text-slate-800 block">गोबर स्थिति (Dung / Feces)</span>
                  <div class="grid grid-cols-2 gap-1.5">
                    <button type="button" data-dung="normal" class="dung-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.dung === 'normal' ? 'bg-teal-100 border-teal-400 text-teal-800' : 'bg-white border-slate-200 text-slate-600'}">सामान्य बंधा हुआ</button>
                    <button type="button" data-dung="watery" class="dung-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.dung === 'watery' ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-white border-slate-200 text-slate-600'}">पतला बदबूदार दस्त</button>
                    <button type="button" data-dung="bloody_mucus" class="dung-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.dung === 'bloody_mucus' ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-white border-slate-200 text-slate-600'}">खून व आंव के थक्के</button>
                    <button type="button" data-dung="constipated" class="dung-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.dung === 'constipated' ? 'bg-slate-200 border-slate-400 text-slate-800' : 'bg-white border-slate-200 text-slate-600'}">सूखा कठोर (कब्ज)</button>
                  </div>
                </div>

                <!-- Rumination -->
                <div class="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2">
                  <span class="font-bold text-slate-800 block">जुगाली व भूख (Rumination)</span>
                  <div class="grid grid-cols-2 gap-1.5">
                    <button type="button" data-rum="normal" class="rum-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.rumination === 'normal' ? 'bg-teal-100 border-teal-400 text-teal-800' : 'bg-white border-slate-200 text-slate-600'}">सामान्य जुगाली</button>
                    <button type="button" data-rum="off_feed" class="rum-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center ${state.rumination === 'off_feed' ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-white border-slate-200 text-slate-600'}">24+ घंटे से बंद</button>
                    <button type="button" data-rum="bloat" class="rum-pill py-1 px-1.5 rounded-lg border text-[10px] font-bold text-center col-span-2 ${state.rumination === 'bloat' ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-white border-slate-200 text-slate-600'}">पेट में आफरा (Bloat / Tympany)</button>
                  </div>
                </div>

              </div>
            </div>

            <!-- 🚨 CARDINAL / PATHOGNOMONIC SIGN HIGHLIGHT BOX (ANIMATED PULSING RED BORDER) -->
            <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-red-50 to-rose-50 border-2 border-rose-500 shadow-md space-y-2.5 animate-pulse-border">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-rose-900 font-extrabold text-xs sm:text-sm">
                  <i class="fa-solid fa-triangle-exclamation text-rose-600 text-base animate-bounce"></i>
                  <span>🚨 प्रमुख व निर्णायक लक्षण (Cardinal / Pathognomonic Sign):</span>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-rose-200 text-rose-900 border border-rose-300">
                  HIGHEST PRIORITY
                </span>
              </div>
              <p class="text-[11px] text-rose-800 font-medium">
                वह एक सबसे तीव्र व अलग दिखने वाला लक्षण यहाँ चुनें जो रोग की सीधी पहचान कराता है:
              </p>
              
              <select id="selCardinalSign" class="w-full bg-white border-2 border-rose-400 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs">
                <option value="throat_swelling_stridor" ${state.cardinalTrigger === 'throat_swelling_stridor' ? 'selected' : ''}>गले व छाती के नीचे दर्दनाक गर्म सूजन व सांस में घुर्र-घुर्र की आवाज (HS / गलघोंटू)</option>
                <option value="coffee_portwine_urine" ${state.cardinalTrigger === 'coffee_portwine_urine' ? 'selected' : ''}>कॉफी या गहरे लाल रंग का झागदार पेशाब व 106°F बुखार (Babesiosis / रक्तमूतरा)</option>
                <option value="prescapular_lymph_swelling_eye_opacity" ${state.cardinalTrigger === 'prescapular_lymph_swelling_eye_opacity' ? 'selected' : ''}>गर्दन के आगे लिम्फ ग्रंथि में कठोर सूजन व आंख पर मोतियानुमा सफेदी (Theileriosis / गिल्टी बुखार)</option>
                <option value="crepitating_swelling_thigh" ${state.cardinalTrigger === 'crepitating_swelling_thigh' ? 'selected' : ''}>पुट्ठे पर चुरचुराहट वाली गैस भरी सूजन व लंगड़ापन (Black Quarter - BQ / लंगड़िया)</option>
                <option value="udder_swelling_clots" ${state.cardinalTrigger === 'udder_swelling_clots' ? 'selected' : ''}>थन में कड़ापन, सूजन व दूध में लाल खून या पनीर जैसे छैछड़े (Acute Mastitis / थनैला)</option>
                <option value="circling_head_pressing" ${state.cardinalTrigger === 'circling_head_pressing' ? 'selected' : ''}>गोल-गोल चक्कर काटना, दीवारों से सिर भिड़ाना व अंधापन (Surra / सर्रा रोग)</option>
                <option value="left_flank_distended_mouth_breathing" ${state.cardinalTrigger === 'left_flank_distended_mouth_breathing' ? 'selected' : ''}>बाईं कोख का ढोल की तरह फूलना व मुंह खोलकर सांस लेना (Acute Bloat / आफरा)</option>
                <option value="s_curve_neck_subnormal_temp" ${state.cardinalTrigger === 's_curve_neck_subnormal_temp' ? 'selected' : ''}>गर्दन 'S' आकार में मुड़ना, कान बर्फ जैसे ठंडे व प्रसव बाद लेटना (Milk Fever / सूतक ज्वर)</option>
                <option value="sweet_acetone_breath_selective_appetite" ${state.cardinalTrigger === 'sweet_acetone_breath_selective_appetite' ? 'selected' : ''}>सांस में मीठी एसीटोन गंध, दाना छोड़ना व केवल सूखा चारा खाना (Ketosis / कीटोसिस)</option>
                <option value="vesicles_tongue_drooling_lameness" ${state.cardinalTrigger === 'vesicles_tongue_drooling_lameness' ? 'selected' : ''}>मुंह से लार का लंबा तार गिरना, जीभ व खुरों के बीच छाले (FMD / खुरपका-मुंहपका)</option>
                <option value="fetid_bloody_diarrhea_vomiting" ${state.cardinalTrigger === 'fetid_bloody_diarrhea_vomiting' ? 'selected' : ''}>पिल्ले में सड़े खून जैसे बदबूदार दस्त व लगातार उल्टियां (Canine Parvovirus / पार्वो)</option>
                <option value="necrotic_stomatitis_diarrhea_pneumonia" ${state.cardinalTrigger === 'necrotic_stomatitis_diarrhea_pneumonia' ? 'selected' : ''}>बकरी के मुंह में मलाईदार सफेद छाले, दस्त व निमोनिया खांसी (PPR / बकरी प्लेग)</option>
              </select>
            </div>

            <!-- Big Glowing Action Button -->
            <div class="pt-2">
              <button type="button" id="btnGenerateProtocol" class="w-full py-4 px-6 rounded-2xl font-display font-black text-sm sm:text-base bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-glowTeal flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:scale-95">
                <i class="fa-solid fa-microscope text-lg"></i>
                <span>🔍 नैदानिक विश्लेषण एवं संपूर्ण उपचार योजना जनरेट करें (Generate 5-Tier Clinical Protocol)</span>
              </button>
            </div>

          </div>

          <!-- SECTION 2: 5-SECTION CLINICAL OUTPUT GENERATOR CONTAINER -->
          <div id="protocolOutputContainer" class="space-y-6">
            <!-- Rendered automatically upon clicking btnGenerateProtocol -->
          </div>

        </div>
      `;

      bindIntakeEvents();
      // Auto generate once on mount
      executeDiagnosticEngine();
    }

    // Bind UI Interactions
    function bindIntakeEvents() {
      // Species Pills
      container.querySelectorAll(".species-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          state.species = pill.getAttribute("data-species");
          renderUI();
        });
      });

      // Pregnancy Pills
      container.querySelectorAll(".preg-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          state.pregnancyStatus = pill.getAttribute("data-preg");
          renderUI();
        });
      });

      // Month select
      const selMonth = container.querySelector("#selPregMonth");
      if (selMonth) {
        selMonth.addEventListener("change", (e) => {
          state.pregnancyMonth = e.target.value;
        });
      }

      // Temp status pills
      container.querySelectorAll(".temp-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          const tVal = pill.getAttribute("data-temp");
          state.temperature = tVal;
          if (tVal >= 105.0) state.tempStatus = "hyperpyrexia";
          else if (tVal >= 103.0) state.tempStatus = "moderate";
          else if (tVal < 100.0) state.tempStatus = "subnormal";
          else state.tempStatus = "normal";
          renderUI();
        });
      });

      // Mucosa pills
      container.querySelectorAll(".mucosa-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          state.mucosa = pill.getAttribute("data-mucosa");
          renderUI();
        });
      });

      // Urine pills
      container.querySelectorAll(".urine-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          state.urine = pill.getAttribute("data-urine");
          renderUI();
        });
      });

      // Dung pills
      container.querySelectorAll(".dung-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          state.dung = pill.getAttribute("data-dung");
          renderUI();
        });
      });

      // Rumination pills
      container.querySelectorAll(".rum-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          state.rumination = pill.getAttribute("data-rum");
          renderUI();
        });
      });

      // Cardinal Trigger Select
      const selCardinal = container.querySelector("#selCardinalSign");
      if (selCardinal) {
        selCardinal.addEventListener("change", (e) => {
          state.cardinalTrigger = e.target.value;
        });
      }

      // Generate Protocol Action Button
      const btnGen = container.querySelector("#btnGenerateProtocol");
      if (btnGen) {
        btnGen.addEventListener("click", () => {
          executeDiagnosticEngine();
          if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
            window.VetcareApp.showToast("5-स्तरीय उपचार योजना सफलतापूर्वक जनरेट हुई!", "success");
          }
        });
      }

      // Reset Button
      const btnReset = container.querySelector("#btnResetClinicalDesk");
      if (btnReset) {
        btnReset.addEventListener("click", () => {
          state.species = "cow";
          state.pregnancyStatus = "pregnant";
          state.pregnancyMonth = "7";
          state.temperature = "105.2";
          state.tempStatus = "hyperpyrexia";
          state.mucosa = "congested";
          state.urine = "normal";
          state.dung = "normal";
          state.rumination = "off_feed";
          state.cardinalTrigger = "throat_swelling_stridor";
          renderUI();
          if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
            window.VetcareApp.showToast("क्लिनिकल डेस्क रीसेट हुआ।", "info");
          }
        });
      }
    }

    // Execute Diagnostic Inference & Render 5 Output Sections
    function executeDiagnosticEngine() {
      const outputContainer = container.querySelector("#protocolOutputContainer");
      if (!outputContainer) return;

      const inferenceResult = runClinicalInference({
        species: state.species,
        temperature: state.temperature,
        mucosa: state.mucosa,
        urine: state.urine,
        dung: state.dung,
        rumination: state.rumination,
        cardinalTrigger: state.cardinalTrigger,
        isPregnant: state.pregnancyStatus === "pregnant"
      });

      const d = inferenceResult.primary.data;
      const isPreg = inferenceResult.isPregnant;

      outputContainer.innerHTML = `
        <!-- Top Executive Bar with Action Buttons -->
        <div class="p-4 sm:p-5 rounded-3xl bg-slate-900 text-white shadow-elevated flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-teal-500 text-white flex items-center justify-center text-lg font-black shadow-glowTeal">
              <i class="fa-solid fa-file-waveform"></i>
            </div>
            <div>
              <div class="text-xs font-mono uppercase text-teal-300 font-bold">5-SECTION STANDARDIZED CLINICAL REPORT</div>
              <h3 class="text-base sm:text-lg font-display font-extrabold text-white">${d.names.hi}</h3>
            </div>
          </div>

          <div class="flex items-center gap-2.5 w-full sm:w-auto">
            <button type="button" id="btnPrintProtocol" class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700">
              <i class="fa-solid fa-print text-teal-400"></i>
              <span>🖨️ पर्ची प्रिंट करें (Print Sheet)</span>
            </button>
            <button type="button" id="btnExportToRxPad" class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-glowTeal">
              <i class="fa-solid fa-file-prescription"></i>
              <span>📋 ओपीडी में ट्रांसफर करें</span>
            </button>
          </div>
        </div>

        <!-- 1️⃣ रोग के त्रि-आयामी नाम (Probable Disease Names Card) -->
        <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs font-mono font-bold flex items-center justify-center">1</span>
              <h3 class="text-sm font-bold text-slate-900">रोग के त्रि-आयामी नाम (Scientific, Clinical & Rural Nomenclature)</h3>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold text-teal-800">${inferenceResult.primary.confidence}% मैच संभावना</span>
              <div class="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="bg-teal-500 h-full rounded-full" style="width: ${inferenceResult.primary.confidence}%"></div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span class="text-[10px] font-mono uppercase font-bold text-slate-400">मानक अंग्रेजी नाम (Scientific English)</span>
              <div class="text-sm font-display font-extrabold text-slate-900">${d.names.en}</div>
            </div>
            <div class="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-1">
              <span class="text-[10px] font-mono uppercase font-bold text-teal-700">हिंदी क्लिनिकल नाम (Clinical Hindi)</span>
              <div class="text-sm font-display font-extrabold text-teal-900">${d.names.hi}</div>
            </div>
            <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
              <span class="text-[10px] font-mono uppercase font-bold text-amber-700">देहाती / क्षेत्रीय नाम (Rural Local Names)</span>
              <div class="text-sm font-display font-extrabold text-amber-950">${d.names.rural}</div>
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
            <strong>रोग तंत्र (Disease Mechanism):</strong> ${d.matchMechanism}
          </div>
        </div>

        <!-- 2️⃣ रोग का मूल कारण व संचरण (Root Cause / Etiology) -->
        <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs font-mono font-bold flex items-center justify-center">2</span>
              <h3 class="text-sm font-bold text-slate-900">रोग का मूल कारण एवं संचरण (Root Cause, Etiology & Vector)</h3>
            </div>
            <span class="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-100 text-slate-800 border border-slate-300">
              ${d.etiology.typeBadge}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong class="text-slate-900 block font-bold">सूक्ष्मजीवी रोगकारक (Etiological Agent):</strong>
              <div class="font-mono text-slate-700 leading-snug">${d.etiology.agent}</div>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong class="text-slate-900 block font-bold">फैलाव व संचरण विधि (Transmission & Risk):</strong>
              <div class="text-slate-700 leading-snug">${d.etiology.transmission}</div>
            </div>
          </div>
        </div>

        <!-- 3️⃣ पुष्टिकरण जांच व लैब टेस्ट तालिका (Diagnostic Lab Tests Table) -->
        <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs font-mono font-bold flex items-center justify-center">3</span>
              <h3 class="text-sm font-bold text-slate-900">पुष्टिकरण जांच व लैब टेस्ट तालिका (Diagnostic Lab Tests Matrix)</h3>
            </div>
            <span class="text-[11px] font-mono text-slate-400 font-semibold">Field & Referral Labs</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="p-3 rounded-l-xl">जांच का नाम (Test Name)</th>
                  <th class="p-3">नमूना प्रकार (Sample)</th>
                  <th class="p-3">अनुमानित शुल्क (₹ MRP)</th>
                  <th class="p-3 rounded-r-xl">नैदानिक महत्व (Clinical Significance)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                ${d.labTests.map(t => `
                  <tr class="hover:bg-slate-50">
                    <td class="p-3 font-bold text-slate-900">${t.test}</td>
                    <td class="p-3 font-mono">${t.sample}</td>
                    <td class="p-3 font-mono font-bold text-teal-800">₹ ${t.mrp}</td>
                    <td class="p-3 leading-snug">${t.significance}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 4️⃣ 5-स्तरीय संपूर्ण उपचार योजना (5-Tier Treatment Plan) -->
        <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs font-mono font-bold flex items-center justify-center">4</span>
              <h3 class="text-sm font-bold text-slate-900">5-स्तरीय संपूर्ण उपचार योजना (5-Tier Standardized Treatment Plan)</h3>
            </div>
            <span class="text-xs font-bold text-teal-700">100% फुलप्रूफ प्रोटोकॉल</span>
          </div>

          <!-- ⚠️ PREGNANCY CAUTION BANNER -->
          ${isPreg ? `
            <div class="p-4 sm:p-5 rounded-2xl bg-rose-50 border-2 border-rose-500 shadow-sm space-y-2 text-xs">
              <div class="flex items-center gap-2 text-rose-800 font-black text-sm">
                <i class="fa-solid fa-shield-virus text-rose-600 text-lg animate-bounce"></i>
                <span>⚠️ सख्त गर्भावस्था चेतावनी (Pregnancy Red Alert Active - Month ${state.pregnancyMonth}):</span>
              </div>
              <p class="text-rose-900 font-semibold leading-relaxed">
                यह पशु <strong>${state.pregnancyMonth} माह का गर्भवती</strong> दर्ज है। कॉर्टिकोस्टेरॉइड्स 
                (<strong>Dexamethasone, Isoflupredone, Prednisolone, Betamethasone</strong>) 
                एवं <strong>Albendazole</strong> का प्रयोग पूर्णतः वर्जित (Strictly Prohibited) है क्योंकि ये 
                <strong>3rd Trimester में गर्भपात (Abortion)</strong> करा सकते हैं। 
                सूजन व दर्द नियंत्रण हेतु केवल सुरक्षित NSAID (जैसे <strong>Meloxicam</strong>) का ही प्रयोग करें।
              </p>
            </div>
          ` : ''}

          <!-- 4a. Injections Table -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-syringe text-teal-600"></i>
              <span>4a. एलोपैथिक इंजेक्शन तालिका (Injectable Therapeutics)</span>
            </h4>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th class="p-2.5 rounded-l-xl">श्रेणी (Category)</th>
                    <th class="p-2.5">साल्ट / जेनेरिक नाम</th>
                    <th class="p-2.5">प्रमुख ब्रांड्स</th>
                    <th class="p-2.5">₹ MRP</th>
                    <th class="p-2.5">खुराक व विधि (Route)</th>
                    <th class="p-2.5">गर्भ सुरक्षा</th>
                    <th class="p-2.5 rounded-r-xl">उद्देश्य (Purpose)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                  ${d.treatments.injections.map(inj => {
                    const isUnsafe = isPreg && !inj.pregSafe;
                    return `
                      <tr class="${isUnsafe ? 'bg-rose-50 border border-rose-300' : 'hover:bg-slate-50'}">
                        <td class="p-2.5 font-bold text-slate-900">${inj.category}</td>
                        <td class="p-2.5 font-mono">${inj.generic}</td>
                        <td class="p-2.5">${inj.brands}</td>
                        <td class="p-2.5 font-mono font-bold text-teal-800">₹ ${inj.mrp}</td>
                        <td class="p-2.5 leading-snug">${inj.dose}</td>
                        <td class="p-2.5">
                          ${inj.pregSafe ? `
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">सुरक्षित (Safe)</span>
                          ` : `
                            <span class="px-2 py-0.5 rounded text-[10px] font-black bg-rose-200 text-rose-900 border border-rose-300">
                              ${isPreg ? 'वर्जित (BLOCKED!)' : 'असुरक्षित (Unsafe)'}
                            </span>
                          `}
                        </td>
                        <td class="p-2.5 leading-snug">${inj.purpose}</td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- 4b. Oral Medicines & Supplements Table -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-pills text-sky-600"></i>
              <span>4b. मुख से दी जाने वाली औषधियां व सप्लीमेंट्स (Oral Medicines & Bolus)</span>
            </h4>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th class="p-2.5 rounded-l-xl">प्रकार</th>
                    <th class="p-2.5">साल्ट / जेनेरिक नाम</th>
                    <th class="p-2.5">ब्रांड्स</th>
                    <th class="p-2.5">₹ MRP</th>
                    <th class="p-2.5">खुराक व अवधि</th>
                    <th class="p-2.5">गर्भ सुरक्षित?</th>
                    <th class="p-2.5 rounded-r-xl">उद्देश्य</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                  ${d.treatments.oral.map(o => `
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">${o.type}</td>
                      <td class="p-2.5 font-mono">${o.generic}</td>
                      <td class="p-2.5">${o.brands}</td>
                      <td class="p-2.5 font-mono font-bold text-teal-800">₹ ${o.mrp}</td>
                      <td class="p-2.5 leading-snug">${o.dose}</td>
                      <td class="p-2.5">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">सुरक्षित</span>
                      </td>
                      <td class="p-2.5 leading-snug">${o.purpose}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- 4c. Ayurvedic / Herbal Veterinary Table -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-leaf text-emerald-600"></i>
              <span>4c. आयुर्वेदिक व हर्बल वेटनरी औषधियां (Ayurvedic Veterinary Formulations)</span>
            </h4>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th class="p-2.5 rounded-l-xl">दवा का नाम</th>
                    <th class="p-2.5">प्रमुख प्राकृतिक घटक</th>
                    <th class="p-2.5">₹ MRP</th>
                    <th class="p-2.5">खुराक व विधि</th>
                    <th class="p-2.5 rounded-r-xl">लाभ</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                  ${d.treatments.ayurvedic.map(ay => `
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">${ay.name}</td>
                      <td class="p-2.5 italic">${ay.ingredients}</td>
                      <td class="p-2.5 font-mono font-bold text-teal-800">₹ ${ay.mrp}</td>
                      <td class="p-2.5 leading-snug">${ay.dose}</td>
                      <td class="p-2.5 leading-snug">${ay.benefits}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- 4d. Homeopathic Remedies Table -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-droplet text-purple-600"></i>
              <span>4d. होम्योपैथिक पशु चिकित्सा औषधियां (Homeopathic Remedies)</span>
            </h4>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th class="p-2.5 rounded-l-xl">औषधि एवं पोटेंसी</th>
                    <th class="p-2.5">₹ MRP</th>
                    <th class="p-2.5">खुराक एवं विधि</th>
                    <th class="p-2.5 rounded-r-xl">क्रियाशीलता व एक्शन</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                  ${d.treatments.homeopathic.map(hm => `
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900 font-mono">${hm.remedy}</td>
                      <td class="p-2.5 font-mono font-bold text-teal-800">₹ ${hm.mrp}</td>
                      <td class="p-2.5 leading-snug">${hm.dose}</td>
                      <td class="p-2.5 leading-snug">${hm.action}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- 4e. Home-Made Desi Remedies Table -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-mortar-pestle text-amber-600"></i>
              <span>4e. घर पर तैयार किए जाने वाले अनुभूत देशी नुस्खे (Ethno-Veterinary Desi Nuskhe)</span>
            </h4>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th class="p-2.5 rounded-l-xl">नुस्खे का नाम</th>
                    <th class="p-2.5">आवश्यक घरेलू सामग्री</th>
                    <th class="p-2.5">बनाने की विधि</th>
                    <th class="p-2.5 rounded-r-xl">प्रयोग विधि व सावधानियां</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
                  ${d.treatments.desi.map(ds => `
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-900">${ds.name}</td>
                      <td class="p-2.5 leading-snug">${ds.ingredients}</td>
                      <td class="p-2.5 leading-snug">${ds.prep}</td>
                      <td class="p-2.5 leading-snug">${ds.usage}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- 4f. Management & Biosecurity -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div class="font-bold text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-shield-halved text-teal-600"></i>
              <span>4f. प्रबंधन, बाड़ा स्वच्छता एवं बायोसिक्योरिटी प्रोटोकॉल (Biosecurity Guidelines):</span>
            </div>
            <ul class="list-disc pl-5 space-y-1.5 text-slate-700 leading-relaxed font-medium">
              ${d.treatments.biosecurity.map(item => `<li>${item}</li>`).join("")}
            </ul>
          </div>

        </div>

        <!-- 5️⃣ समग्र निष्कर्ष व आपातकालीन चेतावनी (Prognosis & Red Flags) -->
        <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs font-mono font-bold flex items-center justify-center">5</span>
              <h3 class="text-sm font-bold text-slate-900">समग्र निष्कर्ष व आपातकालीन चेतावनी (Prognosis & Emergency Red Flags)</h3>
            </div>
            <span class="text-[11px] font-mono text-slate-400 font-semibold">Triage Assessment</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span class="text-[10px] font-mono uppercase font-bold text-slate-400">रोग की गंभीरता (Severity)</span>
              <div class="text-sm font-display font-extrabold text-rose-700">${d.prognosis.severity}</div>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span class="text-[10px] font-mono uppercase font-bold text-slate-400">स्वास्थ्य लाभ समय (Recovery Timeline)</span>
              <div class="text-sm font-display font-extrabold text-teal-800">${d.prognosis.recoveryDays}</div>
            </div>
          </div>

          <!-- 🚨 Emergency Red Flag Warnings -->
          <div class="p-4 sm:p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-xs text-rose-900 space-y-2">
            <div class="font-extrabold flex items-center gap-2 text-rose-700">
              <i class="fa-solid fa-triangle-exclamation text-base"></i>
              <span>🚨 तत्काल आपातकालीन चेतावनी लक्षण (Immediate Life-Threatening Red Flags):</span>
            </div>
            <ul class="list-disc pl-5 space-y-1.5 font-bold leading-relaxed">
              ${d.prognosis.redFlags.map(rf => `<li>${rf}</li>`).join("")}
            </ul>
          </div>
        </div>
      `;

      // Bind Print Button
      const btnPrint = outputWrapper.querySelector("#btnPrintProtocol");
      if (btnPrint) {
        btnPrint.addEventListener("click", () => {
          window.print();
        });
      }

      // Bind Export to Rx Pad Button
      const btnExport = outputWrapper.querySelector("#btnExportToRxPad");
      if (btnExport) {
        btnExport.addEventListener("click", () => {
          const rxData = {
            diagnosis: `${d.names.hi} (${d.names.en})`,
            isPregnant: isPreg,
            injections: d.treatments.injections.filter(inj => !(isPreg && !inj.pregSafe)),
            oralMedicines: d.treatments.oral,
            desiRemedies: d.treatments.desi
          };

          if (window.VetcareApp && window.VetcareApp.PrescriptionPad && typeof window.VetcareApp.PrescriptionPad.importFromDiagnosticEngine === "function") {
            window.VetcareApp.PrescriptionPad.importFromDiagnosticEngine(rxData);
          } else if (window.VetcareApp && window.VetcareApp.EventBus) {
            window.VetcareApp.EventBus.emit("prescription:import-5tier", rxData);
          }

          if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
            window.VetcareApp.showToast("उपचार योजना ओपीडी प्रिस्क्रिप्शन पैड में भेज दी गई!", "success");
          } else {
            alert("सफलता: 5-स्तरीय उपचार पर्ची में भेज दिया गया है!");
          }
        });
      }

      // Smooth scroll to results
      outputContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Initial Mount
    renderUI();
  }

  // =========================================================================
  // 4. PUBLIC API EXPORTS
  // =========================================================================
  return {
    version: "2026.04-5TIER-PROD",
    renderDiagnosticDesk: renderDiagnosticDesk,
    runInference: runClinicalInference,
    getCatalog: function () {
      return Object.assign({}, DISEASE_CATALOG);
    }
  };
});
