// const express = require('express');
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const salesRoutes = require('./routes/salesRoutes');
// const salesHistoryRoutes = require('./routes/salesHistoryRoutes');
// const filterRoutes = require('./routes/filterRoutes');
// const { requireAuth } = require('./middleware/authMiddleware');

// const cors = require('cors');

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use('/api/auth', authRoutes); // Applying authRoutes correctly
// app.use('/api', productRoutes); // Applying requireAuth middleware to productRoutes
// app.use('/api', salesRoutes); // Applying requireAuth middleware to salesRoutes
// app.use('/api', salesHistoryRoutes); // Applying requireAuth middleware to salesHistoryRoutes
// app.use('/api', filterRoutes); // Applying requireAuth middleware to filterRoutes

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Handle undefined routes
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });

// module.exports = app;

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');
const salesHistoryRoutes = require('./routes/salesHistoryRoutes');
const filterRoutes = require('./routes/filterRoutes');
const { requireAuth } = require('./middleware/authMiddleware');
const serviceRoutes = require('./routes/serviceRoutes');
const customizeRoutes = require('./routes/customizeRoutes');
const productDetailsRoutes = require('./routes/productDetailsRoutes');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes); // Applying authRoutes correctly
app.use('/api', productRoutes); // Applying requireAuth middleware to productRoutes
app.use('/api', salesRoutes); // Applying requireAuth middleware to salesRoutes
app.use('/api', salesHistoryRoutes); // Applying requireAuth middleware to salesHistoryRoutes
app.use('/api', filterRoutes); // Applying requireAuth middleware to filterRoutes
app.use('/api/service/requests', serviceRoutes); // Applying requireAuth middleware to serviceRoutes
app.use('/api/customize', customizeRoutes);
//app.use('/api/service/requests/:username', serviceRoutes); // Applying requireAuth middleware to serviceRoutes
app.use('/api', productDetailsRoutes);

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
