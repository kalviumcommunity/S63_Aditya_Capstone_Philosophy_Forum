// routes/dilemmaRoutes.js

const express = require("express");
const router = express.Router();
const {
  postDilemma,
  getLatestDilemma,
  submitDilemmaResponse,
} = require("../controllers/dilemmaController");
const Dilemma = require('../models/Dilemma');

router.post("/create", postDilemma);
router.get("/latest", getLatestDilemma);
router.post("/submit", submitDilemmaResponse);

// Get current dilemma (for now, just get the first one)
router.get('/current', async (req, res) => {
  const dilemma = await Dilemma.findOne();
  res.json(dilemma);
});

// Submit a vote
router.patch('/vote/:id', async (req, res) => {
  const { optionLabel } = req.body;
  const dilemma = await Dilemma.findById(req.params.id);
  const option = dilemma.options.find(opt => opt.label === optionLabel);
  if (option) option.votes += 1;
  await dilemma.save();
  res.json(dilemma);
});

// Like/unlike a response
router.patch('/response/like/:dilemmaId/:responseId', async (req, res) => {
  const { userId } = req.body;
  const dilemma = await Dilemma.findById(req.params.dilemmaId);
  const response = dilemma.responses.id(req.params.responseId);
  if (!response) return res.status(404).json({ error: 'Response not found' });
  if (response.likedBy.includes(userId)) {
    response.likedBy.pull(userId);
    response.upvotes -= 1;
  } else {
    response.likedBy.push(userId);
    response.upvotes += 1;
  }
  await dilemma.save();
  res.json(response);
});

// Add a new response
router.post('/response/:dilemmaId', async (req, res) => {
  const { user, text, time } = req.body;
  const dilemma = await Dilemma.findById(req.params.dilemmaId);
  dilemma.responses.push({ user, text, time });
  await dilemma.save();
  res.json(dilemma.responses[dilemma.responses.length - 1]);
});

module.exports = router;
