/**
 * Modal System
 * Gestiona apertura/cierre de modales con datos de condiciones
 */

// IMPORTANTE: Depende de window.APP_CONFIG y window.trackEvent (cargar DESPUÉS)

const MODALS = {
  "modal-base": {
    title: "Envío en el día — Condiciones del servicio base",
    body: `
      <p><strong>Debe coordinarse</strong> completando el esquema de datos tanto por la web como por WhatsApp.</p>
      <p><strong>Incluye:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Retiro y entrega del paquete dentro del área operativa</li>
        <li>Gestión completa del recorrido</li>
      </ul>
      <p><strong>Medidas máximas:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Hasta 40 × 40 × 20 cm</li>
        <li>Hasta 3 kg</li>
      </ul>
      <p><strong>Protocolo de entrega:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Tocar timbre</li>
        <li>Llamar al teléfono del destinatario</li>
        <li>Enviar mensaje (WhatsApp o SMS)</li>
        <li>Tiempo máximo de espera: <strong>5 minutos</strong></li>
      </ul>
      <p><strong>Si no hay respuesta:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Se avisa a coordinación</li>
        <li>Se contacta al comercio si es necesario</li>
      </ul>
      <p><strong>Horarios:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Envíos agendados hasta las 12:00 → entrega en el día</li>
        <li>Clientes con beneficios: hasta las 15:00 / 16:00 hs (según el beneficio)</li>
        <li>Si el envío tiene margen menor a 3 horas → se considera urgente</li>
      </ul>
      <p><strong>Seguimiento:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Disponible para tiendas con más de 10 envíos</li>
        <li>Acceso al estado del pedido</li>
      </ul>
      <p class="text-sm text-neutral-600"><strong>Atención:</strong> la falta de información sobre el pedido se considerará responsabilidad de la tienda.</p>
    `,
    ctas: [
      { type: "precios", label: "Ver precios y zonas" },
      { type: "wpp", label: "Hablar con coordinación", message: "BASE" }
    ]
  },
  "modal-reco": {
    title: "Recoordinación sin costo — Condiciones",
    body: `
      <p><strong>Incluye:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>1 reentrega sin costo</li>
        <li>Se realiza al día siguiente o en fecha acordada</li>
      </ul>
      <p><strong>Aplica solo si:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>El destinatario responde a los intentos de contacto</li>
        <li>Hay un margen mínimo de 4 horas</li>
        <li>El paquete está correctamente etiquetado</li>
        <li>El embalaje está cerrado y en condiciones</li>
        <li>Dirección y datos completos</li>
        <li>No se solicitó horario estricto (&lt; 2 h)</li>
      </ul>
      <p><strong>En estos casos:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Se cobra un nuevo envío</li>
        <li>O puede retirarse en el punto de pickup</li>
      </ul>
    `,
    ctas: [
      { type: "precios", label: "Ver precios" },
      { type: "wpp", label: "Hablar con coordinación", message: "NAV" }
    ]
  },
  "modal-urgente": {
    title: "Envío urgente — Condiciones",
    body: `
      <p><strong>Aplica cuando:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>El envío fue coordinado fuera del horario de agenda</li>
        <li>El remitente o destinatario tiene disponibilidad menor a 3 horas</li>
      </ul>
      <p><strong>Condiciones:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Sujeto a disponibilidad operativa</li>
        <li>No se realizan entregas en horarios exactos o únicos</li>
        <li>Tiene recargo adicional</li>
      </ul>
    `,
    ctas: [
      { type: "wpp", label: "Consultar disponibilidad", message: "URGENTE" },
      { type: "precios", label: "Ver precios" }
    ]
  },
  "modal-cobro": {
    title: "Cobro del producto — Condiciones",
    body: `
      <p><strong>Incluye:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Cobro en efectivo al destinatario</li>
        <li>Transferencia al comercio dentro de los 10 días hábiles</li>
      </ul>
      <p><strong>Importante:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Si hay costo de envío, debe informarse junto al valor del producto</li>
        <li>Se recomienda cobrar producto + envío en un solo monto</li>
      </ul>
      <p><strong>Modalidad habitual:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Envío con cobro a descontar</li>
      </ul>
    `,
    ctas: [
      { type: "wpp", label: "Consultar condiciones", message: "COBRO" },
      { type: "precios", label: "Ver precios" }
    ]
  },
  "modal-cambio": {
    title: "Servicio de cambio — Condiciones",
    body: `
      <p><strong>Incluye:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Entrega del nuevo producto</li>
        <li>Retiro del producto anterior</li>
      </ul>
      <p><strong>Condiciones:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>La devolución vuelve al origen en hasta 7 días hábiles</li>
        <li>Si se requiere devolución el mismo día → se consideran dos envíos</li>
      </ul>
      <p><strong>Importante:</strong> el paquete debe estar correctamente etiquetado.</p>
    `,
    ctas: [
      { type: "wpp", label: "Consultar condiciones", message: "CAMBIO" },
      { type: "precios", label: "Ver precios" }
    ]
  },
  "modal-paquete": {
    title: "Paquete extra — Condiciones",
    body: `
      <p><strong>Se considera paquete extra cuando:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Se envían dos paquetes o más a una misma dirección en diferentes bultos</li>
        <li>El total supera 40 × 40 × 20 cm</li>
      </ul>
      <p><strong>No se considera extra si:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Son dos paquetes pequeños dentro del límite total</li>
      </ul>
      <p><strong>Importante:</strong> si los paquetes van a distintas direcciones → son envíos separados.</p>
    `,
    ctas: [
      { type: "precios", label: "Ver precios" },
      { type: "wpp", label: "Hablar con coordinación", message: "VARIOS" }
    ]
  },
  "modal-tamano": {
    title: "Tamaño extra — Condiciones",
    body: `
      <p><strong>Se considera tamaño extra cuando:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Un paquete supera 40 × 40 × 20 cm hasta 50 × 50 × 50</li>
        <li>El peso total supera 3 kg hasta 7 kg</li>
      </ul>
      <p><strong>Importante:</strong> si supera estas dimensiones/peso, se debe consultar disponibilidad y ajuste de precio.</p>
    `,
    ctas: [
      { type: "precios", label: "Ver precios" },
      { type: "wpp", label: "Hablar con coordinación", message: "GRANDE" }
    ]
  },
  "modal-prendas": {
    title: "Prueba de prendas — Condiciones",
    body: `
      <p><strong>Incluye:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Hasta 5 minutos de espera sin cargo para prueba</li>
      </ul>
      <p><strong>Cobro adicional:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Entre minuto 6 y 8: no se cobra</li>
        <li>Desde el minuto 9 en adelante: se aplica cargo por cada bloque adicional de 5 minutos</li>
      </ul>
      <p><strong>Recomendación:</strong> explicar previamente al cliente cómo funciona el servicio para evitar demoras innecesarias.</p>
    `,
    ctas: [
      { type: "wpp", label: "Consultar condiciones", message: "PRENDA" },
      { type: "precios", label: "Ver precios" }
    ]
  },
  "modal-encomiendas": {
    title: "Encomiendas — Condiciones",
    body: `
      <p><strong>Incluye:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Despacho o retiro en agencias</li>
      </ul>
      <p><strong>Condiciones:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>El paquete debe estar correctamente embalado</li>
        <li>Debe indicarse la agencia correspondiente</li>
        <li>Puede requerir documento del remitente o destinatario</li>
        <li>En caso de tener que abonar el retiro del paquete, se considerará como servicio de cobro</li>
      </ul>
      <p><strong>Recomendación:</strong> existen descuentos por cantidad de paquetes.</p>
    `,
    ctas: [
      { type: "wpp", label: "Hablar con coordinación", message: "ENCOMIENDAS" }
    ]
  },
  "modal-retiro-mercaderia": {
    title: "Retiro de mercadería — Condiciones",
    body: `
      <p><strong>Incluye:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Hasta 10 minutos de espera para retiro</li>
      </ul>
      <p><strong>Si la espera supera los 15 minutos:</strong></p>
      <ul class="list-disc pl-5 space-y-2">
        <li>Se aplica recargo adicional</li>
      </ul>
      <p><strong>Responsabilidad del cliente:</strong> confirmar que la mercadería esté lista antes del retiro.</p>
    `,
    ctas: [
      { type: "wpp", label: "Hablar con coordinación", message: "RETIRO_MERCADERIA" }
    ]
  }
};

// Referenciar elementos del DOM
const overlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const modalCtas = document.getElementById("modalCtas");
const MODAL_CTA_LOCATION = "modal_cta";
const MODAL_NAVIGATION_FALLBACK_MS = 120;
const MODAL_EVENT_TIMEOUT_MS = 1200;
const MODAL_AGENDAR_LINK = "https://tally.so/r/3xA6rE";
const MODAL_CTA_EVENTS = {
  wpp: "click_modal_whatsapp",
  pdf: "click_modal_pdf",
  precios: "click_modal_precios",
  agendar: "click_modal_agendar"
};

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
 * Crea botón del modal
 */
function makeBtn({ label, href, variant, type, modalId, section }) {
  const a = document.createElement("a");
  a.href = href;
  a.textContent = label;
  a.className =
    variant === "primary"
      ? "bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm font-black transition-all inline-flex items-center justify-center gap-2"
      : "bg-background-dark hover:bg-black text-white px-6 py-3 rounded-full text-sm font-black transition-all inline-flex items-center justify-center gap-2";

  const eventName = MODAL_CTA_EVENTS[type];
  if (eventName && window.trackEvent) {
    a.addEventListener("click", (event) => {
      const eventData = {
        section,
        modal_id: modalId,
        location: MODAL_CTA_LOCATION,
        element_text: (a.getAttribute("aria-label") || a.textContent || "").trim()
      };

      if (isTrackedSameTabLink(a, event)) {
        event.preventDefault();

        let navigated = false;
        const destination = a.href;
        const navigate = () => {
          if (navigated) return;
          navigated = true;
          window.location.assign(destination);
        };

        window.trackEvent(eventName, eventData, {
          eventCallback: navigate,
          eventTimeout: MODAL_EVENT_TIMEOUT_MS
        });

        window.setTimeout(navigate, MODAL_NAVIGATION_FALLBACK_MS);
        return;
      }

      window.trackEvent(eventName, eventData);
    });
  }

  return a;
}

function getModalTrackingSection(triggerEl) {
  if (!triggerEl) return "services_modal";

  const scopedSection = triggerEl.closest("[data-section]");
  return scopedSection?.dataset.section || "services_modal";
}

/**
 * Abre un modal por ID
 */
window.openModal = function(key, triggerEl = null) {
  const data = MODALS[key];
  const section = getModalTrackingSection(triggerEl);

  if (!data) {
    return;
  }

  modalTitle.textContent = data.title || "";
  modalBody.innerHTML = data.body || "";

  modalCtas.innerHTML = "";
  const ctas = data.ctas || [];

  const built = ctas.map((c) => {
    if (c.type === "precios") {
      return { label: c.label, href: window.APP_CONFIG.PRECIOS_LINK, type: "precios" };
    }
    if (c.type === "pdf") {
      return { label: c.label, href: window.APP_CONFIG.PDF_LINK, type: "pdf" };
    }
    if (c.type === "agendar") {
      return { label: c.label, href: MODAL_AGENDAR_LINK, type: "agendar" };
    }
    if (c.type === "wpp") {
      const msgKey = c.message;
      const msg = window.APP_CONFIG.MESSAGES[msgKey] || c.message;
      return { label: c.label, href: window.wppUrl(msg), type: "wpp" };
    }
    return null;
  }).filter(Boolean);

  let secondary = built.filter(b => b.type !== "wpp");
  let primary = built.filter(b => b.type === "wpp");

  if (primary.length === 0 && built.length > 0) {
    primary = [built[0]];
    secondary = built.slice(1);
  }

  secondary.forEach((b) => modalCtas.appendChild(makeBtn({
    label: b.label,
    href: b.href,
    variant: "secondary",
    type: b.type,
    modalId: key,
    section
  })));
  primary.forEach((b) => modalCtas.appendChild(makeBtn({
    label: b.label,
    href: b.href,
    variant: "primary",
    type: b.type,
    modalId: key,
    section
  })));

  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
  document.body.style.overflow = "hidden";

  window.modalTrigger = triggerEl || document.activeElement;

  // Bloquear interacción con el fondo usando inert (con fallback a aria-hidden)
  ['nav', 'main', 'footer'].forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    }
  });

  setTimeout(() => {
    const focusables = overlay.querySelectorAll('a, button');
    if (focusables.length > 0) focusables[0].focus();
  }, 0);

  // Activar focus trap
  document.addEventListener('keydown', trapFocusHandler);

  // Tracking
  if (window.trackEvent) {
    window.trackEvent("open_modal", {
      section,
      modal_id: key
    });
  }
};

/**
 * Focus trap: mantener Tab/Shift+Tab dentro del modal
 */
function trapFocusHandler(e) {
  if (overlay.classList.contains("hidden")) return;
  if (e.key !== 'Tab') return;

  // Elementos focusables dentro del modal
  const focusables = overlay.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (focusables.length === 0) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const activeEl = document.activeElement;

  if (e.shiftKey) {
    // Shift+Tab: ir al último si estamos en el primero
    if (activeEl === first) {
      last.focus();
      e.preventDefault();
    }
  } else {
    // Tab: ir al primero si estamos en el último
    if (activeEl === last) {
      first.focus();
      e.preventDefault();
    }
  }
}

/**
 * Cierra el modal
 */
window.closeModal = function() {
  overlay.classList.add("hidden");
  overlay.classList.remove("flex");
  document.body.style.overflow = "";

  // Remover focus trap
  document.removeEventListener('keydown', trapFocusHandler);

  // Remover bloqueo del fondo (inert + aria-hidden)
  ['nav', 'main', 'footer'].forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      el.removeAttribute('inert');
      el.removeAttribute('aria-hidden');
    }
  });

  // Retornar foco al trigger
  if (window.modalTrigger && document.contains(window.modalTrigger)) {
    window.modalTrigger.focus();
  }
};

// Event listeners del modal
if (modalClose) {
  modalClose.addEventListener("click", window.closeModal);
}

if (overlay) {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) window.closeModal();
  });
}

// Botones que abren modales (data-open)
document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const modalId = btn.getAttribute("data-open");
    window.openModal(modalId, btn);
  });
});

// Escape key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
    window.closeModal();
  }
});
