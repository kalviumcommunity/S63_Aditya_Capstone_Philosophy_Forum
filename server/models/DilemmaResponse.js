// models/DilemmaResponse.js

const mongoose = require("mongoose");

const dilemmaResponseSchema = new mongoose.Schema({
  dilemmaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dilemma",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chosenOptionIndex: {
    type: Number,
    required: true,
  },
  reasoning: {
    type: String,
    required: false,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("DilemmaResponse", dilemmaResponseSchema);
