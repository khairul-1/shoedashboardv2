// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.join(process.cwd(), '.env') });

// export default {
//   port: process.env.PORT,
//   database_url: process.env.DATABASE_URI,
//   jwt_data: process.env.JWT_CODE,
// };
//============================================
// const dotenv = require('dotenv');
// const path = require('path');

// dotenv.config({ path: path.join(process.cwd(), '.env') });

// module.exports = {
//   port: process.env.PORT,
//   database_url: process.env.DATABASE_URI,
//   jwt_data: process.env.JWT_CODE,
// };

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env') });

module.exports = {
  port2: process.env.PORT,
  database_url: process.env.DATABASE_URI,
  jwt_data: process.env.JWT_CODE,
};
