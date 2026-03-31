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
  const getMessage = (...keys) => {
    const validKeys = keys.filter(Boolean);
    for (const key of validKeys) {
      if (window.APP_CONFIG.MESSAGES[key]) {
        return window.APP_CONFIG.MESSAGES[key];
      }
    }
    return "";
  };

  const navMessageKey = PAGE_NAME === "precios"
    ? "PRECIOS_NAV"
    : PAGE_NAME === "coordinar"
      ? "COORDINAR_NAV"
      : PAGE_NAME === "faq"
        ? "FAQ_NAV"
        : PAGE_NAME === "index"
          ? "INDEX_NAV"
          : "NAV";

  const floatingMessageKey = PAGE_NAME === "coordinar"
    ? "COORDINAR_HERO"
    : PAGE_NAME === "precios"
      ? "PRECIOS_NAV"
      : PAGE_NAME === "faq"
        ? "FAQ_NAV"
        : PAGE_NAME === "index"
          ? "INDEX_FLOATING"
          : "NAV";

  const links = {
    navWhatsappBtn: window.wppUrl(getMessage(navMessageKey, "NAV")),
    mobileWhatsappBtn: window.wppUrl(getMessage(navMessageKey, "NAV")),
    heroWhatsappBtn: window.wppUrl(getMessage(PAGE_NAME === "coordinar" ? "COORDINAR_HERO" : PAGE_NAME === "index" ? "INDEX_HERO" : "EMPEZAR", "EMPEZAR")),
    introWhatsappBtn: window.wppUrl(window.APP_CONFIG.MESSAGES.EMPEZAR),
    ctaWhatsappBtn: window.wppUrl(getMessage(PAGE_NAME === "index" ? "INDEX_CTA" : "EMPEZAR", "EMPEZAR")),
    ctaFinalWhatsappBtn: window.wppUrl(getMessage("COORDINAR_CTA_FINAL", "COORDINAR_NAV", "NAV")),
    procesodudasWhatsappBtn: window.wppUrl(getMessage("COORDINAR_PROCESO_DUDAS", "COORDINAR_NAV", "NAV")),
    footerWhatsapp: window.wppUrl(getMessage(PAGE_NAME === "coordinar" ? "COORDINAR_NAV" : PAGE_NAME === "index" ? "INDEX_FOOTER" : "NAV", "NAV")),
    footerWhatsappLink: window.wppUrl(getMessage(navMessageKey, "NAV")),
    floatingWhatsappBtn: window.wppUrl(getMessage(floatingMessageKey, "NAV")),
    ctaEmpezarWhatsapp: window.wppUrl(getMessage(PAGE_NAME === "faq" ? "FAQ_CTA" : "EMPEZAR", "EMPEZAR")),
    consultarZonaWhatsapp: window.wppUrl(window.APP_CONFIG.MESSAGES.PRECIOS_ZONA || window.APP_CONFIG.MESSAGES.PRECIOS_NAV || window.APP_CONFIG.MESSAGES.NAV),
    pickupWhatsappBtn: window.wppUrl(window.APP_CONFIG.MESSAGES.PRECIOS_PICKUP || window.APP_CONFIG.MESSAGES.PRECIOS_NAV || window.APP_CONFIG.MESSAGES.NAV),
    consultarTransparenciaWhatsapp: window.wppUrl(window.APP_CONFIG.MESSAGES.PRECIOS_TRANSPARENCIA || window.APP_CONFIG.MESSAGES.PRECIOS_NAV || window.APP_CONFIG.MESSAGES.NAV),
    empezarWhatsappBtn: window.wppUrl(window.APP_CONFIG.MESSAGES.PRECIOS_EMPEZAR || window.APP_CONFIG.MESSAGES.EMPEZAR),
    bottomEmpezarWhatsappBtn: window.wppUrl(window.APP_CONFIG.MESSAGES.PRECIOS_EMPEZAR || window.APP_CONFIG.MESSAGES.EMPEZAR),

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
    if (el.matches("summary[data-event='faq_open']")) return;

    el.addEventListener("click", (event) => {
      const eventData = {
        page_name: el.dataset.page || PAGE_NAME,
        section: el.dataset.section || "",
        target_section: el.dataset.targetSection || "",
        modal_id: el.dataset.modalId || "",
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
 * FAQ tracking
 * Dispara solo cuando un details se abre
 */
function initFaqTracking() {
  document.querySelectorAll("details summary[data-event='faq_open']").forEach((summary) => {
    const details = summary.closest("details");
    if (!details) return;

    details.addEventListener("toggle", () => {
      if (!details.open) return;

      const questionText = (
        summary.getAttribute("aria-label") ||
        summary.querySelector("span")?.textContent ||
        summary.textContent ||
        ""
      ).trim();

      window.trackEvent("faq_open", {
        page_name: summary.dataset.page || PAGE_NAME,
        section: summary.dataset.section || "faq",
        location: summary.dataset.location || "faq",
        intent: summary.dataset.intent || "",
        element_text: questionText
      });
    });
  });
}

/**
 * Inicializar todo cuando el DOM este listo
 */
document.addEventListener("DOMContentLoaded", () => {
  bindLinks();
  initMobileMenu();
  initScrollTracking();
  initTrackedEvents();
  initFaqTracking();
  initSectionViews();
});
