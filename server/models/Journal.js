const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  content: { type: String, required: true },
  visibility: { type: String, enum: ["public", "private"], default: "private" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Journal", journalSchema);
