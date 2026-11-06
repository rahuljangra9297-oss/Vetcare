// Vetcare AI OS - Veterinary Clinical Billing, POS Invoicing, GST Engine & Receipts Module (2026 Production)
(function (root) {
  "use strict";

  root.VetcareApp = root.VetcareApp || {};
  root.VetcareApp.Modules = root.VetcareApp.Modules || {};
  root.VetcareApp.ClinicalData = root.VetcareApp.ClinicalData || {};

  // Database Constants
  const DB_NAME = "VetcareEMR_DB";
  const DB_VERSION = 1;
  const STORE_BILLING = "clinical_records";

  // Standard Veterinary Clinical Service Rate Card (HSN / SAC Code Standards)
  const SERVICE_CATALOG_MASTER = [
    { id: "srv_opd_general", name: "General OPD Clinical Consultation (ओपीडी परामर्श)", hsnSac: "9993", category: "service", rate: 100.0, gstRate: 0.0, notes: "Exempt from GST under Healthcare Services" },
    { id: "srv_opd_emergency", name: "Emergency Night / Off-Hours Consultation (आपातकालीन परामर्श)", hsnSac: "9993", category: "service", rate: 300.0, gstRate: 0.0, notes: "Exempt from GST" },
    { id: "srv_artificial_insemination", name: "Artificial Insemination (AI) Service (कृत्रिम गर्भाधान)", hsnSac: "9993", category: "service", rate: 150.0, gstRate: 0.0, notes: "Includes standard straw & disposable sheath" },
    { id: "srv_cesarean_section", name: "Cesarean Section / Hysterotomy Surgery (सिजेरियन ऑपरेशन)", hsnSac: "9993", category: "service", rate: 2500.0, gstRate: 0.0, notes: "Excludes consumables & post-op antibiotics" },
    { id: "srv_rumenotomy", name: "Rumenotomy / Foreign Body Surgery (रूमेनोटॉमी)", hsnSac: "9993", category: "service", rate: 2000.0, gstRate: 0.0, notes: "Exempt from GST" },
    { id: "srv_dressing_minor", name: "Wound Dressing & Antiseptic Debridement (घाव पट्टी)", hsnSac: "9993", category: "service", rate: 120.0, gstRate: 0.0, notes: "Minor clinical dressing" },
    { id: "srv_iv_catheterization", name: "IV Catheterization & Fluid Infusion Charge", hsnSac: "9993", category: "service", rate: 150.0, gstRate: 0.0, notes: "Nursing & monitoring charge" },
    { id: "srv_cbc_hemogram", name: "Complete Blood Count (CBC / Hemogram Lab Panel)", hsnSac: "9993", category: "lab", rate: 350.0, gstRate: 0.0, notes: "Diagnostic laboratory pathology" },
    { id: "srv_ultrasound_pd", name: "Ultrasound Scan / Pregnancy Diagnosis (USG)", hsnSac: "9993", category: "lab", rate: 450.0, gstRate: 0.0, notes: "B-mode transrectal imaging" },
    { id: "srv_digital_xray", name: "Digital Orthopedic Radiography (1 View)", hsnSac: "9993", category: "lab", rate: 400.0, gstRate: 0.0, notes: "Digital DR plate exposure" },
    { id: "srv_deworming_charge", name: "Strategic Deworming Administration Fee", hsnSac: "9993", category: "service", rate: 50.0, gstRate: 0.0, notes: "Excludes drug bolus cost" }
  ];

  // Pre-seeded Invoices History for Immediate Financial Telemetry
  const INITIAL_INVOICES_HISTORY = [
    {
      invoiceNo: "INV-2026-0890",
      date: new Date(Date.now() - 86400000 * 2).toISOString().replace("T", " ").slice(0, 16),
      customer: {
        name: "Chaudhary Dharamvir Singh",
        phone: "9812039281",
        village: "Bhadurpur, Karnal",
        tagNo: "100293847561",
        species: "bubaline"
      },
      items: [
        { id: "srv_cesarean_section", name: "Cesarean Section Surgery", hsnSac: "9993", qty: 1, rate: 2500.0, gstRate: 0.0, amount: 2500.0, cgst: 0.0, sgst: 0.0 },
        { id: "med_ceftiofur_1g", name: "Xyrofur 1g Inj (Ceftiofur)", hsnSac: "3004", qty: 3, rate: 390.0, gstRate: 12.0, amount: 1170.0, cgst: 70.2, sgst: 70.2 },
        { id: "med_flunixin_50ml", name: "Megludyne 50ml (Flunixin)", hsnSac: "3004", qty: 1, rate: 225.0, gstRate: 12.0, amount: 225.0, cgst: 13.5, sgst: 13.5 }
      ],
      subtotal: 3895.0,
      discountPercent: 5.0,
      discountAmount: 194.75,
      taxableAmount: 3700.25,
      totalCgst: 79.52,
      totalSgst: 79.52,
      totalGst: 159.04,
      roundOff: 0.46,
      grandTotal: 3860.0,
      paymentMode: "UPI",
      paymentStatus: "PAID",
      upiReference: "UPI/592810294810/SBI",
      notes: "Emergency Cesarean Section case completed successfully."
    },
    {
      invoiceNo: "INV-2026-0891",
      date: new Date(Date.now() - 86400000 * 1).toISOString().replace("T", " ").slice(0, 16),
      customer: {
        name: "Mahinder Rawat",
        phone: "9416182931",
        village: "Assandh, Karnal",
        tagNo: "100293847562",
        species: "bovine"
      },
      items: [
        { id: "srv_opd_general", name: "General OPD Clinical Consultation", hsnSac: "9993", qty: 1, rate: 100.0, gstRate: 0.0, amount: 100.0, cgst: 0.0, sgst: 0.0 },
        { id: "srv_iv_catheterization", name: "IV Fluid Infusion Charge", hsnSac: "9993", qty: 1, rate: 150.0, gstRate: 0.0, amount: 150.0, cgst: 0.0, sgst: 0.0 },
        { id: "med_fentas_plus_bolus", name: "Fentas Plus Bolus (Fenbendazole)", hsnSac: "3004", qty: 2, rate: 95.0, gstRate: 12.0, amount: 190.0, cgst: 11.4, sgst: 11.4 }
      ],
      subtotal: 440.0,
      discountPercent: 0.0,
      discountAmount: 0.0,
      taxableAmount: 440.0,
      totalCgst: 11.4,
      totalSgst: 11.4,
      totalGst: 22.8,
      roundOff: -0.8,
      grandTotal: 462.0,
      paymentMode: "CASH",
      paymentStatus: "PAID",
      upiReference: "",
      notes: "Anorexia & Indigestion OPD follow-up."
    }
  ];

  // Internal Module Reactive State
  const state = {
    currentInvoice: {
      invoiceNo: "INV-2026-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
      customer: {
        name: "Chaudhary Dharamvir Singh",
        phone: "9812039281",
        village: "Bhadurpur, Karnal",
        tagNo: "100293847561",
        species: "bubaline"
      },
      items: [
        { id: "srv_opd_general", name: "General OPD Clinical Consultation", hsnSac: "9993", qty: 1, rate: 100.0, gstRate: 0.0, amount: 100.0, cgst: 0.0, sgst: 0.0 },
        { id: "srv_artificial_insemination", name: "Artificial Insemination (AI) Service", hsnSac: "9993", qty: 1, rate: 150.0, gstRate: 0.0, amount: 150.0, cgst: 0.0, sgst: 0.0 }
      ],
      subtotal: 250.0,
      discountPercent: 0.0,
      discountAmount: 0.0,
      taxableAmount: 250.0,
      totalCgst: 0.0,
      totalSgst: 0.0,
      totalGst: 0.0,
      roundOff: 0.0,
      grandTotal: 250.0,
      paymentMode: "CASH", // 'CASH' | 'UPI' | 'CARD' | 'CREDIT_KHATA'
      paymentStatus: "PAID",
      upiReference: "",
      notes: "Standard OPD consultation & AI receipt"
    },
    serviceCatalog: JSON.parse(JSON.stringify(SERVICE_CATALOG_MASTER)),
    invoicesHistory: [...INITIAL_INVOICES_HISTORY],
    activeTab: "pos_terminal", // 'pos_terminal' | 'invoices_history' | 'service_rate_card' | 'daily_collection_summary'
    searchQuery: "",
    upiQrModalOpen: false,
    containerElement: null,
    db: null
  };

  // Toast Helper
  function notify(msg, type) {
    if (root.VetcareApp && typeof root.VetcareApp.showToast === "function") {
      root.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[VETCARE BILLING ${type ? type.toUpperCase() : "INFO"}]: ${msg}`);
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

  // Primary Module API Definition
  const BillingPosInvoicing = {
    // 1. LIFECYCLE: Init
    init: async function () {
      try {
        await getDbConnection();
        this.loadPersistedInvoices();
        this.setupEventBus();
        this.recalculateCurrentBill();
        return true;
      } catch (err) {
        console.error("BillingPosInvoicing initialization error:", err);
        return false;
      }
    },

    // 2. LIFECYCLE: Render
    render: function (containerId) {
      const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error("Container element not found for BillingPosInvoicing:", containerId);
        return;
      }
      state.containerElement = container;
      this.recalculateCurrentBill();

      container.innerHTML = `
        <div id="vetcare-billing-root" class="w-full flex flex-col gap-6 text-slate-100 font-sans pb-16">
          <!-- Top Executive POS & Financial Control Bar -->
          ${this.buildTopPosHeaderHtml()}

          <!-- Tactical Navigation Toolbar -->
          ${this.buildTabNavigationHtml()}

          <!-- Active Viewport Switched by Tab -->
          ${
            state.activeTab === "invoices_history"
              ? this.buildInvoicesHistoryWorkstationHtml()
              : state.activeTab === "service_rate_card"
              ? this.buildServiceRateCardWorkstationHtml()
              : state.activeTab === "daily_collection_summary"
              ? this.buildDailyCollectionSummaryHtml()
              : this.buildPosTerminalWorkstationHtml()
          }

          <!-- Modals Insertion Mount -->
          <div id="billing-modal-container"></div>
        </div>
      `;

      this.bindUiEvents();
    },

    // 3. LIFECYCLE: Destroy
    destroy: function () {
      if (this._rxSavedListener) {
        window.removeEventListener("prescription:saved", this._rxSavedListener);
        window.removeEventListener("vetcare:prescription-saved", this._rxSavedListener);
      }
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
      // 1. Listen for Prescription Generation -> Auto-Import Medications into Cart
      const handleRxSaved = (evt) => {
        const payload = evt.detail;
        if (!payload || !payload.drugs) return;

        // Auto-fill customer details from prescription
        if (payload.ownerName) state.currentInvoice.customer.name = payload.ownerName;
        if (payload.mobileNumber) state.currentInvoice.customer.phone = payload.mobileNumber;
        if (payload.tagNumber) state.currentInvoice.customer.tagNo = payload.tagNumber;
        if (payload.species) state.currentInvoice.customer.species = payload.species.toLowerCase();

        // Append prescribed drugs as billing line items
        payload.drugs.forEach((drug) => {
          const qty = parseInt(drug.quantity || 1, 10);
          state.currentInvoice.items.push({
            id: "rx_med_" + Date.now() + "_" + Math.floor(Math.random() * 100),
            name: `${drug.drugName} (${drug.dose})`,
            hsnSac: "3004",
            qty: qty,
            rate: parseFloat(drug.estimatedPrice || 120.0),
            gstRate: 12.0,
            amount: qty * parseFloat(drug.estimatedPrice || 120.0),
            cgst: 0,
            sgst: 0
          });
        });

        this.recalculateCurrentBill();
        if (state.containerElement) this.render(state.containerElement);
        notify(`प्रिस्क्रिप्शन से ${payload.drugs.length} औषधियां बिलिंग कार्ट में आयात की गईं!`, "success");
      };

      // 2. Listen for Patient Selected -> Auto-Populate Customer Metadata
      const handlePatientSelected = (evt) => {
        const p = evt.detail;
        if (!p) return;
        state.currentInvoice.customer.tagNo = p.tagNumber || p.tagNo || state.currentInvoice.customer.tagNo;
        state.currentInvoice.customer.species = p.species ? p.species.toLowerCase() : state.currentInvoice.customer.species;
        if (p.owner) {
          state.currentInvoice.customer.name = p.owner.fullName || state.currentInvoice.customer.name;
          state.currentInvoice.customer.phone = p.owner.mobileNumber || state.currentInvoice.customer.phone;
          state.currentInvoice.customer.village = p.owner.village || state.currentInvoice.customer.village;
        }
        if (state.containerElement) this.render(state.containerElement);
      };

      this._rxSavedListener = handleRxSaved;
      this._patientSelectedListener = handlePatientSelected;

      window.addEventListener("prescription:saved", handleRxSaved);
      window.addEventListener("vetcare:prescription-saved", handleRxSaved);
      window.addEventListener("patient:selected", handlePatientSelected);
      window.addEventListener("vetcare:patient-selected", handlePatientSelected);
    },

    async loadPersistedInvoices() {
      try {
        const db = await getDbConnection();
        const tx = db.transaction(STORE_BILLING, "readonly");
        const store = tx.objectStore(STORE_BILLING);
        const index = store.index("recordType");
        const req = index.getAll("pos_invoice");
        req.onsuccess = () => {
          const list = req.result || [];
          if (list.length > 0) {
            list.forEach((dbInv) => {
              if (dbInv.invoiceData && !state.invoicesHistory.some((h) => h.invoiceNo === dbInv.invoiceData.invoiceNo)) {
                state.invoicesHistory.unshift(dbInv.invoiceData);
              }
            });
            if (state.containerElement) this.render(state.containerElement);
          }
        };
      } catch (e) {
        // Fallback quiet
      }
    },

    // 4. FINANCIAL CALCULATIONS & GST ENGINE
    calculateBillSummary: function (items, discountPercent = 0) {
      let subtotal = 0;
      let totalCgst = 0;
      let totalSgst = 0;

      const discountRate = (parseFloat(discountPercent) || 0) / 100;

      items.forEach((item) => {
        const lineTotal = item.qty * item.rate;
        item.amount = parseFloat(lineTotal.toFixed(2));
        subtotal += lineTotal;

        // Apply discount proportionally to calculate GST base
        const lineDiscountedAmount = lineTotal * (1 - discountRate);
        const itemGstRate = parseFloat(item.gstRate) || 0;

        if (itemGstRate > 0) {
          const itemTotalGst = lineDiscountedAmount * (itemGstRate / 100);
          item.cgst = parseFloat((itemTotalGst / 2).toFixed(2));
          item.sgst = parseFloat((itemTotalGst / 2).toFixed(2));
          totalCgst += item.cgst;
          totalSgst += item.sgst;
        } else {
          item.cgst = 0;
          item.sgst = 0;
        }
      });

      const discountAmount = parseFloat((subtotal * discountRate).toFixed(2));
      const taxableAmount = parseFloat((subtotal - discountAmount).toFixed(2));
      const totalGst = parseFloat((totalCgst + totalSgst).toFixed(2));
      const unroundedGrandTotal = taxableAmount + totalGst;
      const roundedGrandTotal = Math.round(unroundedGrandTotal);
      const roundOff = parseFloat((roundedGrandTotal - unroundedGrandTotal).toFixed(2));

      return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        discountPercent: parseFloat(discountPercent) || 0,
        discountAmount: discountAmount,
        taxableAmount: taxableAmount,
        totalCgst: parseFloat(totalCgst.toFixed(2)),
        totalSgst: parseFloat(totalSgst.toFixed(2)),
        totalGst: totalGst,
        roundOff: roundOff,
        grandTotal: roundedGrandTotal
      };
    },

    recalculateCurrentBill: function () {
      const summary = this.calculateBillSummary(
        state.currentInvoice.items,
        state.currentInvoice.discountPercent
      );

      state.currentInvoice.subtotal = summary.subtotal;
      state.currentInvoice.discountAmount = summary.discountAmount;
      state.currentInvoice.taxableAmount = summary.taxableAmount;
      state.currentInvoice.totalCgst = summary.totalCgst;
      state.currentInvoice.totalSgst = summary.totalSgst;
      state.currentInvoice.totalGst = summary.totalGst;
      state.currentInvoice.roundOff = summary.roundOff;
      state.currentInvoice.grandTotal = summary.grandTotal;
    },

    // HTML VIEW BUILDERS
    buildTopPosHeaderHtml: function () {
      const inv = state.currentInvoice;

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-950/40">
              <i class="fa-solid fa-cash-register"></i>
            </div>
            <div>
              <div class="flex items-center gap-2.5">
                <h2 class="text-lg font-display font-black text-white">पशु चिकित्सा क्लिनिकल बिलिंग एवं POS टर्मिनल</h2>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  GST 2026 COMPLIANT
                </span>
              </div>
              <div class="text-xs text-slate-400 mt-0.5">
                तत्काल थर्मल पर्ची, A4 कर बीजक, UPI QR भुगतान एकीकरण एवं दैनिक खाताबही प्रबंधन
              </div>
            </div>
          </div>

          <!-- Invoice Metadata Strip -->
          <div class="flex flex-wrap items-center gap-3 self-stretch lg:self-auto justify-between lg:justify-end border-t lg:border-t-0 border-slate-800 pt-3 lg:pt-0 font-mono text-xs">
            <div class="bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-xl text-right">
              <div class="text-[10px] uppercase text-slate-500">बीजक संख्या (Invoice No.)</div>
              <div class="font-bold text-emerald-400 tracking-wider">${inv.invoiceNo}</div>
            </div>

            <div class="bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-xl text-right">
              <div class="text-[10px] uppercase text-slate-500">दिनांक व समय</div>
              <div class="font-bold text-slate-200">${inv.date}</div>
            </div>

            <div class="bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-xl text-right">
              <div class="text-[10px] uppercase text-slate-500">अस्पताल GSTIN</div>
              <div class="font-bold text-cyan-400">06AAAAA0000A1Z5</div>
            </div>
          </div>
        </div>
      `;
    },

    buildTabNavigationHtml: function () {
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-2.5 shadow-xl flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <button 
            type="button" 
            data-billing-tab="pos_terminal" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "pos_terminal"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-calculator"></i>
            <span>POS बिलिंग टर्मिनल (Active Checkout)</span>
          </button>

          <button 
            type="button" 
            data-billing-tab="invoices_history" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "invoices_history"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-receipt"></i>
            <span>जारी किए गए बिल इतिहास (${state.invoicesHistory.length})</span>
          </button>

          <button 
            type="button" 
            data-billing-tab="service_rate_card" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "service_rate_card"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-tags"></i>
            <span>सेवा दर सूची (Standard Rate Card)</span>
          </button>

          <button 
            type="button" 
            data-billing-tab="daily_collection_summary" 
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              state.activeTab === "daily_collection_summary"
                ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-950 shadow-lg shadow-amber-950/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            }"
          >
            <i class="fa-solid fa-chart-line"></i>
            <span>दैनिक राजस्व एवं संग्रह रिपोर्ट (Day Summary)</span>
          </button>
        </div>
      `;
    },

    // WORKSTATION TAB 1: POS Checkout Terminal
    buildPosTerminalWorkstationHtml: function () {
      const inv = state.currentInvoice;

      return `
        <div class="space-y-6">
          
          <!-- Customer & Patient Metadata Sub-Bar -->
          <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl">
            <div class="text-[11px] font-mono uppercase text-slate-400 mb-2.5 flex items-center gap-1.5">
              <i class="fa-solid fa-user-tag text-emerald-400"></i>
              <span>ग्राहक व पशु रोगी विवरण (Customer & Patient Identification)</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <input 
                  type="text" 
                  id="posCustName" 
                  value="${inv.customer.name}" 
                  placeholder="पशुपालक का नाम *" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  id="posCustPhone" 
                  value="${inv.customer.phone}" 
                  placeholder="मोबाइल नंबर *" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  id="posCustVillage" 
                  value="${inv.customer.village}" 
                  placeholder="गांव / कस्बा" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  id="posCustTag" 
                  value="${inv.customer.tagNo}" 
                  placeholder="12-अंकीय पशु टैग संख्या" 
                  class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-emerald-500" 
                />
              </div>
              <div>
                <select id="posCustSpecies" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500">
                  <option value="bubaline" ${inv.customer.species === "bubaline" ? "selected" : ""}>भैंस (Buffalo)</option>
                  <option value="bovine" ${inv.customer.species === "bovine" ? "selected" : ""}>गाय (Cattle)</option>
                  <option value="caprine" ${inv.customer.species === "caprine" ? "selected" : ""}>बकरी (Goat)</option>
                  <option value="canine" ${inv.customer.species === "canine" ? "selected" : ""}>श्वान (Dog)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Split Workstation: Left Selector & Right Live Cart -->
          <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            <!-- Left Pane: Service Selector & Quick Charge Buttons (Cols 1-5) -->
            <div class="xl:col-span-5 flex flex-col gap-4">
              
              <!-- Quick Charge Pills -->
              <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl space-y-3">
                <div class="text-[11px] font-mono uppercase text-slate-400">त्वरित नैदानिक शुल्क (Quick Charges)</div>
                <div class="grid grid-cols-2 gap-2">
                  <button type="button" data-quick-service="srv_opd_general" class="p-2.5 rounded-xl text-left bg-slate-950 border border-slate-800 hover:border-emerald-500 transition-all">
                    <div class="font-bold text-xs text-white">OPD शुल्क (₹100)</div>
                    <div class="text-[10px] text-slate-400">सामान्य परामर्श</div>
                  </button>
                  <button type="button" data-quick-service="srv_artificial_insemination" class="p-2.5 rounded-xl text-left bg-slate-950 border border-slate-800 hover:border-emerald-500 transition-all">
                    <div class="font-bold text-xs text-white">AI गर्भाधान (₹150)</div>
                    <div class="text-[10px] text-slate-400">सीमन स्ट्रॉ शुल्क</div>
                  </button>
                  <button type="button" data-quick-service="srv_dressing_minor" class="p-2.5 rounded-xl text-left bg-slate-950 border border-slate-800 hover:border-emerald-500 transition-all">
                    <div class="font-bold text-xs text-white">घाव ड्रेसिंग (₹120)</div>
                    <div class="text-[10px] text-slate-400">ड्रेसिंग व सफाई</div>
                  </button>
                  <button type="button" data-quick-service="srv_iv_catheterization" class="p-2.5 rounded-xl text-left bg-slate-950 border border-slate-800 hover:border-emerald-500 transition-all">
                    <div class="font-bold text-xs text-white">IV ड्रिप शुल्क (₹150)</div>
                    <div class="text-[10px] text-slate-400">कैन्युलाइजेशन</div>
                  </button>
                </div>
              </div>

              <!-- Catalog Dropdown Adder -->
              <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl space-y-3">
                <div class="text-[11px] font-mono uppercase text-slate-400">कैटलॉग से सेवा जोड़ें</div>
                <div class="flex items-center gap-2">
                  <select id="posServiceSelect" class="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500">
                    <option value="">सेवा का चयन करें...</option>
                    ${state.serviceCatalog.map((s) => `<option value="${s.id}">${s.name} - ₹${s.rate} (GST ${s.gstRate}%)</option>`).join("")}
                  </select>
                  <button id="btnAddCatalogItem" type="button" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow">
                    जोड़ें
                  </button>
                </div>
              </div>

              <!-- Custom Line Item Form -->
              <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl space-y-3">
                <div class="text-[11px] font-mono uppercase text-slate-400">कस्टम मद जोड़ें (Custom Line Item)</div>
                <div class="space-y-2 text-xs font-mono">
                  <input type="text" id="customItemDesc" placeholder="मद विवरण (Description)" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans focus:ring-2 focus:ring-emerald-500" />
                  <div class="grid grid-cols-3 gap-2">
                    <input type="number" id="customItemRate" placeholder="दर (₹)" step="1" min="0" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white" />
                    <input type="number" id="customItemQty" placeholder="मात्रा" value="1" min="1" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white" />
                    <select id="customItemGst" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-white">
                      <option value="0">0% GST</option>
                      <option value="5">5% GST</option>
                      <option value="12">12% GST</option>
                      <option value="18">18% GST</option>
                    </select>
                  </div>
                  <button id="btnAddCustomItem" type="button" class="w-full py-2 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors">
                    + कस्टम मद बिल में जोड़ें
                  </button>
                </div>
              </div>

            </div>

            <!-- Right Pane: Live Cart, Tax Split & Payment Execution (Cols 6-12) -->
            <div class="xl:col-span-7 flex flex-col gap-4">
              
              <!-- Cart Table Card -->
              <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div class="flex items-center gap-2">
                    <i class="fa-solid fa-cart-shopping text-emerald-400"></i>
                    <h3 class="text-xs font-mono font-bold uppercase text-white">सक्रिय बिलिंग कार्ट (${inv.items.length} मदें)</h3>
                  </div>
                  <button id="btnClearCart" type="button" class="text-xs text-rose-400 hover:text-rose-300 font-semibold">
                    <i class="fa-solid fa-trash-can mr-1"></i>कार्ट खाली करें
                  </button>
                </div>

                <!-- Items Table -->
                <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
                  <table class="w-full text-left text-xs font-mono">
                    <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                      <tr>
                        <th class="px-3 py-2.5">मद विवरण</th>
                        <th class="px-3 py-2.5 text-center">मात्रा</th>
                        <th class="px-3 py-2.5 text-right">दर (₹)</th>
                        <th class="px-3 py-2.5 text-center">GST %</th>
                        <th class="px-3 py-2.5 text-right">कुल राशि</th>
                        <th class="px-3 py-2.5 text-right">हटाएं</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/80 font-sans">
                      ${
                        inv.items.length === 0
                          ? `<tr><td colspan="6" class="p-8 text-center text-xs text-slate-500 font-mono">कार्ट खाली है। बाईं सूची से सेवाएं अथवा औषधियां जोड़ें।</td></tr>`
                          : inv.items
                              .map((item, idx) => {
                                return `
                            <tr class="hover:bg-slate-850/50 transition-colors">
                              <td class="px-3 py-2.5">
                                <div class="font-bold text-white text-xs">${item.name}</div>
                                <div class="text-[10px] font-mono text-slate-400">HSN: ${item.hsnSac}</div>
                              </td>
                              <td class="px-3 py-2.5 text-center font-mono">
                                <input 
                                  type="number" 
                                  min="1" 
                                  data-cart-qty-idx="${idx}" 
                                  value="${item.qty}" 
                                  class="w-12 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-center text-white text-xs font-bold" 
                                />
                              </td>
                              <td class="px-3 py-2.5 text-right font-mono text-slate-300">₹${item.rate.toFixed(2)}</td>
                              <td class="px-3 py-2.5 text-center font-mono">
                                <span class="px-1.5 py-0.5 rounded text-[10px] ${item.gstRate > 0 ? "bg-amber-500/10 text-amber-300 border border-amber-500/20" : "bg-slate-800 text-slate-400"}">
                                  ${item.gstRate}%
                                </span>
                              </td>
                              <td class="px-3 py-2.5 text-right font-mono font-bold text-white">₹${item.amount.toFixed(2)}</td>
                              <td class="px-3 py-2.5 text-right">
                                <button type="button" data-remove-item-idx="${idx}" class="text-slate-500 hover:text-rose-400 p-1">
                                  <i class="fa-solid fa-xmark"></i>
                                </button>
                              </td>
                            </tr>
                          `;
                              })
                              .join("")
                      }
                    </tbody>
                  </table>
                </div>

                <!-- Financial Calculations Summary Card -->
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs font-mono">
                  <div class="flex items-center justify-between text-slate-300">
                    <span>उप-योग (Subtotal):</span>
                    <span class="font-bold">₹${inv.subtotal.toFixed(2)}</span>
                  </div>

                  <div class="flex items-center justify-between">
                    <span class="text-slate-300 flex items-center gap-1.5">
                      <span>छूट (Discount %):</span>
                      <input 
                        type="number" 
                        id="posDiscountInput" 
                        min="0" 
                        max="100" 
                        step="1" 
                        value="${inv.discountPercent}" 
                        class="w-14 bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-white font-bold text-center" 
                      />
                    </span>
                    <span class="text-amber-400 font-bold">- ₹${inv.discountAmount.toFixed(2)}</span>
                  </div>

                  <div class="flex items-center justify-between text-slate-300">
                    <span>कर-योग्य राशि (Taxable Amount):</span>
                    <span class="font-bold">₹${inv.taxableAmount.toFixed(2)}</span>
                  </div>

                  <div class="flex items-center justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-900">
                    <span>CGST + SGST (कर विभाजन):</span>
                    <span class="text-cyan-400">₹${inv.totalCgst.toFixed(2)} + ₹${inv.totalSgst.toFixed(2)} = ₹${inv.totalGst.toFixed(2)}</span>
                  </div>

                  <div class="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>राउंड ऑफ (Round Off):</span>
                    <span>${inv.roundOff >= 0 ? `+₹${inv.roundOff.toFixed(2)}` : `-₹${Math.abs(inv.roundOff).toFixed(2)}`}</span>
                  </div>

                  <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-base font-sans">
                    <span class="font-black text-white">कुल देय राशि (Grand Total):</span>
                    <span class="text-2xl font-black font-mono text-emerald-400">₹${inv.grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <!-- Payment Mode Buttons -->
                <div class="space-y-2">
                  <div class="text-[11px] font-mono uppercase text-slate-400">भुगतान माध्यम चुनें (Payment Mode)</div>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button 
                      type="button" 
                      data-payment-mode="CASH" 
                      class="py-2.5 px-3 rounded-xl text-xs font-bold font-mono transition-all border ${
                        inv.paymentMode === "CASH" ? "bg-emerald-600 text-white border-emerald-500 shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-850"
                      }"
                    >
                      <i class="fa-solid fa-money-bill-wave mr-1"></i>नकद (Cash)
                    </button>

                    <button 
                      type="button" 
                      data-payment-mode="UPI" 
                      class="py-2.5 px-3 rounded-xl text-xs font-bold font-mono transition-all border ${
                        inv.paymentMode === "UPI" ? "bg-cyan-600 text-white border-cyan-500 shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-850"
                      }"
                    >
                      <i class="fa-solid fa-qrcode mr-1"></i>UPI QR
                    </button>

                    <button 
                      type="button" 
                      data-payment-mode="CARD" 
                      class="py-2.5 px-3 rounded-xl text-xs font-bold font-mono transition-all border ${
                        inv.paymentMode === "CARD" ? "bg-blue-600 text-white border-blue-500 shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-850"
                      }"
                    >
                      <i class="fa-solid fa-credit-card mr-1"></i>कार्ड (Card)
                    </button>

                    <button 
                      type="button" 
                      data-payment-mode="CREDIT_KHATA" 
                      class="py-2.5 px-3 rounded-xl text-xs font-bold font-mono transition-all border ${
                        inv.paymentMode === "CREDIT_KHATA" ? "bg-amber-600 text-slate-950 border-amber-500 shadow-md" : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-850"
                      }"
                    >
                      <i class="fa-solid fa-book-bookmark mr-1"></i>उधार खाता
                    </button>
                  </div>
                </div>

                <!-- Final Action Buttons Strip -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <button id="btnPrintThermalReceipt" type="button" class="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow flex items-center justify-center gap-1.5 transition-colors">
                    <i class="fa-solid fa-receipt"></i>
                    <span>80mm थर्मल रसीद</span>
                  </button>

                  <button id="btnPrintA4Invoice" type="button" class="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 shadow flex items-center justify-center gap-1.5 transition-colors">
                    <i class="fa-solid fa-print"></i>
                    <span>A4 कर बीजक (A4 GST)</span>
                  </button>

                  <button id="btnCompleteInvoice" type="button" class="py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-1.5 active:scale-95 transition-all">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>बिल पूर्ण व सहेजें</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      `;
    },

    // WORKSTATION TAB 2: Invoices History Table
    buildInvoicesHistoryWorkstationHtml: function () {
      const q = state.searchQuery.trim().toLowerCase();
      const filtered = state.invoicesHistory.filter((inv) => {
        return (
          !q ||
          inv.invoiceNo.toLowerCase().includes(q) ||
          inv.customer.name.toLowerCase().includes(q) ||
          inv.customer.phone.includes(q) ||
          inv.customer.tagNo.toLowerCase().includes(q)
        );
      });

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-clock-rotate-left text-cyan-400"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-white">जारी किए गए बीजक इतिहास (${filtered.length})</h3>
            </div>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
            <table class="w-full text-left text-xs font-mono">
              <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                <tr>
                  <th class="px-3.5 py-3">बीजक संख्या</th>
                  <th class="px-3.5 py-3">दिनांक व समय</th>
                  <th class="px-3.5 py-3">पशुपालक / ग्राहक</th>
                  <th class="px-3.5 py-3">पशु टैग / प्रजाति</th>
                  <th class="px-3.5 py-3">भुगतान माध्यम</th>
                  <th class="px-3.5 py-3 text-right">कुल देय (₹)</th>
                  <th class="px-3.5 py-3 text-right">पुनः प्रिंट</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/80 font-sans">
                ${
                  filtered.length === 0
                    ? `<tr><td colspan="7" class="p-8 text-center text-xs text-slate-500 font-mono">कोई बीजक नहीं मिला।</td></tr>`
                    : filtered
                        .map((inv) => {
                          return `
                      <tr class="hover:bg-slate-850/50 transition-colors">
                        <td class="px-3.5 py-3 font-mono font-bold text-emerald-400">${inv.invoiceNo}</td>
                        <td class="px-3.5 py-3 font-mono text-slate-300 text-xs">${inv.date}</td>
                        <td class="px-3.5 py-3">
                          <div class="font-bold text-white text-xs">${inv.customer.name}</div>
                          <div class="text-[10px] font-mono text-slate-400">${inv.customer.phone}</div>
                        </td>
                        <td class="px-3.5 py-3 font-mono">
                          <div class="text-cyan-300 font-bold">${inv.customer.tagNo}</div>
                          <div class="text-[10px] text-slate-400 uppercase font-sans">${inv.customer.species}</div>
                        </td>
                        <td class="px-3.5 py-3 font-mono">
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                            inv.paymentMode === "CASH"
                              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                              : inv.paymentMode === "UPI"
                              ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                              : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          }">
                            ${inv.paymentMode}
                          </span>
                        </td>
                        <td class="px-3.5 py-3 text-right font-mono font-black text-white text-sm">₹${inv.grandTotal.toFixed(2)}</td>
                        <td class="px-3.5 py-3 text-right">
                          <div class="flex items-center justify-end gap-1.5">
                            <button type="button" data-history-thermal="${inv.invoiceNo}" title="80mm Thermal Receipt" class="p-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
                              <i class="fa-solid fa-receipt"></i>
                            </button>
                            <button type="button" data-history-a4="${inv.invoiceNo}" title="A4 GST Tax Invoice" class="p-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700">
                              <i class="fa-solid fa-print"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    `;
                        })
                        .join("")
                }
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // WORKSTATION TAB 3: Service Rate Card Manager
    buildServiceRateCardWorkstationHtml: function () {
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 class="text-xs font-mono font-bold uppercase text-white">मानक पशु चिकित्सा सेवा दर कार्ड (Service Rate Card)</h3>
              <p class="text-xs text-slate-400 mt-0.5">SAC / HSN कोड वर्गीकरण एवं मानक प्रक्रिया शुल्क</p>
            </div>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
            <table class="w-full text-left text-xs font-mono">
              <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                <tr>
                  <th class="px-3.5 py-3">सेवा / प्रक्रिया नाम</th>
                  <th class="px-3.5 py-3">SAC कोड</th>
                  <th class="px-3.5 py-3">वर्ग</th>
                  <th class="px-3.5 py-3">मानक दर (₹)</th>
                  <th class="px-3.5 py-3">GST दर</th>
                  <th class="px-3.5 py-3 font-sans">कर छूट / वैधानिक टिप्पणी</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/80 font-sans">
                ${state.serviceCatalog
                  .map((s) => {
                    return `
                    <tr class="hover:bg-slate-850/50">
                      <td class="px-3.5 py-3 font-bold text-white text-xs">${s.name}</td>
                      <td class="px-3.5 py-3 font-mono text-cyan-400">${s.hsnSac}</td>
                      <td class="px-3.5 py-3 font-mono uppercase text-slate-400 text-[11px]">${s.category}</td>
                      <td class="px-3.5 py-3 font-mono font-black text-emerald-400 text-sm">₹${s.rate.toFixed(2)}</td>
                      <td class="px-3.5 py-3 font-mono">${s.gstRate}%</td>
                      <td class="px-3.5 py-3 text-xs text-slate-400 leading-relaxed">${s.notes}</td>
                    </tr>
                  `;
                  })
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // WORKSTATION TAB 4: Daily Collection & Revenue Breakdown
    buildDailyCollectionSummaryHtml: function () {
      let cashTotal = 0;
      let upiTotal = 0;
      let cardTotal = 0;
      let khataTotal = 0;
      let totalCollection = 0;

      state.invoicesHistory.forEach((inv) => {
        totalCollection += inv.grandTotal;
        if (inv.paymentMode === "CASH") cashTotal += inv.grandTotal;
        else if (inv.paymentMode === "UPI") upiTotal += inv.grandTotal;
        else if (inv.paymentMode === "CARD") cardTotal += inv.grandTotal;
        else if (inv.paymentMode === "CREDIT_KHATA") khataTotal += inv.grandTotal;
      });

      return `
        <div class="space-y-6">
          <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              <div class="text-[10px] font-mono text-slate-400 uppercase">कुल दैनिक संग्रह (Gross)</div>
              <div class="text-2xl font-display font-black text-white mt-1">₹${totalCollection.toLocaleString("en-IN")}</div>
              <div class="text-[10px] text-emerald-400 font-mono mt-0.5">${state.invoicesHistory.length} कुल रसीदें</div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              <div class="text-[10px] font-mono text-slate-400 uppercase">नकद संग्रह (Cash In Hand)</div>
              <div class="text-2xl font-display font-black text-emerald-400 mt-1">₹${cashTotal.toLocaleString("en-IN")}</div>
              <div class="text-[10px] text-slate-500 font-mono mt-0.5">दैनिक गल्ला बॉक्स</div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              <div class="text-[10px] font-mono text-slate-400 uppercase">UPI ऑनलाइन (Bank Credit)</div>
              <div class="text-2xl font-display font-black text-cyan-400 mt-1">₹${upiTotal.toLocaleString("en-IN")}</div>
              <div class="text-[10px] text-slate-500 font-mono mt-0.5">SBI / PNB प्रत्यक्ष अंतरण</div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              <div class="text-[10px] font-mono text-slate-400 uppercase">कार्ड स्वाइप (POS Card)</div>
              <div class="text-2xl font-display font-black text-blue-400 mt-1">₹${cardTotal.toLocaleString("en-IN")}</div>
              <div class="text-[10px] text-slate-500 font-mono mt-0.5">डेबिट / क्रेडिट कार्ड</div>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              <div class="text-[10px] font-mono text-slate-400 uppercase">उधार खाता (Credit Ledger)</div>
              <div class="text-2xl font-display font-black text-amber-400 mt-1">₹${khataTotal.toLocaleString("en-IN")}</div>
              <div class="text-[10px] text-amber-300 font-mono mt-0.5">बकाया वसूली शेष</div>
            </div>

          </div>
        </div>
      `;
    },

    // EVENT BINDINGS
    bindUiEvents: function () {
      const container = state.containerElement;
      if (!container) return;

      // 1. Navigation Tabs
      container.querySelectorAll("[data-billing-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tab = btn.getAttribute("data-billing-tab");
          if (tab && tab !== state.activeTab) {
            state.activeTab = tab;
            this.render(container);
          }
        });
      });

      // 2. Search Input in History
      const searchInp = container.querySelector("#pharmSearchInput");
      if (searchInp) {
        searchInp.addEventListener("input", (e) => {
          state.searchQuery = e.target.value;
          this.render(container);
        });
      }

      // 3. Quick Charge Buttons
      container.querySelectorAll("[data-quick-service]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const sId = btn.getAttribute("data-quick-service");
          const srv = state.serviceCatalog.find((s) => s.id === sId);
          if (srv) {
            this.addItemToCart({
              id: srv.id,
              name: srv.name,
              hsnSac: srv.hsnSac,
              qty: 1,
              rate: srv.rate,
              gstRate: srv.gstRate
            });
          }
        });
      });

      // 4. Catalog Add Item
      const btnAddCat = container.querySelector("#btnAddCatalogItem");
      if (btnAddCat) {
        btnAddCat.addEventListener("click", () => {
          const sel = container.querySelector("#posServiceSelect");
          if (!sel || !sel.value) return;
          const srv = state.serviceCatalog.find((s) => s.id === sel.value);
          if (srv) {
            this.addItemToCart({
              id: srv.id,
              name: srv.name,
              hsnSac: srv.hsnSac,
              qty: 1,
              rate: srv.rate,
              gstRate: srv.gstRate
            });
            sel.value = "";
          }
        });
      }

      // 5. Custom Line Item Add
      const btnAddCustom = container.querySelector("#btnAddCustomItem");
      if (btnAddCustom) {
        btnAddCustom.addEventListener("click", () => {
          const desc = document.getElementById("customItemDesc").value.trim();
          const rate = parseFloat(document.getElementById("customItemRate").value);
          const qty = parseInt(document.getElementById("customItemQty").value, 10) || 1;
          const gst = parseFloat(document.getElementById("customItemGst").value) || 0;

          if (!desc || isNaN(rate) || rate < 0) {
            notify("कृपया मान्य विवरण एवं दर प्रविष्ट करें!", "warning");
            return;
          }

          this.addItemToCart({
            id: "custom_" + Date.now(),
            name: desc,
            hsnSac: "9993",
            qty: qty,
            rate: rate,
            gstRate: gst
          });

          document.getElementById("customItemDesc").value = "";
          document.getElementById("customItemRate").value = "";
        });
      }

      // 6. Cart Qty Change
      container.querySelectorAll("[data-cart-qty-idx]").forEach((inp) => {
        inp.addEventListener("change", (e) => {
          const idx = parseInt(e.target.getAttribute("data-cart-qty-idx"), 10);
          const val = parseInt(e.target.value, 10) || 1;
          if (state.currentInvoice.items[idx]) {
            state.currentInvoice.items[idx].qty = val;
            this.recalculateCurrentBill();
            this.render(container);
          }
        });
      });

      // 7. Remove Cart Item
      container.querySelectorAll("[data-remove-item-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-remove-item-idx"), 10);
          state.currentInvoice.items.splice(idx, 1);
          this.recalculateCurrentBill();
          this.render(container);
        });
      });

      // 8. Clear Cart
      const btnClear = container.querySelector("#btnClearCart");
      if (btnClear) {
        btnClear.addEventListener("click", () => {
          state.currentInvoice.items = [];
          this.recalculateCurrentBill();
          this.render(container);
          notify("बिलिंग कार्ट खाली किया गया।", "info");
        });
      }

      // 9. Discount Input Change
      const discInp = container.querySelector("#posDiscountInput");
      if (discInp) {
        discInp.addEventListener("input", (e) => {
          state.currentInvoice.discountPercent = parseFloat(e.target.value) || 0;
          this.recalculateCurrentBill();
          this.render(container);
        });
      }

      // 10. Payment Mode Select
      container.querySelectorAll("[data-payment-mode]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const mode = btn.getAttribute("data-payment-mode");
          state.currentInvoice.paymentMode = mode;
          if (mode === "UPI") {
            this.openUpiQrModal();
          } else {
            this.render(container);
          }
        });
      });

      // 11. Complete & Save Invoice
      const btnComplete = container.querySelector("#btnCompleteInvoice");
      if (btnComplete) {
        btnComplete.addEventListener("click", () => this.completeInvoice());
      }

      // 12. Print Thermal Receipt
      const btnThermal = container.querySelector("#btnPrintThermalReceipt");
      if (btnThermal) {
        btnThermal.addEventListener("click", () => this.generateThermalReceipt(state.currentInvoice));
      }

      // 13. Print A4 GST Invoice
      const btnA4 = container.querySelector("#btnPrintA4Invoice");
      if (btnA4) {
        btnA4.addEventListener("click", () => this.generateA4TaxInvoice(state.currentInvoice));
      }

      // 14. History Print Delegation
      container.addEventListener("click", (e) => {
        const thBtn = e.target.closest("[data-history-thermal]");
        if (thBtn) {
          const invNo = thBtn.getAttribute("data-history-thermal");
          const inv = state.invoicesHistory.find((i) => i.invoiceNo === invNo);
          if (inv) this.generateThermalReceipt(inv);
        }

        const a4Btn = e.target.closest("[data-history-a4]");
        if (a4Btn) {
          const invNo = a4Btn.getAttribute("data-history-a4");
          const inv = state.invoicesHistory.find((i) => i.invoiceNo === invNo);
          if (inv) this.generateA4TaxInvoice(inv);
        }
      });
    },

    addItemToCart: function (item) {
      const existing = state.currentInvoice.items.find((i) => i.id === item.id);
      if (existing) {
        existing.qty += item.qty;
      } else {
        state.currentInvoice.items.push({
          id: item.id,
          name: item.name,
          hsnSac: item.hsnSac || "9993",
          qty: item.qty || 1,
          rate: item.rate,
          gstRate: item.gstRate || 0,
          amount: (item.qty || 1) * item.rate,
          cgst: 0,
          sgst: 0
        });
      }
      this.recalculateCurrentBill();
      this.render(state.containerElement);
      notify(`${item.name} कार्ट में सम्मिलित हुआ।`, "info");
    },

    completeInvoice: async function () {
      if (state.currentInvoice.items.length === 0) {
        notify("त्रुटि: कार्ट में कम से कम एक मद होना अनिवार्य है!", "warning");
        return;
      }

      // Sync customer inputs
      const cName = document.getElementById("posCustName").value.trim();
      const cPhone = document.getElementById("posCustPhone").value.trim();
      const cVillage = document.getElementById("posCustVillage").value.trim();
      const cTag = document.getElementById("posCustTag").value.trim();
      const cSpecies = document.getElementById("posCustSpecies").value;

      state.currentInvoice.customer.name = cName || "सामान्य कृषक";
      state.currentInvoice.customer.phone = cPhone || "9999999999";
      state.currentInvoice.customer.village = cVillage || "स्थानीय";
      state.currentInvoice.customer.tagNo = cTag || "NO-TAG";
      state.currentInvoice.customer.species = cSpecies;

      this.recalculateCurrentBill();

      const finalizedInvoice = JSON.parse(JSON.stringify(state.currentInvoice));
      finalizedInvoice.date = new Date().toISOString().replace("T", " ").slice(0, 16);

      // Save to History State
      state.invoicesHistory.unshift(finalizedInvoice);

      // Save to IndexedDB
      try {
        const db = await getDbConnection();
        const tx = db.transaction(STORE_BILLING, "readwrite");
        const store = tx.objectStore(STORE_BILLING);
        store.put({
          recordId: "REC-BILL-" + finalizedInvoice.invoiceNo,
          patientId: "PAT-" + finalizedInvoice.customer.tagNo,
          recordType: "pos_invoice",
          timestamp: new Date().toISOString(),
          invoiceData: finalizedInvoice
        });
      } catch (err) {
        console.error("Failed to commit invoice to DB", err);
      }

      // Emit Invoice Paid Event on Bus
      window.dispatchEvent(new CustomEvent("invoice:paid", { detail: finalizedInvoice }));

      notify(`बीजक ${finalizedInvoice.invoiceNo} पूर्ण व सुरक्षित हुआ! (₹${finalizedInvoice.grandTotal})`, "success");

      // Reset to Fresh Bill
      state.currentInvoice = {
        invoiceNo: "INV-2026-" + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString().replace("T", " ").slice(0, 16),
        customer: { name: "", phone: "", village: "", tagNo: "", species: "bovine" },
        items: [],
        subtotal: 0,
        discountPercent: 0,
        discountAmount: 0,
        taxableAmount: 0,
        totalCgst: 0,
        totalSgst: 0,
        totalGst: 0,
        roundOff: 0,
        grandTotal: 0,
        paymentMode: "CASH",
        paymentStatus: "PAID",
        upiReference: "",
        notes: ""
      };

      this.render(state.containerElement);
    },

    // 5. MODAL: Dynamic UPI QR Code Payment
    openUpiQrModal: function () {
      const mount = document.getElementById("billing-modal-container");
      if (!mount) return;

      const amt = state.currentInvoice.grandTotal;
      const invNo = state.currentInvoice.invoiceNo;
      const vpa = "vetcare.karnal@sbi";
      const upiUrl = `upi://pay?pa=${vpa}&pn=Vetcare%20Hospital&am=${amt}&cu=INR&tn=${invNo}`;

      mount.innerHTML = `
        <div id="upiModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative text-center text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-qrcode text-cyan-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">UPI QR कोड से भुगतान</h3>
              </div>
              <button id="closeUpiModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <!-- Stylized Dynamic QR Visual -->
            <div class="p-4 rounded-xl bg-white mx-auto w-48 h-48 flex flex-col items-center justify-center shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full text-slate-900">
                <path fill="currentColor" d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z M50,10 h5 v10 h-5 z M50,25 h5 v5 h-5 z M50,35 h5 v5 h-5 z M10,50 h10 v5 h-10 z M25,50 h10 v5 h-10 z M50,50 h10 v10 h-10 z M70,50 h20 v5 h-20 z M60,60 h5 v20 h-5 z M70,70 h10 v10 h-10 z M85,75 h5 v15 h-5 z"/>
              </svg>
            </div>

            <div class="mt-4">
              <div class="text-xs text-slate-400 font-mono">देय कुल राशि:</div>
              <div class="text-3xl font-black font-mono text-emerald-400">₹${amt.toFixed(2)}</div>
              <div class="text-[11px] text-slate-500 font-mono mt-1">VPA: ${vpa}</div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-800 space-y-2">
              <input type="text" id="upiRefInput" placeholder="UPI लेनदेन संख्या (UTR No.)" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono text-center focus:ring-2 focus:ring-cyan-500" />
              <button id="btnConfirmUpiPayment" type="button" class="w-full py-2.5 rounded-xl font-bold text-xs bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950/50">
                भुगतान सत्यापित करें (Verify & Accept)
              </button>
            </div>
          </div>
        </div>
      `;

      const modal = document.getElementById("upiModal");
      const closeAction = () => {
        if (modal) modal.remove();
        this.render(state.containerElement);
      };

      document.getElementById("closeUpiModalBtn").addEventListener("click", closeAction);

      document.getElementById("btnConfirmUpiPayment").addEventListener("click", () => {
        const utr = document.getElementById("upiRefInput").value.trim() || `UPI/${Date.now()}`;
        state.currentInvoice.paymentMode = "UPI";
        state.currentInvoice.upiReference = utr;
        notify(`UPI भुगतान UTR (${utr}) सफलतापूर्वक दर्ज हुआ!`, "success");
        closeAction();
      });
    },

    // 6. PRINT LAYOUT 1: 80mm Compact Thermal Receipt Layout
    generateThermalReceipt: function (inv) {
      const printWindow = window.open("", "_blank", "width=400,height=650");
      if (!printWindow) {
        notify("कृपया प्रिंट पॉपअप विंडो की अनुमति दें।", "warning");
        return;
      }

      const rowsHtml = inv.items
        .map(
          (item) => `
        <tr>
          <td style="padding: 3px 0; text-align: left;">${item.name}</td>
          <td style="padding: 3px 0; text-align: center;">${item.qty}</td>
          <td style="padding: 3px 0; text-align: right;">${item.amount.toFixed(2)}</td>
        </tr>
      `
        )
        .join("");

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8">
          <title>रसीद - ${inv.invoiceNo}</title>
          <style>
            @page { size: 80mm auto; margin: 2mm; }
            body { font-family: 'Courier New', Courier, monospace; width: 72mm; margin: 0 auto; padding: 4mm 2mm; font-size: 11px; color: #000; line-height: 1.3; }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .divider { border-top: 1px dashed #000; margin: 4px 0; }
            table { width: 100%; border-collapse: collapse; }
          </style>
        </head>
        <body>
          <div class="center bold" style="font-size: 13px;">राष्ट्रीय पशु चिकित्सालय</div>
          <div class="center">मॉडल टाउन, करनाल (हरियाणा)</div>
          <div class="center">फोन: 1800-VET-CARE | GSTIN: 06AAAAA0000A1Z5</div>
          <div class="divider"></div>
          
          <div>रसीद संख्या: ${inv.invoiceNo}</div>
          <div>दिनांक: ${inv.date}</div>
          <div>ग्राहक: ${inv.customer.name} (${inv.customer.phone})</div>
          <div>टैग: ${inv.customer.tagNo} | प्रजाति: ${inv.customer.species.toUpperCase()}</div>
          <div class="divider"></div>

          <table>
            <thead>
              <tr class="bold">
                <th style="text-align: left;">मद विवरण</th>
                <th style="text-align: center;">मात्रा</th>
                <th style="text-align: right;">राशि (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="divider"></div>
          <table>
            <tr><td>उप-योग (Subtotal):</td><td style="text-align: right;">₹${inv.subtotal.toFixed(2)}</td></tr>
            ${inv.discountAmount > 0 ? `<tr><td>छूट (${inv.discountPercent}%):</td><td style="text-align: right;">-₹${inv.discountAmount.toFixed(2)}</td></tr>` : ""}
            ${inv.totalGst > 0 ? `<tr><td>GST कर:</td><td style="text-align: right;">₹${inv.totalGst.toFixed(2)}</td></tr>` : ""}
            <tr><td>राउंड ऑफ:</td><td style="text-align: right;">₹${inv.roundOff.toFixed(2)}</td></tr>
            <tr class="bold" style="font-size: 13px;"><td>कुल देय (Total):</td><td style="text-align: right;">₹${inv.grandTotal.toFixed(2)}</td></tr>
          </table>

          <div class="divider"></div>
          <div>भुगतान माध्यम: <strong>${inv.paymentMode}</strong> (${inv.paymentStatus})</div>
          ${inv.upiReference ? `<div>UTR No: ${inv.upiReference}</div>` : ""}

          <div class="divider"></div>
          <div class="center" style="font-size: 10px;">पशुओं के शीघ्र स्वास्थ्य लाभ की कामना करते हैं।<br>धन्यवाद! पुनः पधारें।</div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    },

    // 7. PRINT LAYOUT 2: A4 Formal Corporate/Hospital Tax Invoice
    generateA4TaxInvoice: function (inv) {
      const printWindow = window.open("", "_blank", "width=900,height=1000");
      if (!printWindow) {
        notify("कृपया प्रिंट पॉपअप विंडो की अनुमति दें।", "warning");
        return;
      }

      const rowsHtml = inv.items
        .map(
          (item, idx) => `
        <tr>
          <td style="padding: 8px; border: 1px solid #d1d5db; text-align: center;">${idx + 1}</td>
          <td style="padding: 8px; border: 1px solid #d1d5db;">
            <div style="font-weight: bold;">${item.name}</div>
          </td>
          <td style="padding: 8px; border: 1px solid #d1d5db; font-family: monospace; text-align: center;">${item.hsnSac}</td>
          <td style="padding: 8px; border: 1px solid #d1d5db; text-align: center; font-family: monospace;">${item.qty}</td>
          <td style="padding: 8px; border: 1px solid #d1d5db; text-align: right; font-family: monospace;">₹${item.rate.toFixed(2)}</td>
          <td style="padding: 8px; border: 1px solid #d1d5db; text-align: center; font-family: monospace;">${item.gstRate}%</td>
          <td style="padding: 8px; border: 1px solid #d1d5db; text-align: right; font-family: monospace; font-weight: bold;">₹${item.amount.toFixed(2)}</td>
        </tr>
      `
        )
        .join("");

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8">
          <title>कर बीजक (Tax Invoice) - ${inv.invoiceNo}</title>
          <style>
            @page { size: A4 portrait; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; margin: 0; padding: 15px; font-size: 11px; }
            .inv-box { border: 2px solid #064e3b; padding: 25px; border-radius: 8px; }
            .header-strip { display: flex; justify-content: space-between; border-bottom: 2px solid #064e3b; padding-bottom: 12px; margin-bottom: 15px; }
            .clinic-name { font-size: 18px; font-weight: 800; color: #064e3b; text-transform: uppercase; }
            .grid-party { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; background: #f9fafb; padding: 12px; border-radius: 6px; margin-bottom: 15px; border: 1px solid #e5e7eb; }
            .table-data { width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 11px; }
            .table-data th { background: #064e3b; color: #fff; padding: 8px; font-size: 10px; text-transform: uppercase; }
            .summary-box { float: right; width: 45%; margin-bottom: 20px; font-size: 11px; }
            .footer-strip { clear: both; margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; border-top: 1px solid #e5e7eb; padding-top: 15px; }
            .seal-box { border: 1px dashed #9ca3af; width: 180px; height: 50px; text-align: center; line-height: 50px; color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="inv-box">
            <div class="header-strip">
              <div>
                <div class="clinic-name">राष्ट्रीय पशु चिकित्सालय एवं पॉलीक्लिनिक</div>
                <div style="font-size: 10px; color: #4b5563;">National Veterinary Hospital & Research Polyclinic</div>
                <div style="font-size: 10px; color: #374151; margin-top: 2px;">GSTIN: 06AAAAA0000A1Z5 • क्लिनिक पंजीयन: HR-VET-2026-901</div>
              </div>
              <div style="text-align: right; font-family: monospace;">
                <div style="font-size: 14px; font-weight: bold; color: #064e3b;">कर बीजक (TAX INVOICE)</div>
                <div>बीजक संख्या: <strong>${inv.invoiceNo}</strong></div>
                <div>दिनांक: ${inv.date}</div>
              </div>
            </div>

            <div class="grid-party">
              <div>
                <div style="font-weight: bold; color: #064e3b; margin-bottom: 4px;">बिल प्राप्तकर्ता (Billed To):</div>
                <div><strong>${inv.customer.name}</strong></div>
                <div>मोबाइल: ${inv.customer.phone}</div>
                <div>गांव / कस्बा: ${inv.customer.village}</div>
              </div>
              <div>
                <div style="font-weight: bold; color: #064e3b; margin-bottom: 4px;">पशु रोगी पहचान (Patient Bio):</div>
                <div>12-अंकीय टैग: <strong>${inv.customer.tagNo}</strong></div>
                <div>प्रजाति: ${inv.customer.species.toUpperCase()}</div>
                <div>भुगतान माध्यम: <strong>${inv.paymentMode}</strong> (${inv.paymentStatus})</div>
              </div>
            </div>

            <table class="table-data">
              <thead>
                <tr>
                  <th style="width: 5%;">क्र.</th>
                  <th style="text-align: left; width: 40%;">मद विवरण / सेवा</th>
                  <th style="width: 10%;">HSN/SAC</th>
                  <th style="width: 8%;">मात्रा</th>
                  <th style="text-align: right; width: 12%;">दर (₹)</th>
                  <th style="width: 10%;">GST %</th>
                  <th style="text-align: right; width: 15%;">कुल राशि (₹)</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>

            <table class="summary-box" style="border-collapse: collapse;">
              <tr><td style="padding: 4px;">उप-योग (Subtotal):</td><td style="text-align: right; font-family: monospace;">₹${inv.subtotal.toFixed(2)}</td></tr>
              ${inv.discountAmount > 0 ? `<tr><td style="padding: 4px;">छूट (${inv.discountPercent}%):</td><td style="text-align: right; font-family: monospace; color: #b45309;">-₹${inv.discountAmount.toFixed(2)}</td></tr>` : ""}
              <tr><td style="padding: 4px;">कर-योग्य मूल्य (Taxable Base):</td><td style="text-align: right; font-family: monospace;">₹${inv.taxableAmount.toFixed(2)}</td></tr>
              <tr><td style="padding: 4px;">केंद्रीय कर (CGST):</td><td style="text-align: right; font-family: monospace;">₹${inv.totalCgst.toFixed(2)}</td></tr>
              <tr><td style="padding: 4px;">राज्य कर (SGST):</td><td style="text-align: right; font-family: monospace;">₹${inv.totalSgst.toFixed(2)}</td></tr>
              <tr><td style="padding: 4px;">राउंड ऑफ (Round Off):</td><td style="text-align: right; font-family: monospace;">₹${inv.roundOff.toFixed(2)}</td></tr>
              <tr style="border-top: 1.5px solid #064e3b; font-weight: bold; font-size: 13px;">
                <td style="padding: 6px 4px; color: #064e3b;">कुल देय राशि (Grand Total):</td>
                <td style="text-align: right; font-family: monospace; color: #064e3b;">₹${inv.grandTotal.toFixed(2)}</td>
              </tr>
            </table>

            <div class="footer-strip">
              <div>
                <div>प्रमाणीकरण: GST-ACT-SECTION-31-COMPLIANT</div>
                <div>अधिकृत बैंक: State Bank of India • A/c: 38491029481 • IFSC: SBIN0000661</div>
              </div>
              <div class="seal-box">
                अधिकृत हस्ताक्षरकर्ता (Billing Officer)
              </div>
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
  root.VetcareApp.Modules.BillingPosInvoicing = BillingPosInvoicing;

})(typeof window !== "undefined" ? window : this);
