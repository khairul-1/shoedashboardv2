// models/CustomizedShoe.js

const mongoose = require('mongoose');

const customizedShoeSchema = new mongoose.Schema({
  color: { type: String, required: true },
  material: { type: String, required: true },
  size: { type: String, required: true },
  category: { type: String, required: true },
  additionalFeatures: { type: String },
  username: { type: String, required: true },
  status: {
    type: String,
    default: 'pending', // Initial status is pending
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const CustomizedShoe = mongoose.model('CustomizedShoe', customizedShoeSchema);

module.exports = CustomizedShoe;
