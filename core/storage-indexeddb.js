// Vetcare AI OS - Client-Side IndexedDB Engine & Large Dataset Storage Manager (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var DB_NAME = 'VetcareOS_LocalDB';
  var DB_VERSION = 1;
  var STORES = {
    PATIENTS: 'patients',
    PRESCRIPTIONS: 'prescriptions',
    MILK_LEDGER: 'milk_ledger',
    MEDIA_BLOBS: 'media_blobs',
    APP_SETTINGS: 'app_settings'
  };

  var STORE_NAMES = [
    STORES.PATIENTS,
    STORES.PRESCRIPTIONS,
    STORES.MILK_LEDGER,
    STORES.MEDIA_BLOBS,
    STORES.APP_SETTINGS
  ];

  var DB = {
    dbInstance: null,
    isReady: false,
    initPromise: null,
    stores: STORES
  };

  window.VetcareApp.DB = DB;

  // Safe Toast Notification Dispatcher
  function displayToast(message, type, duration) {
    var toastDuration = typeof duration === 'number' ? duration : 3500;
    if (typeof window.showAppToast === 'function') {
      window.showAppToast(message, type, toastDuration);
    } else if (window.VetcareApp.UI && typeof window.VetcareApp.UI.showToast === 'function') {
      window.VetcareApp.UI.showToast(message, type, toastDuration);
    } else {
      console.log('[StorageDB ' + (type || 'info').toUpperCase() + '] ' + message);
    }
  }

  // 2. PROMISIFIED ASYNC CONNECTION & SCHEMA UPGRADE
  DB.open = function () {
    if (DB.isReady && DB.dbInstance) {
      return Promise.resolve(DB.dbInstance);
    }

    if (DB.initPromise) {
      return DB.initPromise;
    }

    DB.initPromise = new Promise(function (resolve, reject) {
      var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

      if (!indexedDB) {
        var errUnsup = 'इस ब्राउज़र में IndexedDB समर्थित नहीं है। डेटा सहेजना संभव नहीं है।';
        displayToast(errUnsup, 'error');
        return reject(new Error(errUnsup));
      }

      var request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = function (event) {
        var db = event.target.result;
        console.log('[Vetcare DB] Initializing / Upgrading Schema to Version:', DB_VERSION);

        // Store 1: Patients (Livestock & Pet Profiles)
        if (!db.objectStoreNames.contains(STORES.PATIENTS)) {
          var patientStore = db.createObjectStore(STORES.PATIENTS, { keyPath: 'id', autoIncrement: true });
          patientStore.createIndex('species', 'species', { unique: false });
          patientStore.createIndex('ownerPhone', 'ownerPhone', { unique: false });
          patientStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Store 2: Prescriptions (Clinical OPD Records & Prescriptions)
        if (!db.objectStoreNames.contains(STORES.PRESCRIPTIONS)) {
          var rxStore = db.createObjectStore(STORES.PRESCRIPTIONS, { keyPath: 'id', autoIncrement: true });
          rxStore.createIndex('patientId', 'patientId', { unique: false });
          rxStore.createIndex('date', 'date', { unique: false });
          rxStore.createIndex('doctorPhone', 'doctorPhone', { unique: false });
          rxStore.createIndex('diseaseName', 'diseaseName', { unique: false });
        }

        // Store 3: Milk Ledger (Dairy Production & Revenue Records)
        if (!db.objectStoreNames.contains(STORES.MILK_LEDGER)) {
          var milkStore = db.createObjectStore(STORES.MILK_LEDGER, { keyPath: 'id', autoIncrement: true });
          milkStore.createIndex('date', 'date', { unique: false });
          milkStore.createIndex('shift', 'shift', { unique: false });
          milkStore.createIndex('farmerPhone', 'farmerPhone', { unique: false });
        }

        // Store 4: Media Blobs (Clinical Photos, Audio Auscultations & Documents)
        if (!db.objectStoreNames.contains(STORES.MEDIA_BLOBS)) {
          var mediaStore = db.createObjectStore(STORES.MEDIA_BLOBS, { keyPath: 'id', autoIncrement: true });
          mediaStore.createIndex('caseId', 'caseId', { unique: false });
          mediaStore.createIndex('mediaType', 'mediaType', { unique: false });
          mediaStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Store 5: App Settings & Offline Cache Configurations
        if (!db.objectStoreNames.contains(STORES.APP_SETTINGS)) {
          db.createObjectStore(STORES.APP_SETTINGS, { keyPath: 'key' });
        }
      };

      request.onsuccess = function (event) {
        DB.dbInstance = event.target.result;
        DB.isReady = true;

        DB.dbInstance.onversionchange = function () {
          DB.dbInstance.close();
          DB.isReady = false;
          DB.dbInstance = null;
          console.warn('[Vetcare DB] Database version changed elsewhere. Connection closed.');
        };

        console.log('[Vetcare DB] Database connection established successfully:', DB_NAME);
        resolve(DB.dbInstance);
      };

      request.onerror = function (event) {
        var error = event.target.error;
        console.error('[Vetcare DB] Failed to open IndexedDB:', error);
        displayToast('स्थानीय डेटाबेस खोलने में विफल।', 'error');
        reject(error);
      };

      request.onblocked = function () {
        console.warn('[Vetcare DB] Database open blocked. Please close other open tabs of Vetcare AI OS.');
        displayToast('डेटाबेस अपग्रेड अवरुद्ध है। कृपया अन्य टैब बंद करें।', 'warning');
      };
    });

    return DB.initPromise;
  };

  // Internal Helper: Ensure Open DB Connection
  function ensureDb() {
    if (DB.isReady && DB.dbInstance) {
      return Promise.resolve(DB.dbInstance);
    }
    return DB.open();
  }

  // 3. PROMISIFIED ASYNC CRUD OPERATIONS
  DB.add = function (storeName, data) {
    return ensureDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        if (!db.objectStoreNames.contains(storeName)) {
          return reject(new Error("Object store '" + storeName + "' does not exist."));
        }

        var transaction = db.transaction([storeName], 'readwrite');
        var store = transaction.objectStore(storeName);

        var recordToInsert = Object.assign({}, data);
        if (!recordToInsert.createdAt && storeName !== STORES.APP_SETTINGS) {
          recordToInsert.createdAt = Date.now();
        }

        var request = store.add(recordToInsert);

        request.onsuccess = function (event) {
          resolve(event.target.result); // Returns generated primary key ID
        };

        request.onerror = function (event) {
          console.error('[Vetcare DB] Error adding record to ' + storeName + ':', event.target.error);
          reject(event.target.error);
        };
      });
    });
  };

  DB.get = function (storeName, id) {
    return ensureDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        if (!db.objectStoreNames.contains(storeName)) {
          return reject(new Error("Object store '" + storeName + "' does not exist."));
        }

        var transaction = db.transaction([storeName], 'readonly');
        var store = transaction.objectStore(storeName);
        var request = store.get(id);

        request.onsuccess = function (event) {
          resolve(event.target.result || null);
        };

        request.onerror = function (event) {
          console.error('[Vetcare DB] Error reading record from ' + storeName + ':', event.target.error);
          reject(event.target.error);
        };
      });
    });
  };

  DB.getAll = function (storeName, indexName, queryRange) {
    return ensureDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        if (!db.objectStoreNames.contains(storeName)) {
          return reject(new Error("Object store '" + storeName + "' does not exist."));
        }

        var transaction = db.transaction([storeName], 'readonly');
        var store = transaction.objectStore(storeName);
        var request;

        if (indexName) {
          if (!store.indexNames.contains(indexName)) {
            return reject(new Error("Index '" + indexName + "' does not exist on store '" + storeName + "'."));
          }
          var index = store.index(indexName);
          request = queryRange ? index.getAll(queryRange) : index.getAll();
        } else {
          request = queryRange ? store.getAll(queryRange) : store.getAll();
        }

        request.onsuccess = function (event) {
          resolve(event.target.result || []);
        };

        request.onerror = function (event) {
          console.error('[Vetcare DB] Error reading all records from ' + storeName + ':', event.target.error);
          reject(event.target.error);
        };
      });
    });
  };

  DB.update = function (storeName, data) {
    return ensureDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        if (!db.objectStoreNames.contains(storeName)) {
          return reject(new Error("Object store '" + storeName + "' does not exist."));
        }

        var transaction = db.transaction([storeName], 'readwrite');
        var store = transaction.objectStore(storeName);

        var recordToUpdate = Object.assign({}, data);
        if (storeName !== STORES.APP_SETTINGS) {
          recordToUpdate.updatedAt = Date.now();
        }

        var request = store.put(recordToUpdate);

        request.onsuccess = function (event) {
          resolve(event.target.result);
        };

        request.onerror = function (event) {
          console.error('[Vetcare DB] Error updating record in ' + storeName + ':', event.target.error);
          reject(event.target.error);
        };
      });
    });
  };

  DB.delete = function (storeName, id) {
    return ensureDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        if (!db.objectStoreNames.contains(storeName)) {
          return reject(new Error("Object store '" + storeName + "' does not exist."));
        }

        var transaction = db.transaction([storeName], 'readwrite');
        var store = transaction.objectStore(storeName);
        var request = store.delete(id);

        request.onsuccess = function () {
          resolve(true);
        };

        request.onerror = function (event) {
          console.error('[Vetcare DB] Error deleting record from ' + storeName + ':', event.target.error);
          reject(event.target.error);
        };
      });
    });
  };

  DB.clearStore = function (storeName) {
    return ensureDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        if (!db.objectStoreNames.contains(storeName)) {
          return reject(new Error("Object store '" + storeName + "' does not exist."));
        }

        var transaction = db.transaction([storeName], 'readwrite');
        var store = transaction.objectStore(storeName);
        var request = store.clear();

        request.onsuccess = function () {
          console.log('[Vetcare DB] Cleared all records from: ' + storeName);
          resolve(true);
        };

        request.onerror = function (event) {
          console.error('[Vetcare DB] Error clearing store ' + storeName + ':', event.target.error);
          reject(event.target.error);
        };
      });
    });
  };

  DB.count = function (storeName) {
    return ensureDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        if (!db.objectStoreNames.contains(storeName)) {
          return resolve(0);
        }

        var transaction = db.transaction([storeName], 'readonly');
        var store = transaction.objectStore(storeName);
        var request = store.count();

        request.onsuccess = function (event) {
          resolve(event.target.result || 0);
        };

        request.onerror = function (event) {
          console.error('[Vetcare DB] Count error in ' + storeName + ':', event.target.error);
          resolve(0);
        };
      });
    });
  };

  // 4. DATABASE BACKUP DUMP & RESTORE ENGINE
  DB.exportDatabaseDump = function () {
    return ensureDb().then(function () {
      var fetchPromises = STORE_NAMES.map(function (storeName) {
        return DB.getAll(storeName).then(function (records) {
          return { store: storeName, records: records };
        });
      });

      return Promise.all(fetchPromises).then(function (results) {
        var backupPayload = {
          app: 'Vetcare AI OS',
          version: DB_VERSION,
          exportedAt: Date.now(),
          exportedDateISO: new Date().toISOString(),
          stores: {}
        };

        results.forEach(function (res) {
          backupPayload.stores[res.store] = res.records;
        });

        var jsonString = JSON.stringify(backupPayload, null, 2);
        displayToast('डेटाबेस बैकअप सफलतापूर्वक तैयार हो गया!', 'success');
        return jsonString;
      });
    }).catch(function (error) {
      console.error('[Vetcare DB] Export dump failed:', error);
      displayToast('डेटाबेस बैकअप निर्यात विफल।', 'error');
      throw error;
    });
  };

  DB.importDatabaseDump = function (jsonPayloadOrString) {
    return ensureDb().then(function (db) {
      var payload;
      if (typeof jsonPayloadOrString === 'string') {
        try {
          payload = JSON.parse(jsonPayloadOrString);
        } catch (e) {
          var parseErrMsg = 'बैकअप फ़ाइल प्रारूप अमान्य है। JSON पार्सिंग विफल।';
          displayToast(parseErrMsg, 'error');
          return Promise.reject(new Error(parseErrMsg));
        }
      } else if (typeof jsonPayloadOrString === 'object' && jsonPayloadOrString !== null) {
        payload = jsonPayloadOrString;
      } else {
        return Promise.reject(new Error('अमान्य बैकअप डेटा।'));
      }

      if (!payload.stores || typeof payload.stores !== 'object') {
        return Promise.reject(new Error('बैकअप पेलोड में स्टोर्स की जानकारी नहीं मिली।'));
      }

      // Step 1: Wipe existing records in all stores
      var clearPromises = STORE_NAMES.map(function (storeName) {
        return DB.clearStore(storeName);
      });

      return Promise.all(clearPromises).then(function () {
        // Step 2: Batch insert imported records
        var insertPromises = [];

        STORE_NAMES.forEach(function (storeName) {
          var storeRecords = payload.stores[storeName];
          if (Array.isArray(storeRecords) && storeRecords.length > 0) {
            var tx = db.transaction([storeName], 'readwrite');
            var store = tx.objectStore(storeName);

            storeRecords.forEach(function (rec) {
              insertPromises.push(
                new Promise(function (resInsert, rejInsert) {
                  var req = store.put(rec);
                  req.onsuccess = function () { resInsert(); };
                  req.onerror = function (err) { rejInsert(err); };
                })
              );
            });
          }
        });

        return Promise.all(insertPromises).then(function () {
          displayToast('डेटाबेस सफलतापूर्वक रीस्टोर कर लिया गया!', 'success', 4000);
          console.log('[Vetcare DB] Backup successfully restored.');

          if (typeof window.dispatchEvent === 'function') {
            window.dispatchEvent(new CustomEvent('vetcare:database-restored', {
              detail: { restoredAt: Date.now() }
            }));
          }

          return true;
        });
      });
    }).catch(function (error) {
      console.error('[Vetcare DB] Import failed:', error);
      displayToast('डेटाबेस रीस्टोर विफल: ' + error.message, 'error');
      throw error;
    });
  };

  // 5. STORAGE HEALTH & METRICS ENGINE
  DB.getStorageUsage = function () {
    return ensureDb().then(function () {
      var countPromises = STORE_NAMES.map(function (name) {
        return DB.count(name).then(function (cnt) {
          return { name: name, count: cnt };
        });
      });

      var estimatePromise = (navigator.storage && typeof navigator.storage.estimate === 'function')
        ? navigator.storage.estimate()
        : Promise.resolve({ usage: 0, quota: 0 });

      return Promise.all([Promise.all(countPromises), estimatePromise]).then(function (results) {
        var storeCounts = results[0];
        var estimate = results[1];

        var usedBytes = estimate.usage || 0;
        var totalBytes = estimate.quota || 0;
        var usedMb = (usedBytes / (1024 * 1024)).toFixed(2);
        var totalMb = (totalBytes / (1024 * 1024)).toFixed(2);
        var percent = totalBytes > 0 ? ((usedBytes / totalBytes) * 100).toFixed(2) : '0.00';

        var countsObj = {};
        storeCounts.forEach(function (item) {
          countsObj[item.name] = item.count;
        });

        return {
          usedMb: parseFloat(usedMb),
          totalMb: parseFloat(totalMb),
          percent: parseFloat(percent),
          recordCounts: countsObj,
          timestamp: Date.now()
        };
      });
    });
  };

  // 6. AUTOMATIC INITIALIZATION
  function bootstrapStorageDB() {
    DB.open().then(function () {
      console.log('[Vetcare DB] Storage Engine initialized and ready.');
    }).catch(function (err) {
      console.error('[Vetcare DB] Automatic initialization error:', err);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapStorageDB);
  } else {
    bootstrapStorageDB();
  }

})(window, document);
