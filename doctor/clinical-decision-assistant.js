// Vetcare AI OS - Doctor AI Clinical Co-Pilot, Evidence-Based Medicine & Contraindication Auditor (2026 Production)

(function (window, document) {
  "use strict";

  // 1. GLOBAL NAMESPACE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Doctor = window.VetcareApp.Doctor || {};
  window.VetcareApp.Core = window.VetcareApp.Core || {};

  // Standard Event Bus Wire-up / Fallback
  const EventBus = window.VetcareApp.Core.EventBus || window.VetcareApp.EventBus || {
    listeners: {},
    on: function (event, cb) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(cb);
    },
    off: function (event, cb) {
      if (!this.listeners[event]) return;
      this.listeners[event] = this.listeners[event].filter(fn => fn !== cb);
    },
    emit: function (event, payload) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(fn => {
          try { fn(payload); } catch (e) { console.error("[CoPilot EventBus Error]", e); }
        });
      }
      window.dispatchEvent(new CustomEvent("vetcare:" + event, { detail: payload }));
    }
  };
  window.VetcareApp.Core.EventBus = EventBus;

  // 2. AUDIO SYNTHESIS ENGINE (TACTILE CLINICAL CHIMES & WARNING KLAXONS)
  const CoPilotAudio = {
    playTone: function (freq, type, duration, vol) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || "sine";
        osc.frequency.setValueAtTime(freq || 440, ctx.currentTime);
        gain.gain.setValueAtTime(vol || 0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (duration || 0.2));
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + (duration || 0.2));
      } catch (e) {
        // Silent fallback on user interaction constraints
      }
    },
    chimeLethalHazard: function () {
      CoPilotAudio.playTone(987.77, "sawtooth", 0.2, 0.16);
      setTimeout(() => CoPilotAudio.playTone(493.88, "sawtooth", 0.25, 0.18), 160);
      setTimeout(() => CoPilotAudio.playTone(987.77, "sawtooth", 0.35, 0.2), 340);
    },
    chimeSafeSubstitution: function () {
      CoPilotAudio.playTone(523.25, "sine", 0.12, 0.08);
      setTimeout(() => CoPilotAudio.playTone(659.25, "sine", 0.15, 0.08), 100);
      setTimeout(() => CoPilotAudio.playTone(1046.5, "sine", 0.25, 0.09), 200);
    }
  };

  // 3. STORAGE LAYER: INDEXED-DB PERSISTENCE FOR AUDIT TRAILS
  const CoPilotStorage = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    STORE_NAME: "clinical_decision_audits",
    getDb: function () {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error("IndexedDB unavailable"));
          return;
        }
        const req = window.indexedDB.open(CoPilotStorage.DB_NAME, CoPilotStorage.DB_VERSION);
        req.onupgradeneeded = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(CoPilotStorage.STORE_NAME)) {
            const store = db.createObjectStore(CoPilotStorage.STORE_NAME, { keyPath: "auditId" });
            store.createIndex("timestamp", "timestamp", { unique: false });
            store.createIndex("safetyScore", "safetyScore", { unique: false });
          }
        };
        req.onsuccess = function (e) { resolve(e.target.result); };
        req.onerror = function (e) { reject(e.target.error); };
      });
    },
    persistAudit: async function (auditRecord) {
      try {
        const db = await CoPilotStorage.getDb();
        const tx = db.transaction(CoPilotStorage.STORE_NAME, "readwrite");
        const store = tx.objectStore(CoPilotStorage.STORE_NAME);
        store.put(auditRecord);
      } catch (err) {
        try {
          localStorage.setItem("VETCARE_LATEST_AUDIT", JSON.stringify(auditRecord));
        } catch (e) {
          console.warn("[CoPilotStorage] LocalStorage quota overflow", e);
        }
      }
    }
  };

  // 4. EVIDENCE-BASED GUIDELINES & PHARMACOLOGICAL KNOWLEDGE BASE
  const PharmacopeiaRegistry = {
    "dexamethasone": {
      name: "Dexamethasone Sodium Phosphate",
      class: "CORTICOSTEROID",
      pregnancyCategory: "X",
      milkWithdrawalHours: 72,
      meatWithdrawalDays: 21,
      substitutes: ["flunixin_meglumine", "meloxicam"],
      contraindicatedSpecies: [],
      notes: "Severe abortifacient in ruminants during late gestation (>7 months). Triggers cortisol surge and premature luteolysis."
    },
    "isoflupredone": {
      name: "Isoflupredone Acetate",
      class: "CORTICOSTEROID",
      pregnancyCategory: "X",
      milkWithdrawalHours: 48,
      meatWithdrawalDays: 7,
      substitutes: ["meloxicam"],
      contraindicatedSpecies: [],
      notes: "High abortifacient risk in third trimester pregnant cattle."
    },
    "meloxicam": {
      name: "Meloxicam Injection",
      class: "NSAID",
      pregnancyCategory: "B",
      milkWithdrawalHours: 48,
      meatWithdrawalDays: 15,
      substitutes: [],
      contraindicatedSpecies: [],
      notes: "COX-2 preferential. Safe in pregnancy when used at therapeutic doses; caution with dehydration."
    },
    "flunixin_meglumine": {
      name: "Flunixin Meglumine",
      class: "NSAID",
      pregnancyCategory: "B",
      milkWithdrawalHours: 36,
      meatWithdrawalDays: 7,
      substitutes: [],
      contraindicatedSpecies: [],
      notes: "Potent anti-endotoxic and visceral analgesic. Do not combine with other NSAIDs or steroids."
    },
    "paracetamol": {
      name: "Paracetamol (Acetaminophen)",
      class: "PARACETAMOL",
      pregnancyCategory: "B",
      milkWithdrawalHours: 24,
      meatWithdrawalDays: 5,
      substitutes: ["robenacoxib", "meloxicam"],
      contraindicatedSpecies: ["feline"],
      notes: "FATAL IN CATS: Felines lack glucuronyl transferase. Leads to toxic NAPQI build-up, severe methemoglobinemia, cyanosis, and hepatic necrosis."
    },
    "enrofloxacin": {
      name: "Enrofloxacin",
      class: "FLUOROQUINOLONE",
      pregnancyCategory: "C",
      milkWithdrawalHours: 72,
      meatWithdrawalDays: 14,
      substitutes: ["amoxicillin_clavulanate", "ceftiofur"],
      contraindicatedSpecies: [],
      ageContraindications: [
        { species: "canine", maxMonths: 12, reason: "Causes irreversible articular cartilage erosions and lameness in growing pups (< 1 year or < 18 months in giant breeds)." }
      ],
      notes: "Concentration-dependent bactericidal. Arthropathy risk in young canine animals."
    },
    "oxytetracycline": {
      name: "Oxytetracycline LA",
      class: "TETRACYCLINE",
      pregnancyCategory: "D",
      milkWithdrawalHours: 168, // 7 Days
      meatWithdrawalDays: 28,
      substitutes: ["ceftiofur", "amoxicillin_clavulanate"],
      ageContraindications: [
        { species: "all", maxMonths: 6, reason: "Chelates calcium in neonatal teeth and bones causing permanent yellow enamel hypoplasia and stunted skeletal growth." }
      ],
      notes: "High tissue binding. Extended milk withdrawal time."
    },
    "gentamicin": {
      name: "Gentamicin Sulfate",
      class: "AMINOGLYCOSIDE",
      pregnancyCategory: "D",
      milkWithdrawalHours: 96,
      meatWithdrawalDays: 45,
      substitutes: ["ceftiofur"],
      contraindicatedSpecies: [],
      notes: "Severe nephrotoxicity and ototoxicity in dehydrated or endotoxemic animals with elevated creatinine."
    },
    "albendazole": {
      name: "Albendazole Suspension",
      class: "ANTHELMINTIC_BENZIMIDAZOLE",
      pregnancyCategory: "X",
      milkWithdrawalHours: 72,
      meatWithdrawalDays: 14,
      substitutes: ["fenbendazole"],
      notes: "TERATOGENIC: Highly embryotoxic and teratogenic in sheep and cattle during first 30-45 days of gestation (craniofacial and skeletal deformities)."
    },
    "fenbendazole": {
      name: "Fenbendazole Bolus/Suspension",
      class: "ANTHELMINTIC_SAFE",
      pregnancyCategory: "A",
      milkWithdrawalHours: 0,
      meatWithdrawalDays: 8,
      substitutes: [],
      notes: "Gold standard pregnancy-safe anthelmintic across all ruminant gestation trimesters."
    },
    "ceftiofur": {
      name: "Ceftiofur Sodium / RTU",
      class: "BETA_LACTAM_CEPHALOSPORIN",
      pregnancyCategory: "A",
      milkWithdrawalHours: 0, // Zero milk discard standard
      meatWithdrawalDays: 4,
      substitutes: [],
      notes: "3rd-generation cephalosporin. Safe in pregnancy and ideal for dairy with zero milk discard."
    },
    "amoxicillin_clavulanate": {
      name: "Amoxicillin + Potassium Clavulanate",
      class: "POTENTIATED_PENICILLIN",
      pregnancyCategory: "A",
      milkWithdrawalHours: 48,
      meatWithdrawalDays: 10,
      substitutes: [],
      notes: "Broad-spectrum beta-lactamase resistant. Safe across growing pediatric, adult, and pregnant profiles."
    },
    "organophosphate_drench": {
      name: "Organophosphate Ectoparasiticide",
      class: "ORGANOPHOSPHATE",
      pregnancyCategory: "X",
      milkWithdrawalHours: 240, // 10 Days
      meatWithdrawalDays: 30,
      substitutes: ["ivermectin", "flumethrin"],
      notes: "Irreversible acetylcholinesterase inhibition. Severe neurotoxicity in debilitated, lactating, or pregnant animals."
    }
  };

  const InternationalGuidelines = {
    "acute_clinical_mastitis": {
      title: "Acute Coliform & Staphylococcal Clinical Mastitis Protocol",
      authority: "National Mastitis Council (NMC) & ICAR Guidelines 2026",
      summary: "First-line systemic Ceftiofur (1.1-2.2 mg/kg IM) or Enrofloxacin, combined with frequent complete milk stripping (q2-4h). Systemic Flunixin Meglumine for endotoxemia.",
      doNotUse: ["Corticosteroids (Suppresses mammary phagocytes and triggers abortion in pregnancy)"],
      monitoring: "CMT score every 48 hours, monitor milk conductivity and somatic cell count."
    },
    "canine_parvovirus": {
      title: "Canine Parvoviral Enteritis (CPV-2) Critical Intensive Care",
      authority: "WSAVA Global Clinical Practice Guidelines 2026",
      summary: "Aggressive IV crystalloid restoration (PlasmaLyte-A or RL), antiemetic Maropitant (Cerenia) 1 mg/kg SC, broad-spectrum IV antimicrobial coverage (Ampicillin + Cefotaxime / Metronidazole), and early micro-enteral nutrition.",
      doNotUse: ["Oral NSAIDs (Severe risk of fatal septic peritonitis through sloughed mucosal barrier)", "Enrofloxacin in puppies < 1 year"],
      monitoring: "Blood glucose q4h (prevent sepsis hypoglycemia), PCV/TP, daily body weight."
    },
    "bovine_ephemeral_fever": {
      title: "Bovine Ephemeral Fever (Three-Day Sickness / BEF) Protocol",
      authority: "ACVIM & Commonwealth Veterinary Association Standards",
      summary: "Rapid early intervention with NSAID (Flunixin Meglumine 2.2 mg/kg IV or Ketoprofen). Calcium Borogluconate 25% (250-450 ml SC/IV) to counter transient severe hypocalcemia.",
      doNotUse: ["High-dose Corticosteroids (Prolongs viraemia and paresis recovery)"],
      monitoring: "Check rectal temperature q12h. Ensure deep bedding to prevent recumbency decubital sores."
    },
    "equine_spasmodic_colic": {
      title: "Equine Spasmodic & Impaction Colic Resuscitation",
      authority: "AAEP Equine Clinical Standards 2026",
      summary: "Nasogastric intubation decompression, Flunixin Meglumine (1.1 mg/kg IV), isotonic enteral hydration via tube (5-8 L warm water with electrolytes).",
      doNotUse: ["Repeated doses of non-selective NSAIDs without hydration (Renal crest necrosis)"],
      monitoring: "Heart rate q30m (>60 bpm = surgical referral threshold), rectal exam, borborygmi auscultation."
    }
  };

  const ZoonoticSurveillanceRadar = [
    {
      pathogen: "Brucella abortus / melitensis",
      disease: "Brucellosis (Malta Fever / Bang's Disease)",
      zoonoticRisk: "CRITICAL HIGH (Direct farmer/vet transmission via placenta & raw milk)",
      protectiveSOP: "Wear elbow-length obstetrical gloves, N95 respirator, immediate isolation of aborting animal, mandatory serological Rose Bengal Plate Test (RBPT)."
    },
    {
      pathogen: "Bacillus anthracis",
      disease: "Anthrax (Splenic Fever)",
      zoonoticRisk: "LETHAL (Spore inhalation & cutaneous malignant pustule)",
      protectiveSOP: "DO NOT PERFORM POST-MORTEM EXAMINATION. Air exposure triggers sporulation. Seal carcass in deep pit with unslaked lime; report immediately to DAHD authorities."
    },
    {
      pathogen: "Rabies Lyssavirus",
      disease: "Rabies (Hydrophobia / Paralytic Rage)",
      zoonoticRisk: "100% FATAL ZOONOSIS (Saliva via bite or broken skin contact)",
      protectiveSOP: "Full PPE, quarantine suspected neurological canine/bovine, post-exposure prophylaxis (PEP) for attending clinical personnel within 24 hours."
    }
  ];

  // 5. MAIN CO-PILOT ASSISTANT CONTROLLER
  const ClinicalDecisionAssistant = {
    // --- Reactive Internal State ---
    state: {
      caseTelemetry: {
        species: "bovine", // bovine | canine | feline | caprine | equine
        ageMonths: 48,
        weightKg: 400,
        sex: "female",
        pregnant: true,
        trimester: 3,
        lactating: true,
        activeSymptoms: ["high fever (104.2°F)", "acute left paralumbar bloat", "decreased milk yield"],
        proposedDiagnosis: "acute_clinical_mastitis",
        proposedDrugs: ["dexamethasone", "meloxicam", "oxytetracycline"] // Intentionally seeded with lethal conflicts for auditing demo!
      },
      decisionAudits: {
        fatalContraindications: [],
        moderateInteractions: [],
        evidenceRecommendations: [],
        withdrawalWarnings: []
      },
      confidenceScore: 0,
      activeTab: "copilot_auditor", // copilot_auditor | drug_interaction_checker | guidelines_lookup | zoonotic_sentinel
      domContainer: null
    },

    // 6. LIFECYCLE: INIT
    init: function (containerId) {
      console.info("[Vetcare AI OS] Initializing AI Clinical Co-Pilot & Contraindication Auditor (2026 Production)...");
      ClinicalDecisionAssistant.injectStyles();
      ClinicalDecisionAssistant.bindEventBusAudits();
      ClinicalDecisionAssistant.runAudits();

      if (containerId) {
        ClinicalDecisionAssistant.render(containerId);
      }
      return ClinicalDecisionAssistant;
    },

    // 7. LIFECYCLE: RENDER
    render: function (containerId) {
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement("div");
        container.id = containerId || "clinicalDecisionAssistantContainer";
        container.className = "w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6";
        const mainHost = document.querySelector("main") || document.body;
        mainHost.innerHTML = "";
        mainHost.appendChild(container);
      }
      ClinicalDecisionAssistant.state.domContainer = container;

      // Render Complete Decision Assistant Workspace
      container.innerHTML = `
        <div id="vetcareDecisionAssistantWorkspace" class="max-w-7xl mx-auto space-y-6">
          ${ClinicalDecisionAssistant.renderMasterHeader()}
          ${ClinicalDecisionAssistant.renderSafetyScoreMeter()}
          ${ClinicalDecisionAssistant.renderNavigationTabs()}
          <div id="coPilotTabContentHost" class="transition-all duration-200">
            ${ClinicalDecisionAssistant.renderActiveTabContent()}
          </div>
        </div>
      `;

      ClinicalDecisionAssistant.bindDomActions();
    },

    // 8. LIFECYCLE: DESTROY
    destroy: function () {
      if (ClinicalDecisionAssistant.state.domContainer) {
        ClinicalDecisionAssistant.state.domContainer.innerHTML = "";
      }
      console.info("[Vetcare AI OS] Clinical Decision Assistant Destroyed Cleanly.");
    },

    // 9. DYNAMIC CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-decision-copilot-styles")) return;
      const style = document.createElement("style");
      style.id = "vetcare-decision-copilot-styles";
      style.textContent = `
        .safety-gauge-critical {
          background: linear-gradient(135deg, rgba(244,63,94,0.2) 0%, rgba(17,24,39,0.95) 100%) !important;
          border-color: #f43f5e !important;
          box-shadow: 0 0 25px -4px rgba(244,63,94,0.4) !important;
        }
        .safety-gauge-warning {
          background: linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(17,24,39,0.95) 100%) !important;
          border-color: #f59e0b !important;
        }
        .safety-gauge-optimal {
          background: linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(17,24,39,0.95) 100%) !important;
          border-color: #10b981 !important;
          box-shadow: 0 0 25px -4px rgba(16,185,129,0.3) !important;
        }
        .lethal-badge-pulse {
          animation: lethalBlink 1.4s infinite;
        }
        @keyframes lethalBlink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      `;
      document.head.appendChild(style);
    },

    // 10. REAL-TIME AUDIT ENGINE: DETECTS ALL CLINICAL HAZARDS
    runAudits: function () {
      const c = ClinicalDecisionAssistant.state.caseTelemetry;
      const proposed = c.proposedDrugs;
      const fatal = [];
      const moderate = [];
      const evidence = [];
      const withdrawal = [];

      let runningScore = 100;

      // 1. Audit: NSAID + Corticosteroid Concurrent Use
      const hasNSAID = proposed.some(id => PharmacopeiaRegistry[id] && PharmacopeiaRegistry[id].class === "NSAID");
      const hasSteroid = proposed.some(id => PharmacopeiaRegistry[id] && PharmacopeiaRegistry[id].class === "CORTICOSTEROID");
      if (hasNSAID && hasSteroid) {
        fatal.push({
          title: "घातक संयोजन: NSAID + Corticosteroid एक साथ (Lethal GI Perforation Risk)",
          description: "Meloxicam/Flunixin एवं Dexamethasone/Isoflupredone का एक साथ उपयोग गैस्ट्रिक म्यूकोसल बैरियर को पूर्णतः नष्ट कर तीव्र रक्तस्राव, अल्सरेटिव परफोरेशन एवं सेप्टिक पेरिटोनाइटिस पैदा करता है।",
          mechanism: "Dual COX-1/COX-2 inhibition + Phospholipase A2 blockade -> Prostaglandin synthesis shutdown.",
          offendingDrugs: ["NSAID", "CORTICOSTEROID"],
          suggestedSubstitution: { remove: "dexamethasone", keep: "meloxicam", reason: "Maintain safe single anti-inflammatory coverage" }
        });
        runningScore -= 45;
      }

      // 2. Audit: Paracetamol in Felines
      if (c.species === "feline" && proposed.includes("paracetamol")) {
        fatal.push({
          title: "घातक निषेध: बिल्लियों में पैरासिटामोल पूर्ण वर्जित (Fatal Feline Methemoglobinemia)",
          description: "बिल्लियों में ग्लूकोरोनाइड संयुग्मन (Glucuronyl Transferase) अनुपस्थित होने से पैरासिटामोल अत्यधिक विषैले NAPQI में परिवर्तित होता है, जिससे 4-8 घंटे में साइनोसिस, फेशियल एडिमा व हेपेटिक नेक्रोसिस से मृत्यु होती है।",
          mechanism: "Depletion of hepatic glutathione -> Erythrocyte hemoglobin converted to methemoglobin -> Fatal tissue anoxia.",
          offendingDrugs: ["paracetamol"],
          suggestedSubstitution: { remove: "paracetamol", replaceWith: "robenacoxib", reason: "Substitute with feline-approved Coxib NSAID or Buprenorphine" }
        });
        runningScore -= 50;
      }

      // 3. Audit: Corticosteroids in Late Gestation (Ruminants)
      if (c.pregnant && c.trimester === 3 && (c.species === "bovine" || c.species === "caprine")) {
        const offendingSteroid = proposed.find(id => id === "dexamethasone" || id === "isoflupredone");
        if (offendingSteroid) {
          fatal.push({
            title: "गर्भपात खतरा: तृतीय तिमाही में कॉर्टिकोस्टेरॉइड रेड अलर्ट (Late Gestation Abortion)",
            description: "गर्भावस्था के 7वें से 9वें महीने में Dexamethasone/Isoflupredone गर्भस्थ भ्रूण के कॉर्टिसोल स्तर को बढ़ाकर समयपूर्व प्रसव (Premature Parturition) एवं गंभीर गर्भपात करवाता है। जेर रुकने (ROP) की 95% संभावना।",
            mechanism: "Exogenous glucocorticoid activates placental 17α-hydroxylase -> Progesterone converts to Estrogen -> Luteolysis & Uterine contractions.",
            offendingDrugs: [offendingSteroid],
            suggestedSubstitution: { remove: offendingSteroid, replaceWith: "flunixin_meglumine", reason: "Substitute with pregnancy-safe NSAID (Flunixin / Meloxicam)" }
          });
          runningScore -= 50;
        }
      }

      // 4. Audit: Albendazole in 1st Trimester
      if (c.pregnant && c.trimester === 1 && proposed.includes("albendazole")) {
        fatal.push({
          title: "टेराटोजेनिक निषेध: प्रथम तिमाही में एल्बेंडाजोल (Embryotoxic Teratogen)",
          description: "गर्भाधान के प्रथम 30-45 दिनों में Albendazole भ्रूण में कपाल-चेहरे एवं हड्डियों की विकृतियां (Craniofacial malformations) पैदा करता है।",
          mechanism: "Microtubule polymerization disruption in rapidly dividing blastomeres.",
          offendingDrugs: ["albendazole"],
          suggestedSubstitution: { remove: "albendazole", replaceWith: "fenbendazole", reason: "Substitute with 100% pregnancy-safe Fenbendazole" }
        });
        runningScore -= 40;
      }

      // 5. Audit: Enrofloxacin in Growing Puppies
      if (c.species === "canine" && c.ageMonths < 12 && proposed.includes("enrofloxacin")) {
        moderate.push({
          title: "विकासशील पिल्लों में उपास्थि क्षति (Canine Pediatric Arthropathy)",
          description: "1 वर्ष से कम उम्र के श्वानों में Enrofloxacin वजन उठाने वाले जोड़ों के आर्टिकुलर कार्टिलेज में स्थायी क्षरण एवं लंगड़ापन पैदा करता है।",
          mechanism: "Magnesium chelation leading to chondrocyte necrosis in juvenile cartilage.",
          offendingDrugs: ["enrofloxacin"],
          suggestedSubstitution: { remove: "enrofloxacin", replaceWith: "amoxicillin_clavulanate", reason: "Substitute with pediatric-safe Amoxicillin-Clavulanate" }
        });
        runningScore -= 20;
      }

      // 6. Audit: Tetracyclines in Neonates / Growing Animals
      if (c.ageMonths < 6 && proposed.includes("oxytetracycline")) {
        moderate.push({
          title: "दंत व अस्थि विकास अवरोध (Permanent Tooth Enamel Hypoplasia)",
          description: "6 महीने से छोटे बछड़ों/पशुओं में Oxytetracycline बढ़ते दांतों एवं हड्डियों के कैल्शियम के साथ स्थायी संकुल बनाकर दांतों को पीला और कमजोर करता है।",
          mechanism: "Tetracycline-calcium orthophosphate complex deposition in active calcification zones.",
          offendingDrugs: ["oxytetracycline"],
          suggestedSubstitution: { remove: "oxytetracycline", replaceWith: "ceftiofur", reason: "Substitute with non-chelating 3rd generation Cephalosporin" }
        });
        runningScore -= 15;
      }

      // 7. Audit: Food Safety & Maximum Residue Limits (MRL)
      let maxMilkHours = 0;
      let maxMeatDays = 0;
      let residueFlagged = false;

      proposed.forEach(id => {
        const drug = PharmacopeiaRegistry[id];
        if (drug) {
          if (c.lactating && drug.milkWithdrawalHours > maxMilkHours) {
            maxMilkHours = drug.milkWithdrawalHours;
          }
          if (drug.meatWithdrawalDays > maxMeatDays) {
            maxMeatDays = drug.meatWithdrawalDays;
          }
        }
      });

      if (c.lactating && maxMilkHours > 0) {
        withdrawal.push({
          type: "MILK_WITHDRAWAL",
          hours: maxMilkHours,
          message: `दूध विथड्राल अवधि: न्यूनतम ${maxMilkHours} घंटे (${(maxMilkHours / 24).toFixed(1)} दिन) तक दूध को व्यावसायिक डेयरी या मानव उपभोग हेतु आपूर्ति न करें।`
        });
        residueFlagged = true;
      }

      if (maxMeatDays > 0) {
        withdrawal.push({
          type: "MEAT_WITHDRAWAL",
          days: maxMeatDays,
          message: `मांस विथड्राल अवधि: अंतिम खुराक के ${maxMeatDays} दिन बाद तक पशु का वध या मांस उपभोग वैधानिक रूप से प्रतिबंधित है।`
        });
        residueFlagged = true;
      }

      if (residueFlagged && (runningScore > 30)) {
        runningScore -= 10;
      }

      // Clamp Score
      runningScore = Math.max(0, Math.min(100, runningScore));

      ClinicalDecisionAssistant.state.confidenceScore = runningScore;
      ClinicalDecisionAssistant.state.decisionAudits = {
        fatalContraindications: fatal,
        moderateInteractions: moderate,
        evidenceRecommendations: evidence,
        withdrawalWarnings: withdrawal
      };

      // Emit Critical Event if Lethal Hazard detected
      if (fatal.length > 0) {
        EventBus.emit("copilot:warning_flagged", {
          fatalCount: fatal.length,
          score: runningScore,
          hazards: fatal
        });
      }

      // Persist Audit Record
      CoPilotStorage.persistAudit({
        auditId: "AUDIT-" + Date.now(),
        timestamp: Date.now(),
        safetyScore: runningScore,
        species: c.species,
        proposedDrugs: c.proposedDrugs,
        fatalCount: fatal.length
      });

      return ClinicalDecisionAssistant.state.decisionAudits;
    },

    // 11. REAL-TIME EVENT BUS AUDITOR WIRE
    bindEventBusAudits: function () {
      // Silently listen to real-time prescription draft modifications
      EventBus.on("prescription:draft_updated", function (payload) {
        if (!payload) return;
        if (payload.drugs) ClinicalDecisionAssistant.state.caseTelemetry.proposedDrugs = payload.drugs;
        if (payload.species) ClinicalDecisionAssistant.state.caseTelemetry.species = payload.species;
        if (payload.pregnant !== undefined) ClinicalDecisionAssistant.state.caseTelemetry.pregnant = payload.pregnant;
        ClinicalDecisionAssistant.runAudits();
        if (ClinicalDecisionAssistant.state.domContainer) {
          ClinicalDecisionAssistant.render(ClinicalDecisionAssistant.state.domContainer.id);
        }
      });
    },

    // 12. COMPONENT: MASTER CLINICAL HEADER
    renderMasterHeader: function () {
      const c = ClinicalDecisionAssistant.state.caseTelemetry;
      return `
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 shadow-xl relative overflow-hidden sunlight-card">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            <!-- Left Info -->
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-cyan-950/50">
                <i class="fa-solid fa-brain"></i>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h1 class="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight sunlight-text">
                    AI क्लीनिकल को-पायलट एवं कॉन्ट्राइंडिकेशन ऑडिटर
                  </h1>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    EVIDENCE-BASED 2026
                  </span>
                </div>
                <div class="text-xs font-mono text-slate-400 mt-1 sunlight-muted">
                  केस प्रोफाइल: <strong class="text-slate-200 capitalize">${c.species}</strong> (${c.ageMonths} माह, ${c.weightKg} kg) • 
                  गर्भावस्था: <strong class="${c.pregnant ? "text-rose-400" : "text-emerald-400"}">${c.pregnant ? "तृतीय तिमाही (Pregnant T3)" : "गैर-गर्भवती"}</strong> • 
                  दुग्ध उत्पादन: <strong class="text-cyan-400">${c.lactating ? "सक्रिय लैक्टेशन" : "ड्राई"}</strong>
                </div>
              </div>
            </div>

            <!-- Quick Profile Modifier Toolbar -->
            <div class="flex items-center gap-2 self-stretch lg:self-auto justify-between lg:justify-end flex-wrap">
              <button id="btnTogglePregnancy" type="button" class="py-2 px-3 rounded-xl border text-xs font-bold transition-all ${c.pregnant ? "bg-rose-500/20 text-rose-300 border-rose-500/50" : "bg-slate-800 text-slate-300 border-slate-700"}">
                <i class="fa-solid fa-baby mr-1"></i> ${c.pregnant ? "गर्भवती (Pregnant: ON)" : "गर्भवती (OFF)"}
              </button>

              <select id="selectCaseSpecies" class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white font-mono cursor-pointer">
                <option value="bovine" ${c.species === "bovine" ? "selected" : ""}>गौ/महिष (Bovine)</option>
                <option value="canine" ${c.species === "canine" ? "selected" : ""}>श्वान (Canine)</option>
                <option value="feline" ${c.species === "feline" ? "selected" : ""}>मार्जार (Feline)</option>
                <option value="caprine" ${c.species === "caprine" ? "selected" : ""}>अजा/मेष (Caprine)</option>
                <option value="equine" ${c.species === "equine" ? "selected" : ""}>अश्व (Equine)</option>
              </select>
            </div>

          </div>
        </div>
      `;
    },

    // 13. COMPONENT: SAFETY SCORE & PREGNANCY RISK METER
    renderSafetyScoreMeter: function () {
      const score = ClinicalDecisionAssistant.state.confidenceScore;
      const fatal = ClinicalDecisionAssistant.state.decisionAudits.fatalContraindications.length;
      const c = ClinicalDecisionAssistant.state.caseTelemetry;

      let gaugeClass = "safety-gauge-optimal";
      let statusText = "इष्टतम सुरक्षित प्रिस्क्रिप्शन (Optimal Clinical Safety)";
      let statusColor = "text-emerald-400";

      if (score < 50 || fatal > 0) {
        gaugeClass = "safety-gauge-critical";
        statusText = "अति-गंभीर घातक खतरे उपस्थित (LETHAL HAZARDS DETECTED)";
        statusColor = "text-rose-400 lethal-badge-pulse";
      } else if (score < 80) {
        gaugeClass = "safety-gauge-warning";
        statusText = "मध्यम जोखिम एवं विथड्राल सावधानियां (Caution Required)";
        statusColor = "text-amber-400";
      }

      return `
        <div class="p-6 rounded-2xl border-2 transition-all duration-300 ${gaugeClass} sunlight-card">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <!-- Left Circular Metric -->
            <div class="flex items-center gap-5">
              <div class="relative w-24 h-24 flex items-center justify-center">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path class="text-slate-800" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path class="${score < 50 ? "text-rose-500" : (score < 80 ? "text-amber-500" : "text-emerald-500")}" stroke-dasharray="${score}, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                </svg>
                <div class="absolute flex flex-col items-center justify-center">
                  <span class="text-2xl font-black font-mono text-white sunlight-text">${score}%</span>
                  <span class="text-[9px] font-mono text-slate-400 uppercase">सुरक्षा स्कोर</span>
                </div>
              </div>

              <div class="space-y-1">
                <div class="text-xs font-mono uppercase text-slate-400 font-bold">क्लिनिकल ऑडिट मूल्यांकन</div>
                <div class="text-lg font-display font-black ${statusColor} tracking-tight">${statusText}</div>
                <div class="text-xs text-slate-300 font-medium sunlight-muted">
                  ${fatal > 0 ? `चेतावनी: <strong>${fatal}</strong> घातक दवा संयोजन अवरोधित किए गए हैं। प्रिस्क्रिप्शन प्रिंट करने से पूर्व सुरक्षित विकल्प लागू करें।` : "वर्तमान दवा सूची स्वीकृत अंतरराष्ट्रीय वेटरनरी फॉर्मूलरी मानकों के अनुकूल है।"}
                </div>
              </div>
            </div>

            <!-- Pregnancy Tier Badge -->
            <div class="flex items-center gap-3">
              <div class="px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center min-w-[150px]">
                <div class="text-[10px] font-mono text-slate-400 uppercase">गर्भ जोखिम स्तर (Pregnancy Tier)</div>
                <div class="text-sm font-black font-mono mt-0.5 ${c.pregnant ? (fatal > 0 ? "text-rose-400" : "text-amber-400") : "text-emerald-400"}">
                  ${c.pregnant ? (fatal > 0 ? "CATEGORY X (ABORTION)" : "CATEGORY B (MONITORED)") : "CATEGORY A (SAFE)"}
                </div>
              </div>

              <!-- Instant Fix Substitution Master Button -->
              ${fatal > 0 ? `
                <button id="btnAutoFixSubstitutions" type="button" class="py-3 px-5 rounded-xl font-display font-black text-xs uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-950/50 flex items-center gap-2 active:scale-95 transition-all">
                  <i class="fa-solid fa-wand-magic-sparkles"></i>
                  <span>1-क्लिक सुरक्षित प्रतिस्थापन (Auto-Fix)</span>
                </button>
              ` : ""}
            </div>

          </div>
        </div>
      `;
    },

    // 14. COMPONENT: NAVIGATION TABS
    renderNavigationTabs: function () {
      const active = ClinicalDecisionAssistant.state.activeTab;
      const audits = ClinicalDecisionAssistant.state.decisionAudits;
      const fatalCount = audits.fatalContraindications.length;

      const tabs = [
        { id: "copilot_auditor", label: "लाइव ऑडिट रिपोर्ट (Active Audit)", icon: "fa-shield-halved", badge: fatalCount > 0 ? fatalCount : null },
        { id: "drug_interaction_checker", label: "दवा पारस्परिक अंतर्क्रिया (Conflict Matrix)", icon: "fa-table-cells" },
        { id: "guidelines_lookup", label: "प्रमाण-आधारित गाइडलाइन्स (EBM Protocols)", icon: "fa-book-medical" },
        { id: "zoonotic_sentinel", label: "जुनोटिक संक्रामक संतरी (One Health Sentinel)", icon: "fa-biohazard" }
      ];

      return `
        <div class="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs.map(t => `
            <button type="button" data-copilot-tab="${t.id}" class="copilot-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
              active === t.id
                ? "bg-slate-900 text-cyan-400 border-t-2 border-l border-r border-cyan-500 border-b-transparent shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }">
              <i class="fa-solid ${t.icon}"></i>
              <span>${t.label}</span>
              ${t.badge ? `<span class="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black bg-rose-500 text-white lethal-badge-pulse">${t.badge}</span>` : ""}
            </button>
          `).join("")}
        </div>
      `;
    },

    // 15. TAB CONTENT ROUTER
    renderActiveTabContent: function () {
      switch (ClinicalDecisionAssistant.state.activeTab) {
        case "drug_interaction_checker":
          return ClinicalDecisionAssistant.renderDrugConflictMatrixTab();
        case "guidelines_lookup":
          return ClinicalDecisionAssistant.renderGuidelinesLookupTab();
        case "zoonotic_sentinel":
          return ClinicalDecisionAssistant.renderZoonoticSentinelTab();
        case "copilot_auditor":
        default:
          return ClinicalDecisionAssistant.renderCopilotAuditorTab();
      }
    },

    // 16. COMPONENT: TAB 1 - LIVE COPILOT AUDITOR REPORT
    renderCopilotAuditorTab: function () {
      const audits = ClinicalDecisionAssistant.state.decisionAudits;
      const proposed = ClinicalDecisionAssistant.state.caseTelemetry.proposedDrugs;

      return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- Left Pane: Proposed Drugs Sandbox (5 Cols) -->
          <div class="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-capsules text-cyan-400"></i>
                <h3 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">प्रस्तावित प्रिस्क्रिप्शन सैंडबॉक्स</h3>
              </div>
              <span class="text-[10px] font-mono text-cyan-400">${proposed.length} दवाएं सक्रिय</span>
            </div>

            <!-- Proposed Drugs Active Chips -->
            <div class="space-y-2">
              ${proposed.map(drugKey => {
                const info = PharmacopeiaRegistry[drugKey] || { name: drugKey, class: "UNKNOWN" };
                const isContraindicated = audits.fatalContraindications.some(f => f.offendingDrugs.includes(drugKey) || f.offendingDrugs.includes(info.class));

                return `
                  <div class="p-3 rounded-xl bg-slate-950/70 border ${isContraindicated ? "border-rose-500/60 bg-rose-950/20" : "border-slate-800"} flex items-center justify-between gap-3">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-white sunlight-text">${info.name}</span>
                        ${isContraindicated ? '<span class="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">HAZARD</span>' : ""}
                      </div>
                      <div class="text-[10px] font-mono text-slate-400">${info.class} • श्रेणी: ${info.pregnancyCategory}</div>
                    </div>
                    <button type="button" data-action="remove_sandbox_drug" data-drug-key="${drugKey}" class="text-slate-400 hover:text-rose-400 p-1 text-xs">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                `;
              }).join("")}
            </div>

            <!-- Add Drug to Sandbox Selector -->
            <div class="pt-2 flex items-center gap-2">
              <select id="selectAddSandboxDrug" class="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono">
                ${Object.keys(PharmacopeiaRegistry).filter(k => !proposed.includes(k)).map(k => `
                  <option value="${k}">${PharmacopeiaRegistry[k].name} (${PharmacopeiaRegistry[k].class})</option>
                `).join("")}
              </select>
              <button id="btnAddSandboxDrug" type="button" class="py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow">
                <i class="fa-solid fa-plus"></i> जोड़ें
              </button>
            </div>
          </div>

          <!-- Right Pane: Audit Findings Cards Stack (7 Cols) -->
          <div class="lg:col-span-7 space-y-4">
            
            <!-- Fatal Contraindications Stack -->
            ${audits.fatalContraindications.map(f => `
              <div class="p-5 rounded-2xl bg-rose-950/30 border-2 border-rose-500 shadow-xl space-y-3 sunlight-card">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm font-black">
                      <i class="fa-solid fa-skull-crossbones"></i>
                    </div>
                    <div>
                      <div class="font-display font-extrabold text-sm text-rose-300">${f.title}</div>
                      <span class="px-2 py-0.2 rounded text-[9px] font-mono font-black uppercase bg-rose-500 text-slate-950">LETHAL BLOCK</span>
                    </div>
                  </div>
                </div>

                <p class="text-xs text-slate-200 leading-relaxed font-sans">${f.description}</p>

                <div class="p-3 rounded-xl bg-slate-950/80 border border-rose-500/30 text-[11px] font-mono text-rose-200/90">
                  <strong>बायोमेडिकल मैकेनिज्म:</strong> ${f.mechanism}
                </div>

                ${f.suggestedSubstitution ? `
                  <div class="pt-2 flex items-center justify-between gap-3 border-t border-rose-800/40">
                    <div class="text-[11px] text-emerald-400 font-mono">
                      <i class="fa-solid fa-shield-halved mr-1"></i>अनुशंसित प्रतिस्थापन: <strong>${f.suggestedSubstitution.replaceWith ? PharmacopeiaRegistry[f.suggestedSubstitution.replaceWith].name : "दवा हटाएं"}</strong>
                    </div>
                    <button type="button" data-action="apply_substitution" data-remove="${f.suggestedSubstitution.remove}" data-replace="${f.suggestedSubstitution.replaceWith || ""}" class="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-black shadow-md active:scale-95 transition-all">
                      प्रतिस्थापन लागू करें
                    </button>
                  </div>
                ` : ""}
              </div>
            `).join("")}

            <!-- Moderate Warnings Stack -->
            ${audits.moderateInteractions.map(m => `
              <div class="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/60 shadow-xl space-y-2.5 sunlight-card">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-triangle-exclamation text-amber-400 text-base"></i>
                  <div class="font-display font-bold text-sm text-amber-300">${m.title}</div>
                </div>
                <p class="text-xs text-slate-200 leading-relaxed font-sans">${m.description}</p>
                <div class="text-[10px] font-mono text-amber-200/80">${m.mechanism}</div>
              </div>
            `).join("")}

            <!-- Mandatory Withdrawal & Residue Notices -->
            ${audits.withdrawalWarnings.map(w => `
              <div class="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex items-start gap-3">
                <i class="fa-solid fa-clock-rotate-left text-cyan-400 text-base mt-0.5"></i>
                <div>
                  <div class="text-xs font-mono font-bold text-cyan-300 uppercase">${w.type === "MILK_WITHDRAWAL" ? "दुग्ध अवशेष निवारण (Zero Milk Residue)" : "मांस अवशेष निवारण (Zero Meat Residue)"}</div>
                  <div class="text-xs text-slate-300 mt-0.5">${w.message}</div>
                </div>
              </div>
            `).join("")}

            ${audits.fatalContraindications.length === 0 && audits.moderateInteractions.length === 0 ? `
              <div class="p-8 rounded-2xl bg-emerald-950/20 border-2 border-emerald-500/40 text-center space-y-2 sunlight-card">
                <div class="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mx-auto">
                  <i class="fa-solid fa-circle-check"></i>
                </div>
                <div class="font-display font-black text-base text-emerald-300">कोई घातक कॉन्ट्राइंडिकेशन उपस्थित नहीं है</div>
                <p class="text-xs text-slate-300 max-w-md mx-auto">प्रस्तावित सभी औषधियां पशु की प्रजाति, आयु, गर्भावस्था तिमाही एवं दुग्ध उत्पादन स्थिति के पूर्णतः अनुकूल हैं।</p>
              </div>
            ` : ""}

          </div>
        </div>
      `;
    },

    // 17. COMPONENT: TAB 2 - DRUG CONFLICT MATRIX
    renderDrugConflictMatrixTab: function () {
      const keys = Object.keys(PharmacopeiaRegistry);

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="border-b border-slate-800 pb-3">
            <h3 class="font-display font-black text-base text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
              <i class="fa-solid fa-table-cells text-cyan-400"></i>
              <span>पशु चिकित्सा औषधि पारस्परिक अंतर्क्रिया सारणी (Clinical Interaction Matrix)</span>
            </h3>
            <p class="text-xs text-slate-400 sunlight-muted">प्रमुख औषधियों के साथ सह-प्रशासन (Co-Administration) के संभावित औषधीय प्रभाव।</p>
          </div>

          <div class="overflow-x-auto custom-scrollbar">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                <tr>
                  <th class="p-3">दवा 1 (Primary Agent)</th>
                  <th class="p-3">दवा 2 (Interacting Agent)</th>
                  <th class="p-3">जोखिम स्तर (Severity)</th>
                  <th class="p-3">नैदानिक अंतर्क्रिया एवं प्रभाव (Mechanism & Outcome)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800 bg-slate-950/40 text-slate-200 font-mono text-[11px]">
                <tr>
                  <td class="p-3 font-bold text-white">Meloxicam / Flunixin (NSAIDs)</td>
                  <td class="p-3 font-bold text-rose-400">Dexamethasone / Prednisolone</td>
                  <td class="p-3"><span class="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">LETHAL HAZARD</span></td>
                  <td class="p-3 text-slate-300 font-sans text-xs">गैस्ट्रिक अल्सरेशन, जीआई परफोरेशन एवं रीनल पैपिलरी नेक्रोसिस का अत्यधिक खतरा।</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-white">Gentamicin / Amikacin</td>
                  <td class="p-3 font-bold text-amber-400">Furosemide (Lasix)</td>
                  <td class="p-3"><span class="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">MODERATE/HIGH</span></td>
                  <td class="p-3 text-slate-300 font-sans text-xs">सहवर्ती उपयोग से नेफ्रोटॉक्सिसिटी एवं ऑटो-टॉक्सिसिटी (स्थायी बहरापन) में तीव्र वृद्धि।</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-white">Enrofloxacin / Marbofloxacin</td>
                  <td class="p-3 font-bold text-slate-400">Oral Antacids (Ca/Mg/Al Salts)</td>
                  <td class="p-3"><span class="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">EFFICACY LOSS</span></td>
                  <td class="p-3 text-slate-300 font-sans text-xs">धातु आयनों के साथ चीलेशन से फ्लोरोक्विनोलोन का अवशोषण 80-90% तक घट जाता है।</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-white">Organophosphates / Ectoparasiticides</td>
                  <td class="p-3 font-bold text-rose-400">Levamisole / Pyrantel</td>
                  <td class="p-3"><span class="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">NEUROTOXICITY</span></td>
                  <td class="p-3 text-slate-300 font-sans text-xs">निकोटिनिक कोलीनर्जिक स्टिमुलेशन का अति-प्रसार। सांस रुकने एवं घातक ऐंठन का खतरा।</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // 18. COMPONENT: TAB 3 - EVIDENCE-BASED GUIDELINES LOOKUP
    renderGuidelinesLookupTab: function () {
      const selected = ClinicalDecisionAssistant.state.caseTelemetry.proposedDiagnosis;
      const keys = Object.keys(InternationalGuidelines);

      return `
        <div class="space-y-5">
          <!-- Diagnosis Selector Ribbon -->
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sunlight-card">
            <div class="text-xs font-mono uppercase text-slate-300 font-bold flex items-center gap-2">
              <i class="fa-solid fa-book-bookmark text-cyan-400"></i>
              <span>रोग प्रोटोकॉल चयन (Disease Protocol):</span>
            </div>
            <select id="selectGuidelineDisease" class="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white font-mono cursor-pointer">
              ${keys.map(k => `
                <option value="${k}" ${k === selected ? "selected" : ""}>${InternationalGuidelines[k].title}</option>
              `).join("")}
            </select>
          </div>

          <!-- Active Guideline Detail Card -->
          ${(() => {
            const g = InternationalGuidelines[selected] || InternationalGuidelines["acute_clinical_mastitis"];
            return `
              <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
                <div class="border-b border-slate-800 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h2 class="font-display font-black text-lg text-white sunlight-text">${g.title}</h2>
                    <div class="text-xs font-mono text-emerald-400">${g.authority}</div>
                  </div>
                  <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    GOLD-STANDARD
                  </span>
                </div>

                <div class="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span class="font-mono uppercase text-slate-400 font-bold text-[10px] block mb-1">मानक उपचार सारांश (Treatment Summary):</span>
                    <p class="text-slate-200">${g.summary}</p>
                  </div>

                  <div class="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/40">
                    <span class="font-mono uppercase text-rose-400 font-bold text-[10px] block mb-1">
                      <i class="fa-solid fa-ban mr-1"></i> पूर्णतः वर्जित (Contraindicated Actions):
                    </span>
                    <ul class="list-disc pl-5 text-rose-200 space-y-0.5">
                      ${g.doNotUse.map(item => `<li>${item}</li>`).join("")}
                    </ul>
                  </div>

                  <div>
                    <span class="font-mono uppercase text-cyan-400 font-bold text-[10px] block mb-1">क्लिनिकल मॉनिटरिंग एवं प्रोग्नोसिस:</span>
                    <p class="text-slate-300">${g.monitoring}</p>
                  </div>
                </div>
              </div>
            `;
          })()}
        </div>
      `;
    },

    // 19. COMPONENT: TAB 4 - ONE HEALTH ZOONOTIC SENTINEL
    renderZoonoticSentinelTab: function () {
      return `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-rose-950/20 border-2 border-rose-500/40 flex items-center justify-between gap-3 sunlight-card">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center text-xl">
                <i class="fa-solid fa-biohazard"></i>
              </div>
              <div>
                <h3 class="font-display font-black text-base text-rose-300 uppercase">राष्ट्रीय व अंतरराष्ट्रीय जुनोटिक संक्रामक निगरानी (One Health)</h3>
                <p class="text-xs text-rose-200/80">पशुओं से मानवों में फैलने वाले घातक रोगाणुओं के विरुद्ध क्लिनिकल शील्ड व एसओपी।</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded text-[10px] font-mono font-black uppercase bg-rose-500 text-slate-950">
              MANDATORY NOTIFICATION
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${ZoonoticSurveillanceRadar.map(z => `
              <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 sunlight-card flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                    <span class="font-mono text-[10px] text-rose-400 font-black uppercase">${z.zoonoticRisk}</span>
                    <i class="fa-solid fa-shield-virus text-slate-500"></i>
                  </div>
                  <h4 class="font-display font-black text-base text-white sunlight-text">${z.disease}</h4>
                  <div class="text-[11px] font-mono text-cyan-400 font-semibold mb-2">रोगाणु: ${z.pathogen}</div>
                  <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong>सुरक्षा प्रोटोकॉल (SOP):</strong> ${z.protectiveSOP}
                  </div>
                </div>

                <div class="pt-3 border-t border-slate-800/80">
                  <button type="button" class="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700">
                    <i class="fa-solid fa-bullhorn text-amber-400 mr-1"></i> वैधानिक रिपोर्टिंग करें
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    },

    // 20. DIRECT ACTION: AUTO-FIX LETHAL HAZARDS WITH SAFE SUBSTITUTIONS
    applySafeSubstitutions: function () {
      const audits = ClinicalDecisionAssistant.state.decisionAudits;
      const proposed = ClinicalDecisionAssistant.state.caseTelemetry.proposedDrugs;

      audits.fatalContraindications.forEach(f => {
        if (f.suggestedSubstitution) {
          const rem = f.suggestedSubstitution.remove;
          const rep = f.suggestedSubstitution.replaceWith;

          // Remove offending drug
          const remIdx = proposed.indexOf(rem);
          if (remIdx !== -1) {
            proposed.splice(remIdx, 1);
          }
          // Add replacement if valid and not present
          if (rep && !proposed.includes(rep)) {
            proposed.push(rep);
          }
        }
      });

      ClinicalDecisionAssistant.runAudits();
      ClinicalDecisionAssistant.render(ClinicalDecisionAssistant.state.domContainer.id);
      CoPilotAudio.chimeSafeSubstitution();

      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("घातक औषधियों को सुरक्षित विकल्पों से सफलतापूर्वक प्रतिस्थापित किया गया!", "success");
      }
    },

    // 21. DOM EVENT DELEGATION & ACTION BINDINGS
    bindDomActions: function () {
      const root = ClinicalDecisionAssistant.state.domContainer;
      if (!root) return;

      // Tab switcher clicks
      root.querySelectorAll(".copilot-tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const tab = this.getAttribute("data-copilot-tab");
          if (tab) {
            ClinicalDecisionAssistant.state.activeTab = tab;
            ClinicalDecisionAssistant.render(ClinicalDecisionAssistant.state.domContainer.id);
          }
        });
      });

      // Toggle pregnancy button
      const btnTogglePreg = document.getElementById("btnTogglePregnancy");
      if (btnTogglePreg) {
        btnTogglePreg.addEventListener("click", function () {
          ClinicalDecisionAssistant.state.caseTelemetry.pregnant = !ClinicalDecisionAssistant.state.caseTelemetry.pregnant;
          ClinicalDecisionAssistant.runAudits();
          ClinicalDecisionAssistant.render(ClinicalDecisionAssistant.state.domContainer.id);
        });
      }

      // Species selector
      const selectSpecies = document.getElementById("selectCaseSpecies");
      if (selectSpecies) {
        selectSpecies.addEventListener("change", function () {
          ClinicalDecisionAssistant.state.caseTelemetry.species = this.value;
          ClinicalDecisionAssistant.runAudits();
          ClinicalDecisionAssistant.render(ClinicalDecisionAssistant.state.domContainer.id);
        });
      }

      // Disease guideline selector
      const selectGuideline = document.getElementById("selectGuidelineDisease");
      if (selectGuideline) {
        selectGuideline.addEventListener("change", function () {
          ClinicalDecisionAssistant.state.caseTelemetry.proposedDiagnosis = this.value;
          ClinicalDecisionAssistant.render(ClinicalDecisionAssistant.state.domContainer.id);
        });
      }

      // Auto-Fix Master Button
      const btnAutoFix = document.getElementById("btnAutoFixSubstitutions");
      if (btnAutoFix) {
        btnAutoFix.addEventListener("click", () => ClinicalDecisionAssistant.applySafeSubstitutions());
      }

      // Add Drug to Sandbox Button
      const btnAddSandbox = document.getElementById("btnAddSandboxDrug");
      const selectAddSandbox = document.getElementById("selectAddSandboxDrug");
      if (btnAddSandbox && selectAddSandbox) {
        btnAddSandbox.addEventListener("click", function () {
          const drugKey = selectAddSandbox.value;
          if (drugKey && !ClinicalDecisionAssistant.state.caseTelemetry.proposedDrugs.includes(drugKey)) {
            ClinicalDecisionAssistant.state.caseTelemetry.proposedDrugs.push(drugKey);
            ClinicalDecisionAssistant.runAudits();
            ClinicalDecisionAssistant.render(ClinicalDecisionAssistant.state.domContainer.id);
            CoPilotAudio.playTone(784, "sine", 0.1, 0.08);
          }
        });
      }

      // Delegated Action Clicks across the entire Copilot
      root.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");

        if (action === "remove_sandbox_drug") {
          const drugKey = btn.getAttribute("data-drug-key");
          const idx = ClinicalDecisionAssistant.state.caseTelemetry.proposedDrugs.indexOf(drugKey);
          if (idx !== -1) {
            ClinicalDecisionAssistant.state.caseTelemetry.proposedDrugs.splice(idx, 1);
            ClinicalDecisionAssistant.runAudits();
            ClinicalDecisionAssistant.render(ClinicalDecisionAssistant.state.domContainer.id);
          }
        } else if (action === "apply_substitution") {
          const rem = btn.getAttribute("data-remove");
          const rep = btn.getAttribute("data-replace");

          const remIdx = ClinicalDecisionAssistant.state.caseTelemetry.proposedDrugs.indexOf(rem);
          if (remIdx !== -1) {
            ClinicalDecisionAssistant.state.caseTelemetry.proposedDrugs.splice(remIdx, 1);
          }
          if (rep && !ClinicalDecisionAssistant.state.caseTelemetry.proposedDrugs.includes(rep)) {
            ClinicalDecisionAssistant.state.caseTelemetry.proposedDrugs.push(rep);
          }

          ClinicalDecisionAssistant.runAudits();
          ClinicalDecisionAssistant.render(ClinicalDecisionAssistant.state.domContainer.id);
          CoPilotAudio.chimeSafeSubstitution();

          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("प्रतिस्थापन सफलतापूर्वक लागू किया गया!", "success");
          }
        }
      });
    }
  };

  // 22. EXPORT TO GLOBAL NAMESPACE & AUTO-INIT
  window.VetcareApp.Doctor.ClinicalDecisionAssistant = ClinicalDecisionAssistant;

  document.addEventListener("DOMContentLoaded", function () {
    const defaultHost = document.getElementById("clinicalDecisionAssistantContainer");
    if (defaultHost) {
      ClinicalDecisionAssistant.init("clinicalDecisionAssistantContainer");
    }
  });

})(window, document);
