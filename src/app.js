// // // app.js
// // //import express from 'express';
// // const express = require('express');
// // //import { connect } from 'mongoose';
// // //import productRoutes from './routes/productRoutes';
// // const productRoutes = require('./routes/productRoutes');
// // import salesRoutes from './routes/salesRoutes';
// // import salesHistoryRoutes from './routes/salesHistoryRoutes';
// // import filterRoutes from './routes/filterRoutes';
// // import { requireAuth } from './middleware/authMiddleware';
// // import { authRoutes } from './routes/authRoutes';
// const authRoutes = require('./routes/authRoutes');

// const express = require('express');
// //const mongoose = require('mongoose');
// const productRoutes = require('./routes/productRoutes');
// const salesRoutes = require('./routes/salesRoutes');
// const salesHistoryRoutes = require('./routes/salesHistoryRoutes');
// const filterRoutes = require('./routes/filterRoutes');
// //const requireAuth = require('./middleware/authMiddleware');

// //const { requireAuth } = require('./middleware/authMiddleware');
// const requireAuth = require('./middleware/authMiddleware');

// const cors = require('cors');

// //const authRoutes = require('./routes/authRoutes');

// const app = express();
// //app.use(json());

// //const app: Application = express();
// //const port = 3000;

// app.use(express.json());
// app.use(cors());

// //app.use('/api/auth', authRoutes);

// // connect('mongodb://localhost:27017/shoe_management', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   useCreateIndex: true,
// //   useFindAndModify: false,
// // })
// //   .then(() => {
// //     console.log('Connected to MongoDB');
// //   })
// //   .catch((err) => console.error('Failed to connect to MongoDB:', err));

// app.use('/api/auth', authRoutes);
// app.use('/api', requireAuth, productRoutes);
// app.use('/api', requireAuth, salesRoutes);
// app.use('/api', requireAuth, salesHistoryRoutes);
// app.use('/api', requireAuth, filterRoutes);

// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

// // Handle undefined routes
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// //export default app;
// module.exports = app;

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');
const salesHistoryRoutes = require('./routes/salesHistoryRoutes');
const filterRoutes = require('./routes/filterRoutes');
const { requireAuth } = require('./middleware/authMiddleware');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes); // Applying authRoutes correctly
app.use('/api', productRoutes); // Applying requireAuth middleware to productRoutes
app.use('/api', salesRoutes); // Applying requireAuth middleware to salesRoutes
app.use('/api', salesHistoryRoutes); // Applying requireAuth middleware to salesHistoryRoutes
app.use('/api', filterRoutes); // Applying requireAuth middleware to filterRoutes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

module.exports = app;
