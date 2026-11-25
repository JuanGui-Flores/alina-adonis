"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/store";
import Image from "next/image";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

interface ProductModalContentProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

const formatARS = (amount: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);

function ProductModalContent({
  product,
  onClose,
  onAddToCart,
}: ProductModalContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(() =>
    product.sizes.includes("M") ? "M" : (product.sizes[0] ?? "L"),
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const activeImg = product.images[selectedImage] ?? product.images[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="relative w-full max-w-4xl bg-white text-[#111111] grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle de producto"
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 hover:bg-[#111111] hover:text-white text-[#111111] flex items-center justify-center text-sm font-semibold transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Columna izquierda: Galería de producto */}
        <div className="bg-[#F3F3F3] flex flex-col justify-between p-4 sm:p-6 gap-4">
          <div className="relative aspect-4/5 w-full overflow-hidden bg-[#EAEAEA]">
            <Image
              src={activeImg}
              alt={`${product.name} — vista ${selectedImage + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={`${product.id}-thumb-${idx}`}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square overflow-hidden border transition-all cursor-pointer ${
                    selectedImage === idx
                      ? "border-[#111111] ring-1 ring-[#111111]"
                      : "border-transparent opacity-65 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} miniatura ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Columna derecha: Información y compra */}
        <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
              <span>{product.category}</span>
              {product.badge && (
                <span className="px-2.5 py-0.5 bg-[#111111] text-white font-medium tracking-[0.14em]">
                  {product.badge}
                </span>
              )}
            </div>

            <div>
              <h2 className="font-serif text-3xl sm:text-4xl leading-tight">
                {product.name}
              </h2>
              <p className="mt-2 text-lg font-semibold text-[#111111]">
                {formatARS(product.price)}
              </p>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            <div className="border-t border-b border-neutral-200 py-3.5 space-y-1.5 text-xs">
              <div className="flex justify-between gap-4">
                <span className="uppercase tracking-[0.12em] text-neutral-400">
                  Calce
                </span>
                <span className="font-medium text-[#111111] text-right">
                  {product.fit}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="uppercase tracking-[0.12em] text-neutral-400">
                  Textil
                </span>
                <span className="font-medium text-[#111111] text-right">
                  {product.fabric}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.15em] font-semibold">
                  Talle
                </span>
                <span className="text-neutral-500">
                  Seleccionado: {selectedSize}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 text-xs font-semibold uppercase tracking-[0.14em] border transition-colors cursor-pointer ${
                        active
                          ? "bg-[#111111] text-white border-[#111111]"
                          : "bg-white text-[#111111] border-neutral-300 hover:border-[#111111]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onAddToCart(product, selectedSize);
              onClose();
            }}
            className="w-full py-3.5 bg-[#111111] hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer"
          >
            Agregar a la bolsa · {formatARS(product.price)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  if (!product) return null;

  return (
    <ProductModalContent
      key={product.id}
      product={product}
      onClose={onClose}
      onAddToCart={onAddToCart}
    />
  );
}
