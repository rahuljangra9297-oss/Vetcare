// Vetcare AI OS - Veterinary Mathematical Algorithms, Resuscitation Fluidics & Clinical Calculators (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. SPECIES GESTATION LENGTH MATRIX & PHYSIOLOGICAL BENCHMARKS
  const GESTATION_MATRIX = {
    bovine: {
      speciesEn: "Bovine (Cow)",
      speciesHi: "गाय (गोवंश)",
      avgDays: 283,
      rangeDays: { min: 279, max: 287 },
      dryOffDaysBeforeCalving: 60,
      steamingUpDaysBeforeCalving: 45
    },
    bubaline: {
      speciesEn: "Bubaline (Buffalo)",
      speciesHi: "भैंस (महिषवंश)",
      avgDays: 310,
      rangeDays: { min: 305, max: 315 },
      dryOffDaysBeforeCalving: 60,
      steamingUpDaysBeforeCalving: 45
    },
    caprine: {
      speciesEn: "Caprine (Goat / Doe)",
      speciesHi: "बकरी",
      avgDays: 150,
      rangeDays: { min: 146, max: 155 },
      dryOffDaysBeforeCalving: 45,
      steamingUpDaysBeforeCalving: 30
    },
    ovine: {
      speciesEn: "Ovine (Sheep / Ewe)",
      speciesHi: "भेड़",
      avgDays: 148,
      rangeDays: { min: 144, max: 152 },
      dryOffDaysBeforeCalving: 45,
      steamingUpDaysBeforeCalving: 30
    },
    equine: {
      speciesEn: "Equine (Mare)",
      speciesHi: "घोड़ी",
      avgDays: 340,
      rangeDays: { min: 330, max: 345 },
      dryOffDaysBeforeCalving: 60,
      steamingUpDaysBeforeCalving: 45
    },
    canine: {
      speciesEn: "Canine (Bitch)",
      speciesHi: "कुतिया",
      avgDays: 63,
      rangeDays: { min: 58, max: 68 },
      dryOffDaysBeforeCalving: 0,
      steamingUpDaysBeforeCalving: 21
    },
    feline: {
      speciesEn: "Feline (Queen)",
      speciesHi: "बिल्ली",
      avgDays: 63,
      rangeDays: { min: 60, max: 65 },
      dryOffDaysBeforeCalving: 0,
      steamingUpDaysBeforeCalving: 14
    },
    camel: {
      speciesEn: "Camel (She-Camel)",
      speciesHi: "सांडनी / ऊँट",
      avgDays: 390,
      rangeDays: { min: 375, max: 410 },
      dryOffDaysBeforeCalving: 60,
      steamingUpDaysBeforeCalving: 60
    }
  };

  // 3. CLINICAL CALCULATOR ENGINE IMPLEMENTATION
  const CalculatorEngine = {
    gestationMatrix: GESTATION_MATRIX
  };

  /**
   * ESTIMATE LIVE BODY WEIGHT (शारीरिक वजन अनुमानक)
   * Calculates live weight without physical weighbridges using morphometric heart girth and length.
   *
   * @param {string} species - 'bovine', 'bubaline', 'caprine', 'ovine', 'equine', 'canine'
   * @param {number} heartGirthInches - Chest circumference immediately behind forelegs (inches)
   * @param {number} bodyLengthInches - Shoulder point (scapula) to pin bone (tuber ischii) in inches
   * @returns {Object} Estimated weight in kg and lbs, formula used, and confidence margin.
   */
  CalculatorEngine.estimateBodyWeight = function (species, heartGirthInches, bodyLengthInches) {
    const sp = (species || "bovine").trim().toLowerCase();
    const g = parseFloat(heartGirthInches);
    const l = parseFloat(bodyLengthInches);

    // Validation Guardrails
    if (isNaN(g) || isNaN(l) || g <= 10 || l <= 10) {
      return {
        error: "Invalid dimensions provided. Heart girth and body length must be positive values > 10 inches."
      };
    }

    if (g > 150 || l > 150) {
      return {
        error: "Measurements exceed biological maximum limits for veterinary land mammals (>150 inches)."
      };
    }

    let weightLbs = 0;
    let weightKg = 0;
    let formulaName = "";
    let confidence = "± 5% to 7% error margin under standard standing posture";

    if (sp === "bubaline") {
      // Agarwal's Indian Formula specifically modified for Riverine Buffaloes (Murrah, Mehsana, Jaffarabadi)
      // Weight in Seers = (Girth * Length) / Y, where Y varies with chest girth
      // 1 Seer = 0.9331043 kg
      let divisorY = 9.0;
      if (g < 65) {
        divisorY = 8.7;
      } else if (g >= 65 && g <= 80) {
        divisorY = 9.0;
      } else {
        divisorY = 9.5;
      }

      const weightInSeers = (g * l) / divisorY;
      weightKg = weightInSeers * 0.9331043;
      weightLbs = weightKg * 2.20462;
      formulaName = "Agarwal's Indian Morphometric Formula for Buffaloes [Weight (kg) = ((G × L) / Y) × 0.9331]";
    } else if (sp === "caprine" || sp === "ovine") {
      // Small Ruminant Volumetric Regression Formula
      // Weight in kg = (Girth^2 * Length) / 660 (where G and L are in inches)
      weightKg = (Math.pow(g, 2) * l) / 660.0;
      weightLbs = weightKg * 2.20462;
      formulaName = "Small Ruminant Volumetric Regression [Weight (kg) = (G² × L) / 660]";
      confidence = "± 6% to 8% margin; ensure animal is standing squarely on all four legs";
    } else if (sp === "canine") {
      // Medium to Large Canine Volumetric Estimation
      weightKg = (Math.pow(g, 2) * l) / 750.0;
      weightLbs = weightKg * 2.20462;
      formulaName = "Canine Morphometric Weight Approximation [Weight (kg) = (G² × L) / 750]";
    } else {
      // Schaeffer's Formula (Standard for Cattle and Horses)
      // Weight in lbs = (Heart Girth^2 * Length) / 300
      weightLbs = (Math.pow(g, 2) * l) / 300.0;
      weightKg = weightLbs * 0.45359237;
      formulaName = "Schaeffer's Classic Formula [Weight (lbs) = (G² × L) / 300; converted to kg]";
    }

    return {
      species: sp,
      heartGirthInches: g,
      bodyLengthInches: l,
      weightKg: Number(weightKg.toFixed(2)),
      weightLbs: Number(weightLbs.toFixed(2)),
      formulaUsed: formulaName,
      confidenceMargin: confidence,
      clinicalGuidance: "Weight estimate is optimized for calculateDoseVolume and anthelmintic calibration. Animal must stand relaxed on level ground with head in neutral position."
    };
  };

  /**
   * EMERGENCY RESUSCITATION & MAINTENANCE FLUIDICS CALCULATOR (तरल चिकित्सा / ड्रिप कैलकुलेटर)
   *
   * @param {number} weightKg - Animal live body weight in kg
   * @param {number} dehydrationPercent - Estimated clinical dehydration (4% to 15%)
   * @param {number} ongoingLossesMl - Ongoing vomition/diarrheal fluid loss in ml (default: 0)
   * @param {number} hoursToInfuse - Target infusion duration in hours (e.g., 24 hrs or 4 hrs in shock)
   * @param {number} dripFactorGttPerMl - IV infusion set drop factor (15 gtt/ml standard adult, 60 gtt/ml micro-drip)
   * @param {string} clinicalContext - 'diarrhea', 'vomiting', 'shock', 'ketosis', 'acidosis'
   */
  CalculatorEngine.calculateFluidRequirement = function (weightKg, dehydrationPercent, ongoingLossesMl, hoursToInfuse, dripFactorGttPerMl, clinicalContext) {
    const wt = parseFloat(weightKg);
    const dehy = parseFloat(dehydrationPercent);
    const losses = parseFloat(ongoingLossesMl) || 0;
    const hours = parseFloat(hoursToInfuse) || 24;
    const dripFactor = parseFloat(dripFactorGttPerMl) || 15;
    const context = (clinicalContext || "diarrhea").trim().toLowerCase();

    // Guardrail Validations
    if (isNaN(wt) || wt <= 0) {
      return { error: "Invalid body weight provided." };
    }

    if (isNaN(dehy) || dehy < 0 || dehy > 15) {
      return {
        error: "Invalid dehydration percentage. Clinical survival limits are between 4% (mild) and 15% (terminal circulatory collapse)."
      };
    }

    if (hours <= 0 || hours > 72) {
      return { error: "Hours to infuse must be between 1 and 72 hours." };
    }

    // 1. Dehydration Deficit (ml) = Dehydration% × Weight(kg) × 10
    // Example: 8% in 400kg = 0.08 * 400 * 1000 = 32,000 ml (32 Liters)
    const deficitMl = (dehy / 100.0) * wt * 1000.0;

    // 2. 24-Hour Maintenance Requirement:
    // Large Animals (Cattle, Buffalo, Horses): 50 ml/kg/day
    // Small Animals (Dogs, Cats, Calves): 60 ml/kg/day
    const isSmallAnimal = wt < 50;
    const maintenanceRateMlPerKg = isSmallAnimal ? 60.0 : 50.0;
    const maintenance24HrMl = wt * maintenanceRateMlPerKg;

    // Maintenance proportional to target infusion hours
    const maintenanceForPeriodMl = (maintenance24HrMl / 24.0) * hours;

    // 3. Total Fluid Volume
    const totalFluidRequiredMl = Math.round(deficitMl + maintenanceForPeriodMl + losses);
    const totalFluidRequiredLiters = Number((totalFluidRequiredMl / 1000.0).toFixed(2));

    // 4. Infusion Flow Rates
    const flowRateMlPerHour = Math.round(totalFluidRequiredMl / hours);
    const flowRateMlPerMin = Number((flowRateMlPerHour / 60.0).toFixed(2));
    const dropsPerMinute = Math.round((flowRateMlPerHour * dripFactor) / 60.0);

    // 5. Clinical Safety & Triage Severity Warnings
    let severityStatus = "MODERATE DEHYDRATION";
    let emergencyAlert = null;
    let shockResuscitationBolusMl = 0;

    if (dehy >= 10.0) {
      severityStatus = "SEVERE HYPOVOLEMIC SHOCK CRISIS";
      // In shock: give 20-40 ml/kg rapid bolus in first hour
      shockResuscitationBolusMl = Math.round(wt * 25.0);
      emergencyAlert = "CRITICAL SHOCK WARNING: Dehydration ≥10% indicates acute vascular collapse. Administer immediate rapid IV bolus of " +
        (shockResuscitationBolusMl / 1000.0).toFixed(1) + " Liters (" + shockResuscitationBolusMl + " ml) over the first 45-60 minutes before throttling to maintenance rate.";
    } else if (dehy <= 5.0) {
      severityStatus = "MILD DEHYDRATION";
    }

    // 6. Fluid Type Selection Recommendations
    let fluidRecommendation = "Ringer's Lactate (RL)";
    let fluidRationale = "Balanced isotonic crystalloid replacement of choice.";

    if (context === "diarrhea" || context === "acidosis") {
      fluidRecommendation = "Ringer's Lactate (RL) + 5% Sodium Bicarbonate IV";
      fluidRationale = "Counters massive intestinal bicarbonate loss and metabolic acidosis.";
    } else if (context === "vomiting" || context === "abomasal-impaction") {
      fluidRecommendation = "0.9% Normal Saline (0.9% NaCl)";
      fluidRationale = "Hypochloremic metabolic alkalosis with hypokalemia: Normal Saline supplies chloride to restore acid-base balance.";
    } else if (context === "ketosis" || context === "hypoglycemia") {
      fluidRecommendation = "Dextrose Normal Saline (DNS 5% or 10% Dextrose)";
      fluidRationale = "Supplies immediate circulating glucose to arrest fatty acid lipolysis and ketoacidosis.";
    }

    return {
      bodyWeightKg: wt,
      dehydrationPercent: dehy,
      severityStatus: severityStatus,
      totalFluidRequiredLiters: totalFluidRequiredLiters,
      totalFluidRequiredMl: totalFluidRequiredMl,
      hoursToInfuse: hours,
      breakdown: {
        deficitReplacementMl: Math.round(deficitMl),
        maintenanceRequirementMl: Math.round(maintenanceForPeriodMl),
        ongoingLossesCoveredMl: Math.round(losses)
      },
      flowRate: {
        mlPerHour: flowRateMlPerHour,
        mlPerMinute: flowRateMlPerMin,
        dropsPerMinute: dropsPerMinute,
        dripSetCalibrated: dripFactor + " gtt/ml"
      },
      recommendedFluidType: fluidRecommendation,
      fluidRationale: fluidRationale,
      emergencyShockAlert: emergencyAlert,
      shockBolusVolumeMl: shockResuscitationBolusMl
    };
  };

  /**
   * EXPECTED DELIVERY DATE (EDD) & PREGNANCY AUDIT CALCULATOR (प्रसव तिथि व गर्भकाल विश्लेषक)
   *
   * @param {string} species - Species identifier
   * @param {string|Date} serviceOrAiDate - Insemination / Mating date (YYYY-MM-DD)
   */
  CalculatorEngine.calculateExpectedDeliveryDate = function (species, serviceOrAiDate) {
    const sp = (species || "bovine").trim().toLowerCase();
    const info = GESTATION_MATRIX[sp] || GESTATION_MATRIX.bovine;

    const aiDate = new Date(serviceOrAiDate);
    if (isNaN(aiDate.getTime())) {
      return { error: "Invalid breeding/AI date provided: " + serviceOrAiDate };
    }

    // Expected Calving Date = AI Date + Average Gestation Days
    const eddDate = new Date(aiDate.getTime());
    eddDate.setDate(eddDate.getDate() + info.avgDays);

    // Clinical Range Window
    const minRangeDate = new Date(aiDate.getTime());
    minRangeDate.setDate(minRangeDate.getDate() + info.rangeDays.min);

    const maxRangeDate = new Date(aiDate.getTime());
    maxRangeDate.setDate(maxRangeDate.getDate() + info.rangeDays.max);

    // Days elapsed & remaining
    const today = new Date();
    const todayClean = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const aiClean = new Date(aiDate.getFullYear(), aiDate.getMonth(), aiDate.getDate());

    const elapsedMs = todayClean.getTime() - aiClean.getTime();
    const daysElapsed = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
    const daysRemaining = info.avgDays - daysElapsed;

    // Trimester Calculation
    let currentTrimester = 1;
    const thirdOfGestation = info.avgDays / 3.0;

    if (daysElapsed > thirdOfGestation * 2) {
      currentTrimester = 3;
    } else if (daysElapsed > thirdOfGestation) {
      currentTrimester = 2;
    }

    // Dairy Dry-Off Date (60 days prior to expected delivery)
    let dryOffDateStr = null;
    if (info.dryOffDaysBeforeCalving > 0) {
      const dryDate = new Date(eddDate.getTime());
      dryDate.setDate(dryDate.getDate() - info.dryOffDaysBeforeCalving);
      dryOffDateStr = dryDate.toISOString().split("T")[0];
    }

    // Steaming-up Date (Transition feeding initiation)
    let steamingUpDateStr = null;
    if (info.steamingUpDaysBeforeCalving > 0) {
      const steamDate = new Date(eddDate.getTime());
      steamDate.setDate(steamDate.getDate() - info.steamingUpDaysBeforeCalving);
      steamingUpDateStr = steamDate.toISOString().split("T")[0];
    }

    let status = "GESTATION IN PROGRESS";
    if (daysRemaining <= 0) {
      status = "OVERDUE / FULL TERM (PARTURITION IMMINENT)";
    } else if (daysRemaining <= 15) {
      status = "CLOSE-UP TRANSITION (PARTURITION WINDOW OPEN)";
    }

    return {
      species: sp,
      speciesNameEn: info.speciesEn,
      speciesNameHi: info.speciesHi,
      serviceAiDate: aiDate.toISOString().split("T")[0],
      expectedDeliveryDate: eddDate.toISOString().split("T")[0],
      deliveryWindowRange: {
        earliestDate: minRangeDate.toISOString().split("T")[0],
        latestDate: maxRangeDate.toISOString().split("T")[0]
      },
      averageGestationDays: info.avgDays,
      daysElapsed: daysElapsed,
      daysRemaining: Math.max(0, daysRemaining),
      currentTrimester: currentTrimester,
      status: status,
      criticalMilestones: {
        recommendedDryOffDate: dryOffDateStr,
        steamingUpTransitionDate: steamingUpDateStr,
        preFoalingBoosterVaccineDate: currentTrimester === 3 ? "Administer Tetanus Toxoid / FMD booster 4 weeks prior to EDD" : "Scheduled in 3rd trimester"
      }
    };
  };

  /**
   * BODY CONDITION SCORE (BCS) & METABOLIC RISK AUDITOR (शारीरिक स्थिति स्कोर विश्लेषक)
   *
   * @param {string} species - Animal species
   * @param {number} scoreValue - Value on 1.0 to 5.0 scale (increments of 0.25/0.5)
   */
  CalculatorEngine.calculateBodyConditionScore = function (species, scoreValue) {
    const sp = (species || "bovine").trim().toLowerCase();
    const score = parseFloat(scoreValue);

    if (isNaN(score) || score < 1.0 || score > 5.0) {
      return { error: "BCS score must be between 1.0 (Emaciated) and 5.0 (Severely Obese)." };
    }

    let classification = "IDEAL / OPTIMAL";
    let classificationHi = "आदर्श शारीरिक स्थिति";
    let metabolicRisk = "LOW";
    let reproductiveOutcome = "Optimal estrus expression, high conception rate (>60%), minimal metabolic disorder risks.";
    let dietaryActionKg = 0; // Concentrate adjustment in kg

    if (score < 2.0) {
      classification = "SEVERELY EMACIATED / CACHECTIC";
      classificationHi = "अत्यधिक कमजोर / हड्डियों का ढांचा";
      metabolicRisk = "HIGH (Nutritional Deprivation)";
      reproductiveOutcome = "High incidence of silent heat, true anestrus, poor follicular growth, and low colostral immunoglobulin titers.";
      dietaryActionKg = +2.0; // Increase concentrate by 2 kg
    } else if (score >= 2.0 && score < 2.75) {
      classification = "UNDER-CONDITIONED / THIN";
      classificationHi = "कमजोर शारीरिक स्थिति";
      metabolicRisk = "MODERATE";
      reproductiveOutcome = "Delayed post-partum resumption of ovarian cyclicity, elongated calving interval.";
      dietaryActionKg = +1.0;
    } else if (score >= 2.75 && score <= 3.5) {
      classification = "IDEAL / HEALTHY TARGET";
      classificationHi = "उत्तम स्वास्थ्य / संतुलित";
      metabolicRisk = "VERY LOW";
      reproductiveOutcome = "Normal calving, timely placental expulsion, robust lactation persistency.";
      dietaryActionKg = 0;
    } else if (score > 3.5 && score <= 4.25) {
      classification = "OVER-CONDITIONED / FAT";
      classificationHi = "अधिक मोटा / भारी चर्बी";
      metabolicRisk = "HIGH (Ketosis & Fatty Liver Vulnerable)";
      reproductiveOutcome = "High risk of dystocia, delayed cervical dilation, post-calving appetite depression.";
      dietaryActionKg = -1.0;
    } else {
      classification = "SEVERELY OBESE / MORBIDLY FAT";
      classificationHi = "अत्यधिक मोटा (मोटापे के रोग)";
      metabolicRisk = "VERY HIGH (Fat Cow Syndrome / Hepatic Lipidosis)";
      reproductiveOutcome = "Severe hepatic lipid infiltration, clinical ketosis within 14 days post-calving, downer cow syndrome, metritis, and abomasal displacement.";
      dietaryActionKg = -2.0;
    }

    return {
      species: sp,
      bcsScore: score,
      classification: classification,
      classificationHi: classificationHi,
      metabolicRiskLevel: metabolicRisk,
      reproductiveOutcomeForecast: reproductiveOutcome,
      dietaryConcentrateAdjustmentKg: dietaryActionKg,
      clinicalGuidance: dietaryActionKg > 0
        ? "Gradually increase concentrate energy density by " + dietaryActionKg + " kg/day with high quality leguminous green fodder."
        : dietaryActionKg < 0
          ? "Reduce high-starch cereal grains by " + Math.abs(dietaryActionKg) + " kg/day; replace with high-fiber quality roughage. Avoid sudden crash starvation."
          : "Maintain current balanced ration; monitor BCS every 30 days."
    };
  };

  /**
   * NEGATIVE ENERGY BALANCE (NEB) & KETOSIS VULNERABILITY INDEX (ऊर्जा घाटा व कीटोसिस जोखिम)
   *
   * @param {number} bodyWeightKg - Live weight (e.g. 450)
   * @param {number} milkYieldLiters - Daily milk production in liters
   * @param {number} fatPercent - Milk fat percentage
   * @param {number} bcsScore - Body condition score (1.0 to 5.0)
   * @param {number} daysInMilk - Days since calving (DIM, default: 21 days - peak risk window)
   */
  CalculatorEngine.calculateEnergyDeficit = function (bodyWeightKg, milkYieldLiters, fatPercent, bcsScore, daysInMilk) {
    const wt = parseFloat(bodyWeightKg) || 450.0;
    const milk = parseFloat(milkYieldLiters) || 0.0;
    const fat = parseFloat(fatPercent) || 4.2;
    const bcs = parseFloat(bcsScore) || 3.0;
    const dim = parseInt(daysInMilk, 10) || 21;

    // Fat Corrected Milk 4% (FCM) = 0.4*milk + 15*(fat/100)*milk
    const fcmLiters = (0.4 * milk) + (15.0 * (fat / 100.0) * milk);

    // Net Energy required for Lactation (NE_L in Mcal)
    // Maintenance = 0.08 * W^0.75 Mcal
    // Milk = 0.74 Mcal per Liter of 4% FCM
    const maintNelMcal = 0.08 * Math.pow(wt, 0.75);
    const milkNelMcal = fcmLiters * 0.74;
    const totalRequiredNelMcal = maintNelMcal + milkNelMcal;

    // In early lactation (first 60 DIM), dry matter intake (DMI) lags behind milk energy demands
    let intakeCapacityFactor = 0.85; // DMI suppression in early lactation
    if (dim > 60) intakeCapacityFactor = 1.0;
    if (bcs >= 4.0) intakeCapacityFactor = 0.75; // Fat cows have severe intake depression

    const expectedDmiKg = ((wt * 0.032) * intakeCapacityFactor);
    // Standard dairy ration energy density ~1.55 Mcal NE_L per kg DM
    const estimatedIntakeNelMcal = expectedDmiKg * 1.55;

    // Energy Balance = Intake - Required
    const energyBalanceMcal = Number((estimatedIntakeNelMcal - totalRequiredNelMcal).toFixed(2));

    let ketosisRisk = "LOW";
    let recommendedAction = "Dietary energy intake matches physiological output.";

    if (energyBalanceMcal < -6.0 || (bcs >= 4.0 && dim <= 45)) {
      ketosisRisk = "CRITICAL / SEVERE KETOSIS VULNERABILITY";
      recommendedAction = "Severe negative energy balance! Immediate intervention: (1) Drench Propylene Glycol 250-300 ml PO OD for 5 days, (2) Top-dress 150-200g Rumen Protected Bypass Fat, (3) Administer Niacin (6g/day).";
    } else if (energyBalanceMcal < -2.5) {
      ketosisRisk = "MODERATE (SUBCLINICAL KETOSIS RISK)";
      recommendedAction = "Add 100g Bypass Fat daily to concentrate ration. Increase grain density slightly and ensure continuous access to fresh clean water.";
    }

    return {
      bodyWeightKg: wt,
      daysInMilk: dim,
      dailyMilkLiters: milk,
      fatCorrectedMilkLiters: Number(fcmLiters.toFixed(2)),
      energyRequiredMcal: Number(totalRequiredNelMcal.toFixed(2)),
      estimatedEnergyIntakeMcal: Number(estimatedIntakeNelMcal.toFixed(2)),
      netEnergyBalanceMcal: energyBalanceMcal,
      isNegativeEnergyBalance: energyBalanceMcal < 0,
      ketosisRiskLevel: ketosisRisk,
      therapeuticRecommendation: recommendedAction
    };
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.Calculators = CalculatorEngine;

})();
