// models/Dilemma.js

const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  user: String,
  time: String,
  text: String,
  upvotes: { type: Number, default: 0 },
  likedBy: [String], // user IDs or session IDs
});

const optionSchema = new mongoose.Schema({
  label: String,
  votes: { type: Number, default: 0 },
});

const dilemmaSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  timeLeft: String,
  options: [optionSchema],
  responses: [responseSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Dilemma", dilemmaSchema);
