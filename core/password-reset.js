// Vetcare AI OS - In-App Free Password Reset & 15s OTP Verification Engine (2026 Production)

(function (window, document) {
  "use strict";

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  const PasswordReset = {
    STORAGE_KEYS: {
      ADMIN_PW_OVERRIDE: "VETCARE_ADMIN_PW_OVERRIDE",
      REGISTERED_USERS: "vetcare_registered_users",
      LAST_RESET_PHONE: "vetcare_last_reset_phone"
    },
    CONFIG: {
      OTP_VALIDITY_SECONDS: 15,
      ADMIN_MASTER_PHONE: "9991039297",
      MIN_PASSWORD_LENGTH: 6
    },
    state: {
      currentStep: 1, // 1: Phone Request, 2: OTP Verification, 3: Set New Password
      targetPhone: "",
      activeOtp: null,
      timerInterval: null,
      secondsRemaining: 15,
      isOtpVerified: false
    },
    selectors: {
      modal: "#otpResetModal",
      closeBtn: "#btnCloseOtpModal",
      triggerBtns: [
        "#btnTriggerQuickOtpReset",
        "#btnAdminModalOtpReset",
        "#btnRequestOtp",
        "#forgot-password-link",
        "[data-action='open-pw-reset']"
      ],
      displayCard: "#otpDisplayCard",
      otpText: "#liveGeneratedOtpText",
      countdownTimer: "#otpCountdownTimer",
      countdownBar: "#otpCountdownBar",
      requestOtpBtn: "#btnRequestNewOtp",
      verifyOtpInput: "#inputVerifyOtp",
      newPasswordInput: "#inputNewAdminPassword",
      commitResetBtn: "#btnCommitPasswordReset",
      verifyForm: "#otpVerifyForm"
    }
  };

  window.VetcareApp.PasswordReset = PasswordReset;

  // 2. HELPER UTILITIES: TOASTS & VALIDATION
  PasswordReset.notify = function (message, type) {
    if (typeof window.showAppToast === "function") {
      window.showAppToast(message, type || "info");
    } else if (window.VetcareApp.Theme && typeof window.VetcareApp.Theme.showToast === "function") {
      window.VetcareApp.Theme.showToast(message, type || "info");
    } else {
      console.log(`[PASSWORD RESET ${type ? type.toUpperCase() : "INFO"}]: ${message}`);
    }
  };

  PasswordReset.validatePhone = function (phone) {
    const sanitized = (phone || "").toString().trim().replace(/[\s\-+]/g, "");
    const cleanNumber = sanitized.startsWith("91") && sanitized.length === 12 ? sanitized.substring(2) : sanitized;
    const phoneRegex = /^[6-9]\d{9}$/;
    return {
      isValid: cleanNumber === PasswordReset.CONFIG.ADMIN_MASTER_PHONE || phoneRegex.test(cleanNumber),
      phone: cleanNumber
    };
  };

  PasswordReset.generateSecureOtp = function () {
    if (window.crypto && typeof window.crypto.getRandomValues === "function") {
      const buffer = new Uint32Array(1);
      window.crypto.getRandomValues(buffer);
      const code = (buffer[0] % 900000) + 100000;
      return code.toString();
    }
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // 3. IN-APP 15-SECOND SIMULATED OTP ENGINE
  PasswordReset.startOtpTimer = function () {
    PasswordReset.clearOtpTimer();

    PasswordReset.state.secondsRemaining = PasswordReset.CONFIG.OTP_VALIDITY_SECONDS;
    const timerDisplay = document.querySelector(PasswordReset.selectors.countdownTimer);
    const progressBar = document.querySelector(PasswordReset.selectors.countdownBar);
    const requestBtn = document.querySelector(PasswordReset.selectors.requestOtpBtn);

    if (timerDisplay) {
      timerDisplay.textContent = `${PasswordReset.state.secondsRemaining}s`;
      timerDisplay.style.color = "#f43f5e";
    }

    if (progressBar) {
      progressBar.style.transition = "none";
      progressBar.style.width = "100%";
      // Trigger reflow to restart transition
      void progressBar.offsetWidth;
      progressBar.style.transition = "width 1s linear";
    }

    if (requestBtn) {
      requestBtn.disabled = true;
      requestBtn.classList.add("opacity-50", "cursor-not-allowed");
    }

    PasswordReset.state.timerInterval = setInterval(function () {
      PasswordReset.state.secondsRemaining--;

      if (timerDisplay) {
        timerDisplay.textContent = `${PasswordReset.state.secondsRemaining}s`;
      }

      if (progressBar) {
        const percentage = Math.max(0, (PasswordReset.state.secondsRemaining / PasswordReset.CONFIG.OTP_VALIDITY_SECONDS) * 100);
        progressBar.style.width = `${percentage}%`;
      }

      if (PasswordReset.state.secondsRemaining <= 0) {
        PasswordReset.handleOtpExpiration();
      }
    }, 1000);
  };

  PasswordReset.clearOtpTimer = function () {
    if (PasswordReset.state.timerInterval) {
      clearInterval(PasswordReset.state.timerInterval);
      PasswordReset.state.timerInterval = null;
    }
  };

  PasswordReset.handleOtpExpiration = function () {
    PasswordReset.clearOtpTimer();
    PasswordReset.state.activeOtp = null;

    const timerDisplay = document.querySelector(PasswordReset.selectors.countdownTimer);
    const otpDisplay = document.querySelector(PasswordReset.selectors.otpText);
    const requestBtn = document.querySelector(PasswordReset.selectors.requestOtpBtn);
    const progressBar = document.querySelector(PasswordReset.selectors.countdownBar);

    if (timerDisplay) timerDisplay.textContent = "समाप्त (Expired)";
    if (otpDisplay) {
      otpDisplay.textContent = "EXPIRED";
      otpDisplay.classList.add("text-rose-500");
    }
    if (progressBar) progressBar.style.width = "0%";

    if (requestBtn) {
      requestBtn.disabled = false;
      requestBtn.classList.remove("opacity-50", "cursor-not-allowed");
      requestBtn.innerHTML = '<i class="fa-solid fa-rotate-right mr-1"></i> पुनः OTP भेजें (Resend)';
    }

    PasswordReset.notify("OTP की 15 सेकंड की वैधता समाप्त हो चुकी है। कृपया पुनः जनरेट करें।", "warning");
  };

  // 4. STEP-BY-STEP WORKFLOW
  PasswordReset.requestOtp = function (inputPhoneNumber) {
    const targetPhone = inputPhoneNumber || PasswordReset.state.targetPhone || PasswordReset.CONFIG.ADMIN_MASTER_PHONE;
    const validation = PasswordReset.validatePhone(targetPhone);

    if (!validation.isValid) {
      PasswordReset.notify("कृपया मान्य 10 अंकों का मोबाइल नंबर प्रविष्ट करें।", "warning");
      return false;
    }

    PasswordReset.state.targetPhone = validation.phone;
    PasswordReset.state.isOtpVerified = false;

    // Generate secure 6-digit OTP
    const generatedOtp = PasswordReset.generateSecureOtp();
    PasswordReset.state.activeOtp = generatedOtp;

    // Display OTP in prominent modal card
    const displayCard = document.querySelector(PasswordReset.selectors.displayCard);
    const otpText = document.querySelector(PasswordReset.selectors.otpText);

    if (displayCard) {
      displayCard.classList.remove("hidden");
    }

    if (otpText) {
      otpText.textContent = generatedOtp;
      otpText.classList.remove("text-rose-500");
      otpText.classList.add("text-amber-300");
    }

    // Prominent toast notification
    PasswordReset.notify(`सुरक्षित इन-ऐप OTP: ${generatedOtp} (वैधता: 15 सेकंड)`, "warning");

    // Start 15s Countdown
    PasswordReset.startOtpTimer();

    // Focus OTP input
    const otpInput = document.querySelector(PasswordReset.selectors.verifyOtpInput);
    if (otpInput) {
      otpInput.value = "";
      setTimeout(function () {
        otpInput.focus();
      }, 100);
    }

    return true;
  };

  PasswordReset.verifyOtp = function (enteredOtp) {
    const cleanOtp = (enteredOtp || "").toString().trim();

    if (!cleanOtp) {
      PasswordReset.notify("कृपया 6-अंकीय OTP कोड प्रविष्ट करें।", "warning");
      return false;
    }

    if (!PasswordReset.state.activeOtp || PasswordReset.state.secondsRemaining <= 0) {
      PasswordReset.notify("OTP समाप्त हो चुका है। कृपया 'पुनः OTP भेजें' पर क्लिक करें।", "error");
      return false;
    }

    if (cleanOtp !== PasswordReset.state.activeOtp) {
      PasswordReset.notify("अमान्य OTP कोड! दर्ज किया गया कोड सिस्टम रिकॉर्ड से मेल नहीं खाता।", "error");
      return false;
    }

    // Successful Verification
    PasswordReset.clearOtpTimer();
    PasswordReset.state.isOtpVerified = true;
    PasswordReset.state.activeOtp = null;

    const timerDisplay = document.querySelector(PasswordReset.selectors.countdownTimer);
    if (timerDisplay) {
      timerDisplay.textContent = "सत्यापित (Verified)";
      timerDisplay.style.color = "#10b981";
    }

    PasswordReset.notify("OTP सफलतापूर्वक सत्यापित हुआ! अब नया पासवर्ड निर्धारित करें।", "success");

    const newPwInput = document.querySelector(PasswordReset.selectors.newPasswordInput);
    if (newPwInput) {
      newPwInput.focus();
    }

    return true;
  };

  PasswordReset.commitNewPassword = function (newPassword, confirmPassword) {
    if (!PasswordReset.state.isOtpVerified) {
      const otpInput = document.querySelector(PasswordReset.selectors.verifyOtpInput);
      const otpVal = otpInput ? otpInput.value.trim() : "";
      const verified = PasswordReset.verifyOtp(otpVal);
      if (!verified) {
        return false;
      }
    }

    const cleanPassword = (newPassword || "").toString().trim();
    const cleanConfirm = (confirmPassword !== undefined ? confirmPassword : cleanPassword).toString().trim();

    if (cleanPassword.length < PasswordReset.CONFIG.MIN_PASSWORD_LENGTH) {
      PasswordReset.notify(`नया पासवर्ड कम से कम ${PasswordReset.CONFIG.MIN_PASSWORD_LENGTH} अक्षरों का होना अनिवार्य है।`, "warning");
      return false;
    }

    if (cleanPassword !== cleanConfirm) {
      PasswordReset.notify("पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते हैं।", "warning");
      return false;
    }

    // Persist new credentials
    const isMasterAdmin = PasswordReset.state.targetPhone === PasswordReset.CONFIG.ADMIN_MASTER_PHONE;

    if (isMasterAdmin) {
      try {
        localStorage.setItem(PasswordReset.STORAGE_KEYS.ADMIN_PW_OVERRIDE, cleanPassword);
        if (window.VetcareApp.Auth && window.VetcareApp.Auth.MASTER_CREDENTIALS) {
          window.VetcareApp.Auth.MASTER_CREDENTIALS.defaultPassword = cleanPassword;
        }
      } catch (e) {
        console.warn("Storage write failure for admin override:", e);
      }
    } else {
      try {
        let users = {};
        const rawUsers = localStorage.getItem(PasswordReset.STORAGE_KEYS.REGISTERED_USERS);
        if (rawUsers) {
          users = JSON.parse(rawUsers);
        }
        users[PasswordReset.state.targetPhone] = {
          password: cleanPassword,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem(PasswordReset.STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
      } catch (e) {
        console.warn("Storage write failure for registered user:", e);
      }
    }

    // Autofill into login fields if present on screen
    const adminPwInput = document.querySelector("#inputMasterPassword, #adminPasswordInput");
    const adminIdInput = document.querySelector("#inputMasterId, #adminIdInput");
    if (adminPwInput) adminPwInput.value = cleanPassword;
    if (adminIdInput) adminIdInput.value = PasswordReset.state.targetPhone;

    // Close reset modal and notify user
    PasswordReset.closeResetModal();
    PasswordReset.notify("पासवर्ड सफलतापूर्वक बदल दिया गया है! कृपया नए पासवर्ड से लॉगिन करें।", "success");

    return true;
  };

  // 5. MODAL CONTROLS & CLEANUP
  PasswordReset.openResetModal = function (prefillPhone) {
    const modal = document.querySelector(PasswordReset.selectors.modal);
    if (!modal) return;

    PasswordReset.clearOtpTimer();
    PasswordReset.state.currentStep = 1;
    PasswordReset.state.isOtpVerified = false;
    PasswordReset.state.activeOtp = null;
    PasswordReset.state.targetPhone = prefillPhone || PasswordReset.CONFIG.ADMIN_MASTER_PHONE;

    // Reset Form Fields
    const otpInput = document.querySelector(PasswordReset.selectors.verifyOtpInput);
    const pwInput = document.querySelector(PasswordReset.selectors.newPasswordInput);
    const displayCard = document.querySelector(PasswordReset.selectors.displayCard);
    const requestBtn = document.querySelector(PasswordReset.selectors.requestOtpBtn);

    if (otpInput) otpInput.value = "";
    if (pwInput) pwInput.value = "";
    if (displayCard) displayCard.classList.add("hidden");
    if (requestBtn) {
      requestBtn.disabled = false;
      requestBtn.classList.remove("opacity-50", "cursor-not-allowed");
      requestBtn.innerHTML = '<i class="fa-solid fa-rotate-right mr-1"></i> OTP भेजें (15s)';
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // Automatically trigger initial OTP dispatch
    PasswordReset.requestOtp(PasswordReset.state.targetPhone);
  };

  PasswordReset.closeResetModal = function () {
    const modal = document.querySelector(PasswordReset.selectors.modal);
    if (!modal) return;

    PasswordReset.clearOtpTimer();
    PasswordReset.state.activeOtp = null;
    PasswordReset.state.isOtpVerified = false;

    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  // 6. EVENT BINDINGS & LIFECYCLE INITIALIZER
  PasswordReset.bindEvents = function () {
    // Modal Open Triggers
    PasswordReset.selectors.triggerBtns.forEach(function (selector) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(function (btn) {
        if (btn.getAttribute("data-bound-reset") === "true") return;
        btn.setAttribute("data-bound-reset", "true");

        btn.addEventListener("click", function (evt) {
          evt.preventDefault();
          // Hide admin login modal if open
          const adminModal = document.querySelector("#adminAuthModal");
          if (adminModal) {
            adminModal.classList.add("hidden");
            adminModal.classList.remove("flex");
          }
          PasswordReset.openResetModal(PasswordReset.CONFIG.ADMIN_MASTER_PHONE);
        });
      });
    });

    // Close Button Trigger
    const closeBtn = document.querySelector(PasswordReset.selectors.closeBtn);
    if (closeBtn) {
      closeBtn.addEventListener("click", function (evt) {
        evt.preventDefault();
        PasswordReset.closeResetModal();
      });
    }

    // Dismiss on Backdrop Click
    const modal = document.querySelector(PasswordReset.selectors.modal);
    if (modal) {
      modal.addEventListener("click", function (evt) {
        if (evt.target === modal) {
          PasswordReset.closeResetModal();
        }
      });
    }

    // Dismiss on ESC Key
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape" || evt.keyCode === 27) {
        const activeModal = document.querySelector(PasswordReset.selectors.modal);
        if (activeModal && !activeModal.classList.contains("hidden")) {
          PasswordReset.closeResetModal();
        }
      }
    });

    // Request / Resend OTP Button
    const reqBtn = document.querySelector(PasswordReset.selectors.requestOtpBtn);
    if (reqBtn) {
      reqBtn.addEventListener("click", function (evt) {
        evt.preventDefault();
        PasswordReset.requestOtp(PasswordReset.state.targetPhone);
      });
    }

    // Commit Reset Button
    const commitBtn = document.querySelector(PasswordReset.selectors.commitResetBtn);
    if (commitBtn) {
      commitBtn.addEventListener("click", function (evt) {
        evt.preventDefault();
        const otpInput = document.querySelector(PasswordReset.selectors.verifyOtpInput);
        const pwInput = document.querySelector(PasswordReset.selectors.newPasswordInput);

        const enteredOtp = otpInput ? otpInput.value.trim() : "";
        const enteredPw = pwInput ? pwInput.value.trim() : "";

        if (!PasswordReset.state.isOtpVerified) {
          const isVerified = PasswordReset.verifyOtp(enteredOtp);
          if (!isVerified) return;
        }

        PasswordReset.commitNewPassword(enteredPw);
      });
    }

    // Auto-verify when 6 digits are typed into OTP field
    const otpInput = document.querySelector(PasswordReset.selectors.verifyOtpInput);
    if (otpInput) {
      otpInput.addEventListener("input", function () {
        const val = this.value.trim();
        if (val.length === 6) {
          PasswordReset.verifyOtp(val);
        }
      });
    }
  };

  PasswordReset.init = function () {
    PasswordReset.bindEvents();
  };

  // Self-execute on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      PasswordReset.init();
    });
  } else {
    PasswordReset.init();
  }

})(window, document);
