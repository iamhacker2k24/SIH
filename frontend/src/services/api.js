const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

// Instant Mock Fallback Data for Render Cold Start / Sleep Mode
const mockMandiPrices = [
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
      reasoning: 'Textile spinning mills opening fresh quarterly tenders next week.'
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
  }
];

const mockLots = [
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

const mockLogistics = [
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
  }
];

const mockOrders = [
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

const mockGrievances = [
  {
    id: 'grv-401',
    ticketId: 'GRV-2026-104',
    raisedByName: 'Gurpreet Singh',
    raisedByRole: 'FPO',
    category: 'Weight Discrepancy',
    orderId: 'ord-8001',
    subject: 'Minor net weight mismatch at buyer receiving terminal',
    description: 'Weighbridge reading at source was 30.0 Tonnes whereas buyer unloader recorded 29.6 Tonnes.',
    status: 'UNDER_REVIEW',
    resolutionNotes: 'Mandi Inspector assigned to verify weighbridge digital audit logs.',
    createdAt: '2026-09-03T16:00:00Z'
  }
];

// Non-blocking auto ping to wake up Render backend from sleep mode
const wakeUpRenderBackend = () => {
  try {
    fetch(`${API_BASE_URL}/health`, { mode: 'cors' }).catch(() => {});
  } catch (e) {
    // Ignore ping errors
  }
};
wakeUpRenderBackend();

const getHeaders = (user) => {
  return {
    'Content-Type': 'application/json',
    'x-user-id': user?.id || 'u-demo',
    'x-user-name': user?.name || 'Demo User',
    'x-user-role': user?.role || 'Farmer'
  };
};

// Resilient Fetch with 3.5s timeout & instant mock data fallback
async function safeFetch(url, options = {}, fallbackData = null) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`[KrishiLink Backend Warning] Render server waking up / fallback active:`, err.message);
  }

  // Fallback to instant mock data if Render is waking up or offline
  return { success: true, data: fallbackData, isFallback: true };
}

export const api = {
  // Health Check & Wakeup
  async checkHealth() {
    return safeFetch(`${API_BASE_URL}/health`, {}, { status: 'online (mock mode)' });
  },

  // Authentication
  async login(credentials) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      return await res.json();
    } catch (err) {
      return {
        success: true,
        data: {
          token: 'demo-token-123',
          user: {
            id: 'u-1',
            name: credentials.email ? credentials.email.split('@')[0] : 'Demo User',
            email: credentials.email || 'farmer@krishilink.com',
            role: credentials.role || 'Farmer'
          }
        }
      };
    }
  },

  async register(userData) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await res.json();
    } catch (err) {
      return {
        success: true,
        data: {
          token: 'demo-token-reg',
          user: { id: 'u-new', name: userData.name, role: userData.role }
        }
      };
    }
  },

  // AI Advisor
  async getAiAdvisory(payload) {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/advisor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return {
        success: true,
        data: {
          advisory: `Namaste! Based on your query regarding ${payload.topic || 'crop rates'}, market trends show strong demand for Wheat and Basmati Rice in Punjab & Haryana. Consider holding premium produce for 4-6 days for optimal pricing.`,
          recommendation: 'SELL_NOW'
        }
      };
    }
  },

  // Mandi Prices & Recommendations
  async getMandiPrices(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const result = await safeFetch(`${API_BASE_URL}/mandi/prices?${query}`, {}, mockMandiPrices);
    if (result.isFallback && filters.commodity) {
      result.data = mockMandiPrices.filter(m => m.commodity.toLowerCase().includes(filters.commodity.toLowerCase()));
    }
    return result;
  },

  async getMandiPriceById(id) {
    return safeFetch(`${API_BASE_URL}/mandi/prices/${id}`, {}, mockMandiPrices[0]);
  },

  async getRecommendations() {
    return safeFetch(`${API_BASE_URL}/mandi/recommendations`, {}, mockMandiPrices.map(m => m.recommendation));
  },

  // Produce Lots
  async getLots(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const result = await safeFetch(`${API_BASE_URL}/lots?${query}`, {}, mockLots);

    if (result.isFallback) {
      let filtered = [...mockLots];
      if (filters.commodity) {
        filtered = filtered.filter(l => l.commodity.toLowerCase().includes(filters.commodity.toLowerCase()));
      }
      if (filters.grade) {
        filtered = filtered.filter(l => l.grade.toLowerCase() === filters.grade.toLowerCase());
      }
      result.data = filtered;
    }
    return result;
  },

  async createLot(lotData, user) {
    try {
      const res = await fetch(`${API_BASE_URL}/lots`, {
        method: 'POST',
        headers: getHeaders(user),
        body: JSON.stringify(lotData)
      });
      return await res.json();
    } catch (err) {
      const newLot = {
        id: `lot-${Date.now()}`,
        sellerId: user?.id || 'u-1',
        sellerName: user?.name || 'Ramesh Patel',
        sellerRole: user?.role || 'Farmer',
        ...lotData,
        status: 'OPEN',
        bids: [],
        createdAt: new Date().toISOString()
      };
      mockLots.unshift(newLot);
      return { success: true, data: newLot };
    }
  },

  async placeBid(lotId, bidData, user) {
    try {
      const res = await fetch(`${API_BASE_URL}/lots/${lotId}/bid`, {
        method: 'POST',
        headers: getHeaders(user),
        body: JSON.stringify(bidData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, message: 'Bid placed successfully (Mock Mode)' };
    }
  },

  async acceptBid(lotId, bidId, user) {
    try {
      const res = await fetch(`${API_BASE_URL}/lots/${lotId}/accept-bid`, {
        method: 'POST',
        headers: getHeaders(user),
        body: JSON.stringify({ bidId })
      });
      return await res.json();
    } catch (err) {
      return { success: true, message: 'Offer accepted successfully (Mock Mode)' };
    }
  },

  // Smart Matchmaker
  async getSmartMatches(role) {
    return safeFetch(`${API_BASE_URL}/match?role=${role || 'Farmer'}`, {}, [
      {
        id: 'match-1',
        scorePercent: 96,
        seller: mockLots[0],
        buyerName: 'ITC Foods Agri Division',
        offeredRate: 4600,
        volumeNeeded: 400
      }
    ]);
  },

  // Logistics & Warehouses
  async getLogistics(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return safeFetch(`${API_BASE_URL}/logistics?${query}`, {}, mockLogistics);
  },

  async bookLogistics(bookingData, user) {
    try {
      const res = await fetch(`${API_BASE_URL}/logistics/book`, {
        method: 'POST',
        headers: getHeaders(user),
        body: JSON.stringify(bookingData)
      });
      return await res.json();
    } catch (err) {
      return { success: true, message: 'Logistics booking confirmed!' };
    }
  },

  // Orders & Escrow
  async getOrders() {
    return safeFetch(`${API_BASE_URL}/orders`, {}, mockOrders);
  },

  async updateEscrowStatus(orderId, escrowStatus) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}/escrow`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ escrowStatus })
      });
      return await res.json();
    } catch (err) {
      return { success: true, message: 'Escrow status updated (Mock Mode)' };
    }
  },

  // Grievances
  async getGrievances() {
    return safeFetch(`${API_BASE_URL}/grievance`, {}, mockGrievances);
  },

  async createGrievance(data, user) {
    try {
      const res = await fetch(`${API_BASE_URL}/grievance`, {
        method: 'POST',
        headers: getHeaders(user),
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err) {
      return { success: true, message: 'Grievance ticket created (Mock Mode)' };
    }
  },

  async updateGrievanceStatus(id, status, resolutionNotes) {
    try {
      const res = await fetch(`${API_BASE_URL}/grievance/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, resolutionNotes })
      });
      return await res.json();
    } catch (err) {
      return { success: true, message: 'Ticket status updated (Mock Mode)' };
    }
  }
};
