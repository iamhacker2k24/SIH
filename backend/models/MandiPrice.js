const mongoose = require('mongoose');

const mandiPriceSchema = new mongoose.Schema({
  commodity: { type: String, required: true }, // Wheat, Paddy (Basmati), Tomato, Cotton, Onion, Maize, Mustard
  mandiName: { type: String, required: true }, // Azadpur (Delhi), Vashi (Mumbai), APMC Karnal, APMC Khanna, APMC Rajkot
  state: { type: String, required: true },
  district: { type: String, required: true },
  minPrice: { type: Number, required: true }, // in ₹ per Quintal
  maxPrice: { type: Number, required: true },
  modalPrice: { type: Number, required: true },
  arrivalVolume: { type: Number, required: true }, // in Tonnes
  priceTrend: { type: String, enum: ['UP', 'DOWN', 'STABLE'], default: 'UP' },
  qualityGradeRequirements: {
    moistureMaxPercent: Number,
    foreignMatterMaxPercent: Number,
    purityPercent: Number
  },
  recommendation: {
    recommendedAction: { type: String, enum: ['SELL_NOW', 'HOLD_PRODUCT', 'TRANSFER_MANDI'], default: 'SELL_NOW' },
    optimalSaleWindowDays: Number, // e.g. 5 days
    expectedPriceChangePercent: Number, // e.g. +7.5%
    reasoning: String
  },
  historicalTrends: [
    {
      date: String,
      price: Number,
      volume: Number
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MandiPrice', mandiPriceSchema);
