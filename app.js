/**
 * Vetcare AI OS - app.js
 * Comprehensive Clinical Decision Support, OPD Prescription Engine,
 * Veterinary Farm Finance Ledger & Dynamic Gemini Engine.
 */

// =============================================================================
// 1. GLOBAL STATE & MASTER CONFIGURATION
// =============================================================================
window.VetcareApp = {
  currentRole: localStorage.getItem('vetcare_role') || null, // 'FARMER' | 'DOCTOR'
  activeLang: localStorage.getItem('vetcare_lang') || 'hi',
  sessionRemainingSeconds: 3600, // 60-Minute active session countdown timer
  sessionTimerInterval: null,
  activeDiagnosisMode: 'SYMPTOMS', // 'SYMPTOMS' | 'HYBRID' | 'DIRECTORY'
  activeBank: 'SBI',
  selectedPlan: 'MONTHLY',
  
  matrixState: {
    temp: null,
    cardinal: 'ALL',
    secondary: new Set()
  },

  // Verified Master Configuration
  config: {
    adminPin: "9297",
    payeeName: "Vetcare Services (Mr. Rahul)",
    monthlyPrice: 199,
    annualPrice: 1499,
    sbi: {
      upiId: "rahuljangra9297@oksbi",
      account: "65204067585",
      ifsc: "SBIN0013693"
    },
    pnb: {
      upiId: "rahuljangra9297-1@okicici",
      account: "6687001
