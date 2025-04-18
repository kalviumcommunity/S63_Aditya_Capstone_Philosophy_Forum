const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to create user", error: err.message });
  }
};

module.exports = { createUser };
