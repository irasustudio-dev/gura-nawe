import marketplaceData from '../data/marketplace.json';

const WHATSAPP_NUMBER = marketplaceData.store.whatsapp;

export function generateWhatsAppLink(productName: string, price: number) {
  const message = `Muraho 👋\n\nNdashaka kugura:\n🔥 *${productName}*\n💰 Ibe: *${new Intl.NumberFormat('en-US').format(price)} RWF*\n\nMwaba mwamfasha?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateServiceLink(serviceName: string, price: number) {
  const message = `Muraho 👋\n\nNdashaka serivisi ya:\n🚀 *${serviceName}*\n💰 Igiciro: *${new Intl.NumberFormat('en-US').format(price)} RWF*\n\nNkore nte?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
