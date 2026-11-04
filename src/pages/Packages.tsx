import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Check, Clock, Heart, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { TREATMENTS } from '../data/treatments';
import { formatPKR, createWhatsAppConsultUrl, CLINIC_INFO } from '../utils/constants';
import { useBooking } from '../context/BookingContext';

export const Packages: React.FC = () => {
  const { openBooking } = useBooking();
  const packageItems = TREATMENTS.filter((t) => t.isPackage);

  return (
    <div className="pt-28 pb-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] block">
            Signature Pre-Wedding & Event Care
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F4C3A]">
            Pre-Wedding Clinical Packages
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-light leading-relaxed">
            Curated by <strong className="text-neutral-900 font-semibold">Dr. Hina Faisal</strong> to ensure luminous radiance, flawless texture, and healthy scalp density for brides, grooms, and milestone events.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-600">
            <span className="flex items-center gap-1.5 text-[#0F4C3A] font-semibold">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Complimentary Doctor Consultation with Full Packages</span>
            </span>
            <span aria-hidden="true" className="text-neutral-300 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Tailored to Your Wedding Date</span>
            </span>
          </div>
        </div>

        {/* Wedding Prep Timeline Guide */}
        <div className="mb-16 bg-white p-6 sm:p-8 rounded-3xl border border-[#C5A059]/20 shadow-md">
          <div className="text-center sm:text-left mb-6">
            <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
              Recommended Timeline
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#0F4C3A]">
              When Should You Begin Your Clinical Protocol?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-neutral-200 space-y-2">
              <span className="font-mono text-sm font-bold text-[#0F4C3A] block">
                6 to 8 Weeks Prior
              </span>
              <strong className="block text-neutral-900 font-semibold">
                Complete Bridal Overhaul (Package 01 / 05)
              </strong>
              <p className="text-neutral-600 leading-relaxed font-light">
                Allows sufficient time for collagen remodeling via microneedling, 3 cycles of laser hair reduction, and cellular hair follicle strengthening.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-neutral-200 space-y-2">
              <span className="font-mono text-sm font-bold text-[#0F4C3A] block">
                3 to 4 Weeks Prior
              </span>
              <strong className="block text-neutral-900 font-semibold">
                Pigmentation & Whitening (Package 02 / 04)
              </strong>
              <p className="text-neutral-600 leading-relaxed font-light">
                Targets stubborn dark patches, sun spots, and uneven tan lines with chemical peeling and high-potency antioxidant mesotherapy.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-neutral-200 space-y-2">
              <span className="font-mono text-sm font-bold text-[#0F4C3A] block">
                1 to 2 Weeks Prior
              </span>
              <strong className="block text-neutral-900 font-semibold">
                Face Glowing Protocol (Package 08)
              </strong>
              <p className="text-neutral-600 leading-relaxed font-light">
                Quick zero-downtime event prep with 3 HydraFacials and a radiant glow peel for hydrated, glassy, makeup-receptive skin.
              </p>
            </div>
          </div>
        </div>

        {/* 8 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packageItems.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl border border-[#C5A059]/25 shadow-lg overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Image banner */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF7F2]">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/brand/package-bridal-glow.jfif';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#0F4C3A]/90 text-white text-[10px] font-bold tracking-wider uppercase rounded-full border border-[#C5A059]/40">
                    {pkg.tag || 'Clinical Package'}
                  </span>
                  {pkg.originalPrice && (
                    <span className="px-2.5 py-1 bg-[#C5A059] text-[#0C3B2E] text-[10px] font-bold tracking-wider uppercase rounded-full">
                      Save {formatPKR(pkg.originalPrice - pkg.price)}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 text-white text-xs flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{pkg.duration}</span>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0F4C3A] leading-snug">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-2 font-light leading-relaxed">
                    {pkg.shortDesc}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">
                      Package Inclusions:
                    </span>
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                        <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/20 text-[11px] text-neutral-600 italic">
                    <strong>Doctor's Advice:</strong> {pkg.doctorNote}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="mt-6 pt-4 border-t border-neutral-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                        Complete Package Fee
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-2xl font-bold text-[#0F4C3A]">
                          {formatPKR(pkg.price)}
                        </span>
                        {pkg.originalPrice && (
                          <span className="font-mono text-xs text-neutral-400 line-through">
                            {formatPKR(pkg.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openBooking(pkg)}
                      className="py-3 px-3 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Book Package</span>
                    </button>

                    <a
                      href={createWhatsAppConsultUrl(`Hello Dr. Hina Faisal! I am interested in inquiring about ${pkg.name} (${formatPKR(pkg.price)}) for my wedding.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-3 border border-[#C5A059] text-[#0F4C3A] hover:bg-[#C5A059]/10 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Consultation Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#0C3B2E] text-white border border-[#C5A059]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
              Custom Bridal Consultation
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Need a Bespoke Pre-Wedding Regimen?
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 max-w-xl font-light">
              Every bride and groom is unique. Dr. Hina Faisal conducts one-on-one evaluations to blend packages or create a custom plan according to your exact calendar.
            </p>
          </div>

          <button
            onClick={() => openBooking()}
            className="px-6 py-3.5 bg-gradient-to-r from-[#C5A059] to-[#B88E3A] hover:from-[#DDB66B] hover:to-[#C5A059] text-[#0C3B2E] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all shrink-0 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Evaluation</span>
          </button>
        </div>

      </div>
    </div>
  );
};
