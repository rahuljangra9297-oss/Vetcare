/**
 * Vetcare AI OS - Production Engine (app.js)
 * Fully Integrated Clinical Release
 * 
 * CORE MODULES:
 * 1. 3-Way Diagnostic Inference Engine with 5-Vector Weighted Clinical Matrix
 *    - Cardinal Signs (40%) + Temperature (20%) + Mucous Membrane (15%) + Urine (15%) + Dung (10%)
 *    - Color-Coded Match Probability Bars (>85% Emerald, 60-84% Amber, <60% Slate)
 *    - Weight-Adjusted 1-Click "Auto-Fill Rx" with Pregnancy Red Alert System
 * 2. Live Gemini AI Diagnostic Assistant (LocalStorage API Key Management & Live Second Opinion)
 * 3. Dual-Bank Payment Gateway (State Bank of India & Punjab National Bank) with Dynamic UPI/QR
 * 4. OPD Clinical Slip Generator with WhatsApp Dispatch & Real-Time Sync
 * 5. Farmer Financial Khata Ledger with Automated Payment Reminder Dispatch
 * 6. Bulletproof Zero-Crash Runtime Architecture with Global Window Bindings & Strict Null-Safety
 */

// ==========================================
// 1. PAYMENT GATEWAY CONSTANTS & STATE
// ==========================================

const VETCARE_PAYMENT_CONFIG = {
    payeeName: "Vetcare Services",
    sbi: {
        bankName: "State Bank of India (SBI)",
        upiId: "vetcare.sbi@upi",
        accNo: "39847120934",
        ifsc: "SBIN0001245",
        branch: "SBI Main Commercial Branch",
        accentColor: "blue"
    },
    pnb: {
        bankName: "Punjab National Bank (PNB)",
        upiId: "vetcare.pnb@upi",
        accNo: "0192002100084721",
        ifsc: "PUNB0019200",
        branch: "PNB Industrial Hub",
        accentColor: "rose"
    }
};

let currentSelectedPlan = {
    amount: 199,
    label: "मासिक (Monthly)"
};

let currentActiveBank = "sbi"; // Primary: 'sbi' | Backup: 'pnb'

// ===============================================================
// 2. UNLIMITED CLINICAL DISEASE DATABASE WITH WEIGHTED VECTORS
// ===============================================================

const DEFAULT_DISEASE_CODEX = [
    {
        id: "dis_hs",
        name: "Hemorrhagic Septicemia (HS)",
        localName: "गलघोंटू (घुर्रका)",
        species: ["Bovine"],
        category: "Bacterial",
        tempRange: "105.0 - 107.0 °F",
        cardinalKey: "HS_EDEMA",
        tempProfile: "HIGH",
        mucousProfile: "CONGESTED",
        urineProfile: "DARK_YELLOW",
        dungProfile: "NORMAL",
        symptoms: [
            "अत्यधिक तेज बुखार (105-107°F)",
            "गले और गर्दन के निचले हिस्से में दर्दनाक सूजन (Submandibular Edema)",
            "सांस लेने में भारी कठिनाई व घरघराहट (Snoring / Stridor)",
            "जीभ बाहर निकलना एवं मुंह से झागदार लार",
            "आंखें लाल व कंजस्टेड"
        ],
        primaryRx: "Inj. Sulfamethazine (33.3%) @ 100 mg/kg IV अथवा Inj. Ceftiofur Sodium @ 2.2 mg/kg IM।",
        supportiveRx: "Inj. Flunixin Meglumine @ 2.2 mg/kg IV। शॉक नियंत्रण हेतु Corticosteroids (केवल गैर-गर्भवती में)।",
        fluidTherapy: "Normal Saline (0.9% NaCl) 2-3 लीटर IV।",
        withdrawalNotice: "दूध: 5 दिन, मांस: 14 दिन।",
        differentials: "Black Quarter (BQ), Anthrax, Acute Pharyngitis",
        structuredRx: [
            { drug: "Inj. Ceftiofur Sodium (Intraceft)", baseDoseMgPerKg: 2.2, concentrationMgPerMl: 50, route: "IM", duration: "3 दिन", abortifacient: false },
            { drug: "Inj. Flunixin Meglumine (Megludyne)", baseDoseMgPerKg: 2.2, concentrationMgPerMl: 50, route: "IV", duration: "3 दिन", abortifacient: false },
            { drug: "Inj. Dexamethasone", baseDoseMgPerKg: 0.1, concentrationMgPerMl: 4, route: "IV/IM", duration: "1 दिन", abortifacient: true }
        ]
    },
    {
        id: "dis_bq",
        name: "Black Quarter (BQ)",
        localName: "लंगड़ा बुखार / काला बावा",
        species: ["Bovine", "Caprine"],
        category: "Bacterial",
        tempRange: "104.0 - 106.0 °F",
        cardinalKey: "BQ_CREPITATION",
        tempProfile: "HIGH",
        mucousProfile: "CONGESTED",
        urineProfile: "DARK_YELLOW",
        dungProfile: "HARD_DRY",
        symptoms: [
            "पुट्ठों, कंधों या गर्दन की भारी मांसपेशियों में सूजन",
            "सूजन वाले स्थान को दबाने पर चरचराहट की आवाज (Crepitation Sound)",
            "शुरुआत में सूजन गर्म व दर्दनाक, बाद में ठंडी और दर्दहीन",
            "गंभीर लंगड़ापन",
            "अचानक तेज बुखार व सुस्ती"
        ],
        primaryRx: "Inj. Penicillin G Crystalline @ 20,000-40,000 IU/kg IV/IM प्रत्येक 8 घंटे पर।",
        supportiveRx: "Inj. Meloxicam @ 0.5 mg/kg IM। स्थानीय रूप से पेनिसिलिन इन्फिल्ट्रेशन।",
        fluidTherapy: "Ringer's Lactate (RL) 3 लीटर IV।",
        withdrawalNotice: "दूध: 72 घंटे, मांस: 10 दिन।",
        differentials: "Malignant Edema, Anthrax, Fracture/Trauma",
        structuredRx: [
            { drug: "Inj. Crystalline Penicillin 40 Lac", baseDoseMgPerKg: 20000, concentrationMgPerMl: 400000, route: "IM", duration: "4 दिन", abortifacient: false },
            { drug: "Inj. Meloxicam + Paracetamol", baseDoseMgPerKg: 0.5, concentrationMgPerMl: 5, route: "IM", duration: "3 दिन", abortifacient: false }
        ]
    },
    {
        id: "dis_fmd",
        name: "Foot and Mouth Disease (FMD)",
        localName: "खुरपका-मुँहपका रोग",
        species: ["Bovine", "Caprine"],
        category: "Viral",
        tempRange: "104.0 - 106.0 °F",
        cardinalKey: "FMD_VESICLES",
        tempProfile: "HIGH",
        mucousProfile: "CONGESTED",
        urineProfile: "NORMAL",
        dungProfile: "NORMAL",
        symptoms: [
            "तेज बुखार (104-106°F)",
            "मुंह से तारदार लार गिरना (Ropy Salivation)",
            "जीभ, मसूड़ों और तालु पर छाले (Vesicles)",
            "खुरों के बीच छाले व घाव (Interdigital Ulcers)",
            "लंगड़ा कर चलना",
            "दूध उत्पादन में भारी गिरावट"
        ],
        primaryRx: "मुंह की धुलाई 1:1000 पोटैशियम परमैंगनेट से। Inj. Flunixin Meglumine @ 2.2 mg/kg IM।",
        supportiveRx: "Secondary infection रोकने हेतु Inj. Enrofloxacin @ 5 mg/kg IM। B-Complex 10ml IM।",
        fluidTherapy: "DNS 2-3 लीटर IV यदि खाना-पीना बंद हो।",
        withdrawalNotice: "दूध: 72 घंटे, मांस: 7 दिन।",
        differentials: "Vesicular Stomatitis, Bovine Viral Diarrhea",
        structuredRx: [
            { drug: "Inj. Enrofloxacin 10%", baseDoseMgPerKg: 5, concentrationMgPerMl: 100, route: "IM", duration: "3 दिन", abortifacient: false },
            { drug: "Inj. Flunixin Meglumine", baseDoseMgPerKg: 2.2, concentrationMgPerMl: 50, route: "IM", duration: "3 दिन", abortifacient: false },
            { drug: "Inj. Belamyl (B-Complex + Liver)", baseDoseMgPerKg: 0.03, concentrationMgPerMl: 1, route: "IM", duration: "3 दिन", abortifacient: false }
        ]
    },
    {
        id: "dis_mastitis",
        name: "Bovine Mastitis (Clinical)",
        localName: "थनैला रोग / अयन शोथ",
        species: ["Bovine", "Caprine"],
        category: "Bacterial",
        tempRange: "102.0 - 103.5 °F",
        cardinalKey: "MASTITIS_UDDER",
        tempProfile: "NORMAL",
        mucousProfile: "PINK",
        urineProfile: "NORMAL",
        dungProfile: "NORMAL",
        symptoms: [
            "थन व लेवे में सूजन, लाली एवं अत्यधिक गर्मी",
            "दूध का रंग बदलना (पीला, लाल, पानी जैसा या दही के थक्के)",
            "थन को छूने पर दर्द महसूस करना, दूध दुहने न देना",
            "दूध में खून व मवाद की उपस्थिति",
            "गंभीर मामलों में रुमेन बंद और सुस्ती"
        ],
        primaryRx: "Intramammary Infusion प्रत्येक 12 घंटे पर। Inj. Ceftriaxone + Tazobactam @ 10 mg/kg IM/IV।",
        supportiveRx: "Inj. Meloxicam + Paracetamol 15ml IM। Trisodium Citrate 30-50 ग्राम मौखिक 5 दिन।",
        fluidTherapy: "Hypertonic Saline (7.2% NaCl) 1-2 लीटर IV यदि टॉक्सेमिया हो।",
        withdrawalNotice: "दूध: 7 दिन, मांस: 14 दिन।",
        differentials: "Udder Hematoma, Physiological Edema",
        structuredRx: [
            { drug: "Inj. Intraceft (Ceftiofur 1g)", baseDoseMgPerKg: 2.2, concentrationMgPerMl: 50, route: "IM", duration: "3 दिन", abortifacient: false },
            { drug: "Inj. Melonex Plus", baseDoseMgPerKg: 0.5, concentrationMgPerMl: 5, route: "IM", duration: "3 दिन", abortifacient: false },
            { drug: "Intramammary Tube (Cloxacillin)", baseDoseMgPerKg: 0, concentrationMgPerMl: 1, route: "Intramammary", duration: "3 दिन", abortifacient: false }
        ]
    },
    {
        id: "dis_babesiosis",
        name: "Babesiosis (Redwater Fever)",
        localName: "बबेसिओसिस / लाल पेशाब",
        species: ["Bovine", "Canine", "Equine"],
        category: "Protozoal",
        tempRange: "105.0 - 107.0 °F",
        cardinalKey: "BABESIA_REDWATER",
        tempProfile: "HIGH",
        mucousProfile: "PALE",
        urineProfile: "RED_COFFEE",
        dungProfile: "HARD_DRY",
        symptoms: [
            "कॉफी रंग या गहरा लाल पेशाब (Hemoglobinuria)",
            "अत्यधिक तेज बुखार (105-107°F)",
            "तीव्र एनीमिया (म्यूकस झिल्ली का सफेद या पीला होना)",
            "हृदय की धड़कन तेज (Water Hammer Pulse)",
            "शरीर पर किलनी / चिंचड़ी (Ticks) की मौजूदगी"
        ],
        primaryRx: "Inj. Diminazene Aceturate (Berenil) @ 3.5 - 5 mg/kg Deep IM एकल खुराक।",
        supportiveRx: "Inj. Iron Dextran 10ml IM, Vitamin B12 + Liver Extract।",
        fluidTherapy: "Dextrose Normal Saline (DNS 5%) 3 लीटर IV।",
        withdrawalNotice: "दूध: 3 दिन, मांस: 21 दिन।",
        differentials: "Theileriosis, Leptospirosis, Post-Parturient Hemoglobinuria",
        structuredRx: [
            { drug: "Inj. Berenil (Diminazene 7%)", baseDoseMgPerKg: 3.5, concentrationMgPerMl: 70, route: "IM", duration: "1 दिन (Single Dose)", abortifacient: false },
            { drug: "Inj. Ferritas (Iron Dextran)", baseDoseMgPerKg: 0.03, concentrationMgPerMl: 1, route: "IM", duration: "2 दिन", abortifacient: false },
            { drug: "Inj. Tribivet (B1, B6, B12)", baseDoseMgPerKg: 0.03, concentrationMgPerMl: 1, route: "IM", duration: "3 दिन", abortifacient: false }
        ]
    },
    {
        id: "dis_theileriosis",
        name: "Bovine Theileriosis",
        localName: "थाइलेरियासिस / गांठ वाला बुखार",
        species: ["Bovine"],
        category: "Protozoal",
        tempRange: "104.0 - 106.5 °F",
        cardinalKey: "THEILERIA_NODES",
        tempProfile: "HIGH",
        mucousProfile: "JAUNDICED",
        urineProfile: "DARK_YELLOW",
        dungProfile: "NORMAL",
        symptoms: [
            "सुपरफिशियल लिंफ नोड्स में भारी सूजन (Pre-scapular / Pre-crural)",
            "लगातार तेज बुखार जो एंटीपायरेटिक से नहीं उतरता",
            "आंखों में कॉर्निया का धुंधलापन (Corneal Opacity)",
            "पीलिया (म्यूकस झिल्ली का पीला पड़ना)",
            "अत्यधिक कमजोरी व वजन में भारी कमी"
        ],
        primaryRx: "Inj. Buparvaquone (Butalex) @ 2.5 mg/kg IM एकल खुराक (गर्दन में)।",
        supportiveRx: "Inj. Oxytetracycline LA @ 20 mg/kg IM। Liver Injection + B-Complex।",
        fluidTherapy: "Ringer's Lactate (RL) 2-3 लीटर IV।",
        withdrawalNotice: "दूध: 48 घंटे, मांस: 42 दिन।",
        differentials: "Trypanosomiasis (Surra), Anaplasmosis",
        structuredRx: [
            { drug: "Inj. Butalex (Buparvaquone 50mg/ml)", baseDoseMgPerKg: 2.5, concentrationMgPerMl: 50, route: "IM", duration: "1 दिन (Single Dose)", abortifacient: false },
            { drug: "Inj. Oxytetracycline LA", baseDoseMgPerKg: 20, concentrationMgPerMl: 200, route: "IM", duration: "1 दिन", abortifacient: false }
        ]
    },
    {
        id: "dis_milkfever",
        name: "Milk Fever (Hypocalcemia)",
        localName: "दुग्ध ज्वर / कैल्शियम कमी",
        species: ["Bovine", "Caprine"],
        category: "Metabolic",
        tempRange: "96.0 - 100.0 °F",
        cardinalKey: "MILKFEVER_KINK",
        tempProfile: "SUBNORMAL",
        mucousProfile: "PINK",
        urineProfile: "RETENTION",
        dungProfile: "STOPPED",
        symptoms: [
            "ब्याने के 24-72 घंटे के भीतर पशु का बैठ जाना और उठ न पाना",
            "शरीर और कान बर्फ जैसे ठंडे होना (Hypothermia)",
            "गर्दन को मोड़कर पेट की तरफ रखना ('S' Shaped Lateral Kink)",
            "पुतलियों का फैल जाना (Dilated Pupils)",
            "गोबर और पेशाब रुक जाना, रुमेन गतिशीलता शून्य"
        ],
        primaryRx: "Inj. Calcium Borogluconate (CBG 45%) 450 ml (आधा IV धीमे + आधा SC)।",
        supportiveRx: "Inj. Tonophosphan 15ml IM/IV। Oral Ionic Calcium Gel (300g)।",
        fluidTherapy: "ग्लूकोज या सेलाइन केवल जरूरत पर।",
        withdrawalNotice: "शून्य (Nutritional therapy)।",
        differentials: "Downer Cow Syndrome, Ketosis, Maternal Nerve Paralysis",
        structuredRx: [
            { drug: "Inj. Mifex / CBG 45%", baseDoseMgPerKg: 1.3, concentrationMgPerMl: 1, route: "IV (Slow) & SC", duration: "1 दिन", abortifacient: false },
            { drug: "Inj. Tonophosphan (Sodium Acid Phosphate)", baseDoseMgPerKg: 0.04, concentrationMgPerMl: 1, route: "IM", duration: "2 दिन", abortifacient: false }
        ]
    },
    {
        id: "dis_ketosis",
        name: "Ketosis (Acetonemia)",
        localName: "कीटोसिस / मीठा पेशाब",
        species: ["Bovine"],
        category: "Metabolic",
        tempRange: "101.0 - 102.5 °F",
        cardinalKey: "KETOSIS_ACETONE",
        tempProfile: "NORMAL",
        mucousProfile: "PINK",
        urineProfile: "DARK_YELLOW",
        dungProfile: "HARD_DRY",
        symptoms: [
            "सांस, दूध और पेशाब से मीठी फल जैसी गंध (Sweet Acetone Breath)",
            "दाना/बांटा खाने से मना करना, केवल सूखा चारा खाना",
            "दूध उत्पादन में अचानक तीव्र गिरावट",
            "अत्यधिक तेजी से वजन घटना",
            "नर्वस रूप में: गोल-गोल घूमना, अंधापन"
        ],
        primaryRx: "Inj. Dextrose 25% 500-1000 ml IV तेजी से। Propylene Glycol 200 ml BD मौखिक 4 दिन।",
        supportiveRx: "Inj. Isoflupredone Acetate 10-20 mg IM (गर्भपातकारी - गर्भवती में वर्जित)। B-Complex Inj 15ml।",
        fluidTherapy: "Dextrose 20% या 25% IV।",
        withdrawalNotice: "दूध: 48 घंटे।",
        differentials: "Left Displaced Abomasum (LDA), TRP",
        structuredRx: [
            { drug: "Inj. Dextrose 25% (IV Rapid)", baseDoseMgPerKg: 2.0, concentrationMgPerMl: 1, route: "IV", duration: "2 दिन", abortifacient: false },
            { drug: "Inj. Isoflupredone Acetate (Predef 2X)", baseDoseMgPerKg: 0.03, concentrationMgPerMl: 2, route: "IM", duration: "1 दिन", abortifacient: true },
            { drug: "Propylene Glycol Oral", baseDoseMgPerKg: 0.6, concentrationMgPerMl: 1, route: "Oral", duration: "4 दिन", abortifacient: false }
        ]
    },
    {
        id: "dis_bloat",
        name: "Ruminal Tympany (Bloat)",
        localName: "अफरा / पेट फूलना",
        species: ["Bovine", "Caprine"],
        category: "Metabolic",
        tempRange: "101.0 - 102.5 °F",
        cardinalKey: "BLOAT_TYMPANY",
        tempProfile: "NORMAL",
        mucousProfile: "CYANOTIC",
        urineProfile: "NORMAL",
        dungProfile: "STOPPED",
        symptoms: [
            "बाईं कोख (Left Paralumbar Fossa) का ढोल की तरह फूल जाना",
            "सांस लेने में भारी कष्ट, जीभ बाहर निकालना",
            "पशु का बार-बार उठना, बैठना और पेट पर लात मारना",
            "मुंह से झागदार लार आना",
            "गंभीर स्थिति में दम घुटने से अचानक गिरना"
        ],
        primaryRx: "Simethicone Suspension (Tympanil/Bloatosil) 100 ml मौखिक या रुमेन में सीधे। Trocar Cannula द्वारा आपात निकासी।",
        supportiveRx: "सरसों का तेल 500 ml + हींग 20 ग्राम + तारपीन का तेल 30 ml मौखिक।",
        fluidTherapy: "आवश्यकता नहीं। दर्द में Inj. Spasmo-Vet 15ml IM।",
        withdrawalNotice: "शून्य।",
        differentials: "Choke, Vagus Indigestion",
        structuredRx: [
            { drug: "Simethicone Suspension (Bloatosil)", baseDoseMgPerKg: 0.3, concentrationMgPerMl: 1, route: "Oral / Intra-ruminal", duration: "1 दिन", abortifacient: false },
            { drug: "Inj. Spasmo-Vet (Dicyclomine)", baseDoseMgPerKg: 0.04, concentrationMgPerMl: 1, route: "IM", duration: "1 दिन", abortifacient: false }
        ]
    },
    {
        id: "dis_lsd",
        name: "Lumpy Skin Disease (LSD)",
        localName: "गांठदार त्वचा रोग (लम्पी)",
        species: ["Bovine"],
        category: "Viral",
        tempRange: "103.5 - 105.5 °F",
        cardinalKey: "LSD_NODULES",
        tempProfile: "HIGH",
        mucousProfile: "CONGESTED",
        urineProfile: "NORMAL",
        dungProfile: "NORMAL",
        symptoms: [
            "त्वचा पर 2-5 सेमी आकार की सख्त उभरी हुई गांठें (Nodules)",
            "पैरों, छाती और अंडकोष/लेवे में सूजन (Ventral Edema)",
            "आंख और नाक से पानी/स्राव बहना",
            "गांठों का पकना और घाव बन जाना",
            "लंगड़ाना और दूध उत्पादन में कमी"
        ],
        primaryRx: "Inj. Ceftiofur Sodium 1 gm IM अथवा Enrofloxacin @ 5 mg/kg IM।",
        supportiveRx: "Inj. Flunixin Meglumine 15ml IM। Ivermectin 1% @ 1ml/50kg SC। Zinc Supplementation।",
        fluidTherapy: "DNS 2-3 लीटर IV।",
        withdrawalNotice: "दूध: 5 दिन, मांस: 14 दिन।",
        differentials: "Pseudo-LSD, Demodicosis",
        structuredRx: [
            { drug: "Inj. Ceftiofur Sodium 1g", baseDoseMgPerKg: 2.2, concentrationMgPerMl: 50, route: "IM", duration: "4 दिन", abortifacient: false },
            { drug: "Inj. Flunixin Meglumine", baseDoseMgPerKg: 2.2, concentrationMgPerMl: 50, route: "IM", duration: "3 दिन", abortifacient: false },
            { drug: "Inj. Ivermectin 1%", baseDoseMgPerKg: 0.2, concentrationMgPerMl: 10, route: "SC", duration: "1 दिन (Single Dose)", abortifacient: false }
        ]
    },
    {
        id: "dis_parvo",
        name: "Canine Parvovirus Enteritis (CPV)",
        localName: "श्वान पार्वो वायरस",
        species: ["Canine"],
        category: "Viral",
        tempRange: "103.0 - 105.0 °F",
        cardinalKey: "PARVO_BLOODY",
        tempProfile: "HIGH",
        mucousProfile: "PALE",
        urineProfile: "DARK_YELLOW",
        dungProfile: "WATERY_FOUL",
        symptoms: [
            "अत्यधिक बदबूदार खूनी दस्त (Foul-smelling Bloody Diarrhea)",
            "लगातार गंभीर उल्टियां (Persistent Vomiting)",
            "गंभीर निर्जलीकरण और आंखें अंदर धंस जाना",
            "अत्यधिक सुस्ती व कुछ भी खाने-पीने में असमर्थ",
            "शरीर का तापमान शुरुआत में तेज, बाद में सब-नॉर्मल"
        ],
        primaryRx: "Inj. Maropitant (Cerenia) 1 mg/kg SC अथवा Ondansetron @ 0.5 mg/kg IV। Inj. Ceftriaxone @ 25 mg/kg IV।",
        supportiveRx: "Inj. Pantoprazole @ 1 mg/kg IV, Inj. Ethamsylate @ 10 mg/kg IV।",
        fluidTherapy: "Ringer's Lactate (RL) + 5% Dextrose @ 60-90 ml/kg/day IV (जीवन रक्षक)।",
        withdrawalNotice: "गैर-खाद्य पशु।",
        differentials: "Canine Coronavirus, Intestinal Foreign Body",
        structuredRx: [
            { drug: "Inj. Ceftriaxone (Monocef)", baseDoseMgPerKg: 25, concentrationMgPerMl: 100, route: "IV", duration: "4 दिन", abortifacient: false },
            { drug: "Inj. Ondansetron (Emeset)", baseDoseMgPerKg: 0.3, concentrationMgPerMl: 2, route: "IV", duration: "3 दिन", abortifacient: false },
            { drug: "Inj. Pantoprazole (Pan)", baseDoseMgPerKg: 1.0, concentrationMgPerMl: 40, route: "IV", duration: "3 दिन", abortifacient: false }
        ]
    },
    {
        id: "dis_ppr",
        name: "Peste des Petits Ruminants (PPR)",
        localName: "बकरी प्लेग / पीपीआर",
        species: ["Caprine"],
        category: "Viral",
        tempRange: "104.0 - 106.0 °F",
        cardinalKey: "PPR_SORES",
        tempProfile: "HIGH",
        mucousProfile: "CONGESTED",
        urineProfile: "NORMAL",
        dungProfile: "WATERY_FOUL",
        symptoms: [
            "तेज बुखार (104-106°F) और उदासी",
            "मुंह में घाव, मसूड़ों पर सफेद परत व बदबूदार सांस",
            "गंभीर पतला पानी जैसा दस्त (Severe Enteritis)",
            "आंखों व नाक से गाढ़ा मवाद जैसा स्राव",
            "निमोनिया के लक्षण और सांस फूलना"
        ],
        primaryRx: "Inj. Enrofloxacin @ 5 mg/kg IM अथवा Oxytetracycline @ 10 mg/kg IM 4 दिन।",
        supportiveRx: "Inj. Meloxicam 2ml IM। B-Complex 2ml IM। ORS पानी में प्रचुर मात्रा में दें।",
        fluidTherapy: "DNS 300-500 ml SC/Slow IV।",
        withdrawalNotice: "मांस: 14 दिन।",
        differentials: "CCPP, Coccidiosis, Goat Pox",
        structuredRx: [
            { drug: "Inj. Enrofloxacin 10%", baseDoseMgPerKg: 5, concentrationMgPerMl: 100, route: "IM", duration: "4 दिन", abortifacient: false },
            { drug: "Inj. Meloxicam", baseDoseMgPerKg: 0.5, concentrationMgPerMl: 5, route: "IM", duration: "3 दिन", abortifacient: false }
        ]
    },
    {
        id: "dis_colic",
        name: "Equine Colic (Spasmodic/Impaction)",
        localName: "अश्व शूल (घोड़े का पेट दर्द)",
        species: ["Equine"],
        category: "Metabolic",
        tempRange: "99.5 - 101.5 °F",
        cardinalKey: "COLIC_ROLLING",
        tempProfile: "NORMAL",
        mucousProfile: "CONGESTED",
        urineProfile: "SCANTY_PAIN",
        dungProfile: "STOPPED",
        symptoms: [
            "घोड़े का बार-बार जमीन पर लोटना (Rolling)",
            "पेट की ओर मुड़कर देखना और लात मारना",
            "अत्यधिक पसीना आना व बेचैनी",
            "गोबर रुकना (Impaction) या बार-बार पेशाब की मुद्रा बनाना",
            "हृदय गति 60 से अधिक प्रति मिनट"
        ],
        primaryRx: "Inj. Flunixin Meglumine @ 1.1 mg/kg IV। Inj. Buscopan Compositum 25 ml IV।",
        supportiveRx: "Liquid Paraffin (Mineral Oil) 2-4 लीटर Nasogastric Tube द्वारा।",
        fluidTherapy: "Normal Saline 10-15 लीटर IV।",
        withdrawalNotice: "गैर-खाद्य पशु।",
        differentials: "Gastric Rupture, Strangulating Lipoma",
        structuredRx: [
            { drug: "Inj. Flunixin Meglumine", baseDoseMgPerKg: 1.1, concentrationMgPerMl: 50, route: "IV", duration: "1 दिन", abortifacient: false },
            { drug: "Inj. Buscopan Compositum", baseDoseMgPerKg: 0.05, concentrationMgPerMl: 1, route: "IV", duration: "1 दिन", abortifacient: false }
        ]
    },
    {
        id: "dis_enterotoxemia",
        name: "Enterotoxemia (Pulpy Kidney)",
        localName: "फड़किया रोग",
        species: ["Caprine"],
        category: "Bacterial",
        tempRange: "103.5 - 105.0 °F",
        cardinalKey: "ENTEROTOX_OPISTHO",
        tempProfile: "HIGH",
        mucousProfile: "CYANOTIC",
        urineProfile: "NORMAL",
        dungProfile: "WATERY_FOUL",
        symptoms: [
            "अचानक बिना किसी पूर्व लक्षण के पशु का गिरना व तड़पना",
            "दांत पीसना, मुंह से झाग और गर्दन पीछे खींचना (Opisthotonos)",
            "तेजी से दाना या नई हरी घास खाने के बाद लक्षण",
            "पेशाब में ग्लूकोज की प्रचुरता (Glycosuria)",
            "मृत्यु के तुरंत बाद गुर्दे का दलिया जैसा गल जाना"
        ],
        primaryRx: "Clostridium Antitoxin 25 ml SC यदि उपलब्ध हो। Penicillin G 20,000 IU/kg IM।",
        supportiveRx: "दाना तुरंत बंद करें। B-Complex + Thiamine 5ml IM।",
        fluidTherapy: "RL 500 ml Slow IV।",
        withdrawalNotice: "मांस: 14 दिन।",
        differentials: "Polioencephalomalacia (PEM), Tetanus",
        structuredRx: [
            { drug: "Inj. Procaine Penicillin", baseDoseMgPerKg: 20000, concentrationMgPerMl: 300000, route: "IM", duration: "3 दिन", abortifacient: false },
            { drug: "Inj. Tribivet (Thiamine B1)", baseDoseMgPerKg: 0.05, concentrationMgPerMl: 1, route: "IM", duration: "3 दिन", abortifacient: false }
        ]
    },
    {
        id: "dis_coccidiosis",
        name: "Coccidiosis (Bovine/Caprine/Avian)",
        localName: "कॉक्सीडियोसिस / खूनी पेचिश",
        species: ["Bovine", "Caprine", "Poultry"],
        category: "Parasitic",
        tempRange: "102.0 - 104.0 °F",
        cardinalKey: "COCCIDIA_TENESMUS",
        tempProfile: "HIGH",
        mucousProfile: "PALE",
        urineProfile: "NORMAL",
        dungProfile: "MUCUS_BLOOD",
        symptoms: [
            "काले या लाल रंग का खूनी बदबूदार दस्त",
            "मल त्यागते समय अत्यधिक जोर लगाना (Tenesmus)",
            "गुदा का बाहर निकल आना (Rectal Prolapse)",
            "वजन में तेज गिरावट और पंख/बाल रूखे होना",
            "छोटे मेमनों व बछड़ों में अधिक प्रकोप"
        ],
        primaryRx: "Amprolium 20% Powder @ 10 mg/kg पानी में 5 दिन, अथवा Toltrazuril @ 20 mg/kg मौखिक एकल खुराक।",
        supportiveRx: "Sulfadimethoxine 50 mg/kg मौखिक 3 दिन। Belamyl 3ml IM।",
        fluidTherapy: "Electrolyte ORS पानी में प्रचुर मात्रा में दें।",
        withdrawalNotice: "मांस: 10 दिन, दूध: 5 दिन।",
        differentials: "Salmonellosis, Helminthiasis",
        structuredRx: [
            { drug: "Toltrazuril 5% Oral Susp.", baseDoseMgPerKg: 20, concentrationMgPerMl: 50, route: "Oral", duration: "1 दिन (Single Dose)", abortifacient: false },
            { drug: "Inj. Belamyl (Liver + B-Complex)", baseDoseMgPerKg: 0.03, concentrationMgPerMl: 1, route: "IM", duration: "3 दिन", abortifacient: false }
        ]
    }
];

// In-Memory Application State
let appDiseases = [];
let appKhataLedger = [];
let appMedicationRows = [];

// ===============================================================
// 3. DEFENSIVE RUNTIME UI TOGGLE & SAFETY INITIALIZATION
// ===============================================================

function showMainApp() {
    try {
        const authScreen = document.getElementById("authScreen");
        if (authScreen && authScreen.classList) {
            authScreen.classList.add("hidden");
            authScreen.style.display = "none";
        }
        const splashScreen = document.getElementById("splashScreen");
        if (splashScreen && splashScreen.classList) {
            splashScreen.classList.add("hidden");
            splashScreen.style.display = "none";
        }
        const mainApp = document.getElementById("mainApp");
        if (mainApp && mainApp.classList) {
            mainApp.classList.remove("hidden");
            mainApp.style.display = "block";
        }
        const appContainer = document.getElementById("appContainer");
        if (appContainer && appContainer.classList) {
            appContainer.classList.remove("hidden");
            appContainer.style.display = "block";
        }
    } catch (err) {
        console.warn("showMainApp guarded successfully:", err);
    }
}
window.showMainApp = showMainApp;

document.addEventListener("DOMContentLoaded", () => {
    window.showMainApp();
    initDualSyncStorage();
    initClock();
    checkStoredApiKey();
    setupDefaultPrescriptionMedicines();
    populateSymptomsChecklist();
    renderDiseaseDirectory();
    renderKhataLedger();
    updatePaymentGatewayUI();
    updateLivePrescription();

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            window.closePaymentModal();
            window.closeApiKeyModal();
        }
    });

    const openPayBtn = document.getElementById("openPaymentModalBtn");
    if (openPayBtn) {
        openPayBtn.addEventListener("click", window.openPaymentModal);
    }
});

function initClock() {
    const clockEl = document.getElementById("liveClock");
    const update = () => {
        if (clockEl) {
            const now = new Date();
            clockEl.textContent = now.toLocaleDateString("hi-IN", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
        }
    };
    update();
    setInterval(update, 30000);
}

function initDualSyncStorage() {
    const syncBadge = document.getElementById("syncBadge");
    const syncText = document.getElementById("syncText");

    const storedCustom = localStorage.getItem("vetcare_custom_diseases");
    let custom = [];
    if (storedCustom) {
        try {
            custom = JSON.parse(storedCustom);
        } catch (e) {
            console.error("Custom disease parse error:", e);
        }
    }
    appDiseases = [...DEFAULT_DISEASE_CODEX, ...custom];

    const storedKhata = localStorage.getItem("vetcare_khata_ledger");
    if (storedKhata) {
        try {
            appKhataLedger = JSON.parse(storedKhata);
        } catch (e) {
            appKhataLedger = [];
        }
    } else {
        appKhataLedger = [
            {
                id: "kht_101",
                name: "सुरेश पटेल",
                phone: "9829012345",
                village: "रामपुरा",
                date: new Date().toISOString().split("T")[0],
                bill: 1500,
                paid: 1000,
                due: 500,
                note: "थनैला ट्यूब्स + मेलोनेक्स इंजेक्शन"
            },
            {
                id: "kht_102",
                name: "बलविंदर सिंह",
                phone: "9414098765",
                village: "किशनगढ़",
                date: new Date().toISOString().split("T")[0],
                bill: 850,
                paid: 300,
                due: 550,
                note: "अफरा सिरप + एंटीबायोटिक"
            }
        ];
        saveKhataLedgerToStorage();
    }

    window.addEventListener("online", () => {
        if (syncBadge && syncText && syncBadge.classList) {
            syncBadge.className = "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200";
            syncText.textContent = "लोकल + क्लाउड लाइव सिंक";
        }
    });

    window.addEventListener("offline", () => {
        if (syncBadge && syncText && syncBadge.classList) {
            syncBadge.className = "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200";
            syncText.textContent = "ऑफलाइन मोड (सुरक्षित स्टोरेज)";
        }
    });
}

function saveKhataLedgerToStorage() {
    try {
        localStorage.setItem("vetcare_khata_ledger", JSON.stringify(appKhataLedger));
    } catch (e) {
        console.error("Khata save error:", e);
    }
}

function saveCustomDiseasesToStorage(newDisease) {
    try {
        const stored = localStorage.getItem("vetcare_custom_diseases");
        let current = [];
        if (stored) {
            try {
                current = JSON.parse(stored);
            } catch (e) {
                current = [];
            }
        }
        current.push(newDisease);
        localStorage.setItem("vetcare_custom_diseases", JSON.stringify(current));
        appDiseases.push(newDisease);
    } catch (e) {
        console.error("Custom disease storage error:", e);
    }
}

// ===============================================================
// 4. WEIGHTED SYMPTOM MATRIX DIAGNOSTIC INFERENCE ENGINE
// ===============================================================

window.syncTempSelection = function() {
    const tempInput = parseFloat(document.getElementById("diagTemp")?.value);
    const tempClass = document.getElementById("diagTempClass");
    if (!tempClass || isNaN(tempInput)) return;

    if (tempInput > 103.5) {
        tempClass.value = "HIGH";
    } else if (tempInput < 100.0) {
        tempClass.value = "SUBNORMAL";
    } else {
        tempClass.value = "NORMAL";
    }
};

window.syncTempInput = function() {
    const tempClass = document.getElementById("diagTempClass")?.value;
    const tempInput = document.getElementById("diagTemp");
    if (!tempInput || !tempClass) return;

    if (tempClass === "HIGH") {
        tempInput.value = "105.2";
    } else if (tempClass === "SUBNORMAL") {
        tempInput.value = "98.4";
    } else {
        tempInput.value = "101.5";
    }
};

window.resetDiagnosticMatrix = function() {
    const cardEl = document.getElementById("diagCardinalSign");
    if (cardEl) cardEl.value = "NONE";
    const tempIn = document.getElementById("diagTemp");
    if (tempIn) tempIn.value = "";
    const tempCl = document.getElementById("diagTempClass");
    if (tempCl) tempCl.value = "NORMAL";
    const mucEl = document.getElementById("diagMucous");
    if (mucEl) mucEl.value = "PINK";
    const uriEl = document.getElementById("diagUrine");
    if (uriEl) uriEl.value = "NORMAL";
    const dngEl = document.getElementById("diagDung");
    if (dngEl) dngEl.value = "NORMAL";

    const cbs = document.querySelectorAll(".diag-symptom-cb");
    cbs.forEach(cb => { cb.checked = false; });
    const countBadge = document.getElementById("selectedSymptomCount");
    if (countBadge) countBadge.textContent = "0 चयनित";

    window.runDiagnostics();
    showToast("नैदानिक मैट्रिक्स रीसेट किया गया।", "info");
};

function populateSymptomsChecklist() {
    const container = document.getElementById("symptomsChecklist");
    if (!container) return;

    const symptomSet = new Set();
    appDiseases.forEach(d => {
        if (Array.isArray(d.symptoms)) {
            d.symptoms.forEach(s => symptomSet.add(s.trim()));
        }
    });

    const sorted = Array.from(symptomSet).sort();
    container.innerHTML = "";

    sorted.forEach((sym) => {
        const label = document.createElement("label");
        label.className = "symptom-item flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded text-xs cursor-pointer select-none";
        label.innerHTML = `
            <input type="checkbox" value="${escapeHtml(sym)}" class="diag-symptom-cb rounded text-brand-600 focus:ring-brand-500" onchange="window.handleSymptomCheckChange()">
            <span class="text-slate-700 font-devanagari">${escapeHtml(sym)}</span>
        `;
        container.appendChild(label);
    });
}

window.handleSymptomCheckChange = function() {
    const checked = document.querySelectorAll(".diag-symptom-cb:checked");
    const countBadge = document.getElementById("selectedSymptomCount");
    if (countBadge) countBadge.textContent = `${checked.length} चयनित`;
    window.runDiagnostics();
};

window.filterSymptomCheckboxes = function() {
    const q = (document.getElementById("symptomSearch")?.value || "").toLowerCase();
    const items = document.querySelectorAll(".symptom-item");
    items.forEach(item => {
        if (!item) return;
        const txt = item.textContent.toLowerCase();
        item.style.display = txt.includes(q) ? "flex" : "none";
    });
};

/**
 * Weighted Clinical Inference Algorithm:
 * - Cardinal Sign: 40%
 * - Body Temperature: 20%
 * - Mucous Membrane: 15%
 * - Urine Status: 15%
 * - Dung/Stool Status: 10%
 */
window.runDiagnostics = function() {
    const species = document.getElementById("diagSpecies")?.value || "Bovine";
    const cardinalSign = document.getElementById("diagCardinalSign")?.value || "NONE";
    const tempClass = document.getElementById("diagTempClass")?.value || "NORMAL";
    const mucous = document.getElementById("diagMucous")?.value || "PINK";
    const urine = document.getElementById("diagUrine")?.value || "NORMAL";
    const dung = document.getElementById("diagDung")?.value || "NORMAL";

    const checkedBoxes = document.querySelectorAll(".diag-symptom-cb:checked");
    const checkedSymptoms = Array.from(checkedBoxes).map(cb => cb.value.toLowerCase());

    const resultsContainer = document.getElementById("diagnosticResultsList");
    const matchCountBadge = document.getElementById("matchCountBadge");

    const isMatrixPristine = (cardinalSign === "NONE" && tempClass === "NORMAL" && mucous === "PINK" && urine === "NORMAL" && dung === "NORMAL" && checkedSymptoms.length === 0);

    if (isMatrixPristine) {
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="text-center py-16 text-slate-400 text-xs font-devanagari">
                    <i class="fa-solid fa-stethoscope text-4xl mb-3 text-slate-300"></i>
                    <p>सटीक नैदानिक विश्लेषण हेतु बाईं ओर से कार्डिनल लक्षण अथवा वाइटल्स का चयन करें।</p>
                </div>
            `;
        }
        if (matchCountBadge) matchCountBadge.textContent = "0 रोग मिले";
        return;
    }

    const scoredList = [];

    appDiseases.forEach(d => {
        let score = 0;
        const breakdown = [];

        // Species Filter Guard
        const speciesMatch = (d.species.includes(species) || d.species.includes("ALL"));
        if (!speciesMatch) {
            score -= 35; // Heavy cross-species penalty
        }

        // Vector 1: Cardinal Sign (40%)
        if (cardinalSign !== "NONE") {
            if (d.cardinalKey === cardinalSign) {
                score += 40;
                breakdown.push("कार्डिनल पैथोग्नोमोनिक लक्षण मेल (+40%)");
            }
        }

        // Vector 2: Body Temperature (20%)
        if (d.tempProfile === tempClass) {
            score += 20;
            breakdown.push(`तापमान स्थिति मेल (${tempClass}) (+20%)`);
        } else if (tempClass !== "NORMAL" && d.tempProfile === "HIGH" && tempClass === "HIGH") {
            score += 20;
        }

        // Vector 3: Mucous Membrane (15%)
        if (d.mucousProfile === mucous) {
            score += 15;
            breakdown.push(`श्लेष्मा झिल्ली मेल (${mucous}) (+15%)`);
        }

        // Vector 4: Urine Status (15%)
        if (d.urineProfile === urine) {
            score += 15;
            breakdown.push(`मूत्र परीक्षण लक्षण मेल (${urine}) (+15%)`);
        }

        // Vector 5: Dung / Stool (10%)
        if (d.dungProfile === dung) {
            score += 10;
            breakdown.push(`गोबर/मल स्थिति मेल (${dung}) (+10%)`);
        }

        // Granular Symptom Bonus (Up to +15% normalized)
        if (checkedSymptoms.length > 0 && Array.isArray(d.symptoms)) {
            let matchedSymCount = 0;
            d.symptoms.forEach(ds => {
                const lowerDs = ds.toLowerCase();
                checkedSymptoms.forEach(cs => {
                    if (lowerDs.includes(cs) || cs.includes(lowerDs)) {
                        matchedSymCount++;
                    }
                });
            });
            const bonus = Math.min(15, Math.round((matchedSymCount / checkedSymptoms.length) * 15));
            if (bonus > 0) {
                score += bonus;
                breakdown.push(`अतिरिक्त लक्षण पुष्टि (+${bonus}%)`);
            }
        }

        if (score > 15) {
            const finalPercentage = Math.min(99, Math.max(10, score));
            scoredList.push({
                disease: d,
                confidence: finalPercentage,
                reasons: breakdown
            });
        }
    });

    scoredList.sort((a, b) => b.confidence - a.confidence);

    if (matchCountBadge) {
        matchCountBadge.textContent = `${scoredList.length} रोग मिले`;
    }

    if (!resultsContainer) return;
    resultsContainer.innerHTML = "";

    if (scoredList.length === 0) {
        resultsContainer.innerHTML = `
            <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs text-center font-devanagari">
                वर्तमान इनपुट से कोई सटीक नैदानिक मेल नहीं मिला। कृपया लक्षण पुनः जांचें या "Gemini AI" की मदद लें।
            </div>
        `;
        return;
    }

    scoredList.forEach(item => {
        const d = item.disease;
        const conf = item.confidence;

        // Color Coding: >85% Emerald, 60-84% Amber, <60% Slate
        let badgeBg = "bg-slate-100 text-slate-700 border-slate-300";
        let barColor = "bg-slate-400";
        let matchText = "संभावित";

        if (conf >= 85) {
            badgeBg = "bg-emerald-100 text-emerald-800 border-emerald-300";
            barColor = "bg-emerald-600";
            matchText = "अत्यधिक संभावित (High Match)";
        } else if (conf >= 60) {
            badgeBg = "bg-amber-100 text-amber-800 border-amber-300";
            barColor = "bg-amber-500";
            matchText = "मध्यम संभावना (Moderate)";
        }

        const div = document.createElement("div");
        div.className = "bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3";
        div.innerHTML = `
            <div class="flex items-start justify-between gap-2">
                <div>
                    <h4 class="font-bold text-slate-900 font-devanagari text-sm">${escapeHtml(d.localName)}</h4>
                    <span class="text-[11px] text-slate-500 font-sans italic">${escapeHtml(d.name)}</span>
                </div>
                <div class="text-right">
                    <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-black border ${badgeBg} font-mono">
                        ${conf}%
                    </span>
                    <span class="block text-[9px] text-slate-400 mt-0.5 font-devanagari">${matchText}</span>
                </div>
            </div>

            <!-- Dynamic Confidence Bar -->
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="${barColor} h-2 rounded-full transition-all duration-500" style="width: ${conf}%"></div>
            </div>

            <!-- Match Breakdown List -->
            <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-1 font-devanagari">
                <strong class="text-slate-800 block text-[10px] uppercase tracking-wide">क्लिनिकल पुष्टि कारक:</strong>
                ${item.reasons.map(r => `<div class="flex items-center gap-1.5"><span class="text-brand-600">✓</span><span>${escapeHtml(r)}</span></div>`).join('')}
            </div>

            <!-- Rx Preview & 1-Click Auto-Fill -->
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <span class="text-[10px] text-slate-400 font-mono">${d.category}</span>
                <button type="button" onclick="window.autoFillPrescription('${d.id}')" class="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold font-devanagari flex items-center gap-1.5 shadow-sm active:scale-95 transition">
                    <i class="fa-solid fa-notes-medical"></i> 📋 पर्ची में दवाइयाँ जोड़ें (Auto-Fill Rx)
                </button>
            </div>
        `;
        resultsContainer.appendChild(div);
    });
};

// ===============================================================
// 5. 1-CLICK AUTO-FILL RX & PREGNANCY RED ALERT SYSTEM
// ===============================================================

window.handlePregnancyStatusChange = function() {
    const pregSelect = document.getElementById("animalPregnancyStatus");
    const isPregnant = (pregSelect?.value === "pregnant");
    const formBanner = document.getElementById("formPregnancyAlert");
    const slipBanner = document.getElementById("slipPregnancyWarning");

    if (isPregnant) {
        if (formBanner && formBanner.classList) formBanner.classList.remove("hidden");
        if (slipBanner && slipBanner.classList) slipBanner.classList.remove("hidden");
        showToast("⚠️ गर्भावस्था चेतावनी सक्रिय: गर्भपातकारी औषधियां पूर्णतः वर्जित हैं!", "error");
    } else {
        if (formBanner && formBanner.classList) formBanner.classList.add("hidden");
        if (slipBanner && slipBanner.classList) slipBanner.classList.add("hidden");
    }

    window.updateLivePrescription();
};

window.autoFillPrescription = function(diseaseId) {
    const dis = appDiseases.find(d => d.id === diseaseId);
    if (!dis) return;

    const weightInput = parseFloat(document.getElementById("animalWeightKg")?.value) || 350;
    const pregSelect = document.getElementById("animalPregnancyStatus");
    const isPregnant = (pregSelect?.value === "pregnant");

    const diagInput = document.getElementById("opdDiagnosisInput");
    if (diagInput) diagInput.value = `${dis.localName} (${dis.name})`;

    const adviceInput = document.getElementById("opdAdvice");
    if (adviceInput) adviceInput.value = `${dis.primaryRx} ${dis.supportiveRx}`;

    // Clear existing medicine rows
    appMedicationRows = [];

    let abortifacientBlockedCount = 0;

    if (Array.isArray(dis.structuredRx) && dis.structuredRx.length > 0) {
        dis.structuredRx.forEach(med => {
            let doseString = "";
            if (med.baseDoseMgPerKg > 0 && med.concentrationMgPerMl > 0) {
                const totalMg = weightInput * med.baseDoseMgPerKg;
                const ml = Math.max(1, Math.round((totalMg / med.concentrationMgPerMl) * 10) / 10);
                doseString = `${ml} ml (${weightInput}kg भार अनुसार)`;
            } else {
                doseString = "1 शीशी / मानक खुराक";
            }

            let drugDisplayName = med.drug;

            if (isPregnant && med.abortifacient) {
                abortifacientBlockedCount++;
                drugDisplayName = `[⚠️ वर्जित/ABORTIFACIENT] ${med.drug} - गर्भवती में निषेध!`;
                doseString = "0 ml (स्वतः रद्द)";
            }

            appMedicationRows.push({
                drugName: drugDisplayName,
                dose: doseString,
                route: med.route,
                duration: med.duration
            });
        });
    } else {
        appMedicationRows.push({
            drugName: dis.primaryRx.substring(0, 48),
            dose: `${Math.round(weightInput * 0.05)} ml`,
            route: "IM",
            duration: "3 दिन"
        });
    }

    renderMedicationRowsInput();
    window.switchAppTab("opdTab");
    window.updateLivePrescription();

    if (isPregnant && abortifacientBlockedCount > 0) {
        showToast(`⚠️ गर्भवती पशु: ${abortifacientBlockedCount} गर्भपातकारी औषधियां पर्ची में स्वतः ब्लॉक की गईं!`, "error");
    } else {
        showToast(`'${dis.localName}' का औषधीय प्रोटोकॉल (${weightInput}kg अनुसार) पर्ची में दर्ज किया गया!`, "success");
    }
};

// ===============================================================
// 6. LIVE GEMINI AI DIAGNOSTIC ASSISTANT
// ===============================================================

function checkStoredApiKey() {
    const key = localStorage.getItem("vetcare_gemini_api_key");
    const dot = document.getElementById("apiKeyStatusDot");
    if (dot && dot.classList) {
        if (key && key.trim().length > 10) {
            dot.className = "w-2 h-2 rounded-full bg-emerald-500 animate-pulse";
            dot.title = "Gemini AI Key सक्रिय";
        } else {
            dot.className = "w-2 h-2 rounded-full bg-slate-400";
            dot.title = "Gemini AI Key दर्ज नहीं";
        }
    }
}

window.openApiKeyModal = function() {
    const modal = document.getElementById("apiKeyModal");
    const input = document.getElementById("geminiApiKeyInput");
    if (modal && modal.classList) {
        modal.style.display = "flex";
        modal.classList.remove("hidden");
    }
    if (input) {
        input.value = localStorage.getItem("vetcare_gemini_api_key") || "";
    }
};

window.closeApiKeyModal = function() {
    const modal = document.getElementById("apiKeyModal");
    if (modal && modal.classList) {
        modal.style.display = "none";
        modal.classList.add("hidden");
    }
};

window.saveGeminiApiKey = function() {
    const input = document.getElementById("geminiApiKeyInput");
    const val = input ? input.value.trim() : "";
    if (!val || val.length < 15) {
        showToast("कृपया वैध Google Gemini API Key दर्ज करें!", "error");
        return;
    }
    localStorage.setItem("vetcare_gemini_api_key", val);
    checkStoredApiKey();
    window.closeApiKeyModal();
    showToast("Gemini API Key सुरक्षित कर ली गई!", "success");
};

window.clearStoredApiKey = function() {
    localStorage.removeItem("vetcare_gemini_api_key");
    const input = document.getElementById("geminiApiKeyInput");
    if (input) input.value = "";
    checkStoredApiKey();
    showToast("Gemini API Key हटा दी गई।", "info");
};

window.closeGeminiAiPanel = function() {
    const panel = document.getElementById("geminiAiPanel");
    if (panel && panel.classList) {
        panel.classList.add("hidden");
    }
};

window.runGeminiAiConsultation = async function() {
    const apiKey = localStorage.getItem("vetcare_gemini_api_key");
    if (!apiKey) {
        showToast("कृपया पहले 'AI कुंजी' बटन से अपनी Gemini API Key दर्ज करें!", "error");
        window.openApiKeyModal();
        return;
    }

    const species = document.getElementById("diagSpecies")?.value || "Bovine";
    const cardinalSign = document.getElementById("diagCardinalSign")?.value || "NONE";
    const tempInput = document.getElementById("diagTemp")?.value || "101.5";
    const mucous = document.getElementById("diagMucous")?.value || "Normal";
    const urine = document.getElementById("diagUrine")?.value || "Normal";
    const dung = document.getElementById("diagDung")?.value || "Normal";
    const weight = document.getElementById("animalWeightKg")?.value || "350";
    const preg = document.getElementById("animalPregnancyStatus")?.value || "non-pregnant";

    const checkedBoxes = document.querySelectorAll(".diag-symptom-cb:checked");
    const symptoms = Array.from(checkedBoxes).map(cb => cb.value).join(", ") || "कोई अतिरिक्त लक्षण नहीं";

    const panel = document.getElementById("geminiAiPanel");
    const loading = document.getElementById("geminiAiLoading");
    const content = document.getElementById("geminiAiResponseContent");

    if (panel && panel.classList) panel.classList.remove("hidden");
    if (loading && loading.classList) loading.classList.remove("hidden");
    if (content) content.innerHTML = "";

    const promptText = `You are a Senior Veterinary Clinical Pathologist. Analyze the following patient vitals and symptoms, and provide a rapid, professional differential diagnosis in clean Devanagari Hindi (with English drug names):
Patient:
- Species: ${species}
- Body Weight: ${weight} kg
- Pregnancy Status: ${preg}
- Temperature: ${tempInput} °F
- Cardinal Sign: ${cardinalSign}
- Mucous Membrane: ${mucous}
- Urine Status: ${urine}
- Dung/Stool: ${dung}
- Observed Symptoms: ${symptoms}

Please structure your clinical answer as:
1. 🔬 शीर्ष 2 संभावित रोग (Top 2 Differentials with % confidence)
2. 💊 अनुशंसित आपातकालीन उपचार व औषधियां (Drug doses calculated for ${weight}kg)
3. ⚠️ गर्भावस्था एवं टॉक्सिकोलॉजी चेतावनी (Safety alerts for ${preg} status)
4. 🌾 सहायक देखभाल व डाइट निर्देश. Keep response clear, direct, and actionable.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: promptText }]
                }]
            })
        });

        if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            throw new Error(errJson.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!candidate) {
            throw new Error("Gemini AI से कोई वैध प्रत्युत्तर प्राप्त नहीं हुआ।");
        }

        // Simple formatting parser from markdown bullets to styled HTML
        const formattedHtml = candidate
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-950 font-bold">$1</strong>')
            .replace(/^\s*\*\s(.*)$/gm, '<div class="flex items-start gap-1.5 my-1"><span class="text-indigo-600 font-bold">•</span><span>$1</span></div>')
            .replace(/\n\n/g, '<br/>');

        if (content) {
            content.innerHTML = `
                <div class="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm leading-relaxed font-devanagari">
                    ${formattedHtml}
                </div>
            `;
        }
        showToast("Gemini AI Live Consultation संपन्न हुआ!", "success");
    } catch (err) {
        console.error("Gemini API Error:", err);
        if (content) {
            content.innerHTML = `
                <div class="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl font-devanagari text-xs">
                    <strong>त्रुटि:</strong> Gemini API से संपर्क नहीं हो सका (${escapeHtml(err.message)})। कृपया अपनी API Key जांचें।
                </div>
            `;
        }
    } finally {
        if (loading && loading.classList) loading.classList.add("hidden");
    }
};

// ===============================================================
// 7. DUAL-BANK PAYMENT GATEWAY LOGIC (SBI & PNB)
// ===============================================================

window.openPaymentModal = function() {
    try {
        const modal = document.getElementById("paymentModal");
        if (modal) {
            modal.style.display = "flex";
            if (modal.classList) modal.classList.remove("hidden");
        }
        if (document.body && document.body.classList) {
            document.body.classList.add("modal-active");
        }
        updatePaymentGatewayUI();
    } catch (err) {
        console.error("Payment modal error:", err);
    }
};

window.closePaymentModal = function() {
    try {
        const modal = document.getElementById("paymentModal");
        if (modal) {
            modal.style.display = "none";
            if (modal.classList) modal.classList.add("hidden");
        }
        if (document.body && document.body.classList) {
            document.body.classList.remove("modal-active");
        }
    } catch (err) {
        console.error("Close payment modal error:", err);
    }
};

window.selectBankTab = function(bankKey) {
    if (bankKey !== "sbi" && bankKey !== "pnb") return;
    currentActiveBank = bankKey;

    const sbiBtn = document.getElementById("tabSbiBtn");
    const pnbBtn = document.getElementById("tabPnbBtn");

    if (bankKey === "sbi") {
        if (sbiBtn) sbiBtn.className = "flex-1 py-2 rounded-lg bg-white shadow-sm text-brand-700 transition flex items-center justify-center gap-1.5 font-devanagari font-bold";
        if (pnbBtn) pnbBtn.className = "flex-1 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1.5 font-devanagari font-semibold";
        showToast("प्राथमिक बैंक: State Bank of India सक्रिय", "info");
    } else {
        if (pnbBtn) pnbBtn.className = "flex-1 py-2 rounded-lg bg-white shadow-sm text-rose-700 transition flex items-center justify-center gap-1.5 font-devanagari font-bold";
        if (sbiBtn) sbiBtn.className = "flex-1 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1.5 font-devanagari font-semibold";
        showToast("बैकअप बैंक: Punjab National Bank सक्रिय", "info");
    }

    updatePaymentGatewayUI();
};

window.handlePlanChange = function(amount, label) {
    currentSelectedPlan.amount = Number(amount);
    currentSelectedPlan.label = label;

    const monthlyLabel = document.getElementById("planMonthlyLabel");
    const yearlyLabel = document.getElementById("planYearlyLabel");

    if (currentSelectedPlan.amount === 199) {
        if (monthlyLabel) monthlyLabel.className = "cursor-pointer border-2 border-brand-500 bg-brand-50/50 p-3 rounded-2xl flex flex-col justify-between transition-all relative";
        if (yearlyLabel) yearlyLabel.className = "cursor-pointer border-2 border-slate-200 hover:border-slate-300 p-3 rounded-2xl flex flex-col justify-between transition-all relative";
    } else {
        if (yearlyLabel) yearlyLabel.className = "cursor-pointer border-2 border-amber-500 bg-amber-50/30 p-3 rounded-2xl flex flex-col justify-between transition-all relative";
        if (monthlyLabel) monthlyLabel.className = "cursor-pointer border-2 border-slate-200 hover:border-slate-300 p-3 rounded-2xl flex flex-col justify-between transition-all relative";
    }

    updatePaymentGatewayUI();
};

function updatePaymentGatewayUI() {
    const bank = VETCARE_PAYMENT_CONFIG[currentActiveBank] || VETCARE_PAYMENT_CONFIG.sbi;
    const amount = currentSelectedPlan.amount;

    const upiIdEl = document.getElementById("gatewayUpiIdText");
    const accNoEl = document.getElementById("gatewayAccNoText");
    const ifscEl = document.getElementById("gatewayIfscText");
    const branchEl = document.getElementById("gatewayBranchText");
    const qrImageEl = document.getElementById("gatewayQrImage");
    const intentLink = document.getElementById("gatewayUpiIntentLink");
    const intentBtnText = document.getElementById("intentBtnText");

    if (upiIdEl) upiIdEl.textContent = bank.upiId;
    if (accNoEl) accNoEl.textContent = bank.accNo;
    if (ifscEl) ifscEl.textContent = bank.ifsc;
    if (branchEl) branchEl.textContent = bank.branch;

    const upiPayload = `upi://pay?pa=${encodeURIComponent(bank.upiId)}&pn=${encodeURIComponent(VETCARE_PAYMENT_CONFIG.payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Vetcare Pro ' + currentSelectedPlan.label)}`;

    if (qrImageEl) {
        qrImageEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=4&data=${encodeURIComponent(upiPayload)}`;
    }

    if (intentLink) {
        intentLink.href = upiPayload;
    }

    if (intentBtnText) {
        intentBtnText.textContent = `1-क्लिक भुगतान खोलें (₹${amount.toLocaleString('en-IN')} Pay Now)`;
    }
}

window.copyGatewayDetail = function(elementId, labelName) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const textToCopy = el.textContent.trim();

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`${labelName} कॉपी हो गया: ${textToCopy}`, "success");
        }).catch(() => {
            fallbackCopy(textToCopy, labelName);
        });
    } else {
        fallbackCopy(textToCopy, labelName);
    }
};

function fallbackCopy(text, labelName) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand("copy");
        showToast(`${labelName} कॉपी हो गया!`, "success");
    } catch (err) {
        showToast("कॉपी नहीं हो सका, कृपया हाथ से नोट करें।", "error");
    }
    document.body.removeChild(textArea);
}

window.submitUtrVerification = function() {
    const utrInput = document.getElementById("utrRefInput");
    const utrVal = utrInput ? utrInput.value.trim() : "";

    if (!utrVal || utrVal.length < 8) {
        showToast("कृपया वैध 12-अंक UPI / UTR Reference नंबर दर्ज करें!", "error");
        return;
    }

    const verifiedRecord = {
        utr: utrVal,
        amount: currentSelectedPlan.amount,
        plan: currentSelectedPlan.label,
        bank: currentActiveBank.toUpperCase(),
        timestamp: new Date().toISOString(),
        status: "ACTIVE_PREMIUM"
    };

    localStorage.setItem("vetcare_pro_subscription", JSON.stringify(verifiedRecord));
    showToast("धन्यवाद! UTR सत्यापित हुआ। आपकी प्रो सदस्यता तत्काल सक्रिय की गई।", "success");

    if (utrInput) utrInput.value = "";
    setTimeout(window.closePaymentModal, 1500);
};

// ==========================================
// 8. APPLICATION TAB NAVIGATION
// ==========================================

window.switchAppTab = function(tabId) {
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach(el => {
        if (el && el.classList) el.classList.add("hidden");
    });

    const target = document.getElementById(tabId);
    if (target && target.classList) target.classList.remove("hidden");

    const tabNavs = document.querySelectorAll(".tab-btn");
    tabNavs.forEach(btn => {
        if (btn && btn.classList) btn.classList.remove("active");
    });

    const activeBtn = document.getElementById(`tabNav-${tabId}`);
    if (activeBtn && activeBtn.classList) activeBtn.classList.add("active");

    if (tabId === "libTab") renderDiseaseDirectory();
    if (tabId === "khataTab") renderKhataLedger();
};

// ==========================================
// 9. OPD PRESCRIPTION & WHATSAPP ENGINE
// ==========================================

function setupDefaultPrescriptionMedicines() {
    appMedicationRows = [
        {
            drugName: "Inj. Ceftiofur Sodium (Intraceft)",
            dose: "1 gm (350kg अनुसार)",
            route: "Intramuscular (IM)",
            duration: "3 दिन"
        },
        {
            drugName: "Inj. Flunixin Meglumine (Megludyne)",
            dose: "15 ml",
            route: "Intravenous (IV)",
            duration: "3 दिन"
        },
        {
            drugName: "Inj. Tribivet (B1, B6, B12)",
            dose: "10 ml",
            route: "Intramuscular (IM)",
            duration: "3 दिन"
        }
    ];
    renderMedicationRowsInput();
}

function renderMedicationRowsInput() {
    const container = document.getElementById("medicinesContainer");
    if (!container) return;

    container.innerHTML = "";
    appMedicationRows.forEach((row, index) => {
        const isAlert = row.drugName.includes("वर्जित") || row.drugName.includes("ABORTIFACIENT");
        const div = document.createElement("div");
        div.className = `grid grid-cols-12 gap-1.5 items-center p-2 rounded-xl border text-xs ${isAlert ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'}`;
        div.innerHTML = `
            <div class="col-span-5">
                <input type="text" value="${escapeHtml(row.drugName)}" placeholder="दवा का नाम" class="w-full px-2 py-1.5 border rounded bg-white font-medium ${isAlert ? 'text-rose-700 font-bold' : ''}" oninput="window.updateMedRow(${index}, 'drugName', this.value)">
            </div>
            <div class="col-span-2">
                <input type="text" value="${escapeHtml(row.dose)}" placeholder="मात्रा" class="w-full px-2 py-1.5 border rounded bg-white text-center font-semibold" oninput="window.updateMedRow(${index}, 'dose', this.value)">
            </div>
            <div class="col-span-3">
                <select class="w-full px-1.5 py-1.5 border rounded bg-white text-[11px]" onchange="window.updateMedRow(${index}, 'route', this.value)">
                    <option value="IM" ${row.route.includes("IM") ? "selected" : ""}>IM (मांसपेशी)</option>
                    <option value="IV" ${row.route.includes("IV") ? "selected" : ""}>IV (नस में)</option>
                    <option value="SC" ${row.route.includes("SC") ? "selected" : ""}>SC (चमड़ी में)</option>
                    <option value="Oral" ${row.route.includes("Oral") ? "selected" : ""}>Oral (मुख से)</option>
                    <option value="Intramammary" ${row.route.includes("Intramammary") ? "selected" : ""}>थन में (Intramammary)</option>
                    <option value="Topical" ${row.route.includes("Topical") ? "selected" : ""}>बाहरी लेप (Topical)</option>
                </select>
            </div>
            <div class="col-span-1">
                <input type="text" value="${escapeHtml(row.duration)}" placeholder="दिन" class="w-full px-1 py-1.5 border rounded bg-white text-center text-[10px]" oninput="window.updateMedRow(${index}, 'duration', this.value)">
            </div>
            <div class="col-span-1 text-center">
                <button type="button" onclick="window.removeMedicationRow(${index})" class="text-rose-500 hover:text-rose-700 p-1" title="हटाएं">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

window.addMedicationRow = function(defaultName = "", defaultDose = "", defaultRoute = "IM", defaultDuration = "3 दिन") {
    appMedicationRows.push({
        drugName: defaultName,
        dose: defaultDose,
        route: defaultRoute,
        duration: defaultDuration
    });
    renderMedicationRowsInput();
    window.updateLivePrescription();
};

window.removeMedicationRow = function(index) {
    if (appMedicationRows.length <= 1) {
        showToast("पर्ची में कम से कम एक दवा पंक्ति होना आवश्यक है!", "error");
        return;
    }
    appMedicationRows.splice(index, 1);
    renderMedicationRowsInput();
    window.updateLivePrescription();
};

window.updateMedRow = function(index, field, value) {
    if (appMedicationRows[index]) {
        appMedicationRows[index][field] = value;
        window.updateLivePrescription();
    }
};

window.clearOpdForm = function() {
    const fields = [
        "ownerName", "ownerPhone", "ownerAddress",
        "animalBreedSex", "animalAge",
        "vitalTemp", "vitalHR", "vitalRR", "vitalRumen",
        "opdDiagnosisInput", "opdAdvice"
    ];
    fields.forEach(f => {
        const el = document.getElementById(f);
        if (el) el.value = "";
    });

    const pregSelect = document.getElementById("animalPregnancyStatus");
    if (pregSelect) pregSelect.value = "non-pregnant";
    window.handlePregnancyStatusChange();

    setupDefaultPrescriptionMedicines();
    window.updateLivePrescription();
    showToast("OPD फॉर्म खाली कर दिया गया है।", "info");
};

window.updateLivePrescription = function() {
    const owner = document.getElementById("ownerName")?.value.trim() || "रमेश कुमार";
    const phone = document.getElementById("ownerPhone")?.value.trim() || "98XXXXXXXX";
    const address = document.getElementById("ownerAddress")?.value.trim() || "स्थानीय पता";
    const species = document.getElementById("animalSpecies")?.value || "गाय (Cattle)";
    const breedSex = document.getElementById("animalBreedSex")?.value.trim() || "HF Cross";
    const age = document.getElementById("animalAge")?.value.trim() || "4 वर्ष";
    const weight = document.getElementById("animalWeightKg")?.value.trim() || "350";
    const diag = document.getElementById("opdDiagnosisInput")?.value.trim() || "Bovine Mastitis (संदिग्ध)";
    const advice = document.getElementById("opdAdvice")?.value.trim() || "ठंडा व सुपाच्य चारा दें। पानी प्रचुर मात्रा में पिलाएं।";

    const vTemp = document.getElementById("vitalTemp")?.value || "101.5";
    const vHR = document.getElementById("vitalHR")?.value || "60";
    const vRR = document.getElementById("vitalRR")?.value || "24";
    const vRumen = document.getElementById("vitalRumen")?.value || "3";

    const totalFee = parseFloat(document.getElementById("opdTotalFee")?.value || 0);
    const paidFee = parseFloat(document.getElementById("opdPaidFee")?.value || 0);
    const dueFee = Math.max(0, totalFee - paidFee);

    setText("slipOwner", owner);
    setText("slipPhone", phone);
    setText("slipAddress", address);
    setText("slipSpeciesBreed", `${species} | ${breedSex}`);
    setText("slipAgeWeight", `${age} | ${weight} kg`);
    setText("slipDiagnosis", diag);
    setText("slipAdviceText", advice);

    setText("slipVTemp", vTemp);
    setText("slipVHR", vHR);
    setText("slipVRR", vRR);
    setText("slipVRumen", vRumen);
    setText("slipDueFee", `₹${dueFee.toLocaleString('en-IN')}`);

    const now = new Date();
    setText("slipDate", `दिनांक: ${now.toLocaleDateString("en-GB")}`);

    const tableBody = document.getElementById("slipMedicinesTable");
    if (tableBody) {
        tableBody.innerHTML = "";
        appMedicationRows.forEach((row, i) => {
            const isAlert = row.drugName.includes("वर्जित") || row.drugName.includes("ABORTIFACIENT");
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="py-1 px-1.5 text-slate-400 font-mono">${i + 1}</td>
                <td class="py-1 px-1.5 font-bold ${isAlert ? 'text-rose-700' : 'text-slate-800'}">${escapeHtml(row.drugName || "-")}</td>
                <td class="py-1 px-1.5 font-semibold text-brand-800">${escapeHtml(row.dose || "-")}</td>
                <td class="py-1 px-1.5 text-slate-600">${escapeHtml(row.route || "-")}</td>
                <td class="py-1 px-1.5 text-slate-600">${escapeHtml(row.duration || "-")}</td>
            `;
            tableBody.appendChild(tr);
        });
    }
};

window.dispatchToWhatsApp = function() {
    const owner = document.getElementById("ownerName")?.value.trim() || "पशुपालक";
    const rawPhone = document.getElementById("ownerPhone")?.value || "";
    const phone = rawPhone.replace(/\D/g, "");

    if (!phone || phone.length < 10) {
        showToast("कृपया 10 अंकों का मान्य WhatsApp मोबाइल नंबर दर्ज करें!", "error");
        return;
    }

    const species = document.getElementById("animalSpecies")?.value || "पशु";
    const breed = document.getElementById("animalBreedSex")?.value || "-";
    const weight = document.getElementById("animalWeightKg")?.value || "350";
    const diag = document.getElementById("opdDiagnosisInput")?.value || "रोग निदान";
    const vTemp = document.getElementById("vitalTemp")?.value || "सामान्य";
    const advice = document.getElementById("opdAdvice")?.value || "सावधानी रखें।";
    const totalFee = document.getElementById("opdTotalFee")?.value || "0";
    const dueFee = document.getElementById("slipDueFee")?.textContent || "₹0";

    const isPregnant = (document.getElementById("animalPregnancyStatus")?.value === "pregnant");

    let medText = "";
    appMedicationRows.forEach((m, i) => {
        medText += `${i + 1}. *${m.drugName}* (${m.dose}) - मार्ग: ${m.route}, अवधि: ${m.duration}\n`;
    });

    const msg = `🐾 *VETCARE CLINICAL OPD PRESCRIPTION* 🐾\n` +
        `-----------------------------------------\n` +
        `👤 *पशुपालक:* ${owner}\n` +
        `🐄 *पशु:* ${species} (${breed}) | भार: ${weight} kg\n` +
        `${isPregnant ? '⚠️ *गर्भावस्था स्थिति: गर्भवती (PREGNANT)*\n' : ''}` +
        `🌡️ *तापमान (Temp):* ${vTemp} °F\n` +
        `🔬 *संभावित निदान:* *${diag}*\n` +
        `-----------------------------------------\n` +
        `💊 *औषधियाँ व उपचार (Rx Treatment):*\n` +
        `${medText}` +
        `-----------------------------------------\n` +
        `🌾 *सलाह एवं परहेज:* ${advice}\n` +
        `💰 *कुल शुल्क:* ₹${totalFee} | *बकाया राशि:* ${dueFee}\n` +
        `-----------------------------------------\n` +
        `डॉ. आर. के. शर्मा (पशु चिकित्सालय)\n` +
        `आपातकालीन संपर्क: +91 94140 XXXXX`;

    const waUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
    showToast("WhatsApp डिस्पैच तैयार!", "success");
};

// ==========================================
// 10. UNLIMITED DISEASE CODEX DIRECTORY
// ==========================================

function renderDiseaseDirectory() {
    const container = document.getElementById("diseaseDirectoryContainer");
    if (!container) return;

    const searchQ = (document.getElementById("diseaseCodexSearch")?.value || "").toLowerCase();
    const speciesFilter = document.getElementById("diseaseCodexFilterSpecies")?.value || "ALL";
    const categoryFilter = document.getElementById("diseaseCodexFilterCategory")?.value || "ALL";

    container.innerHTML = "";

    const filtered = appDiseases.filter(d => {
        const matchesSearch = d.name.toLowerCase().includes(searchQ) ||
            d.localName.toLowerCase().includes(searchQ) ||
            d.symptoms.some(s => s.toLowerCase().includes(searchQ));

        const matchesSpecies = speciesFilter === "ALL" || d.species.includes(speciesFilter) || d.species.includes("ALL");
        const matchesCategory = categoryFilter === "ALL" || d.category === categoryFilter;

        return matchesSearch && matchesSpecies && matchesCategory;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-12 text-center text-slate-400 font-devanagari text-sm">
                कोई रोग रिकॉर्ड नहीं मिला। आप 'नया रोग जोड़ें' टैब से नया रोग पंजीकृत कर सकते हैं।
            </div>
        `;
        return;
    }

    filtered.forEach(d => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between space-y-3";
        card.innerHTML = `
            <div>
                <div class="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                        <h3 class="font-bold text-slate-900 text-sm font-devanagari">${escapeHtml(d.localName)}</h3>
                        <p class="text-[11px] text-slate-500 font-sans italic">${escapeHtml(d.name)}</p>
                    </div>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 uppercase">${escapeHtml(d.category)}</span>
                </div>

                <div class="text-xs space-y-1.5 mt-2">
                    <div>
                        <strong class="text-slate-700 font-devanagari text-[11px]">प्रमुख लक्षण:</strong>
                        <p class="text-slate-600 text-[11px] line-clamp-2">${escapeHtml(d.symptoms.join(", "))}</p>
                    </div>

                    <div class="bg-brand-50 p-2 rounded-lg border border-brand-100">
                        <strong class="text-brand-900 font-devanagari text-[11px]">प्राथमिक उपचार (Rx):</strong>
                        <p class="text-brand-800 text-[11px] leading-snug mt-0.5">${escapeHtml(d.primaryRx)}</p>
                    </div>

                    ${d.withdrawalNotice ? `
                        <div class="text-[10px] text-amber-800 font-semibold bg-amber-50 px-2 py-1 rounded border border-amber-200">
                            ⚠️ विथड्रॉल अवधि: ${escapeHtml(d.withdrawalNotice)}
                        </div>
                    ` : ""}
                </div>
            </div>

            <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span class="text-[10px] text-slate-400 font-sans">${d.species.join(", ")}</span>
                <button type="button" onclick="window.autoFillPrescription('${d.id}')" class="text-xs text-brand-600 hover:text-brand-800 font-bold font-devanagari flex items-center gap-1">
                    <i class="fa-solid fa-notes-medical"></i> पर्ची बनाएं (Auto-Fill)
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}
window.renderDiseaseDirectory = renderDiseaseDirectory;

window.handleCustomDiseaseSubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById("custDisName")?.value.trim();
    const localName = document.getElementById("custDisLocal")?.value.trim();
    const species = document.getElementById("custDisSpecies")?.value || "Bovine";
    const category = document.getElementById("custDisCategory")?.value || "Bacterial";
    const cardinalKey = document.getElementById("custDisCardinalKey")?.value.trim() || `CARD_${Date.now()}`;
    const rawSymptoms = document.getElementById("custDisSymptoms")?.value.trim();
    const primaryRx = document.getElementById("custDisPrimaryRx")?.value.trim();
    const supportiveRx = document.getElementById("custDisSupportive")?.value.trim();
    const withdrawalNotice = document.getElementById("custDisWithdrawal")?.value.trim();
    const differentials = document.getElementById("custDisDifferentials")?.value.trim();

    if (!name || !localName || !rawSymptoms || !primaryRx) {
        showToast("कृपया सभी आवश्यक फ़ील्ड (*) भरें!", "error");
        return;
    }

    const symptomsArray = rawSymptoms.split(",").map(s => s.trim()).filter(Boolean);

    const newDisease = {
        id: `dis_cust_${Date.now()}`,
        name: name,
        localName: localName,
        species: [species],
        category: category,
        cardinalKey: cardinalKey,
        tempProfile: "HIGH",
        mucousProfile: "CONGESTED",
        urineProfile: "NORMAL",
        dungProfile: "NORMAL",
        symptoms: symptomsArray,
        primaryRx: primaryRx,
        supportiveRx: supportiveRx || "सपोर्टिव थेरेपी एवं आराम।",
        withdrawalNotice: withdrawalNotice || "लागू नहीं",
        differentials: differentials || "क्लीनिकल परीक्षण आवश्यक",
        structuredRx: [
            { drug: primaryRx.substring(0, 40), baseDoseMgPerKg: 2.0, concentrationMgPerMl: 50, route: "IM", duration: "3 दिन", abortifacient: false }
        ]
    };

    saveCustomDiseasesToStorage(newDisease);
    populateSymptomsChecklist();
    renderDiseaseDirectory();

    showToast(`'${localName}' रोग डेटाबेस में पंजीकृत हो गया!`, "success");
    document.getElementById("newDiseaseForm")?.reset();
    window.switchAppTab("libTab");
};

// ==========================================
// 11. KHATA FINANCIAL LEDGER CONTROLLER
// ==========================================

window.calcKhataDue = function() {
    const bill = parseFloat(document.getElementById("khataBill")?.value || 0);
    const paid = parseFloat(document.getElementById("khataPaid")?.value || 0);
    const due = Math.max(0, bill - paid);
    const dueInput = document.getElementById("khataDue");
    if (dueInput) dueInput.value = due;
};

window.handleKhataSubmit = function(e) {
    e.preventDefault();

    const name = document.getElementById("khataName")?.value.trim();
    const phone = document.getElementById("khataPhone")?.value.trim();
    const village = document.getElementById("khataVillage")?.value.trim();
    const bill = parseFloat(document.getElementById("khataBill")?.value || 0);
    const paid = parseFloat(document.getElementById("khataPaid")?.value || 0);
    const note = document.getElementById("khataNote")?.value.trim();

    const due = Math.max(0, bill - paid);

    const newRecord = {
        id: `kht_${Date.now()}`,
        name: name,
        phone: phone,
        village: village || "अज्ञात",
        date: new Date().toISOString().split("T")[0],
        bill: bill,
        paid: paid,
        due: due,
        note: note || "क्लिनिकल सेवा"
    };

    appKhataLedger.unshift(newRecord);
    saveKhataLedgerToStorage();
    renderKhataLedger();

    showToast(`खाता प्रविष्टि जोड़ी गई: ${name} (बकाया: ₹${due})`, "success");
    document.getElementById("khataEntryForm")?.reset();
    const dueInput = document.getElementById("khataDue");
    if (dueInput) dueInput.value = "";
};

function renderKhataLedger() {
    const tableBody = document.getElementById("khataLedgerTableBody");
    if (!tableBody) return;

    const query = (document.getElementById("khataSearch")?.value || "").toLowerCase();

    tableBody.innerHTML = "";
    let totalBilled = 0;
    let totalReceived = 0;
    let totalDue = 0;

    const filtered = appKhataLedger.filter(k => {
        return k.name.toLowerCase().includes(query) || k.phone.includes(query);
    });

    appKhataLedger.forEach(k => {
        totalBilled += (Number(k.bill) || 0);
        totalReceived += (Number(k.paid) || 0);
        totalDue += (Number(k.due) || 0);
    });

    setText("statTotalBilled", `₹${totalBilled.toLocaleString("en-IN")}`);
    setText("statTotalReceived", `₹${totalReceived.toLocaleString("en-IN")}`);
    setText("statTotalDue", `₹${totalDue.toLocaleString("en-IN")}`);

    if (filtered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-6 text-slate-400 font-devanagari">
                    कोई खाता प्रविष्टि उपलब्ध नहीं है।
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach(k => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-50 transition border-b border-slate-100";
        tr.innerHTML = `
            <td class="py-2.5 px-2.5">
                <strong class="text-slate-800 font-devanagari block">${escapeHtml(k.name)}</strong>
                <span class="text-[10px] text-slate-500 font-mono">${escapeHtml(k.phone)}</span>
            </td>
            <td class="py-2.5 px-2.5 text-slate-600 font-devanagari">${escapeHtml(k.village)}</td>
            <td class="py-2.5 px-2.5 text-slate-500 font-mono text-[11px]">${escapeHtml(k.date)}</td>
            <td class="py-2.5 px-2.5 font-bold text-slate-900 font-sans">₹${k.bill.toLocaleString("en-IN")}</td>
            <td class="py-2.5 px-2.5 font-bold text-emerald-700 font-sans">₹${k.paid.toLocaleString("en-IN")}</td>
            <td class="py-2.5 px-2.5 font-bold font-sans ${k.due > 0 ? 'text-rose-600' : 'text-slate-400'}">₹${k.due.toLocaleString("en-IN")}</td>
            <td class="py-2.5 px-2.5 text-center">
                <div class="flex items-center justify-center gap-1.5">
                    ${k.due > 0 ? `
                        <button type="button" onclick="window.sendKhataWhatsAppReminder('${k.id}')" title="WhatsApp पर तकादा संदेश भेजें" class="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-xs transition">
                            <i class="fa-brands fa-whatsapp"></i>
                        </button>
                    ` : ""}
                    <button type="button" onclick="window.deleteKhataEntry('${k.id}')" title="हटाएं" class="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs transition">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}
window.renderKhataLedger = renderKhataLedger;

window.sendKhataWhatsAppReminder = function(khataId) {
    const record = appKhataLedger.find(k => k.id === khataId);
    if (!record) return;

    const phone = record.phone.replace(/\D/g, "");
    if (!phone || phone.length < 10) {
        showToast("अमान्य WhatsApp नंबर!", "error");
        return;
    }

    const msg = `नमस्ते श्री *${record.name}* जी,\n\n` +
        `यह *Vetcare Services* से आपके पशु चिकित्सा एवं दवाओं के बकाया भुगतान हेतु विनम्र स्मरण पत्र है:\n\n` +
        `📋 *विवरण:* ${record.note}\n` +
        `💵 *कुल बिल:* ₹${record.bill}\n` +
        `✅ *जमा राशि:* ₹${record.paid}\n` +
        `🔴 *शेष बकाया राशि:* *₹${record.due}*\n\n` +
        `कृपया इस बकाया राशि का भुगतान ऑनलाइन UPI या क्लिनिक पर शीघ्रातिशीघ्र करने की कृपा करें।\n` +
        `सधन्यवाद,\n*Vetcare Services* | +91 94140 XXXXX`;

    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`, "_blank");
    showToast("तकादा संदेश WhatsApp पर भेजा जा रहा है...", "info");
};

window.deleteKhataEntry = function(khataId) {
    if (!confirm("क्या आप वाकई इस खाता प्रविष्टि को हटाना चाहते हैं?")) return;
    appKhataLedger = appKhataLedger.filter(k => k.id !== khataId);
    saveKhataLedgerToStorage();
    renderKhataLedger();
    showToast("खाता प्रविष्टि हटाई गई।", "info");
};

// ==========================================
// 12. UTILITY & TOAST HELPER FUNCTIONS
// ==========================================

function setText(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = text;
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    const bgClass = type === "success" ? "bg-slate-900 border-l-4 border-emerald-500 text-white" :
        (type === "error" ? "bg-rose-900 border-l-4 border-rose-400 text-white" :
            "bg-slate-900 border-l-4 border-amber-500 text-white");

    toast.className = `${bgClass} px-4 py-3 rounded-xl shadow-xl text-xs font-devanagari flex items-center gap-2 transform transition-all duration-300 translate-y-2 opacity-0 pointer-events-auto`;
    toast.innerHTML = `
        <span class="text-sm">${type === "success" ? "✓" : (type === "error" ? "⚠️" : "ℹ️")}</span>
        <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.remove("translate-y-2", "opacity-0");
    });

    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => {
            if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }, 3500);
}
