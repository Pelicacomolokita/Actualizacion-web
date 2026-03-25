/**
 * Main App Logic
 * bindLinks, mobile menu, scroll tracking y tracking declarativo
 */

// IMPORTANTE: Depende de window.APP_CONFIG y window.trackEvent

const PAGE_NAME = document.body?.dataset.page || "servicios";
const NAVIGATION_FALLBACK_MS = 120;
const GTM_EVENT_TIMEOUT_MS = 1200;

/**
 * Asigna URLs reales a botones
 */
function bindLinks() {
  const links = {
    navWhatsappBtn: window.wppUrl(window.APP_CONFIG.MESSAGES.NAV),
    mobileWhatsappBtn: window.wppUrl(window.APP_CONFIG.MESSAGES.NAV),
    heroWhatsappBtn: window.wppUrl(window.APP_CONFIG.MESSAGES.EMPEZAR),
    introWhatsappBtn: window.wppUrl(window.APP_CONFIG.MESSAGES.EMPEZAR),
    ctaWhatsappBtn: window.wppUrl(window.APP_CONFIG.MESSAGES.EMPEZAR),
    footerWhatsapp: window.wppUrl(window.APP_CONFIG.MESSAGES.NAV),

    heroPreciosBtn: window.APP_CONFIG.PRECIOS_LINK,
    introPreciosBtn: window.APP_CONFIG.PRECIOS_LINK,
    ctaPreciosBtn: window.APP_CONFIG.PRECIOS_LINK,
    basePreciosInline: window.APP_CONFIG.PRECIOS_LINK,
    recoPreciosInline: window.APP_CONFIG.PRECIOS_LINK,

    heroPdfBtn: window.APP_CONFIG.PDF_LINK,
    ctaPdfBtn: window.APP_CONFIG.PDF_LINK,
  };

  Object.entries(links).forEach(([id, href]) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = href;
    }
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!mobileMenuBtn || !mobileMenu) return;

  const syncMobileMenuState = (isOpen) => {
    mobileMenuBtn.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
    mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    mobileMenuBtn.setAttribute("aria-controls", "mobileMenu");
    mobileMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");

    const icon = mobileMenuBtn.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = isOpen ? "close" : "menu";
  };

  syncMobileMenuState(!mobileMenu.classList.contains("hidden"));

  mobileMenuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden", !isHidden);
    syncMobileMenuState(isHidden);
  });
}

function isTrackedSameTabLink(el, event) {
  if (!el || el.tagName !== "A") return false;
  if (!el.href || el.target === "_blank" || el.hasAttribute("download")) return false;
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;

  const href = el.getAttribute("href") || "";
  if (!href || href.startsWith("#")) return false;

  return true;
}

/**
 * Scroll tracking (25%, 50%, 75%, 90%)
 */
function initScrollTracking() {
  const milestones = [25, 50, 75, 90];
  const tracked = new Set();

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 1;
    const scrollPercent = (scrollPos / docHeight) * 100;

    milestones.forEach((milestone) => {
      if (scrollPercent >= milestone && !tracked.has(milestone)) {
        window.trackEvent(`scroll_${milestone}`, { scroll_percentage: Math.round(scrollPercent) });
        tracked.add(milestone);
      }
    });
  }, { passive: true });
}

/**
 * Section view tracking
 * Dispara cada vista una sola vez por carga
 */
function initSectionViews() {
  const viewedEvents = new Set();
  const sections = document.querySelectorAll("[data-view-event]");

  if (sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const section = entry.target;
      const eventName = section.dataset.viewEvent;
      const sectionName = section.dataset.section || "unknown";

      if (!eventName || viewedEvents.has(eventName)) return;

      window.trackEvent(eventName, {
        page_name: PAGE_NAME,
        section: sectionName
      });

      viewedEvents.add(eventName);
      observer.unobserve(section);
    });
  }, {
    threshold: 0.4
  });

  sections.forEach((section) => {
    observer.observe(section);
  });
}

/**
 * Binding generico de tracking usando data-attributes
 */
function initTrackedEvents() {
  document.querySelectorAll("[data-event]").forEach((el) => {
    el.addEventListener("click", (event) => {
      const eventData = {
        page_name: el.dataset.page || PAGE_NAME,
        section: el.dataset.section || "",
        location: el.dataset.location || "unknown",
        intent: el.dataset.intent || "",
        element_text: (el.getAttribute("aria-label") || el.textContent || "").trim()
      };

      if (isTrackedSameTabLink(el, event)) {
        event.preventDefault();

        let navigated = false;
        const destination = el.href;
        const navigate = () => {
          if (navigated) return;
          navigated = true;
          window.location.assign(destination);
        };

        window.trackEvent(el.dataset.event, eventData, {
          eventCallback: navigate,
          eventTimeout: GTM_EVENT_TIMEOUT_MS
        });

        window.setTimeout(navigate, NAVIGATION_FALLBACK_MS);
        return;
      }

      window.trackEvent(el.dataset.event, eventData);
    });
  });
}

/**
 * Inicializar todo cuando el DOM este listo
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("[App Init] Comenzando inicializacion...");

  bindLinks();
  console.log("[App Init] bindLinks completado");

  initMobileMenu();
  console.log("[App Init] Mobile menu inicializado");

  initScrollTracking();
  console.log("[App Init] Scroll tracking inicializado");

  initTrackedEvents();
  console.log("[App Init] Tracking declarativo inicializado");

  initSectionViews();
  console.log("[App Init] Section views inicializado");

  console.log("[App Init] Todas las funciones inicializadas correctamente");
});
