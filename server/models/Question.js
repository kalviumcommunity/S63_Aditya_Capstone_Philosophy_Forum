// models/Question.js

const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  user: String,
  text: String,
  time: String,
  upvotes: { type: Number, default: 0 },
  likedBy: [String],
});

const questionSchema = new mongoose.Schema({
  question: String,
  description: String,
  responses: [responseSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", questionSchema);
