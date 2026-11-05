// Vetcare AI OS - Geolocation Engine, Farm Emergency Dispatch & Haversine Distance Calculator (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var EARTH_RADIUS_KM = 6371;
  var RURAL_TRANSIT_SPEED_KMH = 35; // Average speed for rural roads / farm tracks
  var DISPATCH_PREP_BUFFER_MINS = 8; // Dispatch and vehicle loading buffer

  // Default Central Veterinary Dispensaries / Mobile Hospital Units
  var DEFAULT_VET_CENTERS = [
    {
      id: 'vet-center-01',
      name: 'केंद्रीय पशु चिकित्सालय (Central Veterinary Hospital)',
      doctorName: 'डॉ. राजेश कुमार (Senior V.O.)',
      phone: '+91 9826011111',
      lat: 22.7196,
      lng: 75.8577,
      address: 'तहसील चौक, मुख्य मार्ग',
      emergencyAvailable: true
    },
    {
      id: 'vet-center-02',
      name: 'मोबाइल पशु चिकित्सा इकाई (Mobile Vet Emergency Unit)',
      doctorName: 'डॉ. विक्रम सिंह (Emergency Specialist)',
      phone: '+91 9826022222',
      lat: 22.7533,
      lng: 75.8937,
      address: 'कृषि उपज मंडी गेट, ग्रामीण सेक्टर',
      emergencyAvailable: true
    },
    {
      id: 'vet-center-03',
      name: 'शासकीय पशु औषधालय (Govt. Veterinary Dispensary)',
      doctorName: 'डॉ. अनिता पाटीदार (A.H. Specialist)',
      phone: '+91 9826033333',
      lat: 22.6850,
      lng: 75.8320,
      address: 'ब्लॉक पशुपालन केंद्र, ग्राम संपर्क रोड',
      emergencyAvailable: true
    }
  ];

  var Geolocation = {
    currentCoords: {
      latitude: null,
      longitude: null,
      accuracy: null,
      timestamp: null
    },
    watchId: null,
    permissionStatus: 'prompt', // 'prompt' | 'granted' | 'denied' | 'unsupported'
    nearbyClinics: DEFAULT_VET_CENTERS,
    isLocating: false,
    lastCalculatedDispatches: []
  };

  window.VetcareApp.Geolocation = Geolocation;

  // Toast Notification Dispatcher
  function displayToast(message, type, duration) {
    var toastDuration = typeof duration === 'number' ? duration : 3500;
    if (typeof window.showAppToast === 'function') {
      window.showAppToast(message, type, toastDuration);
    } else if (window.VetcareApp.UI && typeof window.VetcareApp.UI.showToast === 'function') {
      window.VetcareApp.UI.showToast(message, type, toastDuration);
    } else {
      console.log('[Geo ' + (type || 'info').toUpperCase() + '] ' + message);
    }
  }

  // Inject UI Styles for Coordinate Badge & Telematics
  function injectGeoStyles() {
    if (document.getElementById('vetcare-geo-styles')) return;

    var style = document.createElement('style');
    style.id = 'vetcare-geo-styles';
    style.textContent =
      '#gps-location-badge {' +
      '  display: inline-flex;' +
      '  align-items: center;' +
      '  gap: 6px;' +
      '  padding: 4px 10px;' +
      '  border-radius: 9999px;' +
      '  font-size: 0.76rem;' +
      '  font-weight: 600;' +
      '  cursor: pointer;' +
      '  user-select: none;' +
      '  transition: all 0.25s ease-in-out;' +
      '  border: 1px solid #cbd5e1;' +
      '  background-color: #f8fafc;' +
      '  color: #334155;' +
      '}' +
      '#gps-location-badge:hover {' +
      '  background-color: #f1f5f9;' +
      '  border-color: #94a3b8;' +
      '}' +
      '.vetcare-geo-active {' +
      '  background-color: #ecfdf5 !important;' +
      '  color: #065f46 !important;' +
      '  border-color: #a7f3d0 !important;' +
      '}' +
      '.vetcare-geo-denied {' +
      '  background-color: #fef2f2 !important;' +
      '  color: #991b1b !important;' +
      '  border-color: #fecaca !important;' +
      '}' +
      '.vetcare-geo-locating {' +
      '  background-color: #eff6ff !important;' +
      '  color: #1e40af !important;' +
      '  border-color: #bfdbfe !important;' +
      '}';

    document.head.appendChild(style);
  }

  // 2. BROWSER GEOLOCATION API INTEGRATION
  Geolocation.getCurrentPosition = function (options) {
    if (!('geolocation' in navigator)) {
      var errUnsupported = 'इस डिवाइस या ब्राउज़र में GPS / Geolocation समर्थित नहीं है।';
      Geolocation.permissionStatus = 'unsupported';
      displayToast(errUnsupported, 'error');
      Geolocation.updateUIBadge();
      return Promise.reject(new Error(errUnsupported));
    }

    Geolocation.isLocating = true;
    Geolocation.updateUIBadge();

    var defaultOpts = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 60000 // 1 minute cached position acceptance
    };

    var posOptions = Object.assign({}, defaultOpts, options);

    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          var coords = pos.coords;
          Geolocation.currentCoords = {
            latitude: parseFloat(coords.latitude.toFixed(6)),
            longitude: parseFloat(coords.longitude.toFixed(6)),
            accuracy: Math.round(coords.accuracy),
            timestamp: pos.timestamp || Date.now()
          };

          Geolocation.permissionStatus = 'granted';
          Geolocation.isLocating = false;
          Geolocation.updateUIBadge();

          console.log('[Vetcare Geo] GPS locked:', Geolocation.currentCoords);

          if (typeof window.dispatchEvent === 'function') {
            window.dispatchEvent(new CustomEvent('vetcare:gps-updated', {
              detail: Geolocation.currentCoords
            }));
          }

          resolve(Geolocation.currentCoords);
        },
        function (error) {
          Geolocation.isLocating = false;
          var errorMsg = 'GPS स्थान प्राप्त करने में असमर्थ।';

          if (error.code === error.PERMISSION_DENIED) {
            Geolocation.permissionStatus = 'denied';
            errorMsg = 'GPS अनुमति अस्वीकृत। आपातकालीन प्रेषण हेतु स्थान अनुमति प्रदान करें।';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg = 'उपग्रह / नेटवर्क सिग्नल कमजोर है। स्थान अनुपलब्ध।';
          } else if (error.code === error.TIMEOUT) {
            errorMsg = 'GPS सिग्नल खोजने में समय समाप्त (Timeout) हुआ।';
          }

          Geolocation.updateUIBadge();
          displayToast(errorMsg, 'warning');
          console.warn('[Vetcare Geo] Acquisition error:', error.message);
          reject(new Error(errorMsg));
        },
        posOptions
      );
    });
  };

  Geolocation.watchLocation = function (callback) {
    if (!('geolocation' in navigator)) return null;

    Geolocation.stopWatching();

    Geolocation.watchId = navigator.geolocation.watchPosition(
      function (pos) {
        var coords = pos.coords;
        Geolocation.currentCoords = {
          latitude: parseFloat(coords.latitude.toFixed(6)),
          longitude: parseFloat(coords.longitude.toFixed(6)),
          accuracy: Math.round(coords.accuracy),
          timestamp: pos.timestamp || Date.now()
        };

        Geolocation.permissionStatus = 'granted';
        Geolocation.updateUIBadge();

        if (typeof callback === 'function') {
          callback(Geolocation.currentCoords);
        }
      },
      function (err) {
        console.warn('[Vetcare Geo] Watch error:', err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      }
    );

    return Geolocation.watchId;
  };

  Geolocation.stopWatching = function () {
    if (Geolocation.watchId !== null && 'geolocation' in navigator) {
      navigator.geolocation.clearWatch(Geolocation.watchId);
      Geolocation.watchId = null;
      console.log('[Vetcare Geo] Live location watch stopped.');
    }
  };

  // 3. HAVERSINE DISTANCE & EMERGENCY DISPATCH ENGINE
  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  Geolocation.calculateDistance = function (lat1, lon1, lat2, lon2) {
    var pLat1 = parseFloat(lat1);
    var pLon1 = parseFloat(lon1);
    var pLat2 = parseFloat(lat2);
    var pLon2 = parseFloat(lon2);

    if (isNaN(pLat1) || isNaN(pLon1) || isNaN(pLat2) || isNaN(pLon2)) {
      return 0;
    }

    var dLat = toRadians(pLat2 - pLat1);
    var dLon = toRadians(pLon2 - pLon1);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(pLat1)) * Math.cos(toRadians(pLat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distanceKm = EARTH_RADIUS_KM * c;

    return parseFloat(distanceKm.toFixed(2));
  };

  Geolocation.findNearestClinic = function (doctorCoordsList, originCoords) {
    var clinicList = Array.isArray(doctorCoordsList) && doctorCoordsList.length > 0
      ? doctorCoordsList
      : Geolocation.nearbyClinics;

    var origin = originCoords || Geolocation.currentCoords;

    if (!origin || origin.latitude === null || origin.longitude === null) {
      console.warn('[Vetcare Geo] Origin coordinates unavailable for dispatch.');
      return null;
    }

    var evaluated = clinicList.map(function (clinic) {
      var distKm = Geolocation.calculateDistance(
        origin.latitude,
        origin.longitude,
        clinic.lat,
        clinic.lng
      );

      // Rural transit ETA: (Distance / 35 km/h) * 60 minutes + 8 min prep
      var travelMinutes = Math.round((distKm / RURAL_TRANSIT_SPEED_KMH) * 60);
      var totalEtaMinutes = travelMinutes + DISPATCH_PREP_BUFFER_MINS;

      return Object.assign({}, clinic, {
        distanceKm: distKm,
        etaMinutes: totalEtaMinutes,
        navigationUrl: Geolocation.getNavigationUrl(clinic.lat, clinic.lng)
      });
    });

    evaluated.sort(function (a, b) {
      return a.distanceKm - b.distanceKm;
    });

    Geolocation.lastCalculatedDispatches = evaluated;
    return evaluated.length > 0 ? evaluated[0] : null;
  };

  // 4. CLINICAL CASE GEO-TAGGING & OUTBREAK MAPPING
  Geolocation.tagCaseWithGps = function (casePayload) {
    var payload = Object.assign({}, casePayload);
    var coords = Geolocation.currentCoords;

    if (coords && coords.latitude !== null && coords.longitude !== null) {
      payload.geo = {
        lat: coords.latitude,
        lng: coords.longitude,
        accuracy: coords.accuracy,
        geoTimestamp: coords.timestamp,
        mapsUrl: Geolocation.getNavigationUrl(coords.latitude, coords.longitude)
      };
      displayToast('केस रिकॉर्ड GPS निर्देशांकों के साथ जियो-टैग हो गया!', 'info', 2000);
      return Promise.resolve(payload);
    } else {
      // Try immediate lock before saving
      return Geolocation.getCurrentPosition().then(function (freshCoords) {
        payload.geo = {
          lat: freshCoords.latitude,
          lng: freshCoords.longitude,
          accuracy: freshCoords.accuracy,
          geoTimestamp: freshCoords.timestamp,
          mapsUrl: Geolocation.getNavigationUrl(freshCoords.latitude, freshCoords.longitude)
        };
        displayToast('केस रिकॉर्ड में ताज़ा GPS स्थान संलग्न किया गया।', 'info', 2000);
        return payload;
      }).catch(function () {
        // Safe fallback without breaking save pipeline
        payload.geo = null;
        return payload;
      });
    }
  };

  Geolocation.getNavigationUrl = function (destLat, destLng) {
    var dLat = parseFloat(destLat);
    var dLng = parseFloat(destLng);
    return 'https://www.google.com/maps/dir/?api=1&destination=' + dLat + ',' + dLng;
  };

  // 5. UI COORDINATE BADGE & STATUS SYNC
  Geolocation.updateUIBadge = function () {
    var badge = document.getElementById('gps-location-badge');
    if (!badge) return;

    badge.classList.remove('vetcare-geo-active', 'vetcare-geo-denied', 'vetcare-geo-locating');

    if (Geolocation.isLocating) {
      badge.classList.add('vetcare-geo-locating');
      badge.textContent = '📍 GPS खोज जारी है...';
      badge.setAttribute('title', 'उपग्रह से निर्देशांक प्राप्त किए जा रहे हैं');
      return;
    }

    if (Geolocation.permissionStatus === 'denied') {
      badge.classList.add('vetcare-geo-denied');
      badge.textContent = '📍 GPS बंद (अनुमति दें)';
      badge.setAttribute('title', 'स्थान अनुमति अस्वीकृत है। क्लिक कर अनुमति दें।');
      return;
    }

    if (Geolocation.currentCoords.latitude !== null && Geolocation.currentCoords.longitude !== null) {
      badge.classList.add('vetcare-geo-active');
      var accText = Geolocation.currentCoords.accuracy ? (' (±' + Geolocation.currentCoords.accuracy + 'm)') : '';
      badge.textContent = '📍 ' + Geolocation.currentCoords.latitude + ', ' + Geolocation.currentCoords.longitude + accText;
      badge.setAttribute('title', 'जीपीएस सक्रिय | सटीकता: ' + Geolocation.currentCoords.accuracy + ' मीटर | पुनः ताज़ा करने हेतु क्लिक करें');
    } else {
      badge.textContent = '📍 जीपीएस प्राप्त करें';
      badge.setAttribute('title', 'क्लिक करके वर्तमान खेत/पशुपालक का स्थान दर्ज करें');
    }
  };

  // 6. AUTOMATIC LIFECYCLE INITIALIZATION
  function bootstrapGeolocation() {
    injectGeoStyles();

    // Verify permission state if Permissions API supported
    if (navigator.permissions && typeof navigator.permissions.query === 'function') {
      navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
        Geolocation.permissionStatus = result.state; // 'granted', 'prompt', 'denied'
        Geolocation.updateUIBadge();

        if (result.state === 'granted') {
          // Passive acquisition if pre-authorized
          Geolocation.getCurrentPosition().catch(function () {});
        }

        result.onchange = function () {
          Geolocation.permissionStatus = this.state;
          Geolocation.updateUIBadge();
        };
      }).catch(function () {
        Geolocation.updateUIBadge();
      });
    } else {
      Geolocation.updateUIBadge();
    }

    // Delegated click listeners
    document.addEventListener('click', function (e) {
      // 1. Badge Refresh Click
      var badge = e.target.closest ? e.target.closest('#gps-location-badge') : null;
      if (badge) {
        e.preventDefault();
        displayToast('GPS स्थान रिफ्रेश किया जा रहा है...', 'info', 1500);
        Geolocation.getCurrentPosition().catch(function () {});
        return;
      }

      // 2. Explicit Trigger [data-get-gps]
      var gpsTrigger = e.target.closest ? e.target.closest('[data-get-gps]') : null;
      if (gpsTrigger) {
        e.preventDefault();
        var targetLatId = gpsTrigger.getAttribute('data-target-lat');
        var targetLngId = gpsTrigger.getAttribute('data-target-lng');

        Geolocation.getCurrentPosition().then(function (coords) {
          if (targetLatId) {
            var latInput = document.getElementById(targetLatId);
            if (latInput) latInput.value = coords.latitude;
          }
          if (targetLngId) {
            var lngInput = document.getElementById(targetLngId);
            if (lngInput) lngInput.value = coords.longitude;
          }
          displayToast('खेत का स्थान सफलतापूर्वक दर्ज किया गया (' + coords.latitude + ', ' + coords.longitude + ')', 'success');
        }).catch(function (err) {
          console.warn('[Vetcare Geo] Trigger failed:', err.message);
        });
        return;
      }

      // 3. Navigation Link Trigger [data-open-maps]
      var mapBtn = e.target.closest ? e.target.closest('[data-open-maps]') : null;
      if (mapBtn) {
        e.preventDefault();
        var destLat = mapBtn.getAttribute('data-dest-lat');
        var destLng = mapBtn.getAttribute('data-dest-lng');
        if (destLat && destLng) {
          var url = Geolocation.getNavigationUrl(destLat, destLng);
          window.open(url, '_blank', 'noopener,noreferrer');
        } else {
          displayToast('गंतव्य निर्देशांक उपलब्ध नहीं हैं।', 'warning');
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapGeolocation);
  } else {
    bootstrapGeolocation();
  }

})(window, document);
