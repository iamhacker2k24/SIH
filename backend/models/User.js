const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Farmer', 'FPO', 'Buyer', 'Admin'], 
    default: 'Farmer' 
  },
  location: {
    state: { type: String, default: 'Punjab' },
    district: { type: String, default: 'Ludhiana' },
    pincode: { type: String, default: '141001' }
  },
  fpoDetails: {
    fpoName: String,
    memberCount: Number,
    licenseNo: String
  },
  buyerDetails: {
    companyName: String,
    gstin: String,
    isVerified: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
