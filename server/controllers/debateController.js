// controllers/debateController.js

const DebateMatch = require("../models/DebateMatch");

const createDebateRequest = async (req, res) => {
  try {
    const { userId, topic, stance } = req.body;

    // Try to find an existing waiting match with opposite stance
    const existing = await DebateMatch.findOne({
      topic,
      "user1.stance": stance === "pro" ? "con" : "pro",
      status: "waiting"
    });

    if (existing) {
      existing.user2 = { userId, stance };
      existing.status = "matched";
      await existing.save();
      return res.status(200).json({ message: "Match found!", match: existing });
    }

    // If no match, create new
    const newMatch = new DebateMatch({
      topic,
      user1: { userId, stance }
    });

    await newMatch.save();
    res.status(201).json({ message: "Waiting for opponent", match: newMatch });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getUserDebates = async (req, res) => {
  try {
    const { userId } = req.params;
    const debates = await DebateMatch.find({
      $or: [
        { "user1.userId": userId },
        { "user2.userId": userId }
      ]
    }).populate("user1.userId user2.userId");

    res.status(200).json(debates);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createDebateRequest, getUserDebates };
