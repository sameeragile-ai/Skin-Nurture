import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { createWhatsAppConsultUrl } from '../utils/constants';

export const NotFound: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-[#FAF7F2] min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <span className="font-mono text-5xl sm:text-6xl font-bold text-gold-gradient block">
          404
        </span>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-[#0F4C3A]">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
            The page you are looking for does not exist or may have been relocated. Allow us to guide you back to our clinical sanctuary.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            to="/"
            className="px-6 py-3 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <a
            href={createWhatsAppConsultUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[#C5A059] text-[#0F4C3A] hover:bg-[#C5A059]/10 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>WhatsApp Clinic Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
};
