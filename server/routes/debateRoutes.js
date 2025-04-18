const express = require("express");
const router = express.Router();
const { createDebateRequest, getUserDebates } = require("../controllers/debateController");

router.post("/request", createDebateRequest);
router.get("/user/:userId", getUserDebates);

module.exports = router;
