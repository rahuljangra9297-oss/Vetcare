// Vetcare AI OS - Farmer Emergency SOS, Video Teleconsultation & Digital Rx Viewer (2026 Production)

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
          try { fn(payload); } catch (e) { console.error("[Teleconsult EventBus Error]", e); }
        });
      }
      window.dispatchEvent(new CustomEvent("vetcare:" + event, { detail: payload }));
    }
  };
  window.VetcareApp.Core.EventBus = EventBus;

  // 2. AUDIO SYNTHESIS ENGINE (TACTILE EMERGENCY SIRENS & CALL RINGTONES)
  const TeleAudio = {
    playTone: function (freq, type, duration, vol) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type || "sine";
        osc.frequency.setValueAtTime(freq || 440, ctx.currentTime);
        gain.gain.setValueAtTime(vol || 0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (duration || 0.25));
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + (duration || 0.25));
      } catch (e) {
        // Fallback for strict browser autoplay
      }
    },
    sirenAlert: function () {
      TeleAudio.playTone(987.77, "sawtooth", 0.3, 0.2);
      setTimeout(() => TeleAudio.playTone(493.88, "sawtooth", 0.35, 0.22), 220);
      setTimeout(() => TeleAudio.playTone(987.77, "sawtooth", 0.45, 0.25), 450);
    },
    phoneRinging: function () {
      TeleAudio.playTone(440, "sine", 0.4, 0.12);
      setTimeout(() => TeleAudio.playTone(480, "sine", 0.4, 0.12), 80);
    },
    callConnected: function () {
      TeleAudio.playTone(523.25, "sine", 0.15, 0.1);
      setTimeout(() => TeleAudio.playTone(659.25, "sine", 0.15, 0.1), 120);
      setTimeout(() => TeleAudio.playTone(783.99, "sine", 0.25, 0.12), 240);
    },
    rxArrived: function () {
      TeleAudio.playTone(587.33, "triangle", 0.15, 0.1);
      setTimeout(() => TeleAudio.playTone(880, "triangle", 0.25, 0.12), 140);
    }
  };

  // 3. STORAGE LAYER: INDEXED-DB PERSISTENCE FOR E-PRESCRIPTIONS & CALL LOGS
  const TeleStorage = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    saveReceivedRx: async function (rx) {
      try {
        if (!window.indexedDB) return;
        const req = window.indexedDB.open(TeleStorage.DB_NAME, TeleStorage.DB_VERSION);
        req.onsuccess = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("farmer_prescriptions")) return;
          const tx = db.transaction("farmer_prescriptions", "readwrite");
          tx.objectStore("farmer_prescriptions").put(rx);
        };
      } catch (err) {
        try {
          localStorage.setItem("VETCARE_RX_" + rx.rxId, JSON.stringify(rx));
        } catch (e) {
          console.warn("[TeleStorage] LocalStorage write error", e);
        }
      }
    }
  };

  // 4. MAIN TELECONSULTATION & EMERGENCY SOS CONTROLLER
  const TeleconsultSos = {
    // --- Reactive Internal State ---
    state: {
      activeEmergencyCall: {
        callId: null,
        status: "IDLE", // IDLE | DISPATCHING_SOS | CONNECTING_DOCTOR | IN_CALL | ENDED
        assignedDoctor: {
          name: "डॉ. राहुल जांगड़ा (Dr. Rahul Jangra)",
          qualification: "B.V.Sc & A.H., M.V.Sc (Medicine)",
          regNo: "VCI-2026-9297",
          dutyStation: "केंद्रीय रेफरल पशु चिकित्सालय एवं मोबाइल यूनिट #01",
          avatarText: "DR"
        },
        gpsCoords: "29.1492° N, 75.7217° E (Hisar)",
        callDurationSec: 0,
        isMuted: false,
        isVideoOff: false,
        isTorchOn: false
      },
      uploadedPhotos: [
        {
          photoId: "PHT-01",
          timestamp: "आज, 10:15 AM",
          caption: "बाएं थन में सूजन व रक्तिम छीछड़े (Mastitic Udder Swelling)",
          base64Url: null
        }
      ],
      farmerChatMessages: [
        { sender: "DOCTOR", text: "नमस्ते रामनिवास जी, मैं डॉ. राहुल बोल रहा हूँ। पशु को क्या तकलीफ है?", time: "10:16 AM" },
        { sender: "FARMER", text: "डॉक्टर साहब, मुर्रा भैंस ने कल शाम से जुगाली बंद कर दी है और पेट फूला हुआ है।", time: "10:17 AM" },
        { sender: "DOCTOR", text: "चिंता न करें, मैंने वीडियो में देख लिया है। तुरंत आफरे की दवाई दे रहा हूँ, ई-पर्ची आपके फोन पर आ गई है।", time: "10:18 AM" }
      ],
      receivedPrescriptions: [
        {
          rxId: "RX-2026-8818",
          date: "2026-03-31",
          time: "10:20 AM",
          doctorName: "डॉ. राहुल जांगड़ा (VCI-2026-9297)",
          animalName: "गंगा (मुर्रा भैंस)",
          animalTag: "100022195412",
          diagnosis: "तीव्र आफरा व रूमेन गति शून्यता (Acute Ruminal Tympany)",
          medicines: [
            {
              name: "Bloatosil Emulsion (100 ml)",
              doseHindi: "पूरी 100 ml शीशी 500ml गुनगुने पानी में मिलाकर तुरंत पिलाएं",
              duration: "तत्काल (Stat), जरूरत पड़ने पर 4 घंटे बाद दोहराएं",
              icon: "fa-bottle-droplet"
            },
            {
              name: "Flunixin Meglumine Injection (20 ml)",
              doseHindi: "20 ml नस (IV) में डॉक्टर या कंपाउण्डर द्वारा लगवाएं",
              duration: "दिन में एक बार (OD) x 2 दिन",
              icon: "fa-syringe"
            },
            {
              name: "Toruf Rumen Bolus (बोलस)",
              doseHindi: "2-2 गोली सुबह व शाम गुड़ में रखकर खिलाएं",
              duration: "3 दिन तक लगातार",
              icon: "fa-tablets"
            }
          ],
          adviceHindi: "दूध का उपयोग 36 घंटे तक न करें। भारी हरा चारा 24 घंटे बंद रखें, केवल सूखा भूसा व गुनगुना पानी दें।"
        }
      ],
      activeTab: "sos_emergency_dialer", // sos_emergency_dialer | live_teleconsult_room | my_prescriptions_rx
      isPharmacistModalOpen: false,
      activePharmacistRx: null,
      callIntervalTimer: null,
      domContainer: null
    },

    // 5. LIFECYCLE: INIT
    init: function (containerId) {
      console.info("[Vetcare AI OS] Initializing Farmer Emergency SOS & Teleconsultation Subsystem (2026 Production)...");
      TeleconsultSos.injectStyles();
      TeleconsultSos.fetchLiveGps();
      TeleconsultSos.bindEventBusListeners();

      if (containerId) {
        TeleconsultSos.render(containerId);
      }
      return TeleconsultSos;
    },

    // 6. LIFECYCLE: RENDER
    render: function (containerId) {
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement("div");
        container.id = containerId || "farmerTeleconsultContainer";
        container.className = "w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6 pb-24";
        const mainHost = document.querySelector("main") || document.body;
        mainHost.innerHTML = "";
        mainHost.appendChild(container);
      }
      TeleconsultSos.state.domContainer = container;

      // Construct Complete Mobile-Optimized Teleconsultation UI
      container.innerHTML = `
        <div id="vetcareTeleconsultWorkspace" class="max-w-4xl mx-auto space-y-5">
          ${TeleconsultSos.renderMasterHeader()}
          ${TeleconsultSos.renderNavigationTabs()}
          <div id="teleconsultTabContentHost" class="transition-all duration-200">
            ${TeleconsultSos.renderActiveTabContent()}
          </div>
        </div>

        <!-- Fullscreen Pharmacist View Modal -->
        <div id="pharmacistRxModalHost" class="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md ${TeleconsultSos.state.isPharmacistModalOpen ? "flex" : "hidden"} items-center justify-center p-3 sm:p-4">
          ${TeleconsultSos.renderPharmacistViewModal()}
        </div>
      `;

      TeleconsultSos.bindDomActions();
    },

    // 7. LIFECYCLE: DESTROY
    destroy: function () {
      if (TeleconsultSos.state.callIntervalTimer) {
        clearInterval(TeleconsultSos.state.callIntervalTimer);
        TeleconsultSos.state.callIntervalTimer = null;
      }
      if (TeleconsultSos.state.domContainer) {
        TeleconsultSos.state.domContainer.innerHTML = "";
      }
      console.info("[Vetcare AI OS] Farmer Teleconsultation cleanly destroyed.");
    },

    // 8. DYNAMIC CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-teleconsult-styles")) return;
      const style = document.createElement("style");
      style.id = "vetcare-teleconsult-styles";
      style.textContent = `
        .sos-super-button {
          animation: sosGlowPulse 1.8s infinite;
        }
        @keyframes sosGlowPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.8), 0 0 25px rgba(239, 68, 68, 0.5);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 18px rgba(239, 68, 68, 0), 0 0 45px rgba(239, 68, 68, 0.8);
            transform: scale(1.02);
          }
        }
        .video-call-scanlines {
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          background-size: 100% 3px, 6px 100%;
        }
      `;
      document.head.appendChild(style);
    },

    // 9. LIVE GPS GEOLOCATION ENGINE
    fetchLiveGps: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            TeleconsultSos.state.activeEmergencyCall.gpsCoords = `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`;
            const el = document.getElementById("sosGpsLiveBadge");
            if (el) el.textContent = TeleconsultSos.state.activeEmergencyCall.gpsCoords;
          },
          function () {
            // Keep default Hisar fallback
          },
          { timeout: 8000 }
        );
      }
    },

    // 10. COMPONENT: MASTER CLINICAL HEADER
    renderMasterHeader: function () {
      return `
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 shadow-xl relative overflow-hidden sunlight-card">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-rose-950/40">
                <i class="fa-solid fa-headset"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight sunlight-text">
                    आपातकालीन एसओएस एवं डॉक्टर वीडियो कॉल
                  </h1>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    24/7 RURAL TELE-TRIAGE
                  </span>
                </div>
                <div class="text-xs font-mono text-slate-400 mt-0.5 sunlight-muted">
                  तत्काल ऑडियो/वीडियो परामर्श, घाव फोटो अपलोड एवं डिजिटल ई-पर्ची
                </div>
              </div>
            </div>

            <!-- Helpline Quick Call Button -->
            <a href="tel:18008382273" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-bold font-mono flex items-center gap-2 shadow">
              <i class="fa-solid fa-phone-volume"></i>
              <span>1800-VET-CARE (टोल-फ्री)</span>
            </a>
          </div>
        </div>
      `;
    },

    // 11. COMPONENT: NAVIGATION TABS
    renderNavigationTabs: function () {
      const active = TeleconsultSos.state.activeTab;
      const rxCount = TeleconsultSos.state.receivedPrescriptions.length;
      const isCallActive = TeleconsultSos.state.activeEmergencyCall.status === "IN_CALL";

      const tabs = [
        { id: "sos_emergency_dialer", label: "इमरजेंसी एसओएस (Emergency SOS)", icon: "fa-truck-medical" },
        { id: "live_teleconsult_room", label: "लाइव वीडियो रूम (Video Call)", icon: "fa-video", activeBadge: isCallActive },
        { id: "my_prescriptions_rx", label: "मेरी ई-पर्चियां (Digital Rx)", icon: "fa-prescription", count: rxCount }
      ];

      return `
        <div class="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs.map(t => `
            <button type="button" data-tele-tab="${t.id}" class="tele-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
              active === t.id
                ? "bg-slate-900 text-rose-400 border-t-2 border-l border-r border-rose-500 border-b-transparent shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }">
              <i class="fa-solid ${t.icon}"></i>
              <span>${t.label}</span>
              ${t.count !== undefined ? `<span class="px-1.5 py-0.2 rounded-full text-[10px] font-mono ${active === t.id ? "bg-rose-500 text-white font-black" : "bg-slate-800 text-slate-300"}">${t.count}</span>` : ""}
              ${t.activeBadge ? `<span class="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-beacon"></span>` : ""}
            </button>
          `).join("")}
        </div>
      `;
    },

    // 12. TAB CONTENT ROUTER
    renderActiveTabContent: function () {
      switch (TeleconsultSos.state.activeTab) {
        case "live_teleconsult_room":
          return TeleconsultSos.renderLiveTeleconsultRoomTab();
        case "my_prescriptions_rx":
          return TeleconsultSos.renderMyPrescriptionsTab();
        case "sos_emergency_dialer":
        default:
          return TeleconsultSos.renderSosDialerTab();
      }
    },

    // 13. COMPONENT: TAB 1 - SOS EMERGENCY DIALER & WOUND PHOTO UPLOADER
    renderSosDialerTab: function () {
      const call = TeleconsultSos.state.activeEmergencyCall;
      const photos = TeleconsultSos.state.uploadedPhotos;

      return `
        <div class="space-y-6">
          
          <!-- Giant High-Visibility Red SOS Button -->
          <div class="p-8 rounded-3xl bg-gradient-to-b from-rose-950/60 via-slate-900 to-slate-950 border-2 border-rose-500/80 shadow-2xl text-center space-y-4 relative overflow-hidden sunlight-card">
            
            <div class="max-w-md mx-auto space-y-2">
              <span class="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                ONE-TOUCH VET DISPATCH
              </span>
              <h2 class="text-xl sm:text-2xl font-display font-black text-white tracking-tight sunlight-text">
                पशु गंभीर है? 1-टच में डॉक्टर बुलाएं
              </h2>
              <p class="text-xs text-slate-300 font-sans leading-relaxed sunlight-muted">
                बटन दबाते ही आपकी लाइव जीपीएस लोकेशन नजदीकी मोबाइल वेटरनरी यूनिट एवं ऑन-ड्यूटी डॉक्टर को डिस्पैच हो जाएगी।
              </p>
            </div>

            <!-- Giant Master Button -->
            <div class="pt-4 pb-2 flex justify-center">
              <button id="btnTriggerOneTouchSos" type="button" class="w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-rose-700 via-red-600 to-rose-500 text-white flex flex-col items-center justify-center gap-2 font-display font-black text-base sm:text-lg uppercase tracking-wider shadow-2xl sos-super-button active:scale-95 transition-all">
                <i class="fa-solid fa-phone-volume text-4xl sm:text-5xl animate-bounce"></i>
                <span class="text-center px-4 leading-tight">तत्काल डॉक्टर बुलाएं<br/><span class="text-xs font-mono font-bold tracking-widest text-amber-300">(EMERGENCY SOS)</span></span>
              </button>
            </div>

            <!-- GPS Indicator Banner -->
            <div class="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
              <i class="fa-solid fa-location-crosshairs text-emerald-400"></i>
              <span>सत्यापित जीपीएस:</span>
              <strong id="sosGpsLiveBadge" class="text-emerald-400">${call.gpsCoords}</strong>
            </div>

            ${call.status === "DISPATCHING_SOS" ? `
              <div class="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono animate-pulse">
                ⚡ अलर्ट भेजा जा रहा है... डॉक्टर से सिग्नल कनेक्ट हो रहा है...
              </div>
            ` : ""}
          </div>

          <!-- Wound / Lesion Photo Uploader Box -->
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-camera text-cyan-400"></i>
                <h3 class="font-display font-extrabold text-sm text-white uppercase tracking-wider sunlight-text">बीमार अंग या घाव की फोटो अपलोड करें</h3>
              </div>
              <span class="text-[10px] font-mono text-cyan-400">DOCTOR PRE-REVIEW</span>
            </div>

            <!-- Photo Upload Trigger -->
            <div class="flex items-center gap-3">
              <input type="file" id="inputWoundPhotoFile" accept="image/*" capture="environment" class="hidden" />
              <button id="btnTriggerWoundCamera" type="button" class="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 shadow">
                <i class="fa-solid fa-camera text-cyan-400"></i>
                <span>कैमरा खोलें व फोटो खींचें</span>
              </button>
              <span class="text-xs text-slate-400 font-sans">थन, खुर, मुंह के छाले या आंख की साफ फोटो लें</span>
            </div>

            <!-- Uploaded Photos Stack -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              ${photos.map(p => `
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <div class="w-14 h-14 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500 text-xl overflow-hidden shrink-0">
                    ${p.base64Url ? `<img src="${p.base64Url}" class="w-full h-full object-cover" />` : '<i class="fa-solid fa-image"></i>'}
                  </div>
                  <div class="space-y-0.5 flex-1">
                    <div class="text-xs font-bold text-slate-200 truncate">${p.caption}</div>
                    <div class="text-[10px] font-mono text-slate-500">${p.timestamp}</div>
                    <div class="text-[10px] font-mono text-emerald-400">✓ डॉक्टर को भेजा गया</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

        </div>
      `;
    },

    // 14. COMPONENT: TAB 2 - LIVE VIDEO TELECONSULTATION ROOM
    renderLiveTeleconsultRoomTab: function () {
      const call = TeleconsultSos.state.activeEmergencyCall;
      const isCallActive = call.status === "IN_CALL";
      const doc = call.assignedDoctor;

      // Format Call Duration Seconds into MM:SS
      const mins = String(Math.floor(call.callDurationSec / 60)).padStart(2, "0");
      const secs = String(call.callDurationSec % 60).padStart(2, "0");

      return `
        <div class="space-y-4">
          <!-- Main Simulated Video Feed Card -->
          <div class="rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl relative overflow-hidden aspect-[4/3] sm:aspect-video flex flex-col justify-between p-4 sm:p-5 video-call-scanlines">
            
            <!-- Top Call Bar: Doctor Identity & Live Duration -->
            <div class="flex items-center justify-between z-10">
              <div class="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow">
                <div class="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs">
                  ${doc.avatarText}
                </div>
                <div>
                  <div class="font-display font-extrabold text-xs text-white">${doc.name}</div>
                  <div class="text-[9px] font-mono text-emerald-400">${doc.regNo} • ऑनलाइन परामर्श</div>
                </div>
              </div>

              <!-- Live Call Duration Pill -->
              <div class="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 font-mono text-xs">
                <span class="w-2.5 h-2.5 rounded-full ${isCallActive ? "bg-emerald-400 pulse-beacon" : "bg-amber-400"}"></span>
                <span class="text-white font-bold tracking-wider">${isCallActive ? `${mins}:${secs}` : "प्रतीक्षारत..."}</span>
              </div>
            </div>

            <!-- Center Call Graphics / Doctor Stream Simulation -->
            <div class="flex flex-col items-center justify-center text-center space-y-3 z-10">
              <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-900/80 border-4 ${isCallActive ? "border-emerald-500" : "border-amber-500"} flex items-center justify-center text-4xl text-emerald-400 shadow-2xl">
                <i class="fa-solid fa-user-doctor"></i>
              </div>
              <div class="space-y-1">
                <div class="text-sm font-display font-black text-white">${isCallActive ? "डॉक्टर से लाइव परामर्श सक्रिय है" : "डॉक्टर से संपर्क स्थापित किया जा रहा है..."}</div>
                <div class="text-xs text-slate-400 font-mono">एनक्रिप्टेड वेटरनरी ऑडियो/वीडियो लिंक</div>
              </div>
            </div>

            <!-- Farmer Self-View PIP (Picture-In-Picture) Window -->
            <div class="absolute bottom-20 right-4 sm:right-6 w-24 h-32 sm:w-28 sm:h-36 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-2xl flex flex-col items-center justify-center overflow-hidden z-20">
              ${call.isVideoOff ? `
                <div class="text-slate-500 text-center p-2">
                  <i class="fa-solid fa-video-slash text-xl mb-1"></i>
                  <div class="text-[9px]">कैमरा बंद</div>
                </div>
              ` : `
                <div class="w-full h-full bg-slate-800 flex flex-col items-center justify-center text-slate-400">
                  <i class="fa-solid fa-cow text-2xl text-amber-400 mb-1"></i>
                  <span class="text-[9px] font-mono">आपका कैमरा</span>
                </div>
              `}
            </div>

            <!-- Bottom Floating Call Controls Toolbar -->
            <div class="flex items-center justify-center gap-3 sm:gap-4 z-20">
              <!-- Mute Button -->
              <button id="btnToggleCallMute" type="button" class="w-11 h-11 rounded-2xl ${call.isMuted ? "bg-rose-600 text-white" : "bg-slate-800/90 text-slate-200"} hover:bg-slate-700 flex items-center justify-center text-base shadow transition-all">
                <i class="fa-solid ${call.isMuted ? "fa-microphone-slash" : "fa-microphone"}"></i>
              </button>

              <!-- Video Toggle Button -->
              <button id="btnToggleCallVideo" type="button" class="w-11 h-11 rounded-2xl ${call.isVideoOff ? "bg-rose-600 text-white" : "bg-slate-800/90 text-slate-200"} hover:bg-slate-700 flex items-center justify-center text-base shadow transition-all">
                <i class="fa-solid ${call.isVideoOff ? "fa-video-slash" : "fa-video"}"></i>
              </button>

              <!-- Torch / Flashlight Toggle (For checking animal mouth/teat in dark sheds) -->
              <button id="btnToggleCallTorch" type="button" class="w-11 h-11 rounded-2xl ${call.isTorchOn ? "bg-amber-500 text-slate-950 font-black" : "bg-slate-800/90 text-slate-200"} hover:bg-slate-700 flex items-center justify-center text-base shadow transition-all" title="टॉर्च / फ्लैशलाइट ऑन करें">
                <i class="fa-solid fa-flashlight"></i>
              </button>

              <!-- End Call Master Button -->
              <button id="btnEndTeleconsultCall" type="button" class="px-5 h-11 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-rose-950/60 active:scale-95 transition-all">
                <i class="fa-solid fa-phone-slash text-sm"></i>
                <span>कॉल समाप्त</span>
              </button>
            </div>

          </div>

          <!-- Interactive Clinical Chat Messages During Call -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 sunlight-card">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 class="font-display font-extrabold text-xs uppercase text-slate-300">डॉक्टर-किसान लाइव संदेश (Consultation Messages)</h3>
              <span class="text-[10px] font-mono text-emerald-400">INSTANT MESSAGING</span>
            </div>

            <div class="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar text-xs">
              ${TeleconsultSos.state.farmerChatMessages.map(m => `
                <div class="flex flex-col ${m.sender === "FARMER" ? "items-end" : "items-start"}">
                  <div class="p-2.5 rounded-xl max-w-xs ${m.sender === "FARMER" ? "bg-emerald-600 text-white rounded-br-none" : "bg-slate-800 text-slate-200 rounded-bl-none"}">
                    ${m.text}
                  </div>
                  <span class="text-[9px] font-mono text-slate-500 mt-0.5">${m.time}</span>
                </div>
              `).join("")}
            </div>

            <!-- Send Message Input -->
            <form id="formSendFarmerChatMessage" onsubmit="return false;" class="flex items-center gap-2 pt-1">
              <input type="text" id="inputFarmerChatText" class="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" placeholder="डॉक्टर को संदेश लिखें..." required />
              <button type="submit" class="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold shadow">
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      `;
    },

    // 15. COMPONENT: TAB 3 - MY DIGITAL PRESCRIPTIONS (ई-पर्चियां)
    renderMyPrescriptionsTab: function () {
      const prescriptions = TeleconsultSos.state.receivedPrescriptions;

      return `
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 sunlight-card">
            <div>
              <h2 class="font-display font-black text-sm text-white uppercase sunlight-text">मेरी डिजिटल ई-पर्चियां (${prescriptions.length})</h2>
              <p class="text-xs text-slate-400 sunlight-muted">डॉक्टर द्वारा जारी दवाइयों की पर्चियां, खुराक एवं मेडिकल स्टोर पर दिखाने हेतु पर्चा।</p>
            </div>
          </div>

          <div class="space-y-4">
            ${prescriptions.map(rx => `
              <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
                
                <!-- Rx Top Identity -->
                <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span class="font-mono text-[10px] text-emerald-400 font-bold block">${rx.rxId} • ${rx.date} (${rx.time})</span>
                    <h3 class="font-display font-black text-base text-white sunlight-text">${rx.animalName}</h3>
                    <div class="text-[10px] font-mono text-slate-400">टैग: ${rx.animalTag} • चिकित्सक: ${rx.doctorName}</div>
                  </div>

                  <!-- Big Show to Chemist Button -->
                  <button type="button" data-action="open_pharmacist_view" data-rx-id="${rx.rxId}" class="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-display font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-950/40 flex items-center gap-1.5 active:scale-95 transition-all">
                    <i class="fa-solid fa-store"></i>
                    <span>दुकानदार को दिखाएं</span>
                  </button>
                </div>

                <!-- Diagnosis Badge -->
                <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span class="text-slate-400 text-[10px] uppercase font-mono block">रोग / बीमारी का नाम:</span>
                  <strong class="text-emerald-400 font-bold">${rx.diagnosis}</strong>
                </div>

                <!-- Medicines List in Easy Hindi -->
                <div class="space-y-2.5">
                  <span class="text-xs font-mono uppercase text-slate-300 font-bold block">दवाएं एवं सेवन विधि (Medicines & Dosages):</span>
                  ${rx.medicines.map((m, idx) => `
                    <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                      <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                        <i class="fa-solid ${m.icon}"></i>
                      </div>
                      <div class="space-y-0.5">
                        <div class="font-bold text-white text-xs sunlight-text">${idx + 1}. ${m.name}</div>
                        <div class="text-xs text-amber-300 font-semibold font-sans">${m.doseHindi}</div>
                        <div class="text-[10px] font-mono text-slate-400">अवधि: ${m.duration}</div>
                      </div>
                    </div>
                  `).join("")}
                </div>

                <!-- Farmer Advice Box -->
                <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  <strong class="text-amber-400 font-bold block text-[10px] uppercase">डॉक्टर की विशेष सलाह:</strong>
                  ${rx.adviceHindi}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    },

    // 16. COMPONENT: FULLSCREEN HIGH-CONTRAST PHARMACIST VIEW MODAL
    renderPharmacistViewModal: function () {
      const rx = TeleconsultSos.state.activePharmacistRx || TeleconsultSos.state.receivedPrescriptions[0];
      if (!rx) return "";

      return `
        <div class="bg-white text-slate-950 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 font-sans">
          
          <!-- Header Bar -->
          <div class="flex items-start justify-between border-b-2 border-slate-900 pb-3">
            <div>
              <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600">OFFICIAL VETERINARY PRESCRIPTION</div>
              <h2 class="text-xl font-black text-slate-950 font-display">ई-पर्चे की प्रति (फार्मेसी कॉपी)</h2>
              <div class="text-xs font-bold text-emerald-800">${rx.doctorName}</div>
            </div>
            <button id="btnClosePharmacistModal" type="button" class="text-slate-500 hover:text-black p-1 text-2xl font-bold">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Animal Particulars -->
          <div class="grid grid-cols-2 gap-2 bg-slate-100 p-2.5 rounded-xl text-xs">
            <div>पशु: <strong>${rx.animalName}</strong></div>
            <div>टैग सं.: <strong class="font-mono">${rx.animalTag}</strong></div>
            <div>दिनांक: <strong>${rx.date}</strong></div>
            <div>पर्चा सं.: <strong class="font-mono">${rx.rxId}</strong></div>
          </div>

          <!-- Prescription Drugs List with Big Clear Text for Chemist -->
          <div class="space-y-3">
            <div class="text-xs font-black uppercase tracking-wider text-slate-700">℞ दवाइयां (Dispense Following Medicines):</div>
            <div class="space-y-2">
              ${rx.medicines.map((m, i) => `
                <div class="p-3 rounded-xl border-2 border-slate-300 bg-slate-50 flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ${i + 1}
                  </div>
                  <div>
                    <div class="text-sm font-black text-slate-950">${m.name}</div>
                    <div class="text-xs font-bold text-slate-700 mt-0.5">${m.doseHindi}</div>
                    <div class="text-[11px] font-mono text-slate-500">खुराक अवधि: ${m.duration}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Bottom Notice -->
          <div class="border-t border-slate-300 pt-3 text-[10px] text-slate-600 font-mono flex items-center justify-between">
            <span>डिजिटल हस्ताक्षरित पर्ची • ISO-VET 2026</span>
            <span class="font-bold text-emerald-800">100% प्राधिकृत प्रिस्क्रिप्शन</span>
          </div>

          <!-- Print / Dismiss -->
          <div class="pt-1 flex gap-2">
            <button id="btnClosePharmacistViewBottom" type="button" class="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs">
              बंद करें (Dismiss)
            </button>
          </div>
        </div>
      `;
    },

    // 17. TRIGGER EMERGENCY SOS FLOW (AUTOMATED DISPATCH SIMULATION)
    triggerEmergencySosFlow: function () {
      TeleAudio.sirenAlert();
      TeleconsultSos.state.activeEmergencyCall.status = "DISPATCHING_SOS";
      TeleconsultSos.render(TeleconsultSos.state.domContainer.id);

      // Emit high-priority SOS packet to system bus
      EventBus.emit("emergency:sos_triggered", {
        callId: "SOS-" + Date.now(),
        farmerName: "रामनिवास यादव",
        phone: "9991039297",
        village: "धांसू, हिसार",
        gps: TeleconsultSos.state.activeEmergencyCall.gpsCoords,
        timestamp: Date.now()
      });

      // 1.5s later -> Connecting Doctor
      setTimeout(() => {
        TeleconsultSos.state.activeEmergencyCall.status = "CONNECTING_DOCTOR";
        TeleAudio.phoneRinging();
        TeleconsultSos.render(TeleconsultSos.state.domContainer.id);

        // 2.5s later -> Doctor Accepts & Video Call Starts
        setTimeout(() => {
          TeleconsultSos.state.activeEmergencyCall.status = "IN_CALL";
          TeleconsultSos.state.activeEmergencyCall.callDurationSec = 0;
          TeleconsultSos.state.activeTab = "live_teleconsult_room";
          TeleAudio.callConnected();

          // Start Timer Tick
          if (TeleconsultSos.state.callIntervalTimer) {
            clearInterval(TeleconsultSos.state.callIntervalTimer);
          }
          TeleconsultSos.state.callIntervalTimer = setInterval(() => {
            TeleconsultSos.state.activeEmergencyCall.callDurationSec++;
            const el = document.getElementById("liveCallTimerSpan");
            if (el) {
              const mins = String(Math.floor(TeleconsultSos.state.activeEmergencyCall.callDurationSec / 60)).padStart(2, "0");
              const secs = String(TeleconsultSos.state.activeEmergencyCall.callDurationSec % 60).padStart(2, "0");
              el.textContent = `${mins}:${secs}`;
            }
          }, 1000);

          TeleconsultSos.render(TeleconsultSos.state.domContainer.id);

          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("डॉक्टर से वीडियो कॉल कनेक्ट हो चुकी है!", "success");
          }
        }, 2500);
      }, 1500);
    },

    // 18. END TELECONSULTATION CALL
    endCall: function () {
      if (TeleconsultSos.state.callIntervalTimer) {
        clearInterval(TeleconsultSos.state.callIntervalTimer);
        TeleconsultSos.state.callIntervalTimer = null;
      }
      TeleconsultSos.state.activeEmergencyCall.status = "ENDED";
      TeleconsultSos.state.activeTab = "my_prescriptions_rx";
      TeleconsultSos.render(TeleconsultSos.state.domContainer.id);
      TeleAudio.playTone(330, "sine", 0.3, 0.1);

      if (window.VetcareApp.showToast) {
        window.VetcareApp.showToast("परामर्श कॉल समाप्त। ई-पर्ची उपलब्ध है।", "info");
      }
    },

    // 19. EVENT BUS LISTENERS: AUTO-SYNC INCOMING PRESCRIPTIONS
    bindEventBusListeners: function () {
      EventBus.on("prescription:saved", function (payload) {
        if (!payload) return;
        const newRx = {
          rxId: payload.consultationId || ("RX-2026-" + Math.floor(1000 + Math.random() * 9000)),
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
          doctorName: "डॉ. राहुल जांगड़ा (VCI-2026-9297)",
          animalName: "गंगा (मुर्रा भैंस)",
          animalTag: payload.patientId || "100022195412",
          diagnosis: "क्लिनिकल परीक्षण पश्चात जारी पर्ची",
          medicines: (payload.drugs && payload.drugs.length > 0) ? payload.drugs.map(d => ({
            name: d.name,
            doseHindi: `${d.calculatedDose || "खुराक"} (${d.route || "मुंह द्वारा"})`,
            duration: d.freq || "3 दिन",
            icon: "fa-pills"
          })) : [
            { name: "Flunixin Meglumine", doseHindi: "20 ml IV", duration: "2 दिन", icon: "fa-syringe" }
          ],
          adviceHindi: "दवा समय पर दें। कोई भी समस्या होने पर पुनः संपर्क करें।"
        };

        TeleconsultSos.state.receivedPrescriptions.unshift(newRx);
        TeleStorage.saveReceivedRx(newRx);
        TeleAudio.rxArrived();

        if (TeleconsultSos.state.domContainer) {
          TeleconsultSos.render(TeleconsultSos.state.domContainer.id);
        }

        if (window.VetcareApp.showToast) {
          window.VetcareApp.showToast("नई डिजिटल ई-पर्ची प्राप्त हुई!", "success");
        }
      });
    },

    // 20. DOM EVENT DELEGATION & ACTION BINDINGS
    bindDomActions: function () {
      const root = TeleconsultSos.state.domContainer;
      if (!root) return;

      // Tab clicks
      root.querySelectorAll(".tele-tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const tab = this.getAttribute("data-tele-tab");
          if (tab) {
            TeleconsultSos.state.activeTab = tab;
            TeleconsultSos.render(TeleconsultSos.state.domContainer.id);
          }
        });
      });

      // Master Red SOS Button Trigger
      const btnSosMaster = document.getElementById("btnTriggerOneTouchSos");
      if (btnSosMaster) {
        btnSosMaster.addEventListener("click", () => TeleconsultSos.triggerEmergencySosFlow());
      }

      // Wound Camera Uploader Button
      const btnCamera = document.getElementById("btnTriggerWoundCamera");
      const fileInput = document.getElementById("inputWoundPhotoFile");
      if (btnCamera && fileInput) {
        btnCamera.addEventListener("click", () => fileInput.click());
        fileInput.addEventListener("change", function () {
          if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
              TeleconsultSos.state.uploadedPhotos.unshift({
                photoId: "PHT-" + Date.now(),
                timestamp: "अभी (Just Now)",
                caption: "कैमरे द्वारा अपलोड किया गया घाव/लक्षण फोटो",
                base64Url: e.target.result
              });
              TeleconsultSos.render(TeleconsultSos.state.domContainer.id);
              TeleAudio.playTone(659.25, "sine", 0.1, 0.08);
            };
            reader.readAsDataURL(this.files[0]);
          }
        });
      }

      // Video Room Controls
      const btnEndCall = document.getElementById("btnEndTeleconsultCall");
      if (btnEndCall) btnEndCall.addEventListener("click", () => TeleconsultSos.endCall());

      const btnMute = document.getElementById("btnToggleCallMute");
      if (btnMute) {
        btnMute.addEventListener("click", function () {
          TeleconsultSos.state.activeEmergencyCall.isMuted = !TeleconsultSos.state.activeEmergencyCall.isMuted;
          TeleconsultSos.render(TeleconsultSos.state.domContainer.id);
        });
      }

      const btnVideo = document.getElementById("btnToggleCallVideo");
      if (btnVideo) {
        btnVideo.addEventListener("click", function () {
          TeleconsultSos.state.activeEmergencyCall.isVideoOff = !TeleconsultSos.state.activeEmergencyCall.isVideoOff;
          TeleconsultSos.render(TeleconsultSos.state.domContainer.id);
        });
      }

      const btnTorch = document.getElementById("btnToggleCallTorch");
      if (btnTorch) {
        btnTorch.addEventListener("click", function () {
          TeleconsultSos.state.activeEmergencyCall.isTorchOn = !TeleconsultSos.state.activeEmergencyCall.isTorchOn;
          TeleconsultSos.render(TeleconsultSos.state.domContainer.id);
        });
      }

      // Send Chat Form in Video Call
      const formChat = document.getElementById("formSendFarmerChatMessage");
      if (formChat) {
        formChat.addEventListener("submit", function () {
          const input = document.getElementById("inputFarmerChatText");
          if (input && input.value.trim()) {
            TeleconsultSos.state.farmerChatMessages.push({
              sender: "FARMER",
              text: input.value.trim(),
              time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
            });
            input.value = "";
            TeleconsultSos.render(TeleconsultSos.state.domContainer.id);
          }
        });
      }

      // Close Pharmacist Modal
      const btnClosePharm = document.getElementById("btnClosePharmacistModal");
      const btnClosePharmBottom = document.getElementById("btnClosePharmacistViewBottom");
      const closePharm = function () {
        TeleconsultSos.state.isPharmacistModalOpen = false;
        TeleconsultSos.render(TeleconsultSos.state.domContainer.id);
      };
      if (btnClosePharm) btnClosePharm.addEventListener("click", closePharm);
      if (btnClosePharmBottom) btnClosePharmBottom.addEventListener("click", closePharm);

      // Delegated Action Clicks
      root.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");

        if (action === "open_pharmacist_view") {
          const rxId = btn.getAttribute("data-rx-id");
          const rx = TeleconsultSos.state.receivedPrescriptions.find(r => r.rxId === rxId);
          if (rx) {
            TeleconsultSos.state.activePharmacistRx = rx;
            TeleconsultSos.state.isPharmacistModalOpen = true;
            TeleconsultSos.render(TeleconsultSos.state.domContainer.id);
          }
        }
      });
    }
  };

  // 21. EXPORT TO GLOBAL NAMESPACE & AUTO-INIT
  window.VetcareApp.Farmer.TeleconsultSos = TeleconsultSos;

  document.addEventListener("DOMContentLoaded", function () {
    const defaultHost = document.getElementById("farmerTeleconsultContainer");
    if (defaultHost) {
      TeleconsultSos.init("farmerTeleconsultContainer");
    }
  });

})(window, document);
