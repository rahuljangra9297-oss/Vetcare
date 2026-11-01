// Vetcare AI OS - Unified Clinical Services & 20km GPS Engine (2026 Production)

(function (root) {
  "use strict";

  /* =========================================================================
     1. STORAGE KEYS & SEED REGISTRY
     ========================================================================= */
  const STORAGE_KEYS = {
    CLINICAL_CASES: "vetcare_clinical_cases",
    DISPATCH_REQUESTS: "vetcare_clinical_requests",
    DOCTOR_LOCATION: "vetcare_doctor_location",
    REGISTERED_DOCTORS: "vetcare_registered_doctors"
  };

  // Seed verified registered doctors with GPS coordinates (Privacy Protected)
  const SEED_REGISTERED_DOCTORS = [
    {
      id: "DOC_201",
      name: "डॉ. सुमित जाखड़ (B.V.Sc & A.H.)",
      clinicName: "जाखड़ वेटरनरी क्लिनिक एवं ए.आई. सेंटर",
      lat: 28.4089,
      lon: 76.9854,
      specialty: "गायनोकोलॉजी व सर्जरी",
      rating: "4.9 ★",
      active: true,
      phoneHidden: "98120XXXXX" // Strictly masked from farmer
    },
    {
      id: "DOC_202",
      name: "डॉ. विकास चौधरी (M.V.Sc Medicine)",
      clinicName: "किसान कल्याण पशु चिकित्सालय",
      lat: 28.4520,
      lon: 77.0210,
      specialty: "क्रिटिकल केयर व मेडिसिन",
      rating: "4.8 ★",
      active: true,
      phoneHidden: "94160XXXXX"
    },
    {
      id: "DOC_203",
      name: "डॉ. पूजा यादव (B.V.Sc)",
      clinicName: "स्मार्ट डेयरी पॉलीक्लिनिक",
      lat: 28.3650,
      lon: 76.9200,
      specialty: "थनैला एवं दुग्ध उत्पादन",
      rating: "5.0 ★",
      active: true,
      phoneHidden: "98290XXXXX"
    }
  ];

  function getStorage(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.error("Storage Error:", e);
      return fallback;
    }
  }

  function setStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error("Storage Write Error:", e);
    }
  }

  // Initialize seed registries
  if (!localStorage.getItem(STORAGE_KEYS.REGISTERED_DOCTORS)) {
    setStorage(STORAGE_KEYS.REGISTERED_DOCTORS, SEED_REGISTERED_DOCTORS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CLINICAL_CASES)) {
    setStorage(STORAGE_KEYS.CLINICAL_CASES, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.DISPATCH_REQUESTS)) {
    setStorage(STORAGE_KEYS.DISPATCH_REQUESTS, []);
  }

  /* =========================================================================
     2. HAVERSINE MATHEMATICAL DISTANCE ENGINE (20-KM RADIUS)
     ========================================================================= */
  root.calculateHaversineDistance = function (lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 999;
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Math.round(d * 10) / 10; // Rounded to 1 decimal place
  };

  /* =========================================================================
     3. UNIFIED CLINICAL SERVICES HUB (DOCTOR OPD CONSOLE)
     ========================================================================= */
  let activeServiceMode = "GENERAL_OPD"; // GENERAL_OPD | AI_RECORD | METRITIS_FLUSH | VACCINATION

  root.renderUnifiedClinicalHub = function (containerId = "viewRx") {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="space-y-4 font-sans text-slate-800">
        
        <!-- SERVICE MODE SELECTOR TABS -->
        <div class="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs font-bold">
          <button onclick="window.switchServiceMode('GENERAL_OPD')" class="py-2.5 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${activeServiceMode === 'GENERAL_OPD' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}">
            <span>🩺</span> <span>सामान्य ओपीडी उपचार</span>
          </button>
          <button onclick="window.switchServiceMode('AI_RECORD')" class="py-2.5 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${activeServiceMode === 'AI_RECORD' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}">
            <span>🧬</span> <span>कृत्रिम गर्भाधान (A.I.)</span>
          </button>
          <button onclick="window.switchServiceMode('METRITIS_FLUSH')" class="py-2.5 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${activeServiceMode === 'METRITIS_FLUSH' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}">
            <span>🌸</span> <span>गर्भाशय शोधन / फॉलो-अप</span>
          </button>
          <button onclick="window.switchServiceMode('VACCINATION')" class="py-2.5 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 ${activeServiceMode === 'VACCINATION' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}">
            <span>💉</span> <span>टीकाकरण रिकॉर्ड</span>
          </button>
        </div>

        <!-- MAIN CLINICAL FORM CONTAINER -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs space-y-4">
          
          <!-- PATIENT & OWNER IDENTIFIERS -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 class="text-xs sm:text-sm font-black text-blue-900 flex items-center gap-2">
              <span>📝</span> <span>डिजिटल पर्ची जेनरेटर: ${root.getServiceModeLabel(activeServiceMode)}</span>
            </h2>
            <button onclick="window.captureCurrentGPS()" class="text-[11px] bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-xl border border-blue-200 hover:bg-blue-100 transition flex items-center gap-1">
              <span>📍</span> <span id="gpsStatusBadge">GPS लोकेशन लें</span>
            </button>
          </div>

          <!-- PRIMARY INPUTS -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div>
              <label class="block text-slate-500 font-semibold mb-1">किसान का नाम *</label>
              <input id="rxFarmerName" type="text" placeholder="उदा. रामनिवास जाखड़" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-bold text-slate-800 focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-slate-500 font-semibold mb-1">किसान मोबाइल (10 अंक) *</label>
              <input id="rxFarmerPhone" type="tel" maxlength="10" placeholder="98XXXXXXXX" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-mono font-bold text-slate-800 focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-slate-500 font-semibold mb-1">गाँव / ढाणी</label>
              <input id="rxFarmerVillage" type="text" placeholder="गाँव का नाम" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none font-medium text-slate-800" />
            </div>
          </div>

          <!-- ANIMAL METRICS -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div>
              <label class="block text-slate-500 font-semibold mb-1">पशु का प्रकार</label>
              <select id="rxAnimalSpecies" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none">
                <option value="गाय (Cow)">गाय (Cow)</option>
                <option value="भैंस (Buffalo)">भैंस (Buffalo)</option>
                <option value="बकरी (Goat)">बकरी (Goat)</option>
                <option value="भेड़ (Sheep)">भेड़ (Sheep)</option>
                <option value="बछड़ा / कटड़ा">बछड़ा / कटड़ा</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-500 font-semibold mb-1">कान का टैग / टोकन सं.</label>
              <input id="rxAnimalTag" type="text" placeholder="टैग संख्या" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-bold outline-none" />
            </div>
            <div>
              <label class="block text-slate-500 font-semibold mb-1">गर्भ स्थिति (Pregnancy)</label>
              <select id="rxPregnancyStatus" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none">
                <option value="खाली (Non-Pregnant)">खाली (Non-Pregnant)</option>
                <option value="गाभिन (Pregnant)">गाभिन (Pregnant)</option>
                <option value="संदेहास्पद (Doubtful)">संदेहास्पद (Doubtful)</option>
                <option value="ताजा ब्याही">ताजा ब्याही</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-500 font-semibold mb-1">शारीरिक तापमान (°F)</label>
              <input id="rxAnimalTemp" type="text" placeholder="101.5°F" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-bold outline-none" />
            </div>
          </div>

          <!-- DYNAMIC SPECIALIZED SERVICE SECTION -->
          <div id="dynamicSpecializedServiceArea" class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-3">
            ${root.renderSpecializedServiceInputs(activeServiceMode)}
          </div>

          <!-- DIAGNOSIS & PRESCRIPTION TABLE -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-700">प्रोविजनल डायग्नोसिस / पहचाना गया रोग *</label>
            <input id="rxDiagnosis" type="text" placeholder="उदा. तीव्र गलघोंटू (HS) / थनैला / कीटोसिस" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-black text-slate-900 outline-none focus:border-blue-500" />
          </div>

          <div>
            <div class="flex justify-between items-center mb-1 text-xs">
              <label class="font-bold text-slate-700">Rx: दी गई औषधियां, इंजेक्शन डोज़ व रूट</label>
              <button onclick="document.getElementById('rxMedicineText').value = ''" class="text-[10px] text-rose-600 hover:underline font-bold">खाली करें</button>
            </div>
            <textarea id="rxMedicineText" rows="4" placeholder="1. Inj. Intacef Tazo (3375mg) - I/M&#10;2. Inj. Melonex Plus (15ml) - I/M&#10;3. Bolus Anistamin - 2 गोली सुबह/शाम&#10;4. मिनरल मिक्सचर 50g दैनिक..." class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-mono outline-none focus:border-blue-500 leading-relaxed"></textarea>
          </div>

          <!-- FEES & BILLING -->
          <div class="grid grid-cols-3 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div>
              <span class="text-[10px] text-slate-500 block font-bold">कुल फीस (₹)</span>
              <input id="rxTotalFee" type="number" placeholder="500" oninput="window.calcRxDue()" class="w-full bg-white p-2 rounded-xl border border-slate-200 font-bold" />
            </div>
            <div>
              <span class="text-[10px] text-slate-500 block font-bold">जमा राशि (₹)</span>
              <input id="rxPaidFee" type="number" placeholder="500" oninput="window.calcRxDue()" class="w-full bg-white p-2 rounded-xl border border-slate-200 font-bold text-emerald-700" />
            </div>
            <div>
              <span class="text-[10px] text-slate-500 block font-bold">बकाया राशि (₹)</span>
              <input id="rxDueFee" type="number" readonly value="0" class="w-full bg-white p-2 rounded-xl border border-slate-200 font-bold text-rose-600" />
            </div>
          </div>

          <!-- DISPATCH & ACTION BUTTONS -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
            <button onclick="window.saveAndDispatchPrescription('WHATSAPP')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 active:scale-98">
              <span>💬</span> <span>1-Click व्हाट्सएप पर पर्ची भेजें</span>
            </button>
            <button onclick="window.saveAndDispatchPrescription('PRINT')" class="bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-2xl shadow-md transition flex items-center justify-center gap-2 active:scale-98">
              <span>🖨️</span> <span>पर्ची प्रिंट / PDF डाउनलोड</span>
            </button>
          </div>

        </div>

      </div>
    `;
  };

  root.getServiceModeLabel = function (mode) {
    switch (mode) {
      case "AI_RECORD": return "कृत्रिम गर्भाधान (A.I.)";
      case "METRITIS_FLUSH": return "गर्भाशय शोधन / फॉलो-अप";
      case "VACCINATION": return "टीकाकरण रिकॉर्ड";
      default: return "सामान्य ओपीडी उपचार";
    }
  };

  root.switchServiceMode = function (mode) {
    activeServiceMode = mode;
    root.renderUnifiedClinicalHub();
  };

  root.renderSpecializedServiceInputs = function (mode) {
    if (mode === "AI_RECORD") {
      return `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label class="block font-bold text-slate-700 text-[10px] mb-0.5">सीमन स्ट्रॉ / बुल सं. (Bull ID)</label>
            <input id="aiBullId" type="text" placeholder="उदा. HF-7014 (SABARMATI)" class="w-full bg-white border border-slate-200 rounded-xl p-2 font-bold outline-none" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 text-[10px] mb-0.5">सीमन का प्रकार</label>
            <select id="aiSemenType" class="w-full bg-white border border-slate-200 rounded-xl p-2 outline-none font-bold">
              <option value="CONVENTIONAL">साधारण सीमन (Conventional)</option>
              <option value="SEXED_SORTED">सेक्स सॉर्टेड (90% बछड़ी)</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 text-[10px] mb-0.5">मद का समय (Heat Phase)</label>
            <select id="aiHeatPhase" class="w-full bg-white border border-slate-200 rounded-xl p-2 outline-none">
              <option value="MID_HEAT">मध्यम मद (Mid Heat - 12-18h)</option>
              <option value="EARLY_HEAT">प्रारंभिक मद (Early Heat)</option>
              <option value="LATE_HEAT">अंतिम मद (Late Heat)</option>
            </select>
          </div>
        </div>
      `;
    } else if (mode === "METRITIS_FLUSH") {
      return `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label class="block font-bold text-slate-700 text-[10px] mb-0.5">गर्भाशय स्राव की स्थिति</label>
            <select id="flushDischargeType" class="w-full bg-white border border-slate-200 rounded-xl p-2 outline-none font-bold">
              <option value="PURULENT">गाढ़ा पीला मवाद (Purulent)</option>
              <option value="MUCOPURULENT">आंव मिला मवाद (Mucopurulent)</option>
              <option value="SANGUINOUS">बदबूदार लाल-भूरा मैला</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 text-[10px] mb-0.5">प्रयुक्त इंट्रा-यूटेराइन घोल</label>
            <input id="flushDrugUsed" type="text" placeholder="उदा. 60ml Lixen IU / Povidone 1%" class="w-full bg-white border border-slate-200 rounded-xl p-2 font-bold outline-none" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 text-[10px] mb-0.5">फॉलो-अप तारीख</label>
            <input id="flushFollowUpDate" type="date" class="w-full bg-white border border-slate-200 rounded-xl p-2 outline-none font-bold" />
          </div>
        </div>
      `;
    } else if (mode === "VACCINATION") {
      return `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label class="block font-bold text-slate-700 text-[10px] mb-0.5">टीके का नाम (Vaccine)</label>
            <select id="vaxSelect" class="w-full bg-white border border-slate-200 rounded-xl p-2 outline-none font-bold">
              <option value="FMD (खुरपका-मुँहपका)">FMD (खुरपका-मुँहपका)</option>
              <option value="HS (गलघोंटू)">HS (गलघोंटू)</option>
              <option value="BQ (लंगड़ा बुखार)">BQ (लंगड़ा बुखार)</option>
              <option value="LSD (लंपी स्किन)">LSD (लंपी स्किन)</option>
              <option value="BRUCELLA (ब्रुसेलोसिस)">BRUCELLA (ब्रुसेलोसिस)</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 text-[10px] mb-0.5">वैक्सीन बैच नंबर</label>
            <input id="vaxBatchNo" type="text" placeholder="उदा. VAX-2026-B9" class="w-full bg-white border border-slate-200 rounded-xl p-2 font-mono outline-none" />
          </div>
          <div>
            <label class="block font-bold text-slate-700 text-[10px] mb-0.5">अगला बूस्टर देय (Due Date)</label>
            <input id="vaxDueDate" type="date" class="w-full bg-white border border-slate-200 rounded-xl p-2 font-bold outline-none" />
          </div>
        </div>
      `;
    }
    return `
      <div class="text-[11px] text-slate-600 flex items-center justify-between">
        <span>क्लिनिकल परीक्षा: सामान्य एलोपैथिक उपचार, एंटीबायोटिक एवं दर्दनिवारक प्रोटोकॉल।</span>
        <span class="font-mono text-blue-700 font-bold">General OPD</span>
      </div>
    `;
  };

  root.calcRxDue = function () {
    const total = parseFloat(document.getElementById("rxTotalFee")?.value) || 0;
    const paid = parseFloat(document.getElementById("rxPaidFee")?.value) || 0;
    const dueEl = document.getElementById("rxDueFee");
    if (dueEl) {
      dueEl.value = Math.max(0, total - paid);
    }
  };

  let capturedLocation = null;
  root.captureCurrentGPS = function () {
    const badge = document.getElementById("gpsStatusBadge");
    if (!navigator.geolocation) {
      alert("GPS आपके ब्राउज़र में समर्थित नहीं है।");
      return;
    }
    if (badge) badge.textContent = "लोकेशन जांची जा रही है...";

    navigator.geolocation.getCurrentPosition(
      pos => {
        capturedLocation = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        };
        if (badge) badge.textContent = `📍 ${capturedLocation.lat.toFixed(4)}, ${capturedLocation.lon.toFixed(4)}`;
      },
      err => {
        console.warn("GPS Fail:", err);
        capturedLocation = { lat: 28.4089, lon: 76.9854 }; // Graceful fallback
        if (badge) badge.textContent = `📍 28.4089, 76.9854 (डिफ़ॉल्ट)`;
      },
      { timeout: 7000 }
    );
  };

  /* =========================================================================
     4. PRESCRIPTION DISPATCHER & PDF RENDERER
     ========================================================================= */
  root.saveAndDispatchPrescription = function (targetChannel) {
    const farmerName = document.getElementById("rxFarmerName")?.value.trim();
    const farmerPhone = document.getElementById("rxFarmerPhone")?.value.trim();
    const village = document.getElementById("rxFarmerVillage")?.value.trim() || "गाँव";
    const species = document.getElementById("rxAnimalSpecies")?.value;
    const tag = document.getElementById("rxAnimalTag")?.value.trim() || "बिना टैग";
    const pregnancy = document.getElementById("rxPregnancyStatus")?.value;
    const temp = document.getElementById("rxAnimalTemp")?.value.trim() || "सामान्य";
    const diagnosis = document.getElementById("rxDiagnosis")?.value.trim();
    const medicines = document.getElementById("rxMedicineText")?.value.trim();
    const totalFee = document.getElementById("rxTotalFee")?.value || "0";
    const paidFee = document.getElementById("rxPaidFee")?.value || "0";
    const dueFee = document.getElementById("rxDueFee")?.value || "0";

    if (!farmerName || !farmerPhone || !diagnosis) {
      alert("कृपया किसान का नाम, 10-अंकों का मोबाइल नंबर और निदान (Diagnosis) अवश्य भरें!");
      return;
    }

    const caseId = "VC_RX_" + Date.now().toString().slice(-6);
    const caseDate = new Date().toLocaleDateString("hi-IN");

    const clinicalCase = {
      caseId,
      date: caseDate,
      mode: activeServiceMode,
      serviceLabel: root.getServiceModeLabel(activeServiceMode),
      farmerName,
      farmerPhone,
      village,
      species,
      tag,
      pregnancy,
      temp,
      diagnosis,
      medicines,
      totalFee,
      paidFee,
      dueFee,
      gps: capturedLocation || { lat: 28.4089, lon: 76.9854 }
    };

    // Save locally
    const cases = getStorage(STORAGE_KEYS.CLINICAL_CASES, []);
    cases.unshift(clinicalCase);
    setStorage(STORAGE_KEYS.CLINICAL_CASES, cases);

    if (targetChannel === "WHATSAPP") {
      root.dispatchWhatsAppPrescription(clinicalCase);
    } else {
      root.printClinicalSlip(clinicalCase);
    }
  };

  root.dispatchWhatsAppPrescription = function (c) {
    const gpsMapLink = `https://www.google.com/maps?q=${c.gps.lat},${c.gps.lon}`;

    const text = 
`*🩺 VETCARE CLINICAL AI - डिजिटल केस पर्ची*
---------------------------------------
*पर्ची सं.:* ${c.caseId} | *दिनांक:* ${c.date}
*सेवा श्रेणी:* ${c.serviceLabel}
*किसान का नाम:* ${c.farmerName} (${c.village})
*मोबाइल:* ${c.farmerPhone}
*मरीज पशु:* ${c.species} | *टैग:* ${c.tag}
*गर्भ स्थिति:* ${c.pregnancy} | *तापमान:* ${c.temp}
---------------------------------------
*🔍 पहचाना गया रोग / निदान:*
*${c.diagnosis}*

*💊 अनुशंसित दवाइयां व इंजेक्शन (Rx):*
${c.medicines}
---------------------------------------
*फीस विवरण:*
कुल फीस: ₹${c.totalFee} | जमा: ₹${c.paidFee} | *बकाया: ₹${c.dueFee}*

📍 *किसान लोकेशन (Google Maps):*
${gpsMapLink}

_अधिकृत पशु चिकित्सक द्वारा प्रमाणित_
_Vetcare AI Telemedicine Network_`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://api.whatsapp.com/send?phone=91${c.farmerPhone}&text=${encoded}`;
    window.open(waUrl, "_blank");
  };

  root.printClinicalSlip = function (c) {
    const printArea = document.getElementById("printableSlipArea") || document.createElement("div");
    printArea.id = "printableSlipArea";
    document.body.appendChild(printArea);

    const gpsMapLink = `https://www.google.com/maps?q=${c.gps.lat},${c.gps.lon}`;

    printArea.innerHTML = `
      <div style="font-family:sans-serif; max-width:800px; margin:auto; padding:24px; border:2px solid #0f172a; border-radius:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #0f172a; padding-bottom:12px;">
          <div>
            <h1 style="margin:0; font-size:24px; font-weight:900; color:#1e3a8a;">VETCARE पशु चिकित्सा क्लिनिक</h1>
            <p style="margin:4px 0 0; font-size:12px; color:#475569;">अधिकृत पशु चिकित्सा, कृत्रिम गर्भाधान एवं उन्नत डायग्नोस्टिक केंद्र</p>
          </div>
          <div style="text-align:right;">
            <strong style="font-size:14px; font-family:monospace;">पर्ची सं.: ${c.caseId}</strong>
            <div style="font-size:12px; color:#475569;">दिनांक: ${c.date}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px; font-size:13px; background:#f8fafc; padding:12px; border-radius:12px;">
          <div><strong>किसान का नाम:</strong> ${c.farmerName} (${c.village})</div>
          <div><strong>मोबाइल नंबर:</strong> <a href="tel:${c.farmerPhone}" style="color:#2563eb; text-decoration:none;">${c.farmerPhone} 📞</a></div>
          <div><strong>पशु / प्रजाति:</strong> ${c.species} (टैग: ${c.tag})</div>
          <div><strong>गर्भ स्थिति:</strong> ${c.pregnancy} (ताप: ${c.temp})</div>
          <div><strong>सेवा श्रेणी:</strong> ${c.serviceLabel}</div>
          <div><strong>📍 लोकेशन लिंक:</strong> <a href="${gpsMapLink}" target="_blank" style="color:#2563eb;">Google Maps पर देखें</a></div>
        </div>

        <div style="margin-top:20px;">
          <h3 style="margin:0 0 8px; font-size:15px; color:#1e3a8a; border-bottom:1px solid #cbd5e1; padding-bottom:4px;">🔍 प्रोविजनल डायग्नोसिस (पहचाना गया रोग)</h3>
          <div style="font-size:16px; font-weight:bold; color:#0f172a;">${c.diagnosis}</div>
        </div>

        <div style="margin-top:20px;">
          <h3 style="margin:0 0 8px; font-size:15px; color:#1e3a8a; border-bottom:1px solid #cbd5e1; padding-bottom:4px;">💊 सुझाई गई औषधियां व इंजेक्शन (Rx)</h3>
          <pre style="white-space:pre-wrap; font-family:monospace; font-size:13px; background:#f1f5f9; padding:12px; border-radius:8px; line-height:1.6;">${c.medicines}</pre>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; padding-top:12px; border-top:2px solid #0f172a;">
          <div style="font-size:13px;">
            <strong>कुल फीस:</strong> ₹${c.totalFee} | <strong>जमा:</strong> ₹${c.paidFee} | <strong style="color:#dc2626;">बकाया: ₹${c.dueFee}</strong>
          </div>
          <div style="text-align:right;">
            <div style="height:40px;"></div>
            <strong style="font-size:13px; border-top:1px solid #000; padding-top:4px;">हस्ताक्षर अधिकृत पशु चिकित्सक</strong>
          </div>
        </div>
      </div>
    `;

    window.print();
  };

  /* =========================================================================
     5. 20-KM GPS DOCTOR-FARMER MATCHING ENGINE
     ========================================================================= */

  /* FARMER SIDE: REQUEST NEARBY DOCTORS */
  root.renderFarmerDoctorMatcher = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4 font-sans text-xs">
        
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">📍</span>
            <div>
              <h2 class="text-sm font-black text-slate-900">20 किमी परिधि में पशु चिकित्सक खोजें</h2>
              <p class="text-[11px] text-slate-500">GPS Haversine एल्गोरिथ्म द्वारा निकटतम सत्यापित डॉक्टर</p>
            </div>
          </div>
          <button onclick="window.fetchNearbyDoctorsForFarmer()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl transition shadow-xs">
            ⚡ लोकेशन स्कैन करें
          </button>
        </div>

        <!-- SERVICE SELECTOR FOR FARMER -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">आवश्यक सेवा चुनें:</label>
            <select id="reqServiceType" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold outline-none">
              <option value="आपातकालीन उपचार">🚨 आपातकालीन उपचार (Emergency)</option>
              <option value="कृत्रिम गर्भाधान (A.I.)">🧬 कृत्रिम गर्भाधान (A.I.)</option>
              <option value="बीमारी व ओपीडी">🩺 सामान्य बीमारी व जांच</option>
              <option value="टीकाकरण">💉 घर पर टीकाकरण</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">मरीज पशु का प्रकार:</label>
            <select id="reqSpecies" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold outline-none">
              <option value="गाय (Cow)">गाय (Cow)</option>
              <option value="भैंस (Buffalo)">भैंस (Buffalo)</option>
              <option value="बकरी/भेड़">बकरी/भेड़</option>
            </select>
          </div>
        </div>

        <textarea id="reqFarmerNotes" rows="2" placeholder="पशु के लक्षण संक्षेप में लिखें (उदा. सुबह से पेट फूला है और चारा छोड़ दिया है)..." class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none"></textarea>

        <!-- DOCTORS LIST CONTAINER -->
        <div id="nearbyDoctorsListArea" class="space-y-3 pt-2">
          <div class="text-center py-6 text-slate-400">
            'लोकेशन स्कैन करें' बटन दबाकर 20 किमी में उपलब्ध डॉक्टर खोजें।
          </div>
        </div>

      </div>
    `;
  };

  root.fetchNearbyDoctorsForFarmer = function () {
    const listArea = document.getElementById("nearbyDoctorsListArea");
    if (!listArea) return;

    listArea.innerHTML = `
      <div class="text-center py-6 text-slate-500 font-bold animate-pulse">
        🛰️ आपके खेत/घर की GPS लोकेशन से दूरी की गणना की जा रही है...
      </div>
    `;

    if (!navigator.geolocation) {
      alert("GPS समर्थित नहीं है, डिफ़ॉल्ट लोकेशन से गणना की जा रही है।");
      root.renderMatchedDoctors(28.4000, 76.9900);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        root.renderMatchedDoctors(pos.coords.latitude, pos.coords.longitude);
      },
      err => {
        console.warn("Farmer GPS denied, using default coordinates:", err);
        root.renderMatchedDoctors(28.4000, 76.9900);
      },
      { timeout: 7000 }
    );
  };

  root.renderMatchedDoctors = function (farmerLat, farmerLon) {
    const listArea = document.getElementById("nearbyDoctorsListArea");
    if (!listArea) return;

    const allDocs = getStorage(STORAGE_KEYS.REGISTERED_DOCTORS, SEED_REGISTERED_DOCTORS);

    // Filter within 20 KM radius using Haversine algorithm
    const matched = allDocs.map(doc => {
      const distance = root.calculateHaversineDistance(farmerLat, farmerLon, doc.lat, doc.lon);
      return { ...doc, distance };
    }).filter(d => d.distance <= 20);

    matched.sort((a, b) => a.distance - b.distance);

    if (matched.length === 0) {
      listArea.innerHTML = `
        <div class="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-center font-medium">
          आपके 20 किमी दायरे में कोई सक्रिय डॉक्टर नहीं मिला। कृपया सीधे हेल्पलाइन पर संपर्क करें।
        </div>
      `;
      return;
    }

    listArea.innerHTML = `
      <div class="space-y-2.5">
        <div class="text-[11px] font-bold text-slate-500">20 किमी परिधि में ${matched.length} डॉक्टर उपलब्ध हैं:</div>
        ${matched.map(doc => `
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-black text-slate-900 text-xs sm:text-sm">${doc.name}</span>
                <span class="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">${doc.rating}</span>
              </div>
              <div class="text-[11px] text-slate-600 font-medium">${doc.clinicName}</div>
              <div class="text-[10px] text-blue-700 font-bold mt-0.5">विशेषज्ञता: ${doc.specialty}</div>
              <div class="text-[10px] text-slate-400 font-mono mt-0.5">🔒 संपर्क: ${doc.phoneHidden} (सुरक्षित कॉल केवल डॉक्टर द्वारा)</div>
            </div>

            <div class="text-right shrink-0 space-y-1.5">
              <span class="inline-block text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg font-mono">
                ${doc.distance} किमी दूर
              </span>
              <button onclick="window.requestDoctorVisit('${doc.id}', ${farmerLat}, ${farmerLon})" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-xl text-[11px] shadow-xs transition active:scale-98">
                अनुरोध भेजें ➔
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  };

  root.requestDoctorVisit = function (doctorId, farmerLat, farmerLon) {
    const serviceType = document.getElementById("reqServiceType")?.value || "आपातकालीन उपचार";
    const species = document.getElementById("reqSpecies")?.value || "गाय";
    const notes = document.getElementById("reqFarmerNotes")?.value.trim() || "कोई विवरण नहीं";

    const farmerName = prompt("कृपया अपना नाम दर्ज करें:");
    if (!farmerName) return;
    const farmerPhone = prompt("कृपया अपना 10 अंकों का मोबाइल नंबर दर्ज करें (डॉक्टर द्वारा संपर्क हेतु):");
    if (!farmerPhone || farmerPhone.length < 10) {
      alert("वैध 10-अंकों का मोबाइल नंबर अनिवार्य है!");
      return;
    }

    const requestId = "REQ_" + Date.now().toString().slice(-6);
    const requestPayload = {
      requestId,
      doctorId,
      farmerName,
      farmerPhone,
      serviceType,
      species,
      notes,
      farmerLat,
      farmerLon,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "PENDING"
    };

    const requests = getStorage(STORAGE_KEYS.DISPATCH_REQUESTS, []);
    requests.unshift(requestPayload);
    setStorage(STORAGE_KEYS.DISPATCH_REQUESTS, requests);

    alert(`अनुरोध सफलतापूर्वक भेजा गया! डॉक्टर को आपका केस और GPS नेविगेशन लिंक प्रेषित कर दिया गया है। वे शीघ्र कॉल करेंगे।`);
  };

  /* =========================================================================
     6. DOCTOR SIDE: INCOMING REQUESTS NOTIFICATION & NAVIGATION ROUTER
     ========================================================================= */
  root.renderDoctorIncomingRequests = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const requests = getStorage(STORAGE_KEYS.DISPATCH_REQUESTS, []);

    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4 font-sans text-xs">
        
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🚨</span>
            <div>
              <h2 class="text-sm font-black text-slate-900">किसान विजिट अनुरोध (Incoming Visits)</h2>
              <p class="text-[11px] text-slate-500">20 किमी दायरे से सीधे प्राप्त अलर्ट</p>
            </div>
          </div>
          <span class="text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full font-mono">
            ${requests.filter(r => r.status === 'PENDING').length} नए अलर्ट
          </span>
        </div>

        <div class="space-y-3">
          ${requests.length === 0 ? `
            <div class="text-center py-8 text-slate-400">वर्तमान में कोई लंबित विजिट अनुरोध नहीं है।</div>
          ` : requests.map(req => {
            const googleMapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${req.farmerLat},${req.farmerLon}`;
            const isPending = req.status === "PENDING";

            return `
              <div class="p-4 rounded-2xl border transition ${isPending ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-200'} space-y-2.5">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">${req.serviceType}</span>
                    <h3 class="text-xs sm:text-sm font-black text-slate-900 mt-1">${req.farmerName} (${req.species})</h3>
                  </div>
                  <span class="text-[10px] font-mono text-slate-400">${req.time}</span>
                </div>

                <p class="text-slate-600 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                  "${req.notes}"
                </p>

                <!-- ACTIONS FOR DOCTOR -->
                <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/50">
                  <div class="flex items-center gap-2">
                    <a href="tel:${req.farmerPhone}" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] flex items-center gap-1 transition">
                      <span>📞</span> <span>कॉल करें (${req.farmerPhone})</span>
                    </a>

                    <a href="${googleMapsRouteUrl}" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] flex items-center gap-1 transition">
                      <span>📍</span> <span>रास्ता देखें (Google Maps)</span>
                    </a>
                  </div>

                  ${isPending ? `
                    <button onclick="window.markRequestCompleted('${req.requestId}')" class="bg-slate-800 hover:bg-black text-white font-bold px-3 py-1.5 rounded-xl text-[11px] transition">
                      ✓ केस पूर्ण मार्क करें
                    </button>
                  ` : `
                    <span class="text-emerald-700 font-bold text-[11px]">✓ विजिट संपन्न</span>
                  `}
                </div>
              </div>
            `;
          }).join("")}
        </div>

      </div>
    `;
  };

  root.markRequestCompleted = function (requestId) {
    const requests = getStorage(STORAGE_KEYS.DISPATCH_REQUESTS, []);
    const idx = requests.findIndex(r => r.requestId === requestId);
    if (idx === -1) return;

    requests[idx].status = "COMPLETED";
    setStorage(STORAGE_KEYS.DISPATCH_REQUESTS, requests);
    alert("केस सफलतापूर्वक पूर्ण मार्क किया गया।");
    root.renderDoctorIncomingRequests("doctorIncomingRequestsArea");
  };

})(typeof window !== "undefined" ? window : global);
