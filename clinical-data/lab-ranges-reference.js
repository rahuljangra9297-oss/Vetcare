// Vetcare AI OS - Multi-Species Veterinary Laboratory Reference Intervals & Diagnostic Interpretation Engine (2026 Production)
(function () {
  "use strict";

  // 1. GLOBAL NAMESPACE ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // 2. MASTER LABORATORY REFERENCE INTERVALS DATABASE (8 SPECIES × 25+ PARAMETERS)
  const LAB_REFERENCE_INTERVALS = {
    // ========================================================================
    // BOVINE (CATTLE / गाय)
    // ========================================================================
    bovine: {
      speciesEn: "Bovine (Cattle)",
      speciesHi: "गाय (गोवंश)",
      hematology: {
        hb: { min: 8.0, max: 14.0, normal: 11.0, unit: "g/dL", nameEn: "Hemoglobin", nameHi: "हीमोग्लोबिन" },
        pcv: { min: 24.0, max: 40.0, normal: 32.0, unit: "%", nameEn: "Packed Cell Volume (Hematocrit)", nameHi: "पीसीवी / हेमेटोक्रिट" },
        rbc: { min: 5.0, max: 10.0, normal: 7.0, unit: "×10^6/µL", nameEn: "Total Erythrocyte Count", nameHi: "कुल लाल रक्त कोशिकाएं" },
        wbc: { min: 4.0, max: 12.0, normal: 8.0, unit: "×10^3/µL", nameEn: "Total Leukocyte Count (TLC)", nameHi: "कुल श्वेत रक्त कोशिकाएं" },
        neutrophils: { min: 15.0, max: 45.0, normal: 28.0, unit: "%", nameEn: "Neutrophils", nameHi: "न्यूट्रोफिल (कम अनुपात)" },
        lymphocytes: { min: 45.0, max: 75.0, normal: 60.0, unit: "%", nameEn: "Lymphocytes (Predominant in Ruminants)", nameHi: "लिम्फोसाइट (प्रमुख)" },
        monocytes: { min: 2.0, max: 7.0, normal: 4.0, unit: "%", nameEn: "Monocytes", nameHi: "मोनोसाइट" },
        eosinophils: { min: 2.0, max: 15.0, normal: 6.0, unit: "%", nameEn: "Eosinophils", nameHi: "इओसिनोफिल" },
        basophils: { min: 0.0, max: 2.0, normal: 0.5, unit: "%", nameEn: "Basophils", nameHi: "बेसोफिल" },
        platelets: { min: 200.0, max: 800.0, normal: 450.0, unit: "×10^3/µL", nameEn: "Platelet Count", nameHi: "प्लेटलेट्स" },
        mcv: { min: 40.0, max: 60.0, normal: 50.0, unit: "fL", nameEn: "Mean Corpuscular Volume", nameHi: "एमसीवी" },
        mchc: { min: 30.0, max: 36.0, normal: 33.0, unit: "g/dL", nameEn: "Mean Corpuscular Hb Conc.", nameHi: "एमसीएचसी" }
      },
      biochemistry: {
        bun: { min: 8.0, max: 25.0, normal: 15.0, unit: "mg/dL", nameEn: "Blood Urea Nitrogen (BUN)", nameHi: "ब्लड यूरिया नाइट्रोजन" },
        creatinine: { min: 0.8, max: 1.8, normal: 1.2, unit: "mg/dL", nameEn: "Serum Creatinine", nameHi: "सीरम क्रिएटिनिन" },
        totalProtein: { min: 6.5, max: 8.5, normal: 7.4, unit: "g/dL", nameEn: "Total Protein", nameHi: "कुल प्रोटीन" },
        albumin: { min: 2.8, max: 4.0, normal: 3.4, unit: "g/dL", nameEn: "Serum Albumin", nameHi: "सीरम एल्ब्यूमिन" },
        globulin: { min: 3.0, max: 4.8, normal: 4.0, unit: "g/dL", nameEn: "Serum Globulin", nameHi: "सीरम ग्लोब्युलिन" },
        agRatio: { min: 0.6, max: 1.1, normal: 0.85, unit: "ratio", nameEn: "A:G Ratio", nameHi: "ए:जी अनुपात" },
        alt: { min: 10.0, max: 50.0, normal: 25.0, unit: "U/L", nameEn: "Alanine Aminotransferase (Non-specific in cattle)", nameHi: "एएलटी (गैर-विशिष्ट)" },
        ast: { min: 60.0, max: 135.0, normal: 90.0, unit: "U/L", nameEn: "Aspartate Aminotransferase (Liver/Muscle)", nameHi: "एएसटी / एसजीओटी" },
        alp: { min: 30.0, max: 180.0, normal: 90.0, unit: "U/L", nameEn: "Alkaline Phosphatase", nameHi: "एएलपी" },
        totalBilirubin: { min: 0.1, max: 0.5, normal: 0.25, unit: "mg/dL", nameEn: "Total Bilirubin", nameHi: "कुल बिलीरुबिन" },
        calcium: { min: 8.5, max: 10.5, normal: 9.6, unit: "mg/dL", nameEn: "Total Serum Calcium", nameHi: "सीरम कैल्शियम" },
        phosphorus: { min: 4.5, max: 7.5, normal: 5.8, unit: "mg/dL", nameEn: "Inorganic Phosphorus", nameHi: "सीरम फास्फोरस" },
        magnesium: { min: 1.8, max: 3.0, normal: 2.3, unit: "mg/dL", nameEn: "Serum Magnesium", nameHi: "सीरम मैग्नीशियम" },
        glucose: { min: 40.0, max: 75.0, normal: 55.0, unit: "mg/dL", nameEn: "Blood Glucose (Low in Ruminants)", nameHi: "ब्लड ग्लूकोज" },
        lactate: { min: 0.5, max: 2.2, normal: 1.2, unit: "mmol/L", nameEn: "Blood Lactate", nameHi: "ब्लड लैक्टेट" }
      },
      urinalysis: {
        usg: { min: 1.025, max: 1.045, normal: 1.035, unit: "sp gr", nameEn: "Urine Specific Gravity", nameHi: "मूत्र विशिष्ट घनत्व" },
        urinePh: { min: 7.5, max: 8.5, normal: 8.0, unit: "pH", nameEn: "Urine pH (Alkaline Herbivore)", nameHi: "मूत्र पीएच (क्षारीय)" }
      }
    },

    // ========================================================================
    // BUBALINE (BUFFALO / भैंस)
    // ========================================================================
    bubaline: {
      speciesEn: "Bubaline (Water Buffalo)",
      speciesHi: "भैंस (महिषवंश)",
      hematology: {
        hb: { min: 9.0, max: 15.0, normal: 11.8, unit: "g/dL", nameEn: "Hemoglobin", nameHi: "हीमोग्लोबिन" },
        pcv: { min: 28.0, max: 42.0, normal: 34.0, unit: "%", nameEn: "Packed Cell Volume (Hematocrit)", nameHi: "पीसीवी" },
        rbc: { min: 5.5, max: 10.5, normal: 7.5, unit: "×10^6/µL", nameEn: "Total Erythrocyte Count", nameHi: "कुल आरबीसी" },
        wbc: { min: 4.5, max: 12.5, normal: 8.5, unit: "×10^3/µL", nameEn: "Total Leukocyte Count (TLC)", nameHi: "कुल डब्लूबीसी" },
        neutrophils: { min: 20.0, max: 45.0, normal: 32.0, unit: "%", nameEn: "Neutrophils", nameHi: "न्यूट्रोफिल" },
        lymphocytes: { min: 45.0, max: 70.0, normal: 58.0, unit: "%", nameEn: "Lymphocytes", nameHi: "लिम्फोसाइट" },
        monocytes: { min: 2.0, max: 6.0, normal: 3.5, unit: "%", nameEn: "Monocytes", nameHi: "मोनोसाइट" },
        eosinophils: { min: 2.0, max: 12.0, normal: 5.5, unit: "%", nameEn: "Eosinophils", nameHi: "इओसिनोफिल" },
        basophils: { min: 0.0, max: 2.0, normal: 0.5, unit: "%", nameEn: "Basophils", nameHi: "बेसोफिल" },
        platelets: { min: 200.0, max: 750.0, normal: 420.0, unit: "×10^3/µL", nameEn: "Platelet Count", nameHi: "प्लेटलेट्स" },
        mcv: { min: 42.0, max: 62.0, normal: 52.0, unit: "fL", nameEn: "Mean Corpuscular Volume", nameHi: "एमसीवी" },
        mchc: { min: 31.0, max: 37.0, normal: 34.0, unit: "g/dL", nameEn: "Mean Corpuscular Hb Conc.", nameHi: "एमसीएचसी" }
      },
      biochemistry: {
        bun: { min: 10.0, max: 28.0, normal: 18.0, unit: "mg/dL", nameEn: "Blood Urea Nitrogen (BUN)", nameHi: "ब्लड यूरिया" },
        creatinine: { min: 0.9, max: 2.0, normal: 1.3, unit: "mg/dL", nameEn: "Serum Creatinine", nameHi: "सीरम क्रिएटिनिन" },
        totalProtein: { min: 6.8, max: 8.8, normal: 7.6, unit: "g/dL", nameEn: "Total Protein", nameHi: "कुल प्रोटीन" },
        albumin: { min: 2.9, max: 4.2, normal: 3.5, unit: "g/dL", nameEn: "Serum Albumin", nameHi: "सीरम एल्ब्यूमिन" },
        globulin: { min: 3.2, max: 5.0, normal: 4.1, unit: "g/dL", nameEn: "Serum Globulin", nameHi: "सीरम ग्लोब्युलिन" },
        agRatio: { min: 0.65, max: 1.15, normal: 0.85, unit: "ratio", nameEn: "A:G Ratio", nameHi: "ए:जी अनुपात" },
        alt: { min: 12.0, max: 55.0, normal: 28.0, unit: "U/L", nameEn: "ALT", nameHi: "एएलटी" },
        ast: { min: 65.0, max: 145.0, normal: 95.0, unit: "U/L", nameEn: "AST / SGOT", nameHi: "एएसटी" },
        alp: { min: 35.0, max: 190.0, normal: 95.0, unit: "U/L", nameEn: "ALP", nameHi: "एएलपी" },
        totalBilirubin: { min: 0.1, max: 0.6, normal: 0.3, unit: "mg/dL", nameEn: "Total Bilirubin", nameHi: "कुल बिलीरुबिन" },
        calcium: { min: 8.8, max: 11.0, normal: 9.8, unit: "mg/dL", nameEn: "Total Serum Calcium", nameHi: "सीरम कैल्शियम" },
        phosphorus: { min: 4.0, max: 7.0, normal: 5.2, unit: "mg/dL", nameEn: "Inorganic Phosphorus (PPH risk <3.0)", nameHi: "सीरम फास्फोरस" },
        magnesium: { min: 1.9, max: 3.2, normal: 2.4, unit: "mg/dL", nameEn: "Serum Magnesium", nameHi: "सीरम मैग्नीशियम" },
        glucose: { min: 45.0, max: 80.0, normal: 58.0, unit: "mg/dL", nameEn: "Blood Glucose", nameHi: "ब्लड ग्लूकोज" },
        lactate: { min: 0.6, max: 2.4, normal: 1.3, unit: "mmol/L", nameEn: "Blood Lactate", nameHi: "ब्लड लैक्टेट" }
      },
      urinalysis: {
        usg: { min: 1.025, max: 1.048, normal: 1.036, unit: "sp gr", nameEn: "Urine Specific Gravity", nameHi: "मूत्र विशिष्ट घनत्व" },
        urinePh: { min: 7.5, max: 8.6, normal: 8.1, unit: "pH", nameEn: "Urine pH (Alkaline)", nameHi: "मूत्र पीएच" }
      }
    },

    // ========================================================================
    // CAPRINE (GOAT / बकरी)
    // ========================================================================
    caprine: {
      speciesEn: "Caprine (Goat)",
      speciesHi: "बकरी",
      hematology: {
        hb: { min: 8.0, max: 13.5, normal: 10.5, unit: "g/dL", nameEn: "Hemoglobin", nameHi: "हीमोग्लोबिन" },
        pcv: { min: 22.0, max: 38.0, normal: 28.0, unit: "%", nameEn: "Packed Cell Volume", nameHi: "पीसीवी" },
        rbc: { min: 8.0, max: 18.0, normal: 13.0, unit: "×10^6/µL", nameEn: "Total RBC (Microcytic)", nameHi: "आरबीसी (अत्यधिक संख्या)" },
        wbc: { min: 4.0, max: 13.0, normal: 8.5, unit: "×10^3/µL", nameEn: "Total WBC", nameHi: "डब्लूबीसी" },
        neutrophils: { min: 30.0, max: 50.0, normal: 40.0, unit: "%", nameEn: "Neutrophils", nameHi: "न्यूट्रोफिल" },
        lymphocytes: { min: 50.0, max: 70.0, normal: 58.0, unit: "%", nameEn: "Lymphocytes", nameHi: "लिम्फोसाइट" },
        monocytes: { min: 1.0, max: 4.0, normal: 2.5, unit: "%", nameEn: "Monocytes", nameHi: "मोनोसाइट" },
        eosinophils: { min: 2.0, max: 10.0, normal: 5.0, unit: "%", nameEn: "Eosinophils", nameHi: "इओसिनोफिल" },
        basophils: { min: 0.0, max: 1.5, normal: 0.5, unit: "%", nameEn: "Basophils", nameHi: "बेसोफिल" },
        platelets: { min: 300.0, max: 900.0, normal: 550.0, unit: "×10^3/µL", nameEn: "Platelet Count", nameHi: "प्लेटलेट्स" },
        mcv: { min: 16.0, max: 25.0, normal: 20.0, unit: "fL", nameEn: "MCV (Smallest of mammals)", nameHi: "एमसीवी (सबसे छोटा)" },
        mchc: { min: 30.0, max: 36.0, normal: 33.0, unit: "g/dL", nameEn: "MCHC", nameHi: "एमसीएचसी" }
      },
      biochemistry: {
        bun: { min: 10.0, max: 30.0, normal: 18.0, unit: "mg/dL", nameEn: "BUN", nameHi: "ब्लड यूरिया" },
        creatinine: { min: 0.8, max: 1.8, normal: 1.2, unit: "mg/dL", nameEn: "Creatinine", nameHi: "क्रिएटिनिन" },
        totalProtein: { min: 6.4, max: 7.9, normal: 7.0, unit: "g/dL", nameEn: "Total Protein", nameHi: "कुल प्रोटीन" },
        albumin: { min: 2.7, max: 3.9, normal: 3.3, unit: "g/dL", nameEn: "Albumin", nameHi: "एल्ब्यूमिन" },
        globulin: { min: 2.8, max: 4.5, normal: 3.7, unit: "g/dL", nameEn: "Globulin", nameHi: "ग्लोब्युलिन" },
        agRatio: { min: 0.65, max: 1.15, normal: 0.88, unit: "ratio", nameEn: "A:G Ratio", nameHi: "ए:जी अनुपात" },
        alt: { min: 15.0, max: 55.0, normal: 30.0, unit: "U/L", nameEn: "ALT", nameHi: "एएलटी" },
        ast: { min: 65.0, max: 180.0, normal: 110.0, unit: "U/L", nameEn: "AST", nameHi: "एएसटी" },
        alp: { min: 40.0, max: 250.0, normal: 120.0, unit: "U/L", nameEn: "ALP", nameHi: "एएलपी" },
        totalBilirubin: { min: 0.1, max: 0.4, normal: 0.2, unit: "mg/dL", nameEn: "Total Bilirubin", nameHi: "बिलीरुबिन" },
        calcium: { min: 8.8, max: 11.2, normal: 9.9, unit: "mg/dL", nameEn: "Calcium", nameHi: "कैल्शियम" },
        phosphorus: { min: 4.8, max: 8.2, normal: 6.2, unit: "mg/dL", nameEn: "Phosphorus", nameHi: "फास्फोरस" },
        magnesium: { min: 2.0, max: 3.2, normal: 2.5, unit: "mg/dL", nameEn: "Magnesium", nameHi: "मैग्नीशियम" },
        glucose: { min: 48.0, max: 75.0, normal: 60.0, unit: "mg/dL", nameEn: "Glucose", nameHi: "ग्लूकोज" },
        lactate: { min: 0.5, max: 2.2, normal: 1.1, unit: "mmol/L", nameEn: "Lactate", nameHi: "लैक्टेट" }
      },
      urinalysis: {
        usg: { min: 1.015, max: 1.040, normal: 1.028, unit: "sp gr", nameEn: "USG", nameHi: "विशिष्ट घनत्व" },
        urinePh: { min: 7.5, max: 8.5, normal: 8.0, unit: "pH", nameEn: "Urine pH", nameHi: "पीएच" }
      }
    },

    // ========================================================================
    // OVINE (SHEEP / भेड़)
    // ========================================================================
    ovine: {
      speciesEn: "Ovine (Sheep)",
      speciesHi: "भेड़",
      hematology: {
        hb: { min: 9.0, max: 14.5, normal: 11.2, unit: "g/dL", nameEn: "Hemoglobin", nameHi: "हीमोग्लोबिन" },
        pcv: { min: 27.0, max: 45.0, normal: 34.0, unit: "%", nameEn: "PCV", nameHi: "पीसीवी" },
        rbc: { min: 8.5, max: 16.0, normal: 11.5, unit: "×10^6/µL", nameEn: "Total RBC", nameHi: "आरबीसी" },
        wbc: { min: 4.0, max: 12.0, normal: 7.5, unit: "×10^3/µL", nameEn: "Total WBC", nameHi: "डब्लूबीसी" },
        neutrophils: { min: 20.0, max: 50.0, normal: 35.0, unit: "%", nameEn: "Neutrophils", nameHi: "न्यूट्रोफिल" },
        lymphocytes: { min: 45.0, max: 75.0, normal: 60.0, unit: "%", nameEn: "Lymphocytes", nameHi: "लिम्फोसाइट" },
        monocytes: { min: 1.0, max: 5.0, normal: 2.5, unit: "%", nameEn: "Monocytes", nameHi: "मोनोसाइट" },
        eosinophils: { min: 2.0, max: 10.0, normal: 5.0, unit: "%", nameEn: "Eosinophils", nameHi: "इओसिनोफिल" },
        basophils: { min: 0.0, max: 1.5, normal: 0.5, unit: "%", nameEn: "Basophils", nameHi: "बेसोफिल" },
        platelets: { min: 250.0, max: 800.0, normal: 480.0, unit: "×10^3/µL", nameEn: "Platelets", nameHi: "प्लेटलेट्स" },
        mcv: { min: 28.0, max: 40.0, normal: 33.0, unit: "fL", nameEn: "MCV", nameHi: "एमसीवी" },
        mchc: { min: 31.0, max: 37.0, normal: 34.0, unit: "g/dL", nameEn: "MCHC", nameHi: "एमसीएचसी" }
      },
      biochemistry: {
        bun: { min: 8.0, max: 28.0, normal: 16.0, unit: "mg/dL", nameEn: "BUN", nameHi: "ब्लड यूरिया" },
        creatinine: { min: 0.8, max: 1.7, normal: 1.1, unit: "mg/dL", nameEn: "Creatinine", nameHi: "क्रिएटिनिन" },
        totalProtein: { min: 6.0, max: 7.8, normal: 6.8, unit: "g/dL", nameEn: "Total Protein", nameHi: "कुल प्रोटीन" },
        albumin: { min: 2.6, max: 3.8, normal: 3.2, unit: "g/dL", nameEn: "Albumin", nameHi: "एल्ब्यूमिन" },
        globulin: { min: 2.8, max: 4.4, normal: 3.6, unit: "g/dL", nameEn: "Globulin", nameHi: "ग्लोब्युलिन" },
        agRatio: { min: 0.65, max: 1.15, normal: 0.88, unit: "ratio", nameEn: "A:G Ratio", nameHi: "ए:जी अनुपात" },
        alt: { min: 15.0, max: 50.0, normal: 28.0, unit: "U/L", nameEn: "ALT", nameHi: "एएलटी" },
        ast: { min: 60.0, max: 160.0, normal: 100.0, unit: "U/L", nameEn: "AST", nameHi: "एएसटी" },
        alp: { min: 40.0, max: 280.0, normal: 130.0, unit: "U/L", nameEn: "ALP", nameHi: "एएलपी" },
        totalBilirubin: { min: 0.1, max: 0.4, normal: 0.2, unit: "mg/dL", nameEn: "Total Bilirubin", nameHi: "बिलीरुबिन" },
        calcium: { min: 8.9, max: 11.5, normal: 10.2, unit: "mg/dL", nameEn: "Calcium", nameHi: "कैल्शियम" },
        phosphorus: { min: 4.5, max: 7.8, normal: 6.0, unit: "mg/dL", nameEn: "Phosphorus", nameHi: "फास्फोरस" },
        magnesium: { min: 2.0, max: 3.1, normal: 2.4, unit: "mg/dL", nameEn: "Magnesium", nameHi: "मैग्नीशियम" },
        glucose: { min: 45.0, max: 75.0, normal: 58.0, unit: "mg/dL", nameEn: "Glucose", nameHi: "ग्लूकोज" },
        lactate: { min: 0.5, max: 2.2, normal: 1.1, unit: "mmol/L", nameEn: "Lactate", nameHi: "लैक्टेट" }
      },
      urinalysis: {
        usg: { min: 1.015, max: 1.045, normal: 1.030, unit: "sp gr", nameEn: "USG", nameHi: "विशिष्ट घनत्व" },
        urinePh: { min: 7.5, max: 8.5, normal: 8.0, unit: "pH", nameEn: "Urine pH", nameHi: "पीएच" }
      }
    },

    // ========================================================================
    // EQUINE (HORSE / घोड़ा)
    // ========================================================================
    equine: {
      speciesEn: "Equine (Horse)",
      speciesHi: "घोड़ा (अश्व)",
      hematology: {
        hb: { min: 10.0, max: 18.0, normal: 13.5, unit: "g/dL", nameEn: "Hemoglobin", nameHi: "हीमोग्लोबिन" },
        pcv: { min: 32.0, max: 52.0, normal: 40.0, unit: "%", nameEn: "Packed Cell Volume (Hematocrit)", nameHi: "पीसीवी" },
        rbc: { min: 6.5, max: 12.5, normal: 9.0, unit: "×10^6/µL", nameEn: "Total RBC Count", nameHi: "आरबीसी" },
        wbc: { min: 5.5, max: 12.5, normal: 8.5, unit: "×10^3/µL", nameEn: "Total WBC Count", nameHi: "डब्लूबीसी" },
        neutrophils: { min: 35.0, max: 70.0, normal: 52.0, unit: "%", nameEn: "Neutrophils", nameHi: "न्यूट्रोफिल" },
        lymphocytes: { min: 20.0, max: 50.0, normal: 38.0, unit: "%", nameEn: "Lymphocytes", nameHi: "लिम्फोसाइट" },
        monocytes: { min: 1.0, max: 6.0, normal: 3.0, unit: "%", nameEn: "Monocytes", nameHi: "मोनोसाइट" },
        eosinophils: { min: 1.0, max: 8.0, normal: 4.0, unit: "%", nameEn: "Eosinophils", nameHi: "इओसिनोफिल" },
        basophils: { min: 0.0, max: 2.0, normal: 0.5, unit: "%", nameEn: "Basophils", nameHi: "बेसोफिल" },
        platelets: { min: 100.0, max: 350.0, normal: 200.0, unit: "×10^3/µL", nameEn: "Platelet Count", nameHi: "प्लेटलेट्स" },
        mcv: { min: 37.0, max: 52.0, normal: 44.0, unit: "fL", nameEn: "MCV", nameHi: "एमसीवी" },
        mchc: { min: 31.0, max: 37.0, normal: 34.0, unit: "g/dL", nameEn: "MCHC", nameHi: "एमसीएचसी" }
      },
      biochemistry: {
        bun: { min: 10.0, max: 25.0, normal: 17.0, unit: "mg/dL", nameEn: "BUN", nameHi: "ब्लड यूरिया" },
        creatinine: { min: 0.8, max: 1.8, normal: 1.3, unit: "mg/dL", nameEn: "Serum Creatinine", nameHi: "क्रिएटिनिन" },
        totalProtein: { min: 5.8, max: 7.8, normal: 6.8, unit: "g/dL", nameEn: "Total Protein", nameHi: "कुल प्रोटीन" },
        albumin: { min: 2.6, max: 3.8, normal: 3.2, unit: "g/dL", nameEn: "Albumin", nameHi: "एल्ब्यूमिन" },
        globulin: { min: 2.6, max: 4.2, normal: 3.5, unit: "g/dL", nameEn: "Globulin", nameHi: "ग्लोब्युलिन" },
        agRatio: { min: 0.7, max: 1.3, normal: 0.95, unit: "ratio", nameEn: "A:G Ratio", nameHi: "ए:जी अनुपात" },
        alt: { min: 5.0, max: 30.0, normal: 15.0, unit: "U/L", nameEn: "ALT (Non-specific in horse)", nameHi: "एएलटी" },
        ast: { min: 150.0, max: 400.0, normal: 250.0, unit: "U/L", nameEn: "AST (Muscle & Liver)", nameHi: "एएसटी" },
        alp: { min: 70.0, max: 250.0, normal: 140.0, unit: "U/L", nameEn: "Alkaline Phosphatase", nameHi: "एएलपी" },
        totalBilirubin: { min: 0.5, max: 2.2, normal: 1.2, unit: "mg/dL", nameEn: "Total Bilirubin (High normal)", nameHi: "बिलीरुबिन" },
        calcium: { min: 10.2, max: 13.4, normal: 11.8, unit: "mg/dL", nameEn: "Calcium (Higher in Equines)", nameHi: "कैल्शियम (उच्च)" },
        phosphorus: { min: 2.5, max: 5.0, normal: 3.6, unit: "mg/dL", nameEn: "Inorganic Phosphorus", nameHi: "फास्फोरस" },
        magnesium: { min: 1.6, max: 2.6, normal: 2.0, unit: "mg/dL", nameEn: "Magnesium", nameHi: "मैग्नीशियम" },
        glucose: { min: 70.0, max: 125.0, normal: 95.0, unit: "mg/dL", nameEn: "Blood Glucose", nameHi: "ब्लड ग्लूकोज" },
        lactate: { min: 0.6, max: 1.8, normal: 1.0, unit: "mmol/L", nameEn: "Blood Lactate", nameHi: "ब्लड लैक्टेट" }
      },
      urinalysis: {
        usg: { min: 1.020, max: 1.050, normal: 1.035, unit: "sp gr", nameEn: "USG (Turbid & viscous is normal)", nameHi: "विशिष्ट घनत्व" },
        urinePh: { min: 7.5, max: 8.5, normal: 8.0, unit: "pH", nameEn: "Urine pH (Alkaline with CaCO3)", nameHi: "पीएच" }
      }
    },

    // ========================================================================
    // CANINE (DOG / कुत्ता)
    // ========================================================================
    canine: {
      speciesEn: "Canine (Dog)",
      speciesHi: "कुत्ता (श्वान)",
      hematology: {
        hb: { min: 12.0, max: 18.0, normal: 15.0, unit: "g/dL", nameEn: "Hemoglobin", nameHi: "हीमोग्लोबिन" },
        pcv: { min: 37.0, max: 55.0, normal: 45.0, unit: "%", nameEn: "Packed Cell Volume (Hematocrit)", nameHi: "पीसीवी" },
        rbc: { min: 5.5, max: 8.5, normal: 6.8, unit: "×10^6/µL", nameEn: "Total RBC Count", nameHi: "आरबीसी" },
        wbc: { min: 6.0, max: 17.0, normal: 11.5, unit: "×10^3/µL", nameEn: "Total WBC Count", nameHi: "डब्लूबीसी" },
        neutrophils: { min: 60.0, max: 77.0, normal: 68.0, unit: "%", nameEn: "Segmented Neutrophils (Predominant)", nameHi: "न्यूट्रोफिल (प्रमुख)" },
        lymphocytes: { min: 12.0, max: 30.0, normal: 20.0, unit: "%", nameEn: "Lymphocytes", nameHi: "लिम्फोसाइट" },
        monocytes: { min: 3.0, max: 10.0, normal: 5.0, unit: "%", nameEn: "Monocytes", nameHi: "मोनोसाइट" },
        eosinophils: { min: 2.0, max: 10.0, normal: 4.5, unit: "%", nameEn: "Eosinophils", nameHi: "इओसिनोफिल" },
        basophils: { min: 0.0, max: 1.0, normal: 0.2, unit: "%", nameEn: "Basophils", nameHi: "बेसोफिल" },
        platelets: { min: 200.0, max: 500.0, normal: 320.0, unit: "×10^3/µL", nameEn: "Platelet Count (Thrombocytes)", nameHi: "प्लेटलेट्स" },
        mcv: { min: 60.0, max: 77.0, normal: 68.0, unit: "fL", nameEn: "Mean Corpuscular Volume", nameHi: "एमसीवी" },
        mchc: { min: 32.0, max: 36.0, normal: 34.0, unit: "g/dL", nameEn: "Mean Corpuscular Hb Conc.", nameHi: "एमसीएचसी" }
      },
      biochemistry: {
        bun: { min: 8.0, max: 28.0, normal: 16.0, unit: "mg/dL", nameEn: "BUN (Urea)", nameHi: "ब्लड यूरिया" },
        creatinine: { min: 0.5, max: 1.5, normal: 1.0, unit: "mg/dL", nameEn: "Serum Creatinine", nameHi: "क्रिएटिनिन" },
        totalProtein: { min: 5.5, max: 7.5, normal: 6.5, unit: "g/dL", nameEn: "Total Protein", nameHi: "कुल प्रोटीन" },
        albumin: { min: 2.5, max: 4.0, normal: 3.2, unit: "g/dL", nameEn: "Albumin", nameHi: "एल्ब्यूमिन" },
        globulin: { min: 2.5, max: 4.5, normal: 3.3, unit: "g/dL", nameEn: "Globulin", nameHi: "ग्लोब्युलिन" },
        agRatio: { min: 0.7, max: 1.4, normal: 1.0, unit: "ratio", nameEn: "A:G Ratio", nameHi: "ए:जी अनुपात" },
        alt: { min: 10.0, max: 100.0, normal: 45.0, unit: "U/L", nameEn: "ALT / SGPT (Liver Specific)", nameHi: "एएलटी (यकृत विशिष्ट)" },
        ast: { min: 15.0, max: 65.0, normal: 35.0, unit: "U/L", nameEn: "AST / SGOT", nameHi: "एएसटी" },
        alp: { min: 20.0, max: 150.0, normal: 70.0, unit: "U/L", nameEn: "Alkaline Phosphatase (ALP)", nameHi: "एएलपी" },
        totalBilirubin: { min: 0.1, max: 0.4, normal: 0.2, unit: "mg/dL", nameEn: "Total Bilirubin", nameHi: "बिलीरुबिन" },
        calcium: { min: 9.0, max: 11.5, normal: 10.2, unit: "mg/dL", nameEn: "Total Calcium", nameHi: "कैल्शियम" },
        phosphorus: { min: 2.5, max: 6.0, normal: 4.2, unit: "mg/dL", nameEn: "Inorganic Phosphorus", nameHi: "फास्फोरस" },
        magnesium: { min: 1.8, max: 2.6, normal: 2.1, unit: "mg/dL", nameEn: "Magnesium", nameHi: "मैग्नीशियम" },
        glucose: { min: 70.0, max: 120.0, normal: 95.0, unit: "mg/dL", nameEn: "Blood Glucose", nameHi: "ब्लड ग्लूकोज" },
        lactate: { min: 0.5, max: 2.0, normal: 1.0, unit: "mmol/L", nameEn: "Blood Lactate", nameHi: "ब्लड लैक्टेट" }
      },
      urinalysis: {
        usg: { min: 1.015, max: 1.045, normal: 1.030, unit: "sp gr", nameEn: "Urine Specific Gravity", nameHi: "विशिष्ट घनत्व" },
        urinePh: { min: 5.5, max: 7.0, normal: 6.5, unit: "pH", nameEn: "Urine pH (Acidic Carnivore)", nameHi: "पीएच (अम्लीय)" }
      }
    },

    // ========================================================================
    // FELINE (CAT / बिल्ली)
    // ========================================================================
    feline: {
      speciesEn: "Feline (Cat)",
      speciesHi: "बिल्ली (मार्जार)",
      hematology: {
        hb: { min: 9.5, max: 15.5, normal: 12.5, unit: "g/dL", nameEn: "Hemoglobin", nameHi: "हीमोग्लोबिन" },
        pcv: { min: 29.0, max: 45.0, normal: 37.0, unit: "%", nameEn: "Packed Cell Volume (Hematocrit)", nameHi: "पीसीवी" },
        rbc: { min: 6.0, max: 10.0, normal: 8.0, unit: "×10^6/µL", nameEn: "Total RBC Count", nameHi: "आरबीसी" },
        wbc: { min: 5.5, max: 19.0, normal: 11.0, unit: "×10^3/µL", nameEn: "Total WBC Count", nameHi: "डब्लूबीसी" },
        neutrophils: { min: 35.0, max: 75.0, normal: 60.0, unit: "%", nameEn: "Neutrophils", nameHi: "न्यूट्रोफिल" },
        lymphocytes: { min: 20.0, max: 55.0, normal: 32.0, unit: "%", nameEn: "Lymphocytes", nameHi: "लिम्फोसाइट" },
        monocytes: { min: 1.0, max: 4.0, normal: 2.5, unit: "%", nameEn: "Monocytes", nameHi: "मोनोसाइट" },
        eosinophils: { min: 2.0, max: 12.0, normal: 5.0, unit: "%", nameEn: "Eosinophils", nameHi: "इओसिनोफिल" },
        basophils: { min: 0.0, max: 1.0, normal: 0.2, unit: "%", nameEn: "Basophils", nameHi: "बेसोफिल" },
        platelets: { min: 180.0, max: 550.0, normal: 300.0, unit: "×10^3/µL", nameEn: "Platelets (Clumping Common)", nameHi: "प्लेटलेट्स" },
        mcv: { min: 39.0, max: 55.0, normal: 46.0, unit: "fL", nameEn: "MCV", nameHi: "एमसीवी" },
        mchc: { min: 30.0, max: 36.0, normal: 33.0, unit: "g/dL", nameEn: "MCHC", nameHi: "एमसीएचसी" }
      },
      biochemistry: {
        bun: { min: 15.0, max: 34.0, normal: 24.0, unit: "mg/dL", nameEn: "BUN (Higher normal)", nameHi: "ब्लड यूरिया" },
        creatinine: { min: 0.8, max: 2.2, normal: 1.4, unit: "mg/dL", nameEn: "Serum Creatinine", nameHi: "क्रिएटिनिन" },
        totalProtein: { min: 6.0, max: 8.2, normal: 7.2, unit: "g/dL", nameEn: "Total Protein", nameHi: "कुल प्रोटीन" },
        albumin: { min: 2.4, max: 3.9, normal: 3.1, unit: "g/dL", nameEn: "Albumin", nameHi: "एल्ब्यूमिन" },
        globulin: { min: 2.8, max: 5.1, normal: 4.0, unit: "g/dL", nameEn: "Globulin (Elevated in FIP)", nameHi: "ग्लोब्युलिन" },
        agRatio: { min: 0.55, max: 1.2, normal: 0.8, unit: "ratio", nameEn: "A:G Ratio (<0.4 suggests FIP)", nameHi: "ए:जी अनुपात" },
        alt: { min: 15.0, max: 100.0, normal: 45.0, unit: "U/L", nameEn: "ALT / SGPT (Liver Specific)", nameHi: "एएलटी" },
        ast: { min: 10.0, max: 80.0, normal: 35.0, unit: "U/L", nameEn: "AST / SGOT", nameHi: "एएसटी" },
        alp: { min: 10.0, max: 90.0, normal: 40.0, unit: "U/L", nameEn: "Alkaline Phosphatase (Short half-life)", nameHi: "एएलपी" },
        totalBilirubin: { min: 0.1, max: 0.3, normal: 0.15, unit: "mg/dL", nameEn: "Total Bilirubin", nameHi: "बिलीरुबिन" },
        calcium: { min: 8.5, max: 10.5, normal: 9.5, unit: "mg/dL", nameEn: "Calcium", nameHi: "कैल्शियम" },
        phosphorus: { min: 3.0, max: 6.5, normal: 4.8, unit: "mg/dL", nameEn: "Phosphorus", nameHi: "फास्फोरस" },
        magnesium: { min: 1.8, max: 2.5, normal: 2.1, unit: "mg/dL", nameEn: "Magnesium", nameHi: "मैग्नीशियम" },
        glucose: { min: 70.0, max: 140.0, normal: 100.0, unit: "mg/dL", nameEn: "Glucose (Stress spikes to 250)", nameHi: "ग्लूकोज" },
        lactate: { min: 0.5, max: 2.0, normal: 1.0, unit: "mmol/L", nameEn: "Blood Lactate", nameHi: "ब्लड लैक्टेट" }
      },
      urinalysis: {
        usg: { min: 1.020, max: 1.060, normal: 1.045, unit: "sp gr", nameEn: "USG (High concentrating capacity)", nameHi: "विशिष्ट घनत्व" },
        urinePh: { min: 6.0, max: 7.0, normal: 6.5, unit: "pH", nameEn: "Urine pH (Acidic)", nameHi: "पीएच" }
      }
    },

    // ========================================================================
    // AVIAN (POULTRY / पक्षी / मुर्गीपालन)
    // ========================================================================
    avian: {
      speciesEn: "Avian (Commercial Poultry / Chicken)",
      speciesHi: "मुर्गीपालन (कुक्कुट)",
      hematology: {
        hb: { min: 7.0, max: 13.0, normal: 9.5, unit: "g/dL", nameEn: "Hemoglobin", nameHi: "हीमोग्लोबिन" },
        pcv: { min: 22.0, max: 35.0, normal: 30.0, unit: "%", nameEn: "Packed Cell Volume", nameHi: "पीसीवी" },
        rbc: { min: 2.0, max: 4.5, normal: 3.2, unit: "×10^6/µL", nameEn: "Total RBC (Nucleated)", nameHi: "आरबीसी (केंद्रक युक्त)" },
        wbc: { min: 12.0, max: 30.0, normal: 20.0, unit: "×10^3/µL", nameEn: "Total Leukocytes (High Baseline)", nameHi: "डब्लूबीसी (उच्च)" },
        neutrophils: { min: 40.0, max: 75.0, normal: 55.0, unit: "%", nameEn: "Heterophils (Avian equivalent of neutrophils)", nameHi: "हेट्रोफिल" },
        lymphocytes: { min: 20.0, max: 60.0, normal: 38.0, unit: "%", nameEn: "Lymphocytes", nameHi: "लिम्फोसाइट" },
        monocytes: { min: 2.0, max: 8.0, normal: 4.0, unit: "%", nameEn: "Monocytes", nameHi: "मोनोसाइट" },
        eosinophils: { min: 1.0, max: 5.0, normal: 2.5, unit: "%", nameEn: "Eosinophils", nameHi: "इओसिनोफिल" },
        basophils: { min: 1.0, max: 4.0, normal: 2.0, unit: "%", nameEn: "Basophils", nameHi: "बेसोफिल" },
        platelets: { min: 20.0, max: 50.0, normal: 35.0, unit: "×10^3/µL", nameEn: "Thrombocytes (Nucleated)", nameHi: "थ्रोम्बोसाइट" },
        mcv: { min: 90.0, max: 140.0, normal: 115.0, unit: "fL", nameEn: "MCV (Large nucleated cells)", nameHi: "एमसीवी" },
        mchc: { min: 27.0, max: 33.0, normal: 30.0, unit: "g/dL", nameEn: "MCHC", nameHi: "एमसीएचसी" }
      },
      biochemistry: {
        bun: { min: 2.5, max: 8.5, normal: 5.0, unit: "mg/dL", nameEn: "Uric Acid (Replaces BUN in birds)", nameHi: "यूरिक एसिड" },
        creatinine: { min: 0.1, max: 0.4, normal: 0.2, unit: "mg/dL", nameEn: "Creatinine (Very low in birds)", nameHi: "क्रिएटिनिन" },
        totalProtein: { min: 3.0, max: 5.5, normal: 4.2, unit: "g/dL", nameEn: "Total Protein (Lower in birds)", nameHi: "कुल प्रोटीन" },
        albumin: { min: 1.5, max: 2.8, normal: 2.1, unit: "g/dL", nameEn: "Albumin", nameHi: "एल्ब्यूमिन" },
        globulin: { min: 1.5, max: 3.2, normal: 2.2, unit: "g/dL", nameEn: "Globulin", nameHi: "ग्लोब्युलिन" },
        agRatio: { min: 0.6, max: 1.2, normal: 0.9, unit: "ratio", nameEn: "A:G Ratio", nameHi: "ए:जी अनुपात" },
        alt: { min: 10.0, max: 50.0, normal: 25.0, unit: "U/L", nameEn: "ALT", nameHi: "एएलटी" },
        ast: { min: 100.0, max: 350.0, normal: 220.0, unit: "U/L", nameEn: "AST (Primary avian liver enzyme)", nameHi: "एएसटी (प्रमुख लिवर एंजाइम)" },
        alp: { min: 150.0, max: 900.0, normal: 450.0, unit: "U/L", nameEn: "ALP (High in growing/laying birds)", nameHi: "एएलपी" },
        totalBilirubin: { min: 0.05, max: 0.3, normal: 0.1, unit: "mg/dL", nameEn: "Biliverdin/Bilirubin", nameHi: "बिलीवरडिन" },
        calcium: { min: 8.5, max: 14.0, normal: 10.5, unit: "mg/dL", nameEn: "Calcium (Laying hens up to 25.0)", nameHi: "कैल्शियम (अंडा लेयर में 25 तक)" },
        phosphorus: { min: 4.0, max: 7.5, normal: 5.5, unit: "mg/dL", nameEn: "Phosphorus", nameHi: "फास्फोरस" },
        magnesium: { min: 1.8, max: 3.2, normal: 2.4, unit: "mg/dL", nameEn: "Magnesium", nameHi: "मैग्नीशियम" },
        glucose: { min: 200.0, max: 450.0, normal: 300.0, unit: "mg/dL", nameEn: "Blood Glucose (Very high in birds)", nameHi: "ब्लड ग्लूकोज (अत्यधिक)" },
        lactate: { min: 1.0, max: 4.0, normal: 2.2, unit: "mmol/L", nameEn: "Lactate", nameHi: "लैक्टेट" }
      },
      urinalysis: {
        usg: { min: 1.005, max: 1.020, normal: 1.012, unit: "sp gr", nameEn: "Urine Specific Gravity", nameHi: "विशिष्ट घनत्व" },
        urinePh: { min: 6.0, max: 7.5, normal: 6.8, unit: "pH", nameEn: "Urine pH", nameHi: "पीएच" }
      }
    }
  };

  // 3. COMMON PATHOLOGICAL DIFFERENTIAL CAUSES DICTIONARY
  const DIFFERENTIAL_CAUSES = {
    bun: {
      high: [
        "Pre-Renal Azotemia: Severe hypovolemic dehydration, shock, low cardiac output.",
        "Primary Renal Failure: Acute tubular necrosis (aminoglycosides, NSAIDs), chronic glomerulonephritis, leptospirosis.",
        "Post-Renal Azotemia: Urethral obstruction ('Blocked Cat' / Urolithiasis), rupture of urinary bladder (uroabdomen).",
        "High-protein diet engorgement or upper gastrointestinal bleeding (digestion of blood proteins)."
      ],
      low: [
        "Severe hepatic failure or portosystemic shunt (inability to synthesize urea from ammonia).",
        "Overhydration / aggressive intravenous fluid therapy (hemodilution).",
        "Extreme protein malnutrition or low-protein starvation diets."
      ]
    },
    creatinine: {
      high: [
        "Intrinsic renal disease: Reduction of >75% of functional nephrons.",
        "Pre-renal hypoperfusion: Dehydration and severe circulatory collapse.",
        "Complete urinary tract rupture or obstructive urolithiasis.",
        "Severe rhabdomyolysis or intense muscular trauma."
      ],
      low: [
        "Severe muscle wasting, cachexia, and advanced sarcopenia.",
        "Small muscle mass / micro-breeds or juvenile animals."
      ]
    },
    pcv: {
      high: [
        "Relative Polycythemia: Severe dehydration with hemoconcentration (loss of plasma water).",
        "Absolute Polycythemia: Chronic hypoxia (high altitude, right-to-left cardiac shunts), polycythemia vera.",
        "Splenic contraction mediated by acute epinephrine release (fright, excitement in horses and cats)."
      ],
      low: [
        "Regenerative Anemia: Acute blood loss (trauma, bleeding ulcers) or acute hemolysis (Babesiosis, Mycoplasma, IMHA).",
        "Non-Regenerative Anemia: Anemia of chronic disease, chronic kidney disease (lack of erythropoietin), bone marrow aplasia, FeLV/Ehrlichia."
      ]
    },
    calcium: {
      high: [
        "Hypercalcemia of Malignancy (Lymphoma, anal sac apocrine gland adenocarcinoma via PTHrP).",
        "Hyperparathyroidism (Primary adenoma).",
        "Cholecalciferol (Vitamin D3) rodenticide toxicity or ingestion of calcidiol toxic plants (Cestrum diurnum).",
        "Hypoadrenocorticism (Addison's disease in dogs)."
      ],
      low: [
        "Parturient Paresis / Milk Fever in periparturient dairy cattle and buffaloes.",
        "Puerperal Tetany / Eclampsia in small breed lactating bitches.",
        "Acute Pancreatitis (calcium saponification in peri-pancreatic fat).",
        "Severe Hypoalbuminemia (pseudohypocalcemia; reduced protein-bound calcium).",
        "Ethylene glycol (Antifreeze) toxicity (calcium oxalate chelation)."
      ]
    },
    phosphorus: {
      high: [
        "Decreased renal glomerular filtration rate (hallmark finding in acute or chronic renal failure).",
        "Hypoparathyroidism.",
        "Severe tissue trauma, rhabdomyolysis, or acute tumor lysis syndrome."
      ],
      low: [
        "Post-Parturient Hemoglobinuria (PPH) in high-yielding dairy buffaloes and cows.",
        "Primary Hyperparathyroidism.",
        "Refeeding Syndrome: Rapid intracellular shift during insulin therapy or re-feeding in feline hepatic lipidosis."
      ]
    },
    alt: {
      high: [
        "Acute hepatocellular necrosis, toxic hepatitis (paracetamol, aflatoxins, xylitol in dogs).",
        "Canine infectious hepatitis (CAV-1), leptospirosis.",
        "Hepatic lipidosis in cats, circulatory hypoxia from congestive heart failure."
      ],
      low: [
        "End-stage cirrhosis with marked loss of viable hepatocyte parenchyma."
      ]
    },
    ast: {
      high: [
        "Hepatic parenchymal necrosis in all species.",
        "Severe skeletal muscle injury: Rhabdomyolysis, capture myopathy, black quarter, recumbency pressure damage.",
        "Hemolysis of blood sample (in-vitro artifact)."
      ],
      low: [
        "Clinically insignificant."
      ]
    },
    glucose: {
      high: [
        "Diabetes Mellitus (accompanied by glucosuria and ketonuria).",
        "Physiological Stress Hyperglycemia (epinephrine-mediated in cats; values up to 250-300 mg/dL).",
        "Hyperadrenocorticism (Cushing's disease) or exogenous corticosteroid therapy."
      ],
      low: [
        "Bovine Ketosis / Acetonemia in early lactation.",
        "Neonatal hypoglycemia in weak piglets, puppies, and calves.",
        "Insulinoma (pancreatic beta-cell functional tumor in dogs).",
        "End-stage septic shock (bacterial consumption of glucose)."
      ]
    }
  };

  // 4. DIAGNOSTIC INTERPRETATION ENGINE IMPLEMENTATION
  const LabEngine = {
    intervals: LAB_REFERENCE_INTERVALS,
    differentialCauses: DIFFERENTIAL_CAUSES
  };

  /**
   * Evaluates an individual laboratory test value against reference standards for the target species.
   *
   * @param {string} species - 'bovine', 'bubaline', 'caprine', 'ovine', 'equine', 'canine', 'feline', 'avian'
   * @param {string} testKey - Parameter key (e.g., 'hb', 'pcv', 'wbc', 'bun', 'creatinine', 'calcium', 'phosphorus')
   * @param {number} userValue - Numeric value reported by clinical analyzer
   * @returns {Object} Evaluation status, deviation, reference text, and unit.
   */
  LabEngine.evaluateLabValue = function (species, testKey, userValue) {
    const sp = (species || "bovine").trim().toLowerCase();
    const key = (testKey || "").trim();
    const val = parseFloat(userValue);

    const refTable = LAB_REFERENCE_INTERVALS[sp] || LAB_REFERENCE_INTERVALS.bovine;

    // Locate parameter in hematology, biochemistry, or urinalysis
    let param = null;
    let section = "general";

    if (refTable.hematology && refTable.hematology[key]) {
      param = refTable.hematology[key];
      section = "hematology";
    } else if (refTable.biochemistry && refTable.biochemistry[key]) {
      param = refTable.biochemistry[key];
      section = "biochemistry";
    } else if (refTable.urinalysis && refTable.urinalysis[key]) {
      param = refTable.urinalysis[key];
      section = "urinalysis";
    }

    if (!param) {
      return { error: "Parameter '" + key + "' not configured for species: " + sp };
    }

    if (isNaN(val)) {
      return { error: "Invalid numeric test value provided: " + userValue };
    }

    let status = "NORMAL";
    const minVal = param.min;
    const maxVal = param.max;
    const midVal = (minVal + maxVal) / 2.0;

    // Severity Boundaries
    const criticalLowThreshold = minVal * 0.70;
    const criticalHighThreshold = maxVal * 1.50;

    if (val < minVal) {
      status = (val <= criticalLowThreshold) ? "CRITICAL_LOW" : "LOW";
    } else if (val > maxVal) {
      status = (val >= criticalHighThreshold) ? "CRITICAL_HIGH" : "HIGH";
    }

    const deviation = Number((((val - midVal) / midVal) * 100.0).toFixed(1));

    return {
      species: sp,
      testKey: key,
      nameEn: param.nameEn,
      nameHi: param.nameHi,
      reportedValue: val,
      unit: param.unit,
      referenceRange: { min: minVal, max: maxVal, normal: param.normal },
      normalRangeText: minVal + " - " + maxVal + " " + param.unit,
      status: status,
      deviationPercent: deviation,
      isAbnormal: status !== "NORMAL",
      isCritical: status === "CRITICAL_LOW" || status === "CRITICAL_HIGH"
    };
  };

  /**
   * AUTOMATED FULL PANEL INTERPRETATION ENGINE:
   * Evaluates entire profile (CBC + Biochemistry + Urinalysis) and synthesizes multi-parameter syndromes.
   *
   * @param {string} species - Animal species
   * @param {Object} panelResults - Key-value pair of tests e.g. { bun: 45, creatinine: 3.2, pcv: 18, calcium: 6.2 }
   */
  LabEngine.interpretFullPanel = function (species, panelResults) {
    if (!panelResults || typeof panelResults !== "object") {
      return { error: "Invalid panel results object provided." };
    }

    const sp = (species || "bovine").trim().toLowerCase();
    const evaluations = [];
    const criticalAlerts = [];
    const diagnosedSyndromes = [];

    // Evaluate each individual parameter
    const keys = Object.keys(panelResults);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const evalResult = LabEngine.evaluateLabValue(sp, k, panelResults[k]);
      if (!evalResult.error) {
        evaluations.push(evalResult);
        if (evalResult.isCritical) {
          criticalAlerts.push({
            param: evalResult.nameEn,
            status: evalResult.status,
            reported: evalResult.reportedValue + " " + evalResult.unit,
            reference: evalResult.normalRangeText
          });
        }
      }
    }

    // Fast helper to query evaluated status
    const getStatus = function (testKey) {
      const item = evaluations.find(e => e.testKey === testKey);
      return item ? item.status : "UNTESTED";
    };
    const getValue = function (testKey) {
      const item = evaluations.find(e => e.testKey === testKey);
      return item ? item.reportedValue : null;
    };

    // ========================================================================
    // CLINICAL SYNDROMIC PATTERN RECOGNITION
    // ========================================================================

    // 1. Azotemia & Renal Dysfunction
    const bunStat = getStatus("bun");
    const creatStat = getStatus("creatinine");
    const usgVal = getValue("usg");

    if (bunStat.indexOf("HIGH") !== -1 || creatStat.indexOf("HIGH") !== -1) {
      let azotemiaType = "Azotemia (Unspecified Origin)";
      let rationale = "Elevated nitrogenous waste products (BUN and/or Creatinine).";

      if (usgVal !== null) {
        const isConcentrated = (sp === "feline" && usgVal > 1.035) || (sp === "canine" && usgVal > 1.030) || (usgVal > 1.025);
        if (isConcentrated) {
          azotemiaType = "Pre-Renal Azotemia (Dehydration / Hypoperfusion)";
          rationale = "Elevated BUN/Creatinine with adequately concentrated urine (USG > " + usgVal + "). Indicates dehydration or shock.";
        } else if (usgVal >= 1.008 && usgVal <= 1.015) {
          azotemiaType = "Primary Renal Azotemia (Intrinsic Nephron Failure)";
          rationale = "Isosthenuria (USG 1.008 - 1.015) in the face of elevated BUN/Creatinine confirms >75% functional nephron loss.";
        }
      }

      diagnosedSyndromes.push({
        syndrome: azotemiaType,
        severity: (creatStat === "CRITICAL_HIGH" || bunStat === "CRITICAL_HIGH") ? "CRITICAL" : "HIGH",
        rationale: rationale,
        recommendation: "Initiate IV fluid diuresis (0.9% Normal Saline or Plasmalyte). Avoid all nephrotoxic drugs (NSAIDs, Gentamicin)."
      });
    }

    // 2. Parturient Hypocalcemia / Milk Fever (Dairy Ruminants)
    const caVal = getValue("calcium");
    if ((sp === "bovine" || sp === "bubaline") && caVal !== null && caVal < 8.0) {
      diagnosedSyndromes.push({
        syndrome: "Clinical / Subclinical Hypocalcemia (Milk Fever / Parturient Paresis)",
        severity: caVal < 6.0 ? "CRITICAL EMERGENCY" : "HIGH",
        rationale: "Serum Calcium is " + caVal + " mg/dL (Baseline > 8.5 mg/dL). Flaccid paralysis risk.",
        recommendation: "Infuse 450 ml Calcium Borogluconate (CBG) slow IV over 20 minutes under cardiac auscultation."
      });
    }

    // 3. Post-Parturient Hemoglobinuria (PPH) / Severe Hypophosphatemia
    const pVal = getValue("phosphorus");
    const pcvVal = getValue("pcv");
    if ((sp === "bovine" || sp === "bubaline") && pVal !== null && pVal < 3.0) {
      diagnosedSyndromes.push({
        syndrome: "Post-Parturient Hypophosphatemia (PPH / Redwater Risk)",
        severity: pVal < 2.0 ? "CRITICAL EMERGENCY" : "HIGH",
        rationale: "Serum Phosphorus is " + pVal + " mg/dL (Baseline > 4.5 mg/dL). Triggers massive intravascular RBC lysis.",
        recommendation: "Administer Sodium Acid Phosphate (60-80g in 500ml distilled water IV) + oral drench. Avoid calcium infusions simultaneously."
      });
    }

    // 4. Anemia Assessment (PCV & Hb)
    const pcvStat = getStatus("pcv");
    const hbStat = getStatus("hb");
    if (pcvStat.indexOf("LOW") !== -1 || hbStat.indexOf("LOW") !== -1) {
      const mcvStat = getStatus("mcv");
      const mchcStat = getStatus("mchc");
      let anemiaType = "Anemia (Severity: Moderate)";

      if (pcvStat === "CRITICAL_LOW" || (pcvVal && pcvVal < 15)) {
        anemiaType = "Severe Life-Threatening Anemia (PCV < 15%)";
      }

      let morpho = "Normocytic Normochromic (Typical of non-regenerative anemia or acute peracute blood loss).";
      if (mcvStat === "HIGH" && mchcStat === "LOW") {
        morpho = "Macrocytic Hypochromic (HALLMARK OF REGENERATIVE ANEMIA / RETICULOCYTOSIS / HEMOLYSIS).";
      } else if (mcvStat === "LOW" && mchcStat === "LOW") {
        morpho = "Microcytic Hypochromic (HALLMARK OF CHRONIC IRON DEFICIENCY / BLOOD SUCKING PARASITES).";
      }

      diagnosedSyndromes.push({
        syndrome: anemiaType,
        severity: pcvStat === "CRITICAL_LOW" ? "CRITICAL" : "HIGH",
        rationale: morpho,
        recommendation: pcvVal && pcvVal < 14
          ? "CRITICAL: Whole blood transfusion indicated immediately. Screen for Babesia, Anaplasma, and internal hemorrhage."
          : "Administer hematinics (Iron dextran, Vitamin B12, Folic acid) and treat primary hemoparasites/helminths."
      });
    }

    // 5. Hepatocellular Insult / Liver Failure
    const altStat = getStatus("alt");
    const astStat = getStatus("ast");
    const biliStat = getStatus("totalBilirubin");
    if (altStat.indexOf("HIGH") !== -1 || (astStat.indexOf("HIGH") !== -1 && biliStat.indexOf("HIGH") !== -1)) {
      diagnosedSyndromes.push({
        syndrome: "Acute Hepatocellular Insult / Hepatic Necrosis",
        severity: "HIGH",
        rationale: "Marked leakage of intracellular liver enzymes into circulation with hyperbilirubinemia.",
        recommendation: "Provide hepatoprotectants (Silymarin, SAMe, Ursodeoxycholic acid). Discontinue all hepatotoxic medications."
      });
    }

    // 6. Hemoconcentration / Severe Dehydration (Relative Polycythemia)
    const tpStat = getStatus("totalProtein");
    if (pcvStat.indexOf("HIGH") !== -1 && tpStat.indexOf("HIGH") !== -1) {
      diagnosedSyndromes.push({
        syndrome: "Severe Hemoconcentration (Intravascular Fluid Volume Depletion)",
        severity: "HIGH",
        rationale: "Concurrent elevation of PCV and Total Protein indicates severe plasma water contraction.",
        recommendation: "Calculate fluid deficit immediately; start aggressive IV crystalloid therapy (Ringer's Lactate)."
      });
    }

    return {
      species: sp,
      totalParametersTested: keys.length,
      criticalAlerts: criticalAlerts,
      diagnosedSyndromes: diagnosedSyndromes,
      evaluations: evaluations
    };
  };

  /**
   * Retrieves full reference intervals for a given species.
   */
  LabEngine.getSpeciesReference = function (species) {
    const sp = (species || "bovine").trim().toLowerCase();
    return LAB_REFERENCE_INTERVALS[sp] || LAB_REFERENCE_INTERVALS.bovine;
  };

  /**
   * Returns list of all supported diagnostic test parameters.
   */
  LabEngine.getAllParameters = function () {
    const ref = LAB_REFERENCE_INTERVALS.bovine;
    const list = [];

    const addSection = function (secObj, catName) {
      const keys = Object.keys(secObj);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        list.push({
          key: k,
          category: catName,
          nameEn: secObj[k].nameEn,
          nameHi: secObj[k].nameHi,
          unit: secObj[k].unit
        });
      }
    };

    addSection(ref.hematology, "Hematology (CBC)");
    addSection(ref.biochemistry, "Serum Biochemistry");
    addSection(ref.urinalysis, "Urinalysis");

    return list;
  };

  /**
   * Returns differential pathological causes for abnormal test readings.
   */
  LabEngine.getDifferentialCauses = function (testKey, status) {
    if (!testKey) return [];
    const k = testKey.trim().toLowerCase();
    const st = (status || "high").trim().toLowerCase();

    if (DIFFERENTIAL_CAUSES[k]) {
      if (st.indexOf("high") !== -1 && DIFFERENTIAL_CAUSES[k].high) {
        return DIFFERENTIAL_CAUSES[k].high;
      } else if (st.indexOf("low") !== -1 && DIFFERENTIAL_CAUSES[k].low) {
        return DIFFERENTIAL_CAUSES[k].low;
      }
    }
    return ["Pathological causes not cataloged for this specific parameter state."];
  };

  // Expose to public clinical data namespace
  window.VetcareApp.ClinicalData.LabRanges = LabEngine;

})();
