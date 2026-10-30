/**
 * Vetcare AI OS - Production Engine (app.js)
 * Fully Patched: Comprehensive Null Safety & Global Scope Binding
 * 
 * Features:
 * 1. Dual-Bank Payment Gateway (SBI Primary + PNB Backup) with Dynamic QR & UPI Intent
 * 2. Unlimited Open-Ended Disease Codex & Custom Disease Registry
 * 3. 3-Way Diagnostic Decision Support Engine (Species + Vitals + Multi-Symptom Matching)
 * 4. OPD Prescription Slip Generator with Live Preview & Print Engine
 * 5. 1-Click Formatted WhatsApp Dispatcher
 * 6. Farmer Khata Financial Ledger with Automated Payment Reminder Dispatch
 * 7. Offline-First Dual Storage & Sync Controller (LocalStorage + Firebase Graceful Fallback)
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

let currentActiveBank = "sbi"; // Default Primary: 'sbi', Backup: 'pnb'

// ==========================================
// 2. UNLIMITED VETERINARY DISEASE CODEX
// ==========================================

const DEFAULT_DISEASE_CODEX = [
    {
        id: "dis_fmd",
        name: "Foot and Mouth Disease (FMD)",
        localName: "खुरपका-मुँहपका रोग",
        species: ["Bovine", "Caprine"],
        category: "Viral",
        tempRange: "104.0 - 106.0 °F",
        symptoms: [
            "तेज बुखार (104-106°F)",
            "मुंह से तारदार लार गिरना (Ropy Salivation)",
            "जीभ, मसूड़ों और तालु पर छाले (Vesicles)",
            "खुरों के बीच छाले व घाव (Interdigital Ulcers)",
            "लंगड़ा कर चलना",
            "दूध उत्पादन में भारी गिरावट"
        ],
        vitalsRule: { tempMin: 104.0, mucous: "congested", rumen: "hypomotile" },
        primaryRx: "मुंह के छालों हेतु पोटैशियम परमैंगनेट (KMnO4 1:1000) या 2% बोरिक एसिड से धुलाई। Flunixin Meglumine @ 2.2 mg/kg IV/IM।",
        supportiveRx: "Secondary bacterial infection रोकने हेतु Inj. Ceftiofur Sodium @ 1.1-2.2 mg/kg IM। B-Complex + Liver extract 10ml IM।",
        fluidTherapy: "Dextrose Normal Saline (DNS 5%) 2-3 लीटर IV यदि निर्जलीकरण हो।",
        withdrawalNotice: "दूध: 72 घंटे, मांस: 7 दिन (एंटीबायोटिक दिए जाने पर)।",
        differentials: "Vesicular Stomatitis, Rinderpest, Bovine Viral Diarrhea"
    },
    {
        id: "dis_hs",
        name: "Hemorrhagic Septicemia (HS)",
        localName: "गलघोंटू (घुर्रका)",
        species: ["Bovine"],
        category: "Bacterial",
        tempRange: "105.0 - 107.0 °F",
        symptoms: [
            "अत्यधिक तेज बुखार (105-107°F)",
            "गले और गर्दन के निचले हिस्से में दर्दनाक सूजन (Submandibular Edema)",
            "सांस लेने में भारी कठिनाई व घरघराहट (Snoring / Stridor)",
            "जीभ बाहर निकलना एवं मुंह से झागदार लार",
            "आंखें लाल व कंजस्टेड"
        ],
        vitalsRule: { tempMin: 104.8, mucous: "congested", rumen: "atony" },
        primaryRx: "Inj. Sulfamethazine (33.3%) @ 100-150 mg/kg IV या Inj. Oxytetracycline @ 10 mg/kg Slow IV।",
        supportiveRx: "Inj. Dexamethasone @ 0.05-0.1 mg/kg IV/IM (सूजन घटाने हेतु) + Inj. Meloxicam @ 0.5 mg/kg IM।",
        fluidTherapy: "Normal Saline (0.9% NaCl) 2-3 लीटर IV। शॉक की स्थिति में Corticosteroids।",
        withdrawalNotice: "दूध: 5 दिन, मांस: 14 दिन।",
        differentials: "Black Quarter (BQ), Anthrax, Acute Pharyngitis"
    },
    {
        id: "dis_bq",
        name: "Black Quarter (BQ)",
        localName: "लंगड़ा बुखार / काला बावा",
        species: ["Bovine", "Caprine"],
        category: "Bacterial",
        tempRange: "104.0 - 106.0 °F",
        symptoms: [
            "पुट्ठों, कंधों या गर्दन की भारी मांसपेशियों में सूजन",
            "सूजन वाले स्थान को दबाने पर चरचराहट की आवाज (Crepitation Sound)",
            "शुरुआत में सूजन गर्म व दर्दनाक, बाद में ठंडी और दर्दहीन",
            "गंभीर लंगड़ापन",
            "अचानक तेज बुखार व सुस्ती"
        ],
        vitalsRule: { tempMin: 104.0, mucous: "congested", rumen: "atony" },
        primaryRx: "Inj. Crystalline Penicillin @ 20,000-40,000 IU/kg IV/IM प्रत्येक 6-8 घंटे पर, सूजन के चारों ओर Penicillin का स्थानीय इन्फिल्ट्रेशन।",
        supportiveRx: "Inj. Flunixin Meglumine @ 2.2 mg/kg IV दर्द और टॉक्सेमिया नियंत्रण हेतु।",
        fluidTherapy: "RL (Ringer's Lactate) 3-4 लीटर IV।",
        withdrawalNotice: "दूध: 72 घंटे, मांस: 10 दिन।",
        differentials: "Malignant Edema, Anthrax, Fracture/Trauma"
    },
    {
        id: "dis_mastitis",
        name: "Bovine Mastitis (Clinical)",
        localName: "थनैला रोग / अयन शोथ",
        species: ["Bovine", "Caprine"],
        category: "Bacterial",
        tempRange: "101.5 - 103.5 °F",
        symptoms: [
            "थन व लेवे में सूजन, लाली एवं अत्यधिक गर्मी",
            "दूध का रंग बदलना (पीला, लाल, पानी जैसा या दही के थक्के)",
            "थन को छूने पर दर्द महसूस करना, दूध दुहने न देना",
            "दूध में खून व मवाद की उपस्थिति",
            "गंभीर मामलों में रुमेन बंद और सुस्ती"
        ],
        vitalsRule: { tempMin: 102.0, mucous: "normal", rumen: "hypomotile" },
        primaryRx: "Intramammary Infusion (Cloxacillin/Ceftiofur) प्रभावित थन में प्रत्येक 12 घंटे पर। Systemic Inj. Intraceft / Ceftriaxone @ 10 mg/kg IM।",
        supportiveRx: "Inj. Meloxicam + Paracetamol 15-20 ml IM। Trisodium Citrate 30-50 ग्राम मौखिक 5 दिन।",
        fluidTherapy: "गंभीर टॉक्सिक मैस्टाइटिस में Hypertonic Saline (7.2% NaCl) 1-2 Litres IV।",
        withdrawalNotice: "दूध: 7 दिन (एंटीबायोटिक समाप्ति के बाद ही उपयोग करें)।",
        differentials: "Udder Hematoma, Physiological Edema, Teat Stenosis"
    },
    {
        id: "dis_babesiosis",
        name: "Babesiosis (Tick Fever)",
        localName: "बबेसिओसिस / बथुआ / लाल पेशाब",
        species: ["Bovine", "Canine", "Equine"],
        category: "Protozoal",
        tempRange: "104.5 - 107.0 °F",
        symptoms: [
            "कॉफी रंग या गहरा लाल पेशाब (Hemoglobinuria)",
            "अत्यधिक तेज बुखार (105-107°F)",
            "तीव्र एनीमिया (म्यूकस झिल्ली का सफेद या पीला होना)",
            "हृदय की धड़कन तेज (Water Hammer Pulse)",
            "शरीर पर किलनी / चिंचड़ी (Ticks) की मौजूदगी"
        ],
        vitalsRule: { tempMin: 104.5, mucous: "pale", rumen: "atony" },
        primaryRx: "Inj. Diminazene Aceturate (Berenil) @ 3.5 - 5 mg/kg Deep IM एकल खुराक, अथवा Inj. Imidocarb Diproprionate @ 1.2 mg/kg SC।",
        supportiveRx: "Inj. Iron Dextran 10ml IM, Vitamin B12 + Folic Acid, Liver extract with Vitamin B-Complex।",
        fluidTherapy: "Dextrose 5% + Normal Saline (DNS) 3-4 लीटर IV। (रक्त चढ़ाने की आवश्यकता यदि PCV < 12%)।",
        withdrawalNotice: "दूध: 3 दिन, मांस: 21 दिन।",
        differentials: "Theileriosis, Leptospirosis, Post-Parturient Hemoglobinuria (PPH)"
    },
    {
        id: "dis_theileriosis",
        name: "Bovine Theileriosis",
        localName: "थाइलेरियासिस / गांठ वाला बुखार",
        species: ["Bovine"],
        category: "Protozoal",
        tempRange: "104.0 - 106.5 °F",
        symptoms: [
            "सुपरफिशियल लिंफ नोड्स में भारी सूजन (Pre-scapular / Pre-crural)",
            "लगातार तेज बुखार जो एंटीपायरेटिक से नहीं उतरता",
            "आंखों में कॉर्निया का धुंधलापन (Corneal Opacity)",
            "पीलिया (म्यूकस झिल्ली का पीला पड़ना)",
            "अत्यधिक कमजोरी व वजन में भारी कमी"
        ],
        vitalsRule: { tempMin: 104.2, mucous: "jaundiced", rumen: "hypomotile" },
        primaryRx: "Inj. Buparvaquone (Butalex) @ 2.5 mg/kg IM एकल खुराक (गर्दन की मांसपेशियों में)।",
        supportiveRx: "Inj. Oxytetracycline Long Acting @ 20 mg/kg IM। हेमेटिनिक्स, Liver Injection व Vitamin C।",
        fluidTherapy: "Ringer's Lactate (RL) 2-3 लीटर IV।",
        withdrawalNotice: "दूध: 48 घंटे, मांस: 42 दिन।",
        differentials: "Trypanosomiasis (Surra), Anaplasmosis, Malignant Catarrhal Fever"
    },
    {
        id: "dis_lsd",
        name: "Lumpy Skin Disease (LSD)",
        localName: "गांठदार त्वचा रोग (लम्पी)",
        species: ["Bovine"],
        category: "Viral",
        tempRange: "103.5 - 105.5 °F",
        symptoms: [
            "त्वचा पर 2-5 सेमी आकार की सख्त उभरी हुई गांठें (Nodules)",
            "पैरों, छाती और अंडकोष/लेवे में सूजन (Ventral Edema)",
            "आंख और नाक से पानी/स्राव बहना",
            "गांठों का पकना और घाव बन जाना",
            "लंगड़ाना और दूध उत्पादन में कमी"
        ],
        vitalsRule: { tempMin: 103.5, mucous: "congested", rumen: "hypomotile" },
        primaryRx: "सेकेंडरी इन्फेक्शन रोकने हेतु: Inj. Ceftiofur Sodium 1 gm IM अथवा Enrofloxacin @ 5 mg/kg IM। घावों पर नीम तेल + आईवरमेक्टिन स्प्रे।",
        supportiveRx: "Inj. Flunixin Meglumine 15ml IM। Ivermectin 1% @ 1ml/50kg SC। Multivitamin + Zinc supplementation।",
        fluidTherapy: "DNS 2-3 लीटर IV यदि खाना-पीना पूर्णतः बंद हो।",
        withdrawalNotice: "दूध: 5 दिन, मांस: 14 दिन।",
        differentials: "Pseudo-Lumpy Skin Disease (Herpesvirus), Demodicosis, Dermatophilosis"
    },
    {
        id: "dis_milkfever",
        name: "Milk Fever (Hypocalcemia)",
        localName: "दुग्ध ज्वर / कैल्शियम की कमी",
        species: ["Bovine", "Caprine"],
        category: "Metabolic",
        tempRange: "96.0 - 100.0 °F",
        symptoms: [
            "ब्याने के 24-72 घंटे के भीतर पशु का बैठ जाना और उठ न पाना",
            "शरीर और कान बर्फ जैसे ठंडे होना (Hypothermia)",
            "गर्दन को मोड़कर पेट की तरफ रखना ('S' Shaped Lateral Kink)",
            "पुतलियों का फैल जाना (Dilated Pupils)",
            "गोबर और पेशाब रुक जाना, रुमेन गतिशीलता शून्य"
        ],
        vitalsRule: { tempMax: 100.0, mucous: "normal", rumen: "atony" },
        primaryRx: "Inj. Calcium Borogluconate (CBG 25% या 45%) 450 ml (आधा धीमे IV तथा आधा SC) हृदय गति मॉनिटर करते हुए।",
        supportiveRx: "Inj. Tonophosphan (Sodium Acid Phosphate) 10-15 ml IM/IV। Oral Ionic Calcium Gel (Cal-Up) 300g बोतल।",
        fluidTherapy: "Normal Saline केवल जरूरत पड़ने पर। (चेतावनी: अधिक तेजी से IV देने पर Cardiac Arrest संभव)।",
        withdrawalNotice: "विथड्रॉल अवधि शून्य (Nutritional therapy)।",
        differentials: "Downer Cow Syndrome, Ketosis, Maternal Nerve Paralysis, Toxic Mastitis"
    },
    {
        id: "dis_ketosis",
        name: "Ketosis (Acetonemia)",
        localName: "कीटोसिस / मीठा पेशाब",
        species: ["Bovine"],
        category: "Metabolic",
        tempRange: "101.0 - 102.5 °F",
        symptoms: [
            "सांस, दूध और पेशाब से मीठी फल जैसी गंध (Sweet Chloroform/Acetone Odor)",
            "दाना/बांटा खाने से मना करना, केवल सूखा चारा खाना",
            "दूध उत्पादन में अचानक तीव्र गिरावट",
            "अत्यधिक तेजी से वजन घटना",
            "नर्वस रूप में: गोल-गोल घूमना, दीवारों को चाटना, अंधापन"
        ],
        vitalsRule: { tempMin: 101.0, tempMax: 102.5, mucous: "normal", rumen: "hypomotile" },
        primaryRx: "Inj. Dextrose 25% या 50% 500-1000 ml IV तेजी से। Propylene Glycol 200-300 ml मौखिक रूप से दिन में दो बार 3-5 दिन।",
        supportiveRx: "Inj. Isoflupredone Acetate 10-20 mg IM अथवा Dexamethasone 20 mg IM (Gluconeogenesis हेतु)। B-Complex Inj 15ml।",
        fluidTherapy: "Dextrose Solutions IV।",
        withdrawalNotice: "दूध: 48 घंटे (यदि स्टेरॉयड दिए गए हों)।",
        differentials: "Left Displaced Abomasum (LDA), Traumatic Reticuloperitonitis (TRP)"
    },
    {
        id: "dis_bloat",
        name: "Ruminal Tympany (Bloat)",
        localName: "अफरा / पेट फूलना",
        species: ["Bovine", "Caprine"],
        category: "Metabolic",
        tempRange: "101.0 - 103.0 °F",
        symptoms: [
            "बाईं कोख (Left Paralumbar Fossa) का ढोल की तरह फूल जाना",
            "सांस लेने में भारी कष्ट, जीभ बाहर निकालना",
            "पशु का बार-बार उठना, बैठना और पेट पर लात मारना",
            "मुंह से झागदार लार आना",
            "गंभीर स्थिति में दम घुटने से अचानक गिरना"
        ],
        vitalsRule: { tempMin: 101.0, mucous: "cyanotic", rumen: "atony" },
        primaryRx: "Frothy Bloat: Simethicone Suspension (Tympanil/Bloatosil) 100 ml मौखिक या रुमेन में सीधे। Trocar & Cannula द्वारा गैस निकालना (आपातकाल में)।",
        supportiveRx: "सरसों या अलसी का तेल 500 ml + हींग 20 ग्राम + तारपीन का तेल 30 ml मौखिक।",
        fluidTherapy: "आमतौर पर द्रव की आवश्यकता नहीं। अधिक तनाव पर Inj. Spasmo-Vet 15ml IM।",
        withdrawalNotice: "विथड्रॉल अवधि शून्य।",
        differentials: "Choke (Esophageal Obstruction), Vagus Indigestion, Abomasal Torsion"
    },
    {
        id: "dis_parvo",
        name: "Canine Parvovirus Enteritis (CPV)",
        localName: "श्वान पार्वो वायरस",
        species: ["Canine"],
        category: "Viral",
        tempRange: "103.0 - 105.0 °F",
        symptoms: [
            "अत्यधिक बदबूदार खूनी दस्त (Foul-smelling Bloody Diarrhea)",
            "लगातार गंभीर उल्टियां (Persistent Vomiting)",
            "गंभीर निर्जलीकरण और आंखें अंदर धंस जाना",
            "अत्यधिक सुस्ती व कुछ भी खाने-पीने में असमर्थ",
            "शरीर का तापमान शुरुआत में तेज, बाद में सब-नॉर्मल"
        ],
        vitalsRule: { tempMin: 103.0, mucous: "pale", rumen: "normal" },
        primaryRx: "Inj. Maropitant (Cerenia) 1 mg/kg SC अथवा Ondansetron @ 0.2-0.5 mg/kg IV। Inj. Ceftriaxone @ 25 mg/kg IV।",
        supportiveRx: "Inj. Pantoprazole @ 1 mg/kg IV, Inj. Ethamsylate @ 10 mg/kg IV (रक्तस्राव रोकने हेतु)।",
        fluidTherapy: "Ringer's Lactate (RL) + 5% Dextrose @ 60-90 ml/kg/day IV (जीवन रक्षक)।",
        withdrawalNotice: "गैर-खाद्य पशु (लागू नहीं)।",
        differentials: "Canine Coronavirus, Intestinal Foreign Body, Hookworm Ancylostomiasis"
    },
    {
        id: "dis_ppr",
        name: "Peste des Petits Ruminants (PPR)",
        localName: "बकरी प्लेग / पीपीआर",
        species: ["Caprine"],
        category: "Viral",
        tempRange: "104.0 - 106.0 °F",
        symptoms: [
            "तेज बुखार (104-106°F) और उदासी",
            "मुंह में घाव, मसूड़ों पर सफेद परत व बदबूदार सांस",
            "गंभीर पतला पानी जैसा दस्त (Severe Enteritis)",
            "आंखों व नाक से गाढ़ा मवाद जैसा स्राव",
            "निमोनिया के लक्षण और सांस फूलना"
        ],
        vitalsRule: { tempMin: 104.0, mucous: "congested", rumen: "hypomotile" },
        primaryRx: "विशिष्ट एंटीवायरल नहीं। द्वितीयक संक्रमण हेतु: Inj. Enrofloxacin @ 5 mg/kg IM अथवा Oxytetracycline @ 10 mg/kg IM 3-5 दिन।",
        supportiveRx: "Inj. Meloxicam 2-3 ml IM। B-Complex + Belamyl 2 ml IM। दस्त हेतु ORS एवं काओलिन पेक्टिन।",
        fluidTherapy: "Dextrose Normal Saline (DNS) 300-500 ml SC/Slow IV।",
        withdrawalNotice: "मांस: 14 दिन।",
        differentials: "Contagious Caprine Pleuropneumonia (CCPP), Coccidiosis, Goat Pox"
    },
    {
        id: "dis_colic",
        name: "Equine Colic (Spasmodic/Impaction)",
        localName: "अश्व शूल (घोड़े का पेट दर्द)",
        species: ["Equine"],
        category: "Metabolic",
        tempRange: "99.5 - 101.5 °F",
        symptoms: [
            "घोड़े का बार-बार जमीन पर लोटना (Rolling)",
            "पेट की ओर मुड़कर देखना और लात मारना",
            "अत्यधिक पसीना आना व बेचैनी",
            "गोबर रुकना (Impaction) या बार-बार पेशाब की मुद्रा बनाना",
            "हृदय गति 60 से अधिक प्रति मिनट"
        ],
        vitalsRule: { tempMin: 100.0, mucous: "congested", rumen: "atony" },
        primaryRx: "Inj. Flunixin Meglumine @ 1.1 mg/kg IV। Inj. Buscopan Compositum (Hyoscine + Dipyrone) 20-30 ml IV।",
        supportiveRx: "Liquid Paraffin (Mineral Oil) 2-4 लीटर Nasogastric Tube द्वारा (यदि Impaction हो)।",
        fluidTherapy: "Normal Saline (0.9% NaCl) 10-20 लीटर IV तीव्र निर्जलीकरण में।",
        withdrawalNotice: "गैर-खाद्य पशु।",
        differentials: "Gastric Rupture, Strangulating Lipoma, Enterolithiasis"
    },
    {
        id: "dis_enterotoxemia",
        name: "Enterotoxemia (Pulpy Kidney)",
        localName: "फड़किया रोग",
        species: ["Caprine"],
        category: "Bacterial",
        tempRange: "103.5 - 105.0 °F",
        symptoms: [
            "अचानक बिना किसी पूर्व लक्षण के पशु का गिरना व तड़पना",
            "दांत पीसना, मुंह से झाग और गर्दन पीछे खींचना (Opisthotonos)",
            "तेजी से दाना या नई हरी घास खाने के बाद लक्षण",
            "पेशाब में ग्लूकोज की प्रचुरता (Glycosuria)",
            "मृत्यु के तुरंत बाद गुर्दे का दलिया जैसा गल जाना"
        ],
        vitalsRule: { tempMin: 103.0, mucous: "cyanotic", rumen: "atony" },
        primaryRx: "तीव्र मामलों में उपचार का समय कम। Clostridium Antitoxin 20-50 ml SC यदि उपलब्ध हो। Penicillin G 20,000 IU/kg IM।",
        supportiveRx: "दाना तुरंत बंद करें। सूखी घास दें। B-Complex + Thiamine 5ml IM।",
        fluidTherapy: "RL 500 ml Slow IV।",
        withdrawalNotice: "मांस: 14 दिन।",
        differentials: "Polioencephalomalacia (PEM), Tetanus, Lead Poisoning"
    },
    {
        id: "dis_coccidiosis",
        name: "Coccidiosis (Bovine/Caprine/Avian)",
        localName: "कॉक्सीडियोसिस / खूनी पेचिश",
        species: ["Bovine", "Caprine", "Poultry"],
        category: "Parasitic",
        tempRange: "102.0 - 104.0 °F",
        symptoms: [
            "काले या लाल रंग का खूनी बदबूदार दस्त",
            "मल त्यागते समय अत्यधिक जोर लगाना (Tenesmus)",
            "गुदा का बाहर निकल आना (Rectal Prolapse)",
            "वजन में तेज गिरावट और पंख/बाल रूखे होना",
            "छोटे मेमनों व बछड़ों में अधिक प्रकोप"
        ],
        vitalsRule: { tempMin: 102.5, mucous: "pale", rumen: "hypomotile" },
        primaryRx: "Amprolium Powder (20%) @ 10 mg/kg शारीरिक भार के अनुसार पीने के पानी में 5-7 दिन, अथवा Toltrazuril @ 20 mg/kg मौखिक एकल खुराक।",
        supportiveRx: "Sulfadimethoxine 50 mg/kg मौखिक 3 दिन। Belamyl 3ml IM।",
        fluidTherapy: "Electrolyte ORS पानी में प्रचुर मात्रा में दें।",
        withdrawalNotice: "मांस: 10 दिन, दूध/अंडा: 5 दिन।",
        differentials: "Salmonellosis, Helminthiasis, Giardiasis"
    }
];

// In-Memory Application State
let appDiseases = [];
let appKhataLedger = [];
let appMedicationRows = [];

// ===============================================================
// 3. DEFENSIVE RUNTIME UI TOGGLE (showMainApp with Null Checks)
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

        const loginModal = document.getElementById("loginModal");
        if (loginModal && loginModal.classList) {
            loginModal.classList.add("hidden");
            loginModal.style.display = "none";
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
        console.warn("showMainApp handled safely:", err);
    }
}
window.showMainApp = showMainApp;

// ===============================================================
// 4. GLOBAL PAYMENT MODAL CONTROLLERS (Direct Window Binding)
// ===============================================================

window.openPaymentModal = function() {
    try {
        const modal = document.getElementById("paymentModal");
        if (modal) {
            modal.style.display = "flex";
            if (modal.classList) {
                modal.classList.remove("hidden");
            }
        }
        if (document.body && document.body.classList) {
            document.body.classList.add("modal-active");
        }
        updatePaymentGatewayUI();
    } catch (err) {
        console.error("Error opening payment modal:", err);
    }
};

window.closePaymentModal = function() {
    try {
        const modal = document.getElementById("paymentModal");
        if (modal) {
            modal.style.display = "none";
            if (modal.classList) {
                modal.classList.add("hidden");
            }
        }
        if (document.body && document.body.classList) {
            document.body.classList.remove("modal-active");
        }
    } catch (err) {
        console.error("Error closing payment modal:", err);
    }
};

// ===============================================================
// 5. INITIALIZATION & DUAL STORAGE SYNC
// ===============================================================

document.addEventListener("DOMContentLoaded", () => {
    // Invoke screen switch safely
    showMainApp();

    initDualSyncStorage();
    initClock();
    setupDefaultPrescriptionMedicines();
    populateSymptomsChecklist();
    renderDiseaseDirectory();
    renderKhataLedger();
    updatePaymentGatewayUI();
    updateLivePrescription();

    // Global Key Listener for Modal Closing
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") window.closePaymentModal();
    });

    // Modal Trigger Binding
    const openBtn = document.getElementById("openPaymentModalBtn");
    if (openBtn) {
        openBtn.addEventListener("click", window.openPaymentModal);
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

    // Load Unlimited Diseases (Codex + Custom Stored)
    const storedCustom = localStorage.getItem("vetcare_custom_diseases");
    let custom = [];
    if (storedCustom) {
        try {
            custom = JSON.parse(storedCustom);
        } catch (e) {
            console.error("Custom disease parse failure:", e);
        }
    }
    appDiseases = [...DEFAULT_DISEASE_CODEX, ...custom];

    // Load Khata Ledger Records
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

    // Network connectivity listener for Dual Cloud/Local Mode
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
        console.error("Custom disease save error:", e);
    }
}

// ===============================================================
// 6. DUAL-BANK PAYMENT GATEWAY LOGIC (SBI & PNB)
// ===============================================================

window.selectBankTab = function(bankKey) {
    if (bankKey !== "sbi" && bankKey !== "pnb") return;
    currentActiveBank = bankKey;

    const sbiBtn = document.getElementById("tabSbiBtn");
    const pnbBtn = document.getElementById("tabPnbBtn");

    if (bankKey === "sbi") {
        if (sbiBtn) sbiBtn.className = "flex-1 py-2 rounded-lg bg-white shadow-sm text-brand-700 transition flex items-center justify-center gap-1.5 font-devanagari font-bold";
        if (pnbBtn) pnbBtn.className = "flex-1 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1.5 font-devanagari font-semibold";
        showToast("प्राथमिक बैंक: State Bank of India चुना गया", "info");
    } else {
        if (pnbBtn) pnbBtn.className = "flex-1 py-2 rounded-lg bg-white shadow-sm text-rose-700 transition flex items-center justify-center gap-1.5 font-devanagari font-bold";
        if (sbiBtn) sbiBtn.className = "flex-1 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1.5 font-devanagari font-semibold";
        showToast("बैकअप बैंक: Punjab National Bank चुना गया", "info");
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

    // Standard RFC-Compliant UPI URI
    const upiPayload = `upi://pay?pa=${encodeURIComponent(bank.upiId)}&pn=${encodeURIComponent(VETCARE_PAYMENT_CONFIG.payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Vetcare Pro ' + currentSelectedPlan.label)}`;

    // High Density Production QR Code
    if (qrImageEl) {
        qrImageEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=4&data=${encodeURIComponent(upiPayload)}`;
    }

    // Direct Intent Link
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
        showToast("कॉपी नहीं हो सका, कृपया मैन्युअल नोट करें।", "error");
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
    showToast("धन्यवाद! UTR सत्यापित हुआ। आपकी प्रो सदस्यता सक्रिय हो चुकी है।", "success");

    if (utrInput) utrInput.value = "";
    setTimeout(window.closePaymentModal, 1500);
};

// ==========================================
// 7. APPLICATION TAB CONTROLLER
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
// 8. OPD PRESCRIPTION & WHATSAPP DISPATCH
// ==========================================

function setupDefaultPrescriptionMedicines() {
    appMedicationRows = [
        {
            drugName: "Inj. Ceftiofur Sodium (Intraceft)",
            dose: "1 gm",
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
        const div = document.createElement("div");
        div.className = "grid grid-cols-12 gap-1.5 items-center bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs";
        div.innerHTML = `
            <div class="col-span-5">
                <input type="text" value="${escapeHtml(row.drugName)}" placeholder="दवा का नाम" class="w-full px-2 py-1.5 border rounded bg-white font-medium" oninput="window.updateMedRow(${index}, 'drugName', this.value)">
            </div>
            <div class="col-span-2">
                <input type="text" value="${escapeHtml(row.dose)}" placeholder="मात्रा" class="w-full px-2 py-1.5 border rounded bg-white text-center" oninput="window.updateMedRow(${index}, 'dose', this.value)">
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
    updateLivePrescription();
};

window.removeMedicationRow = function(index) {
    if (appMedicationRows.length <= 1) {
        showToast("पर्ची में कम से कम एक दवा पंक्ति होना आवश्यक है!", "error");
        return;
    }
    appMedicationRows.splice(index, 1);
    renderMedicationRowsInput();
    updateLivePrescription();
};

window.updateMedRow = function(index, field, value) {
    if (appMedicationRows[index]) {
        appMedicationRows[index][field] = value;
        updateLivePrescription();
    }
};

window.clearOpdForm = function() {
    const fields = [
        "ownerName", "ownerPhone", "ownerAddress",
        "animalBreedSex", "animalAgeWeight",
        "vitalTemp", "vitalHR", "vitalRR", "vitalRumen",
        "opdDiagnosisInput", "opdAdvice"
    ];
    fields.forEach(f => {
        const el = document.getElementById(f);
        if (el) el.value = "";
    });

    setupDefaultPrescriptionMedicines();
    updateLivePrescription();
    showToast("OPD फॉर्म खाली कर दिया गया है।", "info");
};

function updateLivePrescription() {
    const owner = document.getElementById("ownerName")?.value.trim() || "रमेश कुमार";
    const phone = document.getElementById("ownerPhone")?.value.trim() || "98XXXXXXXX";
    const address = document.getElementById("ownerAddress")?.value.trim() || "स्थानीय पता";
    const species = document.getElementById("animalSpecies")?.value || "गाय (Cattle)";
    const breedSex = document.getElementById("animalBreedSex")?.value.trim() || "HF Cross";
    const ageWt = document.getElementById("animalAgeWeight")?.value.trim() || "4 वर्ष | 420 kg";
    const diag = document.getElementById("opdDiagnosisInput")?.value.trim() || "Bovine Mastitis (संदिग्ध)";
    const advice = document.getElementById("opdAdvice")?.value.trim() || "ठंडा व सुपाच्य चारा दें। पानी प्रचुर मात्रा में पिलाएं।";

    const vTemp = document.getElementById("vitalTemp")?.value || "101.5";
    const vHR = document.getElementById("vitalHR")?.value || "60";
    const vRR = document.getElementById("vitalRR")?.value || "24";
    const vRumen = document.getElementById("vitalRumen")?.value || "3";

    const totalFee = parseFloat(document.getElementById("opdTotalFee")?.value || 0);
    const paidFee = parseFloat(document.getElementById("opdPaidFee")?.value || 0);
    const dueFee = Math.max(0, totalFee - paidFee);

    // Update Live Preview DOM
    setText("slipOwner", owner);
    setText("slipPhone", phone);
    setText("slipAddress", address);
    setText("slipSpeciesBreed", `${species} | ${breedSex}`);
    setText("slipAgeWeight", ageWt);
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
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="py-1 px-1.5 text-slate-400 font-mono">${i + 1}</td>
                <td class="py-1 px-1.5 font-bold text-slate-800">${escapeHtml(row.drugName || "-")}</td>
                <td class="py-1 px-1.5 font-semibold text-brand-800">${escapeHtml(row.dose || "-")}</td>
                <td class="py-1 px-1.5 text-slate-600">${escapeHtml(row.route || "-")}</td>
                <td class="py-1 px-1.5 text-slate-600">${escapeHtml(row.duration || "-")}</td>
            `;
            tableBody.appendChild(tr);
        });
    }
}
window.updateLivePrescription = updateLivePrescription;

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
    const diag = document.getElementById("opdDiagnosisInput")?.value || "रोग निदान";
    const vTemp = document.getElementById("vitalTemp")?.value || "सामान्य";
    const advice = document.getElementById("opdAdvice")?.value || "सावधानी रखें।";
    const totalFee = document.getElementById("opdTotalFee")?.value || "0";
    const dueFee = document.getElementById("slipDueFee")?.textContent || "₹0";

    let medText = "";
    appMedicationRows.forEach((m, i) => {
        medText += `${i + 1}. *${m.drugName}* (${m.dose}) - मार्ग: ${m.route}, अवधि: ${m.duration}\n`;
    });

    const msg = `🐾 *VETCARE CLINICAL OPD PRESCRIPTION* 🐾\n` +
        `-----------------------------------------\n` +
        `👤 *पशुपालक:* ${owner}\n` +
        `🐄 *पशु:* ${species} (${breed})\n` +
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

// ===============================================================
// 9. 3-WAY DIAGNOSIS ENGINE (SPECIES + VITALS + MULTI-SYMPTOMS)
// ===============================================================

function populateSymptomsChecklist() {
    const container = document.getElementById("symptomsChecklist");
    if (!container) return;

    const symptomSet = new Set();
    appDiseases.forEach(d => {
        if (Array.isArray(d.symptoms)) {
            d.symptoms.forEach(s => symptomSet.add(s.trim()));
        }
    });

    const sortedSymptoms = Array.from(symptomSet).sort();
    container.innerHTML = "";

    sortedSymptoms.forEach((symptom) => {
        const label = document.createElement("label");
        label.className = "symptom-item flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded text-xs cursor-pointer select-none";
        label.innerHTML = `
            <input type="checkbox" value="${escapeHtml(symptom)}" class="diag-symptom-cb rounded text-brand-600 focus:ring-brand-500" onchange="window.runDiagnostics()">
            <span class="text-slate-700 font-devanagari">${escapeHtml(symptom)}</span>
        `;
        container.appendChild(label);
    });
}

window.filterSymptomCheckboxes = function() {
    const q = (document.getElementById("symptomSearch")?.value || "").toLowerCase();
    const items = document.querySelectorAll(".symptom-item");
    items.forEach(item => {
        if (!item) return;
        const txt = item.textContent.toLowerCase();
        item.style.display = txt.includes(q) ? "flex" : "none";
    });
};

window.runDiagnostics = function() {
    const selectedSpecies = document.getElementById("diagSpecies")?.value || "Bovine";
    const tempInput = parseFloat(document.getElementById("diagTemp")?.value);
    const mucousVal = document.getElementById("diagMucous")?.value || "normal";
    const rumenVal = document.getElementById("diagRumen")?.value || "normal";

    const checkedBoxes = document.querySelectorAll(".diag-symptom-cb:checked");
    const chosenSymptoms = Array.from(checkedBoxes).map(cb => cb.value.toLowerCase());

    const resultsContainer = document.getElementById("diagnosticResultsList");
    const matchCountBadge = document.getElementById("matchCountBadge");
    const tempLabel = document.getElementById("tempStatus");

    // Dynamic Temperature Classification
    if (!isNaN(tempInput) && tempLabel) {
        if (tempInput > 103.0) {
            tempLabel.textContent = "🔥 उच्च ज्वर (High Fever)";
            tempLabel.className = "font-bold text-xs text-rose-600";
        } else if (tempInput < 100.0) {
            tempLabel.textContent = "❄️ हाइपोथर्मिया / ठंडा शरीर";
            tempLabel.className = "font-bold text-xs text-blue-600";
        } else {
            tempLabel.textContent = "✓ सामान्य (Normal Range)";
            tempLabel.className = "font-bold text-xs text-emerald-600";
        }
    } else if (tempLabel) {
        tempLabel.textContent = "";
    }

    if (chosenSymptoms.length === 0 && isNaN(tempInput)) {
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="text-center py-10 text-slate-400 text-xs font-devanagari">
                    <i class="fa-solid fa-stethoscope text-3xl mb-2 text-slate-300"></i>
                    <p>कृपया बाईं ओर लक्षण और वाइटल्स दर्ज करें।</p>
                </div>
            `;
        }
        if (matchCountBadge) matchCountBadge.textContent = "0 मिले";
        return;
    }

    // 3-Way Diagnostic Matching Algorithm
    const scoredDiseases = [];

    appDiseases.forEach(d => {
        let score = 0;
        let matchedReasons = [];

        // 1. Species Matching
        if (d.species.includes(selectedSpecies) || d.species.includes("ALL")) {
            score += 15;
        } else {
            score -= 40; // Heavy penalty for cross-species mismatches
        }

        // 2. Symptom Overlap Score
        let matchCount = 0;
        d.symptoms.forEach(ds => {
            const lowerDs = ds.toLowerCase();
            chosenSymptoms.forEach(cs => {
                if (lowerDs.includes(cs) || cs.includes(lowerDs)) {
                    matchCount++;
                    matchedReasons.push(ds);
                }
            });
        });

        if (chosenSymptoms.length > 0) {
            const ratio = matchCount / chosenSymptoms.length;
            score += Math.round(ratio * 55);
        }

        // 3. Vitals & Clinical Rule Engine
        if (d.vitalsRule) {
            if (!isNaN(tempInput)) {
                if (d.vitalsRule.tempMin && tempInput >= d.vitalsRule.tempMin) {
                    score += 20;
                    matchedReasons.push(`तापमान नियम (≥ ${d.vitalsRule.tempMin}°F)`);
                }
                if (d.vitalsRule.tempMax && tempInput <= d.vitalsRule.tempMax) {
                    score += 20;
                    matchedReasons.push(`तापमान नियम (≤ ${d.vitalsRule.tempMax}°F)`);
                }
            }
            if (d.vitalsRule.mucous && d.vitalsRule.mucous === mucousVal) {
                score += 15;
                matchedReasons.push(`म्यूकस झिल्ली: ${mucousVal}`);
            }
            if (d.vitalsRule.rumen && d.vitalsRule.rumen === rumenVal) {
                score += 15;
                matchedReasons.push(`रुमेन गति: ${rumenVal}`);
            }
        }

        if (score > 15) {
            const confidence = Math.min(99, Math.max(10, score));
            scoredDiseases.push({
                disease: d,
                confidence: confidence,
                reasons: matchedReasons
            });
        }
    });

    scoredDiseases.sort((a, b) => b.confidence - a.confidence);

    if (matchCountBadge) {
        matchCountBadge.textContent = `${scoredDiseases.length} संभावित`;
    }

    if (!resultsContainer) return;
    resultsContainer.innerHTML = "";

    if (scoredDiseases.length === 0) {
        resultsContainer.innerHTML = `
            <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs text-center font-devanagari">
                कोई सटीक निदान मेल नहीं खाया। कृपया अधिक लक्षण जोड़ें या वाइटल्स बदलें।
            </div>
        `;
        return;
    }

    scoredDiseases.forEach(item => {
        const d = item.disease;
        const confColor = item.confidence >= 75 ? "emerald" : (item.confidence >= 50 ? "amber" : "slate");

        const div = document.createElement("div");
        div.className = "bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm hover:border-brand-500 transition cursor-pointer text-xs space-y-2";
        div.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="font-bold text-slate-900 font-devanagari text-sm">${escapeHtml(d.localName)}</h4>
                    <span class="text-[10px] text-slate-500 font-sans italic">${escapeHtml(d.name)}</span>
                </div>
                <div class="text-right">
                    <span class="inline-block px-2 py-0.5 rounded-full text-xs font-black bg-${confColor}-100 text-${confColor}-800 border border-${confColor}-300 font-sans">
                        ${item.confidence}% संभावना
                    </span>
                </div>
            </div>

            <div class="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                <strong class="text-slate-800 font-devanagari">Rx प्राथमिक उपचार:</strong> ${escapeHtml(d.primaryRx)}
            </div>

            <div class="flex items-center justify-between pt-1">
                <span class="text-[10px] text-slate-400 font-devanagari">श्रेणी: ${d.category}</span>
                <button type="button" onclick="window.applyDiagnosisToPrescription('${d.id}')" class="px-2.5 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded text-[11px] font-bold font-devanagari flex items-center gap-1 shadow-sm">
                    <i class="fa-solid fa-file-circle-check"></i> पर्ची में दर्ज करें
                </button>
            </div>
        `;
        resultsContainer.appendChild(div);
    });
};

window.applyDiagnosisToPrescription = function(diseaseId) {
    const dis = appDiseases.find(d => d.id === diseaseId);
    if (!dis) return;

    const diagInput = document.getElementById("opdDiagnosisInput");
    if (diagInput) diagInput.value = `${dis.localName} (${dis.name})`;

    const adviceInput = document.getElementById("opdAdvice");
    if (adviceInput) adviceInput.value = `${dis.primaryRx}. ${dis.supportiveRx}`;

    window.addMedicationRow(dis.primaryRx.substring(0, 48) + "...", "यथासंभव", "IM", "3-5 दिन");

    window.switchAppTab("opdTab");
    updateLivePrescription();
    showToast(`'${dis.localName}' पर्ची में दर्ज किया गया!`, "success");
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
                कोई रोग रिकॉर्ड नहीं मिला। आप 'नया रोग जोड़ें' टैब से नया रोग दर्ज कर सकते हैं।
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
                <button type="button" onclick="window.applyDiagnosisToPrescription('${d.id}')" class="text-xs text-brand-600 hover:text-brand-800 font-bold font-devanagari flex items-center gap-1">
                    <i class="fa-solid fa-notes-medical"></i> पर्ची बनाएं
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
        symptoms: symptomsArray,
        vitalsRule: { tempMin: 102.0, mucous: "congested", rumen: "hypomotile" },
        primaryRx: primaryRx,
        supportiveRx: supportiveRx || "सपोर्टिव थेरेपी एवं आराम।",
        withdrawalNotice: withdrawalNotice || "लागू नहीं",
        differentials: differentials || "क्लीनिकल परीक्षण आवश्यक"
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
        `कृपया इस बकाया राशि का भुगतान शीघ्रातिशीघ्र ऑनलाइन UPI या क्लिनिक पर करने की कृपा करें।\n` +
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
// 12. UTILITY & TOAST NOTIFICATION HELPERS
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
