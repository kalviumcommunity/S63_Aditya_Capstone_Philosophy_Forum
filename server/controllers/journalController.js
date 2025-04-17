const Journal = require("../models/Journal");

// CREATE Journal Entry
const createJournalEntry = async (req, res) => {
  try {
    const { userId, content, visibility } = req.body;

    const journal = new Journal({ userId, content, visibility });
    await journal.save();

    res.status(201).json(journal);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE Journal Entry
const updateJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, visibility } = req.body;

    const updatedEntry = await Journal.findByIdAndUpdate(
      id,
      { content, visibility },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: "Journal entry not found." });
    }

    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createJournalEntry,
  updateJournalEntry
};
