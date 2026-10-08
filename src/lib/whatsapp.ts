export const WHATSAPP_NUMBER = "5588990000000";

export function openWhatsApp(texto: string) {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`,
    "_blank",
    "noopener,noreferrer",
  );
}
