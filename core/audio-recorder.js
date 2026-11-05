// Vetcare AI OS - Voice Notes, Clinical Acoustic Capture & Audio Recorder Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var MAX_RECORDING_DURATION_SEC = 300; // 5 Minutes strict safeguard limit

  var AudioRecorder = {
    mediaRecorder: null,
    audioStream: null,
    audioChunks: [],
    recordingState: 'idle', // 'idle' | 'recording' | 'paused'
    durationSec: 0,
    timerIntervalId: null,
    maxDurationSec: MAX_RECORDING_DURATION_SEC,
    currentAudioBlob: null,
    currentAudioUrl: null,
    currentAudioBase64: null,
    supportedMimeType: '',
    activeCallback: null
  };

  window.VetcareApp.AudioRecorder = AudioRecorder;

  // Safe Toast Notification Dispatcher
  function displayToast(message, type, duration) {
    var toastDuration = typeof duration === 'number' ? duration : 3500;
    if (typeof window.showAppToast === 'function') {
      window.showAppToast(message, type, toastDuration);
    } else if (window.VetcareApp.UI && typeof window.VetcareApp.UI.showToast === 'function') {
      window.VetcareApp.UI.showToast(message, type, toastDuration);
    } else {
      console.log('[Audio ' + (type || 'info').toUpperCase() + '] ' + message);
    }
  }

  // Format Seconds to MM:SS
  function formatSeconds(totalSec) {
    var clamped = Math.max(0, Math.floor(totalSec));
    var mins = Math.floor(clamped / 60);
    var secs = clamped % 60;
    var mm = mins < 10 ? '0' + mins : mins;
    var ss = secs < 10 ? '0' + secs : secs;
    return mm + ':' + ss;
  }

  // Detect Supported WebRTC Audio MIME Types
  function resolveAudioMimeType() {
    if (!window.MediaRecorder || typeof window.MediaRecorder.isTypeSupported !== 'function') {
      return '';
    }

    var candidates = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/aac',
      'audio/ogg;codecs=opus',
      'audio/ogg'
    ];

    for (var i = 0; i < candidates.length; i++) {
      if (window.MediaRecorder.isTypeSupported(candidates[i])) {
        return candidates[i];
      }
    }

    return '';
  }

  // Utility: Convert Audio Blob to Base64
  function blobToBase64(blob) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }

  // Inject UI CSS for Pulse Indicators & Audio Player
  function injectAudioStyles() {
    if (document.getElementById('vetcare-audio-recorder-styles')) return;

    var style = document.createElement('style');
    style.id = 'vetcare-audio-recorder-styles';
    style.textContent =
      '@keyframes vetcare-mic-pulse {' +
      '  0% { transform: scale(1); opacity: 1; }' +
      '  50% { transform: scale(1.25); opacity: 0.4; }' +
      '  100% { transform: scale(1); opacity: 1; }' +
      '}' +
      '#recording-pulse-indicator.active {' +
      '  display: inline-block !important;' +
      '  width: 12px;' +
      '  height: 12px;' +
      '  border-radius: 50%;' +
      '  background-color: #ef4444;' +
      '  box-shadow: 0 0 10px #ef4444;' +
      '  animation: vetcare-mic-pulse 1.2s infinite ease-in-out;' +
      '  margin-right: 6px;' +
      '}' +
      '#recording-pulse-indicator {' +
      '  display: none;' +
      '}' +
      '.vetcare-audio-player-card {' +
      '  display: flex;' +
      '  align-items: center;' +
      '  gap: 12px;' +
      '  background: #f8fafc;' +
      '  border: 1px solid #cbd5e1;' +
      '  border-radius: 12px;' +
      '  padding: 10px 14px;' +
      '  margin-top: 8px;' +
      '  box-shadow: 0 1px 3px rgba(0,0,0,0.05);' +
      '  font-family: system-ui, -apple-system, sans-serif;' +
      '}' +
      '.vetcare-audio-play-btn {' +
      '  width: 38px;' +
      '  height: 38px;' +
      '  border-radius: 50%;' +
      '  background: #2563eb;' +
      '  color: #ffffff;' +
      '  border: none;' +
      '  display: flex;' +
      '  align-items: center;' +
      '  justify-content: center;' +
      '  cursor: pointer;' +
      '  flex-shrink: 0;' +
      '  transition: background 0.2s;' +
      '}' +
      '.vetcare-audio-play-btn:hover {' +
      '  background: #1d4ed8;' +
      '}' +
      '.vetcare-audio-track-info {' +
      '  display: flex;' +
      '  flex-direction: column;' +
      '  flex-grow: 1;' +
      '  gap: 4px;' +
      '}' +
      '.vetcare-audio-seek-slider {' +
      '  width: 100%;' +
      '  height: 4px;' +
      '  -webkit-appearance: none;' +
      '  background: #cbd5e1;' +
      '  border-radius: 2px;' +
      '  outline: none;' +
      '  cursor: pointer;' +
      '}' +
      '.vetcare-audio-seek-slider::-webkit-slider-thumb {' +
      '  -webkit-appearance: none;' +
      '  width: 12px;' +
      '  height: 12px;' +
      '  border-radius: 50%;' +
      '  background: #2563eb;' +
      '  cursor: pointer;' +
      '}' +
      '.vetcare-audio-time-row {' +
      '  display: flex;' +
      '  justify-content: space-between;' +
      '  font-size: 11px;' +
      '  color: #64748b;' +
      '  font-variant-numeric: tabular-nums;' +
      '}' +
      '.vetcare-audio-delete-btn {' +
      '  background: #fee2e2;' +
      '  color: #dc2626;' +
      '  border: 1px solid #fecaca;' +
      '  width: 32px;' +
      '  height: 32px;' +
      '  border-radius: 8px;' +
      '  cursor: pointer;' +
      '  display: flex;' +
      '  align-items: center;' +
      '  justify-content: center;' +
      '  font-size: 14px;' +
      '  flex-shrink: 0;' +
      '  transition: all 0.2s;' +
      '}' +
      '.vetcare-audio-delete-btn:hover {' +
      '  background: #fca5a5;' +
      '}';

    document.head.appendChild(style);
  }

  // 2. WEBRTC MEDIARECORDER ENGINE
  AudioRecorder.startRecording = function () {
    if (AudioRecorder.recordingState === 'recording') {
      displayToast('ऑडियो रिकॉर्डिंग पहले से चल रही है।', 'warning');
      return Promise.resolve(false);
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      var noSupportMsg = 'इस ब्राउज़र में ऑडियो रिकॉर्डिंग समर्थित नहीं है।';
      displayToast(noSupportMsg, 'error');
      return Promise.reject(new Error(noSupportMsg));
    }

    AudioRecorder.supportedMimeType = resolveAudioMimeType();

    return navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        AudioRecorder.audioStream = stream;
        AudioRecorder.audioChunks = [];
        AudioRecorder.durationSec = 0;

        var recorderOptions = AudioRecorder.supportedMimeType
          ? { mimeType: AudioRecorder.supportedMimeType }
          : {};

        try {
          AudioRecorder.mediaRecorder = new window.MediaRecorder(stream, recorderOptions);
        } catch (initErr) {
          console.warn('[Vetcare Audio] Fallback without mimeType option:', initErr);
          AudioRecorder.mediaRecorder = new window.MediaRecorder(stream);
        }

        AudioRecorder.mediaRecorder.ondataavailable = function (e) {
          if (e.data && e.data.size > 0) {
            AudioRecorder.audioChunks.push(e.data);
          }
        };

        AudioRecorder.mediaRecorder.onstart = function () {
          AudioRecorder.recordingState = 'recording';
          updateRecordingUI(true);
          startDurationTimer();
          displayToast('ऑडियो रिकॉर्डिंग शुरू (Voice Note Active)', 'info', 2000);

          if (typeof window.dispatchEvent === 'function') {
            window.dispatchEvent(new CustomEvent('vetcare:audio-recording-started', {
              detail: { timestamp: Date.now() }
            }));
          }
        };

        AudioRecorder.mediaRecorder.onerror = function (e) {
          console.error('[Vetcare Audio] Recorder Error:', e.error);
          displayToast('रिकॉर्डिंग के दौरान त्रुटि उत्पन्न हुई।', 'error');
          AudioRecorder.stopRecording();
        };

        // Start recorder with 250ms time-slice chunks
        AudioRecorder.mediaRecorder.start(250);
        return true;
      })
      .catch(function (error) {
        var errDesc = 'माइक्रोफोन सक्रिय करने में असमर्थ।';
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          errDesc = 'माइक्रोफोन की अनुमति अस्वीकार कर दी गई। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।';
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          errDesc = 'कोई माइक्रोफोन डिवाइस नहीं मिली।';
        }

        displayToast(errDesc, 'error');
        console.error('[Vetcare Audio] getUserMedia error:', error);
        throw new Error(errDesc);
      });
  };

  AudioRecorder.stopRecording = function () {
    return new Promise(function (resolve) {
      if (!AudioRecorder.mediaRecorder || AudioRecorder.recordingState === 'idle') {
        resolve(null);
        return;
      }

      var recorder = AudioRecorder.mediaRecorder;

      recorder.onstop = function () {
        stopDurationTimer();
        AudioRecorder.recordingState = 'idle';
        updateRecordingUI(false);

        // Stop all audio hardware tracks
        if (AudioRecorder.audioStream) {
          var tracks = AudioRecorder.audioStream.getTracks();
          for (var i = 0; i < tracks.length; i++) {
            tracks[i].stop();
          }
          AudioRecorder.audioStream = null;
        }

        var mime = AudioRecorder.supportedMimeType || 'audio/webm';
        var combinedBlob = new Blob(AudioRecorder.audioChunks, { type: mime });
        AudioRecorder.currentAudioBlob = combinedBlob;

        // Revoke previous URL to prevent memory leaks
        if (AudioRecorder.currentAudioUrl) {
          window.URL.revokeObjectURL(AudioRecorder.currentAudioUrl);
        }
        var objectUrl = window.URL.createObjectURL(combinedBlob);
        AudioRecorder.currentAudioUrl = objectUrl;

        blobToBase64(combinedBlob).then(function (base64String) {
          AudioRecorder.currentAudioBase64 = base64String;

          var resultRecord = {
            blob: combinedBlob,
            objectUrl: objectUrl,
            base64: base64String,
            durationSec: AudioRecorder.durationSec,
            mimeType: mime,
            sizeBytes: combinedBlob.size,
            timestamp: Date.now()
          };

          displayToast('ऑडियो रिकॉर्डिंग सुरक्षित कर ली गई (' + formatSeconds(AudioRecorder.durationSec) + ')', 'success');

          if (typeof AudioRecorder.activeCallback === 'function') {
            AudioRecorder.activeCallback(resultRecord);
          }

          if (typeof window.dispatchEvent === 'function') {
            window.dispatchEvent(new CustomEvent('vetcare:audio-recording-stopped', {
              detail: resultRecord
            }));
          }

          resolve(resultRecord);
        }).catch(function (convErr) {
          console.error('[Vetcare Audio] Base64 conversion failed:', convErr);
          resolve({
            blob: combinedBlob,
            objectUrl: objectUrl,
            base64: null,
            durationSec: AudioRecorder.durationSec,
            mimeType: mime,
            sizeBytes: combinedBlob.size,
            timestamp: Date.now()
          });
        });
      };

      if (recorder.state !== 'inactive') {
        recorder.stop();
      }
    });
  };

  AudioRecorder.pauseRecording = function () {
    if (AudioRecorder.mediaRecorder && AudioRecorder.recordingState === 'recording') {
      AudioRecorder.mediaRecorder.pause();
      AudioRecorder.recordingState = 'paused';
      clearInterval(AudioRecorder.timerIntervalId);
      AudioRecorder.timerIntervalId = null;

      var pulse = document.getElementById('recording-pulse-indicator');
      if (pulse) pulse.classList.remove('active');

      displayToast('रिकॉर्डिंग रोकी गई (Paused)', 'warning');
    }
  };

  AudioRecorder.resumeRecording = function () {
    if (AudioRecorder.mediaRecorder && AudioRecorder.recordingState === 'paused') {
      AudioRecorder.mediaRecorder.resume();
      AudioRecorder.recordingState = 'recording';
      startDurationTimer();

      var pulse = document.getElementById('recording-pulse-indicator');
      if (pulse) pulse.classList.add('active');

      displayToast('रिकॉर्डिंग पुनः चालू (Resumed)', 'info');
    }
  };

  // 3. LIVE RECORDING UI & DURATION TIMER
  function startDurationTimer() {
    if (AudioRecorder.timerIntervalId) {
      clearInterval(AudioRecorder.timerIntervalId);
    }

    AudioRecorder.timerIntervalId = setInterval(function () {
      AudioRecorder.durationSec += 1;

      var timerEl = document.getElementById('audio-recording-timer');
      if (timerEl) {
        timerEl.textContent = formatSeconds(AudioRecorder.durationSec);
      }

      // Safeguard Limit: 5 Minutes (300 Seconds)
      if (AudioRecorder.durationSec >= AudioRecorder.maxDurationSec) {
        displayToast('रिकॉर्डिंग समय सीमा (5 मिनट) समाप्त हो गई है। ऑडियो सुरक्षित कर लिया गया है।', 'warning', 4500);
        AudioRecorder.stopRecording();
      }
    }, 1000);
  }

  function stopDurationTimer() {
    if (AudioRecorder.timerIntervalId) {
      clearInterval(AudioRecorder.timerIntervalId);
      AudioRecorder.timerIntervalId = null;
    }
  }

  function updateRecordingUI(isRecording) {
    var pulse = document.getElementById('recording-pulse-indicator');
    var timer = document.getElementById('audio-recording-timer');
    var recordBtns = document.querySelectorAll('[data-audio-record-btn]');
    var stopBtns = document.querySelectorAll('[data-audio-stop-btn]');

    if (pulse) {
      if (isRecording) {
        pulse.classList.add('active');
      } else {
        pulse.classList.remove('active');
      }
    }

    if (timer && !isRecording) {
      timer.textContent = '00:00';
    }

    recordBtns.forEach(function (btn) {
      if (isRecording) {
        btn.classList.add('opacity-50', 'pointer-events-none');
        btn.setAttribute('disabled', 'true');
      } else {
        btn.classList.remove('opacity-50', 'pointer-events-none');
        btn.removeAttribute('disabled');
      }
    });

    stopBtns.forEach(function (btn) {
      if (isRecording) {
        btn.classList.remove('opacity-50', 'pointer-events-none');
        btn.removeAttribute('disabled');
      } else {
        btn.classList.add('opacity-50', 'pointer-events-none');
        btn.setAttribute('disabled', 'true');
      }
    });
  }

  // 4. IN-APP AUDIO PLAYER & PREVIEW COMPONENT
  AudioRecorder.renderAudioPlayer = function (containerElementOrId, audioSourceUrl, onDeleteCallback) {
    var container = typeof containerElementOrId === 'string'
      ? document.getElementById(containerElementOrId)
      : containerElementOrId;

    if (!container) return;

    var playerCard = document.createElement('div');
    playerCard.className = 'vetcare-audio-player-card';

    var audio = new Audio(audioSourceUrl);
    audio.preload = 'metadata';

    var playBtn = document.createElement('button');
    playBtn.className = 'vetcare-audio-play-btn';
    playBtn.setAttribute('type', 'button');
    playBtn.setAttribute('aria-label', 'Play/Pause Audio');
    playBtn.innerHTML = '&#9658;'; // Play Symbol

    var trackInfo = document.createElement('div');
    trackInfo.className = 'vetcare-audio-track-info';

    var slider = document.createElement('input');
    slider.className = 'vetcare-audio-seek-slider';
    slider.type = 'range';
    slider.min = '0';
    slider.max = '100';
    slider.value = '0';

    var timeRow = document.createElement('div');
    timeRow.className = 'vetcare-audio-time-row';

    var currentTimeSpan = document.createElement('span');
    currentTimeSpan.textContent = '00:00';

    var totalDurationSpan = document.createElement('span');
    totalDurationSpan.textContent = '00:00';

    timeRow.appendChild(currentTimeSpan);
    timeRow.appendChild(totalDurationSpan);
    trackInfo.appendChild(slider);
    trackInfo.appendChild(timeRow);

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'vetcare-audio-delete-btn';
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('title', 'ऑडियो हटाएं (Delete)');
    deleteBtn.innerHTML = '&times;';

    playerCard.appendChild(playBtn);
    playerCard.appendChild(trackInfo);
    playerCard.appendChild(deleteBtn);
    container.appendChild(playerCard);

    // Audio Event Bindings
    audio.addEventListener('loadedmetadata', function () {
      if (isFinite(audio.duration)) {
        totalDurationSpan.textContent = formatSeconds(audio.duration);
      }
    });

    audio.addEventListener('timeupdate', function () {
      if (isFinite(audio.duration) && audio.duration > 0) {
        var percentage = (audio.currentTime / audio.duration) * 100;
        slider.value = percentage.toString();
        currentTimeSpan.textContent = formatSeconds(audio.currentTime);
      }
    });

    audio.addEventListener('ended', function () {
      playBtn.innerHTML = '&#9658;';
      slider.value = '0';
      currentTimeSpan.textContent = '00:00';
    });

    playBtn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play().then(function () {
          playBtn.innerHTML = '&#10074;&#10074;'; // Pause Symbol
        }).catch(function (err) {
          console.error('[Vetcare Audio] Playback failed:', err);
        });
      } else {
        audio.pause();
        playBtn.innerHTML = '&#9658;';
      }
    });

    slider.addEventListener('input', function () {
      if (isFinite(audio.duration) && audio.duration > 0) {
        var seekTime = (parseFloat(slider.value) / 100) * audio.duration;
        audio.currentTime = seekTime;
      }
    });

    deleteBtn.addEventListener('click', function () {
      audio.pause();
      audio.src = '';
      playerCard.remove();

      if (typeof onDeleteCallback === 'function') {
        onDeleteCallback();
      }
    });
  };

  // 5. AUTOMATIC LIFECYCLE INITIALIZATION
  function bindAudioTriggers() {
    // Record Button Click Handlers
    document.addEventListener('click', function (e) {
      var recordBtn = e.target.closest ? e.target.closest('[data-audio-record-btn]') : null;
      if (recordBtn) {
        e.preventDefault();
        var targetContainerId = recordBtn.getAttribute('data-audio-preview-container');

        AudioRecorder.startRecording().then(function (started) {
          if (started && targetContainerId) {
            AudioRecorder.activeCallback = function (recordResult) {
              AudioRecorder.renderAudioPlayer(targetContainerId, recordResult.objectUrl, function () {
                AudioRecorder.currentAudioBlob = null;
                AudioRecorder.currentAudioBase64 = null;
                displayToast('ऑडियो रिकॉर्डिंग हटा दी गई।', 'info');
              });
            };
          }
        }).catch(function (err) {
          console.error('[Vetcare Audio] Start failed:', err);
        });
      }

      // Stop Button Click Handlers
      var stopBtn = e.target.closest ? e.target.closest('[data-audio-stop-btn]') : null;
      if (stopBtn) {
        e.preventDefault();
        AudioRecorder.stopRecording();
      }

      // Pause/Resume Button Click Handlers
      var pauseBtn = e.target.closest ? e.target.closest('[data-audio-pause-btn]') : null;
      if (pauseBtn) {
        e.preventDefault();
        if (AudioRecorder.recordingState === 'recording') {
          AudioRecorder.pauseRecording();
          pauseBtn.textContent = 'पुनः चालू करें (Resume)';
        } else if (AudioRecorder.recordingState === 'paused') {
          AudioRecorder.resumeRecording();
          pauseBtn.textContent = 'रोकें (Pause)';
        }
      }
    });
  }

  function bootstrapAudioRecorder() {
    injectAudioStyles();
    bindAudioTriggers();
    updateRecordingUI(false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapAudioRecorder);
  } else {
    bootstrapAudioRecorder();
  }

})(window, document);
