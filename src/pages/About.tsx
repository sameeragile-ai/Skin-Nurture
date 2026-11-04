import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Heart, Sparkles, Clock, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { CLINIC_INFO, createWhatsAppConsultUrl } from '../utils/constants';

export const About: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#FAF7F2] min-h-screen">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] block">
            The Philosophy of Dermal Health
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F4C3A]">
            About Skin Nurture Clinic
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-light leading-relaxed">
            Founded by <strong className="text-neutral-900 font-semibold">Dr. Hina Faisal</strong>, Skin Nurture Clinic was established to bring world-class dermatological science and compassionate clinical care to Hyderabad, Pakistan.
          </p>
        </div>

        {/* Clinic Wide Banner Image */}
        <div className="mt-10 rounded-3xl overflow-hidden border border-[#C5A059]/30 shadow-xl max-h-[360px] w-full bg-[#0C3B2E] relative">
          <img
            src="/brand/clinic-room.jpg"
            alt="Skin Nurture Clinic Treatment Suite Hyderabad"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/brand/logo-banner.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white space-y-1">
              <span className="text-xs text-[#C5A059] uppercase tracking-widest font-semibold">
                Clinical Excellence
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Main Autobhan Road, Hyderabad Sanctuary
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Meet Dr. Hina Faisal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#C5A059]/20 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl bg-[#08281F] aspect-3/4">
              <img
                src="/brand/dr-hina-faisal.jfif"
                alt="Dr. Hina Faisal - Dermatologist"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.src = '/brand/radiant-result.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E]/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel-dark text-white text-center">
                <h3 className="font-serif text-xl font-bold text-white">Dr. Hina Faisal</h3>
                <p className="text-xs text-[#C5A059] font-medium mt-0.5">
                  Consultant Dermatologist, Skin & Hair Specialist
                </p>
                <p className="text-[10px] text-white/60 mt-1">
                  Bone & Joint Hospital Building, Hyderabad
                </p>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F4C3A]/5 border border-[#C5A059]/30 text-xs font-semibold text-[#0F4C3A]">
              <Award className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Medical Credentials & Care</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4C3A] leading-tight">
              A Personal Note From Dr. Hina Faisal
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              <p>
                "Skin is the human body’s largest and most communicative organ. When skin experiences flare-ups, breakouts, dullness, or premature aging, it is communicating a biological story that requires medical understanding, not hasty masking."
              </p>
              <p>
                "At Skin Nurture Clinic, my focus has always been on precision diagnosis. Whether a patient walks in with resistant hormonal melasma, distress over sudden hair shedding, or acne scarring that has shattered their self-esteem, we treat each person as an individual case study. We combine medical therapies with gentle aesthetic technologies so you achieve resilient skin that glows naturally."
              </p>
              <p>
                "I invite you to experience skincare that honors both science and self-love at our Autobhan Road practice."
              </p>
            </div>

            {/* Doctor Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
              <div className="flex items-start gap-3 p-3.5 bg-[#FAF7F2] rounded-2xl border border-neutral-200">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="font-semibold text-[#0F4C3A] block">Evidence-Based Medicine</strong>
                  Zero unproven salon fads; strictly FDA & CE cleared protocols.
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 bg-[#FAF7F2] rounded-2xl border border-neutral-200">
                <Heart className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="font-semibold text-[#0F4C3A] block">Barrier Preservation</strong>
                  We rebuild your epidermal acid mantle for lasting resilience.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={createWhatsAppConsultUrl("Hello Dr. Hina! I read about your clinic background and would love to book a consultation.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-full text-xs font-semibold tracking-wide transition-colors shadow-md"
              >
                <span>Book Appointment With Dr. Hina</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Clinical Standards & Sterile Protocols */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] block mb-2">
            Sterility & Equipment
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4C3A]">
            The Highest Standards of Clinical Safety
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white rounded-3xl border border-[#C5A059]/20 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F4C3A]/10 text-[#0F4C3A] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F4C3A]">Hospital-Grade Sterilization</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Single-use micro-needles, autoclave instrument cycles, and surgical skin preparation ensure a 100% sterile environment for all injectables and facial treatments.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-[#C5A059]/20 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F4C3A]/10 text-[#0F4C3A] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F4C3A]">Certified Sapphire-Cooling Lasers</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Our 808nm diode systems deliver targeted thermal energy to follicular roots while continuously chilling the epidermal surface to prevent discoloration on Asian skin tones.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-[#C5A059]/20 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F4C3A]/10 text-[#0F4C3A] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F4C3A]">Pure Autologous Growth Factors</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              We use calibrated medical centrifuges to isolate pure, viable platelet concentrates for hair rejuvenation and vampire facials without chemical coagulants.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Location & Visiting Hours */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0C3B2E] text-white border border-[#C5A059]/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
              Visiting Our Hyderabad Practice
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Centrally Located on Autobhan Road
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-light leading-relaxed">
              We are located in the Bone & Joint Hospital Building, right beside PK Roll Point on Main Autobhan Road. Easy parking and discreet clinical consultation suites.
            </p>

            <div className="pt-2 space-y-2 text-xs text-[#FAF7F2]/90">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span><strong>Hours:</strong> {CLINIC_INFO.timings}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span><strong>Address:</strong> {CLINIC_INFO.address}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <a
              href={createWhatsAppConsultUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-6 bg-gradient-to-r from-[#C5A059] to-[#B88E3A] hover:from-[#DDB66B] hover:to-[#C5A059] text-[#0C3B2E] font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-lg transition-all"
            >
              Book Consultation Via WhatsApp
            </a>
            <Link
              to="/contact"
              className="py-4 px-6 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider rounded-xl text-center border border-white/20 transition-colors"
            >
              View Detailed Directions & Map
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
