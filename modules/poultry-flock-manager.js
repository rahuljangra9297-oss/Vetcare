// Vetcare AI OS - Commercial Poultry Health, Broiler FCR & Layer Flock Performance Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE REGISTRATION & ARCHITECTURAL ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // Commercial Poultry Breed Standards & Avian Necropsy Biomarkers
  window.VetcareApp.ClinicalData.PoultryBenchmarks = {
    BROILER_STANDARDS: {
      'Cobb 500': [
        { day: 0, weightGrams: 42, cumFeedKg: 0.000, targetFcr: 0.00 },
        { day: 7, weightGrams: 195, cumFeedKg: 0.175, targetFcr: 0.90 },
        { day: 14, weightGrams: 490, cumFeedKg: 0.540, targetFcr: 1.10 },
        { day: 21, weightGrams: 980, cumFeedKg: 1.225, targetFcr: 1.25 },
        { day: 28, weightGrams: 1580, cumFeedKg: 2.212, targetFcr: 1.40 },
        { day: 35, weightGrams: 2270, cumFeedKg: 3.518, targetFcr: 1.55 },
        { day: 42, weightGrams: 2980, cumFeedKg: 5.066, targetFcr: 1.70 }
      ],
      'Ross 308': [
        { day: 0, weightGrams: 42, cumFeedKg: 0.000, targetFcr: 0.00 },
        { day: 7, weightGrams: 200, cumFeedKg: 0.180, targetFcr: 0.90 },
        { day: 14, weightGrams: 505, cumFeedKg: 0.555, targetFcr: 1.10 },
        { day: 21, weightGrams: 1010, cumFeedKg: 1.262, targetFcr: 1.25 },
        { day: 28, weightGrams: 1620, cumFeedKg: 2.268, targetFcr: 1.40 },
        { day: 35, weightGrams: 2320, cumFeedKg: 3.596, targetFcr: 1.55 },
        { day: 42, weightGrams: 3040, cumFeedKg: 5.168, targetFcr: 1.70 }
      ]
    },

    AVIAN_DISEASE_REFERENCE: {
      'RANIKHET_NEWCASTLE': {
        name: 'Ranikhet Disease / Newcastle Disease (ND)',
        triggers: 'Daily mortality spike > 0.5%, torticollis (twisted neck), greenish watery diarrhoea',
        necropsyKeys: 'Petechial haemorrhages on the tips of proventricular glands, button-like necrotic ulcers in intestinal lymphoid patches (Peyer\'s patches), congested trachea with mucus.',
        biosecurityProtocol: 'Immediate emergency quarantine of shed. Disinfect water lines with chlorine dioxide. Restrict foot traffic. Emergency lentogenic clone booster spray if mortality onset < 12h.'
      },
      'GUMBORO_IBD': {
        name: 'Infectious Bursal Disease (Gumboro / IBD)',
        triggers: 'Sudden spike at 21-28 days age, vent picking, ruffled feathers, watery whitish diarrhoea',
        necropsyKeys: 'Enlarged, gelatinous or haemorrhagic Bursa of Fabricius with distinct longitudinal striations; muscular haemorrhages on thighs and pectorals; swollen pale kidneys with urates.',
        biosecurityProtocol: 'Provide electrolytic support and kidney tonics with liver stimulants. Strictly avoid antibiotics that increase renal stress. Sanitize litter using dry slaked lime.'
      },
      'COCCIDIOSIS': {
        name: 'Coccidiosis (Caecal & Intestinal)',
        triggers: 'Water intake reduction > 20%, bloody or orange mucoid droppings, huddling under brooders',
        necropsyKeys: 'Distended caeca filled with coagulated blood or necrotic cheesy cores (Eimeria tenella); ballooning of middle intestine with petechiae (E. necatrix).',
        biosecurityProtocol: 'Administer Toltrazuril (2.5% at 7 mg/kg body weight) or Amprolium in drinking water for 48 hours. Remove wet cake litter around drinkers immediately.'
      },
      'CHRONIC_RESPIRATORY_DISEASE': {
        name: 'CRD / Mycoplasmosis (Mycoplasma gallisepticum)',
        triggers: 'Persistent nocturnal snicking, nasal discharge, facial swelling, elevated FCR',
        necropsyKeys: 'Catarrhal tracheitis, caseous yellowish exudate in thoracic and abdominal air sacs (airsacculitis), pericarditis and perihepatitis in E. coli secondary complexes.',
        biosecurityProtocol: 'Tilmicosin / Tylosin water medication. Optimize shed ventilation rates without creating cold drafts on floor-level birds.'
      }
    }
  };

  // 2. INTERNAL REACTIVE STATE
  const State = {
    activeTab: 'flock_dashboard',
    activeFlockId: 'FLOCK-BR-2026-01',
    containerElement: null,
    dbInstance: null,
    listenersBound: false,
    chartResizeObserver: null,

    flocks: [],
    dailyLogs: [],

    // Seed Data Setup (Hydrated if storage is empty)
    seedData: {
      flocks: [
        {
          flockId: 'FLOCK-BR-2026-01',
          flockType: 'BROILER',
          breedName: 'Cobb 500',
          placementDate: new Date(Date.now() - 28 * 86400000).toISOString().split('T')[0],
          initialChicksCount: 5000,
          currentLiveCount: 4860,
          currentAgeDays: 28,
          shedNumber: 'Shed-1 (Climate Controlled)',
          feedCostPerKg: 38.5,
          birdSellingPricePerKg: 108.0,
          eggSellingPrice: 0.0
        },
        {
          flockId: 'FLOCK-LR-2026-02',
          flockType: 'LAYER',
          breedName: 'BV 300',
          placementDate: new Date(Date.now() - 224 * 86400000).toISOString().split('T')[0],
          initialChicksCount: 3500,
          currentLiveCount: 3410,
          currentAgeDays: 224, // 32 Weeks
          shedNumber: 'Shed-3 (Layer Battery)',
          feedCostPerKg: 32.0,
          birdSellingPricePerKg: 0.0,
          eggSellingPrice: 5.6
        },
        {
          flockId: 'FLOCK-KD-2026-03',
          flockType: 'INDIGENOUS_DESI',
          breedName: 'Kadaknath Pure',
          placementDate: new Date(Date.now() - 70 * 86400000).toISOString().split('T')[0],
          initialChicksCount: 1000,
          currentLiveCount: 965,
          currentAgeDays: 70,
          shedNumber: 'Shed-2 (Semi-Open Run)',
          feedCostPerKg: 34.0,
          birdSellingPricePerKg: 350.0,
          eggSellingPrice: 18.0
        }
      ],
      dailyLogs: [
        // Recent 5 days for Flock 1 (Broiler)
        {
          logId: 'LOG-7701',
          flockId: 'FLOCK-BR-2026-01',
          date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
          ageDays: 24,
          dailyMortalityCount: 6,
          culledCount: 2,
          feedConsumedKg: 520,
          waterConsumedLiters: 1150,
          avgBodyWeightGrams: 1220,
          eggsCollected: { total: 0, broken: 0, saleableGradeA: 0 },
          houseTempCelsius: 24.2,
          humidityPercent: 62,
          symptomsObserved: []
        },
        {
          logId: 'LOG-7702',
          flockId: 'FLOCK-BR-2026-01',
          date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
          ageDays: 25,
          dailyMortalityCount: 5,
          culledCount: 1,
          feedConsumedKg: 545,
          waterConsumedLiters: 1220,
          avgBodyWeightGrams: 1310,
          eggsCollected: { total: 0, broken: 0, saleableGradeA: 0 },
          houseTempCelsius: 24.0,
          humidityPercent: 64,
          symptomsObserved: []
        },
        {
          logId: 'LOG-7703',
          flockId: 'FLOCK-BR-2026-01',
          date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
          ageDays: 26,
          dailyMortalityCount: 7,
          culledCount: 2,
          feedConsumedKg: 575,
          waterConsumedLiters: 1290,
          avgBodyWeightGrams: 1400,
          eggsCollected: { total: 0, broken: 0, saleableGradeA: 0 },
          houseTempCelsius: 23.8,
          humidityPercent: 65,
          symptomsObserved: []
        },
        {
          logId: 'LOG-7704',
          flockId: 'FLOCK-BR-2026-01',
          date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
          ageDays: 27,
          dailyMortalityCount: 8,
          culledCount: 1,
          feedConsumedKg: 610,
          waterConsumedLiters: 1360,
          avgBodyWeightGrams: 1490,
          eggsCollected: { total: 0, broken: 0, saleableGradeA: 0 },
          houseTempCelsius: 24.5,
          humidityPercent: 66,
          symptomsObserved: []
        },
        {
          logId: 'LOG-7705',
          flockId: 'FLOCK-BR-2026-01',
          date: new Date().toISOString().split('T')[0],
          ageDays: 28,
          dailyMortalityCount: 9,
          culledCount: 2,
          feedConsumedKg: 640,
          waterConsumedLiters: 1440,
          avgBodyWeightGrams: 1580,
          eggsCollected: { total: 0, broken: 0, saleableGradeA: 0 },
          houseTempCelsius: 24.1,
          humidityPercent: 65,
          symptomsObserved: []
        },

        // Sample entry for Layer Flock 2
        {
          logId: 'LOG-8801',
          flockId: 'FLOCK-LR-2026-02',
          date: new Date().toISOString().split('T')[0],
          ageDays: 224,
          dailyMortalityCount: 2,
          culledCount: 1,
          feedConsumedKg: 390,
          waterConsumedLiters: 880,
          avgBodyWeightGrams: 1650,
          eggsCollected: { total: 3210, broken: 22, saleableGradeA: 3188 },
          houseTempCelsius: 25.0,
          humidityPercent: 60,
          symptomsObserved: []
        }
      ]
    }
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE)
  const StorageAdapter = {
    DB_NAME: 'VetcarePoultryDB',
    DB_VERSION: 1,
    STORE_NAME: 'poultry_flock_records',

    async initDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[PoultryEngine] IndexedDB unavailable, using LocalStorage fallback.');
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
          console.error('[PoultryEngine] IndexedDB Open Error:', event.target.error);
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
              localStorage.setItem('VETCARE_POULTRY_' + key, JSON.stringify(data));
              resolve(true);
            };
          } catch (e) {
            localStorage.setItem('VETCARE_POULTRY_' + key, JSON.stringify(data));
            resolve(true);
          }
        });
      } else {
        localStorage.setItem('VETCARE_POULTRY_' + key, JSON.stringify(data));
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
                const ls = localStorage.getItem('VETCARE_POULTRY_' + key);
                resolve(ls ? JSON.parse(ls) : null);
              }
            };
            req.onerror = () => {
              const ls = localStorage.getItem('VETCARE_POULTRY_' + key);
              resolve(ls ? JSON.parse(ls) : null);
            };
          } catch (e) {
            const ls = localStorage.getItem('VETCARE_POULTRY_' + key);
            resolve(ls ? JSON.parse(ls) : null);
          }
        });
      } else {
        const ls = localStorage.getItem('VETCARE_POULTRY_' + key);
        return Promise.resolve(ls ? JSON.parse(ls) : null);
      }
    }
  };

  // 4. MATHEMATICAL BIOMETRICS & AVIAN HEALTH ANALYTICS
  const PoultryMath = {
    // Cumulative Mortality % = (Deaths / Initial Count) * 100
    computeCumulativeMortality(initialCount, currentCount) {
      if (initialCount <= 0) return 0;
      const totalDead = Math.max(0, initialCount - currentCount);
      return Math.round((totalDead / initialCount) * 10000) / 100;
    },

    // Feed Conversion Ratio (FCR) = Cumulative Feed Consumed (kg) / Cumulative Live Biomass (kg)
    computeFCR(cumFeedKg, currentLiveCount, avgWeightGrams) {
      const currentBiomassKg = (currentLiveCount * avgWeightGrams) / 1000;
      if (currentBiomassKg <= 0 || cumFeedKg <= 0) return 1.45;
      return Math.round((cumFeedKg / currentBiomassKg) * 100) / 100;
    },

    // European Production Efficiency Factor (EPEF)
    computeEPEF(liveabilityPct, avgWeightKg, ageDays, fcr) {
      if (ageDays <= 0 || fcr <= 0) return 0;
      const epef = ((liveabilityPct * avgWeightKg) / (ageDays * fcr)) * 100;
      return Math.round(epef);
    },

    // Hen-Day Egg Production % (HDEP) = (Daily Eggs / Current Live Hens) * 100
    computeHDEP(dailyEggs, liveHens) {
      if (liveHens <= 0) return 0;
      return Math.round((dailyEggs / liveHens) * 1000) / 10;
    },

    // Water-to-Feed Ratio (Standard is 1.8 to 2.2 Liters per 1 kg feed)
    computeWaterFeedRatio(waterLiters, feedKg) {
      if (feedKg <= 0) return 2.0;
      return Math.round((waterLiters / feedKg) * 100) / 100;
    },

    // Aggregated Metrics for the currently active flock
    getFlockMetrics(flockId) {
      const flock = State.flocks.find(f => f.flockId === flockId);
      if (!flock) return null;

      const logs = State.dailyLogs.filter(l => l.flockId === flockId);
      logs.sort((a, b) => a.ageDays - b.ageDays);

      const latestLog = logs[logs.length - 1] || {
        avgBodyWeightGrams: 1500,
        feedConsumedKg: 500,
        waterConsumedLiters: 1100,
        eggsCollected: { total: 0, saleableGradeA: 0, broken: 0 },
        dailyMortalityCount: 0
      };

      // Cumulative Calculations
      let totalFeedConsumed = 0;
      let totalWaterConsumed = 0;
      let totalEggs = 0;
      let totalMortalityFromLogs = 0;

      logs.forEach(l => {
        totalFeedConsumed += l.feedConsumedKg;
        totalWaterConsumed += l.waterConsumedLiters;
        totalEggs += (l.eggsCollected?.total || 0);
        totalMortalityFromLogs += l.dailyMortalityCount;
      });

      // Baseline compensation if logs only cover recent days
      const estimatedCumFeed = totalFeedConsumed > 0 ? totalFeedConsumed : (flock.currentAgeDays * 0.08 * flock.currentLiveCount);
      const cumMortalityPct = PoultryMath.computeCumulativeMortality(flock.initialChicksCount, flock.currentLiveCount);
      const liveabilityPct = 100 - cumMortalityPct;
      const avgWeightKg = latestLog.avgBodyWeightGrams / 1000;
      const fcr = PoultryMath.computeFCR(estimatedCumFeed, flock.currentLiveCount, latestLog.avgBodyWeightGrams);
      const epef = PoultryMath.computeEPEF(liveabilityPct, avgWeightKg, flock.currentAgeDays, fcr);
      const hdep = PoultryMath.computeHDEP(latestLog.eggsCollected?.total || 0, flock.currentLiveCount);
      const waterFeedRatio = PoultryMath.computeWaterFeedRatio(latestLog.waterConsumedLiters, latestLog.feedConsumedKg);

      // Financials
      const totalFeedCost = estimatedCumFeed * flock.feedCostPerKg;
      const totalLiveMeatKg = (flock.currentLiveCount * latestLog.avgBodyWeightGrams) / 1000;
      const meatRevenue = totalLiveMeatKg * flock.birdSellingPricePerKg;
      const eggRevenue = totalEggs * flock.eggSellingPrice;
      const totalGrossRevenue = meatRevenue + eggRevenue;
      const netMargin = totalGrossRevenue - totalFeedCost;

      return {
        flock,
        latestLog,
        cumMortalityPct,
        liveabilityPct,
        fcr,
        epef,
        hdep,
        waterFeedRatio,
        estimatedCumFeed: Math.round(estimatedCumFeed),
        totalEggs,
        totalFeedCost: Math.round(totalFeedCost),
        totalGrossRevenue: Math.round(totalGrossRevenue),
        netMargin: Math.round(netMargin),
        marginPerBird: flock.currentLiveCount > 0 ? Math.round((netMargin / flock.currentLiveCount) * 10) / 10 : 0
      };
    },

    // Evaluates immediate epidemic alarms
    evaluateActiveAlarms(flockId) {
      const flock = State.flocks.find(f => f.flockId === flockId);
      if (!flock) return [];

      const logs = State.dailyLogs.filter(l => l.flockId === flockId);
      logs.sort((a, b) => a.ageDays - b.ageDays);

      const alarms = [];
      if (logs.length === 0) return alarms;

      const today = logs[logs.length - 1];
      const yesterday = logs.length >= 2 ? logs[logs.length - 2] : null;

      // 1. Mortality Spike Check (> 0.5% in 24 hours)
      const dailyMortalityPct = (today.dailyMortalityCount / flock.currentLiveCount) * 100;
      if (dailyMortalityPct >= 0.5) {
        alarms.push({
          level: 'CRITICAL',
          type: 'MORTALITY_SPIKE',
          title: 'तीव्र मृत्यु दर वृद्धि चेतावनी (Acute Mortality Spike > 0.5%)',
          desc: `आज ${today.dailyMortalityCount} पक्षियों की मृत्यु दर्ज हुई (${dailyMortalityPct.toFixed(2)}%)। यह रानीखेत (ND), आईबीडी (Gumboro) अथवा संक्रामक एवियन इन्फ्लूएंजा का लक्षण हो सकता है।`,
          diseaseKey: 'RANIKHET_NEWCASTLE'
        });
      }

      // 2. Sudden Water Consumption Drop (> 20% decline)
      if (yesterday && yesterday.waterConsumedLiters > 0) {
        const waterDropPct = ((yesterday.waterConsumedLiters - today.waterConsumedLiters) / yesterday.waterConsumedLiters) * 100;
        if (waterDropPct >= 20) {
          alarms.push({
            level: 'WARNING',
            type: 'WATER_DROP',
            title: 'जल सेवन में अचानक भारी गिरावट (Water Drop > 20%)',
            desc: `जल सेवन कल के ${yesterday.waterConsumedLiters}L से घटकर ${today.waterConsumedLiters}L रह गया (${waterDropPct.toFixed(1)}% गिरावट)। कॉक्सिडिओसिस अथवा चारे में विषाक्तता की प्रबल संभावना।`,
            diseaseKey: 'COCCIDIOSIS'
          });
        }
      }

      // 3. Water-to-Feed Ratio Imbalance
      const wfRatio = PoultryMath.computeWaterFeedRatio(today.waterConsumedLiters, today.feedConsumedKg);
      if (wfRatio > 2.8) {
        alarms.push({
          level: 'ADVISORY',
          type: 'HEAT_STRESS',
          title: 'जल-आहार अनुपात असामान्य (Water:Feed = ' + wfRatio + ':1)',
          desc: 'पक्षियों में भीषण गर्मी (Heat Stress) अथवा आंतों की जलन के लक्षण। शेड में फॉगर्स और विटामिन-सी इलेक्ट्रोलाइट चालू करें।',
          diseaseKey: 'CHRONIC_RESPIRATORY_DISEASE'
        });
      }

      return alarms;
    }
  };

  // 5. TOAST NOTIFICATION UTILITY
  function notify(msg, type = 'info') {
    if (window.VetcareApp && typeof window.VetcareApp.showToast === 'function') {
      window.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[PoultryEngine ${type.toUpperCase()}]: ${msg}`);
    }
  }

  // 6. UI COMPONENT RENDERING ENGINE
  const UIEngine = {
    // Root Shell Layout
    renderMainLayout() {
      const m = PoultryMath.getFlockMetrics(State.activeFlockId);
      if (!m) return '<div class="p-8 text-center text-rose-400">कोई सक्रिय पोल्ट्री फ्लॉक लोड नहीं हो सका।</div>';

      const f = m.flock;
      const isBroiler = f.flockType === 'BROILER' || f.flockType === 'INDIGENOUS_DESI';
      const alarms = PoultryMath.evaluateActiveAlarms(State.activeFlockId);

      return `
        <div class="poultry-engine-wrapper max-w-7xl mx-auto space-y-6">

          <!-- FLOCK SELECTOR & BATCH TELEMETRY STRIP -->
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl">
                <i class="fa-solid fa-feather-pointed"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-lg font-bold text-white">${f.flockId}</h2>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">${f.flockType}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono text-cyan-400 bg-slate-800 border border-slate-700">${f.breedName}</span>
                </div>
                <div class="text-xs text-slate-400 mt-0.5 font-mono">
                  ${f.shedNumber} • आयु: <strong class="text-emerald-400">${f.currentAgeDays} दिन</strong> • प्रारम्भिक चूजे: ${f.initialChicksCount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <!-- Flock Switcher Dropdown & Actions -->
            <div class="flex flex-wrap items-center gap-2">
              <select id="flockSelectorDropdown" class="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500">
                ${State.flocks.map(fl => `
                  <option value="${fl.flockId}" ${fl.flockId === State.activeFlockId ? 'selected' : ''}>
                    ${fl.flockId} (${fl.breedName} - ${fl.shedNumber})
                  </option>
                `).join('')}
              </select>
              <button type="button" id="btnOpenAddDailyLogModal" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md flex items-center gap-1.5 transition-transform active:scale-95">
                <i class="fa-solid fa-plus-circle"></i>
                <span>दैनिक लॉग दर्ज करें</span>
              </button>
              <button type="button" id="btnOpenNewFlockModal" class="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">
                + नया बैच
              </button>
            </div>
          </div>

          <!-- TOP PERFORMANCE RIBBON -->
          <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
            
            <!-- Metric 1: Current Live Birds -->
            <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
              <span class="text-[10px] font-mono uppercase text-slate-400 block">जीवित पक्षी (Liveability)</span>
              <div class="text-xl font-black font-display text-white mt-1">
                ${f.currentLiveCount.toLocaleString('en-IN')}
                <span class="text-[11px] font-sans font-normal text-emerald-400">(${m.liveabilityPct}%)</span>
              </div>
              <div class="text-[10px] text-slate-400 font-mono mt-0.5">कुल मृत्यु: ${m.cumMortalityPct}%</div>
            </div>

            <!-- Metric 2: Average Bird Weight -->
            <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
              <span class="text-[10px] font-mono uppercase text-slate-400 block">औसत शारीरिक वजन</span>
              <div class="text-xl font-black font-display text-cyan-400 mt-1">
                ${m.latestLog.avgBodyWeightGrams} <span class="text-xs font-normal text-slate-400 font-sans">ग्राम</span>
              </div>
              <div class="text-[10px] text-slate-400 font-mono mt-0.5">बायोमास: ${((f.currentLiveCount * m.latestLog.avgBodyWeightGrams)/1000).toFixed(0)} kg</div>
            </div>

            <!-- Metric 3: FCR (Broiler) or HDEP (Layer) -->
            <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
              <span class="text-[10px] font-mono uppercase text-slate-400 block">
                ${isBroiler ? 'संचयी FCR दर' : 'हेन-डे अंडा % (HDEP)'}
              </span>
              <div class="text-xl font-black font-display ${isBroiler ? 'text-amber-400' : 'text-purple-400'} mt-1">
                ${isBroiler ? m.fcr : m.hdep + '%'}
              </div>
              <div class="text-[10px] text-slate-400 font-mono mt-0.5">
                ${isBroiler ? 'दाना रूपांतरण अनुपात' : 'दैनिक अंडे: ' + (m.latestLog.eggsCollected?.total || 0)}
              </div>
            </div>

            <!-- Metric 4: EPEF Index / Water Ratio -->
            <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
              <span class="text-[10px] font-mono uppercase text-slate-400 block">
                ${isBroiler ? 'EPEF दक्षता सूचकांक' : 'जल:आहार अनुपात'}
              </span>
              <div class="text-xl font-black font-display text-emerald-400 mt-1">
                ${isBroiler ? m.epef : m.waterFeedRatio + ' : 1'}
              </div>
              <div class="text-[10px] text-slate-400 font-mono mt-0.5">
                ${isBroiler ? (m.epef >= 350 ? 'उत्कृष्ट (Optimal)' : 'सुधार योग्य') : 'मानक: 2:1'}
              </div>
            </div>

            <!-- Metric 5: Estimated Net Financial Margin -->
            <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md col-span-2 md:col-span-1">
              <span class="text-[10px] font-mono uppercase text-slate-400 block">अनुमानित शुद्ध मार्जिन</span>
              <div class="text-xl font-black font-display ${m.netMargin >= 0 ? 'text-emerald-400' : 'text-rose-400'} mt-1">
                ₹${m.netMargin.toLocaleString('en-IN')}
              </div>
              <div class="text-[10px] text-slate-400 font-mono mt-0.5">₹${m.marginPerBird} प्रति पक्षी</div>
            </div>

          </div>

          <!-- ACTIVE EPIDEMIC ALARMS BANNER (IF ANY TRIGGERED) -->
          ${alarms.length > 0 ? `
            <div class="space-y-2">
              ${alarms.map(a => `
                <div class="p-3.5 rounded-xl ${a.level === 'CRITICAL' ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200' : 'bg-amber-950/80 border border-amber-500 text-amber-200'} flex items-start gap-3 shadow-lg">
                  <div class="w-8 h-8 rounded-lg ${a.level === 'CRITICAL' ? 'bg-rose-600' : 'bg-amber-600'} text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                  </div>
                  <div class="flex-1">
                    <div class="font-bold text-xs uppercase tracking-wide">${a.title}</div>
                    <div class="text-xs mt-0.5 opacity-90">${a.desc}</div>
                  </div>
                  <button type="button" data-action="view_disease" data-key="${a.diseaseKey}" class="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-black/40 border border-white/20 text-white hover:bg-black/60">
                    प्रोटोकॉल देखें
                  </button>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- PRIMARY MODULE TABS -->
          <div class="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-3">
            <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button type="button" data-tab="flock_dashboard" class="poultry-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'flock_dashboard' ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-list-check"></i>
                <span>१. दैनिक उत्पादन लॉग</span>
              </button>
              <button type="button" data-tab="fcr_growth_curves" class="poultry-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'fcr_growth_curves' ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-chart-line"></i>
                <span>२. शारीरिक वजन व FCR कर्व</span>
              </button>
              <button type="button" data-tab="egg_production_analytics" class="poultry-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'egg_production_analytics' ? 'bg-purple-500 text-slate-950 shadow-md font-extrabold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-egg"></i>
                <span>३. अंडा उत्पादन विश्लेषण</span>
              </button>
              <button type="button" data-tab="poultry_disease_alarms" class="poultry-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'poultry_disease_alarms' ? 'bg-rose-500 text-slate-950 shadow-md font-extrabold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-virus-covid"></i>
                <span>४. एवियन पैथोलॉजी व चेतावनी गाइड</span>
              </button>
            </div>

            <button type="button" id="btnPrintFlockReport" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5">
              <i class="fa-solid fa-print text-amber-400"></i>
              <span>बैच क्लोज-आउट ऑडिट प्रिंट</span>
            </button>
          </div>

          <!-- TAB CONTENT PANEL HOOK -->
          <div id="poultryTabContentPanel" class="transition-opacity duration-200"></div>

          <!-- DYNAMIC MODAL CONTAINER -->
          <div id="poultryModalContainer"></div>
        </div>
      `;
    },

    // TAB 1: Daily Production Logs Table
    renderDailyLogsTab() {
      const logs = State.dailyLogs.filter(l => l.flockId === State.activeFlockId);
      logs.sort((a, b) => b.ageDays - a.ageDays);

      const rows = logs.map(l => `
        <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
          <td class="py-3 px-4 font-mono text-xs">
            <div class="text-white font-bold">${l.date}</div>
            <div class="text-[10px] text-slate-400">आयु: Day ${l.ageDays}</div>
          </td>
          <td class="py-3 px-4 font-mono text-xs">
            <span class="${l.dailyMortalityCount > 10 ? 'text-rose-400 font-bold' : 'text-slate-300'}">
              ${l.dailyMortalityCount} पक्षी
            </span>
            <span class="text-[10px] text-slate-400 block">छंटाई: ${l.culledCount}</span>
          </td>
          <td class="py-3 px-4 font-mono text-xs text-amber-300">
            ${l.feedConsumedKg} kg
            <span class="text-[10px] text-slate-400 block">${(l.feedConsumedKg/50).toFixed(1)} बोरी दाना</span>
          </td>
          <td class="py-3 px-4 font-mono text-xs text-cyan-300">
            ${l.waterConsumedLiters} L
            <span class="text-[10px] text-slate-400 block">अनुपात: ${PoultryMath.computeWaterFeedRatio(l.waterConsumedLiters, l.feedConsumedKg)} : 1</span>
          </td>
          <td class="py-3 px-4 font-mono text-xs text-emerald-400 font-bold">
            ${l.avgBodyWeightGrams} g
          </td>
          <td class="py-3 px-4 font-mono text-xs text-purple-300">
            ${l.eggsCollected?.total || 0}
            <span class="text-[10px] text-slate-400 block">टूटे: ${l.eggsCollected?.broken || 0}</span>
          </td>
          <td class="py-3 px-4 font-mono text-xs text-slate-300">
            ${l.houseTempCelsius}°C / ${l.humidityPercent}%
          </td>
        </tr>
      `).join('');

      return `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div class="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-clipboard-list text-amber-400"></i>
                <span>दैनिक शेड उत्पादन लॉग पंजी (Daily Shed Production Registry)</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">मृत्यु संख्या, दाना-पानी खपत, औसत वजन व तापमान का दैनिक रिकॉर्ड</p>
            </div>
            <span class="text-xs font-mono text-slate-400">${logs.length} प्रविष्टियां दर्ज</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                  <th class="py-3 px-4">दिनांक / आयु (Days)</th>
                  <th class="py-3 px-4">मृत्यु (Mortality)</th>
                  <th class="py-3 px-4">दाना खपत (Feed)</th>
                  <th class="py-3 px-4">जल सेवन (Water)</th>
                  <th class="py-3 px-4">औसत वजन (Weight)</th>
                  <th class="py-3 px-4">अंडे (Eggs)</th>
                  <th class="py-3 px-4">तापमान/नमी</th>
                </tr>
              </thead>
              <tbody>
                ${logs.length > 0 ? rows : '<tr><td colspan="7" class="p-8 text-center text-slate-400 text-xs font-mono">इस फ्लॉक का कोई दैनिक लॉग उपलब्ध नहीं है। ऊपर दिए बटन से लॉग दर्ज करें।</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // TAB 2: Canvas Broiler Growth & FCR Trajectory Visualizer
    renderFcrGrowthTab() {
      return `
        <div class="space-y-6">
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-chart-line text-cyan-400"></i>
                  <span>शारीरिक वजन विकास वकालत कर्व (Standard vs Actual Growth Curve)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  Cobb 500 / Ross 308 मानक ब्रोइलर विकास पथ बनाम फार्म पर दर्ज वास्तविक सैंपलिंग
                </p>
              </div>

              <div class="flex items-center gap-4 text-xs font-mono">
                <div class="flex items-center gap-1.5">
                  <span class="w-3 h-3 rounded-full bg-cyan-400"></span>
                  <span class="text-slate-300">मानक Cobb 500 लक्ष्य रेखा</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span class="text-slate-300">फार्म के वास्तविक सैंपलिंग बिंदु</span>
                </div>
              </div>
            </div>

            <!-- HTML5 Responsive Canvas -->
            <div class="w-full bg-slate-950 rounded-xl p-4 border border-slate-800">
              <canvas id="poultryGrowthCanvas" class="w-full h-80 block"></canvas>
            </div>

            <!-- FCR Technical Benchmarks Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-amber-400 font-mono font-bold block mb-1">१. लक्ष्य FCR &lt; 1.55</span>
                <p class="text-slate-300">35 दिन की आयु पर 2.2 kg वजन प्राप्त करने हेतु प्रति किलो वजन पर अधिकतम 1.55 kg दाना खपत आदर्श है।</p>
              </div>
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-cyan-400 font-mono font-bold block mb-1">२. यूरोपीय दक्षता सूचकांक (EPEF)</span>
                <p class="text-slate-300">EPEF &gt; 350 संतोषजनक तथा &gt; 400 अंतरराष्ट्रीय स्तर का उत्कृष्ट वाणिज्यिक उत्पादन दर्शाता है।</p>
              </div>
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-emerald-400 font-mono font-bold block mb-1">३. साप्ताहिक वेट सैंपलिंग नियम</span>
                <p class="text-slate-300">सटीक FCR मापन हेतु प्रत्येक सप्ताह शेड के 4 कोनों से न्यूनतम 50-50 पक्षियों का रैंडम खाली पेट वजन लें।</p>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // TAB 3: Layer Egg Production Analytics
    renderEggAnalyticsTab() {
      const logs = State.dailyLogs.filter(l => l.flockId === State.activeFlockId);
      const flock = State.flocks.find(f => f.flockId === State.activeFlockId);
      const isLayer = flock && flock.flockType === 'LAYER';

      let totalEggs = 0;
      let totalBroken = 0;
      let totalGradeA = 0;

      logs.forEach(l => {
        if (l.eggsCollected) {
          totalEggs += l.eggsCollected.total || 0;
          totalBroken += l.eggsCollected.broken || 0;
          totalGradeA += l.eggsCollected.saleableGradeA || 0;
        }
      });

      const breakageRate = totalEggs > 0 ? ((totalBroken / totalEggs) * 100).toFixed(2) : '0.00';

      return `
        <div class="space-y-6">
          <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-egg text-purple-400"></i>
                  <span>अंडा उत्पादन एवं लेयर दक्षता विश्लेषण (Layer Flock Performance)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">हेन-डे प्रतिशत (HDEP), अंडा कवच गुणवत्ता व टूट-फूट दर</p>
              </div>
              <span class="text-xs font-mono text-purple-400 bg-purple-950/60 border border-purple-800/80 px-3 py-1 rounded-lg">
                ${isLayer ? 'सक्रिय लेयर फ्लॉक' : 'ब्रॉयलर / देसी पक्षी'}
              </span>
            </div>

            <!-- Layer KPI Strip -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
              <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-slate-400 block text-[10px] uppercase">कुल उत्पादित अंडे</span>
                <span class="text-xl font-bold text-white mt-1 block">${totalEggs.toLocaleString('en-IN')}</span>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-slate-400 block text-[10px] uppercase">ग्रेड-ए विपणन योग्य</span>
                <span class="text-xl font-bold text-emerald-400 mt-1 block">${totalGradeA.toLocaleString('en-IN')}</span>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-slate-400 block text-[10px] uppercase">टूटे/दरार युक्त अंडे</span>
                <span class="text-xl font-bold text-rose-400 mt-1 block">${totalBroken.toLocaleString('en-IN')}</span>
                <span class="text-[10px] text-slate-400">टूट-फूट दर: ${breakageRate}%</span>
              </div>
              <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span class="text-slate-400 block text-[10px] uppercase">अंडा विक्रय राजस्व</span>
                <span class="text-xl font-bold text-amber-400 mt-1 block">₹${(totalGradeA * (flock?.eggSellingPrice || 5.5)).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <!-- Quality Recommendations -->
            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div class="font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-bone text-cyan-400"></i>
                <span>अंडा छिलका मजबूती एवं खनिज संतुलन (Shell Integrity Protocols):</span>
              </div>
              <p class="text-slate-300 leading-relaxed">
                यदि कवच टूट-फूट दर &gt; 1.5% से अधिक हो तो चारे में मोटे दानेदार चूना पत्थर (Limestone Grit / Calcite) का अनुपात 60:40 रखें तथा सायंकाल 4 बजे अतिरिक्त चूना ग्रिट प्रदान करें। विटामिन डी-३ (1,25-dihydroxy D3) व फाइटेज एंजाइम का नियमित प्रयोग सुनिश्चित करें।
              </p>
            </div>
          </div>
        </div>
      `;
    },

    // TAB 4: Avian Pathology & Biosecurity Reference Guide
    renderDiseaseAlarmsTab() {
      const ref = window.VetcareApp.ClinicalData.PoultryBenchmarks.AVIAN_DISEASE_REFERENCE;

      return `
        <div class="space-y-4">
          <div class="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-virus-covid text-rose-400"></i>
              <span>व्यावसायिक पोल्ट्री संक्रामक रोग एवं शव-परीक्षण (Avian Necropsy Diagnostics)</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">
              तीव्र मृत्यु अथवा उत्पादन गिरावट के समय विशिष्ट आंतरिक अंगों के रोगसूचक घाव (Pathognomonic Lesions)
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${Object.entries(ref).map(([key, d]) => `
              <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-lg space-y-2.5">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-bold text-rose-400">${d.name}</h4>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">BIO-ALERT</span>
                </div>
                <div class="text-xs text-amber-300/90 font-mono">
                  <strong>अलार्म ट्रिगर:</strong> ${d.triggers}
                </div>
                <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                  <strong class="text-rose-300 block mb-1">पोस्टमार्टम मुख्य घाव (Necropsy Keys):</strong>
                  ${d.necropsyKeys}
                </div>
                <div class="text-[11px] text-slate-400">
                  <strong class="text-emerald-400">जैव-सुरक्षा व उपचार:</strong> ${d.biosecurityProtocol}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  };

  // 7. CANVAS GROWTH CURVE GRAPH ENGINE (PURE HTML5 CANVAS)
  function renderGrowthCurveCanvas() {
    const canvas = document.getElementById('poultryGrowthCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina Scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const padLeft = 50;
    const padRight = 20;
    const padTop = 20;
    const padBottom = 35;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    const maxDays = 42;
    const maxWeight = 3200; // grams

    const getX = (day) => padLeft + (day / maxDays) * chartW;
    const getY = (grams) => padTop + chartH - (grams / maxWeight) * chartH;

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.font = '10px monospace';
    ctx.fillStyle = '#64748b';

    // Horizontal Y Grid (every 500g)
    for (let g = 0; g <= maxWeight; g += 500) {
      const yPos = getY(g);
      ctx.beginPath();
      ctx.moveTo(padLeft, yPos);
      ctx.lineTo(width - padRight, yPos);
      ctx.stroke();
      ctx.fillText(g + 'g', 10, yPos + 3);
    }

    // Vertical X Grid (every 7 days)
    for (let d = 0; d <= maxDays; d += 7) {
      const xPos = getX(d);
      ctx.beginPath();
      ctx.moveTo(xPos, padTop);
      ctx.lineTo(xPos, padTop + chartH);
      ctx.stroke();
      ctx.fillText('D' + d, xPos - 8, height - 12);
    }

    // Draw Standard Cobb 500 Curve (Cyan Line)
    const stdData = window.VetcareApp.ClinicalData.PoultryBenchmarks.BROILER_STANDARDS['Cobb 500'];
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    stdData.forEach((pt, idx) => {
      const px = getX(pt.day);
      const py = getY(pt.weightGrams);
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Draw Actual Farm Sampling Data Points (Emerald Dots)
    const logs = State.dailyLogs.filter(l => l.flockId === State.activeFlockId);
    logs.sort((a, b) => a.ageDays - b.ageDays);

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let first = true;
    logs.forEach(l => {
      if (l.avgBodyWeightGrams > 0) {
        const lx = getX(l.ageDays);
        const ly = getY(l.avgBodyWeightGrams);
        if (first) {
          ctx.moveTo(lx, ly);
          first = false;
        } else {
          ctx.lineTo(lx, ly);
        }
      }
    });
    ctx.stroke();

    // Plot Points with Outer Glow
    logs.forEach(l => {
      if (l.avgBodyWeightGrams > 0) {
        const lx = getX(l.ageDays);
        const ly = getY(l.avgBodyWeightGrams);

        ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
        ctx.beginPath();
        ctx.arc(lx, ly, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(lx, ly, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f8fafc';
        ctx.font = '9px monospace';
        ctx.fillText(l.avgBodyWeightGrams + 'g', lx + 5, ly - 4);
      }
    });
  }

  // 8. MODAL CONTROLLERS (ZERO-PLACEHOLDER FAST INPUT STACK)
  const ModalController = {
    closeModal() {
      const container = document.getElementById('poultryModalContainer');
      if (container) container.innerHTML = '';
    },

    // Daily Production Log Fast Entry Modal
    openAddDailyLogModal() {
      const container = document.getElementById('poultryModalContainer');
      if (!container) return;

      const flock = State.flocks.find(f => f.flockId === State.activeFlockId);
      const nextAge = flock ? flock.currentAgeDays + 1 : 1;

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-amber-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <i class="fa-solid fa-feather"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">दैनिक पोल्ट्री उत्पादन लॉग दर्ज करें</h3>
              </div>
              <button type="button" id="btnModalCloseLog" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddDailyLog" class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">दिनांक (Log Date)*</label>
                  <input type="date" id="log_date" value="${new Date().toISOString().split('T')[0]}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">पक्षी आयु (Age in Days)*</label>
                  <input type="number" id="log_age" value="${nextAge}" min="1" max="600" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">दैनिक मृत्यु संख्या (Mortality)*</label>
                  <input type="number" id="log_mortality" value="0" min="0" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-rose-400 font-bold font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">छंटाई / कमजोर पक्षी (Culls)</label>
                  <input type="number" id="log_culls" value="0" min="0" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">दाना खपत (Feed Consumed in Kg)*</label>
                  <input type="number" step="0.5" id="log_feed" required placeholder="उदा. 640" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">जल सेवन (Water Consumed Liters)*</label>
                  <input type="number" id="log_water" required placeholder="उदा. 1400" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 font-bold font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">औसत शारीरिक वजन (Grams)*</label>
                  <input type="number" id="log_weight" required placeholder="उदा. 1580" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">कुल एकत्रित अंडे (Layer Flocks)</label>
                  <input type="number" id="log_eggs" value="0" min="0" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-purple-300 font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">शेड तापमान (°C)</label>
                  <input type="number" step="0.1" id="log_temp" value="24.0" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">आर्द्रता (Humidity %)</label>
                  <input type="number" id="log_humidity" value="65" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelLogModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md">दैनिक लॉग सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseLog').onclick = ModalController.closeModal;
      document.getElementById('btnCancelLogModal').onclick = ModalController.closeModal;

      document.getElementById('formAddDailyLog').onsubmit = async (e) => {
        e.preventDefault();
        const dateVal = document.getElementById('log_date').value;
        const ageVal = parseInt(document.getElementById('log_age').value, 10);
        const mortVal = parseInt(document.getElementById('log_mortality').value, 10);
        const cullVal = parseInt(document.getElementById('log_culls').value, 10);
        const feedVal = parseFloat(document.getElementById('log_feed').value);
        const waterVal = parseFloat(document.getElementById('log_water').value);
        const weightVal = parseFloat(document.getElementById('log_weight').value);
        const eggsVal = parseInt(document.getElementById('log_eggs').value, 10);
        const tempVal = parseFloat(document.getElementById('log_temp').value);
        const humVal = parseInt(document.getElementById('log_humidity').value, 10);

        const newLog = {
          logId: 'LOG-' + Math.floor(1000 + Math.random() * 9000),
          flockId: State.activeFlockId,
          date: dateVal,
          ageDays: ageVal,
          dailyMortalityCount: mortVal,
          culledCount: cullVal,
          feedConsumedKg: feedVal,
          waterConsumedLiters: waterVal,
          avgBodyWeightGrams: weightVal,
          eggsCollected: { total: eggsVal, broken: 0, saleableGradeA: eggsVal },
          houseTempCelsius: tempVal,
          humidityPercent: humVal,
          symptomsObserved: []
        };

        // Update flock state (subtract mortality, advance age)
        if (flock) {
          flock.currentLiveCount = Math.max(0, flock.currentLiveCount - mortVal - cullVal);
          flock.currentAgeDays = Math.max(flock.currentAgeDays, ageVal);
        }

        State.dailyLogs.push(newLog);
        await StorageAdapter.setItem('dailyLogs', State.dailyLogs);
        await StorageAdapter.setItem('flocks', State.flocks);

        ModalController.closeModal();
        notify(`दिन ${ageVal} का लॉग सफलतापूर्वक सुरक्षित किया गया।`, 'success');
        window.VetcareApp.Modules.PoultryFlockManager.refreshView();
      };
    },

    // New Flock Registration Modal
    openNewFlockModal() {
      const container = document.getElementById('poultryModalContainer');
      if (!container) return;

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 class="font-display font-bold text-base text-white">नया पोल्ट्री बैच पंजीकृत करें</h3>
              <button type="button" id="btnModalCloseNewFlock" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formNewFlock" class="space-y-4">
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">फ्लॉक आईडी (Batch Tag)*</label>
                <input type="text" id="flk_id" value="FLOCK-BR-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रकार (Type)*</label>
                  <select id="flk_type" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="BROILER">ब्रॉयलर (Broiler Meat)</option>
                    <option value="LAYER">लेयर (Commercial Egg)</option>
                    <option value="INDIGENOUS_DESI">कड़कनाथ / देसी (Desi)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">नस्ल (Breed)*</label>
                  <input type="text" id="flk_breed" value="Cobb 500" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">चूजे संख्या (Count)*</label>
                  <input type="number" id="flk_count" value="5000" min="10" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">शेड नंबर*</label>
                  <input type="text" id="flk_shed" value="Shed-1" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelNewFlock" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md">बैच शुरू करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseNewFlock').onclick = ModalController.closeModal;
      document.getElementById('btnCancelNewFlock').onclick = ModalController.closeModal;

      document.getElementById('formNewFlock').onsubmit = async (e) => {
        e.preventDefault();
        const idVal = document.getElementById('flk_id').value.trim();
        const typeVal = document.getElementById('flk_type').value;
        const breedVal = document.getElementById('flk_breed').value.trim();
        const countVal = parseInt(document.getElementById('flk_count').value, 10);
        const shedVal = document.getElementById('flk_shed').value.trim();

        const newFlock = {
          flockId: idVal,
          flockType: typeVal,
          breedName: breedVal,
          placementDate: new Date().toISOString().split('T')[0],
          initialChicksCount: countVal,
          currentLiveCount: countVal,
          currentAgeDays: 1,
          shedNumber: shedVal,
          feedCostPerKg: 38.0,
          birdSellingPricePerKg: 105.0,
          eggSellingPrice: typeVal === 'LAYER' ? 5.5 : 0.0
        };

        State.flocks.unshift(newFlock);
        State.activeFlockId = idVal;
        await StorageAdapter.setItem('flocks', State.flocks);

        ModalController.closeModal();
        notify(`नया फ्लॉक ${idVal} सफलतापूर्वक पंजीकृत हुआ।`, 'success');
        window.VetcareApp.Modules.PoultryFlockManager.refreshView();
      };
    }
  };

  // 9. EVENT BINDINGS & DELEGATION
  function bindDOMEvents(container) {
    if (State.listenersBound) return;

    container.addEventListener('click', async (e) => {
      // Tab Navigation
      const tabBtn = e.target.closest('.poultry-tab-btn');
      if (tabBtn) {
        const targetTab = tabBtn.getAttribute('data-tab');
        if (targetTab && targetTab !== State.activeTab) {
          State.activeTab = targetTab;
          window.VetcareApp.Modules.PoultryFlockManager.refreshView();
        }
        return;
      }

      // Open Add Daily Log Modal
      if (e.target.closest('#btnOpenAddDailyLogModal')) {
        ModalController.openAddDailyLogModal();
        return;
      }

      // Open New Flock Modal
      if (e.target.closest('#btnOpenNewFlockModal')) {
        ModalController.openNewFlockModal();
        return;
      }

      // Print Closeout Dossier
      if (e.target.closest('#btnPrintFlockReport')) {
        window.VetcareApp.Modules.PoultryFlockManager.exportFlockPerformanceSummary(State.activeFlockId);
        return;
      }

      // Jump to Disease Tab
      const diseaseBtn = e.target.closest('button[data-action="view_disease"]');
      if (diseaseBtn) {
        State.activeTab = 'poultry_disease_alarms';
        window.VetcareApp.Modules.PoultryFlockManager.refreshView();
        return;
      }
    });

    // Flock Dropdown Switcher
    container.addEventListener('change', (e) => {
      if (e.target.id === 'flockSelectorDropdown') {
        State.activeFlockId = e.target.value;
        notify(`फ्लॉक ${State.activeFlockId} चयनित।`, 'info');
        window.VetcareApp.Modules.PoultryFlockManager.refreshView();
        return;
      }
    });

    State.listenersBound = true;
  }

  // 10. PUBLIC API & LIFECYCLE IMPLEMENTATION
  window.VetcareApp.Modules.PoultryFlockManager = {
    // Lifecycle Init
    async init() {
      try {
        await StorageAdapter.initDB();

        const savedFlocks = await StorageAdapter.getItem('flocks');
        State.flocks = Array.isArray(savedFlocks) && savedFlocks.length > 0 ? savedFlocks : State.seedData.flocks;

        const savedLogs = await StorageAdapter.getItem('dailyLogs');
        State.dailyLogs = Array.isArray(savedLogs) && savedLogs.length > 0 ? savedLogs : State.seedData.dailyLogs;

        if (State.flocks.length > 0 && !State.activeFlockId) {
          State.activeFlockId = State.flocks[0].flockId;
        }

        console.log('[PoultryEngine] Module initialized with', State.flocks.length, 'flocks.');
      } catch (err) {
        console.error('[PoultryEngine] Init Error:', err);
      }
    },

    // Lifecycle Render
    render(containerId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error(`[PoultryEngine] Container ${containerId} not found.`);
        return;
      }

      State.containerElement = container;
      this.refreshView();
      bindDOMEvents(container);

      // Handle Canvas Responsive Redraws
      if (window.ResizeObserver && !State.chartResizeObserver) {
        State.chartResizeObserver = new ResizeObserver(() => {
          if (State.activeTab === 'fcr_growth_curves') {
            renderGrowthCurveCanvas();
          }
        });
        State.chartResizeObserver.observe(container);
      }
    },

    // Fast View Refresh
    refreshView() {
      if (!State.containerElement) return;

      State.containerElement.innerHTML = UIEngine.renderMainLayout();
      const panel = State.containerElement.querySelector('#poultryTabContentPanel');
      if (!panel) return;

      if (State.activeTab === 'flock_dashboard') {
        panel.innerHTML = UIEngine.renderDailyLogsTab();
      } else if (State.activeTab === 'fcr_growth_curves') {
        panel.innerHTML = UIEngine.renderFcrGrowthTab();
        requestAnimationFrame(() => renderGrowthCurveCanvas());
      } else if (State.activeTab === 'egg_production_analytics') {
        panel.innerHTML = UIEngine.renderEggAnalyticsTab();
      } else if (State.activeTab === 'poultry_disease_alarms') {
        panel.innerHTML = UIEngine.renderDiseaseAlarmsTab();
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
      console.log('[PoultryEngine] Module destroyed cleanly.');
    },

    // Batch Close-Out Official Audit Dossier
    exportFlockPerformanceSummary(flockId) {
      const m = PoultryMath.getFlockMetrics(flockId);
      if (!m) {
        notify('फ्लॉक विवरण अप्राप्य है।', 'error');
        return;
      }

      const f = m.flock;
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
          <title>Poultry Flock Close-Out Dossier - ${f.flockId}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.4; padding: 15px; font-size: 12px; }
            .header { text-align: center; border-bottom: 3px double #b45309; padding-bottom: 8px; margin-bottom: 15px; }
            .crest { font-size: 20px; font-weight: 900; color: #92400e; }
            .subcrest { font-size: 11px; text-transform: uppercase; color: #555; font-weight: bold; }
            .title { font-size: 15px; font-weight: bold; margin-top: 6px; text-decoration: underline; color: #b45309; }
            .meta-grid { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            .meta-grid th, .meta-grid td { border: 1px solid #cbd5e1; padding: 6px 10px; font-size: 11px; text-align: left; }
            .meta-grid th { background-color: #fef3c7; width: 28%; font-weight: bold; }
            .kpi-row { display: flex; justify-content: space-between; background: #fffbeb; border: 1px solid #fde68a; padding: 12px; border-radius: 6px; margin-bottom: 15px; }
            .kpi-box { text-align: center; }
            .kpi-box .val { font-size: 18px; font-weight: bold; color: #78350f; }
            .kpi-box .lbl { font-size: 10px; color: #92400e; text-transform: uppercase; }
            .financial-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .financial-table th, .financial-table td { border: 1px solid #cbd5e1; padding: 6px 8px; font-size: 11px; }
            .financial-table th { background: #f8fafc; font-weight: bold; }
            .footer-sign { display: flex; justify-content: space-between; margin-top: 50px; }
            .sign-box { border-top: 1px solid #333; width: 220px; text-align: center; padding-top: 5px; font-size: 11px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="crest">VETCARE AI OS • COMMERCIAL AVIAN PRODUCTION NETWORK</div>
            <div class="subcrest">Broiler European Production Efficiency Factor (EPEF) & Layer Flock Close-Out Audit (2026 Core)</div>
            <div class="title">आधिकारिक पोल्ट्री बैच क्लोज-आउट एवं वित्तीय लाभ-हानि प्रमाण-पत्र</div>
          </div>

          <div class="kpi-row">
            <div class="kpi-box">
              <div class="val">${m.liveabilityPct}%</div>
              <div class="lbl">जीवितता (Liveability)</div>
            </div>
            <div class="kpi-box">
              <div class="val">${m.fcr}</div>
              <div class="lbl">संचयी FCR दर</div>
            </div>
            <div class="kpi-box">
              <div class="val">${m.epef}</div>
              <div class="lbl">EPEF दक्षता सूचकांक</div>
            </div>
            <div class="kpi-box">
              <div class="val">${m.latestLog.avgBodyWeightGrams} g</div>
              <div class="lbl">अंतिम औसत वजन</div>
            </div>
            <div class="kpi-box">
              <div class="val">₹${m.marginPerBird}</div>
              <div class="lbl">शुद्ध मार्जिन प्रति पक्षी</div>
            </div>
          </div>

          <table class="meta-grid">
            <tr>
              <th>बैच पहचान (Flock ID)</th>
              <td><strong>${f.flockId}</strong> (${f.shedNumber})</td>
            </tr>
            <tr>
              <th>प्रजाति / नस्ल (Breed)</th>
              <td>${f.flockType} • ${f.breedName}</td>
            </tr>
            <tr>
              <th>प्रवेश तिथि एवं आयु</th>
              <td>${f.placementDate} (आयु: ${f.currentAgeDays} दिन)</td>
            </tr>
            <tr>
              <th>प्रारम्भिक चूजे / वर्तमान जीवित</th>
              <td>${f.initialChicksCount.toLocaleString('en-IN')} / <strong>${f.currentLiveCount.toLocaleString('en-IN')}</strong> पक्षी</td>
            </tr>
            <tr>
              <th>कुल दाना खपत (Feed Consumed)</th>
              <td>${m.estimatedCumFeed.toLocaleString('en-IN')} kg (${(m.estimatedCumFeed / 50).toFixed(0)} बोरी)</td>
            </tr>
          </table>

          <div style="font-weight: bold; margin-bottom: 5px; text-transform: uppercase;">वित्तीय एवं उत्पादन विवरण (Economics & Biomass):</div>
          <table class="financial-table">
            <tr>
              <td>कुल उत्पादित जीवित बायोमास (Live Meat Biomass)</td>
              <td style="text-align: right; font-weight: bold;">${((f.currentLiveCount * m.latestLog.avgBodyWeightGrams)/1000).toFixed(1)} kg</td>
            </tr>
            <tr>
              <td>सकल अनुमानित राजस्व (Gross Sales Revenue)</td>
              <td style="text-align: right; color: #047857; font-weight: bold;">₹${m.totalGrossRevenue.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td>कुल आहार लागत (Feed Production Cost @ ₹${f.feedCostPerKg}/kg)</td>
              <td style="text-align: right; color: #b91c1c;">- ₹${m.totalFeedCost.toLocaleString('en-IN')}</td>
            </tr>
            <tr style="background: #f1f5f9; font-weight: bold;">
              <td>अनुमानित शुद्ध फार्म लाभ (Net Production Margin)</td>
              <td style="text-align: right; font-size: 13px; color: #047857;">₹${m.netMargin.toLocaleString('en-IN')}</td>
            </tr>
          </table>

          <div class="footer-sign">
            <div class="sign-box">
              हस्ताक्षर पोल्ट्री फार्म प्रबंधक<br />
              (Commercial Poultry Farm Manager)
            </div>
            <div class="sign-box">
              अधिकृत एवियन वेटरनरी सलाहकार<br />
              (Avian Veterinary Consultant / V.O.)
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
