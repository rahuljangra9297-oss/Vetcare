// Vetcare AI OS - Veterinary Dentistry, Dentition Aging & Maxillofacial Operative Protocols (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE INITIALIZATION & ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  /**
   * Comparative Odontology, Clinical Veterinary Dentistry & Maxillofacial Surgery Subsystem
   * Certified under ISO-VET 2026 Clinical Informatics & AVDC (American Veterinary Dental College) Standards.
   */
  window.VetcareApp.ClinicalData.DentistryOralHealth = {
    metadata: {
      subsystem: "Dentistry & Maxillofacial Operative Protocols",
      version: "2026.4.1-PROD",
      isoVetStandard: "ISO-VET-DENT-2026",
      supportedTaxa: ["Bovine", "Bubaline", "Equine", "Canine", "Feline", "Caprine", "Ovine"],
      authoritativeSource: "Comparative Odontology & Veterinary Maxillofacial Surgery Clinical Matrix"
    },

    // =========================================================================
    // 2. DENTAL FORMULAS & MODIFIED TRIADAN MAPPING ENGINE
    // =========================================================================
    dentalFormulas: {
      bovine: {
        commonNameHi: "गाय / भैंस (गोवंश व महिषवंश)",
        deciduousFormula: "2 * (Di 0/4, Dc 0/0, Dp 3/3) = 20",
        permanentFormula: "2 * (I 0/4, C 0/0, P 3/3, M 3/3) = 32",
        triadanSpecialRules: [
          "ऊपरी जबड़े में अग्र दंत अनुपस्थित होते हैं; इनके स्थान पर कठोर फाइब्रोकार्टिलाजिनस 'डेंटल पैड' (Pulvinus dentalis) उपस्थित होता है।",
          "निचले जबड़े का चौथा इन्सीज़र (I4) वास्तव में इन्सीज़रीफॉर्म कैनाइन (Canine incisiform) होता है, जिसे ट्रायडन में 304 व 404 कोडित किया जाता है।",
          "प्रीमोलर हमेशा P2, P3, P4 होते हैं (Triadan 06, 07, 08); P1 (05) पूर्णतः अनुपस्थित रहता है।"
        ],
        upperArchMaxTeeth: 6,
        lowerArchMaxTeeth: 10,
        carnassialTeeth: null,
        wolfTeeth: null,
        triadanMap: {
          quadrant100: [106, 107, 108, 109, 110, 111],
          quadrant200: [206, 207, 208, 209, 210, 211],
          quadrant300: [301, 302, 303, 304, 306, 307, 308, 309, 310, 311],
          quadrant400: [401, 402, 403, 404, 406, 407, 408, 409, 410, 411]
        }
      },
      equine: {
        commonNameHi: "अश्व (घोड़ा)",
        deciduousFormula: "2 * (Di 3/3, Dc 0/0, Dp 3/3) = 24",
        permanentFormulaMale: "2 * (I 3/3, C 1/1, P 3-4/3, M 3/3) = 40-42",
        permanentFormulaFemale: "2 * (I 3/3, C 0/0 [or vestigial], P 3-4/3, M 3/3) = 36-40",
        triadanSpecialRules: [
          "वुल्फ टूथ (Wolf tooth) पहला मैक्सिलरी प्रीमोलर (P1) होता है: 105 या 205 (निचले जबड़े 305/405 में अत्यंत दुर्लभ)।",
          "कैनाइन दांत (Tushes / Bridle teeth: 104, 204, 304, 404) नरों में 4-5 वर्ष पर आते हैं, मादाओं में सामान्यतः अविकसित या अनुपस्थित रहते हैं।",
          "अश्व दंत हाइप्सोडॉन्ट (Hypsodont) होते हैं, जो जीवन भर 2-3 मिमी/वर्ष की दर से निरंतर घिसते व बाहर निकलते (erupt) रहते हैं।"
        ],
        upperArchMaxTeeth: 11,
        lowerArchMaxTeeth: 11,
        carnassialTeeth: null,
        wolfTeeth: [105, 205],
        triadanMap: {
          quadrant100: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111],
          quadrant200: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211],
          quadrant300: [301, 302, 303, 304, 306, 307, 308, 309, 310, 311],
          quadrant400: [401, 402, 403, 404, 406, 407, 408, 409, 410, 411]
        }
      },
      canine: {
        commonNameHi: "श्वान (कुत्ता)",
        deciduousFormula: "2 * (Di 3/3, Dc 1/1, Dp 3/3) = 28",
        permanentFormula: "2 * (I 3/3, C 1/1, P 4/4, M 2/3) = 42",
        triadanSpecialRules: [
          "मांसाहारी कर्तन दंत (Carnassial / Sectorial teeth): मैक्सिलरी चौथा प्रीमोलर (108, 208) एवं मैंडिबुलर पहला मोलर (309, 409)।",
          "रूल ऑफ 4 एंड 9: कैनाइन हमेशा 04 पर समाप्त होता है, तथा पहला मोलर हमेशा 09 पर समाप्त होता है।",
          "शिशु दांतों (Deciduous) में मोलर्स अनुपस्थित होते हैं (Dp 3/3 = Triadan 06, 07, 08)।"
        ],
        upperArchMaxTeeth: 10,
        lowerArchMaxTeeth: 11,
        carnassialTeeth: [108, 208, 309, 409],
        wolfTeeth: null,
        triadanMap: {
          quadrant100: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
          quadrant200: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210],
          quadrant300: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311],
          quadrant400: [401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411]
        }
      },
      feline: {
        commonNameHi: "मार्जार (बिल्ली)",
        deciduousFormula: "2 * (Di 3/3, Dc 1/1, Dp 3/2) = 26",
        permanentFormula: "2 * (I 3/3, C 1/1, P 3/2, M 1/1) = 30",
        triadanSpecialRules: [
          "मार्जार में दांतों की कमी का विशेष विन्यास: मैक्सिला में P1 (105, 205) अनुपस्थित होता है।",
          "मैंडिबल में P1 और P2 अनुपस्थित होते हैं; सीधे P3 (307, 407) और P4 (308, 408) उपस्थित होते हैं।",
          "कर्तन दंत (Carnassials): मैक्सिलरी चौथा प्रीमोलर (108, 208) और मैंडिबुलर पहला मोलर (309, 409)।",
          "मोलर्स: केवल एक-एक (109, 209, 309, 409)।"
        ],
        upperArchMaxTeeth: 8,
        lowerArchMaxTeeth: 7,
        carnassialTeeth: [108, 208, 309, 409],
        wolfTeeth: null,
        triadanMap: {
          quadrant100: [101, 102, 103, 104, 106, 107, 108, 109],
          quadrant200: [201, 202, 203, 204, 206, 207, 208, 209],
          quadrant300: [301, 302, 303, 304, 307, 308, 309],
          quadrant400: [401, 402, 403, 404, 407, 408, 409]
        }
      }
    },

    // =========================================================================
    // 3. UTILITY METHODS: TRIADAN DECODER & STAGING
    // =========================================================================
    /**
     * Decodes any 3-digit Modified Triadan dental number into detailed anatomical structures.
     * @param {number|string} triadanNumber - Example: 108, 309, 504
     */
    getTriadanDetails: function (triadanNumber) {
      const num = parseInt(triadanNumber, 10);
      if (isNaN(num) || num < 101 || num > 811) {
        return {
          valid: false,
          error: "अमान्य ट्रायडन संख्या (Invalid Triadan Code). Range must be 101-811."
        };
      }

      const quadrantDigit = Math.floor(num / 100);
      const toothPosition = num % 100;

      const isPermanent = quadrantDigit >= 1 && quadrantDigit <= 4;
      const isDeciduous = quadrantDigit >= 5 && quadrantDigit <= 8;

      let quadrantNameEn = "";
      let quadrantNameHi = "";
      let jawEn = "";
      let jawHi = "";
      let sideEn = "";
      let sideHi = "";

      switch (quadrantDigit) {
        case 1:
        case 5:
          quadrantNameEn = isPermanent ? "Right Maxilla (Permanent)" : "Right Maxilla (Deciduous)";
          quadrantNameHi = isPermanent ? "दायां ऊपरी जबड़ा (स्थायी)" : "दायां ऊपरी जबड़ा (दूधिया)";
          jawEn = "Maxilla";
          jawHi = "ऊपरी जबड़ा";
          sideEn = "Right";
          sideHi = "दायां";
          break;
        case 2:
        case 6:
          quadrantNameEn = isPermanent ? "Left Maxilla (Permanent)" : "Left Maxilla (Deciduous)";
          quadrantNameHi = isPermanent ? "बायां ऊपरी जबड़ा (स्थायी)" : "बायां ऊपरी जबड़ा (दूधिया)";
          jawEn = "Maxilla";
          jawHi = "ऊपरी जबड़ा";
          sideEn = "Left";
          sideHi = "बायां";
          break;
        case 3:
        case 7:
          quadrantNameEn = isPermanent ? "Left Mandible (Permanent)" : "Left Mandible (Deciduous)";
          quadrantNameHi = isPermanent ? "बायां निचला जबड़ा (स्थायी)" : "बायां निचला जबड़ा (दूधिया)";
          jawEn = "Mandible";
          jawHi = "निचला जबड़ा";
          sideEn = "Left";
          sideHi = "बायां";
          break;
        case 4:
        case 8:
          quadrantNameEn = isPermanent ? "Right Mandible (Permanent)" : "Right Mandible (Deciduous)";
          quadrantNameHi = isPermanent ? "दायां निचला जबड़ा (स्थायी)" : "दायां निचला जबड़ा (दूधिया)";
          jawEn = "Mandible";
          jawHi = "निचला जबड़ा";
          sideEn = "Right";
          sideHi = "दायां";
          break;
        default:
          return { valid: false, error: "अमान्य क्वाड्रेंट अंक (Invalid quadrant)." };
      }

      let toothTypeEn = "";
      let toothTypeHi = "";
      let anatomicalRole = "";

      if (toothPosition >= 1 && toothPosition <= 3) {
        toothTypeEn = "Incisor " + toothPosition;
        toothTypeHi = "कर्तक दंत (Incisor) " + toothPosition;
        anatomicalRole = "Grasping, nibbling, prehension and shearing food.";
      } else if (toothPosition === 4) {
        toothTypeEn = "Canine";
        toothTypeHi = "रदनक दंत (Canine)";
        anatomicalRole = "Holding prey, tearing flesh, behavioral display; in ruminants acts as incisiform I4.";
      } else if (toothPosition >= 5 && toothPosition <= 8) {
        const pNum = toothPosition - 4;
        toothTypeEn = "Premolar " + pNum;
        toothTypeHi = "अग्रचर्वणक (Premolar) " + pNum;
        if (toothPosition === 5) {
          anatomicalRole = "Vestigial in equine (Wolf tooth); absent in felines.";
        } else if (toothPosition === 8 && (quadrantDigit === 1 || quadrantDigit === 2)) {
          anatomicalRole = "Carnassial tooth in carnivores (Maxillary P4) - massive shearing action.";
        } else {
          anatomicalRole = "Crushing, shearing, holding food boli.";
        }
      } else if (toothPosition >= 9 && toothPosition <= 11) {
        const mNum = toothPosition - 8;
        toothTypeEn = "Molar " + mNum;
        toothTypeHi = "चर्वणक (Molar) " + mNum;
        if (toothPosition === 9 && (quadrantDigit === 3 || quadrantDigit === 4)) {
          anatomicalRole = "Carnassial tooth in carnivores (Mandibular M1) - powerful occlusion with 108/208.";
        } else {
          anatomicalRole = "Heavy grinding, comminution of coarse roughages and grains.";
        }
      } else {
        toothTypeEn = "Anomalous Tooth Position (" + toothPosition + ")";
        toothTypeHi = "असामान्य दंत स्थान (" + toothPosition + ")";
        anatomicalRole = "Supernumerary or unclassified position.";
      }

      return {
        valid: true,
        triadanNumber: num,
        isPermanent: isPermanent,
        isDeciduous: isDeciduous,
        dentitionType: isPermanent ? "Permanent" : "Deciduous (Milk / Dentes Decidui)",
        quadrantDigit: quadrantDigit,
        toothPosition: toothPosition,
        jaw: jawEn,
        jawHi: jawHi,
        side: sideEn,
        sideHi: sideHi,
        quadrantDescriptionEn: quadrantNameEn,
        quadrantDescriptionHi: quadrantNameHi,
        toothTypeEn: toothTypeEn,
        toothTypeHi: toothTypeHi,
        anatomicalRole: anatomicalRole,
        isCarnassial: [108, 208, 309, 409].includes(num),
        isWolfTooth: [105, 205].includes(num),
        isCanineOrRuminantIncisiformCanine: [104, 204, 304, 404].includes(num)
      };
    },

    // =========================================================================
    // 4. DENTITION AGE ESTIMATION ALGORITHMIC CALCULATOR
    // =========================================================================
    /**
     * Determines animal biological age based on anatomical dentition examination findings.
     * @param {string} species - "bovine"|"bubaline"|"equine"|"canine"|"feline"
     * @param {object} dentalExamFindings - Comprehensive clinical eruption & wear markers
     */
    estimateAgeByDentition: function (species, dentalExamFindings) {
      const sp = (species || "").toLowerCase();
      const findings = dentalExamFindings || {};

      let estimatedAgeYears = 0;
      let confidenceRange = "";
      let developmentalStage = "";
      const visualLandmarksHi = [];
      const clinicalNotes = [];

      if (sp === "bovine" || sp === "bubaline") {
        const permanentIncisorPairs = parseInt(findings.permanentIncisorPairs, 10) || 0;
        const wearStage = (findings.wearStage || "").toLowerCase(); // "none", "i1_leveled", "i2_leveled", "i3_leveled", "i4_leveled", "stars_present", "peg_teeth", "broken_mouth"
        const hasMilkTeethOnly = !!findings.milkTeethOnly;

        if (hasMilkTeethOnly || permanentIncisorPairs === 0) {
          const milkTeethSpread = findings.milkTeethSpread || "erupted"; // "erupting", "fully_in_wear", "spaced"
          if (milkTeethSpread === "erupting") {
            estimatedAgeYears = 0.08; // ~1 month
            confidenceRange = "0 से 2 माह (0 - 2 Months)";
            developmentalStage = "शिशु नवजात बछड़ा / नवजात पड्डा (Neonate / Early Nursing)";
            visualLandmarksHi.push("अस्थायी दूधिया इन्सीज़र्स जन्म के समय उपस्थित या 2-4 सप्ताह में बाहर आ जाते हैं।");
          } else if (milkTeethSpread === "spaced") {
            estimatedAgeYears = 1.25;
            confidenceRange = "12 से 18 माह (1 - 1.5 Years)";
            developmentalStage = "कनिष्ठ हीफर / कटिया (Yearling / Pre-pubertal)";
            visualLandmarksHi.push("दूधिया दांत घिस चुके हैं तथा जबड़े के आकार बढ़ने से उनके मध्य अंतर (spaces) स्पष्ट है।");
          } else {
            estimatedAgeYears = 0.5;
            confidenceRange = "3 से 10 माह (3 - 10 Months)";
            developmentalStage = "दूध पीता बछड़ा (Weaning Calf)";
            visualLandmarksHi.push("सभी 8 दूधिया इन्सीज़र पूर्ण रूप से निकले हुए एवं सुव्यवस्थित हैं।");
          }
        } else if (permanentIncisorPairs === 1) {
          // Central incisors (I1: 301/401) erupted
          estimatedAgeYears = 2.2;
          confidenceRange = "2.0 से 2.5 वर्ष (2 - 2.5 Years) - 2 Permanent Teeth";
          developmentalStage = "दो-दांत अवस्था (First Pair Permanent Incisors / Do-Daant)";
          visualLandmarksHi.push("केंद्रीय स्थायी इन्सीज़र जोड़ी (I1) पूर्ण निकली हुई; शेष 6 दांत छोटे दूधिया हैं।");
          clinicalNotes.push("प्रथम ब्यात हेतु उपयुक्त प्रजनन योग्य आयु का प्रारंभिक चरण।");
        } else if (permanentIncisorPairs === 2) {
          // Middle incisors (I2: 302/402) erupted
          estimatedAgeYears = 3.0;
          confidenceRange = "2.5 से 3.2 वर्ष (2.5 - 3.2 Years) - 4 Permanent Teeth";
          developmentalStage = "चार-दांत अवस्था (Second Pair Permanent Incisors / Chaar-Daant)";
          visualLandmarksHi.push("मध्यवर्ती स्थायी इन्सीज़र जोड़ी (I2) निकली हुई; कुल 4 बड़े स्थायी दांत।");
          clinicalNotes.push("प्रथम से द्वितीय लैक्टेशन का संक्रमण काल।");
        } else if (permanentIncisorPairs === 3) {
          // Lateral incisors (I3: 303/403) erupted
          estimatedAgeYears = 3.7;
          confidenceRange = "3.5 से 4.0 वर्ष (3.5 - 4.0 Years) - 6 Permanent Teeth";
          developmentalStage = "छह-दांत अवस्था (Third Pair Permanent Incisors / Chhe-Daant)";
          visualLandmarksHi.push("पार्श्व स्थायी इन्सीज़र जोड़ी (I3) उपस्थित; कुल 6 स्थायी चौड़े दांत।");
          clinicalNotes.push("उत्कृष्ट दुग्ध उत्पादकता एवं पूर्ण शारीरिक प्रौढ़ता।");
        } else if (permanentIncisorPairs >= 4) {
          // Corner incisors (I4: 304/404) erupted - Full mouth
          if (wearStage === "broken_mouth" || wearStage === "peg_teeth") {
            estimatedAgeYears = 11.5;
            confidenceRange = "10.0 से 14.0+ वर्ष (Geriatric / Broken Mouth)";
            developmentalStage = "अति-वृद्ध पशु / टूटा मुख (Broken Mouth / Tooth Loss / Peg Teeth)";
            visualLandmarksHi.push("दांत मसूड़ों तक घिस चुके हैं या गिर चुके हैं; चबाने में असमर्थता (Cud dropping)।");
            clinicalNotes.push("नरम पौष्टिक सानी, साइलेज व दलिया आहार आवश्यक; फ्लोरोसिस या उम्र-संबंधी एट्रिशन।");
          } else if (wearStage === "stars_present" || wearStage === "i4_leveled") {
            estimatedAgeYears = 9.0;
            confidenceRange = "8.5 से 10.0 वर्ष (Full Wear / Dental Stars All Teeth)";
            developmentalStage = "प्रौढ़-वृद्ध अवस्था (Advanced Wear on All Incisors)";
            visualLandmarksHi.push("सभी 8 इन्सीज़र्स पर डार्क डेंटाइन स्टार्स (Dental Stars) स्पष्ट व सपाट हो चुके हैं।");
          } else if (wearStage === "i3_leveled") {
            estimatedAgeYears = 8.0;
            confidenceRange = "7.5 से 8.5 वर्ष (I1, I2, I3 Leveled)";
            developmentalStage = "प्रौढ़ अवस्था (Lateral Incisors Leveled)";
            visualLandmarksHi.push("I1, I2 एवं I3 की घिसाई पूर्णतः समतल हो चुकी है।");
          } else if (wearStage === "i2_leveled") {
            estimatedAgeYears = 7.0;
            confidenceRange = "6.5 से 7.5 वर्ष (I1, I2 Leveled)";
            developmentalStage = "पूर्ण विकसित वयस्क (Middle Incisors Leveled)";
            visualLandmarksHi.push("I1 व I2 दोनों जोड़ियों की ऊपरी सतह समतल (leveled) हो चुकी है।");
          } else if (wearStage === "i1_leveled") {
            estimatedAgeYears = 6.0;
            confidenceRange = "5.5 से 6.5 वर्ष (Central Incisors Leveled)";
            developmentalStage = "पूर्ण विकसित वयस्क (Central Incisors Leveled)";
            visualLandmarksHi.push("केंद्रीय इन्सीज़र (I1) की ऊपरी सतह समतल हो चुकी है।");
          } else {
            estimatedAgeYears = 4.8;
            confidenceRange = "4.5 से 5.5 वर्ष (Full Mouth / 8 Permanent Incisors)";
            developmentalStage = "पूर्ण मुख अवस्था (Full Mouth / Aath-Daant / All 8 Teeth in Wear)";
            visualLandmarksHi.push("कोने के दांत (I4) निकलकर जबड़ा पूर्ण 8 स्थायी दांतों से युक्त हो चुका है।");
          }
        }
      } else if (sp === "equine") {
        const galvayneStatus = (findings.galvayneGroove || "absent").toLowerCase();
        const cupsDisappearedLower = findings.cupsDisappearedLower || []; // array of 1, 2, 3
        const permIncisorErupted = parseInt(findings.permIncisorErupted, 10) || 0;

        if (galvayneStatus === "disappeared" || galvayneStatus === "gone_past_30") {
          estimatedAgeYears = 30.0;
          confidenceRange = "29.0 से 32.0 वर्ष (Extreme Geriatric Equine)";
          developmentalStage = "अति-वृद्ध अश्व (Geriatric Horse)";
          visualLandmarksHi.push("गैल्वेन्स ग्रूव ऊपरी कॉर्नर इन्सीज़र (103/203) से पूर्णतः गायब हो चुकी है।");
        } else if (galvayneStatus === "lower_half_only") {
          estimatedAgeYears = 25.0;
          confidenceRange = "24.0 से 26.5 वर्ष";
          developmentalStage = "वृद्ध अश्व (Late Senior)";
          visualLandmarksHi.push("गैल्वेन्स ग्रूव ऊपरी आधे भाग से गायब होकर केवल निचले आधे भाग में शेष है।");
        } else if (galvayneStatus === "full_length") {
          estimatedAgeYears = 20.0;
          confidenceRange = "19.0 से 21.5 वर्ष";
          developmentalStage = "वरिष्ठ अश्व (Senior Equine / Full Length Galvayne's Groove)";
          visualLandmarksHi.push("गैल्वेन्स ग्रूव मसूड़े से लेकर दांत के निचले किनारे तक पूरी लंबाई में उपस्थित है।");
        } else if (galvayneStatus === "halfway_down") {
          estimatedAgeYears = 15.0;
          confidenceRange = "14.0 से 16.5 वर्ष";
          developmentalStage = "मध्यम-वयस्क अश्व (Mid-life Equine)";
          visualLandmarksHi.push("गैल्वेन्स ग्रूव ऊपरी कॉर्नर इन्सीज़र के ठीक आधे भाग तक नीचे आ चुकी है।");
        } else if (galvayneStatus === "appears_gumline") {
          estimatedAgeYears = 10.0;
          confidenceRange = "9.5 से 11.0 वर्ष";
          developmentalStage = "वयस्क अश्व (Appearance of Galvayne's Groove at Gum Margin)";
          visualLandmarksHi.push("ऊपरी कॉर्नर इन्सीज़र (103/203) की मसूड़ा रेखा पर गैल्वेन्स ग्रूव का प्रादुर्भाव।");
        } else if (cupsDisappearedLower.includes(3)) {
          estimatedAgeYears = 8.0;
          confidenceRange = "7.5 से 8.5 वर्ष (Cup Gone Lower I3)";
          developmentalStage = "वयस्क अश्व (Smooth Mouth Lower Arcades / 8yr Cup Mark)";
          visualLandmarksHi.push("निचले तीसरे इन्सीज़र (303/403) का इन्फंडिबुलर कप समाप्त हो चुका है।");
        } else if (cupsDisappearedLower.includes(2)) {
          estimatedAgeYears = 7.0;
          confidenceRange = "6.5 से 7.5 वर्ष (Cup Gone Lower I2)";
          developmentalStage = "वयस्क अश्व (Lower Intermediate Cup Gone)";
          visualLandmarksHi.push("निचले दूसरे इन्सीज़र (302/402) का कप गायब हो चुका है।");
        } else if (cupsDisappearedLower.includes(1)) {
          estimatedAgeYears = 6.0;
          confidenceRange = "5.5 से 6.5 वर्ष (Cup Gone Lower I1)";
          developmentalStage = "वयस्क अश्व (Lower Central Cup Gone)";
          visualLandmarksHi.push("निचले केंद्रीय इन्सीज़र (301/401) का कप समाप्त हो चुका है।");
        } else if (permIncisorErupted === 3) {
          estimatedAgeYears = 4.5;
          confidenceRange = "4.2 से 4.8 वर्ष (Corner Incisor Eruption)";
          developmentalStage = "युवा वयस्क अश्व (Corner Permanent Incisors Erupting)";
          visualLandmarksHi.push("तीसरे स्थायी इन्सीज़र (I3) का उदभेदन; नरों में कैनाइन दांत (Tushes) निकलना प्रारंभ।");
        } else if (permIncisorErupted === 2) {
          estimatedAgeYears = 3.5;
          confidenceRange = "3.2 से 3.8 वर्ष (Intermediate Incisor Eruption)";
          developmentalStage = "बछेड़ा / बछेड़ी (Intermediate Permanent Incisors Erupting)";
          visualLandmarksHi.push("मध्यवर्ती स्थायी इन्सीज़र (I2) का उदभेदन।");
        } else if (permIncisorErupted === 1) {
          estimatedAgeYears = 2.5;
          confidenceRange = "2.2 से 2.8 वर्ष (Central Incisor Eruption)";
          developmentalStage = "बछेड़ा (Colt/Filly First Permanent Incisors)";
          visualLandmarksHi.push("केंद्रीय स्थायी इन्सीज़र (I1) का उदभेदन।");
        } else {
          estimatedAgeYears = 1.0;
          confidenceRange = "0.5 से 1.8 वर्ष";
          developmentalStage = "दूधिया दांत युक्त बछेड़ा (Foal with Deciduous Dentition)";
          visualLandmarksHi.push("नियम 8 (Rule of 8s): 8 दिन पर I1, 8 सप्ताह पर I2, 8 माह पर I3 दूधिया दांत।");
        }
      } else if (sp === "canine" || sp === "feline") {
        const permanentCaninesPresent = !!findings.permanentCaninesPresent;
        const permanentIncisorsPresent = !!findings.permanentIncisorsPresent;
        const permanentMolarsPresent = !!findings.permanentMolarsPresent;
        const adultWearPattern = findings.adultWearPattern || "none"; // "cusp_wear_lower_i1", "cusp_wear_lower_i2", "cusp_wear_upper_i1", "blunted_canines", "periodontitis_loss"

        if (!permanentIncisorsPresent && !permanentCaninesPresent) {
          estimatedAgeYears = 0.15; // ~8 weeks
          confidenceRange = "4 से 12 सप्ताह (1 - 3 Months)";
          developmentalStage = "शिशु पिल्ला / बिल्ली का बच्चा (Puppy/Kitten Deciduous Stage)";
          visualLandmarksHi.push("तीक्ष्ण दूधिया सुई जैसे दांत (Deciduous needle teeth) उपस्थित।");
        } else if (permanentIncisorsPresent && !permanentCaninesPresent) {
          estimatedAgeYears = 0.35; // ~4.5 months
          confidenceRange = "3.5 से 5 माह (3.5 - 5 Months)";
          developmentalStage = "दंत संक्रमण काल (Mixed Dentition Phase)";
          visualLandmarksHi.push("स्थायी इन्सीज़र्स निकल रहे हैं; दूधिया कैनाइन अभी भी उपस्थित हैं।");
        } else if (permanentCaninesPresent && !permanentMolarsPresent) {
          estimatedAgeYears = 0.45; // ~5.5 months
          confidenceRange = "5 से 6 माह (5 - 6 Months)";
          developmentalStage = "किशोरावस्था (Canines Erupted, Premolars/Molars Completing)";
          visualLandmarksHi.push("स्थायी रदनक (Canines) निकल चुके हैं; कार्नेशियल दांत विकसित हो रहे हैं।");
        } else {
          // Full permanent dentition present
          if (adultWearPattern === "blunted_canines" || adultWearPattern === "periodontitis_loss") {
            estimatedAgeYears = 8.5;
            confidenceRange = "7.0 से 11.0 वर्ष (Geriatric Companion Animal)";
            developmentalStage = "वरिष्ठ पेट (Senior Pet / Heavy Wear / Calculus)";
            visualLandmarksHi.push("कैनाइन घिसकर चपटे हो चुके हैं; भारी टार्टर, मसूड़ों का ढीलापन व दांतों का गिरना।");
          } else if (adultWearPattern === "cusp_wear_upper_i1") {
            estimatedAgeYears = 4.0;
            confidenceRange = "3.5 से 5.0 वर्ष";
            developmentalStage = "प्रौढ़ पेट (Adult Pet - Upper Incisor Cusp Wear)";
            visualLandmarksHi.push("ऊपरी केंद्रीय इन्सीज़र्स (101/201) के कस्प्स घिस चुके हैं।");
          } else if (adultWearPattern === "cusp_wear_lower_i2") {
            estimatedAgeYears = 2.5;
            confidenceRange = "2.0 से 3.0 वर्ष";
            developmentalStage = "युवा वयस्क (Young Adult - Lower I2 Wear)";
            visualLandmarksHi.push("निचले दूसरे इन्सीज़र्स (302/402) के कस्प्स घिस चुके हैं।");
          } else if (adultWearPattern === "cusp_wear_lower_i1") {
            estimatedAgeYears = 1.5;
            confidenceRange = "1.2 से 2.0 वर्ष";
            developmentalStage = "युवा वयस्क (Young Adult - Lower I1 Wear)";
            visualLandmarksHi.push("निचले केंद्रीय इन्सीज़र्स (301/401) के कस्प्स की नोक घिस चुकी है।");
          } else {
            estimatedAgeYears = 0.8;
            confidenceRange = "7 से 12 माह (7 - 12 Months)";
            developmentalStage = "युवा पेट (Young Dog/Cat - Clean White Dentition)";
            visualLandmarksHi.push("सभी 42 (श्वान) या 30 (मार्जार) स्थायी दांत पूर्णतः सफेद, चमकदार व बिना टार्टर के उपस्थित।");
          }
        }
      } else {
        return {
          error: "असमर्थित प्रजाति (Unsupported Species). Use 'bovine', 'bubaline', 'equine', 'canine', or 'feline'."
        };
      }

      return {
        species: sp,
        estimatedAgeYears: Math.round(estimatedAgeYears * 10) / 10,
        confidenceRange: confidenceRange,
        developmentalStage: developmentalStage,
        visualLandmarksHi: visualLandmarksHi,
        clinicalNotes: clinicalNotes
      };
    },

    // =========================================================================
    // 5. MAXILLOFACIAL DENTAL NERVE BLOCKS
    // =========================================================================
    nerveBlocks: {
      infraorbital: {
        nameEn: "Infraorbital Nerve Block (Rostral Maxillary)",
        nameHi: "इन्फ्राऑर्बिटल तंत्रिका ब्लॉक (अग्र मैक्सिलरी)",
        anatomicalLandmarks: "इन्फ्राऑर्बिटल फोरामेन (Infraorbital foramen) - श्वान/मार्जार में तीसरे मैक्सिलरी प्रीमोलर (107/207) के ठीक डोर्सल; अश्व में नासिका-अश्रु खांच (nasolacrimal notch) और जाइगोमैटिक रिज के मध्य रेखा पर स्थित।",
        structuresDesensitized: "संबंधित तरफ के मैक्सिलरी इन्सीज़र्स, कैनाइन, प्रीमोलर्स 1-3 (Triadan 01-07), ऊपरी ओंठ, नाक का अग्र भाग व संबंधित मसूड़ा।",
        needleSpecification: {
          canineSmallFeline: "27G to 25G, 0.5 to 1.0 inch needle",
          canineLarge: "22G to 25G, 1.0 to 1.5 inch needle",
          equineBovine: "20G to 21G, 1.5 to 2.0 inch needle"
        },
        executionTechnique: "कैनुलस को इन्फ्राऑर्बिटल कैनाल के मुख पर रखें। कैनाल के भीतर 2-4 मिमी से अधिक सुई न डालें ताकि कैनाल की तंत्रिकाओं पर सीधे आघात न हो। दवा प्रविष्ट करने से पूर्व रक्त हेतु एस्पिरेट करें। 60 सेकंड तक अंगूठे से हल्का दबाव रखें ताकि एनेस्थेटिक पीछे न बहे।",
        precautions: "मार्जार एवं ब्रैकीसेफेलिक श्वान प्रजातियों में इन्फ्राऑर्बिटल कैनाल अत्यंत छोटी होती है; सुई अंदर ठूंसने से नेत्र गोलक (orbit/globe) में छिद्र होने का गंभीर जोखिम रहता है।"
      },
      mandibularInferiorAlveolar: {
        nameEn: "Inferior Alveolar / Mandibular Nerve Block",
        nameHi: "इन्फीरियर एल्विओलर / मैंडिबुलर नर्व ब्लॉक",
        anatomicalLandmarks: "मैंडिबुलर फोरामेन (Mandibular foramen) - मैंडिबल के रेमस (ramus) की आंतरिक (medial) सतह पर स्थित। इंट्रा-ओरल दृष्टिकोण: अंतिम मोलर के पीछे मैंडिबुलर रेमस की मीडियल बॉर्डर। एक्स्ट्रा-ओरल दृष्टिकोण: मैंडिबुलर एंगल के वेन्ट्रल नॉच से अंदर की ओर पैल्पेट किया जाता है।",
        structuresDesensitized: "संबंधित हेमी-मैंडिबल (अर्ध-निचला जबड़ा) के सभी दांत (इन्सीज़र्स, कैनाइन, सभी प्रीमोलर्स व मोलर्स), मैंडिबुलर अस्थि, निचला ओंठ एवं म्यूकोसा।",
        needleSpecification: {
          canineSmallFeline: "25G to 27G, 1.0 inch needle",
          canineLarge: "22G, 1.5 inch needle",
          equineBovine: "18G to 20G, 3.0 inch spinal or lumbar needle"
        },
        executionTechnique: "सुई को मैंडिबुलर फोरामेन के मुख पर स्थापित करें। औषधि प्रविष्ट करने से पूर्व अनिवार्य रूप से एस्पिरेट करें (इन्फीरियर एल्विओलर धमनी व शिरा निकट होती हैं)। धीरे-धीरे औषधि का 70% फोरामेन के समीप तथा 30% सुई निकालते समय छोड़ें।",
        precautions: "पुनर्प्राप्ति (recovery) के समय पशु द्वारा जीभ या ओंठ को अनजाने में चबाने (self-mutilation) की संभावना रहती है। द्विपक्षीय (bilateral) ब्लॉक एक साथ देने से बचें ताकि जीभ का पक्षाघात न हो।"
      },
      mental: {
        nameEn: "Mental Nerve Block (Middle Mental Foramen)",
        nameHi: "मेंटल नर्व ब्लॉक (मिडिल मेंटल फोरामेन)",
        anatomicalLandmarks: "मध्य मेंटल फोरामेन (Middle mental foramen) - दूसरे प्रीमोलर (306/406) के ठीक नीचे मैंडिबल की रोस्ट्रो-लेटरल सतह पर स्थित।",
        structuresDesensitized: "संबंधित तरफ के निचले इन्सीज़र्स (301-303, 401-403), निचला कैनाइन (304/404), रोस्ट्रल निचले ओंठ का मसूड़ा व त्वचा।",
        needleSpecification: {
          canineSmallFeline: "27G, 0.5 inch needle",
          canineLarge: "25G, 1.0 inch needle",
          equineBovine: "20G, 1.0 to 1.5 inch needle"
        },
        executionTechnique: "मैंडिबल के पार्श्व भाग से उंगली द्वारा फोरामेन को महसूस करें। सुई को छिद्र के मुख पर टिकाकर दवा इंजेक्ट करें। कैनाल में प्रवेश कराने की आवश्यकता नहीं होती।",
        precautions: "औषधि का नर्व बंडल में दबाव से इंजेक्शन न करें; न्यूरोपैथी से बचाव हेतु सुई को फोरामेन के मुख पर ही रखें।"
      },
      caudalMaxillary: {
        nameEn: "Caudal Maxillary / High Maxillary Nerve Block",
        nameHi: "कॉडल मैक्सिलरी / स्फेनोपैलेटाइन नर्व ब्लॉक",
        anatomicalLandmarks: "टेरिगोपैलेटाइन फोसा (Pterygopalatine fossa) - अंतिम मैक्सिलरी मोलर के कॉडल पहलू पर, ऑर्बिटल फ्लोर के नीचे। जाइगोमैटिक आर्च के नीचे से 90 डिग्री कोण पर या अंतिम मोलर के पीछे इंट्रा-ओरली लंबवत।",
        structuresDesensitized: "संपूर्ण हेमी-मैक्सिला (समस्त ऊपरी जबड़े के दांत: 01 से 11), ऊपरी जबड़े की अस्थि, कठोर व कोमल तालु (Hard & Soft Palate), तथा मैक्सिलरी साइनस म्यूकोसा।",
        needleSpecification: {
          canineSmallFeline: "25G to 27G, 1.0 inch needle",
          canineLarge: "22G, 1.5 to 2.0 inch needle",
          equineBovine: "18G to 20G, 3.5 inch spinal needle"
        },
        executionTechnique: "अंतिम ऊपरी मोलर के कॉडल मार्जिन से सीधे डोर्सल दिशा में सुई को धीरे-धीरे आगे बढ़ाएं जब तक कि टेरिगोपैलेटाइन फोसा तक न पहुंचे। रक्त हेतु बार-बार एस्पिरेट करें (मैक्सिलरी धमनी एवं रेट्रोबुलबार वीनस प्लेक्सस की निकटता)।",
        precautions: "अत्यधिक गहराई में सुई डालने से रेट्रोबुलबार हेमटोमा (Retrobulbar hematoma) अथवा ऑप्टिक नर्व को क्षति पहुंच सकती है। अत्यधिक बल न लगाएं।"
      }
    },

    /**
     * Calculates safe local anaesthetic volume and absolute toxic caps for dental blocks.
     * @param {string} blockName - "infraorbital"|"mandibularInferiorAlveolar"|"mental"|"caudalMaxillary"
     * @param {number} weightKg - Patient weight in kilograms
     * @param {string} species - "canine"|"feline"|"equine"|"bovine"
     * @param {string} localAnestheticType - "bupivacaine_0_5" (default) or "lignocaine_2"
     */
    calculateDentalNerveBlock: function (blockName, weightKg, species, localAnestheticType) {
      const wt = parseFloat(weightKg);
      const sp = (species || "canine").toLowerCase();
      const drug = (localAnestheticType || "bupivacaine_0_5").toLowerCase();

      if (isNaN(wt) || wt <= 0) {
        return { error: "अमान्य शारीरिक वजन (Invalid Patient Weight)." };
      }

      const blockInfo = this.nerveBlocks[blockName];
      if (!blockInfo) {
        return { error: "अज्ञात नर्व ब्लॉक (Unknown Nerve Block Specified)." };
      }

      // Safe systemic limits
      // Bupivacaine 0.5% (5 mg/ml): Dog max 2.0 mg/kg; Cat max 1.0 mg/kg; Horse/Cattle max 1.0-2.0 mg/kg
      // Lignocaine 2% (20 mg/ml): Dog max 8.0 mg/kg; Cat max 2.0 mg/kg; Horse/Cattle max 4.0 mg/kg
      let concentrationMgPerMl = 5.0; // 0.5%
      let maxDoseMgPerKg = 2.0;

      if (drug === "lignocaine_2") {
        concentrationMgPerMl = 20.0; // 2%
        if (sp === "feline") maxDoseMgPerKg = 2.0;
        else if (sp === "canine") maxDoseMgPerKg = 6.0; // safe conservative cap
        else maxDoseMgPerKg = 4.0;
      } else {
        // Bupivacaine
        if (sp === "feline") maxDoseMgPerKg = 1.0;
        else maxDoseMgPerKg = 2.0;
      }

      const absoluteMaxDoseMg = wt * maxDoseMgPerKg;
      const absoluteMaxTotalMl = absoluteMaxDoseMg / concentrationMgPerMl;

      // Recommended site volume calculation
      let calculatedSiteVolumeMl = 0;

      if (sp === "feline") {
        // Cats need tiny volumes: 0.1 to 0.3 ml per site
        calculatedSiteVolumeMl = Math.min(0.1 + (wt * 0.04), 0.3);
      } else if (sp === "canine") {
        if (wt < 5) calculatedSiteVolumeMl = 0.25;
        else if (wt < 10) calculatedSiteVolumeMl = 0.4;
        else if (wt < 25) calculatedSiteVolumeMl = 0.8;
        else calculatedSiteVolumeMl = Math.min(1.2 + ((wt - 25) * 0.02), 2.0);
      } else if (sp === "equine" || sp === "bovine") {
        // Large animals
        if (blockName === "infraorbital" || blockName === "mental") {
          calculatedSiteVolumeMl = Math.min(3.0 + (wt * 0.005), 5.0);
        } else {
          // Mandibular or Caudal Maxillary
          calculatedSiteVolumeMl = Math.min(5.0 + (wt * 0.01), 10.0);
        }
      }

      // Safety clamp: A single site volume should never exceed 50% of the patient's absolute total daily toxic limit
      const siteVolumeSafetyCapMl = absoluteMaxTotalMl * 0.45;
      const finalSafeVolumePerSiteMl = Math.min(calculatedSiteVolumeMl, siteVolumeSafetyCapMl);

      return {
        blockName: blockInfo.nameEn,
        blockNameHi: blockInfo.nameHi,
        species: sp,
        patientWeightKg: wt,
        anestheticAgent: drug === "lignocaine_2" ? "Lignocaine Hydrochloride 2% (20 mg/mL)" : "Bupivacaine Hydrochloride 0.5% (5 mg/mL)",
        recommendedVolumePerSiteMl: Math.round(finalSafeVolumePerSiteMl * 100) / 100,
        absoluteMaxPatientTotalMl: Math.round(absoluteMaxTotalMl * 100) / 100,
        needleGaugeAndLength: blockInfo.needleSpecification[sp === "feline" || (sp === "canine" && wt < 10) ? "canineSmallFeline" : sp === "canine" ? "canineLarge" : "equineBovine"],
        landmarksHi: blockInfo.anatomicalLandmarks,
        structuresDesensitizedHi: blockInfo.structuresDesensitized,
        executionTechniqueHi: blockInfo.executionTechnique,
        criticalPrecautionsHi: blockInfo.precautions,
        safetyWarning: finalSafeVolumePerSiteMl >= absoluteMaxTotalMl * 0.4
          ? "चेतावनी: छोटे वजन के पशुओं में मल्टीपल क्वाड्रेंट ब्लॉक्स देते समय कुल मात्रा की विषाक्त सीमा (Toxic Limit) की पुनः गणना करें।"
          : "सुरक्षित मात्रा स्वीकृत (Dose within safe therapeutic window)."
      };
    },

    // =========================================================================
    // 6. PERIODONTAL STAGING UTILITY
    // =========================================================================
    /**
     * Determines Periodontal Disease Grade (Stage 1 to 4) using AVDC standards.
     * @param {number} pocketDepthMm - Probing depth in millimeters
     * @param {number} boneLossPercent - Radiographic alveolar bone loss percentage
     * @param {number} toothMobilityScore - Mobility grade: 0 (none), 1 (<1mm), 2 (1-2mm), 3 (>2mm or vertical depression)
     * @param {string} species - "canine"|"feline"
     */
    getPeriodontalStaging: function (pocketDepthMm, boneLossPercent, toothMobilityScore, species) {
      const pd = parseFloat(pocketDepthMm) || 0;
      const bl = parseFloat(boneLossPercent) || 0;
      const mob = parseInt(toothMobilityScore, 10) || 0;
      const sp = (species || "canine").toLowerCase();

      // Normal sulcus depth: Dog = 1-3 mm; Cat = 0.5-1 mm
      const normalSulcusMax = sp === "feline" ? 1.0 : 3.0;

      let stage = 1;
      let stageNameEn = "";
      let stageNameHi = "";
      let clinicalDescriptionHi = "";
      let prognosis = "";
      let recommendedTherapy = [];

      if (bl > 50 || mob === 3 || (sp === "feline" && pd > 4.5) || (sp === "canine" && pd > 9.0)) {
        stage = 4;
        stageNameEn = "Stage 4 (PD4) - Advanced Periodontitis";
        stageNameHi = "चरण 4 (PD4) - गंभीर पेरिओडोन्टाइटिस";
        clinicalDescriptionHi = "50% से अधिक एल्वियोलर अस्थि का क्षरण, अत्यधिक पॉकेट गहराई, दांत का हिलना (Grade 3 Mobility), जड़ का अनावरण व फुरकेशन एक्सपोज़र (Class III Furcation)।";
        prognosis = "दांत बचाने हेतु निराशाजनक (Hopeless Prognosis). Extraction indicated.";
        recommendedTherapy = [
          "सर्जिकल दंत निष्कासन (Closed or Open Surgical Extraction with Mucoperiosteal Flap)",
          "एल्वियोलर गर्त की क्युरेटेज एवं शार्प बोन रिम की स्मूथिंग (Alveoloplasty)",
          "अवशोष्य टांके (Absorbable Sutures 4-0 / 5-0 Monocryl/Vicryl Rapide) द्वारा मसूड़े का सीवन",
          "प्रणालीगत एंटीबायोटिक (Amoxicillin-Clavulanate 12.5-20 mg/kg PO q12h या Clindamycin 11 mg/kg PO q24h 7-10 दिनों हेतु)",
          "बहुआयामी दर्द निवारक (Carprofen 4.4 mg/kg PO q24h या Meloxicam 0.1 mg/kg PO q24h)"
        ];
      } else if (bl >= 25 || mob === 2 || (sp === "feline" && pd > 2.5) || (sp === "canine" && pd > 5.0)) {
        stage = 3;
        stageNameEn = "Stage 3 (PD3) - Moderate Periodontitis";
        stageNameHi = "चरण 3 (PD3) - मध्यम पेरिओडोन्टाइटिस";
        clinicalDescriptionHi = "25% से 50% एल्वियोलर अस्थि क्षरण, मध्यम पॉकेट गहराई (कुत्तों में 5-8 मिमी, बिल्लियों में 2.5-4 मिमी), मसूड़ों का पीछे हटना (gingival recession) व ग्रेड 2 मोबिलिटी।";
        prognosis = "उचित चिकित्सकीय व सर्जिकल प्रबंधन से आरक्षित (Guarded).";
        recommendedTherapy = [
          "सुपर व सब-जिंजाइवल अल्ट्रासोनिक स्केलिंग (Ultrasonic Scaling) एवं रूट प्लानिंग (Root Planing)",
          "सब-जिंजाइवल क्युरेटेज द्वारा नेक्रोटिक ग्रैन्युलेशन ऊतकों का निष्कासन",
          "लोकल एंटीमाइक्रोबियल पेरिओडोन्टल जेल (Doxycycline Hyclate 8.5% perio-gel) का पॉकेट में प्रत्यारोपण",
          "यदि फुरकेशन दोष ग्रेड II/III है, तो निर्देशित दंत निष्कासन (Selective Extraction)",
          "दैनिक क्लोरहेक्सिडिन 0.12% ओरल रिंस व होम डेंटल केयर"
        ];
      } else if (bl > 0 || pd > normalSulcusMax || mob === 1) {
        stage = 2;
        stageNameEn = "Stage 2 (PD2) - Early Periodontitis";
        stageNameHi = "चरण 2 (PD2) - प्रारंभिक पेरिओडोन्टाइटिस";
        clinicalDescriptionHi = "25% से कम एल्वियोलर अस्थि क्षरण, मसूड़ों की सूजन व लालिमा (Edema), पॉकेट गहराई कुत्तों में 3-5 मिमी व बिल्लियों में 1-2 मिमी, कोई या न्यूनतम मोबिलिटी (Grade 1)।";
        prognosis = "सख्त हाइजीन व नियमित स्केलिंग से प्रतिवर्ती (Reversible with intervention).";
        recommendedTherapy = [
          "पूर्ण सुप्रा एवं सब-जिंजाइवल अल्ट्रासोनिक स्केलिंग",
          "रूट सर्फेस पॉलिशिंग (Fine Prophy Paste) द्वारा इनेमल को चिकना करना ताकि प्लाक जमा न हो",
          "सब-जिंजाइवल इरिगेशन (0.12% Chlorhexidine Gluconate solution)",
          "नियमित टूथ ब्रशिंग (Enzymatic Pet Toothpaste) व वेटरनरी ओरल हेल्थ डाइट (VOHC Approved)"
        ];
      } else {
        stage = 1;
        stageNameEn = "Stage 1 (PD1) - Gingivitis";
        stageNameHi = "चरण 1 (PD1) - मसूड़े की सूजन (जिंजिवाइटिस)";
        clinicalDescriptionHi = "केवल मसूड़े की सीमांत सूजन (Marginal Gingival Hyperemia), जांच करने पर हल्का रक्तस्राव, शून्य एल्वियोलर अस्थि क्षरण (0% Bone Loss), कोई पॉकेट गहराई नहीं।";
        prognosis = "पूर्णतः प्रतिवर्ती व उत्कृष्ट (Excellent Prognosis).";
        recommendedTherapy = [
          "प्रोफेशनल दंत सफाई व अल्ट्रासोनिक स्केलिंग (Dental Prophylaxis)",
          "इनेमल पॉलिशिंग (Polishing to remove micro-grooves)",
          "सप्ताह में कम से कम 3 बार नियमित ब्रश व प्लाक कंट्रोल जेल का उपयोग"
        ];
      }

      return {
        stageNumber: stage,
        stageNameEn: stageNameEn,
        stageNameHi: stageNameHi,
        probingDepthMm: pd,
        boneLossPercentage: bl,
        mobilityScore: mob,
        clinicalFindingsHi: clinicalDescriptionHi,
        prognosis: prognosis,
        actionProtocolHi: recommendedTherapy
      };
    },

    // =========================================================================
    // 7. COMPREHENSIVE ORAL & DENTAL DISEASE DOSSIERS
    // =========================================================================
    diseaseDossiers: {
      periodontalDisease: {
        id: "DENT-DIS-01",
        nameEn: "Periodontal Disease Complex (Gingivitis to Advanced Periodontitis)",
        nameHi: "दंतवेष्ट रोग / पायरिया एवं मसूड़ा शोथ संलक्षण",
        speciesAffection: ["Canine", "Feline", "Equine", "Bovine"],
        etiologyAndPathogenesis: "दंत पट्टिका (Dental Plaque) में उपस्थित अवायवीय जीवाणुओं (Porphyromonas gulae, Treponema denticola, Tannerella forsythia) द्वारा विषाक्त पदार्थों व एंजाइमों का स्राव, जिसके विरुद्ध शरीर की प्रदाहक प्रतिक्रिया (Host Inflammatory Response) के कारण पेरिओडोन्टल लिगामेंट तथा एल्वियोलर अस्थि का क्रमिक विनाश होता है।",
        clinicalSigns: [
          "तीव्र दुर्गंधयुक्त श्वास (Severe Halitosis)",
          "मसूड़ों से रक्तस्राव, लालिमा व सूजन (Erythema & Bleeding Gingiva)",
          "लार टपकना (Ptyalism / Hypersalivation)",
          "कठोर भोजन चबाने में कठिनाई या मुंह के एक तरफ से चबाना (Dysphagia / Head shaking)",
          "दांतों का ढीला होकर गिरना, चेहरे पर नासूर/फिस्टुला (Infraorbital facial draining tract from carnassial tooth root abscess)"
        ],
        diagnosticImaging: "पूर्ण मुख दंत रेडियोग्राफी (Full-mouth intraoral dental radiographs): क्षैतिज व ऊर्ध्वाधर अस्थि क्षरण (Horizontal & vertical bone loss), पेरिओडोन्टल स्पेस का चौड़ा होना, तथा फुरकेशन ल्यूसेंसी की पहचान।",
        treatmentProtocol: {
          conservative: "चरण 1 व 2 में: जनरल एनेस्थीसिया के तहत सुप्रा व सबजिंजाइवल स्केलिंग, पॉलिशिंग तथा सबजिंजाइवल एंटीबायोटिक जेल (Doxycycline) का आरोपण।",
          surgical: "चरण 3 व 4 में: म्यूकोपेरिओस्टियल फ्लैप बनाकर प्रभावित दांतों का सर्जिकल निष्कासन (Sectioning multi-rooted teeth like 108/208/309/409), रूट प्लानिंग, एल्वियोलोप्लास्टी तथा मोनोक्रिल 4-0 से तनाव-मुक्त टांके लगाना।",
          pharmacotherapy: [
            "एंटीबायोटिक: Clindamycin 11 mg/kg PO q24h x 10 days अथवा Amoxicillin-Clavulanic Acid 15 mg/kg PO q12h x 7-10 days",
            "एनाल्जेसिया: Meloxicam 0.1 mg/kg PO q24h (श्वान) या Robenacoxib 1-2 mg/kg PO q24h (मार्जार) x 5 days",
            "स्थानीय एंटीसेप्टिक: 0.12% Chlorhexidine gluconate oral rinse q12-24h"
          ]
        }
      },

      felineToothResorption: {
        id: "DENT-DIS-02",
        nameEn: "Feline Tooth Resorption (TR / FORL - Odontoclastic Resorptive Lesion)",
        nameHi: "मार्जार दंत अवशोषण रोग (कैट कैविटी / एफ.ओ.आर.एल)",
        speciesAffection: ["Feline"],
        etiologyAndPathogenesis: "अज्ञात मूल (Idiopathic); ओडोन्टोक्लास्ट (Odontoclasts) कोशिकाओं का असामान्य सक्रियण होता है, जो दांत के सिमेंटम व डेंटाइन को सीमेंटो-इनेमल जंक्शन (Neck area) से नष्ट करना प्रारंभ करती हैं। यह पल्प कैविटी तक पहुंचकर तीव्र तंत्रिका दर्द उत्पन्न करती हैं।",
        classificationTypes: {
          type1: "प्रकार 1 (Type 1 TR): पेरिओडोन्टल लिगामेंट स्पेस स्पष्ट बना रहता है; रूट का जबड़े की हड्डी में रूपांतरण नहीं होता। फोकल इन्फ्लेमेटरी डिस्ट्रक्शन।",
          type2: "प्रकार 2 (Type 2 TR): दांत की जड़ जबड़े की हड्डी में बदल (Ankylosis / Replacement resorption) जाती है; पेरिओडोन्टल लिगामेंट गायब हो जाता है।",
          type3: "प्रकार 3 (Type 3 TR): एक ही दांत में एक रूट Type 1 तथा दूसरी रूट Type 2 प्रदर्शित करती है।"
        },
        clinicalSigns: [
          "जबड़े में कंपन व झटके (Jaw chattering when lesion is touched)",
          "अत्यधिक लार बहना व भोजन करते समय अचानक चिल्लाना (Apprehensive eating / Dropping food)",
          "दंत ग्रीवा (neck) पर मसूड़े की अतिवृद्धि (Hyperplastic granulation gingiva covering the cavity)",
          "वजन घटना, भूख में कमी एवं चिड़चिड़ापन (Anorexia and behavioral aggression due to excruciating nerve exposure)"
        ],
        diagnosticImaging: "इंट्रा-ओरल डेंटल रेडियोग्राफी अनिवार्य है। क्राउन तथा रूट की घनत्व हानि, रूट कैनाल का गायब होना व एंकिलोसिस की जांच।",
        treatmentProtocol: {
          type1Lesions: "पूर्ण शल्य चिकित्सा निष्कासन (Complete surgical extraction including every root fragment). रूट टिप को छोड़ना सख्त मना है क्योंकि इससे क्रोनिक इन्फेक्शन बना रहता है।",
          type2Lesions: "यदि रेडियोग्राफ में रूट पूर्णतः हड्डी में समाहित (ghost root / ankylosed) दिखती है, तो क्राउन विच्छेदन (Crown Amputation with intentional root retention) किया जाता है। जिंजाइवल फ्लैप से ढककर टांके लगाएं।",
          type3Lesions: "Type 1 वाली रूट का पूर्ण निष्कासन तथा Type 2 वाली रूट का क्राउन विच्छेदन।",
          pharmacotherapy: [
            "तीव्र दर्द नियंत्रण: Buprenorphine 0.02-0.03 mg/kg Sublingual/Transmucosal q8h x 3-5 days",
            "प्रदाह-रोधी: Robenacoxib (Onsior) 1-2 mg/kg SC/PO q24h x 3-6 days (वृक्क स्वास्थ्य सुरक्षित रखते हुए)"
          ]
        }
      },

      felineChronicGingivostomatitis: {
        id: "DENT-DIS-03",
        nameEn: "Feline Chronic Gingivostomatitis (FCGS)",
        nameHi: "मार्जार चिरकालिक मसूड़ा-मुखगुहा शोथ (कैट स्टोमेटाइटिस)",
        speciesAffection: ["Feline"],
        etiologyAndPathogenesis: "दंत पट्टिका (plaque) के एंटीजन के प्रति अत्यधिक गंभीर व दुर्दम्य प्रतिरक्षा अतिसंवेदनशीलता (Aberrant Immune Response)। फेलिन कैलीसीवायरस (FCV), फेलिन हर्पीसवायरस (FHV-1), FIV एवं FeLV इस स्थिति को तीव्र करते हैं। लिम्फोप्लाज्मासाइटिक इन्फिल्ट्रेशन द्वारा ग्रसनी व तालु में गंभीर अल्सरेशन होता है।",
        clinicalSigns: [
          "कौडल म्यूकोसाइटिस (Caudal mucositis): ग्लोसोपैलेटाइन आर्च व ग्रसनी के दोनों किनारों पर लाल, दानेदार (Cobblestone appearance) घाव व अल्सर",
          "अत्यंत तीव्र मुख वेदना (Excruciating oral pain) - मुंह छूने पर अत्यधिक आक्रामकता",
          "खून मिली लार टपकना (Blood-tinged ptyalism)",
          "बाल न चाटना (Unkempt coat due to inability to groom)",
          "गंभीर कुपोषण एवं वजन में तीव्र गिरावट (Severe weight loss)"
        ],
        diagnosticImaging: "दंत रेडियोग्राफी: उप-नैदानिक रूट अवशोषण, एल्वियोलर ओस्टाइटिस तथा पीरियडोंटल डिस्ट्रक्शन का मूल्यांकन। वायरल पीसीआर (FCV, FeLV, FIV) प्रोफाइल।",
        treatmentProtocol: {
          goldStandardSurgery: "पार्शियल या पूर्ण-मुख दंत निष्कासन (Partial Mouth vs Full Mouth Tooth Extraction - FMTE)। कैनाइन दांतों के पीछे के सभी प्रीमोलर्स व मोलर्स का निष्कासन (रूट का कोई भी सूक्ष्म अंश न बचे)। यदि रोस्ट्रल इन्फ्लेमेशन भी है, तो सभी कैनाइन्स व इन्सीज़र्स सहित पूर्ण 30 दांतों का निष्कासन अनिवार्य है।",
          surgicalEfficacy: "FMTE के पश्चात ~70-80% बिल्लियों में पूर्ण उपचार या सार्थक नैदानिक राहत मिलती है।",
          refractoryMedicalManagement: [
            "पुनः संयोजन फेलिन इंटरफेरॉन ओमेगा (Recombinant Feline Interferon Omega): 0.1 MU/cat PO q24h mucosal absorption",
            "इम्यूनोसप्रेसन: Cyclosporine microemulsion 5-7.5 mg/kg PO q24h (TDM द्वारा निगरानी रखें)",
            "कॉर्टिकोस्टेरॉइड्स: केवल उपशामक (Palliative) मामलों में - Prednisolone 1-2 mg/kg PO q24h (दीर्घकालिक उपयोग में सावधानी)",
            "एनाल्जेसिया: Buprenorphine 0.02 mg/kg Sublingual q8-12h दीर्घकालिक दर्द निवारण हेतु"
          ]
        }
      },

      equineDentalPointsHooks: {
        id: "DENT-DIS-04",
        nameEn: "Equine Enamel Points, Sharp Hooks & Wave Mouth (Equine Dental Floating)",
        nameHi: "अश्व दंत इनेमल तीक्ष्ण शूल, हुक्स एवं फ्लोटिंग प्रोटोकॉल",
        speciesAffection: ["Equine"],
        etiologyAndPathogenesis: "अश्व के जबड़ों की एनिसोनेथिज्म (Anisognathism) - ऊपरी जबड़ा निचले जबड़े की तुलना में लगभग 23% अधिक चौड़ा होता है। प्राकृतिक चबाने की वृत्ताकार गति में कमी (सूखा भूसा व दाना खिलाने के कारण) से ऊपरी दाढ़ों के बाहरी (Buccal) किनारे तथा निचली दाढ़ों के भीतरी (Lingual) किनारे नुकीले तीक्ष्ण शूलों (sharp enamel points) में बदल जाते हैं, जो गाल एवं जीभ को काटते हैं।",
        clinicalSigns: [
          "कुड ड्रॉपिंग (Quidding): चबाते समय अधचबाया चारा मुंह से नीचे गिराना",
          "लगाम (Bit) का विरोध करना, सिर हिलाना (Head tossing while riding)",
          "दाना चबाने में असामान्य समय लगना एवं वजन में कमी",
          "मुंह से दुर्गंध व लार बहना",
          "गोबर में बिना पचे लंबे रेशे व साबुत दाने आना"
        ],
        diagnosticImaging: "फुल-माउथ ओरल स्पेकुलम (Haussmann's Speculum) लगाकर शक्तिशाली हेडलाइट व डेंटल मिरर/एंडोस्कोप द्वारा परीक्षण।",
        treatmentProtocol: {
          sedationProtocol: [
            "Detomidine Hydrochloride: 0.01 - 0.02 mg/kg IV",
            "Butorphanol Tartrate: 0.01 - 0.02 mg/kg IV (गहन सिडेशन व एनाल्जेसिया हेतु संयुक्त)"
          ],
          floatingProcedure: "मोटराइज्ड पावरफ्लोट (Motorized Powerfloat with diamond disc) या मैनुअल रास्प्स (Hand floats) द्वारा ऊपरी आर्केड्स के बक्कल किनारों तथा निचले आर्केड्स के लिंगुअल किनारों को 45-डिग्री कोण पर तराशना। पहले प्रीमोलर (106/206) पर रोस्ट्रल हुक तथा अंतिम मोलर (311/411) पर कॉडल हुक को समतल करना।",
          bitSeatCreation: "पहले वर्किंग प्रीमोलर्स (106, 206, 306, 406) के अग्र किनारों को गोल बनाना (Bit Seating) ताकि लगाम लगाने पर गाल में घाव न बने।",
          precautions: "एक दांत पर 10-15 सेकंड से अधिक ग्राइंडिंग न करें; अत्यधिक घर्षण ऊष्मा (thermal pulp necrosis) से पल्प डैमेज का गंभीर जोखिम रहता है। निरंतर जल-स्प्रे से ठंडा रखें।"
        }
      },

      bovineLumpyJaw: {
        id: "DENT-DIS-05",
        nameEn: "Bovine Lumpy Jaw (Actinomycosis)",
        nameHi: "गोवंश जबड़ा अस्थि शोथ (लम्पी जॉ / एक्टिनोमाइकोसिस)",
        speciesAffection: ["Bovine", "Bubaline"],
        etiologyAndPathogenesis: "एक्टिनोमाइसेस बोविस (Actinomyces bovis) - ग्राम-पॉजिटिव, अवायवीय, फिलामेंटस जीवाणु। यह सामान्य ओरल फ्लोरा का हिस्सा होता है। कठोर कांटेदार चारे या दंत परिवर्तन (dentition eruption) के दौरान मसूड़े में चोट लगने पर यह मैंडिबल अस्थि में प्रवेश कर क्रोनिक रेयरफाइंग ओस्टियोमाइलाइटिस (Rarefying osteomyelitis) उत्पन्न करता है।",
        clinicalSigns: [
          "निचले जबड़े (Mandible) पर कठोर, गतिहीन, अ-दर्दनाक अस्थि उभार (Immobile hard bony swelling)",
          "अस्थि में हनीकॉम्ब (मधुमक्खी के छत्ते जैसी) गुहाएं बनना",
          "फिस्टुला नलिकाओं से पीले रंग के गाढ़े मवाद का स्राव, जिसमें 'सल्फर कण' (Sulfur granules - जीवाणु पुंज) उपस्थित होते हैं",
          "चबाने में कठिनाई, अत्यधिक लार एवं समय के साथ जबड़े की विकृति"
        ],
        diagnosticImaging: "रेडियोग्राफी: कॉर्टिकल बोन का विनाश, नई सबपेरिओस्टियल अस्थि का अनियमित जमाव तथा अस्थि में सिस्टिक ल्यूसेंट गुहाएं (Honeycomb appearance)। स्मीयर में ग्राम-पॉजिटिव शाखित फिलामेंट्स।",
        treatmentProtocol: {
          primaryTherapy: [
            "सोडियम आयोडाइड (Sodium Iodide 10% solution): 1 ग्राम प्रति 12 किग्रा शारीरिक वजन की दर से धीमे IV मार्ग से दें। 7-10 दिन बाद एक बार पुनः दोहराएं।",
            "सावधानी: आयोडिज्म (Iodism) के लक्षण (आंख-नाक से पानी, त्वचा का छिलना, खांसी) दिखने पर तत्काल रोकें। गर्भवती पशुओं में गर्भपात के जोखिम के कारण सावधानी बरतें।"
          ],
          antimicrobialAdjuncts: [
            "Procaine Penicillin G: 20,000 to 30,000 IU/kg IM q24h कम से कम 14-21 दिनों तक",
            "Streptomycin Sulfate: 10 mg/kg IM q12h (पेनिसिलिन के साथ सिनर्जिस्टिक क्रिया)",
            "वैकल्पिक: Oxytetracycline 10 mg/kg IV q24h x 10 days"
          ],
          oralIodideDrench: "पोटेशियम आयोडाइड (Potassium Iodide / Lugol's Drench): 5 से 10 ग्राम प्रतिदिन मौखिक 2-3 सप्ताह तक (धीमे संक्रमणों में)।",
          surgicalDebridement: "अत्यधिक नेक्रोटिक अस्थि का शल्य क्युरेटेज एवं आयोडिन पैक द्वारा ड्रेसिंग। उन्नत अस्थि घावों में पूर्ववत संरचना बहाल नहीं होती, केवल जीवाणु प्रसार रुकता है।"
        }
      },

      bovineWoodenTongue: {
        id: "DENT-DIS-06",
        nameEn: "Bovine Wooden Tongue (Actinobacillosis)",
        nameHi: "गोवंश काष्ठ जिह्वा रोग (वुडन टंग / एक्टिनोबैसिलोसिस)",
        speciesAffection: ["Bovine", "Bubaline", "Ovine"],
        etiologyAndPathogenesis: "एक्टिनोबैसिलस लिग्निरेसी (Actinobacillus lignieresii) - ग्राम-नेगेटिव, नॉन-मोटाइल रॉड-आकार जीवाणु। कठोर सूखी वनस्पति या पौधों के कांटों से जीभ की लिंगुअल खांच (Lingual fossa) में खरोंच लगने पर जीवाणु कोमल ऊतकों में प्रवेश कर फैला हुआ ग्रैन्युलोमेटस ग्लोसाइटिस (Granulomatous glossitis) उत्पन्न करता है।",
        clinicalSigns: [
          "जीभ का अत्यधिक कठोर, सूजा हुआ व लकड़ी जैसा सख्त (Wooden consistency) हो जाना",
          "जीभ मुंह से बाहर लटकना, पशु का जीभ अंदर खींचने में असमर्थ होना",
          "लगातार झागदार लार टपकना (Profuse ropy ptyalism)",
          "भोजन पकड़ने (prehension) व चबाने में असमर्थता; तेजी से वजन घटना",
          "सबमैंडिबुलर लिम्फ नोड्स में सूजन व गांठें बनना"
        ],
        diagnosticImaging: "जीभ का पैल्पेशन: जीभ का आधार व शरीर कठोर गांठदार अनुभव होता है। मवाद स्मीयर: ग्राम-नेगेटिव बैसिली युक्त क्लब-आकार सल्फर ग्रेन्यूल्स।",
        treatmentProtocol: {
          primaryTherapy: [
            "सोडियम आयोडाइड (Sodium Iodide 10% solution): 1 ग्राम प्रति 12 किग्रा शारीरिक वजन IV ड्रिप द्वारा एक बार। आवश्यकता पड़ने पर 5-7 दिन पश्चात दोहराएं।",
            "प्रारंभिक अवस्था में सोडियम आयोडाइड से 24-48 घंटों के भीतर चमत्कारी सुधार प्राप्त होता है।"
          ],
          antimicrobialAdjuncts: [
            "Oxytetracycline: 10 mg/kg IV/IM q24h x 5-7 days (अथवा Long-acting Oxytetracycline 20 mg/kg IM)",
            "Dihydrostreptomycin: 10-15 mg/kg IM q12h x 5 days"
          ],
          nursingCare: "नरम, हरा, रसीला चारा व दलिया उपलब्ध कराएं; जीभ को सूखेपन व बाह्य आघात से बचाने हेतु मॉइस्चराइजिंग एंटीसेप्टिक रिंस।"
        }
      },

      dentalFluorosis: {
        id: "DENT-DIS-07",
        nameEn: "Endemic Dental & Skeletal Fluorosis",
        nameHi: "स्थानिक दंत एवं कंकाल फ्लोरोसिस (भूजल फ्लोराइड विषाक्तता)",
        speciesAffection: ["Bovine", "Bubaline", "Caprine", "Ovine", "Equine"],
        etiologyAndPathogenesis: "पीने के पानी में फ्लोराइड की सांद्रता > 1.5 से 3.0 पीपीएम (PPM) से अधिक होना। दंत विकास व कैल्सीफिकेशन (Amelogenesis & Odontogenesis) के दौरान रक्त में अत्यधिक फ्लोराइड एमीलोब्लास्ट कोशिकाओं को नष्ट कर देता है। इनेमल में हाइड्रोक्सीएपेटाइट के स्थान पर कमजोर फ्लोरोएपेटाइट का असंगठित क्रिस्टलीकरण होता है, जिससे दांत अत्यधिक भुरभुरे, खुरदुरे व असामान्य घिसाई युक्त हो जाते हैं।",
        clinicalSigns: [
          "दांतों पर चाक जैसे सफेद धब्बे (Chalky-white patches) व खुरदुरापन (Mottling)",
          "दांतों का भूरा, पीला या काला पड़ना (Brown-black pigmentation/staining)",
          "इनेमल में गड्ढे बनना (Pitting & Hypoplasia)",
          "दांतों का असमय अत्यधिक घिसकर मसूड़े की रेखा तक आ जाना (Premature attrition down to gums)",
          "ठंडा पानी पीने पर दांतों में झनझनाहट/दर्द (Dental hyperesthesia); चारा चबाने में असमर्थता",
          "कंकाल फ्लोरोसिस: मेटाटार्सल व पसलियों में एक्सोस्टोसिस (Exostoses), लंगड़ापन व कूबड़ निकलना"
        ],
        diagnosticCriteria: [
          "पेयजल में फ्लोराइड स्तर > 1.5 mg/L (PPM) की पुष्टि",
          "मूत्र फ्लोराइड सांद्रता > 10-15 ppm (तीव्र उत्सर्जन स्तर)",
          "D1 से D4 तक दंत क्षति ग्रेडिंग (Mild chalkiness to total structural wear)"
        ],
        preventiveAndManagementStrategy: [
          "पेयजल स्रोत में बदलाव: कम फ्लोराइड (<1.0 ppm) वाले कुओं या नहरी जल का उपयोग",
          "आहार में कैल्शियम कार्बोनेट (Calcium Carbonate 1-2%) एवं मैग्नीशियम सप्लीमेंटेशन (यह आंतों में फ्लोराइड को बांधकर अवशोषण रोकते हैं)",
          "एल्युमिनियम सल्फेट (Aluminium Sulfate) अथवा एल्युमिनियम क्लोराइड का नियंत्रित उपयोग फ्लोराइड बंधक के रूप में",
          "विटामिन सी (Ascorbic Acid) एवं विटामिन डी का एंटीऑक्सीडेंट व बोन प्रोटेक्शन हेतु संवर्धन",
          "प्रभावित पशुओं को नरम व कटा हुआ चारा देना ताकि शेष बचे दांतों पर अत्यधिक यांत्रिक दबाव न पड़े"
        ]
      }
    }
  };

  // Seal namespace to prevent accidental runtime mutations
  Object.freeze(window.VetcareApp.ClinicalData.DentistryOralHealth.dentalFormulas);
  Object.freeze(window.VetcareApp.ClinicalData.DentistryOralHealth.nerveBlocks);
  Object.freeze(window.VetcareApp.ClinicalData.DentistryOralHealth.diseaseDossiers);

  // Ready signal
  if (window.VetcareApp.showToast) {
    window.VetcareApp.showToast("दंत चिकित्सा एवं मैक्सिलोफेशियल मॉड्यूल सक्रिय (Dentistry Module Loaded)", "success");
  }
})();
