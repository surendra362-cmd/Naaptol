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
    comment: 'Mobile bahut achcha hai, price ke hisab se bahut badiya hai. Call bhi kar sakte hai aur mobile ka look bahut accha hai. Sound ekdum loud aur clear hai. ₹389 me Naaptol se best deal hai!',
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
    comment: 'The Electric Purple color is really stylish and unique! Battery easily lasts 4 days on single charge. Outer notification display shows incoming calls without opening the phone. Very happy!',
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
    comment: 'Phone ka look bahut accha hai. Delivery 3 din me aa gayi. Google Pay se online payment turant ho gaya tha. 2 SIM badiya chalte hai, network problem bilkul nahi hai.',
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
    comment: 'Wireless FM radio works without any earphones. Sound is very loud and clear. Sturdy flip body protects the screen from drops. Highly recommended to everyone.',
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
    color: 'Electric Purple',
    comment: 'Papa ke liye mangwaya tha, unko bahut pasand aaya. Pocket me aaram se aa jata hai aur auto call recording bhi hai. ₹389 me sach me pura paisa vasool mobile hai.',
    verified: true,
    helpfulCount: 23
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
  'Jain', 'Agarwal', 'Bansal', 'Goyal', 'Mittal', 'Saxena', 'Bhatia', 'Arora',
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

// Balanced mix of natural Roman Hindi (Hinglish) & simple Indian English reviews
const COMMENTS = [
  'Mobile bahut achcha hai, price ke hisab se bahut achcha hai, call bhi kar skte hai or mobile ka look bhut accha hai.',
  '₹389 me itna badiya flip phone milna mushkil hai. Sound quality bohot loud aur saaf aati hai.',
  'Battery backup bahut accha hai, 3-4 din tak aaram se chalta hai. Charging ki koi tension nahi.',
  'Royal Gold color ekdum premium lagta hai. Haath me pakadne par phone ka look bohot pyara lagta hai.',
  'Bina earphone ke FM radio loud speaker par bajta hai. Awaz poore kamre me goonjti hai.',
  '2 SIM card lagte hai dono me accha network pakadta hai. Call drop ki koi pareshani nahi aayi.',
  'Sound quality is super loud and crystal clear. Battery easily gives 3-4 days on single charge.',
  'Keypad ke buttons bade-bade hai, dial karne aur number dekhne me bohot aasaani hoti hai.',
  'Outer flash alert screen bohot useful hai, bina flip khole pata chal jata hai kiska call ya SMS aaya hai.',
  'Bought for my parents. Large keypad keys, clear screen font and very easy to operate.',
  'Torch light bohot tez hai raat ke liye. Auto call recording feature bhi bohot accha kaam kar raha hai.',
  'Prepaid payment with PhonePe was instant and safe. Delivery by BlueDart in 3 days. Sealed pack received.',
  'Phone ka design bohot solid hai, pocket me rakhne se screen par scratch nahi aate. Paisa vasool deal!',
  'Very nice flip phone for daily use. Long battery life, clear loudspeaker and smooth flip hinge.',
  'Electric Purple color bohot stylish hai. Lightweight hai aur pocket me aaram se fit ho jata hai.',
  'Delivery bohot fast thi. Naaptol se pehli baar order kiya tha, pura paisa vasool product hai.',
  'Both SIM cards working with clear voice quality. Great value for ₹389 with free home delivery.'
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
