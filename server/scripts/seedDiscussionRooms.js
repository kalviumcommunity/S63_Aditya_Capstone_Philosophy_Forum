const mongoose = require('mongoose');
const DiscussionRoom = require('../models/DiscussionRoom');

const DB_URL = 'mongodb+srv://Aditya01:Aditya29@forum.fiezqum.mongodb.net/?retryWrites=true&w=majority&appName=Forum';

const seed = async () => {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await DiscussionRoom.deleteMany({}); // Clear existing rooms

  const rooms = [
    {
      category: 'Ethics',
      title: 'Ethics Room',
      description: 'Discuss ethical dilemmas and moral philosophy.',
      threads: [
        {
          title: 'The Trolley Problem Revisited',
          description: 'Modern interpretations and variations of the classic ethical dilemma',
          messages: [
            {
              user: 'Alice',
              text: 'What would you do in the trolley problem?',
              time: '10:45',
              upvotes: 5,
              likedBy: [],
            },
            {
              user: 'Bob',
              text: 'I think diverting the trolley is justified.',
              time: '11:00',
              upvotes: 3,
              likedBy: [],
            },
          ],
        },
      ],
    },
    {
      category: 'Metaphysics',
      title: 'Metaphysics Room',
      description: 'Explore the nature of reality and existence.',
      threads: [
        {
          title: 'The Nature of Reality',
          description: 'Debate on what is truly real and what is illusion',
          messages: [
            {
              user: 'Charlie',
              text: 'Is reality just a simulation?',
              time: '12:00',
              upvotes: 2,
              likedBy: [],
            },
          ],
        },
      ],
    },
  ];

  await DiscussionRoom.insertMany(rooms);
  console.log('Sample discussion rooms seeded!');
  mongoose.disconnect();
};

seed(); 