// Vetcare AI OS - Veterinary Pharmacology, Corticosteroids & Medicines DB (2026 Production)

(function () {
  'use strict';

  // =========================================================================
  // 1. MASTER VETERINARY DRUGS PHARMACOPEIA DATABASE (ZERO PLACEHOLDERS)
  // =========================================================================
  window.VETCARE_DRUGS_DB = [
    // -----------------------------------------------------------------------
    // CATEGORY 1: CORTICOSTEROIDS (कॉर्टिकोस्टेरॉयड / स्टेरॉयड)
    // -----------------------------------------------------------------------
    {
      id: "CORT_01",
      name: "Isoflupredone Acetate (आइसोफ्लूप्रेडोन)",
      category: "CORTICOSTEROIDS",
      categoryNameHi: "कॉर्टिकोस्टेरॉयड (स्टेरॉयड)",
      salt: "Isoflupredone Acetate 2 mg/ml Suspension",
      ethicalBrand: "Isoflud (Zoetis) / Predef 2X",
      genericOption: "Isoflupredone Inj 2mg/ml (Generic Vet)",
      mrpEthical: 360,
      mrpGeneric: 145,
      dose: "Cattle/Buffalo: 10-20 mg (5-10 ml) Deep I/M; Sheep/Goat: 1-2 ml I/M. Repeat at 48h interval if essential.",
      route: "Deep I/M or Intra-articular (Aseptic)",
      pregnancySafe: false,
      pregnancyDetails: "⚠️ गाभिन के अंतिम त्रैमासिक (Last Trimester / 7-9 माह) में सख्त निषेध! यह कॉर्टिसोल स्तर बढ़ाकर असामयिक प्रसव (Abortion / Pre-term Parturition) प्रेरित करता है। केवल प्रथम या द्वितीय त्रैमासिक में जान बचाने की स्थिति में सीमित प्रयोग करें।",
      indications: "गंभीर कीटोसिस (Bovine Ketosis), तीव्र मस्टाइटिस में सहायक सूजन-रोधी, गठिया (Synovitis/Arthritis), एलर्जिक डर्मेटाइटिस। मिनरलोकॉर्टिकॉइड प्रभाव न्यूनतम, हाइपोकैलिमिया का ध्यान रखें।",
      withdrawal: "दूध: 7 दिन (14 मिल्किंग्स) • मांस: 7 दिन",
      contraindications: "डायबिटीज, वायरल संक्रमण, गंभीर रीनल डैमेज, उन्नत गर्भावस्था।"
    },
    {
      id: "CORT_02",
      name: "Dexamethasone Sodium Phosphate (डेक्सामेथासोन)",
      category: "CORTICOSTEROIDS",
      categoryNameHi: "कॉर्टिकोस्टेरॉयड (स्टेरॉयड)",
      salt: "Dexamethasone Sodium Phosphate IP 4.4 mg/ml (Eq. to 4 mg Dexamethasone)",
      ethicalBrand: "Dexona Vet (Zydus Animal Health) / Dexa-Kel",
      genericOption: "Dexamethasone Sodium Inj 4mg/ml (Gen-Vet)",
      mrpEthical: 78,
      mrpGeneric: 28,
      dose: "Anaphylaxis/Emergency Shock: 1-4 mg/kg IV slow; Anti-inflammatory: 0.02-0.08 mg/kg IM/IV (400kg पशु: 5-10 ml).",
      route: "Slow I/V, I/M, Intra-articular",
      pregnancySafe: false,
      pregnancyDetails: "🚨 STRICT PREGNANCY RED ALERT (गर्भपात का सीधा खतरा): गर्भावस्था के तीसरे ट्राइमेस्टर (260 दिन के बाद) में डेक्सामेथासोन का प्रयोग 24-72 घंटे के भीतर निश्चित गर्भपात (Abortion/Induction of Calving) करा देता है। प्लेसेंटा रिटेंशन (ROP) की 80% संभावना रहती है। गाभिन पशुओं में कभी न लगाएं!",
      indications: "तीव्र एनाफिलेक्टिक शॉक (दवा/टीका रिएक्शन), सांप का काटना (Snake Bite), तीव्र जहरीला अफारा, पल्मोनरी एडिमा, तीव्र टॉक्सीमिया। शक्तिशाली ग्लूकोकॉर्टिकॉइड प्रभाव (हाइड्रोकार्टिसोन से 30 गुना तेज)।",
      withdrawal: "दूध: 3 दिन (72 घंटे) • मांस: 8 दिन",
      contraindications: "उन्नत गर्भावस्था, फंगल संक्रमण, ऑस्टियोपोरोसिस, कोर्नियल अल्सर (नेत्र में कभी न डालें)।"
    },
    {
      id: "CORT_03",
      name: "Prednisolone Acetate (प्रेडनिसोलोन एसिटेट)",
      category: "CORTICOSTEROIDS",
      categoryNameHi: "कॉर्टिकोस्टेरॉयड (स्टेरॉयड)",
      salt: "Prednisolone Acetate IP 10 mg/ml Aqueous Suspension",
      ethicalBrand: "Prednacin-J (Intas) / Predsol Vet (Virbac)",
      genericOption: "Prednisolone Inj 10mg/ml (Generic Animal Health)",
      mrpEthical: 125,
      mrpGeneric: 48,
      dose: "Cattle/Buffalo: 100-200 mg (10-20 ml) Deep I/M; Dog/Calf: 1 mg/kg I/M. Intra-articular: 2-4 ml.",
      route: "Deep I/M, Intra-articular (कदापि IV न दें)",
      pregnancySafe: false,
      pregnancyDetails: "⚠️ गाभिन पशुओं में अत्यंत सावधानी से प्रयोग करें। उच्च खुराक या बार-बार प्रयोग से अंतिम तिमाही में गर्भपात और भ्रूण विकृति का जोखिम रहता है।",
      indications: "जोड़ों की सूजन (Bursitis, Arthritis), कीटोसिस में ग्लूकोज उत्पादन उत्तेजन, एलर्जी व श्वसन तंतु शोध। मध्यम अवधि (12-36 घंटे) की सक्रियता।",
      withdrawal: "दूध: 3 दिन • मांस: 5 दिन",
      contraindications: "हार्ट फेलियर, सिस्टमिक माइकोसिस, हाइपरएड्रेनोकोर्टिसिज्म।"
    },
    {
      id: "CORT_04",
      name: "Betamethasone Sodium Phosphate (बीटामेथासोन)",
      category: "CORTICOSTEROIDS",
      categoryNameHi: "कॉर्टिकोस्टेरॉयड (स्टेरॉयड)",
      salt: "Betamethasone Sodium Phosphate 4 mg/ml",
      ethicalBrand: "Betnesol Vet (GlaxoSmithKline/Virbac)",
      genericOption: "Beta-Vet Inj 4mg/ml (Generic)",
      mrpEthical: 92,
      mrpGeneric: 32,
      dose: "Large Animal: 4-20 mg (1-5 ml) I/M or Slow I/V; Small Animal: 0.1-0.2 ml/10kg.",
      route: "I/M, Slow I/V, Intra-articular",
      pregnancySafe: false,
      pregnancyDetails: "🚨 उच्च जोखिम: अंतिम गर्भावस्था में भ्रूण के फेफड़ों की परिपक्वता के साथ गर्भाशय संकुचन प्रेरित करता है; गर्भपात का गंभीर खतरा।",
      indications: "तीव्र सूजन, टॉक्सिक शॉक, रूमैटिक डिसऑर्डर, हाइपरसेंसिटिविटी रिएक्शंस। दीर्घकालिक शक्तिशाली एंटी-इन्फ्लेमेटरी गतिविधि।",
      withdrawal: "दूध: 4 दिन • मांस: 7 दिन",
      contraindications: "सक्रिय गैस्ट्रिक अल्सर, टीकाकरण के तुरंत बाद, गर्भावधि।"
    },
    {
      id: "CORT_05",
      name: "Triamcinolone Acetonide (ट्राईएमसिनोलोन)",
      category: "CORTICOSTEROIDS",
      categoryNameHi: "कॉर्टिकोस्टेरॉयड (स्टेरॉयड)",
      salt: "Triamcinolone Acetonide 6 mg/ml Suspension",
      ethicalBrand: "Kenacort Vet (Abbott) / Vetalog (Zoetis)",
      genericOption: "Triamcinolone Acet 6mg/ml (Generic Vet)",
      mrpEthical: 195,
      mrpGeneric: 75,
      dose: "Cattle/Horse: 0.02-0.04 mg/kg (2-5 ml total) Deep I/M or Intra-articular (1-3 ml). Small Animal: 0.1-0.2 mg/kg.",
      route: "Deep I/M, Intra-articular, Intralesional (कदापि IV न दें)",
      pregnancySafe: false,
      pregnancyDetails: "🚨 पूर्णतः निषिद्ध: दीर्घकालिक क्रियाशील (Long Acting Depot) स्टेरॉयड होने के कारण प्लेसेंटल बैरियर को पार कर गर्भपात एवं टेराटोजेनिक प्रभाव पैदा करता है।",
      indications: "क्रोनिक आर्थराइटिस, टेनोसिनोवाइटिस, एग्जिमा, गंभीर त्वचा शोथ, नॉन-इन्फेक्शियस मस्कुलोस्केलेटल दर्द। प्रभाव 14-21 दिन तक रहता है।",
      withdrawal: "दूध: निषिद्ध (Not recommended in lactating dairy animals) • मांस: 14 दिन",
      contraindications: "गाभिन पशु, संक्रामक गठिया, इम्यूनोसप्रेशन, गंभीर गुर्दा रोग।"
    },

    // -----------------------------------------------------------------------
    // CATEGORY 2: ANTIBIOTICS (एंटीबायोटिक)
    // -----------------------------------------------------------------------
    {
      id: "ANTI_01",
      name: "Ceftiofur Sodium / RTU (सेफ्टिओफर सोडियम)",
      category: "ANTIBIOTICS",
      categoryNameHi: "एंटीबायोटिक (प्रतिजैविक)",
      salt: "Ceftiofur Sodium 1 g Vial with Diluent (or RTU 50 mg/ml)",
      ethicalBrand: "Xyrofur 1g (Intas) / Naxcel (Zoetis) / Excenel",
      genericOption: "Ceftiofur Sodium 1g Vet (Generic Pharma)",
      mrpEthical: 440,
      mrpGeneric: 185,
      dose: "Cattle/Buffalo: 1.1-2.2 mg/kg I/M or S/C once daily for 3-5 days (1g vial per 400-500kg).",
      route: "Deep I/M, S/C (Never I/V for suspension)",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन में 100% सुरक्षित (Pregnancy Safe): सभी 3 ट्राइमेस्टर में पूरी तरह सुरक्षित है। 3rd Generation सेफालोस्पोरिन होने के कारण भ्रूण पर कोई विषाक्त प्रभाव नहीं डालता।",
      indications: "तीव्र गलघोंटू (HS), निमोनिया/BRD, मेट्राइटिस (Acute Puerperal Metritis), पैर सड़न (Foot Rot), सिस्टमिक बैक्टीरियल संक्रमण। सबसे बड़ा लाभ: शून्य दूध विथड्रॉल (Zero Milk Discard in most protocols).",
      withdrawal: "दूध: 0 दिन (शून्य दूध बर्बादी) • मांस: 4 दिन",
      contraindications: "सेफालोस्पोरिन या बीटा-लैक्टम एंटीबायोटिक से गंभीर एलर्जी।"
    },
    {
      id: "ANTI_02",
      name: "Enrofloxacin 10% (एनरोफ्लोक्सासिन)",
      category: "ANTIBIOTICS",
      categoryNameHi: "एंटीबायोटिक (प्रतिजैविक)",
      salt: "Enrofloxacin IP 100 mg/ml (10% w/v)",
      ethicalBrand: "Baytril 10% (Bayer/Elanco) / Floxidin (Intas)",
      genericOption: "Enrocin 10% Inj (Generic Vet)",
      mrpEthical: 290,
      mrpGeneric: 110,
      dose: "Cattle/Buffalo: 5 mg/kg body weight (15-20 ml for 400kg animal) once daily for 3 days. Deep IM or slow IV.",
      route: "Deep I/M, S/C, or Very Slow I/V in drip",
      pregnancySafe: false,
      pregnancyDetails: "⚠️ सापेक्ष निषेध (Relative Contraindication): प्रारंभिक गर्भावस्था एवं अंतिम माह में प्रयोग से बचें। विकासशील भ्रूण के कार्टिलेज/जोड़ों के उपास्थि क्षरण (Cartilage damage) का जोखिम पैदा करता है।",
      indications: "गंभीर श्वसन तंत्र संक्रमण, आंत्रशोथ (Colibacillosis/Enteritis), मस्टाइटिस का ग्राम-नेगेटिव संक्रमण, साल्मोनेलोसिस, मूत्र मार्ग संक्रमण।",
      withdrawal: "दूध: 4 दिन (8 मिल्किंग्स) • मांस: 14 दिन",
      contraindications: "बढ़ते हुए बछड़ों में जोड़ों की समस्या, गंभीर गुर्दे की विफलता।"
    },
    {
      id: "ANTI_03",
      name: "Amoxicillin + Sulbactam (एमोक्सिसिलिन व सल्बेक्टम)",
      category: "ANTIBIOTICS",
      categoryNameHi: "एंटीबायोटिक (प्रतिजैविक)",
      salt: "Amoxicillin Sodium 3000 mg + Sulbactam Sodium 1500 mg (4.5 g Vial)",
      ethicalBrand: "Moxikind-CV 4.5g (Mankind) / Vetclox-Plus",
      genericOption: "Amoxy-Sulbactam 4.5g Vet (Generic Pharma)",
      mrpEthical: 420,
      mrpGeneric: 170,
      dose: "7-10 mg/kg body weight I/M or slow I/V BID (1 vial 4.5g for 400kg cattle).",
      route: "Deep I/M or Slow I/V",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन में सुरक्षित: बीटा-लैक्टम और बीटा-लैक्टामेज अवरोधक का संयोजन गर्भावस्था के दौरान सुरक्षित श्रेणी में आता है।",
      indications: "गंभीर थनैला (Acute Clinical Mastitis), गर्भाशय शोधन/मेट्राइटिस, शल्य चिकित्सा उपरांत संक्रमण, ब्रोंकोनिमोनिया।",
      withdrawal: "दूध: 3 दिन • मांस: 7 दिन",
      contraindications: "पेनिसिलिन से अतिसंवेदनशीलता।"
    },
    {
      id: "ANTI_04",
      name: "Oxytetracycline Long Acting (ऑक्सीटेट्रासाइक्लिन एल.ए.)",
      category: "ANTIBIOTICS",
      categoryNameHi: "एंटीबायोटिक (प्रतिजैविक)",
      salt: "Oxytetracycline Dihydrate IP 200 mg/ml (LA Formulation)",
      ethicalBrand: "Terramycin LA (Zoetis) / Oxytet LA (Pfizer)",
      genericOption: "Oxytetracycline 200mg/ml LA (Generic)",
      mrpEthical: 260,
      mrpGeneric: 95,
      dose: "20 mg/kg body weight single Deep I/M dose (1 ml per 10 kg; 30-40 ml for large cattle divided into 2 sites).",
      route: "Deep I/M Only (कदापि IV न दें - 200mg LA formulation)",
      pregnancySafe: false,
      pregnancyDetails: "⚠️ गर्भावस्था चेतावनी: अंतिम त्रैमासिक में भ्रूण की हड्डियों व दांतों के विकास में कैल्शियम केलेशन करता है जिससे पीलापन व विकृति हो सकती है। उच्च खुराक पर हेपेटोटॉक्सिक प्रभाव।",
      indications: "एनाप्लास्मोसिस (Anaplasmosis), ब्लैक क्वार्टर (BQ), क्लैमाइडिया, वुंड इन्फेक्शन, खुरपका-मुंहपका (FMD) में द्वितीयक बैक्टीरियल सुरक्षा। 72 घंटे तक सतत रक्त स्तर।",
      withdrawal: "दूध: 7 दिन • मांस: 21 दिन",
      contraindications: "तीव्र यकृत एवं गुर्दा विफलता, आई.वी. रूट (LA फॉर्मूलेशन हेतु)।"
    },
    {
      id: "ANTI_05",
      name: "Gentamicin Sulphate (जेंटामाइसिन सल्फेट)",
      category: "ANTIBIOTICS",
      categoryNameHi: "एंटीबायोटिक (प्रतिजैविक)",
      salt: "Gentamicin Sulphate IP 40 mg/ml (or 100 mg/ml)",
      ethicalBrand: "Genticyn Vet (Piramal) / Genta-Vet",
      genericOption: "Gentamicin 40mg/ml Inj (Generic)",
      mrpEthical: 85,
      mrpGeneric: 30,
      dose: "4-5 mg/kg body weight I/M or Slow I/V once/twice daily for 3 days (15-20 ml for 400kg animal). Intrauterine: 10-20 ml with saline.",
      route: "I/M, Slow I/V, Intrauterine (गर्भाशय शोधन)",
      pregnancySafe: false,
      pregnancyDetails: "🚨 नेफ्रोटॉक्सिक व ओटोटॉक्सिक जोखिम: प्लेसेंटा पार कर भ्रूण के गुर्दों और श्रवण तंत्रिका (8th Cranial Nerve) को नुकसान पहुंचा सकता है। गाभिन में सिस्टमिक प्रयोग से बचें।",
      indications: "ग्राम नेगेटिव सेप्टीसीमिया, कोलीबैसिलोसिस, गर्भाशय संक्रमण (Endometritis Intrauterine infusion), स्यूडोनोमास संक्रमण।",
      withdrawal: "दूध: 3 दिन • मांस: 30 दिन (गुर्दों में लंबे समय तक अवशेष)",
      contraindications: "निर्जलीकरण, रीनल फेलियर, न्यूरोमस्कुलर ब्लॉकर के साथ संयोजन।"
    },
    {
      id: "ANTI_06",
      name: "Procaine Penicillin + Streptomycin (पेनिसिलिन व स्ट्रेप्टोमाइसिन)",
      category: "ANTIBIOTICS",
      categoryNameHi: "एंटीबायोटिक (प्रतिजैविक)",
      salt: "Procaine Penicillin G 15,00,000 IU + Penicillin G Sodium 5,00,000 IU + Streptomycin 2.5 g (Total 2.5g / 5g Vial)",
      ethicalBrand: "Dicrysticin-S 2.5g (Zydus) / Bistrepen (MSD)",
      genericOption: "Penicillin-Streptomycin 2.5g Inj (Generic)",
      mrpEthical: 68,
      mrpGeneric: 26,
      dose: "Large Animal: 2.5g - 5g Deep I/M once daily for 3-5 days. Dissolve in provided water for injection.",
      route: "Deep I/M Only (कदापि IV न दें - प्रोकेन कार्डियक अरेस्ट करता है)",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन में सामान्यतः सुरक्षित (Streptomycin लंबे समय तक उच्च मात्रा में न दें, अन्यथा भ्रूण कान विषाक्तता संभव)। मानक 3-दिवसीय कोर्स सुरक्षित है।",
      indications: "गलघोंटू (HS), ब्लैक क्वार्टर (BQ), स्ट्रैंगल्स, टिटनेस में सहायक, कास्ट्रेसन व चोट के घाव। ग्राम पॉजिटिव व ग्राम नेगेटिव का ब्रॉड स्पेक्ट्रम तालमेल।",
      withdrawal: "दूध: 3 दिन • मांस: 14 दिन",
      contraindications: "पेनिसिलिन एनाफिलेक्सिस, आई.वी. रूट सख्त मना।"
    },

    // -----------------------------------------------------------------------
    // CATEGORY 3: NSAIDS / ANALGESICS (दर्द व बुखार नाशक)
    // -----------------------------------------------------------------------
    {
      id: "NSAIDS_01",
      name: "Flunixin Meglumine (फ्लुनिक्सिन मेग्लुमाइन)",
      category: "NSAIDS",
      categoryNameHi: "दर्द, बुखार व एंडोटॉक्सिन नाशक",
      salt: "Flunixin Meglumine IP 50 mg/ml (Eq. to 50 mg Flunixin)",
      ethicalBrand: "Megludyne (Virbac) / Finadyne (MSD Animal Health)",
      genericOption: "Flunixin Inj 50mg/ml (Generic Vet)",
      mrpEthical: 380,
      mrpGeneric: 160,
      dose: "Cattle/Buffalo: 1.1-2.2 mg/kg (2 ml per 45 kg body weight; 15-20 ml for 400kg animal) once daily for up to 3 days.",
      route: "Slow I/V preferred, or Deep I/M",
      pregnancySafe: true,
      pregnancyDetails: "✅ गर्भावस्था में सुरक्षित (Safe in Pregnancy): हालांकि प्रसव के ठीक समय (Parturition) प्रयोग न करें क्योंकि प्रोस्टाग्लैंडीन अवरोध से प्रसव में देरी (Prolonged labor) हो सकती है। सामान्य बुखार व दर्द में सुरक्षित।",
      indications: "तीव्र एंडोटॉक्सिक शॉक, तीव्र कोलिक दर्द (पेट दर्द), ई. कोलाई मस्टाइटिस टॉक्सिन शमन, गंभीर श्वसन रोग में फेफड़ों की सूजन रोधी। गैर-स्टेरॉयड दवाओं में सबसे शक्तिशाली एंटी-टॉक्सिक दवा।",
      withdrawal: "दूध: 36 घंटे • मांस: 4 दिन",
      contraindications: "गंभीर पेट अल्सर, निर्जलीकरण, हाइपोवोलेमिक नेफ्रोपैथी।"
    },
    {
      id: "NSAIDS_02",
      name: "Meloxicam + Paracetamol (मेलोक्सिकैम व पैरासिटामोल)",
      category: "NSAIDS",
      categoryNameHi: "दर्द व बुखार नाशक (NSAIDs)",
      salt: "Meloxicam IP 5 mg/ml + Paracetamol IP 150 mg/ml",
      ethicalBrand: "Melonex Plus (Intas) / Melobest-P (Mankind)",
      genericOption: "Meloxi-Para Inj (Generic Animal Health)",
      mrpEthical: 190,
      mrpGeneric: 65,
      dose: "Meloxicam 0.5 mg/kg + Paracetamol 15 mg/kg (Large Animal: 20-30 ml Deep I/M; Sheep/Goat: 2-3 ml).",
      route: "Deep I/M Only",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन पशुओं के लिए सर्वाधिक सुरक्षित पेनकिलर (The Safest NSAID in all 3 Trimesters): चयनात्मक COX-2 अवरोधक होने से पेट और भ्रूण पर प्रतिकूल प्रभाव नहीं पड़ता।",
      indications: "तेज बुखार (Pyrexia), लंगड़ापन, आर्थराइटिस, प्रोलेप्स का दर्द, मस्टाइटिस, घाव की सूजन। दैनिक पशु चिकित्सा का सबसे विश्वसनीय दर्द निवारक।",
      withdrawal: "दूध: 2 दिन • मांस: 15 दिन",
      contraindications: "गंभीर यकृत खराबी, पेरासिटामोल टॉक्सिसिटी बिल्लियों में।"
    },
    {
      id: "NSAIDS_03",
      name: "Tolfenamic Acid (टॉलफेनामिक एसिड)",
      category: "NSAIDS",
      categoryNameHi: "दर्द व बुखार नाशक (NSAIDs)",
      salt: "Tolfenamic Acid IP 40 mg/ml",
      ethicalBrand: "Tolfedine Vet (Vetoquinol) / Maxxtol (Intas)",
      genericOption: "Tolfenamic Acid 4% Inj (Generic)",
      mrpEthical: 340,
      mrpGeneric: 130,
      dose: "Cattle: 2 mg/kg I/M or Slow I/V (1 ml per 20 kg body weight; 20 ml for 400kg animal). Can repeat once after 48 hours.",
      route: "I/M or Slow I/V",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन में सुरक्षित: प्रसव काल के अतिरिक्त गर्भावस्था के सभी चरणों में सुरक्षित परीक्षण सत्यापित।",
      indications: "तीव्र मस्टाइटिस, न्यूमोनिया में श्वसन अवरोध निवारण, 48 घंटे लंबा प्रभाव (Long Duration 48 hrs action).",
      withdrawal: "दूध: 24 घंटे (केवल 1 दिन) • मांस: 7 दिन",
      contraindications: "कार्डियक फेलियर, गंभीर डिहाइड्रेशन।"
    },
    {
      id: "NSAIDS_04",
      name: "Ketoprofen 10% (कीटोप्रोफेन)",
      category: "NSAIDS",
      categoryNameHi: "दर्द व बुखार नाशक (NSAIDs)",
      salt: "Ketoprofen IP 100 mg/ml (10% w/v)",
      ethicalBrand: "Ketovet (Zydus) / Neoprofen (Cargill)",
      genericOption: "Ketoprofen 100mg/ml (Generic Vet)",
      mrpEthical: 210,
      mrpGeneric: 72,
      dose: "3 mg/kg body weight (3 ml per 100 kg body weight; 12-15 ml for 400kg cattle) I/M or Slow I/V for 1-3 days.",
      route: "Deep I/M or Slow I/V",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन में सुरक्षित: अनुशंसित चिकित्सीय मात्रा में टेराटोजेनिक या एबॉर्फासिएंट प्रभाव नहीं देखा गया।",
      indications: "प्रसवोपरांत दर्द (Downer Cow Syndrome), जोड़ों की मोच, मस्कुलोस्केलेटल ट्रॉमा, तीव्र बुखार। तीव्र गति से राहत (Rapid onset of action).",
      withdrawal: "दूध: 24 घंटे (1 दिन) • मांस: 4 दिन",
      contraindications: "गैस्ट्रोइंटेस्टाइनल अल्सरेशन, रीनल डिसफंक्शन।"
    },

    // -----------------------------------------------------------------------
    // CATEGORY 4: ANTIPROTOZOALS (प्रोटोज़ोआ नाशक)
    // -----------------------------------------------------------------------
    {
      id: "PROTO_01",
      name: "Diminazene Aceturate (डिमिनजीन एसिट्यूरेट)",
      category: "ANTIPROTOZOALS",
      categoryNameHi: "प्रोटोज़ोआ व रक्त परजीवी नाशक",
      salt: "Diminazene Aceturate 70 mg/ml + Phenazone 375 mg/ml (or 2.36g Sachet / 30ml Vial)",
      ethicalBrand: "Berenil RTU (MSD Animal Health) / Diminasan",
      genericOption: "Diminazene Aceturate 7% RTU (Generic Vet)",
      mrpEthical: 280,
      mrpGeneric: 115,
      dose: "Babesiosis: 3.5 mg/kg body weight (5 ml per 100 kg; 20 ml for 400kg). Trypanosomiasis (Surra): 7 mg/kg (10 ml per 100 kg) Deep I/M.",
      route: "Deep I/M Only (विभाजित स्थलों पर लगाएं; कदापि IV न दें)",
      pregnancySafe: false,
      pregnancyDetails: "⚠️ उच्च जोखिम चेतावनी: बबेसिओसिस जनित तेज बुखार में पशु की जान बचाने हेतु देना आवश्यक होता है, परंतु डिमिनजीन से गर्भाशय ऐंठन तथा टॉक्सीसिटी के कारण गर्भपात (Abortion) का खतरा रहता है। सहायक प्रोजेस्टेरोन सपोर्ट पर विचार करें।",
      indications: "बबेसिओसिस (लाल पेशाब / Red Water / Babesia bigemina), ट्रिपैनोसोमियासिस (सर्रा रोग / Surra), ट्राइकोमोनिएसिस। फेनाज़ोन एनाल्जेसिक घटक बुखार तुरंत कम करता है।",
      withdrawal: "दूध: 3 दिन • मांस: 21 दिन",
      contraindications: "ऊंटों में टॉक्सिक (ऊंट में प्रयोग वर्जित - Camel hypersensitivity), इंट्रावेनस इंजेक्शन सख्त मना।"
    },
    {
      id: "PROTO_02",
      name: "Buparvaquone 5% (बुपरवाक्वोन)",
      category: "ANTIPROTOZOALS",
      categoryNameHi: "प्रोटोज़ोआ व रक्त परजीवी नाशक",
      salt: "Buparvaquone IP 50 mg/ml",
      ethicalBrand: "Butalex (MSD Animal Health) / Zubion (Intas)",
      genericOption: "Buparvaquone 50mg/ml Inj (Generic Pharma)",
      mrpEthical: 1450,
      mrpGeneric: 580,
      dose: "2.5 mg/kg body weight single Deep I/M dose (1 ml per 20 kg body weight; 20 ml for 400kg cattle in neck muscles).",
      route: "Deep I/M into the neck muscles only",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन में अपेक्षाकृत सुरक्षित (Relatively Safe): थाइलेरिया संक्रमण स्वयं 106°F बुखार से गर्भपात का मुख्य कारण है। बुपरवाक्वोन जीवन रक्षक है और भ्रूण पर सीधा जहरीला प्रभाव नहीं डालता।",
      indications: "थाइलेरियोसिस (Theileria annulata / East Coast Fever), गर्दन की लिंफ नोड्स में भारी सूजन, कोर्नियल ओपेसिटी, 106°F का अनियंत्रित बुखार। शुरुआती अवस्था में 95% से अधिक सफलता दर।",
      withdrawal: "दूध: 2 दिन (48 घंटे) • मांस: 42 दिन (लंबा विथड्रॉल)",
      contraindications: "आई.वी. या सबक्यूटेनियस रूट से न लगाएं (लोकल नेक्रोसिस का खतरा)।"
    },
    {
      id: "PROTO_03",
      name: "Quinapyramine Prosalt / Sulphate (क्विनापिरामाइन)",
      category: "ANTIPROTOZOALS",
      categoryNameHi: "प्रोटोज़ोआ व रक्त परजीवी नाशक",
      salt: "Quinapyramine Sulphate 1.5g + Quinapyramine Chloride 1g (Total 2.5g Vial)",
      ethicalBrand: "Triquin (MSD Animal Health) / Antrycide Prosalt",
      genericOption: "Quinapyramine Prosalt 2.5g (Generic Vet)",
      mrpEthical: 220,
      mrpGeneric: 85,
      dose: "3-5 mg/kg body weight S/C only (Dissolve 2.5g vial in 15 ml sterile water; inject approx 1 ml per 40-50 kg body weight S/C).",
      route: "Subcutaneous (S/C) Only (कदापि IM या IV न दें - कार्डियक शॉक)",
      pregnancySafe: false,
      pregnancyDetails: "🚨 गाभिन में सख्त निषेध: गंभीर गर्भाशय संकुचन, कंपकंपी व विषाक्तता उत्पन्न करता है जिससे तत्काल गर्भपात हो सकता है।",
      indications: "ट्रिपैनोसोमियासिस (सर्रा रोग / Surra / Trypanosoma evansi), ऊंट, घोड़े व गोवंश में चक्राकार चक्कर काटना, अंधापन व क्रोनिक वेस्टिंग। प्रोसॉल्ट रूप 6 माह तक सुरक्षात्मक इम्युनिटी देता है।",
      withdrawal: "दूध: 14 दिन • मांस: 28 दिन",
      contraindications: "आई.एम. या आई.वी. रूट, दुर्बल पशुओं में बिना ग्लूकोज-सलाइन के प्रयोग।"
    },

    // -----------------------------------------------------------------------
    // CATEGORY 5: METABOLIC & MINERALS (उपापचयी व खनिज)
    // -----------------------------------------------------------------------
    {
      id: "META_01",
      name: "Calcium Borogluconate Complex (Mifex / CBG)",
      category: "METABOLIC",
      categoryNameHi: "मेटाबोलिक व खनिज इन्फ्यूजन",
      salt: "Calcium Borogluconate 25% w/v + Magnesium Hypophosphite + Dextrose (Mifex Formula)",
      ethicalBrand: "Mifex (Novartis/Elanco) / Calborol (Pfizer)",
      genericOption: "Calcium Borogluconate 450ml (Generic Vet)",
      mrpEthical: 310,
      mrpGeneric: 135,
      dose: "Cattle/Buffalo: 450 ml total (Half slow I/V with cardiac monitoring, half S/C at divided sites). Warm to body temperature before infusion.",
      route: "Slow I/V (with auscultation of heart) and S/C",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन व ताजा ब्यांत में 100% सुरक्षित (Life Saving): प्रसव कालीन हाइपोकैल्सीमिया (मिल्क फीवर) में जीवन रक्षक है।",
      indications: "मिल्क फीवर (Hypocalcemia / सूतिका ज्वर), डाउनर काउ सिंड्रोम, प्रसवोपरांत गर्भाशय जड़ता (Uterine Inertia), हाइपोमैग्नीसीमिया ग्रास टेटनी।",
      withdrawal: "दूध: शून्य (0 दिन) • मांस: 0 दिन",
      contraindications: "हार्ट ब्लॉक, अत्यधिक तेज गति से आई.वी. इन्फ्यूजन (Heart Arrest Risk - सदैव गति धीमी रखें)।"
    },
    {
      id: "META_02",
      name: "Toldimphos Sodium (टोलडिमफॉस सोडियम / टोनोफॉस्फेन)",
      category: "METABOLIC",
      categoryNameHi: "मेटाबोलिक व खनिज इन्फ्यूजन",
      salt: "Toldimphos Sodium 200 mg/ml (Organic Phosphorus)",
      ethicalBrand: "Tonophosphan Vet (MSD Animal Health)",
      genericOption: "Toldimphos Sodium 20% Inj (Generic Vet)",
      mrpEthical: 320,
      mrpGeneric: 130,
      dose: "Cattle/Buffalo: 10-15 ml I/M or Slow I/V daily or alternate days for 3-5 injections. Sheep/Goat: 2-3 ml.",
      route: "I/M, Slow I/V, S/C",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन में पूर्णतः सुरक्षित: चयापचय में सुधार लाता है तथा इनफर्टिलिटी व कमजोरी दूर करता है।",
      indications: "पोस्ट-पार्टुरिएंट हीमोग्लोबिन्यूरिया (PPH / ब्याने के बाद लाल पेशाब), बार-बार फिरना (Repeat Breeding), रिकेट्स, डाउनर काउ में ऊर्जा संचरण (ATP Synthesizer).",
      withdrawal: "दूध: 0 दिन • मांस: 0 दिन",
      contraindications: "हाइपरफॉस्फेटेमिया।"
    },
    {
      id: "META_03",
      name: "Sodium Acid Phosphate (सोडियम एसिड फॉस्फेट)",
      category: "METABOLIC",
      categoryNameHi: "मेटाबोलिक व खनिज इन्फ्यूजन",
      salt: "Sodium Acid Phosphate 40.3% w/v (Inorganic Phosphorus)",
      ethicalBrand: "Urumin (MSD) / Novasac (Virbac)",
      genericOption: "Sodium Acid Phosphate 40% Inj (Generic)",
      mrpEthical: 195,
      mrpGeneric: 80,
      dose: "Cattle/Buffalo: 10-15 g (30 ml of 40% solution) Slow I/V or S/C for acute hypophosphatemia. Repeat after 12 hours.",
      route: "Slow I/V diluted or S/C",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन में सुरक्षित: फास्फोरस की कमी से होने वाले हीमोलिसिस (RBC टूटने) को रोकता है।",
      indications: "तीव्र हाइपोफॉस्फेटेमिया, ताजा ब्याही भैंस में कॉफी रंग का पेशाब (PPH), हड्डी चबाना (Pica रोग)।",
      withdrawal: "दूध: 0 दिन • मांस: 0 दिन",
      contraindications: "सीवियर रीनल सिंड्रोम।"
    },
    {
      id: "META_04",
      name: "Dextrose 20% / 50% Infusion (डेक्सट्रोज इन्फ्यूजन)",
      category: "METABOLIC",
      categoryNameHi: "मेटाबोलिक व खनिज इन्फ्यूजन",
      salt: "Dextrose Anhydrous 20% or 50% w/v Sterile Intravenous Infusion",
      ethicalBrand: "Dex-50 Vet (Denis / Albert David)",
      genericOption: "Dextrose 20%/50% 500ml Bottle (Generic)",
      mrpEthical: 110,
      mrpGeneric: 45,
      dose: "Cattle/Buffalo: 500 ml - 1000 ml Slow I/V warm infusion.",
      route: "Slow I/V Only (Never S/C - Causes severe tissue necrosis)",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन में सुरक्षित: तुरंत ग्लूकोज ऊर्जा प्रदान करता है।",
      indications: "कीटोसिस (Clinical Ketosis / Acetonemia), डिहाइड्रेशन, गंभीर कमजोरी, लिवर ग्लाइकोजन डिप्लीशन।",
      withdrawal: "दूध: 0 दिन • मांस: 0 दिन",
      contraindications: "सबक्यूटेनियस (S/C) रूट सख्त वर्जित, हाइपरग्लाइसीमिया।"
    },

    // -----------------------------------------------------------------------
    // CATEGORY 6: ANTHELMINTICS (कृमिनाशक)
    // -----------------------------------------------------------------------
    {
      id: "ANTH_01",
      name: "Ivermectin 1% (आइवरमेक्टिन)",
      category: "ANTHELMINTICS",
      categoryNameHi: "कृमि व बाह्य परजीवी नाशक",
      salt: "Ivermectin IP 10 mg/ml (1% w/v)",
      ethicalBrand: "Neomec (Intas) / Ivomec (Boehringer Ingelheim)",
      genericOption: "Ivermectin 1% Inj (Generic Vet)",
      mrpEthical: 210,
      mrpGeneric: 75,
      dose: "0.2 mg/kg body weight S/C only (1 ml per 50 kg body weight; 8-10 ml for 400-500kg cattle).",
      route: "Subcutaneous (S/C) Only in loose skin behind shoulder (Never IM/IV)",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन में सामान्यतः सुरक्षित (Safe in Pregnancy): अनुशंसित चिकित्सीय मात्रा (0.2 mg/kg) में सभी ट्राइमेस्टर में सुरक्षित है। हालांकि ब्याने के 28 दिन पहले दूध विथड्रॉल को ध्यान में रखें।",
      indications: "चिचड़ी, जूं, पिस्सू, मेंज (Sarcoptic/Psoroptic mange), पेट के गोलकृमि (Roundworms), फेफड़ों के कृमि (Lungworms)। आंतरिक व बाह्य परजीवियों का संपूर्ण खात्मा।",
      withdrawal: "दूध: दुधारू पशुओं में जिनका दूध मानव उपभोग हेतु हो, 28 दिन का अंतराल रखें • मांस: 28 दिन",
      contraindications: "आई.एम. या आई.वी. रूट सख्त वर्जित, कोली नस्ल के श्वानों में वर्जित।"
    },
    {
      id: "ANTH_02",
      name: "Albendazole (एल्बेंडाजोल)",
      category: "ANTHELMINTICS",
      categoryNameHi: "कृमि व फीताकृमि नाशक",
      salt: "Albendazole IP 25 mg/ml (or 2.5g / 3g Bolus)",
      ethicalBrand: "Valbazen (Zoetis) / Alben Oral (Virbac)",
      genericOption: "Albendazole 3g Bolus / Suspension (Generic)",
      mrpEthical: 95,
      mrpGeneric: 32,
      dose: "Nematodes/Cestodes: 5-7.5 mg/kg Oral (1 bolus 3g for 400kg cattle). Liver Flukes: 10 mg/kg (1.5 bolus 3g for 400kg).",
      route: "Oral Drench or Bolus",
      pregnancySafe: false,
      pregnancyDetails: "🚨 STRICT TERATOGENIC WARNING (प्रथम ट्राइमेस्टर में घातक): गाभिन पशुओं को गर्भधारण के प्रथम 45 दिनों (First Trimester / 1st 45 days) में एल्बेंडाजोल कदापि न दें! यह भ्रूण विकृति (Teratogenicity) और भ्रूण मृत्यु/गर्भपात कराता है।",
      indications: "पेट के कीड़े, टेपवर्म (फीताकृमि), यकृत पर्णकृमि (Fasciola hepatica - वयस्क फ्लूक)।",
      withdrawal: "दूध: 3 दिन • मांस: 14 दिन",
      contraindications: "गर्भावस्था की पहली तिमाही (First 45 days of gestation)."
    },
    {
      id: "ANTH_03",
      name: "Fenbendazole (फेनबेंडाजोल)",
      category: "ANTHELMINTICS",
      categoryNameHi: "कृमि व फीताकृमि नाशक",
      salt: "Fenbendazole IP 3 g Bolus (or 25% w/v Suspension)",
      ethicalBrand: "Panacur 3g (MSD Animal Health) / Fentas (Intas)",
      genericOption: "Fenbendazole 3g Bolus (Generic Vet)",
      mrpEthical: 120,
      mrpGeneric: 42,
      dose: "5-7.5 mg/kg Oral (1 bolus of 3g for 400-500 kg adult cattle/buffalo). For lungworms: 10 mg/kg.",
      route: "Oral Administration (Bolus / Liquid)",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन पशुओं के लिए 100% सुरक्षित (The Gold Standard Pregnancy Safe Dewormer): गर्भावस्था के किसी भी महीने (1 से 9 माह) में पूरी तरह निरापद। भ्रूण पर कोई दुष्प्रभाव नहीं।",
      indications: "सभी प्रकार के जठरांत्रिय गोलकृमि (Nematodes), फेफड़ों के कृमि (Dictyocaulus), फीताकृमि (Moniezia)। पशुपालकों की पहली पसंद।",
      withdrawal: "दूध: 0 से 1 दिन • मांस: 8 दिन",
      contraindications: "अतिसंवेदनशीलता (अत्यंत दुर्लभ)।"
    },
    {
      id: "ANTH_04",
      name: "Oxyclozanide + Levamisole (ऑक्सीक्लोज़ानाइड व लेवामिसोल)",
      category: "ANTHELMINTICS",
      categoryNameHi: "लिवर फ्लूक व गोलकृमि नाशक",
      salt: "Oxyclozanide IP 3% w/v + Levamisole HCl IP 1.5% w/v Suspension",
      ethicalBrand: "Nilzan (Virbac) / Levafas (Norbrook)",
      genericOption: "Oxyclo-Leva Suspension 1 Litre (Generic)",
      mrpEthical: 540,
      mrpGeneric: 220,
      dose: "Oxyclozanide 10 mg/kg + Levamisole 5 mg/kg Oral (Approx 15-20 ml per 50 kg body weight; 100-120 ml for 400kg cattle).",
      route: "Oral Drench",
      pregnancySafe: true,
      pregnancyDetails: "✅ गाभिन में सुरक्षित: निर्धारित चिकित्सीय खुराक में सुरक्षित है। लेवामिसोल से पशु में रोग प्रतिरोधक क्षमता (Immunomodulation) भी बढ़ती है। अत्यधिक ओवरडोज़िंग से बचें।",
      indications: "लिवर फ्लूक (Fascioliasis / यकृत पर्णकृमि), एम्फिस्टोमिएसिस (Amphistomosis / पेट के पेटू कृमि), फेफड़ों व पेट के गोलकृमि का एक साथ खात्मा।",
      withdrawal: "दूध: 3 दिन • मांस: 18 दिन",
      contraindications: "ऑर्गेनोफॉस्फेट कीटनाशक के संपर्क के 14 दिनों के भीतर न दें।"
    }
  ];

  // =========================================================================
  // 2. HELPER FUNCTIONS: OPD INTEGRATION, SEARCH & TABS
  // =========================================================================

  /**
   * Appends drug prescription directly to Digital OPD Pad (#opdMedicine)
   */
  window.appendRxToOpd = function (drugName, dose, route) {
    const rxField = document.getElementById('opdMedicine');
    if (!rxField) {
      alert(`Rx नोट: ${drugName} (${dose} - ${route})\n\nडिजिटल केस पर्ची (Digital OPD Pad) स्क्रीन पर खुली नहीं है।`);
      return;
    }
    const currentVal = rxField.value.trim();
    const entry = `• ${drugName}\n   डोज़: ${dose} | रूट: ${route}`;
    rxField.value = currentVal ? `${currentVal}\n${entry}` : entry;
    
    // Animate badge / Notify user
    alert(`✅ पर्ची में जोड़ा गया:\n${drugName}\n${dose}`);
    
    // If available, auto switch to Rx tab or focus field
    if (typeof window.switchTab === 'function') {
      window.switchTab('rx');
    }
  };

  /**
   * Quick filter by Category chip
   */
  window.filterDrugsByCategory = function (cat) {
    const searchInput = document.getElementById('medSearchInput');
    const searchVal = searchInput ? searchInput.value : '';
    const pregFilter = document.getElementById('medPregnancyFilter')?.value || 'ALL';
    window.renderMedicinesDirectory(cat, pregFilter, searchVal);
  };

  /**
   * Quick filter by Pregnancy Safety
   */
  window.filterDrugsByPregnancy = function (pregVal) {
    const activeCat = window._activeDrugCategory || 'ALL';
    const searchInput = document.getElementById('medSearchInput');
    const searchVal = searchInput ? searchInput.value : '';
    window.renderMedicinesDirectory(activeCat, pregVal, searchVal);
  };

  /**
   * Search input handler
   */
  window.handleMedSearchInput = function (val) {
    const activeCat = window._activeDrugCategory || 'ALL';
    const pregFilter = document.getElementById('medPregnancyFilter')?.value || 'ALL';
    window.renderMedicinesDirectory(activeCat, pregFilter, val);
  };

  // =========================================================================
  // 3. MAIN DIRECTORY RENDERER (RESPONSIVE, ETHICAL VS GENERIC, WARNINGS)
  // =========================================================================
  window.renderMedicinesDirectory = function (categoryFilter = 'ALL', typeFilter = 'ALL', searchKeyword = '') {
    const container = document.getElementById('inventoryContainer');
    if (!container) return;

    window._activeDrugCategory = categoryFilter;

    // Filter logic
    const keyword = (searchKeyword || '').trim().toLowerCase();
    const filteredDrugs = window.VETCARE_DRUGS_DB.filter(drug => {
      // 1. Category check
      if (categoryFilter !== 'ALL' && drug.category !== categoryFilter) {
        return false;
      }
      // 2. Pregnancy Safety check
      if (typeFilter === 'SAFE_ONLY' && !drug.pregnancySafe) {
        return false;
      }
      if (typeFilter === 'RISK_ONLY' && drug.pregnancySafe) {
        return false;
      }
      // 3. Search Keyword match
      if (keyword) {
        const matchString = `${drug.name} ${drug.salt} ${drug.ethicalBrand} ${drug.genericOption} ${drug.indications} ${drug.category}`.toLowerCase();
        if (!matchString.includes(keyword)) {
          return false;
        }
      }
      return true;
    });

    // Categories metadata for Pills
    const categoriesMeta = [
      { key: 'ALL', label: 'सभी दवाएं (All)' },
      { key: 'CORTICOSTEROIDS', label: 'कॉर्टिकोस्टेरॉयड' },
      { key: 'ANTIBIOTICS', label: 'एंटीबायोटिक' },
      { key: 'NSAIDS', label: 'दर्द व बुखार (NSAIDs)' },
      { key: 'ANTIPROTOZOALS', label: 'प्रोटोज़ोआ नाशक' },
      { key: 'METABOLIC', label: 'मेटाबोलिक व खनिज' },
      { key: 'ANTHELMINTICS', label: 'कृमिनाशक' }
    ];

    // Build HTML Output
    let html = `
      <div class="space-y-4">
        <!-- TOP TOOLBAR & CONTROLS -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3.5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 class="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <span>💊</span> वेटरनरी फार्माकोलॉजी एवं मेडिसिन डायरेक्टरी (2026 Production)
              </h2>
              <p class="text-[11px] text-slate-500 font-medium">5-स्तरीय क्लिनिकल ड्रग्स, एथिकल बनाम जेनेरिक मूल्य तुलना व गर्भावस्था सुरक्षा अलर्ट</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-bold text-slate-500">कुल औषधियां:</span>
              <span class="bg-blue-100 text-blue-800 text-xs font-black px-2.5 py-0.5 rounded-full">${filteredDrugs.length} / ${window.VETCARE_DRUGS_DB.length}</span>
            </div>
          </div>

          <!-- SEARCH INPUT & PREGNANCY FILTER DROPDOWN -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div class="sm:col-span-2 relative">
              <i class="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
              <input 
                id="medSearchInput"
                type="text" 
                value="${searchKeyword || ''}"
                oninput="window.handleMedSearchInput(this.value)"
                placeholder="दवा का नाम, साल्ट (Salt), ब्रांड (Dexona, Isoflud...) या रोग से खोजें..." 
                class="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <select 
                id="medPregnancyFilter"
                onchange="window.filterDrugsByPregnancy(this.value)"
                class="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 outline-none cursor-pointer focus:border-blue-500"
              >
                <option value="ALL" ${typeFilter === 'ALL' ? 'selected' : ''}>🍼 सभी गर्भावस्था स्थितियां</option>
                <option value="SAFE_ONLY" ${typeFilter === 'SAFE_ONLY' ? 'selected' : ''}>✅ केवल गाभिन सुरक्षित (Safe Only)</option>
                <option value="RISK_ONLY" ${typeFilter === 'RISK_ONLY' ? 'selected' : ''}>🚨 केवल गर्भपात जोखिम (Alerts Only)</option>
              </select>
            </div>
          </div>

          <!-- CATEGORY CHIPS SCROLLER -->
          <div class="flex gap-1.5 overflow-x-auto no-scrollbar pt-1">
            ${categoriesMeta.map(cat => {
              const isActive = (categoryFilter === cat.key);
              const activeClass = isActive 
                ? 'bg-blue-600 text-white font-black shadow-xs' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold';
              return `
                <button 
                  type="button" 
                  onclick="window.filterDrugsByCategory('${cat.key}')" 
                  class="shrink-0 px-3 py-1.5 rounded-xl text-xs transition ${activeClass}">
                  ${cat.label}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- DRUG CARDS GRID -->
        ${filteredDrugs.length === 0 ? `
          <div class="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-2">
            <span class="text-3xl">🔍</span>
            <p class="text-xs font-bold text-slate-700">कोई औषधि नहीं मिली!</p>
            <p class="text-[11px] text-slate-400">कृपया खोज शब्द बदलें अथवा फ़िल्टर रीसेट करें।</p>
            <button onclick="window.renderMedicinesDirectory('ALL', 'ALL', '')" class="mt-2 text-xs text-blue-600 underline font-bold">सभी दवाएं देखें</button>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            ${filteredDrugs.map(drug => {
              const savings = drug.mrpEthical - drug.mrpGeneric;
              const savingsPercent = Math.round((savings / drug.mrpEthical) * 100);

              return `
                <div class="bg-white border ${!drug.pregnancySafe ? 'border-rose-200 hover:border-rose-400' : 'border-slate-200 hover:border-emerald-300'} rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3 relative">
                  
                  <!-- CARD HEADER -->
                  <div class="space-y-1.5">
                    <div class="flex items-start justify-between gap-2">
                      <div>
                        <span class="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          drug.category === 'CORTICOSTEROIDS' ? 'bg-amber-100 text-amber-800' :
                          drug.category === 'ANTIBIOTICS' ? 'bg-indigo-100 text-indigo-800' :
                          drug.category === 'NSAIDS' ? 'bg-sky-100 text-sky-800' :
                          drug.category === 'ANTIPROTOZOALS' ? 'bg-purple-100 text-purple-800' :
                          drug.category === 'METABOLIC' ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'
                        }">
                          ${drug.categoryNameHi || drug.category}
                        </span>
                        <h3 class="text-xs sm:text-sm font-black text-slate-900 mt-1 leading-snug">
                          ${drug.name}
                        </h3>
                      </div>

                      <!-- PREGNANCY STATUS BADGE -->
                      <div>
                        ${drug.pregnancySafe ? `
                          <span class="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-lg shadow-2xs">
                            <i class="fa-solid fa-circle-check"></i> गाभिन में सुरक्षित
                          </span>
                        ` : `
                          <span class="inline-flex items-center gap-1 text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-300 px-2 py-0.5 rounded-lg shadow-2xs animate-pulse">
                            <i class="fa-solid fa-triangle-exclamation text-rose-600"></i> गर्भपात जोखिम!
                          </span>
                        `}
                      </div>
                    </div>

                    <!-- SALT & STRENGTH -->
                    <div class="p-2 bg-slate-50 border border-slate-100 rounded-xl">
                      <div class="text-[10px] font-bold text-slate-400 uppercase">साल्ट व क्षमता:</div>
                      <div class="text-[11px] font-mono font-bold text-slate-800">${drug.salt}</div>
                    </div>
                  </div>

                  <!-- PREGNANCY WARNING BOX (IF CONTRAINDICATED) -->
                  ${!drug.pregnancySafe ? `
                    <div class="p-2.5 bg-rose-50/70 border border-rose-200 rounded-2xl text-[11px] text-rose-900 space-y-1">
                      <div class="font-black flex items-center gap-1 text-rose-700">
                        <i class="fa-solid fa-ban"></i> <span>गर्भावस्था चेतावनी (Strict Clinical Alert):</span>
                      </div>
                      <p class="leading-relaxed font-medium">${drug.pregnancyDetails}</p>
                    </div>
                  ` : `
                    <div class="p-2 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-[10px] text-emerald-800">
                      <span class="font-bold">🍼 गाभिन सुरक्षा विवरण:</span> ${drug.pregnancyDetails}
                    </div>
                  `}

                  <!-- ETHICAL VS GENERIC PRICE COMPARISON BAR -->
                  <div class="bg-gradient-to-r from-slate-50 to-blue-50/40 border border-slate-200 rounded-2xl p-2.5 space-y-1.5">
                    <div class="text-[10px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>ब्रांड तुलना (Brand vs Generic)</span>
                      <span class="text-emerald-700 font-black">किसान बचत: ₹${savings} (${savingsPercent}%)</span>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-2 text-[11px]">
                      <div class="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                        <span class="text-[10px] text-slate-400 block">एथिकल ब्रांड (Ethical):</span>
                        <div class="font-bold text-slate-800 truncate" title="${drug.ethicalBrand}">${drug.ethicalBrand}</div>
                        <div class="text-blue-700 font-black mt-0.5">MRP: ₹${drug.mrpEthical}</div>
                      </div>

                      <div class="bg-white p-2 rounded-xl border border-emerald-200 shadow-2xs">
                        <span class="text-[10px] text-emerald-600 font-bold block">जेनेरिक विकल्प (Generic):</span>
                        <div class="font-bold text-slate-800 truncate" title="${drug.genericOption}">${drug.genericOption}</div>
                        <div class="text-emerald-700 font-black mt-0.5">MRP: ₹${drug.mrpGeneric}</div>
                      </div>
                    </div>
                  </div>

                  <!-- DOSAGE, ROUTE & INDICATIONS -->
                  <div class="space-y-1.5 text-xs text-slate-700">
                    <div class="flex items-start gap-1.5">
                      <span class="text-slate-400 font-bold shrink-0 text-[11px]">💉 खुराक/रूट:</span>
                      <span class="font-mono text-[11px] font-bold text-slate-800">${drug.dose} (${drug.route})</span>
                    </div>
                    <div class="flex items-start gap-1.5">
                      <span class="text-slate-400 font-bold shrink-0 text-[11px]">🎯 उपयोग:</span>
                      <span class="text-[11px] text-slate-600 font-medium">${drug.indications}</span>
                    </div>
                    <div class="flex items-start gap-1.5 text-[10px] text-slate-500">
                      <span class="font-bold shrink-0">⏱️ विथड्रॉल काल:</span>
                      <span>${drug.withdrawal}</span>
                    </div>
                  </div>

                  <!-- ACTION BUTTONS -->
                  <div class="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button 
                      type="button" 
                      onclick="window.appendRxToOpd('${drug.name.replace(/'/g, "\\'")}', '${drug.dose.replace(/'/g, "\\'")}', '${drug.route.replace(/'/g, "\\'")}')" 
                      class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-2xs active:scale-98">
                      <i class="fa-solid fa-file-prescription"></i> <span>पर्ची में जोड़ें (Add to OPD)</span>
                    </button>
                  </div>

                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;

    container.innerHTML = html;
  };

  // =========================================================================
  // 4. AUTO-INITIALIZATION & TAB HOOK
  // =========================================================================
  window.initMedicinesDirectory = function () {
    const container = document.getElementById('inventoryContainer');
    if (container) {
      window.renderMedicinesDirectory('ALL', 'ALL', '');
    }
  };

  // Safely hook into DOMContentLoaded or execute immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initMedicinesDirectory);
  } else {
    window.initMedicinesDirectory();
  }

})();
