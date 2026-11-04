import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/constants';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    removeItem,
    updateQuantity,
    subtotal,
    deliveryFee,
    total,
    totalItems,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer Slide-in */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#FAF7F2] text-[#222426] shadow-2xl flex flex-col justify-between border-l border-[#C5A059]/20"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#C5A059]/15 flex items-center justify-between bg-white/70">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#0F4C3A]" />
                  <h2 className="font-serif text-xl font-semibold text-[#0F4C3A]">
                    Your Bag ({totalItems})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List / Empty State */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                    <div className="w-16 h-16 rounded-full bg-[#0F4C3A]/5 border border-[#C5A059]/30 flex items-center justify-center mb-4 text-[#0F4C3A]">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#0F4C3A] mb-1">
                      Your bag is empty
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-xs mb-6">
                      Explore our clinical treatments or dermatologist-formulated skincare solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate('/treatments');
                        }}
                        className="w-full py-2.5 px-4 bg-[#0F4C3A] text-white rounded-xl text-xs font-semibold hover:bg-[#0C3B2E] transition-colors"
                      >
                        Explore Packages
                      </button>
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate('/shop');
                        }}
                        className="w-full py-2.5 px-4 border border-[#C5A059] text-[#0F4C3A] rounded-xl text-xs font-semibold hover:bg-[#C5A059]/10 transition-colors"
                      >
                        Shop Skincare
                      </button>
                    </div>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-4 bg-white rounded-2xl border border-neutral-200/80 shadow-xs flex gap-3.5 relative group"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-18 h-18 rounded-xl bg-neutral-100 overflow-hidden shrink-0 border border-neutral-100 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.src = '/brand/logo-gold.png';
                          }}
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-semibold text-[#0F4C3A] line-clamp-2">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {item.sizeOrDuration && (
                            <p className="text-[11px] text-neutral-400 mt-0.5">
                              {item.sizeOrDuration}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                          <span className="font-semibold text-xs text-[#222426]">
                            {formatPKR(item.price * item.quantity)}
                          </span>

                          <div className="flex items-center gap-2 border border-neutral-200 rounded-lg bg-neutral-50 px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-neutral-600 hover:text-black p-0.5 focus:outline-none"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold min-w-[14px] text-center font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-neutral-600 hover:text-black p-0.5 focus:outline-none"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-[#C5A059]/20 bg-white space-y-4">
                  {/* Delivery Threshold Notice */}
                  <div className="p-2.5 rounded-xl bg-[#0F4C3A]/5 border border-[#C5A059]/30 text-[11px] text-[#0F4C3A] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>
                      {subtotal >= 5000
                        ? '🎉 You unlocked FREE delivery across Pakistan!'
                        : `Add ${formatPKR(5000 - subtotal)} more for Free Nationwide Delivery`}
                    </span>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono font-medium text-neutral-900">{formatPKR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery (Pakistan)</span>
                      <span className="font-mono font-medium text-neutral-900">
                        {deliveryFee === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : formatPKR(deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-[#0F4C3A] pt-2 border-t border-neutral-100">
                      <span>Estimated Total</span>
                      <span className="font-mono text-base">{formatPKR(total)}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0F4C3A] to-[#165B4C] hover:from-[#0C3B2E] hover:to-[#0F4C3A] text-white rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md transition-all group"
                  >
                    <span>Proceed to WhatsApp Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Verified Doctor Orders · Direct Consultation Sync</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
