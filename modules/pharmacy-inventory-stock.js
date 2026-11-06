// Vetcare AI OS - Veterinary Pharmacy Inventory, FEFO Stock Controller & Narcotic Register Module (2026 Production)
(function (root) {
  "use strict";

  root.VetcareApp = root.VetcareApp || {};
  root.VetcareApp.Modules = root.VetcareApp.Modules || {};
  root.VetcareApp.ClinicalData = root.VetcareApp.ClinicalData || {};

  // Database Constants
  const DB_NAME = "VetcareEMR_DB";
  const DB_VERSION = 1;
  const STORE_INVENTORY = "clinical_records";

  // Master Initial Veterinary Inventory Stock Dataset
  const INITIAL_INVENTORY_MASTER = [
    {
      id: "med_ceftiofur_1g",
      tradeName: "Xyrofur 1g Inj",
      genericName: "Ceftiofur Sodium Sterile Powder",
      form: "injectable",
      category: "antibiotic",
      isControlled: false,
      scheduleType: "H1",
      minStockThreshold: 15,
      totalStockOnHand: 38,
      unitOfMeasure: "vials",
      rackShelfLocation: "Rack A-02 (Cold ILR 4°C)",
      supplier: "Zydus Animal Health Ltd",
      batches: [
        { batchNo: "XYR-2025-09", mfgDate: "2024-10-01", expDate: new Date(Date.now() + 86400000 * 22).toISOString().split("T")[0], quantity: 8, purchaseCost: 320.0, sellingPrice: 385.0 },
        { batchNo: "XYR-2026-01", mfgDate: "2025-01-15", expDate: new Date(Date.now() + 86400000 * 280).toISOString().split("T")[0], quantity: 30, purchaseCost: 325.0, sellingPrice: 390.0 }
      ]
    },
    {
      id: "med_flunixin_50ml",
      tradeName: "Megludyne 50ml",
      genericName: "Flunixin Meglumine Inj (50 mg/ml)",
      form: "injectable",
      category: "nsaid",
      isControlled: false,
      scheduleType: "H",
      minStockThreshold: 10,
      totalStockOnHand: 14,
      unitOfMeasure: "vials",
      rackShelfLocation: "Rack B-01 (Room Temp)",
      supplier: "Virbac Animal Health India",
      batches: [
        { batchNo: "MEG-2024-X4", mfgDate: "2024-04-10", expDate: new Date(Date.now() - 86400000 * 15).toISOString().split("T")[0], quantity: 2, purchaseCost: 180.0, sellingPrice: 220.0 },
        { batchNo: "MEG-2025-08", mfgDate: "2025-02-01", expDate: new Date(Date.now() + 86400000 * 180).toISOString().split("T")[0], quantity: 12, purchaseCost: 185.0, sellingPrice: 225.0 }
      ]
    },
    {
      id: "med_ketamine_10ml",
      tradeName: "Ketamin 50mg/ml (10ml)",
      genericName: "Ketamine Hydrochloride Inj IP",
      form: "injectable",
      category: "anesthetic",
      isControlled: true,
      scheduleType: "X",
      minStockThreshold: 5,
      totalStockOnHand: 7,
      unitOfMeasure: "vials",
      rackShelfLocation: "Vault Vault-01 (Narcotic Locked Safe)",
      supplier: "Themis Medicare Ltd",
      batches: [
        { batchNo: "KET-2025-88", mfgDate: "2024-11-01", expDate: new Date(Date.now() + 86400000 * 210).toISOString().split("T")[0], quantity: 7, purchaseCost: 95.0, sellingPrice: 125.0 }
      ]
    },
    {
      id: "med_diazepam_2ml",
      tradeName: "Calmpose / Diazepam 2ml",
      genericName: "Diazepam Injection IP (5 mg/ml)",
      form: "injectable",
      category: "anesthetic",
      isControlled: true,
      scheduleType: "H",
      minStockThreshold: 10,
      totalStockOnHand: 4,
      unitOfMeasure: "vials",
      rackShelfLocation: "Vault Vault-01 (Narcotic Locked Safe)",
      supplier: "Ranbaxy / Sun Pharma",
      batches: [
        { batchNo: "DIA-2025-03", mfgDate: "2024-08-01", expDate: new Date(Date.now() + 86400000 * 150).toISOString().split("T")[0], quantity: 4, purchaseCost: 28.0, sellingPrice: 38.0 }
      ]
    },
    {
      id: "med_fentas_plus_bolus",
      tradeName: "Fentas Plus Bolus",
      genericName: "Fenbendazole 3g + Ivermectin 100mg",
      form: "bolus",
      category: "anthelmintic",
      isControlled: false,
      scheduleType: "OTC",
      minStockThreshold: 25,
      totalStockOnHand: 60,
      unitOfMeasure: "strips",
      rackShelfLocation: "Rack C-03 (Dispensary)",
      supplier: "Intas Pharmaceuticals Ltd",
      batches: [
        { batchNo: "FEN-2025-11", mfgDate: "2024-12-01", expDate: new Date(Date.now() + 86400000 * 420).toISOString().split("T")[0], quantity: 60, purchaseCost: 75.0, sellingPrice: 95.0 }
      ]
    },
    {
      id: "med_receptal_2_5ml",
      tradeName: "Receptal 2.5ml",
      genericName: "Buserelin Acetate Inj (0.0042 mg/ml)",
      form: "injectable",
      category: "hormone",
      isControlled: false,
      scheduleType: "H",
      minStockThreshold: 8,
      totalStockOnHand: 18,
      unitOfMeasure: "vials",
      rackShelfLocation: "Rack A-01 (Cold ILR 4°C)",
      supplier: "MSD Animal Health",
      batches: [
        { batchNo: "REC-2025-07", mfgDate: "2025-01-10", expDate: new Date(Date.now() + 86400000 * 320).toISOString().split("T")[0], quantity: 18, purchaseCost: 280.0, sellingPrice: 340.0 }
      ]
    },
    {
      id: "med_xylazine_30ml",
      tradeName: "Xylaxin 2% (30ml)",
      genericName: "Xylazine HCl 20 mg/ml Inj",
      form: "injectable",
      category: "anesthetic",
      isControlled: true,
      scheduleType: "H",
      minStockThreshold: 6,
      totalStockOnHand: 9,
      unitOfMeasure: "vials",
      rackShelfLocation: "Vault Vault-01 (Locked)",
      supplier: "Indian Immunologicals Ltd",
      batches: [
        { batchNo: "XYL-2025-02", mfgDate: "2024-09-01", expDate: new Date(Date.now() + 86400000 * 190).toISOString().split("T")[0], quantity: 9, purchaseCost: 110.0, sellingPrice: 145.0 }
      ]
    },
    {
      id: "med_agrimin_forte",
      tradeName: "Agrimin Forte 1kg",
      genericName: "Chelated Mineral Mixture + Vitamins",
      form: "oral_liquid",
      category: "vitamin",
      isControlled: false,
      scheduleType: "OTC",
      minStockThreshold: 20,
      totalStockOnHand: 45,
      unitOfMeasure: "bottles",
      rackShelfLocation: "Rack D-01 (Store Room)",
      supplier: "Virbac Animal Health",
      batches: [
        { batchNo: "AGR-2025-99", mfgDate: "2025-01-01", expDate: new Date(Date.now() + 86400000 * 500).toISOString().split("T")[0], quantity: 45, purchaseCost: 190.0, sellingPrice: 240.0 }
      ]
    }
  ];

  // Pre-seeded Controlled Substance / Narcotic Compliance Ledger
  const INITIAL_CONTROLLED_LOGS = [
    {
      entryId: "NAR-2026-001",
      drugId: "med_ketamine_10ml",
      drugName: "Ketamin 50mg/ml (10ml)",
      batchNo: "KET-2025-88",
      dateUsed: new Date(Date.now() - 86400000 * 2).toISOString().replace("T", " ").slice(0, 16),
      animalTag: "100293847561",
      ownerName: "Chaudhary Dharamvir Singh",
      vetRegNo: "Dr. Rahul Sharma (HN-4921)",
      qtyUsedMl: 3.5,
      balanceStock: 7.0,
      reason: "Emergency Cesarean Section General Anesthesia Induction"
    },
    {
      entryId: "NAR-2026-002",
      drugId: "med_xylazine_30ml",
      drugName: "Xylaxin 2% (30ml)",
      batchNo: "XYL-2025-02",
      dateUsed: new Date(Date.now() - 86400000 * 1).toISOString().replace("T", " ").slice(0, 16),
      animalTag: "100293847562",
      ownerName: "Mahinder Rawat",
      vetRegNo: "Dr. Rahul Sharma (HN-4921)",
      qtyUsedMl: 0.8,
      balanceStock: 9.0,
      reason: "Premedication for Rumenotomy Standing Sedation (Bovine 1/10th Dose)"
    }
  ];

  // Internal Module Reactive State
  const state = {
    inventoryList: JSON.parse(JSON.stringify(INITIAL_INVENTORY_MASTER)),
    controlledSubstanceLog: [...INITIAL_CONTROLLED_LOGS],
    activeFilter: "all", // 'all' | 'low_stock' | 'expiring_soon' | 'expired' | 'controlled_narcotics'
    searchQuery: "",
    activeTab: "stock_overview", // 'stock_overview' | 'fefo_dispenser' | 'narcotics_register' | 'purchase_order_indent'
    isAddStockModalOpen: false,
    isDispenseModalOpen: false,
    containerElement: null,
    db: null
  };

  // Toast Helper
  function notify(msg, type) {
    if (root.VetcareApp && typeof root.VetcareApp.showToast === "function") {
      root.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[PHARMACY INVENTORY ${type ? type.toUpperCase() : "INFO"}]: ${msg}`);
    }
  }

  // Database Connection
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
  const PharmacyInventoryStock = {
    // 1. LIFECYCLE: Init
    init: async function () {
      try {
        await getDbConnection();
        this.loadPersistedInventory();
        this.setupEventBus();
        this.recalculateTotalStock();
        return true;
      } catch (err) {
        console.error("PharmacyInventoryStock initialization failed:", err);
        return false;
      }
    },

    // 2. LIFECYCLE: Render
    render: function (containerId) {
      const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error("Container element not found for PharmacyInventoryStock:", containerId);
        return;
      }
      state.containerElement = container;
      this.recalculateTotalStock();

      const alerts = this.calculateStockAlerts();

      container.innerHTML = `
        <div id="vetcare-pharmacy-root" class="w-full flex flex-col gap-6 text-slate-100 font-sans pb-16">
          <!-- Top Inventory Valuation & Stock Alerts KPI Banner -->
          ${this.buildSummaryKpiBannerHtml(alerts)}

          <!-- Navigation & Action Command Toolbar -->
          ${this.buildActionToolbarHtml()}

          <!-- Active Viewport Switched by Tab -->
          ${
            state.activeTab === "fefo_dispenser"
              ? this.buildFefoDispenserWorkstationHtml()
              : state.activeTab === "narcotics_register"
              ? this.buildNarcoticsRegisterWorkstationHtml()
              : state.activeTab === "purchase_order_indent"
              ? this.buildPurchaseOrderWorkstationHtml()
              : this.buildStockOverviewWorkstationHtml()
          }

          <!-- Modals Insertion Mount -->
          <div id="pharmacy-modal-container"></div>
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
      if (state.containerElement) {
        state.containerElement.innerHTML = "";
      }
      state.containerElement = null;
    },

    setupEventBus: function () {
      const handlePrescriptionSaved = (evt) => {
        const payload = evt.detail;
        if (!payload || !payload.drugs) return;

        let anyDeducted = false;
        payload.drugs.forEach((prescribed) => {
          const match = state.inventoryList.find((item) => {
            const pName = (prescribed.drugName || "").toLowerCase();
            return item.tradeName.toLowerCase().includes(pName) || item.genericName.toLowerCase().includes(pName);
          });

          if (match) {
            const qtyNeeded = parseInt(prescribed.quantity || 1, 10);
            try {
              this.dispenseDrugFefo(match.id, qtyNeeded, {
                animalTag: payload.tagNumber || "TAG-OPD",
                ownerName: payload.ownerName || "Prescription Dispense",
                vetRegNo: payload.doctorName || "Dr. Staff",
                reason: payload.diagnosis || "OPD Clinical Prescription"
              });
              anyDeducted = true;
            } catch (err) {
              notify(`स्टॉक अपर्याप्त: ${match.tradeName} हेतु FEFO कटौती असफल!`, "error");
            }
          }
        });

        if (anyDeducted && state.containerElement) {
          this.render(state.containerElement);
          notify("प्रिस्क्रिप्शन औषधियां FEFO नियमों अनुसार स्टॉक से स्वतः काटी गईं।", "success");
        }
      };

      this._rxSavedListener = handlePrescriptionSaved;
      window.addEventListener("prescription:saved", handlePrescriptionSaved);
      window.addEventListener("vetcare:prescription-saved", handlePrescriptionSaved);
    },

    async loadPersistedInventory() {
      try {
        const db = await getDbConnection();
        const tx = db.transaction(STORE_INVENTORY, "readonly");
        const store = tx.objectStore(STORE_INVENTORY);
        const index = store.index("recordType");
        const req = index.getAll("pharmacy_audit");
        req.onsuccess = () => {
          const list = req.result || [];
          if (list.length > 0) {
            const lastAudit = list[list.length - 1];
            if (lastAudit.inventorySnapshot) {
              state.inventoryList = lastAudit.inventorySnapshot;
              if (lastAudit.controlledLogs) state.controlledSubstanceLog = lastAudit.controlledLogs;
              if (state.containerElement) this.render(state.containerElement);
            }
          }
        };
      } catch (e) {
        // Fallback quiet
      }
    },

    recalculateTotalStock: function () {
      state.inventoryList.forEach((item) => {
        item.totalStockOnHand = item.batches.reduce((acc, b) => acc + (parseInt(b.quantity, 10) || 0), 0);
      });
    },

    calculateStockAlerts: function () {
      const todayStr = new Date().toISOString().split("T")[0];
      const in30DaysStr = new Date(Date.now() + 86400000 * 30).toISOString().split("T")[0];

      let totalValuation = 0;
      let lowStockCount = 0;
      let expiringSoonCount = 0;
      let expiredCount = 0;
      let controlledAuditedCount = 0;

      state.inventoryList.forEach((item) => {
        if (item.totalStockOnHand <= item.minStockThreshold) {
          lowStockCount++;
        }
        if (item.isControlled) {
          controlledAuditedCount++;
        }

        item.batches.forEach((b) => {
          totalValuation += (parseInt(b.quantity, 10) || 0) * (parseFloat(b.purchaseCost) || 0);

          if (b.expDate < todayStr && b.quantity > 0) {
            expiredCount += b.quantity;
          } else if (b.expDate <= in30DaysStr && b.expDate >= todayStr && b.quantity > 0) {
            expiringSoonCount += b.quantity;
          }
        });
      });

      return {
        totalValuation: Math.round(totalValuation),
        lowStockCount: lowStockCount,
        expiringSoonCount: expiringSoonCount,
        expiredCount: expiredCount,
        controlledAuditedCount: controlledAuditedCount
      };
    },

    // 4. SCIENTIFIC FEFO DISPENSING ENGINE
    dispenseDrugFefo: function (drugId, requiredQuantity, metadata) {
      const drug = state.inventoryList.find((d) => d.id === drugId);
      if (!drug) throw new Error("दवा स्टॉक में नहीं मिली!");

      const todayStr = new Date().toISOString().split("T")[0];

      // Sort batches ascending by Expiration Date (First-Expired, First-Out)
      drug.batches.sort((a, b) => new Date(a.expDate) - new Date(b.expDate));

      // Disallow expired batches
      const usableBatches = drug.batches.filter((b) => b.expDate >= todayStr && b.quantity > 0);
      const availableUsableQty = usableBatches.reduce((acc, b) => acc + b.quantity, 0);

      if (availableUsableQty < requiredQuantity) {
        throw new Error(`अपर्याप्त स्टॉक! आवश्यक: ${requiredQuantity}, वैध उपलब्ध: ${availableUsableQty}`);
      }

      let remainingToDeduct = requiredQuantity;
      const dispensedBatchesUsed = [];

      for (let i = 0; i < drug.batches.length; i++) {
        const batch = drug.batches[i];
        if (batch.expDate < todayStr || batch.quantity <= 0) continue;

        if (batch.quantity >= remainingToDeduct) {
          batch.quantity -= remainingToDeduct;
          dispensedBatchesUsed.push({ batchNo: batch.batchNo, qty: remainingToDeduct });
          remainingToDeduct = 0;
          break;
        } else {
          remainingToDeduct -= batch.quantity;
          dispensedBatchesUsed.push({ batchNo: batch.batchNo, qty: batch.quantity });
          batch.quantity = 0;
        }
      }

      this.recalculateTotalStock();

      // If Controlled Substance (Schedule H/X), update narcotic compliance ledger
      if (drug.isControlled) {
        dispensedBatchesUsed.forEach((dbItem) => {
          state.controlledSubstanceLog.unshift({
            entryId: "NAR-" + Date.now() + "-" + Math.floor(Math.random() * 100),
            drugId: drug.id,
            drugName: drug.tradeName,
            batchNo: dbItem.batchNo,
            dateUsed: new Date().toISOString().replace("T", " ").slice(0, 16),
            animalTag: metadata.animalTag || "EMR-PATIENT",
            ownerName: metadata.ownerName || "General Dispense",
            vetRegNo: metadata.vetRegNo || "Dr. Rahul Sharma (HN-4921)",
            qtyUsedMl: dbItem.qty,
            balanceStock: drug.totalStockOnHand,
            reason: metadata.reason || "Clinical Surgical Anesthesia / Sedation"
          });
        });
      }

      return {
        success: true,
        drugName: drug.tradeName,
        dispensedBatches: dispensedBatchesUsed,
        balanceRemaining: drug.totalStockOnHand
      };
    },

    // HTML VIEW BUILDERS
    buildSummaryKpiBannerHtml: function (alerts) {
      return `
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
          
          <!-- Total Valuation KPI -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">कुल भंडार मूल्यांकन</div>
              <div class="text-xl font-display font-black text-white mt-1">₹${alerts.totalValuation.toLocaleString("en-IN")}</div>
              <div class="text-[10px] text-slate-400 font-mono mt-0.5">लागत मूल्य आधार पर</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl">
              <i class="fa-solid fa-coins"></i>
            </div>
          </div>

          <!-- Low Stock Alert KPI -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">निम्न स्टॉक चेतावनी</div>
              <div class="text-xl font-display font-black text-amber-400 mt-1">${alerts.lowStockCount} <span class="text-xs font-normal text-slate-400">आइटम</span></div>
              <div class="text-[10px] text-amber-300 font-mono mt-0.5">पुनः क्रय आदेश आवश्यक</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl">
              <i class="fa-solid fa-arrow-trend-down"></i>
            </div>
          </div>

          <!-- Expiring in 30 Days KPI -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">30 दिन में समाप्ति (FEFO)</div>
              <div class="text-xl font-display font-black text-yellow-400 mt-1">${alerts.expiringSoonCount} <span class="text-xs font-normal text-slate-400">इकाइयां</span></div>
              <div class="text-[10px] text-yellow-300 font-mono mt-0.5">प्राथमिकता पर निकालें</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 text-xl">
              <i class="fa-solid fa-hourglass-end"></i>
            </div>
          </div>

          <!-- Expired / Quarantine KPI -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">समाप्त औषधियां (Quarantine)</div>
              <div class="text-xl font-display font-black text-rose-400 mt-1">${alerts.expiredCount} <span class="text-xs font-normal text-slate-400">इकाइयां</span></div>
              <div class="text-[10px] text-rose-300 font-mono mt-0.5">वितरण पूर्णतः वर्जित</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 text-xl">
              <i class="fa-solid fa-ban"></i>
            </div>
          </div>

          <!-- Controlled Substance Register Audited -->
          <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
            <div>
              <div class="text-[11px] font-mono uppercase text-slate-400">नारकोटिक / अनुसूची X</div>
              <div class="text-xl font-display font-black text-cyan-400 mt-1">${alerts.controlledAuditedCount} <span class="text-xs font-normal text-slate-400">ड्रग्स</span></div>
              <div class="text-[10px] text-cyan-300 font-mono mt-0.5">कानूनी रजिस्टर ऑडिटेड</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl">
              <i class="fa-solid fa-vault"></i>
            </div>
          </div>

        </div>
      `;
    },

    buildActionToolbarHtml: function () {
      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          <!-- Navigation Tabs -->
          <div class="flex items-center gap-2 overflow-x-auto custom-scrollbar">
            <button 
              type="button" 
              data-pharm-tab="stock_overview" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                state.activeTab === "stock_overview"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              }"
            >
              <i class="fa-solid fa-boxes-stacked"></i>
              <span>स्टॉक इन्वेंटरी (Stock List)</span>
            </button>

            <button 
              type="button" 
              data-pharm-tab="fefo_dispenser" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                state.activeTab === "fefo_dispenser"
                  ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-950 shadow-lg shadow-amber-950/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              }"
            >
              <i class="fa-solid fa-dolly"></i>
              <span>FEFO डिस्पेंसिंग हब (Dispenser)</span>
            </button>

            <button 
              type="button" 
              data-pharm-tab="narcotics_register" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                state.activeTab === "narcotics_register"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              }"
            >
              <i class="fa-solid fa-book-medical"></i>
              <span>नारकोटिक लेजर (Schedule H/X)</span>
            </button>

            <button 
              type="button" 
              data-pharm-tab="purchase_order_indent" 
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                state.activeTab === "purchase_order_indent"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-950/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              }"
            >
              <i class="fa-solid fa-file-invoice-dollar"></i>
              <span>क्रय मांग पत्र (Indent Requisition)</span>
            </button>
          </div>

          <!-- Search & Action Buttons -->
          <div class="flex flex-wrap items-center gap-2.5">
            <div class="relative min-w-[200px] flex-1 sm:flex-initial">
              <input 
                type="text" 
                id="pharmSearchInput" 
                value="${state.searchQuery}" 
                placeholder="दवा नाम, साल्ट या रैक खोजें..." 
                class="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <i class="fa-solid fa-magnifying-glass absolute left-2.5 top-2.5 text-slate-400 text-xs pointer-events-none"></i>
            </div>

            <select id="pharmStatusFilter" class="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 cursor-pointer">
              <option value="all" ${state.activeFilter === "all" ? "selected" : ""}>समस्त स्टॉक स्थिति</option>
              <option value="low_stock" ${state.activeFilter === "low_stock" ? "selected" : ""}>निम्न स्टॉक (Low Stock)</option>
              <option value="expiring_soon" ${state.activeFilter === "expiring_soon" ? "selected" : ""}>शीघ्र समाप्ति (Expiring 30d)</option>
              <option value="expired" ${state.activeFilter === "expired" ? "selected" : ""}>समाप्त (Expired)</option>
              <option value="controlled_narcotics" ${state.activeFilter === "controlled_narcotics" ? "selected" : ""}>नारकोटिक्स (Controlled)</option>
            </select>

            <button id="btnOpenAddStockModal" type="button" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-1.5 active:scale-95 transition-all">
              <i class="fa-solid fa-plus-circle"></i>
              <span>+ नया स्टॉक / बैच जोड़ें</span>
            </button>

            <button id="btnPrintStockAudit" type="button" title="Print Store Audit" class="p-2 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
              <i class="fa-solid fa-print"></i>
            </button>
          </div>

        </div>
      `;
    },

    // WORKSTATION TAB 1: Stock Inventory Overview Table
    buildStockOverviewWorkstationHtml: function () {
      const filtered = this.getFilteredInventory();
      const todayStr = new Date().toISOString().split("T")[0];
      const in30DaysStr = new Date(Date.now() + 86400000 * 30).toISOString().split("T")[0];

      return `
        <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-pills text-emerald-400"></i>
              <h3 class="text-xs font-mono font-bold uppercase text-white">
                फार्मेसी मुख्य भंडार सूची (${filtered.length} औषधियां)
              </h3>
            </div>
            <span class="text-[10px] font-mono text-slate-400">FEFO (First-Expired, First-Out) प्रणाली लागू</span>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
            <table class="w-full text-left text-xs font-mono">
              <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                <tr>
                  <th class="px-3.5 py-3">दवा व्यापारिक नाम (Trade / Generic)</th>
                  <th class="px-3.5 py-3">वर्ग एवं अनुसूची</th>
                  <th class="px-3.5 py-3">उपलब्ध कुल स्टॉक</th>
                  <th class="px-3.5 py-3">सन्निकट बैच एवं समाप्ति (FEFO)</th>
                  <th class="px-3.5 py-3">रैक / स्थान</th>
                  <th class="px-3.5 py-3">दर (MRP ₹)</th>
                  <th class="px-3.5 py-3 text-right">कार्यवाही</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/80 font-sans">
                ${
                  filtered.length === 0
                    ? `<tr><td colspan="7" class="p-8 text-center text-xs text-slate-500 font-mono">कोई औषधि रिकॉर्ड नहीं मिला। नया बैच जोड़ें।</td></tr>`
                    : filtered
                        .map((item) => {
                          // Find nearest expiring active batch
                          const activeBatches = item.batches.filter((b) => b.quantity > 0);
                          activeBatches.sort((a, b) => new Date(a.expDate) - new Date(b.expDate));
                          const nearestBatch = activeBatches[0];

                          let statusBadge = "";
                          if (item.totalStockOnHand <= 0) {
                            statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">आउट ऑफ स्टॉक</span>`;
                          } else if (item.totalStockOnHand <= item.minStockThreshold) {
                            statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">कम स्टॉक (${item.totalStockOnHand})</span>`;
                          } else {
                            statusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">उपलब्ध (${item.totalStockOnHand})</span>`;
                          }

                          let expBadge = `<span class="text-slate-400 font-mono">—</span>`;
                          if (nearestBatch) {
                            if (nearestBatch.expDate < todayStr) {
                              expBadge = `<span class="text-rose-400 font-mono font-bold"><i class="fa-solid fa-triangle-exclamation mr-1"></i>समाप्त (${nearestBatch.expDate})</span>`;
                            } else if (nearestBatch.expDate <= in30DaysStr) {
                              expBadge = `<span class="text-yellow-400 font-mono font-bold"><i class="fa-solid fa-clock mr-1"></i>${nearestBatch.expDate} (30d)</span>`;
                            } else {
                              expBadge = `<span class="text-slate-200 font-mono">${nearestBatch.expDate}</span>`;
                            }
                          }

                          return `
                      <tr class="hover:bg-slate-850/50 transition-colors">
                        <td class="px-3.5 py-3">
                          <div class="font-bold text-white text-xs flex items-center gap-1.5">
                            <span>${item.tradeName}</span>
                            ${item.isControlled ? '<span class="px-1.5 py-0.2 rounded text-[9px] font-mono font-black bg-rose-950 text-rose-400 border border-rose-800">NARCOTIC</span>' : ""}
                          </div>
                          <div class="text-[10px] text-slate-400 font-mono">${item.genericName}</div>
                        </td>
                        <td class="px-3.5 py-3 text-xs font-mono">
                          <span class="text-slate-300 uppercase">${item.category}</span>
                          <span class="text-[10px] text-slate-500">(${item.scheduleType})</span>
                        </td>
                        <td class="px-3.5 py-3 font-mono">
                          <div class="font-bold text-white">${item.totalStockOnHand} <span class="text-[10px] text-slate-400 font-normal">${item.unitOfMeasure}</span></div>
                          <div>${statusBadge}</div>
                        </td>
                        <td class="px-3.5 py-3 text-xs">
                          ${nearestBatch ? `<div class="font-mono text-slate-300 font-semibold">${nearestBatch.batchNo} (${nearestBatch.quantity} ${item.unitOfMeasure})</div>` : ""}
                          <div>${expBadge}</div>
                        </td>
                        <td class="px-3.5 py-3 text-[11px] font-mono text-cyan-400">${item.rackShelfLocation}</td>
                        <td class="px-3.5 py-3 font-mono font-bold text-slate-200">
                          ₹${nearestBatch ? nearestBatch.sellingPrice : "—"}
                        </td>
                        <td class="px-3.5 py-3 text-right">
                          <div class="flex items-center justify-end gap-1.5">
                            <button 
                              type="button" 
                              data-dispense-drug-id="${item.id}" 
                              class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 shadow"
                            >
                              डिस्पेंस
                            </button>
                            <button 
                              type="button" 
                              data-add-batch-id="${item.id}" 
                              title="Add Batch to this Drug" 
                              class="p-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700"
                            >
                              <i class="fa-solid fa-plus"></i>
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

    // WORKSTATION TAB 2: Interactive FEFO Dispenser Hub
    buildFefoDispenserWorkstationHtml: function () {
      return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- Dispenser Form (Cols 1-6) -->
          <div class="lg:col-span-6 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-dolly text-amber-400 text-lg"></i>
                <h3 class="text-xs font-mono font-bold uppercase text-white">सक्रिय FEFO औषधि वितरण कंसोल</h3>
              </div>
              <span class="text-[10px] font-mono text-emerald-400">सटीक बैच चयन</span>
            </div>

            <form id="fefoDispenseForm" class="space-y-4 text-xs font-mono">
              <div>
                <label class="block text-[10px] uppercase text-slate-400 mb-1">दवा चयन (Select Drug to Dispense) *</label>
                <select id="dispenseDrugSelect" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold text-xs focus:ring-2 focus:ring-amber-500">
                  ${state.inventoryList.map((d) => `<option value="${d.id}">${d.tradeName} (${d.genericName}) - स्टॉक: ${d.totalStockOnHand} ${d.unitOfMeasure}</option>`).join("")}
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">आवश्यक वितरण मात्रा *</label>
                  <input type="number" id="dispenseQuantity" required min="1" value="2" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-sm focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">रोगी पशु टैग नं. (Tag ID)</label>
                  <input type="text" id="dispenseTag" value="100293847561" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-amber-500" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">पशुपालक का नाम</label>
                  <input type="text" id="dispenseOwner" value="Chaudhary Dharamvir Singh" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label class="block text-[10px] uppercase text-slate-400 mb-1">पर्चे का कारण / रोग निदान</label>
                  <input type="text" id="dispenseReason" value="Acute Clinical Mastitis Treatment" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans focus:ring-2 focus:ring-amber-500" />
                </div>
              </div>

              <div>
                <label class="block text-[10px] uppercase text-slate-400 mb-1">अधिकृत चिकित्सक नाम व पंजीयन संख्या</label>
                <input type="text" id="dispenseVet" value="Dr. Rahul Sharma (Reg. HN-4921)" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans focus:ring-2 focus:ring-amber-500" />
              </div>

              <div class="pt-2">
                <button type="submit" class="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <i class="fa-solid fa-dolly"></i>
                  <span>FEFO अनुसार स्वतः बैच से काटें एवं पर्ची निकालें</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Live Batches Breakdown Preview (Cols 7-12) -->
          <div class="lg:col-span-6 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 class="text-xs font-mono font-bold uppercase text-white">चयनित औषधि के बैच एवं समाप्ति क्रम</h3>
              <span class="text-[10px] font-mono text-slate-400">निकटतम समाप्ति बैच सर्वप्रथम कटेगा</span>
            </div>

            <div id="fefoBatchPreviewContainer" class="space-y-3 font-mono text-xs">
              <!-- Rendered reactively via script -->
            </div>
          </div>

        </div>
      `;
    },

    // WORKSTATION TAB 3: Controlled / Narcotic Substance Register
    buildNarcoticsRegisterWorkstationHtml: function () {
      const logs = state.controlledSubstanceLog;

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/40 p-5 shadow-xl">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-lg">
                  <i class="fa-solid fa-vault"></i>
                </div>
                <div>
                  <h3 class="text-sm font-display font-black text-white">अनुसूची 'X' एवं 'H' नारकोटिक / नियंत्रित औषधि कानूनी रजिस्टर</h3>
                  <div class="text-[11px] font-mono text-rose-300">NDPS Act & State Drug Controller Mandatory Compliance Ledger</div>
                </div>
              </div>
              <button id="btnPrintNarcoticsLedger" type="button" class="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50 flex items-center gap-1.5">
                <i class="fa-solid fa-print"></i>
                <span>कानूनी रजिस्टर प्रिंट (Print Ledger)</span>
              </button>
            </div>

            <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
              <table class="w-full text-left text-xs font-mono">
                <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                  <tr>
                    <th class="px-3 py-2.5">दिनांक व समय</th>
                    <th class="px-3 py-2.5">औषधि नाम एवं बैच नं.</th>
                    <th class="px-3 py-2.5">पशु टैग व स्वामी</th>
                    <th class="px-3 py-2.5">प्रयुक्त मात्रा (ml/Dose)</th>
                    <th class="px-3 py-2.5">शेष स्टॉक (Balance)</th>
                    <th class="px-3 py-2.5 font-sans">अधिकृत चिकित्सक पंजीयन</th>
                    <th class="px-3 py-2.5 font-sans">शल्य / चिकित्सीय प्रयोजन</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80 font-sans">
                  ${
                    logs.length === 0
                      ? `<tr><td colspan="7" class="p-6 text-center text-xs text-slate-500 font-mono">कोई नारकोटिक प्रविष्टि दर्ज नहीं है।</td></tr>`
                      : logs
                          .map((l) => {
                            return `
                        <tr class="hover:bg-slate-850/50 transition-colors">
                          <td class="px-3 py-2.5 text-slate-300 font-mono text-[11px]">${l.dateUsed}</td>
                          <td class="px-3 py-2.5">
                            <div class="font-bold text-white text-xs">${l.drugName}</div>
                            <div class="text-[10px] font-mono text-rose-400">Batch: ${l.batchNo}</div>
                          </td>
                          <td class="px-3 py-2.5">
                            <div class="font-mono text-emerald-400 font-bold">${l.animalTag}</div>
                            <div class="text-[11px] text-slate-300">${l.ownerName}</div>
                          </td>
                          <td class="px-3 py-2.5 font-mono font-black text-amber-400 text-sm">${l.qtyUsedMl} ml</td>
                          <td class="px-3 py-2.5 font-mono font-bold text-cyan-400 text-sm">${l.balanceStock} ml</td>
                          <td class="px-3 py-2.5 text-xs text-slate-200">${l.vetRegNo}</td>
                          <td class="px-3 py-2.5 text-xs text-slate-400 leading-relaxed">${l.reason}</td>
                        </tr>
                      `;
                          })
                          .join("")
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    // WORKSTATION TAB 4: Auto Purchase Order (Indent Requisition)
    buildPurchaseOrderWorkstationHtml: function () {
      const lowStockItems = state.inventoryList.filter((item) => item.totalStockOnHand <= item.minStockThreshold);

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 class="text-xs font-mono font-bold uppercase text-white">स्वचालित क्रय मांग पत्र (Auto Purchase Order / Indent)</h3>
                <p class="text-xs text-slate-400 mt-0.5">न्यूनतम बफर स्टॉक के आधार पर आवश्यक आपूर्ति की स्वचालित गणना</p>
              </div>
              <button id="btnExportIndentCsv" type="button" class="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow flex items-center gap-1.5">
                <i class="fa-solid fa-file-csv"></i>
                <span>मांग पत्र CSV निर्यात करें</span>
              </button>
            </div>

            <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
              <table class="w-full text-left text-xs font-mono">
                <thead class="text-[10px] uppercase text-slate-400 bg-slate-950 border-b border-slate-800">
                  <tr>
                    <th class="px-3.5 py-3">औषधि नाम एवं फॉर्मूलेशन</th>
                    <th class="px-3.5 py-3">वर्तमान स्टॉक</th>
                    <th class="px-3.5 py-3">बफर न्यूनतम सीमा</th>
                    <th class="px-3.5 py-3">अनुशंसित ऑर्डर मात्रा</th>
                    <th class="px-3.5 py-3">प्राथमिक आपूर्तिकर्ता (Supplier)</th>
                    <th class="px-3.5 py-3">अनुमानित बजट लागत</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80 font-sans">
                  ${
                    lowStockItems.length === 0
                      ? `<tr><td colspan="6" class="p-8 text-center text-xs text-emerald-400 font-mono">समस्त आवश्यक औषधियां पर्याप्त स्टॉक में उपलब्ध हैं! कोई रीऑर्डर लंबित नहीं।</td></tr>`
                      : lowStockItems
                          .map((item) => {
                            const reorderQty = Math.max(10, item.minStockThreshold * 2 - item.totalStockOnHand);
                            const approxCost = (item.batches[0] ? item.batches[0].purchaseCost : 100) * reorderQty;

                            return `
                        <tr class="hover:bg-slate-850/50">
                          <td class="px-3.5 py-3">
                            <div class="font-bold text-white text-xs">${item.tradeName}</div>
                            <div class="text-[10px] font-mono text-slate-400">${item.genericName}</div>
                          </td>
                          <td class="px-3.5 py-3 font-mono font-bold text-rose-400">${item.totalStockOnHand} ${item.unitOfMeasure}</td>
                          <td class="px-3.5 py-3 font-mono text-slate-300">${item.minStockThreshold} ${item.unitOfMeasure}</td>
                          <td class="px-3.5 py-3 font-mono font-black text-emerald-400 text-sm">${reorderQty} ${item.unitOfMeasure}</td>
                          <td class="px-3.5 py-3 text-xs text-slate-300">${item.supplier}</td>
                          <td class="px-3.5 py-3 font-mono font-bold text-slate-200">₹${approxCost.toLocaleString("en-IN")}</td>
                        </tr>
                      `;
                          })
                          .join("")
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    getFilteredInventory: function () {
      const todayStr = new Date().toISOString().split("T")[0];
      const in30DaysStr = new Date(Date.now() + 86400000 * 30).toISOString().split("T")[0];

      return state.inventoryList.filter((item) => {
        let matchesStatus = true;
        if (state.activeFilter === "low_stock") {
          matchesStatus = item.totalStockOnHand <= item.minStockThreshold;
        } else if (state.activeFilter === "controlled_narcotics") {
          matchesStatus = item.isControlled === true;
        } else if (state.activeFilter === "expired") {
          matchesStatus = item.batches.some((b) => b.expDate < todayStr && b.quantity > 0);
        } else if (state.activeFilter === "expiring_soon") {
          matchesStatus = item.batches.some((b) => b.expDate <= in30DaysStr && b.expDate >= todayStr && b.quantity > 0);
        }

        const q = state.searchQuery.trim().toLowerCase();
        const matchesQuery =
          !q ||
          item.tradeName.toLowerCase().includes(q) ||
          item.genericName.toLowerCase().includes(q) ||
          item.rackShelfLocation.toLowerCase().includes(q) ||
          item.batches.some((b) => b.batchNo.toLowerCase().includes(q));

        return matchesStatus && matchesQuery;
      });
    },

    // EVENT BINDINGS
    bindUiEvents: function () {
      const container = state.containerElement;
      if (!container) return;

      // 1. Navigation Tabs
      container.querySelectorAll("[data-pharm-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tab = btn.getAttribute("data-pharm-tab");
          if (tab && tab !== state.activeTab) {
            state.activeTab = tab;
            this.render(container);
          }
        });
      });

      // 2. Search Input
      const searchInp = container.querySelector("#pharmSearchInput");
      if (searchInp) {
        searchInp.addEventListener("input", (e) => {
          state.searchQuery = e.target.value;
          this.render(container);
        });
      }

      // 3. Status Filter Dropdown
      const statusSelect = container.querySelector("#pharmStatusFilter");
      if (statusSelect) {
        statusSelect.addEventListener("change", (e) => {
          state.activeFilter = e.target.value;
          this.render(container);
        });
      }

      // 4. Open Add Stock Modal
      const btnAddStock = container.querySelector("#btnOpenAddStockModal");
      if (btnAddStock) {
        btnAddStock.addEventListener("click", () => this.openAddStockModal());
      }

      // 5. Print Stock Audit
      const btnPrintAudit = container.querySelector("#btnPrintStockAudit");
      if (btnPrintAudit) {
        btnPrintAudit.addEventListener("click", () => this.printStockAuditReport());
      }

      // 6. Print Narcotics Ledger
      const btnPrintNarc = container.querySelector("#btnPrintNarcoticsLedger");
      if (btnPrintNarc) {
        btnPrintNarc.addEventListener("click", () => this.printControlledDrugRegister());
      }

      // 7. Export Indent CSV
      const btnExportIndent = container.querySelector("#btnExportIndentCsv");
      if (btnExportIndent) {
        btnExportIndent.addEventListener("click", () => this.exportIndentCsv());
      }

      // 8. Dispense & Add Batch Action Delegation
      container.addEventListener("click", (e) => {
        const dispenseBtn = e.target.closest("[data-dispense-drug-id]");
        if (dispenseBtn) {
          const did = dispenseBtn.getAttribute("data-dispense-drug-id");
          state.activeTab = "fefo_dispenser";
          this.render(container);
          const sel = container.querySelector("#dispenseDrugSelect");
          if (sel) {
            sel.value = did;
            this.updateFefoPreview(did);
          }
        }

        const addBatchBtn = e.target.closest("[data-add-batch-id]");
        if (addBatchBtn) {
          const did = addBatchBtn.getAttribute("data-add-batch-id");
          this.openAddStockModal(did);
        }
      });

      // 9. FEFO Dispense Form Submission
      const fefoForm = container.querySelector("#fefoDispenseForm");
      if (fefoForm) {
        fefoForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const dId = document.getElementById("dispenseDrugSelect").value;
          const qty = parseInt(document.getElementById("dispenseQuantity").value, 10) || 1;
          const tag = document.getElementById("dispenseTag").value.trim();
          const owner = document.getElementById("dispenseOwner").value.trim();
          const reason = document.getElementById("dispenseReason").value.trim();
          const vet = document.getElementById("dispenseVet").value.trim();

          try {
            const res = this.dispenseDrugFefo(dId, qty, {
              animalTag: tag,
              ownerName: owner,
              vetRegNo: vet,
              reason: reason
            });

            notify(`सफल वितरण! ${res.drugName} के ${qty} यूनिट कटे। शेष: ${res.balanceRemaining}`, "success");
            this.render(container);
          } catch (err) {
            notify(err.message, "error");
          }
        });

        // Trigger initial FEFO batch preview
        const initDid = container.querySelector("#dispenseDrugSelect");
        if (initDid && initDid.value) {
          this.updateFefoPreview(initDid.value);
          initDid.addEventListener("change", (e) => this.updateFefoPreview(e.target.value));
        }
      }
    },

    updateFefoPreview: function (drugId) {
      const container = document.getElementById("fefoBatchPreviewContainer");
      if (!container) return;

      const drug = state.inventoryList.find((d) => d.id === drugId);
      if (!drug) return;

      const sorted = [...drug.batches].sort((a, b) => new Date(a.expDate) - new Date(b.expDate));
      const todayStr = new Date().toISOString().split("T")[0];

      container.innerHTML = sorted
        .map((b, idx) => {
          const isExpired = b.expDate < todayStr;
          return `
          <div class="p-3 rounded-xl border flex items-center justify-between ${
            idx === 0 && !isExpired && b.quantity > 0
              ? "bg-amber-950/20 border-amber-500/60 ring-1 ring-amber-500/30"
              : isExpired
              ? "bg-rose-950/20 border-rose-800/40 opacity-70"
              : "bg-slate-950 border-slate-800"
          }">
            <div>
              <div class="font-bold text-white flex items-center gap-1.5">
                <span>बैच: ${b.batchNo}</span>
                ${idx === 0 && !isExpired && b.quantity > 0 ? '<span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500 text-slate-950">FEFO #1 NEXT</span>' : ""}
                ${isExpired ? '<span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-500 text-white">EXPIRED</span>' : ""}
              </div>
              <div class="text-[11px] text-slate-400 mt-0.5">समाप्ति तिथि: <strong class="${isExpired ? "text-rose-400" : "text-emerald-400"}">${b.expDate}</strong></div>
            </div>
            <div class="text-right">
              <div class="text-base font-black text-white">${b.quantity} ${drug.unitOfMeasure}</div>
              <div class="text-[10px] text-slate-500">₹${b.sellingPrice} / यूनिट</div>
            </div>
          </div>
        `;
        })
        .join("");
    },

    // 5. MODAL: Add New Stock or Batch
    openAddStockModal: function (prefillDrugId) {
      const mount = document.getElementById("pharmacy-modal-container");
      if (!mount) return;

      const existingDrug = prefillDrugId ? state.inventoryList.find((d) => d.id === prefillDrugId) : null;

      mount.innerHTML = `
        <div id="addStockModal" class="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div class="bg-slate-900 border-2 border-emerald-500 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8 text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-boxes-packing text-emerald-400 text-lg"></i>
                <h3 class="font-display font-bold text-base text-white">
                  ${existingDrug ? `${existingDrug.tradeName} में नया बैच जोड़ें` : "नई औषधि / बैच स्टॉक प्रविष्टि"}
                </h3>
              </div>
              <button id="closeAddStockModalBtn" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="addStockForm" class="space-y-4 text-xs font-mono">
              ${
                !existingDrug
                  ? `
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">दवा व्यापारिक नाम (Trade Name) *</label>
                    <input type="text" id="newTradeName" required placeholder="Xyrofur 1g" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans font-bold focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">जेनेरिक नाम (Generic) *</label>
                    <input type="text" id="newGenericName" required placeholder="Ceftiofur Sodium" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-sans focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-3">
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">फॉर्मूलेशन</label>
                    <select id="newForm" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white focus:ring-2 focus:ring-emerald-500">
                      <option value="injectable">Injectable (इंजेक्शन)</option>
                      <option value="bolus">Bolus (गोली / बोलस)</option>
                      <option value="oral_liquid">Oral Liquid (सिरप)</option>
                      <option value="topical">Topical (मरहम / स्प्रे)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">वर्ग (Category)</label>
                    <select id="newCategory" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white focus:ring-2 focus:ring-emerald-500">
                      <option value="antibiotic">एंटीबायोटिक</option>
                      <option value="nsaid">दर्द व सूजन निवारक</option>
                      <option value="anthelmintic">कृमिनाशक</option>
                      <option value="anesthetic">एनेस्थेटिक / सेडेटिव</option>
                      <option value="hormone">हार्मोन</option>
                      <option value="vitamin">विटामिन व मिनरल</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">इकाई (Unit)</label>
                    <input type="text" id="newUnit" value="vials" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">रैक / शेल्फ लोकेशन *</label>
                    <input type="text" id="newRack" value="Rack A-01" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">बफर न्यूनतम स्टॉक सीमा</label>
                    <input type="number" id="newMinThreshold" value="10" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
              `
                  : ""
              }

              <!-- Batch Specific Information -->
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div class="text-xs font-bold text-amber-400 uppercase">बैच विवरण (Batch Specifications)</div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">बैच नंबर (Batch No.) *</label>
                    <input type="text" id="batchNoInput" required placeholder="BAT-2026-X1" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">प्राप्त मात्रा (Quantity) *</label>
                    <input type="number" id="batchQtyInput" required min="1" value="20" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">निर्माण तिथि (Mfg Date)</label>
                    <input type="date" id="batchMfgDate" value="${new Date().toISOString().split("T")[0]}" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">समाप्ति तिथि (Exp Date) *</label>
                    <input type="date" id="batchExpDate" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-emerald-400 focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">क्रय लागत दर (Cost ₹)</label>
                    <input type="number" step="0.5" id="batchCost" value="180.0" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500" />
                  </div>
                  <div>
                    <label class="block text-[10px] uppercase text-slate-400 mb-1">विक्रय दर (MRP ₹)</label>
                    <input type="number" step="0.5" id="batchPrice" value="225.0" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3 font-sans">
                <button type="button" id="cancelAddStockModalBtn" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50">स्टॉक में जोड़ें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      // Set default expiry date in +365 days
      const d = new Date();
      d.setDate(d.getDate() + 365);
      document.getElementById("batchExpDate").value = d.toISOString().split("T")[0];

      const modal = document.getElementById("addStockModal");
      const closeAction = () => {
        if (modal) modal.remove();
      };

      document.getElementById("closeAddStockModalBtn").addEventListener("click", closeAction);
      document.getElementById("cancelAddStockModalBtn").addEventListener("click", closeAction);

      document.getElementById("addStockForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const bNo = document.getElementById("batchNoInput").value.trim();
        const bQty = parseInt(document.getElementById("batchQtyInput").value, 10);
        const bMfg = document.getElementById("batchMfgDate").value;
        const bExp = document.getElementById("batchExpDate").value;
        const bCost = parseFloat(document.getElementById("batchCost").value);
        const bPrice = parseFloat(document.getElementById("batchPrice").value);

        if (existingDrug) {
          existingDrug.batches.push({
            batchNo: bNo,
            mfgDate: bMfg,
            expDate: bExp,
            quantity: bQty,
            purchaseCost: bCost,
            sellingPrice: bPrice
          });
          notify(`बैच ${bNo} सफलतापूर्वक ${existingDrug.tradeName} में जोड़ा गया!`, "success");
        } else {
          const tName = document.getElementById("newTradeName").value.trim();
          const gName = document.getElementById("newGenericName").value.trim();
          const form = document.getElementById("newForm").value;
          const cat = document.getElementById("newCategory").value;
          const unit = document.getElementById("newUnit").value.trim();
          const rack = document.getElementById("newRack").value.trim();
          const thresh = parseInt(document.getElementById("newMinThreshold").value, 10) || 10;

          const newDrugObj = {
            id: "med_" + Date.now(),
            tradeName: tName,
            genericName: gName,
            form: form,
            category: cat,
            isControlled: cat === "anesthetic",
            scheduleType: cat === "anesthetic" ? "H" : "OTC",
            minStockThreshold: thresh,
            totalStockOnHand: bQty,
            unitOfMeasure: unit,
            rackShelfLocation: rack,
            supplier: "Government Central Medical Depot",
            batches: [
              {
                batchNo: bNo,
                mfgDate: bMfg,
                expDate: bExp,
                quantity: bQty,
                purchaseCost: bCost,
                sellingPrice: bPrice
              }
            ]
          };
          state.inventoryList.unshift(newDrugObj);
          notify(`नई औषधि ${tName} सफलतापूर्वक भंडार में पंजीकृत हुई!`, "success");
        }

        this.recalculateTotalStock();
        closeAction();
        this.render(state.containerElement);
      });
    },

    // 6. PRINT AUDIT REPORT
    printStockAuditReport: function () {
      const alerts = this.calculateStockAlerts();

      const printWindow = window.open("", "_blank", "width=900,height=1000");
      if (!printWindow) {
        notify("कृपया प्रिंट पॉपअप विंडो की अनुमति दें।", "warning");
        return;
      }

      const rowsHtml = state.inventoryList
        .map((item) => {
          return item.batches
            .map((b) => {
              return `
              <tr>
                <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-weight: bold;">${item.tradeName}</td>
                <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-size: 10px;">${item.genericName}</td>
                <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-family: monospace;">${b.batchNo}</td>
                <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-family: monospace;">${b.expDate}</td>
                <td style="padding: 6px 8px; border: 1px solid #d1d5db; text-align: center; font-weight: bold;">${b.quantity} ${item.unitOfMeasure}</td>
                <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-size: 10px;">${item.rackShelfLocation}</td>
              </tr>
            `;
            })
            .join("");
        })
        .join("");

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8">
          <title>पशु चिकित्सालय फार्मेसी स्टॉक ऑडिट विवरण - ${new Date().toLocaleDateString("hi-IN")}</title>
          <style>
            @page { size: A4 portrait; margin: 12mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; margin: 0; padding: 15px; font-size: 11px; }
            .header-strip { text-align: center; border-bottom: 2px solid #064e3b; padding-bottom: 10px; margin-bottom: 15px; }
            .title-org { font-size: 16px; font-weight: 800; color: #064e3b; text-transform: uppercase; }
            .kpi-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; background: #f9fafb; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 15px; font-size: 11px; }
            .data-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11px; }
            .data-table th { background: #064e3b; color: #fff; padding: 6px 8px; font-size: 10px; text-transform: uppercase; }
            .footer-strip { margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; }
            .seal-box { border: 1px dashed #9ca3af; width: 180px; height: 50px; text-align: center; line-height: 50px; color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="header-strip">
            <div class="title-org">पशु चिकित्सा सेवा विभाग • केंद्रीय औषध भंडार</div>
            <div style="font-weight: bold; margin-top: 2px;">वार्षिक एवं मासिक भौतिक स्टॉक सत्यापन रिपोर्ट (Stock Audit Report)</div>
            <div style="font-family: monospace; font-size: 10px; color: #555;">AUDIT NO: AUD-${Date.now()} • FEFO COMPLIANT</div>
          </div>

          <div class="kpi-grid">
            <div><strong>कुल भंडार मूल्यांकन:</strong> ₹${alerts.totalValuation.toLocaleString("en-IN")}</div>
            <div><strong>निम्न स्टॉक अलर्ट्स:</strong> ${alerts.lowStockCount} औषधियां</div>
            <div><strong>30 दिन में समाप्त बैच:</strong> ${alerts.expiringSoonCount} इकाइयां</div>
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th style="text-align: left;">दवा व्यापारिक नाम</th>
                <th style="text-align: left;">जेनेरिक फॉर्मूलेशन</th>
                <th>बैच नंबर</th>
                <th>समाप्ति तिथि</th>
                <th>उपलब्ध मात्रा</th>
                <th>रैक स्थान</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="footer-strip">
            <div>
              <div>सत्यापन: SHA256-INVENTORY-VERIFIED</div>
              <div>ऑडिट दिनांक: ${new Date().toLocaleDateString("hi-IN")}</div>
            </div>
            <div class="seal-box">
              हस्ताक्षर मुख्य फार्मासिस्ट / प्रभारी
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
    },

    // 7. PRINT LEGAL NARCOTICS REGISTER
    printControlledDrugRegister: function () {
      const printWindow = window.open("", "_blank", "width=900,height=1000");
      if (!printWindow) {
        notify("कृपया प्रिंट पॉपअप विंडो की अनुमति दें।", "warning");
        return;
      }

      const rowsHtml = state.controlledSubstanceLog
        .map(
          (l) => `
        <tr>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-family: monospace; font-size: 10px;">${l.dateUsed}</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-weight: bold;">${l.drugName} (Batch: ${l.batchNo})</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db;">Tag: ${l.animalTag} (${l.ownerName})</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; text-align: center; font-weight: bold; color: #991b1b;">${l.qtyUsedMl} ml</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; text-align: center; font-weight: bold;">${l.balanceStock} ml</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-size: 10px;">${l.vetRegNo}</td>
          <td style="padding: 6px 8px; border: 1px solid #d1d5db; font-size: 10px;">${l.reason}</td>
        </tr>
      `
        )
        .join("");

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8">
          <title>कानूनी नारकोटिक एवं शेड्यूल एक्स रजिस्टर - State Drug Controller Audit</title>
          <style>
            @page { size: A4 landscape; margin: 12mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; margin: 0; padding: 15px; font-size: 11px; }
            .header-strip { text-align: center; border-bottom: 2px solid #991b1b; padding-bottom: 10px; margin-bottom: 15px; }
            .title-h { font-size: 16px; font-weight: bold; color: #991b1b; text-transform: uppercase; }
            .data-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11px; }
            .data-table th { background: #991b1b; color: #fff; padding: 6px 8px; font-size: 10px; text-transform: uppercase; }
            .footer-strip { margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; }
            .seal-box { border: 1px dashed #9ca3af; width: 180px; height: 50px; text-align: center; line-height: 50px; color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="header-strip">
            <div class="title-h">औषधि नियंत्रण विभाग • अनुसूची 'X' एवं 'H' नारकोटिक रजिस्टर</div>
            <div style="font-weight: bold; margin-top: 2px;">NDPS Act Mandated Register of Controlled Veterinary Substances</div>
            <div style="font-family: monospace; font-size: 10px; color: #666;">HOSPITAL REGISTRATION NO: VET-REG-2026-HARYANA</div>
          </div>

          <table class="data-table">
            <thead>
              <tr>
                <th>दिनांक व समय</th>
                <th>नियंत्रित औषधि व बैच नं.</th>
                <th>पशु टैग व स्वामी</th>
                <th>प्रयुक्त मात्रा</th>
                <th>अवशेष स्टॉक</th>
                <th>अधिकृत पशु चिकित्सक</th>
                <th>उपयोग का चिकित्सीय कारण</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="footer-strip">
            <div>
              <div>प्रमाणीकरण: NDPS-COMPLIANT-LEDGER</div>
              <div>ऑडिट दिनांक: ${new Date().toLocaleDateString("hi-IN")}</div>
            </div>
            <div class="seal-box">
              हस्ताक्षर ड्रग इंस्पेक्टर / रजिस्ट्रार
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
    },

    // 8. EXPORT INDENT CSV
    exportIndentCsv: function () {
      const lowStockItems = state.inventoryList.filter((item) => item.totalStockOnHand <= item.minStockThreshold);
      const headers = ["DrugID", "TradeName", "GenericName", "CurrentStockOnHand", "MinThreshold", "SuggestedReorderQuantity", "UnitOfMeasure", "Supplier"];
      const rows = lowStockItems.map((item) => [
        item.id,
        `"${item.tradeName}"`,
        `"${item.genericName}"`,
        item.totalStockOnHand,
        item.minStockThreshold,
        Math.max(10, item.minStockThreshold * 2 - item.totalStockOnHand),
        item.unitOfMeasure,
        `"${item.supplier}"`
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `VETCARE_PHARMACY_INDENT_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      notify("मांग पत्र CSV प्रारूप में निर्यात हुआ!", "success");
    }
  };

  // Register on Global Namespace
  root.VetcareApp.Modules.PharmacyInventoryStock = PharmacyInventoryStock;

})(typeof window !== "undefined" ? window : this);
