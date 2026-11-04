import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Calendar, Clock, MapPin, Sparkles, MessageCircle, CheckCircle2, ShieldCheck, Phone } from 'lucide-react';
import { TREATMENTS } from '../data/treatments';
import { CLINIC_INFO, formatPKR } from '../utils/constants';

const TIME_SLOTS = [
  '7:00 PM – 7:30 PM',
  '7:30 PM – 8:00 PM',
  '8:00 PM – 8:30 PM',
  '8:30 PM – 9:00 PM',
];

export const BookAppointment: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('trt-06');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [appointmentRef, setAppointmentRef] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const activeTreatment = TREATMENTS.find((t) => t.id === selectedId) || TREATMENTS[0];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim()) errs.name = 'Please provide your full name';
    if (!patientPhone.trim() || patientPhone.length < 10) {
      errs.phone = 'Please provide a valid Pakistani mobile number (e.g. 0318 3939139)';
    }
    return errs;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const refCode = `SNC-BOOK-${Math.floor(1000 + Math.random() * 9000)}`;
    setAppointmentRef(refCode);

    const waText = `*Clinical Appointment Booking - Skin Nurture Clinic*
----------------------------------------
*Patient Name:* ${patientName}
*WhatsApp Phone:* ${patientPhone}
*Procedure / Package:* ${activeTreatment.name}
*Fee:* ${formatPKR(activeTreatment.price)}
*Preferred Date:* ${preferredDate || 'Earliest available (Mon-Sat)'}
*Preferred Time Slot:* ${preferredSlot}
${notes ? `*Patient Notes:* ${notes}\n` : ''}
*Ref Code:* ${refCode}
----------------------------------------
_Please confirm my consultation with Dr. Hina Faisal at Main Autobhan Road, Hyderabad._`;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F4C3A', '#C5A059', '#E5C378', '#FAF7F2'],
      });
    } catch {
      // ignore
    }

    const waUrl = `https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-20 bg-[#FAF7F2] min-h-screen">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#C5A059]/30 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-[#0F4C3A] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-[#0F4C3A]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-[#C5A059] uppercase font-bold tracking-widest block">
                Appointment Reference: {appointmentRef}
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#0F4C3A]">
                Appointment Request Submitted!
              </h1>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                Thank you, <strong className="text-neutral-900 font-semibold">{patientName}</strong>. Your consultation details have been sent to our WhatsApp desk. Our coordinator will verify doctor availability and confirm your {preferredSlot} slot.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-neutral-200 text-left text-xs text-neutral-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Doctor:</span>
                <span className="font-semibold text-neutral-900">Dr. Hina Faisal (Dermatologist)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Service:</span>
                <span className="font-semibold text-neutral-900">{activeTreatment.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Slot:</span>
                <span className="font-semibold text-neutral-900">{preferredSlot}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-2 font-bold text-[#0F4C3A]">
                <span>Consultation / Package Fee:</span>
                <span className="font-mono text-sm">{formatPKR(activeTreatment.price)}</span>
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
                <span>Open WhatsApp Desk</span>
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

  return (
    <div className="pt-28 pb-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] block">
            Clinical Scheduling Suite
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0F4C3A]">
            Book Your Consultation
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
            Reserve a diagnostic session with Dr. Hina Faisal at our Autobhan Road clinic. Operating Monday to Saturday from 7:00 PM to 9:00 PM.
          </p>
        </div>

        {/* 2-Column Suite: Form (7 cols) + Selected Procedure Details (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#C5A059]/20 shadow-xl space-y-5">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#0F4C3A]">
                Patient & Appointment Details
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Kindly fill out the form below to initiate your appointment.
              </p>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Procedure or Package *
                </label>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-xs text-neutral-800 font-medium focus:outline-none focus:border-[#C5A059]"
                >
                  <optgroup label="Consultation">
                    <option value="trt-06">Dermatologist Diagnostic Consultation (Rs. 2,000)</option>
                  </optgroup>
                  <optgroup label="Pre-Wedding & Bridal Care Packages">
                    <option value="pkg-01">Complete Bridal Glowing Package (Rs. 55,000)</option>
                    <option value="pkg-02">Whitening Glowing Package (Rs. 43,000)</option>
                    <option value="pkg-03">Acne Scar Correction Package (Rs. 35,000)</option>
                    <option value="pkg-04">Anti-Pigmentation Skin Care Package (Rs. 24,000)</option>
                    <option value="pkg-05">Hair Restoration & Density Package (Rs. 65,000)</option>
                    <option value="pkg-06">Skin Rejuvenation & Lip Plump Package (Rs. 40,000)</option>
                    <option value="pkg-07">Laser Hair Reduction Body Package (Rs. 28,000)</option>
                    <option value="pkg-08">Face Glowing Package (Rs. 20,000)</option>
                  </optgroup>
                  <optgroup label="Clinical Dermatology & Aesthetic Treatments">
                    <option value="trt-01">Signature HydraFacial MD Elite (Rs. 6,500)</option>
                    <option value="trt-02">Medical Chemical Peel (Rs. 4,500)</option>
                    <option value="trt-03">Platelet-Rich Plasma (PRP) Face Vampire Facial (Rs. 14,000)</option>
                    <option value="trt-04">PRP Hair Loss & Scalp Density Therapy (Rs. 12,000)</option>
                    <option value="trt-05">Laser Hair Reduction Single Session (Rs. 8,000)</option>
                    <option value="trt-07">Carbon Laser Hollywood Glow Peel (Rs. 7,500)</option>
                    <option value="trt-08">Collagen Induction Microneedling (Rs. 9,000)</option>
                  </optgroup>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Khan"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none ${
                      errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-300 focus:border-[#C5A059]'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0318 3939139"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none ${
                      errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-neutral-300 focus:border-[#C5A059]'
                    }`}
                  />
                  {errors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Preferred Day (Mon – Sat)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. This Thursday"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Time Slot (7:00 PM – 9:00 PM)
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs font-medium focus:outline-none focus:border-[#C5A059]"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Specific Skin/Hair Conditions or Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you would like Dr. Hina Faisal to assess..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#0F4C3A] hover:bg-[#0C3B2E] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Submit & Confirm on WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Zero Advance Deposit Required · Pay at the Clinic</span>
              </div>
            </form>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0C3B2E] text-white p-6 sm:p-8 rounded-3xl border border-[#C5A059]/30 shadow-xl space-y-5">
              <div>
                <span className="text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold block">
                  Selected Procedure
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {activeTreatment.name}
                </h3>
                <span className="text-xs text-[#FAF7F2]/80 mt-1 block">
                  {activeTreatment.duration}
                </span>
              </div>

              <div className="aspect-16/10 rounded-2xl overflow-hidden border border-[#C5A059]/30">
                <img
                  src={activeTreatment.image}
                  alt={activeTreatment.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="text-white/60">Procedure / Package Fee:</span>
                  <span className="font-mono text-xl font-bold text-[#C5A059]">
                    {formatPKR(activeTreatment.price)}
                  </span>
                </div>
                {activeTreatment.originalPrice && (
                  <div className="flex justify-between items-baseline text-white/50 text-[11px]">
                    <span>Original Price:</span>
                    <span className="line-through font-mono">
                      {formatPKR(activeTreatment.originalPrice)}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#FAF7F2]/85 leading-relaxed font-light">
                <strong className="text-white font-semibold block mb-0.5">Doctor's Note:</strong>
                {activeTreatment.doctorNote}
              </div>

              <div className="space-y-1.5 text-xs text-white/70 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Monday to Saturday, 7:00 PM – 9:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Main Autobhan Road, Hyderabad</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Direct Hotline: {CLINIC_INFO.phoneDisplay}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
