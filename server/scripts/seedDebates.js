const mongoose = require('mongoose');
const Debate = require('../models/Debate');

const DB_URL = 'mongodb+srv://Aditya01:Aditya29@forum.fiezqum.mongodb.net/?retryWrites=true&w=majority&appName=Forum';

const seed = async () => {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Debate.deleteMany({}); // Clear existing debates

  const debates = [
    {
      topic: 'The Nature of Free Will',
      description: 'Debate the existence and implications of free will in human consciousness',
      roles: ['Nihilist', 'Existentialist', 'Absurdist', 'Stoic'],
      arguments: [
        {
          user: 'ExistentialistUser',
          role: 'Existentialist',
          text: 'Free will is essential for authentic existence.',
          time: '10:00',
          upvotes: 12,
          likedBy: [],
        },
        {
          user: 'NihilistUser',
          role: 'Nihilist',
          text: 'Free will is an illusion created by consciousness.',
          time: '10:05',
          upvotes: 8,
          likedBy: [],
        },
      ],
    },
    {
      topic: 'Ethics of Artificial Intelligence',
      description: 'Discuss moral implications of creating conscious artificial beings',
      roles: ['Stoic', 'Absurdist'],
      arguments: [
        {
          user: 'StoicUser',
          role: 'Stoic',
          text: 'AI should be designed to promote virtue and harmony.',
          time: '11:00',
          upvotes: 5,
          likedBy: [],
        },
      ],
    },
  ];

  await Debate.insertMany(debates);
  console.log('Sample debates seeded!');
  mongoose.disconnect();
};

seed(); 