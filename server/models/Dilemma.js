// models/Dilemma.js

const mongoose = require("mongoose");

const dilemmaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  scenario: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // e.g. ["Pull the lever", "Do nothing"]
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Dilemma", dilemmaSchema);
