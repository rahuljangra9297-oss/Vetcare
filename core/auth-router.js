// Vetcare AI OS - Authentication Router, Role-Based Access & Credential Vault (2026 Production)

(function (window, document) {
  "use strict";

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  const Auth = {
    KEYS: {
      TOKEN: "vetcare_auth_token",
      ROLE: "vetcare_user_role",
      PROFILE: "vetcare_user_profile",
      ADMIN_PW_OVERRIDE: "VETCARE_ADMIN_PW_OVERRIDE"
    },
    MASTER_CREDENTIALS: {
      id: "9991039297",
      pin: "9297",
      defaultPassword: "Rahul@1812"
    },
    state: {
      currentUser: null,
      currentRole: "guest", // "doctor" | "farmer" | "admin" | "guest"
      token: null,
      isAuthenticated: false
    },
    selectors: {
      portals: {
        guest: "#landingView, #portalGuest, main > .grid",
        doctor: "#portalDoctor, #doctorView, #tab-biometrics",
        farmer: "#portalFarmer, #farmerView, #tab-records",
        admin: "#portalAdmin, #adminView, #tab-admin"
      },
      statusBadge: "#authStatusBadge",
      adminModal: "#adminAuthModal",
      navLinks: ".drawer-link, .tab-btn"
    }
  };

  window.VetcareApp.Auth = Auth;

  // 2. HELPER UTILITIES: TOKEN GENERATOR & CREDENTIAL LOOKUP
  Auth.generateSessionToken = function (prefix) {
    prefix = prefix || "VET";
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomBytes = new Uint8Array(8);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(randomBytes);
    } else {
      for (let i = 0; i < 8; i++) {
        randomBytes[i] = Math.floor(Math.random() * 256);
      }
    }
    const hex = Array.from(randomBytes)
      .map(function (b) {
        return b.toString(16).padStart(2, "0");
      })
      .join("")
      .toUpperCase();
    return `${prefix}-${timestamp}-${hex}`;
  };

  Auth.getMasterPassword = function () {
    try {
      const override = localStorage.getItem(Auth.KEYS.ADMIN_PW_OVERRIDE);
      if (override && override.trim().length >= 6) {
        return override.trim();
      }
    } catch (e) {
      console.warn("Storage access failed for admin override", e);
    }
    return Auth.MASTER_CREDENTIALS.defaultPassword;
  };

  Auth.notify = function (message, type) {
    if (typeof window.showAppToast === "function") {
      window.showAppToast(message, type || "info");
    } else if (window.VetcareApp.Theme && typeof window.VetcareApp.Theme.showToast === "function") {
      window.VetcareApp.Theme.showToast(message, type || "info");
    } else {
      console.log(`[Auth Notice - ${type}]: ${message}`);
    }
  };

  // 3. ROLE-BASED PORTAL ROUTER
  Auth.switchPortal = function (role) {
    role = (role || "guest").toLowerCase();
    const validRoles = ["doctor", "farmer", "admin", "guest"];
    if (validRoles.indexOf(role) === -1) {
      role = "guest";
    }

    Auth.state.currentRole = role;

    // Update Browser History without full refresh
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("portal", role);
      window.history.pushState({ portal: role }, `Vetcare AI OS - ${role.toUpperCase()}`, url.toString());
    } catch (err) {
      // History pushstate fallback for embedded sandbox environments
    }

    // Toggle Portal DOM Elements
    const portalDoctor = document.getElementById("portalDoctor") || document.getElementById("tab-biometrics");
    const portalFarmer = document.getElementById("portalFarmer") || document.getElementById("tab-records");
    const portalAdmin = document.getElementById("portalAdmin") || document.getElementById("tab-admin");
    const landingGrid = document.querySelector("main > .grid");

    const allContainers = [portalDoctor, portalFarmer, portalAdmin];

    // Hide all first if dedicated view wrappers exist
    allContainers.forEach(function (el) {
      if (el) {
        el.style.display = "none";
        el.classList.remove("active");
      }
    });

    if (role === "doctor") {
      if (landingGrid && portalDoctor) landingGrid.style.display = "none";
      if (portalDoctor) {
        portalDoctor.style.display = "block";
        portalDoctor.classList.add("active");
      }
      if (window.VetcareApp.Doctor && typeof window.VetcareApp.Doctor.initPortal === "function") {
        window.VetcareApp.Doctor.initPortal();
      }
    } else if (role === "farmer") {
      if (landingGrid && portalFarmer) landingGrid.style.display = "none";
      if (portalFarmer) {
        portalFarmer.style.display = "block";
        portalFarmer.classList.add("active");
      }
      if (window.VetcareApp.Farmer && typeof window.VetcareApp.Farmer.initHub === "function") {
        window.VetcareApp.Farmer.initHub();
      }
    } else if (role === "admin") {
      if (landingGrid && portalAdmin) landingGrid.style.display = "none";
      if (portalAdmin) {
        portalAdmin.style.display = "block";
        portalAdmin.classList.add("active");
      }
      if (window.VetcareApp.Admin && typeof window.VetcareApp.Admin.openDashboard === "function") {
        window.VetcareApp.Admin.openDashboard();
      }
    } else {
      // Guest: Show main selection hub
      if (landingGrid) landingGrid.style.display = "grid";
    }

    Auth.updateStatusBadge();
  };

  Auth.updateStatusBadge = function () {
    const badge = document.querySelector(Auth.selectors.statusBadge);
    if (!badge) return;

    if (!Auth.state.isAuthenticated) {
      badge.textContent = "SECURITY: GUEST ACCESS";
      badge.className = "badge badge-amber";
      badge.style.backgroundColor = "rgba(245, 158, 11, 0.2)";
      badge.style.color = "#f59e0b";
      badge.style.border = "1px solid #f59e0b";
      return;
    }

    const role = Auth.state.currentRole;
    if (role === "admin") {
      badge.textContent = "SECURITY: ROOT MASTER";
      badge.className = "badge badge-red";
      badge.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
      badge.style.color = "#ef4444";
      badge.style.border = "1px solid #ef4444";
    } else if (role === "doctor") {
      const name = (Auth.state.currentUser && Auth.state.currentUser.name) || "CLINICIAN";
      badge.textContent = `VET: DR. ${name.toUpperCase()}`;
      badge.className = "badge badge-green";
      badge.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
      badge.style.color = "#10b981";
      badge.style.border = "1px solid #10b981";
    } else if (role === "farmer") {
      const name = (Auth.state.currentUser && Auth.state.currentUser.name) || "FARMER";
      badge.textContent = `HUB: ${name.toUpperCase()}`;
      badge.className = "badge badge-cyan";
      badge.style.backgroundColor = "rgba(6, 182, 212, 0.2)";
      badge.style.color = "#06b6d4";
      badge.style.border = "1px solid #06b6d4";
    }
  };

  // 4. AUTHENTICATION HANDLERS
  Auth.loginAdmin = function (credentials) {
    credentials = credentials || {};
    const pin = (credentials.pin || "").toString().trim();
    const id = (credentials.id || "").toString().trim();
    const password = (credentials.password || "").toString().trim();

    const expectedPw = Auth.getMasterPassword();

    const isPinMatch = pin === Auth.MASTER_CREDENTIALS.pin;
    const isFullMatch = id === Auth.MASTER_CREDENTIALS.id && password === expectedPw;

    if (!isPinMatch && !isFullMatch) {
      Auth.notify("प्रमाणीकरण त्रुटि: अमान्य एडमिन क्रेडेंशियल्स", "error");
      return false;
    }

    const token = Auth.generateSessionToken("ADM");
    const userProfile = {
      id: Auth.MASTER_CREDENTIALS.id,
      name: "Master Administrator",
      role: "admin",
      permissions: ["READ_ALL", "WRITE_ALL", "DISPENSE_OVERRIDE", "BANK_CONFIG", "AUDIT"],
      loginTimestamp: new Date().toISOString()
    };

    Auth.state.currentUser = userProfile;
    Auth.state.currentRole = "admin";
    Auth.state.token = token;
    Auth.state.isAuthenticated = true;

    try {
      localStorage.setItem(Auth.KEYS.TOKEN, token);
      localStorage.setItem(Auth.KEYS.ROLE, "admin");
      localStorage.setItem(Auth.KEYS.PROFILE, JSON.stringify(userProfile));
    } catch (e) {
      console.warn("Storage write failure on admin login", e);
    }

    Auth.notify("मास्टर एडमिन प्रमाणीकरण सफल। वॉल्ट अनलॉक्ड।", "success");
    Auth.switchPortal("admin");
    return true;
  };

  Auth.loginDoctor = function (phone, password, meta) {
    phone = (phone || "").trim();
    password = (password || "").trim();
    meta = meta || {};

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      Auth.notify("अमान्य मोबाइल नंबर! 10 अंकों का मान्य भारतीय नंबर प्रविष्ट करें।", "warning");
      return false;
    }

    if (password.length < 6) {
      Auth.notify("पासवर्ड कम से कम 6 अक्षरों का होना आवश्यक है।", "warning");
      return false;
    }

    const token = Auth.generateSessionToken("DOC");
    const userProfile = {
      id: "VET-" + phone,
      phone: phone,
      name: meta.name || "Veterinarian",
      vciNumber: meta.vciNumber || "VCI-REG-VALID",
      role: "doctor",
      permissions: ["OPD_WRITE", "PRESCRIPTION_PRINT", "SHAEFFER_CALC", "AI_SECOND_OPINION"],
      loginTimestamp: new Date().toISOString()
    };

    Auth.state.currentUser = userProfile;
    Auth.state.currentRole = "doctor";
    Auth.state.token = token;
    Auth.state.isAuthenticated = true;

    try {
      localStorage.setItem(Auth.KEYS.TOKEN, token);
      localStorage.setItem(Auth.KEYS.ROLE, "doctor");
      localStorage.setItem(Auth.KEYS.PROFILE, JSON.stringify(userProfile));
    } catch (e) {
      console.warn("Storage write failure on doctor login", e);
    }

    Auth.notify(`स्वागतम् डॉ. ${userProfile.name}! क्लिनिकल ओपीडी सक्रिय।`, "success");
    Auth.switchPortal("doctor");
    return true;
  };

  Auth.loginFarmer = function (phone, password, meta) {
    phone = (phone || "").trim();
    password = (password || "").trim();
    meta = meta || {};

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      Auth.notify("अमान्य मोबाइल नंबर! 10 अंकों का फोन नंबर आवश्यक है।", "warning");
      return false;
    }

    if (password.length < 4) {
      Auth.notify("पासवर्ड कम से कम 4 अक्षरों का होना आवश्यक है।", "warning");
      return false;
    }

    const token = Auth.generateSessionToken("FRM");
    const userProfile = {
      id: "FRM-" + phone,
      phone: phone,
      name: meta.name || "प्रगतिशील पशुपालक",
      village: meta.village || "ग्रामीण क्षेत्र",
      cattleCount: meta.cattleCount || 4,
      role: "farmer",
      permissions: ["MILK_LEDGER_WRITE", "DESI_NUSKHE_READ", "BULLS_DIRECTORY_VIEW"],
      loginTimestamp: new Date().toISOString()
    };

    Auth.state.currentUser = userProfile;
    Auth.state.currentRole = "farmer";
    Auth.state.token = token;
    Auth.state.isAuthenticated = true;

    try {
      localStorage.setItem(Auth.KEYS.TOKEN, token);
      localStorage.setItem(Auth.KEYS.ROLE, "farmer");
      localStorage.setItem(Auth.KEYS.PROFILE, JSON.stringify(userProfile));
    } catch (e) {
      console.warn("Storage write failure on farmer login", e);
    }

    Auth.notify(`नमस्ते ${userProfile.name}! पशुपालक हब तैयार है।`, "success");
    Auth.switchPortal("farmer");
    return true;
  };

  // 5. SESSION RESTORE & LOGOUT
  Auth.restoreSession = function () {
    try {
      const token = localStorage.getItem(Auth.KEYS.TOKEN);
      const role = localStorage.getItem(Auth.KEYS.ROLE);
      const profileStr = localStorage.getItem(Auth.KEYS.PROFILE);

      if (token && role && profileStr) {
        const profile = JSON.parse(profileStr);
        Auth.state.currentUser = profile;
        Auth.state.currentRole = role;
        Auth.state.token = token;
        Auth.state.isAuthenticated = true;

        const urlParams = new URLSearchParams(window.location.search);
        const queryPortal = urlParams.get("portal");
        Auth.switchPortal(queryPortal || role);
        return true;
      }
    } catch (e) {
      console.warn("Session restoration error", e);
    }

    Auth.switchPortal("guest");
    return false;
  };

  Auth.logout = function () {
    Auth.state.currentUser = null;
    Auth.state.currentRole = "guest";
    Auth.state.token = null;
    Auth.state.isAuthenticated = false;

    try {
      localStorage.removeItem(Auth.KEYS.TOKEN);
      localStorage.removeItem(Auth.KEYS.ROLE);
      localStorage.removeItem(Auth.KEYS.PROFILE);
    } catch (e) {
      console.warn("Storage cleanup error on logout", e);
    }

    Auth.notify("सफलतापूर्वक लॉगआउट किया गया।", "info");
    Auth.switchPortal("guest");
  };

  // 6. PASSWORD MASKING & EYE-TOGGLE SYSTEM
  Auth.initPasswordToggles = function () {
    const toggleButtons = document.querySelectorAll(
      "#btnTogglePasswordVisibility, #btnToggleAdminPwVisibility, [data-action='toggle-password'], .pw-toggle-btn"
    );

    toggleButtons.forEach(function (btn) {
      if (btn.getAttribute("data-bound-pw-toggle")) return;
      btn.setAttribute("data-bound-pw-toggle", "true");

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Locate sibling or nearest password input
        let input = null;
        const parentWrapper = btn.closest(".pw-input-wrapper, .relative, div");
        if (parentWrapper) {
          input = parentWrapper.querySelector("input[type='password'], input[type='text']");
        }

        if (!input) {
          const targetId = btn.getAttribute("data-target");
          if (targetId) {
            input = document.getElementById(targetId);
          }
        }

        if (!input) return;

        const currentType = input.getAttribute("type");
        const newType = currentType === "password" ? "text" : "password";
        input.setAttribute("type", newType);

        // Update icon appearance
        const icon = btn.querySelector("i");
        if (icon) {
          if (newType === "text") {
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
          } else {
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
          }
        } else {
          btn.textContent = newType === "text" ? "🔒" : "👁️";
        }

        // Maintain cursor position & focus
        input.focus();
      });
    });
  };

  // 7. EVENT BINDINGS & LIFECYCLE INITIALIZER
  Auth.bindDOMEvents = function () {
    // Admin login modal submit
    const btnSubmitAdmin = document.getElementById("btnSubmitAdminLogin");
    if (btnSubmitAdmin) {
      btnSubmitAdmin.addEventListener("click", function (e) {
        e.preventDefault();
        const pinInput = document.getElementById("inputMasterPin");
        const idInput = document.getElementById("inputMasterId");
        const pwInput = document.getElementById("inputMasterPassword");

        const pin = pinInput ? pinInput.value : "";
        const id = idInput ? idInput.value : "";
        const password = pwInput ? pwInput.value : "";

        const success = Auth.loginAdmin({ pin: pin, id: id, password: password });
        if (success) {
          const adminModal = document.getElementById("adminAuthModal");
          if (adminModal) {
            adminModal.classList.add("hidden");
            adminModal.classList.remove("flex");
          }
        }
      });
    }

    // Portal launch triggers on Home cards
    const btnDoc = document.getElementById("btnLaunchDoctorPortal");
    if (btnDoc) {
      btnDoc.addEventListener("click", function () {
        Auth.switchPortal("doctor");
      });
    }

    const btnFarmer = document.getElementById("btnLaunchFarmerHub");
    if (btnFarmer) {
      btnFarmer.addEventListener("click", function () {
        Auth.switchPortal("farmer");
      });
    }

    // Generic Logout Buttons
    document.querySelectorAll("[data-action='logout'], #btnLogoutAdmin").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        Auth.logout();
      });
    });

    // Password Eye Toggles
    Auth.initPasswordToggles();
  };

  Auth.init = function () {
    Auth.bindDOMEvents();
    Auth.restoreSession();
  };

  // Self-execute on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      Auth.init();
    });
  } else {
    Auth.init();
  }

})(window, document);
