const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  user: String, // or userId
  score: Number,
  answers: [Number], // index of selected answers
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QuizResult', quizResultSchema); 