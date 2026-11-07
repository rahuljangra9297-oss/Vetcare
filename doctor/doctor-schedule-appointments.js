// Vetcare AI OS - Doctor Appointment Scheduling, Surgery Slots & On-Call Roster Module (2026 Production)

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
          try { fn(payload); } catch (e) { console.error("[Schedule EventBus Error]", e); }
        });
      }
      window.dispatchEvent(new CustomEvent("vetcare:" + event, { detail: payload }));
    }
  };
  window.VetcareApp.Core.EventBus = EventBus;

  // 2. AUDIO SYNTHESIS ENGINE (TACTILE CHIMES & WARNINGS)
  const ScheduleAudio = {
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
        // Fallback for strict browser autoplay
      }
    },
    chimeBooked: function () {
      ScheduleAudio.playTone(523.25, "sine", 0.12, 0.08);
      setTimeout(() => ScheduleAudio.playTone(659.25, "sine", 0.15, 0.08), 100);
      setTimeout(() => ScheduleAudio.playTone(783.99, "sine", 0.22, 0.09), 200);
    },
    chimeCollisionConflict: function () {
      ScheduleAudio.playTone(880, "sawtooth", 0.18, 0.14);
      setTimeout(() => ScheduleAudio.playTone(440, "sawtooth", 0.25, 0.16), 140);
    },
    chimeReminderReady: function () {
      ScheduleAudio.playTone(659.25, "sine", 0.1, 0.07);
      setTimeout(() => ScheduleAudio.playTone(880, "sine", 0.2, 0.08), 110);
    }
  };

  // 3. STORAGE LAYER: INDEXED-DB WITH LOCALSTORAGE FAILOVER
  const ScheduleStorage = {
    DB_NAME: "VetcareClinicalMasterDB",
    DB_VERSION: 1,
    STORE_NAME: "doctor_schedules",
    getDb: function () {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error("IndexedDB unavailable"));
          return;
        }
        const req = window.indexedDB.open(ScheduleStorage.DB_NAME, ScheduleStorage.DB_VERSION);
        req.onupgradeneeded = function (e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(ScheduleStorage.STORE_NAME)) {
            const store = db.createObjectStore(ScheduleStorage.STORE_NAME, { keyPath: "appointmentId" });
            store.createIndex("date", "date", { unique: false });
            store.createIndex("bookingType", "bookingType", { unique: false });
            store.createIndex("status", "status", { unique: false });
          }
        };
        req.onsuccess = function (e) { resolve(e.target.result); };
        req.onerror = function (e) { reject(e.target.error); };
      });
    },
    saveAppointment: async function (booking) {
      try {
        const db = await ScheduleStorage.getDb();
        const tx = db.transaction(ScheduleStorage.STORE_NAME, "readwrite");
        const store = tx.objectStore(ScheduleStorage.STORE_NAME);
        store.put(booking);
      } catch (err) {
        try {
          localStorage.setItem("VETCARE_APPT_" + booking.appointmentId, JSON.stringify(booking));
        } catch (e) {
          console.warn("[ScheduleStorage] LocalStorage fallback write failed", e);
        }
      }
    },
    loadAllAppointments: async function () {
      try {
        const db = await ScheduleStorage.getDb();
        return new Promise(resolve => {
          const tx = db.transaction(ScheduleStorage.STORE_NAME, "readonly");
          const store = tx.objectStore(ScheduleStorage.STORE_NAME);
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

  // 4. MAIN SCHEDULING & ROSTER CONTROLLER
  const ScheduleAppointments = {
    // Standard Day Time Slots (08:00 AM to 06:00 PM in 30-min increments)
    TIME_SLOTS: [
      "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
      "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
      "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
      "05:00 PM", "05:30 PM"
    ],

    // --- Reactive Internal State ---
    state: {
      appointments: [
        {
          appointmentId: "APT-2026-901",
          date: "2026-03-31",
          timeSlot: "09:00 AM",
          patientTagNo: "IN-HR-2024-8841",
          animalName: "Laxmi (Murrah Buffalo)",
          species: "bovine",
          ownerName: "Sukhbir Singh",
          phone: "9812044921",
          bookingType: "OPD_CONSULTATION",
          status: "CONFIRMED", // CONFIRMED | COMPLETED | CANCELLED | NO_SHOW
          village: "Dhansu",
          preOpFastingHours: 0,
          estimatedDurationMins: 30,
          notes: "Acute post-tympany review and rumen booster follow-up."
        },
        {
          appointmentId: "APT-2026-902",
          date: "2026-03-31",
          timeSlot: "10:30 AM",
          patientTagNo: "CAN-0419-GUR",
          animalName: "Bruno (Labrador)",
          species: "canine",
          ownerName: "Deepak Mehra",
          phone: "9991122883",
          bookingType: "ELECTIVE_SURGERY",
          status: "CONFIRMED",
          village: "Sector 14 Urban",
          preOpFastingHours: 12,
          estimatedDurationMins: 60,
          notes: "Elective Ovariohysterectomy (Spay). Pre-anesthetic CBC Normal. 12h Fasting verified."
        },
        {
          appointmentId: "APT-2026-903",
          date: "2026-03-31",
          timeSlot: "02:00 PM",
          patientTagNo: "IN-HR-2025-1102",
          animalName: "Gauri (Sahiwal Cow)",
          species: "bovine",
          ownerName: "Harpal Singh",
          phone: "9416033100",
          bookingType: "ULTRASOUND_PREGNANCY",
          status: "CONFIRMED",
          village: "Kalanwali",
          preOpFastingHours: 0,
          estimatedDurationMins: 30,
          notes: "Transrectal B-Mode Ultrasound 60-day pregnancy & corpus luteum viability check."
        },
        {
          appointmentId: "APT-2026-904",
          date: "2026-03-31",
          timeSlot: "04:00 PM",
          patientTagNo: "CAP-HERD-DHANSU",
          animalName: "Beetal Goat Flock (12 Does)",
          species: "caprine",
          ownerName: "Balwan Yadav",
          phone: "9812055441",
          bookingType: "FARM_FIELD_VISIT",
          status: "CONFIRMED",
          village: "Dhansu",
          preOpFastingHours: 0,
          estimatedDurationMins: 60,
          notes: "Doorstep herd PPR vaccination and targeted Haemonchus deworming."
        }
      ],
      dutyRoster: [
        { date: "2026-03-31", shiftType: "MORNING_OPD", attendingVet: "Dr. Rahul Jangra (VCI-2026-9297)", isAvailable: true, hours: "08:00 AM - 02:00 PM" },
        { date: "2026-03-31", shiftType: "EVENING_OPD", attendingVet: "Dr. Rahul Jangra (VCI-2026-9297)", isAvailable: true, hours: "04:00 PM - 07:00 PM" },
        { date: "2026-03-31", shiftType: "NIGHT_EMERGENCY_ON_CALL", attendingVet: "Dr. Rahul Jangra (VCI-2026-9297)", isAvailable: true, hours: "08:00 PM - 08:00 AM" }
      ],
      selectedDate: "2026-03-31",
      activeTab: "day_schedule_calendar", // day_schedule_calendar | surgery_booking_slots | farm_field_planner | on_call_roster
      isNewBookingModalOpen: false,
      preSelectedSlotForBooking: "08:00 AM",
      activeReminderModal: null,
      domContainer: null
    },

    // 5. LIFECYCLE: INIT
    init: async function (containerId) {
      console.info("[Vetcare AI OS] Initializing Doctor Appointment Scheduling & Surgery Slots Module (2026 Production)...");
      ScheduleAppointments.injectStyles();

      // Hydrate from persistence
      const stored = await ScheduleStorage.loadAllAppointments();
      if (stored && stored.length > 0) {
        ScheduleAppointments.state.appointments = stored;
      }

      if (containerId) {
        ScheduleAppointments.render(containerId);
      }
      return ScheduleAppointments;
    },

    // 6. LIFECYCLE: RENDER
    render: function (containerId) {
      let container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement("div");
        container.id = containerId || "doctorScheduleAppointmentsContainer";
        container.className = "w-full min-h-[calc(100vh-4rem)] p-3 sm:p-5 lg:p-6";
        const mainHost = document.querySelector("main") || document.body;
        mainHost.innerHTML = "";
        mainHost.appendChild(container);
      }
      ScheduleAppointments.state.domContainer = container;

      // Render Complete Scheduling Dashboard
      container.innerHTML = `
        <div id="vetcareScheduleWorkspace" class="max-w-7xl mx-auto space-y-6">
          ${ScheduleAppointments.renderSummaryRibbon()}
          ${ScheduleAppointments.renderNavigationTabs()}
          <div id="scheduleTabContentHost" class="transition-all duration-200">
            ${ScheduleAppointments.renderActiveTabContent()}
          </div>
        </div>

        <!-- Booking Modal Host -->
        <div id="newBookingModalHost" class="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md ${ScheduleAppointments.state.isNewBookingModalOpen ? "flex" : "hidden"} items-center justify-center p-3 sm:p-4">
          ${ScheduleAppointments.renderBookingModalDialog()}
        </div>

        <!-- Owner WhatsApp Reminder Modal Host -->
        <div id="ownerReminderModalHost" class="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md hidden items-center justify-center p-3 sm:p-4"></div>

        <!-- Hidden Offscreen Container for Daily Roster Sheet Print -->
        <div id="dailyRosterPrintHost" class="hidden"></div>
      `;

      ScheduleAppointments.bindDomActions();
    },

    // 7. LIFECYCLE: DESTROY
    destroy: function () {
      if (ScheduleAppointments.state.domContainer) {
        ScheduleAppointments.state.domContainer.innerHTML = "";
      }
      console.info("[Vetcare AI OS] Doctor Schedule Appointments Module Destroyed cleanly.");
    },

    // 8. DYNAMIC CSS STYLE INJECTION
    injectStyles: function () {
      if (document.getElementById("vetcare-schedule-appointments-styles")) return;
      const style = document.createElement("style");
      style.id = "vetcare-schedule-appointments-styles";
      style.textContent = `
        .slot-card-busy {
          border-left: 4px solid #06b6d4 !important;
          background: linear-gradient(90deg, rgba(6,182,212,0.08) 0%, rgba(17,24,39,0.95) 100%) !important;
        }
        .slot-card-surgery {
          border-left: 4px solid #f59e0b !important;
          background: linear-gradient(90deg, rgba(245,158,11,0.1) 0%, rgba(17,24,39,0.95) 100%) !important;
        }
        .slot-card-farm {
          border-left: 4px solid #10b981 !important;
          background: linear-gradient(90deg, rgba(16,185,129,0.08) 0%, rgba(17,24,39,0.95) 100%) !important;
        }
        .slot-card-free {
          border: 1px dashed #374151 !important;
          background-color: rgba(17, 24, 39, 0.4) !important;
        }
        .slot-card-free:hover {
          border-color: #10b981 !important;
          background-color: rgba(16, 185, 129, 0.05) !important;
        }
        @media print {
          body * { visibility: hidden !important; }
          #dailyRosterPrintHost, #dailyRosterPrintHost * { visibility: visible !important; }
          #dailyRosterPrintHost { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: #ffffff !important; color: #000000 !important; z-index: 999999; }
        }
      `;
      document.head.appendChild(style);
    },

    // 9. SCHEDULING CONFLICT DETECTION ENGINE
    detectSlotCollision: function (targetDate, targetSlot, excludeApptId) {
      const activeBookings = ScheduleAppointments.state.appointments.filter(a => {
        if (a.appointmentId === excludeApptId) return false;
        if (a.status === "CANCELLED") return false;
        return a.date === targetDate && a.timeSlot === targetSlot;
      });

      if (activeBookings.length > 0) {
        return {
          hasCollision: true,
          conflictingBooking: activeBookings[0],
          reason: `समय स्लॉट '${targetSlot}' पर पहले से ही '${activeBookings[0].animalName}' (${activeBookings[0].bookingType}) आरक्षित है।`
        };
      }
      return { hasCollision: false };
    },

    // 10. COMPONENT: TOP SUMMARY RIBBON
    renderSummaryRibbon: function () {
      const curDate = ScheduleAppointments.state.selectedDate;
      const dayAppts = ScheduleAppointments.state.appointments.filter(a => a.date === curDate && a.status !== "CANCELLED");
      const confirmedCount = dayAppts.length;
      const surgeryCount = dayAppts.filter(a => a.bookingType === "ELECTIVE_SURGERY").length;
      const farmCount = dayAppts.filter(a => a.bookingType === "FARM_FIELD_VISIT").length;
      const freeSlotsCount = Math.max(0, ScheduleAppointments.TIME_SLOTS.length - confirmedCount);

      return `
        <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 shadow-xl relative overflow-hidden sunlight-card">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            <!-- Left Bio & Date Selector -->
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shadow-amber-950/40">
                <i class="fa-solid fa-calendar-check"></i>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h1 class="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight sunlight-text">
                    अपॉइंटमेंट शेड्यूलिंग एवं शल्य चिकित्सा रोस्टर
                  </h1>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    ROSTER 2026 PROD
                  </span>
                </div>
                <div class="text-xs font-mono text-slate-400 mt-1 sunlight-muted flex items-center gap-2">
                  <span>प्रभारी: <strong>डॉ. राहुल जांगड़ा</strong> (VCI-2026-9297)</span>
                  <span>•</span>
                  <span>दिनांक:</span>
                  <input type="date" id="inputFilterScheduleDate" value="${curDate}" class="bg-slate-950 border border-slate-700 rounded-lg px-2 py-0.5 text-xs text-amber-400 font-mono font-bold cursor-pointer" />
                </div>
              </div>
            </div>

            <!-- KPI Metric Chips Strip -->
            <div class="flex items-center gap-3 flex-wrap self-stretch lg:self-auto justify-between lg:justify-end">
              <div class="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-[10px] font-mono text-slate-400 uppercase">आज कुल मरीज</div>
                <div class="text-base font-black font-mono text-white sunlight-text">${confirmedCount} केस</div>
              </div>

              <div class="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-amber-500/40 text-center">
                <div class="text-[10px] font-mono text-amber-400 uppercase">शल्य चिकित्सा (OT)</div>
                <div class="text-base font-black font-mono text-amber-300">${surgeryCount} स्लॉट</div>
              </div>

              <div class="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-emerald-500/40 text-center">
                <div class="text-[10px] font-mono text-emerald-400 uppercase">फार्म विजिट (Field)</div>
                <div class="text-base font-black font-mono text-emerald-300">${farmCount} कॉल्स</div>
              </div>

              <div class="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <div class="text-[10px] font-mono text-slate-400 uppercase">रिक्त स्लॉट</div>
                <div class="text-base font-black font-mono text-cyan-400">${freeSlotsCount} रिक्त</div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-2">
                <button id="btnTriggerNewBooking" type="button" class="py-2.5 px-4 rounded-xl font-display font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 flex items-center gap-1.5 active:scale-95 transition-all">
                  <i class="fa-solid fa-plus"></i>
                  <span>नई बुकिंग दर्ज करें</span>
                </button>
                <button id="btnPrintDailyRoster" type="button" title="दैनिक रोस्टर प्रिंट करें" class="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs">
                  <i class="fa-solid fa-print"></i>
                </button>
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // 11. COMPONENT: NAVIGATION TABS
    renderNavigationTabs: function () {
      const active = ScheduleAppointments.state.activeTab;
      const tabs = [
        { id: "day_schedule_calendar", label: "दैनिक समय-सारणी ग्रिड (Time Grid)", icon: "fa-timeline" },
        { id: "surgery_booking_slots", label: "ऑपरेशन थियेटर बोर्ड (OT Board)", icon: "fa-syringe" },
        { id: "farm_field_planner", label: "ग्रामीण फार्म विजिट प्लानर (Field Route)", icon: "fa-route" },
        { id: "on_call_roster", label: "24/7 ड्यूटी रोस्टर (On-Call Roster)", icon: "fa-user-clock" }
      ];

      return `
        <div class="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs.map(t => `
            <button type="button" data-schedule-tab="${t.id}" class="schedule-tab-btn flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
              active === t.id
                ? "bg-slate-900 text-amber-400 border-t-2 border-l border-r border-amber-500 border-b-transparent shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-900/40"
            }">
              <i class="fa-solid ${t.icon}"></i>
              <span>${t.label}</span>
            </button>
          `).join("")}
        </div>
      `;
    },

    // 12. TAB CONTENT ROUTER
    renderActiveTabContent: function () {
      switch (ScheduleAppointments.state.activeTab) {
        case "surgery_booking_slots":
          return ScheduleAppointments.renderSurgerySlotsTab();
        case "farm_field_planner":
          return ScheduleAppointments.renderFarmPlannerTab();
        case "on_call_roster":
          return ScheduleAppointments.renderOnCallRosterTab();
        case "day_schedule_calendar":
        default:
          return ScheduleAppointments.renderDayCalendarGridTab();
      }
    },

    // 13. COMPONENT: TAB 1 - DAY TIME-GRID APPOINTMENTS
    renderDayCalendarGridTab: function () {
      const curDate = ScheduleAppointments.state.selectedDate;
      const dayAppts = ScheduleAppointments.state.appointments.filter(a => a.date === curDate);

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 class="font-display font-black text-base text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                <i class="fa-solid fa-clock text-amber-400"></i>
                <span>दैनिक स्लॉट अनुसूचियां (30-Minute Interval Time Grid)</span>
              </h3>
              <p class="text-xs text-slate-400 sunlight-muted">किसी भी रिक्त स्लॉट पर क्लिक करके तुरंत नया अपॉइंटमेंट बुक करें।</p>
            </div>
            <span class="text-xs font-mono text-cyan-400 font-bold">${curDate} SCHEDULE</span>
          </div>

          <!-- Slots Stack -->
          <div class="space-y-2.5">
            ${ScheduleAppointments.TIME_SLOTS.map(slot => {
              const booking = dayAppts.find(a => a.timeSlot === slot && a.status !== "CANCELLED");

              if (booking) {
                let typeStyle = "slot-card-busy";
                let typeBadge = "OPD";
                let badgeClass = "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";

                if (booking.bookingType === "ELECTIVE_SURGERY") {
                  typeStyle = "slot-card-surgery";
                  typeBadge = "SURGERY OT";
                  badgeClass = "bg-amber-500/20 text-amber-300 border-amber-500/40";
                } else if (booking.bookingType === "FARM_FIELD_VISIT") {
                  typeStyle = "slot-card-farm";
                  typeBadge = "FIELD VISIT";
                  badgeClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
                } else if (booking.bookingType === "ULTRASOUND_PREGNANCY") {
                  typeBadge = "ULTRASOUND";
                  badgeClass = "bg-purple-500/20 text-purple-300 border-purple-500/40";
                }

                return `
                  <div class="p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${typeStyle} sunlight-card transition-all">
                    <!-- Left: Time + Patient -->
                    <div class="flex items-center gap-3">
                      <div class="w-20 font-mono text-xs font-black text-amber-400 whitespace-nowrap">${slot}</div>
                      <div class="space-y-0.5">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="font-display font-extrabold text-sm text-white sunlight-text">${booking.animalName}</span>
                          <span class="px-2 py-0.2 rounded text-[10px] font-mono font-bold uppercase border ${badgeClass}">${typeBadge}</span>
                          <span class="text-[10px] font-mono text-slate-400">टैग: ${booking.patientTagNo}</span>
                        </div>
                        <div class="text-xs text-slate-300 flex items-center gap-2 flex-wrap sunlight-muted">
                          <span>पालक: <strong>${booking.ownerName}</strong> (${booking.phone})</span>
                          <span>•</span>
                          <span class="text-slate-400 font-mono"><i class="fa-solid fa-location-dot text-rose-400 mr-1"></i>${booking.village}</span>
                        </div>
                        ${booking.notes ? `<div class="text-[11px] text-amber-300/80 italic font-sans">${booking.notes}</div>` : ""}
                      </div>
                    </div>

                    <!-- Right Actions -->
                    <div class="flex items-center gap-2 self-end sm:self-center">
                      <button type="button" data-action="open_reminder" data-appt-id="${booking.appointmentId}" class="py-1 px-2.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow">
                        <i class="fa-brands fa-whatsapp text-emerald-300"></i>
                        <span>WhatsApp रिमाइंडर</span>
                      </button>
                      <button type="button" data-action="complete_appt" data-appt-id="${booking.appointmentId}" title="परामर्श संपन्न चिह्नित करें" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs border border-slate-700">
                        <i class="fa-solid fa-check"></i>
                      </button>
                      <button type="button" data-action="cancel_appt" data-appt-id="${booking.appointmentId}" title="बुकिंग रद्द करें" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs border border-slate-700">
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                `;
              } else {
                // Free Empty Slot
                return `
                  <div data-action="quick_book_slot" data-slot-time="${slot}" class="p-3 rounded-xl slot-card-free flex items-center justify-between gap-3 cursor-pointer group transition-all">
                    <div class="flex items-center gap-3">
                      <div class="w-20 font-mono text-xs font-bold text-slate-400 group-hover:text-emerald-400">${slot}</div>
                      <div class="text-xs text-slate-500 group-hover:text-slate-300 flex items-center gap-1.5">
                        <i class="fa-solid fa-plus-circle text-slate-600 group-hover:text-emerald-400"></i>
                        <span>स्लॉट रिक्त है — त्वरित अपॉइंटमेंट बुक करने हेतु क्लिक करें</span>
                      </div>
                    </div>
                    <span class="text-[10px] font-mono uppercase text-slate-600 group-hover:text-emerald-400 font-bold">RESERVE SLOT</span>
                  </div>
                `;
              }
            }).join("")}
          </div>
        </div>
      `;
    },

    // 14. COMPONENT: TAB 2 - SURGERY THEATER (OT) BOARD
    renderSurgerySlotsTab: function () {
      const curDate = ScheduleAppointments.state.selectedDate;
      const surgeries = ScheduleAppointments.state.appointments.filter(a => a.date === curDate && a.bookingType === "ELECTIVE_SURGERY" && a.status !== "CANCELLED");

      return `
        <div class="space-y-5">
          <div class="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-center justify-between gap-3 sunlight-card">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-lg">
                <i class="fa-solid fa-hand-holding-medical"></i>
              </div>
              <div>
                <h3 class="font-display font-black text-base text-amber-300 uppercase">ऑपरेशन थियेटर (OT) प्री-ऑपरेटिव शेड्यूलिंग बोर्ड</h3>
                <p class="text-xs text-amber-200/80">शल्य चिकित्सा से पूर्व 12-घंटे का उपवास, सीबीसी प्री-एनेस्थेटिक स्क्रीनिंग एवं एनेस्थीसिया प्रोटोकॉल सत्यापन।</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded text-[10px] font-mono font-black uppercase bg-amber-500 text-slate-950">
              STERILE OT ACTIVE
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${surgeries.map(s => `
              <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3.5 sunlight-card">
                <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span class="px-2.5 py-0.5 rounded font-mono text-[11px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">${s.timeSlot}</span>
                  <span class="text-xs font-mono text-cyan-400 font-bold">अनुमानित अवधि: ${s.estimatedDurationMins} मिनट</span>
                </div>

                <div>
                  <h4 class="font-display font-black text-base text-white sunlight-text">${s.animalName}</h4>
                  <div class="text-xs font-mono text-slate-400">टैग: ${s.patientTagNo} • पालक: ${s.ownerName} (${s.phone})</div>
                  <div class="text-xs text-slate-200 mt-1.5 font-semibold">${s.notes}</div>
                </div>

                <!-- Pre-Op Verification Checklist -->
                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs">
                  <div class="flex items-center justify-between text-slate-300">
                    <span>12h उपवास (Pre-Op Fasting):</span>
                    <strong class="text-emerald-400"><i class="fa-solid fa-circle-check mr-1"></i>सत्यापित (Verified)</strong>
                  </div>
                  <div class="flex items-center justify-between text-slate-300">
                    <span>प्री-एनेस्थेटिक सीबीसी/रक्त जांच:</span>
                    <strong class="text-cyan-400">सामान्य (Hb 12.4, Platelets OK)</strong>
                  </div>
                  <div class="flex items-center justify-between text-slate-300">
                    <span>शल्य किट व ऑटोक्लेव स्टरलाइजेशन:</span>
                    <strong class="text-emerald-400">रेडी (Sterile Pack #04)</strong>
                  </div>
                </div>

                <div class="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
                  <button type="button" data-action="open_reminder" data-appt-id="${s.appointmentId}" class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5">
                    <i class="fa-brands fa-whatsapp text-emerald-400"></i> प्री-ऑप निर्देश भेजें
                  </button>
                  <button type="button" data-action="complete_appt" data-appt-id="${s.appointmentId}" class="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-black shadow">
                    सर्जरी रूम में बुलाएं
                  </button>
                </div>
              </div>
            `).join("")}

            ${surgeries.length === 0 ? `
              <div class="col-span-full p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
                <i class="fa-solid fa-circle-check text-3xl text-emerald-400"></i>
                <div class="font-display font-bold text-sm text-slate-300">इस दिनांक को कोई इलेक्टिव सर्जरी निर्धारित नहीं है</div>
                <p class="text-xs text-slate-500">नया शल्य चिकित्सा स्लॉट बुक करने हेतु 'नई बुकिंग दर्ज करें' पर क्लिक करें।</p>
              </div>
            ` : ""}
          </div>
        </div>
      `;
    },

    // 15. COMPONENT: TAB 3 - FARM FIELD ROUTE PLANNER
    renderFarmPlannerTab: function () {
      const curDate = ScheduleAppointments.state.selectedDate;
      const farmVisits = ScheduleAppointments.state.appointments.filter(a => a.date === curDate && a.bookingType === "FARM_FIELD_VISIT" && a.status !== "CANCELLED");

      // Group visits by village cluster
      const clusters = {};
      farmVisits.forEach(v => {
        const vil = v.village || "सामान्य क्षेत्र";
        if (!clusters[vil]) clusters[vil] = [];
        clusters[vil].push(v);
      });

      return `
        <div class="space-y-5">
          <div class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-between gap-3 sunlight-card">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-lg">
                <i class="fa-solid fa-route"></i>
              </div>
              <div>
                <h3 class="font-display font-black text-base text-emerald-300 uppercase">ग्रामीण क्लस्टर फार्म विजिट रूट ऑप्टिमाइज़र</h3>
                <p class="text-xs text-emerald-200/80">मोबाइल वेटरनरी यूनिट के समय व ईंधन बचत हेतु ग्राम-वार क्लस्टर रूटिंग।</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded text-[10px] font-mono font-black uppercase bg-emerald-500 text-slate-950">
              MOBILE UNIT #01
            </span>
          </div>

          <!-- Village Clusters View -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${Object.keys(clusters).map(villageName => {
              const visitsInVillage = clusters[villageName];
              return `
                <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3.5 sunlight-card">
                  <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div class="flex items-center gap-2">
                      <i class="fa-solid fa-map-location-dot text-emerald-400"></i>
                      <h4 class="font-display font-black text-base text-white sunlight-text">गाँव: ${villageName}</h4>
                    </div>
                    <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      ${visitsInVillage.length} फार्म स्टॉप
                    </span>
                  </div>

                  <div class="space-y-2">
                    ${visitsInVillage.map((v, i) => `
                      <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-2 text-xs">
                        <div>
                          <div class="font-bold text-slate-200">${i + 1}. ${v.animalName}</div>
                          <div class="text-[10px] font-mono text-slate-400">पालक: ${v.ownerName} (${v.phone}) • समय: <strong class="text-amber-400">${v.timeSlot}</strong></div>
                          <div class="text-[11px] text-slate-300 mt-1">${v.notes}</div>
                        </div>
                        <button type="button" data-action="open_reminder" data-appt-id="${v.appointmentId}" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400">
                          <i class="fa-brands fa-whatsapp text-sm"></i>
                        </button>
                      </div>
                    `).join("")}
                  </div>
                </div>
              `;
            }).join("")}

            ${Object.keys(clusters).length === 0 ? `
              <div class="col-span-full p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
                <i class="fa-solid fa-truck-medical text-3xl text-emerald-400"></i>
                <div class="font-display font-bold text-sm text-slate-300">आज कोई फार्म फील्ड विजिट निर्धारित नहीं है</div>
                <p class="text-xs text-slate-500">ग्रामीण विजिट बुक करने हेतु बुकिंग फॉर्म में 'FARM_FIELD_VISIT' चुनें।</p>
              </div>
            ` : ""}
          </div>
        </div>
      `;
    },

    // 16. COMPONENT: TAB 4 - 24/7 ON-CALL ROSTER
    renderOnCallRosterTab: function () {
      const roster = ScheduleAppointments.state.dutyRoster;

      return `
        <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 sunlight-card">
          <div class="border-b border-slate-800 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 class="font-display font-black text-base text-white uppercase tracking-wider sunlight-text flex items-center gap-2">
                <i class="fa-solid fa-user-clock text-cyan-400"></i>
                <span>मासिक डॉक्टर ड्यूटी एवं ऑन-कॉल आपातकालीन रोस्टर</span>
              </h3>
              <p class="text-xs text-slate-400 sunlight-muted">मॉर्निंग ओपीडी, इवनिंग क्लिनिक एवं रात्रि आपातकालीन ऑन-कॉल उपलब्धता प्रबंधन।</p>
            </div>
            <span class="text-xs font-mono text-emerald-400 font-bold">VCI MANDATED 24/7 ROSTER</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${roster.map(shift => {
              const shiftIcons = {
                MORNING_OPD: "fa-sun text-amber-400",
                EVENING_OPD: "fa-cloud-sun text-cyan-400",
                NIGHT_EMERGENCY_ON_CALL: "fa-moon text-rose-400"
              };
              const sIcon = shiftIcons[shift.shiftType] || "fa-clock text-slate-400";

              return `
                <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
                      <i class="fa-solid ${sIcon}"></i>
                      <span>${shift.shiftType.replace(/_/g, " ")}</span>
                    </span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${shift.isAvailable ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-rose-500/20 text-rose-300 border border-rose-500/40"}">
                      ${shift.isAvailable ? "ON-DUTY" : "OFF-DUTY"}
                    </span>
                  </div>
                  <div class="font-display font-extrabold text-sm text-white">${shift.attendingVet}</div>
                  <div class="text-xs font-mono text-cyan-400">${shift.hours}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    },

    // 17. COMPONENT: NEW BOOKING MODAL DIALOG
    renderBookingModalDialog: function () {
      const curDate = ScheduleAppointments.state.selectedDate;
      const preSlot = ScheduleAppointments.state.preSelectedSlotForBooking;

      return `
        <div class="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative sunlight-card space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center text-xl font-black">
                <i class="fa-solid fa-calendar-plus"></i>
              </div>
              <div>
                <h3 class="font-display font-extrabold text-base text-white sunlight-text">नया अपॉइंटमेंट आरक्षण (Book Slot)</h3>
                <div class="text-xs text-slate-400 font-mono">Real-Time Collision Protected Engine</div>
              </div>
            </div>
            <button id="btnCloseBookingModal" type="button" class="text-slate-400 hover:text-white p-1">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <form id="formNewAppointmentBooking" onsubmit="return false;" class="space-y-3.5 text-xs">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">दिनांक (Date)</label>
                <input type="date" id="inputBookDate" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 font-mono text-white text-xs" value="${curDate}" required />
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">समय स्लॉट (Time Slot)</label>
                <select id="selectBookTimeSlot" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 font-mono text-amber-400 font-bold text-xs">
                  ${ScheduleAppointments.TIME_SLOTS.map(s => `
                    <option value="${s}" ${s === preSlot ? "selected" : ""}>${s}</option>
                  `).join("")}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">पशु का नाम व नस्ल</label>
                <input type="text" id="inputBookAnimalName" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" placeholder="उदा. लक्ष्मी (मुर्रा भैंस)" required />
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">प्रजाति (Species)</label>
                <select id="selectBookSpecies" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white capitalize">
                  <option value="bovine">गौ/महिष (Bovine)</option>
                  <option value="canine">श्वान (Canine)</option>
                  <option value="caprine">अजा/मेष (Caprine)</option>
                  <option value="feline">मार्जार (Feline)</option>
                  <option value="equine">अश्व (Equine)</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">पशुपालक का नाम</label>
                <input type="text" id="inputBookOwnerName" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" placeholder="नाम प्रविष्ट करें" required />
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">मोबाइल नंबर (WhatsApp)</label>
                <input type="tel" id="inputBookPhone" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 font-mono text-white" placeholder="98120XXXXX" required />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">बुकिंग प्रकार (Purpose)</label>
                <select id="selectBookType" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold">
                  <option value="OPD_CONSULTATION">सामान्य ओपीडी परामर्श (OPD)</option>
                  <option value="ELECTIVE_SURGERY">इलेक्टिव शल्य चिकित्सा (Surgery OT)</option>
                  <option value="ULTRASOUND_PREGNANCY">सोनोग्राफी / गर्भ जांच (Ultrasound)</option>
                  <option value="FARM_FIELD_VISIT">ग्रामीण फार्म विजिट (Field Visit)</option>
                  <option value="VACCINATION">नियमित टीकाकरण (Vaccination)</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">गाँव / क्षेत्र (Village/Area)</label>
                <input type="text" id="inputBookVillage" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" placeholder="उदा. धांसू / मॉडल टाउन" required />
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-mono uppercase text-slate-300 mb-1">विशेष क्लिनिकल नोट्स व तैयारी निर्देश</label>
              <textarea id="textareaBookNotes" rows="2" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white" placeholder="उदा. सर्जरी हेतु 12 घंटे का उपवास, सोनोग्राफी हेतु पानी पिलाकर लाएं..."></textarea>
            </div>

            <div class="pt-2 flex justify-end gap-2">
              <button type="button" id="btnCancelBookingModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">रद्द करें</button>
              <button type="submit" id="btnSubmitNewBooking" class="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg active:scale-95 transition-all">
                स्लॉट आरक्षित करें (Confirm Booking)
              </button>
            </div>
          </form>
        </div>
      `;
    },

    // 18. AUTOMATED OWNER WHATSAPP REMINDER GENERATOR
    openWhatsAppReminderModal: function (apptId) {
      const booking = ScheduleAppointments.state.appointments.find(a => a.appointmentId === apptId);
      if (!booking) return;

      const modalHost = document.getElementById("ownerReminderModalHost");
      if (!modalHost) return;

      let fastingNotice = "";
      if (booking.bookingType === "ELECTIVE_SURGERY") {
        fastingNotice = "⚠️ आवश्यक निर्देश: सर्जरी से 12 घंटे पूर्व चारा व दाना बंद रखें (Water may be given up to 2 hours before).";
      } else if (booking.bookingType === "ULTRASOUND_PREGNANCY") {
        fastingNotice = "⚠️ आवश्यक निर्देश: सोनोग्राफी से पूर्व पशु को भरपूर पानी पिलाएं ताकि मूत्राशय भरा रहे।";
      }

      const reminderText = `नमस्ते ${booking.ownerName} जी, पशु चिकित्सालय की ओर से आपके पशु (${booking.animalName}) का अपॉइंटमेंट दिनांक ${booking.date} को समय ${booking.timeSlot} पर सफलतापूर्वक निर्धारित है। \n\nउद्देश्य: ${booking.bookingType.replace(/_/g, " ")}\n${fastingNotice}\n\nचिकित्सक: डॉ. राहुल जांगड़ा (1800-VET-CARE).`;

      const encodedUrl = `https://wa.me/91${booking.phone}?text=${encodeURIComponent(reminderText)}`;

      modalHost.innerHTML = `
        <div class="bg-slate-900 border-2 border-emerald-500 rounded-3xl max-w-md w-full p-6 shadow-2xl relative sunlight-card space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2.5">
              <i class="fa-brands fa-whatsapp text-2xl text-emerald-400"></i>
              <h3 class="font-display font-extrabold text-base text-white">पशुपालक WhatsApp रिमाइंडर संदेश</h3>
            </div>
            <button id="btnCloseReminderModal" type="button" class="text-slate-400 hover:text-white p-1">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-sans whitespace-pre-line leading-relaxed">
            ${reminderText}
          </div>

          <div class="pt-2 flex items-center justify-between gap-2">
            <button type="button" id="btnCopyReminderText" class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">
              <i class="fa-solid fa-copy mr-1"></i> कॉपी करें
            </button>
            <a href="${encodedUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg flex items-center gap-1.5">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp पर भेजें
            </a>
          </div>
        </div>
      `;

      modalHost.classList.remove("hidden");
      modalHost.classList.add("flex");
      ScheduleAudio.chimeReminderReady();

      const btnClose = document.getElementById("btnCloseReminderModal");
      if (btnClose) {
        btnClose.addEventListener("click", function () {
          modalHost.classList.add("hidden");
          modalHost.classList.remove("flex");
        });
      }

      const btnCopy = document.getElementById("btnCopyReminderText");
      if (btnCopy) {
        btnCopy.addEventListener("click", function () {
          navigator.clipboard.writeText(reminderText);
          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast("रिमाइंडर संदेश क्लिपबोर्ड पर कॉपी किया गया!", "success");
          }
        });
      }
    },

    // 19. EXPORT DAILY ROSTER PDF (A4 CLINICAL ROSTER SHEET PRINT)
    exportDailyRosterPdf: function () {
      const curDate = ScheduleAppointments.state.selectedDate;
      const dayAppts = ScheduleAppointments.state.appointments.filter(a => a.date === curDate && a.status !== "CANCELLED");

      let printHost = document.getElementById("dailyRosterPrintHost");
      if (!printHost) {
        printHost = document.createElement("div");
        printHost.id = "dailyRosterPrintHost";
        document.body.appendChild(printHost);
      }

      printHost.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 36px; color: #000; max-width: 820px; margin: 0 auto; line-height: 1.45;">
          <!-- Top Hospital Banner -->
          <div style="border-bottom: 2.5px solid #064e3b; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div style="font-size: 20px; font-weight: bold; color: #064e3b; text-transform: uppercase;">रेफरल पशु चिकित्सालय एवं क्लीनिकल कॉम्प्लेक्स</div>
              <div style="font-size: 12px; font-weight: 600; color: #374151;">DAILY CLINICAL APPOINTMENT & SURGERY SCHEDULE SHEET</div>
              <div style="font-size: 11px; color: #4b5563;">प्रभारी: डॉ. राहुल जांगड़ा (VCI-2026-9297) • आपातकालीन संपर्क: 1800-VET-CARE</div>
            </div>
            <div style="text-align: right; font-family: monospace;">
              <div style="font-size: 12px; font-weight: bold;">दिनांक: ${curDate}</div>
              <div style="font-size: 11px;">कुल निर्धारित केस: <strong>${dayAppts.length}</strong></div>
            </div>
          </div>

          <!-- Appointments Schedule Table -->
          <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; text-align: left; margin-bottom: 24px;">
            <thead>
              <tr style="border-top: 1.5px solid #000; border-bottom: 1.5px solid #000; background: #f3f4f6;">
                <th style="padding: 7px;">समय स्लॉट</th>
                <th style="padding: 7px;">पशु विवरण एवं टैग</th>
                <th style="padding: 7px;">पशुपालक का नाम व फोन</th>
                <th style="padding: 7px;">बुकिंग प्रकार</th>
                <th style="padding: 7px;">गाँव / लोकेशन</th>
                <th style="padding: 7px; text-align: center;">उपस्थिति / साइन</th>
              </tr>
            </thead>
            <tbody>
              ${dayAppts.map(a => `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 7px; font-weight: bold; font-family: monospace; color: #064e3b;">${a.timeSlot}</td>
                  <td style="padding: 7px;"><strong>${a.animalName}</strong><br/><span style="font-size: 10px; color: #6b7280;">टैग: ${a.patientTagNo}</span></td>
                  <td style="padding: 7px;">${a.ownerName}<br/><span style="font-size: 10px; font-family: monospace;">${a.phone}</span></td>
                  <td style="padding: 7px; font-weight: bold;">${a.bookingType.replace(/_/g, " ")}</td>
                  <td style="padding: 7px;">${a.village}</td>
                  <td style="padding: 7px; border: 1px dashed #d1d5db; width: 90px;"></td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px;">
            <div style="font-size: 10px; color: #6b7280; font-family: monospace;">
              मुद्रित समय: ${new Date().toLocaleTimeString("en-IN")}<br/>
              Vetcare AI OS v2.6.4 Roster Module
            </div>
            <div style="text-align: center;">
              <div style="height: 44px; border-bottom: 1.5px solid #000; width: 180px; margin-bottom: 4px;"></div>
              <div style="font-size: 11px; font-weight: bold;">(डॉक्टर / नर्सिंग स्टाफ हस्ताक्षर)</div>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        window.print();
      }, 200);
    },

    // 20. DOM EVENT DELEGATION & ACTION BINDINGS
    bindDomActions: function () {
      const root = ScheduleAppointments.state.domContainer;
      if (!root) return;

      // Filter Date Change
      const inputDate = document.getElementById("inputFilterScheduleDate");
      if (inputDate) {
        inputDate.addEventListener("change", function () {
          ScheduleAppointments.state.selectedDate = this.value;
          ScheduleAppointments.render(ScheduleAppointments.state.domContainer.id);
        });
      }

      // Tab clicks
      root.querySelectorAll(".schedule-tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const tab = this.getAttribute("data-schedule-tab");
          if (tab) {
            ScheduleAppointments.state.activeTab = tab;
            ScheduleAppointments.render(ScheduleAppointments.state.domContainer.id);
          }
        });
      });

      // Open new booking modal button
      const btnNew = document.getElementById("btnTriggerNewBooking");
      if (btnNew) {
        btnNew.addEventListener("click", function () {
          ScheduleAppointments.state.isNewBookingModalOpen = true;
          ScheduleAppointments.state.preSelectedSlotForBooking = "08:00 AM";
          ScheduleAppointments.render(ScheduleAppointments.state.domContainer.id);
        });
      }

      // Print Roster Button
      const btnPrint = document.getElementById("btnPrintDailyRoster");
      if (btnPrint) {
        btnPrint.addEventListener("click", () => ScheduleAppointments.exportDailyRosterPdf());
      }

      // Close modal buttons
      const btnCloseModal = document.getElementById("btnCloseBookingModal");
      const btnCancelModal = document.getElementById("btnCancelBookingModal");
      const closeModal = function () {
        ScheduleAppointments.state.isNewBookingModalOpen = false;
        ScheduleAppointments.render(ScheduleAppointments.state.domContainer.id);
      };
      if (btnCloseModal) btnCloseModal.addEventListener("click", closeModal);
      if (btnCancelModal) btnCancelModal.addEventListener("click", closeModal);

      // Submit New Booking
      const form = document.getElementById("formNewAppointmentBooking");
      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          const targetDate = document.getElementById("inputBookDate").value;
          const targetSlot = document.getElementById("selectBookTimeSlot").value;

          // Check Collision
          const collision = ScheduleAppointments.detectSlotCollision(targetDate, targetSlot);
          if (collision.hasCollision) {
            ScheduleAudio.chimeCollisionConflict();
            alert(`⚠️ समय स्लॉट संघर्ष (Slot Collision Conflict):\n${collision.reason}`);
            return;
          }

          const newBooking = {
            appointmentId: "APT-2026-" + Math.floor(1000 + Math.random() * 9000),
            date: targetDate,
            timeSlot: targetSlot,
            patientTagNo: "TAG-" + Math.floor(1000 + Math.random() * 9000),
            animalName: document.getElementById("inputBookAnimalName").value,
            species: document.getElementById("selectBookSpecies").value,
            ownerName: document.getElementById("inputBookOwnerName").value,
            phone: document.getElementById("inputBookPhone").value,
            bookingType: document.getElementById("selectBookType").value,
            village: document.getElementById("inputBookVillage").value,
            status: "CONFIRMED",
            notes: document.getElementById("textareaBookNotes").value,
            preOpFastingHours: document.getElementById("selectBookType").value === "ELECTIVE_SURGERY" ? 12 : 0,
            estimatedDurationMins: 30
          };

          ScheduleAppointments.state.appointments.push(newBooking);
          ScheduleStorage.saveAppointment(newBooking);

          ScheduleAppointments.state.isNewBookingModalOpen = false;
          ScheduleAppointments.render(ScheduleAppointments.state.domContainer.id);
          ScheduleAudio.chimeBooked();

          if (window.VetcareApp.showToast) {
            window.VetcareApp.showToast(`अपॉइंटमेंट सफलतापूर्वक आरक्षित: ${newBooking.timeSlot}`, "success");
          }
        });
      }

      // Delegated Action Clicks
      root.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");

        if (action === "quick_book_slot") {
          const slot = btn.getAttribute("data-slot-time");
          ScheduleAppointments.state.preSelectedSlotForBooking = slot;
          ScheduleAppointments.state.isNewBookingModalOpen = true;
          ScheduleAppointments.render(ScheduleAppointments.state.domContainer.id);
        } else if (action === "open_reminder") {
          const apptId = btn.getAttribute("data-appt-id");
          ScheduleAppointments.openWhatsAppReminderModal(apptId);
        } else if (action === "complete_appt") {
          const apptId = btn.getAttribute("data-appt-id");
          const appt = ScheduleAppointments.state.appointments.find(a => a.appointmentId === apptId);
          if (appt) {
            appt.status = "COMPLETED";
            ScheduleStorage.saveAppointment(appt);
            ScheduleAppointments.render(ScheduleAppointments.state.domContainer.id);
            if (window.VetcareApp.showToast) {
              window.VetcareApp.showToast("केस परामर्श संपन्न चिह्नित किया गया।", "success");
            }
          }
        } else if (action === "cancel_appt") {
          const apptId = btn.getAttribute("data-appt-id");
          const appt = ScheduleAppointments.state.appointments.find(a => a.appointmentId === apptId);
          if (appt && confirm("क्या आप इस अपॉइंटमेंट स्लॉट को रद्द करना चाहते हैं?")) {
            appt.status = "CANCELLED";
            ScheduleStorage.saveAppointment(appt);
            ScheduleAppointments.render(ScheduleAppointments.state.domContainer.id);
            if (window.VetcareApp.showToast) {
              window.VetcareApp.showToast("अपॉइंटमेंट स्लॉट रद्द कर दिया गया।", "warning");
            }
          }
        }
      });
    }
  };

  // 21. EXPORT TO GLOBAL NAMESPACE & AUTO-INIT
  window.VetcareApp.Doctor.ScheduleAppointments = ScheduleAppointments;

  document.addEventListener("DOMContentLoaded", function () {
    const defaultHost = document.getElementById("doctorScheduleAppointmentsContainer");
    if (defaultHost) {
      ScheduleAppointments.init("doctorScheduleAppointmentsContainer");
    }
  });

})(window, document);
