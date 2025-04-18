const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contentType: { type: String, enum: ["Journal", "Discussion", "Dilemma"], required: true },
  contentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
