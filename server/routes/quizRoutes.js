// routes/quizRoutes.js

const express = require("express");
const router = express.Router();
const {
  createQuizQuestion,
  getQuizQuestionsByTopic,
  submitQuizScore,
} = require("../controllers/quizController");

router.post("/question/create", createQuizQuestion);
router.get("/questions/:topic", getQuizQuestionsByTopic);
router.post("/submit-score", submitQuizScore);

module.exports = router;
