// Vetcare AI OS - Ethno-Veterinary Medicine (EVM), Certified Herbal Formulations & Home Remedies (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. MASTER ETHNO-VETERINARY MEDICINE (EVM) REPOSITORY (10 CERTIFIED FORMULATIONS)
  window.VetcareApp.ClinicalData.DesiNuskhe = [
    // ------------------------------------------------------------------------
    // 1. MASTITIS (थनैला रोग) - TANUVAS & NDDB ENDORSED FORMULATION
    // ------------------------------------------------------------------------
    {
      id: "evm-mastitis-paste",
      condition: "Clinical & Subclinical Mastitis",
      conditionHi: "थनैला रोग / अयन व थन की सूजन (एलोवेरा, हल्दी व चूना लेप)",
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine"],
      ingredients: [
        {
          nameEn: "Fresh Aloe Vera Leaves",
          nameHi: "ताजा घृतकुमारी (एलोवेरा) की पत्तियां",
          quantity: "250 grams (approx. 2-3 medium leaves)",
          role: "Anti-inflammatory, tissue regenerative, polysaccharide matrix (Acemannan)"
        },
        {
          nameEn: "Pure Turmeric Rhizome Powder",
          nameHi: "शुद्ध हल्दी चूर्ण",
          quantity: "50 grams (approx. 4 tablespoons)",
          role: "Broad-spectrum antibacterial, antifungal, COX-2 inhibitor (Curcuminoids)"
        },
        {
          nameEn: "Slaked Lime (Calcium Hydroxide / Chuna)",
          nameHi: "खाने वाला बुझा हुआ चूना",
          quantity: "15 grams (approx. 1 small lime-sized ball)",
          role: "Creates alkaline antimicrobial environment, synergistic pigment activator"
        }
      ],
      preparation: "1. Hindi: एलोवेरा की पत्तियों से कांटेदार किनारे काटकर छोटे टुकड़े कर लें। सिलबट्टे या मिक्सी में एलोवेरा, हल्दी और चूना एक साथ मिलाकर बिना पानी डाले बारीक पीसें। पीसने पर यह मिश्रण रासायनिक क्रिया से गहरा लाल/सिंदूरी रंग का पेस्ट बन जाएगा।\n2. English: Trim spiny margins from fresh Aloe vera leaves and chop into small pieces. Grind the leaves, turmeric powder, and slaked lime together into a smooth, homogenous paste without adding any water. The alkaline reaction between turmeric and calcium hydroxide turns the mixture bright vermillion red.",
      applicationMethod: "External Topical",
      dosageAndDuration: "Wash the infected quarter and udder thoroughly with lukewarm water and wipe dry. Strip out and discard all infected milk completely into a container with disinfectant. Apply the red paste generously over the entire affected quarter and teat, leaving the teat orifice open. Reapply 4 to 5 times daily for 5 consecutive days.",
      scientificBasis: "Curcumin exerts potent bactericidal activity against Staphylococcus aureus and Streptococcus agalactiae. Acemannan in Aloe vera accelerates cellular fibroblast proliferation and relieves vascular congestion. Slaked lime creates a high local pH that disrupts bacterial cellular membranes and neutralizes acidic inflammatory exudates.",
      whenToCallVet: "यदि 24 से 48 घंटे के अंदर सूजन कम न हो, दूध में ताजा खून या गाढ़े पीले थक्के आना जारी रहे, या पशु का तापमान 104°F से ऊपर चला जाए (सिस्टमिक टॉक्सिक मैस्टाइटिस), तो तुरंत अधिकृत पशु चिकित्सक को बुलाकर इंट्रा-मैमरी इन्फ्यूजन व पैरेंट्रल एंटीबायोटिक थेरेपी शुरू करवाएं।"
    },

    // ------------------------------------------------------------------------
    // 2. FOOT AND MOUTH DISEASE / FMD (खुरपका-मुँहपका रोग)
    // ------------------------------------------------------------------------
    {
      id: "evm-fmd-lesions",
      condition: "Foot and Mouth Disease (FMD) Oral & Hoof Lesions",
      conditionHi: "खुरपका-मुँहपका (FMD) - मुँह के छाले व खुरों का घाव लेप",
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine", "swine"],
      ingredients: [
        {
          nameEn: "Virgin Coconut Oil or Sesame Oil",
          nameHi: "शुद्ध नारियल या तिल का तेल",
          quantity: "250 ml",
          role: "Hydrophobic barrier, antimicrobial medium-chain fatty acids (Lauric acid)"
        },
        {
          nameEn: "Crushed Garlic Cloves",
          nameHi: "कुचला हुआ लहसुन",
          quantity: "50 grams (approx. 10-12 cloves)",
          role: "Antiviral, organosulfur antibacterial, fly repellent (Allicin)"
        },
        {
          nameEn: "Pure Turmeric Powder",
          nameHi: "हल्दी पाउडर",
          quantity: "50 grams",
          role: "Epithelial cicatrizant and anti-inflammatory agent"
        },
        {
          nameEn: "Fresh Holy Basil (Tulsi) Leaves",
          nameHi: "ताजा तुलसी की पत्तियां",
          quantity: "50 grams (one handful)",
          role: "Antiseptic, immunomodulatory essential oils (Eugenol)"
        },
        {
          nameEn: "Purified Alum (Fitkari)",
          nameHi: "शुद्ध फिटकरी",
          quantity: "20 grams (for foot wash solution)",
          role: "Astringent, coagulant, antiseptic hoof rinse"
        }
      ],
      preparation: "1. Hindi: (क) खुरों हेतु: नारियल तेल में लहसुन, तुलसी और हल्दी डालकर धीमी आंच पर 10 मिनट तक पकाएं जब तक लहसुन हल्का भूरा न हो जाए। ठंडा कर छान लें। (ख) मुँह के छालों हेतु: फिटकरी को तवे पर भूनकर बारीक पीस लें। 200 ग्राम शहद या घी में 10 ग्राम भुनी फिटकरी व 20 ग्राम हल्दी मिलाकर लेप बनाएं।\n2. English: (A) For Hoof Lesions: Boil crushed garlic, tulsi, and turmeric in coconut oil on low heat until garlic turns golden brown; cool and filter. (B) For Mouth Lesions: Roast alum on an iron pan, crush into micro-powder, and blend with pure honey or ghee along with turmeric.",
      applicationMethod: "Foot Wash / Dip followed by External Topical & Oral Swab",
      dosageAndDuration: "Wash the hooves and interdigital cleft twice daily with a 2% alum water wash (20g alum in 1 liter clean water). Apply the medicated herbal oil deep between the claws and cover with clean bandage if severely ulcerated. For mouth lesions: Gently swab the honey-turmeric paste over the tongue and dental pad twice daily for 5-7 days.",
      scientificBasis: "Alum acts as a mild protein precipitator and astringent that dries weeping vesicular lesions. Allicin from garlic combined with eugenol from tulsi prevents severe secondary anaerobic bacterial infections (Fusobacterium necrophorum) in hooves, preventing permanent hoof deformities.",
      whenToCallVet: "यदि पशु चारा खाना पूरी तरह छोड़ दे, खुरों में कीड़े (Maggots) पड़ जाएं, खुर का खोल (Hoof capsule) उखड़ने लगे, या पशु खड़ा होने में असमर्थ होकर बैठ जाए, तो तुरंत आपातकालीन एंटीबायोटिक व दर्द निवारक उपचार हेतु चिकित्सक से संपर्क करें।"
    },

    // ------------------------------------------------------------------------
    // 3. ACUTE BLOAT / TYMPANY (अफारा व गैस)
    // ------------------------------------------------------------------------
    {
      id: "evm-bloat-drench",
      condition: "Acute Ruminal Bloat / Frothy Tympany",
      conditionHi: "तीव्र गैसीय या झागदार अफारा (हींग, अजवाइन, सोंठ व तेल काढ़ा)",
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine"],
      ingredients: [
        {
          nameEn: "Pure Asafoetida (Hing)",
          nameHi: "शुद्ध हींग",
          quantity: "15 to 20 grams (5g for small ruminants)",
          role: "Potent carminative, intestinal antispasmodic, antifoaming agent"
        },
        {
          nameEn: "Carom Seeds (Ajwain)",
          nameHi: "अजवाइन",
          quantity: "100 grams (25g for sheep/goat)",
          role: "Antispasmodic, stimulates ruminal motility, carminative (Thymol)"
        },
        {
          nameEn: "Dry Ginger Powder (Sonth)",
          nameHi: "सोंठ (सूखा अदरक चूर्ण)",
          quantity: "50 grams",
          role: "Prokinetic, digestive fire stimulant (Gingerols & Shogaols)"
        },
        {
          nameEn: "Black Salt (Kala Namak)",
          nameHi: "काला नमक / सेंधा नमक",
          quantity: "50 grams",
          role: "Saline digestive stimulant, relieves gas pressure"
        },
        {
          nameEn: "Pure Mustard Oil (Sarson Tel) or Linseed Oil",
          nameHi: "शुद्ध कच्ची घानी सरसों का तेल या अलसी तेल",
          quantity: "300 to 500 ml (50-100ml for sheep/goat)",
          role: "Surface-active antifoaming defoamer; breaks gas-liquid foam bubbles"
        }
      ],
      preparation: "1. Hindi: अजवाइन और सोंठ को बारीक कूट लें। एक कप गुनगुने पानी में हींग को अच्छी तरह घोलें। अब सरसों के तेल में घुली हुई हींग, अजवाइन, सोंठ और काला नमक मिलाकर एकसार घोल तैयार करें।\n2. English: Coarsely crush ajwain seeds and dry ginger. Dissolve asafoetida in half a cup of lukewarm water. Vigorously blend the dissolved hing, crushed spices, and black salt directly into the pure mustard oil until thoroughly emulsified.",
      applicationMethod: "Oral Drench",
      dosageAndDuration: "Administer the entire mixture slowly as a single oral drench using a dosing bottle or drenching syringe. Keep the animal's head horizontal (never elevate neck excessively to prevent aspiration). If gas relief is incomplete, repeat half the dose after 4 hours.",
      scientificBasis: "Mustard oil acts as a powerful non-ionic surfactant that drastically reduces surface tension within the frothy ruminal digesta, coalescing millions of trapped micro-bubbles into free gas caps that are naturally released via eructation (belching). Thymol and hing stimulate vagal ruminal contractions.",
      whenToCallVet: "यदि बायीं कोख पत्थर जैसी सख्त तनी रहे, पशु मुंह खोलकर हांफने लगे, जीभ बाहर निकल आए, आंखें फटी रह जाएं या पशु लडखड़ाने लगे (दम घुटने का खतरा), तो बिना देर किए तुरंत पशु चिकित्सक द्वारा ट्रोकार-कैनुला या स्टमक ट्यूब डिकंप्रेशन करवाएं।"
    },

    // ------------------------------------------------------------------------
    // 4. MAGGOT WOUNDS & DEEP ULCERS (कीड़े पड़े घाव)
    // ------------------------------------------------------------------------
    {
      id: "evm-maggot-wound-pack",
      condition: "Maggot Infested Wounds & Deep Necrotic Ulcers",
      conditionHi: "कीड़े पड़े सड़े घाव (कपूर, सीताफल पत्ता व नीम-तारपीन लेप)",
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine", "canine"],
      ingredients: [
        {
          nameEn: "Natural Camphor Tablets (Kapur)",
          nameHi: "भीमसेनी / प्राकृतिक कपूर",
          quantity: "25 grams (powdered)",
          role: "Potent larvicide, local analgesic, antiseptic, insect repellent"
        },
        {
          nameEn: "Fresh Custard Apple Leaves (Sitaphal Patte)",
          nameHi: "ताजा सीताफल / शरीफा की पत्तियां",
          quantity: "100 grams",
          role: "Natural botanical contact larvicide (Annonin alkaloids)"
        },
        {
          nameEn: "Cold-Pressed Neem Oil",
          nameHi: "शुद्ध नीम का तेल",
          quantity: "100 ml",
          role: "Larvicidal, anti-oviposition, barrier emollient (Azadirachtin)"
        },
        {
          nameEn: "Pure Turpentine Oil (Tarpeen Tel)",
          nameHi: "शुद्ध तारपीन का तेल",
          quantity: "20 ml",
          role: "Volatile suffocation agent that forces deep maggots to surface"
        }
      ],
      preparation: "1. Hindi: सीताफल की पत्तियों को सिलबट्टे पर बिना पानी डाले कूटकर गाढ़ा रस निकाल लें। कपूर को बारीक पीसकर नीम के तेल और तारपीन के तेल में घोलें। इसमें सीताफल की पत्तियों का रस अच्छी तरह मिलाएं।\n2. English: Crush fresh custard apple leaves into a concentrated green pulp. Powder the camphor finely and dissolve into the blend of neem oil and turpentine oil. Vigorously whisk the leaf extract into the oil mixture.",
      applicationMethod: "External Topical",
      dosageAndDuration: "Clean the wound with clean water and remove surface debris. Saturate a clean cotton swab in the formulation and pack it deep into the maggot cavity. The volatile fumes will asphyxiate the maggots, causing them to crawl out within 10 minutes. Remove dead larvae with forceps. Apply remaining paste over the wound twice daily for 5-7 days until healthy pink granulation tissue forms.",
      scientificBasis: "Annonin and squamocin present in custard apple leaves disrupt mitochondrial respiration in fly larvae (Chrysomya bezziana). Camphor and turpentine generate penetrating vapors that cut off the larval spiracle respiratory apparatus, while neem oil inhibits fly egg hatching.",
      whenToCallVet: "यदि घाव जननांगों, जोड़ों, आंख, या सींग की जड़ में इतना गहरा हो कि हड्डी या आंतरिक अंग दिखने लगें, या घाव से असहनीय दुर्गंधयुक्त सेप्टिक मवाद और तेज बुखार हो, तो तुरंत सर्जिकल डिब्राइडमेंट व एंटीबायोटिक हेतु चिकित्सक को बुलाएं।"
    },

    // ------------------------------------------------------------------------
    // 5. SIMPLE DIARRHEA & INDIGESTION (साधारण दस्त व अपच)
    // ------------------------------------------------------------------------
    {
      id: "evm-diarrhea-mix",
      condition: "Simple Diarrhea, Scours & Non-Specific Indigestion",
      conditionHi: "साधारण दस्त, अपच व बदहजमी (मेथी, जीरा, सौंफ व छाछ काढ़ा)",
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine"],
      ingredients: [
        {
          nameEn: "Fenugreek Seeds (Methi Dana)",
          nameHi: "मेथी दाना",
          quantity: "50 grams (15g for calves/small ruminants)",
          role: "Mucilaginous gut mucosal protective coat, reduces hypermotility"
        },
        {
          nameEn: "Cumin Seeds (Jeera)",
          nameHi: "सफेद जीरा",
          quantity: "50 grams",
          role: "Antispasmodic, stimulates pancreatic digestive enzymes (Cuminaldehyde)"
        },
        {
          nameEn: "Fennel Seeds (Saunf)",
          nameHi: "मोटी सौंफ",
          quantity: "50 grams",
          role: "Soothes intestinal spasms, carminative, cooling astringent"
        },
        {
          nameEn: "Dried Pomegranate Rind or Bel Pulp",
          nameHi: "अनार का छिलका या सूखा बेल का गूदा",
          quantity: "50 grams",
          role: "Potent natural tannin astringent; checks fluid hypersecretion"
        },
        {
          nameEn: "Fresh Cultured Buttermilk (Chhachh / Mattha)",
          nameHi: "ताजा खट्टा-मीठा छाछ या मट्ठा",
          quantity: "1 to 1.5 Liters",
          role: "Natural probiotic, restores beneficial lactic acid microflora"
        }
      ],
      preparation: "1. Hindi: मेथी, जीरा और सौंफ को हल्का भूनकर अनार के छिलके के साथ बारीक पीस लें। इस चूर्ण को 1 लीटर ताजे मट्ठे या छाछ में अच्छी तरह घोल लें।\n2. English: Lightly roast fenugreek, cumin, and fennel seeds in a dry pan. Grind roasted spices and dried pomegranate rind into fine powder. Whisk thoroughly into 1 to 1.5 liters of fresh, naturally cultured buttermilk.",
      applicationMethod: "Oral Drench",
      dosageAndDuration: "Administer the drench slowly once daily in the morning for 2 to 3 consecutive days. For young calves: Reduce the volume to 250-300 ml twice daily.",
      scientificBasis: "Ellagic acid and gallic acid tannins from pomegranate peel coagulate superficial mucosal proteins into a protective barrier, reducing excessive capillary permeability. Fenugreek galactomannan fibers form a colloidal gel that binds excess fluid in the lumen, while buttermilk seeds the gut with live Lactobacillus.",
      whenToCallVet: "यदि दस्त में तेज बदबू के साथ ताजा खून या आंत की झिल्ली (Hemorrhagic Enteritis) आ रही हो, पशु की आंखें अंदर धंस जाएं, तापमान 104°F से अधिक या 100°F से कम हो जाए (गंभीर निर्जलीकरण), तो तुरंत IV फ्लूइड (Ringer's Lactate) व एंटीबायोटिक उपचार करवाएं।"
    },

    // ------------------------------------------------------------------------
    // 6. LUMPY SKIN DISEASE / LSD (लंपी त्वचा रोग)
    // ------------------------------------------------------------------------
    {
      id: "evm-lsd-oral-topical",
      condition: "Lumpy Skin Disease (LSD) Systemic & Cutaneous Protocol",
      conditionHi: "लंपी त्वचा रोग (LSD) - काली मिर्च, पान पत्ता व घी (मौखिक) + नीम लेप (बाह्य)",
      targetSpecies: ["bovine", "bubaline"],
      ingredients: [
        {
          nameEn: "Betel Leaves (Paan ke Patte)",
          nameHi: "ताजा पान के पत्ते",
          quantity: "10 numbers",
          role: "Antiviral, antioxidant, stimulates phagocytosis (Chavibetol)"
        },
        {
          nameEn: "Black Pepper Corns (Kali Mirch)",
          nameHi: "साबुत काली मिर्च",
          quantity: "10 grams (approx. 15-20 corns)",
          role: "Bioenhancer, fever reducer, bronchodilator (Piperine)"
        },
        {
          nameEn: "Rock Salt (Sendha Namak)",
          nameHi: "सेंधा नमक",
          quantity: "10 grams",
          role: "Mineral electrolyte balance, enhances mucosal absorption"
        },
        {
          nameEn: "Dark Jaggery (Desi Gur)",
          nameHi: "पुराना देसी गुड़",
          quantity: "50 grams",
          role: "Clean carbohydrate energy source, palatable binder"
        },
        {
          nameEn: "Pure Desi Cow Ghee",
          nameHi: "शुद्ध देसी गाय का घी",
          quantity: "50 grams",
          role: "Lipophilic drug delivery vehicle, protects gastric mucosa"
        }
      ],
      preparation: "1. Hindi: (क) मौखिक खुराक: पान के पत्ते, काली मिर्च और सेंधा नमक को बारीक पीस लें। इसे गुड़ और देसी घी में मिलाकर एक बड़े लड्डू का आकार दें। (ख) बाह्य त्वचा लेप: नीम के पत्ते (100g) और हल्दी (50g) को नारियल के तेल (200ml) में पकाकर त्वचा की गांठों पर लगाने हेतु तेल तैयार करें।\n2. English: (A) Oral Bolus: Finely crush betel leaves, black pepper, and rock salt. Blend thoroughly into jaggery and cow ghee to form a paste or single oral bolus. (B) Topical Dressing: Boil 100g neem leaves and 50g turmeric in 200ml coconut oil until water evaporates, forming a soothing wound-healing oil.",
      applicationMethod: "Oral Drench followed by External Topical",
      dosageAndDuration: "Feed the oral jaggery-ghee bolus three times daily for the first 3 days, then reduce to twice daily for the next 7 days. Apply the topical neem-turmeric oil over the skin nodules and burst scabs twice daily until lesions dry and flake off.",
      scientificBasis: "Piperine significantly increases the systemic bioavailability of polyphenols in betel leaves. The formulation exerts profound immunomodulatory and antiviral effects against Capripoxvirus while inhibiting secondary bacterial pustular dermatitis and necrotic nodular sloughing.",
      whenToCallVet: "यदि पशु के पैरों या गलकंबल में अत्यधिक पानी भर जाए (Edema), सांस लेने में भारी घुर्र-घुर्र की आवाज हो (श्वसन नली में गांठें), या पशु लगातार 48 घंटे तक चारा-पानी न छुए, तो तुरंत पशु चिकित्सक द्वारा माध्यमिक सेप्सिस रोकने हेतु उपचार करवाएं।"
    },

    // ------------------------------------------------------------------------
    // 7. RETAINED PLACENTA & POST-CALVING CLEANSING (जेर न गिरना व मैला)
    // ------------------------------------------------------------------------
    {
      id: "evm-retained-placenta",
      condition: "Retained Fetal Membranes (ROP) & Lochial Cleansing",
      conditionHi: "जेर का न गिरना / रुकना व प्रसव बाद गर्भाशय मैला छांटना",
      targetSpecies: ["bovine", "bubaline"],
      ingredients: [
        {
          nameEn: "Old Dark Jaggery (Purana Gur)",
          nameHi: "पुराना काला गुड़",
          quantity: "500 grams to 1 kg",
          role: "Immediate maternal caloric surge, stimulates uterine smooth muscle contractions"
        },
        {
          nameEn: "Carom Seeds (Ajwain)",
          nameHi: "अजवाइन",
          quantity: "50 grams",
          role: "Uterine ecbolic, antispasmodic, anti-endotoxic"
        },
        {
          nameEn: "Dry Ginger Powder (Sonth)",
          nameHi: "सोंठ चूर्ण",
          quantity: "50 grams",
          role: "Peripheral circulatory stimulant, metabolic tonic"
        },
        {
          nameEn: "Fenugreek Seeds (Methi Dana)",
          nameHi: "मेथी दाना",
          quantity: "50 grams",
          role: "Phytoestrogen source, aids involution and galactopoiesis"
        },
        {
          nameEn: "Fresh Bamboo Leaves (Bans ke Patte)",
          nameHi: "ताजा बांस की हरी पत्तियां",
          quantity: "250 grams (crushed)",
          role: "Potent natural oxytocic and uterine ecbolic; promotes myometrial expulsive waves"
        }
      ],
      preparation: "1. Hindi: बांस की पत्तियों, अजवाइन, सोंठ और मेथी को 3 लीटर पानी में डालें। इसमें गुड़ मिलाकर धीमी आंच पर तब तक पकाएं जब तक पानी आधा (लगभग 1.5 लीटर) न रह जाए। इसे छानकर गुनगुना कर लें।\n2. English: Add crushed green bamboo leaves, ajwain, dry ginger, and fenugreek seeds to 3 liters of water. Dissolve jaggery and simmer gently until the liquid reduces to half (approx. 1.5 liters). Strain and allow to cool to a warm drinkable temperature.",
      applicationMethod: "Oral Drench",
      dosageAndDuration: "Offer as a warm voluntary drink or administer slowly via drenching horn within 2 to 4 hours post-calving. Repeat the same preparation after 6 hours if the placenta has not been completely expelled. Continue once daily for 3 days post-calving to promote complete lochial discharge and rapid uterine involution.",
      scientificBasis: "Bamboo leaves contain bioactive saponins and flavonoids with documented oxytocin-mimicking activity that stimulates coordinated rhythmic contractions of the exhausted myometrium. High-energy jaggery resolves maternal post-parturient hypoglycemia, which is a major predisposing cause of uterine atony.",
      whenToCallVet: "यदि प्रसव के 8 से 12 घंटे बाद भी जेर बिल्कुल न गिरे, जेर से सड़ी हुई अत्यंत दुर्गंध आने लगे, या गाय/भैंस को 104°F से तेज बुखार चढ़ जाए (Metritis-Endotoxemia), तो तुरंत पशु चिकित्सक को बुलाएं। जेर को कभी भी हाथ से जबरन खींचकर न निकालें (रक्तस्राव व बांझपन का खतरा)।"
    },

    // ------------------------------------------------------------------------
    // 8. ECTOPARASITES: TICKS, LICE & MITES (चिचड़ी, जूँ व किलनी)
    // ------------------------------------------------------------------------
    {
      id: "evm-ectoparasite-wash",
      condition: "Tick, Lice & Flea Infestation (Ectoparasitosis)",
      conditionHi: "चिचड़ी, किलनी, जूँ व मक्खी नियंत्रण (नीम, करंज व कपूर तेल)",
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine", "canine"],
      ingredients: [
        {
          nameEn: "Pure Cold-Pressed Neem Oil",
          nameHi: "शुद्ध कड़वा नीम का तेल",
          quantity: "200 ml",
          role: "Ecdysone receptor antagonist, anti-feeding, blocks tick oviposition"
        },
        {
          nameEn: "Karanja Oil (Pongamia pinnata)",
          nameHi: "करंज का तेल",
          quantity: "100 ml",
          role: "Potent acaricide, insecticidal furanoflavonoids (Karanjin)"
        },
        {
          nameEn: "Natural Camphor (Kapur)",
          nameHi: "कपूर",
          quantity: "20 grams",
          role: "Neurotoxic to arthropods, volatile repellent, eases pruritus"
        },
        {
          nameEn: "Crushed Garlic Extract",
          nameHi: "लहसुन का रस",
          quantity: "50 ml",
          role: "Natural insect repellent, systemic blood-tick deterrent"
        }
      ],
      preparation: "1. Hindi: नीम और करंज के तेल को आपस में मिलाएं। कपूर को बारीक पीसकर इस तेल में तब तक हिलाएं जब तक कपूर पूरी तरह घुल न जाए। अब इसमें छना हुआ लहसुन का रस मिलाएं और अच्छी तरह हिलाएं।\n2. English: Blend pure neem oil and karanja oil in a clean bottle. Pulverize natural camphor into fine powder and dissolve into the oil mixture until fully clear. Whisk in the filtered garlic juice and shake vigorously to form an emulsion.",
      applicationMethod: "External Topical",
      dosageAndDuration: "Using a clean cotton rag or soft brush, apply the oil thoroughly against the grain of the hair coat, focusing heavily on the dewlap, base of the ears, inner thighs, udder crevices, and tail switch where ticks congregate. Leave on for 24 hours. Repeat once a week for 3 consecutive weeks to break the tick hatching lifecycle.",
      scientificBasis: "Azadirachtin from neem disrupts juvenile hormone and ecdysone titers in Rhipicephalus and Hyalomma ticks, preventing molting and egg hatching. Karanjin from karanja oil dissolves the waxy epicuticle of ticks and lice, causing rapid dehydration and death of the parasites.",
      whenToCallVet: "यदि चिचड़ियों के अत्यधिक हमले के बाद पशु को 104-106°F तेज बुखार हो जाए, पेशाब का रंग कॉफी/लाल हो (Tick Fever / Babesiosis), या आंखें सफेद पड़ जाएं, तो तुरंत रक्त जांच व एंटीप्रोटोजोअल इंजेक्शन हेतु पशु चिकित्सक को बुलाएं।"
    },

    // ------------------------------------------------------------------------
    // 9. CORNEAL OPACITY & LACRIMATION (आँखों में सफेदी व धुंधलापन)
    // ------------------------------------------------------------------------
    {
      id: "evm-corneal-wash",
      condition: "Corneal Opacity, Cloudiness & Infectious Keratoconjunctivitis",
      conditionHi: "आँखों में सफेदी / मोतिया जैसा धुंधलापन व पानी बहना (फिटकरी आई वाश)",
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine", "equine"],
      ingredients: [
        {
          nameEn: "Purified Alum (Shuddha Fitkari)",
          nameHi: "शुद्ध तवे पर फूली हुई फिटकरी",
          quantity: "1 gram (micro-pinch)",
          role: "Mild ophthalmic astringent, anti-edema, shrinks corneal neovascularization"
        },
        {
          nameEn: "Pure Distilled Rose Water (Gulab Jal) or Boiled Water",
          nameHi: "शुद्ध गुलाब जल या उबला हुआ ठंडा डिस्टिल्ड पानी",
          quantity: "100 ml",
          role: "Soothing, sterile aqueous carrier, alleviates ocular burning"
        },
        {
          nameEn: "Pure Unprocessed Forest Honey (Shahad)",
          nameHi: "शुद्ध प्राकृतिक शहद",
          quantity: "5 ml",
          role: "Hyperosmotic clearing agent, bactericidal, speeds corneal epithelial repair"
        }
      ],
      preparation: "1. Hindi: फिटकरी को लोहे के तवे पर भून लें (खिल बना लें) और अत्यंत बारीक पीसें। 100 मिली गुलाब जल में केवल 1 ग्राम भुनी फिटकरी और 5 मिली शुद्ध शहद घोलें। इस घोल को जीवाणुरहित कॉटन से 3 बार छान लें ताकि कोई भी खुरदरा कण न रहे।\n2. English: Puff alum on a hot iron skillet until it dehydrates into an airy white crust; grind into micro-powder. Dissolve exactly 1 gram of puffed alum and 5 ml pure honey into 100 ml sterile rose water. Filter the solution three times through sterile surgical cotton to eliminate all micro-particulates.",
      applicationMethod: "Ophthalmic Rinse",
      dosageAndDuration: "Instill 2 to 3 drops directly into the affected eye using a sterile dropper, twice daily for 5 consecutive days. Protect the animal from direct harsh sunlight during therapy.",
      scientificBasis: "Honey creates high local osmotic pressure that withdraws excess edematous fluid from the cloudy corneal stroma, restoring corneal optical clarity. Alum acts as a mild protein precipitant that contracts congested conjunctival capillaries without harming ocular tissue when correctly diluted.",
      whenToCallVet: "यदि आँख की पुतली पर गहरा गड्ढा या अल्सर (Corneal Ulcer) दिखाई दे, आंख से मवाद बह रहा हो, या आंख बाहर की ओर उभरने लगे, तो तुरंत अधिकृत पशु चिकित्सक से एंटीबायोटिक आई ऑइंटमेंट लिखवाएं। कभी भी बिना जांच स्टेरॉयड आई ड्रॉप न डालें।"
    },

    // ------------------------------------------------------------------------
    // 10. VAGINAL / UTERINE PROLAPSE SUPPORT (पीछा दिखाना या फूल पड़ना)
    // ------------------------------------------------------------------------
    {
      id: "evm-prolapse-support",
      condition: "Vaginal / Uterine Prolapse (Pelvic Relaxation Support)",
      conditionHi: "पीछा दिखाना / फूल पड़ना / गर्भाशय बाहर आना (लज्जावंती, बबूल व फिटकरी वॉश)",
      targetSpecies: ["bovine", "bubaline", "caprine", "ovine"],
      ingredients: [
        {
          nameEn: "Touch-Me-Not Plant (Lajjawanti / Chhui-Mui Leaves)",
          nameHi: "लज्जावंती / छुईमुई के पत्ते व जड़",
          quantity: "100 grams",
          role: "Pelvic ligament tonic, astringent, promotes tissue contraction (Mimosine)"
        },
        {
          nameEn: "Babul Bark (Acacia nilotica Chhal)",
          nameHi: "बबूल / कीकर की सूखी छाल",
          quantity: "100 grams",
          role: "Intense natural tannin astringent; reduces mucosal swelling"
        },
        {
          nameEn: "Pure Desi Cow Ghee",
          nameHi: "देसी गाय का घी",
          quantity: "100 grams",
          role: "Soothes internal straining, lubricates and nourishes pelvic tissues"
        },
        {
          nameEn: "Purified Alum Wash (Fitkari Pani)",
          nameHi: "फिटकरी जल (बाहरी प्रक्षालन हेतु)",
          quantity: "50 grams in 5 liters clean water",
          role: "External antiseptic wash to shrink prolapsed organ before manual replacement"
        }
      ],
      preparation: "1. Hindi: (क) आंतरिक खुराक: छुईमुई के पत्तों और बबूल की छाल को 2 लीटर पानी में उबालें जब तक आधा लीटर न बचे। छानकर इसमें 100 ग्राम देसी घी मिलाकर काढ़ा बनाएं। (ख) बाह्य अंग सफाई: 5 लीटर गुनगुने पानी में 50 ग्राम फिटकरी घोलकर बाहर निकले अंग को धोने हेतु घोल बनाएं।\n2. English: (A) Oral Drench: Boil touch-me-not leaves and babul bark in 2 liters water down to 500 ml. Strain and blend in 100g pure cow ghee. (B) External Wash: Dissolve 50g alum in 5 liters clean lukewarm water for sanitizing and shrinking the prolapsed mass.",
      applicationMethod: "Foot Wash / Dip followed by External Topical & Oral Drench",
      dosageAndDuration: "Wash the prolapsed organ gently with the alum water to reduce swelling and clear dung debris before gentle manual repositioning. Administer the warm oral herbal-ghee drench once daily for 5 to 7 days to stop tenesmus (straining) and tighten pelvic ligaments.",
      scientificBasis: "Babul bark tannins precipitate surface proteins, shrinking edematous prolapsed vaginal mucosal folds. Mimosa pudica contains alkaloids that reinforce collagen fibers in the relaxed sacro-sciatic ligaments and suppress chronic reflexive abdominal expulsive straining.",
      whenToCallVet: "यह एक गंभीर आपातकाल है! यदि पूरा गर्भाशय बाहर आ चुका हो, अंग फट गया हो या खून बह रहा हो, तो अंग को गीली साफ चादर से ढककर रखें और तुरंत पशु चिकित्सक को बुलाकर एपिड्यूरल एनेस्थीसिया व वल्कन / बुहनेर टांके (Buhner's Suture) लगवाएं।"
    }
  ];

  // 3. SEARCH & FILTERING UTILITY METHODS
  const EVM = window.VetcareApp.ClinicalData;

  /**
   * Fetches a single EVM remedy by its unique ID.
   */
  EVM.getRemedyById = function (id) {
    if (!id || typeof id !== "string") return null;
    const cleanId = id.trim().toLowerCase();
    const list = EVM.DesiNuskhe || [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].id.toLowerCase() === cleanId) {
        return list[i];
      }
    }
    return null;
  };

  /**
   * Matches remedies for a given condition keyword.
   */
  EVM.getRemediesByCondition = function (conditionKey) {
    if (!conditionKey || typeof conditionKey !== "string") return [];
    const key = conditionKey.trim().toLowerCase();
    const list = EVM.DesiNuskhe || [];
    const results = [];

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (
        (item.condition && item.condition.toLowerCase().indexOf(key) !== -1) ||
        (item.conditionHi && item.conditionHi.indexOf(key) !== -1) ||
        (item.id && item.id.toLowerCase().indexOf(key) !== -1)
      ) {
        results.push(item);
      }
    }
    return results;
  };

  /**
   * Filters remedies applicable to a selected animal species.
   */
  EVM.getRemediesBySpecies = function (species) {
    if (!species || typeof species !== "string") return [];
    const targetSp = species.trim().toLowerCase();
    const list = EVM.DesiNuskhe || [];
    const results = [];

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (Array.isArray(item.targetSpecies) && item.targetSpecies.indexOf(targetSp) !== -1) {
        results.push(item);
      }
    }
    return results;
  };

  /**
   * Fuzzy searches across remedy names, Hindi titles, ingredients, and preparation text.
   */
  EVM.searchRemedies = function (query) {
    if (!query || typeof query !== "string") return [];
    const q = query.trim().toLowerCase();
    const list = EVM.DesiNuskhe || [];
    const results = [];

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      let matched = false;

      // Condition name search
      if (item.condition && item.condition.toLowerCase().indexOf(q) !== -1) matched = true;
      if (!matched && item.conditionHi && item.conditionHi.indexOf(q) !== -1) matched = true;

      // Preparation text search
      if (!matched && item.preparation && item.preparation.toLowerCase().indexOf(q) !== -1) matched = true;

      // Ingredients search
      if (!matched && Array.isArray(item.ingredients)) {
        for (let j = 0; j < item.ingredients.length; j++) {
          const ing = item.ingredients[j];
          if (
            (ing.nameEn && ing.nameEn.toLowerCase().indexOf(q) !== -1) ||
            (ing.nameHi && ing.nameHi.indexOf(q) !== -1) ||
            (ing.role && ing.role.toLowerCase().indexOf(q) !== -1)
          ) {
            matched = true;
            break;
          }
        }
      }

      if (matched) {
        results.push(item);
      }
    }
    return results;
  };

})();
