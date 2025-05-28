const mongoose = require('mongoose');

const argumentSchema = new mongoose.Schema({
  user: String,
  role: String, // e.g. 'Nihilist', 'Existentialist', etc.
  text: String,
  time: String,
  upvotes: { type: Number, default: 0 },
  likedBy: [String],
});

const debateSchema = new mongoose.Schema({
  topic: String,
  description: String,
  roles: [String], // e.g. ['Nihilist', 'Existentialist', ...]
  arguments: [argumentSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Debate', debateSchema); 