// Vetcare AI OS - Dairy Farmer Hub & Digital Pashu Passbook (2026 Production)
(function (window, document) {
  "use strict";

  // Root Namespace Guard
  window.VetcareApp = window.VetcareApp || {};
  const App = window.VetcareApp;

  // Persistent / In-Memory Farmer State
  const State = {
    profile: {
      name: "चौधरी कुलदीप सिंह",
      phone: "9812098231",
      village: "ढांड, जिला कैथल (हरियाणा)",
      pashuAadhaarNo: "PA-KA-2026-8812",
      totalAnimals: 6,
      membershipTier: "पशुपालक प्रो (सक्रिय)"
    },
    animals: [
      {
        tag: "IN-309182",
        name: "गंगा (Murrah भैंस)",
        species: "भैंस",
        breed: "मुर्रा (Pure Murrah)",
        age: "5.5 वर्ष",
        lactation: "तीसरा ब्यात (2.5 माह)",
        dailyYield: "16.5 लीटर",
        aiDate: "2025-12-10",
        pregnancyStatus: "गर्भवती (पुष्ट)",
        daysPregnant: 109,
        vaccination: "FMD (खुरपका-मुंहपका): 15-Nov-2025",
        deworming: "Albendazole: 02-Jan-2026"
      },
      {
        tag: "IN-309183",
        name: "यमुना (HF Cross गाय)",
        species: "गाय",
        breed: "एचएफ संकर (HF Cross)",
        age: "4 वर्ष",
        lactation: "दूसरा ब्यात (5 माह)",
        dailyYield: "21.0 लीटर",
        aiDate: "2026-02-14",
        pregnancyStatus: "जांच प्रतीक्षारत (60 दिन शेष)",
        daysPregnant: 43,
        vaccination: "HS+BQ: 10-Oct-2025",
        deworming: "Fenbendazole: 12-Feb-2026"
      },
      {
        tag: "IN-309184",
        name: "कावेरी (Sahiwal गाय)",
        species: "गाय",
        breed: "साहीवाल (Desi Sahiwal)",
        age: "3 वर्ष",
        lactation: "प्रथम ब्यात",
        dailyYield: "11.0 लीटर",
        aiDate: "2026-03-01",
        pregnancyStatus: "मद चक्र (Heat Cycle निगरानी)",
        daysPregnant: 28,
        vaccination: "FMD: 15-Nov-2025",
        deworming: "Ivermectin: 20-Dec-2025"
      }
    ],
    remedies: [
      {
        id: "mastitis",
        title: "थनैला रोग (Mastitis) का रामबाण लेप",
        tag: "100% अनुभूत देशी नुस्खा",
        icon: "fa-leaf",
        color: "emerald",
        ingredients: [
          "घृतकुमारी (एलोवेरा) ताजा गूदा - 250 ग्राम",
          "हल्दी चूर्ण (शुद्ध पिसी) - 50 ग्राम",
          "कली का चूना (खाने वाला) - 15 ग्राम"
        ],
        prep: "तीनों को मिक्सी या कुंडी में पीसकर लाल रंग का मल्हम/पेस्ट तैयार करें।",
        usage: "संक्रमित थन का सारा खराब दूध दुहकर बाहर निकालें। फिर यह लेप थन और अयन (Leva) पर दिन में 3 से 4 बार अच्छी तरह लगाएं। लगातार 5 दिन प्रयोग करें।"
      },
      {
        id: "bloat",
        title: "आफरा व गैस (Bloat / Tympany) का तत्काल उपचार",
        tag: "आपातकालीन घरेलू नुस्खा",
        icon: "fa-wind",
        color: "amber",
        ingredients: [
          "तारपीन का तेल (Pure Turpentine Oil) - 50 से 60 मिली",
          "सरसों का शुद्ध तेल (मीठा तेल) - 500 मिली",
          "हींग (बारीक पिसी) - 10 ग्राम"
        ],
        prep: "सरसों के तेल को हल्का गुनगुना करके उसमें हींग और तारपीन का तेल अच्छी तरह घोलें।",
        usage: "पशु का मुंह ऊपर करके नाल (बांस की नली या बोतल) द्वारा धीरे-धीरे पिलाएं। पशु की जीभ न पकड़ें ताकि दवा सांस की नली में न जाए। पेट के बाएं हिस्से की मालिश करें।"
      },
      {
        id: "diarrhea",
        title: "दस्त व पेचिश (Calf & Adult Diarrhea) रोधी काढ़ा",
        tag: "पाचन सुधारक",
        icon: "fa-shield-halved",
        color: "sky",
        ingredients: [
          "मेथी दाना - 100 ग्राम (तवे पर हल्का भून लें)",
          "चाय पत्ती - 50 ग्राम",
          "काला नमक - 25 ग्राम",
          "चावल का गाढ़ा मांड (Congee water) - 1 लीटर"
        ],
        prep: "मेथी दाना व चाय पत्ती को 1 लीटर पानी में उबालकर आधा कर लें। फिर इसमें मांड व काला नमक मिलाएं।",
        usage: "दिन में दो बार सुबह-शाम 2 दिन तक नाल से पिलाएं। छोटे बछड़ों को मात्रा आधी (500 ml) दें।"
      },
      {
        id: "wounds",
        title: "कीड़े वाले घाव व खुरपका छालों का मल्हम",
        tag: "एंटीसेप्टिक व फ्लाई रेपेलेंट",
        icon: "fa-bandage",
        color: "rose",
        ingredients: [
          "कपूर की टिकिया - 10 ग्राम",
          "नीम का तेल - 100 मिली",
          "शरीफा (सीताफल) के पत्तों का रस - 50 मिली"
        ],
        prep: "कपूर को पीसकर नीम के तेल और शरीफे के पत्तों के रस में अच्छी तरह मिला लें।",
        usage: "घाव को पोटैशियम परमैंगनेट (लाल दवा) से धोकर यह तेल रुई से घाव में भरें। कीड़े 2 घंटे में मरकर बाहर गिर जाएंगे और मक्खियां नहीं बैठेंगी।"
      }
    ]
  };

  /**
   * Helper: Dispatch UI Notifications
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
      console.error("[FarmerPortal] Mount container not found:", containerSelector);
      return;
    }

    const currentProfile = (App.Session && App.Session.user)
      ? Object.assign({}, State.profile, { name: App.Session.user.name })
      : State.profile;

    targetEl.innerHTML = `
      <div id="farmerPortalContainer" class="space-y-6 animate-fadeIn pb-12 select-none">

        <!-- ====================================================================
             1. FARMER PROFILE HEADER & LIVESTOCK SUMMARY
             ==================================================================== -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-clinical flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 text-white flex items-center justify-center text-2xl shadow-md shadow-emerald-600/20 flex-shrink-0">
              <i class="fa-solid fa-cow"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h1 class="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight text-contrast">
                  ${currentProfile.name}
                </h1>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ${currentProfile.membershipTier}
                </span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-300">
                  <i class="fa-solid fa-id-card mr-1"></i>${currentProfile.pashuAadhaarNo}
                </span>
              </div>
              <p class="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5">
                <i class="fa-solid fa-location-dot text-rose-500"></i>
                <span>${currentProfile.village}</span>
              </p>
            </div>
          </div>

          <!-- Quick Telemetry & Logout -->
          <div class="flex items-center gap-2.5 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <div class="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-900">
              <i class="fa-solid fa-paw text-emerald-600"></i>
              <span>पंजीकृत पशु:</span>
              <span class="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-lg text-sm font-black">
                ${State.animals.length}
              </span>
            </div>
            <button type="button" id="btnFarmerPortalLogout" class="px-3.5 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <span>लॉगआउट</span>
            </button>
          </div>
        </div>

        <!-- ====================================================================
             2. FARMER TOOLS SUITE (ACCESSIBLE, LARGE-TOUCH GRID)
             ==================================================================== -->
        <div>
          <div class="flex items-center justify-between mb-3 px-1">
            <h2 class="font-display font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-boxes-stacked text-emerald-600"></i>
              <span>स्मार्ट डेयरी किसान सेवा केंद्र (Smart Dairy Hub)</span>
            </h2>
            <span class="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              सरल ग्रामीण इंटरफ़ेस
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            
            <!-- Tool 1: Pashu Aadhaar Passbook -->
            <button type="button" id="btnToolPassbook" class="p-4 rounded-3xl bg-white border-2 border-emerald-100 hover:border-emerald-500 shadow-clinical hover:shadow-elevated flex flex-col items-center text-center group transition-all transform active:scale-95 text-slate-800">
              <div class="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-2.5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                <i class="fa-solid fa-address-book"></i>
              </div>
              <span class="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 leading-tight">पशु आधार पासबुक</span>
              <span class="text-[10px] text-slate-400 font-mono mt-1 font-semibold">टैग व नस्ल रिकॉर्ड</span>
            </button>

            <!-- Tool 2: Milk Fat/SNF Ledger -->
            <button type="button" id="btnToolMilkCalc" class="p-4 rounded-3xl bg-white border-2 border-sky-100 hover:border-sky-500 shadow-clinical hover:shadow-elevated flex flex-col items-center text-center group transition-all transform active:scale-95 text-slate-800">
              <div class="w-13 h-13 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-2xl mb-2.5 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
                <i class="fa-solid fa-bucket"></i>
              </div>
              <span class="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-700 leading-tight">दुग्ध खाता बही</span>
              <span class="text-[10px] text-slate-400 font-mono mt-1 font-semibold">FAT, SNF व ₹ रेट</span>
            </button>

            <!-- Tool 3: Desi Nuskhe -->
            <button type="button" id="btnToolRemedies" class="p-4 rounded-3xl bg-white border-2 border-amber-100 hover:border-amber-500 shadow-clinical hover:shadow-elevated flex flex-col items-center text-center group transition-all transform active:scale-95 text-slate-800">
              <div class="w-13 h-13 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-2.5 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                <i class="fa-solid fa-mortar-pestle"></i>
              </div>
              <span class="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 leading-tight">100% देशी नुस्खे</span>
              <span class="text-[10px] text-slate-400 font-mono mt-1 font-semibold">आयुर्वेदिक उपचार</span>
            </button>

            <!-- Tool 4: Heat & Pregnancy Tracker -->
            <button type="button" id="btnToolPregnancy" class="p-4 rounded-3xl bg-white border-2 border-purple-100 hover:border-purple-500 shadow-clinical hover:shadow-elevated flex flex-col items-center text-center group transition-all transform active:scale-95 text-slate-800">
              <div class="w-13 h-13 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl mb-2.5 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                <i class="fa-solid fa-calendar-check"></i>
              </div>
              <span class="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-purple-700 leading-tight">गर्भधारण ट्रैकर</span>
              <span class="text-[10px] text-slate-400 font-mono mt-1 font-semibold">280 दिन उलटी गिनती</span>
            </button>

            <!-- Tool 5: Ration Balancer -->
            <button type="button" id="btnToolFeedRation" class="p-4 rounded-3xl bg-white border-2 border-teal-100 hover:border-teal-500 shadow-clinical hover:shadow-elevated flex flex-col items-center text-center group transition-all transform active:scale-95 text-slate-800">
              <div class="w-13 h-13 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-2xl mb-2.5 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-sm">
                <i class="fa-solid fa-scale-balanced"></i>
              </div>
              <span class="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-700 leading-tight">चारा संतुलन कैलकुलेटर</span>
              <span class="text-[10px] text-slate-400 font-mono mt-1 font-semibold">दूध बढ़ाने वाला राशन</span>
            </button>

            <!-- Tool 6: Emergency Doctor SOS -->
            <button type="button" id="btnToolEmergencySos" class="p-4 rounded-3xl bg-white border-2 border-rose-200 hover:border-rose-600 shadow-clinical hover:shadow-elevated flex flex-col items-center text-center group transition-all transform active:scale-95 text-slate-800 animate-pulse">
              <div class="w-13 h-13 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl mb-2.5 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                <i class="fa-solid fa-phone-volume"></i>
              </div>
              <span class="text-xs sm:text-sm font-black text-rose-600 leading-tight">आपातकालीन डॉक्टर</span>
              <span class="text-[10px] text-rose-500 font-mono mt-1 font-black">SOS डायल 1962</span>
            </button>

          </div>
        </div>

        <!-- ====================================================================
             3. LIVESTOCK CARDS FEED (INTERACTIVE PASHU CARDS)
             ==================================================================== -->
        <div class="space-y-4">
          <div class="flex items-center justify-between px-1">
            <h3 class="font-display font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-list-ul text-sky-600"></i>
              <span>मेरे दुधारू पशु एवं दैनिक स्वास्थ्य स्थिति (My Livestock)</span>
            </h3>
            <button type="button" id="btnAddNewAnimalAction" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all">
              <i class="fa-solid fa-plus"></i> नया पशु जोड़ें
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            ${State.animals.map((animal, idx) => `
              <div class="p-5 rounded-3xl bg-white border-2 border-slate-100 hover:border-emerald-300 shadow-clinical transition-all flex flex-col justify-between">
                <div>
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <h4 class="font-display font-black text-base text-slate-900">${animal.name}</h4>
                      <div class="text-[11px] font-mono text-emerald-700 font-bold mt-0.5">टैग: ${animal.tag}</div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-black ${animal.pregnancyStatus.includes('पुष्ट') ? 'bg-purple-100 text-purple-900 border border-purple-200' : 'bg-slate-100 text-slate-700'}">
                      ${animal.species}
                    </span>
                  </div>

                  <div class="space-y-2 text-xs text-slate-600 mb-4">
                    <div class="flex justify-between border-b border-slate-50 pb-1">
                      <span class="text-slate-400">नस्ल (Breed):</span>
                      <strong class="text-slate-800">${animal.breed}</strong>
                    </div>
                    <div class="flex justify-between border-b border-slate-50 pb-1">
                      <span class="text-slate-400">उम्र व ब्यात:</span>
                      <strong class="text-slate-800">${animal.age} • ${animal.lactation}</strong>
                    </div>
                    <div class="flex justify-between border-b border-slate-50 pb-1">
                      <span class="text-slate-400">दैनिक दुग्ध उत्पादन:</span>
                      <strong class="text-emerald-700 text-sm font-black">${animal.dailyYield}</strong>
                    </div>
                    <div class="flex justify-between border-b border-slate-50 pb-1">
                      <span class="text-slate-400">गर्भधारण स्थिति:</span>
                      <strong class="${animal.pregnancyStatus.includes('पुष्ट') ? 'text-purple-700 font-bold' : 'text-slate-700'}">${animal.pregnancyStatus}</strong>
                    </div>
                  </div>

                  <div class="p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] space-y-1 font-mono text-slate-500">
                    <div>💉 ${animal.vaccination}</div>
                    <div>💊 ${animal.deworming}</div>
                  </div>
                </div>

                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button type="button" class="btn-open-animal-passbook flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors" data-animal-index="${idx}">
                    पासबुक देखें
                  </button>
                  <button type="button" class="btn-quick-milk-entry px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors" data-animal-index="${idx}">
                    दूध दर्ज करें
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>

      <!-- ====================================================================
           MODAL PORTAL FOR FARMER WORKSPACE SUB-TOOLS
           ==================================================================== -->
      <div id="farmerModalPortal" class="relative z-50"></div>
    `;

    // Bind All Event Handlers
    bindFarmerEvents();
  }

  /**
   * Tool 1: Pashu Aadhaar Passbook Modal
   */
  function openPassbookModal(animalIndex = 0) {
    const animal = State.animals[animalIndex] || State.animals[0];
    const modalRoot = document.getElementById("farmerModalPortal");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div class="bg-white border-2 border-emerald-300 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-elevated relative my-auto max-h-[92vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-address-card"></i>
              </div>
              <div>
                <h3 class="font-display font-black text-base text-slate-900">डिजिटल पशु स्वास्थ्य पासबुक</h3>
                <div class="text-[10px] font-mono text-slate-500">GOVT. OF INDIA INAPH / PASHU AADHAAR COMPLIANT</div>
              </div>
            </div>
            <button type="button" id="btnClosePassbookModal" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <!-- Pashu Identity Card -->
          <div class="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-xs mb-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <div class="text-lg font-display font-black text-slate-900">${animal.name}</div>
                <div class="font-mono text-emerald-800 font-bold">ईयर टैग: ${animal.tag}</div>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white text-emerald-800 border border-emerald-300 shadow-sm">
                VERIFIED BREED
              </span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 pt-2 border-t border-emerald-200/60 font-medium text-slate-700">
              <div>नस्ल: <strong>${animal.breed}</strong></div>
              <div>उम्र: <strong>${animal.age}</strong></div>
              <div>वर्तमान ब्यात: <strong>${animal.lactation}</strong></div>
            </div>
          </div>

          <!-- History Timeline -->
          <div class="space-y-3 text-xs">
            <h4 class="font-bold text-slate-800 flex items-center gap-1.5">
              <i class="fa-solid fa-shield-virus text-emerald-600"></i>
              <span>टीकाकरण व कृमिनाशक (Vaccination & Deworming History)</span>
            </h4>

            <div class="border border-slate-200 rounded-2xl overflow-hidden">
              <table class="w-full text-left border-collapse text-xs">
                <thead class="bg-slate-100 text-slate-600 font-mono text-[10px] uppercase">
                  <tr>
                    <th class="p-2.5">दिनांक</th>
                    <th class="p-2.5">वैक्सीन / दवा का नाम</th>
                    <th class="p-2.5">स्थिति</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr>
                    <td class="p-2 font-mono">15-Nov-2025</td>
                    <td class="p-2 font-bold text-slate-900">FMD (खुरपका-मुंहपका) वैक्सीन</td>
                    <td class="p-2 text-emerald-700 font-bold"><i class="fa-solid fa-circle-check mr-1"></i>प्रमाणित</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-mono">10-Oct-2025</td>
                    <td class="p-2 font-bold text-slate-900">HS + BQ (गलघोंटू व लंगड़ा बुखार)</td>
                    <td class="p-2 text-emerald-700 font-bold"><i class="fa-solid fa-circle-check mr-1"></i>प्रमाणित</td>
                  </tr>
                  <tr>
                    <td class="p-2 font-mono">02-Jan-2026</td>
                    <td class="p-2 font-bold text-slate-900">Albendazole बोलस (पेट के कीड़े)</td>
                    <td class="p-2 text-sky-700 font-bold"><i class="fa-solid fa-check mr-1"></i>सफल</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-5 pt-3 border-t border-slate-100 flex justify-between items-center">
            <span class="text-[10px] font-mono text-slate-400">Digital Record ID: VET-PASS-9041</span>
            <button type="button" id="btnPrintPassbookRecord" class="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm flex items-center gap-1.5">
              <i class="fa-solid fa-print"></i>
              <span>पासबुक प्रिंट करें</span>
            </button>
          </div>

        </div>
      </div>
    `;

    document.getElementById("btnClosePassbookModal")?.addEventListener("click", () => modalRoot.innerHTML = "");
    document.getElementById("btnPrintPassbookRecord")?.addEventListener("click", () => window.print());
  }

  /**
   * Tool 2: Milk Fat & SNF Ledger with ₹ Payout Calculator Modal
   */
  function openMilkLedgerModal() {
    const modalRoot = document.getElementById("farmerModalPortal");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div class="bg-white border-2 border-sky-300 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-elevated relative my-auto">
          
          <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-calculator"></i>
              </div>
              <div>
                <h3 class="font-display font-black text-base text-slate-900">दैनिक दुग्ध, फैट व एसएनएफ खाता बही</h3>
                <div class="text-[10px] font-mono text-slate-500">LIVE COOPERATIVE DAIRY RATE CALCULATION</div>
              </div>
            </div>
            <button type="button" id="btnCloseMilkModal" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">दूध का समय</label>
                <select id="milkShift" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900">
                  <option value="morning">सुबह (Morning Shift)</option>
                  <option value="evening">शाम (Evening Shift)</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">दूध की मात्रा (लीटर)</label>
                <input type="number" step="0.5" id="milkQuantity" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900" value="18.5" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">फैट प्रतिशत (FAT %)</label>
                <input type="number" step="0.1" id="milkFat" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900" value="6.8" />
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">एसएनएफ प्रतिशत (SNF %)</label>
                <input type="number" step="0.1" id="milkSnf" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900" value="9.0" />
              </div>
            </div>

            <!-- Real-Time Estimated Rate & Total Payout -->
            <div class="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 space-y-2">
              <div class="flex justify-between items-center text-xs">
                <span class="text-slate-600 font-medium">परिकलित दर प्रति लीटर (Rate / Ltr):</span>
                <strong id="milkCalculatedRate" class="font-mono text-base font-black text-sky-900">₹ 53.60</strong>
              </div>
              <div class="flex justify-between items-center pt-2 border-t border-sky-200/80">
                <span class="text-slate-800 font-bold">अनुमानित कुल भुगतान (Total Payout):</span>
                <strong id="milkCalculatedTotal" class="text-2xl font-display font-black text-emerald-700">₹ 991.60</strong>
              </div>
            </div>
          </div>

          <div class="mt-5 pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button type="button" id="btnSaveMilkLedgerEntry" class="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5">
              <i class="fa-solid fa-check"></i>
              <span>खाता बही में दर्ज करें</span>
            </button>
          </div>

        </div>
      </div>
    `;

    function updateMilkPayout() {
      const qty = parseFloat(document.getElementById("milkQuantity")?.value || 0);
      const fat = parseFloat(document.getElementById("milkFat")?.value || 0);
      const snf = parseFloat(document.getElementById("milkSnf")?.value || 0);

      // Cooperative Formula Standard: Rate = (Fat * 6.5) + (SNF * 1.0) approx
      const ratePerLtr = (fat * 6.8) + (snf * 0.8);
      const totalPayout = qty * ratePerLtr;

      const rateDisp = document.getElementById("milkCalculatedRate");
      const totalDisp = document.getElementById("milkCalculatedTotal");

      if (rateDisp) rateDisp.textContent = `₹ ${ratePerLtr.toFixed(2)}`;
      if (totalDisp) totalDisp.textContent = `₹ ${totalPayout.toFixed(2)}`;
    }

    document.getElementById("milkQuantity")?.addEventListener("input", updateMilkPayout);
    document.getElementById("milkFat")?.addEventListener("input", updateMilkPayout);
    document.getElementById("milkSnf")?.addEventListener("input", updateMilkPayout);

    document.getElementById("btnCloseMilkModal")?.addEventListener("click", () => modalRoot.innerHTML = "");
    document.getElementById("btnSaveMilkLedgerEntry")?.addEventListener("click", () => {
      notify("दुग्ध पर्ची सफलतापूर्वक दर्ज की गई!", "success");
      modalRoot.innerHTML = "";
    });
  }

  /**
   * Tool 3: Ethno-Veterinary Desi Nuskhe Modal
   */
  function openRemediesModal() {
    const modalRoot = document.getElementById("farmerModalPortal");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div class="bg-white border-2 border-amber-300 rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-elevated relative my-auto max-h-[92vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-mortar-pestle"></i>
              </div>
              <div>
                <h3 class="font-display font-black text-base text-slate-900">100% सुरक्षित पारंपरिक आयुर्वेदिक देशी नुस्खे</h3>
                <div class="text-[10px] font-mono text-slate-500">ETHNO-VETERINARY MEDICINE (NDDB & TANUVAS VERIFIED)</div>
              </div>
            </div>
            <button type="button" id="btnCloseRemediesModal" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            ${State.remedies.map((remedy, i) => `
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-colors">
                <div class="flex items-start justify-between gap-2 mb-2">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">${i + 1}</span>
                    <h4 class="font-display font-bold text-sm text-slate-900">${remedy.title}</h4>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800">${remedy.tag}</span>
                </div>

                <div class="mb-2">
                  <div class="text-[11px] font-semibold text-slate-500 mb-1">आवश्यक घरेलू सामग्री:</div>
                  <ul class="space-y-0.5 text-slate-700 pl-3">
                    ${remedy.ingredients.map(item => `<li>• ${item}</li>`).join("")}
                  </ul>
                </div>

                <div class="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 mb-2">
                  <strong>बनाने की विधि:</strong> ${remedy.prep}
                </div>

                <div class="p-2.5 rounded-xl bg-amber-50 text-amber-950 border border-amber-200 font-medium">
                  <strong>प्रयोग विधि:</strong> ${remedy.usage}
                </div>
              </div>
            `).join("")}
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button type="button" id="btnCloseRemediesBottom" class="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm">
              बंद करें
            </button>
          </div>

        </div>
      </div>
    `;

    document.getElementById("btnCloseRemediesModal")?.addEventListener("click", () => modalRoot.innerHTML = "");
    document.getElementById("btnCloseRemediesBottom")?.addEventListener("click", () => modalRoot.innerHTML = "");
  }

  /**
   * Tool 4: Heat Cycle & 280-Day Pregnancy Tracker Modal
   */
  function openPregnancyTrackerModal() {
    const modalRoot = document.getElementById("farmerModalPortal");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div class="bg-white border-2 border-purple-300 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-elevated relative my-auto">
          
          <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <div>
                <h3 class="font-display font-black text-base text-slate-900">मद व 280-दिवसीय गर्भधारण ट्रैकर</h3>
                <div class="text-[10px] font-mono text-slate-500">BOVINE 280-DAY GESTATION COUNTDOWN</div>
              </div>
            </div>
            <button type="button" id="btnClosePregnancyModal" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">कृत्रिम गर्भाधान (AI) अथवा पाल की तिथि चुनें</label>
              <input type="date" id="inputAiDate" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900" value="2025-12-10" />
            </div>

            <!-- Visual Timeline Calculation -->
            <div class="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3">
              <div>
                <div class="flex justify-between items-center text-xs font-bold text-purple-900 mb-1">
                  <span>गर्भधारण प्रगति (Progress):</span>
                  <span id="trackerProgressPercent">38.9% (109 / 280 दिन)</span>
                </div>
                <div class="w-full h-3 bg-purple-200 rounded-full overflow-hidden">
                  <div id="trackerProgressBar" class="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all" style="width: 38.9%;"></div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-purple-200/60 font-medium">
                <div>
                  <span class="text-slate-500 block">21-दिन मद दोहराव:</span>
                  <strong id="trackerHeatDate" class="text-slate-800">31-Dec-2025 (सफल)</strong>
                </div>
                <div>
                  <span class="text-slate-500 block">60-दिन गर्भ जांच (PD):</span>
                  <strong id="trackerPdDate" class="text-emerald-700">08-Feb-2026 (पुष्ट)</strong>
                </div>
              </div>

              <div class="p-3 bg-white rounded-xl border border-purple-200 flex justify-between items-center">
                <div>
                  <span class="text-[10px] text-slate-500 block font-mono uppercase">संभावित प्रसव तिथि (Delivery Due Date):</span>
                  <strong id="trackerDeliveryDueDate" class="text-sm font-display font-black text-purple-900">16-September-2026</strong>
                </div>
                <span id="trackerDaysLeft" class="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 font-mono font-black text-xs">
                  171 दिन शेष
                </span>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button type="button" id="btnSaveAiDate" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm">
              अलर्ट शेड्यूल करें
            </button>
          </div>

        </div>
      </div>
    `;

    function updateGestationTimeline() {
      const dateVal = document.getElementById("inputAiDate")?.value;
      if (!dateVal) return;

      const aiDate = new Date(dateVal);
      const today = new Date();
      const diffTime = Math.abs(today - aiDate);
      const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const totalGestation = 280;
      const daysLeft = Math.max(0, totalGestation - daysPassed);
      const percent = Math.min(100, ((daysPassed / totalGestation) * 100)).toFixed(1);

      const edd = new Date(aiDate);
      edd.setDate(edd.getDate() + totalGestation);

      const bar = document.getElementById("trackerProgressBar");
      const text = document.getElementById("trackerProgressPercent");
      const due = document.getElementById("trackerDeliveryDueDate");
      const left = document.getElementById("trackerDaysLeft");

      if (bar) bar.style.width = `${percent}%`;
      if (text) text.textContent = `${percent}% (${daysPassed} / 280 दिन)`;
      if (due) due.textContent = edd.toLocaleDateString("hi-IN", { day: 'numeric', month: 'long', year: 'numeric' });
      if (left) left.textContent = `${daysLeft} दिन शेष`;
    }

    document.getElementById("inputAiDate")?.addEventListener("change", updateGestationTimeline);
    document.getElementById("btnClosePregnancyModal")?.addEventListener("click", () => modalRoot.innerHTML = "");
    document.getElementById("btnSaveAiDate")?.addEventListener("click", () => {
      notify("गर्भधारण चक्र अलर्ट सफलतापूर्वक सेट किए गए!", "success");
      modalRoot.innerHTML = "";
    });
  }

  /**
   * Tool 5: Ration Balancer Modal
   */
  function openRationModal() {
    const modalRoot = document.getElementById("farmerModalPortal");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div class="bg-white border-2 border-teal-300 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-elevated relative my-auto">
          
          <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl font-bold">
                <i class="fa-solid fa-scale-balanced"></i>
              </div>
              <div>
                <h3 class="font-display font-black text-base text-slate-900">दैनिक चारा व पोषण संतुलन कैलकुलेटर</h3>
                <div class="text-[10px] font-mono text-slate-500">PRECISION DAIRY FEED RATION BALANCER</div>
              </div>
            </div>
            <button type="button" id="btnCloseRationModal" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">पशु का भार (कि.ग्रा.)</label>
                <input type="number" id="rationBodyWeight" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900" value="450" />
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">दैनिक दूध उत्पादन (लीटर)</label>
                <input type="number" id="rationMilkYield" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-slate-900" value="15" />
              </div>
            </div>

            <!-- Balanced Ration Plan Output -->
            <div class="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2.5">
              <h4 class="font-bold text-teal-950 flex items-center gap-1.5">
                <i class="fa-solid fa-seedling text-teal-600"></i>
                <span>अनुशंसित 24-घंटे का संतुलित आहार (Balanced Daily Ration):</span>
              </h4>

              <div class="space-y-1.5 text-slate-700">
                <div class="flex justify-between p-2 rounded-xl bg-white border border-teal-100">
                  <span>हरा चारा (बरसीम / मक्का / ज्वार):</span>
                  <strong id="rationGreenFodder" class="font-mono text-teal-900">22.5 कि.ग्रा.</strong>
                </div>
                <div class="flex justify-between p-2 rounded-xl bg-white border border-teal-100">
                  <span>सूखा चारा (गेहूं का भूसा / कड़बी):</span>
                  <strong id="rationDryFodder" class="font-mono text-teal-900">5.0 कि.ग्रा.</strong>
                </div>
                <div class="flex justify-between p-2 rounded-xl bg-white border border-teal-100">
                  <span>पशु आहार (दाना / खली / चोकर मिश्रण):</span>
                  <strong id="rationConcentrate" class="font-mono text-emerald-700 font-bold">6.5 कि.ग्रा.</strong>
                </div>
                <div class="flex justify-between p-2 rounded-xl bg-white border border-teal-100">
                  <span>गुणवत्तापूर्ण मिनरल मिक्सचर (खनिज लवण):</span>
                  <strong class="font-mono text-purple-700 font-bold">80 ग्राम</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button type="button" id="btnCloseRationBottom" class="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm">
              समझ लिया व बंद करें
            </button>
          </div>

        </div>
      </div>
    `;

    function updateRationPlan() {
      const bw = parseFloat(document.getElementById("rationBodyWeight")?.value || 450);
      const yieldLtr = parseFloat(document.getElementById("rationMilkYield")?.value || 15);

      // Green Fodder: ~ 5% of body weight
      const green = (bw * 0.05).toFixed(1);
      // Dry Fodder: ~ 1.1% of body weight
      const dry = (bw * 0.011).toFixed(1);
      // Concentrate: Maintenance 1.5 kg + 350g per liter milk
      const conc = (1.5 + (yieldLtr * 0.35)).toFixed(1);

      const elG = document.getElementById("rationGreenFodder");
      const elD = document.getElementById("rationDryFodder");
      const elC = document.getElementById("rationConcentrate");

      if (elG) elG.textContent = `${green} कि.ग्रा.`;
      if (elD) elD.textContent = `${dry} कि.ग्रा.`;
      if (elC) elC.textContent = `${conc} कि.ग्रा.`;
    }

    document.getElementById("rationBodyWeight")?.addEventListener("input", updateRationPlan);
    document.getElementById("rationMilkYield")?.addEventListener("input", updateRationPlan);

    document.getElementById("btnCloseRationModal")?.addEventListener("click", () => modalRoot.innerHTML = "");
    document.getElementById("btnCloseRationBottom")?.addEventListener("click", () => modalRoot.innerHTML = "");
  }

  /**
   * Tool 6: Emergency SOS Doctor Dispatch Modal
   */
  function openEmergencySosModal() {
    const modalRoot = document.getElementById("farmerModalPortal");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 bg-rose-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div class="bg-white border-2 border-rose-500 rounded-3xl max-w-md w-full p-6 shadow-elevated relative my-auto animate-bounce-short">
          
          <div class="flex items-center justify-between border-b border-rose-100 pb-3 mb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl font-bold animate-pulse">
                <i class="fa-solid fa-truck-medical"></i>
              </div>
              <div>
                <h3 class="font-display font-black text-base text-rose-950">आपातकालीन पशु चिकित्सक सहायता</h3>
                <div class="text-[10px] font-mono text-rose-600 font-bold">24×7 EMERGENCY VETERINARY SOS</div>
              </div>
            </div>
            <button type="button" id="btnCloseSosModal" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
              <span class="text-rose-900 font-semibold block mb-1">राष्ट्रीय पशु स्वास्थ्य टोल-फ्री हेल्पलाइन</span>
              <a href="tel:1962" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-display font-black text-xl shadow-lg shadow-rose-600/30 transition-all active:scale-95">
                <i class="fa-solid fa-phone"></i>
                <span>1962 डायल करें</span>
              </a>
              <span class="text-[10px] font-mono text-rose-700 block mt-2 font-bold">मोबाइल वेटरनरी यूनिट (MVU) तत्काल रवाना</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-slate-700">
              <div class="font-bold text-slate-900">निकटतम अधिकृत राजकीय पशु चिकित्सालय:</div>
              <div class="text-[11px] flex items-center gap-1.5 text-slate-600">
                <i class="fa-solid fa-hospital text-sky-600"></i>
                <span>राजकीय प्रथम श्रेणी पशु चिकित्सालय, ढांड</span>
              </div>
              <div class="text-[11px] flex items-center gap-1.5 text-slate-600">
                <i class="fa-solid fa-user-doctor text-emerald-600"></i>
                <span>ड्यूटी डॉक्टर: डॉ. राहुल (VCI/2026/09482)</span>
              </div>
            </div>
          </div>

          <div class="mt-5 pt-3 border-t border-slate-100 flex justify-end">
            <button type="button" id="btnCloseSosBottom" class="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm">
              बंद करें
            </button>
          </div>

        </div>
      </div>
    `;

    document.getElementById("btnCloseSosModal")?.addEventListener("click", () => modalRoot.innerHTML = "");
    document.getElementById("btnCloseSosBottom")?.addEventListener("click", () => modalRoot.innerHTML = "");
  }

  /**
   * Bind Farmer Portal Event Handlers
   */
  function bindFarmerEvents() {
    // Tool Button Handlers
    document.getElementById("btnToolPassbook")?.addEventListener("click", () => openPassbookModal(0));
    document.getElementById("btnToolMilkCalc")?.addEventListener("click", () => openMilkLedgerModal());
    document.getElementById("btnToolRemedies")?.addEventListener("click", () => openRemediesModal());
    document.getElementById("btnToolPregnancy")?.addEventListener("click", () => openPregnancyTrackerModal());
    document.getElementById("btnToolFeedRation")?.addEventListener("click", () => openRationModal());
    document.getElementById("btnToolEmergencySos")?.addEventListener("click", () => openEmergencySosModal());

    // Livestock Cards Delegated Handlers
    document.querySelectorAll(".btn-open-animal-passbook").forEach(btn => {
      btn.addEventListener("click", function () {
        const idx = parseInt(this.getAttribute("data-animal-index") || "0", 10);
        openPassbookModal(idx);
      });
    });

    document.querySelectorAll(".btn-quick-milk-entry").forEach(btn => {
      btn.addEventListener("click", () => openMilkLedgerModal());
    });

    // Add New Animal Action
    document.getElementById("btnAddNewAnimalAction")?.addEventListener("click", () => {
      notify("नया पशु पंजीकरण फॉर्म खोला जा रहा है...", "info");
      openPassbookModal(0);
    });

    // Farmer Logout Trigger
    document.getElementById("btnFarmerPortalLogout")?.addEventListener("click", () => {
      if (App.logout) {
        App.logout();
      } else {
        App.Session.role = "guest";
        if (App.navigateTo) App.navigateTo("home");
      }
    });
  }

  // Farmer Portal Module Interface Export
  App.FarmerPortal = {
    version: "2026.PROD.FARMER.1",
    render: function (containerSelector) {
      render(containerSelector);
    },
    openPassbook: function (index) {
      openPassbookModal(index);
    },
    openMilkCalculator: function () {
      openMilkLedgerModal();
    },
    openRemedies: function () {
      openRemediesModal();
    }
  };

})(window, document);
