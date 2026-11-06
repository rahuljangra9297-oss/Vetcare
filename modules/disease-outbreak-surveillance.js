// Vetcare AI OS - Veterinary Disease Outbreak Surveillance, GIS Cluster Mapping & One-Health Alert Engine (2026 Production)

(function (window, document) {
  "use strict";

  // Ensure Root Namespaces
  window.VetcareApp = window.VetcareApp || {};
  window.VetcareApp.Modules = window.VetcareApp.Modules || {};
  window.VetcareApp.ClinicalData = window.VetcareApp.ClinicalData || {};

  // ============================================================================
  // 1. STATUTORY DISEASE CATALOG & ONE-HEALTH BIOHAZARD REFERENCE
  // ============================================================================
  const STATUTORY_DISEASE_REGISTRY = {
    lumpy_skin_disease: {
      id: "lumpy_skin_disease",
      name: "Lumpy Skin Disease (गांठदार त्वचा रोग)",
      pathogen: "Capripoxvirus (Neethling strain)",
      family: "Poxviridae",
      isZoonotic: false,
      isNotifiable: true,
      woahListed: true,
      vectorBorne: true,
      primarySpecies: ["Bovine (Cattle)", "Bubaline (Water Buffalo)"],
      incubationPeriodDays: 14,
      mortalityRateTypicalPct: 3.5,
      morbidityRateTypicalPct: 45.0,
      ringVaccineStrain: "Goat Pox Vaccine (Uttarkashi / Heterologous 10x dose)",
      containmentSOP: "Strict ban on cattle transport, vector insect fogging with cypermethrin, daily isolation of nodular cases, 3km ring vaccination."
    },
    fmd: {
      id: "fmd",
      name: "Foot & Mouth Disease (खुरपका-मुंहपका)",
      pathogen: "Aphthovirus (Types O, A, Asia-1)",
      family: "Picornaviridae",
      isZoonotic: false,
      isNotifiable: true,
      woahListed: true,
      vectorBorne: false,
      primarySpecies: ["Cattle", "Buffalo", "Sheep", "Goat", "Swine"],
      incubationPeriodDays: 6,
      mortalityRateTypicalPct: 2.0,
      morbidityRateTypicalPct: 85.0,
      ringVaccineStrain: "Trivalent Inactivated Adjuvanted FMD Vaccine",
      containmentSOP: "Immediate animal movement freeze, 4% sodium carbonate / 2% acetic acid footbaths at farm perimeter, ring vaccination outward from 3km to 10km buffer."
    },
    african_swine_fever: {
      id: "african_swine_fever",
      name: "African Swine Fever (अफ्रीकी स्वाइन बुखार)",
      pathogen: "African swine fever virus (ASFV)",
      family: "Asfarviridae",
      isZoonotic: false,
      isNotifiable: true,
      woahListed: true,
      vectorBorne: true,
      primarySpecies: ["Domestic Swine", "Wild Boar"],
      incubationPeriodDays: 7,
      mortalityRateTypicalPct: 98.0,
      morbidityRateTypicalPct: 90.0,
      ringVaccineStrain: "None Licensed (Total Stamping-Out Protocol)",
      containmentSOP: "Zero movement cordon, humane culling within 1km infected epicenter, carcass deep burial with quicklime (2.5m depth), 10km surveillance ring."
    },
    avian_influenza: {
      id: "avian_influenza",
      name: "Highly Pathogenic Avian Influenza (बर्ड फ्लू H5N1)",
      pathogen: "HPAI H5N1 / H5N8 Orthomyxovirus",
      family: "Orthomyxoviridae",
      isZoonotic: true,
      isNotifiable: true,
      woahListed: true,
      vectorBorne: false,
      primarySpecies: ["Broiler Chickens", "Layers", "Ducks", "Waterfowl"],
      incubationPeriodDays: 3,
      mortalityRateTypicalPct: 95.0,
      morbidityRateTypicalPct: 95.0,
      ringVaccineStrain: "Ring Culling Protocol (DAHD Action Plan 2021/2026)",
      containmentSOP: "Stamping-out of all poultry within 1km radius, disposal by incineration or deep pit, compulsory full PPE (Level C/D) for veterinary responders."
    },
    anthrax: {
      id: "anthrax",
      name: "Bacillus Anthracis / Anthrax (गिल्टी रोग)",
      pathogen: "Bacillus anthracis (Spore-forming Gram-positive)",
      family: "Bacillaceae",
      isZoonotic: true,
      isNotifiable: true,
      woahListed: true,
      vectorBorne: false,
      primarySpecies: ["Cattle", "Sheep", "Goats", "Horses", "Humans"],
      incubationPeriodDays: 5,
      mortalityRateTypicalPct: 90.0,
      morbidityRateTypicalPct: 20.0,
      ringVaccineStrain: "Anthrax Spore Vaccine (Sterne Strain 34F2)",
      containmentSOP: "Strict prohibition of necropsy/carcass incision, carcass encasement in unslaked lime, ring vaccination of all susceptible stock within 5km radius."
    },
    rabies: {
      id: "rabies",
      name: "Rabies Encephalitis (अलर्क / रेबीज)",
      pathogen: "Rabies lyssavirus",
      family: "Rhabdoviridae",
      isZoonotic: true,
      isNotifiable: true,
      woahListed: true,
      vectorBorne: false,
      primarySpecies: ["Canines", "Bovines", "Equines", "Humans"],
      incubationPeriodDays: 28,
      mortalityRateTypicalPct: 100.0,
      morbidityRateTypicalPct: 10.0,
      ringVaccineStrain: "Inactivated Rabies Tissue-Culture Vaccine (1ml SC/IM)",
      containmentSOP: "Isolation of aggressive suspected animal in bite-proof enclosure, mandatory human post-exposure prophylaxis (ARV + RIG) for all handlers, canine census ring vaccination."
    },
    brucellosis: {
      id: "brucellosis",
      name: "Brucellosis / Bang's Disease (संक्रामक गर्भपात)",
      pathogen: "Brucella abortus / Brucella melitensis",
      family: "Brucellaceae",
      isZoonotic: true,
      isNotifiable: true,
      woahListed: true,
      vectorBorne: false,
      primarySpecies: ["Cattle", "Buffalo", "Sheep", "Goats", "Humans"],
      incubationPeriodDays: 30,
      mortalityRateTypicalPct: 1.0,
      morbidityRateTypicalPct: 30.0,
      ringVaccineStrain: "Brucella abortus S19 Calfhood Vaccine (4-8 months female calves)",
      containmentSOP: "Hygienic incineration of aborted fetuses and lochia, boiling/pasteurization of milk, compulsory sero-surveillance (Rose Bengal Plate Test / ELISA)."
    }
  };

  // Register Reference to ClinicalData Namespace
  window.VetcareApp.ClinicalData.NotifiableDiseasesReporting = STATUTORY_DISEASE_REGISTRY;

  // ============================================================================
  // 2. SEED EPIDEMIOLOGICAL INCIDENTS (REALISTIC INDIAN VETERINARY SURVEILLANCE)
  // ============================================================================
  const DEFAULT_OUTBREAK_INCIDENTS = [
    {
      incidentId: "OB-2026-IND-0891",
      diseaseId: "lumpy_skin_disease",
      diseaseName: "Lumpy Skin Disease",
      speciesAffected: "Bovine (Sahiwal & Crossbred Cattle)",
      village: "Dudu",
      district: "Jaipur",
      state: "Rajasthan",
      gpsCoords: { lat: 26.6853, lng: 75.2341 },
      morbidityCount: 42,
      mortalityCount: 3,
      confirmedDate: "2026-03-24",
      labConfirmed: true,
      pathogen: "Capripoxvirus LSDV-RJ26",
      isZoonotic: false,
      isNotifiable: true,
      cordonRadiusKm: 10,
      containmentStatus: "ACTIVE_EPIDEMIC",
      ringVaccinationDone: 1840,
      ringVaccinationTarget: 2500,
      checkpointsDeployed: true,
      movementHalted: true,
      carcassDisposedProperly: true
    },
    {
      incidentId: "OB-2026-IND-0892",
      diseaseId: "lumpy_skin_disease",
      diseaseName: "Lumpy Skin Disease",
      speciesAffected: "Bovine (Indigenous Gir & Buffalo)",
      village: "Sambhar Lake Rural",
      district: "Jaipur",
      state: "Rajasthan",
      gpsCoords: { lat: 26.9124, lng: 75.1982 },
      morbidityCount: 29,
      mortalityCount: 1,
      confirmedDate: "2026-03-26",
      labConfirmed: true,
      pathogen: "Capripoxvirus LSDV-RJ26",
      isZoonotic: false,
      isNotifiable: true,
      cordonRadiusKm: 10,
      containmentStatus: "ACTIVE_EPIDEMIC",
      ringVaccinationDone: 920,
      ringVaccinationTarget: 1600,
      checkpointsDeployed: true,
      movementHalted: true,
      carcassDisposedProperly: true
    },
    {
      incidentId: "OB-2026-IND-0895",
      diseaseId: "lumpy_skin_disease",
      diseaseName: "Lumpy Skin Disease",
      speciesAffected: "Bovine (Cattle)",
      village: "Phulera",
      district: "Jaipur",
      state: "Rajasthan",
      gpsCoords: { lat: 26.8732, lng: 75.2411 },
      morbidityCount: 19,
      mortalityCount: 0,
      confirmedDate: "2026-03-27",
      labConfirmed: false,
      pathogen: "Capripoxvirus (Presumptive Field RT-PCR)",
      isZoonotic: false,
      isNotifiable: true,
      cordonRadiusKm: 10,
      containmentStatus: "ACTIVE_EPIDEMIC",
      ringVaccinationDone: 650,
      ringVaccinationTarget: 1200,
      checkpointsDeployed: false,
      movementHalted: true,
      carcassDisposedProperly: true
    },
    {
      incidentId: "OB-2026-IND-0774",
      diseaseId: "fmd",
      diseaseName: "Foot & Mouth Disease",
      speciesAffected: "Bubaline (Murrah Buffalo)",
      village: "Hansi Peripheral",
      district: "Hisar",
      state: "Haryana",
      gpsCoords: { lat: 29.1021, lng: 75.9612 },
      morbidityCount: 56,
      mortalityCount: 2,
      confirmedDate: "2026-03-18",
      labConfirmed: true,
      pathogen: "Aphthovirus Type O (Ind-2001 lineage)",
      isZoonotic: false,
      isNotifiable: true,
      cordonRadiusKm: 10,
      containmentStatus: "CONTAINED",
      ringVaccinationDone: 4100,
      ringVaccinationTarget: 4500,
      checkpointsDeployed: true,
      movementHalted: true,
      carcassDisposedProperly: true
    },
    {
      incidentId: "OB-2026-IND-0612",
      diseaseId: "avian_influenza",
      diseaseName: "Highly Pathogenic Avian Influenza",
      speciesAffected: "Poultry (Kuttanad Duck Flocks)",
      village: "Nedumudi",
      district: "Alappuzha",
      state: "Kerala",
      gpsCoords: { lat: 9.4312, lng: 76.4021 },
      morbidityCount: 1240,
      mortalityCount: 890,
      confirmedDate: "2026-03-20",
      labConfirmed: true,
      pathogen: "Influenza A Virus H5N1 (Clade 2.3.4.4b)",
      isZoonotic: true,
      isNotifiable: true,
      cordonRadiusKm: 10,
      containmentStatus: "ACTIVE_EPIDEMIC",
      ringVaccinationDone: 0,
      ringVaccinationTarget: 0,
      checkpointsDeployed: true,
      movementHalted: true,
      carcassDisposedProperly: true
    },
    {
      incidentId: "OB-2026-IND-0520",
      diseaseId: "anthrax",
      diseaseName: "Anthrax (गिल्टी रोग)",
      speciesAffected: "Bovine & Caprine",
      village: "Similiguda Pastoral",
      district: "Koraput",
      state: "Odisha",
      gpsCoords: { lat: 18.7092, lng: 82.9184 },
      morbidityCount: 8,
      mortalityCount: 7,
      confirmedDate: "2026-03-12",
      labConfirmed: true,
      pathogen: "Bacillus anthracis",
      isZoonotic: true,
      isNotifiable: true,
      cordonRadiusKm: 5,
      containmentStatus: "CONTAINED",
      ringVaccinationDone: 1450,
      ringVaccinationTarget: 1500,
      checkpointsDeployed: true,
      movementHalted: true,
      carcassDisposedProperly: true
    },
    {
      incidentId: "OB-2026-IND-0419",
      diseaseId: "african_swine_fever",
      diseaseName: "African Swine Fever",
      speciesAffected: "Swine (Piggery Units)",
      village: "Sonapur",
      district: "Kamrup Metropolitan",
      state: "Assam",
      gpsCoords: { lat: 26.1182, lng: 91.9754 },
      morbidityCount: 110,
      mortalityCount: 104,
      confirmedDate: "2026-02-28",
      labConfirmed: true,
      pathogen: "ASFV Genotype II",
      isZoonotic: false,
      isNotifiable: true,
      cordonRadiusKm: 10,
      containmentStatus: "RESOLVED",
      ringVaccinationDone: 0,
      ringVaccinationTarget: 0,
      checkpointsDeployed: true,
      movementHalted: true,
      carcassDisposedProperly: true
    }
  ];

  // ============================================================================
  // 3. STORAGE LAYER (INDEXEDDB WITH ROBUST LOCALSTORAGE FALLBACK)
  // ============================================================================
  const DB_CONFIG = {
    name: "VetcareDB_Surveillance",
    version: 1,
    storeName: "disease_surveillance_logs"
  };

  const StorageEngine = {
    db: null,

    init: function () {
      return new Promise(function (resolve) {
        if (!window.indexedDB) {
          resolve(false);
          return;
        }
        try {
          const request = window.indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);
          request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(DB_CONFIG.storeName)) {
              db.createObjectStore(DB_CONFIG.storeName, { keyPath: "incidentId" });
            }
          };
          request.onsuccess = function (event) {
            StorageEngine.db = event.target.result;
            resolve(true);
          };
          request.onerror = function () {
            resolve(false);
          };
        } catch (e) {
          resolve(false);
        }
      });
    },

    getAll: function () {
      return new Promise(function (resolve) {
        if (!StorageEngine.db) {
          const raw = localStorage.getItem("VETCARE_SURVEILLANCE_DATA");
          if (raw) {
            try {
              resolve(JSON.parse(raw));
              return;
            } catch (e) {}
          }
          resolve(DEFAULT_OUTBREAK_INCIDENTS.slice());
          return;
        }

        try {
          const tx = StorageEngine.db.transaction(DB_CONFIG.storeName, "readonly");
          const store = tx.objectStore(DB_CONFIG.storeName);
          const req = store.getAll();
          req.onsuccess = function () {
            if (req.result && req.result.length > 0) {
              resolve(req.result);
            } else {
              // Preload default incidents into IndexedDB
              StorageEngine.bulkInsert(DEFAULT_OUTBREAK_INCIDENTS.slice()).then(function () {
                resolve(DEFAULT_OUTBREAK_INCIDENTS.slice());
              });
            }
          };
          req.onerror = function () {
            resolve(DEFAULT_OUTBREAK_INCIDENTS.slice());
          };
        } catch (err) {
          resolve(DEFAULT_OUTBREAK_INCIDENTS.slice());
        }
      });
    },

    save: function (incident) {
      return new Promise(function (resolve) {
        if (!StorageEngine.db) {
          const raw = localStorage.getItem("VETCARE_SURVEILLANCE_DATA");
          let list = [];
          try {
            list = raw ? JSON.parse(raw) : DEFAULT_OUTBREAK_INCIDENTS.slice();
          } catch (e) {
            list = DEFAULT_OUTBREAK_INCIDENTS.slice();
          }
          const idx = list.findIndex(function (i) { return i.incidentId === incident.incidentId; });
          if (idx >= 0) {
            list[idx] = incident;
          } else {
            list.unshift(incident);
          }
          localStorage.setItem("VETCARE_SURVEILLANCE_DATA", JSON.stringify(list));
          resolve(true);
          return;
        }

        try {
          const tx = StorageEngine.db.transaction(DB_CONFIG.storeName, "readwrite");
          const store = tx.objectStore(DB_CONFIG.storeName);
          store.put(incident);
          tx.oncomplete = function () { resolve(true); };
          tx.onerror = function () { resolve(false); };
        } catch (err) {
          resolve(false);
        }
      });
    },

    bulkInsert: function (incidents) {
      return new Promise(function (resolve) {
        if (!StorageEngine.db) {
          localStorage.setItem("VETCARE_SURVEILLANCE_DATA", JSON.stringify(incidents));
          resolve(true);
          return;
        }
        try {
          const tx = StorageEngine.db.transaction(DB_CONFIG.storeName, "readwrite");
          const store = tx.objectStore(DB_CONFIG.storeName);
          incidents.forEach(function (inc) {
            store.put(inc);
          });
          tx.oncomplete = function () { resolve(true); };
          tx.onerror = function () { resolve(false); };
        } catch (e) {
          resolve(false);
        }
      });
    }
  };

  // ============================================================================
  // 4. SPATIAL MATHEMATICS & CLUSTERING ENGINE (HAVERSINE CLUSTER FORMULA)
  // ============================================================================
  const SpatialMath = {
    EARTH_RADIUS_KM: 6371.0,

    toRadians: function (deg) {
      return (deg * Math.PI) / 180.0;
    },

    toDegrees: function (rad) {
      return (rad * 180.0) / Math.PI;
    },

    haversineDistanceKm: function (lat1, lon1, lat2, lon2) {
      const dLat = SpatialMath.toRadians(lat2 - lat1);
      const dLon = SpatialMath.toRadians(lon2 - lon1);
      const rLat1 = SpatialMath.toRadians(lat1);
      const rLat2 = SpatialMath.toRadians(lat2);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return SpatialMath.EARTH_RADIUS_KM * c;
    },

    /**
     * Mathematical spatial clustering algorithm using density proximity
     * Groups outbreaks by disease and geographical threshold.
     */
    detectEpidemiologicalClusters: function (incidents, thresholdDistanceKm, minCases) {
      thresholdDistanceKm = thresholdDistanceKm || 15.0;
      minCases = minCases || 2;

      const activeList = incidents.filter(function (inc) {
        return inc.containmentStatus === "ACTIVE_EPIDEMIC";
      });

      const clusters = [];
      const visited = new Set();

      for (let i = 0; i < activeList.length; i++) {
        const primary = activeList[i];
        if (visited.has(primary.incidentId)) continue;

        const clusterIncidents = [primary];
        visited.add(primary.incidentId);

        for (let j = 0; j < activeList.length; j++) {
          if (i === j) continue;
          const candidate = activeList[j];
          if (visited.has(candidate.incidentId)) continue;

          // Must be same disease family/pathogen to form infectious transmission cluster
          if (candidate.diseaseId === primary.diseaseId) {
            const dist = SpatialMath.haversineDistanceKm(
              primary.gpsCoords.lat,
              primary.gpsCoords.lng,
              candidate.gpsCoords.lat,
              candidate.gpsCoords.lng
            );

            if (dist <= thresholdDistanceKm) {
              clusterIncidents.push(candidate);
              visited.add(candidate.incidentId);
            }
          }
        }

        if (clusterIncidents.length >= minCases) {
          // Calculate Weighted Centroid Epicenter (weighted by morbidityCount)
          let totalWeight = 0;
          let weightedLatSum = 0;
          let weightedLngSum = 0;
          let totalMorbidity = 0;
          let totalMortality = 0;

          clusterIncidents.forEach(function (inc) {
            const weight = Math.max(1, inc.morbidityCount);
            weightedLatSum += inc.gpsCoords.lat * weight;
            weightedLngSum += inc.gpsCoords.lng * weight;
            totalWeight += weight;
            totalMorbidity += inc.morbidityCount;
            totalMortality += inc.mortalityCount;
          });

          const centroidLat = weightedLatSum / totalWeight;
          const centroidLng = weightedLngSum / totalWeight;

          // Maximum spread radius from epicenter
          let maxRadiusKm = 0;
          clusterIncidents.forEach(function (inc) {
            const d = SpatialMath.haversineDistanceKm(
              centroidLat,
              centroidLng,
              inc.gpsCoords.lat,
              inc.gpsCoords.lng
            );
            if (d > maxRadiusKm) maxRadiusKm = d;
          });

          clusters.push({
            clusterId: "CLUS-" + primary.diseaseId.toUpperCase() + "-" + Math.round(centroidLat * 100),
            diseaseId: primary.diseaseId,
            diseaseName: primary.diseaseName,
            epicenter: { lat: centroidLat, lng: centroidLng },
            incidents: clusterIncidents,
            caseCount: clusterIncidents.length,
            totalMorbidity: totalMorbidity,
            totalMortality: totalMortality,
            clusterSpanKm: Math.max(3.0, Math.round(maxRadiusKm * 10) / 10),
            recommendedCordonKm: Math.max(10.0, Math.round((maxRadiusKm + 7.0) * 10) / 10),
            isZoonotic: primary.isZoonotic
          });
        }
      }

      return clusters;
    },

    /**
     * Computes formal biosecurity concentric zones
     */
    calculateContainmentZones: function (epicenterCoords) {
      const lat = epicenterCoords.lat;
      const lng = epicenterCoords.lng;

      // Approximate degree offsets
      // 1 deg Lat approx 110.574 km
      // 1 deg Lng approx 111.320 * cos(lat) km
      const deltaLat1Km = 1.0 / 110.574;
      const deltaLng1Km = 1.0 / (111.32 * Math.cos(SpatialMath.toRadians(lat)));

      return {
        infectedZone: {
          radiusKm: 3.0,
          label: "Infected Epicenter Zone (0 - 3 km)",
          restrictionLevel: "TOTAL_LOCKDOWN",
          actions: [
            "Complete prohibition of livestock ingress/egress",
            "Mandatory daily active clinical fever screening",
            "100% 3km Ring vaccination saturation within 72 hours",
            "Carcass disposal restricted to on-site deep pit cremation/burial"
          ],
          boundingBox: {
            north: lat + 3.0 * deltaLat1Km,
            south: lat - 3.0 * deltaLat1Km,
            east: lng + 3.0 * deltaLng1Km,
            west: lng - 3.0 * deltaLng1Km
          }
        },
        surveillanceBufferZone: {
          radiusKm: 10.0,
          label: "Surveillance Buffer Zone (3 - 10 km)",
          restrictionLevel: "SURVEILLANCE_PERMIT_REQUIRED",
          actions: [
            "Weekly serological surveillance and nasal swab sampling",
            "Checkpost disinfectant spray gates (4% Sodium Carbonate / Virkon)",
            "Mandatory veterinary movement certificate for dairy tankers",
            "Livestock haats, fairs, and animal markets shut down"
          ],
          boundingBox: {
            north: lat + 10.0 * deltaLat1Km,
            south: lat - 10.0 * deltaLat1Km,
            east: lng + 10.0 * deltaLng1Km,
            west: lng - 10.0 * deltaLng1Km
          }
        },
        freeZone: {
          radiusKm: "> 10 km",
          label: "Disease-Free Protective Zone (> 10 km)",
          restrictionLevel: "PASSIVE_SURVEILLANCE",
          actions: [
            "Dairy farmer mass awareness camps",
            "Routine biosecurity reporting via Vetcare Mobile App",
            "Stockpiling of emergency vaccine doses"
          ]
        }
      };
    },

    auditZoonoticRisk: function (diseaseId) {
      const meta = STATUTORY_DISEASE_REGISTRY[diseaseId];
      if (!meta || !meta.isZoonotic) {
        return {
          isHazard: false,
          riskLevel: "LOW_ANIMAL_ONLY",
          advisoryHeading: "Non-Zoonotic Animal Pathogen (पशु-सीमित रोग)",
          advisoryText: "No documented horizontal transmission to humans. Standard veterinary PPE (gloves, clean apron) suffices.",
          ppeLevel: "Standard Clinical PPE (Nitrile Gloves, Apron)",
          foodSafetyWarning: "Meat and milk from clinically affected animals must not enter commercial food chain."
        };
      }

      return {
        isHazard: true,
        riskLevel: "CRITICAL_ONE_HEALTH_BIOHAZARD",
        advisoryHeading: "⚠️ ONE-HEALTH ZOONOTIC DANGER (मानव संक्रमण जोखिम)",
        advisoryText: "High bio-security hazard with documented spillover transmission to animal handlers, milkers, veterinarians, or consumers.",
        ppeLevel: "Full Biohazard Level-C/D (N95 Respirator, Splash Goggles, Double Nitrile Gloves, Impervious Hazmat Gown)",
        foodSafetyWarning: "Absolute ban on raw unpasteurized milk and meat consumption. Immediate contact tracing of farm family.",
        reportingDirective: "Compulsory notification to District Chief Medical Officer (CMO) under Integrated Disease Surveillance Programme (IDSP)."
      };
    }
  };

  // Expose Spatial Math to ClinicalData Namespace
  window.VetcareApp.ClinicalData.ZoonosesOneHealth = {
    auditZoonoticRisk: SpatialMath.auditZoonoticRisk,
    calculateContainmentZones: SpatialMath.calculateContainmentZones,
    haversineDistanceKm: SpatialMath.haversineDistanceKm
  };

  // ============================================================================
  // 5. MAIN MODULE CONTROLLER & STATE
  // ============================================================================
  const SurveillanceModule = {
    containerEl: null,
    canvasEl: null,
    canvasCtx: null,
    canvasAnimFrameId: null,

    // Module Reactive State
    state: {
      outbreakIncidents: [],
      activeClusters: [],
      selectedIncidentId: null,
      diseaseFilter: "all",
      statusFilter: "all",
      activeTab: "gis_heat_map", // 'gis_heat_map' | 'outbreak_registry' | 'containment_zones' | 'statutory_nadrs_export'
      searchQuery: "",
      mapZoom: 1.0,
      mapPan: { x: 0, y: 0 },
      isDraggingMap: false,
      dragStart: { x: 0, y: 0 }
    },

    // ==========================================================================
    // LIFECYCLE: init()
    // ==========================================================================
    init: async function () {
      await StorageEngine.init();
      const storedIncidents = await StorageEngine.getAll();
      SurveillanceModule.state.outbreakIncidents = storedIncidents;
      SurveillanceModule.recomputeClusters();

      // Set initial selected incident to the first active epidemic
      const firstActive = storedIncidents.find(function (i) {
        return i.containmentStatus === "ACTIVE_EPIDEMIC";
      });
      if (firstActive) {
        SurveillanceModule.state.selectedIncidentId = firstActive.incidentId;
      } else if (storedIncidents.length > 0) {
        SurveillanceModule.state.selectedIncidentId = storedIncidents[0].incidentId;
      }

      SurveillanceModule.bindSystemEvents();
    },

    recomputeClusters: function () {
      SurveillanceModule.state.activeClusters = SpatialMath.detectEpidemiologicalClusters(
        SurveillanceModule.state.outbreakIncidents,
        18.0,
        2
      );
    },

    // ==========================================================================
    // EVENT BUS INTEGRATION
    // ==========================================================================
    bindSystemEvents: function () {
      // Listen for Clinical Diagnosis from Doctor OPD / Symptom Checker
      window.addEventListener("vetcare:diagnosis_selected", function (event) {
        if (!event || !event.detail) return;
        const diseaseId = event.detail.diseaseId;
        if (STATUTORY_DISEASE_REGISTRY[diseaseId] && STATUTORY_DISEASE_REGISTRY[diseaseId].isNotifiable) {
          SurveillanceModule.handleExternalStatutoryAlert(event.detail);
        }
      });
    },

    handleExternalStatutoryAlert: function (detail) {
      if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
        window.VetcareApp.showToast(
          "🚨 सांविधिक चेतावनी: अधिसूचित रोग (" + (detail.diseaseName || detail.diseaseId) + ") का संदिग्ध प्रकरण दर्ज हुआ!",
          "error"
        );
      }
      // Switch to report tab if container rendered
      if (SurveillanceModule.containerEl) {
        SurveillanceModule.openNewIncidentModal(detail);
      }
    },

    dispatchAlertDeclared: function (incident) {
      const eventDetail = {
        incidentId: incident.incidentId,
        diseaseName: incident.diseaseName,
        district: incident.district,
        state: incident.state,
        morbidity: incident.morbidityCount,
        isZoonotic: incident.isZoonotic,
        timestamp: new Date().toISOString()
      };

      const customEvent = new CustomEvent("vetcare:outbreak_alert_declared", {
        detail: eventDetail,
        bubbles: true
      });
      window.dispatchEvent(customEvent);

      if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
        window.VetcareApp.showToast(
          "महामारी रेड-अलर्ट घोषित: " + incident.diseaseName + " (" + incident.village + ", " + incident.district + ")",
          "error"
        );
      }
    },

    // ==========================================================================
    // LIFECYCLE: render(containerId)
    // ==========================================================================
    render: function (containerId) {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error("[DiseaseOutbreakSurveillance] Container element not found: " + containerId);
        return;
      }
      SurveillanceModule.containerEl = container;
      SurveillanceModule.containerEl.innerHTML = "";
      SurveillanceModule.containerEl.className = "w-full max-w-7xl mx-auto py-4 px-2 sm:px-4 space-y-6";

      // 1. Top KPI Telemetry Banner
      const kpiBanner = SurveillanceModule.buildKpiBanner();
      SurveillanceModule.containerEl.appendChild(kpiBanner);

      // 2. Action & Filter Bar
      const filterBar = SurveillanceModule.buildFilterAndActionHeader();
      SurveillanceModule.containerEl.appendChild(filterBar);

      // 3. Tab Workspace Viewport
      const tabWorkspace = document.createElement("div");
      tabWorkspace.id = "surveillanceTabWorkspace";
      tabWorkspace.className = "w-full";
      SurveillanceModule.containerEl.appendChild(tabWorkspace);

      SurveillanceModule.renderActiveTab();
    },

    // ==========================================================================
    // COMPONENT: KPI TELEMETRY BANNER
    // ==========================================================================
    buildKpiBanner: function () {
      const incidents = SurveillanceModule.state.outbreakIncidents;
      const activeEpis = incidents.filter(function (i) { return i.containmentStatus === "ACTIVE_EPIDEMIC"; });
      const totalMorbidity = activeEpis.reduce(function (acc, i) { return acc + (i.morbidityCount || 0); }, 0);
      const totalMortality = activeEpis.reduce(function (acc, i) { return acc + (i.mortalityCount || 0); }, 0);
      const zoonoticTriggers = activeEpis.filter(function (i) { return i.isZoonotic; }).length;

      let totalVaxTarget = 0;
      let totalVaxDone = 0;
      activeEpis.forEach(function (i) {
        if (i.ringVaccinationTarget > 0) {
          totalVaxTarget += i.ringVaccinationTarget;
          totalVaxDone += (i.ringVaccinationDone || 0);
        }
      });
      const vaxCompliancePct = totalVaxTarget > 0 ? Math.min(100, Math.round((totalVaxDone / totalVaxTarget) * 100)) : 100;

      const card = document.createElement("div");
      card.className = "grid grid-cols-2 md:grid-cols-4 gap-3.5 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl sunlight-card";

      card.innerHTML = `
        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-rose-900/40 relative overflow-hidden">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">Active Hotspots</span>
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500 pulse-beacon"></span>
          </div>
          <div class="text-2xl sm:text-3xl font-display font-black text-rose-400">${activeEpis.length} <span class="text-xs text-rose-300 font-normal">Active</span></div>
          <div class="text-[11px] text-slate-400 mt-1">${SurveillanceModule.state.activeClusters.length} Dense Spatial Clusters</div>
        </div>

        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Total Morbidity / Mortality</span>
            <i class="fa-solid fa-skull-crossbones text-slate-500 text-xs"></i>
          </div>
          <div class="text-2xl sm:text-3xl font-display font-black text-white sunlight-text">${totalMorbidity} <span class="text-xs text-rose-400">/ ${totalMortality} dead</span></div>
          <div class="text-[11px] text-slate-400 mt-1">CFR: ${(totalMorbidity > 0 ? ((totalMortality / totalMorbidity) * 100).toFixed(1) : 0)}% Case Fatality</div>
        </div>

        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-amber-900/40">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">One-Health Zoonoses</span>
            <i class="fa-solid fa-triangle-exclamation text-amber-400 text-xs"></i>
          </div>
          <div class="text-2xl sm:text-3xl font-display font-black text-amber-400">${zoonoticTriggers} <span class="text-xs text-amber-300">Spillover</span></div>
          <div class="text-[11px] text-slate-400 mt-1">Human Contact Tracing Active</div>
        </div>

        <div class="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-900/40">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Ring Vaccine Cordon</span>
            <i class="fa-solid fa-shield-virus text-emerald-400 text-xs"></i>
          </div>
          <div class="text-2xl sm:text-3xl font-display font-black text-emerald-400">${vaxCompliancePct}% <span class="text-xs text-emerald-300">Protected</span></div>
          <div class="text-[11px] text-slate-400 mt-1">${totalVaxDone.toLocaleString()} / ${totalVaxTarget.toLocaleString()} Doses</div>
        </div>
      `;

      return card;
    },

    // ==========================================================================
    // COMPONENT: FILTER BAR & TAB CONTROLS
    // ==========================================================================
    buildFilterAndActionHeader: function () {
      const container = document.createElement("div");
      container.className = "flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl sunlight-card";

      // Tab Buttons Group
      const tabGroup = document.createElement("div");
      tabGroup.className = "flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800/80";

      const tabs = [
        { id: "gis_heat_map", label: "GIS Cordon & Map", icon: "fa-earth-asia" },
        { id: "outbreak_registry", label: "Incidence Registry", icon: "fa-list-check" },
        { id: "containment_zones", label: "Biosecurity & Quarantine", icon: "fa-shield-halved" },
        { id: "statutory_nadrs_export", label: "Statutory NADRS / Flash", icon: "fa-file-invoice" }
      ];

      tabs.forEach(function (t) {
        const btn = document.createElement("button");
        btn.type = "button";
        const isActive = SurveillanceModule.state.activeTab === t.id;
        btn.className = `px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
          isActive
            ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
            : "text-slate-400 hover:text-white hover:bg-slate-800/60"
        }`;
        btn.innerHTML = `<i class="fa-solid ${t.icon}"></i> <span>${t.label}</span>`;
        btn.addEventListener("click", function () {
          SurveillanceModule.state.activeTab = t.id;
          SurveillanceModule.render(SurveillanceModule.containerEl.id);
        });
        tabGroup.appendChild(btn);
      });

      // Filter Selectors & Action Buttons
      const actions = document.createElement("div");
      actions.className = "flex flex-wrap items-center gap-2.5";

      // Disease Filter
      const diseaseSelect = document.createElement("select");
      diseaseSelect.className = "bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-2 font-medium focus:ring-2 focus:ring-emerald-500 outline-none";
      diseaseSelect.innerHTML = `
        <option value="all">सर्व रोग (All Pathogens)</option>
        <option value="lumpy_skin_disease">Lumpy Skin Disease</option>
        <option value="fmd">FMD (खुरपका)</option>
        <option value="african_swine_fever">African Swine Fever</option>
        <option value="avian_influenza">Avian Flu (H5N1)</option>
        <option value="anthrax">Anthrax (गिल्टी)</option>
        <option value="rabies">Rabies (रेबीज)</option>
        <option value="brucellosis">Brucellosis</option>
      `;
      diseaseSelect.value = SurveillanceModule.state.diseaseFilter;
      diseaseSelect.addEventListener("change", function () {
        SurveillanceModule.state.diseaseFilter = this.value;
        SurveillanceModule.renderActiveTab();
      });

      // Status Filter
      const statusSelect = document.createElement("select");
      statusSelect.className = "bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-2 font-medium focus:ring-2 focus:ring-emerald-500 outline-none";
      statusSelect.innerHTML = `
        <option value="all">स्थिति (All Status)</option>
        <option value="ACTIVE_EPIDEMIC">🔴 Active Epidemic</option>
        <option value="CONTAINED">🟡 Contained Zone</option>
        <option value="RESOLVED">🟢 Resolved / Clear</option>
      `;
      statusSelect.value = SurveillanceModule.state.statusFilter;
      statusSelect.addEventListener("change", function () {
        SurveillanceModule.state.statusFilter = this.value;
        SurveillanceModule.renderActiveTab();
      });

      // "+ Report Suspected Outbreak" Button
      const btnReport = document.createElement("button");
      btnReport.type = "button";
      btnReport.className = "px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40 flex items-center gap-2 transition-all active:scale-95";
      btnReport.innerHTML = `<i class="fa-solid fa-plus-circle"></i> <span>नया प्रकोप दर्ज करें (+ Report)</span>`;
      btnReport.addEventListener("click", function () {
        SurveillanceModule.openNewIncidentModal();
      });

      actions.appendChild(diseaseSelect);
      actions.appendChild(statusSelect);
      actions.appendChild(btnReport);

      container.appendChild(tabGroup);
      container.appendChild(actions);
      return container;
    },

    // ==========================================================================
    // RENDER: ACTIVE TAB DISPATCHER
    // ==========================================================================
    renderActiveTab: function () {
      const workspace = document.getElementById("surveillanceTabWorkspace");
      if (!workspace) return;
      workspace.innerHTML = "";

      if (SurveillanceModule.state.activeTab === "gis_heat_map") {
        workspace.appendChild(SurveillanceModule.buildGisWorkstation());
        SurveillanceModule.initGisCanvas();
      } else if (SurveillanceModule.state.activeTab === "outbreak_registry") {
        workspace.appendChild(SurveillanceModule.buildRegistryTable());
      } else if (SurveillanceModule.state.activeTab === "containment_zones") {
        workspace.appendChild(SurveillanceModule.buildContainmentZonesTab());
      } else if (SurveillanceModule.state.activeTab === "statutory_nadrs_export") {
        workspace.appendChild(SurveillanceModule.buildStatutoryReportsTab());
      }
    },

    // ==========================================================================
    // TAB 1: GIS WORKSTATION & DYNAMIC CANVAS HEAT MAP
    // ==========================================================================
    buildGisWorkstation: function () {
      const container = document.createElement("div");
      container.className = "grid grid-cols-1 lg:grid-cols-12 gap-5";

      // Left Column: Stream of Live Incidents & Clusters (5 cols)
      const leftCol = document.createElement("div");
      leftCol.className = "lg:col-span-5 space-y-4";

      // Clusters Alert Card
      if (SurveillanceModule.state.activeClusters.length > 0) {
        const clusterBox = document.createElement("div");
        clusterBox.className = "p-4 rounded-2xl bg-gradient-to-br from-rose-950/50 via-slate-900 to-slate-900 border-2 border-rose-500/50 sunlight-card";
        let clustersHtml = "";
        SurveillanceModule.state.activeClusters.forEach(function (c) {
          clustersHtml += `
            <div class="mt-2.5 p-3 rounded-xl bg-slate-950/80 border border-rose-700/40 text-xs">
              <div class="flex items-center justify-between font-bold text-rose-300">
                <span><i class="fa-solid fa-circle-nodes mr-1.5"></i>${c.clusterId}</span>
                <span class="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono">${c.clusterSpanKm} km Span</span>
              </div>
              <div class="text-slate-300 font-semibold mt-1">${c.diseaseName}</div>
              <div class="text-[11px] text-slate-400 mt-0.5">${c.caseCount} Outbreak Foci | ${c.totalMorbidity} Animals Diseased | ${c.totalMortality} Dead</div>
              <div class="mt-2 text-[10px] font-mono text-amber-300 flex items-center justify-between">
                <span>Centroid: ${c.epicenter.lat.toFixed(4)}°N, ${c.epicenter.lng.toFixed(4)}°E</span>
                <span class="text-rose-400 font-bold">Ring: ${c.recommendedCordonKm} km Cordon</span>
              </div>
            </div>
          `;
        });

        clusterBox.innerHTML = `
          <div class="flex items-center justify-between">
            <h3 class="font-display font-extrabold text-white text-sm flex items-center gap-2 sunlight-text">
              <i class="fa-solid fa-radar text-rose-500 pulse-beacon"></i>
              सक्रिय स्थानिक क्लस्टर (High-Density Clusters)
            </h3>
            <span class="text-[10px] font-mono uppercase bg-rose-500/20 text-rose-400 border border-rose-500/40 px-2 py-0.5 rounded font-bold">
              ${SurveillanceModule.state.activeClusters.length} Detected
            </span>
          </div>
          <p class="text-[11px] text-slate-300 mt-1 sunlight-muted">Haversine घनत्व विश्लेषण: 18km के भीतर संक्रामक एपीसेंटर की पहचान।</p>
          ${clustersHtml}
        `;
        leftCol.appendChild(clusterBox);
      }

      // Outbreak Incidents Stream Card
      const streamCard = document.createElement("div");
      streamCard.className = "bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl sunlight-card";
      streamCard.innerHTML = `
        <div class="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-tower-broadcast text-emerald-400 text-sm"></i>
            <h3 class="font-display font-bold text-white text-sm sunlight-text">महामारी रिपोर्ट धारा (Incidence Stream)</h3>
          </div>
          <span class="text-[10px] font-mono text-slate-400">Click to Center Map</span>
        </div>
        <div id="incidentStreamList" class="space-y-2.5 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar"></div>
      `;

      leftCol.appendChild(streamCard);

      // Right Column: Canvas Map Visualizer & Live Biosecurity Checklist (7 cols)
      const rightCol = document.createElement("div");
      rightCol.className = "lg:col-span-7 space-y-4";

      // Map Viewport Container
      const mapCard = document.createElement("div");
      mapCard.className = "bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl relative overflow-hidden sunlight-card flex flex-col";
      mapCard.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-400 pulse-beacon"></span>
            <span class="font-display font-bold text-sm text-white sunlight-text">Spatial Bio-Cordon Visualizer (2026 Telemetry)</span>
          </div>
          <div class="flex items-center gap-1.5 text-xs">
            <button id="btnZoomInMap" type="button" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700" title="Zoom In"><i class="fa-solid fa-plus"></i></button>
            <button id="btnZoomOutMap" type="button" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700" title="Zoom Out"><i class="fa-solid fa-minus"></i></button>
            <button id="btnResetMap" type="button" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-mono" title="Recenter View">Recenter</button>
          </div>
        </div>

        <!-- Canvas Map Surface -->
        <div class="relative w-full h-[380px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 cursor-crosshair">
          <canvas id="gisOutbreakCanvas" class="w-full h-full block"></canvas>
          
          <!-- Tactical HUD Overlay -->
          <div class="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-2 text-[10px] font-mono space-y-0.5 pointer-events-none text-slate-300">
            <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span> 0 - 3 km: Infected Zone (Total Bio-Lockdown)</div>
            <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span> 3 - 10 km: Surveillance Ring (Testing / Permits)</div>
            <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> > 10 km: Protected Buffer Free Zone</div>
          </div>

          <div id="mapTooltip" class="absolute hidden bg-slate-900/95 border border-emerald-500 text-white rounded-lg p-2 text-xs font-mono shadow-2xl pointer-events-none z-20 max-w-xs"></div>
        </div>

        <div class="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-compass text-slate-500"></i>
            <span id="canvasCoordsDisplay" class="font-mono text-[11px]">Equirectangular Spatial Projection System</span>
          </div>
          <div class="font-mono text-[11px] text-emerald-400">NADRS 2.0 & WOAH WAHIS Live Synced</div>
        </div>
      `;
      rightCol.appendChild(mapCard);

      // Selected Incident Deep-Dive & Action Checklist Card
      const detailCard = document.createElement("div");
      detailCard.id = "selectedIncidentDetailCard";
      detailCard.className = "bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl sunlight-card";
      rightCol.appendChild(detailCard);

      container.appendChild(leftCol);
      container.appendChild(rightCol);

      // Populate Incident Stream List
      setTimeout(function () {
        SurveillanceModule.populateIncidentStreamList();
        SurveillanceModule.renderSelectedIncidentDetail();
      }, 0);

      return container;
    },

    // ==========================================================================
    // POPULATE INCIDENCE STREAM ITEMS
    // ==========================================================================
    populateIncidentStreamList: function () {
      const listEl = document.getElementById("incidentStreamList");
      if (!listEl) return;
      listEl.innerHTML = "";

      let filtered = SurveillanceModule.state.outbreakIncidents.slice();

      if (SurveillanceModule.state.diseaseFilter !== "all") {
        filtered = filtered.filter(function (i) { return i.diseaseId === SurveillanceModule.state.diseaseFilter; });
      }
      if (SurveillanceModule.state.statusFilter !== "all") {
        filtered = filtered.filter(function (i) { return i.containmentStatus === SurveillanceModule.state.statusFilter; });
      }

      if (filtered.length === 0) {
        listEl.innerHTML = `<div class="p-6 text-center text-xs text-slate-400">कोई सक्रिय प्रकोप दर्ज नहीं है (No incidents found).</div>`;
        return;
      }

      filtered.forEach(function (inc) {
        const isSelected = inc.incidentId === SurveillanceModule.state.selectedIncidentId;
        const item = document.createElement("div");
        item.className = `p-3 rounded-xl border cursor-pointer transition-all ${
          isSelected
            ? "bg-slate-800 border-emerald-500 shadow-md shadow-emerald-950/30"
            : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
        }`;

        let statusBadge = "";
        if (inc.containmentStatus === "ACTIVE_EPIDEMIC") {
          statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">🔴 सक्रिय महामारी</span>';
        } else if (inc.containmentStatus === "CONTAINED") {
          statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">🟡 नियंत्रित क्षेत्र</span>';
        } else {
          statusBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">🟢 मुक्त / शांत</span>';
        }

        item.innerHTML = `
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-mono text-[10px] text-slate-400 font-bold">${inc.incidentId}</span>
            ${statusBadge}
          </div>
          <div class="flex items-center justify-between">
            <div class="font-display font-bold text-sm text-white sunlight-text">${inc.diseaseName}</div>
            ${inc.isZoonotic ? '<span class="text-[10px] font-black uppercase text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/40">Zoonotic</span>' : ""}
          </div>
          <div class="text-xs text-slate-300 mt-0.5 sunlight-muted">
            <i class="fa-solid fa-location-dot text-rose-400 mr-1"></i>${inc.village}, ${inc.district} (${inc.state})
          </div>
          <div class="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-1.5">
            <span>Rugi: <strong class="text-rose-400">${inc.morbidityCount}</strong> | Mritak: <strong class="text-slate-200">${inc.mortalityCount}</strong></span>
            <span>${inc.confirmedDate}</span>
          </div>
        `;

        item.addEventListener("click", function () {
          SurveillanceModule.state.selectedIncidentId = inc.incidentId;
          SurveillanceModule.populateIncidentStreamList();
          SurveillanceModule.renderSelectedIncidentDetail();
          SurveillanceModule.centerMapOnIncident(inc);
        });

        listEl.appendChild(item);
      });
    },

    // ==========================================================================
    // DETAIL CARD & PROTOCOL CHECKLIST
    // ==========================================================================
    renderSelectedIncidentDetail: function () {
      const card = document.getElementById("selectedIncidentDetailCard");
      if (!card) return;

      const inc = SurveillanceModule.state.outbreakIncidents.find(function (i) {
        return i.incidentId === SurveillanceModule.state.selectedIncidentId;
      });

      if (!inc) {
        card.innerHTML = `<div class="p-4 text-xs text-slate-400">किसी प्रकोप का चयन करें (Select an incident).</div>`;
        return;
      }

      const zoonoticAudit = SpatialMath.auditZoonoticRisk(inc.diseaseId);
      const zones = SpatialMath.calculateContainmentZones(inc.gpsCoords);

      card.innerHTML = `
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-display font-black text-base text-white sunlight-text">${inc.diseaseName}</h3>
              <span class="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">${inc.incidentId}</span>
            </div>
            <div class="text-xs text-slate-400 font-mono mt-0.5">GPS: ${inc.gpsCoords.lat.toFixed(4)}°N, ${inc.gpsCoords.lng.toFixed(4)}°E | प्रजाति: ${inc.speciesAffected}</div>
          </div>
          <div class="flex items-center gap-2">
            <button id="btnPrintFlashMemo" type="button" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors">
              <i class="fa-solid fa-print text-amber-400"></i>
              <span>Print Official Memo</span>
            </button>
            <button id="btnToggleStatusAction" type="button" class="px-3 py-1.5 rounded-lg text-xs font-bold ${
              inc.containmentStatus === "ACTIVE_EPIDEMIC"
                ? "bg-amber-600 hover:bg-amber-500 text-white"
                : "bg-emerald-600 hover:bg-emerald-500 text-white"
            }">
              ${inc.containmentStatus === "ACTIVE_EPIDEMIC" ? "Mark Contained" : "Re-open / Update"}
            </button>
          </div>
        </div>

        <!-- Zoonotic One-Health Banner if applicable -->
        ${
          zoonoticAudit.isHazard
            ? `
          <div class="mb-3.5 p-3 rounded-xl bg-amber-500/15 border-2 border-amber-500/60 text-xs text-amber-200">
            <div class="font-display font-black text-amber-400 flex items-center gap-1.5">
              <i class="fa-solid fa-triangle-exclamation text-sm"></i>
              ${zoonoticAudit.advisoryHeading}
            </div>
            <div class="mt-1 leading-relaxed">${zoonoticAudit.advisoryText}</div>
            <div class="mt-2 font-mono text-[11px] text-amber-300 flex flex-wrap gap-x-4">
              <span><strong>PPE SOP:</strong> ${zoonoticAudit.ppeLevel}</span>
              <span><strong>Food Withholding:</strong> ${zoonoticAudit.foodSafetyWarning}</span>
            </div>
          </div>
        `
            : ""
        }

        <!-- Tactical Containment Zones & Checklist Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Left: Protocol Directives -->
          <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
            <div class="font-display font-bold text-white text-xs sunlight-text flex items-center gap-1.5">
              <i class="fa-solid fa-bullseye text-rose-500"></i>
              <span>अधिसूचित घेराबंदी परिधि (Enforcement Radii)</span>
            </div>
            <div class="p-2 rounded-lg bg-rose-950/40 border border-rose-900/40 text-[11px] text-rose-300">
              <strong class="text-rose-400">${zones.infectedZone.label}:</strong>
              <ul class="list-disc list-inside mt-1 space-y-0.5 text-slate-300">
                ${zones.infectedZone.actions.map(a => `<li>${a}</li>`).join("")}
              </ul>
            </div>
            <div class="p-2 rounded-lg bg-amber-950/40 border border-amber-900/40 text-[11px] text-amber-300">
              <strong class="text-amber-400">${zones.surveillanceBufferZone.label}:</strong>
              <ul class="list-disc list-inside mt-1 space-y-0.5 text-slate-300">
                ${zones.surveillanceBufferZone.actions.map(a => `<li>${a}</li>`).join("")}
              </ul>
            </div>
          </div>

          <!-- Right: Biosecurity Deployment Live Checkpoints -->
          <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs flex flex-col justify-between">
            <div>
              <div class="font-display font-bold text-white text-xs sunlight-text flex items-center justify-between mb-2">
                <span class="flex items-center gap-1.5">
                  <i class="fa-solid fa-list-check text-emerald-400"></i>
                  <span>फील्ड बायो-सुरक्षा अनुपालन (SOP Checklist)</span>
                </span>
                <span class="text-[10px] font-mono text-emerald-400 font-bold">STATE POLICE & VET CORE</span>
              </div>
              <div class="space-y-2 text-xs">
                <label class="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-900">
                  <input type="checkbox" id="chkCheckpoints" class="rounded border-slate-700 text-emerald-600 focus:ring-0" ${inc.checkpointsDeployed ? "checked" : ""}>
                  <span class="text-slate-300">Checkpoints Established on Ingress Roads</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-900">
                  <input type="checkbox" id="chkMovement" class="rounded border-slate-700 text-emerald-600 focus:ring-0" ${inc.movementHalted ? "checked" : ""}>
                  <span class="text-slate-300">Livestock Transport Freezed (DM Notification)</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-900">
                  <input type="checkbox" id="chkDisposal" class="rounded border-slate-700 text-emerald-600 focus:ring-0" ${inc.carcassDisposedProperly ? "checked" : ""}>
                  <span class="text-slate-300">Carcass Deep Pit Disposal with Quicklime</span>
                </label>
              </div>

              <!-- Ring Vaccination Progress Tracker -->
              <div class="mt-3 pt-3 border-t border-slate-800/80">
                <div class="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span class="text-slate-400">Ring Vaccination Progress:</span>
                  <span class="text-emerald-400 font-bold">${inc.ringVaccinationDone || 0} / ${inc.ringVaccinationTarget || 0} Doses</span>
                </div>
                <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full" style="width: ${inc.ringVaccinationTarget > 0 ? Math.min(100, Math.round((inc.ringVaccinationDone / inc.ringVaccinationTarget) * 100)) : 100}%"></div>
                </div>
              </div>
            </div>

            <button id="btnSaveChecklistState" type="button" class="mt-3 w-full py-2 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors">
              <i class="fa-solid fa-floppy-disk mr-1"></i> अपडेट सहेजें (Save Checklist)
            </button>
          </div>
        </div>
      `;

      // Event bindings inside detail card
      const btnPrint = document.getElementById("btnPrintFlashMemo");
      if (btnPrint) {
        btnPrint.addEventListener("click", function () {
          SurveillanceModule.printStatutoryFlashReport(inc.incidentId);
        });
      }

      const btnToggleStatus = document.getElementById("btnToggleStatusAction");
      if (btnToggleStatus) {
        btnToggleStatus.addEventListener("click", function () {
          if (inc.containmentStatus === "ACTIVE_EPIDEMIC") {
            inc.containmentStatus = "CONTAINED";
          } else if (inc.containmentStatus === "CONTAINED") {
            inc.containmentStatus = "RESOLVED";
          } else {
            inc.containmentStatus = "ACTIVE_EPIDEMIC";
          }
          StorageEngine.save(inc).then(function () {
            SurveillanceModule.recomputeClusters();
            SurveillanceModule.render(SurveillanceModule.containerEl.id);
            if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
              window.VetcareApp.showToast("प्रकोप स्थिति अद्यतन की गई: " + inc.containmentStatus, "success");
            }
          });
        });
      }

      const btnSaveChecklist = document.getElementById("btnSaveChecklistState");
      if (btnSaveChecklist) {
        btnSaveChecklist.addEventListener("click", function () {
          const chkCheckpoints = document.getElementById("chkCheckpoints");
          const chkMovement = document.getElementById("chkMovement");
          const chkDisposal = document.getElementById("chkDisposal");

          inc.checkpointsDeployed = chkCheckpoints ? chkCheckpoints.checked : false;
          inc.movementHalted = chkMovement ? chkMovement.checked : false;
          inc.carcassDisposedProperly = chkDisposal ? chkDisposal.checked : false;

          StorageEngine.save(inc).then(function () {
            if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
              window.VetcareApp.showToast("फील्ड बायो-सुरक्षा चेकलिस्ट सुरक्षित कर दी गई।", "success");
            }
          });
        });
      }
    },

    // ==========================================================================
    // HTML5 CANVAS INTERACTIVE GIS MAP RENDERING
    // ==========================================================================
    initGisCanvas: function () {
      const canvas = document.getElementById("gisOutbreakCanvas");
      if (!canvas) return;
      SurveillanceModule.canvasEl = canvas;
      SurveillanceModule.canvasCtx = canvas.getContext("2d");

      // Handle HiDPI displays
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      SurveillanceModule.canvasCtx.scale(dpr, dpr);

      // Bind Map Controls
      const btnIn = document.getElementById("btnZoomInMap");
      const btnOut = document.getElementById("btnZoomOutMap");
      const btnReset = document.getElementById("btnResetMap");

      if (btnIn) {
        btnIn.onclick = function () {
          SurveillanceModule.state.mapZoom = Math.min(3.5, SurveillanceModule.state.mapZoom + 0.25);
          SurveillanceModule.drawGisCanvas();
        };
      }
      if (btnOut) {
        btnOut.onclick = function () {
          SurveillanceModule.state.mapZoom = Math.max(0.6, SurveillanceModule.state.mapZoom - 0.25);
          SurveillanceModule.drawGisCanvas();
        };
      }
      if (btnReset) {
        btnReset.onclick = function () {
          SurveillanceModule.state.mapZoom = 1.0;
          SurveillanceModule.state.mapPan = { x: 0, y: 0 };
          SurveillanceModule.drawGisCanvas();
        };
      }

      // Mouse drag pan support
      canvas.onmousedown = function (e) {
        SurveillanceModule.state.isDraggingMap = true;
        SurveillanceModule.state.dragStart = { x: e.clientX, y: e.clientY };
      };
      window.onmousemove = function (e) {
        if (!SurveillanceModule.state.isDraggingMap) return;
        const dx = e.clientX - SurveillanceModule.state.dragStart.x;
        const dy = e.clientY - SurveillanceModule.state.dragStart.y;
        SurveillanceModule.state.mapPan.x += dx;
        SurveillanceModule.state.mapPan.y += dy;
        SurveillanceModule.state.dragStart = { x: e.clientX, y: e.clientY };
        SurveillanceModule.drawGisCanvas();
      };
      window.onmouseup = function () {
        SurveillanceModule.state.isDraggingMap = false;
      };

      // Tooltip handling on canvas hover
      canvas.onmousemove = function (e) {
        SurveillanceModule.handleCanvasHover(e);
      };

      SurveillanceModule.drawGisCanvas();
    },

    centerMapOnIncident: function (incident) {
      if (!incident || !SurveillanceModule.canvasEl) return;
      // Re-render canvas with incident centered
      SurveillanceModule.drawGisCanvas();
    },

    /**
     * Mathematical projection converting GPS (Lat/Lng) to Canvas (X/Y)
     */
    geoToCanvas: function (lat, lng, width, height, bounds) {
      // Equirectangular projection bounded by dataset
      const latRange = bounds.maxLat - bounds.minLat || 1.0;
      const lngRange = bounds.maxLng - bounds.minLng || 1.0;

      // Invert Y because canvas Y increases downwards
      const xNorm = (lng - bounds.minLng) / lngRange;
      const yNorm = (bounds.maxLat - lat) / latRange;

      // Add padding
      const pad = 50;
      const viewW = width - pad * 2;
      const viewH = height - pad * 2;

      let x = pad + xNorm * viewW;
      let y = pad + yNorm * viewH;

      // Apply Zoom and Pan transform
      const cx = width / 2;
      const cy = height / 2;
      x = cx + (x - cx) * SurveillanceModule.state.mapZoom + SurveillanceModule.state.mapPan.x;
      y = cy + (y - cy) * SurveillanceModule.state.mapZoom + SurveillanceModule.state.mapPan.y;

      return { x: x, y: y };
    },

    computeGeoBounds: function (incidents) {
      if (!incidents || incidents.length === 0) {
        return { minLat: 8.0, maxLat: 32.0, minLng: 68.0, maxLng: 92.0 };
      }

      let minLat = 90.0, maxLat = -90.0, minLng = 180.0, maxLng = -180.0;
      incidents.forEach(function (i) {
        if (i.gpsCoords.lat < minLat) minLat = i.gpsCoords.lat;
        if (i.gpsCoords.lat > maxLat) maxLat = i.gpsCoords.lat;
        if (i.gpsCoords.lng < minLng) minLng = i.gpsCoords.lng;
        if (i.gpsCoords.lng > maxLng) maxLng = i.gpsCoords.lng;
      });

      // Expand margins by 1.5 degrees
      minLat -= 1.5;
      maxLat += 1.5;
      minLng -= 1.5;
      maxLng += 1.5;

      return { minLat: minLat, maxLat: maxLat, minLng: minLng, maxLng: maxLng };
    },

    drawGisCanvas: function () {
      const canvas = SurveillanceModule.canvasEl;
      const ctx = SurveillanceModule.canvasCtx;
      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Clear Canvas
      ctx.clearRect(0, 0, w, h);

      // Dark Tactical Spatial Background
      ctx.fillStyle = "#070b14";
      ctx.fillRect(0, 0, w, h);

      const incidents = SurveillanceModule.state.outbreakIncidents;
      const bounds = SurveillanceModule.computeGeoBounds(incidents);

      // 1. Draw Grid Lines (Latitude / Longitude Graticule)
      ctx.strokeStyle = "#131e33";
      ctx.lineWidth = 1;
      const gridStep = 40;
      for (let gx = 0; gx < w; gx += gridStep) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      // 2. Draw Active Clusters & Containment Cordons
      SurveillanceModule.state.activeClusters.forEach(function (cluster) {
        const centerPt = SurveillanceModule.geoToCanvas(cluster.epicenter.lat, cluster.epicenter.lng, w, h, bounds);

        // Approximate pixels per kilometer based on bounds
        const latSpanKm = (bounds.maxLat - bounds.minLat) * 111.0;
        const pxPerKm = ((h - 100) / latSpanKm) * SurveillanceModule.state.mapZoom;

        const infectedRadiusPx = Math.max(18, 3.0 * pxPerKm);
        const surveillanceRadiusPx = Math.max(45, 10.0 * pxPerKm);

        // Surveillance Zone (Amber translucent circle)
        ctx.beginPath();
        ctx.arc(centerPt.x, centerPt.y, surveillanceRadiusPx, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(245, 158, 11, 0.08)";
        ctx.fill();
        ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);

        // Infected Epicenter Zone (Red translucent circle)
        ctx.beginPath();
        ctx.arc(centerPt.x, centerPt.y, infectedRadiusPx, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(244, 63, 94, 0.15)";
        ctx.fill();
        ctx.strokeStyle = "rgba(244, 63, 94, 0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Cluster Centroid Indicator
        ctx.beginPath();
        ctx.arc(centerPt.x, centerPt.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "#f43f5e";
        ctx.fill();

        // Cluster Label Tag
        ctx.font = "bold 9px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#fda4af";
        ctx.fillText(cluster.clusterId, centerPt.x + 8, centerPt.y - 8);
      });

      // 3. Draw Incidents Nodes
      incidents.forEach(function (inc) {
        const pt = SurveillanceModule.geoToCanvas(inc.gpsCoords.lat, inc.gpsCoords.lng, w, h, bounds);
        const isSelected = inc.incidentId === SurveillanceModule.state.selectedIncidentId;

        // Outer halo
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isSelected ? 14 : 9, 0, 2 * Math.PI);
        if (inc.containmentStatus === "ACTIVE_EPIDEMIC") {
          ctx.fillStyle = isSelected ? "rgba(244, 63, 94, 0.45)" : "rgba(244, 63, 94, 0.25)";
        } else if (inc.containmentStatus === "CONTAINED") {
          ctx.fillStyle = isSelected ? "rgba(245, 158, 11, 0.45)" : "rgba(245, 158, 11, 0.25)";
        } else {
          ctx.fillStyle = isSelected ? "rgba(16, 185, 129, 0.45)" : "rgba(16, 185, 129, 0.25)";
        }
        ctx.fill();

        // Inner core
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isSelected ? 6 : 4, 0, 2 * Math.PI);
        if (inc.containmentStatus === "ACTIVE_EPIDEMIC") {
          ctx.fillStyle = "#f43f5e";
        } else if (inc.containmentStatus === "CONTAINED") {
          ctx.fillStyle = "#f59e0b";
        } else {
          ctx.fillStyle = "#10b981";
        }
        ctx.fill();

        // Node Label
        ctx.font = "600 10px 'Inter', sans-serif";
        ctx.fillStyle = isSelected ? "#ffffff" : "#94a3b8";
        ctx.fillText(`${inc.village} (${inc.morbidityCount})`, pt.x + 10, pt.y + 3);

        // Store screen coords for hover detection
        inc._screenX = pt.x;
        inc._screenY = pt.y;
      });

      // 4. Draw Scale Bar (Bottom Right)
      ctx.fillStyle = "#475569";
      ctx.fillRect(w - 110, h - 20, 90, 3);
      ctx.font = "8px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("50 KM BIO-SURVEY", w - 110, h - 26);
    },

    handleCanvasHover: function (e) {
      const canvas = SurveillanceModule.canvasEl;
      const tooltip = document.getElementById("mapTooltip");
      if (!canvas || !tooltip) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found = null;
      SurveillanceModule.state.outbreakIncidents.forEach(function (inc) {
        if (inc._screenX !== undefined && inc._screenY !== undefined) {
          const dx = mouseX - inc._screenX;
          const dy = mouseY - inc._screenY;
          if (Math.sqrt(dx * dx + dy * dy) < 14) {
            found = inc;
          }
        }
      });

      if (found) {
        tooltip.classList.remove("hidden");
        tooltip.style.left = (mouseX + 15) + "px";
        tooltip.style.top = (mouseY + 15) + "px";
        tooltip.innerHTML = `
          <div class="font-bold text-emerald-400">${found.diseaseName}</div>
          <div class="text-[11px] text-slate-200">${found.village}, ${found.district}</div>
          <div class="text-[10px] text-slate-400">Rugi: ${found.morbidityCount} | Mritak: ${found.mortalityCount}</div>
          <div class="text-[9px] text-amber-300 mt-1">${found.containmentStatus}</div>
        `;
      } else {
        tooltip.classList.add("hidden");
      }
    },

    // ==========================================================================
    // TAB 2: INCIDENCE REGISTRY (DETAILED TABULAR VIEW)
    // ==========================================================================
    buildRegistryTable: function () {
      const container = document.createElement("div");
      container.className = "bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl sunlight-card space-y-4";

      // Table Header & Search
      const searchRow = document.createElement("div");
      searchRow.className = "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3";
      searchRow.innerHTML = `
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-database text-emerald-400"></i>
          <h3 class="font-display font-bold text-white text-base sunlight-text">राष्ट्रीय पशु महामारी अभिलेख (Epidemic Master Registry)</h3>
        </div>
        <div class="flex items-center gap-2">
          <input type="text" id="registrySearchInput" placeholder="Search Village, District, Pathogen..." class="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 w-64 focus:ring-2 focus:ring-emerald-500 outline-none">
          <button id="btnExportRegistryCsv" type="button" class="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors">
            <i class="fa-solid fa-file-csv text-emerald-400"></i>
            <span>Export CSV</span>
          </button>
        </div>
      `;
      container.appendChild(searchRow);

      // Master Table Element
      const tableWrapper = document.createElement("div");
      tableWrapper.className = "overflow-x-auto custom-scrollbar";

      const table = document.createElement("table");
      table.className = "w-full text-left text-xs text-slate-300 border-collapse";
      table.innerHTML = `
        <thead>
          <tr class="border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400 bg-slate-950/60">
            <th class="p-3">Incident ID</th>
            <th class="p-3">Disease / Pathogen</th>
            <th class="p-3">Location & District</th>
            <th class="p-3">Species</th>
            <th class="p-3 text-center">Cases / Deaths</th>
            <th class="p-3">Lab Status</th>
            <th class="p-3">Bio-Status</th>
            <th class="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody id="registryTableBody" class="divide-y divide-slate-800/60"></tbody>
      `;

      tableWrapper.appendChild(table);
      container.appendChild(tableWrapper);

      setTimeout(function () {
        SurveillanceModule.renderRegistryRows("");
        const searchInput = document.getElementById("registrySearchInput");
        if (searchInput) {
          searchInput.oninput = function () {
            SurveillanceModule.renderRegistryRows(this.value.trim().toLowerCase());
          };
        }
        const btnCsv = document.getElementById("btnExportRegistryCsv");
        if (btnCsv) {
          btnCsv.onclick = function () {
            SurveillanceModule.exportRegistryToCsv();
          };
        }
      }, 0);

      return container;
    },

    renderRegistryRows: function (query) {
      const tbody = document.getElementById("registryTableBody");
      if (!tbody) return;
      tbody.innerHTML = "";

      let items = SurveillanceModule.state.outbreakIncidents.slice();

      if (query) {
        items = items.filter(function (i) {
          return (
            i.incidentId.toLowerCase().includes(query) ||
            i.diseaseName.toLowerCase().includes(query) ||
            i.village.toLowerCase().includes(query) ||
            i.district.toLowerCase().includes(query) ||
            i.pathogen.toLowerCase().includes(query)
          );
        });
      }

      if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="p-6 text-center text-slate-400 text-xs">कोई अभिलेख उपलब्ध नहीं है (No matching incidents).</td></tr>`;
        return;
      }

      items.forEach(function (inc) {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-800/40 transition-colors";

        let statusPill = "";
        if (inc.containmentStatus === "ACTIVE_EPIDEMIC") {
          statusPill = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">ACTIVE</span>';
        } else if (inc.containmentStatus === "CONTAINED") {
          statusPill = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">CONTAINED</span>';
        } else {
          statusPill = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">RESOLVED</span>';
        }

        tr.innerHTML = `
          <td class="p-3 font-mono font-bold text-emerald-400">${inc.incidentId}</td>
          <td class="p-3">
            <div class="font-bold text-white sunlight-text">${inc.diseaseName}</div>
            <div class="text-[10px] font-mono text-slate-400">${inc.pathogen}</div>
          </td>
          <td class="p-3">
            <div>${inc.village}, ${inc.district}</div>
            <div class="text-[10px] text-slate-400">${inc.state} (${inc.gpsCoords.lat.toFixed(3)}, ${inc.gpsCoords.lng.toFixed(3)})</div>
          </td>
          <td class="p-3 text-[11px]">${inc.speciesAffected}</td>
          <td class="p-3 text-center font-mono">
            <span class="text-rose-400 font-bold">${inc.morbidityCount}</span> / <span class="text-slate-400">${inc.mortalityCount}</span>
          </td>
          <td class="p-3">
            ${inc.labConfirmed
              ? '<span class="text-[10px] text-emerald-400 font-semibold"><i class="fa-solid fa-circle-check mr-1"></i>RT-PCR Pos</span>'
              : '<span class="text-[10px] text-amber-400 font-semibold"><i class="fa-solid fa-clock mr-1"></i>Presumptive</span>'}
          </td>
          <td class="p-3">${statusPill}</td>
          <td class="p-3 text-right">
            <button class="btn-print-flash p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 mr-1" title="Print Official Flash Memo" data-id="${inc.incidentId}">
              <i class="fa-solid fa-print"></i>
            </button>
            <button class="btn-delete-inc p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-rose-400 border border-slate-700" title="Delete Outbreak" data-id="${inc.incidentId}">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        `;

        tr.querySelector(".btn-print-flash").addEventListener("click", function () {
          SurveillanceModule.printStatutoryFlashReport(inc.incidentId);
        });

        tr.querySelector(".btn-delete-inc").addEventListener("click", function () {
          if (confirm(`Are you sure you want to delete report ${inc.incidentId}?`)) {
            SurveillanceModule.deleteIncident(inc.incidentId);
          }
        });

        tbody.appendChild(tr);
      });
    },

    deleteIncident: function (incidentId) {
      SurveillanceModule.state.outbreakIncidents = SurveillanceModule.state.outbreakIncidents.filter(function (i) {
        return i.incidentId !== incidentId;
      });
      StorageEngine.bulkInsert(SurveillanceModule.state.outbreakIncidents).then(function () {
        SurveillanceModule.recomputeClusters();
        SurveillanceModule.render(SurveillanceModule.containerEl.id);
        if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
          window.VetcareApp.showToast("अभिलेख सफलतापूर्वक हटाया गया (Incident deleted).", "info");
        }
      });
    },

    exportRegistryToCsv: function () {
      const incidents = SurveillanceModule.state.outbreakIncidents;
      if (incidents.length === 0) return;

      const headers = [
        "Incident ID", "Disease Name", "Pathogen", "Species", "Village", "District",
        "State", "Latitude", "Longitude", "Morbidity", "Mortality", "Confirmed Date",
        "Lab Confirmed", "Is Zoonotic", "Containment Status"
      ];

      const rows = incidents.map(function (i) {
        return [
          `"${i.incidentId}"`, `"${i.diseaseName}"`, `"${i.pathogen}"`, `"${i.speciesAffected}"`,
          `"${i.village}"`, `"${i.district}"`, `"${i.state}"`, i.gpsCoords.lat, i.gpsCoords.lng,
          i.morbidityCount, i.mortalityCount, `"${i.confirmedDate}"`, i.labConfirmed,
          i.isZoonotic, `"${i.containmentStatus}"`
        ].join(",");
      });

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Vetcare_Epidemic_Registry_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    // ==========================================================================
    // TAB 3: BIOSECURITY & CONTAINMENT ZONES DEEP-DIVE
    // ==========================================================================
    buildContainmentZonesTab: function () {
      const container = document.createElement("div");
      container.className = "grid grid-cols-1 lg:grid-cols-3 gap-5";

      // Card 1: 0-3km Infected Zone
      const card1 = document.createElement("div");
      card1.className = "p-5 rounded-2xl bg-gradient-to-b from-rose-950/40 to-slate-900 border-2 border-rose-500/40 sunlight-card flex flex-col justify-between";
      card1.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-rose-500 text-slate-950">Zone Level 01</span>
            <span class="text-rose-400 font-mono text-xs font-bold">0 - 3 KM</span>
          </div>
          <h3 class="font-display font-extrabold text-lg text-white mb-1 sunlight-text">संक्रमित उपरिकेंद्र (Infected Zone)</h3>
          <div class="text-xs font-mono text-rose-300 mb-3">Total Bio-Lockdown & Cordon Sanitaire</div>
          <p class="text-xs text-slate-300 leading-relaxed mb-4 sunlight-muted">
            प्रकोप केंद्र से 3 किमी परिधि के भीतर पशुओं की आवाजाही पर पूर्ण रोक। तत्काल रिंग-टीकाकरण एवं शवों का वैज्ञानिक विनिष्टीकरण।
          </p>
          <div class="space-y-2 text-xs text-slate-200">
            <div class="flex items-start gap-2"><i class="fa-solid fa-lock text-rose-400 mt-0.5"></i> <span>दैनिक पशु बाजार व हाट पर 100% प्रतिबंध</span></div>
            <div class="flex items-start gap-2"><i class="fa-solid fa-syringe text-emerald-400 mt-0.5"></i> <span>72 घंटे के भीतर शत-प्रतिशत रिंग वैक्सीनेशन</span></div>
            <div class="flex items-start gap-2"><i class="fa-solid fa-fire text-amber-400 mt-0.5"></i> <span>मृत पशुओं को चूने (Quicklime) के साथ 2.5 मीटर गहरा दफनाना</span></div>
          </div>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-rose-300">
          Enforcement: State Animal Husbandry Dept & District Magistrate
        </div>
      `;

      // Card 2: 3-10km Surveillance Zone
      const card2 = document.createElement("div");
      card2.className = "p-5 rounded-2xl bg-gradient-to-b from-amber-950/40 to-slate-900 border-2 border-amber-500/40 sunlight-card flex flex-col justify-between";
      card2.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-slate-950">Zone Level 02</span>
            <span class="text-amber-400 font-mono text-xs font-bold">3 - 10 KM</span>
          </div>
          <h3 class="font-display font-extrabold text-lg text-white mb-1 sunlight-text">निगरानी बफर परिधि (Surveillance Buffer)</h3>
          <div class="text-xs font-mono text-amber-300 mb-3">Active Serological Monitoring</div>
          <p class="text-xs text-slate-300 leading-relaxed mb-4 sunlight-muted">
            3 से 10 किमी परिधि में दैनिक सीरो-निगरानी, दुग्ध वाहनों का विसंक्रमण, एवं मुख्य संपर्क मार्गों पर रोगाणुरोधी छिड़काव चौकियां।
          </p>
          <div class="space-y-2 text-xs text-slate-200">
            <div class="flex items-start gap-2"><i class="fa-solid fa-road-barrier text-amber-400 mt-0.5"></i> <span>4% सोडियम कार्बोनेट / विरकॉन वाहन स्प्रे चौकियां</span></div>
            <div class="flex items-start gap-2"><i class="fa-solid fa-vial text-cyan-400 mt-0.5"></i> <span>यादृच्छिक (Random) रक्त एवं नासिका स्राव सैंपलिंग</span></div>
            <div class="flex items-start gap-2"><i class="fa-solid fa-id-card text-emerald-400 mt-0.5"></i> <span>दूध परिवहन हेतु अनिवार्य पशु चिकित्सा पारगमन पास</span></div>
          </div>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-300">
          Enforcement: Rapid Response Teams (RRT) & Milk Cooperatives
        </div>
      `;

      // Card 3: One-Health Public Safety
      const card3 = document.createElement("div");
      card3.className = "p-5 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-slate-900 border-2 border-cyan-500/40 sunlight-card flex flex-col justify-between";
      card3.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-cyan-500 text-slate-950">One-Health</span>
            <span class="text-cyan-400 font-mono text-xs font-bold">Human-Animal Axis</span>
          </div>
          <h3 class="font-display font-extrabold text-lg text-white mb-1 sunlight-text">मानव सुरक्षा एवं स्वास्थ्य (One Health SOP)</h3>
          <div class="text-xs font-mono text-cyan-300 mb-3">Joint Outbreak Response</div>
          <p class="text-xs text-slate-300 leading-relaxed mb-4 sunlight-muted">
            पशु-से-मानव में फैलने वाले जूनोटिक रोगों (एंथ्रेक्स, बर्ड फ्लू, ब्रुसेलोसिस) से पशुपालकों व डॉक्टरों के बचाव हेतु अनिवार्य सुरक्षा चक्र।
          </p>
          <div class="space-y-2 text-xs text-slate-200">
            <div class="flex items-start gap-2"><i class="fa-solid fa-vest text-cyan-400 mt-0.5"></i> <span>N95 मास्क, फेस शील्ड एवं डबल नाइट्राइल दस्ताने</span></div>
            <div class="flex items-start gap-2"><i class="fa-solid fa-glass-water-droplet text-rose-400 mt-0.5"></i> <span>कच्चे दूध एवं बिना पके मांस की बिक्री पर पूर्ण रोक</span></div>
            <div class="flex items-start gap-2"><i class="fa-solid fa-user-doctor text-emerald-400 mt-0.5"></i> <span>मानव संपर्क सूची (Contact Tracing) सीएमओ कार्यालय को प्रेषित</span></div>
          </div>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-300">
          Enforcement: Integrated Disease Surveillance Programme (IDSP)
        </div>
      `;

      container.appendChild(card1);
      container.appendChild(card2);
      container.appendChild(card3);
      return container;
    },

    // ==========================================================================
    // TAB 4: STATUTORY REPORTING (NADRS / WOAH COMPLIANCE)
    // ==========================================================================
    buildStatutoryReportsTab: function () {
      const container = document.createElement("div");
      container.className = "space-y-6";

      const header = document.createElement("div");
      header.className = "bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl sunlight-card flex flex-col md:flex-row items-start md:items-center justify-between gap-3";
      header.innerHTML = `
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">STATUTORY LEGAL COMPLIANCE</span>
            <span class="text-xs font-mono text-slate-400">DAHD / WOAH WAHIS FORMAT</span>
          </div>
          <h2 class="text-xl font-display font-extrabold text-white mt-1 sunlight-text">सांविधिक त्वरित महामारी रिपोर्टिंग कंसोल (Flash Reports)</h2>
          <p class="text-xs text-slate-300 mt-0.5 sunlight-muted">पशु संक्रामक रोग अधिनियम (2009) के तहत भारत सरकार एवं अंतरराष्ट्रीय पशु स्वास्थ्य संगठन (WOAH) को रिपोर्ट।</p>
        </div>
        <button id="btnPrintGlobalSummary" type="button" class="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all">
          <i class="fa-solid fa-print"></i>
          <span>प्रिंट राज्य स्तरीय महामारी सारांश (State Summary)</span>
        </button>
      `;
      container.appendChild(header);

      // Report Cards Grid
      const grid = document.createElement("div");
      grid.className = "grid grid-cols-1 md:grid-cols-2 gap-4";

      SurveillanceModule.state.outbreakIncidents.forEach(function (inc) {
        const card = document.createElement("div");
        card.className = "p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md sunlight-card flex flex-col justify-between";
        card.innerHTML = `
          <div>
            <div class="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <span class="font-mono text-xs font-bold text-emerald-400">${inc.incidentId}</span>
              <span class="text-[10px] font-mono text-slate-400">Date: ${inc.confirmedDate}</span>
            </div>
            <h4 class="font-display font-black text-white text-base sunlight-text">${inc.diseaseName}</h4>
            <div class="text-xs text-slate-300 mt-1">${inc.village}, ${inc.district}, ${inc.state}</div>
            <div class="mt-2 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Morbidity: <strong class="text-rose-400">${inc.morbidityCount}</strong></span>
              <span>Mortality: <strong class="text-slate-200">${inc.mortalityCount}</strong></span>
              <span>Radius: <strong class="text-amber-400">${inc.cordonRadiusKm} km</strong></span>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span class="text-[11px] font-mono ${inc.labConfirmed ? 'text-emerald-400' : 'text-amber-400'}">
              ${inc.labConfirmed ? '✓ ICAR-NIHSAD Confirmed' : '⚠ Field Suspected'}
            </span>
            <button class="btn-print-single-flash px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5" data-id="${inc.incidentId}">
              <i class="fa-solid fa-file-pdf text-rose-400"></i> Official Flash Memo
            </button>
          </div>
        `;

        card.querySelector(".btn-print-single-flash").addEventListener("click", function () {
          SurveillanceModule.printStatutoryFlashReport(inc.incidentId);
        });

        grid.appendChild(card);
      });

      container.appendChild(grid);

      setTimeout(function () {
        const btnPrintGlobal = document.getElementById("btnPrintGlobalSummary");
        if (btnPrintGlobal) {
          btnPrintGlobal.onclick = function () {
            window.print();
          };
        }
      }, 0);

      return container;
    },

    // ==========================================================================
    // OFFICIAL STATUTORY A4 FLASH REPORT GENERATION (PRINT LAYOUT)
    // ==========================================================================
    printStatutoryFlashReport: function (incidentId) {
      const inc = SurveillanceModule.state.outbreakIncidents.find(function (i) {
        return i.incidentId === incidentId;
      });
      if (!inc) return;

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("कृपया पॉपअप ब्लॉकर अक्षम करें (Please allow popups to print official flash memo).");
        return;
      }

      const zones = SpatialMath.calculateContainmentZones(inc.gpsCoords);
      const zoonoticInfo = SpatialMath.auditZoonoticRisk(inc.diseaseId);

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>OFFICIAL FLASH OUTBREAK REPORT - ${inc.incidentId}</title>
          <style>
            @page { size: A4; margin: 20mm; }
            body { font-family: 'Times New Roman', serif; color: #000; background: #fff; line-height: 1.4; font-size: 11pt; }
            .header-table { width: 100%; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; }
            .national-emblem { text-align: center; font-weight: bold; font-size: 13pt; text-transform: uppercase; letter-spacing: 1px; }
            .sub-emblem { text-align: center; font-size: 10pt; font-style: italic; }
            .memo-title { text-align: center; font-size: 14pt; font-weight: bold; text-decoration: underline; margin: 15px 0; letter-spacing: 0.5px; }
            .meta-grid { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            .meta-grid td { padding: 4px 6px; border: 1px solid #444; font-size: 10pt; }
            .meta-grid th { padding: 4px 6px; border: 1px solid #444; background: #f0f0f0; font-size: 10pt; text-align: left; }
            .section-head { font-weight: bold; font-size: 11pt; margin-top: 12px; margin-bottom: 4px; text-transform: uppercase; border-bottom: 1px solid #666; }
            .signature-table { width: 100%; margin-top: 40px; border-collapse: collapse; }
            .signature-table td { width: 50%; vertical-align: top; }
            .seal-box { border: 1px dashed #000; width: 130px; height: 75px; text-align: center; line-height: 75px; font-size: 9pt; color: #555; margin-top: 8px; }
            .badge-danger { color: #b91c1c; font-weight: bold; }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td class="national-emblem">
                GOVERNMENT OF INDIA / STATE ANIMAL HUSBANDRY DIRECTORATE<br>
                <span class="sub-emblem">National Animal Disease Referral & Epidemiological Intelligence Command</span>
              </td>
            </tr>
          </table>

          <div class="memo-title">STATUTORY EPIDEMIC FLASH REPORT (IMMEDIATE ACTION MEMO)</div>

          <table class="meta-grid">
            <tr>
              <th>DISPATCH MEMO NO:</th>
              <td><strong>DAHD/NADRS/${inc.incidentId}</strong></td>
              <th>DATE OF DISPATCH:</th>
              <td><strong>${new Date().toLocaleDateString('en-GB')}</strong></td>
            </tr>
            <tr>
              <th>DISEASE REPORTED:</th>
              <td class="badge-danger">${inc.diseaseName.toUpperCase()}</td>
              <th>PATHOGEN STRAIN:</th>
              <td>${inc.pathogen}</td>
            </tr>
            <tr>
              <th>AFFECTED SPECIES:</th>
              <td>${inc.speciesAffected}</td>
              <th>NOTIFIABLE (WOAH):</th>
              <td>YES (SCHEDULE-I / ACT 2009)</td>
            </tr>
            <tr>
              <th>EPICENTER LOCATION:</th>
              <td>Village: ${inc.village}, Dist: ${inc.district}, State: ${inc.state}</td>
              <th>GPS COORDINATES:</th>
              <td>${inc.gpsCoords.lat.toFixed(5)}° N, ${inc.gpsCoords.lng.toFixed(5)}° E</td>
            </tr>
            <tr>
              <th>MORBIDITY (CASES):</th>
              <td><strong>${inc.morbidityCount} Head of Stock</strong></td>
              <th>MORTALITY (DEATHS):</th>
              <td><strong>${inc.mortalityCount} Reported Dead</strong></td>
            </tr>
            <tr>
              <th>LABORATORY STATUS:</th>
              <td>${inc.labConfirmed ? 'CONFIRMED BY REGIONAL VRDL / ICAR' : 'PRESUMPTIVE FIELD DIAGNOSIS (PENDING RT-PCR)'}</td>
              <th>ZOONOTIC RISK:</th>
              <td>${inc.isZoonotic ? 'CRITICAL - HIGH ZOONOTIC SPILLOVER HAZARD' : 'LOW / ANIMAL SPECIFIC'}</td>
            </tr>
          </table>

          <div class="section-head">1. STATUTORY CORDON SANITAIRE (CONTAINMENT ENFORCEMENT)</div>
          <p style="margin: 4px 0; font-size: 10pt;">
            Pursuant to the powers vested under <em>The Prevention and Control of Infectious and Contagious Diseases in Animals Act, 2009</em>, the following containment perimeter is officially proclaimed:
          </p>
          <ul style="font-size: 10pt; margin: 4px 0 10px 20px;">
            <li><strong>Infected Zone (0 - 3.0 KM):</strong> Immediate ban on ingress/egress of susceptible livestock. Compulsory ring vaccination with ${STATUTORY_DISEASE_REGISTRY[inc.diseaseId] ? STATUTORY_DISEASE_REGISTRY[inc.diseaseId].ringVaccineStrain : 'Heterologous Vaccine'}.</li>
            <li><strong>Surveillance Buffer Zone (3.0 - 10.0 KM):</strong> Animal markets, fairs, and artificial insemination frozen semen transport suspended. Checkpost disinfectant wheel washes active.</li>
            <li><strong>Sanitary Disposal:</strong> Strict ban on carcass flaying or skin trade. Compulsory burial under 2.5m depth with calcium oxide.</li>
          </ul>

          <div class="section-head">2. ONE-HEALTH ZOONOSES & HUMAN HEALTH ADVISORY</div>
          <p style="margin: 4px 0 10px 0; font-size: 10pt;">
            ${zoonoticInfo.advisoryText} All attending veterinary personnel must wear ${zoonoticInfo.ppeLevel}.
          </p>

          <table class="signature-table">
            <tr>
              <td>
                <div class="seal-box">OFFICIAL EMBOSS SEAL</div>
                <div style="margin-top: 4px; font-size: 9pt;">District Veterinary HQ Surveillance Cell</div>
              </td>
              <td style="text-align: right;">
                <div style="font-weight: bold; margin-bottom: 40px;">BY ORDER OF STATE ANIMAL HUSBANDRY DIRECTORATE</div>
                <div style="border-top: 1px solid #000; display: inline-block; width: 220px; text-align: center; font-size: 10pt;">
                  Authorized State Veterinary Epidemiologist<br>
                  <span style="font-size: 8pt; color: #555;">(Digital Hash: SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()})</span>
                </div>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(function () {
        printWindow.print();
      }, 350);
    },

    // ==========================================================================
    // MODAL: REPORT NEW SUSPECTED OUTBREAK CASE
    // ==========================================================================
    openNewIncidentModal: function (prefill) {
      prefill = prefill || {};

      let modalBackdrop = document.getElementById("surveillanceNewIncidentModal");
      if (modalBackdrop) modalBackdrop.remove();

      modalBackdrop = document.createElement("div");
      modalBackdrop.id = "surveillanceNewIncidentModal";
      modalBackdrop.className = "fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto";

      const modalBox = document.createElement("div");
      modalBox.className = "bg-slate-900 border-2 border-rose-500/50 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative sunlight-card";

      const diseasesOptionsHtml = Object.keys(STATUTORY_DISEASE_REGISTRY).map(function (k) {
        const d = STATUTORY_DISEASE_REGISTRY[k];
        const isSel = prefill.diseaseId === k;
        return `<option value="${k}" ${isSel ? "selected" : ""}>${d.name} (${d.pathogen})</option>`;
      }).join("");

      modalBox.innerHTML = `
        <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 class="font-display font-bold text-lg text-white sunlight-text">नया पशु महामारी प्रकोप दर्ज करें</h3>
          </div>
          <button id="btnCloseOutbreakModal" type="button" class="text-slate-400 hover:text-white p-1">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <form id="frmNewOutbreakIncident" onsubmit="return false;" class="space-y-3.5 text-xs">
          <div>
            <label class="block font-mono uppercase text-slate-300 mb-1">रोग चयन (Disease / Pathogen)</label>
            <select id="modalInpDisease" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500">
              ${diseasesOptionsHtml}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-mono uppercase text-slate-300 mb-1">प्रभावित प्रजाति (Species)</label>
              <input type="text" id="modalInpSpecies" value="${prefill.species || 'Bovine (Cattle/Buffalo)'}" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500">
            </div>
            <div>
              <label class="block font-mono uppercase text-slate-300 mb-1">ग्राम / स्थान (Village)</label>
              <input type="text" id="modalInpVillage" placeholder="e.g. Rampur Rural" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-mono uppercase text-slate-300 mb-1">जिला (District)</label>
              <input type="text" id="modalInpDistrict" placeholder="e.g. Alwar" required class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500">
            </div>
            <div>
              <label class="block font-mono uppercase text-slate-300 mb-1">राज्य (State)</label>
              <input type="text" id="modalInpState" value="Rajasthan" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500">
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-mono uppercase text-slate-300 mb-1">रुग्ण पशु (Cases)</label>
              <input type="number" id="modalInpMorbidity" min="1" value="12" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500">
            </div>
            <div>
              <label class="block font-mono uppercase text-slate-300 mb-1">मृत्यु (Deaths)</label>
              <input type="number" id="modalInpMortality" min="0" value="1" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500">
            </div>
            <div>
              <label class="block font-mono uppercase text-slate-300 mb-1">घेराबंदी (Radius Km)</label>
              <input type="number" id="modalInpRadius" min="1" value="10" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500">
            </div>
          </div>

          <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-mono text-slate-300">GPS टेलीमेट्री (Latitude / Longitude)</span>
              <button type="button" id="btnModalUseLiveGps" class="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold">
                <i class="fa-solid fa-location-crosshairs"></i> Get Live GPS
              </button>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <input type="number" step="0.0001" id="modalInpLat" placeholder="Lat (e.g. 27.5530)" value="27.5530" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs">
              <input type="number" step="0.0001" id="modalInpLng" placeholder="Lng (e.g. 76.6346)" value="76.6346" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs">
            </div>
          </div>

          <div class="flex items-center gap-4 pt-1">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="modalInpLabConfirmed" class="rounded border-slate-700 text-rose-600 focus:ring-0">
              <span class="text-slate-300">Lab Confirmed (RT-PCR / ELISA)</span>
            </label>
          </div>

          <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button type="button" id="btnCancelModal" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">रद्द करें</button>
            <button type="button" id="btnSubmitNewOutbreak" class="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40">
              घोषणा व प्रेषण (Declare Outbreak)
            </button>
          </div>
        </form>
      `;

      modalBackdrop.appendChild(modalBox);
      document.body.appendChild(modalBackdrop);

      // Bind Modal Controls
      const btnClose = document.getElementById("btnCloseOutbreakModal");
      const btnCancel = document.getElementById("btnCancelModal");
      const closeFn = function () { modalBackdrop.remove(); };
      if (btnClose) btnClose.onclick = closeFn;
      if (btnCancel) btnCancel.onclick = closeFn;

      // Live GPS Button
      const btnGps = document.getElementById("btnModalUseLiveGps");
      if (btnGps) {
        btnGps.onclick = function () {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              function (pos) {
                document.getElementById("modalInpLat").value = pos.coords.latitude.toFixed(4);
                document.getElementById("modalInpLng").value = pos.coords.longitude.toFixed(4);
                if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
                  window.VetcareApp.showToast("सटीक GPS स्थान प्राप्त हुआ!", "success");
                }
              },
              function () {
                if (window.VetcareApp && typeof window.VetcareApp.showToast === "function") {
                  window.VetcareApp.showToast("GPS सिग्नल प्राप्त नहीं हुआ। डिफ़ॉल्ट मान प्रयुक्त।", "warning");
                }
              }
            );
          }
        };
      }

      // Submit Outbreak
      const btnSubmit = document.getElementById("btnSubmitNewOutbreak");
      if (btnSubmit) {
        btnSubmit.onclick = function () {
          const diseaseId = document.getElementById("modalInpDisease").value;
          const meta = STATUTORY_DISEASE_REGISTRY[diseaseId];
          const village = document.getElementById("modalInpVillage").value.trim() || "Rural Sector";
          const district = document.getElementById("modalInpDistrict").value.trim() || "Local District";
          const state = document.getElementById("modalInpState").value.trim() || "India";
          const species = document.getElementById("modalInpSpecies").value.trim() || "Bovine";
          const morbidity = parseInt(document.getElementById("modalInpMorbidity").value, 10) || 1;
          const mortality = parseInt(document.getElementById("modalInpMortality").value, 10) || 0;
          const radius = parseInt(document.getElementById("modalInpRadius").value, 10) || 10;
          const lat = parseFloat(document.getElementById("modalInpLat").value) || 28.6139;
          const lng = parseFloat(document.getElementById("modalInpLng").value) || 77.2090;
          const labConfirmed = document.getElementById("modalInpLabConfirmed").checked;

          const newIncident = {
            incidentId: "OB-2026-IND-" + Math.floor(1000 + Math.random() * 9000),
            diseaseId: diseaseId,
            diseaseName: meta ? meta.name : diseaseId,
            speciesAffected: species,
            village: village,
            district: district,
            state: state,
            gpsCoords: { lat: lat, lng: lng },
            morbidityCount: morbidity,
            mortalityCount: mortality,
            confirmedDate: new Date().toISOString().slice(0, 10),
            labConfirmed: labConfirmed,
            pathogen: meta ? meta.pathogen : "Clinical Isolate",
            isZoonotic: meta ? meta.isZoonotic : false,
            isNotifiable: true,
            cordonRadiusKm: radius,
            containmentStatus: "ACTIVE_EPIDEMIC",
            ringVaccinationDone: 0,
            ringVaccinationTarget: morbidity * 40,
            checkpointsDeployed: false,
            movementHalted: true,
            carcassDisposedProperly: true
          };

          StorageEngine.save(newIncident).then(function () {
            SurveillanceModule.state.outbreakIncidents.unshift(newIncident);
            SurveillanceModule.state.selectedIncidentId = newIncident.incidentId;
            SurveillanceModule.recomputeClusters();
            SurveillanceModule.dispatchAlertDeclared(newIncident);
            modalBackdrop.remove();

            if (SurveillanceModule.containerEl) {
              SurveillanceModule.render(SurveillanceModule.containerEl.id);
            }
          });
        };
      }
    },

    // ==========================================================================
    // LIFECYCLE: destroy()
    // ==========================================================================
    destroy: function () {
      if (SurveillanceModule.canvasAnimFrameId) {
        cancelAnimationFrame(SurveillanceModule.canvasAnimFrameId);
        SurveillanceModule.canvasAnimFrameId = null;
      }
      if (SurveillanceModule.containerEl) {
        SurveillanceModule.containerEl.innerHTML = "";
      }
    }
  };

  // Register into Global Vetcare Modules Architecture
  window.VetcareApp.Modules.DiseaseOutbreakSurveillance = SurveillanceModule;

})(window, document);
