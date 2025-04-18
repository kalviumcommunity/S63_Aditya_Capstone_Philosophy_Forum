// models/QuizQuestion.js

const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswerIndex: {
    type: Number,
    required: true,
  },
  topic: {
    type: String,
    required: true, // e.g., logic, ethics, metaphysics
  },
});

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
