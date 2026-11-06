// Vetcare AI OS - Master Livestock & Companion Breed Database, Phenotypic Standards & Production Metrics (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. MASTER MULTI-SPECIES CERTIFIED BREED REPOSITORY (34 COMPREHENSIVE ZERO-PLACEHOLDER DOSSIERS)
  window.VetcareApp.ClinicalData.Breeds = [
    // ========================================================================
    // 1. BOVINE (CATTLE / गाय)
    // ========================================================================
    {
      id: "bovine-gir",
      species: "bovine",
      name: "Gir",
      nameHi: "गीर (काठियावाड़ी / सुरती / भदावरी गाय)",
      origin: "Saurashtra / Gir Hills (Gujarat, India)",
      purpose: "Dairy",
      bodyWeightKg: { adultMale: 540, adultFemale: 385, birthAvg: 22.0 },
      milkMetrics: {
        avgLactationLiters: 2500,
        lactationDays: 305,
        avgFatPercent: 4.6,
        peakYieldLitersPerDay: 18.5
      },
      physicalTraits: [
        "Convex, bulging prominent forehead ('bony dome') acting as a thermal shield (उभड़ा हुआ गुंबदाकार माथा)",
        "Long, pendulous, folded ears curled like a rolling leaf with a distinct nick at the tip (लंबे लटके हुए मुड़े कान)",
        "Horns sweeping backward, downward, and curling slightly upward like half-moons (पीछे की ओर मुड़े अर्धचंद्राकार सींग)",
        "Coat color ranges from white with dark red/chocolate patches to pure red or speckled speckled roan (चितकबरा लाल या सफेद-लाल रंग)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Exceptional resistance to tick-borne hemoparasites (Theileria, Babesia) and high immunity against clinical mastitis.",
      notes: "Renowned globally as a prime tropical dairy breed; exported heavily to Brazil (forming Gir Leiteiro). Calm docile temperament."
    },
    {
      id: "bovine-sahiwal",
      species: "bovine",
      name: "Sahiwal",
      nameHi: "साहीवाल (लोला / मुल्तानी / मोंटगोमरी गाय)",
      origin: "Montgomery District (Punjab - Indo-Pak border region)",
      purpose: "Dairy",
      bodyWeightKg: { adultMale: 520, adultFemale: 410, birthAvg: 23.5 },
      milkMetrics: {
        avgLactationLiters: 2850,
        lactationDays: 305,
        avgFatPercent: 4.7,
        peakYieldLitersPerDay: 22.0
      },
      physicalTraits: [
        "Heavily voluminous, loose dewlap and pendulous navel flap giving the nickname 'Lola' (ढीला-ढाला भारी गलकंबल)",
        "Short, stumpy, thick horns emerging laterally (छोटे, मोटे व चपटे सींग)",
        "Reddish-brown, copper-red to pale dun coat color with occasional white markings on underline (ताँबिया लाल या हल्का भूरा रंग)",
        "Large, symmetric udder with well-spaced cylindrical teats (सुडौल भारी अयन व मध्यम थन)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Superior thermoregulation; highly resistant to tropical ticks and tick-borne diseases. High drought endurance.",
      notes: "Undisputed best indigenous zebu dairy breed of the Indian subcontinent. Highest milk-yielding native dairy cow."
    },
    {
      id: "bovine-red-sindhi",
      species: "bovine",
      name: "Red Sindhi",
      nameHi: "रेड सिंधी (मालिर / लाल कराची)",
      origin: "Sindh Province & National Dairy Research Farms",
      purpose: "Dairy",
      bodyWeightKg: { adultMale: 480, adultFemale: 340, birthAvg: 21.0 },
      milkMetrics: {
        avgLactationLiters: 2200,
        lactationDays: 290,
        avgFatPercent: 4.8,
        peakYieldLitersPerDay: 16.0
      },
      physicalTraits: [
        "Deep dark-red or mahogany-brown coat color; bulls darker on shoulders, hump, and thighs (गहरा लाल या महोगनी रंग)",
        "Compact body with well-developed hump positioned symmetrically over shoulders (सुगठित मध्यम शरीर व सुडौल कूबड़)",
        "Short, thick horns pointing upwards and outwards (छोटे ऊपर की ओर उठे सींग)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Robust resistance to foot rot and tropical humidity. Performs well in warm, humid coastal zones.",
      notes: "Historically utilized extensively for crossbreeding projects in Southern India, Sri Lanka, and Southeast Asia."
    },
    {
      id: "bovine-tharparkar",
      species: "bovine",
      name: "Tharparkar",
      nameHi: "थारपारकर (सफेद सिंधी / थारी गाय)",
      origin: "Thar Desert (Rajasthan & Bordering Sindh)",
      purpose: "Dual Purpose",
      bodyWeightKg: { adultMale: 500, adultFemale: 390, birthAvg: 22.5 },
      milkMetrics: {
        avgLactationLiters: 2100,
        lactationDays: 295,
        avgFatPercent: 4.5,
        peakYieldLitersPerDay: 15.5
      },
      physicalTraits: [
        "Lyre-shaped horns curving elegantly upward and inward (ऊपर की ओर घूमे वीणा जैसे सींग)",
        "Striking white or light gray coat; color darkens to steel-gray along the spine and neck in winter (सफेद या हल्का स्लेटी रंग)",
        "Broad flat forehead with prominent poll and alert eyes (चौड़ा माथा व चुस्त आँखें)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Extreme arid drought and desert heat resistance. Can survive and produce milk on poor quality desert shrubs.",
      notes: "Exceptional dual-purpose desert cow: cows yield substantial milk while bullocks are tireless, fast draught trotters."
    },
    {
      id: "bovine-kankrej",
      species: "bovine",
      name: "Kankrej",
      nameHi: "कांकरेज (वाढियार / बन्नाई गाय)",
      origin: "Rann of Kutch & Banaskantha (Gujarat, India)",
      purpose: "Dual Purpose",
      bodyWeightKg: { adultMale: 650, adultFemale: 460, birthAvg: 26.0 },
      milkMetrics: {
        avgLactationLiters: 1900,
        lactationDays: 290,
        avgFatPercent: 4.6,
        peakYieldLitersPerDay: 14.0
      },
      physicalTraits: [
        "Massive, imposing lyre-shaped horns covered with skin at the base (विशाल, भारी व ऊपर उठे मजबूत सींग)",
        "Peculiar, majestic, springy walking gait known as 'Sawai Chal' (1.25 pace rhythm) (प्रसिद्ध सवाई चाल)",
        "Silver-gray to dark iron-gray coat color with dark shoulders and forelegs in bulls (चांदी जैसा स्लेटी या गहरा धूसर रंग)",
        "Very large, pendulous, open ears (लंबे खुले कान)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Heavy tick and tropical disease resistance. Highly immune to contagious bovine pleuropneumonia.",
      notes: "Heaviest Indian cattle breed. Ancestral contributor to the American Brahman breed; outstanding powerful draught bullocks."
    },
    {
      id: "bovine-rathi",
      species: "bovine",
      name: "Rathi",
      nameHi: "राठी (बीकानेरी / राठ गाय)",
      origin: "Bikaner, Ganganagar & Jaisalmer (North-West Rajasthan)",
      purpose: "Dual Purpose",
      bodyWeightKg: { adultMale: 470, adultFemale: 360, birthAvg: 21.5 },
      milkMetrics: {
        avgLactationLiters: 2300,
        lactationDays: 300,
        avgFatPercent: 4.5,
        peakYieldLitersPerDay: 16.5
      },
      physicalTraits: [
        "Brown coat with wide, asymmetric white patches or completely white with brown-black speckles (सफेद पृष्ठभूमि पर कत्थई/काले चकत्ते)",
        "Medium-sized, docile, gentle temperament with medium horns curving outward and upward (मध्यम घुमावदार सींग व शांत स्वभाव)",
        "Skin is tight and pliable with medium dewlap (पतली त्वचा व मध्यम गलकंबल)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Thrives in desert temperatures exceeding 48°C. Highly resilient against seasonal fodder scarcity.",
      notes: "The lifeline of rural pastoralists in the arid Thar desert. Highly efficient converter of coarse dry roughages into milk."
    },
    {
      id: "bovine-holstein-friesian",
      species: "bovine",
      name: "Holstein Friesian (HF)",
      nameHi: "होलस्टीन फ्रीजियन / एच.एफ. (विदेशी उच्च दुग्ध गाय)",
      origin: "Friesland & North Holland (The Netherlands)",
      purpose: "Dairy",
      bodyWeightKg: { adultMale: 1050, adultFemale: 680, birthAvg: 42.0 },
      milkMetrics: {
        avgLactationLiters: 7500,
        lactationDays: 305,
        avgFatPercent: 3.6,
        peakYieldLitersPerDay: 42.0
      },
      physicalTraits: [
        "Unmistakable piebald black-and-white sharply demarcated coat markings (काले और सफेद बड़े-बड़े धब्बे)",
        "Massive, angular, wedge-shaped dairy conformation with prominent milk veins (विशाल त्रिकोणीय शरीर व विशाल अयन)",
        "Small, forward-curving horns (mostly polled/dehorned commercially) (छोटे आगे की ओर मुड़े सींग)"
      ],
      heatTolerance: "Low",
      diseaseResistance: "Low resistance in tropical climates. Highly susceptible to heat stress, mastitis, foot rot, and tick-borne theileriosis.",
      notes: "World's highest milk-producing dairy breed. Requires specialized fan-and-fogger housing, chilled water, and intensive concentrate feeding in tropical climates."
    },
    {
      id: "bovine-jersey",
      species: "bovine",
      name: "Jersey",
      nameHi: "जर्सी (ब्रिटिश द्वीप उच्च वसा गाय)",
      origin: "Island of Jersey (Channel Islands, United Kingdom)",
      purpose: "Dairy",
      bodyWeightKg: { adultMale: 680, adultFemale: 430, birthAvg: 25.0 },
      milkMetrics: {
        avgLactationLiters: 4500,
        lactationDays: 305,
        avgFatPercent: 5.2,
        peakYieldLitersPerDay: 26.0
      },
      physicalTraits: [
        "Fawn, reddish-tan to light cream coat color with dark muzzle surrounded by a mealy white ring (हल्का बादामी रंग व काले नथुने के चारों तरफ सफेद घेरा)",
        "Small, refined head with dish-faced profile and large, expressive eyes (छोटा चेहरा व बड़ी सुंदर आंखें)",
        "Compact body with high feed-to-milk conversion efficiency (छोटा सुगठित शरीर)"
      ],
      heatTolerance: "Moderate",
      diseaseResistance: "Significantly better heat tolerance than HF; lower incidence of dystocia due to small calf birth size.",
      notes: "Top choice for tropical crossbreeding with indigenous cattle. Produces milk exceptionally rich in fat (5%+) and total solids."
    },

    // ========================================================================
    // 2. BUBALINE (BUFFALO / भैंस)
    // ========================================================================
    {
      id: "bubaline-murrah",
      species: "bubaline",
      name: "Murrah",
      nameHi: "मुर्रा (ब्लैक डायमंड / खुंडी भैंस)",
      origin: "Rohtak, Jind & Hisar (Haryana, India)",
      purpose: "Dairy",
      bodyWeightKg: { adultMale: 780, adultFemale: 580, birthAvg: 32.5 },
      milkMetrics: {
        avgLactationLiters: 2800,
        lactationDays: 305,
        avgFatPercent: 7.8,
        peakYieldLitersPerDay: 24.5
      },
      physicalTraits: [
        "Tightly curled, spiral horns turning backwards, upwards, and curling inwards like a jalebi (जलेबी जैसे मुड़े हुए घुंडीदार सींग)",
        "Jet black glossy coat color with very sparse hair; white switch of tail tolerated (जेट ब्लैक गहरा काला रंग)",
        "Broad, wedge-shaped body with deep chest and massive square udder (चौड़ा सुगठित शरीर व बड़ा चौकोर अयन)"
      ],
      heatTolerance: "High",
      diseaseResistance: "High natural immunity against foot-and-mouth disease and mastitis compared to crossbred cows.",
      notes: "The undisputed 'Black Diamond' of Indian dairying. Premier dairy buffalo breed used for genetic upgrading across the nation."
    },
    {
      id: "bubaline-nili-ravi",
      species: "bubaline",
      name: "Nili-Ravi",
      nameHi: "नीली-रावी (पंज कल्याणी भैंस)",
      origin: "Firozpur & Amritsar (Punjab - Sutlej & Ravi valley)",
      purpose: "Dairy",
      bodyWeightKg: { adultMale: 720, adultFemale: 540, birthAvg: 31.0 },
      milkMetrics: {
        avgLactationLiters: 2450,
        lactationDays: 300,
        avgFatPercent: 7.2,
        peakYieldLitersPerDay: 21.0
      },
      physicalTraits: [
        "Hallmark 'Panj Kalyani' markings: Distinct white patches on forehead, muzzle, all 4 lower legs/hooves, and tail switch (माथा, थूथन, चारों पैर व पूंछ पर सफेद निशान)",
        "Prominent, bulging 'wall eyes' (cat eyes) with whitish-blue irises (सफेद बिल्ली जैसी आंखें)",
        "Horns are tightly curled but less spiral than Murrah (घुमावदार सींग)"
      ],
      heatTolerance: "High",
      diseaseResistance: "Strong resistance to water-logging and riverine parasitic conditions.",
      notes: "Second highest dairy buffalo breed in India. Highly suited for canal-irrigated agricultural belts."
    },
    {
      id: "bubaline-jaffarabadi",
      species: "bubaline",
      name: "Jaffarabadi",
      nameHi: "जाफराबादी (गीर भैंस / भावनगरी)",
      origin: "Gir Forest & Saurashtra Coast (Gujarat, India)",
      purpose: "Dairy",
      bodyWeightKg: { adultMale: 880, adultFemale: 680, birthAvg: 36.0 },
      milkMetrics: {
        avgLactationLiters: 2600,
        lactationDays: 305,
        avgFatPercent: 8.2,
        peakYieldLitersPerDay: 23.0
      },
      physicalTraits: [
        "Massive, drooping, heavy flat horns curving downwards like a frame around the head before turning upward ('drooping horns') (नीचे की ओर लटके भारी चौड़े सींग)",
        "Extremely heavy, bulky body frame; heaviest riverine buffalo breed in the world (दुनिया की सबसे विशालकाय भैंस)",
        "Prominent forehead with deep frontal depression (उभरा हुआ चौड़ा माथा)"
      ],
      heatTolerance: "High",
      diseaseResistance: "High resistance against harsh humid maritime heat and coastal parasites.",
      notes: "Known for high milk fat percentage (often >8.5%). Requires large volumes of green fodder."
    },
    {
      id: "bubaline-mehsana",
      species: "bubaline",
      name: "Mehsana",
      nameHi: "मेहसाणा (मुर्रा-सूरती संकर भैंस)",
      origin: "Mehsana, Banaskantha & Sabarkantha (Gujarat, India)",
      purpose: "Dairy",
      bodyWeightKg: { adultMale: 650, adultFemale: 500, birthAvg: 29.0 },
      milkMetrics: {
        avgLactationLiters: 2350,
        lactationDays: 315,
        avgFatPercent: 7.4,
        peakYieldLitersPerDay: 19.5
      },
      physicalTraits: [
        "Horns are sickle-shaped, less tightly coiled than Murrah and less flat than Surti (दरांती जैसे मुड़े सींग)",
        "Longer body frame with an elongated head and docile temperament (लंबा शरीर व शांत स्वभाव)",
        "Coat color is mostly black; dark brown or gray variants also seen (काला या हल्का भूरा रंग)"
      ],
      heatTolerance: "High",
      diseaseResistance: "Known for consistent inter-calving intervals and low incidence of reproductive anestrus.",
      notes: "Celebrated for having the longest lactation period among Indian buffalo breeds with a very short dry period."
    },
    {
      id: "bubaline-bhadawari",
      species: "bubaline",
      name: "Bhadawari",
      nameHi: "भदावरी (ताँबिया भैंस / सर्वाधिक दूध वसा)",
      origin: "Agra, Etawah (Uttar Pradesh) & Bhind (Madhya Pradesh)",
      purpose: "Dairy",
      bodyWeightKg: { adultMale: 510, adultFemale: 410, birthAvg: 24.0 },
      milkMetrics: {
        avgLactationLiters: 1400,
        lactationDays: 280,
        avgFatPercent: 10.5,
        peakYieldLitersPerDay: 10.0
      },
      physicalTraits: [
        "Copper-colored (reddish-brown) coat with light brown hair ('copper coat') (तांबे जैसा लाल-भूरा रंग)",
        "Two distinct white lines on the lower neck called 'Chevron' or 'Doki' (गले के नीचे दो सफेद धारियां - डोकी / जनेऊ)",
        "Medium-sized body with legs light yellowish-white below knees (पैरों के निचले हिस्से पर पीलापन)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Unmatched ability to maintain body weight and produce rich milk on dry ravines and low-nutrition fodder.",
      notes: "PRODUCES THE HIGHEST MILK FAT PERCENTAGE IN THE WORLD (tested from 8% up to 13.5% Fat). Ideal for ghee manufacturing."
    },
    {
      id: "bubaline-banni",
      species: "bubaline",
      name: "Banni",
      nameHi: "बन्नी (कुंडी / कच्छी रात में चरने वाली भैंस)",
      origin: "Banni Grasslands of Kutch (Gujarat, India)",
      purpose: "Dairy",
      bodyWeightKg: { adultMale: 620, adultFemale: 490, birthAvg: 28.0 },
      milkMetrics: {
        avgLactationLiters: 2500,
        lactationDays: 300,
        avgFatPercent: 7.6,
        peakYieldLitersPerDay: 20.0
      },
      physicalTraits: [
        "Medium-sized coiled horns with vertical orientation (ऊपर की ओर उठे कुंडीदार सींग)",
        "Peculiar night-grazing instinct: Grazes during the cool desert night hours and returns to camp in morning (रात में चरने की अनूठी आदत)",
        "Compact body with black coat and dense bone structure (गहरा काला रंग व मजबूत हड्डियां)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Remarkable resistance to saline water and survival in hyper-saline Rann of Kutch marshlands.",
      notes: "Preserved by the nomadic Maldhari pastoralists. Capable of walking 15-20 km daily during summer droughts."
    },

    // ========================================================================
    // 3. CAPRINE (GOATS / बकरी)
    // ========================================================================
    {
      id: "caprine-jamnapari",
      species: "caprine",
      name: "Jamnapari",
      nameHi: "जमुनापारी (तोता मुखी बड़ी दुधारू बकरी)",
      origin: "Etawah District (Chambal ravines, Uttar Pradesh)",
      purpose: "Dairy",
      bodyWeightKg: { adultMale: 85, adultFemale: 60, birthAvg: 3.8 },
      milkMetrics: {
        avgLactationLiters: 260,
        lactationDays: 210,
        avgFatPercent: 5.2,
        peakYieldLitersPerDay: 3.5
      },
      physicalTraits: [
        "Prominent convex Roman nose resembling a parrot's beak ('Parrot mouth appearance') (तोते जैसी मुड़ी हुई रोमन नाक)",
        "Extremely long, flat, pendulous ears (25 to 30 cm long) hanging downwards (लंबे लटके हुए पत्ते जैसे कान)",
        "Large body frame with long, thick hair on the rear buttocks ('feathering') (पिछली जांघों पर लंबे घने बाल)",
        "White coat with tan or chocolate patches on neck and ears (सफेद रंग व गर्दन पर भूरे चकत्ते)"
      ],
      heatTolerance: "High",
      diseaseResistance: "Excellent adaptation to semi-arid ravine terrain; requires extensive browsing on trees and shrubs.",
      notes: "Largest and most majestic indigenous dairy goat breed in India. Used globally as an improver breed (ancestor of Anglo-Nubian)."
    },
    {
      id: "caprine-beetal",
      species: "caprine",
      name: "Beetal",
      nameHi: "बीतल (अमृतसरी / लाहौरी बकरी)",
      origin: "Gurdaspur, Amritsar (Punjab, India)",
      purpose: "Dual Purpose",
      bodyWeightKg: { adultMale: 78, adultFemale: 52, birthAvg: 3.2 },
      milkMetrics: {
        avgLactationLiters: 220,
        lactationDays: 190,
        avgFatPercent: 4.8,
        peakYieldLitersPerDay: 3.0
      },
      physicalTraits: [
        "Convex face with Roman nose, but ears are less curled than Jamnapari (रोमन नाक व लंबे चपटे कान)",
        "Horns are horizontally backward and spiraled in both males and females (नर व मादा दोनों में घुमावदार सींग)",
        "Coat color is predominantly brown, black, or red with white spots (कत्थई, काला या चितकबरा रंग)"
      ],
      heatTolerance: "High",
      diseaseResistance: "Adapts easily to stall-feeding systems; superior stall-fed viability compared to Jamnapari.",
      notes: "The premier commercial dairy and meat goat for intensive stall-fed intensive goat farming in Northern India."
    },
    {
      id: "caprine-barbari",
      species: "caprine",
      name: "Barbari",
      nameHi: "बरबरी (सिटी गोट / छोटे कान वाली बहुप्रजनी बकरी)",
      origin: "Aligarh, Mathura, Agra (UP) & Bharatpur (Rajasthan)",
      purpose: "Dual Purpose",
      bodyWeightKg: { adultMale: 42, adultFemale: 28, birthAvg: 1.8 },
      milkMetrics: {
        avgLactationLiters: 140,
        lactationDays: 150,
        avgFatPercent: 4.6,
        peakYieldLitersPerDay: 1.8
      },
      physicalTraits: [
        "Small, compact, deer-like graceful body with short, erect, tubular ears pointed outward (छोटे खड़े कान व हिरण जैसा शरीर)",
        "White coat speckled with small brown, tan, or black spots ('spotted coat') (सफेद शरीर पर कत्थई/काले गोल धब्बे)",
        "Short, twisted horns directed upwards and backwards (छोटे ऊपर की ओर उठे सींग)"
      ],
      heatTolerance: "High",
      diseaseResistance: "Highly adaptable to confinement and zero-grazing urban environments. Low incidence of mastitis.",
      notes: "Known as the 'City Goat'. Highly prolific: kiddings occur twice in 14-15 months with twins and triplets in >60% births."
    },
    {
      id: "caprine-sirohi",
      species: "caprine",
      name: "Sirohi",
      nameHi: "सिरोही (अजमेरी / परबतसरी बकरी)",
      origin: "Sirohi, Ajmer, Nagaur & Bhilwara (Rajasthan, India)",
      purpose: "Meat",
      bodyWeightKg: { adultMale: 65, adultFemale: 44, birthAvg: 2.8 },
      milkMetrics: {
        avgLactationLiters: 110,
        lactationDays: 120,
        avgFatPercent: 4.4,
        peakYieldLitersPerDay: 1.5
      },
      physicalTraits: [
        "Brown coat with light to dark brown and white circular patches; coarse flat hair (भूरा रंग व गोल धब्बे)",
        "Medium-sized, leaf-like flat pendulous ears (पत्ते जैसे मुड़े हुए मध्यम कान)",
        "Short, curved horns pointing upward and backward (छोटे पीछे मुड़े सींग)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Immense drought resilience. Resistant to extreme heat waves and gastrointestinal worm burdens.",
      notes: "Top choice for meat-oriented goat commercial fattening projects in dry and semi-arid zones."
    },
    {
      id: "caprine-black-bengal",
      species: "caprine",
      name: "Black Bengal",
      nameHi: "ब्लैक बंगाल (पूर्वी भारतीय मांस व चमड़ा बकरी)",
      origin: "West Bengal, Bihar, Jharkhand, Assam & Bangladesh",
      purpose: "Meat",
      bodyWeightKg: { adultMale: 26, adultFemale: 18, birthAvg: 1.2 },
      milkMetrics: {
        avgLactationLiters: 60,
        lactationDays: 90,
        avgFatPercent: 4.5,
        peakYieldLitersPerDay: 0.8
      },
      physicalTraits: [
        "Small, dwarf-sized, compact muscular body with tight, glossy black coat (छोटा कद, गठीला बदन व चमकदार काला रंग)",
        "Short, straight horns directed upward (छोटे सीधे सींग)",
        "Short, flat, mobile ears pointing forward (छोटे आगे की ओर कान)"
      ],
      heatTolerance: "High",
      diseaseResistance: "Extraordinary prolificacy: Breeds throughout the year; twins, triplets, and quadruplets in >80% kiddings.",
      notes: "Produces the world's most premium quality chevon (tender meat) and goat skin used for luxury leather gloves and shoes."
    },

    // ========================================================================
    // 4. OVINE (SHEEP / भेड़)
    // ========================================================================
    {
      id: "ovine-chokla",
      species: "ovine",
      name: "Chokla",
      nameHi: "चोकला (भारत की मेरिनो / शेखावाटी भेड़)",
      origin: "Shekhawati (Sikar, Jhunjhunu, Churu, Rajasthan)",
      purpose: "Wool",
      bodyWeightKg: { adultMale: 42, adultFemale: 30, birthAvg: 2.5 },
      milkMetrics: null,
      physicalTraits: [
        "Distinctive dark brown or black face with white body coat (काला या कत्थई चेहरा व सफेद ऊन)",
        "Small to medium-sized body with completely polled (hornless) females; mostly polled males (सींग रहित)",
        "Fine carpet fleece with staple length of 6-8 cm (उत्कृष्ट कालीन ऊन)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "High arid resistance; thrives under migratory desert transhumance systems.",
      notes: "Known as the 'Merino of India'. Produces the finest apparel and luxury carpet quality wool among all native sheep."
    },
    {
      id: "ovine-marwari",
      species: "ovine",
      name: "Marwari Sheep",
      nameHi: "मारवाड़ी भेड़ (काले मुख वाली मजबूत भेड़)",
      origin: "Jodhpur, Barmer, Nagaur & Pali (Rajasthan, India)",
      purpose: "Dual Purpose",
      bodyWeightKg: { adultMale: 46, adultFemale: 34, birthAvg: 2.8 },
      milkMetrics: null,
      physicalTraits: [
        "Jet black head and neck with pure white fleece on the rest of the body (गहरी काली गर्दन व सिर, सफेद ऊन)",
        "Small, tubular, folded ears resembling a dried leaf (छोटे मुड़े हुए कान)",
        "Robust legs and strong hooves capable of long-distance trekking (मजबूत खुर व लंबी टांगें)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Extraordinary flocking instinct and robust resistance to sheep pox and enterotoxemia.",
      notes: "The primary migratory sheep breed of Rajasthan. Capable of trekking hundreds of miles across states during winter."
    },
    {
      id: "ovine-nellore",
      species: "ovine",
      name: "Nellore",
      nameHi: "नेल्लोर भेड़ (भारत की सबसे ऊंची मांस भेड़)",
      origin: "Nellore & Prakasam (Andhra Pradesh, India)",
      purpose: "Meat",
      bodyWeightKg: { adultMale: 56, adultFemale: 40, birthAvg: 3.2 },
      milkMetrics: null,
      physicalTraits: [
        "Tallest sheep breed in India with long, slender legs (भारत की सबसे लंबी टांगों वाली भेड़)",
        "Haired sheep (no fleece/wool); coat consists of short, coarse hair in reddish-fawn or white colors (ऊन रहित बाल वाली भेड़)",
        "Males have twisted horns; females are polled (नर में घुमावदार सींग, मादा सींग रहित)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Immune to fleece-rot and cutaneous myiasis (flystrike) due to absence of wool fleece.",
      notes: "Ideal mutton-type sheep for peninsular tropical conditions. Highly sought after for commercial ram lamb fattening."
    },

    // ========================================================================
    // 5. EQUINE (HORSES / घोड़ा)
    // ========================================================================
    {
      id: "equine-marwari",
      species: "equine",
      name: "Marwari Horse",
      nameHi: "मारवाड़ी घोड़ा (शाही राजपूताना घोड़ा / अंदर मुड़े कान)",
      origin: "Marwar Region (Jodhpur, Rajasthan, India)",
      purpose: "Guard/Sport",
      bodyWeightKg: { adultMale: 460, adultFemale: 410, birthAvg: 35.0 },
      milkMetrics: null,
      physicalTraits: [
        "Pathognomonic inward-turning ears with tips that curve and touch each other forming an arch (अंदर की ओर मुड़े आपस में छूते हुए कान)",
        "High-set graceful neck with elegant sloping shoulders and straight profile (शानदार गर्दन व राजसी चाल)",
        "Coat colors include piebald, skewbald, chestnut, bay, and dun (चितकबरा, कत्थई व काला रंग)",
        "Natural, smooth ambling pace known as 'Revaal' (रेवाल चाल)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Remarkably tough, durable hooves rarely requiring iron shoeing on soft sands. Exceptional endurance in desert heat.",
      notes: "Celebrated war horse of the Rajput warriors. Famous for legendary battlefield bravery, loyalty, and acute hearing."
    },
    {
      id: "equine-kathiawari",
      species: "equine",
      name: "Kathiawari",
      nameHi: "काठियावाड़ी घोड़ा (गुजरात का वीर अश्व)",
      origin: "Kathiawar Peninsula (Gujarat, India)",
      purpose: "Guard/Sport",
      bodyWeightKg: { adultMale: 420, adultFemale: 370, birthAvg: 32.0 },
      milkMetrics: null,
      physicalTraits: [
        "Inward-curving ears similar to Marwari, but slightly smaller with touching tips (अंदर मुड़े छोटे कान)",
        "Dry, refined head with a concave profile and large prominent eyes (छोटा चेहरा व बड़ी आंखें)",
        "Very common dun coloration with primitive dorsal stripe and zebra bars on knees (रीढ़ पर काली धारी)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Hardy, strong-boned, heat resistant with extremely resilient hooves.",
      notes: "Favored for tent-pegging, police cavalry mounted work, and endurance riding competitions across India."
    },

    // ========================================================================
    // 6. CANINE (DOGS / कुत्ता)
    // ========================================================================
    {
      id: "canine-mudhol-hound",
      species: "canine",
      name: "Mudhol Hound",
      nameHi: "मुधोल हाउंड (कारवां हाउंड / देशी शिकारी कुत्ता)",
      origin: "Mudhol / Bagalkot (Karnataka & Maharashtra border)",
      purpose: "Guard/Sport",
      bodyWeightKg: { adultMale: 28, adultFemale: 22, birthAvg: 0.35 },
      milkMetrics: null,
      physicalTraits: [
        "Deep, aerodynamic chest with tucked-up abdomen and long slender legs (गहरी छाती, पतला पेट व लंबी टांगें)",
        "Long, narrow head with strong jaws and piercing amber/dark eyes (लंबा संकरा सिर)",
        "Short, smooth coat in fawn, black, white, brindle, or piebald (छोटा चमकदार कोट)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Exceptional stamina, low veterinary maintenance, virtually immune to hip dysplasia.",
      notes: "Premier Indian sighthound inducted into the Indian Army and paramilitary border patrol units. Outstanding speed up to 50 km/h."
    },
    {
      id: "canine-rajapalayam",
      species: "canine",
      name: "Rajapalayam",
      nameHi: "राजापलायम (शाही पोलिगर शिकारी कुत्ता)",
      origin: "Rajapalayam, Virudhunagar District (Tamil Nadu, India)",
      purpose: "Guard/Sport",
      bodyWeightKg: { adultMale: 34, adultFemale: 26, birthAvg: 0.4 },
      milkMetrics: null,
      physicalTraits: [
        "Pristine, milky-white short coat with a pink nose ('flesh-colored muzzle') (दूधिया सफेद रंग व गुलाबी नाक)",
        "Golden or amber eyes with a proud, alert, noble carriage (सुनहरी आंखें)",
        "Deep chest, muscular arch, and curled 'whip' tail (मजबूत चौड़ी छाती व कोड़े जैसी पूंछ)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Thrives in scorching tropical humidity. Resistant to cutaneous fungal infections.",
      notes: "Regal guardian breed of the Nayak royalty of Tamil Nadu. Ferociously loyal and protective guard dog."
    },
    {
      id: "canine-german-shepherd",
      species: "canine",
      name: "German Shepherd Dog (GSD)",
      nameHi: "जर्मन शेफर्ड (अल्सेशियन / कार्यशील पुलिस कुत्ता)",
      origin: "Germany",
      purpose: "Guard/Sport",
      bodyWeightKg: { adultMale: 38, adultFemale: 30, birthAvg: 0.5 },
      milkMetrics: null,
      physicalTraits: [
        "Strong, erect pointed ears and dark almond-shaped eyes (सीधे खड़े नुकीले कान)",
        "Black and tan, bi-color, or sable dense double coat with black saddle (काले व कत्थई रंग का दोहरा कोट)",
        "Angulated hindquarters with a bushy sabre tail (मजबूत झुके हुए पुट्ठे व घनी पूंछ)"
      ],
      heatTolerance: "Moderate",
      diseaseResistance: "Prone to Hip and Elbow Dysplasia, Degenerative Myelopathy, and Gastric Dilatation-Volvulus (GDV).",
      notes: "Globally revered for intelligence, trainability, military search-and-rescue, and protective guarding."
    },
    {
      id: "canine-labrador-retriever",
      species: "canine",
      name: "Labrador Retriever",
      nameHi: "लैब्राडोर रिट्रीवर (पारिवारिक शांत आज्ञाकारी कुत्ता)",
      origin: "Newfoundland / United Kingdom",
      purpose: "Guard/Sport",
      bodyWeightKg: { adultMale: 36, adultFemale: 29, birthAvg: 0.45 },
      milkMetrics: null,
      physicalTraits: [
        "Broad head with friendly, intelligent expression and medium pendant ears (चौड़ा सिर व शांत लटके कान)",
        "Thick, water-resistant short coat in yellow, black, or chocolate (घना वाटरप्रूफ कोट)",
        "Distinctive 'otter tail' that is thick at the base and tapers toward the tip (ऊदबिलाव जैसी पूंछ)"
      ],
      heatTolerance: "Moderate",
      diseaseResistance: "Prone to obesity, cruciate ligament rupture, and Progressive Retinal Atrophy (PRA).",
      notes: "The world's most popular companion dog breed. Outstanding therapy dog, guide dog for the blind, and family pet."
    },

    // ========================================================================
    // 7. FELINE (CATS / बिल्ली)
    // ========================================================================
    {
      id: "feline-indian-billi",
      species: "feline",
      name: "Indian Domestic Short Hair (Indian Billi)",
      nameHi: "भारतीय देशी बिल्ली (इंडिपेट / स्ट्रीटी)",
      origin: "Indian Subcontinent (Indigenous)",
      purpose: "Guard/Sport",
      bodyWeightKg: { adultMale: 4.5, adultFemale: 3.5, birthAvg: 0.1 },
      milkMetrics: null,
      physicalTraits: [
        "Athletic, lean, agile body with long tail and large mobile ears (फुर्तीला पतला शरीर व लंबे कान)",
        "Short, low-shedding coat in tabby, ginger, calico, black, or tuxedo patterns (छोटा चमकदार कोट)",
        "Large, expressive almond eyes varying from green to amber and copper (बड़ी हरी या सुनहरी आंखें)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Phenomenal natural immunity against common environmental pathogens and low genetic disease incidence.",
      notes: "Exceptional natural rodent predator. Highly resilient, minimal grooming requirements, and long lifespan (15-20 years)."
    },
    {
      id: "feline-persian",
      species: "feline",
      name: "Persian Cat",
      nameHi: "पर्शियन कैट (लंबे बालों वाली सुंदर बिल्ली)",
      origin: "Iran (Persia) & United Kingdom",
      purpose: "Guard/Sport",
      bodyWeightKg: { adultMale: 5.5, adultFemale: 4.0, birthAvg: 0.12 },
      milkMetrics: null,
      physicalTraits: [
        "Brachycephalic 'flat face' with shortened muzzle and deep nasal stop (सपाट चेहरा व छोटी नाक)",
        "Very long, luxurious, dense flowing double coat with rich neck ruff (अत्यधिक लंबे मुलायम बाल)",
        "Large, round, wide-set eyes and small rounded ears (बड़ी गोल आंखें व छोटे कान)"
      ],
      heatTolerance: "Low",
      diseaseResistance: "Prone to Polycystic Kidney Disease (PKD), ocular epiphora (tear staining), and respiratory brachycephalic syndrome.",
      notes: "Requires daily coat brushing to avoid matting. Kept strictly indoors in air-conditioned environments in hot climates."
    },

    // ========================================================================
    // 8. AVIAN (POULTRY / मुर्गीपालन)
    // ========================================================================
    {
      id: "avian-kadaknath",
      species: "avian",
      name: "Kadaknath",
      nameHi: "कड़कनाथ (कालामासी / काला मांस मुर्गा)",
      origin: "Jhabua & Dhar (Madhya Pradesh, India)",
      purpose: "Meat",
      bodyWeightKg: { adultMale: 2.4, adultFemale: 1.7, birthAvg: 0.032 },
      milkMetrics: null,
      physicalTraits: [
        "Pathognomonic Fibromelanosis: Complete black pigmentation of comb, wattles, tongue, beak, skin, bones, and internal visceral organs (कलगी, जीभ, त्वचा, हड्डियां व आंतरिक अंग सभी काले)",
        "Jet black plumage with greenish-bronze iridescence on feathers (चमकदार काले पंख)",
        "Lean, agile, alert game-like body stance (फुर्तीला व चौकन्ना शरीर)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "High natural resistance against Newcastle disease and coccidiosis compared to commercial broilers.",
      notes: "Geographical Indication (GI) tagged breed. Celebrated for high-protein (25%+), low-cholesterol (0.7-1.05%), iron-rich black meat."
    },
    {
      id: "avian-aseel",
      species: "avian",
      name: "Aseel",
      nameHi: "असील (लड़ाकू मुर्गा / पहलवान नस्ल)",
      origin: "Andhra Pradesh, Chhattisgarh & Uttar Pradesh",
      purpose: "Meat",
      bodyWeightKg: { adultMale: 4.5, adultFemale: 3.2, birthAvg: 0.038 },
      milkMetrics: null,
      physicalTraits: [
        "Upright, proud, towering posture with heavy bone structure and broad breast (सीधा तना हुआ पहलवान जैसा शरीर)",
        "Pea comb, virtually absent wattles, and deeply set piercing white eyes (छोटा मटर जैसा ताज व गहरी आंखें)",
        "Powerful, thick yellow shanks and lethal spur development in males (मजबूत पीली टांगें व तेज कांटेदार स्पर्स)"
      ],
      heatTolerance: "Very High",
      diseaseResistance: "Extraordinary physical hardiness and endurance. Thrives on free-range backyard scavenging.",
      notes: "Historic fighting breed of India. Famous for unmatched pugnacity, physical strength, and savory textured meat."
    },
    {
      id: "avian-white-leghorn",
      species: "avian",
      name: "White Leghorn (BV-300 / Commercial Layer)",
      nameHi: "व्हाइट लेगहॉर्न (व्यावसायिक अंडा उत्पादक मुर्गी)",
      origin: "Tuscany (Italy) & Global Commercial Strains",
      purpose: "Egg/Layer",
      bodyWeightKg: { adultMale: 2.2, adultFemale: 1.6, birthAvg: 0.035 },
      milkMetrics: null,
      physicalTraits: [
        "Pure snow-white plumage with large, bright-red single comb (flopping to one side in females) (सफेद पंख व बड़ा लाल ताज)",
        "White earlobes and bright yellow shanks and beak (सफेद कान व पीली टांगें)",
        "Lightweight, streamlined body built for maximal egg output with minimal feed maintenance (हल्का फुर्तीला शरीर)"
      ],
      heatTolerance: "High",
      diseaseResistance: "Maintained in strict biosecure, climate-controlled battery cage or layer barns. Zero broodiness instinct.",
      notes: "World's undisputed premier egg producer. Lays over 300 to 320 chalk-white eggs per year with outstanding feed conversion."
    },
    {
      id: "avian-commercial-broiler",
      species: "avian",
      name: "Commercial Broiler (Cobb 500 / Ross 308)",
      nameHi: "व्यावसायिक ब्रायलर (कॉब-500 / रॉस-308 मांस मुर्गी)",
      origin: "Commercial International Genetic Hybrids",
      purpose: "Broiler",
      bodyWeightKg: { adultMale: 3.8, adultFemale: 3.2, birthAvg: 0.042 },
      milkMetrics: null,
      physicalTraits: [
        "Broad, heavily fleshed, muscular breast and thick thighs (अत्यधिक चौड़ी भारी मांसल छाती)",
        "Pure white feathering with pale pink skin and yellow shanks (सफेद पंख व मोटी टांगें)",
        "Rapid growth rate: Attains 2.2 to 2.6 kg live harvest weight in just 35 to 40 days (35-40 दिनों में 2.5 किलो वजन)"
      ],
      heatTolerance: "Moderate",
      diseaseResistance: "Susceptible to heat stress, ascites (water-belly), and sudden death syndrome if ventilation is poor.",
      notes: "Engineered for extraordinary Feed Conversion Ratio (FCR ~1.45 to 1.55). Demands strict temperature and biosecure management."
    }
  ];

  // 3. SEARCH & ANALYTICAL LOOKUP ENGINE
  const BreedsEngine = {
    registry: window.VetcareApp.ClinicalData.Breeds
  };

  /**
   * Fetches a single breed object by its unique ID.
   */
  BreedsEngine.getBreedById = function (id) {
    if (!id || typeof id !== "string") return null;
    const cleanId = id.trim().toLowerCase();
    const list = BreedsEngine.registry || [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].id.toLowerCase() === cleanId) {
        return list[i];
      }
    }
    return null;
  };

  /**
   * Returns all breeds belonging to a selected species category.
   */
  BreedsEngine.getBreedsBySpecies = function (species) {
    if (!species || typeof species !== "string") return [];
    const target = species.trim().toLowerCase();
    const list = BreedsEngine.registry || [];
    return list.filter(function (breed) {
      return breed.species.toLowerCase() === target;
    });
  };

  /**
   * Fuzzy searches across breed names (English/Hindi), origin, purpose, or traits.
   */
  BreedsEngine.searchBreeds = function (query) {
    if (!query || typeof query !== "string") return [];
    const q = query.trim().toLowerCase();
    const list = BreedsEngine.registry || [];
    const results = [];

    for (let i = 0; i < list.length; i++) {
      const breed = list[i];
      let matched = false;

      if (breed.name && breed.name.toLowerCase().indexOf(q) !== -1) matched = true;
      if (!matched && breed.nameHi && breed.nameHi.indexOf(q) !== -1) matched = true;
      if (!matched && breed.origin && breed.origin.toLowerCase().indexOf(q) !== -1) matched = true;
      if (!matched && breed.purpose && breed.purpose.toLowerCase().indexOf(q) !== -1) matched = true;

      // Traits check
      if (!matched && Array.isArray(breed.physicalTraits)) {
        for (let j = 0; j < breed.physicalTraits.length; j++) {
          if (breed.physicalTraits[j].toLowerCase().indexOf(q) !== -1) {
            matched = true;
            break;
          }
        }
      }

      if (matched) {
        results.push(breed);
      }
    }
    return results;
  };

  /**
   * Returns average standard adult weight for accurate drug dosing.
   */
  BreedsEngine.getAverageWeight = function (breedId, gender) {
    const breed = BreedsEngine.getBreedById(breedId);
    if (!breed || !breed.bodyWeightKg) return null;

    const g = (gender || "female").trim().toLowerCase();
    if (g === "male") {
      return breed.bodyWeightKg.adultMale;
    } else if (g === "birth" || g === "calf" || g === "kid" || g === "lamb") {
      return breed.bodyWeightKg.birthAvg;
    }
    return breed.bodyWeightKg.adultFemale;
  };

  /**
   * Returns expected peak yield and lactation metrics for dairy benchmarking.
   */
  BreedsEngine.getExpectedMilkYield = function (breedId) {
    const breed = BreedsEngine.getBreedById(breedId);
    if (!breed || !breed.milkMetrics) {
      return {
        isDairy: false,
        message: "This breed is not classified under dairy production."
      };
    }

    return {
      isDairy: true,
      breedName: breed.name,
      avgLactationLiters: breed.milkMetrics.avgLactationLiters,
      lactationDays: breed.milkMetrics.lactationDays,
      avgFatPercent: breed.milkMetrics.avgFatPercent,
      peakYieldLitersPerDay: breed.milkMetrics.peakYieldLitersPerDay,
      dailyAverageLiters: Number((breed.milkMetrics.avgLactationLiters / breed.milkMetrics.lactationDays).toFixed(2))
    };
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.BreedsEngine = BreedsEngine;

})();
