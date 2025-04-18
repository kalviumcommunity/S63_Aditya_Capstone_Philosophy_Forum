const Bookmark = require("../models/Bookmark");

// CREATE bookmark
const createBookmark = async (req, res) => {
  try {
    const { userId, contentType, contentId } = req.body;
    const bookmark = new Bookmark({ userId, contentType, contentId });
    await bookmark.save();

    res.status(201).json({ message: "Bookmark created", bookmark });
  } catch (err) {
    res.status(500).json({ message: "Failed to create bookmark", error: err.message });
  }
};

// GET bookmarks by userId
const getBookmarksByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { type } = req.query;
    const query = { userId };
    if (type) {
      query.contentType = type;
    }
    const bookmarks = await Bookmark.find(query).populate("userId");
    res.status(200).json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookmarks", error: err.message });
  }
};

// DELETE bookmark by ID
const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Bookmark.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Bookmark not found" });
    }
    res.status(200).json({ message: "Bookmark deleted", bookmark: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete bookmark", error: err.message });
  }
};

module.exports = {
  createBookmark,
  getBookmarksByUser,
  deleteBookmark
};
