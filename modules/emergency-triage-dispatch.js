// Vetcare AI OS - Veterinary Emergency Triage, MVU Ambulance Dispatch & First-Aid Engine (2026 Production)
(function (root) {
  "use strict";

  root.VetcareApp = root.VetcareApp || {};
  root.VetcareApp.Modules = root.VetcareApp.Modules || {};
  root.VetcareApp.ClinicalData = root.VetcareApp.ClinicalData || {};

  // Database Constants
  const DB_NAME = "VetcareEMR_DB";
  const DB_VERSION = 1;
  const STORE_DISPATCHES = "clinical_records";

  // Haversine Distance & Rural Transit Calculator (Avg Rural Speed = 35 km/h)
  function calculateHaversineDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's mean radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1));
  }

  function calculateTransitEtaMinutes(distanceKm, averageSpeedKmH = 35) {
    if (distanceKm <= 0) return 3;
    const hours = distanceKm / averageSpeedKmH;
    return Math.max(3, Math.ceil(hours * 60));
  }

  // Pre-seeded Urgent Rural Emergency Incidents
  const INITIAL_EMERGENCIES_MASTER = [
    {
      id: "SOS-2026-101",
      callerName: "Balram Singh Deshwal",
      phone: "9812498210",
      village: "Khedi Asra, Jhajjar",
      gpsCoords: { lat: 28.6189, lng: 76.6512 },
      species: "bubaline",
      tagNo: "100293847588",
      breed: "Murrah Buffalo",
      chiefComplaint: "Obstructive Dystocia & Uterine Torsion: 4 घंटे से लगातार जोर लगा रही है, पानी की थैली फट चुकी है, पशु अत्यंत व्यथित है।",
      triageTier: "ORANGE", // 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN' | 'BLACK'
      assignedMvuId: "MVU-HR-07",
      etaMinutes: 14,
      status: "EN_ROUTE", // 'PENDING' | 'DISPATCHED' | 'EN_ROUTE' | 'ON_SCENE' | 'RESOLVED'
      timestamp: new Date(Date.now() - 86400000 * 0.05).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      firstAidKey: "dystocia"
    },
    {
      id: "SOS-2026-102",
      callerName: "Ram Niwas Rawat",
      phone: "9416281029",
      village: "Guhna, Sonipat",
      gpsCoords: { lat: 29.0121, lng: 77.0211 },
      species: "bovine",
      tagNo: "100293847590",
      breed: "Crossbred HF Cow",
      chiefComplaint: "Acute Frothy Tympany (गंभीर आफरा): बाईं कोख ड्रम जैसी तनी हुई, मुंह खोलकर सांस, जीभ बाहर, दम घुटने का आसन्न खतरा।",
      triageTier: "RED",
      assignedMvuId: null,
      etaMinutes: null,
      status: "PENDING",
      timestamp: new Date(Date.now() - 86400000 * 0.02).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      firstAidKey: "bloat"
    },
    {
      id: "SOS-2026-103",
      callerName: "Surender Malik",
      phone: "9812998811",
      village: "Taraori, Karnal",
      gpsCoords: { lat: 29.8055, lng: 76.9324 },
      species: "bovine",
      tagNo: "100293847562",
      breed: "Sahiwal Indigenous",
      chiefComplaint: "Complete Post-Partum Uterine Prolapse (बच्चेदानी बाहर आना): प्रसव के 2 घंटे बाद पूरा गर्भाशय बाहर आ गया, मिट्टी से सना हुआ।",
      triageTier: "YELLOW",
      assignedMvuId: null,
      etaMinutes: null,
      status: "PENDING",
      timestamp: new Date(Date.now() - 86400000 * 0.08).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      firstAidKey: "prolapse"
    }
  ];

  // Active Mobile Veterinary Unit (MVU) Fleet Dataset
  const INITIAL_MVU_FLEET_MASTER = [
    {
      mvuId: "MVU-HR-01",
      vehiclePlate: "HR-08-AG-1122",
      driverName: "Ramesh Kumar",
      dutyVetName: "Dr. A. Verma, MVSc (Surgeon)",
      phone: "9416001122",
      currentStatus: "AVAILABLE", // 'AVAILABLE' | 'BUSY' | 'MAINTENANCE'
      baseStation: "Karnal Central Polyclinic",
      currentCoords: { lat: 29.6857, lng: 76.9905 },
      equipmentStatus: {
        oxygenCylinder: true,
        rumenTrocar: true,
        crashCart: true,
        antivenomVials: 4,
        dystociaCables: true,
        suctionPump: true
      }
    },
    {
      mvuId: "MVU-HR-07",
      vehiclePlate: "HR-14-B-4921",
      driverName: "Jagdish Chander",
      dutyVetName: "Dr. Pradeep Yadav, MVSc (Medicine)",
      phone: "9812004921",
      currentStatus: "BUSY",
      baseStation: "Jhajjar Emergency Hub",
      currentCoords: { lat: 28.6067, lng: 76.6565 },
      equipmentStatus: {
        oxygenCylinder: true,
        rumenTrocar: true,
        crashCart: true,
        antivenomVials: 6,
        dystociaCables: true,
        suctionPump: true
      }
    },
    {
      mvuId: "MVU-HR-12",
      vehiclePlate: "HR-10-C-9912",
      driverName: "Sonu Sharma",
      dutyVetName: "Dr. Kuldeep Malik, BVSc & AH",
      phone: "9416119912",
      currentStatus: "AVAILABLE",
      baseStation: "Sonipat Sub-Division Depot",
      currentCoords: { lat: 28.9931, lng: 77.0151 },
      equipmentStatus: {
        oxygenCylinder: true,
        rumenTrocar: true,
        crashCart: true,
        antivenomVials: 2,
        dystociaCables: true,
        suctionPump: false
      }
    }
  ];

  // Standard First-Aid Protocols & Rural Tele-Guidance Library
  const FIRST_AID_PROTOCOLS_MASTER = {
    bloat: {
      name: "तीव्र आफरा एवं रूमेन फुलाव (Acute Tympany / Bloat)",
      tier: "RED",
      stepsHindi: [
        "1. पशु का मुंह ऊपर न उठाएं; जबरन दवा न पिलाएं (फेफड़ों में जाने का खतरा)।",
        "2. पशु के मुंह में आड़ा लकड़ी का डंडा (Mouth gag) बांधें ताकि वह जीभ चलाए और डकार आए।",
        "3. पशु को आगे से ऊंचे स्थान पर खड़ा रखें ताकि फेफड़ों पर दबाव कम हो।",
        "4. तारपीन का तेल 50ml + 500ml मीठा तेल (अलसी/सरसों) यदि पशु आसानी से निगल सके तो दें।",
        "5. यदि पशु गिर जाए और दम घुटने लगे, तो बाईं कोख में बीचों-बीच 16G सुई अथवा ट्रोकार कैन्युला लगाएं।"
      ],
      stepsEnglish: [
        "1. Keep the animal's front quarters elevated on an incline to relieve diaphragm pressure.",
        "2. Place a wooden bit/gag horizontally in the mouth to encourage chewing and eructation.",
        "3. Drench 50ml turpentine oil mixed with 500ml edible/vegetable oil only if swallowing reflex is intact.",
        "4. In imminent asphyxiation: Perform emergency trocarization at the left paralumbar fossa."
      ]
    },
    dystocia: {
      name: "कठिन प्रसव एवं गर्भाशय मरोड़ (Obstructive Dystocia / Uterine Torsion)",
      tier: "ORANGE",
      stepsHindi: [
        "1. पशु को जबरदस्ती न दौड़ाएं; उसे शांत एवं साफ सूखे पुआल पर रखें।",
        "2. बिना विशेषज्ञ सलाह के लोहे के तार या रस्सियों से बछड़े को खींचने का प्रयास न करें।",
        "3. यदि बछड़े के खुर दिख रहे हों, तो उन पर साफ कपड़ा लपेटें और योनि द्वार पर मीठा तेल लगाएं।",
        "4. यदि गर्भाशय में मरोड़ (Torsion) हो, तो पशु को गिराकर लुढ़काने (Schaffer's method) की तैयारी रखें।"
      ],
      stepsEnglish: [
        "1. Confine the dam to a clean, well-bedded stall; avoid unnecessary exhaustion.",
        "2. Do not apply violent traction with tractors or unpadded ropes.",
        "3. Lubricate the birth canal liberally with clean liquid paraffin or edible oil.",
        "4. Prepare space for casting and rolling the dam (Schaffer's method) if uterine torsion is confirmed."
      ]
    },
    prolapse: {
      name: "प्रसवोत्तर गर्भाशय भ्रंश (Post-Partum Complete Uterine Prolapse)",
      tier: "YELLOW",
      stepsHindi: [
        "1. बाहर आए गर्भाशय को जमीन या गोबर के संपर्क से बचाएं; नीचे साफ गीली चादर या प्लास्टिक शीट बिछाएं।",
        "2. गर्भाशय पर बर्फ का ठंडा पानी अथवा चीनी/फिटकरी का हल्का घोल डालें ताकि सूजन कम हो।",
        "3. पशु को आगे की ओर झुकाकर रखें (पिछला हिस्सा ऊंचा रखें)।",
        "4. अधिकृत पशु चिकित्सक के आने तक गर्भाशय को नम कपड़े से ढंककर दोनों हाथों से ऊपर सहारा दें।"
      ],
      stepsEnglish: [
        "1. Protect the everted uterine mass from dirt and trauma using a clean wet bedsheet.",
        "2. Apply ice packs or hypertonic sugar/alum solution to reduce severe edematous swelling.",
        "3. Position the dam with hindquarters elevated to assist gravitational repositioning.",
        "4. Support the weight of the uterus horizontally; do not allow it to dangle by uterine vessels."
      ]
    },
    snakebite: {
      name: "सर्पदंश एवं विषैले कीट दंश (Snakebite Envenomation)",
      tier: "ORANGE",
      stepsHindi: [
        "1. पशु को शांत रखें और हलचल बिल्कुल न करने दें (विष का फैलाव धीमा करने हेतु)।",
        "2. काटे गए स्थान पर ब्लेड से चीरा न लगाएं और तार का सख्त कसाव (Tourniquet) न बांधें।",
        "3. दंश स्थल को साबुन व सामान्य पानी से धोएं; बर्फ न रगड़ें।",
        "4. पॉलीवेलेंट एंटी-स्नेक वेनम (ASV) की कम से कम 2-4 वायल तुरंत नस (IV) में ड्रिप के साथ दें।"
      ],
      stepsEnglish: [
        "1. Immobilize the animal completely; minimize excitement to retard lymphatic venom absorption.",
        "2. Do not incise, cauterize, or apply arterial tourniquets at the bite site.",
        "3. Wash the bite gently with plain water; avoid freezing or ice packs.",
        "4. Prepare Polyvalent Anti-Snake Venom (ASV) 2-4 vials for slow IV infusion in normal saline."
      ]
    },
    choke: {
      name: "ग्रासनली अवरोध / गलफंदा (Esophageal Obstruction / Choke)",
      tier: "RED",
      stepsHindi: [
        "1. पशु मुंह से लगातार झागदार लार गिराता है और पानी भी नहीं निगल पाता।",
        "2. पशु को सूखा चारा या पानी पीने से तुरंत रोकें।",
        "3. गले के बाईं ओर हाथ फेरकर देखें कि क्या आलू, सेब या ककड़ी जैसी वस्तु फंसी हुई है।",
        "4. जबरदस्ती डंडे या पाइप से वस्तु को अंदर धकेलने की कोशिश न करें (ग्रासनली फटने का खतरा)।"
      ],
      stepsEnglish: [
        "1. Animal displays profuse salivation and immediate regurgitation of liquids.",
        "2. Withdraw all solid feed and water immediately.",
        "3. Palpate the cervical esophagus on the left side of the neck for foreign bodies (potatoes/cobs).",
        "4. Do not forcibly push objects with hard rods; await probang passage or trocharization if bloated."
      ]
    }
  };

  root.VetcareApp.ClinicalData.EmergencyTriage = {
    protocols: FIRST_AID_PROTOCOLS_MASTER
  };

  // Internal Module Reactive State
  const state = {
    activeEmergencies: [...INITIAL_EMERGENCIES_MASTER],
    mvuFleet: JSON.parse(JSON.stringify(INITIAL_MVU_FLEET_MASTER)),
    selectedEmergencyId: "SOS-2026-102", // Default selected to RED bloat emergency
    activeTab: "triage_board", // 'triage_board' | 'fleet_map_dispatch' | 'first_aid_protocols'
    isLogModalOpen: false,
    containerElement: null,
    db: null
  };

  // Toast Helper
  function notify(msg, type) {
    if (root.VetcareApp && typeof root.VetcareApp.showToast === "function") {
      root.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[EMERGENCY COMMAND ${type ? type.toUpperCase() : "INFO"}]: ${msg}`);
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
  const EmergencyTriageDispatch = {
    // 1. LIFECYCLE: Init
    init: async function () {
      try {
        await getDbConnection();
        this.loadPersistedDispatches();
        this.setupEventBus();
        this.recalculateFleetProximities();
        return true;
      } catch (err) {
        console.error("EmergencyTriageDispatch initialization error:", err);
        return false;
      }
    },

    // 2. LIFECYCLE: Render
    render: function (containerId) {
      const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error("Container element not found for EmergencyTriageDispatch:", containerId);
        return;
      }
      state.containerElement = container;
      this.recalculateFleetProximities();

      container.innerHTML = `
        <div id="vetcare-triage-root" class="w-full flex flex-col gap-6 text-slate-100 font-sans pb-16">
          <!-- Top Executive Command & Distress Alert Banner -->
          ${this.buildTopAlertBannerHtml()}

          <!-- Tactical Navigation Toolbar -->
          ${this.buildTabNavigationHtml()}

          <!-- Active Viewport Switched by Tab -->
          ${
            state.activeTab === "fleet_map_dispatch"
              ? this.buildFleetMapWorkstationHtml()
              : state.activeTab === "first_aid_protocols"
              ? this.buildFirstAidDirectoryWorkstationHtml()
              : this.buildTriageBoardWorkstationHtml()
          }

          <!-- Modals Insertion Mount -->
          <div id="triage-modal-container"></div>
        </div>
      `;

      this.bindUiEvents();
    },

    // 3. LIFECYCLE: Destroy
    destroy: function () {
      if (this._triageAlertListener) {
        window.removeEventListener("triage:alert", this._triageAlertListener);
        window.removeEventListener("vetcare:emergency_alert", this._triageAlertListener);
      }
      if (state.containerElement) {
        state.containerElement.innerHTML = "";
      }
      state.containerElement = null;
    },

    setupEventBus: function () {
      const handleTriageAlert = (evt) => {
        const payload = evt.detail;
        if (!payload) return;

        const newId = "SOS-" + Date.now().toString().slice(-4);
        const newEmergency = {
          id: newId,
          callerName: payload.callerName || "आपातकालीन कृषक",
          phone: payload.phone || "9999999999",
          village: payload.village || "अज्ञात स्थल",
          gpsCoords: payload.gpsCoords || { lat: 29.6857, lng: 76.9905 },
          species: payload.species || "bovine",
          tagNo: payload.tagNo || "SOS-DIRECT",
          breed: payload.breed || "Indigenous",
          chiefComplaint: payload.complaint || "आपातकालीन संकट कॉल प्राप्त",
          triageTier: payload.tier || "ORANGE",
          assignedMvuId: null,
          etaMinutes: null,
          status: "PENDING",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          firstAidKey: payload.firstAidKey || "bloat"
        };

        state.activeEmergencies.unshift(newEmergency);
        state.selectedEmergencyId = newId;

        notify(`CODE ${newEmergency.triageTier} आपातकालीन अलर्ट दर्ज हुआ: ${newEmergency.callerName}`, "error");

        if (state.containerElement) {
          this.render(state.containerElement);
        }
      };

      this._triageAlertListener = handleTriageAlert;
      window.addEventListener("triage:alert", handleTriageAlert);
      window.addEventListener("vetcare:emergency_alert", handleTriageAlert);
    },

    async loadPersistedDispatches() {
      try {
        const db = await getDbConnection();
        const tx = db.transaction(STORE_DISPATCHES, "readonly");
        const store = tx.objectStore(STORE_DISPATCHES);
        const index = store.index("recordType");
        const req = index.getAll("mvu_dispatch");
        req.onsuccess = () => {
          const list = req.result || [];
          if (list.length > 0) {
            list.forEach((item) => {
              if (item.dispatchData && !state.activeEmergencies.some((e) => e.id === item.dispatchData.id)) {
                state.activeEmergencies.unshift(item.dispatchData);
              }
            });
            if (state.containerElement) this.render(state.containerElement);
          }
        };
      } catch (e) {
        // Fallback quiet
      }
    },

    recalculateFleetProximities: function () {
      const selected = state.activeEmergencies.find((e) => e.id === state.selectedEmergencyId);
      if (!selected) return;

      state.mvuFleet.forEach((mvu) => {
        const distKm = calculateHaversineDistanceKm(
          mvu.currentCoords.lat,
          mvu.currentCoords.lng,
          selected.gpsCoords.lat,
          selected.gpsCoords.lng
        );
        mvu.calculatedDistanceKm = distKm;
        mvu.calculatedEtaMinutes = calculateTransitEtaMinutes(distKm);
      });

      // Sort fleet ascending by distance
      state.mvuFleet.sort((a, b) => a.calculatedDistanceKm - b.calculatedDistanceKm);
    },

    // 4. CLINICAL TRIAGE CLASSIFICATION ENGINE
    evaluateTriageAcuity: function (species, primarySymptom, vitals) {
      const s = (primarySymptom || "").toLowerCase();

      // RED: Immediate resuscitation required (< 0 mins)
      if (
        s.includes("bloat") ||
        s.includes("आफरा") ||
        s.includes("tympany") ||
        s.includes("choke") ||
        s.includes("गलफंदा") ||
        s.includes("cyanosis") ||
        s.includes("hemorrhage") ||
        s.includes("रक्तस्राव") ||
        s.includes("cardiac") ||
        s.includes("arrest")
      ) {
        return {
          tier: "RED",
          label: "CODE RED: तत्कालिक जीवन संकट (Immediate < 0 mins)",
          badgeClass: "bg-rose-500 text-white animate-pulse",
          recommendedFirstAid: "bloat",
          maxWaitMinutes: 0
        };
      }

      // ORANGE: Very Urgent (< 15 mins)
      if (
        s.includes("dystocia") ||
        s.includes("प्रसव") ||
        s.includes("torsion") ||
        s.includes("snake") ||
        s.includes("सांप") ||
        s.includes("poison") ||
        s.includes("विषाक्तता") ||
        s.includes("seizure") ||
        s.includes("दौरा")
      ) {
        return {
          tier: "ORANGE",
          label: "CODE ORANGE: अति-गंभीर स्थिति (Very Urgent < 15 mins)",
          badgeClass: "bg-amber-500 text-slate-950 font-black",
          recommendedFirstAid: s.includes("snake") ? "snakebite" : "dystocia",
          maxWaitMinutes: 15
        };
      }

      // YELLOW: Urgent (< 60 mins)
      if (
        s.includes("prolapse") ||
        s.includes("बच्चेदानी") ||
        s.includes("fracture") ||
        s.includes("हड्डी") ||
        s.includes("burn") ||
        s.includes("milk fever") ||
        s.includes("downer")
      ) {
        return {
          tier: "YELLOW",
          label: "CODE YELLOW: गंभीर / तत्काल ध्यान (Urgent < 60 mins)",
          badgeClass: "bg-yellow-400 text-slate-950 font-bold",
          recommendedFirstAid: "prolapse",
          maxWaitMinutes: 60
        };
      }

      // GREEN: Routine / Stable
      return {
        tier: "GREEN",
        label: "CODE GREEN: स्थिर रोगी (Standard Care)",
        badgeClass: "bg-emerald-500 text-slate-950 font-bold",
        recommendedFirstAid: "bloat",
        maxWaitMinutes: 180
      };
    },

    // HTML VIEW BUILDERS
    buildTopAlertBannerHtml: function () {
      const redCount = state.activeEmergencies.filter((e) => e.triageTier === "RED" && e.status !== "RESOLVED").length;
      const orangeCount = state.activeEmergencies.filter((e) => e.triageTier === "ORANGE" && e.status !== "RESOLVED").length;
      const availableMvus = state.mvuFleet.filter((m) => m.currentStatus === "AVAILABLE").length;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-rose-950/60 animate-pulse">
              <i class="fa-solid fa-truck-medical"></i>
            </div>
            <div>
              <div class="flex items-center gap-2.5">
                <h2 class="text-lg font-display font-black text-white">आपातकालीन कमांड सेंटर एवं सचल एम्बुलेंस (MVU) प्रेषण</h2>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  DACVECC 2026 STANDARDS
                </span>
              </div>
              <div class="text-xs text-slate-400 mt-0.5">
                तत्काल 112/1962 आपातकालीन संकट कॉल रिसेप्शन, GPS दूरी आधारित MVU प्रेषण एवं किसान टेली-फर्स्ट-एड
              </div>
            </div>
          </div>

          <!-- Alert Counters & SOS Button -->
          <div class="flex flex-wrap items-center gap-3 self-stretch lg:self-auto justify-between lg:justify-end border-t lg:border-t-0 border-slate-800 pt-3 lg:pt-0">
            <div class="flex items-center gap-2 font-mono text-xs">
              <div class="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-center">
                <div class="text-[9px] text-slate-500 uppercase">कोड रेड केस</div>
                <div class="font-black text-rose-400 text-sm">${redCount}</div>
              </div>

              <div class="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-center">
                <div class="text-[9px] text-slate-500 uppercase">कोड ऑरेंज</div>
                <div class="font-black text-amber-400 text-sm">${orangeCount}</div>
              </div>

              <div class="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-center">
                <div class="text-[9px] text-slate-500 uppercase">सचल MVU उपलब्ध</div>
                <div class="font-black text-emerald-400 text-sm">${availableMvus} / ${state.mvuFleet.length}</div>
              </div>
            </div>

            <button id="btnLogNewEmergencyModal" type="button" class="px-4 py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/60 flex items-center gap-2 active:scale-95 transition-all">
              <i class="fa-solid fa-phone-volume"></i>
              <span>+ आपातकालीन कॉल दर्ज करें</span>
            </button>
          </div>
        </div>
      `;
    },

    buildTabNavigationHtml: function () {
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-2.5 shadow-xl flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <button 
            type="button" 
            data-triage-tab="triage_board" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "triage_board"
                ? "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-wave-square"></i>
            <span>लाइव ट्रायज बोर्ड व प्रेषण (Command Board)</span>
          </button>

          <button 
            type="button" 
            data-triage-tab="first_aid_protocols" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "first_aid_protocols"
                ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-950 shadow-lg shadow-amber-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-kit-medical"></i>
            <span>किसान टेली-फर्स्ट-एड मार्गदर्शिका (First-Aid Library)</span>
          </button>

          <button 
            type="button" 
            data-triage-tab="fleet_map_dispatch" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "fleet_map_dispatch"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-map-location-dot"></i>
            <span>MVU बेड़ा व उपकरण स्थिति (Ambulance Fleet)</span>
          </button>
        </div>
      `;
    },

    // WORKSTATION TAB 1: Live Emergency Triage Board & Dispatch Split View
    buildTriageBoardWorkstationHtml: function () {
      const selected = state.activeEmergencies.find((e) => e.id === state.selectedEmergencyId) || state.activeEmergencies[0];

      return `
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          <!-- Left Pane: Live Distress Incidents Queue (Cols 1-5) -->
          <div class="xl:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl flex flex-col h-[740px]">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-triangle-exclamation text-rose-400"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">सक्रिय आपातकालीन कतार (${state.activeEmergencies.length})</h3>
              </div>
              <span class="text-[10px] font-mono text-slate-400">प्राथमिकता अनुसार क्रमबद्ध</span>
            </div>

            <!-- Queue Scroll Container -->
            <div class="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
              ${this.buildEmergencyCardsInnerHtml()}
            </div>
          </div>

          <!-- Right Pane: Selected Incident Command Dossier & Fleet Dispatcher (Cols 6-12) -->
          <div class="xl:col-span-7 flex flex-col gap-5">
            ${
              selected
                ? `
              <!-- Selected Incident Master Header -->
              <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
                <div class="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-mono font-bold uppercase text-slate-400">घटना ID:</span>
                      <span class="text-sm font-black text-white font-mono">${selected.id}</span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        selected.triageTier === "RED"
                          ? "bg-rose-500 text-white animate-pulse"
                          : selected.triageTier === "ORANGE"
                          ? "bg-amber-500 text-slate-950 font-black"
                          : "bg-yellow-400 text-slate-950 font-bold"
                      }">
                        CODE ${selected.triageTier}
                      </span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-800 text-slate-300">
                        ${selected.status}
                      </span>
                    </div>
                    <div class="text-xs text-slate-300 font-bold mt-1">
                      ${selected.callerName} • <span class="text-cyan-400 font-mono">${selected.phone}</span>
                    </div>
                    <div class="text-[11px] text-slate-400 mt-0.5">
                      <i class="fa-solid fa-location-dot text-rose-400 mr-1"></i>स्थान: <strong>${selected.village}</strong> (GPS: ${selected.gpsCoords.lat.toFixed(4)}°N, ${selected.gpsCoords.lng.toFixed(4)}°E)
                    </div>
                  </div>

                  <div class="text-right">
                    <div class="text-[10px] font-mono text-slate-400">कॉल समय: ${selected.timestamp}</div>
                    <a href="tel:${selected.phone}" class="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700">
                      <i class="fa-solid fa-phone"></i>
                      <span>सीधा कॉल करें</span>
                    </a>
                  </div>
                </div>

                <!-- Clinical Complaint Full Text -->
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-200 leading-relaxed font-sans">
                  <strong>मुख्य लक्षण / संकट विवरण:</strong> ${selected.chiefComplaint}
                </div>

                <!-- Nearest MVU Ambulance Dispatch Console -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between text-xs font-mono">
                    <span class="font-bold text-white uppercase flex items-center gap-1.5">
                      <i class="fa-solid fa-location-crosshairs text-cyan-400"></i>
                      <span>निकटतम उपलब्ध सचल एम्बुलेंस (MVU Units Ranked by Proximity)</span>
                    </span>
                    <span class="text-[10px] text-slate-400">सड़क मार्ग ETA अनुमानित</span>
                  </div>

                  <div class="space-y-2">
                    ${state.mvuFleet
                      .map((mvu) => {
                        const isAssigned = selected.assignedMvuId === mvu.mvuId;
                        return `
                        <div class="p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isAssigned
                            ? "bg-rose-950/20 border-rose-500/60 ring-1 ring-rose-500/40"
                            : mvu.currentStatus === "AVAILABLE"
                            ? "bg-slate-950 border-slate-800 hover:border-slate-700"
                            : "bg-slate-950/60 border-slate-900 opacity-60"
                        }">
                          <div class="space-y-1">
                            <div class="flex items-center gap-2">
                              <span class="font-bold text-white text-xs font-mono">${mvu.mvuId}</span>
                              <span class="text-[10px] font-mono text-slate-400">(${mvu.vehiclePlate})</span>
                              <span class="px-1.5 py-0.2 rounded text-[9px] font-bold ${
                                mvu.currentStatus === "AVAILABLE" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                              }">
                                ${mvu.currentStatus}
                              </span>
                            </div>
                            <div class="text-[11px] text-slate-300">
                              प्रभारी: <strong>${mvu.dutyVetName}</strong> | चालक: ${mvu.driverName} (${mvu.phone})
                            </div>
                            <div class="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                              <span><i class="fa-solid fa-snowflake text-cyan-400 mr-0.5"></i>O2: ${mvu.equipmentStatus.oxygenCylinder ? "OK" : "NO"}</span>
                              <span><i class="fa-solid fa-syringe text-emerald-400 mr-0.5"></i>ASV: ${mvu.equipmentStatus.antivenomVials} वायल</span>
                              <span><i class="fa-solid fa-shield text-amber-400 mr-0.5"></i>ट्रोकार: ${mvu.equipmentStatus.rumenTrocar ? "OK" : "NO"}</span>
                            </div>
                          </div>

                          <div class="flex items-center sm:flex-col items-end justify-between sm:justify-center gap-2">
                            <div class="text-right font-mono">
                              <div class="text-xs font-bold text-cyan-400">${mvu.calculatedDistanceKm} km दूर</div>
                              <div class="text-[10px] font-bold text-amber-400">ETA: ~${mvu.calculatedEtaMinutes} मिनट</div>
                            </div>
                            <button 
                              type="button" 
                              data-dispatch-unit-id="${mvu.mvuId}" 
                              data-incident-id="${selected.id}" 
                              ${mvu.currentStatus !== "AVAILABLE" && !isAssigned ? "disabled" : ""} 
                              class="px-3 py-1.5 rounded-xl text-xs font-bold shadow ${
                                isAssigned
                                  ? "bg-rose-600 text-white shadow-rose-950/50"
                                  : "bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40"
                              } active:scale-95 transition-all"
                            >
                              ${isAssigned ? '<i class="fa-solid fa-check mr-1"></i>प्रेषित (Assigned)' : "यूनिट रवाना करें (Dispatch)"}
                            </button>
                          </div>
                        </div>
                      `;
                      })
                      .join("")}
                  </div>
                </div>

                <!-- Action Toolbar: Print Manifest -->
                <div class="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div class="text-[10px] font-mono text-slate-500">
                    आपातकालीन प्रोटोकॉल 1962 • भारत सरकार एवं राष्ट्रीय पशु स्वास्थ्य मिशन
                  </div>
                  <button id="btnPrintDispatchSlip" type="button" class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow flex items-center gap-1.5">
                    <i class="fa-solid fa-print"></i>
                    <span>प्रेषण ड्यूटी पर्ची (Dispatch Manifest)</span>
                  </button>
                </div>
              </div>

              <!-- Farmer First-Aid Tele-Guidance Box (Immediate Life-Support Directives) -->
              ${this.buildFarmerTeleGuidanceBoxHtml(selected.firstAidKey)}
            `
                : `<div class="p-12 text-center text-slate-500 font-mono text-xs">कृपया बाईं सूची से आपातकालीन संकट कॉल चुनें।</div>`
            }
          </div>

        </div>
      `;
    },

    buildEmergencyCardsInnerHtml: function () {
      if (state.activeEmergencies.length === 0) {
        return `<div class="p-8 text-center text-slate-500 text-xs font-mono">वर्तमान में कोई संकट कॉल लंबित नहीं है।</div>`;
      }

      // Sort: RED first, then ORANGE, then YELLOW, then GREEN
      const tierRank = { RED: 1, ORANGE: 2, YELLOW: 3, GREEN: 4, BLACK: 5 };
      const sorted = [...state.activeEmergencies].sort((a, b) => (tierRank[a.triageTier] || 9) - (tierRank[b.triageTier] || 9));

      return sorted
        .map((e) => {
          const isSelected = e.id === state.selectedEmergencyId;
          const isRed = e.triageTier === "RED";

          return `
          <div 
            data-select-emergency-id="${e.id}" 
            class="p-3.5 rounded-xl border cursor-pointer transition-all ${
              isSelected
                ? "bg-slate-800/95 border-rose-500 ring-1 ring-rose-500/50 shadow-md"
                : isRed
                ? "bg-rose-950/20 border-rose-500/50 hover:bg-rose-950/30"
                : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
            }"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full ${isRed ? "bg-rose-500 animate-ping" : "bg-amber-400"}"></span>
                <span class="font-bold text-white text-xs font-mono">${e.id}</span>
                <span class="text-[10px] text-slate-400 font-mono">(${e.timestamp})</span>
              </div>
              <span class="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                e.triageTier === "RED" ? "bg-rose-500 text-white font-black" : "bg-amber-500 text-slate-950 font-black"
              }">
                ${e.triageTier}
              </span>
            </div>

            <div class="mt-2 text-xs font-bold text-white">${e.callerName} • <span class="font-mono text-slate-300 font-normal">${e.phone}</span></div>
            <div class="text-[11px] text-slate-400 font-mono mt-0.5"><i class="fa-solid fa-map-pin text-rose-400 mr-1"></i>${e.village}</div>

            <div class="mt-2 text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
              ${e.chiefComplaint}
            </div>

            <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
              <span class="text-slate-400">टैग: <strong class="text-slate-200">${e.tagNo}</strong> (${e.breed})</span>
              <span class="${e.assignedMvuId ? "text-emerald-400 font-bold" : "text-amber-400"}">
                ${e.assignedMvuId ? `MVU: ${e.assignedMvuId} (ETA ~${e.etaMinutes}m)` : "लंबित (Pending Dispatch)"}
              </span>
            </div>
          </div>
        `;
        })
        .join("");
    },

    buildFarmerTeleGuidanceBoxHtml: function (firstAidKey) {
      const proto = FIRST_AID_PROTOCOLS_MASTER[firstAidKey] || FIRST_AID_PROTOCOLS_MASTER.bloat;

      return `
        <div class="rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 p-5 shadow-xl space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-headset text-amber-400 text-base"></i>
              <h4 class="text-xs font-mono font-bold uppercase text-white">किसान टेली-फर्स्ट-एड निर्देश (Phone Guidance Directives)</h4>
            </div>
            <span class="text-[10px] font-mono text-amber-300 font-bold uppercase bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
              एम्बुलेंस पहुंचने तक किसान को बताएं
            </span>
          </div>

          <div class="text-xs font-bold text-amber-300">${proto.name}</div>

          <div class="space-y-1.5 text-xs text-slate-200 leading-relaxed font-sans">
            ${proto.stepsHindi.map((step) => `<div class="p-1.5 rounded-lg bg-slate-950/80 border border-slate-900">${step}</div>`).join("")}
          </div>
        </div>
      `;
    },

    // WORKSTATION TAB 2: Full First-Aid Protocols Directory
    buildFirstAidDirectoryWorkstationHtml: function () {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-kit-medical text-amber-400"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">पशु आपातकालीन प्राथमिक उपचार प्रोटोकॉल (Standard Field First-Aid SOPs)</h3>
              </div>
              <span class="text-[10px] font-mono text-slate-400">DACVECC 2026 Clinical Protocols</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${Object.keys(FIRST_AID_PROTOCOLS_MASTER)
                .map((key) => {
                  const item = FIRST_AID_PROTOCOLS_MASTER[key];
                  return `
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span class="font-bold text-white text-xs">${item.name}</span>
                      <span class="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                        item.tier === "RED" ? "bg-rose-500 text-white font-black" : "bg-amber-500 text-slate-950 font-black"
                      }">
                        CODE ${item.tier}
                      </span>
                    </div>

                    <div class="space-y-1.5 text-xs text-slate-300 font-sans">
                      ${item.stepsHindi.map((s) => `<div class="text-[11px] leading-relaxed">• ${s}</div>`).join("")}
                    </div>

                    <div class="pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500">
                      English Directives Available for Operator Relay
                    </div>
                  </div>
                `;
                })
                .join("")}
            </div>
          </div>
        </div>
      `;
    },

    // WORKSTATION TAB 3: Fleet Map & Ambulance Telemetry
    buildFleetMapWorkstationHtml: function () {
      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-map-location-dot text-cyan-400"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">सचल पशु चिकित्सा इकाई (MVU) बेड़ा प्रबंधन व जीपीएस स्थिति</h3>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              ${state.mvuFleet
                .map((mvu) => {
                  return `
                  <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div class="font-bold text-white text-xs font-mono">${mvu.mvuId}</div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                        mvu.currentStatus === "AVAILABLE" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }">
                        ${mvu.currentStatus}
                      </span>
                    </div>

                    <div class="text-xs text-slate-300 space-y-1">
                      <div>वाहन नंबर: <strong class="text-white font-mono">${mvu.vehiclePlate}</strong></div>
                      <div>ड्यूटी डॉक्टर: <strong>${mvu.dutyVetName}</strong></div>
                      <div>चालक: ${mvu.driverName} (<span class="font-mono text-cyan-400">${mvu.phone}</span>)</div>
                      <div>बेस स्टेशन: ${mvu.baseStation}</div>
                    </div>

                    <div class="pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-400 space-y-0.5">
                      <div>GPS: ${mvu.currentCoords.lat.toFixed(4)}°N, ${mvu.currentCoords.lng.toFixed(4)}°E</div>
                      <div>ऑक्सीजन सिलेंडर: ${mvu.equipmentStatus.oxygenCylinder ? "पूर्ण (100% Full)" : "रिक्त"}</div>
                      <div>एंटी-वेनम वायल: ${mvu.equipmentStatus.antivenomVials} वायल तैयार</div>
                    </div>
                  </div>
                `;
                })
                .join("")}
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
      container.querySelectorAll("[data-triage-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tab = btn.getAttribute("data-triage-tab");
          if (tab && tab !== state.activeTab) {
            state.activeTab = tab;
            this.render(container);
          }
        });
      });

      // 2. Select Incident from Queue
      container.querySelectorAll("[data-select-emergency-id]").forEach((card) => {
        card.addEventListener("click", () => {
          const id = card.getAttribute("data-select-emergency-id");
          state.selectedEmergencyId = id;
          this.render(container);
        });
      });

      // 3. Dispatch Unit Click
      container.querySelectorAll("[data-dispatch-unit-id]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const unitId = btn.getAttribute("data-dispatch-unit-id");
          const incId = btn.getAttribute("data-incident-id");

          const incident = state.activeEmergencies.find((em) => em.id === incId);
          const unit = state.mvuFleet.find((u) => u.mvuId === unitId);

          if (incident && unit) {
            incident.assignedMvuId = unit.mvuId;
            incident.status = "DISPATCHED";
            incident.etaMinutes = unit.calculatedEtaMinutes;
            unit.currentStatus = "BUSY";

            // Dispatch Event on Bus
            window.dispatchEvent(
              new CustomEvent("mvu:dispatched", {
                detail: {
                  incidentId: incident.id,
                  mvuId: unit.mvuId,
                  dutyVet: unit.dutyVetName,
                  etaMinutes: unit.calculatedEtaMinutes,
                  location: incident.village
                }
              })
            );

            notify(`सचल एम्बुलेंस ${unit.mvuId} को ${incident.village} हेतु रवाना किया गया! (ETA: ${unit.calculatedEtaMinutes} मिनट)`, "success");
            this.render(container);
          }
        });
      });

      // 4. Log New Emergency Call Modal
      const btnLog = container.querySelector("#btnLogNewEmergencyModal");
      if (btnLog) {
        btnLog.addEventListener("click", () => this.openLogEmergencyModal());
      }

      // 5. Print Dispatch Manifest
      const btnPrint = container.querySelector("#btnPrintDispatchSlip");
      if (btnPrint) {
        btnPrint.addEventListener("click", () => {
          if (state.selectedEmergencyId) {
            this.printDispatchManifest(state.selectedEmergencyId);
          }
        });
      }
    },

    // 5. MODAL: Log New Emergency Incident
    openLogEmergencyModal: function () {
      const mount = document.getElementById("triage-modal-container");
      if (!mount) return;

      mount.innerHTML = `
        <div id="logEmergencyModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div class="bg-slate-900 border-2 border-rose-500 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8 text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-phone-volume text-rose-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">आपातकालीन संकट कॉल प्रविष्टि (Log SOS)</h3>
              </div>
              <button id="closeEmergencyModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="newEmergencyForm" class="space-y-4 text-xs font-mono">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">कॉलर का नाम *</label>
                  <input type="text" id="sosCallerName" required placeholder="किसान / पशुपालक का नाम" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans font-bold focus:ring-2 focus:ring-rose-500" />
                </div>
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">मोबाइल नंबर *</label>
                  <input type="tel" id="sosPhone" required maxlength="10" placeholder="10-अंकीय फोन नंबर" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-rose-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">गांव व ब्लॉक स्थल *</label>
                  <input type="text" id="sosVillage" required placeholder="ग्राम, जिला" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans focus:ring-2 focus:ring-rose-500" />
                </div>
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">पशु प्रजाति *</label>
                  <select id="sosSpecies" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-rose-500">
                    <option value="bubaline">भैंस (Buffalo)</option>
                    <option value="bovine">गाय (Cattle)</option>
                    <option value="caprine">बकरी (Goat)</option>
                    <option value="canine">श्वान (Dog)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-[10px] uppercase text-slate-400 mb-1 font-sans">लक्षण एवं संकट का विवरण (Chief Emergency Complaint) *</label>
                <textarea id="sosComplaint" required rows="3" placeholder="उदा: 30 मिनट से आफरा है, मुंह से झाग आ रहा है, गिर गई है..." class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans focus:ring-2 focus:ring-rose-500"></textarea>
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3 font-sans">
                <button type="button" id="cancelEmergencyModalBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50">ट्रायज एवं अलर्ट जारी करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      const modal = document.getElementById("logEmergencyModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };

      document.getElementById("closeEmergencyModalBtn").addEventListener("click", closeAction);
      document.getElementById("cancelEmergencyModalBtn").addEventListener("click", closeAction);

      document.getElementById("newEmergencyForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const cName = document.getElementById("sosCallerName").value.trim();
        const phone = document.getElementById("sosPhone").value.trim();
        const village = document.getElementById("sosVillage").value.trim();
        const species = document.getElementById("sosSpecies").value;
        const complaint = document.getElementById("sosComplaint").value.trim();

        const triageResult = this.evaluateTriageAcuity(species, complaint);

        const newId = "SOS-" + Date.now().toString().slice(-4);
        const newEmergency = {
          id: newId,
          callerName: cName,
          phone: phone,
          village: village,
          gpsCoords: { lat: 29.6857, lng: 76.9905 },
          species: species,
          tagNo: "NEW-CALL",
          breed: "Indigenous",
          chiefComplaint: complaint,
          triageTier: triageResult.tier,
          assignedMvuId: null,
          etaMinutes: null,
          status: "PENDING",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          firstAidKey: triageResult.recommendedFirstAid
        };

        state.activeEmergencies.unshift(newEmergency);
        state.selectedEmergencyId = newId;

        closeAction();
        notify(`नया ${triageResult.tier} संकट दर्ज हुआ!`, "error");
        this.render(state.containerElement);
      });
    },

    // 6. PRINT OFFICIAL DISPATCH MANIFEST SLIP
    printDispatchManifest: function (emergencyId) {
      const emergency = state.activeEmergencies.find((e) => e.id === emergencyId);
      if (!emergency) return;

      const mvu = state.mvuFleet.find((m) => m.mvuId === emergency.assignedMvuId) || state.mvuFleet[0];

      const printWindow = window.open("", "_blank", "width=850,height=900");
      if (!printWindow) {
        notify("कृपया प्रिंट पॉपअप विंडो की अनुमति दें।", "warning");
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8">
          <title>सचल पशु चिकित्सा इकाई प्रेषण ड्यूटी पर्ची - ${emergency.id}</title>
          <style>
            @page { size: A4 portrait; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; margin: 0; padding: 15px; font-size: 12px; }
            .manifest-box { border: 3px double #991b1b; padding: 25px; border-radius: 8px; }
            .header-strip { text-align: center; border-bottom: 2px solid #991b1b; padding-bottom: 12px; margin-bottom: 20px; }
            .title-org { font-size: 18px; font-weight: 800; color: #991b1b; text-transform: uppercase; }
            .sub-title { font-size: 13px; font-weight: bold; margin-top: 2px; }
            .data-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; background: #fef2f2; border: 1.5px solid #f87171; padding: 12px; border-radius: 6px; margin-bottom: 20px; }
            .section-title { font-weight: bold; font-size: 13px; color: #991b1b; margin-top: 15px; margin-bottom: 5px; border-bottom: 1px solid #ccc; padding-bottom: 3px; }
            .table-items { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11px; }
            .table-items td { padding: 6px 10px; border: 1px solid #d1d5db; }
            .table-items td.label { background: #f9fafb; font-weight: bold; width: 30%; }
            .footer-strip { margin-top: 35px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; }
            .seal-box { border: 1px dashed #9ca3af; width: 180px; height: 50px; text-align: center; line-height: 50px; color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="manifest-box">
            <div class="header-strip">
              <div class="title-org">राष्ट्रीय सचल पशु चिकित्सा सेवा (1962 MVU Emergency)</div>
              <div class="sub-title">सचल पशु चिकित्सा इकाई प्रेषण ड्यूटी पर्ची (Official Dispatch Duty Manifest)</div>
              <div style="font-family: monospace; font-size: 10px; color: #555; margin-top: 2px;">INCIDENT NO: ${emergency.id} • TRIAGE: CODE ${emergency.triageTier}</div>
            </div>

            <div class="data-grid">
              <div>
                <div><strong>पशुपालक / कॉलर:</strong> ${emergency.callerName}</div>
                <div><strong>संपर्क मोबाइल:</strong> ${emergency.phone}</div>
                <div><strong>घटना स्थल:</strong> ${emergency.village}</div>
              </div>
              <div>
                <div><strong>पशु टैग / प्रजाति:</strong> ${emergency.tagNo} (${emergency.species.toUpperCase()})</div>
                <div><strong>कॉल प्राप्ति समय:</strong> ${emergency.timestamp}</div>
                <div><strong>ट्रायज श्रेणी:</strong> CODE ${emergency.triageTier}</div>
              </div>
            </div>

            <div class="section-title">प्रेषित सचल एम्बुलेंस एवं दल विवरण</div>
            <table class="table-items">
              <tr>
                <td class="label">MVU वाहन पहचान:</td>
                <td><strong>${mvu.mvuId} (${mvu.vehiclePlate})</strong></td>
                <td class="label">अनुमानित आगमन समय:</td>
                <td><strong>~${emergency.etaMinutes || 15} मिनट</strong></td>
              </tr>
              <tr>
                <td class="label">ड्यूटी पशु चिकित्सक:</td>
                <td><strong>${mvu.dutyVetName}</strong></td>
                <td class="label">वाहन चालक:</td>
                <td>${mvu.driverName} (${mvu.phone})</td>
              </tr>
              <tr>
                <td class="label">ऑन-बोर्ड जीवन रक्षक उपकरण:</td>
                <td colspan="3">ऑक्सीजन सिलेंडर (OK), रूमेन ट्रोकार (OK), एंटी-वेनम (4 वायल), डिस्टोशिया केबल सेट (OK)</td>
              </tr>
            </table>

            <div class="section-title">मुख्य संकट व प्राथमिक चिकित्सा अवलोकन</div>
            <div style="background: #fdfdfd; border: 1px solid #e5e7eb; padding: 10px; border-radius: 6px; font-size: 11px; margin-bottom: 20px;">
              ${emergency.chiefComplaint}
            </div>

            <div class="footer-strip">
              <div>
                <div>जारी दिनांक: ${new Date().toLocaleDateString("hi-IN")}</div>
                <div>नियंत्रण कक्ष: 1962 State Emergency Command Hub</div>
              </div>
              <div class="seal-box">
                हस्ताक्षर ड्यूटी ऑफिसर / डिस्पैचर
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
  root.VetcareApp.Modules.EmergencyTriageDispatch = EmergencyTriageDispatch;

})(typeof window !== "undefined" ? window : this);
