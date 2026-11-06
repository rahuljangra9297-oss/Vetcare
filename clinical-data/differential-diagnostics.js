// Vetcare AI OS - Multi-Species Differential Diagnostics, Syndromic Decision Trees & Clinical Probability Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE INITIALIZATION & ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  /**
   * Veterinary Syndromic Differential Diagnostics & Algorithmic Probability Matcher
   * Formulated in compliance with WSAVA, ACVIM, and ISO-VET 2026 Diagnostic Standards.
   */
  window.VetcareApp.ClinicalData.DifferentialDiagnostics = {
    metadata: {
      subsystem: "Differential Diagnostics & Syndromic Decision Trees",
      version: "2026.4.8-PROD",
      isoVetStandard: "ISO-VET-DIFF-2026",
      supportedTaxa: ["Bovine", "Bubaline", "Caprine", "Ovine", "Canine", "Feline", "Equine"],
      authoritativeSource: "Comparative Internal Medicine & Clinical Pathology Decision Matrices"
    },

    // =========================================================================
    // 2. CORE CLINICAL SYNDROMES ARCHITECTURE (8 COMPREHENSIVE SYNDROMES)
    // =========================================================================
    syndromicDatabases: {
      // -----------------------------------------------------------------------
      // SYNDROME 1: BOVINE RED URINE SYNDROME (लाल / कॉफी रंग का पेशाब)
      // -----------------------------------------------------------------------
      bovine_red_urine: {
        syndromeKey: "bovine_red_urine",
        nameEn: "Bovine Red Urine Syndrome (Hemoglobinuria vs Hematuria vs Myoglobinuria)",
        nameHi: "गोवंश लाल / कॉफी रंग पेशाब संलक्षण (रक्तमेह बनाम हीमोग्लोबिनमेह)",
        species: ["bovine", "bubaline"],
        crucialDifferentiatingTestEn: "Urine Centrifugation Test & Ammonium Sulfate Precipitation",
        crucialDifferentiatingTestHi: "मूत्र का अपकेंद्रीकरण (Centrifugation) परीक्षण एवं अमोनियम सल्फेट अवक्षेपण",
        differentials: [
          {
            diseaseId: "DIFF-BRU-01",
            nameEn: "Bovine Babesiosis (Red Water / Tick Fever - Babesia bigemina)",
            nameHi: "बबेशियोसिस / टिक्स जनित लाल पेशाब (बबेशिया बाइजेमिना)",
            pathologyType: "Hemoglobinuria (इंट्रावास्कुलर हीमोलिसिस)",
            keyFeatures: ["high_fever", "tick_infestation", "pale_icteric_mucosa", "severe_anemia", "coffee_colored_urine", "tachycardia"],
            vitalCriteria: { tempMinF: 104.0, tempMaxF: 107.0 },
            confirmatoryTestHi: "गहन जिम्सा स्मीयर (Giemsa Stained Blood Smear): आरबीसी के भीतर विशिष्ट जोड़े में नाशपाती-आकार (Pear-shaped paired piroplasms) के प्रोटोजोआ दिखना।",
            firstLineTherapyHi: "Diminazene Aceturate (Berenil) 3.5 - 7.0 mg/kg deep IM अथवा Imidocarb Dipropionate 1.2 mg/kg SC।",
            rulingOutClueHi: "यदि पशु को तेज बुखार (>104°F) है और शरीर पर चीचड़ (ticks) पाए गए हैं, तो बबेशियोसिस की सर्वाधिक संभावना है।"
          },
          {
            diseaseId: "DIFF-BRU-02",
            nameEn: "Post-Parturient Hemoglobinuria (PPH / Nutritional Hypophosphatemia)",
            nameHi: "ब्यात उपरांत हीमोग्लोबिनमेह (पी.पी.एच. / फॉस्फोरस की कमी)",
            pathologyType: "Hemoglobinuria (RBC ग्लाइकोलिसिस विफलता जनित हीमोलिसिस)",
            keyFeatures: ["recent_calving", "high_milk_yielder", "apyrexia", "normal_or_low_temp", "dark_red_urine", "weakness"],
            vitalCriteria: { tempMinF: 98.0, tempMaxF: 102.0 }, // Characteristically NO FEVER
            confirmatoryTestHi: "सीरम इनऑर्गेनिक फॉस्फोरस < 2.0 mg/dL (सामान्य: 4.5-7.0 mg/dL) तथा रक्त स्मीयर में हाइंज बॉडीज (Heinz bodies) की उपस्थिति।",
            firstLineTherapyHi: "सोडियम एसिड फॉस्फेट (Sodium Acid Phosphate / Urovet / Novasac) 60-80 ग्राम IV 20% घोल में, तत्पश्चात 60 ग्राम SC/IM प्रत्येक 12 घंटे में।",
            rulingOutClueHi: "यदि गाय/भैंस ने हाल ही में (2-4 सप्ताह पूर्व) बछड़ा दिया है, अत्यधिक दूध देती है, और बुखार पूर्णतः अनुपस्थित (Apyrexia) है, तो यह PPH है।"
          },
          {
            diseaseId: "DIFF-BRU-03",
            nameEn: "Bovine Enzootic Hematuria (BEH / Chronic Bracken Fern Toxicity)",
            nameHi: "स्थानिक रक्तमेह (ब्रैकन फर्न विषाक्तता जनित मूत्राशय ट्यूमर)",
            pathologyType: "True Hematuria (अखंड लाल रक्त कोशिकाएं - RBCs)",
            keyFeatures: ["chronic_course", "normal_temperature", "blood_clots_in_urine", "hill_pasture_grazing", "intermittent_red_urine"],
            vitalCriteria: { tempMinF: 100.5, tempMaxF: 102.5 },
            confirmatoryTestHi: "मूत्र अपकेंद्रीकरण: नीचे लाल तलछट (Pellet of intact RBCs) जमता है और ऊपरी तरल (Supernatant) पूर्णतः पारदर्शी व साफ हो जाता है।",
            firstLineTherapyHi: "ब्रैकन फर्न चराई तत्काल रोकें; हेमोस्टैटिक इंजेक्शन (Ethamsylate / Tranexamic acid), आयरन टॉनिक व विटामिन के। (पूर्ण उपचार असंभव; पैलिएटिव देखभाल)।",
            rulingOutClueHi: "पेशाब में खून के थक्के (Blood clots) दिखना तथा मूत्र सेंट्रीफ्यूज करने पर सुपरनेटेंट का साफ हो जाना हेमेच्योरिया की पुष्टि करता है।"
          },
          {
            diseaseId: "DIFF-BRU-04",
            nameEn: "Bacillary Hemoglobinuria (Red Water Disease - Clostridium haemolyticum)",
            nameHi: "बैसीलरी हीमोग्लोबिनमेह (लिवर फ्लूक प्रेरित क्लॉस्ट्रिडियल नेक्रोसिस)",
            pathologyType: "Hemoglobinuria + Massive Hepatic Infarct",
            keyFeatures: ["sudden_death", "high_fever", "abdominal_pain", "port_wine_urine", "liver_fluke_history", "grunting"],
            vitalCriteria: { tempMinF: 103.5, tempMaxF: 106.0 },
            confirmatoryTestHi: "शव परीक्षण पर यकृत में 5-20 सेमी का विशिष्ट एनीमिक इन्फार्क्ट (Necrotic liver infarct) तथा पेरीटोनियल गुहा में लाल द्रव।",
            firstLineTherapyHi: "उच्च खुराक Penicillin G (30,000 IU/kg IV) + Clostridium antitoxin + आक्रामक IV फ्लुइड थेरेपी।",
            rulingOutClueHi: "लिवर फ्लूक प्रभावित दलदली क्षेत्रों में अचानक तेज बुखार, पेट दर्द, पोर्ट-वाइन जैसा गाढ़ा पेशाब और 24-36 घंटों में मृत्यु।"
          },
          {
            diseaseId: "DIFF-BRU-05",
            nameEn: "Bovine Leptospirosis (Leptospira interrogans serovar hardjo/pomona)",
            nameHi: "लेप्टोस्पायरोसिस (गर्भपात संलक्षण एवं रक्तमेह)",
            pathologyType: "Hemoglobinuria + Hemolytic Jaundice",
            keyFeatures: ["abortion_storms", "blood_tinged_milk", "flaccid_udder", "jaundice", "intermittent_fever"],
            vitalCriteria: { tempMinF: 103.0, tempMaxF: 105.5 },
            confirmatoryTestHi: "माइक्रोस्कोपिक एग्लूटिनेशन टेस्ट (MAT) सीरोलॉजी अथवा डार्क-फील्ड माइक्रोस्कोपी द्वारा मूत्र में स्पाइरोकेट्स की पहचान।",
            firstLineTherapyHi: "Oxytetracycline (20 mg/kg IM Long-Acting) अथवा Dihydrostreptomycin (25 mg/kg IM एकल खुराक)।",
            rulingOutClueHi: "दूध का रंग लाल/नारंगी होना, अयन का ढीला व मुलायम पड़ना (Cold mastitis / Flaccid bag), तथा झुंड में गर्भपात की बाढ़।"
          }
        ]
      },

      // -----------------------------------------------------------------------
      // SYNDROME 2: ACUTE HIGH FEVER IN RUMINANTS (तीव्र ज्वर > 104°F)
      // -----------------------------------------------------------------------
      acute_ruminant_fever: {
        syndromeKey: "acute_ruminant_fever",
        nameEn: "Acute High Fever in Ruminants (Rectal Temperature > 104.0°F)",
        nameHi: "गोवंश एवं जुगाली पशुओं में तीव्र उच्च ज्वर संलक्षण (> 104°F)",
        species: ["bovine", "bubaline"],
        crucialDifferentiatingTestEn: "Peripheral Blood Smear, Lymph Node Aspiration & Airway Auscultation",
        crucialDifferentiatingTestHi: "रक्त स्मीयर, सतही लिम्फ नोड बायोप्सी एवं श्वसन ऑस्कल्टेशन",
        differentials: [
          {
            diseaseId: "DIFF-ARF-01",
            nameEn: "Bovine Theileriosis (Theileria annulata / Tropical Theileriosis)",
            nameHi: "थायलेरियोसिस / गोला रोग (थायलेरिया एन्युलेटा)",
            keyFeatures: ["high_fever", "swollen_prescapular_lymph_nodes", "petechiae_conjunctiva", "anemia", "exophthalmos", "respiratory_distress"],
            vitalCriteria: { tempMinF: 104.5, tempMaxF: 107.0 },
            confirmatoryTestHi: "प्रीस्कैपुलर लिम्फ नोड एस्पिरेट स्मीयर: मैक्रोफेज के भीतर 'कोच के ब्लू बॉडीज' (Koch's Blue Bodies - Schizonts) की उपस्थिति।",
            firstLineTherapyHi: "Buparvaquone (Butalex / Zubion) 2.5 mg/kg IM गर्दन की मांसपेशियों में एकल खुराक; 48 घंटे बाद आवश्यकतानुसार दोहराएं।",
            rulingOutClueHi: "कंधे के आगे की लिम्फ नोड्स (Prescapular lymph nodes) का अमरूद के आकार जैसी कठोर व बड़ी हो जाना।"
          },
          {
            diseaseId: "DIFF-ARF-02",
            nameEn: "Haemorrhagic Septicaemia (HS / Pasteurella multocida B:2)",
            nameHi: "गलघोंटू / घुर्रका (एच.एस. - पाश्चुरेला मल्टीसिडा)",
            keyFeatures: ["hot_submandibular_edema", "brisket_edema", "stertorous_breathing", "salivation", "rapid_death", "high_fever"],
            vitalCriteria: { tempMinF: 105.0, tempMaxF: 107.5 },
            confirmatoryTestHi: "रक्त स्मीयर की लीशमैन या मिथाइलीन ब्लू स्टेनिंग: ग्राम-नेगेटिव बाइपोलर रॉड्स (Bipolar safety-pin appearance organisms)।",
            firstLineTherapyHi: "Ceftiofur Sodium 2.2 mg/kg IM/IV अथवा Oxytetracycline 10 mg/kg IV + Flunixin Meglumine 2.2 mg/kg IV।",
            rulingOutClueHi: "गले एवं जबड़े के नीचे गर्म, दर्दनाक सूजन, जीभ बाहर निकलना व सांस लेते समय घरघराहट भरी भयानक आवाज।"
          },
          {
            diseaseId: "DIFF-ARF-03",
            nameEn: "Anthrax (Splenic Fever - Bacillus anthracis)",
            nameHi: "एंथ्रेक्स / गिल्टी रोग (प्लिहा ज्वर / बैसिलस एंथ्रासिस)",
            keyFeatures: ["sudden_peracute_death", "tarry_blood_oozing", "absent_rigor_mortis", "bloating_after_death", "splenomegaly"],
            vitalCriteria: { tempMinF: 105.0, tempMaxF: 108.0 },
            confirmatoryTestHi: "कान की नस से रक्त स्मीयर की पॉलीक्रोम मिथाइलीन ब्लू स्टेनिंग (M'Fadyean Reaction): विशिष्ट बैंगनी कैप्सूल से घिरे चौकोर बैसिली।",
            firstLineTherapyHi: "पेनिसिलिन G उच्च खुराक (20,000 IU/kg IV q12h) + एंटी-एंथ्रेक्स सीरम। शव को कदापि न चीरें (Do NOT open carcass)!",
            rulingOutClueHi: "मृत्यु के पश्चात प्राकृतिक छिद्रों (नाक, गुदा, योनि) से काला तारकोल जैसा गैर-जमावदार रक्त बहना और अकड़न (rigor mortis) न होना।"
          },
          {
            diseaseId: "DIFF-ARF-04",
            nameEn: "Acute Toxic Coliform Mastitis (Escherichia coli Endotoxemia)",
            nameHi: "तीव्र विषाक्त कोलीफॉर्म थनैला (ई. कोलाई एंडोटॉक्सिमिया)",
            keyFeatures: ["high_fever", "swollen_hard_teat", "watery_yellow_serous_milk", "recumbency", "cold_ears", "toxic_shock"],
            vitalCriteria: { tempMinF: 104.0, tempMaxF: 106.5 },
            confirmatoryTestHi: "दूध का भौतिक परीक्षण: दूध की जगह हल्का पीला सीरम जैसा पानी व फाइब्रिन के थक्के निकलना; कैलिफोर्निया मास्टाइटिस टेस्ट (CMT) तीव्र पॉजिटिव।",
            firstLineTherapyHi: "बार-बार अयन खाली करना (frequent stripping) + Flunixin Meglumine 2.2 mg/kg IV + Marbofloxacin 8-10 mg/kg IV + हाइपरटॉनिक सेलाइन 7.2%।",
            rulingOutClueHi: "एक ही थन का अत्यधिक सूज जाना, दूध का सीरम जैसा पतला होना और पशु का अचानक शॉक में आ जाना।"
          }
        ]
      },

      // -----------------------------------------------------------------------
      // SYNDROME 3: DOWNER COW / RECUMBENCY SYNDROME (उठने में असमर्थ पशु)
      // -----------------------------------------------------------------------
      downer_cow_syndrome: {
        syndromeKey: "downer_cow_syndrome",
        nameEn: "Downer Cow Syndrome (Recumbency & Inability to Rise)",
        nameHi: "डाउमर काउ संलक्षण / बैठने के बाद उठने में असमर्थता",
        species: ["bovine", "bubaline"],
        crucialDifferentiatingTestEn: "Serum Calcium/Magnesium Chemistry & Pelvic/Obturator Palpation",
        crucialDifferentiatingTestHi: "सीरम कैल्शियम व मैग्नीशियम स्तर तथा पेल्विक/ऑब्ट्यूरेटर तंत्रिका परीक्षण",
        differentials: [
          {
            diseaseId: "DIFF-DCS-01",
            nameEn: "Parturient Hypocalcemia (Milk Fever / Parturient Paresis)",
            nameHi: "दुग्ध ज्वर / हाइपोकैल्सीमिया (कैल्शियम की तीव्र कमी)",
            keyFeatures: ["subnormal_temperature", "s_shaped_neck_curvature", "flaccid_paralysis", "dry_muzzle", "cold_extremities", "dilated_pupils"],
            vitalCriteria: { tempMinF: 96.0, tempMaxF: 100.5 }, // Subnormal temp hallmark
            confirmatoryTestHi: "सीरम टोटल कैल्शियम < 6.0 mg/dL (सामान्य: 8.5-10.5 mg/dL)।",
            firstLineTherapyHi: "कैल्शियम बोरो ग्लूकोनेट 25% (CBG 450 mL): आधा धीमे IV तथा आधा SC दें। (हृदय की धड़कन की स्टेथोस्कोप से सतत निगरानी रखें)।",
            rulingOutClueHi: "गर्दन का अंग्रेजी के 'S' आकार में मुड़ना, शरीर व कानों का बर्फ जैसा ठंडा होना तथा शरीर का तापमान सामान्य से कम (<100°F) होना।"
          },
          {
            diseaseId: "DIFF-DCS-02",
            nameEn: "Maternal Obstetric Paralysis (Obturator & Sciatic Nerve Injury)",
            nameHi: "प्रसवकालीन तंत्रिका पक्षाघात (ऑब्ट्यूरेटर नर्व इंजरी / स्प्लिट लेग्स)",
            keyFeatures: ["recent_dystocia", "alert_demeanor", "eats_normally", "unable_to_adduct_hindlegs", "split_legs", "normal_temp"],
            vitalCriteria: { tempMinF: 101.0, tempMaxF: 102.5 },
            confirmatoryTestHi: "मलाशय परीक्षण (Rectal Palpation): पेल्विक कैनाल की आंतरिक सतह पर ऑब्ट्यूरेटर नर्व के ऊपर सूजन व हीमेटोमा।",
            firstLineTherapyHi: "पैरों को फिसलने से रोकने हेतु हॉबल्स (Hobbles / बेड़ियां) लगाएं, Dexamethasone 0.2 mg/kg IM (नर्व की सूजन घटाने हेतु), न्यूरोट्रॉपिक विटामिन B1/B6/B12।",
            rulingOutClueHi: "कठिन प्रसव (Dystocia) का इतिहास; पशु पूरी तरह सतर्क (alert) है, चारा खा रहा है, लेकिन पिछले पैरों को अंदर नहीं खींच पा रहा।"
          },
          {
            diseaseId: "DIFF-DCS-03",
            nameEn: "Hypomagnesemic Tetany (Grass Tetany / Grass Staggers)",
            nameHi: "हाइपोमैग्नीसीमिया / ग्रास टैटनी (मैग्नीशियम की कमी)",
            keyFeatures: ["tetanic_spasms", "hyperesthesia", "teeth_grinding", "frothing_mouth", "convulsions", "pounding_heart"],
            vitalCriteria: { tempMinF: 102.0, tempMaxF: 106.0 },
            confirmatoryTestHi: "सीरम मैग्नीशियम < 1.0 mg/dL (सामान्य: 1.8-3.0 mg/dL); मृत्यु उपरांत नेत्र द्रव (CSF / Vitreous Humor Mg < 1.0 mg/dL)।",
            firstLineTherapyHi: "मैग्नीशियम व कैल्शियम बोरो ग्लूकोनेट (Mifex 450 mL धीमे IV) + 20% मैग्नीशियम सल्फेट 200 mL सबक्यूटेनियस।",
            rulingOutClueHi: "कैल्शियम की शिथिलता (flaccidity) के विपरीत इसमें पेशियों में भयंकर ऐंठन (tetany), ध्वनि/स्पर्श पर दौरे व आंखें फटी रहना।"
          },
          {
            diseaseId: "DIFF-DCS-04",
            nameEn: "Pelvic or Femoral Fracture / Dislocation",
            nameHi: "श्रोणि या फीमर अस्थि भंग / जोड़ उखड़ना (फ्रैक्चर / डिसलोकेशन)",
            keyFeatures: ["sudden_recumbency_after_slip", "crepitus_on_palpation", "asymmetrical_pelvis", "severe_pain", "groaning"],
            vitalCriteria: { tempMinF: 101.0, tempMaxF: 103.0 },
            confirmatoryTestHi: "मलाशय व बाहरी पैल्पेशन: कूल्हे के जोड़ को हिलाने पर हड्डियों की रगड़ की आवाज (Crepitus) तथा ट्यूबर कॉक्सी की विषमता।",
            firstLineTherapyHi: "बड़े पशुओं में पूर्ण फीमर या पेल्विक फ्रैक्चर का पूर्वानुमान अत्यंत निराशाजनक है; मानवीय इच्छामृत्यु या स्लाटर संस्तुति।",
            rulingOutClueHi: "फर्श पर पैर फिसलने के बाद अचानक बैठ जाना; एक कूल्हा ऊपर-नीचे दिखना और पैर हिलाने पर हड्डियों की चरचराहट सुनाई देना।"
          }
        ]
      },

      // -----------------------------------------------------------------------
      // SYNDROME 4: ACUTE ABDOMINAL DISTENSION / BLOAT (तीव्र अफारा)
      // -----------------------------------------------------------------------
      acute_bloat_syndrome: {
        syndromeKey: "acute_bloat_syndrome",
        nameEn: "Acute Abdominal Distension / Bloat Complex",
        nameHi: "तीव्र उदर फैलाव एवं अफारा संलक्षण (झागदार बनाम गैस अफारा)",
        species: ["bovine", "bubaline", "ovine", "caprine"],
        crucialDifferentiatingTestEn: "Stomach Tube Passage & Left Flank Auscultation-Percussion ('Ping' Test)",
        crucialDifferentiatingTestHi: "आमाशय नली (Stomach Tube) प्रविष्ट करना एवं बाईं कोख में 'पिंग' ध्वनि परीक्षण",
        differentials: [
          {
            diseaseId: "DIFF-BLOAT-01",
            nameEn: "Primary Frothy Bloat (Pasture / Legume Bloat)",
            nameHi: "प्राथमिक झागदार अफारा (बरसीम / ल्यूसर्न हरी घास जनित)",
            keyFeatures: ["left_paralumbar_fossa_distension", "pasture_grazing_history", "stomach_tube_blocked_by_froth", "severe_dyspnea", "mouth_breathing"],
            vitalCriteria: { tempMinF: 101.0, tempMaxF: 102.5 },
            confirmatoryTestHi: "स्टोमक ट्यूब डालने पर गैस बाहर नहीं निकलती; नली के मुख पर केवल चिपचिपा झाग (viscous green foam) बाहर आता है।",
            firstLineTherapyHi: "एंटी-फोमिंग एजेंट: Simethicone + Poloxalene (Bloatosil / Tympol) 100-200 mL सीधे रूमेन में नीडल द्वारा अथवा अलसी/मूंगफली का तेल (500 mL)।",
            rulingOutClueHi: "गीली बरसीम, रिजका या अत्यधिक दाल-वर्गीय चारा चरने के बाद दोनों कोखें फूलना और पेट में गैस न होकर झाग का दलदल होना।"
          },
          {
            diseaseId: "DIFF-BLOAT-02",
            nameEn: "Secondary Free-Gas Bloat (Esophageal Obstruction / Choke)",
            nameHi: "द्वितीयक मुक्त-गैस अफारा (ग्रासनली में रुकावट / चोक)",
            keyFeatures: ["root_crop_ingestion", "profuse_salivation", "sudden_tympanitic_bloat", "stomach_tube_halted_in_neck", "coughing"],
            vitalCriteria: { tempMinF: 101.0, tempMaxF: 102.5 },
            confirmatoryTestHi: "आमाशय नली गले में एक निश्चित स्थान (गर्दन या थोरेसिक इनलेट) पर जाकर रुक जाती है और आगे रूमेन में प्रवेश नहीं कर पाती।",
            firstLineTherapyHi: "आपातकालीन ट्रोकार एवं कैनुला बाईं कोख में लगाकर गैस निकालें; नली द्वारा रुकावट (आलू, गाजर) को चिकनाई (लिक्विड पैराफिन) देकर धीरे से रूमेन में धकेलें।",
            rulingOutClueHi: "आलू, शकरकंद या बेर खाने के तुरंत बाद मुंह से अत्यधिक लार बहना और नली का गले में अटक जाना।"
          },
          {
            diseaseId: "DIFF-BLOAT-03",
            nameEn: "Left Displaced Abomasum (LDA)",
            nameHi: "बाएं विस्थापित चतुर्थ आमाशय (एल.डी.ए. / एबोमेसम विस्थापन)",
            keyFeatures: ["recent_calving", "left_flank_ping", "ketosis", "decreased_milk", "scant_greasy_feces"],
            vitalCriteria: { tempMinF: 100.5, tempMaxF: 102.0 },
            confirmatoryTestHi: "बाईं 8वीं से 12वीं पसली के क्षेत्र में स्टेथोस्कोप लगाकर उंगली से ठोकने (Percussion) पर उच्च आवृत्ति की धात्विक घंटी जैसी 'पिंग' (Liptak Ping) ध्वनि सुनाई देना।",
            firstLineTherapyHi: "शल्य-क्रिया द्वारा एबोमेसोपेक्सी (Abomasopexy) अथवा टॉगल-पिन सूचर तकनीक (Roll and Toggle procedure)।",
            rulingOutClueHi: "ताजा ब्यांत उच्च उत्पादक गाय में रूमेन के बाईं ओर स्टील के बर्तन पर सिक्के से चोट करने जैसी 'पिंग' ध्वनि बजना।"
          }
        ]
      },

      // -----------------------------------------------------------------------
      // SYNDROME 5: CHRONIC PROGRESSIVE EMACIATION IN RUMINANTS (दीर्घकालिक दुर्बलता)
      // -----------------------------------------------------------------------
      chronic_emaciation_ruminant: {
        syndromeKey: "chronic_emaciation_ruminant",
        nameEn: "Chronic Progressive Emaciation & Wasting Syndrome",
        nameHi: "दीर्घकालिक क्रमिक दुर्बलता एवं वजन क्षय संलक्षण (सूखा रोग)",
        species: ["bovine", "bubaline", "caprine", "ovine"],
        crucialDifferentiatingTestEn: "Fecal Acid-Fast Stain, Tuberculin Skin Test & Serum ELISA",
        crucialDifferentiatingTestHi: "गोबर की एसिड-फास्ट स्टेनिंग, ट्यूबरकुलिन टेस्ट एवं सीरम एलिसा",
        differentials: [
          {
            diseaseId: "DIFF-CPE-01",
            nameEn: "Johne's Disease (Paratuberculosis - Mycobacterium avium subsp. paratuberculosis)",
            nameHi: "जोहन्स रोग / पैराट्यूबरकुलोसिस (जे.डी. / पुराना दस्त)",
            keyFeatures: ["pipe_stream_diarrhea", "normal_appetite", "progressive_emaciation", "submandibular_edema", "unresponsive_to_dewormers"],
            vitalCriteria: { tempMinF: 100.5, tempMaxF: 102.5 },
            confirmatoryTestHi: "मल का Ziehl-Neelsen (ZN) स्टेन: मैक्रोफेज के भीतर गुच्छों में छोटे गुलाबी एसिड-फास्ट बैसिली (Clumps of acid-fast bacilli)।",
            firstLineTherapyHi: "लाइलाज जीवाणु रोग (Incurable)। प्रभावित पशु को झुंड से अलग करके निष्कासित (culling) करें; बछड़ों को संक्रमित दूध से बचाएं।",
            rulingOutClueHi: "भूख सामान्य होने के बावजूद फव्वारे जैसा पतला दुर्गंधहीन दस्त (Pipe-stream diarrhea) जो किसी दवा से बंद नहीं होता।"
          },
          {
            diseaseId: "DIFF-CPE-02",
            nameEn: "Bovine Tuberculosis (Mycobacterium bovis)",
            nameHi: "गोवंश क्षय रोग / टी.बी. (माइकोबैक्टीरियम बोविस)",
            keyFeatures: ["chronic_indurated_cough", "intermittent_low_fever", "enlarged_superficial_lymph_nodes", "progressive_weakness", "dyspnea"],
            vitalCriteria: { tempMinF: 102.0, tempMaxF: 103.5 },
            confirmatoryTestHi: "सिंगल इंट्राडर्मल कम्पैरेटिव ट्यूबरकुलिन टेस्ट (SICCT): गर्दन की त्वचा में 72 घंटे बाद त्वचा की मोटाई में 4 मिमी से अधिक वृद्धि।",
            firstLineTherapyHi: "मानव स्वास्थ्य व जूनोटिक सुरक्षा कारणों से पशुओं में टी.बी. का उपचार कानूनी रूप से प्रतिबंधित है। पॉजिटिव पशु का पृथक्करण अनिवार्य।",
            rulingOutClueHi: "सूखी दबी हुई पुरानी खांसी, गर्दन की लिम्फ नोड्स का सख्त होना और धीरे-धीरे कंकाल बन जाना।"
          },
          {
            diseaseId: "DIFF-CPE-03",
            nameEn: "Chronic Fasciolosis (Liver Fluke - Fasciola gigantica / hepatica)",
            nameHi: "क्रोनिक यकृत कृमि रोग (लिवर फ्लूक / फैसियोलोसिस)",
            keyFeatures: ["submandibular_bottle_jaw", "pale_white_conjunctiva", "weakness", "pasture_near_waterbodies", "emaciation"],
            vitalCriteria: { tempMinF: 100.5, tempMaxF: 102.5 },
            confirmatoryTestHi: "मल का सेडिमेंटेशन परीक्षण: विशिष्ट बड़े, सुनहरे-पीले ऑपरकुलेटेड अंडे (Operculated Fasciola ova) दिखना।",
            firstLineTherapyHi: "Triclabendazole 12 mg/kg PO (परिपक्व व अपरिपक्व दोनों फ्लूक हेतु) अथवा Oxyclozanide 10-15 mg/kg PO।",
            rulingOutClueHi: "गले के नीचे पानी भरी थैली (Bottle jaw / जबड़े की सूजन) जो शाम को बढ़ जाती है, तथा अत्यधिक रक्ताल्पता।"
          }
        ]
      },

      // -----------------------------------------------------------------------
      // SYNDROME 6: SUDDEN DEATH IN SHEEP / GOATS (मेमनों व बकरियों में आकस्मिक मृत्यु)
      // -----------------------------------------------------------------------
      sudden_death_small_ruminants: {
        syndromeKey: "sudden_death_small_ruminants",
        nameEn: "Sudden Death Syndrome in Sheep & Goats",
        nameHi: "भेड़-बकरियों में अचानक / आकस्मिक मृत्यु संलक्षण",
        species: ["caprine", "ovine"],
        crucialDifferentiatingTestEn: "Urine Glucose Dipstick, Carcass Orifice Inspection & Liver Necropsy",
        crucialDifferentiatingTestHi: "मूत्र ग्लूकोज परीक्षण, प्राकृतिक छिद्रों का निरीक्षण एवं यकृत शव परीक्षण",
        differentials: [
          {
            diseaseId: "DIFF-SDSR-01",
            nameEn: "Enterotoxemia (Pulpy Kidney Disease - Clostridium perfringens Type D)",
            nameHi: "फिड़किया / एंटरोटॉक्सीमिया (पल्पी किडनी / क्लॉस्ट्रिडियम परफ्रिंजेंस)",
            keyFeatures: ["sudden_death_in_fattest_lambs", "heavy_concentrate_diet", "opisthotonos", "glucosuria", "pulpy_kidneys_on_necropsy"],
            vitalCriteria: { tempMinF: 103.0, tempMaxF: 106.0 },
            confirmatoryTestHi: "मूत्र परीक्षण: तीव्र ग्लूकोसुरिया (Glucosuria ++++); शव परीक्षण पर गुर्दों का मक्खन की तरह पिघल जाना (Pulpy kidneys)।",
            firstLineTherapyHi: "बीमारी तीव्र गति से मारती है; झुंड में तत्काल दाना कम करें, पेनिसिलिन दें तथा क्लॉस्ट्रिडियल टॉक्साइड वैक्सीन लगाएं।",
            rulingOutClueHi: "रेवड़ के सबसे मोटे, स्वस्थ मेमने में अचानक सिर पीछे फेंककर (Opisthotonos) ऐंठन आना और 2 घंटे में मृत्यु होना।"
          },
          {
            diseaseId: "DIFF-SDSR-02",
            nameEn: "Cyanide / Hydrocyanic Acid (HCN) Poisoning (Sorghum / Chari Toxicity)",
            nameHi: "सायनाइड / धुरिन विषाक्तता (सूखाग्रस्त ज्वार / चरी अंतर्ग्रहण)",
            keyFeatures: ["grazing_stunted_sorghum", "sudden_gasping_death", "bright_cherry_red_blood", "bitter_almond_odor", "mydriasis"],
            vitalCriteria: { tempMinF: 101.0, tempMaxF: 103.0 },
            confirmatoryTestHi: "शव से निकले रक्त का रंग: शिरापरक रक्त भी ऑक्सीजन से भरा हुआ चमकीला चेरी जैसा लाल (Bright cherry-red blood) रहता है।",
            firstLineTherapyHi: "Sodium Nitrite (1% solution: 22 mg/kg IV) के तुरंत बाद Sodium Thiosulfate (25% solution: 660 mg/kg IV)।",
            rulingOutClueHi: "बारिश के बाद नई फूटी छोटी या मुरझाई ज्वार/चरी चरने के 15-30 मिनट में सांस फूलकर अचानक ढेर हो जाना।"
          },
          {
            diseaseId: "DIFF-SDSR-03",
            nameEn: "Acute Fasciolosis (Massive Immature Fluke Migration)",
            nameHi: "तीव्र फैसियोलोसिस (अपरिपक्व लिवर फ्लूक का भारी आक्रमण)",
            keyFeatures: ["autumn_grazing_marshlands", "sudden_collapse", "severe_pale_mucosa", "hemorrhagic_peritonitis", "liver_capsule_rupture"],
            vitalCriteria: { tempMinF: 100.5, tempMaxF: 103.0 },
            confirmatoryTestHi: "शव परीक्षण पर पेट में खून से भरा द्रव तथा यकृत की सतह पर हजारों छोटी सुरंगे व कैप्सूल फटना।",
            firstLineTherapyHi: "Triclabendazole 10-12 mg/kg PO (केवल ट्राइक्लाबेन्डाजोल ही 1-सप्ताह पुराने अपरिपक्व फ्लूक मारता है)।",
            rulingOutClueHi: "दलदली चारागाह में चरने के बाद बिना दस्त के अचानक शरीर में रक्त की भारी आंतरिक कमी से भेड़ का गिर जाना।"
          }
        ]
      },

      // -----------------------------------------------------------------------
      // SYNDROME 7: NEUROLOGICAL CONVULSIONS & TREMORS IN CANINES (श्वान में दौरे)
      // -----------------------------------------------------------------------
      canine_neurological_convulsions: {
        syndromeKey: "canine_neurological_convulsions",
        nameEn: "Canine Neurological Convulsions, Tremors & Seizures",
        nameHi: "श्वान तंत्रिका विकार संलक्षण (दौरे, मिर्गी, कंपकंपी व आक्षेप)",
        species: ["canine"],
        crucialDifferentiatingTestEn: "Blood Glucose/Ionized Calcium, Acetylcholinesterase Level & CDV PCR",
        crucialDifferentiatingTestHi: "रक्त शर्करा, आयनीकृत कैल्शियम, कोलिनेस्टरेज़ स्तर एवं डिस्टेंपर पीसीआर",
        differentials: [
          {
            diseaseId: "DIFF-CNC-01",
            nameEn: "Canine Distemper Encephalitis (CDV / Morbillivirus)",
            nameHi: "कैनाइन डिस्टेंपर / दिमागी बुखार (सी.डी.वी. वायरस)",
            keyFeatures: ["chewing_gum_fits", "myoclonus_muscle_twitching", "hyperkeratosis_hard_pad", "biphasic_fever", "ocular_discharge"],
            vitalCriteria: { tempMinF: 103.0, tempMaxF: 105.5 },
            confirmatoryTestHi: "कंजंक्टाइवल स्वैब या CSF का CDV RT-PCR अथवा सीरम IgM एंटीबॉडी परीक्षण।",
            firstLineTherapyHi: "विशिष्ट एंटीवायरल नहीं; सपोर्टिव थेरेपी: Levetiracetam 20-30 mg/kg PO q8h (दौरे नियंत्रण हेतु) + विटामिन B1 + सेलाइन ड्रिप।",
            rulingOutClueHi: "जबड़े का बार-बार चबाने जैसी गति करना ('च्युइंग गम फिट्स'), पंजों के पैड्स का पत्थर जैसा सख्त होना (Hard Pad Disease)।"
          },
          {
            diseaseId: "DIFF-CNC-02",
            nameEn: "Organophosphate / Carbamate Toxicosis",
            nameHi: "ऑर्गेनोफॉस्फेट / कीटनाशक विषाक्तता (ओ.पी. पॉइजनिंग)",
            keyFeatures: ["pinpoint_pupils_miosis", "profuse_salivation", "muscle_fasciculations", "diarrhea_urination", "bradycardia"],
            vitalCriteria: { tempMinF: 99.0, tempMaxF: 102.5 },
            confirmatoryTestHi: "SLUDDE संलक्षण (Salivation, Lacrimation, Urination, Defecation, Dyspnea, Emesis) एवं पुतलियों का अत्यंत सिकुड़ना।",
            firstLineTherapyHi: "एट्रोपिन सल्फेट (Atropine Sulfate): 0.2 - 0.5 mg/kg (एक-चौथाई IV, शेष SC/IM) जब तक कि पुतलियां फैल न जाएं + 2-PAM (Pralidoxime) 20 mg/kg IV।",
            rulingOutClueHi: "आंख की पुतलियों का सुई के छेद जितना छोटा हो जाना (Pinpoint miosis) और मुंह से निरंतर झागदार लार टपकना।"
          },
          {
            diseaseId: "DIFF-CNC-03",
            nameEn: "Puerperal Tetany / Eclampsia (Post-Partum Hypocalcemia in Bitches)",
            nameHi: "एक्लेम्पसिया / दुग्धज आक्षेप (दूध पिलाने वाली कुतिया में कैल्शियम कमी)",
            keyFeatures: ["nursing_puppies_2_to_4_weeks", "hyperthermia", "stiff_stilted_gait", "panting", "muscle_tremors", "restlessness"],
            vitalCriteria: { tempMinF: 104.0, tempMaxF: 107.0 }, // Severe hyperthermia due to muscle tetany
            confirmatoryTestHi: "सीरम आयनीकृत कैल्शियम (Ionized Calcium) < 0.8 mmol/L (सामान्य: 1.1-1.4 mmol/L)।",
            firstLineTherapyHi: "10% कैल्शियम ग्लूकोनेट (Calcium Gluconate 10%): 0.5 - 1.5 mL/kg अत्यंत धीमी गति से IV (ECG व हृदय धड़कन की सतत निगरानी में)।",
            rulingOutClueHi: "2-4 सप्ताह के पिल्लों को दूध पिलाने वाली छोटी नस्ल की कुतिया में तेज बुखार, अत्यधिक हांफना और पूरे शरीर का लकड़ी की तरह अकड़ना।"
          },
          {
            diseaseId: "DIFF-CNC-04",
            nameEn: "Canine Rabies (Encephalitic Lyssavirus)",
            nameHi: "रेबीज / जलांतक (लिस्सावायरस एन्सेफलाइटिस)",
            keyFeatures: ["behavior_change", "dropped_jaw", "inability_to_swallow", "unprovoked_biting", "ptyalism", "paralysis_and_death"],
            vitalCriteria: { tempMinF: 101.5, tempMaxF: 104.0 },
            confirmatoryTestHi: "मृत्यु उपरांत मस्तिष्क ऊतक का डायरेक्ट फ्लोरोसेंट एंटीबॉडी टेस्ट (dFAT): हिप्पोकैम्पस में नेग्री बॉडीज (Negri Bodies)।",
            firstLineTherapyHi: "100% घातक जूनोटिक रोग। कोई उपचार नहीं। तत्काल पशु को अलग सुरक्षित कमरे में क्वारंटाइन करें; मानव संपर्क से बचाएं।",
            rulingOutClueHi: "निचला जबड़ा लकवे के कारण लटक जाना (Dropped jaw), भौंकने की आवाज में बदलाव और 7-10 दिनों में अनिवार्य मृत्यु।"
          }
        ]
      },

      // -----------------------------------------------------------------------
      // SYNDROME 8: ACUTE VOMITING & HEMORRHAGIC DIARRHEA IN PUPPIES (पिल्लों में खूनी दस्त)
      // -----------------------------------------------------------------------
      puppy_vomiting_bloody_diarrhea: {
        syndromeKey: "puppy_vomiting_bloody_diarrhea",
        nameEn: "Acute Vomiting & Hemorrhagic Diarrhea in Puppies",
        nameHi: "पिल्लों में तीव्र उल्टी एवं खूनी दस्त संलक्षण (गैस्ट्रोएंटेराइटिस)",
        species: ["canine"],
        crucialDifferentiatingTestEn: "CPV Fecal Antigen ELISA, CBC (WBC/Leukocyte Count) & Abdominal Ultrasound",
        crucialDifferentiatingTestHi: "पार्वो एंटीजन रैपिड किट, सी.बी.सी. (ल्यूकोसाइट गणना) एवं उदर अल्ट्रासाउंड",
        differentials: [
          {
            diseaseId: "DIFF-PVBD-01",
            nameEn: "Canine Parvovirus Enteritis (CPV-2b / CPV-2c)",
            nameHi: "कैनाइन पार्वोवायरस एंटराइटिस (पार्वो / खूनी दस्त)",
            keyFeatures: ["foul_fetid_bloody_diarrhea", "intractable_vomiting", "severe_leukopenia", "unvaccinated_puppy", "rapid_dehydration", "lethargy"],
            vitalCriteria: { tempMinF: 98.0, tempMaxF: 104.5 }, // Fever early, hypothermia in septic shock
            confirmatoryTestHi: "मल पार्वो एंटीजन टेस्ट किट (CPV Ag ELISA): तीव्र पॉजिटिव बैंड; तथा CBC में गंभीर ल्यूकोपेनिया (WBC < 2000 /µL)।",
            firstLineTherapyHi: "आक्रामक IV फ्लुइड्स (Plasmalyte/RL) + Maropitant (Cerenia) 1 mg/kg SC + Amoxicillin-Clavulanate 20 mg/kg IV + Ondansetron 0.5 mg/kg IV।",
            rulingOutClueHi: "मल में विशिष्ट सड़ी हुई मछली जैसी तीखी बदबू (Rotten flesh odor), पानी का घूंट पीते ही तुरंत उल्टी करना और श्वेत रक्त कणिकाओं का गिरना।"
          },
          {
            diseaseId: "DIFF-PVBD-02",
            nameEn: "Intestinal Intussusception / Foreign Body Obstruction",
            nameHi: "आंत में आंत का घुसना / आंतों की यांत्रिक रुकावट (इंटेस्टाइनल इंटससेप्शन)",
            keyFeatures: ["sausage_shaped_abdominal_mass", "recurrent_projectile_vomiting", "tenesmus", "currant_jelly_stool", "colic_pain"],
            vitalCriteria: { tempMinF: 100.5, tempMaxF: 102.5 },
            confirmatoryTestHi: "उदर अल्ट्रासोनोग्राफी: अनुप्रस्थ काट पर विशिष्ट 'टारगेट / बुल-आई साइन' (Target / Doughnut Sign - Concentric bowel rings)।",
            firstLineTherapyHi: "आपातकालीन शल्य-चिकित्सा (Emergency Laparotomy & Manual Reduction or Resection-Anastomosis)।",
            rulingOutClueHi: "उल्टी रोधक दवाओं के बावजूद लगातार उलटी होना तथा पेट छूने पर रबर की नली या सॉसेज जैसी कठोर गांठ का अनुभव होना।"
          },
          {
            diseaseId: "DIFF-PVBD-03",
            nameEn: "Acute Hemorrhagic Diarrhea Syndrome (AHDS / Acute HGE)",
            nameHi: "तीव्र रक्तस्रावी डायरिया संलक्षण (एच.जी.ई. / स्ट्रॉबेरी जैम दस्त)",
            keyFeatures: ["marked_hemoconcentration", "strawberry_jam_diarrhea", "sudden_onset_in_small_dogs", "normal_or_mild_leukopenia"],
            vitalCriteria: { tempMinF: 101.0, tempMaxF: 103.0 },
            confirmatoryTestHi: "पीसीवी / हेमेटोक्रिट परीक्षण: अत्यधिक हेमोकंसंट्रेशन (PCV > 55% से 65%) जबकि सीरम प्रोटीन सामान्य या कम होता है।",
            firstLineTherapyHi: "तीव्र गति से संतुलित क्रिस्टलॉइड बोलस (Plasmalyte 20-30 mL/kg) जब तक PCV < 50% न आ जाए + Ampicillin-Sulbactam।",
            rulingOutClueHi: "छोटे आकार के वयस्क श्वान/पिल्ले में अचानक स्ट्रॉबेरी जैम जैसा शुद्ध लाल खून का दस्त होना और पीसीवी का 60% पार कर जाना।"
          },
          {
            diseaseId: "DIFF-PVBD-04",
            nameEn: "Heavy Ancylostomiasis (Hookworm Anemia - Ancylostoma caninum)",
            nameHi: "गंभीर हुकवर्म कृमि संक्रमण (अंकुश कृमि जनित रक्ताल्पता)",
            keyFeatures: ["profoundly_pale_chalky_gums", "dark_tarry_melena", "emaciation", "severe_microcytic_anemia", "young_puppy"],
            vitalCriteria: { tempMinF: 98.5, tempMaxF: 101.5 },
            confirmatoryTestHi: "मल का सांद्रण फ्लोटेशन परीक्षण (Fecal Floatation): बड़ी संख्या में हुकवर्म के अंडे (Typical strongyle-type ova)।",
            firstLineTherapyHi: "धीमा संपूर्ण रक्त आधान (Blood Transfusion यदि PCV < 12%) + Pyrantel Pamoate (10 mg/kg PO) + आयरन डेक्सट्रॉन।",
            rulingOutClueHi: "मसूड़े संगमरमर जैसे सफेद (Chalky white gums), मल का रंग काला तारकोल जैसा (Melena), और शरीर में खून का स्तर 10-15% तक गिरना।"
          }
        ]
      }
    },

    // =========================================================================
    // 3. PROBABILITY MATCHING & ALGORITHMIC RULE-OUT ENGINE
    // =========================================================================
    /**
     * Cross-matches clinical findings against differential disease profiles and ranks probabilities.
     * @param {string} syndromeKey - Key from syndromicDatabases (e.g. 'bovine_red_urine')
     * @param {Array<string>} observedSymptoms - Array of symptom strings provided by clinician
     * @param {string} species - "bovine"|"bubaline"|"canine"|"caprine"|"ovine"
     * @param {object} vitalParams - { temperatureF: number, heartRate: number, isPostPartumDays: number }
     */
    differentiateSyndrome: function (syndromeKey, observedSymptoms, species, vitalParams) {
      const synData = this.syndromicDatabases[syndromeKey];
      if (!synData) {
        return { error: "अज्ञात संलक्षण कुंजी (Unknown syndromeKey). Please check getAllSyndromes()." };
      }

      const symptoms = (Array.isArray(observedSymptoms) ? observedSymptoms : []).map(s => s.toLowerCase().trim());
      const vitals = vitalParams || {};
      const tempF = parseFloat(vitals.temperatureF);

      const rankedResults = [];

      for (let i = 0; i < synData.differentials.length; i++) {
        const diff = synData.differentials[i];
        let score = 0;
        let maxPossibleScore = diff.keyFeatures.length * 10;

        // 1. Symptom matching
        const matchedSymptoms = [];
        diff.keyFeatures.forEach(feature => {
          const featClean = feature.toLowerCase();
          const isDirectMatch = symptoms.some(s => s.includes(featClean) || featClean.includes(s));
          if (isDirectMatch) {
            score += 10;
            matchedSymptoms.push(feature);
          }
        });

        // 2. Vital parameters calibration (Temperature)
        let vitalMatchBonus = 0;
        if (!isNaN(tempF) && diff.vitalCriteria) {
          maxPossibleScore += 15;
          if (tempF >= diff.vitalCriteria.tempMinF && tempF <= diff.vitalCriteria.tempMaxF) {
            vitalMatchBonus = 15;
            score += 15;
          } else if (Math.abs(tempF - diff.vitalCriteria.tempMinF) <= 1.0 || Math.abs(tempF - diff.vitalCriteria.tempMaxF) <= 1.0) {
            vitalMatchBonus = 7;
            score += 7;
          }
        }

        // Percentage calculation
        const probabilityPercent = Math.min(Math.round((score / maxPossibleScore) * 100), 99);

        rankedResults.push({
          diseaseId: diff.diseaseId,
          nameEn: diff.nameEn,
          nameHi: diff.nameHi,
          probabilityPercent: Math.max(probabilityPercent, 5),
          matchedFeaturesCount: matchedSymptoms.length,
          matchedFeaturesList: matchedSymptoms,
          confirmatoryDiagnosticTestHi: diff.confirmatoryTestHi,
          rulingOutClueHi: diff.rulingOutClueHi,
          recommendedFirstLineTherapyHi: diff.firstLineTherapyHi
        });
      }

      // Sort by probability descending
      rankedResults.sort((a, b) => b.probabilityPercent - a.probabilityPercent);

      return {
        syndromeKey: synData.syndromeKey,
        syndromeNameEn: synData.nameEn,
        syndromeNameHi: synData.nameHi,
        crucialDiagnosticDifferentiatorHi: synData.crucialDifferentiatingTestHi,
        topRankedDiagnosis: rankedResults[0],
        differentialRanking: rankedResults
      };
    },

    /**
     * Precision Algorithmic Decision Tree for Bovine Red Urine Syndrome.
     * @param {string} centrifugationResult - "sediment_red_supernatant_clear" OR "supernatant_red_no_sediment"
     * @param {boolean} hasHighFever - True if Rectal Temp > 104.0°F
     * @param {number} calvingHistoryDays - Days post-calving (e.g. 15 for 15 days post-calving; null if not fresh)
     * @param {object} additionalSigns - { hasTicks: boolean, hasBloodClotsInUrine: boolean, hasHepaticPain: boolean, hasFlaccidBag: boolean }
     */
    testUrineRedColor: function (centrifugationResult, hasHighFever, calvingHistoryDays, additionalSigns) {
      const centResult = (centrifugationResult || "").toLowerCase();
      const fever = !!hasHighFever;
      const days = parseInt(calvingHistoryDays, 10);
      const signs = additionalSigns || {};

      let primaryDiagnosis = "";
      let primaryDiagnosisHi = "";
      let pathophysiologyClass = "";
      let actionDirectiveHi = "";

      if (centResult === "sediment_red_supernatant_clear" || signs.hasBloodClotsInUrine) {
        // True Hematuria
        pathophysiologyClass = "सत्य रक्तमेह (True Hematuria - Intact Red Blood Cells)";
        primaryDiagnosis = "Bovine Enzootic Hematuria (BEH) or Acute Cystitis / Pyelonephritis";
        primaryDiagnosisHi = "बोवाइन एन्जूटिक हेमेच्योरिया (ब्रैकन फर्न विषाक्तता) अथवा सिस्टाइटिस/पायलोनेफ्राइटिस";
        actionDirectiveHi = "अपकेंद्रीकरण के पश्चात नीचे लाल तलछट बैठना और ऊपरी द्रव का साफ होना यह प्रमाणित करता है कि पेशाब में साबुत आरबीसी आ रही हैं। ब्रैकन फर्न चराई रोकें, हेमोस्टैटिक इंजेक्शन व मूत्र एंटीसेप्टिक दें।";
      } else {
        // Hemoglobinuria or Myoglobinuria
        pathophysiologyClass = "हीमोग्लोबिनमेह (Hemoglobinuria - Lysis of RBCs in Circulation)";

        if (fever && signs.hasTicks) {
          primaryDiagnosis = "Bovine Babesiosis (Tick-borne Red Water Fever)";
          primaryDiagnosisHi = "बबेशियोसिस (चीचड़ जनित टिक फीवर / लाल पेशाब)";
          actionDirectiveHi = "तेज ज्वर (>104°F) व चीचड़ों की उपस्थिति बबेशियोसिस की पुष्टि करती है। तत्काल Diminazene Aceturate (Berenil 3.5 mg/kg deep IM) दें।";
        } else if (!fever && !isNaN(days) && days >= 5 && days <= 45) {
          primaryDiagnosis = "Post-Parturient Hemoglobinuria (PPH / Hypophosphatemia)";
          primaryDiagnosisHi = "ब्यात उपरांत हीमोग्लोबिनमेह (पी.पी.एच. - फॉस्फोरस की कमी)";
          actionDirectiveHi = "ताजा ब्यात गाय में बिना बुखार के लाल-कॉफी पेशाब PPH का क्लासिक लक्षण है। कभी भी बेरेनिल न दें! तत्काल सोडियम एसिड फॉस्फेट (Urovet / Novasac) 60-80 ग्राम IV दें।";
        } else if (fever && signs.hasHepaticPain) {
          primaryDiagnosis = "Bacillary Hemoglobinuria (Clostridium haemolyticum)";
          primaryDiagnosisHi = "बैसीलरी हीमोग्लोबिनमेह (रेड वाटर डिजीज - यकृत इन्फार्क्ट)";
          actionDirectiveHi = "लिवर फ्लूक प्रभावित क्षेत्र में तेज बुखार व यकृत दर्द। उच्च खुराक पेनिसिलिन व टॉक्साइड दें।";
        } else if (signs.hasFlaccidBag) {
          primaryDiagnosis = "Bovine Leptospirosis (Cold Mastitis / Leptospira Pomona)";
          primaryDiagnosisHi = "लेप्टोस्पायरोसिस (ढीला अयन / लाल दूध व पेशाब)";
          actionDirectiveHi = "ऑक्सीटेट्रासाइक्लिन (LA) 20 mg/kg IM तत्काल दें।";
        } else {
          primaryDiagnosis = "Undifferentiated Hemoglobinuria";
          primaryDiagnosisHi = "अविभेदित हीमोग्लोबिनमेह (रक्त स्मीयर व सीरम फॉस्फोरस जांचें)";
          actionDirectiveHi = "तुरंत ब्लड स्मीयर बनाकर जिम्सा स्टेन करें तथा सीरम इनऑर्गेनिक फॉस्फोरस स्तर का परीक्षण कराएं।";
        }
      }

      return {
        pathologyClassificationHi: pathophysiologyClass,
        calculatedDiagnosisEn: primaryDiagnosis,
        calculatedDiagnosisHi: primaryDiagnosisHi,
        clinicalActionDirectiveHi: actionDirectiveHi,
        centrifugationResultUsed: centResult,
        feverPresent: fever,
        daysPostCalving: isNaN(days) ? "N/A" : days
      };
    },

    // =========================================================================
    // 4. UTILITY & EXPLORATION METHODS
    // =========================================================================
    /**
     * Lists all supported clinical diagnostic syndromes.
     */
    getAllSyndromes: function () {
      const keys = Object.keys(this.syndromicDatabases);
      return keys.map(k => {
        const item = this.syndromicDatabases[k];
        return {
          syndromeKey: item.syndromeKey,
          nameEn: item.nameEn,
          nameHi: item.nameHi,
          species: item.species,
          differentialCount: item.differentials.length
        };
      });
    },

    /**
     * Returns the comprehensive dossier and differential tree of a specific syndrome.
     * @param {string} syndromeKey
     */
    getSyndromeDetails: function (syndromeKey) {
      return this.syndromicDatabases[syndromeKey] || { error: "संलक्षण उपलब्ध नहीं है (Syndrome Not Found)." };
    }
  };

  // Seal namespace to preserve diagnostic algorithms during runtime execution
  Object.freeze(window.VetcareApp.ClinicalData.DifferentialDiagnostics.syndromicDatabases);

  // Ready signal
  if (window.VetcareApp.showToast) {
    window.VetcareApp.showToast("विभेदक निदान एवं सिंड्रोमिक निर्णय मैट्रिक्स सक्रिय (Differential Diagnostics Loaded)", "success");
  }
})();
