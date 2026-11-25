'use client';

import { CartItem } from '@/types/store';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
}

const formatARS = (amount: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);

export default function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
}: CartDrawerProps) {
  if (!open) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const buildWhatsAppUrl = () => {
    const lines = [
      'Hola Alina & Adonis, quiero consultar / pedir:',
      ...items.map(
        (i) =>
          `• ${i.name} (Talle ${i.size}) x${i.quantity} — ${formatARS(i.price * i.quantity)}`
      ),
      `Total: ${formatARS(subtotal)}`,
    ];
    return `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Bolsa de compras"
    >
      <aside
        className="w-full max-w-md bg-white text-[#111111] h-full flex flex-col justify-between p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <h2 className="font-serif text-2xl">Tu Bolsa</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-[0.15em] text-neutral-500 hover:text-[#111111] cursor-pointer"
          >
            Cerrar ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-sm text-neutral-500 py-12 text-center">
              Todavía no agregaste prendas a tu bolsa.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex gap-3.5 border-b border-neutral-100 pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover bg-[#F3F3F3] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium truncate">{item.name}</h3>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.productId, item.size)}
                      className="text-[11px] text-neutral-400 hover:text-[#111111] cursor-pointer"
                    >
                      Quitar
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Talle: {item.size} · {formatARS(item.price)}
                  </p>

                  <div className="mt-2.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.productId, item.size, -1)}
                      className="w-6 h-6 border border-neutral-300 text-xs flex items-center justify-center hover:border-[#111111] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.productId, item.size, 1)}
                      className="w-6 h-6 border border-neutral-300 text-xs flex items-center justify-center hover:border-[#111111] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-neutral-200 pt-4 space-y-4">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="uppercase tracking-[0.12em]">Subtotal</span>
            <span>{formatARS(subtotal)}</span>
          </div>

          <a
            href={items.length > 0 ? buildWhatsAppUrl() : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={items.length === 0}
            className={`block w-full text-center py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] transition-colors ${
              items.length > 0
                ? 'bg-[#111111] text-white hover:bg-neutral-800'
                : 'bg-neutral-200 text-neutral-400 pointer-events-none'
            }`}
          >
            Pedir por WhatsApp
          </a>
        </div>
      </aside>
    </div>
  );
}