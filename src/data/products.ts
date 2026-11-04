export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Sun Care' | 'Serums' | 'Moisturizers' | 'Cleansers' | 'Hair Care' | 'Treatments';
  badge?: 'Bestseller' | 'New' | 'Clinical Pick' | 'Doctor Favorite';
  price: number;
  originalPrice?: number;
  size: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  benefits: string[];
  keyIngredients: string[];
  howToUse: string;
  skinType: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'NurtureShield Invisible Velvet Sunscreen SPF 50+',
    subtitle: 'Broad Spectrum PA++++ Broad Defense Fluid',
    category: 'Sun Care',
    badge: 'Bestseller',
    price: 1950,
    originalPrice: 2400,
    size: '50 ml / 1.7 fl oz',
    rating: 4.9,
    reviewsCount: 128,
    image: '/brand/hero-serum.jpg',
    description: 'Ultra-lightweight, zero white-cast daily photoprotection designed specifically for Pakistani heat and humidity. Dries down to an undetectable velvet matte finish.',
    benefits: [
      'Zero white cast, non-greasy velvet touch',
      'Protects against UVA, UVB, and high-energy visible blue light',
      'Sweat and water-resistant for up to 80 minutes',
      'Infused with calming Cica to prevent sun erythema'
    ],
    keyIngredients: ['Zinc Oxide (Micro-dispersion)', 'Niacinamide 2%', 'Centella Asiatica Extract', 'Vitamin E Acetate'],
    howToUse: 'Apply two finger lengths evenly to face and neck 15 minutes before sun exposure. Reapply every 2 to 3 hours when outdoors.',
    skinType: 'All skin types, especially acne-prone and sensitive'
  },
  {
    id: 'prod-02',
    name: 'Radiant C20 Triple Antioxidant Glow Serum',
    subtitle: '20% Stabilized L-Ascorbic Acid + Ferulic + Vitamin E',
    category: 'Serums',
    badge: 'Doctor Favorite',
    price: 2850,
    originalPrice: 3500,
    size: '30 ml / 1.0 fl oz',
    rating: 5.0,
    reviewsCount: 96,
    image: '/brand/hero-serum.jpg',
    description: 'High-potency clinical vitamin C elixir formulated at optimal pH (3.2) to fade stubborn hyperpigmentation, brighten dullness, and neutralize free-radical environmental stress.',
    benefits: [
      'Visibly fades post-inflammatory hyperpigmentation in 4 weeks',
      'Boosts natural collagen synthesis for firmer skin',
      'Provides 8x photoprotection synergy when worn under sunscreen',
      'Stabilized against amber oxidation'
    ],
    keyIngredients: ['20% Ethyl Ascorbic Acid', '1% Ferulic Acid', '1% Alpha Tocopherol (Vitamin E)', 'Hyaluronic Acid'],
    howToUse: 'Apply 4-5 drops every morning onto clean, dry skin before moisturizer and SPF.',
    skinType: 'Normal, dull, combination, and mature skin'
  },
  {
    id: 'prod-03',
    name: 'Cellular Barrier Velvet Hydrating Moisturizer',
    subtitle: 'Multi-Ceramide + Oat Beta-Glucan Lipid Cream',
    category: 'Moisturizers',
    badge: 'Bestseller',
    price: 2900,
    originalPrice: 3400,
    size: '50 ml / 1.7 oz jar',
    rating: 4.9,
    reviewsCount: 114,
    image: '/brand/moisturizer-cream.jpg',
    description: 'Luxuriously rich yet weightless barrier repair emulsion. Replenishes critical intercellular lipids depleted by aggressive acne treatments, sun, or dry winter weather.',
    benefits: [
      'Restores compromised skin barrier within 48 hours',
      'Locks in deep dermal hydration for 24 hours',
      'Soothes flaking, stinging, and micro-cracks',
      'Non-comedogenic, won\'t clog pores'
    ],
    keyIngredients: ['Ceramides NP, AP, EOP', 'Colloidal Oat Flour 2%', 'Plant Phytosphingosine', 'Shea Butter Fractions'],
    howToUse: 'Smooth a nickel-sized amount over face and neck morning and evening as the final hydration step.',
    skinType: 'Dry, dehydrated, compromised, or post-procedure skin'
  },
  {
    id: 'prod-04',
    name: 'Clarifying Niacinamide 10% + Zinc 1% Solution',
    subtitle: 'Pore Refinement & Sebum Regulation Elixir',
    category: 'Serums',
    badge: 'Clinical Pick',
    price: 2400,
    originalPrice: 2800,
    size: '30 ml / 1.0 fl oz',
    rating: 4.8,
    reviewsCount: 89,
    image: '/brand/hero-serum.jpg',
    description: 'Targeted blemish-control serum that tightens enlarged pores, normalizes excess oil production, and visibly fades dark acne spots without drying.',
    benefits: [
      'Reduces midday t-zone oiliness and shine',
      'Refines bumpy texture and visible pores',
      'Calms redness around active breakouts',
      'Compatible with other acne treatments'
    ],
    keyIngredients: ['10% High-Purity Niacinamide', '1% Zinc PCA', 'Allantoin', 'Tamarind Seed Gum'],
    howToUse: 'Dispense 3 drops across entire face morning and evening before heavier creams.',
    skinType: 'Oily, combination, and blemish-prone skin'
  },
  {
    id: 'prod-05',
    name: 'Pure Encapsulated Retinol 0.5% Night Elixir',
    subtitle: 'Time-Release Youth Retinol with Squalane',
    category: 'Treatments',
    badge: 'Doctor Favorite',
    price: 3600,
    originalPrice: 4200,
    size: '30 ml / 1.0 fl oz',
    rating: 4.9,
    reviewsCount: 78,
    image: '/brand/hero-serum.jpg',
    description: 'Micro-encapsulated pure retinol suspended in olive squalane for deep collagen stimulation with minimal irritation or flaking. Softens fine lines and firms sagging skin.',
    benefits: [
      'Accelerates cellular turnover to shed dead keratin',
      'Diminishes fine wrinkles and crow\'s feet',
      'Enhances dermal thickness and firmness',
      'Gradual time-release reduces retinol peeling'
    ],
    keyIngredients: ['0.5% Encapsulated Pure Retinol', 'Plant-Derived Squalane', 'Bisabolol', 'Coenzyme Q10'],
    howToUse: 'Begin 2 nights weekly. Apply 3-4 drops at night to dry skin. Follow with Cellular Barrier Cream.',
    skinType: 'Mature, sun-damaged, or aging skin (not for pregnant/nursing mothers)'
  },
  {
    id: 'prod-06',
    name: 'Follicle-Densifying Peptides & Biotin Hair Serum',
    subtitle: 'Multi-Action Scalp Density & Root Stimulating Drops',
    category: 'Hair Care',
    badge: 'New',
    price: 3200,
    originalPrice: 3800,
    size: '60 ml / 2.0 fl oz',
    rating: 4.9,
    reviewsCount: 65,
    image: '/brand/hero-serum.jpg',
    description: 'Doctor-formulated scalp leave-in serum utilizing Redensyl, Capixyl, and Rosemary extract to reactivate dormant hair follicles and improve hair density.',
    benefits: [
      'Significantly reduces daily hair fall and breakage',
      'Strengthens root anchorage in hair follicles',
      'Non-sticky, water-light formula that doesn\'t grease hair',
      'Improves scalp micro-circulation'
    ],
    keyIngredients: ['Redensyl 3%', 'Capixyl (Acetyl Tetrapeptide-3)', 'Rosemary Leaf Extract', 'Biotin & Caffeine'],
    howToUse: 'Part hair into sections and apply 1 full dropper directly onto clean scalp once daily. Massage gently. Do not rinse.',
    skinType: 'Thinning hair, receding hairline, excessive shedding'
  },
  {
    id: 'prod-07',
    name: 'Gentle Amino Acid Foaming Gel Cleanser',
    subtitle: 'pH 5.5 Barrier-Preserving Facial Wash',
    category: 'Cleansers',
    badge: 'Bestseller',
    price: 1800,
    size: '150 ml / 5.1 fl oz',
    rating: 4.8,
    reviewsCount: 142,
    image: '/brand/moisturizer-cream.jpg',
    description: 'Soap-free, sulfate-free cleanser powered by apple amino acids. Sweeps away sebum, pollutants, and makeup without leaving the skin tight, dry, or stripped.',
    benefits: [
      'Preserves the delicate acid mantle of the skin',
      'Provides rich cushiony micro-foam',
      'Rinses completely clean with no residue',
      'Fragrance-free and safe for post-procedure skin'
    ],
    keyIngredients: ['Apple Amino Acid Surfactants', 'Centella Asiatica', 'Glycerin 10%', 'Panthenol (Pro-Vitamin B5)'],
    howToUse: 'Pump small amount into damp palms, lather gently over wet face for 60 seconds, then rinse with lukewarm water.',
    skinType: 'All skin types, even eczema and rosacea'
  },
  {
    id: 'prod-08',
    name: 'Post-Procedure Cica Soothing Calming Balm',
    subtitle: 'Intensive Recovery Cream with Madecassoside',
    category: 'Treatments',
    badge: 'Clinical Pick',
    price: 2250,
    size: '50 ml / 1.7 oz tube',
    rating: 5.0,
    reviewsCount: 53,
    image: '/brand/moisturizer-cream.jpg',
    description: 'Formulated specifically for use immediately after HydraFacials, chemical peels, microneedling, and laser sessions. Speeds epidermal re-epithelialization.',
    benefits: [
      'Instantly relieves burning sensations and heat',
      'Reduces procedure redness and swelling',
      'Forms a breathable silicone-free protective shield',
      'Prevents post-treatment infections'
    ],
    keyIngredients: ['Madecassoside 0.2%', 'Copper Tripeptide-1', 'Zinc Oxide', 'Thermal Spring Minerals'],
    howToUse: 'Apply liberally to treated areas 2-3 times daily or whenever skin feels tight, hot, or uncomfortable.',
    skinType: 'Post-procedure, irritated, sunburned, or hypersensitive skin'
  },
  {
    id: 'prod-09',
    name: 'Multi-Molecular Hyaluronic Moisture Surge',
    subtitle: '8D Molecular Weight Hydration Concentrate',
    category: 'Serums',
    price: 2650,
    originalPrice: 3100,
    size: '30 ml / 1.0 fl oz',
    rating: 4.9,
    reviewsCount: 84,
    image: '/brand/hero-serum.jpg',
    description: 'Eight distinct molecular weights of hyaluronic acid penetrate from the outermost stratum corneum down to deep dermal layers for bouncy, plump, dewy skin.',
    benefits: [
      'Quenches deep cellular dehydration instantly',
      'Fills out fine dehydration crinkles',
      'Enhances skin elasticity and suppleness',
      'Silky non-tacky finish'
    ],
    keyIngredients: ['8D Sodium Hyaluronate Complex', 'Hydrolyzed Glycosaminoglycans', 'Polyglutamic Acid', 'Panthenol'],
    howToUse: 'Apply 3-4 drops to slightly damp face and neck right after cleansing, before locking in with moisturizer.',
    skinType: 'All skin types, especially dehydrated and fatigued'
  },
  {
    id: 'prod-10',
    name: 'Alpha Arbutin 2% + Tranexamic Melasma Corrector',
    subtitle: 'Dual-Inhibitor Targeted Dark Spot Treatment',
    category: 'Treatments',
    badge: 'Doctor Favorite',
    price: 3400,
    originalPrice: 3950,
    size: '30 ml / 1.0 fl oz',
    rating: 4.9,
    reviewsCount: 71,
    image: '/brand/hero-serum.jpg',
    description: 'A clinical medical synergy of pure Alpha Arbutin and Tranexamic Acid that halts tyrosinase activity and blocks vascular pigment signaling for resistant melasma patches.',
    benefits: [
      'Fades dark stubborn melasma patches and sun spots',
      'Prevents post-breakout dark marks',
      'Evens out blotchy, mottled complexion',
      'Safe for extended long-term maintenance'
    ],
    keyIngredients: ['Alpha Arbutin 2%', 'Tranexamic Acid 3%', 'Kojic Acid Dipalmitate', 'Licorice Root Glabridin'],
    howToUse: 'Apply 2-3 drops directly to pigmented areas or whole face morning and evening.',
    skinType: 'Hyperpigmented, melasma-prone, and uneven tone'
  },
  {
    id: 'prod-11',
    name: 'Salicylic 2% Pore Purifying Clarifying Toner',
    subtitle: 'Gentle BHA Exfoliating Liquid with Green Tea',
    category: 'Cleansers',
    price: 2100,
    size: '120 ml / 4.0 fl oz',
    rating: 4.7,
    reviewsCount: 92,
    image: '/brand/hero-serum.jpg',
    description: 'Oil-soluble Beta Hydroxy Acid deeply penetrates sebum inside hair follicles to dissolve trapped dead cells, unclog blackheads, and prevent cystic bumps.',
    benefits: [
      'Dissolves stubborn blackheads and whiteheads',
      'Smooths rough pebbled forehead texture',
      'Calms inflammatory blemish redness',
      'Alcohol-free, non-stinging formulation'
    ],
    keyIngredients: ['Salicylic Acid 2%', 'Organic Green Tea Hydrosol', 'Willow Bark Extract', 'Zinc Gluconate'],
    howToUse: 'Pour onto cotton pad or into clean hands, gently sweep across face 3 evenings per week.',
    skinType: 'Oily, congested, acne-prone, and textured skin'
  },
  {
    id: 'prod-12',
    name: 'Peptide Firming Eye Contour Youth Elixir',
    subtitle: 'Matrixyl 3000 + Caffeine Dark Circle Complex',
    category: 'Treatments',
    badge: 'New',
    price: 2750,
    originalPrice: 3200,
    size: '15 ml / 0.5 fl oz',
    rating: 4.8,
    reviewsCount: 58,
    image: '/brand/moisturizer-cream.jpg',
    description: 'Targeted cooling eye concentrate with peptide bio-stimulators and circulation-boosting caffeine to visibly diminish under-eye bags, darkness, and fine smile lines.',
    benefits: [
      'Reduces morning under-eye fluid puffiness within 15 minutes',
      'Brightens sluggish dark under-eye shadow circles',
      'Tightens delicate periorbital crepey skin',
      'Ophthalmologist-tested and non-migrating'
    ],
    keyIngredients: ['Matrixyl 3000 Peptide Complex', 'Green Coffee Caffeine 2%', 'N-Hydroxysuccinimide', 'Escin'],
    howToUse: 'Gently tap a half-pump along the orbital bone with your ring finger morning and evening.',
    skinType: 'All skin types, especially fatigued eyes'
  }
];
