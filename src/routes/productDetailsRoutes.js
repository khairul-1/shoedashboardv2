// routes/productDetailsRoutes.js

const express = require('express');
const router = express.Router();
//const Product = require('../models/Product');
const Product = require('../models/productDetails'); // Import the Product model
const ProductUniqueIds = require('../models/ProductUniqueIds');

router.get('/productDetails/:uniqueId', async (req, res) => {
  try {
    const { uniqueId } = req.params;

    // Find the product ID associated with the unique ID
    const productUniqueId = await ProductUniqueIds.findOne({ uniqueId });

    if (!productUniqueId) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Find the product details using the product ID
    const product = await Product.findById(productUniqueId.productId);

    if (!product) {
      return res.status(404).json({ error: 'Product details not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
