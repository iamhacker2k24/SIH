const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  raisedByName: { type: String, required: true },
  raisedByRole: { type: String, enum: ['Farmer', 'FPO', 'Buyer'], required: true },
  category: { 
    type: String, 
    enum: ['Payment Delay', 'Quality Mismatch', 'Logistics Delay', 'Weight Discrepancy', 'Other'], 
    required: true 
  },
  orderId: String,
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'], default: 'OPEN' },
  resolutionNotes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grievance', grievanceSchema);
