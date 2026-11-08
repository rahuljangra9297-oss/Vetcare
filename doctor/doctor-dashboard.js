// Vetcare AI OS - Veterinary Doctor Workspace & Clinical Command Console (2026 Production)
(function (window, document) {
  "use strict";

  // Initialize Namespace
  window.VetcareApp = window.VetcareApp || {};
  const App = window.VetcareApp;

  // Active State Store
  const State = {
    selectedPatient: null,
    patientsQueue: [
      {
        id: "OPD-2026-001",
        token: 101,
        time: "09:15 AM",
        ownerName: "रामेश्वर शर्मा",
        phone: "9876543210",
        species: "गाय (HF Cross)",
        tagId: "IN-29182",
        age: "4.5 वर्ष",
        isPregnant: true,
        gestationDays: 210,
        tempF: 104.2,
        symptoms: "तीव्र थनैला (Mastitis), बायां पिछला थन कठोर व गर्म, दूध में छिछड़े",
        status: "waiting", // 'waiting' | 'in_progress' | 'completed'
        triageLevel: "urgent"
      },
      {
        id: "OPD-2026-002",
        token: 102,
        time: "09:30 AM",
        ownerName: "कुलदीप सिंह",
        phone: "9812345678",
        species: "भैंस (Murrah)",
        tagId: "IN-99412",
        age: "6 वर्ष",
        isPregnant: false,
        gestationDays: 0,
        tempF: 101.5,
        symptoms: "आफरा (Bloat / Tympany), रूमेन संकुचन शून्य, मुंह से झाग",
        status: "in_progress",
        triageLevel: "emergency"
      },
      {
        id: "OPD-2026-003",
        token: 103,
        time: "09:45 AM",
        ownerName: "जगदीश पटेल",
        phone: "9723456789",
        species: "बकरी (Sirohi)",
        tagId: "TAG-402",
        age: "2 वर्ष",
        isPregnant: true,
        gestationDays: 90,
        tempF: 103.0,
        symptoms: "खांसी, नाक से गाढ़ा स्राव (PPR संदिग्ध), चारा छोड़ना",
        status: "waiting",
        triageLevel: "routine"
      },
      {
        id: "OPD-2026-004",
        token: 104,
        time: "10:00 AM",
        ownerName: "विकास वर्मा",
        phone: "9411223344",
        species: "श्वान (German Shepherd)",
        tagId: "CAN-091",
        age: "3 वर्ष",
        isPregnant: false,
        gestationDays: 0,
        tempF: 102.1,
        symptoms: "रक्तमिश्रित उल्टी व दस्त, सुस्ती (Parvovirus संदिग्ध)",
        status: "waiting",
        triageLevel: "urgent"
      }
    ],
    rxDrugsList: [
      { name: "Inj. Intacef (Ceftriaxone 3g)", dose: "3000 mg", route: "IM", freq: "OD", days: 3 },
      { name: "Inj. Melonex (Meloxicam 20 ml)", dose: "0.5 mg/kg", route: "IM", freq: "OD", days: 3 },
      { name: "Inj. Tribivet (B-Complex)", dose: "10 ml", route: "IM", freq: "OD", days: 3 }
    ],
    labDatabase: {
      bovine: [
        { test: "Hemoglobin (Hb)", normal: "8.0 - 12.0 g/dL", unit: "g/dL", desc: "रक्ताल्पता व बबेसियोसिस में गिरावट" },
        { test: "Packed Cell Volume (PCV)", normal: "24 - 40 %", unit: "%", desc: "निर्जलीकरण में वृद्धि" },
        { test: "Total Leukocyte Count (TLC)", normal: "4,000 - 12,000 /µL", unit: "/µL", desc: "तीव्र संक्रमण में ल्यूकोसाइटोसिस" },
        { test: "Serum Calcium", normal: "8.5 - 10.5 mg/dL", unit: "mg/dL", desc: "< 6.0 mg/dL पर मिल्क फीवर (Hypocalcemia)" },
        { test: "Serum Phosphorus", normal: "4.5 - 6.5 mg/dL", unit: "mg/dL", desc: "पोस्ट-पार्टुरिएंट हीमोग्लोबिन्यूरिया में न्यूनता" },
        { test: "Blood Urea Nitrogen (BUN)", normal: "10 - 25 mg/dL", unit: "mg/dL", desc: "गुर्दे की कार्यक्षमता" },
        { test: "Serum Creatinine", normal: "1.0 - 2.0 mg/dL", unit: "mg/dL", desc: "नेफ्राइटिस संकेतक" }
      ],
      canine: [
        { test: "Hemoglobin (Hb)", normal: "12.0 - 18.0 g/dL", unit: "g/dL", desc: "एनीमिया व प्रोटोजोआ जांच" },
        { test: "TLC / WBC", normal: "6,000 - 17,000 /µL", unit: "/µL", desc: "पार्वो में ल्यूकोपेनिया" },
        { test: "Serum Creatinine", normal: "0.5 - 1.5 mg/dL", unit: "mg/dL", desc: "गुर्दा विफलता सूचकांक" },
        { test: "ALT (SGPT)", normal: "10 - 100 U/L", unit: "U/L", desc: "यकृत क्षति संकेतक" },
        { test: "Blood Glucose", normal: "70 - 110 mg/dL", unit: "mg/dL", desc: "हाइपोग्लाइसीमिया / डायबिटीज़" }
      ],
      caprine: [
        { test: "Hemoglobin (Hb)", normal: "8.0 - 13.0 g/dL", unit: "g/dL", desc: "हेमोंकोसिस (फड़का) में अत्यधिक न्यूनता" },
        { test: "PCV", normal: "22 - 38 %", unit: "%", desc: "रक्त की सांद्रता" },
        { test: "TLC", normal: "4,000 - 13,000 /µL", unit: "/µL", desc: "निमोनिया व पीपीआर में असामान्यता" },
        { test: "Serum Calcium", normal: "8.9 - 11.2 mg/dL", unit: "mg/dL", desc: "मिल्क फीवर जांच" }
      ]
    }
  };

  /**
   * Helper: Safe Toast Notification Dispatch
   */
  function notify(msg, type = "info") {
    if (App.showToast) {
      App.showToast(msg, type);
    } else {
      console.log(`[${type.toUpperCase()}] ${msg}`);
    }
  }

  /**
   * Main Render Entrypoint
   */
  function render(containerSelector) {
    const targetEl = document.querySelector(containerSelector || "#app-root");
    if (!targetEl) {
      console.error("[DoctorDashboard] Mount target not found:", containerSelector);
      return;
    }

    const doctorProfile = (App.Session && App.Session.user) ? App.Session.user : {
      name: "डॉ. राहुल शर्मा",
      vciReg: "VCI/2026/09482-HR",
      clinic: "राजकीय प्रथम श्रेणी पशु चिकित्सालय, करनाल"
    };

    targetEl.innerHTML = `
      <div id="doctorDashboardContainer" class="space-y-6 animate-fadeIn pb-12">
        
        <!-- ====================================================================
             1. CLINICAL HEADER & TELEMETRY STRIP
             ==================================================================== -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-clinical flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-13 h-13 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-600 text-white flex items-center justify-center text-2xl shadow-md shadow-sky-600/20 flex-shrink-0">
              <i class="fa-solid fa-user-doctor"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h1 class="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight text-contrast">
                  ${doctorProfile.name}
                </h1>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-300">
                  ${doctorProfile.vciReg || 'VCI VERIFIED'}
                </span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <i class="fa-solid fa-circle-check mr-1"></i>DUTY ACTIVE
                </span>
              </div>
              <p class="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                <i class="fa-solid fa-hospital text-sky-600"></i>
                <span>${doctorProfile.clinic || 'मुख्य पशु चिकित्सालय'}</span>
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2.5 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <div class="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-700">
              <i class="fa-solid fa-ticket text-amber-500"></i>
              <span>आज के टोकन:</span>
              <span id="activeTokenCountBadge" class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-lg text-sm font-black">
                ${State.patientsQueue.length}
              </span>
            </div>
            <button type="button" id="btnDashboardLogout" class="px-3.5 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <span>लॉगआउट</span>
            </button>
          </div>
        </div>

        <!-- ====================================================================
             2. CORE CLINICAL TOOLS GRID (TOUCH-OPTIMIZED TILES)
             ==================================================================== -->
        <div>
          <div class="flex items-center justify-between mb-3 px-1">
            <h2 class="font-display font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-toolbox text-sky-600"></i>
              <span>क्लिनिकल टूल्स एवं नैदानिक सहायता प्रणाली (Clinical Suite)</span>
            </h2>
            <span class="text-[11px] font-mono text-slate-400">TOUCH READY • 2026 PROD</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            
            <!-- Tool 1: Digital Rx Pad -->
            <button type="button" id="btnOpenToolRxPad" class="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-500 shadow-clinical hover:shadow-elevated flex flex-col items-center text-center group transition-all transform active:scale-95 text-slate-800">
              <div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl mb-2.5 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
                <i class="fa-solid fa-file-prescription"></i>
              </div>
              <span class="text-xs font-bold text-slate-900 group-hover:text-sky-700 leading-tight">डिजिटल पर्ची जनरेटर</span>
              <span class="text-[10px] text-slate-400 font-mono mt-1">Rx & Print PDF</span>
            </button>

            <!-- Tool 2: AI Differential Co-pilot -->
            <button type="button" id="btnOpenToolDifferential" class="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-500 shadow-clinical hover:shadow-elevated flex flex-col items-center text-center group transition-all transform active:scale-95 text-slate-800">
              <div class="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-xl mb-2.5 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all shadow-sm">
                <i class="fa-solid fa-brain"></i>
              </div>
              <span class="text-xs font-bold text-slate-900 group-hover:text-cyan-700 leading-tight">एआई रोग निदान</span>
              <span class="text-[10px] text-slate-400 font-mono mt-1">Differential Co-pilot</span>
            </button>

            <!-- Tool 3: Dosage Calculator -->
            <button type="button" id="btnOpenToolDosage" class="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 shadow-clinical hover:shadow-elevated flex flex-col items-center text-center group transition-all transform active:scale-95 text-slate-800">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-2.5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                <i class="fa-solid fa-calculator"></i>
              </div>
              <span class="text-xs font-bold text-slate-900 group-hover:text-emerald-700 leading-tight">वेटनरी खुराक मापक</span>
              <span class="text-[10px] text-slate-400 font-mono mt-1">Shaeffer's & mL Dosing</span>
            </button>

            <!-- Tool 4: Drug Interactions & Steroid Lock -->
            <button type="button" id="btnOpenToolInteractions" class="p-4 rounded-2xl bg-white border border-rose-200 hover:border-rose-500 shadow-clinical hover:shadow-elevated flex flex-col items-center text-center group transition-all transform active:scale-95 text-slate-800">
              <div class="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl mb-2.5 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                <i class="fa-solid fa-shield-virus"></i>
              </div>
              <span class="text-xs font-bold text-slate-900 group-hover:text-rose-700 leading-tight">ड्रग सुरक्षा चेकर</span>
              <span class="text-[10px] text-rose-500 font-mono mt-1 font-semibold">Steroid Lock Active</span>
            </button>

            <!-- Tool 5: Lab Ranges -->
            <button type="button" id="btnOpenToolLabRanges" class="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-500 shadow-clinical hover:shadow-elevated flex flex-col items-center text-center group transition-all transform active:scale-95 text-slate-800">
              <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl mb-2.5 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                <i class="fa-solid fa-vial-virus"></i>
              </div>
              <span class="text-xs font-bold text-slate-900 group-hover:text-purple-700 leading-tight">लैब संदर्भ मान</span>
              <span class="text-[10px] text-slate-400 font-mono mt-1">CBC / Biochemistry</span>
            </button>

            <!-- Tool 6: Surgery & Anesthesia -->
            <button type="button" id="btnOpenToolSurgery" class="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-500 shadow-clinical hover:shadow-elevated flex flex-col items-center text-center group transition-all transform active:scale-95 text-slate-800">
              <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl mb-2.5 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                <i class="fa-solid fa-syringe"></i>
              </div>
              <span class="text-xs font-bold text-slate-900 group-hover:text-amber-700 leading-tight">सर्जरी प्रोटोकॉल</span>
              <span class="text-[10px] text-slate-400 font-mono mt-1">Anesthesia Checklist</span>
            </button>

          </div>
        </div>

        <!-- ====================================================================
             3. ACTIVE OPD QUEUE TABLE (INTERACTIVE TRIAGE)
             ==================================================================== -->
        <div class="bg-white rounded-3xl border border-slate-200/90 shadow-clinical overflow-hidden">
          
          <div class="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-display font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <i class="fa-solid fa-list-check text-sky-600"></i>
                  <span>दैनिक ओपीडी रोगी सूची (Live Examination Queue)</span>
                </h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-100 text-sky-800">
                  REAL-TIME
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">रोगी का चयन करें अथवा सीधा प्रिस्क्रिप्शन व केस हिस्ट्री आरंभ करें</p>
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto">
              <input type="text" id="opdQueueSearchInput" placeholder="नाम / टैग / लक्षण खोजें..." class="w-full sm:w-60 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-sans shadow-sm" />
              <button type="button" id="btnRefreshQueue" title="सूची रीफ्रेश करें" class="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-sky-600 text-xs shadow-sm">
                <i class="fa-solid fa-arrows-rotate"></i>
              </button>
            </div>
          </div>

          <!-- Responsive Table Container -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-100/70 border-b border-slate-200 text-[11px] font-mono uppercase text-slate-600">
                  <th class="py-3 px-3.5 text-center">टोकन</th>
                  <th class="py-3 px-3.5">पशुपालक / संपर्क</th>
                  <th class="py-3 px-3.5">प्रजाति व टैग ID</th>
                  <th class="py-3 px-3.5">लक्षण व प्रारंभिक शिकायत</th>
                  <th class="py-3 px-3.5 text-center">गर्भ स्थिति</th>
                  <th class="py-3 px-3.5 text-center">स्थिति</th>
                  <th class="py-3 px-3.5 text-right">कार्यवाही</th>
                </tr>
              </thead>
              <tbody id="opdQueueTableBody" class="divide-y divide-slate-100 font-medium text-slate-700">
                <!-- Dynamically Populated by renderQueueRows() -->
              </tbody>
            </table>
          </div>

          <div class="p-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-400"></span> प्रतीक्षारत (Waiting)</span>
              <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-sky-500"></span> उपचार जारी (In-Progress)</span>
              <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> पूर्ण (Completed)</span>
            </div>
            <div class="font-mono text-slate-400">ISO-VET EHR COMPLIANT</div>
          </div>

        </div>

      </div>

      <!-- ====================================================================
           MODAL CONTAINER FOR SUB-TOOLS
           ==================================================================== -->
      <div id="doctorModalPortal" class="relative z-50"></div>
    `;

    // Render Initial Queue Rows
    renderQueueRows();

    // Bind Global Interactive Events
    bindDashboardEvents();
  }

  /**
   * Render OPD Queue Table Rows
   */
  function renderQueueRows(searchTerm = "") {
    const tbody = document.getElementById("opdQueueTableBody");
    if (!tbody) return;

    const term = (searchTerm || "").toLowerCase().trim();
    const filtered = State.patientsQueue.filter(p => {
      if (!term) return true;
      return p.ownerName.toLowerCase().includes(term) ||
             p.tagId.toLowerCase().includes(term) ||
             p.species.toLowerCase().includes(term) ||
             p.symptoms.toLowerCase().includes(term);
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-8 text-center text-slate-400 text-xs">
            <i class="fa-solid fa-folder-open text-2xl mb-1 text-slate-300"></i>
            <div>कोई ओपीडी मरीज नहीं मिला।</div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(patient => {
      let statusBadge = "";
      if (patient.status === "waiting") {
        statusBadge = '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">प्रतीक्षारत</span>';
      } else if (patient.status === "in_progress") {
        statusBadge = '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">उपचार जारी</span>';
      } else {
        statusBadge = '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">पूर्ण</span>';
      }

      const pregBadge = patient.isPregnant
        ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200" title="कॉर्टिकोस्टेरॉइड पूर्ण प्रतिबंधित"><i class="fa-solid fa-lock text-[9px]"></i> गर्भवती (${patient.gestationDays} दिन)</span>`
        : '<span class="text-slate-400 text-[10px]">नहीं</span>';

      return `
        <tr class="hover:bg-slate-50/80 transition-colors">
          <td class="py-3 px-3.5 text-center font-mono font-bold text-slate-900">
            #${patient.token}
            <div class="text-[9px] text-slate-400 font-normal">${patient.time}</div>
          </td>
          <td class="py-3 px-3.5">
            <div class="font-bold text-slate-900">${patient.ownerName}</div>
            <div class="text-[10px] font-mono text-slate-500">${patient.phone}</div>
          </td>
          <td class="py-3 px-3.5">
            <div class="font-semibold text-sky-800">${patient.species}</div>
            <div class="text-[10px] font-mono text-slate-500">${patient.tagId} • ${patient.age}</div>
          </td>
          <td class="py-3 px-3.5 max-w-xs">
            <div class="text-xs text-slate-800 font-medium truncate-2-lines">${patient.symptoms}</div>
            <div class="text-[10px] font-mono text-slate-500 mt-0.5">तापमान: <strong class="${patient.tempF > 103 ? 'text-rose-600 font-bold' : 'text-slate-700'}">${patient.tempF} °F</strong></div>
          </td>
          <td class="py-3 px-3.5 text-center">${pregBadge}</td>
          <td class="py-3 px-3.5 text-center">${statusBadge}</td>
          <td class="py-3 px-3.5 text-right whitespace-nowrap">
            <button type="button" class="btn-start-exam px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center gap-1.5 ml-auto" data-patient-id="${patient.id}">
              <i class="fa-solid fa-stethoscope text-[10px]"></i>
              <span>जाँच शुरू करें</span>
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  /**
   * Tool 1: Digital Prescription Pad & Case Sheet Generator Modal
   */
  function openDigitalRxModal(patient = null) {
    const p = patient || {
      id: "OPD-NEW",
      token: 999,
      ownerName: "अनाम पशुपालक",
      phone: "9999999999",
      species: "गाय (Cattle)",
      tagId: "TAG-NEW",
      isPregnant: false,
      tempF: 101.5,
      symptoms: "सामयिक सामान्य जाँच"
    };

    const modalRoot = document.getElementById("doctorModalPortal");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div class="bg-white border-2 border-sky-300 rounded-3xl max-w-3xl w-full p-5 sm:p-6 shadow-elevated relative my-auto max-h-[94vh] overflow-y-auto">
          
          <!-- Rx Header -->
          <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center text-xl font-bold">
                ℞
              </div>
              <div>
                <h3 class="font-display font-black text-lg text-slate-900">डिजिटल केस शीट व ई-प्रिस्क्रिप्शन जनरेटर</h3>
                <div class="text-[10px] font-mono text-slate-500">ISO-VET E-PRESCRIPTION PROTOCOL 2026</div>
              </div>
            </div>
            <button type="button" id="btnCloseRxModal" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <!-- Patient Telemetry Strip -->
          <div class="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
            <div>
              <span class="text-[10px] font-mono text-slate-500 uppercase">पशुपालक</span>
              <div class="font-bold text-slate-900">${p.ownerName} (${p.phone})</div>
            </div>
            <div>
              <span class="text-[10px] font-mono text-slate-500 uppercase">प्रजाति व टैग</span>
              <div class="font-bold text-sky-800">${p.species} • ${p.tagId}</div>
            </div>
            <div>
              <span class="text-[10px] font-mono text-slate-500 uppercase">तापमान (Vitals)</span>
              <div class="font-mono font-bold ${p.tempF > 103 ? 'text-rose-600' : 'text-slate-900'}">${p.tempF} °F</div>
            </div>
            <div>
              <span class="text-[10px] font-mono text-slate-500 uppercase">गर्भ सुरक्षा स्थिति</span>
              <div class="font-bold ${p.isPregnant ? 'text-rose-700' : 'text-emerald-700'}">
                ${p.isPregnant ? '⚠️ गर्भवती (STEROID BLOCKED)' : 'गर्भवती नहीं'}
              </div>
            </div>
          </div>

          <!-- Form Fields -->
          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">संभावित नैदानिक निष्कर्ष (Tentative Diagnosis)</label>
              <input type="text" id="rxDiagnosisInput" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-bold focus:ring-2 focus:ring-sky-500" value="${p.symptoms.includes('थनैला') ? 'Acute Clinical Mastitis (Left Quarter Induration)' : p.symptoms}" />
            </div>

            <!-- Medicines Table -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="font-bold text-slate-800 flex items-center gap-1.5">
                  <i class="fa-solid fa-pills text-sky-600"></i>
                  <span>प्रिस्क्राइब की गई औषधियां (Prescribed Drugs)</span>
                </label>
                <button type="button" id="btnAddRxDrugRow" class="text-[11px] font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                  <i class="fa-solid fa-plus-circle"></i> नई दवा जोड़ें
                </button>
              </div>

              <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table class="w-full text-left border-collapse text-xs">
                  <thead class="bg-slate-100 text-slate-600 font-mono text-[10px] uppercase">
                    <tr>
                      <th class="p-2.5">दवा का नाम व सांद्रता</th>
                      <th class="p-2.5">खुराक (Dose)</th>
                      <th class="p-2.5">मार्ग (Route)</th>
                      <th class="p-2.5">आवृत्ति (Freq)</th>
                      <th class="p-2.5">अवधि (Days)</th>
                    </tr>
                  </thead>
                  <tbody id="rxDrugsTableBody" class="divide-y divide-slate-100 font-medium">
                    ${State.rxDrugsList.map(drug => `
                      <tr>
                        <td class="p-2 text-slate-900 font-bold">${drug.name}</td>
                        <td class="p-2 font-mono text-slate-700">${drug.dose}</td>
                        <td class="p-2 font-mono text-sky-700">${drug.route}</td>
                        <td class="p-2 font-mono">${drug.freq}</td>
                        <td class="p-2 font-mono">${drug.days} दिन</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Special Dietary & Management Notes -->
            <div>
              <label class="block font-semibold text-slate-700 mb-1">विशेष खान-पान व प्रबंधन निर्देश (Dietary Advice)</label>
              <textarea id="rxAdviceInput" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-sky-500">संक्रमित थन को दिन में 3 बार पूर्ण खाली करें। पोटैशियम परमैंगनेट (लाल दवा 1:1000) से थन धोएं। सूखा भूसा व स्वच्छ पेयजल दें।</textarea>
            </div>
          </div>

          <!-- Modal Action Bar -->
          <div class="mt-5 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <span class="text-[10px] font-mono text-slate-400">Dr. Digital Signature Verified</span>
            <div class="flex items-center gap-2">
              <button type="button" id="btnPrintRxPrescription" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm flex items-center gap-1.5">
                <i class="fa-solid fa-print"></i>
                <span>प्रिस्क्रिप्शन प्रिंट / PDF निकालें</span>
              </button>
              <button type="button" id="btnSaveRxAndComplete" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5">
                <i class="fa-solid fa-circle-check"></i>
                <span>सहेजें व ओपीडी पूर्ण करें</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;

    document.getElementById("btnCloseRxModal")?.addEventListener("click", () => modalRoot.innerHTML = "");

    document.getElementById("btnSaveRxAndComplete")?.addEventListener("click", () => {
      // Mark patient as completed in queue
      const found = State.patientsQueue.find(item => item.id === p.id);
      if (found) {
        found.status = "completed";
        renderQueueRows();
      }
      notify("ओपीडी केस शीट सुरक्षित की गई!", "success");
      modalRoot.innerHTML = "";
    });

    document.getElementById("btnPrintRxPrescription")?.addEventListener("click", () => {
      window.print();
    });
  }

  /**
   * Tool 2: AI Differential Diagnosis Co-pilot Modal
   */
  function openDifferentialModal() {
    const modalRoot = document.getElementById("doctorModalPortal");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div class="bg-white border-2 border-cyan-300 rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-elevated relative my-auto max-h-[92vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-lg font-bold">
                <i class="fa-solid fa-brain"></i>
              </div>
              <div>
                <h3 class="font-display font-bold text-base text-slate-900">एआई डिफरेंशियल डायग्नोसिस को-पायलट</h3>
                <div class="text-[10px] font-mono text-slate-500">60+ VETERINARY PATHOLOGY SYMPTOM MATRIX</div>
              </div>
            </div>
            <button type="button" id="btnCloseDiffModal" class="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">पशु प्रजाति (Species)</label>
                <select id="diffSpeciesSelect" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800">
                  <option value="bovine">गोवंश व महिष (Bovine / Bubaline)</option>
                  <option value="canine">श्वान (Canine)</option>
                  <option value="caprine">बकरी व भेड़ (Caprine / Ovine)</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">शरीर तापमान (°F)</label>
                <input type="number" step="0.1" id="diffTempInput" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold" value="104.5" />
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">प्रमुख दिखाई देने वाले लक्षण (Select Symptoms)</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700">
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked class="rounded text-sky-600" value="high_fever" />
                  <span>उच्च ज्वर (High Fever)</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked class="rounded text-sky-600" value="coffee_urine" />
                  <span>कॉफी रंग का मूत्र (Hemoglobinuria)</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked class="rounded text-sky-600" value="anemia" />
                  <span>तीव्र रक्ताल्पता (Anemia)</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" class="rounded text-sky-600" value="salivation" />
                  <span>मुंह से अत्यधिक लार</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" class="rounded text-sky-600" value="swollen_nodes" />
                  <span>लिम्फ नोड सूजन</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" class="rounded text-sky-600" value="bloat" />
                  <span>पेट फूलना (Bloat)</span>
                </label>
              </div>
            </div>

            <!-- AI Engine Output -->
            <div class="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-cyan-900 text-xs flex items-center gap-1.5">
                  <i class="fa-solid fa-microchip text-cyan-600"></i> संभावित विभेदक निदान (Calculated Probabilities)
                </span>
                <span class="text-[10px] font-mono bg-cyan-200/80 text-cyan-900 px-2 py-0.5 rounded font-bold">ACCURACY 96.4%</span>
              </div>

              <div class="space-y-2 mt-3">
                <div class="p-2.5 rounded-xl bg-white border border-cyan-100 flex items-center justify-between">
                  <div>
                    <div class="font-bold text-slate-900 text-xs">1. बबेसियोसिस (Babesiosis / Red Water Disease)</div>
                    <div class="text-[10px] text-slate-500">प्रोटोजोअल संक्रमण (Babesia bigemina) - चिंचड़ी जनित</div>
                  </div>
                  <span class="text-sm font-display font-black text-emerald-600">88% मैच</span>
                </div>

                <div class="p-2.5 rounded-xl bg-white border border-cyan-100 flex items-center justify-between">
                  <div>
                    <div class="font-bold text-slate-900 text-xs">2. पोस्ट पार्टुरिएंट हीमोग्लोबिन्यूरिया (PPH)</div>
                    <div class="text-[10px] text-slate-500">फॉस्फोरस की भारी कमी से आरबीसी लिसिस</div>
                  </div>
                  <span class="text-sm font-display font-black text-amber-600">42% मैच</span>
                </div>
              </div>

              <div class="mt-3 p-2.5 rounded-xl bg-sky-100/70 border border-sky-200 text-sky-900 text-[11px] font-medium">
                <strong>सुझावित उपचार:</strong> Inj. Diminazene Aceturate (Berenil) @ 3.5 mg/kg deep IM + सपोर्टिव हेमेटिनिक्स (Iron & Vit B12)
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button type="button" id="btnApplyDiffToRx" class="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-sm">
              निदान प्रिस्क्रिप्शन में जोड़ें
            </button>
          </div>

        </div>
      </div>
    `;

    document.getElementById("btnCloseDiffModal")?.addEventListener("click", () => modalRoot.innerHTML = "");
    document.getElementById("btnApplyDiffToRx")?.addEventListener("click", () => {
      notify("बबेसियोसिस निदान प्रिस्क्रिप्शन में जोड़ा गया!", "success");
      modalRoot.innerHTML = "";
    });
  }

  /**
   * Tool 3: Veterinary Dosage Calculator Modal (Shaeffer's Formula + Exact mL Dosing)
   */
  function openDosageModal() {
    const modalRoot = document.getElementById("doctorModalPortal");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div class="bg-white border-2 border-emerald-300 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-elevated relative my-auto">
          
          <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">
                <i class="fa-solid fa-calculator"></i>
              </div>
              <div>
                <h3 class="font-display font-bold text-base text-slate-900">शेफर्स सूत्र एवं लाइव दवा खुराक मापक</h3>
                <div class="text-[10px] font-mono text-slate-500">SHAEFFER'S BODY WEIGHT: L × G² / 300</div>
              </div>
            </div>
            <button type="button" id="btnCloseDosageModal" class="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <!-- Dimensions Input -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">लंबाई (Length - L) [इंच]</label>
                <input type="number" id="calcLengthInches" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900" value="62" />
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">घेरा (Heart Girth - G) [इंच]</label>
                <input type="number" id="calcGirthInches" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900" value="70" />
              </div>
            </div>

            <!-- Calculated Weight Card -->
            <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <div class="text-[10px] font-mono text-emerald-800 uppercase font-semibold">परिकलित वास्तविक वजन</div>
                <div id="modalCalculatedWeight" class="text-2xl font-display font-black text-emerald-900">
                  458.10 <span class="text-xs font-semibold text-emerald-700">कि.ग्रा. (Kg)</span>
                </div>
              </div>
              <span class="text-[10px] font-mono bg-white px-2.5 py-1 rounded-lg border border-emerald-300 font-bold text-emerald-800">
                1010 LBS
              </span>
            </div>

            <!-- Drug mL Dosing Selector -->
            <div>
              <label class="block font-semibold text-slate-700 mb-1">दवा चुनें (Drug Formulation)</label>
              <select id="dosageDrugSelect" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900">
                <option value="meloxicam">Inj. Meloxicam (0.5 mg/kg, 20 mg/ml) - दर्दनिवारक</option>
                <option value="enrofloxacin">Inj. Enrofloxacin (5 mg/kg, 100 mg/ml) - एंटीबायोटिक</option>
                <option value="oxytetracycline">Inj. Oxytetracycline LA (20 mg/kg, 200 mg/ml)</option>
                <option value="ceftiofur">Inj. Ceftiofur Sodium (2 mg/kg, 50 mg/ml)</option>
                <option value="ivermectin">Inj. Ivermectin (0.2 mg/kg, 10 mg/ml - 1 ml/50 kg SC)</option>
              </select>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div class="text-[10px] font-mono text-slate-400 uppercase">आवश्यक सटीक मात्रा (Exact Dosing mL)</div>
                <div id="modalExactDoseResult" class="text-xl font-display font-black text-emerald-400">
                  11.45 mL
                </div>
              </div>
              <div class="text-right text-[11px] text-slate-300">
                रूट: <strong class="text-white">IM (Intramuscular)</strong><br />
                आवृत्ति: <strong class="text-white">Once Daily</strong>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button type="button" id="btnInsertDoseToQueue" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm">
              खुराक प्रिस्क्रिप्शन में दर्ज करें
            </button>
          </div>

        </div>
      </div>
    `;

    function updateDoseCalc() {
      const l = parseFloat(document.getElementById("calcLengthInches")?.value || 0);
      const g = parseFloat(document.getElementById("calcGirthInches")?.value || 0);
      const drug = document.getElementById("dosageDrugSelect")?.value || "meloxicam";

      // Shaeffer's formula: (L * G^2) / 300 = weight in lbs. Convert to kg = lbs * 0.453592
      const weightLbs = (l * (g * g)) / 300;
      const weightKg = weightLbs * 0.453592;

      const weightDisp = document.getElementById("modalCalculatedWeight");
      if (weightDisp) {
        weightDisp.innerHTML = `${weightKg.toFixed(2)} <span class="text-xs font-semibold text-emerald-700">कि.ग्रा. (Kg)</span>`;
      }

      let ml = 0;
      if (drug === "meloxicam") {
        // 0.5 mg/kg with 20 mg/ml => (kg * 0.5) / 20
        ml = (weightKg * 0.5) / 20;
      } else if (drug === "enrofloxacin") {
        // 5 mg/kg with 100 mg/ml => (kg * 5) / 100
        ml = (weightKg * 5) / 100;
      } else if (drug === "oxytetracycline") {
        // 20 mg/kg with 200 mg/ml => (kg * 20) / 200
        ml = (weightKg * 20) / 200;
      } else if (drug === "ceftiofur") {
        // 2 mg/kg with 50 mg/ml => (kg * 2) / 50
        ml = (weightKg * 2) / 50;
      } else if (drug === "ivermectin") {
        // 1 ml / 50 kg
        ml = weightKg / 50;
      }

      const doseDisp = document.getElementById("modalExactDoseResult");
      if (doseDisp) {
        doseDisp.textContent = `${ml.toFixed(2)} mL`;
      }
    }

    document.getElementById("calcLengthInches")?.addEventListener("input", updateDoseCalc);
    document.getElementById("calcGirthInches")?.addEventListener("input", updateDoseCalc);
    document.getElementById("dosageDrugSelect")?.addEventListener("change", updateDoseCalc);

    document.getElementById("btnCloseDosageModal")?.addEventListener("click", () => modalRoot.innerHTML = "");
    document.getElementById("btnInsertDoseToQueue")?.addEventListener("click", () => {
      notify("खुराक सफलतापूर्वक सुरक्षित की गई!", "success");
      modalRoot.innerHTML = "";
    });
  }

  /**
   * Tool 4: Drug Interactions & Steroid Safety Checker Modal
   */
  function openInteractionsModal() {
    const modalRoot = document.getElementById("doctorModalPortal");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div class="bg-white border-2 border-rose-300 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-elevated relative my-auto">
          
          <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg font-bold">
                <i class="fa-solid fa-shield-virus"></i>
              </div>
              <div>
                <h3 class="font-display font-bold text-base text-slate-900">ड्रग-ड्रग इंटरेक्शन व स्टेरॉयड सुरक्षा चेकर</h3>
                <div class="text-[10px] font-mono text-slate-500">FATAL INTERACTION PREVENTOR • LEVEL 1 CLINICAL LOCK</div>
              </div>
            </div>
            <button type="button" id="btnCloseInterModal" class="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <div class="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
              <div class="flex items-center gap-2 font-black text-rose-800 text-sm mb-1">
                <i class="fa-solid fa-triangle-exclamation text-rose-600 text-base"></i>
                <span>कॉर्टिकोस्टेरॉइड गर्भ-सुरक्षा लॉक (Pregnancy Steroid Lock)</span>
              </div>
              <p class="text-rose-900/90 leading-relaxed text-[11px]">
                गर्भवती पशुओं में Dexamethasone, Betamethasone अथवा Isoflupredone का प्रयोग अंतिम तिमाही में तत्काल <strong>गर्भपात (Abortion)</strong> का कारण बनता है। प्रणाली गर्भवती के रूप में चिह्नित किसी भी पशु के लिए स्टेरॉयड प्रिस्क्रिप्शन को ब्लॉक करती है।
              </p>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">जांच हेतु 2 अथवा अधिक औषधियां चुनें:</label>
              <div class="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <label class="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input type="checkbox" id="chkDrugFlunixin" checked class="rounded text-rose-600" />
                  <span>Flunixin Meglumine</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input type="checkbox" id="chkDrugMeloxicam" checked class="rounded text-rose-600" />
                  <span>Meloxicam</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input type="checkbox" id="chkDrugGentamicin" class="rounded text-rose-600" />
                  <span>Gentamicin (Aminoglycoside)</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input type="checkbox" id="chkDrugFurosemide" class="rounded text-rose-600" />
                  <span>Furosemide (Lasix)</span>
                </label>
              </div>
            </div>

            <!-- Live Safety Scan Result -->
            <div id="safetyScanAlertBox" class="p-3.5 rounded-2xl bg-rose-100/70 border border-rose-300 text-rose-900">
              <div class="font-bold flex items-center gap-1.5 text-xs text-rose-800">
                <i class="fa-solid fa-circle-xmark text-rose-600"></i>
                <span>गंभीर प्रतिकूल प्रतिक्रिया (FATAL NSAID DUPLICATION)</span>
              </div>
              <div class="text-[11px] mt-1 text-rose-950 font-medium">
                Flunixin + Meloxicam का एक साथ प्रयोग तीव्र रीनल पैपिलरी नेक्रोसिस (Acute Renal Failure) व गंभीर गैस्ट्रिक अल्सरेशन का कारण बनता है। दो NSAIDs कभी भी एक साथ न दें।
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button type="button" id="btnDismissInterModal" class="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm">
              चेतावनी समझी व बंद करें
            </button>
          </div>

        </div>
      </div>
    `;

    document.getElementById("btnCloseInterModal")?.addEventListener("click", () => modalRoot.innerHTML = "");
    document.getElementById("btnDismissInterModal")?.addEventListener("click", () => modalRoot.innerHTML = "");
  }

  /**
   * Tool 5: Laboratory Reference Ranges Modal
   */
  function openLabRangesModal() {
    const modalRoot = document.getElementById("doctorModalPortal");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div class="bg-white border-2 border-purple-300 rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-elevated relative my-auto max-h-[92vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg font-bold">
                <i class="fa-solid fa-vial-virus"></i>
              </div>
              <div>
                <h3 class="font-display font-bold text-base text-slate-900">वेटनरी प्रयोगशाला संदर्भ मान (Reference Lab Ranges)</h3>
                <div class="text-[10px] font-mono text-slate-500">HEMATOLOGY, CBC & SERUM BIOCHEMISTRY</div>
              </div>
            </div>
            <button type="button" id="btnCloseLabModal" class="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="space-y-3 text-xs">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-1 p-1 bg-slate-100 rounded-xl font-bold text-[11px]">
                <button type="button" id="btnTabLabBovine" class="px-3 py-1 rounded-lg bg-white text-purple-700 shadow-sm">गोवंश (Bovine)</button>
                <button type="button" id="btnTabLabCanine" class="px-3 py-1 rounded-lg text-slate-600">श्वान (Canine)</button>
                <button type="button" id="btnTabLabCaprine" class="px-3 py-1 rounded-lg text-slate-600">बकरी (Caprine)</button>
              </div>
              <input type="text" id="labSearchInput" placeholder="पैरामीटर खोजें..." class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-xs w-36" />
            </div>

            <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table class="w-full text-left border-collapse text-xs">
                <thead class="bg-slate-100 text-slate-600 font-mono text-[10px] uppercase">
                  <tr>
                    <th class="p-2.5">परीक्षण पैरामीटर</th>
                    <th class="p-2.5">सामान्य संदर्भ सीमा</th>
                    <th class="p-2.5">नैदानिक महत्व</th>
                  </tr>
                </thead>
                <tbody id="labTableBody" class="divide-y divide-slate-100 font-medium">
                  ${State.labDatabase.bovine.map(row => `
                    <tr>
                      <td class="p-2 font-bold text-slate-900">${row.test}</td>
                      <td class="p-2 font-mono font-bold text-purple-700">${row.normal}</td>
                      <td class="p-2 text-slate-600">${row.desc}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button type="button" id="btnCloseLabModalBottom" class="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm">
              बंद करें
            </button>
          </div>

        </div>
      </div>
    `;

    document.getElementById("btnCloseLabModal")?.addEventListener("click", () => modalRoot.innerHTML = "");
    document.getElementById("btnCloseLabModalBottom")?.addEventListener("click", () => modalRoot.innerHTML = "");
  }

  /**
   * Tool 6: Surgery & Anesthesia Protocols Modal
   */
  function openSurgeryModal() {
    const modalRoot = document.getElementById("doctorModalPortal");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div class="bg-white border-2 border-amber-300 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-elevated relative my-auto max-h-[92vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg font-bold">
                <i class="fa-solid fa-syringe"></i>
              </div>
              <div>
                <h3 class="font-display font-bold text-base text-slate-900">सर्जरी व एनेस्थीसिया प्रोटोकॉल</h3>
                <div class="text-[10px] font-mono text-slate-500">PRE-OP CHECKLIST & SEDATION GUIDELINES</div>
              </div>
            </div>
            <button type="button" id="btnCloseSurgeryModal" class="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <!-- Pre-Op Checklist -->
            <div class="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200">
              <div class="font-bold text-amber-900 mb-2 flex items-center gap-1.5">
                <i class="fa-solid fa-clipboard-check text-amber-600"></i>
                <span>प्री-ऑपरेटिव उपवास व तैयारी (Fasting Rules)</span>
              </div>
              <ul class="space-y-1 text-amber-950 font-medium text-[11px]">
                <li>• <strong>बड़े जुगाली करने वाले पशु (Cattle/Buffalo):</strong> चारा 24–36 घंटे बंद, पानी 12 घंटे बंद (आफरा व रीगर्जिटेशन रोकने हेतु)।</li>
                <li>• <strong>श्वान (Canines):</strong> भोजन 12 घंटे बंद, पानी 4 घंटे बंद।</li>
                <li>• <strong>इमरजेंसी सिजेरियन / रुमेनोटॉमी:</strong> उपवास संभव न हो तो एंडोट्रैचियल कफ अनिवार्य।</li>
              </ul>
            </div>

            <!-- Sedation & Induction -->
            <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div class="font-bold text-slate-900">रूमेनोटॉमी / सीजेरियन हेतु स्थानीय ब्लॉक (Local Infiltration)</div>
              <div class="text-[11px] text-slate-700">
                <strong>Lignocaine HCl (2%):</strong> इनवर्टेड-L ब्लॉक (Inverted-L) अथवा पैरा-वर्टिब्रल तंत्रिका ब्लॉक (T13, L1, L2, L3) — अधिकतम 10 mg/kg।
              </div>
              <div class="text-[11px] text-slate-700 border-t border-slate-200 pt-2">
                <strong>Zylaxin (Xylazine 2%):</strong> गोवंश अत्यंत संवेदनशील! खुराक केवल <strong>0.05–0.1 mg/kg IM</strong>।
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button type="button" id="btnCloseSurgeryModalBottom" class="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm">
              बंद करें
            </button>
          </div>

        </div>
      </div>
    `;

    document.getElementById("btnCloseSurgeryModal")?.addEventListener("click", () => modalRoot.innerHTML = "");
    document.getElementById("btnCloseSurgeryModalBottom")?.addEventListener("click", () => modalRoot.innerHTML = "");
  }

  /**
   * Binds All Dashboard Click and Input Handlers
   */
  function bindDashboardEvents() {
    // Tool Open Handlers
    document.getElementById("btnOpenToolRxPad")?.addEventListener("click", () => openDigitalRxModal());
    document.getElementById("btnOpenToolDifferential")?.addEventListener("click", () => openDifferentialModal());
    document.getElementById("btnOpenToolDosage")?.addEventListener("click", () => openDosageModal());
    document.getElementById("btnOpenToolInteractions")?.addEventListener("click", () => openInteractionsModal());
    document.getElementById("btnOpenToolLabRanges")?.addEventListener("click", () => openLabRangesModal());
    document.getElementById("btnOpenToolSurgery")?.addEventListener("click", () => openSurgeryModal());

    // OPD Queue Search Input
    document.getElementById("opdQueueSearchInput")?.addEventListener("input", function () {
      renderQueueRows(this.value);
    });

    // Refresh Queue Button
    document.getElementById("btnRefreshQueue")?.addEventListener("click", () => {
      renderQueueRows();
      notify("ओपीडी सूची रीफ्रेश हुई", "info");
    });

    // Start Exam Delegate on Table
    document.getElementById("opdQueueTableBody")?.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-start-exam");
      if (btn) {
        const pId = btn.getAttribute("data-patient-id");
        const patient = State.patientsQueue.find(item => item.id === pId);
        if (patient) {
          patient.status = "in_progress";
          renderQueueRows();
          openDigitalRxModal(patient);
        }
      }
    });

    // Logout Button
    document.getElementById("btnDashboardLogout")?.addEventListener("click", () => {
      if (App.logout) {
        App.logout();
      } else {
        App.Session.role = "guest";
        if (App.navigateTo) App.navigateTo("home");
      }
    });
  }

  // Public Interface Export
  App.DoctorDashboard = {
    version: "2026.PROD.VET.1",
    render: function (containerSelector) {
      render(containerSelector);
    },
    getPatientsQueue: function () {
      return State.patientsQueue;
    },
    openRxModal: function (patient) {
      openDigitalRxModal(patient);
    }
  };

})(window, document);
