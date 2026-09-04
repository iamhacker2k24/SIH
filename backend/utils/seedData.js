const initialMandiPrices = [
  {
    id: 'm1',
    commodity: 'Wheat (Sharbati)',
    mandiName: 'APMC Karnal',
    state: 'Haryana',
    district: 'Karnal',
    minPrice: 2280,
    maxPrice: 2540,
    modalPrice: 2450,
    arrivalVolume: 1250,
    priceTrend: 'UP',
    qualityGradeRequirements: { moistureMaxPercent: 12, foreignMatterMaxPercent: 1.5, purityPercent: 98.5 },
    recommendation: {
      recommendedAction: 'HOLD_PRODUCT',
      optimalSaleWindowDays: 6,
      expectedPriceChangePercent: 7.2,
      reasoning: 'Arrival volumes dropped by 18% in neighboring districts. Flour millers in NCR region actively sourcing premium grade Wheat.'
    },
    historicalTrends: [
      { date: 'Aug 28', price: 2310, volume: 1400 },
      { date: 'Aug 29', price: 2340, volume: 1380 },
      { date: 'Aug 30', price: 2380, volume: 1320 },
      { date: 'Aug 31', price: 2410, volume: 1300 },
      { date: 'Sep 01', price: 2425, volume: 1290 },
      { date: 'Sep 02', price: 2435, volume: 1270 },
      { date: 'Sep 03', price: 2450, volume: 1250 }
    ]
  },
  {
    id: 'm2',
    commodity: 'Paddy (Basmati 1121)',
    mandiName: 'APMC Khanna',
    state: 'Punjab',
    district: 'Ludhiana',
    minPrice: 4100,
    maxPrice: 4650,
    modalPrice: 4520,
    arrivalVolume: 3400,
    priceTrend: 'UP',
    qualityGradeRequirements: { moistureMaxPercent: 14, foreignMatterMaxPercent: 1.0, purityPercent: 99.0 },
    recommendation: {
      recommendedAction: 'SELL_NOW',
      optimalSaleWindowDays: 2,
      expectedPriceChangePercent: 1.5,
      reasoning: 'Peak export buyer demand currently active. Price is at 60-day high with maximum liquidity.'
    },
    historicalTrends: [
      { date: 'Aug 28', price: 4200, volume: 2900 },
      { date: 'Aug 29', price: 4280, volume: 3100 },
      { date: 'Aug 30', price: 4350, volume: 3200 },
      { date: 'Aug 31', price: 4400, volume: 3300 },
      { date: 'Sep 01', price: 4460, volume: 3350 },
      { date: 'Sep 02', price: 4500, volume: 3380 },
      { date: 'Sep 03', price: 4520, volume: 3400 }
    ]
  },
  {
    id: 'm3',
    commodity: 'Tomato (Hybrid)',
    mandiName: 'Azadpur Mandi',
    state: 'Delhi',
    district: 'North Delhi',
    minPrice: 1800,
    maxPrice: 2400,
    modalPrice: 2150,
    arrivalVolume: 890,
    priceTrend: 'DOWN',
    qualityGradeRequirements: { moistureMaxPercent: 85, foreignMatterMaxPercent: 0.5, purityPercent: 97.0 },
    recommendation: {
      recommendedAction: 'SELL_NOW',
      optimalSaleWindowDays: 1,
      expectedPriceChangePercent: -4.5,
      reasoning: 'Heavy fresh arrivals expected from Himachal Pradesh tomorrow. Immediate sale recommended to prevent spoil loss.'
    },
    historicalTrends: [
      { date: 'Aug 28', price: 2600, volume: 650 },
      { date: 'Aug 29', price: 2500, volume: 710 },
      { date: 'Aug 30', price: 2420, volume: 750 },
      { date: 'Aug 31', price: 2350, volume: 800 },
      { date: 'Sep 01', price: 2280, volume: 830 },
      { date: 'Sep 02', price: 2200, volume: 860 },
      { date: 'Sep 03', price: 2150, volume: 890 }
    ]
  },
  {
    id: 'm4',
    commodity: 'Cotton (Medium Staple)',
    mandiName: 'APMC Rajkot',
    state: 'Gujarat',
    district: 'Rajkot',
    minPrice: 6800,
    maxPrice: 7450,
    modalPrice: 7200,
    arrivalVolume: 1850,
    priceTrend: 'UP',
    qualityGradeRequirements: { moistureMaxPercent: 8, foreignMatterMaxPercent: 2.0, purityPercent: 98.0 },
    recommendation: {
      recommendedAction: 'HOLD_PRODUCT',
      optimalSaleWindowDays: 7,
      expectedPriceChangePercent: 5.8,
      reasoning: 'Textile spinning mills opening fresh quarterly tenders next week. Grade A staple cotton prices projected to touch ₹7,600.'
    },
    historicalTrends: [
      { date: 'Aug 28', price: 6900, volume: 2100 },
      { date: 'Aug 29', price: 6950, volume: 2050 },
      { date: 'Aug 30', price: 7020, volume: 2000 },
      { date: 'Aug 31', price: 7100, volume: 1950 },
      { date: 'Sep 01', price: 7150, volume: 1900 },
      { date: 'Sep 02', price: 7180, volume: 1870 },
      { date: 'Sep 03', price: 7200, volume: 1850 }
    ]
  },
  {
    id: 'm5',
    commodity: 'Red Onion (Nashik)',
    mandiName: 'Vashi APMC',
    state: 'Maharashtra',
    district: 'Thane',
    minPrice: 2100,
    maxPrice: 2750,
    modalPrice: 2500,
    arrivalVolume: 2200,
    priceTrend: 'STABLE',
    qualityGradeRequirements: { moistureMaxPercent: 10, foreignMatterMaxPercent: 1.0, purityPercent: 99.0 },
    recommendation: {
      recommendedAction: 'TRANSFER_MANDI',
      optimalSaleWindowDays: 4,
      expectedPriceChangePercent: 8.0,
      reasoning: 'Consigning to Bengaluru APMC offers ₹2,800/quintal net margin after factoring transport costs.'
    },
    historicalTrends: [
      { date: 'Aug 28', price: 2480, volume: 2150 },
      { date: 'Aug 29', price: 2490, volume: 2180 },
      { date: 'Aug 30', price: 2500, volume: 2200 },
      { date: 'Aug 31', price: 2510, volume: 2210 },
      { date: 'Sep 01', price: 2500, volume: 2190 },
      { date: 'Sep 02', price: 2505, volume: 2200 },
      { date: 'Sep 03', price: 2500, volume: 2200 }
    ]
  }
];

const initialLots = [
  {
    id: 'lot-101',
    sellerId: 'u-1',
    sellerName: 'Gurpreet Singh (Malwa FPO)',
    sellerRole: 'FPO',
    commodity: 'Paddy (Basmati 1121)',
    variety: 'Pusa 1121 Export Grade',
    quantityQuintals: 450,
    askingPricePerQuintal: 4550,
    grade: 'Grade A',
    qualityParameters: { moisturePercent: 12.5, foreignMatterPercent: 0.8, grainSize: '8.35 mm' },
    location: { village: 'Samrala', district: 'Ludhiana', state: 'Punjab' },
    harvestDate: '2026-08-25',
    storageStatus: 'In Cold Storage',
    warehouseName: 'Malwa Agro Warehousing Facility',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop'],
    status: 'BIDDED',
    bids: [
      {
        id: 'b-1',
        buyerId: 'u-10',
        buyerName: 'Vikram Mehta',
        buyerCompany: 'Global Rice Exporters Pvt Ltd',
        bidPricePerQuintal: 4520,
        totalOfferAmount: 2034000,
        message: 'Can take delivery immediately upon digital inspection approval.',
        status: 'PENDING',
        createdAt: '2026-09-03T10:30:00Z'
      },
      {
        id: 'b-2',
        buyerId: 'u-11',
        buyerName: 'Rajesh Sharma',
        buyerCompany: 'Hindustan Grains Industry',
        bidPricePerQuintal: 4480,
        totalOfferAmount: 2016000,
        message: 'Prompt escrow release guaranteed within 24 hours.',
        status: 'PENDING',
        createdAt: '2026-09-03T14:15:00Z'
      }
    ],
    createdAt: '2026-09-02T08:00:00Z'
  },
  {
    id: 'lot-102',
    sellerId: 'u-2',
    sellerName: 'Ramesh Patel',
    sellerRole: 'Farmer',
    commodity: 'Cotton (Medium Staple)',
    variety: 'Shankar-6',
    quantityQuintals: 120,
    askingPricePerQuintal: 7300,
    grade: 'Grade A',
    qualityParameters: { moisturePercent: 7.2, foreignMatterPercent: 1.2, grainSize: '28 mm Staple' },
    location: { village: 'Gondal', district: 'Rajkot', state: 'Gujarat' },
    harvestDate: '2026-08-30',
    storageStatus: 'At Farm Gate',
    warehouseName: 'N/A',
    images: ['https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&auto=format&fit=crop'],
    status: 'OPEN',
    bids: [],
    createdAt: '2026-09-03T09:30:00Z'
  },
  {
    id: 'lot-103',
    sellerId: 'u-3',
    sellerName: 'Kishan Kumar (Karnal Farmers Group)',
    sellerRole: 'FPO',
    commodity: 'Wheat (Sharbati)',
    variety: 'Sharbati High Protein',
    quantityQuintals: 800,
    askingPricePerQuintal: 2480,
    grade: 'Grade A',
    qualityParameters: { moisturePercent: 11.0, foreignMatterPercent: 0.5, grainSize: 'Bold Grain' },
    location: { village: 'Taraori', district: 'Karnal', state: 'Haryana' },
    harvestDate: '2026-08-20',
    storageStatus: 'At Warehouse',
    warehouseName: 'Karnal WDRA Warehousing',
    images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop'],
    status: 'OPEN',
    bids: [],
    createdAt: '2026-09-03T11:00:00Z'
  }
];

const initialLogistics = [
  {
    id: 'log-1',
    name: 'Kisan Cold Chain & Smart Logistics',
    type: 'Cold Storage',
    district: 'Ludhiana',
    state: 'Punjab',
    capacityAvailableTonnes: 1500,
    costPerQuintalPerDay: 4.5,
    transportRatePerKmQuintal: 0.8,
    contactPhone: '+91 98765 43210',
    rating: 4.9,
    temperatureControlled: true,
    humidityControlled: true,
    isGovtCertified: true
  },
  {
    id: 'log-2',
    name: 'Karnal WDRA Multi-Commodity Warehouse',
    type: 'Dry Warehouse',
    district: 'Karnal',
    state: 'Haryana',
    capacityAvailableTonnes: 3200,
    costPerQuintalPerDay: 2.2,
    transportRatePerKmQuintal: 0.7,
    contactPhone: '+91 98123 88990',
    rating: 4.7,
    temperatureControlled: false,
    humidityControlled: true,
    isGovtCertified: true
  },
  {
    id: 'log-3',
    name: 'Express Agri Transport Logistics',
    type: 'Transport Provider',
    district: 'Rajkot',
    state: 'Gujarat',
    capacityAvailableTonnes: 800,
    costPerQuintalPerDay: 0,
    transportRatePerKmQuintal: 0.65,
    contactPhone: '+91 94221 77332',
    rating: 4.8,
    temperatureControlled: true,
    humidityControlled: false,
    isGovtCertified: true
  }
];

const initialOrders = [
  {
    id: 'ord-8001',
    lotId: 'lot-99',
    commodity: 'Wheat (Sharbati)',
    quantityQuintals: 300,
    agreedPricePerQuintal: 2420,
    totalAmount: 726000,
    sellerName: 'Surjit Singh (Farmer)',
    buyerName: 'Anil Kapoor',
    buyerCompany: 'ITC Foods Agri Business',
    escrowStatus: 'FUNDS_LOCKED',
    paymentMethod: 'AgriPay Digital Escrow',
    transportBookingId: 'TRP-9021',
    trackingCode: 'TRACK-AGRI-8821',
    createdAt: '2026-09-02T12:00:00Z'
  }
];

const initialGrievances = [
  {
    id: 'grv-401',
    ticketId: 'GRV-2026-104',
    raisedByName: 'Gurpreet Singh',
    raisedByRole: 'FPO',
    category: 'Weight Discrepancy',
    orderId: 'ord-8001',
    subject: 'Minor net weight mismatch at buyer receiving terminal',
    description: 'Weighbridge reading at source was 30.0 Tonnes whereas buyer unloader recorded 29.6 Tonnes. Requesting official recalibration check.',
    status: 'UNDER_REVIEW',
    resolutionNotes: 'Mandi Inspector assigned to verify weighbridge digital audit logs.',
    createdAt: '2026-09-03T16:00:00Z'
  }
];

module.exports = {
  initialMandiPrices,
  initialLots,
  initialLogistics,
  initialOrders,
  initialGrievances
};
