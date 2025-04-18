// controllers/recommendationController.js

const Recommendation = require("../models/ReadingRecommendation");

const createRecommendation = async (req, res) => {
  try {
    const { title, type, url, author, topic, description } = req.body;

    const newRec = new Recommendation({ title, type, url, author, topic, description });
    await newRec.save();

    res.status(201).json({ message: "Recommendation created", recommendation: newRec });
  } catch (err) {
    res.status(500).json({ message: "Error creating recommendation", error: err.message });
  }
};

const getRecommendationsByTopic = async (req, res) => {
  try {
    const { topic } = req.params;
    const recs = await Recommendation.find({ topic });

    res.status(200).json(recs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recommendations", error: err.message });
  }
};

module.exports = { createRecommendation, getRecommendationsByTopic };
