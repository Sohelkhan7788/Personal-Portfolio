const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issuerLogo: { type: String },
  issueDate: { type: String, required: true },
  expiryDate: { type: String },
  credentialUrl: { type: String },
  credentialId: { type: String },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certification', certificationSchema);
