const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || '/api';

const getHeaders = (user) => {
  return {
    'Content-Type': 'application/json',
    'x-user-id': user?.id || 'u-demo',
    'x-user-name': user?.name || 'Demo User',
    'x-user-role': user?.role || 'Farmer'
  };
};

export const api = {
  // Mandi Prices & Recommendations
  async getMandiPrices(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_BASE_URL}/mandi/prices?${query}`);
    return res.json();
  },

  async getMandiPriceById(id) {
    const res = await fetch(`${API_BASE_URL}/mandi/prices/${id}`);
    return res.json();
  },

  async getRecommendations() {
    const res = await fetch(`${API_BASE_URL}/mandi/recommendations`);
    return res.json();
  },

  // Produce Lots
  async getLots(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_BASE_URL}/lots?${query}`);
    return res.json();
  },

  async createLot(lotData, user) {
    const res = await fetch(`${API_BASE_URL}/lots`, {
      method: 'POST',
      headers: getHeaders(user),
      body: JSON.stringify(lotData)
    });
    return res.json();
  },

  async placeBid(lotId, bidData, user) {
    const res = await fetch(`${API_BASE_URL}/lots/${lotId}/bid`, {
      method: 'POST',
      headers: getHeaders(user),
      body: JSON.stringify(bidData)
    });
    return res.json();
  },

  async acceptBid(lotId, bidId, user) {
    const res = await fetch(`${API_BASE_URL}/lots/${lotId}/accept-bid`, {
      method: 'POST',
      headers: getHeaders(user),
      body: JSON.stringify({ bidId })
    });
    return res.json();
  },

  // Smart Matchmaker
  async getSmartMatches(role) {
    const res = await fetch(`${API_BASE_URL}/match?role=${role || 'Farmer'}`);
    return res.json();
  },

  // Logistics & Warehouses
  async getLogistics(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_BASE_URL}/logistics?${query}`);
    return res.json();
  },

  async bookLogistics(bookingData, user) {
    const res = await fetch(`${API_BASE_URL}/logistics/book`, {
      method: 'POST',
      headers: getHeaders(user),
      body: JSON.stringify(bookingData)
    });
    return res.json();
  },

  // Orders & Escrow
  async getOrders() {
    const res = await fetch(`${API_BASE_URL}/orders`);
    return res.json();
  },

  async updateEscrowStatus(orderId, escrowStatus) {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}/escrow`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ escrowStatus })
    });
    return res.json();
  },

  // Grievances
  async getGrievances() {
    const res = await fetch(`${API_BASE_URL}/grievance`);
    return res.json();
  },

  async createGrievance(data, user) {
    const res = await fetch(`${API_BASE_URL}/grievance`, {
      method: 'POST',
      headers: getHeaders(user),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateGrievanceStatus(id, status, resolutionNotes) {
    const res = await fetch(`${API_BASE_URL}/grievance/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, resolutionNotes })
    });
    return res.json();
  }
};
