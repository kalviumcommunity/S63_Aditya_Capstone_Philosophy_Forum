const express = require("express");
const router = express.Router();
const { createJournalEntry, updateJournalEntry } = require("../controllers/journalController");

router.post("/create", createJournalEntry);
router.put("/update/:id", updateJournalEntry);

module.exports = router;
