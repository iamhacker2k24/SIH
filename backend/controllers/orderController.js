const { initialOrders } = require('../utils/seedData');

let memoryOrders = [...initialOrders];

const createOrderFromLot = (lot, bid) => {
  const newOrder = {
    id: `ord-${Date.now().toString().substr(-5)}`,
    lotId: lot.id,
    commodity: lot.commodity,
    quantityQuintals: lot.quantityQuintals,
    agreedPricePerQuintal: bid.bidPricePerQuintal,
    totalAmount: bid.totalOfferAmount,
    sellerName: lot.sellerName,
    buyerName: bid.buyerName,
    buyerCompany: bid.buyerCompany,
    escrowStatus: 'OFFER_ACCEPTED',
    paymentMethod: 'AgriPay Digital Escrow',
    transportBookingId: `TRP-${Math.floor(1000 + Math.random() * 9000)}`,
    trackingCode: `TRACK-AGRI-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString()
  };

  memoryOrders.unshift(newOrder);
  return newOrder;
};

// GET /api/orders
const getAllOrders = async (req, res) => {
  try {
    res.json({ success: true, count: memoryOrders.length, data: memoryOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = memoryOrders.find(o => o.id === id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/orders/:id/escrow
const updateEscrowStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { escrowStatus } = req.body;

    const order = memoryOrders.find(o => o.id === id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    order.escrowStatus = escrowStatus;
    res.json({
      success: true,
      message: `Digital Escrow state updated to '${escrowStatus}' successfully`,
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrderFromLot,
  getAllOrders,
  getOrderById,
  updateEscrowStatus,
  memoryOrders
};
