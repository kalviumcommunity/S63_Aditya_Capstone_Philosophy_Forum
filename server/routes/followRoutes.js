// routes/followRoutes.js

const express = require("express");
const router = express.Router();
const { followUser, unfollowUser } = require("../controllers/followController");

router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);

module.exports = router;
