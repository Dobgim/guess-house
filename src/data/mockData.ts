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
    name: 'Executive Wouri Penthouse',
    slug: 'executive-wouri-penthouse',
    description: 'Our crown jewel. A spacious suite on the top floor offering panoramic views of the Wouri River and the city of Douala.',
    detailedDescription: 'The Executive Wouri Penthouse is designed for travelers who demand absolute elegance and spacious luxury. Located on the highest floor of M&J Luxurious Guest House, it features a private wrap-around terrace looking directly at the Wouri River and Douala skyline. Inside, you will find a king-sized canopy bed, a dedicated office desk, a large private lounge, and an open-concept en-suite bathroom with a freestanding clawfoot soaking tub. Guests also enjoy premium access to our concierge service.',
    price: 95000,
    capacity: 2,
    size: 75,
    bedType: '1 King Size Canopy',
    view: 'Wouri River & City Skyline',
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
    detailedDescription: 'Immerse yourself in nature in the Sage Garden Suite. Decorated in calm forest and sage hues, this room opens via glass double doors directly onto M&J Luxurious Guest House’s private gardens. It includes a comfortable seating alcove, a queen-sized plush bed, and an outdoor terrace with handcrafted bamboo furniture, ideal for sipping morning tea or evening refreshments in the gentle Douala ocean breeze.',
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
    name: 'Deluxe Wouri Studio',
    slug: 'deluxe-wouri-studio',
    description: 'Comfort meets functionality. Equipped with a modern kitchenette, suitable for extended stays and business travelers.',
    detailedDescription: 'The Deluxe Wouri Studio is perfect for business professionals or couples planning a longer stay. It contains a fully functional, modern kitchenette with an induction stove, microwave, and mini-fridge. The open-plan space includes a queen bed, a high-top dining/work counter, and large windows that frame the scenic views of the Wouri River. Rest easy with premium soundproofing and black-out drapery.',
    price: 50000,
    capacity: 2,
    size: 38,
    bedType: '1 Queen Size Bed',
    view: 'Wouri River Skyline',
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
    amenities: ['Private Bathroom', 'High-Speed Wi-Fi', 'Smart TV', 'Coffee & Tea Setup', 'Courtyard View', 'Writing Desk', 'Premium Linens'],
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
    detailedDescription: 'The Sunset View Double is a bright and airy room equipped with two premium double beds, making it ideal for group travelers or families. Large westward-facing windows flood the room with golden light during sunset, offering beautiful views of the vibrant Douala city landscape. Complete with a large closet, private bathroom, and interactive entertainment system.',
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
    view: 'Garden & Skyline View',
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
    comment: 'M&J Luxurious Guest House exceeded all expectations! The view of the Wouri River in the morning is breathtaking. The backup generator is flawless, and the Wi-Fi was fast enough for my Zoom calls. Will definitely stay here again on my next trip to Douala.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: '2',
    author: 'Sarah Jenkins',
    location: 'London, United Kingdom',
    rating: 5,
    date: '2026-06-02',
    comment: 'A true oasis of peace in Douala. The Sage Garden Suite is wonderful, and stepping directly onto the green lawns in the morning was magical. The staff is exceptionally polite, helping us coordinate our business meetings and city tour. Very clean and safe.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: '3',
    author: 'Fouda Marie',
    location: 'Douala, Cameroon',
    rating: 4,
    date: '2026-06-25',
    comment: 'Very professional guest house. I stayed in the Deluxe Wouri Studio for a business trip. Having a kitchen was very convenient. The area is quiet, secure, and has very clean air. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: '4',
    author: 'Amadou Bello',
    location: 'Garoua, Cameroon',
    rating: 5,
    date: '2026-07-08',
    comment: 'Beautiful decor, comfortable beds, and a delicious breakfast. We booked the Wouri Penthouse, and the terrace views are simply unmatched in Douala. Checking in and paying via Mobile Money was smooth and fast.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  }
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: '1',
    name: 'Wouri River & Bonabéri Bridge',
    distance: '3.5 km away',
    description: 'Scenic river views and historic bridge crossing. Take a relaxing sunset boat cruise or walk along the banks to experience the city\'s pulse.',
    category: 'Nature',
    image: '/assets/attractions/wouri-river.jpg',
    emoji: '🌉'
  },
  {
    id: '2',
    name: 'Doual\'art Contemporary Art Space',
    distance: '6.2 km away',
    description: 'A famous cultural center and art museum in Douala showcasing stunning paintings, installations, and public art monuments from top African artists.',
    category: 'Culture',
    image: '/assets/attractions/doualart.jpg',
    emoji: '🎨'
  },
  {
    id: '3',
    name: 'Maritime Museum of Douala',
    distance: '5.5 km away',
    description: 'A unique ship-shaped building detailing Cameroon\'s maritime history, port evolution, and local trade archives across multiple exhibits.',
    category: 'Culture',
    image: '/assets/attractions/maritime-museum.jpg',
    emoji: '🚢'
  },
  {
    id: '4',
    name: 'La Pagode (Maison des Rois)',
    distance: '4.8 km away',
    description: 'An architectural heritage icon built in the colonial era, serving as the historical palace and seat of Douala\'s kings in the Akwa district.',
    category: 'Culture',
    image: '/assets/attractions/pagode.jpg',
    emoji: '🏛️'
  }
];

export const FAQS: FAQ[] = [
  {
    id: '1',
    category: 'Booking',
    question: 'How do I confirm my booking at M&J Luxurious Guest House?',
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
    answer: 'Yes. To counter local utility outages, M&J Luxurious Guest House is equipped with a high-capacity, automatic-switch standby diesel generator and a private borehole water filtration system. You will enjoy uninterrupted power and clean water throughout your stay.'
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
  address: '12 Rue de Bonamussadi, Opposite Douala Mall',
  city: 'Bonamussadi, Douala',
  country: 'Cameroon',
  phone: '+237 670 123 456',
  whatsapp: 'https://wa.me/237670123456?text=Hello%20M%26J%20Luxurious%20Guest%20House%2C%20I%27d%20like%20to%20inquire%20about%20booking%20a%20room.',
  email: 'reservations@mjluxuriousguesthouse.com',
  workingHours: 'Front Desk: 24/7 | Reservations Office: 8:00 AM - 8:00 PM',
};

// Alias for convenience
export const CONTACTS = CONTACT_DETAILS;
