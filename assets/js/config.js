/**
 * Configuration Global
 * Todas las constantes de la aplicación
 */

window.APP_CONFIG = {
  WHATSAPP_PHONE: "59897428015",
  PRECIOS_LINK: "precios-y-zonas.html",
  PDF_LINK: "https://drive.google.com/file/d/1H1xJMBVA5rtAZ0K258bq-1R2aBSrx-w-/view?usp=sharing",

  MESSAGES: {
    INDEX_NAV: "Hola! Vi su web y me interesa coordinar envios para mi tienda. Podemos hablar?",
    INDEX_HERO: "Hola! Vi su web y me interesa coordinar envios para mi tienda. Podemos hablar?",
    INDEX_CTA: "Hola! Vi su web y me interesa coordinar envios para mi tienda. Podemos hablar?",
    INDEX_FOOTER: "Hola! Vi su web y me interesa coordinar envios para mi tienda. Podemos hablar?",
    INDEX_FLOATING: "Hola! Vi su web y me interesa coordinar envios para mi tienda. Podemos hablar?",
    COORDINAR_NAV: "Hola, vi la pagina para coordinar envios y quiero empezar a trabajar con ustedes. Me pasan el esquema de datos?",
    COORDINAR_HERO: "Hola, quiero empezar a coordinar envios. Cual es el proceso?",
    COORDINAR_CTA_FINAL: "Hola, quiero agendar mi primer envio. Cual es el siguiente paso?",
    COORDINAR_PROCESO_DUDAS: "Hola, tengo dudas sobre como coordinar envios. Me pueden ayudar?",
    COORDINAR_FAQ: "Hola, estuve viendo las preguntas frecuentes y me quedaron algunas dudas sobre como coordinar envios.",
    FAQ_NAV: "Hola, estuve viendo las preguntas frecuentes y me quedaron algunas dudas sobre el servicio.",
    FAQ_CTA: "Hola, estuve revisando las preguntas frecuentes y quiero resolver una duda puntual.",
    PRECIOS_NAV: "Hola, vi la pagina de precios y me interesa coordinar envios. Podemos hablar?",
    PRECIOS_ZONA: "Hola, tengo dudas sobre a que zona pertenece mi direccion en Montevideo.",
    PRECIOS_PICKUP: "Hola, me interesa usar el pickup point. Como funciona y donde queda?",
    PRECIOS_TRANSPARENCIA: "Hola, quiero entender bien como funciona el servicio antes de empezar.",
    PRECIOS_EMPEZAR: "Hola, ya vi los precios y quiero empezar a trabajar con Envio Directo. Me pasan el esquema de datos?",
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
