import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Filter, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';
import { TREATMENTS, Treatment } from '../data/treatments';
import { TreatmentCard } from '../components/TreatmentCard';
import { createWhatsAppConsultUrl, CLINIC_INFO } from '../utils/constants';

type CategoryFilter = 'All' | 'Packages' | 'Skin' | 'Hair' | 'Aesthetic' | 'Laser';

const CATEGORIES: CategoryFilter[] = ['All', 'Packages', 'Skin', 'Hair', 'Aesthetic', 'Laser'];

export const Treatments: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as CategoryFilter) || 'All';
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(
    CATEGORIES.includes(initialCategory) ? initialCategory : 'All'
  );

  useEffect(() => {
    const categoryParam = searchParams.get('category') as CategoryFilter;
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: CategoryFilter) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredTreatments = TREATMENTS.filter((t) => {
    if (selectedCategory === 'All') return true;
    return t.category === selectedCategory;
  });

  return (
    <div className="pt-28 pb-20 bg-[#FAF7F2] min-h-screen">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] block">
            Dermatology & Medical Aesthetics Menu
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F4C3A]">
            Clinical Treatments & Packages
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-light leading-relaxed">
            Every procedure at Skin Nurture Clinic is administered or directly supervised by <strong className="text-neutral-900 font-medium">Dr. Hina Faisal</strong>, following evidence-based protocols, sterile conditions, and medical-grade diagnostics.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Certified Dermatologist Led</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Autologous & Medical-Grade Technology</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-[#C5A059]" />
              <span>Personalized Follow-Ups</span>
            </span>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="mt-10 flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-2xl border border-[#C5A059]/20 shadow-xs max-w-full overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0F4C3A] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-[#0F4C3A] hover:bg-[#FAF7F2]'
                }`}
              >
                {cat === 'All' ? 'All Treatments & Packages' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredTreatments.map((treatment) => (
              <motion.div
                key={treatment.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <TreatmentCard treatment={treatment} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Consultation Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-[#0C3B2E] text-white border border-[#C5A059]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C5A059]">
              Not sure which protocol fits your skin type?
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Schedule a Diagnostic Consultation
            </h3>
            <p className="text-xs text-[#FAF7F2]/80 max-w-xl font-light">
              Dr. Hina Faisal provides a full microscopic dermoscopy scan, root cause analysis, and a customized treatment prescription. Fee is Rs. 2,000 (complimentary when enrolling in a package).
            </p>
          </div>

          <a
            href={createWhatsAppConsultUrl("Hello Dr. Hina! I would like help deciding on the best clinical treatment protocol for my skin/hair concern.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-gradient-to-r from-[#C5A059] to-[#B88E3A] hover:from-[#DDB66B] hover:to-[#C5A059] text-[#0C3B2E] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Consult Via WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
};
