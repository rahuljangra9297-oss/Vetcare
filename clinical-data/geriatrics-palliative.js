// Vetcare AI OS - Veterinary Geriatrics, Chronic Pain Ladders, IRIS CKD Staging & Palliative Care Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE INITIALIZATION & ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  /**
   * Veterinary Geriatric Medicine, Chronic Pain Management & Hospice Architecture
   * Designed under IRIS (International Renal Interest Society), IVAPM (International Veterinary Academy of Pain Management),
   * and IAAHPC (International Association for Animal Hospice and Palliative Care) 2026 Clinical Protocols.
   */
  window.VetcareApp.ClinicalData.GeriatricsPalliative = {
    metadata: {
      subsystem: "Geriatrics, Chronic Pain & Palliative Hospice Engine",
      version: "2026.4.3-PROD",
      isoVetStandard: "ISO-VET-GERI-2026",
      supportedTaxa: ["Canine", "Feline", "Equine", "Bovine", "Caprine", "Ovine"],
      authoritativeSource: "IRIS Renal Staging, IVAPM Chronic Pain Guidelines & Villalobos HHHHHMM Quality of Life Scale"
    },

    // =========================================================================
    // 2. IRIS (INTERNATIONAL RENAL INTEREST SOCIETY) CKD STAGING ENGINE
    // =========================================================================
    irisCkdFramework: {
      diagnosticThresholds: {
        canine: {
          stage1: { creatinineMax: 1.39, sdmaRange: "14 - 17 microg/dL (Persistent)" },
          stage2: { creatinineMin: 1.4, creatinineMax: 2.8, sdmaRange: "18 - 25 microg/dL" },
          stage3: { creatinineMin: 2.9, creatinineMax: 5.0, sdmaRange: "26 - 44 microg/dL" },
          stage4: { creatinineMin: 5.01, sdmaRange: ">= 45 microg/dL" }
        },
        feline: {
          stage1: { creatinineMax: 1.59, sdmaRange: "14 - 17 microg/dL (Persistent)" },
          stage2: { creatinineMin: 1.6, creatinineMax: 2.8, sdmaRange: "18 - 25 microg/dL" },
          stage3: { creatinineMin: 2.9, creatinineMax: 5.0, sdmaRange: "26 - 44 microg/dL" },
          stage4: { creatinineMin: 5.01, sdmaRange: ">= 45 microg/dL" }
        }
      },
      proteinuriaSubstaging: {
        canine: {
          nonProteinuric: { upcrMax: 0.19, label: "Non-proteinuric (UPCR < 0.2)" },
          borderline: { upcrMin: 0.2, upcrMax: 0.5, label: "Borderline proteinuric (UPCR 0.2 - 0.5)" },
          proteinuric: { upcrMin: 0.51, label: "Proteinuric (UPCR > 0.5)" }
        },
        feline: {
          nonProteinuric: { upcrMax: 0.19, label: "Non-proteinuric (UPCR < 0.2)" },
          borderline: { upcrMin: 0.2, upcrMax: 0.4, label: "Borderline proteinuric (UPCR 0.2 - 0.4)" },
          proteinuric: { upcrMin: 0.41, label: "Proteinuric (UPCR > 0.4)" }
        }
      },
      bloodPressureSubstaging: {
        normotensive: { maxBp: 139, riskLevel: "न्यूनतम जोखिम (Minimal TOD Risk)" },
        prehypertensive: { minBp: 140, maxBp: 159, riskLevel: "निम्न जोखिम (Low TOD Risk)" },
        hypertensive: { minBp: 160, maxBp: 179, riskLevel: "मध्यम जोखिम (Moderate TOD Risk)" },
        severelyHypertensive: { minBp: 180, riskLevel: "अति-गंभीर जोखिम (Severe Target Organ Damage Risk: Detached retina, stroke, encephalopathy)" }
      }
    },

    /**
     * Calculates precision IRIS CKD Stage, substages, and generates targeted multimodal therapy.
     * @param {string} species - "canine" or "feline"
     * @param {number} creatinineMgDl - Blood Serum Creatinine in mg/dL
     * @param {number} sdmaMicrogDl - Serum Symmetric Dimethylarginine in mcg/dL
     * @param {number} upcr - Urine Protein-to-Creatinine Ratio
     * @param {number} systolicBp - Systolic Blood Pressure in mmHg
     */
    calculateIrisCkdStage: function (species, creatinineMgDl, sdmaMicrogDl, upcr, systolicBp) {
      const sp = (species || "canine").toLowerCase();
      const creat = parseFloat(creatinineMgDl);
      const sdma = parseFloat(sdmaMicrogDl) || 10;
      const uProt = parseFloat(upcr);
      const bp = parseFloat(systolicBp);

      if (isNaN(creat) || creat <= 0) {
        return { error: "अमान्य सीरम क्रिएटिनिन मान (Invalid Serum Creatinine Value)." };
      }

      let stage = 1;
      let stageNameEn = "";
      let stageNameHi = "";
      let functionalRenalMassLoss = "";

      if (sp === "feline") {
        if (creat < 1.6) {
          stage = (sdma > 14) ? 1 : 1;
          stageNameEn = "IRIS Stage 1 Feline CKD";
          stageNameHi = "चरण 1 मार्जार क्रोनिक वृक्क रोग (प्रारंभिक / सब-क्लिनिकल)";
          functionalRenalMassLoss = "< 66% नेफ्रॉन क्षति (Non-azotemic, renal reserve reduced)";
        } else if (creat >= 1.6 && creat <= 2.8) {
          stage = 2;
          stageNameEn = "IRIS Stage 2 Feline CKD";
          stageNameHi = "चरण 2 मार्जार क्रोनिक वृक्क रोग (हल्की एजोटेमिया)";
          functionalRenalMassLoss = "66% से 75% नेफ्रॉन क्षति (Mild azotemia)";
        } else if (creat >= 2.9 && creat <= 5.0) {
          stage = 3;
          stageNameEn = "IRIS Stage 3 Feline CKD";
          stageNameHi = "चरण 3 मार्जार क्रोनिक वृक्क रोग (मध्यम एजोटेमिया व यूरिमिया)";
          functionalRenalMassLoss = "75% से 90% नेफ्रॉन क्षति (Moderate azotemia & systemic signs)";
        } else {
          stage = 4;
          stageNameEn = "IRIS Stage 4 Feline CKD";
          stageNameHi = "चरण 4 मार्जार क्रोनिक वृक्क रोग (गंभीर अंतिम अवस्था वृक्क विफलता)";
          functionalRenalMassLoss = "> 90% नेफ्रॉन क्षति (Severe azotemia, end-stage uremic crisis)";
        }
      } else {
        // Canine
        if (creat < 1.4) {
          stage = 1;
          stageNameEn = "IRIS Stage 1 Canine CKD";
          stageNameHi = "चरण 1 श्वान क्रोनिक वृक्क रोग (प्रारंभिक / सब-क्लिनिकल)";
          functionalRenalMassLoss = "< 66% नेफ्रॉन क्षति (Non-azotemic, elevated SDMA / inadequate concentrating ability)";
        } else if (creat >= 1.4 && creat <= 2.8) {
          stage = 2;
          stageNameEn = "IRIS Stage 2 Canine CKD";
          stageNameHi = "चरण 2 श्वान क्रोनिक वृक्क रोग (हल्की एजोटेमिया)";
          functionalRenalMassLoss = "66% से 75% नेफ्रॉन क्षति (Mild azotemia, polyuria / polydipsia)";
        } else if (creat >= 2.9 && creat <= 5.0) {
          stage = 3;
          stageNameEn = "IRIS Stage 3 Canine CKD";
          stageNameHi = "चरण 3 श्वान क्रोनिक वृक्क रोग (मध्यम एजोटेमिया)";
          functionalRenalMassLoss = "75% से 90% नेफ्रॉन क्षति (Moderate azotemia, systemic uremic signs)";
        } else {
          stage = 4;
          stageNameEn = "IRIS Stage 4 Canine CKD";
          stageNameHi = "चरण 4 श्वान क्रोनिक वृक्क रोग (गंभीर अंतिम अवस्था)";
          functionalRenalMassLoss = "> 90% नेफ्रॉन क्षति (Severe azotemia, high mortality risk)";
        }
      }

      // Proteinuria Substaging
      let proteinuriaSubstage = "उपलब्ध नहीं (Not assessed)";
      let proteinuriaIsSignificant = false;
      if (!isNaN(uProt)) {
        if (sp === "feline") {
          if (uProt < 0.2) proteinuriaSubstage = "Non-Proteinuric (UPCR < 0.2)";
          else if (uProt <= 0.4) proteinuriaSubstage = "Borderline Proteinuric (UPCR 0.2 - 0.4)";
          else {
            proteinuriaSubstage = "Proteinuric (UPCR > 0.4) - हस्तक्षेप अनिवार्य";
            proteinuriaIsSignificant = true;
          }
        } else {
          if (uProt < 0.2) proteinuriaSubstage = "Non-Proteinuric (UPCR < 0.2)";
          else if (uProt <= 0.5) proteinuriaSubstage = "Borderline Proteinuric (UPCR 0.2 - 0.5)";
          else {
            proteinuriaSubstage = "Proteinuric (UPCR > 0.5) - हस्तक्षेप अनिवार्य";
            proteinuriaIsSignificant = true;
          }
        }
      }

      // Hypertension Substaging
      let bpSubstage = "उपलब्ध नहीं (Not assessed)";
      let requiresAntihypertensive = false;
      if (!isNaN(bp)) {
        if (bp < 140) bpSubstage = "Normotensive (< 140 mmHg) - सामान्य";
        else if (bp <= 159) bpSubstage = "Prehypertensive (140 - 159 mmHg) - पूर्व-उच्च रक्तचाप";
        else if (bp <= 179) {
          bpSubstage = "Hypertensive (160 - 179 mmHg) - उच्च रक्तचाप (उपचार आवश्यक)";
          requiresAntihypertensive = true;
        } else {
          bpSubstage = "Severely Hypertensive (>= 180 mmHg) - अति-गंभीर उच्च रक्तचाप (नेत्र व मस्तिष्क आघात जोखिम)";
          requiresAntihypertensive = true;
        }
      }

      // Therapeutic Interventions
      const dietaryRecommendations = [];
      const medicalInterventions = [];

      if (stage === 1) {
        dietaryRecommendations.push("सामान्य या प्रारंभिक वृक्क आहार (Early Renal Diet); फॉस्फोरस स्तर को नियंत्रित रखें।");
        dietaryRecommendations.push("ताजा, स्वच्छ पेयजल की असीमित उपलब्धता सुनिश्चित करें (Water fountains to encourage drinking).");
        if (proteinuriaIsSignificant) {
          medicalInterventions.push("ग्लोमेरुलर कैपिलरी हाइपरटेंशन नियंत्रण हेतु ARB (Telmisartan 1 mg/kg PO q24h) या ACE-Inhibitor (Benazepril 0.25-0.5 mg/kg PO q24h)।");
        }
      } else if (stage === 2) {
        dietaryRecommendations.push("प्रतिबंधित फॉस्फोरस व नियंत्रित उच्च जैविक मूल्य प्रोटीन युक्त चिकित्सकीय वृक्क आहार (Prescription Renal Diet - Hills k/d, Royal Canin Renal).");
        dietaryRecommendations.push("ओमेगा-3 फैटी एसिड (EPA/DHA 100 mg/kg) संवर्धन द्वारा वृक्क प्रदाह में कमी।");
        if (proteinuriaIsSignificant) {
          medicalInterventions.push("एंटी-प्रोटीन्यूरिक थेरेपी: Telmisartan (Semintra) 1 mg/kg PO q24h अथवा Benazepril।");
        }
        medicalInterventions.push("सीरम फॉस्फोरस यदि > 4.6 mg/dL है, तो आंतों में फॉस्फोरस बंधक (Aluminum Hydroxide 30-50 mg/kg/day भोजन के साथ या Calcium Carbonate / Chitosan binder)।");
      } else if (stage === 3) {
        dietaryRecommendations.push("सख्त चिकित्सीय रीनल डाइट (Phosphorus-restricted, low-protein, high-calorie wet diet).");
        medicalInterventions.push("नियमित सबक्यूटेनियस द्रव चिकित्सा (Warm SC Balanced Fluids - Plasmalyte / Ringer's 50-100 mL/kg सप्ताह में 2-3 बार या आवश्यकतानुसार)।");
        medicalInterventions.push("फॉस्फोरस नियंत्रण: लक्ष्य < 5.0 mg/dL (Enteric phosphate binders mandatory).");
        medicalInterventions.push("यूरिमिक गैस्ट्राइटिस व मतली नियंत्रण: Maropitant (Cerenia) 1 mg/kg PO/SC q24h या Ondansetron 0.5 mg/kg PO q8-12h; H2-ब्लॉकर Famotidine 0.5 mg/kg PO q24h।");
        medicalInterventions.push("मेटाबोलिक एसिडोसिस सुधार: पोटेशियम साइट्रेट (Potassium Citrate 40-75 mg/kg PO q12h) यदि बाइकार्बोनेट < 16 mmol/L है।");
      } else {
        // Stage 4
        dietaryRecommendations.push("अत्यधिक स्वादिष्ट, उच्च कैलोरी, निम्न फॉस्फोरस आहार। भूख न होने पर एपेपेटाइट स्टिमुलेंट (Capromorelin 3 mg/kg PO q24h श्वान में; Mirtazapine 2 mg/cat ट्रांसडर्मल मार्जार में)।");
        dietaryRecommendations.push("अंतिम अवस्था में आहार जबरन न खिलाएं; भोजन से अरुचि (Food aversion) से बचाव हेतु इसोफैगोस्टॉमी फीडिंग ट्यूब (E-tube) पर विचार करें।");
        medicalInterventions.push("दैनिक सबक्यूटेनियस (SC) फ्लुइड थेरेपी या कंटीन्यूअस आईवी फ्लुइड सपोर्ट।");
        medicalInterventions.push("अरिनमिया (Non-regenerative anemia of CKD) सुधार: Darbepoetin alfa (1 mcg/kg SC साप्ताहिक) + Iron Dextran (50 mg/kg IM मासिक) जब HCT < 20% हो।");
        medicalInterventions.push("फॉस्फोरस लक्ष्य: < 6.0 mg/dL। यूरिमिक विषाक्तता हेतु सक्रिय चारकोल या ओरल एस्ट्रिबेंट्स।");
      }

      if (requiresAntihypertensive) {
        if (sp === "feline") {
          medicalInterventions.push("मार्जार प्रथम पंक्ति एंटी-हाइपरटेंसिव: Amlodipine Besylate 0.625 mg से 1.25 mg प्रति बिल्ली PO q24h।");
        } else {
          medicalInterventions.push("श्वान एंटी-हाइपरटेंसिव: Telmisartan 1 mg/kg PO q24h + Amlodipine 0.1-0.2 mg/kg PO q24h संयुक्त चिकित्सा।");
        }
      }

      return {
        species: sp,
        measuredCreatinine: creat,
        measuredSdma: sdma,
        irisStage: stage,
        stageNameEn: stageNameEn,
        stageNameHi: stageNameHi,
        functionalLossDescription: functionalRenalMassLoss,
        proteinuriaSubstage: proteinuriaSubstage,
        hypertensionSubstage: bpSubstage,
        dietaryProtocolHi: dietaryRecommendations,
        medicalInterventionsHi: medicalInterventions
      };
    },

    // =========================================================================
    // 3. MULTIMODAL CHRONIC OSTEOARTHRITIS (OA) PAIN LADDER
    // =========================================================================
    chronicPainLadder: {
      step1: {
        stageNameEn: "Step 1: Mild / Early Osteoarthritis (Mild stiffness, hesitates to jump)",
        stageNameHi: "चरण 1: हल्का / प्रारंभिक संधि शोथ (उठने में हल्की अकड़न, कूदने में संकोच)",
        coreStrategies: [
          "वजन प्रबंधन (Weight Optimization): शारीरिक स्थिति स्कोर (BCS) 4.5/9 का लक्ष्य। वजन में 6-8% कमी जोड़ों पर यांत्रिक दबाव को नाटकीय रूप से घटाती है।",
          "पर्यावरणीय अनुकूलन (Environmental Modifications): फिसलन रहित मैट (Non-slip runners), सोफे या कार हेतु रैंप (Ramps), ऑर्थोपेडिक मेमोरी फोम गद्दे।",
          "ओमेगा-3 फैटी एसिड (EPA + DHA): 100 - 150 mg/kg प्रति दिन (COX-2 व PGE-2 प्रदाहक पाथवे को डाउनरेगुलेट करता है)।",
          "चोंड्रोप्रोटेक्टिव्स: Undenatured Type II Collagen (UC-II 40 mg/day) ओरल टॉलरेंस तंत्र द्वारा आर्टिकुलर कार्टिलेज विनाश रोकता है; Glucosamine-Chondroitin + Green Lipped Mussel extract।"
        ]
      },
      step2: {
        stageNameEn: "Step 2: Moderate OA Pain (Persistent limping, vocalizing upon rising)",
        stageNameHi: "चरण 2: मध्यम क्रोनिक दर्द (निरंतर लंगड़ापन, उठते समय दर्द, मांसपेशियों का क्षरण)",
        coreStrategies: [
          "लक्ष्यित मोनोक्लोनल एंटीबॉडी (Targeted Anti-NGF mAbs):",
          "  - श्वान (Canine): Bedinvetmab (Librela) 0.5 - 1.0 mg/kg SC प्रत्येक 28 दिन पर। नर्व ग्रोथ फैक्टर (NGF) को बांधकर पेरिफेरल व सेंट्रल सेंसिटाइजेशन को रोकता है (किडनी व लिवर पर न्यूनतम विषाक्तता)।",
          "  - मार्जार (Feline): Frunevetmab (Solensia) 1.0 - 2.8 mg/kg SC प्रत्येक 28 दिन पर। मार्जार संधिशोथ दर्द में क्रांतिकारी राहत।",
          "वैकल्पिक या संयुक्त NSAIDs (नियमित रीनल/हिपेटिक पैनल अनिवार्य):",
          "  - श्वान: Grapiprant (Galliprant - EP4 रिसेप्टर विरोधी) 2 mg/kg PO q24h (किडनी/जीआई पर सुरक्षित) अथवा Meloxicam 0.1 mg/kg PO q24h अथवा Firocoxib 5 mg/kg PO q24h।",
          "  - मार्जार: Robenacoxib (Onsior) 1-2 mg/kg PO q24h (अधिकतम 6 दिन) अथवा सूक्ष्म खुराक Meloxicam (0.01-0.02 mg/kg PO q24-48h सख्त निगरानी में)।",
          "सावधानी: कभी भी दो NSAIDs या एक NSAID को कॉर्टिकोस्टेरॉइड के साथ एक साथ न दें (न्यूनतम 5-7 दिन का वॉशआउट पीरियड अनिवार्य)।"
        ]
      },
      step3: {
        stageNameEn: "Step 3: Severe / Chronic Maladaptive Breakthrough Pain",
        stageNameHi: "चरण 3: गंभीर / दुर्दम्य ब्रेकथ्रू दर्द (न्यूरोपैथिक कंपोनेंट व सेंट्रल वाइंड-अप)",
        coreStrategies: [
          "गैबापेंटिन (Gabapentin): 5 - 10 mg/kg PO q8-12h (न्यूरोपैथिक एलोडायनिया व स्पाइनल कॉर्ड हाइपरएक्साइटेबिलिटी नियंत्रण हेतु)। आवश्यकतानुसार 15-20 mg/kg तक टाइट्रेट करें।",
          "अमांटाडाइन (Amantadine): 3 - 5 mg/kg PO q24h (NMDA-रिसेप्टर एंटागोनिस्ट; सेंट्रल नर्वस सिस्टम में 'वाइंड-अप' फिनोमेनन को समाप्त करता है)।",
          "ओपिओइड सप्लीमेंटेशन:",
          "  - श्वान: Codeine Sulfate 0.5 - 1.5 mg/kg PO q8h (श्वान में ट्रामाडोल का म्यू-रिसेप्टर मेटाबोलाइट M1 न्यूनतम बनता है, अतः कोडीन अधिक प्रभावी है)।",
          "  - मार्जार: Buprenorphine 0.015 - 0.03 mg/kg BMT (मुख श्लेष्मा द्वारा) q8-12h।"
        ]
      },
      step4: {
        stageNameEn: "Step 4: Refractory End-Stage Joint Disease & Palliative Bedside Care",
        stageNameHi: "चरण 4: लाइलाज अंतिम अवस्था संधि विनाश एवं पैलिएटिव बेडसाइड केयर",
        coreStrategies: [
          "इंट्रा-आर्टिकुलर इंजेक्शन (Intra-Articular Biologicals): हायल्यूरोनिक एसिड (Hyaluronic Acid) + प्लेटलेट-रिच प्लाज्मा (Autologous PRP) जोड़ के भीतर स्टेराइल आरोपण।",
          "फिजिकल रिहैबिलिटेशन (Physiotherapy): क्लास-IV डीप टिशू लेजर (Photobiomodulation), हाइड्रोथेरेपी (अंडरवाटर ट्रेडमिल), निष्क्रिय रेंज ऑफ मोशन (PROM) व्यायाम।",
          "सपोर्टिव डिवाइसेज: हेल्प-एम-अप हार्नेस (Help 'Em Up Harness), व्हीलचेयर कार्ट्स, एब्डोमिनल स्लिंग्स।"
        ]
      }
    },

    // =========================================================================
    // 4. HHHHHMM QUALITY OF LIFE (QOL) HOSPICE EVALUATOR (DR. ALICE VILLALOBOS)
    // =========================================================================
    /**
     * Calculates Villalobos HHHHHMM Quality of Life Score for terminal & hospice patients.
     * Each parameter scored 0 (worst) to 10 (ideal / pain-free). Total Max: 70.
     * @param {object} scoresObj - { hurt, hunger, hydration, hygiene, happiness, mobility, moreGoodDays }
     */
    calculateQolScore: function (scoresObj) {
      const s = scoresObj || {};
      const hurt = Math.min(Math.max(parseFloat(s.hurt) || 0, 0), 10);
      const hunger = Math.min(Math.max(parseFloat(s.hunger) || 0, 0), 10);
      const hydration = Math.min(Math.max(parseFloat(s.hydration) || 0, 0), 10);
      const hygiene = Math.min(Math.max(parseFloat(s.hygiene) || 0, 0), 10);
      const happiness = Math.min(Math.max(parseFloat(s.happiness) || 0, 0), 10);
      const mobility = Math.min(Math.max(parseFloat(s.mobility) || 0, 0), 10);
      const moreGoodDays = Math.min(Math.max(parseFloat(s.moreGoodDays) || 0, 0), 10);

      const totalScore = hurt + hunger + hydration + hygiene + happiness + mobility + moreGoodDays;

      let statusEn = "";
      let statusHi = "";
      let clinicalInterpretationHi = "";
      let hospiceActionPlanHi = [];

      if (totalScore >= 50) {
        statusEn = "Good to Excellent Quality of Life (Score >= 50 / 70)";
        statusHi = "उत्कृष्ट से उत्तम जीवन गुणवत्ता (स्कोर >= 50/70 - आरामदायक अवस्था)";
        clinicalInterpretationHi = "रोगी वर्तमान उपशामक चिकित्सा (Palliative care) से पूर्णतः सहज व आनंदित है।";
        hospiceActionPlanHi.push("वर्तमान एनाल्जेसिक व पोषण प्रोटोकॉल निरंतर जारी रखें।");
        hospiceActionPlanHi.push("प्रति 2-4 सप्ताह में HHHHHMM स्कोर का पुनर्मूल्यांकन करें।");
      } else if (totalScore >= 35 && totalScore < 50) {
        statusEn = "Acceptable Quality of Life with Palliative Support (Score 35 - 49 / 70)";
        statusHi = "स्वीकार्य जीवन गुणवत्ता (स्कोर 35-49 - सतत देखरेख आवश्यक)";
        clinicalInterpretationHi = "जीवन की गुणवत्ता स्वीकार्य है, किंतु कुछ क्षेत्रों (उदा. दर्द, गतिशीलता या जलयोजन) में अतिरिक्त हस्तक्षेप की आवश्यकता है।";
        hospiceActionPlanHi.push("कम अंक वाले विशिष्ट क्षेत्रों का विश्लेषण करें (उदा. यदि Hurt < 5 है, तो दर्द निवारक सीढ़ी पर अगले चरण की दवा जोड़ें)।");
        hospiceActionPlanHi.push("भूख बढ़ाने वाली औषधियां (Capromorelin / Mirtazapine) व सबक्यूटेनियस फ्लुइड्स जोड़ें।");
        hospiceActionPlanHi.push("परिवार के साथ साप्ताहिक आधार पर जीवन गुणवत्ता की समीक्षा करें।");
      } else {
        statusEn = "Declining / Poor Quality of Life (Score < 35 / 70 - Suffering Preponderance)";
        statusHi = "चिंताजनक / अत्यंत निम्न जीवन गुणवत्ता (स्कोर < 35 - कष्ट की अधिकता)";
        clinicalInterpretationHi = "पशु निरंतर असुविधा, दर्द या भूख/प्यास की असमर्थता से जूझ रहा है; अच्छे दिनों की तुलना में कष्टकारी दिन अधिक हैं।";
        hospiceActionPlanHi.push("आपातकालीन दर्द निवारक वृद्धि (Aggressive Rescue Analgesia: Opioids, CRI infusions) तुरंत प्रारंभ करें।");
        hospiceActionPlanHi.push("यदि आक्रामक चिकित्सकीय हस्तक्षेप के 24-48 घंटों के पश्चात भी स्कोर < 35 रहता है, तो पशु को असहनीय कष्ट से मुक्ति दिलाने हेतु दयालु इच्छामृत्यु (Compassionate Euthanasia) पर सहानुभूतिपूर्वक विचार करें।");
        hospiceActionPlanHi.push("परिवार को अंत-समय (End-of-life) निर्णय प्रक्रिया एवं शोक परामर्श (Grief Counseling) में सहयोग दें।");
      }

      return {
        totalScoreOutOf70: totalScore,
        parameterBreakdown: {
          hurtScore: hurt,
          hungerScore: hunger,
          hydrationScore: hydration,
          hygieneScore: hygiene,
          happinessScore: happiness,
          mobilityScore: mobility,
          moreGoodDaysScore: moreGoodDays
        },
        statusEn: statusEn,
        statusHi: statusHi,
        clinicalInterpretationHi: clinicalInterpretationHi,
        hospiceActionPlanHi: hospiceActionPlanHi
      };
    },

    // =========================================================================
    // 5. COGNITIVE DYSFUNCTION SYNDROME (CDS) DISHA CHECKLIST
    // =========================================================================
    /**
     * Evaluates Canine/Feline Dementia using DISHA Framework.
     * Parameters scored 0 (absent), 1 (mild/occasional), 2 (moderate), 3 (severe/frequent).
     */
    evaluateDishaScore: function (disorientation, interactions, sleepWake, housetraining, activityChanges) {
      const d = Math.min(Math.max(parseInt(disorientation, 10) || 0, 0), 3);
      const i = Math.min(Math.max(parseInt(interactions, 10) || 0, 0), 3);
      const s = Math.min(Math.max(parseInt(sleepWake, 10) || 0, 0), 3);
      const h = Math.min(Math.max(parseInt(housetraining, 10) || 0, 0), 3);
      const a = Math.min(Math.max(parseInt(activityChanges, 10) || 0, 0), 3);

      const totalScore = d + i + s + h + a; // Max 15

      let impairmentStageEn = "";
      let impairmentStageHi = "";
      let therapeuticProtocolHi = [];

      if (totalScore <= 3) {
        impairmentStageEn = "Mild Cognitive Impairment (Early CDS)";
        impairmentStageHi = "हल्की संज्ञानात्मक दुर्बलता (प्रारंभिक डिमेंशिया)";
        therapeuticProtocolHi.push("आहार में मध्यम-श्रृंखला ट्राइग्लिसराइड्स (MCT Oil 1 mL/kg/day) जोड़ें - यह मस्तिष्क को वैकल्पिक कीटोन ऊर्जा प्रदान करता है।");
        therapeuticProtocolHi.push("एंटीऑक्सीडेंट युक्त आहार (Vitamin E, Vitamin C, L-Carnitine, Alpha-lipoic acid)।");
        therapeuticProtocolHi.push("मानसिक उत्तेजना: दैनिक हल्के खिलौने, सूंघने के खेल (Scent games) व सुसंगत दिनचर्या बनाए रखें।");
      } else if (totalScore <= 8) {
        impairmentStageEn = "Moderate Cognitive Dysfunction Syndrome";
        impairmentStageHi = "मध्यम संज्ञानात्मक शिथिलता (मध्यम डिमेंशिया)";
        therapeuticProtocolHi.push("सेलेजिलीन हाइड्रोक्लोराइड (Selegiline HCl / L-deprenyl): 0.5 - 1.0 mg/kg PO प्रत्येक सुबह। (MAO-B इनहिबिटर - डोपामाइन स्तर बढ़ाता है ও न्यूरोप्रोटेक्शन देता है)।");
        therapeuticProtocolHi.push("एस-एडेनोसिल-मेथियोनीन (SAMe): 20 mg/kg PO खाली पेट (मस्तिष्क में फॉस्फोलिपिड तरलता व ग्लूटाथियोन बढ़ाता है)।");
        therapeuticProtocolHi.push("रात में जागने व बेचैनी हेतु: Melatonin 1-3 mg PO सोने से 30 मिनट पूर्व।");
      } else {
        impairmentStageEn = "Severe Cognitive Dysfunction / Advanced Dementia";
        impairmentStageHi = "गंभीर डिमेंशिया (अंतिम अवस्था संज्ञानात्मक विफलता)";
        therapeuticProtocolHi.push("प्रोपेंटोफिलाइन (Propentofylline - Karsivan): 3 - 5 mg/kg PO q12h (मस्तिष्क सूक्ष्म-रक्तसंचार व ऑक्सीजन आपूर्ति बढ़ाता है)।");
        therapeuticProtocolHi.push("गंभीर रात्रि चिंता व वोकलाइजेशन हेतु: Trazodone 3 - 5 mg/kg PO रात्रि में अथवा Gabapentin 5-10 mg/kg।");
        therapeuticProtocolHi.push("पर्यावरण सुरक्षा: पशु को कोनों में फंसने से बचाने हेतु फर्नीचर अवरोध लगाएं; घर में रात्रि लैंप (Night lights) जलाकर रखें।");
        therapeuticProtocolHi.push("घर के भीतर अतिरिक्त पी-पैड्स (Wee-wee pads) बिछाएं; भ्रमित होने पर डांटने से बचें।");
      }

      return {
        totalDishaScoreOutOf15: totalScore,
        breakdown: {
          disorientation: d,
          socialInteractions: i,
          sleepWakeCycles: s,
          housetrainingLoss: h,
          activityAndAnxiety: a
        },
        impairmentStageEn: impairmentStageEn,
        impairmentStageHi: impairmentStageHi,
        therapeuticProtocolHi: therapeuticProtocolHi
      };
    },

    // =========================================================================
    // 6. LARGE ANIMAL GERIATRIC CARE (HORSES & SENIOR RUMINANTS)
    // =========================================================================
    largeAnimalGeriatrics: {
      equinePpidCushings: {
        diseaseNameEn: "Equine Pituitary Pars Intermedia Dysfunction (PPID / Cushing's Disease)",
        diseaseNameHi: "अश्व पिट्यूटरी पार्स इंटरमीडिया शिथिलता (कुशिंग्स रोग)",
        pathophysiology: "हाइपोथैलेमस के डोपामिनर्जिक न्यूरॉन्स का अपक्षय -> इंटरमीडिएट लोब पर निरोधात्मक नियंत्रण का ह्रास -> अत्यधिक ACTH, अल्फा-MSH व बीटा-एंडोर्फिन का स्राव।",
        clinicalHallmarks: [
          "हिर्सुटिज्म / हाइपरट्रिकोसिस (Hirsutism): असामान्य रूप से लंबे, घुंघराले बाल जो गर्मियों में नहीं झड़ते",
          "क्रोनिक व रिकरेंट लैमिनाइटिस (Laminitis / Founder) - खुरों में गंभीर दर्द",
          "सुस्ती, मांसपेशियों की बर्बादी विशेषकर पीठ पर (Swayback posture), लटकता हुआ पेट (Potbelly)",
          "पॉलीयूरिया ও पॉलीडिप्सिया (PU/PD); घाव भरने में असामान्य देरी व बार-बार इन्फेक्शन"
        ],
        diagnosticEndocrineTesting: "प्लाज्मा बेसलाइन रेस्टिंग ACTH सांद्रता (शरद ऋतु में रेफरेंस रेंज मौसमी रूप से बढ़ती है) अथवा TRH स्टिम्युलेशन टेस्ट।",
        lifelongTherapy: [
          "पर्गोलाइड मेसाइलेट (Pergolide Mesylate - Prascend): 0.002 mg/kg PO q24h (वयस्क घोड़े हेतु 1 mg प्रति दिन से प्रारंभ करें)। 4-6 सप्ताह बाद ACTH पुनः जांचकर खुराक 2-3 mg तक समायोजित करें।",
          "पोषण प्रबंधन: कम गैर-संरचनात्मक कार्बोहाइड्रेट (Low Non-Structural Carbohydrate - NSC < 10%) युक्त घास या चारा। गुड़, शीरा व उच्च स्टार्च अनाज पूर्णतः प्रतिबंधित करें।",
          "ग्रीष्मकाल में संपूर्ण शरीर के लंबे बालों की नियमित क्लिपिंग (Body clipping) ताकि हीट स्ट्रोक से बचाव हो सके।",
          "नियमित खुर तराशना (Farriery) एवं रेडियोलॉजिकल निगरानी।"
        ]
      },

      dentitionFailureSeniorStock: {
        conditionNameEn: "Geriatric Dentition Breakdown in Senior Horses & Cattle",
        conditionNameHi: "वृद्ध अश्व व गोवंश में दंत पतन एवं चर्वण विफलता",
        pathophysiology: "दांतों के क्राउन का मसूड़ों तक घिस जाना (Smooth mouth / Cupped teeth), वेव माउथ, या दांतों का गिरना, जिससे चारा पीसना (mastication) असंभव हो जाता है।",
        clinicalPresentation: "क्विडिंग (अधचबाया सूखा चारा मुंह से गिराना), गोबर में 2-3 सेमी से लंबे बिना पचे रेशे आना, भूख होते हुए भी हड्डियों का ढांचा बन जाना।",
        feedingStrategyHi: [
          "सूखा कठोर चारा या लंबी घास पूर्णतः बंद करें (यह इसोफेजियल चोक व इम्पैक्शन कॉलिक का मुख्य कारण बनता है)।",
          "कंप्लीट सीनियर एक्सट्रूडेड पेलेट्स (Senior Extruded Feed) को गर्म पानी में 15 मिनट भिगोकर दलिया (soup/mash) बनाकर दिन में 3-4 बार खिलाएं।",
          "चुकंदर का गूदा (Soaked Beet Pulp) तथा उच्च-वसा राइस ब्रान (Stabilized Rice Bran) ऊर्जा व सुरक्षित फाइबर हेतु दें।",
          "पशु को युवा व आक्रामक पशुओं से अलग बांधकर शांतिपूर्वक खाने का पर्याप्त समय दें।"
        ]
      },

      decubitalUlcerAndDownerCare: {
        conditionNameEn: "Decubital Ulcers & Recumbency Management in Downer Cattle & Horses",
        conditionNameHi: "लेटे हुए वृद्ध पशुओं में प्रेशर घाव (बेडसोर) एवं डाउमर प्रबंधन",
        preventiveNursingHi: [
          "बिछावन (Bedding): कम से कम 12 से 18 इंच गहरा सूखा रेत (Sand bedding सर्वश्रेष्ठ है क्योंकि यह समान दबाव बांटता है) अथवा सूखी पराली की मोटी परत।",
          "टर्न-ओवर शेड्यूल: लेटे हुए पशु को प्रत्येक 2 से 4 घंटे में एक करवट से दूसरी करवट पलटें (यह फेफड़ों में हाइपोस्टैटिक कंजेशन व रेडियल नर्व पैरालिसिस रोकता है)।",
          "दबाव बिंदुओं की सुरक्षा: कूल्हे (Tuber coxae), कंधे (Olecranon) व घुटने के नीचे फोम पैडिंग या रबर टायर रिंग्स लगाएं।",
          "उठाने में सहायता: पेल्विक क्लैंप (Hip lifter) या बॉडी स्लिंग द्वारा दिन में 2 बार 20-30 मिनट सहारा देकर खड़ा करें ताकि मांसपेशियों की टोन बनी रहे।"
        ]
      }
    },

    // =========================================================================
    // 7. COMPASSIONATE EUTHANASIA PROTOCOL & MEDICAL CHECKLIST
    // =========================================================================
    compassionateEuthanasiaProtocol: {
      guidingPhilosophyHi: "पशु को अंतिम क्षणों में किसी भी प्रकार के दर्द, भय, सांस फूलने या पेशीय ऐंठन से मुक्त एक शांतिपूर्ण, सम्मानजनक व पीड़ारहित विदाई सुनिश्चित करना।",
      
      stage1PreSedation: {
        objective: "गहन सर्जिकल एनेस्थीसिया / अचेतनता उत्पन्न करना जिससे अंतिम इंजेक्शन के समय कोई उत्तेजना, वोकलाइजेशन या एगोनेल रिफ्लेक्स न हो।",
        protocols: {
          canine: [
            "संयोजन A: Dexmedetomidine 0.01-0.02 mg/kg + Butorphanol 0.1-0.2 mg/kg IM/IV",
            "संयोजन B (अत्यधिक आक्रामक या भयभीत श्वान): Tiletamine-Zolazepam (Telazol) 3-5 mg/kg IM",
            "संयोजन C: Ketamine 5 mg/kg + Midazolam 0.25 mg/kg IV (गहन एनेस्थीसिया)"
          ],
          feline: [
            "संयोजन A: Ketamine 5-10 mg/kg + Dexmedetomidine 0.02 mg/kg + Butorphanol 0.2 mg/kg IM (एक ही सिरिंज में 'किटी मैजिक')",
            "संयोजन B: Alfaxalone 2-3 mg/kg IM/SC"
          ],
          equineLargeAnimal: [
            "Xylazine Hydrochloride 1.1 mg/kg IV धीमा बोलस",
            "5 मिनट बाद गहन सिडेशन पर: Ketamine Hydrochloride 2.2 mg/kg IV (पशु सुरक्षित रूप से नीचे लेट जाता है)"
          ]
        }
      },

      stage2OverdoseAdministration: {
        objective: "मस्तिष्क के कॉर्टिकल व कार्डियोरेस्पिरेटरी केंद्रों का तीव्र, पीड़ारहित अवसाद व कार्डियक अरेस्ट।",
        approvedAgents: [
          "सोडियम पेंटोबार्बिटल (Sodium Pentobarbital 20% - 390 mg/mL euthanasia solution):",
          "  - श्वान व मार्जार: 80 - 100 mg/kg IV तीव्र गति से सुव्यवस्थित IV कैथेटर द्वारा।",
          "  - अश्व व गोवंश: 1 mL प्रति 5 किग्रा शारीरिक वजन (लगभग 80-100 mL प्रति 500 किग्रा वयस्क अश्व) 14G जुगुलर कैथेटर द्वारा निरंतर तीव्र धारा से।",
          "वैकल्पिक (यदि शिरापरक मार्ग असंभव है - केवल पूर्णतः अचेत/एनेस्थेटाइज्ड पशु में): अंतःहृदयी (Intracardiac - IC) या अंतःपेरिटोनियल (IP - 3 गुना खुराक)।"
        ]
      },

      stage3DeathConfirmationChecklist: {
        cardinalRule: "जब तक निम्नलिखित सभी 5 संकेतों की स्वतंत्र पुष्टि न हो जाए, पशु को मृत घोषित न करें:",
        checklist: [
          { itemEn: "Cessation of Respiration", itemHi: "सभी श्वसन एवं एगोनेल गैसपिंग (Agonal gasps) का पूर्ण अभाव।" },
          { itemEn: "Auscultation of Heart", itemHi: "स्टेथोस्कोप द्वारा न्यूनतम 3 निरंतर मिनट तक हृदय की धड़कन का पूर्णतः अनुपस्थित होना।" },
          { itemEn: "Absence of Peripheral Pulses", itemHi: "फेमोरल या कैरोटिड धमनी में किसी भी प्रकार की स्पंदनहीनता की पुष्टि।" },
          { itemEn: "Loss of Corneal & Pupillary Reflexes", itemHi: "कॉर्नियल रिफ्लेक्स का शून्य होना; पुतलियों का अत्यधिक फैलना (Mydriasis) व प्रकाश पर अपरिवर्तित रहना।" },
          { itemEn: "Rigor & Loss of Muscle Tone", itemHi: "संपूर्ण शारीरिक पेशीय टोन का शिथिल पड़ जाना एवं जबड़े का ढीला हो जाना।" }
        ]
      }
    }
  };

  // Seal namespace to prevent accidental runtime mutations
  Object.freeze(window.VetcareApp.ClinicalData.GeriatricsPalliative.irisCkdFramework);
  Object.freeze(window.VetcareApp.ClinicalData.GeriatricsPalliative.chronicPainLadder);
  Object.freeze(window.VetcareApp.ClinicalData.GeriatricsPalliative.largeAnimalGeriatrics);
  Object.freeze(window.VetcareApp.ClinicalData.GeriatricsPalliative.compassionateEuthanasiaProtocol);

  // Ready signal
  if (window.VetcareApp.showToast) {
    window.VetcareApp.showToast("वृद्ध रोग एवं उपशामक चिकित्सा मॉड्यूल सक्रिय (Geriatrics & Palliative Module Loaded)", "success");
  }
})();
