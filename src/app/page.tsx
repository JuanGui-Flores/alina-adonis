'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Preloader from '@/components/Preloader';
import CartDrawer from '@/components/CartDrawer';
import { Product, CartItem } from '@/types/cart';

const PRODUCTS: Product[] = [
  { id: 1, name: 'Buzo Oversize Black', category: 'BUZOS', price: 45000, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Remera Graphic Acid', category: 'REMERAS', price: 22000, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Pantalón Cargo Heavy', category: 'PANTALONES', price: 52000, image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Buzo Hoodie Off-White', category: 'BUZOS', price: 48000, image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80' },
];

const CATEGORIES = ['TODOS', 'BUZOS', 'REMERAS', 'PANTALONES'];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('TODOS');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = activeCategory === 'TODOS'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f4f4f0] text-[#111111] antialiased selection:bg-black selection:text-white">
      <Preloader isLoading={loading} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <div className="bg-[#111111] text-white text-center py-2 text-[11px] font-semibold tracking-[0.2em] uppercase">
        ENVÍOS GRATIS EN COMPRAS SUPERIORES A $50.000
      </div>

      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={!loading ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-12 h-20 bg-white/90 backdrop-blur-md border-b border-neutral-200"
      >
        <div className="text-xl font-black tracking-widest font-mono">
          ALINA <span className="text-neutral-400">&amp;</span> ADONIS
        </div>
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 border border-black px-5 py-2 rounded-full text-xs font-semibold hover:bg-black hover:text-white transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>BOLSA</span>
          <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] ml-1">
            {totalCartCount}
          </span>
        </button>
      </motion.header>

      <section
        className="relative h-[75vh] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1600&q=80')" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-2xl px-4"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-90">URBAN WEAR 2026</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase my-4 leading-none tracking-tight">Desafía el Estilo</h1>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="#tienda"
            className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold text-xs tracking-[0.2em] uppercase shadow-lg hover:bg-neutral-100 transition-colors"
          >
            Ver Colección
          </motion.a>
        </motion.div>
      </section>

      <main id="tienda" className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold tracking-wide uppercase">Nuevos Ingresos</h2>
          <p className="text-neutral-500 text-sm mt-1">Prendas diseñadas para destacar.</p>
        </div>

        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-colors ${
                activeCategory === cat ? 'text-white' : 'text-black bg-white border border-neutral-300'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-black rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((prod) => (
            <motion.div
              key={prod.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col shadow-sm"
            >
              <div className="overflow-hidden h-72 relative">
                <motion.img
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.4 }}
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col grow">
                <h3 className="font-semibold text-sm mb-1">{prod.name}</h3>
                <span className="text-neutral-500 text-sm mb-4">
                  ${prod.price.toLocaleString('es-AR')}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(prod)}
                  className="mt-auto w-full bg-black text-white py-3 rounded text-xs font-bold tracking-wider uppercase hover:bg-neutral-800 transition-colors"
                >
                  Agregar a la Bolsa
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}