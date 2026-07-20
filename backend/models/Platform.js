const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String },
  url: { type: String },
  description: { type: String },
  grades: { type: [String], default: [] },
  streams: { type: [String], default: [] },
  budget: { type: String },
  price: { type: String },
  features: { type: [String], default: [] },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Platform', platformSchema);
