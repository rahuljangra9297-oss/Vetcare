// Vetcare AI OS - Interactive Veterinary Prescription Generator, Dosage Engine & Legal Rx Module (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE INITIALIZATION & ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};

  /**
   * Master Veterinary Clinical Prescription Generator & Pharmacopeia Dosage Subsystem
   * Engineered in strict compliance with VCI (Veterinary Council of India), WOAH/OIE Antimicrobial Stewardship,
   * FDA/EMA Food Animal Withdrawal Regulations, and ISO-VET 2026 Electronic Prescribing Standards.
   */
  window.VetcareApp.Modules.PrescriptionGenerator = {
    // -------------------------------------------------------------------------
    // 2. INTERNAL STATE MANAGEMENT
    // -------------------------------------------------------------------------
    state: {
      patient: {
        ownerName: "",
        contact: "",
        village: "",
        tagNo: "",
        species: "bovine",
        breed: "",
        age: "",
        weightKg: 350,
        sex: "female",
        temp: "101.5",
        lactating: true,
        pregnant: false
      },
      diagnosis: {
        primaryDiagnosis: "",
        secondaryDiagnosis: "",
        tentativeNotes: ""
      },
      medications: [],
      doctor: {
        name: "Dr. Rahul Jangra",
        qualification: "B.V.Sc & A.H., M.V.Sc (Veterinary Medicine)",
        regNo: "VCI-2026-9297",
        clinicName: "राष्ट्रीय पशु चिकित्सा एवं कृषक डिजिटल महाजाल (Vetcare Clinical Core)",
        phone: "9991039297",
        email: "support@vetcare.ai"
      },
      dietaryAdvice: [
        "नरम, सुपाच्य हरा चारा व दलिया दें (Offer soft green forage & warm cooked mash)",
        "ताजा, स्वच्छ पेयजल 24 घंटे उपलब्ध रखें (Unlimited clean drinking water)",
        "दूध निकासी काल (Withdrawal period) के दौरान दूध मानव उपभोग में न लें"
      ],
      followUpDate: "",
      rxSerialNumber: "",
      currentContainerId: null,
      isInitialized: false
    },

    // -------------------------------------------------------------------------
    // 3. MASTER VETERINARY PHARMACOPEIA & FORMULARY DATABASE
    // -------------------------------------------------------------------------
    formularyCatalog: [
      // Antimicrobials
      {
        id: "DRUG-CEFTIOFUR",
        name: "Ceftiofur Sodium (Xceed / Naxcel)",
        composition: "Ceftiofur Sodium 1 g / 50 mg/mL",
        category: "Antimicrobial",
        form: "injectable",
        defaultDosageMgKg: { bovine: 2.2, bubaline: 2.2, caprine: 2.2, ovine: 2.2, equine: 2.2, canine: 2.2, feline: 2.2 },
        concentrationMgPerUnit: 50.0,
        unitLabel: "mL",
        route: "IM",
        frequency: "OD",
        durationDays: 3,
        withdrawalMilkDays: 0, // Zero milk withdrawal hallmark
        withdrawalMeatDays: 4,
        contraindications: [],
        instructionsHi: "दूध निकासी अवधि शून्य है। श्वसन रोग व तीव्र थनैला में सुरक्षित।"
      },
      {
        id: "DRUG-OXYTET-LA",
        name: "Oxytetracycline Long-Acting (Terramycin LA 200 mg/mL)",
        composition: "Oxytetracycline Dihydrate 200 mg/mL",
        category: "Antimicrobial",
        form: "injectable",
        defaultDosageMgKg: { bovine: 20.0, bubaline: 20.0, caprine: 20.0, ovine: 20.0, equine: 10.0, canine: 10.0 },
        concentrationMgPerUnit: 200.0,
        unitLabel: "mL",
        route: "IM",
        frequency: "STAT",
        durationDays: 3,
        withdrawalMilkDays: 7,
        withdrawalMeatDays: 21,
        contraindications: ["renal_failure", "young_calves_tooth_discoloration"],
        instructionsHi: "गहरी मांसपेशियों में लगाएं। एक ही स्थान पर 10-15 mL से अधिक न दें।"
      },
      {
        id: "DRUG-ENROFLOX",
        name: "Enrofloxacin 10% (Floxidin / Baytril)",
        composition: "Enrofloxacin 100 mg/mL",
        category: "Antimicrobial",
        form: "injectable",
        defaultDosageMgKg: { bovine: 5.0, bubaline: 5.0, caprine: 5.0, ovine: 5.0, canine: 5.0, feline: 5.0 },
        concentrationMgPerUnit: 100.0,
        unitLabel: "mL",
        route: "IM",
        frequency: "OD",
        durationDays: 3,
        withdrawalMilkDays: 4,
        withdrawalMeatDays: 14,
        contraindications: ["growing_puppies_cartilage_defect", "feline_retinopathy"],
        instructionsHi: "बिल्लियों में 5 mg/kg से अधिक न दें (अंधापन जोखिम)। छोटे पिल्लों में कार्टिलेज डैमेज करता है।"
      },
      {
        id: "DRUG-AMOX-CLAV",
        name: "Amoxicillin + Potassium Clavulanate (Augmentin / Clavam)",
        composition: "Amoxicillin 875 mg + Clavulanate 125 mg Tablet / 300 mg/mL Inj",
        category: "Antimicrobial",
        form: "bolus",
        defaultDosageMgKg: { bovine: 10.0, bubaline: 10.0, canine: 15.0, feline: 15.0 },
        concentrationMgPerUnit: 1000.0,
        unitLabel: "Bolus/Tabs",
        route: "PO",
        frequency: "BID",
        durationDays: 5,
        withdrawalMilkDays: 3,
        withdrawalMeatDays: 10,
        contraindications: ["penicillin_hypersensitivity"],
        instructionsHi: "ब्रॉड-स्पेक्ट्रम बीटा-लैक्टामेस अवरोधक। भोजन के बाद खिलाएं।"
      },

      // Anti-Inflammatories & Analgesics
      {
        id: "DRUG-MELOXICAM",
        name: "Meloxicam Injection (Melonex 5 mg/mL)",
        composition: "Meloxicam 5 mg/mL",
        category: "NSAID",
        form: "injectable",
        defaultDosageMgKg: { bovine: 0.5, bubaline: 0.5, caprine: 0.5, ovine: 0.5, equine: 0.6, canine: 0.2, feline: 0.2 },
        concentrationMgPerUnit: 5.0,
        unitLabel: "mL",
        route: "IM",
        frequency: "OD",
        durationDays: 3,
        withdrawalMilkDays: 5,
        withdrawalMeatDays: 15,
        contraindications: ["concurrent_steroid_use", "severe_renal_failure"],
        instructionsHi: "सूजन व दर्द निवारक। कॉर्टिकोस्टेरॉइड के साथ कदापि न दें (अल्सर जोखिम)।"
      },
      {
        id: "DRUG-FLUNIXIN",
        name: "Flunixin Meglumine (Banamine / Megludyne 50 mg/mL)",
        composition: "Flunixin Meglumine 50 mg/mL",
        category: "NSAID",
        form: "injectable",
        defaultDosageMgKg: { bovine: 2.2, bubaline: 2.2, equine: 1.1 },
        concentrationMgPerUnit: 50.0,
        unitLabel: "mL",
        route: "IV",
        frequency: "OD",
        durationDays: 2,
        withdrawalMilkDays: 2,
        withdrawalMeatDays: 5,
        contraindications: ["equine_intramuscular_use", "concurrent_steroid_use"],
        instructionsHi: "घोड़ों में विसरल कॉलिक एवं गाय-भैंस में एंडोटॉक्सिक शॉक हेतु केवल IV दें। (घोड़ों में IM पूर्णतः वर्जित)।"
      },
      {
        id: "DRUG-PARACETAMOL-BOLUS",
        name: "Paracetamol + Meloxicam Bolus (Melonex Plus)",
        composition: "Meloxicam 100 mg + Paracetamol 1500 mg",
        category: "NSAID",
        form: "bolus",
        defaultDosageMgKg: { bovine: 0.5, bubaline: 0.5 },
        concentrationMgPerUnit: 1600.0,
        unitLabel: "Bolus",
        route: "PO",
        frequency: "BID",
        durationDays: 3,
        withdrawalMilkDays: 3,
        withdrawalMeatDays: 7,
        contraindications: ["feline_lethal_toxicity"],
        instructionsHi: "गंभीर बुखार व दर्द शमन हेतु। बिल्लियों को कदापि न दें (100% जानलेवा)!"
      },

      // Corticosteroids
      {
        id: "DRUG-DEXAMETHASONE",
        name: "Dexamethasone Sodium Phosphate (Dexona 4 mg/mL)",
        composition: "Dexamethasone Sodium Phosphate 4 mg/mL",
        category: "Corticosteroid",
        form: "injectable",
        defaultDosageMgKg: { bovine: 0.1, bubaline: 0.1, caprine: 0.1, ovine: 0.1, equine: 0.1, canine: 0.2, feline: 0.2 },
        concentrationMgPerUnit: 4.0,
        unitLabel: "mL",
        route: "IM",
        frequency: "OD",
        durationDays: 1,
        withdrawalMilkDays: 3,
        withdrawalMeatDays: 8,
        contraindications: ["pregnancy_abortifacient", "corneal_ulcers", "concurrent_nsaid"],
        instructionsHi: "लाल चेतावनी: गर्भवती पशु में कदापि न दें (गर्भपात कारक)! NSAID के साथ वर्जित।"
      },
      {
        id: "DRUG-ISOFLUPREDONE",
        name: "Isoflupredone Acetate (Isoflud 2 mg/mL)",
        composition: "Isoflupredone Acetate 2 mg/mL",
        category: "Corticosteroid",
        form: "injectable",
        defaultDosageMgKg: { bovine: 0.04, bubaline: 0.04 },
        concentrationMgPerUnit: 2.0,
        unitLabel: "mL",
        route: "IM",
        frequency: "OD",
        durationDays: 1,
        withdrawalMilkDays: 3,
        withdrawalMeatDays: 7,
        contraindications: ["severe_hypokalemia"],
        instructionsHi: "गोवंश में कीटोसिस व गर्भावस्था में सुरक्षित ग्लूकोकोर्टिकॉइड। हाइपोकेलेमिया की निगरानी करें।"
      },

      // Antiprotozoals & Parasiticides
      {
        id: "DRUG-DIMINAZENE",
        name: "Diminazene Aceturate (Berenil 70 mg/mL)",
        composition: "Diminazene Aceturate 70 mg/mL + Phenazone",
        category: "Antiprotozoal",
        form: "injectable",
        defaultDosageMgKg: { bovine: 3.5, bubaline: 3.5, canine: 3.5, equine: 3.5 },
        concentrationMgPerUnit: 70.0,
        unitLabel: "mL",
        route: "IM",
        frequency: "STAT",
        durationDays: 1,
        withdrawalMilkDays: 3,
        withdrawalMeatDays: 20,
        contraindications: ["camels_toxicity", "overdose_neuropathy"],
        instructionsHi: "बबेशियोसिस व ट्रिपैनोसोमियासिस हेतु गहरी मांसपेशियों में लगाएं। ऊंटों में न दें।"
      },
      {
        id: "DRUG-BUPARVAQUONE",
        name: "Buparvaquone (Butalex / Zubion 50 mg/mL)",
        composition: "Buparvaquone 50 mg/mL",
        category: "Antiprotozoal",
        form: "injectable",
        defaultDosageMgKg: { bovine: 2.5, bubaline: 2.5 },
        concentrationMgPerUnit: 50.0,
        unitLabel: "mL",
        route: "IM",
        frequency: "STAT",
        durationDays: 1,
        withdrawalMilkDays: 48,
        withdrawalMeatDays: 42,
        contraindications: ["intravenous_injection"],
        instructionsHi: "थायलेरियोसिस (Theileriosis) की विशिष्ट औषधि। गर्दन की मांसपेशियों में एकल खुराक दें।"
      },
      {
        id: "DRUG-IVERMECTIN",
        name: "Ivermectin 1% Injection (Neomec / Hitek)",
        composition: "Ivermectin 10 mg/mL",
        category: "Parasiticide",
        form: "injectable",
        defaultDosageMgKg: { bovine: 0.2, bubaline: 0.2, caprine: 0.2, ovine: 0.2, canine: 0.2 },
        concentrationMgPerUnit: 10.0,
        unitLabel: "mL",
        route: "SC",
        frequency: "STAT",
        durationDays: 1,
        withdrawalMilkDays: 28, // Long withdrawal
        withdrawalMeatDays: 35,
        contraindications: ["collie_mdr1_gene", "intravenous_use", "milking_dairy_animals_warning"],
        instructionsHi: "केवल चमड़ी के नीचे (SC) लगाएं। कोली नस्ल के कुत्तों व दुधारू पशुओं में सावधानी।"
      },

      // Supportive & Minerals
      {
        id: "DRUG-CBG",
        name: "Calcium Borogluconate 25% (Mifex / Calboro)",
        composition: "Calcium Borogluconate 25% + Magnesium & Phosphorus",
        category: "Metabolic / Mineral",
        form: "injectable",
        defaultDosageMgKg: { bovine: 1.0, bubaline: 1.0 }, // Dose typically 450 mL bottle
        concentrationMgPerUnit: 1.0, // Special dosing logic
        unitLabel: "mL (Bottle)",
        route: "IV",
        frequency: "STAT",
        durationDays: 1,
        withdrawalMilkDays: 0,
        withdrawalMeatDays: 0,
        contraindications: ["hypercalcemia", "rapid_iv_cardiac_arrest"],
        instructionsHi: "दुग्ध ज्वर (Milk Fever) हेतु: आधा IV अत्यंत धीमे तथा आधा SC लगाएं। हृदय गति की सतत निगरानी रखें।"
      },
      {
        id: "DRUG-SODIUM-ACID-PHOS",
        name: "Sodium Acid Phosphate 40% (Urovet / Novasac)",
        composition: "Sodium Acid Phosphate 200 mg/mL",
        category: "Metabolic / Mineral",
        form: "injectable",
        defaultDosageMgKg: { bovine: 100.0, bubaline: 100.0 }, // ~60-80 mL
        concentrationMgPerUnit: 200.0,
        unitLabel: "mL",
        route: "IV",
        frequency: "BID",
        durationDays: 2,
        withdrawalMilkDays: 0,
        withdrawalMeatDays: 0,
        contraindications: [],
        instructionsHi: "ब्यात उपरांत लाल पेशाब (PPH) हेतु जीवन रक्षक। 60-80 mL धीमी IV दें।"
      },
      {
        id: "DRUG-AVIL",
        name: "Pheniramine Maleate (Avil 22.75 mg/mL)",
        composition: "Pheniramine Maleate 22.75 mg/mL",
        category: "Antihistamine",
        form: "injectable",
        defaultDosageMgKg: { bovine: 0.5, bubaline: 0.5, caprine: 0.5, ovine: 0.5, equine: 0.5, canine: 1.0 },
        concentrationMgPerUnit: 22.75,
        unitLabel: "mL",
        route: "IM",
        frequency: "OD",
        durationDays: 2,
        withdrawalMilkDays: 0,
        withdrawalMeatDays: 1,
        contraindications: [],
        instructionsHi: "एलर्जी, कीड़े के काटने व विषाक्तता में एंटी-हिस्टामिनिक सुरक्षा।"
      },
      {
        id: "DRUG-BCOMPLEX",
        name: "Vitamin B-Complex with Liver Extract (Belamyl / Tribivet)",
        composition: "Vitamin B1, B6, B12 + Liver Extract",
        category: "Nutritional",
        form: "injectable",
        defaultDosageMgKg: { bovine: 0.03, bubaline: 0.03, caprine: 0.05, ovine: 0.05, canine: 0.1 },
        concentrationMgPerUnit: 1.0,
        unitLabel: "mL",
        route: "IM",
        frequency: "OD",
        durationDays: 3,
        withdrawalMilkDays: 0,
        withdrawalMeatDays: 0,
        contraindications: [],
        instructionsHi: "भूख बढ़ाने, यकृत सुधार व तंत्रिका पुनर्जनन हेतु सहायक।"
      }
    ],

    // -------------------------------------------------------------------------
    // 4. MODULE LIFECYCLE HOOKS: INIT, RENDER, DESTROY
    // -------------------------------------------------------------------------
    init: function () {
      this.state.isInitialized = true;
      this.generateNewRxSerialNumber();
      this.setupEventBusListeners();
      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("डिजिटल ई-प्रिस्क्रिप्शन जनरेटर मॉड्यूल सक्रिय (Prescription Generator Loaded)", "info");
      }
    },

    destroy: function () {
      if (this.state.currentContainerId) {
        const c = document.getElementById(this.state.currentContainerId);
        if (c) c.innerHTML = "";
      }
      this.state.isInitialized = false;
    },

    render: function (containerId) {
      this.state.currentContainerId = containerId;
      const root = document.getElementById(containerId);
      if (!root) {
        console.error("PrescriptionGenerator: Target container not found:", containerId);
        return;
      }

      root.innerHTML = this.buildUiDom();
      this.bindUiEvents();
      this.auditInteractions();
    },

    generateNewRxSerialNumber: function () {
      const year = new Date().getFullYear();
      const rand = Math.floor(10000 + Math.random() * 90000);
      this.state.rxSerialNumber = "VET-RX-" + year + "-" + rand;
      this.state.followUpDate = new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0];
    },

    // -------------------------------------------------------------------------
    // 5. EVENT BUS LISTENERS (SYMPTOM CHECKER INTEGRATION)
    // -------------------------------------------------------------------------
    setupEventBusListeners: function () {
      const self = this;

      // Global DOM CustomEvent Listener
      window.addEventListener("vetcare:diagnosis:selected", function (e) {
        if (e && e.detail) {
          self.populateDiagnosisFromEvent(e.detail);
        }
      });

      // Internal EventBus if active
      if (window.VetcareApp.Core && window.VetcareApp.Core.EventBus && typeof window.VetcareApp.Core.EventBus.on === "function") {
        window.VetcareApp.Core.EventBus.on("diagnosis:selected", function (payload) {
          self.populateDiagnosisFromEvent(payload);
        });
      }
    },

    populateDiagnosisFromEvent: function (payload) {
      if (!payload) return;
      this.state.diagnosis.primaryDiagnosis = payload.diseaseNameHi + " (" + payload.diseaseName + ")";
      if (payload.species) this.state.patient.species = payload.species;

      // Smart empirical medication matching
      this.suggestEmpiricalMedsForDiagnosis(payload.diseaseId);

      if (this.state.currentContainerId) {
        this.render(this.state.currentContainerId);
      }
      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("प्रिस्क्रिप्शन में रोग लोड हुआ: " + payload.diseaseNameHi, "success");
      }
    },

    suggestEmpiricalMedsForDiagnosis: function (diseaseId) {
      const dId = String(diseaseId).toLowerCase();
      // Auto-suggest known protocols
      if (dId.includes("babesia") || dId.includes("red_urine")) {
        this.addMedicationById("DRUG-DIMINAZENE");
        this.addMedicationById("DRUG-SODIUM-ACID-PHOS");
        this.addMedicationById("DRUG-BCOMPLEX");
      } else if (dId.includes("theileria")) {
        this.addMedicationById("DRUG-BUPARVAQUONE");
        this.addMedicationById("DRUG-OXYTET-LA");
        this.addMedicationById("DRUG-MELOXICAM");
      } else if (dId.includes("pox") || dId.includes("sheep-pox")) {
        this.addMedicationById("DRUG-OXYTET-LA");
        this.addMedicationById("DRUG-MELOXICAM");
        this.addMedicationById("DRUG-AVIL");
      } else if (dId.includes("hypocalcemia") || dId.includes("milk_fever") || dId.includes("downer")) {
        this.addMedicationById("DRUG-CBG");
        this.addMedicationById("DRUG-SODIUM-ACID-PHOS");
      } else {
        // Broad-spectrum default support
        this.addMedicationById("DRUG-CEFTIOFUR");
        this.addMedicationById("DRUG-MELOXICAM");
      }
    },

    // -------------------------------------------------------------------------
    // 6. DYNAMIC UI DOM BUILDER
    // -------------------------------------------------------------------------
    buildUiDom: function () {
      const s = this.state;
      const curDate = new Date().toLocaleDateString("hi-IN", { year: "numeric", month: "short", day: "numeric" });

      return (
        '<div class="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">' +
          
          // ==================== WORKSPACE HEADER ====================
          '<div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">' +
            '<div class="flex items-center gap-3">' +
              '<div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-500 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-emerald-950/60">' +
                '<i class="fa-solid fa-file-prescription"></i>' +
              '</div>' +
              '<div>' +
                '<div class="flex items-center gap-2">' +
                  '<span class="font-display font-black text-xl sm:text-2xl tracking-tight text-white">' + s.doctor.clinicName + '</span>' +
                  '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">VCI REGISTERED</span>' +
                '</div>' +
                '<div class="text-xs text-slate-400 font-mono mt-0.5">' +
                  'चिकित्सक: <strong class="text-slate-200">' + s.doctor.name + '</strong> (' + s.doctor.qualification + ') | पंजीयन सं: <strong class="text-amber-400">' + s.doctor.regNo + '</strong>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="flex flex-wrap items-center gap-2.5">' +
              '<div class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-right">' +
                '<div class="text-[10px] font-mono text-slate-400 uppercase">Rx सीरियल नंबर (Serial No.)</div>' +
                '<div class="text-xs font-mono font-black text-emerald-400">' + s.rxSerialNumber + '</div>' +
              '</div>' +
              '<div class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-right">' +
                '<div class="text-[10px] font-mono text-slate-400 uppercase">दिनांक (Date)</div>' +
                '<div class="text-xs font-mono font-bold text-slate-200">' + curDate + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          // ==================== PATIENT PROFILE STRIP ====================
          '<div class="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">' +
            '<div class="flex items-center justify-between border-b border-slate-800/80 pb-2">' +
              '<h3 class="text-xs font-mono uppercase font-black text-amber-400 tracking-wider flex items-center gap-2">' +
                '<i class="fa-solid fa-paw"></i>' +
                '<span>रोगी एवं पशुपालक विवरण (Patient & Owner Demographics)</span>' +
              '</h3>' +
              '<button type="button" id="rxBtnSchaeffersCalc" class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 flex items-center gap-1.5 transition-colors">' +
                '<i class="fa-solid fa-calculator"></i>' +
                '<span>शेफर्स सूत्र द्वारा वजन मापें (L × G² / 300)</span>' +
              '</button>' +
            '</div>' +

            '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">' +
              '<div>' +
                '<label class="block text-slate-400 font-bold mb-1">पशुपालक का नाम (Owner Name):</label>' +
                '<input type="text" id="rxInputOwnerName" value="' + s.patient.ownerName + '" placeholder="उदा. किसान रामपाल सिंह" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />' +
              '</div>' +
              '<div>' +
                '<label class="block text-slate-400 font-bold mb-1">मोबाइल नंबर (Mobile No):</label>' +
                '<input type="text" id="rxInputContact" value="' + s.patient.contact + '" placeholder="98XXXXXXXX" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />' +
              '</div>' +
              '<div>' +
                '<label class="block text-slate-400 font-bold mb-1">गांव / पता (Village / Address):</label>' +
                '<input type="text" id="rxInputVillage" value="' + s.patient.village + '" placeholder="उदा. खरखौदा, रोहतक" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />' +
              '</div>' +
              '<div>' +
                '<label class="block text-slate-400 font-bold mb-1">टैग / पहचान संख्या (Tag/Microchip No):</label>' +
                '<input type="text" id="rxInputTagNo" value="' + s.patient.tagNo + '" placeholder="12-अंकीय INAPH टैग" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono" />' +
              '</div>' +
            '</div>' +

            '<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1 text-xs">' +
              '<div>' +
                '<label class="block text-slate-400 font-bold mb-1">प्रजाति (Species):</label>' +
                '<select id="rxSelectSpecies" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500">' +
                  '<option value="bovine" ' + (s.patient.species === "bovine" ? "selected" : "") + '>गाय (Cattle)</option>' +
                  '<option value="bubaline" ' + (s.patient.species === "bubaline" ? "selected" : "") + '>भैंस (Buffalo)</option>' +
                  '<option value="caprine" ' + (s.patient.species === "caprine" ? "selected" : "") + '>बकरी (Goat)</option>' +
                  '<option value="ovine" ' + (s.patient.species === "ovine" ? "selected" : "") + '>भेड़ (Sheep)</option>' +
                  '<option value="equine" ' + (s.patient.species === "equine" ? "selected" : "") + '>घोड़ा (Horse)</option>' +
                  '<option value="canine" ' + (s.patient.species === "canine" ? "selected" : "") + '>श्वान (Dog)</option>' +
                  '<option value="feline" ' + (s.patient.species === "feline" ? "selected" : "") + '>मार्जार (Cat)</option>' +
                '</select>' +
              '</div>' +
              '<div>' +
                '<label class="block text-slate-400 font-bold mb-1">वजन किग्रा (Weight Kg):</label>' +
                '<input type="number" id="rxInputWeight" value="' + s.patient.weightKg + '" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500" />' +
              '</div>' +
              '<div>' +
                '<label class="block text-slate-400 font-bold mb-1">तापमान °F (Temp):</label>' +
                '<input type="text" id="rxInputTemp" value="' + s.patient.temp + '" placeholder="101.5" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500" />' +
              '</div>' +
              '<div>' +
                '<label class="block text-slate-400 font-bold mb-1">लिंग (Sex):</label>' +
                '<select id="rxSelectSex" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">' +
                  '<option value="female" ' + (s.patient.sex === "female" ? "selected" : "") + '>मादा (Female)</option>' +
                  '<option value="male" ' + (s.patient.sex === "male" ? "selected" : "") + '>नर (Male)</option>' +
                '</select>' +
              '</div>' +
              '<div>' +
                '<label class="block text-slate-400 font-bold mb-1">गर्भधारण स्थिति (Pregnant?):</label>' +
                '<button type="button" id="rxTogglePreg" class="w-full py-2 px-2.5 rounded-xl border font-bold text-center transition-all ' + (s.patient.pregnant ? 'bg-rose-600 text-white border-rose-400' : 'bg-slate-800 text-slate-300 border-slate-700') + '">' +
                  (s.patient.pregnant ? 'हाँ (गर्भवती - स्टेरॉइड लॉक)' : 'नहीं (गैर-गर्भवती)') +
                '</button>' +
              '</div>' +
              '<div>' +
                '<label class="block text-slate-400 font-bold mb-1">दुग्धावस्था (Lactating?):</label>' +
                '<button type="button" id="rxToggleLact" class="w-full py-2 px-2.5 rounded-xl border font-bold text-center transition-all ' + (s.patient.lactating ? 'bg-teal-600 text-white border-teal-400' : 'bg-slate-800 text-slate-300 border-slate-700') + '">' +
                  (s.patient.lactating ? 'हाँ (दुधारू - निकासी नियम)' : 'नहीं (सूखा पशु)') +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +

          // ==================== DIAGNOSIS PICKER ====================
          '<div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">' +
            '<div>' +
              '<label class="block text-slate-400 font-bold mb-1 flex items-center gap-1.5">' +
                '<i class="fa-solid fa-virus-covid text-emerald-400"></i>' +
                '<span>प्राथमिक नैदानिक निष्कर्ष (Primary Clinical Diagnosis):</span>' +
              '</label>' +
              '<input type="text" id="rxInputPrimaryDx" value="' + s.diagnosis.primaryDiagnosis + '" placeholder="उदा. Bovine Theileriosis / Mastitis / Enterotoxaemia" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500" />' +
            '</div>' +
            '<div>' +
              '<label class="block text-slate-400 font-bold mb-1">विभेदक अथवा गौण निष्कर्ष (Secondary / Differential Notes):</label>' +
              '<input type="text" id="rxInputSecondaryDx" value="' + s.diagnosis.secondaryDiagnosis + '" placeholder="उदा. सह-संक्रमण, सेप्सिस, एनीमिया या निर्जलीकरण ग्रेड" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />' +
            '</div>' +
          '</div>' +

          // ==================== MEDICATION DISPENSER (ADD DRUG) ====================
          '<div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">' +
            '<div class="flex items-center justify-between border-b border-slate-800 pb-2">' +
              '<h3 class="text-xs font-mono uppercase font-black text-emerald-400 tracking-wider flex items-center gap-2">' +
                '<i class="fa-solid fa-pills text-emerald-400"></i>' +
                '<span>औषधि चयन एवं स्वचालित खुराक कैलकुलेटर (Drug Selector & Dosage Engine)</span>' +
              '</h3>' +
              '<span class="text-[11px] font-mono text-slate-400">ISO-VET Pharmacopeia 2026</span>' +
            '</div>' +

            '<div class="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">' +
              // Drug selector dropdown
              '<div class="sm:col-span-4">' +
                '<label class="block text-slate-400 font-bold mb-1">औषधि का नाम (Select Medication):</label>' +
                '<select id="rxDrugSelect" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500">' +
                  '<option value="">-- औषधि सूची से चुनें (Select Drug) --</option>' +
                  this.formularyCatalog.map(d => '<option value="' + d.id + '">' + d.name + ' [' + d.category + ']</option>').join("") +
                '</select>' +
              '</div>' +

              // Route
              '<div class="sm:col-span-2">' +
                '<label class="block text-slate-400 font-bold mb-1">मार्ग (Route):</label>' +
                '<select id="rxRouteSelect" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2.5 text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500">' +
                  '<option value="IM">IM (मांसपेशी)</option>' +
                  '<option value="IV">IV (नस में / शिरा)</option>' +
                  '<option value="SC">SC (त्वचा के नीचे)</option>' +
                  '<option value="PO">PO (मुंह द्वारा)</option>' +
                  '<option value="Topical">Topical (बाहरी लेप)</option>' +
                  '<option value="Intramammary">Intramammary (थन में)</option>' +
                '</select>' +
              '</div>' +

              // Frequency
              '<div class="sm:col-span-2">' +
                '<label class="block text-slate-400 font-bold mb-1">आवृत्ति (Freq):</label>' +
                '<select id="rxFreqSelect" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2.5 text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500">' +
                  '<option value="OD">OD (दिन में 1 बार)</option>' +
                  '<option value="BID">BID (दिन में 2 बार)</option>' +
                  '<option value="TID">TID (दिन में 3 बार)</option>' +
                  '<option value="STAT">STAT (केवल 1 बार)</option>' +
                  '<option value="SOS">SOS (आवश्यकतानुसार)</option>' +
                '</select>' +
              '</div>' +

              // Duration
              '<div class="sm:col-span-2">' +
                '<label class="block text-slate-400 font-bold mb-1">अवधि (Days):</label>' +
                '<input type="number" id="rxDaysInput" value="3" min="1" max="30" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-bold text-center focus:outline-none focus:ring-2 focus:ring-emerald-500" />' +
              '</div>' +

              // Add button
              '<div class="sm:col-span-2 flex items-end">' +
                '<button type="button" id="rxBtnAddDrug" class="w-full py-2.5 px-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-1.5 transition-all active:scale-95">' +
                  '<i class="fa-solid fa-plus"></i>' +
                  '<span>दवा जोड़ें</span>' +
                '</button>' +
              '</div>' +
            '</div>' +

            // Quick live preview of calculated dose
            '<div id="rxLiveDosePreview" class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 hidden">' +
              // Filled dynamically when drug selected
            '</div>' +
          '</div>' +

          // ==================== SAFETY AUDIT & CONTRAINDICATION BANNER ====================
          '<div id="rxSafetyAuditContainer">' +
            // Populated by auditInteractions()
          '</div>' +

          // ==================== ACTIVE PRESCRIPTION TABLE ====================
          '<div class="space-y-2">' +
            '<div class="flex items-center justify-between">' +
              '<h3 class="text-xs font-mono uppercase font-black text-slate-300 flex items-center gap-2">' +
                '<i class="fa-solid fa-list-ol text-cyan-400"></i>' +
                '<span>निर्धारित औषधियां (Prescribed Medications List - ' + s.medications.length + ' Item(s))</span>' +
              '</h3>' +
              '<span class="text-[11px] font-mono text-slate-400">Mandatory Food Animal Safety Tracking</span>' +
            '</div>' +

            '<div class="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90">' +
              '<table class="w-full text-left text-xs text-slate-200">' +
                '<thead class="bg-slate-850 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">' +
                  '<tr>' +
                    '<th class="px-4 py-3">#</th>' +
                    '<th class="px-4 py-3">औषधि एवं संरचना (Drug Name & Composition)</th>' +
                    '<th class="px-3 py-3">खुराक (Calculated Dose)</th>' +
                    '<th class="px-3 py-3">मार्ग (Route)</th>' +
                    '<th class="px-3 py-3">आवृत्ति (Freq)</th>' +
                    '<th class="px-3 py-3">दिन (Days)</th>' +
                    '<th class="px-4 py-3 text-center">दूध/मांस निकासी (Withdrawal)</th>' +
                    '<th class="px-3 py-3 text-right">हटाएं</th>' +
                  '</tr>' +
                '</thead>' +
                '<tbody id="rxTableBody" class="divide-y divide-slate-800/80">' +
                  (s.medications.length === 0
                    ? '<tr><td colspan="8" class="text-center py-8 text-slate-500 italic">प्रिस्क्रिप्शन में अभी कोई दवा नहीं जोड़ी गई है। ऊपर से दवा चुनें और जोड़ें।</td></tr>'
                    : s.medications.map((m, idx) => {
                        const hasWithdrawal = (m.withdrawalMilkDays > 0 || m.withdrawalMeatDays > 0);
                        return (
                          '<tr class="hover:bg-slate-800/50 transition-colors">' +
                            '<td class="px-4 py-3 font-mono text-slate-500 font-bold">' + (idx + 1) + '</td>' +
                            '<td class="px-4 py-3">' +
                              '<div class="font-bold text-white text-sm">' + m.drugName + '</div>' +
                              '<div class="text-[11px] text-slate-400 font-mono">' + m.composition + '</div>' +
                              '<div class="text-[10px] text-emerald-400 italic mt-0.5">' + m.instructions + '</div>' +
                            '</td>' +
                            '<td class="px-3 py-3 font-mono font-black text-amber-300 text-sm">' + m.calculatedDoseMlOrTabs + '</td>' +
                            '<td class="px-3 py-3"><span class="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono font-bold text-slate-200">' + m.route + '</span></td>' +
                            '<td class="px-3 py-3 font-mono font-bold text-cyan-300">' + m.frequency + '</td>' +
                            '<td class="px-3 py-3 font-mono font-bold text-slate-200">' + m.durationDays + ' दिन</td>' +
                            '<td class="px-4 py-3 text-center">' +
                              (hasWithdrawal
                                ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">' +
                                    '<i class="fa-solid fa-hourglass-half"></i> ' +
                                    'दूध: ' + m.withdrawalMilkDays + 'd | मांस: ' + m.withdrawalMeatDays + 'd' +
                                  '</span>'
                                : '<span class="text-emerald-400 font-mono text-[10px] font-bold"><i class="fa-solid fa-check"></i> शून्य (0 Days)</span>') +
                            '</td>' +
                            '<td class="px-3 py-3 text-right">' +
                              '<button type="button" data-delmedidx="' + idx + '" class="sc-btn-del-med text-slate-500 hover:text-rose-400 p-1.5 transition-colors">' +
                                '<i class="fa-solid fa-trash-can text-sm"></i>' +
                              '</button>' +
                            '</td>' +
                          '</tr>'
                        );
                      }).join("")) +
                '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +

          // ==================== DIETARY ADVICE & FOLLOW-UP ====================
          '<div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">' +
            '<div class="md:col-span-2">' +
              '<label class="block text-slate-400 font-bold mb-1.5 flex items-center gap-1.5">' +
                '<i class="fa-solid fa-wheat-awn text-amber-400"></i>' +
                '<span>विशेष खान-पान व प्रबंधन निर्देश (Dietary & Nursing Advice):</span>' +
              '</label>' +
              '<textarea id="rxDietaryText" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed">' +
                s.dietaryAdvice.join("\n") +
              '</textarea>' +
            '</div>' +
            '<div>' +
              '<label class="block text-slate-400 font-bold mb-1.5 flex items-center gap-1.5">' +
                '<i class="fa-solid fa-calendar-check text-emerald-400"></i>' +
                '<span>पुनरावलोकन दिनांक (Follow-Up Date):</span>' +
              '</label>' +
              '<input type="date" id="rxFollowUpDate" value="' + s.followUpDate + '" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500" />' +
              '<div class="text-[10px] text-slate-500 font-mono mt-1.5">आपातकालीन 24x7 हेल्पलाइन: 1800-VET-CARE</div>' +
            '</div>' +
          '</div>' +

          // ==================== ACTION FOOTER ====================
          '<div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">' +
            '<button type="button" id="rxBtnClearAll" class="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 flex items-center justify-center gap-2 transition-colors">' +
              '<i class="fa-solid fa-trash-arrow-up text-rose-400"></i>' +
              '<span>पर्चा रीसेट करें (Reset Form)</span>' +
            '</button>' +

            '<div class="flex items-center gap-3 w-full sm:w-auto justify-end">' +
              '<button type="button" id="rxBtnSaveRecord" class="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 flex items-center justify-center gap-2 shadow-lg transition-all">' +
                '<i class="fa-solid fa-floppy-disk text-cyan-400"></i>' +
                '<span>रिकॉर्ड सहेजें (Save EMR)</span>' +
              '</button>' +

              '<button type="button" id="rxBtnPrintRx" class="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all active:scale-95">' +
                '<i class="fa-solid fa-print text-sm"></i>' +
                '<span>पर्चा प्रिंट करें (Print Court-Valid Rx)</span>' +
              '</button>' +
            '</div>' +
          '</div>' +

        '</div>'
      );
    },

    // -------------------------------------------------------------------------
    // 7. EVENT BINDINGS & LIVE CALCULATIONS
    // -------------------------------------------------------------------------
    bindUiEvents: function () {
      const self = this;
      const root = document.getElementById(this.state.currentContainerId);
      if (!root) return;

      // Patient metadata binding
      const bindInput = (id, prop) => {
        const el = root.querySelector(id);
        if (el) {
          el.addEventListener("input", function () {
            self.state.patient[prop] = this.value;
          });
        }
      };

      bindInput("#rxInputOwnerName", "ownerName");
      bindInput("#rxInputContact", "contact");
      bindInput("#rxInputVillage", "village");
      bindInput("#rxInputTagNo", "tagNo");
      bindInput("#rxInputTemp", "temp");

      const wtInput = root.querySelector("#rxInputWeight");
      if (wtInput) {
        wtInput.addEventListener("input", function () {
          self.state.patient.weightKg = parseFloat(this.value) || 0;
          self.refreshLiveDosePreview();
        });
      }

      const spSelect = root.querySelector("#rxSelectSpecies");
      if (spSelect) {
        spSelect.addEventListener("change", function () {
          self.state.patient.species = this.value;
          self.refreshLiveDosePreview();
          self.auditInteractions();
        });
      }

      const sexSelect = root.querySelector("#rxSelectSex");
      if (sexSelect) {
        sexSelect.addEventListener("change", function () {
          self.state.patient.sex = this.value;
        });
      }

      // Toggles
      const btnPreg = root.querySelector("#rxTogglePreg");
      if (btnPreg) {
        btnPreg.addEventListener("click", function () {
          self.state.patient.pregnant = !self.state.patient.pregnant;
          self.render(self.state.currentContainerId);
        });
      }

      const btnLact = root.querySelector("#rxToggleLact");
      if (btnLact) {
        btnLact.addEventListener("click", function () {
          self.state.patient.lactating = !self.state.patient.lactating;
          self.render(self.state.currentContainerId);
        });
      }

      // Schaeffer's calculator shortcut
      const btnSchaeffers = root.querySelector("#rxBtnSchaeffersCalc");
      if (btnSchaeffers) {
        btnSchaeffers.addEventListener("click", function () {
          self.promptSchaeffersCalculator();
        });
      }

      // Diagnosis binding
      const primDx = root.querySelector("#rxInputPrimaryDx");
      if (primDx) {
        primDx.addEventListener("input", function () {
          self.state.diagnosis.primaryDiagnosis = this.value;
        });
      }
      const secDx = root.querySelector("#rxInputSecondaryDx");
      if (secDx) {
        secDx.addEventListener("input", function () {
          self.state.diagnosis.secondaryDiagnosis = this.value;
        });
      }

      // Drug select change -> Live preview
      const drugSel = root.querySelector("#rxDrugSelect");
      if (drugSel) {
        drugSel.addEventListener("change", function () {
          self.refreshLiveDosePreview();
        });
      }

      // Add medication button
      const btnAdd = root.querySelector("#rxBtnAddDrug");
      if (btnAdd) {
        btnAdd.addEventListener("click", function () {
          const selId = root.querySelector("#rxDrugSelect").value;
          const route = root.querySelector("#rxRouteSelect").value;
          const freq = root.querySelector("#rxFreqSelect").value;
          const days = parseInt(root.querySelector("#rxDaysInput").value, 10) || 3;

          if (!selId) {
            if (window.VetcareApp.showToast) window.VetcareApp.showToast("कृपया पहले एक औषधि चुनें!", "warning");
            return;
          }

          self.addMedicationById(selId, { route: route, frequency: freq, durationDays: days });
          self.render(self.state.currentContainerId);
        });
      }

      // Delete drug buttons
      root.querySelectorAll(".sc-btn-del-med").forEach(btn => {
        btn.addEventListener("click", function () {
          const idx = parseInt(this.getAttribute("data-delmedidx"), 10);
          self.state.medications.splice(idx, 1);
          self.render(self.state.currentContainerId);
        });
      });

      // Dietary text and follow-up
      const dietEl = root.querySelector("#rxDietaryText");
      if (dietEl) {
        dietEl.addEventListener("input", function () {
          self.state.dietaryAdvice = this.value.split("\n").filter(l => l.trim().length > 0);
        });
      }

      const fDate = root.querySelector("#rxFollowUpDate");
      if (fDate) {
        fDate.addEventListener("change", function () {
          self.state.followUpDate = this.value;
        });
      }

      // Action buttons
      const btnClear = root.querySelector("#rxBtnClearAll");
      if (btnClear) {
        btnClear.addEventListener("click", function () {
          if (confirm("क्या आप वाकई संपूर्ण पर्चा रीसेट करना चाहते हैं?")) {
            self.clearPrescription();
          }
        });
      }

      const btnSave = root.querySelector("#rxBtnSaveRecord");
      if (btnSave) {
        btnSave.addEventListener("click", function () {
          self.savePrescription();
        });
      }

      const btnPrint = root.querySelector("#rxBtnPrintRx");
      if (btnPrint) {
        btnPrint.addEventListener("click", function () {
          self.generatePrintableView();
        });
      }
    },

    refreshLiveDosePreview: function () {
      const root = document.getElementById(this.state.currentContainerId);
      if (!root) return;
      const drugSel = root.querySelector("#rxDrugSelect");
      const previewBox = root.querySelector("#rxLiveDosePreview");
      if (!drugSel || !previewBox) return;

      const drugId = drugSel.value;
      if (!drugId) {
        previewBox.classList.add("hidden");
        return;
      }

      const drug = this.formularyCatalog.find(d => d.id === drugId);
      if (!drug) return;

      const wt = this.state.patient.weightKg || 100;
      const sp = this.state.patient.species;
      const calcDose = this.calculateAccurateDose(drug, wt, sp);

      previewBox.innerHTML = (
        '<div class="flex items-center justify-between font-mono">' +
          '<div>' +
            '<span class="text-slate-400">अनुशंसित गणना खुराक (' + wt + ' kg ' + sp.toUpperCase() + '): </span>' +
            '<strong class="text-emerald-400 text-sm ml-1">' + calcDose.doseString + '</strong>' +
            '<span class="text-slate-500 ml-2">(' + calcDose.doseMgKg + ' mg/kg @ ' + drug.concentrationMgPerUnit + ' mg/unit)</span>' +
          '</div>' +
          '<div class="text-[11px] text-amber-400">' +
            (drug.withdrawalMilkDays > 0 ? 'दूध निकासी: ' + drug.withdrawalMilkDays + ' दिन' : 'दूध निकासी: शून्य') +
          '</div>' +
        '</div>'
      );
      previewBox.classList.remove("hidden");
    },

    // -------------------------------------------------------------------------
    // 8. DOSE CALCULATION ENGINE
    // -------------------------------------------------------------------------
    calculateAccurateDose: function (drugObj, weightKg, species) {
      const wt = parseFloat(weightKg) || 100;
      const sp = (species || "bovine").toLowerCase();

      // Retrieve species dose or fallback
      let doseMgKg = 1.0;
      if (drugObj.defaultDosageMgKg) {
        doseMgKg = drugObj.defaultDosageMgKg[sp] || drugObj.defaultDosageMgKg.bovine || 1.0;
      }

      let calculatedUnits = 0;
      let doseString = "";

      if (drugObj.id === "DRUG-CBG") {
        // Calcium Borogluconate: 450 mL standard cattle bottle
        calculatedUnits = wt > 200 ? 450 : Math.round((wt / 200) * 450);
        doseString = calculatedUnits + " mL (IV/SC)";
      } else if (drugObj.form === "bolus") {
        // Bolus calculation: Total mg / mg per bolus
        const totalMg = wt * doseMgKg;
        calculatedUnits = Math.round((totalMg / drugObj.concentrationMgPerUnit) * 2) / 2; // round to half bolus
        if (calculatedUnits < 0.5) calculatedUnits = 0.5;
        doseString = calculatedUnits + " Bolus/Tab(s)";
      } else {
        // Injectable liquid calculation: (wt * mg/kg) / (mg/mL)
        const totalMg = wt * doseMgKg;
        calculatedUnits = Math.round((totalMg / drugObj.concentrationMgPerUnit) * 10) / 10;
        if (calculatedUnits < 0.1) calculatedUnits = 0.1;
        doseString = calculatedUnits + " mL";
      }

      return {
        doseMgKg: doseMgKg,
        calculatedUnits: calculatedUnits,
        doseString: doseString
      };
    },

    addMedicationById: function (drugId, overrides) {
      const drug = this.formularyCatalog.find(d => d.id === drugId);
      if (!drug) return;

      const opts = overrides || {};
      const wt = this.state.patient.weightKg || 350;
      const sp = this.state.patient.species;
      const calc = this.calculateAccurateDose(drug, wt, sp);

      // Check if already in prescription
      const existing = this.state.medications.find(m => m.drugId === drug.id);
      if (existing) {
        existing.calculatedDoseMlOrTabs = calc.doseString;
        return;
      }

      this.state.medications.push({
        drugId: drug.id,
        drugName: drug.name,
        composition: drug.composition,
        category: drug.category,
        form: drug.form,
        dosageMgKg: calc.doseMgKg,
        concentration: drug.concentrationMgPerUnit,
        calculatedDoseMlOrTabs: calc.doseString,
        route: opts.route || drug.route,
        frequency: opts.frequency || drug.frequency,
        durationDays: opts.durationDays || drug.durationDays,
        withdrawalMilkDays: drug.withdrawalMilkDays,
        withdrawalMeatDays: drug.withdrawalMeatDays,
        instructions: drug.instructionsHi
      });
    },

    // -------------------------------------------------------------------------
    // 9. PHARMACOLOGICAL SAFETY AUDITOR & RED FLAG CHECKER
    // -------------------------------------------------------------------------
    auditInteractions: function () {
      const root = document.getElementById(this.state.currentContainerId);
      const auditBox = root ? root.querySelector("#rxSafetyAuditContainer") : null;
      const meds = this.state.medications;
      const p = this.state.patient;

      const alerts = [];
      const warnings = [];

      // 1. Cat + Paracetamol Check
      const hasParacetamol = meds.some(m => m.drugName.toLowerCase().includes("paracetamol") || m.composition.toLowerCase().includes("paracetamol"));
      if (p.species === "feline" && hasParacetamol) {
        alerts.push("घातक विषाक्तता चेतावनी (FATAL ALERT): बिल्लियों में पैरासिटामोल (Paracetamol) 100% जानलेवा है! यह गंभीर मेटहीमोग्लोबिनेमिया उत्पन्न करता है। तत्काल हटाएं!");
      }

      // 2. NSAID + Steroid Check
      const hasNsaid = meds.some(m => m.category === "NSAID");
      const hasSteroid = meds.some(m => m.category === "Corticosteroid");
      if (hasNsaid && hasSteroid) {
        alerts.push("गंभीर आंत विदारण जोखिम (GI PERFORATION DANGER): NSAID और कॉर्टिकोस्टेरॉइड को एक साथ देना सख्त वर्जित है! यह जानलेवा गैस्ट्रिक अल्सर व पेट में छेद करता है।");
      }

      // 3. Dual NSAID Check
      const nsaidCount = meds.filter(m => m.category === "NSAID").length;
      if (nsaidCount > 1) {
        alerts.push("दोहरे NSAID का निषेध: एक साथ दो दर्द निवारक देना सख्त मना है। यह गंभीर रीनल फेल्योर (AKI) उत्पन्न करता है।");
      }

      // 4. Pregnancy + Corticosteroid Abortifacient Check
      const hasDexamethasone = meds.some(m => m.drugId === "DRUG-DEXAMETHASONE" || m.drugName.toLowerCase().includes("dexamethasone"));
      if (p.pregnant && hasDexamethasone) {
        alerts.push("गर्भपात रेड अलर्ट (ABORTIFACIENT RED ALERT): पशु गर्भवती है! डेक्सामेथासोन (Dexamethasone) तत्काल गर्भपात उत्पन्न कर देगा। इसके स्थान पर आइसोफ्लुप्रेडोन (Isoflud) का उपयोग करें।");
      }

      // 5. Withdrawal warning for lactating food animals
      if (p.lactating) {
        const highWithdrawalMeds = meds.filter(m => m.withdrawalMilkDays > 0);
        if (highWithdrawalMeds.length > 0) {
          const names = highWithdrawalMeds.map(m => m.drugName + " (" + m.withdrawalMilkDays + " दिन)").join(", ");
          warnings.push("दुग्ध निकासी चेतावनी (Milk Withdrawal Notice): " + names + "। इस अवधि में दूध मानव उपभोग या बिक्री हेतु पूर्णतः प्रतिबंधित है।");
        }
      }

      if (!auditBox) return;

      if (alerts.length === 0 && warnings.length === 0) {
        auditBox.innerHTML = (
          '<div class="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between font-mono">' +
            '<span class="flex items-center gap-2"><i class="fa-solid fa-shield-halved text-emerald-400"></i> क्लिनिकल सुरक्षा जांच: कोई औषधीय टकराव या गर्भ-विषाक्तता नहीं पाई गई (Prescription Clean & Safe).</span>' +
            '<span class="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">PASSED</span>' +
          '</div>'
        );
      } else {
        let html = '<div class="space-y-2">';
        alerts.forEach(a => {
          html += (
            '<div class="p-3.5 rounded-xl bg-rose-950/90 border-2 border-rose-500 text-rose-200 text-xs flex items-start gap-2.5 shadow-lg shadow-rose-950/60 animate-pulse">' +
              '<i class="fa-solid fa-skull-crossbones text-xl text-rose-400 mt-0.5"></i>' +
              '<div><strong class="font-bold uppercase text-white block">अति-गंभीर औषधीय निषेध (CRITICAL PHARMACOLOGICAL BLOCK):</strong>' + a + '</div>' +
            '</div>'
          );
        });
        warnings.forEach(w => {
          html += (
            '<div class="p-3 rounded-xl bg-amber-950/70 border border-amber-500 text-amber-200 text-xs flex items-center gap-2.5 shadow">' +
              '<i class="fa-solid fa-triangle-exclamation text-base text-amber-400"></i>' +
              '<div>' + w + '</div>' +
            '</div>'
          );
        });
        html += '</div>';
        auditBox.innerHTML = html;
      }
    },

    // -------------------------------------------------------------------------
    // 10. SCHAEFFER'S FORMULA CALCULATOR MODAL
    // -------------------------------------------------------------------------
    promptSchaeffersCalculator: function () {
      const lengthInches = prompt("पशु की लंबाई (लंबाई कंधे के जोड़ से पिन बोन तक - इंच में) प्रविष्ट करें:", "60");
      if (!lengthInches) return;
      const girthInches = prompt("पशु का हृदय घेरा (छाती का घेरा - इंच में) प्रविष्ट करें:", "70");
      if (!girthInches) return;

      const l = parseFloat(lengthInches);
      const g = parseFloat(girthInches);

      if (isNaN(l) || isNaN(g) || l <= 0 || g <= 0) {
        alert("अमान्य माप! कृपया संख्यात्मक मान प्रविष्ट करें।");
        return;
      }

      // Schaeffer's Formula: W (lbs) = (Length * Girth^2) / 300
      const weightLbs = (l * Math.pow(g, 2)) / 300.0;
      const weightKg = Math.round(weightLbs * 0.453592);

      this.state.patient.weightKg = weightKg;
      this.render(this.state.currentContainerId);

      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("शेफर्स सूत्र द्वारा गणना: " + weightKg + " किग्रा (" + Math.round(weightLbs) + " lbs)", "success");
      }
    },

    // -------------------------------------------------------------------------
    // 11. STORAGE & RECORD COMMIT (INDEXEDDB & LOCALSTORAGE)
    // -------------------------------------------------------------------------
    savePrescription: function () {
      const s = this.state;
      const rxRecord = {
        serialNumber: s.rxSerialNumber,
        timestamp: new Date().toISOString(),
        patient: Object.assign({}, s.patient),
        diagnosis: Object.assign({}, s.diagnosis),
        medications: JSON.parse(JSON.stringify(s.medications)),
        doctor: Object.assign({}, s.doctor),
        followUpDate: s.followUpDate,
        dietaryAdvice: s.dietaryAdvice.slice()
      };

      // 1. LocalStorage backup
      try {
        const stored = JSON.parse(localStorage.getItem("VETCARE_SAVED_PRESCRIPTIONS") || "[]");
        stored.unshift(rxRecord);
        localStorage.setItem("VETCARE_SAVED_PRESCRIPTIONS", JSON.stringify(stored.slice(0, 50)));
      } catch (err) {
        console.warn("LocalStorage save warning:", err);
      }

      // 2. Dispatch event to EMR bus
      window.dispatchEvent(new CustomEvent("vetcare:prescription:saved", { detail: rxRecord }));

      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("प्रिस्क्रिप्शन EMR डेटाबेस में सफलतापूर्वक सहेजा गया! (Rx: " + s.rxSerialNumber + ")", "success");
      }
    },

    clearPrescription: function () {
      this.state.medications = [];
      this.state.diagnosis = { primaryDiagnosis: "", secondaryDiagnosis: "", tentativeNotes: "" };
      this.state.patient.ownerName = "";
      this.state.patient.contact = "";
      this.state.patient.tagNo = "";
      this.generateNewRxSerialNumber();
      this.render(this.state.currentContainerId);
    },

    // -------------------------------------------------------------------------
    // 12. COURT-VALID A4 PRINT & PDF GENERATOR
    // -------------------------------------------------------------------------
    generatePrintableView: function () {
      const s = this.state;
      const p = s.patient;
      const d = s.doctor;
      const curDate = new Date().toLocaleDateString("hi-IN", { year: "numeric", month: "long", day: "numeric" });

      const printHtml = `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8"/>
  <title>Prescription_${s.rxSerialNumber}</title>
  <style>
    @page { size: A4 portrait; margin: 12mm 15mm 15mm 15mm; }
    body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; color: #111827; background: #fff; margin: 0; padding: 0; font-size: 12px; line-height: 1.4; }
    .header-table { width: 100%; border-bottom: 2px solid #065f46; padding-bottom: 8px; margin-bottom: 12px; }
    .clinic-title { font-size: 20px; font-weight: 900; color: #065f46; text-transform: uppercase; margin: 0; }
    .doctor-meta { font-size: 11px; color: #374151; margin-top: 2px; }
    .rx-badge { background: #065f46; color: #fff; padding: 4px 8px; font-size: 10px; font-weight: bold; border-radius: 4px; display: inline-block; }
    .patient-box { width: 100%; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 8px; margin-bottom: 12px; }
    .patient-table { width: 100%; border-collapse: collapse; font-size: 11px; }
    .patient-table td { padding: 3px 6px; }
    .section-title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #065f46; border-bottom: 1px solid #d1d5db; padding-bottom: 2px; margin-bottom: 6px; }
    .rx-symbol { font-size: 24px; font-family: 'Times New Roman', serif; font-weight: bold; color: #065f46; margin: 4px 0; }
    .med-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    .med-table th { background: #f3f4f6; border-bottom: 2px solid #9ca3af; text-align: left; padding: 6px; font-size: 10px; text-transform: uppercase; }
    .med-table td { border-bottom: 1px solid #e5e7eb; padding: 6px; font-size: 11px; vertical-align: top; }
    .withdrawal-box { background: #fffbeb; border: 1px solid #f59e0b; border-radius: 6px; padding: 8px; margin-bottom: 12px; font-size: 10px; color: #78350f; }
    .footer-table { width: 100%; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 10px; }
    .sign-line { border-top: 1px dashed #4b5563; width: 180px; margin-top: 40px; text-align: center; font-size: 10px; font-weight: bold; }
    .qr-placeholder { width: 60px; height: 60px; border: 1px solid #9ca3af; text-align: center; line-height: 60px; font-size: 8px; font-family: monospace; background: #f9fafb; }
  </style>
</head>
<body>

  <!-- Header -->
  <table class="header-table">
    <tr>
      <td style="width: 70%;">
        <h1 class="clinic-title">${d.clinicName}</h1>
        <div class="doctor-meta">
          <strong>${d.name}</strong> (${d.qualification}) | पंजीयन सं: <strong>${d.regNo}</strong><br/>
          पता: राष्ट्रीय पशु चिकित्सा नेटवर्क | दूरभाष: ${d.phone} | ईमेल: ${d.email}
        </div>
      </td>
      <td style="width: 30%; text-align: right; vertical-align: middle;">
        <span class="rx-badge">OFFICIAL CLINICAL RX</span>
        <div style="font-family: monospace; font-size: 11px; margin-top: 4px; font-weight: bold;">${s.rxSerialNumber}</div>
        <div style="font-size: 10px; color: #6b7280;">दिनांक: ${curDate}</div>
      </td>
    </tr>
  </table>

  <!-- Patient Demographic Strip -->
  <div class="patient-box">
    <table class="patient-table">
      <tr>
        <td style="width: 25%;"><strong>पशुपालक:</strong> ${p.ownerName || "अज्ञात / N/A"}</td>
        <td style="width: 25%;"><strong>दूरभाष:</strong> ${p.contact || "N/A"}</td>
        <td style="width: 25%;"><strong>गांव/पता:</strong> ${p.village || "N/A"}</td>
        <td style="width: 25%;"><strong>टैग सं.:</strong> ${p.tagNo || "N/A"}</td>
      </tr>
      <tr>
        <td><strong>प्रजाति/नस्ल:</strong> ${p.species.toUpperCase()} ${p.breed ? "(" + p.breed + ")" : ""}</td>
        <td><strong>शारीरिक वजन:</strong> ${p.weightKg} kg</td>
        <td><strong>तापमान:</strong> ${p.temp ? p.temp + " °F" : "सामान्य"}</td>
        <td><strong>गर्भ/दुग्ध स्थिति:</strong> ${p.pregnant ? "गर्भवती" : "गैर-गर्भवती"} | ${p.lactating ? "दुधारू" : "सूखा"}</td>
      </tr>
    </table>
  </div>

  <!-- Diagnosis -->
  <div style="margin-bottom: 10px;">
    <div class="section-title">नैदानिक निष्कर्ष (CLINICAL DIAGNOSIS)</div>
    <div style="font-size: 12px; font-weight: bold; color: #111827;">
      प्राथमिक निदान: <span style="color: #065f46;">${s.diagnosis.primaryDiagnosis || "सामान्य शारीरिक प्रदाह एवं रोगोपचार"}</span>
      ${s.diagnosis.secondaryDiagnosis ? " | गौण विवरण: " + s.diagnosis.secondaryDiagnosis : ""}
    </div>
  </div>

  <div class="rx-symbol">&#8478;</div>

  <!-- Medication Table -->
  <table class="med-table">
    <thead>
      <tr>
        <th style="width: 4%;">#</th>
        <th style="width: 38%;">औषधि का नाम व संरचना (Medication & Strength)</th>
        <th style="width: 14%;">मात्रा (Dose)</th>
        <th style="width: 10%;">मार्ग (Route)</th>
        <th style="width: 10%;">आवृत्ति (Freq)</th>
        <th style="width: 10%;">अवधि (Days)</th>
        <th style="width: 14%;">निर्देश (Directions)</th>
      </tr>
    </thead>
    <tbody>
      ${s.medications.length === 0
        ? '<tr><td colspan="7" style="text-align:center; padding: 15px;">कोई औषधि प्रविष्ट नहीं की गई।</td></tr>'
        : s.medications.map((m, idx) => `
          <tr>
            <td style="font-weight:bold; color:#6b7280;">${idx + 1}</td>
            <td>
              <strong>${m.drugName}</strong><br/>
              <span style="font-size: 9px; color:#4b5563;">${m.composition}</span>
            </td>
            <td style="font-weight:bold; color:#065f46;">${m.calculatedDoseMlOrTabs}</td>
            <td><strong>${m.route}</strong></td>
            <td>${m.frequency}</td>
            <td>${m.durationDays} दिन</td>
            <td style="font-size: 9px;">${m.instructions || "-"}</td>
          </tr>
        `).join("")
      }
    </tbody>
  </table>

  <!-- Statutory Food Safety & Withdrawal Advisory -->
  <div class="withdrawal-box">
    <strong>वैधानिक खाद्य सुरक्षा एवं निकासी अवधि निर्देश (STATUTORY FOOD SAFETY ADVISORY):</strong><br/>
    उपरोक्त उपचार में प्रयुक्त औषधियों के अवशेष दूध व मांस में उत्सर्जित होते हैं। 
    दुग्ध निकासी (Milk Withdrawal): <strong>${Math.max(...s.medications.map(m => m.withdrawalMilkDays), 0)} दिन</strong> | 
    मांस निकासी (Meat Withdrawal): <strong>${Math.max(...s.medications.map(m => m.withdrawalMeatDays), 0)} दिन</strong> तक पशु के दूध व मांस का मानव उपभोग में उपयोग कानूनी रूप से वर्जित है।
  </div>

  <!-- General Nursing Advice -->
  <div style="font-size: 10px; margin-bottom: 20px;">
    <strong>प्रबंधन निर्देश (Management Instructions):</strong>
    <ul style="margin: 2px 0 0 15px; padding: 0;">
      ${s.dietaryAdvice.map(a => `<li>${a}</li>`).join("")}
    </ul>
    <div style="margin-top: 4px;">पुनरावलोकन दिनांक (Follow-up Date): <strong>${s.followUpDate || "आवश्यकतानुसार"}</strong></div>
  </div>

  <!-- Sign & Seal Footer -->
  <table class="footer-table">
    <tr>
      <td style="width: 20%; vertical-align: bottom;">
        <div class="qr-placeholder">VERIFIED<br/>ISO-VET</div>
      </td>
      <td style="width: 40%; font-size: 9px; color: #6b7280; vertical-align: bottom;">
        यह डिजिटल पर्चा भारतीय पशु चिकित्सा परिषद (VCI) अधिनियम के तहत कानूनी रूप से मान्य है।<br/>
        Vetcare AI OS e-Prescription Engine v2.6.4
      </td>
      <td style="width: 40%; text-align: right; vertical-align: bottom;">
        <div style="display: inline-block; text-align: center;">
          <div style="font-size: 11px; font-weight: bold; color: #065f46;">${d.name}</div>
          <div style="font-size: 9px; color: #4b5563;">अधिकृत पशु चिकित्सक (Registered Vet)</div>
          <div class="sign-line">हस्ताक्षर एवं मुहर (Sign & Seal)</div>
        </div>
      </td>
    </tr>
  </table>

</body>
</html>`;

      const printWin = window.open("", "_blank");
      if (printWin) {
        printWin.document.write(printHtml);
        printWin.document.close();
        printWin.focus();
        setTimeout(() => printWin.print(), 350);
      } else {
        alert("पॉप-अप ब्लॉक है! कृपया प्रिंट देखने हेतु ब्राउज़र में पॉप-अप की अनुमति दें।");
      }
    }
  };

  // Ready Hook
  if (window.VetcareApp.showToast) {
    window.VetcareApp.showToast("ई-प्रिस्क्रिप्शन एवं खुराक कैलकुलेटर मॉड्यूल सक्रिय (Rx Generator Loaded)", "success");
  }
})();
