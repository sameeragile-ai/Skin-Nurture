import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../data/products';
import { formatPKR } from '../utils/constants';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      image: product.image,
      quantity: 1,
      type: 'product',
      sizeOrDuration: product.size,
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl md:rounded-3xl border border-[#C5A059]/15 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-[#FAF7F2] overflow-hidden">
        <Link to={`/shop/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={(e) => {
              e.currentTarget.src = '/brand/hero-serum.jpg';
            }}
          />
        </Link>

        {/* Badge (Max 1 subtle tag) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#0C3B2E]/90 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#C5A059]/40 backdrop-blur-xs">
            {product.badge}
          </div>
        )}

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-[#0F4C3A] shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5">
            <span className="uppercase tracking-widest font-medium text-[#C5A059]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-neutral-700">
              <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
              <span className="font-semibold">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/shop/${product.id}`} className="block group-hover:text-[#0F4C3A] transition-colors">
            <h3 className="font-serif text-base sm:text-lg font-semibold text-[#222426] line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Buy Action */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-sm sm:text-base font-bold text-[#0F4C3A]">
                {formatPKR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-xs text-neutral-400 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-400">{product.size}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-3 py-2 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
