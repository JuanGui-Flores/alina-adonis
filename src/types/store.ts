export type Category = 'All' | 'Hoodies' | 'Tees' | 'Bottoms' | 'Outerwear';

export interface Product {
  id: string;
  name: string;
  category: Exclude<Category, 'All'>;
  price: number;
  fit: string;
  fabric: string;
  description: string;
  sizes: string[];
  images: string[];
  badge?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}