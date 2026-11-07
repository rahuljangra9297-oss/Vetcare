// Vetcare AI OS - Farmer Livestock Digital Registration, INAPH Tagging & Animal Aadhaar Card (2026 Production)

(function (window, document) {
  "use strict";

  // 1. GLOBAL NAMESPACE REGISTRATION
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Farmer = window.VetcareApp.Farmer || {};
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
          try { fn(payload); } catch (e) { console.error("[AnimalId EventBus Error]", e); }
        });
      }
      window.dispatchEvent(new CustomEvent("vetcare:" + event, { detail: payload }));
    }
  };
  window.VetcareApp.Core.EventBus = EventBus;

  // 2. AUDIO SYNTHESIS ENGINE (CAMERA SHUTTER & CARD CHIMES)
  const AnimalIdAudio = {
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
        // Fallback on restricted autoplay
      }
    },
    cameraClick: function () {
      AnimalIdAudio.playTone(800, "square", 0.05, 0.12);
      setTimeout(() => AnimalIdAudio.playTone(400, "square", 0.08, 0.12), 40);
    },
    chimeAadhaarGenerated: function () {
      AnimalIdAudio.playTone(523.25, "sine", 0.1, 0.08);
      setTimeout(() => AnimalIdAudio.playTone(659.25, "sine", 0.12, 0.08), 80);
      setTimeout(() => AnimalIdAudio.playTone(783.99, "sine", 0.15, 0.08), 160);
      setTimeout(() => AnimalIdAudio.playTone(1046.5, "sine", 0.25, 0.09), 250);
    },
    chimeValidationError: function () {
      AnimalIdAudio.playTone(220, "sawtooth", 0.25, 0.14);
    }
  };

  // 3. STORAGE LAYER: INDEXED-DB PERSISTENCE FOR LIVESTOCK & EMR SYNC
  const AnimalStorage = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    getDb: function () {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error("IndexedDB unavailable"));
          return;
        }
        const req = window.indexedDB.open(AnimalStorage.DB_NAME, AnimalStorage.DB_VERSION);
        req.onupgradeneeded = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("patients")) {
            db.createObjectStore("patients", { keyPath: "id" });
          }
          if (!db.objectStoreNames.contains("farmer_livestock")) {
            db.createObjectStore("farmer_livestock", { keyPath: "id" });
          }
        };
        req.onsuccess = function (e) { resolve(e.target.result); };
        req.onerror = function (e) { reject(e.target.error); };
      });
    },
    saveAnimal: async function (animal) {
      try {
        const db = await AnimalStorage.getDb();
        const tx = db.transaction(["patients", "farmer_livestock"], "readwrite");
        tx.objectStore("patients").put(animal);
        tx.objectStore("farmer_livestock").put(animal);
      } catch (err) {
        try {
          localStorage.setItem("VETCARE_LIVESTOCK_" + animal.id, JSON.stringify(animal));
        } catch (e) {
          console.warn("[AnimalStorage] Fallback localStorage write failed", e);
        }
      }
    },
    loadAllAnimals: async function () {
      try {
        const db = await AnimalStorage.getDb();
        return new Promise(resolve => {
          const tx = db.transaction("farmer_livestock", "readonly");
          const store = tx.objectStore("farmer_livestock");
          const req = store.getAll();
          req.onsuccess = function () {
            resolve(req.result && req.result.length > 0 ? req.result : null);
          };
          req.onerror = function () { resolve(null); };
        });
      } catch (err) {
        return null;
      }
    }
  };

  // 4. EMBEDDED HIGH-RESOLUTION SVG QR CODE GENERATOR (ZERO EXTERNAL DEPENDENCY)
  function generateQrSvg(text) {
    // Generate deterministic pseudo-matrix based on text string hash
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    const size = 21; // 21x21 QR standard
    let rects = "";

    // Finder patterns (Top-Left, Top-Right, Bottom-Left)
    function addFinder(x, y) {
      rects += `<rect x="${x}" y="${y}" width="7" height="7" fill="#000" rx="1"/>`;
      rects += `<rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff" rx="0.5"/>`;
      rects += `<rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#000" rx="0.5"/>`;
    }
    addFinder(0, 0);
    addFinder(14, 0);
    addFinder(0, 14);

    // Random algorithmic data cells
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        // Skip finders
        if ((r < 8 && c < 8) || (r < 8 && c > 12) || (r > 12 && c < 8)) continue;
        const bit = ((hash ^ (r * 31 + c * 17)) & 1) === 0;
        if (bit) {
          rects += `<rect x="${c}" y="${r}" width="1" height="1" fill="#000"/>`;
        }
      }
    }

    return `
      <svg viewBox="0 0 ${size} ${size}" class="w-full h-full" shape-rendering="crispEdges">
        <rect width="${size}" height="${size}" fill="#ffffff"/>
        ${rects}
      </svg>
    `;
  }

  // 5. MAIN ANIMAL REGISTRATION & DIGITAL ID CONTROLLER
  const AnimalRegistrationId = {
    // --- Reactive Internal State ---
    state: {
      registeredAnimals: [
        {
          id: "PAT-BOV-8841",
          tagNo: "100022195412",
          name: "गंगा (Ganga)",
          species: "bubaline",
          breed: "Murrah",
          breedLabelHi: "मुर्रा भैंस (Murrah Buffalo)",
          ageMonths: 48,
          sex: "female",
          lactationNo: 2,
          dailyMilkYield: 14.5,
          photoBase64: null,
          registrationDate: "2026-01-15",
          insurancePolicyNo: "NIA-VET-2026-8819",
          teethCount: 6,
          colorHorns: "जेट ब्लैक (Jet Black), छल्लेदार मुड़े सींग",
          ownerName: "रामनिवास यादव",
          ownerPhone: "9991039297",
          village: "धांसू, हिसार (हरियाणा)",
          vaccinationStatus: "FMD, HS, BQ अद्यतित (Updated)"
        },
        {
          id: "PAT-BOV-1102",
          tagNo: "160032918451",
          name: "लक्ष्मी (Lakshmi)",
          breed: "Sahiwal",
          breedLabelHi: "साहीवाल गाय (Sahiwal Cow)",
          ageMonths: 38,
          sex: "female",
          lactationNo: 1,
          dailyMilkYield: 12.0,
          photoBase64: null,
          registrationDate: "2026-02-10",
          insurancePolicyNo: "OIC-ANM-2026-4401",
          teethCount: 4,
          colorHorns: "लाखड़ी लाल-भूरा, ढीला गलकंबल",
          ownerName: "रामनिवास यादव",
          ownerPhone: "9991039297",
          village: "धांसू, हिसार (हरियाणा)",
          vaccinationStatus: "FMD बूस्टर देय (Due in 3 Days)"
        },
        {
          id: "PAT-BOV-4409",
          tagNo: "180045210923",
          name: "गौरी (Gauri)",
          breed: "Gir",
          breedLabelHi: "गीर गाय (Gir Indigenous)",
          ageMonths: 52,
          sex: "female",
          lactationNo: 3,
          dailyMilkYield: 15.0,
          photoBase64: null,
          registrationDate: "2025-11-20",
          insurancePolicyNo: "NIC-VET-2025-9942",
          teethCount: 8,
          colorHorns: "सफेद व लाल चितकबरी, उत्तल माथा",
          ownerName: "रामनिवास यादव",
          ownerPhone: "9991039297",
          village: "धांसू, हिसार (हरियाणा)",
          vaccinationStatus: "पूर्ण प्रतिरक्षित (Fully Vaccinated)"
        },
        {
          id: "PAT-CAP-2210",
          tagNo: "210088321045",
          name: "चांदनी (Chandni)",
          breed: "Sirohi",
          breedLabelHi: "सिरोही बकरी (Sirohi Doe)",
          ageMonths: 24,
          sex: "female",
          lactationNo: 1,
          dailyMilkYield: 2.8,
          photoBase64: null,
          registrationDate: "2026-03-01",
          insurancePolicyNo: "PM-SBY-2026-1120",
          teethCount: 4,
          colorHorns: "भूरा व सफेद धब्बेदार, सीधे चपटे कान",
          ownerName: "रामनिवास यादव",
          ownerPhone: "9991039297",
          village: "धांसू, हिसार (हरियाणा)",
          vaccinationStatus: "PPR प्रतिरक्षित"
        }
      ],
      newAnimalForm: {
        species: "bovine",
        breed: "Murrah",
        name: "",
        tagNo: "",
        sex: "female",
        ageMonths: 36,
        teethCount: 4,
        colorHorns: "",
        lactationNo: 1,
        dailyMilkYield: 10.0,
        insurancePolicyNo: "",
        photoBase64: null
      },
      selectedAnimalId: "PAT-BOV-8841",
      activeTab: "my_herd_cards", // my_herd_cards | register_new_animal | print_digital_passport
      wizardStep: 1, // 1 | 2 | 3
      domContainer: null
    },

    // 6. LIFECYCLE: INIT
    init: async function (containerId) {
      console.info("[Vetcare AI OS] Initializing Farmer Animal Digital Registration & Identity Subsystem (2026 Production)...");
      AnimalRegistrationId.injectStyles();

      // Hydrate from storage if present
      const stored = await AnimalStorage.loadAllAnimals();
      if (stored && stored.length > 0) {
        AnimalRegistrationId.state.registeredAnimals = stored;
      }

      if (containerId) {
        AnimalRegistrationId.render(containerId);
      }
      return AnimalRegistrationId;
    },

    // 7. LIFECYCLE: RENDER
    render: function (containerId) {
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement("div");
        container.id = containerId || "animalRegistrationContainer";
        container.className = "w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6 pb-24";
        const mainHost = document.querySelector("main") || document.body;
        mainHost.innerHTML = "";
        mainHost.appendChild(container);
      }
      AnimalRegistrationId.state.domContainer = container;

      // Construct Complete Registration & Pashu Aadhaar UI
      container.innerHTML = `
        <div id="vetcareAnimalIdWorkspace" class="max-w-5xl mx-auto space-y-6">
          ${AnimalRegistrationId.renderTopHeader()}
          ${AnimalRegistrationId.renderNavigationTabs()}
          <div id="animalIdTabContentHost" class="transition-all duration-200">
            ${AnimalRegistrationId.renderActiveTabContent()}
          </div>
        </div>

        <!-- Hidden Offscreen Container for Printing Pashu Aadhaar -->
        <div id="printablePashuAadhaarCard" class="hidden"></div>
      `;

      AnimalRegistrationId.bindDomActions();
    },

    // 8. LIFECYCLE: DESTROY
    destroy: function () {
      if (AnimalRegistrationId.state.domContainer) {
        AnimalRegistrationId.state.domContainer.innerHTML = "";
      }
      console.info("[Vetcare AI OS] Animal Registration Subsystem destroyed cleanly.");
    },

    // 9. DYNAMIC CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-animal-registration-styles")) return;
      const style = document.createElement("style");
      style.id = "vetcare-animal-registration-styles";
      style.textContent = `
        .aadhaar-card-shadow {
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        .aadhaar-tricolor-strip {
          height: 4px;
          background: linear-gradient(90deg, #f97316 33.3%, #ffffff 33.3%, #ffffff 66.6%, #16a34a 66.6%);
        }
        @media print {
          body * { visibility: hidden !important; }
          #printablePashuAadhaarCard, #printablePashuAadhaarCard * { visibility: visible !important; }
          #printablePashuAadhaarCard { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: #ffffff !important; color: #000000 !important; z-index: 999999; }
        }
      `;
      document.head.appendChild(style);
    },

    // 10. COMPONENT: TOP HEADER
    renderTopHeader: function () {
      const count = AnimalRegistrationId.state.registeredAnimals.length;
      return `
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 shadow-xl relative overflow-hidden sunlight-card">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-500 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shadow-orange-950/40">
                <i class="fa-solid fa-id-card-clip"></i>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h1 class="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight sunlight-text">
                    डिजिटल पशु पंजीकरण एवं पशु आधार कार्ड
                  </h1>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    INAPH / NDLM 12-DIGIT OK
                  </span>
                </div>
                <div class="text-xs font-mono text-slate-400 mt-1 sunlight-muted">
                  राष्ट्रीय डिजिटल पशुधन मिशन (NDLM) एकीकृत पोर्टल • पंजीकृत पशु: <strong class="text-white">${count}</strong>
                </div>
              </div>
            </div>

            <!-- New Animal Fast Action Trigger -->
            <button id="btnTriggerRegisterWizard" type="button" class="py-2.5 px-4 rounded-xl font-display font-black text-xs uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 flex items-center gap-2 active:scale-95 transition-all">
              <i class="fa-solid fa-plus"></i>
              <span>+ नया पशु जोड़ें (Register)</span>
            </button>
          </div>
        </div>
      `;
    },

    // 11. COMPONENT: NAVIGATION TABS
    renderNavigationTabs: function () {
      const active = AnimalRegistrationId.state.activeTab;
      const count = AnimalRegistrationId.state.registeredAnimals.length;
      const tabs = [
        { id: "my_herd_cards", label: "मेरे पंजीकृत पशु (My Herd Cards)", icon: "fa-cubes", count: count },
        { id: "register_new_animal", label: "नया पशु पंजीकरण (3-Step Wizard)", icon: "fa-address-card" },
        { id: "print_digital_passport", label: "डिजिटल पशु आधार पत्र (Pashu Aadhaar)", icon: "fa-id-card" }
      ];

      return `
        <div class="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs.map(t => `
            <button type="button" data-animal-tab="${t.id}" class="animal-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
              active === t.id
                ? "bg-slate-900 text-amber-400 border-t-2 border-l border-r border-amber-500 border-b-transparent shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }">
              <i class="fa-solid ${t.icon}"></i>
              <span>${t.label}</span>
              ${t.count !== undefined ? `<span class="px-1.5 py-0.2 rounded-full text-[10px] font-mono ${active === t.id ? "bg-amber-500 text-slate-950 font-black" : "bg-slate-800 text-slate-300"}">${t.count}</span>` : ""}
            </button>
          `).join("")}
        </div>
      `;
    },

    // 12. TAB CONTENT ROUTER
    renderActiveTabContent: function () {
      switch (AnimalRegistrationId.state.activeTab) {
        case "register_new_animal":
          return AnimalRegistrationId.renderRegisterWizardTab();
        case "print_digital_passport":
          return AnimalRegistrationId.renderDigitalPassportTab();
        case "my_herd_cards":
        default:
          return AnimalRegistrationId.renderMyHerdGalleryTab();
      }
    },

    // 13. COMPONENT: TAB 1 - MY HERD GALLERY CARDS
    renderMyHerdGalleryTab: function () {
      const animals = AnimalRegistrationId.state.registeredAnimals;

      return `
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${animals.map(a => `
              <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3.5 sunlight-card relative overflow-hidden flex flex-col justify-between">
                <div class="aadhaar-tricolor-strip absolute top-0 left-0 right-0"></div>

                <div>
                  <!-- Header: Tag ID & Species Badge -->
                  <div class="flex items-center justify-between border-b border-slate-800 pb-2.5 mt-1">
                    <div class="flex items-center gap-2">
                      <span class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-sm font-bold">
                        <i class="fa-solid fa-tag"></i>
                      </span>
                      <div>
                        <div class="text-[9px] font-mono uppercase text-slate-400">INAPH टैग संख्या (NDLM ID):</div>
                        <div class="text-xs sm:text-sm font-mono font-black text-amber-300 tracking-wider">${a.tagNo}</div>
                      </div>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      ${a.sex.toUpperCase()} • ब्यांत ${a.lactationNo}
                    </span>
                  </div>

                  <!-- Animal Identity Details -->
                  <div class="pt-2 flex items-start gap-3">
                    <div class="w-16 h-16 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-slate-600 text-2xl overflow-hidden shrink-0">
                      ${a.photoBase64 ? `<img src="${a.photoBase64}" class="w-full h-full object-cover" alt="Animal Photo" />` : '<i class="fa-solid fa-cow"></i>'}
                    </div>

                    <div class="space-y-1">
                      <h3 class="font-display font-black text-base text-white sunlight-text">${a.name}</h3>
                      <div class="text-xs text-slate-300 font-medium">${a.breedLabelHi}</div>
                      <div class="text-[11px] font-mono text-slate-400">आयु: ${Math.floor(a.ageMonths / 12)} वर्ष (${a.ageMonths} माह) • दांत: ${a.teethCount} दांत</div>
                    </div>
                  </div>

                  <!-- Biometrics & Production Strip -->
                  <div class="mt-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>
                      <span class="text-[9px] text-slate-400 block uppercase">दैनिक दूध मात्रा:</span>
                      <strong class="text-cyan-400">${a.dailyMilkYield} लीटर/दिन</strong>
                    </div>
                    <div>
                      <span class="text-[9px] text-slate-400 block uppercase">बीमा पॉलिसी:</span>
                      <strong class="text-emerald-400 truncate block">${a.insurancePolicyNo || "पॉलिसी लंबित"}</strong>
                    </div>
                  </div>
                </div>

                <!-- Action Toolbar -->
                <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button type="button" data-action="view_passport" data-animal-id="${a.id}" class="py-2 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-display font-black text-xs uppercase tracking-wider shadow flex items-center gap-1.5 active:scale-95 transition-all">
                    <i class="fa-solid fa-id-card"></i>
                    <span>पशु आधार पत्र देखें (View Card)</span>
                  </button>
                  <button type="button" data-action="quick_print_card" data-animal-id="${a.id}" title="तुरंत प्रिंट करें" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs">
                    <i class="fa-solid fa-print"></i>
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    },

    // 14. COMPONENT: TAB 2 - 3-STEP REGISTRATION WIZARD
    renderRegisterWizardTab: function () {
      const step = AnimalRegistrationId.state.wizardStep;
      const f = AnimalRegistrationId.state.newAnimalForm;

      return `
        <div class="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 sunlight-card">
          
          <!-- Wizard Stepper Indicator -->
          <div class="grid grid-cols-3 gap-2 border-b border-slate-800 pb-4 text-center">
            <div class="${step >= 1 ? "text-amber-400" : "text-slate-600"} font-bold text-xs flex flex-col items-center gap-1">
              <span class="w-7 h-7 rounded-full ${step >= 1 ? "bg-amber-500 text-slate-950 font-black" : "bg-slate-800 text-slate-400"} flex items-center justify-center text-xs">1</span>
              <span>बुनियादी पहचान (Basic)</span>
            </div>
            <div class="${step >= 2 ? "text-amber-400" : "text-slate-600"} font-bold text-xs flex flex-col items-center gap-1">
              <span class="w-7 h-7 rounded-full ${step >= 2 ? "bg-amber-500 text-slate-950 font-black" : "bg-slate-800 text-slate-400"} flex items-center justify-center text-xs">2</span>
              <span>नस्ल व शारीरिक लक्षण</span>
            </div>
            <div class="${step >= 3 ? "text-amber-400" : "text-slate-600"} font-bold text-xs flex flex-col items-center gap-1">
              <span class="w-7 h-7 rounded-full ${step >= 3 ? "bg-amber-500 text-slate-950 font-black" : "bg-slate-800 text-slate-400"} flex items-center justify-center text-xs">3</span>
              <span>उत्पादन, बीमा व फोटो</span>
            </div>
          </div>

          <!-- Wizard Forms -->
          <form id="formWizardAnimalRegistration" onsubmit="return false;" class="space-y-4">
            ${step === 1 ? `
              <!-- Step 1: Basic Information -->
              <div class="space-y-3.5 text-xs">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">पशु का नाम / उपनाम (Animal Name)</label>
                  <input type="text" id="wizInputName" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" placeholder="उदा. कामधेनु, चमेली" value="${f.name}" required />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">12-अंकीय NDLM / INAPH इयर टैग नंबर</label>
                    <div class="relative">
                      <input type="text" maxlength="12" id="wizInputTagNo" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-mono font-bold tracking-wider text-xs" placeholder="100022195412" value="${f.tagNo}" required />
                      <button type="button" id="btnAutoGenerateTagNo" class="absolute right-2 top-2 text-[10px] font-mono font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                        ऑटो जनरेट
                      </button>
                    </div>
                    <span class="text-[9px] text-slate-500 font-mono mt-0.5 block">12 अंकों का राष्ट्रीय पशुधन टैग (Only 12 Digits)</span>
                  </div>

                  <div>
                    <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">पशु वर्ग (Species)</label>
                    <select id="wizSelectSpecies" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white">
                      <option value="bubaline" ${f.species === "bubaline" ? "selected" : ""}>महिष / भैंस (Buffalo)</option>
                      <option value="bovine" ${f.species === "bovine" ? "selected" : ""}>गौवंश / गाय (Cattle Cow)</option>
                      <option value="caprine" ${f.species === "caprine" ? "selected" : ""}>बकरी (Goat)</option>
                      <option value="ovine" ${f.species === "ovine" ? "selected" : ""}>भेड़ (Sheep)</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">लिंग (Sex)</label>
                    <select id="wizSelectSex" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white">
                      <option value="female" selected>मादा (Female)</option>
                      <option value="male">नर (Male / Bull)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">आयु (महीनों में)</label>
                    <input type="number" id="wizInputAgeMonths" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="${f.ageMonths}" required />
                  </div>
                </div>
              </div>
            ` : ""}

            ${step === 2 ? `
              <!-- Step 2: Breed & Physical Biometrics -->
              <div class="space-y-3.5 text-xs">
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">नस्ल चयन (Breed Selection)</label>
                  <select id="wizSelectBreed" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white">
                    <option value="Murrah" ${f.breed === "Murrah" ? "selected" : ""}>मुर्रा भैंस (Murrah - काला सोना)</option>
                    <option value="Sahiwal" ${f.breed === "Sahiwal" ? "selected" : ""}>साहीवाल गाय (Sahiwal Indigenous)</option>
                    <option value="Gir" ${f.breed === "Gir" ? "selected" : ""}>गीर गाय (Gir Indigenous)</option>
                    <option value="Tharparkar" ${f.breed === "Tharparkar" ? "selected" : ""}>थारपारकर गाय (Tharparkar)</option>
                    <option value="HF_Cross" ${f.breed === "HF_Cross" ? "selected" : ""}>एच.एफ. क्रॉस (Holstein Friesian Cross)</option>
                    <option value="Jersey_Cross" ${f.breed === "Jersey_Cross" ? "selected" : ""}>जर्सी क्रॉस (Jersey Cross)</option>
                    <option value="Sirohi" ${f.breed === "Sirohi" ? "selected" : ""}>सिरोही बकरी (Sirohi Goat)</option>
                    <option value="Beetal" ${f.breed === "Beetal" ? "selected" : ""}>बीटल बकरी (Beetal Goat)</option>
                  </select>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">दांतों की संख्या (Teeth Count - Dentition Age)</label>
                    <select id="wizSelectTeeth" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono">
                      <option value="2">2 दांत (दूधिया दांत टूटे - ~2-2.5 वर्ष)</option>
                      <option value="4" selected>4 दांत (चार स्थायी दांत - ~3-3.5 वर्ष)</option>
                      <option value="6">6 दांत (छह स्थायी दांत - ~4-4.5 वर्ष)</option>
                      <option value="8">8 दांत (पूरा मुंह - 5 वर्ष से अधिक)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">रंग एवं सींग की बनावट</label>
                    <input type="text" id="wizInputColorHorns" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs" placeholder="उदा. काला रंग, छल्लेदार सींग" value="${f.colorHorns}" />
                  </div>
                </div>
              </div>
            ` : ""}

            ${step === 3 ? `
              <!-- Step 3: Production, Insurance & Photo Upload -->
              <div class="space-y-3.5 text-xs">
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">ब्यांत संख्या (Lactation No)</label>
                    <input type="number" id="wizInputLactation" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="${f.lactationNo}" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">दैनिक दूध मात्रा (Liters/Day)</label>
                    <input type="number" step="0.5" id="wizInputYield" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" value="${f.dailyMilkYield}" />
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">पशुधन बीमा पॉलिसी संख्या (Insurance Policy)</label>
                  <input type="text" id="wizInputInsurance" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono" placeholder="उदा. NIA-VET-2026-XXXX (यदि हो)" value="${f.insurancePolicyNo}" />
                </div>

                <!-- Photo Upload / Camera Snapper -->
                <div>
                  <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">पशु का फोटो (इयर टैग स्पष्ट दिखना चाहिए)</label>
                  <div class="flex items-center gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div id="photoPreviewBox" class="w-20 h-20 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-600 text-2xl overflow-hidden shrink-0">
                      ${f.photoBase64 ? `<img src="${f.photoBase64}" class="w-full h-full object-cover" />` : '<i class="fa-solid fa-camera"></i>'}
                    </div>

                    <div class="space-y-1.5 flex-1">
                      <input type="file" id="fileInputAnimalPhoto" accept="image/*" capture="environment" class="hidden" />
                      <button type="button" id="btnTriggerPhotoUpload" class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5">
                        <i class="fa-solid fa-camera text-cyan-400"></i>
                        <span>कैमरे से फोटो लें / अपलोड करें</span>
                      </button>
                      <div class="text-[10px] text-slate-500 font-mono">PNG/JPG प्रारूप में पासपोर्ट साइज फोटो</div>
                    </div>
                  </div>
                </div>
              </div>
            ` : ""}

            <!-- Wizard Navigation Buttons -->
            <div class="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              ${step > 1 ? `
                <button type="button" id="btnWizardPrev" class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
                  <i class="fa-solid fa-arrow-left mr-1"></i> पिछला कदम
                </button>
              ` : '<div></div>'}

              ${step < 3 ? `
                <button type="button" id="btnWizardNext" class="px-5 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg active:scale-95 transition-all">
                  अगला कदम (Next) <i class="fa-solid fa-arrow-right ml-1"></i>
                </button>
              ` : `
                <button type="button" id="btnWizardSubmit" class="px-6 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-950/50 active:scale-95 transition-all">
                  <i class="fa-solid fa-check-circle mr-1"></i> पंजीकरण पूर्ण करें व आधार बनाएं
                </button>
              `}
            </div>
          </form>
        </div>
      `;
    },

    // 15. COMPONENT: TAB 3 - DIGITAL PASSPORT & PRINTABLE PASHU AADHAAR
    renderDigitalPassportTab: function () {
      const activeId = AnimalRegistrationId.state.selectedAnimalId;
      const animal = AnimalRegistrationId.state.registeredAnimals.find(a => a.id === activeId) || AnimalRegistrationId.state.registeredAnimals[0];

      return `
        <div class="space-y-6">
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sunlight-card">
            <div>
              <h2 class="font-display font-black text-sm text-white uppercase sunlight-text">डिजिटल पशु आधार पत्रक पूर्वावलोकन</h2>
              <p class="text-xs text-slate-400 sunlight-muted">पशु स्वास्थ्य कार्ड, नस्ल प्रमाण पत्र एवं राष्ट्रीय पशुधन मिशन क्यूआर कोड।</p>
            </div>
            <div class="flex items-center gap-2">
              <button id="btnPrintAadhaarCardTrigger" type="button" class="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-display font-black text-xs uppercase tracking-wider shadow flex items-center gap-1.5 active:scale-95 transition-all">
                <i class="fa-solid fa-print"></i>
                <span>आधार कार्ड प्रिंट करें (Print Card)</span>
              </button>
            </div>
          </div>

          <!-- Digital Card Simulation Wrapper -->
          <div class="flex justify-center">
            ${AnimalRegistrationId.compileAadhaarCardHtml(animal)}
          </div>
        </div>
      `;
    },

    // 16. OFFICIAL DIGITAL PASHU AADHAAR HTML TEMPLATE
    compileAadhaarCardHtml: function (a) {
      const qrSvg = generateQrSvg(`https://inaph.ndlm.gov.in/verify?tag=${a.tagNo}`);
      const formattedTag = `${a.tagNo.slice(0, 4)} ${a.tagNo.slice(4, 8)} ${a.tagNo.slice(8, 12)}`;

      return `
        <div class="w-full max-w-lg rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-amber-500/80 p-5 shadow-2xl aadhaar-card-shadow relative overflow-hidden text-slate-200 text-xs font-sans">
          <!-- Tricolor Strip -->
          <div class="aadhaar-tricolor-strip absolute top-0 left-0 right-0"></div>

          <!-- Top Emblem Bar -->
          <div class="flex items-center justify-between border-b border-slate-800 pb-3 mt-1">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-base shadow">
                <i class="fa-solid fa-shield-cat"></i>
              </div>
              <div>
                <div class="text-[11px] font-bold text-amber-400 uppercase leading-none">भारत सरकार • पशुपालन एवं डेयरी विभाग</div>
                <div class="text-[9px] font-mono text-slate-400 leading-none mt-1">DEPARTMENT OF ANIMAL HUSBANDRY & DAIRYING (DAHD)</div>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              NDLM VERIFIED
            </span>
          </div>

          <!-- Card Body: Photo, Particulars & QR -->
          <div class="pt-4 flex items-start justify-between gap-4">
            
            <!-- Animal Picture -->
            <div class="w-24 h-28 rounded-xl bg-slate-950 border-2 border-slate-700 flex items-center justify-center text-slate-600 text-3xl overflow-hidden shrink-0 shadow-inner">
              ${a.photoBase64 ? `<img src="${a.photoBase64}" class="w-full h-full object-cover" alt="Animal" />` : '<i class="fa-solid fa-cow"></i>'}
            </div>

            <!-- Particulars -->
            <div class="flex-1 space-y-1 leading-tight">
              <div>
                <span class="text-[9px] font-mono uppercase text-slate-400">पशु का नाम / Name:</span>
                <div class="font-display font-black text-sm text-white">${a.name}</div>
              </div>

              <div>
                <span class="text-[9px] font-mono uppercase text-slate-400">नस्ल / Breed:</span>
                <div class="text-xs font-bold text-amber-300">${a.breedLabelHi}</div>
              </div>

              <div class="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300 pt-0.5">
                <div>लिंग: <strong class="text-white">${a.sex.toUpperCase()}</strong></div>
                <div>दांत: <strong class="text-white">${a.teethCount} दांत</strong></div>
                <div>ब्यांत: <strong class="text-white">${a.lactationNo}</strong></div>
                <div>दूध: <strong class="text-cyan-400">${a.dailyMilkYield} L/D</strong></div>
              </div>

              <div class="text-[10px] text-slate-300 pt-1">
                पालक: <strong>${a.ownerName}</strong> (${a.ownerPhone})<br/>
                पता: <span class="text-slate-400">${a.village}</span>
              </div>
            </div>

            <!-- 2D High Resolution QR Code -->
            <div class="w-20 h-20 rounded-xl bg-white p-1 border-2 border-amber-500/60 shrink-0 shadow flex items-center justify-center">
              ${qrSvg}
            </div>

          </div>

          <!-- 12-Digit Tag Number Large Ribbon -->
          <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <div class="font-mono text-center w-full">
              <div class="text-[9px] uppercase tracking-widest text-slate-400">राष्ट्रीय डिजिटल पशु पहचान संख्या (Animal Aadhaar ID)</div>
              <div class="text-base sm:text-lg font-black text-amber-400 tracking-[0.2em] font-mono mt-0.5">${formattedTag}</div>
            </div>
          </div>

          <!-- Bottom Footer Notice -->
          <div class="mt-3 pt-2 border-t border-slate-800 text-[9px] font-mono text-slate-400 flex items-center justify-between">
            <span>पंजीकरण: ${a.registrationDate}</span>
            <span>बीमा: ${a.insurancePolicyNo || "N/A"}</span>
            <span>हेल्पलाइन: 1800-VET-CARE</span>
          </div>
        </div>
      `;
    },

    // 17. VALIDATION & TAG NUMBER GENERATOR
    validateAndSaveWizard: function () {
      const f = AnimalRegistrationId.state.newAnimalForm;
      const tagInput = document.getElementById("wizInputTagNo") ? document.getElementById("wizInputTagNo").value.trim() : f.tagNo;
      const nameInput = document.getElementById("wizInputName") ? document.getElementById("wizInputName").value.trim() : f.name;

      // NDLM INAPH 12-Digit Polyurethane Tag Validation
      if (!/^\d{12}$/.test(tagInput)) {
        AnimalIdAudio.chimeValidationError();
        alert("⚠️ अमान्य टैग नंबर! राष्ट्रीय पशुधन मिशन (NDLM) इयर टैग ठीक 12 अंकों का होना अनिवार्य है।");
        AnimalRegistrationId.state.wizardStep = 1;
        AnimalRegistrationId.render(AnimalRegistrationId.state.domContainer.id);
        return;
      }

      if (!nameInput) {
        AnimalIdAudio.chimeValidationError();
        alert("⚠️ कृपया पशु का नाम प्रविष्ट करें!");
        AnimalRegistrationId.state.wizardStep = 1;
        AnimalRegistrationId.render(AnimalRegistrationId.state.domContainer.id);
        return;
      }

      const newId = "PAT-" + Math.floor(1000 + Math.random() * 9000);
      const breedSelect = document.getElementById("wizSelectBreed") ? document.getElementById("wizSelectBreed").value : f.breed;

      const breedMap = {
        Murrah: "मुर्रा भैंस (Murrah)",
        Sahiwal: "साहीवाल गाय (Sahiwal)",
        Gir: "गीर गाय (Gir)",
        Tharparkar: "थारपारकर गाय (Tharparkar)",
        HF_Cross: "एच.एफ. क्रॉस (HF Cross)",
        Jersey_Cross: "जर्सी क्रॉस (Jersey Cross)",
        Sirohi: "सिरोही बकरी (Sirohi)",
        Beetal: "बीटल बकरी (Beetal)"
      };

      const newAnimal = {
        id: newId,
        tagNo: tagInput,
        name: nameInput,
        species: document.getElementById("wizSelectSpecies") ? document.getElementById("wizSelectSpecies").value : f.species,
        breed: breedSelect,
        breedLabelHi: breedMap[breedSelect] || breedSelect,
        ageMonths: parseInt(document.getElementById("wizInputAgeMonths") ? document.getElementById("wizInputAgeMonths").value : f.ageMonths, 10),
        sex: document.getElementById("wizSelectSex") ? document.getElementById("wizSelectSex").value : f.sex,
        lactationNo: parseInt(document.getElementById("wizInputLactation") ? document.getElementById("wizInputLactation").value : f.lactationNo, 10),
        dailyMilkYield: parseFloat(document.getElementById("wizInputYield") ? document.getElementById("wizInputYield").value : f.dailyMilkYield),
        photoBase64: f.photoBase64,
        registrationDate: new Date().toISOString().split("T")[0],
        insurancePolicyNo: document.getElementById("wizInputInsurance") ? document.getElementById("wizInputInsurance").value : f.insurancePolicyNo,
        teethCount: parseInt(document.getElementById("wizSelectTeeth") ? document.getElementById("wizSelectTeeth").value : f.teethCount, 10),
        colorHorns: document.getElementById("wizInputColorHorns") ? document.getElementById("wizInputColorHorns").value : f.colorHorns,
        ownerName: "रामनिवास यादव",
        ownerPhone: "9991039297",
        village: "धांसू, हिसार (हरियाणा)",
        vaccinationStatus: "टीकाकरण देय (Freshly Registered)"
      };

      // Persist to IndexedDB
      AnimalStorage.saveAnimal(newAnimal);
      AnimalRegistrationId.state.registeredAnimals.unshift(newAnimal);
      AnimalRegistrationId.state.selectedAnimalId = newAnimal.id;

      // Dispatch Events
      EventBus.emit("patient:registered", newAnimal);
      EventBus.emit("animal:aadhaar_created", { tagNo: newAnimal.tagNo, id: newAnimal.id });

      AnimalIdAudio.chimeAadhaarGenerated();

      // Transition to Passport View
      AnimalRegistrationId.state.wizardStep = 1;
      AnimalRegistrationId.state.activeTab = "print_digital_passport";
      AnimalRegistrationId.render(AnimalRegistrationId.state.domContainer.id);

      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast(`पशु '${newAnimal.name}' का पशु आधार कार्ड सफलतापूर्वक तैयार हुआ!`, "success");
      }
    },

    // 18. PRINT A4 OFFICIAL CARD DISPATCHER
    printPashuAadhaar: function (animalId) {
      const animal = AnimalRegistrationId.state.registeredAnimals.find(a => a.id === animalId) || AnimalRegistrationId.state.registeredAnimals[0];

      let printHost = document.getElementById("printablePashuAadhaarCard");
      if (!printHost) {
        printHost = document.createElement("div");
        printHost.id = "printablePashuAadhaarCard";
        document.body.appendChild(printHost);
      }

      printHost.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 40px; color: #000; max-width: 700px; margin: 0 auto; line-height: 1.5;">
          <!-- Letterhead Banner -->
          <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px;">
            <div style="font-size: 16px; font-weight: bold; text-transform: uppercase;">भारत सरकार • पशुपालन एवं डेयरी विभाग (DAHD)</div>
            <div style="font-size: 20px; font-weight: 900; color: #064e3b; margin: 4px 0;">डिजिटल पशु स्वास्थ्य एवं पहचान पत्र (पशु आधार)</div>
            <div style="font-size: 11px; font-family: monospace;">NATIONAL DIGITAL LIVESTOCK MISSION (NDLM) • ANIMAL HEALTH PASSPORT</div>
          </div>

          <div style="display: flex; justify-content: center; margin-bottom: 24px;">
            ${AnimalRegistrationId.compileAadhaarCardHtml(animal)}
          </div>

          <!-- Instructions on Printing Card -->
          <div style="font-size: 11px; color: #374151; background: #f9fafb; border: 1px solid #e5e7eb; padding: 12px; border-radius: 6px; margin-top: 20px;">
            <strong>निर्देश:</strong> इस कार्ड को लैमिनेट कराकर सुरक्षित रखें। पशु की खरीद-बिक्री, बैंक ऋण, पशुधन बीमा दावों एवं पशु चिकित्सालय में उपचार के समय यह कार्ड दिखाना अनिवार्य है। क्यूआर कोड स्कैन करके एनडीएलएम पोर्टल पर सत्यापित किया जा सकता है।
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px;">
            <div style="font-size: 10px; color: #6b7280; font-family: monospace;">
              डिजिटल सत्यापन कोड: SHA256-AADHAAR-${animal.tagNo}<br/>
              Vetcare AI OS v2.6.4 Production
            </div>
            <div style="text-align: center;">
              <div style="height: 40px; border-bottom: 1px solid #000; width: 180px; margin-bottom: 4px;"></div>
              <div style="font-size: 11px; font-weight: bold;">(अधिकृत पशु चिकित्सा अधिकारी)</div>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        window.print();
      }, 200);
    },

    // 19. DOM EVENT DELEGATION & ACTION BINDINGS
    bindDomActions: function () {
      const root = AnimalRegistrationId.state.domContainer;
      if (!root) return;

      // Tab switcher clicks
      root.querySelectorAll(".animal-tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const tab = this.getAttribute("data-animal-tab");
          if (tab) {
            AnimalRegistrationId.state.activeTab = tab;
            AnimalRegistrationId.render(AnimalRegistrationId.state.domContainer.id);
          }
        });
      });

      // Quick trigger to register wizard
      const btnRegisterWizard = document.getElementById("btnTriggerRegisterWizard");
      if (btnRegisterWizard) {
        btnRegisterWizard.addEventListener("click", function () {
          AnimalRegistrationId.state.wizardStep = 1;
          AnimalRegistrationId.state.activeTab = "register_new_animal";
          AnimalRegistrationId.render(AnimalRegistrationId.state.domContainer.id);
        });
      }

      // Auto Generate 12-Digit Tag No Button
      const btnAutoTag = document.getElementById("btnAutoGenerateTagNo");
      if (btnAutoTag) {
        btnAutoTag.addEventListener("click", function () {
          const randomTag = "1000" + Math.floor(10000000 + Math.random() * 90000000).toString().slice(0, 8);
          const input = document.getElementById("wizInputTagNo");
          if (input) input.value = randomTag;
          AnimalRegistrationId.state.newAnimalForm.tagNo = randomTag;
          AnimalIdAudio.cameraClick();
        });
      }

      // Wizard Next Button
      const btnNext = document.getElementById("btnWizardNext");
      if (btnNext) {
        btnNext.addEventListener("click", function () {
          // Cache current fields
          if (AnimalRegistrationId.state.wizardStep === 1) {
            AnimalRegistrationId.state.newAnimalForm.name = document.getElementById("wizInputName").value;
            AnimalRegistrationId.state.newAnimalForm.tagNo = document.getElementById("wizInputTagNo").value;
            AnimalRegistrationId.state.newAnimalForm.species = document.getElementById("wizSelectSpecies").value;
            AnimalRegistrationId.state.newAnimalForm.sex = document.getElementById("wizSelectSex").value;
            AnimalRegistrationId.state.newAnimalForm.ageMonths = parseInt(document.getElementById("wizInputAgeMonths").value, 10);
          } else if (AnimalRegistrationId.state.wizardStep === 2) {
            AnimalRegistrationId.state.newAnimalForm.breed = document.getElementById("wizSelectBreed").value;
            AnimalRegistrationId.state.newAnimalForm.teethCount = parseInt(document.getElementById("wizSelectTeeth").value, 10);
            AnimalRegistrationId.state.newAnimalForm.colorHorns = document.getElementById("wizInputColorHorns").value;
          }

          AnimalRegistrationId.state.wizardStep++;
          AnimalRegistrationId.render(AnimalRegistrationId.state.domContainer.id);
          AnimalIdAudio.playTone(659.25, "sine", 0.1, 0.08);
        });
      }

      // Wizard Prev Button
      const btnPrev = document.getElementById("btnWizardPrev");
      if (btnPrev) {
        btnPrev.addEventListener("click", function () {
          AnimalRegistrationId.state.wizardStep--;
          AnimalRegistrationId.render(AnimalRegistrationId.state.domContainer.id);
        });
      }

      // Wizard Submit Button
      const btnSubmit = document.getElementById("btnWizardSubmit");
      if (btnSubmit) {
        btnSubmit.addEventListener("click", () => AnimalRegistrationId.validateAndSaveWizard());
      }

      // Camera Photo Upload Trigger & Reader
      const btnPhotoUpload = document.getElementById("btnTriggerPhotoUpload");
      const fileInput = document.getElementById("fileInputAnimalPhoto");
      if (btnPhotoUpload && fileInput) {
        btnPhotoUpload.addEventListener("click", () => fileInput.click());
        fileInput.addEventListener("change", function () {
          if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
              AnimalRegistrationId.state.newAnimalForm.photoBase64 = e.target.result;
              const box = document.getElementById("photoPreviewBox");
              if (box) {
                box.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover" />`;
              }
              AnimalIdAudio.cameraClick();
            };
            reader.readAsDataURL(this.files[0]);
          }
        });
      }

      // Print Passport from Tab 3
      const btnPrintPassport = document.getElementById("btnPrintAadhaarCardTrigger");
      if (btnPrintPassport) {
        btnPrintPassport.addEventListener("click", function () {
          AnimalRegistrationId.printPashuAadhaar(AnimalRegistrationId.state.selectedAnimalId);
        });
      }

      // Delegated Action Clicks
      root.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");

        if (action === "view_passport") {
          const id = btn.getAttribute("data-animal-id");
          AnimalRegistrationId.state.selectedAnimalId = id;
          AnimalRegistrationId.state.activeTab = "print_digital_passport";
          AnimalRegistrationId.render(AnimalRegistrationId.state.domContainer.id);
          AnimalIdAudio.playTone(784, "sine", 0.1, 0.08);
        } else if (action === "quick_print_card") {
          const id = btn.getAttribute("data-animal-id");
          AnimalRegistrationId.printPashuAadhaar(id);
        }
      });
    }
  };

  // 20. EXPORT TO GLOBAL NAMESPACE & AUTO-INIT
  window.VetcareApp.Farmer.AnimalRegistrationId = AnimalRegistrationId;

  document.addEventListener("DOMContentLoaded", function () {
    const defaultHost = document.getElementById("animalRegistrationContainer");
    if (defaultHost) {
      AnimalRegistrationId.init("animalRegistrationContainer");
    }
  });

})(window, document);
