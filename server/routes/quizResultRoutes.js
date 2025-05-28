const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

// Save a quiz result
router.post('/', async (req, res) => {
  const result = new QuizResult(req.body);
  await result.save();
  res.json(result);
});

// Get all results for a user
router.get('/user/:user', async (req, res) => {
  const results = await QuizResult.find({ user: req.params.user });
  res.json(results);
});

module.exports = router; 