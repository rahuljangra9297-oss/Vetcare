// Vetcare AI OS - Simplified Dairy Farmer Hub & Ethno-Veterinary Suite (2026 Production)
// Architecture: Milk Revenue Ledger, Ethno-Veterinary Formularies, Gestation Clock & Pashu Passbook
// Design Philosophy: High-Contrast, Large-Touch Targets, Rural-First Language & Offline Persistence

(function (root, factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.VetcareApp = root.VetcareApp || {};
    root.VetcareApp.FarmerPortal = factory();
  }
})(typeof window !== "undefined" ? window : this, function () {
  "use strict";

  // =========================================================================
  // 1. ETHNO-VETERINARY KNOWLEDGE BASE (NDDB & TANUVAS VALIDATED RECIPES)
  // =========================================================================
  const DESI_NUSKHE_CATALOG = [
    {
      id: "mastitis_remedy",
      titleHi: "थनैला रोग (Mastitis) का अचूक लेप",
      titleEn: "Ethno-Veterinary Herbal Paste for Udder Swelling & Clots",
      indications: "थन का गर्म व सूजा होना, दूध में खून, पीला पानी या पनीर जैसे छैछड़े आना।",
      urgency: "शुरुआती लक्षण दिखते ही तुरंत लेप शुरू करें (24 घंटे में लाभ)।",
      ingredients: [
        { name: "ताजा ग्वारपाठा (Aloe Vera) का गूदा", qty: "250 ग्राम (लगभग 2 बड़ी पत्तियां)" },
        { name: "शुद्ध हल्दी चूर्ण (Turmeric Powder)", qty: "50 ग्राम" },
        { name: "कली का चूना (Edible Calcium Hydroxide / Chuna)", qty: "15 ग्राम (एक छोटे सिक्के बराबर)" }
      ],
      preparationSteps: [
        "एलोवेरा की पत्तियों के कांटे हटाकर गूदा निकालें।",
        "मिक्सर या सिलबट्टे पर एलोवेरा गूदा, हल्दी और चूना एक साथ पीसें।",
        "घोटने पर यह लेप गाढ़े लाल (सिंदूरी) रंग का पेस्ट बन जाएगा।",
        "आवश्यकतानुसार हल्का पानी मिलाकर लेप पतला करें ताकि थन पर आसानी से चिपक सके।"
      ],
      applicationMethod: "दूध को पूरी तरह दुहकर खाली कर लें। फिर पूरे थन व अयन पर दिन में 4 से 5 बार लेप लगाएं। लगातार 5 दिन तक जारी रखें।",
      caution: "यदि थन नीला या ठंडा पड़ जाए (गैंग्रीनस), तो बिना देरी डॉक्टर को दिखाएं।"
    },
    {
      id: "bloat_remedy",
      titleHi: "अफरा, गैस व पेट फूलना (Bloat / Tympany)",
      titleEn: "Immediate Oral Drench for Ruminal Gas & Fermentation",
      indications: "बाईं कोख का अचानक ढोल की तरह फूलना, बेचैनी, बार-बार उठना-बैठना, सांस फूलना।",
      urgency: "आपातकालीन स्थिति - तुरंत नाल से पिलाएं।",
      ingredients: [
        { name: "कच्ची घानी सरसों या मीठा तेल (Mustard Oil)", qty: "400 से 500 मिली" },
        { name: "तारपीन का तेल (Turpentine Oil - औषधीय)", qty: "40 से 50 मिली" },
        { name: "हींग (Asafoetida / Hing)", qty: "10 से 15 ग्राम" },
        { name: "अजवाइन (Carom Seeds) चूर्ण", qty: "50 ग्राम" },
        { name: "काला नमक (Black Salt)", qty: "50 ग्राम" }
      ],
      preparationSteps: [
        "हींग और अजवाइन को तवे पर हल्का भूनकर बारीक पीस लें।",
        "सरसों के तेल को हल्का गुनगुना करें।",
        "तेल में हींग, अजवाइन, काला नमक और तारपीन का तेल अच्छी तरह घोलें।"
      ],
      applicationMethod: "पशु का मुंह ऊपर उठाकर बांस की नाल या बोतल द्वारा जीभ दबाए बिना धीरे-धीरे गले में उतारें। इसके बाद पशु को 15 मिनट धीरे-धीरे टहलाएं।",
      caution: "यदि पशु जमीन पर गिरकर तड़पने लगे, तो नाल न पिलाएं (फेफड़ों में जाने का खतरा रहता है)। तुरंत डॉक्टर से ट्रोकार लगवाएं।"
    },
    {
      id: "diarrhea_remedy",
      titleHi: "दस्त, पेचिश व पतला गोबर (Diarrhea / Scours)",
      titleEn: "Astringent Herbal Paste for Loose Dung & Calf Scours",
      indications: "पानी जैसा पतला, झागदार या बदबूदार गोबर करना, कमजोरी व भूख न लगना।",
      urgency: "शरीर में पानी की कमी रोकने हेतु ओआरएस/नमक-चीनी घोल भी साथ दें।",
      ingredients: [
        { name: "अनार के सूखे छिलके (Pomegranate Rind)", qty: "100 ग्राम" },
        { name: "मेथी दाना (Fenugreek Seeds)", qty: "50 ग्राम" },
        { name: "ताजा दही या खट्टी छाछ (Curd/Chhach)", qty: "500 ग्राम" },
        { name: "पिसा हुआ जीरा व सोंठ", qty: "20-20 ग्राम" }
      ],
      preparationSteps: [
        "अनार के छिलके और मेथी दाने को रात भर पानी में भिगो दें।",
        "सुबह इन्हें बारीक पीसकर जीरा व सोंठ चूर्ण के साथ दही/छाछ में मिला लें।"
      ],
      applicationMethod: "बड़े पशु को सुबह और शाम 2 खुराक में नाल से पिलाएं। छोटे बछड़े/बकरियों को इसकी एक-चौथाई मात्रा दें। 2 से 3 दिन तक दोहराएं।",
      caution: "यदि गोबर में गाढ़ा खून आ रहा हो या बुखार 104°F से अधिक हो तो यह कोक्सीडियोसिस/संक्रमण हो सकता है।"
    },
    {
      id: "maggot_wound_remedy",
      titleHi: "सड़े घाव व कीड़े (Maggoted Wounds) का मलहम",
      titleEn: "Antiseptic & Maggoticidal Natural Oil Dressing",
      indications: "घाव में सफेद कीड़े बिलबिलाना, बदबू आना और मक्खियां भिनभिनाना।",
      urgency: "कीड़ों को तुरंत मारकर घाव की गहराई साफ करना आवश्यक है।",
      ingredients: [
        { name: "कपूर की टिकिया (Camphor Tablets)", qty: "20 ग्राम (लगभग 8-10 टिकिया)" },
        { name: "शुद्ध नीम का तेल (Neem Seed Oil)", qty: "100 मिली" },
        { name: "नीलगिरी या तारपीन का तेल", qty: "20 मिली" }
      ],
      preparationSteps: [
        "कपूर की टिकियों को बारीक पीसकर पाउडर बना लें।",
        "नीम के तेल को हल्का गर्म करें और उसमें कपूर डालकर हिलाएं जब तक वह पूरी तरह घुल न जाए।",
        "अंत में नीलगिरी/तारपीन का तेल मिलाकर कांच की शीशी में भर लें।"
      ],
      applicationMethod: "रुई या सीरिंज से यह तेल सीधे घाव के छेद में गहराई तक डालें। 5 मिनट में कीड़े मरकर बाहर गिर जाएंगे। दिन में 2 बार लगाएं।",
      caution: "घाव को फिनाइल या तेजाब से कभी न धोएं, इससे ऊतक जल जाते हैं।"
    },
    {
      id: "ectoparasite_remedy",
      titleHi: "चिचड़ी, जूँ व किलनी मुक्ति (Tick & Flea Control)",
      titleEn: "Ectoparasite Herbal Wash for Cattle & Shed Floor",
      indications: "शरीर पर चिचड़ियों का चिपटना, खुजली करना, बाल उड़ना और दूध घटना।",
      urgency: "चिचड़ियां थायलेरियोसिस व बबेसिओसिस जैसे जानलेवा बुखार फैलाती हैं।",
      ingredients: [
        { name: "नीम की ताजी पत्तियां (Neem Leaves)", qty: "1 किलोग्राम" },
        { name: "सीताफल (शरीफा) के बीज का चूर्ण", qty: "100 ग्राम" },
        { name: "तंबाकू की डंडी का चूरा", qty: "50 ग्राम" },
        { name: "कपड़े धोने का निरमा/साबुन", qty: "25 ग्राम" }
      ],
      preparationSteps: [
        "नीम की पत्तियों, सीताफल बीज और तंबाकू को 5 लीटर पानी में डालकर आधा रहने तक उबालें।",
        "काढ़े को छान लें और उसमें साबुन का घोल मिला दें ताकि दवा चिचड़ियों की चमड़ी पर चिपक सके।"
      ],
      applicationMethod: "स्प्रे पंप या कपड़े के पोंछे से पशु के पूरे शरीर (विशेषकर कांख, पूंछ के नीचे और कान के पीछे) पर अच्छी तरह लगाएं। साथ ही पशुबाड़े की दीवारों पर छिड़कें।",
      caution: "दवा आंखों व मुंह में न जाने दें। घोल लगाने के 2 घंटे तक पशु को खुद चाटने न दें।"
    }
  ];

  // =========================================================================
  // 2. DEFAULT STATE & LOCALSTORAGE CONTROLLERS
  // =========================================================================
  const STORAGE_KEYS = {
    LEDGER: "vetcare_farmer_milk_ledger_v2",
    BREEDING: "vetcare_farmer_breeding_records_v2",
    ANIMALS: "vetcare_farmer_animals_v2"
  };

  const DEFAULT_ANIMALS = [
    {
      id: "TAG-MUR-092",
      name: "लक्ष्मी",
      species: "भैंस (Buffalo)",
      breed: "मुर्रा (Murrah)",
      tag: "140029384910",
      lactation: "तीसरी ब्यात (3rd)",
      dailyYield: "15.5",
      vaccinationDue: "गलघोंटू (HS) - 24 दिन शेष",
      vaccineStatus: "warning"
    },
    {
      id: "TAG-SAH-118",
      name: "गौरी",
      species: "गाय (Cow)",
      breed: "साहीवाल (Sahiwal)",
      tag: "140088192019",
      lactation: "दूसरी ब्यात (2nd)",
      dailyYield: "12.0",
      vaccinationDue: "खुरपका (FMD) - अप टू डेट",
      vaccineStatus: "good"
    }
  ];

  function getFromStore(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn("[FarmerPortal] Storage access failure, using fallback:", e);
      return fallback;
    }
  }

  function saveToStore(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error("[FarmerPortal] Unable to save to local storage:", e);
    }
  }

  // =========================================================================
  // 3. MAIN PORTAL COMPONENT RENDERING
  // =========================================================================
  function render(containerId) {
    let target = containerId;
    if (typeof target === "string") {
      target = document.getElementById(target) || document.querySelector(target);
    }
    if (!target) {
      console.error("[FarmerPortal] Target container not found:", containerId);
      return;
    }

    // Portal state
    let activeTab = "milk_calculator"; // 'milk_calculator' | 'desi_nuskhe' | 'breeding_calendar' | 'pashu_passbook'
    let ledgerRecords = getFromStore(STORAGE_KEYS.LEDGER, []);
    let registeredAnimals = getFromStore(STORAGE_KEYS.ANIMALS, DEFAULT_ANIMALS);

    // Initial milk calculator interactive state
    let calcLiters = 14;
    let calcFat = 6.8;
    let calcSnf = 8.8;
    let calcRatePerFat = 8.2; // Standard ₹ per unit fat in milk societies

    function calculateMilkPayout(liters, fat, snf, fatRate) {
      const l = parseFloat(liters) || 0;
      const f = parseFloat(fat) || 0;
      const s = parseFloat(snf) || 0;
      const fr = parseFloat(fatRate) || 8.2;

      // Two-Axis Formula Standard: Rate = (Fat * FatRate) + (SNF * 2.8 incentive)
      const ratePerLiter = (f * fr) + (s * 0.45);
      const dailyIncome = l * ratePerLiter;
      const monthlyProjected = dailyIncome * 30;

      return {
        ratePerLiter: ratePerLiter.toFixed(2),
        dailyIncome: dailyIncome.toFixed(2),
        monthlyProjected: monthlyProjected.toFixed(2)
      };
    }

    function renderView() {
      const payout = calculateMilkPayout(calcLiters, calcFat, calcSnf, calcRatePerFat);

      target.innerHTML = `
        <div class="space-y-6 max-w-6xl mx-auto pb-12">
          
          <!-- Top Greeting & Identity Bar -->
          <div class="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-2xl shadow-xs">
                <i class="fa-solid fa-wheat-awn"></i>
              </div>
              <div>
                <h1 class="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight">
                  स्मार्ट पशुपालक एवं डेयरी किसान हब (Smart Farmer Hub)
                </h1>
                <p class="text-xs text-slate-500 font-medium mt-0.5">
                  दूध व फैट आय गणना, 100% देशी आयुर्वेदिक उपचार, मद व प्रसव कैलेंडर (2026 Edition)
                </p>
              </div>
            </div>

            <!-- Big Large-Touch Tab Pills -->
            <div class="w-full md:w-auto flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto gap-1">
              <button type="button" data-tab="milk_calculator" class="tab-trigger flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'milk_calculator' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                <i class="fa-solid fa-bucket mr-1.5 text-emerald-600"></i>दूध खाता
              </button>
              <button type="button" data-tab="desi_nuskhe" class="tab-trigger flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'desi_nuskhe' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                <i class="fa-solid fa-leaf mr-1.5 text-emerald-600"></i>देसी नुस्खे
              </button>
              <button type="button" data-tab="breeding_calendar" class="tab-trigger flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'breeding_calendar' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                <i class="fa-solid fa-calendar-check mr-1.5 text-emerald-600"></i>मद व प्रसव चक्र
              </button>
              <button type="button" data-tab="pashu_passbook" class="tab-trigger flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeTab === 'pashu_passbook' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                <i class="fa-solid fa-id-card mr-1.5 text-emerald-600"></i>पशु पासबुक
              </button>
            </div>
          </div>

          <!-- TAB 1: MILK & FAT-SNF EARNINGS CALCULATOR -->
          <div id="tabContent_milk_calculator" class="${activeTab === 'milk_calculator' ? 'block' : 'hidden'} space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <!-- Calculator Left Panel -->
              <div class="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5">
                <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <i class="fa-solid fa-calculator text-emerald-600"></i>
                    <span>दूध, फैट व एसएनएफ दर्ज करें</span>
                  </h2>
                  <span class="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    लाइव गणना
                  </span>
                </div>

                <div class="space-y-4">
                  <!-- Liters Input -->
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1.5">
                      दूध मात्रा (कुल लीटर) [Milk Quantity]
                    </label>
                    <div class="relative">
                      <input type="number" id="inpMilkLiters" step="0.5" value="${calcLiters}" class="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-2xl px-4 py-3 text-base font-bold text-slate-900 focus:outline-none transition-colors" />
                      <span class="absolute right-4 top-3.5 text-xs font-bold text-slate-400">लीटर</span>
                    </div>
                  </div>

                  <!-- Fat & SNF Grid -->
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-bold text-slate-700 mb-1.5">
                        फैट % (FAT)
                      </label>
                      <input type="number" id="inpMilkFat" step="0.1" value="${calcFat}" class="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-2xl px-4 py-3 text-base font-bold text-slate-900 focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-700 mb-1.5">
                        एसएनएफ % (SNF)
                      </label>
                      <input type="number" id="inpMilkSnf" step="0.1" value="${calcSnf}" class="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-2xl px-4 py-3 text-base font-bold text-slate-900 focus:outline-none transition-colors" />
                    </div>
                  </div>

                  <!-- Base Fat Rate -->
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1.5">
                      डेयरी समिति फैट दर (₹ प्रति फैट)
                    </label>
                    <input type="number" id="inpMilkRatePerFat" step="0.1" value="${calcRatePerFat}" class="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none transition-colors" />
                  </div>

                  <!-- Save to Ledger Button -->
                  <button type="button" id="btnSaveToLedger" class="w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-extrabold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                    <i class="fa-solid fa-file-invoice-dollar text-base"></i>
                    <span>खाता बही में दर्ज करें (Save Entry)</span>
                  </button>
                </div>
              </div>

              <!-- Payout Display & Ledger Right Panel -->
              <div class="lg:col-span-7 space-y-6">
                <!-- Large Output Metrics Card -->
                <div class="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-lg space-y-4">
                  <div class="flex items-center justify-between text-emerald-100 text-xs font-mono">
                    <span>अनुमानित दुग्ध मूल्य पर्ची (ESTIMATED PAYOUT)</span>
                    <span class="px-2 py-0.5 rounded bg-white/20 text-white font-bold">2026 COOPERATIVE MATRIX</span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                      <div class="text-xs text-emerald-100 font-medium">भाव प्रति लीटर (Rate/L)</div>
                      <div class="text-2xl sm:text-3xl font-display font-black text-white mt-1">₹ ${payout.ratePerLiter}</div>
                    </div>
                    <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                      <div class="text-xs text-emerald-100 font-medium">आज की कुल कमाई (Daily)</div>
                      <div class="text-2xl sm:text-3xl font-display font-black text-white mt-1">₹ ${payout.dailyIncome}</div>
                    </div>
                    <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                      <div class="text-xs text-emerald-100 font-medium">मासिक अनुमान (30 Days)</div>
                      <div class="text-2xl sm:text-3xl font-display font-black text-amber-300 mt-1">₹ ${payout.monthlyProjected}</div>
                    </div>
                  </div>

                  <div class="text-[11px] text-emerald-100/90 leading-relaxed pt-1">
                    <i class="fa-solid fa-circle-check mr-1 text-emerald-300"></i>
                    सूत्र: (फैट ${calcFat}% × ₹${calcRatePerFat}) + (एसएनएफ ${calcSnf}% प्रोत्साहन) = ₹${payout.ratePerLiter} प्रति लीटर।
                  </div>
                </div>

                <!-- Recent Saved Ledger Entries -->
                <div class="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                  <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <i class="fa-solid fa-book text-emerald-600"></i>
                      <span>हालिया दुग्ध बिक्री खाता बही (Saved Ledger)</span>
                    </h3>
                    ${ledgerRecords.length > 0 ? `
                      <button type="button" id="btnClearLedger" class="text-[11px] font-bold text-rose-600 hover:underline">
                        सभी साफ करें (Clear)
                      </button>
                    ` : ''}
                  </div>

                  ${ledgerRecords.length === 0 ? `
                    <div class="py-8 text-center text-slate-400 text-xs">
                      <i class="fa-solid fa-clipboard-list text-3xl mb-2 text-slate-300 block"></i>
                      अभी कोई प्रविष्टि सहेजी नहीं गई है। बाईं ओर से "खाता बही में दर्ज करें" दबाएं।
                    </div>
                  ` : `
                    <div class="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1">
                      ${ledgerRecords.slice().reverse().map(record => `
                        <div class="py-3 flex items-center justify-between text-xs">
                          <div>
                            <div class="font-bold text-slate-900">
                              ${record.liters} लीटर दूध (फैट: ${record.fat}%, SNF: ${record.snf}%)
                            </div>
                            <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                              ${record.timestamp} | भाव: ₹${record.rate}/लीटर
                            </div>
                          </div>
                          <div class="text-right">
                            <span class="text-sm font-extrabold text-emerald-700">₹ ${record.total}</span>
                          </div>
                        </div>
                      `).join("")}
                    </div>
                  `}
                </div>
              </div>

            </div>
          </div>

          <!-- TAB 2: AUTHENTIC AYURVEDIC DESI NUSKHE -->
          <div id="tabContent_desi_nuskhe" class="${activeTab === 'desi_nuskhe' ? 'block' : 'hidden'} space-y-6">
            <div class="p-6 rounded-3xl bg-amber-50/60 border border-amber-200/80 shadow-xs flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg">
                  <i class="fa-solid fa-leaf"></i>
                </div>
                <div>
                  <h2 class="text-base font-display font-black text-amber-950">
                    राष्ट्रीय डेयरी विकास बोर्ड (NDDB) एवं तंजौर विश्वविद्यालय द्वारा अनुभूत नुस्खे
                  </h2>
                  <p class="text-xs text-amber-800 font-medium">
                    घर में उपलब्ध सामग्री से तैयार सुरक्षित देशी प्राथमिक चिकित्सा। पशु को कोई दुष्प्रभाव (Side Effect) नहीं।
                  </p>
                </div>
              </div>
            </div>

            <!-- Nuskhe Accordion Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${DESI_NUSKHE_CATALOG.map((item, idx) => `
                <div class="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div class="flex items-start justify-between gap-3 mb-2">
                      <div class="flex items-center gap-2">
                        <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center">
                          #${idx + 1}
                        </span>
                        <h3 class="text-base font-display font-extrabold text-slate-900">${item.titleHi}</h3>
                      </div>
                    </div>
                    <div class="text-[11px] font-mono text-slate-400 mb-3">${item.titleEn}</div>

                    <!-- Indications Badge -->
                    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 mb-3 leading-relaxed">
                      <strong>लक्षण:</strong> ${item.indications}
                    </div>

                    <!-- Ingredients List -->
                    <div class="mb-3">
                      <div class="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                        <i class="fa-solid fa-mortar-pestle text-emerald-600"></i>
                        <span>आवश्यक घरेलू सामग्री (Ingredients):</span>
                      </div>
                      <ul class="text-xs text-slate-600 space-y-1 pl-1">
                        ${item.ingredients.map(ing => `
                          <li class="flex items-start gap-1.5">
                            <span class="text-emerald-600 font-bold">•</span>
                            <span><strong>${ing.name}:</strong> ${ing.qty}</span>
                          </li>
                        `).join("")}
                      </ul>
                    </div>

                    <!-- Preparation Steps -->
                    <div class="mb-3">
                      <div class="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                        <i class="fa-solid fa-fire-burner text-amber-600"></i>
                        <span>बनाने की विधि:</span>
                      </div>
                      <ol class="text-xs text-slate-600 space-y-1 pl-1">
                        ${item.preparationSteps.map((st, sIdx) => `
                          <li class="flex items-start gap-1.5">
                            <span class="font-mono font-bold text-slate-400">${sIdx + 1}.</span>
                            <span>${st}</span>
                          </li>
                        `).join("")}
                      </ol>
                    </div>

                    <!-- Application Method -->
                    <div class="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 leading-relaxed font-medium mb-3">
                      <strong>उपयोग का तरीका:</strong> ${item.applicationMethod}
                    </div>

                    <!-- Caution -->
                    <div class="text-[11px] text-rose-700 bg-rose-50 p-2 rounded-xl border border-rose-200 leading-snug font-semibold">
                      <i class="fa-solid fa-triangle-exclamation mr-1"></i>
                      <span><strong>चेतावनी:</strong> ${item.caution}</span>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- TAB 3: BREEDING & CALVING GESTATION TRACKER -->
          <div id="tabContent_breeding_calendar" class="${activeTab === 'breeding_calendar' ? 'block' : 'hidden'} space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <!-- Left Input Box -->
              <div class="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                <div class="pb-3 border-b border-slate-100">
                  <h2 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <i class="fa-solid fa-calendar-heart text-rose-500"></i>
                    <span>गर्भाधान (A.I.) की तारीख दर्ज करें</span>
                  </h2>
                  <p class="text-xs text-slate-500 mt-0.5">तारीख डालते ही प्रसव व जांच की तारीखें सामने आ जाएंगी।</p>
                </div>

                <div class="space-y-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1.5">पशु का प्रकार (Species)</label>
                    <select id="selBreedingSpecies" class="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500">
                      <option value="cow">देसी / संकर गाय (280 दिन गर्भकाल)</option>
                      <option value="buffalo" selected>भैंस (मुर्रा/नीली रावी - 310 दिन गर्भकाल)</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1.5">ए.आई. या सीमन चढ़ाने की तारीख (Insemination Date)</label>
                    <input type="date" id="inpAiDate" value="${new Date().toISOString().split("T")[0]}" class="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500 font-mono" />
                  </div>

                  <button type="button" id="btnCalculateBreeding" class="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <span>कैलेंडर शेड्यूल निकालें (Track Milestones)</span>
                  </button>
                </div>
              </div>

              <!-- Right Milestones Output -->
              <div class="lg:col-span-7 space-y-4" id="breedingOutputPanel">
                <!-- Dynamically updated by calculation function -->
              </div>

            </div>
          </div>

          <!-- TAB 4: DIGITAL PASHU HEALTH PASSBOOK -->
          <div id="tabContent_pashu_passbook" class="${activeTab === 'pashu_passbook' ? 'block' : 'hidden'} space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-display font-extrabold text-slate-900">पशु स्वास्थ्य एवं पहचान पासबुक</h2>
                <p class="text-xs text-slate-500">आपके पंजीकृत दुधारू पशुओं के पहचान टैग एवं टीकाकरण रिकॉर्ड्स</p>
              </div>
              <button type="button" id="btnAddNewAnimalModal" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-transform active:scale-95">
                <i class="fa-solid fa-plus"></i> नया पशु जोड़ें
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="passbookGrid">
              ${registeredAnimals.map((animal, aIdx) => `
                <div class="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div class="flex items-start justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-2xl ${animal.species.includes('गाय') ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-slate-100 text-slate-700 border border-slate-200'} flex items-center justify-center text-2xl font-bold">
                          <i class="fa-solid ${animal.species.includes('गाय') ? 'fa-cow' : 'fa-shield-cat'}"></i>
                        </div>
                        <div>
                          <h3 class="text-base font-display font-black text-slate-900">${animal.name} (${animal.breed})</h3>
                          <div class="text-xs font-mono text-slate-500">टैग ID: ${animal.tag}</div>
                        </div>
                      </div>
                      <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        सक्रिय दुधारू
                      </span>
                    </div>

                    <div class="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs">
                      <div>
                        <span class="text-slate-400 block text-[10px] uppercase font-mono font-bold">ब्यात संख्या:</span>
                        <strong class="text-slate-800 font-bold">${animal.lactation}</strong>
                      </div>
                      <div>
                        <span class="text-slate-400 block text-[10px] uppercase font-mono font-bold">दैनिक औसत दूध:</span>
                        <strong class="text-emerald-700 font-bold">${animal.dailyYield} लीटर/दिन</strong>
                      </div>
                    </div>

                    <div class="mt-3 p-3 rounded-2xl ${animal.vaccineStatus === 'warning' ? 'bg-amber-50 border border-amber-200 text-amber-900' : 'bg-emerald-50 border border-emerald-200 text-emerald-900'} text-xs flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <i class="fa-solid ${animal.vaccineStatus === 'warning' ? 'fa-triangle-exclamation text-amber-600' : 'fa-circle-check text-emerald-600'}"></i>
                        <span>अगला टीका: <strong>${animal.vaccinationDue}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div class="pt-2 flex justify-end">
                    <button type="button" data-animal-index="${aIdx}" class="btn-remove-animal text-[11px] font-bold text-rose-600 hover:underline">
                      हटाएं (Remove)
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

        </div>
      `;

      // Mount Child Subcomponents & Event Handlers
      bindPortalEvents();
      renderBreedingTimeline();
    }

    // Interactive Breeding Timeline Calculations
    function renderBreedingTimeline() {
      const outPanel = target.querySelector("#breedingOutputPanel");
      if (!outPanel) return;

      const aiDateInp = target.querySelector("#inpAiDate");
      const speciesSel = target.querySelector("#selBreedingSpecies");
      if (!aiDateInp || !speciesSel) return;

      const selectedDate = new Date(aiDateInp.value || new Date());
      const isBuffalo = speciesSel.value === "buffalo";
      const gestationDays = isBuffalo ? 310 : 280;

      // Helper function to add days to a JS date
      function addDays(startDate, days) {
        const result = new Date(startDate);
        result.setDate(result.getDate() + days);
        return result.toLocaleDateString("hi-IN", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      }

      const repeatHeatDate = addDays(selectedDate, 21);
      const pdCheckDate = addDays(selectedDate, 60);
      const dryOffDate = addDays(selectedDate, gestationDays - 60);
      const calvingDate = addDays(selectedDate, gestationDays);

      outPanel.innerHTML = `
        <div class="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-list-check text-emerald-600"></i>
              <span>महत्वपूर्ण चक्र एवं सावधानियां (Gestation Timeline)</span>
            </h3>
            <span class="text-xs font-mono font-bold bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-lg">
              ${gestationDays} दिन चक्र
            </span>
          </div>

          <div class="space-y-3">
            <!-- 21 Day Repeat Heat Check -->
            <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start justify-between gap-3">
              <div>
                <div class="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[10px] font-mono">1</span>
                  <span>पुनः मद (हीट) निरीक्षण: <strong>${repeatHeatDate}</strong></span>
                </div>
                <p class="text-[11px] text-amber-800 mt-1">
                  सीमन के ठीक 18 से 21 दिन बाद सुबह-शाम पशु पर नजर रखें। यदि तार (लार) गिराए या रंभाए, तो तुरंत पुनः सीमन कराएं।
                </p>
              </div>
              <span class="text-[10px] font-mono font-bold text-amber-700 bg-white px-2 py-1 rounded-md border border-amber-200">+21 दिन</span>
            </div>

            <!-- 60 Day PD Check -->
            <div class="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 flex items-start justify-between gap-3">
              <div>
                <div class="text-xs font-bold text-sky-900 flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-md bg-sky-600 text-white flex items-center justify-center text-[10px] font-mono">2</span>
                  <span>डॉक्टर द्वारा गर्भ जांच (P.D.): <strong>${pdCheckDate}</strong></span>
                </div>
                <p class="text-[11px] text-sky-800 mt-1">
                  अधिकृत पशु चिकित्सक से गर्भाशय की जांच कराएं व गर्भ ठहरने की पक्की पुष्टि करें।
                </p>
              </div>
              <span class="text-[10px] font-mono font-bold text-sky-700 bg-white px-2 py-1 rounded-md border border-sky-200">+60 दिन</span>
            </div>

            <!-- 7 Month Dry Off -->
            <div class="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-start justify-between gap-3">
              <div>
                <div class="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                  <span class="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px] font-mono">3</span>
                  <span>दूध सुखाना (Dry-off) व ट्रांज़िशन आहार: <strong>${dryOffDate}</strong></span>
                </div>
                <p class="text-[11px] text-purple-800 mt-1">
                  प्रसव से 60 दिन पूर्व दूध निकालना पूर्णतः बंद कर दें। खनिज मिश्रण (Mineral Mixture 50g) रोज दें।
                </p>
              </div>
              <span class="text-[10px] font-mono font-bold text-purple-700 bg-white px-2 py-1 rounded-md border border-purple-200">-60 दिन</span>
            </div>

            <!-- Calving Date -->
            <div class="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-start justify-between gap-3">
              <div>
                <div class="text-sm font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <i class="fa-solid fa-cake-candles text-emerald-600"></i>
                  <span>संभावित प्रसव तारीख (Calving Date): <span class="text-emerald-700">${calvingDate}</span></span>
                </div>
                <p class="text-xs text-emerald-800 mt-1 font-medium">
                  बच्चा देने का संभावित समय। सूखी साफ जगह तैयार रखें व प्रसव के बाद गुड़-अजवाइन का काढ़ा दें।
                </p>
              </div>
              <span class="text-[10px] font-mono font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">डिलीवरी</span>
            </div>
          </div>
        </div>
      `;
    }

    // Attach Event Listeners
    function bindPortalEvents() {
      // 1. Tab Navigation
      target.querySelectorAll(".tab-trigger").forEach(btn => {
        btn.addEventListener("click", () => {
          const tab = btn.getAttribute("data-tab");
          if (tab && tab !== activeTab) {
            activeTab = tab;
            renderView();
          }
        });
      });

      // 2. Milk Calculator Dynamic Inputs
      const inpLiters = target.querySelector("#inpMilkLiters");
      const inpFat = target.querySelector("#inpMilkFat");
      const inpSnf = target.querySelector("#inpMilkSnf");
      const inpRate = target.querySelector("#inpMilkRatePerFat");

      [inpLiters, inpFat, inpSnf, inpRate].forEach(inputEl => {
        if (!inputEl) return;
        inputEl.addEventListener("input", () => {
          calcLiters = parseFloat(inpLiters.value) || 0;
          calcFat = parseFloat(inpFat.value) || 0;
          calcSnf = parseFloat(inpSnf.value) || 0;
          calcRatePerFat = parseFloat(inpRate.value) || 8.2;
          renderView();
        });
      });

      // 3. Save Entry to Milk Ledger
      const btnSaveLedger = target.querySelector("#btnSaveToLedger");
      if (btnSaveLedger) {
        btnSaveLedger.addEventListener("click", () => {
          const payout = calculateMilkPayout(calcLiters, calcFat, calcSnf, calcRatePerFat);
          const newEntry = {
            liters: calcLiters,
            fat: calcFat,
            snf: calcSnf,
            rate: payout.ratePerLiter,
            total: payout.dailyIncome,
            timestamp: new Date().toLocaleDateString("hi-IN", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit"
            })
          };

          ledgerRecords.push(newEntry);
          saveToStore(STORAGE_KEYS.LEDGER, ledgerRecords);

          if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
            window.VetcareApp.showToast(`₹ ${payout.dailyIncome} की दूध पर्ची खाता बही में दर्ज हुई!`, "success");
          } else {
            alert(`दूध पर्ची सफलता से दर्ज की गई: ₹ ${payout.dailyIncome}`);
          }

          renderView();
        });
      }

      // 4. Clear Ledger
      const btnClearLedger = target.querySelector("#btnClearLedger");
      if (btnClearLedger) {
        btnClearLedger.addEventListener("click", () => {
          if (confirm("क्या आप वाकई दुग्ध खाता बही का इतिहास मिटाना चाहते हैं?")) {
            ledgerRecords = [];
            saveToStore(STORAGE_KEYS.LEDGER, ledgerRecords);
            renderView();
          }
        });
      }

      // 5. Breeding Timeline Recalculate Button
      const btnCalcBreeding = target.querySelector("#btnCalculateBreeding");
      if (btnCalcBreeding) {
        btnCalcBreeding.addEventListener("click", renderBreedingTimeline);
      }

      // 6. Remove Animal Button
      target.querySelectorAll(".btn-remove-animal").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-animal-index"), 10);
          if (!isNaN(idx) && confirm("क्या आप इस पशु का रिकॉर्ड हटाना चाहते हैं?")) {
            registeredAnimals.splice(idx, 1);
            saveToStore(STORAGE_KEYS.ANIMALS, registeredAnimals);
            renderView();
          }
        });
      });

      // 7. Add New Animal Prompt Modal
      const btnAddAnimal = target.querySelector("#btnAddNewAnimalModal");
      if (btnAddAnimal) {
        btnAddAnimal.addEventListener("click", () => {
          const name = prompt("पशु का नाम या उपनाम लिखें (जैसे: गोरी, चमेली):");
          if (!name) return;
          const breed = prompt("नस्ल का नाम (जैसे: मुर्रा, साहीवाल, गिर, जर्सी):", "मुर्रा");
          const tag = prompt("कान का 12-अंकीय टैग नंबर:", Math.floor(100000000000 + Math.random() * 900000000000));
          const yieldLtr = prompt("दैनिक औसत दूध (लीटर में):", "14.0");

          const newObj = {
            id: "TAG-" + Date.now().toString().slice(-4),
            name: name,
            species: breed.includes("मुर्रा") ? "भैंस (Buffalo)" : "गाय (Cow)",
            breed: breed,
            tag: tag || "1400" + Date.now().toString().slice(-8),
            lactation: "ताजा ब्यांत (Fresh)",
            dailyYield: yieldLtr || "12.0",
            vaccinationDue: "खुरपका (FMD) - आगामी माह",
            vaccineStatus: "good"
          };

          registeredAnimals.push(newObj);
          saveToStore(STORAGE_KEYS.ANIMALS, registeredAnimals);
          renderView();

          if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
            window.VetcareApp.showToast(`पशु "${name}" पासबुक में सफलतापूर्वक जुड़ गया!`, "success");
          }
        });
      }
    }

    // Initial Mount
    renderView();
  }

  // =========================================================================
  // 4. PUBLIC API EXPORTS
  // =========================================================================
  return {
    version: "2026.04-PROD",
    render: render,
    getNuskheCatalog: function () {
      return DESI_NUSKHE_CATALOG.slice();
    }
  };
});
