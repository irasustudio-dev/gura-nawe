import marketplaceData from '../data/marketplace.json';

const WHATSAPP_NUMBER = marketplaceData.store.whatsapp;

export function generateWhatsAppLink(productName: string, price: number) {
  const message = `Hello 👋\n\nI want to buy:\n🔥 *${productName}*\n💰 Price: *${new Intl.NumberFormat('en-US').format(price)} RWF*\n\nCan you help me?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateServiceLink(serviceName: string, price: number) {
  const message = `Hello 👋\n\nI want service for:\n🚀 *${serviceName}*\n💰 Price: *${new Intl.NumberFormat('en-US').format(price)} RWF*\n\nHow can I order?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
