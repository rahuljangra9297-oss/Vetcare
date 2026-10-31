CRITICAL MODEL UPDATE FOR APP.JS:
The app received this exact error from Google:
"This model models/gemini-2.0-flash is no longer available. Please update your code to use models/gemini-2.5-flash for the latest features and improvements."

Please provide ONLY the complete, production-ready app.js in a single javascript code block where the API call uses 'gemini-2.5-flash' directly.

SPECIFICATIONS TO IMPLEMENT:
1. Updated Direct Gemini API Caller:
   window.callGeminiClinicalAI = async function(promptText) {
     const apiKey = localStorage.getItem('vetcare_gemini_api_key');
     if (!apiKey) {
       alert("कृपया पहले '⚙️ AI Key' बटन पर क्लिक करके अपनी Google API Key दर्ज करें!");
       if (window.openAiKeyModal) window.openAiKeyModal();
       return null;
     }

     // Primary active model as mandated by Google
     const primaryUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
     
     try {
       const response = await fetch(primaryUrl, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'x-goog-api-key': apiKey
         },
         body: JSON.stringify({
           contents: [{ parts: [{ text: promptText }] }]
         })
       });

       if (response.ok) {
         const data = await response.json();
         const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
         if (text) return text;
       } else {
         const errData = await response.json().catch(() => ({}));
         throw new Error(errData.error?.message || response.statusText);
       }
     } catch (err) {
       console.error("Gemini 2.5 Flash direct call failed, attempting fallback...", err);
       // Dynamic discovery fallback if direct call fails
       try {
         const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
         if (listRes.ok) {
           const listData = await listRes.json();
           const validModel = listData.models?.find(m => 
             m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')
           );
           if (validModel) {
             const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/${validModel.name}:generateContent?key=${apiKey}`;
             const fRes = await fetch(fallbackUrl, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
             });
             if (fRes.ok) {
               const fData = await fRes.json();
               return fData.candidates?.[0]?.content?.parts?.[0]?.text;
             }
           }
         }
       } catch (e) {}
       throw err;
     }
   };

2. Clinical Report Formatter & Renderer:
   - When window.callGeminiClinicalAI returns response text, dynamically format and inject it into the treatment output area.
   - Cleanly render:
     * 5-Tier Treatment Tables (Injections, Oral, Ayurvedic, Homeopathic, Desi).
     * 4-Stage Trajectory & Prognosis timeline.
     * High-visibility Pregnancy Red Alert warning for abortifacient drugs.

3. PRESERVE ALL ACTIVE & VERIFIED FEATURES (ZERO REGRESSION):
   - Current working 60-minute session countdown timer with clearInterval protection.
   - 3-Subtab navigation for Diagnosis (लक्षण मैट्रिक्स, त्वरित खोज, रोग डायरेक्टरी).
   - Multi-Language engine (हिन्दी, English, Hinglish, ਪੰਜਾਬੀ, मराठी, ગુજરાતી, বাংলা).
   - Strict Doctor vs Farmer bottom navigation separation.
   - Verified Bank Details:
     * Payee: "Vetcare Services" (Mr. Rahul)
     * SBI: upiId "rahuljangra9297@oksbi", A/C "65204067585", IFSC "SBIN0013693"
     * PNB: upiId "rahuljangra9297-1@okicici", A/C "6687001700015098", IFSC "PUNB0668700"
     * Master Admin PIN: "9297"
   - Shaeffer's Weight & Drug ml Dosage Calculator.
   - Digital OPD Slip & WhatsApp Dispatch.
   - Khata Ledger with defensive null checks `(val || '').toLowerCase()`.

OUTPUT: Return the FULL, PRODUCTION-READY app.js in a single javascript code block.
