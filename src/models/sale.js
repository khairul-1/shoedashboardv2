// models/Sale.js
const mongoose = require('mongoose');

// Check if the model has already been defined
const Sale =
  mongoose.models.Sale ||
  mongoose.model('Sale', {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true },
    buyerName: { type: String, required: true },
    saleDate: { type: Date, default: Date.now },
  });

module.exports = Sale;
