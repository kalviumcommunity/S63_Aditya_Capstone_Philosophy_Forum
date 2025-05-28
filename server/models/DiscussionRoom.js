const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  time: String,
  upvotes: { type: Number, default: 0 },
  likedBy: [String],
});

const threadSchema = new mongoose.Schema({
  title: String,
  description: String,
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});

const discussionRoomSchema = new mongoose.Schema({
  category: String, // e.g. "Ethics", "Metaphysics"
  title: String,
  description: String,
  threads: [threadSchema],
});

module.exports = mongoose.model('DiscussionRoom', discussionRoomSchema); 