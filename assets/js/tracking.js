/**
 * GTM + dataLayer Tracking
 * Contrato alineado con index para mantener payload consistente
 */

window.dataLayer = window.dataLayer || [];

function getDefaultPageName() {
  const bodyPage = document.body?.dataset.page || document.body?.dataset.pageName;
  if (bodyPage) return bodyPage;

  const path = window.location.pathname.split("/").pop() || "servicios.html";
  return path.replace(".html", "") || "servicios";
}

function withDefinedValues(payload) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== "")
  );
}

/**
 * Envia evento al dataLayer (GTM lo captura)
 * @param {string} eventName - Nombre del evento
 * @param {object} data - Datos adicionales del evento
 * @param {object} options - Opciones para navegacion segura
 */
window.trackEvent = function(eventName, data = {}, options = {}) {
  const payload = withDefinedValues({
    event: String(eventName || "unknown_event"),
    page_name: data.page_name || getDefaultPageName(),
    page_path: window.location.pathname,
    page_title: document.title,
    timestamp: new Date().toISOString(),
    section: data.section,
    location: data.location,
    element_text: data.element_text,
    intent: data.intent,
    ...data
  });

  if (typeof options.eventCallback === "function") {
    payload.event_callback = options.eventCallback;
  }

  if (typeof options.eventTimeout === "number") {
    payload.event_timeout = options.eventTimeout;
  }

  window.dataLayer.push(payload);
  return payload;
};
