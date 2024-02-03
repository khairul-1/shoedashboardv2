// // routes/salesHistoryRoutes.js
// const express = require('express');
// const router = express.Router();
// const Sale = require('../models/Sale');

// // Get sales history by weekly
// router.get('/salesHistory/weekly', async (req, res) => {
//   try {
//     // Query sales history for weekly data
//     res.json({ salesHistory: /* weekly sales data */ {} });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Similar routes for daily, monthly, and yearly sales history

// module.exports = router;

//-----------------------------------------------------------------

// const express = require('express');
// const router = express.Router();
// const Sale = require('../models/Sale');

// // Get sales history by weekly
// router.get('/salesHistory/weekly', async (req, res) => {
//   try {
//     const weeklySales = await Sale.aggregate([
//       {
//         $group: {
//           _id: { $week: '$saleDate' },
//           totalSales: { $sum: '$quantity' },
//         },
//       },
//     ]);

//     res.json({ weeklySales });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get sales history by daily
// router.get('/salesHistory/daily', async (req, res) => {
//   try {
//     const dailySales = await Sale.aggregate([
//       {
//         $group: {
//           _id: { $dateToString: { format: '%Y-%m-%d', date: '$saleDate' } },
//           totalSales: { $sum: '$quantity' },
//         },
//       },
//     ]);

//     res.json({ dailySales });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get sales history by monthly
// router.get('/salesHistory/monthly', async (req, res) => {
//   try {
//     const monthlySales = await Sale.aggregate([
//       {
//         $group: {
//           _id: { $month: '$saleDate' },
//           totalSales: { $sum: '$quantity' },
//         },
//       },
//     ]);

//     res.json({ monthlySales });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get sales history by yearly
// router.get('/salesHistory/yearly', async (req, res) => {
//   try {
//     const yearlySales = await Sale.aggregate([
//       {
//         $group: {
//           _id: { $year: '$saleDate' },
//           totalSales: { $sum: '$quantity' },
//         },
//       },
//     ]);

//     res.json({ yearlySales });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

//---------------------------------

const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

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

// Get sales history by weekly
router.get('/salesHistory/weekly', async (req, res) => {
  try {
    const weeklySales = await Sale.aggregate([
      {
        $group: {
          _id: {
            week: { $isoWeek: '$saleDate' },
            year: { $year: '$saleDate' },
          },
          totalSales: { $sum: '$quantity' },
        },
      },
      {
        $project: {
          week: '$_id.week',
          year: '$_id.year',
          totalSales: 1,
          _id: 0,
        },
      },
    ]);

    res.json({ weeklySales });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get sales history by daily
router.get('/salesHistory/daily', async (req, res) => {
  try {
    const dailySales = await Sale.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$saleDate' } },
          totalSales: { $sum: '$quantity' },
        },
      },
    ]);

    res.json({ dailySales });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get sales history by monthly
router.get('/salesHistory/monthly', async (req, res) => {
  try {
    const monthlySales = await Sale.aggregate([
      {
        $group: {
          _id: { month: { $month: '$saleDate' }, year: { $year: '$saleDate' } },
          totalSales: { $sum: '$quantity' },
        },
      },
      {
        $project: {
          month: {
            $switch: {
              branches: [
                { case: { $eq: ['$_id.month', 1] }, then: 'January' },
                { case: { $eq: ['$_id.month', 2] }, then: 'February' },
                { case: { $eq: ['$_id.month', 3] }, then: 'March' },
                { case: { $eq: ['$_id.month', 4] }, then: 'April' },
                { case: { $eq: ['$_id.month', 5] }, then: 'May' },
                { case: { $eq: ['$_id.month', 6] }, then: 'June' },
                { case: { $eq: ['$_id.month', 7] }, then: 'July' },
                { case: { $eq: ['$_id.month', 8] }, then: 'August' },
                { case: { $eq: ['$_id.month', 9] }, then: 'September' },
                { case: { $eq: ['$_id.month', 10] }, then: 'October' },
                { case: { $eq: ['$_id.month', 11] }, then: 'November' },
                { case: { $eq: ['$_id.month', 12] }, then: 'December' },
              ],
              default: 'Unknown',
            },
          },
          year: '$_id.year',
          totalSales: 1,
          _id: 0,
        },
      },
    ]);

    res.json({ monthlySales });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get sales history by yearly
router.get('/salesHistory/yearly', async (req, res) => {
  try {
    const yearlySales = await Sale.aggregate([
      {
        $group: {
          _id: { $year: '$saleDate' },
          totalSales: { $sum: '$quantity' },
        },
      },
      {
        $project: {
          year: '$_id',
          totalSales: 1,
          _id: 0,
        },
      },
    ]);

    res.json({ yearlySales });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
