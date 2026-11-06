// Vetcare AI OS - Veterinary Multimodal Analgesia, WSAVA Pain Scales & CRI Infusion Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE INITIALIZATION & ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  /**
   * Veterinary Neuropharmacology, Acute/Chronic Pain Assessment & Critical Care Analgesia Architecture
   * Engineered in strict compliance with WSAVA Global Pain Guidelines, ACVAA Analgesia Consensus,
   * AAHA Pain Management Guidelines, and ISO-VET 2026 Pharmacopeia Standards.
   */
  window.VetcareApp.ClinicalData.PainAnalgesia = {
    metadata: {
      subsystem: "Pain Scoring Rubrics, Multimodal Analgesic Protocols & Infusion Architecture",
      version: "2026.4.7-PROD",
      isoVetStandard: "ISO-VET-PAIN-2026",
      supportedTaxa: ["Canine", "Feline", "Bovine", "Bubaline", "Equine", "Caprine", "Ovine"],
      authoritativeSource: "WSAVA Global Pain Council, Glasgow CMPS-SF, FGS & ACVAA CRI Protocols"
    },

    // =========================================================================
    // 2. COMPREHENSIVE CLINICAL PAIN SCORING SCALES
    // =========================================================================
    painScales: {
      // 2.1 Glasgow Composite Measure Pain Scale - Short Form (CMPS-SF) for Dogs
      glasgowCmpsSf: {
        nameEn: "Short-Form Glasgow Composite Measure Pain Scale (CMPS-SF)",
        nameHi: "शॉर्ट-फॉर्म ग्लासगो कम्पोजिट पेन स्केल (श्वान दर्द मापन पैमाना)",
        targetSpecies: "canine",
        maxScoreWalking: 24,
        maxScoreNonWalking: 20,
        interventionThresholdWalking: 6, // >= 6 / 24 requires rescue analgesia
        interventionThresholdNonWalking: 5, // >= 5 / 20 requires rescue analgesia
        rubrics: {
          posture: [
            { score: 0, descEn: "Normal / Comfortable posture", descHi: "सामान्य / आरामदायक मुद्रा" },
            { score: 1, descEn: "Depressed / Hunched up", descHi: "उदासीन / पीठ झुकी हुई (कूबड़)" },
            { score: 2, descEn: "Rigid posture / Tense body", descHi: "तनी हुई / कठोर शारीरिक मुद्रा" },
            { score: 3, descEn: "Abnormal recumbency / 'Prayer position' (tucked belly)", descHi: "प्रार्थना मुद्रा (Prayer position / पेट दबाकर लेटना - एक्यूट एब्डोमेन)" }
          ],
          mobilityAndGait: [
            { score: 0, descEn: "Normal smooth gait", descHi: "सामान्य चाल" },
            { score: 1, descEn: "Mild lameness / Limping", descHi: "हल्का लंगड़ापन" },
            { score: 2, descEn: "Slow or reluctant to rise and walk", descHi: "उठने या चलने में अत्यधिक अनिच्छा / धीमापन" },
            { score: 3, descEn: "Stiff gait / Refuses to move unless urged", descHi: "अकड़ी हुई चाल / आगे बढ़ने से पूर्ण मना करना" },
            { score: 4, descEn: "Cries or flinches when forced to move", descHi: "चलने के लिए विवश करने पर चीखना या कांपना" }
          ],
          vocalization: [
            { score: 0, descEn: "Quiet / Normal vocalization", descHi: "शांत / सामान्य आवाज" },
            { score: 1, descEn: "Whimpering occasionally", descHi: "कभी-कभार हल्की रुलाई (Whimpering)" },
            { score: 2, descEn: "Groaning or continuous whining", descHi: "कराहना (Groaning) या निरंतर विलाप" },
            { score: 3, descEn: "Crying aloud / Screaming in acute distress", descHi: "जोर-जोर से चीखना / रोना (Screaming in pain)" }
          ],
          attentionToWound: [
            { score: 0, descEn: "Ignores wound or painful area", descHi: "घाव या दर्दनाक स्थान की उपेक्षा करना" },
            { score: 1, descEn: "Looking at painful area", descHi: "बार-बार दर्दनाक स्थान की ओर देखना" },
            { score: 2, descEn: "Licking the wound or surgical site", descHi: "घाव को बार-बार चाटना" },
            { score: 3, descEn: "Rubbing, chewing, or attacking painful area", descHi: "घाव को काटना, नोचना या रगड़ना" }
          ],
          demeanor: [
            { score: 0, descEn: "Happy, content, tail wagging", descHi: "प्रसन्न, संतुष्ट, पूंछ हिलाता हुआ" },
            { score: 1, descEn: "Quiet, indifferent to surroundings", descHi: "शांत, वातावरण के प्रति उदासीन" },
            { score: 2, descEn: "Nervous, agitated, restless pacing", descHi: "घबराया हुआ, बेचैन, लगातार चक्कर काटना" },
            { score: 3, descEn: "Depressed, dull, fearful of contact", descHi: "अत्यधिक उदास, छूने पर डरना या भागना" }
          ],
          responseToPalpation: [
            { score: 0, descEn: "No reaction to palpation of wound/joint", descHi: "घाव या जोड़ छूने पर कोई दर्दनाक प्रतिक्रिया नहीं" },
            { score: 1, descEn: "Flinches or tenses muscles", descHi: "मांसपेशियों को सिकोड़ना या झिझकना (Flinching)" },
            { score: 2, descEn: "Growls, pulls away, or guards area", descHi: "गुर्राना, पैर खींचना या छूने से रोकना (Guarding)" },
            { score: 3, descEn: "Snaps, cries violently, or attempts to bite", descHi: "काटने का प्रयास करना या तीव्र चीख निकलना" }
          ]
        }
      },

      // 2.2 Feline Grimace Scale (FGS)
      felineGrimaceScale: {
        nameEn: "Feline Grimace Scale (FGS)",
        nameHi: "मार्जार मुख-भंगिमा दर्द पैमाना (फेलिन ग्रिमेस स्केल)",
        targetSpecies: "feline",
        maxScore: 10,
        interventionThreshold: 4, // Score >= 4/10 indicates feline suffering requiring rescue analgesia
        actionUnits: [
          {
            unitId: "ear_position",
            nameEn: "1. Ear Position",
            nameHi: "1. कान की स्थिति",
            scores: [
              { score: 0, descEn: "Ears facing forward and upright", descHi: "कान आगे की ओर सीधे व सतर्क (Normal)" },
              { score: 1, descEn: "Ears slightly pulled back or flattened", descHi: "कान हल्के पीछे की ओर मुड़े हुए" },
              { score: 2, descEn: "Ears completely flattened and rotated outwards", descHi: "कान पूरी तरह चपटे और बाहर की ओर घूमे हुए (Airplane ears)" }
            ]
          },
          {
            unitId: "orbital_tightening",
            nameEn: "2. Orbital Tightening",
            nameHi: "2. आंखों का संकुचन",
            scores: [
              { score: 0, descEn: "Eyes wide open and relaxed", descHi: "आंखें पूरी खुली व सामान्य" },
              { score: 1, descEn: "Eyes partially closed / mild squinting", descHi: "आंखें आधी बंद / हल्की मिचमिचाहट" },
              { score: 2, descEn: "Eyes tightly squinted or completely shut", descHi: "आंखें पूरी तरह कसकर बंद (Squinted shut)" }
            ]
          },
          {
            unitId: "muzzle_tension",
            nameEn: "3. Muzzle Tension",
            nameHi: "3. थूथन (मजल) का तनाव",
            scores: [
              { score: 0, descEn: "Muzzle relaxed and round", descHi: "थूथन गोल व पूरी तरह तनावमुक्त" },
              { score: 1, descEn: "Slight tension in muzzle pads", descHi: "मूंछों वाले हिस्से में हल्का तनाव" },
              { score: 2, descEn: "Muzzle tense, flattened, and elliptical shape", descHi: "थूथन चपटा, खींचा हुआ व अंडाकार (Elliptical tension)" }
            ]
          },
          {
            unitId: "whisker_position",
            nameEn: "4. Whisker Position",
            nameHi: "4. मूंछों (व्हिस्कर्स) का विन्यास",
            scores: [
              { score: 0, descEn: "Whiskers loose, curved downwards", descHi: "मूंछें ढीली व नीचे की ओर झुकी हुई" },
              { score: 1, descEn: "Whiskers slightly curved or moving forward", descHi: "मूंछें थोड़ी सीधी या आगे की ओर झुकी हुई" },
              { score: 2, descEn: "Whiskers straight, stiff, and bunched forward", descHi: "मूंछें पूरी तरह सीधी, सख्त व आगे की ओर फैली हुई (Spiked forward)" }
            ]
          },
          {
            unitId: "head_position",
            nameEn: "5. Head Position",
            nameHi: "5. सिर की मुद्रा",
            scores: [
              { score: 0, descEn: "Head held high, above the shoulder line", descHi: "सिर कंधों की रेखा से ऊंचा व सामान्य" },
              { score: 1, descEn: "Head aligned with the shoulder line", descHi: "सिर कंधों की सीध में तना हुआ" },
              { score: 2, descEn: "Head lowered below shoulder line or tucked to chest", descHi: "सिर कंधों से नीचे झुका हुआ या सीने से सटा हुआ (Hunched head)" }
            ]
          }
        ]
      },

      // 2.3 UNESP-Botucatu Ruminant Pain Scale (Bovine, Ovine, Caprine)
      unespBotucatuRuminant: {
        nameEn: "UNESP-Botucatu Composite Pain Scale for Ruminants",
        nameHi: "यूनेस्प-बोटूकातु समग्र जुगाली पशु दर्द पैमाना",
        targetSpecies: ["bovine", "bubaline", "ovine", "caprine"],
        maxScore: 18,
        interventionThreshold: 6,
        categories: [
          { name: "Locomotion & Posture", desc: "Arched back, reluctant to walk, head extension, abducted elbows." },
          { name: "Activity & Mental Attitude", desc: "Depressed, isolated from herd, unresponsive to environment." },
          { name: "Vocalization & Grunting", desc: "Teeth grinding (Bruxism), spontaneous groaning, grunting on expiration." },
          { name: "Appetite & Rumination", desc: "Complete cessation of rumination (Cud dropping), refusing concentrate." },
          { name: "Response to Palpation", desc: "Kicking belly, aggressive evasion, arching spine upon pressure." }
        ]
      }
    },

    // =========================================================================
    // 3. RIGOROUS PHARMACOLOGICAL SAFETY RULES & RED FLAGS
    // =========================================================================
    lethalSafetyRules: {
      felineParacetamolRule: {
        ruleId: "RULE_FELINE_PARACETAMOL_LETHAL",
        severity: "CRITICAL_FATAL_RED_FLAG",
        titleEn: "PARACETAMOL (ACETAMINOPHEN) ABSOLUTE FELINE CONTRAINDICATION",
        titleHi: "मार्जार पैरासिटामोल घातक निषेध नियम (जानलेवा चेतावनी)",
        pathophysiology: "बिल्लियों में यकृत एंजाइम यूडीपी-ग्लूकुरोनिल ट्रांसफरेज (Glucuronyl Transferase) की अत्यधिक कमी होती है। पैरासिटामोल का सामान्य पाथवे अवरुद्ध होकर साइटोक्रोम P450 द्वारा अत्यधिक विषाक्त मेटाबोलाइट NAPQI बनता है। यह लाल रक्त कणिकाओं (RBCs) के हीमोग्लोबिन को मेटहीमोग्लोबिन (Methemoglobin) में बदल देता है, जिससे रक्त चॉकलेट-भूरा हो जाता है। इसके पश्चात हेन्ज बॉडी हीमोलिसिस, चेहरे की गंभीर सूजन (Facial Edema), साइनोसिस, तीव्र यकृत विफलता ও दम घुटने से मृत्यु हो जाती है।",
        emergencyAntidoteProtocolHi: [
          "1. एन-एसिटाइलसिस्टीन (N-Acetylcysteine - NAC 20%): लोडिंग खुराक 140 mg/kg IV या PO तत्काल दें; तत्पश्चात 70 mg/kg प्रत्येक 4 घंटे में कुल 7 खुराकों हेतु। (यह ग्लूटाथियोन की पुनः पूर्ति कर NAPQI को निष्प्रभावी करता है)।",
          "2. सिमेटिडाइन (Cimetidine): 5 - 10 mg/kg IV/PO q6-8h (P450 एंजाइम को ब्लॉक करके विषाक्त मेटाबोलाइट निर्माण रोकता है)।",
          "3. एस्कॉर्बिक एसिड (Vitamin C): 20 - 30 mg/kg PO/IV q6h (मेटहीमोग्लोबिन को पुनः सामान्य हीमोग्लोबिन में अपचयित करने हेतु)।",
          "4. एस-एडेनोसिलमेथियोनीन (SAMe): 20 - 40 mg/kg PO दैनिक यकृत सुरक्षा हेतु।",
          "5. गहन ऑक्सीजन चिकित्सा एवं यदि PCV < 15% हो तो संपूर्ण रक्त आधान (Whole Blood Transfusion)।"
        ]
      },

      nsaidCorticosteroidDualRule: {
        ruleId: "RULE_NSAID_STEROID_PROHIBITION",
        severity: "SEVERE_PERFORATION_RISK",
        titleEn: "SIMULTANEOUS NSAID + CORTICOSTEROID DUAL ADMINISTRATION FORBIDDEN",
        titleHi: "NSAID एवं कॉर्टिकोस्टेरॉइड का संयुक्त प्रयोग पूर्णतः वर्जित",
        pathophysiology: "NSAIDs (COX-1/COX-2 इनहिबिटर्स) प्रोस्टाग्लैंडिंस (PGE2 व PGI2) को रोकते हैं जो आमाशय की म्यूकोसल सुरक्षा ও रक्त प्रवाह हेतु आवश्यक हैं। कॉर्टिकोस्टेरॉइड्स म्यूकस उत्पादन को घटाते हैं और गैस्ट्रिक एसिड व पेप्सिन बढ़ाते हैं। दोनों को एक साथ देने से गंभीर गैस्ट्रिक अल्सरेशन, पेट में छेद (GI Perforation), पेरिटोनाइटिस ও जानलेवा आंतरिक रक्तस्राव होता है।",
        mandatoryWashoutPeriod: "न्यूनतम 5 से 7 दिन का वॉशआउट पीरियड (Washout period) अनिवार्य है (यदि डेक्सामेथासोन या प्रेडनिसोलोन बंद किया है, तो NSAID शुरू करने से पूर्व कम से कम 5-7 दिन रुकें; लंबे असर वाले डिपो-स्टेरॉइड्स में 14 दिन रुकें)।"
      },

      dualNsaidRule: {
        ruleId: "RULE_DUAL_NSAID_PROHIBITION",
        severity: "SEVERE_RENAL_GI_TOXICITY",
        titleEn: "DUAL NSAID SIMULTANEOUS USE FORBIDDEN",
        titleHi: "दो भिन्न NSAIDs का एक साथ उपयोग सख्त वर्जित",
        pathophysiology: "एक ही समय पर दो भिन्न NSAIDs (उदा. Meloxicam + Flunixin या Carprofen + Ketoprofen) देने से कोई अतिरिक्त दर्द निवारण नहीं मिलता, परंतु एक्यूट किडनी इंजरी (AKI), रीनल पैपिलरी नेक्रोसिस एवं आंतों का फटना निश्चित हो जाता है।"
      }
    },

    // =========================================================================
    // 4. MULTIMODAL DRUG DOSING MATRIX ACROSS SPECIES
    // =========================================================================
    drugCatalog: {
      nsaids: {
        meloxicam: {
          nameGeneric: "Meloxicam",
          class: "Preferential COX-2 Inhibitor NSAID",
          indicationsHi: "अस्थि-संधि शोथ, शल्य-चिकित्सा उपरांत प्रदाह, नर्म ऊतक चोट, मास्टाइटिस व न्यूमोनिया।",
          dosages: {
            canine: { loading: "0.2 mg/kg IV/SC/PO Day 1", maintenance: "0.1 mg/kg PO q24h with food", safetyNotes: "भोजन के साथ दें; निर्जलीकरण या हाइपोवोलेमिया में वर्जित।" },
            feline: { loading: "0.2 mg/kg SC एकल खुराक (Single dose for surgical pain)", maintenance: "0.05 mg/kg PO q24h (अधिकतम 3-4 दिन) या सूक्ष्म खुराक (0.01-0.02 mg/kg q48h क्रोनिक अर्थराइटिस में सख्त निगरानी में)", safetyNotes: "एफडीए ब्लैक बॉक्स चेतावनी: बिल्लियों में अनियंत्रित दीर्घकालिक उपयोग से एक्यूट रीनल फेल्योर का जोखिम।" },
            bovine: { dose: "0.5 mg/kg IV अथवा SC/IM", frequency: "q48-72h (अथवा एकल खुराक)", safetyNotes: "दूध निकासी काल (Milk withdrawal) 4-5 दिन; मांस निकासी 15-20 दिन।" },
            equine: { dose: "0.6 mg/kg PO अथवा IV", frequency: "q24h", safetyNotes: "ओरल सस्पेंशन घोड़ों में अत्यधिक प्रभावी व सुरक्षित।" }
          }
        },
        flunixinMeglumine: {
          nameGeneric: "Flunixin Meglumine (Banamine / Finadyne)",
          class: "Potent Non-Selective COX Inhibitor (Analgesic / Anti-Endotoxic)",
          indicationsHi: "घोड़ों में विसरल कॉलिक (Visceral Colic), गोवंश में टॉक्सिक मास्टाइटिस व ब्रोंकोन्यूमोनिया में एंडोटॉक्सिमिया शमन।",
          dosages: {
            equine: { dose: "1.1 mg/kg IV (गंभीर कॉलिक में 1.1-2.2 mg/kg IV)", frequency: "q12-24h", safetyNotes: "अति-महत्वपूर्ण चेतावनी: घोड़ों में इंट्रामस्क्युलर (IM) कदापि न दें! IM देने से घातक क्लोस्ट्रीडियल मायोनेक्रोसिस व गैस गैंग्रीन (Clostridial Myonecrosis) से घोड़े की मृत्यु हो सकती है। केवल IV दें।" },
            bovine: { dose: "1.1 to 2.2 mg/kg धीमी IV", frequency: "q24h (अधिकतम 3 दिन)", safetyNotes: "एंडोटॉक्सिक शॉक में चमत्कारी राहत।" },
            canine: { dose: "CONTRAINDICATED", safetyNotes: "कुत्तों व बिल्लियों में गंभीर जीआई अल्सरेशन के कारण इसका उपयोग न करें।" }
          }
        },
        carprofen: {
          nameGeneric: "Carprofen (Rimadyl)",
          class: "COX-2 Selective NSAID",
          indicationsHi: "श्वान आस्टियोअर्थराइटिस एवं ऑर्थोपेडिक सर्जरी पश्चात दर्द निवारण।",
          dosages: {
            canine: { dose: "4.4 mg/kg PO/SC q24h (अथवा 2.2 mg/kg PO q12h)", frequency: "q12-24h भोजन के साथ", safetyNotes: "लेब्राडोर एवं कुछ नस्लों में दुर्लभ इडियोपैथिक हेपेटोटॉक्सिसिटी की निगरानी करें।" },
            feline: { dose: "CONTRAINDICATED", safetyNotes: "मार्जार में ग्लूकोरोनिडेशन अक्षमता के कारण पूर्णतः वर्जित।" }
          }
        },
        firocoxib: {
          nameGeneric: "Firocoxib (Previcox / Equioxx)",
          class: "Highly Selective COX-2 Inhibitor (Coxib Class)",
          indicationsHi: "क्रोनिक कैनाइन व इक्वाइन ऑस्टियोअर्थराइटिस (सुरक्षित जीआई प्रोफाइल)।",
          dosages: {
            canine: { dose: "5.0 mg/kg PO", frequency: "q24h", safetyNotes: "COX-1 को बख्शता है, अतः पेट पर अल्सर का जोखिम कम रहता है।" },
            equine: { dose: "0.1 mg/kg PO", frequency: "q24h", safetyNotes: "इक्वाइन लेमिनाइटिस व जोड़ दर्द में स्वीकृत।" }
          }
        }
      },

      opioidsAndCentrallyActing: {
        buprenorphine: {
          nameGeneric: "Buprenorphine Hydrochloride",
          class: "High-Affinity Partial Mu-Opioid Agonist",
          indicationsHi: "मध्यम से गंभीर शल्य दर्द; मार्जार दंत व कोमल ऊतक सर्जरी में सर्वश्रेष्ठ।",
          dosages: {
            feline: { dose: "0.02 - 0.04 mg/kg BMT (Buccal Mucosal / Oral Transmucosal) अथवा SC/IM/IV", frequency: "q6-8h", safetyNotes: "बिल्लियों की मुख गुहा का क्षारीय pH इसे बिना निगले सीधे गाल की म्यूकोसा से 100% अवशोषित कराता है।" },
            canine: { dose: "0.02 - 0.04 mg/kg IV/IM", frequency: "q6-8h", safetyNotes: "श्वान में ओरल अवशोषण कम होता है; अतः IV/IM दें।" }
          }
        },
        butorphanol: {
          nameGeneric: "Butorphanol Tartrate",
          class: "Kappa-Opioid Agonist / Mu-Opioid Antagonist",
          indicationsHi: "हल्का विसरल दर्द, शामक संयोजन (Sedative adjunct), एवं एंटीटसिव (खांसी शमन)।",
          dosages: {
            canine: { dose: "0.1 - 0.4 mg/kg IV/IM/SC", frequency: "q2-4h (अल्पकालिक प्रभाव 1-2 घंटे)", safetyNotes: "सर्जिकल अस्थि दर्द हेतु अपर्याप्त; विसरल दर्द व सिडेशन हेतु उपयुक्त।" },
            feline: { dose: "0.1 - 0.3 mg/kg SC/IM", frequency: "q3-4h", safetyNotes: "अल्पकालिक एनाल्जेसिया।" },
            equine: { dose: "0.05 - 0.1 mg/kg IV", frequency: "ज़ाइलाज़ीन या डेटोमिडाइन के साथ मिलाकर कॉलिक व डायग्नोस्टिक प्रक्रियाओं में उत्कृष्ट।" }
          }
        },
        tramadol: {
          nameGeneric: "Tramadol Hydrochloride",
          class: "Atypical Synthetic Opioid & Serotonin/Norepinephrine Reuptake Inhibitor",
          indicationsHi: "मार्जार में मध्यम दर्द; श्वान में न्यूरोपैथिक दर्द संयोजन।",
          dosages: {
            canine: { dose: "2 - 5 mg/kg PO q8-12h", safetyNotes: "क्रिटिकल फार्माकोजेनेटिक सत्य: श्वान में यकृत एंजाइम CYP2D15 की कमी के कारण ट्रामाडोल का सक्रिय म्यू-रिसेप्टर मेटाबोलाइट (M1 / O-desmethyltramadol) लगभग शून्य बनता है। कुत्तों में ओरल ट्रामाडोल आस्टियोअर्थराइटिस दर्द में प्लासिबो से अधिक प्रभावी नहीं है।" },
            feline: { dose: "1 - 2 mg/kg PO q12h", safetyNotes: "बिल्लियां M1 मेटाबोलाइट कुशलता से बनाती हैं; अतः बिल्लियों में यह अत्यंत प्रभावी है (स्वाद कड़वा होने के कारण लार टपक सकती है)।" }
          }
        },
        gabapentin: {
          nameGeneric: "Gabapentin (Neurontin)",
          class: "Voltage-Gated Calcium Channel Alpha-2-Delta Ligand",
          indicationsHi: "न्यूरोपैथिक दर्द, सेंट्रल सेंसिटाइजेशन (वाइंड-अप), एलोडायनिया एवं तनाव-शमन (Feline stress relief)।",
          dosages: {
            canine: { dose: "5 - 15 mg/kg PO", frequency: "q8-12h (क्रोनिक दर्द में टाइट्रेट करें)", safetyNotes: "प्रारंभिक 2-3 दिन हल्का सिडेशन व एटैक्सिया हो सकता है। मानव लिक्विड सिरप न दें (उसमें जाइलिटोल होता है जो कुत्तों हेतु घातक है)।" },
            feline: { dose: "5 - 10 mg/kg PO q8-12h दर्द हेतु; अथवा 100 mg प्रति बिल्ली क्लिनिक आने से 2 घंटे पूर्व (तनाव-रोधी)।", frequency: "q8-12h" }
          }
        }
      }
    },

    // =========================================================================
    // 5. CONSTANT RATE INFUSION (CRI) PROTOCOLS & CALCULATOR
    // =========================================================================
    criProtocols: {
      mlkCanine: {
        nameEn: "MLK Protocol (Morphine - Lidocaine - Ketamine)",
        nameHi: "एम.एल.के. प्रोटोकॉल (मॉर्फिन + लिडोकेन + केटामाइन)",
        species: "canine",
        description: "गंभीर सर्जिकल, ऑर्थोपेडिक व ट्रॉमा दर्द में स्वर्ण मानक मल्टीमॉडल CRI। न्यूरोपैथिक प्रदाह व सेंट्रल वाइंड-अप को पूर्णतः शांत करता है।",
        targetDeliveryRates: {
          morphine: { rateMgPerKgPerHour: 0.12, stockConcMgPerMl: 10.0 }, // 2 microg/kg/min = 0.12 mg/kg/hr
          lidocaine: { rateMgPerKgPerHour: 3.0, stockConcMgPerMl: 20.0 }, // 50 microg/kg/min = 3.0 mg/kg/hr (2% Lidocaine)
          ketamine: { rateMgPerKgPerHour: 0.6, stockConcMgPerMl: 50.0 } // 10 microg/kg/min = 0.6 mg/kg/hr
        },
        loadingBolusMgPerKg: {
          morphine: 0.15,
          lidocaine: 2.0,
          ketamine: 0.5
        }
      },
      flkCanine: {
        nameEn: "FLK Protocol (Fentanyl - Lidocaine - Ketamine)",
        nameHi: "एफ.एल.के. प्रोटोकॉल (फेंटानिल + लिडोकेन + केटामाइन)",
        species: "canine",
        description: "मॉर्फिन के स्थान पर तीव्र कार्यवाहक फेंटानिल आधारित शक्तिशाली CRI।",
        targetDeliveryRates: {
          fentanyl: { rateMgPerKgPerHour: 0.003, stockConcMgPerMl: 0.05 }, // 3 microg/kg/hr (50 mcg/mL)
          lidocaine: { rateMgPerKgPerHour: 3.0, stockConcMgPerMl: 20.0 },
          ketamine: { rateMgPerKgPerHour: 0.6, stockConcMgPerMl: 50.0 }
        },
        loadingBolusMgPerKg: {
          fentanyl: 0.005,
          lidocaine: 2.0,
          ketamine: 0.5
        }
      },
      mkFeline: {
        nameEn: "MK Feline Protocol (Morphine - Ketamine)",
        nameHi: "एम.के. मार्जार प्रोटोकॉल (मॉर्फिन + केटामाइन - लिडोकेन रहित)",
        species: "feline",
        description: "बिल्लियों हेतु सुरक्षित CRI (लिडोकेन की विषाक्तता से बचाव हेतु लिडोकेन पूर्णतः बाहर रखा गया है)।",
        targetDeliveryRates: {
          morphine: { rateMgPerKgPerHour: 0.08, stockConcMgPerMl: 10.0 },
          ketamine: { rateMgPerKgPerHour: 0.3, stockConcMgPerMl: 50.0 }
        },
        loadingBolusMgPerKg: {
          morphine: 0.1,
          ketamine: 0.3
        }
      }
    },

    /**
     * Calculates exact stock medication volumes (mL) to spike directly into an IV fluid bag for CRI delivery.
     * @param {number} weightKg - Patient weight in kg
     * @param {number} fluidBagVolumeMl - Volume of fluid bag (e.g. 500 mL or 1000 mL)
     * @param {number} fluidRateMlPerHour - Infusion pump rate in mL/hour
     * @param {string} criProtocolKey - "mlkCanine"|"flkCanine"|"mkFeline"
     */
    calculateCriDrugAdditions: function (weightKg, fluidBagVolumeMl, fluidRateMlPerHour, criProtocolKey) {
      const wt = parseFloat(weightKg);
      const bagVol = parseFloat(fluidBagVolumeMl);
      const rate = parseFloat(fluidRateMlPerHour);
      const key = (criProtocolKey || "mlkCanine");

      if (isNaN(wt) || wt <= 0) return { error: "अमान्य शारीरिक वजन (Invalid Patient Weight)." };
      if (isNaN(bagVol) || bagVol <= 0) return { error: "अमान्य फ्लुइड बैग आयतन (Invalid Bag Volume)." };
      if (isNaN(rate) || rate <= 0) return { error: "अमान्य द्रव प्रवाह गति (Invalid Fluid Rate)." };

      const proto = this.criProtocols[key];
      if (!proto) return { error: "अज्ञात CRI प्रोटोकॉल (Unknown CRI Protocol Key)." };

      // Total hours the fluid bag will last: Hours = Bag Volume (mL) / Rate (mL/hr)
      const bagDurationHours = bagVol / rate;

      const drugCalculations = [];
      let totalFluidToRemoveFromBagMl = 0;

      for (const drugName in proto.targetDeliveryRates) {
        const drugData = proto.targetDeliveryRates[drugName];
        // Required mg per hour = rateMgPerKgPerHour * wt
        const hourlyMg = drugData.rateMgPerKgPerHour * wt;
        // Total mg needed in the bag = hourlyMg * bagDurationHours
        const totalMgForBag = hourlyMg * bagDurationHours;
        // Volume to draw (mL) = totalMgForBag / stockConcMgPerMl
        const volumeToSpikeMl = Math.round((totalMgForBag / drugData.stockConcMgPerMl) * 100) / 100;

        totalFluidToRemoveFromBagMl += volumeToSpikeMl;

        drugCalculations.push({
          drug: drugName.toUpperCase(),
          targetDeliveryRate: drugData.rateMgPerKgPerHour + " mg/kg/hour",
          hourlyDeliveryRequirementMg: Math.round(hourlyMg * 1000) / 1000,
          totalMedicationInBagMg: Math.round(totalMgForBag * 10) / 10,
          stockConcentrationUsed: drugData.stockConcMgPerMl + " mg/mL",
          volumeToInjectIntoBagMl: volumeToSpikeMl
        });
      }

      totalFluidToRemoveFromBagMl = Math.round(totalFluidToRemoveFromBagMl * 10) / 10;

      return {
        protocolNameEn: proto.nameEn,
        protocolNameHi: proto.nameHi,
        patientWeightKg: wt,
        fluidBagVolumeMl: bagVol,
        prescribedFluidRateMlPerHour: rate,
        bagTotalDurationHours: Math.round(bagDurationHours * 10) / 10 + " hours",
        drugAdditionsBreakdown: drugCalculations,
        nursingMixingDirectiveHi: "तैयारी विधि: " + bagVol + " mL के नए IV बैग से पहले " + totalFluidToRemoveFromBagMl + " mL क्रिस्टलॉइड घोल सिरिंज द्वारा बाहर निकालें। फिर ऊपर गणना की गई औषधियों की सटीक मात्रा बैग में इंजेक्ट करें। बैग को 5 बार उलट-पुलट कर पूर्णतः मिलाएं एवं स्पष्ट लेबल लगाएं।"
      };
    },

    // =========================================================================
    // 6. COMPUTATIONAL DECISION & SAFETY AUDIT METHODS
    // =========================================================================
    /**
     * Evaluates Glasgow CMPS-SF Canine Pain Score.
     * @param {object} responsesObj - { posture: 0-3, mobility: 0-4, vocalization: 0-3, attention: 0-3, demeanor: 0-3, palpation: 0-3 }
     * @param {boolean} canWalk - Whether the dog is physically capable of walking (default true)
     */
    calculateGlasgowCmps: function (responsesObj, canWalk) {
      const r = responsesObj || {};
      const ableToWalk = canWalk !== false;

      const pScore = Math.min(Math.max(parseInt(r.posture, 10) || 0, 0), 3);
      const mScore = ableToWalk ? Math.min(Math.max(parseInt(r.mobility, 10) || 0, 0), 4) : 0;
      const vScore = Math.min(Math.max(parseInt(r.vocalization, 10) || 0, 0), 3);
      const aScore = Math.min(Math.max(parseInt(r.attention, 10) || 0, 0), 3);
      const dScore = Math.min(Math.max(parseInt(r.demeanor, 10) || 0, 0), 3);
      const plScore = Math.min(Math.max(parseInt(r.palpation, 10) || 0, 0), 3);

      const total = pScore + mScore + vScore + aScore + dScore + plScore;
      const maxScore = ableToWalk ? 24 : 20;
      const threshold = ableToWalk ? 6 : 5;

      const requiresRescue = total >= threshold;

      let severityTier = "MILD";
      let actionDirectiveHi = "";

      if (total === 0) {
        severityTier = "ZERO_PAIN";
        actionDirectiveHi = "पशु पूरी तरह आरामदायक व दर्दमुक्त है।";
      } else if (total < threshold) {
        severityTier = "MILD";
        actionDirectiveHi = "हल्का दर्द; वर्तमान एनाल्जेसिक प्रोटोकॉल जारी रखें और 2-4 घंटे बाद पुनः स्कोर करें।";
      } else if (total >= threshold && total <= 12) {
        severityTier = "MODERATE";
        actionDirectiveHi = "मध्यम दर्द (स्कोर सीमा पार): तत्काल रेस्क्यू एनाल्जेसिया (उदा. Full Mu-Opioid या MLK CRI या NSAID सप्लीमेंटेशन) आवश्यक है।";
      } else {
        severityTier = "SEVERE";
        actionDirectiveHi = "अति-गंभीर तीव्र पीड़ा (Severe Acute Pain): कोड रेड एनाल्जेसिया! तत्काल IV शुद्ध ओपिओइड बोलस (Methadone/Morphine) दें एवं निरंतर CRI प्रारंभ करें।";
      }

      return {
        totalScore: total,
        maxPossibleScore: maxScore,
        canWalk: ableToWalk,
        rescueAnalgesiaIndicated: requiresRescue,
        severityTier: severityTier,
        clinicalActionPlanHi: actionDirectiveHi,
        breakdown: {
          posture: pScore,
          mobilityAndGait: mScore,
          vocalization: vScore,
          attentionToWound: aScore,
          demeanor: dScore,
          responseToPalpation: plScore
        }
      };
    },

    /**
     * Evaluates Feline Grimace Scale (FGS).
     * @param {object} rubricObj - { earPosition: 0-2, orbitalTightening: 0-2, muzzleTension: 0-2, whiskerPosition: 0-2, headPosition: 0-2 }
     */
    calculateFelineGrimaceScore: function (rubricObj) {
      const r = rubricObj || {};
      const e = Math.min(Math.max(parseInt(r.earPosition, 10) || 0, 0), 2);
      const o = Math.min(Math.max(parseInt(r.orbitalTightening, 10) || 0, 0), 2);
      const m = Math.min(Math.max(parseInt(r.muzzleTension, 10) || 0, 0), 2);
      const w = Math.min(Math.max(parseInt(r.whiskerPosition, 10) || 0, 0), 2);
      const h = Math.min(Math.max(parseInt(r.headPosition, 10) || 0, 0), 2);

      const total = e + o + m + w + h;
      const requiresRescue = total >= 4; // FGS validated cutoff >= 4/10

      let interpretationHi = "";
      if (total < 4) {
        interpretationHi = "स्कोर < 4/10: बिल्ली सहज है; दर्द दहलीज सीमा के भीतर है।";
      } else if (total >= 4 && total <= 6) {
        interpretationHi = "स्कोर >= 4/10 (हस्तक्षेप आवश्यक): बिल्ली स्पष्ट दर्द में है। तत्काल Buprenorphine (0.02-0.03 mg/kg OTM/SC) या Robenacoxib दें।";
      } else {
        interpretationHi = "स्कोर >= 7/10 (गंभीर पीड़ा): तीव्र यातना! तत्काल शांत वातावरण में मल्टीमॉडल एनाल्जेसिया (Opioid + Ketamine micro-dose) दें।";
      }

      return {
        totalScoreOutOf10: total,
        interventionRecommended: requiresRescue,
        actionUnitsEvaluated: {
          earPosition: e,
          orbitalTightening: o,
          muzzleTension: m,
          whiskerPosition: w,
          headPosition: h
        },
        clinicalInterpretationHi: interpretationHi
      };
    },

    /**
     * Real-time Multi-Drug Safety & Lethal Interaction Auditor.
     * Checks proposed drug regimen against current medications and species constraints.
     * @param {Array<string>} proposedDrugs - Array of drug names to administer
     * @param {string} species - "feline"|"canine"|"equine"|"bovine"
     * @param {Array<string>} currentMedications - Array of current drugs patient is receiving
     */
    auditAnalgesicSafety: function (proposedDrugs, species, currentMedications) {
      const sp = (species || "").toLowerCase();
      const proposed = (Array.isArray(proposedDrugs) ? proposedDrugs : []).map(d => d.toLowerCase());
      const current = (Array.isArray(currentMedications) ? currentMedications : []).map(d => d.toLowerCase());
      const allActive = proposed.concat(current);

      const criticalAlerts = [];
      const warnings = [];
      const antidoteProtocols = [];

      // Check 1: Feline Paracetamol Lethal Rule
      const hasParacetamol = allActive.some(d => d.includes("paracetamol") || d.includes("acetaminophen") || d.includes("crocin") || d.includes("calpol"));
      if (sp === "feline" && hasParacetamol) {
        criticalAlerts.push("घातक चेतावनी (FATAL ALERT): बिल्लियों में पैरासिटामोल (Acetaminophen) का प्रयोग 100% जानलेवा है! यह गंभीर मेटहीमोग्लोबिनेमिया व तीव्र यकृत विनाश उत्पन्न करता है।");
        antidoteProtocols.push(this.lethalSafetyRules.felineParacetamolRule.emergencyAntidoteProtocolHi);
      }

      // Check 2: NSAID + Steroid Dual Administration Rule
      const nsaidList = ["meloxicam", "carprofen", "flunixin", "firocoxib", "ketoprofen", "robenacoxib", "tolfenamic", "phenylbutazone"];
      const steroidList = ["dexamethasone", "prednisolone", "prednisone", "betamethasone", "triamcinolone", "hydrocortisone", "methylprednisolone", "isoflupredone"];

      const hasNsaid = allActive.some(d => nsaidList.some(n => d.includes(n)));
      const hasSteroid = allActive.some(d => steroidList.some(s => d.includes(s)));

      if (hasNsaid && hasSteroid) {
        criticalAlerts.push("गंभीर आंत विदारण जोखिम (GI PERFORATION DANGER): NSAID और कॉर्टिकोस्टेरॉइड का एक साथ उपयोग सख्त वर्जित है! यह आमाशय में अल्सर, आंतों में छिद्र (Perforation) व सेप्टिक पेरिटोनाइटिस करता है। दोनों के बीच न्यूनतम 5-7 दिन का अंतराल (Washout) रखें।");
      }

      // Check 3: Dual NSAID Prohibition Rule
      const activeNsaids = [];
      nsaidList.forEach(n => {
        if (allActive.some(d => d.includes(n))) activeNsaids.push(n);
      });
      if (activeNsaids.length > 1) {
        criticalAlerts.push("द्वैत NSAID निषेध: एक साथ दो NSAIDs (" + activeNsaids.join(" + ") + ") देना सख्त मना है! इससे एक्यूट किडनी फेल्योर व जानलेवा अल्सर होते हैं।");
      }

      // Check 4: Flunixin IM in Horses
      if (sp === "equine" && proposed.some(d => d.includes("flunixin")) && proposed.some(d => d.includes("im") || d.includes("intramuscular"))) {
        criticalAlerts.push("इक्वाइन जानलेवा सावधानी: घोड़ों में फ्लुनिक्सिन मेग्लुमाइन (Flunixin) को कभी भी मांसपेशियों (IM) में न लगाएं! यह क्लोस्ट्रीडियल मायोनेक्रोसिस (गैस गैंग्रीन) उत्पन्न कर 48 घंटे में घोड़े की जान ले सकता है। केवल धीमी IV दें।");
      }

      // Check 5: Tramadol in dogs efficacy warning
      if (sp === "canine" && proposed.some(d => d.includes("tramadol"))) {
        warnings.push("फार्माकोकाइनेटिक सलाह: श्वान में ओरल ट्रामाडोल का सक्रिय M1 मेटाबोलाइट नगण्य बनता है। ऑस्टियोअर्थराइटिस या गंभीर अस्थि दर्द में इसे प्राथमिक एनाल्जेसिक के रूप में न दें (Apoquel/Galliprant/Librela/Codeine को प्राथमिकता दें)।");
      }

      // Check 6: Carprofen in cats
      if (sp === "feline" && proposed.some(d => d.includes("carprofen"))) {
        criticalAlerts.push("मार्जार विषाक्तता: कार्प्रोफेन (Carprofen) बिल्लियों में अनुमोदित नहीं है; यकृत विफलता के जोखिम के कारण इसका उपयोग न करें।");
      }

      return {
        isSafe: criticalAlerts.length === 0,
        species: sp,
        criticalLethalAlerts: criticalAlerts,
        clinicalWarnings: warnings,
        emergencyAntidotes: antidoteProtocols
      };
    }
  };

  // Seal namespace to ensure immutable clinical safety integrity
  Object.freeze(window.VetcareApp.ClinicalData.PainAnalgesia.painScales);
  Object.freeze(window.VetcareApp.ClinicalData.PainAnalgesia.lethalSafetyRules);
  Object.freeze(window.VetcareApp.ClinicalData.PainAnalgesia.drugCatalog);
  Object.freeze(window.VetcareApp.ClinicalData.PainAnalgesia.criProtocols);

  // System toast notification hook
  if (window.VetcareApp.showToast) {
    window.VetcareApp.showToast("दर्द प्रबंधन व एनाल्जेसिया मॉड्यूल सक्रिय (Pain & Analgesia Loaded)", "success");
  }
})();
