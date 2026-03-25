/**
 * Configuration Global
 * Todas las constantes de la aplicación
 */

window.APP_CONFIG = {
  WHATSAPP_PHONE: "59897428015",
  PRECIOS_LINK: "precios-y-zonas.html",
  PDF_LINK: "https://drive.google.com/file/d/1H1xJMBVA5rtAZ0K258bq-1R2aBSrx-w-/view?usp=sharing",

  MESSAGES: {
    NAV: "Hola, vi su página web y quiero empezar a coordinar envíos.",
    BASE: "Hola soy nuevo!, quiero empezar a trabajar con Envío Directo. ¿Podrías pasarme el esquema de datos para coordinar envíos?",
    EMPEZAR: "Hola, vi su página web y quiero empezar a coordinar envíos.",
    URGENTE: "Quiero confirmar un envío URGENTE.",
    COBRO: "Quiero empezar a ofrecer el COBRO AL ENTREGAR en mi tienda, ¿cómo puedo comenzar?",
    CAMBIO: "Quiero coordinar un envío con CAMBIO.",
    VARIOS: "Hola, necesito coordinar el envío de varios paquetes.",
    GRANDE: "Hola, necesito coordinar el envío de un paquete grande, ¿tendrán disponibilidad?",
    PRENDA: "Quiero coordinar un envío con el servicio PRUEBA DE PRENDAS.",
    ENCOMIENDAS: "Necesito coordinar un despacho a ENCOMIENDAS.",
    RETIRO_MERCADERIA: "Necesito coordinar un RETIRO DE MERCADERÍA."
  }
};

/**
 * Genera URL de WhatsApp con mensaje
 * @param {string} message - Mensaje a enviar
 * @returns {string} URL de WhatsApp
 */
window.wppUrl = function(message) {
  return `https://wa.me/${window.APP_CONFIG.WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};

console.log("[Config] APP_CONFIG cargado correctamente");
