const mongoose = require('mongoose');
const Dilemma = require('../models/Dilemma');

const DB_URL = 'mongodb+srv://Aditya01:Aditya29@forum.fiezqum.mongodb.net/?retryWrites=true&w=majority&appName=Forum';

const seed = async () => {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Dilemma.deleteMany({}); // Clear existing dilemmas

  const dilemma = new Dilemma({
    title: 'The Modern Trolley Problem',
    subtitle: 'Weekly Ethical Dilemma',
    description: 'A runaway autonomous vehicle is heading towards five pedestrians. You can redirect it to another lane, but doing so will result in the death of one pedestrian. As the AI ethics engineer, what action should you program the vehicle to take?',
    timeLeft: '4d remaining',
    options: [
      { label: 'Save the five workers by diverting the trolley', votes: 342 },
      { label: 'Do not intervene, maintaining moral neutrality', votes: 265 },
      { label: 'Try to warn the workers and stop the trolley', votes: 152 },
    ],
    responses: [
      {
        user: 'PhilosopherKing',
        time: '2h ago',
        text: 'The principle of utility suggests maximizing welfare for the greatest number. However, we must consider the moral weight of active vs passive participation.',
        upvotes: 89,
        likedBy: [],
      },
      {
        user: 'EthicsScholar',
        time: '3h ago',
        text: 'From a Kantian perspective, using someone as a means rather than an end violates the categorical imperative, regardless of outcomes.',
        upvotes: 76,
        likedBy: [],
      },
    ],
  });

  await dilemma.save();
  console.log('Sample dilemma seeded!');
  mongoose.disconnect();
};

seed(); 