export const CLINIC_INFO = {
  name: 'Skin Nurture Clinic',
  doctor: 'Dr. Hina Faisal',
  doctorTitle: 'Consultant Dermatologist, Skin & Hair Specialist',
  doctorCreds: 'MBBS, FCPS / Dip. Dermatology & Aesthetic Medicine',
  tagline: 'Expert care for your skin and hair',
  mission: 'Bespoke clinical dermatology, transformative aesthetic protocols, and medical-grade care in Hyderabad.',
  address: 'Main Autobhan Road, Bone & Joint Hospital Building (Beside PK Roll Point), Hyderabad, Pakistan',
  phoneDisplay: '0318 3939139',
  phoneInternational: '+92 318 3939139',
  whatsappRaw: '923183939139',
  email: 'skinnurtureclinic@gmail.com',
  timings: 'Monday to Saturday, 7:00 PM to 9:00 PM (Sunday Closed)',
  facebook: 'https://www.facebook.com/skinnurtureclinic',
  facebookFollowers: '7.7K+ followers',
  rating: '100% Recommended',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.3789498223946!2d68.3491!3d25.3752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c70f69a53b5bb%3A0x89e2467d025167dc!2sAutobhan%20Rd%2C%20Hyderabad%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s',
};

export const formatPKR = (amount: number): string => {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
};

export const createWhatsAppConsultUrl = (message?: string): string => {
  const defaultMsg = `Hello Dr. Hina Faisal & Skin Nurture Clinic team! I would like to book a consultation for dermatology / skin & hair care.`;
  const text = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${text}`;
};

export const createWhatsAppOrderUrl = (order: {
  customerName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  items: Array<{ name: string; quantity: number; price: number; type: string }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
}): string => {
  const itemList = order.items
    .map((item, idx) => `${idx + 1}. ${item.name} (${item.quantity}x) - ${formatPKR(item.price * item.quantity)}`)
    .join('\n');

  const text = `*New Order - Skin Nurture Clinic*
--------------------------------
*Customer:* ${order.customerName}
*Phone:* ${order.phone}
*City:* ${order.city}
*Address:* ${order.address}
${order.notes ? `*Notes:* ${order.notes}\n` : ''}
*Items:*
${itemList}

--------------------------------
*Subtotal:* ${formatPKR(order.subtotal)}
*Delivery:* ${order.deliveryFee === 0 ? 'FREE' : formatPKR(order.deliveryFee)}
*Total Amount:* ${formatPKR(order.total)}

_Please confirm my order and share estimated dispatch / appointment details._`;

  return `https://wa.me/${CLINIC_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
};
