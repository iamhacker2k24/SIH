const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  lotId: { type: String, required: true },
  commodity: { type: String, required: true },
  quantityQuintals: { type: Number, required: true },
  agreedPricePerQuintal: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  sellerName: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerCompany: { type: String, required: true },
  escrowStatus: {
    type: String,
    enum: ['OFFER_ACCEPTED', 'FUNDS_LOCKED', 'INSPECTION_PASSED', 'IN_TRANSIT', 'DELIVERED', 'PAYMENT_RELEASED'],
    default: 'OFFER_ACCEPTED'
  },
  paymentMethod: { type: String, default: 'Digital Escrow (AgriPay)' },
  transportBookingId: String,
  trackingCode: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
