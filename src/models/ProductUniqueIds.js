// models/ProductUniqueIds.js

const mongoose = require('mongoose');

const productUniqueIdsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductDetails',
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
});

const ProductUniqueIds = mongoose.model(
  'ProductUniqueIds',
  productUniqueIdsSchema,
);

module.exports = ProductUniqueIds;
