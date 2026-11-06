// Vetcare AI OS - Veterinary Theriogenology, Estrous Synchronization & Infertility Management Engine (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. SPECIES ESTROUS DYNAMICS MATRIX
  const ESTROUS_DYNAMICS = {
    bovine: {
      speciesEn: "Bovine (Cow)",
      speciesHi: "गाय (गोवंश)",
      cycleLengthDays: { avg: 21, range: [18, 24] },
      estrusDurationHours: { avg: 18, range: [12, 24] },
      ovulationTime: "10 to 14 hours after the cessation of standing heat (Spontaneous Ovulator)",
      optimalAiWindowHours: "10 to 14 hours after first observed standing heat (AM-PM Rule)",
      cardinalSigns: [
        "Standing to be mounted by herd mates ('Standing Heat' - Definitive Cardinal Sign)",
        "Discharge of crystal-clear, highly viscous, cohesive, stringy cervical mucus ('शीशे जैसा पारदर्शी तार')",
        "Hyperaemia, tumefaction, and oedematous relaxation of the vulvar labia",
        "Frequent bellowing, vocalization, restlessness, excitable behavior, and sudden drop in milk yield",
        "Frequent micturition in small squirts, sniffing, chin-resting on other cows, and flehmen reaction"
      ],
      speciesNuances: "Cattle exhibit distinct follicular waves (2 or 3 waves per cycle). Standing heat is shorter in high-yielding dairy cows due to rapid metabolic clearance of estradiol by elevated hepatic blood flow."
    },
    bubaline: {
      speciesEn: "Bubaline (Water Buffalo)",
      speciesHi: "भैंस (महिषवंश)",
      cycleLengthDays: { avg: 21, range: [19, 25] },
      estrusDurationHours: { avg: 20, range: [12, 30] },
      ovulationTime: "11 to 15 hours after the end of estrus",
      optimalAiWindowHours: "12 to 18 hours after onset of heat signs (Slightly later than cattle)",
      cardinalSigns: [
        "Frequent tail flicking, vertical cocking, and switching of tail over perineum",
        "Frequent micturition in presence of male or teaser bull",
        "Clear to whitish mucoid vaginal discharge (less copious stringiness than cattle)",
        "Engorgement and moist pink appearance of the vulva with relaxed external cervical os"
      ],
      speciesNuances: "CRITICAL BUFFALO REPRODUCTIVE NUANCE: Over 50% to 60% of summer estrous cycles are 'Silent Estrus' (मूक मद) due to hyperprolactinemia, photoperiod, and heat stress. Buffaloes rarely mount other females. Nocturnal heat expression is paramount: >70% of sexual activity occurs between 10 PM and 4 AM. Requires teaser bull parading or manual rectal uterine tone examination."
    },
    caprine: {
      speciesEn: "Caprine (Goat / Doe)",
      speciesHi: "बकरी",
      cycleLengthDays: { avg: 21, range: [18, 22] },
      estrusDurationHours: { avg: 36, range: [24, 48] },
      ovulationTime: "24 to 36 hours after the onset of standing estrus (near end of heat)",
      optimalAiWindowHours: "18 to 24 hours after onset of standing estrus",
      cardinalSigns: [
        "Rapid, frantic wagging/flicking of the tail laterally ('tail flagging' - फ्लैगिंग)",
        "Continuous vocalization, loud bleating, and search for the buck (male goat)",
        "Swollen, hyperaemic vulva with moist discharge, restlessness, and tail-marking"
      ],
      speciesNuances: "Strictly seasonally polyestrous (short-day breeders in temperate zones; year-round in tropics). Strong buck effect (introducing a male after isolation induces synchronized ovulation in 48-72 hours)."
    },
    ovine: {
      speciesEn: "Ovine (Sheep / Ewe)",
      speciesHi: "भेड़",
      cycleLengthDays: { avg: 17, range: [14, 19] },
      estrusDurationHours: { avg: 30, range: [24, 36] },
      ovulationTime: "20 to 30 hours after onset of estrus (toward end of heat)",
      optimalAiWindowHours: "12 to 18 hours after onset of estrus",
      cardinalSigns: [
        "Very subtle behavioral signs in absence of ram; standing still when mounted by ram",
        "Fanning the tail, seeking out the ram, sniffing the scrotum, and turning head backward"
      ],
      speciesNuances: "Shortest estrous cycle (17 days) among domestic ruminants. Ewes exhibit virtually zero overt behavioral signs without the physical presence of a ram."
    },
    equine: {
      speciesEn: "Equine (Horse / Mare)",
      speciesHi: "घोड़ी",
      cycleLengthDays: { avg: 21, range: [19, 23] },
      estrusDurationHours: { avg: 120, range: [96, 168] }, // 5 to 7 days!
      ovulationTime: "24 to 48 hours BEFORE the cessation of estrus",
      optimalAiWindowHours: "Every 48 hours starting on Day 3 of estrus until ovulation is confirmed via ultrasonography",
      cardinalSigns: [
        "Frequent urination, squatting stance with elevated tail ('winking' of the clitoris)",
        "Eversion and rhythmic contraction of the labia exposing the clitoris (क्लिटोरल विंकिंग)",
        "Docile acceptance of stallion without kicking or defensive biting"
      ],
      speciesNuances: "Longest estrus duration (5 to 7 days). Seasonally polyestrous (long-day spring/summer breeders stimulated by increasing photoperiod). Ovulation occurs before heat ends."
    },
    canine: {
      speciesEn: "Canine (Bitch)",
      speciesHi: "कुतिया",
      cycleLengthDays: { avg: 210, range: [150, 300] }, // Monoestrous (twice a year)
      estrusDurationHours: { avg: 216, range: [120, 288] }, // 9 days
      ovulationTime: "2 to 3 days after the initial LH surge (immature primary oocytes require 48-72 hrs to mature)",
      optimalAiWindowHours: "Days 11 and 13 of the estrous cycle (or 4 to 6 days after the LH peak / Serum Progesterone 5-10 ng/ml)",
      cardinalSigns: [
        "Proestrus: Swollen turgid vulva with sanguineous (bloody) vaginal discharge (9 days)",
        "Estrus: Softening of vulva, straw-colored serosanguinous discharge, standing heat with tail deflected to one side (flagging), lordosis reflex"
      ],
      speciesNuances: "Monoestrous non-seasonal breeder. Canine oocytes ovulate as immature primary oocytes at the dictyotene stage and must mature in the oviduct for 48-72 hours before fertilization."
    }
  };

  // 3. HORMONAL HEAT SYNCHRONIZATION PROTOCOLS
  const SYNCHRONIZATION_PROTOCOLS = [
    // ========================================================================
    // 1. OVSYNCH PROTOCOL (GnRH - PGF2α - GnRH Timed A.I.)
    // ========================================================================
    {
      id: "sync-ovsynch",
      nameEn: "Standard Ovsynch Protocol (10-Day Timed A.I.)",
      nameHi: "ओवसिंक प्रोटोकॉल (10 दिवसीय निश्चित समय गर्भाधान)",
      targetSpecies: ["bovine", "bubaline"],
      indications: [
        "Timed Artificial Insemination (TAI) without the requirement of estrus detection",
        "Overcoming silent heat (मूक मद) in summer-stressed water buffaloes and crossbred cows",
        "Large-scale commercial dairy reproductive herd management"
      ],
      timetable: [
        {
          day: 0,
          time: "08:00 AM",
          drugName: "GnRH (Gonadotropin Releasing Hormone)",
          brandExample: "Receptal / Gynarich / Conceptal (Buserelin Acetate)",
          doseVolume: "2.5 ml (10 µg Buserelin) IM",
          physiologicalAction: "Induces LH surge, causes ovulation or luteinization of dominant follicle, and initiates a synchronous new follicular wave."
        },
        {
          day: 7,
          time: "08:00 AM (7 Days later)",
          drugName: "PGF2α (Prostaglandin F2 alpha)",
          brandExample: "Vetmate / Cloprostol / Juramate (Cloprostenol Sodium)",
          doseVolume: "2.0 ml (500 µg Cloprostenol) IM",
          physiologicalAction: "Induces complete luteolysis (regression) of the original corpus luteum and the newly formed day-0 luteal tissue."
        },
        {
          day: 9,
          time: "05:00 PM (56 Hours post-PGF2α)",
          drugName: "GnRH (2nd Dose)",
          brandExample: "Receptal (Buserelin Acetate)",
          doseVolume: "2.5 ml (10 µg Buserelin) IM",
          physiologicalAction: "Synchronizes the definitive pre-ovulatory LH surge, ensuring synchronized ovulation in 28-32 hours."
        },
        {
          day: 10,
          time: "09:00 AM (16 to 18 Hours post-2nd GnRH)",
          drugName: "Timed Artificial Insemination (TAI)",
          brandExample: "Frozen-thawed semen straw",
          doseVolume: "1 Cryopreserved straw deposited in uterine body",
          physiologicalAction: "Fixed-time insemination. Ovulation occurs 8-12 hours post-AI, perfectly aligning with viable sperm capacitation."
        }
      ],
      successRateExpected: "45% to 55% first-service conception rate in cyclic cattle; 35% to 45% in buffaloes during low breeding season.",
      criticalFieldTips: [
        "Do NOT initiate Ovsynch in true anestrus animals with smooth, completely inactive ovaries (pre-synch or progesterone device preferred).",
        "Maintain strict cold-chain for GnRH and PGF2α; inject deep intramuscularly with an 18G needle."
      ]
    },

    // ========================================================================
    // 2. PRID / CIDR PROGESTERONE PROTOCOL
    // ========================================================================
    {
      id: "sync-cidr-progesterone",
      nameEn: "CIDR / PRID Intravaginal Progesterone Insert Protocol",
      nameHi: "सी.आई.डी.आर. (CIDR) प्रोजेस्टेरोन प्रोटोकॉल (एनोस्ट्रस व बांझपन निवारक)",
      targetSpecies: ["bovine", "bubaline"],
      indications: [
        "True anestrus cows and heifers with small inactive ovaries (अंडाशय पर कोई हलचल न होना)",
        "Post-partum anestrus buffaloes with persistent non-cycling ovaries",
        "High-producing repeat breeder cows with luteal phase defects"
      ],
      timetable: [
        {
          day: 0,
          time: "Morning",
          drugName: "CIDR Intravaginal Insert (1.38g Progesterone) + GnRH IM",
          brandExample: "EAZI-BREED CIDR + Receptal (2.5 ml IM)",
          doseVolume: "1 Device inserted intravaginally + 10 µg GnRH IM",
          physiologicalAction: "Maintains high exogenous plasma progesterone, mimicking a functional luteal phase and resetting the hypothalamic GnRH pulse generator."
        },
        {
          day: 7,
          time: "Morning",
          drugName: "PGF2α (Cloprostenol)",
          brandExample: "Vetmate / Juramate (500 µg)",
          doseVolume: "2.0 ml IM",
          physiologicalAction: "Causes regression of any existing corpus luteum."
        },
        {
          day: 8,
          time: "Morning (24 Hours post-PGF2α)",
          drugName: "CIDR Removal + Optional eCG (PMSG)",
          brandExample: "Withdraw CIDR device + Folligon (300-500 IU IM optional)",
          doseVolume: "Gentle traction on removal string",
          physiologicalAction: "Abrupt progesterone withdrawal triggers explosive rebound release of GnRH and high-frequency LH pulses, stimulating final follicular maturation."
        },
        {
          day: 9,
          time: "Evening (36 Hours post-CIDR removal)",
          drugName: "GnRH Injection",
          brandExample: "Receptal (10 µg)",
          doseVolume: "2.5 ml IM",
          physiologicalAction: "Triggers pre-ovulatory LH surge."
        },
        {
          day: 10,
          time: "Morning (54 to 56 Hours post-CIDR removal)",
          drugName: "Fixed-Time Artificial Insemination (FTAI)",
          brandExample: "Certified high-fertile semen straw",
          doseVolume: "1 Semen Straw deposited in uterine body",
          physiologicalAction: "Fixed-time insemination."
        }
      ],
      successRateExpected: "50% to 65% conception rate in properly managed, nutritionally balanced dairy stock.",
      criticalFieldTips: [
        "Lubricate applicator with sterile chlorhexidine cream before vaginal insertion; avoid fecal contamination.",
        "Mild vaginitis with cloudy mucus upon CIDR removal is common and normal (does not compromise conception)."
      ]
    },

    // ========================================================================
    // 3. DOUBLE PGF2α PROTOCOL
    // ========================================================================
    {
      id: "sync-double-pgf2a",
      nameEn: "Double PGF2α Synchronization Protocol (11 to 14 Days Apart)",
      nameHi: "डबल पीजीएफ-2 अल्फा प्रोटोकॉल (11 से 14 दिन अंतराल)",
      targetSpecies: ["bovine", "bubaline", "caprine"],
      indications: [
        "Cycling dairy herds with high estrus detection capabilities",
        "Low-cost synchronization for cyclic cattle with functional corpus luteum",
        "Heifer synchronization programs"
      ],
      timetable: [
        {
          day: 0,
          time: "Day 0",
          drugName: "PGF2α (1st Injection)",
          brandExample: "Cloprostenol (500 µg) / Lutalyse (25 mg Dinoprost)",
          doseVolume: "2.0 ml IM",
          physiologicalAction: "Induces luteolysis in animals between Days 6 and 17 of their estrous cycle (approx 60-70% of herd responds and comes into heat in 48-72 hours)."
        },
        {
          day: 11,
          time: "Day 11 to 14 (11-14 Days later)",
          drugName: "PGF2α (2nd Injection)",
          brandExample: "Cloprostenol (500 µg)",
          doseVolume: "2.0 ml IM",
          physiologicalAction: "Administered to all animals not inseminated post-dose 1. All animals now possess a responsive corpus luteum between Days 6-12 of cycle; 100% come into synchronized heat in 48-72 hours."
        },
        {
          day: 14,
          time: "72 to 80 Hours post-2nd PGF2α",
          drugName: "Artificial Insemination (AI)",
          brandExample: "Standard Semen Straw",
          doseVolume: "Inseminate upon standing heat or double AI at 72 & 96 hours",
          physiologicalAction: "Highly synchronized estrus."
        }
      ],
      successRateExpected: "55% to 65% conception in normal cycling dairy cattle.",
      criticalFieldTips: [
        "CRITICAL: INEFFECTIVE IN ANESTRUS ANIMALS (PGF2α requires a mature functional corpus luteum to act upon; zero response in smooth ovaries).",
        "STRICT PREGNANCY WARNING: NEVER ADMINISTER TO PREGNANT ANIMALS (causes immediate abortion within 48-72 hours)."
      ]
    }
  ];

  // 4. INFERTILITY & UTERINE PATHOLOGY PROTOCOLS
  const INFERTILITY_CONDITIONS = [
    // ========================================================================
    // REPEAT BREEDING SYNDROME (पशु का बार-बार फिरना)
    // ========================================================================
    {
      id: "infert-repeat-breeder",
      conditionEn: "Repeat Breeding Syndrome (RBS)",
      conditionHi: "रिपीट ब्रीडिंग सिंड्रोम (पशु का 3 या अधिक बार सही समय पर AI कराने पर भी न ठहरना)",
      primaryEtiology: [
        "Subclinical Endometritis (low-grade uterine bacterial colonization)",
        "Early Embryonic Death (EED) due to Luteal Phase Insufficiency (low progesterone)",
        "Ovulatory defects: Delayed ovulation (ovulating >24 hours post-estrus) or anovulatory cycles",
        "Poor semen handling: Cold shock, incorrect thawing, or deposition in the cervix instead of uterine body"
      ],
      clinicalDiagnostics: [
        "Normal regular estrous cycles (every 18-24 days) with absence of clinical pus or abnormal discharge",
        "White side test or Cytobrush endometrial cytology: PMN count >5% indicates subclinical endometritis",
        "Uterine horn asymmetry and tone evaluation during estrus"
      ],
      therapeuticProtocol: [
        {
          step: "Protocol 1: Ovulatory Synchronization & Luteal Support",
          intervention: "Administer GnRH (Buserelin Acetate 10 µg / 2.5 ml IM) at the EXACT TIME OF ARTIFICIAL INSEMINATION. Follow with a second dose of GnRH on Day 5 post-AI.",
          rationale: "GnRH at AI accelerates and synchronizes LH release, overcoming delayed ovulation. GnRH on Day 5 induces an accessory corpus luteum, boosting plasma progesterone to support embryo survival."
        },
        {
          step: "Protocol 2: Intrauterine Therapy for Subclinical Endometritis",
          intervention: "Infuse Intrauterine Cephapirin (Metricure 500 mg pre-filled syringe) 24 hours post-AI or during the mid-cycle luteal phase.",
          rationale: "First-generation cephalosporin active against Trueperella pyogenes and anaerobes without destroying delicate endometrial cilia."
        }
      ],
      prognosis: "60-70% conception rate when ovulatory and luteal protocols are rigorously observed."
    },

    // ========================================================================
    // TRUE ANESTRUS (पूर्ण मदहीनता / बांझपन)
    // ========================================================================
    {
      id: "infert-true-anestrus",
      conditionEn: "True Anestrus (Smooth Inactive Ovaries)",
      conditionHi: "सच्ची मदहीनता / बांझपन (अंडाशय पर कोई हलचल या फोलिकल न होना)",
      primaryEtiology: [
        "Negative Energy Balance (NEB) and chronic protein-mineral malnutrition",
        "Deficiency of trace minerals (chelated Copper, Cobalt, Zinc, Manganese, Iodine)",
        "Vitamin A, D3, and E deficiencies in non-grazing stall-fed cattle",
        "High blood prolactin in summer-stressed water buffaloes"
      ],
      clinicalDiagnostics: [
        "Rectal examination: Both ovaries are small, flat, smooth, firm, and pebble-like with complete absence of functional structures (no corpus luteum, no dominant follicle >8 mm) on 2 examinations 10 days apart."
      ],
      therapeuticProtocol: [
        {
          step: "Step 1: Nutritional Priming & Deworming",
          intervention: "Drench broad-spectrum Fenbendazole (7.5 mg/kg) + feed Chelated Mineral Mixture (100g/day) + Bypass Fat (100g/day) continuously for 21 days.",
          rationale: "Corrects hypothalamic metabolic energy sensors (leptin/IGF-1) required to resume GnRH pulsatility."
        },
        {
          step: "Step 2: Vitamin Surge",
          intervention: "Inject Vitamin A, D3, E (Vimeral / Intavita 5 ml IM) once weekly for 3 weeks.",
          rationale: "Vitamin A regenerates ovarian germinal epithelium and steroidogenic enzyme activity."
        },
        {
          step: "Step 3: Hormonal Induction (If unresponsive after 21 days)",
          intervention: "Apply CIDR Intravaginal Insert for 7 days + administer eCG/PMSG (400-500 IU IM) on day of CIDR withdrawal.",
          rationale: "eCG possesses potent dual FSH/LH activity, stimulating primordial follicles into active antral growth."
        }
      ],
      prognosis: "Excellent (>75% estrus induction) once nutritional deficits are corrected."
    },

    // ========================================================================
    // SUBESTRUS / SILENT HEAT (मूक मद)
    // ========================================================================
    {
      id: "infert-silent-heat",
      conditionEn: "Subestrus / Silent Heat (Unobserved Estrus)",
      conditionHi: "मूक मद / साइलेंट हीट (अंडाशय सक्रिय परंतु बाहर कोई लक्षण न दिखना)",
      primaryEtiology: [
        "High environmental heat stress (Summer depression of estradiol output)",
        "Poor estrus observation (no night-time watching in buffaloes)",
        "Individual low sensitivity of hypothalamic behavioral centers to normal circulating estrogens"
      ],
      clinicalDiagnostics: [
        "Rectal palpation reveals a fully mature, prominent, functional Corpus Luteum (CL) with central/apical crown, good uterine tone, but the farmer reports the animal never shows heat."
      ],
      therapeuticProtocol: [
        {
          step: "Single Dose Luteolytic Therapy",
          intervention: "Administer PGF2α (Cloprostenol Sodium 500 µg / 2 ml deep IM).",
          rationale: "Rapidly lyses the active corpus luteum, causing sudden plunge in progesterone within 24 hours. The cow comes into overt standing estrus within 48 to 72 hours."
        },
        {
          step: "Fixed Time Insemination",
          intervention: "Inseminate at 72 hours and 96 hours post-injection, or perform strict hourly night-time heat checks.",
          rationale: "Guarantees semen availability even if behavioral signs remain subtle."
        }
      ],
      prognosis: "Very high (>80% estrus response within 72-96 hours)."
    },

    // ========================================================================
    // CYSTIC OVARIAN DISEASE (अंडाशय में गांठ / रसौली)
    // ========================================================================
    {
      id: "infert-cystic-ovaries",
      conditionEn: "Cystic Ovarian Disease / COD (Follicular vs Luteal Cysts)",
      conditionHi: "अंडाशय रसौली / सिस्ट (फॉलिक्युलर सिस्ट - लगातार मद व ल्यूटियल सिस्ट - मदहीनता)",
      primaryEtiology: [
        "Failure of pre-ovulatory LH surge or hypothalamic receptor insensitivity",
        "High-yielding dairy cow stress, feeding high phytoestrogen clover diets"
      ],
      clinicalDiagnostics: [
        "FOLLICULAR CYSTS: Thin-walled fluid-filled structure >2.5 cm diameter persisting for >10 days. Animal exhibits nymphomania (constant frequent mounting, buller cow, relaxed pelvic ligaments).",
        "LUTEAL CYSTS: Thick-walled (>3 mm) luteinized cyst with central fluid cavity. Animal exhibits persistent anestrus."
      ],
      therapeuticProtocol: [
        {
          step: "Treatment for Follicular Cysts (Nymphomania)",
          intervention: "Administer GnRH (Buserelin Acetate 20 µg / 5 ml IM - double dose) OR Human Chorionic Gonadotropin (hCG 3,000 to 5,000 IU IV/IM). Follow with PGF2α 9 days later.",
          rationale: "High LH-like activity of GnRH/hCG forces the thin-walled follicular cyst to luteinize into solid luteal tissue. Subsequent PGF2α lyses the luteinized cyst, restoring normal cyclicity."
        },
        {
          step: "Treatment for Luteal Cysts (Anestrus)",
          intervention: "Administer PGF2α (Cloprostenol 500 µg IM).",
          rationale: "Directly causes luteolysis of the thick-walled luteinized tissue; estrus follows in 3-4 days."
        }
      ],
      prognosis: "Good (65-75% resolution). CRITICAL WARNING: NEVER forcefully crush or rupture ovarian cysts manually per rectum (triggers severe hemorrhage, ovarian bursal adhesions, and permanent sterility)."
    },

    // ========================================================================
    // UTERINE INFECTIONS (गर्भाशय संक्रमण)
    // ========================================================================
    {
      id: "infert-uterine-infections",
      conditionEn: "Uterine Infections (Clinical Endometritis & Pyometra)",
      conditionHi: "गर्भाशय संक्रमण / बच्चेदानी में मवाद (एंडोमेट्राइटिस व पयोमेट्रा)",
      primaryEtiology: [
        "Post-parturient contamination: Dystocia, retained placenta (ROP), unhygienic calving",
        "Trueperella pyogenes, Escherichia coli, and Fusobacterium necrophorum infection"
      ],
      clinicalDiagnostics: [
        "ENDOMETRITIS: Mucopurulent or yellowish-white cloudy discharge ('flakes of pus') during estrus.",
        "PYOMETRA: Massive accumulation of pus in uterine lumen with a persistent retained corpus luteum and closed cervix; animal in anestrus."
      ],
      therapeuticProtocol: [
        {
          step: "Evacuation of Uterine Contents (Drug of Choice)",
          intervention: "Administer PGF2α (Cloprostenol 500 µg IM). Repeat after 11 days if needed.",
          rationale: "Lyses the retained corpus luteum, opens the cervix, and induces powerful myometrial contractions that naturally evacuate trapped pus."
        },
        {
          step: "Targeted Intrauterine Therapy",
          intervention: "Infuse Intrauterine Cephapirin (Metricure 500mg) during estrus or 24-48 hours post-PGF2α. Alternatively, flush with 0.5% dilute Lugol's iodine (30-50 ml).",
          rationale: "Eliminates deep bacterial pathogens without scorching delicate endometrial caruncles."
        }
      ],
      prognosis: "High recovery rate when treated early. AVOID caustic irritants (pure iodine or phenyl) which cause permanent endometrial fibrosis."
    }
  ];

  // 5. RECTAL PREGNANCY DIAGNOSIS (P.D.) MILESTONES
  const PREGNANCY_MILESTONES = [
    {
      dayMin: 30,
      dayMax: 35,
      milestoneEn: "Fetal Membrane Slip & Horn Asymmetry",
      milestoneHi: "झिल्ली का फिसलना (मेम्ब्रेन स्लिप) व सींग का बड़ा होना",
      cardinalSign: "Positive Fetal Membrane Slip (FMS): Gently grasping the wall of the gravid uterine horn between thumb and index finger and letting it slip reveals the distinct double-step sensation of the chorioallantois slipping through fingers. Slight asymmetry of the pregnant horn.",
      uterineSizeComparison: "Pregnant horn slightly larger than non-pregnant horn (like a soft banana)."
    },
    {
      dayMin: 45,
      dayMax: 60,
      milestoneEn: "Amniotic Vesicle Palpation",
      milestoneHi: "एमनियोटिक थैली (अंडे के आकार की पानी भरी गेंद)",
      cardinalSign: "Amniotic vesicle palpable as a distinct, turgid, fluid-filled, oval fluctuant balloon (hen's egg size) moving freely inside the pregnant horn. Slip test readily positive.",
      uterineSizeComparison: "Pregnant horn resembles a 7-8 cm soft curved balloon (Hen's egg to tennis ball size)."
    },
    {
      dayMin: 90,
      dayMax: 100,
      milestoneEn: "Small Fetus & Pea-Sized Placentomes",
      milestoneHi: "भ्रूण का स्पर्श (छोटे चूहे जैसा) व मटर जैसे प्लेसेंटोम",
      cardinalSign: "Fetus directly palpable by gentle ballottement (size of a small kitten or rat / 12-15 cm). Early placentomes palpable near the bifurcation as soft pea-sized nodules (1-1.5 cm). Middle uterine artery begins to enlarge.",
      uterineSizeComparison: "Uterine horn pulled down toward pelvic brim (approx size of a 1-liter bottle)."
    },
    {
      dayMin: 120,
      dayMax: 150,
      milestoneEn: "Hypertrophy of Middle Uterine Artery & Uterine Fremitus",
      milestoneHi: "आर्टरी में फ्रीमिटस (मधुमक्खी जैसी भिनभिनाहट) व सुपारी जैसे प्लेसेंटोम",
      cardinalSign: "PATHOGNOMONIC FREMITUS: Middle uterine artery (located in broad ligament anterior to external iliac artery) is markedly hypertrophied and exhibits a distinct buzzing, whirring, pulsating thrill ('Fremitus' - like touching a purring cat). Placentomes easily palpable as marble to walnut-sized nodules (2.5-3.5 cm).",
      uterineSizeComparison: "Uterus descends deep into abdominal floor; cervix pulled over pelvic brim."
    },
    {
      dayMin: 180,
      dayMax: 210,
      milestoneEn: "Abdominal Fetal Ascent & Ballottement",
      milestoneHi: "बछड़े का सिर व पैर आसानी से स्पर्श होना",
      cardinalSign: "Fetus ascends back toward pelvic inlet. Fetal head, nose, orbits, and forefeet directly palpable per rectum. Placentomes large (lemon to palm size). Strong bilateral fremitus.",
      uterineSizeComparison: "Fetus is size of a medium dog (40-50 cm long)."
    },
    {
      dayMin: 240,
      dayMax: 285,
      milestoneEn: "Late Gestation / Parturition Imminent",
      milestoneHi: "पूर्ण विकसित बछड़ा / प्रसव निकट",
      cardinalSign: "Massive fetal head and forelimbs fill the pelvic brim. Relaxation of the sacro-sciatic ligaments (sunken tailhead), hyperaemic swollen vulva with thick mucus plug liquefaction, and udder edema / colostrum engorgement.",
      uterineSizeComparison: "Full-term calf filling maternal pelvis."
    }
  ];

  // 6. THERIOGENOLOGY ENGINE IMPLEMENTATION
  const TheriogenologyEngine = {
    dynamics: ESTROUS_DYNAMICS,
    synchronization: SYNCHRONIZATION_PROTOCOLS,
    infertility: INFERTILITY_CONDITIONS,
    milestones: PREGNANCY_MILESTONES
  };

  /**
   * ARTIFICIAL INSEMINATION (A.I.) OPTIMAL TIMING & THAWING ENGINE:
   * Implements the clinical AM-PM rule and cryogenic handling steps.
   *
   * @param {string} species - 'bovine' or 'bubaline'
   * @param {string|Date} heatOnsetTimestamp - Timestamp of first observed standing heat
   */
  TheriogenologyEngine.calculateAiWindow = function (species, heatOnsetTimestamp) {
    const sp = (species || "bovine").trim().toLowerCase();
    const onsetDate = new Date(heatOnsetTimestamp || Date.now());

    if (isNaN(onsetDate.getTime())) {
      return { error: "Invalid heat onset date/timestamp provided: " + heatOnsetTimestamp };
    }

    // Cattle optimal window: 10 to 14 hours post onset
    // Buffalo optimal window: 12 to 18 hours post onset
    const minHours = (sp === "bubaline") ? 12 : 10;
    const maxHours = (sp === "bubaline") ? 18 : 14;

    const windowStart = new Date(onsetDate.getTime() + (minHours * 60 * 60 * 1000));
    const windowEnd = new Date(onsetDate.getTime() + (maxHours * 60 * 60 * 1000));

    // AM-PM Rule Description
    const onsetHour = onsetDate.getHours();
    const isMorningHeat = (onsetHour >= 0 && onsetHour < 12);
    const ruleAdvice = isMorningHeat
      ? "AM-PM RULE: Standing heat detected in the MORNING (AM) -> Perform A.I. in the EVENING (PM) of the SAME DAY (between 05:00 PM and 08:00 PM)."
      : "AM-PM RULE: Standing heat detected in the EVENING/NIGHT (PM) -> Perform A.I. the NEXT MORNING (AM) (between 06:00 AM and 09:00 AM).";

    return {
      species: sp,
      heatOnsetReported: onsetDate.toISOString(),
      optimalAiWindowHours: minHours + " to " + maxHours + " hours post-heat onset",
      aiWindowExactTime: {
        earliestRecommendedAi: windowStart.toISOString(),
        latestRecommendedAi: windowEnd.toISOString()
      },
      ruleSummary: ruleAdvice,
      cryoThawingProtocol: {
        waterBathTemp: "37°C (Strictly 35°C to 38°C in a calibrated water bath)",
        thawingDurationSeconds: "EXACTLY 30 SECONDS",
        criticalPrecautions: [
          "WIPE DRY THOROUGHLY: Water is 100% spermicidal; dry straw completely with clean tissue paper before loading into the A.I. gun.",
          "Cut straw straight across at a 90° right angle, 1 cm below the laboratory plug seal.",
          "Keep pre-warmed A.I. gun inside clothing during winter to prevent cold shock to thawed spermatozoa.",
          "SITE OF DEPOSITION: Pass gun through the cervix and deposit semen gently into the BODY OF THE UTERUS (Corpus Uteri) 1-2 cm past the internal os. NEVER deposit in horns or cervix."
        ]
      }
    };
  };

  /**
   * RECTAL PREGNANCY DIAGNOSIS MILESTONES LOOKUP:
   * Returns anatomical diagnostic landmarks for a given gestation day.
   */
  TheriogenologyEngine.getPregnancyMilestones = function (daysGestation) {
    const days = parseInt(daysGestation, 10);
    if (isNaN(days) || days < 0) {
      return { error: "Gestation days must be a positive integer." };
    }

    if (days < 30) {
      return {
        gestationDays: days,
        isReliablyPalpablePerRectum: false,
        advice: "Too early for manual rectal palpation (Day <30). Use Transrectal B-Mode Ultrasonography (detects embryonic vesicle & fetal heartbeat from Day 26-28), or wait until Day 35."
      };
    }

    const matched = PREGNANCY_MILESTONES.find(m => days >= m.dayMin && days <= m.dayMax);
    if (matched) {
      return Object.assign({ gestationDays: days, isReliablyPalpablePerRectum: true }, matched);
    }

    // If beyond 285 days
    if (days > 285) {
      return {
        gestationDays: days,
        isReliablyPalpablePerRectum: true,
        milestoneEn: "Full Term / Overdue Gestation",
        milestoneHi: "पूर्ण विकसित बछड़ा / प्रसव समय समाप्त",
        cardinalSign: "Fully formed mature calf occupying pelvic canal. Imminent parturition signs.",
        uterineSizeComparison: "Full-term calf."
      };
    }

    // Default to closest milestone
    return Object.assign({ gestationDays: days, isReliablyPalpablePerRectum: true }, PREGNANCY_MILESTONES[PREGNANCY_MILESTONES.length - 1]);
  };

  /**
   * INFERTILITY CLINICAL EVALUATION ENGINE:
   * Diagnoses reproductive pathology based on clinical rectal findings and cycle history.
   *
   * @param {Object} findingsObj
   *   { species, hasNormalCycle, estrusFrequencyDays, ovarianStructures, uterineDischarge, timesInseminated }
   */
  TheriogenologyEngine.evaluateInfertilityCase = function (findingsObj) {
    if (!findingsObj || typeof findingsObj !== "object") {
      return { error: "Invalid clinical findings object provided." };
    }

    const sp = (findingsObj.species || "bovine").trim().toLowerCase();
    const timesBred = parseInt(findingsObj.timesInseminated, 10) || 0;
    const structures = (findingsObj.ovarianStructures || "").toLowerCase();
    const discharge = (findingsObj.uterineDischarge || "clear").toLowerCase();
    const estrusFreq = parseInt(findingsObj.estrusFrequencyDays, 10) || 21;

    let diagnosis = null;

    // 1. Repeat Breeding Syndrome Check
    if (timesBred >= 3 && estrusFreq >= 18 && estrusFreq <= 24 && discharge.indexOf("pus") === -1) {
      diagnosis = INFERTILITY_CONDITIONS.find(c => c.id === "infert-repeat-breeder");
    }
    // 2. True Anestrus Check
    else if (structures.indexOf("smooth") !== -1 || structures.indexOf("flat") !== -1 || structures.indexOf("inactive") !== -1 || structures.indexOf("small") !== -1) {
      diagnosis = INFERTILITY_CONDITIONS.find(c => c.id === "infert-true-anestrus");
    }
    // 3. Silent Heat Check
    else if ((structures.indexOf("cl") !== -1 || structures.indexOf("luteum") !== -1) && findingsObj.hasNormalCycle === false) {
      diagnosis = INFERTILITY_CONDITIONS.find(c => c.id === "infert-silent-heat");
    }
    // 4. Cystic Ovarian Disease Check
    else if (structures.indexOf("cyst") !== -1 || structures.indexOf("blister") !== -1 || structures.indexOf(">2.5") !== -1) {
      diagnosis = INFERTILITY_CONDITIONS.find(c => c.id === "infert-cystic-ovaries");
    }
    // 5. Uterine Infections (Endometritis/Pyometra)
    else if (discharge.indexOf("pus") !== -1 || discharge.indexOf("cloudy") !== -1 || discharge.indexOf("flakes") !== -1 || discharge.indexOf("foul") !== -1) {
      diagnosis = INFERTILITY_CONDITIONS.find(c => c.id === "infert-uterine-infections");
    } else {
      diagnosis = {
        id: "infert-unclassified",
        conditionEn: "Non-Specific Subfertility / Managemental Infertility",
        conditionHi: "प्रबंधन संबंधी बांझपन",
        therapeuticProtocol: [
          {
            step: "General Protocol",
            intervention: "Nutritional supplementation with Chelated Mineral Mixture (100g/day) + Deworming with Fenbendazole (7.5 mg/kg) + A.I. technique audit."
          }
        ]
      };
    }

    return {
      species: sp,
      timesBredReported: timesBred,
      presumptiveDiagnosis: diagnosis.conditionEn,
      presumptiveDiagnosisHi: diagnosis.conditionHi,
      dossier: diagnosis
    };
  };

  /**
   * Retrieves estrous dynamics for target species.
   */
  TheriogenologyEngine.getEstrousDetails = function (species) {
    const sp = (species || "bovine").trim().toLowerCase();
    return ESTROUS_DYNAMICS[sp] || ESTROUS_DYNAMICS.bovine;
  };

  /**
   * Retrieves synchronization protocols applicable to target species.
   */
  TheriogenologyEngine.getSynchronizationProtocols = function (species) {
    const sp = (species || "bovine").trim().toLowerCase();
    return SYNCHRONIZATION_PROTOCOLS.filter(p => p.targetSpecies.indexOf(sp) !== -1);
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.Reproduction = TheriogenologyEngine;

})();
