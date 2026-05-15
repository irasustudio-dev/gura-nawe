export interface Product {
  id: string;
  name: string;
  platform: string;
  category: string;
  stats: string;
  priceRWF: number;
  description: string;
  features: string[];
  thumbnail: string;
  isFeatured: boolean;
  isNew: boolean;
  rating: number;
}

export interface Service {
  id: string;
  name: string;
  priceRWF: number;
  description: string;
  deliveryTime: string;
  icon: string;
  isPopular: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
