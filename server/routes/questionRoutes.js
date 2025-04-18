const express = require("express");
const router = express.Router();
const { createQuestion, getLatestQuestion, submitResponse } = require("../controllers/questionController");

router.post("/create", createQuestion);
router.get("/latest/:type", getLatestQuestion); // type = daily or weekly
router.post("/respond/:questionId", submitResponse);

module.exports = router;
