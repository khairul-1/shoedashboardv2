// models/Sale.js
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, required: true },
  buyerName: { type: String, required: true },
  saleDate: { type: Date, default: Date.now },
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
