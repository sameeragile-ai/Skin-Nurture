import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ZoomIn, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { createWhatsAppConsultUrl } from '../utils/constants';

interface CaseStudy {
  id: string;
  title: string;
  category: 'Acne' | 'Pigmentation' | 'Hair' | 'Glow';
  sessions: string;
  timeline: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  doctorInsight: string;
}

const CASES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Acne Scar Remodeling & Erythema Resolution',
    category: 'Acne',
    sessions: '3 Sessions (Acne Peel + PRP Face)',
    timeline: '6 Weeks Total',
    beforeImg: '/brand/package-acne-scar.jfif',
    afterImg: '/brand/radiant-result.jpg',
    description: 'Patient presented with post-breakout rolling indented scars, erythema, and excess sebaceous congestion across cheeks.',
    doctorInsight: 'Focused on stopping micro-cystic flareups with chemical peeling, followed by platelet-derived growth factor remodeling to elevate indented dermal scarring.'
  },
  {
    id: 'case-2',
    title: 'Pre-Wedding Dermal Luminosity & Glass Skin',
    category: 'Glow',
    sessions: '3 HydraFacials + 1 Glow Peel',
    timeline: '3 Weeks Total',
    beforeImg: '/brand/package-hydrafacial-glow.jfif',
    afterImg: '/brand/radiant-result.jpg',
    description: 'Severe epidermal dehydration, enlarged congested t-zone pores, and dull oxidized skin tone prior to wedding festivities.',
    doctorInsight: 'Three vacuum extraction cycles unclogged follicular channels, followed by concentrated antioxidant infusion for luminous, makeup-ready radiance.'
  },
  {
    id: 'case-3',
    title: 'Crown Parting Hair Densification Therapy',
    category: 'Hair',
    sessions: '4 Autologous PRP Sessions + Scalp Meso',
    timeline: '10 Weeks Total',
    beforeImg: '/brand/package-hair-restoration.jfif',
    afterImg: '/brand/clinic-room.jpg',
    description: 'Noticeable hair thinning along the central parting and accelerated daily hair fall triggered by postpartum shedding.',
    doctorInsight: 'Injected concentrated autologous platelets directly around miniaturized roots. Halted active shedding by week 4 and stimulated healthy anagen growth.'
  },
  {
    id: 'case-4',
    title: 'Stubborn Melasma & Sun Damage Correction',
    category: 'Pigmentation',
    sessions: '3 Brightening Peels + Mesotherapy',
    timeline: '8 Weeks Total',
    beforeImg: '/brand/package-anti-pigmentation.jfif',
    afterImg: '/brand/radiant-result.jpg',
    description: 'Bilateral butterfly pattern melasma on cheekbones exacerbated by UV exposure and hormonal fluctuations.',
    doctorInsight: 'Controlled tyrosinase suppression using mandelic-tranexamic formulations to prevent rebound post-inflammatory hyperpigmentation.'
  }
];

export const Results: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [activeTab, setActiveTab] = useState<'All' | 'Acne' | 'Pigmentation' | 'Hair' | 'Glow'>('All');

  const filteredCases = CASES.filter((c) => activeTab === 'All' || c.category === activeTab);

  return (
    <div className="pt-28 pb-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] block">
            Clinical Documentation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F4C3A]">
            Patient Results & Transformations
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-light leading-relaxed">
            Real transformations achieved under the clinical care of <strong className="text-neutral-900 font-semibold">Dr. Hina Faisal</strong>. Every treatment plan is uniquely calibrated to individual skin chemistry.
          </p>
          <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-[11px] font-semibold text-amber-900">
            *Sample Clinical Results · Individual outcomes vary based on skin phototype and lifestyle
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-2 p-1.5 bg-white rounded-2xl border border-[#C5A059]/20 shadow-xs">
            {(['All', 'Acne', 'Pigmentation', 'Hair', 'Glow'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-[#0F4C3A] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-[#0F4C3A]'
                }`}
              >
                {tab === 'All' ? 'All Case Studies' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Interactive Comparison Sliders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {filteredCases.slice(0, 2).map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border border-[#C5A059]/20 shadow-xl space-y-4">
              <div>
                <span className="text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold block">
                  {item.category} Protocol · {item.timeline}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0F4C3A] mt-0.5">
                  {item.title}
                </h3>
              </div>

              <BeforeAfterSlider
                beforeImage={item.beforeImg}
                afterImage={item.afterImg}
                beforeLabel="Before"
                afterLabel={`After (${item.sessions})`}
                description={item.description}
              />

              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-neutral-100 text-xs text-neutral-600 leading-relaxed">
                <strong className="text-[#0F4C3A] block mb-0.5 font-semibold">
                  Dr. Hina Faisal's Clinical Insight:
                </strong>
                {item.doctorInsight}
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Grid of Cases */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#C5A059]/20 shadow-xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C3A] mb-8 text-center sm:text-left">
            Clinical Protocol Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CASES.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedCase(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-neutral-200 hover:border-[#C5A059] transition-all bg-[#FAF7F2] flex flex-col justify-between"
              >
                <div className="aspect-4/3 overflow-hidden relative">
                  <img
                    src={item.afterImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/brand/radiant-result.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 text-xs font-semibold">
                    <ZoomIn className="w-4 h-4" />
                    <span>View Case</span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#C5A059] uppercase font-semibold tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#0F4C3A] line-clamp-1 group-hover:text-[#C5A059] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-neutral-200 text-[10px] font-semibold text-neutral-600 flex items-center justify-between">
                    <span>{item.sessions}</span>
                    <span className="text-[#0F4C3A]">Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Consultation CTA */}
        <div className="mt-16 text-center">
          <a
            href={createWhatsAppConsultUrl("Hello Dr. Hina Faisal! I looked at your patient results and would like to evaluate what protocol would be recommended for my skin.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-full text-xs font-semibold tracking-wider uppercase shadow-xl transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Schedule Your Evaluation with Dr. Hina</span>
          </a>
        </div>

      </div>

      {/* Case Lightbox Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 p-4 sm:p-6 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 bg-[#FAF7F2] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#C5A059]/30 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white text-neutral-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                  {selectedCase.category} · {selectedCase.timeline}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0F4C3A] mt-1">
                  {selectedCase.title}
                </h3>
              </div>

              <BeforeAfterSlider
                beforeImage={selectedCase.beforeImg}
                afterImage={selectedCase.afterImg}
                beforeLabel="Before Treatment"
                afterLabel={`After (${selectedCase.sessions})`}
                description={selectedCase.description}
              />

              <div className="p-4 rounded-2xl bg-white border border-neutral-200 text-xs text-neutral-700 leading-relaxed">
                <strong className="text-[#0F4C3A] block font-semibold mb-1">
                  Doctor's Clinical Analysis & Protocol:
                </strong>
                {selectedCase.doctorInsight}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-semibold"
                >
                  Close
                </button>
                <a
                  href={createWhatsAppConsultUrl(`Hello Dr. Hina! I am interested in inquiring about results similar to: ${selectedCase.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-[#0F4C3A] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>Inquire About This Result</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
