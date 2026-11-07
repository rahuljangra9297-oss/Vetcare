// Vetcare AI OS - Veterinary Necropsy, Pathognomonic Lesions & Forensic PM Reporting Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE REGISTRATION & ARCHITECTURAL ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // Clinical Reference Database: Pathognomonic Lesions, Toxicological Rules & Forensic Protocols
  window.VetcareApp.ClinicalData.PostMortemPathology = {
    ANTHRAX_SAFETY_RULES: {
      etiology: 'Bacillus anthracis (Spore-forming Gram-positive rod)',
      cardinalSigns: [
        'Sudden peracute death without prior disease signs',
        'Absence or incomplete development of rigor mortis',
        'Incomplete clotting of blood; dark, tarry blood exuding from natural orifices (mouth, nostrils, anus, vulva)',
        'Rapid post-mortem carcass bloat and decomposition'
      ],
      mandatoryAction: 'STRICTLY PROHIBIT INCISION OF CARCASS. Sporulation occurs in presence of atmospheric oxygen, contaminating soil for 60+ years.',
      diagnosticSmear: 'Aseptic peripheral blood collection from ear tip vein. Prepare thin smear, heat-fix, and stain with Polychrome Methylene Blue for M\'Fadyean capsule reaction (pink-purple capsules around blue truncated bacilli).',
      disposalProtocol: 'Excavate 2.5-meter (8-foot) pit, deposit carcass intact without skinning, cover with minimum 200 kg unslaked quicklime (CaO), backfill and seal with fencing.'
    },

    PATHOGNOMONIC_REFERENCE: [
      {
        disease: 'Anthrax (प्लीहा ज्वर / संक्रामक गिल्टी)',
        pathogen: 'Bacillus anthracis',
        species: 'Bovine, Ovine, Caprine, Equine',
        lesions: 'Enlarged "blackberry-jam" diffluent spleen (spleenomegaly), dark uncoagulated tarry blood, absence of rigor mortis, extensive subcutaneous serosanguinous extravasation.',
        specimenRules: 'Peripheral ear vein blood smear only. NEVER open carcass.'
      },
      {
        disease: 'Haemorrhagic Septicaemia (गलघोंटू / HS)',
        pathogen: 'Pasteurella multocida (B:2 / E:2)',
        species: 'Bovine (Buffaloes acutely sensitive)',
        lesions: 'Severe gelatinous serofibrinous straw-colored oedema of throat, brisket, and intermandibular space; acute petechiae on epicardium; severe consolidation of apical lung lobes; swollen congested retropharyngeal lymph nodes.',
        specimenRules: 'Heart blood swab, tracheal exudate, intact spleen/lung sample on ice.'
      },
      {
        disease: 'Blackquarter (लंगड़ा बुखार / BQ)',
        pathogen: 'Clostridium chauvoei',
        species: 'Bovine (Cattle 6-24 months)',
        lesions: 'Gaseous crepitating dark-brown to black ischemic muscle swelling (gluteal, shoulder or lumbar), spongy porous muscle texture exuding characteristic rancid-butter (butyric acid) odor, serofibrinous pericarditis.',
        specimenRules: 'Affected necrotic muscle blocks in 10% Neutral Buffered Formalin and sterile cold vials.'
      },
      {
        disease: 'Enterotoxaemia (फड़किया / Pulpy Kidney)',
        pathogen: 'Clostridium perfringens Type D (Epsilon toxin)',
        species: 'Ovine, Caprine',
        lesions: 'Soft, pulpy, liquefied kidneys within 2-4 hours post-death; severe pericardial effusion with gelatinous fibrin clots; congestion and ulceration of abomasal and intestinal mucosa (subendocardial haemorrhages).',
        specimenRules: 'Ileal loop tied at both ends containing contents; urine sample (positive for glucosuria).'
      },
      {
        disease: 'Bovine Babesiosis (चिचड़ी बुखार / Redwater)',
        pathogen: 'Babesia bigemina / B. bovis',
        species: 'Bovine',
        lesions: 'Severe jaundice/icterus across adipose tissue and mucous membranes; port-wine colored urine in distended urinary bladder (haemoglobinuria); enormously enlarged friable liver with saffron-yellow hue; splenomegaly.',
        specimenRules: 'Thin blood smears from peripheral capillaries, kidney impression smears, brain squash smear.'
      },
      {
        disease: 'Prussic Acid / Cyanide Poisoning (धतूरा / ज्वार चरचरी)',
        pathogen: 'Hydrocyanic Acid (HCN) from immature Sorghum',
        species: 'All herbivores',
        lesions: 'Bright "cherry-red" coloration of venous and arterial blood; bitter-almond aroma when opening rumen paunch; congestion of internal viscera without clotting defects.',
        specimenRules: 'Rumen contents preserved in 1% mercuric chloride or immediate refrigerated sealed glass bottle.'
      },
      {
        disease: 'Nitrate / Nitrite Poisoning',
        pathogen: 'Nitrite accumulation in rumen reducing Hb to Met-Hb',
        species: 'Bovine, Ovine',
        lesions: 'Distinct "chocolate-brown" colored blood that fails to redden upon prolonged atmospheric oxygen exposure; petechiae on serous membranes.',
        specimenRules: 'Whole blood in heparin, eyeball aqueous humor on sterile cold pack.'
      },
      {
        disease: 'Organophosphate Pesticide Toxicity',
        pathogen: 'Cholinesterase inhibitor insecticides',
        species: 'All livestock',
        lesions: 'Intense pulmonary congestion and foamy exudate filling trachea; pronounced cyanosis; pinpoint miosis (if examined early); garlic-like chemical odor in rumen/abomasal contents.',
        specimenRules: 'Stomach contents in Rectified Spirit, liver and kidney in Saturated Salt Solution.'
      }
    ],

    VISCERA_PRESERVATIVES: {
      'Rectified Spirit (Pure Alcohol)': {
        suitability: 'General chemical toxicology, alkaloids, organophosphates, glycosides, and plant poisons.',
        contraindication: 'DO NOT USE if suspected poisoning by Alcohol, Ethanol, Methanol, Chloroform, Phosphorus, or Phenol.',
        rules: 'Use 95% pure rectified spirit; submit an unadulterated sample of spirit in a separate bottle as control.'
      },
      'Saturated Salt Solution (NaCl)': {
        suitability: 'Metallic poisons (Arsenic, Lead, Copper, Mercury, Zinc), Acid/Alkali ingestion, Phosphorus, and suspected Alcohol poisoning.',
        contraindication: 'Not ideal for delicate plant alkaloids and complex synthetic neurotoxins.',
        rules: 'Dissolve pure table salt in boiled cooled water until crystals remain undissolved at bottom.'
      },
      '10% Neutral Buffered Formalin (NBF)': {
        suitability: 'Histopathological microscopic examination of biopsy and necropsy tissues.',
        contraindication: 'STRICTLY PROHIBITED for chemical or toxicological forensic analysis (destroys poisons).',
        rules: '10:1 ratio of formalin volume to tissue thickness. Tissue sections must not exceed 5mm thickness for rapid penetration.'
      },
      'Sterile Cold Chain (No Chemical)': {
        suitability: 'Microbiological isolation, bacterial culturing, viral PCR assays, rabies brain smears, and serology.',
        contraindication: 'Cannot prevent autolysis at room temperature beyond 6 hours.',
        rules: 'Triple-layer packaging with frozen ice-gel packs maintaining 2°C - 4°C during transit to Diagnostic Laboratory.'
      }
    },

    FORENSIC_BOTTLE_REGIMEN: [
      {
        bottleNo: 'Bottle 1 (Stomach Contents)',
        contents: 'Rumen contents (approx 500g) + Ligated 30cm section of loop of small intestines with contents intact.',
        preservative: 'Rectified Spirit (or Saturated NaCl if phosphorus/alcohol suspected)',
        label: 'GASTROINTESTINAL CONTENTS FOR TOXICOLOGICAL SCREENING'
      },
      {
        bottleNo: 'Bottle 2 (Parenchymatous Organs)',
        contents: 'Pieces of Liver (minimum 500g) including intact Gallbladder + Half of each Kidney + Spleen wedge.',
        preservative: 'Rectified Spirit (or Saturated NaCl)',
        label: 'METABOLIC & EXCRETORY ORGANS'
      },
      {
        bottleNo: 'Bottle 3 (Blood & Heart)',
        contents: 'Clotted/Liquid Heart Blood (minimum 20-50 ml) + Wedge of Heart muscle + Lung specimen.',
        preservative: 'Rectified Spirit or Saturated NaCl Solution',
        label: 'HAEMATOLOGICAL & CARDIO-PULMONARY TISSUE'
      },
      {
        bottleNo: 'Bottle 4 (Preservative Control)',
        contents: 'Approx 100ml of identical pure preservative batch used in Bottles 1, 2, and 3 without any tissue.',
        preservative: 'Pure Preservative Blank',
        label: 'BLANK CONTROL SAMPLE FOR FORENSIC CHEMICAL EXCLUSION'
      }
    ]
  };

  // 2. INTERNAL STATE MANAGEMENT
  const State = {
    activeTab: 'new_pm_exam',
    containerElement: null,
    dbInstance: null,
    listenersBound: false,
    allCases: [],

    // Active Investigation Record Form State
    activeCase: {
      caseNo: 'PM-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
      animalTag: '',
      species: 'Bovine',
      breed: '',
      age: '',
      sex: 'Female',
      ownerName: '',
      ownerAddress: '',
      deathDateTime: '',
      pmDateTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      policeCaseOrInsurance: false,
      policeStation: '',
      firNo: '',
      policeConstableDetails: '',
      insuranceCompany: '',
      policyNo: '',
      sumInsured: '',
      suspectedCause: '',

      // External Examination Findings
      externalExamination: {
        rigorMortis: 'PRESENT',
        naturalOrificesDischarge: 'NONE',
        customDischargeNotes: '',
        bodyConditionScore: '3',
        conjunctiva: 'Normal Pink',
        visibleMucosa: 'Intact, no lesions',
        postMortemHypostasis: 'Observed on dependent side',
        skinLesions: 'No lacerations, no subcutaneous swellings',
        bloatSeverity: 'Mild post-mortem gas',
        externalParasites: 'Nil detected'
      },

      // Internal Organ Findings
      internalOrganFindings: {
        subcutis: 'Normal glistening yellowish-white fat, no haemorrhages',
        peritoneum: 'Smooth, glistening, normal straw-colored peritoneal fluid (<100ml)',
        rumenReticulum: 'Filled with normal semi-solid ingesta, normal ruminal microflora aroma',
        abomasumOmasum: 'Mucosa smooth, folded, no petechiae or abomasal ulcerations',
        intestinesMesentery: 'Mucosa intact, mesenteric lymph nodes normal, no congestion',
        liverGallbladder: 'Normal mahogany color, sharp edges, gallbladder distended with bile',
        spleen: 'Normal size, firm capsule, no softening or pulp liquefaction',
        kidneysUrinaryBladder: 'Capsule strips easily, cortico-medullary junction sharp, bladder containing clear urine',
        heartPericardium: 'Pericardial sac contains minimal clear fluid, no subendocardial petechiae',
        lungsTrachea: 'Spongy pink, crepitant, no foam or froth in trachea or main bronchi',
        brainMeninges: 'Normal vascularization, no subdural haemorrhage, no congestion'
      },

      // Viscera Preservation & Chain of Custody
      visceraPreservation: {
        visceraPreserved: false,
        preservativeUsed: 'Rectified Spirit (Pure Alcohol)',
        sealNo: 'VET-SEAL-' + Math.floor(100000 + Math.random() * 900000),
        dispatchLab: 'Regional Disease Diagnostic Laboratory (RDDL) / State Forensic Lab',
        courierOrConstableName: '',
        bottle1Contents: 'Rumen contents + loop of small intestine',
        bottle2Contents: 'Liver + Gallbladder + Kidney pieces',
        bottle3Contents: 'Heart blood + Spleen wedge',
        bottle4Control: '100ml pure preservative batch sample'
      },

      // Pathologist Final Verdict
      pathologistVerdict: {
        primaryCauseOfDeath: '',
        secondaryFindings: '',
        anthraxExcluded: true,
        opinionSummary: '',
        legalRemarks: 'Post-mortem examination conducted strictly in accordance with State Veterinary Forensic Protocol.',
        pathologistName: 'Dr. Rahul Sharma',
        qualification: 'B.V.Sc & A.H., M.V.Sc (Veterinary Pathology)',
        registrationNo: 'VCI-REG-2018-9941',
        veterinaryHospital: 'Civil Veterinary Hospital & Forensic Polyclinic',
        dateOfVerdict: new Date().toISOString().split('T')[0]
      }
    }
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE WITH LOCALSTORAGE FALLBACK)
  const StorageAdapter = {
    DB_NAME: 'VetcareForensicsDB',
    DB_VERSION: 1,
    STORE_NAME: 'postmortem_records',

    async initDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[ForensicsEngine] IndexedDB unavailable, using LocalStorage.');
          resolve(null);
          return;
        }

        const request = window.indexedDB.open(StorageAdapter.DB_NAME, StorageAdapter.DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(StorageAdapter.STORE_NAME)) {
            db.createObjectStore(StorageAdapter.STORE_NAME, { keyPath: 'caseNo' });
          }
        };

        request.onsuccess = (event) => {
          State.dbInstance = event.target.result;
          resolve(State.dbInstance);
        };

        request.onerror = (event) => {
          console.error('[ForensicsEngine] IndexedDB Open Error:', event.target.error);
          resolve(null);
        };
      });
    },

    async saveCase(record) {
      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readwrite');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            store.put(record);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => {
              StorageAdapter.saveToLocalStorage(record);
              resolve(true);
            };
          } catch (e) {
            StorageAdapter.saveToLocalStorage(record);
            resolve(true);
          }
        });
      } else {
        StorageAdapter.saveToLocalStorage(record);
        return Promise.resolve(true);
      }
    },

    saveToLocalStorage(record) {
      let records = [];
      try {
        const raw = localStorage.getItem('VETCARE_PM_CASES');
        records = raw ? JSON.parse(raw) : [];
      } catch (e) {
        records = [];
      }
      const existingIndex = records.findIndex(r => r.caseNo === record.caseNo);
      if (existingIndex >= 0) {
        records[existingIndex] = record;
      } else {
        records.unshift(record);
      }
      localStorage.setItem('VETCARE_PM_CASES', JSON.stringify(records));
    },

    async loadAllCases() {
      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readonly');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            const req = store.getAll();
            req.onsuccess = () => {
              let list = req.result || [];
              if (list.length === 0) {
                list = StorageAdapter.loadFromLocalStorage();
              }
              resolve(list);
            };
            req.onerror = () => {
              resolve(StorageAdapter.loadFromLocalStorage());
            };
          } catch (e) {
            resolve(StorageAdapter.loadFromLocalStorage());
          }
        });
      } else {
        return Promise.resolve(StorageAdapter.loadFromLocalStorage());
      }
    },

    loadFromLocalStorage() {
      try {
        const raw = localStorage.getItem('VETCARE_PM_CASES');
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }
  };

  // 4. ANTHRAX HARD-STOP SAFETY ENGINE
  const AnthraxSafetyEngine = {
    // Evaluates whether current symptoms trigger immediate bio-hazard lock
    evaluateAnthraxRisk(extExam, suspectedCause) {
      const notes = ((extExam.customDischargeNotes || '') + ' ' + (suspectedCause || '')).toLowerCase();
      const dischargeType = extExam.naturalOrificesDischarge || '';
      const rigor = extExam.rigorMortis;

      const hasTarryBlood = dischargeType === 'TARRY_BLOOD' ||
        notes.includes('tarry') ||
        notes.includes('uncoagulated') ||
        notes.includes('काले रंग का रक्त') ||
        notes.includes('रक्तस्राव') ||
        notes.includes('dark blood');

      const isRigorAbsent = rigor === 'ABSENT';
      const isSuddenDeath = notes.includes('sudden') || notes.includes('अचानक') || notes.includes('immediate');

      // High hazard alert if tarry blood is present AND rigor mortis is absent
      if (hasTarryBlood && isRigorAbsent) {
        return {
          isBiohazardTriggered: true,
          severity: 'CRITICAL_BIOHAZARD',
          reason: 'प्राकृतिक छिद्रों से बिना जमा हुआ काला/डार्क रक्त एवं अकड़न (Rigor Mortis) का पूर्ण अभाव। यह एंथ्रेक्स (Bacillus anthracis) का निश्चित लक्षण है।'
        };
      }

      // Warning tier if suspicious signs present
      if (hasTarryBlood || (isRigorAbsent && isSuddenDeath)) {
        return {
          isBiohazardTriggered: false,
          severity: 'ELEVATED_SUSPICION',
          reason: 'संदिग्ध आकस्मिक मृत्यु अथवा अपूर्ण रक्त जमाव। चीरा लगाने से पूर्व पेरिफेरल ईयर-वेन स्मियर जांच की अत्यधिक अनुशंसा की जाती है।'
        };
      }

      return {
        isBiohazardTriggered: false,
        severity: 'SAFE',
        reason: 'सामान्य नैदानिक मापदंड। सावधानीपूर्वक शव परीक्षण किया जा सकता है।'
      };
    }
  };

  // 5. TOAST NOTIFICATION UTILITY
  function notify(msg, type = 'info') {
    if (window.VetcareApp && typeof window.VetcareApp.showToast === 'function') {
      window.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[Forensics ${type.toUpperCase()}]: ${msg}`);
    }
  }

  // 6. UI COMPONENT RENDERING ENGINE
  const UIEngine = {
    // Main Shell Layout
    renderMainLayout() {
      const risk = AnthraxSafetyEngine.evaluateAnthraxRisk(State.activeCase.externalExamination, State.activeCase.suspectedCause);

      return `
        <div class="pathology-engine-wrapper max-w-7xl mx-auto space-y-6">

          <!-- TOP ANTHRAX BIO-HAZARD SAFETY BANNER (DYNAMIC HARD-STOP) -->
          <div id="anthraxSafetyBannerContainer">
            ${UIEngine.renderAnthraxBanner(risk)}
          </div>

          <!-- PRIMARY MODULE HEADER & CASE COUNTER -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-2xl shadow-inner">
                <i class="fa-solid fa-skull-crossbones"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-xl font-display font-extrabold text-white tracking-tight">पशु शव परीक्षण एवं फॉरेंसिक पैथोलॉजी</h2>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">COURT & INSURANCE VALID</span>
                </div>
                <p class="text-xs text-slate-400 mt-0.5">
                  विधि-मान्य पोस्टमार्टम रिपोर्टिंग, विसरा नमूना संरक्षण एवं बीमा/पुलिस दावा प्रमाणीकरण (2026 Core)
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-right">
                <span class="text-[10px] font-mono uppercase text-slate-400 block">सक्रिय केस संख्या</span>
                <span class="text-xs font-mono font-bold text-amber-400" id="headerCaseNoDisplay">${State.activeCase.caseNo}</span>
              </div>
              <button type="button" id="btnQuickNewCase" class="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-950/40 flex items-center gap-1.5 transition-all active:scale-95">
                <i class="fa-solid fa-plus-circle"></i>
                <span>नया पीएम रजिस्टर</span>
              </button>
            </div>
          </div>

          <!-- NAVIGATION TABS -->
          <div class="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
            <button type="button" data-tab="new_pm_exam" class="pm-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'new_pm_exam' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
              <i class="fa-solid fa-stethoscope"></i>
              <span>1. नेक्रोप्सी परीक्षा (Necropsy Form)</span>
            </button>
            <button type="button" data-tab="forensic_viscera_vault" class="pm-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'forensic_viscera_vault' ? 'bg-amber-600 text-slate-950 shadow-lg shadow-amber-600/30 font-extrabold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
              <i class="fa-solid fa-jar"></i>
              <span>2. विसरा प्रिजर्वेशन व सील (Viscera Vault)</span>
            </button>
            <button type="button" data-tab="saved_pm_cases" class="pm-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'saved_pm_cases' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
              <i class="fa-solid fa-folder-open"></i>
              <span>3. संगृहीत पीएम रिकॉर्ड्स (${State.allCases.length})</span>
            </button>
            <button type="button" data-tab="pathology_reference_guide" class="pm-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'pathology_reference_guide' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
              <i class="fa-solid fa-book-skull"></i>
              <span>4. पैथोग्नोमोनिक लीजन डायरेक्टरी</span>
            </button>
          </div>

          <!-- TAB CONTENT HOLDER -->
          <div id="pmTabContentPanel" class="transition-opacity duration-200"></div>

          <!-- MODAL CONTAINER -->
          <div id="forensicModalContainer"></div>
        </div>
      `;
    },

    // Dynamic Anthrax Warning Banner
    renderAnthraxBanner(risk) {
      if (risk.isBiohazardTriggered) {
        return `
          <div class="p-5 rounded-2xl bg-rose-950/80 border-2 border-rose-500 text-white shadow-2xl relative overflow-hidden animate-pulse">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center text-2xl flex-shrink-0">
                <i class="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div class="space-y-1.5 flex-1">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono font-black uppercase px-2 py-0.5 rounded bg-rose-600 text-white tracking-widest">
                    CRITICAL BIO-HAZARD • ANTHRAX HARD STOP
                  </span>
                  <span class="text-xs text-rose-300 font-mono font-bold">शव को किसी भी परिस्थिति में न खोलें!</span>
                </div>
                <h3 class="text-base font-bold text-white leading-tight">
                  एंथ्रेक्स संक्रामकता चेतावनी: शव चीरा लगाना पूर्णतः प्रतिबंधित (DO NOT OPEN CARCASS)
                </h3>
                <p class="text-xs text-rose-200 leading-relaxed">
                  ${risk.reason} वायुमंडलीय ऑक्सीजन के संपर्क में आने से <em>Bacillus anthracis</em> बीजाणु (Spores) उत्पन्न होते हैं जो मिट्टी को 60+ वर्षों तक दूषित रखते हैं।
                </p>
                <div class="pt-2 flex flex-wrap gap-2 text-xs">
                  <span class="px-3 py-1 rounded-lg bg-black/40 border border-rose-500/60 font-mono text-amber-300">
                    <i class="fa-solid fa-vial mr-1"></i> केवल कान की नस (Ear Vein) से स्मियर लें
                  </span>
                  <span class="px-3 py-1 rounded-lg bg-black/40 border border-rose-500/60 font-mono text-amber-300">
                    <i class="fa-solid fa-microscope mr-1"></i> M'Fadyean Polychrome Capsule Reaction
                  </span>
                  <span class="px-3 py-1 rounded-lg bg-black/40 border border-rose-500/60 font-mono text-emerald-300">
                    <i class="fa-solid fa-trowel-bricks mr-1"></i> 8-फीट गहरा गड्ढा + 200kg अनबुझा चूना (CaO)
                  </span>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (risk.severity === 'ELEVATED_SUSPICION') {
        return `
          <div class="p-4 rounded-xl bg-amber-950/40 border border-amber-500/60 text-amber-200 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <i class="fa-solid fa-shield-virus text-amber-400 text-xl"></i>
              <div class="text-xs">
                <strong>संभावित बायो-सुरक्षा चेतावनी:</strong> ${risk.reason}
              </div>
            </div>
            <button type="button" id="btnAcknowledgeSafety" class="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors">
              स्मियर प्रोटोकॉल समझ लिया
            </button>
          </div>
        `;
      }
      return '';
    },

    // TAB 1: Necropsy Step-by-Step Form
    renderNecropsyTab() {
      const c = State.activeCase;
      const ext = c.externalExamination;
      const organs = c.internalOrganFindings;
      const risk = AnthraxSafetyEngine.evaluateAnthraxRisk(ext, c.suspectedCause);
      const isLocked = risk.isBiohazardTriggered;

      return `
        <form id="formNecropsyExamination" class="space-y-6">
          
          <!-- SECTION 1: CASE REGISTRATION & LEGAL IDENTIFIERS -->
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-id-card text-rose-400"></i>
                <span>भाग १: पशु पहचान एवं विधिक विवरण (Legal Identification & Case Metadata)</span>
              </h3>
              <span class="text-xs font-mono text-slate-400">केस: ${c.caseNo}</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">कान का टैग / चिप नंबर (Tag No.)*</label>
                <input type="text" id="inp_animalTag" value="${c.animalTag}" required placeholder="IN-HR-2026-XXXX" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono" />
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रजाति (Species)*</label>
                <select id="inp_species" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500">
                  <option value="Bovine" ${c.species === 'Bovine' ? 'selected' : ''}>गोजातीय (Bovine - Cow/Bull)</option>
                  <option value="Bubaline" ${c.species === 'Bubaline' ? 'selected' : ''}>महिषजातीय (Bubaline - Buffalo)</option>
                  <option value="Caprine" ${c.species === 'Caprine' ? 'selected' : ''}>बकरी (Caprine - Goat)</option>
                  <option value="Ovine" ${c.species === 'Ovine' ? 'selected' : ''}>भेड़ (Ovine - Sheep)</option>
                  <option value="Equine" ${c.species === 'Equine' ? 'selected' : ''}>अश्वजातीय (Equine - Horse/Mule)</option>
                  <option value="Porcine" ${c.species === 'Porcine' ? 'selected' : ''}>शूकर (Porcine - Pig)</option>
                  <option value="Canine" ${c.species === 'Canine' ? 'selected' : ''}>श्वान (Canine - Dog)</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">नस्ल एवं लिंग (Breed & Sex)</label>
                <div class="grid grid-cols-2 gap-2">
                  <input type="text" id="inp_breed" value="${c.breed}" placeholder="उदा. मुर्रा / साहीवाल" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500" />
                  <select id="inp_sex" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500">
                    <option value="Female" ${c.sex === 'Female' ? 'selected' : ''}>मादा (Female)</option>
                    <option value="Male" ${c.sex === 'Male' ? 'selected' : ''}>नर (Male)</option>
                    <option value="Castrated Male" ${c.sex === 'Castrated Male' ? 'selected' : ''}>बधिया नर</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">आयु एवं अनुमानित वजन</label>
                <input type="text" id="inp_age" value="${c.age}" placeholder="उदा. 4 वर्ष, 450 kg" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">पशुपालक का नाम एवं पूरा पता*</label>
                <input type="text" id="inp_ownerName" value="${c.ownerName}" required placeholder="श्री रामनिवास, ग्राम-खेड़ी, रोहतक" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">मृत्यु का कथित समय (Death Date/Time)*</label>
                <input type="datetime-local" id="inp_deathDateTime" value="${c.deathDateTime}" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">पोस्टमार्टम परीक्षा समय (PM Date/Time)*</label>
                <input type="text" id="inp_pmDateTime" value="${c.pmDateTime}" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
            </div>

            <!-- Legal Case Toggle Strip -->
            <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="inp_policeCaseOrInsurance" ${c.policeCaseOrInsurance ? 'checked' : ''} class="w-4 h-4 rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-rose-500" />
                <span class="text-xs font-bold text-amber-300">
                  <i class="fa-solid fa-scale-balanced mr-1"></i> यह पुलिस केस (FIR) अथवा बीमा दावा (Insurance Claim) संबंधित विधिक मामला है
                </span>
              </label>

              <div id="legalSubfields" class="${c.policeCaseOrInsurance ? 'grid' : 'hidden'} grid-cols-1 md:grid-cols-4 gap-3 pt-2 border-t border-slate-800 text-xs">
                <div>
                  <label class="block text-[10px] font-mono text-slate-400 uppercase">संबंधित थाना (Police Station)</label>
                  <input type="text" id="inp_policeStation" value="${c.policeStation}" placeholder="उदा. सदर थाना रोहतक" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[10px] font-mono text-slate-400 uppercase">FIR / DD संख्या एवं दिनांक</label>
                  <input type="text" id="inp_firNo" value="${c.firNo}" placeholder="उदा. FIR No. 128/2026" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[10px] font-mono text-slate-400 uppercase">बीमा कंपनी (Insurance Co.)</label>
                  <input type="text" id="inp_insuranceCompany" value="${c.insuranceCompany}" placeholder="उदा. New India Assurance" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[10px] font-mono text-slate-400 uppercase">पॉलिसी व टैग बीमा मूल्य</label>
                  <input type="text" id="inp_policyNo" value="${c.policyNo}" placeholder="Policy: POL-88219 (₹75,000)" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white" />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">मृत्यु का पूर्व इतिहास एवं कथित कारण (Suspected Cause / History)</label>
              <textarea id="inp_suspectedCause" rows="2" placeholder="पशु अचानक चारा खाते हुए गिरा, मुंह से झाग व नाक से गाढ़ा रक्त बहा..." class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500">${c.suspectedCause}</textarea>
            </div>
          </div>

          <!-- SECTION 2: EXTERNAL EXAMINATION (SURFACE INSPECTION) -->
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-eye text-amber-400"></i>
                <span>भाग २: बाह्य शारीरिक परीक्षा (External Examination & Orifices)</span>
              </h3>
              <span class="text-xs font-mono text-emerald-400 font-bold">चरण १: चीरा लगाने से पूर्व</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Rigor Mortis -->
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">शव अकड़न (Rigor Mortis)*</label>
                <select id="inp_rigorMortis" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500">
                  <option value="PRESENT" ${ext.rigorMortis === 'PRESENT' ? 'selected' : ''}>उपस्थित (Present in jaw, neck & limbs)</option>
                  <option value="PARTIAL" ${ext.rigorMortis === 'PARTIAL' ? 'selected' : ''}>आंशिक (Partial / Passing off)</option>
                  <option value="ABSENT" ${ext.rigorMortis === 'ABSENT' ? 'selected' : ''}>पूर्ण अनुपस्थित (ABSENT - Alert! Anthrax Suspect)</option>
                </select>
              </div>

              <!-- Natural Orifices Discharge -->
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्राकृतिक छिद्रों से स्राव (Natural Orifices)*</label>
                <select id="inp_naturalOrificesDischarge" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500">
                  <option value="NONE" ${ext.naturalOrificesDischarge === 'NONE' ? 'selected' : ''}>कोई स्राव नहीं (Clean & Intact)</option>
                  <option value="FROTH" ${ext.naturalOrificesDischarge === 'FROTH' ? 'selected' : ''}>सफेद/गुलाबी झाग (Frothy Nasal Discharge)</option>
                  <option value="TARRY_BLOOD" ${ext.naturalOrificesDischarge === 'TARRY_BLOOD' ? 'selected' : ''}>काला बिना जमा हुआ रक्त (TARRY BLOOD - ANTHRAX CRITICAL)</option>
                  <option value="PURULENT" ${ext.naturalOrificesDischarge === 'PURULENT' ? 'selected' : ''}>मवाद मिश्रित स्राव (Purulent discharge)</option>
                </select>
              </div>

              <!-- Body Condition Score -->
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">शारीरिक स्वास्थ्य स्कोर (BCS 1-5)</label>
                <select id="inp_bodyConditionScore" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono">
                  <option value="1" ${ext.bodyConditionScore === '1' ? 'selected' : ''}>1.0 - अत्यंत क्षीण (Emaciated / Cachectic)</option>
                  <option value="2" ${ext.bodyConditionScore === '2' ? 'selected' : ''}>2.0 - दुर्बल (Thin / Poor)</option>
                  <option value="3" ${ext.bodyConditionScore === '3' ? 'selected' : ''}>3.0 - सामान्य / मध्यम (Normal / Fair)</option>
                  <option value="4" ${ext.bodyConditionScore === '4' ? 'selected' : ''}>4.0 - हृष्ट-पुष्ट (Good / Fleshy)</option>
                  <option value="5" ${ext.bodyConditionScore === '5' ? 'selected' : ''}>5.0 - अत्यधिक स्थूल (Obese / Heavy)</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">नेत्र श्लेष्मा एवं दृश्य झिल्ली (Conjunctiva & Mucosa)</label>
                <input type="text" id="inp_conjunctiva" value="${ext.conjunctiva}" placeholder="उदा. पीलियायुक्त (Icteric) / रक्ताल्पता (Pale) / नीलिमा (Cyanotic)" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">त्वचा, चोट के निशान व गिल्टियां (Skin, Wounds & Lesions)</label>
                <input type="text" id="inp_skinLesions" value="${ext.skinLesions}" placeholder="उदा. कंधे व जांघ पर चरचराहट युक्त सूजन (Crepitating BQ swelling)" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
            </div>
          </div>

          <!-- SECTION 3: INTERNAL SYSTEMIC DISSECTION (THORACIC, ABDOMINAL, CRANIAL) -->
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 ${isLocked ? 'opacity-30 pointer-events-none select-none relative' : ''}">
            ${isLocked ? '<div class="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center p-6 text-center"><i class="fa-solid fa-lock text-5xl text-rose-500 mb-2"></i><div class="text-base font-bold text-rose-400">एंथ्रेक्स सुरक्षा प्रतिबंध सक्रिय (Section Disabled)</div><div class="text-xs text-slate-300 max-w-md mt-1">शव को चीरा लगाना कानूनी एवं चिकित्सा दृष्टि से प्रतिबंधित कर दिया गया है। कृपया केवल बाह्य जांच व विसरा नमूना खंड पूर्ण करें।</div></div>' : ''}

            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-heart-pulse text-cyan-400"></i>
                <span>भाग ३: आंतरिक अंग चीरा परीक्षा (Internal Organ Cavity Examination)</span>
              </h3>
              <span class="text-xs font-mono text-cyan-400 font-bold">व्यवस्थित नेक्रोप्सी</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Subcutis & Peritoneum -->
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">१. त्वचा के नीचे का ऊतक (Subcutis & Fat)</label>
                <textarea id="org_subcutis" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">${organs.subcutis}</textarea>
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">२. पेरिटोनियम एवं उदर गुहा (Peritoneal Cavity)</label>
                <textarea id="org_peritoneum" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">${organs.peritoneum}</textarea>
              </div>

              <!-- Rumen / Stomach & Intestines -->
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">३. प्रथम व द्वितीय आमाशय (Rumen & Reticulum)</label>
                <textarea id="org_rumenReticulum" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">${organs.rumenReticulum}</textarea>
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">४. आंतें एवं मीसेन्ट्री (Intestines & Lymph Nodes)</label>
                <textarea id="org_intestinesMesentery" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">${organs.intestinesMesentery}</textarea>
              </div>

              <!-- Liver & Spleen -->
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">५. यकृत एवं पित्ताशय (Liver & Gallbladder)</label>
                <textarea id="org_liverGallbladder" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">${organs.liverGallbladder}</textarea>
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">६. प्लीहा (Spleen - Normal vs Splenomegaly)</label>
                <textarea id="org_spleen" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">${organs.spleen}</textarea>
              </div>

              <!-- Heart & Lungs -->
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">७. हृदय एवं पेरीकार्डियम (Heart & Epicardium)</label>
                <textarea id="org_heartPericardium" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">${organs.heartPericardium}</textarea>
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">८. फेफड़े एवं श्वास नली (Lungs & Trachea)</label>
                <textarea id="org_lungsTrachea" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">${organs.lungsTrachea}</textarea>
              </div>

              <!-- Kidneys & Brain -->
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">९. गुर्दे एवं मूत्राशय (Kidneys & Bladder)</label>
                <textarea id="org_kidneysUrinaryBladder" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">${organs.kidneysUrinaryBladder}</textarea>
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">१०. मस्तिष्क व तंत्रिका तंत्र (Brain & Meninges)</label>
                <textarea id="org_brainMeninges" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">${organs.brainMeninges}</textarea>
              </div>
            </div>
          </div>

          <!-- SECTION 4: PATHOLOGIST OPINION & LEGAL VERDICT -->
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-gavel text-emerald-400"></i>
                <span>भाग ४: मृत्यु का अंतिम कारण एवं विशेषज्ञ अभिमत (Final Verdict & Medical Legal Opinion)</span>
              </h3>
              <span class="text-xs font-mono text-emerald-400 font-bold">विधि-मान्य निर्णय</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">मृत्यु का प्राथमिक कारण (Primary Cause of Death)*</label>
                <input type="text" id="inp_primaryCauseOfDeath" value="${c.pathologistVerdict.primaryCauseOfDeath}" required placeholder="उदा. हाइपोवोलेमिक शॉक एवं गलघोंटू (Septicaemic Shock due to Pasteurellosis)" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold" />
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">द्वितीयक नैदानिक निष्कर्ष (Secondary Pathology Findings)</label>
                <input type="text" id="inp_secondaryFindings" value="${c.pathologistVerdict.secondaryFindings}" placeholder="उदा. यकृत में कृमि सिस्ट (Fascioliasis) एवं तीव्र फेफड़ा शोथ" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">विस्तृत चिकित्सीय-विधिक राय (Opinion as to the Cause of Death)*</label>
              <textarea id="inp_opinionSummary" rows="3" required placeholder="मेरी सुविचारित राय में, प्रस्तुत पशु की मृत्यु..." class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed">${c.pathologistVerdict.opinionSummary || 'उपरोक्त शव परीक्षण में पाए गए विशिष्ट रोग परिवर्तनों, अंगों की विकृति एवं बाह्य साक्ष्यों के आधार पर मेरी सुविचारित वैज्ञानिक राय में, पशु की मृत्यु का तात्कालिक कारण ' + (c.pathologistVerdict.primaryCauseOfDeath || 'गंभीर रोग संक्रामकता') + ' के परिणामस्वरूप कार्डियो-रेस्पिरेटरी अरेस्ट (हृदय गति रुकने) से हुई है।'}</textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-800 text-xs">
              <div>
                <label class="block text-[10px] font-mono text-slate-400 uppercase">परीक्षणकर्ता चिकित्सक का नाम</label>
                <input type="text" id="inp_pathologistName" value="${c.pathologistVerdict.pathologistName}" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white" />
              </div>
              <div>
                <label class="block text-[10px] font-mono text-slate-400 uppercase">VCI / राज्य पंजीकरण संख्या</label>
                <input type="text" id="inp_registrationNo" value="${c.pathologistVerdict.registrationNo}" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono" />
              </div>
              <div>
                <label class="block text-[10px] font-mono text-slate-400 uppercase">चिकित्सालय / संस्था</label>
                <input type="text" id="inp_veterinaryHospital" value="${c.pathologistVerdict.veterinaryHospital}" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white" />
              </div>
            </div>
          </div>

          <!-- FORM SUBMIT / PRINT ACTION BAR -->
          <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div class="flex items-center gap-2 text-xs text-slate-400">
              <i class="fa-solid fa-lock text-emerald-400"></i>
              <span>डिजिटल रूप से हस्ताक्षरित एवं भारतीय साक्ष्य अधिनियम अंतर्गत विधि-मान्य</span>
            </div>

            <div class="flex items-center gap-3">
              <button type="button" id="btnPrintCurrentPmReport" class="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors">
                <i class="fa-solid fa-print text-amber-400"></i>
                <span>कानूनी पीएम रिपोर्ट प्रिंट करें (A4)</span>
              </button>
              <button type="submit" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 flex items-center gap-1.5 transition-all active:scale-95">
                <i class="fa-solid fa-floppy-disk"></i>
                <span>पीएम केस सुरक्षित सहेजें</span>
              </button>
            </div>
          </div>

        </form>
      `;
    },

    // TAB 2: Forensic Viscera Dispatch & Chain of Custody
    renderVisceraTab() {
      const v = State.activeCase.visceraPreservation;
      const bottles = window.VetcareApp.ClinicalData.PostMortemPathology.FORENSIC_BOTTLE_REGIMEN;
      const chemRules = window.VetcareApp.ClinicalData.PostMortemPathology.VISCERA_PRESERVATIVES;

      return `
        <div class="space-y-6">
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-jar-wheat text-amber-400"></i>
                  <span>फॉरेंसिक विसरा प्रिजर्वेशन व रासायनिक विश्लेषण रजिस्टर (Viscera Chain of Custody)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  विषाक्तता, विषप्रयोग अथवा संदेहास्पद मृत्यु के मामलों में कोर्ट में स्वीकार्य त्रि-स्तरीय विसरा पैकिंग नियम
                </p>
              </div>
              <div class="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 font-bold">
                अधीक्षक सील नं: ${v.sealNo}
              </div>
            </div>

            <!-- Standard 4-Bottle Regimen Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              ${bottles.map(b => `
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold block w-fit mb-1.5">
                      ${b.bottleNo}
                    </span>
                    <h5 class="text-xs font-bold text-white leading-snug">${b.label}</h5>
                    <p class="text-[11px] text-slate-300 mt-2">${b.contents}</p>
                  </div>
                  <div class="pt-2 border-t border-slate-800 text-[10px] font-mono text-cyan-400">
                    प्रिजर्वेटिव: ${b.preservative}
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Viscera Dispatch Form -->
            <form id="formVisceraDispatch" class="space-y-4 pt-4 border-t border-slate-800">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">विसरा परिरक्षक माध्यम (Preservative Liquid)*</label>
                  <select id="v_preservativeUsed" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="Rectified Spirit (Pure Alcohol)" ${v.preservativeUsed === 'Rectified Spirit (Pure Alcohol)' ? 'selected' : ''}>Rectified Spirit (सामान्य विष व कीटनाशक हेतु)</option>
                    <option value="Saturated Salt Solution (NaCl)" ${v.preservativeUsed === 'Saturated Salt Solution (NaCl)' ? 'selected' : ''}>Saturated Salt Solution (धात्विक विष / आर्सेनिक / फास्फोरस हेतु)</option>
                    <option value="10% Neutral Buffered Formalin (NBF)" ${v.preservativeUsed === '10% Neutral Buffered Formalin (NBF)' ? 'selected' : ''}>10% NBF (केवल हिस्टोपैथोलॉजी माइक्रोस्कोपी हेतु)</option>
                    <option value="Sterile Cold Chain (No Chemical)" ${v.preservativeUsed === 'Sterile Cold Chain (No Chemical)' ? 'selected' : ''}>Sterile Cold Ice (जीवाणु/विषाणु संवर्धन हेतु)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">फॉरेंसिक लैब का नाम (Dispatch Lab)*</label>
                  <input type="text" id="v_dispatchLab" value="${v.dispatchLab}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">विशेष सील मार्का संख्या (Metal Seal Impress)*</label>
                  <input type="text" id="v_sealNo" value="${v.sealNo}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">वाहकल/पुलिस आरक्षी विवरण (Courier / Constable Escort)</label>
                  <input type="text" id="v_courierOrConstableName" value="${v.courierOrConstableName || ''}" placeholder="कांस्टेबल मनोज कुमार, बेल्ट नं. 492, थाना सदर" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">बोतल 4 (खाली प्रिजर्वेटिव कंट्रोल नमूना संलग्न?)</label>
                  <div class="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <input type="checkbox" id="v_controlCheck" checked class="w-4 h-4 rounded bg-slate-800 border-slate-700 text-amber-500" />
                    <span>हाँ, 100ml शुद्ध परिरक्षक का नियंत्रण नमूना अलग सीलबंद शीशी में प्रेषित</span>
                  </div>
                </div>
              </div>

              <div class="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button type="button" id="btnSaveVisceraDetails" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md">
                  विसरा प्रेषण मेमो अपडेट करें
                </button>
              </div>
            </form>
          </div>

          <!-- Chemical Preservative Reference Guide -->
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <h4 class="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider mb-3">
              <i class="fa-solid fa-circle-info mr-1"></i> फॉरेंसिक विसरा परिरक्षण नियम (Legal Preservation Guide)
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              ${Object.entries(chemRules).map(([name, r]) => `
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div class="font-bold text-white">${name}</div>
                  <div class="text-slate-300"><strong class="text-slate-400">उपयुक्तता:</strong> ${r.suitability}</div>
                  <div class="text-rose-400"><strong class="text-slate-400">निषेध:</strong> ${r.contraindication}</div>
                  <div class="text-slate-400 text-[11px] font-mono">${r.rules}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    },

    // TAB 3: Saved Cases Directory
    renderSavedCasesTab() {
      const cases = State.allCases;

      const rows = cases.map(c => `
        <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
          <td class="py-3 px-4 font-mono text-xs text-rose-400 font-bold">${c.caseNo}</td>
          <td class="py-3 px-4">
            <div class="font-bold text-white text-sm">${c.animalTag || 'बिना टैग'}</div>
            <div class="text-[11px] text-slate-400">${c.species} (${c.breed || 'वर्णसंकर'}) • ${c.sex}</div>
          </td>
          <td class="py-3 px-4 text-xs text-slate-300">
            <div>${c.ownerName || 'अज्ञात'}</div>
            <div class="text-[11px] text-slate-400">${c.pmDateTime}</div>
          </td>
          <td class="py-3 px-4">
            <div class="text-xs font-bold text-emerald-300">${c.pathologistVerdict.primaryCauseOfDeath || 'कारण अनिर्धारित'}</div>
            <div class="text-[10px] text-slate-400 truncate max-w-xs">${c.pathologistVerdict.opinionSummary || ''}</div>
          </td>
          <td class="py-3 px-4">
            ${c.policeCaseOrInsurance ?
              '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">FIR/INSURANCE</span>' :
              '<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">CLINICAL</span>'
            }
          </td>
          <td class="py-3 px-4 text-right space-x-1.5">
            <button type="button" data-action="load_case" data-caseno="${c.caseNo}" class="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700" title="संपादित करें">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" data-action="print_saved_case" data-caseno="${c.caseNo}" class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/40" title="A4 कानूनी रिपोर्ट प्रिंट">
              <i class="fa-solid fa-print"></i>
            </button>
          </td>
        </tr>
      `).join('');

      return `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div class="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-folder-closed text-cyan-400"></i>
                <span>संग्रहीत पोस्टमार्टम अभिलेख संदूक (Archived PM Case Vault)</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                न्यायालयीय एवं बीमा संदर्भ हेतु सुरक्षित रखे गए सभी पूर्ण किए गए शव परीक्षण रिपोर्ट
              </p>
            </div>
            <span class="text-xs font-mono text-cyan-400 font-bold">${cases.length} कुल मामले</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                  <th class="py-3 px-4">केस क्रमांक</th>
                  <th class="py-3 px-4">टैग व प्रजाति</th>
                  <th class="py-3 px-4">पशुपालक एवं दिनांक</th>
                  <th class="py-3 px-4">मृत्यु का प्राथमिक कारण</th>
                  <th class="py-3 px-4">प्रकृति</th>
                  <th class="py-3 px-4 text-right">कार्रवाई</th>
                </tr>
              </thead>
              <tbody>
                ${cases.length > 0 ? rows : '<tr><td colspan="6" class="p-8 text-center text-slate-400 text-xs font-mono">कोई पूर्व पोस्टमार्टम रिकॉर्ड उपलब्ध नहीं है। नया पीएम दर्ज करें।</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // TAB 4: Pathognomonic Reference Matrix
    renderPathognomonicTab() {
      const list = window.VetcareApp.ClinicalData.PostMortemPathology.PATHOGNOMONIC_REFERENCE;

      const cards = list.map(item => `
        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-lg space-y-2.5">
          <div class="flex items-start justify-between gap-2">
            <h4 class="text-sm font-bold text-amber-300">${item.disease}</h4>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${item.species}</span>
          </div>
          <div class="text-[11px] font-mono text-cyan-400">
            <strong>कारक:</strong> ${item.pathogen}
          </div>
          <div class="text-xs text-slate-200 leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
            <strong class="text-rose-400 block mb-1">विशेष पैथोलॉजिकल घाव (Pathognomonic Lesions):</strong>
            ${item.lesions}
          </div>
          <div class="text-[11px] text-slate-400">
            <strong class="text-slate-300">नमूना नियम:</strong> ${item.specimenRules}
          </div>
        </div>
      `).join('');

      return `
        <div class="space-y-4">
          <div class="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800">
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-book-skull text-emerald-400"></i>
              <span>पशु संक्रामक एवं विषाक्तता विकृति विज्ञान संदर्भ (Pathognomonic PM Matrix)</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">
              शव खोलते समय अंगों में दिखने वाले 'हस्ताक्षर घाव' (Pathognomonic Signatures) जो निश्चित निदान कराते हैं
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${cards}
          </div>
        </div>
      `;
    }
  };

  // 7. EVENT BINDING & INTERACTIVITY SUBSYSTEM
  function bindDOMEvents(container) {
    if (State.listenersBound) return;

    // 1. Tab Navigation Delegation
    container.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('.pm-tab-btn');
      if (tabBtn) {
        const targetTab = tabBtn.getAttribute('data-tab');
        if (targetTab && targetTab !== State.activeTab) {
          State.activeTab = targetTab;
          window.VetcareApp.Modules.PathologyPostmortemForensics.refreshView();
        }
        return;
      }

      // Quick New PM Case
      if (e.target.closest('#btnQuickNewCase')) {
        State.activeCase.caseNo = 'PM-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
        State.activeCase.animalTag = '';
        State.activeCase.ownerName = '';
        State.activeCase.deathDateTime = '';
        State.activeCase.suspectedCause = '';
        State.activeCase.externalExamination.rigorMortis = 'PRESENT';
        State.activeCase.externalExamination.naturalOrificesDischarge = 'NONE';
        State.activeTab = 'new_pm_exam';
        notify('नया पीएम केस प्रारंभ किया गया।', 'info');
        window.VetcareApp.Modules.PathologyPostmortemForensics.refreshView();
        return;
      }

      // Print Current Report
      if (e.target.closest('#btnPrintCurrentPmReport')) {
        window.VetcareApp.Modules.PathologyPostmortemForensics.printOfficialPmReport(State.activeCase.caseNo);
        return;
      }

      // Load Saved Case
      const loadBtn = e.target.closest('button[data-action="load_case"]');
      if (loadBtn) {
        const cNo = loadBtn.getAttribute('data-caseno');
        const found = State.allCases.find(c => c.caseNo === cNo);
        if (found) {
          State.activeCase = JSON.parse(JSON.stringify(found));
          State.activeTab = 'new_pm_exam';
          notify(`केस ${cNo} सफलतापूर्वक लोड हुआ।`, 'success');
          window.VetcareApp.Modules.PathologyPostmortemForensics.refreshView();
        }
        return;
      }

      // Print Saved Case
      const printSavedBtn = e.target.closest('button[data-action="print_saved_case"]');
      if (printSavedBtn) {
        const cNo = printSavedBtn.getAttribute('data-caseno');
        window.VetcareApp.Modules.PathologyPostmortemForensics.printOfficialPmReport(cNo);
        return;
      }

      // Save Viscera Form Button
      if (e.target.closest('#btnSaveVisceraDetails')) {
        const pres = document.getElementById('v_preservativeUsed');
        const lab = document.getElementById('v_dispatchLab');
        const seal = document.getElementById('v_sealNo');
        const courier = document.getElementById('v_courierOrConstableName');

        if (pres) State.activeCase.visceraPreservation.preservativeUsed = pres.value;
        if (lab) State.activeCase.visceraPreservation.dispatchLab = lab.value;
        if (seal) State.activeCase.visceraPreservation.sealNo = seal.value;
        if (courier) State.activeCase.visceraPreservation.courierOrConstableName = courier.value;
        State.activeCase.visceraPreservation.visceraPreserved = true;

        StorageAdapter.saveCase(State.activeCase);
        notify('विसरा प्रेषण मेमो एवं सील संख्या सहेजी गई!', 'success');
        return;
      }
    });

    // 2. Change Listeners for Anthrax Detection & Legal Toggle
    container.addEventListener('change', (e) => {
      // Police / Legal Case Toggle
      if (e.target.id === 'inp_policeCaseOrInsurance') {
        State.activeCase.policeCaseOrInsurance = e.target.checked;
        const sub = document.getElementById('legalSubfields');
        if (sub) {
          if (e.target.checked) {
            sub.classList.remove('hidden');
            sub.classList.add('grid');
          } else {
            sub.classList.add('hidden');
            sub.classList.remove('grid');
          }
        }
        return;
      }

      // Natural Orifice Discharge Trigger (Anthrax Checker)
      if (e.target.id === 'inp_naturalOrificesDischarge' || e.target.id === 'inp_rigorMortis') {
        const disVal = document.getElementById('inp_naturalOrificesDischarge')?.value || 'NONE';
        const rigVal = document.getElementById('inp_rigorMortis')?.value || 'PRESENT';

        State.activeCase.externalExamination.naturalOrificesDischarge = disVal;
        State.activeCase.externalExamination.rigorMortis = rigVal;

        const risk = AnthraxSafetyEngine.evaluateAnthraxRisk(State.activeCase.externalExamination, State.activeCase.suspectedCause);
        const bannerContainer = document.getElementById('anthraxSafetyBannerContainer');
        if (bannerContainer) {
          bannerContainer.innerHTML = UIEngine.renderAnthraxBanner(risk);
        }

        // Re-render necropsy tab to lock/unlock internal examination section
        window.VetcareApp.Modules.PathologyPostmortemForensics.refreshView();
        return;
      }
    });

    // 3. Form Submit Listener (Main Necropsy Form)
    container.addEventListener('submit', async (e) => {
      if (e.target.id === 'formNecropsyExamination') {
        e.preventDefault();

        // Harvest Form Values
        const c = State.activeCase;
        c.animalTag = document.getElementById('inp_animalTag')?.value.trim() || '';
        c.species = document.getElementById('inp_species')?.value || 'Bovine';
        c.breed = document.getElementById('inp_breed')?.value.trim() || '';
        c.sex = document.getElementById('inp_sex')?.value || 'Female';
        c.age = document.getElementById('inp_age')?.value.trim() || '';
        c.ownerName = document.getElementById('inp_ownerName')?.value.trim() || '';
        c.deathDateTime = document.getElementById('inp_deathDateTime')?.value || '';
        c.pmDateTime = document.getElementById('inp_pmDateTime')?.value || '';
        c.suspectedCause = document.getElementById('inp_suspectedCause')?.value.trim() || '';

        // Legal inputs
        c.policeStation = document.getElementById('inp_policeStation')?.value.trim() || '';
        c.firNo = document.getElementById('inp_firNo')?.value.trim() || '';
        c.insuranceCompany = document.getElementById('inp_insuranceCompany')?.value.trim() || '';
        c.policyNo = document.getElementById('inp_policyNo')?.value.trim() || '';

        // External inputs
        c.externalExamination.rigorMortis = document.getElementById('inp_rigorMortis')?.value || 'PRESENT';
        c.externalExamination.naturalOrificesDischarge = document.getElementById('inp_naturalOrificesDischarge')?.value || 'NONE';
        c.externalExamination.bodyConditionScore = document.getElementById('inp_bodyConditionScore')?.value || '3';
        c.externalExamination.conjunctiva = document.getElementById('inp_conjunctiva')?.value.trim() || '';
        c.externalExamination.skinLesions = document.getElementById('inp_skinLesions')?.value.trim() || '';

        // Internal organ inputs (if not locked)
        const risk = AnthraxSafetyEngine.evaluateAnthraxRisk(c.externalExamination, c.suspectedCause);
        if (!risk.isBiohazardTriggered) {
          c.internalOrganFindings.subcutis = document.getElementById('org_subcutis')?.value || '';
          c.internalOrganFindings.peritoneum = document.getElementById('org_peritoneum')?.value || '';
          c.internalOrganFindings.rumenReticulum = document.getElementById('org_rumenReticulum')?.value || '';
          c.internalOrganFindings.intestinesMesentery = document.getElementById('org_intestinesMesentery')?.value || '';
          c.internalOrganFindings.liverGallbladder = document.getElementById('org_liverGallbladder')?.value || '';
          c.internalOrganFindings.spleen = document.getElementById('org_spleen')?.value || '';
          c.internalOrganFindings.heartPericardium = document.getElementById('org_heartPericardium')?.value || '';
          c.internalOrganFindings.lungsTrachea = document.getElementById('org_lungsTrachea')?.value || '';
          c.internalOrganFindings.kidneysUrinaryBladder = document.getElementById('org_kidneysUrinaryBladder')?.value || '';
          c.internalOrganFindings.brainMeninges = document.getElementById('org_brainMeninges')?.value || '';
        }

        // Verdict inputs
        c.pathologistVerdict.primaryCauseOfDeath = document.getElementById('inp_primaryCauseOfDeath')?.value.trim() || '';
        c.pathologistVerdict.secondaryFindings = document.getElementById('inp_secondaryFindings')?.value.trim() || '';
        c.pathologistVerdict.opinionSummary = document.getElementById('inp_opinionSummary')?.value.trim() || '';
        c.pathologistVerdict.pathologistName = document.getElementById('inp_pathologistName')?.value.trim() || 'Dr. Rahul Sharma';
        c.pathologistVerdict.registrationNo = document.getElementById('inp_registrationNo')?.value.trim() || 'VCI-REG-2018-9941';
        c.pathologistVerdict.veterinaryHospital = document.getElementById('inp_veterinaryHospital')?.value.trim() || '';

        await StorageAdapter.saveCase(c);

        // Update list
        State.allCases = await StorageAdapter.loadAllCases();
        notify(`पोस्टमार्टम केस ${c.caseNo} सफलतापूर्वक सुरक्षित किया गया।`, 'success');
        window.VetcareApp.Modules.PathologyPostmortemForensics.refreshView();
      }
    });

    State.listenersBound = true;
  }

  // 8. PUBLIC API & LIFECYCLE IMPLEMENTATION
  window.VetcareApp.Modules.PathologyPostmortemForensics = {
    // Lifecycle Init
    async init() {
      try {
        await StorageAdapter.initDB();
        State.allCases = await StorageAdapter.loadAllCases();

        // Seed with sample demo case if database is empty
        if (State.allCases.length === 0) {
          const sampleCase = JSON.parse(JSON.stringify(State.activeCase));
          sampleCase.caseNo = 'PM-2026-7842';
          sampleCase.animalTag = 'IN-HR-2026-9041';
          sampleCase.species = 'Bubaline';
          sampleCase.breed = 'Murrah Buffalo';
          sampleCase.age = '5.5 Years';
          sampleCase.sex = 'Female';
          sampleCase.ownerName = 'चौधरी धर्मपाल सिंह, रोहतक';
          sampleCase.policeCaseOrInsurance = true;
          sampleCase.insuranceCompany = 'National Insurance Co.';
          sampleCase.policyNo = 'NIC-CATTLE-49219';
          sampleCase.deathDateTime = new Date(Date.now() - 14 * 3600000).toISOString().replace('T', ' ').substring(0, 16);
          sampleCase.pathologistVerdict.primaryCauseOfDeath = 'Gelatinous throat oedema & endotoxic shock (Haemorrhagic Septicaemia)';
          sampleCase.pathologistVerdict.opinionSummary = 'उपरोक्त बाह्य व आंतरिक परीक्षा के आधार पर पशु की मृत्यु गलघोंटू (HS / Pasteurellosis) के कारण उत्पन्न गंभीर श्वास अवरोध एवं एंडोटॉक्सिक शॉक से हुई है।';
          await StorageAdapter.saveCase(sampleCase);
          State.allCases = [sampleCase];
        }

        console.log('[ForensicsEngine] Pathology module initialized. Loaded cases:', State.allCases.length);
      } catch (err) {
        console.error('[ForensicsEngine] Init Error:', err);
      }
    },

    // Lifecycle Render
    render(containerId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error(`[ForensicsEngine] Container ${containerId} not found.`);
        return;
      }

      State.containerElement = container;
      this.refreshView();
      bindDOMEvents(container);
    },

    // Fast View Refresh
    refreshView() {
      if (!State.containerElement) return;

      State.containerElement.innerHTML = UIEngine.renderMainLayout();
      const panel = State.containerElement.querySelector('#pmTabContentPanel');
      if (!panel) return;

      if (State.activeTab === 'new_pm_exam') {
        panel.innerHTML = UIEngine.renderNecropsyTab();
      } else if (State.activeTab === 'forensic_viscera_vault') {
        panel.innerHTML = UIEngine.renderVisceraTab();
      } else if (State.activeTab === 'saved_pm_cases') {
        panel.innerHTML = UIEngine.renderSavedCasesTab();
      } else if (State.activeTab === 'pathology_reference_guide') {
        panel.innerHTML = UIEngine.renderPathognomonicTab();
      }
    },

    // Lifecycle Destroy
    destroy() {
      if (State.containerElement) {
        State.containerElement.innerHTML = '';
        State.containerElement = null;
      }
      State.listenersBound = false;
      console.log('[ForensicsEngine] Pathology module destroyed cleanly.');
    },

    // Official Legal A4 Post-Mortem Certificate Generator
    printOfficialPmReport(caseNo) {
      let targetCase = State.allCases.find(c => c.caseNo === caseNo);
      if (!targetCase && State.activeCase.caseNo === caseNo) {
        targetCase = State.activeCase;
      }

      if (!targetCase) {
        notify('केस रिकॉर्ड नहीं मिला।', 'error');
        return;
      }

      const c = targetCase;
      const ext = c.externalExamination;
      const org = c.internalOrganFindings;
      const v = c.pathologistVerdict;
      const visc = c.visceraPreservation;

      const printWindow = window.open('', '_blank', 'width=950,height=800');
      if (!printWindow) {
        notify('प्रिंट विंडो पॉपअप अवरुद्ध हो गया है। पॉपअप्स की अनुमति दें।', 'warning');
        return;
      }

      const reportHtml = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Legal PM Certificate - ${c.caseNo}</title>
          <style>
            @page { size: A4; margin: 12mm 15mm 12mm 15mm; }
            body { font-family: 'Times New Roman', Times, serif; color: #000; line-height: 1.4; padding: 10px; font-size: 13px; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; }
            .gov-title { font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
            .sub-title { font-size: 12px; font-weight: bold; margin-top: 2px; }
            .cert-title { font-size: 15px; font-weight: bold; text-decoration: underline; margin-top: 6px; text-transform: uppercase; }
            .meta-strip { display: flex; justify-content: space-between; font-weight: bold; font-size: 12px; margin-bottom: 10px; }
            .table-data { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
            .table-data th, .table-data td { border: 1px solid #333; padding: 5px 8px; font-size: 12px; vertical-align: top; }
            .table-data th { background-color: #f2f2f2; text-align: left; width: 28%; font-weight: bold; }
            .section-head { font-weight: bold; background-color: #e5e5e5; padding: 4px 6px; border: 1px solid #333; border-bottom: none; font-size: 12px; text-transform: uppercase; margin-top: 8px; }
            .verdict-box { border: 2px solid #000; padding: 10px; margin-top: 10px; background-color: #fafafa; font-size: 13px; }
            .verdict-title { font-weight: bold; text-decoration: underline; margin-bottom: 4px; }
            .seal-container { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; }
            .seal-block { width: 240px; text-align: center; border-top: 1px solid #000; padding-top: 5px; font-size: 12px; font-weight: bold; }
            .qr-token { border: 1px dashed #000; padding: 8px; width: 140px; text-align: center; font-family: monospace; font-size: 9px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="gov-title">पशुपालन एवं डेयरी विभाग • DEPARTMENT OF ANIMAL HUSBANDRY</div>
            <div class="sub-title">राज्य पशु चिकित्सा फॉरेंसिक एवं नैदानिक अनुसंधान नेटवर्क (GOVT. OF INDIA / STATE DIRECTOARTE)</div>
            <div class="cert-title">आधिकारिक शव परीक्षा प्रमाण-पत्र (POST-MORTEM EXAMINATION CERTIFICATE)</div>
            <div style="font-size: 10px; font-style: italic; margin-top: 2px;">(भारतीय साक्ष्य अधिनियम अंतर्गत न्यायालय व बीमा दावों हेतु विधि-मान्य दस्तावेज)</div>
          </div>

          <div class="meta-strip">
            <span>पीएम केस क्रमांक: <u>${c.caseNo}</u></span>
            <span>तारीख व समय: <u>${c.pmDateTime}</u></span>
            <span>थाना / FIR: <u>${c.policeStation || 'N/A'} - ${c.firNo || 'N/A'}</u></span>
          </div>

          <table class="table-data">
            <tr>
              <th>१. पशु पहचान (टैग संख्या)</th>
              <td><strong>${c.animalTag || 'बिना टैग'}</strong> (बीमा पॉलिसी: ${c.policyNo || 'लागू नहीं'})</td>
            </tr>
            <tr>
              <th>२. प्रजाति, नस्ल, लिंग एवं आयु</th>
              <td>${c.species} | नस्ल: ${c.breed || 'वर्णसंकर'} | लिंग: ${c.sex} | आयु: ${c.age || 'वयस्क'}</td>
            </tr>
            <tr>
              <th>३. पशुपालक का नाम व पता</th>
              <td>${c.ownerName || 'अज्ञात'}</td>
            </tr>
            <tr>
              <th>४. मृत्यु का कथित समय व स्थान</th>
              <td>${c.deathDateTime || 'अज्ञात'}</td>
            </tr>
            <tr>
              <th>५. कथित पूर्व इतिहास व कारण</th>
              <td>${c.suspectedCause || 'अचानक मृत्यु'}</td>
            </tr>
          </table>

          <div class="section-head">भाग १: बाह्य शारीरिक परीक्षा (EXTERNAL EXAMINATION)</div>
          <table class="table-data">
            <tr>
              <th>शव अकड़न (Rigor Mortis)</th>
              <td>${ext.rigorMortis}</td>
            </tr>
            <tr>
              <th>प्राकृतिक छिद्रों से स्राव</th>
              <td><strong>${ext.naturalOrificesDischarge}</strong></td>
            </tr>
            <tr>
              <th>शारीरिक स्वास्थ्य व नेत्र श्लेष्मा</th>
              <td>BCS: ${ext.bodyConditionScore}/5 | श्लेष्मा: ${ext.conjunctiva || 'Normal'}</td>
            </tr>
            <tr>
              <th>त्वचा, बाह्य चोट व घाव</th>
              <td>${ext.skinLesions || 'कोई बाह्य यांत्रिक चोट नहीं'}</td>
            </tr>
          </table>

          <div class="section-head">भाग २: आंतरिक अंग चीरा परीक्षा (INTERNAL CAVITY FINDINGS)</div>
          <table class="table-data">
            <tr>
              <th>हृदय एवं फेफड़े (Thorax)</th>
              <td>हृदय: ${org.heartPericardium} <br />फेफड़े: ${org.lungsTrachea}</td>
            </tr>
            <tr>
              <th>आमाशय एवं आंतें (Abdomen)</th>
              <td>आमाशय: ${org.rumenReticulum} <br />आंतें: ${org.intestinesMesentery}</td>
            </tr>
            <tr>
              <th>यकृत एवं प्लीहा (Liver & Spleen)</th>
              <td>यकृत: ${org.liverGallbladder} <br />प्लीहा: ${org.spleen}</td>
            </tr>
            <tr>
              <th>गुर्दे एवं मूत्राशय (Kidneys)</th>
              <td>${org.kidneysUrinaryBladder}</td>
            </tr>
          </table>

          ${visc.visceraPreserved ? `
            <div style="font-size: 11px; margin-bottom: 6px; padding: 4px; background: #eee; border: 1px solid #333;">
              <strong>फॉरेंसिक विसरा प्रेषण:</strong> रासायनिक परीक्षण हेतु 4 बोतल विसरा नमूने <strong>सील नं. ${visc.sealNo}</strong> द्वारा <strong>${visc.dispatchLab}</strong> को प्रेषित किए गए। परिरक्षक: ${visc.preservativeUsed}।
            </div>
          ` : ''}

          <div class="verdict-box">
            <div class="verdict-title">मृत्यु के कारण पर चिकित्सीय-विधिक राय (OPINION AS TO THE CAUSE OF DEATH):</div>
            <div><strong>प्राथमिक कारण (Primary Cause):</strong> <u>${v.primaryCauseOfDeath || 'गंभीर रोग संक्रामकता'}</u></div>
            <div style="margin-top: 4px; text-align: justify;">
              <strong>विस्तृत निष्कर्ष:</strong> ${v.opinionSummary}
            </div>
          </div>

          <div class="seal-container">
            <div class="qr-token">
              [ OFFICIAL VET SEAL ]<br />
              VETCARE-PM-${c.caseNo}<br />
              SHA-256 DIGITAL AUTH
            </div>

            <div class="seal-block">
              हस्ताक्षर एवं सील<br />
              <strong>${v.pathologistName}</strong><br />
              ${v.qualification}<br />
              पंजीकरण संख्या: ${v.registrationNo}<br />
              ${v.veterinaryHospital}
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(reportHtml);
      printWindow.document.close();
    }
  };

})(window, document);
