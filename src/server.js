// // //import app from './app';
// // //import config from './app/config';
// // //import mongoose from 'mongoose';

// // const app = require('./app');
// // const config = require('./app/config');
// // const mongoose = require('mongoose');

// // //const mongoose = require("mongoose");

// // const port = 3000;

// // async function server() {
// //   try {
// //     await mongoose.connect(config.database_url);
// //     console.log('connected to mongoDB');
// //     app.listen(port, () => {
// //       console.log(`Example app listening on port ${port}`);
// //       //console.log(`${parseInt(config.port)}`);
// //     });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }

// // server().catch((error) => console.log(error));

// //-----------------------------------------------

// // const app = require('./app');
// // const config = require('./app/config');

// // const mongoose = require('mongoose');

// // const port = config.port || 3000;

// // async function server() {
// //   try {
// //     await mongoose.connect(config.database_url);
// //     console.log('Connected to MongoDB');
// //     app.listen(port, () => {
// //       console.log(`Server is running on port ${port}`);
// //     });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }

// // server().catch((error) => console.log(error));

// const express = require('express');
// const productRoutes = require('./routes/productRoutes');
// const salesRoutes = require('./routes/salesRoutes');
// const salesHistoryRoutes = require('./routes/salesHistoryRoutes');
// const filterRoutes = require('./routes/filterRoutes');
// const requireAuth = require('./middleware/authMiddleware');
// const authRoutes = require('./routes/authRoutes');
// const cors = require('cors');

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use('/api/auth', authRoutes); // Apply auth routes without requireAuth middleware
// app.use('/api', requireAuth, productRoutes); // Apply requireAuth middleware to productRoutes
// app.use('/api', requireAuth, salesRoutes); // Apply requireAuth middleware to salesRoutes
// app.use('/api', requireAuth, salesHistoryRoutes); // Apply requireAuth middleware to salesHistoryRoutes
// app.use('/api', requireAuth, filterRoutes); // Apply requireAuth middleware to filterRoutes

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

const dotenv = require('dotenv');

const app = require('./app.js');
const config = require('./apps/config/index.js');
const port2 = require('./apps/config/index.js');
const mongoose = require('mongoose');

const port3 = config.port2 || 3000;

async function startServer() {
  try {
    // await mongoose.connect(config.database_url, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // });
    await mongoose.connect(config.database_url);
    console.log('Connected to MongoDB');

    app.listen(port3, () => {
      console.log(`Server is running on port ${port3}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
