export type Room = {
  id: string;
  name: string;
  slug: string;
  description: string;
  detailedDescription: string;
  price: number;
  capacity: number;
  size: number;
  bedType: string;
  view: string;
  rating: number;
  reviewsCount: number;
  featured: boolean;
  amenities: string[];
  images: string[];
};

export type Review = {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
};

export type Attraction = {
  id: string;
  name: string;
  distance: string;
  description: string;
  category: 'Nature' | 'Culture' | 'Leisure';
  image: string;
  emoji: string;
};

export type FAQ = {
  id: string;
  category: 'Booking' | 'Services' | 'House Rules';
  question: string;
  answer: string;
};

export const ROOMS: Room[] = [
  {
    id: '1',
    name: 'Executive Fako Penthouse',
    slug: 'executive-fako-penthouse',
    description: 'Our crown jewel. A spacious suite on the top floor offering panoramic views of Mount Cameroon and the city of Buea.',
    detailedDescription: 'The Executive Fako Penthouse is designed for travelers who demand absolute elegance and spacious luxury. Located on the highest floor of La Villa Rielle, it features a private wrap-around terrace looking directly at the peaks of Mount Cameroon. Inside, you will find a king-sized canopy bed, a dedicated office desk, a large private lounge, and an open-concept en-suite bathroom with a freestanding clawfoot soaking tub. Guests also enjoy premium access to our concierge service.',
    price: 95000,
    capacity: 2,
    size: 75,
    bedType: '1 King Size Canopy',
    view: 'Mount Cameroon Peak & City Skyline',
    rating: 4.9,
    reviewsCount: 24,
    featured: true,
    amenities: ['Private Terrace', 'Clawfoot Tub', 'Espresso Machine', 'High-Speed Wi-Fi', 'Smart TV', 'Premium Minibar', '24/7 Room Service', 'Work Station'],
    images: [
      '/assets/rooms/penthouse-1.jpg',
      '/assets/rooms/penthouse-2.jpg',
      '/assets/rooms/penthouse-3.jpg'
    ]
  },
  {
    id: '2',
    name: 'Sage Garden Suite',
    slug: 'sage-garden-suite',
    description: 'Ground floor luxury with direct access to our manicured botanical gardens. Features private patio seating and tranquil environment.',
    detailedDescription: 'Immerse yourself in nature in the Sage Garden Suite. Decorated in calm forest and sage hues, this room opens via glass double doors directly onto La Villa Rielle’s private gardens. It includes a comfortable seating alcove, a queen-sized plush bed, and an outdoor terrace with handcrafted bamboo furniture, ideal for sipping morning tea or evening refreshments in the crisp Buea mountain breeze.',
    price: 65000,
    capacity: 2,
    size: 45,
    bedType: '1 Queen Size plush',
    view: 'Manicured Tropical Gardens',
    rating: 4.8,
    reviewsCount: 18,
    featured: true,
    amenities: ['Direct Garden Access', 'Private Patio', 'Plush Robes', 'High-Speed Wi-Fi', 'Smart TV', 'Coffee & Tea Setup', 'Walk-in Shower', 'In-room Safe'],
    images: [
      '/assets/rooms/garden-1.jpg',
      '/assets/rooms/garden-2.jpg'
    ]
  },
  {
    id: '3',
    name: 'Deluxe Mountain Studio',
    slug: 'deluxe-mountain-studio',
    description: 'Comfort meets functionality. Equipped with a modern kitchenette, suitable for extended stays and business travelers.',
    detailedDescription: 'The Deluxe Mountain Studio is perfect for business professionals or couples planning a longer stay. It contains a fully functional, modern kitchenette with an induction stove, microwave, and mini-fridge. The open-plan space includes a queen bed, a high-top dining/work counter, and large windows that frame the misty foothills of Mount Cameroon. Rest easy with premium soundproofing and black-out drapery.',
    price: 50000,
    capacity: 2,
    size: 38,
    bedType: '1 Queen Size Bed',
    view: 'Mountain Foothills',
    rating: 4.7,
    reviewsCount: 15,
    featured: true,
    amenities: ['Kitchenette', 'Dining Counter', 'Microwave', 'High-Speed Wi-Fi', 'Smart TV', 'Workspace Desk', 'Iron & Board', 'Air Conditioning'],
    images: [
      '/assets/rooms/studio-1.jpg',
      '/assets/rooms/studio-2.jpg'
    ]
  },
  {
    id: '4',
    name: 'Classic Queen Room',
    slug: 'classic-queen-room',
    description: 'A cozy and beautifully appointed room overlooking the courtyard, offering excellent value and complete comfort.',
    detailedDescription: 'Our Classic Queen Room represents the perfect balance of premium comfort and exceptional value. Featuring Warm Cream and Soft Gold accents, this room features a comfortable queen-size bed, a private ensuite bathroom with local organic toiletries, and a view of the central cobblestone courtyard. It is an ideal peaceful retreat after a day of sightseeing or work.',
    price: 35000,
    capacity: 2,
    size: 28,
    bedType: '1 Queen Size Bed',
    view: 'Central Courtyard & Fountain',
    rating: 4.6,
    reviewsCount: 32,
    featured: false,
    amenities: ['En-suite Bathroom', 'High-Speed Wi-Fi', 'Smart TV', 'Coffee & Tea Setup', 'Courtyard View', 'Writing Desk', 'Premium Linens'],
    images: [
      '/assets/rooms/classic-1.jpg',
      '/assets/rooms/classic-2.jpg'
    ]
  },
  {
    id: '5',
    name: 'Sunset View Double',
    slug: 'sunset-view-double',
    description: 'Spacious room featuring two double beds. Perfect for friends traveling together or families.',
    detailedDescription: 'The Sunset View Double is a bright and airy room equipped with two premium double beds, making it ideal for group travelers or families. Large westward-facing windows flood the room with golden light during sunset, offering beautiful views of the green southwestern landscape. Complete with a large closet, private bathroom, and interactive entertainment system.',
    price: 55000,
    capacity: 4,
    size: 42,
    bedType: '2 Double Beds',
    view: 'Westward Landscape & Sunset',
    rating: 4.7,
    reviewsCount: 9,
    featured: false,
    amenities: ['Two Beds', 'Large Closet', 'High-Speed Wi-Fi', 'Smart TV', 'In-room Dining Table', 'Mini Fridge', 'Black-out Curtains'],
    images: [
      '/assets/rooms/double-1.jpg',
      '/assets/rooms/double-2.jpg'
    ]
  },
  {
    id: '6',
    name: 'Royal Twin Suite',
    slug: 'royal-twin-suite',
    description: 'Sophisticated suite featuring twin beds and a separate living area, offering space and style.',
    detailedDescription: 'Experience refined comfort in our Royal Twin Suite. Outfitted with two twin-size orthopedic beds, this suite boasts a separate living room area with cozy sofa seating, allowing for business meetings or relaxed social hours in privacy. High ceilings, large windows, and curated African art pieces complete this majestic space.',
    price: 60000,
    capacity: 2,
    size: 48,
    bedType: '2 Twin Beds',
    view: 'Mountain & Garden View',
    rating: 4.8,
    reviewsCount: 11,
    featured: false,
    amenities: ['Separate Living Room', 'Twin Beds', 'Sofa Lounge', 'High-Speed Wi-Fi', 'Smart TV', 'Premium Toiletries', 'Espresso Machine', 'Iron & Board'],
    images: [
      '/assets/rooms/twin-1.jpg',
      '/assets/rooms/twin-2.jpg'
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Jean-Pierre Ndongo',
    location: 'Yaoundé, Cameroon',
    rating: 5,
    date: '2026-05-14',
    comment: 'La Villa Rielle exceeded all expectations! The view of Mount Cameroon in the morning is breathtaking. The backup generator is flawless, and the Wi-Fi was fast enough for my Zoom calls. Will definitely stay here again on my next trip to Buea.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: '2',
    author: 'Sarah Jenkins',
    location: 'London, United Kingdom',
    rating: 5,
    date: '2026-06-02',
    comment: 'A true oasis of peace in Buea. The Sage Garden Suite is wonderful, and stepping directly onto the green lawns in the morning was magical. The staff is exceptionally polite, helping us coordinate our hiking tour up Mount Cameroon. Very clean and safe.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: '3',
    author: 'Fouda Marie',
    location: 'Douala, Cameroon',
    rating: 4,
    date: '2026-06-25',
    comment: 'Very professional guest house. I stayed in the Deluxe Mountain Studio for a business trip. Having a kitchen was very convenient. The area is quiet, secure, and has very clean air. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: '4',
    author: 'Amadou Bello',
    location: 'Garoua, Cameroon',
    rating: 5,
    date: '2026-07-08',
    comment: 'Beautiful decor, comfortable beds, and a delicious breakfast. We booked the Fako Penthouse, and the terrace views are simply unmatched in Buea. Checking in and paying via Mobile Money was smooth and fast.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  }
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: '1',
    name: 'Mount Cameroon Peak Trail',
    distance: '3.5 km away',
    description: 'The highest peak in West/Central Africa (4,040m). Hike through forest trails starting directly from Buea Town to experience absolute majesty.',
    category: 'Nature',
    image: '/assets/attractions/mount-cameroon.jpg',
    emoji: '🏔️'
  },
  {
    id: '2',
    name: 'Limbe Botanic Gardens',
    distance: '24 km away',
    description: 'Established in 1892, this lush botanical sanctuary hosts a wide array of exotic, medicinal, and historic tropical plant species beside a flowing stream.',
    category: 'Culture',
    image: '/assets/attractions/botanic-gardens.jpg',
    emoji: '🌿'
  },
  {
    id: '3',
    name: 'Limbe Black Sand Beaches',
    distance: '26 km away',
    description: 'Stunning volcanic black sand beaches. Relax by the Atlantic Ocean waves and enjoy freshly grilled fish at the seaside restaurants.',
    category: 'Leisure',
    image: '/assets/attractions/black-beach.jpg',
    emoji: '🏖️'
  },
  {
    id: '4',
    name: 'Historical Buea Mountain Club',
    distance: '2.1 km away',
    description: "A historic colonial-era club featuring tennis courts, pool tables, and a charming bar that tells the story of Buea's heritage.",
    category: 'Culture',
    image: '/assets/attractions/mountain-club.jpg',
    emoji: '🏛️'
  }
];

export const FAQS: FAQ[] = [
  {
    id: '1',
    category: 'Booking',
    question: 'How do I confirm my booking at La Villa Rielle?',
    answer: 'Bookings can be completed directly through our website booking system. Once you choose your dates and room, you can pay securely using MTN Mobile Money, Orange Money, or Credit Card. Your booking is confirmed instantly, and a PDF receipt/pass is sent to your email.'
  },
  {
    id: '2',
    category: 'Booking',
    question: 'What is your cancellation policy?',
    answer: 'Free cancellations are allowed up to 48 hours prior to your scheduled check-in time. Cancellations made within 48 hours will incur a fee equal to the cost of the first night\'s stay.'
  },
  {
    id: '3',
    category: 'Services',
    question: 'Do you have backup electricity and water supply?',
    answer: 'Yes. To counter local utility outages, La Villa Rielle is equipped with a high-capacity, automatic-switch standby diesel generator and a private borehole water filtration system. You will enjoy uninterrupted power and clean water throughout your stay.'
  },
  {
    id: '4',
    category: 'Services',
    question: 'Is breakfast included in the room price?',
    answer: 'Yes! A complimentary breakfast (choice of local Cameroonian breakfast, continental breakfast, or fresh tropical fruit platter) is included for all checked-in guests, served daily between 7:00 AM and 10:00 AM.'
  },
  {
    id: '5',
    category: 'House Rules',
    question: 'What are the check-in and check-out times?',
    answer: 'Standard check-in is from 2:00 PM (14:00) onwards, and check-out is by 12:00 PM (noon). Early check-in or late check-out can be requested in advance and is subject to room availability.'
  },
  {
    id: '6',
    category: 'House Rules',
    question: 'Are pets allowed in the suites?',
    answer: 'To maintain a peaceful and allergen-free environment for all our guests, pets are generally not permitted on the premises. Service animals are accepted upon prior arrangement.'
  }
];

export const CONTACT_DETAILS = {
  address: '15 Sandpit Road, Opposite Mountain View Estate',
  city: 'Buea, Southwest Region',
  country: 'Cameroon',
  phone: '+237 670 123 456',
  whatsapp: 'https://wa.me/237670123456?text=Hello%20La%20Villa%20Rielle%2C%20I%27d%20like%20to%20inquire%20about%20booking%20a%20room.',
  email: 'reservations@lavillarielle.com',
  workingHours: 'Front Desk: 24/7 | Reservations Office: 8:00 AM - 8:00 PM',
};

// Alias for convenience
export const CONTACTS = CONTACT_DETAILS;
