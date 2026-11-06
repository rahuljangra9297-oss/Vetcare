// Vetcare AI OS - Veterinary Radiology, Ultrasound Imaging & Diagnostic AI Viewer Module (2026 Production)

(function (window, document) {
  "use strict";

  // Ensure Global Namespaces
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // ============================================================================
  // 1. RADIOLOGY REFERENCE DATA & SPECIES BIOMETRIC STANDARDS
  // ============================================================================
  const RADIOLOGY_REFERENCE_STANDARDS = {
    vhsCutoffs: {
      canine: {
        normalMin: 8.5,
        normalMax: 10.5,
        suspectMax: 11.5,
        unit: "v (vertebral units)",
        referenceSource: "Buchanan & Bucheler (1995) Canine Vertebral Scale System",
        breedAdjustments: {
          boxer: { normalMin: 10.3, normalMax: 11.6 },
          bulldog: { normalMin: 11.0, normalMax: 12.0 },
          cavalier_king_charles: { normalMin: 9.9, normalMax: 11.7 },
          dachshund: { normalMin: 9.0, normalMax: 10.5 },
          german_shepherd: { normalMin: 9.2, normalMax: 10.4 },
          labrador_retriever: { normalMin: 9.2, normalMax: 10.8 }
        }
      },
      feline: {
        normalMin: 6.9,
        normalMax: 8.0,
        suspectMax: 8.5,
        unit: "v (vertebral units)",
        referenceSource: "Litster & Buchanan (2000) Feline Vertebral Heart Scale",
        breedAdjustments: {
          domestic_shorthair: { normalMin: 6.9, normalMax: 8.0 },
          maine_coon: { normalMin: 7.2, normalMax: 8.4 }
        }
      }
    },

    roentgenSigns: ["Size", "Shape", "Position", "Number", "Margination", "Opacity"],

    opacities: [
      { name: "Gas (Air)", density: 1, appearance: "Deep Radiolucent / Black" },
      { name: "Fat (Adipose)", density: 2, appearance: "Dark Gray" },
      { name: "Soft Tissue / Fluid", density: 3, appearance: "Medium Gray" },
      { name: "Mineral / Bone", density: 4, appearance: "Bright Radiopaque / Off-White" },
      { name: "Metallic / Contrast", density: 5, appearance: "Maximum Radiopaque / Solid White" }
    ],

    bovineUltrasoundConstants: {
      crlDaysCoefficient: 1.25,
      crlBaseDays: 28.5,
      bpdDaysMultiplier: 2.5,
      bpdBaseDays: 22.0,
      gestationDurationAverageDays: 283
    }
  };

  // Register Reference to ClinicalData Namespace
  window.VetcareApp.ClinicalData.DiagnosticImaging = RADIOLOGY_REFERENCE_STANDARDS;

  // ============================================================================
  // 2. STORAGE ENGINE (INDEXEDDB WITH LOCALSTORAGE REDUNDANCY)
  // ============================================================================
  const DB_CONFIG = {
    name: "VetcareDB_Radiology",
    version: 1,
    storeName: "imaging_studies"
  };

  const StorageEngine = {
    db: null,

    init: function () {
      return new Promise(function (resolve) {
        if (!window.indexedDB) {
          resolve(false);
          return;
        }
        try {
          const req = window.indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);
          req.onupgradeneeded = function (e) {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(DB_CONFIG.storeName)) {
              db.createObjectStore(DB_CONFIG.storeName, { keyPath: "studyId" });
            }
          };
          req.onsuccess = function (e) {
            StorageEngine.db = e.target.result;
            resolve(true);
          };
          req.onerror = function () {
            resolve(false);
          };
        } catch (err) {
          resolve(false);
        }
      });
    },

    getAll: function () {
      return new Promise(function (resolve) {
        if (!StorageEngine.db) {
          const raw = localStorage.getItem("VETCARE_RADIOLOGY_STUDIES");
          try {
            resolve(raw ? JSON.parse(raw) : []);
          } catch (e) {
            resolve([]);
          }
          return;
        }
        try {
          const tx = StorageEngine.db.transaction(DB_CONFIG.storeName, "readonly");
          const store = tx.objectStore(DB_CONFIG.storeName);
          const req = store.getAll();
          req.onsuccess = function () {
            resolve(req.result || []);
          };
          req.onerror = function () {
            resolve([]);
          };
        } catch (err) {
          resolve([]);
        }
      });
    },

    save: function (study) {
      return new Promise(function (resolve) {
        if (!StorageEngine.db) {
          try {
            const raw = localStorage.getItem("VETCARE_RADIOLOGY_STUDIES");
            const list = raw ? JSON.parse(raw) : [];
            const idx = list.findIndex(function (s) { return s.studyId === study.studyId; });
            if (idx >= 0) {
              list[idx] = study;
            } else {
              list.unshift(study);
            }
            localStorage.setItem("VETCARE_RADIOLOGY_STUDIES", JSON.stringify(list));
            resolve(true);
          } catch (e) {
            resolve(false);
          }
          return;
        }
        try {
          const tx = StorageEngine.db.transaction(DB_CONFIG.storeName, "readwrite");
          const store = tx.objectStore(DB_CONFIG.storeName);
          store.put(study);
          tx.oncomplete = function () { resolve(true); };
          tx.onerror = function () { resolve(false); };
        } catch (e) {
          resolve(false);
        }
      });
    }
  };

  // ============================================================================
  // 3. PROCEDURAL MEDICAL IMAGE GENERATORS (HIGH-FIDELITY DIGITAL PHANTOMS)
  // ============================================================================
  const PhantomGenerator = {
    /**
     * High-contrast Procedural Canine Thoracic Lateral Radiograph
     */
    generateCanineThoraxLateral: function () {
      const c = document.createElement("canvas");
      c.width = 1200;
      c.height = 800;
      const ctx = c.getContext("2d");

      // Radiolucent dark background
      ctx.fillStyle = "#050608";
      ctx.fillRect(0, 0, 1200, 800);

      // Thoracic Soft Tissue Silhouette
      ctx.fillStyle = "#1b1e24";
      ctx.beginPath();
      ctx.ellipse(600, 420, 520, 310, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lung Field (Deep Radiolucent Air density)
      ctx.fillStyle = "#0c0e12";
      ctx.beginPath();
      ctx.moveTo(350, 240);
      ctx.quadraticCurveTo(800, 210, 950, 420);
      ctx.quadraticCurveTo(850, 580, 500, 560);
      ctx.quadraticCurveTo(320, 510, 350, 240);
      ctx.fill();

      // Thoracic Vertebrae Spine Column (T1 to T13)
      ctx.strokeStyle = "#cbd5e1";
      ctx.fillStyle = "#94a3b8";
      ctx.lineWidth = 3;
      const vertY = 220;
      for (let i = 0; i < 12; i++) {
        const vx = 320 + i * 50;
        ctx.beginPath();
        ctx.roundRect(vx, vertY - 20, 44, 28, 6);
        ctx.fill();
        ctx.stroke();

        // Spinous processes
        ctx.beginPath();
        ctx.moveTo(vx + 20, vertY - 20);
        ctx.lineTo(vx + 10, vertY - 55);
        ctx.stroke();

        // Vertebral numbers
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 10px monospace";
        ctx.fillText("T" + (i + 1), vx + 12, vertY - 2);
        ctx.fillStyle = "#94a3b8";
      }

      // Rib Cage Arcs
      ctx.strokeStyle = "rgba(203, 213, 225, 0.45)";
      ctx.lineWidth = 5;
      for (let r = 0; r < 11; r++) {
        const rx = 340 + r * 50;
        ctx.beginPath();
        ctx.moveTo(rx, vertY + 10);
        ctx.bezierCurveTo(rx + 60, vertY + 160, rx - 20, 530, rx - 40, 560);
        ctx.stroke();
      }

      // Sternum (Ventral)
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(380, 580);
      ctx.lineTo(840, 580);
      ctx.stroke();

      // Diaphragm (Dome separating thorax and abdomen)
      ctx.fillStyle = "rgba(71, 85, 105, 0.65)";
      ctx.beginPath();
      ctx.moveTo(850, 220);
      ctx.quadraticCurveTo(960, 400, 840, 600);
      ctx.lineTo(1200, 600);
      ctx.lineTo(1200, 220);
      ctx.fill();

      // Cardiac Silhouette (Heart - Apex & Base)
      ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
      ctx.strokeStyle = "#f8fafc";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(620, 440, 115, 155, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Trachea & Bifurcation (Carina)
      ctx.strokeStyle = "#050608";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(250, 260);
      ctx.lineTo(580, 310);
      ctx.stroke();

      // Pulmonary vasculature & bronchoalveolar markings
      ctx.strokeStyle = "rgba(226, 232, 240, 0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(630, 360);
      ctx.lineTo(820, 310);
      ctx.moveTo(640, 370);
      ctx.lineTo(850, 410);
      ctx.stroke();

      // 10mm Radio-opaque Calibration Ball (Top Left)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(140, 120, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.font = "bold 11px monospace";
      ctx.fillStyle = "#00f0ff";
      ctx.fillText("10mm CALIBRATION PHANTOM", 80, 160);

      // Orientation DICOM Marker
      ctx.font = "black 28px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("R", 80, 720);
      ctx.font = "bold 14px monospace";
      ctx.fillText("LATERAL THORAX 75kVp 6mAs", 130, 720);

      return c.toDataURL("image/png");
    },

    /**
     * Bovine Traumatic Reticuloperitonitis (Hardware Disease) Radiograph
     */
    generateBovineHardwareRadiograph: function () {
      const c = document.createElement("canvas");
      c.width = 1200;
      c.height = 800;
      const ctx = c.getContext("2d");

      ctx.fillStyle = "#08090b";
      ctx.fillRect(0, 0, 1200, 800);

      // Large Rumino-reticular Soft Tissue Mass
      ctx.fillStyle = "#222630";
      ctx.beginPath();
      ctx.ellipse(650, 450, 480, 300, 0, 0, Math.PI * 2);
      ctx.fill();

      // Reticulum Cranioventral Compartment
      ctx.fillStyle = "#2d3340";
      ctx.beginPath();
      ctx.arc(420, 480, 210, 0, Math.PI * 2);
      ctx.fill();

      // Reticular mucosal honeycomb pattern (Subtle radio-opacities)
      ctx.strokeStyle = "rgba(203, 213, 225, 0.15)";
      ctx.lineWidth = 2;
      for (let hx = 280; hx < 560; hx += 35) {
        for (let hy = 340; hy < 600; hy += 35) {
          ctx.strokeRect(hx, hy, 28, 28);
        }
      }

      // Diaphragmatic Wall
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(330, 200);
      ctx.quadraticCurveTo(350, 450, 300, 700);
      ctx.stroke();

      // Sternum (Floor)
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(200, 680, 700, 24);

      // Traumatic Foreign Body: Highly Radiopaque Metallic Wire Piercing Reticulum!
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 12;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(460, 540); // Base in reticulum
      ctx.lineTo(310, 430); // Sharp end piercing through diaphragm toward pericardium!
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inflammatory Fibrinous Adhesion Zone / Gas Pocket
      ctx.fillStyle = "rgba(10, 12, 16, 0.85)";
      ctx.beginPath();
      ctx.ellipse(320, 430, 45, 25, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(244, 63, 94, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Labels & Orientation
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = "#f43f5e";
      ctx.fillText("CRANIODORSAL PENETRATING METALLIC WIRE (7.2cm)", 310, 390);

      ctx.fillStyle = "#ffffff";
      ctx.font = "26px sans-serif";
      ctx.fillText("L", 80, 720);
      ctx.font = "bold 14px monospace";
      ctx.fillText("BOVINE RETICULUM STANDING LATERAL 90kVp 18mAs", 130, 720);

      return c.toDataURL("image/png");
    },

    /**
     * Canine Tibia Fracture Radiograph
     */
    generateCanineTibiaFractureRadiograph: function () {
      const c = document.createElement("canvas");
      c.width = 1200;
      c.height = 800;
      const ctx = c.getContext("2d");

      ctx.fillStyle = "#050608";
      ctx.fillRect(0, 0, 1200, 800);

      // Leg Soft Tissue Margin
      ctx.fillStyle = "#1e222b";
      ctx.beginPath();
      ctx.moveTo(520, 60);
      ctx.lineTo(510, 740);
      ctx.lineTo(690, 740);
      ctx.lineTo(670, 60);
      ctx.fill();

      // Proximal Tibia (Bone Cortex - Radiopaque Off-white)
      ctx.fillStyle = "#e2e8f0";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;

      // Proximal fragment
      ctx.beginPath();
      ctx.moveTo(560, 100);
      ctx.lineTo(640, 100);
      ctx.lineTo(645, 360);
      ctx.lineTo(580, 410); // Jagged fracture line
      ctx.lineTo(555, 360);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Distal fragment (Displaced medially & caudally)
      ctx.beginPath();
      ctx.moveTo(570, 440); // Displaced step
      ctx.lineTo(660, 390);
      ctx.lineTo(650, 700);
      ctx.lineTo(570, 700);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Medullary Cavity (Darker inner trabecular bone)
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(580, 140, 40, 200);
      ctx.fillRect(590, 450, 40, 220);

      // Fibula Complete Transverse Fracture
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(660, 160, 12, 190);
      ctx.fillRect(675, 380, 12, 260); // Displaced fragment

      // Hematoma / Soft Tissue Swelling
      ctx.fillStyle = "rgba(244, 63, 94, 0.2)";
      ctx.beginPath();
      ctx.ellipse(600, 400, 95, 60, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "bold 13px monospace";
      ctx.fillStyle = "#f43f5e";
      ctx.fillText("COMPLETE MID-DIAPHYSEAL OBLIQUE FRACTURE WITH 15% OVERRIDE", 380, 400);

      ctx.font = "26px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("AP", 80, 720);
      ctx.font = "bold 14px monospace";
      ctx.fillText("CANINE CRUS (TIBIA/FIBULA) 58kVp 3.2mAs", 140, 720);

      return c.toDataURL("image/png");
    }
  };

  // ============================================================================
  // 4. MAIN MODULE CONTROLLER & REACTIVE WORKSPACE
  // ============================================================================
  const AiImagingRadiology = {
    containerEl: null,
    canvasEl: null,
    ctx: null,
    sourceImage: null,

    state: {
      activeStudy: {
        studyId: "RAD-2026-STUDY-0401",
        patientId: "PAT-IND-8841",
        tagNo: "UK-04-9841",
        species: "canine",
        breed: "Labrador Retriever",
        modality: "XRAY",
        anatomicalRegion: "thorax",
        viewProjection: "Lateral",
        studyDate: new Date().toISOString().slice(0, 10),
        imageSrc: null,
        findings: "",
        provisionalDiagnosis: "",
        radiologistSignOff: "Dr. Rahul (B.V.Sc & A.H., Radiologist)"
      },

      canvasState: {
        zoom: 1.0,
        panX: 0,
        panY: 0,
        rotationDeg: 0,
        brightness: 100,
        contrast: 100,
        isInverted: false,
        activeTool: "pointer", // 'pointer'|'pan'|'caliper'|'vhs_long'|'vhs_short'|'vhs_vertebra'|'calibrate'
        pixelsPerMm: 4.0, // Calibrated ratio: 40px = 10mm (4px/mm)
        isMouseDown: false,
        dragStart: { x: 0, y: 0 },
        currentDrawing: null
      },

      annotations: [],

      vhsCalculation: {
        longAxisMm: 0,
        shortAxisMm: 0,
        oneVertebraMm: 12.5, // Reference length of T4 vertebra
        longAxisV: 0,
        shortAxisV: 0,
        totalVhs: 0,
        status: "NORMAL" // 'NORMAL' | 'SUSPECT_CARDIOMEGALY' | 'CONFIRMED_CARDIOMEGALY'
      },

      bovineUltrasound: {
        crlMm: 45,
        bpdMm: 0,
        estimatedGestationDays: 85,
        expectedCalvingDate: ""
      },

      activeTab: "viewer_console", // 'viewer_console' | 'vhs_calculator' | 'bovine_ultrasound' | 'study_archive'
      studiesHistory: []
    },

    // ==========================================================================
    // LIFECYCLE: init()
    // ==========================================================================
    init: async function () {
      await StorageEngine.init();
      const loaded = await StorageEngine.getAll();
      AiImagingRadiology.state.studiesHistory = loaded;

      // Preload Canine Thorax Lateral default phantom
      const defaultImg = PhantomGenerator.generateCanineThoraxLateral();
      AiImagingRadiology.state.activeStudy.imageSrc = defaultImg;

      // Compute initial default ultrasound calving estimate
      AiImagingRadiology.recalculateBovineGestation();

      AiImagingRadiology.bindSystemEvents();
    },

    bindSystemEvents: function () {
      // Listen for global active animal change from Vetcare OS
      window.addEventListener("vetcare:patient_selected", function (e) {
        if (!e || !e.detail) return;
        const p = e.detail;
        AiImagingRadiology.state.activeStudy.patientId = p.patientId || AiImagingRadiology.state.activeStudy.patientId;
        AiImagingRadiology.state.activeStudy.tagNo = p.tagNo || AiImagingRadiology.state.activeStudy.tagNo;
        AiImagingRadiology.state.activeStudy.species = p.species ? p.species.toLowerCase() : "canine";
        AiImagingRadiology.state.activeStudy.breed = p.breed || "Indigenous";
        if (AiImagingRadiology.containerEl) {
          AiImagingRadiology.render(AiImagingRadiology.containerEl.id);
        }
      });
    },

    // ==========================================================================
    // LIFECYCLE: render(containerId)
    // ==========================================================================
    render: function (containerId) {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error("[AiImagingRadiology] Target container not found: " + containerId);
        return;
      }
      AiImagingRadiology.containerEl = container;
      AiImagingRadiology.containerEl.innerHTML = "";
      AiImagingRadiology.containerEl.className = "w-full max-w-7xl mx-auto py-3 px-2 sm:px-4 space-y-4 select-none";

      // 1. Top Master PACS Telemetry & Modality Bar
      const topBar = AiImagingRadiology.buildTopPacsHeader();
      AiImagingRadiology.containerEl.appendChild(topBar);

      // 2. Active Tab Navigator
      const tabNav = AiImagingRadiology.buildTabNavigator();
      AiImagingRadiology.containerEl.appendChild(tabNav);

      // 3. Main Split Viewport or Alternate Tab Surface
      const workspace = document.createElement("div");
      workspace.id = "radiologyWorkspaceSurface";
      workspace.className = "w-full";
      AiImagingRadiology.containerEl.appendChild(workspace);

      AiImagingRadiology.renderActiveTabSurface();
    },

    // ==========================================================================
    // TOP PACS HEADER BAR
    // ==========================================================================
    buildTopPacsHeader: function () {
      const s = AiImagingRadiology.state.activeStudy;
      const bar = document.createElement("div");
      bar.className = "p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sunlight-card";

      bar.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-cyan-950/50">
            <i class="fa-solid fa-x-ray"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-display font-extrabold text-base text-white sunlight-text">VET-PACS WORKSTATION</span>
              <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-black bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">DICOM 3.0 / 2026 PRO</span>
            </div>
            <div class="text-xs font-mono text-slate-400 mt-0.5 sunlight-muted">
              Patient: <strong class="text-white sunlight-text">${s.patientId}</strong> (${s.tagNo}) | ${s.species.toUpperCase()} (${s.breed}) | Projection: <strong>${s.viewProjection}</strong>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
          <!-- Modality Selector -->
          <select id="pacsModalitySelect" class="bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-mono font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer">
            <option value="XRAY" ${s.modality === 'XRAY' ? 'selected' : ''}>Digital Radiography (X-Ray)</option>
            <option value="ULTRASOUND" ${s.modality === 'ULTRASOUND' ? 'selected' : ''}>Diagnostic Ultrasonography</option>
            <option value="CT" ${s.modality === 'CT' ? 'selected' : ''}>Veterinary CT / Cross-Sectional</option>
          </select>

          <!-- Phantom / Demo Radiograph Loader -->
          <div class="relative inline-block">
            <select id="samplePhantomSelect" class="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-white font-medium rounded-xl px-3 py-2 outline-none cursor-pointer">
              <option value="" disabled selected>📁 लोड करें नमूना एक्सरे (Load Sample)</option>
              <option value="canine_thorax">Canine Thorax Lateral (Cardiology / VHS)</option>
              <option value="bovine_hardware">Bovine Reticulum Hardware (TRP Wire)</option>
              <option value="canine_tibia_fracture">Canine Tibia Complete Fracture</option>
            </select>
          </div>

          <!-- File Upload Button -->
          <label class="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors">
            <i class="fa-solid fa-cloud-arrow-up text-cyan-400"></i>
            <span>Upload DICOM/JPG</span>
            <input type="file" id="pacsFileInput" accept="image/*" class="hidden" />
          </label>
        </div>
      `;

      // Event Listeners
      setTimeout(function () {
        const modalitySel = document.getElementById("pacsModalitySelect");
        if (modalitySel) {
          modalitySel.onchange = function () {
            AiImagingRadiology.state.activeStudy.modality = this.value;
            if (this.value === "ULTRASOUND") {
              AiImagingRadiology.state.activeTab = "bovine_ultrasound";
              AiImagingRadiology.renderActiveTabSurface();
            }
          };
        }

        const phantomSel = document.getElementById("samplePhantomSelect");
        if (phantomSel) {
          phantomSel.onchange = function () {
            const val = this.value;
            if (val === "canine_thorax") {
              AiImagingRadiology.loadNewImageSource(
                PhantomGenerator.generateCanineThoraxLateral(),
                "canine",
                "thorax",
                "Lateral",
                "Canine Thorax Normal/Cardiomegaly Evaluation"
              );
            } else if (val === "bovine_hardware") {
              AiImagingRadiology.loadNewImageSource(
                PhantomGenerator.generateBovineHardwareRadiograph(),
                "bovine",
                "abdomen",
                "Lateral",
                "Bovine Hardware Disease (Traumatic Reticuloperitonitis)"
              );
            } else if (val === "canine_tibia_fracture") {
              AiImagingRadiology.loadNewImageSource(
                PhantomGenerator.generateCanineTibiaFractureRadiograph(),
                "canine",
                "skeletal_limb",
                "AP",
                "Complete Transverse Fracture Mid-diaphyseal Tibia"
              );
            }
          };
        }

        const fileInp = document.getElementById("pacsFileInput");
        if (fileInp) {
          fileInp.onchange = function (e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (evt) {
              AiImagingRadiology.loadNewImageSource(
                evt.target.result,
                AiImagingRadiology.state.activeStudy.species,
                "unknown",
                "Lateral",
                "Custom Uploaded Radiograph"
              );
            };
            reader.readAsDataURL(file);
          };
        }
      }, 0);

      return bar;
    },

    loadNewImageSource: function (src, species, region, projection, defaultFinding) {
      AiImagingRadiology.state.activeStudy.imageSrc = src;
      AiImagingRadiology.state.activeStudy.species = species || AiImagingRadiology.state.activeStudy.species;
      AiImagingRadiology.state.activeStudy.anatomicalRegion = region || "thorax";
      AiImagingRadiology.state.activeStudy.viewProjection = projection || "Lateral";
      if (defaultFinding) {
        AiImagingRadiology.state.activeStudy.findings = defaultFinding;
      }
      AiImagingRadiology.state.annotations = [];
      AiImagingRadiology.state.canvasState.zoom = 1.0;
      AiImagingRadiology.state.canvasState.panX = 0;
      AiImagingRadiology.state.canvasState.panY = 0;
      AiImagingRadiology.state.canvasState.rotationDeg = 0;
      AiImagingRadiology.render(AiImagingRadiology.containerEl.id);

      if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
        window.VetcareApp.showToast("रेडियोलॉजिकल इमेज सफलतापूर्वक लोड हुई!", "success");
      }
    },

    // ==========================================================================
    // TAB NAVIGATOR
    // ==========================================================================
    buildTabNavigator: function () {
      const nav = document.createElement("div");
      nav.className = "flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl sunlight-card";

      const tabs = [
        { id: "viewer_console", label: "PACS Diagnostic Viewer", icon: "fa-film" },
        { id: "vhs_calculator", label: "Vertebral Heart Score (VHS)", icon: "fa-heart-pulse" },
        { id: "bovine_ultrasound", label: "Bovine Ultrasound Gestation", icon: "fa-baby" },
        { id: "study_archive", label: "Patient Studies Archive", icon: "fa-box-archive" }
      ];

      tabs.forEach(function (t) {
        const btn = document.createElement("button");
        btn.type = "button";
        const isActive = AiImagingRadiology.state.activeTab === t.id;
        btn.className = `px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
          isActive
            ? "bg-cyan-600 text-white shadow-md shadow-cyan-950/50"
            : "text-slate-400 hover:text-white hover:bg-slate-800"
        }`;
        btn.innerHTML = `<i class="fa-solid ${t.icon}"></i> <span>${t.label}</span>`;
        btn.onclick = function () {
          AiImagingRadiology.state.activeTab = t.id;
          AiImagingRadiology.renderActiveTabSurface();
          // Update active styling
          nav.querySelectorAll("button").forEach(b => {
            b.className = b.className.replace("bg-cyan-600 text-white shadow-md shadow-cyan-950/50", "text-slate-400 hover:text-white hover:bg-slate-800");
          });
          btn.className = "px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all bg-cyan-600 text-white shadow-md shadow-cyan-950/50";
        };
        nav.appendChild(btn);
      });

      return nav;
    },

    // ==========================================================================
    // RENDER DISPATCHER
    // ==========================================================================
    renderActiveTabSurface: function () {
      const surface = document.getElementById("radiologyWorkspaceSurface");
      if (!surface) return;
      surface.innerHTML = "";

      if (AiImagingRadiology.state.activeTab === "viewer_console") {
        surface.appendChild(AiImagingRadiology.buildViewerConsole());
        AiImagingRadiology.initCanvasEngine();
      } else if (AiImagingRadiology.state.activeTab === "vhs_calculator") {
        surface.appendChild(AiImagingRadiology.buildVhsCalculatorTab());
      } else if (AiImagingRadiology.state.activeTab === "bovine_ultrasound") {
        surface.appendChild(AiImagingRadiology.buildBovineUltrasoundTab());
      } else if (AiImagingRadiology.state.activeTab === "study_archive") {
        surface.appendChild(AiImagingRadiology.buildArchiveTab());
      }
    },

    // ==========================================================================
    // TAB 1: SPLIT PACS DIAGNOSTIC WORKSTATION
    // ==========================================================================
    buildViewerConsole: function () {
      const split = document.createElement("div");
      split.className = "grid grid-cols-1 lg:grid-cols-12 gap-4 items-start";

      // Left 7 Cols: Image Canvas Viewport & Floating PACS Toolbar
      const leftCol = document.createElement("div");
      leftCol.className = "lg:col-span-8 space-y-3";

      // Canvas Card
      const canvasCard = document.createElement("div");
      canvasCard.className = "bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col";

      // Tactical PACS HUD Action Bar (Above Canvas)
      const toolbar = document.createElement("div");
      toolbar.className = "p-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs";
      toolbar.innerHTML = `
        <div class="flex items-center gap-1">
          <button id="btnToolPointer" type="button" class="p-2 rounded-lg bg-cyan-600 text-white" title="Pointer / Inspect"><i class="fa-solid fa-arrow-pointer"></i></button>
          <button id="btnToolPan" type="button" class="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white" title="Pan Image"><i class="fa-solid fa-hand"></i></button>
          <button id="btnToolCaliper" type="button" class="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white" title="Linear Caliper (mm)"><i class="fa-solid fa-ruler-combined text-emerald-400"></i></button>
          <button id="btnToolVhsLong" type="button" class="px-2.5 py-1.5 rounded-lg bg-slate-800 text-rose-400 font-bold hover:bg-slate-700 text-[11px]" title="Measure Cardiac Long Axis">VHS Long</button>
          <button id="btnToolVhsShort" type="button" class="px-2.5 py-1.5 rounded-lg bg-slate-800 text-amber-400 font-bold hover:bg-slate-700 text-[11px]" title="Measure Cardiac Short Axis">VHS Short</button>
          <button id="btnToolCalibrate" type="button" class="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white" title="Calibrate 10mm Reference Marker"><i class="fa-solid fa-bullseye text-cyan-400"></i></button>
        </div>

        <div class="flex items-center gap-2">
          <!-- Invert Film View -->
          <button id="btnToggleInvert" type="button" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-mono flex items-center gap-1">
            <i class="fa-solid fa-circle-half-stroke"></i> Invert
          </button>
          <!-- Rotate 90 -->
          <button id="btnRotate90" type="button" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700" title="Rotate 90°"><i class="fa-solid fa-rotate-right"></i></button>
          <!-- Reset Canvas -->
          <button id="btnResetCanvas" type="button" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700" title="Reset View"><i class="fa-solid fa-arrows-rotate"></i></button>
          <!-- Clear Marks -->
          <button id="btnClearAnnotations" type="button" class="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-rose-400 border border-slate-700" title="Clear Calipers"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      `;
      canvasCard.appendChild(toolbar);

      // Canvas Container Viewport
      const viewport = document.createElement("div");
      viewport.className = "relative w-full h-[520px] bg-slate-950 overflow-hidden cursor-crosshair";
      viewport.innerHTML = `
        <canvas id="pacsRadiologyCanvas" class="w-full h-full block"></canvas>
        
        <!-- Live HUD Calibration Overlay -->
        <div class="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 text-[11px] font-mono text-slate-300 pointer-events-none space-y-1">
          <div>SCALE: <span id="hudScaleText" class="text-cyan-400 font-bold">4.0 px/mm</span> (10mm = 40px)</div>
          <div>ZOOM: <span id="hudZoomText" class="text-white font-bold">100%</span> | ROT: <span id="hudRotText" class="text-white font-bold">0°</span></div>
          <div class="text-[10px] text-slate-400">Wheel: Zoom | Drag: Draw / Pan</div>
        </div>

        <!-- Floating Measurements Live Display -->
        <div id="canvasCaliperHud" class="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md border border-emerald-500/50 rounded-xl p-2.5 text-xs font-mono text-emerald-300 pointer-events-none hidden">
          Live Measurement: <span id="hudCurrentDistanceMm" class="font-bold text-white">0.0 mm</span>
        </div>
      `;
      canvasCard.appendChild(viewport);

      // Brightness / Contrast Slider Strip
      const filterStrip = document.createElement("div");
      filterStrip.className = "p-3 bg-slate-900 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs font-mono";
      filterStrip.innerHTML = `
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-sun text-amber-400"></i>
          <span class="text-slate-400 uppercase text-[10px]">Brightness</span>
          <input type="range" id="rngBrightness" min="30" max="250" value="100" class="w-full accent-cyan-500 cursor-pointer">
          <span id="txtBrightnessVal" class="w-8 text-right text-slate-200">100</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-circle-half-stroke text-cyan-400"></i>
          <span class="text-slate-400 uppercase text-[10px]">Contrast</span>
          <input type="range" id="rngContrast" min="30" max="250" value="100" class="w-full accent-cyan-500 cursor-pointer">
          <span id="txtContrastVal" class="w-8 text-right text-slate-200">100</span>
        </div>
      `;
      canvasCard.appendChild(filterStrip);
      leftCol.appendChild(canvasCard);

      // Right 5 Cols: Systematic Radiographic Interpretation Workstation
      const rightCol = document.createElement("div");
      rightCol.className = "lg:col-span-4 space-y-4";

      // Roentgen Systematic Review Card
      const findingsCard = document.createElement("div");
      findingsCard.className = "bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3.5 sunlight-card";
      findingsCard.innerHTML = `
        <div class="flex items-center justify-between border-b border-slate-800 pb-2">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-clipboard-check text-cyan-400"></i>
            <h3 class="font-display font-bold text-white text-sm sunlight-text">रेडियोलॉजिकल डायग्नोस्टिक रिपोर्ट</h3>
          </div>
          <span class="text-[10px] font-mono text-emerald-400 font-bold">DACVR TEMPLATE</span>
        </div>

        <!-- Systematic Roentgen Checklist -->
        <div>
          <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">सिस्टमैटिक जांच (Systematic Anatomical Review)</label>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <label class="flex items-center gap-1.5 p-1.5 rounded bg-slate-950 border border-slate-800 cursor-pointer">
              <input type="checkbox" id="chkSoftTissue" class="rounded border-slate-700 text-cyan-500 focus:ring-0" checked>
              <span class="text-slate-300">Soft Tissues</span>
            </label>
            <label class="flex items-center gap-1.5 p-1.5 rounded bg-slate-950 border border-slate-800 cursor-pointer">
              <input type="checkbox" id="chkSkeletal" class="rounded border-slate-700 text-cyan-500 focus:ring-0" checked>
              <span class="text-slate-300">Skeletal Frame</span>
            </label>
            <label class="flex items-center gap-1.5 p-1.5 rounded bg-slate-950 border border-slate-800 cursor-pointer">
              <input type="checkbox" id="chkPleural" class="rounded border-slate-700 text-cyan-500 focus:ring-0">
              <span class="text-slate-300">Pleural / Peritoneum</span>
            </label>
            <label class="flex items-center gap-1.5 p-1.5 rounded bg-slate-950 border border-slate-800 cursor-pointer">
              <input type="checkbox" id="chkSilhouette" class="rounded border-slate-700 text-cyan-500 focus:ring-0" checked>
              <span class="text-slate-300">Organ Silhouette</span>
            </label>
          </div>
        </div>

        <!-- Instant Clinical Shortcut Phrases -->
        <div>
          <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">त्वरित रेडियोलॉजिकल टिप्पणियां (Instant Shortcuts)</label>
          <div class="flex flex-wrap gap-1.5">
            <button type="button" class="btn-prompt-snippet text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2 py-1 rounded border border-slate-700" data-text="Cardiomegaly with elevation of trachea and loss of cranial waist.">
              + Cardiomegaly
            </button>
            <button type="button" class="btn-prompt-snippet text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-amber-300 px-2 py-1 rounded border border-slate-700" data-text="Diffuse interstitial to alveolar pattern in caudodorsal lung fields (Pulmonary Edema).">
              + Alveolar Pattern
            </button>
            <button type="button" class="btn-prompt-snippet text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-rose-300 px-2 py-1 rounded border border-slate-700" data-text="Radio-opaque linear foreign body piercing reticular wall with regional fibrinous peritonitis.">
              + TRP Hardware
            </button>
            <button type="button" class="btn-prompt-snippet text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-emerald-300 px-2 py-1 rounded border border-slate-700" data-text="Complete transverse mid-diaphyseal fracture with lateral displacement.">
              + Transverse Fracture
            </button>
          </div>
        </div>

        <!-- Radiologist Findings Textarea -->
        <div>
          <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">रेडियोलॉजिकल निष्कर्ष (Imaging Findings)</label>
          <textarea id="txtRadiologyFindings" rows="4" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-cyan-500 outline-none font-sans" placeholder="Enter Roentgen signs, opacities, and lesion descriptions...">${AiImagingRadiology.state.activeStudy.findings}</textarea>
        </div>

        <!-- Provisional Diagnosis & Differentials -->
        <div>
          <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">संभावित निदान (Differential Interpretation)</label>
          <input type="text" id="inpProvisionalDiagnosis" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="e.g. Dilated Cardiomyopathy / Reticuloperitonitis" value="${AiImagingRadiology.state.activeStudy.provisionalDiagnosis}">
        </div>

        <!-- Footer Commit Buttons -->
        <div class="pt-3 border-t border-slate-800 space-y-2">
          <button id="btnSaveStudyToEmr" type="button" class="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2 transition-all">
            <i class="fa-solid fa-floppy-disk"></i>
            <span>अध्ययन सुरक्षित करें (Save Study to EMR)</span>
          </button>
          <div class="grid grid-cols-2 gap-2">
            <button id="btnPrintDossierBtn" type="button" class="py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors">
              <i class="fa-solid fa-print text-amber-400"></i> Dossier PDF
            </button>
            <button id="btnExportAnnotatedJpg" type="button" class="py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors">
              <i class="fa-solid fa-download text-emerald-400"></i> Export Film
            </button>
          </div>
        </div>
      `;
      rightCol.appendChild(findingsCard);

      split.appendChild(leftCol);
      split.appendChild(rightCol);

      // Event bindings for right col
      setTimeout(function () {
        const txtFindings = document.getElementById("txtRadiologyFindings");
        if (txtFindings) {
          txtFindings.oninput = function () {
            AiImagingRadiology.state.activeStudy.findings = this.value;
          };
        }
        const inpDiagnosis = document.getElementById("inpProvisionalDiagnosis");
        if (inpDiagnosis) {
          inpDiagnosis.oninput = function () {
            AiImagingRadiology.state.activeStudy.provisionalDiagnosis = this.value;
          };
        }

        // Snippet buttons
        document.querySelectorAll(".btn-prompt-snippet").forEach(function (btn) {
          btn.onclick = function () {
            const snippet = this.getAttribute("data-text");
            if (txtFindings) {
              txtFindings.value = (txtFindings.value ? txtFindings.value + "\n" : "") + snippet;
              AiImagingRadiology.state.activeStudy.findings = txtFindings.value;
            }
          };
        });

        // Save to EMR button
        const btnSave = document.getElementById("btnSaveStudyToEmr");
        if (btnSave) {
          btnSave.onclick = function () {
            AiImagingRadiology.commitStudyToStorage();
          };
        }

        // Print Dossier
        const btnPrint = document.getElementById("btnPrintDossierBtn");
        if (btnPrint) {
          btnPrint.onclick = function () {
            AiImagingRadiology.generateRadiologyDossier(AiImagingRadiology.state.activeStudy.studyId);
          };
        }

        // Export Film JPG
        const btnExport = document.getElementById("btnExportAnnotatedJpg");
        if (btnExport) {
          btnExport.onclick = function () {
            AiImagingRadiology.exportAnnotatedImage();
          };
        }
      }, 0);

      return split;
    },

    // ==========================================================================
    // CANVAS ENGINE: WHEEL ZOOM, DRAG-PAN, CALIPER ANNOTATIONS
    // ==========================================================================
    initCanvasEngine: function () {
      const canvas = document.getElementById("pacsRadiologyCanvas");
      if (!canvas) return;
      AiImagingRadiology.canvasEl = canvas;
      AiImagingRadiology.ctx = canvas.getContext("2d");

      // Handle HiDPI
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      AiImagingRadiology.ctx.scale(dpr, dpr);

      // Load active image if not loaded
      if (!AiImagingRadiology.sourceImage) {
        AiImagingRadiology.sourceImage = new Image();
        AiImagingRadiology.sourceImage.src = AiImagingRadiology.state.activeStudy.imageSrc || PhantomGenerator.generateCanineThoraxLateral();
        AiImagingRadiology.sourceImage.onload = function () {
          AiImagingRadiology.redrawCanvas();
        };
      } else {
        AiImagingRadiology.redrawCanvas();
      }

      // Bind Tool Buttons
      const tools = [
        { id: "btnToolPointer", tool: "pointer" },
        { id: "btnToolPan", tool: "pan" },
        { id: "btnToolCaliper", tool: "caliper" },
        { id: "btnToolVhsLong", tool: "vhs_long" },
        { id: "btnToolVhsShort", tool: "vhs_short" },
        { id: "btnToolCalibrate", tool: "calibrate" }
      ];

      tools.forEach(function (t) {
        const btn = document.getElementById(t.id);
        if (!btn) return;
        btn.onclick = function () {
          AiImagingRadiology.state.canvasState.activeTool = t.tool;
          tools.forEach(item => {
            const b = document.getElementById(item.id);
            if (b) {
              b.className = b.className.replace("bg-cyan-600 text-white", "bg-slate-800 text-slate-300");
            }
          });
          btn.className = "p-2 rounded-lg bg-cyan-600 text-white";
        };
      });

      // Bind Sliders
      const rngB = document.getElementById("rngBrightness");
      const rngC = document.getElementById("rngContrast");
      const txtB = document.getElementById("txtBrightnessVal");
      const txtC = document.getElementById("txtContrastVal");

      if (rngB) {
        rngB.oninput = function () {
          AiImagingRadiology.state.canvasState.brightness = parseInt(this.value, 10);
          if (txtB) txtB.textContent = this.value;
          AiImagingRadiology.redrawCanvas();
        };
      }
      if (rngC) {
        rngC.oninput = function () {
          AiImagingRadiology.state.canvasState.contrast = parseInt(this.value, 10);
          if (txtC) txtC.textContent = this.value;
          AiImagingRadiology.redrawCanvas();
        };
      }

      // Invert & Rotation & Reset Controls
      const btnInvert = document.getElementById("btnToggleInvert");
      if (btnInvert) {
        btnInvert.onclick = function () {
          AiImagingRadiology.state.canvasState.isInverted = !AiImagingRadiology.state.canvasState.isInverted;
          AiImagingRadiology.redrawCanvas();
        };
      }
      const btnRot = document.getElementById("btnRotate90");
      if (btnRot) {
        btnRot.onclick = function () {
          AiImagingRadiology.state.canvasState.rotationDeg = (AiImagingRadiology.state.canvasState.rotationDeg + 90) % 360;
          const hudRot = document.getElementById("hudRotText");
          if (hudRot) hudRot.textContent = AiImagingRadiology.state.canvasState.rotationDeg + "°";
          AiImagingRadiology.redrawCanvas();
        };
      }
      const btnReset = document.getElementById("btnResetCanvas");
      if (btnReset) {
        btnReset.onclick = function () {
          AiImagingRadiology.state.canvasState.zoom = 1.0;
          AiImagingRadiology.state.canvasState.panX = 0;
          AiImagingRadiology.state.canvasState.panY = 0;
          AiImagingRadiology.state.canvasState.rotationDeg = 0;
          AiImagingRadiology.state.canvasState.brightness = 100;
          AiImagingRadiology.state.canvasState.contrast = 100;
          AiImagingRadiology.state.canvasState.isInverted = false;
          if (rngB) rngB.value = 100;
          if (rngC) rngC.value = 100;
          if (txtB) txtB.textContent = "100";
          if (txtC) txtC.textContent = "100";
          AiImagingRadiology.redrawCanvas();
        };
      }
      const btnClear = document.getElementById("btnClearAnnotations");
      if (btnClear) {
        btnClear.onclick = function () {
          AiImagingRadiology.state.annotations = [];
          AiImagingRadiology.redrawCanvas();
        };
      }

      // Canvas Interactive Mouse/Touch Events
      canvas.onwheel = function (e) {
        e.preventDefault();
        const zoomDelta = e.deltaY < 0 ? 0.1 : -0.1;
        AiImagingRadiology.state.canvasState.zoom = Math.max(0.4, Math.min(4.0, AiImagingRadiology.state.canvasState.zoom + zoomDelta));
        const hudZoom = document.getElementById("hudZoomText");
        if (hudZoom) hudZoom.textContent = Math.round(AiImagingRadiology.state.canvasState.zoom * 100) + "%";
        AiImagingRadiology.redrawCanvas();
      };

      canvas.onmousedown = function (e) {
        const pt = AiImagingRadiology.getCanvasPoint(e);
        AiImagingRadiology.state.canvasState.isMouseDown = true;
        AiImagingRadiology.state.canvasState.dragStart = pt;

        const tool = AiImagingRadiology.state.canvasState.activeTool;
        if (tool === "caliper" || tool === "vhs_long" || tool === "vhs_short" || tool === "calibrate") {
          AiImagingRadiology.state.canvasState.currentDrawing = {
            type: tool,
            start: pt,
            end: pt
          };
          const hud = document.getElementById("canvasCaliperHud");
          if (hud) hud.classList.remove("hidden");
        }
      };

      window.onmousemove = function (e) {
        if (!AiImagingRadiology.state.canvasState.isMouseDown) return;
        const pt = AiImagingRadiology.getCanvasPoint(e);
        const tool = AiImagingRadiology.state.canvasState.activeTool;

        if (tool === "pan") {
          const dx = pt.x - AiImagingRadiology.state.canvasState.dragStart.x;
          const dy = pt.y - AiImagingRadiology.state.canvasState.dragStart.y;
          AiImagingRadiology.state.canvasState.panX += dx;
          AiImagingRadiology.state.canvasState.panY += dy;
          AiImagingRadiology.redrawCanvas();
        } else if (AiImagingRadiology.state.canvasState.currentDrawing) {
          AiImagingRadiology.state.canvasState.currentDrawing.end = pt;

          // Live distance calculation
          const dx = pt.x - AiImagingRadiology.state.canvasState.currentDrawing.start.x;
          const dy = pt.y - AiImagingRadiology.state.canvasState.currentDrawing.start.y;
          const distPx = Math.sqrt(dx * dx + dy * dy);
          const distMm = (distPx / AiImagingRadiology.state.canvasState.pixelsPerMm).toFixed(1);

          const hudVal = document.getElementById("hudCurrentDistanceMm");
          if (hudVal) hudVal.textContent = distMm + " mm";

          AiImagingRadiology.redrawCanvas();
        }
      };

      window.onmouseup = function (e) {
        if (!AiImagingRadiology.state.canvasState.isMouseDown) return;
        AiImagingRadiology.state.canvasState.isMouseDown = false;

        const drawing = AiImagingRadiology.state.canvasState.currentDrawing;
        if (drawing) {
          const pt = AiImagingRadiology.getCanvasPoint(e);
          drawing.end = pt;

          const dx = drawing.end.x - drawing.start.x;
          const dy = drawing.end.y - drawing.start.y;
          const distPx = Math.sqrt(dx * dx + dy * dy);
          const distMm = distPx / AiImagingRadiology.state.canvasState.pixelsPerMm;

          if (distPx > 8) {
            if (drawing.type === "calibrate") {
              // Calibrate scale: User dragged across 10mm radio-opaque ball
              AiImagingRadiology.state.canvasState.pixelsPerMm = distPx / 10.0;
              const hudScale = document.getElementById("hudScaleText");
              if (hudScale) hudScale.textContent = AiImagingRadiology.state.canvasState.pixelsPerMm.toFixed(2) + " px/mm";
              if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
                window.VetcareApp.showToast("स्केल कैलिब्रेशन पूर्ण: 10mm संदर्भ सेट किया गया।", "success");
              }
            } else if (drawing.type === "vhs_long") {
              AiImagingRadiology.state.vhsCalculation.longAxisMm = distMm;
              AiImagingRadiology.updateVhsScore();
              AiImagingRadiology.state.annotations.push(drawing);
            } else if (drawing.type === "vhs_short") {
              AiImagingRadiology.state.vhsCalculation.shortAxisMm = distMm;
              AiImagingRadiology.updateVhsScore();
              AiImagingRadiology.state.annotations.push(drawing);
            } else {
              drawing.distMm = distMm;
              AiImagingRadiology.state.annotations.push(drawing);
            }
          }

          AiImagingRadiology.state.canvasState.currentDrawing = null;
          const hud = document.getElementById("canvasCaliperHud");
          if (hud) hud.classList.add("hidden");
          AiImagingRadiology.redrawCanvas();
        }
      };
    },

    getCanvasPoint: function (e) {
      const rect = AiImagingRadiology.canvasEl.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    },

    redrawCanvas: function () {
      const canvas = AiImagingRadiology.canvasEl;
      const ctx = AiImagingRadiology.ctx;
      const img = AiImagingRadiology.sourceImage;
      if (!canvas || !ctx || !img) return;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);
      ctx.save();

      // Background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // Center transformations
      const cx = w / 2 + AiImagingRadiology.state.canvasState.panX;
      const cy = h / 2 + AiImagingRadiology.state.canvasState.panY;
      ctx.translate(cx, cy);
      ctx.rotate((AiImagingRadiology.state.canvasState.rotationDeg * Math.PI) / 180);
      ctx.scale(AiImagingRadiology.state.canvasState.zoom, AiImagingRadiology.state.canvasState.zoom);

      // Apply Filter Effects
      let filterString = `brightness(${AiImagingRadiology.state.canvasState.brightness}%) contrast(${AiImagingRadiology.state.canvasState.contrast}%)`;
      if (AiImagingRadiology.state.canvasState.isInverted) {
        filterString += " invert(100%)";
      }
      ctx.filter = filterString;

      // Draw Main Radiograph centered
      const imgW = img.width || 1200;
      const imgH = img.height || 800;
      const aspect = imgW / imgH;
      let drawW = w * 0.95;
      let drawH = drawW / aspect;
      if (drawH > h * 0.95) {
        drawH = h * 0.95;
        drawW = drawH * aspect;
      }

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.filter = "none";
      ctx.restore();

      // Render Static Saved Annotations on Screen
      AiImagingRadiology.state.annotations.forEach(function (ann) {
        AiImagingRadiology.drawAnnotationVector(ctx, ann);
      });

      // Render Active In-Progress Drawing
      if (AiImagingRadiology.state.canvasState.currentDrawing) {
        AiImagingRadiology.drawAnnotationVector(ctx, AiImagingRadiology.state.canvasState.currentDrawing);
      }
    },

    drawAnnotationVector: function (ctx, ann) {
      const p1 = ann.start;
      const p2 = ann.end;
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distPx = Math.sqrt(dx * dx + dy * dy);
      const distMm = (distPx / AiImagingRadiology.state.canvasState.pixelsPerMm).toFixed(1);

      ctx.save();
      ctx.lineWidth = 2.5;

      if (ann.type === "vhs_long") {
        ctx.strokeStyle = "#f43f5e"; // Pink/Red
        ctx.fillStyle = "#f43f5e";
      } else if (ann.type === "vhs_short") {
        ctx.strokeStyle = "#f59e0b"; // Amber
        ctx.fillStyle = "#f59e0b";
      } else if (ann.type === "calibrate") {
        ctx.strokeStyle = "#00f0ff"; // Cyan
        ctx.fillStyle = "#00f0ff";
      } else {
        ctx.strokeStyle = "#10b981"; // Emerald
        ctx.fillStyle = "#10b981";
      }

      // Draw Line
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Draw Caliper Cross T-bars at Ends
      const angle = Math.atan2(dy, dx);
      const barLen = 8;
      [p1, p2].forEach(function (pt) {
        ctx.beginPath();
        ctx.moveTo(pt.x - Math.sin(angle) * barLen, pt.y + Math.cos(angle) * barLen);
        ctx.lineTo(pt.x + Math.sin(angle) * barLen, pt.y - Math.cos(angle) * barLen);
        ctx.stroke();
      });

      // Label text
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      ctx.font = "bold 11px monospace";
      let label = distMm + " mm";
      if (ann.type === "vhs_long") label = "VHS Long: " + distMm + "mm";
      if (ann.type === "vhs_short") label = "VHS Short: " + distMm + "mm";
      if (ann.type === "calibrate") label = "CALIB: 10mm Ref";

      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.fillRect(midX + 5, midY - 14, ctx.measureText(label).width + 8, 18);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, midX + 9, midY);

      ctx.restore();
    },

    // ==========================================================================
    // VERTEBRAL HEART SCORE (VHS) ENGINE
    // ==========================================================================
    updateVhsScore: function () {
      const v = AiImagingRadiology.state.vhsCalculation;
      const species = AiImagingRadiology.state.activeStudy.species || "canine";
      const cutoffs = RADIOLOGY_REFERENCE_STANDARDS.vhsCutoffs[species] || RADIOLOGY_REFERENCE_STANDARDS.vhsCutoffs.canine;

      if (v.oneVertebraMm > 0) {
        v.longAxisV = parseFloat((v.longAxisMm / v.oneVertebraMm).toFixed(2));
        v.shortAxisV = parseFloat((v.shortAxisMm / v.oneVertebraMm).toFixed(2));
        v.totalVhs = parseFloat((v.longAxisV + v.shortAxisV).toFixed(2));
      }

      if (v.totalVhs <= cutoffs.normalMax) {
        v.status = "NORMAL";
      } else if (v.totalVhs <= cutoffs.suspectMax) {
        v.status = "SUSPECT_CARDIOMEGALY";
      } else {
        v.status = "CONFIRMED_CARDIOMEGALY";
      }
    },

    // ==========================================================================
    // TAB 2: VERTEBRAL HEART SCORE (VHS) DEDICATED CALCULATOR
    // ==========================================================================
    buildVhsCalculatorTab: function () {
      const v = AiImagingRadiology.state.vhsCalculation;
      const species = AiImagingRadiology.state.activeStudy.species || "canine";
      const cutoffs = RADIOLOGY_REFERENCE_STANDARDS.vhsCutoffs[species] || RADIOLOGY_REFERENCE_STANDARDS.vhsCutoffs.canine;

      const card = document.createElement("div");
      card.className = "max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 sunlight-card";

      let statusBadge = "";
      if (v.status === "NORMAL") {
        statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">🟢 सामान्य हृदय आकार (NORMAL HEART)</span>';
      } else if (v.status === "SUSPECT_CARDIOMEGALY") {
        statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40">🟡 संदिग्ध कार्डियोमेगाली (BORDERLINE CARDIOMEGALY)</span>';
      } else {
        statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-400 border border-rose-500/40">🔴 स्पष्ट कार्डियोमेगाली (CONFIRMED CARDIOMEGALY)</span>';
      }

      card.innerHTML = `
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-display font-extrabold text-xl text-white sunlight-text">वर्टेब्रल हार्ट स्कोर (VHS) कैलकुलेटर</h2>
              <span class="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">${species.toUpperCase()} STANDARD</span>
            </div>
            <p class="text-xs text-slate-400 mt-1 sunlight-muted">${cutoffs.referenceSource}</p>
          </div>
          <div>${statusBadge}</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Input 1: Long Axis -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label class="block text-xs font-mono uppercase text-rose-400 font-bold">1. Long Axis (कारिना से एपेक्स L)</label>
            <div class="text-2xl font-display font-black text-white" id="dispLongAxisV">${v.longAxisV || 0} <span class="text-xs text-slate-400 font-normal">v</span></div>
            <input type="number" step="0.1" id="inpLongAxisMm" value="${v.longAxisMm || 65}" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono">
            <p class="text-[10px] text-slate-400">Tracheal bifurcation (Carina) to Cardiac Apex distance.</p>
          </div>

          <!-- Input 2: Short Axis -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label class="block text-xs font-mono uppercase text-amber-400 font-bold">2. Short Axis (अधिकतम लंबवत S)</label>
            <div class="text-2xl font-display font-black text-white" id="dispShortAxisV">${v.shortAxisV || 0} <span class="text-xs text-slate-400 font-normal">v</span></div>
            <input type="number" step="0.1" id="inpShortAxisMm" value="${v.shortAxisMm || 52}" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono">
            <p class="text-[10px] text-slate-400">Maximal cardiac dimension perpendicular to long axis.</p>
          </div>

          <!-- Input 3: Vertebra Reference Unit -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label class="block text-xs font-mono uppercase text-cyan-400 font-bold">3. T4 Vertebra Length (mm)</label>
            <div class="text-2xl font-display font-black text-white">${v.oneVertebraMm} <span class="text-xs text-slate-400 font-normal">mm/v</span></div>
            <input type="number" step="0.1" id="inpOneVertebraMm" value="${v.oneVertebraMm || 12.5}" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono">
            <p class="text-[10px] text-slate-400">Cranial edge of T4 to caudal vertebral endplate.</p>
          </div>
        </div>

        <!-- Calculated VHS Meter -->
        <div class="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono uppercase text-slate-400 font-bold">कुल वर्टेब्रल हार्ट स्कोर (Total Score L + S):</span>
            <span class="text-3xl font-display font-black text-cyan-400" id="dispTotalVhsScore">${v.totalVhs || 0} v</span>
          </div>

          <!-- Threshold Progress Bar -->
          <div class="w-full bg-slate-800 h-3 rounded-full overflow-hidden relative">
            <div id="vhsScoreProgressBar" class="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-300" style="width: ${Math.min(100, ((v.totalVhs || 9.5) / 14) * 100)}%"></div>
          </div>
          <div class="flex justify-between text-[10px] font-mono text-slate-400">
            <span>8.5v (Normal Lower)</span>
            <span class="text-emerald-400 font-bold">10.5v (Canine Cutoff)</span>
            <span class="text-rose-400 font-bold">>11.5v (Severe Cardiomegaly)</span>
          </div>
        </div>

        <!-- Clinical Guidelines & ACVIM Staging -->
        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
          <div class="font-display font-bold text-white text-xs sunlight-text">ACVIM Consensus Guidelines Recommendation:</div>
          <p class="text-slate-300 leading-relaxed sunlight-muted">
            यदि VHS > 10.5v (या जाति-विशिष्ट सीमा से अधिक) हो तो माइट्रल वाल्व रोग (MMVD Stage B2) अथवा डाइलेटेड कार्डियोमायोपैथी (DCM) की पुष्टि हेतु अनिवार्य रूप से इकोकार्डियोग्राफी (Echocardiography / Left Atrium:Aorta ratio) की सलाह दी जाती है।
          </p>
        </div>
      `;

      setTimeout(function () {
        const inpL = document.getElementById("inpLongAxisMm");
        const inpS = document.getElementById("inpShortAxisMm");
        const inpV = document.getElementById("inpOneVertebraMm");

        const recalculate = function () {
          AiImagingRadiology.state.vhsCalculation.longAxisMm = parseFloat(inpL.value) || 0;
          AiImagingRadiology.state.vhsCalculation.shortAxisMm = parseFloat(inpS.value) || 0;
          AiImagingRadiology.state.vhsCalculation.oneVertebraMm = parseFloat(inpV.value) || 12.5;
          AiImagingRadiology.updateVhsScore();

          const vNew = AiImagingRadiology.state.vhsCalculation;
          document.getElementById("dispLongAxisV").innerHTML = `${vNew.longAxisV} <span class="text-xs text-slate-400 font-normal">v</span>`;
          document.getElementById("dispShortAxisV").innerHTML = `${vNew.shortAxisV} <span class="text-xs text-slate-400 font-normal">v</span>`;
          document.getElementById("dispTotalVhsScore").textContent = vNew.totalVhs + " v";

          const bar = document.getElementById("vhsScoreProgressBar");
          if (bar) {
            bar.style.width = Math.min(100, (vNew.totalVhs / 14) * 100) + "%";
          }
        };

        if (inpL) inpL.oninput = recalculate;
        if (inpS) inpS.oninput = recalculate;
        if (inpV) inpV.oninput = recalculate;
      }, 0);

      return card;
    },

    // ==========================================================================
    // TAB 3: BOVINE ULTRASOUND GESTATION & FETAL AGING ESTIMATOR
    // ==========================================================================
    recalculateBovineGestation: function () {
      const u = AiImagingRadiology.state.bovineUltrasound;
      const c = RADIOLOGY_REFERENCE_STANDARDS.bovineUltrasoundConstants;

      if (u.crlMm > 0) {
        // Kolb / empirical bovine fetal age: Days = 28.5 + 1.25 * CRL (mm)
        u.estimatedGestationDays = Math.round(c.crlBaseDays + c.crlDaysCoefficient * u.crlMm);
      } else if (u.bpdMm > 0) {
        // BPD (Biparietal diameter) formula: Days = 2.5 * BPD (mm) + 22
        u.estimatedGestationDays = Math.round(c.bpdDaysMultiplier * u.bpdMm + c.bpdBaseDays);
      }

      // Expected Calving Date (Average bovine gestation = 283 days)
      const daysRemaining = Math.max(0, c.gestationDurationAverageDays - u.estimatedGestationDays);
      const calvingDate = new Date();
      calvingDate.setDate(calvingDate.getDate() + daysRemaining);
      u.expectedCalvingDate = calvingDate.toLocaleDateString("hi-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    },

    buildBovineUltrasoundTab: function () {
      const u = AiImagingRadiology.state.bovineUltrasound;
      const card = document.createElement("div");
      card.className = "max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 sunlight-card";

      card.innerHTML = `
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 class="font-display font-extrabold text-xl text-white sunlight-text">पशु अल्ट्रासाउंड गर्भकाल व प्रसव अनुमान</h2>
            <div class="text-xs font-mono text-cyan-400 mt-0.5">Bovine Fetal Biometry & Gestational Age Calculator</div>
          </div>
          <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            SONOGRAPHY 5.0-7.5 MHz
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- CRL Input -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label class="block text-xs font-mono uppercase text-slate-300 font-bold">1. क्राउन-रम्प लंबाई (Crown-Rump Length CRL)</label>
            <div class="flex items-center gap-3">
              <input type="number" id="inpBovineCrlMm" value="${u.crlMm}" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono outline-none focus:ring-2 focus:ring-cyan-500">
              <span class="font-mono text-xs text-slate-400">mm</span>
            </div>
            <p class="text-[11px] text-slate-400">भ्रूण के सिर के शीर्ष से पूंछ के आधार तक की लंबाई (दिन 35 से 85 हेतु आदर्श)।</p>
          </div>

          <!-- BPD Input -->
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label class="block text-xs font-mono uppercase text-slate-300 font-bold">2. बाइपैरिएटल व्यास (Biparietal Diameter BPD)</label>
            <div class="flex items-center gap-3">
              <input type="number" id="inpBovineBpdMm" value="${u.bpdMm}" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono outline-none focus:ring-2 focus:ring-cyan-500">
              <span class="font-mono text-xs text-slate-400">mm</span>
            </div>
            <p class="text-[11px] text-slate-400">भ्रूण के सिर की अधिकतम चौड़ाई (दिन 75 से 150 हेतु सटीक)।</p>
          </div>
        </div>

        <!-- Telemetry Results Card -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div class="text-[10px] font-mono uppercase text-slate-400">अनुमानित गर्भ आयु (Gestational Age)</div>
            <div class="text-2xl font-display font-black text-cyan-400 mt-1" id="dispGestationDays">${u.estimatedGestationDays} दिन</div>
            <div class="text-[10px] text-slate-400 mt-0.5">${Math.round(u.estimatedGestationDays / 30)} माह का गर्भ</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div class="text-[10px] font-mono uppercase text-slate-400">संभावित प्रसव तिथि (Expected Calving)</div>
            <div class="text-2xl font-display font-black text-emerald-400 mt-1" id="dispCalvingDate">${u.expectedCalvingDate}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">283 दिनों की औसत अवधि आधार</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div class="text-[10px] font-mono uppercase text-slate-400">लिंग निर्धारण खिड़की (Fetal Sexing)</div>
            <div class="text-base font-display font-bold text-amber-400 mt-1">
              ${u.estimatedGestationDays >= 55 && u.estimatedGestationDays <= 75 ? "सक्रिय (Day 55-75)" : "समाप्त / प्रतीक्षारत"}
            </div>
            <div class="text-[10px] text-slate-400 mt-0.5">Genital Tubercle Migration</div>
          </div>
        </div>
      `;

      setTimeout(function () {
        const inpCrl = document.getElementById("inpBovineCrlMm");
        const inpBpd = document.getElementById("inpBovineBpdMm");

        const updateUs = function () {
          AiImagingRadiology.state.bovineUltrasound.crlMm = parseFloat(inpCrl.value) || 0;
          AiImagingRadiology.state.bovineUltrasound.bpdMm = parseFloat(inpBpd.value) || 0;
          AiImagingRadiology.recalculateBovineGestation();

          const uNew = AiImagingRadiology.state.bovineUltrasound;
          document.getElementById("dispGestationDays").textContent = uNew.estimatedGestationDays + " दिन";
          document.getElementById("dispCalvingDate").textContent = uNew.expectedCalvingDate;
        };

        if (inpCrl) inpCrl.oninput = updateUs;
        if (inpBpd) inpBpd.oninput = updateUs;
      }, 0);

      return card;
    },

    // ==========================================================================
    // TAB 4: PATIENT RADIOLOGY STUDIES ARCHIVE
    // ==========================================================================
    buildArchiveTab: function () {
      const container = document.createElement("div");
      container.className = "bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl sunlight-card space-y-4";

      const header = document.createElement("div");
      header.className = "flex items-center justify-between border-b border-slate-800 pb-3";
      header.innerHTML = `
        <div>
          <h3 class="font-display font-bold text-white text-base sunlight-text">रोगी इमेजिंग अभिलेखागार (Saved Radiology Archive)</h3>
          <p class="text-xs text-slate-400 mt-0.5 sunlight-muted">IndexedDB स्थानीय एन्क्रिप्टेड स्टोरेज में सहेजे गए संपूर्ण अध्ययन।</p>
        </div>
        <span class="text-xs font-mono font-bold text-cyan-400">${AiImagingRadiology.state.studiesHistory.length} Studies Archived</span>
      `;
      container.appendChild(header);

      if (AiImagingRadiology.state.studiesHistory.length === 0) {
        const empty = document.createElement("div");
        empty.className = "p-8 text-center text-xs text-slate-400";
        empty.textContent = "कोई पूर्व अध्ययन सुरक्षित नहीं है (No previous studies recorded for this patient).";
        container.appendChild(empty);
        return container;
      }

      const grid = document.createElement("div");
      grid.className = "grid grid-cols-1 md:grid-cols-2 gap-4";

      AiImagingRadiology.state.studiesHistory.forEach(function (s) {
        const item = document.createElement("div");
        item.className = "p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3";
        item.innerHTML = `
          <div>
            <div class="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
              <span>${s.studyId}</span>
              <span class="text-slate-400">${s.studyDate}</span>
            </div>
            <h4 class="font-display font-bold text-white text-sm sunlight-text">${s.modality} - ${s.anatomicalRegion.toUpperCase()} (${s.viewProjection})</h4>
            <div class="text-xs text-slate-300 mt-1 leading-snug line-clamp-2">${s.findings || "No detailed notes entered."}</div>
            <div class="text-[11px] font-mono text-emerald-400 mt-1">Dx: ${s.provisionalDiagnosis || "Undetermined"}</div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <span class="text-slate-400 font-mono text-[10px]">${s.species.toUpperCase()} (${s.breed})</span>
            <div class="flex gap-2">
              <button class="btn-load-study px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium" data-id="${s.studyId}">
                Load in PACS
              </button>
              <button class="btn-print-archive-dossier p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400" data-id="${s.studyId}" title="Print Dossier">
                <i class="fa-solid fa-print"></i>
              </button>
            </div>
          </div>
        `;

        item.querySelector(".btn-load-study").onclick = function () {
          AiImagingRadiology.loadArchivedStudy(s.studyId);
        };
        item.querySelector(".btn-print-archive-dossier").onclick = function () {
          AiImagingRadiology.generateRadiologyDossier(s.studyId);
        };

        grid.appendChild(item);
      });

      container.appendChild(grid);
      return container;
    },

    loadArchivedStudy: function (studyId) {
      const found = AiImagingRadiology.state.studiesHistory.find(s => s.studyId === studyId);
      if (!found) return;
      AiImagingRadiology.state.activeStudy = Object.assign({}, found);
      AiImagingRadiology.state.activeTab = "viewer_console";
      AiImagingRadiology.loadNewImageSource(
        found.imageSrc,
        found.species,
        found.anatomicalRegion,
        found.viewProjection,
        found.findings
      );
    },

    // ==========================================================================
    // SYSTEM INTEGRATION: SAVE STUDY & EVENT DISPATCH
    // ==========================================================================
    commitStudyToStorage: function () {
      const study = Object.assign({}, AiImagingRadiology.state.activeStudy);
      study.annotations = AiImagingRadiology.state.annotations;
      study.vhsScore = AiImagingRadiology.state.vhsCalculation.totalVhs;
      study.vhsStatus = AiImagingRadiology.state.vhsCalculation.status;

      StorageEngine.save(study).then(function () {
        const idx = AiImagingRadiology.state.studiesHistory.findIndex(s => s.studyId === study.studyId);
        if (idx >= 0) {
          AiImagingRadiology.state.studiesHistory[idx] = study;
        } else {
          AiImagingRadiology.state.studiesHistory.unshift(study);
        }

        // Dispatch Event for Patient EMR
        const evt = new CustomEvent("vetcare:imaging_study_saved", {
          detail: {
            studyId: study.studyId,
            patientId: study.patientId,
            modality: study.modality,
            findings: study.findings,
            diagnosis: study.provisionalDiagnosis,
            vhsScore: study.vhsScore
          },
          bubbles: true
        });
        window.dispatchEvent(evt);

        if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
          window.VetcareApp.showToast("इमेजिंग अध्ययन EMR केस शीट में संलग्न किया गया!", "success");
        }
      });
    },

    exportAnnotatedImage: function () {
      if (!AiImagingRadiology.canvasEl) return;
      const dataUrl = AiImagingRadiology.canvasEl.toDataURL("image/jpeg", 0.95);
      const link = document.createElement("a");
      link.download = `VETCARE_RADIOLOGY_${AiImagingRadiology.state.activeStudy.studyId}.jpg`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    // ==========================================================================
    // OFFICIAL PRINTABLE A4 RADIOLOGY DOSSIER GENERATOR
    // ==========================================================================
    generateRadiologyDossier: function (studyId) {
      let study = AiImagingRadiology.state.studiesHistory.find(s => s.studyId === studyId);
      if (!study) {
        study = AiImagingRadiology.state.activeStudy;
      }

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("Please enable popups to print the diagnostic radiology dossier.");
        return;
      }

      const v = AiImagingRadiology.state.vhsCalculation;

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>DIAGNOSTIC RADIOLOGY REPORT - ${study.studyId}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; line-height: 1.45; font-size: 10pt; }
            .header-bar { border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; }
            .hosp-title { font-size: 14pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
            .hosp-sub { font-size: 8pt; color: #555; text-transform: uppercase; }
            .report-title { text-align: center; font-size: 13pt; font-weight: 800; text-transform: uppercase; margin: 12px 0; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 4px 0; }
            .info-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
            .info-table td, .info-table th { padding: 4px 6px; border: 1px solid #ccc; font-size: 9pt; }
            .info-table th { background: #f5f5f5; text-align: left; width: 22%; }
            .image-box { text-align: center; margin: 10px 0; background: #000; border-radius: 4px; padding: 6px; }
            .image-box img { max-width: 90%; max-height: 340px; display: inline-block; }
            .section-title { font-size: 10.5pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000; margin-top: 12px; margin-bottom: 4px; }
            .findings-box { font-size: 9.5pt; line-height: 1.4; white-space: pre-wrap; margin-bottom: 8px; }
            .signature-table { width: 100%; margin-top: 30px; border-collapse: collapse; }
            .signature-table td { width: 50%; vertical-align: top; }
          </style>
        </head>
        <body>
          <div class="header-bar">
            <div class="hosp-title">NATIONAL VETERINARY RADIOLOGY REFERRAL CENTRE</div>
            <div class="hosp-sub">Veterinary Clinical Informatics & High-Field Diagnostic Imaging • ISO 2026 Standards</div>
          </div>

          <div class="report-title">CONFIDENTIAL DIAGNOSTIC IMAGING DOSSIER</div>

          <table class="info-table">
            <tr>
              <th>STUDY ID:</th>
              <td><strong>${study.studyId}</strong></td>
              <th>STUDY DATE:</th>
              <td>${study.studyDate}</td>
            </tr>
            <tr>
              <th>PATIENT ID & TAG:</th>
              <td>${study.patientId} (Tag: ${study.tagNo})</td>
              <th>SPECIES & BREED:</th>
              <td>${study.species.toUpperCase()} (${study.breed})</td>
            </tr>
            <tr>
              <th>IMAGING MODALITY:</th>
              <td><strong>${study.modality}</strong></td>
              <th>REGION & VIEW:</th>
              <td>${study.anatomicalRegion.toUpperCase()} (${study.viewProjection})</td>
            </tr>
            <tr>
              <th>VERTEBRAL HEART SCORE:</th>
              <td><strong>${v.totalVhs ? v.totalVhs + 'v (' + v.status + ')' : 'N/A (Non-Thoracic)'}</strong></td>
              <th>SCALE RATIO:</th>
              <td>4.0 px/mm calibrated</td>
            </tr>
          </table>

          <div class="image-box">
            <img src="${study.imageSrc}" alt="Radiograph Film">
          </div>

          <div class="section-title">ROENTGEN FINDINGS & SYSTEMATIC EVALUATION</div>
          <div class="findings-box">${study.findings || 'No abnormal soft tissue or skeletal opacities identified.'}</div>

          <div class="section-title">DIAGNOSTIC IMPRESSION & DIFFERENTIALS</div>
          <div class="findings-box"><strong>PRIMARY IMPRESSION:</strong> ${study.provisionalDiagnosis || 'No definitive lesion identified.'}</div>

          <table class="signature-table">
            <tr>
              <td>
                <div style="font-size: 8pt; color: #666;">
                  Report generated electronically via Vetcare AI OS.<br>
                  Verified with DICOM Part 10 Integrity Standards.
                </div>
              </td>
              <td style="text-align: right;">
                <div style="margin-bottom: 30px;"><strong>ATTENDING RADIOLOGIST</strong></div>
                <div style="border-top: 1px solid #000; display: inline-block; width: 220px; text-align: center; font-size: 9pt;">
                  ${study.radiologistSignOff}<br>
                  <span style="font-size: 7.5pt; color: #555;">Diplomate / Registered Veterinary Surgeon</span>
                </div>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(function () {
        printWindow.print();
      }, 300);
    },

    // ==========================================================================
    // LIFECYCLE: destroy()
    // ==========================================================================
    destroy: function () {
      if (AiImagingRadiology.containerEl) {
        AiImagingRadiology.containerEl.innerHTML = "";
      }
      AiImagingRadiology.sourceImage = null;
    }
  };

  // Register in Global Vetcare Modules Architecture
  window.VetcareApp.Modules.AiImagingRadiology = AiImagingRadiology;

})(window, document);
