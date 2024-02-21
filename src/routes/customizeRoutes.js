// routes/customizeRoutes.js

const express = require('express');
const router = express.Router();
const CustomizedShoe = require('../models/CustomizedShoe');

// Route for customizing shoes
router.post('/', async (req, res) => {
  try {
    const customizedShoe = await CustomizedShoe.create(req.body);
    res.status(201).json(customizedShoe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET route to fetch requests by username
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    if (username === 'admin') {
      const requests = await CustomizedShoe.find();

      if (!requests) {
        return res
          .status(404)
          .json({ error: 'Requests not found for this username' });
      }
      //console.log(requests);
      res.status(200).json({ requests });
    }

    if (username !== 'admin') {
      const requests = await CustomizedShoe.find({ username });

      if (!requests) {
        return res
          .status(404)
          .json({ error: 'Requests not found for this username' });
      }
      //console.log(requests);
      res.status(200).json({ requests });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
