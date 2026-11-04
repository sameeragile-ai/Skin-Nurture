import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { CLINIC_INFO, createWhatsAppConsultUrl } from '../utils/constants';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    concern: 'General Consultation',
    preferredDate: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name';
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Please provide a valid Pakistani mobile number (e.g. 0300 1234567)';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    
    // Construct pre-filled WhatsApp message
    const waText = `*Clinical Consultation Request*
-----------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Concern:* ${formData.concern}
*Preferred Time:* ${formData.preferredDate || 'Earliest available (7-9 PM)'}
${formData.message ? `*Notes:* ${formData.message}\n` : ''}
_Requesting confirmation for Dr. Hina Faisal at Autobhan Road clinic._`;

    // Open WhatsApp in new tab
    const url = `https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${encodeURIComponent(waText)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] block">
            We Are Here For You
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F4C3A]">
            Contact & Clinic Location
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-light leading-relaxed">
            Conveniently situated on Autobhan Road, Hyderabad. Book an in-person consultation with <strong className="text-neutral-900 font-semibold">Dr. Hina Faisal</strong> or speak with our clinical concierge.
          </p>
        </div>

        {/* Contact Grid: Form (7 cols) + Info Card (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#C5A059]/20 shadow-xl">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
                Direct Appointment Booking
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C3A] mt-1">
                Schedule Your Visit
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Fill out the details below. We will instantly format your inquiry and connect you with Dr. Hina Faisal's team on WhatsApp.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-[#0F4C3A]/5 rounded-2xl border border-[#C5A059]/30 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#0F4C3A] mx-auto" />
                <h3 className="font-serif text-xl font-bold text-[#0F4C3A]">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                  Your appointment request was forwarded to our WhatsApp booking desk. A clinical coordinator will confirm your 7:00 PM – 9:00 PM slot shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-[#0F4C3A] text-white rounded-xl text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Zahra"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-neutral-200 focus:border-[#C5A059]'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none transition-colors ${
                        errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-neutral-200 focus:border-[#C5A059]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                      Primary Concern
                    </label>
                    <select
                      value={formData.concern}
                      onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#C5A059] bg-white text-neutral-800"
                    >
                      <option>General Dermatology Consultation</option>
                      <option>Acne Correction & Scars</option>
                      <option>HydraFacial MD Elite</option>
                      <option>Bridal Glow Package</option>
                      <option>PRP Hair Loss Therapy</option>
                      <option>Laser Hair Reduction</option>
                      <option>Chemical Peel & Pigmentation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Preferred Date / Day (Mon – Sat)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. This Thursday, 7:30 PM"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#C5A059]"
                  />
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">
                    Clinic operates Monday to Saturday between 7:00 PM and 9:00 PM.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Medical History / Specific Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what you would like Dr. Hina Faisal to assess..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Send Request & Open WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0C3B2E] text-white p-8 rounded-3xl border border-[#C5A059]/30 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold block">
                  Location & Practice
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                  Skin Nurture Clinic
                </h3>
                <p className="text-xs text-[#FAF7F2]/80 mt-1">
                  Dr. Hina Faisal · Consultant Dermatologist
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#FAF7F2]/85 pt-2 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Address:</strong>
                    <span>{CLINIC_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Consultation Hours:</strong>
                    <span>Monday – Saturday: 7:00 PM – 9:00 PM</span>
                    <span className="block text-white/50 text-[11px] mt-0.5">Sunday: Closed</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C5A059] shrink-0" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Direct Line / WhatsApp:</strong>
                    <a
                      href={`tel:${CLINIC_INFO.phoneInternational}`}
                      className="hover:text-[#C5A059] transition-colors"
                    >
                      {CLINIC_INFO.phoneDisplay} / {CLINIC_INFO.phoneInternational}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C5A059] shrink-0" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">Email Desk:</strong>
                    <a
                      href={`mailto:${CLINIC_INFO.email}`}
                      className="hover:text-[#C5A059] transition-colors"
                    >
                      {CLINIC_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${CLINIC_INFO.phoneInternational}`}
                  className="py-3 px-4 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold text-center border border-white/20 transition-colors"
                >
                  Call Clinic
                </a>
                <a
                  href={createWhatsAppConsultUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-gradient-to-r from-[#C5A059] to-[#B88E3A] text-[#0C3B2E] rounded-xl text-xs font-bold text-center shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Directions Tip */}
            <div className="p-5 bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-600 space-y-1">
              <strong className="text-[#0F4C3A] block font-semibold">Landmark Tip:</strong>
              <p>
                Located in the Bone & Joint Hospital Building, adjacent to PK Roll Point on Main Autobhan Road. Dedicated patient valet/parking available.
              </p>
            </div>
          </div>

        </div>

        {/* Full-Width Interactive Google Map */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#C5A059]/20 shadow-xl overflow-hidden">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#0F4C3A]">
                Autobhan Road Clinical Map
              </h3>
              <p className="text-xs text-neutral-500">
                Main Autobhan Road, Hyderabad, Sindh
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Autobhan+Road+Hyderabad+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#0F4C3A] font-semibold hover:underline"
            >
              Open in Google Maps App →
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-neutral-200">
            <iframe
              title="Skin Nurture Clinic Autobhan Road Map"
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
    </div>
  );
};
