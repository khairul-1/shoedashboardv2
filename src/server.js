const dotenv = require('dotenv');

const app = require('./app.js');
const config = require('./apps/config/index.js');
const port2 = require('./apps/config/index.js');
const mongoose = require('mongoose');

const port3 = config.port2 || 3000;

async function startServer() {
  try {
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
