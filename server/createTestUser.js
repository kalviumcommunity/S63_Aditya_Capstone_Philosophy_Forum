const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path as needed

mongoose.connect('mongodb://localhost:27017/YOUR_DB_NAME', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const createUser = async () => {
  try {
    const newUser = new User({ username: 'test-user-1' });
    const savedUser = await newUser.save();
    console.log('User created:', savedUser);
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

createUser();
