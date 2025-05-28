//Server code for a simple Express.js application that serves a JSON response
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const dilemmaRoutes = require('./server/routes/dilemmaRoutes');
const discussionRoutes = require('./server/routes/discussionRoutes');
const journalRoutes = require('./server/routes/journalRoutes');
const debateRoutes = require('./server/routes/debateRoutes');
const questionRoutes = require('./server/routes/questionRoutes');
const quizResultRoutes = require('./server/routes/quizResultRoutes');

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

const DB_URL = 'mongodb+srv://driftx:Saksham1234@driftx.iixmutb.mongodb.net/';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

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

<<<<<<< HEAD
app.use('/api/dilemmas', dilemmaRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/debates', debateRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/quiz-results', quizResultRoutes);

=======
>>>>>>> c25079c5cbdbc7a5834aa8b2185087e4ba1abe6a
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});