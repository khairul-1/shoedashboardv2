const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const request = await Request.create(req.body);

    res.status(201).json({ request });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET route to fetch requests by username
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  //console.log(username);
  try {
    if (username === 'admin') {
      const requests = await Request.find();

      if (!requests) {
        return res
          .status(404)
          .json({ error: 'Requests not found for this username' });
      }
      //console.log(requests);
      res.status(200).json({ requests });
    }

    if (username !== 'admin') {
      const requests = await Request.find({ username });

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
