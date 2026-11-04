import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';
import { formatPKR } from '../utils/constants';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) return null;

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      image: product.image,
      quantity,
      type: 'product',
      sizeOrDuration: product.size,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-[#FAF7F2] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#C5A059]/30 z-10 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-600 shadow-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left: Image */}
          <div className="aspect-square md:aspect-auto w-full h-full bg-white relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/brand/hero-serum.jpg';
              }}
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#0F4C3A] text-white text-[10px] font-semibold tracking-wider uppercase rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right: Info */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                <span className="uppercase tracking-widest text-[#C5A059] font-medium">
                  {product.category}
                </span>
                <span>·</span>
                <div className="flex items-center gap-1 text-neutral-700">
                  <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewsCount})</span>
                </div>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#0F4C3A]">
                {product.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-3 mb-4">
                <span className="font-mono text-xl font-bold text-[#0F4C3A]">
                  {formatPKR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-neutral-400 line-through">
                    {formatPKR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-neutral-400 ml-2">{product.size}</span>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Key benefits list */}
              <div className="space-y-1.5 mb-6">
                {product.benefits.slice(0, 2).map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                    <Check className="w-3.5 h-3.5 text-[#0F4C3A] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Buy */}
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-neutral-300 rounded-xl bg-white px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-neutral-500 hover:text-black p-1"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-sm font-semibold px-3 min-w-[24px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-neutral-500 hover:text-black p-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-4 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · {formatPKR(product.price * quantity)}</span>
                </button>
              </div>

              <div className="text-center">
                <Link
                  to={`/shop/${product.id}`}
                  onClick={onClose}
                  className="text-xs text-[#0F4C3A] hover:text-[#C5A059] font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <span>View Full Product Clinical Information</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
