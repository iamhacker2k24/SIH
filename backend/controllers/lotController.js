const Lot = require('../models/Lot');
const { getIsConnected } = require('../config/db');
const { initialLots } = require('../utils/seedData');

let memoryLots = [...initialLots];

// GET /api/lots
const getAllLots = async (req, res) => {
  try {
    const { commodity, grade, status } = req.query;
    let lots = memoryLots;

    if (commodity) {
      lots = lots.filter(l => l.commodity.toLowerCase().includes(commodity.toLowerCase()));
    }
    if (grade) {
      lots = lots.filter(l => l.grade === grade);
    }
    if (status) {
      lots = lots.filter(l => l.status === status);
    }

    res.json({ success: true, count: lots.length, data: lots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/lots/:id
const getLotById = async (req, res) => {
  try {
    const { id } = req.params;
    const lot = memoryLots.find(l => l.id === id || l._id?.toString() === id);

    if (!lot) {
      return res.status(404).json({ success: false, message: 'Produce lot not found' });
    }

    res.json({ success: true, data: lot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/lots
const createLot = async (req, res) => {
  try {
    const {
      sellerName,
      sellerRole,
      commodity,
      variety,
      quantityQuintals,
      askingPricePerQuintal,
      grade,
      moisturePercent,
      foreignMatterPercent,
      village,
      district,
      state,
      storageStatus,
      warehouseName,
      imageUrl
    } = req.body;

    const newLot = {
      id: `lot-${Date.now()}`,
      sellerId: req.user?.id || 'u-farmer-1',
      sellerName: sellerName || req.user?.name || 'Farmer Member',
      sellerRole: sellerRole || 'Farmer',
      commodity: commodity || 'Wheat',
      variety: variety || 'Standard Grade',
      quantityQuintals: Number(quantityQuintals) || 100,
      askingPricePerQuintal: Number(askingPricePerQuintal) || 2400,
      grade: grade || 'Grade A',
      qualityParameters: {
        moisturePercent: Number(moisturePercent) || 12.0,
        foreignMatterPercent: Number(foreignMatterPercent) || 1.0,
        grainSize: 'Standard'
      },
      location: {
        village: village || 'Local Harvest Gate',
        district: district || 'Ludhiana',
        state: state || 'Punjab'
      },
      harvestDate: new Date().toISOString().split('T')[0],
      storageStatus: storageStatus || 'At Farm Gate',
      warehouseName: warehouseName || 'N/A',
      images: [imageUrl || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop'],
      status: 'OPEN',
      bids: [],
      createdAt: new Date().toISOString()
    };

    memoryLots.unshift(newLot);

    res.status(201).json({
      success: true,
      message: 'Produce lot created and listed on digital market successfully!',
      data: newLot
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/lots/:id/bid
const placeBid = async (req, res) => {
  try {
    const { id } = req.params;
    const { buyerName, buyerCompany, bidPricePerQuintal, message } = req.body;

    const lotIndex = memoryLots.findIndex(l => l.id === id);
    if (lotIndex === -1) {
      return res.status(404).json({ success: false, message: 'Lot not found' });
    }

    const lot = memoryLots[lotIndex];
    const newBid = {
      id: `b-${Date.now()}`,
      buyerId: req.user?.id || 'u-buyer-1',
      buyerName: buyerName || 'Verified Buyer',
      buyerCompany: buyerCompany || 'AgriProcure India Ltd',
      bidPricePerQuintal: Number(bidPricePerQuintal),
      totalOfferAmount: Number(bidPricePerQuintal) * lot.quantityQuintals,
      message: message || 'Interested in immediate procurement.',
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    lot.bids.unshift(newBid);
    lot.status = 'BIDDED';

    res.status(201).json({
      success: true,
      message: 'Digital offer placed successfully!',
      data: newBid,
      lot
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/lots/:id/accept-bid
const acceptBid = async (req, res) => {
  try {
    const { id } = req.params;
    const { bidId } = req.body;

    const lot = memoryLots.find(l => l.id === id);
    if (!lot) return res.status(404).json({ success: false, message: 'Lot not found' });

    const bid = lot.bids.find(b => b.id === bidId);
    if (!bid) return res.status(404).json({ success: false, message: 'Bid not found' });

    bid.status = 'ACCEPTED';
    lot.status = 'SOLD';

    // Auto-create order entry
    const orderController = require('./orderController');
    const createdOrder = orderController.createOrderFromLot(lot, bid);

    res.json({
      success: true,
      message: 'Digital offer accepted! Order & Escrow payment pipeline initiated.',
      order: createdOrder,
      lot
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllLots,
  getLotById,
  createLot,
  placeBid,
  acceptBid,
  memoryLots
};
