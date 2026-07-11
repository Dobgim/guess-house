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
    name: 'Apt 101 — 1st Floor Left',
    slug: 'apt-101-first-floor-left',
    description: 'Spacious and well-lit apartment on the first floor, left wing. Features a modern kitchenette, comfortable sleeping area, and private bathroom.',
    detailedDescription: 'Apartment 101 is a comfortable and fully self-contained unit on the ground floor, left side. It comes with a private bathroom, kitchenette with a mini-fridge and microwave, a cozy queen-sized bed, air conditioning, and high-speed Wi-Fi. Perfect for individuals or couples seeking a quiet, self-sufficient stay in Douala.',
    price: 35000,
    capacity: 2,
    size: 30,
    bedType: '1 Queen Size Bed',
    view: 'Front Street View',
    rating: 4.6,
    reviewsCount: 12,
    featured: false,
    amenities: ['Private Bathroom', 'Kitchenette', 'Mini Fridge', 'Microwave', 'High-Speed Wi-Fi', 'Air Conditioning', 'In-room Safe', 'Iron & Board'],
    images: [
      '/assets/rooms/apt-101-1.jpg',
      '/assets/rooms/apt-101-2.jpg'
    ]
  },
  {
    id: '2',
    name: 'Apt 102 — 1st Floor Right',
    slug: 'apt-102-first-floor-right',
    description: 'Bright and comfortable apartment on the first floor, right wing. Fully furnished with all modern essentials for a pleasant stay.',
    detailedDescription: 'Apartment 102 sits on the ground floor, right side, offering easy access and natural light throughout the day. The space features a queen-sized bed, en-suite bathroom, kitchenette with mini-fridge and microwave, air conditioning, and fast Wi-Fi. An ideal choice for short or extended business and leisure stays.',
    price: 35000,
    capacity: 2,
    size: 30,
    bedType: '1 Queen Size Bed',
    view: 'Side Garden View',
    rating: 4.6,
    reviewsCount: 9,
    featured: false,
    amenities: ['Private Bathroom', 'Kitchenette', 'Mini Fridge', 'Microwave', 'High-Speed Wi-Fi', 'Air Conditioning', 'In-room Safe', 'Iron & Board'],
    images: [
      '/assets/rooms/apt-102-1.jpg',
      '/assets/rooms/apt-102-2.jpg'
    ]
  },
  {
    id: '3',
    name: 'Apt 201 — 2nd Floor Left',
    slug: 'apt-201-second-floor-left',
    description: 'Elevated apartment on the second floor, left wing. Enjoy more privacy and a slightly elevated view of the neighborhood.',
    detailedDescription: 'Apartment 201 offers a refined second-floor experience with a cozy queen-sized bed, private bathroom, kitchenette, air conditioning, and fast Wi-Fi. The elevated position offers more privacy and a pleasant view of the street below. Ideal for travelers who appreciate calm and comfort.',
    price: 40000,
    capacity: 2,
    size: 32,
    bedType: '1 Queen Size Bed',
    view: 'Elevated Street View',
    rating: 4.7,
    reviewsCount: 14,
    featured: true,
    amenities: ['Private Bathroom', 'Kitchenette', 'Mini Fridge', 'Microwave', 'High-Speed Wi-Fi', 'Air Conditioning', 'Workspace Desk', 'In-room Safe'],
    images: [
      '/assets/rooms/apt-201-1.jpg',
      '/assets/rooms/apt-201-2.jpg'
    ]
  },
  {
    id: '4',
    name: 'Apt 202 — 2nd Floor Right',
    slug: 'apt-202-second-floor-right',
    description: 'Well-appointed apartment on the second floor, right wing. Tasteful furnishings, natural light, and all the comforts of home.',
    detailedDescription: 'Apartment 202 is a well-furnished second-floor unit, right side. Features include a queen-sized bed, private en-suite bathroom, kitchenette, air conditioning, and high-speed Wi-Fi. The bright and airy layout makes it a popular choice for couples and solo business travelers alike.',
    price: 40000,
    capacity: 2,
    size: 32,
    bedType: '1 Queen Size Bed',
    view: 'Open City View',
    rating: 4.7,
    reviewsCount: 11,
    featured: true,
    amenities: ['Private Bathroom', 'Kitchenette', 'Mini Fridge', 'Microwave', 'High-Speed Wi-Fi', 'Air Conditioning', 'Workspace Desk', 'In-room Safe'],
    images: [
      '/assets/rooms/apt-202-1.jpg',
      '/assets/rooms/apt-202-2.jpg'
    ]
  },
  {
    id: '5',
    name: 'Apt 301 — 3rd Floor Left',
    slug: 'apt-301-third-floor-left',
    description: 'Top-floor apartment on the left wing with breathtaking elevated city views. Quiet, breezy, and fully equipped.',
    detailedDescription: 'Apartment 301 sits at the top of the building on the left side, offering the best elevated views of the Douala cityscape. This spacious unit features a king-sized bed, private bathroom, full kitchenette, air conditioning, and high-speed Wi-Fi. The cool top-floor breezes add a natural comfort to your stay.',
    price: 50000,
    capacity: 2,
    size: 38,
    bedType: '1 King Size Bed',
    view: 'Panoramic City View',
    rating: 4.8,
    reviewsCount: 18,
    featured: true,
    amenities: ['Private Bathroom', 'Full Kitchenette', 'Mini Fridge', 'Microwave', 'High-Speed Wi-Fi', 'Air Conditioning', 'Workspace Desk', 'Premium Linens'],
    images: [
      '/assets/rooms/apt-301-1.jpg',
      '/assets/rooms/apt-301-2.jpg'
    ]
  },
  {
    id: '6',
    name: 'Apt 302 — 3rd Floor Right',
    slug: 'apt-302-third-floor-right',
    description: 'Premium top-floor apartment on the right wing. Elevated position, city panorama, and a luxuriously quiet atmosphere.',
    detailedDescription: 'Apartment 302 is a premium top-floor apartment on the right side, offering stunning panoramic views and the peace of being on the highest floor. Equipped with a king-sized bed, private bathroom, full kitchenette, air conditioning, and high-speed Wi-Fi, this apartment provides everything you need for a premium, self-sufficient stay.',
    price: 50000,
    capacity: 2,
    size: 38,
    bedType: '1 King Size Bed',
    view: 'Panoramic Skyline View',
    rating: 4.8,
    reviewsCount: 15,
    featured: true,
    amenities: ['Private Bathroom', 'Full Kitchenette', 'Mini Fridge', 'Microwave', 'High-Speed Wi-Fi', 'Air Conditioning', 'Workspace Desk', 'Premium Linens'],
    images: [
      '/assets/rooms/apt-302-1.jpg',
      '/assets/rooms/apt-302-2.jpg'
    ]
  },
  {
    id: '7',
    name: 'VIP Apartment',
    slug: 'vip-apartment',
    description: 'Our finest offering. A luxuriously spacious VIP apartment with premium furnishings, exclusive amenities, and top-tier privacy.',
    detailedDescription: 'The VIP Apartment at M&J Luxurious Apartment is our most exclusive unit. Featuring a king-sized premium bed, a large private bathroom with soaking tub, a fully equipped kitchenette, a separate lounge area with sofa seating, air conditioning, and ultra-fast Wi-Fi. Designed for guests who expect nothing short of excellence, this apartment offers unmatched comfort and privacy.',
    price: 85000,
    capacity: 3,
    size: 65,
    bedType: '1 King Size Premium Bed',
    view: 'VIP Panoramic City View',
    rating: 4.9,
    reviewsCount: 22,
    featured: true,
    amenities: ['Private Bathroom', 'Soaking Tub', 'Full Kitchenette', 'Mini Fridge', 'Microwave', 'High-Speed Wi-Fi', 'Air Conditioning', 'Sofa Lounge', 'Workspace Desk', 'Premium Linens', 'In-room Safe', '24/7 Concierge'],
    images: [
      '/assets/rooms/vip-1.jpg',
      '/assets/rooms/vip-2.jpg',
      '/assets/rooms/vip-3.jpg'
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
    comment: 'M&J Luxurious Apartment exceeded all expectations! The constant power and high-speed Wi-Fi were impressive. The backup generator is flawless, and the internet was fast enough for my Zoom calls. Will definitely stay here again on my next trip to Douala.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: '2',
    author: 'Sarah Jenkins',
    location: 'London, United Kingdom',
    rating: 5,
    date: '2026-06-02',
    comment: 'A true oasis of peace in Douala. The apartment is wonderful and the space is perfect. The staff is exceptionally polite, helping us coordinate our business meetings and city tour. Very clean and safe.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: '3',
    author: 'Fouda Marie',
    location: 'Douala, Cameroon',
    rating: 4,
    date: '2026-06-25',
    comment: 'Very professional apartment. I stayed here for a business trip. Having a self-contained kitchenette was very convenient. The area is quiet, secure, and has very clean air. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: '4',
    author: 'Amadou Bello',
    location: 'Garoua, Cameroon',
    rating: 5,
    date: '2026-07-08',
    comment: 'Beautiful decor, comfortable beds, and a very well-equipped kitchenette. We booked the VIP Apartment, and it was simply unmatched in Douala. Checking in and paying via Mobile Money was smooth and fast.',
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
    question: 'How do I confirm my booking at M&J Luxurious Apartment?',
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
    answer: 'Yes. To counter local utility outages, M&J Luxurious Apartment is equipped with a high-capacity, automatic-switch standby diesel generator and a private borehole water filtration system. You will enjoy uninterrupted power and clean water throughout your stay.'
  },
  {
    id: '4',
    category: 'Services',
    question: 'Is there a restaurant or food service on-site?',
    answer: 'No, we do not provide food service or breakfast. However, each apartment is equipped with a kitchenette including a mini-fridge and microwave for self-catering. There are excellent restaurants and eateries within walking distance in Bonamussadi, Douala.'
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
    question: 'Are pets allowed in the apartments?',
    answer: 'To maintain a peaceful and allergen-free environment for all our guests, pets are generally not permitted on the premises. Service animals are accepted upon prior arrangement.'
  }
];

export const CONTACT_DETAILS = {
  address: '12 Rue de Bonamussadi, Opposite Douala Mall',
  city: 'Bonamussadi, Douala',
  country: 'Cameroon',
  phone: '+237 679 554 114',
  whatsapp: 'https://wa.me/237679554114?text=Hello%20La%20Villa%20Rielle%20Guest%20House%2C%20I%27d%20like%20to%20inquire%20about%20booking%20an%20apartment.',
  email: 'reservations@mjluxuriousapartment.com',
  workingHours: 'Front Desk: 24/7 | Reservations Office: 8:00 AM - 8:00 PM',
};

// Alias for convenience
export const CONTACTS = CONTACT_DETAILS;
