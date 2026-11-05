// Vetcare AI OS - Camera Uploader, Client-Side Image Compression & Clinical Vision Capture (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var MAX_FILE_SIZE_BYTES = 500 * 1024; // 500 KB strict limit for browser/IndexedDB performance
  var DEFAULT_MAX_WIDTH = 1280;
  var DEFAULT_MAX_HEIGHT = 1280;
  var DEFAULT_QUALITY = 0.75;
  var MAX_PHOTOS_PER_CASE = 4;

  var Camera = {
    activeStream: null,
    facingMode: 'environment', // 'environment' (rear) or 'user' (front)
    capturedImages: [], // Array of { id, dataUrl, blob, size, timestamp, target }
    compressionConfig: {
      maxWidth: DEFAULT_MAX_WIDTH,
      maxHeight: DEFAULT_MAX_HEIGHT,
      quality: DEFAULT_QUALITY,
      maxBytes: MAX_FILE_SIZE_BYTES
    },
    activeTarget: 'general', // 'general' | 'wound' | 'skin' | 'eye' | 'teeth'
    activeCallback: null
  };

  window.VetcareApp.Camera = Camera;

  // Utility: Generate Unique IDs
  function generateUID() {
    return 'vetcare_img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  }

  // Toast Notification Dispatcher
  function displayToast(message, type) {
    if (typeof window.showAppToast === 'function') {
      window.showAppToast(message, type);
    } else if (window.VetcareApp.UI && typeof window.VetcareApp.UI.showToast === 'function') {
      window.VetcareApp.UI.showToast(message, type);
    } else {
      console.log('[Camera ' + (type || 'info').toUpperCase() + '] ' + message);
    }
  }

  // Utility: Convert Data URL to Blob
  function dataURLToBlob(dataUrl) {
    var parts = dataUrl.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  // Inject UI Styles for Viewfinder, Crosshairs & Thumbnails
  function injectCameraStyles() {
    if (document.getElementById('vetcare-camera-styles')) return;

    var style = document.createElement('style');
    style.id = 'vetcare-camera-styles';
    style.textContent =
      '@keyframes vetcare-viewfinder-scan {' +
      '  0% { transform: translateY(0); opacity: 0.8; }' +
      '  50% { transform: translateY(220px); opacity: 0.3; }' +
      '  100% { transform: translateY(0); opacity: 0.8; }' +
      '}' +
      '.vetcare-scanner-line {' +
      '  position: absolute;' +
      '  left: 10%;' +
      '  right: 10%;' +
      '  top: 15%;' +
      '  height: 2px;' +
      '  background: linear-gradient(90deg, transparent, #22c55e, transparent);' +
      '  animation: vetcare-viewfinder-scan 3s infinite ease-in-out;' +
      '  pointer-events: none;' +
      '}' +
      '.vetcare-reticle-corner {' +
      '  position: absolute;' +
      '  width: 24px;' +
      '  height: 24px;' +
      '  border-color: #22c55e;' +
      '  border-style: solid;' +
      '  pointer-events: none;' +
      '}' +
      '.vetcare-preview-card {' +
      '  position: relative;' +
      '  border-radius: 10px;' +
      '  overflow: hidden;' +
      '  border: 1px solid #cbd5e1;' +
      '  background: #f8fafc;' +
      '  aspect-ratio: 1 / 1;' +
      '  display: flex;' +
      '  align-items: center;' +
      '  justify-content: center;' +
      '}' +
      '.vetcare-preview-card img {' +
      '  width: 100%;' +
      '  height: 100%;' +
      '  object-fit: cover;' +
      '}' +
      '.vetcare-preview-delete {' +
      '  position: absolute;' +
      '  top: 6px;' +
      '  right: 6px;' +
      '  background: rgba(220, 38, 38, 0.9);' +
      '  color: #ffffff;' +
      '  border: none;' +
      '  width: 24px;' +
      '  height: 24px;' +
      '  border-radius: 50%;' +
      '  cursor: pointer;' +
      '  display: flex;' +
      '  align-items: center;' +
      '  justify-content: center;' +
      '  font-size: 14px;' +
      '  line-height: 1;' +
      '}' +
      '.vetcare-preview-zoom {' +
      '  position: absolute;' +
      '  bottom: 6px;' +
      '  right: 6px;' +
      '  background: rgba(15, 23, 42, 0.75);' +
      '  color: #ffffff;' +
      '  border: none;' +
      '  width: 24px;' +
      '  height: 24px;' +
      '  border-radius: 50%;' +
      '  cursor: pointer;' +
      '  display: flex;' +
      '  align-items: center;' +
      '  justify-content: center;' +
      '  font-size: 11px;' +
      '}' +
      '.vetcare-preview-tag {' +
      '  position: absolute;' +
      '  bottom: 6px;' +
      '  left: 6px;' +
      '  background: rgba(15, 23, 42, 0.7);' +
      '  color: #ffffff;' +
      '  font-size: 10px;' +
      '  padding: 2px 6px;' +
      '  border-radius: 4px;' +
      '  text-transform: capitalize;' +
      '}';

    document.head.appendChild(style);
  }

  // 2. REAR ENVIRONMENT CAMERA STREAM & CAPTURE
  Camera.startCamera = function (videoElementOrId, facingMode) {
    var videoEl = typeof videoElementOrId === 'string'
      ? document.getElementById(videoElementOrId)
      : videoElementOrId;

    if (!videoEl) {
      displayToast('वीडियो डिस्प्ले घटक उपलब्ध नहीं है।', 'error');
      return Promise.reject(new Error('Video element not found'));
    }

    Camera.facingMode = facingMode || Camera.facingMode || 'environment';

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      var unsuppMsg = 'इस ब्राउज़र में लाइव कैमरा समर्थित नहीं है। फ़ाइल अपलोड का उपयोग करें।';
      displayToast(unsuppMsg, 'error');
      return Promise.reject(new Error(unsuppMsg));
    }

    // Stop any existing stream
    Camera.stopCamera();

    var constraints = {
      audio: false,
      video: {
        facingMode: { ideal: Camera.facingMode },
        width: { ideal: DEFAULT_MAX_WIDTH },
        height: { ideal: DEFAULT_MAX_HEIGHT }
      }
    };

    return navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        Camera.activeStream = stream;
        videoEl.srcObject = stream;
        videoEl.setAttribute('playsinline', 'true');
        videoEl.setAttribute('autoplay', 'true');
        videoEl.muted = true;
        return videoEl.play().then(function () {
          return stream;
        });
      })
      .catch(function (error) {
        var errDescription = 'कैमरा शुरू करने में असमर्थ।';
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          errDescription = 'कैमरा अनुमति अस्वीकार कर दी गई। कृपया सेटिंग्स से अनुमति दें।';
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          errDescription = 'डिवाइस पर कोई कैमरा नहीं मिला। फ़ाइल अपलोड का उपयोग करें।';
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
          errDescription = 'कैमरा किसी अन्य ऐप द्वारा उपयोग में है।';
        }

        displayToast(errDescription, 'error');
        console.error('[Vetcare Camera] Stream error:', error);
        throw new Error(errDescription);
      });
  };

  Camera.stopCamera = function () {
    if (Camera.activeStream) {
      var tracks = Camera.activeStream.getTracks();
      for (var i = 0; i < tracks.length; i++) {
        tracks[i].stop();
      }
      Camera.activeStream = null;
    }

    var video = document.getElementById('vetcare-viewfinder-video');
    if (video) {
      video.srcObject = null;
    }
  };

  Camera.captureFrame = function (videoElementOrId, maxWidth, quality) {
    var video = typeof videoElementOrId === 'string'
      ? document.getElementById(videoElementOrId)
      : videoElementOrId;

    if (!video || !video.videoWidth || !video.videoHeight) {
      displayToast('कैमरा फ्रेम तैयार नहीं है। कृपया प्रतीक्षा करें।', 'warning');
      return null;
    }

    var targetMaxWidth = maxWidth || Camera.compressionConfig.maxWidth;
    var targetQuality = quality || Camera.compressionConfig.quality;

    var originalWidth = video.videoWidth;
    var originalHeight = video.videoHeight;

    var width = originalWidth;
    var height = originalHeight;

    if (width > targetMaxWidth) {
      height = Math.round((height * targetMaxWidth) / width);
      width = targetMaxWidth;
    }

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');

    // Handle horizontal flip if front-facing selfie camera
    if (Camera.facingMode === 'user') {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, width, height);

    var dataUrl = canvas.toDataURL('image/jpeg', targetQuality);

    // Guard 500KB maximum size
    while (dataUrl.length * 0.75 > MAX_FILE_SIZE_BYTES && targetQuality > 0.35) {
      targetQuality -= 0.12;
      dataUrl = canvas.toDataURL('image/jpeg', targetQuality);
    }

    var blob = dataURLToBlob(dataUrl);

    return {
      id: generateUID(),
      dataUrl: dataUrl,
      blob: blob,
      width: width,
      height: height,
      size: blob.size,
      timestamp: Date.now(),
      target: Camera.activeTarget
    };
  };

  // 3. FILE INPUT FALLBACK & AUTO-COMPRESSION ENGINE
  Camera.compressImageFile = function (file, maxWidth, maxHeight, quality) {
    return new Promise(function (resolve, reject) {
      if (!file || !file.type.match(/image.*/)) {
        return reject(new Error('अमान्य फ़ाइल प्रकार। केवल चित्र (Image) समर्थित हैं।'));
      }

      var targetMaxWidth = maxWidth || Camera.compressionConfig.maxWidth;
      var targetMaxHeight = maxHeight || Camera.compressionConfig.maxHeight;
      var initialQuality = quality || Camera.compressionConfig.quality;
      var originalSize = file.size;

      var reader = new FileReader();
      reader.onerror = function () {
        reject(new Error('फ़ाइल लोड करने में त्रुटि।'));
      };

      reader.onload = function (readerEvent) {
        var img = new Image();
        img.onerror = function () {
          reject(new Error('छवि को प्रोसेस करने में असमर्थ।'));
        };

        img.onload = function () {
          var width = img.width;
          var height = img.height;

          // Maintain clinical aspect ratio
          if (width > height) {
            if (width > targetMaxWidth) {
              height = Math.round((height * targetMaxWidth) / width);
              width = targetMaxWidth;
            }
          } else {
            if (height > targetMaxHeight) {
              width = Math.round((width * targetMaxHeight) / height);
              height = targetMaxHeight;
            }
          }

          var canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          var currentQuality = initialQuality;
          var dataUrl = canvas.toDataURL('image/jpeg', currentQuality);

          // Progressive reduction loop to enforce < 500 KB limit
          var estimatedBytes = dataUrl.length * 0.75;
          while (estimatedBytes > MAX_FILE_SIZE_BYTES && currentQuality > 0.25) {
            currentQuality -= 0.12;
            dataUrl = canvas.toDataURL('image/jpeg', currentQuality);
            estimatedBytes = dataUrl.length * 0.75;
          }

          var blob = dataURLToBlob(dataUrl);
          var compressedSize = blob.size;
          var ratio = ((1 - (compressedSize / originalSize)) * 100).toFixed(1);

          resolve({
            id: generateUID(),
            dataUrl: dataUrl,
            blob: blob,
            originalSize: originalSize,
            compressedSize: compressedSize,
            compressionRatio: parseFloat(ratio),
            width: width,
            height: height,
            timestamp: Date.now(),
            target: Camera.activeTarget
          });
        };

        img.src = readerEvent.target.result;
      };

      reader.readAsDataURL(file);
    });
  };

  // 4. CLINICAL PHOTO PREVIEW & MANAGEMENT UI
  Camera.renderPreview = function (containerElementOrId, imageRecord, onRemoveCallback) {
    var container = typeof containerElementOrId === 'string'
      ? document.getElementById(containerElementOrId)
      : containerElementOrId;

    if (!container) return;

    var card = document.createElement('div');
    card.className = 'vetcare-preview-card';
    card.id = 'preview-' + imageRecord.id;

    var img = document.createElement('img');
    img.src = imageRecord.dataUrl;
    img.alt = 'Clinical capture (' + (imageRecord.target || 'general') + ')';

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'vetcare-preview-delete';
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('title', 'हटाएं (Remove)');
    deleteBtn.innerHTML = '&times;';

    var zoomBtn = document.createElement('button');
    zoomBtn.className = 'vetcare-preview-zoom';
    zoomBtn.setAttribute('type', 'button');
    zoomBtn.setAttribute('title', 'बड़ा देखें (Zoom)');
    zoomBtn.innerHTML = '&#128269;';

    var tag = document.createElement('span');
    tag.className = 'vetcare-preview-tag';
    tag.textContent = imageRecord.target || 'clinical';

    deleteBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      card.remove();

      // Remove from memory
      Camera.capturedImages = Camera.capturedImages.filter(function (item) {
        return item.id !== imageRecord.id;
      });

      if (typeof onRemoveCallback === 'function') {
        onRemoveCallback(imageRecord.id);
      }
    });

    zoomBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      Camera.openLightbox(imageRecord.dataUrl, imageRecord.target);
    });

    card.appendChild(img);
    card.appendChild(deleteBtn);
    card.appendChild(zoomBtn);
    card.appendChild(tag);
    container.appendChild(card);
  };

  Camera.openLightbox = function (imageDataUrl, title) {
    var existingModal = document.getElementById('vetcare-lightbox-modal');
    if (existingModal) existingModal.remove();

    var lightbox = document.createElement('div');
    lightbox.id = 'vetcare-lightbox-modal';
    lightbox.setAttribute(
      'style',
      'position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 1000002; display: flex; ' +
      'flex-direction: column; align-items: center; justify-content: center; padding: 20px;'
    );

    lightbox.innerHTML =
      '<div style="width: 100%; max-width: 900px; display: flex; justify-content: space-between; align-items: center; color: #ffffff; margin-bottom: 12px;">' +
        '<h4 style="margin: 0; font-size: 1rem; text-transform: capitalize;">नैदानिक फोटो अवलोकन (' + (title || 'Clinical') + ')</h4>' +
        '<button id="btn-close-lightbox" style="background: transparent; border: none; color: #ffffff; font-size: 2rem; cursor: pointer; line-height: 1;">&times;</button>' +
      '</div>' +
      '<div style="max-width: 900px; max-height: 80vh; overflow: hidden; display: flex; align-items: center; justify-content: center;">' +
        '<img src="' + imageDataUrl + '" style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 8px; border: 1px solid #334155;" />' +
      '</div>';

    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.id === 'btn-close-lightbox') {
        lightbox.remove();
      }
    });
  };

  // 5. IN-APP VIEWFINDER MODAL ENGINE
  function ensureCameraModal() {
    var modal = document.getElementById('vetcare-camera-modal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'vetcare-camera-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute(
      'style',
      'display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.95); z-index: 1000001; ' +
      'flex-direction: column; align-items: center; justify-content: space-between; padding: 16px; font-family: system-ui, sans-serif;'
    );

    modal.innerHTML =
      '<div style="width: 100%; max-width: 600px; display: flex; align-items: center; justify-content: space-between; color: #ffffff; padding: 8px 4px;">' +
        '<div>' +
          '<h3 style="margin: 0; font-size: 1.1rem; font-weight: 600;">पशु नैदानिक विज़न कैमरा</h3>' +
          '<span id="vetcare-camera-target-label" style="font-size: 0.8rem; color: #94a3b8; text-transform: capitalize;">फोकस: General</span>' +
        '</div>' +
        '<div style="display: flex; gap: 8px;">' +
          '<button type="button" id="btn-switch-camera" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: #fff; padding: 8px 12px; border-radius: 8px; font-size: 0.85rem; cursor: pointer;">' +
            '🔄 कैमरा बदलें' +
          '</button>' +
          '<button type="button" id="btn-close-camera-modal" style="background: transparent; border: none; color: #fff; font-size: 1.8rem; cursor: pointer; line-height: 1;">&times;</button>' +
        '</div>' +
      '</div>' +

      '<div style="position: relative; width: 100%; max-width: 600px; height: 65vh; background: #000; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center;">' +
        '<video id="vetcare-viewfinder-video" autoplay playsinline muted style="width: 100%; height: 100%; object-fit: cover;"></video>' +
        '<div class="vetcare-scanner-line"></div>' +
        '<div class="vetcare-reticle-corner" style="top: 20px; left: 20px; border-top-width: 3px; border-left-width: 3px;"></div>' +
        '<div class="vetcare-reticle-corner" style="top: 20px; right: 20px; border-top-width: 3px; border-right-width: 3px;"></div>' +
        '<div class="vetcare-reticle-corner" style="bottom: 20px; left: 20px; border-bottom-width: 3px; border-left-width: 3px;"></div>' +
        '<div class="vetcare-reticle-corner" style="bottom: 20px; right: 20px; border-bottom-width: 3px; border-right-width: 3px;"></div>' +
      '</div>' +

      '<div style="width: 100%; max-width: 600px; display: flex; align-items: center; justify-content: space-around; padding: 16px 0;">' +
        '<button type="button" id="btn-camera-cancel" style="background: transparent; border: none; color: #cbd5e1; font-size: 0.95rem; cursor: pointer;">रद्द करें</button>' +
        '<button type="button" id="btn-capture-snapshot" style="width: 72px; height: 72px; border-radius: 50%; background: #ffffff; border: 4px solid #22c55e; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(34, 197, 94, 0.6);">' +
          '<div style="width: 54px; height: 54px; border-radius: 50%; background: #22c55e;"></div>' +
        '</button>' +
        '<div style="width: 50px;"></div>' + // Spacer for layout symmetry
      '</div>';

    document.body.appendChild(modal);

    // Bind In-Modal Buttons
    modal.querySelector('#btn-close-camera-modal').addEventListener('click', Camera.closeCameraModal);
    modal.querySelector('#btn-camera-cancel').addEventListener('click', Camera.closeCameraModal);

    modal.querySelector('#btn-switch-camera').addEventListener('click', function () {
      Camera.facingMode = Camera.facingMode === 'environment' ? 'user' : 'environment';
      Camera.startCamera('vetcare-viewfinder-video', Camera.facingMode);
    });

    modal.querySelector('#btn-capture-snapshot').addEventListener('click', function () {
      var photoRecord = Camera.captureFrame('vetcare-viewfinder-video');
      if (photoRecord) {
        Camera.capturedImages.push(photoRecord);
        displayToast('फोटो सफलतापूर्वक कैप्चर की गई!', 'success');

        if (typeof Camera.activeCallback === 'function') {
          Camera.activeCallback(photoRecord);
        }

        Camera.closeCameraModal();
      }
    });

    return modal;
  }

  Camera.openCameraModal = function (targetInputCallback, targetType) {
    if (Camera.capturedImages.length >= MAX_PHOTOS_PER_CASE) {
      displayToast('अधिकतम ' + MAX_PHOTOS_PER_CASE + ' नैदानिक फोटो ही संलग्न की जा सकती हैं।', 'warning');
      return;
    }

    Camera.activeCallback = targetInputCallback;
    Camera.activeTarget = targetType || 'general';

    var modal = ensureCameraModal();
    var targetLabel = modal.querySelector('#vetcare-camera-target-label');
    if (targetLabel) {
      targetLabel.textContent = 'फोकस: ' + Camera.activeTarget;
    }

    modal.style.display = 'flex';

    Camera.startCamera('vetcare-viewfinder-video', 'environment').catch(function () {
      Camera.closeCameraModal();
    });
  };

  Camera.closeCameraModal = function () {
    var modal = document.getElementById('vetcare-camera-modal');
    if (modal) {
      modal.style.display = 'none';
    }
    Camera.stopCamera();
    Camera.activeCallback = null;
  };

  Camera.getCapturedImages = function () {
    return Camera.capturedImages;
  };

  Camera.clearCapturedImages = function () {
    Camera.capturedImages = [];
  };

  // 6. EVENT BINDING & AUTOMATIC INITIALIZATION
  function bindDropZonesAndInputs() {
    // 1. File Upload Inputs [data-image-upload]
    document.addEventListener('change', function (e) {
      var target = e.target;
      if (target && target.matches && target.matches('[data-image-upload]')) {
        if (!target.files || target.files.length === 0) return;

        var targetFocus = target.getAttribute('data-target-type') || 'general';
        var previewContainerId = target.getAttribute('data-preview-container');

        var files = Array.prototype.slice.call(target.files);
        files.forEach(function (file) {
          if (Camera.capturedImages.length >= MAX_PHOTOS_PER_CASE) {
            displayToast('अधिकतम सीमा (' + MAX_PHOTOS_PER_CASE + ' फोटो) पूर्ण हो चुकी है।', 'warning');
            return;
          }

          Camera.activeTarget = targetFocus;
          Camera.compressImageFile(file).then(function (record) {
            Camera.capturedImages.push(record);
            if (previewContainerId) {
              Camera.renderPreview(previewContainerId, record);
            }
            displayToast('चित्र कंप्रेस व सुरक्षित कर लिया गया (' + (record.compressedSize / 1024).toFixed(0) + ' KB)', 'success');
          }).catch(function (err) {
            displayToast(err.message, 'error');
          });
        });

        // Reset input so same file can be re-selected if removed
        target.value = '';
      }
    });

    // 2. Camera Trigger Buttons [data-camera-trigger]
    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-camera-trigger]') : null;
      if (btn) {
        e.preventDefault();
        var targetType = btn.getAttribute('data-camera-target') || 'general';
        var previewContainerId = btn.getAttribute('data-preview-container');

        Camera.openCameraModal(function (imageRecord) {
          if (previewContainerId) {
            Camera.renderPreview(previewContainerId, imageRecord);
          }
        }, targetType);
      }
    });

    // 3. Drag and Drop Zones [data-drop-zone]
    var dropZones = document.querySelectorAll('[data-drop-zone]');
    dropZones.forEach(function (zone) {
      ['dragenter', 'dragover'].forEach(function (eventName) {
        zone.addEventListener(eventName, function (e) {
          e.preventDefault();
          e.stopPropagation();
          zone.classList.add('vetcare-drag-active');
        }, false);
      });

      ['dragleave', 'drop'].forEach(function (eventName) {
        zone.addEventListener(eventName, function (e) {
          e.preventDefault();
          e.stopPropagation();
          zone.classList.remove('vetcare-drag-active');
        }, false);
      });

      zone.addEventListener('drop', function (e) {
        var dt = e.dataTransfer;
        var files = dt.files;
        if (!files || files.length === 0) return;

        var targetFocus = zone.getAttribute('data-target-type') || 'general';
        var previewContainerId = zone.getAttribute('data-preview-container');

        Array.prototype.slice.call(files).forEach(function (file) {
          if (Camera.capturedImages.length >= MAX_PHOTOS_PER_CASE) {
            displayToast('अधिकतम ' + MAX_PHOTOS_PER_CASE + ' फोटो सीमा पार हो गई है।', 'warning');
            return;
          }

          Camera.activeTarget = targetFocus;
          Camera.compressImageFile(file).then(function (record) {
            Camera.capturedImages.push(record);
            if (previewContainerId) {
              Camera.renderPreview(previewContainerId, record);
            }
            displayToast('ड्रॉप किया गया चित्र कंप्रेस हो गया (' + (record.compressedSize / 1024).toFixed(0) + ' KB)', 'success');
          }).catch(function (err) {
            displayToast(err.message, 'error');
          });
        });
      }, false);
    });
  }

  function bootstrapCameraUploader() {
    injectCameraStyles();
    bindDropZonesAndInputs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapCameraUploader);
  } else {
    bootstrapCameraUploader();
  }

})(window, document);
