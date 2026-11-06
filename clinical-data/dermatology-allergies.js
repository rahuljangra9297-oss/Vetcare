// Vetcare AI OS - Veterinary Dermatology, Allergy Panels, Ectoparasitic Mange & Pruritus Management Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE INITIALIZATION & ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  /**
   * Veterinary Dermatology, Diagnostic Cytology & Clinical Allergy Systems Architecture
   * Engineered in compliance with ICADA (International Committee on Allergic Diseases of Animals),
   * ESVD (European Society of Veterinary Dermatology), and ISO-VET 2026 Clinical Standards.
   */
  window.VetcareApp.ClinicalData.DermatologyAllergies = {
    metadata: {
      subsystem: "Veterinary Dermatology & Anti-Pruritic Biologics Engine",
      version: "2026.4.4-PROD",
      isoVetStandard: "ISO-VET-DERM-2026",
      supportedTaxa: ["Canine", "Feline", "Bovine", "Bubaline", "Equine", "Caprine", "Ovine"],
      authoritativeSource: "ICADA Atopic Dermatitis Guidelines, Favrot Criteria & Diagnostic Cytology Matrix"
    },

    // =========================================================================
    // 2. PRURITUS VISUAL ANALOG SCALE (pVAS 0-10) EVALUATOR
    // =========================================================================
    pvasScaleLevels: {
      0: {
        severityEn: "Normal Dog (Pruritus Absent)",
        severityHi: "सामान्य श्वान (खुजली पूर्णतः अनुपस्थित / शून्य)",
        clinicalDescriptionEn: "Itching is not present, or only occurs within normal physiological bounds (brief scratch after waking or shaking).",
        clinicalDescriptionHi: "खुजली पूरी तरह अनुपस्थित है या केवल सामान्य शारीरिक सीमाओं में कभी-कभार होती है।",
        sleepImpact: "शून्य व्यवधान (Zero sleep disturbance).",
        urgencyLevel: "नियमित त्वचा निगरानी (Routine hygiene care)."
      },
      1: {
        severityEn: "Very Mild Pruritus",
        severityHi: "अति-हल्की खुजली (नाममात्र खुजलाना)",
        clinicalDescriptionEn: "Occasional episodes of mild scratching or licking. Easily distracted by food or play.",
        clinicalDescriptionHi: "कभी-कभार हल्का खुजलाना या चाटना। भोजन या खेल की आवाज पर तुरंत ध्यान भटक जाता है।",
        sleepImpact: "नींद में कोई व्यवधान नहीं।",
        urgencyLevel: "सतर्कता एवं एंटी-एलर्जिक शैम्पू स्नान।"
      },
      2: {
        severityEn: "Mild Pruritus",
        severityHi: "हल्की खुजली (स्पष्ट खुजलाहट)",
        clinicalDescriptionEn: "Definite increase in scratching, licking, or head shaking, but does not interfere with daily routine.",
        clinicalDescriptionHi: "खुजलाने या सिर हिलाने में स्पष्ट वृद्धि, किंतु भोजन या दैनिक दिनचर्या बाधित नहीं होती।",
        sleepImpact: "नींद में दुर्लभ बाधा।",
        urgencyLevel: "पिस्सू व टिक निवारक उपचार का सत्यापन।"
      },
      3: {
        severityEn: "Mild to Moderate Pruritus",
        severityHi: "हल्की से मध्यम खुजली",
        clinicalDescriptionEn: "Regular periods of scratching while lying down. Can still be easily commanded to stop.",
        clinicalDescriptionHi: "आराम करते समय नियमित खुजलाहट। पुकारने पर खुजलाना बंद कर देता है।",
        sleepImpact: "रात्रि में 1-2 बार जागना।",
        urgencyLevel: "प्राथमिक साइटोलॉजिकल टेप स्ट्रिप परीक्षण।"
      },
      4: {
        severityEn: "Moderate Pruritus",
        severityHi: "मध्यम खुजली (भोजन व खेल बाधित)",
        clinicalDescriptionEn: "Scratching frequently interrupts eating, playing, or walking. Rubs muzzle or flanks against carpet/furniture.",
        clinicalDescriptionHi: "खुजली के कारण भोजन करने, खेलने या चलने में बार-बार रुकावट। कालीन या सोफे पर मुंह रगड़ना।",
        sleepImpact: "नींद में मध्यम रुकावट (रात में कई बार उठना)।",
        urgencyLevel: "सक्रिय एंटी-प्रुरिटिक थेरेपी (Apoquel / Cytopoint) प्रारंभ करना आवश्यक।"
      },
      5: {
        severityEn: "Moderate to Serious Pruritus",
        severityHi: "मध्यम से गंभीर खुजली",
        clinicalDescriptionEn: "Prolonged bouts of scratching and foot chewing. Mild erythema, salivary staining on paws.",
        clinicalDescriptionHi: "लंबे समय तक पंजों को चबाना व खुजलाना। पंजों पर लार के भूरे धब्बे व लालिमा।",
        sleepImpact: "नींद में नियमित व्यवधान; मालिक की नींद भी बाधित।",
        urgencyLevel: "द्वैतीयक जीवाणु/यीस्ट संक्रमण की साइटोलॉजी व उपचार।"
      },
      6: {
        severityEn: "Moderate-Severe Pruritus",
        severityHi: "मध्यम-तीव्र खुजली (शारीरिक घाव प्रारंभ)",
        clinicalDescriptionEn: "Frequent intense episodes throughout the day. Moderate alopecia, excoriations, lichenification starting.",
        clinicalDescriptionHi: "दिन भर में लगातार तीव्र खुजली के दौरे। बाल झड़ना (एलोपेसिया), त्वचा छिलना व मोटी होना।",
        sleepImpact: "रात्रि में अत्यधिक बेचैनी व करवट बदलना।",
        urgencyLevel: "त्वरित बहुआयामी चिकित्सा (एंटी-प्रुरिटिक + रोगाणुरोधी)।"
      },
      7: {
        severityEn: "Severe Pruritus",
        severityHi: "गंभीर खुजली (रात में लगातार जागना)",
        clinicalDescriptionEn: "Scratching almost continuous when not actively eating or sleeping. Wakes up multiple times at night scratching.",
        clinicalDescriptionHi: "जागते समय लगभग निरंतर खुजलाहट। रात में बार-बार उठकर जोर-जोर से खुजलाना।",
        sleepImpact: "नींद में गंभीर व्यवधान (< 4 घंटे अखंड नींद)।",
        urgencyLevel: "उच्च प्राथमिकता (High Urgency) - आपातकालीन खुजली शमन आवश्यक।"
      },
      8: {
        severityEn: "Very Severe Pruritus",
        severityHi: "अति-गंभीर खुजली (गंभीर स्व-क्षति / एक्सकोरिएशन)",
        clinicalDescriptionEn: "Extensive hair loss, bleeding hot spots, deep skin folds inflammation. Difficult to distract even with high-value treats.",
        clinicalDescriptionHi: "व्यापक बाल झड़ना, रक्तस्रावी हॉट स्पॉट्स, त्वचा से खून निकलना। पसंदीदा भोजन से भी ध्यान नहीं हटता।",
        sleepImpact: "नींद लगभग असंभव; निरंतर कराहना व खुजलाना।",
        urgencyLevel: "आपातकालीन बायो-थेरेपी (Cytopoint / Systemic Glucocorticoids short pulse)।"
      },
      9: {
        severityEn: "Extremely Severe Pruritus",
        severityHi: "चरम गंभीर खुजली (अखंड खुजलाहट)",
        clinicalDescriptionEn: "Non-stop frenzy of biting, tearing at skin, whining in distress. Secondary bleeding lacerations.",
        clinicalDescriptionHi: "बिना रुके अपनी ही त्वचा को नोंचना, काटना व दर्द से चीखना। गहरे खून बहते घाव।",
        sleepImpact: "नींद पूर्णतः नष्ट।",
        urgencyLevel: "कोड रेड आपातकाल: एलिजाबेथन कॉलर + आपातकालीन शामक व एंटी-प्रुरिटिक।"
      },
      10: {
        severityEn: "Maximal / Incessant Self-Mutilating Pruritus",
        severityHi: "घातक स्व-विच्छेदनकारी खुजली (निरंतर उन्माद)",
        clinicalDescriptionEn: "Incessant scratching and biting. Animal refuses to stop even when physically restrained. Severe deep self-mutilation.",
        clinicalDescriptionHi: "निरंतर उन्मादी खुजलाहट। हाथ से पकड़ने पर भी खुजलाना बंद नहीं करता। कान व पूंछ को चबाकर अलग करना।",
        sleepImpact: "शून्य नींद (Total Sleep Deprivation & Exhaustion)।",
        urgencyLevel: "तत्काल गहन हॉस्पिटलाइजेशन, एनेस्थेटिक सिडेशन, एलिजाबेथन बैरियर एवं आक्रामक चिकित्सा।"
      }
    },

    /**
     * Evaluates pVAS Score and outputs clinical tier, sleep disruption, and therapeutic directives.
     * @param {number} numericScore - Pruritus score 0 to 10
     */
    calculatePvasScore: function (numericScore) {
      const score = Math.min(Math.max(parseFloat(numericScore) || 0, 0), 10);
      const roundedInt = Math.round(score);
      const levelData = this.pvasScaleLevels[roundedInt] || this.pvasScaleLevels[0];

      let clinicalTier = "";
      let recommendedTherapy = [];

      if (score === 0) {
        clinicalTier = "Normal Baseline (Tier 0)";
        recommendedTherapy.push("किसी एंटी-प्रुरिटिक दवा की आवश्यकता नहीं। नियमित रूटीन बाथिंग बनाए रखें।");
      } else if (score <= 3.5) {
        clinicalTier = "Mild Pruritus (Tier 1)";
        recommendedTherapy.push("आहार में ओमेगा-3 फैटी एसिड (EPA+DHA 100-150 mg/kg) संवर्धन।");
        recommendedTherapy.push("सामयिक त्वचा अवरोध सुरक्षा: सेरामाइड व ओटमील युक्त सुखदायक शैम्पू (Oatmeal & Ceramide Rinse)।");
        recommendedTherapy.push("पिस्सू नियंत्रण की पुष्टि (Isoxazoline oral chew).");
      } else if (score <= 6.5) {
        clinicalTier = "Moderate Pruritus (Tier 2)";
        recommendedTherapy.push("ओक्लासाइटिनिब (Apoquel): 0.4 - 0.6 mg/kg PO q12h 14 दिनों तक, तत्पश्चात q24h।");
        recommendedTherapy.push("अथवा लोकीवेटमैब (Cytopoint): 1.0 - 2.0 mg/kg SC एकल इंजेक्शन (4-8 सप्ताह राहत)।");
        recommendedTherapy.push("द्वितीयक मैलासेजिया या जीवाणु संक्रमण की जांच हेतु स्किन साइटोलॉजी (टेप स्ट्रिप)।");
      } else {
        clinicalTier = "Severe / Intractable Pruritus (Tier 3)";
        recommendedTherapy.push("आपातकालीन संयुक्त चिकित्सा: Lokivetmab (Cytopoint) 2.0 mg/kg SC + अल्पकालिक Prednisolone (0.5 mg/kg PO q12h 3-5 दिन, फिर टेपर करें)।");
        recommendedTherapy.push("त्वचा अवरोध व संक्रमण नियंत्रण: क्लोरहेक्सिडिन 2% + कीटोकोनाज़ोल 2% मेडिकेटेड स्नान सप्ताह में 2 बार।");
        recommendedTherapy.push("गैबापेंटिन (Gabapentin): 5 - 10 mg/kg PO q8-12h न्यूरोपैथिक खुजली व रात्रि बेचैनी शमन हेतु।");
        recommendedTherapy.push("स्व-क्षति से तत्काल बचाव हेतु एलिजाबेथन कॉलर (E-Collar) अनिवार्य रूप से लगाएं।");
      }

      return {
        measuredPvasScore: score,
        clinicalTier: clinicalTier,
        severityEn: levelData.severityEn,
        severityHi: levelData.severityHi,
        clinicalDescriptionHi: levelData.clinicalDescriptionHi,
        sleepDisturbanceImpactHi: levelData.sleepImpact,
        therapeuticUrgencyHi: levelData.urgencyLevel,
        recommendedActionPlanHi: recommendedTherapy
      };
    },

    // =========================================================================
    // 3. FAVROT'S CRITERIA FOR CANINE ATOPIC DERMATITIS (CAD)
    // =========================================================================
    favrotCriteriaList: [
      { id: "favrot_1", nameEn: "Age of onset < 3 years old", nameHi: "लक्षणों का प्रादुर्भाव 3 वर्ष की आयु से पूर्व होना" },
      { id: "favrot_2", nameEn: "Dog living mostly indoors", nameHi: "कुत्ते का अधिकांश समय घर के भीतर (इंडोर) व्यतीत होना" },
      { id: "favrot_3", nameEn: "Glucocorticoid-responsive pruritus", nameHi: "कॉर्टिकोस्टेरॉइड देने पर खुजली में नाटकीय कमी आना" },
      { id: "favrot_4", nameEn: "Chronic or recurrent Malassezia yeast infections", nameHi: "त्वचा पर बार-बार मैलासेजिया यीस्ट संक्रमण होना" },
      { id: "favrot_5", nameEn: "Front feet / paws affected (pododermatitis)", nameHi: "अग्र पंजे प्रभावित होना (पंजों को लगातार चाटना व लालिमा)" },
      { id: "favrot_6", nameEn: "Ear pinnae affected (otitis externa)", nameHi: "कान के आंतरिक पिन्ना में सूजन व संक्रमण (ओटाइटिस एक्सटर्ना)" },
      { id: "favrot_7", nameEn: "Ear margins NOT affected", nameHi: "कान के बाहरी किनारे (मार्जिन) अप्रभावित होना (स्केबीज से भिन्न)" },
      { id: "favrot_8", nameEn: "Dorso-lumbar area NOT affected", nameHi: "पीठ का निचला व कमर का भाग अप्रभावित होना (पिस्सू एलर्जी से भिन्न)" }
    ],

    /**
     * Evaluates Favrot's Criteria Set 1 for Canine Atopic Dermatitis.
     * @param {Array<string>} positiveCriteriaIds - Array of IDs matching favrotCriteriaList
     */
    evaluateFavrotCriteria: function (positiveCriteriaIds) {
      const positiveArray = Array.isArray(positiveCriteriaIds) ? positiveCriteriaIds : [];
      const positiveCount = positiveArray.length;

      let probabilityCategoryEn = "";
      let probabilityCategoryHi = "";
      let sensitivitySpecificity = "";
      let diagnosticWorkup = [];

      if (positiveCount >= 6) {
        probabilityCategoryEn = "Extremely High Probability of Canine Atopic Dermatitis (CAD)";
        probabilityCategoryHi = "कैनाइन एटोपिक डर्मेटाइटिस (CAD) की अत्यधिक उच्च संभावना";
        sensitivitySpecificity = "संवेदनशीलता (Sensitivity): ~58%, विशिष्टता (Specificity): ~89% (अत्यंत विशिष्ट)।";
        diagnosticWorkup.push("CAD का नैदानिक निदान लगभग निश्चित है; अन्य एलर्जी कारकों का विभेदीकरण आवश्यक।");
        diagnosticWorkup.push("सख्त 8-सप्ताह का हाइड्रोलाइज्ड प्रोटीन एलिमिनेशन डाइट ट्रायल (Royal Canin Anallergenic / Hills z/d) खाद्य एलर्जी बाहर करने हेतु।");
        diagnosticWorkup.push("पर्यावरणीय एलर्जेंस (धूल के कण, पराग, फफूंद) हेतु सीरोलॉजिकल IgE परीक्षण या इंट्राडर्मल एलर्जी टेस्टिंग (IDT)।");
        diagnosticWorkup.push("दीर्घकालिक इम्यूनोथेरेपी (Allergen-Specific Immunotherapy - ASIT) अथवा टारगेटेड Biologics (Cytopoint / Apoquel)।");
      } else if (positiveCount === 5) {
        probabilityCategoryEn = "High Probability of Canine Atopic Dermatitis (CAD)";
        probabilityCategoryHi = "कैनाइन एटोपिक डर्मेटाइटिस (CAD) की उच्च संभावना";
        sensitivitySpecificity = "संवेदनशीलता (Sensitivity): ~85%, विशिष्टता (Specificity): ~79% (संतुलित स्क्रीनिंग)।";
        diagnosticWorkup.push("CAD की मजबूत संभावना। पहले सभी बाह्य परजीवियों (फ्ली, स्केबीज, चीगर्स) का पूर्ण उन्मूलन करें।");
        diagnosticWorkup.push("स्किन स्क्रैपिंग एवं साइटोलॉजी द्वारा द्वैतीयक स्टेफिलोकोकस व मैलासेजिया का पूर्ण उपचार करें।");
        diagnosticWorkup.push("यदि संक्रमण ठीक होने के बाद भी खुजली बनी रहती है, तो एटोपी प्रोटोकॉल प्रारंभ करें।");
      } else if (positiveCount >= 3 && positiveCount <= 4) {
        probabilityCategoryEn = "Equivocal / Moderate Probability (CAD Uncertain)";
        probabilityCategoryHi = "संदेहास्पद / मध्यम संभावना (CAD अनिश्चित)";
        sensitivitySpecificity = "संवेदनशीलता व विशिष्टता अपर्याप्त। वैकल्पिक रोगों का विस्तृत अन्वेषण अनिवार्य।";
        diagnosticWorkup.push("पिस्सू एलर्जी डर्मेटाइटिस (FAD): पीठ के निचले हिस्से व पूंछ के आधार की जांच।");
        diagnosticWorkup.push("सार्कोप्टिक स्केबीज: कान के मार्जिन की स्क्रैपिंग एवं पिन्ना-पेडल रिफ्लेक्स परीक्षण।");
        diagnosticWorkup.push("संपर्क डर्मेटाइटिस (Contact Allergy): फर्श क्लीनर, कालीन या रासायनिक संपर्क की जांच।");
      } else {
        probabilityCategoryEn = "Low Probability of Canine Atopic Dermatitis";
        probabilityCategoryHi = "कैनाइन एटोपिक डर्मेटाइटिस की अत्यंत न्यून संभावना";
        sensitivitySpecificity = "मानक एटोपी मानदंडों को पूरा नहीं करता।";
        diagnosticWorkup.push("प्राथमिक रूप से संक्रामक या परजीवी कारणों (डर्मेटोफाइटोसिस, डेमोडेक्स, बैक्टीरियल फॉलिक्युलाइटिस) की खोज करें।");
        diagnosticWorkup.push("वुड्स लैंप परीक्षण एवं डीप स्किन स्क्रैपिंग करें।");
      }

      return {
        totalPositiveCriteriaCount: positiveCount,
        maxCriteriaCount: 8,
        probabilityCategoryEn: probabilityCategoryEn,
        probabilityCategoryHi: probabilityCategoryHi,
        statisticalReliability: sensitivitySpecificity,
        recommendedDiagnosticWorkupHi: diagnosticWorkup
      };
    },

    // =========================================================================
    // 4. COMPREHENSIVE DERMATOLOGICAL DISEASE DOSSIERS
    // =========================================================================
    diseaseDossiers: {
      sarcopticMange: {
        id: "DERM-DIS-01",
        nameEn: "Sarcoptic Mange / Canine Scabies (Sarcoptes scabiei var. canis)",
        nameHi: "सार्कोप्टिक खुजली / स्केबीज (अति-संक्रामक खाज)",
        speciesAffection: ["Canine", "Bovine", "Ovine", "Caprine", "Equine", "Zoonotic to Humans"],
        zoonoticHazard: "अत्यधिक जूनोटिक (Highly Zoonotic)! पशु स्वामियों एवं चिकित्सकों के अग्रबाहु व पेट पर लाल खुजलीदार दाने (papular eruption) उत्पन्न करता है।",
        pathophysiology: "मादा माइट्स स्ट्रैटम कॉर्नियम में सुरंग बनाकर अंडे व मल (scybala) छोड़ती हैं। यह अत्यधिक तीव्र टाइप-I एवं टाइप-IV अतिसंवेदनशीलता (Hypersensitivity) उत्पन्न करती है।",
        clinicalHallmarks: [
          "तीव्र, अनवरत, गैर-मौसमी खुजली (Intense non-seasonal pruritus)",
          "कान के किनारों (Pinna margins), कोहनी (Elbows), तथा घुटनों (Hocks) पर पपड़ीदार क्रस्ट्स व खाल उधड़ना",
          "पिन्ना-पेडल स्क्रैच रिफ्लेक्स (Pinna-Pedal Reflex): कान के मार्जिन को उंगलियों से रगड़ने पर उसी तरफ का पिछला पैर स्वतः खुजलाने की गति करता है (> 90% नैदानिक सटीकता)"
        ],
        diagnosticSampling: "सुपरफिशियल ब्रॉड स्किन स्क्रैपिंग (Superficial Broad Scraping): खनिज तेल (mineral oil) लगाकर बड़े क्षेत्र से खुरचें। माइट्स की संख्या कम होने पर भी रोग हो सकता है (False negatives frequent)। चिकित्सीय परीक्षण (Therapeutic trial) अक्सर सर्वश्रेष्ठ पुष्टि है।",
        treatmentProtocols: {
          isoxazolinesFirstLine: "आइसोक्साज़ोलिन ओरल च्यू (Fluralaner / Sarolaner / Afoxolaner एकल खुराक) - 100% उपचारात्मक सफलता।",
          ivermectinLivestockAlternative: "Ivermectin 0.2 - 0.4 mg/kg SC प्रत्येक 7-14 दिन पर कुल 4 खुराकों हेतु। (चेतावनी: कोली, शीपडॉग एवं MDR1 जीन म्यूटेशन वाले कुत्तों में पूर्णतः वर्जित - न्यूरोटॉक्सिसिटी व मृत्यु)।",
          topicalDips: "लाइवस्टॉक में: Amitraz 0.05% डिप या Flumethrin पोर-ऑन।"
        }
      },

      demodecticMange: {
        id: "DERM-DIS-02",
        nameEn: "Demodectic Mange / Red Mange (Demodex canis / Demodex bovis)",
        nameHi: "डेमोडेक्स खुजली / लाल खाज (फॉलिक्युलर डेमोडिकोसिस)",
        speciesAffection: ["Canine", "Bovine", "Caprine", "Feline"],
        zoonoticHazard: "गैर-संक्रामक (Non-contagious)। यह सामान्य त्वचा का सहभोजी जीव (commensal) है, जो केवल आनुवंशिक या प्रतिरक्षा दमन होने पर रोग बनता है।",
        steroidRedAlertHi: "कॉर्टिकोस्टेरॉइड रेड अलर्ट: डेमोडेक्स के किसी भी रोगी में स्टेरॉइड्स (Dexamethasone / Prednisolone) देना सख्त मना है! यह स्थानीय प्रतिरक्षा को नष्ट कर जानलेवा जनरलाइज्ड डेमोडिकोसिस उत्पन्न करता है।",
        formsAndPathophysiology: {
          localized: "स्थानिक रूप (<= 4 पैच): आंखों व मुंह के चारों ओर गोल बाल रहित चट्टे (Periocular alopecia), हल्का एरिथेमा; 90% मामलों में स्वतः ठीक हो जाता है।",
          generalized: "सामान्यीकृत रूप (> 5 पैच या संपूर्ण शारीरिक भाग / पोडोडेमोडिकोसिस): गंभीर टी-सेल इम्यूनोडेफिशिएंसी; संपूर्ण शरीर पर गहरे काले-लाल घाव, फुरुनकुलोसिस, खून व मवाद से लथपथ त्वचा।"
        },
        diagnosticSampling: "डीप स्किन स्क्रैपिंग (Deep Skin Scraping): त्वचा की सिलवट को अंगूठे व उंगली से तब तक निचोड़ें (squeeze) जब तक कि बाल कूपों से माइट्स बाहर न आ जाएं; फिर कैपिलरी रक्त निकलने तक खुरचें। माइक्रोस्कोप पर सिगार के आकार की 8 छोटे पैरों वाली माइट्स स्पष्ट दिखती हैं।",
        treatmentProtocols: {
          modernBiologics: "Fluralaner (Bravecto) 25 mg/kg एकल मौखिक खुराक 12 सप्ताह हेतु अथवा Sarolaner (Simparica) 2 mg/kg मासिक। 2 नकारात्मक मासिक स्क्रैपिंग तक उपचार जारी रखें।",
          secondaryPyodermaManagement: "Cefpodoxime Proxetil 5-10 mg/kg PO q24h या Cephalexin 25 mg/kg PO q12h कम से कम 4-6 सप्ताह हेतु।",
          topicalLivestock: "पशुओं में: Amitraz 0.05% घोल का लेप (सावधानी: घोड़ों व चिहुआहुआ में वर्जित)।"
        }
      },

      fleaAllergyDermatitis: {
        id: "DERM-DIS-03",
        nameEn: "Flea Allergy Dermatitis (FAD / Flea Bite Hypersensitivity)",
        nameHi: "पिस्सू एलर्जी डर्मेटाइटिस (एफ.ए.डी. / फ्ली बाइट हाइपरसेंसिटिविटी)",
        speciesAffection: ["Canine", "Feline"],
        pathophysiology: "पिस्सू (Ctenocephalides felis) की लार में उपस्थित 15 विभिन्न प्रोटीनों के विरुद्ध टाइप-I, टाइप-IV एवं बेसोफिल हाइपरसेंसिटिविटी। एक ही पिस्सू का दंश संवेदनशील पशु में हफ्तों तक तीव्र खुजली उत्पन्न कर सकता है।",
        clinicalHallmarks: [
          "क्लासिक 'फ्ली ट्राएंगल' (Classic Flea Triangle): पीठ का निचला भाग, कमर (Lumbosacral region), पूंछ का आधार (Tail base), तथा जांघों के पिछले हिस्से पर बाल उड़ना व लालिमा",
          "हॉट स्पॉट्स (Acute moist dermatitis) एवं गंभीर पपड़ीदार क्रस्ट्स",
          "फ्ली डर्ट (Flea Dirt): गीले सफेद टिशू पेपर पर काली कतरन रखने पर लाल रक्त का वलय (Red blood halo) बनना"
        ],
        treatmentProtocols: {
          animalProtection: "वर्ष भर निरंतर आइसोक्साज़ोलिन (Afoxolaner / Fluralaner / Sarolaner) अथवा Flumethrin-Imidacloprid कॉलर।",
          environmentalInterruption: "वातावरण में उपस्थित 95% अंडों व प्यूपा का विनाश: इनडोर स्प्रे जिसमें Pyriproxyfen या Methoprene (Insect Growth Regulators - IGR) उपस्थित हों।",
          acuteBreakthroughRelief: "अल्पकालिक एंटी-प्रुरिटिक: Oclacitinib (Apoquel) 0.5 mg/kg PO q12h x 5 days तीव्र प्रदाह शमन हेतु।"
        }
      },

      dermatophytosisRingworm: {
        id: "DERM-DIS-04",
        nameEn: "Dermatophytosis / Ringworm (Microsporum canis / Trichophyton verrucosum)",
        nameHi: "दाद / रिंगवर्म (डर्मेटोफाइट कवक संक्रमण)",
        speciesAffection: ["Bovine", "Canine", "Feline", "Equine", "Zoonotic to Humans"],
        pathophysiology: "केराटिनोफिलिक कवक बाल की शाफ्ट (hair shaft) एवं स्ट्रैटम कॉर्नियम में प्रवेश कर एक्टोथ्रिक्स (ectothrix) बीजाणु बनाते हैं, जिससे बाल बीच से टूट जाते हैं।",
        clinicalHallmarks: [
          "गोलाकार, धीरे-धीरे फैलने वाले बाल रहित चट्टे, जिनके केंद्र में त्वचा स्वस्थ होने लगती है और किनारों पर लालिमा व पपड़ी होती है (Cigarette ash scale)",
          "गाय-भैंसों में (Trichophyton verrucosum): चेहरे व आंखों के चारों ओर भारी, सफेद चाक जैसे अभ्रकनुमा मोटे क्रस्ट्स (Thick white asbestos-like plaques)",
          "बाल आसानी से टूटना व खुरदुरा होना"
        ],
        diagnosticSampling: [
          "वुड्स लैंप परीक्षण (Wood's Lamp): 365 nm UV प्रकाश में 5 मिनट गर्म करने के पश्चात Microsporum canis स्ट्रेन्स सेब जैसे चमकीले हरे रंग (Apple-green fluorescence) में चमकते हैं (~50% मामलों में)।",
          "ट्राइकोग्राम (Trichogram): टूटे बालों का 10% KOH में परीक्षण; बाल शाफ्ट के चारों ओर बीजाणुओं का आवरण दिखना।",
          "डर्मेटोफाइट टेस्ट मीडियम (DTM Culture): पीला माध्यम कवक वृद्धि के साथ ही 3-7 दिन में लाल रंग में परिवर्तित होना।"
        ],
        treatmentProtocols: {
          topicalTherapy: "Chlorhexidine 2% + Miconazole 2% शैम्पू सप्ताह में 2 बार (संपूर्ण शरीर)। बड़े पशुओं में: 2-4% लाइम सल्फर (Lime Sulfur dip) या पोविडोन आयोडीन 1% का लेप।",
          systemicAntifungals: [
            "श्वान व मार्जार: Itraconazole 5 mg/kg PO q24h पल्स थेरेपी (1 सप्ताह चालू, 1 सप्ताह बंद, कुल 3 चक्र) भोजन के साथ।",
            "गोवंश / बड़े पशु: Griseofulvin 7.5 - 10 mg/kg PO q24h x 3-4 weeks (गर्भवती पशुओं में टेराटोजेनिक होने के कारण पूर्णतः वर्जित)।"
          ],
          biosecurity: "कमरे व बाड़े का ब्लीच (1:30 Sodium hypochlorite) द्वारा कीटाणुशोधन; मानव संक्रमण से बचाव हेतु दस्ताने पहनना अनिवार्य।"
        }
      },

      malasseziaDermatitis: {
        id: "DERM-DIS-05",
        nameEn: "Malassezia Dermatitis (Malassezia pachydermatis Yeast Overgrowth)",
        nameHi: "मैलासेजिया यीस्ट डर्मेटाइटिस (फंगल स्किन फोल्ड इन्फेक्शन)",
        speciesAffection: ["Canine", "Feline"],
        pathophysiology: "चर्म-वसा (Sebum) के लिपिड्स पर पनपने वाला लिपिड-निर्भर यीस्ट। त्वचा की एलर्जी या अवरोध टूटने पर इसकी संख्या अनियंत्रित हो जाती है। यह ज़ाइमोसन व फैटी एसिड्स स्रावित कर तीव्र प्रदाह उत्पन्न करता है।",
        clinicalHallmarks: [
          "अत्यंत तीखी सड़ी हुई गंध (Rancid corn chip / Stale peanut butter odor)",
          "त्वचा का अत्यधिक चिकना व तैलीय होना (Greasy seborrhea oleosa)",
          "गर्दन, बगल, पंजों के बीच व कान की त्वचा का काला व चमड़े जैसा मोटा हो जाना (Lichenification & Hyperpigmentation)"
        ],
        diagnosticSampling: "एसिटेट टेप इम्प्रेशन (Acetate Tape Strip): पारदर्शी टेप को प्रभावित त्वचा पर 4-5 बार जोर से चिपकाएं। डिफ-क्विक (Diff-Quik) के केवल दूसरे व तीसरे घोल में रंगे। 100x ऑयल विसर्जन पर विशिष्ट 'मूंगफली के आकार' (Peanut-shaped) या 'जूते के तलवे' (Footprint-shaped) जैसे बडिंग यीस्ट सेल्स दिखते हैं (> 2-3 प्रति HPF नैदानिक है)।",
        treatmentProtocols: {
          topicalShampoo: "Ketoconazole 2% + Chlorhexidine 2% शैम्पू से नहलाएं; फेन को त्वचा पर 10-15 मिनट तक लगा रहने दें, फिर धोएं। सप्ताह में 2 बार 3-4 सप्ताह हेतु।",
          systemicAntifungal: "Ketoconazole 5 - 10 mg/kg PO q24h भोजन के साथ अथवा Itraconazole 5 mg/kg PO q24h 21 दिनों तक। (उपचार पूर्व लिवर एंजाइम ALT की जांच करें)।"
        }
      },

      photosensitizationAndHumpSore: {
        id: "DERM-DIS-06",
        nameEn: "Large Animal Photosensitization & Bovine Hump Sore (Stephanofilariasis)",
        nameHi: "बड़े पशुओं में प्रकाश संवेदनशीलता एवं ककुद घाव (हम्प सोर)",
        speciesAffection: ["Bovine", "Bubaline", "Ovine", "Caprine", "Equine"],
        classificationTypes: {
          type1Primary: "प्राथमिक प्रकाश संवेदनशीलता: बाहरी फोटोडायनामिक रसायनों का सीधे अंतर्ग्रहण (उदा. Hypericum perforatum / St. John's wort, Fagopyrum)। यकृत सामान्य रहता है।",
          type3Hepatogenous: "यकृत-जनित प्रकाश संवेदनशीलता (Secondary Hepatogenous): लैंटाना कमारा (Lantana camara / पंचफूली) या सेनेसियो विषाक्तता से यकृत पित्त नली अवरोध। क्लोरोफिल का उपापचयी उत्पाद 'फाइलोएरिथ्रिन' (Phylloerythrin) यकृत द्वारा उत्सर्जित न होकर रक्त में संचित हो जाता है।"
        },
        clinicalHallmarksPhotosensitization: [
          "घाव केवल सफेद या वर्णक-रहित (Unpigmented / White skin) त्वचा पर ही होते हैं; काले बाल वाली त्वचा पूर्णतः सुरक्षित रहती है",
          "सूर्य के प्रकाश में आते ही कान, थूथन, पीठ व स्तनों की सफेद त्वचा में तीव्र सूजन, एरिथेमा, सीरम का रिसाव व खाल का चमड़े की तरह सूखकर उधड़ना (Sloughing / Gangrene)",
          "अत्यधिक दर्द, बेचैनी व पीलिया (Jaundice - Type III में)"
        ],
        humpSoreStephanofilariasis: {
          etiology: "स्टीफेनोफाइलेरिया असा Frank (Stephanofilaria assamensis) सूत्रकृमि द्वारा उत्पन्न, जिसका संचरण मक्खियों (Musca conducens) द्वारा होता है।",
          presentation: "गाय-बैल के ककुद (Hump) पर खुजलीदार, खूनी, दानेदार अल्सरनुमा घाव, जो कभी नहीं भरता और मक्खियों को आकर्षित करता है।"
        },
        treatmentProtocols: {
          photosensitizationRescue: [
            "पशु को तत्काल पूर्ण अंधकारमय या छायादार बाड़े में स्थानांतरित करें (सूर्य की UV किरणों से 100% बचाव)।",
            "यकृत टॉनिक व डिटॉक्सिफिकेशन: Silymarin + Choline Chloride + B-Complex उच्च खुराक में IV/IM दें।",
            "प्रदाह शमन: गैर-गर्भवती पशुओं में Dexamethasone 0.2 mg/kg IV/IM (गर्भवती में Isoflupredone acetate 10-20 mg IM सुरक्षित है)।",
            "द्वितीयक जीवाणु संक्रमण बचाव: Procaine Penicillin 20,000 IU/kg IM या Ceftiofur 2.2 mg/kg IM 5 दिनों हेतु।"
          ],
          humpSoreEradication: [
            "Ivermectin 0.2 mg/kg SC एकल खुराक; 21 दिन बाद दोहराएं।",
            "घाव पर स्थानीय लेप: Negasunt ऑइंटमेंट या Ivermectin 1% क्रीम + जिंक ऑक्साइड का दैनिक लेप मक्खियों को भगाने हेतु।"
          ]
        }
      }
    },

    // =========================================================================
    // 5. TARGETED ANTI-PRURITIC DOSAGE ENGINE
    // =========================================================================
    /**
     * Precision dosing calculator for dermatological biologics, JAK-inhibitors, and parasiticides.
     * @param {string} drugName - "oclacitinib"|"lokivetmab"|"cyclosporine"|"afoxolaner"|"fluralaner"|"sarolaner"
     * @param {number} weightKg - Patient weight in kilograms
     * @param {string} species - "canine" or "feline"
     */
    calculateDermDose: function (drugName, weightKg, species) {
      const drug = (drugName || "").toLowerCase();
      const wt = parseFloat(weightKg);
      const sp = (species || "canine").toLowerCase();

      if (isNaN(wt) || wt <= 0) {
        return { error: "अमान्य शारीरिक वजन (Invalid Patient Weight Specified)." };
      }

      let result = {};

      if (drug === "oclacitinib" || drug === "apoquel") {
        if (sp !== "canine") {
          return { error: "ओक्लासाइटिनिब केवल श्वान प्रजाति हेतु अधिकृत है (Apoquel is indicated for canines >= 12 months)." };
        }
        // Dose: 0.4 to 0.6 mg/kg
        const targetMg = wt * 0.5; // mid-target
        let tabletStrength = "3.6 mg";
        let tabletCount = 0;

        if (wt >= 3.0 && wt <= 4.4) {
          tabletStrength = "3.6 mg";
          tabletCount = 0.5;
        } else if (wt >= 4.5 && wt <= 5.9) {
          tabletStrength = "3.6 mg";
          tabletCount = 0.5;
        } else if (wt >= 6.0 && wt <= 8.9) {
          tabletStrength = "3.6 mg";
          tabletCount = 1;
        } else if (wt >= 9.0 && wt <= 13.4) {
          tabletStrength = "5.4 mg";
          tabletCount = 1;
        } else if (wt >= 13.5 && wt <= 19.9) {
          tabletStrength = "5.4 mg";
          tabletCount = 1.5;
        } else if (wt >= 20.0 && wt <= 26.9) {
          tabletStrength = "16 mg";
          tabletCount = 0.5;
        } else if (wt >= 27.0 && wt <= 39.9) {
          tabletStrength = "16 mg";
          tabletCount = 1;
        } else if (wt >= 40.0 && wt <= 54.9) {
          tabletStrength = "16 mg";
          tabletCount = 1.5;
        } else if (wt >= 55.0 && wt <= 80.0) {
          tabletStrength = "16 mg";
          tabletCount = 2;
        } else {
          tabletStrength = "16 mg";
          tabletCount = Math.round((targetMg / 16) * 2) / 2;
        }

        result = {
          drugGenericName: "Oclacitinib Maleate (Apoquel)",
          mechanismOfAction: "JAK-1 एंजाइम इनहिबिटर (IL-31 प्रुरिटस सिग्नलिंग ब्लॉक करता है)",
          patientWeightKg: wt,
          recommendedDoseMg: Math.round(targetMg * 10) / 10,
          dispensingFormat: tabletCount + " x " + tabletStrength + " गोली (Tablet)",
          administrationScheduleHi: "प्रारंभिक 14 दिनों तक: दिन में दो बार (BID) मौखिक दें। 14 दिन पश्चात: रखरखाव हेतु दिन में केवल एक बार (OD)। भोजन के साथ या बिना दिया जा सकता है।",
          contraindicationsAndMonitoringHi: "12 माह से कम उम्र, गंभीर संक्रमण या डिमोडिकोसिस में वर्जित। 6 माह से अधिक उपयोग पर नियमित CBC व बायोकेमिस्ट्री जांचें।"
        };
      } else if (drug === "lokivetmab" || drug === "cytopoint") {
        if (sp !== "canine") {
          return { error: "लोकीवेटमैब (Cytopoint) विशुद्ध रूप से कैनाइन-विशिष्ट एंटीबॉडी है (Strictly Canine Specific; do not give to cats)." };
        }
        // Dose: minimum 1.0 mg/kg, optimal 2.0 mg/kg SC
        const requiredMg = Math.round(wt * 1.5);
        let recommendedVials = [];

        // Cytopoint vials: 10mg, 20mg, 30mg, 40mg
        let remaining = requiredMg;
        const v40 = Math.floor(remaining / 40);
        remaining %= 40;
        const v30 = Math.floor(remaining / 30);
        remaining %= 30;
        const v20 = Math.floor(remaining / 20);
        remaining %= 20;
        const v10 = Math.ceil(remaining / 10);

        if (v40 > 0) recommendedVials.push(v40 + " x 40 mg शीशी");
        if (v30 > 0) recommendedVials.push(v30 + " x 30 mg शीशी");
        if (v20 > 0) recommendedVials.push(v20 + " x 20 mg शीशी");
        if (v10 > 0) recommendedVials.push(v10 + " x 10 mg शीशी");
        if (recommendedVials.length === 0) recommendedVials.push("1 x 10 mg शीशी");

        result = {
          drugGenericName: "Lokivetmab (Cytopoint)",
          mechanismOfAction: "कैनिनाइज्ड मोनोक्लोनल एंटीबॉडी (Anti-IL-31 Monoclonal Antibody)",
          patientWeightKg: wt,
          targetDoseMg: requiredMg,
          dispensingFormat: recommendedVials.join(" + "),
          routeOfAdministration: "सबक्यूटेनियस (Subcutaneous - SC) एकल इंजेक्शन",
          durationOfEfficacyHi: "एक इंजेक्शन से 4 से 8 सप्ताह तक खुजली से निरंतर पूर्ण राहत।",
          safetyProfileHi: "किडनी या लिवर पर कोई चयापचय भार नहीं; किसी भी उम्र, पपीज, तथा गंभीर सह-रुग्णता (CKD/Hepatopathy) वाले कुत्तों में 100% सुरक्षित।"
        };
      } else if (drug === "cyclosporine" || drug === "atopica") {
        const doseMg = Math.round(wt * 5.0); // 5 mg/kg
        result = {
          drugGenericName: "Cyclosporine Modified Microemulsion (Atopica)",
          mechanismOfAction: "कैल्सिन्यूरिन इनहिबिटर (T-सेल सक्रियण व IL-2 स्राव का दमन)",
          patientWeightKg: wt,
          calculatedDailyDoseMg: doseMg,
          dispensingFormat: "उपलब्ध कैप्सूल्स: 10 mg, 25 mg, 50 mg, 100 mg (संयोजन अनुसार दें)",
          administrationScheduleHi: "भोजन से कम से कम 2 घंटे पूर्व या 2 घंटे पश्चात खाली पेट दें (भोजन अवशोषण को 30% घटा देता है)।",
          adverseEffectsManagementHi: "प्रारंभिक 1-2 सप्ताह में उल्टी या दस्त हो सकता है (कैप्सूल को फ्रीज करके देने से मतली घटती है)। जिंजाइवल हाइपरप्लासिया की निगरानी करें।"
        };
      } else if (drug === "afoxolaner" || drug === "nexgard") {
        result = {
          drugGenericName: "Afoxolaner (NexGard Chews)",
          mechanismOfAction: "GABA एवं ग्लूटामेट-गेटेड क्लोराइड चैनल ब्लॉकर",
          patientWeightKg: wt,
          dispensingFormat: wt <= 4 ? "11.3 mg च्यू" : wt <= 10 ? "28.3 mg च्यू" : wt <= 25 ? "68 mg च्यू" : "136 mg च्यू",
          administrationScheduleHi: "प्रत्येक 30 दिन में 1 च्यू मौखिक दें (भोजन के साथ या बिना)।",
          parasiticSpectrumHi: "पिस्सू, टिक्स, सार्कोप्टिक व डेमोडेक्स माइट्स पर तीव्र प्रभाव।"
        };
      } else if (drug === "fluralaner" || drug === "bravecto") {
        result = {
          drugGenericName: "Fluralaner (Bravecto Chews)",
          mechanismOfAction: "आइसोक्साज़ोलिन आर्थ्रोपोड न्यूरोटॉक्सिन",
          patientWeightKg: wt,
          dispensingFormat: wt <= 4.5 ? "112.5 mg" : wt <= 10 ? "250 mg" : wt <= 20 ? "500 mg" : wt <= 40 ? "1000 mg" : "1400 mg च्यू",
          administrationScheduleHi: "भोजन के समय या भोजन के तुरंत बाद मौखिक दें। 12 सप्ताह (लगभग 3 माह) में केवल एक बार देना होता है।",
          parasiticSpectrumHi: "12 सप्ताह तक पिस्सू व टिक्स से सुरक्षा; डेमोडिकोसिस में 1 खुराक से पूर्ण मुक्ति।"
        };
      } else if (drug === "sarolaner" || drug === "simparica") {
        result = {
          drugGenericName: "Sarolaner (Simparica Tablets)",
          mechanismOfAction: "सिलेक्टिव इनवेर्टिब्रेट GABA रिसेप्टर विरोधी",
          patientWeightKg: wt,
          dispensingFormat: wt <= 2.5 ? "5 mg" : wt <= 5 ? "10 mg" : wt <= 10 ? "20 mg" : wt <= 20 ? "40 mg" : wt <= 40 ? "80 mg" : "120 mg गोली",
          administrationScheduleHi: "माह में एक बार मौखिक दें। न्यूनतम प्रभावी खुराक 2 mg/kg।",
          parasiticSpectrumHi: "फ्ली, टिक्स, सार्कोप्टेस एवं ओटोडिक्टिस (कान की माइट्स) का 24-48 घंटे में खात्मा।"
        };
      } else {
        return { error: "अज्ञात एंटी-प्रुरिटिक दवा (Unknown drug). Supported: 'oclacitinib', 'lokivetmab', 'cyclosporine', 'afoxolaner', 'fluralaner', 'sarolaner'." };
      }

      return result;
    },

    // =========================================================================
    // 6. DERMATOLOGIC DIAGNOSTIC SAMPLING GUIDE
    // =========================================================================
    /**
     * Diagnostic Cytology & Ectoparasite Sampling Procedural Guide.
     * @param {string} techniqueName - "superficial_scrape"|"deep_scrape"|"tape_strip"|"woods_lamp"|"trichogram"
     */
    getSamplingTechnique: function (techniqueName) {
      const tech = (techniqueName || "").toLowerCase();

      const protocols = {
        superficial_scrape: {
          nameEn: "Superficial Skin Scraping",
          nameHi: "सतही त्वचा खुरचन विधि",
          primaryTarget: "सार्कोप्टिक स्केबीज (Sarcoptes scabiei), चेलेटिएला (Cheyletiella), चीगर्स (Trombicula)।",
          equipment: "10 या 15 नंबर का कुंद स्कैल्पल ब्लेड, खनिज तेल (Mineral oil), माइक्रोस्कोप स्लाइड व कवरस्लिप।",
          stepByStepProcedureHi: [
            "1. स्लाइड व स्कैल्पल ब्लेड पर 2-3 बूंद गाढ़ा खनिज तेल लगाएं।",
            "2. कान के किनारे, कोहनी या छाती के क्रस्ट्स वाले चौड़े क्षेत्र का चयन करें।",
            "3. ब्लेड को त्वचा पर 45-डिग्री कोण पर रखकर बालों के विकास की दिशा में सतही रूप से खुरचें (रक्त नहीं निकालना है)।",
            "4. खुरचे हुए क्रस्ट्स व तेल को स्लाइड पर फैलाएं, कवरस्लिप लगाएं और 10x लेंस पर कम प्रकाश में माइट्स खोजें।"
          ]
        },
        deep_scrape: {
          nameEn: "Deep Skin Scraping",
          nameHi: "गहन त्वचा खुरचन विधि (रक्तस्राव तक)",
          primaryTarget: "डेमोडेक्स माइट्स (Demodex canis / Demodex bovis) जो बाल कूपों की गहराई में रहते हैं।",
          equipment: "स्कैल्पल ब्लेड, खनिज तेल, ग्लास स्लाइड।",
          stepByStepProcedureHi: [
            "1. प्रभावित बाल रहित चट्टे की त्वचा की सिलवट को अंगूठे और पहली उंगली के बीच मजबूती से निचोड़ें (Squeeze firmly)। यह कूपों में दबी माइट्स को बाहर धकेलता है।",
            "2. तेल लगे ब्लेड से त्वचा को तब तक खुरचें जब तक कि केशिकाओं से हल्का लाल रक्त (Capillary bleeding/oozing) न निकल आए।",
            "3. सामग्री को स्लाइड पर रखें; 10x एवं 40x लेंस पर जीवित/मृत माइट्स, लार्वा व अंडों की गणना करें।"
          ]
        },
        tape_strip: {
          nameEn: "Acetate Tape Impression Cytology",
          nameHi: "पारदर्शी टेप इम्प्रेशन साइटोलॉजी",
          primaryTarget: "मैलासेजिया यीस्ट (Malassezia pachydermatis), सतही जीवाणु (Staphylococcus pseudintermedius)।",
          equipment: "स्पष्ट पारदर्शी सेलो-टेप (Clear acetate tape), डिफ-क्विक स्टेन किट (Diff-Quik Stain)।",
          stepByStepProcedureHi: [
            "1. टेप के 2-3 इंच टुकड़े को उंगलियों के बीच, स्किन फोल्ड्स या चिपचिपी त्वचा पर 4-5 बार मजबूती से चिपकाएं और हटाएं।",
            "2. महत्वपूर्ण: टेप को फिक्सेटिव (घोल 1 - अल्कोहल) में न डालें क्योंकि इससे टेप धुंधला हो जाता है। सीधे घोल 2 (Eosin) में 5 सेकंड और घोल 3 (Methylene Blue) में 10 सेकंड डुबोएं।",
            "3. पानी से धोकर स्लाइड पर चिपकाएं। 100x ऑयल विसर्जन लेंस पर मूंगफली के आकार के यीस्ट व कोक्सी जीवाणु खोजें।"
          ]
        },
        woods_lamp: {
          nameEn: "Wood's Lamp Ultraviolet Examination",
          nameHi: "वुड्स लैंप पराबैंगनी परीक्षण",
          primaryTarget: "रिंगवर्म कवक (Microsporum canis)।",
          equipment: "365 nm वेवलेंथ वुड्स लैंप, पूर्णतः अंधकारमय कमरा।",
          stepByStepProcedureHi: [
            "1. लैंप को चालू करके 5 मिनट तक वार्म-अप होने दें (स्थिर UV तरंग दैर्ध्य हेतु)।",
            "2. कमरे की सभी लाइटें बंद करें ताकि पूर्ण अंधेरा हो जाए; आंखें अंधेरे के अनुकूल होने दें।",
            "3. लैंप को त्वचा व बालों से 4-6 इंच की दूरी पर रखें।",
            "4. सकारात्मक परिणाम: बाल की शाफ्ट पर सेब जैसा चमकीला नियॉन-हरा फ्लोरेसेंस (Bright apple-green fluorescence)। (त्वचा की पपड़ी या तेल का चमकना फॉल्स पॉजिटिव होता है; केवल बाल चमकना चाहिए)।"
          ]
        },
        trichogram: {
          nameEn: "Trichogram (Microscopic Hair Pluck)",
          nameHi: "ट्राइकोग्राम (बाल उखाड़कर सूक्ष्मदर्शी परीक्षण)",
          primaryTarget: "डर्मेटोफाइटोसिस एक्टोथ्रिक्स स्पोर्स, डेमोडेक्स (विशेषकर पंजों पर जहां खुरचना कठिन हो), बालों के बढ़ने का चरण (Anagen vs Telogen)।",
          equipment: "रबर-टिप्ड हीमोस्टेट (Haemostat / Forceps), मिनरल ऑयल, स्लाइड।",
          stepByStepProcedureHi: [
            "1. घाव के सक्रिय किनारे से बालों के छोटे गुच्छे को जड़ से मजबूती से पकड़कर बालों के उगने की दिशा में झटके से उखाड़ें।",
            "2. बालों को स्लाइड पर मिनरल ऑयल की बूंद में समानांतर व्यवस्थित करें और कवरस्लिप लगाएं।",
            "3. 10x व 40x पर बालों की जड़ों में डेमोडेक्स माइट्स, या बाल के शाफ्ट पर कवक बीजाणुओं के आवरण (Ectothrix cuffing) की जांच करें।"
          ]
        }
      };

      return protocols[tech] || { error: "अज्ञात तकनीक (Unknown technique). Supported: 'superficial_scrape', 'deep_scrape', 'tape_strip', 'woods_lamp', 'trichogram'." };
    }
  };

  // Seal namespace to protect diagnostic integrity at runtime
  Object.freeze(window.VetcareApp.ClinicalData.DermatologyAllergies.pvasScaleLevels);
  Object.freeze(window.VetcareApp.ClinicalData.DermatologyAllergies.favrotCriteriaList);
  Object.freeze(window.VetcareApp.ClinicalData.DermatologyAllergies.diseaseDossiers);

  // Ready notification
  if (window.VetcareApp.showToast) {
    window.VetcareApp.showToast("त्वचा रोग एवं एलर्जी मॉड्यूल सक्रिय (Dermatology & Allergies Loaded)", "success");
  }
})();
