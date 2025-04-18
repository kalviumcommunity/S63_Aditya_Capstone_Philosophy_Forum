// models/DebateMatch.js

const mongoose = require("mongoose");

const debateMatchSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  user1: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stance: { type: String, enum: ["pro", "con"], required: true },
  },
  user2: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    stance: { type: String, enum: ["pro", "con"] },
  },
  status: { type: String, enum: ["waiting", "matched", "completed"], default: "waiting" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DebateMatch", debateMatchSchema);
