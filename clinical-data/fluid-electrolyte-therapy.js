// Vetcare AI OS - Veterinary Fluid Therapy, Electrolyte Calculations & Acid-Base Management Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE INITIALIZATION & ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  /**
   * Veterinary Critical Care Fluid Resuscitation, Electrolyte Dynamics & Blood Banking Engine
   * Engineered in strict compliance with AAHA/AAFP Fluid Therapy Guidelines, VECCS (Veterinary Emergency
   * and Critical Care Society), and ISO-VET 2026 Intensive Care Pharmacopeia.
   */
  window.VetcareApp.ClinicalData.FluidElectrolytes = {
    metadata: {
      subsystem: "Fluid Resuscitation, Acid-Base & Hemotherapy Engine",
      version: "2026.4.6-PROD",
      isoVetStandard: "ISO-VET-FLUID-2026",
      supportedTaxa: ["Canine", "Feline", "Bovine", "Bubaline", "Equine", "Caprine", "Ovine"],
      authoritativeSource: "VECCS Critical Care Fluid Protocols & International Renal/Acid-Base Standards"
    },

    // =========================================================================
    // 2. COMPREHENSIVE FLUID COMPOSITION DATABASE
    // =========================================================================
    fluidFormulations: {
      ringersLactate: {
        nameEn: "Ringer's Lactate Solution (Hartmann's Solution / RL)",
        nameHi: "रिंगर लैक्टेट घोल (हार्टमैन्स सोल्यूशन / आर.एल.)",
        type: "Balanced Replacement Isotonic Crystalloid",
        tonicityInVivo: "Isotonic (हल्का हाइपोटोनिक विवो में)",
        osmolarityMOsmPerL: 273,
        compositionMEqPerL: {
          sodium: 130,
          potassium: 4,
          chloride: 109,
          calcium: 3,
          magnesium: 0,
          buffer: "Lactate 28 mEq/L"
        },
        clinicalIndicationsHi: [
          "हाइपोवोलेमिक शॉक एवं निर्जलीकरण का तीव्र प्रतिस्थापन (First-line volume replacement)",
          "मेटाबोलिक एसिडोसिस (लैक्टेट यकृत में बाइकार्बोनेट में परिवर्तित होता है)",
          "सर्जिकल पेरी-ऑपरेटिव द्रव रखरखाव एवं दस्त/गैस्ट्रोएंटेराइटिस में द्रव हानि"
        ],
        contraindicationsHi: [
          "गंभीर यकृत विफलता (लिवर लैक्टेट को बाइकार्बोनेट में मेटाबोलाइज नहीं कर पाता; लैक्टिक एसिडोसिस बढ़ सकता है)",
          "हाइपरकेलेमिया या एडिसन रोग (Addison's disease) में सावधानी (यद्यपि केवल 4 mEq/L K+ होता है)",
          "रक्त आधान (Blood Transfusion) के साथ एक ही IV लाइन में न दें (कैल्शियम सिट्रेट-एंटीकोगुलेटेड रक्त में थक्के जमा देता है)"
        ]
      },

      normalSaline09: {
        nameEn: "0.9% Normal Saline Solution (0.9% NaCl)",
        nameHi: "0.9% नॉर्मल सेलाइन (शारीरिक नमक का घोल / एन.एस.)",
        type: "Unbalanced Replacement Isotonic Crystalloid",
        tonicityInVivo: "Isotonic",
        osmolarityMOsmPerL: 308,
        compositionMEqPerL: {
          sodium: 154,
          potassium: 0,
          chloride: 154,
          calcium: 0,
          magnesium: 0,
          buffer: "None (बफर रहित)"
        },
        clinicalIndicationsHi: [
          "अत्यधिक उल्टी एवं ऊपरी जीआई रुकावट (Hypochloremic Metabolic Alkalosis - क्लोराइड की तीव्र पूर्ति)",
          "एडिसन संकट (Hypoadrenocorticism / Addisonian Crisis - गंभीर हाइपोनेट्रेमिया व हाइपरकेलेमिया सुधार)",
          "हाइपरकैल्सीमिया (कैल्शियम रहित होने के कारण वृक्क द्वारा कैल्शियम उत्सर्जन बढ़ाता है)",
          "रक्त आधान (Whole Blood / PRBCs) के साथ सुरक्षित रूप से उपयोग योग्य एकमात्र क्रिस्टलॉइड"
        ],
        contraindicationsHi: [
          "कन्जेस्टिव हार्ट फेल्योर या वृक्क विफलता (उच्च सोडियम व क्लोराइड भार से पल्मोनरी एडिमा का जोखिम)",
          "लंबे समय तक उच्च दर पर उपयोग से हाइपरक्लोरेमिक मेटाबोलिक एसिडोसिस (Hyperchloremic Acidosis) हो सकता है"
        ]
      },

      plasmalyteA: {
        nameEn: "Plasma-Lyte A / Normosol-R",
        nameHi: "प्लाज्मा-लाइट A / नॉर्मोसोल-R (संतुलित एसीटेट-ग्लूकोनेट घोल)",
        type: "Balanced Replacement Isotonic Crystalloid",
        tonicityInVivo: "Isotonic",
        osmolarityMOsmPerL: 294,
        compositionMEqPerL: {
          sodium: 140,
          potassium: 5,
          chloride: 98,
          calcium: 0,
          magnesium: 3,
          buffer: "Acetate 27 mEq/L + Gluconate 23 mEq/L"
        },
        clinicalIndicationsHi: [
          "यकृत विकार एवं तीव्र एसिडोसिस में सर्वश्रेष्ठ (एसीटेट मांसपेशियों व परिधीय ऊतकों में मेटाबोलाइज होता है, लिवर पर निर्भर नहीं)",
          "मधुमेह कीटोएसिडोसिस (DKA) एवं तीव्र पैन्क्रियाटाइटिस",
          "कैल्शियम रहित होने के कारण रक्त आधान के साथ पूर्णतः संगत"
        ],
        contraindicationsHi: [
          "गंभीर हाइपरकेलेमिया (K+ = 5 mEq/L) में सतर्कतापूर्वक उपयोग करें"
        ]
      },

      dextrose5Water: {
        nameEn: "5% Dextrose in Water (D5W)",
        nameHi: "5% डेक्सट्रोज जल (D5W - मुक्त जल प्रदाता)",
        type: "Hypotonic Crystalloid in vivo",
        tonicityInVivo: "Hypotonic (ग्लूकोज कोशिकाओं में जाने के पश्चात केवल शुद्ध जल शेष रहता है)",
        osmolarityMOsmPerL: 252,
        compositionMEqPerL: {
          sodium: 0,
          potassium: 0,
          chloride: 0,
          calcium: 0,
          magnesium: 0,
          buffer: "Dextrose 50 g/L (170 kcal/L)"
        },
        clinicalIndicationsHi: [
          "हाइपरनेट्रेमिया (Hypernatremia) में मुक्त जल (Free Water) की कमी की सुरक्षित पूर्ति",
          "हाइपोग्लाइसीमिया सुधार एवं इंसुलिन थेरेपी के साथ ग्लूकोज नियंत्रण"
        ],
        contraindicationsHi: [
          "हाइपोवोलेमिक शॉक रिससिटेशन में कदापि न दें (यह रक्त वाहिकाओं से तुरंत ऊतकों में चला जाता है; मस्तिष्क सूजन / सेरेब्रल एडिमा का जानलेवा जोखिम)"
        ]
      },

      dextroseNormalSaline: {
        nameEn: "Dextrose Normal Saline (DNS - 5% Dextrose + 0.9% NaCl)",
        nameHi: "डेक्सट्रोज नॉर्मल सेलाइन (डी.एन.एस. - 5% डेक्सट्रोज + 0.9% एनएसीएल)",
        type: "Hypertonic in container, Isotonic in vivo",
        osmolarityMOsmPerL: 560,
        compositionMEqPerL: {
          sodium: 154,
          potassium: 0,
          chloride: 154,
          calcium: 0,
          magnesium: 0,
          buffer: "Dextrose 50 g/L"
        },
        clinicalIndicationsHi: [
          "कैचेक्सिया, लंबे समय से भूखे पशुओं में ऊर्जा व सोडियम का एक साथ प्रतिस्थापन",
          "रूमिनेंट्स में कीटोसिस (Bovine Ketosis) एवं गर्भावस्था विषाक्तता (Pregnancy Toxemia)"
        ],
        contraindicationsHi: [
          "तीव्र निर्जलीकरण में अनियंत्रित रूप से देना (ऑस्मोटिक ड्यूरेसिस कर सकता है)"
        ]
      },

      hypertonicSaline72: {
        nameEn: "Hypertonic Saline 7.2% (7.2% NaCl)",
        nameHi: "हाइपरटॉनिक सेलाइन 7.2% (अति-सांद्रित सोडियम क्लोराइड)",
        type: "Rapid Plasma Volume Expander Crystalloid",
        tonicityInVivo: "Extremely Hypertonic (~8x normal plasma)",
        osmolarityMOsmPerL: 2464,
        compositionMEqPerL: {
          sodium: 1232,
          potassium: 0,
          chloride: 1232,
          calcium: 0,
          magnesium: 0,
          buffer: "None"
        },
        clinicalIndicationsHi: [
          "गंभीर रक्तस्रावी शॉक एवं गैस्ट्रिक डाइलेटेशन-वॉल्व्युलस (GDV - ब्लोट शॉक): 3-5 mL/kg IV 10-15 मिनट में देने से तुरंत इंटरस्टिशियल द्रव को रक्त वाहिकाओं में खींचकर रक्तचाप सामान्य करता है।",
          "सिर की चोट / सेरेब्रल एडिमा (Traumatic Brain Injury - TBI) में मस्तिष्क का इंट्राक्रेनियल प्रेशर (ICP) घटाने हेतु।"
        ],
        contraindicationsHi: [
          "निर्जलीकृत पशु (Dehydrated patient) - इसके पश्चात आइसोटोनिक तरल तुरंत देना अनिवार्य है!",
          "हाइपरनेट्रेमिया, फुफ्फुसीय शोथ (Pulmonary Edema), तथा अनियंत्रित सक्रिय आंतरिक रक्तस्राव।"
        ]
      },

      colloidsAndPlasma: {
        nameEn: "Fresh Frozen Plasma (FFP) & Synthetic Colloids (HES)",
        nameHi: "फ्रेश फ्रोजन प्लाज्मा (एफ.एफ.पी.) एवं सिंथेटिक कोलोइड्स",
        type: "Colloid / Blood Component",
        tonicityInVivo: "Iso-oncotic / Hyper-oncotic",
        osmolarityMOsmPerL: 300,
        compositionMEqPerL: {
          sodium: "Variable",
          potassium: "Variable",
          chloride: "Variable",
          calcium: "Variable",
          magnesium: "Variable",
          buffer: "Albumin + Coagulation Factors + Immunoglobulins"
        },
        criticalSafetyWarningHi: "सिंथेटिक कोलोइड्स (Hydroxyethyl Starch - HES / Voluven) चेतावनी: सेप्सिस व क्रिटिकल इलनेस में HES से एक्यूट किडनी इंजरी (AKI) एवं कोएगुलोपैथी का अत्यधिक जोखिम रहता है। अब प्राकृतिक प्लाज्मा (FFP) को प्राथमिकता दी जाती है।",
        clinicalIndicationsHi: [
          "हाइपोएल्ब्यूमिनेमिया (Serum Albumin < 1.5 g/dL) एवं गंभीर कोएंजाइमोपैथी / डी.आई.सी. (DIC)",
          "पार्वोवायरल एंटराइटिस व गंभीर प्रोटीन-लूजिंग एंटरोपैथी (PLE) में ऑन्कोटिक दबाव बनाए रखना",
          "वारफेरिन / चूहा मार विष विषाक्तता (Rodenticide toxicity) में थक्के जमाने वाले कारकों की तत्काल पूर्ति"
        ]
      }
    },

    // =========================================================================
    // 3. POTASSIUM REPLACEMENT SLIDING SCALE & CRITICAL SAFETY RULES
    // =========================================================================
    potassiumSlidingScale: [
      { minK: 3.51, maxK: 99.0, kclToAddMeqPerLiter: 20, guidanceHi: "सामान्य सीरम पोटेशियम; न्यूनतम मेंटेनेंस सप्लीमेंटेशन।" },
      { minK: 3.0, maxK: 3.5, kclToAddMeqPerLiter: 30, guidanceHi: "हल्का हाइपोकेलेमिया; 30 mEq KCl प्रति लीटर फ्लुइड में मिलाएं।" },
      { minK: 2.5, maxK: 2.99, kclToAddMeqPerLiter: 40, guidanceHi: "मध्यम हाइपोकेलेमिया; 40 mEq KCl प्रति लीटर मिलाएं।" },
      { minK: 2.0, maxK: 2.49, kclToAddMeqPerLiter: 60, guidanceHi: "गंभीर हाइपोकेलेमिया (गर्दन लटकना / Ventroflexion); 60 mEq KCl प्रति लीटर।" },
      { minK: 0.0, maxK: 1.99, kclToAddMeqPerLiter: 80, guidanceHi: "अति-गंभीर जानलेवा हाइपोकेलेमिया; 80 mEq KCl प्रति लीटर (सतत ECG निगरानी अनिवार्य)।" }
    ],

    fatalOverdoseCapRule: {
      maxSafeInfusionRateMeqPerKgPerHour: 0.5,
      warningHi: "घातक अधिमात्रा निषेध नियम (Fatal Overdose Rule): पोटेशियम इन्फ्यूजन दर किसी भी परिस्थिति में 0.5 mEq/kg/घंटे से अधिक नहीं होनी चाहिए! इससे अधिक दर देने पर अचानक वेंट्रिकुलर फिब्रिलेशन, हृदय गति रुकना ও तत्काल मृत्यु हो जाती है।"
    },

    /**
     * Calculates precision KCl spiking requirements and verifies safety against the 0.5 mEq/kg/hr ceiling.
     * @param {number} currentKLevel - Serum Potassium in mEq/L
     * @param {number} patientWeightKg - Patient weight in kg
     * @param {number} fluidRateMlPerHour - Current infusion rate in mL/hour
     */
    calculateKclAddition: function (currentKLevel, patientWeightKg, fluidRateMlPerHour) {
      const kVal = parseFloat(currentKLevel);
      const wt = parseFloat(patientWeightKg);
      const rate = parseFloat(fluidRateMlPerHour);

      if (isNaN(kVal) || kVal < 0.5 || kVal > 12) {
        return { error: "अमान्य सीरम पोटेशियम मान (Invalid Serum K+. Expected 0.5 - 12.0 mEq/L)." };
      }
      if (isNaN(wt) || wt <= 0) {
        return { error: "अमान्य शारीरिक वजन (Invalid Patient Weight)." };
      }
      if (isNaN(rate) || rate <= 0) {
        return { error: "अमान्य द्रव प्रवाह दर (Invalid Fluid Infusion Rate)." };
      }

      // Determine required KCl per liter
      let kclMeqPerLiterToAdd = 20;
      let clinicalInstructionHi = "";

      for (let i = 0; i < this.potassiumSlidingScale.length; i++) {
        const tier = this.potassiumSlidingScale[i];
        if (kVal >= tier.minK && kVal <= tier.maxK) {
          kclMeqPerLiterToAdd = tier.kclToAddMeqPerLiter;
          clinicalInstructionHi = tier.guidanceHi;
          break;
        }
      }

      // Actual potassium delivery rate calculation
      // Hourly K delivered (mEq/hr) = (Fluid Rate mL/hr / 1000) * kclMeqPerLiterToAdd
      const hourlyKDeliveredMeq = (rate / 1000.0) * kclMeqPerLiterToAdd;
      const deliveryRateMeqPerKgPerHour = hourlyKDeliveredMeq / wt;

      const safeCeiling = this.fatalOverdoseCapRule.maxSafeInfusionRateMeqPerKgPerHour;
      const isExceedingFatalCap = deliveryRateMeqPerKgPerHour > safeCeiling;

      // Maximum safe fluid rate for this spiked bag
      // Max Rate (mL/hr) = (0.5 mEq/kg/hr * Weight kg * 1000) / kclMeqPerLiterToAdd
      const maxPermissibleFluidRateMlPerHour = Math.floor((safeCeiling * wt * 1000.0) / kclMeqPerLiterToAdd);

      // Volume of 15% KCl injection (approx 2 mEq/mL)
      const kclLiquidVolumeMlPerLiter = Math.round((kclMeqPerLiterToAdd / 2.0) * 10) / 10;

      return {
        measuredSerumK: kVal,
        patientWeightKg: wt,
        prescribedFluidRateMlPerHour: rate,
        recommendedKclAdditionMeqPerLiter: kclMeqPerLiterToAdd,
        kclInjectableVolumeToSpikeMlPerLiterBag: kclLiquidVolumeMlPerLiter + " mL (using standard 2 mEq/mL KCl ampoules)",
        actualDeliveryRateMeqPerKgPerHour: Math.round(deliveryRateMeqPerKgPerHour * 1000) / 1000,
        safeCeilingLimitMeqPerKgPerHour: safeCeiling,
        isSafe: !isExceedingFatalCap,
        maxSafeFluidRateMlPerHour: maxPermissibleFluidRateMlPerHour,
        clinicalInstructionHi: clinicalInstructionHi,
        safetyStatusHi: isExceedingFatalCap
          ? "घातक अलर्ट (FATAL OVERDOSE WARNING): वर्तमान द्रव गति (" + rate + " mL/hr) पर पोटेशियम दर " + Math.round(deliveryRateMeqPerKgPerHour * 1000) / 1000 + " mEq/kg/hr हो जाएगी जो सुरक्षित सीमा (0.5) से अधिक है! द्रव की गति को तत्काल घटाकर अधिकतम " + maxPermissibleFluidRateMlPerHour + " mL/hr करें।"
          : "सुरक्षित प्रवाह (Infusion Rate within Safe Limits): पोटेशियम डिलीवरी दर 0.5 mEq/kg/hr के सुरक्षित स्तर के भीतर है।",
        mixingProtocolHi: "चेतावनी: बैग में KCl मिलाने के पश्चात बैग को कम से कम 5 बार उलट-पुलट कर अच्छी तरह मिलाएं (Invert and mix thoroughly) ताकि अत्यधिक सांद्रित पोटेशियम का अचानक बोलस न जाए।"
      };
    },

    // =========================================================================
    // 4. BICARBONATE & ACID-BASE IMBALANCE CALCULATOR
    // =========================================================================
    /**
     * Calculates Sodium Bicarbonate deficit and safe staged administration schedule.
     * Formula: Deficit (mEq) = Body Weight (kg) * Factor (0.3 adult, 0.5 neonate) * (Target HCO3 - Patient HCO3)
     * @param {number} patientWeightKg - Weight in kg
     * @param {number} currentHco3 - Measured HCO3 in mEq/L
     * @param {number} targetHco3 - Desired HCO3 (usually 18 to 22 mEq/L)
     * @param {boolean} isNeonate - Set true for calves, lambs, puppies < 4 weeks
     */
    calculateBicarbonateDeficit: function (patientWeightKg, currentHco3, targetHco3, isNeonate) {
      const wt = parseFloat(patientWeightKg);
      const cur = parseFloat(currentHco3);
      const tar = parseFloat(targetHco3) || 20.0;
      const neonate = !!isNeonate;

      if (isNaN(wt) || wt <= 0) {
        return { error: "अमान्य शारीरिक वजन (Invalid Patient Weight)." };
      }
      if (isNaN(cur) || cur < 1 || cur > 40) {
        return { error: "अमान्य सीरम बाइकार्बोनेट मान (Invalid current HCO3-)." };
      }

      if (cur >= tar) {
        return {
          deficitMeq: 0,
          noticeHi: "वर्तमान बाइकार्बोनेट स्तर (" + cur + " mEq/L) पहले से ही लक्ष्य स्तर (" + tar + " mEq/L) के बराबर या अधिक है। बाइकार्बोनेट की आवश्यकता नहीं है।"
        };
      }

      // Extracellular fluid distribution factor: 0.3 in adults, 0.5 in neonates
      const ecfFactor = neonate ? 0.5 : 0.3;
      const totalDeficitMeq = wt * ecfFactor * (tar - cur);

      // Golden Rule of Bicarbonate: Administer 1/3 to 1/2 of deficit over first 2-4 hours, then recheck!
      const initialPhaseMeq = Math.round((totalDeficitMeq * 0.5) * 10) / 10;
      const standard84PercentBicarbMl = Math.round((initialPhaseMeq / 1.0) * 10) / 10; // 8.4% Sodium Bicarbonate = 1 mEq/mL

      return {
        patientWeightKg: wt,
        currentHco3MeqPerL: cur,
        targetHco3MeqPerL: tar,
        isNeonate: neonate,
        ecfDistributionFactor: ecfFactor,
        totalCalculatedDeficitMeq: Math.round(totalDeficitMeq * 10) / 10,
        immediateDosingDirectives: {
          firstPhaseDoseMeq: initialPhaseMeq,
          volume8Point4PercentBicarbMl: standard84PercentBicarbMl + " mL (8.4% Sodium Bicarbonate IV)",
          infusionDuration: "2 से 4 घंटों में अत्यंत धीमी गति से (Slow IV infusion over 2-4 hours)",
          dilutionRuleHi: "8.4% बाइकार्बोनेट अत्यधिक हाइपरटॉनिक (2000 mOsm/L) होता है; इसे कम से कम 1:4 के अनुपात में स्टेराइल जल या D5W में मिलाकर आइसोटोनिक (1.3%) बनाकर ही शिरा में दें।"
        },
        cardinalSafetyWarningsHi: [
          "कदापि भी संपूर्ण डेफिसिट को तीव्र IV बोलस के रूप में न दें! तीव्र देने से मस्तिष्क में पैराडॉक्सिकल सेरेब्रल एसिडोसिस (Paradoxical CSF Acidosis), हाइपोकैल्सीमिया ও कार्डियक अरेस्ट हो सकता है।",
          "बाइकार्बोनेट को कभी भी कैल्शियम युक्त तरलों (जैसे Ringer's Lactate) में न मिलाएं; इससे कैल्शियम कार्बोनेट का अघुलनशील सफेद अवक्षेप (Chalky precipitate) बन जाता है।"
        ]
      };
    },

    /**
     * Diagnostic Acid-Base Decision Tree Engine.
     * Evaluates pH, pCO2, HCO3-, and calculates Anion Gap.
     * @param {number} ph - Blood pH (normal 7.35 - 7.45)
     * @param {number} pco2 - Arterial or Venous pCO2 in mmHg (normal 35 - 45)
     * @param {number} hco3 - Blood HCO3 in mEq/L (normal 20 - 24)
     * @param {number} sodium - Na+ in mEq/L (optional for Anion Gap)
     * @param {number} potassium - K+ in mEq/L (optional for Anion Gap)
     * @param {number} chloride - Cl- in mEq/L (optional for Anion Gap)
     */
    evaluateAcidBase: function (ph, pco2, hco3, sodium, potassium, chloride) {
      const vPh = parseFloat(ph);
      const vPco2 = parseFloat(pco2);
      const vHco3 = parseFloat(hco3);

      if (isNaN(vPh) || isNaN(vPco2) || isNaN(vHco3)) {
        return { error: "pH, pCO2 एवं HCO3- तीनों प्राचलों के मान अनिवार्य हैं।" };
      }

      // Primary disorder classification
      let disorderCode = "";
      let disorderNameEn = "";
      let disorderNameHi = "";
      let primaryMechanismHi = "";
      let compensatoryResponseHi = "";

      const isAcidemic = vPh < 7.35;
      const isAlkalemic = vPh > 7.45;
      const isNormalPh = !isAcidemic && !isAlkalemic;

      if (isAcidemic) {
        if (vHco3 < 20 && vPco2 <= 45) {
          disorderCode = "METABOLIC_ACIDOSIS";
          disorderNameEn = "Primary Metabolic Acidosis";
          disorderNameHi = "प्राथमिक मेटाबोलिक एसिडोसिस (उपापचयी अम्लरक्तता)";
          primaryMechanismHi = "बाइकार्बोनेट की अत्यधिक हानि (दस्त द्वारा) अथवा गैर-वाष्पशील अम्लों (Lactate, Ketoacids, Uremic toxins) का संचय।";
          compensatoryResponseHi = "श्वसन प्रतिपूर्ति (Respiratory Compensation): फेफड़े हाइपरवेंटिलेशन द्वारा CO2 को बाहर निकालते हैं (pCO2 सामान्य से कम होना चाहिए)।";
        } else if (vPco2 > 45 && vHco3 >= 20) {
          disorderCode = "RESPIRATORY_ACIDOSIS";
          disorderNameEn = "Primary Respiratory Acidosis";
          disorderNameHi = "प्राथमिक रेस्पिरेटरी एसिडोसिस (श्वसन अम्लरक्तता)";
          primaryMechanismHi = "हाइपोवेंटिलेशन (Hypoventilation) अथवा वायुमार्ग अवरोध के कारण CO2 का फेफड़ों में रुकना।";
          compensatoryResponseHi = "वृक्क प्रतिपूर्ति (Renal Compensation): वृक्क H+ उत्सर्जित कर अधिक HCO3- का पुनर्अवशोषण करते हैं।";
        } else {
          disorderCode = "MIXED_ACIDOSIS";
          disorderNameEn = "Mixed Metabolic & Respiratory Acidosis (Severe Crisis)";
          disorderNameHi = "मिश्रित मेटाबोलिक एवं रेस्पिरेटरी एसिडोसिस (अति-गंभीर आपातकाल)";
          primaryMechanismHi = "एक साथ दोनों प्रणालियों का पतन (उदा. कार्डियोपल्मोनरी अरेस्ट, सेप्टिक शॉक + श्वसन विफलता)।";
          compensatoryResponseHi = "शून्य प्रतिपूर्ति; तत्काल वेंटिलेशन एवं बफर सपोर्ट अनिवार्य।";
        }
      } else if (isAlkalemic) {
        if (vHco3 > 24 && vPco2 >= 35) {
          disorderCode = "METABOLIC_ALKALOSIS";
          disorderNameEn = "Primary Metabolic Alkalosis";
          disorderNameHi = "प्राथमिक मेटाबोलिक एल्केलोसिस (उपापचयी क्षाररक्तता)";
          primaryMechanismHi = "गैस्ट्रिक हाइड्रोक्लोरिक एसिड (HCl) की अत्यधिक हानि (उल्टी / एबोमेसल विस्थापन) अथवा डाइयूरेटिक दुरुपयोग।";
          compensatoryResponseHi = "श्वसन प्रतिपूर्ति: सांस की गति धीमी होना (Hypoventilation) ताकि CO2 संचित हो सके।";
        } else if (vPco2 < 35 && vHco3 <= 24) {
          disorderCode = "RESPIRATORY_ALKALOSIS";
          disorderNameEn = "Primary Respiratory Alkalosis";
          disorderNameHi = "प्राथमिक रेस्पिरेटरी एल्केलोसिस (श्वसन क्षाररक्तता)";
          primaryMechanismHi = "अत्यधिक हाइपरवेंटिलेशन (दर्द, भय, हाइपोक्सिमिया या हीट स्ट्रोक के कारण CO2 का अत्यधिक ह्रास)।";
          compensatoryResponseHi = "वृक्क प्रतिपूर्ति: मूत्र द्वारा बाइकार्बोनेट का उत्सर्जन बढ़ाना।";
        } else {
          disorderCode = "MIXED_ALKALOSIS";
          disorderNameEn = "Mixed Metabolic & Respiratory Alkalosis";
          disorderNameHi = "मिश्रित मेटाबोलिक एवं रेस्पिरेटरी क्षाररक्तता";
          primaryMechanismHi = "उल्टी के साथ-साथ तेज हांफना या दर्द।";
          compensatoryResponseHi = "जटिल मिश्रित विकार।";
        }
      } else {
        // Normal pH
        if (vHco3 < 20 && vPco2 < 35) {
          disorderCode = "COMPENSATED_METABOLIC_ACIDOSIS";
          disorderNameEn = "Fully Compensated Metabolic Acidosis";
          disorderNameHi = "पूर्णतः प्रतिपूरित मेटाबोलिक एसिडोसिस";
          primaryMechanismHi = "मेटाबोलिक एसिडोसिस को श्वसन तंत्र ने CO2 घटाकर सामान्य pH पर संतुलित कर दिया है।";
        } else if (vHco3 > 24 && vPco2 > 45) {
          disorderCode = "COMPENSATED_METABOLIC_ALKALOSIS";
          disorderNameEn = "Fully Compensated Metabolic Alkalosis";
          disorderNameHi = "पूर्णतः प्रतिपूरित मेटाबोलिक एल्केलोसिस";
          primaryMechanismHi = "क्षाररक्तता को श्वसन द्वारा CO2 रोककर सामान्य pH पर संतुलित किया गया है।";
        } else {
          disorderCode = "NORMAL_ACID_BASE";
          disorderNameEn = "Normal Acid-Base Homeostasis";
          disorderNameHi = "सामान्य अम्ल-क्षार संतुलन";
          primaryMechanismHi = "सभी प्राचल सामान्य शारीरिक सीमाओं में उपस्थित हैं।";
        }
      }

      // Anion Gap calculation if electrolytes provided
      // AG = (Na + K) - (Cl + HCO3) [or Na - (Cl + HCO3)]
      let anionGapValue = null;
      let anionGapInterpretationHi = "";

      const vNa = parseFloat(sodium);
      const vK = parseFloat(potassium);
      const vCl = parseFloat(chloride);

      if (!isNaN(vNa) && !isNaN(vCl)) {
        const kFactor = !isNaN(vK) ? vK : 0;
        anionGapValue = Math.round(((vNa + kFactor) - (vCl + vHco3)) * 10) / 10;

        // Normal AG range: 12 to 24 mEq/L
        if (anionGapValue > 25) {
          anionGapInterpretationHi = "उच्च एनियन गैप (High Anion Gap Acidosis - 'DUEL' Rule): डायबिटिक कीटोएसिडोसिस (DKA), यूरीमिया (Uremic renal failure), एथिलीन ग्लाइकोल विषाक्तता (Ethylene glycol), अथवा तीव्र लैक्टिक एसिडोसिस (L-Lactate / D-Lactate)।";
        } else if (anionGapValue < 12) {
          anionGapInterpretationHi = "निम्न एनियन गैप (Low Anion Gap): गंभीर हाइपोएल्ब्यूमिनेमिया (Hypoalbuminemia) अथवा हाइपोमैग्नेसीमिया।";
        } else {
          anionGapInterpretationHi = "सामान्य एनियन गैप (Normal AG / Hyperchloremic Acidosis): दस्त (Diarrhea) द्वारा आंतों से सीधे बाइकार्बोनेट का ह्रास अथवा रीनल ट्यूबलर एसिडोसिस (RTA)।";
        }
      }

      return {
        measuredPh: vPh,
        measuredPco2MmHg: vPco2,
        measuredHco3MeqPerL: vHco3,
        disorderClassificationCode: disorderCode,
        disorderNameEn: disorderNameEn,
        disorderNameHi: disorderNameHi,
        pathophysiologicMechanismHi: primaryMechanismHi,
        compensatoryResponseHi: compensatoryResponseHi,
        anionGapMeqPerL: anionGapValue,
        anionGapInterpretationHi: anionGapInterpretationHi
      };
    },

    // =========================================================================
    // 5. WHOLE BLOOD TRANSFUSION DOSING ENGINE
    // =========================================================================
    bloodVolumeFactorsMlPerKg: {
      canine: 90,
      feline: 60,
      equine: 80,
      bovine: 80,
      bubaline: 80,
      ovine: 70,
      caprine: 70
    },

    /**
     * Precision Whole Blood & Packed Red Blood Cells (PRBC) Transfusion Calculator.
     * Equation: Volume (mL) = Recipient Weight (kg) * Blood Volume Factor * (Target PCV - Recipient PCV) / Donor PCV
     * @param {string} species - "canine"|"feline"|"equine"|"bovine"|"caprine"
     * @param {number} recipientWeightKg - Recipient weight in kg
     * @param {number} recipientPcv - Current PCV / Hematocrit of patient (%)
     * @param {number} targetPcv - Desired safe post-transfusion PCV (%) (usually 25-30% in dogs, 20-25% in cats)
     * @param {number} donorPcv - Donor PCV (%) (default ~40% for dogs/cattle, ~35% for cats)
     */
    calculateTransfusion: function (species, recipientWeightKg, recipientPcv, targetPcv, donorPcv) {
      const sp = (species || "canine").toLowerCase();
      const wt = parseFloat(recipientWeightKg);
      const curPcv = parseFloat(recipientPcv);
      const tarPcv = parseFloat(targetPcv);
      const donPcv = parseFloat(donorPcv) || (sp === "feline" ? 35.0 : 40.0);

      if (isNaN(wt) || wt <= 0) {
        return { error: "अमान्य प्राप्तकर्ता वजन (Invalid Recipient Weight)." };
      }
      if (isNaN(curPcv) || curPcv < 1 || curPcv > 60) {
        return { error: "अमान्य वर्तमान पी.सी.वी. मान (Invalid Recipient PCV)." };
      }
      if (isNaN(tarPcv) || tarPcv <= curPcv) {
        return { error: "लक्ष्य पी.सी.वी. वर्तमान पी.सी.वी. से अधिक होना अनिवार्य है।" };
      }

      const bloodFactor = this.bloodVolumeFactorsMlPerKg[sp] || 80;

      // Exact Transfusion Mathematics
      const requiredWholeBloodVolumeMl = Math.round((wt * bloodFactor * ((tarPcv - curPcv) / donPcv)));

      // Packed RBCs requirement (if PRBCs are used instead of whole blood, roughly half the volume)
      const requiredPrbcVolumeMl = Math.round(requiredWholeBloodVolumeMl * 0.55);

      // Infusion Rate Protocol:
      // Initial 15-30 mins: 0.25 - 0.5 mL/kg/hr test rate
      const testRateMlPerHour = Math.round((wt * 0.5) * 10) / 10;
      // Remaining volume over remaining 3.5 hours
      const remainingVolumeMl = requiredWholeBloodVolumeMl - (testRateMlPerHour * 0.5);
      const maintenanceRateMlPerHour = Math.round((remainingVolumeMl / 3.5) * 10) / 10;

      return {
        species: sp,
        recipientWeightKg: wt,
        recipientCurrentPcv: curPcv + "%",
        targetPcvGoal: tarPcv + "%",
        donorPcv: donPcv + "%",
        bloodVolumeFactorUsed: bloodFactor + " mL/kg",
        requiredWholeBloodVolumeMl: requiredWholeBloodVolumeMl,
        equivalentPrbcVolumeMl: requiredPrbcVolumeMl,
        transfusionDeliveryTimeline: {
          step1TestPhase: "प्रारंभिक 15-30 मिनट: " + testRateMlPerHour + " mL/hr की धीमी गति से दें।",
          step2MainPhase: "प्रतिक्रिया न होने पर शेष द्रव को " + maintenanceRateMlPerHour + " mL/hr की गति से अगले 3.5 घंटों में पूर्ण करें।",
          maximumDurationRule: "महत्वपूर्ण: किसी भी एक ब्लड बैग का आधान 4 घंटे से अधिक न चलाएं (बैक्टीरियल संदूषण व सेप्सिस का गंभीर जोखिम)।"
        },
        equipmentAndFiltersHi: [
          "170 से 260 माइक्रोन का मानक रक्त आधान फिल्टर सेट (Blood Transfusion Filter Set) अनिवार्य है (माइक्रोथ्रोम्बी रोकने हेतु)।",
          "रक्त आधान के साथ केवल 0.9% Normal Saline ही दिया जा सकता है; कभी भी कैल्शियम युक्त द्रव (RL) न चलाएं।"
        ],
        reactionMonitoringAndManagementHi: [
          "निगरानी: आधान प्रारंभ करने से पूर्व, तथा उसके पश्चात प्रति 15 मिनट पर तापमान, हृदय गति, श्वसन गति व श्लेष्मा झिल्ली का रंग जांचें।",
          "हल्की एलर्जिक प्रतिक्रिया (पित्ती, खुजली, चेहरे पर सूजन): प्रवाह दर 50% घटाएं तथा Diphenhydramine 2 mg/kg IM दें।",
          "तीव्र हीमोलिटिक या एनाफिलेक्टिक संकट (बुखार, कंपकंपी, उल्टी, पतन): आधान तुरंत बंद करें! Dexamethasone SP 0.2-0.5 mg/kg IV + Epinephrine 1:1000 (0.01 mg/kg IM) दें।"
        ]
      };
    },

    // =========================================================================
    // 6. CLINICAL FLUID SELECTION ALGORITHM
    // =========================================================================
    /**
     * Determines optimal crystalloid formulation based on presenting clinical pathophysiology.
     */
    selectOptimalFluid: function (primaryCondition, serumNa, serumK, chloride, bloodPh) {
      const cond = (primaryCondition || "").toLowerCase();
      const na = parseFloat(serumNa);
      const k = parseFloat(serumK);
      const cl = parseFloat(chloride);
      const ph = parseFloat(bloodPh);

      let chosenFluidKey = "ringersLactate";
      let clinicalRationaleHi = "";
      let criticalCautionsHi = "";

      if (cond.includes("vomit") || cond.includes("abomasal") || cond.includes("pyloric") || (cl < 95 && ph > 7.45)) {
        chosenFluidKey = "normalSaline09";
        clinicalRationaleHi = "0.9% Normal Saline अनुशंसित है। उल्टी या एबोमेसल विस्थापन में अत्यधिक क्लोराइड का ह्रास होता है (Hypochloremic Alkalosis)। 0.9% NaCl में 154 mEq/L क्लोराइड होता है जो इसे तुरंत ठीक करता है।";
        criticalCautionsHi = "हाइपरक्लोरेमिया होने पर इसे बंद करके बैलेंस्ड सोल्यूशन पर आएं।";
      } else if (cond.includes("liver") || cond.includes("hepatic") || cond.includes("pancreatitis")) {
        chosenFluidKey = "plasmalyteA";
        clinicalRationaleHi = "Plasma-Lyte A / Normosol-R सर्वश्रेष्ठ है। यकृत विफलता में लैक्टेट मेटाबोलाइज नहीं हो पाता, जबकि प्लाज्मा-लाइट में उपस्थित एसीटेट व ग्लूकोनेट परिधीय मांसपेशियों में विघटित होकर सुरक्षित बफर प्रदान करते हैं।";
        criticalCautionsHi = "कैल्शियम स्तर की पृथक निगरानी रखें।";
      } else if (cond.includes("shock") && (cond.includes("gdv") || cond.includes("hemorrhage") || cond.includes("head_trauma"))) {
        chosenFluidKey = "hypertonicSaline72";
        clinicalRationaleHi = "Hypertonic Saline 7.2% (3-4 mL/kg bolus over 15 min) संकेतित है। यह तीव्र गति से इंट्रावास्कुलर वॉल्यूम बढ़ाता है और इंट्राक्रेनियल प्रेशर को घटाता है।";
        criticalCautionsHi = "तत्काल बाद आइसोटोनिक क्रिस्टलॉइड्स (RL / Plasmalyte) का पूर्ण पुनर्जलीकरण प्रोटोकॉल प्रारंभ करें।";
      } else if (cond.includes("hypernatremia") || cond.includes("water_deprivation")) {
        chosenFluidKey = "dextrose5Water";
        clinicalRationaleHi = "5% Dextrose in Water (D5W) मुक्त जल की कमी की सुरक्षित पूर्ति करता है बिना सोडियम सांद्रता बढ़ाए।";
        criticalCautionsHi = "तीव्र गति से न दें (सेरेब्रल एडिमा से बचाव हेतु सोडियम घटाने की गति < 0.5 mEq/L/घंटा होनी चाहिए)।";
      } else if (cond.includes("addison") || k > 6.0) {
        chosenFluidKey = "normalSaline09";
        clinicalRationaleHi = "0.9% Normal Saline में शून्य पोटेशियम होता है और उच्च सोडियम (154 mEq/L) होता है, जो एडिसोनियन संकट के गंभीर हाइपरकेलेमिया व हाइपोनेट्रेमिया को नियंत्रित करता है।";
        criticalCautionsHi = "पोटेशियम सामान्य होने पर बैलेंस्ड क्रिस्टलॉइड पर स्विच करें।";
      } else {
        chosenFluidKey = "ringersLactate";
        clinicalRationaleHi = "Ringer's Lactate (Hartmann's) सामान्य डिहाइड्रेशन, डायरिया एवं अधिकांश मेडिकल/सर्जिकल मामलों हेतु स्वर्ण-मानक आइसोटोनिक क्रिस्टलॉइड है।";
        criticalCautionsHi = "रक्त आधान के साथ एक ही कैथेटर लाइन में न चलाएं।";
      }

      const fluidData = this.fluidFormulations[chosenFluidKey];

      return {
        selectedFluidKey: chosenFluidKey,
        selectedFluidNameEn: fluidData.nameEn,
        selectedFluidNameHi: fluidData.nameHi,
        osmolarityMOsmPerL: fluidData.osmolarityMOsmPerL,
        clinicalRationaleHi: clinicalRationaleHi,
        criticalCautionsHi: criticalCautionsHi,
        compositionDetails: fluidData.compositionMEqPerL
      };
    }
  };

  // Seal namespace to protect critical resuscitation data integrity
  Object.freeze(window.VetcareApp.ClinicalData.FluidElectrolytes.fluidFormulations);
  Object.freeze(window.VetcareApp.ClinicalData.FluidElectrolytes.potassiumSlidingScale);
  Object.freeze(window.VetcareApp.ClinicalData.FluidElectrolytes.fatalOverdoseCapRule);
  Object.freeze(window.VetcareApp.ClinicalData.FluidElectrolytes.bloodVolumeFactorsMlPerKg);

  // Ready signal
  if (window.VetcareApp.showToast) {
    window.VetcareApp.showToast("फ्लुइड व इलेक्ट्रोलाइट थेरेपी मॉड्यूल सक्रिय (Fluid & Electrolytes Loaded)", "success");
  }
})();
