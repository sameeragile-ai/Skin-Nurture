import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { CLINIC_INFO, createWhatsAppConsultUrl } from '../utils/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0C3B2E] text-[#FAF7F2] border-t border-[#C5A059]/20 relative overflow-hidden">
      {/* Subtle gold gradient ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-[#C5A059] overflow-hidden bg-white/95 p-1 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src="/brand/logo-gold.png"
                  alt="Skin Nurture Clinic"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wide text-[#FAF7F2] block">
                  Skin Nurture
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A059] font-medium block">
                  Dermatology Clinic
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#FAF7F2]/75 max-w-sm">
              Hyderabad’s premier clinical dermatology and medical aesthetics sanctuary. Led by 
              <strong className="text-white font-medium"> Dr. Hina Faisal</strong>, offering evidence-based skin, hair, and laser treatments designed for your natural beauty.
            </p>

            {/* Social Proof Badges */}
            <div className="flex flex-wrap gap-2 text-[11px] text-[#FAF7F2]/80 pt-1">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{CLINIC_INFO.rating}</span>
              </span>
              <a
                href={CLINIC_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-colors group"
              >
                <span>{CLINIC_INFO.facebookFollowers} on Facebook</span>
                <ArrowUpRight className="w-3 h-3 text-[#C5A059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-sm tracking-wider uppercase text-[#C5A059] font-semibold">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/75">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/treatments" className="hover:text-white transition-colors">Clinical Treatments</Link>
              </li>
              <li>
                <Link to="/treatments?category=Packages" className="hover:text-white transition-colors">Bridal & Glow Packages</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">Skincare Boutique</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Meet Dr. Hina Faisal</Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-white transition-colors">Patient Results</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Clinic Location</Link>
              </li>
            </ul>
          </div>

          {/* Clinic Timings & Location (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-sm tracking-wider uppercase text-[#C5A059] font-semibold">
              Clinic Hours
            </h3>
            <div className="space-y-3 text-xs text-[#FAF7F2]/80">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Monday – Saturday</p>
                  <p className="text-[#C5A059]">7:00 PM – 9:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white/50">Sunday</p>
                  <p className="text-white/40">Closed (Sanitization & Sterilization)</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <h4 className="text-[11px] font-semibold text-[#C5A059] uppercase tracking-wider mb-1.5">
                  Direct Inquiries
                </h4>
                <div className="space-y-1.5">
                  <a
                    href={`tel:${CLINIC_INFO.phoneInternational}`}
                    className="flex items-center gap-2 hover:text-[#C5A059] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{CLINIC_INFO.phoneDisplay}</span>
                  </a>
                  <a
                    href={`mailto:${CLINIC_INFO.email}`}
                    className="flex items-center gap-2 hover:text-[#C5A059] transition-colors truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="truncate">{CLINIC_INFO.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Map Preview (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-sm tracking-wider uppercase text-[#C5A059] font-semibold">
              Find Our Clinic
            </h3>
            <div className="flex items-start gap-2.5 text-xs text-[#FAF7F2]/80">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>{CLINIC_INFO.address}</span>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-32 rounded-xl overflow-hidden border border-[#C5A059]/30 relative shadow-sm">
              <iframe
                title="Skin Nurture Clinic Location Hyderabad"
                src={CLINIC_INFO.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <p>© {new Date().getFullYear()} Skin Nurture Clinic · Dr. Hina Faisal. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Hyderabad, Sindh, Pakistan</span>
            <span aria-hidden="true">·</span>
            <a
              href={createWhatsAppConsultUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A059] hover:underline"
            >
              Direct WhatsApp Desk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
