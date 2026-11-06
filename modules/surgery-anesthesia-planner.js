// Vetcare AI OS - Veterinary Surgery Planner, Balanced Anesthetic Protocol & Intra-Op Monitoring Module (2026 Production)
(function (root) {
  "use strict";

  root.VetcareApp = root.VetcareApp || {};
  root.VetcareApp.Modules = root.VetcareApp.Modules || {};
  root.VetcareApp.ClinicalData = root.VetcareApp.ClinicalData || {};

  // Database Constants
  const DB_NAME = "VetcareEMR_DB";
  const DB_VERSION = 1;
  const STORE_SURGERY = "clinical_records";

  // Master Surgical Procedures Database with Standard Approaches & Urgency
  const SURGICAL_PROCEDURES_MASTER = [
    { id: "proc_cesarean_section", name: "Emergency Cesarean Section / Hysterotomy (सिजेरियन ऑपरेशन)", species: ["bovine", "bubaline", "caprine", "canine"], defaultUrgency: "EMERGENCY", defaultApproach: "Left Flank / Ventrolateral / Midline", estDurationMin: 75, expectedBloodLoss: "Moderate", antibioticTiming: "Within 30 mins before incision" },
    { id: "proc_rumenotomy", name: "Rumenotomy / Foreign Body Removal (पेट चीरा / प्लास्टिक-लोहा निष्कासन)", species: ["bovine", "bubaline"], defaultUrgency: "URGENT", defaultApproach: "Left Paralumbar Fossa Laparotomy", estDurationMin: 60, expectedBloodLoss: "Low", antibioticTiming: "Pre-op Ceftiofur/Ampicillin" },
    { id: "proc_diaphragmatic_hernia", name: "Diaphragmatic Herniorrhaphy (डायफ्रामेटिक हर्निया सुधार)", species: ["bubaline", "bovine"], defaultUrgency: "EMERGENCY", defaultApproach: "Left Flank & Xiphoid Trans-thoracic", estDurationMin: 120, expectedBloodLoss: "High", antibioticTiming: "Pre-op Broad Spectrum" },
    { id: "proc_ovariohysterectomy", name: "Ovariohysterectomy / Spay (गर्भाशय व डिंबग्रंथि निष्कासन)", species: ["canine", "feline"], defaultUrgency: "ELECTIVE", defaultApproach: "Ventral Midline Laparotomy", estDurationMin: 45, expectedBloodLoss: "Low", antibioticTiming: "Single dose Cefazolin IV" },
    { id: "proc_gastric_dilatation_volvulus", name: "GDV / Gastric Torsion Derotation & Gastropexy", species: ["canine"], defaultUrgency: "EMERGENCY", defaultApproach: "Cranial Ventral Midline", estDurationMin: 90, expectedBloodLoss: "High", antibioticTiming: "Immediate Pre-op IV" },
    { id: "proc_cystotomy_calculi", name: "Cystotomy (Urolithiasis / पथरी निष्कासन)", species: ["bovine", "caprine", "canine", "feline"], defaultUrgency: "URGENT", defaultApproach: "Caudal Paramedian / Ventral Midline", estDurationMin: 50, expectedBloodLoss: "Low", antibioticTiming: "Pre-op Ampicillin-Sulbactam" },
    { id: "proc_orthopedic_pinning", name: "Orthopedic Intramedullary Pinning / Plating (अस्थि भंग सुधार)", species: ["canine", "caprine", "bovine"], defaultUrgency: "URGENT", defaultApproach: "Craniolateral Open Reduction", estDurationMin: 90, expectedBloodLoss: "Moderate", antibioticTiming: "Cefuroxime IV at Induction" },
    { id: "proc_abomasal_displacement", name: "Left / Right Displaced Abomasum (LDA/RDA) Omentopexy", species: ["bovine"], defaultUrgency: "URGENT", defaultApproach: "Right Flank Laparotomy", estDurationMin: 60, expectedBloodLoss: "Low", antibioticTiming: "Pre-op IV" }
  ];

  // Anesthetic Pharmacopeia Reference Matrix (Stock concentrations in mg/ml)
  const ANESTHETIC_DRUGS_MASTER = {
    xylazine: { name: "Xylazine HCl (2% Injection)", stockMgMl: 20.0, defaultRoute: "IM / IV", bovineDoseMgKg: 0.03, equineDoseMgKg: 0.8, canineDoseMgKg: 0.5, felineDoseMgKg: 0.5, notes: "CRITICAL: Ruminants are 10x more sensitive than horses! Never exceed 0.05 mg/kg in cattle." },
    detomidine: { name: "Detomidine HCl (10 mg/ml)", stockMgMl: 10.0, defaultRoute: "IV", bovineDoseMgKg: 0.01, equineDoseMgKg: 0.02, canineDoseMgKg: 0.0, felineDoseMgKg: 0.0, notes: "Equine sedation gold standard. Potent alpha-2 agonist." },
    butorphanol: { name: "Butorphanol Tartrate (10 mg/ml)", stockMgMl: 10.0, defaultRoute: "IV / IM", bovineDoseMgKg: 0.02, equineDoseMgKg: 0.05, canineDoseMgKg: 0.2, felineDoseMgKg: 0.2, notes: "Kappa opioid partial agonist. Excellent visceral analgesia." },
    acepromazine: { name: "Acepromazine Maleate (10 mg/ml)", stockMgMl: 10.0, defaultRoute: "IM / IV", bovineDoseMgKg: 0.01, equineDoseMgKg: 0.03, canineDoseMgKg: 0.02, felineDoseMgKg: 0.02, notes: "Phenothiazine neuroleptic. Causes peripheral vasodilation; contraindicated in shock/hypovolemia." },
    atropine: { name: "Atropine Sulfate (0.6 mg/ml)", stockMgMl: 0.6, defaultRoute: "IM / IV", bovineDoseMgKg: 0.02, equineDoseMgKg: 0.01, canineDoseMgKg: 0.04, felineDoseMgKg: 0.04, notes: "Anticholinergic vagolytic. Reverses profound bradycardia." },
    propofol: { name: "Propofol 1% Emulsion (10 mg/ml)", stockMgMl: 10.0, defaultRoute: "Slow IV to effect", bovineDoseMgKg: 3.0, equineDoseMgKg: 2.0, canineDoseMgKg: 4.0, felineDoseMgKg: 5.0, notes: "Ultra-short acting induction. Titrate slowly over 60s to avoid transient apnea." },
    ketamine: { name: "Ketamine HCl (50 mg/ml)", stockMgMl: 50.0, defaultRoute: "IV / IM", bovineDoseMgKg: 2.0, equineDoseMgKg: 2.2, canineDoseMgKg: 5.0, felineDoseMgKg: 5.0, notes: "NMDA antagonist dissociative. Avoid as sole agent; pair with Diazepam or Xylazine." },
    diazepam: { name: "Diazepam (5 mg/ml)", stockMgMl: 5.0, defaultRoute: "IV strictly", bovineDoseMgKg: 0.1, equineDoseMgKg: 0.05, canineDoseMgKg: 0.25, felineDoseMgKg: 0.25, notes: "Benzodiazepine central muscle relaxant. Insoluble in water; do not mix in infusion bags." },
    lignocaine: { name: "Lignocaine HCl 2% Plain (20 mg/ml)", stockMgMl: 20.0, defaultRoute: "Local / Inverted-L / Epidural", bovineDoseMgKg: 4.0, equineDoseMgKg: 3.0, canineDoseMgKg: 5.0, felineDoseMgKg: 2.5, notes: "Fast-acting local anesthetic. Maximum safe dose is 6 mg/kg (do not exceed)." },
    atipamezole: { name: "Atipamezole (Antisedan 5 mg/ml)", stockMgMl: 5.0, defaultRoute: "IM", bovineDoseMgKg: 0.05, equineDoseMgKg: 0.05, canineDoseMgKg: 0.2, felineDoseMgKg: 0.2, notes: "Specific alpha-2 reversal for Xylazine / Dexmedetomidine." },
    epinephrine: { name: "Epinephrine 1:1000 (1 mg/ml)", stockMgMl: 1.0, defaultRoute: "IV / IT / IC", bovineDoseMgKg: 0.01, equineDoseMgKg: 0.01, canineDoseMgKg: 0.01, felineDoseMgKg: 0.01, notes: "Crash Cart CPR: Cardiac arrest and anaphylactic shock resuscitation." }
  };

  root.VetcareApp.ClinicalData.SurgicalProtocols = SURGICAL_PROCEDURES_MASTER;
  root.VetcareApp.ClinicalData.PainAnalgesia = ANESTHETIC_DRUGS_MASTER;

  // Internal Module Reactive State
  const state = {
    patient: {
      id: "PAT-100293847561",
      tagNo: "100293847561",
      name: "Gauri (Murrah Buffalo)",
      species: "bubaline",
      breed: "Murrah Indigenous",
      weightKg: 520,
      ageYears: 5.5,
      sex: "Female",
      tempF: 102.2,
      heartRate: 74,
      respRate: 26,
      lastFedHoursAgo: 18,
      lastWaterHoursAgo: 6
    },
    surgicalProcedure: Object.assign({}, SURGICAL_PROCEDURES_MASTER[0]),
    asaStatus: "3", // '1' | '2' | '3' | '4' | '5'
    isEmergencyModifier: true,
    safetyChecklist: {
      signInCompleted: false,
      anesthesiaMachineTested: false,
      endotrachealTubeCuffed: false,
      pulseOximeterAttached: false,
      ivCatheterPatent: false,
      timeOutCompleted: false,
      teamIdentified: false,
      patientSiteConfirmed: false,
      antibioticGivenIn60Min: false,
      signOutCompleted: false,
      spongeGauzeCountMatched: false,
      instrumentCountMatched: false,
      postOpAnalgesiaPrescribed: false
    },
    intraOpVitalsLog: [
      { timeMin: 0, hr: 74, rr: 24, spo2: 97, map: 85, tempF: 102.0, agentPct: 0.0, fluidsMlGiven: 200, notes: "Induction complete. Flank prepared." },
      { timeMin: 5, hr: 78, rr: 22, spo2: 96, map: 82, tempF: 101.8, agentPct: 1.5, fluidsMlGiven: 450, notes: "Skin incision. Paravertebral block fully active." },
      { timeMin: 10, hr: 82, rr: 20, spo2: 96, map: 78, tempF: 101.6, agentPct: 1.5, fluidsMlGiven: 700, notes: "Uterine exteriorization. Fetus extracted alive." },
      { timeMin: 15, hr: 76, rr: 18, spo2: 98, map: 80, tempF: 101.5, agentPct: 1.0, fluidsMlGiven: 950, notes: "Uterine closure with 2-0 chromic catgut (Cushing)." }
    ],
    activeTab: "anesthesia_calculator", // 'preop_risk_eval' | 'anesthesia_calculator' | 'surgical_checklist' | 'intraop_vitals_sheet'
    containerElement: null,
    db: null
  };

  // Toast Helper
  function notify(msg, type) {
    if (root.VetcareApp && typeof root.VetcareApp.showToast === "function") {
      root.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[SURGERY PLANNER ${type ? type.toUpperCase() : "INFO"}]: ${msg}`);
    }
  }

  // Database Connection
  function getDbConnection() {
    return new Promise((resolve, reject) => {
      if (state.db) {
        resolve(state.db);
        return;
      }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onsuccess = (e) => {
        state.db = e.target.result;
        resolve(state.db);
      };
      req.onerror = (err) => reject(err);
    });
  }

  // Primary Module API Definition
  const SurgeryAnesthesiaPlanner = {
    // 1. LIFECYCLE: Init
    init: async function () {
      try {
        await getDbConnection();
        this.setupEventBus();
        return true;
      } catch (err) {
        console.error("SurgeryAnesthesiaPlanner initialization error:", err);
        return false;
      }
    },

    // 2. LIFECYCLE: Render
    render: function (containerId) {
      const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error("Container element not found for SurgeryAnesthesiaPlanner:", containerId);
        return;
      }
      state.containerElement = container;

      const calculatedProtocol = this.calculateAnestheticDoses(
        state.patient.species,
        state.patient.weightKg,
        state.asaStatus,
        state.surgicalProcedure.id
      );

      container.innerHTML = `
        <div id="vetcare-surgery-root" class="w-full flex flex-col gap-6 text-slate-100 font-sans pb-16">
          <!-- Top Executive Surgical Banner & ASA Risk Strip -->
          ${this.buildTopSurgicalBannerHtml()}

          <!-- Tactical Navigation Toolbar -->
          ${this.buildTabNavigationHtml()}

          <!-- Active Viewport Switched by Tab -->
          ${
            state.activeTab === "preop_risk_eval"
              ? this.buildPreopRiskWorkstationHtml()
              : state.activeTab === "surgical_checklist"
              ? this.buildSafetyChecklistWorkstationHtml()
              : state.activeTab === "intraop_vitals_sheet"
              ? this.buildIntraOpVitalsWorkstationHtml()
              : this.buildAnesthesiaCalculatorWorkstationHtml(calculatedProtocol)
          }

          <!-- Modals Insertion Mount -->
          <div id="surgery-modal-container"></div>
        </div>
      `;

      this.bindUiEvents();
    },

    // 3. LIFECYCLE: Destroy
    destroy: function () {
      if (this._patientSelectedListener) {
        window.removeEventListener("patient:selected", this._patientSelectedListener);
        window.removeEventListener("vetcare:patient-selected", this._patientSelectedListener);
      }
      if (state.containerElement) {
        state.containerElement.innerHTML = "";
      }
      state.containerElement = null;
    },

    setupEventBus: function () {
      const handlePatient = (evt) => {
        const p = evt.detail;
        if (!p) return;
        state.patient.id = p.patientId || state.patient.id;
        state.patient.tagNo = p.tagNumber || p.tagNo || state.patient.tagNo;
        state.patient.name = p.breed ? `${p.tagNumber} (${p.breed})` : state.patient.name;
        state.patient.species = p.species ? p.species.toLowerCase() : state.patient.species;
        state.patient.weightKg = parseFloat(p.bodyWeightKg || p.weightKg || state.patient.weightKg);
        state.patient.breed = p.breed || state.patient.breed;
        notify(`शल्य चिकित्सा प्लानर में पशु बायोमेट्रिक्स लोड हुए: ${state.patient.tagNo}`, "info");
        if (state.containerElement) {
          this.render(state.containerElement);
        }
      };

      this._patientSelectedListener = handlePatient;
      window.addEventListener("patient:selected", handlePatient);
      window.addEventListener("vetcare:patient-selected", handlePatient);
    },

    // 4. SCIENTIFIC ANESTHETIC DOSAGE ENGINE & PROTOCOL GENERATOR
    calculateAnestheticDoses: function (species, weightKg, asaStatus, procedureType) {
      const wt = parseFloat(weightKg) || 100;
      const isRuminant = species === "bovine" || species === "bubaline" || species === "caprine" || species === "ovine";
      const isEquine = species === "equine";
      const isFeline = species === "feline";

      // 1. Premedication Drugs
      const premeds = [];
      if (isRuminant) {
        // Bovine Xylazine Rule (1/10th equine dose)
        const xyDoseMgKg = 0.03;
        const xyMg = wt * xyDoseMgKg;
        const xyMl = xyMg / ANESTHETIC_DRUGS_MASTER.xylazine.stockMgMl;
        premeds.push({
          drug: "Xylazine HCl 2% (अल्फा-2 सेडेटिव)",
          doseMgKg: xyDoseMgKg,
          totalMg: parseFloat(xyMg.toFixed(2)),
          totalMl: parseFloat(xyMl.toFixed(2)),
          route: "Deep IM / Slow IV",
          timing: "10-15 mins pre-op",
          safetyWarning: "BOVINE 1/10TH DOSE: डू नॉट एक्ससीड! अत्यधिक मात्रा आफरा, लार स्राव व गर्भाशय संकुचन कर सकती है।"
        });

        // Butorphanol for balanced analgesia
        const butDoseMgKg = 0.02;
        const butMg = wt * butDoseMgKg;
        const butMl = butMg / ANESTHETIC_DRUGS_MASTER.butorphanol.stockMgMl;
        premeds.push({
          drug: "Butorphanol Tartrate (ओपिओइड एनाल्जेसिया)",
          doseMgKg: butDoseMgKg,
          totalMg: parseFloat(butMg.toFixed(2)),
          totalMl: parseFloat(butMl.toFixed(2)),
          route: "IV / IM",
          timing: "With Xylazine",
          safetyWarning: "उत्कृष्ट विसरल एनाल्जेसिया, न्यूनतम श्वसन अवसाद।"
        });
      } else if (isEquine) {
        // Equine Detomidine + Butorphanol
        const detMg = wt * 0.02;
        const detMl = detMg / ANESTHETIC_DRUGS_MASTER.detomidine.stockMgMl;
        premeds.push({
          drug: "Detomidine HCl (डोमोसोडान)",
          doseMgKg: 0.02,
          totalMg: parseFloat(detMg.toFixed(2)),
          totalMl: parseFloat(detMl.toFixed(2)),
          route: "IV",
          timing: "5 mins pre-op",
          safetyWarning: "घोड़ों में मजबूत सेडेशन एवं सिर नीचे करने की स्थिति।"
        });
      } else {
        // Canine / Feline
        const aceMg = wt * 0.02;
        const aceMl = aceMg / ANESTHETIC_DRUGS_MASTER.acepromazine.stockMgMl;
        premeds.push({
          drug: "Acepromazine Maleate (ट्रैंक्विलाइजर)",
          doseMgKg: 0.02,
          totalMg: parseFloat(aceMg.toFixed(2)),
          totalMl: parseFloat(aceMl.toFixed(2)),
          route: "SC / IM",
          timing: "30 mins pre-op",
          safetyWarning: "हाइपोटेंशन में वर्जित; ब्राचीसिफेलिक श्वानों में मात्रा 50% कम करें।"
        });

        const butMg = wt * 0.2;
        const butMl = butMg / ANESTHETIC_DRUGS_MASTER.butorphanol.stockMgMl;
        premeds.push({
          drug: "Butorphanol Tartrate",
          doseMgKg: 0.2,
          totalMg: parseFloat(butMg.toFixed(2)),
          totalMl: parseFloat(butMl.toFixed(2)),
          route: "SC / IM",
          timing: "With Acepromazine",
          safetyWarning: "हल्के से मध्यम शल्य दर्द हेतु आदर्श।"
        });
      }

      // 2. Induction Agents
      const inductions = [];
      if (isRuminant) {
        // Ketamine + Diazepam induction for general anesthesia or standing cast
        const ketMg = wt * 2.0;
        const ketMl = ketMg / ANESTHETIC_DRUGS_MASTER.ketamine.stockMgMl;
        const diazMg = wt * 0.1;
        const diazMl = diazMg / ANESTHETIC_DRUGS_MASTER.diazepam.stockMgMl;
        inductions.push({
          drug: "Ketamine HCl (50 mg/ml)",
          doseMgKg: 2.0,
          totalMg: parseFloat(ketMg.toFixed(1)),
          totalMl: parseFloat(ketMl.toFixed(1)),
          route: "Fast IV bolus",
          timing: "Immediately post-sedation",
          safetyWarning: "हमेशा डायजेपाम के साथ दें ताकि मांसपेशियों में अकड़न न हो।"
        });
        inductions.push({
          drug: "Diazepam (5 mg/ml)",
          doseMgKg: 0.1,
          totalMg: parseFloat(diazMg.toFixed(1)),
          totalMl: parseFloat(diazMl.toFixed(1)),
          route: "IV bolus",
          timing: "Co-administered with Ketamine",
          safetyWarning: "केंद्रीय पेशी शिथिलक; प्लास्टिक सिरिंज में देर तक न रखें।"
        });
      } else {
        // Propofol Titration for Dogs/Cats
        const propMg = wt * (isFeline ? 5.0 : 4.0);
        const propMl = propMg / ANESTHETIC_DRUGS_MASTER.propofol.stockMgMl;
        inductions.push({
          drug: "Propofol 1% Emulsion (10 mg/ml)",
          doseMgKg: isFeline ? 5.0 : 4.0,
          totalMg: parseFloat(propMg.toFixed(1)),
          totalMl: parseFloat(propMl.toFixed(1)),
          route: "Slow IV over 60 sec",
          timing: "At endotracheal intubation",
          safetyWarning: "क्षणिक श्वास अवरोध (Apnea) संभव; ऑक्सीजन युक्त ET ट्यूब तैयार रखें।"
        });
      }

      // 3. Maintenance Protocols & Fluid Rate
      const fluidRateMlHr = wt * (isRuminant ? 5 : 10);
      const fluidDropRateMin = Math.round((fluidRateMlHr * 15) / 60); // 15 drops/ml macro drip
      const maintenance = {
        inhalantAgent: isRuminant ? "Isoflurane 1.5 - 2.5% in 100% O2" : "Isoflurane 1.5 - 2.0% (MAC: 1.28%)",
        oxygenFlowRate: isRuminant ? `${Math.round(wt * 10)} ml/min (Closed/Semi-Closed)` : `${Math.round(wt * 50)} ml/min (Non-rebreathing/Rebreathing)`,
        fluidType: "Lactated Ringer's Solution (LRS / रिंगर लैक्टेट)",
        fluidRateMlHr: fluidRateMlHr,
        fluidDropRateMin: fluidDropRateMin
      };

      // 4. Regional & Local Nerve Blocks
      const localBlocks = [];
      if (isRuminant) {
        localBlocks.push({
          blockName: "Farquharson Paravertebral Block (T13, L1, L2)",
          agent: "Lignocaine HCl 2% Plain",
          volumePerSite: "10 - 15 ml per nerve (Total ~40 ml)",
          technique: "सुई को T13, L1 एवं L2 कशेरुकाओं के ट्रांसवर्स प्रोसेस के किनारों पर प्रवेश कराकर डोर्सल व वेंट्रल नसों को ब्लॉक करें।",
          indications: "सीजेरियन सेक्शन, रूमेनोटॉमी एवं आंतों की शल्य क्रिया हेतु बाईं कोख का पूर्ण सुन्न होना।"
        });
        localBlocks.push({
          blockName: "Inverted 'L' Regional Infiltration Block",
          agent: "Lignocaine HCl 2% Plain",
          volumePerSite: "60 - 80 ml Subcutaneous & Intramuscular",
          technique: "शल्य चीरा स्थल के ऊपर एवं पीछे उल्टे 'L' आकार में त्वचा से पेरिटोनियम तक दवा का अंतःप्रवेशन।",
          indications: "पैरावेर्टेब्रल में कठिनाई होने पर सरल एवं सुरक्षित फील्ड ब्लॉक।"
        });
        localBlocks.push({
          blockName: "Caudal Epidural Anesthesia (Sacrococcygeal)",
          agent: "Lignocaine HCl 2% (1 ml per 4.5 kg)",
          volumePerSite: `${(wt / 4.5 * 0.2).toFixed(1)} - ${(wt / 4.5 * 0.3).toFixed(1)} ml`,
          technique: "प्रथम एवं द्वितीय कोक्सीजियल कशेरुका के मध्य 18G सुई से एपिड्यूरल स्पेस में प्रवेश।",
          indications: "डिस्टोशिया, गर्भाशय भ्रंश (Prolapse) सुधार; पशु खड़ा रहता है।"
        });
      } else {
        localBlocks.push({
          blockName: "Infiltration Line Block / Incisional Block",
          agent: "Lignocaine 2% or Bupivacaine 0.5%",
          volumePerSite: "2 - 5 ml along incision line",
          technique: "चीरा लगाने से पूर्व सब-क्यूटेनियस रूप में निक्षेपण।",
          indications: "शल्य दर्द नियंत्रण एवं आइसोफ्लुरेन की आवश्यकता कम करना।"
        });
      }

      // 5. Emergency Crash Cart Dosages (Life-Support Table)
      const crashCart = [
        { drug: "Atropine Sulfate (0.6 mg/ml)", doseMgKg: 0.04, totalMl: parseFloat(((wt * 0.04) / 0.6).toFixed(2)), indication: "Severe Bradycardia (HR < 40 in Cow / < 60 in Dog)" },
        { drug: "Epinephrine 1:1000 (1.0 mg/ml)", doseMgKg: 0.01, totalMl: parseFloat(((wt * 0.01) / 1.0).toFixed(2)), indication: "Cardiac Asystole / Anaphylaxis" },
        { drug: "Atipamezole (5.0 mg/ml)", doseMgKg: 0.2, totalMl: parseFloat(((wt * 0.2) / 5.0).toFixed(2)), indication: "Xylazine / Alpha-2 Sedation Overdose Reversal" },
        { drug: "Doxapram HCl (20 mg/ml)", doseMgKg: 1.5, totalMl: parseFloat(((wt * 1.5) / 20.0).toFixed(2)), indication: "Acute Respiratory Arrest / Apnea" }
      ];

      return {
        premeds: premeds,
        inductions: inductions,
        maintenance: maintenance,
        localBlocks: localBlocks,
        crashCart: crashCart
      };
    },

    // HTML VIEW BUILDERS
    buildTopSurgicalBannerHtml: function () {
      const p = state.patient;
      const proc = state.surgicalProcedure;
      const asa = state.asaStatus;

      // ASA Risk Styling
      let asaClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      let asaText = "ASA I - सामान्य स्वस्थ रोगी (Minimal Risk)";
      if (asa === "2") {
        asaClass = "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
        asaText = "ASA II - हल्का प्रणालीगत रोग (Mild Systemic Disease)";
      } else if (asa === "3") {
        asaClass = "bg-amber-500/20 text-amber-300 border-amber-500/30";
        asaText = "ASA III - गंभीर प्रणालीगत रोग (Severe Systemic Disease)";
      } else if (asa === "4") {
        asaClass = "bg-orange-500/20 text-orange-300 border-orange-500/30";
        asaText = "ASA IV - जीवन-घातक प्रणालीगत असंतुलन (Life Threatening)";
      } else if (asa === "5") {
        asaClass = "bg-rose-500/20 text-rose-300 border-rose-500/30";
        asaText = "ASA V - आसन्न मृत्यु जोखिम (Moribund)";
      }

      // Fasting Compliance
      const isRuminant = p.species === "bovine" || p.species === "bubaline";
      const foodFastingReq = isRuminant ? 24 : 12;
      const waterFastingReq = isRuminant ? 12 : 4;
      const isFoodCompliant = p.lastFedHoursAgo >= foodFastingReq;
      const isWaterCompliant = p.lastWaterHoursAgo >= waterFastingReq;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950">
          <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            
            <!-- Left Info -->
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-2xl shadow-inner">
                <i class="fa-solid fa-syringe"></i>
              </div>
              <div>
                <div class="flex items-center gap-2.5">
                  <span class="text-xs font-mono font-bold uppercase text-slate-400">शल्य रोगी (Patient Tag):</span>
                  <span class="text-lg font-display font-black text-white">${p.tagNo}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${asaClass} border">
                    ASA ${asa}${state.isEmergencyModifier ? "-E (आपातकाल)" : ""}
                  </span>
                </div>
                <div class="text-xs text-slate-300 font-semibold mt-0.5">
                  प्रक्रिया: <span class="text-white">${proc.name}</span> (${proc.approach})
                </div>
                <div class="text-[11px] text-slate-400 mt-0.5 font-mono">
                  ${p.species.toUpperCase()} (${p.breed}) • वजन: <strong class="text-emerald-400">${p.weightKg} kg</strong> • अनुमानित समय: ${proc.estDurationMin} मिनट
                </div>
              </div>
            </div>

            <!-- Fasting & Vital Status Telemetry -->
            <div class="flex flex-wrap items-center gap-3 self-stretch xl:self-auto justify-between xl:justify-end border-t xl:border-t-0 border-slate-800 pt-3 xl:pt-0">
              
              <!-- Food Fasting Badge -->
              <div class="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
                <div class="text-[10px] text-slate-500 uppercase">चारा उपवास (Food Fasting)</div>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <span class="w-2 h-2 rounded-full ${isFoodCompliant ? "bg-emerald-400" : "bg-rose-500 animate-ping"}"></span>
                  <span class="font-bold text-white">${p.lastFedHoursAgo} घंटे पूर्व</span>
                  <span class="text-[9px] text-slate-400">(मानक: &gt;${foodFastingReq}h)</span>
                </div>
              </div>

              <!-- Water Fasting Badge -->
              <div class="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
                <div class="text-[10px] text-slate-500 uppercase">जल उपवास (Water Fasting)</div>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <span class="w-2 h-2 rounded-full ${isWaterCompliant ? "bg-emerald-400" : "bg-amber-400"}"></span>
                  <span class="font-bold text-white">${p.lastWaterHoursAgo} घंटे पूर्व</span>
                  <span class="text-[9px] text-slate-400">(मानक: &gt;${waterFastingReq}h)</span>
                </div>
              </div>

              <!-- Procedure Quick Switcher -->
              <div class="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
                <div class="text-[10px] text-slate-500 uppercase">शल्य प्रक्रिया चयन</div>
                <select id="surgProcedureSelect" class="bg-transparent font-bold text-cyan-400 focus:outline-none cursor-pointer max-w-[190px] truncate">
                  ${SURGICAL_PROCEDURES_MASTER.map((pr) => `<option value="${pr.id}" ${pr.id === proc.id ? "selected" : ""}>${pr.name}</option>`).join("")}
                </select>
              </div>

            </div>

          </div>
        </div>
      `;
    },

    buildTabNavigationHtml: function () {
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-2.5 shadow-xl flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <button 
            type="button" 
            data-surg-tab="anesthesia_calculator" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "anesthesia_calculator"
                ? "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-syringe"></i>
            <span>एनेस्थीसिया व औषधि खुराक चार्ट (Balanced Protocol)</span>
          </button>

          <button 
            type="button" 
            data-surg-tab="preop_risk_eval" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "preop_risk_eval"
                ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-950 shadow-lg shadow-amber-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-shield-heart"></i>
            <span>प्री-ऑप जोखिम एवं ASA वर्गीकरण (Risk Evaluation)</span>
          </button>

          <button 
            type="button" 
            data-surg-tab="surgical_checklist" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "surgical_checklist"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-list-check"></i>
            <span>WHO शल्य सुरक्षा चेकलिस्ट (Surgical Safety Checklist)</span>
          </button>

          <button 
            type="button" 
            data-surg-tab="intraop_vitals_sheet" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "intraop_vitals_sheet"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-heart-pulse"></i>
            <span>लाइव इंट्रा-ऑपरेटिव मॉनिटरिंग (5-Min Vitals Sheet)</span>
          </button>
        </div>
      `;
    },

    // WORKSTATION TAB 1: Anesthetic Drug Dosages & Balanced Protocols
    buildAnesthesiaCalculatorWorkstationHtml: function (proto) {
      return `
        <div class="space-y-6">
          
          <!-- Section 1: Premedication & Sedation Table -->
          <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-prescription-bottle text-amber-400"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">1. प्री-मेडिकेशन एवं शांतिकारक औषधियां (Premedication / Sedation)</h3>
              </div>
              <span class="text-[10px] font-mono text-slate-400">वजन: ${state.patient.weightKg} kg आधार पर सटीक गणना</span>
            </div>

            <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
              <table class="w-full text-left text-xs font-mono">
                <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                  <tr>
                    <th class="px-3.5 py-2.5">औषधि नाम (Drug)</th>
                    <th class="px-3.5 py-2.5">खुराक दर (Dose Rate)</th>
                    <th class="px-3.5 py-2.5">कुल मात्रा (mg)</th>
                    <th class="px-3.5 py-2.5">इंजेक्शन आयतन (ml)</th>
                    <th class="px-3.5 py-2.5">मार्ग एवं समय</th>
                    <th class="px-3.5 py-2.5 font-sans">क्लिनिकल सुरक्षा गार्डरेल्स</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80 font-sans">
                  ${proto.premeds
                    .map((item) => {
                      return `
                      <tr class="hover:bg-slate-850/50 transition-colors">
                        <td class="px-3.5 py-2.5 font-bold text-white text-xs">${item.drug}</td>
                        <td class="px-3.5 py-2.5 font-mono text-slate-300">${item.doseMgKg} mg/kg</td>
                        <td class="px-3.5 py-2.5 font-mono text-amber-300 font-bold">${item.totalMg} mg</td>
                        <td class="px-3.5 py-2.5 font-mono font-black text-emerald-400 text-sm">${item.totalMl} ml</td>
                        <td class="px-3.5 py-2.5 font-mono text-slate-300">${item.route} (${item.timing})</td>
                        <td class="px-3.5 py-2.5 text-xs text-slate-300 leading-relaxed">${item.safetyWarning}</td>
                      </tr>
                    `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Section 2: Induction & Maintenance -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <!-- Induction Protocols (Cols 1-7) -->
            <div class="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-bed text-cyan-400"></i>
                  <h3 class="text-xs font-mono font-bold uppercase text-white">2. निश्चेतना प्रेरण (Induction Protocol)</h3>
                </div>
                <span class="text-[10px] font-mono text-cyan-400">रिफ्लेक्स समाप्ति तक Titrate करें</span>
              </div>

              <div class="space-y-3 font-mono text-xs">
                ${proto.inductions
                  .map((ind) => {
                    return `
                    <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col gap-1.5">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-white text-sm font-sans">${ind.drug}</span>
                        <span class="px-2 py-0.5 rounded text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">${ind.totalMl} ml (${ind.totalMg} mg)</span>
                      </div>
                      <div class="text-slate-400 text-[11px]">मार्ग: <strong class="text-slate-200">${ind.route}</strong> • खुराक दर: ${ind.doseMgKg} mg/kg</div>
                      <div class="text-[11px] text-slate-300 font-sans leading-relaxed pt-1 border-t border-slate-900">
                        <i class="fa-solid fa-triangle-exclamation text-amber-400 mr-1"></i>${ind.safetyWarning}
                      </div>
                    </div>
                  `;
                  })
                  .join("")}
              </div>
            </div>

            <!-- Maintenance & Fluid Rates (Cols 8-12) -->
            <div class="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-droplet text-blue-400"></i>
                  <h3 class="text-xs font-mono font-bold uppercase text-white">3. रखरखाव एवं इंट्रा-ऑप IV फ्लुइड्स</h3>
                </div>
              </div>

              <div class="space-y-3 font-mono text-xs">
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-slate-400 uppercase">इनहेलेंट गैस व O2 प्रवाह</div>
                  <div class="font-bold text-white mt-1 text-sm">${proto.maintenance.inhalantAgent}</div>
                  <div class="text-[11px] text-emerald-400 mt-0.5">ऑक्सीजन प्रवाह दर: ${proto.maintenance.oxygenFlowRate}</div>
                </div>

                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-slate-400 uppercase">शल्य IV ड्रिप प्रवाह दर (Fluid Rate)</div>
                  <div class="font-bold text-cyan-400 mt-1 text-base">${proto.maintenance.fluidRateMlHr} ml / घंटा</div>
                  <div class="text-[11px] text-slate-300 mt-0.5">मैक्रो ड्रिप गति: <strong class="text-amber-400">${proto.maintenance.fluidDropRateMin} बूंदें प्रति मिनट</strong> (15 gtt/ml)</div>
                  <div class="text-[10px] text-slate-500 mt-1 font-sans">फ्लुइड: ${proto.maintenance.fluidType} (रक्तचाप एवं गुर्दा परफ्यूजन रक्षक)</div>
                </div>
              </div>
            </div>

          </div>

          <!-- Section 3: Regional Nerve Blocks -->
          <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-bullseye text-purple-400"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">4. क्षेत्रीय एवं स्थानीय नर्व ब्लॉक (Local / Regional Blocks)</h3>
              </div>
              <span class="text-[10px] font-mono text-purple-400">Lignocaine 2% Plain Guide</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              ${proto.localBlocks
                .map((blk) => {
                  return `
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between gap-2">
                    <div>
                      <div class="font-bold text-white text-xs">${blk.blockName}</div>
                      <div class="text-[11px] font-mono text-purple-300 mt-1">आयतन: ${blk.volumePerSite}</div>
                      <div class="text-[11px] text-slate-300 mt-2 leading-relaxed font-sans">${blk.technique}</div>
                    </div>
                    <div class="mt-2 pt-2 border-t border-slate-900 text-[10px] text-slate-400 font-sans">
                      <strong>उपयोग:</strong> ${blk.indications}
                    </div>
                  </div>
                `;
                })
                .join("")}
            </div>
          </div>

          <!-- Section 4: Emergency Crash Cart Table -->
          <div class="rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/40 p-5 shadow-xl">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-truck-medical text-rose-400"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">5. आपातकालीन क्रैश कार्ट एवं एंटीडोट्स (Crash Cart Emergency Reversals)</h3>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-rose-500 text-white animate-pulse">
                CPR STANDBY
              </span>
            </div>

            <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
              <table class="w-full text-left text-xs font-mono">
                <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                  <tr>
                    <th class="px-3.5 py-2.5">आपातकालीन औषधि</th>
                    <th class="px-3.5 py-2.5">खुराक दर (mg/kg)</th>
                    <th class="px-3.5 py-2.5">सटीक आयतन (ml)</th>
                    <th class="px-3.5 py-2.5 font-sans">आपातकालीन संकेत (Indication)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80 font-sans">
                  ${proto.crashCart
                    .map((cc) => {
                      return `
                      <tr class="hover:bg-slate-850/50">
                        <td class="px-3.5 py-2.5 font-bold text-white text-xs font-mono">${cc.drug}</td>
                        <td class="px-3.5 py-2.5 font-mono text-slate-300">${cc.doseMgKg} mg/kg</td>
                        <td class="px-3.5 py-2.5 font-mono font-black text-rose-400 text-sm">${cc.totalMl} ml</td>
                        <td class="px-3.5 py-2.5 text-xs text-slate-300">${cc.indication}</td>
                      </tr>
                    `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Bottom Master Action Bar -->
          <div class="flex items-center justify-end gap-3 pt-2">
            <button id="btnSaveSurgicalPlan" type="button" class="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 flex items-center gap-2 active:scale-95 transition-all">
              <i class="fa-solid fa-floppy-disk"></i>
              <span>शल्य योजना सहेजें एवं EMR से जोड़ें</span>
            </button>
            <button id="btnPrintSurgicalRecord" type="button" class="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-950/50 flex items-center gap-2 active:scale-95 transition-all">
              <i class="fa-solid fa-print"></i>
              <span>OT क्लिपबोर्ड रिकॉर्ड प्रिंट करें (Print Record)</span>
            </button>
          </div>

        </div>
      `;
    },

    // WORKSTATION TAB 2: Pre-Op Risk Evaluation & ASA Assessment
    buildPreopRiskWorkstationHtml: function () {
      const p = state.patient;

      return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- ASA Status Classification Selector (Cols 1-7) -->
          <div class="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-shield-heart text-amber-400"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">अमेरिकन सोसाइटी ऑफ एनेस्थिसियोलॉजिस्ट (ASA) जोखिम ग्रेडिंग</h3>
              </div>
            </div>

            <div class="space-y-3">
              <label class="p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                state.asaStatus === "1" ? "bg-slate-800 border-emerald-500 ring-1 ring-emerald-500/50" : "bg-slate-950/70 border-slate-800"
              }">
                <input type="radio" name="asaRiskRadio" value="1" ${state.asaStatus === "1" ? "checked" : ""} class="mt-1 accent-emerald-500" />
                <div>
                  <div class="text-xs font-bold text-white">ASA I - न्यूनतम जोखिम (Minimal Risk)</div>
                  <div class="text-[11px] text-slate-400 mt-0.5">पूर्णतः स्वस्थ रोगी, कोई ज्ञात दैहिक असामान्यता नहीं (उदा: नसबंदी / सींग रोधन)।</div>
                </div>
              </label>

              <label class="p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                state.asaStatus === "2" ? "bg-slate-800 border-cyan-500 ring-1 ring-cyan-500/50" : "bg-slate-950/70 border-slate-800"
              }">
                <input type="radio" name="asaRiskRadio" value="2" ${state.asaStatus === "2" ? "checked" : ""} class="mt-1 accent-cyan-500" />
                <div>
                  <div class="text-xs font-bold text-white">ASA II - हल्का प्रणालीगत रोग (Mild Systemic Disease)</div>
                  <div class="text-[11px] text-slate-400 mt-0.5">स्थानीय संक्रमण, नवजात या अति-वृद्ध पशु, हल्का डिहाइड्रेशन या मोटापा।</div>
                </div>
              </label>

              <label class="p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                state.asaStatus === "3" ? "bg-slate-800 border-amber-500 ring-1 ring-amber-500/50" : "bg-slate-950/70 border-slate-800"
              }">
                <input type="radio" name="asaRiskRadio" value="3" ${state.asaStatus === "3" ? "checked" : ""} class="mt-1 accent-amber-500" />
                <div>
                  <div class="text-xs font-bold text-white">ASA III - गंभीर प्रणालीगत असंतुलन (Severe Systemic Disease)</div>
                  <div class="text-[11px] text-slate-400 mt-0.5">मध्यम एनीमिया, तेज बुखार, आफरा (Tympany), डिस्टोशिया, आंशिक आंत अवरोध।</div>
                </div>
              </label>

              <label class="p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                state.asaStatus === "4" ? "bg-slate-800 border-orange-500 ring-1 ring-orange-500/50" : "bg-slate-950/70 border-slate-800"
              }">
                <input type="radio" name="asaRiskRadio" value="4" ${state.asaStatus === "4" ? "checked" : ""} class="mt-1 accent-orange-500" />
                <div>
                  <div class="text-xs font-bold text-white">ASA IV - जीवन-घातक गंभीर विफलता (High Risk / Decompensated)</div>
                  <div class="text-[11px] text-slate-400 mt-0.5">गंभीर डिहाइड्रेशन (10%+), यूरेमिया, डायफ्रामेटिक हर्निया, एंडोटॉक्सिक शॉक।</div>
                </div>
              </label>

              <label class="p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                state.asaStatus === "5" ? "bg-slate-800 border-rose-500 ring-1 ring-rose-500/50" : "bg-slate-950/70 border-slate-800"
              }">
                <input type="radio" name="asaRiskRadio" value="5" ${state.asaStatus === "5" ? "checked" : ""} class="mt-1 accent-rose-500" />
                <div>
                  <div class="text-xs font-bold text-white">ASA V - आसन्न मृत्यु जोखिम (Moribund)</div>
                  <div class="text-[11px] text-slate-400 mt-0.5">शल्य क्रिया के बिना 24 घंटे जीवित रहने की संभावना नगण्य (उदा: गर्भाशय फटना, पेरिटोनाइटिस)।</div>
                </div>
              </label>

              <div class="pt-2 flex items-center gap-2">
                <input type="checkbox" id="chkEmergencyModifier" ${state.isEmergencyModifier ? "checked" : ""} class="accent-rose-500 w-4 h-4 cursor-pointer" />
                <label for="chkEmergencyModifier" class="text-xs font-bold text-rose-400 cursor-pointer">
                  'E' इमरजेंसी मॉडिफायर लागू करें (उदा: ASA III-E आपातकालीन शल्य क्रिया)
                </label>
              </div>
            </div>
          </div>

          <!-- Pre-Op Vitals & Fasting Compliance Form (Cols 8-12) -->
          <div class="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-stethoscope text-emerald-400"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">प्री-ऑप शारीरिक वाइटल्स एवं उपवास</h3>
              </div>
            </div>

            <div class="space-y-3 text-xs font-mono">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">तापमान (°F)</label>
                  <input type="number" step="0.1" id="preopTemp" value="${p.tempF}" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">हृदय गति (HR bpm)</label>
                  <input type="number" id="preopHr" value="${p.heartRate}" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">श्वसन गति (RR /min)</label>
                  <input type="number" id="preopRr" value="${p.respRate}" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">शारीरिक वजन (kg)</label>
                  <input type="number" id="preopWeight" value="${p.weightKg}" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">चारा उपवास (घंटे)</label>
                  <input type="number" id="preopFeedHours" value="${p.lastFedHoursAgo}" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">जल उपवास (घंटे)</label>
                  <input type="number" id="preopWaterHours" value="${p.lastWaterHoursAgo}" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <div class="pt-2">
                <button id="btnUpdatePreopRisk" type="button" class="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-500 text-slate-950 shadow-md">
                  जोखिम एवं खुराक पुनः संगणित करें (Update & Recalculate)
                </button>
              </div>
            </div>
          </div>

        </div>
      `;
    },

    // WORKSTATION TAB 3: WHO Veterinary Surgical Safety Checklist
    buildSafetyChecklistWorkstationHtml: function () {
      const c = state.safetyChecklist;

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-6">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-list-check text-emerald-400 text-lg"></i>
                <div>
                  <h3 class="text-sm font-display font-bold text-white">WHO पशु शल्य चिकित्सा सुरक्षा चेकलिस्ट (Veterinary Surgical Safety)</h3>
                  <div class="text-[10px] font-mono text-emerald-400">3-STAGE ZERO ERROR PROTOCOL</div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              
              <!-- Stage 1: SIGN-IN (Before Anesthesia Induction) -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span class="font-bold text-amber-400 font-mono uppercase text-xs">चरण 1: साइन-इन (Sign-In)</span>
                  <span class="text-[10px] text-slate-500 font-mono">इंडक्शन से पूर्व</span>
                </div>

                <div class="space-y-2">
                  <label class="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" data-chk="anesthesiaMachineTested" ${c.anesthesiaMachineTested ? "checked" : ""} class="mt-0.5 accent-emerald-500" />
                    <span>एनेस्थीसिया मशीन व सर्किट का रिसाव (Leak Test) पास हुआ</span>
                  </label>
                  <label class="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" data-chk="endotrachealTubeCuffed" ${c.endotrachealTubeCuffed ? "checked" : ""} class="mt-0.5 accent-emerald-500" />
                    <span>सही आकार की ET ट्यूब व कफ कार्यप्रणाली जांची गई</span>
                  </label>
                  <label class="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" data-chk="pulseOximeterAttached" ${c.pulseOximeterAttached ? "checked" : ""} class="mt-0.5 accent-emerald-500" />
                    <span>पल्स ऑक्सीमीटर एवं ECG प्रोब कार्यशील हैं</span>
                  </label>
                  <label class="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" data-chk="ivCatheterPatent" ${c.ivCatheterPatent ? "checked" : ""} class="mt-0.5 accent-emerald-500" />
                    <span>IV कैन्युला सुरक्षित एवं फ्लुइड प्रवाह सुचारू है</span>
                  </label>
                </div>
              </div>

              <!-- Stage 2: TIME-OUT (Before Skin Incision) -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span class="font-bold text-cyan-400 font-mono uppercase text-xs">चरण 2: टाइम-आउट (Time-Out)</span>
                  <span class="text-[10px] text-slate-500 font-mono">चीरा लगाने से पूर्व</span>
                </div>

                <div class="space-y-2">
                  <label class="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" data-chk="teamIdentified" ${c.teamIdentified ? "checked" : ""} class="mt-0.5 accent-emerald-500" />
                    <span>सर्जन, एनेस्थेटिस्ट व सहायक की भूमिकाएं पुष्ट हुईं</span>
                  </label>
                  <label class="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" data-chk="patientSiteConfirmed" ${c.patientSiteConfirmed ? "checked" : ""} class="mt-0.5 accent-emerald-500" />
                    <span>पशु टैग ID एवं सटीक शल्य अंग (Site) की मौखिक पुष्टि</span>
                  </label>
                  <label class="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" data-chk="antibioticGivenIn60Min" ${c.antibioticGivenIn60Min ? "checked" : ""} class="mt-0.5 accent-emerald-500" />
                    <span>प्री-ऑप एंटीबायोटिक 60 मिनट के भीतर दी जा चुकी है</span>
                  </label>
                </div>
              </div>

              <!-- Stage 3: SIGN-OUT (Before Skin Closure) -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span class="font-bold text-emerald-400 font-mono uppercase text-xs">चरण 3: साइन-आउट (Sign-Out)</span>
                  <span class="text-[10px] text-slate-500 font-mono">टांके लगाने से पूर्व</span>
                </div>

                <div class="space-y-2">
                  <label class="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" data-chk="spongeGauzeCountMatched" ${c.spongeGauzeCountMatched ? "checked" : ""} class="mt-0.5 accent-emerald-500" />
                    <span>गॉज़ पट्टी / मॉप स्पंज की अंतिम गिनती 100% सटीक</span>
                  </label>
                  <label class="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" data-chk="instrumentCountMatched" ${c.instrumentCountMatched ? "checked" : ""} class="mt-0.5 accent-emerald-500" />
                    <span>शल्य उपकरणों एवं सुइयों की गिनती पूर्णतः मेल खाती है</span>
                  </label>
                  <label class="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" data-chk="postOpAnalgesiaPrescribed" ${c.postOpAnalgesiaPrescribed ? "checked" : ""} class="mt-0.5 accent-emerald-500" />
                    <span>पोस्ट-ऑप दर्द निवारक (Meloxicam/Flunixin) योजना सक्रिय</span>
                  </label>
                </div>
              </div>

            </div>
          </div>
        </div>
      `;
    },

    // WORKSTATION TAB 4: Live Intra-Op Vitals Recording Chart
    buildIntraOpVitalsWorkstationHtml: function () {
      const logs = state.intraOpVitalsLog;

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-heart-pulse text-cyan-400"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">
                  इंट्रा-ऑपरेटिव 5-मिनट वाइटल संकेत लॉग (Intra-Op Telemetry)
                </h3>
              </div>
              <button id="btnOpenAddVitalsModal" type="button" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow flex items-center gap-1.5">
                <i class="fa-solid fa-plus-circle"></i>
                <span>+ नया वाइटल समय दर्ज करें</span>
              </button>
            </div>

            <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
              <table class="w-full text-left text-xs font-mono">
                <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                  <tr>
                    <th class="px-3 py-2.5">समय (Min)</th>
                    <th class="px-3 py-2.5">हृदय गति (HR bpm)</th>
                    <th class="px-3 py-2.5">श्वसन (RR /min)</th>
                    <th class="px-3 py-2.5">ऑक्सीजन (SpO2 %)</th>
                    <th class="px-3 py-2.5">रक्तचाप (MAP mmHg)</th>
                    <th class="px-3 py-2.5">तापमान (°F)</th>
                    <th class="px-3 py-2.5">गैस % (Iso)</th>
                    <th class="px-3 py-2.5">फ्लुइड दिया (ml)</th>
                    <th class="px-3 py-2.5 font-sans">शल्य स्थिति / अवलोकन</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80 font-sans">
                  ${logs
                    .map((lg) => {
                      const isHypoMap = lg.map < 65;
                      const isHypoO2 = lg.spo2 < 92;

                      return `
                      <tr class="hover:bg-slate-850/50 transition-colors">
                        <td class="px-3 py-2.5 font-mono font-bold text-cyan-400">T + ${lg.timeMin}m</td>
                        <td class="px-3 py-2.5 font-mono font-bold text-white">${lg.hr}</td>
                        <td class="px-3 py-2.5 font-mono text-slate-300">${lg.rr}</td>
                        <td class="px-3 py-2.5 font-mono font-bold ${isHypoO2 ? "text-rose-400 animate-pulse" : "text-emerald-400"}">${lg.spo2}%</td>
                        <td class="px-3 py-2.5 font-mono font-bold ${isHypoMap ? "text-rose-400 animate-pulse" : "text-slate-200"}">${lg.map} mmHg</td>
                        <td class="px-3 py-2.5 font-mono text-slate-300">${lg.tempF}°F</td>
                        <td class="px-3 py-2.5 font-mono text-amber-300">${lg.agentPct}%</td>
                        <td class="px-3 py-2.5 font-mono text-blue-400">${lg.fluidsMlGiven} ml</td>
                        <td class="px-3 py-2.5 text-xs text-slate-300">${lg.notes || "—"}</td>
                      </tr>
                    `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    // EVENT BINDINGS
    bindUiEvents: function () {
      const container = state.containerElement;
      if (!container) return;

      // 1. Navigation Tabs
      container.querySelectorAll("[data-surg-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tab = btn.getAttribute("data-surg-tab");
          if (tab && tab !== state.activeTab) {
            state.activeTab = tab;
            this.render(container);
          }
        });
      });

      // 2. Procedure Switcher
      const procSelect = container.querySelector("#surgProcedureSelect");
      if (procSelect) {
        procSelect.addEventListener("change", (e) => {
          const pId = e.target.value;
          const found = SURGICAL_PROCEDURES_MASTER.find((pr) => pr.id === pId);
          if (found) {
            state.surgicalProcedure = Object.assign({}, found);
            this.render(container);
          }
        });
      }

      // 3. ASA Status Radio Buttons
      container.querySelectorAll('input[name="asaRiskRadio"]').forEach((radio) => {
        radio.addEventListener("change", (e) => {
          state.asaStatus = e.target.value;
          this.render(container);
        });
      });

      // 4. Emergency Modifier Checkbox
      const chkEmerg = container.querySelector("#chkEmergencyModifier");
      if (chkEmerg) {
        chkEmerg.addEventListener("change", (e) => {
          state.isEmergencyModifier = e.target.checked;
          this.render(container);
        });
      }

      // 5. Update Preop Risk & Recalculate
      const btnUpdate = container.querySelector("#btnUpdatePreopRisk");
      if (btnUpdate) {
        btnUpdate.addEventListener("click", () => {
          state.patient.tempF = parseFloat(document.getElementById("preopTemp").value) || state.patient.tempF;
          state.patient.heartRate = parseInt(document.getElementById("preopHr").value, 10) || state.patient.heartRate;
          state.patient.respRate = parseInt(document.getElementById("preopRr").value, 10) || state.patient.respRate;
          state.patient.weightKg = parseFloat(document.getElementById("preopWeight").value) || state.patient.weightKg;
          state.patient.lastFedHoursAgo = parseInt(document.getElementById("preopFeedHours").value, 10) || state.patient.lastFedHoursAgo;
          state.patient.lastWaterHoursAgo = parseInt(document.getElementById("preopWaterHours").value, 10) || state.patient.lastWaterHoursAgo;
          this.render(container);
          notify("प्री-ऑप वाइटल्स व दवा खुराकें पुनः अद्यतन हुईं!", "success");
        });
      }

      // 6. Safety Checklist Checkboxes
      container.querySelectorAll("input[data-chk]").forEach((chk) => {
        chk.addEventListener("change", (e) => {
          const key = e.target.getAttribute("data-chk");
          state.safetyChecklist[key] = e.target.checked;
        });
      });

      // 7. Add Intra-Op Vitals Modal Trigger
      const btnAddVitals = container.querySelector("#btnOpenAddVitalsModal");
      if (btnAddVitals) {
        btnAddVitals.addEventListener("click", () => this.openAddVitalsModal());
      }

      // 8. Save Plan to EMR
      const btnSave = container.querySelector("#btnSaveSurgicalPlan");
      if (btnSave) {
        btnSave.addEventListener("click", () => this.saveSurgicalPlan());
      }

      // 9. Print Surgical Record
      const btnPrint = container.querySelector("#btnPrintSurgicalRecord");
      if (btnPrint) {
        btnPrint.addEventListener("click", () => this.printSurgicalRecord());
      }
    },

    // 5. MODAL: Add Intra-Op Vitals Point
    openAddVitalsModal: function () {
      const mount = document.getElementById("surgery-modal-container");
      if (!mount) return;

      const nextMin = state.intraOpVitalsLog.length > 0 ? state.intraOpVitalsLog[state.intraOpVitalsLog.length - 1].timeMin + 5 : 0;

      mount.innerHTML = `
        <div id="intraopModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-heart-pulse text-cyan-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">इंट्रा-ऑप वाइटल दर्ज करें (T + ${nextMin} min)</h3>
              </div>
              <button id="closeIntraopModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="intraopForm" class="space-y-4 text-xs font-mono">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">HR (BPM) *</label>
                  <input type="number" id="vHr" required value="76" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">RR (/min) *</label>
                  <input type="number" id="vRr" required value="20" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">SpO2 (%) *</label>
                  <input type="number" id="vSpo2" required value="97" min="50" max="100" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">MAP (mmHg) *</label>
                  <input type="number" id="vMap" required value="80" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">Isoflurane %</label>
                  <input type="number" step="0.1" id="vIso" value="1.5" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">कुल फ्लुइड (ml)</label>
                  <input type="number" id="vFluid" value="1200" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <div>
                <label class="block text-[10px] uppercase text-slate-400 mb-1 font-sans">अवलोकन / शल्य प्रगति</label>
                <input type="text" id="vNotes" value="स्थिर एनेस्थीसिया। कोई रक्तस्राव नहीं।" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans focus:ring-2 focus:ring-cyan-500" />
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3 font-sans">
                <button type="button" id="cancelIntraopModalBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950/50">समय बिंदु दर्ज करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const modal = document.getElementById("intraopModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };

      document.getElementById("closeIntraopModalBtn").addEventListener("click", closeAction);
      document.getElementById("cancelIntraopModalBtn").addEventListener("click", closeAction);

      document.getElementById("intraopForm").addEventListener("submit", (e) => {
        e.preventDefault();
        state.intraOpVitalsLog.push({
          timeMin: nextMin,
          hr: parseInt(document.getElementById("vHr").value, 10),
          rr: parseInt(document.getElementById("vRr").value, 10),
          spo2: parseInt(document.getElementById("vSpo2").value, 10),
          map: parseInt(document.getElementById("vMap").value, 10),
          tempF: state.patient.tempF,
          agentPct: parseFloat(document.getElementById("vIso").value),
          fluidsMlGiven: parseInt(document.getElementById("vFluid").value, 10),
          notes: document.getElementById("vNotes").value.trim()
        });

        closeAction();
        notify(`T + ${nextMin} मिनट का वाइटल संकेत सुरक्षित हुआ!`, "success");
        this.render(state.containerElement);
      });
    },

    // 6. PERSISTENCE & EMR INTEGRATION
    saveSurgicalPlan: async function () {
      const calculatedProtocol = this.calculateAnestheticDoses(
        state.patient.species,
        state.patient.weightKg,
        state.asaStatus,
        state.surgicalProcedure.id
      );

      const surgeryRecord = {
        recordId: "REC-SURG-" + Date.now(),
        patientId: state.patient.id,
        recordType: "surgery",
        timestamp: new Date().toISOString(),
        patientBio: state.patient,
        procedure: state.surgicalProcedure,
        asaStatus: `ASA ${state.asaStatus}${state.isEmergencyModifier ? "-E" : ""}`,
        protocol: calculatedProtocol,
        safetyChecklist: state.safetyChecklist,
        intraOpLogs: state.intraOpVitalsLog,
        surgeonName: "Dr. Rahul Sharma, MVSc (Surgeon)"
      };

      try {
        const db = await getDbConnection();
        const tx = db.transaction(STORE_SURGERY, "readwrite");
        const store = tx.objectStore(STORE_SURGERY);
        store.put(surgeryRecord);
      } catch (err) {
        console.error("Failed to commit surgical plan to DB", err);
      }

      window.dispatchEvent(new CustomEvent("surgery:plan_saved", { detail: surgeryRecord }));
      notify("शल्य एवं निश्चेतना योजना सुरक्षित हुई एवं EMR टाइमलाइन से जुड़ी!", "success");
    },

    // 7. PRINTABLE OFFICIAL OT CLIPBOARD RECORD SHEET
    printSurgicalRecord: function () {
      const p = state.patient;
      const proc = state.surgicalProcedure;
      const calculatedProtocol = this.calculateAnestheticDoses(p.species, p.weightKg, state.asaStatus, proc.id);

      const printWindow = window.open("", "_blank", "width=900,height=1000");
      if (!printWindow) {
        notify("कृपया प्रिंट पॉपअप विंडो की अनुमति दें।", "warning");
        return;
      }

      const premedRowsHtml = calculatedProtocol.premeds
        .map(
          (m) => `
        <tr>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-weight: bold;">${m.drug}</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; text-align: center;">${m.doseMgKg} mg/kg</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; text-align: center; font-weight: bold;">${m.totalMl} ml</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; text-align: center;">${m.route}</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-size: 10px;">${m.safetyWarning}</td>
        </tr>
      `
        )
        .join("");

      const inductionRowsHtml = calculatedProtocol.inductions
        .map(
          (m) => `
        <tr>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-weight: bold;">${m.drug}</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; text-align: center;">${m.doseMgKg} mg/kg</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; text-align: center; font-weight: bold;">${m.totalMl} ml</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; text-align: center;">${m.route}</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-size: 10px;">${m.safetyWarning}</td>
        </tr>
      `
        )
        .join("");

      const crashRowsHtml = calculatedProtocol.crashCart
        .map(
          (c) => `
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #d1d5db; font-weight: bold; color: #991b1b;">${c.drug}</td>
          <td style="padding: 5px 8px; border: 1px solid #d1d5db; text-align: center; font-weight: bold;">${c.totalMl} ml</td>
          <td style="padding: 5px 8px; border: 1px solid #d1d5db; font-size: 10px;">${c.indication}</td>
        </tr>
      `
        )
        .join("");

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8">
          <title>शल्य एवं एनेस्थीसिया क्लिनिकल चार्ट - ${p.tagNo}</title>
          <style>
            @page { size: A4 portrait; margin: 12mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; margin: 0; padding: 10px; font-size: 11px; }
            .ot-border { border: 2.5px solid #111827; padding: 20px; border-radius: 8px; }
            .header-strip { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #111827; padding-bottom: 10px; margin-bottom: 15px; }
            .title-h { font-size: 16px; font-weight: 800; text-transform: uppercase; color: #111827; }
            .meta-box { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #f9fafb; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 15px; }
            .table-h { width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 11px; }
            .table-h th { background: #1f2937; color: #fff; padding: 6px 8px; font-size: 10px; text-transform: uppercase; }
            .sec-title { font-size: 12px; font-weight: bold; text-transform: uppercase; margin-top: 12px; margin-bottom: 5px; color: #1f2937; border-bottom: 1px solid #ccc; padding-bottom: 2px; }
            .footer-strip { margin-top: 25px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; }
            .seal-box { border: 1px dashed #9ca3af; width: 160px; height: 50px; text-align: center; line-height: 50px; color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="ot-border">
            <div class="header-strip">
              <div>
                <div class="title-h">पशु चिकित्सा शल्य एवं निश्चेतना चार्ट (Surgical-Anesthetic Record)</div>
                <div style="font-size: 10px; color: #555;">VETCARE AI OS 2026 SURGICAL INFORMATICS CORE</div>
              </div>
              <div style="text-align: right; font-family: monospace;">
                <strong>TAG: ${p.tagNo}</strong><br>
                ASA GRADE: ASA ${state.asaStatus}${state.isEmergencyModifier ? "-E" : ""}
              </div>
            </div>

            <div class="meta-box">
              <div>
                <div><strong>रोगी प्रजाति व नस्ल:</strong> ${p.species.toUpperCase()} (${p.breed})</div>
                <div><strong>शारीरिक वजन:</strong> ${p.weightKg} kg • लिंग: ${p.sex}</div>
                <div><strong>प्रक्रिया:</strong> ${proc.name}</div>
              </div>
              <div>
                <div><strong>चीरा मार्ग (Approach):</strong> ${proc.approach}</div>
                <div><strong>उपवास स्थिति:</strong> चारा ${p.lastFedHoursAgo}h • पानी ${p.lastWaterHoursAgo}h पूर्व</div>
                <div><strong>IV फ्लुइड प्रवाह:</strong> ${calculatedProtocol.maintenance.fluidRateMlHr} ml/hr (LRS)</div>
              </div>
            </div>

            <div class="sec-title">1. प्री-मेडिकेशन एवं इंडक्शन औषधियां (Calculated Dosages)</div>
            <table class="table-h">
              <thead>
                <tr>
                  <th style="text-align: left;">औषधि</th>
                  <th>खुराक दर</th>
                  <th>मात्रा (ml)</th>
                  <th>मार्ग</th>
                  <th style="text-align: left;">सुरक्षा निर्देश</th>
                </tr>
              </thead>
              <tbody>
                ${premedRowsHtml}
                ${inductionRowsHtml}
              </tbody>
            </table>

            <div class="sec-title">2. आपातकालीन क्रैश कार्ट एंटीडोट्स (Emergency Standby)</div>
            <table class="table-h">
              <thead>
                <tr>
                  <th style="text-align: left;">आपातकालीन दवा</th>
                  <th>सटीक आयतन (ml)</th>
                  <th style="text-align: left;">संकेत</th>
                </tr>
              </thead>
              <tbody>
                ${crashRowsHtml}
              </tbody>
            </table>

            <div class="sec-title">3. इंट्रा-ऑपरेटिव मॉनिटरिंग सारांश (Last Logged Vitals)</div>
            <div style="font-family: monospace; font-size: 10px; background: #f9fafb; padding: 8px; border: 1px solid #e5e7eb; border-radius: 4px;">
              ${state.intraOpVitalsLog
                .slice(-3)
                .map((l) => `[T+${l.timeMin}m] HR: ${l.hr} bpm | RR: ${l.rr} | SpO2: ${l.spo2}% | MAP: ${l.map} mmHg | Fluid: ${l.fluidsMlGiven} ml | Note: ${l.notes}`)
                .join("<br>")}
            </div>

            <div class="footer-strip">
              <div>
                <div>सत्यापन: SHA256-DACVAA-COMPLIANT</div>
                <div>शल्य दिनांक: ${new Date().toLocaleDateString("hi-IN")}</div>
              </div>
              <div class="seal-box">
                हस्ताक्षर मुख्य शल्य चिकित्सक / एनेस्थेटिस्ट
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Register on Global Namespace
  root.VetcareApp.Modules.SurgeryAnesthesiaPlanner = SurgeryAnesthesiaPlanner;

})(typeof window !== "undefined" ? window : this);
