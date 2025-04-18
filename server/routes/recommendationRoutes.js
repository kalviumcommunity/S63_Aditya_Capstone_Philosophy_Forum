// routes/recommendationRoutes.js

const express = require("express");
const router = express.Router();
const {
  createRecommendation,
  getRecommendationsByTopic,
} = require("../controllers/recommendationController");

router.post("/create", createRecommendation);
router.get("/topic/:topic", getRecommendationsByTopic);

module.exports = router;
