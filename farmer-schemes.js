// Vetcare AI OS - Government Animal Husbandry, Agri & Fishery Schemes (2026 Production)

/**
 * ============================================================================
 * VETCARE AI OS — GOVERNMENT ANIMAL HUSBANDRY, AGRI & FISHERIES WELFARE HUB
 * ============================================================================
 * Comprehensive catalog of Haryana State & Central Government welfare schemes:
 * 1. Animal Husbandry & Dairying (Pashu Bima, Gokul Mission, Mini Dairy, Pashu KCC, NLM)
 * 2. Agriculture & Farmer Welfare (PM-Kisan, Crop Residue Machinery, PMFBY)
 * 3. Fisheries & Aquaculture (PMMSY, Saline Water Shrimp Farming)
 *
 * Provides: Direct Benefits, Subsidy %, Eligibility, Application Flow, Helplines & WhatsApp Sharing.
 */

(function () {
  'use strict';

  // 1. MASTER SCHEMES DATABASE (window.VETCARE_SCHEMES_DB)
  window.VETCARE_SCHEMES_DB = [
    // ------------------------------------------------------------------------
    // SECTION A: ANIMAL HUSBANDRY & DAIRYING (पशुपालन एवं डेयरी)
    // ------------------------------------------------------------------------
    {
      id: "SCHEME_BIMA_HR",
      title: "पंडित दीनदयाल उपाध्याय पशुधन बीमा योजना (हरियाणा)",
      department: "पशुपालन एवं डेयरी (Animal Husbandry)",
      level: "हरियाणा सरकार (State Govt)",
      tagline: "मुफ्त अथवा नाममात्र प्रीमियम पर दुधारू पशुओं की मृत्यु पर पूर्ण आर्थिक सुरक्षा",
      subsidy: "SC/BPL वर्ग हेतु 100% मुफ्त; सामान्य वर्ग हेतु मात्र ₹100 से ₹300 (3 वर्ष हेतु)",
      directBenefits: "गाय/भैंस की आकस्मिक मृत्यु, बीमारी या दुर्घटना होने पर ₹60,000 से ₹85,000 तक की सीधी क्लेम राशि 30 दिनों में बैंक खाते में।",
      eligibility: "हरियाणा का मूल निवासी पशुपालक, पशु का कान में 12-अंकीय INAPH/UID ईयर टैग होना अनिवार्य, अधिकतम 5 बड़े पशु प्रति परिवार।",
      applicationProcess: "1. नजदीकी राजकीय पशु चिकित्सालय के डॉक्टर से संपर्क कर पशु का स्वास्थ्य प्रमाण पत्र बनवाएं।\n2. सरल हरियाणा पोर्टल (saralharyana.gov.in) पर सीएससी केंद्र के माध्यम से ऑनलाइन आवेदन दर्ज करें।\n3. बीमा कंपनी का प्रतिनिधि मौके पर आकर टैगिंग फोटो अपलोड करेगा।",
      documentsRequired: "परिवार पहचान पत्र (PPP), आधार कार्ड, बैंक पासबुक, पशु का फोटो टैग सहित, पशु चिकित्सक का स्वास्थ्य प्रमाण पत्र।",
      portalUrl: "https://saralharyana.gov.in",
      helpline: "0172-2574663 / 1800-180-2117",
      badgeColor: "bg-emerald-600 text-white"
    },
    {
      id: "SCHEME_GOKUL_SEXED",
      title: "राष्ट्रीय गोकुल मिशन - सेक्स-सॉर्टेड सीमन योजना (RGM)",
      department: "पशुपालन एवं डेयरी (Animal Husbandry)",
      level: "भारत सरकार (केंद्र) व हरियाणा पशुधन विकास बोर्ड",
      tagline: "90% बछड़ी/कटड़ी जन्म गारंटी — नर बछड़े व आवारा पशु समस्या का वैज्ञानिक अंत",
      subsidy: "बाजार मूल्य ₹1,200 प्रति स्ट्रॉ के मुकाबले सरकारी अनुदान पर मात्र ₹100 से ₹200 प्रति स्ट्रॉ",
      directBenefits: "कृत्रिम गर्भाधान कराने पर 90% से अधिक संभावना केवल मादा बछड़ी/कटड़ी पैदा होने की। दुग्ध उत्पादन में तीव्र सुधार व उच्च आनुवंशिक मेरिट।",
      eligibility: "सभी देसी गाय (साहीवाल, गिर, थारपारकर), एचएफ क्रॉस एवं मुर्राह भैंस पालक किसान। पशु का मदकाल में गर्भाशय रोगमुक्त होना चाहिए।",
      applicationProcess: "जब पशु सटीक मद (Heat) में आए और साफ चमकीला तार दे, तो तुरंत अपने नजदीकी राजकीय पशु चिकित्सालय या अधिकृत ए.आई. तकनीशियन से संपर्क कर सेक्सड सीमन स्ट्रॉ की मांग करें।",
      documentsRequired: "पशु का INAPH टैग नंबर, किसान का आधार कार्ड व मोबाइल नंबर।",
      portalUrl: "https://dahd.nic.in",
      helpline: "1800-180-1551 (पशुपालन किसान कॉल सेंटर)",
      badgeColor: "bg-blue-600 text-white"
    },
    {
      id: "SCHEME_MINI_DAIRY",
      title: "मिनी डेयरी व हाई-टेक डेयरी ऋण अनुदान योजना",
      department: "पशुपालन एवं डेयरी (Animal Husbandry)",
      level: "हरियाणा सरकार (State Govt)",
      tagline: "2, 5, 10 व 20 दुधारू पशुओं की व्यावसायिक डेयरी स्थापित करने हेतु भारी कैपिटल सब्सिडी",
      subsidy: "2, 5, 10 पशुओं की यूनिट पर 25% (सामान्य) व 50% (SC वर्ग/महिला) सब्सिडी; 20 से 50 पशुओं पर ब्याज छूट",
      directBenefits: "बैंक से ₹1.5 लाख से ₹15 लाख तक का रियायती ऋण। शेड निर्माण, मिल्किंग मशीन और पशु खरीद पर सीधे बैंक खाते में सब्सिडी ट्रांसफर।",
      eligibility: "18 से 55 वर्ष आयु का हरियाणा निवासी, डेयरी शेड व पशु बांधने हेतु पर्याप्त भूमि उपलब्ध हो, बैंक का पूर्व डिफाल्टर न हो।",
      applicationProcess: "1. सरल हरियाणा पोर्टल (saralharyana.gov.in) पर 'Establishment of Hi-Tech/Mini Dairy Units' योजना चुनें।\n2. भूमि विवरण व बैंक शाखा चुनकर आवेदन जमा करें।\n3. उप-निदेशक (पशुपालन) की कमेटी द्वारा स्वीकृति उपरांत बैंक ऋण जारी करेगा।",
      documentsRequired: "परिवार पहचान पत्र (PPP), आधार, पैन कार्ड, बैंक खाता विवरण, जमीन की फर्द/पट्टा नामा, 10 दिवसीय डेयरी प्रशिक्षण प्रमाण पत्र।",
      portalUrl: "https://saralharyana.gov.in",
      helpline: "0172-2580329",
      badgeColor: "bg-emerald-700 text-white"
    },
    {
      id: "SCHEME_PASHU_KCC",
      title: "पशु किसान क्रेडिट कार्ड (Pashu KCC Scheme)",
      department: "पशुपालन एवं डेयरी (Animal Husbandry)",
      level: "भारत सरकार (केंद्र) व हरियाणा पशुपालन विभाग",
      tagline: "बिना किसी जमीन को गिरवी रखे ₹1.60 लाख तक का कार्यशील ऋण मात्र 4% वार्षिक ब्याज दर पर",
      subsidy: "7% ब्याज दर में 3% समय पर भुगतान करने पर केंद्र सरकार द्वारा ब्याज छूट (प्रभावी ब्याज मात्र 4%)",
      directBenefits: "प्रति गाय ₹40,783, प्रति भैंस ₹60,249, प्रति भेड़/बकरी ₹4,063 का कार्यशील पूंजी ऋण चारा, दाना व दवाओं हेतु।",
      eligibility: "हरियाणा का कोई भी किसान जिसके पास कम से कम एक दुधारू पशु टैग सहित मौजूद है। भूमिहीन पशुपालक भी पूर्ण रूप से पात्र हैं।",
      applicationProcess: "1. अपने नजदीकी सरकारी पशु अस्पताल से Pashu KCC अनुशंसा फॉर्म भरवाएं।\n2. पशु चिकित्सा अधिकारी (VO) के सत्यापन के बाद फॉर्म को अपनी बैंक शाखा में जमा कराएं।\n3. बैंक 15 दिनों में पशु किसान क्रेडिट कार्ड जारी कर देता है।",
      documentsRequired: "आधार कार्ड, पैन कार्ड, परिवार पहचान पत्र, पशु का हेल्थ प्रमाण पत्र व टैग नंबर, 2 पासपोर्ट साइज फोटो।",
      portalUrl: "https://pashuharyana.gov.in",
      helpline: "1800-180-2117 / 1800-11-5526",
      badgeColor: "bg-amber-600 text-white"
    },
    {
      id: "SCHEME_NLM_LIVESTOCK",
      title: "राष्ट्रीय पशुधन मिशन (NLM) - उद्यमिता विकास योजना",
      department: "पशुपालन एवं डेयरी (Animal Husbandry)",
      level: "भारत सरकार (केंद्र सरकार)",
      tagline: "बकरी, भेड़, सूअर व देसी कुक्कुट (Poultry) ब्रीडिंग फार्म पर 50% सीधी पूंजीगत सब्सिडी",
      subsidy: "कुल प्रोजेक्ट लागत पर 50% कैपिटल सब्सिडी (अधिकतम ₹25 लाख से ₹50 लाख तक गैर-वापसी योग्य अनुदान)",
      directBenefits: "100+5 या 500+25 क्षमता के उन्नत नस्ल बकरी/भेड़ फार्म या हैचरी यूनिट की स्थापना। दो किश्तों में सीधे बैंक खाते में सब्सिडी।",
      eligibility: "व्यक्तिगत किसान, उद्यमी, एफपीओ (FPO), स्वयं सहायता समूह (SHG), संयुक्त देयता समूह (JLG)। आवेदक के पास स्वयं की या लीज भूमि होनी चाहिए।",
      applicationProcess: "1. राष्ट्रीय पोर्टल (nlm.udyamimitra.in) पर ऑनलाइन खाता बनाएं।\n2. बैंक से सैंक्शन लेटर व सीए प्रमाणित विस्तृत प्रोजेक्ट रिपोर्ट (DPR) अपलोड करें।\n3. राज्य स्तरीय संचालन समिति (SLAC) द्वारा अनुमोदन पश्चात सब्सिडी स्वीकृत होती है।",
      documentsRequired: "DPR (प्रोजेक्ट रिपोर्ट), जमीन की फर्द, बैंक लोन सैंक्शन पत्र, अनुभव प्रमाण पत्र, आधार व जीएसटी (यदि लागू हो)।",
      portalUrl: "https://nlm.udyamimitra.in",
      helpline: "011-23384192 / 0172-2574663",
      badgeColor: "bg-indigo-700 text-white"
    },
    {
      id: "SCHEME_MURRAH_INCENTIVE",
      title: "मुर्राह दुग्ध प्रोत्साहन व नकद पुरस्कार योजना (हरियाणा)",
      department: "पशुपालन एवं डेयरी (Animal Husbandry)",
      level: "हरियाणा सरकार (State Govt)",
      tagline: "उच्च दुग्ध उत्पादक मुर्राह भैंसों के संरक्षण पर ₹15,000 से ₹30,000 का सीधा नकद पुरस्कार",
      subsidy: "100% सरकारी पुरस्कार राशि सीधे पशुपालक के बैंक खाते में डीबीटी (DBT) द्वारा",
      directBenefits: "• 18 से 21 कि.ग्रा. दैनिक दूध पर: ₹15,000 नकद\n• 22 से 25 कि.ग्रा. दैनिक दूध पर: ₹20,000 नकद\n• 25 कि.ग्रा. से अधिक दैनिक दूध पर: ₹30,000 नकद + प्रशस्ति पत्र।",
      eligibility: "हरियाणा का मूल निवासी पशुपालक, भैंस शुद्ध मुर्राह नस्ल की हो। विभाग की अधिकृत टीम द्वारा तीन समय (Chowki System) दूध की नपाई की जाती है।",
      applicationProcess: "भैंस के ब्याने के 20 से 60 दिन के भीतर अपने ब्लॉक के वरिष्ठ पशु चिकित्सा अधिकारी (SVO) के कार्यालय में लिखित आवेदन प्रस्तुत करें।",
      documentsRequired: "परिवार पहचान पत्र, आधार कार्ड, बैंक खाता पासबुक, भैंस का टैग नंबर व पशु चिकित्सक रिपोर्ट।",
      portalUrl: "https://pashuharyana.gov.in",
      helpline: "0172-2574663",
      badgeColor: "bg-purple-700 text-white"
    },

    // ------------------------------------------------------------------------
    // SECTION B: AGRICULTURE & FARMER WELFARE (कृषि एवं किसान कल्याण)
    // ------------------------------------------------------------------------
    {
      id: "SCHEME_PM_KISAN",
      title: "प्रधानमंत्री किसान सम्मान निधि योजना (PM-KISAN)",
      department: "कृषि एवं किसान कल्याण (Agriculture)",
      level: "भारत सरकार (केंद्र सरकार)",
      tagline: "सभी भूमिधारक किसान परिवारों को प्रतिवर्ष ₹6,000 की सुनिश्चित आय सहायता",
      subsidy: "100% केंद्र पोषित सीधी आर्थिक सहायता",
      directBenefits: "हर चार महीने में ₹2,000 की तीन समान किश्तों में कुल ₹6,000 सीधे किसान के आधार लिंक बैंक खाते में डीबीटी द्वारा ट्रांसफर।",
      eligibility: "कृषि योग्य भूमि रखने वाले सभी छोटे, सीमांत एवं बड़े किसान परिवार। भूमि का म्यूटेशन (दाखिल-खारिज) किसान के नाम होना अनिवार्य।",
      applicationProcess: "1. आधिकारिक पोर्टल (pmkisan.gov.in) पर 'New Farmer Registration' पर क्लिक करें।\n2. आधार नंबर, मोबाइल नंबर व राज्य का चयन कर ओटीपी दर्ज करें।\n3. जमीन की खतौनी/दाखिल खारिज अपलोड करें व e-KYC पूर्ण करें।",
      documentsRequired: "आधार कार्ड, जमीन की फर्द (जमाबंदी), बैंक पासबुक, परिवार पहचान पत्र, सक्रिय मोबाइल नंबर।",
      portalUrl: "https://pmkisan.gov.in",
      helpline: "155261 / 011-24300606",
      badgeColor: "bg-emerald-600 text-white"
    },
    {
      id: "SCHEME_CROP_RESIDUE",
      title: "फसल अवशेष प्रबंधन व कृषि यंत्र अनुदान योजना (CRM)",
      department: "कृषि एवं किसान कल्याण (Agriculture)",
      level: "कृषि विभाग, हरियाणा सरकार",
      tagline: "सुपर सीडर, हैप्पी सीडर, बेलर व स्ट्रॉ चॉपर पर 50% से 80% तक का भारी सरकारी अनुदान",
      subsidy: "व्यक्तिगत किसानों को 50% सब्सिडी; कस्टम हायरिंग सेंटर (CHC/FPO) को 80% तक सब्सिडी",
      directBenefits: "पराली प्रबंधन व बिना जलाए गेहूं की सीधी बिजाई हेतु ₹50,000 से लेकर ₹3.5 लाख तक की छूट। पराली की गांठ बनाकर बेचने पर अतिरिक्त ₹1,000 प्रति एकड़ प्रोत्साहन।",
      eligibility: "हरियाणा का किसान जो 'मेरी फसल मेरा ब्यौरा' (MFMB) पोर्टल पर पंजीकृत हो। पिछले 2 वर्षों में उस यंत्र पर अनुदान न लिया हो।",
      applicationProcess: "1. कृषि विभाग के पोर्टल (agrisharyana.gov.in) पर ऑनलाइन पोर्टल खुलने पर आवेदन करें।\n2. टोकन मनी का ऑनलाइन भुगतान करें।\n3. लॉटरी ड्रा में चयन उपरांत अधिकृत निर्माता से यंत्र खरीदकर बिल पोर्टल पर अपलोड करें।",
      documentsRequired: "मेरी फसल मेरा ब्यौरा रजिस्ट्रेशन, परिवार पहचान पत्र (PPP), आधार कार्ड, बैंक खाता, ट्रैक्टर की वैध आरसी (RC)।",
      portalUrl: "https://agrisharyana.gov.in",
      helpline: "1800-180-2117 (टोल फ्री)",
      badgeColor: "bg-teal-700 text-white"
    },
    {
      id: "SCHEME_MERA_PANI",
      title: "मेरा पानी मेरी विरासत योजना (हरियाणा)",
      department: "कृषि एवं किसान कल्याण (Agriculture)",
      level: "हरियाणा सरकार (State Govt)",
      tagline: "धान के स्थान पर मक्का, कपास, दलहन या तिलहन बोने पर ₹7,000 प्रति एकड़ प्रोत्साहन राशि",
      subsidy: "100% नकद प्रोत्साहन राशि सीधे बैंक खाते में",
      directBenefits: "धान (जीरी) की खेती छोड़ने और कम पानी वाली वैकल्पिक फसलें (मक्का, मूंग, उड़द, कपास, ग्वार) बोने पर प्रति एकड़ ₹7,000 की वित्तीय सहायता।",
      eligibility: "हरियाणा के वे किसान जिन्होंने पिछले वर्ष धान की खेती की थी और इस वर्ष वैकल्पिक फसल लगा रहे हैं। खेत को खाली रखने पर भी लाभ मान्य।",
      applicationProcess: "मेरी फसल मेरा ब्यौरा (fasal.haryana.gov.in) पर अपनी फसल दर्ज करते समय 'मेरा पानी मेरी विरासत' विकल्प को चुनें। पटवारी व कृषि विभाग द्वारा भौतिक सत्यापन के बाद पैसा बैंक में आएगा।",
      documentsRequired: "मेरी फसल मेरा ब्यौरा रजिस्ट्रेशन आईडी, आधार कार्ड, बैंक पासबुक, पीपीपी।",
      portalUrl: "https://fasal.haryana.gov.in",
      helpline: "1800-180-2117",
      badgeColor: "bg-blue-700 text-white"
    },

    // ------------------------------------------------------------------------
    // SECTION C: FISHERIES & AQUACULTURE (मत्स्य पालन विभाग)
    // ------------------------------------------------------------------------
    {
      id: "SCHEME_PMMSY_FISHERY",
      title: "प्रधानमंत्री मत्स्य संपदा योजना (PMMSY)",
      department: "मत्स्य पालन विभाग (Fisheries)",
      level: "भारत सरकार व मत्स्य विभाग हरियाणा",
      tagline: "नए तालाब निर्माण, बायोफ्लॉक यूनिट, आरएएस (RAS) व मछली फीड मिल पर 40% से 60% सब्सिडी",
      subsidy: "सामान्य वर्ग के किसानों हेतु 40% अनुदान; महिला, अनुसूचित जाति (SC/ST) हेतु 60% सब्सिडी",
      directBenefits: "नए तालाब की खुदाई व इनपुट्स हेतु ₹7.0 लाख से ₹11.0 लाख प्रति हेक्टेयर तक सहायता। बायोफ्लॉक टैंक लगाने हेतु ₹4.5 लाख तक अनुदान।",
      eligibility: "स्वयं की जमीन अथवा न्यूनतम 7 से 10 वर्ष के रजिस्टर्ड पट्टे (Lease) पर ली गई भूमि वाला कोई भी किसान या समूह। जल स्रोत व बिजली कनेक्शन उपलब्ध हो।",
      applicationProcess: "1. राष्ट्रीय पोर्टल (pmmsy.dof.gov.in) पर योजना का चयन कर आवेदन करें।\n2. प्रोजेक्ट रिपोर्ट व जमीन के दस्तावेज जिला मत्स्य अधिकारी (DFO Office) में सत्यापित कराएं।\n3. राज्य स्तरीय तकनीकी कमेटी से स्वीकृति के बाद निर्माण कार्य प्रारंभ करें।",
      documentsRequired: "भूमि की जमाबंदी/लीज एग्रीमेंट, जल व मिट्टी परीक्षण रिपोर्ट, आधार कार्ड, बैंक पासबुक, डीपीआर (DPR)।",
      portalUrl: "https://pmmsy.dof.gov.in",
      helpline: "1800-425-1660 / 0172-2566085",
      badgeColor: "bg-cyan-700 text-white"
    },
    {
      id: "SCHEME_SALINE_SHRIMP",
      title: "खारे पानी में सफेद झींगा पालन योजना (Saline Water Shrimp)",
      department: "मत्स्य पालन विभाग (Fisheries)",
      level: "मत्स्य विभाग, हरियाणा सरकार",
      tagline: "खारे और बंजर भूजल को बनाएं सोने की खान — प्रति एकड़ ₹4 से ₹8 लाख तक शुद्ध लाभ",
      subsidy: "झींगा पालन तालाब निर्माण, प्लास्टिक लाइनिंग, एरिएटर व फीड पर 40% से 60% तक पूंजीगत सब्सिडी",
      directBenefits: "रोहतक, झज्जर, हिसार, भिवानी, चरखी दादरी व सिरसा के खारे पानी वाले क्षेत्रों में व्हाइट श्रिम्प (Litopenaeus vannamei) पालन से प्रति एकड़ बंपर आय। रियायती दरों पर कृषि बिजली कनेक्शन।",
      eligibility: "खारे भूजल (Saline Water >5 ppt) वाले क्षेत्रों के किसान जिनके पास उपयुक्त भूमि उपलब्ध हो। विभाग द्वारा 5-दिवसीय अनिवार्य प्रशिक्षण कराया जाता है।",
      applicationProcess: "जिला मत्स्य अधिकारी (DFO) के कार्यालय में संपर्क करें। पानी की लैब जांच रिपोर्ट के आधार पर प्रोजेक्ट तैयार कर सरकार से सब्सिडी स्वीकृत कराएं।",
      documentsRequired: "पानी की लवणता जांच रिपोर्ट, फर्द/लीज दस्तावेज, आधार कार्ड, बैंक पासबुक, पीपीपी।",
      portalUrl: "https://harfish.gov.in",
      helpline: "0172-2566085 / 01262-272200",
      badgeColor: "bg-sky-800 text-white"
    }
  ];

  // 2. ACTIVE FILTER STATE
  var activeDeptFilter = "ALL";
  var activeSearchQuery = "";
  var expandedSchemeIds = {};

  // 3. CORE CONTROLLER: renderGovtSchemes
  window.renderGovtSchemes = function (containerId, departmentFilter, searchQuery) {
    // Resolve Container
    var container = null;
    if (containerId) {
      container = document.getElementById(containerId);
    }
    if (!container) {
      container = document.getElementById("govtSchemesContainer");
    }
    if (!container) {
      var helpdesk = document.getElementById("viewHelpdesk");
      if (helpdesk) {
        var existing = document.getElementById("injectedGovtSchemesWrap");
        if (!existing) {
          existing = document.createElement("div");
          existing.id = "injectedGovtSchemesWrap";
          existing.className = "mt-4";
          helpdesk.appendChild(existing);
        }
        container = existing;
      }
    }
    if (!container) return;

    if (departmentFilter !== undefined) activeDeptFilter = departmentFilter;
    if (searchQuery !== undefined) activeSearchQuery = searchQuery;

    // Filter Logic
    var list = window.VETCARE_SCHEMES_DB.filter(function (item) {
      // Dept Filter
      if (activeDeptFilter !== "ALL" && item.department !== activeDeptFilter) {
        return false;
      }
      // Search Query
      if (activeSearchQuery.trim() !== "") {
        var q = activeSearchQuery.toLowerCase().trim();
        var matchTitle = item.title.toLowerCase().indexOf(q) !== -1;
        var matchTag = item.tagline.toLowerCase().indexOf(q) !== -1;
        var matchBenefits = item.directBenefits.toLowerCase().indexOf(q) !== -1;
        var matchDept = item.department.toLowerCase().indexOf(q) !== -1;
        var matchLevel = item.level.toLowerCase().indexOf(q) !== -1;
        if (!matchTitle && !matchTag && !matchBenefits && !matchDept && !matchLevel) {
          return false;
        }
      }
      return true;
    });

    // Counts for Category Badges
    var countTotal = window.VETCARE_SCHEMES_DB.length;
    var countPashu = window.VETCARE_SCHEMES_DB.filter(function (s) { return s.department.indexOf("पशुपालन") !== -1; }).length;
    var countAgri = window.VETCARE_SCHEMES_DB.filter(function (s) { return s.department.indexOf("कृषि") !== -1; }).length;
    var countFish = window.VETCARE_SCHEMES_DB.filter(function (s) { return s.department.indexOf("मत्स्य") !== -1; }).length;

    var html = `
      <div class="space-y-4 text-xs">
        
        <!-- TOP BRANDED BANNER WITH DUAL-PORTAL ACCESS -->
        <div class="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-5 shadow-lg border border-emerald-800">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-2xl">🏛️</span>
                <h2 class="text-base sm:text-lg font-black tracking-tight">सरकारी पशुपालन, कृषि व मत्स्य कल्याण योजनाएं</h2>
              </div>
              <p class="text-xs text-emerald-200 mt-1">
                हरियाणा राज्य व केंद्र सरकार के सीधे अनुदान, सब्सिडी %, पात्रता एवं सरल पोर्टल आवेदन प्रक्रिया।
              </p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-1 rounded-xl font-bold">
                ✓ 2026 अद्यतन गाइडलाइन
              </span>
            </div>
          </div>

          <!-- SUMMARY COUNTERS -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-emerald-800/80 text-center">
            <div class="bg-white/10 rounded-2xl p-2 backdrop-blur-xs">
              <span class="text-[10px] text-emerald-200 block font-medium">कुल कल्याणकारी योजनाएं</span>
              <span class="text-sm sm:text-base font-black text-white">${countTotal} योजनाएं</span>
            </div>
            <div class="bg-emerald-500/20 rounded-2xl p-2 border border-emerald-400/30">
              <span class="text-[10px] text-emerald-200 block font-medium">पशुपालन एवं डेयरी</span>
              <span class="text-sm sm:text-base font-black text-emerald-300">🐄 ${countPashu} योजनाएं</span>
            </div>
            <div class="bg-teal-500/20 rounded-2xl p-2 border border-teal-400/30">
              <span class="text-[10px] text-teal-200 block font-medium">कृषि एवं किसान कल्याण</span>
              <span class="text-sm sm:text-base font-black text-teal-300">🌾 ${countAgri} योजनाएं</span>
            </div>
            <div class="bg-cyan-500/20 rounded-2xl p-2 border border-cyan-400/30">
              <span class="text-[10px] text-cyan-200 block font-medium">मत्स्य पालन (PMMSY)</span>
              <span class="text-sm sm:text-base font-black text-cyan-300">🐟 ${countFish} योजनाएं</span>
            </div>
          </div>
        </div>

        <!-- SEARCH AND DEPARTMENT FILTER TABS -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
          <div class="flex flex-col sm:flex-row gap-2.5">
            <!-- Search Bar -->
            <div class="relative flex-1">
              <span class="absolute left-3.5 top-3 text-slate-400 text-xs"><i class="fa-solid fa-magnifying-glass"></i></span>
              <input
                id="schemesSearchInput"
                type="text"
                value="${escapeHtml(activeSearchQuery)}"
                placeholder="योजना का नाम, सब्सिडी, विभाग या लाभ खोजें (उदा. बीमा, डेयरी, PM-Kisan)..."
                oninput="window.handleSchemeSearchTyping(this.value)"
                class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-8 py-2.5 text-xs outline-none focus:border-emerald-600 font-medium text-slate-800"
              />
              ${activeSearchQuery ? `
                <button onclick="window.clearSchemeSearch()" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs">✕</button>
              ` : ''}
            </div>

            <!-- Department Selector Dropdown on Mobile / Tabs on Desktop -->
            <div class="flex gap-1 overflow-x-auto no-scrollbar bg-slate-100 p-1 rounded-2xl text-[11px] font-bold shrink-0">
              <button
                type="button"
                onclick="window.setSchemeDepartmentFilter('ALL')"
                class="px-3 py-1.5 rounded-xl transition shrink-0 ${activeDeptFilter === 'ALL' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
              >
                सभी विभाग (${countTotal})
              </button>
              <button
                type="button"
                onclick="window.setSchemeDepartmentFilter('पशुपालन एवं डेयरी (Animal Husbandry)')"
                class="px-3 py-1.5 rounded-xl transition shrink-0 ${activeDeptFilter.indexOf('पशुपालन') !== -1 ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
              >
                पशुपालन (${countPashu})
              </button>
              <button
                type="button"
                onclick="window.setSchemeDepartmentFilter('कृषि एवं किसान कल्याण (Agriculture)')"
                class="px-3 py-1.5 rounded-xl transition shrink-0 ${activeDeptFilter.indexOf('कृषि') !== -1 ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
              >
                कृषि कल्याण (${countAgri})
              </button>
              <button
                type="button"
                onclick="window.setSchemeDepartmentFilter('मत्स्य पालन विभाग (Fisheries)')"
                class="px-3 py-1.5 rounded-xl transition shrink-0 ${activeDeptFilter.indexOf('मत्स्य') !== -1 ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
              >
                मत्स्य पालन (${countFish})
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span>प्रदर्शित योजनाएं: <strong class="text-slate-800">${list.length}</strong></span>
            ${activeSearchQuery ? `<span class="text-emerald-700 font-semibold">फिल्टर: "${escapeHtml(activeSearchQuery)}"</span>` : ''}
            <button onclick="window.resetSchemeFilters()" class="text-emerald-700 hover:underline font-bold">
              🔄 रीसेट करें
            </button>
          </div>
        </div>

        <!-- SCHEMES EXPANDABLE CARDS LIST -->
        ${list.length === 0 ? `
          <div class="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center space-y-2">
            <span class="text-4xl">🏛️</span>
            <h3 class="text-sm font-bold text-slate-800">कोई संबंधित सरकारी योजना नहीं मिली!</h3>
            <p class="text-xs text-slate-500">कृपया कीवर्ड बदलकर खोजें अथवा 'सभी विभाग' का चयन करें।</p>
            <button onclick="window.resetSchemeFilters()" class="mt-2 bg-emerald-50 text-emerald-700 font-bold px-4 py-2 rounded-xl text-xs hover:bg-emerald-100 transition">
              सभी योजनाएं देखें
            </button>
          </div>
        ` : `
          <div class="space-y-3.5">
            ${list.map(function (scheme) { return renderSingleSchemeCard(scheme); }).join('')}
          </div>
        `}

        <!-- OFFICIAL HELPLINE & SARAL DIRECTORY FOOTER -->
        <div class="bg-slate-900 text-white rounded-3xl p-4 sm:p-5 shadow-xs space-y-2.5">
          <h4 class="font-bold text-emerald-400 flex items-center gap-1.5 text-xs sm:text-sm">
            <span>📞</span> <span>आधिकारिक किसान सहायता व ऑनलाइन आवेदन पोर्टल्स:</span>
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
            <div class="p-2.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
              <strong class="text-white block font-bold">1. सरल हरियाणा (Antyodaya Saral)</strong>
              <p class="text-slate-300">पशु बीमा, मिनी डेयरी, पशु ऋण व कृषि सब्सिडी हेतु एकल खिड़की पोर्टल।</p>
              <a href="https://saralharyana.gov.in" target="_blank" class="text-emerald-300 hover:underline font-bold inline-block pt-1">saralharyana.gov.in ↗</a>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
              <strong class="text-white block font-bold">2. मेरी फसल मेरा ब्यौरा (MFMB)</strong>
              <p class="text-slate-300">फसल पंजीकरण, एमएसपी पर खरीद व पराली प्रबंधन यंत्र अनुदान पोर्टल।</p>
              <a href="https://fasal.haryana.gov.in" target="_blank" class="text-emerald-300 hover:underline font-bold inline-block pt-1">fasal.haryana.gov.in ↗</a>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
              <strong class="text-white block font-bold">3. पशुपालन हेल्पलाइन (टोल-फ्री)</strong>
              <p class="text-slate-300">हरियाणा: 1800-180-2117<br>राष्ट्रीय किसान कॉल सेंटर: 1800-180-1551</p>
              <span class="text-amber-300 font-bold block pt-1">प्रातः 9:00 से सायं 5:00 तक</span>
            </div>
          </div>
        </div>

      </div>
    `;

    container.innerHTML = html;
  };

  // 4. HELPER: RENDER SINGLE EXPANDABLE SCHEME CARD
  function renderSingleSchemeCard(scheme) {
    var isExpanded = !!expandedSchemeIds[scheme.id];

    return `
      <div class="bg-white border border-slate-200 hover:border-emerald-500 rounded-3xl p-4 sm:p-5 shadow-xs transition space-y-3 relative group">
        
        <!-- CARD HEADER -->
        <div class="space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full ${scheme.badgeColor || 'bg-emerald-600 text-white'}">
                ${escapeHtml(scheme.department)}
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                ${escapeHtml(scheme.level)}
              </span>
            </div>

            <!-- TOGGLE BUTTON -->
            <button
              type="button"
              onclick="window.toggleSchemeExpand('${escapeHtml(scheme.id)}')"
              class="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 transition flex items-center gap-1 shrink-0"
            >
              <span>${isExpanded ? 'संक्षिप्त करें' : 'विस्तार देखें'}</span>
              <i class="fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-[10px]"></i>
            </button>
          </div>

          <!-- SCHEME TITLE & TAGLINE -->
          <div>
            <h3 class="text-sm sm:text-base font-black text-slate-900 leading-snug">
              ${escapeHtml(scheme.title)}
            </h3>
            <p class="text-[11.5px] font-medium text-slate-600 mt-0.5 leading-relaxed">
              ${escapeHtml(scheme.tagline)}
            </p>
          </div>

          <!-- DIRECT BENEFIT & SUBSIDY HIGHLIGHTS (ALWAYS VISIBLE) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
            <div class="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-2.5">
              <span class="text-[9.5px] font-bold text-emerald-800 block uppercase tracking-wider">सब्सिडी व आर्थिक अनुदान (% व राशि):</span>
              <span class="font-black text-emerald-950 text-xs block mt-0.5">${escapeHtml(scheme.subsidy)}</span>
            </div>
            <div class="bg-blue-50/80 border border-blue-200 rounded-2xl p-2.5">
              <span class="text-[9.5px] font-bold text-blue-800 block uppercase tracking-wider">सीधा किसान लाभ (Direct Value):</span>
              <span class="font-medium text-slate-800 text-[11px] block mt-0.5">${escapeHtml(scheme.directBenefits)}</span>
            </div>
          </div>
        </div>

        <!-- EXPANDABLE DETAILS ACCORDION -->
        ${isExpanded ? `
          <div class="pt-2 border-t border-slate-100 space-y-2.5 text-xs text-slate-700 animate-fadeIn">
            
            <!-- ELIGIBILITY -->
            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1">
              <span class="font-bold text-slate-900 flex items-center gap-1.5">
                <i class="fa-solid fa-user-check text-emerald-600"></i> पात्रता एवं शर्तें (Eligibility):
              </span>
              <p class="text-[11px] text-slate-700 leading-relaxed pl-5">
                ${escapeHtml(scheme.eligibility)}
              </p>
            </div>

            <!-- APPLICATION STEPS -->
            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1">
              <span class="font-bold text-slate-900 flex items-center gap-1.5">
                <i class="fa-solid fa-list-check text-blue-600"></i> चरणबद्ध आवेदन प्रक्रिया (How to Apply):
              </span>
              <div class="text-[11px] text-slate-700 leading-relaxed pl-5 whitespace-pre-line">
                ${escapeHtml(scheme.applicationProcess)}
              </div>
            </div>

            <!-- DOCUMENTS REQUIRED -->
            <div class="bg-amber-50/60 p-3 rounded-2xl border border-amber-200 space-y-1 text-amber-950">
              <span class="font-bold flex items-center gap-1.5">
                <i class="fa-solid fa-file-invoice text-amber-700"></i> आवश्यक दस्तावेज (Documents Required):
              </span>
              <p class="text-[11px] leading-relaxed pl-5 font-medium">
                ${escapeHtml(scheme.documentsRequired)}
              </p>
            </div>

            <!-- HELPLINE & LINKS -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-slate-100 rounded-2xl text-[11px]">
              <div class="flex items-center gap-1.5 text-slate-800">
                <i class="fa-solid fa-phone text-blue-700"></i>
                <span class="font-bold">हेल्पलाइन:</span>
                <span class="font-mono font-bold">${escapeHtml(scheme.helpline)}</span>
              </div>
              <div class="flex items-center gap-2">
                <a
                  href="${escapeHtml(scheme.portalUrl)}"
                  target="_blank"
                  class="bg-slate-900 hover:bg-black text-white font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1 text-[11px]"
                >
                  <span>आधिकारिक पोर्टल</span>
                  <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
              </div>
            </div>

          </div>
        ` : ''}

        <!-- CARD BOTTOM ACTIONS: WHATSAPP SHARE & PORTAL REDIRECT -->
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onclick="window.shareSchemeWhatsApp('${escapeHtml(scheme.id)}')"
            class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-[11px] shadow-xs transition flex items-center gap-1.5 active:scale-98"
          >
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>व्हाट्सएप पर शेयर करें</span>
          </button>

          <a
            href="${escapeHtml(scheme.portalUrl)}"
            target="_blank"
            class="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <span>आवेदन लिंक (Portal)</span>
            <i class="fa-solid fa-external-link text-[10px]"></i>
          </a>
        </div>

      </div>
    `;
  }

  // 5. ACTION: 1-CLICK WHATSAPP SHARING
  window.shareSchemeWhatsApp = function (schemeId) {
    var scheme = window.VETCARE_SCHEMES_DB.find(function (s) { return s.id === schemeId; });
    if (!scheme) return;

    var text =
      "📢 *सरकारी किसान व पशुपालक योजना जानकारी* 🌾\n\n" +
      "🏛️ *योजना:* " + scheme.title + "\n" +
      "🏢 *विभाग:* " + scheme.department + " (" + scheme.level + ")\n\n" +
      "💰 *सब्सिडी व अनुदान:* " + scheme.subsidy + "\n\n" +
      "✅ *सीधे लाभ:* " + scheme.directBenefits + "\n\n" +
      "📋 *पात्रता:* " + scheme.eligibility + "\n\n" +
      "🌐 *ऑनलाइन पोर्टल:* " + scheme.portalUrl + "\n" +
      "📞 *हेल्पलाइन:* " + scheme.helpline + "\n\n" +
      "स्रोत: *Vetcare AI OS (स्मार्ट पशुपालक एवं चिकित्सक ऑपरेटिंग सिस्टम)*";

    var url = "https://wa.me/?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
  };

  // 6. UI TOGGLE & FILTER CONTROLLERS
  window.toggleSchemeExpand = function (schemeId) {
    expandedSchemeIds[schemeId] = !expandedSchemeIds[schemeId];
    window.renderGovtSchemes();
  };

  window.handleSchemeSearchTyping = function (val) {
    activeSearchQuery = val;
    window.renderGovtSchemes();
  };

  window.clearSchemeSearch = function () {
    activeSearchQuery = "";
    var el = document.getElementById("schemesSearchInput");
    if (el) el.value = "";
    window.renderGovtSchemes();
  };

  window.setSchemeDepartmentFilter = function (dept) {
    activeDeptFilter = dept;
    window.renderGovtSchemes();
  };

  window.resetSchemeFilters = function () {
    activeDeptFilter = "ALL";
    activeSearchQuery = "";
    expandedSchemeIds = {};
    window.renderGovtSchemes();
  };

  // 7. ESCAPE HTML HELPER
  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // 8. AUTO-INITIALIZATION OBSERVER
  function checkAndInitSchemes() {
    var target = document.getElementById("govtSchemesContainer") || document.getElementById("viewHelpdesk");
    if (target) {
      window.renderGovtSchemes();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkAndInitSchemes);
  } else {
    checkAndInitSchemes();
  }

})();
