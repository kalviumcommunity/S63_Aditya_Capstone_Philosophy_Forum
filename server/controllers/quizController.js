// controllers/quizController.js

const QuizQuestion = require("../models/QuizQuestion");
const UserQuizScore = require("../models/UserQuizScore");

const createQuizQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswerIndex, topic } = req.body;
    const quiz = new QuizQuestion({ question, options, correctAnswerIndex, topic });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Error creating question", error: err.message });
  }
};

const getQuizQuestionsByTopic = async (req, res) => {
  try {
    const { topic } = req.params;
    const questions = await QuizQuestion.find({ topic });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions", error: err.message });
  }
};

const submitQuizScore = async (req, res) => {
  try {
    const { userId, score } = req.body;
    const newScore = new UserQuizScore({ userId, score });
    await newScore.save();
    res.status(201).json({ message: "Score submitted", score: newScore });
  } catch (err) {
    res.status(500).json({ message: "Error submitting score", error: err.message });
  }
};

module.exports = { createQuizQuestion, getQuizQuestionsByTopic, submitQuizScore };
