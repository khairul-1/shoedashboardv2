const express = require('express');
const router = express.Router();
const Product = require('../models/productDetails'); // Import the Product model
const config = require('../apps/config');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  //const token = req.headers.authorization;

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token required' });
  }

  jwt.verify(token, `${config.jwt_data}`, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      req.user = decodedToken.user;
      next();
    }
  });
};

router.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body); // Use Product model to create a new product
    res.status(201).json({ product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/products', verifyToken, async (req, res) => {
  try {
    const products = await Product.find(); // Use Product model to find all products
    //console.log(products);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.put('/products/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     //console.log(id);
//     const product = await Product.findByIdAndUpdate(id, req.body, {
//       new: true,
//     }); // Use Product model to find and update a product
//     res.json(product);
//     //console.log(product);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Update a product
router.put('/updateProduct/:productId', async (req, res) => {
  const { productId } = req.params;
  //console.log(productId);
  const updatedProductData = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product with the new data
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true },
    );

    res.status(200).json({ updatedProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id); // Use Product model to find and delete a product
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
