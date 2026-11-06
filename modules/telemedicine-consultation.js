// Vetcare AI OS - Veterinary Telemedicine, Real-Time Remote Consultation & Virtual Clinic Module (2026 Production)
(function (root) {
  "use strict";

  root.VetcareApp = root.VetcareApp || {};
  root.VetcareApp.Modules = root.VetcareApp.Modules || {};

  // Database Constants
  const DB_NAME = "VetcareEMR_DB";
  const DB_VERSION = 1;
  const STORE_SESSIONS = "clinical_records";

  // Pre-seeded Urgent Rural Consultation Queue
  const DEFAULT_QUEUE = [
    {
      sessionId: "TEL-2026-901",
      farmerName: "Balram Singh Deshwal",
      mobile: "9812498210",
      village: "Khedi Asra, Jhajjar",
      animalTag: "100293847588",
      species: "bubaline",
      breed: "Murrah Buffalo",
      urgency: "EMERGENCY",
      chiefComplaint: "Dystocia (कठिन प्रसव): पानी की थैली 4 घंटे पहले फट चुकी है, पशु जोर लगा रहा है परंतु बछड़ा बाहर नहीं आ रहा।",
      waitTimeMinutes: 4,
      attachments: [
        {
          id: "ATT-01",
          label: "Vaginal Presentation",
          url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%' height='100%' fill='%231e293b'/><circle cx='200' cy='150' r='80' fill='%237f1d1d'/><text x='200' y='155' fill='%23fca5a5' font-size='14' font-family='sans-serif' text-anchor='middle'>CLINICAL PHOTO: DYSTOCIA PRESENTATION</text></svg>"
        }
      ]
    },
    {
      sessionId: "TEL-2026-902",
      farmerName: "Ram Niwas Rawat",
      mobile: "9416281029",
      village: "Guhna, Sonipat",
      animalTag: "100293847590",
      species: "bovine",
      breed: "HF Crossbred Cow",
      urgency: "PRIORITY",
      chiefComplaint: "Acute Frothy Bloat (गंभीर आफरा): बाईं कोख ड्रम जैसी फूली हुई है, मुंह खोलकर सांस ले रही है, बेचैन है।",
      waitTimeMinutes: 9,
      attachments: [
        {
          id: "ATT-02",
          label: "Left Flank Distention",
          url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%' height='100%' fill='%231e293b'/><ellipse cx='180' cy='150' rx='110' ry='70' fill='%2378350f'/><text x='200' y='155' fill='%23fde68a' font-size='14' font-family='sans-serif' text-anchor='middle'>CLINICAL PHOTO: LEFT FLANK TYMPANY</text></svg>"
        }
      ]
    },
    {
      sessionId: "TEL-2026-903",
      farmerName: "Sunita Devi",
      mobile: "9813098124",
      village: "Badli, Jhajjar",
      animalTag: "CAP-JHAJ-441",
      species: "caprine",
      breed: "Sirohi Goat",
      urgency: "ROUTINE",
      chiefComplaint: "Contagious Ecthyma (मुंहपका छाले): होंठों एवं नथुनों पर काले पपड़ीदार घाव हैं, मेमने दूध नहीं पी पा रहे।",
      waitTimeMinutes: 14,
      attachments: [
        {
          id: "ATT-03",
          label: "Labial Scab Lesions",
          url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%' height='100%' fill='%231e293b'/><circle cx='200' cy='140' r='60' fill='%23831843'/><text x='200' y='145' fill='%23fbcfe8' font-size='14' font-family='sans-serif' text-anchor='middle'>CLINICAL PHOTO: LABIAL CRUSTS</text></svg>"
        }
      ]
    }
  ];

  // Quick Communication Clinical Bilingual Templates
  const QUICK_CHAT_TEMPLATES = [
    { hi: "कृपया थर्मामीटर से पशु का तापमान मापकर बताएं (°F)?", en: "Please check and report the rectal temperature (°F)?" },
    { hi: "क्या पशु ने आज सुबह जुगाली (Rumination) की है?", en: "Has the animal chewed its cud this morning?" },
    { hi: "पशु को तुरंत अन्य स्वस्थ पशुओं से अलग छायादार स्थान पर बांधें।", en: "Immediately isolate the animal in a shaded, well-ventilated stall." },
    { hi: "घाव को गुनगुने पानी व लाल दवा (Potassium Permanganate) से साफ करें।", en: "Cleanse the lesion with lukewarm water and mild KMNO4 solution." },
    { hi: "आफरे में तारपीन का तेल 50ml + 500ml मीठा तेल (अलसी/तिल) तुरंत पिलाएं।", en: "Drench 50ml Turpentine oil mixed with 500ml linseed/edible oil immediately." },
    { hi: "पशु का मुंह नीचे की ओर रखें और जबरन दवा न पिलाएं (Drenching pneumonia से बचाव)।", en: "Do not forcibly drench if animal is struggling to avoid aspiration." }
  ];

  // Internal Module Reactive State
  const state = {
    consultationsQueue: [...DEFAULT_QUEUE],
    activeSession: {
      sessionId: null,
      callerInfo: null,
      animalDetails: null,
      callDurationSeconds: 0,
      isCallActive: false,
      isMuted: false,
      isVideoOff: false,
      streamQuality: "HD", // 'HD' | 'SD' | 'AUDIO_ONLY'
      callTimerInterval: null
    },
    chatMessages: [],
    clinicalNotes: {
      provisionalDiagnosis: "",
      vitalsReported: {
        tempF: "",
        rumenMotility: "",
        heartRate: "",
        respRate: ""
      },
      recommendations: "",
      followUpRecommendedDays: 3
    },
    capturedSnapshots: [],
    selectedImageAttachment: null,
    containerElement: null,
    animFrameId: null,
    db: null
  };

  // Toast Helper
  function notify(msg, type) {
    if (root.VetcareApp && typeof root.VetcareApp.showToast === "function") {
      root.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[TELEMEDICINE ${type ? type.toUpperCase() : "INFO"}]: ${msg}`);
    }
  }

  // Database Connection Helper
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

  // Format MM:SS helper
  function formatCallTimer(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
  }

  // Primary Module API Definition
  const TelemedicineConsultation = {
    // 1. LIFECYCLE: Init
    init: async function () {
      try {
        await getDbConnection();
        this.setupEventBus();
        return true;
      } catch (err) {
        console.error("TelemedicineConsultation initialization failed:", err);
        return false;
      }
    },

    // 2. LIFECYCLE: Render
    render: function (containerId) {
      const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error("Container element not found for TelemedicineConsultation:", containerId);
        return;
      }
      state.containerElement = container;

      container.innerHTML = `
        <div id="vetcare-telemed-root" class="w-full flex flex-col gap-6 text-slate-100 font-sans pb-16">
          <!-- Top Executive Tele-Clinic Strip -->
          ${this.buildTopTelemetryStripHtml()}

          <!-- Three-Column Workstation Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <!-- Column 1: Patient Waiting Queue & Requests (Cols 1-3) -->
            <div class="lg:col-span-3 flex flex-col gap-4">
              ${this.buildWaitingQueueHtml()}
            </div>

            <!-- Column 2: Live Video Room & In-Call Interaction (Cols 4-8) -->
            <div class="lg:col-span-6 flex flex-col gap-4">
              ${this.buildVideoRoomHtml()}
              ${this.buildMediaInspectionTrayHtml()}
            </div>

            <!-- Column 3: Live Clinical Scribe & Chat Channel (Cols 9-12) -->
            <div class="lg:col-span-3 flex flex-col gap-4">
              ${this.buildLiveChatHtml()}
              ${this.buildClinicalScribeHtml()}
            </div>

          </div>

          <!-- Modals Insertion Mount -->
          <div id="telemed-modal-container"></div>
        </div>
      `;

      this.bindUiEvents();
      this.initVideoSimulationCanvas();
    },

    // 3. LIFECYCLE: Destroy
    destroy: function () {
      if (state.activeSession.callTimerInterval) {
        clearInterval(state.activeSession.callTimerInterval);
        state.activeSession.callTimerInterval = null;
      }
      if (state.animFrameId) {
        cancelAnimationFrame(state.animFrameId);
        state.animFrameId = null;
      }
      if (this._incomingCallListener) {
        window.removeEventListener("telemedicine:incoming_call", this._incomingCallListener);
      }
      if (state.containerElement) {
        state.containerElement.innerHTML = "";
      }
      state.containerElement = null;
    },

    setupEventBus: function () {
      const handleIncoming = (evt) => {
        const payload = evt.detail;
        if (!payload) return;
        state.consultationsQueue.unshift({
          sessionId: "TEL-" + Date.now(),
          farmerName: payload.farmerName || "आपातकालीन कृषक",
          mobile: payload.mobile || "9999999999",
          village: payload.village || "अज्ञात",
          animalTag: payload.animalTag || "NEW-INTAKE",
          species: payload.species || "bovine",
          breed: payload.breed || "Crossbred",
          urgency: payload.urgency || "EMERGENCY",
          chiefComplaint: payload.complaint || "आपातकालीन टेली-परामर्श अनुरोध प्राप्त हुआ।",
          waitTimeMinutes: 1,
          attachments: payload.attachments || []
        });
        if (state.containerElement) {
          const queueBox = state.containerElement.querySelector("#telemedQueueContainer");
          if (queueBox) queueBox.innerHTML = this.buildQueueCardsInnerHtml();
        }
        notify(`नया आपातकालीन टेलीमेडिसिन कॉल अनुरोध प्राप्त हुआ: ${payload.farmerName}`, "warning");
      };

      this._incomingCallListener = handleIncoming;
      window.addEventListener("telemedicine:incoming_call", handleIncoming);
    },

    // HTML VIEW BUILDERS
    buildTopTelemetryStripHtml: function () {
      const isCall = state.activeSession.isCallActive;
      const caller = state.activeSession.callerInfo;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white text-xl shadow-lg shadow-cyan-950/50">
              <i class="fa-solid fa-headset"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-lg font-display font-black text-white">राष्ट्रीय पशु चिकित्सा टेली-क्लिनिक</h2>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  WEBRTC 2026 ENCRYPTED
                </span>
              </div>
              <div class="text-xs text-slate-400">
                दूरस्थ ग्रामीण पशु स्वास्थ्य परामर्श, त्वरित आपातकालीन MVU प्रेषण एवं डिजिटल प्रिस्क्रिप्शन प्रणाली
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full ${isCall ? "bg-rose-500 animate-ping" : "bg-emerald-400"}"></span>
              <span class="text-slate-400 uppercase text-[10px]">स्थिति:</span>
              <span class="${isCall ? "text-rose-400 font-bold" : "text-emerald-400 font-semibold"}">
                ${isCall ? `LIVE CALL: ${caller ? caller.farmerName : ""}` : "READY (कॉल हेतु उपलब्ध)"}
              </span>
            </div>

            <div class="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
              <span class="text-slate-400 text-[10px]">प्रतीक्षारत:</span> <strong class="text-amber-400">${state.consultationsQueue.length}</strong>
            </div>
          </div>
        </div>
      `;
    },

    buildWaitingQueueHtml: function () {
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl flex flex-col h-[750px]">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-list-check text-cyan-400"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-white">कॉल प्रतीक्षा सूची (${state.consultationsQueue.length})</h3>
            </div>
            <span class="text-[10px] font-mono text-slate-400">लाइव अपडेट</span>
          </div>

          <!-- Scrollable Requests List -->
          <div id="telemedQueueContainer" class="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            ${this.buildQueueCardsInnerHtml()}
          </div>
        </div>
      `;
    },

    buildQueueCardsInnerHtml: function () {
      if (state.consultationsQueue.length === 0) {
        return `
          <div class="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 text-xs">
            <i class="fa-solid fa-phone-slash text-3xl mb-2 text-slate-600"></i>
            <div>कोई लंबित कॉल अनुरोध नहीं है।</div>
            <div class="text-[11px] mt-1 text-slate-600">पशुपालक ऐप से आने वाले कॉल यहां दिखेंगे।</div>
          </div>
        `;
      }

      return state.consultationsQueue
        .map((item) => {
          let urgencyBadge = "";
          let cardBorder = "border-slate-800";

          if (item.urgency === "EMERGENCY") {
            urgencyBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse"><i class="fa-solid fa-truck-medical mr-1"></i>आपातकाल</span>`;
            cardBorder = "border-rose-500/40 bg-rose-950/10";
          } else if (item.urgency === "PRIORITY") {
            urgencyBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">प्राथमिक</span>`;
            cardBorder = "border-amber-500/40 bg-amber-950/10";
          } else {
            urgencyBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">सामान्य</span>`;
          }

          return `
          <div class="p-3.5 rounded-xl border ${cardBorder} bg-slate-950/80 hover:border-slate-700 transition-all flex flex-col justify-between gap-2.5">
            <div>
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="text-xs font-bold text-white">${item.farmerName}</div>
                  <div class="text-[11px] text-slate-400 font-mono"><i class="fa-solid fa-phone text-[10px] mr-1"></i>${item.mobile}</div>
                </div>
                <div>${urgencyBadge}</div>
              </div>

              <div class="mt-2 text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                ${item.chiefComplaint}
              </div>

              <div class="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>टैग: <strong class="text-slate-200">${item.animalTag}</strong> (${item.breed})</span>
                <span class="text-amber-400"><i class="fa-solid fa-clock mr-1"></i>${item.waitTimeMinutes}m wait</span>
              </div>
            </div>

            <!-- Quick Action Buttons -->
            <div class="grid grid-cols-2 gap-2 pt-1">
              <button 
                type="button" 
                data-connect-session="${item.sessionId}" 
                class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all"
              >
                <i class="fa-solid fa-phone"></i>
                <span>कॉल जोड़ें</span>
              </button>
              <button 
                type="button" 
                data-decline-session="${item.sessionId}" 
                class="px-2 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border border-slate-700 flex items-center justify-center gap-1 transition-colors"
              >
                <i class="fa-solid fa-xmark"></i>
                <span>अस्वीकार</span>
              </button>
            </div>
          </div>
        `;
        })
        .join("");
    },

    buildVideoRoomHtml: function () {
      const isCall = state.activeSession.isCallActive;
      const caller = state.activeSession.callerInfo;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col">
          <!-- Room Subheader -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full ${isCall ? "bg-rose-500 animate-ping" : "bg-slate-600"}"></div>
              <div>
                <h3 class="text-xs font-mono font-bold uppercase text-white">
                  ${isCall ? `सक्रिय वीडियो सत्र: ${caller.farmerName} (${caller.village})` : "वीडियो कंसोल (स्टैंडबाय)"}
                </h3>
                <div class="text-[10px] font-mono text-slate-400">
                  ${isCall ? `टैग: ${caller.animalTag} | ${caller.species.toUpperCase()} (${caller.breed})` : "कॉल प्रारंभ करने हेतु बाईं सूची से चयन करें"}
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span id="telemedCallDurationBadge" class="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono font-bold ${
                isCall ? "text-emerald-400" : "text-slate-500"
              }">
                ${formatCallTimer(state.activeSession.callDurationSeconds)}
              </span>
              <button id="telemedBtnFullscreen" type="button" title="Full Screen" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700">
                <i class="fa-solid fa-expand"></i>
              </button>
            </div>
          </div>

          <!-- Video Simulation Screen Container -->
          <div id="telemedVideoViewport" class="relative w-full aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
            <canvas id="telemedCanvasFeed" class="w-full h-full object-cover"></canvas>

            <!-- Status Overlays -->
            ${
              !isCall
                ? `
              <div class="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xs text-center p-6">
                <div class="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 text-2xl mb-3">
                  <i class="fa-solid fa-video-slash"></i>
                </div>
                <div class="text-sm font-bold text-slate-300">कोई वीडियो सत्र सक्रिय नहीं है</div>
                <div class="text-xs text-slate-500 mt-1 max-w-sm">बाईं सूची से किसी भी प्रतीक्षारत पशुपालक का 'कॉल जोड़ें' बटन दबाकर परामर्श प्रारंभ करें।</div>
              </div>
            `
                : `
              <!-- PIP Doctor Preview Feed -->
              <div class="absolute top-3 right-3 w-28 h-20 sm:w-36 sm:h-24 rounded-lg border-2 border-emerald-500 bg-slate-900 shadow-xl overflow-hidden flex flex-col justify-between p-1.5">
                <div class="flex items-center justify-between text-[9px] font-mono text-emerald-400">
                  <span>DOCTOR FEED</span>
                  <i class="fa-solid fa-circle text-[7px] text-emerald-400"></i>
                </div>
                <div class="text-[10px] font-semibold text-center text-slate-300 font-mono">
                  Dr. Rahul (MVSc)
                </div>
              </div>

              <!-- Live Farmer Stream Info Badge -->
              <div class="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-2">
                <i class="fa-solid fa-wifi text-emerald-400 text-xs"></i>
                <span>ग्रामीण 4G नेटवर्क • लेटेंसी: 48ms • ${state.activeSession.streamQuality}</span>
              </div>
            `
            }
          </div>

          <!-- In-Call Control Bar -->
          <div class="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <!-- Mute Button -->
              <button 
                id="telemedBtnMute" 
                type="button" 
                ${!isCall ? "disabled" : ""} 
                class="px-3 py-2 rounded-xl text-xs font-semibold ${
                  state.activeSession.isMuted ? "bg-rose-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                } border border-slate-700 transition-colors disabled:opacity-40"
              >
                <i class="fa-solid ${state.activeSession.isMuted ? "fa-microphone-slash" : "fa-microphone"} mr-1"></i>
                <span>${state.activeSession.isMuted ? "अनम्यूट करें" : "म्यूट"}</span>
              </button>

              <!-- Video Toggle Button -->
              <button 
                id="telemedBtnVideo" 
                type="button" 
                ${!isCall ? "disabled" : ""} 
                class="px-3 py-2 rounded-xl text-xs font-semibold ${
                  state.activeSession.isVideoOff ? "bg-rose-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                } border border-slate-700 transition-colors disabled:opacity-40"
              >
                <i class="fa-solid ${state.activeSession.isVideoOff ? "fa-video-slash" : "fa-video"} mr-1"></i>
                <span>${state.activeSession.isVideoOff ? "कैमरा चालू" : "कैमरा बंद"}</span>
              </button>

              <!-- Snapshot Capture Button -->
              <button 
                id="telemedBtnSnapshot" 
                type="button" 
                ${!isCall ? "disabled" : ""} 
                title="Capture clinical lesion photo from video feed" 
                class="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors disabled:opacity-40"
              >
                <i class="fa-solid fa-camera mr-1"></i>
                <span>स्नैपशॉट लें</span>
              </button>
            </div>

            <!-- Red End Call Button -->
            <div>
              <button 
                id="telemedBtnEndCall" 
                type="button" 
                ${!isCall ? "disabled" : ""} 
                class="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50 flex items-center gap-1.5 transition-all disabled:opacity-40 active:scale-95"
              >
                <i class="fa-solid fa-phone-slash"></i>
                <span>सत्र समाप्त करें (End Call)</span>
              </button>
            </div>
          </div>
        </div>
      `;
    },

    buildMediaInspectionTrayHtml: function () {
      const active = state.activeSession.callerInfo;
      const uploadedAttachments = active && active.attachments ? active.attachments : [];
      const snapshots = state.capturedSnapshots;
      const allMedia = [...uploadedAttachments, ...snapshots];

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl">
          <div class="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-images text-emerald-400"></i>
              <h4 class="text-xs font-mono font-bold uppercase text-white">
                पशु घाव व लक्षण मीडिया ट्रे (${allMedia.length})
              </h4>
            </div>
            <span class="text-[10px] font-mono text-slate-400">जूम करने हेतु फोटो पर क्लिक करें</span>
          </div>

          <div class="flex items-center gap-3 overflow-x-auto pb-1 custom-scrollbar">
            ${
              allMedia.length === 0
                ? `<div class="text-xs text-slate-500 py-2">वर्तमान सत्र में कोई संलग्न तस्वीर नहीं है। ऊपर दिए कैमरे से स्नैपशॉट लें।</div>`
                : allMedia
                    .map(
                      (m) => `
                <div 
                  data-inspect-photo="${m.url}" 
                  class="cursor-pointer group relative flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden border border-slate-700 hover:border-emerald-500 transition-all shadow"
                >
                  <img src="${m.url}" alt="${m.label || "Lesion photo"}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-1.5">
                    <span class="text-[9px] font-mono text-white truncate max-w-full">${m.label || "Snapshot"}</span>
                  </div>
                </div>
              `
                    )
                    .join("")
            }
          </div>
        </div>
      `;
    },

    buildLiveChatHtml: function () {
      const isCall = state.activeSession.isCallActive;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl flex flex-col h-[380px]">
          <div class="flex items-center justify-between pb-2.5 border-b border-slate-800 mb-2.5">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-comments text-cyan-400"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-white">लाइव संदेश एवं त्वरित निर्देश</h3>
            </div>
            <span class="text-[10px] font-mono text-slate-400">द्विभाषी (HI/EN)</span>
          </div>

          <!-- Messages Stream Container -->
          <div id="telemedChatStream" class="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
            ${
              state.chatMessages.length === 0
                ? `<div class="h-full flex items-center justify-center text-center text-xs text-slate-500">कॉल कनेक्ट होने पर संदेश यहां दिखाई देंगे।</div>`
                : state.chatMessages
                    .map((msg) => {
                      return `
                  <div class="flex flex-col ${msg.isDoctor ? "items-end" : "items-start"}">
                    <div class="text-[9px] font-mono text-slate-500 mb-0.5">
                      ${msg.sender} • ${msg.timestamp}
                    </div>
                    <div class="px-3 py-2 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                      msg.isDoctor ? "bg-cyan-600 text-white rounded-br-none" : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700"
                    }">
                      ${msg.text}
                    </div>
                  </div>
                `;
                    })
                    .join("")
            }
          </div>

          <!-- Quick Templates Dropdown Strip -->
          <div class="py-2 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
            <span class="text-[10px] font-mono uppercase text-slate-500 whitespace-nowrap">क्विक टेम्पलेट:</span>
            ${QUICK_CHAT_TEMPLATES.slice(0, 3)
              .map(
                (t, idx) => `
              <button 
                type="button" 
                data-chat-template="${idx}" 
                ${!isCall ? "disabled" : ""} 
                class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 border border-slate-700 whitespace-nowrap disabled:opacity-40 transition-colors"
              >
                ${t.hi.slice(0, 22)}...
              </button>
            `
              )
              .join("")}
          </div>

          <!-- Chat Input Bar -->
          <form id="telemedChatForm" class="flex items-center gap-2 pt-2 border-t border-slate-800">
            <input 
              type="text" 
              id="telemedChatInput" 
              ${!isCall ? "disabled" : ""} 
              placeholder="पशुपालक को निर्देश टाइप करें..." 
              class="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-40"
            />
            <button 
              type="submit" 
              ${!isCall ? "disabled" : ""} 
              class="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow disabled:opacity-40"
            >
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      `;
    },

    buildClinicalScribeHtml: function () {
      const isCall = state.activeSession.isCallActive;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl flex flex-col h-[350px]">
          <div class="flex items-center justify-between pb-2.5 border-b border-slate-800 mb-2.5">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-stethoscope text-amber-400"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-white">क्लिनिकल अवलोकन व डायग्नोसिस</h3>
            </div>
            <span class="text-[10px] font-mono text-amber-400">लाइव स्क्राइब</span>
          </div>

          <div class="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar text-xs">
            <!-- Vitals Grid -->
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-0.5">तापमान (°F)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  id="scribeTemp" 
                  value="${state.clinicalNotes.vitalsReported.tempF}" 
                  placeholder="101.5" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-mono focus:ring-1 focus:ring-amber-500" 
                />
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-0.5">रूमेन गति (/2min)</label>
                <input 
                  type="text" 
                  id="scribeRumen" 
                  value="${state.clinicalNotes.vitalsReported.rumenMotility}" 
                  placeholder="2 / 2min" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-mono focus:ring-1 focus:ring-amber-500" 
                />
              </div>
            </div>

            <!-- Provisional Diagnosis -->
            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-400 mb-0.5">अनंतिम निदान (Provisional Diagnosis) *</label>
              <input 
                type="text" 
                id="scribeDiagnosis" 
                value="${state.clinicalNotes.provisionalDiagnosis}" 
                placeholder="उदा: Acute Tympany / Dystocia / Mastitis" 
                class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold focus:ring-1 focus:ring-amber-500" 
              />
            </div>

            <!-- Recommendations / First-Aid Given -->
            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-400 mb-0.5">तत्काल प्राथमिक चिकित्सा व सलाह</label>
              <textarea 
                id="scribeAdvice" 
                rows="2" 
                placeholder="पशुपालक को दी गई प्राथमिक चिकित्सा सलाह..." 
                class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:ring-1 focus:ring-amber-500"
              >${state.clinicalNotes.recommendations}</textarea>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="pt-2 border-t border-slate-800 space-y-2">
            <button 
              id="telemedBtnTransferRx" 
              type="button" 
              class="w-full py-2 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <i class="fa-solid fa-file-prescription"></i>
              <span>प्रिस्क्रिप्शन जनरेटर पर भेजें (Transfer Rx)</span>
            </button>
            <button 
              id="telemedBtnDispatchMvu" 
              type="button" 
              class="w-full py-1.5 px-3 rounded-lg text-xs font-bold bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/50 flex items-center justify-center gap-1.5 transition-colors"
            >
              <i class="fa-solid fa-truck-medical text-rose-400"></i>
              <span>आपातकाल: MVU एम्बुलेंस भेजें (Dispatch MVU)</span>
            </button>
          </div>
        </div>
      `;
    },

    // EVENT BINDINGS
    bindUiEvents: function () {
      const container = state.containerElement;
      if (!container) return;

      // 1. Connect Session Click (Queue Delegation)
      container.addEventListener("click", (e) => {
        const connectBtn = e.target.closest("[data-connect-session]");
        if (connectBtn) {
          const sid = connectBtn.getAttribute("data-connect-session");
          this.startConsultation(sid);
        }

        const declineBtn = e.target.closest("[data-decline-session]");
        if (declineBtn) {
          const sid = declineBtn.getAttribute("data-decline-session");
          state.consultationsQueue = state.consultationsQueue.filter((item) => item.sessionId !== sid);
          this.render(container);
          notify("परामर्श अनुरोध सूची से हटाया गया।", "info");
        }
      });

      // 2. Fullscreen Toggle
      const btnFullscreen = container.querySelector("#telemedBtnFullscreen");
      if (btnFullscreen) {
        btnFullscreen.addEventListener("click", () => {
          const vp = container.querySelector("#telemedVideoViewport");
          if (!vp) return;
          if (!document.fullscreenElement) {
            vp.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        });
      }

      // 3. Audio Mute Toggle
      const btnMute = container.querySelector("#telemedBtnMute");
      if (btnMute) {
        btnMute.addEventListener("click", () => {
          state.activeSession.isMuted = !state.activeSession.isMuted;
          btnMute.className = btnMute.className.replace(
            state.activeSession.isMuted ? "bg-slate-800" : "bg-rose-600",
            state.activeSession.isMuted ? "bg-rose-600" : "bg-slate-800"
          );
          btnMute.innerHTML = `<i class="fa-solid ${state.activeSession.isMuted ? "fa-microphone-slash" : "fa-microphone"} mr-1"></i><span>${state.activeSession.isMuted ? "अनम्यूट करें" : "म्यूट"}</span>`;
          notify(state.activeSession.isMuted ? "माइक्रोफ़ोन म्यूट किया गया।" : "माइक्रोफ़ोन सक्रिय।", "info");
        });
      }

      // 4. Video Off Toggle
      const btnVideo = container.querySelector("#telemedBtnVideo");
      if (btnVideo) {
        btnVideo.addEventListener("click", () => {
          state.activeSession.isVideoOff = !state.activeSession.isVideoOff;
          btnVideo.className = btnVideo.className.replace(
            state.activeSession.isVideoOff ? "bg-slate-800" : "bg-rose-600",
            state.activeSession.isVideoOff ? "bg-rose-600" : "bg-slate-800"
          );
          btnVideo.innerHTML = `<i class="fa-solid ${state.activeSession.isVideoOff ? "fa-video-slash" : "fa-video"} mr-1"></i><span>${state.activeSession.isVideoOff ? "कैमरा चालू" : "कैमरा बंद"}</span>`;
          notify(state.activeSession.isVideoOff ? "कैमरा फीड बंद की गई।" : "कैमरा फीड चालू।", "info");
        });
      }

      // 5. Take Snapshot
      const btnSnap = container.querySelector("#telemedBtnSnapshot");
      if (btnSnap) {
        btnSnap.addEventListener("click", () => this.captureSnapshot());
      }

      // 6. End Call Button
      const btnEnd = container.querySelector("#telemedBtnEndCall");
      if (btnEnd) {
        btnEnd.addEventListener("click", () => this.endConsultation());
      }

      // 7. Chat Submission
      const chatForm = container.querySelector("#telemedChatForm");
      if (chatForm) {
        chatForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const inp = container.querySelector("#telemedChatInput");
          if (inp && inp.value.trim()) {
            this.sendChatMessage(inp.value.trim(), "Dr. Rahul");
            inp.value = "";
          }
        });
      }

      // 8. Chat Template Clicks
      container.querySelectorAll("[data-chat-template]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-chat-template"), 10);
          const tpl = QUICK_CHAT_TEMPLATES[idx];
          if (tpl) {
            this.sendChatMessage(tpl.hi, "Dr. Rahul");
          }
        });
      });

      // 9. Inspect Photo Modal
      container.addEventListener("click", (e) => {
        const item = e.target.closest("[data-inspect-photo]");
        if (item) {
          const url = item.getAttribute("data-inspect-photo");
          this.openPhotoModal(url);
        }
      });

      // 10. Transfer to Prescription
      const btnTransfer = container.querySelector("#telemedBtnTransferRx");
      if (btnTransfer) {
        btnTransfer.addEventListener("click", () => this.transferToPrescription());
      }

      // 11. Dispatch MVU Ambulance
      const btnMvu = container.querySelector("#telemedBtnDispatchMvu");
      if (btnMvu) {
        btnMvu.addEventListener("click", () => {
          if (state.activeSession.callerInfo) {
            this.dispatchMvu(state.activeSession.callerInfo.sessionId);
          } else {
            notify("सक्रिय कॉल सत्र उपलब्ध नहीं है।", "warning");
          }
        });
      }

      // 12. Sync Scribe Inputs into State
      const scribeTemp = container.querySelector("#scribeTemp");
      if (scribeTemp) scribeTemp.addEventListener("input", (e) => (state.clinicalNotes.vitalsReported.tempF = e.target.value));
      const scribeRumen = container.querySelector("#scribeRumen");
      if (scribeRumen) scribeRumen.addEventListener("input", (e) => (state.clinicalNotes.vitalsReported.rumenMotility = e.target.value));
      const scribeDiag = container.querySelector("#scribeDiagnosis");
      if (scribeDiag) scribeDiag.addEventListener("input", (e) => (state.clinicalNotes.provisionalDiagnosis = e.target.value));
      const scribeAdvice = container.querySelector("#scribeAdvice");
      if (scribeAdvice) scribeAdvice.addEventListener("input", (e) => (state.clinicalNotes.recommendations = e.target.value));
    },

    // 4. CALL CONTROLLER: Start Consultation
    startConsultation: function (sessionId) {
      const target = state.consultationsQueue.find((q) => q.sessionId === sessionId);
      if (!target) return;

      // Update Active Session Object
      state.activeSession.sessionId = target.sessionId;
      state.activeSession.callerInfo = target;
      state.activeSession.animalDetails = {
        tag: target.animalTag,
        species: target.species,
        breed: target.breed
      };
      state.activeSession.callDurationSeconds = 0;
      state.activeSession.isCallActive = true;
      state.activeSession.isMuted = false;
      state.activeSession.isVideoOff = false;

      // Initialize Call Notes with Chief Complaint
      state.clinicalNotes.provisionalDiagnosis = target.urgency === "EMERGENCY" ? "Dystocia (Emergency Intervention)" : "Acute Bloat / Tympany";
      state.clinicalNotes.recommendations = "प्राथमिक स्थिरीकरण एवं टेली-निगरानी";

      // Initialize System Messages
      state.chatMessages = [
        {
          id: "SYS-01",
          sender: "SYSTEM",
          text: `सत्र प्रारंभ हुआ: ${target.farmerName} (${target.village}) • टैग: ${target.animalTag}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isDoctor: false
        },
        {
          id: "FARMER-01",
          sender: target.farmerName,
          text: target.chiefComplaint,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isDoctor: false
        }
      ];

      // Remove from Queue
      state.consultationsQueue = state.consultationsQueue.filter((q) => q.sessionId !== sessionId);

      // Start Duration Interval
      if (state.activeSession.callTimerInterval) clearInterval(state.activeSession.callTimerInterval);
      state.activeSession.callTimerInterval = setInterval(() => {
        state.activeSession.callDurationSeconds++;
        const badge = document.getElementById("telemedCallDurationBadge");
        if (badge) badge.textContent = formatCallTimer(state.activeSession.callDurationSeconds);
      }, 1000);

      notify(`वीडियो कॉल जुड़ी: ${target.farmerName} (${target.village})`, "success");
      this.render(state.containerElement);
    },

    // 5. CALL CONTROLLER: End Consultation & Commit Log
    endConsultation: async function () {
      if (!state.activeSession.isCallActive) return;

      if (state.activeSession.callTimerInterval) {
        clearInterval(state.activeSession.callTimerInterval);
        state.activeSession.callTimerInterval = null;
      }

      const sessionSummary = {
        recordId: "REC-TEL-" + Date.now(),
        patientId: "PAT-" + (state.activeSession.callerInfo ? state.activeSession.callerInfo.animalTag : "UNKNOWN"),
        recordType: "telemedicine",
        timestamp: new Date().toISOString(),
        farmerName: state.activeSession.callerInfo ? state.activeSession.callerInfo.farmerName : "Anonymous",
        mobile: state.activeSession.callerInfo ? state.activeSession.callerInfo.mobile : "",
        village: state.activeSession.callerInfo ? state.activeSession.callerInfo.village : "",
        callDurationSeconds: state.activeSession.callDurationSeconds,
        provisionalDiagnosis: state.clinicalNotes.provisionalDiagnosis,
        vitalsReported: state.clinicalNotes.vitalsReported,
        recommendations: state.clinicalNotes.recommendations,
        chatTranscript: state.chatMessages,
        status: "Completed"
      };

      try {
        const db = await getDbConnection();
        const tx = db.transaction(STORE_SESSIONS, "readwrite");
        const store = tx.objectStore(STORE_SESSIONS);
        store.put(sessionSummary);
      } catch (err) {
        console.error("Failed to commit session record to DB", err);
      }

      window.dispatchEvent(new CustomEvent("telemedicine:session_ended", { detail: sessionSummary }));

      state.activeSession.isCallActive = false;
      notify(`टेलीमेडिसिन परामर्श समाप्त हुआ (${formatCallTimer(state.activeSession.callDurationSeconds)})।`, "info");
      this.render(state.containerElement);
    },

    // 6. CHAT CONTROLLER: Send Message
    sendChatMessage: function (text, sender = "Dr. Rahul") {
      if (!text) return;
      const msg = {
        id: "MSG-" + Date.now(),
        sender: sender,
        text: text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isDoctor: sender === "Dr. Rahul"
      };
      state.chatMessages.push(msg);

      const stream = document.getElementById("telemedChatStream");
      if (stream) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `flex flex-col ${msg.isDoctor ? "items-end" : "items-start"}`;
        msgDiv.innerHTML = `
          <div class="text-[9px] font-mono text-slate-500 mb-0.5">${msg.sender} • ${msg.timestamp}</div>
          <div class="px-3 py-2 rounded-xl text-xs max-w-[85%] leading-relaxed ${
            msg.isDoctor ? "bg-cyan-600 text-white rounded-br-none" : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700"
          }">
            ${msg.text}
          </div>
        `;
        stream.appendChild(msgDiv);
        stream.scrollTop = stream.scrollHeight;
      }
    },

    // 7. SNAPSHOT CONTROLLER: Capture Video Canvas
    captureSnapshot: function () {
      const canvas = document.getElementById("telemedCanvasFeed");
      if (!canvas) return;

      const dataUrl = canvas.toDataURL("image/png");
      const newSnap = {
        id: "SNAP-" + Date.now(),
        label: `Snapshot ${formatCallTimer(state.activeSession.callDurationSeconds)}`,
        url: dataUrl
      };
      state.capturedSnapshots.unshift(newSnap);
      notify("वीडियो फीड से क्लिनिकल स्नैपशॉट लिया गया!", "success");

      // Re-render media tray
      const tray = state.containerElement.querySelector(".lg\\:col-span-6 > div:last-child");
      if (tray) {
        tray.outerHTML = this.buildMediaInspectionTrayHtml();
      }
    },

    // 8. WORKFLOW INTEGRATION: Transfer Patient Data to Prescription Module
    transferToPrescription: function () {
      const active = state.activeSession.callerInfo;
      const diag = state.clinicalNotes.provisionalDiagnosis || "टेलीमेडिसिन परामर्श";

      const payload = {
        tagNumber: active ? active.animalTag : "100293847588",
        ownerName: active ? active.farmerName : "कृषक",
        mobileNumber: active ? active.mobile : "9812000000",
        species: active ? active.species : "bubaline",
        breed: active ? active.breed : "Murrah",
        diagnosis: diag,
        notes: `टेली-परामर्श अवधि: ${formatCallTimer(state.activeSession.callDurationSeconds)}. सलाह: ${state.clinicalNotes.recommendations}`,
        vitals: state.clinicalNotes.vitalsReported
      };

      window.dispatchEvent(new CustomEvent("prescription:open_with_data", { detail: payload }));
      window.dispatchEvent(new CustomEvent("diagnosis:selected", { detail: payload }));

      notify(`पशु ${payload.tagNumber} का डेटा प्रिस्क्रिप्शन मॉड्यूल में भेजा गया!`, "success");

      const rxSec = document.getElementById("opd-prescription") || document.getElementById("doctor-intake");
      if (rxSec) rxSec.scrollIntoView({ behavior: "smooth" });
    },

    // 9. EMERGENCY DISPATCH: Dispatch Mobile Veterinary Unit (MVU)
    dispatchMvu: function (sessionId) {
      const active = state.activeSession.callerInfo;
      const mount = document.getElementById("telemed-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="telemedMvuModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-rose-500 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <i class="fa-solid fa-truck-medical text-lg"></i>
                </div>
                <div>
                  <h3 class="font-display font-bold text-base text-white">आपातकालीन MVU एम्बुलेंस प्रेषण</h3>
                  <div class="text-[10px] font-mono text-rose-400">STATE EMERGENCY DISPATCH PROTOCOL</div>
                </div>
              </div>
              <button id="closeMvuModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div class="space-y-3 text-xs">
              <div class="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200">
                <strong>गंभीर स्थिति चेतावनी:</strong> स्थान: <strong>${active ? active.village : "फील्ड"}</strong> | पशुपालक: <strong>${active ? active.farmerName : ""}</strong> (${active ? active.mobile : ""})
              </div>

              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">निकटतम उपलब्ध सचल पशु चिकित्सा इकाई (MVU)</label>
                <select id="mvuUnitSelect" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-rose-500">
                  <option value="MVU-HR-07">MVU Unit 07 (Jhajjar Central Hub - ETA 18 mins)</option>
                  <option value="MVU-HR-12">MVU Unit 12 (Bahadurgarh Sector - ETA 25 mins)</option>
                  <option value="MVU-HR-03">MVU Unit 03 (Rohtak Emergency Squad - ETA 35 mins)</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-400 mb-1">आपातकालीन ऑन-रूट चिकित्सा निर्देश</label>
                <textarea id="mvuDispatchNotes" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-rose-500">${state.clinicalNotes.provisionalDiagnosis}. Dystocia kit and IV fluids required.</textarea>
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button type="button" id="cancelMvuModalBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="button" id="confirmMvuDispatchBtn" class="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50">एंबुलेंस रवाना करें</button>
              </div>
            </div>
          </div>
        </div>
      `;

      const modal = document.getElementById("telemedMvuModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };

      document.getElementById("closeMvuModalBtn").addEventListener("click", closeAction);
      document.getElementById("cancelMvuModalBtn").addEventListener("click", closeAction);

      document.getElementById("confirmMvuDispatchBtn").addEventListener("click", () => {
        const unit = document.getElementById("mvuUnitSelect").value;
        closeAction();
        this.sendChatMessage(`आपातकालीन MVU सचल इकाई (${unit}) प्रेषित कर दी गई है। अनुमानित आगमन समय 20 मिनट है।`, "SYSTEM");
        notify(`आपातकालीन MVU (${unit}) सफलतापूर्वक डिस्पैच की गई!`, "success");
      });
    },

    // 10. PHOTO INSPECTION MODAL
    openPhotoModal: function (url) {
      const mount = document.getElementById("telemed-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="telemedPhotoModal" class="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-slate-700 rounded-2xl max-w-3xl w-full p-4 shadow-2xl relative flex flex-col items-center">
            <button id="closePhotoModalBtn" class="absolute top-3 right-3 text-slate-400 hover:text-white p-2">
              <i class="fa-solid fa-xmark text-xl"></i>
            </button>
            <div class="text-xs font-mono font-bold uppercase text-slate-300 mb-3 self-start">
              हाई-डेफिनिशन क्लिनिकल इमेज निरीक्षण (Magnified Lesion Inspection)
            </div>
            <div class="w-full max-h-[75vh] overflow-hidden rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img src="${url}" alt="Magnified lesion" class="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      `;

      const modal = document.getElementById("telemedPhotoModal");
      document.getElementById("closePhotoModalBtn").addEventListener("click", () => {
        if (modal) modal.remove();
      });
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.remove();
      });
    },

    // 11. VIDEO STREAM ENGINE: Simulated Field Canvas Feed
    initVideoSimulationCanvas: function () {
      const canvas = document.getElementById("telemedCanvasFeed");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 640;
      canvas.height = 360;

      let tick = 0;

      const drawLoop = () => {
        if (!state.containerElement) return;

        tick += 0.04;
        const isCall = state.activeSession.isCallActive;

        // Background
        ctx.fillStyle = isCall ? "#0a1120" : "#020617";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (isCall) {
          // Draw subtle field animal background silhouette
          ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
          ctx.lineWidth = 1;
          for (let x = 0; x < canvas.width; x += 32) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
          }
          for (let y = 0; y < canvas.height; y += 32) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          }

          // Animated simulated farmer video signal
          const waveHeight = Math.sin(tick) * 20;
          ctx.fillStyle = "#1e293b";
          ctx.beginPath();
          ctx.ellipse(320, 180 + waveHeight, 130, 90, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#334155";
          ctx.beginPath();
          ctx.arc(320, 120 + waveHeight, 45, 0, Math.PI * 2);
          ctx.fill();

          // Audio Frequency Indicator Bars
          ctx.fillStyle = "#10b981";
          for (let i = 0; i < 18; i++) {
            const barH = Math.abs(Math.sin(tick + i * 0.4)) * 28 + 4;
            ctx.fillRect(20 + i * 8, 335 - barH, 5, barH);
          }

          // Top Telemetry Feed
          ctx.fillStyle = "rgba(2, 6, 23, 0.7)";
          ctx.fillRect(15, 15, 230, 30);
          ctx.strokeStyle = "rgba(51, 65, 85, 0.8)";
          ctx.strokeRect(15, 15, 230, 30);

          ctx.fillStyle = "#34d399";
          ctx.font = "bold 11px monospace";
          ctx.fillText("CAM-01 • 1080P/60FPS • ENCRYPTED", 25, 34);

          // Center Crosshairs
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.beginPath();
          ctx.moveTo(310, 180);
          ctx.lineTo(330, 180);
          ctx.moveTo(320, 170);
          ctx.lineTo(320, 190);
          ctx.stroke();
        }

        state.animFrameId = requestAnimationFrame(drawLoop);
      };

      if (state.animFrameId) cancelAnimationFrame(state.animFrameId);
      drawLoop();
    }
  };

  // Register on Global Namespace
  root.VetcareApp.Modules.TelemedicineConsultation = TelemedicineConsultation;

})(typeof window !== "undefined" ? window : this);
