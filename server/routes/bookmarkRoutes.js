const express = require("express");
const router = express.Router();
const {
  createBookmark,
  getBookmarksByUser,
  deleteBookmark
} = require("../controllers/bookmarkController");

router.post("/create", createBookmark);
router.get("/:userId", getBookmarksByUser); // GET all bookmarks of a user (optionally filter by type)
router.delete("/:id", deleteBookmark);      // DELETE a bookmark by ID

module.exports = router;
