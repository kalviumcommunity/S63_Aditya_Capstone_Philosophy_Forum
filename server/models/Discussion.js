const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Discussion", discussionSchema);
