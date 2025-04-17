// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  // Add any other fields if needed
});

module.exports = mongoose.model('User', userSchema);
