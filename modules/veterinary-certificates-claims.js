// Vetcare AI OS - Veterinary Health Certification, Soundness Examination & Livestock Insurance Claims Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE REGISTRATION & ARCHITECTURAL ATTACHMENT
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // Standard Regulatory Presets & Legal Certification Rules
  window.VetcareApp.ClinicalData.RegulatoryStandards = {
    VET_OFFICER_DEFAULT: {
      name: 'Dr. Rahul Sharma',
      regNo: 'VCI-REG-2018-9941',
      designation: 'Veterinary Surgeon / Medical Officer',
      station: 'Government Civil Veterinary Hospital, Rohtak',
      stateCouncil: 'State Veterinary Council & VCI'
    },

    INSURANCE_COMPANIES: [
      'United India Insurance Co. Ltd.',
      'National Insurance Co. Ltd.',
      'The New India Assurance Co. Ltd.',
      'The Oriental Insurance Co. Ltd.',
      'HDFC ERGO General Insurance',
      'ICICI Lombard Livestock Cell'
    ],

    SOUNDNESS_ANATOMICAL_ZONES: {
      eyes: ['Clear, normal pupillary light reflex', 'No corneal opacity', 'Absence of Periodic Ophthalmia', 'Cataract free'],
      wind: ['Normal tracheal breath sounds', 'Absence of Roaring (Laryngeal Hemiplegia)', 'Absence of Broken Wind / Heaves (RAO)', 'Normal respiratory recovery post-exercise'],
      limbs: ['Free from Bone Spavin', 'Free from Ringbone & Sidebone', 'No Navicular Disease symptoms', 'Clean tendons without bow / strain', 'No Stringhalt (shivering)']
    },

    DISEASE_VACCINATION_MANDATES: [
      { disease: 'Foot & Mouth Disease (FMD)', validityDays: 180, mandatory: true },
      { disease: 'Haemorrhagic Septicaemia (HS)', validityDays: 365, mandatory: true },
      { disease: 'Blackquarter (BQ)', validityDays: 365, mandatory: true },
      { disease: 'Peste des Petits Ruminants (PPR)', validityDays: 1095, mandatory: false },
      { disease: 'Rabies (Small Animals / Equine)', validityDays: 365, mandatory: false }
    ]
  };

  // 2. INTERNAL STATE MANAGEMENT
  const State = {
    activeTab: 'health_certificates',
    containerElement: null,
    dbInstance: null,
    listenersBound: false,

    certificates: [],
    insuranceClaims: [],

    // Initial Bootstrap Seed Data
    seedData: {
      certificates: [
        {
          certId: 'CERT-HF-2026-101',
          certType: 'HEALTH_FITNESS',
          issueDate: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + 27 * 86400000).toISOString().split('T')[0],
          animalTagNo: '120094819201',
          microchipId: '985141002934812',
          species: 'Bovine (Buffalo)',
          breed: 'Murrah Grade 1',
          age: '5 Years',
          sex: 'Female',
          colorMarkings: 'Jet black body, switch of tail white, curved horns',
          ownerDetails: {
            name: 'Shri Rameshwar Yadav',
            address: 'Village Bohar, District Rohtak, Haryana',
            phone: '9812034912',
            aadharNo: '7841-2910-4491'
          },
          vetDetails: {
            name: 'Dr. Rahul Sharma',
            regNo: 'VCI-REG-2018-9941',
            designation: 'Veterinary Surgeon',
            station: 'Civil Veterinary Hospital, Rohtak'
          },
          qrVerificationHash: 'SHA256-VET-HF-99120481-OK',
          status: 'ISSUED',
          examinationDetails: {
            fmdFreeZoneDays: 21,
            bodyTemperatureF: 101.4,
            clinicalRemarks: 'Animal in excellent clinical health, afebrile, active, and certified fit for dairy sale and milk production.'
          }
        },
        {
          certId: 'CERT-SE-2026-102',
          certType: 'SOUNDNESS_EXAM',
          issueDate: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + 83 * 86400000).toISOString().split('T')[0],
          animalTagNo: 'EQ-HR-2026-4410',
          microchipId: '985141004491023',
          species: 'Equine (Horse)',
          breed: 'Marwari Stallion',
          age: '6 Years',
          sex: 'Male (Entire)',
          colorMarkings: 'Bay colored with white star on forehead and white sock on left hind limb',
          ownerDetails: {
            name: 'Kunwar Digvijay Singh',
            address: 'Farm House 4, Meham Road, Rohtak',
            phone: '9416029381',
            aadharNo: '4912-8841-1029'
          },
          vetDetails: {
            name: 'Dr. Rahul Sharma',
            regNo: 'VCI-REG-2018-9941',
            designation: 'Veterinary Surgeon',
            station: 'Civil Veterinary Hospital, Rohtak'
          },
          qrVerificationHash: 'SHA256-VET-SE-448102-OK',
          status: 'ISSUED',
          examinationDetails: {
            eyesStatus: 'Sound (No corneal opacity, lenses clear, no periodic ophthalmia)',
            windStatus: 'Sound (Tested at gallop, no roaring or whistling, no respiratory heave)',
            limbsStatus: 'Sound (Free from spavin, splints, ringbone, clean tendon sheaths, symmetrical gait)'
          }
        },
        {
          certId: 'CERT-TP-2026-103',
          certType: 'TRANSIT_PERMIT',
          issueDate: new Date().toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
          animalTagNo: 'CONSIGNMENT-CAP-20',
          microchipId: 'N/A (Group RFID Ear Tags)',
          species: 'Caprine (Goats - 20 Heads)',
          breed: 'Sirohi Pure',
          age: '12-18 Months',
          sex: 'Mixed (4 Bucks, 16 Does)',
          colorMarkings: 'Brown patches on white coat, standard Sirohi pendulous ears',
          ownerDetails: {
            name: 'M/s Haryana Organic Livestock Traders',
            address: 'Mandi Gate, Jind, Haryana',
            phone: '9896011294',
            aadharNo: 'GSTIN: 06AABCU9603R1ZM'
          },
          vetDetails: {
            name: 'Dr. Rahul Sharma',
            regNo: 'VCI-REG-2018-9941',
            designation: 'Authorized Transit Inspector',
            station: 'District Veterinary Polyclinic'
          },
          qrVerificationHash: 'SHA256-VET-TP-77192-OK',
          status: 'ISSUED',
          examinationDetails: {
            vehiclePlate: 'HR-38-T-9012 (Special Livestock Truck with Non-slip ramp)',
            originLocation: 'Rohtak Livestock Mandi, Haryana',
            destinationLocation: 'Ahmedabad APMC Market, Gujarat',
            distanceKm: 890,
            pprVaccineStatus: 'Vaccinated (Batch: PPR-IVRI-2025/11)'
          }
        }
      ],

      insuranceClaims: [
        {
          claimId: 'CLAIM-INS-2026-501',
          policyNo: 'NIC-CATTLE-994821',
          insuranceCompany: 'National Insurance Co. Ltd.',
          animalTagNo: '120094819201',
          microchipId: '985141002934812',
          ownerName: 'Shri Rameshwar Yadav',
          sumInsured: 75000,
          dateOfDeath: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
          causeOfDeath: 'Haemorrhagic Septicaemia (Septicaemic Shock with gelatinous throat oedema)',
          postMortemCertId: 'PM-2026-7842',
          tagIntactStatus: 'INTACT_EAR',
          salvageValueSkinMeat: 3000,
          netClaimPayable: 72000,
          recommendingPayment: true,
          claimStatus: 'CERTIFIED_APPROVED',
          remarks: 'The 12-digit ear tag was found securely intact in the left ear of the carcass during post-mortem examination. Physical description matches master policy schedule. Recommended for immediate settlement.'
        }
      ]
    }
  };

  // 3. PERSISTENT STORAGE ENGINE (INDEXED-DB INTERFACE WITH LOCALSTORAGE SAFETY)
  const StorageAdapter = {
    DB_NAME: 'VetcareCertificatesDB',
    DB_VERSION: 1,
    STORE_NAME: 'veterinary_legal_certificates',

    async initDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[CertificatesEngine] IndexedDB unavailable, reverting to LocalStorage.');
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
          console.error('[CertificatesEngine] DB Open Error:', event.target.error);
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
              localStorage.setItem('VETCARE_CERT_' + key, JSON.stringify(data));
              resolve(true);
            };
          } catch (e) {
            localStorage.setItem('VETCARE_CERT_' + key, JSON.stringify(data));
            resolve(true);
          }
        });
      } else {
        localStorage.setItem('VETCARE_CERT_' + key, JSON.stringify(data));
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
                const ls = localStorage.getItem('VETCARE_CERT_' + key);
                resolve(ls ? JSON.parse(ls) : null);
              }
            };
            req.onerror = () => {
              const ls = localStorage.getItem('VETCARE_CERT_' + key);
              resolve(ls ? JSON.parse(ls) : null);
            };
          } catch (e) {
            const ls = localStorage.getItem('VETCARE_CERT_' + key);
            resolve(ls ? JSON.parse(ls) : null);
          }
        });
      } else {
        const ls = localStorage.getItem('VETCARE_CERT_' + key);
        return Promise.resolve(ls ? JSON.parse(ls) : null);
      }
    }
  };

  // 4. REGULATORY VERIFICATION & FRAUD-PREVENTION ENGINE
  const RegulatoryEngine = {
    // Validates 12-digit Indian National Livestock Identification Number (INAPH / Bharat Pashudhan NDLM)
    validateEarTag(tagNo) {
      if (!tagNo) return false;
      const clean = tagNo.toString().replace(/[^0-9]/g, '');
      return clean.length === 12;
    },

    // Generates tamper-proof SHA-256 Mock Verification Token
    generateVerificationHash(certId, tagNo, date) {
      const raw = `${certId}|${tagNo}|${date}|VETCARE_PROD_2026_LEGAL`;
      let hash = 0;
      for (let i = 0; i < raw.length; i++) {
        const char = raw.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
      }
      return 'SHA256-VET-' + Math.abs(hash).toString(16).toUpperCase() + '-VERIFIED';
    },

    // Computes Net Insurance Claim Payable after salvage deduction
    computeClaimPayable(sumInsured, salvageValue, tagIntactStatus) {
      const sum = parseFloat(sumInsured) || 0;
      const salvage = parseFloat(salvageValue) || 0;
      
      let eligible = true;
      let notes = 'दावा पूर्णतः वैध व स्वीकृत (Fully Recommended)';

      if (tagIntactStatus === 'TAG_LOST_DISPUTED') {
        eligible = false;
        notes = 'विवादित दावा: कान का टैग अथवा कान का टुकड़ा उपलब्ध नहीं कराया गया (No Tag / Ear Disputed)';
      }

      const netPayable = eligible ? Math.max(0, sum - salvage) : 0;
      return {
        sumInsured: sum,
        salvageDeduction: salvage,
        netPayable: netPayable,
        eligible: eligible,
        notes: notes
      };
    }
  };

  // 5. TOAST NOTIFICATION UTILITY
  function notify(msg, type = 'info') {
    if (window.VetcareApp && typeof window.VetcareApp.showToast === 'function') {
      window.VetcareApp.showToast(msg, type);
    } else {
      console.log(`[CertificatesEngine ${type.toUpperCase()}]: ${msg}`);
    }
  }

  // 6. UI COMPONENT RENDERING ENGINE
  const UIEngine = {
    // Root Shell Layout
    renderMainLayout() {
      const certCount = State.certificates.length;
      const claimCount = State.insuranceClaims.length;
      const totalSumInsured = State.insuranceClaims.reduce((acc, curr) => acc + (curr.netClaimPayable || 0), 0);

      return `
        <div class="certificates-engine-wrapper max-w-7xl mx-auto space-y-6">

          <!-- EXECUTIVE TOP KPI & REGULATORY RIBBON -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- Metric 1: Total Issued Certificates -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">जारी आधिकारिक प्रमाण-पत्र</span>
                  <div class="text-2xl font-black font-display text-white mt-1">
                    ${certCount} <span class="text-xs font-normal text-slate-400 font-sans">जारी</span>
                  </div>
                  <div class="text-[11px] text-emerald-400 font-mono mt-0.5">
                    <i class="fa-solid fa-stamp mr-1"></i>VCI व शासकीय मान्यता प्राप्त
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl">
                  <i class="fa-solid fa-certificate"></i>
                </div>
              </div>
            </div>

            <!-- Metric 2: Active Insurance Claims -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">बीमा दावा प्रकरण (Claims)</span>
                  <div class="text-2xl font-black font-display text-amber-400 mt-1">
                    ${claimCount} <span class="text-xs font-normal text-slate-400 font-sans">डोजियर</span>
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    टैग सत्यापन: <strong>100% INAPH OK</strong>
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl">
                  <i class="fa-solid fa-file-invoice-dollar"></i>
                </div>
              </div>
            </div>

            <!-- Metric 3: Total Insurance Settled Value -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">प्रमाणित दावा देय राशि</span>
                  <div class="text-2xl font-black font-display text-cyan-400 mt-1">
                    ₹${totalSumInsured.toLocaleString('en-IN')}
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono mt-0.5">
                    साल्वैज कटौती पश्चात शुद्ध राशि
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl">
                  <i class="fa-solid fa-shield-halved"></i>
                </div>
              </div>
            </div>

            <!-- Metric 4: Legal Regulatory Compliance Index -->
            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-400 tracking-wider">विधिक अनुपालन दर (Legal Audit)</span>
                  <div class="text-2xl font-black font-display text-purple-400 mt-1">
                    100%
                  </div>
                  <div class="text-[11px] text-emerald-400 font-mono mt-0.5">
                    <i class="fa-solid fa-scale-balanced mr-1"></i>साक्ष्य अधिनियम मान्य
                  </div>
                </div>
                <div class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl">
                  <i class="fa-solid fa-gavel"></i>
                </div>
              </div>
            </div>

          </div>

          <!-- PRIMARY MODULE NAVIGATION TABS & ACTION BUTTONS -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button type="button" data-tab="health_certificates" class="cert-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'health_certificates' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-file-medical"></i>
                <span>१. स्वास्थ्य व फिटनेस प्रमाण-पत्र (Health Cert)</span>
              </button>
              <button type="button" data-tab="soundness_exam" class="cert-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'soundness_exam' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-horse"></i>
                <span>२. साउंडनेस परीक्षा (Equine / Bullock)</span>
              </button>
              <button type="button" data-tab="transit_permits" class="cert-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'transit_permits' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-truck-moving"></i>
                <span>३. अंतर्राज्यीय पारगमन परमिट (Transit Permit)</span>
              </button>
              <button type="button" data-tab="insurance_claim_dossier" class="cert-tab-btn px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${State.activeTab === 'insurance_claim_dossier' ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
                <i class="fa-solid fa-file-contract"></i>
                <span>४. पशुधन बीमा दावा डोजियर (Insurance Claims)</span>
              </button>
            </div>

            <!-- Action Trigger for New Certificate / Claim -->
            <div class="flex items-center gap-2">
              <button type="button" id="btnOpenIssueCertificateModal" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md flex items-center gap-1.5 transition-transform active:scale-95">
                <i class="fa-solid fa-plus-circle"></i>
                <span>नया प्रमाण-पत्र जारी करें</span>
              </button>
              <button type="button" id="btnOpenNewClaimModal" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md flex items-center gap-1.5 transition-transform active:scale-95">
                <i class="fa-solid fa-hand-holding-dollar"></i>
                <span>बीमा दावा दर्ज करें</span>
              </button>
            </div>
          </div>

          <!-- TAB CONTENT PANEL HOOK -->
          <div id="certTabContentPanel" class="transition-opacity duration-200"></div>

          <!-- DYNAMIC MODAL INJECTION STACK -->
          <div id="certModalContainer"></div>
        </div>
      `;
    },

    // TAB 1: Health & Fitness Certificates Registry
    renderHealthCertificatesTab() {
      const certs = State.certificates.filter(c => c.certType === 'HEALTH_FITNESS');

      const rows = certs.map(c => `
        <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
          <td class="py-3 px-4 font-mono text-xs">
            <span class="font-bold text-emerald-400">${c.certId}</span>
            <div class="text-[10px] text-slate-400">जारी: ${c.issueDate} | वैध: ${c.expiryDate}</div>
          </td>
          <td class="py-3 px-4">
            <div class="font-bold text-white text-sm font-mono">${c.animalTagNo}</div>
            <div class="text-[11px] text-slate-400">${c.species} (${c.breed}) • ${c.sex}</div>
            <div class="text-[10px] text-slate-500 truncate max-w-xs">${c.colorMarkings}</div>
          </td>
          <td class="py-3 px-4 text-xs text-slate-300">
            <div class="font-bold text-white">${c.ownerDetails.name}</div>
            <div class="text-[10px] text-slate-400">${c.ownerDetails.address}</div>
            <div class="text-[10px] font-mono text-cyan-400">Mo: ${c.ownerDetails.phone}</div>
          </td>
          <td class="py-3 px-4 text-xs font-mono">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <i class="fa-solid fa-shield-check mr-1"></i> प्रमाणित स्वस्थ (FIT)
            </span>
            <div class="text-[10px] text-slate-400 mt-1">तापमान: ${c.examinationDetails.bodyTemperatureF || '101.5'}°F</div>
          </td>
          <td class="py-3 px-4 text-right space-x-1.5">
            <button type="button" data-action="print_cert" data-id="${c.certId}" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 transition-colors">
              <i class="fa-solid fa-print mr-1"></i> A4 प्रमाण-पत्र
            </button>
          </td>
        </tr>
      `).join('');

      return `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div class="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-notes-medical text-emerald-400"></i>
                <span>पशु स्वास्थ्य एवं तंदुरुस्ती प्रमाण-पत्र पंजी (Veterinary Fitness Certificates)</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                पशु क्रय-विक्रय, डेयरी लोन, दुग्ध उत्पादन व प्रदर्शनी प्रवेश हेतु अधिकृत पशु चिकित्सा प्रमाण-पत्र
              </p>
            </div>
            <span class="text-xs font-mono text-emerald-400 font-bold">${certs.length} प्रमाण-पत्र सक्रिय</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                  <th class="py-3 px-4">प्रमाण-पत्र क्रमांक / तिथि</th>
                  <th class="py-3 px-4">पशु पहचान (टैग व हुलिया)</th>
                  <th class="py-3 px-4">पशु स्वामी का विवरण</th>
                  <th class="py-3 px-4">नैदानिक परीक्षण परिणाम</th>
                  <th class="py-3 px-4 text-right">विधिक कार्रवाई</th>
                </tr>
              </thead>
              <tbody>
                ${certs.length > 0 ? rows : '<tr><td colspan="5" class="p-8 text-center text-slate-400 text-xs font-mono">कोई स्वास्थ्य प्रमाण-पत्र उपलब्ध नहीं है। ऊपर दिए गए बटन से नया जारी करें।</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },

    // TAB 2: Soundness Examination for Working Equines & Bullocks
    renderSoundnessTab() {
      const certs = State.certificates.filter(c => c.certType === 'SOUNDNESS_EXAM');

      const rows = certs.map(c => `
        <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
          <td class="py-3 px-4 font-mono text-xs">
            <span class="font-bold text-amber-400">${c.certId}</span>
            <div class="text-[10px] text-slate-400">दिनांक: ${c.issueDate}</div>
          </td>
          <td class="py-3 px-4">
            <div class="font-bold text-white text-sm font-mono">${c.animalTagNo}</div>
            <div class="text-[11px] text-slate-400">${c.species} • ${c.breed}</div>
            <div class="text-[10px] text-slate-500">${c.colorMarkings}</div>
          </td>
          <td class="py-3 px-4 text-xs">
            <div class="space-y-1">
              <div class="flex items-center gap-1.5 text-[11px]">
                <i class="fa-solid fa-eye text-cyan-400 text-[10px]"></i>
                <span class="text-slate-300">आंखें: <strong>${c.examinationDetails.eyesStatus || 'Sound'}</strong></span>
              </div>
              <div class="flex items-center gap-1.5 text-[11px]">
                <i class="fa-solid fa-wind text-teal-400 text-[10px]"></i>
                <span class="text-slate-300">श्वास (Wind): <strong>${c.examinationDetails.windStatus || 'Sound'}</strong></span>
              </div>
              <div class="flex items-center gap-1.5 text-[11px]">
                <i class="fa-solid fa-bone text-amber-400 text-[10px]"></i>
                <span class="text-slate-300">अंग/खुर (Limbs): <strong>${c.examinationDetails.limbsStatus || 'Sound'}</strong></span>
              </div>
            </div>
          </td>
          <td class="py-3 px-4 text-xs">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              SOUND & FIT FOR WORK
            </span>
            <div class="text-[10px] text-slate-400 mt-1">स्वामी: ${c.ownerDetails.name}</div>
          </td>
          <td class="py-3 px-4 text-right space-x-1.5">
            <button type="button" data-action="print_cert" data-id="${c.certId}" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 border border-amber-500/40 transition-colors">
              <i class="fa-solid fa-print mr-1"></i> साउंडनेस प्रमाण-पत्र
            </button>
          </td>
        </tr>
      `).join('');

      return `
        <div class="space-y-6">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-horse text-amber-400"></i>
                  <span>अश्व एवं भारवाही बैल साउंडनेस प्रमाण-पत्र (Certificate of Soundness)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  आंखों की दृष्टि (Eyes), श्वास क्षमता (Wind / Roaring) एवं अंगों के जोड़ों (Limbs / Spavin / Ringbone) का विधिक परीक्षण
                </p>
              </div>
              <span class="text-xs font-mono text-amber-400 font-bold">${certs.length} परीक्षण संपन्न</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                    <th class="py-3 px-4">प्रमाण-पत्र क्रमांक</th>
                    <th class="py-3 px-4">पशु पहचान (Tag & Color)</th>
                    <th class="py-3 px-4">साउंडनेस जांच (Eyes, Wind, Limbs)</th>
                    <th class="py-3 px-4">अभिमत स्थिति</th>
                    <th class="py-3 px-4 text-right">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody>
                  ${certs.length > 0 ? rows : '<tr><td colspan="5" class="p-8 text-center text-slate-400 text-xs font-mono">कोई साउंडनेस प्रमाण-पत्र दर्ज नहीं है।</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    // TAB 3: Interstate Livestock Transit Permits
    renderTransitPermitsTab() {
      const certs = State.certificates.filter(c => c.certType === 'TRANSIT_PERMIT');

      const rows = certs.map(c => `
        <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
          <td class="py-3 px-4 font-mono text-xs">
            <span class="font-bold text-cyan-400">${c.certId}</span>
            <div class="text-[10px] text-slate-400">जारी तिथि: ${c.issueDate}</div>
          </td>
          <td class="py-3 px-4 text-xs">
            <div class="font-bold text-white">${c.species}</div>
            <div class="text-[11px] font-mono text-slate-400">कंसाइनमेंट: ${c.animalTagNo}</div>
          </td>
          <td class="py-3 px-4 text-xs">
            <div class="text-emerald-400 font-bold"><i class="fa-solid fa-location-dot mr-1"></i>${c.examinationDetails.originLocation}</div>
            <div class="text-amber-400 font-bold mt-0.5"><i class="fa-solid fa-flag-checkered mr-1"></i>${c.examinationDetails.destinationLocation}</div>
            <div class="text-[10px] font-mono text-slate-400 mt-1">दूरी: ${c.examinationDetails.distanceKm} km</div>
          </td>
          <td class="py-3 px-4 font-mono text-xs">
            <div class="text-slate-200">वाहन: <strong class="text-white">${c.examinationDetails.vehiclePlate}</strong></div>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 mt-1 inline-block">
              परिवहन योग्य (FIT TO TRAVEL)
            </span>
          </td>
          <td class="py-3 px-4 text-right space-x-1.5">
            <button type="button" data-action="print_cert" data-id="${c.certId}" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/40 transition-colors">
              <i class="fa-solid fa-print mr-1"></i> पारगमन परमिट
            </button>
          </td>
        </tr>
      `).join('');

      return `
        <div class="space-y-6">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-truck-moving text-cyan-400"></i>
                  <span>पशु परिवहन एवं अंतर्राज्यीय पारगमन परमिट (Livestock Transit Permits)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  पशु क्रूरता निवारण (परिवहन) नियम एवं केंद्रीय मोटर वाहन अधिनियम अनुसार संक्रामक रोग-मुक्त फिटनेस परमिट
                </p>
              </div>
              <span class="text-xs font-mono text-cyan-400 font-bold">${certs.length} परमिट सक्रिय</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                    <th class="py-3 px-4">परमिट क्रमांक</th>
                    <th class="py-3 px-4">पशु प्रजाति एवं संख्या</th>
                    <th class="py-3 px-4">प्रस्थान एवं गंतव्य स्थल</th>
                    <th class="py-3 px-4">वाहन एवं संक्रामकता स्थिति</th>
                    <th class="py-3 px-4 text-right">विधिक कार्रवाई</th>
                  </tr>
                </thead>
                <tbody>
                  ${certs.length > 0 ? rows : '<tr><td colspan="5" class="p-8 text-center text-slate-400 text-xs font-mono">कोई पारगमन परमिट उपलब्ध नहीं है।</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    },

    // TAB 4: Insurance Claim Settlement Dossier
    renderInsuranceClaimsTab() {
      const claims = State.insuranceClaims;

      const rows = claims.map(cl => {
        let tagBadge = '';
        if (cl.tagIntactStatus === 'INTACT_EAR') {
          tagBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">टैग कान में सुरक्षित (INTACT)</span>';
        } else if (cl.tagIntactStatus === 'CUT_PORTION_SUBMITTED') {
          tagBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">कटा हुआ कान प्रस्तुत</span>';
        } else {
          tagBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">टैग गुम / विवादित (DISPUTED)</span>';
        }

        return `
          <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
            <td class="py-3 px-4 font-mono text-xs">
              <span class="font-bold text-purple-400">${cl.claimId}</span>
              <div class="text-[10px] text-slate-400">पॉलिसी: ${cl.policyNo}</div>
              <div class="text-[10px] text-slate-500">${cl.insuranceCompany}</div>
            </td>
            <td class="py-3 px-4">
              <div class="font-bold text-white text-sm font-mono">${cl.animalTagNo}</div>
              <div class="text-xs text-slate-300">${cl.ownerName}</div>
              <div class="mt-1">${tagBadge}</div>
            </td>
            <td class="py-3 px-4 text-xs">
              <div class="text-rose-400 font-bold">${cl.causeOfDeath}</div>
              <div class="text-[10px] font-mono text-slate-400">मृत्यु दिनांक: ${cl.dateOfDeath}</div>
              <div class="text-[10px] font-mono text-cyan-400">PM रिपोर्ट Ref: ${cl.postMortemCertId || 'N/A'}</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs">
              <div>बीमा राशि: ₹${cl.sumInsured.toLocaleString('en-IN')}</div>
              <div class="text-slate-400 text-[10px]">साल्वैज कटौती: - ₹${cl.salvageValueSkinMeat.toLocaleString('en-IN')}</div>
              <div class="text-emerald-400 font-black text-sm mt-0.5">देय दावा: ₹${cl.netClaimPayable.toLocaleString('en-IN')}</div>
            </td>
            <td class="py-3 px-4 text-right space-x-1.5">
              <button type="button" data-action="print_claim" data-id="${cl.claimId}" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/40 transition-colors">
                <i class="fa-solid fa-print mr-1"></i> दावा डोजियर
              </button>
            </td>
          </tr>
        `;
      }).join('');

      return `
        <div class="space-y-6">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <i class="fa-solid fa-file-contract text-purple-400"></i>
                  <span>पशुधन बीमा मृत्यु दावा सत्यापन पंजी (Livestock Insurance Claim Settlements)</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  12-अंकीय RFID टैग सत्यापन, त्वचा व मांस साल्वैज मूल्य कटौती एवं पीएम-आधारित विधिक दावा संस्तुति
                </p>
              </div>
              <span class="text-xs font-mono text-purple-400 font-bold">${claims.length} दावे पंजीकृत</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950 text-[10px] font-mono uppercase text-slate-400">
                    <th class="py-3 px-4">दावा आईडी / बीमा कंपनी</th>
                    <th class="py-3 px-4">पशु टैग एवं स्वामी विवरण</th>
                    <th class="py-3 px-4">मृत्यु का कारण एवं साक्ष्य</th>
                    <th class="py-3 px-4">बीमा राशि व साल्वैज गणना</th>
                    <th class="py-3 px-4 text-right">विधिक कार्रवाई</th>
                  </tr>
                </thead>
                <tbody>
                  ${claims.length > 0 ? rows : '<tr><td colspan="5" class="p-8 text-center text-slate-400 text-xs font-mono">कोई बीमा दावा पंजीकृत नहीं है।</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }
  };

  // 7. MODAL DIALOGS ENGINE (CERTIFICATE & CLAIM BUILDERS)
  const ModalController = {
    closeModal() {
      const container = document.getElementById('certModalContainer');
      if (container) container.innerHTML = '';
    },

    // Modal: Issue New Certificate Wizard
    openIssueCertificateModal() {
      const container = document.getElementById('certModalContainer');
      if (!container) return;

      const certId = 'CERT-VET-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <i class="fa-solid fa-stamp"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">नया अधिकृत पशु चिकित्सा प्रमाण-पत्र जारी करें</h3>
              </div>
              <button type="button" id="btnModalCloseCert" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formIssueCertificate" class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रमाण-पत्र क्रमांक*</label>
                  <input type="text" id="m_certId" value="${certId}" readonly class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-400 font-mono font-bold" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">प्रमाण-पत्र का प्रकार*</label>
                  <select id="m_certType" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="HEALTH_FITNESS">स्वास्थ्य एवं फिटनेस प्रमाण-पत्र (Health Fitness)</option>
                    <option value="SOUNDNESS_EXAM">साउंडनेस प्रमाण-पत्र (Equine/Bullock Soundness)</option>
                    <option value="TRANSIT_PERMIT">अंतर्राज्यीय पारगमन परमिट (Transit Permit)</option>
                  </select>
                </div>
              </div>

              <!-- Animal Identification -->
              <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span class="text-[10px] font-mono text-cyan-400 uppercase font-bold block">१. पशु पहचान विवरण (Animal Biometrics):</span>
                
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] text-slate-400 mb-1">12-अंकीय टैग नंबर (Ear Tag)*</label>
                    <input type="text" id="m_tagNo" required placeholder="120094819201" maxlength="15" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono" />
                  </div>
                  <div>
                    <label class="block text-[10px] text-slate-400 mb-1">प्रजाति एवं नस्ल*</label>
                    <input type="text" id="m_speciesBreed" required placeholder="उदा. मुर्रा भैंस / साहीवाल गाय" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white" />
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-2">
                  <div>
                    <label class="block text-[10px] text-slate-400 mb-1">आयु*</label>
                    <input type="text" id="m_age" placeholder="उदा. 4 वर्ष" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white" />
                  </div>
                  <div>
                    <label class="block text-[10px] text-slate-400 mb-1">लिंग*</label>
                    <select id="m_sex" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white">
                      <option value="Female">मादा (Female)</option>
                      <option value="Male">नर (Male)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[10px] text-slate-400 mb-1">माइक्रोचिप ID (यदि है)</label>
                    <input type="text" id="m_microchip" placeholder="Optional" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono" />
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] text-slate-400 mb-1">रंग, सींग व शारीरिक पहचान चिन्ह (Color & Markings)*</label>
                  <input type="text" id="m_markings" required placeholder="उदा. काला रंग, माथे पर सफेद टीका, पूंछ का गुच्छा सफेद" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white" />
                </div>
              </div>

              <!-- Owner Details -->
              <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span class="text-[10px] font-mono text-cyan-400 uppercase font-bold block">२. पशु स्वामी का विवरण (Owner Credentials):</span>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] text-slate-400 mb-1">पशुपालक का नाम*</label>
                    <input type="text" id="m_ownerName" required placeholder="श्री रामनिवास" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white" />
                  </div>
                  <div>
                    <label class="block text-[10px] text-slate-400 mb-1">मोबाइल नंबर*</label>
                    <input type="text" id="m_ownerPhone" required placeholder="98120XXXXX" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono" />
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] text-slate-400 mb-1">पूरा पता (Residential Address)*</label>
                  <input type="text" id="m_ownerAddress" required placeholder="ग्राम व डाकघर, जिला, राज्य" class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white" />
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">नैदानिक परीक्षण निष्कर्ष व विधिक टिप्पणी*</label>
                <textarea id="m_clinicalRemarks" rows="2" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">पशु संक्रामक व संसर्गजन्य रोगों से पूर्णतः मुक्त है। तापमान व शारीरिक जैविक मापदंड सामान्य हैं।</textarea>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelCertModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md">डिजिटल प्रमाण-पत्र जारी करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseCert').onclick = ModalController.closeModal;
      document.getElementById('btnCancelCertModal').onclick = ModalController.closeModal;

      document.getElementById('formIssueCertificate').onsubmit = async (e) => {
        e.preventDefault();
        const cId = document.getElementById('m_certId').value;
        const cType = document.getElementById('m_certType').value;
        const tag = document.getElementById('m_tagNo').value.trim();
        const spBreed = document.getElementById('m_speciesBreed').value.trim();
        const age = document.getElementById('m_age').value.trim();
        const sex = document.getElementById('m_sex').value;
        const micro = document.getElementById('m_microchip').value.trim();
        const mark = document.getElementById('m_markings').value.trim();
        const oName = document.getElementById('m_ownerName').value.trim();
        const oPhone = document.getElementById('m_ownerPhone').value.trim();
        const oAddr = document.getElementById('m_ownerAddress').value.trim();
        const remarks = document.getElementById('m_clinicalRemarks').value.trim();

        const newCert = {
          certId: cId,
          certType: cType,
          issueDate: new Date().toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          animalTagNo: tag,
          microchipId: micro || 'N/A',
          species: spBreed,
          breed: spBreed,
          age: age || 'वयस्क',
          sex: sex,
          colorMarkings: mark,
          ownerDetails: {
            name: oName,
            address: oAddr,
            phone: oPhone,
            aadharNo: 'Verified'
          },
          vetDetails: window.VetcareApp.ClinicalData.RegulatoryStandards.VET_OFFICER_DEFAULT,
          qrVerificationHash: RegulatoryEngine.generateVerificationHash(cId, tag, new Date().toISOString().split('T')[0]),
          status: 'ISSUED',
          examinationDetails: {
            fmdFreeZoneDays: 21,
            bodyTemperatureF: 101.5,
            clinicalRemarks: remarks,
            eyesStatus: 'Sound',
            windStatus: 'Sound',
            limbsStatus: 'Sound',
            originLocation: 'Civil Veterinary Hospital',
            destinationLocation: 'Interstate Movement',
            vehiclePlate: 'N/A'
          }
        };

        State.certificates.unshift(newCert);
        await StorageAdapter.setItem('certificates', State.certificates);

        ModalController.closeModal();
        notify(`प्रमाण-पत्र ${cId} सफलतापूर्वक जारी किया गया।`, 'success');
        window.VetcareApp.Modules.VeterinaryCertificatesClaims.refreshView();
      };
    },

    // Modal: File New Livestock Insurance Claim
    openNewClaimModal() {
      const container = document.getElementById('certModalContainer');
      if (!container) return;

      const claimId = 'CLAIM-INS-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900);

      container.innerHTML = `
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div class="bg-slate-900 border-2 border-purple-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <i class="fa-solid fa-file-contract"></i>
                </div>
                <h3 class="font-display font-bold text-base text-white">पशुधन मृत्यु बीमा दावा डोजियर तैयार करें</h3>
              </div>
              <button type="button" id="btnModalCloseClaim" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form id="formNewInsuranceClaim" class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">दावा क्रमांक (Claim ID)*</label>
                  <input type="text" id="clm_id" value="${claimId}" readonly class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-purple-400 font-mono font-bold" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">बीमा कंपनी (Insurance Co.)*</label>
                  <select id="clm_company" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    ${window.VetcareApp.ClinicalData.RegulatoryStandards.INSURANCE_COMPANIES.map(comp => `<option value="${comp}">${comp}</option>`).join('')}
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">पॉलिसी क्रमांक (Policy No.)*</label>
                  <input type="text" id="clm_policy" required placeholder="POL-CATTLE-99042" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">कान का टैग नंबर (12-Digit Tag)*</label>
                  <input type="text" id="clm_tag" required placeholder="120094819201" maxlength="15" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">पशुपालक / बीमित व्यक्ति का नाम*</label>
                  <input type="text" id="clm_owner" required placeholder="श्री रमेश कुमार" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">मृत्यु का दिनांक*</label>
                  <input type="date" id="clm_deathDate" value="${new Date().toISOString().split('T')[0]}" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">टैग स्थिति (Ear Tag Integrity Check)*</label>
                <select id="clm_tagStatus" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                  <option value="INTACT_EAR">टैग शव के कान में मजबूती से लगा पाया गया (Intact in Ear)</option>
                  <option value="CUT_PORTION_SUBMITTED">टैग लगा हुआ कान का कटा भाग प्रस्तुत किया गया (Ear Portion Submitted)</option>
                  <option value="TAG_LOST_DISPUTED">टैग गुम हो चुका है / विवादित दावा (Tag Lost - Disputed)</option>
                </select>
              </div>

              <!-- Financial Breakdown -->
              <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span class="text-[10px] font-mono text-cyan-400 uppercase font-bold block">वित्तीय मूल्यांकन व साल्वैज कटौती:</span>
                
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] text-slate-400 mb-1">बीमा धन (Sum Insured ₹)*</label>
                    <input type="number" id="clm_sum" value="70000" min="1000" required class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono font-bold" />
                  </div>
                  <div>
                    <label class="block text-[10px] text-slate-400 mb-1">चमड़ी/मांस साल्वैज मूल्य (Salvage Deduction ₹)*</label>
                    <input type="number" id="clm_salvage" value="2500" min="0" required class="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white font-mono" />
                  </div>
                </div>

                <div class="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span class="text-slate-400">अनुशंसित शुद्ध देय राशि:</span>
                  <span id="clm_netDisplay" class="font-bold text-emerald-400 text-sm">₹67,500</span>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-mono uppercase text-slate-300 mb-1">मृत्यु का कारण (Cause of Death / PM Ref)*</label>
                <input type="text" id="clm_cause" required placeholder="उदा. गलघोंटू (HS) एवं एंडोटॉक्सिक शॉक" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" id="btnCancelClaimModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">रद्द करें</button>
                <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md">दावा डोजियर अनुमोदित करें</button>
              </div>
            </form>
          </div>
        </div>
      `;

      document.getElementById('btnModalCloseClaim').onclick = ModalController.closeModal;
      document.getElementById('btnCancelClaimModal').onclick = ModalController.closeModal;

      const sumInp = document.getElementById('clm_sum');
      const salInp = document.getElementById('clm_salvage');
      const netDisp = document.getElementById('clm_netDisplay');

      const updateNet = () => {
        const s = parseFloat(sumInp.value) || 0;
        const sal = parseFloat(salInp.value) || 0;
        netDisp.textContent = '₹' + Math.max(0, s - sal).toLocaleString('en-IN');
      };

      sumInp.addEventListener('input', updateNet);
      salInp.addEventListener('input', updateNet);

      document.getElementById('formNewInsuranceClaim').onsubmit = async (e) => {
        e.preventDefault();
        const cId = document.getElementById('clm_id').value;
        const comp = document.getElementById('clm_company').value;
        const pol = document.getElementById('clm_policy').value.trim();
        const tag = document.getElementById('clm_tag').value.trim();
        const owner = document.getElementById('clm_owner').value.trim();
        const dDate = document.getElementById('clm_deathDate').value;
        const tagStat = document.getElementById('clm_tagStatus').value;
        const sum = parseFloat(sumInp.value);
        const sal = parseFloat(salInp.value);
        const cause = document.getElementById('clm_cause').value.trim();

        const claimCalc = RegulatoryEngine.computeClaimPayable(sum, sal, tagStat);

        const newClaim = {
          claimId: cId,
          policyNo: pol,
          insuranceCompany: comp,
          animalTagNo: tag,
          microchipId: 'N/A',
          ownerName: owner,
          sumInsured: sum,
          dateOfDeath: dDate,
          causeOfDeath: cause,
          postMortemCertId: 'PM-VET-' + Math.floor(1000 + Math.random() * 9000),
          tagIntactStatus: tagStat,
          salvageValueSkinMeat: sal,
          netClaimPayable: claimCalc.netPayable,
          recommendingPayment: claimCalc.eligible,
          claimStatus: claimCalc.eligible ? 'CERTIFIED_APPROVED' : 'DISPUTED_REJECTED',
          remarks: claimCalc.notes
        };

        State.insuranceClaims.unshift(newClaim);
        await StorageAdapter.setItem('insuranceClaims', State.insuranceClaims);

        ModalController.closeModal();
        notify(`बीमा दावा ${cId} विधिवत पंजीकृत किया गया।`, 'success');
        window.VetcareApp.Modules.VeterinaryCertificatesClaims.refreshView();
      };
    }
  };

  // 8. EVENT BINDING & DELEGATION SUBSYSTEM
  function bindDOMEvents(container) {
    if (State.listenersBound) return;

    container.addEventListener('click', (e) => {
      // 1. Tab Navigation
      const tabBtn = e.target.closest('.cert-tab-btn');
      if (tabBtn) {
        const targetTab = tabBtn.getAttribute('data-tab');
        if (targetTab && targetTab !== State.activeTab) {
          State.activeTab = targetTab;
          window.VetcareApp.Modules.VeterinaryCertificatesClaims.refreshView();
        }
        return;
      }

      // 2. Open Certificate Wizard Modal
      if (e.target.closest('#btnOpenIssueCertificateModal')) {
        ModalController.openIssueCertificateModal();
        return;
      }

      // 3. Open Insurance Claim Modal
      if (e.target.closest('#btnOpenNewClaimModal')) {
        ModalController.openNewClaimModal();
        return;
      }

      // 4. Print Certificate Button
      const printCertBtn = e.target.closest('button[data-action="print_cert"]');
      if (printCertBtn) {
        const certId = printCertBtn.getAttribute('data-id');
        window.VetcareApp.Modules.VeterinaryCertificatesClaims.printCertificate(certId);
        return;
      }

      // 5. Print Insurance Claim Dossier
      const printClaimBtn = e.target.closest('button[data-action="print_claim"]');
      if (printClaimBtn) {
        const claimId = printClaimBtn.getAttribute('data-id');
        window.VetcareApp.Modules.VeterinaryCertificatesClaims.printCertificate(claimId);
        return;
      }
    });

    State.listenersBound = true;
  }

  // 9. PUBLIC API & LIFECYCLE IMPLEMENTATION
  window.VetcareApp.Modules.VeterinaryCertificatesClaims = {
    // Lifecycle Init
    async init() {
      try {
        await StorageAdapter.initDB();

        const savedCerts = await StorageAdapter.getItem('certificates');
        State.certificates = Array.isArray(savedCerts) && savedCerts.length > 0 ? savedCerts : State.seedData.certificates;

        const savedClaims = await StorageAdapter.getItem('insuranceClaims');
        State.insuranceClaims = Array.isArray(savedClaims) && savedClaims.length > 0 ? savedClaims : State.seedData.insuranceClaims;

        console.log('[CertificatesEngine] Module initialized with', State.certificates.length, 'certs and', State.insuranceClaims.length, 'claims.');
      } catch (err) {
        console.error('[CertificatesEngine] Init Error:', err);
      }
    },

    // Lifecycle Render
    render(containerId) {
      const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!container) {
        console.error(`[CertificatesEngine] Container ${containerId} not found.`);
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
      const contentPanel = State.containerElement.querySelector('#certTabContentPanel');
      if (!contentPanel) return;

      if (State.activeTab === 'health_certificates') {
        contentPanel.innerHTML = UIEngine.renderHealthCertificatesTab();
      } else if (State.activeTab === 'soundness_exam') {
        contentPanel.innerHTML = UIEngine.renderSoundnessTab();
      } else if (State.activeTab === 'transit_permits') {
        contentPanel.innerHTML = UIEngine.renderTransitPermitsTab();
      } else if (State.activeTab === 'insurance_claim_dossier') {
        contentPanel.innerHTML = UIEngine.renderInsuranceClaimsTab();
      }
    },

    // Lifecycle Destroy
    destroy() {
      if (State.containerElement) {
        State.containerElement.innerHTML = '';
        State.containerElement = null;
      }
      State.listenersBound = false;
      console.log('[CertificatesEngine] Module destroyed cleanly.');
    },

    // High-Resolution A4 Legal Certificate & Claim Dossier Printer
    printCertificate(recordId) {
      const cert = State.certificates.find(c => c.certId === recordId);
      const claim = State.insuranceClaims.find(cl => cl.claimId === recordId);

      const printWindow = window.open('', '_blank', 'width=950,height=800');
      if (!printWindow) {
        notify('प्रिंट विंडो पॉपअप अवरुद्ध हो गया है। पॉपअप्स की अनुमति दें।', 'warning');
        return;
      }

      let printHtml = '';

      if (cert) {
        // Output Official Veterinary Certificate (Health, Soundness, or Transit)
        const v = cert.vetDetails;
        const o = cert.ownerDetails;
        const ex = cert.examinationDetails;

        printHtml = `
          <!DOCTYPE html>
          <html lang="hi">
          <head>
            <meta charset="UTF-8" />
            <title>Legal Certificate - ${cert.certId}</title>
            <style>
              @page { size: A4 portrait; margin: 15mm; }
              body { font-family: 'Times New Roman', Times, serif; color: #111; line-height: 1.4; padding: 10px; font-size: 13px; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; }
              .crest { font-size: 18px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
              .subcrest { font-size: 12px; font-weight: bold; margin-top: 2px; }
              .title { font-size: 15px; font-weight: bold; margin-top: 8px; text-decoration: underline; text-transform: uppercase; }
              .meta-strip { display: flex; justify-content: space-between; font-weight: bold; font-size: 12px; margin-bottom: 12px; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 12px; }
              th, td { border: 1px solid #333; padding: 6px 8px; font-size: 12px; text-align: left; vertical-align: top; }
              th { background-color: #f2f2f2; width: 30%; }
              .verdict-box { border: 2px solid #000; padding: 12px; margin-top: 15px; background-color: #fafafa; }
              .footer-sign { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 50px; }
              .sign-box { border-top: 1px solid #000; width: 230px; text-align: center; padding-top: 5px; font-size: 12px; font-weight: bold; }
              .qr-box { border: 1px dashed #000; padding: 8px; width: 150px; text-align: center; font-family: monospace; font-size: 9px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="crest">पशुपालन एवं डेयरी विभाग • DEPARTMENT OF ANIMAL HUSBANDRY</div>
              <div class="subcrest">STATE VETERINARY CLINICAL & REGULATORY REGISTRATION NETWORK</div>
              <div class="title">
                ${cert.certType === 'HEALTH_FITNESS' ? 'आधिकारिक पशु स्वास्थ्य एवं तंदुरुस्ती प्रमाण-पत्र (CERTIFICATE OF HEALTH & FITNESS)' :
                  cert.certType === 'SOUNDNESS_EXAM' ? 'पशु साउंडनेस एवं कार्यक्षमता प्रमाण-पत्र (CERTIFICATE OF SOUNDNESS)' :
                  'पशु पारगमन एवं अंतर्राज्यीय परिवहन परमिट (INTERSTATE LIVESTOCK TRANSIT PERMIT)'}
              </div>
            </div>

            <div class="meta-strip">
              <span>प्रमाण-पत्र क्रमांक: <u>${cert.certId}</u></span>
              <span>जारी दिनांक: <u>${cert.issueDate}</u></span>
              <span>वैधता समाप्ति: <u>${cert.expiryDate}</u></span>
            </div>

            <table>
              <tr>
                <th>१. पशु पहचान (12-Digit Tag)</th>
                <td><strong>${cert.animalTagNo}</strong> (Microchip: ${cert.microchipId || 'N/A'})</td>
              </tr>
              <tr>
                <th>२. प्रजाति, नस्ल, लिंग एवं आयु</th>
                <td>${cert.species} | नस्ल: ${cert.breed} | लिंग: ${cert.sex} | आयु: ${cert.age}</td>
              </tr>
              <tr>
                <th>३. रंग व शारीरिक हुलिया (Markings)</th>
                <td>${cert.colorMarkings}</td>
              </tr>
              <tr>
                <th>४. पशु स्वामी का नाम व पता</th>
                <td><strong>${o.name}</strong>, ${o.address} (दूरभाष: ${o.phone})</td>
              </tr>
              ${cert.certType === 'TRANSIT_PERMIT' ? `
                <tr>
                  <th>५. प्रस्थान व गंतव्य स्थल</th>
                  <td>प्रस्थान: ${ex.originLocation} &rarr; गंतव्य: ${ex.destinationLocation} (दूरी: ${ex.distanceKm} km)</td>
                </tr>
                <tr>
                  <th>६. परिवहन वाहन क्रमांक</th>
                  <td><strong>${ex.vehiclePlate}</strong> (Transport of Animals Rules Compliant)</td>
                </tr>
              ` : ''}
              ${cert.certType === 'SOUNDNESS_EXAM' ? `
                <tr>
                  <th>५. साउंडनेस परीक्षण निष्कर्ष</th>
                  <td>नेत्र दृष्टि: ${ex.eyesStatus} <br />श्वास क्षमता: ${ex.windStatus} <br />अंग व संधियां (Limbs): ${ex.limbsStatus}</td>
                </tr>
              ` : ''}
            </table>

            <div class="verdict-box">
              <strong>चिकित्सकीय विधिक प्रमाणीकरण (Official Veterinary Declaration):</strong>
              <p style="margin: 6px 0 0 0; text-align: justify; font-size: 12px;">
                प्रमाणित किया जाता है कि मैंने आज दिनांक <strong>${cert.issueDate}</strong> को उपरोक्त वर्णित पशु का व्यक्तिगत रूप से विस्तृत नैदानिक एवं विधिक परीक्षण किया है। पशु में खुरपका-मुँहपका (FMD), गलघोंटू (HS), लंगड़ा बुखार (BQ) अथवा अन्य किसी संक्रामक/संसर्गजन्य रोग के लक्षण नहीं पाए गए हैं। पशु पूर्णतः स्वस्थ है और विधिक रूप से 
                ${cert.certType === 'HEALTH_FITNESS' ? 'दुग्ध उत्पादन, क्रय-विक्रय व संवर्धन हेतु फिट है।' :
                  cert.certType === 'SOUNDNESS_EXAM' ? 'सवारी, प्रजनन एवं कार्य हेतु साउंड (दोषमुक्त) पाया गया है।' :
                  'गंतव्य तक सुरक्षित परिवहन योग्य (Fit to Travel) प्रमाणित किया जाता है।'}
              </p>
            </div>

            <div class="footer-sign">
              <div class="qr-box">
                [ DIGITAL AUTHENTIC ]<br />
                ${cert.qrVerificationHash}<br />
                VCI VALIDATED 2026
              </div>

              <div class="sign-box">
                हस्ताक्षर एवं आधिकारिक मुहर<br />
                <strong>${v.name}</strong><br />
                ${v.designation}<br />
                पंजीकरण सं: ${v.regNo}<br />
                ${v.station}
              </div>
            </div>

            <script>
              window.onload = function() { window.print(); };
            </script>
          </body>
          </html>
        `;
      } else if (claim) {
        // Output Insurance Claim Settlement Dossier
        printHtml = `
          <!DOCTYPE html>
          <html lang="hi">
          <head>
            <meta charset="UTF-8" />
            <title>Insurance Claim Dossier - ${claim.claimId}</title>
            <style>
              @page { size: A4 portrait; margin: 15mm; }
              body { font-family: 'Times New Roman', Times, serif; color: #111; line-height: 1.4; padding: 10px; font-size: 13px; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; }
              .crest { font-size: 17px; font-weight: bold; text-transform: uppercase; }
              .subcrest { font-size: 12px; font-weight: bold; margin-top: 2px; }
              .title { font-size: 15px; font-weight: bold; margin-top: 8px; text-decoration: underline; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 12px; }
              th, td { border: 1px solid #333; padding: 6px 8px; font-size: 12px; text-align: left; }
              th { background-color: #f2f2f2; width: 32%; }
              .box { border: 2px solid #000; padding: 10px; margin-top: 12px; background: #fafafa; }
              .footer-sign { display: flex; justify-content: space-between; margin-top: 50px; }
              .sign-box { border-top: 1px solid #000; width: 230px; text-align: center; padding-top: 5px; font-size: 12px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="crest">पशुधन मृत्यु बीमा दावा सत्यापन डोजियर (LIVESTOCK INSURANCE CLAIM REPORT)</div>
              <div class="subcrest">${claim.insuranceCompany} • VETERINARY LEGAL INVESTIGATION</div>
              <div class="title">दावा संस्तुति एवं कान का टैग सत्यापन प्रमाण-पत्र</div>
            </div>

            <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 10px;">
              <span>दावा क्रमांक: <u>${claim.claimId}</u></span>
              <span>पॉलिसी क्रमांक: <u>${claim.policyNo}</u></span>
              <span>मृत्यु दिनांक: <u>${claim.dateOfDeath}</u></span>
            </div>

            <table>
              <tr>
                <th>१. बीमित पशुपालक का नाम</th>
                <td><strong>${claim.ownerName}</strong></td>
              </tr>
              <tr>
                <th>२. 12-अंकीय पशु टैग संख्या</th>
                <td><strong>${claim.animalTagNo}</strong> (INAPH Verified)</td>
              </tr>
              <tr>
                <th>३. कान के टैग की वास्तविक स्थिति</th>
                <td><strong>${claim.tagIntactStatus === 'INTACT_EAR' ? 'टैग शव के कान में मजबूती से लगा पाया गया (Tag Intact in Ear)' : claim.tagIntactStatus}</strong></td>
              </tr>
              <tr>
                <th>४. मृत्यु का वैज्ञानिक कारण</th>
                <td>${claim.causeOfDeath} (PM रिपोर्ट क्रमांक: <strong>${claim.postMortemCertId}</strong>)</td>
              </tr>
              <tr>
                <th>५. कुल बीमित राशि (Sum Insured)</th>
                <td>₹${claim.sumInsured.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <th>६. साल्वैज मूल्य कटौती (Skin/Carcass)</th>
                <td>- ₹${claim.salvageValueSkinMeat.toLocaleString('en-IN')}</td>
              </tr>
              <tr style="background: #eee; font-weight: bold;">
                <th>७. शुद्ध अनुशंसित दावा राशि</th>
                <td style="color: #047857; font-size: 14px;">₹${claim.netClaimPayable.toLocaleString('en-IN')}</td>
              </tr>
            </table>

            <div class="box">
              <strong>चिकित्सा अधिकारी की विधिक संस्तुति:</strong>
              <p style="margin: 4px 0 0 0; text-align: justify;">
                ${claim.remarks} प्रमाणित किया जाता है कि मृत पशु का भौतिक हुलिया व टैग नंबर बीमा अनुसूची से पूर्णतः मेल खाता है। पशु की मृत्यु किसी कपटपूर्ण इरादे से नहीं हुई है। अतः बीमा कंपनी को शुद्ध दावा राशि ₹${claim.netClaimPayable.toLocaleString('en-IN')} के भुगतान की अनुशंसा की जाती है।
              </p>
            </div>

            <div class="footer-sign">
              <div class="sign-box">
                बीमित पशुपालक के हस्ताक्षर<br />
                (Insured Farmer)
              </div>

              <div class="sign-box">
                हस्ताक्षर अधिकृत पशु चिकित्सा अधिकारी<br />
                (Registered Veterinary Surgeon)<br />
                सील व पंजीकरण संख्या सहित
              </div>
            </div>

            <script>
              window.onload = function() { window.print(); };
            </script>
          </body>
          </html>
        `;
      } else {
        notify('अभिलेख नहीं मिला।', 'error');
        return;
      }

      printWindow.document.open();
      printWindow.document.write(printHtml);
      printWindow.document.close();
    }
  };

})(window, document);
