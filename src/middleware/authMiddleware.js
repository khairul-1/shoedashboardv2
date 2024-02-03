// // middleware/authMiddleware.js
// //import { verify } from 'jsonwebtoken';
// const verify = require('jsonwebtoken');

// const requireAuth = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token) {
//     verify(token, 'secret', (err, decodedToken) => {
//       if (err) {
//         res.status(401).json({ error: 'Invalid token' });
//       } else {
//         req.user = decodedToken.user;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ error: 'Token required' });
//   }
// };

// //export default { requireAuth };
// module.exports = { requireAuth };

//-------------------------------------------------------------------
// const { verify } = require('jsonwebtoken');

// const requireAuth = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token) {
//     verify(token, 'secret', (err, decodedToken) => {
//       if (err) {
//         res.status(401).json({ error: 'Invalid token' });
//       } else {
//         req.user = decodedToken.user;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ error: 'Token required' });
//   }
// };

// module.exports = { requireAuth }; // Exporting requireAuth as an object

//------------------------------------------------------

const { verify } = require('jsonwebtoken');

//const jwt, { JwtPayload } = require('jsonwebtoken');
const config = require('../apps/config');

const requireAuth = (req, res, next) => {
  //const token = req.headers.authorization;
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (token) {
    verify(token, `${config.jwt_data}`, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        req.user = decodedToken.user;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Token required' });
  }
};

//module.exports = requireAuth; // Export the middleware function directly
module.exports = { requireAuth };
