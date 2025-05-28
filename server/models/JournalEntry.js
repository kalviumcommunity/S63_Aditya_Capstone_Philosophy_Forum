const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  user: String, // user ID or username
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  isPrivate: { type: Boolean, default: false },
});

module.exports = mongoose.model('JournalEntry', journalEntrySchema); 