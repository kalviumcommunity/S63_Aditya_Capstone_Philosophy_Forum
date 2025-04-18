// controllers/followController.js

const User = require("../models/User");

const followUser = async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;

    if (userId === targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }

    // First query to get user data
    const user = await User.findById(userId);
    const target = await User.findById(targetUserId);

    // Debug logs to help diagnose any issues
    console.log('DEBUG follow - User found:', user ? 'Yes' : 'No', 
      user ? { id: user._id, name: user.name, email: user.email } : 'null');
    console.log('DEBUG follow - Target found:', target ? 'Yes' : 'No',
      target ? { id: target._id, name: target.name, email: target.email } : 'null');

    if (!user) {
      return res.status(404).json({ message: "User not found. The userId provided does not exist." });
    }
    
    if (!target) {
      return res.status(404).json({ message: "Target user not found. The targetUserId provided does not exist." });
    }

    // Get a safe display name for the response
    const targetName = target.name || 'user';

    if (user.following.includes(targetUserId)) {
      return res.status(400).json({ message: "Already following this user." });
    }

    user.following.push(targetUserId);
    target.followers.push(userId);

    await user.save();
    await target.save();

    // Use the targetName variable here to avoid potential undefined issues
    res.status(200).json({ message: `Now following ${targetName}` });
  } catch (err) {
    console.error('Follow error:', err);
    res.status(500).json({ message: "Failed to follow user", error: err.message });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;

    // First query to get user data
    const user = await User.findById(userId);
    const target = await User.findById(targetUserId);

    // Debug logs to help diagnose any issues
    console.log('DEBUG unfollow - User found:', user ? 'Yes' : 'No', 
      user ? { id: user._id, name: user.name, email: user.email } : 'null');
    console.log('DEBUG unfollow - Target found:', target ? 'Yes' : 'No',
      target ? { id: target._id, name: target.name, email: target.email } : 'null');

    if (!user) {
      return res.status(404).json({ message: "User not found. The userId provided does not exist." });
    }
    
    if (!target) {
      return res.status(404).json({ message: "Target user not found. The targetUserId provided does not exist." });
    }

    // Get a safe display name for the response
    const targetName = target.name || 'user';

    user.following = user.following.filter(id => id.toString() !== targetUserId);
    target.followers = target.followers.filter(id => id.toString() !== userId);

    await user.save();
    await target.save();

    // Use the targetName variable here to avoid potential undefined issues
    res.status(200).json({ message: `Unfollowed ${targetName}` });
  } catch (err) {
    console.error('Unfollow error:', err);
    res.status(500).json({ message: "Failed to unfollow user", error: err.message });
  }
};

module.exports = { followUser, unfollowUser };