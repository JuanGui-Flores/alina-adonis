'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '@/types/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const phoneNumber = '5492640000000'; // Reemplazar con el número oficial de Alina & Adonis
    let message = '*NUEVO PEDIDO - ALINA & ADONIS*\n\n';

    items.forEach((item) => {
      message += `• *${item.name}* (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString('es-AR')}\n`;
    });

    message += `\n*TOTAL:* $${total.toLocaleString('es-AR')}\n\n`;
    message += '¡Hola! Quisiera coordinar el pago y envío de este pedido.';

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header Drawer */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
              <div className="flex items-center gap-2 font-mono font-black tracking-wider">
                <ShoppingBag className="w-5 h-5" />
                <span>TU BOLSA ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Listado de Productos */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-400 gap-3">
                  <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
                  <p className="text-sm font-medium">Tu bolsa está vacía</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 border border-neutral-100 p-3 rounded-lg bg-neutral-50/50"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded bg-neutral-200"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-xs text-neutral-900 uppercase tracking-tight">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-neutral-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs font-bold text-neutral-600 mt-1">
                          ${item.price.toLocaleString('es-AR')}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-neutral-300 rounded bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-neutral-600 hover:bg-neutral-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-neutral-600 hover:bg-neutral-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-bold">
                          ${(item.price * item.quantity).toLocaleString('es-AR')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-neutral-200 bg-white space-y-4">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>TOTAL ESTIMADO</span>
                  <span className="text-lg font-mono">${total.toLocaleString('es-AR')}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-black text-white py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors shadow-lg"
                >
                  Finalizar Compra por WhatsApp
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}