// models/ReadingRecommendation.js

const mongoose = require("mongoose");

const readingRecommendationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["book", "article", "paper"],
    default: "book",
  },
  url: {
    type: String,
  },
  author: {
    type: String,
  },
  topic: {
    type: String,
    required: true, // e.g., "ethics", "existentialism", etc.
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("ReadingRecommendation", readingRecommendationSchema);
