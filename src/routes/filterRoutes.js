const express = require('express');
const router = express.Router();
const Product = require('../models/productDetails');

router.get('/filter', async (req, res) => {
  try {
    let filter = {};
    for (const key in req.query) {
      if (req.query[key]) {
        if (key === 'minPrice' || key === 'maxPrice') {
          filter['ProductPrice'] = filter['ProductPrice'] || {};
          filter['ProductPrice']['$gte'] = parseInt(req.query[key]);
        } else if (key === 'startDate' || key === 'endDate') {
          filter['ReleaseDate'] = filter['ReleaseDate'] || {};
          filter['ReleaseDate']['$gte'] = req.query[key];
        } else if (key === 'size') {
          filter['Size'] = { $in: req.query[key] };
        } else if (key === 'color') {
          filter['Color'] = { $in: req.query[key] };
        } else {
          filter[key] = req.query[key];
        }
      }
    }

    const products = await Product.find(filter);
    res.json({ products });
    //console.log('Filtered Products:', products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
