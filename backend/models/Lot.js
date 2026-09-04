const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  buyerId: String,
  buyerName: String,
  buyerCompany: String,
  bidPricePerQuintal: Number,
  totalOfferAmount: Number,
  message: String,
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
});

const lotSchema = new mongoose.Schema({
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true },
  sellerRole: { type: String, enum: ['Farmer', 'FPO'], default: 'Farmer' },
  commodity: { type: String, required: true },
  variety: { type: String, default: 'Standard Grade' },
  quantityQuintals: { type: Number, required: true },
  askingPricePerQuintal: { type: Number, required: true },
  grade: { type: String, enum: ['Grade A', 'Grade B', 'Grade C', 'Organic Certified'], default: 'Grade A' },
  qualityParameters: {
    moisturePercent: Number,
    foreignMatterPercent: Number,
    grainSize: String
  },
  location: {
    village: String,
    district: String,
    state: String
  },
  harvestDate: String,
  storageStatus: { type: String, enum: ['At Farm Gate', 'In Cold Storage', 'At Warehouse'], default: 'At Farm Gate' },
  warehouseName: String,
  images: [String],
  status: { type: String, enum: ['OPEN', 'BIDDED', 'SOLD', 'CANCELLED'], default: 'OPEN' },
  bids: [bidSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lot', lotSchema);
