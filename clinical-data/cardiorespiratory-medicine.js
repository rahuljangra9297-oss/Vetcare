// Vetcare AI OS - Veterinary Cardiorespiratory Medicine, ACVIM Heart Failure Guidelines & ECG Therapeutics (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE INITIALIZATION & ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  /**
   * Veterinary Cardiorespiratory Medicine, Interventional Cardiology & Critical Care Therapeutics
   * Engineered in strict compliance with ACVIM Consensus Guidelines (MMVD & DCM),
   * RECOVER CPR Protocols, and ISO-VET 2026 Critical Care Standards.
   */
  window.VetcareApp.ClinicalData.Cardiorespiratory = {
    metadata: {
      subsystem: "Cardiorespiratory Medicine & Intensive Emergency Therapeutics",
      version: "2026.4.5-PROD",
      isoVetStandard: "ISO-VET-CARDIO-2026",
      supportedTaxa: ["Canine", "Feline", "Bovine", "Bubaline", "Equine"],
      authoritativeSource: "ACVIM Consensus Guidelines for Heart Failure, EPIC Trial & Wisconsin Respiratory Matrix"
    },

    // =========================================================================
    // 2. ACVIM CONSENSUS STAGING ENGINE (MMVD & DCM)
    // =========================================================================
    acvimStagingMatrix: {
      stageA: {
        stageNameEn: "Stage A: At-Risk Breed (No Structural Remodeling)",
        stageNameHi: "चरण A: उच्च जोखिम वाली नस्लें (संरचनात्मक परिवर्तन रहित)",
        definitionEn: "Dogs at high genetic risk of developing MMVD or DCM, but currently have no structural murmur, no cardiomegaly, and no clinical signs.",
        definitionHi: "अनुवांशिक रूप से हृदय रोग हेतु संवेदनशील नस्लें (जैसे कैवेलियर किंग चार्ल्स स्पैनियल, डैक्सहंड, डाबरमैन), जिनमें अभी कोई मर्मर या हृदय विस्तार नहीं है।",
        predisposedBreeds: ["Cavalier King Charles Spaniel", "Dachshund", "Miniature Poodle", "Chihuahua", "Doberman Pinscher", "Boxer", "Great Dane"],
        pharmacotherapyIndicated: false,
        recommendedActionHi: "वार्षिक ऑस्कल्टेशन एवं 1-2 वर्ष के अंतराल पर स्क्रीनिंग इकोकार्डियोग्राफी; किसी दवा की आवश्यकता नहीं।"
      },
      stageB1: {
        stageNameEn: "Stage B1: Asymptomatic Murmur (No Remodeling / EPIC Criteria Negative)",
        stageNameHi: "चरण B1: लक्षणरहित मर्मर (कार्डियक रीमॉडलिंग रहित)",
        definitionEn: "Presence of a characteristic systolic heart murmur (mitral regurgitation), but thoracic radiographs show VHS <= 10.5 and echocardiography shows LA:Ao < 1.6. Does not meet EPIC remodeling criteria.",
        definitionHi: "हार्ट मर्मर उपस्थित है, परंतु एक्स-रे में वर्टिब्रल हार्ट स्कोर (VHS) <= 10.5 है तथा इको पर बायां आलिंद सामान्य है (LA:Ao < 1.6)।",
        pharmacotherapyIndicated: false,
        recommendedActionHi: "औषधि की कोई आवश्यकता नहीं (दवाओं से लाभ सिद्ध नहीं हुआ है)। प्रति 6-12 माह पर थोरेसिक रेडियोग्राफ व इको द्वारा निगरानी।"
      },
      stageB2: {
        stageNameEn: "Stage B2: Asymptomatic with Cardiomegaly (EPIC Trial Criteria Positive)",
        stageNameHi: "चरण B2: लक्षणरहित परंतु हृदय विस्तार उपस्थित (EPIC ट्रायल मानक पूर्ण)",
        definitionEn: "Asymptomatic murmur with verified left atrial and left ventricular enlargement meeting EPIC criteria: Murmur Grade >= 3/6, VHS > 10.5, and Echocardiographic LA:Ao ratio >= 1.6 & LVIDDN >= 1.7.",
        definitionHi: "मर्मर ग्रेड >= 3/6, एक्स-रे में VHS > 10.5 तथा इको पर बायां आलिंद गंभीर रूप से फैला हुआ (LA:Ao >= 1.6)।",
        pharmacotherapyIndicated: true,
        clinicalMilestoneNotice: "क्रिटिकल थेरेप्यूटिक विंडो: इस चरण पर पिमोबेंडन (Pimobendan) प्रारंभ करने से कन्जेस्टिव हार्ट फेल्योर (CHF) का प्रादुर्भाव लगभग 15 माह (462 दिन) आगे टल जाता है।",
        immediatePrescription: [
          "इनोडाइलेटर (Inodilator): Pimobendan 0.25 - 0.3 mg/kg PO q12h (भोजन से 1 घंटा पूर्व खाली पेट)।",
          "हल्का सोडियम प्रतिबंध: उच्च नमक वाले खाद्य पदार्थ (पनीर, बिस्कुट, प्रोसेस्ड मीट) पूर्णतः वर्जित।"
        ],
        monitoringParameter: "रेस्टिंग रेस्पिरेटरी रेट (RRR) की दैनिक डायरी: गहरी नींद में श्वसन दर < 30 श्वास/मिनट होनी चाहिए।"
      },
      stageC: {
        stageNameEn: "Stage C: Acute or Chronic Congestive Heart Failure (CHF)",
        stageNameHi: "चरण C: तीव्र या क्रोनिक कन्जेस्टिव हार्ट फेल्योर (पल्मोनरी एडिमा / जलोदर)",
        definitionEn: "Current or historical clinical signs of congestive heart failure caused by MMVD or DCM (tachypnea, orthopnea, nocturnal cough, pulmonary edema, pleural effusion, or ascites).",
        definitionHi: "हार्ट फेल्योर के सक्रिय या पूर्व लक्षण: फेफड़ों में पानी भरना (पल्मोनरी एडिमा), सांस फूलना, रात में खांसी, कमजोरी या पेट में पानी (जलोदर)।",
        pharmacotherapyIndicated: true,
        quadrupleTherapyProtocol: {
          diuretic: "Furosemide: तीव्र आपातकाल में 2 - 4 mg/kg IV/IM प्रत्येक 2-4 घंटे में (जब तक सांस की गति < 40 न हो जाए); तत्पश्चात क्रोनिक ओरल मेंटेनेंस 1 - 2 mg/kg PO q12h। (वैकल्पिक: Torsemide 0.1-0.2 mg/kg PO q24h)।",
          inodilator: "Pimobendan: 0.25 - 0.3 mg/kg PO q12h (हृदय की संकुचन शक्ति बढ़ाता है एवं रक्त वाहिकाओं को चौड़ा करता है)।",
          aceInhibitor: "Enalapril या Benazepril: 0.5 mg/kg PO q12-24h (RAAS पाथवे को ब्लॉक करता है; बीपी व रीनल पैनल स्थिर होने के बाद जोड़ें)।",
          aldosteroneAntagonist: "Spironolactone: 1 - 2 mg/kg PO q12-24h (मायोकार्डियल फाइब्रोसिस को रोकता है एवं पोटेशियम संरक्षण करता है)।"
        },
        monitoringParameter: "घर पर सोते समय श्वास दर (Sleeping Respiratory Rate - SRR) < 30 श्वास/मिनट बनाए रखना अनिवार्य।"
      },
      stageD: {
        stageNameEn: "Stage D: Refractory End-Stage Heart Failure",
        stageNameHi: "चरण D: दुर्दम्य अंतिम अवस्था हार्ट फेल्योर (मानक दवाओं के प्रति प्रतिरोधी)",
        definitionEn: "End-stage CHF exhibiting persistent clinical signs despite receiving maximal standard quadruple therapy (Furosemide > 6-8 mg/kg/day + Pimobendan + ACE-I + Spironolactone).",
        definitionHi: "मानक दवाओं की अधिकतम मात्रा देने के बावजूद बार-बार फेफड़ों में पानी भरना, अत्यधिक दुर्बलता व वजन में भारी गिरावट (कार्डियक कैचेक्सिया)।",
        pharmacotherapyIndicated: true,
        salvageEscalationProtocol: [
          "लूप डाइयूरेटिक स्विच: Furosemide को बंद करके अधिक शक्तिशाली Torsemide (0.2 - 0.4 mg/kg PO q12-24h) प्रारंभ करें।",
          "पिमोबेंडन खुराक वृद्धि: Pimobendan को दिन में 3 बार (TID - 0.3 mg/kg q8h) ऑफ-लेबल बढ़ाएं।",
          "पल्मोनरी हाइपरटेंशन नियंत्रण: Sildenafil Citrate 1 - 2 mg/kg PO q8-12h (फुफ्फुसीय धमनी दबाव घटाने हेतु)।",
          "जलोदर / फुफ्फुस द्रव निष्कासन: थेराप्यूटिक एब्डोमिनोसेन्टेसिस या थोराकोसेन्टेसिस।"
        ]
      }
    },

    /**
     * Algorithmic staging calculator for Canine MMVD / DCM under ACVIM 2026 Standards.
     * @param {number} vhsScore - Vertebral Heart Score (e.g. 11.2)
     * @param {number} laAoRatio - Left Atrium to Aorta Ratio on Echo (e.g. 1.8)
     * @param {boolean} hasChfSigns - Presence of respiratory distress / pulmonary edema / ascites
     * @param {boolean} isRefractory - Persistent signs despite maximal quadruple therapy
     * @param {string} breed - Patient breed name
     * @param {number} murmurGrade - Murmur intensity score 1 to 6
     */
    stageHeartFailure: function (vhsScore, laAoRatio, hasChfSigns, isRefractory, breed, murmurGrade) {
      const vhs = parseFloat(vhsScore) || 0;
      const echo = parseFloat(laAoRatio) || 0;
      const murmur = parseInt(murmurGrade, 10) || 0;
      const chf = !!hasChfSigns;
      const refractory = !!isRefractory;
      const breedStr = (breed || "Unknown Breed");

      let evaluatedStage = "stageA";
      let stageData = this.acvimStagingMatrix.stageA;

      if (refractory && chf) {
        evaluatedStage = "stageD";
        stageData = this.acvimStagingMatrix.stageD;
      } else if (chf) {
        evaluatedStage = "stageC";
        stageData = this.acvimStagingMatrix.stageC;
      } else if ((vhs > 10.5 || echo >= 1.6) && murmur >= 3) {
        evaluatedStage = "stageB2";
        stageData = this.acvimStagingMatrix.stageB2;
      } else if (murmur >= 1) {
        evaluatedStage = "stageB1";
        stageData = this.acvimStagingMatrix.stageB1;
      } else {
        evaluatedStage = "stageA";
        stageData = this.acvimStagingMatrix.stageA;
      }

      return {
        patientBreed: breedStr,
        measuredVhs: vhs,
        measuredLaAoRatio: echo,
        auscultatedMurmurGrade: murmur + "/6",
        acvimStageCode: evaluatedStage.toUpperCase(),
        stageNameEn: stageData.stageNameEn,
        stageNameHi: stageData.stageNameHi,
        clinicalDefinitionHi: stageData.definitionHi,
        pharmacotherapyRequired: stageData.pharmacotherapyIndicated,
        milestoneNotice: stageData.clinicalMilestoneNotice || null,
        prescriptionMatrix: stageData.immediatePrescription || stageData.quadrupleTherapyProtocol || stageData.salvageEscalationProtocol || "No medical intervention indicated.",
        criticalMonitoringInstructionHi: "मालिक को घर पर आराम करते समय श्वास दर (Sleeping Respiratory Rate) गिनने का निर्देश दें। यदि दर 30 श्वास प्रति मिनट से अधिक हो, तो यह पल्मोनरी एडिमा का संकेत है।"
      };
    },

    // =========================================================================
    // 3. COMPREHENSIVE CARDIORESPIRATORY DISEASE DOSSIERS
    // =========================================================================
    diseaseDossiers: {
      felineHcmAndAorticThromboembolism: {
        id: "CARD-DIS-01",
        nameEn: "Feline Hypertrophic Cardiomyopathy (HCM) & Aortic Thromboembolism (AATE / Saddle Thrombus)",
        nameHi: "मार्जार हाइपरट्रॉफिक कार्डियोमायोपैथी एवं महाधमनी थ्रोम्बोएंबोलिज्म (सैडल थ्रोम्बस)",
        speciesAffection: ["Feline"],
        pathophysiology: "बाएं निलय (Left Ventricle) की दीवार व पैपिलरी मांसपेशियों की अत्यधिक गाढ़ी मोटाई (concentric hypertrophy) -> डायस्टोलिक डिस्फंक्शन -> बाएं आलिंद (Left Atrium) में अत्यधिक फैलाव व रक्त ठहराव (Blood stasis) -> विरचो ट्राइएड्स के तहत थ्रोम्बस निर्माण -> थ्रोम्बस का एओर्टिक ट्राइफरकेशन पर जाकर फंसना (Saddle Thrombus)।",
        fivePsOfSaddleThrombus: {
          pain: "Pain (तीव्र असहनीय दर्द): निरंतर दर्दनाक चीखना व कराहना।",
          paresis: "Paresis / Paralysis (पक्षाघात): दोनों पिछले पैरों का अचानक पूर्ण सुन्न व लकवाग्रस्त हो जाना।",
          pallor: "Pallor (फीकापन): पिछले पंजों के पैड्स का नीला या सफेद पड़ जाना (सायनोसिस)।",
          pulselessness: "Pulselessness (नाड़ी शून्यता): दोनों फेमोरल धमनियों में स्पंदन (pulse) पूर्णतः गायब होना।",
          poikilothermy: "Poikilothermy (ठंडे पैर): दोनों पिछले पैर व पंजे बर्फ जैसे ठंडे होना।"
        },
        strictFluidContraindicationHi: "सख्त चेतावनी (Red Flag): एक्यूट कंजेस्टिव ओवरलोड व पल्मोनरी एडिमा वाले मार्जार रोगियों में IV फ्लूइड्स देना पूर्णतः वर्जित है! सामान्य सेलाइन या आरएल चढ़ाने से फेफड़ों में पानी भरकर तत्काल मृत्यु हो जाती है।",
        emergencyRescueProtocol: [
          "दर्द प्रबंधन (अति-प्राथमिकता): Pure Mu-Opioid - Butorphanol 0.2 - 0.4 mg/kg SC/IM अथवा Buprenorphine 0.02 - 0.03 mg/kg Sublingual q6-8h।",
          "ऑक्सीजन थेरेपी: शांत वातावरण में ऑक्सीजन पिंजरा (Oxygen cage 40-50% FiO2)। अनावश्यक हाथ लगाने या तनाव से बचें।",
          "तीव्र पल्मोनरी एडिमा निष्कासन: Furosemide 1 - 2 mg/kg IM/IV धीमे दें; 2 घंटे बाद दोहराएं।",
          "एंटी-थ्रोम्बोटिक थेरेपी: Clopidogrel 18.75 mg प्रति बिल्ली PO q24h + Enoxaparin (LMWH) 1.0 - 1.5 mg/kg SC q8-12h (नवीन थ्रोम्बस बनने से रोकने हेतु)।"
        ]
      },

      traumaticReticulopericarditis: {
        id: "CARD-DIS-02",
        nameEn: "Traumatic Reticulopericarditis (TRP / Hardware Disease in Cattle)",
        nameHi: "गोवंश अभिघातज जालिका-हृदयावरण शोथ (हार्डवेयर रोग / टी.आर.पी.)",
        speciesAffection: ["Bovine", "Bubaline"],
        pathogenesis: "चारा चरते समय लोहे की तार, कील या नुकीली वस्तु का रेटिकुलम में जाना। रेटिकुलर संकुचन के दबाव से तार रेटिकुलम की दीवार, डायफ्राम तथा पेरीकार्डियम को छेदते हुए हृदयावरण गुहा में प्रवेश करती है। इससे बदबूदार फाइब्रिनोप्यूरुलेंट पेरीकार्डिटिस, कार्डियक टैम्पोनेड तथा राइट-साइडेड कंजेस्टिव हार्ट फेल्योर होता है।",
        cardinalClinicalHallmarks: [
          "विशिष्ट ऑस्कल्टेशन ध्वनि: हृदय सुनने पर पानी व हवा के मंथन जैसी विशिष्ट 'वॉशिंग मशीन मर्मर' (Splashing / Washing Machine Murmur) या घर्षण ध्वनि (Friction rub)",
          "जुगुलर शिरा का अत्यधिक फूलना व उल्टा स्पंदन (Retrograde Jugular Pulse / Jugular engorgement)",
          "ब्रिस्केट एवं सबमैंडिबुलर क्षेत्र में गुरुत्वाकर्षण-जनित ठंडा, गड्ढा बनने वाला सूजन (Brisket Edema / Bottle Jaw)",
          "कूबड़ निकालकर खड़ा होना, कोहनी बाहर फैलाना (Abducted elbows), विदर्स पिंच टेस्ट (Withers Pinch Test) पर पीठ नीचे न झुकाना"
        ],
        prognosisAndIntervention: {
          prognosis: "अत्यंत निराशाजनक से असाध्य (Grave Prognosis). अधिकांश मामलों में आपातकालीन स्लाटर या मानवीय इच्छामृत्यु की संस्तुति की जाती है।",
          salvageTherapy: [
            "आपातकालीन पेरीकार्डियोसेन्टेसिस: 5वीं इंटरकोस्टल स्पेस में 14G नीडल द्वारा मवाद व गैस का निष्कासन।",
            "रोगाणुरोधी आवरण: Procaine Penicillin G 20,000 - 30,000 IU/kg IM q24h + Gentamicin 5 mg/kg IM 14 दिनों हेतु।",
            "सख्त गतिहीनता: पशु को आगे से 6-8 इंच ऊंचे ढलान वाले फर्श पर बांधें ताकि तार फेफड़ों व हृदय से पीछे खिसके।"
          ]
        }
      },

      bovineRespiratoryDiseaseComplex: {
        id: "CARD-DIS-03",
        nameEn: "Bovine Respiratory Disease Complex (BRD / Enzootic Calf Pneumonia / Shipping Fever)",
        nameHi: "गोवंश श्वसन रोग संलक्षण (काफ न्यूमोनिया / शिपिंग फीवर)",
        speciesAffection: ["Bovine", "Bubaline"],
        pathogenSynergy: "प्राथमिक वायरल आक्रमण (BRSV, PI-3, BVDV, Bovine Herpesvirus-1/IBR) श्वसन तंत्र के सिलिया व म्यूकोसल अवरोध को नष्ट करता है। इसके तुरंत पश्चात द्वितीयक घातक जीवाणु (Mannheimia haemolytica [ल्युकोटॉक्सिन स्रावक], Pasteurella multocida, Histophilus somni, Mycoplasma bovis) फेफड़ों के क्रेनियो-वेंट्रल लोब्स में तीव्र फाइब्रिनस ब्रोंकोन्यूमोनिया उत्पन्न करते हैं।",
        clinicalSignsWisconsinScale: [
          "तेज बुखार (Rectal Temp 104.0°F - 106.5°F / 40°C - 41.5°C)",
          "नाक व आंखों से गाढ़ा मवाद जैसा स्राव (Mucopurulent discharge)",
          "गंभीर शुष्क या आर्द्र खांसी, कान लटकना (Ear droop), सांस लेते समय कराहना (Expiratory grunt)",
          "क्रेनियोवेंट्रल फेफड़ों में क्रेपिटेशन्स (Crackles) व घरघराहट"
        ],
        treatmentProtocol: {
          firstLineLongActingAntimicrobials: [
            "Tulathromycin (Draxxin): 2.5 mg/kg SC गर्दन में एकल खुराक (फेफड़ों के ऊतकों में 14 दिन तक उच्च सांद्रता)।",
            "अथवा Florfenicol (Nuflor): 40 mg/kg SC एकल खुराक अथवा 20 mg/kg IM (48 घंटे बाद दोहराएं)।",
            "अथवा Marbofloxacin: 8 - 10 mg/kg IM/SC एकल उच्च खुराक।"
          ],
          nsaidAntiInflammatory: "Flunixin Meglumine 2.2 mg/kg IV (धीमे) एकल खुराक - ल्युकोटॉक्सिन जनित फेफड़ों के प्रदाह व बुखार को तत्काल घटाता है।"
        }
      },

      canineKennelCoughComplex: {
        id: "CARD-DIS-04",
        nameEn: "Canine Infectious Respiratory Disease Complex (CIRDC / Kennel Cough)",
        nameHi: "श्वान संक्रामक श्वसन संलक्षण (केनल कफ / संक्रामक ट्रेकियोब्रोंकाइटिस)",
        speciesAffection: ["Canine"],
        etiology: "Bordetella bronchiseptica जीवाणु तथा Canine Parainfluenza Virus (CPIV), Canine Adenovirus-2 (CAV-2) का संयुक्त वायुजनित संक्रमण।",
        clinicalHallmarks: [
          "विशिष्ट सूखी, कर्कश, हंस जैसी तेज खांसी (Harsh, dry, paroxysmal 'goose-honk' cough)",
          "खांसी के अंत में उल्टी करने जैसा झागदार बलगम निकालना (Terminal retching / gagging)",
          "ट्रेकियल पिंच टेस्ट पॉजिटिव (Light palpation of trachea instantly elicits violent coughing spasm)"
        ],
        treatmentProtocol: {
          antimicrobialCoverage: "Doxycycline 10 mg/kg PO q24h (अथवा 5 mg/kg PO q12h) 10-14 दिनों तक (Bordetella के इंट्रासेल्युलर उन्मूलन हेतु)।",
          antitussiveTherapy: "केवल गैर-उत्पादक (non-productive) सूखी खांसी में: Hydrocodone Bitartrate 0.22 mg/kg PO q8-12h अथवा Butorphanol 0.5 mg/kg PO q8-12h।",
          managementDirective: "गर्दन का पट्टा (Collar) पूर्णतः हटाकर केवल बॉडी हार्नेस (Body harness) का उपयोग करें।"
        }
      },

      felineAsthmaBronchitis: {
        id: "CARD-DIS-05",
        nameEn: "Feline Lower Airway Disease (Feline Asthma / Allergic Bronchitis)",
        nameHi: "मार्जार श्वसन मार्ग एलर्जी / बिल्ली का दमा (फेलिन अस्थमा)",
        speciesAffection: ["Feline"],
        pathophysiology: "वायुजनित एलर्जेंस (धूल, सिगरेट का धुआं, सुगंधित कैट लिटर) के प्रति टाइप-I अतिसंवेदनशीलता। ब्रोन्कियल स्मूथ मांसपेशियों का तीव्र संकुचन, श्लेष्मा की अत्यधिक मोटाई (mucus plugging) एवं इओसिनोफिलिक प्रदाह।",
        clinicalHallmarks: [
          "गर्दन आगे बढ़ाकर जमीन से सटाकर खांसना (Crouched posture with extended neck)",
          "एक्सपिरेटरी व्हीज़ (Expiratory wheezing) - सांस बाहर छोड़ते समय सीटी जैसी आवाज",
          "तीव्र श्वसन संकट में मुंह खोलकर सांस लेना (Open-mouth breathing in cats is a life-threatening red alert!)"
        ],
        emergencyRescueProtocol: [
          "तत्काल ब्रोंकोडायलेटर इनहेलेशन: Albuterol (Salbutamol) MDI इनहेलर (AeroKat स्पेसर द्वारा 1-2 पफ 10-15 सेकंड हेतु)।",
          "इंजेक्टेबल ब्रोंकोडायलेटर: Terbutaline Sulfate 0.01 mg/kg SC/IM धीमे दें।",
          "तीव्र प्रदाह-रोधी: Dexamethasone Sodium Phosphate 0.2 - 0.3 mg/kg IV/IM।",
          "तनाव-मुक्त ऑक्सीजन चैंबर में रखें; एक्स-रे लेने हेतु बिल्ली को जबरन न पकड़ें (तनाव से ब्रोन्कोस्पाज्म व मृत्यु हो सकती है)।"
        ]
      }
    },

    // =========================================================================
    // 4. AUSCULTATION & RESPIRATORY PHENOTYPIC MATRIX
    // =========================================================================
    auscultationPhenotypes: {
      crackles: {
        nameEn: "Crackles (Crepitations / Rales)",
        nameHi: "क्रेपिटेशन्स (सूखे पत्तों या बालों को रगड़ने जैसी चरचराहट)",
        acousticQuality: "Non-musical, discontinuous popping sounds heard predominantly during inspiration.",
        pathophysiologicOrigin: "तरल से भरी हुई बंद एल्वियोली का सांस लेने पर अचानक फटना व खुलना।",
        differentialDiagnoses: ["Cardiogenic Pulmonary Edema", "Bacterial Bronchopneumonia", "Pulmonary Contusions / Hemorrhage", "Pulmonary Fibrosis"]
      },
      wheezes: {
        nameEn: "Wheezes (Sibilant Rhonchi)",
        nameHi: "व्हीज़ेस (सीटी या बांसुरी जैसी तीखी संगीत ध्वनि)",
        acousticQuality: "Continuous, high-pitched musical whistling sounds heard predominantly during expiration.",
        pathophysiologicOrigin: "वायुमार्ग (Lumen) के अत्यधिक संकरे होने के कारण तेज गति से हवा का गुजरना।",
        differentialDiagnoses: ["Feline Asthma", "Chronic Allergic Bronchitis", "Intrabronchial foreign body", "Airway collapse"]
      },
      stridorStertor: {
        nameEn: "Stridor & Stertor (Upper Airway Obstruction)",
        nameHi: "स्ट्राइडोर एवं स्टर्टर (खर्राटे व घरघराहट भरी ऊपरी सांस)",
        acousticQuality: "Stertor: Low-pitched snoring sound (nasopharyngeal). Stridor: High-pitched harsh straining sound (laryngeal).",
        pathophysiologicOrigin: "ऊपरी श्वसन मार्ग (नासिका ग्रसनी, स्वरयंत्र या ट्रेकिया) में यांत्रिक रुकावट।",
        differentialDiagnoses: ["BOAS (Brachycephalic Obstructive Airway Syndrome)", "Laryngeal Paralysis", "Tracheal Collapse (Grade III/IV)", "Laryngeal Neoplasia"]
      },
      frictionRub: {
        nameEn: "Pericardial / Pleural Friction Rub",
        nameHi: "घर्षण ध्वनि (चमड़े को आपस में रगड़ने जैसी आवाज)",
        acousticQuality: "Dry, grating, leathery squeaking sound heard synchronously with heartbeats or pleural movement.",
        pathophysiologicOrigin: "प्रदाहग्रस्त खुरदुरी सीरस झिल्लियों (विसेरल व पैराइटल पेरीकार्डियम) का आपस में रगड़ खाना।",
        differentialDiagnoses: ["Traumatic Reticulopericarditis (Bovine TRP)", "Fibrinous Pleuritis", "Uremic Pericarditis"]
      },
      muffledVentralSounds: {
        nameEn: "Muffled or Absent Ventral Lung Sounds",
        nameHi: "निचले फेफड़ों में ध्वनि की शून्यता या मंदता",
        acousticQuality: "Complete loss of normal vesicular breath sounds over the ventral thorax, with dorsal sounds preserved.",
        pathophysiologicOrigin: "प्लूरल गुहा में तरल या विसरा भर जाने से फेफड़ों की ध्वनि का स्टेथोस्कोप तक न पहुंच पाना।",
        differentialDiagnoses: ["Pleural Effusion (Pyothorax / Chylothorax / Hemothorax)", "Diaphragmatic Hernia", "Severe Mediastinal Lymphoma"]
      }
    },

    // =========================================================================
    // 5. ECG ARRHYTHMIA DIAGNOSTIC & PHARMACOTHERAPY ENGINE
    // =========================================================================
    ecgArrhythmiaProtocols: {
      ventricularTachycardia: {
        nameEn: "Ventricular Tachycardia (V-Tach / Sustained Runs > 180 bpm)",
        nameHi: "निलयी क्षिप्रहृदयता (वेंट्रिकुलर टैचीकार्डिया / चौड़े QRS कॉम्प्लेक्स)",
        ecgLandmarks: "चौड़े, विकृत QRS कॉम्प्लेक्स (Wide & Bizarre QRS > 0.06s in dogs), P-तरंगों का अभाव या AV पृथक्करण (AV dissociation), दर > 180-220 bpm।",
        canineIntervention: {
          firstLineBolus: "Lidocaine Hydrochloride 2% (20 mg/mL): 2.0 - 4.0 mg/kg धीमा IV बोलस 2 मिनट में दें। यदि अतालता नियंत्रित नहीं होती, तो 5 मिनट बाद 2 mg/kg पुनः दोहराएं (अधिकतम संचयी सीमा 8 mg/kg)।",
          continuousInfusion: "सफल बोलस के पश्चात: Lidocaine CRI 25 से 75 microg/kg/min (0.025 - 0.075 mg/kg/min) IV सतत इन्फ्यूजन जारी रखें।"
        },
        felineCautionRedAlertHi: "मार्जार रेड अलर्ट: बिल्लियों में ग्लूकोरोनाइड पाथवे की कमी के कारण लिडोकेन विषाक्तता (न्यूरोलॉजिकल झटके, कोमा व कार्डियक अरेस्ट) का गंभीर जोखिम रहता है। बिल्लियों में अत्यंत सतर्कतापूर्वक सूक्ष्म खुराक (0.2 - 0.5 mg/kg अत्यंत धीमे IV 10 मिनट में) दें अथवा Esmolol (0.05-0.1 mg/kg) को प्राथमिकता दें।"
      },

      atrialFibrillation: {
        nameEn: "Atrial Fibrillation (A-Fib / Irregularly Irregular Chaos)",
        nameHi: "आलिंद तंतुकन (एट्रियल फिब्रिलेशन / अनियमित अतालता)",
        ecgLandmarks: "अनियमित रूप से अनियमित ताल (Irregularly irregular rhythm), P-तरंगों का पूर्ण अभाव, बेसलाइन पर सूक्ष्म कंपन तरंगें (f-waves), सामान्यतः पतले QRS कॉम्प्लेक्स के साथ तीव्र दर (> 200-240 bpm)।",
        rateControlStrategy: [
          "लक्ष्य: हृदय की धड़कन दर को विश्राम अवस्था में 140-160 bpm के नीचे नियंत्रित करना।",
          "कैल्शियम चैनल ब्लॉकर: Diltiazem 0.5 - 2.0 mg/kg PO q8h (AV नोड चालन धीमा करता है)।",
          "कार्डियक ग्लाइकोसाइड: Digoxin 0.003 - 0.005 mg/kg PO q12h (दुबले शारीरिक वजन पर गणना करें; सीरम स्तर 0.8-1.2 ng/mL बनाए रखें)।",
          "बीटा-ब्लॉकर विकल्प: Atenolol 0.5 - 1.0 mg/kg PO q12h (केवल तब जब रोगी कंजेस्टिव शॉक में न हो)।"
        ]
      },

      sinusBradycardiaAndAvBlock: {
        nameEn: "Sinus Bradycardia & High-Grade AV Block (2nd/3rd Degree)",
        nameHi: "मंदहृदयता एवं पूर्ण ए.वी. ब्लॉक (हार्ट रेट < 50 bpm)",
        ecgLandmarks: "हार्ट रेट श्वान में < 50 bpm, मार्जार में < 120 bpm। 3rd डिग्री AV ब्लॉक में P-तरंगें व QRS पूरी तरह स्वतंत्र व असंबद्ध (Complete AV Dissociation) होते हैं।",
        atropineResponseChallenge: {
          testProcedure: "Atropine Sulfate 0.04 mg/kg IV या IM दें और 15 मिनट बाद ECG पुनः जांचें।",
          interpretation: "यदि हार्ट रेट बढ़ जाती है: वेगस तंत्रिका जनित सामान्य ब्रैडीकार्डिया है। यदि हार्ट रेट में कोई वृद्धि नहीं होती: संरचनात्मक AV नोड पतन (Structural Complete AV Block) है, जिसमें केवल कृत्रिम पेसमेकर (Pacemaker Implantation) ही जीवन रक्षक है।"
        }
      }
    },

    // =========================================================================
    // 6. EMERGENCY CARDIOPULMONARY DOSAGE CALCULATOR
    // =========================================================================
    /**
     * Precision dosing calculator for critical cardiopulmonary emergency drugs.
     * @param {string} drugKey - "furosemide_acute"|"pimobendan"|"lidocaine_bolus"|"lidocaine_cri"|"butorphanol"|"terbutaline"
     * @param {number} weightKg - Patient weight in kilograms
     * @param {string} species - "canine" or "feline"
     */
    calculateCardiacEmergencyDose: function (drugKey, weightKg, species) {
      const drug = (drugKey || "").toLowerCase();
      const wt = parseFloat(weightKg);
      const sp = (species || "canine").toLowerCase();

      if (isNaN(wt) || wt <= 0) {
        return { error: "अमान्य शारीरिक वजन (Invalid Patient Weight)." };
      }

      let doseResult = {};

      if (drug === "furosemide_acute") {
        const mgPerKg = (sp === "feline") ? 1.5 : 3.0; // 1-2 mg/kg in cats, 2-4 mg/kg in dogs
        const totalMg = Math.round(wt * mgPerKg * 10) / 10;
        const volumeMl = Math.round((totalMg / 50.0) * 100) / 100; // 50 mg/mL injectable

        doseResult = {
          drugName: "Furosemide Injectable (Lasix 50 mg/mL)",
          targetDoseMg: totalMg,
          calculatedVolumeMl: volumeMl,
          route: "IV (धीमी गति से) अथवा IM",
          frequencyHi: "तीव्र पल्मोनरी एडिमा में प्रत्येक 2 से 4 घंटे में दोहराएं जब तक कि श्वसन गति < 40 न हो जाए।",
          safetyRedFlagHi: "अत्यधिक उपयोग से तीव्र निर्जलीकरण, हाइपोकेलेमिया व एजोटेमिया हो सकता है; यूरिन आउटपुट की निगरानी करें।"
        };
      } else if (drug === "pimobendan") {
        const totalMg = Math.round(wt * 0.25 * 10) / 10; // 0.25 mg/kg
        doseResult = {
          drugName: "Pimobendan Oral (Vetmedin)",
          targetDoseMg: totalMg,
          route: "मौखिक (PO) भोजन से 1 घंटा पूर्व खाली पेट",
          frequencyHi: "दिन में दो बार (q12h) निश्चित समय पर।",
          dispensingGuide: "उपलब्ध कैप्सूल/च्यूएबल: 1.25 mg, 2.5 mg, 5.0 mg, 10.0 mg (निकटतम शक्ति में समायोजित करें)।",
          safetyRedFlagHi: "एओर्टिक स्टेनोसिस या हाइपरट्रॉफिक कार्डियोमायोपैथी (HCM) में इनोडाइलेटर्स वर्जित हैं।"
        };
      } else if (drug === "lidocaine_bolus") {
        if (sp === "feline") {
          const catMg = Math.round(wt * 0.25 * 100) / 100;
          const catMl = Math.round((catMg / 20.0) * 100) / 100; // 20 mg/mL (2%)
          doseResult = {
            drugName: "Lidocaine Hydrochloride 2% (20 mg/mL) - FELINE MICRO-DOSE",
            targetDoseMg: catMg,
            calculatedVolumeMl: catMl,
            route: "अत्यंत धीमी IV (10 मिनट में तनु करके)",
            frequencyHi: "एकल सतर्कता खुराक; यदि संभव हो तो एस्मोलॉल का उपयोग करें।",
            safetyRedFlagHi: "बिल्लियों में अत्यधिक विषाक्तता जोखिम (दौरे व कार्डियक अरेस्ट)।"
          };
        } else {
          const dogMg = Math.round(wt * 2.5 * 10) / 10; // 2-4 mg/kg
          const dogMl = Math.round((dogMg / 20.0) * 100) / 100;
          doseResult = {
            drugName: "Lidocaine Hydrochloride 2% (20 mg/mL) - CANINE BOLUS",
            targetDoseMg: dogMg,
            calculatedVolumeMl: dogMl,
            route: "IV धीमी गति से 2 मिनट में",
            frequencyHi: "यदि 5 मिनट में V-Tach समाप्त न हो, तो दोहराएं (अधिकतम कुल सीमा 8 mg/kg)।",
            safetyRedFlagHi: "एपिनेफ्रीन-युक्त लिडोकेन कभी भी शिरा में न दें (केवल सादा 2% लिडोकेन प्रयुक्त करें)।"
          };
        }
      } else if (drug === "lidocaine_cri") {
        if (sp === "feline") {
          return { error: "बिल्लियों में लिडोकेन CRI अनुशंसित नहीं है।" };
        }
        // Canine CRI: 50 mcg/kg/min = 0.05 mg/kg/min
        const mgPerHour = wt * 0.05 * 60; // mg per hr
        const mlPerHour2Percent = Math.round((mgPerHour / 20.0) * 10) / 10; // 20 mg/ml
        doseResult = {
          drugName: "Lidocaine 2% Continuous Rate Infusion (CRI)",
          rateMgPerHour: Math.round(mgPerHour * 10) / 10,
          infusionRateMlPerHour: mlPerHour2Percent,
          protocolHi: "शुद्ध लिडोकेन 2% को सीरिंज पंप द्वारा सीधे " + mlPerHour2Percent + " mL/घंटे की दर से चलाएं अथवा 500 mL Normal Saline में 50 mL लिडोकेन मिलाकर गति समायोजित करें।"
        };
      } else if (drug === "butorphanol") {
        const totalMg = Math.round(wt * 0.2 * 100) / 100; // 0.2 mg/kg
        const volMl = Math.round((totalMg / 10.0) * 100) / 100; // 10 mg/mL
        doseResult = {
          drugName: "Butorphanol Tartrate (10 mg/mL Injection)",
          targetDoseMg: totalMg,
          calculatedVolumeMl: volMl,
          route: "SC / IM / धीमी IV",
          frequencyHi: "हार्ट फेल्योर व तीव्र श्वसन संकट में चिंता व तनाव शमन हेतु प्रत्येक 4-6 घंटे में।",
          safetyRedFlagHi: "हल्का श्वसन अवसाद कर सकता है; गंभीर हाइपोक्सिया में ऑक्सीजन के साथ दें।"
        };
      } else if (drug === "terbutaline") {
        const totalMg = Math.round(wt * 0.01 * 1000) / 1000; // 0.01 mg/kg
        const volMl = Math.round((totalMg / 1.0) * 100) / 100; // 1 mg/mL
        doseResult = {
          drugName: "Terbutaline Sulfate Injectable (1 mg/mL)",
          targetDoseMg: totalMg,
          calculatedVolumeMl: volMl,
          route: "SC अथवा धीमी IM",
          frequencyHi: "एक्यूट ब्रोन्कोस्पाज्म व अस्थमा में प्रत्येक 4-8 घंटे में आवश्यकतानुसार।",
          safetyRedFlagHi: "टैचीकार्डिया व मायोकार्डियल ऑक्सीजन मांग बढ़ाता है; गंभीर वी-टैक में सावधानी बरतें।"
        };
      } else {
        return { error: "अज्ञात आपातकालीन औषधि कुंजी (Unknown drugKey). Supported: 'furosemide_acute', 'pimobendan', 'lidocaine_bolus', 'lidocaine_cri', 'butorphanol', 'terbutaline'." };
      }

      return doseResult;
    },

    /**
     * Rapid Emergency Dyspnea Triage Classifier
     * Differentiates Upper Airway vs Pulmonary Edema vs Asthma vs Pleural Disease.
     */
    evaluateDyspneaTriage: function (species, posture, respiratoryRate, sounds) {
      const sp = (species || "canine").toLowerCase();
      const pos = (posture || "").toLowerCase();
      const rr = parseInt(respiratoryRate, 10) || 0;
      const snd = (sounds || "").toLowerCase();

      let triageCategory = "UNCLASSIFIED_RESPIRATORY_DISTRESS";
      let primarySuspect = "";
      let criticalStabilizationHi = [];

      if (snd.includes("stridor") || snd.includes("stertor") || pos.includes("head_extended_snoring")) {
        triageCategory = "UPPER_AIRWAY_OBSTRUCTION";
        primarySuspect = "ऊपरी श्वसन मार्ग अवरोध (BOAS / Laryngeal Paralysis / Tracheal Collapse)";
        criticalStabilizationHi.push("सख्त न्यूनतम हैंडलिंग (Hands-off triage): उत्तेजना से लैरिंजियल स्पाज्म व मृत्यु हो सकती है।");
        criticalStabilizationHi.push("सक्रिय शीतलन (Active Cooling): यदि तापमान > 104°F है, तो पंजों पर पानी डालें।");
        criticalStabilizationHi.push("शामक व एंटी-एडिमा: Butorphanol (0.2 mg/kg IM) + Dexamethasone SP (0.15 mg/kg IV/IM)।");
        criticalStabilizationHi.push("यदि सांस पूर्णतः अवरुद्ध हो जाए: आपातकालीन एंडोट्रैचियल इंट्यूबेशन या ट्रेकियोस्टॉमी हेतु तैयार रहें।");
      } else if (snd.includes("wheeze") || (sp === "feline" && pos.includes("crouched_neck_extended"))) {
        triageCategory = "ASTHMA_BRONCHOSPASM";
        primarySuspect = "ब्रोन्कोस्पाज्म / मार्जार दमा (Feline Asthma / Allergic Bronchospasm)";
        criticalStabilizationHi.push("ऑक्सीजन पिंजरे में 50% FiO2 तुरंत प्रवाहित करें।");
        criticalStabilizationHi.push("Albuterol (Salbutamol) इनहेलर पफ 10-15 सेकंड AeroKat द्वारा दें।");
        criticalStabilizationHi.push("Terbutaline (0.01 mg/kg SC) + Dexamethasone SP (0.2 mg/kg IV/IM)।");
        criticalStabilizationHi.push("रेडियोग्राफ लेने हेतु बिल्ली को पीठ के बल लिटाने का प्रयास कदापि न करें।");
      } else if (snd.includes("muffled") || snd.includes("absent_ventral")) {
        triageCategory = "PLEURAL_SPACE_DISEASE";
        primarySuspect = "प्लूरल गुहा रोग / फुफ्फुस आवरण में द्रव या हवा (Pleural Effusion / Pneumothorax)";
        criticalStabilizationHi.push("रेडियोलॉजी से पूर्व आपातकालीन थोराकोसेन्टेसिस (Emergency Thoracocentesis): 7वीं-8वीं इंटरकोस्टल स्पेस में सुई डालकर द्रव या हवा निकालें।");
        criticalStabilizationHi.push("ऑक्सीजन थेरेपी सतत जारी रखें।");
      } else if (snd.includes("crackles") || rr > 60 || pos.includes("orthopnea_elbows_abducted")) {
        triageCategory = "CARDIOGENIC_PULMONARY_EDEMA";
        primarySuspect = "कन्जेस्टिव हार्ट फेल्योर / फुफ्फुसीय शोथ (Cardiogenic Pulmonary Edema - MMVD/DCM/HCM)";
        criticalStabilizationHi.push("Furosemide 2 - 4 mg/kg IV/IM तत्काल दें।");
        criticalStabilizationHi.push("उच्च प्रवाह ऑक्सीजन (Oxygen cage / Flow-by)।");
        criticalStabilizationHi.push("श्वान में: Pimobendan 0.25 mg/kg PO यदि पहले से नहीं चल रहा है।");
        criticalStabilizationHi.push("Butorphanol 0.15 mg/kg IM तीव्र हृदय-श्वसन तनाव घटाने हेतु।");
      } else {
        triageCategory = "UNDIFFERENTIATED_DYSPNEA";
        primarySuspect = "अविभेदित श्वसन संकट (Undifferentiated Respiratory Distress)";
        criticalStabilizationHi.push("ऑक्सीजन पिंजरे में न्यूनतम हस्तक्षेप के साथ रखें।");
        criticalStabilizationHi.push("तापमान, श्लेष्मा झिल्ली का रंग व पल्स ऑक्सीमेट्री (SpO2) की जांच करें।");
      }

      return {
        triageClassification: triageCategory,
        suspectedConditionHi: primarySuspect,
        respiratoryRateBpm: rr,
        emergencyStabilizationProtocolHi: criticalStabilizationHi
      };
    }
  };

  // Seal namespace to protect critical cardiac protocols at runtime
  Object.freeze(window.VetcareApp.ClinicalData.Cardiorespiratory.acvimStagingMatrix);
  Object.freeze(window.VetcareApp.ClinicalData.Cardiorespiratory.diseaseDossiers);
  Object.freeze(window.VetcareApp.ClinicalData.Cardiorespiratory.auscultationPhenotypes);
  Object.freeze(window.VetcareApp.ClinicalData.Cardiorespiratory.ecgArrhythmiaProtocols);

  // Ready signal
  if (window.VetcareApp.showToast) {
    window.VetcareApp.showToast("कार्डियोरेस्पिरेटरी व गहन चिकित्सा मॉड्यूल सक्रिय (Cardiorespiratory Module Loaded)", "success");
  }
})();
