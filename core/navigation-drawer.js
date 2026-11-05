// Vetcare AI OS - Global Navigation Drawer, Portal Router & Anti-Kickout History Engine (2026 Production)

(function (window, document) {
  "use strict";

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  const NavigationDrawer = {
    state: {
      isOpen: false,
      activeRoute: "home",
      historyStatePushed: false,
      scrollPositionBeforeLock: 0
    },
    selectors: {
      drawer: "#sideDrawer",
      backdrop: "#drawerBackdrop",
      openButtons: [
        "#btnOpenDrawer",
        "#menu-toggle-btn",
        "[data-drawer-toggle]",
        ".btn-drawer-open"
      ],
      closeButtons: [
        "#btnCloseDrawer",
        "[data-drawer-close]",
        ".btn-drawer-close"
      ],
      navLinks: ".drawer-link, [data-nav-route]",
      apiKeyModal: "#apiKeyModal",
      adminAuthModal: "#adminAuthModal"
    }
  };

  window.VetcareApp.NavigationDrawer = NavigationDrawer;

  // 2. HELPER UTILITIES: TOASTS & NOTIFICATIONS
  NavigationDrawer.notify = function (message, type) {
    if (typeof window.showAppToast === "function") {
      window.showAppToast(message, type || "info");
    } else if (window.VetcareApp.Theme && typeof window.VetcareApp.Theme.showToast === "function") {
      window.VetcareApp.Theme.showToast(message, type || "info");
    } else {
      console.log(`[DRAWER ${type ? type.toUpperCase() : "INFO"}]: ${message}`);
    }
  };

  // 3. BODY SCROLL LOCKING ENGINE (Prevents Mobile Background Bleed)
  NavigationDrawer.lockBodyScroll = function () {
    NavigationDrawer.state.scrollPositionBeforeLock = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.position = "fixed";
    document.body.style.top = `-${NavigationDrawer.state.scrollPositionBeforeLock}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  };

  NavigationDrawer.unlockBodyScroll = function () {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, NavigationDrawer.state.scrollPositionBeforeLock);
  };

  // 4. DRAWER CONTROLS & TRANSITIONS
  NavigationDrawer.openDrawer = function () {
    if (NavigationDrawer.state.isOpen) return;

    const drawer = document.querySelector(NavigationDrawer.selectors.drawer);
    const backdrop = document.querySelector(NavigationDrawer.selectors.backdrop);

    if (!drawer) {
      console.warn("Navigation drawer element not found in DOM");
      return;
    }

    // Apply visual transitions
    drawer.classList.remove("-translate-x-full");
    if (backdrop) {
      backdrop.classList.remove("opacity-0", "pointer-events-none");
      backdrop.classList.add("opacity-100", "pointer-events-auto");
    }

    NavigationDrawer.state.isOpen = true;
    NavigationDrawer.lockBodyScroll();

    // Mobile Anti-Kickout: Push dummy history state
    if (!NavigationDrawer.state.historyStatePushed) {
      try {
        window.history.pushState({ vetcareDrawerOpen: true }, "", window.location.href);
        NavigationDrawer.state.historyStatePushed = true;
      } catch (err) {
        console.warn("History pushState failed in current context:", err);
      }
    }
  };

  NavigationDrawer.closeDrawer = function (isPopStateAction) {
    if (!NavigationDrawer.state.isOpen) return;

    const drawer = document.querySelector(NavigationDrawer.selectors.drawer);
    const backdrop = document.querySelector(NavigationDrawer.selectors.backdrop);

    if (drawer) {
      drawer.classList.add("-translate-x-full");
    }

    if (backdrop) {
      backdrop.classList.remove("opacity-100", "pointer-events-auto");
      backdrop.classList.add("opacity-0", "pointer-events-none");
    }

    NavigationDrawer.state.isOpen = false;
    NavigationDrawer.unlockBodyScroll();

    // Mobile Anti-Kickout: Revert history state if closed via UI action
    if (NavigationDrawer.state.historyStatePushed && !isPopStateAction) {
      NavigationDrawer.state.historyStatePushed = false;
      try {
        window.history.back();
      } catch (err) {
        console.warn("History back operation failed:", err);
      }
    } else {
      NavigationDrawer.state.historyStatePushed = false;
    }
  };

  NavigationDrawer.toggleDrawer = function () {
    if (NavigationDrawer.state.isOpen) {
      NavigationDrawer.closeDrawer(false);
    } else {
      NavigationDrawer.openDrawer();
    }
  };

  // 5. ROUTE & MENU NAVIGATION DISPATCHER
  NavigationDrawer.handleNavigationRoute = function (href, element) {
    href = (href || "").trim();
    if (!href) return;

    // Close the drawer immediately for smooth responsive feel
    NavigationDrawer.closeDrawer(false);

    // Route Mappings
    if (href === "#apiKeyModal" || href === "#api-key") {
      const apiKeyModal = document.querySelector(NavigationDrawer.selectors.apiKeyModal);
      if (apiKeyModal) {
        apiKeyModal.classList.remove("hidden");
        apiKeyModal.classList.add("flex");
      }
      return;
    }

    if (href === "#sunlight-toggle" || href === "#sunlight") {
      if (window.VetcareApp.Theme && typeof window.VetcareApp.Theme.toggleSunlightMode === "function") {
        window.VetcareApp.Theme.toggleSunlightMode();
      }
      return;
    }

    // Role Portal Switching
    const isDoctorRoute = href.includes("doctor") || href.includes("intake") || href.includes("symptom") || href.includes("shaeffer") || href.includes("corticosteroid");
    const isFarmerRoute = href.includes("farmer") || href.includes("desi") || href.includes("milk") || href.includes("bulls");
    const isAdminRoute = href.includes("admin") || href.includes("bank") || href.includes("payout");

    if (window.VetcareApp.Auth && typeof window.VetcareApp.Auth.switchPortal === "function") {
      if (isDoctorRoute) {
        window.VetcareApp.Auth.switchPortal("doctor");
      } else if (isFarmerRoute) {
        window.VetcareApp.Auth.switchPortal("farmer");
      } else if (isAdminRoute) {
        if (window.VetcareApp.Auth.state && window.VetcareApp.Auth.state.isAuthenticated && window.VetcareApp.Auth.state.currentRole === "admin") {
          window.VetcareApp.Auth.switchPortal("admin");
        } else {
          const adminModal = document.querySelector(NavigationDrawer.selectors.adminAuthModal);
          if (adminModal) {
            adminModal.classList.remove("hidden");
            adminModal.classList.add("flex");
          }
        }
      }
    }

    // Smooth Scroll to internal section if exists on page
    if (href.startsWith("#") && href.length > 1) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        setTimeout(function () {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }

    NavigationDrawer.state.activeRoute = href;
  };

  // 6. EVENT BINDINGS & LIFECYCLE
  NavigationDrawer.bindEvents = function () {
    // 1. Open Hamburger Buttons
    NavigationDrawer.selectors.openButtons.forEach(function (selector) {
      const buttons = document.querySelectorAll(selector);
      buttons.forEach(function (btn) {
        if (btn.getAttribute("data-bound-drawer-open") === "true") return;
        btn.setAttribute("data-bound-drawer-open", "true");

        btn.addEventListener("click", function (evt) {
          evt.preventDefault();
          evt.stopPropagation();
          NavigationDrawer.openDrawer();
        });
      });
    });

    // 2. Close Buttons
    NavigationDrawer.selectors.closeButtons.forEach(function (selector) {
      const buttons = document.querySelectorAll(selector);
      buttons.forEach(function (btn) {
        if (btn.getAttribute("data-bound-drawer-close") === "true") return;
        btn.setAttribute("data-bound-drawer-close", "true");

        btn.addEventListener("click", function (evt) {
          evt.preventDefault();
          NavigationDrawer.closeDrawer(false);
        });
      });
    });

    // 3. Backdrop Click
    const backdrop = document.querySelector(NavigationDrawer.selectors.backdrop);
    if (backdrop) {
      backdrop.addEventListener("click", function (evt) {
        evt.preventDefault();
        NavigationDrawer.closeDrawer(false);
      });
    }

    // 4. Physical / Hardware ESC Key
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape" || evt.keyCode === 27) {
        if (NavigationDrawer.state.isOpen) {
          NavigationDrawer.closeDrawer(false);
        }
      }
    });

    // 5. Mobile Anti-Kickout Popstate Event
    window.addEventListener("popstate", function (evt) {
      if (NavigationDrawer.state.isOpen) {
        // Drawer is open, intercept hardware back button to close drawer safely
        NavigationDrawer.closeDrawer(true);
      }
    });

    // 6. Navigation Link Handlers
    const navLinks = document.querySelectorAll(NavigationDrawer.selectors.navLinks);
    navLinks.forEach(function (link) {
      if (link.getAttribute("data-bound-nav-link") === "true") return;
      link.setAttribute("data-bound-nav-link", "true");

      link.addEventListener("click", function (evt) {
        const href = link.getAttribute("href") || link.getAttribute("data-nav-route") || "";
        if (href.startsWith("#") || href.startsWith("javascript:")) {
          evt.preventDefault();
          NavigationDrawer.handleNavigationRoute(href, link);
        }
      });
    });
  };

  NavigationDrawer.init = function () {
    NavigationDrawer.bindEvents();
  };

  // Self-execute lifecycle on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      NavigationDrawer.init();
    });
  } else {
    NavigationDrawer.init();
  }

})(window, document);
