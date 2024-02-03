// // routes/authRoutes.js
// //import { Router } from 'express';
// const Router = require('express');
// const router = Router();
// const hash = require('bcryptjs');
// const sign = require('jsonwebtoken');
// const { findOne, create } = require('../models/user');

// router.post('/register', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await hash(password, 10);

//     // Create new user
//     const newUser = await create({
//       username,
//       password: hashedPassword,
//     });

//     // Generate JWT token
//     const token = sign({ user: newUser._id }, 'secret', { expiresIn: '1h' });

//     res.status(201).json({ user: newUser, token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// //export default router;
// module.exports = router;

const { Router } = require('express');
const config = require('../apps/config');
const router = Router();
const bcrypt = require('bcryptjs');
const sign = require('jsonwebtoken');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Generate JWT token
    // const token = sign({ user: newUser._id }, `${config.jwt_data}`, {
    //   expiresIn: '1h',
    // });

    const token = jwt.sign({ user: newUser._id }, `${config.jwt_data}`, {
      expiresIn: '1h',
    });

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  //console.log(req.body);
  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ user: user._id }, `${config.jwt_data}`, {
      expiresIn: '1h',
    });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
