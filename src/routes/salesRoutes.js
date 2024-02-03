// // routes/salesRoutes.js
// //import { Router } from 'express';
// const Router = require('express');
// const router = Router();
// //import { create } from '../models/Sale';
// const create = require('../models/Sale');
// // Sell a product
// router.post('/sell', async (req, res) => {
//   try {
//     const sale = await create(req.body);
//     res.status(201).json({ sale });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Update inventory after sale
// router.put('/updateInventory/:productId', async (req, res) => {
//   try {
//     const { productId } = req.params;
//     // Update inventory logic here
//     res.json({ message: 'Inventory updated successfully' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// //export default router;
// module.exports = router;

const express = require('express');
const router = express.Router();
const Sale = require('../models/sale');
const Product = require('../models/productDetails');

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

// Sell a product and update inventory
router.post('/sell', async (req, res) => {
  const { productId, quantity, buyerName, saleDate } = req.body;
  //console.log(req.body);
  try {
    // Check if the product exists and has enough quantity
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (quantity > product.productQuantity) {
      return res.status(400).json({ error: 'Not enough quantity in stock' });
    }

    // Create a new sale record
    const sale = new Sale({
      productId,
      quantity,
      buyerName,
      saleDate: saleDate || new Date(), // Use provided saleDate or current date if not provided
    });

    // Save the sale record
    await sale.save();

    // Update the product quantity
    product.productQuantity -= quantity;
    await product.save();

    // Update the product quantity in ProductDetails collection
    await Product.updateOne(
      { _id: productId },
      { $inc: { ProductQuantity: -quantity } },
    );

    // Check if the updated quantity is zero and remove the product if so
    const updatedProduct = await Product.findById(productId);
    if (updatedProduct.ProductQuantity === 0) {
      await Product.deleteOne({ _id: productId });
      return res.status(200).json({
        sale,
        message:
          'Product sold successfully and inventory updated. Product removed from inventory.',
      });
    }

    res.status(201).json({
      sale,
      message: 'Product sold successfully and inventory updated',
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
