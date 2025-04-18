const express = require("express");
const router = express.Router();
const {
  createDiscussion,
  getDiscussionsByTopic,
  updateDiscussion,
  deleteDiscussion
} = require("../controllers/discussionController");

router.post("/create", createDiscussion);
router.get("/:topic", getDiscussionsByTopic);
router.put("/update/:id", updateDiscussion);
router.delete("/delete/:id", deleteDiscussion);

module.exports = router;
