const express = require("express");
const router = express.Router();
const { createDebateRequest, getUserDebates } = require("../controllers/debateController");
const Debate = require('../models/Debate');

router.post("/request", createDebateRequest);
router.get("/user/:userId", getUserDebates);

// Get all debates
router.get('/', async (req, res) => {
  const debates = await Debate.find();
  res.json(debates);
});

// Get debates by topic
router.get('/topic/:topic', async (req, res) => {
  const debates = await Debate.find({ topic: req.params.topic });
  res.json(debates);
});

// Create a new debate
router.post('/', async (req, res) => {
  const debate = new Debate(req.body);
  await debate.save();
  res.json(debate);
});

// Add an argument to a debate
router.post('/:debateId/arguments', async (req, res) => {
  const debate = await Debate.findById(req.params.debateId);
  debate.arguments.push(req.body);
  await debate.save();
  res.json(debate);
});

// Like/unlike an argument
router.patch('/:debateId/arguments/:argumentId/like', async (req, res) => {
  const { userId } = req.body;
  const debate = await Debate.findById(req.params.debateId);
  const argument = debate.arguments.id(req.params.argumentId);
  if (argument.likedBy.includes(userId)) {
    argument.likedBy.pull(userId);
    argument.upvotes -= 1;
  } else {
    argument.likedBy.push(userId);
    argument.upvotes += 1;
  }
  await debate.save();
  res.json(argument);
});

module.exports = router;
