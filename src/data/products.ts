import { Product } from '@/types/store';

export const PRODUCTS: Product[] = [
  {
    id: 'aa-tee-01',
    name: 'Boxy Tee Monogram Noir',
    category: 'Tees',
    price: 38500,
    fit: 'Boxy fit · Hombro caído',
    fabric: 'Algodón jersey pesado 240 gsm',
    description:
      'Remera de corte amplio con caída estructurada y bordado frontal minimalista A/A. Pensada para uso diario con estructura firme.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/hero-alina-adonis.jpg',
      '/hero-alina-adonis.jpg',
    ],
    badge: 'Drop 01',
  },
  {
    id: 'aa-hoodie-01',
    name: 'Heavy Hoodie Concrete',
    category: 'Hoodies',
    price: 74000,
    fit: 'Relaxed fit · Largo cropped',
    fabric: 'Frisa invisible de algodón 480 gsm',
    description:
      'Buzo con capucha doble, puños y cintura de rib grueso y tacto suave interior. Mantiene su forma lavado tras lavado.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/hero-alina-adonis.jpg',
      '/hero-alina-adonis.jpg',
    ],
    badge: 'Best seller',
  },
  {
    id: 'aa-bottom-01',
    name: 'Lounge Pant Obsidian',
    category: 'Bottoms',
    price: 59000,
    fit: 'Wide leg · Cintura ajustable',
    fabric: 'Algodón rústico estructurado',
    description:
      'Pantalón de pierna relajada con cordón regulable y bolsillos profundos. Equilibrio entre comodidad y presencia urbana.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/hero-alina-adonis.jpg',
      '/hero-alina-adonis.jpg',
    ],
  },
  {
    id: 'aa-outer-01',
    name: 'Track Jacket Essential',
    category: 'Outerwear',
    price: 89000,
    fit: 'Regular structured fit',
    fabric: 'Tejido técnico mate repelente al viento',
    description:
      'Campera liviana de corte limpio con cierre frontal y terminaciones limpias, ideal para media estación y noches frescas.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/hero-alina-adonis.jpg',
      '/hero-alina-adonis.jpg',
    ],
    badge: 'Nuevo',
  },
];