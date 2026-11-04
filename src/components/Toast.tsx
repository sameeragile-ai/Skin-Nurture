import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toast, dismissToast, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-50 max-w-sm w-full bg-[#0C3B2E] text-white p-4 rounded-2xl shadow-2xl border border-[#C5A059]/30 flex items-center gap-3.5 backdrop-blur-md"
        >
          {/* Item thumbnail */}
          <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden shrink-0 border border-[#C5A059]/40 relative">
            <img
              src={toast.image}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.src = '/brand/logo-gold.png';
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{toast.title}</span>
            </div>
            <p className="text-xs font-semibold text-[#FAF7F2] truncate mt-0.5">
              {toast.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => {
                dismissToast();
                setIsCartOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#E5C378] text-[#0C3B2E] text-[11px] font-bold transition-colors flex items-center gap-1 shadow-sm"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>View</span>
            </button>
            <button
              onClick={dismissToast}
              className="p-1 rounded-md text-white/50 hover:text-white transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
