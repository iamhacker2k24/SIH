const mongoose = require('mongoose');

const logisticsSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Kisan Cold Storage & Warehouse", "Punjab Agri-Logistics"
  type: { type: String, enum: ['Cold Storage', 'Dry Warehouse', 'Transport Provider'], required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  capacityAvailableTonnes: { type: Number, required: true },
  costPerQuintalPerDay: { type: Number, required: true }, // for storage
  transportRatePerKmQuintal: Number, // for transport
  contactPhone: String,
  rating: { type: Number, default: 4.8 },
  temperatureControlled: { type: Boolean, default: true },
  humidityControlled: { type: Boolean, default: true },
  isGovtCertified: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Logistics', logisticsSchema);
