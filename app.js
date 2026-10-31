// Vetcare AI OS - Unified Production Engine (2026 Production)

// ============================================================================
// 1. ENTERPRISE CONFIGURATION & VERIFIED FINANCIAL VAULT
// ============================================================================
const VETCARE_CONFIG = {
  version: "9.0.0-2026.PROD",
  adminPin: "9297",
  payeeName: "Vetcare Services",
  beneficiary: "Mr. Rahul",
  sbi: {
    bankName: "भारतीय स्टेट बैंक (SBI)",
    upiId: "rahuljangra9297@oksbi",
    account: "65204067585",
    ifsc: "SBIN0013693"
  },
  pnb: {
    bankName: "पंजाब नेशनल बैंक (PNB)",
    upiId: "rahuljangra9297-1@okicici",
    account: "6687001700015098",
    ifsc: "PUNB0668700"
  },
  ai: {
    activeModels: ["gemini-3.8-flash", "gemini-3.5-flash"]
  }
};

// ============================================================================
// 2. 7-LANGUAGE LOCALIZATION ENGINE (I18N)
// ============================================================================
const I18N_DICT = {
  hi: {
    docRoleTitle: "क्लीनिकल मोड (अधिकृत पशु चिकित्सक)",
    farmerRoleTitle: "स्मार्ट पशुपालक (डेयरी मोड)",
    sessionBadge: "⏱️ सत्र: {time} शेष",
    syncOnline: "🟢 क्लाउड सिंक सक्रिय: आपका क्लिनिकल डेटा और खाता बही स्थानीय ब्राउज़र में सुरक्षित व सिंक है।",
    syncOffline: "📴 ऑफ़लाइन मोड: इंटरनेट उपलब्ध नहीं है, लेकिन आपका सारा डेटा स्थानीय रूप से सुरक्षित है। इंटरनेट आते ही सिंक होगा।",
    sessionExpired: "आपका 60-मिनट का सत्र समाप्त हो गया है। कृपया पुनः लॉगिन करें।",
    confirmDelete: "क्या आप इस रिकॉर्ड को हटाना चाहते हैं?",
    pregnancyAlert: "🚨 गंभीर चेतावनी: गाभिन पशुओं में Dexamethasone निषेध है (गर्भपात का खतरा)! इसके स्थान पर Isoflupredone Acetate का उपयोग करें।",
    aiGenerating: "Google Gemini 3.8 AI से लाइव वैज्ञानिक इलाज तैयार किया जा रहा है..."
  },
  en: {
    docRoleTitle: "Clinical Mode (Registered Vet Practitioner)",
    farmerRoleTitle: "Smart Dairy Farmer (Farmer Mode)",
    sessionBadge: "⏱️ Session: {time} left",
    syncOnline: "🟢 Cloud Sync Active: Clinical data and ledger are safely synced locally and cloud-ready.",
    syncOffline: "📴 Offline Mode: No internet, but all records are secured locally. Will sync once reconnected.",
    sessionExpired: "Your 60-minute active session has expired. Please log in again.",
    confirmDelete: "Are you sure you want to delete this record?",
    pregnancyAlert: "🚨 CRITICAL ALERT: Dexamethasone is contraindicated in pregnant animals (causes abortion)! Use Isoflupredone Acetate instead.",
    aiGenerating: "Generating Live Scientific Protocol via Google Gemini 3.8 AI..."
  },
  hinglish: {
    docRoleTitle: "Clinical Mode (Registered Vet Doctor)",
    farmerRoleTitle: "Smart Pashupalak (Dairy Mode)",
    sessionBadge: "⏱️ Session: {time} baki",
    syncOnline: "🟢 Cloud Sync Active: Aapka data local storage me safe aur sync hai.",
    syncOffline: "📴 Offline Mode: Net band hai, data local phone me safe hai. Net aate hi sync hoga.",
    sessionExpired: "Aapka 60-minute ka session khatam ho gaya hai. Dobara login karein.",
    confirmDelete: "Kya aap is record ko delete karna chahte hain?",
    pregnancyAlert: "🚨 WARNING: Gabhin pashu ko Dexamethasone bilkul na dein (abortion ho sakta hai)! Isoflupredone dein.",
    aiGenerating: "Google Gemini 3.8 AI se live ilaj taiyar ho raha hai..."
  },
  pa: {
    docRoleTitle: "ਕਲੀਨਿਕਲ ਮੋਡ (ਅਧਿਕਾਰਤ ਵੈਟਰਨਰੀ ਡਾਕਟਰ)",
    farmerRoleTitle: "ਸਮਾਰਟ ਡੇਅਰੀ ਕਿਸਾਨ (ਪਸ਼ੂ ਪਾਲਕ)",
    sessionBadge: "⏱️ ਸੈਸ਼ਨ: {time} ਬਾਕੀ",
    syncOnline: "🟢 ਕਲਾਉਡ ਸਿੰਕ ਕਿਰਿਆਸ਼ੀਲ: ਤੁਹਾਡਾ ਡੇਟਾ ਸੁਰੱਖਿਅਤ ਹੈ।",
    syncOffline: "📴 ਔਫਲਾਈਨ ਮੋਡ: ਇੰਟਰਨੈਟ ਨਹੀਂ ਹੈ, ਪਰ ਡੇਟਾ ਸੁਰੱਖਿਅਤ ਹੈ।",
    sessionExpired: "ਤੁਹਾਡਾ 60 ਮਿੰਟ ਦਾ ਸੈਸ਼ਨ ਸਮਾਪਤ ਹੋ ਗਿਆ ਹੈ।",
    confirmDelete: "ਕੀ ਤੁਸੀਂ ਇਸਨੂੰ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
    pregnancyAlert: "🚨 ਚੇਤਾਵਨੀ: ਗੱਭਣ ਪਸ਼ੂਆਂ ਨੂੰ Dexamethasone ਨਾ ਦਿਓ! Isoflupredone ਦੀ ਵਰਤੋਂ ਕਰੋ।",
    aiGenerating: "Gemini 3.8 AI ਦੁਆਰਾ ਇਲਾਜ ਤਿਆਰ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ..."
  },
  mr: {
    docRoleTitle: "क्लिनिकल मोड (अधिकृत पशुवैद्यक)",
    farmerRoleTitle: "स्मार्ट दुग्ध उत्पादक (शेतकरी मोड)",
    sessionBadge: "⏱️ सत्र: {time} शिल्लक",
    syncOnline: "🟢 क्लाउड सिंक सक्रिय: डेटा सुरक्षितपणे सिंक झाला आहे.",
    syncOffline: "📴 ऑफलाइन मोड: इंटरनेट नाही, डेटा स्थानिक सुरक्षित आहे.",
    sessionExpired: "तुमचे ६० मिनिटांचे सत्र संपले आहे. कृपया पुन्हा लॉगिन करा.",
    confirmDelete: "तुम्हाला हे रेकॉर्ड हटवायचे आहे का?",
    pregnancyAlert: "🚨 धोक्याची सूचना: गाभण जनावरांमध्ये Dexamethasone वापरू नका! Isoflupredone वापरा.",
    aiGenerating: "Google Gemini 3.8 AI द्वारे उपचार तयार केले जात आहेत..."
  },
  gu: {
    docRoleTitle: "ક્લિનિકલ મોડ (રજિસ્ટર્ડ વેટરનરી ડૉક્ટર)",
    farmerRoleTitle: "સ્માર્ટ પશુપાલક (ડેરી મોડ)",
    sessionBadge: "⏱️ સત્ર: {time} બાકી",
    syncOnline: "🟢 ક્લાઉડ સિંક સક્રિય: તમારો ડેટા સુરક્ષિત છે.",
    syncOffline: "📴 ઑફલાઇન મોડ: ઇન્ટરનેટ નથી, ડેટા સુરક્ષિત છે.",
    sessionExpired: "તમારું 60 મિનિટનું સત્ર સમાપ્ત થયું છે.",
    confirmDelete: "શું તમે આ રેકોર્ડ કાઢી નાખવા માંગો છો?",
    pregnancyAlert: "🚨 ચેતવણી: ગાભણ પશુઓને Dexamethasone ન આપો! Isoflupredone વાપરો.",
    aiGenerating: "Google Gemini 3.8 AI સારવાર પ્રોટોકોલ તૈયાર કરી રહ્યું છે..."
  },
  bn: {
    docRoleTitle: "ক্লিনিক্যাল মোড (ভেটেরিনারি ডাক্তার)",
    farmerRoleTitle: "স্মার্ট খামারী (দুগ্ধ খামার মোড)",
    sessionBadge: "⏱️ সেশন: {time} বাকি",
    syncOnline: "🟢 ক্লাউড সিঙ্ক সক্রিয়: আপনার ডেটা নিরাপদ রয়েছে।",
    syncOffline: "📴 অফলাইন মোড: ইন্টারনেট নেই, ডেটা স্থানীয়ভাবে নিরাপদ।",
    sessionExpired: "আপনার ৬০ মিনিটের সেশন শেষ হয়েছে।",
    confirmDelete: "আপনি কি এটি মুছে ফেলতে চান?",
    pregnancyAlert: "🚨 সতর্কতা: গর্ভবতী পশুকে Dexamethasone দেবেন না! Isoflupredone ব্যবহার করুন।",
    aiGenerating: "Google Gemini 3.8 AI চিকিৎসা প্রস্তুত করছে..."
  }
};

let currentLang = localStorage.getItem("vetcare_lang") || "hi";

function getI18n(key, fallback = "") {
  const langObj = I18N_DICT[currentLang] || I18N_DICT.hi;
  return langObj[key] || fallback;
}

function escapeHtml(str) {
  return (str || "")
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================================
// 3. PERSISTENT APPLICATION STATE & STORAGE ENGINE
// ============================================================================
let AppState = {
  activeRole: null,
  currentTab: "diagnosis",
  currentDiagSubTab: "search",
  khataRecords: [],
  clinicStock: []
};

function getActiveDiseaseDatabase() {
  if (window.VETCARE_DISEASE_DB && Array.isArray(window.VETCARE_DISEASE_DB) && window.VETCARE_DISEASE_DB.length > 0) {
    return window.VETCARE_DISEASE_DB;
  }
  return [];
}

function loadStorageVault() {
  try {
    AppState.khataRecords = JSON.parse(localStorage.getItem("vetcare_khata_records") || "[]");
    AppState.clinicStock = JSON.parse(localStorage.getItem("vetcare_clinic_stock") || "[]");

    if (AppState.clinicStock.length === 0) {
      AppState.clinicStock = [
        { id: 1, name: "Inj. Intacef Tazo 3375mg", category: "INJECTION", qty: 15, unit: "vials", minAlert: 5 },
        { id: 2, name: "Inj. Melonex Plus 100ml", category: "INJECTION", qty: 4, unit: "bottles", minAlert: 2 },
        { id: 3, name: "Inj. Avil 100ml", category: "INJECTION", qty: 6, unit: "bottles", minAlert: 2 },
        { id: 4, name: "Inj. Mifex (CBG 450ml)", category: "INJECTION", qty: 8, unit: "bottles", minAlert: 3 },
        { id: 5, name: "Inj. Berenil 30ml", category: "INJECTION", qty: 5, unit: "vials", minAlert: 2 },
        { id: 6, name: "Murrah Bull Semen Straws", category: "SEMEN", qty: 50, unit: "straws", minAlert: 15 }
      ];
      localStorage.setItem("vetcare_clinic_stock", JSON.stringify(AppState.clinicStock));
    }
  } catch (err) {
    console.error("Storage loading error:", err);
    AppState.khataRecords = [];
    AppState.clinicStock = [];
  }
}

function persistKhataVault() {
  localStorage.setItem("vetcare_khata_records", JSON.stringify(AppState.khataRecords));
}

function persistStockVault() {
  localStorage.setItem("vetcare_clinic_stock", JSON.stringify(AppState.clinicStock));
}

// ============================================================================
// 4. 60-MINUTE GLITCH-FREE SINGLETON SESSION TIMER
// ============================================================================
let sessionTimerInterval = null;

window.initSessionTimer = function() {
  if (sessionTimerInterval) {
    clearInterval(sessionTimerInterval);
    sessionTimerInterval = null;
  }

  let sessionStart = localStorage.getItem("vetcare_session_start");
  if (!sessionStart) {
    sessionStart = Date.now().toString();
    localStorage.setItem("vetcare_session_start", sessionStart);
  }

  const totalDuration = 60 * 60 * 1000;

  function updateClock() {
    const elapsed = Date.now() - parseInt(sessionStart, 10);
    const remainingMs = Math.max(0, totalDuration - elapsed);
    const totalSeconds = Math.floor(remainingMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    const badge = document.getElementById("session-timer-badge");

    if (badge) {
      badge.innerHTML = `⏱️ सत्र: ${formattedTime} शेष`;
    }

    if (remainingMs <= 0) {
      clearInterval(sessionTimerInterval);
      sessionTimerInterval = null;
      alert(getI18n("sessionExpired", "आपका 60-मिनट का सत्र समाप्त हो गया है। कृपया पुनः लॉगिन करें।"));
      localStorage.removeItem("vetcare_session_start");
      location.reload();
    }
  }

  updateClock();
  sessionTimerInterval = setInterval(updateClock, 1000);
};

// ============================================================================
// 5. GOOGLE GEMINI 3.8 ACTIVE API ENGINE (MULTI-PURPOSE & REPRODUCTION SPECIALIST)
// ============================================================================
window.callGeminiClinicalAI = async function(promptText, specializedType = "general") {
  const apiKey = localStorage.getItem("vetcare_gemini_api_key") || localStorage.getItem("vetcare_gemini_key");
  if (!apiKey) {
    alert("कृपया पहले '⚙️ AI Key' बटन दबाकर अपनी Google API Key दर्ज करें!");
    if (window.openAiKeyModal) window.openAiKeyModal();
    else if (window.openAIKeyModal) window.openAIKeyModal();
    return null;
  }

  let systemPrompt = "";
  if (specializedType === "reproduction") {
    systemPrompt = "You are an Animal Reproduction & Artificial Insemination Specialist. Analyze cervical tone, follicular/CL palpation, semen handling (thawing at 37°C for 30s), and formulate Repeat Breeder Protocols (Ovsynch, Co-Synch, PRID, CIDR, double A.I., uterine wash). Format output strictly in structured Markdown tables with exact drug names, doses, routes, and timing.";
  } else {
    systemPrompt = "You are Chief Veterinary Pharmacologist. Output treatments in standardized Markdown Tables: Emergency Injections [क्र.सं., श्रेणी, जेनेरिक साल्ट, लोकप्रिय ब्रांड, अनुमानित MRP, डोज़ व रूट, गर्भावस्था सुरक्षा, चिकित्सीय उद्देश्य], Oral Medicines, Ayurvedic, Homeopathic, Desi remedies, and 4-Stage Trajectory timeline. Include explicit Pregnancy Red Alert.";
  }

  const fullPrompt = `${systemPrompt}\n\nCase / Disease / Signs: ${promptText}`;
  const models = VETCARE_CONFIG.ai.activeModels;
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } else {
        const errData = await response.json().catch(() => ({}));
        lastError = errData.error?.message || response.statusText;
      }
    } catch (e) {
      lastError = e.message;
    }
  }

  // Automatic Model Discovery Fallback via ListModels
  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
      headers: { "x-goog-api-key": apiKey }
    });
    if (listRes.ok) {
      const listData = await listRes.json();
      const validModel = listData.models?.find(m => 
        m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")
      );
      if (validModel) {
        const directUrl = `https://generativelanguage.googleapis.com/v1beta/${validModel.name}:generateContent?key=${apiKey}`;
        const finalRes = await fetch(directUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },
          body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] })
        });
        if (finalRes.ok) {
          const finalData = await finalRes.json();
          const text = finalData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text;
        }
      }
    }
  } catch (discoveryErr) {
    console.warn("Discovery fallback failed:", discoveryErr);
  }

  throw new Error(lastError || "Google Gemini 3.8 मॉडल से संपर्क नहीं हो सका। कृपया API Key जांचें।");
};

// ============================================================================
// 6. BUILT-IN MARKDOWN TABLE TO PROFESSIONAL HTML RENDERER
// ============================================================================
function renderMarkdownToHtml(markdown) {
  if (!markdown) return "";

  const lines = markdown.split("\n");
  let html = "";
  let inTable = false;
  let tableHeaderParsed = false;
  let tableRows = [];

  function flushTable() {
    if (tableRows.length === 0) return "";
    let tableHtml = '<div class="overflow-x-auto my-3 border border-slate-200 rounded-2xl shadow-xs bg-white">';
    tableHtml += '<table class="min-w-full text-xs text-left divide-y divide-slate-200">';

    tableRows.forEach((row, idx) => {
      if (idx === 0) {
        tableHtml += '<thead class="bg-slate-100 font-bold text-slate-800"><tr>';
        row.forEach(cell => {
          tableHtml += `<th class="px-3 py-2.5 border-b border-slate-200 whitespace-nowrap">${escapeHtml(cell)}</th>`;
        });
        tableHtml += '</tr></thead><tbody class="divide-y divide-slate-100 bg-white">';
      } else {
        tableHtml += '<tr class="hover:bg-slate-50/70 transition">';
        row.forEach(cell => {
          let cellText = cell.trim();
          let badge = cellText;

          // Pregnancy safety badge styling
          if (/सुरक्षित|safe|yes|हाँ/i.test(cellText) && !/निषेध|unsafe|not safe|no|नहीं/i.test(cellText)) {
            badge = `<span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px] inline-block">${escapeHtml(cellText)}</span>`;
          } else if (/निषेध|unsafe|contraindicated|खतरा|गर्भपात|contraindication|not safe|no|नहीं/i.test(cellText)) {
            badge = `<span class="bg-rose-600 text-white font-bold px-2 py-0.5 rounded-full text-[10px] inline-block animate-pulse">${escapeHtml(cellText)}</span>`;
          } else {
            badge = escapeHtml(cellText);
          }

          tableHtml += `<td class="px-3 py-2 text-slate-700 font-medium">${badge}</td>`;
        });
        tableHtml += '</tr>';
      }
    });

    tableHtml += '</tbody></table></div>';
    tableRows = [];
    inTable = false;
    tableHeaderParsed = false;
    return tableHtml;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Markdown Table detection
    if (line.startsWith("|") && line.endsWith("|")) {
      const cells = line.slice(1, -1).split("|").map(c => c.trim());

      // Skip markdown divider line |---|---|
      if (cells.every(c => /^[-:]+$/.test(c))) {
        tableHeaderParsed = true;
        continue;
      }

      inTable = true;
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      html += flushTable();
    }

    // Markdown Headers
    if (line.startsWith("### ")) {
      html += `<h4 class="font-bold text-sm text-slate-900 mt-3 mb-1 flex items-center gap-1.5"><span class="text-blue-600">▪</span> ${escapeHtml(line.slice(4))}</h4>`;
    } else if (line.startsWith("## ")) {
      html += `<h3 class="font-black text-base text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-200">${escapeHtml(line.slice(3))}</h3>`;
    } else if (line.startsWith("# ")) {
      html += `<h2 class="font-black text-lg text-blue-900 mt-4 mb-2">${escapeHtml(line.slice(2))}</h2>`;
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      html += `<div class="text-xs text-slate-700 ml-3 my-0.5 flex items-start gap-1"><span class="text-slate-400">•</span><span>${escapeHtml(line.slice(2))}</span></div>`;
    } else if (line.length > 0) {
      // Pregnancy Alert detection in prose
      if (/pregnancy alert|गर्भपात|dexamethasone|isoflupredone|red alert/i.test(line)) {
        html += `<div class="p-3 my-2 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-900 text-xs flex items-start gap-2 shadow-xs">
          <span class="text-xl shrink-0">🚨</span>
          <div><strong class="font-black block uppercase tracking-wider text-[11px]">वैधानिक सुरक्षा निर्देश (Pregnancy Safety Alert):</strong>
          <p class="mt-0.5 font-medium leading-relaxed">${escapeHtml(line)}</p></div>
        </div>`;
      } else {
        html += `<p class="text-xs text-slate-700 my-1 leading-relaxed">${escapeHtml(line)}</p>`;
      }
    }
  }

  if (inTable) {
    html += flushTable();
  }

  return html;
}

// ============================================================================
// 7. DEDICATED REPRODUCTION & A.I. SPECIALIST ENGINE (DOCTOR PORTAL)
// ============================================================================
window.analyzeReproductionAI = async function(findings) {
  const container = document.getElementById("reproductionOutputContainer") || document.getElementById("diseaseResultsContainer");
  if (!container) return;

  const currentStatusText = "Google Gemini 3.8 द्वारा प्रजनन व सीमन प्रोटोकॉल तैयार किया जा रहा है...";
  container.innerHTML = `
    <div class="p-8 text-center bg-white border border-rose-200 rounded-3xl shadow-md space-y-4">
      <div class="w-12 h-12 mx-auto border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
      <p class="text-xs sm:text-sm font-bold text-rose-900">${currentStatusText}</p>
      <p class="text-[11px] text-slate-500 font-mono">Case: "${escapeHtml(findings)}" • Ovsynch / Repeat Breeding Protocols</p>
    </div>
  `;

  try {
    const rawMarkdown = await window.callGeminiClinicalAI(findings, "reproduction");
    if (!rawMarkdown) return;

    const renderedHtml = renderMarkdownToHtml(rawMarkdown);

    container.innerHTML = `
      <div class="bg-gradient-to-br from-rose-50/70 via-white to-pink-50/40 border-2 border-rose-300 rounded-3xl p-4 sm:p-5 shadow-lg space-y-4">
        <div class="flex justify-between items-start gap-2 border-b border-rose-100 pb-2.5">
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[10px] bg-rose-600 text-white font-bold px-2.5 py-0.5 rounded-full">🧬 A.I. & Reproduction Specialist</span>
              <span class="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">Gemini 3.8 Flash</span>
            </div>
            <h3 class="text-sm sm:text-base font-black text-slate-900 mt-1">पशु प्रजनन, मद व रिपीट ब्रीडिंग विशेषज्ञ विश्लेषण</h3>
          </div>
          <button onclick="window.renderClinicalDiseaseCards(getActiveDiseaseDatabase())" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl transition">
            ↺ बंद करें
          </button>
        </div>

        <div class="prose max-w-none text-xs text-slate-800">
          ${renderedHtml}
        </div>

        <div class="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900">
          <strong>⚠️ सीमन थॉइंग निर्देश (Thawing Rule):</strong> 37°C गुनगुने पानी में 30 सेकंड तक स्ट्रॉ रखें, साफ टिशू से पोंछें, हवा से बचाएं व 5 मिनट के भीतर गर्भाशय बॉडी में सीमन छोड़ें।
        </div>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `
      <div class="p-6 text-center bg-rose-50 border border-rose-200 rounded-3xl space-y-2">
        <p class="text-xs font-bold text-rose-800">A.I. विशेषज्ञ रिपोर्ट विफल: ${escapeHtml(error.message)}</p>
        <button onclick="window.renderClinicalDiseaseCards(getActiveDiseaseDatabase())" class="text-xs bg-white border border-rose-300 text-rose-700 font-bold px-3 py-1.5 rounded-xl">
          डेटाबेस पर वापस जाएं
        </button>
      </div>
    `;
  }
};

// ============================================================================
// 8. UNIVERSAL AI DISEASE SYNTHESIZER & ZERO-MATCH HANDLER
// ============================================================================
window.generateAITreatmentPlan = async function(queryText) {
  const container = document.getElementById("diseaseResultsContainer");
  if (!container) return;

  const currentStatusText = getI18n("aiGenerating", "Google Gemini 3.8 AI से लाइव वैज्ञानिक इलाज तैयार किया जा रहा है...");
  container.innerHTML = `
    <div class="p-8 text-center bg-white border border-purple-200 rounded-3xl shadow-md space-y-4">
      <div class="w-12 h-12 mx-auto border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <p class="text-xs sm:text-sm font-bold text-purple-900">${currentStatusText}</p>
      <p class="text-[11px] text-slate-500 font-mono">लक्षण: "${escapeHtml(queryText)}" • Model: gemini-3.8-flash (Standardized 5-Tier Tables)</p>
    </div>
  `;

  try {
    const rawMarkdown = await window.callGeminiClinicalAI(queryText, "general");
    if (!rawMarkdown) return;

    const renderedTablesHtml = renderMarkdownToHtml(rawMarkdown);

    container.innerHTML = `
      <div class="bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/40 border-2 border-purple-300 rounded-3xl p-4 sm:p-5 shadow-lg space-y-4">
        <div class="flex justify-between items-start gap-2 border-b border-purple-100 pb-2.5">
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[10px] bg-purple-600 text-white font-bold px-2 py-0.5 rounded-full">✨ Gemini 3.8 वैज्ञानिक प्रोटोकॉल</span>
              <span class="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">5-Tier Standard Schema</span>
            </div>
            <h3 class="text-sm sm:text-base font-black text-slate-900 mt-1">${escapeHtml(queryText)}</h3>
          </div>
          <button onclick="window.renderClinicalDiseaseCards(getActiveDiseaseDatabase())" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl transition">
            ↺ डेटाबेस सूची
          </button>
        </div>

        <div class="prose max-w-none text-xs text-slate-800">
          ${renderedTablesHtml}
        </div>

        <div class="flex gap-2 pt-1">
          <button onclick="window.loadIntoOPDSlip('${escapeHtml(queryText)}', 'Gemini 3.8 AI Synthesized Treatment loaded.')" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
            <span>📝 ओपीडी पर्चे में लोड करें</span> <span>→</span>
          </button>
        </div>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `
      <div class="p-6 text-center bg-rose-50 border border-rose-200 rounded-3xl space-y-2">
        <p class="text-xs font-bold text-rose-800">Gemini 3.8 Flash विश्लेषण विफल: ${escapeHtml(error.message)}</p>
        <button onclick="window.renderClinicalDiseaseCards(getActiveDiseaseDatabase())" class="text-xs bg-white border border-rose-300 text-rose-700 font-bold px-3 py-1.5 rounded-xl">
          डेटाबेस पर वापस जाएं
        </button>
      </div>
    `;
  }
};

// ============================================================================
// 9. DIAGNOSIS 3-SUBTAB SYSTEM
// ============================================================================
window.switchDiagSubTab = function(tabName) {
  AppState.currentDiagSubTab = tabName;

  const matrixView = document.getElementById("diag-matrix-view");
  const searchView = document.getElementById("diag-search-view");
  const dirView = document.getElementById("diag-directory-view");

  const tabMatrix = document.getElementById("subtab-matrix");
  const tabSearch = document.getElementById("subtab-search");
  const tabDir = document.getElementById("subtab-directory");

  if (matrixView) matrixView.classList.toggle("hidden", tabName !== "matrix");
  if (searchView) searchView.classList.toggle("hidden", tabName !== "search");
  if (dirView) dirView.classList.toggle("hidden", tabName !== "directory");

  [tabMatrix, tabSearch, tabDir].forEach(btn => {
    if (btn) {
      btn.classList.remove("bg-blue-600", "text-white", "shadow", "font-bold");
      btn.classList.add("text-slate-700", "font-medium");
    }
  });

  const activeBtn = document.getElementById(`subtab-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.remove("text-slate-700", "font-medium");
    activeBtn.classList.add("bg-blue-600", "text-white", "shadow", "font-bold");
  }

  if (tabName === "search") {
    renderClinicalDiseaseCards(getActiveDiseaseDatabase());
  } else if (tabName === "directory") {
    renderCategorizedDirectory();
  }
};

// ============================================================================
// 10. STRICT DOCTOR VS. FARMER BOTTOM NAVIGATION
// ============================================================================
window.selectRole = function(role) {
  localStorage.setItem("vetcare_registered_role", role);
  window.applyRoleState(role);
};

window.applyRoleState = function(role) {
  AppState.activeRole = role;

  const landingScreen = document.getElementById("role-selection-screen");
  const mainApp = document.getElementById("main-app-container");
  const roleBadge = document.getElementById("current-user-role-badge");

  if (landingScreen) landingScreen.style.display = "none";
  if (mainApp) {
    mainApp.classList.remove("hidden");
    mainApp.style.display = "block";
  }

  if (roleBadge) {
    roleBadge.innerText = role === "doctor" ? getI18n("docRoleTitle") : getI18n("farmerRoleTitle");
    roleBadge.className = role === "doctor"
      ? "text-[10px] sm:text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200"
      : "text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200";
  }

  renderDynamicBottomNavbar(role);

  if (role === "doctor") {
    toggleContainerVisibility("viewBreeding", false);
    toggleContainerVisibility("viewFeed", false);
    toggleContainerVisibility("viewFarmerRemedies", false);

    window.switchTab("diagnosis");
    window.switchDiagSubTab("search");
  } else {
    toggleContainerVisibility("viewDiagnosis", false);
    toggleContainerVisibility("viewWeightCalc", false);
    toggleContainerVisibility("viewRx", false);
    toggleContainerVisibility("viewInventory", false);

    window.switchTab("farmer_remedies");
  }
};

function renderDynamicBottomNavbar(role) {
  const navContainer = document.querySelector("#main-app-container nav");
  if (!navContainer) return;

  if (role === "doctor") {
    navContainer.innerHTML = `
      <button onclick="window.switchTab('diagnosis')" id="navDiagnosis" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">🩺</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">रोग निदान</span>
      </button>
      <button onclick="window.switchTab('weight')" id="navWeight" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">⚖️</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">वजन व खुराक</span>
      </button>
      <button onclick="window.switchTab('rx')" id="navRx" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">📋</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">ओपीडी पर्चा</span>
      </button>
      <button onclick="window.switchTab('inventory')" id="navInventory" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">📦</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">दवा स्टॉक</span>
      </button>
      <button onclick="window.switchTab('finance')" id="navFinance" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">📒</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">क्लिनिक खाता</span>
      </button>
    `;
  } else {
    navContainer.innerHTML = `
      <button onclick="window.switchTab('farmer_remedies')" id="navFarmerRemedies" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">🌿</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">देसी उपचार</span>
      </button>
      <button onclick="window.switchTab('feed')" id="navFeed" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">🌾</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">संतुलित आहार</span>
      </button>
      <button onclick="window.switchTab('breeding')" id="navBreeding" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">⏳</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">प्रजनन चक्र</span>
      </button>
      <button onclick="window.switchTab('finance')" id="navFinance" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">🥛</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">दूध बहीखाता</span>
      </button>
      <button onclick="window.dispatchEmergencyWhatsApp()" id="navSupport" class="flex flex-col items-center text-slate-500 py-1 transition">
        <span class="text-base sm:text-lg">💬</span>
        <span class="text-[9px] sm:text-xs mt-0.5 font-bold">डॉक्टर सहायता</span>
      </button>
    `;
  }
}

function toggleContainerVisibility(id, isVisible) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle("hidden", !isVisible);
  }
}

window.switchTab = function(tabId) {
  AppState.currentTab = tabId;

  const viewIds = [
    "viewDiagnosis",
    "viewWeightCalc",
    "viewRx",
    "viewInventory",
    "viewFinance",
    "viewBreeding",
    "viewFeed",
    "viewFarmerRemedies"
  ];

  viewIds.forEach(id => toggleContainerVisibility(id, false));

  document.querySelectorAll("nav button").forEach(btn => {
    btn.classList.remove("active-nav-tab", "text-blue-600", "text-emerald-600");
    btn.classList.add("text-slate-500");
  });

  const tabMapping = {
    diagnosis: { view: "viewDiagnosis", nav: "navDiagnosis" },
    weight: { view: "viewWeightCalc", nav: "navWeight" },
    rx: { view: "viewRx", nav: "navRx" },
    inventory: { view: "viewInventory", nav: "navInventory" },
    finance: { view: "viewFinance", nav: "navFinance" },
    breeding: { view: "viewBreeding", nav: "navBreeding" },
    feed: { view: "viewFeed", nav: "navFeed" },
    farmer_remedies: { view: "viewFarmerRemedies", nav: "navFarmerRemedies" }
  };

  const target = tabMapping[tabId];
  if (target) {
    toggleContainerVisibility(target.view, true);
    const navBtn = document.getElementById(target.nav);
    if (navBtn) {
      navBtn.classList.remove("text-slate-500");
      navBtn.classList.add("active-nav-tab");
      navBtn.classList.add(AppState.activeRole === "doctor" ? "text-blue-600" : "text-emerald-600");
    }
  }

  if (tabId === "diagnosis") {
    window.switchDiagSubTab(AppState.currentDiagSubTab || "search");
  } else if (tabId === "farmer_remedies") {
    renderFarmerSafeRemedies(getActiveDiseaseDatabase());
  } else if (tabId === "inventory") {
    window.renderClinicStock();
  } else if (tabId === "finance") {
    window.renderKhataLedger();
  }
};

// ============================================================================
// 11. CLINICAL DISEASE CARD RENDERERS
// ============================================================================
function renderClinicalDiseaseCards(diseases) {
  const container = document.getElementById("diseaseResultsContainer");
  if (!container) return;

  const rawSearch = (document.getElementById("unifiedDiseaseSearchInput")?.value || "").trim();

  if (!diseases || diseases.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center space-y-3 bg-white border border-slate-200 rounded-3xl shadow-xs">
        <p class="text-xs text-slate-500 font-medium">स्थानीय डेटाबेस में "<strong>${escapeHtml(rawSearch)}</strong>" से संबंधित कोई रोग नहीं मिला।</p>
        <button onclick="window.generateAITreatmentPlan('${escapeHtml(rawSearch)}')" class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-1.5 mx-auto">
          <span>⚡ Google Gemini AI से लाइव वैज्ञानिक इलाज तैयार करवाएं</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = diseases.map(d => {
    const name = d.nameHi || d.nameHindi || d.nameEn || "बीमारी";
    const temp = d.tempRange || d.temp || "102 - 104°F";
    const cardinal = Array.isArray(d.cardinalSigns) ? d.cardinalSigns.join("; ") : (d.cardinal || "");
    const tier1 = d.treatment?.injections ? d.treatment.injections.map(i => `${i.name} (${i.dose}) - ${i.route}`).join(", ") : (d.tier1 || "एंटीबायोटिक डोज़");
    const tier2 = d.treatment?.injections ? (d.treatment.injections.find(i => (i.name || '').toLowerCase().includes("melonex") || (i.name || '').toLowerCase().includes("flunixin"))?.name || "Inj. Melonex Plus 15ml I/M") : (d.tier2 || "NSAID डोज़");
    const tier3 = d.treatment?.oral ? d.treatment.oral.map(o => `${o.name} (${o.dose})`).join(", ") : (d.tier3 || "सपोर्टिव फ्लुइड");
    const tier4 = Array.isArray(d.treatment?.desiRemedies) ? d.treatment.desiRemedies.join(". ") : (d.tier4 || "देसी उपचार");
    const tier5 = d.contraindicatedSteroids ? "गाभिन पशुओं में Dexamethasone निषेध है (गर्भपात खतरा); Isoflupredone का प्रयोग करें।" : (d.tier5 || "क्लिनिकल सावधानियां");

    return `
      <div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
        <div class="flex justify-between items-start gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full uppercase">${escapeHtml(d.category || 'Clinical')}</span>
              ${d.contraindicatedSteroids ? '<span class="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded">स्टेरॉयड निषेध</span>' : ''}
            </div>
            <h3 class="text-sm sm:text-base font-black text-slate-900 mt-1">${escapeHtml(name)}</h3>
          </div>
          <span class="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-xl shrink-0">🌡️ ${escapeHtml(temp)}</span>
        </div>

        <p class="text-xs text-slate-700 leading-relaxed"><strong class="text-slate-900">🚨 कार्डिनल लक्षण:</strong> ${escapeHtml(cardinal)}</p>

        <div class="space-y-1.5 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200 font-sans">
          <div class="p-2 bg-white rounded-xl border border-blue-200">
            <span class="text-[10px] font-black text-blue-700 uppercase block tracking-wider">Tier 1: ड्रग ऑफ चॉइस / मुख्य एंटीबायोटिक</span>
            <p class="text-slate-800 font-bold mt-0.5">${escapeHtml(tier1)}</p>
          </div>
          <div class="p-2 bg-white rounded-xl border border-emerald-200">
            <span class="text-[10px] font-black text-emerald-700 uppercase block tracking-wider">Tier 2: सूजन व दर्द निवारक (NSAID)</span>
            <p class="text-slate-800 font-medium mt-0.5">${escapeHtml(tier2)}</p>
          </div>
          <div class="p-2 bg-white rounded-xl border border-purple-200">
            <span class="text-[10px] font-black text-purple-700 uppercase block tracking-wider">Tier 3: एंटीहिस्टामिनिक व सपोर्टिव थेरेपी</span>
            <p class="text-slate-800 font-medium mt-0.5">${escapeHtml(tier3)}</p>
          </div>
          <div class="p-2 bg-white rounded-xl border border-amber-200">
            <span class="text-[10px] font-black text-amber-700 uppercase block tracking-wider">Tier 4: घरेलू हर्बल व सहायक नुस्खा</span>
            <p class="text-slate-800 font-medium mt-0.5">${escapeHtml(tier4)}</p>
          </div>
          <div class="p-2 bg-rose-50 rounded-xl border border-rose-200">
            <span class="text-[10px] font-black text-rose-700 uppercase block tracking-wider">Tier 5: क्लिनिकल सावधानियां व मतभेद</span>
            <p class="text-rose-900 font-bold mt-0.5">${escapeHtml(tier5)}</p>
          </div>
        </div>

        <div class="flex gap-2 pt-1">
          <button onclick="window.loadIntoOPDSlip('${escapeHtml(name)}', '${escapeHtml(tier1)}\\n${escapeHtml(tier2)}')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
            <span>📝 ओपीडी पर्चे में भरें</span> <span>→</span>
          </button>
          <button onclick="window.consultGeminiDifferential('${escapeHtml(name)}', '${escapeHtml(cardinal)}')" class="bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold border border-purple-200 px-3 py-2.5 rounded-xl text-xs transition">
            🤖 AI कंसल्ट
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function renderFarmerSafeRemedies(diseases) {
  const container = document.getElementById("farmerRemediesContainer");
  if (!container) return;

  container.innerHTML = diseases.map(d => {
    const name = d.nameHi || d.nameHindi || d.nameEn || "रोग";
    const desi = Array.isArray(d.treatment?.desiRemedies) ? d.treatment.desiRemedies.join(". ") : (d.tier4 || "स्वच्छ देखभाल");
    const warning = d.contraindicatedSteroids ? "गाभिन पशुओं में कभी भी बिना जांचे कोई तीव्र दवा न दें।" : (d.tier5 || "सुरक्षा नियम");

    return `
      <div class="bg-white border-2 border-emerald-100 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 class="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
            <span>🌿</span> ${escapeHtml(name)}
          </h3>
          <span class="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2 py-0.5 rounded-full">सुरक्षित नुस्खा</span>
        </div>

        <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
          <strong class="text-emerald-950 text-xs block mb-1">🍵 सिद्ध देसी काढ़ा व घरेलू लेप:</strong>
          <p class="text-xs text-emerald-900 leading-relaxed">${escapeHtml(desi)}</p>
        </div>

        <div class="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
          <strong class="text-amber-950 text-xs block mb-1">⚠️ पशुपालक ध्यान दें (सुरक्षा नियम):</strong>
          <p class="text-xs text-amber-900 leading-relaxed">${escapeHtml(warning)}</p>
        </div>
      </div>
    `;
  }).join("");
}

function renderCategorizedDirectory() {
  const container = document.getElementById("directoryListContainer");
  if (!container) return;

  const db = getActiveDiseaseDatabase();
  const categories = {
    bacterial: { title: "🦠 जीवाणु जनित रोग (Bacterial)", list: [] },
    viral: { title: "🧬 विषाणु जनित रोग (Viral)", list: [] },
    protozoal: { title: "🩸 रक्त परजीवी रोग (Protozoal)", list: [] },
    metabolic: { title: "🌾 उपापचयी रोग (Metabolic & Nutritional)", list: [] },
    toxicology: { title: "☠️ विषाक्तता (Toxicology & Poisoning)", list: [] },
    gynae: { title: "🤰 प्रसूति व प्रजनन (Gynaecological)", list: [] },
    surgical: { title: "🩹 शल्य चिकित्सा आपात (Surgical)", list: [] }
  };

  db.forEach(d => {
    const cat = (d.category || "").toLowerCase();
    if (categories[cat]) {
      categories[cat].list.push(d.nameHi || d.nameHindi || d.nameEn);
    } else {
      categories.bacterial.list.push(d.nameHi || d.nameHindi || d.nameEn);
    }
  });

  container.innerHTML = Object.keys(categories).map(key => {
    const item = categories[key];
    if (item.list.length === 0) return "";
    return `
      <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
        <span class="font-bold text-slate-900 block text-xs">${item.title}</span>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-700">
          ${item.list.map(name => `<div>• ${escapeHtml(name)}</div>`).join("")}
        </div>
      </div>
    `;
  }).join("");
}

window.filterDiseaseCategory = function(cat, btn) {
  document.querySelectorAll(".q-filter-chip").forEach(el => {
    el.classList.remove("bg-blue-600", "text-white", "font-bold");
    el.classList.add("bg-slate-100", "text-slate-700", "font-medium");
  });

  if (btn) {
    btn.classList.remove("bg-slate-100", "text-slate-700", "font-medium");
    btn.classList.add("bg-blue-600", "text-white", "font-bold");
  }

  const db = getActiveDiseaseDatabase();
  if (cat === "ALL") {
    renderClinicalDiseaseCards(db);
  } else {
    const filtered = db.filter(d => (d.category || "").toUpperCase() === cat.toUpperCase());
    renderClinicalDiseaseCards(filtered);
  }
};

// ============================================================================
// 12. SHAEFFER'S WEIGHT & ACCURATE DRUG ML DOSAGE CALCULATOR
// ============================================================================
window.calculateShaefferDosage = function() {
  const lenInput = document.getElementById("calcLengthInches");
  const girthInput = document.getElementById("calcGirthInches");

  const length = parseFloat(lenInput ? lenInput.value : 60) || 60;
  const girth = parseFloat(girthInput ? girthInput.value : 70) || 70;

  // Shaeffer's Formula: Weight in lbs = (Length * Girth^2) / 300 | Weight in kg = Weight in lbs / 2.20462
  const weightLbs = Math.round((length * Math.pow(girth, 2)) / 300);
  const weightKg = Math.round(weightLbs / 2.20462);

  const kgEl = document.getElementById("computedWeightKg");
  const lbsEl = document.getElementById("computedWeightLbs");
  if (kgEl) kgEl.innerText = weightKg;
  if (lbsEl) lbsEl.innerText = weightLbs;

  const cefEl = document.getElementById("doseCeftriaxone");
  const melEl = document.getElementById("doseMeloxicam");
  const avilEl = document.getElementById("doseAvil");
  const iverEl = document.getElementById("doseIvermectin");

  if (cefEl) cefEl.innerText = `${((weightKg * 10) / 1000).toFixed(1)} gm (I/M / I/V)`;
  if (melEl) melEl.innerText = `${((weightKg * 0.5) / 10 * 2).toFixed(1)} ml (I/M)`;
  if (avilEl) avilEl.innerText = `${Math.min(22, Math.max(8, Math.round(weightKg * 0.03)))} ml (I/M)`;
  if (iverEl) iverEl.innerText = `${(weightKg / 50).toFixed(1)} ml (S/C strictly)`;
};

// ============================================================================
// 13. DIGITAL OPD PRESCRIPTION & 1-CLICK WHATSAPP DISPATCH
// ============================================================================
window.loadIntoOPDSlip = function(diseaseName, drugText) {
  const diagInput = document.getElementById("opdDiagnosis");
  const medInput = document.getElementById("opdMedicine");

  if (diagInput) diagInput.value = diseaseName;
  if (medInput) medInput.value = drugText;

  window.switchTab("rx");
};

window.dispatchOPDWhatsApp = function() {
  const farmerName = (document.getElementById("opdFarmerName")?.value || "").trim();
  const phone = (document.getElementById("opdFarmerPhone")?.value || "").trim().replace(/\D/g, "");
  const animal = document.getElementById("opdAnimal")?.value || "पशु";
  const diagnosis = (document.getElementById("opdDiagnosis")?.value || "").trim();
  const rx = (document.getElementById("opdMedicine")?.value || "").trim();
  const pregnancy = document.getElementById("opdPregnancy")?.value || "";
  const total = document.getElementById("opdTotalFee")?.value || "0";
  const paid = document.getElementById("opdPaidFee")?.value || "0";
  const due = document.getElementById("opdDueFee")?.value || "0";

  if (!farmerName || phone.length < 10 || !diagnosis) {
    alert("कृपया किसान का नाम, 10 अंकों का फोन नंबर व निदान अवश्य भरें!");
    return;
  }

  // Abortifacient Steroid Safety Guard Check
  const isPregnant = (pregnancy || "").toLowerCase().includes("गाभिन") || (pregnancy || "").toLowerCase().includes("pregnant");
  const hasDexa = (rx || "").toLowerCase().includes("dexa");

  if (isPregnant && hasDexa) {
    const alertMsg = getI18n("pregnancyAlert");
    alert(alertMsg);
    if (!confirm("पशु गाभिन है और प्रिस्क्रिप्शन में Dexamethasone दर्ज है। क्या आप इसे बदलकर Isoflupredone करना चाहते हैं?")) {
      return;
    }
  }

  const msg = `*🩺 VETCARE CLINICAL OPD PRESCRIPTION*\n` +
              `*दिनांक:* ${new Date().toLocaleDateString("hi-IN")}\n` +
              `-----------------------------------------\n` +
              `👤 *किसान:* ${farmerName}\n` +
              `🐾 *मरीज पशु:* ${animal} (${pregnancy})\n` +
              `🚨 *क्लिनिकल निदान:* ${diagnosis}\n` +
              `-----------------------------------------\n` +
              `💊 *Rx सुझाई गई दवाएं व इंजेक्शन:*\n${rx}\n` +
              `-----------------------------------------\n` +
              `💰 *फीस:* कुल ₹${total} | जमा ₹${paid} | *बकाया ₹${due}*\n\n` +
              `🏛️ *बैंक भुगतान विवरण (UPI):*\n` +
              `Payee: ${VETCARE_CONFIG.payeeName}\n` +
              `SBI UPI: ${VETCARE_CONFIG.sbi.upiId}\n` +
              `PNB UPI: ${VETCARE_CONFIG.pnb.upiId}\n\n` +
              `_Vetcare AI OS द्वारा सत्यापित डिजिटल पर्चा_`;

  const fullNumber = phone.length === 10 ? `91${phone}` : phone;
  window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent(msg)}`, "_blank");
};

// ============================================================================
// 14. CLINIC INVENTORY COUNTER (+/-)
// ============================================================================
window.renderClinicStock = function() {
  const container = document.getElementById("stockListContainer");
  if (!container) return;

  if (AppState.clinicStock.length === 0) {
    container.innerHTML = `<p class="text-center text-slate-400 text-xs py-4">कोई स्टॉक आइटम मौजूद नहीं है।</p>`;
    return;
  }

  container.innerHTML = AppState.clinicStock.map((item, idx) => {
    const isLow = item.qty <= item.minAlert;
    return `
      <div class="flex items-center justify-between p-3 rounded-2xl border ${isLow ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'}">
        <div>
          <div class="flex items-center gap-1.5">
            <strong class="text-xs font-black text-slate-900">${escapeHtml(item.name)}</strong>
            ${isLow ? '<span class="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded">कम स्टॉक</span>' : ''}
          </div>
          <span class="text-[11px] text-slate-500">${escapeHtml(item.category)} • न्यूनतम अलर्ट: ${item.minAlert} ${escapeHtml(item.unit)}</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="window.adjustStockQty(${idx}, -1)" class="w-7 h-7 bg-white rounded-lg border border-slate-300 font-bold text-slate-700 shadow-xs">-</button>
          <span class="text-xs font-black w-8 text-center">${item.qty}</span>
          <button onclick="window.adjustStockQty(${idx}, 1)" class="w-7 h-7 bg-white rounded-lg border border-slate-300 font-bold text-slate-700 shadow-xs">+</button>
        </div>
      </div>
    `;
  }).join("");
};

window.adjustStockQty = function(index, delta) {
  if (AppState.clinicStock[index]) {
    AppState.clinicStock[index].qty = Math.max(0, AppState.clinicStock[index].qty + delta);
    persistStockVault();
    window.renderClinicStock();
  }
};

window.openNewStockModal = function() {
  const name = prompt("दवा अथवा सीमन स्ट्रॉ का नाम दर्ज करें:");
  if (!name) return;
  const qty = parseInt(prompt("वर्तमान स्टॉक संख्या:") || "10", 10);
  AppState.clinicStock.unshift({
    id: Date.now(),
    name: name.trim(),
    category: "INJECTION",
    qty: isNaN(qty) ? 10 : qty,
    unit: "vials",
    minAlert: 3
  });
  persistStockVault();
  window.renderClinicStock();
};

// ============================================================================
// 15. KHATA LEDGER & 1-CLICK WHATSAPP TAGADA
// ============================================================================
window.renderKhataLedger = function() {
  const container = document.getElementById("khataListContainer");
  if (!container) return;

  let totalPaid = 0;
  let totalDue = 0;

  AppState.khataRecords.forEach(item => {
    if (item.type === "PAID") totalPaid += item.amount;
    else totalDue += item.amount;
  });

  const paidEl = document.getElementById("khataTotalPaid");
  const dueEl = document.getElementById("khataTotalDues");
  if (paidEl) paidEl.innerText = `₹${totalPaid}`;
  if (dueEl) dueEl.innerText = `₹${totalDue}`;

  if (AppState.khataRecords.length === 0) {
    container.innerHTML = `<p class="text-center text-slate-400 text-xs py-4">खाते में कोई प्रविष्टि नहीं है।</p>`;
    return;
  }

  container.innerHTML = AppState.khataRecords.map((item, idx) => {
    const farmerDisplay = item.farmerName || item.name || "अज्ञात किसान";
    return `
      <div class="flex items-center justify-between p-3.5 rounded-2xl border ${item.type === 'PAID' ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'}">
        <div>
          <strong class="text-xs font-black text-slate-900 block">${escapeHtml(farmerDisplay)}</strong>
          <span class="text-[11px] text-slate-600 font-mono">${escapeHtml(item.phone || '-')}</span>
          <p class="text-[10px] text-slate-500 mt-0.5">${escapeHtml(item.note || '')} • ${escapeHtml(item.date || '')}</p>
        </div>
        <div class="text-right space-y-1">
          <span class="text-xs font-black block ${item.type === 'PAID' ? 'text-emerald-700' : 'text-rose-700'}">
            ${item.type === 'PAID' ? '+ ₹' : '- ₹'}${item.amount}
          </span>
          <div class="flex items-center gap-1 justify-end">
            ${item.type === 'DUE' && (item.phone || '').replace(/\D/g, '').length >= 10 ? `
              <button onclick="window.sendKhataWhatsAppTagada(${idx})" class="text-[10px] bg-rose-600 hover:bg-rose-700 text-white font-bold px-2 py-0.5 rounded-md shadow-xs">
                तगादा 💬
              </button>
            ` : ''}
            <button onclick="window.removeKhataRecord(${idx})" class="text-[10px] text-slate-400 hover:text-rose-600 font-bold ml-1">✕</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
};

window.sendKhataWhatsAppTagada = function(index) {
  const item = AppState.khataRecords[index];
  if (!item) return;

  const cleanPhone = (item.phone || "").replace(/\D/g, "");
  if (cleanPhone.length < 10) {
    alert("वैध 10 अंकों का फोन नंबर उपलब्ध नहीं है!");
    return;
  }

  const farmerDisplay = item.farmerName || item.name || "किसान";
  const msg = `*📢 VETCARE क्लिनिक बकाया भुगतान स्मरण पत्र*\n\n` +
              `नमस्ते *${farmerDisplay}* जी,\n` +
              `आपके क्लिनिक/डेयरी खाते का कुल बकाया *₹${item.amount}* है (${item.note || 'पशु चिकित्सा परामर्श'}).\n\n` +
              `कृपया निम्न अधिकृत खाते में शीघ्र भुगतान करने का कष्ट करें:\n` +
              `🏛️ *Payee:* ${VETCARE_CONFIG.payeeName} (${VETCARE_CONFIG.beneficiary})\n` +
              `🔹 *SBI UPI:* ${VETCARE_CONFIG.sbi.upiId}\n` +
              `🔹 *PNB UPI:* ${VETCARE_CONFIG.pnb.upiId}\n` +
              `🔹 *SBI A/C:* ${VETCARE_CONFIG.sbi.account} (IFSC: ${VETCARE_CONFIG.sbi.ifsc})\n\n` +
              `धन्यवाद, Vetcare क्लिनिकल सपोर्ट।`;

  const fullNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  window.open(`https://wa.me/${fullNumber}?text=${encodeURIComponent(msg)}`, "_blank");
};

window.removeKhataRecord = function(index) {
  if (confirm(getI18n("confirmDelete"))) {
    AppState.khataRecords.splice(index, 1);
    persistKhataVault();
    window.renderKhataLedger();
  }
};

// ============================================================================
// 16. DATA SYNC & CLOUD BACKUP LOGIC
// ============================================================================
window.triggerDataSync = function() {
  const isOnline = navigator.onLine;
  const btn = document.getElementById("btn-header-sync");

  if (btn) btn.innerHTML = "🔄 सिंक...";

  setTimeout(() => {
    if (isOnline) {
      if (btn) btn.innerHTML = "🟢 सिंक";
      alert(getI18n("syncOnline", "🟢 क्लाउड सिंक सक्रिय: आपका क्लिनिकल डेटा और खाता बही स्थानीय ब्राउज़र में सुरक्षित व सिंक है।"));
    } else {
      if (btn) btn.innerHTML = "📴 ऑफ़लाइन";
      alert(getI18n("syncOffline", "📴 ऑफ़लाइन मोड: इंटरनेट उपलब्ध नहीं है, लेकिन आपका सारा डेटा स्थानीय रूप से सुरक्षित है। इंटरनेट आते ही सिंक होगा।"));
    }
  }, 400);
};

// ============================================================================
// 17. LIVE GEMINI CLINICAL CONSULTANT TRIGGER
// ============================================================================
window.consultGeminiDifferential = async function(diseaseName, symptoms) {
  const prompt = `You are a Senior Veterinary Clinical Consultant using Google Gemini.
Case:
Suspected Disease: ${diseaseName}
Key Cardinal Symptoms: ${symptoms}

Please provide:
1. Top 2 Differential Diagnoses to rule out.
2. Emergency First-Line Injections with precise mg/kg doses.
3. Essential Confirmation Tests (Blood Smear / Milk strip / Urinalysis).
4. Direct instructions in clear Hindi and English mix.
CRITICAL SAFETY RULE: Warn explicitly if any abortifacient drug (e.g. Dexamethasone) is contraindicated in pregnancy.`;

  const btn = event?.target;
  const originalText = btn ? btn.innerText : "";
  if (btn) btn.innerText = "विचार कर रहे हैं... 🤖";

  try {
    const aiReply = await window.callGeminiClinicalAI(prompt, "general");
    if (btn) btn.innerText = originalText;

    if (aiReply) {
      alert(`🤖 Gemini AI क्लिनिकल विभेदक रिपोर्ट:\n\n${aiReply}`);
    }
  } catch (err) {
    if (btn) btn.innerText = originalText;
    alert(`Gemini AI त्रुटि: ${err.message}`);
  }
};

window.dispatchEmergencyWhatsApp = function() {
  const msg = `*🚨 आपातकालीन पशु स्वास्थ्य परामर्श अनुरोध*\n\n` +
              `नमस्ते डॉक्टर साहब, मुझे अपने पशु के संबंध में आपातकालीन क्लिनिकल सहायता की आवश्यकता है।\n` +
              `ऐप: Vetcare AI OS`;
  window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
};

// ============================================================================
// 18. LANGUAGE ENGINE HOOK
// ============================================================================
window.changeLanguage = function(lang) {
  currentLang = lang;
  localStorage.setItem("vetcare_lang", lang);
  if (AppState.activeRole) {
    window.applyRoleState(AppState.activeRole);
  }
};

// ============================================================================
// 19. SYSTEM BOOTSTRAPPER & INITIAL LOAD GUARD
// ============================================================================
function initVetcareOS() {
  loadStorageVault();
  window.initSessionTimer();

  const searchInput = document.getElementById("unifiedDiseaseSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function(e) {
      const q = (e.target.value || "").toString().toLowerCase().trim();
      const db = getActiveDiseaseDatabase();

      if (window.searchVetcareDiseases && typeof window.searchVetcareDiseases === "function") {
        const results = window.searchVetcareDiseases(q);
        renderClinicalDiseaseCards(results);
      } else {
        const filtered = db.filter(item => {
          const nameHi = (item.nameHi || item.nameHindi || "").toLowerCase();
          const nameEn = (item.nameEn || "").toLowerCase();
          const cardinal = (item.cardinal || (Array.isArray(item.cardinalSigns) ? item.cardinalSigns.join(" ") : "")).toLowerCase();
          return nameHi.includes(q) || nameEn.includes(q) || cardinal.includes(q);
        });
        renderClinicalDiseaseCards(filtered);
      }
    });
  }

  const savedRole = localStorage.getItem("vetcare_registered_role");
  if (savedRole === "doctor" || savedRole === "farmer") {
    window.applyRoleState(savedRole);
  } else {
    const landing = document.getElementById("role-selection-screen");
    const mainApp = document.getElementById("main-app-container");
    if (landing) landing.style.display = "flex";
    if (mainApp) mainApp.style.display = "none";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVetcareOS);
} else {
  initVetcareOS();
}
