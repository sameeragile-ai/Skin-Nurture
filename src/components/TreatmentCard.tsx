import React from 'react';
import { Sparkles, Clock, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { Treatment } from '../data/treatments';
import { formatPKR, createWhatsAppConsultUrl } from '../utils/constants';
import { useCart } from '../context/CartContext';

interface TreatmentCardProps {
  treatment: Treatment;
  onSelect?: (treatment: Treatment) => void;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment, onSelect }) => {
  const { addItem } = useCart();

  const handleAddPackage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: treatment.id,
      name: treatment.name,
      subtitle: treatment.duration,
      price: treatment.price,
      image: treatment.image,
      quantity: 1,
      type: 'treatment',
      sizeOrDuration: treatment.duration,
    });
  };

  return (
    <div className="group bg-white rounded-3xl border border-[#C5A059]/20 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Visual Header */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF7F2]">
        <img
          src={treatment.image}
          alt={treatment.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.src = '/brand/package-bridal-glow.jfif';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-3 py-1 bg-[#0F4C3A]/90 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase rounded-full border border-[#C5A059]/40">
            {treatment.category}
          </span>
          {treatment.tag && (
            <span className="px-3 py-1 bg-[#C5A059] text-[#0C3B2E] text-[10px] font-bold tracking-wider uppercase rounded-full shadow-sm">
              {treatment.tag}
            </span>
          )}
        </div>

        {/* Duration bottom chip */}
        <div className="absolute bottom-3 left-3 text-white text-xs flex items-center gap-1.5 font-medium">
          <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{treatment.duration}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F4C3A] group-hover:text-[#165B4C] transition-colors leading-snug">
            {treatment.name}
          </h3>
          <p className="text-xs text-neutral-600 mt-2 leading-relaxed line-clamp-2">
            {treatment.shortDesc}
          </p>

          {/* Highlights checklist */}
          <div className="mt-4 space-y-1.5 border-t border-neutral-100 pt-3">
            {treatment.highlights.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing and Actions */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">
                {treatment.isPackage ? 'Package Price' : 'Session Fee'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xl font-bold text-[#0F4C3A]">
                  {formatPKR(treatment.price)}
                </span>
                {treatment.originalPrice && (
                  <span className="font-mono text-xs text-neutral-400 line-through">
                    {formatPKR(treatment.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {treatment.originalPrice && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Save {formatPKR(treatment.originalPrice - treatment.price)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddPackage}
              className="py-2.5 px-3 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Book / Add</span>
            </button>

            <a
              href={createWhatsAppConsultUrl(`Hello Dr. Hina Faisal! I am interested in inquiring about ${treatment.name} at Skin Nurture Clinic.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 border border-[#C5A059] text-[#0F4C3A] hover:bg-[#C5A059]/10 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>Inquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
