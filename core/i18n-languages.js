// Vetcare AI OS - Internationalization (i18n), Multilingual Dictionary & Dynamic Translator (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE
  window.VetcareApp = window.VetcareApp || {};

  var FALLBACK_LANG = 'hi';

  var SUPPORTED_LANGUAGES = {
    hi: { code: 'hi', name: 'हिन्दी', label: 'हिन्दी (Hindi)', dir: 'ltr' },
    hinglish: { code: 'hinglish', name: 'Hinglish', label: 'Hinglish (हिंग्लिश)', dir: 'ltr' },
    en: { code: 'en', name: 'English', label: 'English (UK/IN)', dir: 'ltr' },
    pa: { code: 'pa', name: 'ਪੰਜਾਬੀ', label: 'ਪੰਜਾਬੀ (Punjabi)', dir: 'ltr' },
    mr: { code: 'mr', name: 'मराठी', label: 'मराठी (Marathi)', dir: 'ltr' }
  };

  var LANG_CHANGE_MESSAGES = {
    hi: "भाषा बदलकर 'हिन्दी' कर दी गई है",
    hinglish: "Language badalkar 'Hinglish' kar di gayi hai",
    en: "Language changed to 'English'",
    pa: "ਭਾਸ਼ਾ ਬਦਲ ਕੇ 'ਪੰਜਾਬੀ' ਕਰ ਦਿੱਤੀ ਗਈ ਹੈ",
    mr: "भाषा बदलून 'मराठी' करण्यात आली आहे"
  };

  // 2. COMPREHENSIVE MULTILINGUAL DICTIONARIES (100% COMPLETE, ZERO PLACEHOLDERS)
  var translations = {
    hi: {
      nav: {
        app_name: 'वेटकेयर एआई ओएस',
        doctor_portal: 'पशु चिकित्सक पोर्टल',
        farmer_hub: 'किसान एवं पशुपालक केंद्र',
        admin_portal: 'व्यवस्थापक पोर्टल',
        api_key_btn: 'एपीआई कुंजी कॉन्फ़िगरेशन',
        session_timer: 'सत्र समय',
        trial_timer: 'ट्रायल शेष',
        logout: 'लॉग आउट',
        menu: 'मेनू'
      },
      doctor: {
        opd_title: 'ओपीडी एवं नैदानिक परामर्श',
        patient_intake: 'रोगी पशु पंजीकरण एवं इतिहास',
        species_select: 'पशु की प्रजाति चुनें',
        breed_select: 'नस्ल का चयन करें',
        age_label: 'आयु (वर्ष / माह)',
        weight_calc: 'वजन गणक (शेफर सूत्र)',
        symptom_matrix: 'लक्षण मैट्रिक्स एवं अवलोकन',
        shaeffer_formula: 'शेफर सूत्र: (छाती का घेरा² × शरीर की लंबाई) / ३००',
        ai_opinion: 'एआई द्वितीय राय एवं त्वरित निदान',
        prescription: 'औषधि एवं उपचार पर्चा (Rx)',
        pregnancy_alert: 'चेतावनी: गर्भावस्था जांच अनिवार्य (गर्भाधान निषेध अलर्ट)',
        save_record: 'केस रिकॉर्ड सुरक्षित करें',
        print_rx: 'नुस्खा पर्चा प्रिंट करें'
      },
      farmer: {
        farmer_title: 'किसान एवं पशुपालक सेवा केंद्र',
        desi_nuskhe: 'पारंपरिक देसी नुस्खे एवं प्राथमिक उपचार',
        milk_ledger: 'दुग्ध उत्पादन एवं दैनिक बहीखाता',
        bulls_directory: 'उत्कृष्ट सांड एवं वीर्य बैंक निर्देशिका',
        mandi_rates: 'पशु मंडी एवं दैनिक चारा भाव',
        govt_schemes: 'सरकारी पशुधन योजनाएं एवं सब्सिडी',
        pregnancy_care: 'गर्भवती पशु की देखभाल एवं पोषण प्रबंधन',
        heat_cycle: 'मद चक्र (हीट) कैलेंडर ट्रैकर'
      },
      admin: {
        admin_title: 'मुख्य प्रशासक नियंत्रण कक्ष',
        master_pin_label: 'मास्टर सुरक्षा पिन दर्ज करें',
        login_btn: 'सुरक्षित लॉगिन करें',
        reset_pw: 'सुरक्षा पासवर्ड रीसेट करें',
        payout_edit: 'भुगतान एवं कमीशन समायोजन',
        bank_sbi: 'भारतीय स्टेट बैंक (SBI) मर्चेंट गेटवे',
        bank_pnb: 'पंजाब नेशनल बैंक (PNB) प्रत्यक्ष निपटान',
        subscription_plans: 'सदस्यता योजना एवं कोटा प्रबंधन',
        user_analytics: 'उपयोगकर्ता विश्लेषण एवं सक्रियता ऑडिट'
      },
      common: {
        save: 'सुरक्षित करें',
        cancel: 'रद्द करें',
        submit: 'जमा करें',
        back: 'वापस जाएं',
        edit: 'संशोधित करें',
        delete: 'हटाएं',
        loading: 'प्रतीक्षा करें, लोड हो रहा है...',
        success: 'सफल संचालन',
        error: 'त्रुटि उत्पन्न हुई',
        confirm: 'पुष्टि करें'
      }
    },

    hinglish: {
      nav: {
        app_name: 'Vetcare AI OS',
        doctor_portal: 'Doctor OPD Portal',
        farmer_hub: 'Kisan & Livestock Hub',
        admin_portal: 'Admin Control Portal',
        api_key_btn: 'API Key Setup',
        session_timer: 'Session Time',
        trial_timer: 'Trial Time Remaining',
        logout: 'Logout Karein',
        menu: 'Menu'
      },
      doctor: {
        opd_title: 'OPD & Clinical Checkup',
        patient_intake: 'Animal Patient Entry & History',
        species_select: 'Pashu Ki Species Chunein',
        breed_select: 'Pashu Ki Breed Chunein',
        age_label: 'Umar (Years / Months)',
        weight_calc: 'Weight Calculator (Shaeffer Formula)',
        symptom_matrix: 'Symptom Matrix & Check',
        shaeffer_formula: 'Shaeffer Formula: (Girth² × Length) / 300',
        ai_opinion: 'AI Second Opinion & Diagnosis',
        prescription: 'Dawa Aur Treatment Parcha (Rx)',
        pregnancy_alert: 'Warning: Pregnancy Check Jaroori Hai',
        save_record: 'Case Record Save Karein',
        print_rx: 'Prescription Print Karein'
      },
      farmer: {
        farmer_title: 'Kisan & Pashupalak Suvidha Kendra',
        desi_nuskhe: 'Desi Nuskhe & Gharelu Ilaj',
        milk_ledger: 'Doodh Utpadan & Daily Khata',
        bulls_directory: 'Top Bulls & AI Semen Directory',
        mandi_rates: 'Pashu Mandi & Chara Rates',
        govt_schemes: 'Sarkari Schemes & Subsidy',
        pregnancy_care: 'Gabhin Pashu Ki Dekhbhal & Diet',
        heat_cycle: 'Heat Cycle Calendar & Tracker'
      },
      admin: {
        admin_title: 'Master Admin Control Center',
        master_pin_label: 'Master Security PIN Daalein',
        login_btn: 'Secure Login Karein',
        reset_pw: 'Password Reset Karein',
        payout_edit: 'Payout & Commission Edit Karein',
        bank_sbi: 'State Bank of India (SBI) Gateway',
        bank_pnb: 'Punjab National Bank (PNB) Settlement',
        subscription_plans: 'Subscription Plans & Quota',
        user_analytics: 'User Analytics & Activity Log'
      },
      common: {
        save: 'Save Karein',
        cancel: 'Cancel Karein',
        submit: 'Submit Karein',
        back: 'Wapas Jayein',
        edit: 'Edit Karein',
        delete: 'Delete Karein',
        loading: 'Please wait, load ho raha hai...',
        success: 'Operation Successful',
        error: 'Kuch gadbad hui (Error)',
        confirm: 'Confirm Karein'
      }
    },

    en: {
      nav: {
        app_name: 'Vetcare AI OS',
        doctor_portal: 'Veterinary Doctor Portal',
        farmer_hub: 'Farmer & Livestock Hub',
        admin_portal: 'Administrator Portal',
        api_key_btn: 'API Key Configuration',
        session_timer: 'Session Timer',
        trial_timer: 'Trial Remaining',
        logout: 'Sign Out',
        menu: 'Menu'
      },
      doctor: {
        opd_title: 'OPD & Clinical Consultation',
        patient_intake: 'Patient Intake & Clinical History',
        species_select: 'Select Animal Species',
        breed_select: 'Select Animal Breed',
        age_label: 'Age (Years / Months)',
        weight_calc: 'Weight Estimation Calculator (Shaeffer)',
        symptom_matrix: 'Symptom Matrix & Diagnostics',
        shaeffer_formula: "Shaeffer's Formula: (Heart Girth² × Length) / 300",
        ai_opinion: 'AI Diagnostic Opinion & Prognosis',
        prescription: 'Clinical Prescription & Dosage (Rx)',
        pregnancy_alert: 'Warning: Pregnancy Check Required (Contraindication Warning)',
        save_record: 'Save Clinical Record',
        print_rx: 'Print Prescription'
      },
      farmer: {
        farmer_title: 'Farmer & Livestock Service Hub',
        desi_nuskhe: 'Traditional Remedies & First Aid',
        milk_ledger: 'Milk Production & Daily Ledger',
        bulls_directory: 'Pedigree Bulls & AI Semen Directory',
        mandi_rates: 'Livestock Mandi & Fodder Market Rates',
        govt_schemes: 'Government Schemes & Subsidies',
        pregnancy_care: 'Pregnant Livestock Care & Nutrition',
        heat_cycle: 'Estrous Heat Cycle Calendar Tracker'
      },
      admin: {
        admin_title: 'Master Administrator Control Panel',
        master_pin_label: 'Enter Master Security PIN',
        login_btn: 'Authenticate & Login',
        reset_pw: 'Reset Access Credentials',
        payout_edit: 'Commission & Payout Management',
        bank_sbi: 'State Bank of India (SBI) Gateway',
        bank_pnb: 'Punjab National Bank (PNB) Direct Settlement',
        subscription_plans: 'Subscription Tiers & Quota Setup',
        user_analytics: 'System Audits & User Analytics'
      },
      common: {
        save: 'Save',
        cancel: 'Cancel',
        submit: 'Submit',
        back: 'Back',
        edit: 'Edit',
        delete: 'Delete',
        loading: 'Loading, please wait...',
        success: 'Operation Successful',
        error: 'An error occurred',
        confirm: 'Confirm'
      }
    },

    pa: {
      nav: {
        app_name: 'ਵੈਟਕੇਅਰ ਏਆਈ ਓਐਸ',
        doctor_portal: 'ਪਸ਼ੂ ਡਾਕਟਰ ਪੋਰਟਲ',
        farmer_hub: 'ਕਿਸਾਨ ਅਤੇ ਪਸ਼ੂ ਪਾਲਕ ਹੱਬ',
        admin_portal: 'ਪ੍ਰਸ਼ਾਸਕ ਪੋਰਟਲ',
        api_key_btn: 'ਏਪੀਆਈ ਕੁੰਜੀ ਸੈੱਟਅੱਪ',
        session_timer: 'ਸੈਸ਼ਨ ਸਮਾਂ',
        trial_timer: 'ਟਰਾਇਲ ਬਾਕੀ',
        logout: 'ਲਾੱਗ ਆਉਟ ਕਰੋ',
        menu: 'ਮੀਨੂ'
      },
      doctor: {
        opd_title: 'ਓਪੀਡੀ ਅਤੇ ਕਲੀਨਿਕਲ ਸਲਾਹ',
        patient_intake: 'ਮਰੀਜ਼ ਪਸ਼ੂ ਦਾ ਇੰਦਰਾਜ ਅਤੇ ਇਤਿਹਾਸ',
        species_select: 'ਪਸ਼ੂ ਦੀ ਕਿਸਮ ਚੁਣੋ',
        breed_select: 'ਨਸਲ ਦੀ ਚੋਣ ਕਰੋ',
        age_label: 'ਉਮਰ (ਸਾਲ / ਮਹੀਨੇ)',
        weight_calc: 'ਭਾਰ ਕੈਲਕੁਲੇਟਰ (ਸ਼ੈਫਰ ਦਾ ਫਾਰਮੂਲਾ)',
        symptom_matrix: 'ਲੱਛਣ ਮੈਟ੍ਰਿਕਸ ਅਤੇ ਨਿਰੀਖਣ',
        shaeffer_formula: 'ਸ਼ੈਫਰ ਫਾਰਮੂਲਾ: (ਛਾਤੀ ਦਾ ਘੇਰਾ² × ਲੰਬਾਈ) / 300',
        ai_opinion: 'ਏਆਈ ਦੂਜੀ ਰਾਇ ਅਤੇ ਨਿਦਾਨ',
        prescription: 'ਦਵਾਈਆਂ ਅਤੇ ਇਲਾਜ ਦਾ ਪਰਚਾ (Rx)',
        pregnancy_alert: 'ਚੇਤਾਵਨੀ: ਗਰਭ ਅਵਸਥਾ ਦੀ ਜਾਂਚ ਜ਼ਰੂਰੀ ਹੈ',
        save_record: 'ਕੇਸ ਰਿਕਾਰਡ ਸੰਭਾਲੋ',
        print_rx: 'ਪਰਚਾ ਪ੍ਰਿੰਟ ਕਰੋ'
      },
      farmer: {
        farmer_title: 'ਕਿਸਾਨ ਅਤੇ ਪਸ਼ੂ ਪਾਲਣ ਸੇਵਾ ਕੇਂਦਰ',
        desi_nuskhe: 'ਰਵਾਇਤੀ ਦੇਸੀ ਨੁਸਖੇ ਅਤੇ ਮੁੱਢਲੀ ਸਹਾਇਤਾ',
        milk_ledger: 'ਦੁੱਧ ਉਤਪਾਦਨ ਅਤੇ ਰੋਜ਼ਾਨਾ ਖਾਤਾ',
        bulls_directory: 'ਉੱਤਮ ਸਾਨ੍ਹ ਅਤੇ ਨਕਲੀ ਗਰਭਧਾਨ ਡਾਇਰੈਕਟਰੀ',
        mandi_rates: 'ਪਸ਼ੂ ਮੰਡੀ ਅਤੇ ਚਾਰੇ ਦੇ ਰੋਜ਼ਾਨਾ ਭਾਅ',
        govt_schemes: 'ਸਰਕਾਰੀ ਪਸ਼ੂ ਧਨ ਸਕੀਮਾਂ ਅਤੇ ਸਬਸਿਡੀਆਂ',
        pregnancy_care: 'ਗੱਭਣ ਪਸ਼ੂਆਂ ਦੀ ਦੇਖਭਾਲ ਅਤੇ ਖੁਰਾਕ',
        heat_cycle: 'ਗਰਮੀ (ਹੀਟ) ਚੱਕਰ ਕੈਲੰਡਰ ਟਰੈਕਰ'
      },
      admin: {
        admin_title: 'ਮੁੱਖ ਪ੍ਰਸ਼ਾਸਕ ਕੰਟਰੋਲ ਪੈਨਲ',
        master_pin_label: 'ਮਾਸਟਰ ਸੁਰੱਖਿਆ ਪਿੰਨ ਦਰਜ ਕਰੋ',
        login_btn: 'ਸੁਰੱਖਿਅਤ ਲਾੱਗਇਨ ਕਰੋ',
        reset_pw: 'ਪਾਸਵਰਡ ਰੀਸੈੱਟ ਕਰੋ',
        payout_edit: 'ਭੁਗਤਾਨ ਅਤੇ ਕਮਿਸ਼ਨ ਸੋਧੋ',
        bank_sbi: 'ਸਟੇਟ ਬੈਂਕ ਆਫ਼ ਇੰਡੀਆ (SBI) ਗੇਟਵੇਅ',
        bank_pnb: 'ਪੰਜਾਬ ਨੈਸ਼ਨਲ ਬੈਂਕ (PNB) ਸਿੱਧਾ ਨਿਪਟਾਰਾ',
        subscription_plans: 'ਗਾਹਕੀ ਯੋਜਨਾਵਾਂ ਅਤੇ ਕੋਟਾ ਪ੍ਰਬੰਧਨ',
        user_analytics: 'ਵਰਤੋਂਕਾਰ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਆਡਿਟ'
      },
      common: {
        save: 'ਸੰਭਾਲੋ',
        cancel: 'ਰੱਦ ਕਰੋ',
        submit: 'ਜਮ੍ਹਾਂ ਕਰੋ',
        back: 'ਪਿੱਛੇ ਜਾਓ',
        edit: 'ਸੋਧੋ',
        delete: 'ਮਿਟਾਓ',
        loading: 'ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ, ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
        success: 'ਸਫਲ ਕਾਰਵਾਈ',
        error: 'ਗਲਤੀ ਆਈ ਹੈ',
        confirm: 'ਪੁਸ਼ਟੀ ਕਰੋ'
      }
    },

    mr: {
      nav: {
        app_name: 'वेटकेअर एआय ओएस',
        doctor_portal: 'पशुवैद्यकीय डॉक्टर पोर्टल',
        farmer_hub: 'शेतकरी आणि पशुपालक केंद्र',
        admin_portal: 'प्रशासक पोर्टल',
        api_key_btn: 'एपीआय की संरचना',
        session_timer: 'सत्र वेळ',
        trial_timer: 'चाचणी वेळ शिल्लक',
        logout: 'लॉग आउट करा',
        menu: 'मेनू'
      },
      doctor: {
        opd_title: 'ओपीडी आणि क्लिनिकल सल्लामसलत',
        patient_intake: 'रुग्ण प्राणी नोंदणी आणि इतिहास',
        species_select: 'प्राण्याची प्रजाती निवडा',
        breed_select: 'प्राण्याची जात निवडा',
        age_label: 'वय (वर्षे / महिने)',
        weight_calc: 'वजन गणक (शेफर सूत्र)',
        symptom_matrix: 'लक्षण मॅट्रिक्स आणि तपासणी',
        shaeffer_formula: 'शेफर सूत्र: (छातीचा घेर² × शरीराची लांबी) / ३००',
        ai_opinion: 'एआय द्वितीय मत आणि निदान',
        prescription: 'औषध आणि उपचार प्रिस्क्रिप्शन (Rx)',
        pregnancy_alert: 'चेतावणी: गर्भधारणा तपासणी आवश्यक आहे',
        save_record: 'केस रेकॉर्ड जतन करा',
        print_rx: 'प्रिस्क्रिप्शन प्रिंट करा'
      },
      farmer: {
        farmer_title: 'शेतकरी आणि पशुपालक सेवा केंद्र',
        desi_nuskhe: 'पारंपारिक देशी उपाय आणि प्रथमोपचार',
        milk_ledger: 'दूध उत्पादन आणि दैनिक नोंदवही',
        bulls_directory: 'उत्कृष्ट वळू आणि कृत्रिम रेतन डिरेक्टरी',
        mandi_rates: 'पशु बाजार आणि चारा दर',
        govt_schemes: 'शासकीय योजना आणि अनुदान (सबसिडी)',
        pregnancy_care: 'गाभण जनावरांची काळजी आणि आहार',
        heat_cycle: 'माजाचे चक्र (हीट) कॅलेंडर ट्रॅकर'
      },
      admin: {
        admin_title: 'मुख्य प्रशासक नियंत्रण कक्ष',
        master_pin_label: 'मास्टर सुरक्षा पिन प्रविष्ट करा',
        login_btn: 'सुरक्षित लॉगिन करा',
        reset_pw: 'सुरक्षा पासवर्ड रीसेट करा',
        payout_edit: 'पेआउट आणि कमिशन संपादन',
        bank_sbi: 'भारतीय स्टेट बँक (SBI) गेटवे',
        bank_pnb: 'पंजाब नॅशनल बँक (PNB) थेट निपटारा',
        subscription_plans: 'सदस्यत्व योजना आणि कोटा व्यवस्थापन',
        user_analytics: 'वापरकर्ता विश्लेषण आणि ऑडिट'
      },
      common: {
        save: 'जतन करा',
        cancel: 'रद्द करा',
        submit: 'प्रस्तुत करा',
        back: 'मागे जा',
        edit: 'संपादित करा',
        delete: 'हटवा',
        loading: 'कृपया प्रतीक्षा करा, लोड होत आहे...',
        success: 'यशस्वी कृती',
        error: 'त्रुटी आढळली',
        confirm: 'पुष्टी करा'
      }
    }
  };

  // Safe localStorage Access Utilities
  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn('[Vetcare i18n] Storage read blocked:', e);
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn('[Vetcare i18n] Storage write blocked:', e);
    }
  }

  // Toast Notification Dispatcher
  function displayToast(message, type) {
    if (typeof window.showAppToast === 'function') {
      window.showAppToast(message, type);
    } else if (window.VetcareApp.UI && typeof window.VetcareApp.UI.showToast === 'function') {
      window.VetcareApp.UI.showToast(message, type);
    } else {
      console.log('[i18n ' + (type || 'info').toUpperCase() + '] ' + message);
    }
  }

  // Helper: Traverse nested translation object via dot notation
  function resolvePath(obj, path) {
    if (!obj || typeof obj !== 'object' || !path) {
      return undefined;
    }
    var segments = path.split('.');
    var current = obj;
    for (var i = 0; i < segments.length; i++) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return undefined;
      }
      current = current[segments[i]];
    }
    return current;
  }

  // Helper: Find flat key if dot notation was omitted (e.g., 'opd_title' -> search sections)
  function resolveFlatKey(langDict, key) {
    if (!langDict || typeof langDict !== 'object') {
      return undefined;
    }
    var sections = ['nav', 'doctor', 'farmer', 'admin', 'common'];
    for (var i = 0; i < sections.length; i++) {
      var section = langDict[sections[i]];
      if (section && typeof section === 'object' && section[key] !== undefined) {
        return section[key];
      }
    }
    return undefined;
  }

  // State object
  var i18nState = {
    activeLanguage: FALLBACK_LANG,
    supportedLanguages: SUPPORTED_LANGUAGES,
    dictionaries: translations
  };

  // 3. DYNAMIC TRANSLATION ENGINE
  i18nState.t = function (key, fallback) {
    if (!key || typeof key !== 'string') {
      return fallback || '';
    }

    var cleanKey = key.trim();
    var activeDict = translations[i18nState.activeLanguage] || translations[FALLBACK_LANG];
    var fallbackDict = translations[FALLBACK_LANG];

    // 1. Try dot-notation in active language
    var value = resolvePath(activeDict, cleanKey);

    // 2. Try flat key search in active language
    if (value === undefined && cleanKey.indexOf('.') === -1) {
      value = resolveFlatKey(activeDict, cleanKey);
    }

    // 3. Try dot-notation in fallback language (Hindi)
    if (value === undefined) {
      value = resolvePath(fallbackDict, cleanKey);
    }

    // 4. Try flat key search in fallback language
    if (value === undefined && cleanKey.indexOf('.') === -1) {
      value = resolveFlatKey(fallbackDict, cleanKey);
    }

    // 5. Fallback provided by caller, or key itself
    if (value !== undefined && typeof value === 'string') {
      return value;
    }

    return fallback !== undefined ? fallback : cleanKey;
  };

  i18nState.translatePage = function (targetLang) {
    var lang = targetLang || i18nState.activeLanguage;
    if (!SUPPORTED_LANGUAGES[lang]) {
      lang = FALLBACK_LANG;
    }

    // Update <html lang="..."> and dir
    if (document.documentElement) {
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', SUPPORTED_LANGUAGES[lang].dir || 'ltr');
    }

    // Translate text content elements: [data-i18n]
    var textElements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < textElements.length; i++) {
      var el = textElements[i];
      var key = el.getAttribute('data-i18n');
      if (key) {
        var translated = i18nState.t(key, el.textContent);
        if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit' || el.type === 'reset')) {
          el.value = translated;
        } else {
          el.textContent = translated;
        }
      }
    }

    // Translate placeholders: [data-i18n-placeholder]
    var placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < placeholderElements.length; j++) {
      var pEl = placeholderElements[j];
      var pKey = pEl.getAttribute('data-i18n-placeholder');
      if (pKey) {
        pEl.setAttribute('placeholder', i18nState.t(pKey, pEl.getAttribute('placeholder') || ''));
      }
    }

    // Translate tooltips and titles: [data-i18n-title]
    var titleElements = document.querySelectorAll('[data-i18n-title]');
    for (var k = 0; k < titleElements.length; k++) {
      var tEl = titleElements[k];
      var tKey = tEl.getAttribute('data-i18n-title');
      if (tKey) {
        tEl.setAttribute('title', i18nState.t(tKey, tEl.getAttribute('title') || ''));
      }
    }

    // Translate accessible aria labels: [data-i18n-aria]
    var ariaElements = document.querySelectorAll('[data-i18n-aria]');
    for (var m = 0; m < ariaElements.length; m++) {
      var aEl = ariaElements[m];
      var aKey = aEl.getAttribute('data-i18n-aria');
      if (aKey) {
        aEl.setAttribute('aria-label', i18nState.t(aKey, aEl.getAttribute('aria-label') || ''));
      }
    }

    // Synchronize Language Switcher UI selectors
    var selectElements = document.querySelectorAll('#language-select, .language-select');
    for (var n = 0; n < selectElements.length; n++) {
      if (selectElements[n].value !== lang) {
        selectElements[n].value = lang;
      }
    }

    var btnElements = document.querySelectorAll('[data-lang-btn]');
    for (var b = 0; b < btnElements.length; b++) {
      var btnLang = btnElements[b].getAttribute('data-lang-btn');
      if (btnLang === lang) {
        btnElements[b].classList.add('active');
        btnElements[b].setAttribute('aria-pressed', 'true');
      } else {
        btnElements[b].classList.remove('active');
        btnElements[b].setAttribute('aria-pressed', 'false');
      }
    }
  };

  // 4. LANGUAGE SWITCHER & STORAGE
  i18nState.setLanguage = function (lang, suppressToast) {
    if (!lang || !SUPPORTED_LANGUAGES[lang]) {
      console.warn("[Vetcare i18n] Language '" + lang + "' not supported. Falling back to '" + FALLBACK_LANG + "'.");
      lang = FALLBACK_LANG;
    }

    i18nState.activeLanguage = lang;
    safeStorageSet('vetcare_lang', lang);

    // Apply translations across DOM
    i18nState.translatePage(lang);

    // Toast alert on user explicit change
    if (!suppressToast) {
      var alertMsg = LANG_CHANGE_MESSAGES[lang] || LANG_CHANGE_MESSAGES[FALLBACK_LANG];
      displayToast(alertMsg, 'info');
    }

    // Dispatch global event for modular listeners
    if (typeof window.dispatchEvent === 'function') {
      try {
        var event = new CustomEvent('vetcare:language-changed', {
          detail: {
            language: lang,
            metadata: SUPPORTED_LANGUAGES[lang]
          }
        });
        window.dispatchEvent(event);
      } catch (err) {
        // Fallback for legacy environments
        var fallbackEvent = document.createEvent('CustomEvent');
        fallbackEvent.initCustomEvent('vetcare:language-changed', false, false, {
          language: lang,
          metadata: SUPPORTED_LANGUAGES[lang]
        });
        window.dispatchEvent(fallbackEvent);
      }
    }

    return lang;
  };

  i18nState.getActiveLanguage = function () {
    return i18nState.activeLanguage;
  };

  i18nState.getSupportedLanguages = function () {
    return SUPPORTED_LANGUAGES;
  };

  // Attach to window namespace
  window.VetcareApp.i18n = i18nState;

  // 5. EVENT BINDING & AUTOMATIC INITIALIZATION
  function bindLanguageSwitchers() {
    // Dropdown change listeners
    document.addEventListener('change', function (e) {
      if (e.target && (e.target.id === 'language-select' || e.target.classList.contains('language-select'))) {
        var selectedLang = e.target.value;
        i18nState.setLanguage(selectedLang, false);
      }
    });

    // Button click listeners
    document.addEventListener('click', function (e) {
      var target = e.target;
      var btn = target.closest ? target.closest('[data-lang-btn]') : null;
      if (btn) {
        var targetLang = btn.getAttribute('data-lang-btn');
        if (targetLang) {
          e.preventDefault();
          i18nState.setLanguage(targetLang, false);
        }
      }
    });
  }

  function bootstrapI18n() {
    var stored = safeStorageGet('vetcare_lang');
    var initialLang = (stored && SUPPORTED_LANGUAGES[stored]) ? stored : FALLBACK_LANG;

    bindLanguageSwitchers();
    i18nState.setLanguage(initialLang, true);

    // Watch for dynamic DOM additions to apply translations automatically
    if (window.MutationObserver) {
      var observer = new MutationObserver(function (mutations) {
        var needsTranslation = false;
        for (var i = 0; i < mutations.length; i++) {
          if (mutations[i].addedNodes && mutations[i].addedNodes.length > 0) {
            needsTranslation = true;
            break;
          }
        }
        if (needsTranslation) {
          i18nState.translatePage(i18nState.activeLanguage);
        }
      });

      observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapI18n);
  } else {
    bootstrapI18n();
  }

})(window, document);
