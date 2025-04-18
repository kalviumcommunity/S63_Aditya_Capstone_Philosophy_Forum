// controllers/questionController.js

const Question = require("../models/Question");

const createQuestion = async (req, res) => {
  try {
    const { type, questionText, options } = req.body;
    const question = new Question({ type, questionText, options });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: "Error creating question", error: err.message });
  }
};

const getLatestQuestion = async (req, res) => {
  try {
    const { type } = req.params;
    const question = await Question.findOne({ type }).sort({ createdAt: -1 });
    if (!question) return res.status(404).json({ message: "No question found." });
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: "Error fetching question", error: err.message });
  }
};

const submitResponse = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { userId, answer, reasoning } = req.body;

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    question.responses.push({ userId, answer, reasoning });
    await question.save();

    res.status(200).json({ message: "Response submitted", question });
  } catch (err) {
    res.status(500).json({ message: "Error submitting response", error: err.message });
  }
};

module.exports = { createQuestion, getLatestQuestion, submitResponse };
