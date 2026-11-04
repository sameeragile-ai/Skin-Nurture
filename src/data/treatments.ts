export interface Treatment {
  id: string;
  name: string;
  category: 'Packages' | 'Skin' | 'Hair' | 'Aesthetic' | 'Laser';
  tag?: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  doctorNote: string;
  isPackage?: boolean;
}

export const TREATMENTS: Treatment[] = [
  {
    id: 'pkg-01',
    name: 'Complete Bridal Glowing Package (Package 01)',
    category: 'Packages',
    tag: 'Signature Bridal',
    duration: '4-6 Weeks Protocol',
    price: 55000,
    originalPrice: 74000,
    image: '/brand/package-bridal-glow.jfif',
    shortDesc: 'Comprehensive bridal skin & hair overhaul with facials, peels, microneedling and laser hair reduction.',
    fullDesc: 'The ultimate pre-wedding transformation curated by Dr. Hina Faisal. Designed to eliminate texture, brighten dullness, and ensure flawless radiance on your special day.',
    highlights: [
      '3 Signature HydraFacials MD',
      '2 Medical Chemical Peels',
      '1 Collagen Microneedling',
      '3 Laser Hair Reduction Sessions',
      '1 Final Glow Ceremony Session',
      'Complimentary Doctor Consultation'
    ],
    doctorNote: 'Recommended to begin 6 to 8 weeks before wedding festivities for maximum cell turnover.',
    isPackage: true
  },
  {
    id: 'pkg-02',
    name: 'Whitening Glowing Package (Package 02)',
    category: 'Packages',
    tag: 'Luminosity',
    duration: '3-4 Weeks Protocol',
    price: 43000,
    originalPrice: 65000,
    image: '/brand/package-whitening-glowing.jfif',
    shortDesc: 'Intense dermal radiance cocktail featuring medical-grade brightening infusions, facials & peel therapy.',
    fullDesc: 'Formulated specifically for pigmented, sun-damaged, or uneven skin tones seeking a luminous, glass-skin glow.',
    highlights: [
      '3 Signature HydraFacials MD',
      '2 Custom Brightening Peels',
      '1 Micro-Needling Session',
      '2 Medical Whitening Infusions',
      'Deep hydration serum infusion'
    ],
    doctorNote: 'Combines safe medical antioxidants with epidermal rejuvenation for lasting glow.',
    isPackage: true
  },
  {
    id: 'pkg-03',
    name: 'Acne Scar Correction Package (Package 03)',
    category: 'Packages',
    tag: 'Clinical Care',
    duration: '4-5 Weeks Protocol',
    price: 35000,
    originalPrice: 49000,
    image: '/brand/package-acne-scar.jfif',
    shortDesc: 'Targeted clinical protocol for active acne, cystic marks, and post-inflammatory erythema.',
    fullDesc: 'Clinical combination therapy targeting active breakout bacteria, reducing sebaceous hyper-activity, and healing deep acne scars.',
    highlights: [
      '3 Clinical Acne Peels (Salicylic / Azelaic)',
      '3 Deep-Cleansing Extraction Facials',
      '2 Autologous PRP Face Sessions',
      'Complimentary Medical Consultation'
    ],
    doctorNote: 'Focuses on sebum balance first, then accelerates dermal remodeling to soften indented scars.',
    isPackage: true
  },
  {
    id: 'pkg-04',
    name: 'Anti-Pigmentation Skin Care Package (Package 04)',
    category: 'Packages',
    tag: 'Melasma Care',
    duration: '3-4 Weeks Protocol',
    price: 24000,
    originalPrice: 32500,
    image: '/brand/package-anti-pigmentation.jfif',
    shortDesc: 'Target melasma, sun freckles, and dark patches with synergistic brightening peels and mesotherapy.',
    fullDesc: 'Hyperpigmentation requires careful multi-depth treatment to avoid rebound discoloration. This regimen provides regulated melanin suppression.',
    highlights: [
      '3 Medical Brightening Peels',
      '2 Signature HydraFacials MD',
      '2 Mesotherapy Brightening Sessions',
      'Custom Home Skincare Plan'
    ],
    doctorNote: 'Formulated specifically for Pakistani skin phototypes prone to stubborn epidermal pigment.',
    isPackage: true
  },
  {
    id: 'pkg-05',
    name: 'Hair Restoration & Density Package (Package 05)',
    category: 'Packages',
    tag: 'Hair Specialist',
    duration: '8-12 Weeks Protocol',
    price: 65000,
    originalPrice: 85000,
    image: '/brand/package-hair-restoration.jfif',
    shortDesc: 'Medical-grade concentrated PRP + stem-cell exosome infusion to combat hair thinning and telogen effluvium.',
    fullDesc: 'Our highest-strength scalp rejuvenation protocol for both men and women struggling with thinning crowns, receding lines, or severe postpartum shedding.',
    highlights: [
      '4 Autologous PRP Scalp Sessions',
      '2 Scalp Mesotherapy Cocktails',
      '1 Clinical Exosome Follicle Booster',
      'Free Digital Trichoscopy Consultation'
    ],
    doctorNote: 'Reactivates miniaturized follicles, thickens hair shaft caliber, and halts excessive daily hair shedding.',
    isPackage: true
  },
  {
    id: 'pkg-06',
    name: 'Skin Rejuvenation & Lip Plump Package (Package 06)',
    category: 'Packages',
    tag: 'Youth Boost',
    duration: '3 Weeks Protocol',
    price: 40000,
    originalPrice: 55000,
    image: '/brand/package-microneedling-prp.jfif',
    shortDesc: 'Complete texture refinement, pore tightening, collagen synthesis, and subtle natural lip hydration.',
    fullDesc: 'For smoothing fine lines, tightening enlarged pores, and imparting a bouncy, refreshed elasticity to the entire face and lips.',
    highlights: [
      '3 Collagen Induction Microneedling',
      '2 Vampire Face PRP Sessions',
      '2 Deep Hydration HydraFacials',
      '1 Hyaluronic Lip Booster Treatment'
    ],
    doctorNote: 'Stimulates native type-I collagen for noticeable firmness and youthful contouring.',
    isPackage: true
  },
  {
    id: 'pkg-07',
    name: 'Laser Hair Reduction Full Body Package (Package 07)',
    category: 'Packages',
    tag: 'Diode Laser',
    duration: '6 Sessions',
    price: 28000,
    originalPrice: 40000,
    image: '/brand/package-laser-hair.jfif',
    shortDesc: 'Painless triple-wavelength diode laser hair reduction covering Face, Hands, Legs, and Underarms.',
    fullDesc: 'Say goodbye to razor burns, ingrown hairs, and endless waxing with our medical-grade ice-cooling diode laser technology.',
    highlights: [
      '6 Sessions for Face & Neck',
      '6 Sessions for Full Arms & Hands',
      '6 Sessions for Full Legs & Feet',
      '6 Sessions for Underarms',
      'Advanced Ice-Tip Contact Cooling'
    ],
    doctorNote: 'Safe and painless on all olive and darker skin tones without burning risk.',
    isPackage: true
  },
  {
    id: 'pkg-08',
    name: 'Face Glowing Package (Package 08)',
    category: 'Packages',
    tag: 'Quick Radiance',
    duration: '2 Weeks Protocol',
    price: 20000,
    originalPrice: 28000,
    image: '/brand/package-hydrafacial-glow.jfif',
    shortDesc: 'Fast event-prep package with 3 signature HydraFacials and 1 instant luminosity peel.',
    fullDesc: 'Perfect for attending weddings, milestone birthdays, or photoshoots. Restores instant glow and glass-like clarity.',
    highlights: [
      '3 Signature Medical HydraFacials',
      '1 Instant Radiance Glow Peel',
      'Enzyme Exfoliation & Blackhead Extraction',
      'Antioxidant Shield Finishing Mask'
    ],
    doctorNote: 'Zero downtime; leaves skin deeply hydrated, bouncy, and receptive to makeup.',
    isPackage: true
  },
  {
    id: 'trt-01',
    name: 'Signature HydraFacial MD Elite',
    category: 'Skin',
    tag: 'Clinical Facial',
    duration: '60 mins',
    price: 6500,
    image: '/brand/package-hydrafacial-glow.jfif',
    shortDesc: 'Three-stage patented vortex suction for deep pore extraction, lactic exfoliation, and hyaluronic infusion.',
    fullDesc: 'The gold-standard medical facial that painlessly dislodges stubborn blackheads, clears sebum congestion, and drenches dehydrated cells with restorative peptides.',
    highlights: ['Vortex-fusion vacuum technology', 'Gentle non-stripping AHA/BHA peel', 'Targeted antioxidant infusion', 'Immediate dewy glow with zero redness'],
    doctorNote: 'Ideal once monthly for maintaining healthy skin barrier and sebum balance.',
    isPackage: false
  },
  {
    id: 'trt-02',
    name: 'Medical Chemical Peel (Bespoke Grade)',
    category: 'Skin',
    duration: '45 mins',
    price: 4500,
    image: '/brand/package-anti-pigmentation.jfif',
    shortDesc: 'Custom-blended salicylic, mandelic, or TCA formulation targeting pigmentation, fine lines, and active blemishes.',
    fullDesc: 'An exact dermatological chemical exfoliation matched precisely to your Fitzpatrick skin type to dissolve dead surface keratin and reveal fresh radiant epidermis.',
    highlights: ['Custom percentage matching', 'Safe on Pakistani skin tones', 'Improves cellular turnover', 'Reduces post-acne pigmentation'],
    doctorNote: 'Sunscreen application is strictly mandatory following chemical resurfacing.',
    isPackage: false
  },
  {
    id: 'trt-03',
    name: 'Platelet-Rich Plasma (PRP) Face Vampire Rejuvenation',
    category: 'Aesthetic',
    tag: 'Cellular Therapy',
    duration: '75 mins',
    price: 14000,
    image: '/brand/package-microneedling-prp.jfif',
    shortDesc: 'Harnesses your body\'s own platelets and growth factors to trigger profound dermal repair and collagen.',
    fullDesc: 'Blood is drawn, centrifuged to concentrate viable platelet growth factors, and meticulously micro-infused into the dermis for firming and cellular renewal.',
    highlights: ['100% biocompatible autologous serum', 'Softens deep tear troughs & smile lines', 'Minimizes stubborn acne scarring', 'Topical medical numbing for maximum comfort'],
    doctorNote: 'Gold standard for biological skin rejuvenation with long-lasting structural results.',
    isPackage: false
  },
  {
    id: 'trt-04',
    name: 'PRP Hair Loss & Scalp Density Therapy',
    category: 'Hair',
    tag: 'Scalp Health',
    duration: '60 mins',
    price: 12000,
    image: '/brand/package-hair-restoration.jfif',
    shortDesc: 'Targeted micro-injections of concentrated autologous plasma directly into thinning hair follicles.',
    fullDesc: 'Stimulates inactive follicular dermal papilla cells, enhances micro-vascular blood supply to the scalp, and reverses pattern thinning.',
    highlights: ['Halts sudden seasonal and stress hair shedding', 'Encourages thicker hair diameter', 'Minimal downtime', 'Visible improvement within 3 sessions'],
    doctorNote: 'Most effective when paired with clinical hair serum and balanced nutritional support.',
    isPackage: false
  },
  {
    id: 'trt-05',
    name: 'Laser Hair Reduction (Single Zone Session)',
    category: 'Laser',
    duration: '30-45 mins',
    price: 8000,
    image: '/brand/package-laser-hair.jfif',
    shortDesc: 'Precision diode laser treatment with dynamic sapphire contact cooling for permanent hair reduction.',
    fullDesc: 'Destroys melanin in the hair bulb while sparing surrounding skin tissues. Safe, comfortable, and highly effective.',
    highlights: ['Sub-zero cooling handpiece', 'Eliminates ingrown hairs & bumps', 'Fast pass treatment', 'Customized energy density for safe treatment'],
    doctorNote: 'Requires hairs to be shaved 24 hours prior; avoid waxing or threading before your visit.',
    isPackage: false
  },
  {
    id: 'trt-06',
    name: 'Dermatologist Diagnostic Consultation',
    category: 'Skin',
    tag: 'First Step',
    duration: '30 mins',
    price: 2000,
    image: '/brand/dr-hina-faisal.jfif',
    shortDesc: 'Comprehensive one-on-one diagnostic assessment with Dr. Hina Faisal with digital analysis and custom plan.',
    fullDesc: 'Thorough evaluation of your skin conditions (acne, eczema, psoriasis, melasma, alopecia) and formulation of an evidence-based clinical treatment plan.',
    highlights: ['Microscopic dermoscopy examination', 'Root-cause pathology identification', 'Prescription medication & skincare regimen', 'Direct lifestyle & nutrition guidance'],
    doctorNote: 'The crucial starting point for any clinical aesthetic or medical dermatology path.',
    isPackage: false
  },
  {
    id: 'trt-07',
    name: 'Carbon Laser Hollywood Glow Peel',
    category: 'Laser',
    tag: 'Pore Tightening',
    duration: '45 mins',
    price: 7500,
    image: '/brand/clinic-room.jpg',
    shortDesc: 'Liquid medical carbon suspension activated by Q-switched laser to vaporize dead keratin and shrink enlarged pores.',
    fullDesc: 'Known internationally as the Hollywood Peel. Provides instant luminosity, exfoliates stubborn blackheads, and tightens pores with no downtime or peeling.',
    highlights: ['Nanosecond Q-switched laser pulse', 'Purifies congested sebaceous pores', 'Stimulates gentle collagen tightening', 'Immediate radiant glass skin'],
    doctorNote: 'An excellent event-ready treatment for oily and congested skin.',
    isPackage: false
  },
  {
    id: 'trt-08',
    name: 'Collagen Induction Medical Microneedling',
    category: 'Aesthetic',
    duration: '60 mins',
    price: 9000,
    image: '/brand/radiant-result.jpg',
    shortDesc: 'Precision motorized micro-punctures triggering natural wound-healing cascade, hyaluronic infusion, and elastin.',
    fullDesc: 'Creates thousands of microscopic micro-channels in the dermis, accelerating cellular collagen production to smooth fine lines, soften indented scars, and shrink pores.',
    highlights: ['Adjustable needle depth up to 2.5mm', 'Sterile single-use cartridge', 'Medical numbing included', 'Replaces damaged scar tissue with fresh collagen'],
    doctorNote: 'Optimal for textured skin, enlarged pores, and post-acne marks.',
    isPackage: false
  }
];
