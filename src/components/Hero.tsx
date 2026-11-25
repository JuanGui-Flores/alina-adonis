'use client';

import { motion } from 'framer-motion';

interface HeroProps {
  onExploreCatalog?: () => void;
  onSelectCategory?: (category: string) => void;
}

export default function Hero({ onExploreCatalog, onSelectCategory }: HeroProps) {
  const handleShopClick = () => {
    if (onExploreCatalog) {
      onExploreCatalog();
      return;
    }
    const catalogEl = document.getElementById('catalog');
    catalogEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-[78vh] sm:h-[86vh] min-h-[540px] max-h-[920px] flex items-end bg-[#141414] text-white overflow-hidden">
      <img
        src="/hero-alina-adonis.jpg"
        alt="Alina & Adonis — Colección Urban Wear"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Degradado sutil solo en la base para dar contraste a los botones */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-8 sm:pb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleShopClick}
            className="px-6 py-3 bg-white text-[#111111] text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Ver colección
          </button>

          {onSelectCategory && (
            <button
              type="button"
              onClick={() => {
                onSelectCategory('Hoodies');
                handleShopClick();
              }}
              className="px-6 py-3 bg-black/50 backdrop-blur-xs border border-white/45 text-white text-xs sm:text-sm font-medium uppercase tracking-[0.16em] hover:bg-white/15 transition-colors cursor-pointer"
            >
              Buzos &amp; Remeras
            </button>
          )}
        </div>

        <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-white/80">
          Drop Editorial · Alina &amp; Adonis
        </span>
      </motion.div>
    </section>
  );
}