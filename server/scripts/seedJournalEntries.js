const mongoose = require('mongoose');
const JournalEntry = require('../models/JournalEntry');

const DB_URL = 'mongodb+srv://Aditya01:Aditya29@forum.fiezqum.mongodb.net/?retryWrites=true&w=majority&appName=Forum';

const seed = async () => {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await JournalEntry.deleteMany({}); // Clear existing entries

  const entries = [
    {
      user: 'user1',
      title: 'On the Nature of Consciousness',
      content: 'Today I explored the fascinating intersection between quantum mechanics and consciousness. The observer effect raises intriguing questions about the role of consciousness in reality itself.',
      date: new Date('2024-01-15T15:30:00'),
      isPrivate: false,
    },
    {
      user: 'user1',
      title: 'Ethical Implications of AI',
      content: 'As AI systems become more sophisticated, we must grapple with fundamental questions about consciousness, rights, and moral responsibility.',
      date: new Date('2024-01-14T10:45:00'),
      isPrivate: false,
    },
    {
      user: 'user1',
      title: 'Free Will Reflections',
      content: 'The age-old debate between determinism and free will takes on new dimensions in the context of modern neuroscience.',
      date: new Date('2024-01-13T19:20:00'),
      isPrivate: true,
    },
  ];

  await JournalEntry.insertMany(entries);
  console.log('Sample journal entries seeded!');
  mongoose.disconnect();
};

seed(); 