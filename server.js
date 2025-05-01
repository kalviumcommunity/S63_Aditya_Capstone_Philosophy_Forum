//Server code for a simple Express.js application that serves a JSON response
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON

// In-memory storage for journal entries
let journalEntries = [
  {
    id: "1",
    title: "First Entry",
    content: "Some philosophical thoughts",
    author: "user1"
  }
];

// GET endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello This is Philosophy Forum!' });
});

// POST endpoint
app.post('/api/data', (req, res) => {
  const { name, age } = req.body;
  res.json({
    message: 'Data received successfully!',
    data: {
      name,
      age
    }
  });
});

// PUT endpoint to update a journal entry
app.put('/api/journal/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const entryIndex = journalEntries.findIndex(entry => entry.id === id);

  if (entryIndex === -1) {
    return res.status(404).json({ message: "Journal entry not found." });
  }

  // Update the journal entry
  journalEntries[entryIndex] = {
    ...journalEntries[entryIndex],
    title: title || journalEntries[entryIndex].title,
    content: content || journalEntries[entryIndex].content
  };

  res.json({
    message: "Journal entry updated successfully.",
    data: journalEntries[entryIndex]
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});