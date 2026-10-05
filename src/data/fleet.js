export const FLEET_DATA = [
  {
    id: 'honda-click-125',
    name: 'Honda Click 125cc',
    category: 'Scooter',
    type: '125cc Automatic',
    priceThb: 250,
    priceUsd: 7,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badges: ['Most Popular for City', 'Agile & Fuel Efficient'],
    specs: {
      engine: '124.9 cc Liquid-Cooled',
      transmission: 'Automatic (CVT)',
      brakes: 'Combi Brake System (CBS)',
      helmets: '2 Free Helmets Included',
      fuelCapacity: '5.5 Liters (Gasoline 91/95)',
      storage: 'Underseat Storage Box'
    },
    depositThb: 1000,
    suitability: 'Ideal for navigating Old City moats, Nimman cafes, and short trips to Wat Umong.'
  },
  {
    id: 'yamaha-nmax-155',
    name: 'Yamaha NMAX 155cc ABS',
    category: 'Maxi Scooter',
    type: '155cc Premium Automatic',
    priceThb: 350,
    priceUsd: 10,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badges: ['Doi Suthep Ready', 'Dual-Channel ABS'],
    specs: {
      engine: '155 cc VVA Engine',
      transmission: 'Automatic (CVT)',
      brakes: 'Front & Rear Disc + ABS',
      helmets: '2 Premium Helmets Included',
      fuelCapacity: '7.1 Liters',
      storage: '23.3L Big Underseat Storage'
    },
    depositThb: 2000,
    suitability: 'Perfect for riding up Doi Suthep mountain, Samoeng Loop, and long highway cruises.'
  },
  {
    id: 'honda-pcx-160',
    name: 'Honda PCX 160cc e:HEV',
    category: 'Maxi Scooter',
    type: '160cc Luxury Cruiser',
    priceThb: 380,
    priceUsd: 11,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    popular: false,
    badges: ['Ultra Comfortable', 'Smart Keyless'],
    specs: {
      engine: '157 cc eSP+ 4-Valve',
      transmission: 'Automatic',
      brakes: 'ABS + Honda Selectable Torque Control',
      helmets: '2 Premium Helmets Included',
      fuelCapacity: '8.1 Liters',
      storage: '30L Helmet Storage + USB Charger'
    },
    depositThb: 2000,
    suitability: 'Spacious seating position with USB phone charger for touring around Chiang Mai province.'
  },
  {
    id: 'honda-cb500x',
    name: 'Honda CB500X Adventure',
    category: 'Big Bike',
    type: '500cc Twin Adventure Tourer',
    priceThb: 950,
    priceUsd: 27,
    image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80',
    popular: false,
    badges: ['Mae Hong Son Loop', 'Dual Front Discs'],
    specs: {
      engine: '471 cc Parallel-Twin',
      transmission: '6-Speed Manual',
      brakes: 'Dual 296mm Front Discs with ABS',
      helmets: '2 Full-Face Helmets Included',
      fuelCapacity: '17.5 Liters (400km Range)',
      storage: 'Side Panniers + Top Box Available'
    },
    depositThb: 5000,
    suitability: 'Conquer the 1,864 curves of the Mae Hong Son loop or ride to Pai in style.'
  },
  {
    id: 'toyota-yaris-ativ',
    name: 'Toyota Yaris ATIV Sedan',
    category: 'Car',
    type: '1.2L 5-Seater Automatic',
    priceThb: 1100,
    priceUsd: 31,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badges: ['Airport CNX Delivery', 'Apple CarPlay & Android Auto'],
    specs: {
      engine: '1.2L Dual VVT-iE 4-Cylinder',
      transmission: 'Super CVT-i Automatic',
      brakes: 'ABS + EBD + Brake Assist',
      seating: '5 Passengers + 3 Luggage Bags',
      fuelCapacity: '40 Liters',
      extras: 'Rear Camera & Parking Sensors'
    },
    depositThb: 3000,
    suitability: 'Comfortable air-conditioned compact car for families touring Chiang Mai temples and markets.'
  },
  {
    id: 'honda-crv-turbo',
    name: 'Honda CR-V Turbo AWD SUV',
    category: 'Car',
    type: '1.5L Turbo 7-Seater AWD',
    priceThb: 1850,
    priceUsd: 52,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    popular: false,
    badges: ['Real 4WD SUV', 'Panoramic Sunroof'],
    specs: {
      engine: '1.5L VTEC Turbo (190 HP)',
      transmission: 'CVT AWD',
      brakes: 'Honda SENSING Active Safety',
      seating: '7 Passengers + 4 Large Bags',
      fuelCapacity: '57 Liters',
      extras: 'Leather Seats & Wireless Charging'
    },
    depositThb: 5000,
    suitability: 'Premium all-weather SUV for exploring Doi Inthanon National Park and mountain resorts.'
  }
];

export const INITIAL_AI_MESSAGES = [
  {
    id: 1,
    sender: 'ai',
    text: "Sawatdee krub! I'm Mr. Pop's AI Assistant. How can I help you explore Chiang Mai today?",
    time: 'Just now',
    pills: [
      '🛵 Scooter for Old City (250 THB)',
      '⛰️ Doi Suthep mountain bike',
      '🚗 Car for Airport pickup (CNX)',
      '📄 ID & Permit requirements'
    ]
  }
];
