// routes/dilemmaRoutes.js

const express = require("express");
const router = express.Router();
const {
  postDilemma,
  getLatestDilemma,
  submitDilemmaResponse,
} = require("../controllers/dilemmaController");

router.post("/create", postDilemma);
router.get("/latest", getLatestDilemma);
router.post("/submit", submitDilemmaResponse);

module.exports = router;
