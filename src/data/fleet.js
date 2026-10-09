export const FLEET_DATA = [
  // --- ADVENTURE BIKES ---
  {
    id: 'suzuki-vstrom-800de',
    name: 'Suzuki V-Strom 800DE',
    category: 'Adventure Bikes',
    type: '776cc Parallel-Twin Adventure',
    priceThb: 1600,
    priceUsd: 45,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badges: ['Ultimate Off-Road', 'Mae Hong Son Loop'],
    specs: {
      engine: '776cc DOHC Parallel-Twin',
      transmission: '6-Speed with Quickshifter',
      brakes: 'Dual Discs + Switchable ABS',
      helmets: '2 Full-Face Helmets Included',
      fuelCapacity: '20 Liters (400km Range)',
      storage: 'Pannier Racks Ready'
    },
    depositThb: 5000,
    suitability: 'Conquer the 1,864 mountain curves of Mae Hong Son or rugged Northern trails.'
  },
  {
    id: 'honda-transalp-750',
    name: 'Honda Transalp 750',
    category: 'Adventure Bikes',
    type: '755cc Parallel-Twin Touring',
    priceThb: 1500,
    priceUsd: 42,
    image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badges: ['Long Distance Comfort', 'Selectable Riding Modes'],
    specs: {
      engine: '755cc 8-Valve Parallel Twin',
      transmission: '6-Speed Manual',
      brakes: 'Dual Front Discs with ABS',
      helmets: '2 Premium Helmets Included',
      fuelCapacity: '16.9 Liters',
      storage: 'Top Box & Phone Mount'
    },
    depositThb: 5000,
    suitability: 'Perfect balance of power and agility for Pai, Doi Inthanon, and long mountain journeys.'
  },
  {
    id: 'honda-nx500',
    name: 'Honda NX500 Adventure',
    category: 'Adventure Bikes',
    type: '471cc Dual-Sport Tourer',
    priceThb: 950,
    priceUsd: 27,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
    popular: false,
    badges: ['Lightweight Adventure', 'HSTC Traction Control'],
    specs: {
      engine: '471cc Twin Cylinder',
      transmission: '6-Speed',
      brakes: 'Dual Front Discs + ABS',
      helmets: '2 Helmets Included',
      fuelCapacity: '17.5 Liters',
      storage: 'Rear Luggage Rack'
    },
    depositThb: 3000,
    suitability: 'Versatile dual-sport for both city streets and winding mountain twisties.'
  },
  {
    id: 'triumph-scrambler-400',
    name: 'Triumph Scrambler 400X',
    category: 'Adventure Bikes',
    type: '398cc Neo-Retro Scrambler',
    priceThb: 900,
    priceUsd: 25,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badges: ['British Heritage', 'Iconic Style'],
    specs: {
      engine: '398cc Liquid-Cooled Single',
      transmission: '6-Speed with Slipper Clutch',
      brakes: 'ByBre Discs with Switchable ABS',
      helmets: '2 Retro Helmets Included',
      fuelCapacity: '13 Liters',
      storage: 'Compact Tail Pack'
    },
    depositThb: 3000,
    suitability: 'Classic scrambler styling combined with responsive torque for scenic valley loops.'
  },

  // --- PREMIUM SCOOTERS ---
  {
    id: 'yamaha-nmax-155',
    name: 'Yamaha NMAX 155cc ABS',
    category: 'Premium Scooters',
    type: '155cc VVA Maxi Scooter',
    priceThb: 350,
    priceUsd: 10,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badges: ['Doi Suthep Favorite', 'Dual-Channel ABS'],
    specs: {
      engine: '155cc VVA Liquid-Cooled',
      transmission: 'Automatic (CVT)',
      brakes: 'Front & Rear Disc + ABS',
      helmets: '2 Premium Helmets Included',
      fuelCapacity: '7.1 Liters',
      storage: '23.3L Underseat Box + Phone Mount'
    },
    depositThb: 2000,
    suitability: 'Smooth mountain power for Doi Suthep, Samoeng Loop, and highway cruises.'
  },
  {
    id: 'honda-pcx-160',
    name: 'Honda PCX 160cc eSP+',
    category: 'Premium Scooters',
    type: '160cc Luxury Maxi Scooter',
    priceThb: 380,
    priceUsd: 11,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    popular: false,
    badges: ['Ultra Comfortable', 'Smart Keyless'],
    specs: {
      engine: '157cc 4-Valve eSP+',
      transmission: 'Automatic',
      brakes: 'ABS + HSTC Torque Control',
      helmets: '2 Premium Helmets Included',
      fuelCapacity: '8.1 Liters',
      storage: '30L Underseat Box + USB Charger'
    },
    depositThb: 2000,
    suitability: 'Maximum rider & passenger comfort with keyless start and phone charging.'
  },

  // --- CITY SCOOTERS ---
  {
    id: 'honda-click-125',
    name: 'Honda Click 125cc',
    category: 'City Scooters',
    type: '125cc Automatic Scooter',
    priceThb: 250,
    priceUsd: 7,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badges: ['Most Popular', 'Nimman & Old City'],
    specs: {
      engine: '124.9cc eSP Engine',
      transmission: 'Automatic (CVT)',
      brakes: 'Combi Brake System (CBS)',
      helmets: '2 Free Helmets Included',
      fuelCapacity: '5.5 Liters',
      storage: '18L Underseat Helmet Box'
    },
    depositThb: 1000,
    suitability: 'Agile and fuel-efficient for navigating traffic, night markets, and Old City temples.'
  },
  {
    id: 'yamaha-grand-filano',
    name: 'Yamaha Grand Filano 125cc',
    category: 'City Scooters',
    type: '125cc Hybrid Scooter',
    priceThb: 280,
    priceUsd: 8,
    image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80',
    popular: false,
    badges: ['Classic European Style', 'Hybrid Fuel Saver'],
    specs: {
      engine: '125cc Blue Core Hybrid',
      transmission: 'Automatic',
      brakes: 'Front Disc / Rear Drum',
      helmets: '2 Helmets Included',
      fuelCapacity: '4.4 Liters',
      storage: '27L Extra Large Underseat Storage'
    },
    depositThb: 1000,
    suitability: 'Chic European styling with huge underseat storage for shopping and cafe hopping.'
  },

  // --- SPORTS BIKES ---
  {
    id: 'kawasaki-ninja-500',
    name: 'Kawasaki Ninja 500',
    category: 'Sports Bikes',
    type: '451cc Twin Sport Performance',
    priceThb: 1100,
    priceUsd: 31,
    image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80',
    popular: false,
    badges: ['Sport Naked Performance', 'Canyon Carver'],
    specs: {
      engine: '451cc Parallel-Twin',
      transmission: '6-Speed Manual',
      brakes: 'ABS Disc Brakes',
      helmets: '2 Full-Face Helmets Included',
      fuelCapacity: '14 Liters',
      storage: 'Tank Mount Available'
    },
    depositThb: 4000,
    suitability: 'Aggressive sport styling for thrilling cornering on mountain twisties.'
  },
  {
    id: 'yamaha-pg-1',
    name: 'Yamaha PG-1 Adventure Scrambler',
    category: 'Sports Bikes',
    type: '115cc Outdoor Scrambler',
    priceThb: 320,
    priceUsd: 9,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badges: ['Trendy Outdoor Style', 'High Ground Clearance'],
    specs: {
      engine: '114cc Air-Cooled 4-Stroke',
      transmission: '4-Speed Semi-Automatic',
      brakes: 'Front Disc / Rear Drum',
      helmets: '2 Helmets Included',
      fuelCapacity: '5.1 Liters',
      storage: 'Block Knobby Tires'
    },
    depositThb: 1500,
    suitability: 'Fun and lightweight outdoor scrambler for dirt roads and scenic mountain trails.'
  },

  // --- TOURING ACCESSORIES ---
  {
    id: 'touring-gear-set',
    name: 'Touring Accessories Package',
    category: 'Touring Accessories',
    type: 'Safety & Protection Gear',
    priceThb: 100,
    priceUsd: 3,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    popular: false,
    badges: ['Helmets, Gloves & Jackets', 'Rent or Buy'],
    specs: {
      helmets: 'Full-Face / Modular Helmets (S, M, L, XL)',
      protection: 'Padded Riding Jackets & Gloves',
      mounts: 'Vibration-Dampened Phone Holders',
      storage: 'Waterproof Dry Bags'
    },
    depositThb: 500,
    suitability: 'Essential gear for safe, comfortable long-distance riding across Northern Thailand.'
  }
];

export const INITIAL_AI_MESSAGES = [
  {
    id: 1,
    sender: 'ai',
    text: "Sawatdee krub! Welcome to Mr. Pop Chiang Mai — your trusted rider partner since 1956. How can I help you choose the right bike today?",
    time: 'Just now',
    pills: [
      '🛵 City Scooter for Old City (250 THB)',
      '⛰️ Doi Suthep 155cc with ABS',
      '🏍️ Adventure Bike for Pai / Loop',
      '🪖 Touring Gear & Accessories'
    ]
  }
];
