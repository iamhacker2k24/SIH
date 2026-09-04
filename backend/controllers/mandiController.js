const MandiPrice = require('../models/MandiPrice');
const { getIsConnected } = require('../config/db');
const { initialMandiPrices } = require('../utils/seedData');

let memoryMandiPrices = [...initialMandiPrices];

// GET /api/mandi/prices
const getAllPrices = async (req, res) => {
  try {
    const { commodity, state, district } = req.query;
    let prices = [];

    if (getIsConnected()) {
      let query = {};
      if (commodity) query.commodity = { $regex: commodity, $options: 'i' };
      if (state) query.state = { $regex: state, $options: 'i' };
      if (district) query.district = { $regex: district, $options: 'i' };
      prices = await MandiPrice.find(query);
      if (prices.length === 0) prices = memoryMandiPrices;
    } else {
      prices = memoryMandiPrices;
      if (commodity) {
        prices = prices.filter(p => p.commodity.toLowerCase().includes(commodity.toLowerCase()));
      }
      if (state) {
        prices = prices.filter(p => p.state.toLowerCase().includes(state.toLowerCase()));
      }
    }

    res.json({ success: true, count: prices.length, data: prices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/mandi/prices/:id
const getPriceById = async (req, res) => {
  try {
    const { id } = req.params;
    let price = memoryMandiPrices.find(p => p.id === id || p._id?.toString() === id);

    if (!price && getIsConnected()) {
      price = await MandiPrice.findById(id);
    }

    if (!price) {
      return res.status(404).json({ success: false, message: 'Mandi price record not found' });
    }

    res.json({ success: true, data: price });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/mandi/recommendations
const getRecommendations = async (req, res) => {
  try {
    const recommendations = memoryMandiPrices.map(item => ({
      mandiId: item.id,
      commodity: item.commodity,
      mandiName: item.mandiName,
      currentModalPrice: item.modalPrice,
      recommendation: item.recommendation
    }));
    res.json({ success: true, count: recommendations.length, data: recommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/mandi/prices
const createOrUpdatePrice = async (req, res) => {
  try {
    const newPrice = {
      id: `m-${Date.now()}`,
      ...req.body,
      updatedAt: new Date()
    };
    memoryMandiPrices.unshift(newPrice);
    res.status(201).json({ success: true, message: 'Mandi price updated successfully', data: newPrice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllPrices,
  getPriceById,
  getRecommendations,
  createOrUpdatePrice,
  memoryMandiPrices
};
