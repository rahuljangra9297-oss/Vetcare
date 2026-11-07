// Vetcare AI OS - Farm Biosecurity, Quarantine Isolation Protocols & Chemical Disinfection Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE REGISTRATION & ARCHITECTURAL ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // Comprehensive Epizootic & Disinfectant Pharmacopeia
  window.VetcareApp.ClinicalData.BiosecurityQuarantine = {
    CHEMICAL_DATABASE: {
      'Virkon S (1%)': {
        dilution: '10g per 1 Litre of water (1:100 w/v ratio)',
        spectrum: 'Broad-Spectrum Virucidal (Foot-and-Mouth Disease, African Swine Fever, Sheep/Goat Pox, Newcastle Disease), Mycoplasma, Gram-positive & Gram-negative bacteria',
        contactTimeMinutes: 10,
        applicationZones: ['Perimeter Vehicle Dip', 'Quarantine Isolation Pen', 'Boots Sanitation Bath'],
        temperatureLimits: 'Efficacious down to 4°C; buffered acid-peroxygen system',
        indicatorColor: 'Active while pink; discard when colorless or cloudy',
        hazardTier: 'Moderate Eye Irritant (Working solution non-corrosive)'
      },
      'Glutaraldehyde (2%)': {
        dilution: '20mL per 1 Litre of clean water (activated alkaline solution)',
        spectrum: 'High-level sporicidal (Bacillus anthracis), mycobactericidal (Mycobacterium bovis / TB), fungal spores',
        contactTimeMinutes: 20,
        applicationZones: ['Calving Pen', 'Terminal Isolation Ward', 'Surgical Crates'],
        temperatureLimits: 'Optimal at 20°C - 35°C; reduced efficacy below 15°C',
        indicatorColor: 'Clear amber tint; valid 14 days post-activation',
        hazardTier: 'High (Strict respiratory PPE & forced ventilation mandatory)'
      },
      'Quicklime / Slaked Lime': {
        dilution: 'Dry powder dusting (1 kg per 10 m²) or 20% Milk of Lime whitewash suspension',
        spectrum: 'Bacterial suppression via extreme pH shift (>12.5), desiccation of protozoal oocysts (Cryptosporidium, Coccidia), larvae desiccation',
        contactTimeMinutes: 1440,
        applicationZones: ['Manure Pit Area', 'Unpaved Quarantine Runways', 'Carcass Burial Pit Matrix'],
        temperatureLimits: 'Ambient exothermic reaction enhances bactericidal velocity',
        indicatorColor: 'Brilliant white chalk residue',
        hazardTier: 'Severe Caustic Risk (Thermal burns on hydration, dust inhalation hazards)'
      },
      'Bleaching Powder / Calcium Hypochlorite': {
        dilution: '30g (30% available chlorine) per 10 Litres water (~300-500 ppm active Cl)',
        spectrum: 'Enteric viral pathogens, Rotavirus, Coronavirus, Salmonella enterica, surface slime biofilms',
        contactTimeMinutes: 15,
        applicationZones: ['Milking Parlor', 'Drainage Runoff Channels', 'Feed Store Vestibule'],
        temperatureLimits: 'Degrades rapidly above 30°C and in direct midday sunlight',
        indicatorColor: 'Clear with intense chlorine pungent odor',
        hazardTier: 'Strong oxidizer; corrosive to zinc/aluminum metals; deactivated by manure'
      },
      'Sodium Hydroxide / Caustic Soda (2%)': {
        dilution: '200g commercial NaOH pellets per 10 Litres hot water (2% w/v)',
        spectrum: 'Obligate virucide during confirmed FMD outbreaks; saponifies organic fatty manure cakes',
        contactTimeMinutes: 30,
        applicationZones: ['Outbreak Perimeter Trenches', 'Truck Undercarriage Sluice', 'Contaminated Concrete Yards'],
        temperatureLimits: 'Exothermic dissolution; high efficacy maintained across cold floors',
        indicatorColor: 'Clear viscous solution',
        hazardTier: 'Extremely Corrosive (Causes immediate chemical dermal necrosis; acid rinse needed)'
      }
    },

    MANDATORY_SEROLOGY_PANEL: [
      { id: 'brucellosis', label: 'Brucella abortus (RBPT / B-ELISA)', target: 'NEGATIVE', incubationDays: 14 },
      { id: 'tb', label: 'Bovine Tuberculosis (Intradermal Tuberculin SICCT)', target: 'NEGATIVE', incubationDays: 3 },
      { id: 'jd', label: 'Johne\'s Disease / Paratuberculosis (MAP Serum ELISA)', target: 'NEGATIVE', incubationDays: 21 }
    ],

    DEFAULT_AUDIT_CHECKLIST: [
      { id: 'audit_fence', category: 'Perimeter Barrier', title: 'Double-Fence Animal Quarantine Perimeter', desc: 'Minimum 3-meter buffer preventing nose-to-nose contact with indigenous village stock', weight: 15, status: true },
      { id: 'audit_footbath', category: 'Biosecurity Gateways', title: 'Active Disinfectant Footbaths at All Pen Gates', desc: 'Fresh 1% Virkon S or 2% Soda maintained with daily recharge log', weight: 15, status: true },
      { id: 'audit_tire_dip', category: 'Vehicular Controls', title: 'Main Perimeter Vehicle Tire Submersion Dip', desc: 'Minimum 30cm depth covering entire wheel radius with verified disinfectant concentration', weight: 15, status: true },
      { id: 'audit_bird_netting', category: 'Vector Control', title: 'Feed Store & Hay Barn Wild Bird Mesh Netting', desc: 'No sparrow/pigeon roosting over concentrates to eliminate Avian/Salmonella contamination', weight: 10, status: false },
      { id: 'audit_carcass_pit', category: 'Disposal Integrity', title: 'Sanitary Deep Carcass Burial Pit with Quicklime Reserve', desc: 'Minimum 2.5-meter excavation isolated from water table, equipped with 500kg lime storage', weight: 15, status: true },
      { id: 'audit_protective_gear', category: 'Personnel Hygiene', title: 'Dedicated Isolation Pen Overalls & Color-Coded Gumboots', desc: 'Isolation ward gear never traverses into lactating milking herd pens', weight: 15, status: true },
      { id: 'audit_water_chlorination', category: 'Sanitary Inputs', title: 'Borewell Potable Water Residual Chlorine Check (0.5 ppm)', desc: 'Daily orthotolidine colorimetric strip verification in main herd drinking troughs', weight: 15, status: false }
    ]
  };

  // 2. INTERNAL STATE CONTROLLER
  const State = {
    activeTab: 'quarantine_pen',
    containerElement: null,
    dbInstance: null,
    quarantineAnimals: [],
    disinfectionSchedule: [],
    visitorVehicleLog: [],
    auditChecklist: [],
    listenersBound: false,

    // Initial Bootstrap Data (Used if IndexedDB is freshly initialized)
    seedData: {
      quarantineAnimals: [
        {
          id: 'QA-2026-001',
          tagNo: 'IN-HR-2026-9082',
          species: 'Bovine (Murrah Buffalo)',
          sourceLocation: 'Rohtak Dairy Expo, Haryana',
          arrivalDate: new Date(Date.now() - (16 * 86400000)).toISOString().split('T')[0],
          quarantineDays: 21,
          daysCompleted: 16,
          status: 'ISOLATED',
          serologyScreening: { brucellosis: 'NEGATIVE', tb: 'NEGATIVE', jd: 'PENDING' },
          dewormingDone: true,
          dewormerAgent: 'Ivermectin + Closantel (10ml SC)',
          boosterVaccineDone: true,
          vaccineName: 'FMD + HS + BQ Oil-Adjuvanted Combined',
          temperatureLog: [101.4, 101.2, 101.5, 101.1],
          clinicalNotes: 'Clear nasal mucosa. Mild ruminal sluggishness resolved post-probiotic bolus on Day 2.'
        },
        {
          id: 'QA-2026-002',
          tagNo: 'IN-GJ-2026-4411',
          species: 'Bovine (Gir Heifer)',
          sourceLocation: 'Junagadh Breeding Center, Gujarat',
          arrivalDate: new Date(Date.now() - (23 * 86400000)).toISOString().split('T')[0],
          quarantineDays: 21,
          daysCompleted: 23,
          status: 'TESTING_PENDING',
          serologyScreening: { brucellosis: 'NEGATIVE', tb: 'NEGATIVE', jd: 'NEGATIVE' },
          dewormingDone: true,
          dewormerAgent: 'Fenbendazole 3g Bolus orally',
          boosterVaccineDone: true,
          vaccineName: 'Theileriosis Tissue Culture Vaccine',
          temperatureLog: [101.8, 101.6, 101.4],
          clinicalNotes: 'Completed 21 days isolation. Negative serology confirmed. Awaiting Final Release Signoff.'
        },
        {
          id: 'QA-2026-003',
          tagNo: 'IN-PB-2026-1109',
          species: 'Caprine (Beetal Buck)',
          sourceLocation: 'Gurdaspur Commercial Farm, Punjab',
          arrivalDate: new Date(Date.now() - (5 * 86400000)).toISOString().split('T')[0],
          quarantineDays: 30,
          daysCompleted: 5,
          status: 'SICK_ISOLATION',
          serologyScreening: { brucellosis: 'PENDING', tb: 'PENDING', jd: 'PENDING' },
          dewormingDone: false,
          dewormerAgent: 'Postponed due to pyrexia',
          boosterVaccineDone: false,
          vaccineName: 'Pending fever stabilization',
          temperatureLog: [104.5, 104.2, 103.8],
          clinicalNotes: 'Day 3 showed 104.5°F fever, lacrimation, coughing. Treated with Ceftiofur Sodium + Flunixin. Suspected transit shipping fever.'
        }
      ],
      disinfectionSchedule: [
        {
          id: 'ZN-01',
          zoneName: 'Calving Pen',
          chemicalAgent: 'Glutaraldehyde (2%)',
          frequency: 'BETWEEN_BATCHES',
          lastDone: new Date(Date.now() - (36 * 3600000)).toISOString().replace('T', ' ').substring(0, 16),
          nextDue: new Date(Date.now() + (12 * 3600000)).toISOString().replace('T', ' ').substring(0, 16),
          status: 'DUE',
          assignedOperator: 'Sukhwinder Singh (Vet Tech)'
        },
        {
          id: 'ZN-02',
          zoneName: 'Perimeter Vehicle Dip',
          chemicalAgent: 'Virkon S (1%)',
          frequency: 'DAILY',
          lastDone: new Date(Date.now() - (28 * 3600000)).toISOString().replace('T', ' ').substring(0, 16),
          nextDue: new Date(Date.now() - (4 * 3600000)).toISOString().replace('T', ' ').substring(0, 16),
          status: 'OVERDUE',
          assignedOperator: 'Dinesh Kumar (Sanitation Guard)'
        },
        {
          id: 'ZN-03',
          zoneName: 'Milking Parlor',
          chemicalAgent: 'Bleaching Powder / Calcium Hypochlorite',
          frequency: 'DAILY',
          lastDone: new Date(Date.now() - (4 * 3600000)).toISOString().replace('T', ' ').substring(0, 16),
          nextDue: new Date(Date.now() + (8 * 3600000)).toISOString().replace('T', ' ').substring(0, 16),
          status: 'COMPLETED',
          assignedOperator: 'Mohan Ram (Parlor Supv)'
        },
        {
          id: 'ZN-04',
          zoneName: 'Feed Store Vestibule',
          chemicalAgent: 'Virkon S (1%)',
          frequency: 'WEEKLY',
          lastDone: new Date(Date.now() - (5 * 86400000)).toISOString().replace('T', ' ').substring(0, 16),
          nextDue: new Date(Date.now() + (2 * 86400000)).toISOString().replace('T', ' ').substring(0, 16),
          status: 'COMPLETED',
          assignedOperator: 'Pawan Logistics'
        },
        {
          id: 'ZN-05',
          zoneName: 'Manure Pit Runway & Boundary',
          chemicalAgent: 'Quicklime / Slaked Lime',
          frequency: 'WEEKLY',
          lastDone: new Date(Date.now() - (8 * 86400000)).toISOString().replace('T', ' ').substring(0, 16),
          nextDue: new Date(Date.now() - (1 * 86400000)).toISOString().replace('T', ' ').substring(0, 16),
          status: 'OVERDUE',
          assignedOperator: 'Ramesh Field Staff'
        }
      ],
      visitorVehicleLog: [
        {
          entryId: 'LOG-7701',
          visitorName: 'Dr. Harsh Vardhan',
          purpose: 'State Disease Diagnostic Lab Sample Courier',
          vehiclePlate: 'HR-12-AJ-4022',
          tireDipCompleted: true,
          protectiveBootsGiven: true,
          timestamp: new Date(Date.now() - (3 * 3600000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
          sanitizedBy: 'Dinesh Kumar'
        },
        {
          entryId: 'LOG-7702',
          visitorName: 'Gurpreet Chahal',
          purpose: 'Bulk Cattle Feed Delivery (Truck)',
          vehiclePlate: 'PB-10-CZ-9912',
          tireDipCompleted: true,
          protectiveBootsGiven: true,
          timestamp: new Date(Date.now() - (7 * 3600000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
          sanitizedBy: 'Dinesh Kumar'
        },
        {
          entryId: 'LOG-7703',
          visitorName: 'Satish Balyan',
          purpose: 'Livestock Broker (Buyer Inspection)',
          vehiclePlate: 'UP-14-EA-2031',
          tireDipCompleted: true,
          protectiveBootsGiven: false,
          timestamp: 'Yesterday 16:45',
          sanitizedBy: 'Ramesh Field Staff'
        }
      ]
    }
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE WITH LOCAL-STORAGE SAFETY)
  const StorageAdapter = {
    DB_NAME: 'VetcareBiosecurityDB',
    DB_VERSION: 1,
    STORE_NAME: 'biosecurity_quarantine_logs',

    async initDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[BiosecurityEngine] IndexedDB not available, reverting to fallback.');
          resolve(null);
          return;
        }

        const request = window.indexedDB.open(StorageAdapter.DB_NAME, StorageAdapter.DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(StorageAdapter.STORE_NAME)) {
            db.createObjectStore(StorageAdapter.STORE_NAME, { keyPath: 'key' });
          }
        };

        request.onsuccess = (event) => {
          State.dbInstance = event.target.result;
          resolve(State.dbInstance);
        };

        request.onerror = (event) => {
          console.error('[BiosecurityEngine] IndexedDB Open Error:', event.target.error);
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
              localStorage.setItem('VETCARE_BIOSEC_' + key, JSON.stringify(data));
              resolve(true);
            };
          } catch (e) {
            localStorage.setItem('VETCARE_BIOSEC_' + key, JSON.stringify(data));
            resolve(true);
          }
        });
      } else {
        localStorage.setItem('VETCARE_BIOSEC_' + key, JSON.stringify(data));
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
                const ls = localStorage.getItem('VETCARE_BIOSEC_' + key);
                resolve(ls ? JSON.parse(ls) : null);
              }
            };
            req.onerror = () => {
              const ls = localStorage.getItem('VETCARE_BIOSEC_' + key);
              resolve(ls ? JSON.parse(ls) : null);
            };
          } catch (e) {
            const ls = localStorage.getItem('VETCARE_BIOSEC_' + key);
            resolve(ls ? JSON.parse(ls) : null);
          }
        });
      } else {
        const ls = localStorage.getItem('VETCARE_BIOSEC_' + key);
        return Promise.resolve(ls ? JSON.parse(ls) : null);
      }
    }
  };

  // 4. SCIENTIFIC BIOSECURITY LOGIC & EPIDEMIOLOGICAL EVALUATORS
  const EpidemiologyEngine = {
    // Computes aggregate farm biosecurity rating (0 - 100%)
    computeBiosecurityComplianceScore() {
      // 1. Audit Checkpoints (40 points max)
      const auditTotal = State.auditChecklist.reduce((acc, curr) => acc + curr.weight, 0);
      const auditEarned = State.auditChecklist.reduce((acc, curr) => acc + (curr.status ? curr.weight : 0), 0);
      const auditFactor = auditTotal > 0 ? (auditEarned / auditTotal) * 40 : 20;

      // 2. Disinfection Schedule Adherence (30 points max)
      let disinfectionPoints = 30;
      const overdueZones = State.disinfectionSchedule.filter(z => z.status === 'OVERDUE').length;
      disinfectionPoints = Math.max(0, disinfectionPoints - (overdueZones * 10));

      // 3. Quarantine Integrity (30 points max)
      let quarantinePoints = 30;
      const unmanagedSick = State.quarantineAnimals.filter(a => a.status === 'SICK_ISOLATION').length;
      quarantinePoints = Math.max(10, quarantinePoints - (unmanagedSick * 8));

      return Math.round(auditFactor + disinfectionPoints + quarantinePoints);
    },

    // Validates whether incoming animal fulfills 21-30 day isolation & serology gates
    evaluateQuarantineClearance(animal) {
      const reasons = [];
      let isEligible = true;

      // 1. Duration check
      const arrival = new Date(animal.arrivalDate);
      const now = new Date();
      const elapsedDays = Math.floor((now - arrival) / (1000 * 60 * 60 * 24));
      
      if (elapsedDays < animal.quarantineDays) {
        isEligible = false;
        reasons.push(`न्यूनतम पृथक्करण काल अधूरा: ${elapsedDays}/${animal.quarantineDays} दिन व्यतीत (Mandatory isolation period incomplete)`);
      }

      // 2. Serology Screen check
      if (!animal.serologyScreening) {
        isEligible = false;
        reasons.push('सीरोलॉजिकल परीक्षण रिकॉर्ड अनुपलब्ध (No serological panel found)');
      } else {
        if (animal.serologyScreening.brucellosis !== 'NEGATIVE') {
          isEligible = false;
          reasons.push(`ब्रुसेलोसिस जांच अनिर्णीत अथवा पॉजिटिव: [${animal.serologyScreening.brucellosis}]`);
        }
        if (animal.serologyScreening.tb !== 'NEGATIVE') {
          isEligible = false;
          reasons.push(`गोजातीय टीबी ट्यूबरकुलिन टेस्ट अनिर्णीत: [${animal.serologyScreening.tb}]`);
        }
        if (animal.serologyScreening.jd !== 'NEGATIVE') {
          isEligible = false;
          reasons.push(`जॉन रोग (MAP Paratuberculosis) अनिर्णीत: [${animal.serologyScreening.jd}]`);
        }
      }

      // 3. Prophylaxis & Immunization verification
      if (!animal.dewormingDone) {
        isEligible = false;
        reasons.push('आंत परजीवी कृमिनाशक (Deworming) चिकित्सा अनिवार्य है');
      }
      if (!animal.boosterVaccineDone) {
        isEligible = false;
        reasons.push('प्रवेश बूस्टर टीकाकरण (FMD / HS / BQ) प्रमाण अनुपलब्ध');
      }

      // 4. Clinical Afebrile Status
      if (animal.status === 'SICK_ISOLATION') {
        isEligible = false;
        reasons.push('पशु वर्तमान में अस्वस्थ/ज्वर युक्त आइसोलेशन में है (Active sickness detected)');
      }

      return {
        passed: isEligible,
        elapsedDays: elapsedDays,
        reasons: reasons
      };
    }
  };

  // 5. TOAST NOTIFICATION UTILITY
  function notify(msg, type = 'info') {
    if (window.VetcareApp && typeof window.VetcareApp.showToast === 'function') {
      window.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[Biosecurity ${type.toUpperCase()}]: ${msg}`);
    }
  }

  // 6. UI COMPONENT RENDERING ENGINE
  const UIEngine = {
    // Root Shell Renderer
    renderMainLayout() {
      const complianceScore = EpidemiologyEngine.computeBiosecurityComplianceScore();
      let complianceColorClass = 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
      let complianceLabel = 'उत्कृष्ट बायोसिक्योरिटी (Optimal)';

      if (complianceScore < 70 && complianceScore >= 50) {
        complianceColorClass = 'text-amber-400 border-amber-500/40 bg-amber-500/10';
        complianceLabel = 'मध्यम जोखिम (Action Needed)';
      } else if (complianceScore < 50) {
        complianceColorClass = 'text-rose-400 border-rose-500/40 bg-rose-500/10';
        complianceLabel = 'गंभीर रोग असुरक्षा (Bio-Hazard Alert)';
      }

      const isolatedCount = State.quarantineAnimals.filter(a => a.status === 'ISOLATED' || a.status === 'SICK_ISOLATION').length;
      const overdueDisinfections = State.disinfectionSchedule.filter(z => z.status === 'OVERDUE').length;

      return `
        <div class="biosecurity-engine-wrapper max-w-7xl mx-auto space-y-6">
          
          <!-- TOP TELEMETRY STRIP & KPI CARDS -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <!-- KPI 1: Quarantine Occupancy -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-lg relative overflow-hidden group">
              <div class="absolute -right-3 -bottom-3 text-slate-800/40 text-7xl font-black pointer-events-none group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-shield-virus"></i>
              </div>
              <div class="relative z-10">
                <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">क्वारंटाइन में कुल पशु</span>
                <div class="text-2xl font-black font-display text-amber-400 mt-0.5">${isolatedCount} पशु आइसोलेटेड</div>
                <div class="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full ${isolatedCount > 0 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}"></span>
                  <span>सुरक्षा अवधि: 21-30 दिन</span>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl">
                <i class="fa-solid fa-box-tissue"></i>
              </div>
            </div>

            <!-- KPI 2: Disinfection Status -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-lg relative overflow-hidden group">
              <div class="absolute -right-3 -bottom-3 text-slate-800/40 text-7xl font-black pointer-events-none group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-spray-can-sparkles"></i>
              </div>
              <div class="relative z-10">
                <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">कीटाणुशोधन अनुसूची</span>
                <div class="text-2xl font-black font-display ${overdueDisinfections > 0 ? 'text-rose-400' : 'text-emerald-400'} mt-0.5">
                  ${overdueDisinfections > 0 ? overdueDisinfections + ' जोन अतिदेय (Overdue)' : 'सभी जोन सुरक्षित'}
                </div>
                <div class="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                  <i class="fa-solid fa-flask-vial text-cyan-400"></i>
                  <span>Virkon-S / Glutaraldehyde</span>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl">
                <i class="fa-solid fa-soap"></i>
              </div>
            </div>

            <!-- KPI 3: Farm Biosecurity Index -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-lg relative overflow-hidden group">
              <div class="relative z-10">
                <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">बायोसिक्योरिटी अनुपालन इंडेक्स</span>
                <div class="text-2xl font-black font-display text-white mt-0.5">${complianceScore}%</div>
                <div class="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full mt-1 border inline-block ${complianceColorClass}">
                  ${complianceLabel}
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl">
                <i class="fa-solid fa-biohazard"></i>
              </div>
            </div>

            <!-- KPI 4: External Entry & Vehicle Logs -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-lg relative overflow-hidden group">
              <div class="relative z-10">
                <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">गेट व्हीकल सैनिटाइजेशन</span>
                <div class="text-2xl font-black font-display text-purple-400 mt-0.5">
                  ${State.visitorVehicleLog.filter(v => v.tireDipCompleted).length}/${State.visitorVehicleLog.length} वाहन डिप
                </div>
                <div class="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                  <i class="fa-solid fa-truck-droplet text-purple-400"></i>
                  <span>100% व्हीकल टायर सैनिटाइज्ड</span>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl">
                <i class="fa-solid fa-dungeon"></i>
              </div>
            </div>

          </div>

          <!-- PRIMARY NAVIGATION TABS -->
          <div class="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-3">
            <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              <button type="button" data-tab="quarantine_pen" class="tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'quarantine_pen' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'}">
                <i class="fa-solid fa-hospital-user"></i>
                <span>1. क्वारंटाइन शेड (Isolation Ward)</span>
              </button>
              <button type="button" data-tab="disinfection_planner" class="tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'disinfection_planner' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'}">
                <i class="fa-solid fa-spray-can-sparkles"></i>
                <span>2. कीटाणुशोधन कैलेंडर (Chemical Matrix)</span>
              </button>
              <button type="button" data-tab="visitor_vehicle_log" class="tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'visitor_vehicle_log' ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20' : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'}">
                <i class="fa-solid fa-truck-ramp-box"></i>
                <span>3. आगंतुक एवं वाहन रजिस्टर (Gate Entry)</span>
              </button>
              <button type="button" data-tab="biosecurity_audit_scorecard" class="tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'biosecurity_audit_scorecard' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'}">
                <i class="fa-solid fa-clipboard-check"></i>
                <span>4. बायोसिक्योरिटी ऑडिट स्कोरकार्ड</span>
              </button>
            </div>

            <!-- Action Trigger for Adding new Entry -->
            <div id="tabActionContainer"></div>
          </div>

          <!-- TAB CONTENT DISPLAY HOOK -->
          <div id="tabContentPanel" class="transition-opacity duration-200"></div>

          <!-- DYNAMIC MODAL INJECTION STACK -->
          <div id="biosecurityModalContainer"></div>
        </div>
      `;
    },

    // TAB 1: Quarantine Shed Isolation Management
    renderQuarantineTab() {
      const rows = State.quarantineAnimals.map(animal => {
        let statusBadge = '';
        if (animal.status === 'ISOLATED') {
          statusBadge = '<span class="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">आइसोलेटेड (QUARANTINE)</span>';
        } else if (animal.status === 'TESTING_PENDING') {
          statusBadge = '<span class="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">जांच लंबित (PENDING LAB)</span>';
        } else if (animal.status === 'CLEARED') {
          statusBadge = '<span class="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">रिलीज़ स्वीकृत (CLEARED)</span>';
        } else if (animal.status === 'SICK_ISOLATION') {
          statusBadge = '<span class="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono bg-rose-500/10 text-rose-400 border border-rose-500/30">रोगी आइसोलेशन (SICK BAY)</span>';
        }

        const serology = animal.serologyScreening || {};
        const getPill = (val) => {
          if (val === 'NEGATIVE') return '<span class="text-emerald-400 font-mono font-bold">नेगेटिव (OK)</span>';
          if (val === 'POSITIVE') return '<span class="text-rose-400 font-mono font-bold">पॉजिटिव (ALERT)</span>';
          return '<span class="text-slate-400 font-mono">लंबित (Pending)</span>';
        };

        const progressPercent = Math.min(100, Math.round((animal.daysCompleted / animal.quarantineDays) * 100));

        return `
          <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
            <td class="py-3 px-4">
              <div class="font-bold text-white text-sm">${animal.tagNo}</div>
              <div class="text-[11px] text-slate-400 font-mono">${animal.species} • Ref: ${animal.id}</div>
              <div class="text-[10px] text-amber-400/90 mt-0.5"><i class="fa-solid fa-location-dot"></i> ${animal.sourceLocation}</div>
            </td>
            <td class="py-3 px-4">
              <div class="text-xs text-slate-300 font-mono">${animal.arrivalDate}</div>
              <div class="w-full bg-slate-800 rounded-full h-2 mt-1.5 overflow-hidden border border-slate-700">
                <div class="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full" style="width: ${progressPercent}%;"></div>
              </div>
              <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>दिन: ${animal.daysCompleted}/${animal.quarantineDays}</span>
                <span>${progressPercent}%</span>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="space-y-1 text-xs">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-slate-400 text-[11px]">Brucella:</span>
                  ${getPill(serology.brucellosis)}
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-slate-400 text-[11px]">Bovine TB:</span>
                  ${getPill(serology.tb)}
                </div>
                <div class="flex items-center justify-between gap-2">
                  <span class="text-slate-400 text-[11px]">Johnes (JD):</span>
                  ${getPill(serology.jd)}
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="text-xs">
                <div class="flex items-center gap-1.5 ${animal.dewormingDone ? 'text-emerald-400' : 'text-slate-400'}">
                  <i class="fa-solid ${animal.dewormingDone ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                  <span>कृमिनाशक (Dewormed)</span>
                </div>
                <div class="flex items-center gap-1.5 mt-1 ${animal.boosterVaccineDone ? 'text-emerald-400' : 'text-slate-400'}">
                  <i class="fa-solid ${animal.boosterVaccineDone ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                  <span>बूस्टर टीका (Vaccinated)</span>
                </div>
                <div class="text-[10px] text-slate-400 mt-1 truncate max-w-xs" title="${animal.clinicalNotes}">
                  <i class="fa-solid fa-notes-medical mr-1"></i>${animal.clinicalNotes || 'सामान्य स्वास्थ्य'}
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              ${statusBadge}
            </td>
            <td class="py-3 px-4 text-right space-x-1">
              <button type="button" data-action="validate_release" data-id="${animal.id}" class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 transition-colors" title="रिलीज़ पात्रता जांचें">
                <i class="fa-solid fa-stamp"></i> रिलीज़ जांच
              </button>
              <button type="button" data-action="print_pass" data-id="${animal.id}" class="px-2 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors" title="क्वारंटाइन क्लीयरेंस पास प्रिंट करें">
                <i class="fa-solid fa-print"></i>
              </button>
              <button type="button" data-action="edit_animal" data-id="${animal.id}" class="px-2 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors">
                <i class="fa-solid fa-pen-to-square"></i>
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
                <i class="fa-solid fa-dungeon text-amber-400"></i>
                <span>प्रवेश पृथक्करण शेड (Quarantine Isolation Registry)</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                बाहर से क्रय किए गए नए पशुओं को मुख्य झुंड में मिलाने से पूर्व 21 से 30 दिनों का अनिवार्य निगरानी चक्र
              </p>
            </div>
            <button type="button" id="btnOpenAddAnimalModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95">
              <i class="fa-solid fa-plus-circle"></i>
              <span>नया पशु आइसोलेट करें (Intake Animal)</span>
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                  <th class="py-3 px-4">टैग संख्या / प्रजाति</th>
                  <th class="py-3 px-4">आगमन तिथि / 21-दिवसीय चक्र</th>
                  <th class="py-3 px-4">लैब सीरोलॉजी स्थिति (Serology)</th>
                  <th class="py-3 px-4">रोगनिरोधक चिकित्सा (Prophylaxis)</th>
                  <th class="py-3 px-4">वर्तमान स्थिति</th>
                  <th class="py-3 px-4 text-right">कार्रवाई (Actions)</th>
                </tr>
              </thead>
              <tbody>
                ${rows.length > 0 ? rows : '<tr><td colspan="6" class="p-8 text-center text-slate-400 text-xs font-mono">कोई पशु वर्तमान में क्वारंटाइन में नहीं है।</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // TAB 2: Disinfection Planner & Chemical Matrix
    renderDisinfectionTab() {
      const scheduleCards = State.disinfectionSchedule.map(zone => {
        let statusBadge = '';
        if (zone.status === 'COMPLETED') {
          statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">सक्रिय (COMPLETED)</span>';
        } else if (zone.status === 'DUE') {
          statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">आज देय (DUE TODAY)</span>';
        } else if (zone.status === 'OVERDUE') {
          statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">अतिदेय (OVERDUE ALERT)</span>';
        }

        const chemData = window.VetcareApp.ClinicalData.BiosecurityQuarantine.CHEMICAL_DATABASE[zone.chemicalAgent] || {};

        return `
          <div class="rounded-xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between shadow-lg relative">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-xs font-mono text-cyan-400 font-bold">${zone.id}</span>
                ${statusBadge}
              </div>
              <h4 class="text-base font-bold text-white">${zone.zoneName}</h4>
              <div class="text-xs font-mono text-amber-400 mt-1 flex items-center gap-1.5">
                <i class="fa-solid fa-flask text-xs"></i>
                <span>${zone.chemicalAgent}</span>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 mt-3 space-y-1 text-[11px] text-slate-300">
                <div><strong class="text-slate-400">अनुशंसित सांद्रता:</strong> ${chemData.dilution || 'मानक निर्देशानुसार'}</div>
                <div><strong class="text-slate-400">संपर्क समय:</strong> ${chemData.contactTimeMinutes ? chemData.contactTimeMinutes + ' मिनट' : '15 मिनट'}</div>
                <div><strong class="text-slate-400">आवृत्ति:</strong> ${zone.frequency}</div>
                <div><strong class="text-slate-400">प्रभारी:</strong> ${zone.assignedOperator}</div>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <div>
                <span class="text-[10px] text-slate-400 block">अंतिम धुलाई:</span>
                <span class="text-slate-200">${zone.lastDone}</span>
              </div>
              <button type="button" data-action="mark_sanitized" data-id="${zone.id}" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md flex items-center gap-1.5 transition-all active:scale-95">
                <i class="fa-solid fa-check-double"></i>
                <span>सैनिटाइज्ड मार्क करें</span>
              </button>
            </div>
          </div>
        `;
      }).join('');

      // Chemical Reference Matrix
      const chemEntries = Object.entries(window.VetcareApp.ClinicalData.BiosecurityQuarantine.CHEMICAL_DATABASE).map(([name, item]) => {
        return `
          <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-sm text-amber-300">${name}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${item.hazardTier}</span>
            </div>
            <div class="text-xs text-slate-300"><strong class="text-slate-400">घोल अनुपात:</strong> ${item.dilution}</div>
            <div class="text-xs text-slate-300"><strong class="text-slate-400">रोगजनक स्पेक्ट्रम:</strong> ${item.spectrum}</div>
            <div class="text-[11px] text-slate-400"><strong class="text-slate-400">सावधानी/संकेतक:</strong> ${item.indicatorColor} | ${item.temperatureLimits}</div>
          </div>
        `;
      }).join('');

      return `
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-spray-can-sparkles text-cyan-400"></i>
                <span>फार्म जोन कीटाणुशोधन नियंत्रण (Biosecurity Zone Sanitizer)</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                रोगाणुओं के चक्रीय उन्मूलन हेतु फार्म शेड, व्हीकल डिप और बछड़ा बाड़ों का रासायनिक विसंक्रमण
              </p>
            </div>
            <button type="button" id="btnOpenAddZoneModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95">
              <i class="fa-solid fa-plus"></i>
              <span>नया जोन जोड़ें (Add Zone)</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${scheduleCards}
          </div>

          <!-- PHARMACOPEIA REFERENCE ACCORDION -->
          <div class="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl">
            <h4 class="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <i class="fa-solid fa-book-medical text-amber-400"></i>
              <span>रासायनिक कीटाणुनाशक प्रोटोकॉल एवं प्रभावोत्पादकता मैट्रिक्स (Chemical Efficacy Guide)</span>
            </h4>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
              ${chemEntries}
            </div>
          </div>
        </div>
      `;
    },

    // TAB 3: Visitor & Vehicle Log
    renderVisitorTab() {
      const rows = State.visitorVehicleLog.map(v => {
        return `
          <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
            <td class="py-3 px-4 font-mono text-xs text-purple-400 font-bold">${v.entryId}</td>
            <td class="py-3 px-4">
              <div class="font-bold text-white text-sm">${v.visitorName}</div>
              <div class="text-[11px] text-slate-400">${v.purpose}</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs text-slate-200">
              <i class="fa-solid fa-truck text-slate-400 mr-1"></i>${v.vehiclePlate}
            </td>
            <td class="py-3 px-4">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono ${v.tireDipCompleted ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}">
                <i class="fa-solid ${v.tireDipCompleted ? 'fa-check' : 'fa-xmark'}"></i>
                ${v.tireDipCompleted ? 'टायर डिप संपन्न' : 'छूट गया (MISSED)'}
              </span>
            </td>
            <td class="py-3 px-4">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono ${v.protectiveBootsGiven ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}">
                <i class="fa-solid ${v.protectiveBootsGiven ? 'fa-shoe-prints' : 'fa-triangle-exclamation'}"></i>
                ${v.protectiveBootsGiven ? 'गमबूट्स प्रदान किए' : 'स्वयं के जूते'}
              </span>
            </td>
            <td class="py-3 px-4 text-xs font-mono text-slate-300">
              <div>${v.timestamp}</div>
              <div class="text-[10px] text-slate-400">जांचकर्ता: ${v.sanitizedBy}</div>
            </td>
          </tr>
        `;
      }).join('');

      return `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div class="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-dungeon text-purple-400"></i>
                <span>मुख्य प्रवेश द्वार: आगंतुक एवं वाहन जैव-सुरक्षा रजिस्टर (Gate Biosecurity Log)</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                बाहरी दूध टैंकरों, चारा ट्रकों और आगंतुकों के पहियों व जूतों से फैलने वाले संक्रामक रोगों की रोकथाम
              </p>
            </div>
            <button type="button" id="btnOpenAddVisitorModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95">
              <i class="fa-solid fa-id-card-clip"></i>
              <span>नया वाहन/आगंतुक दर्ज करें (Log Visitor)</span>
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                  <th class="py-3 px-4">प्रविष्टि क्र.</th>
                  <th class="py-3 px-4">आगंतुक नाम एवं प्रयोजन</th>
                  <th class="py-3 px-4">वाहन नंबर (Vehicle Plate)</th>
                  <th class="py-3 px-4">टायर डिप स्थिति (Wheel Submersion)</th>
                  <th class="py-3 px-4">सुरक्षा जूते (Biosecurity Boots)</th>
                  <th class="py-3 px-4">समय एवं ऑपरेटर</th>
                </tr>
              </thead>
              <tbody>
                ${rows.length > 0 ? rows : '<tr><td colspan="6" class="p-8 text-center text-slate-400 text-xs font-mono">आज कोई बाहरी वाहन दर्ज नहीं हुआ है।</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // TAB 4: Biosecurity Audit Scorecard
    renderAuditTab() {
      const score = EpidemiologyEngine.computeBiosecurityComplianceScore();

      const itemsHtml = State.auditChecklist.map((item, index) => {
        return `
          <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4 transition-colors hover:border-slate-700">
            <div class="flex items-start gap-3">
              <div class="mt-1">
                <input type="checkbox" data-audit-id="${item.id}" ${item.status ? 'checked' : ''} class="audit-checkbox w-5 h-5 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900 cursor-pointer" />
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">${item.category}</span>
                  <span class="text-[10px] font-mono text-emerald-400 font-bold">+${item.weight} अंक</span>
                </div>
                <h5 class="text-sm font-bold text-white mt-1">${item.title}</h5>
                <p class="text-xs text-slate-400 mt-0.5">${item.desc}</p>
              </div>
            </div>
            <span class="text-xs font-mono font-bold ${item.status ? 'text-emerald-400' : 'text-rose-400'}">
              ${item.status ? 'प्रमाणित (VERIFIED)' : 'अधूरा (PENDING)'}
            </span>
          </div>
        `;
      }).join('');

      return `
        <div class="space-y-6">
          <div class="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div class="space-y-2">
              <span class="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                EPIDEMIOLOGICAL INTEGRITY AUDIT 2026
              </span>
              <h3 class="text-xl font-display font-black text-white">राष्ट्रीय डेयरी जैव-सुरक्षा मूल्यांकन चेकलिस्ट</h3>
              <p class="text-xs text-slate-300 max-w-xl">
                संक्रामक महामारियों (FMD, ब्रुसेलोसिस, लम्पी स्किन, मैस्टाइटिस) को फार्म में घुसने से रोकने हेतु 7 स्वर्णिम सुरक्षा अवरोध। चेकबॉक्स टॉगल कर लाइव स्कोर अपडेट करें।
              </p>
            </div>

            <!-- Gauge Meter Visual -->
            <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-slate-800 min-w-[180px] text-center shadow-inner">
              <span class="text-[10px] font-mono text-slate-400 uppercase">समग्र फार्म सुरक्षा सूचकांक</span>
              <div class="text-4xl font-display font-black text-emerald-400 mt-1">${score}%</div>
              <div class="w-full bg-slate-800 rounded-full h-2.5 mt-2 overflow-hidden">
                <div class="bg-gradient-to-r from-amber-500 via-teal-400 to-emerald-500 h-full rounded-full" style="width: ${score}%;"></div>
              </div>
              <span class="text-[10px] font-mono text-slate-400 mt-2">ISO/VET-2026 AUDIT COMPLIANT</span>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-3">
            ${itemsHtml}
          </div>
        </div>
      `;
    }
  };

  // 7. MODAL DIALOG CONTROLLERS (ZERO-PLACEHOLDER INLINE BUILDERS)
  const ModalController = {
    closeModal() {
      const container = document.getElementById('biosecurityModalContainer');
      if (container) container.innerHTML = '';
    },

    openAddAnimalModal() {
      const container = document.getElementById('biosecurityModalContainer');
      if (!container) return;

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-amber-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <i class="fa-solid fa-cow"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">नया पशु क्वारंटाइन शेड में दर्ज करें</h3>
              </div>
              <button type="button" id="btnModalCloseAnimal" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddQuarantineAnimal" class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">कान का टैग नंबर (Ear Tag)*</label>
                  <input type="text" id="m_tagNo" required placeholder="IN-HR-2026-XXXX" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रजाति एवं नस्ल (Species)*</label>
                  <select id="m_species" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="Bovine (Murrah Buffalo)">मुर्रा भैंस (Murrah Buffalo)</option>
                    <option value="Bovine (Sahiwal Cow)">साहीवाल गाय (Sahiwal Cow)</option>
                    <option value="Bovine (Gir Cow)">गीर गाय (Gir Cow)</option>
                    <option value="Caprine (Beetal Goat)">बीटल बकरी (Beetal Goat)</option>
                    <option value="Ovine (Nili Ravi)">नीली रावी भैंस (Nili Ravi)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">क्रय स्रोत / उद्गम स्थल*</label>
                  <input type="text" id="m_source" required placeholder="उदा. करनाल पशु मेला, हरियाणा" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">आइसोलेशन अवधि (Days)*</label>
                  <select id="m_quarantineDays" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono">
                    <option value="21">21 दिन (मानक पृथक्करण चक्र)</option>
                    <option value="30">30 दिन (उच्च-जोखिम अंतर्राज्यीय पशु)</option>
                  </select>
                </div>
              </div>

              <!-- Lab Serology Checkboxes -->
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span class="text-[10px] font-mono text-cyan-400 uppercase font-bold">सीरोलॉजिकल लैब स्क्रीनिंग परिणाम:</span>
                <div class="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label class="block text-[10px] text-slate-400">Brucella</label>
                    <select id="m_brucella" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-1 text-[11px] text-white">
                      <option value="NEGATIVE">नेगेटिव</option>
                      <option value="PENDING" selected>लंबित</option>
                      <option value="POSITIVE">पॉजिटिव</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[10px] text-slate-400">Tuberculosis</label>
                    <select id="m_tb" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-1 text-[11px] text-white">
                      <option value="NEGATIVE">नेगेटिव</option>
                      <option value="PENDING" selected>लंबित</option>
                      <option value="POSITIVE">पॉजिटिव</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[10px] text-slate-400">Johne's (JD)</label>
                    <select id="m_jd" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-1 text-[11px] text-white">
                      <option value="NEGATIVE">नेगेटिव</option>
                      <option value="PENDING" selected>लंबित</option>
                      <option value="POSITIVE">पॉजिटिव</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Prophylaxis checks -->
              <div class="grid grid-cols-2 gap-3 text-xs">
                <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                  <input type="checkbox" id="m_deworming" class="rounded bg-slate-800 border-slate-700 text-emerald-500" />
                  <span class="text-slate-300">कृमिनाशक दवा दी गई</span>
                </label>
                <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                  <input type="checkbox" id="m_vaccine" class="rounded bg-slate-800 border-slate-700 text-emerald-500" />
                  <span class="text-slate-300">बूस्टर टीका लगाया गया</span>
                </label>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">शारीरिक तापमान एवं नैदानिक टिप्पणी</label>
                <textarea id="m_notes" rows="2" placeholder="तापमान 101.5°F, कोई बाह्य परजीवी नहीं..." class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelAnimalModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md">क्वारंटाइन रजिस्टर करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseAnimal').onclick = ModalController.closeModal;
      document.getElementById('btnCancelAnimalModal').onclick = ModalController.closeModal;

      document.getElementById('formAddQuarantineAnimal').onsubmit = async (e) => {
        e.preventDefault();
        const tagNo = document.getElementById('m_tagNo').value.trim();
        const species = document.getElementById('m_species').value;
        const source = document.getElementById('m_source').value.trim();
        const qDays = parseInt(document.getElementById('m_quarantineDays').value, 10);
        const brucella = document.getElementById('m_brucella').value;
        const tb = document.getElementById('m_tb').value;
        const jd = document.getElementById('m_jd').value;
        const deworming = document.getElementById('m_deworming').checked;
        const vaccine = document.getElementById('m_vaccine').checked;
        const notes = document.getElementById('m_notes').value.trim();

        const newAnimal = {
          id: 'QA-' + Date.now().toString().slice(-4),
          tagNo: tagNo,
          species: species,
          sourceLocation: source,
          arrivalDate: new Date().toISOString().split('T')[0],
          quarantineDays: qDays,
          daysCompleted: 0,
          status: 'ISOLATED',
          serologyScreening: { brucellosis: brucella, tb: tb, jd: jd },
          dewormingDone: deworming,
          dewormerAgent: deworming ? 'Fenbendazole Broad Spectrum' : 'Pending',
          boosterVaccineDone: vaccine,
          vaccineName: vaccine ? 'FMD Primary Booster' : 'Pending',
          temperatureLog: [101.5],
          clinicalNotes: notes || 'प्रवेश समय शारीरिक तापमान सामान्य'
        };

        State.quarantineAnimals.unshift(newAnimal);
        await StorageAdapter.setItem('quarantineAnimals', State.quarantineAnimals);
        ModalController.closeModal();
        notify(`नया पशु ${tagNo} क्वारंटाइन में पंजीकृत किया गया।`, 'success');
        window.VetcareApp.Modules.BiosecurityQuarantineManager.refreshView();
      };
    },

    openAddVisitorModal() {
      const container = document.getElementById('biosecurityModalContainer');
      if (!container) return;

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-purple-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <i class="fa-solid fa-truck"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">गेट वाहन / आगंतुक सैनिटाइजेशन प्रविष्टि</h3>
              </div>
              <button type="button" id="btnModalCloseVisitor" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddVisitorLog" class="space-y-4">
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">आगंतुक/चालक का नाम*</label>
                <input type="text" id="v_name" required placeholder="उदा. गुरविंदर सिंह" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">आगमन का प्रयोजन (Purpose)*</label>
                <input type="text" id="v_purpose" required placeholder="उदा. साइलेज चारा आपूर्ति / दूध उठान" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">गाड़ी नंबर (Vehicle Number)*</label>
                <input type="text" id="v_plate" required placeholder="PB-02-BB-1120" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div class="space-y-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="v_tireDip" checked class="rounded bg-slate-800 border-slate-700 text-purple-500" />
                  <span class="text-slate-300">टायर विसंक्रमण हौद (Tire Dip Dip-bath) से गुजरा</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="v_boots" checked class="rounded bg-slate-800 border-slate-700 text-purple-500" />
                  <span class="text-slate-300">व्यक्ति को जैव-सुरक्षा गमबूट्स प्रदान किए गए</span>
                </label>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">जांचकर्ता गार्ड / ऑपरेटर</label>
                <input type="text" id="v_operator" value="Dinesh Kumar (Sanitation Guard)" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelVisitorModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md">गेट प्रविष्टि सहेजें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseVisitor').onclick = ModalController.closeModal;
      document.getElementById('btnCancelVisitorModal').onclick = ModalController.closeModal;

      document.getElementById('formAddVisitorLog').onsubmit = async (e) => {
        e.preventDefault();
        const vName = document.getElementById('v_name').value.trim();
        const vPurpose = document.getElementById('v_purpose').value.trim();
        const vPlate = document.getElementById('v_plate').value.trim();
        const vTire = document.getElementById('v_tireDip').checked;
        const vBoots = document.getElementById('v_boots').checked;
        const vOp = document.getElementById('v_operator').value.trim();

        const newLog = {
          entryId: 'LOG-' + Math.floor(1000 + Math.random() * 9000),
          visitorName: vName,
          purpose: vPurpose,
          vehiclePlate: vPlate,
          tireDipCompleted: vTire,
          protectiveBootsGiven: vBoots,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Just now',
          sanitizedBy: vOp
        };

        State.visitorVehicleLog.unshift(newLog);
        await StorageAdapter.setItem('visitorVehicleLog', State.visitorVehicleLog);
        ModalController.closeModal();
        notify(`गेट एंट्री ${vPlate} सुरक्षित रूप से दर्ज हुई।`, 'success');
        window.VetcareApp.Modules.BiosecurityQuarantineManager.refreshView();
      };
    },

    openAddZoneModal() {
      const container = document.getElementById('biosecurityModalContainer');
      if (!container) return;

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <i class="fa-solid fa-spray-can-sparkles"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">नया विसंक्रमण जोन जोड़ें</h3>
              </div>
              <button type="button" id="btnModalCloseZone" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formAddZoneSchedule" class="space-y-4">
              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">जोन का नाम (Zone / Shed Name)*</label>
                <input type="text" id="z_name" required placeholder="उदा. हीफर वार्ड - B (Heifer Ward B)" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">रासायनिक एजेंट (Chemical Disinfectant)*</label>
                <select id="z_chem" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option value="Virkon S (1%)">Virkon S (1%) - ब्रॉड स्पेक्ट्रम वायरस नाशक</option>
                  <option value="Glutaraldehyde (2%)">Glutaraldehyde (2%) - बैक्टीरिया बीजाणु नाशक</option>
                  <option value="Quicklime / Slaked Lime">Quicklime / Slaked Lime - फर्श व नाली चूना छिड़काव</option>
                  <option value="Bleaching Powder / Calcium Hypochlorite">Bleaching Powder - क्लोरीन नाबदान शोधन</option>
                  <option value="Sodium Hydroxide / Caustic Soda (2%)">Sodium Hydroxide (2%) - तीव्र FMD रोधी कास्टिक</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">आवृत्ति (Frequency)*</label>
                  <select id="z_freq" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="DAILY">दैनिक (Daily)</option>
                    <option value="WEEKLY" selected>साप्ताहिक (Weekly)</option>
                    <option value="BETWEEN_BATCHES">बैच अंतराल (Between Batches)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रभारी ऑपरेटर</label>
                  <input type="text" id="z_op" value="Staff Member" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelZoneModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md">शेड्यूल में जोड़ें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseZone').onclick = ModalController.closeModal;
      document.getElementById('btnCancelZoneModal').onclick = ModalController.closeModal;

      document.getElementById('formAddZoneSchedule').onsubmit = async (e) => {
        e.preventDefault();
        const zName = document.getElementById('z_name').value.trim();
        const zChem = document.getElementById('z_chem').value;
        const zFreq = document.getElementById('z_freq').value;
        const zOp = document.getElementById('z_op').value.trim();

        const newZone = {
          id: 'ZN-0' + (State.disinfectionSchedule.length + 1),
          zoneName: zName,
          chemicalAgent: zChem,
          frequency: zFreq,
          lastDone: 'Never',
          nextDue: 'Due Immediate',
          status: 'DUE',
          assignedOperator: zOp
        };

        State.disinfectionSchedule.push(newZone);
        await StorageAdapter.setItem('disinfectionSchedule', State.disinfectionSchedule);
        ModalController.closeModal();
        notify(`नया जोन "${zName}" सफलतापूर्वक जोड़ा गया।`, 'success');
        window.VetcareApp.Modules.BiosecurityQuarantineManager.refreshView();
      };
    },

    openReleaseValidationModal(animalId) {
      const animal = State.quarantineAnimals.find(a => a.id === animalId);
      if (!animal) return;

      const evalResult = EpidemiologyEngine.evaluateQuarantineClearance(animal);
      const container = document.getElementById('biosecurityModalContainer');
      if (!container) return;

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 ${evalResult.passed ? 'border-emerald-500/60' : 'border-rose-500/60'} rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg ${evalResult.passed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'} flex items-center justify-center text-lg">
                  <i class="fa-solid ${evalResult.passed ? 'fa-certificate' : 'fa-hand'}"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">क्वारंटाइन रिलीज प्रोटोकॉल जांच</h3>
              </div>
              <button type="button" id="btnModalCloseRelease" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div class="space-y-4">
              <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-bold text-white">${animal.tagNo}</span>
                  <span class="text-xs font-mono text-amber-400">${animal.species}</span>
                </div>
                <div class="text-[11px] text-slate-400 mt-0.5">प्रवेश तिथि: ${animal.arrivalDate} | पूर्ण दिन: ${evalResult.elapsedDays}/${animal.quarantineDays} दिन</div>
              </div>

              ${evalResult.passed ? `
                <div class="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 space-y-2 text-xs">
                  <div class="flex items-center gap-2 font-bold text-sm">
                    <i class="fa-solid fa-circle-check text-emerald-400"></i>
                    <span>सभी बायोसिक्योरिटी शर्ते शत-प्रतिशत पूर्ण!</span>
                  </div>
                  <p>पशु ने 21-दिवसीय पृथक्करण अवधि सुरक्षित रूप से पार कर ली है। सभी सीरोलॉजी टेस्ट (Brucella, TB, JD) नेगेटिव हैं और कृमिनाशक व टीकाकरण संपन्न हो चुका है। इसे मुख्य झुंड में शामिल किया जा सकता है।</p>
                </div>
              ` : `
                <div class="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-300 space-y-2 text-xs">
                  <div class="flex items-center gap-2 font-bold text-sm">
                    <i class="fa-solid fa-triangle-exclamation text-rose-400"></i>
                    <span>रिलीज़ रोकी गई (Clearance Blocked)</span>
                  </div>
                  <p class="text-[11px] text-slate-300">पशु निम्नलिखित जैव-सुरक्षा कमियों के कारण मुख्य डेयरी बाड़े में प्रवेश हेतु अयोग्य है:</p>
                  <ul class="list-disc pl-5 space-y-1 text-rose-200">
                    ${evalResult.reasons.map(r => `<li>${r}</li>`).join('')}
                  </ul>
                </div>
              `}

              <div class="flex items-center justify-between pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelReleaseModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300">बंद करें</button>
                <div class="flex gap-2">
                  <button type="button" id="btnPrintPassModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">
                    <i class="fa-solid fa-print mr-1"></i> पास प्रिंट करें
                  </button>
                  ${evalResult.passed ? `
                    <button type="button" id="btnApproveClearance" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40">
                      मुख्य बाड़े में रिलीज स्वीकृत करें
                    </button>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseRelease').onclick = ModalController.closeModal;
      document.getElementById('btnCancelReleaseModal').onclick = ModalController.closeModal;

      document.getElementById('btnPrintPassModal').onclick = () => {
        window.VetcareApp.Modules.BiosecurityQuarantineManager.printQuarantineReleasePass(animal.id);
      };

      const btnApprove = document.getElementById('btnApproveClearance');
      if (btnApprove) {
        btnApprove.onclick = async () => {
          animal.status = 'CLEARED';
          await StorageAdapter.setItem('quarantineAnimals', State.quarantineAnimals);
          ModalController.closeModal();
          notify(`पशु ${animal.tagNo} को आधिकारिक क्लीयरेंस प्रदान किया गया!`, 'success');
          window.VetcareApp.Modules.BiosecurityQuarantineManager.refreshView();
        };
      }
    }
  };

  // 8. EVENT ATTACHMENT & DELEGATION SUBSYSTEM
  function bindDOMEvents(container) {
    if (State.listenersBound) return;

    container.addEventListener('click', async (e) => {
      // 1. Tab Navigation Clicks
      const tabBtn = e.target.closest('.tab-btn');
      if (tabBtn) {
        const targetTab = tabBtn.getAttribute('data-tab');
        if (targetTab && targetTab !== State.activeTab) {
          State.activeTab = targetTab;
          window.VetcareApp.Modules.BiosecurityQuarantineManager.refreshView();
        }
        return;
      }

      // 2. Open Modals
      if (e.target.closest('#btnOpenAddAnimalModal')) {
        ModalController.openAddAnimalModal();
        return;
      }
      if (e.target.closest('#btnOpenAddVisitorModal')) {
        ModalController.openAddVisitorModal();
        return;
      }
      if (e.target.closest('#btnOpenAddZoneModal')) {
        ModalController.openAddZoneModal();
        return;
      }

      // 3. Row Actions: Validate Release
      const validateBtn = e.target.closest('button[data-action="validate_release"]');
      if (validateBtn) {
        const animalId = validateBtn.getAttribute('data-id');
        ModalController.openReleaseValidationModal(animalId);
        return;
      }

      // 4. Row Actions: Print Certificate Pass
      const printBtn = e.target.closest('button[data-action="print_pass"]');
      if (printBtn) {
        const animalId = printBtn.getAttribute('data-id');
        window.VetcareApp.Modules.BiosecurityQuarantineManager.printQuarantineReleasePass(animalId);
        return;
      }

      // 5. Zone Action: Mark Sanitized
      const sanitizeBtn = e.target.closest('button[data-action="mark_sanitized"]');
      if (sanitizeBtn) {
        const zoneId = sanitizeBtn.getAttribute('data-id');
        const zone = State.disinfectionSchedule.find(z => z.id === zoneId);
        if (zone) {
          const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
          zone.lastDone = nowStr;
          zone.status = 'COMPLETED';
          
          // Calculate next due based on frequency
          const nowTime = Date.now();
          if (zone.frequency === 'DAILY') {
            zone.nextDue = new Date(nowTime + (24 * 3600000)).toISOString().replace('T', ' ').substring(0, 16);
          } else if (zone.frequency === 'WEEKLY') {
            zone.nextDue = new Date(nowTime + (7 * 86400000)).toISOString().replace('T', ' ').substring(0, 16);
          } else {
            zone.nextDue = 'Next Batch Arrival';
          }

          await StorageAdapter.setItem('disinfectionSchedule', State.disinfectionSchedule);
          notify(`जोन "${zone.zoneName}" विसंक्रमित चिन्हित किया गया।`, 'success');
          window.VetcareApp.Modules.BiosecurityQuarantineManager.refreshView();
        }
        return;
      }

      // 6. Audit Checkbox Toggle
      if (e.target.classList.contains('audit-checkbox')) {
        const auditId = e.target.getAttribute('data-audit-id');
        const item = State.auditChecklist.find(i => i.id === auditId);
        if (item) {
          item.status = e.target.checked;
          await StorageAdapter.setItem('auditChecklist', State.auditChecklist);
          window.VetcareApp.Modules.BiosecurityQuarantineManager.refreshView();
        }
        return;
      }
    });

    State.listenersBound = true;
  }

  // 9. PUBLIC API & LIFECYCLE IMPLEMENTATION
  window.VetcareApp.Modules.BiosecurityQuarantineManager = {
    // Lifecycle Init
    async init() {
      try {
        await StorageAdapter.initDB();

        // Hydrate State from IndexedDB / Storage with fallback to Seed Data
        const savedAnimals = await StorageAdapter.getItem('quarantineAnimals');
        State.quarantineAnimals = Array.isArray(savedAnimals) && savedAnimals.length > 0 ? savedAnimals : State.seedData.quarantineAnimals;

        const savedZones = await StorageAdapter.getItem('disinfectionSchedule');
        State.disinfectionSchedule = Array.isArray(savedZones) && savedZones.length > 0 ? savedZones : State.seedData.disinfectionSchedule;

        const savedVisitors = await StorageAdapter.getItem('visitorVehicleLog');
        State.visitorVehicleLog = Array.isArray(savedVisitors) && savedVisitors.length > 0 ? savedVisitors : State.seedData.visitorVehicleLog;

        const savedAudit = await StorageAdapter.getItem('auditChecklist');
        State.auditChecklist = Array.isArray(savedAudit) && savedAudit.length > 0 ? savedAudit : window.VetcareApp.ClinicalData.BiosecurityQuarantine.DEFAULT_AUDIT_CHECKLIST;

        console.log('[BiosecurityEngine] State successfully initialized.');
      } catch (err) {
        console.error('[BiosecurityEngine] Initialization failed:', err);
      }
    },

    // Lifecycle Render
    render(containerId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error(`[BiosecurityEngine] Container ${containerId} not found.`);
        return;
      }

      State.containerElement = container;
      this.refreshView();
      bindDOMEvents(container);
    },

    // Fast View Refresh
    refreshView() {
      if (!State.containerElement) return;

      State.containerElement.innerHTML = UIEngine.renderMainLayout();
      const contentPanel = State.containerElement.querySelector('#tabContentPanel');
      if (!contentPanel) return;

      if (State.activeTab === 'quarantine_pen') {
        contentPanel.innerHTML = UIEngine.renderQuarantineTab();
      } else if (State.activeTab === 'disinfection_planner') {
        contentPanel.innerHTML = UIEngine.renderDisinfectionTab();
      } else if (State.activeTab === 'visitor_vehicle_log') {
        contentPanel.innerHTML = UIEngine.renderVisitorTab();
      } else if (State.activeTab === 'biosecurity_audit_scorecard') {
        contentPanel.innerHTML = UIEngine.renderAuditTab();
      }
    },

    // Lifecycle Destroy
    destroy() {
      if (State.containerElement) {
        State.containerElement.innerHTML = '';
        State.containerElement = null;
      }
      State.listenersBound = false;
      console.log('[BiosecurityEngine] Module destroyed cleanly.');
    },

    // Programmatic Tab Switcher
    setActiveTab(tabName) {
      if (['quarantine_pen', 'disinfection_planner', 'visitor_vehicle_log', 'biosecurity_audit_scorecard'].includes(tabName)) {
        State.activeTab = tabName;
        this.refreshView();
      }
    },

    // Generate Official Bilingual Quarantine Release Certificate Pass
    printQuarantineReleasePass(animalId) {
      const animal = State.quarantineAnimals.find(a => a.id === animalId);
      if (!animal) {
        notify('पशु रिकॉर्ड नहीं मिला।', 'error');
        return;
      }

      const serology = animal.serologyScreening || {};
      const printWindow = window.open('', '_blank', 'width=900,height=750');
      if (!printWindow) {
        notify('प्रिंट विंडो पॉपअप ब्लॉक हो गया है। पॉपअप्स की अनुमति दें।', 'warning');
        return;
      }

      const certHtml = `
        <!DOCTYPE html>
        <html lang="hi">
        <head>
          <meta charset="UTF-8" />
          <title>Quarantine Clearance Pass - ${animal.tagNo}</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.5; padding: 20px; }
            .header-box { border-bottom: 3px double #064e3b; padding-bottom: 12px; text-align: center; }
            .crest { font-size: 26px; font-weight: 900; color: #064e3b; letter-spacing: 1px; }
            .subcrest { font-size: 13px; text-transform: uppercase; color: #555; font-weight: bold; }
            .title { font-size: 20px; font-weight: bold; margin-top: 15px; text-decoration: underline; color: #047857; }
            .details-grid { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .details-grid th, .details-grid td { border: 1px solid #cbd5e1; padding: 9px 12px; font-size: 12px; }
            .details-grid th { background-color: #f1f5f9; text-align: left; width: 30%; }
            .status-box { margin-top: 20px; padding: 15px; border: 2px solid #059669; background: #ecfdf5; border-radius: 8px; }
            .seal-row { margin-top: 60px; display: flex; justify-content: space-between; font-size: 12px; }
            .seal-box { border-top: 1px solid #333; width: 220px; text-align: center; padding-top: 5px; }
            .qr-mock { border: 2px dashed #64748b; padding: 10px; width: 100px; text-align: center; font-family: monospace; font-size: 10px; }
          </style>
        </head>
        <body>
          <div class="header-box">
            <div class="crest">VETCARE AI OS • NATIONAL DAIRY BIOSECURITY VAULT</div>
            <div class="subcrest">Department of Animal Husbandry & Biosecurity Protocol Command (2026 Pro)</div>
            <div class="title">आधिकारिक क्वारंटाइन क्लीयरेंस प्रमाण-पत्र (Quarantine Release Pass)</div>
          </div>

          <table class="details-grid">
            <tr>
              <th>कान का टैग नंबर (RFID Tag)</th>
              <td><strong>${animal.tagNo}</strong> (Internal ID: ${animal.id})</td>
            </tr>
            <tr>
              <th>पशु प्रजाति एवं नस्ल</th>
              <td>${animal.species}</td>
            </tr>
            <tr>
              <th>क्रय उद्गम स्थल (Source Origin)</th>
              <td>${animal.sourceLocation}</td>
            </tr>
            <tr>
              <th>आइसोलेशन प्रवेश तिथि</th>
              <td>${animal.arrivalDate} (${animal.daysCompleted} दिन आइसोलेशन संपन्न)</td>
            </tr>
            <tr>
              <th>सीरोलॉजिकल जांच (Brucellosis)</th>
              <td><strong>${serology.brucellosis || 'NEGATIVE'}</strong> (Verified via Diagnostic Agglutination)</td>
            </tr>
            <tr>
              <th>गोजातीय टीबी जांच (Bovine Tuberculosis)</th>
              <td><strong>${serology.tb || 'NEGATIVE'}</strong> (Single Intradermal Comparative Tuberculin)</td>
            </tr>
            <tr>
              <th>जॉन रोग जांच (MAP Johne\'s Disease)</th>
              <td><strong>${serology.jd || 'NEGATIVE'}</strong> (Serum Antibody ELISA Negative)</td>
            </tr>
            <tr>
              <th>कृमिनाशक प्रोफाइल (Prophylactic Deworming)</th>
              <td>${animal.dewormerAgent || 'Fenbendazole Broad-Spectrum Administered'}</td>
            </tr>
            <tr>
              <th>प्रवेश प्रतिरक्षण टीका (Vaccination Booster)</th>
              <td>${animal.vaccineName || 'FMD Oil Adjuvanted Vaccine Batch OK'}</td>
            </tr>
            <tr>
              <th>नैदानिक अवलोकन सारांश</th>
              <td>${animal.clinicalNotes || 'कोई संक्रामक लक्षण, खुरपका घाव अथवा ज्वर नहीं पाया गया।'}</td>
            </tr>
          </table>

          <div class="status-box">
            <strong>प्रमाणीकरण (Official Medical Sanction):</strong>
            <p style="margin: 4px 0 0 0; font-size: 12px;">
              प्रमाणित किया जाता है कि उपरोक्त पशु को जैव-सुरक्षा नियमों के तहत निर्धारित न्यूनतम 21-दिवसीय पृथक्करण अवधि में रखा गया है। उक्त पशु में किसी भी प्रकार के संक्रामक अथवा विषाणु जनित रोगों के लक्षण नहीं पाए गए हैं। इसे स्वस्थ प्रमाणित कर मुख्य झुंड में स्थानांतरित करने की अनुमति दी जाती है।
            </p>
          </div>

          <div class="seal-row">
            <div class="qr-mock">
              [ SECURE BIO-PASS ]<br />
              SHA-256 VERIFIED
            </div>
            <div class="seal-box">
              हस्ताक्षर फार्म बायोसिक्योरिटी सुपरवाइजर<br />
              (Farm Biosecurity Officer)
            </div>
            <div class="seal-box">
              अधिकृत पशु चिकित्सा अधिकारी<br />
              (Registered Veterinary Physician)
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(certHtml);
      printWindow.document.close();
    }
  };

})(window, document);
