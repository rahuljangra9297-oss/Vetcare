// Vetcare AI OS - Veterinary Diagnostic Imaging, Radiology Protocols & Ultrasonography Interpretation Engine (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. RADIOGRAPHY EXPOSURE & SANTE'S RULE CALCULATOR
  const RADIOGRAPHY_PHYSICS = {
    standardFfdInches: 40.0, // Standard Focal Film Distance (100 cm / 40 inches)
    gridFactors: {
      "tabletop": 0.0, // No grid (<10 cm tissue thickness)
      "5:1": 6.0,
      "8:1": 8.0, // Standard veterinary bucky grid
      "12:1": 12.0
    },

    anatomicalDensityProfiles: {
      thorax: {
        regionNameEn: "Thorax / Lungs / Heart",
        regionNameHi: "छाती / फेफड़े / हृदय",
        kvpAdjustment: 0.0,
        baseMas: 3.5, // High kVp, low mAs to freeze rapid cardiopulmonary motion
        exposureTimeRangeSeconds: "1/60 to 1/120 sec",
        positioningTips: "Take exposure at the PEAK OF MAXIMUM INSPIRATION. Use high kVp and ultra-short exposure time (<0.02 sec) to prevent cardiac motion blurring."
      },
      abdomen: {
        regionNameEn: "Abdomen / Visceral Organs",
        regionNameHi: "पेट / आंतरिक अंग",
        kvpAdjustment: 0.0,
        baseMas: 8.0, // Moderate kVp, moderate mAs for high inherent soft-tissue contrast
        exposureTimeRangeSeconds: "1/30 to 1/60 sec",
        positioningTips: "Take exposure at the PAUSE OF EXPIRATION to avoid abdominal compression and allow the diaphragm to relax cranially."
      },
      skeletalExtremity: {
        regionNameEn: "Extremities / Distal Limbs / Bones",
        regionNameHi: "हड्डियां / पैर / जोड़",
        kvpAdjustment: -6.0, // Lower kVp increases photoelectric absorption, enhancing bone trabecular detail
        baseMas: 6.0,
        exposureTimeRangeSeconds: "1/20 to 1/40 sec",
        positioningTips: "Center primary beam directly over the joint or fracture site; collimate tightly to reduce scatter radiation."
      },
      spinePelvis: {
        regionNameEn: "Vertebral Spine / Pelvis / Heavy Musculature",
        regionNameHi: "रीढ़ की हड्डी / कूल्हा",
        kvpAdjustment: +4.0,
        baseMas: 15.0, // High penetration and high mAs required to penetrate dense dorsal muscles
        exposureTimeRangeSeconds: "1/15 to 1/30 sec",
        positioningTips: "Ensure straight positioning with foam pads beneath sternum and lumbar spine to eliminate axial rotation."
      }
    }
  };

  /**
   * SANTE'S RULE EXPOSURE CALCULATOR:
   * Computes kVp, mAs, and technical exposure parameters for veterinary radiography.
   * Formula: kVp = (2 × Tissue Thickness in cm) + Grid Factor + FFD Constant (40)
   *
   * @param {number} thicknessCm - Caliper measurement of patient thickness in centimeters
   * @param {string} anatomicalRegion - 'thorax', 'abdomen', 'skeletalExtremity', 'spinePelvis'
   * @param {boolean} hasGrid - True if using a Potter-Bucky grid (mandatory if thickness >10 cm)
   * @param {string} gridRatio - 'tabletop', '5:1', '8:1', '12:1'
   */
  function calculateXrayExposure(thicknessCm, anatomicalRegion, hasGrid, gridRatio) {
    const thick = parseFloat(thicknessCm);
    if (isNaN(thick) || thick <= 0) {
      return { error: "Invalid thickness measurement provided. Must be > 0 cm." };
    }

    const regionKey = (anatomicalRegion || "abdomen").trim();
    const profile = RADIOGRAPHY_PHYSICS.anatomicalDensityProfiles[regionKey] ||
                    RADIOGRAPHY_PHYSICS.anatomicalDensityProfiles.abdomen;

    // Grid Factor Determination
    let effectiveGridRatio = "tabletop";
    if (hasGrid !== false && thick > 10.0) {
      effectiveGridRatio = (gridRatio && RADIOGRAPHY_PHYSICS.gridFactors[gridRatio]) ? gridRatio : "8:1";
    }

    const gridFactorValue = RADIOGRAPHY_PHYSICS.gridFactors[effectiveGridRatio] || 0.0;
    const ffdConstant = RADIOGRAPHY_PHYSICS.standardFfdInches; // 40

    // Sante's Formula: (2 * Thickness) + Grid Factor + 40
    let calculatedKvp = (2.0 * thick) + gridFactorValue + ffdConstant + profile.kvpAdjustment;

    // Safety limits for standard veterinary X-ray generators (40 kVp to 125 kVp)
    calculatedKvp = Math.max(40.0, Math.min(125.0, calculatedKvp));

    const recommendedMas = profile.baseMas;
    // Typical veterinary X-ray machine operating at 100 mA or 200 mA station
    const maStation = thick > 15 ? 200 : 100;
    const exposureTimeSec = Number((recommendedMas / maStation).toFixed(3));

    return {
      thicknessCm: thick,
      anatomicalRegion: profile.regionNameEn,
      anatomicalRegionHi: profile.regionNameHi,
      calculatedKvp: Math.round(calculatedKvp),
      recommendedMas: recommendedMas,
      exposureTimeSeconds: exposureTimeSec,
      maStationUsed: maStation,
      gridConfiguration: effectiveGridRatio === "tabletop" ? "Tabletop (No Grid Required)" : "Bucky Grid (" + effectiveGridRatio + ")",
      focalFilmDistanceInches: ffdConstant,
      clinicalTechniqueNotes: profile.positioningTips,
      radiationSafetyDirective: "Collimate primary beam strictly to the anatomical region of interest. Always wear 0.5mm lead equivalence aprons and thyroid shields."
    };
  }

  // 3. VERTEBRAL HEART SCORE (VHS) & CARDIOMYOPATHY ANALYZER
  const VHS_REFERENCE_DATA = {
    canine: {
      standardRange: { min: 8.5, max: 10.5, mean: 9.7 },
      breedSpecificThresholds: {
        "boxer": { min: 10.3, max: 11.6, mean: 11.0, note: "Physiological barrel-chested thoracic conformation" },
        "bulldog": { min: 10.5, max: 11.8, mean: 11.2, note: "Short vertebral bodies and wide heart base" },
        "pug": { min: 10.0, max: 11.5, mean: 10.8, note: "Brachycephalic thoracic index" },
        "cavalier-king-charles": { min: 9.8, max: 10.8, mean: 10.2, note: "High breed prevalence of Myxomatous Mitral Valve Disease (MMVD)" },
        "dachshund": { min: 9.0, max: 10.5, mean: 9.8, note: "Chondrodystrophic spine" },
        "greyhound": { min: 9.5, max: 10.8, mean: 10.2, note: "Deep athletic thorax" }
      }
    },
    feline: {
      standardRange: { min: 6.8, max: 8.0, mean: 7.5 },
      thresholdNote: "Feline VHS > 8.0 vertebrae is strongly indicative of cardiomegaly (Hypertrophic Cardiomyopathy - HCM / Restrictive Cardiomyopathy)."
    }
  };

  /**
   * VERTEBRAL HEART SCALE (VHS) CALCULATOR:
   * Measures cardiac size on a right lateral thoracic radiograph.
   * Long Axis (L): Distance from ventral border of carina/bifurcation to cardiac apex.
   * Short Axis (S): Widest horizontal dimension perpendicular to long axis.
   * Both axes are transposed onto thoracic vertebrae starting at the cranial edge of T4.
   *
   * @param {number} longAxisVertebraeCount - Long axis length in vertebrae units (e.g. 5.5)
   * @param {number} shortAxisVertebraeCount - Short axis length in vertebrae units (e.g. 4.8)
   * @param {string} species - 'canine' or 'feline'
   * @param {string} breedKey - Optional breed key (e.g., 'boxer', 'bulldog', 'cavalier-king-charles')
   */
  function calculateVhs(longAxisVertebraeCount, shortAxisVertebraeCount, species, breedKey) {
    const l = parseFloat(longAxisVertebraeCount);
    const s = parseFloat(shortAxisVertebraeCount);

    if (isNaN(l) || isNaN(s) || l <= 0 || s <= 0) {
      return { error: "Invalid axis measurements provided. Both Long Axis and Short Axis must be positive numbers." };
    }

    const sp = (species || "canine").trim().toLowerCase();
    const totalVhs = Number((l + s).toFixed(1));

    let maxNormal = 10.5;
    let minNormal = 8.5;
    let breedNote = "Standard canine reference interval applied.";

    if (sp === "feline") {
      maxNormal = VHS_REFERENCE_DATA.feline.standardRange.max; // 8.0
      minNormal = VHS_REFERENCE_DATA.feline.standardRange.min; // 6.8
      breedNote = VHS_REFERENCE_DATA.feline.thresholdNote;
    } else if (breedKey && VHS_REFERENCE_DATA.canine.breedSpecificThresholds[breedKey.toLowerCase()]) {
      const bInfo = VHS_REFERENCE_DATA.canine.breedSpecificThresholds[breedKey.toLowerCase()];
      maxNormal = bInfo.max;
      minNormal = bInfo.min;
      breedNote = "Breed-specific threshold applied for " + breedKey + " (" + bInfo.note + ").";
    }

    let severity = "NORMAL CARDIAC SILHOUETTE";
    let pathology = "Cardiac dimensions are within normal physiological bounds.";

    if (totalVhs > maxNormal) {
      const excess = totalVhs - maxNormal;
      if (excess <= 0.8) {
        severity = "MILD CARDIOMEGALY";
        pathology = "Early cardiac enlargement (Stage B1 Myxomatous Mitral Valve Disease or early Dilated/Hypertrophic Cardiomyopathy).";
      } else if (excess > 0.8 && excess <= 1.8) {
        severity = "MODERATE CARDIOMEGALY";
        pathology = "Significant generalized or chamber-specific enlargement (Stage B2 MMVD / DCM). Echocardiography indicated to assess left atrium-to-aorta ratio (LA:Ao).";
      } else {
        severity = "SEVERE CARDIOMEGALY";
        pathology = "Gross cardiac enlargement with imminent risk of congestive heart failure (CHF) or pulmonary edema. High tracheal elevation noted.";
      }
    } else if (totalVhs < minNormal) {
      severity = "MICRO-CARDIA";
      pathology = "Abnormally small cardiac silhouette: Hallmark of severe hypovolemic shock, Addison's disease (Hypoadrenocorticism), or extreme dehydration.";
    }

    return {
      species: sp,
      totalVhs: totalVhs,
      longAxisUnits: l,
      shortAxisUnits: s,
      referenceNormalRange: minNormal + " to " + maxNormal + " vertebrae",
      cardiomegalySeverity: severity,
      diagnosticInterpretation: pathology,
      breedAdjustmentNotes: breedNote,
      radiographicGuidance: "Measure starting precisely from the cranial edge of the 4th thoracic vertebra (T4) extending caudally along the vertebral column."
    };
  }

  // 4. ULTRASONOGRAPHY TRANSDUCER & ACOUSTIC TISSUE DATABASE
  const ULTRASOUND_PHYSICS_DATABASE = {
    transducers: [
      {
        probeType: "Microconvex / Convex Curved Array",
        frequencyRangeMhz: "3.5 to 5.0 MHz (Low Frequency)",
        beamProfile: "Sector wedge with wide far-field view",
        depthPenetrationCm: "15 to 25 cm deep",
        idealApplications: [
          "Bovine/Bubaline transabdominal reticular and liver sonography",
          "Medium to giant breed canine abdominal scanning",
          "Transabdominal late pregnancy fetal assessment in ruminants"
        ],
        tradeOff: "Deep penetration at the expense of axial and lateral spatial resolution."
      },
      {
        probeType: "High-Frequency Linear Array",
        frequencyRangeMhz: "7.5 to 12.0 MHz (High Frequency)",
        beamProfile: "Rectangular format with uniform near-field resolution",
        depthPenetrationCm: "2 to 6 cm superficial",
        idealApplications: [
          "Equine distal limb tendon & ligament ultrasonography (SDFT, DDFT, Suspensory)",
          "Bovine transrectal early pregnancy diagnosis (Day 28 to 60)",
          "Ocular ultrasonography, thyroid, and small animal layered bowel wall evaluation"
        ],
        tradeOff: "Exquisite spatial resolution with minimal depth penetration."
      },
      {
        probeType: "Phased Array / Sector Scanner",
        frequencyRangeMhz: "2.5 to 7.5 MHz (Multiple crystals electronically steered)",
        beamProfile: "Triangular wedge originating from a small acoustic footprint",
        depthPenetrationCm: "10 to 20 cm",
        idealApplications: [
          "Transthoracic Echocardiography: Small footprint fits between narrow intercostal ribs",
          "Continuous-wave and color Doppler cardiac valve interrogation"
        ],
        tradeOff: "Complex piezoelectric technology; specialized for cardiac hemodynamic analysis."
      }
    ],

    tissueEchotextureHierarchy: {
      relativeEchogenicityRule: "Echogenicity Hierarchy of Normal Abdominal Organs (from darkest to brightest): Renal Medulla < Renal Cortex < Liver Parenchyma < Spleen Parenchyma < Renal Sinus / Prostate",
      categories: [
        {
          termEn: "Anechoic (Echo-Free / Pure Black)",
          termHi: "एनेकोइक (पूर्णतः काला)",
          acousticBehavior: "Fluid transmits 100% of sound waves without acoustic impedance reflection.",
          normalExamples: "Urinary bladder lumen filled with urine, gall bladder lumen filled with bile, ovarian follicles, transudate ascites fluid, amniotic fluid."
        },
        {
          termEn: "Hypoechoic (Dark Gray / Low Reflections)",
          termHi: "हाइपोइकोइक (गहरा स्लेटी)",
          acousticBehavior: "Few internal acoustic interfaces reflect weak sound waves.",
          normalExamples: "Normal renal cortex, normal lymph nodes, myocardium, fluid-cellular exudates."
        },
        {
          termEn: "Isoechoic / Normoechoic (Medium Gray)",
          termHi: "आइसोइकोइक (मध्यम स्लेटी)",
          acousticBehavior: "Uniform homogeneous tissue parenchymal acoustic impedance.",
          normalExamples: "Normal hepatic parenchyma, normal splenic parenchyma."
        },
        {
          termEn: "Hyperechoic (Bright White / High Reflections)",
          termHi: "हाइपरइकोइक (चमकीला सफेद)",
          acousticBehavior: "Dense fibrous structures reflect strong sound wave echoes back to probe.",
          normalExamples: "Renal sinus fat, organ fibrous capsules, bone surfaces, diaphragmatic line, tendon fibers."
        }
      ],
      acousticArtifacts: [
        {
          artifactName: "Distal Acoustic Enhancement (Through-Transmission)",
          description: "Tissues deep to an anechoic fluid structure (like urine in bladder or gallbladder) appear abnormally bright white because sound passes through fluid without attenuation.",
          clinicalValue: "Confirms that an anechoic structure is a true fluid-filled cyst or lumen rather than an artifact."
        },
        {
          artifactName: "Clean Posterior Acoustic Shadowing",
          description: "Sharp, black, echo-free shadow cast deep to dense mineralized structures that reflect or absorb 100% of sound waves.",
          clinicalValue: "Pathognomonic hallmark of uroliths (cystic/renal calculi), gallstones, or intact cortical bone."
        },
        {
          artifactName: "Dirty Acoustic Shadowing (Reverberation)",
          description: "Hazy, greyish-white acoustic shadow with repeating horizontal reverberation lines cast deep to gas-tissue interfaces.",
          clinicalValue: "Hallmark of gastrointestinal intraluminal flatus or subcutaneous emphysema."
        }
      ]
    }
  };

  // 5. CORE SPECIES-SPECIFIC IMAGING PROCEDURES (6 COMPREHENSIVE PROTOCOLS)
  const IMAGING_PROCEDURES = [
    // ========================================================================
    // 1. BOVINE RETICULAR ULTRASONOGRAPHY (HARDWARE DISEASE / TRP)
    // ========================================================================
    {
      procedureId: "img-bovine-reticulum-trp",
      nameEn: "Bovine Reticular Ultrasonography (Traumatic Reticuloperitonitis / TRP)",
      nameHi: "गोवंश रेटिकुलम सोनोग्राफी (हार्डवेयर रोग / सुई-तार घाव)",
      species: ["bovine", "bubaline"],
      equipmentRequired: "3.5 to 5.0 MHz convex or microconvex probe. Acoustic gel, clippers.",
      anatomicalLandmarks: "Ventral midline and left paramedian area of the thorax at the 6th and 7th intercostal spaces (ICS), immediately behind the xiphoid cartilage.",
      normalSonographicAppearance: [
        "Normal reticulum displays a smooth, half-moon crescentic contour contracting rhythmically against the ventral diaphragm and abdominal wall.",
        "Normal biphasic contraction frequency: 3 to 4 complete contraction cycles per 2 minutes.",
        "Anechoic clean fluid space between reticulum and diaphragm with zero adhesions."
      ],
      pathologicalSignsInTRP: [
        "LOSS OF RETICULAR MOTILITY: Complete reticular atony (absence of biphasic contractions) due to intense localized peritonitis.",
        "Fibrinous inflammatory exudate: Heterogeneous, echogenic, spider-web-like fibrinous strands floating in localized anechoic fluid pockets.",
        "Reticular abscess: Thick, hyperechoic encapsulating capsule enclosing a purulent hypoechoic to heterogeneous fluid core.",
        "Direct foreign body visualization: Hyperechoic linear metallic interface casting a clean posterior acoustic shadow."
      ],
      clinicalDecision: "Visualizing hyperechoic fibrinous adhesions or perireticular abscesses with loss of reticular motility is the definitive gold-standard field diagnosis for Traumatic Reticuloperitonitis (TRP), indicating immediate surgical Rumenotomy."
    },

    // ========================================================================
    // 2. SMALL ANIMAL GI FOREIGN BODY & MECHANICAL ILEUS
    // ========================================================================
    {
      procedureId: "img-canine-gi-obstruction",
      nameEn: "Small Animal Gastrointestinal Foreign Body & Mechanical Ileus (X-ray & USG)",
      nameHi: "कुत्तों में आंतों में बाहरी वस्तु फंसना (एक्स-रे व अल्ट्रासाउंड)",
      species: ["canine", "feline"],
      equipmentRequired: "High-frequency linear probe (7.5-10 MHz) and abdominal X-ray table with grid.",
      anatomicalLandmarks: "Systematic scanning of cranial to caudal abdomen along the duodenal, jejunal, and ileal loops.",
      radiographicHallmarks: [
        "Two distinct populations of bowel loops: Fluid/gas distended loops proximal to the obstruction contrasted against collapsed, empty loops distal to the obstruction.",
        "CANINE QUANTITATIVE ILEUS RATIO: Maximum bowel loop diameter exceeding 1.6 times the height of the cranial vertebral body of L5 indicates surgical mechanical obstruction.",
        "Radiographic 'Gravel Sign': Accumulation of mineralized, granular material proximal to an incomplete chronic obstruction."
      ],
      ultrasonographicHallmarks: [
        "Hyperechoic semi-circular interface in the intestinal lumen casting a strong posterior acoustic shadow (rubber balls, stones, corn cobs).",
        "LINEAR FOREIGN BODY (String/thread): Plicated, accordion-pleated, bunched bowel loops with an eccentric hyperechoic linear interface.",
        "Loss of normal 5-layered intestinal architecture with hyperemic, thickened muscularis and local peritoneal hyperechoic fat reactivity (steatitis)."
      ],
      clinicalDecision: "Intestinal diameter >1.6x L5 body height on radiography with luminal hyperechoic shadowing on USG mandates immediate exploratory enterotomy."
    },

    // ========================================================================
    // 3. BOVINE EARLY PREGNANCY VIA TRANSRECTAL ULTRASONOGRAPHY
    // ========================================================================
    {
      procedureId: "img-bovine-pregnancy-usg",
      nameEn: "Bovine Early Pregnancy Diagnosis via Transrectal Ultrasonography",
      nameHi: "गाय-भैंस में प्रारंभिक गर्भ जांच (ट्रांसरेक्टल सोनोग्राफी - 28 से 35 दिन)",
      species: ["bovine", "bubaline"],
      equipmentRequired: "5.0 to 7.5 MHz linear transrectal rectal probe. Protective shoulder-length glove, lubricant.",
      anatomicalLandmarks: "Probe inserted per rectum, swept systematically along the ventral floor of both uterine horns from the bifurcation to the ovarian poles.",
      chronologicalGestationalMilestones: [
        "Day 26 to 28: Early embryonic vesicle visible as a 10-15 mm localized anechoic fluid pocket in the pregnant uterine horn.",
        "Day 30 to 35: Embryo proper visualized as a distinct hyperechoic elongated structure (approx 10-12 mm) inside the anechoic allantoic fluid.",
        "PATHOGNOMONIC VIABILITY HALLMARK: Rapid, rhythmic flickering motion within the embryo representing active fetal cardiac pulsation (heart rate >160 bpm confirms embryonic life).",
        "Day 45 to 50: Development of early placentomes (caruncles) visible as small hypoechoic circular donut-like indentations along the uterine wall.",
        "Day 55 to 60: Fetal sexing possible based on the migration of the genital tubercle (cranial near umbilicus in males; caudal near tail in females)."
      ],
      clinicalDecision: "Detecting an anechoic fluid pocket with a viable flickering embryonic heartbeat confirms 100% positive pregnancy as early as Day 28 post-AI."
    },

    // ========================================================================
    // 4. CANINE PYOMETRA VS HYDROMETRA VS MUCOMETRA
    // ========================================================================
    {
      procedureId: "img-canine-pyometra-usg",
      nameEn: "Canine Uterine Sonography: Pyometra vs Mucometra vs Early Pregnancy",
      nameHi: "कुतिया में गर्भाशय मवाद (पायोमेट्रा) की सोनोग्राफी जांच",
      species: ["canine", "feline"],
      equipmentRequired: "5.0 to 7.5 MHz microconvex probe.",
      anatomicalLandmarks: "Transabdominal scanning between the urinary bladder and colon in the caudal ventral abdomen.",
      ultrasonographicHallmarks: [
        "PYOMETRA: Severely enlarged, tortuous, coiled tubular uterine horns filled with anechoic to turbid, flocculent, hypoechoic purulent fluid with internal swirling echoes.",
        "Endometrial wall is thickened and irregular containing multiple tiny anechoic cystic vesicles (Cystic Endometrial Hyperplasia - CEH).",
        "Absence of embryonic structures, fetal membranes, or cardiac flickers (rules out pregnancy).",
        "MUCOMETRA / HYDROMETRA: Uterine lumen distended with pure anechoic fluid without inflammatory swirling, accompanied by a thin, non-reactive uterine wall."
      ],
      clinicalDecision: "Detecting large, fluid-distended, thickened, cystic uterine horns in a febrile intact bitch confirms life-threatening Pyometra, mandating immediate emergency Ovariohysterectomy (OHE)."
    },

    // ========================================================================
    // 5. EQUINE SUPERFICIAL DIGITAL FLEXOR TENDON (SDFT) STRAIN
    // ========================================================================
    {
      procedureId: "img-equine-tendon-strain",
      nameEn: "Equine Superficial Digital Flexor Tendon (SDFT) Tendonitis / Bowed Tendon",
      nameHi: "घोड़ों में पैर की नसों में खिंचाव (टेंडोनाइटिस सोनोग्राफी)",
      species: ["equine"],
      equipmentRequired: "7.5 to 12.0 MHz high-frequency linear array probe with acoustic standoff pad.",
      anatomicalLandmarks: "Palmar metacarpal region divided into 7 standardized acoustic levels (Zones 1A, 1B, 2A, 2B, 3A, 3B, 3C from carpus down to fetlock).",
      normalSonographicAppearance: [
        "Transverse view: SDFT is crescentic to oval with a homogeneous fine stippled pattern of hyperechoic collagen fiber interfaces.",
        "Longitudinal view: Long, parallel, tightly packed, highly organized hyperechoic collagen striations."
      ],
      pathologicalSignsOfStrain: [
        "Tendon enlargement: Substantial increase in Cross-Sectional Area (CSA >1.2 to 2.0 cm² in Zone 2).",
        "PATHOGNOMONIC CORE LESION: Focal or central anechoic to hypoechoic disruption of collagen fibers representing acute hemorrhage, collagen lysis, and edema within the tendon core.",
        "Loss of normal parallel fiber alignment on longitudinal scans (<50% intact fibers in severe bows)."
      ],
      clinicalDecision: "Quantifying the percentage of disrupted cross-sectional area directly dictates rehabilitation duration (minimum 6 to 9 months stall rest with serial acoustic re-checks)."
    },

    // ========================================================================
    // 6. BOVINE LEFT DISPLACED ABOMASUM (LDA / RDA)
    // ========================================================================
    {
      procedureId: "img-bovine-abomasal-displacement",
      nameEn: "Bovine Displaced Abomasum (LDA / RDA) Acoustic Corroboration",
      nameHi: "गाय में पेट का खिसकना (एल.डी.ए. / आर.डी.ए. सोनोग्राफी)",
      species: ["bovine", "bubaline"],
      equipmentRequired: "3.5 to 5.0 MHz convex probe.",
      anatomicalLandmarks: "Left paralumbar fossa and 9th to 12th intercostal spaces along an oblique line from the hip to the elbow.",
      sonographicHallmarks: [
        "LEFT DISPLACED ABOMASUM (LDA): Visualization of the abomasum positioned abnormally between the left body wall and the dorsal/ventral rumen sac.",
        "Acoustic interface reveals an upper zone of reverberating gas artifacts and a lower dependent zone of homogenous, moderately echogenic fluid contents with fine floating particles.",
        "Abomasal mucosal folds (Plica spiralis) visualized as undulating, hyperechoic crescentic mucosal leaves protruding into the fluid lumen.",
        "Auscultation-percussion 'ping' sound corresponds precisely to the acoustic gas-fluid level on sonography."
      ],
      clinicalDecision: "Sonographic confirmation of abomasal mucosal folds on the left flank definitively differentiates LDA from rumen tympany or pneumoperitoneum, indicating immediate surgical omentopexy."
    }
  ];

  // 6. ULTRASONOGRAPHIC FETAL GESTATIONAL AGE ESTIMATOR
  /**
   * ESTIMATES GESTATIONAL AGE FROM ULTRASONIC FETAL BIOMETRICS:
   * Uses Crown-Rump Length (CRL), Biparietal Diameter (BPD), or Trunk Diameter.
   *
   * @param {string} species - 'bovine', 'canine', 'caprine'
   * @param {string} measurementType - 'crl' (Crown-Rump Length), 'bpd' (Biparietal Diameter), 'trunk'
   * @param {number} measurementMm - Measured dimension in millimeters
   */
  function estimateGestationalAgeUltrasound(species, measurementType, measurementMm) {
    const sp = (species || "bovine").trim().toLowerCase();
    const type = (measurementType || "crl").trim().toLowerCase();
    const mm = parseFloat(measurementMm);

    if (isNaN(mm) || mm <= 0) {
      return { error: "Invalid millimeter biometric measurement provided: " + measurementMm };
    }

    let estimatedDays = 0;
    let confidenceDays = "± 3 to 5 days";
    let formulaDescription = "";

    if (sp === "bovine" || sp === "bubaline") {
      if (type === "crl") {
        // Bovine CRL valid between 30 and 70 days gestation
        // Formula: Gestational Age (Days) = (CRL in mm * 0.6) + 21
        estimatedDays = (mm * 0.6) + 21.0;
        formulaDescription = "Bovine Crown-Rump Length Regression [Days = (CRL_mm × 0.6) + 21]";
      } else if (type === "bpd") {
        // Bovine BPD valid between 60 and 150 days gestation
        // Formula: Gestational Age (Days) = (BPD in mm * 2.0) + 28
        estimatedDays = (mm * 2.0) + 28.0;
        formulaDescription = "Bovine Biparietal Cranial Diameter Regression [Days = (BPD_mm × 2.0) + 28]";
      } else {
        estimatedDays = (mm * 1.5) + 30.0;
        formulaDescription = "General Bovine Fetal Diameter Approximation";
      }
    } else if (sp === "canine") {
      if (type === "bpd") {
        // Canine BPD valid in late gestation (>40 days)
        // Days before whelping = 65 - ((BPD_mm * 1.4) + 15)
        // Gestational age (Days) = (BPD_mm * 1.4) + 15
        estimatedDays = (mm * 1.4) + 15.0;
        formulaDescription = "Canine BPD Fetal Age Equation [Days = (BPD_mm × 1.4) + 15]";
      } else {
        // Inner Chorionic Cavity (ICC) or CRL in early gestation
        estimatedDays = (mm * 0.15) + 20.0;
        formulaDescription = "Canine Early Embryonic CRL Regression";
      }
    } else if (sp === "caprine" || sp === "ovine") {
      // Small ruminant BPD (valid between 40 and 100 days)
      // Days = (BPD_mm * 1.8) + 24
      estimatedDays = (mm * 1.8) + 24.0;
      formulaDescription = "Caprine/Ovine BPD Fetal Age Equation [Days = (BPD_mm × 1.8) + 24]";
    } else {
      estimatedDays = mm * 1.2;
      formulaDescription = "Standard Veterinary Fetal Metric Regression";
    }

    const roundedDays = Math.round(estimatedDays);

    return {
      species: sp,
      measurementType: type.toUpperCase(),
      measuredDimensionMm: mm,
      estimatedGestationalAgeDays: roundedDays,
      confidenceMargin: confidenceDays,
      regressionFormulaUsed: formulaDescription,
      clinicalGuidance: "Early biometric measurements (<60 days) yield superior statistical accuracy compared to late third-trimester scans."
    };
  }

  // 7. RADIATION PROTECTION & ALARA SAFETY PROTOCOLS
  const RADIATION_SAFETY_STANDARDS = {
    alaraPrinciples: [
      "TIME: Minimize duration of exposure by utilizing high-speed digital radiography (DR) detectors and avoiding repeated retakes.",
      "DISTANCE: Maximize distance from the X-ray tube and patient. The Inverse Square Law dictates that doubling the distance from the scatter source reduces radiation exposure to 1/4th (25%).",
      "SHIELDING: Utilize certified lead barrier shielding with minimum 0.5 mm lead (Pb) equivalence for all aprons, thyroid collars, and gloves."
    ],

    statutoryThresholds: {
      maximumPermissibleDoseOccupational: "20 mSv (2.0 rem) per year averaged over 5 years (ICRP / AERB Statutory Standard).",
      maximumPermissibleDosePublic: "1 mSv (0.1 rem) per year for non-occupational public bystanders.",
      leadEquivalenceRequirements: {
        protectiveApron: "Minimum 0.5 mm lead (Pb) equivalence covering thyroid, torso, and gonads down to mid-thigh.",
        thyroidCollar: "Mandatory 0.5 mm Pb equivalence for all personnel in the radiation room.",
        glovesMitts: "0.5 mm Pb equivalence. NEVER place gloved hands directly in the primary unattenuated X-ray beam."
      }
    },

    absoluteSafetyProhibitions: [
      "CRITICAL: ABSOLUTELY NO PREGNANT PERSONNEL ARE PERMITTED IN THE X-RAY EXPOSURE ROOM DURING DISCHARGE (extreme fetal teratogenic and carcinogenic risk).",
      "NO INDIVIDUALS UNDER 18 YEARS OF AGE are legally permitted to restrain animals or remain in the radiation room during exposures.",
      "NEVER hold the X-ray tube housing with bare hands during exposure; always use mechanical stands or remote triggers.",
      "Mandatory physical collimation: The primary beam must strictly be collimated inside the borders of the cassette; never irradiate whole animals indiscriminately."
    ]
  };

  // 8. DIAGNOSTIC IMAGING CONTROLLER IMPLEMENTATION
  const ImagingEngine = {
    physics: RADIOGRAPHY_PHYSICS,
    calculateExposure: calculateXrayExposure,
    calculateVhs: calculateVhs,
    ultrasoundPhysics: ULTRASOUND_PHYSICS_DATABASE,
    procedures: IMAGING_PROCEDURES,
    estimateFetalAge: estimateGestationalAgeUltrasound,
    radiationSafety: RADIATION_SAFETY_STANDARDS
  };

  /**
   * Fetches full procedural sonographic protocol by ID.
   */
  ImagingEngine.getProcedureById = function (procedureId) {
    if (!procedureId || typeof procedureId !== "string") return null;
    const cleanId = procedureId.trim().toLowerCase();
    const list = IMAGING_PROCEDURES || [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].procedureId.toLowerCase() === cleanId) return list[i];
    }
    return null;
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.DiagnosticImaging = ImagingEngine;

})();
