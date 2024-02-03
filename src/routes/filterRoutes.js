// // routes/filterRoutes.js
// //import { Router } from 'express';
// const Router = require('express');
// const router = Router();
// //import { find } from '../models/productDetails';
// const find = require('../models/productDetails');
// // Filter by price range
// router.get('/filter/price', async (req, res) => {
//   try {
//     const { minPrice, maxPrice } = req.query;
//     const products = await find({
//       productPrice: { $gte: minPrice, $lte: maxPrice },
//     });
//     res.json({ products });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Similar routes for other filtering options

// //export default router;
// module.exports = router;

//-----------------------DYnamic Filter------------------------------
//-----------------------------------------------------------

// For example, users can make requests like:

// /filter?minPrice=50&maxPrice=100&brand=Nike&size=10&color=Black,White
// /filter?brand=Adidas&style=Running
// /filter?color=Red&material=Leather

//
// const express = require('express');
// const router = express.Router();
// const Product = require('../models/productDetails');

// // Dynamic filter
// router.post('/filter', async (req, res) => {
//   try {
//     // Extract filter criteria from request body
//     const filterCriteria = req.body;
//     console.log(req.body);
//     // Construct the filter object dynamically
//     const filter = {};
//     for (const key in filterCriteria) {
//       // Check if the query parameter exists and is not an empty string
//       if (filterCriteria[key] && filterCriteria[key] !== '') {
//         // For arrays (e.g., size, color), use $in operator
//         if (Array.isArray(filterCriteria[key])) {
//           filter[key] = { $in: filterCriteria[key] };
//         } else {
//           filter[key] = filterCriteria[key];
//         }
//       }
//     }

//     // Find products matching the dynamic filter
//     const products = await Product.find(filter);
//     res.json({ products });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

//-------------------- Separate Filter---------------------
//-----------------------------------------------------------

//filter/price?minPrice=10&maxPrice=100
//filter/brand?brand=Nike
//filter/color?color=Red&color=Blue
// // Filter by price range
// ///api/filter/price?minPrice=170&maxPrice=190

//====================================================================

// const express = require('express');
// const router = express.Router();
// const Product = require('../models/productDetails');

// router.get('/filter/price', async (req, res) => {
//   try {
//     const { minPrice, maxPrice } = req.query;
//     const products = await Product.find({
//       ProductPrice: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) },
//     }).exec();
//     res.json({ products });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Filter by release date range
// router.get('/filter/releaseDate', async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;
//     const products = await Product.find({
//       ReleaseDate: { $gte: startDate, $lte: endDate },
//     });
//     res.json({ products });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Filter by brand
// router.get('/filter/brand', async (req, res) => {
//   try {
//     const { brand } = req.query;
//     const products = await Product.find({ Brand: brand });
//     res.json({ products });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Filter by model
// router.get('/filter/model', async (req, res) => {
//   try {
//     const { model } = req.query;
//     const products = await Product.find({ Model: model });
//     res.json({ products });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Filter by style
// router.get('/filter/style', async (req, res) => {
//   try {
//     const { style } = req.query;
//     const products = await Product.find({ Style: style });
//     res.json({ products });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Filter by size
// router.get('/filter/size', async (req, res) => {
//   try {
//     const { size } = req.query;
//     const products = await Product.find({ Size: { $in: size } });
//     res.json({ products });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Filter by color
// router.get('/filter/color', async (req, res) => {
//   try {
//     const { color } = req.query;
//     //console.log(color);
//     const products = await Product.find({ Color: { $in: color } });
//     res.json({ products });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Filter by material
// router.get('/filter/material', async (req, res) => {
//   try {
//     const { material } = req.query;
//     const products = await Product.find({ Material: material });
//     res.json({ products });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

//==============================
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
