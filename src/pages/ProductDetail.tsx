import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Plus, Minus, Check, ShieldCheck, Truck, ArrowLeft, Sparkles, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatPKR, createWhatsAppConsultUrl } from '../utils/constants';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#0F4C3A] mb-4">
          Product Not Found
        </h2>
        <p className="text-xs text-neutral-600 mb-6">
          The skincare formulation you are looking for may have been updated or moved.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#0F4C3A] text-white rounded-xl text-xs font-semibold inline-block"
        >
          Return to Skincare Boutique
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
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
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-[#0F4C3A]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#0F4C3A]">Shop</Link>
          <span>/</span>
          <span className="text-[#0F4C3A] font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Contiguous Purchase Module */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C5A059]/20 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Product Gallery (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-4">
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#C5A059]/20 shadow-sm relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/brand/hero-serum.jpg';
                  }}
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#0F4C3A] text-white text-[10px] font-semibold tracking-wider uppercase rounded-full shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Trust Features Strip */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-neutral-600">
                <div className="p-3 bg-[#FAF7F2] rounded-xl flex items-center gap-2 border border-neutral-100">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>Dermatologist Formulated</span>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-xl flex items-center gap-2 border border-neutral-100">
                  <Truck className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>Nationwide Express Dispatch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                <span className="uppercase tracking-widest text-[#C5A059] font-semibold">
                  {product.category}
                </span>
                <span>·</span>
                <div className="flex items-center gap-1 text-neutral-700">
                  <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewsCount} verified patient reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4C3A] leading-tight">
                {product.name}
              </h1>
              <p className="text-sm font-medium text-[#C5A059] mt-1">
                {product.subtitle}
              </p>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 my-4 py-3 border-y border-neutral-100">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#0F4C3A]">
                  {formatPKR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-base text-neutral-400 line-through">
                    {formatPKR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-neutral-500 font-medium ml-2">
                  Volume: {product.size}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Clinical Benefits Checklist */}
              <div className="my-6 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A]">
                  Clinical Benefits:
                </h4>
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-700">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Active Ingredients Chips */}
              <div className="mb-6 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A]">
                  Key Active Ingredients:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.keyIngredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#FAF7F2] text-[#0F4C3A] text-xs font-medium rounded-lg border border-[#C5A059]/30"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to use */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-neutral-200 text-xs text-neutral-700 space-y-1 mb-6">
                <span className="font-semibold text-[#0F4C3A] block">Dermatologist Application Protocol:</span>
                <p className="leading-relaxed font-light">{product.howToUse}</p>
                <p className="text-[11px] text-neutral-500 pt-1">
                  <strong>Recommended Skin Type:</strong> {product.skinType}
                </p>
              </div>
            </div>

            {/* Purchase CTA Controls */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                
                {/* Quantity Stepper */}
                <div className="flex items-center justify-between border border-neutral-300 rounded-xl bg-white px-4 py-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-neutral-500 hover:text-black p-1"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-base font-semibold px-4 min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-neutral-500 hover:text-black p-1"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:flex-1 py-3.5 px-6 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                  <span>Add to Bag · {formatPKR(product.price * quantity)}</span>
                </button>

                {/* Buy Now / Quick Bag View */}
                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto py-3.5 px-6 bg-gradient-to-r from-[#C5A059] to-[#B88E3A] hover:from-[#DDB66B] hover:to-[#C5A059] text-[#0C3B2E] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors whitespace-nowrap"
                >
                  Quick Checkout
                </button>
              </div>

              {/* Direct Doctor WhatsApp Consultation for this product */}
              <div className="text-center pt-2">
                <a
                  href={createWhatsAppConsultUrl(`Hello Dr. Hina Faisal! I have a question regarding ${product.name} (${product.size}) for my skin type.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0F4C3A] hover:text-[#C5A059] font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Ask Dr. Hina Faisal if this product is right for you</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h3 className="font-serif text-2xl font-bold text-[#0F4C3A] mb-8 text-center sm:text-left">
              Complementary Formulations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
