// Vetcare AI OS - Unified Clinical Services & 20km GPS Engine (2026 Production)
(function (window, document) {
  'use strict';

  const STORAGE_KEYS = {
    CASES: 'vetcare_opd_cases',
    GPS_REQUESTS: 'vetcare_gps_requests',
    DOC_LOCATION: 'vetcare_doctor_last_gps'
  };

  let currentServiceMode = 'OPD'; // OPD, AI, UTERINE, VACCINATION
  let currentCoordinates = { lat: null, lon: null };

  // Safe Store Utilities
  function getStored(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStored(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('[ClinicalServices] LocalStorage write error:', e);
    }
  }

  /* =========================================================================
     1. UNIFIED CLINICAL SERVICES HUB & MULTI-MODE OPD PAD
     ========================================================================= */

  window.setClinicalServiceMode = function (mode) {
    currentServiceMode = mode;
    const modeButtons = document.querySelectorAll('.service-mode-chip');
    modeButtons.forEach(btn => {
      btn.className = 'service-mode-chip py-2 px-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-xs transition';
    });

    const activeBtn = document.getElementById(`btnServiceMode_${mode}`);
    if (activeBtn) {
      activeBtn.className = 'service-mode-chip py-2 px-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs transition';
    }

    const modeContainer = document.getElementById('modeSpecificFieldsArea');
    if (!modeContainer) return;

    if (mode === 'AI') {
      modeContainer.innerHTML = `
        <div class="p-3 bg-purple-50 border border-purple-200 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div>
            <label class="block text-[10px] font-bold text-purple-900 mb-0.5">सीमन स्ट्रॉ नंबर / बुल ID</label>
            <input id="aiStrawNo" type="text" placeholder="उदा. MU-4050" class="w-full bg-white border border-purple-200 rounded-lg p-2 font-mono font-bold outline-none" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-purple-900 mb-0.5">नस्ल (Breed) व वीर्य स्रोत</label>
            <input id="aiBreed" type="text" placeholder="मुर्राह 100% / साहीवाल" class="w-full bg-white border border-purple-200 rounded-lg p-2 font-medium outline-none" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-purple-900 mb-0.5">संभावित प्रसव दिनांक (Exp. Calving)</label>
            <input id="aiExpectedDate" type="date" class="w-full bg-white border border-purple-200 rounded-lg p-2 font-bold outline-none" />
          </div>
        </div>
      `;
    } else if (mode === 'VACCINATION') {
      modeContainer.innerHTML = `
        <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div>
            <label class="block text-[10px] font-bold text-emerald-900 mb-0.5">टीके का नाम व बैच सं.</label>
            <input id="vaxBatchNo" type="text" placeholder="FMD / HS / BQ बैच #2026-X" class="w-full bg-white border border-emerald-200 rounded-lg p-2 font-bold outline-none" />
          </div>
          <div>
            <label class="block text-[10px] font-bold text-emerald-900 mb-0.5">बूस्टर की अगली देय तिथि</label>
            <input id="vaxNextDueDate" type="date" class="w-full bg-white border border-emerald-200 rounded-lg p-2 font-bold outline-none" />
          </div>
        </div>
      `;
    } else if (mode === 'UTERINE') {
      modeContainer.innerHTML = `
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div>
            <label class="block text-[10px] font-bold text-amber-900 mb-0.5">गर्भाशय स्राव स्थिति (Discharge Status)</label>
            <select id="uterineDischargeStatus" class="w-full bg-white border border-amber-200 rounded-lg p-2 font-medium outline-none">
              <option value="CLEAR">साफ व पारदर्शी (Clear Mucus)</option>
              <option value="CLOUDY">हल्का मटमैला (Catarrhal)</option>
              <option value="PURULENT">सफेद मवाद (Purulent / Pyometra)</option>
              <option value="FETID">तीव्र दुर्गंधयुक्त सड़न (Septic Lochia)</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-amber-900 mb-0.5">इंट्रा-यूटेरिन इन्फ्यूजन दवा</label>
            <input id="uterineMedicineInfusion" type="text" placeholder="उदा. Cephapirin (Metricure) 19g" class="w-full bg-white border border-amber-200 rounded-lg p-2 font-medium outline-none" />
          </div>
        </div>
      `;
    } else {
      modeContainer.innerHTML = '';
    }
  };

  window.captureGPSLocation = function () {
    const gpsField = document.getElementById('opdGPS');
    const btn = document.getElementById('btnGPS');

    if (!navigator.geolocation) {
      alert('आपके ब्राउज़र में GPS सुविधा उपलब्ध नहीं है।');
      return;
    }

    if (btn) btn.textContent = '⌛ GPS...';

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        currentCoordinates.lat = pos.coords.latitude;
        currentCoordinates.lon = pos.coords.longitude;
        const str = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        if (gpsField) gpsField.value = str;
        if (btn) btn.textContent = '📍 प्राप्त ✅';
        setStored(STORAGE_KEYS.DOC_LOCATION, currentCoordinates);
      },
      (err) => {
        if (btn) btn.textContent = '📍 GPS';
        alert('GPS लोकेशन प्राप्त करने में विफल: ' + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  window.calculateDue = function () {
    const total = parseFloat(document.getElementById('opdTotalFee')?.value || 0);
    const paid = parseFloat(document.getElementById('opdPaidFee')?.value || 0);
    const dueField = document.getElementById('opdDueFee');
    if (dueField) {
      dueField.value = Math.max(0, total - paid);
    }
  };

  window.clearRxField = function () {
    const rx = document.getElementById('opdMedicine');
    if (rx) rx.value = '';
  };

  /* =========================================================================
     2. WHATSAPP DISPATCH & PDF PRINT ENGINE
     ========================================================================= */

  function compileCasePayload() {
    const name = document.getElementById('opdFarmerName')?.value.trim();
    const phone = document.getElementById('opdFarmerPhone')?.value.trim();
    const village = document.getElementById('opdVillage')?.value.trim() || 'एन/ए';
    const animal = document.getElementById('opdAnimal')?.value || 'गाय';
    const tag = document.getElementById('opdTag')?.value.trim() || 'बिना टैग';
    const preg = document.getElementById('opdPregnancy')?.value || 'खाली';
    const gps = document.getElementById('opdGPS')?.value.trim() || 'उपलब्ध नहीं';
    const diag = document.getElementById('opdDiagnosis')?.value.trim();
    const rx = document.getElementById('opdMedicine')?.value.trim();
    const totalFee = document.getElementById('opdTotalFee')?.value || '0';
    const paidFee = document.getElementById('opdPaidFee')?.value || '0';
    const dueFee = document.getElementById('opdDueFee')?.value || '0';

    if (!name || !phone || !diag) {
      alert('कृपया किसान का नाम, 10-अंकीय मोबाइल नंबर और प्रोविजनल निदान दर्ज करें!');
      return null;
    }

    return {
      id: 'OPD-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString('hi-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      timestamp: Date.now(),
      mode: currentServiceMode,
      name,
      phone,
      village,
      animal,
      tag,
      preg,
      gps,
      diag,
      rx,
      totalFee,
      paidFee,
      dueFee
    };
  }

  window.dispatchWhatsAppRx = function () {
    const c = compileCasePayload();
    if (!c) return;

    window.saveOfflineCaseDirectly(c);

    let msg = `*VETCARE AI OS • डिजिटल केस पर्ची*\n`;
    msg += `----------------------------------------\n`;
    msg += `📄 *केस सं:* ${c.id} | *दिनांक:* ${c.date}\n`;
    msg += `👨‍🌾 *पशुपालक:* ${c.name} (${c.village})\n`;
    msg += `📱 *फोन:* ${c.phone}\n`;
    msg += `🐄 *मरीज पशु:* ${c.animal} (टैग: ${c.tag})\n`;
    msg += `🤰 *गर्भ स्थिति:* ${c.preg}\n`;
    msg += `🩺 *सेवा प्रकार:* ${c.mode}\n`;
    msg += `🔬 *निदान (Diagnosis):* ${c.diag}\n`;
    msg += `----------------------------------------\n`;
    msg += `💊 *उपचार व औषधि निर्देश (Rx):*\n${c.rx || 'क्लिनिकल परामर्श अनुसार'}\n`;
    msg += `----------------------------------------\n`;
    msg += `💰 *कुल फीस:* ₹${c.totalFee} | *जमा:* ₹${c.paidFee} | *बकाया:* ₹${c.dueFee}\n\n`;
    msg += `_अधिकृत पशु चिकित्सा व्यवसायी (Veterinary Practitioner) द्वारा जारी।_`;

    const cleanPhone = c.phone.replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
    const url = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  window.saveOfflineCaseDirectly = function (explicitCase) {
    const c = explicitCase || compileCasePayload();
    if (!c) return;

    const cases = getStored(STORAGE_KEYS.CASES, []);
    cases.unshift(c);
    setStored(STORAGE_KEYS.CASES, cases);
    window.renderCaseRecords();
    if (!explicitCase) alert(`केस रिकॉर्ड #${c.id} सुरक्षित कर लिया गया!`);
  };

  window.printCurrentOPDSlip = function () {
    const c = compileCasePayload();
    if (!c) return;

    const printArea = document.getElementById('printableSlipArea');
    if (!printArea) return;

    printArea.innerHTML = `
      <div style="font-family: sans-serif; padding: 20px; line-height: 1.5; color: #000;">
        <div style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          <h2 style="margin: 0; color: #1e3a8a; font-size: 20px;">VETCARE AI OS • CLINICAL OPD PRESCRIPTION</h2>
          <p style="margin: 2px 0; font-size: 11px;">अधिकृत पशु चिकित्सा व्यवसायी (Veterinary Practitioner) डिजिटल प्रिसक्रिप्शन</p>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; margin-top: 10px;">
          <div><b>पर्ची सं:</b> ${c.id}<br><b>दिनांक:</b> ${c.date}</div>
          <div><b>सेवा विधा:</b> ${c.mode}<br><b>GPS:</b> ${c.gps}</div>
        </div>
        <hr style="border: 0.5px solid #ccc; margin: 10px 0;">
        <table style="width: 100%; font-size: 11px;">
          <tr>
            <td><b>पशुपालक:</b> ${c.name}</td>
            <td><b>मोबाइल:</b> ${c.phone}</td>
            <td><b>गाँव:</b> ${c.village}</td>
          </tr>
          <tr>
            <td><b>पशु प्रकार:</b> ${c.animal}</td>
            <td><b>टैग सं:</b> ${c.tag}</td>
            <td><b>गर्भ स्थिति:</b> ${c.preg}</td>
          </tr>
        </table>
        <hr style="border: 0.5px solid #ccc; margin: 10px 0;">
        <div style="font-size: 12px; margin: 8px 0;">
          <b>क्लिनिकल निदान (Provisional Diagnosis):</b> <span style="color: #b91c1c;">${c.diag}</span>
        </div>
        <div style="font-size: 11px; margin-top: 10px;">
          <b>दवा, इंजेक्शन डोज़ व रूट (Rx Injections & Medicines):</b>
          <pre style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 8px; font-family: monospace; white-space: pre-wrap;">${c.rx || 'कोई दवा निर्दिष्ट नहीं'}</pre>
        </div>
        <div style="margin-top: 15px; font-size: 11px; display: flex; justify-content: space-between;">
          <div><b>कुल शुल्क:</b> ₹${c.totalFee} | <b>जमा:</b> ₹${c.paidFee} | <b>बकाया:</b> ₹${c.dueFee}</div>
          <div style="text-align: right; margin-top: 20px;">
            ___________________________<br>
            <b>अधिकृत हस्ताक्षर व सील</b>
          </div>
        </div>
      </div>
    `;

    window.print();
  };

  /* =========================================================================
     3. SAVED CASE RECORDS EXPLORER
     ========================================================================= */

  window.renderCaseRecords = function () {
    const list = document.getElementById('recordsList');
    const badge = document.getElementById('recordTotalBadge');
    if (!list) return;

    const cases = getStored(STORAGE_KEYS.CASES, []);
    if (badge) badge.textContent = `${cases.length} केस सुरक्षित`;

    if (cases.length === 0) {
      list.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs">अभी तक कोई केस पर्ची सुरक्षित नहीं की गई है।</div>`;
      return;
    }

    list.innerHTML = cases.map((c, i) => `
      <div class="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2 hover:shadow-xs transition">
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded font-mono">${c.id}</span>
              <h4 class="font-bold text-slate-900 text-xs sm:text-sm">${c.name} (${c.village})</h4>
            </div>
            <p class="text-[11px] text-slate-500 font-medium">${c.animal} • टैग: ${c.tag} • मो: ${c.phone}</p>
          </div>
          <span class="text-[10px] text-slate-400 font-mono">${c.date}</span>
        </div>
        <div class="text-xs text-rose-700 font-bold">निदान: ${c.diag}</div>
        <div class="text-[11px] text-slate-600 font-mono bg-slate-50 p-2 rounded-xl truncate">${c.rx || 'परामर्श'}</div>
        <div class="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px]">
          <span class="font-bold text-slate-700">फीस: ₹${c.totalFee} (बकाया: ₹${c.dueFee})</span>
          <div class="flex gap-1.5">
            <button onclick="window.resendWhatsAppCase('${c.id}')" class="text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg font-bold hover:bg-emerald-100 transition">
              💬 व्हाट्सएप
            </button>
            <button onclick="window.deleteCaseRecord(${i})" class="text-rose-600 bg-rose-50 px-2 py-1 rounded-lg font-bold hover:bg-rose-100 transition">
              हटाएं
            </button>
          </div>
        </div>
      </div>
    `).join('');
  };

  window.handleRecordSearch = function () {
    const q = (document.getElementById('searchRecordsInput')?.value || '').toLowerCase().trim();
    const cases = getStored(STORAGE_KEYS.CASES, []);
    const filtered = cases.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.village.toLowerCase().includes(q) || c.diag.toLowerCase().includes(q));

    const list = document.getElementById('recordsList');
    if (!list) return;

    if (filtered.length === 0) {
      list.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs">कोई मेल खाता केस नहीं मिला।</div>`;
      return;
    }

    list.innerHTML = filtered.map((c, i) => `
      <div class="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2">
        <div class="flex justify-between items-center">
          <strong class="text-xs text-slate-900">${c.name} (${c.village})</strong>
          <span class="text-[10px] text-slate-400">${c.date}</span>
        </div>
        <div class="text-xs text-rose-700 font-bold">निदान: ${c.diag}</div>
      </div>
    `).join('');
  };

  window.deleteCaseRecord = function (index) {
    const cases = getStored(STORAGE_KEYS.CASES, []);
    cases.splice(index, 1);
    setStored(STORAGE_KEYS.CASES, cases);
    window.renderCaseRecords();
  };

  window.resendWhatsAppCase = function (caseId) {
    const cases = getStored(STORAGE_KEYS.CASES, []);
    const c = cases.find(x => x.id === caseId);
    if (!c) return;

    let msg = `*VETCARE AI OS • डिजिटल पर्ची डुप्लीकेट*\nकेस #${c.id} | ${c.date}\nमरीज: ${c.animal} (टैग: ${c.tag})\nकिसान: ${c.name}\nनिदान: ${c.diag}\nउपचार:\n${c.rx}`;
    const cleanPhone = c.phone.replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
    window.open(`https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(msg)}`, '_blank');
  };

  /* =========================================================================
     4. 20-KM GPS DOCTOR-FARMER MATCHING & GOOGLE MAPS NAVIGATION
     ========================================================================= */

  function haversineDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  // Farmer initiates emergency call (Doctor phone number strictly hidden from farmer)
  window.requestDoctorEmergencyVisit = function () {
    if (!navigator.geolocation) {
      alert('लोकेशन सक्षम नहीं है।');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const farmerLat = pos.coords.latitude;
        const farmerLon = pos.coords.longitude;
        const farmerName = prompt('कृपया अपना नाम दर्ज करें:');
        const farmerPhone = prompt('कृपया अपना 10-अंकीय मोबाइल नंबर दर्ज करें:');
        const animalProblem = prompt('पशु की मुख्य समस्या क्या है? (उदा. गलघोंटू, जेर रुकना, ब्याने में दिक्कत)');

        if (!farmerName || !farmerPhone) return;

        const requests = getStored(STORAGE_KEYS.GPS_REQUESTS, []);
        const newReq = {
          id: 'REQ-' + Date.now().toString().slice(-5),
          time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
          farmerName,
          farmerPhone,
          problem: animalProblem || 'आपातकालीन क्लिनिकल जांच',
          farmerLat,
          farmerLon,
          status: 'PENDING'
        };

        requests.unshift(newReq);
        setStored(STORAGE_KEYS.GPS_REQUESTS, requests);

        alert('✅ आपका अनुरोध 20-किमी दायरे में उपस्थित अधिकृत पशु चिकित्सकों को भेज दिया गया है!\nडॉक्टर की सुरक्षा व व्यस्तता के कारण डॉक्टर का व्यक्तिगत नंबर गोपनीय रखा गया है। डॉक्टर स्वयं आपसे संपर्क करेंगे।');
      },
      (err) => {
        alert('GPS समस्या: ' + err.message);
      }
    );
  };

  // Render incoming requests on Doctor Dashboard
  window.renderDoctorGPSDashboard = function (containerId) {
    const target = document.getElementById(containerId || 'viewDiagnosis');
    if (!target) return;

    let gpsBox = document.getElementById('doctorGPSRequestsBox');
    if (!gpsBox) {
      gpsBox = document.createElement('div');
      gpsBox.id = 'doctorGPSRequestsBox';
      gpsBox.className = 'bg-white border-2 border-indigo-100 rounded-3xl p-5 shadow-xs space-y-3.5';
      target.insertBefore(gpsBox, target.firstChild);
    }

    const docGps = getStored(STORAGE_KEYS.DOC_LOCATION, { lat: 28.6139, lon: 77.2090 });
    const requests = getStored(STORAGE_KEYS.GPS_REQUESTS, []);

    // Filter requests within 20 km
    const nearbyRequests = requests.map(req => {
      const dist = haversineDistanceKm(docGps.lat, docGps.lon, req.farmerLat, req.farmerLon);
      return { ...req, distanceKm: dist };
    }).filter(req => req.distanceKm <= 20 || isNaN(req.distanceKm));

    gpsBox.innerHTML = `
      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
          <h3 class="text-sm font-bold text-slate-900">
            📍 20-किमी GPS लाइव किसान कॉल व नेविगेशन
          </h3>
        </div>
        <span class="text-xs bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-xl border border-indigo-200">
          ${nearbyRequests.length} सक्रिय कॉल
        </span>
      </div>

      <div class="space-y-2.5">
        ${nearbyRequests.length === 0 ? `
          <div class="p-4 text-center text-slate-400 text-xs">
            20 किमी दायरे में कोई लंबित आपातकालीन किसान कॉल नहीं है।
          </div>
        ` : nearbyRequests.map(r => `
          <div class="bg-indigo-50/40 border border-indigo-200 rounded-2xl p-3.5 space-y-2">
            <div class="flex items-start justify-between">
              <div>
                <strong class="text-xs text-indigo-950">${r.farmerName}</strong>
                <span class="block text-[11px] text-slate-500 font-medium">मो: ${r.farmerPhone} • समय: ${r.time}</span>
              </div>
              <span class="text-xs font-black px-2 py-0.5 rounded-lg bg-indigo-600 text-white shadow-xs">
                ${r.distanceKm} किमी दूर
              </span>
            </div>

            <p class="text-xs text-rose-700 font-bold bg-white p-2 rounded-xl border border-indigo-100">
              🚨 समस्या: ${r.problem}
            </p>

            <div class="flex gap-2 pt-1 text-xs">
              <!-- Direct Google Maps Navigation Trigger -->
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=${r.farmerLat},${r.farmerLon}" 
                target="_blank" 
                class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-center shadow-xs transition flex items-center justify-center gap-1.5"
              >
                <span>🗺️ गूगल मैप्स नेविगेशन शुरू करें</span>
              </a>
              <a 
                href="tel:${r.farmerPhone}" 
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-center transition flex items-center justify-center gap-1"
              >
                <span>📞 कॉल</span>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  };

  // Safe Lifecycle Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.renderCaseRecords();
      window.setClinicalServiceMode('OPD');
    });
  } else {
    window.renderCaseRecords();
    window.setClinicalServiceMode('OPD');
  }

})(window, document);
