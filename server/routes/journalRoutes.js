const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal");
const JournalEntry = require('../models/JournalEntry');
const auth = require('../middleware/auth');

// Create new journal (protected)
router.post("/create", auth, async (req, res) => {
  const { content, visibility } = req.body;

  try {
    const newJournal = new Journal({ content, visibility });
    const saved = await newJournal.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: "Failed to create journal" });
  }
});


// Update journal by ID
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { content, visibility } = req.body;

  try {
    const updatedJournal = await Journal.findByIdAndUpdate(
      id,
      { content, visibility, updatedAt: Date.now() },
      { new: true } // Return updated doc
    );

    if (!updatedJournal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.status(200).json(updatedJournal);
  } catch (error) {
    res.status(500).json({ error: "Failed to update journal" });
  }
});

// Get all journal entries for a user
router.get('/user/:user', async (req, res) => {
  const entries = await JournalEntry.find({ user: req.params.user });
  res.json(entries);
});

// Get a single journal entry by ID
router.get('/:id', async (req, res) => {
  const entry = await JournalEntry.findById(req.params.id);
  if (!entry) return res.status(404).json({ message: 'Entry not found' });
  res.json(entry);
});

// Create a new journal entry
router.post('/', async (req, res) => {
  const entry = new JournalEntry(req.body);
  await entry.save();
  res.json(entry);
});

// Update a journal entry
router.put('/:id', async (req, res) => {
  const entry = await JournalEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!entry) return res.status(404).json({ message: 'Entry not found' });
  res.json(entry);
});

// Delete a journal entry
router.delete('/:id', async (req, res) => {
  const entry = await JournalEntry.findByIdAndDelete(req.params.id);
  if (!entry) return res.status(404).json({ message: 'Entry not found' });
  res.json({ message: 'Entry deleted' });
});

module.exports = router;
