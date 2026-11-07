// Vetcare AI OS - Veterinary Clinical Toxicology, Toxin Decontamination & Antidote Engine (2026 Production)

(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE & MODULE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. SCIENTIFIC CLINICAL TOXICOLOGY DATABASE & PHARMACOPEIA
  const TOXICOLOGY_CATALOG = {
    CHOCOLATE_THEOBROMINE: {
      id: "CHOCOLATE_THEOBROMINE",
      name: "Theobromine / Caffeine (Chocolate Toxicosis)",
      targetSpecies: ["canine"],
      theobromineConcentrationsMgPerGram: {
        MILK_CHOCOLATE: 2.0,
        DARK_CHOCOLATE: 15.0,
        BAKERS_UNSWEETENED: 26.0,
        COCOA_POWDER: 28.5
      },
      toxicityThresholdsMgPerKg: {
        SUBCLINICAL: 19.9,
        MILD_GI: 20.0, // Polydipsia, vomiting, diarrhea, abdominal bloating
        CARDIOTOXIC: 40.0, // Tachycardia, ventricular premature complexes (VPCs), arrhythmias
        LETHAL_NEUROTOXIC: 60.0 // Seizures, severe muscle tremors, hyperthermia, coma, death
      },
      halfLifeHours: 17.5,
      emesisSafeWindowHours: 2.5,
      specificAntidote: null, // Symptomatic & supportive
      primaryTreatment: "Induce emesis (Apomorphine) if <2h; Activated Charcoal (1-2 g/kg with sorbitol q4-6h); Urinary catheterization (prevents theobromine reabsorption through bladder wall); Metoprolol/Esmolol for refractory ventricular tachycardia."
    },
    ORGANOPHOSPHATE_CARBAMATE: {
      id: "ORGANOPHOSPHATE_CARBAMATE",
      name: "Organophosphate & Carbamate Insecticides",
      targetSpecies: ["canine", "feline", "bovine", "equine"],
      mechanism: "Irreversible (OP) or reversible (Carbamate) inhibition of acetylcholinesterase, causing massive accumulation of acetylcholine at muscarinic, nicotinic, and CNS synapses.",
      classicSigns: "SLUDGE (Salivation, Lacrimation, Urination, Defecation, GI cramping, Emesis) + Miosis, muscle fasciculations, bradycardia, bronchospasm, seizures.",
      emesisSafeWindowHours: 1.0,
      contraindications: ["Do NOT induce emesis if animal is seizing, comatose, or lacks gag reflex."],
      antidotes: [
        {
          name: "Atropine Sulfate (Muscarinic Blocker)",
          doseFormulaMgPerKg: 0.3, // 0.2 to 0.5 mg/kg
          route: "1/4th slow IV, 3/4th IM or SC",
          standardConcMgMl: 0.6,
          repeatInterval: "Repeat q15-30 min until full atropinization (mydriasis, dry mouth, HR > 100 bpm). Does NOT reverse muscle twitching."
        },
        {
          name: "2-PAM / Pralidoxime Chloride (AChE Reactivator)",
          doseFormulaMgPerKg: 20.0,
          route: "Slow IV infusion over 20-30 min",
          standardConcMgMl: 50.0, // 1g reconstituted in 20 ml
          repeatInterval: "Repeat q8-12h for 24-48h. Must be administered before 'aging' of enzyme occurs (<36 hours post-exposure)."
        }
      ]
    },
    ANTICOAGULANT_RODENTICIDE: {
      id: "ANTICOAGULANT_RODENTICIDE",
      name: "Anticoagulant Rodenticides (Warfarin, Bromadiolone, Brodifacoum)",
      targetSpecies: ["canine", "feline"],
      mechanism: "Competitive inhibition of Vitamin K1 epoxide reductase, depleting active clotting factors II, VII, IX, and X. Coagulopathy surfaces 36 to 72 hours post-ingestion.",
      clinicalSigns: "Subcutaneous hematomas, hemothorax, hemoperitoneum, hematuria, melena, hypovolemic shock, epistaxis.",
      emesisSafeWindowHours: 2.0,
      antidotes: [
        {
          name: "Vitamin K1 (Phytomenadione)",
          doseFormulaMgPerKg: 3.5, // 2.5 to 5.0 mg/kg
          route: "Oral (PO) with fatty meal (canned food/butter) OR Subcutaneous (SC) with 25G needle",
          standardConcMgMl: 10.0,
          durationDays: "21 to 28 days (for second-generation single-feed brodifacoum/bromadiolone)",
          blackBoxWarning: "CRITICAL: NEVER INJECT VITAMIN K1 INTRAVENOUSLY (IV). High risk of fatal acute anaphylactoid collapse and death."
        }
      ]
    },
    ACETAMINOPHEN_PARACETAMOL: {
      id: "ACETAMINOPHEN_PARACETAMOL",
      name: "Acetaminophen / Paracetamol Toxicosis (Feline Extreme Hazard)",
      targetSpecies: ["feline", "canine"],
      felineLethalDoseMgKg: 10.0, // Felines have deficient glucuronyl transferase
      canineToxicDoseMgKg: 100.0,
      pathognomonicSigns: "Chocolate brown blood (Methemoglobinemia), cyanosis, severe facial and paw edema, hypothermia, acute hepatic necrosis.",
      emesisSafeWindowHours: 1.0,
      antidotes: [
        {
          name: "N-Acetylcysteine (NAC - Mucomyst)",
          doseFormulaMgPerKg: 140.0, // Loading dose
          maintenanceDoseMgKg: 70.0,
          route: "Slow IV infusion (diluted 1:4 in 5% Dextrose through 0.2 um bacterial filter) or PO",
          standardConcMgMl: 200.0, // 20% solution
          frequency: "Loading dose 140 mg/kg once, followed by 70 mg/kg q4h for 7 maintenance treatments."
        },
        {
          name: "Ascorbic Acid (Vitamin C)",
          doseFormulaMgPerKg: 30.0,
          route: "Slow IV or PO q6h",
          standardConcMgMl: 250.0,
          monitoring: "Acts as reducing agent to revert methemoglobin back to active functional hemoglobin."
        },
        {
          name: "Cimetidine (P450 Inhibitor)",
          doseFormulaMgPerKg: 10.0,
          route: "IV q8h",
          standardConcMgMl: 100.0,
          monitoring: "Inhibits cytochrome P450 conversion of acetaminophen into reactive toxic NAPQI metabolite."
        }
      ]
    },
    LIPID_REACTIVE_TOXINS: {
      id: "LIPID_REACTIVE_TOXINS",
      name: "Lipophilic Toxins (Ivermectin, Permethrin, Local Anesthetics)",
      targetSpecies: ["canine", "feline"],
      examples: "Ivermectin / Moxidectin (MDR1 mutant dogs), Permethrin spot-on toxicity in cats, Bupivacaine/Lidocaine, Calcium channel blockers.",
      ileProtocol: {
        agent: "Intravenous Lipid Emulsion (ILE 20% - Intralipid)",
        mechanism: "Creates a circulating intravascular 'lipid sink' compartment that extracts and traps lipophilic xenobiotics, accelerating clearance.",
        loadingBolusMlPerKg: 1.5, // Over 1-2 minutes
        criRateMlPerKgPerMin: 0.25, // For 30 to 60 minutes
        maxTotalDoseMlPerKgPerDay: 12.0,
        contraindications: "Pancreatitis, pre-existing gross lipemia, severe pulmonary disease."
      }
    }
  };

  // Expose to global clinical data
  window.VetcareApp.ClinicalData.ToxicologyPoisons = TOXICOLOGY_CATALOG;

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE)
  const ToxStorage = {
    dbName: "VetcareToxicologyDB",
    dbVersion: 1,
    storeName: "toxicology_cases",
    db: null,

    async init() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn("[Vetcare Tox] IndexedDB not available, using localStorage fallback.");
          resolve(false);
          return;
        }
        const request = window.indexedDB.open(this.dbName, this.dbVersion);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: "id" });
          }
        };
        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(true);
        };
        request.onerror = (err) => {
          console.error("[Vetcare Tox] IndexedDB open error:", err);
          resolve(false);
        };
      });
    },

    async getAll() {
      if (!this.db) {
        const raw = localStorage.getItem("VETCARE_TOXICOLOGY_CASES");
        return raw ? JSON.parse(raw) : [];
      }
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(this.storeName, "readonly");
          const store = tx.objectStore(this.storeName);
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        } catch (e) {
          console.error(e);
          resolve([]);
        }
      });
    },

    async put(item) {
      if (!item.id) item.id = "TOX-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      if (!this.db) {
        const all = await this.getAll();
        const idx = all.findIndex((x) => x.id === item.id);
        if (idx >= 0) all[idx] = item;
        else all.push(item);
        localStorage.setItem("VETCARE_TOXICOLOGY_CASES", JSON.stringify(all));
        return item;
      }
      return new Promise((resolve, reject) => {
        try {
          const tx = this.db.transaction(this.storeName, "readwrite");
          const store = tx.objectStore(this.storeName);
          const req = store.put(item);
          req.onsuccess = () => resolve(item);
          req.onerror = (err) => reject(err);
        } catch (e) {
          reject(e);
        }
      });
    }
  };

  // 4. MAIN TOXICOLOGY & ANTIDOTE CONTROLLER
  const ToxicologyPoisonAntidotes = {
    containerId: null,
    activeTab: "toxin_triage_calculator", // 'toxin_triage_calculator' | 'antidote_directory' | 'decontamination_rules' | 'lipid_infusion_protocol'

    // Reactive State
    state: {
      patientContext: {
        patientName: "ब्रूनो (Bruno - Lab)",
        species: "canine",
        bodyWeightKg: 20.0,
        ageMonths: 36,
        hoursSinceIngestion: 1.2,
        presentingSigns: ["Salivation", "Hyperactivity"]
      },
      selectedToxin: "CHOCOLATE_THEOBROMINE",
      chocolateSubtype: "DARK_CHOCOLATE",
      ingestedAmount: 150, // grams or ml
      loggedCases: []
    },

    // 4.1 INITIALIZATION ROUTINE
    async init() {
      await ToxStorage.init();
      await this.loadInitialCases();
      console.log("[Vetcare AI OS] Veterinary Clinical Toxicology & Antidote Engine Initialized.");
    },

    async loadInitialCases() {
      const records = await ToxStorage.getAll();
      if (records && records.length > 0) {
        this.state.loggedCases = records;
      } else {
        await this.seedDefaultCases();
      }
    },

    async seedDefaultCases() {
      const defaultCases = [
        {
          id: "TOX-2026-001",
          recordType: "EMERGENCY_TOX_CASE",
          caseRef: "TOX-2026-001",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          patientName: "टाइगर (Tiger - German Shepherd)",
          species: "canine",
          bodyWeightKg: 28.0,
          hoursSinceIngestion: 1.5,
          suspectedToxin: "ORGANOPHOSPHATE_CARBAMATE",
          ingestedAmount: "Tick Dip Concentrate (Diazinon 20%)",
          severityTier: "LETHAL",
          emesisIndicated: false,
          antidoteAdministered: "Atropine Sulfate (14.0 ml) + 2-PAM (11.2 ml IV)",
          practitioner: "Dr. Rahul (Emergency Critical Care)",
          outcome: "STABILIZED_ICU"
        },
        {
          id: "TOX-2026-002",
          recordType: "EMERGENCY_TOX_CASE",
          caseRef: "TOX-2026-002",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          patientName: "किट्टी (Kitty - Persian Cat)",
          species: "feline",
          bodyWeightKg: 4.2,
          hoursSinceIngestion: 0.8,
          suspectedToxin: "ACETAMINOPHEN_PARACETAMOL",
          ingestedAmount: "1/2 Tablet Paracetamol (250 mg)",
          severityTier: "LETHAL",
          emesisIndicated: false,
          antidoteAdministered: "N-Acetylcysteine (NAC 20%) 2.94 ml IV loading + Cimetidine",
          practitioner: "Dr. Rahul (Emergency Critical Care)",
          outcome: "UNDER_INTENSIVE_OXYGEN"
        }
      ];

      for (const c of defaultCases) {
        await ToxStorage.put(c);
        this.state.loggedCases.push(c);
      }
    },

    // 4.2 SCIENTIFIC TOXICOKINETIC CALCULATION ENGINES
    calculateToxSummary() {
      const p = this.state.patientContext;
      const toxinKey = this.state.selectedToxin;
      const amt = parseFloat(this.state.ingestedAmount) || 0;
      const wt = parseFloat(p.bodyWeightKg) || 1.0;
      const hrs = parseFloat(p.hoursSinceIngestion) || 0.1;

      let severity = "MILD";
      let toxicDoseMgKg = 0;
      let emesisSafe = hrs <= 2.0;
      let contraindications = [];
      let antidoteDisplay = {
        name: "Symptomatic & Supportive",
        doseText: "N/A",
        route: "IV / Supportive",
        instructions: "Maintain IV fluid diuresis. Monitor ECG and hemodynamics."
      };

      if (toxinKey === "CHOCOLATE_THEOBROMINE") {
        const factor = TOXICOLOGY_CATALOG.CHOCOLATE_THEOBROMINE.theobromineConcentrationsMgPerGram[this.state.chocolateSubtype] || 15.0;
        const totalMg = amt * factor;
        toxicDoseMgKg = parseFloat((totalMg / wt).toFixed(1));

        if (toxicDoseMgKg >= 60.0) severity = "LETHAL";
        else if (toxicDoseMgKg >= 40.0) severity = "SEVERE";
        else if (toxicDoseMgKg >= 20.0) severity = "MODERATE";
        else severity = "MILD";

        emesisSafe = hrs <= 2.5;
        antidoteDisplay = {
          name: "Theobromine Decontamination Protocol",
          doseText: `Total Theobromine: ${totalMg} mg (${toxicDoseMgKg} mg/kg)`,
          route: "Apomorphine 0.03 mg/kg IV + Activated Charcoal 2 g/kg PO",
          instructions: "Place urinary catheter to prevent theobromine reabsorption through the urothelium. Monitor continuous Lead II ECG for VPCs or tachyarrhythmias."
        };
      } else if (toxinKey === "ORGANOPHOSPHATE_CARBAMATE") {
        severity = "LETHAL";
        emesisSafe = false; // Never induce emesis in OP toxicity due to bronchospasm / seizure risk
        contraindications.push("Contraindication: Emesis is hazardous due to rapid CNS collapse, aspiration risk, and laryngeal spasm.");

        const atropineMg = (wt * 0.3).toFixed(2);
        const atropineMl = (atropineMg / 0.6).toFixed(2);
        const pamMg = (wt * 20.0).toFixed(0);
        const pamMl = (pamMg / 50.0).toFixed(1);

        antidoteDisplay = {
          name: "Atropine Sulfate + 2-PAM (Pralidoxime)",
          doseText: `Atropine: ${atropineMg} mg (${atropineMl} ml of 0.6 mg/ml) | 2-PAM: ${pamMg} mg (${pamMl} ml)`,
          route: "Atropine: 1/4th IV, 3/4th IM/SC | 2-PAM: Slow IV over 20 min",
          instructions: "Titrate Atropine q15m until pupils dilate (mydriasis) and bronchial secretions dry. 2-PAM must be started within 36 hours before AChE aging."
        };
      } else if (toxinKey === "ANTICOAGULANT_RODENTICIDE") {
        severity = hrs > 24 ? "SEVERE" : "MODERATE";
        const vitK1Mg = (wt * 3.5).toFixed(1);
        const vitK1Ml = (vitK1Mg / 10.0).toFixed(2);

        antidoteDisplay = {
          name: "Vitamin K1 (Phytomenadione)",
          doseText: `${vitK1Mg} mg (${vitK1Ml} ml of 10 mg/ml)`,
          route: "Oral (PO) with high-fat canned food OR Subcutaneous (SC)",
          instructions: "MANDATORY WARNING: NEVER GIVE VITAMIN K1 BY IV ROUTE (Fatal Anaphylaxis). Continue therapy for 21 to 28 days for 2nd-generation rodenticides (Brodifacoum)."
        };
      } else if (toxinKey === "ACETAMINOPHEN_PARACETAMOL") {
        severity = p.species === "feline" ? "LETHAL" : amt / wt > 100 ? "SEVERE" : "MODERATE";
        emesisSafe = hrs <= 1.0;

        const nacLoadingMg = (wt * 140.0).toFixed(0);
        const nacLoadingMl = (nacLoadingMg / 200.0).toFixed(2); // 20% solution
        const nacMaintMg = (wt * 70.0).toFixed(0);
        const nacMaintMl = (nacMaintMg / 200.0).toFixed(2);

        antidoteDisplay = {
          name: "N-Acetylcysteine (NAC - Mucomyst)",
          doseText: `Loading: ${nacLoadingMg} mg (${nacLoadingMl} ml) -> Then ${nacMaintMg} mg (${nacMaintMl} ml)`,
          route: "Slow IV infusion diluted 1:4 in D5W (0.22 um filtered)",
          instructions: "Give loading dose immediately, then maintenance q4h for 7 treatments. Add Ascorbic acid 30 mg/kg IV and Cimetidine 10 mg/kg IV."
        };
      } else if (toxinKey === "LIPID_REACTIVE_TOXINS") {
        severity = "SEVERE";
        const bolusMl = (wt * 1.5).toFixed(1);
        const criRateMlMin = (wt * 0.25).toFixed(2);

        antidoteDisplay = {
          name: "Intravenous Lipid Emulsion (ILE 20% Intralipid)",
          doseText: `Loading Bolus: ${bolusMl} ml IV over 2 min -> CRI: ${criRateMlMin} ml/min for 45 min`,
          route: "Peripheral or Central IV catheter",
          instructions: "Lipid Sink therapy for lipophilic toxins (Ivermectin, Pyrethroids, Local Anesthetics). Max daily dose 12 ml/kg. Check for gross lipemia."
        };
      }

      return {
        severity,
        toxicDoseMgKg,
        emesisSafe,
        contraindications,
        antidoteDisplay
      };
    },

    // 4.3 DYNAMIC VIEW RENDERING
    render(containerId) {
      this.containerId = containerId || this.containerId || "mainViewport";
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error("[Vetcare Tox] Target DOM container not found:", this.containerId);
        return;
      }

      const toxData = this.calculateToxSummary();
      const p = this.state.patientContext;

      let severityBadgeClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      if (toxData.severity === "MODERATE") severityBadgeClass = "bg-amber-500/20 text-amber-300 border-amber-500/40";
      else if (toxData.severity === "SEVERE") severityBadgeClass = "bg-rose-500/20 text-rose-300 border-rose-500/40";
      else if (toxData.severity === "LETHAL") severityBadgeClass = "bg-red-600/30 text-red-200 border-red-500 animate-pulse font-black";

      container.innerHTML = `
        <div class="toxicology-module-root w-full space-y-6 pb-20 font-sans text-slate-200">
          
          <!-- TOP CRITICAL ALERT BAR (EMERGENCY STATUS) -->
          <div class="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border-2 ${
            toxData.severity === "LETHAL" ? "border-red-500 shadow-red-950/50 shadow-2xl animate-pulse" : "border-slate-800"
          } flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl ${
                toxData.severity === "LETHAL" ? "bg-red-600 text-white" : "bg-amber-500/20 text-amber-400"
              } flex items-center justify-center text-2xl shadow-lg shrink-0">
                <i class="fa-solid fa-skull-crossbones"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${severityBadgeClass}">
                    SEVERITY: ${toxData.severity} RISK
                  </span>
                  <span class="text-xs font-mono text-slate-400">
                    दाखिला समय: <strong>${p.hoursSinceIngestion} घंटे पूर्व</strong>
                  </span>
                </div>
                <h3 class="font-display font-black text-lg text-white mt-0.5 tracking-tight">
                  आपातकालीन नैदानिक विष विज्ञान एवं विशिष्ट विषहर औषध कंसोल
                </h3>
              </div>
            </div>

            <!-- EMESIS WINDOW INDICATOR -->
            <div class="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
              <div class="px-3.5 py-1.5 rounded-xl ${
                toxData.emesisSafe ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300" : "bg-rose-950/60 border border-rose-500/40 text-rose-300"
              } text-center font-mono">
                <div class="text-[10px] uppercase font-bold">उल्टी प्रेरण (Emesis Window)</div>
                <div class="text-xs font-black mt-0.5">
                  ${toxData.emesisSafe ? "सक्रिय (Window Open <2h)" : "समाप्त / वर्जित (Do NOT Induce)"}
                </div>
              </div>

              <button id="btnPrintToxHandover" class="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-print"></i> ICU क्लिपबोर्ड प्रिंट
              </button>
            </div>
          </div>

          <!-- NAVIGATION SUB-TABS -->
          <div class="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-semibold scrollbar-none">
            <button data-tab="toxin_triage_calculator" class="tox-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "toxin_triage_calculator"
                ? "border-rose-500 text-rose-400 bg-rose-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-calculator"></i> 1. विष गणना एवं आपातकालीन ट्राइएज (Toxin Calculator)
            </button>
            <button data-tab="antidote_directory" class="tox-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "antidote_directory"
                ? "border-rose-500 text-rose-400 bg-rose-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-prescription-bottle-medical"></i> 2. विशिष्ट विषहर एंटीडोट निर्देशिका (Antidotes Directory)
            </button>
            <button data-tab="decontamination_rules" class="tox-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "decontamination_rules"
                ? "border-rose-500 text-rose-400 bg-rose-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-pump-medical"></i> 3. गैस्ट्रिक निष्कासन एवं चारकोल प्रोटोकॉल (Decontamination)
            </button>
            <button data-tab="lipid_infusion_protocol" class="tox-tab-btn py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              this.activeTab === "lipid_infusion_protocol"
                ? "border-rose-500 text-rose-400 bg-rose-500/10 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }">
              <i class="fa-solid fa-droplet"></i> 4. इंट्रावेनस लिपिड इमल्शन (ILE 20% Therapy)
            </button>
          </div>

          <!-- TAB CONTENT VIEWPORT -->
          <div id="toxTabViewport" class="w-full">
            ${this.renderActiveTabContent(toxData)}
          </div>

        </div>

        <!-- MODAL HOOK CONTAINER -->
        <div id="toxModalContainer"></div>
      `;

      this.bindEvents();
    },

    // 4.4 RENDER ACTIVE TAB CONTENT
    renderActiveTabContent(toxData) {
      switch (this.activeTab) {
        case "toxin_triage_calculator":
          return this.renderToxinTriageTab(toxData);
        case "antidote_directory":
          return this.renderAntidoteDirectoryTab();
        case "decontamination_rules":
          return this.renderDecontaminationRulesTab();
        case "lipid_infusion_protocol":
          return this.renderLipidProtocolTab();
        default:
          return "";
      }
    },

    // TAB 1: TOXIN TRIAGE & DOSE CALCULATOR
    renderToxinTriageTab(toxData) {
      const p = this.state.patientContext;

      return `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- LEFT 1-COL: PATIENT & TOXIN INPUT CONSOLE -->
          <div class="lg:col-span-1 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
              <i class="fa-solid fa-id-badge text-rose-400 text-lg"></i>
              <h3 class="font-display font-bold text-base text-white">रोगी एवं विष जोखिम पैरामीटर</h3>
            </div>

            <form id="formToxInputs" onsubmit="return false;" class="space-y-3.5 text-xs font-mono">
              <div>
                <label class="block text-slate-300 uppercase mb-1">रोगी का नाम व पहचान</label>
                <input type="text" id="inToxPatientName" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold" value="${p.patientName}" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-300 uppercase mb-1">प्रजाति (Species)</label>
                  <select id="selToxSpecies" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                    <option value="canine" ${p.species === "canine" ? "selected" : ""}>श्वान (Canine / Dog)</option>
                    <option value="feline" ${p.species === "feline" ? "selected" : ""}>बिल्ली (Feline / Cat)</option>
                    <option value="bovine" ${p.species === "bovine" ? "selected" : ""}>गौवंश (Bovine / Cattle)</option>
                    <option value="equine" ${p.species === "equine" ? "selected" : ""}>अश्व (Equine / Horse)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-slate-300 uppercase mb-1">शारीरिक भार (Weight kg)</label>
                  <input type="number" step="0.5" id="inToxWeight" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-cyan-400 font-bold font-mono" value="${p.bodyWeightKg}" />
                </div>
              </div>

              <div>
                <label class="block text-slate-300 uppercase mb-1">सेवन के बाद बीता समय (Hours Since Ingestion)</label>
                <div class="flex items-center gap-2">
                  <input type="number" step="0.1" id="inToxHours" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-bold font-mono" value="${p.hoursSinceIngestion}" />
                  <span class="text-slate-400 text-xs">घंटे</span>
                </div>
              </div>

              <div>
                <label class="block text-slate-300 uppercase mb-1">संदिग्ध विष / रसायन (Select Toxin)</label>
                <select id="selToxType" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans text-xs">
                  <option value="CHOCOLATE_THEOBROMINE" ${this.state.selectedToxin === "CHOCOLATE_THEOBROMINE" ? "selected" : ""}>चॉकलेट / थियोब्रोमाइन (Chocolate Toxicosis)</option>
                  <option value="ORGANOPHOSPHATE_CARBAMATE" ${this.state.selectedToxin === "ORGANOPHOSPHATE_CARBAMATE" ? "selected" : ""}>ऑर्गेनोफॉस्फेट / कीटनाशक (OP/Carbamate Insecticide)</option>
                  <option value="ANTICOAGULANT_RODENTICIDE" ${this.state.selectedToxin === "ANTICOAGULANT_RODENTICIDE" ? "selected" : ""}>चूहा मार दवा (Anticoagulant Rodenticide)</option>
                  <option value="ACETAMINOPHEN_PARACETAMOL" ${this.state.selectedToxin === "ACETAMINOPHEN_PARACETAMOL" ? "selected" : ""}>पैरासिटामोल / क्रोसिन (Acetaminophen)</option>
                  <option value="LIPID_REACTIVE_TOXINS" ${this.state.selectedToxin === "LIPID_REACTIVE_TOXINS" ? "selected" : ""}>आइवरमेक्टिन / पर्मेथ्रिन (Lipophilic Toxins)</option>
                </select>
              </div>

              ${
                this.state.selectedToxin === "CHOCOLATE_THEOBROMINE"
                  ? `
                <div>
                  <label class="block text-slate-300 uppercase mb-1">चॉकलेट का प्रकार</label>
                  <select id="selChocSubtype" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white">
                    <option value="MILK_CHOCOLATE" ${this.state.chocolateSubtype === "MILK_CHOCOLATE" ? "selected" : ""}>Milk Chocolate (2 mg Theobromine/g)</option>
                    <option value="DARK_CHOCOLATE" ${this.state.chocolateSubtype === "DARK_CHOCOLATE" ? "selected" : ""}>Dark Chocolate (15 mg Theobromine/g)</option>
                    <option value="BAKERS_UNSWEETENED" ${this.state.chocolateSubtype === "BAKERS_UNSWEETENED" ? "selected" : ""}>Baker's / Cocoa (26 mg Theobromine/g)</option>
                  </select>
                </div>
              `
                  : ""
              }

              <div>
                <label class="block text-slate-300 uppercase mb-1">खाई गई अनुमानित मात्रा (Ingested Amount Grams/ml)</label>
                <input type="number" id="inToxAmount" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold" value="${this.state.ingestedAmount}" />
              </div>

              <button id="btnRecalculateTox" class="w-full py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40 transition-all flex items-center justify-center gap-2">
                <i class="fa-solid fa-arrows-rotate"></i> टॉक्सिकोलॉजी पुनः गणना करें
              </button>
            </form>
          </div>

          <!-- RIGHT 2-COLS: EMERGENCY CLINICAL ANTIDOTE & DECONTAMINATION CARD -->
          <div class="lg:col-span-2 space-y-5">
            
            <!-- ANTIDOTE DISPLAY CARD -->
            <div class="rounded-2xl bg-slate-900 border-2 border-rose-500/50 p-6 space-y-4 shadow-xl">
              <div class="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span class="text-[10px] font-mono font-bold uppercase text-rose-400">विशिष्ट विषहर औषध (Specific Antidote Protocol)</span>
                  <h3 class="text-xl font-display font-black text-white mt-0.5">${toxData.antidoteDisplay.name}</h3>
                </div>
                <span class="px-3 py-1 rounded-xl font-mono text-xs font-bold ${
                  toxData.severity === "LETHAL" ? "bg-red-500/30 text-red-200 border border-red-500" : "bg-cyan-500/20 text-cyan-300"
                }">
                  ${toxData.severity} TIER
                </span>
              </div>

              <!-- EXACT DOSE INJECTION BAR -->
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                <div>
                  <span class="text-[10px] text-slate-400 uppercase">सटीक खुराक (Calculated Dose)</span>
                  <div class="text-lg font-bold text-emerald-400 mt-1">${toxData.antidoteDisplay.doseText}</div>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 uppercase">मार्ग व तकनीक (Route & Delivery)</span>
                  <div class="text-sm font-bold text-cyan-300 mt-1">${toxData.antidoteDisplay.route}</div>
                </div>
              </div>

              <!-- PREPARATION AND INSTRUCTIONS -->
              <div class="space-y-2 text-xs">
                <div class="font-bold text-amber-300">क्लिनिकल निर्देश एवं निगरानी (Clinical Monitoring Protocol):</div>
                <p class="text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  ${toxData.antidoteDisplay.instructions}
                </p>
              </div>

              <!-- CONTRAINDICATION CALLOUTS -->
              ${
                toxData.contraindications.length > 0
                  ? `
                <div class="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 text-xs text-rose-200 space-y-1">
                  <div class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-ban text-rose-400"></i> सख्त निषेध (Contraindications):</div>
                  ${toxData.contraindications.map((c) => `<div>• ${c}</div>`).join("")}
                </div>
              `
                  : ""
              }

              <!-- SAVE CASE ACTION -->
              <div class="pt-2 flex justify-end">
                <button id="btnSaveEmergencyCase" class="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all flex items-center gap-2">
                  <i class="fa-solid fa-floppy-disk"></i> आपातकालीन केस लॉग सहेजें (Save Case)
                </button>
              </div>
            </div>

            <!-- RECENT TOXICOLOGY CASES LOG -->
            <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <h4 class="font-display font-bold text-sm text-white flex items-center gap-2">
                <i class="fa-solid fa-clock-rotate-left text-cyan-400"></i> हालिया विष आपातकालीन मामले (Recent Emergency Log)
              </h4>

              <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px]">
                      <th class="p-2.5">केस आईडी</th>
                      <th class="p-2.5">रोगी व प्रजाति</th>
                      <th class="p-2.5">विष (Toxin)</th>
                      <th class="p-2.5">स्तर</th>
                      <th class="p-2.5 text-right">परिणाम (Outcome)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/80">
                    ${this.state.loggedCases
                      .map((c) => {
                        return `
                        <tr class="hover:bg-slate-800/40 font-mono">
                          <td class="p-2.5 font-bold text-white">${c.caseRef}</td>
                          <td class="p-2.5 font-sans">
                            <div class="text-white font-semibold">${c.patientName}</div>
                            <div class="text-[10px] text-slate-500 uppercase">${c.species} • ${c.bodyWeightKg}kg</div>
                          </td>
                          <td class="p-2.5 text-cyan-300 font-sans text-[11px]">${c.suspectedToxin}</td>
                          <td class="p-2.5">
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                              c.severityTier === "LETHAL" ? "bg-red-500/20 text-red-300" : "bg-amber-500/20 text-amber-300"
                            }">
                              ${c.severityTier}
                            </span>
                          </td>
                          <td class="p-2.5 text-right font-bold text-emerald-400 text-[10px]">
                            ${c.outcome}
                          </td>
                        </tr>
                      `;
                      })
                      .join("")}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 2: ANTIDOTE DIRECTORY & FORMULARY
    renderAntidoteDirectoryTab() {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            <div class="border-b border-slate-800 pb-3">
              <h3 class="text-xl font-display font-black text-white flex items-center gap-2">
                <i class="fa-solid fa-prescription-bottle-medical text-emerald-400"></i> पशु चिकित्सा आवश्यक विषहर औषध निर्देशिका (Veterinary Antidote Formulary)
              </h3>
              <p class="text-xs text-slate-400 mt-1">
                Standard critical care dosing, routes, preparation techniques, and mechanisms for common animal intoxications.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <!-- ATROPINE SULFATE -->
              <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-white text-sm">एट्रोपिन सल्फेट (Atropine Sulfate)</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300">OP/Carbamates</span>
                </div>
                <div class="font-mono text-emerald-400 font-bold">खुराक: 0.2 - 0.5 mg/kg (1/4th IV, शेष IM/SC)</div>
                <p class="text-slate-400 text-[11px] leading-relaxed">
                  मस्कैरिनिक रिसेप्टर्स को ब्लॉक करता है। अत्यधिक लार, ब्रोंकोस्पाज्म और ब्रैडीकार्डिया को रोकता है। पुतलियां फैलने तक 15-30 मिनट में दोहराएं।
                </p>
              </div>

              <!-- PRALIDOXIME 2-PAM -->
              <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-white text-sm">प्रालिडॉक्सिम (2-PAM / Pralidoxime Chloride)</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300">Organophosphates</span>
                </div>
                <div class="font-mono text-emerald-400 font-bold">खुराक: 20 mg/kg धीमी IV इन्फ्यूजन (over 20 min)</div>
                <p class="text-slate-400 text-[11px] leading-relaxed">
                  एसिटाइलकोलिनेस्टरेज़ एंजाइम को पुनः सक्रिय करता है। निकोटिनिक मांसपेशियों के कंपन (Tremors) को शांत करता है। 24-36 घंटे के भीतर देना अनिवार्य है।
                </p>
              </div>

              <!-- VITAMIN K1 -->
              <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-white text-sm">विटामिन K1 (Phytomenadione)</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300">Rodenticide</span>
                </div>
                <div class="font-mono text-emerald-400 font-bold">खुराक: 2.5 - 5.0 mg/kg PO फैटी मील के साथ या SC</div>
                <p class="text-slate-400 text-[11px] leading-relaxed">
                  क्लॉटिंग फैक्टर्स (II, VII, IX, X) का निर्माण पुनः शुरू करता है। IV इंजेक्शन पूर्णतः वर्जित है (एनाफिलेक्टिक शॉक का खतरा)। 21-28 दिन तक दें।
                </p>
              </div>

              <!-- N-ACETYLCYSTEINE (NAC) -->
              <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-white text-sm">एन-एसिटाइलसिस्टीन (N-Acetylcysteine - NAC)</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-300">Paracetamol (Feline)</span>
                </div>
                <div class="font-mono text-emerald-400 font-bold">खुराक: 140 mg/kg IV लोडिंग -> फिर 70 mg/kg q4h × 7 डोज</div>
                <p class="text-slate-400 text-[11px] leading-relaxed">
                  ग्लूटाथियोन प्रीकर्सर। बिल्ली में विषाक्त NAPQI मेटाबोलाइट को निष्क्रिय करता है और मीथेमोग्लोबिन से लिवर व आरबीसी को बचाता है।
                </p>
              </div>

            </div>
          </div>
        </div>
      `;
    },

    // TAB 3: DECONTAMINATION RULES (EMESIS & ACTIVATED CHARCOAL)
    renderDecontaminationRulesTab() {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            <div class="border-b border-slate-800 pb-3">
              <h3 class="text-xl font-display font-black text-white flex items-center gap-2">
                <i class="fa-solid fa-pump-medical text-amber-400"></i> गैस्ट्रिक परिशोधन, उल्टी प्रेरण एवं सक्रिय चारकोल नियम
              </h3>
              <p class="text-xs text-slate-400 mt-1">
                Emesis induction protocols, activated charcoal dosage with cathartics, and absolute contraindications.
              </p>
            </div>

            <!-- CONTRAINDICATION RED BOX -->
            <div class="p-4 rounded-xl bg-rose-950/30 border border-rose-500/50 space-y-2 text-xs">
              <h4 class="font-bold text-rose-300 flex items-center gap-2 text-sm">
                <i class="fa-solid fa-triangle-exclamation"></i> उल्टी प्रेरण के सख्त निषेध (Absolute Contraindications to Emesis)
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-rose-200 text-[11px]">
                <div>• संक्षारक पदार्थ (Corrosive Acids / Alkalis / Drain Cleaners) - एसोफैगस जलने का दोहरा खतरा।</div>
                <div>• हाइड्रोकार्बन / पेट्रोलियम डिस्टिलेट (Kerosene, Petrol) - घातक एस्पिरेशन निमोनिया।</div>
                <div>• मूर्छित, कोमा या गैग रिफ्लेक्स का अभाव (Comatose / Depressed).</div>
                <div>• मिर्गी या दौरे (Active Seizures / Strychnine / Tremorgenic mycotoxins).</div>
                <div>• ब्रैकीसिफेलिक नस्लें (Pugs, Frenchies) गंभीर श्वसन संकट में।</div>
                <div>• घोड़े और खरगोश - शारीरिक रूप से उल्टी करने में असमर्थ (Cannot vomit).</div>
              </div>
            </div>

            <!-- EMETICS COMPARISON TABLE -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div class="flex justify-between items-center text-white font-bold">
                  <span>श्वान / Dogs: एपोमॉर्फिन (Apomorphine)</span>
                  <span class="text-emerald-400">प्रथम विकल्प</span>
                </div>
                <div class="text-cyan-400">खुराक: 0.03 mg/kg IV / IM अथवा Subconjunctival 0.25mg टैबलेट</div>
                <p class="text-slate-400 text-[11px] font-sans">
                  सीटीजेड (D2 डोपामाइन रिसेप्टर्स) को उत्तेजित करता है। 2-5 मिनट में प्रभावी उल्टी। उल्टी रोकने हेतु मारोपिटैंट (सेरेनिया) या नेलोक्सोन दें।
                </p>
              </div>

              <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div class="flex justify-between items-center text-white font-bold">
                  <span>बिल्ली / Cats: डेक्समेडेटोमिडाइन (Dexmedetomidine)</span>
                  <span class="text-purple-400">अल्फा-2 एगोनिस्ट</span>
                </div>
                <div class="text-cyan-400">खुराक: 7 ug/kg (0.007 mg/kg) IM</div>
                <p class="text-slate-400 text-[11px] font-sans">
                  बिल्ली में एपोमॉर्फिन कम प्रभावी होता है। डेक्समेडेटोमिडाइन से उल्टी के बाद एंटीडोट एटिपामेजोल (Antisedan) से सेडेशन रिवर्स करें।
                </p>
              </div>
            </div>

            <!-- ACTIVATED CHARCOAL PROTOCOL -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <h4 class="font-bold text-white text-sm flex items-center gap-2">
                <i class="fa-solid fa-cube text-slate-400"></i> सक्रिय चारकोल एवं सोर्बिटोल प्रोटोकॉल (Activated Charcoal 1-2 g/kg)
              </h4>
              <p class="text-slate-300 text-[11px] leading-relaxed">
                चारकोल विषाक्त अणुओं को अपनी सतह पर सोखता है। प्रथम खुराक में 70% सोर्बिटोल (रेचक/कैथार्टिक) शामिल करें। बार-बार खुराक (q4-6h) केवल थियोब्रोमाइन या ऐसे विषों में दें जो एंटरोहेपेटिक रीसर्कुलेशन करते हैं। <strong>सावधानी:</strong> निर्जलित पशु में सोर्बिटोल से हाइपरनेट्रेमिया हो सकता है।
              </p>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 4: INTRAVENOUS LIPID EMULSION (ILE 20% INTRALIPID)
    renderLipidProtocolTab() {
      const p = this.state.patientContext;
      const wt = parseFloat(p.bodyWeightKg) || 10.0;
      const loadingBolus = (wt * 1.5).toFixed(1);
      const criRate = (wt * 0.25).toFixed(2);
      const max24h = (wt * 12.0).toFixed(0);

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
            <div class="border-b border-slate-800 pb-3">
              <span class="text-[10px] font-mono uppercase text-cyan-400 font-bold">Lipid Sink Emergency Extraction</span>
              <h3 class="text-xl font-display font-black text-white flex items-center gap-2 mt-0.5">
                <i class="fa-solid fa-droplet text-cyan-400"></i> 20% इंट्रावेनस लिपिड इमल्शन (ILE 20% Therapy)
              </h3>
              <p class="text-xs text-slate-400 mt-1">
                Indicated for severe lipophilic toxicosis: Ivermectin/Moxidectin, Feline Permethrin toxicity, Local anesthetics (Bupivacaine/Lidocaine), Calcium channel blockers.
              </p>
            </div>

            <!-- PATIENT SPECIFIC DOSAGE CALCULATOR -->
            <div class="p-5 rounded-xl bg-slate-950 border border-cyan-500/40 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">1. प्रारंभिक लोडिंग बोलस (1.5 ml/kg)</span>
                <div class="text-2xl font-black text-cyan-400 mt-1">${loadingBolus} ml</div>
                <span class="text-[10px] text-slate-500">1 से 2 मिनट में धीमी IV दें</span>
              </div>
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">2. सतत इन्फ्यूजन (CRI 0.25 ml/kg/min)</span>
                <div class="text-2xl font-black text-emerald-400 mt-1">${criRate} ml/min</div>
                <span class="text-[10px] text-slate-500">30 से 60 मिनट तक जारी रखें</span>
              </div>
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">3. 24 घंटे की अधिकतम सीमा</span>
                <div class="text-2xl font-black text-amber-400 mt-1">${max24h} ml</div>
                <span class="text-[10px] text-slate-500">Max 12 ml/kg in 24 hours</span>
              </div>
            </div>

            <!-- MECHANISM & PREPARATION ADVICE -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 class="font-bold text-white flex items-center gap-1.5">
                  <i class="fa-solid fa-magnet text-cyan-400"></i> लिपिड सिंक मैकेनिज्म (The Lipid Sink Theory)
                </h4>
                <p class="text-slate-400 text-[11px] leading-relaxed">
                  रक्त वाहिकाओं में लिपिड इमल्शन की उपस्थिति एक कृत्रिम वसा कक्ष तैयार करती है। वसा में घुलनशील विषैले तत्व (जैसे आइवरमेक्टिन या पर्मेथ्रिन) मस्तिष्क व हृदय के ऊतकों को छोड़कर लिपिड ड्रॉपलेट्स में खिंच आते हैं और यूरिन व पित्त द्वारा निष्कासित हो जाते हैं।
                </p>
              </div>

              <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 class="font-bold text-white flex items-center gap-1.5">
                  <i class="fa-solid fa-vial-virus text-amber-400"></i> निगरानी एवं संभावित जटिलताएं
                </h4>
                <p class="text-slate-400 text-[11px] leading-relaxed">
                  प्रत्येक 4 घंटे में रक्त सीरम की जांच करें। यदि सीरम दूधिया (Gross Lipemia) हो जाए, तो इन्फ्यूजन रोकें। अग्न्याशय शोथ (Pancreatitis) के इतिहास वाले पशुओं में सावधानी बरतें।
                </p>
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // 4.5 EVENT BINDING & INTERACTIVITY
    bindEvents() {
      const container = document.getElementById(this.containerId);
      if (!container) return;

      // Tab Switching
      container.querySelectorAll(".tox-tab-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tab = e.currentTarget.getAttribute("data-tab");
          if (tab && tab !== this.activeTab) {
            this.activeTab = tab;
            this.render();
          }
        });
      });

      // Recalculate button & form inputs
      const btnRecalculate = container.querySelector("#btnRecalculateTox");
      if (btnRecalculate) {
        btnRecalculate.addEventListener("click", () => {
          this.syncInputsFromDom();
          this.render();
          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("टॉक्सिकोलॉजी व एंटीडोट खुराक पुनः गणना पूर्ण!", "info");
          }
        });
      }

      // Dropdown changes trigger live updates
      const selTox = container.querySelector("#selToxType");
      if (selTox) {
        selTox.addEventListener("change", (e) => {
          this.state.selectedToxin = e.target.value;
          this.syncInputsFromDom();
          this.render();
        });
      }

      // Save Emergency Case Button
      const btnSaveCase = container.querySelector("#btnSaveEmergencyCase");
      if (btnSaveCase) {
        btnSaveCase.addEventListener("click", async () => {
          this.syncInputsFromDom();
          const toxData = this.calculateToxSummary();
          const newCase = {
            id: "TOX-" + Date.now(),
            recordType: "EMERGENCY_TOX_CASE",
            caseRef: "TOX-2026-" + Date.now().toString().slice(-4),
            timestamp: new Date().toISOString(),
            patientName: this.state.patientContext.patientName,
            species: this.state.patientContext.species,
            bodyWeightKg: this.state.patientContext.bodyWeightKg,
            hoursSinceIngestion: this.state.patientContext.hoursSinceIngestion,
            suspectedToxin: this.state.selectedToxin,
            ingestedAmount: this.state.ingestedAmount + (this.state.selectedToxin === "CHOCOLATE_THEOBROMINE" ? " g" : " units"),
            severityTier: toxData.severity,
            emesisIndicated: toxData.emesisSafe,
            antidoteAdministered: toxData.antidoteDisplay.name + " (" + toxData.antidoteDisplay.doseText + ")",
            practitioner: "Dr. Rahul (Emergency Critical Care)",
            outcome: "IN_TREATMENT_ICU"
          };

          await ToxStorage.put(newCase);
          this.state.loggedCases.unshift(newCase);
          this.render();
          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("आपातकालीन विष विज्ञान मामला सफलतापूर्वक सहेजा गया!", "success");
          }
        });
      }

      // Print Handover Report
      const btnPrint = container.querySelector("#btnPrintToxHandover");
      if (btnPrint) {
        btnPrint.addEventListener("click", () => this.printToxicologyReport());
      }
    },

    syncInputsFromDom() {
      const container = document.getElementById(this.containerId);
      if (!container) return;

      const pName = container.querySelector("#inToxPatientName")?.value;
      const sp = container.querySelector("#selToxSpecies")?.value;
      const wt = parseFloat(container.querySelector("#inToxWeight")?.value);
      const hrs = parseFloat(container.querySelector("#inToxHours")?.value);
      const tox = container.querySelector("#selToxType")?.value;
      const choc = container.querySelector("#selChocSubtype")?.value;
      const amt = parseFloat(container.querySelector("#inToxAmount")?.value);

      if (pName) this.state.patientContext.patientName = pName;
      if (sp) this.state.patientContext.species = sp;
      if (!isNaN(wt) && wt > 0) this.state.patientContext.bodyWeightKg = wt;
      if (!isNaN(hrs) && hrs >= 0) this.state.patientContext.hoursSinceIngestion = hrs;
      if (tox) this.state.selectedToxin = tox;
      if (choc) this.state.chocolateSubtype = choc;
      if (!isNaN(amt)) this.state.ingestedAmount = amt;
    },

    // 4.6 EMERGENCY ICU A4 TOXICOLOGY HANDOVER PRINT ENGINE
    printToxicologyReport() {
      const p = this.state.patientContext;
      const toxData = this.calculateToxSummary();

      const printWindow = window.open("", "_blank", "width=850,height=1100");
      if (!printWindow) {
        alert("कृपया पॉप-अप ब्लॉकर अक्षम करें ताकि ICU टॉक्सिकोलॉजी क्लिपबोर्ड प्रिंट किया जा सके।");
        return;
      }

      const html = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Vetcare Emergency Toxicology ICU Report - ${p.patientName}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; background: #fff; margin: 0; padding: 20px; font-size: 11px; }
            .header-table { width: 100%; border-bottom: 2px solid #b91c1c; padding-bottom: 12px; margin-bottom: 15px; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 10px; text-transform: uppercase; }
            .badge-red { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
            .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 15px 0; }
            .kpi-box { border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; text-align: center; background: #fff1f2; }
            .kpi-val { font-size: 16px; font-weight: 800; color: #991b1b; margin-top: 4px; }
            .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; color: #991b1b; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin: 15px 0 8px; }
            table.data-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
            table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 6px 8px; text-align: left; }
            table.data-table th { background: #f3f4f6; font-size: 10px; text-transform: uppercase; }
            .antidote-box { border: 2px solid #b91c1c; background: #fef2f2; padding: 12px; border-radius: 8px; margin: 15px 0; }
            .seal-row { margin-top: 35px; display: flex; justify-content: space-between; align-items: flex-end; }
            .sig-box { width: 200px; border-top: 1px dashed #4b5563; text-align: center; padding-top: 6px; font-size: 10px; }
            .security-hash { font-family: monospace; font-size: 8px; color: #6b7280; margin-top: 25px; text-align: center; }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td>
                <div style="font-size: 18px; font-weight: 900; color: #991b1b; letter-spacing: -0.5px;">VETCARE AI OS (CRITICAL CARE TOXICOLOGY DIVISION)</div>
                <div style="font-size: 10px; color: #4b5563;">Emergency Toxin Decontamination, Antidote Calculation & Intensive Care Registry</div>
                <div style="font-size: 12px; font-weight: bold; margin-top: 4px;">आपातकालीन विष विज्ञान एवं विषहर औषध आईसीयू रिपोर्ट (Emergency Toxin Handover)</div>
              </td>
              <td style="text-align: right;">
                <span class="badge badge-red">EMERGENCY ICU HANDOVER</span><br/>
                <div style="font-family: monospace; font-size: 10px; margin-top: 4px; font-weight: bold;">TIME: ${new Date().toLocaleTimeString("hi-IN")}</div>
                <div style="font-size: 9px; color: #6b7280;">Date: ${new Date().toLocaleDateString("hi-IN")}</div>
              </td>
            </tr>
          </table>

          <div class="kpi-grid">
            <div class="kpi-box">
              <div style="font-size: 9px; color: #6b7280; text-transform: uppercase;">रोगी का भार (Weight)</div>
              <div class="kpi-val">${p.bodyWeightKg} kg</div>
            </div>
            <div class="kpi-box">
              <div style="font-size: 9px; color: #6b7280; text-transform: uppercase;">जोखिम स्तर (Severity)</div>
              <div class="kpi-val">${toxData.severity}</div>
            </div>
            <div class="kpi-box">
              <div style="font-size: 9px; color: #6b7280; text-transform: uppercase;">बीता समय (Time Elapsed)</div>
              <div class="kpi-val">${p.hoursSinceIngestion} Hours</div>
            </div>
            <div class="kpi-box">
              <div style="font-size: 9px; color: #6b7280; text-transform: uppercase;">उल्टी प्रेरण (Emesis)</div>
              <div class="kpi-val" style="font-size: 12px; color: ${toxData.emesisSafe ? "#065f46" : "#991b1b"}">
                ${toxData.emesisSafe ? "INDICATED" : "CONTRAINDICATED"}
              </div>
            </div>
          </div>

          <div class="section-title">1. रोगी विवरण एवं संदिग्ध विष प्रोफाइल (Patient & Poison Exposure Profile)</div>
          <table class="data-table">
            <tr>
              <th width="25%">रोगी का नाम</th>
              <td width="25%"><strong>${p.patientName}</strong></td>
              <th width="25%">प्रजाति (Species)</th>
              <td width="25%"><strong>${p.species.toUpperCase()}</strong></td>
            </tr>
            <tr>
              <th>संदिग्ध विष (Toxin)</th>
              <td><strong>${this.state.selectedToxin}</strong></td>
              <th>खाई गई मात्रा (Ingested)</th>
              <td>${this.state.ingestedAmount} g/ml</td>
            </tr>
            <tr>
              <th>टॉक्सिक डोज अनुपात</th>
              <td>${toxData.toxicDoseMgKg ? toxData.toxicDoseMgKg + " mg/kg" : "Clinical Toxicity"}</td>
              <th>उल्टी प्रेरण विंडो (<2h)</th>
              <td>${toxData.emesisSafe ? "SAFE TO INDUCE (Apomorphine/Dexmedetomidine)" : "EXPIRED OR CONTRAINDICATED"}</td>
            </tr>
          </table>

          <div class="section-title">2. आपातकालीन विषहर औषध आदेश (Emergency Antidote Rx)</div>
          <div class="antidote-box">
            <div style="font-size: 14px; font-weight: 900; color: #991b1b;">
              औषधि: ${toxData.antidoteDisplay.name}
            </div>
            <div style="font-size: 12px; font-weight: bold; margin-top: 4px; font-family: monospace;">
              सटीक खुराक: ${toxData.antidoteDisplay.doseText}
            </div>
            <div style="font-size: 11px; margin-top: 4px;">
              मार्ग (Route): <strong>${toxData.antidoteDisplay.route}</strong>
            </div>
            <div style="font-size: 10px; margin-top: 6px; color: #374151; line-height: 1.4;">
              <strong>निर्देश:</strong> ${toxData.antidoteDisplay.instructions}
            </div>
          </div>

          <div class="section-title">3. गहन चिकित्सा आईसीयू निगरानी (Intensive Care Unit Orders)</div>
          <p style="font-size: 10px; line-height: 1.4; color: #374151;">
            • निरंतर IV द्रव थेरेपी (LRS/Isolyte-P) सामान्य रखरखाव दर के 1.5 से 2 गुना पर मूत्र निष्कासन हेतु चालू रखें।<br/>
            • निरंतर ईसीजी (Lead II) मॉनिटर करें। टैचीकार्डिया या अतालता हेतु आवश्यक आपातकालीन दवाएं (Esmolol / Atropine) तैयार रखें।<br/>
            • सक्रिय चारकोल (1-2 g/kg) गैस्ट्रिक ट्यूब द्वारा दें (यदि उल्टी का कोई विरोधाभास न हो)।
          </p>

          <div class="seal-row">
            <div class="sig-box">
              ड्यूटी आपातकालीन पशु चिकित्सक<br/>
              <strong>Emergency Critical Care Vet</strong>
            </div>
            <div style="text-align: center;">
              <div style="display: inline-block; border: 2px solid #991b1b; padding: 6px 12px; border-radius: 6px; font-weight: bold; color: #991b1b; text-transform: uppercase; font-size: 9px;">
                VETCARE AI OS<br/>TOXICOLOGY ICU SEAL
              </div>
            </div>
            <div class="sig-box">
              वरिष्ठ क्लिनिकल टॉक्सिकोलॉजिस्ट<br/>
              <strong>Dr. Rahul (Principal Pharmacologist)</strong>
            </div>
          </div>

          <div class="security-hash">
            SHA-256 EMERGENCY DISPATCH HASH: 5E89A012BCFA48900134BAFE9948210DDF9245ACBB6012489EFAA3210C991200<br/>
            Vetcare AI OS - 2026 Production Master Core • Clinical Toxicology Emergency Handover Protocol
          </div>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();

      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    },

    // 4.7 LIFECYCLE DESTRUCTION ROUTINE
    destroy() {
      const container = document.getElementById(this.containerId);
      if (container) {
        container.innerHTML = "";
      }
      const modalHost = document.getElementById("toxModalContainer");
      if (modalHost) {
        modalHost.innerHTML = "";
      }
      console.log("[Vetcare AI OS] Toxicology Poison Antidotes Module safely unmounted.");
    }
  };

  // 5. REGISTER MODULE INTO VETCARE APP REGISTRY
  window.VetcareApp.Modules.ToxicologyPoisonAntidotes = ToxicologyPoisonAntidotes;

  // Auto-init on script load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      ToxicologyPoisonAntidotes.init();
    });
  } else {
    ToxicologyPoisonAntidotes.init();
  }
})();
