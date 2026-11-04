import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR, createWhatsAppOrderUrl, CLINIC_INFO } from '../utils/constants';

export const Checkout: React.FC = () => {
  const { items, subtotal, deliveryFee, total, totalItems, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Hyderabad',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Please enter a valid mobile number (e.g. 0318 3939139)';
    }
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.address.trim()) errs.address = 'Full delivery address is required';
    return errs;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const refCode = `SNC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(refCode);

    // Build the WhatsApp Order URL
    const waUrl = createWhatsAppOrderUrl({
      customerName: formData.name,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      notes: formData.notes,
      items: items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        type: i.type,
      })),
      subtotal,
      deliveryFee,
      total,
    });

    // Launch celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F4C3A', '#C5A059', '#E5C378', '#FAF7F2'],
      });
    } catch {
      // Confetti fallback
    }

    // Open WhatsApp in new tab for direct order communication
    window.open(waUrl, '_blank');

    setOrderCompleted(true);
    clearCart();
  };

  // If order completed successfully
  if (orderCompleted) {
    return (
      <div className="pt-32 pb-20 bg-[#FAF7F2] min-h-screen">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#C5A059]/30 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-[#0F4C3A] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-[#0F4C3A]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-[#C5A059] uppercase font-bold tracking-widest block">
                Order Reference: {orderRef}
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#0F4C3A]">
                Order Received via WhatsApp!
              </h1>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                Thank you, <strong className="text-neutral-900 font-semibold">{formData.name}</strong>. Your order summary has been transferred directly to our WhatsApp clinical desk. Our coordinator will verify dispatch details and delivery timeline shortly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-neutral-200 text-left text-xs text-neutral-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery City:</span>
                <span className="font-semibold text-neutral-900">{formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Contact Number:</span>
                <span className="font-semibold text-neutral-900">{formData.phone}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-2 font-bold text-[#0F4C3A]">
                <span>Total Amount:</span>
                <span className="font-mono text-sm">{formatPKR(total)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Open WhatsApp Chat</span>
              </a>
              <Link
                to="/"
                className="flex-1 py-3.5 px-4 border border-[#C5A059] text-[#0F4C3A] hover:bg-[#C5A059]/10 rounded-xl text-xs font-semibold flex items-center justify-center transition-colors"
              >
                Return to Clinic Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If bag is empty
  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 bg-[#FAF7F2] min-h-screen">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-10 border border-[#C5A059]/20 shadow-xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#0F4C3A]/5 border border-[#C5A059]/30 flex items-center justify-center mx-auto text-[#0F4C3A]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#0F4C3A]">
              Your Bag is Empty
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Add our dermatologist-formulated skincare products or clinical treatment packages to initiate your order.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/shop"
                className="w-full py-3 bg-[#0F4C3A] text-white rounded-xl text-xs font-semibold hover:bg-[#0C3B2E] transition-colors"
              >
                Browse Skincare Boutique
              </Link>
              <Link
                to="/treatments"
                className="w-full py-3 border border-[#C5A059] text-[#0F4C3A] rounded-xl text-xs font-semibold hover:bg-[#C5A059]/10 transition-colors"
              >
                Explore Clinical Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] block mb-1">
            Direct Clinic Order
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4C3A]">
            Checkout & WhatsApp Dispatch
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Complete your shipping details. Your order will be formatted and confirmed directly via our clinic WhatsApp desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Delivery Details Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#C5A059]/20 shadow-xl space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#0F4C3A]">
                Customer & Shipping Information
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Ensure your mobile number is active on WhatsApp for swift dispatch confirmation.
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none transition-colors ${
                    errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200 focus:border-[#C5A059]'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0318 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none transition-colors ${
                      errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200 focus:border-[#C5A059]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hyderabad, Karachi, Lahore..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none transition-colors ${
                      errors.city ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200 focus:border-[#C5A059]'
                    }`}
                  />
                  {errors.city && <p className="text-[11px] text-rose-500 mt-1">{errors.city}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Complete Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="House/Apartment #, Street, Sector/Area, Landmark..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none transition-colors ${
                    errors.address ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-200 focus:border-[#C5A059]'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Special Notes / Skin Concerns (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any allergies, doctor prescription notes, or preferred dispatch time..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#C5A059]/20 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h2 className="font-serif text-xl font-bold text-[#0F4C3A]">
                Order Items ({totalItems})
              </h2>
              <span className="text-xs text-[#C5A059] font-medium">
                Skin Nurture Care
              </span>
            </div>

            {/* Item list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center p-3 rounded-2xl bg-[#FAF7F2] border border-neutral-200/60">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 border border-neutral-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/brand/logo-gold.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#0F4C3A] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      {formatPKR(item.price)} each
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-0.5 rounded bg-white text-neutral-600 hover:text-black border border-neutral-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-0.5 rounded bg-white text-neutral-600 hover:text-black border border-neutral-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-neutral-900 block">
                      {formatPKR(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-400 hover:text-rose-500 text-[10px] mt-2 inline-block"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-4 border-t border-neutral-100 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-neutral-900 font-medium">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Nationwide Delivery</span>
                <span className="font-mono text-neutral-900 font-medium">
                  {deliveryFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : formatPKR(deliveryFee)}
                </span>
              </div>
              {subtotal < 5000 && (
                <p className="text-[11px] text-[#C5A059] italic">
                  Tip: Add {formatPKR(5000 - subtotal)} more to qualify for Free Delivery.
                </p>
              )}
              <div className="flex justify-between text-base font-bold text-[#0F4C3A] pt-3 border-t border-neutral-200">
                <span>Total Amount:</span>
                <span className="font-mono text-lg">{formatPKR(total)}</span>
              </div>
            </div>

            {/* Main Place Order Button */}
            <button
              type="submit"
              form="checkout-form"
              className="w-full py-4 px-6 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all group"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Place Order via WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Direct Doctor Verification · Cash on Delivery & Bank Transfer Available</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
