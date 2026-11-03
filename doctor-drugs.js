// Vetcare AI OS - Restored Veterinary Pharmacology & Drug Substitutes Suite (2026 Production)

/**
 * ============================================================================
 * VETCARE AI OS — RESTORED MASTER VETERINARY PHARMACOPEIA & SUBSTITUTES SUITE
 * ============================================================================
 * Comprehensive 37+ drug clinical database covering Antibiotics, NSAIDs, Hormones,
 * Antiprotozoals, Anthelmintics, and Metabolic Tonics with side-by-side Ethical vs.
 * Generic pricing, Pregnancy Red Alerts, withdrawal periods, and 1-Click Rx Pad integration.
 */

(function () {
  'use strict';

  // 1. MASTER VETERINARY PHARMACOLOGY DATABASE (37+ EXHAUSTIVE CLINICAL FORMULATIONS)
  window.VETCARE_DRUGS_DB = [
    // ------------------------------------------------------------------------
    // SECTION A: ANTIBIOTICS & ANTIMICROBIALS (10 DRUGS)
    // ------------------------------------------------------------------------
    {
      id: "DRUG_01",
      name: "Ceftiofur Sodium 1g",
      category: "एंटीबायोटिक (Antibiotic)",
      salt: "Ceftiofur Sodium Sterile Powder 1g (3rd Gen Cephalosporin)",
      indications: "गलघोंटू (HS), तीव्र निमोनिया (BRD), पायोमेट्रा (गर्भाशय मवाद), एक्यूट थनैला (Coliform Mastitis), प्यूट्रीड फूट रॉट",
      standardDose: "1.1 - 2.2 mg/kg शरीर भार (10-20 ml प्रति 400kg गोजातीय पशु, प्रतिदिन 3-5 दिन)",
      route: "IM / SC (केवल गहरे मांस अथवा चमड़ी के नीचे)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 0 दिन (शून्य विथड्रॉल), मांस: 4 दिन",
      ethicalOption: { brandName: "Xyrofur 1g (Alembic) / Intacef 1g (Intas)", mrp: 485 },
      genericOption: { brandName: "Ceftiofur Sodium Vet 1g (Generic Pharma)", mrp: 210 },
      substitutes: ["Cefquinome 1g", "Amoxicillin-Sulbactam 4.5g", "Enrofloxacin 10%"]
    },
    {
      id: "DRUG_02",
      name: "Enrofloxacin 10% Inj",
      category: "एंटीबायोटिक (Antibiotic)",
      salt: "Enrofloxacin 100 mg/ml (Fluoroquinolone)",
      indications: "गंभीर ब्रोंको-निमोनिया, एंटराइटिस (डायरिया), कोलीबेसिलोसिस, एक्यूट मेट्राइटिस, यूरिनरी ट्रैक्ट इन्फेक्शन",
      standardDose: "5 mg/kg शरीर भार (15-20 ml प्रति 400kg पशु, 24 घंटे के अंतराल पर)",
      route: "IM / SC / धीमा IV (Slow IV)",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: 84 घंटे (7 दुहान), मांस: 14 दिन",
      ethicalOption: { brandName: "Floxidin 10% (MSD) / Bayrocin 10% (Bayer)", mrp: 165 },
      genericOption: { brandName: "Enrovet 10% Inj (Generic Vet)", mrp: 65 },
      substitutes: ["Marbofloxacin 10%", "Ciprofloxacin Vet", "Levofloxacin"]
    },
    {
      id: "DRUG_03",
      name: "Amoxicillin & Sulbactam 4.5g",
      category: "एंटीबायोटिक (Antibiotic)",
      salt: "Amoxicillin Sodium 3000 mg + Sulbactam Sodium 1500 mg Sterile Powder",
      indications: "क्लीनिकल मेस्टाइटिस, मेट्राइटिस, निमोनिया, पोस्ट-ऑपरेटिव घाव, एचएस व सेकेंडरी बैक्टीरियल संक्रमण",
      standardDose: "7 - 10 mg/kg शरीर भार (4.5g वायल प्रति 400-500kg वयस्क पशु)",
      route: "IM / IV (केवल स्टराइल वाटर में घोलकर)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 60 घंटे (5 दुहान), मांस: 10 दिन",
      ethicalOption: { brandName: "Amoxirum Forte 4.5g (Virbac)", mrp: 495 },
      genericOption: { brandName: "Amoxi-Sulb Vet 4.5g (Generic Bulk)", mrp: 230 },
      substitutes: ["Ceftiofur Sodium 1g", "Ampicillin-Cloxacillin 4g", "Cefotaxime 3g"]
    },
    {
      id: "DRUG_04",
      name: "Oxytetracycline 200 mg/ml (LA)",
      category: "एंटीबायोटिक (Antibiotic)",
      salt: "Oxytetracycline Dihydrate Long Acting 200 mg/ml",
      indications: "एंथ्रेक्स, लंगड़ा बुखार (BQ), एनाप्लाज्मोसिस, लेप्टोस्पायरोसिस, गलाघोंटू, घाव व पाद सड़न",
      standardDose: "20 mg/kg शरीर भार (1 ml प्रति 10kg भार, 20 ml प्रति 200kg, 72 घंटे तक प्रभावी)",
      route: "Deep IM (गहरे मांस में एक जगह 10-15 ml से ज्यादा न लगाएं)",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: 7 दिन (14 दुहान), मांस: 21 दिन",
      ethicalOption: { brandName: "Terramycin LA (Zoetis) / Oxysteclin LA (Zydus)", mrp: 195 },
      genericOption: { brandName: "Oxytetracycline LA 200 Vet (Generic)", mrp: 85 },
      substitutes: ["Chlortetracycline", "Doxycycline Vet", "Ceftiofur LA"]
    },
    {
      id: "DRUG_05",
      name: "Cefquinome Sulphate 2.5%",
      category: "एंटीबायोटिक (Antibiotic)",
      salt: "Cefquinome Sulphate 25 mg/ml (4th Gen Cephalosporin Suspension)",
      indications: "अति-गंभीर व बिगड़ा हुआ थनैला (E. coli / Klebsiella), श्वास नली संक्रमण, इंटरडिजिटल नेक्रोबैसिलोसिस",
      standardDose: "1 mg/kg शरीर भार (2 ml प्रति 50kg शरीर भार, 16 ml प्रति 400kg)",
      route: "Intramuscular (गहरे मांस में, 3 दिन)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 24 घंटे (2 दुहान), मांस: 5 दिन",
      ethicalOption: { brandName: "Cobactan 2.5% (MSD Animal Health)", mrp: 620 },
      genericOption: { brandName: "Cefquinome 2.5% Vet (Generic Care)", mrp: 310 },
      substitutes: ["Ceftiofur Sodium 1g", "Marbofloxacin 10%", "Cefoperazone 3g"]
    },
    {
      id: "DRUG_06",
      name: "Marbofloxacin 10% Inj",
      category: "एंटीबायोटिक (Antibiotic)",
      salt: "Marbofloxacin 100 mg/ml (3rd Gen Fluoroquinolone)",
      indications: "एक्यूट एंटेराइटिस, गंभीर मैस्टाइटिस-मेट्राइटिस सिंड्रोम, निमोनिया व फेफड़ों के जीर्ण संक्रमण",
      standardDose: "2 mg/kg प्रतिदिन IM (8 ml प्रति 400kg) अथवा 8 mg/kg सिंगल डोज़ SC",
      route: "IM / SC / IV",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 36 घंटे (Single Dose) / 48 घंटे, मांस: 4 दिन",
      ethicalOption: { brandName: "Marbocyl 10% (Vetoquinol) / Forcyl (Vetoquinol)", mrp: 590 },
      genericOption: { brandName: "Marboflox 10% Vet (Generic Pharma)", mrp: 280 },
      substitutes: ["Enrofloxacin 10%", "Cefquinome 2.5%", "Levofloxacin 10%"]
    },
    {
      id: "DRUG_07",
      name: "Procaine Penicillin + Streptomycin 2.5g",
      category: "एंटीबायोटिक (Antibiotic)",
      salt: "Procaine Penicillin G 15 Lac IU + Streptomycin Sulphate 2.5g",
      indications: "लंगड़ा बुखार (Black Quarter), गलाघोंटू, मवाद भरे घाव, एक्टिनोमाइकोसिस (लकड़ी जैसी जीभ), सर्जरी बाद सुरक्षा",
      standardDose: "1 वायल (2.5g) प्रति 300-400kg पशु 24 घंटे के अंतराल पर 3-4 दिन",
      route: "Deep IM (गहरे मांस में केवल, IV सख्त वर्जित)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 72 घंटे, मांस: 14 दिन",
      ethicalOption: { brandName: "Dicrysticin-S 2.5g (Zydus) / Bistrepen (Cadila)", mrp: 110 },
      genericOption: { brandName: "Peni-Strep Vet 2.5g (Generic)", mrp: 48 },
      substitutes: ["Amoxicillin 3g", "Benzathine Penicillin", "Ampicillin Sodium"]
    },
    {
      id: "DRUG_08",
      name: "Gentamicin Sulphate 10% Inj",
      category: "एंटीबायोटिक (Antibiotic)",
      salt: "Gentamicin Sulphate equivalent to Gentamicin base 100 mg/ml",
      indications: "ई-कोलाई एंटराइटिस, गर्भाशय शोथ (Intrauterine wash), नवजात बछड़ों में दस्त, यूरोजिनाइटल इन्फेक्शन",
      standardDose: "4 mg/kg शरीर भार (15-18 ml प्रति 400kg पशु दिन में एक बार, अधिकतम 3 दिन)",
      route: "Slow IV / Deep IM / Intrauterine",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: 7 दिन, मांस: 28 दिन (किडनी विषाक्तता जोखिम)",
      ethicalOption: { brandName: "Genticyn Vet (Piramal) / Gentabac 10% (Zydus)", mrp: 90 },
      genericOption: { brandName: "Gentamicin 10% Vet (Generic Line)", mrp: 38 },
      substitutes: ["Amikacin 250mg", "Tobramycin", "Neomycin Sulphate"]
    },
    {
      id: "DRUG_09",
      name: "Sulfadiazine + Trimethoprim Inj",
      category: "एंटीबायोटिक (Antibiotic)",
      salt: "Sulfadiazine 200 mg + Trimethoprim 40 mg/ml (Potentiated Sulfa)",
      indications: "कोक्सीडियोसिस, टॉन्सिलाइटिस, बछड़ों का निमोनिया, आंतों में खून आना (खूनी दस्त), जननांग इन्फेक्शन",
      standardDose: "15-24 mg/kg कुल साल्ट (15-20 ml प्रति 300kg शरीर भार)",
      route: "Slow IV / Deep IM (मांस में दर्द निवारक के साथ दें)",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: 96 घंटे (8 दुहान), मांस: 12 दिन",
      ethicalOption: { brandName: "Biotrim Inj (Virbac) / Sulfaprim (Zydus)", mrp: 150 },
      genericOption: { brandName: "Sulfa-Trim Vet Inj (Generic Pharma)", mrp: 62 },
      substitutes: ["Sulfadimethoxine", "Metronidazole IV", "Enrofloxacin 10%"]
    },
    {
      id: "DRUG_10",
      name: "Tylosin Tartrate 20% Inj",
      category: "एंटीबायोटिक (Antibiotic)",
      salt: "Tylosin Base 200 mg/ml (Macrolide Antibiotic)",
      indications: "माइकोप्लाज्मा निमोनia (CBPP), सांस की घुरघुराहट, संक्रामक गठिया (Infectious Polyarthritis), फुट रॉट",
      standardDose: "10 mg/kg शरीर भार (10 ml प्रति 200kg शरीर भार, 3 से 5 दिन)",
      route: "Deep IM (इंट्रामस्कुलर)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 96 घंटे, मांस: 14 दिन",
      ethicalOption: { brandName: "Tylovet 20% (Elanco) / Tylosin Inj (Vetindia)", mrp: 275 },
      genericOption: { brandName: "Tylosin 200 Vet (Generic Core)", mrp: 125 },
      substitutes: ["Tilmicosin 300", "Tulathromycin (Draxxin)", "Spiramycin"]
    },

    // ------------------------------------------------------------------------
    // SECTION B: NSAIDS & ANTI-INFLAMMATORY ANALGESICS (6 DRUGS)
    // ------------------------------------------------------------------------
    {
      id: "DRUG_11",
      name: "Meloxicam + Paracetamol Inj",
      category: "दर्द व सूजन निवारक (NSAID)",
      salt: "Meloxicam 5 mg + Paracetamol 150 mg/ml",
      indications: "तीव्र बुखार (104-106°F), थनैला की सूजन, लंगड़ापन, चोट, सर्जरी के बाद दर्द निवारण, रूमैटिक आर्थराइटिस",
      standardDose: "0.5 mg/kg मेलोक्सीकैम (15-20 ml प्रति 400kg गोजातीय पशु)",
      route: "Deep IM (गहरे मांस में)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 5 दिन, मांस: 15 दिन",
      ethicalOption: { brandName: "Melonex Plus (Intas) / Zobid-M (Zydus)", mrp: 145 },
      genericOption: { brandName: "Melo-Para Vet Inj (Generic Line)", mrp: 58 },
      substitutes: ["Tolfenamic Acid", "Ketoprofen 10%", "Flunixin Meglumine"]
    },
    {
      id: "DRUG_12",
      name: "Flunixin Meglumine 50 mg/ml",
      category: "दर्द व सूजन निवारक (NSAID)",
      salt: "Flunixin Meglumine equivalent to Flunixin 50 mg/ml",
      indications: "विषाक्त एंडोटॉक्सिक शॉक, कोलिक (पेट दर्द), अति-तीव्र एक्यूट थनैला, निमोनिया में फेफड़ों की सूजन, डाउनर काउ",
      standardDose: "1.1 - 2.2 mg/kg शरीर भार (1-2 ml प्रति 45kg भार, 10-15 ml प्रति 400kg)",
      route: "Slow IV (सर्वश्रेष्ठ) / Deep IM",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: 36 घंटे, मांस: 4 दिन",
      ethicalOption: { brandName: "Megludyne (Virbac) / Finadyne (MSD)", mrp: 295 },
      genericOption: { brandName: "Flunixin Vet Inj (Generic Pharma)", mrp: 135 },
      substitutes: ["Meloxicam 5mg", "Ketoprofen", "Tolfenamic Acid"]
    },
    {
      id: "DRUG_13",
      name: "Tolfenamic Acid 4% Inj",
      category: "दर्द व सूजन निवारक (NSAID)",
      salt: "Tolfenamic Acid 40 mg/ml",
      indications: "कठोर अडर सूजन (Caked Udder), एक्यूट रेस्पिरेटरी डिस्ट्रेस, जोड़ों में सूजन, लैमिनाइटिस (खुर दर्द)",
      standardDose: "2 mg/kg शरीर भार (1 ml प्रति 20kg भार, 20 ml प्रति 400kg, 48 घंटे में एक बार)",
      route: "IM / IV (धीमा)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 24 घंटे (2 दुहान), मांस: 7 दिन",
      ethicalOption: { brandName: "Maxxtol 4% (Intas) / Tolfedine (Vetoquinol)", mrp: 330 },
      genericOption: { brandName: "Tolfa-Vet 4% (Generic Core)", mrp: 155 },
      substitutes: ["Meloxicam Plus", "Flunixin Meglumine", "Carprofen"]
    },
    {
      id: "DRUG_14",
      name: "Ketoprofen 10% Inj",
      category: "दर्द व सूजन निवारक (NSAID)",
      salt: "Ketoprofen 100 mg/ml",
      indications: "पोस्ट-पार्टम सूजन (ब्याने के तुरंत बाद), डाउनर काउ सिंड्रोम, मस्कुलोस्केलेटल दर्द, ट्रौमैटिक इंजरी",
      standardDose: "3 mg/kg शरीर भार (3 ml प्रति 100kg भार, 12 ml प्रति 400kg)",
      route: "Slow IV / Deep IM",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 0 दिन (शून्य दुग्ध विथड्रॉल), मांस: 4 दिन",
      ethicalOption: { brandName: "Neoprofen 10% (Intas) / Ketovet (Alivira)", mrp: 185 },
      genericOption: { brandName: "Ketoprofen Vet 10% (Generic Pharma)", mrp: 82 },
      substitutes: ["Melonex Plus", "Maxxtol", "Phenylbutazone"]
    },
    {
      id: "DRUG_15",
      name: "Phenylbutazone + Sodium Salicylate",
      category: "दर्द व सूजन निवारक (NSAID)",
      salt: "Phenylbutazone 200 mg + Sodium Salicylate 50 mg/ml",
      indications: "हड्डी में मोच, पुराना आर्थराइटिस, रूमैटिक मायोसाइटिस, टेंडन इन्फेक्शन, घोड़ों व बैलों में लंगड़ापन",
      standardDose: "4.4 mg/kg भार (15-20 ml प्रति वयस्क पशु)",
      route: "Slow IV ONLY (इंट्रामस्कुलर देने पर नेक्रोसिस हो सकती है)",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: गैर-दुधारू में उपयोग, मांस: 21 दिन",
      ethicalOption: { brandName: "Artizone-S (Zydus) / Phenalgine (Vetcare)", mrp: 135 },
      genericOption: { brandName: "Buta-Sal Vet (Generic Line)", mrp: 55 },
      substitutes: ["Meloxicam 5mg", "Ketoprofen 10%", "Flunixin"]
    },
    {
      id: "DRUG_16",
      name: "Isoflupredone Acetate 2 mg/ml",
      category: "दर्द व सूजन निवारक (NSAID)",
      salt: "Isoflupredone Acetate 2 mg/ml (Steroidal Anti-Inflammatory)",
      indications: "गंभीर कीटोसिस, एनाफाइलेक्टिक शॉक (दवा रिएक्शन), अति-तीव्र अडर एडिमा, नसों का पक्षाघात",
      standardDose: "10-20 mg प्रति वयस्क पशु (5-10 ml प्रति गाय/भैंस)",
      route: "Deep IM / Intra-articular",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: 72 घंटे, मांस: 7 दिन",
      ethicalOption: { brandName: "Predef 2X (Zoetis) / Isoflud (Zydus)", mrp: 245 },
      genericOption: { brandName: "Isoflupredone Vet (Generic)", mrp: 110 },
      substitutes: ["Dexamethasone Sodium", "Prednisolone Acetate", "Triamcinolone"]
    },

    // ------------------------------------------------------------------------
    // SECTION C: HORMONES & REPRODUCTIVE REGULATORS (6 DRUGS)
    // ------------------------------------------------------------------------
    {
      id: "DRUG_17",
      name: "Buserelin Acetate (GnRH Analog)",
      category: "प्रजनन व हार्मोन्स (Hormones)",
      salt: "Buserelin Acetate 0.0042 mg/ml (equivalent to 0.004 mg Buserelin)",
      indications: "सिस्टिक ओवरी (फॉलिकुलर सिस्ट), ओवुलेशन में देरी (Delayed Ovulation), AI के समय गर्भाधान दर (Conception Rate) बढ़ाना",
      standardDose: "2.5 ml - 5.0 ml (10-20 mcg) प्रति गोजातीय पशु AI के समय",
      route: "Intramuscular (IM)",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
      ethicalOption: { brandName: "Receptal (MSD) / Gyro-GnRH (Virbac)", mrp: 450 },
      genericOption: { brandName: "Buserelin Vet 0.004% (Generic Hormones)", mrp: 220 },
      substitutes: ["Lecirelin Acetate (Dalmarelin)", "Gonadorelin (Fertagyl)"]
    },
    {
      id: "DRUG_18",
      name: "Cloprostenol Sodium 250 mcg/ml",
      category: "प्रजनन व हार्मोन्स (Hormones)",
      salt: "Cloprostenol Sodium equivalent to Cloprostenol 250 mcg/ml (PGF2α)",
      indications: "पायोमेट्रा (मवाद निष्कासन), ल्यूटियल सिस्ट, मद चक्र सिंक्रोनाइजेशन, ममीफाइड भ्रूण निष्कासन, डिलेड हीट",
      standardDose: "2 ml (500 mcg) प्रति वयस्क गाय/भैंस (एकल डोज़)",
      route: "Intramuscular ONLY (गहरे मांस में)",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: 24 घंटे, मांस: 1 दिन",
      ethicalOption: { brandName: "Vetmate (Vetcare) / Lutalyse (Zoetis) / Pragma", mrp: 215 },
      genericOption: { brandName: "Cloprostenol Vet 2ml (Generic Line)", mrp: 98 },
      substitutes: ["Dinoprost Tromethamine", "Luprostiol (Prosolvin)"]
    },
    {
      id: "DRUG_19",
      name: "Hydroxyprogesterone Caproate 750mg",
      category: "प्रजनन व हार्मोन्स (Hormones)",
      salt: "Hydroxyprogesterone Caproate 250 mg/ml (3 ml Vial = 750 mg)",
      indications: "गर्भपात की रोकथाम (Threatened/Habitual Abortion), बार-बार फिरने वाली गायों में भ्रूण सुरक्षा (Embryo Survival), प्रोलैप्स रोकथाम",
      standardDose: "3 ml (750 mg) प्रति पशु, गर्भाधान के 45वें व 90वें दिन या गर्भपात के लक्षण दिखने पर",
      route: "Deep IM ONLY (गहरे मांस में)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 0 दिन, मांस: 60 दिन",
      ethicalOption: { brandName: "Duraprogen 750 (Vetcare) / Proluton Vet (Zydus)", mrp: 385 },
      genericOption: { brandName: "HPC Vet 750mg Inj (Generic Care)", mrp: 165 },
      substitutes: ["Progesterone Depo", "Medroxyprogesterone Acetate"]
    },
    {
      id: "DRUG_20",
      name: "PMSG / eCG 1000 IU",
      category: "प्रजनन व हार्मोन्स (Hormones)",
      salt: "Equine Chorionic Gonadotrophin (eCG / PMSG) 1000 IU Sterile Lyophilized",
      indications: "सच्चा अनएस्ट्रस (True Anestrus - शांत व निष्क्रिय अंडाशय), हीट इंडक्शन, सुपरओवुलेशन (ETR)",
      standardDose: "500 - 1000 IU प्रति पशु (ल्यूटियोलाइटिक उपचार के 48 घंटे बाद)",
      route: "Intramuscular (IM) / Subcutaneous (SC)",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
      ethicalOption: { brandName: "Folligon 1000 IU (MSD Animal Health)", mrp: 1180 },
      genericOption: { brandName: "eCG Vet 1000 IU (Generic Biotech)", mrp: 560 },
      substitutes: ["FSH Purified (Folltropin)", "Buserelin + Cloprostenol Regimen"]
    },
    {
      id: "DRUG_21",
      name: "Methylergometrine Maleate Inj",
      category: "प्रजनन व हार्मोन्स (Hormones)",
      salt: "Methylergometrine Maleate 0.2 mg/ml",
      indications: "जेर रुकना (Retention of Placenta - ROP), गर्भाशय से ब्लीडिंग, ब्याने के बाद गर्भाशय संकुचन व इनवोल्यूशन",
      standardDose: "5 - 10 ml प्रति वयस्क गाय/भैंस ब्याने के तुरंत बाद",
      route: "IM / SC (IV सावधानीपूर्वक)",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: 24 घंटे, मांस: 3 दिन",
      ethicalOption: { brandName: "Methergine Vet (Novartis) / Uterotone Inj", mrp: 125 },
      genericOption: { brandName: "Methylergo Vet Inj (Generic Line)", mrp: 52 },
      substitutes: ["Oxytocin Synthetic", "Valethamate Bromide", "PGF2α"]
    },
    {
      id: "DRUG_22",
      name: "Oxytocin Synthetic 10 IU/ml",
      category: "प्रजनन व हार्मोन्स (Hormones)",
      salt: "Oxytocin Synthetic 10 IU/ml",
      indications: "डिस्टोकिया में यूटेराइन इनर्शिया (प्रसव पीड़ा न उठना), पूर्ण गर्भाशय ग्रीवा खुलने पर प्रसव सहायता, मवाद निष्कासन",
      standardDose: "20 - 40 IU (2 - 4 ml) प्रति पशु (केवल आवश्यकतानुसार)",
      route: "Slow IV (Saline में) / Deep IM",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
      ethicalOption: { brandName: "Pitocin Vet (Pfizer) / Syntocinon Vet", mrp: 68 },
      genericOption: { brandName: "Oxytocin 10 IU Vet (Generic Govt/Bulk)", mrp: 26 },
      substitutes: ["Methylergometrine", "Carbetocin", "Cloprostenol"]
    },

    // ------------------------------------------------------------------------
    // SECTION D: ANTIPROTOZOALS & BLOOD PARASITICIDES (5 DRUGS)
    // ------------------------------------------------------------------------
    {
      id: "DRUG_23",
      name: "Diminazene Aceturate + Phenazone",
      category: "प्रोटोजोआ व रक्त परजीवी (Antiprotozoal)",
      salt: "Diminazene Aceturate 70 mg + Phenazone 375 mg per gram (Granules / Inj)",
      indications: "बबेसिओसिस (लाल पेशाब / Babesia bigemina), ट्रिपैनोसोमियासिस (सर्रा रोग), अत्यधिक तेज बुखार व रक्ताल्पता",
      standardDose: "3.5 mg/kg डिमिनाजीन (10 ml प्रति 200kg, 20-30 ml प्रति 400kg 7% घोल)",
      route: "Deep IM ONLY (गहरे मांस में)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 7 दिन (14 दुहान), मांस: 21 दिन",
      ethicalOption: { brandName: "Berenil RTU (MSD) / Diminasan (Zydus)", mrp: 180 },
      genericOption: { brandName: "Diminazene Vet 20ml (Generic Pharma)", mrp: 78 },
      substitutes: ["Imidocarb Dipropionate", "Quinapyramine Sulfate"]
    },
    {
      id: "DRUG_24",
      name: "Buparvaquone 50 mg/ml",
      category: "प्रोटोजोआ व रक्त परजीवी (Antiprotozoal)",
      salt: "Buparvaquone 50 mg/ml (Second Gen Hydroxynaphthoquinone)",
      indications: "थाइलेरियासिस (Theileriosis - गलसुआ गांठों में सूजन, कॉर्नियल ओपेसिटी, 106°F बुखार, सांस फूलना)",
      standardDose: "2.5 mg/kg शरीर भार (1 ml प्रति 20kg भार, 20 ml प्रति 400kg पशु, गर्दन के मांस में)",
      route: "Deep IM in Neck ONLY (गर्दन की मांसपेशियों में)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 48 घंटे, मांस: 42 दिन",
      ethicalOption: { brandName: "Butalex (MSD) / Zubion (Intas)", mrp: 1480 },
      genericOption: { brandName: "Buparvaquone Vet 20ml (Generic Core)", mrp: 690 },
      substitutes: ["Oxytetracycline LA (Supportive)", "Halofuginone Lactate"]
    },
    {
      id: "DRUG_25",
      name: "Isometamidium Chloride 125mg / 1g",
      category: "प्रोटोजोआ व रक्त परजीवी (Antiprotozoal)",
      salt: "Isometamidium Chloride Hydrochloride Powder",
      indications: "ट्रिपैनोसोमियासिस (सर्रा) का निवारण व 3-6 माह की दीर्घकालीन रासायनिक रोकथाम (Prophylaxis)",
      standardDose: "0.5 - 1.0 mg/kg शरीर भार (1% ताजा घोल बनाकर)",
      route: "Deep IM (गहरे मांस में, बिना गिरे)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 3 दिन, मांस: 30 दिन",
      ethicalOption: { brandName: "Trypamidium (Merial/Boehringer) / Samorin", mrp: 320 },
      genericOption: { brandName: "Isometa Vet Powder (Generic Line)", mrp: 145 },
      substitutes: ["Quinapyramine Sulfate & Chloride", "Diminazene Aceturate"]
    },
    {
      id: "DRUG_26",
      name: "Imidocarb Dipropionate 120 mg/ml",
      category: "प्रोटोजोआ व रक्त परजीवी (Antiprotozoal)",
      salt: "Imidocarb Dipropionate 120 mg/ml",
      indications: "एनाप्लाज्मोसिस (Anaplasmosis), बबेसिओसिस, एर्लिचियोसिस व मिश्रित हीमोप्रोटोजोअन संक्रमण",
      standardDose: "1.2 mg/kg बबेसियोसिस हेतु; 3.0 mg/kg एनाप्लाज्मा हेतु (2.5 ml प्रति 100kg SC)",
      route: "Subcutaneous (SC) / Deep IM",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 28 दिन, मांस: 213 दिन",
      ethicalOption: { brandName: "Imizol (Intervet / MSD)", mrp: 510 },
      genericOption: { brandName: "Imidocarb Vet 10ml (Generic Biotech)", mrp: 245 },
      substitutes: ["Diminazene Aceturate", "Oxytetracycline LA"]
    },
    {
      id: "DRUG_27",
      name: "Quinapyramine Sulfate & Chloride",
      category: "प्रोटोजोआ व रक्त परजीवी (Antiprotozoal)",
      salt: "Quinapyramine Sulfate 1.5g + Quinapyramine Chloride 1.0g per 2.5g Vial",
      indications: "सर्रा (Surra / Trypanosomiasis evansi) का उपचारात्मक व 6 माह तक रोगनिरोधी सुरक्षात्मक प्रबंधन",
      standardDose: "4.4 mg/kg शरीर भार (15 ml स्टराइल पानी में 2.5g वायल घोलकर SC लगाएं)",
      route: "Subcutaneous ONLY (केवल त्वचा के नीचे)",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: गैर-दुधारू में अनुशंसित, मांस: 60 दिन",
      ethicalOption: { brandName: "Triquin (Intas) / Antrycide Prosalt", mrp: 290 },
      genericOption: { brandName: "Quina-Surra Vet 2.5g (Generic Pharma)", mrp: 135 },
      substitutes: ["Isometamidium Chloride", "Diminazene Aceturate"]
    },

    // ------------------------------------------------------------------------
    // SECTION E: ANTHELMINTICS & ECTOPARASITICIDES (5 DRUGS)
    // ------------------------------------------------------------------------
    {
      id: "DRUG_28",
      name: "Ivermectin 1% w/v Inj",
      category: "कृमिनाशक व परजीवी (Anthelmintic)",
      salt: "Ivermectin IP (Vet) 10 mg/ml (1%)",
      indications: "जूँ, चिंचड़ (Ticks), पपड़ीदार खाज (Mange), पेट के गोलकृमि (Nematodes), आंखों का कीड़ा (Thelazia)",
      standardDose: "0.2 mg/kg शरीर भार (1 ml प्रति 50kg भार, 8-10 ml प्रति 450kg)",
      route: "Subcutaneous ONLY (गर्दन की ढीली त्वचा के नीचे)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 28 दिन, मांस: 28 दिन",
      ethicalOption: { brandName: "Hitek 1% (Virbac) / Neomec (Intas)", mrp: 185 },
      genericOption: { brandName: "Iver-Vet 1% 10ml (Generic Bulk)", mrp: 72 },
      substitutes: ["Doramectin 1%", "Ivermectin 3.15% LA", "Moxidectin"]
    },
    {
      id: "DRUG_29",
      name: "Doramectin 10 mg/ml Inj",
      category: "कृमिनाशक व परजीवी (Anthelmintic)",
      salt: "Doramectin 1% w/v",
      indications: "दीर्घकालीन चिंचड़ व जू नियंत्रण, आंतरिक गोलकृमि, खाज (Psoroptic & Sarcoptic Mange)",
      standardDose: "0.2 mg/kg शरीर भार (1 ml प्रति 50kg शरीर भार)",
      route: "SC / IM (त्वचा के नीचे या मांस में)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: गैर-दुधारू में प्रयुक्त, मांस: 35 दिन",
      ethicalOption: { brandName: "Dectomax 1% (Zoetis)", mrp: 430 },
      genericOption: { brandName: "Doramec Vet 1% (Generic Line)", mrp: 198 },
      substitutes: ["Ivermectin 1%", "Eprinomectin", "Closantel"]
    },
    {
      id: "DRUG_30",
      name: "Closantel Sodium 15% Oral / Inj",
      category: "कृमिनाशक व परजीवी (Anthelmintic)",
      salt: "Closantel Sodium Dihydrate 15% w/v",
      indications: "लीवर फ्लूक (Fasciola gigantica), हीमोंकस (Barber Pole Worm), नेजल बॉट्स (Oestrus ovis), चिंचड़ मुक्ति",
      standardDose: "10-15 mg/kg भार (1 ml प्रति 15kg मौखिक / 1 ml प्रति 30kg चमड़ी नीचे)",
      route: "Oral drench अथवा Subcutaneous (SC)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 28 दिन, मांस: 28 दिन",
      ethicalOption: { brandName: "Closiver 15% (Vetcare) / Flukex (Zydus)", mrp: 295 },
      genericOption: { brandName: "Closantel 15% Vet (Generic Pharma)", mrp: 138 },
      substitutes: ["Oxyclozanide", "Triclabendazole", "Rafoxanide"]
    },
    {
      id: "DRUG_31",
      name: "Albendazole + Ivermectin Susp",
      category: "कृमिनाशक व परजीवी (Anthelmintic)",
      salt: "Albendazole 25 mg + Ivermectin 1 mg per ml",
      indications: "मिश्रित पेट के कीड़े (गोलकृमि, फीताकृमि), पेट फूलना, गोबर में बदबू, कमजोर पशु में वजन बढ़ाना",
      standardDose: "7.5 mg/kg अल्बेंडाजोल (60-90 ml प्रति 300-400kg पशु खाली पेट)",
      route: "Oral (मुंह द्वारा खाली पेट)",
      pregnancySafe: false,
      withdrawalPeriod: "दूध: 60 घंटे (5 दुहान), मांस: 14 दिन",
      ethicalOption: { brandName: "Albomar-I (Virbac) / Bandykind-Plus (Mankind)", mrp: 215 },
      genericOption: { brandName: "Alben-Iver Vet Oral Susp (Generic)", mrp: 92 },
      substitutes: ["Fenbendazole Bolus", "Oxyclozanide-Levamisole", "Morantel"]
    },
    {
      id: "DRUG_32",
      name: "Oxyclozanide + Levamisole Susp",
      category: "कृमिनाशक व परजीवी (Anthelmintic)",
      salt: "Oxyclozanide 3% + Levamisole HCl 1.5% w/v Oral Suspension",
      indications: "गाभिन पशुओं में सुरक्षित पेट के कीड़ों की दवाई; लीवर फ्लूक (यकृत कृमि), फेफड़ों के कृमि (Lungworms)",
      standardDose: "10 ml प्रति 30kg शरीर भार (90-100 ml प्रति 300-350kg वयस्क पशु)",
      route: "Oral Drench (मुंह द्वारा)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 24 घंटे, मांस: 14 दिन",
      ethicalOption: { brandName: "Nilzan (Virbac) / Levacloz (Zydus)", mrp: 265 },
      genericOption: { brandName: "Oxy-Leva Vet 100ml (Generic Direct)", mrp: 118 },
      substitutes: ["Triclabendazole (Safe in Pregnancy)", "Closantel", "Albendazole"]
    },

    // ------------------------------------------------------------------------
    // SECTION F: METABOLIC, TONICS & SUPPORTIVE AGENTS (5 DRUGS)
    // ------------------------------------------------------------------------
    {
      id: "DRUG_33",
      name: "Calcium Borogluconate 25% + Mg & P",
      category: "मेटाबॉलिक व टॉनिक (Metabolic & Tonics)",
      salt: "Calcium Borogluconate 25% + Magnesium Hypophosphite & Dextrose (450ml)",
      indications: "मिल्क फीवर (Hypocalcemia - ब्याने के बाद गर्दन मोड़कर बैठना), डाउनर काउ, घास की ऐंठन (Hypomagnesemia)",
      standardDose: "450 ml प्रति वयस्क पशु (आधा IV धीमा, आधा SC चमड़ी नीचे)",
      route: "Slow Intravenous (हार्टबीट मॉनिटर करते हुए) & Subcutaneous",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
      ethicalOption: { brandName: "Mifex (Virbac) / Calborol (Zydus)", mrp: 395 },
      genericOption: { brandName: "Cal-Mag-Phos Vet 450ml (Generic IV)", mrp: 185 },
      substitutes: ["Calcium Levulinate", "Cal-Up Gel", "Oral Ionic Calcium"]
    },
    {
      id: "DRUG_34",
      name: "Toldimphos Sodium 20% Inj",
      category: "मेटाबॉलिक व टॉनिक (Metabolic & Tonics)",
      salt: "Toldimphos Sodium IP (Vet) 200 mg/ml (Organic Phosphorus)",
      indications: "पोस्ट-पार्टम हीमोग्लोबिन्यूरिया (PPH - ब्याने के बाद लाल/कॉफी पेशाब), फास्फोरस की कमी, बार-बार फिरना",
      standardDose: "10-20 ml प्रति वयस्क पशु (गंभीर PPH में 30 ml Slow IV तुरंत)",
      route: "IV / IM / SC (अधिमानतः आधा IV, आधा IM)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
      ethicalOption: { brandName: "Tonophosphan (MSD) / Tonophos (Vetcare)", mrp: 295 },
      genericOption: { brandName: "Toldi-Phos Vet 30ml (Generic Pharma)", mrp: 132 },
      substitutes: ["Butaphosphan + B12", "Sodium Acid Phosphate 40%"]
    },
    {
      id: "DRUG_35",
      name: "Butaphosphan + Cyanocobalamin (B12)",
      category: "मेटाबॉलिक व टॉनिक (Metabolic & Tonics)",
      salt: "Butaphosphan 100 mg + Cyanocobalamin 50 mcg/ml",
      indications: "उपापचयी विकार (Metabolic stress), ब्याने की तैयारी, भूख की कमी (Anorexia), थकान व लैक्टेशन बूस्ट",
      standardDose: "10 - 25 ml प्रति वयस्क पशु लगातार 3-5 दिन",
      route: "IV / IM / SC",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
      ethicalOption: { brandName: "Catosal (Bayer / Elanco) / Urumin (Intas)", mrp: 585 },
      genericOption: { brandName: "Buta-B12 Vet 100ml (Generic Biotech)", mrp: 265 },
      substitutes: ["Tonophosphan", "Belamyl", "Neuroxin-M"]
    },
    {
      id: "DRUG_36",
      name: "Liver Extract + Vitamin B-Complex Inj",
      category: "मेटाबॉलिक व टॉनिक (Metabolic & Tonics)",
      salt: "Crude Liver Extract + Thiamine (B1), Riboflavin (B2), Niacinamide, B12, Choline",
      indications: "पीलिया (Jaundice), लिवर कमजोरी, एंटीबायोटिक कोर्स के बाद भूख बढ़ाना, खून की कमी (Anemia)",
      standardDose: "10 ml प्रति वयस्क गोजातीय पशु दिन में एक बार 3-5 दिन",
      route: "Deep IM ONLY (केवल गहरे मांस में)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
      ethicalOption: { brandName: "Belamyl (Zydus) / Conciplex (Pfizer)", mrp: 145 },
      genericOption: { brandName: "Liver-B Complex Vet (Generic Line)", mrp: 62 },
      substitutes: ["Tribivet", "Liv-52 Vet Inj", "Hepagen"]
    },
    {
      id: "DRUG_37",
      name: "Multivitamin AD3E + Biotin (H) Inj",
      category: "मेटाबॉलिक व टॉनिक (Metabolic & Tonics)",
      salt: "Vitamin A 2.5 Lac IU, Vit D3 25,000 IU, Vit E 100 mg, Biotin (Vit H) 12.5 mcg/ml",
      indications: "अडर (थन) का विकास, लेवटी की मजबूती, खुरों का टूटना (Hoof cracks), रूखापन, जेर की समय पर सफाई",
      standardDose: "5 ml प्रति वयस्क पशु सप्ताह में एक बार (3 खुराकें)",
      route: "Deep IM (गहरे मांस में)",
      pregnancySafe: true,
      withdrawalPeriod: "दूध: 0 दिन, मांस: 0 दिन",
      ethicalOption: { brandName: "Intavita-H (Intas) / Tribivet-H (Virbac)", mrp: 215 },
      genericOption: { brandName: "Vit-AD3E-H Vet (Generic Bulk)", mrp: 98 },
      substitutes: ["Vetalgin", "E-Care Se", "Bio-H Vet"]
    }
  ];

  // 2. ACTIVE FILTER STATE
  var currentCategory = "ALL";
  var currentSearchQuery = "";
  var currentSortOrder = "DEFAULT";
  var currentPregnancyFilter = "ALL";

  // 3. CORE RENDERING ENGINE: renderMedicinesDirectory
  window.renderMedicinesDirectory = function (categoryFilter, searchQuery, sortOrder, pregnancyFilter) {
    var container = document.getElementById("inventoryContainer");
    if (!container) return;

    if (categoryFilter !== undefined) currentCategory = categoryFilter;
    if (searchQuery !== undefined) currentSearchQuery = searchQuery;
    if (sortOrder !== undefined) currentSortOrder = sortOrder;
    if (pregnancyFilter !== undefined) currentPregnancyFilter = pregnancyFilter;

    // Filter Logic
    var list = window.VETCARE_DRUGS_DB.filter(function (drug) {
      // Category Filter
      if (currentCategory !== "ALL" && drug.category !== currentCategory) {
        return false;
      }
      // Pregnancy Safe Filter
      if (currentPregnancyFilter === "SAFE_ONLY" && !drug.pregnancySafe) {
        return false;
      }
      if (currentPregnancyFilter === "UNSAFE_ONLY" && drug.pregnancySafe) {
        return false;
      }
      // Search Query Filter
      if (currentSearchQuery.trim() !== "") {
        var q = currentSearchQuery.toLowerCase().trim();
        var matchName = drug.name.toLowerCase().indexOf(q) !== -1;
        var matchSalt = drug.salt.toLowerCase().indexOf(q) !== -1;
        var matchIndications = drug.indications.toLowerCase().indexOf(q) !== -1;
        var matchEthical = drug.ethicalOption.brandName.toLowerCase().indexOf(q) !== -1;
        var matchGeneric = drug.genericOption.brandName.toLowerCase().indexOf(q) !== -1;
        var matchSub = drug.substitutes.some(function (s) {
          return s.toLowerCase().indexOf(q) !== -1;
        });

        if (!matchName && !matchSalt && !matchIndications && !matchEthical && !matchGeneric && !matchSub) {
          return false;
        }
      }
      return true;
    });

    // Sorting Logic
    if (currentSortOrder === "SAVINGS_DESC") {
      list.sort(function (a, b) {
        var saveA = ((a.ethicalOption.mrp - a.genericOption.mrp) / a.ethicalOption.mrp);
        var saveB = ((b.ethicalOption.mrp - b.genericOption.mrp) / b.ethicalOption.mrp);
        return saveB - saveA;
      });
    } else if (currentSortOrder === "PRICE_ASC") {
      list.sort(function (a, b) {
        return a.genericOption.mrp - b.genericOption.mrp;
      });
    } else if (currentSortOrder === "NAME_ASC") {
      list.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }

    // Analytics Calculation
    var totalListed = window.VETCARE_DRUGS_DB.length;
    var safeCount = window.VETCARE_DRUGS_DB.filter(function (d) { return d.pregnancySafe; }).length;
    var unsafeCount = totalListed - safeCount;
    var avgSavings = Math.round(
      window.VETCARE_DRUGS_DB.reduce(function (acc, d) {
        return acc + (((d.ethicalOption.mrp - d.genericOption.mrp) / d.ethicalOption.mrp) * 100);
      }, 0) / totalListed
    );

    // Build Layout UI
    var html = `
      <div class="space-y-4">
        <!-- HEADER & LIVE CLINICAL PHARMA METRICS -->
        <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-3xl p-5 shadow-lg border border-slate-700">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-2xl">💊</span>
                <h2 class="text-base sm:text-lg font-black tracking-tight">पशु चिकित्सा फार्माकोपिया व जेनेरिक विकल्प (Rx Directory)</h2>
              </div>
              <p class="text-xs text-slate-300 mt-1">
                37+ क्लीनिकल दवाएं, एथिकल बनाम जेनेरिक एमआरपी तुलना, सटीक डोज़ व गाभिन चेतावनी।
              </p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-1 rounded-xl font-bold">
                ✓ 2026 Restored Suite
              </span>
            </div>
          </div>

          <!-- SUMMARY BADGES -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-slate-700/60 text-center">
            <div class="bg-white/10 rounded-2xl p-2 backdrop-blur-xs">
              <span class="text-[10px] text-slate-300 block font-medium">कुल पंजीकृत दवाएं</span>
              <span class="text-sm sm:text-base font-black text-white">${totalListed} फॉर्मूलेशन</span>
            </div>
            <div class="bg-emerald-500/15 rounded-2xl p-2 border border-emerald-400/30">
              <span class="text-[10px] text-emerald-200 block font-medium">गाभिन सुरक्षित (Safe)</span>
              <span class="text-sm sm:text-base font-black text-emerald-300">🛡️ ${safeCount} दवाएं</span>
            </div>
            <div class="bg-rose-500/15 rounded-2xl p-2 border border-rose-400/30">
              <span class="text-[10px] text-rose-200 block font-medium">गाभिन वर्जित (Alert)</span>
              <span class="text-sm sm:text-base font-black text-rose-300">⚠️ ${unsafeCount} दवाएं</span>
            </div>
            <div class="bg-amber-500/15 rounded-2xl p-2 border border-amber-400/30">
              <span class="text-[10px] text-amber-200 block font-medium">औसत किसान बचत</span>
              <span class="text-sm sm:text-base font-black text-amber-300">⚡ ${avgSavings}% बचत</span>
            </div>
          </div>
        </div>

        <!-- SEARCH, FILTERS & CONTROLS TOOLBAR -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            <!-- Search Input -->
            <div class="sm:col-span-5 relative">
              <span class="absolute left-3 top-2.5 text-slate-400 text-xs"><i class="fa-solid fa-magnifying-glass"></i></span>
              <input
                id="drugSearchInput"
                type="text"
                value="${escapeHtml(currentSearchQuery)}"
                placeholder="ब्रांड, साल्ट, रोग या विकल्प खोजें..."
                oninput="window.handleDrugSearchInput(this.value)"
                class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-8 pr-8 py-2 text-xs outline-none focus:border-blue-500 font-medium"
              />
              ${currentSearchQuery ? `
                <button onclick="window.clearDrugSearch()" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs">✕</button>
              ` : ''}
            </div>

            <!-- Category Filter -->
            <div class="sm:col-span-3">
              <select
                id="drugCategorySelect"
                onchange="window.handleDrugCategoryChange(this.value)"
                class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-2.5 py-2 text-xs outline-none font-bold text-slate-700 cursor-pointer"
              >
                <option value="ALL" ${currentCategory === 'ALL' ? 'selected' : ''}>📁 सभी श्रेणियां (All)</option>
                <option value="एंटीबायोटिक (Antibiotic)" ${currentCategory === 'एंटीबायोटिक (Antibiotic)' ? 'selected' : ''}>💉 एंटीबायोटिक (Antibiotics)</option>
                <option value="दर्द व सूजन निवारक (NSAID)" ${currentCategory === 'दर्द व सूजन निवारक (NSAID)' ? 'selected' : ''}>🩹 दर्द व सूजन (NSAIDs)</option>
                <option value="प्रजनन व हार्मोन्स (Hormones)" ${currentCategory === 'प्रजनन व हार्मोन्स (Hormones)' ? 'selected' : ''}>🧬 प्रजनन व हार्मोन (Hormones)</option>
                <option value="प्रोटोजोआ व रक्त परजीवी (Antiprotozoal)" ${currentCategory === 'प्रोटोजोआ व रक्त परजीवी (Antiprotozoal)' ? 'selected' : ''}>🩸 रक्त परजीवी (Antiprotozoal)</option>
                <option value="कृमिनाशक व परजीवी (Anthelmintic)" ${currentCategory === 'कृमिनाशक व परजीवी (Anthelmintic)' ? 'selected' : ''}>🪱 कृमिनाशक (Dewormers)</option>
                <option value="मेटाबॉलिक व टॉनिक (Metabolic & Tonics)" ${currentCategory === 'मेटाबॉलिक व टॉनिक (Metabolic & Tonics)' ? 'selected' : ''}>🧪 मेटाबॉलिक व टॉनिक (Tonics)</option>
              </select>
            </div>

            <!-- Pregnancy Status Filter -->
            <div class="sm:col-span-2">
              <select
                id="drugPregnancySelect"
                onchange="window.handleDrugPregnancyChange(this.value)"
                class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-2 py-2 text-xs outline-none font-bold text-slate-700 cursor-pointer"
              >
                <option value="ALL" ${currentPregnancyFilter === 'ALL' ? 'selected' : ''}>🤰 गाभिन: सभी</option>
                <option value="SAFE_ONLY" ${currentPregnancyFilter === 'SAFE_ONLY' ? 'selected' : ''}>✅ केवल सुरक्षित (Safe)</option>
                <option value="UNSAFE_ONLY" ${currentPregnancyFilter === 'UNSAFE_ONLY' ? 'selected' : ''}>⚠️ वर्जित (Contraindicated)</option>
              </select>
            </div>

            <!-- Sort Selector -->
            <div class="sm:col-span-2">
              <select
                id="drugSortSelect"
                onchange="window.handleDrugSortChange(this.value)"
                class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-2 py-2 text-xs outline-none font-bold text-slate-700 cursor-pointer"
              >
                <option value="DEFAULT" ${currentSortOrder === 'DEFAULT' ? 'selected' : ''}>⚡ डिफ़ॉल्ट क्रम</option>
                <option value="SAVINGS_DESC" ${currentSortOrder === 'SAVINGS_DESC' ? 'selected' : ''}>💰 अधिकतम बचत %</option>
                <option value="PRICE_ASC" ${currentSortOrder === 'PRICE_ASC' ? 'selected' : ''}>🏷️ न्यूनतम जेनेरिक MRP</option>
                <option value="NAME_ASC" ${currentSortOrder === 'NAME_ASC' ? 'selected' : ''}>🔤 नाम (A-Z)</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <div>
              <span>प्रदर्शित परिणाम: <strong class="text-slate-800">${list.length}</strong> / ${totalListed} दवाएं</span>
              ${currentSearchQuery ? `<span class="ml-2 text-blue-600 font-semibold">खोज: "${escapeHtml(currentSearchQuery)}"</span>` : ''}
            </div>
            <button onclick="window.resetDrugFilters()" class="text-blue-600 hover:underline font-bold text-[11px]">
              🔄 सभी फ़िल्टर रीसेट करें
            </button>
          </div>
        </div>

        <!-- DRUG CARDS GRID -->
        ${list.length === 0 ? `
          <div class="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center space-y-2">
            <span class="text-4xl">🔍</span>
            <h3 class="text-sm font-bold text-slate-800">कोई संबंधित दवा नहीं मिली!</h3>
            <p class="text-xs text-slate-500">कृपया अपना सर्च कीवर्ड जांचें अथवा श्रेणी फ़िल्टर बदलकर पुनः प्रयास करें।</p>
            <button onclick="window.resetDrugFilters()" class="mt-2 bg-blue-50 text-blue-700 font-bold px-4 py-2 rounded-xl text-xs hover:bg-blue-100 transition">
              सभी दवाएं देखें
            </button>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            ${list.map(function (drug) { return renderSingleDrugCard(drug); }).join('')}
          </div>
        `}
      </div>
    `;

    container.innerHTML = html;
  };

  // 4. HELPER: RENDER SINGLE DRUG PROFILE CARD
  function renderSingleDrugCard(drug) {
    var savingsAmount = drug.ethicalOption.mrp - drug.genericOption.mrp;
    var savingsPercent = Math.round((savingsAmount / drug.ethicalOption.mrp) * 100);

    return `
      <div class="bg-white border ${drug.pregnancySafe ? 'border-slate-200 hover:border-blue-400' : 'border-rose-200 hover:border-rose-400'} rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3 relative group">
        
        <!-- CARD HEADER: CATEGORY & PREGNANCY WARNING BADGE -->
        <div class="space-y-2">
          <div class="flex items-start justify-between gap-2">
            <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
              ${escapeHtml(drug.category)}
            </span>
            ${drug.pregnancySafe ? `
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1 shrink-0 shadow-2xs">
                <span>🛡️</span> <span>गाभिन सुरक्षित (Safe)</span>
              </span>
            ` : `
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-300 flex items-center gap-1 shrink-0 shadow-2xs pulse-live">
                <span>⚠️</span> <span>गाभिन में सख्त वर्जित</span>
              </span>
            `}
          </div>

          <!-- DRUG TITLE & SALT FORMULATION -->
          <div>
            <h3 class="text-sm sm:text-base font-black text-slate-900 leading-snug">
              ${escapeHtml(drug.name)}
            </h3>
            <div class="mt-1 flex items-center gap-1.5 text-[11px] font-mono font-medium text-slate-600 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-xl">
              <i class="fa-solid fa-dna text-blue-600 text-[10px]"></i>
              <span class="truncate" title="${escapeHtml(drug.salt)}">${escapeHtml(drug.salt)}</span>
            </div>
          </div>

          <!-- CLINICAL INDICATIONS -->
          <div class="text-xs text-slate-700 space-y-1 pt-1">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">क्लिनिकल संकेत व मुख्य उपयोग:</div>
            <p class="leading-relaxed bg-blue-50/40 p-2 rounded-xl border border-blue-100/60 text-[11.5px] font-medium text-slate-800">
              ${escapeHtml(drug.indications)}
            </p>
          </div>

          <!-- DOSAGE, ROUTE & WITHDRAWAL -->
          <div class="space-y-1.5 pt-1 text-[11px]">
            <div class="flex items-start gap-1.5 text-slate-800">
              <span class="font-bold text-blue-700 shrink-0">💉 मानक डोज़:</span>
              <span class="font-medium">${escapeHtml(drug.standardDose)}</span>
            </div>
            <div class="flex items-center gap-1.5 text-slate-800">
              <span class="font-bold text-purple-700 shrink-0">📍 देने का रूट:</span>
              <span class="font-bold font-mono text-purple-900 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200 text-[10px]">
                ${escapeHtml(drug.route)}
              </span>
            </div>
            <div class="flex items-start gap-1.5 text-amber-900 bg-amber-50/70 border border-amber-200/80 px-2 py-1 rounded-xl text-[10.5px]">
              <span class="font-bold shrink-0">⏱️ वापसी समय (Withdrawal):</span>
              <span class="font-medium">${escapeHtml(drug.withdrawalPeriod)}</span>
            </div>
          </div>

          <!-- SIDE-BY-SIDE PRICE COMPARISON (ETHICAL VS GENERIC) -->
          <div class="pt-2">
            <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>मूल्य तुलना (MRP Comparison):</span>
              <span class="text-emerald-700 font-extrabold text-[10.5px]">बचत: ₹${savingsAmount} (${savingsPercent}%)</span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs">
              <!-- Ethical Brand -->
              <div class="p-2 rounded-2xl bg-slate-50 border border-slate-200">
                <span class="text-[9px] font-bold text-slate-500 uppercase block">एथिकल / पेटेंट ब्रांड</span>
                <span class="font-bold text-slate-800 text-[11px] block truncate" title="${escapeHtml(drug.ethicalOption.brandName)}">
                  ${escapeHtml(drug.ethicalOption.brandName)}
                </span>
                <span class="text-xs font-black text-slate-700 mt-0.5 block">MRP: ₹${drug.ethicalOption.mrp}</span>
              </div>

              <!-- Generic Equivalent -->
              <div class="p-2 rounded-2xl bg-emerald-50/70 border border-emerald-300 shadow-2xs">
                <div class="flex items-center justify-between">
                  <span class="text-[9px] font-bold text-emerald-800 uppercase">सस्ता जेनेरिक विकल्प</span>
                  <span class="text-[9px] bg-emerald-600 text-white font-black px-1 rounded">सत्यापित</span>
                </div>
                <span class="font-bold text-emerald-950 text-[11px] block truncate" title="${escapeHtml(drug.genericOption.brandName)}">
                  ${escapeHtml(drug.genericOption.brandName)}
                </span>
                <span class="text-xs font-black text-emerald-700 mt-0.5 block">MRP: ₹${drug.genericOption.mrp}</span>
              </div>
            </div>
          </div>

          <!-- ALTERNATE CLINICAL SUBSTITUTES -->
          <div class="pt-1">
            <span class="text-[10px] font-bold text-slate-400 block mb-1">अन्य क्लिनिकल विकल्प (Substitutes):</span>
            <div class="flex flex-wrap gap-1">
              ${drug.substitutes.map(function (sub) {
                return `
                  <button type="button" onclick="window.handleDrugSearchInput('${escapeHtml(sub)}')" class="text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 border border-slate-200 rounded-lg px-1.5 py-0.5 font-medium transition cursor-pointer">
                    • ${escapeHtml(sub)}
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- ACTION BUTTONS: 1-CLICK OPD PAD INJECTION -->
        <div class="pt-2 border-t border-slate-100 grid grid-cols-1 gap-2">
          <button
            type="button"
            onclick="window.insertDrugIntoOpdPad('${escapeHtml(drug.id)}')"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs shadow-xs transition active:scale-98 flex items-center justify-center gap-1.5"
          >
            <i class="fa-solid fa-file-prescription"></i>
            <span>📋 ओपीडी पर्ची में दवा जोड़ें (Add to Rx)</span>
          </button>
        </div>

      </div>
    `;
  }

  // 5. ACTION: INSERT DRUG DIRECTLY INTO DIGITAL OPD PAD (#opdMedicine)
  window.insertDrugIntoOpdPad = function (drugId) {
    var drug = window.VETCARE_DRUGS_DB.find(function (d) { return d.id === drugId; });
    if (!drug) return;

    var rxField = document.getElementById("opdMedicine");
    if (!rxField) {
      alert("⚠️ डिजिटल ओपीडी पैड उपलब्ध नहीं है। कृपया 'ओपीडी' टैब खोलें।");
      return;
    }

    var prescriptionLine = "• " + drug.name + " (" + drug.standardDose + ") — " + drug.route + " [उपयोग: " + drug.indications.split(',')[0] + "]";
    
    // Check pregnancy warning to add caution in the Rx pad
    if (!drug.pregnancySafe) {
      prescriptionLine += " ⚠️ (गाभिन में वर्जित)";
    }

    if (rxField.value.trim() === "") {
      rxField.value = prescriptionLine;
    } else {
      rxField.value += "\n" + prescriptionLine;
    }

    // Trigger visual toast
    window.showDrugPharmacologyToast("✅ '" + drug.name + "' को डिजिटल ओपीडी पर्ची में दर्ज कर दिया गया है!");

    // If currently on desktop and wanted to switch tabs to Rx pad:
    if (typeof window.switchTab === "function") {
      var navRx = document.getElementById("navRx");
      if (navRx && !navRx.classList.contains("hidden")) {
        // Optional smooth indicator
      }
    }
  };

  // 6. UI EVENT HANDLERS
  window.handleDrugSearchInput = function (val) {
    currentSearchQuery = val;
    window.renderMedicinesDirectory(currentCategory, currentSearchQuery, currentSortOrder, currentPregnancyFilter);
  };

  window.clearDrugSearch = function () {
    currentSearchQuery = "";
    var el = document.getElementById("drugSearchInput");
    if (el) el.value = "";
    window.renderMedicinesDirectory(currentCategory, currentSearchQuery, currentSortOrder, currentPregnancyFilter);
  };

  window.handleDrugCategoryChange = function (val) {
    currentCategory = val;
    window.renderMedicinesDirectory(currentCategory, currentSearchQuery, currentSortOrder, currentPregnancyFilter);
  };

  window.handleDrugPregnancyChange = function (val) {
    currentPregnancyFilter = val;
    window.renderMedicinesDirectory(currentCategory, currentSearchQuery, currentSortOrder, currentPregnancyFilter);
  };

  window.handleDrugSortChange = function (val) {
    currentSortOrder = val;
    window.renderMedicinesDirectory(currentCategory, currentSearchQuery, currentSortOrder, currentPregnancyFilter);
  };

  window.resetDrugFilters = function () {
    currentCategory = "ALL";
    currentSearchQuery = "";
    currentSortOrder = "DEFAULT";
    currentPregnancyFilter = "ALL";
    window.renderMedicinesDirectory();
  };

  // 7. TOAST NOTIFICATION HELPER
  window.showDrugPharmacologyToast = function (msg) {
    var toast = document.createElement("div");
    toast.className = "fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold py-2.5 px-4 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 transition-all duration-300";
    toast.innerHTML = '<span>💊</span><span>' + escapeHtml(msg) + '</span>';
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = "0";
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2500);
  };

  // 8. ESCAPE HTML HELPER
  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // 9. AUTOMATIC INITIALIZATION BINDING
  function autoInit() {
    var container = document.getElementById("inventoryContainer");
    if (container) {
      window.renderMedicinesDirectory();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInit);
  } else {
    autoInit();
  }

})();
