export interface ReviewItem {
  id: number;
  name: string;
  city: string;
  state: string;
  rating: number;
  date: string;
  color: 'Royal Gold' | 'Midnight Black' | 'Electric Purple';
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export const INITIAL_5_REVIEWS: ReviewItem[] = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    city: 'Jaipur',
    state: 'Rajasthan',
    rating: 5,
    date: 'Yesterday',
    color: 'Royal Gold',
    comment: 'Ordered Royal Gold for my father. The sound is loud and clear, and the keypad buttons are very big and easy to press. The flip action feels sturdy. At ₹389 from Naaptol, this is unbelievable value!',
    verified: true,
    helpfulCount: 42
  },
  {
    id: 2,
    name: 'Sunita Patel',
    city: 'Ahmedabad',
    state: 'Gujarat',
    rating: 5,
    date: '2 days ago',
    color: 'Electric Purple',
    comment: 'The Electric Purple color is really stylish! The battery lasts almost 4 days without charging. The outer notification lights are very convenient when calls arrive. Fast delivery by Naaptol.',
    verified: true,
    helpfulCount: 38
  },
  {
    id: 3,
    name: 'Manoj Verma',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    rating: 5,
    date: '3 days ago',
    color: 'Midnight Black',
    comment: 'Got my parcel delivered in 3 days. Online payment was smooth with Google Pay. Dual SIM working nicely. Great backup phone for travel.',
    verified: true,
    helpfulCount: 29
  },
  {
    id: 4,
    name: 'Anand Kumar',
    city: 'Bengaluru',
    state: 'Karnataka',
    rating: 5,
    date: '4 days ago',
    color: 'Royal Gold',
    comment: 'Wireless FM radio works without earphones, speaker sound is surprisingly loud. Very happy with the purchase. Full 5 stars to Naaptol team.',
    verified: true,
    helpfulCount: 51
  },
  {
    id: 5,
    name: 'Pooja Deshmukh',
    city: 'Pune',
    state: 'Maharashtra',
    rating: 4,
    date: '5 days ago',
    color: 'Midnight Black',
    comment: 'Compact and light weight. Fits easily in pocket or handbag. Call quality is very good on Jio and Airtel SIM cards. Excellent value for 389 rupees.',
    verified: true,
    helpfulCount: 19
  }
];

const FIRST_NAMES = [
  'Amit', 'Rahul', 'Vikram', 'Suresh', 'Pooja', 'Deepak', 'Anita', 'Sunil',
  'Kavita', 'Ramesh', 'Priya', 'Sanjay', 'Rekha', 'Gaurav', 'Manish', 'Neha',
  'Dinesh', 'Ajay', 'Meena', 'Harish', 'Vikas', 'Seema', 'Pankaj', 'Suman',
  'Ashok', 'Karan', 'Geeta', 'Ravi', 'Preeti', 'Naveen', 'Swati', 'Alok',
  'Vijay', 'Jyoti', 'Santosh', 'Shilpa', 'Rajiv', 'Ritu', 'Pradeep', 'Anjali',
  'Gurpreet', 'Jaswinder', 'Kuldeep', 'Manpreet', 'Balwinder', 'Harpreet',
  'Kiran', 'Sandeep', 'Mohan', 'Krishna', 'Venkatesh', 'Subramaniam', 'Sridhar'
];

const LAST_NAMES = [
  'Sharma', 'Verma', 'Gupta', 'Patel', 'Singh', 'Yadav', 'Mishra', 'Pandey',
  'Chauhan', 'Reddy', 'Nair', 'Iyer', 'Joshi', 'Kulkarni', 'Deshmukh', 'Das',
  'Banerjee', 'Ghosh', 'Chatterjee', 'Roy', 'Bose', 'Dutta', 'Saha', 'Mukherjee',
  'Jain', 'Agarwal', 'Bansal', 'Goyal', 'Mittals', 'Saxena', 'Bhatia', 'Arora',
  'Kapoor', 'Malhotra', 'Khanna', 'Chopra', 'Sethi', 'Gill', 'Sandhu', 'Dhillon'
];

const CITIES: { city: string; state: string }[] = [
  { city: 'New Delhi', state: 'Delhi' },
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Bengaluru', state: 'Karnataka' },
  { city: 'Hyderabad', state: 'Telangana' },
  { city: 'Jaipur', state: 'Rajasthan' },
  { city: 'Lucknow', state: 'Uttar Pradesh' },
  { city: 'Ahmedabad', state: 'Gujarat' },
  { city: 'Kolkata', state: 'West Bengal' },
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Indore', state: 'Madhya Pradesh' },
  { city: 'Chandigarh', state: 'Punjab' },
  { city: 'Patna', state: 'Bihar' },
  { city: 'Bhopal', state: 'Madhya Pradesh' },
  { city: 'Surat', state: 'Gujarat' },
  { city: 'Nagpur', state: 'Maharashtra' },
  { city: 'Kanpur', state: 'Uttar Pradesh' },
  { city: 'Varanasi', state: 'Uttar Pradesh' },
  { city: 'Coimbatore', state: 'Tamil Nadu' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { city: 'Ludhiana', state: 'Punjab' },
  { city: 'Agra', state: 'Uttar Pradesh' },
  { city: 'Nashik', state: 'Maharashtra' },
  { city: 'Vadodara', state: 'Gujarat' },
  { city: 'Faridabad', state: 'Haryana' },
  { city: 'Ghaziabad', state: 'Uttar Pradesh' },
  { city: 'Rajkot', state: 'Gujarat' },
  { city: 'Amritsar', state: 'Punjab' },
  { city: 'Jodhpur', state: 'Rajasthan' },
  { city: 'Kota', state: 'Rajasthan' },
  { city: 'Ranchi', state: 'Jharkhand' }
];

const COMMENTS = [
  'Sound quality is super loud and crystal clear. Battery easily gives 3-4 days on single charge.',
  'Bought for my grandfather. Large keypad keys are very easy for him to dial. Best flip phone.',
  'Color looks even better than photos. Received sealed pack with warranty card. Thank you Naaptol!',
  'Flash alert outer lights show missed calls and SMS without needing to open the flip. Very smart feature.',
  'FM radio plays without earphones. Volume is loud enough for the entire room.',
  'Dual SIM card works perfectly. No call drops. Delivery took only 3 days to our village.',
  'Super satisfied with ₹389 deal. 100% genuine Naaptol piece. Worth every rupee.',
  'Compact flip design fits in shirt pocket without any risk of scratches. Quality hinge mechanism.',
  'Digital camera and torch light work great at night. Auto call recording feature is very useful.',
  'Prepaid payment with PhonePe was instant and safe. Delivery by BlueDart was fast and clean.',
  'Long battery backup, sturdy body, easy to operate in multiple languages. Highly recommended to everyone.'
];

const COLORS: ('Royal Gold' | 'Midnight Black' | 'Electric Purple')[] = [
  'Royal Gold',
  'Midnight Black',
  'Electric Purple'
];

/**
 * High performance deterministic on-demand review generator.
 * Zero initial payload impact. Generates reviews smoothly for any page 1 to 1482!
 */
export function getPaginatedReviews(page: number, pageSize: number = 10): ReviewItem[] {
  const startIndex = (page - 1) * pageSize;
  const reviews: ReviewItem[] = [];

  for (let i = 0; i < pageSize; i++) {
    const globalIndex = startIndex + i;
    if (globalIndex >= 14820) break;

    // Use pseudorandom hash based on globalIndex for deterministic, repeatable reviews
    const seed = (globalIndex * 9301 + 49297) % 233280;
    const fName = FIRST_NAMES[seed % FIRST_NAMES.length];
    const lName = LAST_NAMES[(seed >> 3) % LAST_NAMES.length];
    const location = CITIES[(seed >> 2) % CITIES.length];
    const comment = COMMENTS[(seed >> 4) % COMMENTS.length];
    const color = COLORS[(seed >> 1) % COLORS.length];
    const rating = (seed % 10 < 8) ? 5 : 4; // 80% 5-star, 20% 4-star

    const daysAgo = Math.floor(globalIndex / 15) + 1;
    const dateStr = daysAgo === 1 ? '1 day ago' : daysAgo < 30 ? `${daysAgo} days ago` : `${Math.floor(daysAgo / 30)} month(s) ago`;

    reviews.push({
      id: globalIndex + 1,
      name: `${fName} ${lName}`,
      city: location.city,
      state: location.state,
      rating,
      date: dateStr,
      color,
      comment,
      verified: true,
      helpfulCount: (seed % 35) + 2
    });
  }

  return reviews;
}

export const TOTAL_REVIEWS_COUNT = 14820;
