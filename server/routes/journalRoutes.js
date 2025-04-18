const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal");
const { createJournalEntry, updateJournalEntry } = require("../controllers/journalController");

// 🔹 GET all public journals (directly handled here)
router.get("/", async (req, res) => {
  try {
    const journals = await Journal.find({ visibility: "public" });
    res.status(200).json(journals);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🔹 POST journal (uses controller)
router.post("/create", createJournalEntry);

// 🔹 PUT update journal by ID (uses controller)
router.put("/update/:id", updateJournalEntry);

module.exports = router;
