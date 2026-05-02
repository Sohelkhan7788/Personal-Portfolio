const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'other'],
    required: true 
  },
  proficiency: { type: Number, min: 0, max: 100, default: 80 },
  icon: { type: String },
  color: { type: String, default: '#e74c3c' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Skill', skillSchema);
