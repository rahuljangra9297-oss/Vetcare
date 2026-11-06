// Vetcare AI OS - Veterinary Emergency Triage, RECOVER CPR Protocols & Shock Resuscitation Engine (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. 4-TIER COLOR-CODED VETERINARY TRIAGE MATRIX
  const TRIAGE_TIERS = {
    RED: {
      categoryLevel: 1,
      colorCode: "#dc2626", // Emerald red
      priorityNameEn: "RED (Category 1: Immediate / Resuscitation)",
      priorityNameHi: "लाल (श्रेणी 1: तत्काल प्राण-रक्षक आपातकाल)",
      targetResponseTimeMinutes: 0,
      targetResponseText: "IMMEDIATE (0 Minutes / Zero Delay)",
      hallmarkTriggers: [
        "Cardiopulmonary arrest (CPA / absence of pulse and apnea)",
        "Severe upper airway asphyxia / complete laryngeal obstruction",
        "Arterial spurting hemorrhage or catastrophic external blood loss",
        "Acute anaphylactic shock with vascular collapse",
        "Asphyxiating acute ruminal tympany / bloat with cyanosis and protrusion of tongue",
        "Uterine rupture with internal exsanguination",
        "Peracute cyanide / organophosphate toxicity collapse",
        "Status epilepticus persisting >5 continuous minutes"
      ],
      immediateActionDirective: "TRANSFER TO CRASH STATION IMMEDIATELY. Initiate RECOVER Basic Life Support (BLS) or airway intubation / trocharization without completing intake paperwork."
    },
    ORANGE: {
      categoryLevel: 2,
      colorCode: "#ea580c", // Dark Orange
      priorityNameEn: "ORANGE (Category 2: Emergent / Critical)",
      priorityNameHi: "नारंगी (श्रेणी 2: अति-गंभीर आपातकाल)",
      targetResponseTimeMinutes: 15,
      targetResponseText: "< 15 Minutes",
      hallmarkTriggers: [
        "Gastric Dilatation-Volvulus (GDV / twisted stomach in canines)",
        "Severe open pneumothorax or penetrating thoracic sucking wound",
        "Periparturient hypocalcemia (Downer Milk Fever) with hypothermia (<98°F)",
        "Severe hyperthermia / Heat stroke (>105.5°F / >40.8°C)",
        "Obstructed tomcat (FLUTD) with bradycardia (<120 bpm) and turgid bladder",
        "Acute venomous snake envenomation with continuous coagulopathic bleeding",
        "Compound / open fractures with bone exposure",
        "Active clustering epileptic seizures (<5 mins)"
      ],
      immediateActionDirective: "Establish IV access immediately. Place on supplemental flow-by oxygen, initiate active thermal stabilization or gastric/thoracic decompression."
    },
    YELLOW: {
      categoryLevel: 3,
      colorCode: "#ca8a04", // Dark Yellow/Gold
      priorityNameEn: "YELLOW (Category 3: Urgent)",
      priorityNameHi: "पीला (श्रेणी 3: जरूरी / त्वरित ध्यान)",
      targetResponseTimeMinutes: 60,
      targetResponseText: "< 60 Minutes",
      hallmarkTriggers: [
        "Active dystocia (straining >2 hours without delivery of calf/pup)",
        "Moderate to severe dehydration (8% to 10%) without decompensated shock",
        "Vaginal or complete uterine prolapse with intact moist mucosa",
        "Acute non-hemorrhagic diarrhea and vomiting with preserved consciousness",
        "Severe closed long-bone fractures with pain",
        "Acute corneal lacerations or deep melting corneal ulcers",
        "High fever (>104°F) in ruminants with stable respiratory parameters"
      ],
      immediateActionDirective: "Secure patient in examination stall. Provide analgesia, initiate IV fluid replacement deficit, and schedule for primary clinical intervention within 1 hour."
    },
    GREEN: {
      categoryLevel: 4,
      colorCode: "#16a34a", // Emerald Green
      priorityNameEn: "GREEN (Category 4: Non-Urgent / Routine)",
      priorityNameHi: "हरा (श्रेणी 4: सामान्य / गैर-आपातकालीन)",
      targetResponseTimeMinutes: 120,
      targetResponseText: "60 to 120 Minutes (Standard Clinic Queue)",
      hallmarkTriggers: [
        "Mild chronic lameness with normal weight-bearing",
        "Localized alopecia, pruritus, or non-spreading fungal ringworm",
        "Chronic weight loss with normal vital signs",
        "Routine prophylactic vaccinations and elective deworming",
        "Suture removal and post-op wound rechecks",
        "Minor superficial skin abrasions without active hemorrhage"
      ],
      immediateActionDirective: "Direct to routine outpatient OPD queue; proceed with standard clinical history and physical examination."
    }
  };

  // 3. RECOVER INITIATIVE EVIDENCE-BASED VETERINARY CPR PROTOCOL
  const RECOVER_CPR_PROTOCOL = {
    blsGuidelines: {
      cycleDurationSeconds: 120, // 2-minute uninterrupted cycle
      compressionRatePerMinute: "100 to 120 compressions per minute (Rate identical across all animal sizes)",
      compressionDepth: "1/3rd to 1/2 the width of the chest; allow 100% complete elastic chest recoil between compressions",
      patientPositioning: {
        roundChestedDogs: "Lateral recumbency; compress at the widest diameter of the thorax (Thoracic Pump Mechanism).",
        keelChestedDogs: "Lateral recumbency; compress directly over the heart at the 4th-5th intercostal space (Cardiac Pump Mechanism).",
        barrelChestedDogs: "Dorsal recumbency; compress directly over the sternum (e.g., English Bulldogs).",
        smallAnimalsCats: "Lateral recumbency; two-handed circumferential compression or one-handed thumb-and-fingers directly over heart.",
        largeAnimalsRuminantsFoals: "Lateral recumbency on a hard floor or firm wooden board; rescuer kneels or stands on step-stool compressing over 4th-5th rib."
      },
      ventilationSettings: {
        intubatedVentilationRate: "10 breaths per minute (1 breath every 6 seconds)",
        inspiratoryTime: "Exactly 1.0 second inspiratory time with 100% Oxygen",
        targetTidalVolume: "10 ml/kg body weight; peak airway pressure must not exceed 20 cm H2O in dogs/cats (30 cm H2O in large animals)",
        mouthToSnout: "In non-intubated field settings: 30 compressions followed by 2 quick mouth-to-snout breaths (30:2 ratio)."
      },
      criticalBlsRule: "DO NOT INTERRUPT CHEST COMPRESSIONS. Rotate compressors every 2 minutes to prevent rescuer fatigue-induced decay in chest compression depth."
    },

    alsDrugFormulary: [
      {
        drugKey: "epinephrine-low-dose",
        nameEn: "Epinephrine / Adrenaline (Low-Dose / 1:1000)",
        concentration: "1.0 mg/ml (1:1000 Solution)",
        concentrationMgPerMl: 1.0,
        doseMgPerKg: 0.01,
        calculatedVolumeMlPerKg: 0.01, // 0.1 ml per 10 kg
        route: "IV / IO (or Intratracheal × 2 dose diluted in 5ml saline)",
        cycleTiming: "Administer every alternate 2-minute CPR cycle (every 4 minutes).",
        notes: "Alpha-1 mediated peripheral vasoconstriction redirects aortic blood flow to vital coronary and cerebral capillary beds."
      },
      {
        drugKey: "epinephrine-high-dose",
        nameEn: "Epinephrine (High-Dose / Prolonged Arrest >10 Mins)",
        concentration: "1.0 mg/ml (1:1000 Solution)",
        concentrationMgPerMl: 1.0,
        doseMgPerKg: 0.1,
        calculatedVolumeMlPerKg: 0.1, // 1.0 ml per 10 kg
        route: "IV / IO",
        cycleTiming: "Reserved strictly for prolonged non-responsive cardiac arrest exceeding 10-15 minutes.",
        notes: "Use with caution: high doses induce myocardial necrosis and post-resuscitation tachyarrhythmias."
      },
      {
        drugKey: "atropine-cpr",
        nameEn: "Atropine Sulfate",
        concentration: "1.0 mg/ml (or 0.6 mg/ml)",
        concentrationMgPerMl: 1.0,
        doseMgPerKg: 0.04,
        calculatedVolumeMlPerKg: 0.04, // 0.4 ml per 10 kg
        route: "IV / IO / IT",
        cycleTiming: "Administer on alternate cycles for Asystole, Pulseless Electrical Activity (PEA), or suspected high vagal tone.",
        notes: "Vagolytic parasympatholytic agent. Blocks intense vagal arrest triggers."
      },
      {
        drugKey: "naloxone-reversal",
        nameEn: "Naloxone HCl (Opioid Reversal)",
        concentration: "0.4 mg/ml",
        concentrationMgPerMl: 0.4,
        doseMgPerKg: 0.04,
        calculatedVolumeMlPerKg: 0.1, // 1.0 ml per 10 kg
        route: "IV / IO / IM",
        cycleTiming: "Immediate bolus if opioids (morphine, fentanyl, butorphanol) were administered prior to arrest.",
        notes: "Pure mu/kappa opioid antagonist."
      },
      {
        drugKey: "flumazenil-reversal",
        nameEn: "Flumazenil (Benzodiazepine Reversal)",
        concentration: "0.1 mg/ml",
        concentrationMgPerMl: 0.1,
        doseMgPerKg: 0.02,
        calculatedVolumeMlPerKg: 0.2, // 2.0 ml per 10 kg
        route: "IV / IO",
        cycleTiming: "Immediate bolus if Diazepam or Midazolam was administered.",
        notes: "Specific competitive GABAA benzodiazepine receptor antagonist."
      },
      {
        drugKey: "atipamezole-reversal",
        nameEn: "Atipamezole (Alpha-2 Reversal)",
        concentration: "5.0 mg/ml",
        concentrationMgPerMl: 5.0,
        doseMgPerKg: 0.1,
        calculatedVolumeMlPerKg: 0.02,
        route: "IV / IM",
        cycleTiming: "Immediate bolus if Xylazine, Medetomidine, or Dexmedetomidine was administered.",
        notes: "Highly selective alpha-2 adrenoceptor antagonist."
      },
      {
        drugKey: "sodium-bicarbonate-cpr",
        nameEn: "Sodium Bicarbonate 8.4% (Acidosis Correction)",
        concentration: "1 mEq/ml (8.4% w/v Solution)",
        concentrationMgPerMl: 84.0,
        doseMgPerKg: 1.0, // 1 mEq/kg
        calculatedVolumeMlPerKg: 1.0, // 1.0 ml per kg
        route: "IV slow over 2 minutes",
        cycleTiming: "Indicated only in prolonged arrest (>10-15 minutes) to counter catastrophic myocardial acidosis.",
        notes: "Ensures return of myocardial responsiveness to catecholamines."
      }
    ]
  };

  // 4. SHOCK RESUSCITATION & FLUIDICS BOLUS MATRIX
  const SHOCK_RESUSCITATION_MATRIX = {
    crystalloidShockDosesMlPerKg: {
      canine: 90.0,
      feline: 60.0,
      bovine: 60.0,
      bubaline: 60.0,
      equine: 80.0,
      caprine: 60.0,
      ovine: 60.0
    },

    ruleOfQuarters: {
      aliquotFraction: 0.25, // 1/4th of shock dose
      targetInfusionDurationMinutes: 15,
      clinicalGuidance: "NEVER ADMINISTER THE FULL CALCULATED SHOCK DOSE AS A SINGLE RAPID BOLUS. Administer exactly 1/4th (25%) of the total calculated shock dose over 15 to 20 minutes, then pause and re-evaluate clinical endpoints of resuscitation."
    },

    hypertonicSalineDosing: {
      concentration: "7.2% Sodium Chloride (Hypertonic Saline)",
      doseMlPerKg: 4.0, // 4 to 5 ml/kg
      infusionTimeMinutes: 5,
      mechanism: "Massive osmotic draw shifts 3 to 4 ml of water from the intracellular/interstitial space into the vascular compartment for every 1 ml infused, providing rapid volume expansion with low volume.",
      contraindications: [
        "ABSOLUTELY CONTRAINDICATED IN SEVERE DEHYDRATION (dehydrated cells cannot afford water extraction; triggers cerebral cellular desiccation).",
        "CONTRAINDICATED IN HYPERNATREMIA OR SYSTEMIC HYPEROSMOLALITY."
      ]
    },

    resuscitationEndpoints: [
      "Normalization of Heart Rate (e.g., canine HR dropping from 160+ down to 100-120 bpm)",
      "Capillary Refill Time (CRT) returning to 1.0 - 2.0 seconds",
      "Restoration of pink, moist mucous membrane color",
      "Mean Arterial Pressure (MAP) > 65 mmHg or Systolic Blood Pressure > 90 mmHg",
      "Peripheral extremities warming up; core-to-toe temperature gradient normalizing",
      "Clearance of blood lactate (declining toward <2.0 mmol/L)"
    ]
  };

  // 5. MODIFIED GLASGOW COMA SCALE (MGCS) NEUROLOGICAL EVALUATION MATRIX
  const MGCS_MATRIX = {
    motorActivity: [
      { score: 6, title: "Normal Spontaneous Movement", description: "Normal gait, ambulatory, spontaneous appropriate motor movement." },
      { score: 5, title: "Paresis / Incomplete Rigidity", description: "Hemiparesis, tetraparesis, or decerebellate posturing only upon noxious tactile stimulation." },
      { score: 4, title: "Persistent Recumbency with Extensor Tone", description: "Constant recumbency; intermittent or episodic extensor rigidity in all four limbs." },
      { score: 3, title: "Decerebrate Rigidity (Stimulation Independent)", description: "Rigid extension of all four limbs with opisthotonos (dorsal arching of neck/back) even at rest." },
      { score: 2, title: "Intermittent Decerebrate / Flaccidity", description: "Intermittent extensor rigidity with general flaccidity when stimulated." },
      { score: 1, title: "Flaccid Paralysis", description: "Completely flaccid paralysis of all limbs; complete loss of deep pain reflex and muscle tone." }
    ],

    brainstemReflexes: [
      { score: 6, title: "Normal PLR & Vestibulo-Ocular Reflex", description: "Bilateral normal direct/consensual pupillary light reflexes and normal physiological nystagmus." },
      { score: 5, title: "Slow / Sluggish PLR", description: "Sluggish pupillary light reflexes; normal or slightly reduced physiological nystagmus." },
      { score: 4, title: "Bilateral Responsive Miosis / Anisocoria", description: "Constricted pupils or asymmetrical pupil diameters (anisocoria) with preserved light response." },
      { score: 3, title: "Pinpoint Unresponsive Pupils", description: "Bilateral pinpoint constricted pupils with absent or minimal response to bright light." },
      { score: 2, title: "Unilateral Fixed Mydriasis", description: "Unilateral dilated unreactive pupil with absent oculocephalic reflex." },
      { score: 1, title: "Bilateral Fixed Mydriasis (Fixed & Dilated)", description: "Bilateral widely dilated unreactive pupils with zero response to light and loss of corneal reflex (grave brainstem herniation)." }
    ],

    levelOfConsciousness: [
      { score: 6, title: "Normal Alert & Responsive", description: "Fully conscious, responsive to environmental sights and sounds, interactive." },
      { score: 5, title: "Depressed / Lethargic / Obtunded", description: "Quiet, slow to respond, but reacts appropriately to moderate vocal or physical stimuli." },
      { score: 4, title: "Delirious / Disoriented", description: "Restless, aimless pacing, vocalizing inappropriately, disorientation." },
      { score: 3, title: "Stuporous", description: "Sleep-like state; awakens and responds ONLY to repeated, sharp noxious painful stimuli." },
      { score: 2, title: "Comatose (Incomplete)", description: "Unconscious; shows only minor, inappropriate motor twitches to noxious stimuli." },
      { score: 1, title: "Deep Coma", description: "Complete unconsciousness; totally unresponsive to repeated severe deep noxious stimuli." }
    ],

    prognosticInterpretation: function (totalScore) {
      if (totalScore <= 8) {
        return {
          scoreTier: "3 to 8 (Grave Prognosis / 50% Mortality Risk)",
          status: "GRAVE / IMMINENT BRAIN HERNIATION RISK",
          survivalProbability: "~50% or worse without emergency neuro-critical intensive care",
          clinicalRecommendations: [
            "Elevate head and neck by 30 degrees (tilt spine board; do NOT bend neck) to enhance cranial jugular venous drainage.",
            "Avoid jugular vein compression, tight collars, or holding off jugulars for blood sampling.",
            "Administer Hypertonic Saline 7.2% (3-4 ml/kg IV over 10 mins) OR Mannitol 20% (0.5 to 1.0 g/kg slow IV over 20 mins) to shrink cerebral edema.",
            "Maintain normocapnia (target PaCO2 35-40 mmHg); hypercapnia induces profound intracranial vasodilation."
          ]
        };
      } else if (totalScore >= 9 && totalScore <= 14) {
        return {
          scoreTier: "9 to 14 (Guarded to Fair Prognosis)",
          status: "GUARDED / MODERATE INTRACRANIAL INJURY",
          survivalProbability: "~75% to 85% survival with standard intensive neuro-monitoring",
          clinicalRecommendations: [
            "Serial MGCS scoring every 1 to 2 hours to detect early neurological deterioration.",
            "Maintain mean arterial blood pressure (MAP) > 80 mmHg to guarantee cerebral perfusion pressure (CPP).",
            "Provide continuous flow-by supplemental oxygen."
          ]
        };
      } else {
        return {
          scoreTier: "15 to 18 (Good / Favorable Prognosis)",
          status: "FAVORABLE / MILD NEUROLOGICAL TRAUMA",
          survivalProbability: ">95% expected survival",
          clinicalRecommendations: [
            "Supportive monitoring and conservative analgesia.",
            "Re-evaluate vitals and pupil reflexes every 4 hours."
          ]
        };
      }
    }
  };

  // 6. EMERGENCY TRIAGE & CRITICAL CARE CONTROLLER IMPLEMENTATION
  const EmergencyEngine = {
    tiers: TRIAGE_TIERS,
    recoverCpr: RECOVER_CPR_PROTOCOL,
    shockMatrix: SHOCK_RESUSCITATION_MATRIX,
    mgcsMatrix: MGCS_MATRIX
  };

  /**
   * STRUCTURED CLINICAL TRIAGE CATEGORY EVALUATOR:
   * Categorizes presenting patient into RED, ORANGE, YELLOW, or GREEN tier based on vitals and clinical signs.
   *
   * @param {Object} vitalSigns - { heartRate, respiratoryRate, bodyTempF, mmColor, crtSeconds, bloodPressureSystolic }
   * @param {Array} symptomsArray - Array of symptom strings e.g. ['cpa', 'dyspnea', 'severe-bleeding']
   */
  EmergencyEngine.evaluateTriageCategory = function (vitalSigns, symptomsArray) {
    const vitals = vitalSigns || {};
    const syms = Array.isArray(symptomsArray) ? symptomsArray.map(s => s.toLowerCase()) : [];

    const has = function (kw) {
      for (let i = 0; i < syms.length; i++) {
        if (syms[i].indexOf(kw) !== -1) return true;
      }
      return false;
    };

    // 1. Check RED Tier (Category 1: Immediate / 0 Mins)
    const isRedCpa = has("arrest") || has("apnea") || has("cpa") || has("no-pulse");
    const isRedAirway = has("asphyxia") || has("stridor") || has("suffocation") || has("choke");
    const isRedBleed = has("arterial") || has("spurting") || has("hemorrhage");
    const isRedAnaphylaxis = has("anaphylaxis") || has("collapse");
    const isRedToxin = has("cyanide") || (has("organophosphate") && has("slud"));
    const isRedTympan = has("bloat") && (has("cyanosis") || has("gasping"));

    if (isRedCpa || isRedAirway || isRedBleed || isRedAnaphylaxis || isRedToxin || isRedTympan) {
      return Object.assign({ matchedTier: "RED" }, TRIAGE_TIERS.RED);
    }

    // 2. Check ORANGE Tier (Category 2: Emergent / <15 Mins)
    const isOrangeGdv = has("gdv") || has("twisted-stomach");
    const isOrangePneumo = has("pneumothorax") || has("chest-wound");
    const isOrangeMilkFever = has("milk-fever") || (vitals.bodyTempF && vitals.bodyTempF < 98.0);
    const isOrangeHeatStroke = vitals.bodyTempF && vitals.bodyTempF >= 105.5;
    const isOrangeSeizure = has("seizure") || has("epilepsy") || has("convulsion");
    const isOrangeSnake = has("snake") || has("fang");
    const isOrangeBlockedCat = has("blocked-cat") || (has("dysuria") && vitals.heartRate && vitals.heartRate < 120);

    if (isOrangeGdv || isOrangePneumo || isOrangeMilkFever || isOrangeHeatStroke || isOrangeSeizure || isOrangeSnake || isOrangeBlockedCat) {
      return Object.assign({ matchedTier: "ORANGE" }, TRIAGE_TIERS.ORANGE);
    }

    // 3. Check YELLOW Tier (Category 3: Urgent / <60 Mins)
    const isYellowDystocia = has("dystocia") || has("calving-straining");
    const isYellowDehydration = (has("dehydration") && !isRedCpa) || (vitals.crtSeconds && vitals.crtSeconds >= 3.0);
    const isYellowProlapse = has("prolapse");
    const isYellowFracture = has("fracture");
    const isYellowHighFever = vitals.bodyTempF && vitals.bodyTempF >= 104.0;

    if (isYellowDystocia || isYellowDehydration || isYellowProlapse || isYellowFracture || isYellowHighFever) {
      return Object.assign({ matchedTier: "YELLOW" }, TRIAGE_TIERS.YELLOW);
    }

    // 4. Fallback to GREEN Tier (Category 4: Non-Urgent)
    return Object.assign({ matchedTier: "GREEN" }, TRIAGE_TIERS.GREEN);
  };

  /**
   * RECOVER CPR DRUG DOSAGE CALCULATOR:
   * Computes precise volumes (ml) of resuscitation drugs and emergency reversal agents.
   *
   * @param {number} weightKg - Animal live body weight in kg
   * @param {string} species - Animal species
   */
  EmergencyEngine.calculateCprDrugDoses = function (weightKg, species) {
    const wt = parseFloat(weightKg);
    if (isNaN(wt) || wt <= 0) {
      return { error: "Invalid body weight provided: " + weightKg };
    }

    const sp = (species || "canine").trim().toLowerCase();
    const calculatedDrugs = [];

    const formulary = RECOVER_CPR_PROTOCOL.alsDrugFormulary;
    for (let i = 0; i < formulary.length; i++) {
      const drug = formulary[i];
      let doseMl = (wt * drug.calculatedVolumeMlPerKg);

      // Bovine/Equine scaling note for large mass
      if (wt > 300 && drug.drugKey === "epinephrine-low-dose") {
        doseMl = wt * 0.01; // e.g., 400kg = 4 ml of 1:1000
      }

      calculatedDrugs.push({
        drugKey: drug.drugKey,
        nameEn: drug.nameEn,
        concentration: drug.concentration,
        doseMgPerKg: drug.doseMgPerKg,
        exactVolumeMl: Number(doseMl.toFixed(2)),
        route: drug.route,
        cycleTiming: drug.cycleTiming,
        notes: drug.notes
      });
    }

    return {
      species: sp,
      weightKg: wt,
      blsInstructions: RECOVER_CPR_PROTOCOL.blsGuidelines,
      resuscitationDrugDoses: calculatedDrugs
    };
  };

  /**
   * SHOCK RESUSCITATION & FLUIDICS BOLUS CALCULATOR:
   * Computes exact 15-minute fluid boluses applying the clinical 'Rule of Quarters'.
   *
   * @param {number} weightKg - Animal weight in kg
   * @param {string} species - 'canine', 'feline', 'bovine', 'bubaline', 'equine', 'caprine'
   * @param {string} shockType - 'hypovolemic', 'distributive', 'cardiogenic', 'obstructive'
   */
  EmergencyEngine.calculateShockBolus = function (weightKg, species, shockType) {
    const wt = parseFloat(weightKg);
    if (isNaN(wt) || wt <= 0) {
      return { error: "Invalid body weight provided: " + weightKg };
    }

    const sp = (species || "canine").trim().toLowerCase();
    const type = (shockType || "hypovolemic").trim().toLowerCase();

    // Critical Cardiogenic Warning
    if (type === "cardiogenic") {
      return {
        shockType: "Cardiogenic Shock (Congestive Heart Failure / Dilated Cardiomyopathy)",
        clinicalWarning: "CRITICAL: RAPID INTRAVENOUS FLUID BOLUSES ARE STRICTLY CONTRAINDICATED IN CARDIOGENIC SHOCK (induces fatal acute pulmonary edema).",
        recommendedTherapy: "Administer Inotropes (Pimobendan / Dobutamine) and Diuretics (Furosemide); provide cage oxygen therapy."
      };
    }

    const shockDoses = SHOCK_RESUSCITATION_MATRIX.crystalloidShockDosesMlPerKg;
    const fullShockDoseMlPerKg = shockDoses[sp] || 80.0;
    const totalFullShockDoseMl = Math.round(wt * fullShockDoseMlPerKg);

    // Rule of Quarters (25% of total shock dose over 15 minutes)
    const initialQuarterBolusMl = Math.round(totalFullShockDoseMl * SHOCK_RESUSCITATION_MATRIX.ruleOfQuarters.aliquotFraction);
    const flowRateMlPerHour = initialQuarterBolusMl * 4; // Infused over 15 mins (1/4 hr)

    // Hypertonic Saline Option
    const hypertonicSalineMl = Math.round(wt * SHOCK_RESUSCITATION_MATRIX.hypertonicSalineDosing.doseMlPerKg);

    return {
      species: sp,
      bodyWeightKg: wt,
      shockClassification: type.toUpperCase() + " SHOCK",
      totalCalculatedShockDoseMl: totalFullShockDoseMl,
      initial15MinuteBolusMl: initialQuarterBolusMl,
      infusionFlowRateMlPerHour: flowRateMlPerHour,
      hypertonicSalineAlternative: {
        volumeMl: hypertonicSalineMl,
        infusionDurationMinutes: SHOCK_RESUSCITATION_MATRIX.hypertonicSalineDosing.infusionTimeMinutes,
        instructions: "Infuse " + hypertonicSalineMl + " ml of 7.2% Hypertonic Saline IV over 5-10 minutes, immediately followed by isotonic crystalloids at 1/2 maintenance.",
        contraindications: SHOCK_RESUSCITATION_MATRIX.hypertonicSalineDosing.contraindications
      },
      ruleOfQuartersProtocol: SHOCK_RESUSCITATION_MATRIX.ruleOfQuarters.clinicalGuidance,
      clinicalEndpointsToReevaluate: SHOCK_RESUSCITATION_MATRIX.resuscitationEndpoints
    };
  };

  /**
   * MODIFIED GLASGOW COMA SCALE (MGCS) NEUROLOGICAL EVALUATOR:
   * Computes score (3 to 18) and outputs prognosis and neuro-protective recommendations.
   *
   * @param {number} motorScore - Score 1 to 6
   * @param {number} brainstemScore - Score 1 to 6
   * @param {number} consciousnessScore - Score 1 to 6
   */
  EmergencyEngine.evaluateMgcs = function (motorScore, brainstemScore, consciousnessScore) {
    const m = parseInt(motorScore, 10);
    const b = parseInt(brainstemScore, 10);
    const c = parseInt(consciousnessScore, 10);

    const validate = function (v) {
      return !isNaN(v) && v >= 1 && v <= 6;
    };

    if (!validate(m) || !validate(b) || !validate(c)) {
      return { error: "Each MGCS parameter (motor, brainstem, consciousness) must be an integer between 1 and 6." };
    }

    const totalScore = m + b + c;
    const motorObj = MGCS_MATRIX.motorActivity.find(item => item.score === m);
    const brainstemObj = MGCS_MATRIX.brainstemReflexes.find(item => item.score === b);
    const consciousObj = MGCS_MATRIX.levelOfConsciousness.find(item => item.score === c);

    const prognosis = MGCS_MATRIX.prognosticInterpretation(totalScore);

    return {
      totalMgcsScore: totalScore,
      maxScorePossible: 18,
      minScorePossible: 3,
      domainBreakdown: {
        motorActivity: { score: m, title: motorObj.title, description: motorObj.description },
        brainstemReflexes: { score: b, title: brainstemObj.title, description: brainstemObj.description },
        levelOfConsciousness: { score: c, title: consciousObj.title, description: consciousObj.description }
      },
      prognosticAssessment: prognosis
    };
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.EmergencyTriage = EmergencyEngine;

})();
