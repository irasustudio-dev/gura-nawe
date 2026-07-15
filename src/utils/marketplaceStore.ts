import marketplaceData from '../data/marketplace.json';
import type { Category, Product, Service } from '../types';

interface MarketplaceSnapshot {
  store: typeof marketplaceData.store;
  categories: Category[];
  products: Product[];
  services: Service[];
}

const STORAGE_KEY = 'gura-nawe-marketplace-state-v1';

function readFromStorage(): Partial<MarketplaceSnapshot> | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getMarketplaceData(): MarketplaceSnapshot {
  const stored = readFromStorage();

  return {
    store: stored?.store ?? marketplaceData.store,
    categories: stored?.categories ?? marketplaceData.categories,
    products: stored?.products ?? marketplaceData.products,
    services: stored?.services ?? marketplaceData.services,
  };
}

export function saveMarketplaceData(nextState: Partial<MarketplaceSnapshot>) {
  if (typeof window === 'undefined') {
    return;
  }

  const current = getMarketplaceData();
  const freshState = {
    ...current,
    ...nextState,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(freshState));
}

export function getProducts() {
  return getMarketplaceData().products;
}
