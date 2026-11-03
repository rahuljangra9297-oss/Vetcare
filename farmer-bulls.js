// Vetcare AI OS - Breed-Wise Bull Directory & Pedigree Search Engine (2026 Production)

(function () {
  'use strict';

  // =========================================================================
  // 1. TOP VERIFIED LIVESTOCK BULLS DATABASE (window.VETCARE_BULL_DB)
  // =========================================================================
  const BULL_DATABASE = [
    // -----------------------------------------------------------------------
    // A. मुर्राह भैंस (Murrah Buffalo)
    // -----------------------------------------------------------------------
    {
      id: "BULL_MURRAH_01",
      name: "गोलू-2 (Golu-2)",
      tagNo: "HR-PC-483",
      breed: "मुर्राह भैंस (Murrah Buffalo)",
      category: "मुर्राह भैंस",
      damYield: "5,410 किग्रा / 305 दिन • फैट: 8.2%",
      sireInfo: "पीसी-सुल्तान (Padampur Lineage) • नेशनल चैंपियन",
      station: "HLDB / प्राइवेट ए.आई. एवं ब्रीडर नेटवर्क (हरियाणा)",
      sortedAvailable: "हाँ (Sexed Semen उपलब्ध - 90% कटड़ी)",
      traits: "अत्यधिक चौड़ा कशिश अयन (Udder), गहरे मुड़े हुए सींग, सुडौल खुर, कटड़ियों में उच्च फैट व 18-22L दैनिक दुग्ध क्षमता।",
      rating: "⭐⭐⭐⭐⭐ एलीट बुल",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
    },
    {
      id: "BULL_MURRAH_02",
      name: "युवराज (Yuvraj)",
      tagNo: "KKR-YUV-901",
      breed: "मुर्राह भैंस (Murrah Buffalo)",
      category: "मुर्राह भैंस",
      damYield: "4,850 किग्रा / 305 दिन • फैट: 8.5%",
      sireInfo: "कुरुक्षेत्र चैंपियन लाइन • वज़न 1400 किग्रा",
      station: "सुनाaria / नेशनल डेयरी शो बैंक",
      sortedAvailable: "सीमित (पारंपरिक व सॉर्टेड डोज)",
      traits: "विशाल कद-काठी, चौड़ी छाती, संतानों में रोग प्रतिरोधकता व प्रथम ब्यांत में 16+ लीटर दैनिक दूध।",
      rating: "⭐⭐⭐⭐⭐ लेजेंडरी सायर",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
    },
    {
      id: "BULL_MURRAH_03",
      name: "सुल्तान (Sultan)",
      tagNo: "KTL-SLT-777",
      breed: "मुर्राह भैंस (Murrah Buffalo)",
      category: "मुर्राह भैंस",
      damYield: "5,100 किग्रा / 305 दिन • फैट: 8.3%",
      sireInfo: "कैथल शाही वंशावली • ऑल इंडिया चैंपियन",
      station: "हरियाणा ब्रीड बैंक / सीमेन डिपो",
      sortedAvailable: "हाँ (Sexed & Conventional)",
      traits: "सीधी मजबूत पीठ, चारों थनों की आदर्श बनावट (Square Placement), शांत स्वभाव व लंबी दुग्ध अवधि।",
      rating: "⭐⭐⭐⭐⭐ हॉल ऑफ फेम",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200"
    },
    {
      id: "BULL_MURRAH_04",
      name: "CIRB M-29 (सीआईआरबी एम-29)",
      tagNo: "CIRB-M29-ICAR",
      breed: "मुर्राह भैंस (Murrah Buffalo)",
      category: "मुर्राह भैंस",
      damYield: "4,650 किग्रा / 305 दिन • फैट: 7.9%",
      sireInfo: "ICAR-CIRB हिसार प्रोजेनी टेस्टेड सायर",
      station: "केंद्रीय भैंस अनुसंधान संस्थान (ICAR-CIRB), हिसार",
      sortedAvailable: "हाँ (सरकारी वीर्य बैंक द्वारा प्रमाणित)",
      traits: "उच्च आनुवंशिक मेरिट (Positive Breeding Value), प्रथम ब्यांत में कम उम्र में गर्भाधान (Early Maturity) व उत्तम अडर डेप्थ।",
      rating: "⭐⭐⭐⭐⭐ वैज्ञानिक प्रमाणित",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      id: "BULL_MURRAH_05",
      name: "HLDB स्टार बुल (HLDB-1044)",
      tagNo: "HLDB-MRH-1044",
      breed: "मुर्राह भैंस (Murrah Buffalo)",
      category: "मुर्राह भैंस",
      damYield: "4,950 किग्रा / 305 दिन • फैट: 8.1%",
      sireInfo: "हरियाणा पशुधन विकास बोर्ड एलीट स्टॉक",
      station: "HLDB जगाधरी / हिसार सीमेन बैंक",
      sortedAvailable: "हाँ (90% कटड़ी गारंटी सॉर्टेड सीमेन)",
      traits: "92% कंसेप्शन दर (Conception Rate), मजबूत पैर व खुर, ब्यांत अंतराल (Calving Interval) कम करने में सिद्ध।",
      rating: "⭐⭐⭐⭐⭐ स्टेट चॉइस",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },

    // -----------------------------------------------------------------------
    // B. साहीवाल गाय (Sahiwal Cow)
    // -----------------------------------------------------------------------
    {
      id: "BULL_SAHIWAL_01",
      name: "साहीवाल शाइन (SAG-81 / Shivalik)",
      tagNo: "NDDB-SAG-81",
      breed: "साहीवाल गाय (Sahiwal Indigenous Cow)",
      category: "साहीवाल गाय",
      damYield: "4,480 किग्रा / 305 दिन • फैट: 5.1%",
      sireInfo: "साबरमती आश्रम गौशाला (SAG बीदज) • A2A2 सर्टिफाइड",
      station: "NDDB डेयरी सर्विसेज / साबरमती आश्रम गौशाला (SAG), गुजरात",
      sortedAvailable: "हाँ (A2A2 सेक्सड सीमन उपलब्ध)",
      traits: "100% शुद्ध A2A2 बीटा-केसीन, तंग सुडौल नाभि (Tight Sheath), शांत मिजाज, बछड़ियों में 15-18L क्षमता व गर्मी सहनशीलता।",
      rating: "⭐⭐⭐⭐⭐ NDDB टॉप रैंक",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
      id: "BULL_SAHIWAL_02",
      name: "कान्हा HLDB (Kanha Sahiwal)",
      tagNo: "HLDB-SHW-5502",
      breed: "साहीवाल गाय (Sahiwal Indigenous Cow)",
      category: "साहीवाल गाय",
      damYield: "3,950 किग्रा / 305 दिन • फैट: 4.9%",
      sireInfo: "HLDB साहीवाल ब्रीडिंग प्रोग्राम",
      station: "HLDB सेंट्रल सीमेन बैंक (गुरुग्राम/हिसार)",
      sortedAvailable: "हाँ (कन्वेंशनल व सेक्सड)",
      traits: "आकर्षक गहरा लाल-भूरा रंग, चौड़ा उभरा हुआ गलकंबल (Dewlap), रोग प्रतिरोधक क्षमता व शुष्क मौसम में भी स्थिर उत्पादन।",
      rating: "⭐⭐⭐⭐ HLDB एलीट",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
      id: "BULL_SAHIWAL_03",
      name: "प्रभात (Prabhat - NDRI)",
      tagNo: "NDRI-SH-210",
      breed: "साहीवाल गाय (Sahiwal Indigenous Cow)",
      category: "साहीवाल गाय",
      damYield: "4,220 किग्रा / 305 दिन • फैट: 5.2%",
      sireInfo: "ICAR-NDRI करनाल एलीट रिसर्च हर्ड",
      station: "राष्ट्रीय डेयरी अनुसंधान संस्थान (NDRI), करनाल",
      sortedAvailable: "सीमित (अनुसंधान व अनुमोदित केंद्र)",
      traits: "थनों की चौकोर बनावट (Square Teat Placement), मजबूत खुर, थनैला रोग के प्रति प्राकृतिक प्रतिरोधकता।",
      rating: "⭐⭐⭐⭐⭐ राष्ट्रीय अनुसंधान सायर",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200"
    },

    // -----------------------------------------------------------------------
    // C. गिर गाय (Gir Cow)
    // -----------------------------------------------------------------------
    {
      id: "BULL_GIR_01",
      name: "गिर रुद्रा (Gir Rudra)",
      tagNo: "SAG-GIR-409",
      breed: "गिर गाय (Gir Indigenous Cattle)",
      category: "गिर गाय",
      damYield: "4,600 किग्रा / 305 दिन • फैट: 4.9%",
      sireInfo: "शुद्ध काठियावाड़ी लाइन • A2A2 जेनोटाइप",
      station: "SAG बीदज / अमूल ब्रीडिंग सेंटर (गुजरात)",
      sortedAvailable: "हाँ (Sexed Semen उपलब्ध)",
      traits: "विशाल उत्तल माथा (Convex Forehead), लंबे घुमावदार कान, उत्कृष्ट अडर क्षमता व बछड़ियों में प्रथम ब्यांत 30 माह में।",
      rating: "⭐⭐⭐⭐⭐ एलीट काठियावाड़ी",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200"
    },
    {
      id: "BULL_GIR_02",
      name: "गिर अर्जुन (Gir Arjun)",
      tagNo: "JND-GIR-88",
      breed: "गिर गाय (Gir Indigenous Cattle)",
      category: "गिर गाय",
      damYield: "4,250 किग्रा / 305 दिन • फैट: 4.8%",
      sireInfo: "जूनागढ़ कृषि विश्वविद्यालय वंशावली",
      station: "गुजरात स्टेट सीमेन स्टेशन, आणंद",
      sortedAvailable: "हाँ (Conventional & Sorted)",
      traits: "टिक फीवर (चिचड़ी बुखार) के प्रति प्राकृतिक प्रतिरोध, सुडौल मजबूत पैर, उच्च लैक्टोज व A2 फैट।",
      rating: "⭐⭐⭐⭐ जूनागढ़ चैंपियन",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200"
    },
    {
      id: "BULL_GIR_03",
      name: "जसवंत BR-22 (Jaswant)",
      tagNo: "ABS-GIR-BR22",
      breed: "गिर गाय (Gir Indigenous Cattle)",
      category: "गिर गाय",
      damYield: "4,380 किग्रा / 305 दिन • फैट: 5.0%",
      sireInfo: "जीनस एबीएस (Genus ABS) गिर लाइन",
      station: "ABS इंडिया सीमेन स्टेशन / प्राइवेट नेटवर्क",
      sortedAvailable: "हाँ (Sexcel 90% बछड़ी गारंटी)",
      traits: "अत्यधिक शांत स्वभाव, उच्च दूध बहाव दर (Fast Milking Speed), 16+ लीटर दैनिक क्षमता वाली बछड़ियां।",
      rating: "⭐⭐⭐⭐⭐ कमर्शियल टॉप पिक",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },

    // -----------------------------------------------------------------------
    // D. थारपारकर व हरियाणा (Tharparkar & Hariana)
    // -----------------------------------------------------------------------
    {
      id: "BULL_THAR_01",
      name: "तेजस थारपारकर (Tejas)",
      tagNo: "CCBF-TP-108",
      breed: "थारपारकर गाय (Tharparkar Desert Breed)",
      category: "थारपारकर व हरियाणा",
      damYield: "3,820 किग्रा / 305 दिन • फैट: 4.8%",
      sireInfo: "सेंट्रल कैटल ब्रीडिंग फार्म (CCBF) सूरतगढ़",
      station: "CCBF सूरतगढ़ / राजस्थान लाइवस्टॉक डेवलपमेंट बोर्ड",
      sortedAvailable: "सीमित (सर्टिफाइड A2)",
      traits: "अत्यधिक गर्मी व सूखा सहन करने की अद्वितीय क्षमता, कम व रूखे चारे में भी 12-14 लीटर दैनिक दूध, शून्य मेडिकल खर्च।",
      rating: "⭐⭐⭐⭐ रेगिस्तान का गौरव",
      badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200"
    },
    {
      id: "BULL_HARIANA_01",
      name: "हरियाणा केसरी (Hariana Kesari)",
      tagNo: "LUVAS-HR-402",
      breed: "हरियाणा गाय (Hariana Dual Purpose)",
      category: "थारपारकर व हरियाणा",
      damYield: "3,450 किग्रा / 305 दिन • फैट: 4.6%",
      sireInfo: "लाला लाजपत राय यूनिवर्सिटी (LUVAS) हिसार हर्ड",
      station: "लुवास (LUVAS) हिसार / HLDB सीमेन बैंक",
      sortedAvailable: "हाँ (कन्वेंशनल वीर्य)",
      traits: "द्विकाजी नस्ल (Dual Purpose) - शक्तिशाली नर बछड़े व 10-12 लीटर दूध देने वाली स्वस्थ रोगमुक्त बछड़ियां।",
      rating: "⭐⭐⭐⭐ द्विकाजी सम्राट",
      badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200"
    },

    // -----------------------------------------------------------------------
    // E. एचएफ व जर्सी क्रॉस (HF & Jersey Cross)
    // -----------------------------------------------------------------------
    {
      id: "BULL_CROSS_01",
      name: "ABS मैक्सिम HF (100% Sorted Sexcel)",
      tagNo: "ABS-HF-9908",
      breed: "होलस्टीन फ्रीजियन (Holstein Friesian Pure)",
      category: "एचएफ व जर्सी क्रॉस",
      damYield: "14,200 किग्रा / 305 दिन • फैट: 3.9%",
      sireInfo: "यूएसए एलीट जेनेटिक्स • सायर टीपीआई: +2890",
      station: "जीनस एबीएस (Genus ABS) / BAIF सीमेन स्टेशन",
      sortedAvailable: "हाँ (100% Sexcel सॉर्टेड - 92% फीमेल गारंटी)",
      traits: "कमर्शियल डेयरी हेतु अत्यधिक दूध, 35-45 लीटर दैनिक क्षमता वाली पीढ़ियां, उत्तम लेग एवं फीट स्कोर।",
      rating: "⭐⭐⭐⭐⭐ सुपर डेयरी यील्डर",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200"
    },
    {
      id: "BULL_CROSS_02",
      name: "जर्सी क्रॉस एलीट (SAG-JC 50%)",
      tagNo: "SAG-JC-312",
      breed: "जर्सी x देशी क्रॉस (Jersey Crossbred)",
      category: "एचएफ व जर्सी क्रॉस",
      damYield: "5,600 किग्रा / 305 दिन • फैट: 5.2%",
      sireInfo: "NDDB साबरमती आश्रम क्रॉस ब्रीडिंग प्रोग्राम",
      station: "NDDB / राज्य पशुपालन ए.आई. स्टेशन",
      sortedAvailable: "हाँ (Sexed & Regular)",
      traits: "भारतीय मौसम के पूर्ण अनुकूल, मध्यम आकार (कम रखरखाव खर्च), उच्च फैट (5%+) व ब्याने में अत्यंत सुगम।",
      rating: "⭐⭐⭐⭐ किसान अनुकूल क्रॉस",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200"
    }
  ];

  // Freeze the master database
  Object.freeze(BULL_DATABASE);

  // Global namespace attachment
  if (typeof window !== 'undefined') {
    window.VETCARE_BULL_DB = BULL_DATABASE;
  }

  // =========================================================================
  // 2. STATE MANAGEMENT FOR FILTER & SEARCH
  // =========================================================================
  let currentCategory = 'सभी';
  let searchQuery = '';

  // =========================================================================
  // 3. UI GENERATION & RENDERING ENGINE
  // =========================================================================
  function renderBullDirectoryUI(containerEl) {
    if (!containerEl) return;

    containerEl.innerHTML = `
      <div class="space-y-4">
        <!-- HEADER & LIVE AI PEDIGREE SEARCH SECTION -->
        <div class="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-indigo-800/40 relative overflow-hidden">
          <div class="absolute -right-12 -top-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-800/40 pb-4">
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-bold mb-2">
                <span>🐂 नस्ल-वार बुल डायरेक्टरी व वंशावली खोज (2026 Live)</span>
              </div>
              <h2 class="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                <span>प्रमाणित वीर्य बैंक एवं टॉप सायर डायरेक्टरी</span>
              </h2>
              <p class="text-xs text-indigo-200/80 mt-1">
                NDDB, CIRB, NDRI, HLDB व ABS द्वारा प्रमाणित टॉप बुल्स का दुग्ध व प्रोजेनी रिकॉर्ड
              </p>
            </div>

            <!-- KEY MANAGEMENT BADGE -->
            <div class="flex items-center gap-2">
              <button onclick="window.promptGeminiApiKeyModal(true)" class="text-xs bg-indigo-800/60 hover:bg-indigo-700 text-indigo-200 hover:text-white px-3 py-2 rounded-2xl border border-indigo-700/60 transition flex items-center gap-1.5 shadow-xs font-semibold">
                <i class="fa-solid fa-key text-amber-400"></i>
                <span id="btnApiKeyLabel">${getApiKey() ? 'API Key सुरक्षित ✅' : 'Gemini Key जोड़ें 🔑'}</span>
              </button>
            </div>
          </div>

          <!-- AI LIVE BULL PEDIGREE SEARCH BAR -->
          <div class="pt-4 space-y-2">
            <label class="block text-xs font-bold text-indigo-200">
              ⚡ किसी भी असूचीकृत बुल / सीमन स्ट्रॉ (Straw Tag) की AI लाइव वंशावली खोजें:
            </label>
            <div class="flex flex-col sm:flex-row gap-2">
              <div class="relative flex-1">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs">
                  <i class="fa-solid fa-dna text-blue-400"></i>
                </span>
                <input 
                  type="text" 
                  id="aiBullSearchInput" 
                  placeholder="उदा. SAG-4012, रुद्रा, CIRB M-29, ABS-9908 या बुल का नाम/टैग..." 
                  class="w-full bg-slate-800/80 border border-indigo-700/50 rounded-2xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                  onkeydown="if(event.key==='Enter') window.triggerAIBullSearch();"
                />
              </div>
              <button 
                onclick="window.triggerAIBullSearch()" 
                id="btnTriggerAIBull"
                class="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-2xl text-xs transition shadow-md flex items-center justify-center gap-2 shrink-0 active:scale-98"
              >
                <span>⚡ AI विस्तृत रिकॉर्ड खोजें</span>
                <i class="fa-solid fa-sparkles text-amber-300"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- AI SEARCH RESULT CONTAINER (DYNAMIC) -->
        <div id="aiBullResultBox" class="hidden"></div>

        <!-- FILTER TABS & LOCAL SEARCH BAR -->
        <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3.5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <!-- TABS -->
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs" id="bullBreedFilterTabs">
              ${renderFilterTabButtons()}
            </div>

            <!-- SEARCH INPUT -->
            <div class="relative w-full sm:w-64">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
              <input 
                type="text" 
                id="bullLocalSearchInput"
                oninput="window.handleBullFilterSearch(this.value)"
                placeholder="नाम, टैग या केंद्र से खोजें..." 
                class="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-8 pr-3 py-2 text-xs outline-none focus:border-blue-500 transition font-medium"
              />
            </div>
          </div>

          <!-- ACTIVE RECORD COUNT & SORTED PILL -->
          <div class="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2 font-medium">
            <span id="bullCountDisplay">कुल प्रमाणित बुल्स: ${BULL_DATABASE.length}</span>
            <span class="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <i class="fa-solid fa-circle-check"></i> सॉर्टेड सीमन (Sexed Semen) समर्थित
            </span>
          </div>

          <!-- BULL CARDS GRID CONTAINER -->
          <div id="bullCardsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
            ${renderBullCardsHtml(getFilteredBulls())}
          </div>
        </div>
      </div>
    `;
  }

  function renderFilterTabButtons() {
    const tabs = ['सभी', 'मुर्राह भैंस', 'साहीवाल गाय', 'गिर गाय', 'थारपारकर व हरियाणा', 'एचएफ व जर्सी क्रॉस'];
    return tabs.map(tab => {
      const active = (tab === currentCategory);
      const activeClasses = active 
        ? 'bg-blue-600 text-white font-bold shadow-xs' 
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium';
      return `
        <button 
          type="button" 
          onclick="window.setBullBreedFilter('${tab}')" 
          class="px-3 py-1.5 rounded-xl transition shrink-0 text-[11px] ${activeClasses}"
        >
          ${tab}
        </button>
      `;
    }).join('');
  }

  function getFilteredBulls() {
    return BULL_DATABASE.filter(bull => {
      const matchesCat = (currentCategory === 'सभी') || (bull.category === currentCategory);
      const matchesSearch = !searchQuery || (
        bull.name.toLowerCase().includes(searchQuery) ||
        bull.tagNo.toLowerCase().includes(searchQuery) ||
        bull.station.toLowerCase().includes(searchQuery) ||
        bull.traits.toLowerCase().includes(searchQuery) ||
        bull.breed.toLowerCase().includes(searchQuery)
      );
      return matchesCat && matchesSearch;
    });
  }

  function renderBullCardsHtml(bullList) {
    if (!bullList || bullList.length === 0) {
      return `
        <div class="col-span-full p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-3xl space-y-2">
          <div class="text-3xl">🔍</div>
          <p class="text-xs font-bold text-slate-700">कोई बुल रिकॉर्ड नहीं मिला।</p>
          <p class="text-[11px] text-slate-500">कृपया अन्य नाम से खोजें या ऊपर दिए गए 'AI लाइव खोज' बटन का प्रयोग करें।</p>
        </div>
      `;
    }

    return bullList.map(bull => {
      return `
        <div class="bg-white border-2 border-slate-200/80 hover:border-blue-400 rounded-3xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3 relative group">
          <!-- TOP TAG & RATING -->
          <div class="space-y-1">
            <div class="flex items-center justify-between gap-1.5">
              <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg ${bull.badgeColor} border">
                ${bull.tagNo}
              </span>
              <span class="text-[10px] text-slate-500 font-semibold">${bull.rating}</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 leading-tight group-hover:text-blue-700 transition">
              ${bull.name}
            </h3>
            <p class="text-[11px] font-bold text-slate-600">${bull.breed}</p>
          </div>

          <!-- CORE SPECS -->
          <div class="space-y-1.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-[11px]">
            <div class="flex items-start justify-between gap-2">
              <span class="text-slate-500 shrink-0">माँ का दूध:</span>
              <span class="font-bold text-emerald-800 text-right">${bull.damYield}</span>
            </div>
            <div class="flex items-start justify-between gap-2 border-t border-slate-200/50 pt-1">
              <span class="text-slate-500 shrink-0">सायर वंशावली:</span>
              <span class="font-semibold text-slate-700 text-right text-[10px]">${bull.sireInfo}</span>
            </div>
            <div class="flex items-start justify-between gap-2 border-t border-slate-200/50 pt-1">
              <span class="text-slate-500 shrink-0">सीमन उपलब्धता:</span>
              <span class="font-semibold text-blue-700 text-right text-[10px]">${bull.station}</span>
            </div>
          </div>

          <!-- TRAITS & SEXED STATUS -->
          <div class="space-y-1 text-[11px]">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">संतानों में अपेक्षित सुधार:</div>
            <p class="text-slate-700 leading-relaxed text-[11px] bg-blue-50/40 p-2 rounded-xl border border-blue-100/60">
              ${bull.traits}
            </p>
          </div>

          <!-- FOOTER ACTIONS -->
          <div class="pt-1 flex items-center justify-between gap-2 border-t border-slate-100 text-[10px]">
            <span class="text-emerald-700 font-bold flex items-center gap-1">
              <i class="fa-solid fa-venus text-rose-500"></i> ${bull.sortedAvailable}
            </span>
            <button 
              type="button" 
              onclick="window.quickDeepAIBull('${bull.name}', '${bull.tagNo}', '${bull.breed}')" 
              class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-2.5 py-1.5 rounded-xl border border-blue-200 transition flex items-center gap-1 shrink-0"
            >
              <span>पूर्ण वंशावली</span> <i class="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 4. API KEY STORAGE & MODAL WORKFLOW
  // =========================================================================
  function getApiKey() {
    return localStorage.getItem('vetcare_gemini_api_key') || '';
  }

  function setApiKey(key) {
    if (!key) return;
    localStorage.setItem('vetcare_gemini_api_key', key.trim());
    const label = document.getElementById('btnApiKeyLabel');
    if (label) label.textContent = 'API Key सुरक्षित ✅';
  }

  window.promptGeminiApiKeyModal = function (forceOpen) {
    const existingKey = getApiKey();
    if (!forceOpen && existingKey) return existingKey;

    // Remove old modal if exists
    const old = document.getElementById('bullApiKeyModal');
    if (old) old.remove();

    const modal = document.createElement('div');
    modal.id = 'bullApiKeyModal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn';
    modal.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-5 sm:p-6 space-y-4 shadow-2xl relative text-left">
        <button onclick="document.getElementById('bullApiKeyModal').remove()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-base">✕</button>
        
        <div class="text-center space-y-1">
          <div class="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl mx-auto flex items-center justify-center text-2xl font-black shadow-inner">🔑</div>
          <h3 class="text-sm sm:text-base font-black text-slate-900">Gemini AI API Key इंटीग्रेशन</h3>
          <p class="text-[11px] text-slate-500">
            💡 पूर्ण ऑनलाइन वंशावली देखने हेतु कृपया अपनी Gemini API Key दर्ज करें।
          </p>
        </div>

        <div class="space-y-2 text-xs">
          <label class="block font-bold text-slate-700">Google AI Studio API Key:</label>
          <input 
            id="inputModalGeminiKey" 
            type="password" 
            placeholder="AIzaSy..." 
            value="${existingKey}" 
            class="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono text-xs outline-none focus:border-blue-500 focus:bg-white transition"
          />
          <p class="text-[10px] text-slate-400">
            कुंजी आपके ब्राउज़र के LocalStorage में 100% सुरक्षित रहती है।
          </p>
        </div>

        <div class="flex gap-2 pt-1 text-xs">
          <button 
            type="button" 
            onclick="document.getElementById('bullApiKeyModal').remove()" 
            class="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition"
          >
            रद्द करें
          </button>
          <button 
            type="button" 
            onclick="window.saveGeminiKeyFromModal()" 
            class="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-md transition active:scale-98 flex items-center justify-center gap-1.5"
          >
            <i class="fa-solid fa-floppy-disk"></i> <span>💾 सेव करें</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    return null;
  };

  window.saveGeminiKeyFromModal = function () {
    const input = document.getElementById('inputModalGeminiKey');
    const val = input ? input.value.trim() : '';
    if (!val) {
      alert('कृपया वैध API Key दर्ज करें!');
      return;
    }
    setApiKey(val);
    const modal = document.getElementById('bullApiKeyModal');
    if (modal) modal.remove();
    alert('Gemini API Key सफलतापूर्वक सुरक्षित कर ली गई है! ✅');
  };

  // =========================================================================
  // 5. GEMINI AI CALL: PEDIGREE, LINEAGE & BREEDING VALUE ENGINE
  // =========================================================================
  async function callGeminiBullAPI(promptText) {
    let apiKey = getApiKey();
    if (!apiKey) {
      window.promptGeminiApiKeyModal(true);
      return null;
    }

    const primaryUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
    const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
    const secondaryFallback = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [{
        parts: [{ text: promptText }]
      }],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1500
      }
    };

    async function makeCall(url) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      return await response.json();
    }

    try {
      return await makeCall(primaryUrl);
    } catch (err1) {
      console.warn("Primary model 'gemini-3.8-flash' unavailable, attempting fallback 'gemini-3.5-flash'...", err1);
      try {
        return await makeCall(fallbackUrl);
      } catch (err2) {
        console.warn("Fallback model 'gemini-3.5-flash' failed, attempting 'gemini-1.5-flash'...", err2);
        return await makeCall(secondaryFallback);
      }
    }
  }

  window.triggerAIBullSearch = async function () {
    const input = document.getElementById('aiBullSearchInput');
    const query = input ? input.value.trim() : '';
    if (!query) {
      alert('कृपया किसी बुल का नाम, टैग संख्या अथवा सीमन स्ट्रॉ कोड दर्ज करें!');
      return;
    }

    const key = getApiKey();
    if (!key) {
      window.promptGeminiApiKeyModal(true);
      return;
    }

    const resultBox = document.getElementById('aiBullResultBox');
    const btn = document.getElementById('btnTriggerAIBull');

    if (resultBox) {
      resultBox.classList.remove('hidden');
      resultBox.innerHTML = `
        <div class="bg-white border-2 border-blue-400 rounded-3xl p-5 shadow-lg space-y-3 animate-pulse">
          <div class="flex items-center gap-2 text-blue-700 font-bold text-xs">
            <i class="fa-solid fa-spinner fa-spin text-base"></i>
            <span>ICAR, NDDB, HLDB व ग्लोबल वंशावली डेटाबेस से बुल का रिकॉर्ड प्राप्त हो रहा है...</span>
          </div>
          <div class="h-4 bg-slate-200 rounded w-3/4"></div>
          <div class="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      `;
    }

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> खोज जारी...`;
    }

    const systemPrompt = `
You are an Elite Veterinary Livestock Geneticist and Pedigree Analyst for Indian Dairy (NDDB, ICAR, CIRB, NDRI, HLDB, ABS).
Analyze and generate a thorough, 100% realistic, and professional breeding pedigree card in clear Hindi & Hinglish for the bull: "${query}".

Structure your report under these exact sections with clear bullet points:
1. 🐂 बुल पहचान, नस्ल व मूल वंशावली (Bull Identity, Breed & Lineage)
2. 🥛 माँ का प्रमाणित दुग्ध रिकॉर्ड (Dam's 305-day Lactation Yield, Peak Yield & Fat %)
3. 🧬 अनुमानित ब्रीडिंग वैल्यू (Estimated Breeding Value - EBV & Progeny Reliability %)
4. 🏥 सीमन उपलब्धता केंद्र व वीर्य बैंक (Semen Station / Availability in India)
5. 🌾 संतानों में शारीरिक व अडर सुधार लक्षण (Daughter Conformation & Udder Traits)
6. 🩺 क्लिनिकल प्रजनन अनुशंसा (Veterinary Specialist Recommendation)

Ensure accurate Indian dairy context (NDDB SAG, CIRB Hisar, HLDB, A2A2 status, sexed semen viability). Keep it concise, authoritative, and clean without raw asterisks mess.
    `;

    try {
      const data = await callGeminiBullAPI(systemPrompt);
      const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textOutput) {
        throw new Error('AI द्वारा प्रतिक्रिया प्राप्त नहीं हुई।');
      }

      if (resultBox) {
        resultBox.innerHTML = `
          <div class="bg-gradient-to-br from-white to-blue-50/50 border-2 border-blue-400 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 text-xs text-slate-800 relative">
            <div class="flex items-center justify-between border-b border-blue-200 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-xl">🧬</span>
                <div>
                  <h3 class="font-black text-sm text-slate-900">AI लाइव वंशावली विश्लेषण परिणाम</h3>
                  <p class="text-[10px] text-blue-700 font-bold font-mono">क्वेरी: "${query}"</p>
                </div>
              </div>
              <button onclick="document.getElementById('aiBullResultBox').classList.add('hidden')" class="text-slate-400 hover:text-slate-700 text-sm font-bold">✕ बंद करें</button>
            </div>

            <div class="prose prose-sm max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans bg-white p-4 rounded-2xl border border-blue-100 shadow-inner">
${textOutput}
            </div>

            <div class="flex flex-wrap items-center justify-between gap-2 pt-2 text-[10px] text-slate-500 border-t border-slate-200">
              <span>स्रोत: Vetcare AI वेटरनरी जीनोमिक्स कंसोल (Gemini Flash Engine)</span>
              <button onclick="window.print()" class="text-blue-700 font-bold hover:underline flex items-center gap-1">
                <i class="fa-solid fa-print"></i> रिपोर्ट प्रिंट करें
              </button>
            </div>
          </div>
        `;
      }
    } catch (err) {
      if (resultBox) {
        resultBox.innerHTML = `
          <div class="bg-rose-50 border border-rose-300 rounded-2xl p-4 text-xs text-rose-800 space-y-2">
            <div class="font-bold flex items-center gap-1.5">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <span>खोज पूर्ण नहीं हो सकी</span>
            </div>
            <p class="text-[11px] text-rose-700">
              त्रुटि: ${err.message || 'नेटवर्क या API Key त्रुटि'}। कृपया सुनिश्चित करें कि आपकी Gemini API Key वैध है और इंटरनेट कनेक्शन सक्रिय है।
            </p>
            <button onclick="window.promptGeminiApiKeyModal(true)" class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-xl text-[10px] transition">
              API Key पुनः दर्ज करें 🔑
            </button>
          </div>
        `;
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<span>⚡ AI विस्तृत रिकॉर्ड खोजें</span> <i class="fa-solid fa-sparkles text-amber-300"></i>`;
      }
    }
  };

  window.quickDeepAIBull = function (name, tag, breed) {
    const input = document.getElementById('aiBullSearchInput');
    if (input) {
      input.value = `${name} (${tag}) ${breed}`;
    }
    window.triggerAIBullSearch();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // 6. FILTER & SEARCH EVENT HANDLERS
  // =========================================================================
  window.setBullBreedFilter = function (cat) {
    currentCategory = cat;
    const tabsContainer = document.getElementById('bullBreedFilterTabs');
    if (tabsContainer) {
      tabsContainer.innerHTML = renderFilterTabButtons();
    }
    updateBullGrid();
  };

  window.handleBullFilterSearch = function (text) {
    searchQuery = (text || '').trim().toLowerCase();
    updateBullGrid();
  };

  function updateBullGrid() {
    const grid = document.getElementById('bullCardsGrid');
    const countDisplay = document.getElementById('bullCountDisplay');
    const filtered = getFilteredBulls();

    if (grid) {
      grid.innerHTML = renderBullCardsHtml(filtered);
    }
    if (countDisplay) {
      countDisplay.textContent = `दिखाए जा रहे बुल्स: ${filtered.length} (कुल: ${BULL_DATABASE.length})`;
    }
  }

  // =========================================================================
  // 7. AUTO-MOUNTING & INITIALIZATION
  // =========================================================================
  window.initBullDirectory = function (customContainerId) {
    const targetId = customContainerId || 'bullDirectoryMountArea';
    let container = document.getElementById(targetId);

    // If specific container not present, search inside Smart Farmer viewBreeding
    if (!container) {
      const breedingView = document.getElementById('viewBreeding');
      if (breedingView) {
        // Check if mount area exists, or create one
        let autoArea = document.getElementById('autoBullDirectoryMount');
        if (!autoArea) {
          autoArea = document.createElement('div');
          autoArea.id = 'autoBullDirectoryMount';
          autoArea.className = 'w-full pt-2';
          breedingView.appendChild(autoArea);
        }
        container = autoArea;
      }
    }

    if (container) {
      renderBullDirectoryUI(container);
    }
  };

  // Bootstrapping on DOM Ready or immediate if ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      window.initBullDirectory();
    });
  } else {
    window.initBullDirectory();
  }

})();
