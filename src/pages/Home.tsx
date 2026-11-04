import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Clock,
  CheckCircle2,
  Calendar,
  ChevronDown,
  Award,
  Activity,
  HeartHandshake
} from 'lucide-react';
import { TREATMENTS } from '../data/treatments';
import { CLINIC_INFO, createWhatsAppConsultUrl, formatPKR } from '../utils/constants';
import { TreatmentCard } from '../components/TreatmentCard';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { useBooking } from '../context/BookingContext';

export const Home: React.FC = () => {
  const { openBooking } = useBooking();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const marqueeItems = [
    'Acne Correction & Scar Therapy',
    'HydraFacial MD Elite',
    'Laser Hair Reduction',
    'Autologous Scalp & Face PRP',
    'Medical Chemical Peels',
    'Exosome Follicle Therapy',
    'Pre-Wedding Bridal Protocols',
    'Melasma & Pigmentation Reversal',
    'Barrier Repair & Hydration',
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      subtitle: 'Microscopic dermoscopy & skin diagnosis with Dr. Hina Faisal',
      desc: 'We examine underlying sebum chemistry, follicular density, and phototype genetics rather than treating symptoms.'
    },
    {
      step: '02',
      title: 'Prescription Plan',
      subtitle: 'Tailored clinical protocol',
      desc: 'You receive an exact roadmap combining in-clinic procedures with personalized medical-grade daily homecare.'
    },
    {
      step: '03',
      title: 'Clinical Treatment',
      subtitle: 'Sterile, state-of-the-art procedure',
      desc: 'Administered with international dermatological standards, sapphire-cooled lasers, and autologous growth factors.'
    },
    {
      step: '04',
      title: 'Radiant Glow',
      subtitle: 'Long-term dermal health',
      desc: 'Enjoy crystal clear, resilient skin and denser hair with structured follow-ups and barrier protection.'
    }
  ];

  /*
   * NOTE: The testimonials below are sample reviews representing clinical feedback.
   * Client can easily replace these quotes, names, and treatments with verified patient stories.
   */
  const testimonials = [
    {
      quote: "Dr. Hina Faisal completely transformed my skin before my wedding. The Bridal Glow Package cleared my persistent chin acne and gave me a luminous dewy finish that looked incredible even without heavy foundation.",
      author: "Ayesha K.",
      treatment: "Complete Bridal Glowing Package (Package 01)",
      rating: 5,
      city: "Hyderabad"
    },
    {
      quote: "After trying so many salon facials that left my face red, Dr. Hina's medical HydraFacial was on another level. My blackheads vanished, pores are tight, and my face feels hydrated for weeks.",
      author: "Dr. Maria S.",
      treatment: "Signature HydraFacial MD Elite",
      rating: 5,
      city: "Autobhan Road, Hyd"
    },
    {
      quote: "I was losing hair density along my parting after dengue fever. The PRP Hair Restoration package halted the shedding within 4 weeks and I see noticeable baby hairs coming in.",
      author: "Faizan M.",
      treatment: "Hair Restoration PRP Package (Package 05)",
      rating: 5,
      city: "Qasimabad"
    }
  ];

  const faqs = [
    {
      q: 'What are the clinic timings and how can I book an appointment?',
      a: `Dr. Hina Faisal consults Monday to Saturday from 7:00 PM to 9:00 PM at our clinic on Main Autobhan Road, Hyderabad. Because of high patient volume, appointments are scheduled in advance via our WhatsApp booking desk (+92 318 3939139).`
    },
    {
      q: 'Are the pre-wedding packages customizable for individual skin concerns?',
      a: 'Yes. While our packages (such as Package 01 Bridal Glow and Package 02 Whitening) are specifically curated, Dr. Hina Faisal assesses your specific skin and hair condition during the initial consultation and can adjust the peel concentrations or facial steps to suit your timeline.'
    },
    {
      q: 'Is laser hair reduction painful and safe for South Asian skin tones?',
      a: 'Our clinic uses state-of-the-art diode laser technology with integrated sapphire contact sub-zero cooling. It is virtually painless and specifically certified safe for Fitzpatrick phototypes III, IV, and V without risk of paradoxical hyperpigmentation.'
    },
    {
      q: 'What is the consultation fee for Dr. Hina Faisal?',
      a: 'The initial diagnostic consultation fee is Rs. 2,000, which includes detailed dermoscopy analysis and a full medical prescription. For patients opting for our comprehensive clinical packages, this consultation is complimentary.'
    },
    {
      q: 'Where is the clinic located on Autobhan Road?',
      a: 'We are situated in the Bone & Joint Hospital Building, right beside PK Roll Point on Main Autobhan Road, Hyderabad. Valet and patient parking is conveniently available.'
    }
  ];

  const bridalPackages = TREATMENTS.filter((t) => t.isPackage).slice(0, 4);

  return (
    <div className="relative overflow-hidden bg-[#FAF7F2]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:py-32 bg-[#0C3B2E] text-[#FAF7F2] overflow-hidden">
        {/* Soft Radial Ambient Glows */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#C5A059]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-[#165B4C]/40 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography & CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Eyebrow Label */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C5A059]/30 text-xs font-medium text-[#C5A059] backdrop-blur-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dr. Hina Faisal · Consultant Dermatologist</span>
              </motion.div>

              {/* Display Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance"
              >
                Skin that feels like{' '}
                <span className="italic font-normal text-gold-gradient">you</span>,{' '}
                again.
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg text-[#FAF7F2]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                Hyderabad’s premier clinical dermatology & aesthetics practice. We unite medical dermatology science with restorative aesthetic art to cultivate radiant, healthy skin and hair.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <button
                  onClick={() => openBooking()}
                  className="w-full sm:w-auto relative group overflow-hidden rounded-full p-[1px] shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#C5A059] via-[#E5C378] to-[#C5A059] animate-shimmer" />
                  <span className="relative flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#C5A059] to-[#B88E3A] hover:from-[#DDB66B] hover:to-[#C5A059] text-[#0C3B2E] font-bold text-sm tracking-wide rounded-full transition-all">
                    <Calendar className="w-4 h-4" />
                    <span>Book a Consultation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <Link
                  to="/packages"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/20 hover:border-[#C5A059] hover:bg-white/5 text-white font-medium text-sm transition-all text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Pre-Wedding Packages</span>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#FAF7F2]/70"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>100% Recommended on Facebook</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                  <span>7.7K+ Community</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span>Mon – Sat, 7 – 9 PM</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Layered Editorial Visuals (5 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Framed Card with Clinic Attached Asset */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl bg-[#08281F] aspect-4/5 group">
                  <img
                    src="/brand/package-hydrafacial-glow.jfif"
                    alt="Dr. Hina Faisal Clinic Treatment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = '/brand/clinic-room.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E] via-transparent to-black/30 pointer-events-none" />

                  {/* Overlaid Gold Card Banner */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-panel-dark text-white shadow-xl">
                    <span className="text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold block">
                      Signature Package 08
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                      Face Glowing Protocol
                    </h3>
                    <p className="text-xs text-[#FAF7F2]/80 mt-1 line-clamp-1">
                      3 Signature HydraFacials + 1 Glow Peel
                    </p>
                    <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-white/10">
                      <span className="font-mono text-sm font-bold text-[#C5A059]">
                        Rs. 20,000
                      </span>
                      <span className="font-mono text-xs text-white/50 line-through">
                        Rs. 28,000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Glass Pill 1: Specialist Badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                  className="absolute -top-5 -left-4 sm:-left-8 glass-panel-dark text-white px-4 py-2.5 rounded-2xl border border-[#C5A059]/40 shadow-xl flex items-center gap-3 backdrop-blur-md"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-white">Dr. Hina Faisal</span>
                    <span className="text-[10px] text-[#C5A059] block">Skin & Hair Specialist</span>
                  </div>
                </motion.div>

                {/* Floating Glass Pill 2: Autobhan Clinic */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-6 -right-4 sm:-right-6 glass-panel-dark text-white px-4 py-3 rounded-2xl border border-[#C5A059]/40 shadow-xl flex items-center gap-3 backdrop-blur-md max-w-xs"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Main Autobhan Road</span>
                    <span className="text-[10px] text-[#FAF7F2]/75 block">Bone & Joint Hospital Bldg</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE STRIP */}
      <section className="bg-[#FAF7F2] py-4 border-y border-[#C5A059]/20 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-xs font-serif tracking-[0.2em] uppercase text-[#0F4C3A]">
            {marqueeItems.concat(marqueeItems).map((item, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span className="font-semibold">{item}</span>
                <span className="text-[#C5A059]">✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED CLINICAL PROCEDURES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] block mb-2">
              Clinical Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F4C3A]">
              Specialist Clinical Treatments
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-xl font-light">
              Scientifically engineered protocols addressing deep pigment, acne scarring, epidermal dehydration, and hair thinning.
            </p>
          </div>

          <Link
            to="/treatments"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F4C3A] hover:text-[#C5A059] transition-colors group shrink-0"
          >
            <span>View All Procedures & Pricing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TREATMENTS.slice(0, 6).map((treatment) => (
            <TreatmentCard key={treatment.id} treatment={treatment} />
          ))}
        </div>
      </section>

      {/* 4. PRE-WEDDING PACKAGES SPOTLIGHT */}
      <section className="py-20 bg-white border-y border-[#C5A059]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] block mb-2">
                Curated by Dr. Hina Faisal
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F4C3A]">
                Pre-Wedding & Bridal Care
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-xl font-light">
                Multi-session combination packages designed to achieve radiant glow, even tone, and hair density before your big day.
              </p>
            </div>

            <Link
              to="/packages"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0F4C3A] hover:text-[#C5A059] transition-colors group shrink-0"
            >
              <span>Explore All 8 Packages</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bridalPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-6 bg-[#FAF7F2] rounded-3xl border border-[#C5A059]/20 flex flex-col justify-between hover:shadow-lg transition-all group"
              >
                <div>
                  <div className="aspect-4/3 rounded-2xl overflow-hidden mb-4 relative">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/brand/package-bridal-glow.jfif';
                      }}
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#0F4C3A] text-white text-[9px] font-bold uppercase tracking-wider">
                      {pkg.duration}
                    </div>
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#0F4C3A] line-clamp-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                    {pkg.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-mono text-base font-bold text-[#0F4C3A]">
                      {formatPKR(pkg.price)}
                    </span>
                    {pkg.originalPrice && (
                      <span className="font-mono text-xs text-neutral-400 line-through">
                        {formatPKR(pkg.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => openBooking(pkg)}
                    className="w-full py-2.5 px-3 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Book Package</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MEET DR. HINA FAISAL */}
      <section className="py-20 bg-[#FAF7F2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Doctor Portrait & Authentic Poster */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#C5A059]/30 shadow-2xl bg-[#0C3B2E] aspect-3/4">
                <img
                  src="/brand/dr-hina-faisal.jfif"
                  alt="Dr. Hina Faisal - Dermatologist Hyderabad"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.src = '/brand/radiant-result.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E] via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel-dark text-white">
                  <span className="text-[10px] text-[#C5A059] tracking-widest uppercase font-semibold">
                    Consultant Dermatologist
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Dr. Hina Faisal
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 mt-1">
                    Skin & Hair Specialist · Hyderabad, Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F4C3A]/5 border border-[#C5A059]/30 text-xs font-semibold text-[#0F4C3A]">
                <Activity className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>The Clinical Standard</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F4C3A] leading-tight">
                "Healthy skin is not a luxury. It is medicine, science, and confidence."
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                <p>
                  At Skin Nurture Clinic, <strong className="text-neutral-900 font-semibold">Dr. Hina Faisal</strong> approaches skin and hair not as superficial surfaces, but as vital living organs that reflect systemic health, hormonal harmony, and climate exposure.
                </p>
                <p>
                  Specializing in complex South Asian dermatological challenges—from hormonal melasma and post-acne scarring to androgenetic hair thinning—Dr. Hina formulates evidence-based clinical protocols that prioritize long-term skin barrier integrity.
                </p>
                <p className="italic text-[#0F4C3A] font-serif text-base pt-2">
                  "Every patient leaves our clinic with an empowered understanding of their skin chemistry, tailored medical care, and lifelong confidence."
                </p>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-200">
                <div className="p-3.5 rounded-2xl bg-white border border-[#C5A059]/20 text-center">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C3A] block">7.7K+</span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Facebook Community</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#C5A059]/20 text-center">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A059] block">100%</span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Recommendation</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#C5A059]/20 text-center">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C3A] block">12+</span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Years Study</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#C5A059]/20 text-center">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A059] block">5,000+</span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Treated Patients</span>
                </div>
              </div>

              {/* Doctor Consultation CTA */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => openBooking()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-full text-xs font-semibold tracking-wide transition-colors shadow-md"
                >
                  <Calendar className="w-4 h-4 text-[#C5A059]" />
                  <span>Book Private Consultation with Dr. Hina</span>
                </button>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#C5A059] text-[#0F4C3A] hover:bg-[#C5A059]/10 rounded-full text-xs font-semibold transition-colors"
                >
                  <span>Read Doctor's Full Bio</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. BEFORE / AFTER CLINICAL RESULTS */}
      <section className="py-20 bg-white border-y border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] block">
                Evidence-Based Outcomes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F4C3A] leading-tight">
                Visible Dermal Clarity in Every Protocol
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Our before and after outcomes are achieved through calibrated protocols—synergizing chemical exfoliation, vacuum deep extractions, and biological growth factors.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 bg-[#FAF7F2] rounded-2xl border border-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div className="text-xs text-neutral-700">
                    <strong className="block font-semibold text-[#0F4C3A]">Epidermal Barrier Recovery</strong>
                    Soothes micro-inflammation while fading stubborn acne marks.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-[#FAF7F2] rounded-2xl border border-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div className="text-xs text-neutral-700">
                    <strong className="block font-semibold text-[#0F4C3A]">Restored Follicle Caliber</strong>
                    Halts seasonal telogen shedding and builds noticeable scalp density.
                  </div>
                </div>
              </div>

              <Link
                to="/results"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F4C3A] hover:text-[#C5A059] transition-colors pt-2"
              >
                <span>View Full Patient Case Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Interactive Slider */}
            <div className="lg:col-span-7">
              <BeforeAfterSlider
                beforeImage="/brand/package-acne-scar.jfif"
                afterImage="/brand/radiant-result.jpg"
                beforeLabel="Initial Presentation"
                afterLabel="Post Treatment (3 Weeks)"
                title="Glow Protocol Results"
                description="Sample results showing refined epidermal texture, reduced erythema, and deep dermal hydration."
              />
            </div>

          </div>
        </div>
      </section>

      {/* 7. CLINICAL 4-STEP PROCESS */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] block mb-2">
            The Patient Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F4C3A] mb-4">
            How We Care for Your Skin & Hair
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto mb-16 font-light">
            A seamless medical framework from initial diagnostic scan to lasting cellular health.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {processSteps.map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-[#C5A059]/20 hover:border-[#C5A059] transition-all shadow-xs">
                <span className="font-mono text-3xl font-bold text-gold-gradient mb-3">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0F4C3A] mb-1">
                  {item.title}
                </h3>
                <span className="text-[11px] font-semibold text-[#C5A059] uppercase tracking-wider mb-2">
                  {item.subtitle}
                </span>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS CAROUSEL */}
      <section className="py-20 bg-white border-y border-[#C5A059]/15 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] block mb-2">
            Community Love & Trust
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4C3A] mb-12">
            What Hyderabad Says About Skin Nurture
          </h2>

          <div className="relative bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#C5A059]/25 shadow-xl">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#C5A059] text-[#C5A059]" />
              ))}
            </div>

            <p className="font-serif text-lg sm:text-2xl text-[#222426] leading-relaxed italic max-w-2xl mx-auto min-h-[100px] flex items-center justify-center">
              "{testimonials[activeTestimonial].quote}"
            </p>

            <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col items-center">
              <span className="font-serif text-lg font-bold text-[#0F4C3A]">
                {testimonials[activeTestimonial].author}
              </span>
              <span className="text-xs text-neutral-500 mt-0.5">
                {testimonials[activeTestimonial].treatment} · {testimonials[activeTestimonial].city}
              </span>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeTestimonial === idx ? 'w-8 bg-[#0F4C3A]' : 'w-2 bg-neutral-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] block mb-2">
              Patient Guidance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4C3A]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-neutral-200 overflow-hidden bg-white transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-semibold text-[#0F4C3A]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C5A059] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light border-t border-[#C5A059]/15">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. LUXURY CTA BANNER */}
      <section className="py-20 bg-gradient-to-br from-[#0C3B2E] via-[#0F4C3A] to-[#165B4C] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.18)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] block">
            Begin Your Skin Transformation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            Your skin deserves a specialist.
          </h2>
          <p className="text-xs sm:text-base text-[#FAF7F2]/80 max-w-xl mx-auto font-light leading-relaxed">
            Schedule a diagnostic appointment with Dr. Hina Faisal or speak with our clinical concierge via WhatsApp today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openBooking()}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#C5A059] to-[#B88E3A] hover:from-[#DDB66B] hover:to-[#C5A059] text-[#0C3B2E] font-bold text-xs uppercase tracking-wider rounded-full shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with Dr. Hina</span>
            </button>
            <a
              href={createWhatsAppConsultUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#C5A059]/50 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
