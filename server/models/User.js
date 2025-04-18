// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Full name of user
  email: { type: String, required: true, unique: true },
  password: { type: String }, // For JWT login
  googleId: { type: String }, // For OAuth login
  interests: [String], // E.g., ['ethics', 'stoicism']

  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
