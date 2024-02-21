// models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  type: String,
  shineLevel: String,
  instructions: String,
  username: String,
  status: {
    type: String,
    default: 'pending', // Initial status is pending
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
