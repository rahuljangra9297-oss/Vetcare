// Vetcare AI OS - Veterinary Clinical Pathology, Laboratory Diagnostic Analyzer & Printable Reporting Engine (2026 Production)
(function (root) {
  "use strict";

  root.VetcareApp = root.VetcareApp || {};
  root.VetcareApp.Modules = root.VetcareApp.Modules || {};
  root.VetcareApp.ClinicalData = root.VetcareApp.ClinicalData || {};

  // Database Constants
  const DB_NAME = "VetcareEMR_DB";
  const DB_VERSION = 1;
  const STORE_LAB_REPORTS = "clinical_records";

  // Master Comprehensive Species Reference Intervals Database
  const SPECIES_REFERENCE_TABLES = {
    canine: {
      label: "Canine (कैनिन / डॉग)",
      hb: { min: 12.0, max: 18.0, unit: "g/dL", critLow: 7.0, critHigh: 21.0, name: "Hemoglobin (Hb)" },
      pcv: { min: 37.0, max: 55.0, unit: "%", critLow: 20.0, critHigh: 65.0, name: "Hematocrit (PCV/HCT)" },
      rbc: { min: 5.5, max: 8.5, unit: "10^6/µL", critLow: 3.0, critHigh: 10.5, name: "Total Erythrocyte (RBC)" },
      wbc: { min: 6.0, max: 17.0, unit: "10^3/µL", critLow: 2.5, critHigh: 35.0, name: "Total Leukocyte (WBC/TLC)" },
      platelets: { min: 200, max: 500, unit: "10^3/µL", critLow: 50, critHigh: 900, name: "Platelet Count (PLT)" },
      neutrophils: { min: 60.0, max: 77.0, unit: "%", critLow: 30.0, critHigh: 90.0, name: "Neutrophils (Segs)" },
      lymphocytes: { min: 12.0, max: 30.0, unit: "%", critLow: 5.0, critHigh: 50.0, name: "Lymphocytes" },
      monocytes: { min: 3.0, max: 10.0, unit: "%", critLow: 0.0, critHigh: 15.0, name: "Monocytes" },
      eosinophils: { min: 2.0, max: 10.0, unit: "%", critLow: 0.0, critHigh: 20.0, name: "Eosinophils" },
      basophils: { min: 0.0, max: 1.0, unit: "%", critLow: 0.0, critHigh: 3.0, name: "Basophils" },
      bun: { min: 7.0, max: 27.0, unit: "mg/dL", critLow: 3.0, critHigh: 85.0, name: "Blood Urea Nitrogen (BUN)" },
      creatinine: { min: 0.5, max: 1.5, unit: "mg/dL", critLow: 0.2, critHigh: 5.0, name: "Serum Creatinine" },
      sdma: { min: 0.0, max: 14.0, unit: "µg/dL", critLow: 0.0, critHigh: 25.0, name: "Symmetric Dimethylarginine (SDMA)" },
      totalProtein: { min: 5.4, max: 7.5, unit: "g/dL", critLow: 3.5, critHigh: 10.0, name: "Total Serum Protein" },
      albumin: { min: 2.6, max: 4.0, unit: "g/dL", critLow: 1.5, critHigh: 5.0, name: "Albumin" },
      globulin: { min: 2.5, max: 4.5, unit: "g/dL", critLow: 1.5, critHigh: 6.5, name: "Globulin" },
      agRatio: { min: 0.7, max: 1.5, unit: "ratio", critLow: 0.3, critHigh: 2.5, name: "Albumin/Globulin (A:G)" },
      glucose: { min: 70.0, max: 110.0, unit: "mg/dL", critLow: 40.0, critHigh: 300.0, name: "Fasting Blood Glucose" },
      alt: { min: 10.0, max: 100.0, unit: "U/L", critLow: 0.0, critHigh: 450.0, name: "Alanine Aminotransferase (ALT)" },
      ast: { min: 10.0, max: 50.0, unit: "U/L", critLow: 0.0, critHigh: 250.0, name: "Aspartate Aminotransferase (AST)" },
      alp: { min: 20.0, max: 150.0, unit: "U/L", critLow: 0.0, critHigh: 600.0, name: "Alkaline Phosphatase (ALP)" },
      ggt: { min: 0.0, max: 10.0, unit: "U/L", critLow: 0.0, critHigh: 40.0, name: "Gamma-Glutamyl Transferase (GGT)" },
      totalBilirubin: { min: 0.1, max: 0.5, unit: "mg/dL", critLow: 0.0, critHigh: 2.5, name: "Total Bilirubin" },
      directBilirubin: { min: 0.0, max: 0.2, unit: "mg/dL", critLow: 0.0, critHigh: 1.2, name: "Direct (Conjugated) Bilirubin" },
      calcium: { min: 9.0, max: 11.5, unit: "mg/dL", critLow: 6.5, critHigh: 14.5, name: "Total Serum Calcium" },
      phosphorus: { min: 2.5, max: 6.0, unit: "mg/dL", critLow: 1.5, critHigh: 10.0, name: "Inorganic Phosphorus" },
      sodium: { min: 140.0, max: 155.0, unit: "mEq/L", critLow: 125.0, critHigh: 170.0, name: "Sodium (Na+)" },
      potassium: { min: 3.5, max: 5.5, unit: "mEq/L", critLow: 2.8, critHigh: 7.0, name: "Potassium (K+)" },
      chloride: { min: 105.0, max: 120.0, unit: "mEq/L", critLow: 90.0, critHigh: 135.0, name: "Chloride (Cl-)" }
    },
    feline: {
      label: "Feline (मार्जार / बिल्ली)",
      hb: { min: 8.0, max: 15.0, unit: "g/dL", critLow: 5.0, critHigh: 18.0, name: "Hemoglobin (Hb)" },
      pcv: { min: 24.0, max: 45.0, unit: "%", critLow: 15.0, critHigh: 55.0, name: "Hematocrit (PCV/HCT)" },
      rbc: { min: 5.0, max: 10.0, unit: "10^6/µL", critLow: 2.5, critHigh: 12.0, name: "Total Erythrocyte (RBC)" },
      wbc: { min: 5.5, max: 19.5, unit: "10^3/µL", critLow: 2.0, critHigh: 38.0, name: "Total Leukocyte (WBC/TLC)" },
      platelets: { min: 150, max: 600, unit: "10^3/µL", critLow: 40, critHigh: 950, name: "Platelet Count (PLT)" },
      neutrophils: { min: 35.0, max: 75.0, unit: "%", critLow: 20.0, critHigh: 88.0, name: "Neutrophils (Segs)" },
      lymphocytes: { min: 20.0, max: 55.0, unit: "%", critLow: 8.0, critHigh: 70.0, name: "Lymphocytes" },
      monocytes: { min: 1.0, max: 4.0, unit: "%", critLow: 0.0, critHigh: 10.0, name: "Monocytes" },
      eosinophils: { min: 2.0, max: 12.0, unit: "%", critLow: 0.0, critHigh: 22.0, name: "Eosinophils" },
      basophils: { min: 0.0, max: 1.0, unit: "%", critLow: 0.0, critHigh: 3.0, name: "Basophils" },
      bun: { min: 16.0, max: 36.0, unit: "mg/dL", critLow: 8.0, critHigh: 95.0, name: "Blood Urea Nitrogen (BUN)" },
      creatinine: { min: 0.8, max: 2.4, unit: "mg/dL", critLow: 0.3, critHigh: 6.5, name: "Serum Creatinine" },
      sdma: { min: 0.0, max: 14.0, unit: "µg/dL", critLow: 0.0, critHigh: 28.0, name: "Symmetric Dimethylarginine (SDMA)" },
      totalProtein: { min: 5.7, max: 8.9, unit: "g/dL", critLow: 4.0, critHigh: 11.0, name: "Total Serum Protein" },
      albumin: { min: 2.3, max: 3.9, unit: "g/dL", critLow: 1.4, critHigh: 5.0, name: "Albumin" },
      globulin: { min: 2.8, max: 5.1, unit: "g/dL", critLow: 1.8, critHigh: 7.0, name: "Globulin" },
      agRatio: { min: 0.5, max: 1.2, unit: "ratio", critLow: 0.2, critHigh: 2.0, name: "Albumin/Globulin (A:G)" },
      glucose: { min: 70.0, max: 150.0, unit: "mg/dL", critLow: 45.0, critHigh: 380.0, name: "Fasting Blood Glucose" },
      alt: { min: 12.0, max: 130.0, unit: "U/L", critLow: 0.0, critHigh: 500.0, name: "Alanine Aminotransferase (ALT)" },
      ast: { min: 10.0, max: 40.0, unit: "U/L", critLow: 0.0, critHigh: 200.0, name: "Aspartate Aminotransferase (AST)" },
      alp: { min: 14.0, max: 111.0, unit: "U/L", critLow: 0.0, critHigh: 350.0, name: "Alkaline Phosphatase (ALP)" },
      ggt: { min: 0.0, max: 5.0, unit: "U/L", critLow: 0.0, critHigh: 25.0, name: "Gamma-Glutamyl Transferase (GGT)" },
      totalBilirubin: { min: 0.1, max: 0.4, unit: "mg/dL", critLow: 0.0, critHigh: 2.0, name: "Total Bilirubin" },
      directBilirubin: { min: 0.0, max: 0.1, unit: "mg/dL", critLow: 0.0, critHigh: 1.0, name: "Direct (Conjugated) Bilirubin" },
      calcium: { min: 8.2, max: 10.8, unit: "mg/dL", critLow: 6.0, critHigh: 14.0, name: "Total Serum Calcium" },
      phosphorus: { min: 2.4, max: 8.2, unit: "mg/dL", critLow: 1.5, critHigh: 12.0, name: "Inorganic Phosphorus" },
      sodium: { min: 145.0, max: 158.0, unit: "mEq/L", critLow: 130.0, critHigh: 172.0, name: "Sodium (Na+)" },
      potassium: { min: 3.5, max: 5.5, unit: "mEq/L", critLow: 2.5, critHigh: 7.2, name: "Potassium (K+)" },
      chloride: { min: 110.0, max: 128.0, unit: "mEq/L", critLow: 95.0, critHigh: 140.0, name: "Chloride (Cl-)" }
    },
    bovine: {
      label: "Bovine (गोवंश / गाय)",
      hb: { min: 8.0, max: 15.0, unit: "g/dL", critLow: 5.5, critHigh: 17.5, name: "Hemoglobin (Hb)" },
      pcv: { min: 24.0, max: 46.0, unit: "%", critLow: 16.0, critHigh: 55.0, name: "Hematocrit (PCV/HCT)" },
      rbc: { min: 5.0, max: 10.0, unit: "10^6/µL", critLow: 3.0, critHigh: 13.0, name: "Total Erythrocyte (RBC)" },
      wbc: { min: 4.0, max: 12.0, unit: "10^3/µL", critLow: 2.0, critHigh: 28.0, name: "Total Leukocyte (WBC/TLC)" },
      platelets: { min: 100, max: 800, unit: "10^3/µL", critLow: 40, critHigh: 1100, name: "Platelet Count (PLT)" },
      neutrophils: { min: 15.0, max: 45.0, unit: "%", critLow: 8.0, critHigh: 75.0, name: "Neutrophils (Segs)" },
      lymphocytes: { min: 45.0, max: 75.0, unit: "%", critLow: 20.0, critHigh: 85.0, name: "Lymphocytes" },
      monocytes: { min: 2.0, max: 7.0, unit: "%", critLow: 0.0, critHigh: 12.0, name: "Monocytes" },
      eosinophils: { min: 2.0, max: 15.0, unit: "%", critLow: 0.0, critHigh: 25.0, name: "Eosinophils" },
      basophils: { min: 0.0, max: 2.0, unit: "%", critLow: 0.0, critHigh: 4.0, name: "Basophils" },
      bun: { min: 6.0, max: 27.0, unit: "mg/dL", critLow: 3.0, critHigh: 70.0, name: "Blood Urea Nitrogen (BUN)" },
      creatinine: { min: 0.7, max: 1.8, unit: "mg/dL", critLow: 0.3, critHigh: 4.5, name: "Serum Creatinine" },
      sdma: { min: 0.0, max: 14.0, unit: "µg/dL", critLow: 0.0, critHigh: 24.0, name: "Symmetric Dimethylarginine (SDMA)" },
      totalProtein: { min: 6.0, max: 8.5, unit: "g/dL", critLow: 4.0, critHigh: 11.5, name: "Total Serum Protein" },
      albumin: { min: 2.5, max: 3.8, unit: "g/dL", critLow: 1.5, critHigh: 4.8, name: "Albumin" },
      globulin: { min: 3.0, max: 5.0, unit: "g/dL", critLow: 1.8, critHigh: 7.5, name: "Globulin" },
      agRatio: { min: 0.5, max: 1.0, unit: "ratio", critLow: 0.2, critHigh: 1.8, name: "Albumin/Globulin (A:G)" },
      glucose: { min: 40.0, max: 75.0, unit: "mg/dL", critLow: 25.0, critHigh: 180.0, name: "Blood Glucose" },
      alt: { min: 11.0, max: 40.0, unit: "U/L", critLow: 0.0, critHigh: 150.0, name: "Alanine Aminotransferase (ALT)" },
      ast: { min: 45.0, max: 110.0, unit: "U/L", critLow: 15.0, critHigh: 350.0, name: "Aspartate Aminotransferase (AST)" },
      alp: { min: 18.0, max: 150.0, unit: "U/L", critLow: 0.0, critHigh: 400.0, name: "Alkaline Phosphatase (ALP)" },
      ggt: { min: 6.0, max: 32.0, unit: "U/L", critLow: 0.0, critHigh: 120.0, name: "Gamma-Glutamyl Transferase (GGT)" },
      totalBilirubin: { min: 0.1, max: 0.5, unit: "mg/dL", critLow: 0.0, critHigh: 2.2, name: "Total Bilirubin" },
      directBilirubin: { min: 0.0, max: 0.2, unit: "mg/dL", critLow: 0.0, critHigh: 1.0, name: "Direct Bilirubin" },
      calcium: { min: 8.0, max: 11.0, unit: "mg/dL", critLow: 5.5, critHigh: 13.5, name: "Total Serum Calcium" },
      phosphorus: { min: 4.5, max: 7.5, unit: "mg/dL", critLow: 2.0, critHigh: 11.0, name: "Inorganic Phosphorus" },
      sodium: { min: 132.0, max: 152.0, unit: "mEq/L", critLow: 120.0, critHigh: 165.0, name: "Sodium (Na+)" },
      potassium: { min: 3.9, max: 5.8, unit: "mEq/L", critLow: 2.8, critHigh: 7.0, name: "Potassium (K+)" },
      chloride: { min: 95.0, max: 110.0, unit: "mEq/L", critLow: 82.0, critHigh: 125.0, name: "Chloride (Cl-)" }
    },
    bubaline: {
      label: "Bubaline (महिषवंश / भैंस)",
      hb: { min: 9.0, max: 15.5, unit: "g/dL", critLow: 6.0, critHigh: 18.0, name: "Hemoglobin (Hb)" },
      pcv: { min: 27.0, max: 42.0, unit: "%", critLow: 18.0, critHigh: 54.0, name: "Hematocrit (PCV/HCT)" },
      rbc: { min: 5.5, max: 9.5, unit: "10^6/µL", critLow: 3.2, critHigh: 12.5, name: "Total Erythrocyte (RBC)" },
      wbc: { min: 5.0, max: 13.0, unit: "10^3/µL", critLow: 2.5, critHigh: 30.0, name: "Total Leukocyte (WBC/TLC)" },
      platelets: { min: 120, max: 650, unit: "10^3/µL", critLow: 45, critHigh: 980, name: "Platelet Count (PLT)" },
      neutrophils: { min: 20.0, max: 48.0, unit: "%", critLow: 10.0, critHigh: 78.0, name: "Neutrophils (Segs)" },
      lymphocytes: { min: 45.0, max: 70.0, unit: "%", critLow: 22.0, critHigh: 84.0, name: "Lymphocytes" },
      monocytes: { min: 2.0, max: 6.0, unit: "%", critLow: 0.0, critHigh: 12.0, name: "Monocytes" },
      eosinophils: { min: 2.0, max: 12.0, unit: "%", critLow: 0.0, critHigh: 24.0, name: "Eosinophils" },
      basophils: { min: 0.0, max: 2.0, unit: "%", critLow: 0.0, critHigh: 4.0, name: "Basophils" },
      bun: { min: 8.0, max: 28.0, unit: "mg/dL", critLow: 4.0, critHigh: 75.0, name: "Blood Urea Nitrogen (BUN)" },
      creatinine: { min: 0.8, max: 2.0, unit: "mg/dL", critLow: 0.4, critHigh: 5.0, name: "Serum Creatinine" },
      sdma: { min: 0.0, max: 14.0, unit: "µg/dL", critLow: 0.0, critHigh: 25.0, name: "Symmetric Dimethylarginine (SDMA)" },
      totalProtein: { min: 6.2, max: 8.8, unit: "g/dL", critLow: 4.5, critHigh: 12.0, name: "Total Serum Protein" },
      albumin: { min: 2.6, max: 3.9, unit: "g/dL", critLow: 1.6, critHigh: 5.0, name: "Albumin" },
      globulin: { min: 3.2, max: 5.4, unit: "g/dL", critLow: 2.0, critHigh: 8.0, name: "Globulin" },
      agRatio: { min: 0.5, max: 0.9, unit: "ratio", critLow: 0.2, critHigh: 1.6, name: "Albumin/Globulin (A:G)" },
      glucose: { min: 45.0, max: 80.0, unit: "mg/dL", critLow: 28.0, critHigh: 190.0, name: "Blood Glucose" },
      alt: { min: 15.0, max: 45.0, unit: "U/L", critLow: 0.0, critHigh: 160.0, name: "Alanine Aminotransferase (ALT)" },
      ast: { min: 50.0, max: 125.0, unit: "U/L", critLow: 20.0, critHigh: 380.0, name: "Aspartate Aminotransferase (AST)" },
      alp: { min: 25.0, max: 165.0, unit: "U/L", critLow: 0.0, critHigh: 440.0, name: "Alkaline Phosphatase (ALP)" },
      ggt: { min: 8.0, max: 36.0, unit: "U/L", critLow: 0.0, critHigh: 135.0, name: "Gamma-Glutamyl Transferase (GGT)" },
      totalBilirubin: { min: 0.1, max: 0.6, unit: "mg/dL", critLow: 0.0, critHigh: 2.5, name: "Total Bilirubin" },
      directBilirubin: { min: 0.0, max: 0.2, unit: "mg/dL", critLow: 0.0, critHigh: 1.2, name: "Direct Bilirubin" },
      calcium: { min: 8.5, max: 11.2, unit: "mg/dL", critLow: 5.8, critHigh: 14.0, name: "Total Serum Calcium" },
      phosphorus: { min: 4.0, max: 7.8, unit: "mg/dL", critLow: 2.2, critHigh: 11.5, name: "Inorganic Phosphorus" },
      sodium: { min: 135.0, max: 154.0, unit: "mEq/L", critLow: 122.0, critHigh: 168.0, name: "Sodium (Na+)" },
      potassium: { min: 3.8, max: 5.6, unit: "mEq/L", critLow: 2.8, critHigh: 7.0, name: "Potassium (K+)" },
      chloride: { min: 96.0, max: 112.0, unit: "mEq/L", critLow: 84.0, critHigh: 128.0, name: "Chloride (Cl-)" }
    },
    caprine: {
      label: "Caprine (अजा / बकरी)",
      hb: { min: 8.0, max: 14.0, unit: "g/dL", critLow: 5.0, critHigh: 16.5, name: "Hemoglobin (Hb)" },
      pcv: { min: 22.0, max: 38.0, unit: "%", critLow: 14.0, critHigh: 48.0, name: "Hematocrit (PCV/HCT)" },
      rbc: { min: 8.0, max: 18.0, unit: "10^6/µL", critLow: 4.5, critHigh: 22.0, name: "Total Erythrocyte (RBC)" },
      wbc: { min: 4.0, max: 13.0, unit: "10^3/µL", critLow: 2.0, critHigh: 26.0, name: "Total Leukocyte (WBC/TLC)" },
      platelets: { min: 300, max: 900, unit: "10^3/µL", critLow: 80, critHigh: 1400, name: "Platelet Count (PLT)" },
      neutrophils: { min: 30.0, max: 48.0, unit: "%", critLow: 12.0, critHigh: 75.0, name: "Neutrophils (Segs)" },
      lymphocytes: { min: 50.0, max: 70.0, unit: "%", critLow: 25.0, critHigh: 85.0, name: "Lymphocytes" },
      monocytes: { min: 1.0, max: 4.0, unit: "%", critLow: 0.0, critHigh: 10.0, name: "Monocytes" },
      eosinophils: { min: 1.0, max: 8.0, unit: "%", critLow: 0.0, critHigh: 20.0, name: "Eosinophils" },
      basophils: { min: 0.0, max: 1.0, unit: "%", critLow: 0.0, critHigh: 3.0, name: "Basophils" },
      bun: { min: 10.0, max: 28.0, unit: "mg/dL", critLow: 5.0, critHigh: 75.0, name: "Blood Urea Nitrogen (BUN)" },
      creatinine: { min: 0.7, max: 1.5, unit: "mg/dL", critLow: 0.3, critHigh: 4.0, name: "Serum Creatinine" },
      sdma: { min: 0.0, max: 14.0, unit: "µg/dL", critLow: 0.0, critHigh: 24.0, name: "Symmetric Dimethylarginine (SDMA)" },
      totalProtein: { min: 6.0, max: 7.9, unit: "g/dL", critLow: 4.0, critHigh: 11.0, name: "Total Serum Protein" },
      albumin: { min: 2.7, max: 3.9, unit: "g/dL", critLow: 1.5, critHigh: 5.0, name: "Albumin" },
      globulin: { min: 2.7, max: 4.4, unit: "g/dL", critLow: 1.5, critHigh: 7.0, name: "Globulin" },
      agRatio: { min: 0.6, max: 1.2, unit: "ratio", critLow: 0.3, critHigh: 2.0, name: "Albumin/Globulin (A:G)" },
      glucose: { min: 50.0, max: 75.0, unit: "mg/dL", critLow: 30.0, critHigh: 180.0, name: "Blood Glucose" },
      alt: { min: 10.0, max: 35.0, unit: "U/L", critLow: 0.0, critHigh: 120.0, name: "Alanine Aminotransferase (ALT)" },
      ast: { min: 45.0, max: 115.0, unit: "U/L", critLow: 18.0, critHigh: 320.0, name: "Aspartate Aminotransferase (AST)" },
      alp: { min: 40.0, max: 250.0, unit: "U/L", critLow: 0.0, critHigh: 500.0, name: "Alkaline Phosphatase (ALP)" },
      ggt: { min: 15.0, max: 50.0, unit: "U/L", critLow: 0.0, critHigh: 140.0, name: "Gamma-Glutamyl Transferase (GGT)" },
      totalBilirubin: { min: 0.1, max: 0.4, unit: "mg/dL", critLow: 0.0, critHigh: 2.0, name: "Total Bilirubin" },
      directBilirubin: { min: 0.0, max: 0.1, unit: "mg/dL", critLow: 0.0, critHigh: 1.0, name: "Direct Bilirubin" },
      calcium: { min: 8.9, max: 11.7, unit: "mg/dL", critLow: 6.0, critHigh: 14.5, name: "Total Serum Calcium" },
      phosphorus: { min: 5.0, max: 7.3, unit: "mg/dL", critLow: 2.5, critHigh: 11.5, name: "Inorganic Phosphorus" },
      sodium: { min: 142.0, max: 155.0, unit: "mEq/L", critLow: 125.0, critHigh: 168.0, name: "Sodium (Na+)" },
      potassium: { min: 3.5, max: 5.5, unit: "mEq/L", critLow: 2.5, critHigh: 7.2, name: "Potassium (K+)" },
      chloride: { min: 99.0, max: 110.0, unit: "mEq/L", critLow: 86.0, critHigh: 126.0, name: "Chloride (Cl-)" }
    },
    ovine: {
      label: "Ovine (अवि / भेड़)",
      hb: { min: 9.0, max: 15.0, unit: "g/dL", critLow: 5.5, critHigh: 17.0, name: "Hemoglobin (Hb)" },
      pcv: { min: 27.0, max: 45.0, unit: "%", critLow: 16.0, critHigh: 52.0, name: "Hematocrit (PCV/HCT)" },
      rbc: { min: 9.0, max: 15.0, unit: "10^6/µL", critLow: 5.0, critHigh: 19.0, name: "Total Erythrocyte (RBC)" },
      wbc: { min: 4.0, max: 12.0, unit: "10^3/µL", critLow: 2.0, critHigh: 26.0, name: "Total Leukocyte (WBC/TLC)" },
      platelets: { min: 250, max: 750, unit: "10^3/µL", critLow: 70, critHigh: 1200, name: "Platelet Count (PLT)" },
      neutrophils: { min: 20.0, max: 40.0, unit: "%", critLow: 10.0, critHigh: 70.0, name: "Neutrophils (Segs)" },
      lymphocytes: { min: 50.0, max: 75.0, unit: "%", critLow: 25.0, critHigh: 85.0, name: "Lymphocytes" },
      monocytes: { min: 1.0, max: 5.0, unit: "%", critLow: 0.0, critHigh: 10.0, name: "Monocytes" },
      eosinophils: { min: 1.0, max: 10.0, unit: "%", critLow: 0.0, critHigh: 22.0, name: "Eosinophils" },
      basophils: { min: 0.0, max: 1.0, unit: "%", critLow: 0.0, critHigh: 3.0, name: "Basophils" },
      bun: { min: 8.0, max: 26.0, unit: "mg/dL", critLow: 4.0, critHigh: 70.0, name: "Blood Urea Nitrogen (BUN)" },
      creatinine: { min: 0.7, max: 1.6, unit: "mg/dL", critLow: 0.3, critHigh: 4.2, name: "Serum Creatinine" },
      sdma: { min: 0.0, max: 14.0, unit: "µg/dL", critLow: 0.0, critHigh: 24.0, name: "Symmetric Dimethylarginine (SDMA)" },
      totalProtein: { min: 6.0, max: 7.9, unit: "g/dL", critLow: 4.0, critHigh: 11.0, name: "Total Serum Protein" },
      albumin: { min: 2.4, max: 3.8, unit: "g/dL", critLow: 1.4, critHigh: 4.8, name: "Albumin" },
      globulin: { min: 3.0, max: 4.5, unit: "g/dL", critLow: 1.6, critHigh: 7.0, name: "Globulin" },
      agRatio: { min: 0.5, max: 1.1, unit: "ratio", critLow: 0.2, critHigh: 1.8, name: "Albumin/Globulin (A:G)" },
      glucose: { min: 50.0, max: 80.0, unit: "mg/dL", critLow: 30.0, critHigh: 185.0, name: "Blood Glucose" },
      alt: { min: 12.0, max: 38.0, unit: "U/L", critLow: 0.0, critHigh: 130.0, name: "Alanine Aminotransferase (ALT)" },
      ast: { min: 60.0, max: 180.0, unit: "U/L", critLow: 25.0, critHigh: 400.0, name: "Aspartate Aminotransferase (AST)" },
      alp: { min: 45.0, max: 280.0, unit: "U/L", critLow: 0.0, critHigh: 550.0, name: "Alkaline Phosphatase (ALP)" },
      ggt: { min: 18.0, max: 55.0, unit: "U/L", critLow: 0.0, critHigh: 150.0, name: "Gamma-Glutamyl Transferase (GGT)" },
      totalBilirubin: { min: 0.1, max: 0.5, unit: "mg/dL", critLow: 0.0, critHigh: 2.2, name: "Total Bilirubin" },
      directBilirubin: { min: 0.0, max: 0.2, unit: "mg/dL", critLow: 0.0, critHigh: 1.0, name: "Direct Bilirubin" },
      calcium: { min: 9.0, max: 12.0, unit: "mg/dL", critLow: 6.0, critHigh: 14.5, name: "Total Serum Calcium" },
      phosphorus: { min: 5.0, max: 7.3, unit: "mg/dL", critLow: 2.5, critHigh: 11.5, name: "Inorganic Phosphorus" },
      sodium: { min: 142.0, max: 155.0, unit: "mEq/L", critLow: 125.0, critHigh: 168.0, name: "Sodium (Na+)" },
      potassium: { min: 3.9, max: 5.4, unit: "mEq/L", critLow: 2.8, critHigh: 7.0, name: "Potassium (K+)" },
      chloride: { min: 95.0, max: 110.0, unit: "mEq/L", critLow: 82.0, critHigh: 125.0, name: "Chloride (Cl-)" }
    },
    equine: {
      label: "Equine (अश्व / घोड़ा)",
      hb: { min: 11.0, max: 19.0, unit: "g/dL", critLow: 7.0, critHigh: 22.0, name: "Hemoglobin (Hb)" },
      pcv: { min: 32.0, max: 52.0, unit: "%", critLow: 18.0, critHigh: 62.0, name: "Hematocrit (PCV/HCT)" },
      rbc: { min: 6.5, max: 12.5, unit: "10^6/µL", critLow: 3.5, critHigh: 15.0, name: "Total Erythrocyte (RBC)" },
      wbc: { min: 5.5, max: 12.5, unit: "10^3/µL", critLow: 2.5, critHigh: 28.0, name: "Total Leukocyte (WBC/TLC)" },
      platelets: { min: 100, max: 350, unit: "10^3/µL", critLow: 35, critHigh: 650, name: "Platelet Count (PLT)" },
      neutrophils: { min: 30.0, max: 65.0, unit: "%", critLow: 15.0, critHigh: 85.0, name: "Neutrophils (Segs)" },
      lymphocytes: { min: 25.0, max: 60.0, unit: "%", critLow: 10.0, critHigh: 75.0, name: "Lymphocytes" },
      monocytes: { min: 1.0, max: 6.0, unit: "%", critLow: 0.0, critHigh: 12.0, name: "Monocytes" },
      eosinophils: { min: 1.0, max: 7.0, unit: "%", critLow: 0.0, critHigh: 18.0, name: "Eosinophils" },
      basophils: { min: 0.0, max: 2.0, unit: "%", critLow: 0.0, critHigh: 4.0, name: "Basophils" },
      bun: { min: 10.0, max: 25.0, unit: "mg/dL", critLow: 5.0, critHigh: 75.0, name: "Blood Urea Nitrogen (BUN)" },
      creatinine: { min: 0.8, max: 1.8, unit: "mg/dL", critLow: 0.4, critHigh: 5.0, name: "Serum Creatinine" },
      sdma: { min: 0.0, max: 14.0, unit: "µg/dL", critLow: 0.0, critHigh: 25.0, name: "Symmetric Dimethylarginine (SDMA)" },
      totalProtein: { min: 5.6, max: 7.6, unit: "g/dL", critLow: 3.8, critHigh: 10.5, name: "Total Serum Protein" },
      albumin: { min: 2.6, max: 3.7, unit: "g/dL", critLow: 1.5, critHigh: 4.8, name: "Albumin" },
      globulin: { min: 2.6, max: 4.2, unit: "g/dL", critLow: 1.5, critHigh: 6.5, name: "Globulin" },
      agRatio: { min: 0.6, max: 1.2, unit: "ratio", critLow: 0.3, critHigh: 2.0, name: "Albumin/Globulin (A:G)" },
      glucose: { min: 75.0, max: 115.0, unit: "mg/dL", critLow: 45.0, critHigh: 250.0, name: "Blood Glucose" },
      alt: { min: 5.0, max: 25.0, unit: "U/L", critLow: 0.0, critHigh: 80.0, name: "Alanine Aminotransferase (ALT)" },
      ast: { min: 150.0, max: 350.0, unit: "U/L", critLow: 60.0, critHigh: 800.0, name: "Aspartate Aminotransferase (AST)" },
      alp: { min: 70.0, max: 250.0, unit: "U/L", critLow: 0.0, critHigh: 550.0, name: "Alkaline Phosphatase (ALP)" },
      ggt: { min: 5.0, max: 25.0, unit: "U/L", critLow: 0.0, critHigh: 100.0, name: "Gamma-Glutamyl Transferase (GGT)" },
      totalBilirubin: { min: 0.5, max: 2.2, unit: "mg/dL", critLow: 0.1, critHigh: 5.5, name: "Total Bilirubin" },
      directBilirubin: { min: 0.0, max: 0.4, unit: "mg/dL", critLow: 0.0, critHigh: 2.0, name: "Direct Bilirubin" },
      calcium: { min: 11.2, max: 13.6, unit: "mg/dL", critLow: 8.0, critHigh: 16.5, name: "Total Serum Calcium" },
      phosphorus: { min: 2.0, max: 4.5, unit: "mg/dL", critLow: 1.0, critHigh: 8.5, name: "Inorganic Phosphorus" },
      sodium: { min: 132.0, max: 146.0, unit: "mEq/L", critLow: 120.0, critHigh: 160.0, name: "Sodium (Na+)" },
      potassium: { min: 2.4, max: 4.7, unit: "mEq/L", critLow: 1.8, critHigh: 6.8, name: "Potassium (K+)" },
      chloride: { min: 99.0, max: 109.0, unit: "mEq/L", critLow: 85.0, critHigh: 125.0, name: "Chloride (Cl-)" }
    }
  };

  // Expose to Global ClinicalData Namespace
  root.VetcareApp.ClinicalData.LabRangesReference = SPECIES_REFERENCE_TABLES;

  // Internal Module Reactive State
  const state = {
    patient: {
      id: "PAT-100293847561",
      tagNo: "100293847561",
      name: "Gauri (Murrah Buffalo)",
      species: "bubaline",
      breed: "Murrah Indigenous",
      age: "5.4 yrs",
      sex: "Female",
      ownerName: "Chaudhary Dharamvir Singh",
      contact: "9812039281"
    },
    sampleId: "SMP-" + Math.floor(100000 + Math.random() * 900000),
    testDate: new Date().toISOString().split("T")[0],
    selectedPanel: "cbc", // 'cbc' | 'biochemistry_liver' | 'biochemistry_renal' | 'electrolytes' | 'urinalysis' | 'fecal_parasitology' | 'comprehensive'
    labValues: {
      hb: 10.2,
      pcv: 30.5,
      rbc: 6.1,
      wbc: 15.8,
      platelets: 280,
      neutrophils: 58.0,
      lymphocytes: 35.0,
      monocytes: 4.0,
      eosinophils: 3.0,
      basophils: 0.0,
      bun: 32.0,
      creatinine: 2.4,
      sdma: 16.0,
      totalProtein: 8.2,
      albumin: 3.1,
      globulin: 5.1,
      agRatio: 0.6,
      glucose: 65.0,
      alt: 42.0,
      ast: 110.0,
      alp: 140.0,
      ggt: 28.0,
      totalBilirubin: 0.4,
      directBilirubin: 0.1,
      calcium: 9.2,
      phosphorus: 5.4,
      sodium: 140.0,
      potassium: 4.2,
      chloride: 102.0
    },
    urinalysis: {
      color: "Amber",
      clarity: "Clear",
      usg: "1.028",
      ph: "7.5",
      protein: "Trace",
      glucose: "Negative",
      ketones: "Negative",
      bilirubin: "Negative",
      blood: "Negative",
      rbcsHpf: "0-2",
      wbcsHpf: "1-3",
      casts: "None seen",
      crystals: "Triple phosphate (occasional)"
    },
    parasitology: {
      consistency: "Formed",
      flotationMethod: "Sheather Sugar Flotation",
      helminthOva: "Negative",
      protozoaCysts: "Negative",
      bloodProtozoaSlide: "Negative for Babesia/Theileria/Anaplasma"
    },
    interpretations: [],
    reportsHistory: [],
    containerElement: null,
    db: null
  };

  // Panel Parameter Configurations
  const PANEL_GROUPS = {
    cbc: ["hb", "pcv", "rbc", "wbc", "platelets", "neutrophils", "lymphocytes", "monocytes", "eosinophils", "basophils"],
    biochemistry_liver: ["totalProtein", "albumin", "globulin", "agRatio", "alt", "ast", "alp", "ggt", "totalBilirubin", "directBilirubin"],
    biochemistry_renal: ["bun", "creatinine", "sdma", "totalProtein", "albumin", "globulin", "glucose", "calcium", "phosphorus"],
    electrolytes: ["sodium", "potassium", "chloride", "calcium", "phosphorus"],
    comprehensive: [
      "hb", "pcv", "rbc", "wbc", "platelets", "neutrophils", "lymphocytes", "monocytes", "eosinophils", "basophils",
      "bun", "creatinine", "sdma", "totalProtein", "albumin", "globulin", "agRatio", "glucose",
      "alt", "ast", "alp", "ggt", "totalBilirubin", "directBilirubin",
      "calcium", "phosphorus", "sodium", "potassium", "chloride"
    ]
  };

  // Toast Helper
  function notify(msg, type) {
    if (root.VetcareApp && typeof root.VetcareApp.showToast === "function") {
      root.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[LAB ANALYZER ${type ? type.toUpperCase() : "INFO"}]: ${msg}`);
    }
  }

  // Database Connection Helper
  function getDbConnection() {
    return new Promise((resolve, reject) => {
      if (state.db) {
        resolve(state.db);
        return;
      }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onsuccess = (e) => {
        state.db = e.target.result;
        resolve(state.db);
      };
      req.onerror = (err) => reject(err);
    });
  }

  // Algorithmic Veterinary Pathology Diagnostic Engine
  function runPathologyAnalysis(species, values, urinalysis, parasitology) {
    const findings = [];
    const ref = SPECIES_REFERENCE_TABLES[species] || SPECIES_REFERENCE_TABLES.bovine;

    // 1. Erythron Assessment (Anemia / Polycythemia)
    if (values.hb !== undefined && ref.hb) {
      if (values.hb < ref.hb.min) {
        const severity = values.hb < ref.hb.critLow ? "SEVERE / CRITICAL" : "MODERATE";
        let anemiaType = "Normocytic Normochromic Anemia";
        if (values.pcv && values.rbc) {
          const mcv = (values.pcv * 10) / values.rbc;
          if (mcv < 40) anemiaType = "Microcytic Hypochromic Anemia";
          else if (mcv > 65) anemiaType = "Macrocytic Anemia";
        }
        findings.push({
          category: "HEMATOLOGY",
          severity: values.hb < ref.hb.critLow ? "critical" : "warning",
          title: `${anemiaType} detected (${severity})`,
          details: `Hb: ${values.hb} ${ref.hb.unit} (Ref: ${ref.hb.min}-${ref.hb.max}). PCV: ${values.pcv || "N/A"}%.`,
          differentials: (species === "bovine" || species === "bubaline")
            ? "Rule out Anaplasmosis, Babesiosis (Redwater), Theileriosis, Post-Parturient Hemoglobinuria (PPH), or chronic Fascioliasis/Haemonchosis."
            : (species === "canine" || species === "feline")
            ? "Rule out tick-borne Haemoparasites (Ehrlichia/Babesia), Immune-Mediated Hemolytic Anemia (IMHA), GI blood loss (Ancylostomiasis), or renal failure anemia."
            : "Investigate chronic blood loss, parasitic burden, or nutritional deficiency."
        });
      } else if (values.hb > ref.hb.max) {
        findings.push({
          category: "HEMATOLOGY",
          severity: "warning",
          title: "Erythrocytosis / Polycythemia (Hemoconcentration)",
          details: `Hb: ${values.hb} ${ref.hb.unit} & PCV: ${values.pcv || "N/A"}% above normal thresholds.`,
          differentials: "Relative erythrocytosis secondary to severe dehydration, prolonged water deprivation, or splenic contraction; rule out primary polycythemia vera."
        });
      }
    }

    // 2. Leukogram Assessment (Inflammatory / Infectious Response)
    if (values.wbc !== undefined && ref.wbc) {
      if (values.wbc > ref.wbc.max) {
        let shiftNote = "Leukocytosis";
        if (values.neutrophils && values.neutrophils > (ref.neutrophils ? ref.neutrophils.max : 50)) {
          shiftNote = "Neutrophilic Leukocytosis with Regenerative Response";
        }
        findings.push({
          category: "LEUKOGRAM",
          severity: values.wbc > ref.wbc.critHigh ? "critical" : "warning",
          title: `${shiftNote} (Active Acute/Subacute Inflammation)`,
          details: `TLC: ${values.wbc} ${ref.wbc.unit} (Ref: ${ref.wbc.min}-${ref.wbc.max}). Neutrophils: ${values.neutrophils || "N/A"}%.`,
          differentials: "Severe bacterial infection, suppurative tissue necrosis, metritis, peritonitis, clinical mastitis, or pneumonia."
        });
      } else if (values.wbc < ref.wbc.min) {
        findings.push({
          category: "LEUKOGRAM",
          severity: "critical",
          title: "Leukopenia / Neutropenia (Immune Exhaustion)",
          details: `TLC: ${values.wbc} ${ref.wbc.unit} is markedly depressed.`,
          differentials: "Overwhelming acute gram-negative septicemia (endotoxemia), viral bone marrow suppression (e.g. Parvovirus, Panleukopenia, BVD-MD), or splenic sequestration."
        });
      }

      if (values.eosinophils && ref.eosinophils && values.eosinophils > ref.eosinophils.max) {
        findings.push({
          category: "LEUKOGRAM",
          severity: "info",
          title: "Peripheral Eosinophilia",
          details: `Eosinophils: ${values.eosinophils}% (Ref: ${ref.eosinophils.min}-${ref.eosinophils.max}%).`,
          differentials: "Gastrointestinal or pulmonary nematodiasis, ectoparasite hypersensitivity (FAD/Mange), or eosinophilic bronchopneumopathy."
        });
      }
    }

    // 3. Platelet & Hemostatic Assessment
    if (values.platelets !== undefined && ref.platelets) {
      if (values.platelets < ref.platelets.min) {
        findings.push({
          category: "HEMOSTASIS",
          severity: values.platelets < ref.platelets.critLow ? "critical" : "warning",
          title: "Thrombocytopenia (Bleeding Diathesis Risk)",
          details: `Platelet count: ${values.platelets} ${ref.platelets.unit} (Ref: ${ref.platelets.min}-${ref.platelets.max}).`,
          differentials: "Platelet consumption (DIC), immune-mediated thrombocytopenia (ITP), or arthropod-borne rickettsial infection (Ehrlichiosis, Anaplasmosis)."
        });
      }
    }

    // 4. Renal / Excretory Function Assessment
    if (values.bun !== undefined && values.creatinine !== undefined && ref.bun && ref.creatinine) {
      if (values.bun > ref.bun.max || values.creatinine > ref.creatinine.max) {
        const isSdmaElevated = values.sdma && values.sdma > 14.0;
        findings.push({
          category: "RENAL PROFILE",
          severity: values.creatinine > ref.creatinine.critHigh ? "critical" : "warning",
          title: `Azotemia (Renal / Pre-renal Dysfunction) ${isSdmaElevated ? "[SDMA Biomarker Positive]" : ""}`,
          details: `Serum Creatinine: ${values.creatinine} mg/dL | BUN: ${values.bun} mg/dL | SDMA: ${values.sdma || "N/A"} µg/dL.`,
          differentials: "Differentiate pre-renal hypovolemia/dehydration from intrinsic acute kidney injury (AKI) or chronic kidney disease (CKD / IRIS Stage 2-4). Check urine specific gravity (USG) for isosthenuria."
        });
      }
    }

    // 5. Hepatic & Biliary Assessment
    if (ref.alt && values.alt && values.alt > ref.alt.max) {
      findings.push({
        category: "HEPATOBILIARY",
        severity: values.alt > ref.alt.critHigh ? "critical" : "warning",
        title: "Hepatocellular Injury / Leakage (Marked ALT Elevation)",
        details: `Serum ALT: ${values.alt} U/L (Ref: ${ref.alt.min}-${ref.alt.max}).`,
        differentials: "Acute hepatitis, hepatic lipidosis, toxic hepatopathy (aflatoxins, NSAIDs), or circulatory hypoxic liver insult."
      });
    }

    if (ref.ast && values.ast && values.ast > ref.ast.max && (species === "bovine" || species === "bubaline" || species === "equine")) {
      findings.push({
        category: "HEPATOBILIARY / MUSCLE",
        severity: "warning",
        title: "Elevated AST Enzyme (Hepatic or Skeletal Muscle Strain)",
        details: `Serum AST: ${values.ast} U/L (Ref: ${ref.ast.min}-${ref.ast.max}).`,
        differentials: "Large animal hepatocellular leakage or skeletal/cardiac myopathy (White Muscle Disease, downer cow pressure necrosis, rhabdomyolysis)."
      });
    }

    if (ref.alp && values.alp && values.alp > ref.alp.max) {
      findings.push({
        category: "HEPATOBILIARY",
        severity: "info",
        title: "Cholestatic Induction / Elevated ALP",
        details: `Alkaline Phosphatase: ${values.alp} U/L.`,
        differentials: "Biliary tract obstruction, intrahepatic cholestasis, endogenous or exogenous glucocorticoid induction, or active osteoblastic bone growth."
      });
    }

    if (ref.totalBilirubin && values.totalBilirubin && values.totalBilirubin > ref.totalBilirubin.max) {
      findings.push({
        category: "HEPATOBILIARY",
        severity: "warning",
        title: "Hyperbilirubinemia / Clinical Icterus",
        details: `Total Bilirubin: ${values.totalBilirubin} mg/dL. Direct Bilirubin: ${values.directBilirubin || 0} mg/dL.`,
        differentials: "Pre-hepatic intravascular hemolysis vs intra-hepatic parenchymal failure vs post-hepatic biliary duct occlusion."
      });
    }

    // 6. Mineral & Electrolyte Abnormalities
    if (values.calcium !== undefined && ref.calcium) {
      if (values.calcium < ref.calcium.min) {
        findings.push({
          category: "ELECTROLYTES",
          severity: values.calcium < ref.calcium.critLow ? "critical" : "warning",
          title: (species === "bovine" || species === "bubaline") ? "Hypocalcemia / Parturient Paresis (Milk Fever Alert)" : "Hypocalcemia",
          details: `Serum Calcium: ${values.calcium} mg/dL (Ref: ${ref.calcium.min}-${ref.calcium.max}).`,
          differentials: (species === "bovine" || species === "bubaline")
            ? "Immediate IV/SC Calcium Borogluconate indicated. Monitor neuromuscular excitability and cardiac rhythm."
            : "Hypoalbuminemia (pseudohypocalcemia), primary hypoparathyroidism, acute pancreatitis, or eclampsia/tetany in whelping bitch/queen."
        });
      }
    }

    if (values.phosphorus !== undefined && ref.phosphorus) {
      if (values.phosphorus < ref.phosphorus.min && (species === "bovine" || species === "bubaline")) {
        findings.push({
          category: "ELECTROLYTES",
          severity: "critical",
          title: "Hypophosphatemia (Post-Parturient Hemoglobinuria Risk)",
          details: `Inorganic Phosphorus: ${values.phosphorus} mg/dL (Ref: ${ref.phosphorus.min}-${ref.phosphorus.max}).`,
          differentials: "Imminent danger of intravascular erythrocyte lysis (coffee-colored urine) due to ATP depletion in RBC membranes. Administer parenteral Sodium Acid Phosphate."
        });
      }
    }

    if (values.potassium !== undefined && ref.potassium) {
      if (values.potassium < ref.potassium.min) {
        findings.push({
          category: "ELECTROLYTES",
          severity: "warning",
          title: "Hypokalemia (Generalized Muscular Weakness)",
          details: `Potassium (K+): ${values.potassium} mEq/L (Ref: ${ref.potassium.min}-${ref.potassium.max}).`,
          differentials: "Severe anorexia, GI fluid losses (vomiting/diarrhea), prolonged diuresis, or alkalosis."
        });
      } else if (values.potassium > ref.potassium.max) {
        findings.push({
          category: "ELECTROLYTES",
          severity: "critical",
          title: "Hyperkalemia (Cardiotoxicity Alert)",
          details: `Potassium (K+): ${values.potassium} mEq/L (Ref: ${ref.potassium.min}-${ref.potassium.max}).`,
          differentials: "Life-threatening bradyarrhythmia risk. Common in urethral obstruction/rupture (blocked cat/steer), hypoadrenocorticism (Addison's), or anuric renal failure."
        });
      }
    }

    // 7. Urinalysis Correlation
    if (urinalysis && urinalysis.protein && urinalysis.protein !== "Negative" && urinalysis.protein !== "Trace") {
      findings.push({
        category: "URINALYSIS",
        severity: "warning",
        title: `Proteinuria (${urinalysis.protein})`,
        details: `Dipstick Protein: ${urinalysis.protein}. USG: ${urinalysis.usg || "1.025"}.`,
        differentials: "Glomerulonephropathy, renal amyloidosis, or post-renal lower urinary tract inflammation/hematuria."
      });
    }

    if (urinalysis && urinalysis.glucose && urinalysis.glucose !== "Negative") {
      findings.push({
        category: "URINALYSIS",
        severity: "warning",
        title: "Glucosuria Detected",
        details: `Urine Glucose: ${urinalysis.glucose}. Fasting Blood Glucose: ${values.glucose || "N/A"} mg/dL.`,
        differentials: (values.glucose && values.glucose > 180)
          ? "Exceeded renal tubular threshold: Confirm Diabetes Mellitus, hyperadrenocorticism, or severe feline stress hyperglycemia."
          : "Normoglycemic glucosuria: Fanconi syndrome or primary proximal renal tubular defect."
      });
    }

    if (findings.length === 0) {
      findings.push({
        category: "OVERALL STATUS",
        severity: "normal",
        title: "Normophysiological Clinical Status",
        details: "All analyzed parameters fall within established species-specific physiological reference intervals.",
        differentials: "No acute biochemical or hematological decompensation detected on this panel."
      });
    }

    return findings;
  }

  // Primary Module API Definition
  const LabAnalyzerReporting = {
    // 1. LIFECYCLE: Init
    init: async function () {
      try {
        await getDbConnection();
        this.loadSavedReportsHistory();
        this.setupEventBus();
        this.recalculateInterpretations();
        return true;
      } catch (err) {
        console.error("LabAnalyzerReporting initialization error:", err);
        return false;
      }
    },

    // 2. LIFECYCLE: Render
    render: function (containerId) {
      const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error("Container element not found for LabAnalyzerReporting:", containerId);
        return;
      }
      state.containerElement = container;

      this.recalculateInterpretations();

      container.innerHTML = `
        <div id="vetcare-lab-root" class="w-full flex flex-col gap-6 text-slate-100 font-sans pb-16">
          <!-- Top Biometrics & Sample Header -->
          ${this.buildTopBioBannerHtml()}

          <!-- Panel Selection Navigation Tabs -->
          ${this.buildPanelTabsHtml()}

          <!-- Main Laboratory Diagnostics Workspace -->
          <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            <!-- Left / Center Data Entry Matrix (Cols 1-8) -->
            <div class="xl:col-span-8 flex flex-col gap-6">
              ${this.buildInteractiveMatrixHtml()}

              <!-- Urinalysis & Fecal Parasitology Accordion Card -->
              ${this.buildUrinalysisFecalCardHtml()}
            </div>

            <!-- Right Clinical Interpretation & Audit Sidebar (Cols 9-12) -->
            <div class="xl:col-span-4 flex flex-col gap-6">
              ${this.buildInterpretationBoxHtml()}
              ${this.buildReportsHistoryCardHtml()}
            </div>

          </div>

          <!-- Master Action Command Toolbar -->
          ${this.buildActionToolbarHtml()}
        </div>
      `;

      this.bindUiEvents();
    },

    // 3. LIFECYCLE: Destroy
    destroy: function () {
      if (this._patientSelectedListener) {
        window.removeEventListener("patient:selected", this._patientSelectedListener);
        window.removeEventListener("vetcare:patient-selected", this._patientSelectedListener);
      }
      if (state.containerElement) {
        state.containerElement.innerHTML = "";
      }
      state.containerElement = null;
    },

    setupEventBus: function () {
      const handlePatient = (evt) => {
        const p = evt.detail;
        if (!p) return;
        state.patient = {
          id: p.patientId || p.id || "PAT-" + Date.now(),
          tagNo: p.tagNumber || p.tagNo || "100293847561",
          name: p.breed ? `${p.tagNumber} (${p.breed})` : "Active Patient",
          species: (p.species && SPECIES_REFERENCE_TABLES[p.species.toLowerCase()]) ? p.species.toLowerCase() : "bovine",
          breed: p.breed || "Indigenous",
          age: p.ageYears ? `${p.ageYears} yrs` : "Adult",
          sex: p.sex || "Female",
          ownerName: (p.owner && p.owner.fullName) ? p.owner.fullName : "Chaudhary Dharamvir Singh",
          contact: (p.owner && p.owner.mobileNumber) ? p.owner.mobileNumber : "9812039281"
        };
        state.sampleId = "SMP-" + Math.floor(100000 + Math.random() * 900000);
        this.recalculateInterpretations();
        if (state.containerElement) {
          this.render(state.containerElement);
        }
        notify(`प्रयोगशाला विश्लेषक में पशु लोड हुआ: ${state.patient.tagNo}`, "info");
      };

      this._patientSelectedListener = handlePatient;
      window.addEventListener("patient:selected", handlePatient);
      window.addEventListener("vetcare:patient-selected", handlePatient);
    },

    recalculateInterpretations: function () {
      state.interpretations = runPathologyAnalysis(
        state.patient.species,
        state.labValues,
        state.urinalysis,
        state.parasitology
      );
    },

    async loadSavedReportsHistory() {
      try {
        const db = await getDbConnection();
        const tx = db.transaction(STORE_LAB_REPORTS, "readonly");
        const store = tx.objectStore(STORE_LAB_REPORTS);
        const index = store.index("recordType");
        const req = index.getAll("lab");
        req.onsuccess = () => {
          state.reportsHistory = (req.result || []).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          if (state.containerElement) {
            const histEl = state.containerElement.querySelector("#labReportsHistoryContainer");
            if (histEl) histEl.innerHTML = this.buildHistoryListInnerHtml();
          }
        };
      } catch (e) {
        // Fallback quiet
      }
    },

    // HTML VIEW BUILDERS
    buildTopBioBannerHtml: function () {
      const p = state.patient;
      const ref = SPECIES_REFERENCE_TABLES[p.species] || SPECIES_REFERENCE_TABLES.bovine;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <!-- Patient Demographics Info -->
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl shadow-inner">
                <i class="fa-solid fa-microscope"></i>
              </div>
              <div>
                <div class="flex items-center gap-2.5">
                  <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">टैग / पहचान:</span>
                  <span class="text-lg font-display font-black text-white">${p.tagNo}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    ${ref.label}
                  </span>
                </div>
                <div class="text-xs text-slate-400 mt-0.5">
                  <strong>${p.breed}</strong> • ${p.sex} • आयु: ${p.age} • पशुपालक: <strong class="text-slate-200">${p.ownerName}</strong> (${p.contact})
                </div>
              </div>
            </div>

            <!-- Sample Metadata Strip -->
            <div class="flex flex-wrap items-center gap-3 self-stretch lg:self-auto justify-between lg:justify-end border-t lg:border-t-0 border-slate-800 pt-3 lg:pt-0">
              <div class="bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-xl font-mono text-right">
                <div class="text-[10px] uppercase text-slate-500">नमूना ID (Sample Barcode)</div>
                <div class="text-xs font-bold text-emerald-400 tracking-wider">${state.sampleId}</div>
              </div>

              <div class="bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-xl font-mono text-right">
                <div class="text-[10px] uppercase text-slate-500">विश्लेषण दिनांक (Test Date)</div>
                <input 
                  type="date" 
                  id="labHeaderTestDate" 
                  value="${state.testDate}" 
                  class="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
                />
              </div>

              <div class="bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-xl font-mono text-right">
                <div class="text-[10px] uppercase text-slate-500">प्रजाति चयन (Species)</div>
                <select id="labSpeciesSelect" class="bg-transparent text-xs font-bold text-amber-400 focus:outline-none cursor-pointer">
                  <option value="canine" ${p.species === "canine" ? "selected" : ""}>Canine (श्वान)</option>
                  <option value="feline" ${p.species === "feline" ? "selected" : ""}>Feline (बिल्ली)</option>
                  <option value="bovine" ${p.species === "bovine" ? "selected" : ""}>Bovine (गाय)</option>
                  <option value="bubaline" ${p.species === "bubaline" ? "selected" : ""}>Bubaline (भैंस)</option>
                  <option value="caprine" ${p.species === "caprine" ? "selected" : ""}>Caprine (बकरी)</option>
                  <option value="ovine" ${p.species === "ovine" ? "selected" : ""}>Ovine (भेड़)</option>
                  <option value="equine" ${p.species === "equine" ? "selected" : ""}>Equine (अश्व)</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      `;
    },

    buildPanelTabsHtml: function () {
      const tabs = [
        { id: "cbc", label: "Complete Blood Count (CBC)", icon: "fa-droplet" },
        { id: "biochemistry_liver", label: "यकृत प्रोफाइल (Hepato-Biliary)", icon: "fa-vial" },
        { id: "biochemistry_renal", label: "गुर्दा व उपापचय (Renal & SDMA)", icon: "fa-dna" },
        { id: "electrolytes", label: "इलेक्ट्रोलाइट्स व खनिज", icon: "fa-bolt" },
        { id: "comprehensive", label: "समग्र क्लिनिकल पैनल (Full Comprehensive)", icon: "fa-clipboard-list" }
      ];

      return `
        <div class="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          ${tabs
            .map((t) => {
              const isActive = state.selectedPanel === t.id;
              return `
              <button 
                type="button" 
                data-lab-panel="${t.id}" 
                class="lab-panel-tab-btn px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/50"
                    : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                }"
              >
                <i class="fa-solid ${t.icon}"></i>
                <span>${t.label}</span>
              </button>
            `;
            })
            .join("")}
        </div>
      `;
    },

    buildInteractiveMatrixHtml: function () {
      const activeKeys = PANEL_GROUPS[state.selectedPanel] || PANEL_GROUPS.cbc;
      const ref = SPECIES_REFERENCE_TABLES[state.patient.species] || SPECIES_REFERENCE_TABLES.bovine;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-flask-vial text-cyan-400"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-slate-200">
                विश्लेषण मापदंड ग्रिड (${ref.label})
              </h3>
            </div>
            <span class="text-[11px] font-mono text-slate-500">
              मानक इकाइयाँ व संदर्भ अंतराल लाइव फ्लैगिंग
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${activeKeys
              .map((key) => {
                const param = ref[key];
                if (!param) return "";
                const val = state.labValues[key] !== undefined ? state.labValues[key] : "";
                const numVal = parseFloat(val);
                const hasVal = !isNaN(numVal) && val !== "";

                let statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-500">PENDING</span>`;
                let gaugePercent = 50;
                let gaugeColor = "bg-emerald-400";

                if (hasVal) {
                  if (numVal < param.min) {
                    const isCrit = param.critLow !== undefined && numVal <= param.critLow;
                    statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isCrit ? "bg-rose-500 text-white animate-pulse" : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                    }"><i class="fa-solid fa-arrow-down mr-0.5"></i>LOW</span>`;
                    gaugePercent = Math.max(5, (numVal / param.min) * 25);
                    gaugeColor = isCrit ? "bg-rose-500" : "bg-blue-400";
                  } else if (numVal > param.max) {
                    const isCrit = param.critHigh !== undefined && numVal >= param.critHigh;
                    statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isCrit ? "bg-rose-500 text-white animate-pulse" : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    }"><i class="fa-solid fa-arrow-up mr-0.5"></i>HIGH</span>`;
                    const excess = (numVal - param.max) / (param.max || 1);
                    gaugePercent = Math.min(100, 75 + excess * 25);
                    gaugeColor = isCrit ? "bg-rose-500" : "bg-amber-400";
                  } else {
                    statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">NORMAL</span>`;
                    const range = param.max - param.min;
                    const pos = range > 0 ? (numVal - param.min) / range : 0.5;
                    gaugePercent = 25 + pos * 50;
                    gaugeColor = "bg-emerald-400";
                  }
                }

                return `
                <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all">
                  <div class="flex items-center justify-between gap-2 mb-1.5">
                    <span class="text-xs font-semibold text-white tracking-wide truncate max-w-[200px]" title="${param.name}">
                      ${param.name}
                    </span>
                    <div>${statusBadge}</div>
                  </div>

                  <div class="flex items-center gap-3">
                    <div class="relative flex-1">
                      <input 
                        type="number" 
                        step="0.01" 
                        data-lab-key="${key}" 
                        value="${val}" 
                        placeholder="${param.min} - ${param.max}" 
                        class="lab-param-input w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <span class="text-xs font-mono text-slate-400 w-16 text-right">${param.unit}</span>
                  </div>

                  <!-- Reference Range & Visual Gauge -->
                  <div class="mt-2.5">
                    <div class="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                      <span>Low &lt; ${param.min}</span>
                      <span class="text-slate-400 font-semibold">Ref: ${param.min} - ${param.max} ${param.unit}</span>
                      <span>High &gt; ${param.max}</span>
                    </div>
                    <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                      <div class="w-1/4 h-full bg-blue-500/20 border-r border-slate-900"></div>
                      <div class="w-2/4 h-full bg-emerald-500/20 border-r border-slate-900"></div>
                      <div class="w-1/4 h-full bg-amber-500/20"></div>
                    </div>
                    <div class="w-full h-1 relative -mt-1.5">
                      <div class="absolute top-0 w-2.5 h-2.5 -ml-1.5 rounded-full ${gaugeColor} shadow" style="left: ${gaugePercent}%;"></div>
                    </div>
                  </div>
                </div>
              `;
              })
              .join("")}
          </div>
        </div>
      `;
    },

    buildUrinalysisFecalCardHtml: function () {
      const u = state.urinalysis;
      const f = state.parasitology;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-vial-circle-check text-emerald-400"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-slate-200">
                मूत्र विश्लेषण एवं मल परजीवी विज्ञान (Urinalysis & Parasitology)
              </h3>
            </div>
            <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              अर्द्ध-मात्रात्मक (Semi-Quantitative)
            </span>
          </div>

          <!-- Urinalysis Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">Urine Color & Clarity</label>
              <input type="text" id="uriColor" value="${u.color} / ${u.clarity}" class="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">Specific Gravity (USG)</label>
              <input type="text" id="uriUsg" value="${u.usg}" class="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">Dipstick Protein</label>
              <select id="uriProtein" class="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:ring-1 focus:ring-emerald-500">
                <option value="Negative" ${u.protein === "Negative" ? "selected" : ""}>Negative</option>
                <option value="Trace" ${u.protein === "Trace" ? "selected" : ""}>Trace</option>
                <option value="1+ (30mg/dL)" ${u.protein === "1+ (30mg/dL)" ? "selected" : ""}>1+ (30 mg/dL)</option>
                <option value="2+ (100mg/dL)" ${u.protein === "2+ (100mg/dL)" ? "selected" : ""}>2+ (100 mg/dL)</option>
                <option value="3+ (300mg/dL)" ${u.protein === "3+ (300mg/dL)" ? "selected" : ""}>3+ (300 mg/dL)</option>
                <option value="4+ (1000mg/dL)" ${u.protein === "4+ (1000mg/dL)" ? "selected" : ""}>4+ (1000 mg/dL)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">Dipstick Glucose</label>
              <select id="uriGlucose" class="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white focus:ring-1 focus:ring-emerald-500">
                <option value="Negative" ${u.glucose === "Negative" ? "selected" : ""}>Negative</option>
                <option value="Trace" ${u.glucose === "Trace" ? "selected" : ""}>Trace</option>
                <option value="1+" ${u.glucose === "1+" ? "selected" : ""}>1+ (100 mg/dL)</option>
                <option value="2+" ${u.glucose === "2+" ? "selected" : ""}>2+ (250 mg/dL)</option>
                <option value="3+" ${u.glucose === "3+" ? "selected" : ""}>3+ (500+ mg/dL)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">Ketones / Bilirubin</label>
              <input type="text" id="uriKetones" value="Ketones: ${u.ketones} | Bili: ${u.bilirubin}" class="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:ring-1 focus:ring-emerald-500" />
            </div>
            <div>
              <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">Microscopic Sediments (RBC/WBC/Casts)</label>
              <input type="text" id="uriSediment" value="RBC: ${u.rbcsHpf} | WBC: ${u.wbcsHpf} | Casts: ${u.casts}" class="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:ring-1 focus:ring-emerald-500" />
            </div>
          </div>

          <!-- Fecal & Blood Protozoa Strip -->
          <div class="pt-3 border-t border-slate-800">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">मल सूक्ष्मदर्शी परजीवी जांच (Fecal Ova/Cysts)</label>
                <input type="text" id="fecalOva" value="${f.helminthOva}" class="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-400 mb-1">रक्त प्रोटोजोआ स्मीयर (Blood Protozoa Slide)</label>
                <input type="text" id="fecalProtozoa" value="${f.bloodProtozoaSlide}" class="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:ring-1 focus:ring-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      `;
    },

    buildInterpretationBoxHtml: function () {
      const list = state.interpretations;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-brain-circuit text-amber-400"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-white">
                क्लिनिकल पैथोलॉजी विभेदक निष्कर्ष
              </h3>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              AI RULE-OUTS (${list.length})
            </span>
          </div>

          <div class="space-y-3.5 max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
            ${
              list.length === 0
                ? `
              <div class="p-6 text-center text-xs text-slate-500 font-mono">
                पैरामीटर मान प्रविष्ट करें; विभेदक निदान यहां स्वतः संगणित होंगे।
              </div>
            `
                : list
                    .map((item) => {
                      let borderClass = "border-slate-800 bg-slate-950/60";
                      let titleColor = "text-white";
                      let icon = "fa-circle-info text-cyan-400";

                      if (item.severity === "critical") {
                        borderClass = "border-rose-500/40 bg-rose-950/20";
                        titleColor = "text-rose-300";
                        icon = "fa-triangle-exclamation text-rose-400";
                      } else if (item.severity === "warning") {
                        borderClass = "border-amber-500/40 bg-amber-950/20";
                        titleColor = "text-amber-300";
                        icon = "fa-circle-exclamation text-amber-400";
                      } else if (item.severity === "normal") {
                        borderClass = "border-emerald-500/40 bg-emerald-950/20";
                        titleColor = "text-emerald-300";
                        icon = "fa-circle-check text-emerald-400";
                      }

                      return `
                  <div class="p-3.5 rounded-xl border ${borderClass} space-y-1.5 transition-all">
                    <div class="flex items-start justify-between gap-2">
                      <div class="text-xs font-bold ${titleColor} flex items-center gap-1.5">
                        <i class="fa-solid ${icon} text-xs"></i>
                        <span>${item.title}</span>
                      </div>
                      <span class="text-[9px] font-mono uppercase text-slate-400 px-1.5 py-0.5 bg-slate-900 rounded">
                        ${item.category}
                      </span>
                    </div>

                    <div class="text-[11px] font-mono text-slate-300">
                      ${item.details}
                    </div>

                    <div class="pt-1.5 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed font-sans">
                      <strong class="text-slate-300">विभेदक निदान (Rule-Outs):</strong> ${item.differentials}
                    </div>
                  </div>
                `;
                    })
                    .join("")
            }
          </div>
        </div>
      `;
    },

    buildReportsHistoryCardHtml: function () {
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-clock-rotate-left text-cyan-400"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-white">सहेजे गए लैब रिपोर्ट्स</h3>
            </div>
            <button id="labBtnRefreshHistory" class="text-xs text-slate-400 hover:text-white p-1">
              <i class="fa-solid fa-rotate text-xs"></i>
            </button>
          </div>

          <div id="labReportsHistoryContainer" class="space-y-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
            ${this.buildHistoryListInnerHtml()}
          </div>
        </div>
      `;
    },

    buildHistoryListInnerHtml: function () {
      const list = state.reportsHistory;
      if (!list || list.length === 0) {
        return `<div class="p-4 text-center text-xs text-slate-500 font-mono">कोई पूर्व रिपोर्ट सहेजी नहीं गई है।</div>`;
      }

      return list
        .map((r) => {
          const dt = new Date(r.timestamp).toLocaleDateString("hi-IN", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          });
          return `
          <div class="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div class="font-bold text-white text-xs truncate max-w-[170px]">${r.testName || "Diagnostic Panel"}</div>
              <div class="text-[10px] font-mono text-slate-400">${dt}</div>
            </div>
            <button 
              type="button" 
              data-load-report-id="${r.recordId}" 
              class="px-2 py-1 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
            >
              देखें / लोड
            </button>
          </div>
        `;
        })
        .join("");
    },

    buildActionToolbarHtml: function () {
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 backdrop-blur-md">
          <div class="flex items-center gap-3 text-xs text-slate-400">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>क्लिनिकल पाथोलॉजी स्टेशन ऑनलाइन • ISO-VET-2026 मानक अनुरूप</span>
          </div>

          <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            <button id="labBtnResetValues" type="button" class="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors">
              <i class="fa-solid fa-arrow-rotate-left mr-1"></i> रीसेट करें
            </button>
            <button id="labBtnSaveToEmr" type="button" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 flex items-center gap-1.5 transition-all active:scale-95">
              <i class="fa-solid fa-floppy-disk"></i> सहेजें एवं EMR से जोड़ें
            </button>
            <button id="labBtnPrintReport" type="button" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/40 flex items-center gap-1.5 transition-all active:scale-95">
              <i class="fa-solid fa-print"></i> रिपोर्ट प्रिंट करें (Print A4)
            </button>
          </div>
        </div>
      `;
    },

    // EVENT BINDINGS
    bindUiEvents: function () {
      const container = state.containerElement;
      if (!container) return;

      // 1. Panel Switcher Tabs
      container.querySelectorAll(".lab-panel-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const panel = btn.getAttribute("data-lab-panel");
          if (panel && panel !== state.selectedPanel) {
            state.selectedPanel = panel;
            this.render(container);
          }
        });
      });

      // 2. Species Dropdown Change
      const speciesSelect = container.querySelector("#labSpeciesSelect");
      if (speciesSelect) {
        speciesSelect.addEventListener("change", (e) => {
          state.patient.species = e.target.value;
          this.recalculateInterpretations();
          this.render(container);
        });
      }

      // 3. Test Date Change
      const dateInput = container.querySelector("#labHeaderTestDate");
      if (dateInput) {
        dateInput.addEventListener("change", (e) => {
          state.testDate = e.target.value;
        });
      }

      // 4. Reactive Parameter Numeric Input
      container.querySelectorAll(".lab-param-input").forEach((inp) => {
        inp.addEventListener("input", (e) => {
          const key = e.target.getAttribute("data-lab-key");
          const val = e.target.value !== "" ? parseFloat(e.target.value) : "";
          state.labValues[key] = val;
          this.recalculateInterpretations();
          // Update Right Interpretation Card in real-time
          const interpCard = container.querySelector(".xl\\:col-span-4 > div:first-child");
          if (interpCard) {
            interpCard.outerHTML = this.buildInterpretationBoxHtml();
          }
        });
      });

      // 5. Urinalysis & Fecal Inputs
      const uriColor = container.querySelector("#uriColor");
      if (uriColor) uriColor.addEventListener("change", (e) => (state.urinalysis.color = e.target.value));
      const uriUsg = container.querySelector("#uriUsg");
      if (uriUsg) uriUsg.addEventListener("change", (e) => (state.urinalysis.usg = e.target.value));
      const uriProtein = container.querySelector("#uriProtein");
      if (uriProtein) uriProtein.addEventListener("change", (e) => (state.urinalysis.protein = e.target.value));
      const uriGlucose = container.querySelector("#uriGlucose");
      if (uriGlucose) uriGlucose.addEventListener("change", (e) => (state.urinalysis.glucose = e.target.value));
      const uriKetones = container.querySelector("#uriKetones");
      if (uriKetones) uriKetones.addEventListener("change", (e) => (state.urinalysis.ketones = e.target.value));
      const uriSediment = container.querySelector("#uriSediment");
      if (uriSediment) uriSediment.addEventListener("change", (e) => (state.urinalysis.casts = e.target.value));
      const fecalOva = container.querySelector("#fecalOva");
      if (fecalOva) fecalOva.addEventListener("change", (e) => (state.parasitology.helminthOva = e.target.value));
      const fecalProtozoa = container.querySelector("#fecalProtozoa");
      if (fecalProtozoa) fecalProtozoa.addEventListener("change", (e) => (state.parasitology.bloodProtozoaSlide = e.target.value));

      // 6. Action: Reset
      const btnReset = container.querySelector("#labBtnResetValues");
      if (btnReset) {
        btnReset.addEventListener("click", () => {
          const keys = PANEL_GROUPS[state.selectedPanel] || PANEL_GROUPS.cbc;
          keys.forEach((k) => (state.labValues[k] = ""));
          this.recalculateInterpretations();
          this.render(container);
          notify("मापदंड मान रीसेट कर दिए गए।", "warning");
        });
      }

      // 7. Action: Save to EMR & IndexedDB
      const btnSave = container.querySelector("#labBtnSaveToEmr");
      if (btnSave) {
        btnSave.addEventListener("click", () => this.saveLabReport());
      }

      // 8. Action: Print A4 Dossier
      const btnPrint = container.querySelector("#labBtnPrintReport");
      if (btnPrint) {
        btnPrint.addEventListener("click", () => this.generatePrintableLabReport());
      }

      // 9. History Refresh
      const btnRefreshHist = container.querySelector("#labBtnRefreshHistory");
      if (btnRefreshHist) {
        btnRefreshHist.addEventListener("click", () => this.loadSavedReportsHistory());
      }

      // 10. Load Prior Report from History
      container.addEventListener("click", (e) => {
        const loadBtn = e.target.closest("[data-load-report-id]");
        if (loadBtn) {
          const id = loadBtn.getAttribute("data-load-report-id");
          const report = state.reportsHistory.find((r) => r.recordId === id);
          if (report && report.rawLabPayload) {
            state.labValues = Object.assign({}, report.rawLabPayload.values);
            state.urinalysis = Object.assign({}, report.rawLabPayload.urinalysis || state.urinalysis);
            state.parasitology = Object.assign({}, report.rawLabPayload.parasitology || state.parasitology);
            this.recalculateInterpretations();
            this.render(container);
            notify(`लैब रिपोर्ट ${id} सफलतापूर्वक लोड की गई!`, "success");
          }
        }
      });
    },

    // 4. STORAGE INTEGRATION: Save to IndexedDB & Dispatch EventBus
    saveLabReport: async function () {
      try {
        const db = await getDbConnection();
        const ref = SPECIES_REFERENCE_TABLES[state.patient.species] || SPECIES_REFERENCE_TABLES.bovine;

        const summaryText = state.interpretations.map((i) => `[${i.category}] ${i.title}`).join(" | ");

        const newRecord = {
          recordId: "REC-LAB-" + Date.now(),
          patientId: state.patient.id,
          recordType: "lab",
          timestamp: new Date().toISOString(),
          testName: `Clinical Pathology Panel (${ref.label})`,
          sampleId: state.sampleId,
          testDate: state.testDate,
          resultSummary: summaryText || "All evaluated parameters within physiological limits.",
          labTechnician: "Central Veterinary Diagnostic Pathology Core",
          status: "Finalized / Confirmed",
          rawLabPayload: {
            species: state.patient.species,
            values: Object.assign({}, state.labValues),
            urinalysis: Object.assign({}, state.urinalysis),
            parasitology: Object.assign({}, state.parasitology),
            interpretations: state.interpretations
          }
        };

        const tx = db.transaction(STORE_LAB_REPORTS, "readwrite");
        const store = tx.objectStore(STORE_LAB_REPORTS);
        store.put(newRecord);

        tx.oncomplete = () => {
          notify(`लैब विश्लेषण रिपोर्ट ${newRecord.recordId} सुरक्षित हुई एवं EMR से जुड़ी!`, "success");
          window.dispatchEvent(new CustomEvent("lab:report_saved", { detail: newRecord }));
          window.dispatchEvent(new CustomEvent("vetcare:lab-saved", { detail: newRecord }));
          this.loadSavedReportsHistory();
        };

        tx.onerror = (err) => {
          console.error("Failed to commit lab report to IndexedDB", err);
          notify("त्रुटि: रिपोर्ट सहेजने में विफलता!", "error");
        };
      } catch (err) {
        console.error(err);
        notify("डेटाबेस त्रुटि!", "error");
      }
    },

    // 5. PRINTABLE ENGINE: Executive A4 Clinical Dossier
    generatePrintableLabReport: function () {
      const p = state.patient;
      const ref = SPECIES_REFERENCE_TABLES[p.species] || SPECIES_REFERENCE_TABLES.bovine;
      const activeKeys = PANEL_GROUPS[state.selectedPanel] || PANEL_GROUPS.comprehensive;

      const printWindow = window.open("", "_blank", "width=900,height=1000");
      if (!printWindow) {
        notify("प्रिंट पॉपअप विंडो की अनुमति दें।", "warning");
        return;
      }

      const rowsHtml = activeKeys
        .map((key) => {
          const param = ref[key];
          if (!param) return "";
          const val = state.labValues[key];
          if (val === undefined || val === "") return "";
          const numVal = parseFloat(val);

          let flag = "NORMAL";
          let flagStyle = "color: #065f46; font-weight: bold;";
          let valStyle = "font-weight: 600;";

          if (numVal < param.min) {
            flag = "LOW";
            flagStyle = "color: #1e40af; font-weight: bold;";
            valStyle = "color: #1e40af; font-weight: bold;";
          } else if (numVal > param.max) {
            flag = "HIGH";
            flagStyle = "color: #991b1b; font-weight: bold;";
            valStyle = "color: #991b1b; font-weight: bold;";
          }

          return `
          <tr>
            <td style="padding: 7px 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">${param.name}</td>
            <td style="padding: 7px 10px; border-bottom: 1px solid #e5e7eb; text-align: center; ${valStyle}">${numVal}</td>
            <td style="padding: 7px 10px; border-bottom: 1px solid #e5e7eb; text-align: center; font-size: 11px; color: #4b5563;">${param.unit}</td>
            <td style="padding: 7px 10px; border-bottom: 1px solid #e5e7eb; text-align: center; font-size: 11px; color: #4b5563;">${param.min} - ${param.max}</td>
            <td style="padding: 7px 10px; border-bottom: 1px solid #e5e7eb; text-align: center; ${flagStyle}">${flag}</td>
          </tr>
        `;
        })
        .join("");

      const interpRowsHtml = state.interpretations
        .map(
          (i) => `
        <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dashed #e5e7eb;">
          <div style="font-weight: bold; font-size: 12px; color: #111;">[${i.category}] ${i.title}</div>
          <div style="font-size: 11px; color: #374151; margin-top: 2px;"><strong>अवलोकन:</strong> ${i.details}</div>
          <div style="font-size: 11px; color: #4b5563; margin-top: 2px;"><strong>विभेदक निदान (Rule-Outs):</strong> ${i.differentials}</div>
        </div>
      `
        )
        .join("");

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>क्लिनिकल पैथोलॉजी प्रयोगशाला रिपोर्ट - ${state.sampleId}</title>
          <style>
            @page { size: A4 portrait; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; margin: 0; padding: 0; font-size: 12px; }
            .header-table { width: 100%; border-bottom: 2.5px solid #064e3b; padding-bottom: 12px; margin-bottom: 15px; }
            .title-org { font-size: 20px; font-weight: 800; color: #064e3b; text-transform: uppercase; letter-spacing: 0.5px; }
            .subtitle { font-size: 10px; color: #4b5563; font-weight: 600; text-transform: uppercase; }
            .patient-box { width: 100%; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; margin-bottom: 16px; font-size: 11px; }
            .data-table { width: 100%; border-collapse: collapse; margin-bottom: 18px; font-size: 12px; }
            .data-table th { background: #064e3b; color: #ffffff; padding: 8px 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
            .section-title { font-size: 13px; font-weight: bold; color: #064e3b; text-transform: uppercase; border-bottom: 1.5px solid #064e3b; padding-bottom: 4px; margin-bottom: 10px; margin-top: 15px; }
            .footer-strip { margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 15px; }
            .seal-box { border: 1px dashed #9ca3af; width: 180px; height: 60px; text-align: center; line-height: 60px; color: #9ca3af; font-size: 10px; }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td>
                <div class="title-org">राष्ट्रीय पशु चिकित्सा निदान एवं अनुसंधान संस्थान</div>
                <div class="subtitle">National Veterinary Clinical Pathology & Reference Laboratory Core</div>
                <div style="font-size: 10px; color: #374151; margin-top: 2px;">ISO/IEC 17025 Accredited • ISO-VET-2026 Telemetry Node</div>
              </td>
              <td style="text-align: right; font-family: monospace;">
                <div style="font-size: 14px; font-weight: bold; color: #064e3b;">REPORT: ${state.sampleId}</div>
                <div style="font-size: 10px; color: #4b5563;">दिनांक: ${state.testDate}</div>
                <div style="font-size: 10px; color: #4b5563;">प्रमाणीकरण: SHA256-VALID</div>
              </td>
            </tr>
          </table>

          <table class="patient-box">
            <tr>
              <td style="width: 50%;">
                <div><strong>पशु पहचान (Tag / Microchip):</strong> ${p.tagNo}</div>
                <div><strong>प्रजाति / नस्ल:</strong> ${ref.label} (${p.breed})</div>
                <div><strong>लिंग व आयु:</strong> ${p.sex} • ${p.age}</div>
              </td>
              <td style="width: 50%;">
                <div><strong>पशुपालक का नाम:</strong> ${p.ownerName}</div>
                <div><strong>मोबाइल नंबर:</strong> ${p.contact}</div>
                <div><strong>नमूना आईडी:</strong> ${state.sampleId}</div>
              </td>
            </tr>
          </table>

          <div class="section-title">क्लिनिकल पैथोलॉजी विश्लेषण परिणाम (Laboratory Test Findings)</div>
          <table class="data-table">
            <thead>
              <tr>
                <th style="text-align: left;">मापदंड (Test Parameter)</th>
                <th>परिणाम (Observed)</th>
                <th>इकाई (Units)</th>
                <th>संदर्भ सीमा (Reference)</th>
                <th>स्थिति (Flag)</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="section-title">मूत्र विश्लेषण एवं सूक्ष्मदर्शी परजीवी जांच (Urinalysis & Parasitology)</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 11px; margin-bottom: 15px; background: #f9fafb; padding: 10px; border-radius: 6px;">
            <div>
              <div><strong>मूत्र रंग व पारदर्शिता:</strong> ${state.urinalysis.color} (${state.urinalysis.clarity})</div>
              <div><strong>विशिष्ट गुरुत्व (USG):</strong> ${state.urinalysis.usg}</div>
              <div><strong>मूत्र प्रोटीन / शर्करा:</strong> ${state.urinalysis.protein} / ${state.urinalysis.glucose}</div>
            </div>
            <div>
              <div><strong>मूत्र तलछट (Sediment):</strong> RBC: ${state.urinalysis.rbcsHpf} | WBC: ${state.urinalysis.wbcsHpf}</div>
              <div><strong>मल परजीवी अंडे (Fecal Ova):</strong> ${state.parasitology.helminthOva}</div>
              <div><strong>रक्त परजीवी स्मीयर:</strong> ${state.parasitology.bloodProtozoaSlide}</div>
            </div>
          </div>

          <div class="section-title">पैथोलॉजिस्ट ऑटोमेटेड विभेदक टिप्पणी (Pathological Differential Impressions)</div>
          <div style="background: #fdfdfd; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; margin-bottom: 20px;">
            ${interpRowsHtml}
          </div>

          <div class="footer-strip">
            <div>
              <div>सत्यापित डिजिटल रिपोर्ट • Vetcare AI OS 2026 Laboratory Informatics Core</div>
              <div>यह परीक्षण स्वचालित बायोकेमिस्ट्री एवं हेमेटोलॉजी एनालाइजर द्वारा संपन्न हुआ।</div>
            </div>
            <div class="seal-box">
              अधिकृत हस्ताक्षर व मुहर (Clinical Pathologist)
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Register on Global Namespace
  root.VetcareApp.Modules.LabAnalyzerReporting = LabAnalyzerReporting;

})(typeof window !== "undefined" ? window : this);
