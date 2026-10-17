export interface ColorOption {
  id: string;
  name: string;
  code: string;
  swatch: string;
  tag?: string;
  galleryIndex: number;
  image: string;
  description: string;
}

export interface ProductImage {
  url: string;
  title: string;
  subtitle: string;
  badge?: string;
}

export const PRODUCT_COLORS: ColorOption[] = [
  {
    id: 'black',
    name: 'Midnight Black',
    code: '#18181b',
    swatch: 'bg-zinc-900 border-zinc-700',
    galleryIndex: 1,
    image: '/images/pmh1_2.png',
    description: 'Classic matte black finish with sleek metallic trim'
  },
  {
    id: 'gold',
    name: 'Royal Gold',
    code: '#eab308',
    swatch: 'bg-amber-400 border-amber-600',
    tag: 'MOST POPULAR',
    galleryIndex: 3,
    image: '/images/pmh1_4.png',
    description: 'Champagne metallic gold body with champagne gold keypad'
  },
  {
    id: 'purple',
    name: 'Electric Purple',
    code: '#8b5cf6',
    swatch: 'bg-purple-600 border-purple-800',
    tag: 'TRENDING',
    galleryIndex: 2,
    image: '/images/pmh1_3.png',
    description: 'Vibrant neon purple edition with futuristic styling'
  }
];

export const PRODUCT_IMAGES: ProductImage[] = [
  {
    url: '/images/pmh1_1.png',
    title: 'Dual SIM Flip Phone with Camera',
    subtitle: 'Available in 3 Attractive Colors - Black, Gold, and Purple',
    badge: 'ALL 3 COLORS'
  },
  {
    url: '/images/pmh1_2.png',
    title: 'Smart Flash Alert Outer Display',
    subtitle: 'View Battery, Messages & Incoming Calls without opening',
    badge: 'MIDNIGHT BLACK'
  },
  {
    url: '/images/pmh1_3.png',
    title: 'Dual SIM Dual Standby Power',
    subtitle: 'Supports 2 regular SIM cards simultaneously for personal & work',
    badge: 'ELECTRIC PURPLE'
  },
  {
    url: '/images/pmh1_4.png',
    title: 'Crystal Clear Vibrant 2.4" Screen',
    subtitle: 'High contrast bright display with easy-to-read big text font',
    badge: 'ROYAL GOLD'
  },
  {
    url: '/images/pmh1_5.png',
    title: 'Wireless FM Radio & Loudspeaker',
    subtitle: 'Enjoy news, cricket commentary, and devotional music anytime',
    badge: 'LOUD SPEAKER'
  },
  {
    url: '/images/pmh1_6.png',
    title: 'Iconic Stylish Flip Action',
    subtitle: 'Smooth, satisfying, and effortless flip hinge built to last',
    badge: 'FOLDING DESIGN'
  },
  {
    url: '/images/pmh1_7.png',
    title: '4 Indian Regional Languages',
    subtitle: 'Effortlessly switch between English, Hindi, Kannada, and Punjabi',
    badge: 'MULTI-LANGUAGE'
  },
  {
    url: '/images/pmh1_8.png',
    title: 'Relentless 1800 mAh Li-ion Battery',
    subtitle: 'Up to 4-5 days standby battery life on a single charge',
    badge: 'LONG BATTERY'
  }
];

export const PRODUCT_HIGHLIGHTS = [
  {
    icon: 'Radio',
    title: 'Wireless FM Radio',
    desc: 'Listen to live radio channels without needing any earphones plugged in.'
  },
  {
    icon: 'CreditCard',
    title: 'Dual SIM Standby',
    desc: 'Operate two mobile numbers on one convenient pocket phone.'
  },
  {
    icon: 'BatteryCharging',
    title: '1800 mAh Battery',
    desc: 'Massive standby life so you never get disconnected when travelling.'
  },
  {
    icon: 'Camera',
    title: 'Digital Camera',
    desc: 'Capture snapshots, family photos, and record memorable moments.'
  },
  {
    icon: 'Languages',
    title: '4 Languages',
    desc: 'Simple system menu available in English, Hindi, Punjabi, and Kannada.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Durable Flip Body',
    desc: 'Folding clamshell protects the keypad and internal screen from falls.'
  },
  {
    icon: 'Flashlight',
    title: 'Powerful Torch',
    desc: 'Bright top LED flashlight for night emergencies and dark pathways.'
  },
  {
    icon: 'HardDrive',
    title: '32GB Memory Support',
    desc: 'MicroSD card expansion slot to store thousands of songs and recordings.'
  }
];

export const TECHNICAL_SPECIFICATIONS = [
  { label: 'Brand & Store', value: 'Naaptol Online (Official Clearance Deal)' },
  { label: 'Model Name', value: 'Naaptol 2 Sim Flip Phone With Camera & 4 Languages (PMH1)' },
  { label: 'Design Type', value: 'Protective Folding Clamshell Flip Phone' },
  { label: 'SIM Support', value: 'Dual SIM (GSM + GSM) Dual Standby' },
  { label: 'Main Display', value: '2.4 inch (6.1 cm) Vibrant Color QVGA Screen' },
  { label: 'Secondary Display', value: 'Rear Smart LED Indicator (Battery, SMS, Incoming Calls)' },
  { label: 'Camera', value: 'Integrated Digital Snapshot Camera with Video Recording' },
  { label: 'Battery Capacity', value: '1800 mAh Removable Rechargeable Lithium-ion' },
  { label: 'Standby Time', value: 'Up to 96 Hours (4 Days)' },
  { label: 'Talk Time', value: 'Up to 8-10 Hours Continuous' },
  { label: 'FM Radio', value: 'Wireless Built-in FM Radio with Loud Sound Speaker' },
  { label: 'Storage Expansion', value: 'MicroSD Card slot supported up to 32 GB' },
  { label: 'Languages', value: '4 Regional Languages (English, Hindi, Punjabi, Kannada)' },
  { label: 'Torch Light', value: 'Integrated High-Luminance LED Flashlight' },
  { label: 'Call Features', value: 'Auto Call Recording, Speed Dial, Hands-free Speaker' },
  { label: 'Connectivity', value: 'Bluetooth, Micro-USB Charging Port, 3.5mm Audio Jack' },
  { label: 'Package Includes', value: '1x Naaptol Flip Phone, 1x 1800mAh Battery, 1x User Manual' }
];

export const VERIFIED_REVIEWS = [
  {
    name: 'Rajesh Sharma',
    city: 'Jaipur, Rajasthan',
    rating: 5,
    date: 'Yesterday',
    color: 'Royal Gold',
    comment: 'Ordered Royal Gold for my father. The sound is loud and clear, and the keypad buttons are very big and easy to press. The flip action feels sturdy. At ₹389 this is unbelievable value!',
    verified: true
  },
  {
    name: 'Sunita Patel',
    city: 'Ahmedabad, Gujarat',
    rating: 5,
    date: '2 days ago',
    color: 'Electric Purple',
    comment: 'The Electric Purple color is really stylish! The battery lasts almost 4 days without charging. The outer notification lights are very convenient when calls arrive.',
    verified: true
  },
  {
    name: 'Manoj Verma',
    city: 'Lucknow, Uttar Pradesh',
    rating: 5,
    date: '3 days ago',
    color: 'Midnight Black',
    comment: 'Got my parcel delivered in 3 days. Online payment was smooth with Google Pay. Dual SIM working nicely. Great backup phone for travel.',
    verified: true
  },
  {
    name: 'Anand Kumar',
    city: 'Bengaluru, Karnataka',
    rating: 5,
    date: '4 days ago',
    color: 'Royal Gold',
    comment: 'FM radio works without earphones, speaker sound is surprisingly loud. Very happy with the purchase. Full 5 stars.',
    verified: true
  }
];

export const FAQS = [
  {
    q: 'What is the selling price of this flip phone?',
    a: 'The special promotional price is strictly ₹389 only (reduced from original MRP of ₹1,999). Free express shipping is included across India.'
  },
  {
    q: 'Can I choose my favorite color?',
    a: 'Yes! We offer 3 attractive colors: Midnight Black, Royal Gold, and Electric Purple. All colors are available at the same price of ₹389.'
  },
  {
    q: 'Why is Cash on Delivery (COD) not available?',
    a: 'To make this special clearance price of ₹389 possible and eliminate fake/refused bookings, we only accept secure online prepaid orders (UPI, Google Pay, PhonePe, Paytm, Debit/Credit Card, Net Banking).'
  },
  {
    q: 'How many days will it take to deliver to my address?',
    a: 'Orders are dispatched within 24 hours via reliable couriers (BlueDart, Delhivery, Express Post). You will receive your phone within 2 to 4 business days.'
  },
  {
    q: 'Is there a warranty or guarantee?',
    a: 'Yes, every phone comes with a 7-Day Hassle-Free Replacement Policy and 1-Year Manufacturer Warranty against manufacturing defects.'
  },
  {
    q: 'Does it support two SIM cards?',
    a: 'Yes, it features Dual SIM Dual Standby support, allowing you to use two different network SIM cards simultaneously.'
  }
];
