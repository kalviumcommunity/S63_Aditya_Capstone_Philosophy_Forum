const express = require("express");
const router = express.Router();
const {
  createDiscussion,
  getDiscussionsByTopic,
  updateDiscussion,
  deleteDiscussion
} = require("../controllers/discussionController");
const DiscussionRoom = require('../models/DiscussionRoom');

router.post("/create", createDiscussion);
router.get("/:topic", getDiscussionsByTopic);
router.put("/update/:id", updateDiscussion);
router.delete("/delete/:id", deleteDiscussion);

// Get all rooms
router.get('/', async (req, res) => {
  const rooms = await DiscussionRoom.find();
  res.json(rooms);
});

// Get rooms by category
router.get('/category/:category', async (req, res) => {
  const rooms = await DiscussionRoom.find({ category: req.params.category });
  res.json(rooms);
});

// Create a new room
router.post('/', async (req, res) => {
  const room = new DiscussionRoom(req.body);
  await room.save();
  res.json(room);
});

// Add a thread to a room
router.post('/:roomId/threads', async (req, res) => {
  const room = await DiscussionRoom.findById(req.params.roomId);
  room.threads.push(req.body);
  await room.save();
  res.json(room);
});

// Add a message to a thread
router.post('/:roomId/threads/:threadId/messages', async (req, res) => {
  const room = await DiscussionRoom.findById(req.params.roomId);
  const thread = room.threads.id(req.params.threadId);
  thread.messages.push(req.body);
  await room.save();
  res.json(thread);
});

// Like/unlike a message
router.patch('/:roomId/threads/:threadId/messages/:messageId/like', async (req, res) => {
  const { userId } = req.body;
  const room = await DiscussionRoom.findById(req.params.roomId);
  const thread = room.threads.id(req.params.threadId);
  const message = thread.messages.id(req.params.messageId);
  if (message.likedBy.includes(userId)) {
    message.likedBy.pull(userId);
    message.upvotes -= 1;
  } else {
    message.likedBy.push(userId);
    message.upvotes += 1;
  }
  await room.save();
  res.json(message);
});

module.exports = router;
