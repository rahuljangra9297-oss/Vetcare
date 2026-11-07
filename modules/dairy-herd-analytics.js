// Vetcare AI OS - Dairy Herd Performance, Lactation Curve Analytics & Production Economics Module (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE REGISTRATION & ARCHITECTURAL ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // Standard Epizootic & Lactation Econometric Benchmarks
  window.VetcareApp.ClinicalData.DairyBenchmarks = {
    WOODS_CURVE_PARAMETERS: {
      bovineHF: { a: 16.5, b: 0.28, c: 0.0035 }, // Standard Holstein-Friesian / Crossbred
      bovineIndigenous: { a: 8.5, b: 0.22, c: 0.0040 }, // Sahiwal, Gir, Tharparkar
      bubalineMurrah: { a: 10.2, b: 0.25, c: 0.0038 } // Murrah, Nili-Ravi Dairy Buffaloes
    },
    REPRODUCTIVE_TARGETS: {
      CALVING_INTERVAL_DAYS_OPTIMAL: 385,
      CALVING_INTERVAL_DAYS_MAX: 420,
      DAYS_OPEN_TARGET_MAX: 110,
      SERVICES_PER_CONCEPTION_TARGET: 1.7,
      VOLUNTARY_WAITING_PERIOD_DAYS: 50,
      STANDARD_DRY_PERIOD_DAYS: 60
    },
    MASTITIS_SCC_THRESHOLDS: {
      NORMAL_LIMIT: 200000, // < 200k cells/ml
      SUSPECT_LIMIT: 400000 // > 400k cells/ml denotes subclinical/clinical mastitis
    }
  };

  // 2. INTERNAL STATE CONTROLLER
  const State = {
    activeTab: 'herd_kpi_dashboard',
    containerElement: null,
    dbInstance: null,
    listenersBound: false,
    chartResizeObserver: null,

    economicParameters: {
      milkPricePerLiter: 45.0,
      feedCostPerCowPerDay: 220.0,
      laborCostPerCowPerDay: 40.0,
      overheadCostPerCowPerDay: 20.0
    },

    lactationRecords: [],

    // Seed Dataset (Hydrated if IndexedDB is fresh)
    seedData: [
      {
        animalTag: 'IN-HR-2026-101',
        species: 'Bubaline (Murrah)',
        breed: 'Grade Murrah',
        lactationNo: 3,
        calvingDate: new Date(Date.now() - 65 * 86400000).toISOString().split('T')[0],
        daysInMilk: 65,
        peakYieldLiters: 18.5,
        currentDailyYield: 17.8,
        fatPercent: 7.4,
        snfPercent: 9.2,
        sccScore: 'NORMAL',
        reproductionStatus: 'PREGNANT',
        daysOpen: 58,
        inseminationCount: 1,
        lastInseminationDate: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]
      },
      {
        animalTag: 'IN-HR-2026-102',
        species: 'Bovine (HF Cross)',
        breed: 'Holstein-Sahiwal F2',
        lactationNo: 2,
        calvingDate: new Date(Date.now() - 48 * 86400000).toISOString().split('T')[0],
        daysInMilk: 48,
        peakYieldLiters: 28.0,
        currentDailyYield: 27.2,
        fatPercent: 3.9,
        snfPercent: 8.6,
        sccScore: 'NORMAL',
        reproductionStatus: 'OPEN',
        daysOpen: 48,
        inseminationCount: 0,
        lastInseminationDate: ''
      },
      {
        animalTag: 'IN-HR-2026-103',
        species: 'Bovine (Indigenous)',
        breed: 'Sahiwal Pure',
        lactationNo: 4,
        calvingDate: new Date(Date.now() - 245 * 86400000).toISOString().split('T')[0],
        daysInMilk: 245,
        peakYieldLiters: 15.5,
        currentDailyYield: 8.2,
        fatPercent: 4.8,
        snfPercent: 8.9,
        sccScore: 'NORMAL',
        reproductionStatus: 'PREGNANT',
        daysOpen: 85,
        inseminationCount: 2,
        lastInseminationDate: new Date(Date.now() - 160 * 86400000).toISOString().split('T')[0]
      },
      {
        animalTag: 'IN-HR-2026-104',
        species: 'Bubaline (Murrah)',
        breed: 'Murrah Elite',
        lactationNo: 2,
        calvingDate: new Date(Date.now() - 125 * 86400000).toISOString().split('T')[0],
        daysInMilk: 125,
        peakYieldLiters: 16.0,
        currentDailyYield: 9.4,
        fatPercent: 6.8,
        snfPercent: 9.0,
        sccScore: 'SUSPECT_MASTITIS',
        reproductionStatus: 'BRED',
        daysOpen: 110,
        inseminationCount: 2,
        lastInseminationDate: new Date(Date.now() - 15 * 86400000).toISOString().split('T')[0]
      },
      {
        animalTag: 'IN-HR-2026-105',
        species: 'Bovine (Jersey Cross)',
        breed: 'Jersey-Gir',
        lactationNo: 1,
        calvingDate: new Date(Date.now() - 315 * 86400000).toISOString().split('T')[0],
        daysInMilk: 315,
        peakYieldLiters: 17.0,
        currentDailyYield: 5.1,
        fatPercent: 4.6,
        snfPercent: 8.7,
        sccScore: 'NORMAL',
        reproductionStatus: 'OPEN',
        daysOpen: 315,
        inseminationCount: 4,
        lastInseminationDate: new Date(Date.now() - 28 * 86400000).toISOString().split('T')[0]
      },
      {
        animalTag: 'IN-HR-2026-106',
        species: 'Bovine (HF Cross)',
        breed: 'HF Crossbred 75%',
        lactationNo: 3,
        calvingDate: new Date(Date.now() - 80 * 86400000).toISOString().split('T')[0],
        daysInMilk: 80,
        peakYieldLiters: 32.0,
        currentDailyYield: 30.5,
        fatPercent: 3.7,
        snfPercent: 8.5,
        sccScore: 'CLINICAL',
        reproductionStatus: 'OPEN',
        daysOpen: 80,
        inseminationCount: 1,
        lastInseminationDate: new Date(Date.now() - 22 * 86400000).toISOString().split('T')[0]
      },
      {
        animalTag: 'IN-HR-2026-107',
        species: 'Bubaline (Murrah)',
        breed: 'Murrah High Pedigree',
        lactationNo: 4,
        calvingDate: new Date(Date.now() - 280 * 86400000).toISOString().split('T')[0],
        daysInMilk: 280,
        peakYieldLiters: 19.0,
        currentDailyYield: 6.8,
        fatPercent: 7.6,
        snfPercent: 9.3,
        sccScore: 'NORMAL',
        reproductionStatus: 'PREGNANT',
        daysOpen: 72,
        inseminationCount: 1,
        lastInseminationDate: new Date(Date.now() - 208 * 86400000).toISOString().split('T')[0]
      },
      {
        animalTag: 'IN-HR-2026-108',
        species: 'Bovine (Gir Pure)',
        breed: 'Gir Pedigree 1',
        lactationNo: 2,
        calvingDate: new Date(Date.now() - 15 * 86400000).toISOString().split('T')[0],
        daysInMilk: 15,
        peakYieldLiters: 16.5,
        currentDailyYield: 14.2,
        fatPercent: 4.7,
        snfPercent: 9.0,
        sccScore: 'NORMAL',
        reproductionStatus: 'OPEN',
        daysOpen: 15,
        inseminationCount: 0,
        lastInseminationDate: ''
      }
    ]
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE)
  const StorageAdapter = {
    DB_NAME: 'VetcareDairyAnalyticsDB',
    DB_VERSION: 1,
    STORE_NAME: 'dairy_herd_analytics',

    async initDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[DairyAnalytics] IndexedDB unavailable, using LocalStorage fallback.');
          resolve(null);
          return;
        }

        const req = window.indexedDB.open(StorageAdapter.DB_NAME, StorageAdapter.DB_VERSION);

        req.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(StorageAdapter.STORE_NAME)) {
            db.createObjectStore(StorageAdapter.STORE_NAME, { keyPath: 'key' });
          }
        };

        req.onsuccess = (event) => {
          State.dbInstance = event.target.result;
          resolve(State.dbInstance);
        };

        req.onerror = (event) => {
          console.error('[DairyAnalytics] DB Open Error:', event.target.error);
          resolve(null);
        };
      });
    },

    async setItem(key, data) {
      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readwrite');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            store.put({ key: key, value: data, updatedAt: Date.now() });
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => {
              localStorage.setItem('VETCARE_DAIRY_' + key, JSON.stringify(data));
              resolve(true);
            };
          } catch (e) {
            localStorage.setItem('VETCARE_DAIRY_' + key, JSON.stringify(data));
            resolve(true);
          }
        });
      } else {
        localStorage.setItem('VETCARE_DAIRY_' + key, JSON.stringify(data));
        return Promise.resolve(true);
      }
    },

    async getItem(key) {
      if (State.dbInstance) {
        return new Promise((resolve) => {
          try {
            const tx = State.dbInstance.transaction(StorageAdapter.STORE_NAME, 'readonly');
            const store = tx.objectStore(StorageAdapter.STORE_NAME);
            const req = store.get(key);
            req.onsuccess = () => {
              if (req.result && req.result.value) {
                resolve(req.result.value);
              } else {
                const ls = localStorage.getItem('VETCARE_DAIRY_' + key);
                resolve(ls ? JSON.parse(ls) : null);
              }
            };
            req.onerror = () => {
              const ls = localStorage.getItem('VETCARE_DAIRY_' + key);
              resolve(ls ? JSON.parse(ls) : null);
            };
          } catch (e) {
            const ls = localStorage.getItem('VETCARE_DAIRY_' + key);
            resolve(ls ? JSON.parse(ls) : null);
          }
        });
      } else {
        const ls = localStorage.getItem('VETCARE_DAIRY_' + key);
        return Promise.resolve(ls ? JSON.parse(ls) : null);
      }
    }
  };

  // 4. DAIRY PRODUCTION MATHEMATICS & LIVESTOCK ECONOMETRICS
  const EconometricsEngine = {
    // Computes Wood's Incomplete Gamma Curve Yield for day t: Y(t) = a * (t ^ b) * exp(-c * t)
    calculateWoodsTheoreticalYield(dayInMilk, curveType = 'bovineHF') {
      const p = window.VetcareApp.ClinicalData.DairyBenchmarks.WOODS_CURVE_PARAMETERS[curveType] ||
                window.VetcareApp.ClinicalData.DairyBenchmarks.WOODS_CURVE_PARAMETERS.bovineHF;
      const t = Math.max(1, dayInMilk);
      const yieldLitres = p.a * Math.pow(t, p.b) * Math.exp(-p.c * t);
      return Math.round(yieldLitres * 10) / 10;
    },

    // Aggregates high-level herd KPIs
    computeHerdKPIs() {
      const records = State.lactationRecords;
      const totalAnimals = records.length;
      if (totalAnimals === 0) {
        return {
          totalAnimals: 0,
          milkingCount: 0,
          milkingPercent: 0,
          avgDIM: 0,
          totalDailyBulkMilk: 0,
          avgDailyYieldPerCow: 0,
          avgFat: 0,
          avgSnf: 0,
          dailyGrossRevenue: 0,
          totalDailyFeedCost: 0,
          netDailyIOFC: 0,
          netDailyFarmMargin: 0,
          avgDaysOpen: 0,
          avgServicesPerConception: 0
        };
      }

      let totalYield = 0;
      let totalDIM = 0;
      let totalFat = 0;
      let totalSnf = 0;
      let milkingCount = 0;
      let totalDaysOpen = 0;
      let totalServices = 0;
      let bredCowsCount = 0;

      records.forEach(r => {
        // Count as milking if yield > 0.5L and not strictly dry
        if (r.currentDailyYield > 0.5 && r.reproductionStatus !== 'DRY') {
          milkingCount++;
          totalYield += r.currentDailyYield;
          totalDIM += r.daysInMilk;
          totalFat += r.fatPercent;
          totalSnf += r.snfPercent;
        }
        totalDaysOpen += r.daysOpen;
        if (r.inseminationCount > 0) {
          totalServices += r.inseminationCount;
          bredCowsCount++;
        }
      });

      const avgDailyYieldPerCow = milkingCount > 0 ? (totalYield / milkingCount) : 0;
      const avgDIM = milkingCount > 0 ? Math.round(totalDIM / milkingCount) : 0;
      const avgFat = milkingCount > 0 ? (totalFat / milkingCount).toFixed(2) : '0.00';
      const avgSnf = milkingCount > 0 ? (totalSnf / milkingCount).toFixed(2) : '0.00';
      const milkingPercent = Math.round((milkingCount / totalAnimals) * 100);

      // Financials (Income Over Feed Cost)
      const dailyGrossRevenue = totalYield * State.economicParameters.milkPricePerLiter;
      const totalDailyFeedCost = totalAnimals * State.economicParameters.feedCostPerCowPerDay;
      const totalLaborCost = totalAnimals * State.economicParameters.laborCostPerCowPerDay;
      const totalOverhead = totalAnimals * State.economicParameters.overheadCostPerCowPerDay;
      const totalDailyFarmCost = totalDailyFeedCost + totalLaborCost + totalOverhead;

      const netDailyIOFC = dailyGrossRevenue - totalDailyFeedCost;
      const netDailyFarmMargin = dailyGrossRevenue - totalDailyFarmCost;

      const avgDaysOpen = Math.round(totalDaysOpen / totalAnimals);
      const avgServicesPerConception = bredCowsCount > 0 ? (totalServices / bredCowsCount).toFixed(1) : '1.0';

      return {
        totalAnimals,
        milkingCount,
        milkingPercent,
        avgDIM,
        totalDailyBulkMilk: Math.round(totalYield * 10) / 10,
        avgDailyYieldPerCow: Math.round(avgDailyYieldPerCow * 10) / 10,
        avgFat,
        avgSnf,
        dailyGrossRevenue: Math.round(dailyGrossRevenue),
        totalDailyFeedCost: Math.round(totalDailyFeedCost),
        netDailyIOFC: Math.round(netDailyIOFC),
        netDailyFarmMargin: Math.round(netDailyFarmMargin),
        avgDaysOpen,
        avgServicesPerConception
      };
    },

    // Filter actionable herd segment lists
    getActionableHerdSegments() {
      const records = State.lactationRecords;

      // 1. Cows to Dry Off This Week (DIM > 220 and Pregnant or DIM > 270)
      const dryOffCandidates = records.filter(r => (r.daysInMilk >= 220 && r.reproductionStatus === 'PREGNANT') || r.daysInMilk >= 290);

      // 2. Heat Detection & Breeding Due (DIM > 50 and Status is OPEN)
      const heatCheckDue = records.filter(r => r.reproductionStatus === 'OPEN' && r.daysInMilk >= 45);

      // 3. Repeat Breeders & Problem Cows (Services >= 3 or Days Open > 150)
      const problemBreeders = records.filter(r => r.inseminationCount >= 3 || r.daysOpen > 150);

      // 4. Mastitis Suspects & High SCC
      const mastitisAlerts = records.filter(r => r.sccScore === 'SUSPECT_MASTITIS' || r.sccScore === 'CLINICAL');

      return { dryOffCandidates, heatCheckDue, problemBreeders, mastitisAlerts };
    }
  };

  // 5. TOAST NOTIFICATION UTILITY
  function notify(msg, type = 'info') {
    if (window.VetcareApp && typeof window.VetcareApp.showToast === 'function') {
      window.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[DairyHerdAnalytics ${type.toUpperCase()}]: ${msg}`);
    }
  }

  // 6. UI COMPONENT RENDERING ENGINE
  const UIEngine = {
    // Root Layout Shell
    renderMainLayout() {
      const kpis = EconometricsEngine.computeHerdKPIs();
      const iofcColor = kpis.netDailyIOFC >= 0 ? 'text-emerald-400' : 'text-rose-400';

      return `
        <div class="dairy-analytics-wrapper max-w-7xl mx-auto space-y-6">

          <!-- EXECUTIVE TOP KPI RIBBON -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- KPI 1: Bulk Milk Output -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">दैनिक कुल दुग्ध उत्पादन</span>
                  <div class="text-2xl font-black font-display text-white mt-1">${kpis.totalDailyBulkMilk} <span class="text-sm font-normal text-slate-400 font-sans">लीटर/दिन</span></div>
                  <div class="text-[11px] text-emerald-400 font-mono mt-0.5">औसत: ${kpis.avgDailyYieldPerCow} L/गाय (Fat: ${kpis.avgFat}%)</div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl">
                  <i class="fa-solid fa-bucket"></i>
                </div>
              </div>
            </div>

            <!-- KPI 2: Herd In-Milk Status -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">दुधारू पशु अनुपात (In-Milk %)</span>
                  <div class="text-2xl font-black font-display text-amber-400 mt-1">${kpis.milkingPercent}% <span class="text-xs font-normal text-slate-400 font-sans">(${kpis.milkingCount}/${kpis.totalAnimals})</span></div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">झुंड औसत DIM: <strong class="text-slate-200">${kpis.avgDIM} दिन</strong></div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl">
                  <i class="fa-solid fa-cow"></i>
                </div>
              </div>
            </div>

            <!-- KPI 3: Daily IOFC Margin -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">दैनिक IOFC चारा अधिशेष</span>
                  <div class="text-2xl font-black font-display ${iofcColor} mt-1">₹${kpis.netDailyIOFC.toLocaleString('en-IN')}</div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">राजस्व: ₹${kpis.dailyGrossRevenue.toLocaleString('en-IN')} | चारा: ₹${kpis.totalDailyFeedCost.toLocaleString('en-IN')}</div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl">
                  <i class="fa-solid fa-chart-line"></i>
                </div>
              </div>
            </div>

            <!-- KPI 4: Reproductive Efficiency -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">प्रजनन क्षमता (Days Open)</span>
                  <div class="text-2xl font-black font-display text-purple-400 mt-1">${kpis.avgDaysOpen} <span class="text-xs font-normal text-slate-400 font-sans">दिन</span></div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">प्रति गर्भधारण AI सेवाएं: <strong class="text-purple-300">${kpis.avgServicesPerConception}</strong></div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl">
                  <i class="fa-solid fa-dna"></i>
                </div>
              </div>
            </div>

          </div>

          <!-- PRIMARY MODULE NAVIGATION & ACTION BAR -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button type="button" data-tab="herd_kpi_dashboard" class="dairy-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'herd_kpi_dashboard' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-table-cells"></i>
                <span>१. दुग्ध उत्पादन व पशु रजिस्टर</span>
              </button>
              <button type="button" data-tab="lactation_curves" class="dairy-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'lactation_curves' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-chart-area"></i>
                <span>२. लेक्टेशन कर्व विश्लेषण (Lactation Curve)</span>
              </button>
              <button type="button" data-tab="reproduction_efficiency" class="dairy-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'reproduction_efficiency' ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-venus-mars"></i>
                <span>३. प्रजनन दक्षता व ड्राइव्ह-ऑफ</span>
              </button>
              <button type="button" data-tab="farm_profitability_iofc" class="dairy-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'farm_profitability_iofc' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-coins"></i>
                <span>४. फार्म अर्थशास्त्र एवं IOFC</span>
              </button>
            </div>

            <!-- Export / Quick Trigger Bar -->
            <div class="flex items-center gap-2">
              <button type="button" id="btnOpenAddLactationModal" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md flex items-center gap-1.5 transition-all">
                <i class="fa-solid fa-plus-circle"></i>
                <span>दूध रिकॉर्ड जोड़ें</span>
              </button>
              <button type="button" id="btnExportCSV" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                <i class="fa-solid fa-file-csv text-emerald-400"></i>
                <span>CSV</span>
              </button>
              <button type="button" id="btnPrintAuditSummary" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                <i class="fa-solid fa-print text-amber-400"></i>
                <span>ऑडिट प्रिंट</span>
              </button>
            </div>
          </div>

          <!-- TAB CONTENT PANEL HOOK -->
          <div id="dairyTabContentPanel" class="transition-opacity duration-200"></div>

          <!-- MODAL CONTAINER -->
          <div id="dairyModalContainer"></div>
        </div>
      `;
    },

    // TAB 1: Herd Roster & Production Table
    renderHerdRosterTab() {
      const records = State.lactationRecords;

      const rows = records.map(r => {
        let sccBadge = '';
        if (r.sccScore === 'NORMAL') {
          sccBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">स्वस्थ (Normal)</span>';
        } else if (r.sccScore === 'SUSPECT_MASTITIS') {
          sccBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">संदिग्ध थनैला (Subclinical)</span>';
        } else {
          sccBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 animate-pulse">तीव्र थनैला (Clinical)</span>';
        }

        let reproBadge = '';
        if (r.reproductionStatus === 'PREGNANT') {
          reproBadge = '<span class="text-xs text-purple-400 font-bold"><i class="fa-solid fa-baby mr-1"></i>गाभिन (Gabin)</span>';
        } else if (r.reproductionStatus === 'BRED') {
          reproBadge = '<span class="text-xs text-cyan-400 font-semibold"><i class="fa-solid fa-syringe mr-1"></i>सीमन गर्भाधान</span>';
        } else if (r.reproductionStatus === 'DRY') {
          reproBadge = '<span class="text-xs text-amber-400 font-semibold"><i class="fa-solid fa-ban mr-1"></i>दूध बंद (Dry)</span>';
        } else {
          reproBadge = '<span class="text-xs text-rose-400 font-semibold"><i class="fa-solid fa-circle-question mr-1"></i>खाली (Open)</span>';
        }

        return `
          <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
            <td class="py-3 px-4">
              <div class="font-bold text-white text-sm">${r.animalTag}</div>
              <div class="text-[11px] text-slate-400 font-mono">${r.species} • ${r.breed}</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs">
              <div class="text-slate-200">ब्यात संख्या: <strong>${r.lactationNo}</strong></div>
              <div class="text-slate-400 text-[11px]">ब्याने की तिथि: ${r.calvingDate}</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs">
              <div class="text-amber-400 font-bold">${r.daysInMilk} दिन (DIM)</div>
              <div class="text-[10px] text-slate-400">शीर्ष: ${r.peakYieldLiters}L</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs">
              <div class="text-emerald-400 font-black text-sm">${r.currentDailyYield} L/दिन</div>
              <div class="text-[10px] text-slate-400">Fat: ${r.fatPercent}% | SNF: ${r.snfPercent}%</div>
            </td>
            <td class="py-3 px-4">
              ${reproBadge}
              <div class="text-[10px] font-mono text-slate-400 mt-0.5">Days Open: ${r.daysOpen} | AI: ${r.inseminationCount}</div>
            </td>
            <td class="py-3 px-4">
              ${sccBadge}
            </td>
            <td class="py-3 px-4 text-right space-x-1">
              <button type="button" data-action="edit_animal" data-tag="${r.animalTag}" class="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" data-action="delete_animal" data-tag="${r.animalTag}" class="px-2.5 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-rose-900/40 text-rose-400 border border-slate-700 transition-colors">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>
        `;
      }).join('');

      return `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div class="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-list-check text-cyan-400"></i>
                <span>सक्रिय डेयरी पशु रजिस्टर एवं दैनिक दुग्ध मापन</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                ब्यात चक्र (DIM), दैनिक दुग्ध उपज, फैट/एसएनएफ एवं थनैला सेल काउंट मॉनिटरिंग
              </p>
            </div>
            <span class="text-xs font-mono text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              कुल पंजीकृत पशु: <strong class="text-cyan-400">${records.length}</strong>
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                  <th class="py-3 px-4">टैग संख्या / नस्ल</th>
                  <th class="py-3 px-4">ब्यात चक्र (Lactation)</th>
                  <th class="py-3 px-4">दूध दिन (DIM)</th>
                  <th class="py-3 px-4">दैनिक उपज व गुणवत्ता</th>
                  <th class="py-3 px-4">प्रजनन स्थिति</th>
                  <th class="py-3 px-4">थनैला स्क्रीनिंग (SCC)</th>
                  <th class="py-3 px-4 text-right">कार्रवाई</th>
                </tr>
              </thead>
              <tbody>
                ${records.length > 0 ? rows : '<tr><td colspan="7" class="p-8 text-center text-slate-400 text-xs font-mono">कोई दुग्ध रिकॉर्ड उपलब्ध नहीं है। "दूध रिकॉर्ड जोड़ें" पर क्लिक करें।</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // TAB 2: Canvas Lactation Curve Visualizer
    renderLactationCurveTab() {
      return `
        <div class="space-y-6">
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-chart-area text-emerald-400"></i>
                  <span>वुड्स लेक्टेशन कर्व मॉडल (Wood's Mathematical Lactation Curve)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  $Y(t) = a \\cdot t^b \\cdot e^{-c \\cdot t}$ मॉडल आधारित 305-दिवसीय मानक उपज व वास्तविक झुंड प्रदर्शन
                </p>
              </div>

              <!-- Legend -->
              <div class="flex flex-wrap items-center gap-3 text-xs font-mono">
                <div class="flex items-center gap-1.5">
                  <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span class="text-slate-300">मानक HF/Crossbred कर्व</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span class="text-slate-300">मुर्रा भैंस कर्व</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-3 h-3 rounded-full bg-cyan-400"></span>
                  <span class="text-slate-300">फार्म के वास्तविक पशु</span>
                </div>
              </div>
            </div>

            <!-- Canvas Container -->
            <div class="w-full bg-slate-950 rounded-xl p-4 border border-slate-800 relative overflow-hidden">
              <canvas id="lactationCurveCanvas" class="w-full h-80 block"></canvas>
            </div>

            <!-- Descriptive Notes -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">१. पीक लेक्टेशन विंडो</span>
                <p class="text-slate-300">ब्याने के 45 से 60 दिन के मध्य पशु उच्चतम दूध (Peak Yield) देता है। ऊर्जा संतुलन बनाए रखने हेतु बाईपास फैट आवश्यक है।</p>
              </div>
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1">२. पर्सिस्टेंसी डिक्लाइन रेट</span>
                <p class="text-slate-300">पीक के पश्चात प्रति माह 8-10% की सामान्य गिरावट होनी चाहिए। 12% से अधिक गिरावट असंतुलित चारे का संकेत है।</p>
              </div>
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">३. ड्राइव्ह-ऑफ बिंदु</span>
                <p class="text-slate-300">ब्याने के 220-240 दिन उपरांत जब पशु 7 माह गाभिन हो, तो 60 दिन का ड्राई पीरियड (दूध बंद) अनिवार्य है।</p>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // TAB 3: Reproductive Efficiency & Action Lists
    renderReproductionTab() {
      const segments = EconometricsEngine.getActionableHerdSegments();

      return `
        <div class="space-y-6">
          
          <!-- Top Alert Box -->
          <div class="p-4 rounded-2xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-slate-900 border border-purple-500/40 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl">
                <i class="fa-solid fa-bell"></i>
              </div>
              <div>
                <h4 class="text-sm font-bold text-white">प्रजनन कार्यप्रणाली एवं तत्काल ध्यान योग्य पशु</h4>
                <p class="text-xs text-slate-300">दुग्ध फार्म के लाभ का सीधा संबंध 385 दिनों के ब्यात अंतराल (Calving Interval) से है।</p>
              </div>
            </div>
            <span class="text-xs font-mono text-purple-300 bg-purple-950 px-3 py-1 rounded-lg border border-purple-800">
              टारगेट डेज ओपन: &lt; 110 दिन
            </span>
          </div>

          <!-- Action Lists Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- List 1: Cows to Dry Off This Week -->
            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 class="text-xs font-bold font-mono text-amber-400 uppercase flex items-center gap-2">
                  <i class="fa-solid fa-ban"></i>
                  <span>१. इस सप्ताह दूध बंद (Dry Off) योग्य गायें (${segments.dryOffCandidates.length})</span>
                </h4>
                <span class="text-[10px] font-mono text-slate-400">Target: 60 Days Dry</span>
              </div>
              <div class="space-y-2">
                ${segments.dryOffCandidates.length > 0 ? segments.dryOffCandidates.map(c => `
                  <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div class="font-bold text-white">${c.animalTag} (${c.breed})</div>
                      <div class="text-[11px] text-slate-400 font-mono">DIM: ${c.daysInMilk} दिन | दैनिक: ${c.currentDailyYield} L</div>
                    </div>
                    <span class="px-2 py-1 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      ड्राई-ऑफ इंजेक्शन दें
                    </span>
                  </div>
                `).join('') : '<div class="text-xs text-slate-400 font-mono p-4 text-center">कोई पशु ड्राई-ऑफ हेतु लंबित नहीं है।</div>'}
              </div>
            </div>

            <!-- List 2: Cows Due for Heat Check & AI -->
            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 class="text-xs font-bold font-mono text-cyan-400 uppercase flex items-center gap-2">
                  <i class="fa-solid fa-venus"></i>
                  <span>२. मद (Heat) जांच एवं सीमन योग्य पशु (${segments.heatCheckDue.length})</span>
                </h4>
                <span class="text-[10px] font-mono text-slate-400">VWP Over (&gt;45 Days)</span>
              </div>
              <div class="space-y-2">
                ${segments.heatCheckDue.length > 0 ? segments.heatCheckDue.map(c => `
                  <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div class="font-bold text-white">${c.animalTag} (${c.breed})</div>
                      <div class="text-[11px] text-slate-400 font-mono">DIM: ${c.daysInMilk} दिन | Days Open: ${c.daysOpen}</div>
                    </div>
                    <span class="px-2 py-1 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      मद लक्षण जांचें
                    </span>
                  </div>
                `).join('') : '<div class="text-xs text-slate-400 font-mono p-4 text-center">सभी योग्य पशु गाभिन अथवा गर्भाधानित हैं।</div>'}
              </div>
            </div>

            <!-- List 3: Problem Breeders (Repeat Breeders) -->
            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 class="text-xs font-bold font-mono text-rose-400 uppercase flex items-center gap-2">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                  <span>३. बार-बार फिरने वाले पशु (Repeat Breeders - &ge;3 AI) (${segments.problemBreeders.length})</span>
                </h4>
                <span class="text-[10px] font-mono text-slate-400">Cull / Treatment</span>
              </div>
              <div class="space-y-2">
                ${segments.problemBreeders.length > 0 ? segments.problemBreeders.map(c => `
                  <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div class="font-bold text-white">${c.animalTag}</div>
                      <div class="text-[11px] text-slate-400 font-mono">AI संख्या: ${c.inseminationCount} | खाली दिन: ${c.daysOpen}</div>
                    </div>
                    <span class="px-2 py-1 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                      गर्भाशय जांच (Gynae)
                    </span>
                  </div>
                `).join('') : '<div class="text-xs text-slate-400 font-mono p-4 text-center">कोई रिपीटर पशु दर्ज नहीं है। उत्तम प्रजनन स्थिति!</div>'}
              </div>
            </div>

            <!-- List 4: Mastitis Early Warning Board -->
            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 class="text-xs font-bold font-mono text-rose-400 uppercase flex items-center gap-2">
                  <i class="fa-solid fa-shield-virus"></i>
                  <span>४. थनैला चेतावनी बोर्ड (High Somatic Cell Count) (${segments.mastitisAlerts.length})</span>
                </h4>
                <span class="text-[10px] font-mono text-slate-400">CMT Reagent Positive</span>
              </div>
              <div class="space-y-2">
                ${segments.mastitisAlerts.length > 0 ? segments.mastitisAlerts.map(c => `
                  <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div class="font-bold text-white">${c.animalTag}</div>
                      <div class="text-[11px] text-slate-400 font-mono">उपज: ${c.currentDailyYield} L | स्थिति: ${c.sccScore}</div>
                    </div>
                    <span class="px-2 py-1 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      थनैला चिकित्सा आरंभ करें
                    </span>
                  </div>
                `).join('') : '<div class="text-xs text-slate-400 font-mono p-4 text-center">झुंड में सभी थन स्वस्थ हैं। शून्य सबक्लिनिकल मामले।</div>'}
              </div>
            </div>

          </div>
        </div>
      `;
    },

    // TAB 4: Farm Profitability & IOFC Calculator
    renderEconomicsTab() {
      const kpis = EconometricsEngine.computeHerdKPIs();
      const p = State.economicParameters;

      return `
        <div class="space-y-6">
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-calculator text-amber-400"></i>
                  <span>आय-व्यय विश्लेषण एवं Income Over Feed Cost (IOFC)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  दूध राजस्व में से दैनिक चारा लागत घटाकर प्राप्त शुद्ध लाभ अंतर (Dairy Gross Margin)
                </p>
              </div>
              <button type="button" id="btnOpenEditEconomicsModal" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md">
                <i class="fa-solid fa-sliders mr-1"></i> पैरामीटर्स बदलें
              </button>
            </div>

            <!-- Parameters Grid -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-slate-400 block text-[10px] uppercase">दूध विक्रय दर (Milk Price)</span>
                <span class="text-white text-lg font-bold">₹${p.milkPricePerLiter}</span> /लीटर
              </div>
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-slate-400 block text-[10px] uppercase">दैनिक चारा खर्च (Feed Cost)</span>
                <span class="text-amber-400 text-lg font-bold">₹${p.feedCostPerCowPerDay}</span> /पशु/दिन
              </div>
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-slate-400 block text-[10px] uppercase">श्रमिक व्यय (Labor Cost)</span>
                <span class="text-cyan-400 text-lg font-bold">₹${p.laborCostPerCowPerDay}</span> /पशु/दिन
              </div>
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-slate-400 block text-[10px] uppercase">दवा व अन्य खर्च (Overheads)</span>
                <span class="text-purple-400 text-lg font-bold">₹${p.overheadCostPerCowPerDay}</span> /पशु/दिन
              </div>
            </div>

            <!-- Daily & Monthly Cash Flow Table -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 class="text-xs font-bold text-white uppercase font-mono tracking-wider">वित्तीय लाभ-हानि पत्रक (P&L Breakdown)</h4>
              
              <div class="space-y-2 text-xs">
                <div class="flex items-center justify-between py-1 border-b border-slate-800/80">
                  <span class="text-slate-300">दैनिक कुल दुग्ध राजस्व (${kpis.totalDailyBulkMilk}L × ₹${p.milkPricePerLiter})</span>
                  <span class="font-mono font-bold text-emerald-400">+ ₹${kpis.dailyGrossRevenue.toLocaleString('en-IN')}</span>
                </div>
                <div class="flex items-center justify-between py-1 border-b border-slate-800/80">
                  <span class="text-slate-300">दैनिक कुल चारा लागत (${kpis.totalAnimals} पशु × ₹${p.feedCostPerCowPerDay})</span>
                  <span class="font-mono font-bold text-rose-400">- ₹${kpis.totalDailyFeedCost.toLocaleString('en-IN')}</span>
                </div>
                <div class="flex items-center justify-between py-1 border-b border-slate-800/80">
                  <span class="text-slate-300 font-bold">दैनिक शुद्ध IOFC चारा अधिशेष (Revenue - Feed)</span>
                  <span class="font-mono font-bold text-emerald-300 text-sm">₹${kpis.netDailyIOFC.toLocaleString('en-IN')} /दिन</span>
                </div>
                <div class="flex items-center justify-between py-1 border-b border-slate-800/80">
                  <span class="text-slate-300">श्रमिक व प्रबंधन व्यय (${kpis.totalAnimals} × ₹${p.laborCostPerCowPerDay + p.overheadCostPerCowPerDay})</span>
                  <span class="font-mono font-bold text-rose-400">- ₹${(kpis.totalAnimals * (p.laborCostPerCowPerDay + p.overheadCostPerCowPerDay)).toLocaleString('en-IN')}</span>
                </div>
                <div class="flex items-center justify-between py-2 bg-slate-900 px-3 rounded-lg border border-slate-700">
                  <span class="text-white font-bold text-sm">मासिक अनुमानित शुद्ध लाभ (Net Monthly Farm Profit)</span>
                  <span class="font-mono font-black text-emerald-400 text-base">₹${(kpis.netDailyFarmMargin * 30).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  };

  // 7. CANVAS GRAPH RENDERING ENGINE (ZERO-DEPENDENCY HTML5 CANVAS)
  function renderLactationCurvesCanvas() {
    const canvas = document.getElementById('lactationCurveCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina Display Pixel Ratio Fix
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // Layout Padding
    const padLeft = 45;
    const padRight = 20;
    const padTop = 20;
    const padBottom = 35;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    // Coordinate Mapping (0-305 Days, 0-35 Liters)
    const maxDays = 305;
    const maxYield = 35;

    const getX = (dim) => padLeft + (dim / maxDays) * chartW;
    const getY = (y) => padTop + chartH - (y / maxYield) * chartH;

    // 1. Grid Lines & Ticks
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.font = '10px monospace';
    ctx.fillStyle = '#64748b';

    // Horizontal Y Grid (0 to 35 Liters every 5L)
    for (let y = 0; y <= maxYield; y += 5) {
      const yPos = getY(y);
      ctx.beginPath();
      ctx.moveTo(padLeft, yPos);
      ctx.lineTo(width - padRight, yPos);
      ctx.stroke();
      ctx.fillText(y + 'L', 10, yPos + 3);
    }

    // Vertical X Grid (0 to 305 Days every 30 days)
    for (let d = 0; d <= maxDays; d += 30) {
      const xPos = getX(d);
      ctx.beginPath();
      ctx.moveTo(xPos, padTop);
      ctx.lineTo(xPos, padTop + chartH);
      ctx.stroke();
      ctx.fillText(d + 'd', xPos - 8, height - 12);
    }

    // 2. Draw Theoretical Curve 1: Bovine HF Cross (Emerald)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let d = 1; d <= maxDays; d += 2) {
      const yVal = EconometricsEngine.calculateWoodsTheoreticalYield(d, 'bovineHF');
      const px = getX(d);
      const py = getY(yVal);
      if (d === 1) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 3. Draw Theoretical Curve 2: Murrah Buffalo (Amber)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let d = 1; d <= maxDays; d += 2) {
      const yVal = EconometricsEngine.calculateWoodsTheoreticalYield(d, 'bubalineMurrah');
      const px = getX(d);
      const py = getY(yVal);
      if (d === 1) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 4. Plot Actual Animals on Farm (Cyan Dots with Tags)
    State.lactationRecords.forEach(animal => {
      const ax = getX(animal.daysInMilk);
      const ay = getY(animal.currentDailyYield);

      // Outer Glow
      ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.beginPath();
      ctx.arc(ax, ay, 8, 0, Math.PI * 2);
      ctx.fill();

      // Inner Core Dot
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(ax, ay, 4, 0, Math.PI * 2);
      ctx.fill();

      // Animal Tag Text
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '9px monospace';
      ctx.fillText(animal.animalTag.split('-').pop(), ax + 6, ay - 4);
    });
  }

  // 8. MODAL DIALOG CONTROLLERS (ZERO-PLACEHOLDER INLINE BUILDERS)
  const ModalController = {
    closeModal() {
      const container = document.getElementById('dairyModalContainer');
      if (container) container.innerHTML = '';
    },

    openAddAnimalModal(editTag = null) {
      const container = document.getElementById('dairyModalContainer');
      if (!container) return;

      let animal = {
        animalTag: 'IN-HR-2026-' + Math.floor(100 + Math.random() * 900),
        species: 'Bubaline (Murrah)',
        breed: 'Murrah Buffalo',
        lactationNo: 2,
        calvingDate: new Date().toISOString().split('T')[0],
        daysInMilk: 30,
        peakYieldLiters: 16.0,
        currentDailyYield: 14.5,
        fatPercent: 7.0,
        snfPercent: 9.0,
        sccScore: 'NORMAL',
        reproductionStatus: 'OPEN',
        daysOpen: 30,
        inseminationCount: 0
      };

      if (editTag) {
        const found = State.lactationRecords.find(r => r.animalTag === editTag);
        if (found) animal = JSON.parse(JSON.stringify(found));
      }

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <i class="fa-solid fa-cow"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">${editTag ? 'पशु दुग्ध रिकॉर्ड संपादित करें' : 'नया पशु लेक्टेशन रिकॉर्ड जोड़ें'}</h3>
              </div>
              <button type="button" id="btnModalCloseAnimal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddAnimalRecord" class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">कान का टैग नंबर (Ear Tag)*</label>
                  <input type="text" id="m_tag" value="${animal.animalTag}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रजाति व नस्ल*</label>
                  <select id="m_species" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="Bubaline (Murrah)" ${animal.species.includes('Murrah') ? 'selected' : ''}>मुर्रा भैंस (Murrah Buffalo)</option>
                    <option value="Bovine (HF Cross)" ${animal.species.includes('HF') ? 'selected' : ''}>एचएफ क्रॉस गाय (HF Cross)</option>
                    <option value="Bovine (Indigenous)" ${animal.species.includes('Indigenous') ? 'selected' : ''}>साहीवाल / गिर देशी गाय</option>
                    <option value="Bovine (Jersey Cross)" ${animal.species.includes('Jersey') ? 'selected' : ''}>जर्सी क्रॉस गाय</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">ब्यात (Lactation)*</label>
                  <input type="number" id="m_lactNo" min="1" max="12" value="${animal.lactationNo}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">ब्याने की तिथि*</label>
                  <input type="date" id="m_calvingDate" value="${animal.calvingDate}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">दिन (DIM)*</label>
                  <input type="number" id="m_dim" min="1" max="600" value="${animal.daysInMilk}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">दैनिक दूध (Liters)*</label>
                  <input type="number" step="0.1" id="m_yield" value="${animal.currentDailyYield}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">फैट % (FAT)</label>
                  <input type="number" step="0.1" id="m_fat" value="${animal.fatPercent}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">एसएनएफ % (SNF)</label>
                  <input type="number" step="0.1" id="m_snf" value="${animal.snfPercent}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रजनन स्थिति (Repro Status)</label>
                  <select id="m_repro" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="OPEN" ${animal.reproductionStatus === 'OPEN' ? 'selected' : ''}>खाली (Open)</option>
                    <option value="BRED" ${animal.reproductionStatus === 'BRED' ? 'selected' : ''}>गर्भाधानित (AI Done)</option>
                    <option value="PREGNANT" ${animal.reproductionStatus === 'PREGNANT' ? 'selected' : ''}>गाभिन प्रमाणित (Pregnant)</option>
                    <option value="DRY" ${animal.reproductionStatus === 'DRY' ? 'selected' : ''}>दूध बंद (Dry Cow)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">थनैला स्क्रीनिंग (SCC / CMT)</label>
                  <select id="m_scc" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="NORMAL" ${animal.sccScore === 'NORMAL' ? 'selected' : ''}>सामान्य / स्वस्थ (Negative)</option>
                    <option value="SUSPECT_MASTITIS" ${animal.sccScore === 'SUSPECT_MASTITIS' ? 'selected' : ''}>सबक्लिनिकल थनैला (CMT 1+/2+)</option>
                    <option value="CLINICAL" ${animal.sccScore === 'CLINICAL' ? 'selected' : ''}>तीव्र थनैला (Clinical Clots)</option>
                  </select>
                </div>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelAnimalModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md">सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseAnimal').onclick = ModalController.closeModal;
      document.getElementById('btnCancelAnimalModal').onclick = ModalController.closeModal;

      document.getElementById('formAddAnimalRecord').onsubmit = async (e) => {
        e.preventDefault();
        const tag = document.getElementById('m_tag').value.trim();
        const species = document.getElementById('m_species').value;
        const lactNo = parseInt(document.getElementById('m_lactNo').value, 10);
        const cDate = document.getElementById('m_calvingDate').value;
        const dim = parseInt(document.getElementById('m_dim').value, 10);
        const yieldVal = parseFloat(document.getElementById('m_yield').value);
        const fat = parseFloat(document.getElementById('m_fat').value);
        const snf = parseFloat(document.getElementById('m_snf').value);
        const repro = document.getElementById('m_repro').value;
        const scc = document.getElementById('m_scc').value;

        const updatedObj = {
          animalTag: tag,
          species: species,
          breed: species.includes('Murrah') ? 'Murrah Buffalo' : 'Crossbred',
          lactationNo: lactNo,
          calvingDate: cDate,
          daysInMilk: dim,
          peakYieldLiters: Math.max(yieldVal, animal.peakYieldLiters || yieldVal),
          currentDailyYield: yieldVal,
          fatPercent: fat,
          snfPercent: snf,
          sccScore: scc,
          reproductionStatus: repro,
          daysOpen: repro === 'PREGNANT' ? animal.daysOpen : dim,
          inseminationCount: animal.inseminationCount || (repro === 'BRED' ? 1 : 0),
          lastInseminationDate: animal.lastInseminationDate || ''
        };

        const existingIdx = State.lactationRecords.findIndex(r => r.animalTag === tag);
        if (existingIdx >= 0) {
          State.lactationRecords[existingIdx] = updatedObj;
        } else {
          State.lactationRecords.unshift(updatedObj);
        }

        await StorageAdapter.setItem('lactationRecords', State.lactationRecords);
        ModalController.closeModal();
        notify(`पशु ${tag} का रिकॉर्ड सफलतापूर्वक सहेजा गया।`, 'success');
        window.VetcareApp.Modules.DairyHerdAnalytics.refreshView();
      };
    },

    openEditEconomicsModal() {
      const container = document.getElementById('dairyModalContainer');
      if (!container) return;

      const p = State.economicParameters;

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-amber-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <i class="fa-solid fa-sliders"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">फार्म आर्थिक पैरामीटर कॉन्फ़िगरेशन</h3>
              </div>
              <button type="button" id="btnModalCloseEcon" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formEditEconomics" class="space-y-4">
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">दूध विक्रय दर (Milk Price ₹/Liter)*</label>
                <input type="number" step="0.5" id="econ_price" value="${p.milkPricePerLiter}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">चारा लागत (Feed Cost ₹/Cow/Day)*</label>
                <input type="number" step="1" id="econ_feed" value="${p.feedCostPerCowPerDay}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">श्रमिक व्यय (Labor Cost ₹/Cow/Day)</label>
                <input type="number" step="1" id="econ_labor" value="${p.laborCostPerCowPerDay}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">अन्य विविध खर्च (Overheads ₹/Cow/Day)</label>
                <input type="number" step="1" id="econ_overhead" value="${p.overheadCostPerCowPerDay}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelEconModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md">पैरामीटर्स अपडेट करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseEcon').onclick = ModalController.closeModal;
      document.getElementById('btnCancelEconModal').onclick = ModalController.closeModal;

      document.getElementById('formEditEconomics').onsubmit = async (e) => {
        e.preventDefault();
        State.economicParameters.milkPricePerLiter = parseFloat(document.getElementById('econ_price').value);
        State.economicParameters.feedCostPerCowPerDay = parseFloat(document.getElementById('econ_feed').value);
        State.economicParameters.laborCostPerCowPerDay = parseFloat(document.getElementById('econ_labor').value);
        State.economicParameters.overheadCostPerCowPerDay = parseFloat(document.getElementById('econ_overhead').value);

        await StorageAdapter.setItem('economicParameters', State.economicParameters);
        ModalController.closeModal();
        notify('आर्थिक पैरामीटर्स अद्यतन किए गए।', 'success');
        window.VetcareApp.Modules.DairyHerdAnalytics.refreshView();
      };
    }
  };

  // 9. EVENT DELEGATION & LIFECYCLE CONTROLS
  function bindDOMEvents(container) {
    if (State.listenersBound) return;

    container.addEventListener('click', async (e) => {
      // 1. Tab Navigation
      const tabBtn = e.target.closest('.dairy-tab-btn');
      if (tabBtn) {
        const targetTab = tabBtn.getAttribute('data-tab');
        if (targetTab && targetTab !== State.activeTab) {
          State.activeTab = targetTab;
          window.VetcareApp.Modules.DairyHerdAnalytics.refreshView();
        }
        return;
      }

      // 2. Open Add Animal Modal
      if (e.target.closest('#btnOpenAddLactationModal')) {
        ModalController.openAddAnimalModal();
        return;
      }

      // 3. Open Edit Economics Modal
      if (e.target.closest('#btnOpenEditEconomicsModal')) {
        ModalController.openEditEconomicsModal();
        return;
      }

      // 4. Export CSV Action
      if (e.target.closest('#btnExportCSV')) {
        window.VetcareApp.Modules.DairyHerdAnalytics.exportHerdPerformanceReport();
        return;
      }

      // 5. Print Summary Action
      if (e.target.closest('#btnPrintAuditSummary')) {
        window.VetcareApp.Modules.DairyHerdAnalytics.printHerdHealthSummary();
        return;
      }

      // 6. Row Action: Edit Animal
      const editBtn = e.target.closest('button[data-action="edit_animal"]');
      if (editBtn) {
        const tag = editBtn.getAttribute('data-tag');
        ModalController.openAddAnimalModal(tag);
        return;
      }

      // 7. Row Action: Delete Animal
      const delBtn = e.target.closest('button[data-action="delete_animal"]');
      if (delBtn) {
        const tag = delBtn.getAttribute('data-tag');
        if (confirm(`क्या आप पशु टैग "${tag}" का रिकॉर्ड हटाना चाहते हैं?`)) {
          State.lactationRecords = State.lactationRecords.filter(r => r.animalTag !== tag);
          await StorageAdapter.setItem('lactationRecords', State.lactationRecords);
          notify(`पशु ${tag} हटाया गया।`, 'warning');
          window.VetcareApp.Modules.DairyHerdAnalytics.refreshView();
        }
        return;
      }
    });

    State.listenersBound = true;
  }

  // 10. PUBLIC API & LIFECYCLE IMPLEMENTATION
  window.VetcareApp.Modules.DairyHerdAnalytics = {
    // Lifecycle Init
    async init() {
      try {
        await StorageAdapter.initDB();

        const savedRecords = await StorageAdapter.getItem('lactationRecords');
        State.lactationRecords = Array.isArray(savedRecords) && savedRecords.length > 0 ? savedRecords : State.seedData;

        const savedEcon = await StorageAdapter.getItem('economicParameters');
        if (savedEcon) {
          State.economicParameters = Object.assign(State.economicParameters, savedEcon);
        }

        console.log('[DairyAnalytics] Module initialized with', State.lactationRecords.length, 'records.');
      } catch (err) {
        console.error('[DairyAnalytics] Init failed:', err);
      }
    },

    // Lifecycle Render
    render(containerId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error(`[DairyAnalytics] Container ${containerId} not found.`);
        return;
      }

      State.containerElement = container;
      this.refreshView();
      bindDOMEvents(container);

      // Handle Canvas Responsive Redraws
      if (window.ResizeObserver && !State.chartResizeObserver) {
        State.chartResizeObserver = new ResizeObserver(() => {
          if (State.activeTab === 'lactation_curves') {
            renderLactationCurvesCanvas();
          }
        });
        State.chartResizeObserver.observe(container);
      }
    },

    // Fast View Refresh
    refreshView() {
      if (!State.containerElement) return;

      State.containerElement.innerHTML = UIEngine.renderMainLayout();
      const contentPanel = State.containerElement.querySelector('#dairyTabContentPanel');
      if (!contentPanel) return;

      if (State.activeTab === 'herd_kpi_dashboard') {
        contentPanel.innerHTML = UIEngine.renderHerdRosterTab();
      } else if (State.activeTab === 'lactation_curves') {
        contentPanel.innerHTML = UIEngine.renderLactationCurveTab();
        requestAnimationFrame(() => renderLactationCurvesCanvas());
      } else if (State.activeTab === 'reproduction_efficiency') {
        contentPanel.innerHTML = UIEngine.renderReproductionTab();
      } else if (State.activeTab === 'farm_profitability_iofc') {
        contentPanel.innerHTML = UIEngine.renderEconomicsTab();
      }
    },

    // Lifecycle Destroy
    destroy() {
      if (State.chartResizeObserver) {
        State.chartResizeObserver.disconnect();
        State.chartResizeObserver = null;
      }
      if (State.containerElement) {
        State.containerElement.innerHTML = '';
        State.containerElement = null;
      }
      State.listenersBound = false;
      console.log('[DairyAnalytics] Module destroyed cleanly.');
    },

    // Export Herd Audit to CSV Format
    exportHerdPerformanceReport() {
      const records = State.lactationRecords;
      if (records.length === 0) {
        notify('निर्यात हेतु कोई डेटा उपलब्ध नहीं है।', 'warning');
        return;
      }

      const headers = ['Tag Number', 'Species', 'Breed', 'Lactation No', 'Calving Date', 'Days In Milk (DIM)', 'Current Daily Yield (L)', 'Fat %', 'SNF %', 'SCC Status', 'Repro Status', 'Days Open', 'AI Services'];
      const rows = records.map(r => [
        `"${r.animalTag}"`,
        `"${r.species}"`,
        `"${r.breed}"`,
        r.lactationNo,
        `"${r.calvingDate}"`,
        r.daysInMilk,
        r.currentDailyYield,
        r.fatPercent,
        r.snfPercent,
        `"${r.sccScore}"`,
        `"${r.reproductionStatus}"`,
        r.daysOpen,
        r.inseminationCount
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `Vetcare_Dairy_Herd_Audit_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      notify('डेयरी झुंड प्रदर्शन रिपोर्ट (CSV) डाउनलोड की गई।', 'success');
    },

    // Formal Printable Executive Dairy Audit Dossier
    printHerdHealthSummary() {
      const kpis = EconometricsEngine.computeHerdKPIs();
      const records = State.lactationRecords;
      const segments = EconometricsEngine.getActionableHerdSegments();

      const printWindow = window.open('', '_blank', 'width=950,height=800');
      if (!printWindow) {
        notify('प्रिंट विंडो पॉपअप अवरुद्ध हो गया है।', 'warning');
        return;
      }

      const reportHtml = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Executive Dairy Herd Audit Report - Vetcare AI OS</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; padding: 15px; font-size: 12px; }
            .header { text-align: center; border-bottom: 3px double #064e3b; padding-bottom: 10px; margin-bottom: 15px; }
            .crest { font-size: 22px; font-weight: 900; color: #064e3b; }
            .subcrest { font-size: 11px; text-transform: uppercase; color: #555; font-weight: bold; }
            .title { font-size: 16px; font-weight: bold; margin-top: 8px; text-decoration: underline; color: #047857; }
            .kpi-strip { display: flex; justify-content: space-between; margin-bottom: 15px; background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; }
            .kpi-item { text-align: center; }
            .kpi-item .val { font-size: 16px; font-weight: bold; color: #0f172a; }
            .kpi-item .lbl { font-size: 10px; color: #64748b; text-transform: uppercase; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px; }
            th, td { border: 1px solid #cbd5e1; padding: 6px 8px; font-size: 11px; text-align: left; }
            th { background-color: #f1f5f9; font-weight: bold; }
            .section-title { font-size: 13px; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 3px; margin-top: 15px; color: #1e293b; text-transform: uppercase; }
            .footer-sign { display: flex; justify-content: space-between; margin-top: 45px; }
            .sign-box { border-top: 1px solid #333; width: 220px; text-align: center; padding-top: 5px; font-size: 11px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="crest">VETCARE AI OS • LIVESTOCK HERD ECONOMETRICS</div>
            <div class="subcrest">Executive Dairy Performance, Lactation Persistency & Reproductive Audit (2026 Core)</div>
            <div class="title">वार्षिक/मासिक डेयरी फार्म उत्पादकता एवं स्वास्थ्य ऑडिट रिपोर्ट</div>
          </div>

          <div class="kpi-strip">
            <div class="kpi-item">
              <div class="val">${kpis.totalDailyBulkMilk} L</div>
              <div class="lbl">दैनिक कुल दूध उत्पादन</div>
            </div>
            <div class="kpi-item">
              <div class="val">${kpis.milkingPercent}%</div>
              <div class="lbl">दुधारू पशु अनुपात (In-Milk)</div>
            </div>
            <div class="kpi-item">
              <div class="val">${kpis.avgDIM} दिन</div>
              <div class="lbl">झुंड औसत DIM</div>
            </div>
            <div class="kpi-item">
              <div class="val">₹${kpis.netDailyIOFC.toLocaleString('en-IN')}</div>
              <div class="lbl">दैनिक चारा अधिशेष (IOFC)</div>
            </div>
            <div class="kpi-item">
              <div class="val">${kpis.avgDaysOpen} दिन</div>
              <div class="lbl">औसत खाली दिन (Days Open)</div>
            </div>
          </div>

          <div class="section-title">१. दुधारू पशु रजिस्टर एवं उत्पादन विवरण</div>
          <table>
            <thead>
              <tr>
                <th>टैग सं.</th>
                <th>प्रजाति / नस्ल</th>
                <th>ब्यात</th>
                <th>DIM (दिन)</th>
                <th>दैनिक दूध (L)</th>
                <th>FAT %</th>
                <th>SNF %</th>
                <th>प्रजनन स्थिति</th>
                <th>थनैला (SCC)</th>
              </tr>
            </thead>
            <tbody>
              ${records.map(r => `
                <tr>
                  <td><strong>${r.animalTag}</strong></td>
                  <td>${r.species}</td>
                  <td>${r.lactationNo}</td>
                  <td>${r.daysInMilk}</td>
                  <td><strong>${r.currentDailyYield}</strong></td>
                  <td>${r.fatPercent}%</td>
                  <td>${r.snfPercent}%</td>
                  <td>${r.reproductionStatus}</td>
                  <td>${r.sccScore}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="section-title">२. तत्काल कार्रवाई योग्य पशु (Action Herd Segments)</div>
          <table>
            <tr>
              <th style="width: 33%;">दूध बंद योग्य (Dry Off This Week): ${segments.dryOffCandidates.length}</th>
              <th style="width: 33%;">मद जांच व AI योग्य (Due Heat Check): ${segments.heatCheckDue.length}</th>
              <th style="width: 33%;">थनैला संदिग्ध (Mastitis / SCC Alert): ${segments.mastitisAlerts.length}</th>
            </tr>
            <tr>
              <td>${segments.dryOffCandidates.map(c => c.animalTag).join(', ') || 'कोई नहीं'}</td>
              <td>${segments.heatCheckDue.map(c => c.animalTag).join(', ') || 'कोई नहीं'}</td>
              <td>${segments.mastitisAlerts.map(c => c.animalTag).join(', ') || 'शून्य'}</td>
            </tr>
          </table>

          <div class="footer-sign">
            <div class="sign-box">
              हस्ताक्षर डेयरी फार्म प्रबंधक<br />
              (Dairy Farm Operations Manager)
            </div>
            <div class="sign-box">
              पशु चिकित्सा विशेषज्ञ / वी.ओ.<br />
              (Veterinary Herd Health Officer)
            </div>
          </div>

          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(reportHtml);
      printWindow.document.close();
    }
  };

})(window, document);
