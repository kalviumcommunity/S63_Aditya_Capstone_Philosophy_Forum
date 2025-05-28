const mongoose = require('mongoose');
const Question = require('../models/Question');

const DB_URL = 'mongodb+srv://Aditya01:Aditya29@forum.fiezqum.mongodb.net/?retryWrites=true&w=majority&appName=Forum';

const seed = async () => {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Question.deleteMany({}); // Clear existing questions

  const questions = [
    {
      question: 'What is the nature of consciousness, and can it be replicated artificially?',
      description: 'Consider the philosophical implications of consciousness, its relationship to the physical brain, and whether artificial systems could ever truly be conscious. What defines consciousness, and how would we recognize it in an artificial system?',
      responses: [
        {
          user: 'Sarah Chen',
          text: 'The concept of consciousness itself might be an emergent property, arising from the complex interactions of simpler processes. This challenges our traditional notion of a singular, unified self.',
          time: '10:45',
          upvotes: 45,
          likedBy: [],
        },
        {
          user: 'Elena Park',
          text: 'Perhaps consciousness is not binary but exists on a spectrum. This would explain varying levels of awareness across different species and AI systems.',
          time: '11:30',
          upvotes: 38,
          likedBy: [],
        },
      ],
    },
  ];

  await Question.insertMany(questions);
  console.log('Sample questions seeded!');
  mongoose.disconnect();
};

seed(); 