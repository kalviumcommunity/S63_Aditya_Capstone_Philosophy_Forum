const Discussion = require("../models/Discussion");

// CREATE
const createDiscussion = async (req, res) => {
  try {
    const { topic, question, createdBy } = req.body;
    const discussion = new Discussion({ topic, question, createdBy });
    await discussion.save();
    res.status(201).json(discussion);
  } catch (err) {
    res.status(500).json({ message: "Error creating discussion", error: err.message });
  }
};

// READ by topic
const getDiscussionsByTopic = async (req, res) => {
  try {
    const { topic } = req.params;
    const discussions = await Discussion.find({ topic }).populate("createdBy");
    res.status(200).json(discussions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching discussions", error: err.message });
  }
};

// UPDATE
const updateDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Discussion.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Discussion not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating discussion", error: err.message });
  }
};

// DELETE
const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Discussion.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "Discussion not found" });
    res.status(200).json({ message: "Discussion deleted", discussion: result });
  } catch (err) {
    res.status(500).json({ message: "Error deleting discussion", error: err.message });
  }
};

module.exports = {
  createDiscussion,
  getDiscussionsByTopic,
  updateDiscussion,
  deleteDiscussion
};
