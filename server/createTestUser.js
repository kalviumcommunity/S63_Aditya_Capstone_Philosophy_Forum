// createTestUser.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected for test user creation"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

const createTestUsers = async () => {
  try {
    // First, check if users already exist
    let user1 = await User.findOne({ email: "testuser1@example.com" });
    let user2 = await User.findOne({ email: "testuser2@example.com" });
    
    // Create user1 if it doesn't exist
    if (!user1) {
      user1 = new User({
        name: "Test User 1",
        email: "testuser1@example.com",
        password: "password123",
        interests: ["ethics", "stoicism"]
      });
      user1 = await user1.save();
      console.log('Test User 1 created with ID:', user1._id);
    } else {
      console.log('Test User 1 already exists with ID:', user1._id);
    }

    // Create user2 if it doesn't exist
    if (!user2) {
      user2 = new User({
        name: "Test User 2",
        email: "testuser2@example.com",
        password: "password123",
        interests: ["existentialism", "metaphysics"]
      });
      user2 = await user2.save();
      console.log('Test User 2 created with ID:', user2._id);
    } else {
      console.log('Test User 2 already exists with ID:', user2._id);
    }

    // Verify the users have correct data
    console.log('\nVerifying user data:');
    const verifiedUser1 = await User.findById(user1._id);
    const verifiedUser2 = await User.findById(user2._id);
    
    console.log('User 1:', {
      id: verifiedUser1._id,
      name: verifiedUser1.name,
      email: verifiedUser1.email
    });
    
    console.log('User 2:', {
      id: verifiedUser2._id,
      name: verifiedUser2.name,
      email: verifiedUser2.email
    });
    
    console.log('\nYou can use these IDs for testing follow/unfollow functionality');
    console.log('User 1 ID:', user1._id);
    console.log('User 2 ID:', user2._id);
    
    mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (err) {
    console.error('Error creating test users:', err);
    mongoose.disconnect();
  }
};

createTestUsers();