// models/Question.js

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["daily", "weekly"],
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [String], // For weekly dilemmas with options
  responses: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      answer: String,
      reasoning: String, // Optional reasoning for weekly dilemmas
      submittedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", questionSchema);
