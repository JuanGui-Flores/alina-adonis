"use client";

import { useMemo, useState } from "react";
import Hero from "@/components/Hero";
import ProductModal from "@/components/ProductModal";
import CartDrawer from "@/components/CartDrawer";
import { PRODUCTS } from "@/data/products";
import { CartItem, Category, Product } from "@/types/store";
import Image from "next/image";

const CATEGORIES: Category[] = [
  "All",
  "Hoodies",
  "Tees",
  "Bottoms",
  "Outerwear",
];

const CATEGORY_LABELS: Record<Category, string> = {
  All: "Todo",
  Hoodies: "Buzos",
  Tees: "Remeras",
  Bottoms: "Pantalones",
  Outerwear: "Camperas",
};

const formatARS = (amount: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const totalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.productId === product.id && item.size === size,
      );
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          size,
          quantity: 1,
          image: product.images[0],
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      {/* Header superior */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a
            href="#top"
            className="font-serif text-xl sm:text-2xl tracking-tight font-semibold"
          >
            Alina &amp; Adonis
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.16em] text-neutral-600">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  document
                    .getElementById("catalog")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`hover:text-[#111111] transition-colors cursor-pointer ${
                  selectedCategory === cat ? "text-[#111111] font-semibold" : ""
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="px-4 py-2 bg-[#111111] text-white text-xs font-semibold uppercase tracking-[0.15em] hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Bolsa ({totalCount})
          </button>
        </div>
      </header>

      {/* Hero con imagen A/A */}
      <div id="top">
        <Hero
          onSelectCategory={(cat) => {
            if (CATEGORIES.includes(cat as Category)) {
              setSelectedCategory(cat as Category);
            }
          }}
        />
      </div>

      {/* Catálogo y filtros */}
      <main
        id="catalog"
        className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-neutral-200 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Colección Actual
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl mt-1">
              {CATEGORY_LABELS[selectedCategory]}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                    active
                      ? "bg-[#111111] text-white"
                      : "bg-white text-neutral-700 border border-neutral-300 hover:border-[#111111]"
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              onClick={() => setActiveProduct(product)}
              className="group bg-white border border-neutral-200/80 hover:border-neutral-400 transition-colors cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden bg-[#F3F3F3]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 text-[#111111] text-[10px] font-semibold uppercase tracking-[0.15em]">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-400">
                    {CATEGORY_LABELS[product.category]}
                  </p>
                  <h3 className="mt-1 text-sm sm:text-base font-medium text-[#111111]">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-semibold text-[#111111]">
                    {formatARS(product.price)}
                  </span>
                  <span className="text-xs uppercase tracking-[0.14em] text-neutral-500 group-hover:text-[#111111]">
                    Ver detalle →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Modal de detalle de producto */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Bolsa lateral */}
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
