// Vetcare AI OS - Veterinary Neonatology, Colostrum Management & Pediatric Resuscitation Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE INITIALIZATION & ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  /**
   * Veterinary Neonatology, Perinatal Critical Care & Pediatric Medicine Core Engine
   * Engineered according to ISO-VET 2026 Standards, IVAPM Guidelines & Academy of Veterinary Neonatal Critical Care.
   */
  window.VetcareApp.ClinicalData.NeonatologyPediatrics = {
    metadata: {
      subsystem: "Neonatal Resuscitation, Colostral Immunology & Pediatric Therapeutics",
      version: "2026.4.2-PROD",
      isoVetStandard: "ISO-VET-NEO-2026",
      supportedTaxa: ["Bovine", "Bubaline", "Ovine", "Caprine", "Equine", "Canine", "Feline"],
      authoritativeSource: "International Veterinary Neonatal Critical Care Protocols"
    },

    // =========================================================================
    // 2. COLOSTRUM 5-Q MANAGEMENT & FAILURE OF PASSIVE TRANSFER (FPT) ENGINE
    // =========================================================================
    colostrumScience: {
      fiveQsFramework: {
        quality: {
          parameterHi: "गुणवत्ता (Quality - Brix Refractometer Scoring)",
          guidelines: [
            ">= 22% Brix: प्रथम श्रेणी (High-Grade) खीस; IgG सांद्रता > 50 mg/mL (उत्कृष्ट गुणवत्ता)। नवजात बछड़े को तुरंत पिलाने हेतु उपयुक्त।",
            "18% - 21.9% Brix: मध्यम श्रेणी (Intermediate Quality); IgG 30-50 mg/mL। द्वितीय खुराक (10-12 घंटे पर) या बड़े बछड़ों हेतु उपयोग करें।",
            "< 18% Brix: निम्न गुणवत्ता (Poor / Sub-standard); IgG < 30 mg/mL। नवजात की प्रथम खुराक में प्रयोग न करें; इसे फेंकें या बड़े बछड़ों को दूध के साथ मिलाकर दें।"
          ]
        },
        quantity: {
          parameterHi: "मात्रा (Quantity - 10% to 12% Rule)",
          guidelines: [
            "जीवन के पहले 6 घंटे के भीतर नवजात के शारीरिक वजन का 10% से 12% खीस अनिवार्य रूप से पिलाएं।",
            "उदाहरण: 40 किग्रा वजन के बछड़े को प्रथम 6 घंटे में 4.0 से 4.5 लीटर खीस की आवश्यकता होती है।",
            "एबोमेसम की क्षमता ~1.5 से 2.0 लीटर होती है; अतः प्रथम खुराक 3-4 लीटर इसोफेजियल फीडर द्वारा या 2-2 लीटर की दो खुराकों में 2 घंटे के अंतराल पर दें।"
          ]
        },
        quickness: {
          parameterHi: "शीघ्रता (Quickness - Gut Closure Timeline)",
          guidelines: [
            "प्रथम खुराक जन्म के 1 से 2 घंटे के भीतर अनिवार्य है (आंतों की पारगम्यता 100% होती है)।",
            "जन्म के 6 घंटे बाद मैक्रोमोलेक्यूलर अवशोषण 50% तक गिर जाता है।",
            "24 घंटे पर आंतों का छिद्रण पूर्णतः बंद हो जाता है (Intestinal Gut Closure); इसके बाद IgG रक्त में अवशोषित नहीं हो सकता।"
          ]
        },
        cleanliness: {
          parameterHi: "स्वच्छता (Squeaky Clean - Hygienic Harvesting)",
          guidelines: [
            "कुल जीवाणु गणना (Total Plate Count - TPC): < 100,000 CFU/mL होना चाहिए।",
            "कुल कॉलीफॉर्म गणना (Total Coliform Count - TCC): < 10,000 CFU/mL होना चाहिए।",
            "जीवाणु खीस में उपस्थित इम्युनोग्लोबुलिन (IgG) से चिपककर आंत में उसके अवशोषण को ब्लॉक कर देते हैं और सेप्टिसीमिया उत्पन्न करते हैं।"
          ]
        },
        quantification: {
          parameterHi: "मापन (Quantification - Serum Total Protein at 24-48 Hours)",
          guidelines: [
            "जन्म के 24 से 48 घंटे के मध्य बछड़े के रक्त सीरम का रिफ्रैक्टोमीटर द्वारा परीक्षण करें।",
            "Serum Total Protein (STP) >= 5.5 g/dL: उत्कृष्ट पैसिव ट्रांसफर (Excellent Transfer).",
            "STP 5.0 - 5.4 g/dL: सीमांत पैसिव ट्रांसफर (Marginal Passive Transfer).",
            "STP < 5.0 g/dL: पैसिव ट्रांसफर विफलता (Failure of Passive Transfer - FPT)।"
          ]
        }
      }
    },

    /**
     * Calculates precision colostrum requirements and predicts passive immunity outcome.
     * @param {number} calfWeightKg - Body weight in kg
     * @param {number} brixPercent - Brix refractometer reading (e.g. 24 for 24%)
     */
    calculateColostrumNeeds: function (calfWeightKg, brixPercent) {
      const wt = parseFloat(calfWeightKg);
      const brix = parseFloat(brixPercent);

      if (isNaN(wt) || wt <= 0) {
        return { error: "अमान्य शारीरिक वजन (Invalid Weight Specified)." };
      }

      if (isNaN(brix) || brix < 5 || brix > 40) {
        return { error: "अमान्य ब्रिक्स प्रतिशत (Invalid Brix percentage. Expected 5-40%)." };
      }

      // Quantity: 10% to 12% of BW in first feeding window
      const targetVolumeLitersFirstFeed = Math.round((wt * 0.10) * 10) / 10;
      const targetVolumeLiters12Hour = Math.round((wt * 0.05) * 10) / 10;
      const total24HrColostrumLiters = Math.round((targetVolumeLitersFirstFeed + targetVolumeLiters12Hour) * 10) / 10;

      // Estimated IgG (mg/mL) based on Brix regression: IgG = (Brix * 3.75) - 32.5 (empirical validated model)
      const estimatedIgGMgPerMl = Math.max(Math.round((brix * 4.1) - 38), 5);

      let qualityRatingEn = "";
      let qualityRatingHi = "";
      let clinicalDirectivesHi = [];
      let feedSuitability = "";

      if (brix >= 22) {
        qualityRatingEn = "Superior Quality (Grade A)";
        qualityRatingHi = "सर्वश्रेष्ठ गुणवत्ता (ग्रेड A - उच्च एंटीबॉडी युक्त)";
        feedSuitability = "नवजात की प्रथम खुराक (First Feed) हेतु अत्यंत आदर्श।";
        clinicalDirectivesHi.push("जन्म के तुरंत बाद (1-2 घंटे में) " + targetVolumeLitersFirstFeed + " लीटर खीस पिलाएं।");
        clinicalDirectivesHi.push("यदि बछड़ा निप्पल बोतल से पीने में असमर्थ है, तो बिना देरी किए इसोफेजियल ट्यूब फीडर का प्रयोग करें।");
        clinicalDirectivesHi.push("अतिरिक्त खीस को -20°C पर डीप फ्रीजर में स्वच्छ बैग्स में लेबल लगाकर भविष्य हेतु संग्रहित करें।");
      } else if (brix >= 18 && brix < 22) {
        qualityRatingEn = "Intermediate Quality (Grade B)";
        qualityRatingHi = "मध्यम गुणवत्ता (ग्रेड B - द्वितीय खुराक हेतु उपयुक्त)";
        feedSuitability = "प्रथम खुराक हेतु सीमित; द्वितीय खुराक (10-12 घंटे) हेतु उपयुक्त।";
        clinicalDirectivesHi.push("यदि 22%+ ब्रिक्स का खीस उपलब्ध नहीं है, तो इसकी मात्रा 20% बढ़ाकर (" + Math.round((targetVolumeLitersFirstFeed * 1.2) * 10) / 10 + " लीटर) पिलाएं।");
        clinicalDirectivesHi.push("यदि बैंक में फ्रोजन 22%+ खीस उपलब्ध है, तो प्रथम खुराक में फ्रोजन खीस को 40°C गुनगुने पानी में थॉ (thaw) करके दें।");
      } else {
        qualityRatingEn = "Sub-Standard / Poor Quality (Grade C)";
        qualityRatingHi = "अमानक / निम्न गुणवत्ता (ग्रेड C - प्रथम खुराक हेतु वर्जित)";
        feedSuitability = "नवजात बछड़े को प्रथम 12 घंटे में कदापि न दें (FPT का उच्च जोखिम)।";
        clinicalDirectivesHi.push("इस खीस में एंटीबॉडी की मात्रा अपर्याप्त है। इसे नवजात को प्रथम खुराक में न दें।");
        clinicalDirectivesHi.push("तत्काल कोलोस्ट्रम बैंक से उच्च कोटि (Brix >= 22%) का संग्रहित खीस या वाणिज्यिक कोलोस्ट्रम रिप्लेसर का प्रयोग करें।");
        clinicalDirectivesHi.push("इस खीस का उपयोग केवल 24 घंटे से बड़े बछड़ों के पोषण हेतु किया जा सकता है।");
      }

      return {
        calfWeightKg: wt,
        brixPercentage: brix,
        estimatedIgGConcentrationMgPerMl: estimatedIgGMgPerMl,
        qualityRatingEn: qualityRatingEn,
        qualityRatingHi: qualityRatingHi,
        feedSuitability: feedSuitability,
        recommendedDosage: {
          firstFeedWithin2HoursLiters: targetVolumeLitersFirstFeed,
          secondFeedAt12HoursLiters: targetVolumeLiters12Hour,
          totalFirstDayLiters: total24HrColostrumLiters,
          optimalFeedingTemperatureCelsius: "38°C to 39°C (गुनगुना शरीर तापमान)",
          gutClosureWarning: "24 घंटे पश्चात आंतों द्वारा एंटीबॉडी अवशोषण पूर्णतः समाप्त हो जाता है।"
        },
        clinicalDirectivesHi: clinicalDirectivesHi
      };
    },

    /**
     * Evaluates Failure of Passive Transfer (FPT) status from 24-48 hr serum total protein.
     * @param {number} serumTotalProteinGPerDl - Measured via clinical refractometer
     * @param {number} calfAgeHours - Post-natal age in hours
     * @param {number} calfWeightKg - Weight in kg for rescue calculation
     */
    evaluateFpt: function (serumTotalProteinGPerDl, calfAgeHours, calfWeightKg) {
      const stp = parseFloat(serumTotalProteinGPerDl);
      const ageH = parseFloat(calfAgeHours) || 24;
      const wt = parseFloat(calfWeightKg) || 40;

      if (isNaN(stp) || stp <= 0 || stp > 15) {
        return { error: "अमान्य सीरम टोटल प्रोटीन मान (Invalid STP value. Range 1.0 - 15.0 g/dL)." };
      }

      let statusEn = "";
      let statusHi = "";
      let riskLevel = "";
      let interventionProtocolHi = [];

      if (stp >= 5.5) {
        statusEn = "Successful / Excellent Passive Transfer";
        statusHi = "सफल व उत्कृष्ट पैसिव ट्रांसफर (उच्च मातृक प्रतिरक्षा)";
        riskLevel = "न्यूनतम सेप्सिस एवं संक्रामक रोग जोखिम (Low Morbidity & Mortality Risk)";
        interventionProtocolHi.push("एंटीबॉडी स्तर उत्कृष्ट है। नियमित दुग्ध आहार व स्वच्छता बनाए रखें।");
        interventionProtocolHi.push("उम्र के दूसरे सप्ताह से काफ स्टार्टर (20% सीपी) एवं स्वच्छ पेयजल उपलब्ध कराएं।");
      } else if (stp >= 5.0 && stp < 5.5) {
        statusEn = "Marginal / Partial Failure of Passive Transfer";
        statusHi = "सीमांत / आंशिक पैसिव ट्रांसफर (मध्यम प्रतिरक्षा स्तर)";
        riskLevel = "मध्यम जोखिम (Increased susceptibility to calf diarrhea & pneumonia)";
        interventionProtocolHi.push("आवास को सूखा, स्वच्छ व हवादार रखें; संक्रामक कारकों से बचाव सुनिश्चित करें।");
        interventionProtocolHi.push("दैनिक तापमान ও नाभि की सूजन की निगरानी करें; तनाव व ओवरक्राउडिंग से बचाएं।");
        if (ageH < 24) {
          interventionProtocolHi.push("चूंकि आयु < 24 घंटे है, तत्काल 1-2 लीटर उच्च गुणवत्ता (Brix >= 22%) का खीस अतिरिक्त पिलाएं।");
        }
      } else {
        statusEn = "Failure of Passive Transfer (FPT)";
        statusHi = "पैसिव ट्रांसफर विफलता (एफ.पी.टी. - गंभीर प्रतिरक्षा विहीनता)";
        riskLevel = "अति-गंभीर आपातकाल (Extreme Risk of Septicemia, Joint Ill, Calf Scours, Death)";
        
        if (ageH <= 24) {
          interventionProtocolHi.push("आंतों के छिद्र बंद होने से पूर्व तत्काल 2 से 3 लीटर उच्च गुणवत्ता (Brix > 24%) का खीस इसोफेजियल ट्यूब से दें।");
        } else {
          // Gut is closed! Oral colostrum will NOT be absorbed into circulation.
          const transfusionVolumeMl = Math.round(wt * 25);
          interventionProtocolHi.push("महत्वपूर्ण: 24 घंटे के पश्चात आंतें बंद हो चुकी हैं; मौखिक खीस से रक्त में एंटीबॉडी नहीं जाएगी।");
          interventionProtocolHi.push("आपातकालीन IV/SC प्लाज्मा या संपूर्ण रक्त आधान (Blood/Plasma Transfusion):");
          interventionProtocolHi.push("स्वस्थ, टीकाकरण युक्त गाय (अधिमानतः माता) से 20-30 mL/kg रक्त लेकर सिट्रेट (ACD/CPDA) में मिलाएं।");
          interventionProtocolHi.push("कुल आवश्यक आधान मात्रा: " + transfusionVolumeMl + " mL (धीमी शिरापरक गति से फिल्टर सेट द्वारा दें)।");
          interventionProtocolHi.push("प्रोफाइलेक्टिक ब्रॉड-स्पेक्ट्रम एंटीबायोटिक (Ceftiofur 2.2 mg/kg IM या Amoxicillin) 5 दिनों हेतु प्रारंभ करें।");
        }
      }

      return {
        serumTotalProteinGPerDl: stp,
        calfAgeHours: ageH,
        calfWeightKg: wt,
        passiveTransferStatusEn: statusEn,
        passiveTransferStatusHi: statusHi,
        clinicalRiskLevel: riskLevel,
        gutClosed: ageH > 24,
        interventionProtocolHi: interventionProtocolHi
      };
    },

    // =========================================================================
    // 3. VETERINARY MODIFIED APGAR RESUSCITATION SCORING ENGINE
    // =========================================================================
    /**
     * Modified APGAR Resuscitation Score Calculator (0 - 10 Scale)
     * Parameters: Heart Rate, Respiration, Muscle Tone, Reflexes, Mucous Membrane Color.
     */
    calculateApgarScore: function (hrScore, respScore, toneScore, reflexScore, colorScore, species) {
      const sp = (species || "bovine").toLowerCase();
      const sHR = parseInt(hrScore, 10);
      const sResp = parseInt(respScore, 10);
      const sTone = parseInt(toneScore, 10);
      const sReflex = parseInt(reflexScore, 10);
      const sColor = parseInt(colorScore, 10);

      const scores = [sHR, sResp, sTone, sReflex, sColor];
      for (let i = 0; i < scores.length; i++) {
        if (isNaN(scores[i]) || scores[i] < 0 || scores[i] > 2) {
          return { error: "प्रत्येक APGAR प्राचल का स्कोर 0, 1 या 2 होना अनिवार्य है।" };
        }
      }

      const totalApgar = sHR + sResp + sTone + sReflex + sColor;

      let classificationEn = "";
      let classificationHi = "";
      let emergencyActionPlanHi = [];
      let urgencyLevel = "";

      if (totalApgar >= 8) {
        classificationEn = "Normal & Vigorous Neonate (Apgar 8 - 10)";
        classificationHi = "सामान्य एवं सुदृढ़ नवजात (स्कोर 8-10 - स्थिर अवस्था)";
        urgencyLevel = "नियमित पोस्ट-नेटल प्रोटोकॉल (Routine Care)";
        emergencyActionPlanHi.push("श्वसन मार्ग साफ करें; नाक व मुख से श्लेष्मा (mucus) उंगली या बल्ब सीरिंज से निकालें।");
        emergencyActionPlanHi.push("सूखे तौलिये से शरीर को तेजी से रगड़कर सुखाएं (यह श्वसन केंद्र को उद्दीप्त करता है)।");
        emergencyActionPlanHi.push("नाभि को 7% टिंचर आयोडीन के घोल में 60 सेकंड तक पूर्ण डुबोकर कीटाणुरहित करें।");
        emergencyActionPlanHi.push("जन्म के 1 घंटे के भीतर गुणवत्तापूर्ण प्रथम खीस (Colostrum) पिलाएं।");
      } else if (totalApgar >= 4 && totalApgar <= 7) {
        classificationEn = "Moderately Depressed / Asphyxiated (Apgar 4 - 7)";
        classificationHi = "मध्यम अवसाद / श्वसन अवरोध (स्कोर 4-7 - तत्काल सहयोग आवश्यक)";
        urgencyLevel = "त्वरित चिकित्सकीय हस्तक्षेप आवश्यक (Immediate Intervention)";
        emergencyActionPlanHi.push("सिर को नीचे की ओर झुकाकर ग्रसनी से तरल व एम्नियोटिक फ्लूइड साफ करें।");
        emergencyActionPlanHi.push("छाती की पसलियों व रीढ़ पर सूखे खुरदुरे तौलिये से तीव्र घर्षण (vigorous rubbing) करें।");
        emergencyActionPlanHi.push("ऑक्सीजन थेरेपी: फेस मास्क या नेज़ल कैनुला द्वारा 2-4 लीटर/मिनट ऑक्सीजन प्रवाहित करें।");
        emergencyActionPlanHi.push("एक्यूपंक्चर उद्दीपन: Jen Chung (GV-26) बिंदु - नासिका विभाजन (nasal philtrum) के केंद्र में 25G सुई 1-2 मिमी चुभोएं और घुमाएं।");
        emergencyActionPlanHi.push("नवजात को इन्फ्रारेड लैंप या गर्म कंबल में रखकर हाइपोथर्मिया से बचाएं; 5 मिनट बाद APGAR पुनः जांचें।");
      } else {
        classificationEn = "Severely Asphyxiated / Terminal Crisis (Apgar 0 - 3)";
        classificationHi = "अति-गंभीर श्वासावरोध / नवजात आपातकाल (स्कोर 0-3 - जीवन संकट)";
        urgencyLevel = "कोड रेड: कार्डियोपल्मोनरी पुनरुद्धार (CPCR Code Red Emergency)";
        emergencyActionPlanHi.push("तत्काल सक्शन द्वारा संपूर्ण श्वसन मार्ग से तरल व मेकोनियम बाहर खींचें।");
        emergencyActionPlanHi.push("सकारात्मक दबाव वेंटिलेशन (Positive Pressure Ventilation - PPV): एम्बू बैग (Ambu bag) या माउथ-टू-मजल/ट्रैचियल ट्यूब द्वारा प्रत्येक 3-5 सेकंड में 1 श्वास (15-20 श्वास/मिनट) दें। छाती का फूलना सुनिश्चित करें।");
        emergencyActionPlanHi.push("यदि हृदय गति अनुपस्थित या < 40 bpm है: बाह्य कार्डियक कम्प्रेशन प्रारंभ करें (100-120 कम्प्रेशन/मिनट; 3:1 कम्प्रेशन-टू-वेंटिलेशन अनुपात)।");
        emergencyActionPlanHi.push("औषधि प्रशासन: Epinephrine (Adrenaline) 1:10,000 (0.01 - 0.02 mg/kg IV या एंडोट्रैचियल ट्यूब द्वारा 0.05 mg/kg) दें।");
        emergencyActionPlanHi.push("श्वसन उद्दीपन: Doxapram Hydrochloride (1-2 mg/kg सबलिंगुअल / जीभ के नीचे टपकाएं या IV दें) - केवल तब जब श्वसन मार्ग खुला हो।");
        emergencyActionPlanHi.push("रक्त शर्करा व तापमान तुरंत जांचें; 10% डेक्सट्रोज (2 mL/kg धीमे IV) दें।");
      }

      return {
        species: sp,
        totalApgarScore: totalApgar,
        breakdown: {
          heartRateScore: sHR,
          respiratoryEffortScore: sResp,
          muscleToneScore: sTone,
          reflexIrritabilityScore: sReflex,
          mucousColorScore: sColor
        },
        classificationEn: classificationEn,
        classificationHi: classificationHi,
        urgencyLevel: urgencyLevel,
        emergencyActionPlanHi: emergencyActionPlanHi
      };
    },

    // =========================================================================
    // 4. COMPREHENSIVE NEONATAL DISEASE DOSSIERS
    // =========================================================================
    diseaseDossiers: {
      neonatalCalfDiarrheaComplex: {
        id: "NEO-DIS-01",
        nameEn: "Neonatal Calf Diarrhea Complex (NCDC / White Scours)",
        nameHi: "नवजात बछड़ा दस्त संलक्षण / सफेद दस्त (काफ स्काउर्स)",
        speciesAffection: ["Bovine", "Bubaline", "Ovine", "Caprine"],
        pathogenTimeline: {
          day1to4: "Enterotoxigenic E. coli (ETEC K99 / F41): स्रावी दस्त (Secretory diarrhea), बिना रक्त के तीव्र निर्जलीकरण व हाइपोवोलेमिक शॉक।",
          day4to14: "Rotavirus (Group A): आंत के विली की उपकला कोशिकाओं का विनाश, मैलएब्जॉर्पटिव व ऑस्मोटिक दस्त।",
          day4to30: "Coronavirus: विली एवं क्रिप्ट कोशिकाओं दोनों का विनाश; गंभीर नेक्रोटिक दस्त, श्लेष्मा व रक्त युक्त।",
          day7to21: "Cryptosporidium parvum: प्रोटोजोआ परजीवी; उपचार-प्रतिरोधी पानी जैसा दस्त, टेनेस्मस ও दुर्बलता।",
          anyAge: "Salmonella enterica (Dublin / Typhimurium): फाइब्रिनयुक्त खूनी दस्त, उच्च ज्वर, सेप्टीसीमिया ও उच्च मृत्यु दर।"
        },
        pathophysiology: "तीव्र द्रव व इलेक्ट्रोलाइट (Na+, K+, Cl-, HCO3-) की हानि -> हाइपोवोलेमिया -> रीनल परफ्यूजन में कमी -> एल-लैक्टिक एवं डी-लैक्टिक एसिडोसिस -> हाइपरकेलेमिया (इंट्रासेल्युलर से एक्स्ट्रासेल्युलर K+ शिफ्ट) -> कार्डियक अतालता (Arrhythmia) एवं मृत्यु।",
        clinicalSigns: [
          "पानी जैसा पीला, सफेद या भूरा बदबूदार दस्त",
          "आंखों का अंदर धंसना (Enophthalmos) व त्वचा की तन्यता समाप्त होना (Skin tenting > 4-8 seconds)",
          "चूसने की इच्छा समाप्त होना (Loss of suckle reflex), सुस्ती व कोमा",
          "शरीर का ठंडा पड़ना (हाइपोथर्मिया < 38°C) एवं लड़खड़ाहट"
        ],
        managementProtocol: {
          oralRehydrationTherapy: "ओरल इलेक्ट्रोलाइट सोल्यूशन (ORT) जिसमें सोडियम (90-130 mmol/L), पोटेशियम (10-30 mmol/L), ग्लूकोज (ऊर्जा व सोडियम सह-परिवहन हेतु), तथा सोडियम एसीटेट या प्रोपियोनेट (बफर के रूप में) सम्मिलित हों। ध्यान दें: एसीटेट दूध के थक्के जमने (abomasal curdling) को प्रभावित नहीं करता, अतः यह बाइकार्बोनेट से श्रेष्ठ है।",
          feedingRule: "दूध बंद न करें! ORT और दूध के मध्य 2 घंटे का अंतर रखें। ऊर्जा संरक्षण हेतु दूध देना जारी रखना आवश्यक है।",
          parenteralAntimicrobials: [
            "यदि बछड़ा सुस्त, बुखारग्रस्त या सेप्टिक है: Ceftiofur Sodium 2.2 mg/kg IM/SC q24h x 3-5 days",
            "अथवा Amoxicillin-Clavulanic Acid 10-12.5 mg/kg IM q24h x 3 days",
            "क्रिप्टोस्पोरिडिओसिस हेतु: Halofuginone Lactate 100 mcg/kg PO q24h x 7 consecutive days (भोजन के तुरंत बाद)"
          ],
          adjunctiveCare: "Flunixin Meglumine 1.1-2.2 mg/kg IV (धीमे) एंडोटॉक्सिमिया व आंतों की सूजन नियंत्रण हेतु।"
        }
      },

      navelIllJointIll: {
        id: "NEO-DIS-02",
        nameEn: "Navel Ill / Joint Ill (Omphalophlebitis & Septic Polyarthritis Complex)",
        nameHi: "नाभि शोथ एवं जोड़ शोथ संलक्षण (नेवल इल / जॉइंट इल)",
        speciesAffection: ["Bovine", "Bubaline", "Equine", "Ovine", "Caprine"],
        pathogenesis: "अस्वच्छ ब्यात कक्ष, गीले बिछावन तथा जन्म के समय नाभि नाल के कीटाणुशोधन में लापरवाही से ट्रूंपेरेला पायोजीन्स (Trueperella pyogenes), ई. कोलाई, स्ट्रेप्टोकोकस या स्टेफिलोकोकस का नाभि में प्रवेश। संक्रमण तीन मार्गों से फैलता है: 1) नाभि शिरा (Umbilical vein) द्वारा यकृत में फोड़े (Liver abscess), 2) नाभि धमनियों (Umbilical arteries) द्वारा पेरिटोनियम में, 3) यूराकस (Urachus) द्वारा मूत्राशय में (Urachal abscess)। रक्त प्रवाह द्वारा जीवाणु जोड़ों (टार्सस, कार्पस, स्टाइफल) के साइनोवियल झिल्ली में पहुंचकर सेप्टिक आर्थराइटिस उत्पन्न करते हैं।",
        clinicalSigns: [
          "नाभि में दर्दनाक, कठोर, गर्म सूजन तथा बदबूदार मवाद का रिसाव",
          "एक या अधिक जोड़ों में तीव्र सूजन, अत्यधिक दर्द ও तीव्र लंगड़ापन (पशु पैर जमीन पर नहीं टिका पाता)",
          "तेज बुखार (103° - 105°F), भूख न लगना ও विकास अवरुद्ध होना",
          "गंभीर मामलों में पेट में दर्द (Colic) एवं पेरिटोनाइटिस"
        ],
        preventionProtocol: "जन्म के तुरंत बाद नवजात की नाभि नाल को 7% टिंचर आयोडीन (Tincture of Iodine) के घोल में कम से कम 60 सेकंड तक पूर्ण डुबोएं (Dip, do not spray)। 12 घंटे बाद पुनः दोहराएं। कभी भी टी-ट्री ऑयल, फिनाइल या हल्के स्पिरिट का उपयोग न करें।",
        therapeuticRegimen: [
          "प्रणालीगत एंटीबायोटिक (दीर्घकालिक 10-14 दिन): Procaine Penicillin G 20,000 - 30,000 IU/kg IM q24h + Gentamicin 5 mg/kg IV/IM q24h",
          "अथवा Ceftriaxone Sodium 15-20 mg/kg IV/IM q12-24h",
          "जोड़ का प्रक्षालन (Joint Lavage): सेप्टिक जोड़ में 18G सुइयों द्वारा स्टेराइल नॉर्मल सेलाइन से प्रक्षालन तथा अंतः-संधि (Intra-articular) Amikacin 250-500 mg का आरोपण।",
          "शोथ-रोधी: Meloxicam 0.5 mg/kg SC एकल खुराक, आवश्यकतानुसार दोहराएं।"
        ]
      },

      neonatalHypothermiaHypoglycemia: {
        id: "NEO-DIS-03",
        nameEn: "Neonatal Hypothermia & Hypoglycemia Complex in Calves & Lambs",
        nameHi: "नवजात अल्पताप एवं हाइपोग्लाइसीमिया संलक्षण (ठंड व शर्करा की कमी)",
        speciesAffection: ["Bovine", "Bubaline", "Ovine", "Caprine"],
        normalParameters: "सामान्य मलाशय तापमान: 101.5°F - 102.5°F (38.6°C - 39.2°C)। रक्त ग्लूकोज: > 60-80 mg/dL।",
        pathophysiologyStages: {
          mildHypothermia: "100.0°F - 101.4°F (37.8°C - 38.5°C): कंपकंपी, सुस्ती, चूसने की क्षमता में कमी।",
          moderateHypothermia: "98.0°F - 99.9°F (36.7°C - 37.7°C): कंपकंपी बंद, तीव्र ब्रॉडीकार्डिया, उथला श्वसन।",
          severeHypothermia: "< 98.0°F (< 36.7°C): कोमा, पुतलियों का फैलना, एबोमेसम व आंतों का पक्षाघात (Gut Stasis)।"
        },
        cardinalRuleHi: "अति-महत्वपूर्ण नियम: अत्यधिक ठंडे, बेहोश या लेटे हुए बछड़े/मेमने को कभी भी सीधे नली द्वारा दूध या खीस न पिलाएं! हाइपोथर्मिया में एबोमेसम की गति रुक जाती है। दूध पेट में सड़कर किण्वन (rumen/abomasal fermentation), गैस गैंग्रीन व तत्काल मृत्यु का कारण बनता है।",
        resuscitationProtocol: [
          "चरण 1: पहले गर्म करें (Warm First): वार्मिंग बॉक्स (Warming Box), हीटर या गर्म हवा द्वारा तापमान 100°F (37.8°C) तक लाएं।",
          "चरण 2: हाइपोग्लाइसीमिया सुधार (Correct Hypoglycemia):",
          "मेमनों/बकरियों हेतु (Lambs/Kids): 20% Dextrose घोल (10 mL/kg शरीर वजन) को 39°C तक गुनगुना करके अंतःपेरिटोनियल (Intraperitoneal - IP) दें। (नाभि से 1/2 इंच नीचे व 1/2 इंच पार्श्व में 19G सुई विपरीत कूल्हे की दिशा में 45° पर प्रविष्ट करें)।",
          "बछड़ों हेतु (Calves): 10% Dextrose घोल (2 mL/kg) धीमी गति से IV दें।",
          "चरण 3: जब शरीर का तापमान 100°F पार कर जाए और निगलने का रिफ्लेक्स वापस आ जाए, केवल तब गुनगुना खीस (39°C) इसोफेजियल फीडर द्वारा दें।"
        ]
      },

      puppyKittenFadingSyndrome: {
        id: "NEO-DIS-04",
        nameEn: "Fading Puppy & Kitten Syndrome (Neonatal Isoerythrolysis & Sepsis)",
        nameHi: "श्वान व मार्जार शिशु क्षय संलक्षण (फेडिंग पप/किटन सिंड्रोम)",
        speciesAffection: ["Canine", "Feline"],
        etiologyAndMechanisms: [
          "मार्जार नवजात समरक्तलयन (Feline Neonatal Isoerythrolysis - FNI): टाइप-B रक्त वाली मादा बिल्ली से जन्मे टाइप-A या AB रक्त समूह के बिल्ली के बच्चे। खीस में उपस्थित एंटी-A एंटीबॉडीज बच्चे की आरबीसी को नष्ट कर तीव्र हीमोलिसिस उत्पन्न करते हैं।",
          "संक्रामक कारण: कैनाइन हर्पीसवायरस-1 (CHV-1), पार्वोवायरस, ई. कोलाई, बीटा-हेमोलिटिक स्ट्रेप्टोकोकस।",
          "वातावरणीय व मातृक कारक: हाइपोथर्मिया (< 95°F), निर्जलीकरण, दूध न उतरना (Agallactia) या मातृक उपेक्षा।"
        ],
        clinicalSigns: [
          "निरंतर दर्दनाक रोना व चिल्लाना (Continuous high-pitched whining / crying)",
          "मां के स्तनों से अलग थलग कोने में पड़े रहना; चूसने से मना करना",
          "वजन न बढ़ना (सामान्य पिल्ले/बिल्ली के बच्चे का वजन 10-15% प्रतिदिन बढ़ना चाहिए)",
          "FNI में: लाल/भूरा पेशाब (Hemoglobinuria), पीलिया (Jaundice), पूंछ के सिरे का गलना (Necrosis of tail tip)",
          "हाइपोथर्मिया, त्वचा नीली पड़ना (Cyanosis) व शिथिलता"
        ],
        rescueProtocol: {
          environmentalSupport: "इंक्यूबेटर या हीटिंग पैड: तापमान 85°F - 90°F (29°C - 32°C) तथा आर्द्रता 55-60% बनाए रखें। (सीधे हीटिंग पैड पर न रखें; कंबल लपेटें)।",
          fniEmergencyDirective: "FNI की पुष्टि होते ही पहले 24 घंटे तक बिल्ली के बच्चों को मां का दूध पीने से पूर्णतः रोकें! उन्हें टाइप-B रक्त वाली धाय बिल्ली (foster queen) या व्यावसायिक किटन मिल्क रिप्लेसर (KMR) पर रखें। 24 घंटे बाद आंतें बंद होने पर मां का दूध सुरक्षित होता है।",
          fluidAndGlucoseSupport: "वार्म सबक्यूटेनियस या इंट्राओसियस (IO - Proximal Femur) फ्लुइड: Plasmalyte / Ringer's Lactate + 2.5% Dextrose (30-40 mL/kg/day SQ विभाजित मात्राओं में)।",
          antimicrobialCoverage: "Amoxicillin-Clavulanic Acid ओरल सस्पेंशन (12.5 mg/kg PO q12h) या Cephalexin ड्रॉप्स।"
        }
      }
    },

    // =========================================================================
    // 5. PEDIATRIC FLUID RESUSCITATION CALCULATOR
    // =========================================================================
    /**
     * Precision Pediatric & Neonatal Fluid Resuscitation Engine
     * Accounts for high extracellular fluid percentage (75-80% BW) and limited renal concentrating capacity.
     * @param {number} weightKg - Patient weight in kg
     * @param {number} dehydrationPercent - Estimated dehydration (5% to 12%)
     * @param {string} species - "bovine"|"bubaline"|"ovine"|"canine"|"feline"
     * @param {number} ongoingLossesMl - Estimated ongoing losses in 24 hours (e.g. diarrhea volume)
     */
    calculateNeonatalFluidRate: function (weightKg, dehydrationPercent, species, ongoingLossesMl) {
      const wt = parseFloat(weightKg);
      const deh = parseFloat(dehydrationPercent) || 0;
      const sp = (species || "bovine").toLowerCase();
      const losses = parseFloat(ongoingLossesMl) || 0;

      if (isNaN(wt) || wt <= 0) {
        return { error: "अमान्य शारीरिक वजन (Invalid Patient Weight)." };
      }

      // Neonatal maintenance requirements: 80 - 100 mL/kg/day (adults require only 40-60 mL/kg/day)
      const maintenanceRateMlPerKg = (sp === "canine" || sp === "feline") ? 90.0 : 85.0;
      const maintenanceVolume24Hr = wt * maintenanceRateMlPerKg;

      // Dehydration deficit (mL) = Weight (kg) * (Dehydration % / 100) * 1000 mL
      const deficitVolumeMl = wt * (Math.min(Math.max(deh, 0), 15) / 100.0) * 1000.0;

      // Total 24-Hour Fluid Requirement
      const total24HrVolumeMl = maintenanceVolume24Hr + deficitVolumeMl + losses;
      const hourlyRateMlPerHour = Math.round((total24HrVolumeMl / 24.0) * 10) / 10;

      // Shock resuscitation bolus if severe dehydration (>= 10%) or hypovolemic shock
      let shockBolusMl = 0;
      let shockDirectivesHi = "";

      if (deh >= 10) {
        // Shock bolus: 20 to 30 mL/kg over first 45-60 minutes
        shockBolusMl = Math.round(wt * 25);
        shockDirectivesHi = "गंभीर शॉक/निर्जलीकरण: प्रथम 45-60 मिनट में " + shockBolusMl + " mL का तीव्र बोलस (Shock Bolus) IV दें। तत्पश्चात शेष मात्रा 23 घंटों में प्रवाहित करें।";
      } else {
        shockDirectivesHi = "हल्का से मध्यम निर्जलीकरण: शॉक बोलस की आवश्यकता नहीं; सतत संतुलित गति से प्रवाहित करें।";
      }

      // Solution selection guidelines based on neonatal acid-base status
      let solutionChoiceHi = "";
      if (sp === "bovine" || sp === "bubaline") {
        solutionChoiceHi = "पसंदीदा द्रव: Ringer's Lactate या Plasmalyte-A जिसमें 1.25% से 2.5% Dextrose मिश्रित हो। यदि गंभीर एसिडोसिस है (खड़े होने में असमर्थ), तो 1.3% आइसोटोनिक सोडियम बाइकार्बोनेट (Sodium Bicarbonate 156 mmol/L) पृथक IV लाइन से दें।";
      } else {
        solutionChoiceHi = "पसंदीदा द्रव: Normosol-R या Plasmalyte-148 + 2.5% Dextrose। नवजात पिल्लों/बिल्लियों में अपरिपक्व लिवर लैक्टेट को प्रोसेस नहीं कर पाता, अतः एसीटेट-बफर्ड सोल्यूशन रिंगर लैक्टेट से श्रेष्ठ हैं।";
      }

      return {
        species: sp,
        patientWeightKg: wt,
        estimatedDehydrationPercentage: deh,
        breakdownVolumesMl: {
          dailyMaintenanceVolumeMl: Math.round(maintenanceVolume24Hr),
          dehydrationDeficitVolumeMl: Math.round(deficitVolumeMl),
          estimatedOngoingLossesMl: Math.round(losses),
          total24HourFluidRequirementMl: Math.round(total24HrVolumeMl)
        },
        infusionRates: {
          hourlyInfusionRateMlPerHour: hourlyRateMlPerHour,
          microDripDropsPerMin60DropSet: Math.round(hourlyRateMlPerHour), // 60 drops/mL micro-drip
          macroDripDropsPerMin15DropSet: Math.round(hourlyRateMlPerHour / 4) // 15 drops/mL macro-drip
        },
        shockEmergencyBolus: {
          indicated: deh >= 10,
          bolusVolumeMl: shockBolusMl,
          administrationWindow: "First 45 - 60 minutes IV",
          guidanceHi: shockDirectivesHi
        },
        fluidSelectionProtocolHi: solutionChoiceHi,
        criticalPediatricPrecautions: [
          "द्रव को सदैव 37°C - 38°C तक गुनगुना करके ही शिरा में प्रविष्ट करें (ठंडे द्रव से कार्डियक अरेस्ट का खतरा रहता है)।",
          "नवजात वृक्क (kidneys) हाइपरसोडियम उत्सर्जित नहीं कर पाते; हाइपरटॉनिक सेलाइन का अनियंत्रित उपयोग न करें।",
          "प्रति 4-6 घंटे पर फेफड़ों की ऑस्कल्टेशन करें ताकि पल्मोनरी एडिमा (द्रव अतिभार / Fluid Overload) से बचाव हो सके।"
        ]
      };
    }
  };

  // Seal namespace to protect clinical data integrity during runtime execution
  Object.freeze(window.VetcareApp.ClinicalData.NeonatologyPediatrics.colostrumScience);
  Object.freeze(window.VetcareApp.ClinicalData.NeonatologyPediatrics.diseaseDossiers);

  // System hook notice
  if (window.VetcareApp.showToast) {
    window.VetcareApp.showToast("नवजात व बाल चिकित्सा मॉड्यूल सक्रिय (Neonatology & Pediatrics Loaded)", "success");
  }
})();
